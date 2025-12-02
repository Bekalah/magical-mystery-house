#!/usr/bin/env node
/**
 * Run Improvement Experiment All Night
 * 
 * Runs the improvement experiment continuously throughout the night
 * with automatic recovery and progress tracking
 * 
 * @license CC0-1.0 - Public Domain
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

// Configuration
const NIGHT_DURATION_HOURS = 8; // Run for 8 hours (adjust as needed)
const CYCLE_INTERVAL_MINUTES = 5; // Run experiment every 5 minutes
const MAX_CYCLES = Math.floor((NIGHT_DURATION_HOURS * 60) / CYCLE_INTERVAL_MINUTES);
const LOG_FILE = path.join(BASE_DIR, 'NIGHT_RUN_LOG.json');

console.log('🌙 Starting All-Night Improvement Experiment Run\n');
console.log('═'.repeat(80));
console.log(`Duration: ${NIGHT_DURATION_HOURS} hours`);
console.log(`Cycle interval: ${CYCLE_INTERVAL_MINUTES} minutes`);
console.log(`Max cycles: ${MAX_CYCLES}`);
console.log(`Log file: ${LOG_FILE}`);
console.log('═'.repeat(80) + '\n');

// Initialize log
let nightLog = {
  startTime: new Date().toISOString(),
  endTime: null,
  totalCycles: 0,
  successfulCycles: 0,
  failedCycles: 0,
  cycles: []
};

function saveLog() {
  try {
    fs.writeFileSync(LOG_FILE, JSON.stringify(nightLog, null, 2));
  } catch (e) {
    console.error('⚠️  Could not save log:', e.message);
  }
}

// Save initial log
saveLog();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Received interrupt signal...');
  nightLog.endTime = new Date().toISOString();
  saveLog();
  console.log('📝 Log saved. Exiting gracefully.');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Received termination signal...');
  nightLog.endTime = new Date().toISOString();
  saveLog();
  console.log('📝 Log saved. Exiting gracefully.');
  process.exit(0);
});

// Run cycles
let cycleCount = 0;
const startTime = Date.now();

async function runCycle(cycleNumber) {
  const cycleStart = Date.now();
  console.log(`\n${'━'.repeat(80)}`);
  console.log(`Cycle ${cycleNumber} of ${MAX_CYCLES} - ${new Date().toLocaleTimeString()}`);
  console.log(`${'━'.repeat(80)}\n`);
  
  const cycleLog = {
    cycle: cycleNumber,
    startTime: new Date().toISOString(),
    endTime: null,
    success: false,
    duration: 0,
    error: null
  };
  
  try {
    // Run the improvement experiment
    const scriptPath = path.join(__dirname, 'run-improvement-experiment.mjs');
    
    execSync(`node ${scriptPath}`, {
      cwd: BASE_DIR,
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' },
      timeout: (CYCLE_INTERVAL_MINUTES - 1) * 60 * 1000 // Leave 1 minute buffer
    });
    
    cycleLog.success = true;
    cycleLog.endTime = new Date().toISOString();
    cycleLog.duration = Date.now() - cycleStart;
    nightLog.successfulCycles++;
    
    console.log(`\n✅ Cycle ${cycleNumber} completed successfully (${(cycleLog.duration / 1000).toFixed(1)}s)`);
  } catch (e) {
    cycleLog.success = false;
    cycleLog.endTime = new Date().toISOString();
    cycleLog.duration = Date.now() - cycleStart;
    cycleLog.error = e.message || 'Unknown error';
    nightLog.failedCycles++;
    
    console.error(`\n❌ Cycle ${cycleNumber} failed: ${cycleLog.error}`);
    console.error('   Continuing with next cycle...');
  }
  
  nightLog.cycles.push(cycleLog);
  nightLog.totalCycles = cycleNumber;
  saveLog();
  
  return cycleLog.success;
}

// Main loop
async function runAllNight() {
  console.log('🚀 Starting continuous run...\n');
  
  for (let i = 1; i <= MAX_CYCLES; i++) {
    cycleCount = i;
    
    // Check if we've exceeded time limit
    const elapsedHours = (Date.now() - startTime) / (1000 * 60 * 60);
    if (elapsedHours >= NIGHT_DURATION_HOURS) {
      console.log(`\n⏰ Time limit reached (${elapsedHours.toFixed(1)} hours). Stopping.`);
      break;
    }
    
    // Run cycle
    await runCycle(i);
    
    // Wait before next cycle (except for last cycle)
    if (i < MAX_CYCLES) {
      const waitSeconds = CYCLE_INTERVAL_MINUTES * 60;
      const waitMinutes = Math.floor(waitSeconds / 60);
      const waitSecs = waitSeconds % 60;
      
      console.log(`\n⏳ Waiting ${waitMinutes}m ${waitSecs}s until next cycle...`);
      console.log(`   Next cycle will start at approximately ${new Date(Date.now() + waitSeconds * 1000).toLocaleTimeString()}`);
      
      // Sleep in smaller chunks to allow for interrupt handling
      const chunkSize = 10000; // 10 seconds
      const chunks = Math.floor(waitSeconds * 1000 / chunkSize);
      const remainder = (waitSeconds * 1000) % chunkSize;
      
      for (let chunk = 0; chunk < chunks; chunk++) {
        await new Promise(resolve => setTimeout(resolve, chunkSize));
      }
      if (remainder > 0) {
        await new Promise(resolve => setTimeout(resolve, remainder));
      }
    }
  }
  
  // Final summary
  nightLog.endTime = new Date().toISOString();
  const totalDuration = (Date.now() - startTime) / (1000 * 60 * 60);
  
  console.log('\n\n' + '═'.repeat(80));
  console.log('🌅 All-Night Run Complete');
  console.log('═'.repeat(80));
  console.log(`Total cycles: ${nightLog.totalCycles}`);
  console.log(`Successful: ${nightLog.successfulCycles}`);
  console.log(`Failed: ${nightLog.failedCycles}`);
  console.log(`Total duration: ${totalDuration.toFixed(2)} hours`);
  console.log(`Success rate: ${((nightLog.successfulCycles / nightLog.totalCycles) * 100).toFixed(1)}%`);
  console.log('═'.repeat(80));
  
  saveLog();
  console.log(`\n📝 Final log saved to: ${LOG_FILE}`);
}

// Start the run
runAllNight().catch(e => {
  console.error('❌ Fatal error:', e);
  nightLog.endTime = new Date().toISOString();
  saveLog();
  process.exit(1);
});

