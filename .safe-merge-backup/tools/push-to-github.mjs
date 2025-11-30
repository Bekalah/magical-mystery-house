#!/usr/bin/env node
/**
 * Push to GitHub - bekalah
 * 
 * Commits and pushes all changes to bekalah GitHub repository
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

class PushToGitHub {
  constructor() {
    this.committed = [];
    this.pushed = [];
    this.errors = [];
  }

  async pushAll() {
    console.log('🚀 PUSHING TO GITHUB - bekalah\n');
    console.log('═'.repeat(80) + '\n');

    // Step 1: Check git status
    await this.checkGitStatus();

    // Step 2: Add all changes
    await this.addAllChanges();

    // Step 3: Commit changes
    await this.commitChanges();

    // Step 4: Check remote
    await this.checkRemote();

    // Step 5: Push to GitHub
    await this.pushToGitHub();

    // Step 6: Generate report
    this.generateReport();
  }

  async checkGitStatus() {
    console.log('📊 Checking git status...\n');

    try {
      const status = execSync('git status --porcelain', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      if (status.trim()) {
        const lines = status.trim().split('\n');
        console.log(`   Found ${lines.length} changed files\n`);
      } else {
        console.log('   No changes to commit\n');
      }
    } catch (e) {
      this.errors.push({ type: 'git-status', error: e.message });
      console.log(`   ⚠️  Git status check failed: ${e.message}\n`);
    }
  }

  async addAllChanges() {
    console.log('➕ Adding all changes...\n');

    try {
      execSync('git add -A', {
        cwd: BASE_DIR,
        stdio: 'pipe'
      });
      console.log('   ✅ All changes added\n');
    } catch (e) {
      this.errors.push({ type: 'git-add', error: e.message });
      console.log(`   ⚠️  Failed to add changes: ${e.message}\n`);
    }
  }

  async commitChanges() {
    console.log('💾 Committing changes...\n');

    const timestamp = new Date().toISOString();
    const message = `Organize, merge, and debug all data - ${timestamp}`;

    try {
      execSync(`git commit -m "${message}"`, {
        cwd: BASE_DIR,
        stdio: 'pipe'
      });
      this.committed.push({ message, timestamp });
      console.log(`   ✅ Committed: ${message}\n`);
    } catch (e) {
      // Check if there's nothing to commit
      if (e.message.includes('nothing to commit')) {
        console.log('   ℹ️  Nothing to commit\n');
      } else {
        this.errors.push({ type: 'git-commit', error: e.message });
        console.log(`   ⚠️  Commit failed: ${e.message}\n`);
      }
    }
  }

  async checkRemote() {
    console.log('🔗 Checking remote...\n');

    try {
      const remotes = execSync('git remote -v', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      // Check if bekalah remote exists
      if (remotes.includes('master-cathedral') || remotes.includes('bekalah') || remotes.includes('github.com/bekalah')) {
        console.log('   ✅ bekalah remote found\n');
      } else {
        // Try to add bekalah remote
        console.log('   ⚠️  bekalah remote not found, attempting to add...\n');
        
        // Try to detect repository name
        const repoName = path.basename(BASE_DIR);
        const possibleUrls = [
          `https://github.com/bekalah/${repoName}.git`,
          `git@github.com:bekalah/${repoName}.git`
        ];

        for (const url of possibleUrls) {
          try {
            execSync(`git remote add bekalah ${url}`, {
              cwd: BASE_DIR,
              stdio: 'pipe'
            });
            console.log(`   ✅ Added remote: ${url}\n`);
            break;
          } catch (e) {
            // Try next URL
          }
        }
      }
    } catch (e) {
      this.errors.push({ type: 'git-remote', error: e.message });
      console.log(`   ⚠️  Remote check failed: ${e.message}\n`);
    }
  }

  async pushToGitHub() {
    console.log('🚀 Pushing to GitHub...\n');

    try {
      // Try to push to bekalah remote or origin
      const remotes = execSync('git remote', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        encoding: 'utf-8'
      });

      let remote = 'origin';
      if (remotes.includes('master-cathedral')) {
        remote = 'master-cathedral';
      } else if (remotes.includes('bekalah')) {
        remote = 'bekalah';
      }

      // Get current branch
      const branch = execSync('git branch --show-current', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        encoding: 'utf-8'
      }).trim() || 'main';

      execSync(`git push ${remote} ${branch}`, {
        cwd: BASE_DIR,
        stdio: 'inherit'
      });

      this.pushed.push({ remote, branch, timestamp: new Date().toISOString() });
      console.log(`\n   ✅ Pushed to ${remote}/${branch}\n`);
    } catch (e) {
      this.errors.push({ type: 'git-push', error: e.message });
      console.log(`   ⚠️  Push failed: ${e.message}\n`);
      console.log('   💡 You may need to set up GitHub authentication\n');
    }
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      committed: this.committed,
      pushed: this.pushed,
      errors: this.errors,
      summary: {
        totalCommitted: this.committed.length,
        totalPushed: this.pushed.length,
        totalErrors: this.errors.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'GITHUB_PUSH_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 GitHub Push Report\n');
    console.log(`✅ Committed: ${this.committed.length}`);
    console.log(`🚀 Pushed: ${this.pushed.length}`);
    console.log(`⚠️  Errors: ${this.errors.length}`);
    console.log(`\n📄 Report saved: ${reportPath}\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const pusher = new PushToGitHub();
  pusher.pushAll().catch(console.error);
}

export default PushToGitHub;

