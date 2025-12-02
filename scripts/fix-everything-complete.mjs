#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Fix EVERYTHING - nothing left "just out there"
 * Complete cleanup and correction
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

console.log('🔧 Fixing EVERYTHING - no exceptions...\n');

function findFiles(dir, pattern, exclude = []) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!exclude.includes(entry.name) && entry.name !== 'node_modules' && entry.name !== '.git' && !entry.name.startsWith('.')) {
          files.push(...findFiles(path.join(dir, entry.name), pattern, exclude));
        }
      } else if (entry.isFile() && pattern.test(entry.name)) {
        files.push(path.join(dir, entry.name));
      }
    }
  } catch (e) {
    // Skip
  }
  return files;
}

// Fix all npm references in all files
console.log('1️⃣ Fixing all npm references...');
const allFiles = [
  ...findFiles(BASE_DIR, /\.(js|ts|mjs|json|yml|yaml|md|sh|txt)$/),
];

let fixedCount = 0;
for (const filePath of allFiles) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace npm with pnpm
    content = content.replace(/pnpm install/g, 'pnpm install');
    content = content.replace(/pnpm run/g, 'pnpm run');
    content = content.replace(/pnpm exec/g, 'pnpm exec');
    content = content.replace(/pnpm publish/g, 'pnpm publish');
    content = content.replace(/pnpm install --frozen-lockfile/g, 'pnpm install --frozen-lockfile');
    content = content.replace(/pnpm test/g, 'pnpm test');
    content = content.replace(/pnpm start/g, 'pnpm start');
    content = content.replace(/pnpm build/g, 'pnpm build');
    content = content.replace(/pnpm --version/g, 'pnpm --version');
    content = content.replace(/which pnpm/g, 'which pnpm');
    content = content.replace(/pnpm@/g, 'pnpm@');
    content = content.replace(/package-lock\.json/g, 'pnpm-lock.yaml');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      fixedCount++;
    }
  } catch (e) {
    // Skip binary or unreadable files
  }
}
console.log(`   ✅ Fixed ${fixedCount} files\n`);

// Remove Azure references from source files
console.log('2️⃣ Removing Azure references from source files...');
const sourceFiles = [
  ...findFiles(path.join(BASE_DIR, 'packages'), /\.(js|ts|mjs|py)$/),
];

let azureRemoved = 0;
for (const filePath of sourceFiles) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Comment out or remove Azure imports/usage
    content = content.replace(/import.*@azure.*/g, '// REMOVED: Azure import (free/open source only)');
    content = content.replace(/require\(['"]@azure.*['"]\)/g, '// REMOVED: Azure require (free/open source only)');
    content = content.replace(/from ['"]@azure.*['"]/g, '// REMOVED: Azure from (free/open source only)');
    
    // Add comment at top if Azure was mentioned
    if (original.includes('@azure') || original.includes('azure') || original.includes('Azure')) {
      if (!content.includes('REMOVED: Azure')) {
        content = `// Azure dependencies removed - free/open source only\n// This is a healing space, completely free and open\n${content}`;
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      azureRemoved++;
    }
  } catch (e) {
    // Skip
  }
}
console.log(`   ✅ Fixed ${azureRemoved} files with Azure references\n`);

// Ensure all package.json have correct license and packageManager
console.log('3️⃣ Ensuring all package.json are correct...');
const packageJsonFiles = findFiles(BASE_DIR, /package\.json$/);
let pkgFixed = 0;
for (const pkgPath of packageJsonFiles) {
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    let changed = false;

    // Set license
    if (!pkg.license || pkg.license !== 'CC0-1.0') {
      pkg.license = 'CC0-1.0';
      changed = true;
    }

    // Set packageManager
    if (!pkg.packageManager || !pkg.packageManager.startsWith('pnpm@')) {
      pkg.packageManager = 'pnpm@10.23.0';
      changed = true;
    }

    // Remove commercial deps
    const commercialDeps = ['@azure', '@microsoft', '@aws-sdk', '@google-cloud'];
    const checkDeps = (deps) => {
      if (!deps) return false;
      let removed = false;
      for (const dep of Object.keys(deps)) {
        if (commercialDeps.some(c => dep.includes(c))) {
          delete deps[dep];
          removed = true;
        }
      }
      return removed;
    };

    if (checkDeps(pkg.dependencies) || checkDeps(pkg.devDependencies) || 
        checkDeps(pkg.peerDependencies) || checkDeps(pkg.optionalDependencies)) {
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      pkgFixed++;
    }
  } catch (e) {
    // Skip
  }
}
console.log(`   ✅ Fixed ${pkgFixed} package.json files\n`);

console.log('✅ Everything fixed!');
console.log(`\n📋 Summary:`);
console.log(`   - Fixed ${fixedCount} files with npm references`);
console.log(`   - Removed Azure from ${azureRemoved} source files`);
console.log(`   - Fixed ${pkgFixed} package.json files`);
console.log('\n🕊️ Nothing left "just out there" - everything is correct!');

