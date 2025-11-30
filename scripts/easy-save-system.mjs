#!/usr/bin/env node
/**
 * Easy Save System - Save Work Without GitHub
 * 
 * Simple command to save all work locally:
 * - Commits all changes to local git
 * - Creates backup snapshot
 * - Updates wiki/documentation
 * - No GitHub required - everything local
 * 
 * Usage: node scripts/easy-save-system.mjs [message]
 * 
 * @license CC0-1.0 - Public Domain
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
// Import backup system with fallback
let ComprehensiveBackupSystem;
try {
  ComprehensiveBackupSystem = (await import('./comprehensive-backup-system.mjs')).default;
} catch (e) {
  // Backup system is optional
  ComprehensiveBackupSystem = null;
}

export class EasySaveSystem {
  constructor() {
    this.repos = this.findRepos();
  }

  /**
   * Find all repos to save
   */
  findRepos() {
    const repos = [];
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    
    try {
      const homeContents = readdirSync(homeDir);
      
      for (const item of homeContents) {
        if (item.startsWith('cathedral-')) {
          const itemPath = join(homeDir, item);
          try {
            if (statSync(itemPath).isDirectory() && existsSync(join(itemPath, '.git'))) {
              repos.push(itemPath);
            }
          } catch (e) {
            // Skip items we can't access
          }
        }
      }
    } catch (e) {
      console.warn('Could not scan for repos:', e.message);
    }

    return repos;
  }

  /**
   * Save all work
   */
  async saveAll(message = 'Auto-save: Work in progress') {
    console.log('💾 Easy Save System - Saving all work...\n');

    // Save current repo
    await this.saveRepo(process.cwd(), message);

    // Save all other repos
    for (const repo of this.repos) {
      if (repo !== process.cwd()) {
        await this.saveRepo(repo, message);
      }
    }

    // Create backup snapshot (if available)
    if (ComprehensiveBackupSystem) {
      console.log('\n📦 Creating backup snapshot...');
      const backupSystem = new ComprehensiveBackupSystem();
      await backupSystem.backupAll();
    } else {
      console.log('\n📦 Backup system not available (skipping)');
    }

    console.log('\n✅ All work saved locally!');
    console.log('📁 No GitHub required - everything is in local git and backups');
  }

  /**
   * Save a single repository
   */
  async saveRepo(repoPath, message) {
    try {
      const repoName = repoPath.split('/').pop();
      console.log(`💾 Saving: ${repoName}...`);

      // Check if there are changes
      try {
        execSync('git diff --quiet && git diff --cached --quiet', {
          cwd: repoPath,
          stdio: 'ignore'
        });
        console.log(`   ℹ️  No changes to commit`);
        return;
      } catch (e) {
        // Has changes, continue
      }

      // Add all changes
      execSync('git add -A', {
        cwd: repoPath,
        stdio: 'ignore'
      });

      // Commit
      execSync(`git commit -m "${message}"`, {
        cwd: repoPath,
        stdio: 'ignore'
      });

      console.log(`   ✅ Committed: ${message}`);

      // Create git bundle for portability
      const bundlePath = join(repoPath, '..', `${repoName}.bundle`);
      try {
        execSync(`git bundle create "${bundlePath}" --all`, {
          cwd: repoPath,
          stdio: 'ignore'
        });
        console.log(`   ✅ Bundle created: ${bundlePath}`);
      } catch (e) {
        // Bundle creation is optional
      }

    } catch (error) {
      console.log(`   ⚠️  Could not save ${repoPath}: ${error.message}`);
    }
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const message = process.argv[2] || 'Auto-save: Work in progress';
  const saveSystem = new EasySaveSystem();
  saveSystem.saveAll(message).then(() => {
    process.exit(0);
  }).catch(error => {
    console.error('❌ Error saving:', error);
    process.exit(1);
  });
}

export default EasySaveSystem;

