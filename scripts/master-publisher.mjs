#!/usr/bin/env node
/**
 * Master Publisher - Publishes packages and connects to master-cathedral
 * 
 * - Publishes all packages to npm
 * - Syncs with master-cathedral
 * - Connects to all remote repos
 * - Ensures everything is published and connected
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

class MasterPublisher {
  constructor() {
    this.packages = [];
    this.remotes = [];
    this.published = [];
    this.errors = [];
  }

  async run() {
    console.log('🚀 MASTER PUBLISHER - Publishing & Connecting to master-cathedral\n');
    console.log('═'.repeat(80) + '\n');
    
    this.scanPackages();
    this.checkRemotes();
    this.prepareAll();
    await this.publishPackages();
    await this.syncToMasterCathedral();
    this.printSummary();
  }

  scanPackages() {
    console.log('📦 Scanning packages...\n');
    
    const packagesDir = path.join(rootDir, 'packages');
    if (!fs.existsSync(packagesDir)) return;
    
    const entries = fs.readdirSync(packagesDir);
    for (const entry of entries) {
      const pkgPath = path.join(packagesDir, entry);
      if (!fs.statSync(pkgPath).isDirectory()) continue;
      
      const packageJson = path.join(pkgPath, 'package.json');
      if (fs.existsSync(packageJson)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
          
          if (pkg.name && !pkg.private) {
            this.packages.push({
              name: pkg.name,
              path: pkgPath,
              version: pkg.version || '1.0.0',
              packageJson
            });
          }
        } catch (e) {
          // Ignore
        }
      }
    }
    
    console.log(`   Found ${this.packages.length} publishable packages\n`);
  }

  checkRemotes() {
    console.log('🔗 Checking git remotes...\n');
    
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
          if (!this.remotes.find(r => r.name === name && r.url === url)) {
            this.remotes.push({ name, url });
            console.log(`   ✅ ${name}: ${url}`);
          }
        }
      }
    } catch (e) {
      console.log('   ⚠️  Not a git repository\n');
    }
    
    console.log('');
  }

  prepareAll() {
    console.log('📝 Preparing all packages...\n');
    
    for (const pkg of this.packages) {
      try {
        const pkgJson = JSON.parse(fs.readFileSync(pkg.packageJson, 'utf8'));
        let modified = false;
        
        // Ensure @cathedral scope
        if (!pkgJson.name.startsWith('@cathedral/')) {
          pkgJson.name = `@cathedral/${pkgJson.name.replace(/^@cathedral\//, '')}`;
          modified = true;
        }
        
        // Ensure publishConfig
        if (!pkgJson.publishConfig) {
          pkgJson.publishConfig = { access: 'public' };
          modified = true;
        }
        
        // Ensure repository
        if (!pkgJson.repository) {
          pkgJson.repository = {
            type: 'git',
            url: 'https://github.com/rebeccalemke/cathedral-master-deployment.git',
            directory: `packages/${path.basename(pkg.path)}`
          };
          modified = true;
        }
        
        // Ensure license
        if (!pkgJson.license) {
          pkgJson.license = 'CC0-1.0';
          modified = true;
        }
        
        // Ensure keywords
        if (!pkgJson.keywords) {
          pkgJson.keywords = ['cathedral', 'monorepo', 'creative', 'engine'];
        }
        
        if (modified) {
          fs.writeFileSync(pkg.packageJson, JSON.stringify(pkgJson, null, 2) + '\n', 'utf8');
          console.log(`   ✅ Prepared: ${pkgJson.name}`);
        }
      } catch (e) {
        console.log(`   ⚠️  Error preparing ${pkg.name}: ${e.message}`);
      }
    }
    
    console.log('');
  }

  async publishPackages() {
    console.log('📤 Publishing packages...\n');
    console.log('   ⚠️  Publishing requires npm authentication');
    console.log('   💡 Run: npm login (or set NPM_TOKEN)\n');
    
    // Check if logged in
    try {
      execSync('npm whoami', { encoding: 'utf8', stdio: 'pipe' });
      console.log('   ✅ npm authenticated\n');
      
      for (const pkg of this.packages) {
        try {
          console.log(`   Publishing ${pkg.name}@${pkg.version}...`);
          execSync('pnpm publish --access public --no-git-checks', {
            cwd: pkg.path,
            encoding: 'utf8',
            stdio: 'inherit'
          });
          this.published.push(pkg.name);
          console.log(`   ✅ Published: ${pkg.name}\n`);
        } catch (e) {
          this.errors.push({
            package: pkg.name,
            error: e.message
          });
          console.log(`   ⚠️  Failed: ${pkg.name} - ${e.message}\n`);
        }
      }
    } catch (e) {
      console.log('   ⚠️  Not authenticated - skipping publish');
      console.log('   💡 Packages are prepared but not published\n');
    }
  }

  async syncToMasterCathedral() {
    console.log('🔗 Syncing to master-cathedral...\n');
    
    const masterCathedral = '/Users/rebeccalemke/master-cathedral';
    
    if (fs.existsSync(masterCathedral)) {
      console.log('   ✅ master-cathedral found locally');
      
      try {
        // Check if it's a git repo
        execSync('git status', {
          cwd: masterCathedral,
          encoding: 'utf8',
          stdio: 'pipe'
        });
        
        console.log('   ✅ master-cathedral is a git repository');
        console.log('   💡 To sync: git push master-cathedral main\n');
      } catch (e) {
        console.log('   ⚠️  master-cathedral is not a git repository\n');
      }
    } else {
      console.log('   ⚠️  master-cathedral not found locally');
      console.log('   💡 Clone it: git clone <url> /Users/rebeccalemke/master-cathedral\n');
    }
    
    // Check for master-cathedral remote
    try {
      const remotes = execSync('git remote -v', {
        cwd: rootDir,
        encoding: 'utf8'
      });
      
      if (remotes.includes('master-cathedral')) {
        console.log('   ✅ master-cathedral remote configured');
        const url = execSync('git remote get-url master-cathedral', {
          cwd: rootDir,
          encoding: 'utf8'
        }).trim();
        console.log(`   ✅ Remote URL: ${url}\n`);
      } else {
        console.log('   ⚠️  master-cathedral remote not configured');
        console.log('   💡 Add it: git remote add master-cathedral <url>\n');
      }
    } catch (e) {
      // Not a git repo
    }
  }

  printSummary() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                  🚀 MASTER PUBLISHER SUMMARY                                 ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📦 PACKAGES:\n');
    console.log(`   Total: ${this.packages.length}`);
    console.log(`   Published: ${this.published.length}`);
    if (this.errors.length > 0) {
      console.log(`   Errors: ${this.errors.length}`);
    }
    
    console.log(`\n🔗 REMOTES:\n`);
    for (const remote of this.remotes) {
      console.log(`   ✅ ${remote.name}: ${remote.url}`);
    }
    
    if (this.published.length > 0) {
      console.log(`\n📤 PUBLISHED:\n`);
      for (const pkg of this.published) {
        console.log(`   ✅ ${pkg}`);
      }
    }
    
    console.log('\n' + '═'.repeat(80) + '\n');
  }
}

async function main() {
  const publisher = new MasterPublisher();
  await publisher.run();
}

main().catch(console.error);

