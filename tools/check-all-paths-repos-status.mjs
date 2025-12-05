#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Check All Paths, Repos, and Directories Status
 * Comprehensive status check of:
 * - All paths and directories
 * - All git repos and remotes
 * - All connections between systems
 * - What needs to be done
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const STATUS_FILE = path.join(rootDir, 'ALL_PATHS_REPOS_STATUS.json');

// Check if path exists and get info
function checkPath(dirPath, relativePath = '') {
  const info = {
    path: relativePath || dirPath,
    exists: false,
    isDirectory: false,
    isGitRepo: false,
    hasPackageJson: false,
    hasReadme: false,
    gitRemote: null,
    gitBranch: null,
    packageName: null,
    subdirs: [],
    files: [],
    issues: []
  };

  try {
    if (!fs.existsSync(dirPath)) {
      info.issues.push('Path does not exist');
      return info;
    }

    info.exists = true;
    const stat = fs.statSync(dirPath);
    info.isDirectory = stat.isDirectory();

    if (!info.isDirectory) {
      return info;
    }

    // Check for package.json
    const packageJsonPath = path.join(dirPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        info.hasPackageJson = true;
        info.packageName = packageJson.name || path.basename(dirPath);
      } catch (e) {
        info.issues.push('Invalid package.json');
      }
    }

    // Check for README
    const readmePaths = ['README.md', 'readme.md', 'README.txt'];
    for (const readmeName of readmePaths) {
      if (fs.existsSync(path.join(dirPath, readmeName))) {
        info.hasReadme = true;
        break;
      }
    }

    // Check for git repo
    const gitPath = path.join(dirPath, '.git');
    if (fs.existsSync(gitPath)) {
      info.isGitRepo = true;
      try {
        info.gitRemote = execSync('git remote get-url origin', {
          cwd: dirPath,
          encoding: 'utf-8',
          stdio: ['ignore', 'pipe', 'ignore']
        }).trim();
      } catch (e) {
        // No remote or error
      }
      try {
        info.gitBranch = execSync('git branch --show-current', {
          cwd: dirPath,
          encoding: 'utf-8',
          stdio: ['ignore', 'pipe', 'ignore']
        }).trim();
      } catch (e) {
        // Error getting branch
      }
    }

    // List subdirs and files (limited)
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries.slice(0, 20)) { // Limit to first 20
        if (entry.name.startsWith('.')) continue;
        if (entry.isDirectory()) {
          info.subdirs.push(entry.name);
        } else {
          info.files.push(entry.name);
        }
      }
    } catch (e) {
      info.issues.push(`Error reading directory: ${e.message}`);
    }

  } catch (e) {
    info.issues.push(`Error checking path: ${e.message}`);
  }

  return info;
}

// Check all packages
function checkPackages() {
  const packagesDir = path.join(rootDir, 'packages');
  const packages = {};

  if (!fs.existsSync(packagesDir)) {
    return { error: 'packages directory does not exist', packages: {} };
  }

  try {
    const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const packagePath = path.join(packagesDir, entry.name);
        packages[entry.name] = checkPath(packagePath, `packages/${entry.name}`);
      }
    }
  } catch (e) {
    return { error: e.message, packages: {} };
  }

  return { packages };
}

// Check all apps
function checkApps() {
  const appsDir = path.join(rootDir, 'apps');
  const apps = {};

  if (!fs.existsSync(appsDir)) {
    return { error: 'apps directory does not exist', apps: {} };
  }

  try {
    const entries = fs.readdirSync(appsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const appPath = path.join(appsDir, entry.name);
        apps[entry.name] = checkPath(appPath, `apps/${entry.name}`);
      }
    }
  } catch (e) {
    return { error: e.message, apps: {} };
  }

  return { apps };
}

// Check tools
function checkTools() {
  const toolsDir = path.join(rootDir, 'tools');
  return checkPath(toolsDir, 'tools');
}

// Check scripts
function checkScripts() {
  const scriptsDir = path.join(rootDir, 'scripts');
  return checkPath(scriptsDir, 'scripts');
}

// Check root
function checkRoot() {
  return checkPath(rootDir, 'root');
}

// Find connections
function findConnections(allChecks) {
  const connections = {
    packageDependencies: {},
    gitRemotes: {},
    missingConnections: [],
    brokenPaths: []
  };

  // Find package dependencies
  for (const [pkgName, pkgInfo] of Object.entries(allChecks.packages || {})) {
    if (pkgInfo.hasPackageJson) {
      try {
        const packageJsonPath = path.join(rootDir, 'packages', pkgName, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (packageJson.dependencies) {
          connections.packageDependencies[pkgName] = Object.keys(packageJson.dependencies);
        }
      } catch (e) {
        // Error reading package.json
      }
    }
  }

  // Find git remotes
  for (const [name, info] of Object.entries(allChecks.packages || {})) {
    if (info.isGitRepo && info.gitRemote) {
      connections.gitRemotes[name] = info.gitRemote;
    }
  }
  for (const [name, info] of Object.entries(allChecks.apps || {})) {
    if (info.isGitRepo && info.gitRemote) {
      connections.gitRemotes[name] = info.gitRemote;
    }
  }

  // Find missing connections
  for (const [pkgName, pkgInfo] of Object.entries(allChecks.packages || {})) {
    if (pkgInfo.hasPackageJson) {
      try {
        const packageJsonPath = path.join(rootDir, 'packages', pkgName, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (packageJson.dependencies) {
          for (const dep of Object.keys(packageJson.dependencies)) {
            // Check if dependency exists in packages
            if (dep.startsWith('@cathedral/') || dep.startsWith('cathedral-')) {
              const depName = dep.replace('@cathedral/', '').replace('cathedral-', '');
              if (!allChecks.packages[depName] && !allChecks.packages[`@cathedral/${depName}`]) {
                connections.missingConnections.push({
                  from: pkgName,
                  to: dep,
                  type: 'missing-package-dependency'
                });
              }
            }
          }
        }
      } catch (e) {
        // Error
      }
    }
  }

  // Find broken paths
  for (const [name, info] of Object.entries(allChecks.packages || {})) {
    if (info.issues && info.issues.length > 0) {
      connections.brokenPaths.push({
        path: info.path,
        issues: info.issues
      });
    }
  }

  return connections;
}

// Generate what needs to be done
function generateTodoList(allChecks, connections) {
  const todos = {
    critical: [],
    important: [],
    enhancements: []
  };

  // Critical: Missing packages
  for (const missing of connections.missingConnections) {
    todos.critical.push({
      task: `Install or create missing package: ${missing.to}`,
      reason: `Required by ${missing.from}`,
      priority: 'critical'
    });
  }

  // Critical: Broken paths
  for (const broken of connections.brokenPaths) {
    todos.critical.push({
      task: `Fix broken path: ${broken.path}`,
      reason: broken.issues.join(', '),
      priority: 'critical'
    });
  }

  // Important: Packages without package.json
  for (const [name, info] of Object.entries(allChecks.packages || {})) {
    if (!info.hasPackageJson && info.exists) {
      todos.important.push({
        task: `Add package.json to ${name}`,
        reason: 'Package directory exists but no package.json',
        priority: 'important'
      });
    }
  }

  // Important: Packages without README
  for (const [name, info] of Object.entries(allChecks.packages || {})) {
    if (info.hasPackageJson && !info.hasReadme) {
      todos.important.push({
        task: `Add README.md to ${name}`,
        reason: 'Package exists but no documentation',
        priority: 'important'
      });
    }
  }

  // Important: Git repos without remotes
  for (const [name, info] of Object.entries(allChecks.packages || {})) {
    if (info.isGitRepo && !info.gitRemote) {
      todos.important.push({
        task: `Add git remote to ${name}`,
        reason: 'Git repo exists but no remote configured',
        priority: 'important'
      });
    }
  }

  // Enhancements: Packages that could be improved
  for (const [name, info] of Object.entries(allChecks.packages || {})) {
    if (info.hasPackageJson && info.hasReadme && info.isGitRepo && info.gitRemote) {
      // This package is complete, but we could check for other enhancements
      if (info.files.length === 0 && info.subdirs.length === 0) {
        todos.enhancements.push({
          task: `Add source files to ${name}`,
          reason: 'Package structure exists but no source files',
          priority: 'enhancement'
        });
      }
    }
  }

  return todos;
}

// Main function
async function main() {
  console.log('🔍 Checking all paths, repos, and directories...');
  console.log('');

  const allChecks = {
    root: checkRoot(),
    packages: checkPackages(),
    apps: checkApps(),
    tools: checkTools(),
    scripts: checkScripts()
  };

  // Extract packages and apps from results
  const packages = allChecks.packages.packages || {};
  const apps = allChecks.packages.apps || {};

  // Find connections
  const connections = findConnections({ packages, apps });

  // Generate todo list
  const todos = generateTodoList({ packages, apps }, connections);

  // Summary
  const summary = {
    totalPackages: Object.keys(packages).length,
    totalApps: Object.keys(apps).length,
    packagesWithPackageJson: Object.values(packages).filter(p => p.hasPackageJson).length,
    packagesWithReadme: Object.values(packages).filter(p => p.hasReadme).length,
    gitRepos: Object.values(packages).filter(p => p.isGitRepo).length,
    gitReposWithRemote: Object.values(packages).filter(p => p.isGitRepo && p.gitRemote).length,
    totalConnections: Object.keys(connections.packageDependencies).length,
    missingConnections: connections.missingConnections.length,
    brokenPaths: connections.brokenPaths.length,
    criticalTodos: todos.critical.length,
    importantTodos: todos.important.length,
    enhancementTodos: todos.enhancements.length
  };

  const report = {
    timestamp: new Date().toISOString(),
    summary,
    checks: allChecks,
    connections,
    todos
  };

  // Write report
  fs.writeFileSync(STATUS_FILE, JSON.stringify(report, null, 2));

  // Print summary
  console.log('📊 Status Summary:');
  console.log(`   - Total Packages: ${summary.totalPackages}`);
  console.log(`   - Total Apps: ${summary.totalApps}`);
  console.log(`   - Packages with package.json: ${summary.packagesWithPackageJson}`);
  console.log(`   - Packages with README: ${summary.packagesWithReadme}`);
  console.log(`   - Git Repos: ${summary.gitRepos}`);
  console.log(`   - Git Repos with Remote: ${summary.gitReposWithRemote}`);
  console.log(`   - Package Dependencies: ${summary.totalConnections}`);
  console.log('');
  console.log('⚠️  Issues:');
  console.log(`   - Missing Connections: ${summary.missingConnections}`);
  console.log(`   - Broken Paths: ${summary.brokenPaths}`);
  console.log('');
  console.log('📋 What Needs to be Done:');
  console.log(`   - Critical: ${summary.criticalTodos} tasks`);
  console.log(`   - Important: ${summary.importantTodos} tasks`);
  console.log(`   - Enhancements: ${summary.enhancementTodos} tasks`);
  console.log('');
  console.log(`✅ Full report written to: ${STATUS_FILE}`);
  console.log('');

  // Print critical todos
  if (todos.critical.length > 0) {
    console.log('🚨 Critical Tasks:');
    for (const todo of todos.critical.slice(0, 10)) {
      console.log(`   - ${todo.task}`);
      console.log(`     Reason: ${todo.reason}`);
    }
    if (todos.critical.length > 10) {
      console.log(`   ... and ${todos.critical.length - 10} more`);
    }
    console.log('');
  }

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

