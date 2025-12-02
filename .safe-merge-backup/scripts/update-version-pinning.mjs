#!/usr/bin/env node
/**
 * Update Version Pinning - Removes all version pinning
 * 
 * Ensures:
 * - Node: always current/latest (*)
 * - pnpm: always current/latest (*)
 * - Never npm
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function updatePackageJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const pkg = JSON.parse(content);
    let modified = false;
    
    // Update engines
    if (pkg.engines) {
      if (pkg.engines.node && pkg.engines.node !== '*') {
        pkg.engines.node = '*';
        modified = true;
      }
      if (pkg.engines.pnpm && pkg.engines.pnpm !== '*') {
        pkg.engines.pnpm = '*';
        modified = true;
      }
      // Remove npm if present
      if (pkg.engines.npm) {
        delete pkg.engines.npm;
        modified = true;
      }
    } else {
      pkg.engines = { node: '*', pnpm: '*' };
      modified = true;
    }
    
    // Remove packageManager field - let pnpm use current installed version
    // packageManager field requires specific version, but we want current/latest
    if (pkg.packageManager) {
      delete pkg.packageManager;
      modified = true;
    }
    
    // Remove npm scripts if any
    if (pkg.scripts) {
      const npmScripts = Object.keys(pkg.scripts).filter(key => 
        pkg.scripts[key].includes('npm ') || 
        pkg.scripts[key].includes('ppnpm install')
      );
      if (npmScripts.length > 0) {
        for (const script of npmScripts) {
          pkg.scripts[script] = pkg.scripts[script].replace(/npm /g, 'pnpm ');
          modified = true;
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      return true;
    }
    
    return false;
  } catch (e) {
    return false;
  }
}

function findPackageJsonFiles(dir) {
  const files = [];
  
  function walkDir(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    
    try {
      const entries = fs.readdirSync(currentDir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
        
        const fullPath = path.join(currentDir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          walkDir(fullPath);
        } else if (entry === 'package.json') {
          files.push(fullPath);
        }
      }
    } catch (e) {
      // Ignore
    }
  }
  
  walkDir(dir);
  return files;
}

async function main() {
  console.log('🔄 Updating version pinning across all package.json files...\n');
  
  const packageFiles = findPackageJsonFiles(rootDir);
  let updated = 0;
  
  for (const file of packageFiles) {
    if (updatePackageJson(file)) {
      updated++;
      console.log(`   ✅ Updated: ${path.relative(rootDir, file)}`);
    }
  }
  
  console.log(`\n✅ Updated ${updated} package.json files\n`);
  console.log('📋 All packages now use:');
  console.log('   - Node: * (current/latest)');
  console.log('   - pnpm: * (current/latest)');
  console.log('   - Never npm\n');
}

main().catch(console.error);

