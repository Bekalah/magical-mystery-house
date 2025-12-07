#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Update Node Version for cathedral-master
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Updates Node version to latest LTS (20.x) across:
 * - GitHub workflows
 * - .nvmrc files
 * - Dockerfiles
 * - package.json engines
 * - Render configs
 * - GitLab CI
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn',
  nodeVersion: '20' // LTS version
};

function ripgrepSearch(pattern) {
  try {
    const result = execSync(`rg --files "${pattern}"`, {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function updateGitHubWorkflows() {
  const workflowsDir = join(rootDir, '.github', 'workflows');
  if (!existsSync(workflowsDir)) return { updated: [], errors: [] };
  
  const workflows = readdirSync(workflowsDir)
    .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  
  const updated = [];
  const errors = [];
  
  workflows.forEach(workflow => {
    const workflowPath = join(workflowsDir, workflow);
    try {
      let content = readFileSync(workflowPath, 'utf-8');
      let changed = false;
      
      // Update node-version in matrix
      if (content.includes('node-version:')) {
        content = content.replace(
          /node-version:\s*\[?['"]?[\d.]+['"]?\]?/g,
          `node-version: ['${PROJECT_INFO.nodeVersion}']`
        );
        content = content.replace(
          /node-version:\s*['"]?[\d.]+['"]?/g,
          `node-version: '${PROJECT_INFO.nodeVersion}'`
        );
        changed = true;
      }
      
      // Update NODE_VERSION environment variable
      if (content.includes('NODE_VERSION')) {
        content = content.replace(
          /NODE_VERSION[:\s=]+['"]?[\d.]+['"]?/g,
          `NODE_VERSION: '${PROJECT_INFO.nodeVersion}'`
        );
        changed = true;
      }
      
      // Update setup-node version
      if (content.includes('setup-node')) {
        content = content.replace(
          /node-version:\s*['"]?[\d.]+['"]?/g,
          `node-version: '${PROJECT_INFO.nodeVersion}'`
        );
        changed = true;
      }
      
      if (changed) {
        writeFileSync(workflowPath, content);
        updated.push(workflow);
      }
    } catch (e) {
      errors.push({ workflow, error: e.message });
    }
  });
  
  return { updated, errors };
}

function updateNvmrc() {
  const nvmrcPath = join(rootDir, '.nvmrc');
  const updated = [];
  
  if (existsSync(nvmrcPath)) {
    const current = readFileSync(nvmrcPath, 'utf-8').trim();
    if (current !== PROJECT_INFO.nodeVersion) {
      writeFileSync(nvmrcPath, `${PROJECT_INFO.nodeVersion}\n`);
      updated.push(relative(rootDir, nvmrcPath));
    }
  } else {
    writeFileSync(nvmrcPath, `${PROJECT_INFO.nodeVersion}\n`);
    updated.push(relative(rootDir, nvmrcPath));
  }
  
  // Find other .nvmrc files
  try {
    const otherNvmrc = execSync('rg --files .nvmrc', {
      cwd: rootDir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim().split('\n').filter(Boolean);
    
    otherNvmrc.forEach(nvmrcPath => {
      if (nvmrcPath !== join(rootDir, '.nvmrc')) {
        writeFileSync(nvmrcPath, `${PROJECT_INFO.nodeVersion}\n`);
        updated.push(relative(rootDir, nvmrcPath));
      }
    });
  } catch (e) {
    // No other .nvmrc files
  }
  
  return updated;
}

function updateDockerfiles() {
  const dockerfiles = ripgrepSearch('Dockerfile');
  const updated = [];
  
  dockerfiles.forEach(dockerPath => {
    try {
      let content = readFileSync(dockerPath, 'utf-8');
      let changed = false;
      
      // Update FROM node: version
      if (content.includes('FROM node:')) {
        content = content.replace(
          /FROM node:[\d.]+/g,
          `FROM node:${PROJECT_INFO.nodeVersion}-alpine`
        );
        changed = true;
      }
      
      if (changed) {
        writeFileSync(dockerPath, content);
        updated.push(relative(rootDir, dockerPath));
      }
    } catch (e) {
      // Skip errors
    }
  });
  
  return updated;
}

function updateRenderConfigs() {
  const renderConfigs = ripgrepSearch('render.yaml');
  const updated = [];
  
  renderConfigs.forEach(configPath => {
    try {
      let content = readFileSync(configPath, 'utf-8');
      let changed = false;
      
      // Update NODE_VERSION in envVars
      if (content.includes('NODE_VERSION')) {
        content = content.replace(
          /NODE_VERSION[:\s=]+['"]?[\d.]+['"]?/g,
          `NODE_VERSION: "${PROJECT_INFO.nodeVersion}"`
        );
        changed = true;
      }
      
      if (changed) {
        writeFileSync(configPath, content);
        updated.push(relative(rootDir, configPath));
      }
    } catch (e) {
      // Skip errors
    }
  });
  
  return updated;
}

function updateGitLabCI() {
  const ciPath = join(rootDir, '.gitlab-ci.yml');
  if (!existsSync(ciPath)) return { updated: false };
  
  try {
    let content = readFileSync(ciPath, 'utf-8');
    let changed = false;
    
    // Update NODE_VERSION
    if (content.includes('NODE_VERSION')) {
      content = content.replace(
        /NODE_VERSION[:\s=]+['"]?[\d.]+['"]?/g,
        `NODE_VERSION: "${PROJECT_INFO.nodeVersion}"`
      );
      changed = true;
    }
    
    // Update image node: version
    if (content.includes('image: node:')) {
      content = content.replace(
        /image:\s*node:[\d.]+/g,
        `image: node:${PROJECT_INFO.nodeVersion}`
      );
      changed = true;
    }
    
    if (changed) {
      writeFileSync(ciPath, content);
    }
    
    return { updated: changed, path: ciPath };
  } catch (e) {
    return { updated: false, error: e.message };
  }
}

function updatePackageJson() {
  const pkgPath = join(rootDir, 'package.json');
  if (!existsSync(pkgPath)) return { updated: false };
  
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    let updated = false;
    
    // Add/update engines
    if (!pkg.engines) pkg.engines = {};
    if (pkg.engines.node !== `>=${PROJECT_INFO.nodeVersion}.0.0`) {
      pkg.engines.node = `>=${PROJECT_INFO.nodeVersion}.0.0`;
      updated = true;
    }
    
    if (updated) {
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
    
    return { updated, path: pkgPath };
  } catch (e) {
    return { updated: false, error: e.message };
  }
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Update Node Version to ${PROJECT_INFO.nodeVersion}\n`);

  const results = {
    project: PROJECT_INFO,
    nodeVersion: PROJECT_INFO.nodeVersion,
    github: { workflows: {} },
    nvmrc: [],
    dockerfiles: [],
    render: [],
    gitlab: {},
    packageJson: {},
    timestamp: new Date().toISOString()
  };

  // 1. Update GitHub workflows
  console.log('🌿 Step 1: Updating GitHub workflows...');
  const workflows = updateGitHubWorkflows();
  results.github.workflows = workflows;
  console.log(`   ✅ Updated: ${workflows.updated.length} workflows`);
  workflows.updated.forEach(w => {
    console.log(`      - ${w}`);
  });
  if (workflows.errors.length > 0) {
    console.log(`   ⚠️  Errors: ${workflows.errors.length}`);
  }
  console.log('');

  // 2. Update .nvmrc files
  console.log('📝 Step 2: Updating .nvmrc files...');
  const nvmrcFiles = updateNvmrc();
  results.nvmrc = nvmrcFiles;
  console.log(`   ✅ Updated: ${nvmrcFiles.length} .nvmrc files`);
  nvmrcFiles.forEach(f => {
    console.log(`      - ${f}`);
  });
  console.log('');

  // 3. Update Dockerfiles
  console.log('🐳 Step 3: Updating Dockerfiles...');
  const dockerfiles = updateDockerfiles();
  results.dockerfiles = dockerfiles;
  console.log(`   ✅ Updated: ${dockerfiles.length} Dockerfiles`);
  dockerfiles.forEach(f => {
    console.log(`      - ${f}`);
  });
  console.log('');

  // 4. Update Render configs
  console.log('🚀 Step 4: Updating Render configs...');
  const renderConfigs = updateRenderConfigs();
  results.render = renderConfigs;
  console.log(`   ✅ Updated: ${renderConfigs.length} Render configs`);
  renderConfigs.forEach(f => {
    console.log(`      - ${f}`);
  });
  console.log('');

  // 5. Update GitLab CI
  console.log('🌿 Step 5: Updating GitLab CI...');
  const gitlab = updateGitLabCI();
  results.gitlab = gitlab;
  if (gitlab.updated) {
    console.log(`   ✅ Updated: ${relative(rootDir, gitlab.path)}`);
  } else if (gitlab.error) {
    console.log(`   ⚠️  ${gitlab.error}`);
  } else {
    console.log(`   ℹ️  Already up to date`);
  }
  console.log('');

  // 6. Update package.json
  console.log('📦 Step 6: Updating package.json...');
  const pkg = updatePackageJson();
  results.packageJson = pkg;
  if (pkg.updated) {
    console.log(`   ✅ Updated: ${relative(rootDir, pkg.path)}`);
  } else {
    console.log(`   ℹ️  Already up to date`);
  }
  console.log('');

  // 7. Generate report
  const reportPath = join(rootDir, 'node-version-update-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('📊 Summary:');
  console.log(`   🌿 GitHub workflows: ${workflows.updated.length}`);
  console.log(`   📝 .nvmrc files: ${nvmrcFiles.length}`);
  console.log(`   🐳 Dockerfiles: ${dockerfiles.length}`);
  console.log(`   🚀 Render configs: ${renderConfigs.length}`);
  console.log(`   🌿 GitLab CI: ${gitlab.updated ? '✅' : '❌'}`);
  console.log(`   📦 package.json: ${pkg.updated ? '✅' : '❌'}\n`);
  console.log(`📄 Report: ${relative(rootDir, reportPath)}\n`);
  console.log(`✅ Node version updated to ${PROJECT_INFO.nodeVersion} across cathedral-master!\n`);
}

main().catch(console.error);






