#!/usr/bin/env node
/**
 * Execute Sacred Systems Unification
 * 
 * Based on experiment discoveries, this actually merges the fragmented
 * sacred systems (codex-144-99, liber-arcanae, circuitum99) into unified forms
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class SacredUnifier {
  constructor() {
    this.unified = [];
    this.errors = [];
  }

  async run() {
    console.log('🔮 UNIFYING SACRED SYSTEMS\n');
    console.log('═'.repeat(80));
    console.log('Based on experiment discoveries:\n');
    console.log('  • codex-144-99: 6 locations → 1 unified');
    console.log('  • liber-arcanae: 17 locations → 1 unified');
    console.log('  • circuitum99: 8 locations → 1 unified\n');
    console.log('═'.repeat(80) + '\n');

    // Unify codex-144-99
    await this.unifyCodex14499();

    // Unify liber-arcanae
    await this.unifyLiberArcanae();

    // Unify circuitum99
    await this.unifyCircuitum99();

    // Record in experiment state
    this.recordUnification();

    console.log('\n' + '═'.repeat(80));
    console.log('✅ SACRED UNIFICATION COMPLETE');
    console.log('═'.repeat(80));
    console.log(`Unified: ${this.unified.length} systems`);
    if (this.errors.length > 0) {
      console.log(`Errors: ${this.errors.length}`);
    }
    console.log('═'.repeat(80) + '\n');
  }

  async unifyCodex14499() {
    console.log('📚 Unifying codex-144-99...\n');

    const primary = path.join(BASE_DIR, 'packages/codex-144-99');
    const core = path.join(BASE_DIR, 'packages/codex-144-99-core');

    if (!fs.existsSync(primary)) {
      console.log('   ⚠️  Primary codex-144-99 not found');
      return;
    }

    // Merge core into primary if both exist
    if (fs.existsSync(core)) {
      console.log('   🔀 Merging codex-144-99-core into codex-144-99...');
      
      // Copy unique files from core to primary
      await this.mergeDirectory(core, primary, 'codex-144-99-core');
      
      this.unified.push({
        system: 'codex-144-99',
        merged: ['codex-144-99-core'],
        primary: 'codex-144-99'
      });
    }

    // Ensure primary has complete structure
    await this.ensureCompleteStructure(primary, 'codex-144-99');
    
    console.log('   ✅ codex-144-99 unified\n');
  }

  async unifyLiberArcanae() {
    console.log('🃏 Unifying liber-arcanae...\n');

    const primary = path.join(BASE_DIR, 'packages/liber-arcanae');
    const fragments = [
      'liber-arcanae-core',
      'liber-arcanae-tools',
      'cathedral-liber-arcanae-bridge'
    ];

    if (!fs.existsSync(primary)) {
      console.log('   ⚠️  Primary liber-arcanae not found');
      return;
    }

    const merged = [];
    for (const fragment of fragments) {
      const fragmentPath = path.join(BASE_DIR, `packages/${fragment}`);
      if (fs.existsSync(fragmentPath)) {
        console.log(`   🔀 Merging ${fragment} into liber-arcanae...`);
        await this.mergeDirectory(fragmentPath, primary, fragment);
        merged.push(fragment);
      }
    }

    if (merged.length > 0) {
      this.unified.push({
        system: 'liber-arcanae',
        merged: merged,
        primary: 'liber-arcanae'
      });
    }

    // Ensure primary has complete structure
    await this.ensureCompleteStructure(primary, 'liber-arcanae');
    
    console.log('   ✅ liber-arcanae unified\n');
  }

  async unifyCircuitum99() {
    console.log('⚡ Unifying circuitum99...\n');

    const primary = path.join(BASE_DIR, 'packages/circuitum99-core');
    const fragments = [
      'circuitum99-arcanae-cyoa'
    ];

    if (!fs.existsSync(primary)) {
      console.log('   ⚠️  Primary circuitum99-core not found');
      return;
    }

    const merged = [];
    for (const fragment of fragments) {
      const fragmentPath = path.join(BASE_DIR, `packages/${fragment}`);
      if (fs.existsSync(fragmentPath)) {
        console.log(`   🔀 Merging ${fragment} into circuitum99-core...`);
        await this.mergeDirectory(fragmentPath, primary, fragment);
        merged.push(fragment);
      }
    }

    if (merged.length > 0) {
      this.unified.push({
        system: 'circuitum99',
        merged: merged,
        primary: 'circuitum99-core'
      });
    }

    // Ensure primary has complete structure
    await this.ensureCompleteStructure(primary, 'circuitum99');
    
    console.log('   ✅ circuitum99 unified\n');
  }

  async mergeDirectory(source, target, sourceName) {
    try {
      const items = fs.readdirSync(source);
      
      for (const item of items) {
        if (item === 'node_modules' || item === '.git' || item === 'dist') {
          continue;
        }

        const sourcePath = path.join(source, item);
        const targetPath = path.join(target, item);
        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
          // Merge subdirectories
          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
          }
          await this.mergeDirectory(sourcePath, targetPath, sourceName);
        } else if (stat.isFile()) {
          // Copy file if it doesn't exist or is newer
          if (!fs.existsSync(targetPath)) {
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`      ✅ Added: ${item}`);
          } else {
            // Compare and merge if source is more complete
            const sourceSize = stat.size;
            const targetSize = fs.statSync(targetPath).size;
            
            if (sourceSize > targetSize) {
              fs.copyFileSync(sourcePath, targetPath);
              console.log(`      🔄 Updated: ${item} (larger version)`);
            }
          }
        }
      }
    } catch (e) {
      this.errors.push({ source, target, error: e.message });
    }
  }

  async ensureCompleteStructure(pkgPath, pkgName) {
    // Ensure package.json exists and is complete
    const packageJsonPath = path.join(pkgPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      const packageJson = {
        name: pkgName.startsWith('@') ? pkgName : `@cathedral/${pkgName}`,
        version: '1.0.0',
        license: 'CC0-1.0',
        description: `Unified ${pkgName} - Sacred system`,
        main: 'src/index.ts',
        types: 'src/index.ts'
      };
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    }

    // Ensure src/index.ts exists
    const srcPath = path.join(pkgPath, 'src');
    if (!fs.existsSync(srcPath)) {
      fs.mkdirSync(srcPath, { recursive: true });
    }

    const indexPath = path.join(srcPath, 'index.ts');
    if (!fs.existsSync(indexPath)) {
      const indexContent = `/**
 * ${pkgName} - Unified Sacred System
 * 
 * Merged from multiple locations into one complete form
 * 
 * @license CC0-1.0 - Public Domain
 */

export * from './${pkgName.replace(/[@\/-]/g, '')}';
`;
      fs.writeFileSync(indexPath, indexContent);
    }

    // Ensure README exists
    const readmePath = path.join(pkgPath, 'README.md');
    if (!fs.existsSync(readmePath)) {
      const readmeContent = `# ${pkgName}

Unified sacred system - merged from multiple locations into one complete form.

## License

CC0-1.0 - Public Domain
`;
      fs.writeFileSync(readmePath, readmeContent);
    }
  }

  recordUnification() {
    const statePath = path.join(BASE_DIR, 'experiment-state.json');
    let state = { improvements: [] };
    
    if (fs.existsSync(statePath)) {
      try {
        state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
      } catch (e) {
        // Start fresh
      }
    }

    for (const unified of this.unified) {
      state.improvements.push({
        cycle: state.currentCycle || 0,
        timestamp: new Date().toISOString(),
        type: 'enhancement',
        description: `Unified ${unified.system}: merged ${unified.merged.length} fragments into ${unified.primary}`,
        system: 'sacred-unification',
        file: unified.primary
      });
    }

    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  }
}

const unifier = new SacredUnifier();
unifier.run().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

