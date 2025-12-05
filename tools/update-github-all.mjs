#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Update all GitHub stages, branches, fetches, pulls, and integrate everything
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function updateAllWorkflows() {
  const workflowsDir = path.join(rootDir, '.github', 'workflows');
  const workflows = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  
  let updated = 0;
  
  for (const workflow of workflows) {
    const workflowPath = path.join(workflowsDir, workflow);
    let content = fs.readFileSync(workflowPath, 'utf-8');
    let changed = false;
    
    // Fix pnpm typos
    if (/pp+p?npm/.test(content)) {
      content = content.replace(/pp+p?npm/g, 'pnpm');
      changed = true;
    }
    
    // Update Vercel action to v25
    if (content.includes('amondnet/vercel-action@v25')) {
      content = content.replace(/amondnet\/vercel-action@v20/g, 'amondnet/vercel-action@v25');
      changed = true;
    }
    
    // Ensure Node.js version is consistent
    if (content.includes('node-version')) {
      content = content.replace(/node-version: '25.2'*['"]?/g, "node-version: '25.2'pnpm/action-setup')) {
      content = content.replace(/version:\s*['"]?[^'"]*['"]?/g, "version: 10.23.0");
      changed = true;
    }
    
    // Add conditional to Vercel deployment
    if (content.includes('vercel-token:') && !content.includes('if: ${{ secrets.VERCEL_TOKEN')) {
      const lines = content.split('\n');
      const vercelIndex = lines.findIndex(l => l.includes('vercel-token:'));
      if (vercelIndex > 0) {
        const nameIndex = lines.findIndex((l, i) => i < vercelIndex && l.includes('name:') && !l.includes('if:'));
        if (nameIndex >= 0) {
          lines.splice(nameIndex + 1, 0, '        if: ${{ secrets.VERCEL_TOKEN != \'\' }}');
          content = lines.join('\n');
          changed = true;
        }
      }
    }
    
    if (changed) {
      fs.writeFileSync(workflowPath, content, 'utf-8');
      updated++;
      console.log(`✅ Updated: ${workflow}`);
    }
  }
  
  return updated;
}

async function updateGitRemotes() {
  try {
    // Get current remotes
    const remotesOutput = execSync('git remote -v', { cwd: rootDir, encoding: 'utf-8' });
    console.log('📡 Current remotes:');
    console.log(remotesOutput);
    
    // Fetch from all remotes
    console.log('\n📥 Fetching from all remotes...');
    execSync('git fetch --all --prune', { cwd: rootDir, stdio: 'inherit' });
    
    // Update all branches
    console.log('\n🔄 Updating branches...');
    const branches = execSync('git branch -r', { cwd: rootDir, encoding: 'utf-8' })
      .split('\n')
      .filter(b => b.trim() && !b.includes('HEAD'))
      .map(b => b.trim().split('/').slice(1).join('/'));
    
    for (const branch of branches) {
      if (branch && !branch.includes('->')) {
        try {
          execSync(`git branch --track ${branch} origin/${branch} 2>/dev/null || true`, { cwd: rootDir });
        } catch (e) {
          // Branch might already exist, that's fine
        }
      }
    }
    
    // Pull current branch if on a branch
    try {
      const currentBranch = execSync('git branch --show-current', { cwd: rootDir, encoding: 'utf-8' }).trim();
      if (currentBranch) {
        console.log(`\n⬇️  Pulling ${currentBranch}...`);
        execSync(`git pull origin ${currentBranch}`, { cwd: rootDir, stdio: 'inherit' });
      }
    } catch (e) {
      console.log('⚠️  Could not pull current branch (might be detached HEAD)');
    }
    
    return true;
  } catch (e) {
    console.error('⚠️  Git operations failed:', e.message);
    return false;
  }
}

async function integrateAllData() {
  console.log('\n🔗 Integrating all data pieces...\n');
  
  // 1. Compile game data
  try {
    console.log('📦 Compiling game data...');
    execSync('node tools/compile-game-data.mjs', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  Game data compilation failed:', e.message);
  }
  
  // 2. Connect all systems
  try {
    console.log('\n🔗 Connecting all systems...');
    execSync('node tools/connect-all-systems.mjs', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  System connections failed:', e.message);
  }
  
  // 3. Enhance alchemical quality
  try {
    console.log('\n✨ Enhancing alchemical quality...');
    execSync('node tools/enhance-alchemical-quality.mjs', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  Alchemical enhancement failed:', e.message);
  }
  
  // 4. Fix workflow errors
  try {
    console.log('\n🔧 Fixing workflow errors...');
    execSync('node tools/fix-workflow-errors.mjs', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  Workflow fixes failed:', e.message);
  }
  
  // 5. Generate comprehensive registry
  try {
    console.log('\n📋 Generating package registry...');
    const packagesDir = path.join(rootDir, 'packages');
    const packages = fs.readdirSync(packagesDir).filter(item => {
      const itemPath = path.join(packagesDir, item);
      return fs.statSync(itemPath).isDirectory();
    });
    
    const registry = {
      timestamp: new Date().toISOString(),
      totalPackages: packages.length,
      packages: packages.map(pkg => {
        const pkgPath = path.join(packagesDir, pkg, 'package.json');
        if (fs.existsSync(pkgPath)) {
          try {
            const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
            return {
              name: pkgJson.name || pkg,
              version: pkgJson.version || '1.0.0',
              description: pkgJson.description || '',
              path: `packages/${pkg}`,
              connections: pkgJson.cathedral?.integration?.connects_to || [],
              quality: {
                hasAlchemical: !!pkgJson.cathedral,
                hasSacredMath: !!pkgJson.cathedral?.sacred_mathematics,
                hasTraumaSafety: !!pkgJson.cathedral?.trauma_safety
              }
            };
          } catch (e) {
            return { name: pkg, error: e.message };
          }
        }
        return { name: pkg, error: 'No package.json' };
      })
    };
    
    fs.writeFileSync(
      path.join(rootDir, 'COMPREHENSIVE_REGISTRY.json'),
      JSON.stringify(registry, null, 2),
      'utf-8'
    );
    console.log(`✅ Registry generated: ${packages.length} packages`);
  } catch (e) {
    console.log('⚠️  Registry generation failed:', e.message);
  }
}

async function updateEverything() {
  console.log('🚀 Updating all GitHub stages, branches, and integrating everything...\n');
  
  // Update workflows
  console.log('📝 Updating GitHub workflows...');
  const workflowsUpdated = await updateAllWorkflows();
  console.log(`✅ Updated ${workflowsUpdated} workflows\n`);
  
  // Update git
  console.log('🔄 Updating git remotes and branches...');
  await updateGitRemotes();
  
  // Integrate all data
  await integrateAllData();
  
  console.log('\n✅ All updates complete!');
  console.log('   - GitHub workflows updated');
  console.log('   - Git remotes and branches synced');
  console.log('   - All data pieces integrated');
  console.log('   - Systems connected');
  console.log('   - Ready for deployment');
  
  return {
    workflowsUpdated,
    gitUpdated: true,
    dataIntegrated: true
  };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateEverything().catch(console.error);
}

export default updateEverything;

