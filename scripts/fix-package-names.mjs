#!/usr/bin/env node
/**
 * Fix Package Names to Use @cathedral/ Scope
 * 
 * Ensures all packages use @cathedral/ scope for consistency
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const packagesToFix = [
  { old: 'codex-144-99-core', new: '@cathedral/codex-144-99-core' },
  { old: 'unified-codex-core', new: '@cathedral/unified-codex-core' },
  { old: 'stone-grimoire-core', new: '@cathedral/stone-grimoire-core' },
  { old: 'mystery-house-core', new: '@cathedral/mystery-house-core' },
  { old: 'liber-arcanae-core', new: '@cathedral/liber-arcanae-core' },
  { old: 'music-engine-core', new: '@cathedral/music-engine-core' },
  { old: 'art-engine-core', new: '@cathedral/art-engine-core' },
  { old: 'science-engine-core', new: '@cathedral/science-engine-core' },
  { old: 'art-standards-core', new: '@cathedral/art-standards-core' },
  { old: 'game-design-core', new: '@cathedral/game-design-core' }
];

function fixPackageNames(dir) {
  let fixed = 0;
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      const packageJsonPath = path.join(itemPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          const oldName = packageJson.name;
          
          // Check if it needs fixing
          const fix = packagesToFix.find(f => f.old === oldName || oldName === `@cathedral/${f.old}`);
          if (fix && oldName !== fix.new) {
            packageJson.name = fix.new;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
            fixed++;
            console.log(`   ✅ Fixed: ${oldName} → ${fix.new}`);
          }
        } catch (e) {
          // Skip invalid
        }
      }
      fixed += fixPackageNames(itemPath);
    }
  }
  
  return fixed;
}

console.log('🔧 Fixing package names to use @cathedral/ scope...\n');

const fixed = fixPackageNames(path.join(BASE_DIR, 'packages'));
console.log(`\n✅ Fixed ${fixed} package names\n`);

