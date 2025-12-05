#!/usr/bin/env node
/**
 * 3-Hour Comprehensive Run - Master Script
 * 
 * Runs 3-hour experiment with all analysis, debugging, cross-engineering,
 * security, and static hosting setup. Generates comprehensive reports.
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔬 3-HOUR COMPREHENSIVE EXPERIMENT & ANALYSIS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📊 Features:');
console.log('   ✅ Comprehensive analysis across all repos/directories');
console.log('   ✅ Debugging everything');
console.log('   ✅ Cross-engineering improvements');
console.log('   ✅ Security audit and fixes');
console.log('   ✅ Free static hosting setup (Vercel/Netlify/Cloudflare/GitHub Pages)');
console.log('   ✅ Complete learning reports');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Run 3-hour experiment
console.log('🚀 Starting 3-hour experiment...\n');
const experimentProcess = spawn('node', ['scripts/run-3-hour-experiment.mjs'], {
  cwd: rootDir,
  stdio: 'inherit'
});

experimentProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ 3-hour experiment completed!');
    console.log('📊 Generating comprehensive reports...\n');
    
    // Generate all reports
    try {
      const { execSync } = require('child_process');
      
      console.log('📈 Running comprehensive analysis...');
      execSync('node scripts/comprehensive-analysis.mjs', { cwd: rootDir, stdio: 'inherit' });
      
      console.log('\n🔧 Running cross-engineering analysis...');
      execSync('node scripts/cross-engineering-analyzer.mjs', { cwd: rootDir, stdio: 'inherit' });
      
      console.log('\n🔒 Running security audit...');
      execSync('node scripts/security-audit-comprehensive.mjs', { cwd: rootDir, stdio: 'inherit' });
      
      console.log('\n🌐 Setting up static hosting...');
      execSync('node scripts/setup-static-hosting.mjs', { cwd: rootDir, stdio: 'inherit' });
      
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ 3-HOUR COMPREHENSIVE RUN COMPLETE');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('📄 Reports generated in: docs/reports/3-hour/');
      console.log('   - learning-report.md');
      console.log('   - cross-engineering-report.md');
      console.log('   - security-report.md');
      console.log('   - hosting-setup.md\n');
      
    } catch (e) {
      console.error('❌ Error generating reports:', e.message);
    }
  } else {
    console.log(`\n⚠️  Experiment exited with code ${code}`);
  }
});

experimentProcess.on('error', (error) => {
  console.error(`❌ Error running experiment: ${error.message}`);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⚠️  Interrupted - stopping...');
  experimentProcess.kill('SIGTERM');
  process.exit(0);
});

