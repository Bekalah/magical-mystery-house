#!/usr/bin/env node
/**
 * Build All Visual Tools
 * 
 * Builds all visual and design tools
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const VISUAL_TOOLS = [
  'cathedral-visual-engine',
  'visionary-design-system',
  'divine-design-core',
  'body-of-god-core',
  'art-engine-core',
  'art-standards-core',
  'professional-typography-engine',
  'professional-vector-engine',
  'three-engine',
  'visual-tools-connector'
];

console.log('🔨 Building All Visual Tools...\n');

const results = {
  success: [],
  failed: [],
  skipped: []
};

for (const tool of VISUAL_TOOLS) {
  const toolPath = path.join(rootDir, 'packages', tool);
  
  if (!fs.existsSync(toolPath)) {
    results.skipped.push(tool);
    console.log(`⏭️  Skipped: ${tool} (not found)`);
    continue;
  }
  
  const packageJsonPath = path.join(toolPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    results.skipped.push(tool);
    console.log(`⏭️  Skipped: ${tool} (no package.json)`);
    continue;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  if (!packageJson.scripts?.build) {
    results.skipped.push(tool);
    console.log(`⏭️  Skipped: ${tool} (no build script)`);
    continue;
  }
  
  console.log(`📦 Building: ${tool}...`);
  try {
    execSync(`cd ${toolPath} && pnpm run build`, { 
      stdio: 'inherit',
      timeout: 60000 
    });
    results.success.push(tool);
    console.log(`✅ Built: ${tool}\n`);
  } catch (e) {
    results.failed.push({ tool, error: e.message });
    console.log(`❌ Failed: ${tool} - ${e.message}\n`);
  }
}

console.log('\n📊 Build Summary:');
console.log(`✅ Success: ${results.success.length}`);
console.log(`❌ Failed: ${results.failed.length}`);
console.log(`⏭️  Skipped: ${results.skipped.length}`);

if (results.failed.length > 0) {
  console.log('\n❌ Failed Builds:');
  for (const { tool, error } of results.failed) {
    console.log(`  - ${tool}: ${error}`);
  }
}

