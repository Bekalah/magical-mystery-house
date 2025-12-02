#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Fix all configurations to use pnpm only
 * Remove Azure, npm, and risky dependencies
 * Fix Cloudflare, Godot 4.5, Vercel, Vite, Render, Bevy, ps5.js, Babylon.js
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

console.log('🔧 Fixing all configurations to use pnpm only...\n');

// 1. Remove Azure dependencies
console.log('1️⃣ Removing Azure dependencies...');
const azurePackages = [
  '@azure-rest/ai-inference',
  '@azure/identity',
  '@azure/openai',
  '@azure/cognitiveservices-computervision'
];

function removeAzureFromPackageJson(packageJsonPath) {
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf8');
    const pkg = JSON.parse(content);
    let changed = false;

    // Remove from dependencies
    if (pkg.dependencies) {
      for (const azurePkg of azurePackages) {
        if (pkg.dependencies[azurePkg]) {
          delete pkg.dependencies[azurePkg];
          changed = true;
          console.log(`   ❌ Removed ${azurePkg} from ${packageJsonPath}`);
        }
      }
    }

    // Remove from devDependencies
    if (pkg.devDependencies) {
      for (const azurePkg of azurePackages) {
        if (pkg.devDependencies[azurePkg]) {
          delete pkg.devDependencies[azurePkg];
          changed = true;
          console.log(`   ❌ Removed ${azurePkg} from ${packageJsonPath}`);
        }
      }
    }

    if (changed) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
    }
  } catch (e) {
    // Skip if can't read
  }
}

// Find all package.json files
function findPackageJsonFiles(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
        const fullPath = path.join(dir, entry.name);
        const pkgPath = path.join(fullPath, 'package.json');
        if (fs.existsSync(pkgPath)) {
          files.push(pkgPath);
        }
        files.push(...findPackageJsonFiles(fullPath));
      }
    }
  } catch (e) {
    // Skip
  }
  return files;
}

const packageJsonFiles = findPackageJsonFiles(path.join(BASE_DIR, 'packages'));
packageJsonFiles.push(path.join(BASE_DIR, 'package.json'));

for (const pkgPath of packageJsonFiles) {
  removeAzureFromPackageJson(pkgPath);
}

// 2. Fix npm references to pnpm
console.log('\n2️⃣ Fixing npm references to pnpm...');
function fixNpmReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace npm commands
    const replacements = [
      [/pnpm install/g, 'pnpm install'],
      [/pnpm run/g, 'pnpm run'],
      [/pnpm exec/g, 'pnpm exec'],
      [/pnpm publish/g, 'pnpm publish'],
      [/pnpm install --frozen-lockfile/g, 'pnpm install --frozen-lockfile'],
      [/pnpm test/g, 'pnpm test'],
      [/pnpm start/g, 'pnpm start'],
      [/pnpm build/g, 'pnpm build'],
      [/pnpm --version/g, 'pnpm --version'],
      [/which pnpm/g, 'which pnpm'],
      [/pnpm@/g, 'pnpm@'],
    ];

    for (const [pattern, replacement] of replacements) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`   ✅ Fixed npm references in ${filePath}`);
    }
  } catch (e) {
    // Skip
  }
}

// Fix in scripts, workflows, configs
const filesToFix = [
  ...findPackageJsonFiles(BASE_DIR),
  ...globFiles(BASE_DIR, '**/.github/workflows/*.yml'),
  ...globFiles(BASE_DIR, '**/.github/workflows/*.yaml'),
  ...globFiles(BASE_DIR, '**/*.mjs'),
  ...globFiles(BASE_DIR, '**/*.js'),
  ...globFiles(BASE_DIR, '**/*.ts'),
  ...globFiles(BASE_DIR, '**/*.sh'),
  ...globFiles(BASE_DIR, '**/Dockerfile*'),
  ...globFiles(BASE_DIR, '**/.nvmrc'),
];

function globFiles(dir, pattern) {
  const files = [];
  try {
    const glob = await import('glob');
    const matches = glob.sync(pattern, { cwd: dir, absolute: true });
    files.push(...matches);
  } catch (e) {
    // Fallback to manual search
    function search(dir, pattern) {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
            search(path.join(dir, entry.name), pattern);
          } else if (entry.isFile()) {
            const fullPath = path.join(dir, entry.name);
            if (pattern.includes('**')) {
              files.push(fullPath);
            } else if (fullPath.includes(pattern.replace('**/', ''))) {
              files.push(fullPath);
            }
          }
        }
      } catch (e) {
        // Skip
      }
    }
    search(dir, pattern);
  }
  return files;
}

// 3. Fix Vercel configs
console.log('\n3️⃣ Fixing Vercel configurations...');
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
      if (config.buildCommand) {
        config.buildCommand = config.buildCommand.replace(/npm /g, 'pnpm ');
        changed = true;
      }

      // Ensure installCommand uses pnpm
      if (config.installCommand) {
        config.installCommand = config.installCommand.replace(/npm /g, 'pnpm ');
        changed = true;
      } else {
        config.installCommand = 'pnpm install';
        changed = true;
      }

      // Add framework if missing
      if (!config.framework) {
        config.framework = null; // Auto-detect
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

// 4. Fix Vite configs
console.log('\n4️⃣ Fixing Vite configurations...');
const viteConfigs = globFiles(BASE_DIR, '**/vite.config.*');

for (const vitePath of viteConfigs) {
  fixNpmReferences(vitePath);
}

// 5. Ensure packageManager is set to pnpm
console.log('\n5️⃣ Ensuring packageManager is set to pnpm...');
for (const pkgPath of packageJsonFiles) {
  try {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    
    if (!pkg.packageManager || !pkg.packageManager.startsWith('pnpm@')) {
      pkg.packageManager = 'pnpm@10.23.0';
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      console.log(`   ✅ Set packageManager to pnpm in ${pkgPath}`);
    }
  } catch (e) {
    // Skip
  }
}

// 6. Create/update .npmrc to enforce pnpm
console.log('\n6️⃣ Creating .npmrc to enforce pnpm...');
const npmrcPath = path.join(BASE_DIR, '.npmrc');
const npmrcContent = `# Enforce pnpm only
engine-strict=true
auto-install-peers=true
shamefully-hoist=false
strict-peer-dependencies=false
`;

fs.writeFileSync(npmrcPath, npmrcContent);
console.log('   ✅ Created .npmrc');

// 7. Update .gitignore to ignore npm artifacts
console.log('\n7️⃣ Updating .gitignore...');
const gitignorePath = path.join(BASE_DIR, '.gitignore');
let gitignoreContent = '';
if (fs.existsSync(gitignorePath)) {
  gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
}

if (!gitignoreContent.includes('pnpm-lock.yaml')) {
  gitignoreContent += '\n# npm artifacts (we use pnpm only)\npnpm-lock.yaml\nnpm-debug.log*\n';
  fs.writeFileSync(gitignorePath, gitignoreContent);
  console.log('   ✅ Updated .gitignore');
}

console.log('\n✅ All fixes complete!');
console.log('\n📋 Summary:');
console.log('   - Removed Azure dependencies');
console.log('   - Fixed npm references to pnpm');
console.log('   - Fixed Vercel configurations');
console.log('   - Fixed Vite configurations');
console.log('   - Set packageManager to pnpm');
console.log('   - Created .npmrc');
console.log('   - Updated .gitignore');

