#!/usr/bin/env node
/**
 * Monitor experiment progress and stop after 300 cycles
 * @license CC0-1.0
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const STATE_FILE = 'experiment-state.json';
const TARGET_CYCLES = 300;
const START_CYCLE = JSON.parse(readFileSync(STATE_FILE, 'utf8')).currentCycle || 467;
const TARGET_CYCLE = START_CYCLE + TARGET_CYCLES;

console.log(`📊 Monitoring experiment: ${START_CYCLE} → ${TARGET_CYCLE} (${TARGET_CYCLES} cycles)`);
console.log(`⏱️  Estimated time: ${(TARGET_CYCLES * 2.5 / 60).toFixed(1)} hours`);

let lastCycle = START_CYCLE;
let checkCount = 0;

const checkProgress = () => {
  try {
    const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    const currentCycle = state.currentCycle || START_CYCLE;
    const improvements = state.improvements?.length || 0;
    
    if (currentCycle !== lastCycle) {
      const progress = ((currentCycle - START_CYCLE) / TARGET_CYCLES * 100).toFixed(1);
      console.log(`\n📈 Cycle ${currentCycle}/${TARGET_CYCLE} (${progress}% complete)`);
      console.log(`   Improvements: ${improvements}`);
      lastCycle = currentCycle;
    }
    
    if (currentCycle >= TARGET_CYCLE) {
      console.log(`\n✅ Reached target cycle ${TARGET_CYCLE}!`);
      console.log(`🛑 Stopping experiment...`);
      
      try {
        execSync('pkill -f "10-hour-improvement-experiment"', { stdio: 'ignore' });
        console.log(`✅ Experiment stopped`);
        return true;
      } catch (e) {
        console.log(`⚠️  Could not stop experiment (may have already stopped)`);
        return true;
      }
    }
    
    checkCount++;
    if (checkCount % 20 === 0) {
      const elapsed = checkCount * 30; // 30 second checks
      console.log(`⏳ Still running... (checked ${checkCount} times, ~${Math.floor(elapsed/60)} min elapsed)`);
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error checking progress: ${error.message}`);
    return false;
  }
};

// Check every 30 seconds
const interval = setInterval(() => {
  if (checkProgress()) {
    clearInterval(interval);
    process.exit(0);
  }
}, 30000);

// Also check immediately
checkProgress();

