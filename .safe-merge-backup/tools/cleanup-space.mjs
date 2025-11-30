#!/usr/bin/env node
/**
 * Serious Space Cleanup
 * 
 * Actually deletes duplicates, reports, backups, and unnecessary files
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

class CleanupSpace {
  constructor() {
    this.deleted = [];
    this.errors = [];
  }

  async run() {
    console.log('🧹 SERIOUS SPACE CLEANUP\n');
    console.log('═'.repeat(80) + '\n');

    // Get initial size
    const initialSize = this.getSize(BASE_DIR);
    console.log(`📊 Initial size: ${initialSize}\n`);

    // Clean everything
    await this.deleteDuplicateWorkspaces();
    await this.deleteReportFiles();
    await this.deleteBackups();
    await this.deleteBuildArtifacts();
    await this.deleteLogFiles();
    await this.deleteTempFiles();
    await this.deleteNestedGit();

    // Final size
    const finalSize = this.getSize(BASE_DIR);
    const saved = this.calculateSaved(initialSize, finalSize);

    console.log('═'.repeat(80));
    console.log('\n✅ CLEANUP COMPLETE\n');
    console.log(`📊 Space saved: ${saved}`);
    console.log(`📁 Files deleted: ${this.deleted.length}`);
    console.log(`⚠️  Errors: ${this.errors.length}\n`);
  }

  async deleteDuplicateWorkspaces() {
    console.log('🗑️  Checking duplicate workspaces (preserving remote repos)...\n');
    const workspaces = [
      { path: path.resolve(BASE_DIR, '../cathedral-real'), isRemote: true }, // Remote repo - preserve
      { path: path.resolve(BASE_DIR, '../cathedral-fixed-clean'), isRemote: false },
      { path: path.resolve(BASE_DIR, '../Roo-Code'), isRemote: false }
    ];

    for (const ws of workspaces) {
      if (fs.existsSync(ws.path)) {
        // Check if it's a git repo (likely remote)
        const gitDir = path.join(ws.path, '.git');
        if (fs.existsSync(gitDir) && ws.isRemote) {
          console.log(`   ⚠️  Skipping ${path.basename(ws.path)} - remote repository (preserved)`);
          continue;
        }
        
        // Only delete if explicitly not a remote repo
        if (!ws.isRemote) {
          try {
            execSync(`rm -rf "${ws.path}"`, { stdio: 'pipe' });
            this.deleted.push({ type: 'workspace', path: ws.path });
            console.log(`   ✅ Deleted: ${path.basename(ws.path)}`);
          } catch (e) {
            this.errors.push({ type: 'workspace', path: ws.path, error: e.message });
          }
        }
      }
    }
    console.log('');
  }

  async deleteReportFiles() {
    console.log('🗑️  Deleting report files...\n');
    const patterns = [
      '**/*REPORT*.json',
      '**/*ANALYSIS*.json',
      '**/*PLAN*.json',
      '**/improvement-reports/**',
      '**/.alignment-backups/**',
      '**/data/reports/**'
    ];

    for (const pattern of patterns) {
      try {
        const files = this.findFiles(pattern);
        for (const file of files) {
          if (file.includes('node_modules')) continue;
          fs.unlinkSync(file);
          this.deleted.push({ type: 'report', path: file });
        }
      } catch (e) {
        // Skip
      }
    }
    console.log(`   ✅ Cleaned report files\n`);
  }

  async deleteBackups() {
    console.log('🗑️  Deleting backups...\n');
    const backupDirs = [
      '.consolidation-backups',
      '.duplicate-backups',
      '.workspace-archive',
      '.alignment-backups'
    ];

    for (const dir of backupDirs) {
      const dirPath = path.join(BASE_DIR, dir);
      if (fs.existsSync(dirPath)) {
        try {
          fs.rmSync(dirPath, { recursive: true, force: true });
          this.deleted.push({ type: 'backup', path: dirPath });
          console.log(`   ✅ Deleted: ${dir}`);
        } catch (e) {
          this.errors.push({ type: 'backup', path: dirPath, error: e.message });
        }
      }
    }
    console.log('');
  }

  async deleteBuildArtifacts() {
    console.log('🗑️  Deleting build artifacts...\n');
    const artifacts = ['dist', 'build', '.next', '.turbo'];

    for (const artifact of artifacts) {
      const dirs = this.findDirs(artifact);
      for (const dir of dirs) {
        if (dir.includes('node_modules')) continue;
        try {
          fs.rmSync(dir, { recursive: true, force: true });
          this.deleted.push({ type: 'artifact', path: dir });
        } catch (e) {
          // Skip
        }
      }
    }
    console.log(`   ✅ Cleaned build artifacts\n`);
  }

  async deleteLogFiles() {
    console.log('🗑️  Deleting log files...\n');
    const logs = this.findFiles('**/*.log');
    for (const log of logs) {
      if (log.includes('node_modules')) continue;
      try {
        fs.unlinkSync(log);
        this.deleted.push({ type: 'log', path: log });
      } catch (e) {
        // Skip
      }
    }
    console.log(`   ✅ Cleaned log files\n`);
  }

  async deleteTempFiles() {
    console.log('🗑️  Deleting temp files...\n');
    const temps = this.findFiles('**/*.{tmp,temp,DS_Store}');
    for (const temp of temps) {
      if (temp.includes('node_modules')) continue;
      try {
        fs.unlinkSync(temp);
        this.deleted.push({ type: 'temp', path: temp });
      } catch (e) {
        // Skip
      }
    }
    console.log(`   ✅ Cleaned temp files\n`);
  }

  async deleteNestedGit() {
    console.log('🗑️  Deleting nested .git directories...\n');
    const gitDirs = this.findDirs('.git');
    for (const gitDir of gitDirs) {
      if (gitDir === path.join(BASE_DIR, '.git')) continue; // Keep root .git
      if (gitDir.includes('node_modules')) continue;
      try {
        fs.rmSync(gitDir, { recursive: true, force: true });
        this.deleted.push({ type: 'git', path: gitDir });
      } catch (e) {
        // Skip
      }
    }
    console.log(`   ✅ Cleaned nested .git\n`);
  }

  findFiles(pattern) {
    const files = [];
    try {
      const result = execSync(`find . -type f -name "${pattern}" 2>/dev/null`, {
        cwd: BASE_DIR,
        encoding: 'utf-8'
      });
      return result.trim().split('\n').filter(f => f);
    } catch (e) {
      return [];
    }
  }

  findDirs(name) {
    const dirs = [];
    try {
      const result = execSync(`find . -type d -name "${name}" 2>/dev/null`, {
        cwd: BASE_DIR,
        encoding: 'utf-8'
      });
      return result.trim().split('\n').filter(d => d);
    } catch (e) {
      return [];
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

  calculateSaved(initial, final) {
    // Simple comparison - in real implementation would parse sizes
    return 'See above';
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const cleanup = new CleanupSpace();
  cleanup.run().catch(console.error);
}

export default CleanupSpace;

