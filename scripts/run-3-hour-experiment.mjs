#!/usr/bin/env node
/**
 * 3-Hour Comprehensive Experiment Runner
 * 
 * Runs unified experiment for exactly 3 hours with comprehensive
 * analysis, debugging, cross-engineering, security, and reporting.
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

const EXPERIMENT_SCRIPT = path.join(__dirname, '10-hour-improvement-experiment.ts');
const STATE_FILE = path.join(rootDir, 'experiment-state.json');
const THREE_HOURS_MS = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

/**
 * Set experiment to run for 3 hours
 */
function configure3HourRun() {
  console.log('⏰ Configuring 3-hour experiment run...\n');
  
  let state = {
    startTime: Date.now(),
    endTime: Date.now() + THREE_HOURS_MS,
    currentCycle: 0,
    totalCycles: 60, // 3 hours / 3 minutes per cycle = 60 cycles
    improvements: [],
    errors: [],
    systemsScanned: [],
    packagesImproved: [],
    connectionsEstablished: 0,
    magnumOpus: {
      auditsRun: 0,
      licensingFixed: 0,
      packagesCompleted: 0,
      lastAuditCycle: 0
    },
    fixTracking: {
      totalFixAttempts: 0,
      epipeErrors: 0,
      fixCategories: {},
      lastFixCycle: 0,
      repeatedFixes: []
    },
    cycleComparison: {
      cyclesCompared: 0,
      verifiedImprovements: [],
      falsePositives: [],
      lastComparisonCycle: 0
    }
  };
  
  // Always start fresh for 3-hour run
  const now = Date.now();
  state = {
    startTime: now,
    endTime: now + THREE_HOURS_MS, // Set 3 hours from now
    currentCycle: 0,
    totalCycles: 60,
    improvements: [],
    errors: [],
    systemsScanned: [],
    packagesImproved: [],
    connectionsEstablished: 0,
    magnumOpus: {
      auditsRun: 0,
      licensingFixed: 0,
      packagesCompleted: 0,
      lastAuditCycle: 0
    },
    fixTracking: {
      totalFixAttempts: 0,
      epipeErrors: 0,
      fixCategories: {},
      lastFixCycle: 0,
      repeatedFixes: []
    },
    cycleComparison: {
      cyclesCompared: 0,
      verifiedImprovements: [],
      falsePositives: [],
      lastComparisonCycle: 0
    }
  };
  
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
  console.log(`✅ Experiment configured for 3 hours (${state.totalCycles} cycles)`);
  console.log(`   Start: ${new Date(state.startTime).toLocaleString()}`);
  console.log(`   End: ${new Date(state.endTime).toLocaleString()}\n`);
}

/**
 * Run the experiment
 */
function runExperiment() {
  console.log('🚀 Starting 3-hour comprehensive experiment...\n');
  
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
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  child.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ 3-hour experiment completed successfully!');
    } else {
      console.log(`\n⚠️  Experiment exited with code ${code}`);
    }
  });
  
  child.on('error', (error) => {
    console.error(`❌ Error running experiment: ${error.message}`);
    process.exit(1);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n⚠️  Interrupted - stopping experiment...');
    child.kill('SIGTERM');
    process.exit(0);
  });
}

// Main execution
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔬 3-HOUR COMPREHENSIVE EXPERIMENT');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

configure3HourRun();
runExperiment();

