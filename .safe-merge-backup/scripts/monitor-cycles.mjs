#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Monitor and report on each cycle as experiment runs
 * Shows what happened in each cycle, improvements generated, and current status
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const STATE_FILE = path.join(BASE_DIR, 'experiment-state.json');
const LOG_FILE = path.join(BASE_DIR, 'IMPROVEMENT_EXPERIMENT_LOG.json');
const ALL_DAY_LOG = path.join(BASE_DIR, 'experiment-all-day.log');
const PID_FILE = path.join(BASE_DIR, 'experiment-all-day.pid');

let lastCycle = 0;
let lastImprovementCount = 0;

/**
 * Read experiment state
 */
function readState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    }
  } catch (e) {
    // State file doesn't exist or can't be read
  }
  return null;
}

/**
 * Check if experiment is running
 */
function isRunning() {
  if (!fs.existsSync(PID_FILE)) {
    return false;
  }
  try {
    const pid = parseInt(fs.readFileSync(PID_FILE, 'utf-8').trim());
    try {
      process.kill(pid, 0); // Check if process exists
      return true;
    } catch (e) {
      return false;
    }
  } catch (e) {
    return false;
  }
}

/**
 * Get new improvements since last check
 */
function getNewImprovements(state, lastCount) {
  if (!state || !state.improvements) {
    return [];
  }
  return state.improvements.slice(lastCount);
}

/**
 * Format cycle report
 */
function formatCycleReport(state, newImprovements, isNewCycle) {
  const timestamp = new Date().toISOString();
  const cycle = state?.currentCycle || 0;
  const totalCycles = state?.totalCycles || 240;
  const totalImprovements = state?.improvements?.length || 0;
  const progress = ((cycle / totalCycles) * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(60));
  console.log(`📊 CYCLE REPORT - ${timestamp}`);
  console.log('='.repeat(60));
  
  if (isNewCycle) {
    console.log(`\n🔄 NEW CYCLE DETECTED: Cycle ${cycle} / ${totalCycles} (${progress}%)`);
  } else {
    console.log(`\n📊 CURRENT STATUS: Cycle ${cycle} / ${totalCycles} (${progress}%)`);
  }
  
  console.log(`\n✨ Total Improvements: ${totalImprovements}`);
  
  if (newImprovements.length > 0) {
    console.log(`\n🆕 New Improvements This Cycle: ${newImprovements.length}`);
    console.log('\n📝 Latest Improvements:');
    newImprovements.slice(-5).forEach((imp, i) => {
      const desc = imp.description || imp;
      const shortDesc = desc.length > 70 ? desc.substring(0, 70) + '...' : desc;
      console.log(`   ${i + 1}. ${shortDesc}`);
    });
  } else {
    console.log('\n⏳ No new improvements yet this cycle...');
  }
  
  // Show special activities
  if (cycle % 10 === 0 && cycle > 0) {
    console.log('\n🏥 Special Activity: Health Map & Debug Report Generation');
  }
  if (cycle % 15 === 0 && cycle > 0) {
    console.log('\n🔍 Special Activity: Competitive Research');
  }
  if (cycle % 20 === 0 && cycle > 0) {
    console.log('\n🔧 Special Activity: Codex Debugging & Orchestration Validation');
  }
  if (cycle % 8 === 0 && cycle > 0) {
    console.log('\n🎨 Special Activity: Unified Codex Mode Transition');
  }
  
  // Show time info
  if (state?.startTime) {
    const startTime = new Date(state.startTime);
    const elapsed = Date.now() - state.startTime;
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    console.log(`\n⏱️  Elapsed Time: ${hours}h ${minutes}m`);
    console.log(`   Started: ${startTime.toISOString()}`);
  }
  
  // Show process status
  const running = isRunning();
  if (running) {
    try {
      const pid = parseInt(fs.readFileSync(PID_FILE, 'utf-8').trim());
      console.log(`\n✅ Experiment Status: Running (PID: ${pid})`);
    } catch (e) {
      console.log(`\n✅ Experiment Status: Running`);
    }
  } else {
    console.log(`\n⚠️  Experiment Status: Not running`);
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

/**
 * Monitor cycles
 */
function monitorCycle() {
  const state = readState();
  const currentCycle = state?.currentCycle || 0;
  const currentImprovementCount = state?.improvements?.length || 0;
  
  const isNewCycle = currentCycle > lastCycle;
  const newImprovements = getNewImprovements(state, lastImprovementCount);
  
  if (isNewCycle || newImprovements.length > 0) {
    formatCycleReport(state, newImprovements, isNewCycle);
    lastCycle = currentCycle;
    lastImprovementCount = currentImprovementCount;
  } else {
    // Still show status even if no change
    if (state) {
      formatCycleReport(state, [], false);
    } else {
      console.log('\n⏳ Waiting for experiment to start...\n');
    }
  }
}

/**
 * Continuous monitoring
 */
function startMonitoring(intervalSeconds = 30) {
  console.log('🔍 Starting Cycle Monitor...');
  console.log(`   Checking every ${intervalSeconds} seconds`);
  console.log('   Press Ctrl+C to stop\n');
  
  // Initial check
  monitorCycle();
  
  // Set up interval
  const interval = setInterval(() => {
    monitorCycle();
  }, intervalSeconds * 1000);
  
  // Cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n\n👋 Stopping monitor...\n');
    clearInterval(interval);
    process.exit(0);
  });
}

/**
 * Single check
 */
function singleCheck() {
  monitorCycle();
}

/**
 * Main
 */
const args = process.argv.slice(2);
if (args.includes('--watch') || args.includes('-w')) {
  const interval = parseInt(args[args.indexOf('--watch') + 1] || args[args.indexOf('-w') + 1] || '30');
  startMonitoring(interval);
} else {
  singleCheck();
}

