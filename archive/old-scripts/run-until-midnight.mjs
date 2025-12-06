#!/usr/bin/env node
/**
 * Simple script to run experiment until midnight
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import { execSync } from 'child_process';
import { setTimeout } from 'timers/promises';

(async () => {
  // Calculate midnight
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const midnightTimestamp = midnight.getTime();

  // Load state
  const stateFile = 'experiment-state.json';
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));

  // Set endTime to midnight
  state.endTime = midnightTimestamp;

  // Save state
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));

  // Stop any running experiment
  try {
    execSync('pkill -f "10-hour-improvement-experiment"', { stdio: 'ignore' });
    await setTimeout(2000);
  } catch (e) {
    // Ignore if no process running
    await setTimeout(1000);
  }

  // Start experiment
  const logFile = 'experiment-until-midnight.log';
  execSync(`node scripts/10-hour-improvement-experiment.ts > ${logFile} 2>&1 &`, {
    cwd: process.cwd(),
    stdio: 'inherit'
  });

  // Show status
  const now = Date.now();
  const minutesLeft = Math.round((midnightTimestamp - now) / 60000);
  const cyclesLeft = Math.floor(minutesLeft / 3);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ EXPERIMENT RUNNING UNTIL MIDNIGHT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Current cycle: ${state.currentCycle}`);
  console.log(`   End time: ${new Date(midnightTimestamp).toLocaleString()}`);
  console.log(`   Minutes remaining: ${minutesLeft}`);
  console.log(`   Estimated cycles: ${cyclesLeft}`);
  console.log(`   Log: ${logFile}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
})();

