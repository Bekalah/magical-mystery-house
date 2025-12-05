#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Gather All Repo Info
 * Scans all directories and repos to collect comprehensive information
 * and connects it all into the live repos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const OUTPUT_FILE = path.join(rootDir, 'ALL_REPO_INFO_COMPILED.json');
const CONNECTIONS_FILE = path.join(rootDir, 'REPO_CONNECTIONS.json');

/**
 * Gather info from a directory
 */
function gatherDirectoryInfo(dirPath, relativePath = '') {
  const info = {
    path: relativePath || dirPath,
    exists: false,
    type: 'unknown',
    files: [],
    subdirs: [],
    packageJson: null,
    gitInfo: null,
    readme: null,
    data: {}
  };

  try {
    if (!fs.existsSync(dirPath)) {
      return info;
    }

    info.exists = true;
    const stat = fs.statSync(dirPath);
    
    if (!stat.isDirectory()) {
      info.type = 'file';
      return info;
    }

    info.type = 'directory';

    // Check for package.json
    const packageJsonPath = path.join(dirPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        info.packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        info.type = 'package';
      } catch (e) {
        // Invalid JSON, skip
      }
    }

    // Check for README
    const readmePaths = ['README.md', 'readme.md', 'README.txt', 'readme.txt'];
    for (const readmeName of readmePaths) {
      const readmePath = path.join(dirPath, readmeName);
      if (fs.existsSync(readmePath)) {
        info.readme = fs.readFileSync(readmePath, 'utf-8').substring(0, 1000); // First 1000 chars
        break;
      }
    }

    // Check for git repo
    const gitPath = path.join(dirPath, '.git');
    if (fs.existsSync(gitPath)) {
      try {
        const gitRemote = execSync('git remote get-url origin', { 
          cwd: dirPath, 
          encoding: 'utf-8',
          stdio: ['ignore', 'pipe', 'ignore']
        }).trim();
        const gitBranch = execSync('git branch --show-current', { 
          cwd: dirPath, 
          encoding: 'utf-8',
          stdio: ['ignore', 'pipe', 'ignore']
        }).trim();
        info.gitInfo = {
          remote: gitRemote,
          branch: gitBranch,
          isRepo: true
        };
        info.type = 'git-repo';
      } catch (e) {
        // Not a git repo or no remote
        info.gitInfo = { isRepo: false };
      }
    }

    // Scan files and subdirs (limited depth to avoid performance issues)
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        // Skip hidden files and common ignore patterns
        if (entry.name.startsWith('.') || 
            entry.name === 'node_modules' || 
            entry.name === 'dist' || 
            entry.name === 'build') {
          continue;
        }

        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          info.subdirs.push(entry.name);
        } else {
          // Only track important files
          if (entry.name.endsWith('.json') || 
              entry.name.endsWith('.md') || 
              entry.name.endsWith('.ts') || 
              entry.name.endsWith('.js') ||
              entry.name.endsWith('.mjs') ||
              entry.name.endsWith('.gd') ||
              entry.name.endsWith('.gdshader')) {
            info.files.push(entry.name);
          }
        }
      }
    } catch (e) {
      // Permission denied or other error
    }

    // Look for data files
    const dataFiles = ['characters.json', 'data.json', 'config.json', 'state.json'];
    for (const dataFile of dataFiles) {
      const dataPath = path.join(dirPath, dataFile);
      if (fs.existsSync(dataPath)) {
        try {
          info.data[dataFile] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        } catch (e) {
          // Invalid JSON
        }
      }
    }

  } catch (e) {
    // Error gathering info
    info.error = e.message;
  }

  return info;
}

/**
 * Scan all packages
 */
function scanPackages() {
  const packagesDir = path.join(rootDir, 'packages');
  const packages = {};

  if (!fs.existsSync(packagesDir)) {
    return packages;
  }

  try {
    const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const packagePath = path.join(packagesDir, entry.name);
        packages[entry.name] = gatherDirectoryInfo(packagePath, `packages/${entry.name}`);
      }
    }
  } catch (e) {
    console.error(`Error scanning packages: ${e.message}`);
  }

  return packages;
}

/**
 * Scan all apps
 */
function scanApps() {
  const appsDir = path.join(rootDir, 'apps');
  const apps = {};

  if (!fs.existsSync(appsDir)) {
    return apps;
  }

  try {
    const entries = fs.readdirSync(appsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const appPath = path.join(appsDir, entry.name);
        apps[entry.name] = gatherDirectoryInfo(appPath, `apps/${entry.name}`);
      }
    }
  } catch (e) {
    console.error(`Error scanning apps: ${e.message}`);
  }

  return apps;
}

/**
 * Scan all tools
 */
function scanTools() {
  const toolsDir = path.join(rootDir, 'tools');
  const tools = {};

  if (!fs.existsSync(toolsDir)) {
    return tools;
  }

  try {
    const entries = fs.readdirSync(toolsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.mjs')) {
        const toolPath = path.join(toolsDir, entry.name);
        tools[entry.name] = gatherDirectoryInfo(toolPath, `tools/${entry.name}`);
      }
    }
  } catch (e) {
    console.error(`Error scanning tools: ${e.message}`);
  }

  return tools;
}

/**
 * Scan scripts
 */
function scanScripts() {
  const scriptsDir = path.join(rootDir, 'scripts');
  const scripts = {};

  if (!fs.existsSync(scriptsDir)) {
    return scripts;
  }

  try {
    const entries = fs.readdirSync(scriptsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.mjs') || entry.name.endsWith('.js'))) {
        const scriptPath = path.join(scriptsDir, entry.name);
        scripts[entry.name] = gatherDirectoryInfo(scriptPath, `scripts/${entry.name}`);
      }
    }
  } catch (e) {
    console.error(`Error scanning scripts: ${e.message}`);
  }

  return scripts;
}

/**
 * Scan root level data files
 */
function scanRootData() {
  const rootData = {};
  const dataFiles = [
    'ALL_CHARACTER_DATA_COMPILED.json',
    'experiment-state.json',
    'CONSOLIDATED_IMPROVEMENTS.json',
    'CONSOLIDATED_BACKUPS.json',
    'MASTER_PLAN.md',
    'EXPERIMENT.md',
    'package.json',
    'pnpm-workspace.yaml'
  ];

  for (const dataFile of dataFiles) {
    const dataPath = path.join(rootDir, dataFile);
    if (fs.existsSync(dataPath)) {
      try {
        if (dataFile.endsWith('.json')) {
          rootData[dataFile] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        } else {
          rootData[dataFile] = fs.readFileSync(dataPath, 'utf-8').substring(0, 5000);
        }
      } catch (e) {
        rootData[dataFile] = { error: e.message };
      }
    }
  }

  return rootData;
}

/**
 * Find connections between repos and packages
 */
function findConnections(allInfo) {
  const connections = {
    packageDependencies: {},
    gitRemotes: {},
    dataConnections: {},
    crossReferences: []
  };

  // Find package dependencies
  for (const [pkgName, pkgInfo] of Object.entries(allInfo.packages)) {
    if (pkgInfo.packageJson && pkgInfo.packageJson.dependencies) {
      connections.packageDependencies[pkgName] = Object.keys(pkgInfo.packageJson.dependencies);
    }
  }

  // Find git remotes
  for (const [name, info] of Object.entries(allInfo.packages)) {
    if (info.gitInfo && info.gitInfo.remote) {
      connections.gitRemotes[name] = info.gitInfo.remote;
    }
  }
  for (const [name, info] of Object.entries(allInfo.apps)) {
    if (info.gitInfo && info.gitInfo.remote) {
      connections.gitRemotes[name] = info.gitInfo.remote;
    }
  }

  // Find data connections (files that reference each other)
  const allDataFiles = [];
  for (const [name, info] of Object.entries(allInfo.packages)) {
    if (info.data) {
      allDataFiles.push({ name, type: 'package', data: info.data });
    }
  }
  for (const [name, info] of Object.entries(allInfo.apps)) {
    if (info.data) {
      allDataFiles.push({ name, type: 'app', data: info.data });
    }
  }

  // Find cross-references
  for (let i = 0; i < allDataFiles.length; i++) {
    for (let j = i + 1; j < allDataFiles.length; j++) {
      const file1 = allDataFiles[i];
      const file2 = allDataFiles[j];
      
      // Check if they reference each other
      const file1Str = JSON.stringify(file1.data);
      const file2Str = JSON.stringify(file2.data);
      
      if (file1Str.includes(file2.name) || file2Str.includes(file1.name)) {
        connections.crossReferences.push({
          from: `${file1.type}/${file1.name}`,
          to: `${file2.type}/${file2.name}`,
          type: 'data-reference'
        });
      }
    }
  }

  return connections;
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Gathering info from all repos and directories...');

  const allInfo = {
    timestamp: new Date().toISOString(),
    root: gatherDirectoryInfo(rootDir, 'root'),
    packages: scanPackages(),
    apps: scanApps(),
    tools: scanTools(),
    scripts: scanScripts(),
    rootData: scanRootData()
  };

  // Find connections
  allInfo.connections = findConnections(allInfo);

  // Summary
  allInfo.summary = {
    totalPackages: Object.keys(allInfo.packages).length,
    totalApps: Object.keys(allInfo.apps).length,
    totalTools: Object.keys(allInfo.tools).length,
    totalScripts: Object.keys(allInfo.scripts).length,
    packagesWithGit: Object.values(allInfo.packages).filter(p => p.gitInfo?.isRepo).length,
    packagesWithData: Object.values(allInfo.packages).filter(p => Object.keys(p.data || {}).length > 0).length,
    totalConnections: allInfo.connections.crossReferences.length
  };

  // Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allInfo, null, 2));
  fs.writeFileSync(CONNECTIONS_FILE, JSON.stringify(allInfo.connections, null, 2));

  console.log(`✅ Gathered info from:`);
  console.log(`   - ${allInfo.summary.totalPackages} packages`);
  console.log(`   - ${allInfo.summary.totalApps} apps`);
  console.log(`   - ${allInfo.summary.totalTools} tools`);
  console.log(`   - ${allInfo.summary.totalScripts} scripts`);
  console.log(`   - ${allInfo.summary.packagesWithGit} git repos`);
  console.log(`   - ${allInfo.summary.totalConnections} connections found`);
  console.log(`\n📁 Output written to:`);
  console.log(`   - ${OUTPUT_FILE}`);
  console.log(`   - ${CONNECTIONS_FILE}`);

  return allInfo;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

