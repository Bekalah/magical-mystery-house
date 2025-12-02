#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Run improvement experiment 25 times in a row
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

console.log('🚀 Running improvement experiment 25 times in a row...\n');

const results = [];
const startTime = Date.now();

for (let i = 1; i <= 25; i++) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Cycle ${i} of 25`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const cycleStart = Date.now();
  let success = false;
  let error = null;
  
  try {
    execSync('node scripts/run-improvement-experiment.mjs', {
      cwd: BASE_DIR,
      stdio: 'inherit',
      timeout: 300000 // 5 minute timeout per cycle
    });
    success = true;
    console.log(`\n✅ Cycle ${i} completed successfully\n`);
  } catch (e) {
    error = e.message;
    console.log(`\n⚠️  Cycle ${i} had issues: ${error}\n`);
  }
  
  const cycleDuration = Date.now() - cycleStart;
  
  results.push({
    cycle: i,
    success,
    duration: cycleDuration,
    error: error || null,
    timestamp: new Date().toISOString()
  });
  
  // Small delay between cycles
  if (i < 25) {
    console.log('⏸️  Pausing 2 seconds before next cycle...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

const totalDuration = Date.now() - startTime;

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ All 25 cycles complete!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const successful = results.filter(r => r.success).length;
const failed = results.filter(r => !r.success).length;
const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / results.length;

console.log('📊 Summary:');
console.log(`   Total cycles: 25`);
console.log(`   Successful: ${successful}`);
console.log(`   Failed: ${failed}`);
console.log(`   Success rate: ${((successful / 25) * 100).toFixed(2)}%`);
console.log(`   Total duration: ${(totalDuration / 1000 / 60).toFixed(2)} minutes`);
console.log(`   Average per cycle: ${(avgDuration / 1000).toFixed(2)} seconds\n`);

// Save results
const resultsPath = path.join(BASE_DIR, '25-cycles-results.json');
fs.writeFileSync(resultsPath, JSON.stringify({
  summary: {
    totalCycles: 25,
    successful,
    failed,
    successRate: ((successful / 25) * 100).toFixed(2) + '%',
    totalDuration,
    avgDuration
  },
  cycles: results
}, null, 2));

console.log(`📝 Results saved to: 25-cycles-results.json\n`);

