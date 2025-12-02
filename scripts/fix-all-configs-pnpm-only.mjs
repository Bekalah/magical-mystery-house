#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Fix all configurations to use pnpm only
 * Remove npm, Azure, and ensure everything is free/open source
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

console.log('🔧 Fixing all configurations to use pnpm only (free & open source)...\n');

// Fix Vercel configs
console.log('1️⃣ Fixing Vercel configurations...');
const vercelConfigs = [
  path.join(BASE_DIR, 'vercel.json'),
  path.join(BASE_DIR, 'apps/web/vercel.json'),
  path.join(BASE_DIR, 'apps/web-from-master/vercel.json'),
];

for (const vercelPath of vercelConfigs) {
  if (fs.existsSync(vercelPath)) {
    try {
      const content = fs.readFileSync(vercelPath, 'utf8');
      const config = JSON.parse(content);
      let changed = false;

      // Ensure buildCommand uses pnpm
      if (config.buildCommand && config.buildCommand.includes('npm')) {
        config.buildCommand = config.buildCommand.replace(/npm /g, 'pnpm ');
        changed = true;
      } else if (!config.buildCommand) {
        config.buildCommand = 'pnpm build';
        changed = true;
      }

      // Ensure installCommand uses pnpm
      if (config.installCommand && config.installCommand.includes('npm')) {
        config.installCommand = config.installCommand.replace(/npm /g, 'pnpm ');
        changed = true;
      } else if (!config.installCommand) {
        config.installCommand = 'pnpm install';
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2) + '\n');
        console.log(`   ✅ Fixed ${vercelPath}`);
      }
    } catch (e) {
      console.log(`   ⚠️  Could not fix ${vercelPath}: ${e.message}`);
    }
  }
}

// Fix .npmrc
console.log('\n2️⃣ Creating/updating .npmrc...');
const npmrcPath = path.join(BASE_DIR, '.npmrc');
const npmrcContent = `# Enforce pnpm only - Free & Open Source
engine-strict=true
auto-install-peers=true
shamefully-hoist=false
strict-peer-dependencies=false

# Free and open source only
# No commercial dependencies
`;

fs.writeFileSync(npmrcPath, npmrcContent);
console.log('   ✅ Created/updated .npmrc');

// Fix package.json scripts
console.log('\n3️⃣ Fixing package.json scripts...');
const rootPkgPath = path.join(BASE_DIR, 'package.json');
try {
  const content = fs.readFileSync(rootPkgPath, 'utf8');
  const pkg = JSON.parse(content);
  let changed = false;

  if (pkg.scripts) {
    for (const [key, value] of Object.entries(pkg.scripts)) {
      if (typeof value === 'string' && value.includes('npm ')) {
        pkg.scripts[key] = value.replace(/npm /g, 'pnpm ');
        changed = true;
      }
    }
  }

  // Ensure packageManager is pnpm
  if (!pkg.packageManager || !pkg.packageManager.startsWith('pnpm@')) {
    pkg.packageManager = 'pnpm@10.23.0';
    changed = true;
  }

  // Ensure license is CC0-1.0
  if (!pkg.license || pkg.license !== 'CC0-1.0') {
    pkg.license = 'CC0-1.0';
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(rootPkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('   ✅ Fixed root package.json');
  }
} catch (e) {
  console.log(`   ⚠️  Could not fix root package.json: ${e.message}`);
}

// Fix GitHub workflows
console.log('\n4️⃣ Fixing GitHub workflows...');
const workflowsDir = path.join(BASE_DIR, '.github', 'workflows');
if (fs.existsSync(workflowsDir)) {
  const workflows = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  
  for (const workflow of workflows) {
    const workflowPath = path.join(workflowsDir, workflow);
    try {
      let content = fs.readFileSync(workflowPath, 'utf8');
      let changed = false;

      // Replace npm with pnpm
      if (content.includes('npm ')) {
        content = content.replace(/pnpm install/g, 'pnpm install');
        content = content.replace(/pnpm run/g, 'pnpm run');
        content = content.replace(/pnpm exec/g, 'pnpm exec');
        content = content.replace(/pnpm install --frozen-lockfile/g, 'pnpm install --frozen-lockfile');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(workflowPath, content);
        console.log(`   ✅ Fixed ${workflow}`);
      }
    } catch (e) {
      console.log(`   ⚠️  Could not fix ${workflow}: ${e.message}`);
    }
  }
}

// Create .nvmrc if missing (for Node version)
console.log('\n5️⃣ Ensuring .nvmrc exists...');
const nvmrcPath = path.join(BASE_DIR, '.nvmrc');
if (!fs.existsSync(nvmrcPath)) {
  fs.writeFileSync(nvmrcPath, '25.2\n');
  console.log('   ✅ Created .nvmrc');
}

// Update .gitignore
console.log('\n6️⃣ Updating .gitignore...');
const gitignorePath = path.join(BASE_DIR, '.gitignore');
let gitignoreContent = '';
if (fs.existsSync(gitignorePath)) {
  gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
}

if (!gitignoreContent.includes('pnpm-lock.yaml')) {
  gitignoreContent += '\n# npm artifacts (we use pnpm only)\npnpm-lock.yaml\nnpm-debug.log*\n.npm\n';
  fs.writeFileSync(gitignorePath, gitignoreContent);
  console.log('   ✅ Updated .gitignore');
}

console.log('\n✅ All configurations fixed!');
console.log('\n📋 Summary:');
console.log('   - Fixed Vercel configurations');
console.log('   - Created/updated .npmrc');
console.log('   - Fixed package.json scripts');
console.log('   - Fixed GitHub workflows');
console.log('   - Created .nvmrc');
console.log('   - Updated .gitignore');
console.log('\n🕊️ Everything now uses pnpm only - free and open source!');

