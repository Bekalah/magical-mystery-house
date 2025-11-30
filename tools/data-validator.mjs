/**
 * Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational
 */
/**
 * ND joy: Central to all tools - honors neurodivergent creative expression
 */
/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Data Validator Tool
 * Validates and fixes state file data quality
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

logger.info('🔧 IMPROVEMENT: Creating Data Validator');
logger.info('   → Validates state file data quality');
logger.info('   → Fixes data issues');
logger.info('   → Ensures data consistency\n');

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

function validateState(state) {
  const issues = [];
  const fixes = [];

  // Check required fields
  if (!state.startTime) {
    issues.push({ type: 'missing_field', field: 'startTime', severity: 'high' });
    fixes.push({ type: 'add_field', field: 'startTime', value: new Date().toISOString() });
  }

  if (!state.cycles) {
    issues.push({ type: 'missing_field', field: 'cycles', severity: 'high' });
    fixes.push({ type: 'add_field', field: 'cycles', value: [] });
  }

  if (!state.totalImprovements) {
    issues.push({ type: 'missing_field', field: 'totalImprovements', severity: 'medium' });
    fixes.push({ type: 'add_field', field: 'totalImprovements', value: 0 });
  }

  // Validate cycles
  if (state.cycles && Array.isArray(state.cycles)) {
    state.cycles.forEach((cycle, index) => {
      // Check cycle structure
      if (!cycle.cycle) {
        issues.push({ type: 'invalid_cycle', cycle: index, field: 'cycle', severity: 'medium' });
        fixes.push({ type: 'fix_cycle', cycle: index, field: 'cycle', value: index + 1 });
      }

      if (!cycle.timestamp) {
        issues.push({ type: 'invalid_cycle', cycle: index, field: 'timestamp', severity: 'medium' });
        fixes.push({ type: 'fix_cycle', cycle: index, field: 'timestamp', value: new Date().toISOString() });
      }

      // Validate improvements array
      if (cycle.improvements && !Array.isArray(cycle.improvements)) {
        issues.push({ type: 'invalid_cycle', cycle: index, field: 'improvements', severity: 'high' });
        fixes.push({ type: 'fix_cycle', cycle: index, field: 'improvements', value: [] });
      }

      // Validate errors array
      if (cycle.errors && !Array.isArray(cycle.errors)) {
        issues.push({ type: 'invalid_cycle', cycle: index, field: 'errors', severity: 'high' });
        fixes.push({ type: 'fix_cycle', cycle: index, field: 'errors', value: [] });
      }

      // Validate improvement items
      if (cycle.improvements && Array.isArray(cycle.improvements)) {
        cycle.improvements.forEach((imp, impIndex) => {
          if (!imp.tool) {
            issues.push({ type: 'invalid_improvement', cycle: index, improvement: impIndex, field: 'tool', severity: 'medium' });
          }
          if (imp.duration && (typeof imp.duration !== 'number' || imp.duration < 0)) {
            issues.push({ type: 'invalid_improvement', cycle: index, improvement: impIndex, field: 'duration', severity: 'low' });
            fixes.push({ type: 'fix_improvement', cycle: index, improvement: impIndex, field: 'duration', value: 0 });
          }
        });
      }

      // Validate error items
      if (cycle.errors && Array.isArray(cycle.errors)) {
        cycle.errors.forEach((err, errIndex) => {
          if (!err.tool) {
            issues.push({ type: 'invalid_error', cycle: index, error: errIndex, field: 'tool', severity: 'medium' });
          }
          if (!err.error) {
            issues.push({ type: 'invalid_error', cycle: index, error: errIndex, field: 'error', severity: 'medium' });
          }
        });
      }
    });
  }

  // Validate metrics if present
  if (state.metrics) {
    if (!state.metrics.toolStats || typeof state.metrics.toolStats !== 'object') {
      issues.push({ type: 'invalid_metrics', field: 'toolStats', severity: 'medium' });
      fixes.push({ type: 'fix_metrics', field: 'toolStats', value: {} });
    }

    if (!state.metrics.phaseStats || typeof state.metrics.phaseStats !== 'object') {
      issues.push({ type: 'invalid_metrics', field: 'phaseStats', severity: 'medium' });
      fixes.push({ type: 'fix_metrics', field: 'phaseStats', value: {
        'repo-git': { successes: 0, failures: 0, totalDuration: 0 },
        'code-quality': { successes: 0, failures: 0, totalDuration: 0 }
      }});
    }
  }

  // Validate totalImprovements matches actual count
  if (state.cycles && Array.isArray(state.cycles)) {
    const actualTotal = state.cycles.reduce((sum, cycle) => 
      sum + (cycle.improvements?.length || 0), 0
    );
    if (state.totalImprovements !== actualTotal) {
      issues.push({ 
        type: 'mismatch', 
        field: 'totalImprovements', 
        expected: actualTotal, 
        actual: state.totalImprovements, 
        severity: 'low' 
      });
      fixes.push({ type: 'fix_total', field: 'totalImprovements', value: actualTotal });
    }
  }

  return { issues, fixes };
}

function applyFixes(state, fixes) {
  let fixed = JSON.parse(JSON.stringify(state)); // Deep copy

  fixes.forEach(fix => {
    try {
      switch (fix.type) {
        case 'add_field':
          fixed[fix.field] = fix.value;
          break;
        case 'fix_cycle':
          if (fixed.cycles && fixed.cycles[fix.cycle]) {
            fixed.cycles[fix.cycle][fix.field] = fix.value;
          }
          break;
        case 'fix_improvement':
          if (fixed.cycles && fixed.cycles[fix.cycle] && fixed.cycles[fix.cycle].improvements) {
            fixed.cycles[fix.cycle].improvements[fix.improvement][fix.field] = fix.value;
          }
          break;
        case 'fix_metrics':
          if (!fixed.metrics) {
            fixed.metrics = {};
          }
          fixed.metrics[fix.field] = fix.value;
          break;
        case 'fix_total':
          fixed[fix.field] = fix.value;
          break;
      }
    } catch (error) {
      logger.warn(`Failed to apply fix: ${fix.type}`, { error: error.message });
    }
  });

  return fixed;
}

async function main() {
  UserFeedback.section('Data Validator');
  
  const state = loadState();
  if (!state) {
    UserFeedback.error('No state file found.');
    process.exit(1);
  }

  UserFeedback.info('Validating state file...');
  const { issues, fixes } = validateState(state);

  UserFeedback.section('Validation Results');
  logger.info(`Issues found: ${issues.length}`);
  logger.info(`Fixes available: ${fixes.length}`);

  if (issues.length > 0) {
    logger.info('\n📋 Issues:');
    const bySeverity = { high: [], medium: [], low: [] };
    issues.forEach(issue => {
      bySeverity[issue.severity].push(issue);
    });

    if (bySeverity.high.length > 0) {
      logger.info('\n🔴 High Severity:');
      bySeverity.high.forEach(issue => {
        logger.info(`   - ${issue.type}: ${issue.field || 'unknown'}`);
      });
    }

    if (bySeverity.medium.length > 0) {
      logger.info('\n🟡 Medium Severity:');
      bySeverity.medium.forEach(issue => {
        logger.info(`   - ${issue.type}: ${issue.field || 'unknown'}`);
      });
    }

    if (bySeverity.low.length > 0) {
      logger.info('\n🟢 Low Severity:');
      bySeverity.low.forEach(issue => {
        logger.info(`   - ${issue.type}: ${issue.field || 'unknown'}`);
      });
    }
  }

  if (fixes.length > 0) {
    const command = process.argv[2];
    if (command === 'fix') {
      UserFeedback.info('\nApplying fixes...');
      const fixed = applyFixes(state, fixes);
      
      // Backup original
      const backupFile = STATE_FILE + '.backup';
      fs.copyFileSync(STATE_FILE, backupFile);
      logger.info(`Backup created: ${backupFile}`);
      
      // Save fixed state
      fs.writeFileSync(STATE_FILE, JSON.stringify(fixed, null, 2), 'utf-8');
      UserFeedback.success(`Applied ${fixes.length} fixes`);
      logger.info('State file fixed', { fixesApplied: fixes.length });
    } else {
      logger.info('\n💡 To apply fixes, run:');
      logger.info('   node tools/data-validator.mjs fix');
    }
  } else {
    UserFeedback.success('No fixes needed. State file is valid!');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateState, applyFixes };

