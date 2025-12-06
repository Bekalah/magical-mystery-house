#!/usr/bin/env node

/**
 * Fix Node.js version consistency across all packages
 * Standardizes engine versions to >=20.18.0 for consistency
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Target consistent engine versions
const TARGET_NODE_VERSION = '>=20.18.0';
const TARGET_PNPM_VERSION = '>=8.15.0';

async function findPackageJsonFiles() {
  const packagesDir = join(__dirname, '../packages');
  const packages = await readdir(packagesDir);
  const packageJsons = [];

  for (const package of packages) {
    const packageJsonPath = join(packagesDir, package, 'package.json');
    try {
      const content = await readFile(packageJsonPath, 'utf8');
      packageJsons.push({ path: packageJsonPath, content, name: package });
    } catch (error) {
      // Skip if package.json doesn't exist
      continue;
    }
  }

  return packageJsons;
}

function updateEngines(content) {
  try {
    const packageJson = JSON.parse(content);
    
    // Initialize engines if it doesn't exist
    if (!packageJson.engines) {
      packageJson.engines = {};
    }

    // Update Node.js version
    packageJson.engines.node = TARGET_NODE_VERSION;
    
    // Update PNPM version if it exists
    if (packageJson.engines.pnpm) {
      packageJson.engines.pnpm = TARGET_PNPM_VERSION;
    } else {
      packageJson.engines.pnpm = TARGET_PNPM_VERSION;
    }

    return JSON.stringify(packageJson, null, 2) + '\n';
  } catch (error) {
    console.error(`Error parsing package.json: ${error.message}`);
    return content;
  }
}

async function main() {
  console.log('🔧 Fixing Node.js version consistency across all packages...\n');

  const packageJsons = await findPackageJsonFiles();
  let updated = 0;

  for (const { path, content, name } of packageJsons) {
    const updatedContent = updateEngines(content);
    
    if (updatedContent !== content) {
      await writeFile(path, updatedContent, 'utf8');
      console.log(`✅ Updated ${name}`);
      updated++;
    } else {
      console.log(`⏭️  Skipped ${name} (already consistent)`);
    }
  }

  console.log(`\n🎉 Successfully updated ${updated} package(s)`);
  console.log(`📊 All packages now use Node.js ${TARGET_NODE_VERSION}`);
}

main().catch(console.error);