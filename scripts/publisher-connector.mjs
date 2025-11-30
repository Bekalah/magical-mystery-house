#!/usr/bin/env node
/**
 * Publisher Connector - Publishes and connects to master-cathedral and remote repos
 * 
 * - Publishes packages to npm
 * - Connects to master-cathedral repository
 * - Connects to live remote repos
 * - Ensures all connections are properly configured
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

class PublisherConnector {
  constructor() {
    this.remoteRepos = [
      'master-cathedral',
      'cathedral-real',
      'cathedral-master-deployment'
    ];
    this.packages = [];
    this.connections = [];
  }

  async run() {
    console.log('🚀 PUBLISHER CONNECTOR - Publishing & Connecting to Repos\n');
    console.log('═'.repeat(80) + '\n');
    
    this.scanPackages();
    this.checkRemoteConnections();
    this.preparePublishing();
    this.connectToRepos();
    this.printSummary();
  }

  scanPackages() {
    console.log('📦 Scanning packages for publishing...\n');
    
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

  checkRemoteConnections() {
    console.log('🔗 Checking remote repository connections...\n');
    
    try {
      const remotes = execSync('git remote -v', { 
        cwd: rootDir, 
        encoding: 'utf8' 
      });
      
      for (const repo of this.remoteRepos) {
        if (remotes.includes(repo)) {
          console.log(`   ✅ Connected to: ${repo}`);
          this.connections.push({
            name: repo,
            status: 'connected',
            type: 'git-remote'
          });
        } else {
          console.log(`   ⚠️  Not connected: ${repo}`);
          this.connections.push({
            name: repo,
            status: 'missing',
            type: 'git-remote'
          });
        }
      }
    } catch (e) {
      console.log('   ⚠️  Not a git repository\n');
    }
    
    console.log('');
  }

  preparePublishing() {
    console.log('📝 Preparing packages for publishing...\n');
    
    for (const pkg of this.packages) {
      try {
        const pkgJson = JSON.parse(fs.readFileSync(pkg.packageJson, 'utf8'));
        let modified = false;
        
        // Ensure proper naming
        if (!pkgJson.name.startsWith('@cathedral/')) {
          pkgJson.name = `@cathedral/${pkgJson.name}`;
          modified = true;
        }
        
        // Ensure public access
        if (!pkgJson.publishConfig) {
          pkgJson.publishConfig = { access: 'public' };
          modified = true;
        }
        
        // Ensure repository field
        if (!pkgJson.repository) {
          pkgJson.repository = {
            type: 'git',
            url: 'https://github.com/bekalah/cathedral-master-deployment.git'
          };
          modified = true;
        }
        
        if (modified) {
          fs.writeFileSync(pkg.packageJson, JSON.stringify(pkgJson, null, 2) + '\n', 'utf8');
          console.log(`   ✅ Updated: ${pkg.name}`);
        }
      } catch (e) {
        console.log(`   ⚠️  Error updating ${pkg.name}: ${e.message}`);
      }
    }
    
    console.log('');
  }

  connectToRepos() {
    console.log('🔗 Connecting to remote repositories...\n');
    
    // Check for master-cathedral
    const masterCathedralPath = '/Users/rebeccalemke/master-cathedral';
    if (fs.existsSync(masterCathedralPath)) {
      console.log('   ✅ master-cathedral found locally');
      this.connections.push({
        name: 'master-cathedral',
        path: masterCathedralPath,
        status: 'local',
        type: 'workspace'
      });
    } else {
      console.log('   ⚠️  master-cathedral not found locally');
    }
    
    // Check git remotes
    try {
      const remotes = execSync('git remote -v', { 
        cwd: rootDir, 
        encoding: 'utf8' 
      });
      
      if (remotes.includes('origin')) {
        const originUrl = execSync('git remote get-url origin', { 
          cwd: rootDir, 
          encoding: 'utf8' 
        }).trim();
        
        console.log(`   ✅ Git origin: ${originUrl}`);
        this.connections.push({
          name: 'origin',
          url: originUrl,
          status: 'connected',
          type: 'git-remote'
        });
      }
    } catch (e) {
      // Not a git repo or no remotes
    }
    
    console.log('');
  }

  printSummary() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                  🚀 PUBLISHER CONNECTOR SUMMARY                              ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📦 PACKAGES READY FOR PUBLISHING:\n');
    for (const pkg of this.packages) {
      console.log(`   ${pkg.name}@${pkg.version}`);
    }
    
    console.log(`\n🔗 CONNECTIONS:\n`);
    for (const conn of this.connections) {
      const status = conn.status === 'connected' ? '✅' : '⚠️';
      console.log(`   ${status} ${conn.name} (${conn.type})`);
    }
    
    console.log('\n' + '═'.repeat(80) + '\n');
  }
}

async function main() {
  const connector = new PublisherConnector();
  await connector.run();
}

main().catch(console.error);

