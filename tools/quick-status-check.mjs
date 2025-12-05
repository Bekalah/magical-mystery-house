#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * Quick Status Check - Fast comprehensive status
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const status = {
  timestamp: new Date().toISOString(),
  experiment: null,
  packages: { total: 0, withPackageJson: 0, withReadme: 0, gitRepos: 0 },
  apps: { total: 0, withPackageJson: 0 },
  tools: { total: 0 },
  scripts: { total: 0 },
  connections: { found: 0, missing: 0 },
  todos: { critical: [], important: [] }
};

// Check experiment
try {
  const expState = JSON.parse(fs.readFileSync(path.join(rootDir, 'experiment-state.json'), 'utf-8'));
  status.experiment = {
    currentCycle: expState.currentCycle,
    totalCycles: expState.totalCycles,
    improvements: expState.improvements?.length || 0,
    connectionsEstablished: expState.connectionsEstablished || 0
  };
} catch (e) {}

// Quick package count
try {
  const packagesDir = path.join(rootDir, 'packages');
  if (fs.existsSync(packagesDir)) {
    const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
    status.packages.total = entries.filter(e => e.isDirectory() && !e.name.startsWith('.')).length;
    
    // Sample check
    for (const entry of entries.slice(0, 20)) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const pkgPath = path.join(packagesDir, entry.name);
        if (fs.existsSync(path.join(pkgPath, 'package.json'))) status.packages.withPackageJson++;
        if (fs.existsSync(path.join(pkgPath, 'README.md'))) status.packages.withReadme++;
        if (fs.existsSync(path.join(pkgPath, '.git'))) status.packages.gitRepos++;
      }
    }
  }
} catch (e) {}

// Quick apps count
try {
  const appsDir = path.join(rootDir, 'apps');
  if (fs.existsSync(appsDir)) {
    const entries = fs.readdirSync(appsDir, { withFileTypes: true });
    status.apps.total = entries.filter(e => e.isDirectory() && !e.name.startsWith('.')).length;
    for (const entry of entries.slice(0, 10)) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        if (fs.existsSync(path.join(appsDir, entry.name, 'package.json'))) status.apps.withPackageJson++;
      }
    }
  }
} catch (e) {}

// Quick tools count
try {
  const toolsDir = path.join(rootDir, 'tools');
  if (fs.existsSync(toolsDir)) {
    status.tools.total = fs.readdirSync(toolsDir).filter(f => f.endsWith('.mjs')).length;
  }
} catch (e) {}

// Quick scripts count
try {
  const scriptsDir = path.join(rootDir, 'scripts');
  if (fs.existsSync(scriptsDir)) {
    status.scripts.total = fs.readdirSync(scriptsDir).filter(f => 
      f.endsWith('.ts') || f.endsWith('.mjs') || f.endsWith('.js')
    ).length;
  }
} catch (e) {}

// Check key files
const keyFiles = {
  'ALL_CHARACTER_DATA_COMPILED.json': 'Character data compiled',
  'ALL_REPO_INFO_COMPILED.json': 'Repo info compiled',
  'SCAN_TRACK_FIX_REPORT.json': 'Scan report',
  'MASTER_PLAN.md': 'Master plan',
  'EXPERIMENT.md': 'Experiment doc'
};

status.keyFiles = {};
for (const [file, desc] of Object.entries(keyFiles)) {
  status.keyFiles[file] = fs.existsSync(path.join(rootDir, file));
}

// Generate todos
if (status.packages.total > status.packages.withPackageJson) {
  status.todos.important.push(`Add package.json to ${status.packages.total - status.packages.withPackageJson} packages`);
}
if (status.packages.total > status.packages.withReadme) {
  status.todos.important.push(`Add README to ${status.packages.total - status.packages.withReadme} packages`);
}

// Write status
fs.writeFileSync(path.join(rootDir, 'QUICK_STATUS.json'), JSON.stringify(status, null, 2));

// Print
console.log('📊 QUICK STATUS CHECK');
console.log('');
console.log('🔬 Experiment:');
if (status.experiment) {
  console.log(`   - Cycle: ${status.experiment.currentCycle}/${status.experiment.totalCycles}`);
  console.log(`   - Improvements: ${status.experiment.improvements}`);
  console.log(`   - Connections: ${status.experiment.connectionsEstablished}`);
}
console.log('');
console.log('📦 Packages:');
console.log(`   - Total: ${status.packages.total}`);
console.log(`   - With package.json: ${status.packages.withPackageJson}`);
console.log(`   - With README: ${status.packages.withReadme}`);
console.log(`   - Git repos: ${status.packages.gitRepos}`);
console.log('');
console.log('📱 Apps:');
console.log(`   - Total: ${status.apps.total}`);
console.log(`   - With package.json: ${status.apps.withPackageJson}`);
console.log('');
console.log('🛠️  Tools:');
console.log(`   - Total: ${status.tools.total}`);
console.log('');
console.log('📜 Scripts:');
console.log(`   - Total: ${status.scripts.total}`);
console.log('');
console.log('📄 Key Files:');
for (const [file, exists] of Object.entries(status.keyFiles)) {
  console.log(`   - ${file}: ${exists ? '✅' : '❌'}`);
}
console.log('');
console.log('📋 Important Tasks:');
for (const todo of status.todos.important) {
  console.log(`   - ${todo}`);
}
console.log('');
console.log('✅ Status saved to QUICK_STATUS.json');

