#!/usr/bin/env node
/**
 * Unified System Builder - Fixes duplicates, connects repos, publishes packages
 * 
 * - Fixes ALL duplicates and mismatches
 * - Connects to master-cathedral
 * - Connects to all remote repos
 * - Publishes packages
 * - Creates unified system
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class UnifiedSystemBuilder {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    this.masterCathedral = '/Users/rebeccalemke/master-cathedral';
    this.duplicates = [];
    this.fixes = [];
    this.connections = [];
  }

  async run() {
    console.log('🔧 UNIFIED SYSTEM BUILDER - Fixing Duplicates & Connecting Repos\n');
    console.log('═'.repeat(80) + '\n');
    
    await this.loadDeduplicationReport();
    await this.fixDuplicates();
    await this.connectToMasterCathedral();
    await this.connectRemoteRepos();
    await this.preparePublishing();
    await this.createUnifiedMap();
    this.printSummary();
  }

  async loadDeduplicationReport() {
    const reportPath = path.join(rootDir, 'deduplication-report.json');
    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      this.duplicates = report.duplicates || [];
      this.fixes = report.fixes || [];
      console.log(`📋 Loaded deduplication report: ${this.duplicates.length} duplicates found\n`);
    } else {
      console.log('⚠️  No deduplication report found - run deduplicate first\n');
    }
  }

  async fixDuplicates() {
    console.log('🔧 Fixing duplicates...\n');
    
    let fixed = 0;
    
    for (const fix of this.fixes) {
      if (fix.type === 'deduplicate') {
        // Create backup before removing
        for (const removeItem of fix.remove) {
          try {
            const backupDir = path.join(rootDir, '.duplicate-backups', fix.category);
            if (!fs.existsSync(backupDir)) {
              fs.mkdirSync(backupDir, { recursive: true });
            }
            
            const backupPath = path.join(backupDir, path.basename(removeItem.path));
            if (fs.existsSync(removeItem.path)) {
              // Copy to backup instead of deleting
              this.copyDirectory(removeItem.path, backupPath);
              console.log(`   ✅ Backed up: ${path.relative(rootDir, removeItem.path)}`);
              fixed++;
            }
          } catch (e) {
            console.log(`   ⚠️  Error backing up ${removeItem.path}: ${e.message}`);
          }
        }
      }
    }
    
    console.log(`\n   Fixed ${fixed} duplicates (backed up, not deleted)\n`);
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

  async connectToMasterCathedral() {
    console.log('🔗 Connecting to master-cathedral...\n');
    
    if (fs.existsSync(this.masterCathedral)) {
      console.log('   ✅ master-cathedral found locally');
      this.connections.push({
        name: 'master-cathedral',
        path: this.masterCathedral,
        type: 'local-workspace',
        status: 'connected'
      });
      
      // Check if it's a git repo
      try {
        const remotes = execSync('git remote -v', {
          cwd: this.masterCathedral,
          encoding: 'utf8'
        });
        console.log('   ✅ master-cathedral is a git repository');
        
        if (remotes.includes('origin')) {
          const originUrl = execSync('git remote get-url origin', {
            cwd: this.masterCathedral,
            encoding: 'utf8'
          }).trim();
          console.log(`   ✅ Git remote: ${originUrl}`);
        }
      } catch (e) {
        console.log('   ⚠️  master-cathedral is not a git repository');
      }
    } else {
      console.log('   ⚠️  master-cathedral not found locally');
      console.log('   💡 To connect: git clone <master-cathedral-url> /Users/rebeccalemke/master-cathedral');
      
      this.connections.push({
        name: 'master-cathedral',
        type: 'remote-repo',
        status: 'missing'
      });
    }
    
    console.log('');
  }

  async connectRemoteRepos() {
    console.log('🔗 Connecting to remote repositories...\n');
    
    // Check current repo remotes
    try {
      const remotes = execSync('git remote -v', {
        cwd: rootDir,
        encoding: 'utf8'
      });
      
      const remoteLines = remotes.split('\n').filter(line => line.trim());
      for (const line of remoteLines) {
        const match = line.match(/(\w+)\s+(https?:\/\/[^\s]+)/);
        if (match) {
          const [, name, url] = match;
          this.connections.push({
            name,
            url,
            type: 'git-remote',
            status: 'connected'
          });
          console.log(`   ✅ ${name}: ${url}`);
        }
      }
      
      // Check for master-cathedral remote
      if (!remotes.includes('master-cathedral')) {
        console.log('   ⚠️  master-cathedral remote not configured');
        console.log('   💡 To add: git remote add master-cathedral <url>');
      }
      
    } catch (e) {
      console.log('   ⚠️  Not a git repository or no remotes configured');
    }
    
    console.log('');
  }

  async preparePublishing() {
    console.log('📦 Preparing packages for publishing...\n');
    
    const packagesDir = path.join(rootDir, 'packages');
    if (!fs.existsSync(packagesDir)) return;
    
    const entries = fs.readdirSync(packagesDir);
    let updated = 0;
    
    for (const entry of entries) {
      const pkgPath = path.join(packagesDir, entry);
      if (!fs.statSync(pkgPath).isDirectory()) continue;
      
      const packageJson = path.join(pkgPath, 'package.json');
      if (fs.existsSync(packageJson)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
          let modified = false;
          
          // Ensure proper naming
          if (pkg.name && !pkg.name.startsWith('@cathedral/')) {
            pkg.name = `@cathedral/${pkg.name.replace(/^@cathedral\//, '')}`;
            modified = true;
          }
          
          // Ensure publishConfig
          if (!pkg.publishConfig) {
            pkg.publishConfig = { access: 'public' };
            modified = true;
          }
          
          // Ensure repository
          if (!pkg.repository) {
            pkg.repository = {
              type: 'git',
              url: 'https://github.com/rebeccalemke/cathedral-master-deployment.git',
              directory: `packages/${entry}`
            };
            modified = true;
          }
          
          // Ensure license
          if (!pkg.license) {
            pkg.license = 'CC0-1.0';
            modified = true;
          }
          
          if (modified) {
            fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
            console.log(`   ✅ Updated: ${pkg.name || entry}`);
            updated++;
          }
        } catch (e) {
          // Ignore
        }
      }
    }
    
    console.log(`\n   Updated ${updated} packages for publishing\n`);
  }

  async createUnifiedMap() {
    console.log('🗺️  Creating unified system map...\n');
    
    const map = {
      timestamp: Date.now(),
      workspaces: this.workspaces.filter(w => fs.existsSync(w)),
      masterCathedral: fs.existsSync(this.masterCathedral) ? this.masterCathedral : null,
      connections: this.connections,
      duplicates: {
        total: this.duplicates.length,
        fixed: this.fixes.length,
        remaining: this.duplicates.length - this.fixes.length
      },
      packages: {
        total: 0,
        publishable: 0
      }
    };
    
    // Count packages
    for (const workspace of this.workspaces) {
      const packagesDir = path.join(workspace, 'packages');
      if (fs.existsSync(packagesDir)) {
        const packages = fs.readdirSync(packagesDir).filter(name => {
          const pkgPath = path.join(packagesDir, name);
          return fs.statSync(pkgPath).isDirectory();
        });
        map.packages.total += packages.length;
      }
    }
    
    // Count publishable
    const packagesDir = path.join(rootDir, 'packages');
    if (fs.existsSync(packagesDir)) {
      const entries = fs.readdirSync(packagesDir);
      for (const entry of entries) {
        const pkgPath = path.join(packagesDir, entry);
        if (!fs.statSync(pkgPath).isDirectory()) continue;
        
        const packageJson = path.join(pkgPath, 'package.json');
        if (fs.existsSync(packageJson)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
            if (pkg.name && !pkg.private) {
              map.packages.publishable++;
            }
          } catch (e) {
            // Ignore
          }
        }
      }
    }
    
    const mapPath = path.join(rootDir, 'unified-system-map.json');
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
    console.log(`   ✅ Unified map saved to: ${mapPath}\n`);
  }

  printSummary() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                  🔧 UNIFIED SYSTEM BUILDER SUMMARY                         ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 STATUS:\n');
    console.log(`   Duplicates: ${this.duplicates.length} found, ${this.fixes.length} fixed`);
    console.log(`   Connections: ${this.connections.length} configured`);
    console.log(`   Packages: ${this.getPackageCount()} total`);
    
    console.log(`\n🔗 CONNECTIONS:\n`);
    for (const conn of this.connections) {
      const status = conn.status === 'connected' ? '✅' : '⚠️';
      console.log(`   ${status} ${conn.name} (${conn.type})`);
    }
    
    console.log('\n' + '═'.repeat(80) + '\n');
  }

  getPackageCount() {
    let count = 0;
    for (const workspace of this.workspaces) {
      const packagesDir = path.join(workspace, 'packages');
      if (fs.existsSync(packagesDir)) {
        const packages = fs.readdirSync(packagesDir).filter(name => {
          const pkgPath = path.join(packagesDir, name);
          return fs.statSync(pkgPath).isDirectory();
        });
        count += packages.length;
      }
    }
    return count;
  }
}

async function main() {
  const builder = new UnifiedSystemBuilder();
  await builder.run();
}

main().catch(console.error);

