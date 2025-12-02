#!/usr/bin/env node
/**
 * Update All Security - Comprehensive Security Update Across All Repos
 * 
 * Updates all Cathedral repositories with:
 * - pnpm-workspace.yaml (if missing)
 * - .npmrc with security settings
 * - Security audit tool
 * - Package.json security fields
 * - Turbo security task
 * - OpenSpec security documentation
 * 
 * @license CC0-1.0 - Public Domain
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const HOME_DIR = process.env.HOME || process.env.USERPROFILE;

const NPMRC_CONTENT = `# pnpm Security Configuration
# Blocks risky postinstall scripts, delays new packages, enforces trust

auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false

# Security: Block risky postinstall scripts (pnpm v10+)
enable-pre-post-scripts=false

# Security: Delay new packages (24 hours = 1440 minutes)
# Prevents installation of packages until they've been available for 24h
# Allows community time to identify vulnerabilities
minimum-release-age=1440

# Security: Enforce strict trust policy
# Prevents installation if trust level has decreased
trust-policy=strict

# Performance
prefer-frozen-lockfile=true
save-workspace-protocol=true
`;

const PNPM_WORKSPACE_CONTENT = `packages:
  - 'packages/*'
  - 'apps/*'
`;

export class UpdateAllSecurity {
  constructor() {
    this.repos = this.findRepos();
    this.stats = {
      repos: 0,
      updated: 0,
      errors: [],
      warnings: []
    };
  }

  findRepos() {
    const repos = [];
    try {
      const homeContents = readdirSync(HOME_DIR);
      
      for (const item of homeContents) {
        if (item.startsWith('cathedral-') && !item.includes('.bundle')) {
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
      this.stats.warnings.push(`Could not find repos: ${e.message}`);
    }
    return repos;
  }

  async updateAll() {
    console.log('🔒 Updating security across all repositories...\n');

    for (const repo of this.repos) {
      await this.updateRepo(repo);
    }

    console.log('\n✅ Security update complete!');
    console.log(`📊 Stats: ${this.stats.repos} repos, ${this.stats.updated} updated`);
    if (this.stats.errors.length > 0) {
      console.log(`❌ Errors: ${this.stats.errors.length}`);
    }
    if (this.stats.warnings.length > 0) {
      console.log(`⚠️  Warnings: ${this.stats.warnings.length}`);
    }

    return this.stats;
  }

  async updateRepo(repo) {
    try {
      console.log(`📦 Updating: ${repo.name}...`);

      // Create/update pnpm-workspace.yaml
      await this.updatePnpmWorkspace(repo);

      // Create/update .npmrc
      await this.updateNpmrc(repo);

      // Copy security audit tool
      await this.copySecurityAudit(repo);

      // Update package.json files
      await this.updatePackageJson(repo);

      // Update turbo.json
      await this.updateTurboJson(repo);

      // Update OpenSpec
      await this.updateOpenSpec(repo);

      this.stats.repos++;
      this.stats.updated++;
      console.log(`   ✅ Updated: ${repo.name}`);

    } catch (error) {
      this.stats.errors.push(`Error updating ${repo.name}: ${error.message}`);
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  async updatePnpmWorkspace(repo) {
    const workspacePath = join(repo.path, 'pnpm-workspace.yaml');
    
    if (!existsSync(workspacePath)) {
      writeFileSync(workspacePath, PNPM_WORKSPACE_CONTENT);
      console.log(`   ✅ Created pnpm-workspace.yaml`);
    } else {
      console.log(`   ℹ️  pnpm-workspace.yaml exists`);
    }
  }

  async updateNpmrc(repo) {
    const npmrcPath = join(repo.path, '.npmrc');
    
    writeFileSync(npmrcPath, NPMRC_CONTENT);
    console.log(`   ✅ Updated .npmrc`);
  }

  async copySecurityAudit(repo) {
    const sourcePath = join(process.cwd(), 'scripts/security-audit.mjs');
    const destPath = join(repo.path, 'scripts/security-audit.mjs');
    
    // Skip if source and dest are the same
    if (sourcePath === destPath || repo.path === process.cwd()) {
      console.log(`   ℹ️  Security audit already in ${repo.name}`);
      return;
    }
    
    if (!existsSync(sourcePath)) {
      this.stats.warnings.push(`Security audit tool not found in ${process.cwd()}`);
      return;
    }

    // Ensure scripts directory exists
    const scriptsDir = join(repo.path, 'scripts');
    if (!existsSync(scriptsDir)) {
      mkdirSync(scriptsDir, { recursive: true });
    }

    cpSync(sourcePath, destPath);
    
    // Make executable
    try {
      execSync(`chmod +x "${destPath}"`, { stdio: 'ignore' });
    } catch (e) {
      // chmod may not work on all systems
    }
    
    console.log(`   ✅ Copied security-audit.mjs`);
  }

  async updatePackageJson(repo) {
    const packageJsonPath = join(repo.path, 'package.json');
    
    if (!existsSync(packageJsonPath)) {
      this.stats.warnings.push(`No package.json in ${repo.name}`);
      return;
    }

    try {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      let updated = false;

      // Add packageManager if missing
      if (!packageJson.packageManager) {
        packageJson.packageManager = 'pnpm@8.0.0';
        updated = true;
      }

      // Add engines if missing
      if (!packageJson.engines) {
        packageJson.engines = {
          node: '>=20.0.0',
          pnpm: '>=8.0.0'
        };
        updated = true;
      }

      // Remove workspaces field (use pnpm-workspace.yaml)
      if (packageJson.workspaces) {
        delete packageJson.workspaces;
        updated = true;
      }

      // Add security scripts if missing
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }

      if (!packageJson.scripts['security:audit']) {
        packageJson.scripts['security:audit'] = 'node scripts/security-audit.mjs';
        updated = true;
      }

      if (!packageJson.scripts['security:check']) {
        packageJson.scripts['security:check'] = 'pnpm audit && pnpm run security:audit';
        updated = true;
      }

      if (!packageJson.scripts['security:fix']) {
        packageJson.scripts['security:fix'] = 'pnpm audit --fix';
        updated = true;
      }

      if (updated) {
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(`   ✅ Updated package.json`);
      } else {
        console.log(`   ℹ️  package.json already up to date`);
      }

      // Also update all package.json files in packages/ directory
      await this.updatePackageJsonFiles(repo);
    } catch (e) {
      this.stats.warnings.push(`Could not update package.json in ${repo.name}: ${e.message}`);
    }
  }

  async updatePackageJsonFiles(repo) {
    const packagesDir = join(repo.path, 'packages');
    if (!existsSync(packagesDir)) {
      return;
    }

    try {
      const packages = readdirSync(packagesDir);
      let updatedCount = 0;

      for (const pkg of packages) {
        const pkgPath = join(packagesDir, pkg);
        if (!statSync(pkgPath).isDirectory()) {
          continue;
        }

        const pkgJsonPath = join(pkgPath, 'package.json');
        if (!existsSync(pkgJsonPath)) {
          continue;
        }

        try {
          const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
          let updated = false;

          // Add engines if missing
          if (!pkgJson.engines) {
            pkgJson.engines = {
              node: '>=20.0.0',
              pnpm: '>=8.0.0'
            };
            updated = true;
          } else if (!pkgJson.engines.pnpm) {
            pkgJson.engines.pnpm = '>=8.0.0';
            updated = true;
          }

          if (updated) {
            writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
            updatedCount++;
          }
        } catch (e) {
          // Skip packages with invalid JSON
        }
      }

      if (updatedCount > 0) {
        console.log(`   ✅ Updated ${updatedCount} package.json files in packages/`);
      }
    } catch (e) {
      // Skip if packages directory can't be read
    }
  }

  async updateTurboJson(repo) {
    const turboJsonPath = join(repo.path, 'turbo.json');
    
    if (!existsSync(turboJsonPath)) {
      return; // Not all repos use turbo
    }

    try {
      const turboJson = JSON.parse(readFileSync(turboJsonPath, 'utf-8'));
      let updated = false;

      // Handle both "pipeline" and "tasks" formats
      const tasks = turboJson.pipeline || turboJson.tasks || {};
      
      if (!tasks['security:check']) {
        tasks['security:check'] = {
          cache: false,
          dependsOn: turboJson.pipeline ? ['^build'] : ['build'],
          outputs: []
        };
        updated = true;
      }

      if (updated) {
        writeFileSync(turboJsonPath, JSON.stringify(turboJson, null, 2));
        console.log(`   ✅ Updated turbo.json`);
      } else {
        console.log(`   ℹ️  turbo.json already has security:check`);
      }
    } catch (e) {
      this.stats.warnings.push(`Could not update turbo.json in ${repo.name}: ${e.message}`);
    }
  }

  async updateOpenSpec(repo) {
    const openspecPath = join(repo.path, 'openspec');
    
    if (!existsSync(openspecPath)) {
      return; // Not all repos have OpenSpec
    }

    // Create security spec directory
    const securitySpecPath = join(openspecPath, 'specs/security');
    if (!existsSync(securitySpecPath)) {
      mkdirSync(securitySpecPath, { recursive: true });
    }

    // Copy security spec if it exists in master (skip if same repo)
    const masterSpecPath = join(process.cwd(), 'openspec/specs/security/spec.md');
    const destSpecPath = join(securitySpecPath, 'spec.md');
    
    // Skip if source and dest are the same
    if (masterSpecPath === destSpecPath || repo.path === process.cwd()) {
      console.log(`   ℹ️  OpenSpec security spec already in ${repo.name}`);
      return;
    }
    
    if (existsSync(masterSpecPath)) {
      cpSync(masterSpecPath, destSpecPath);
      console.log(`   ✅ Updated OpenSpec security spec`);
    }
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const updater = new UpdateAllSecurity();
  updater.updateAll().then(stats => {
    process.exit(stats.errors.length > 0 ? 1 : 0);
  }).catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export default UpdateAllSecurity;

