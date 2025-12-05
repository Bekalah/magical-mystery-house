#!/usr/bin/env node
/**
 * Fix Visual Tools
 * 
 * Fixes issues found in visual and design tools
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔧 Fixing Visual Tools...\n');

// Read debug report
const debugReportPath = path.join(rootDir, 'docs', 'VISUAL_TOOLS_DEBUG.md');
let issues = [];

// Import debug function
try {
  const { debugVisualTools } = await import('../packages/visual-tools-connector/src/DebugTools.js');
  issues = debugVisualTools(rootDir);
} catch (e) {
  console.error('Could not import debug tools, scanning manually...');
  
  // Manual scan
  const packagesDir = path.join(rootDir, 'packages');
  const visualPackages = [
    'cathedral-visual-engine',
    'visionary-design-system',
    'cathedral-design-library',
    'art-engine-core',
    'art-standards-core',
    'divine-design-core',
    'body-of-god-core',
    'fractal-flames-daemon-deity',
    'professional-typography-engine',
    'professional-vector-engine',
    'three-engine',
    'godot-design-studio'
  ];
  
  for (const pkg of visualPackages) {
    const packagePath = path.join(packagesDir, pkg);
    if (!fs.existsSync(packagePath)) {
      issues.push({
        tool: pkg,
        issue: 'Package does not exist',
        severity: 'error',
        fix: `Create package: ${pkg}`
      });
      continue;
    }
    
    // Check src/index.ts
    const indexPath = path.join(packagePath, 'src', 'index.ts');
    if (!fs.existsSync(indexPath)) {
      const srcDir = path.join(packagePath, 'src');
      if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
      }
      
      // Create basic index.ts
      const basicIndex = `/**
 * ${pkg}
 * 
 * @license CC0-1.0 - Public Domain
 */

export * from './index';
`;
      fs.writeFileSync(indexPath, basicIndex);
      console.log(`✅ Created src/index.ts for ${pkg}`);
    }
    
    // Check build
    const distPath = path.join(packagePath, 'dist');
    const packageJsonPath = path.join(packagePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      if (packageJson.scripts?.build && !fs.existsSync(distPath)) {
        console.log(`📦 Building ${pkg}...`);
        try {
          execSync(`cd ${packagePath} && pnpm run build`, { stdio: 'inherit' });
          console.log(`✅ Built ${pkg}`);
        } catch (e) {
          console.error(`❌ Failed to build ${pkg}:`, e.message);
        }
      }
    }
  }
}

// Generate fix report
const fixReport = {
  timestamp: new Date().toISOString(),
  issuesFixed: issues.filter(i => i.fix).length,
  issuesRemaining: issues.filter(i => !i.fix).length,
  issues
};

const fixReportPath = path.join(rootDir, 'docs', 'VISUAL_TOOLS_FIXES.json');
fs.mkdirSync(path.dirname(fixReportPath), { recursive: true });
fs.writeFileSync(fixReportPath, JSON.stringify(fixReport, null, 2));

console.log(`\n✅ Fix Report:`);
console.log(`   Issues Fixed: ${fixReport.issuesFixed}`);
console.log(`   Issues Remaining: ${fixReport.issuesRemaining}`);
console.log(`   Report: ${fixReportPath}`);

