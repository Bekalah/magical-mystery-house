#!/usr/bin/env node
/**
 * Run Magnum Opus Experiment - All Night
 * 
 * Runs the 10-hour improvement experiment with Magnum Opus focus:
 * - Comprehensive audits
 * - Licensing fixes (CC0-1.0 Public Domain)
 * - Package completion
 * - Open source readiness
 * 
 * @license CC0-1.0 - Public Domain
 */

import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const EXPERIMENT_SCRIPT = path.join(BASE_DIR, 'scripts', '10-hour-improvement-experiment.ts');

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

async function runExperiment() {
  log('🏛️  Starting Magnum Opus Experiment - All Night Run');
  log('═'.repeat(80));
  log('');
  log('Features:');
  log('  - Comprehensive audits every 5 cycles');
  log('  - Auto-fix licensing (CC0-1.0 Public Domain)');
  log('  - Complete incomplete packages');
  log('  - Generate missing components');
  log('  - Open source readiness');
  log('');
  log('Running for 10 hours (240 cycles)...');
  log('');

  // Run initial audit before starting
  try {
    log('📊 Running initial comprehensive audit...');
    const { execSync } = await import('child_process');
    execSync('node tools/comprehensive-audit-system.mjs', {
      cwd: BASE_DIR,
      stdio: 'inherit',
      timeout: 180000
    });
    log('✅ Initial audit complete');
  } catch (e) {
    log(`⚠️  Initial audit had issues: ${e.message}`);
  }

  // Spawn the experiment
  log('🚀 Starting improvement experiment...');
  log('');

  // Use pnpm dlx to run tsx (or fallback to npx if needed)
  const experiment = spawn('pnpm', ['dlx', 'tsx', EXPERIMENT_SCRIPT], {
    cwd: BASE_DIR,
    stdio: 'inherit',
    shell: false
  });

  experiment.on('error', (error) => {
    log(`❌ Experiment error: ${error.message}`);
    process.exit(1);
  });

  experiment.on('exit', (code) => {
    if (code === 0) {
      log('');
      log('✅ Magnum Opus Experiment Complete!');
      log('');
      log('📊 Final Results:');
      log('  - Check IMPROVEMENT_EXPERIMENT_LOG.json');
      log('  - Check improvements-summary.md');
      log('  - Check COMPREHENSIVE_AUDIT.json');
      log('');
    } else {
      log(`⚠️  Experiment exited with code: ${code}`);
    }
    process.exit(code || 0);
  });

  // Handle signals
  process.on('SIGINT', () => {
    log('');
    log('⚠️  Received SIGINT - stopping experiment...');
    experiment.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    log('');
    log('⚠️  Received SIGTERM - stopping experiment...');
    experiment.kill('SIGTERM');
    process.exit(0);
  });
}

// Run
runExperiment().catch((error) => {
  log(`❌ Fatal error: ${error.message}`);
  process.exit(1);
});

