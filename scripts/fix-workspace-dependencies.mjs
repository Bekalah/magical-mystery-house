#!/usr/bin/env node
/**
 * Fix Workspace Dependencies
 * 
 * Finds and fixes all workspace dependency issues:
 * - Maps @cathedral/ scoped names to actual package names
 * - Removes dependencies on non-existent packages
 * - Updates package names to match dependencies
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class WorkspaceDependencyFixer {
  constructor() {
    this.packageMap = new Map();
    this.fixed = 0;
    this.errors = [];
  }

  async run() {
    console.log('🔧 FIXING WORKSPACE DEPENDENCIES\n');
    console.log('═'.repeat(80) + '\n');

    // Phase 1: Build package name map
    await this.buildPackageMap();

    // Phase 2: Fix all package.json files
    await this.fixDependencies();

    console.log(`\n✅ Fixed ${this.fixed} dependency issues\n`);
  }

  async buildPackageMap() {
    console.log('📦 Building package name map...\n');

    const packagesDir = path.join(BASE_DIR, 'packages');
    if (!fs.existsSync(packagesDir)) return;

    const packages = fs.readdirSync(packagesDir).filter(item => {
      const itemPath = path.join(packagesDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const pkg of packages) {
      const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          const name = packageJson.name;
          
          // Map both scoped and unscoped names
          this.packageMap.set(name, name);
          if (name.startsWith('@cathedral/')) {
            const unscoped = name.replace('@cathedral/', '');
            this.packageMap.set(unscoped, name);
            this.packageMap.set(`@cathedral/${unscoped}`, name);
          } else {
            this.packageMap.set(`@cathedral/${name}`, name);
          }
        } catch (e) {
          // Skip invalid
        }
      }
    }

    console.log(`   ✅ Mapped ${this.packageMap.size} package names\n`);
  }

  async fixDependencies() {
    console.log('🔧 Fixing dependencies...\n');

    const files = [];
    this.findPackageJsonFiles(path.join(BASE_DIR, 'packages'), files);
    this.findPackageJsonFiles(path.join(BASE_DIR, 'apps'), files);

    for (const filePath of files) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        let modified = false;

        // Fix dependencies
        if (packageJson.dependencies) {
          for (const [dep, version] of Object.entries(packageJson.dependencies)) {
            if (typeof version === 'string' && version.startsWith('workspace:')) {
              const actualName = this.packageMap.get(dep);
              if (!actualName) {
                // Package doesn't exist - remove it
                delete packageJson.dependencies[dep];
                modified = true;
                console.log(`   ⚠️  Removed missing dependency: ${dep} from ${path.relative(BASE_DIR, filePath)}`);
              } else if (actualName !== dep) {
                // Package exists but with different name - update
                packageJson.dependencies[actualName] = version;
                delete packageJson.dependencies[dep];
                modified = true;
                console.log(`   ✅ Fixed dependency: ${dep} → ${actualName} in ${path.relative(BASE_DIR, filePath)}`);
              }
            }
          }
        }

        // Fix devDependencies
        if (packageJson.devDependencies) {
          for (const [dep, version] of Object.entries(packageJson.devDependencies)) {
            if (typeof version === 'string' && version.startsWith('workspace:')) {
              const actualName = this.packageMap.get(dep);
              if (!actualName) {
                delete packageJson.devDependencies[dep];
                modified = true;
                console.log(`   ⚠️  Removed missing devDependency: ${dep} from ${path.relative(BASE_DIR, filePath)}`);
              } else if (actualName !== dep) {
                packageJson.devDependencies[actualName] = version;
                delete packageJson.devDependencies[dep];
                modified = true;
                console.log(`   ✅ Fixed devDependency: ${dep} → ${actualName} in ${path.relative(BASE_DIR, filePath)}`);
              }
            }
          }
        }

        if (modified) {
          fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2) + '\n');
          this.fixed++;
        }
      } catch (e) {
        this.errors.push({ file: filePath, error: e.message });
      }
    }
  }

  findPackageJsonFiles(dir, files) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          const packageJsonPath = path.join(itemPath, 'package.json');
          if (fs.existsSync(packageJsonPath)) {
            files.push(packageJsonPath);
          }
          this.findPackageJsonFiles(itemPath, files);
        }
      }
    } catch (e) {
      // Skip if can't read
    }
  }
}

const fixer = new WorkspaceDependencyFixer();
fixer.run().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

