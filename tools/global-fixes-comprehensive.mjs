#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Comprehensive Global Fixes - Fast, permanent, across all workspaces
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const WORKSPACES = [
  rootDir,
  path.join(rootDir, '..', 'cathedral-real'),
  path.join(rootDir, '..', 'cathedral-fixed-clean'),
  path.join(rootDir, '..', 'cathedral-v1-consolidated'),
  path.join(rootDir, '..', 'cosmogenesis-engine')
].filter(ws => {
  try {
    return fs.existsSync(ws);
  } catch {
    return false;
  }
});

const GLOBAL_FIXES = {
  pnpmTypos: {
    pattern: /pp+p?npm/g,
    replacement: 'pnpm',
    description: 'Fix pnpm typos globally'
  },
  packageManager: {
    pattern: /"packageManager":\s*"pp+p?npm@/g,
    replacement: '"packageManager": "pnpm@',
    description: 'Fix packageManager field'
  },
  workflowErrors: {
    pattern: /amondnet\/vercel-action@v20/g,
    replacement: 'amondnet/vercel-action@v25',
    description: 'Update Vercel action version'
  },
  nodeVersion: {
    pattern: /node-version: '25.2'*['"]?/g,
    replacement: "node-version: '25.2',
    description: 'Standardize Node.js version'
  }
};

function applyGlobalFix(workspace, fix) {
  let totalFixed = 0;
  
  function processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (fix.pattern.test(content)) {
        const fixed = content.replace(fix.pattern, fix.replacement);
        fs.writeFileSync(filePath, fixed, 'utf-8');
        return true;
      }
    } catch (e) {
      // Skip files that can't be read
    }
  }

  function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      try {
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          processDirectory(itemPath);
        } else if (stat.isFile() && (item.endsWith('.json') || item.endsWith('.yml') || item.endsWith('.yaml') || item.endsWith('.mjs') || item.endsWith('.ts') || item.endsWith('.md'))) {
          if (processFile(itemPath)) {
            totalFixed++;
          }
        }
      } catch (e) {
        // Skip items that can't be accessed
      }
    }
  }

  processDirectory(workspace);
  return totalFixed;
}

async function applyAllGlobalFixes() {
  console.log('🔧 Applying comprehensive global fixes...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    fixes: {},
    totalFixed: 0
  };

  for (const [fixName, fix] of Object.entries(GLOBAL_FIXES)) {
    let workspaceTotal = 0;
    
    for (const workspace of WORKSPACES) {
      const fixed = applyGlobalFix(workspace, fix);
      workspaceTotal += fixed;
    }
    
    results.fixes[fixName] = {
      description: fix.description,
      filesFixed: workspaceTotal
    };
    results.totalFixed += workspaceTotal;
    
    console.log(`✅ ${fix.description}: ${workspaceTotal} files`);
  }

  // Also run the dedicated fix scripts
  try {
    execSync('node tools/fix-pnpm-typos-globally.mjs', { cwd: rootDir, stdio: 'pipe' });
  } catch (e) {
    // Continue
  }

  try {
    execSync('node tools/fix-workflow-errors.mjs', { cwd: rootDir, stdio: 'pipe' });
  } catch (e) {
    // Continue
  }

  console.log(`\n✅ Global fixes complete!`);
  console.log(`   - Total files fixed: ${results.totalFixed}`);
  console.log(`   - Workspaces processed: ${WORKSPACES.length}`);

  // Save results
  const outputPath = path.join(rootDir, 'GLOBAL_FIXES_REPORT.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

  return results;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  applyAllGlobalFixes().catch(console.error);
}

export default applyAllGlobalFixes;


