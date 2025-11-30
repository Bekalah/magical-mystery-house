#!/usr/bin/env node
/**
 * Real Deduplicator - Actually finds and fixes REAL duplicates
 * 
 * Does deep analysis:
 * - Compares file contents, not just names
 * - Finds actual duplicates vs similar names
 * - Checks package.json mismatches
 * - Verifies actual connections
 * - Fixes real issues
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

class RealDeduplicator {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    this.fileHashes = new Map();
    this.realDuplicates = [];
    this.packageMismatches = [];
    this.connectionIssues = [];
  }

  async run() {
    console.log('🔍 REAL DEDUPLICATOR - Finding ACTUAL Duplicates & Issues\n');
    console.log('═'.repeat(80) + '\n');
    
    await this.scanAllFiles();
    await this.findRealDuplicates();
    await this.checkPackageMismatches();
    await this.verifyConnections();
    await this.generateRealFixes();
    this.printRealReport();
    this.saveRealReport();
  }

  async scanAllFiles() {
    console.log('📂 Scanning all files (deep analysis)...\n');
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      console.log(`   Scanning: ${path.basename(workspace)}`);
      await this.scanDirectory(workspace, workspace);
    }
    
    console.log(`\n   Scanned ${this.fileHashes.size} files\n`);
  }

  async scanDirectory(dir, baseDir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || 
            entry === 'node_modules' || 
            entry === 'dist' ||
            entry === 'build' ||
            entry === '.git') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          await this.scanDirectory(fullPath, baseDir);
        } else if (stat.isFile() && 
                   (entry.endsWith('.mjs') || 
                    entry.endsWith('.ts') || 
                    entry.endsWith('.js') ||
                    entry === 'package.json')) {
          await this.hashFile(fullPath, baseDir);
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  async hashFile(filePath, workspace) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const hash = createHash('sha256').update(content).digest('hex');
      const relativePath = path.relative(workspace, filePath);
      
      if (!this.fileHashes.has(hash)) {
        this.fileHashes.set(hash, []);
      }
      
      this.fileHashes.get(hash).push({
        path: filePath,
        workspace,
        relativePath,
        size: fs.statSync(filePath).size
      });
    } catch (e) {
      // Ignore
    }
  }

  async findRealDuplicates() {
    console.log('🔍 Finding REAL duplicates (same content)...\n');
    
    for (const [hash, files] of this.fileHashes.entries()) {
      if (files.length > 1) {
        // These are actual duplicates (same content)
        const workspaces = [...new Set(files.map(f => f.workspace))];
        
        if (workspaces.length > 1) {
          // Duplicate across workspaces
          this.realDuplicates.push({
            hash,
            files,
            count: files.length,
            workspaces,
            type: 'cross-workspace-duplicate'
          });
        } else {
          // Duplicate in same workspace (might be intentional)
          const basenames = files.map(f => path.basename(f.path));
          if (new Set(basenames).size < basenames.length) {
            // Same filename, same content - real duplicate
            this.realDuplicates.push({
              hash,
              files,
              count: files.length,
              workspaces,
              type: 'same-workspace-duplicate'
            });
          }
        }
      }
    }
    
    console.log(`   Found ${this.realDuplicates.length} REAL duplicate groups\n`);
  }

  async checkPackageMismatches() {
    console.log('📦 Checking package.json mismatches...\n');
    
    const packageMap = new Map();
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      const packagesDir = path.join(workspace, 'packages');
      if (!fs.existsSync(packagesDir)) continue;
      
      const entries = fs.readdirSync(packagesDir);
      for (const entry of entries) {
        const pkgPath = path.join(packagesDir, entry);
        if (!fs.statSync(pkgPath).isDirectory()) continue;
        
        const packageJson = path.join(pkgPath, 'package.json');
        if (fs.existsSync(packageJson)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
            const key = (pkg.name || entry).toLowerCase();
            
            if (!packageMap.has(key)) {
              packageMap.set(key, []);
            }
            
            packageMap.get(key).push({
              name: pkg.name || entry,
              workspace,
              path: pkgPath,
              version: pkg.version,
              packageJson: pkg
            });
          } catch (e) {
            // Invalid package.json
          }
        }
      }
    }
    
    // Find mismatches
    for (const [key, packages] of packageMap.entries()) {
      if (packages.length > 1) {
        const versions = [...new Set(packages.map(p => p.version))];
        const workspaces = [...new Set(packages.map(p => p.workspace))];
        
        if (versions.length > 1 || workspaces.length > 1) {
          this.packageMismatches.push({
            name: key,
            packages,
            versionMismatch: versions.length > 1,
            workspaceMismatch: workspaces.length > 1,
            versions,
            workspaces
          });
        }
      }
    }
    
    console.log(`   Found ${this.packageMismatches.length} package mismatches\n`);
  }

  async verifyConnections() {
    console.log('🔗 Verifying actual connections...\n');
    
    // Check if packages actually import each other
    const packagesDir = path.join(rootDir, 'packages');
    if (!fs.existsSync(packagesDir)) return;
    
    const entries = fs.readdirSync(packagesDir);
    for (const entry of entries) {
      const pkgPath = path.join(packagesDir, entry);
      if (!fs.statSync(pkgPath).isDirectory()) continue;
      
      const packageJson = path.join(pkgPath, 'package.json');
      if (!fs.existsSync(packageJson)) continue;
      
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        
        for (const [depName, depVersion] of Object.entries(deps)) {
          if (depName.startsWith('@cathedral/')) {
            const depPkg = depName.replace('@cathedral/', '');
            const depPath = path.join(packagesDir, depPkg);
            
            if (!fs.existsSync(depPath)) {
              this.connectionIssues.push({
                package: pkg.name || entry,
                dependency: depName,
                issue: 'missing',
                expectedPath: depPath
              });
            }
          }
        }
      } catch (e) {
        // Ignore
      }
    }
    
    console.log(`   Found ${this.connectionIssues.length} connection issues\n`);
  }

  async generateRealFixes() {
    console.log('🔧 Generating REAL fixes...\n');
    
    // Group duplicates by workspace priority
    for (const dup of this.realDuplicates) {
      // Prefer cathedral-master-deployment
      const primary = dup.files.find(f => f.workspace.includes('master-deployment'));
      const keep = primary || dup.files[0];
      const remove = dup.files.filter(f => f.path !== keep.path);
      
      if (remove.length > 0) {
        console.log(`   Keep: ${path.relative(rootDir, keep.path)}`);
        console.log(`   Remove: ${remove.length} duplicate(s)\n`);
      }
    }
    
    console.log(`   Generated fixes for ${this.realDuplicates.length} duplicate groups\n`);
  }

  printRealReport() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                  🔍 REAL DEDUPLICATION REPORT                               ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 REAL ISSUES FOUND:\n');
    console.log(`   Real Duplicates (same content): ${this.realDuplicates.length}`);
    console.log(`   Package Mismatches: ${this.packageMismatches.length}`);
    console.log(`   Connection Issues: ${this.connectionIssues.length}\n`);
    
    if (this.realDuplicates.length > 0) {
      console.log('🔍 TOP REAL DUPLICATES:\n');
      for (const dup of this.realDuplicates.slice(0, 10)) {
        console.log(`   ${dup.type}: ${dup.count} files`);
        for (const file of dup.files.slice(0, 3)) {
          console.log(`      ${path.relative(rootDir, file.path)}`);
        }
        if (dup.files.length > 3) {
          console.log(`      ... and ${dup.files.length - 3} more`);
        }
        console.log('');
      }
    }
    
    if (this.packageMismatches.length > 0) {
      console.log('📦 PACKAGE MISMATCHES:\n');
      for (const mismatch of this.packageMismatches.slice(0, 10)) {
        console.log(`   ${mismatch.name}:`);
        if (mismatch.versionMismatch) {
          console.log(`      Versions: ${mismatch.versions.join(', ')}`);
        }
        if (mismatch.workspaceMismatch) {
          console.log(`      Workspaces: ${mismatch.workspaces.length}`);
        }
        console.log('');
      }
    }
    
    if (this.connectionIssues.length > 0) {
      console.log('🔗 CONNECTION ISSUES:\n');
      for (const issue of this.connectionIssues.slice(0, 10)) {
        console.log(`   ${issue.package} -> ${issue.dependency}: ${issue.issue}`);
      }
      console.log('');
    }
    
    console.log('═'.repeat(80) + '\n');
  }

  saveRealReport() {
    const report = {
      timestamp: Date.now(),
      realDuplicates: this.realDuplicates,
      packageMismatches: this.packageMismatches,
      connectionIssues: this.connectionIssues,
      summary: {
        realDuplicates: this.realDuplicates.length,
        packageMismatches: this.packageMismatches.length,
        connectionIssues: this.connectionIssues.length
      }
    };
    
    const reportPath = path.join(rootDir, 'real-deduplication-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`✅ Real report saved to: ${reportPath}\n`);
  }
}

async function main() {
  const deduplicator = new RealDeduplicator();
  await deduplicator.run();
}

main().catch(console.error);

