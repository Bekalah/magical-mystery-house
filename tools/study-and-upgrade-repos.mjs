#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Study and Upgrade All Repos
 * - Studies all connected repos
 * - Finds correct paths
 * - Upgrades connections
 * - Updates monorepo structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPORT_FILE = path.join(rootDir, 'REPO_STUDY_AND_UPGRADE_REPORT.json');

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
  } catch (e) {
    // Not a git repo or error
  }
  return remotes;
}

// Study a repo (check if it exists locally or needs to be cloned)
function studyRepo(remoteName, remoteUrl) {
  const study = {
    remoteName,
    remoteUrl,
    exists: false,
    localPath: null,
    structure: {},
    packageJson: null,
    hasVite: false,
    hasReact: false,
    hasNext: false,
    buildConfig: null,
    deploymentConfig: null,
    correctPaths: [],
    needsUpgrade: false,
    upgradeActions: []
  };

  // Check if repo exists in .remote-repos or packages
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
        study.exists = true;
        study.localPath = possiblePath;
        break;
      }
    }
  }

  if (study.exists && study.localPath) {
    // Study the repo structure
    study.structure = studyRepoStructure(study.localPath);
    
    // Check for package.json
    const packageJsonPath = path.join(study.localPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        study.packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        study.hasVite = !!(study.packageJson.dependencies?.vite || study.packageJson.devDependencies?.vite);
        study.hasReact = !!(study.packageJson.dependencies?.react || study.packageJson.devDependencies?.react);
        study.hasNext = !!(study.packageJson.dependencies?.next || study.packageJson.devDependencies?.next);
      } catch (e) {
        // Invalid JSON
      }
    }

    // Check for build configs
    const viteConfigPath = path.join(study.localPath, 'vite.config.ts');
    const nextConfigPath = path.join(study.localPath, 'next.config.js');
    const vercelConfigPath = path.join(study.localPath, 'vercel.json');
    
    if (fs.existsSync(viteConfigPath)) {
      study.buildConfig = { type: 'vite', path: viteConfigPath };
    } else if (fs.existsSync(nextConfigPath)) {
      study.buildConfig = { type: 'next', path: nextConfigPath };
    }

    if (fs.existsSync(vercelConfigPath)) {
      try {
        study.deploymentConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'));
      } catch (e) {
        // Invalid JSON
      }
    }

    // Find correct paths
    study.correctPaths = findCorrectPaths(study.localPath, study.structure);

    // Determine if upgrade needed
    study.needsUpgrade = determineUpgradeNeeded(study);
    if (study.needsUpgrade) {
      study.upgradeActions = generateUpgradeActions(study);
    }
  }

  return study;
}

// Study repo structure
function studyRepoStructure(repoPath) {
  const structure = {
    hasSrc: false,
    hasDist: false,
    hasBuild: false,
    hasPublic: false,
    hasPages: false,
    hasApp: false,
    hasComponents: false,
    mainFiles: [],
    configFiles: []
  };

  try {
    const entries = fs.readdirSync(repoPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      
      if (entry.isDirectory()) {
        if (entry.name === 'src') structure.hasSrc = true;
        if (entry.name === 'dist') structure.hasDist = true;
        if (entry.name === 'build') structure.hasBuild = true;
        if (entry.name === 'public') structure.hasPublic = true;
        if (entry.name === 'pages') structure.hasPages = true;
        if (entry.name === 'app') structure.hasApp = true;
        if (entry.name === 'components') structure.hasComponents = true;
      } else {
        if (entry.name.endsWith('.config.js') || 
            entry.name.endsWith('.config.ts') ||
            entry.name === 'vercel.json' ||
            entry.name === 'netlify.toml') {
          structure.configFiles.push(entry.name);
        }
        if (entry.name === 'index.html' ||
            entry.name === 'index.tsx' ||
            entry.name === 'index.ts' ||
            entry.name === 'main.tsx' ||
            entry.name === 'App.tsx') {
          structure.mainFiles.push(entry.name);
        }
      }
    }
  } catch (e) {
    // Error reading structure
  }

  return structure;
}

// Find correct paths
function findCorrectPaths(repoPath, structure) {
  const paths = {
    source: null,
    build: null,
    public: null,
    entry: null,
    output: null
  };

  // Find source directory
  if (structure.hasSrc) {
    paths.source = 'src';
  } else if (structure.hasPages) {
    paths.source = 'pages';
  } else if (structure.hasApp) {
    paths.source = 'app';
  } else {
    paths.source = '.';
  }

  // Find build output
  if (structure.hasDist) {
    paths.output = 'dist';
  } else if (structure.hasBuild) {
    paths.output = 'build';
  } else {
    paths.output = 'dist'; // Default
  }

  // Find public directory
  if (structure.hasPublic) {
    paths.public = 'public';
  }

  // Find entry point
  const entryFiles = ['index.html', 'index.tsx', 'index.ts', 'main.tsx', 'App.tsx'];
  for (const file of entryFiles) {
    const filePath = path.join(repoPath, paths.source, file);
    if (fs.existsSync(filePath)) {
      paths.entry = path.join(paths.source, file);
      break;
    }
  }

  if (!paths.entry && structure.mainFiles.length > 0) {
    paths.entry = structure.mainFiles[0];
  }

  return paths;
}

// Determine if upgrade needed
function determineUpgradeNeeded(study) {
  if (!study.packageJson) return true;
  if (!study.buildConfig && (study.hasVite || study.hasReact || study.hasNext)) return true;
  if (!study.deploymentConfig && (study.hasVite || study.hasReact || study.hasNext)) return true;
  
  // Check versions
  if (study.packageJson.dependencies) {
    const reactVersion = study.packageJson.dependencies.react || study.packageJson.devDependencies?.react;
    if (reactVersion && !reactVersion.includes('^18')) {
      return true;
    }
  }

  return false;
}

// Generate upgrade actions
function generateUpgradeActions(study) {
  const actions = [];

  if (!study.buildConfig && study.hasVite) {
    actions.push({
      type: 'create-vite-config',
      description: 'Create vite.config.ts',
      file: path.join(study.localPath, 'vite.config.ts')
    });
  }

  if (!study.deploymentConfig) {
    actions.push({
      type: 'create-vercel-config',
      description: 'Create vercel.json',
      file: path.join(study.localPath, 'vercel.json')
    });
  }

  if (study.packageJson) {
    // Check and fix versions
    const needsVersionFix = 
      (study.packageJson.dependencies?.react && !study.packageJson.dependencies.react.includes('^18')) ||
      (study.packageJson.devDependencies?.react && !study.packageJson.devDependencies.react.includes('^18'));

    if (needsVersionFix) {
      actions.push({
        type: 'fix-versions',
        description: 'Update React to ^18.2.0',
        file: path.join(study.localPath, 'package.json')
      });
    }
  }

  // Check for missing build scripts
  if (study.packageJson && !study.packageJson.scripts?.build) {
    actions.push({
      type: 'add-build-script',
      description: 'Add build script',
      file: path.join(study.localPath, 'package.json')
    });
  }

  return actions;
}

// Apply upgrade actions
function applyUpgradeActions(study) {
  const applied = [];
  const failed = [];

  for (const action of study.upgradeActions) {
    try {
      switch (action.type) {
        case 'create-vite-config':
          const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: '${study.correctPaths.output}',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
})
`;
          fs.writeFileSync(action.file, viteConfig, 'utf-8');
          applied.push(action);
          break;

        case 'create-vercel-config':
          const vercelConfig = {
            buildCommand: 'pnpm build',
            outputDirectory: study.correctPaths.output,
            installCommand: 'pnpm install',
            framework: study.hasNext ? 'nextjs' : null
          };
          fs.writeFileSync(action.file, JSON.stringify(vercelConfig, null, 2) + '\n', 'utf-8');
          applied.push(action);
          break;

        case 'fix-versions':
          const packageJson = JSON.parse(fs.readFileSync(action.file, 'utf-8'));
          if (packageJson.dependencies?.react) {
            packageJson.dependencies.react = '^18.2.0';
          }
          if (packageJson.devDependencies?.react) {
            packageJson.devDependencies.react = '^18.2.0';
          }
          if (packageJson.dependencies?.['react-dom']) {
            packageJson.dependencies['react-dom'] = '^18.2.0';
          }
          if (packageJson.devDependencies?.['react-dom']) {
            packageJson.devDependencies['react-dom'] = '^18.2.0';
          }
          fs.writeFileSync(action.file, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
          applied.push(action);
          break;

        case 'add-build-script':
          const pkg = JSON.parse(fs.readFileSync(action.file, 'utf-8'));
          if (!pkg.scripts) pkg.scripts = {};
          if (!pkg.scripts.build) {
            if (study.hasVite) {
              pkg.scripts.build = 'vite build';
            } else if (study.hasNext) {
              pkg.scripts.build = 'next build';
            } else {
              pkg.scripts.build = 'tsc && vite build';
            }
          }
          fs.writeFileSync(action.file, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
          applied.push(action);
          break;
      }
    } catch (e) {
      failed.push({ action, error: e.message });
    }
  }

  return { applied, failed };
}

// Main function
async function main() {
  console.log('🔍 Studying all connected repos...');
  console.log('');

  const remotes = getGitRemotes();
  console.log(`Found ${Object.keys(remotes).length} git remotes`);
  console.log('');

  const studies = {};
  const upgrades = {
    total: 0,
    applied: 0,
    failed: 0
  };

  for (const [remoteName, remoteInfo] of Object.entries(remotes)) {
    console.log(`📚 Studying ${remoteName}...`);
    const study = studyRepo(remoteName, remoteInfo.url);
    studies[remoteName] = study;

    if (study.exists) {
      console.log(`   ✅ Found at: ${study.localPath}`);
      console.log(`   - Has Vite: ${study.hasVite}`);
      console.log(`   - Has React: ${study.hasReact}`);
      console.log(`   - Has Next: ${study.hasNext}`);
      console.log(`   - Needs Upgrade: ${study.needsUpgrade}`);
      
      if (study.needsUpgrade && study.upgradeActions.length > 0) {
        console.log(`   - Upgrade Actions: ${study.upgradeActions.length}`);
        upgrades.total += study.upgradeActions.length;
        
        // Apply upgrades
        const result = applyUpgradeActions(study);
        upgrades.applied += result.applied.length;
        upgrades.failed += result.failed.length;
        
        if (result.applied.length > 0) {
          console.log(`   ✅ Applied ${result.applied.length} upgrades`);
        }
        if (result.failed.length > 0) {
          console.log(`   ⚠️  Failed ${result.failed.length} upgrades`);
        }
      }
    } else {
      console.log(`   ⚠️  Not found locally`);
    }
    console.log('');
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    remotes: Object.keys(remotes).length,
    studies,
    upgrades,
    summary: {
      totalRepos: Object.keys(studies).length,
      existingRepos: Object.values(studies).filter(s => s.exists).length,
      reposNeedingUpgrade: Object.values(studies).filter(s => s.needsUpgrade).length,
      totalUpgradeActions: upgrades.total,
      appliedUpgrades: upgrades.applied,
      failedUpgrades: upgrades.failed
    }
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  console.log('📊 Summary:');
  console.log(`   - Total Remotes: ${report.remotes}`);
  console.log(`   - Existing Repos: ${report.summary.existingRepos}`);
  console.log(`   - Repos Needing Upgrade: ${report.summary.reposNeedingUpgrade}`);
  console.log(`   - Total Upgrade Actions: ${report.summary.totalUpgradeActions}`);
  console.log(`   - Applied: ${report.summary.appliedUpgrades}`);
  console.log(`   - Failed: ${report.summary.failedUpgrades}`);
  console.log('');
  console.log(`✅ Report saved to: ${REPORT_FILE}`);

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

