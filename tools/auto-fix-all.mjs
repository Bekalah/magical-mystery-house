#!/usr/bin/env node
/**
 * Auto-Fix All - Continuous Automatic Fixing
 * 
 * Runs all improvement tools continuously until 100% completion
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class AutoFixAll {
  constructor() {
    this.cycle = 0;
    this.maxCycles = 1000; // Run up to 1000 cycles
    this.targetCompletion = 100; // Target 100% completion
  }

  async run() {
    console.log('🤖 AUTO-FIX ALL - CONTINUOUS AUTOMATIC FIXING\n');
    console.log('═'.repeat(80) + '\n');
    console.log('🎯 Target: 100% Completion\n');
    console.log('🔄 Running continuous fix cycles...\n');

    let lastComplete = 0;
    let stalledCycles = 0;

    while (this.cycle < this.maxCycles) {
      this.cycle++;
      console.log(`\n🔄 Cycle ${this.cycle}...`);

      // Run all fix tools
      await this.runFixCycle();

      // Check progress
      const progress = await this.checkProgress();
      
      if (progress.complete >= this.targetCompletion) {
        console.log('\n🎉 100% COMPLETION ACHIEVED!\n');
        break;
      }

      // Check if we're making progress
      if (progress.complete === lastComplete) {
        stalledCycles++;
        if (stalledCycles > 10) {
          console.log('\n⚠️  Progress stalled, but continuing...\n');
          stalledCycles = 0;
        }
      } else {
        stalledCycles = 0;
        lastComplete = progress.complete;
      }

      // Show progress
      console.log(`📊 Progress: ${progress.complete}% Complete (${progress.completeCount}/${progress.total} entities)`);
      
      // Wait a bit between cycles
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Final report
    await this.generateFinalReport();
  }

  async runFixCycle() {
    try {
      // 1. Fix licensing
      execSync('node tools/fix-licensing.mjs', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        timeout: 120000
      });
    } catch (e) {
      // Continue on error
    }

    try {
      // 2. Complete packages
      execSync('node tools/completion-helper.mjs', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        timeout: 180000
      });
    } catch (e) {
      // Continue on error
    }

    try {
      // 3. Organize and merge
      execSync('node tools/organize-and-merge-all.mjs', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        timeout: 180000
      });
    } catch (e) {
      // Continue on error
    }

    try {
      // 4. Fix all issues
      execSync('node tools/fix-all-issues.mjs', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        timeout: 60000
      });
    } catch (e) {
      // Continue on error
    }

    // Every 10 cycles, run audit
    if (this.cycle % 10 === 0) {
      try {
        execSync('node tools/comprehensive-audit-system.mjs', {
          cwd: BASE_DIR,
          stdio: 'pipe',
          timeout: 180000
        });
      } catch (e) {
        // Continue on error
      }
    }
  }

  async checkProgress() {
    const auditPath = path.join(BASE_DIR, 'COMPREHENSIVE_AUDIT.json');
    if (!fs.existsSync(auditPath)) {
      return { complete: 0, completeCount: 0, total: 0 };
    }

    try {
      const audit = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));
      const total = audit.completion.complete.length + 
                   audit.completion.partial.length + 
                   audit.completion.incomplete.length + 
                   audit.completion.needsWork.length;
      const complete = audit.completion.complete.length;
      const pct = total > 0 ? ((complete / total) * 100).toFixed(1) : 0;

      return {
        complete: parseFloat(pct),
        completeCount: complete,
        total: total
      };
    } catch (e) {
      return { complete: 0, completeCount: 0, total: 0 };
    }
  }

  async generateFinalReport() {
    const progress = await this.checkProgress();
    
    const report = {
      timestamp: Date.now(),
      cycles: this.cycle,
      finalProgress: progress,
      status: progress.complete >= this.targetCompletion ? 'complete' : 'continuing'
    };

    const reportPath = path.join(BASE_DIR, 'AUTO_FIX_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 AUTO-FIX REPORT\n');
    console.log(`✅ Cycles Run: ${this.cycle}`);
    console.log(`📊 Final Progress: ${progress.complete}% Complete`);
    console.log(`📄 Report saved: ${reportPath}\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const autoFix = new AutoFixAll();
  autoFix.run().catch(console.error);
}

export default AutoFixAll;

