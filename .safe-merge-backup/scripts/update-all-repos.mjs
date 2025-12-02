#!/usr/bin/env node
/**
 * Update All Repos - Sync backup system across all repositories
 * 
 * Updates all Cathedral repositories with:
 * - Backup system scripts
 * - Easy save system
 * - Package.json scripts
 * - Works without GitHub
 * 
 * @license CC0-1.0 - Public Domain
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const HOME_DIR = process.env.HOME || process.env.USERPROFILE;

export class UpdateAllRepos {
  constructor() {
    this.repos = this.findRepos();
    this.filesToCopy = [
      'scripts/comprehensive-backup-system.mjs',
      'scripts/easy-save-system.mjs'
    ];
  }

  findRepos() {
    const repos = [];
    try {
      const homeContents = readdirSync(HOME_DIR);
      
      for (const item of homeContents) {
        if (item.startsWith('cathedral-')) {
          const itemPath = join(HOME_DIR, item);
          try {
            if (statSync(itemPath).isDirectory() && existsSync(join(itemPath, '.git'))) {
              repos.push({
                name: item,
                path: itemPath
              });
            }
          } catch (e) {
            // Skip
          }
        }
      }
    } catch (e) {
      console.warn('Could not find repos:', e.message);
    }
    return repos;
  }

  async updateAll() {
    console.log('🔄 Updating all repositories with backup system...\n');

    for (const repo of this.repos) {
      await this.updateRepo(repo);
    }

    console.log('\n✅ All repositories updated!');
  }

  async updateRepo(repo) {
    try {
      console.log(`📦 Updating: ${repo.name}...`);

      // Ensure scripts directory exists
      const scriptsDir = join(repo.path, 'scripts');
      if (!existsSync(scriptsDir)) {
        mkdirSync(scriptsDir, { recursive: true });
      }

      // Copy backup system files
      for (const file of this.filesToCopy) {
        const source = join(process.cwd(), file);
        const dest = join(repo.path, file);
        
        if (existsSync(source)) {
          // Ensure destination directory exists
          const destDir = join(dest, '..');
          if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true });
          }
          
          cpSync(source, dest);
          console.log(`   ✅ Copied: ${file}`);
        }
      }

      // Update package.json
      await this.updatePackageJson(repo);

      // Make scripts executable
      try {
        execSync(`chmod +x ${join(repo.path, 'scripts')}/*.mjs`, {
          stdio: 'ignore',
          cwd: repo.path
        });
      } catch (e) {
        // chmod may not work on all systems
      }

      console.log(`   ✅ Updated: ${repo.name}`);

    } catch (error) {
      console.log(`   ⚠️  Error updating ${repo.name}: ${error.message}`);
    }
  }

  async updatePackageJson(repo) {
    const packageJsonPath = join(repo.path, 'package.json');
    
    if (!existsSync(packageJsonPath)) {
      // Create basic package.json if it doesn't exist
      const basicPackage = {
        name: repo.name,
        version: '1.0.0',
        private: true,
        scripts: {
          save: 'node scripts/easy-save-system.mjs',
          backup: 'node scripts/comprehensive-backup-system.mjs',
          'backup:all': 'node scripts/comprehensive-backup-system.mjs && node scripts/easy-save-system.mjs'
        },
        license: 'CC0-1.0'
      };
      writeFileSync(packageJsonPath, JSON.stringify(basicPackage, null, 2));
      return;
    }

    // Update existing package.json
    try {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }

      packageJson.scripts.save = 'node scripts/easy-save-system.mjs';
      packageJson.scripts.backup = 'node scripts/comprehensive-backup-system.mjs';
      packageJson.scripts['backup:all'] = 'node scripts/comprehensive-backup-system.mjs && node scripts/easy-save-system.mjs';
      
      // Ensure pnpm is the package manager
      packageJson.packageManager = 'ppnpm@8.0.0';

      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`   ✅ Updated package.json`);
    } catch (e) {
      console.log(`   ⚠️  Could not update package.json: ${e.message}`);
    }
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const updater = new UpdateAllRepos();
  updater.updateAll().then(() => {
    process.exit(0);
  }).catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

export default UpdateAllRepos;

