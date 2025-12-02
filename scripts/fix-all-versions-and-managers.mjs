#!/usr/bin/env node
/**
 * Fix All Node Versions and Package Managers
 * 
 * Standardizes all package.json files:
 * - Sets engines.node to "*" (accept any Node version)
 * - Changes pnpm to pnpm in packageManager field
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

class VersionFixer {
  constructor() {
    this.fixed = 0;
    this.errors = [];
  }

  async run() {
    console.log('🔧 FIXING ALL NODE VERSIONS AND PACKAGE MANAGERS\n');
    console.log('═'.repeat(80) + '\n');

    // Find all package.json files
    const packageJsonFiles = [];
    
    for (const dir of ['packages', 'apps', 'tools']) {
      const dirPath = path.join(BASE_DIR, dir);
      if (fs.existsSync(dirPath)) {
        this.findPackageJsonFiles(dirPath, packageJsonFiles);
      }
    }

    console.log(`Found ${packageJsonFiles.length} package.json files\n`);

    for (const filePath of packageJsonFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const packageJson = JSON.parse(content);
        let modified = false;

        // Fix engines.node
        if (packageJson.engines && packageJson.engines.node) {
          if (packageJson.engines.node !== '*') {
            packageJson.engines.node = '*';
            modified = true;
          }
        } else if (!packageJson.engines) {
          packageJson.engines = { node: '*' };
          modified = true;
        }

        // Fix packageManager
        if (packageJson.packageManager) {
          if (packageJson.packageManager.includes('pnpm')) {
            packageJson.packageManager = packageJson.packageManager.replace(/pnpm/g, 'pnpm');
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2) + '\n');
          this.fixed++;
          const relPath = path.relative(BASE_DIR, filePath);
          console.log(`   ✅ Fixed: ${relPath}`);
        }
      } catch (e) {
        this.errors.push({ file: filePath, error: e.message });
      }
    }

    console.log(`\n✅ Fixed ${this.fixed} package.json files`);
    if (this.errors.length > 0) {
      console.log(`⚠️  ${this.errors.length} errors encountered`);
    }
  }

  findPackageJsonFiles(dir, files) {
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

const fixer = new VersionFixer();
fixer.run().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

