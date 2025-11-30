#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Keep improvement experiment running all day
 * Auto-restarts on failure, continuous operation
 */

import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const EXPERIMENT_SCRIPT = path.join(__dirname, '10-hour-improvement-experiment.ts');
const LOG_FILE = path.join(BASE_DIR, 'experiment-all-day.log');
const PID_FILE = path.join(BASE_DIR, 'experiment-all-day.pid');
const STATE_FILE = path.join(BASE_DIR, 'experiment-state.json');

let cycleCount = 0;
let isRunning = false;
let currentProcess = null;

/**
 * Log message
 */
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(LOG_FILE, logMessage, 'utf-8');
}

/**
 * Save PID
 */
function savePID() {
  fs.writeFileSync(PID_FILE, process.pid.toString(), 'utf-8');
  log(`✅ PID saved: ${process.pid}`);
}

/**
 * Remove PID file
 */
function removePID() {
  if (fs.existsSync(PID_FILE)) {
    fs.unlinkSync(PID_FILE);
  }
}

/**
 * Check if experiment is already running
 */
function checkRunning() {
  if (fs.existsSync(PID_FILE)) {
    try {
      const oldPID = parseInt(fs.readFileSync(PID_FILE, 'utf-8').trim());
      try {
        process.kill(oldPID, 0); // Check if process exists
        log(`⚠️  Experiment already running (PID: ${oldPID})`);
        return true;
      } catch (e) {
        // Process doesn't exist, remove stale PID file
        log(`⚠️  Stale PID file found, removing...`);
        removePID();
      }
    } catch (e) {
      removePID();
    }
  }
  return false;
}

/**
 * Run experiment
 */
async function runExperiment() {
  if (isRunning) {
    log('⚠️  Experiment already running, skipping...');
    return;
  }

  cycleCount++;
  isRunning = true;
  log(`🚀 Starting experiment cycle ${cycleCount}...`);

  // Use tsx directly (no build needed)
  let command = 'tsx';
  let args = [EXPERIMENT_SCRIPT];
  
  // Check if tsx is available, if not try npx tsx
  try {
    const { execSync } = await import('child_process');
    try {
      execSync('which tsx', { stdio: 'ignore' });
    } catch (e) {
      // Try npx tsx
      command = 'npx';
      args = ['tsx', EXPERIMENT_SCRIPT];
    }
  } catch (e) {
    // Fallback to npx tsx
    command = 'npx';
    args = ['tsx', EXPERIMENT_SCRIPT];
  }

  // Spawn experiment process
  const child = spawn(command, args, {
    cwd: BASE_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'production' }
  });

  currentProcess = child;

  // Log stdout
  child.stdout.on('data', (data) => {
    const output = data.toString();
    fs.appendFileSync(LOG_FILE, output, 'utf-8');
  });

  // Log stderr
  child.stderr.on('data', (data) => {
    const output = data.toString();
    fs.appendFileSync(LOG_FILE, output, 'utf-8');
  });

  // Handle completion
  child.on('close', (code) => {
    currentProcess = null;
    isRunning = false;
    
    if (code === 0) {
      log(`✅ Cycle ${cycleCount} completed successfully`);
      
      // Read state to see progress
      if (fs.existsSync(STATE_FILE)) {
        try {
          const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
          log(`📊 Progress: Cycle ${state.currentCycle || 0} / ${state.totalCycles || 240}`);
          log(`✨ Total improvements: ${state.improvements?.length || 0}`);
        } catch (e) {
          // Couldn't read state
        }
      }
      
      // Continue to next cycle (experiment runs for 10 hours, so this will restart after completion)
      log('🔄 Starting next cycle in 60 seconds...');
      setTimeout(runExperiment, 60000);
    } else {
      log(`❌ Cycle ${cycleCount} failed with code ${code}`);
      log('🔄 Retrying in 60 seconds...');
      setTimeout(runExperiment, 60000);
    }
  });

  // Handle errors
  child.on('error', (error) => {
    log(`❌ Error starting experiment: ${error.message}`);
    isRunning = false;
    currentProcess = null;
    setTimeout(runExperiment, 60000); // Retry in 60 seconds
  });
}

/**
 * Cleanup on exit
 */
function cleanup() {
  log('⚠️  Received shutdown signal, cleaning up...');
  
  if (currentProcess) {
    log('🛑 Stopping experiment process...');
    currentProcess.kill('SIGTERM');
  }
  
  removePID();
  log('✅ Cleanup complete');
  process.exit(0);
}

// Setup signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('uncaughtException', (error) => {
  log(`❌ Uncaught exception: ${error.message}`);
  // Don't exit - keep running
});

process.on('unhandledRejection', (reason) => {
  log(`❌ Unhandled rejection: ${reason}`);
  // Don't exit - keep running
});

/**
 * Main function
 */
async function main() {
  log('🚀 Starting Cathedral Improvement Experiment - All Day Mode');
  log('============================================================');
  log('');

  // Check if already running
  if (checkRunning()) {
    log('⚠️  Experiment already running, exiting...');
    process.exit(1);
  }

  // Save PID
  savePID();

  // Start first cycle
  log('✅ Starting continuous experiment loop...');
  log(`📝 Log file: ${LOG_FILE}`);
  log(`🆔 PID file: ${PID_FILE}`);
  log('');

  runExperiment();

  // Keep process alive
  setInterval(() => {
    // Heartbeat - just keep process alive
    if (!isRunning && !currentProcess) {
      // If not running and no process, try to start
      runExperiment();
    }
  }, 300000); // Check every 5 minutes
}

// Run
main().catch((error) => {
  log(`❌ Fatal error: ${error.message}`);
  log('🔄 Will retry in 60 seconds...');
  setTimeout(main, 60000);
});

