/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Experiment Analytics Tool
 * Analyzes state file and generates comprehensive metrics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const STATE_FILE = path.join(BASE_DIR, '.continuous-improvement-state.json');

logger.info('🔧 IMPROVEMENT: Creating Experiment Analytics');
logger.info('   → Analyzes state file');
logger.info('   → Generates comprehensive metrics');
logger.info('   → Provides insights and trends\n');

function loadState() {
  if (!fs.existsSync(STATE_FILE)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  } catch (error) {
    logger.error('Failed to load state file', { error: error.message });
    return null;
  }
}

function calculateMetrics(state) {
  if (!state || !state.cycles || state.cycles.length === 0) {
    return {
      error: 'No data available for analysis'
    };
  }

  const cycles = state.cycles;
  const totalCycles = cycles.length;
  
  // Success rates
  const successfulTools = cycles.reduce((sum, cycle) => 
    sum + cycle.improvements.filter(imp => imp.status === 'success').length, 0
  );
  const failedTools = cycles.reduce((sum, cycle) => 
    sum + cycle.errors.length, 0
  );
  const totalTools = successfulTools + failedTools;
  const successRate = totalTools > 0 ? (successfulTools / totalTools * 100).toFixed(2) : 0;

  // Duration metrics
  const durations = cycles.map(c => c.duration || 0).filter(d => d > 0);
  const avgDuration = durations.length > 0 
    ? durations.reduce((a, b) => a + b, 0) / durations.length 
    : 0;
  const minDuration = durations.length > 0 ? Math.min(...durations) : 0;
  const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;

  // Tool performance
  const toolStats = {};
  cycles.forEach(cycle => {
    cycle.improvements.forEach(imp => {
      if (!toolStats[imp.tool]) {
        toolStats[imp.tool] = {
          runs: 0,
          successes: 0,
          failures: 0,
          totalDuration: 0,
          phases: new Set()
        };
      }
      toolStats[imp.tool].runs++;
      toolStats[imp.tool].successes++;
      if (imp.duration) {
        toolStats[imp.tool].totalDuration += imp.duration;
      }
      if (imp.phase) {
        toolStats[imp.tool].phases.add(imp.phase);
      }
    });
    cycle.errors.forEach(err => {
      if (!toolStats[err.tool]) {
        toolStats[err.tool] = {
          runs: 0,
          successes: 0,
          failures: 0,
          totalDuration: 0,
          phases: new Set()
        };
      }
      toolStats[err.tool].runs++;
      toolStats[err.tool].failures++;
      if (err.phase) {
        toolStats[err.tool].phases.add(err.phase);
      }
    });
  });

  // Convert phases Set to Array
  Object.keys(toolStats).forEach(tool => {
    toolStats[tool].phases = Array.from(toolStats[tool].phases);
    toolStats[tool].avgDuration = toolStats[tool].runs > 0
      ? toolStats[tool].totalDuration / toolStats[tool].runs
      : 0;
    toolStats[tool].successRate = toolStats[tool].runs > 0
      ? (toolStats[tool].successes / toolStats[tool].runs * 100).toFixed(2)
      : 0;
  });

  // Error patterns
  const errorPatterns = {};
  cycles.forEach(cycle => {
    cycle.errors.forEach(err => {
      const errorKey = err.error ? err.error.substring(0, 50) : 'Unknown error';
      if (!errorPatterns[errorKey]) {
        errorPatterns[errorKey] = 0;
      }
      errorPatterns[errorKey]++;
    });
  });

  // Phase performance
  const phaseStats = {
    'repo-git': { cycles: 0, improvements: 0, errors: 0, totalDuration: 0 },
    'code-quality': { cycles: 0, improvements: 0, errors: 0, totalDuration: 0 }
  };
  cycles.forEach(cycle => {
    cycle.improvements.forEach(imp => {
      if (imp.phase && phaseStats[imp.phase]) {
        phaseStats[imp.phase].improvements++;
        if (imp.duration) {
          phaseStats[imp.phase].totalDuration += imp.duration;
        }
      }
    });
    cycle.errors.forEach(err => {
      if (err.phase && phaseStats[err.phase]) {
        phaseStats[err.phase].errors++;
      }
    });
  });

  // Time trends (last 10 cycles)
  const recentCycles = cycles.slice(-10);
  const trend = {
    improvements: recentCycles.map(c => c.improvements.length),
    errors: recentCycles.map(c => c.errors.length),
    durations: recentCycles.map(c => c.duration || 0)
  };

  return {
    summary: {
      totalCycles,
      totalImprovements: state.totalImprovements || 0,
      successfulTools,
      failedTools,
      successRate: parseFloat(successRate),
      avgDuration: Math.round(avgDuration),
      minDuration: Math.round(minDuration),
      maxDuration: Math.round(maxDuration),
      startTime: state.startTime,
      lastUpdate: state.lastUpdate
    },
    toolStats,
    errorPatterns,
    phaseStats,
    trend,
    cycles: totalCycles
  };
}

function generateReport(metrics) {
  if (metrics.error) {
    UserFeedback.error(metrics.error);
    return;
  }

  UserFeedback.section('Experiment Analytics Report');
  
  logger.info('\n📊 Summary Metrics');
  logger.info('=============================================');
  logger.info(`Total Cycles: ${metrics.summary.totalCycles}`);
  logger.info(`Total Improvements: ${metrics.summary.totalImprovements}`);
  logger.info(`Success Rate: ${metrics.summary.successRate}%`);
  logger.info(`Successful Tools: ${metrics.summary.successfulTools}`);
  logger.info(`Failed Tools: ${metrics.summary.failedTools}`);
  logger.info(`Average Duration: ${(metrics.summary.avgDuration / 1000).toFixed(2)}s`);
  logger.info(`Min Duration: ${(metrics.summary.minDuration / 1000).toFixed(2)}s`);
  logger.info(`Max Duration: ${(metrics.summary.maxDuration / 1000).toFixed(2)}s`);
  logger.info(`Started: ${metrics.summary.startTime ? new Date(metrics.summary.startTime).toLocaleString() : 'Unknown'}`);
  logger.info(`Last Update: ${metrics.summary.lastUpdate ? new Date(metrics.summary.lastUpdate).toLocaleString() : 'Unknown'}`);

  logger.info('\n🛠️  Tool Performance');
  logger.info('=============================================');
  const sortedTools = Object.entries(metrics.toolStats)
    .sort((a, b) => b[1].runs - a[1].runs)
    .slice(0, 10);
  
  sortedTools.forEach(([tool, stats]) => {
    logger.info(`\n${tool}:`);
    logger.info(`  Runs: ${stats.runs}`);
    logger.info(`  Success Rate: ${stats.successRate}%`);
    logger.info(`  Avg Duration: ${(stats.avgDuration / 1000).toFixed(2)}s`);
    logger.info(`  Phases: ${stats.phases.join(', ')}`);
  });

  logger.info('\n⚠️  Error Patterns');
  logger.info('=============================================');
  const sortedErrors = Object.entries(metrics.errorPatterns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  sortedErrors.forEach(([error, count]) => {
    logger.info(`${count}x: ${error}`);
  });

  logger.info('\n📈 Phase Performance');
  logger.info('=============================================');
  Object.entries(metrics.phaseStats).forEach(([phase, stats]) => {
    logger.info(`\n${phase}:`);
    logger.info(`  Improvements: ${stats.improvements}`);
    logger.info(`  Errors: ${stats.errors}`);
    logger.info(`  Total Duration: ${(stats.totalDuration / 1000).toFixed(2)}s`);
  });

  logger.info('\n📊 Recent Trends (Last 10 Cycles)');
  logger.info('=============================================');
  logger.info(`Improvements: ${metrics.trend.improvements.join(', ')}`);
  logger.info(`Errors: ${metrics.trend.errors.join(', ')}`);
  logger.info(`Durations: ${metrics.trend.durations.map(d => (d / 1000).toFixed(2) + 's').join(', ')}`);

  return metrics;
}

function saveMetrics(metrics) {
  const metricsFile = path.join(BASE_DIR, '.experiment-metrics.json');
  fs.writeFileSync(metricsFile, JSON.stringify(metrics, null, 2), 'utf-8');
  logger.info(`Metrics saved to: ${metricsFile}`);
}

async function main() {
  UserFeedback.section('Experiment Analytics');
  
  const state = loadState();
  if (!state) {
    UserFeedback.error('No state file found. Run the continuous improvement runner first.');
    process.exit(1);
  }

  const metrics = calculateMetrics(state);
  const report = generateReport(metrics);
  
  if (report && !report.error) {
    saveMetrics(metrics);
    UserFeedback.success('Analytics report generated successfully');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { calculateMetrics, generateReport, loadState };

