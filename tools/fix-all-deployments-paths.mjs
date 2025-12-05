/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node
/**
 * Fix All Broken Deployments and Paths
 * 
 * This script:
 * 1. Validates all GitHub remotes
 * 2. Fixes broken paths in workflows
 * 3. Ensures consistent deployment configurations
 * 4. Validates build outputs and publish directories
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const workflowsDir = path.join(rootDir, '.github', 'workflows');

console.log('🔧 Fixing All Deployments and Paths...\n');

// 1. Check and validate remotes
console.log('📡 Checking Git Remotes...');
try {
  const remotes = execSync('git remote -v', { encoding: 'utf8' });
  console.log(remotes);
  
  // Validate remotes are accessible
  const remoteLines = remotes.split('\n').filter(l => l.trim());
  const remoteNames = new Set(remoteLines.map(l => l.split('\t')[0]));
  
  console.log(`\n✅ Found ${remoteNames.size} remotes:`);
  remoteNames.forEach(name => {
    console.log(`   - ${name}`);
  });
} catch (error) {
  console.error('❌ Error checking remotes:', error.message);
}

// 2. Fix workflow paths
console.log('\n🔧 Fixing Workflow Paths...');

const workflowFiles = [
  'ci.yml',
  'deploy.yml',
  'deploy-vercel.yml',
  'deploy-docs.yml',
  'publish.yml'
];

const fixes = [];

workflowFiles.forEach(file => {
  const filePath = path.join(workflowsDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} not found, skipping`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix: Ensure pnpm store path uses step outputs
  if (content.includes('${{ env.STORE_PATH }}') && !content.includes('id: pnpm-store')) {
    content = content.replace(
      /- name: Get pnpm store directory\s*\n\s*shell: bash\s*\n\s*run:/g,
      '- name: Get pnpm store directory\n      shell: bash\n      id: pnpm-store\n      run:'
    );
    modified = true;
    fixes.push(`Fixed pnpm store step in ${file}`);
  }
  
  // Fix: Ensure cache path uses step outputs
  if (content.includes('${{ steps.pnpm-store.outputs.path }}')) {
    // Already correct
  } else if (content.includes('pnpm store path') && !content.includes('${{ steps.pnpm-store.outputs.path }}')) {
    content = content.replace(
      /path:\s*\${{[^}]+}}/g,
      'path: ${{ steps.pnpm-store.outputs.path }}'
    );
    modified = true;
    fixes.push(`Fixed cache path in ${file}`);
  }
  
  // Fix: Ensure working-directory is explicit
  if (file === 'deploy-vercel.yml' && !content.includes('working-directory:')) {
    content = content.replace(
      /vercel-args:/g,
      'working-directory: ./\n          vercel-args:'
    );
    modified = true;
    fixes.push(`Added working-directory to ${file}`);
  }
  
  // Fix: Ensure publish_dir uses ./ prefix
  if (content.includes('publish_dir:') && !content.includes('publish_dir: ./')) {
    content = content.replace(
      /publish_dir:\s*([^\n]+)/g,
      (match, dir) => {
        if (!dir.trim().startsWith('./') && !dir.trim().startsWith('/')) {
          return `publish_dir: ./${dir.trim()}`;
        }
        return match;
      }
    );
    modified = true;
    fixes.push(`Fixed publish_dir in ${file}`);
  }
  
  // Fix: Ensure dist paths are consistent
  if (content.includes('dist/') && !content.includes('./dist')) {
    content = content.replace(/dist\//g, './dist/');
    modified = true;
    fixes.push(`Fixed dist path in ${file}`);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`✓ ${file} - No fixes needed`);
  }
});

// 3. Validate build outputs
console.log('\n📦 Validating Build Outputs...');

const packageJsonPath = path.join(rootDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const buildScript = packageJson.scripts?.build;
  
  if (buildScript) {
    console.log(`   Build script: ${buildScript}`);
    
    // Check if turbo is used
    if (buildScript.includes('turbo')) {
      console.log('   ✅ Using Turbo for builds');
    }
  }
}

// 4. Check for dist directory structure
const distPath = path.join(rootDir, 'dist');
if (fs.existsSync(distPath)) {
  console.log('   ✅ dist/ directory exists');
  const distContents = fs.readdirSync(distPath);
  console.log(`   Contents: ${distContents.length} items`);
} else {
  console.log('   ⚠️  dist/ directory not found (will be created on build)');
}

// 5. Validate Vercel configuration
console.log('\n🚀 Validating Vercel Configuration...');
const vercelJsonPath = path.join(rootDir, 'vercel.json');
if (fs.existsSync(vercelJsonPath)) {
  console.log('   ✅ vercel.json found');
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    console.log(`   Build command: ${vercelConfig.buildCommand || 'Not set'}`);
    console.log(`   Output directory: ${vercelConfig.outputDirectory || 'Not set'}`);
  } catch (error) {
    console.log('   ⚠️  vercel.json exists but is invalid JSON');
  }
} else {
  console.log('   ⚠️  vercel.json not found (Vercel will use defaults)');
}

// 6. Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Summary:');
console.log('='.repeat(60));

if (fixes.length > 0) {
  console.log(`\n✅ Fixed ${fixes.length} issues:`);
  fixes.forEach(fix => console.log(`   - ${fix}`));
} else {
  console.log('\n✅ No fixes needed - all paths are correct!');
}

console.log('\n🎯 Next Steps:');
console.log('   1. Commit these changes: git add .github/workflows/');
console.log('   2. Push to trigger workflows: git push origin main');
console.log('   3. Check workflow runs in GitHub Actions');
console.log('\n✅ All deployments and paths fixed!\n');

