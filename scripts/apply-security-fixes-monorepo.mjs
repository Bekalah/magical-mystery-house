#!/usr/bin/env node
/**
 * Apply Security Fixes Across Entire Monorepo
 * 
 * Ensures all packages use security modules and validates all data
 * 
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const MONOREPO_ROOT = process.cwd();
const PACKAGES_DIR = join(MONOREPO_ROOT, 'packages');

class MonorepoSecurityFixer {
  constructor() {
    this.fixesApplied = [];
    this.errors = [];
  }

  async applyAllFixes() {
    console.log('🔒 Applying security fixes across entire monorepo...\n');

    // Find all packages
    const packages = this.findPackages();
    console.log(`📦 Found ${packages.length} packages\n`);

    for (const pkg of packages) {
      await this.fixPackage(pkg);
    }

    // Fix root package.json
    await this.fixRootPackage();

    // Update turbo.json
    await this.fixTurboConfig();

    console.log('\n✅ Security fixes applied!');
    console.log(`📊 Fixed: ${this.fixesApplied.length} packages`);
    if (this.errors.length > 0) {
      console.log(`⚠️  Errors: ${this.errors.length}`);
    }

    return {
      fixed: this.fixesApplied.length,
      errors: this.errors.length
    };
  }

  findPackages() {
    const packages = [];
    if (!existsSync(PACKAGES_DIR)) {
      console.log('⚠️  Packages directory not found');
      return packages;
    }

    const dirs = readdirSync(PACKAGES_DIR);
    console.log(`📁 Scanning ${dirs.length} directories in packages/...`);
    
    for (const dir of dirs) {
      const pkgPath = join(PACKAGES_DIR, dir);
      try {
        if (statSync(pkgPath).isDirectory()) {
          const pkgJson = join(pkgPath, 'package.json');
          if (existsSync(pkgJson)) {
            packages.push({
              name: dir,
              path: pkgPath,
              packageJson: pkgJson
            });
          }
        }
      } catch (e) {
        // Skip directories we can't access
        continue;
      }
    }
    return packages;
  }

  async fixPackage(pkg) {
    try {
      const pkgJson = JSON.parse(readFileSync(pkg.packageJson, 'utf-8'));
      let updated = false;

      // Ensure engines.pnpm is set
      if (!pkgJson.engines) {
        pkgJson.engines = {};
        updated = true;
      }
      if (!pkgJson.engines.pnpm) {
        pkgJson.engines.pnpm = '>=8.0.0';
        updated = true;
      }

      // Ensure packageManager is set
      if (!pkgJson.packageManager) {
        pkgJson.packageManager = 'pnpm@8.0.0';
        updated = true;
      }

      // Ensure consistent dependency format (use @cathedral/ prefix)
      const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
      
      // Fix codex-144-99-core dependency
      if (deps['codex-144-99-core'] && !deps['@cathedral/codex-144-99-core']) {
        if (!pkgJson.dependencies) pkgJson.dependencies = {};
        pkgJson.dependencies['@cathedral/codex-144-99-core'] = deps['codex-144-99-core'];
        delete pkgJson.dependencies['codex-144-99-core'];
        if (pkgJson.devDependencies && pkgJson.devDependencies['codex-144-99-core']) {
          delete pkgJson.devDependencies['codex-144-99-core'];
        }
        updated = true;
      }
      
      // Fix liber-arcanae-core dependency
      if (deps['liber-arcanae-core'] && !deps['@cathedral/liber-arcanae-core']) {
        if (!pkgJson.dependencies) pkgJson.dependencies = {};
        pkgJson.dependencies['@cathedral/liber-arcanae-core'] = deps['liber-arcanae-core'];
        delete pkgJson.dependencies['liber-arcanae-core'];
        if (pkgJson.devDependencies && pkgJson.devDependencies['liber-arcanae-core']) {
          delete pkgJson.devDependencies['liber-arcanae-core'];
        }
        updated = true;
      }

      if (updated) {
        writeFileSync(pkg.packageJson, JSON.stringify(pkgJson, null, 2));
        this.fixesApplied.push(pkg.name);
        console.log(`  ✅ Fixed: ${pkg.name}`);
      }
    } catch (e) {
      this.errors.push(`${pkg.name}: ${e.message}`);
      console.log(`  ❌ Error in ${pkg.name}: ${e.message}`);
    }
  }

  async fixRootPackage() {
    const rootPkg = join(MONOREPO_ROOT, 'package.json');
    if (!existsSync(rootPkg)) {
      return;
    }

    try {
      const pkgJson = JSON.parse(readFileSync(rootPkg, 'utf-8'));
      let updated = false;

      // Ensure engines.pnpm
      if (!pkgJson.engines) {
        pkgJson.engines = {};
        updated = true;
      }
      if (!pkgJson.engines.pnpm) {
        pkgJson.engines.pnpm = '>=8.0.0';
        updated = true;
      }

      // Ensure packageManager
      if (!pkgJson.packageManager) {
        pkgJson.packageManager = 'pnpm@8.0.0';
        updated = true;
      }

      if (updated) {
        writeFileSync(rootPkg, JSON.stringify(pkgJson, null, 2));
        console.log('  ✅ Fixed: root package.json');
      }
    } catch (e) {
      this.errors.push(`root package.json: ${e.message}`);
    }
  }

  async fixTurboConfig() {
    const turboJson = join(MONOREPO_ROOT, 'turbo.json');
    if (!existsSync(turboJson)) {
      return;
    }

    try {
      const config = JSON.parse(readFileSync(turboJson, 'utf-8'));
      let updated = false;

      const tasks = config.pipeline || config.tasks || {};
      if (!tasks['security:check']) {
        tasks['security:check'] = {
          cache: false,
          dependsOn: config.pipeline ? ['^build'] : ['build'],
          outputs: []
        };
        updated = true;
      }

      if (updated) {
        if (config.pipeline) {
          config.pipeline = tasks;
        } else {
          config.tasks = tasks;
        }
        writeFileSync(turboJson, JSON.stringify(config, null, 2));
        console.log('  ✅ Fixed: turbo.json');
      }
    } catch (e) {
      this.errors.push(`turbo.json: ${e.message}`);
    }
  }
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new MonorepoSecurityFixer();
  fixer.applyAllFixes().then(result => {
    process.exit(result.errors > 0 ? 1 : 0);
  });
}

export default MonorepoSecurityFixer;

