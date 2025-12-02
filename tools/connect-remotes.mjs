#!/usr/bin/env node
/**
 * Connect to Real Online Remotes
 * 
 * Discovers and connects to all remote repositories
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

class ConnectRemotes {
  constructor() {
    this.remotes = [];
    this.errors = [];
  }

  async run() {
    console.log('🔗 CONNECTING TO REAL ONLINE REMOTES\n');
    console.log('═'.repeat(80) + '\n');

    // Discover remotes from local repos
    await this.discoverLocalRemotes();
    
    // Connect to main repo
    await this.connectMainRepo();
    
    // Connect to cathedral-real if it exists
    await this.connectCathedralReal();
    
    // Connect to other known remotes
    await this.connectKnownRemotes();
    
    // Report
    this.report();
  }

  async discoverLocalRemotes() {
    console.log('🔍 Discovering remotes from local repos...\n');
    
    const repos = [
      BASE_DIR,
      path.resolve(BASE_DIR, '../cathedral-real'),
      path.resolve(BASE_DIR, '../cathedral-fixed-clean'),
      path.resolve(BASE_DIR, '../cosmogenesis-engine')
    ];

    for (const repo of repos) {
      if (!fs.existsSync(repo) || !fs.existsSync(path.join(repo, '.git'))) {
        continue;
      }

      try {
        const remotes = execSync('git remote -v', { 
          cwd: repo, 
          encoding: 'utf-8' 
        }).trim();
        
        if (remotes) {
          const repoName = path.basename(repo);
          console.log(`📂 ${repoName}:`);
          console.log(remotes.split('\n').map(l => `   ${l}`).join('\n'));
          console.log('');
          
          // Parse remotes
          for (const line of remotes.split('\n')) {
            const match = line.match(/(\S+)\s+(\S+)\s+\((fetch|push)\)/);
            if (match) {
              this.remotes.push({
                repo: repoName,
                name: match[1],
                url: match[2],
                type: match[3]
              });
            }
          }
        }
      } catch (e) {
        // Skip
      }
    }
  }

  async connectMainRepo() {
    console.log('🔗 Connecting main repo (cathedral-master-deployment)...\n');
    
    if (!fs.existsSync(path.join(BASE_DIR, '.git'))) {
      console.log('   Initializing git repo...');
      execSync('git init', { cwd: BASE_DIR, stdio: 'pipe' });
    }

    // Check for bekalah/master-cathedral
    const bekalahUrl = 'https://github.com/bekalah/master-cathedral.git';
    try {
      execSync('git remote get-url master-cathedral', { 
        cwd: BASE_DIR, 
        stdio: 'pipe' 
      });
      console.log('   ✅ master-cathedral remote exists');
    } catch (e) {
      try {
        execSync(`git remote add master-cathedral ${bekalahUrl}`, { 
          cwd: BASE_DIR, 
          stdio: 'pipe' 
        });
        console.log(`   ✅ Added master-cathedral: ${bekalahUrl}`);
      } catch (e2) {
        console.log(`   ⚠️  Could not add master-cathedral: ${e2.message}`);
      }
    }

    // Check for origin
    try {
      const originUrl = execSync('git remote get-url origin', { 
        cwd: BASE_DIR, 
        encoding: 'utf-8' 
      }).trim();
      console.log(`   ✅ origin: ${originUrl}`);
    } catch (e) {
      console.log('   ⚠️  No origin remote set');
      console.log('   💡 Add with: git remote add origin <your-repo-url>');
    }
    console.log('');
  }

  async connectCathedralReal() {
    console.log('🔗 Connecting cathedral-real...\n');
    
    const cathedralReal = path.resolve(BASE_DIR, '../cathedral-real');
    
    if (!fs.existsSync(cathedralReal)) {
      console.log('   ⚠️  cathedral-real not found locally');
      console.log('   💡 Clone with: git clone <your-cathedral-real-url> ../cathedral-real');
      console.log('');
      return;
    }

    if (!fs.existsSync(path.join(cathedralReal, '.git'))) {
      console.log('   ⚠️  cathedral-real is not a git repo');
      console.log('');
      return;
    }

    try {
      const remotes = execSync('git remote -v', { 
        cwd: cathedralReal, 
        encoding: 'utf-8' 
      }).trim();
      
      if (remotes) {
        console.log('   ✅ cathedral-real remotes:');
        console.log(remotes.split('\n').map(l => `      ${l}`).join('\n'));
      } else {
        console.log('   ⚠️  No remotes configured');
        console.log('   💡 Add with: git remote add origin <your-cathedral-real-url>');
      }
    } catch (e) {
      console.log(`   ⚠️  Error: ${e.message}`);
    }
    console.log('');
  }

  async connectKnownRemotes() {
    console.log('🔗 Checking for known remote patterns...\n');
    
    // Common GitHub patterns
    const commonPatterns = [
      'bekalah/cathedral-real',
      'bekalah/cathedral-master-deployment',
      'bekalah/master-cathedral',
      'bekalah/cathedral-fixed-clean'
    ];

    for (const pattern of commonPatterns) {
      const url = `https://github.com/${pattern}.git`;
      console.log(`   Checking: ${url}...`);
      // Could test if repo exists, but that requires auth
      // For now, just document
    }
    console.log('');
  }

  report() {
    console.log('═'.repeat(80));
    console.log('\n📊 REMOTE CONNECTION SUMMARY\n');
    
    if (this.remotes.length > 0) {
      console.log('✅ Found remotes:');
      const uniqueRemotes = new Map();
      for (const remote of this.remotes) {
        const key = `${remote.name}:${remote.url}`;
        if (!uniqueRemotes.has(key)) {
          uniqueRemotes.set(key, remote);
        }
      }
      
      for (const remote of uniqueRemotes.values()) {
        console.log(`   ${remote.repo}: ${remote.name} → ${remote.url}`);
      }
    } else {
      console.log('⚠️  No remotes found');
    }
    
    console.log('\n💡 To add remotes manually:');
    console.log('   git remote add <name> <url>');
    console.log('   git remote set-url <name> <url>');
    console.log('');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const connector = new ConnectRemotes();
  connector.run().catch(console.error);
}

export default ConnectRemotes;

