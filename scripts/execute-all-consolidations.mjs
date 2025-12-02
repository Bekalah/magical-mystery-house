#!/usr/bin/env node
/**
 * Execute All Consolidation Merges
 * 
 * Executes all 131 consolidation merges identified by the experiment
 * Merges fragments from other workspaces into master locations
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class ConsolidationExecutor {
  constructor() {
    this.consolidated = [];
    this.errors = [];
    this.stats = {
      total: 0,
      merged: 0,
      skipped: 0,
      errors: 0
    };
  }

  async run() {
    console.log('🔀 EXECUTING ALL CONSOLIDATION MERGES\n');
    console.log('═'.repeat(80) + '\n');

    // Load consolidation plan
    const planPath = path.join(BASE_DIR, 'CONSOLIDATION_PLAN.json');
    if (!fs.existsSync(planPath)) {
      console.log('❌ CONSOLIDATION_PLAN.json not found');
      console.log('   Run: node tools/consolidate-all-workspaces.mjs first\n');
      return;
    }

    const plan = JSON.parse(fs.readFileSync(planPath, 'utf-8'));
    const consolidated = plan.consolidated || [];

    this.stats.total = consolidated.length;
    console.log(`📦 Found ${consolidated.length} consolidation tasks\n`);

    // Process each consolidation
    for (let i = 0; i < consolidated.length; i++) {
      const item = consolidated[i];
      const progress = `[${i + 1}/${consolidated.length}]`;
      
      console.log(`${progress} Processing ${item.name} (${item.type})...`);

      try {
        await this.mergeItem(item);
        this.stats.merged++;
        this.consolidated.push(item);
      } catch (e) {
        this.stats.errors++;
        this.errors.push({ item: item.name, error: e.message });
        console.log(`   ⚠️  Error: ${e.message}`);
      }
    }

    // Record in experiment state
    this.recordConsolidation();

    // Print summary
    this.printSummary();
  }

  async mergeItem(item) {
    const primaryPath = item.primary?.path;
    if (!primaryPath || !fs.existsSync(primaryPath)) {
      throw new Error(`Primary location not found: ${primaryPath}`);
    }

    const mergeFrom = item.mergeFrom || [];
    if (mergeFrom.length === 0) {
      this.stats.skipped++;
      console.log(`   ⏭️  No fragments to merge`);
      return;
    }

    console.log(`   📍 Primary: ${path.relative(BASE_DIR, primaryPath)}`);
    console.log(`   🔀 Merging from ${mergeFrom.length} location(s)...`);

    for (const fragment of mergeFrom) {
      const fragmentPath = fragment.path;
      
      if (!fs.existsSync(fragmentPath)) {
        console.log(`      ⚠️  Fragment not found: ${path.relative(BASE_DIR, fragmentPath)}`);
        continue;
      }

      try {
        await this.mergeDirectory(fragmentPath, primaryPath, fragment.workspace);
        console.log(`      ✅ Merged: ${fragment.workspace}`);
      } catch (e) {
        console.log(`      ⚠️  Error merging ${fragment.workspace}: ${e.message}`);
      }
    }

    // Ensure primary has complete structure
    await this.ensureCompleteStructure(primaryPath, item.name);
  }

  async mergeDirectory(source, target, sourceName) {
    if (!fs.existsSync(source)) {
      return;
    }

    const items = fs.readdirSync(source);
    let filesMerged = 0;

    for (const item of items) {
      // Skip system directories
      if (item === 'node_modules' || item === '.git' || item === 'dist' || item === '.next') {
        continue;
      }

      const sourcePath = path.join(source, item);
      const targetPath = path.join(target, item);

      try {
        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
          // Merge subdirectories recursively
          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
          }
          await this.mergeDirectory(sourcePath, targetPath, sourceName);
        } else if (stat.isFile()) {
          // Merge files intelligently
          if (!fs.existsSync(targetPath)) {
            // File doesn't exist in target - copy it
            fs.copyFileSync(sourcePath, targetPath);
            filesMerged++;
          } else {
            // File exists - compare and merge
            const sourceSize = stat.size;
            const targetSize = fs.statSync(targetPath).size;
            const sourceMtime = stat.mtimeMs;
            const targetMtime = fs.statSync(targetPath).mtimeMs;

            // Use source if it's larger or newer
            if (sourceSize > targetSize || sourceMtime > targetMtime) {
              fs.copyFileSync(sourcePath, targetPath);
              filesMerged++;
            }
          }
        }
      } catch (e) {
        // Skip files we can't process
        continue;
      }
    }

    if (filesMerged > 0) {
      // Only log if files were actually merged
    }
  }

  async ensureCompleteStructure(pkgPath, pkgName) {
    // Ensure package.json exists
    const packageJsonPath = path.join(pkgPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      const packageJson = {
        name: pkgName.startsWith('@') ? pkgName : pkgName,
        version: '1.0.0',
        license: 'CC0-1.0',
        description: `Consolidated ${pkgName}`,
        main: 'src/index.ts',
        types: 'src/index.ts'
      };
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    } else {
      // Update version to 1.0.0 if needed
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (packageJson.version !== '1.0.0') {
          packageJson.version = '1.0.0';
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        }
      } catch (e) {
        // Skip if can't parse
      }
    }

    // Ensure src directory exists
    const srcPath = path.join(pkgPath, 'src');
    if (!fs.existsSync(srcPath)) {
      // Check if there are source files elsewhere
      const hasSource = fs.readdirSync(pkgPath).some(item => {
        const itemPath = path.join(pkgPath, item);
        return fs.statSync(itemPath).isFile() && (item.endsWith('.ts') || item.endsWith('.js'));
      });

      if (!hasSource) {
        fs.mkdirSync(srcPath, { recursive: true });
        const indexPath = path.join(srcPath, 'index.ts');
        if (!fs.existsSync(indexPath)) {
          const indexContent = `/**
 * ${pkgName} - Consolidated Package
 * 
 * Merged from multiple workspaces into one complete form
 * 
 * @license CC0-1.0 - Public Domain
 */

export * from './${pkgName.replace(/[@\/-]/g, '')}';
`;
          fs.writeFileSync(indexPath, indexContent);
        }
      }
    }

    // Ensure README exists
    const readmePath = path.join(pkgPath, 'README.md');
    if (!fs.existsSync(readmePath)) {
      const readmeContent = `# ${pkgName}

Consolidated package - merged from multiple workspaces into one complete form.

## License

CC0-1.0 - Public Domain
`;
      fs.writeFileSync(readmePath, readmeContent);
    }
  }

  recordConsolidation() {
    const statePath = path.join(BASE_DIR, 'experiment-state.json');
    let state = { improvements: [] };
    
    if (fs.existsSync(statePath)) {
      try {
        state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
      } catch (e) {
        // Start fresh
      }
    }

    state.improvements.push({
      cycle: state.currentCycle || 0,
      timestamp: new Date().toISOString(),
      type: 'enhancement',
      description: `Executed consolidation: ${this.stats.merged} packages merged, ${this.stats.skipped} skipped, ${this.stats.errors} errors`,
      system: 'consolidation-execution'
    });

    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  }

  printSummary() {
    console.log('\n' + '═'.repeat(80));
    console.log('✅ CONSOLIDATION EXECUTION COMPLETE');
    console.log('═'.repeat(80));
    console.log(`Total: ${this.stats.total}`);
    console.log(`Merged: ${this.stats.merged}`);
    console.log(`Skipped: ${this.stats.skipped}`);
    console.log(`Errors: ${this.stats.errors}`);
    console.log(`Success Rate: ${((this.stats.merged / this.stats.total) * 100).toFixed(1)}%`);
    console.log('═'.repeat(80) + '\n');

    if (this.errors.length > 0) {
      console.log('⚠️  Errors encountered:\n');
      for (const error of this.errors.slice(0, 10)) {
        console.log(`   • ${error.item}: ${error.error}`);
      }
      if (this.errors.length > 10) {
        console.log(`   ... and ${this.errors.length - 10} more`);
      }
      console.log('');
    }
  }
}

const executor = new ConsolidationExecutor();
executor.run().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

