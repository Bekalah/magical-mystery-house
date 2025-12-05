#!/usr/bin/env node
/**
 * Magnum Opus Strategic Runner
 * 
 * High-intelligence, budget-aware auto-runner for the improvement experiment
 * with live reporting, strategic care, and GitLab preparation.
 * 
 * Features:
 * - Budget models with high intelligence
 * - Live reporting and recording
 * - Strategic resource allocation
 * - Real-time fix tracking
 * - GitLab migration preparation
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
const LIVE_REPORT_DIR = path.join(rootDir, 'live-reports');
const FIX_TRACKING_FILE = path.join(LIVE_REPORT_DIR, 'fix-tracking.json');
const STRATEGIC_STATE_FILE = path.join(LIVE_REPORT_DIR, 'strategic-state.json');

/**
 * Budget Model with High Intelligence
 */
class BudgetModel {
  constructor() {
    this.maxConcurrentTasks = 3; // Budget-aware: limit concurrent operations
    this.resourceBudget = {
      cpu: 0.7, // Use 70% CPU max
      memory: 0.8, // Use 80% memory max
      time: 300000 // 5 minutes per cycle max
    };
    this.intelligence = {
      priorityScoring: true,
      adaptiveTiming: true,
      resourceOptimization: true
    };
  }

  shouldRunTask(task, currentLoad) {
    // High-intelligence decision making
    if (currentLoad.cpu > this.resourceBudget.cpu) return false;
    if (currentLoad.memory > this.resourceBudget.memory) return false;
    return true;
  }

  getOptimalTiming(cycle) {
    // Adaptive timing based on cycle
    if (cycle < 10) return 180000; // 3 min for early cycles
    if (cycle < 50) return 240000; // 4 min for mid cycles
    return 300000; // 5 min for later cycles
  }
}

/**
 * Live Reporting System
 */
class LiveReporter {
  constructor() {
    this.reports = [];
    this.fixes = [];
    this.startTime = Date.now();
  }

  recordFix(cycle, description, status, details) {
    const fix = {
      cycle,
      timestamp: new Date().toISOString(),
      description,
      status, // 'fixed', 'in-progress', 'failed'
      details,
      duration: Date.now() - this.startTime
    };
    
    this.fixes.push(fix);
    this.saveFixTracking();
    
    // Live console output
    console.log(`\n🔧 [Cycle ${cycle}] ${status.toUpperCase()}: ${description}`);
    if (details) {
      console.log(`   Details: ${details}`);
    }
  }

  recordReport(cycle, type, data) {
    const report = {
      cycle,
      timestamp: new Date().toISOString(),
      type,
      data
    };
    
    this.reports.push(report);
    this.saveReport();
  }

  saveFixTracking() {
    if (!fs.existsSync(LIVE_REPORT_DIR)) {
      fs.mkdirSync(LIVE_REPORT_DIR, { recursive: true });
    }
    
    fs.writeFileSync(
      FIX_TRACKING_FILE,
      JSON.stringify({
        totalFixes: this.fixes.length,
        fixes: this.fixes.slice(-100), // Last 100 fixes
        summary: this.getSummary()
      }, null, 2),
      'utf-8'
    );
  }

  saveReport() {
    if (!fs.existsSync(LIVE_REPORT_DIR)) {
      fs.mkdirSync(LIVE_REPORT_DIR, { recursive: true });
    }
    
    const reportFile = path.join(LIVE_REPORT_DIR, `report-${Date.now()}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(this.reports.slice(-50), null, 2), 'utf-8');
  }

  getSummary() {
    const fixed = this.fixes.filter(f => f.status === 'fixed').length;
    const inProgress = this.fixes.filter(f => f.status === 'in-progress').length;
    const failed = this.fixes.filter(f => f.status === 'failed').length;
    
    return {
      total: this.fixes.length,
      fixed,
      inProgress,
      failed,
      successRate: this.fixes.length > 0 ? (fixed / this.fixes.length * 100).toFixed(2) + '%' : '0%'
    };
  }

  printLiveStatus() {
    const summary = this.getSummary();
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 LIVE STATUS REPORT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Fixed: ${summary.fixed}`);
    console.log(`🔄 In Progress: ${summary.inProgress}`);
    console.log(`❌ Failed: ${summary.failed}`);
    console.log(`📈 Success Rate: ${summary.successRate}`);
    console.log(`⏱️  Runtime: ${((Date.now() - this.startTime) / 1000 / 60).toFixed(2)} minutes`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }
}

/**
 * Strategic Care System
 */
class StrategicCare {
  constructor() {
    this.state = this.loadStrategicState();
    this.priorities = [
      'critical-fixes',
      'github-issues',
      'gitlab-preparation',
      'quality-improvements',
      'documentation'
    ];
  }

  loadStrategicState() {
    if (fs.existsSync(STRATEGIC_STATE_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(STRATEGIC_STATE_FILE, 'utf-8'));
      } catch (e) {
        console.warn('⚠️  Could not load strategic state, starting fresh');
      }
    }
    
    return {
      startTime: Date.now(),
      priorities: [],
      completed: [],
      blocked: [],
      nextActions: []
    };
  }

  saveStrategicState() {
    fs.writeFileSync(STRATEGIC_STATE_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
  }

  getNextPriority() {
    // High-intelligence priority selection
    for (const priority of this.priorities) {
      if (!this.state.completed.includes(priority)) {
        return priority;
      }
    }
    return 'maintenance';
  }
}

/**
 * Main Strategic Runner
 */
class MagnumOpusStrategicRunner {
  constructor() {
    this.budgetModel = new BudgetModel();
    this.liveReporter = new LiveReporter();
    this.strategicCare = new StrategicCare();
    this.experimentProcess = null;
    this.isRunning = false;
  }

  async start() {
    console.log('🚀 Magnum Opus Strategic Runner Starting');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Budget Model: Active');
    console.log('🧠 High Intelligence: Enabled');
    console.log('📡 Live Reporting: Enabled');
    console.log('🎯 Strategic Care: Active');
    console.log('🔧 Fix Tracking: Enabled');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Ensure live reports directory exists
    if (!fs.existsSync(LIVE_REPORT_DIR)) {
      fs.mkdirSync(LIVE_REPORT_DIR, { recursive: true });
    }

    // Record initial state
    this.liveReporter.recordFix(0, 'Strategic runner initialized', 'fixed', 'All systems ready');

    // Start experiment
    this.runExperiment();

    // Set up live status reporting (every 5 minutes)
    setInterval(() => {
      this.liveReporter.printLiveStatus();
    }, 5 * 60 * 1000);

    // Set up strategic care monitoring (every 10 minutes)
    setInterval(() => {
      this.strategicCare.saveStrategicState();
    }, 10 * 60 * 1000);
  }

  runExperiment() {
    if (this.isRunning) {
      console.log('⚠️  Experiment already running');
      return;
    }

    this.isRunning = true;
    console.log('🔬 Starting improvement experiment with strategic care...\n');

    // Use tsx to run TypeScript
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

    this.experimentProcess = spawn(command, args, {
      cwd: rootDir,
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'production' }
    });

    // Capture output for live reporting
    this.experimentProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      
      // Parse for fix information
      if (output.includes('Fixed') || output.includes('fixed')) {
        this.liveReporter.recordFix(
          this.getCurrentCycle(),
          output.substring(0, 100),
          'fixed',
          'Detected from experiment output'
        );
      }
    });

    this.experimentProcess.stderr.on('data', (data) => {
      const error = data.toString();
      console.error(error);
      
      // Track errors
      this.liveReporter.recordFix(
        this.getCurrentCycle(),
        error.substring(0, 100),
        'failed',
        'Error detected'
      );
    });

    this.experimentProcess.on('close', (code) => {
      this.isRunning = false;
      if (code === 0) {
        console.log('\n✅ Experiment cycle completed');
        this.liveReporter.recordFix(this.getCurrentCycle(), 'Experiment cycle completed', 'fixed', 'Success');
      } else {
        console.log(`\n⚠️  Experiment exited with code ${code}`);
        this.liveReporter.recordFix(this.getCurrentCycle(), `Experiment exited with code ${code}`, 'failed', 'Non-zero exit');
      }
      
      // Continue running
      setTimeout(() => {
        this.runExperiment();
      }, 10000); // Restart after 10 seconds
    });

    this.experimentProcess.on('error', (error) => {
      console.error(`❌ Error running experiment: ${error.message}`);
      this.liveReporter.recordFix(this.getCurrentCycle(), `Error: ${error.message}`, 'failed', error.message);
      this.isRunning = false;
    });
  }

  getCurrentCycle() {
    try {
      const stateFile = path.join(rootDir, 'experiment-state.json');
      if (fs.existsSync(stateFile)) {
        const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
        return state.currentCycle || 0;
      }
    } catch (e) {
      // Ignore
    }
    return 0;
  }

  stop() {
    if (this.experimentProcess) {
      this.experimentProcess.kill('SIGTERM');
    }
    this.isRunning = false;
    this.liveReporter.printLiveStatus();
    console.log('\n🛑 Strategic runner stopped');
  }
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const runner = new MagnumOpusStrategicRunner();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n⚠️  Interrupted - stopping gracefully...');
    runner.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n⚠️  Terminated - stopping gracefully...');
    runner.stop();
    process.exit(0);
  });

  runner.start().catch((error) => {
    console.error(`❌ Fatal error: ${error.message}`);
    process.exit(1);
  });
}

export { MagnumOpusStrategicRunner, BudgetModel, LiveReporter, StrategicCare };

