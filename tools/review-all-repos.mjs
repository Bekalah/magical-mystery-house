#!/usr/bin/env node
/**
 * Review All Online and Offline Repositories
 * 
 * Discovers and maps all repositories (local and remote)
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
const HOME_DIR = path.resolve(BASE_DIR, '../..');

class ReviewAllRepos {
  constructor() {
    this.localRepos = [];
    this.remoteRepos = [];
    this.connections = [];
    this.orphaned = [];
    this.missing = [];
  }

  async run() {
    console.log('🔍 REVIEWING ALL REPOSITORIES\n');
    console.log('═'.repeat(80) + '\n');

    await this.discoverLocalRepos();
    await this.discoverRemoteRepos();
    await this.mapConnections();
    await this.identifyIssues();
    this.generateReport();
  }

  async discoverLocalRepos() {
    console.log('📂 Discovering local repositories...\n');
    
    const searchDirs = [
      HOME_DIR,
      path.resolve(HOME_DIR, 'cathedral-master-deployment'),
      path.resolve(HOME_DIR, 'cathedral-real'),
      path.resolve(HOME_DIR, 'cathedral-fixed-clean'),
      path.resolve(HOME_DIR, 'cosmogenesis-engine'),
      path.resolve(HOME_DIR, 'Roo-Code')
    ];

    for (const dir of searchDirs) {
      if (!fs.existsSync(dir)) continue;
      
      // Check if it's a git repo
      if (fs.existsSync(path.join(dir, '.git'))) {
        try {
          const remotes = this.getRemotes(dir);
          const branch = this.getCurrentBranch(dir);
          const lastCommit = this.getLastCommit(dir);
          
          this.localRepos.push({
            path: dir,
            name: path.basename(dir),
            remotes: remotes,
            branch: branch,
            lastCommit: lastCommit,
            size: this.getSize(dir)
          });
          
          console.log(`   ✅ ${path.basename(dir)}`);
          if (remotes.length > 0) {
            remotes.forEach(r => console.log(`      → ${r.name}: ${r.url}`));
          } else {
            console.log(`      ⚠️  No remotes configured`);
          }
        } catch (e) {
          console.log(`   ⚠️  ${path.basename(dir)}: ${e.message}`);
        }
      }
      
      // Also check subdirectories
      if (fs.statSync(dir).isDirectory()) {
        try {
          const entries = fs.readdirSync(dir);
          for (const entry of entries) {
            const entryPath = path.join(dir, entry);
            if (fs.statSync(entryPath).isDirectory() && fs.existsSync(path.join(entryPath, '.git'))) {
              const remotes = this.getRemotes(entryPath);
              this.localRepos.push({
                path: entryPath,
                name: entry,
                remotes: remotes,
                branch: this.getCurrentBranch(entryPath),
                lastCommit: this.getLastCommit(entryPath),
                size: this.getSize(entryPath)
              });
              console.log(`   ✅ ${entry} (in ${path.basename(dir)})`);
            }
          }
        } catch (e) {
          // Skip
        }
      }
    }
    console.log('');
  }

  async discoverRemoteRepos() {
    console.log('🌐 Discovering remote repositories...\n');
    
    // Check GitHub using gh CLI and git ls-remote
    const knownRepos = [
      'Bekalah/cathedral-master',
      'Bekalah/cathedral',
      'Bekalah/BUILDING-CATHEDRALS',
      'Bekalah/cathedral-integration-workspace',
      'Bekalah/cathedral-minimal',
      'Bekalah/circuitum99-minimal',
      'Bekalah/stone-grimoire',
      'Bekalah/codex-14499',
      'Bekalah/cathedral-vercel',
      'Bekalah/master-catalog-browser',
      'Bekalah/cathedral-connection-map',
      'Bekalah/cosmogenesis-learning-engine',
      'Bekalah/circuitum99',
      'Bekalah/cathedral-research',
      'Bekalah/liber-arcanae',
      'Bekalah/magical-mystery-house',
      'Bekalah/liber-arcanae-game',
      'Bekalah/Cathedral-updates',
      'Bekalah/wallaby-tutorial',
      'Bekalah/BOOKS'
    ];

    for (const repo of knownRepos) {
      try {
        const url = `https://github.com/${repo}.git`;
        const result = execSync(`git ls-remote ${url} 2>&1`, { 
          encoding: 'utf-8',
          timeout: 5000
        });
        
        if (result && !result.includes('Repository not found') && !result.includes('fatal:')) {
          const branches = result.split('\n')
            .filter(l => l.includes('refs/heads/'))
            .map(l => l.split('refs/heads/')[1]?.trim())
            .filter(Boolean);
          
          this.remoteRepos.push({
            name: repo,
            url: url,
            exists: true,
            branches: branches
          });
          console.log(`   ✅ ${repo}`);
          console.log(`      Branches: ${branches.join(', ') || 'default'}`);
        } else {
          this.remoteRepos.push({
            name: repo,
            url: url,
            exists: false
          });
          console.log(`   ⚠️  ${repo} - Not found or not accessible`);
        }
      } catch (e) {
        this.remoteRepos.push({
          name: repo,
          url: `https://github.com/${repo}.git`,
          exists: false,
          error: e.message
        });
        console.log(`   ⚠️  ${repo} - ${e.message}`);
      }
    }
    console.log('');
  }

  async mapConnections() {
    console.log('🔗 Mapping connections...\n');
    
    for (const local of this.localRepos) {
      for (const remote of local.remotes) {
        // Find matching remote repo
        const remoteRepo = this.remoteRepos.find(r => 
          r.url === remote.url || 
          r.url.replace('.git', '') === remote.url.replace('.git', '')
        );
        
        if (remoteRepo) {
          this.connections.push({
            local: local.name,
            localPath: local.path,
            remote: remoteRepo.name,
            remoteUrl: remoteRepo.url,
            connection: remote.name,
            status: remoteRepo.exists ? 'connected' : 'remote_not_found'
          });
        } else {
          // Orphaned - local has remote but remote doesn't exist
          this.orphaned.push({
            local: local.name,
            remote: remote.url,
            connection: remote.name
          });
        }
      }
    }
    
    // Find missing - remote exists but no local
    for (const remote of this.remoteRepos) {
      if (!remote.exists) continue;
      
      const hasLocal = this.localRepos.some(local => 
        local.remotes.some(r => 
          r.url === remote.url || 
          r.url.replace('.git', '') === remote.url.replace('.git', '')
        )
      );
      
      if (!hasLocal) {
        this.missing.push({
          remote: remote.name,
          url: remote.url,
          branches: remote.branches
        });
      }
    }
    
    console.log(`   ✅ Found ${this.connections.length} connections`);
    console.log(`   ⚠️  ${this.orphaned.length} orphaned remotes`);
    console.log(`   📥 ${this.missing.length} missing local repos\n`);
  }

  async identifyIssues() {
    console.log('🔍 Identifying issues...\n');
    
    // Check for repos with no remotes
    const noRemotes = this.localRepos.filter(r => r.remotes.length === 0);
    if (noRemotes.length > 0) {
      console.log(`   ⚠️  ${noRemotes.length} local repos with no remotes:`);
      noRemotes.forEach(r => console.log(`      - ${r.name}`));
    }
    
    // Check for outdated remotes
    const outdated = this.connections.filter(c => c.status === 'remote_not_found');
    if (outdated.length > 0) {
      console.log(`   ⚠️  ${outdated.length} remotes pointing to non-existent repos`);
    }
    
    console.log('');
  }

  getRemotes(repoPath) {
    try {
      const result = execSync('git remote -v', { 
        cwd: repoPath, 
        encoding: 'utf-8' 
      });
      
      const remotes = [];
      for (const line of result.trim().split('\n')) {
        const match = line.match(/(\S+)\s+(\S+)\s+\((fetch|push)\)/);
        if (match) {
          const existing = remotes.find(r => r.name === match[1]);
          if (!existing) {
            remotes.push({
              name: match[1],
              url: match[2],
              type: match[3]
            });
          }
        }
      }
      return remotes;
    } catch (e) {
      return [];
    }
  }

  getCurrentBranch(repoPath) {
    try {
      return execSync('git branch --show-current', { 
        cwd: repoPath, 
        encoding: 'utf-8' 
      }).trim();
    } catch (e) {
      return 'unknown';
    }
  }

  getLastCommit(repoPath) {
    try {
      return execSync('git log -1 --format=%ci', { 
        cwd: repoPath, 
        encoding: 'utf-8' 
      }).trim();
    } catch (e) {
      return 'unknown';
    }
  }

  getSize(dir) {
    try {
      const result = execSync(`du -sh "${dir}" 2>/dev/null`, { encoding: 'utf-8' });
      return result.trim().split('\t')[0];
    } catch (e) {
      return 'unknown';
    }
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      localRepos: this.localRepos.map(r => ({
        name: r.name,
        path: r.path,
        size: r.size,
        branch: r.branch,
        lastCommit: r.lastCommit,
        remotes: r.remotes.length
      })),
      remoteRepos: this.remoteRepos,
      connections: this.connections,
      orphaned: this.orphaned,
      missing: this.missing,
      summary: {
        totalLocal: this.localRepos.length,
        totalRemote: this.remoteRepos.filter(r => r.exists).length,
        connected: this.connections.length,
        orphaned: this.orphaned.length,
        missing: this.missing.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'REPO_REVIEW.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('═'.repeat(80));
    console.log('\n📊 REPOSITORY REVIEW SUMMARY\n');
    console.log(`📂 Local Repositories: ${this.localRepos.length}`);
    console.log(`🌐 Remote Repositories: ${this.remoteRepos.filter(r => r.exists).length}`);
    console.log(`🔗 Connected: ${this.connections.length}`);
    console.log(`⚠️  Orphaned: ${this.orphaned.length}`);
    console.log(`📥 Missing Locally: ${this.missing.length}`);
    console.log(`\n📄 Full report: ${reportPath}\n`);
    
    // Show missing repos that need to be cloned
    if (this.missing.length > 0) {
      console.log('📥 Repositories to clone:\n');
      this.missing.forEach(m => {
        console.log(`   git clone ${m.url} ${m.remote.split('/')[1]}`);
      });
      console.log('');
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const reviewer = new ReviewAllRepos();
  reviewer.run().catch(console.error);
}

export default ReviewAllRepos;

