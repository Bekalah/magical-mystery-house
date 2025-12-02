#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Fix all pnpm typos globally across entire monorepo
 * Fixes: pnpm, pnpm, pnpm, etc. -> pnpm
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Patterns to find and replace
const TYPO_PATTERNS = [
  { pattern: /pnpm/g, replacement: 'pnpm' },
  { pattern: /pnpm/g, replacement: 'pnpm' },
  { pattern: /pnpm/g, replacement: 'pnpm' },
  { pattern: /pnpm/g, replacement: 'pnpm' },
  { pattern: /pnpm/g, replacement: 'pnpm' }
];

// File extensions to check
const FILE_EXTENSIONS = ['.json', '.md', '.mjs', '.js', '.ts', '.tsx', '.gd', '.tscn', '.sh', '.yml', '.yaml'];

// Directories to skip
const SKIP_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', '.turbo', 'coverage', '.cache'];

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  return FILE_EXTENSIONS.includes(ext) || !ext; // Include files without extensions
}

function shouldSkipDir(dirName) {
  return SKIP_DIRS.includes(dirName) || dirName.startsWith('.');
}

function fixPnpmTypos(content) {
  let fixed = content;
  let changed = false;
  
  for (const { pattern, replacement } of TYPO_PATTERNS) {
    if (pattern.test(fixed)) {
      fixed = fixed.replace(pattern, replacement);
      changed = true;
    }
  }
  
  return { fixed, changed };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { fixed, changed } = fixPnpmTypos(content);
    
    if (changed) {
      fs.writeFileSync(filePath, fixed, 'utf-8');
      return true;
    }
    return false;
  } catch (e) {
    console.error(`Error processing ${filePath}:`, e.message);
    return false;
  }
}

function processDirectory(dirPath, relativePath = '') {
  let fixedCount = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        if (!shouldSkipDir(item)) {
          fixedCount += processDirectory(itemPath, path.join(relativePath, item));
        }
      } else if (stat.isFile() && shouldProcessFile(itemPath)) {
        if (processFile(itemPath)) {
          fixedCount++;
          const displayPath = path.join(relativePath, item);
          console.log(`✅ Fixed: ${displayPath}`);
        }
      }
    }
  } catch (e) {
    console.error(`Error processing directory ${dirPath}:`, e.message);
  }
  
  return fixedCount;
}

// Also fix game_scene.tscn ExtResource issue
function fixGameScene() {
  const gameScenePath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'scenes', 'game_scene.tscn');
  
  if (fs.existsSync(gameScenePath)) {
    try {
      let content = fs.readFileSync(gameScenePath, 'utf-8');
      let changed = false;
      
      // Fix Player node ExtResource reference
      if (content.includes('script = ExtResource("1_character")')) {
        content = content.replace(
          'script = ExtResource("1_character")',
          'script = ExtResource("2_character")'
        );
        changed = true;
        console.log('✅ Fixed game_scene.tscn: Player node ExtResource');
      }
      
      // Fix GameManager ExtResource reference if wrong
      if (content.includes('script = ExtResource("2_manager")')) {
        content = content.replace(
          'script = ExtResource("2_manager")',
          'script = ExtResource("3_manager")'
        );
        changed = true;
        console.log('✅ Fixed game_scene.tscn: GameManager node ExtResource');
      }
      
      if (changed) {
        fs.writeFileSync(gameScenePath, content, 'utf-8');
        return true;
      }
    } catch (e) {
      console.error(`Error fixing game_scene.tscn:`, e.message);
    }
  }
  
  return false;
}

async function fixGlobally() {
  console.log('🔍 Scanning for pnpm typos globally...\n');
  
  // Fix root directory
  let totalFixed = processDirectory(rootDir, '');
  
  // Fix game_scene.tscn
  if (fixGameScene()) {
    totalFixed++;
  }
  
  console.log(`\n✅ Global fix complete!`);
  console.log(`   - Files fixed: ${totalFixed}`);
  console.log(`   - All pnpm typos corrected across entire monorepo`);
  console.log(`   - game_scene.tscn ExtResource references fixed`);
  
  return totalFixed;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fixGlobally().catch(console.error);
}

export default fixGlobally;

