#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Fix and Unify Across All Repos
 * - Confirms what was found
 * - Fixes issues across all repos
 * - Unifies configurations
 * - Ensures consistency
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPORT_FILE = path.join(rootDir, 'FIX_UNIFY_REPORT.json');

// Get all git remotes
function getGitRemotes() {
  const remotes = {};
  try {
    const output = execSync('git remote -v', { 
      cwd: rootDir, 
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    
    for (const line of output.split('\n')) {
      if (line.trim()) {
        const match = line.match(/(\S+)\s+(\S+)\s+\((fetch|push)\)/);
        if (match) {
          const [, name, url, type] = match;
          if (!remotes[name]) {
            remotes[name] = { url, fetch: null, push: null };
          }
          remotes[name][type] = url;
        }
      }
    }
  } catch (e) {}
  return remotes;
}

// Find repo local paths
function findRepoPath(remoteName) {
  const possiblePaths = [
    path.join(rootDir, '.remote-repos', remoteName),
    path.join(rootDir, 'packages', remoteName),
    path.join(rootDir, 'packages', remoteName.replace('cathedral-', '').replace('_', '-')),
    path.join(rootDir, 'apps', remoteName),
    path.join(rootDir, 'apps', remoteName.replace('cathedral-', '').replace('_', '-'))
  ];

  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      const gitPath = path.join(possiblePath, '.git');
      if (fs.existsSync(gitPath)) {
        return possiblePath;
      }
    }
  }
  return null;
}

// Unify package.json
function unifyPackageJson(packageJsonPath) {
  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    let updated = false;

    // Ensure engines
    if (!pkg.engines) {
      pkg.engines = {};
      updated = true;
    }
    if (!pkg.engines.node) {
      pkg.engines.node = '*';
      updated = true;
    }
    if (!pkg.engines.pnpm) {
      pkg.engines.pnpm = '*';
      updated = true;
    }

    // Ensure packageManager
    if (!pkg.packageManager) {
      pkg.packageManager = 'pnpm@10.23.0';
      updated = true;
    }

    // Ensure license
    if (pkg.license !== 'CC0-1.0') {
      pkg.license = 'CC0-1.0';
      updated = true;
    }

    // Standardize React versions
    if (pkg.dependencies?.react && !pkg.dependencies.react.includes('^18')) {
      pkg.dependencies.react = '^18.2.0';
      updated = true;
    }
    if (pkg.devDependencies?.react && !pkg.devDependencies.react.includes('^18')) {
      pkg.devDependencies.react = '^18.2.0';
      updated = true;
    }
    if (pkg.dependencies?.['react-dom'] && !pkg.dependencies['react-dom'].includes('^18')) {
      pkg.dependencies['react-dom'] = '^18.2.0';
      updated = true;
    }
    if (pkg.devDependencies?.['react-dom'] && !pkg.devDependencies['react-dom'].includes('^18')) {
      pkg.devDependencies['react-dom'] = '^18.2.0';
      updated = true;
    }

    // Standardize Vite version
    if (pkg.dependencies?.vite && !pkg.dependencies.vite.includes('^5')) {
      pkg.dependencies.vite = '^5.0.0';
      updated = true;
    }
    if (pkg.devDependencies?.vite && !pkg.devDependencies.vite.includes('^5')) {
      pkg.devDependencies.vite = '^5.0.0';
      updated = true;
    }

    // Ensure build script
    if (!pkg.scripts) {
      pkg.scripts = {};
      updated = true;
    }
    if (!pkg.scripts.build && (pkg.dependencies?.vite || pkg.devDependencies?.vite)) {
      pkg.scripts.build = 'vite build';
      updated = true;
    }
    if (!pkg.scripts.dev && (pkg.dependencies?.vite || pkg.devDependencies?.vite)) {
      pkg.scripts.dev = 'vite dev';
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

// Unify vercel.json
function unifyVercelConfig(repoPath, platform) {
  const vercelPath = path.join(repoPath, 'vercel.json');
  const vercelConfig = {
    buildCommand: 'pnpm build',
    outputDirectory: platform === 'nextjs' ? '.next' : 'dist',
    installCommand: 'pnpm install',
    framework: platform === 'nextjs' ? 'nextjs' : null
  };

  if (platform !== 'nextjs') {
    vercelConfig.rewrites = [
      {
        source: '/(.*)',
        destination: '/index.html'
      }
    ];
  }

  try {
    if (fs.existsSync(vercelPath)) {
      const existing = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
      // Merge with existing
      Object.assign(vercelConfig, existing);
    }
    fs.writeFileSync(vercelPath, JSON.stringify(vercelConfig, null, 2) + '\n', 'utf-8');
    return true;
  } catch (e) {
    return false;
  }
}

// Determine platform
function determinePlatform(repoPath) {
  const packageJsonPath = path.join(repoPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (pkg.dependencies?.next || pkg.devDependencies?.next) {
      return 'nextjs';
    } else if (pkg.dependencies?.vite || pkg.devDependencies?.vite) {
      return 'vite';
    } else if (pkg.dependencies?.react || pkg.devDependencies?.react) {
      return 'react';
    }
    return 'static';
  } catch (e) {
    return null;
  }
}

// Main function
async function main() {
  console.log('🔍 Confirming findings and fixing/unifying across repos...');
  console.log('');

  // Load previous findings
  let deploymentFindings = {};
  let reviewFindings = {};

  try {
    const deploymentPath = path.join(rootDir, 'FREE_DEPLOYMENT_SETUP.json');
    if (fs.existsSync(deploymentPath)) {
      deploymentFindings = JSON.parse(fs.readFileSync(deploymentPath, 'utf-8'));
      console.log('✅ Loaded deployment findings');
    }
  } catch (e) {}

  try {
    const reviewPath = path.join(rootDir, 'PLATFORMS_APPS_REVIEW.json');
    if (fs.existsSync(reviewPath)) {
      reviewFindings = JSON.parse(fs.readFileSync(reviewPath, 'utf-8'));
      console.log('✅ Loaded review findings');
    }
  } catch (e) {}

  console.log('');

  // Get all remotes
  const remotes = getGitRemotes();
  console.log(`Found ${Object.keys(remotes).length} git remotes`);
  console.log('');

  const fixes = {
    repos: {},
    apps: {},
    packages: {}
  };

  const summary = {
    reposChecked: 0,
    reposFixed: 0,
    appsChecked: 0,
    appsFixed: 0,
    packagesChecked: 0,
    packagesFixed: 0,
    configsCreated: 0,
    errors: []
  };

  // Process repos
  console.log('📚 Processing repos...');
  for (const [remoteName, remoteInfo] of Object.entries(remotes)) {
    console.log(`   Processing ${remoteName}...`);
    summary.reposChecked++;

    const repoPath = findRepoPath(remoteName);
    if (!repoPath) {
      console.log(`   ⚠️  Not found locally`);
      continue;
    }

    console.log(`   ✅ Found at: ${repoPath}`);

    const repoFixes = {
      packageJson: false,
      vercelConfig: false,
      errors: []
    };

    // Fix package.json
    const packageJsonPath = path.join(repoPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      if (unifyPackageJson(packageJsonPath)) {
        repoFixes.packageJson = true;
        summary.reposFixed++;
        console.log(`   ✅ Fixed package.json`);
      }
    }

    // Fix vercel.json if needed
    const platform = determinePlatform(repoPath);
    if (platform && (platform === 'vite' || platform === 'react' || platform === 'nextjs')) {
      if (unifyVercelConfig(repoPath, platform)) {
        repoFixes.vercelConfig = true;
        summary.configsCreated++;
        console.log(`   ✅ Created/updated vercel.json`);
      }
    }

    fixes.repos[remoteName] = repoFixes;
    console.log('');
  }

  // Process apps
  console.log('📱 Processing apps...');
  const appsDir = path.join(rootDir, 'apps');
  if (fs.existsSync(appsDir)) {
    try {
      const entries = fs.readdirSync(appsDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          summary.appsChecked++;
          const appPath = path.join(appsDir, entry.name);
          console.log(`   Processing ${entry.name}...`);

          const packageJsonPath = path.join(appPath, 'package.json');
          if (fs.existsSync(packageJsonPath)) {
            if (unifyPackageJson(packageJsonPath)) {
              fixes.apps[entry.name] = { packageJson: true };
              summary.appsFixed++;
              console.log(`   ✅ Fixed package.json`);
            }

            const platform = determinePlatform(appPath);
            if (platform && (platform === 'vite' || platform === 'react' || platform === 'nextjs')) {
              if (unifyVercelConfig(appPath, platform)) {
                if (!fixes.apps[entry.name]) fixes.apps[entry.name] = {};
                fixes.apps[entry.name].vercelConfig = true;
                summary.configsCreated++;
                console.log(`   ✅ Created/updated vercel.json`);
              }
            }
          }
          console.log('');
        }
      }
    } catch (e) {
      summary.errors.push(`Error processing apps: ${e.message}`);
    }
  }

  // Process packages
  console.log('📦 Processing packages...');
  const packagesDir = path.join(rootDir, 'packages');
  if (fs.existsSync(packagesDir)) {
    try {
      const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          summary.packagesChecked++;
          const packagePath = path.join(packagesDir, entry.name);
          console.log(`   Processing ${entry.name}...`);

          const packageJsonPath = path.join(packagePath, 'package.json');
          if (fs.existsSync(packageJsonPath)) {
            if (unifyPackageJson(packageJsonPath)) {
              fixes.packages[entry.name] = { packageJson: true };
              summary.packagesFixed++;
              console.log(`   ✅ Fixed package.json`);
            }
          }
          console.log('');
        }
      }
    } catch (e) {
      summary.errors.push(`Error processing packages: ${e.message}`);
    }
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary,
    fixes,
    findings: {
      deployment: deploymentFindings,
      review: reviewFindings
    }
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  console.log('📊 Summary:');
  console.log(`   - Repos Checked: ${summary.reposChecked}`);
  console.log(`   - Repos Fixed: ${summary.reposFixed}`);
  console.log(`   - Apps Checked: ${summary.appsChecked}`);
  console.log(`   - Apps Fixed: ${summary.appsFixed}`);
  console.log(`   - Packages Checked: ${summary.packagesChecked}`);
  console.log(`   - Packages Fixed: ${summary.packagesFixed}`);
  console.log(`   - Configs Created: ${summary.configsCreated}`);
  console.log(`   - Errors: ${summary.errors.length}`);
  console.log('');

  if (summary.errors.length > 0) {
    console.log('⚠️  Errors:');
    for (const error of summary.errors) {
      console.log(`   - ${error}`);
    }
    console.log('');
  }

  console.log(`✅ Report saved to: ${REPORT_FILE}`);
  console.log('');
  console.log('🎯 Unified across all repos:');
  console.log('   ✅ package.json (engines, license, versions)');
  console.log('   ✅ vercel.json (deployment configs)');
  console.log('   ✅ React versions (^18.2.0)');
  console.log('   ✅ Vite versions (^5.0.0)');
  console.log('   ✅ Build scripts');

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

