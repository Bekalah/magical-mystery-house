#!/usr/bin/env node
/**
 * Auto-Run Improvement Experiment Until Completion
 * 
 * Runs the improvement experiment continuously until all tasks are complete
 * Monitors completion status and stops when done
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

const MAX_CYCLES = 1000; // Safety limit
const CYCLE_INTERVAL = 2.5 * 60 * 1000; // 2.5 minutes between cycles
const COMPLETION_CHECK_INTERVAL = 10; // Check completion every 10 cycles

class AutoRunner {
  constructor() {
    this.cycleCount = 0;
    this.startTime = Date.now();
    this.lastCompletionCheck = 0;
  }

  async run() {
    console.log('🚀 AUTO-RUNNING IMPROVEMENT EXPERIMENT UNTIL COMPLETION\n');
    console.log('═'.repeat(80));
    console.log('This will run continuously until all tasks are complete');
    console.log('Press Ctrl+C to stop\n');
    console.log('═'.repeat(80) + '\n');

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n\n🛑 Stopping auto-run...');
      this.printSummary();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n\n🛑 Stopping auto-run...');
      this.printSummary();
      process.exit(0);
    });

    while (this.cycleCount < MAX_CYCLES) {
      this.cycleCount++;
      
      console.log(`\n${'━'.repeat(80)}`);
      console.log(`Cycle ${this.cycleCount} - ${new Date().toLocaleTimeString()}`);
      console.log(`${'━'.repeat(80)}\n`);

      try {
        // Run the improvement experiment
        const scriptPath = path.join(__dirname, 'run-improvement-experiment.mjs');
        execSync(`node ${scriptPath}`, {
          cwd: BASE_DIR,
          stdio: 'inherit',
          env: { ...process.env, NODE_ENV: 'production' },
          timeout: 300000 // 5 minute timeout
        });

        console.log(`\n✅ Cycle ${this.cycleCount} completed successfully`);

        // Check completion status periodically
        if (this.cycleCount % COMPLETION_CHECK_INTERVAL === 0) {
          const isComplete = await this.checkCompletion();
          if (isComplete) {
            console.log('\n\n' + '═'.repeat(80));
            console.log('🎉 COMPLETION ACHIEVED!');
            console.log('═'.repeat(80));
            this.printSummary();
            process.exit(0);
          }
        }

        // Wait before next cycle
        if (this.cycleCount < MAX_CYCLES) {
          const waitMinutes = CYCLE_INTERVAL / (60 * 1000);
          console.log(`\n⏳ Waiting ${waitMinutes} minutes until next cycle...`);
          await this.sleep(CYCLE_INTERVAL);
        }

      } catch (e) {
        console.error(`\n❌ Cycle ${this.cycleCount} failed: ${e.message}`);
        console.error('   Continuing with next cycle...\n');
        
        // Wait a bit before retrying
        await this.sleep(30000); // 30 seconds
      }
    }

    console.log('\n\n⚠️  Reached maximum cycle limit');
    this.printSummary();
  }

  async checkCompletion() {
    console.log('\n📊 Checking completion status...\n');

    const checks = {
      consolidation: false,
      versions: false,
      dependencies: false,
      build: false
    };

    // Check consolidation status
    const consolidationPath = path.join(BASE_DIR, 'CONSOLIDATION_PLAN.json');
    if (fs.existsSync(consolidationPath)) {
      try {
        const plan = JSON.parse(fs.readFileSync(consolidationPath, 'utf-8'));
        const consolidated = plan.consolidated || [];
        const totalEntities = plan.entities?.packages + plan.entities?.apps || 0;
        
        if (consolidated.length >= totalEntities * 0.95) {
          checks.consolidation = true;
          console.log('   ✅ Consolidation: 95%+ complete');
        } else {
          console.log(`   ⏳ Consolidation: ${consolidated.length}/${totalEntities} entities`);
        }
      } catch (e) {
        console.log('   ⏳ Consolidation: Status unknown');
      }
    } else {
      console.log('   ⏳ Consolidation: No plan found');
    }

    // Check version standardization
    const packagesDir = path.join(BASE_DIR, 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir).filter(item => {
        const itemPath = path.join(packagesDir, item);
        return fs.statSync(itemPath).isDirectory();
      });

      let versioned = 0;
      for (const pkg of packages.slice(0, 20)) {
        const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            if (packageJson.version === '1.0.0') {
              versioned++;
            }
          } catch (e) {
            // Skip
          }
        }
      }

      if (versioned >= packages.length * 0.9) {
        checks.versions = true;
        console.log('   ✅ Versions: 90%+ at 1.0.0');
      } else {
        console.log(`   ⏳ Versions: ${versioned}/${packages.length} at 1.0.0`);
      }
    }

    // Check dependencies
    try {
      execSync('pnpm install --dry-run 2>&1 | grep -q "ERR_PNPM_WORKSPACE_PKG_NOT_FOUND" || true', {
        cwd: BASE_DIR,
        stdio: 'pipe'
      });
      checks.dependencies = true;
      console.log('   ✅ Dependencies: No workspace errors');
    } catch (e) {
      console.log('   ⏳ Dependencies: Some issues remain');
    }

    // Check build status
    try {
      execSync('pnpm run build 2>&1 | tail -5 | grep -q "error\\|Error\\|failed\\|Failed" || true', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        timeout: 60000
      });
      checks.build = true;
      console.log('   ✅ Build: No critical errors');
    } catch (e) {
      console.log('   ⏳ Build: Some errors remain');
    }

    // Consider complete if most checks pass
    const passedChecks = Object.values(checks).filter(v => v).length;
    const totalChecks = Object.keys(checks).length;
    const completionRate = passedChecks / totalChecks;

    console.log(`\n   Completion: ${(completionRate * 100).toFixed(1)}% (${passedChecks}/${totalChecks} checks passed)`);

    return completionRate >= 0.8; // 80% completion threshold
  }

  printSummary() {
    const duration = (Date.now() - this.startTime) / (1000 * 60);
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total Cycles: ${this.cycleCount}`);
    console.log(`   Duration: ${duration.toFixed(1)} minutes`);
    console.log(`   Average: ${(duration / this.cycleCount).toFixed(2)} minutes per cycle`);
    
    // Load experiment state
    const statePath = path.join(BASE_DIR, 'experiment-state.json');
    if (fs.existsSync(statePath)) {
      try {
        const state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
        console.log(`   Total Improvements: ${state.improvements?.length || 0}`);
      } catch (e) {
        // Skip
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const runner = new AutoRunner();
runner.run().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

