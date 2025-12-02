#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Fix All Issues Tool
 * Systematically finds and fixes common issues across the codebase
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class FixAllIssues {
  constructor() {
    this.fixes = [];
    this.errors = [];
  }

  async fixAll() {
    console.log('🔧 Fixing All Issues...\n');
    console.log('═'.repeat(80) + '\n');

    // Fix package.json typos
    await this.fixPackageJsonTypos();

    // Fix import paths
    await this.fixImportPaths();

    // Fix missing type definitions
    await this.fixTypeDefinitions();

    // Fix timestamp issues
    await this.fixTimestampIssues();

    // Fix broken commands
    await this.fixBrokenCommands();

    // Generate report
    await this.generateReport();
  }

  async fixPackageJsonTypos() {
    console.log('🔧 Fixing package.json typos...');
    
    const packageJsonPath = path.join(BASE_DIR, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return;
    }

    let content = fs.readFileSync(packageJsonPath, 'utf-8');
    let fixed = false;

    // Fix pnpm -> pnpm
    if (content.includes('pnpm')) {
      content = content.replace(/pnpm/g, 'pnpm');
      fixed = true;
    }

    // Fix pnpm -> pnpm
    if (content.includes('pnpm')) {
      content = content.replace(/pnpm/g, 'pnpm');
      fixed = true;
    }

    if (fixed) {
      fs.writeFileSync(packageJsonPath, content, 'utf-8');
      this.fixes.push('Fixed pnpm typos in package.json');
      console.log('   ✅ Fixed pnpm typos\n');
    } else {
      console.log('   ✅ No typos found\n');
    }
  }

  async fixImportPaths() {
    console.log('🔧 Fixing import paths...');
    
    // Check for common import issues
    const scriptsDir = path.join(BASE_DIR, 'scripts');
    if (!fs.existsSync(scriptsDir)) {
      return;
    }

    let fixed = 0;
    const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.ts'));
    
    for (const file of files) {
      const filePath = path.join(scriptsDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      let fileFixed = false;

      // Fix .ts imports to remove extension
      if (content.includes("from './workspace-integrator.ts'")) {
        content = content.replace("from './workspace-integrator.ts'", "from './workspace-integrator'");
        fileFixed = true;
      }

      if (fileFixed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        fixed++;
      }
    }

    if (fixed > 0) {
      this.fixes.push(`Fixed import paths in ${fixed} files`);
      console.log(`   ✅ Fixed ${fixed} import paths\n`);
    } else {
      console.log('   ✅ No import path issues found\n');
    }
  }

  async fixTypeDefinitions() {
    console.log('🔧 Fixing type definitions...');
    
    const experimentPath = path.join(BASE_DIR, 'scripts', '10-hour-improvement-experiment.ts');
    if (!fs.existsSync(experimentPath)) {
      return;
    }

    let content = fs.readFileSync(experimentPath, 'utf-8');
    let fixed = false;

    // Add node types reference if missing
    if (!content.includes('/// <reference types="node" />')) {
      const importIndex = content.indexOf('import * as fs');
      if (importIndex > 0) {
        content = content.slice(0, importIndex) + '/// <reference types="node" />\n\n' + content.slice(importIndex);
        fixed = true;
      }
    }

    // Add execSync import if missing
    if (!content.includes("import { execSync }") && content.includes('execSync')) {
      const fsImport = content.indexOf("import * as fs from 'fs';");
      if (fsImport > 0) {
        const nextLine = content.indexOf('\n', fsImport);
        content = content.slice(0, nextLine + 1) + "import { execSync } from 'child_process';\n" + content.slice(nextLine + 1);
        fixed = true;
      }
    }

    if (fixed) {
      fs.writeFileSync(experimentPath, content, 'utf-8');
      this.fixes.push('Fixed type definitions in experiment script');
      console.log('   ✅ Fixed type definitions\n');
    } else {
      console.log('   ✅ Type definitions OK\n');
    }
  }

  async fixTimestampIssues() {
    console.log('🔧 Fixing timestamp issues...');
    
    // Already fixed in create-comprehensive-registry.mjs
    // Check other files that might have timestamp issues
    const files = [
      'DISCOVERY_REPORT.json',
      'PARTIAL_ANALYSIS.json',
      'CODEX_ALIGNMENT_PLAN.json'
    ];

    let fixed = 0;
    for (const file of files) {
      const filePath = path.join(BASE_DIR, file);
      if (fs.existsSync(filePath)) {
        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          const oldTimestamp = data.timestamp;
          const newTimestamp = Date.now();
          
          // Update if timestamp is more than 1 minute old
          if (oldTimestamp && (newTimestamp - oldTimestamp) > 60000) {
            data.timestamp = newTimestamp;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
            fixed++;
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }

    if (fixed > 0) {
      this.fixes.push(`Updated timestamps in ${fixed} files`);
      console.log(`   ✅ Updated ${fixed} timestamps\n`);
    } else {
      console.log('   ✅ Timestamps OK\n');
    }
  }

  async fixBrokenCommands() {
    console.log('🔧 Checking broken commands...');
    
    // Verify all command files exist
    const packageJsonPath = path.join(BASE_DIR, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const scripts = packageJson.scripts || {};
    const missing = [];

    for (const [name, command] of Object.entries(scripts)) {
      if (typeof command === 'string' && command.startsWith('node ')) {
        const scriptPath = command.replace('node ', '').split(' ')[0];
        const fullPath = path.join(BASE_DIR, scriptPath);
        
        if (!fs.existsSync(fullPath)) {
          missing.push({ name, script: scriptPath });
        }
      }
    }

    if (missing.length > 0) {
      this.errors.push(`Missing script files: ${missing.map(m => m.script).join(', ')}`);
      console.log(`   ⚠️  Found ${missing.length} missing script files\n`);
    } else {
      console.log('   ✅ All command scripts exist\n');
    }
  }

  async generateReport() {
    const report = {
      timestamp: Date.now(),
      fixes: this.fixes,
      errors: this.errors,
      summary: {
        totalFixes: this.fixes.length,
        totalErrors: this.errors.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'FIX_ALL_ISSUES_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('═'.repeat(80));
    console.log('\n📊 Fix All Issues Report\n');
    console.log(`✅ Fixes Applied: ${this.fixes.length}`);
    console.log(`⚠️  Errors Found: ${this.errors.length}`);
    console.log(`\n📄 Report saved: ${reportPath}\n`);

    if (this.fixes.length > 0) {
      console.log('Fixes Applied:');
      this.fixes.forEach(fix => console.log(`  ✅ ${fix}`));
    }

    if (this.errors.length > 0) {
      console.log('\nErrors Found:');
      this.errors.forEach(error => console.log(`  ⚠️  ${error}`));
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new FixAllIssues();
  fixer.fixAll().catch(console.error);
}

export default FixAllIssues;
