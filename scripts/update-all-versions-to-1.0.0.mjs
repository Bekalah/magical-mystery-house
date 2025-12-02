#!/usr/bin/env node
/**
 * Update All Package Versions to 1.0.0
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

let updated = 0;

function updateVersions(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      const packageJsonPath = path.join(itemPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          if (packageJson.version !== '1.0.0') {
            packageJson.version = '1.0.0';
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
            updated++;
            console.log(`   ✅ Updated ${path.relative(BASE_DIR, packageJsonPath)}`);
          }
        } catch (e) {
          // Skip invalid
        }
      }
      updateVersions(itemPath);
    }
  }
}

console.log('🔢 Updating all package versions to 1.0.0...\n');

// Update root
const rootPackageJson = path.join(BASE_DIR, 'package.json');
if (fs.existsSync(rootPackageJson)) {
  const rootJson = JSON.parse(fs.readFileSync(rootPackageJson, 'utf-8'));
  rootJson.version = '1.0.0';
  fs.writeFileSync(rootPackageJson, JSON.stringify(rootJson, null, 2) + '\n');
  updated++;
  console.log('   ✅ Updated root package.json');
}

// Update packages
updateVersions(path.join(BASE_DIR, 'packages'));
updateVersions(path.join(BASE_DIR, 'apps'));

console.log(`\n✅ Updated ${updated} package.json files to version 1.0.0\n`);

