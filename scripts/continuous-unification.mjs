#!/usr/bin/env node
/**
 * Continuous Unification Runner
 * 
 * Continuously runs unification tasks with focus on:
 * - Sacred systems unification
 * - Consolidation execution
 * - Fragment merging
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

const UNIFICATION_INTERVAL = 3 * 60 * 1000; // 3 minutes
const MAX_CYCLES = 1000;

class ContinuousUnifier {
  constructor() {
    this.cycleCount = 0;
    this.startTime = Date.now();
    this.unified = [];
  }

  async run() {
    console.log('🔮 CONTINUOUS UNIFICATION RUNNER\n');
    console.log('═'.repeat(80));
    console.log('Focus: Unification of sacred systems and consolidation');
    console.log('Interval: Every 3 minutes');
    console.log('═'.repeat(80) + '\n');

    process.on('SIGINT', () => {
      console.log('\n\n🛑 Stopping unification runner...');
      this.printSummary();
      process.exit(0);
    });

    while (this.cycleCount < MAX_CYCLES) {
      this.cycleCount++;
      
      console.log(`\n${'━'.repeat(80)}`);
      console.log(`Unification Cycle ${this.cycleCount} - ${new Date().toLocaleTimeString()}`);
      console.log(`${'━'.repeat(80)}\n`);

      try {
        // 1. Unify sacred systems
        console.log('🔮 Step 1: Unifying sacred systems...');
        execSync('node scripts/execute-sacred-unification.mjs', {
          cwd: BASE_DIR,
          stdio: 'inherit',
          timeout: 120000
        });
        console.log('   ✅ Sacred systems unified\n');

        // 2. Execute consolidations
        console.log('🔀 Step 2: Executing consolidations...');
        execSync('node scripts/execute-all-consolidations.mjs', {
          cwd: BASE_DIR,
          stdio: 'inherit',
          timeout: 300000
        });
        console.log('   ✅ Consolidations executed\n');

        // 3. Run improvement experiment (includes unification tasks)
        console.log('🚀 Step 3: Running improvement experiment...');
        execSync('node scripts/run-improvement-experiment.mjs', {
          cwd: BASE_DIR,
          stdio: 'inherit',
          timeout: 300000
        });
        console.log('   ✅ Improvement cycle completed\n');

        this.unified.push({
          cycle: this.cycleCount,
          timestamp: new Date().toISOString()
        });

        // Wait before next cycle
        if (this.cycleCount < MAX_CYCLES) {
          const waitMinutes = UNIFICATION_INTERVAL / (60 * 1000);
          console.log(`⏳ Waiting ${waitMinutes} minutes until next unification cycle...\n`);
          await this.sleep(UNIFICATION_INTERVAL);
        }

      } catch (e) {
        console.error(`\n❌ Cycle ${this.cycleCount} failed: ${e.message}`);
        console.error('   Continuing with next cycle...\n');
        await this.sleep(30000); // Wait 30 seconds before retry
      }
    }

    console.log('\n\n⚠️  Reached maximum cycle limit');
    this.printSummary();
  }

  printSummary() {
    const duration = (Date.now() - this.startTime) / (1000 * 60);
    
    console.log('\n' + '═'.repeat(80));
    console.log('📊 UNIFICATION SUMMARY');
    console.log('═'.repeat(80));
    console.log(`Total Cycles: ${this.cycleCount}`);
    console.log(`Duration: ${duration.toFixed(1)} minutes`);
    console.log(`Unified: ${this.unified.length} cycles completed`);
    console.log('═'.repeat(80) + '\n');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const unifier = new ContinuousUnifier();
unifier.run().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

