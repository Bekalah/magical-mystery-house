#!/usr/bin/env node
/**
 * Comprehensive Backup System
 * 
 * Creates comprehensive backups of all repositories
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

class ComprehensiveBackupSystem {
  constructor() {
    this.backups = [];
    this.errors = [];
  }

  async backupAll() {
    console.log('📦 Comprehensive Backup System\n');
    console.log('═'.repeat(80) + '\n');

    // Find all repos
    const repos = this.findRepos();
    console.log(`📁 Found ${repos.length} repositories to backup\n`);

    // Backup each repo
    for (const repo of repos) {
      await this.backupRepo(repo);
    }

    // Generate report
    this.generateReport();
  }

  findRepos() {
    const repos = [];
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    
    try {
      const homeContents = fs.readdirSync(homeDir);
      
      for (const item of homeContents) {
        if (item.startsWith('cathedral-') || item === 'Roo-Code' || item === 'cosmogenesis-engine') {
          const itemPath = path.join(homeDir, item);
          try {
            if (fs.statSync(itemPath).isDirectory() && fs.existsSync(path.join(itemPath, '.git'))) {
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

    // Always include current repo
    if (!repos.includes(BASE_DIR)) {
      repos.push(BASE_DIR);
    }

    return repos;
  }

  async backupRepo(repoPath) {
    try {
      const repoName = path.basename(repoPath);
      console.log(`📦 Backing up: ${repoName}...`);

      // Create backup directory
      const backupDir = path.join(BASE_DIR, 'backups', repoName);
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      // Create timestamped backup
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(backupDir, `backup-${timestamp}`);

      // Create git bundle if possible
      try {
        execSync(`git bundle create ${backupPath}.bundle --all`, {
          cwd: repoPath,
          stdio: 'pipe'
        });
        console.log(`   ✅ Created git bundle: ${backupPath}.bundle`);
        this.backups.push({
          repo: repoName,
          path: `${backupPath}.bundle`,
          type: 'git-bundle',
          timestamp: Date.now()
        });
      } catch (e) {
        // Fallback to tar archive
        try {
          execSync(`tar -czf ${backupPath}.tar.gz -C ${repoPath} .`, {
            stdio: 'pipe'
          });
          console.log(`   ✅ Created tar archive: ${backupPath}.tar.gz`);
          this.backups.push({
            repo: repoName,
            path: `${backupPath}.tar.gz`,
            type: 'tar',
            timestamp: Date.now()
          });
        } catch (e2) {
          console.warn(`   ⚠️  Could not create backup for ${repoName}`);
          this.errors.push({
            repo: repoName,
            error: e2.message
          });
        }
      }
    } catch (e) {
      console.error(`   ❌ Error backing up ${repoPath}:`, e.message);
      this.errors.push({
        repo: path.basename(repoPath),
        error: e.message
      });
    }
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      backups: this.backups,
      errors: this.errors,
      summary: {
        totalBackups: this.backups.length,
        totalErrors: this.errors.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'BACKUP_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 Backup Report\n');
    console.log(`✅ Backups Created: ${this.backups.length}`);
    console.log(`⚠️  Errors: ${this.errors.length}`);
    console.log(`\n📄 Report saved: ${reportPath}\n`);

    if (this.backups.length > 0) {
      console.log('Backups Created:');
      this.backups.forEach(backup => {
        console.log(`  ✅ ${backup.repo} - ${backup.type} - ${new Date(backup.timestamp).toISOString()}`);
      });
    }

    if (this.errors.length > 0) {
      console.log('\nErrors:');
      this.errors.forEach(error => {
        console.log(`  ⚠️  ${error.repo}: ${error.error}`);
      });
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const backupSystem = new ComprehensiveBackupSystem();
  backupSystem.backupAll().catch(console.error);
}

export default ComprehensiveBackupSystem;

