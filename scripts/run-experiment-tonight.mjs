#!/usr/bin/env node
/**
 * Run Improvement Experiment Tonight
 * 
 * Starts the improvement experiment to run overnight and fix everything
 * Ensures labels are never lost
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const EXPERIMENT_SCRIPT = path.join(__dirname, '10-hour-improvement-experiment.ts');
const LABELS_FILE = path.join(BASE_DIR, 'system-labels.json');
const LABELS_BACKUP = path.join(BASE_DIR, 'system-labels.backup.json');

/**
 * Ensure labels exist before starting
 */
function ensureLabels() {
  console.log('🏷️  Verifying label system...');
  
  // If labels don't exist, create them
  if (!fs.existsSync(LABELS_FILE)) {
    console.log('⚠️  Labels missing! Creating labels...');
    try {
      const { execSync } = require('child_process');
      execSync('node scripts/system-labeler.mjs', {
        cwd: BASE_DIR,
        stdio: 'inherit',
        timeout: 60000
      });
      console.log('✅ Labels created successfully');
    } catch (e) {
      console.error('❌ Failed to create labels:', e.message);
      process.exit(1);
    }
  }
  
  // Backup labels
  if (fs.existsSync(LABELS_FILE)) {
    const labels = fs.readFileSync(LABELS_FILE, 'utf-8');
    fs.writeFileSync(LABELS_BACKUP, labels, 'utf-8');
    console.log('✅ Labels backed up');
  }
  
  // Verify labels are valid
  try {
    const labels = JSON.parse(fs.readFileSync(LABELS_FILE, 'utf-8'));
    if (!labels.summary || labels.summary.labels === 0) {
      console.error('❌ Labels file is empty or invalid!');
      process.exit(1);
    }
    console.log(`✅ Labels verified: ${labels.summary.labels} labels found`);
  } catch (e) {
    console.error('❌ Labels file is corrupted!');
    process.exit(1);
  }
}

/**
 * Run the experiment
 */
function runExperiment() {
  console.log('\n🚀 Starting improvement experiment...');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📋 This will run for 10 hours (240 cycles)');
  console.log('🔧 Fixing all issues found across all repos');
  console.log('🏷️  Labels will be preserved throughout');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  // Use tsx to run TypeScript directly
  let command = 'tsx';
  let args = [EXPERIMENT_SCRIPT];
  
  // Check if tsx is available
  try {
    const { execSync } = require('child_process');
    try {
      execSync('which tsx', { stdio: 'ignore' });
    } catch (e) {
      command = 'npx';
      args = ['tsx', EXPERIMENT_SCRIPT];
    }
  } catch (e) {
    command = 'npx';
    args = ['tsx', EXPERIMENT_SCRIPT];
  }
  
  const child = spawn(command, args, {
    cwd: BASE_DIR,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Handle completion
  child.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ Experiment cycle completed successfully!');
      
      // Final label verification
      ensureLabels();
      
      console.log('\n📊 Cycle Summary:');
      console.log('   - Improvements applied');
      console.log('   - Labels preserved');
      console.log('   - Continuing to next cycle...');
      
      // Continue running - restart experiment
      console.log('\n🔄 Restarting experiment in 10 seconds...');
      setTimeout(() => {
        runExperiment();
      }, 10000);
    } else {
      console.error(`\n❌ Experiment cycle exited with code ${code}`);
      // Still verify labels
      ensureLabels();
      
      // Retry after delay
      console.log('🔄 Retrying in 30 seconds...');
      setTimeout(() => {
        runExperiment();
      }, 30000);
    }
  });
  
  // Handle errors
  child.on('error', (error) => {
    console.error(`❌ Error running experiment: ${error.message}`);
    ensureLabels();
    process.exit(1);
  });
  
  // Setup cleanup
  process.on('SIGINT', () => {
    console.log('\n⚠️  Interrupted - preserving labels...');
    ensureLabels();
    child.kill('SIGTERM');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n⚠️  Terminated - preserving labels...');
    ensureLabels();
    child.kill('SIGTERM');
    process.exit(0);
  });
}

/**
 * Main
 */
async function main() {
  console.log('🌙 Cathedral Improvement Experiment - Tonight Run');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  // Ensure labels exist before starting
  ensureLabels();
  
  // Run experiment
  runExperiment();
}

main().catch((error) => {
  console.error(`❌ Fatal error: ${error.message}`);
  ensureLabels();
  process.exit(1);
});

