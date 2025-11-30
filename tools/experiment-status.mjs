/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Experiment Status Tool
 * Shows current status of the improvement experiment
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { calculateMetrics, loadState } from './experiment-analytics.mjs';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

function getExperimentStatus() {
  const stateFile = path.join(BASE_DIR, 'experiment-state.json');
  const logFile = path.join(BASE_DIR, 'IMPROVEMENT_EXPERIMENT_LOG.json');
  const statusFile = path.join(BASE_DIR, 'docs/status/experiment.md');
  const outputFile = path.join(BASE_DIR, 'experiment.out');

  const status = {
    running: false,
    startTime: null,
    duration: null,
    improvements: [],
    errors: [],
    lastUpdate: null,
    totalActions: 0,
    filesProcessed: 0,
    toolsCreated: 0,
    scriptsAdded: 0
  };

  // Check if experiment is running
  try {
    const processes = execSync('ps aux | grep -i "experiment\\|10-hour" | grep -v grep', { encoding: 'utf-8' });
    status.running = processes.trim().length > 0;
  } catch {
    status.running = false;
  }

  // Read state file
  if (fs.existsSync(stateFile)) {
    try {
      const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
      status.startTime = state.startTime;
      status.lastUpdate = state.lastUpdate;
      status.totalActions = state.totalActions || 0;
      status.filesProcessed = state.filesProcessed || 0;
      
      if (status.startTime) {
        const start = new Date(status.startTime);
        const now = new Date();
        status.duration = Math.floor((now - start) / 1000 / 60); // minutes
      }
    } catch {
      // Ignore
    }
  }

  // Read log file
  if (fs.existsSync(logFile)) {
    try {
      const log = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
      status.improvements = log.improvements || [];
      status.errors = log.errors || [];
      status.toolsCreated = log.toolsCreated || 0;
      status.scriptsAdded = log.scriptsAdded || 0;
    } catch {
      // Ignore
    }
  }

  // Read status file
  if (fs.existsSync(statusFile)) {
    try {
      const content = fs.readFileSync(statusFile, 'utf-8');
      // Extract key information
      const durationMatch = content.match(/Duration:\s*(\d+)\s*minutes/i);
      if (durationMatch) {
        status.duration = parseInt(durationMatch[1]);
      }
    } catch {
      // Ignore
    }
  }

  // Read output file
  if (fs.existsSync(outputFile)) {
    try {
      const stats = fs.statSync(outputFile);
      status.lastOutputUpdate = stats.mtime;
      const output = fs.readFileSync(outputFile, 'utf-8');
      const lines = output.split('\n').filter(l => l.trim());
      status.recentOutput = lines.slice(-10);
    } catch {
      // Ignore
    }
  }

  return status;
}

function countTools() {
  const toolsDir = path.join(BASE_DIR, 'tools');
  if (!fs.existsSync(toolsDir)) return 0;
  
  const files = fs.readdirSync(toolsDir);
  return files.filter(f => f.endsWith('.mjs') || f.endsWith('.js')).length;
}

function countScripts() {
  const pkgFile = path.join(BASE_DIR, 'package.json');
  if (!fs.existsSync(pkgFile)) return 0;
  
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
    return Object.keys(pkg.scripts || {}).length;
  } catch {
    return 0;
  }
}

function generateMetricsDashboard(metrics) {
  if (metrics.error) {
    return 'No metrics available';
  }

  let dashboard = '\n📊 Metrics Dashboard\n';
  dashboard += '='.repeat(60) + '\n\n';
  
  // Summary metrics
  dashboard += '**Summary**\n';
  dashboard += `- Success Rate: ${metrics.summary.successRate}%\n`;
  dashboard += `- Total Cycles: ${metrics.summary.totalCycles}\n`;
  dashboard += `- Total Improvements: ${metrics.summary.totalImprovements}\n`;
  dashboard += `- Avg Duration: ${(metrics.summary.avgDuration / 1000).toFixed(2)}s\n\n`;

  // Top performing tools
  const topTools = Object.entries(metrics.toolStats)
    .sort((a, b) => parseFloat(b[1].successRate) - parseFloat(a[1].successRate))
    .slice(0, 5);
  
  if (topTools.length > 0) {
    dashboard += '**Top Performing Tools**\n';
    topTools.forEach(([tool, stats], i) => {
      dashboard += `${i + 1}. ${tool}: ${stats.successRate}% success (${stats.runs} runs)\n`;
    });
    dashboard += '\n';
  }

  // Phase performance
  dashboard += '**Phase Performance**\n';
  Object.entries(metrics.phaseStats).forEach(([phase, stats]) => {
    const total = stats.successes + stats.failures;
    const successRate = total > 0 ? ((stats.successes / total) * 100).toFixed(2) : 0;
    dashboard += `- ${phase}: ${successRate}% success (${stats.successes}/${total})\n`;
  });
  dashboard += '\n';

  // Recent trend
  if (metrics.trend && metrics.trend.improvements.length > 0) {
    const recent = metrics.trend.improvements.slice(-5);
    const avg = (recent.reduce((a, b) => a + b, 0) / recent.length).toFixed(2);
    dashboard += `**Recent Trend**: ${avg} improvements per cycle (last 5 cycles)\n\n`;
  }

  return dashboard;
}

function generatePerformanceChart(metrics) {
  if (metrics.error || !metrics.trend) {
    return '';
  }

  let chart = '\n📈 Performance Chart (Last 10 Cycles)\n';
  chart += '='.repeat(60) + '\n\n';

  const improvements = metrics.trend.improvements || [];
  const errors = metrics.trend.errors || [];
  const maxValue = Math.max(...improvements, ...errors, 1);

  // Simple ASCII chart
  for (let i = 0; i < Math.min(10, improvements.length); i++) {
    const cycleNum = improvements.length - 10 + i + 1;
    const impCount = improvements[i] || 0;
    const errCount = errors[i] || 0;
    const impBar = '█'.repeat(Math.round((impCount / maxValue) * 20));
    const errBar = '░'.repeat(Math.round((errCount / maxValue) * 20));
    
    chart += `Cycle ${cycleNum}: ${impBar}${errBar} (${impCount}✓ ${errCount}✗)\n`;
  }

  chart += '\n';
  return chart;
}

async function main() {
  logger.info('🔬 Experiment Status Report');
  logger.info('='.repeat(60));
  logger.info('');

  const status = getExperimentStatus();
  const toolsCount = countTools();
  const scriptsCount = countScripts();

  // Load and calculate metrics
  const state = loadState();
  let metrics = null;
  if (state) {
    metrics = calculateMetrics(state);
  }

  // Status
  logger.info('📊 Current Status:');
  logger.info(`   ${status.running ? '🟢 Running' : '🔴 Not Running'}`);
  
  if (status.startTime) {
    logger.info(`   ⏰ Started: ${new Date(status.startTime).toLocaleString()}`);
  }
  
  if (status.duration !== null) {
    const hours = Math.floor(status.duration / 60);
    const minutes = status.duration % 60;
    logger.info(`   ⏱️  Duration: ${hours}h ${minutes}m`);
  }
  
  if (status.lastUpdate) {
    logger.info(`   📅 Last Update: ${new Date(status.lastUpdate).toLocaleString()}`);
  }
  
  logger.info('');

  // Statistics
  logger.info('📈 Statistics:');
  logger.info(`   🛠️  Tools Created: ${toolsCount}`);
  logger.info(`   📜 Scripts Added: ${scriptsCount}`);
  logger.info(`   📁 Files Processed: ${status.filesProcessed}`);
  logger.info(`   ⚡ Total Actions: ${status.totalActions}`);
  logger.info(`   ✅ Improvements: ${status.improvements.length}`);
  logger.info(`   ❌ Errors: ${status.errors.length}`);
  logger.info('');

  // Metrics Dashboard
  if (metrics && !metrics.error) {
    logger.info(generateMetricsDashboard(metrics));
    logger.info(generatePerformanceChart(metrics));
  }

  // Recent Improvements
  if (status.improvements.length > 0) {
    logger.info('✨ Recent Improvements:');
    status.improvements.slice(-10).forEach((imp, i) => {
      logger.info(`   ${i + 1}. ${imp}`);
    });
    logger.info('');
  }

  // Recent Errors
  if (status.errors.length > 0) {
    logger.info('⚠️  Recent Errors:');
    status.errors.slice(-5).forEach((err, i) => {
      logger.info(`   ${i + 1}. ${err}`);
    });
    logger.info('');
  }

  // Summary
  logger.info('📊 Summary:');
  logger.info(`   Total Tools: ${toolsCount}`);
  logger.info(`   Total Scripts: ${scriptsCount}`);
  logger.info(`   Improvements Made: ${status.improvements.length}`);
  logger.info(`   Files Processed: ${status.filesProcessed}`);
  logger.info('');

  if (status.running) {
    logger.info('🟢 Experiment is currently running!');
  } else {
    logger.info('💡 To start the experiment:');
    logger.info('   ppnpm run experiment:start');
    logger.info('   or');
    logger.info('   ppnpm run experiment:daemon');
  }
}

main().catch(error => {
  logger.error('❌ Error:', error.message);
  process.exit(1);
});

