#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Wrapper script to run the improvement experiment
 * Ensures all connections are in place and reports changes
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

console.log('🚀 Starting Cathedral Improvement Experiment...\n');

// Check prerequisites
console.log('📋 Checking prerequisites...');
const checks = {
  node: false,
  pnpm: false,
  typescript: false,
  packages: false
};

try {
  const nodeVersion = execSync('node --version', { encoding: 'utf-8' }).trim();
  console.log(`   ✅ Node.js: ${nodeVersion} (current/latest)`);
  checks.node = true;
} catch (e) {
  console.log('   ❌ Node.js not found');
}

try {
  const pnpmVersion = execSync('pnpm --version', { encoding: 'utf-8' }).trim();
  console.log(`   ✅ pnpm: ${pnpmVersion} (current/latest)`);
  checks.pnpm = true;
  
  // Verify npm is NOT being used
  try {
    execSync('which npm', { encoding: 'utf-8', stdio: 'ignore' });
    console.log(`   ⚠️  npm detected - using pnpm instead`);
  } catch (e) {
    // npm not found - good, we only use pnpm
  }
} catch (e) {
  console.log('   ❌ pnpm not found');
}

try {
  const tsVersion = execSync('tsx --version 2>&1 || tsc --version', { encoding: 'utf-8' }).trim();
  console.log(`   ✅ TypeScript: ${tsVersion}`);
  checks.typescript = true;
} catch (e) {
  console.log('   ⚠️  TypeScript/tsx not found - will try to install');
}

// Check packages directory
if (fs.existsSync(path.join(BASE_DIR, 'packages'))) {
  const packages = fs.readdirSync(path.join(BASE_DIR, 'packages'))
    .filter(name => fs.statSync(path.join(BASE_DIR, 'packages', name)).isDirectory());
  console.log(`   ✅ Packages: ${packages.length} found`);
  checks.packages = true;
} else {
  console.log('   ❌ Packages directory not found');
}

console.log('\n🔗 Checking live data connections...');

// Check for git repositories
try {
  const gitRemotes = execSync('git remote -v', { encoding: 'utf-8', cwd: BASE_DIR });
  if (gitRemotes.includes('origin')) {
    console.log('   ✅ Git remote configured');
  } else {
    console.log('   ⚠️  No git remote configured');
  }
} catch (e) {
  console.log('   ⚠️  Not a git repository');
}

// Check for workspace connections
const workspaceFiles = [
  'workspace-integration.json',
  'workspace-config.json',
  '.workspace'
];

let workspaceFound = false;
for (const file of workspaceFiles) {
  if (fs.existsSync(path.join(BASE_DIR, file))) {
    console.log(`   ✅ Workspace config: ${file}`);
    workspaceFound = true;
    break;
  }
}

if (!workspaceFound) {
  console.log('   ⚠️  No workspace config found (optional)');
}

console.log('\n🧹 Cleaning up confusing files...');

// Remove backup files
const backupPatterns = ['*.backup', '*.old', '*.tmp', '*~'];
let cleaned = 0;

function findAndRemove(pattern, dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
        findAndRemove(pattern, fullPath);
      } else if (stat.isFile()) {
        const matches = pattern.split('*').map(p => file.includes(p.replace('*', '')));
        if (pattern.includes('*') && file.match(new RegExp(pattern.replace('*', '.*')))) {
          try {
            fs.unlinkSync(fullPath);
            cleaned++;
          } catch (e) {
            // Skip if can't delete
          }
        }
      }
    }
  } catch (e) {
    // Skip if can't read
  }
}

// Clean root and scripts
for (const pattern of backupPatterns) {
  findAndRemove(pattern, BASE_DIR);
  findAndRemove(pattern, path.join(BASE_DIR, 'scripts'));
  findAndRemove(pattern, path.join(BASE_DIR, 'tools'));
}

if (cleaned > 0) {
  console.log(`   ✅ Cleaned ${cleaned} backup/temp files`);
} else {
  console.log('   ✅ No backup files found');
}

// Check for duplicate or confusing folders
const confusingFolders = [
  'backup',
  'backups',
  'old',
  'temp',
  'tmp',
  'archive',
  'archived'
];

let foundConfusing = [];
for (const folder of confusingFolders) {
  const folderPath = path.join(BASE_DIR, folder);
  if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
    foundConfusing.push(folder);
  }
}

if (foundConfusing.length > 0) {
  console.log(`   ⚠️  Found potentially confusing folders: ${foundConfusing.join(', ')}`);
  console.log('      (These may contain important data - review before removing)');
} else {
  console.log('   ✅ No confusing folders found');
}

console.log('\n📊 Current State:');

// Check experiment state
const stateFile = path.join(BASE_DIR, 'experiment-state.json');
if (fs.existsSync(stateFile)) {
  try {
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    console.log(`   📝 Experiment state found:`);
    console.log(`      Cycle: ${state.currentCycle || 0}`);
    console.log(`      Total cycles: ${state.totalCycles || 0}`);
    console.log(`      Improvements: ${state.improvements?.length || 0}`);
  } catch (e) {
    console.log('   ⚠️  State file exists but couldn\'t be read');
  }
} else {
  console.log('   📝 No previous experiment state (will start fresh)');
}

// Check log file
const logFile = path.join(BASE_DIR, 'IMPROVEMENT_EXPERIMENT_LOG.json');
if (fs.existsSync(logFile)) {
  const logSize = fs.statSync(logFile).size;
  console.log(`   📋 Log file: ${(logSize / 1024).toFixed(2)} KB`);
} else {
  console.log('   📋 No log file (will create new)');
}

console.log('\n🚀 Starting experiment...\n');

// Run the experiment
try {
  // Use tsx if available, otherwise tsc + node
  let command = 'tsx';
  try {
    execSync('which tsx', { stdio: 'ignore' });
  } catch (e) {
    // Try to build first
    console.log('📦 Building TypeScript...');
    try {
      execSync('ppnpm run build', { cwd: BASE_DIR, stdio: 'inherit' });
      command = 'node';
    } catch (e) {
      console.log('⚠️  Could not build - trying tsx anyway...');
      command = 'tsx';
    }
  }
  
  const scriptPath = path.join(__dirname, '10-hour-improvement-experiment.ts');
  execSync(`${command} ${scriptPath}`, {
    cwd: BASE_DIR,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
} catch (e) {
  console.error('❌ Experiment failed:', e.message);
  process.exit(1);
}

