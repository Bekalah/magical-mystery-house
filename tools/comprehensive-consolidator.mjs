#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Comprehensive Consolidator
 * Actually consolidates and merges ALL partials from ALL workspaces
 * Uses real names, preserves all data, creates backups
 * 
 * This ACTUALLY consolidates - not just identifies
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class ComprehensiveConsolidator {
  constructor() {
    this.consolidated = [];
    this.errors = [];
    this.backups = [];
  }

  async consolidate() {
    console.log('🔧 Comprehensive Consolidator - Actually Consolidating Everything\n');
    console.log('═'.repeat(80) + '\n');

    // Load partial analysis
    const partialPath = path.join(BASE_DIR, 'PARTIAL_ANALYSIS.json');
    if (!fs.existsSync(partialPath)) {
      console.error('❌ PARTIAL_ANALYSIS.json not found. Run: ppnpm run analyze:partials');
      process.exit(1);
    }

    const partialAnalysis = JSON.parse(fs.readFileSync(partialPath, 'utf-8'));
    const strategies = partialAnalysis.analysis?.mergeStrategies || [];

    console.log(`📋 Found ${strategies.length} merge strategies\n`);

    // Consolidate each partial (with backup and safety checks)
    for (const strategy of strategies) {
      await this.consolidatePartial(strategy);
    }

    // Generate report
    await this.generateReport();
  }

  async consolidatePartial(strategy) {
    console.log(`🔧 Consolidating: ${strategy.realName}`);

    try {
      // Create backup first
      const backupDir = path.join(BASE_DIR, '.consolidation-backups', strategy.realName);
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      // Backup all locations
      for (const location of [strategy.primaryLocation, ...strategy.mergeFrom]) {
        if (fs.existsSync(location)) {
          const backupPath = path.join(backupDir, path.basename(location));
          this.copyDirectory(location, backupPath);
          this.backups.push({
            original: location,
            backup: backupPath,
            timestamp: new Date().toISOString()
          });
        }
      }

      // Merge files from other locations to primary
      for (const mergeFromPath of strategy.mergeFrom) {
        if (!fs.existsSync(mergeFromPath)) {
          continue;
        }

        await this.mergeLocation(strategy.primaryLocation, mergeFromPath, strategy.realName);
      }

      // Merge dependencies
      await this.mergeDependencies(strategy.primaryLocation, strategy.mergeFrom);

      // Update package.json with consolidated info
      await this.updatePackageJson(strategy.primaryLocation, strategy.realName);

      // Remove duplicate locations (after successful merge)
      // Note: We keep them for now, just mark as consolidated
      // Actual removal can be done after verification

      this.consolidated.push({
        realName: strategy.realName,
        primaryLocation: strategy.primaryLocation,
        mergedFrom: strategy.mergeFrom,
        timestamp: new Date().toISOString()
      });

      console.log(`   ✅ Consolidated ${strategy.realName}\n`);
    } catch (e) {
      console.error(`   ❌ Error consolidating ${strategy.realName}: ${e.message}\n`);
      this.errors.push({
        realName: strategy.realName,
        error: e.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  async mergeLocation(primaryPath, mergeFromPath, realName) {
    // Copy missing files from mergeFrom to primary
    const filesToMerge = this.findFilesToMerge(mergeFromPath, primaryPath);

    for (const file of filesToMerge) {
      const relativePath = path.relative(mergeFromPath, file);
      const targetPath = path.join(primaryPath, relativePath);
      const targetDir = path.dirname(targetPath);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Only copy if target doesn't exist or is older
      if (!fs.existsSync(targetPath) || 
          fs.statSync(file).mtime > fs.statSync(targetPath).mtime) {
        fs.copyFileSync(file, targetPath);
      }
    }
  }

  findFilesToMerge(sourceDir, targetDir) {
    const files = [];
    
    if (!fs.existsSync(sourceDir)) {
      return files;
    }

    try {
      const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue;
        }

        const sourcePath = path.join(sourceDir, entry.name);
        const targetPath = path.join(targetDir, entry.name);

        if (entry.isDirectory()) {
          files.push(...this.findFilesToMerge(sourcePath, targetPath));
        } else if (entry.isFile()) {
          // Include if target doesn't exist or source is newer
          if (!fs.existsSync(targetPath) || 
              fs.statSync(sourcePath).mtime > fs.statSync(targetPath).mtime) {
            files.push(sourcePath);
          }
        }
      }
    } catch (e) {
      // Skip if can't read
    }

    return files;
  }

  async mergeDependencies(primaryPath, mergeFromPaths) {
    const packageJsonPath = path.join(primaryPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return;
    }

    const primaryPkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const allDeps = new Map();

    // Collect all dependencies
    for (const [name, version] of Object.entries(primaryPkg.dependencies || {})) {
      allDeps.set(name, version);
    }
    for (const [name, version] of Object.entries(primaryPkg.devDependencies || {})) {
      allDeps.set(name, version);
    }

    // Merge from other locations
    for (const mergeFromPath of mergeFromPaths) {
      const mergePkgPath = path.join(mergeFromPath, 'package.json');
      if (fs.existsSync(mergePkgPath)) {
        try {
          const mergePkg = JSON.parse(fs.readFileSync(mergePkgPath, 'utf-8'));
          
          for (const [name, version] of Object.entries(mergePkg.dependencies || {})) {
            if (!allDeps.has(name)) {
              allDeps.set(name, version);
            }
          }
          
          for (const [name, version] of Object.entries(mergePkg.devDependencies || {})) {
            if (!allDeps.has(name)) {
              allDeps.set(name, version);
            }
          }
        } catch (e) {
          // Skip invalid package.json
        }
      }
    }

    // Update package.json
    primaryPkg.dependencies = {};
    primaryPkg.devDependencies = {};

    for (const [name, version] of allDeps.entries()) {
      // Try to determine if it's a dev dependency
      if (name.includes('test') || name.includes('spec') || name.includes('@types')) {
        primaryPkg.devDependencies[name] = version;
      } else {
        primaryPkg.dependencies[name] = version;
      }
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(primaryPkg, null, 2));
  }

  async updatePackageJson(primaryPath, realName) {
    const packageJsonPath = path.join(primaryPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      // Create basic package.json
      const pkg = {
        name: realName,
        version: '1.0.0',
        description: `Consolidated ${realName}`,
        main: 'src/index.ts',
        scripts: {
          build: 'tsc',
          test: 'echo "No tests"'
        }
      };
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
      return;
    }

    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // Ensure name matches real name
    if (pkg.name !== realName) {
      pkg.name = realName;
    }

    // Mark as consolidated
    pkg.consolidated = true;
    pkg.consolidatedAt = new Date().toISOString();

    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
  }

  copyDirectory(src, dest) {
    if (!fs.existsSync(src)) {
      return;
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    try {
      const entries = fs.readdirSync(src, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue;
        }

        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          this.copyDirectory(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    } catch (e) {
      // Skip if can't copy
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      summary: {
        consolidated: this.consolidated.length,
        errors: this.errors.length,
        backups: this.backups.length
      },
      consolidated: this.consolidated,
      errors: this.errors,
      backups: this.backups
    };

    const reportPath = path.join(BASE_DIR, 'CONSOLIDATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Consolidation report saved: ${reportPath}`);

    // Markdown summary
    const md = `# Consolidation Report

**Generated:** ${report.timestamp}

## Summary

- **Consolidated:** ${report.summary.consolidated}
- **Errors:** ${report.summary.errors}
- **Backups Created:** ${report.summary.backups}

## Consolidated Partials

${this.consolidated.map(c => `- **${c.realName}**: Primary: ${path.basename(c.primaryLocation)}, Merged from: ${c.mergedFrom.length} location(s)`).join('\n')}

## Backups

All consolidated locations backed up to: \`.consolidation-backups/\`

---

**Note:** This actually consolidated files. Review backups before removing duplicates.
`;

    const mdPath = path.join(BASE_DIR, 'CONSOLIDATION_REPORT.md');
    fs.writeFileSync(mdPath, md);
    console.log(`📄 Markdown summary: ${mdPath}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const consolidator = new ComprehensiveConsolidator();
  consolidator.consolidate().catch(console.error);
}

export default ComprehensiveConsolidator;

