#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Verify and lock Godot version to 4.5
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const REQUIRED_GODOT_VERSION = '4.5';
const GODOT_PACKAGES = [
  'godot-codex-14499',
  'godot-design-studio',
  'godot-liber-arcanae',
  'godot-vfx-library',
];

console.log(`🔒 Verifying Godot version is locked to ${REQUIRED_GODOT_VERSION}...\n`);

let allCorrect = true;
const fixes = [];

for (const pkgName of GODOT_PACKAGES) {
  const pkgPath = path.join(BASE_DIR, 'packages', pkgName, 'package.json');
  
  if (!fs.existsSync(pkgPath)) {
    console.log(`⚠️  Package not found: ${pkgName}`);
    continue;
  }

  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    let changed = false;

    // Check and fix godot.version
    if (!pkg.godot) {
      pkg.godot = {};
      changed = true;
    }

    if (pkg.godot.version !== `${REQUIRED_GODOT_VERSION}+`) {
      pkg.godot.version = `${REQUIRED_GODOT_VERSION}+`;
      changed = true;
      console.log(`   ✅ Fixed ${pkgName}: godot.version = ${REQUIRED_GODOT_VERSION}+`);
    }

    // Ensure compatibility is set
    if (!pkg.godot.compatibility) {
      pkg.godot.compatibility = '4.0+';
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      fixes.push(pkgName);
      allCorrect = false;
    } else {
      console.log(`   ✅ ${pkgName}: Already correct (${pkg.godot.version})`);
    }
  } catch (e) {
    console.log(`   ❌ Error reading ${pkgName}: ${e.message}`);
    allCorrect = false;
  }
}

// Ensure .godot-version file exists
const godotVersionPath = path.join(BASE_DIR, '.godot-version');
if (!fs.existsSync(godotVersionPath)) {
  fs.writeFileSync(godotVersionPath, `${REQUIRED_GODOT_VERSION}\n`);
  console.log(`   ✅ Created .godot-version file`);
} else {
  const currentVersion = fs.readFileSync(godotVersionPath, 'utf8').trim();
  if (currentVersion !== REQUIRED_GODOT_VERSION) {
    fs.writeFileSync(godotVersionPath, `${REQUIRED_GODOT_VERSION}\n`);
    console.log(`   ✅ Updated .godot-version to ${REQUIRED_GODOT_VERSION}`);
  } else {
    console.log(`   ✅ .godot-version is correct (${REQUIRED_GODOT_VERSION})`);
  }
}

console.log('\n📊 Summary:');
if (fixes.length > 0) {
  console.log(`   ✅ Fixed ${fixes.length} packages`);
  console.log(`   Packages fixed: ${fixes.join(', ')}`);
} else if (allCorrect) {
  console.log('   ✅ All packages are using Godot 4.5');
} else {
  console.log('   ⚠️  Some issues found');
}

console.log(`\n🔒 Godot version locked to ${REQUIRED_GODOT_VERSION}`);

