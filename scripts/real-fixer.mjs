#!/usr/bin/env node
/**
 * Real Fixer - Actually fixes duplicates and mismatches
 * 
 * - Removes REAL duplicates (same content)
 * - Fixes package.json mismatches
 * - Creates proper connections
 * - Ensures everything is unified
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class RealFixer {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    this.primaryWorkspace = '/Users/rebeccalemke/cathedral-master-deployment';
    this.fixed = [];
    this.removed = [];
    this.errors = [];
  }

  async run() {
    console.log('🔧 REAL FIXER - Actually Fixing Duplicates & Mismatches\n');
    console.log('═'.repeat(80) + '\n');
    
    await this.loadRealReport();
    await this.fixRealDuplicates();
    await this.fixPackageMismatches();
    await this.createProperConnections();
    this.printSummary();
    this.saveFixReport();
  }

  async loadRealReport() {
    const reportPath = path.join(rootDir, 'real-deduplication-report.json');
    if (!fs.existsSync(reportPath)) {
      console.log('⚠️  No real deduplication report found');
      console.log('   Run: ppnpm run deduplicate first\n');
      return;
    }
    
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    this.realDuplicates = report.realDuplicates || [];
    this.packageMismatches = report.packageMismatches || [];
    this.connectionIssues = report.connectionIssues || [];
    
    console.log(`📋 Loaded:`);
    console.log(`   Real duplicates: ${this.realDuplicates.length}`);
    console.log(`   Package mismatches: ${this.packageMismatches.length}`);
    console.log(`   Connection issues: ${this.connectionIssues.length}\n`);
  }

  async fixRealDuplicates() {
    console.log('🔧 Fixing REAL duplicates...\n');
    
    let fixed = 0;
    
    for (const dup of this.realDuplicates) {
      if (dup.type === 'cross-workspace-duplicate') {
        // Keep primary workspace, remove others
        const primary = dup.files.find(f => f.workspace === this.primaryWorkspace);
        
        if (primary) {
          const remove = dup.files.filter(f => f.path !== primary.path);
          
          for (const file of remove) {
            try {
              // Create backup first
              const backupDir = path.join(rootDir, '.real-duplicate-backups');
              if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
              }
              
              const relativePath = path.relative(file.workspace, file.path);
              const backupPath = path.join(backupDir, path.basename(file.workspace), relativePath);
              const backupParent = path.dirname(backupPath);
              
              if (!fs.existsSync(backupParent)) {
                fs.mkdirSync(backupParent, { recursive: true });
              }
              
              // Copy to backup
              if (fs.statSync(file.path).isDirectory()) {
                this.copyDirectory(file.path, backupPath);
              } else {
                fs.copyFileSync(file.path, backupPath);
              }
              
              // Remove duplicate
              if (fs.statSync(file.path).isDirectory()) {
                fs.rmSync(file.path, { recursive: true, force: true });
              } else {
                fs.unlinkSync(file.path);
              }
              
              this.removed.push({
                path: file.path,
                workspace: file.workspace,
                backedUp: backupPath
              });
              
              fixed++;
              console.log(`   ✅ Removed: ${path.relative(rootDir, file.path)}`);
            } catch (e) {
              this.errors.push({
                path: file.path,
                error: e.message
              });
              console.log(`   ⚠️  Error removing ${file.path}: ${e.message}`);
            }
          }
        }
      }
    }
    
    console.log(`\n   Fixed ${fixed} real duplicates\n`);
  }

  copyDirectory(src, dest) {
    if (!fs.existsSync(src)) return;
    
    if (fs.statSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      const entries = fs.readdirSync(src);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules') continue;
        
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);
        
        if (fs.statSync(srcPath).isDirectory()) {
          this.copyDirectory(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  async fixPackageMismatches() {
    console.log('📦 Fixing package mismatches...\n');
    
    let fixed = 0;
    
    for (const mismatch of this.packageMismatches) {
      // Keep primary workspace version
      const primary = mismatch.packages.find(p => p.workspace === this.primaryWorkspace);
      
      if (primary) {
        // Update other workspaces to match primary
        const others = mismatch.packages.filter(p => p.path !== primary.path);
        
        for (const other of others) {
          try {
            const otherPkg = JSON.parse(fs.readFileSync(other.packageJson, 'utf8'));
            const primaryPkg = JSON.parse(fs.readFileSync(primary.packageJson, 'utf8'));
            
            // Update version to match
            otherPkg.version = primaryPkg.version;
            
            // Update other fields to match if needed
            if (primaryPkg.description) {
              otherPkg.description = primaryPkg.description;
            }
            
            fs.writeFileSync(other.packageJson, JSON.stringify(otherPkg, null, 2) + '\n', 'utf8');
            
            this.fixed.push({
              package: mismatch.name,
              workspace: other.workspace,
              fix: 'version-synced'
            });
            
            fixed++;
            console.log(`   ✅ Synced: ${mismatch.name} in ${path.basename(other.workspace)}`);
          } catch (e) {
            this.errors.push({
              package: mismatch.name,
              error: e.message
            });
          }
        }
      }
    }
    
    console.log(`\n   Fixed ${fixed} package mismatches\n`);
  }

  async createProperConnections() {
    console.log('🔗 Creating proper connections...\n');
    
    // Ensure all packages in primary workspace have proper dependencies
    const packagesDir = path.join(this.primaryWorkspace, 'packages');
    if (!fs.existsSync(packagesDir)) return;
    
    const entries = fs.readdirSync(packagesDir);
    let connected = 0;
    
    for (const entry of entries) {
      const pkgPath = path.join(packagesDir, entry);
      if (!fs.statSync(pkgPath).isDirectory()) continue;
      
      const packageJson = path.join(pkgPath, 'package.json');
      if (!fs.existsSync(packageJson)) continue;
      
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        let modified = false;
        
        // Check each dependency
        for (const [depName, depVersion] of Object.entries(deps)) {
          if (depName.startsWith('@cathedral/')) {
            const depPkg = depName.replace('@cathedral/', '');
            const depPath = path.join(packagesDir, depPkg);
            
            if (!fs.existsSync(depPath)) {
              // Dependency missing - check other workspaces
              for (const workspace of this.workspaces) {
                if (workspace === this.primaryWorkspace) continue;
                
                const otherDepPath = path.join(workspace, 'packages', depPkg);
                if (fs.existsSync(otherDepPath)) {
                  // Copy from other workspace
                  const backupDir = path.join(rootDir, '.duplicate-backups');
                  if (!fs.existsSync(backupDir)) {
                    fs.mkdirSync(backupDir, { recursive: true });
                  }
                  
                  this.copyDirectory(otherDepPath, depPath);
                  console.log(`   ✅ Copied missing package: ${depPkg}`);
                  connected++;
                  break;
                }
              }
            }
          }
        }
        
        if (modified) {
          fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
        }
      } catch (e) {
        // Ignore
      }
    }
    
    console.log(`\n   Connected ${connected} missing packages\n`);
  }

  printSummary() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                  🔧 REAL FIXER SUMMARY                                       ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 FIXES APPLIED:\n');
    console.log(`   Duplicates removed: ${this.removed.length}`);
    console.log(`   Packages fixed: ${this.fixed.length}`);
    console.log(`   Errors: ${this.errors.length}\n`);
    
    if (this.removed.length > 0) {
      console.log('🗑️  REMOVED DUPLICATES:\n');
      for (const item of this.removed.slice(0, 10)) {
        console.log(`   ${path.relative(rootDir, item.path)}`);
        console.log(`      Backed up to: ${path.relative(rootDir, item.backedUp)}\n`);
      }
      if (this.removed.length > 10) {
        console.log(`   ... and ${this.removed.length - 10} more\n`);
      }
    }
    
    console.log('═'.repeat(80) + '\n');
  }

  saveFixReport() {
    const report = {
      timestamp: Date.now(),
      removed: this.removed,
      fixed: this.fixed,
      errors: this.errors,
      summary: {
        removed: this.removed.length,
        fixed: this.fixed.length,
        errors: this.errors.length
      }
    };
    
    const reportPath = path.join(rootDir, 'real-fix-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`✅ Fix report saved to: ${reportPath}\n`);
  }
}

async function main() {
  const fixer = new RealFixer();
  await fixer.run();
}

main().catch(console.error);

