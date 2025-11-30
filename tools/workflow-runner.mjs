#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Automated Workflow Runner
 * Runs common workflows and chains operations
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Automated Workflow Runner');
logger.info('   → Pre-defined workflows');
logger.info('   → Operation chaining');
logger.info('   → Progress tracking\n');

const WORKFLOWS = {
  'pre-commit': {
    name: 'Pre-Commit Workflow',
    description: 'Run before committing code',
    steps: [
      { name: 'Quality Check', cmd: 'ppnpm run quality:enhanced' },
      { name: 'Consistency Check', cmd: 'ppnpm run check:consistency' },
      { name: 'Build', cmd: 'ppnpm run build' },
      { name: 'Tests', cmd: 'ppnpm run test:run' }
    ]
  },
  'post-update': {
    name: 'Post-Update Workflow',
    description: 'Run after Cursor updates',
    steps: [
      { name: 'Auto-Update', cmd: 'ppnpm run auto:update' },
      { name: 'Recovery', cmd: 'ppnpm run recover:auto' },
      { name: 'Health Check', cmd: 'ppnpm run health:monitor:once' },
      { name: 'Documentation', cmd: 'ppnpm run docs:auto' }
    ]
  },
  'daily': {
    name: 'Daily Maintenance',
    description: 'Daily maintenance tasks',
    steps: [
      { name: 'Quick Maintenance', cmd: 'ppnpm run maintain:quick' },
      { name: 'Health Check', cmd: 'ppnpm run health:monitor:once' },
      { name: 'Backup', cmd: 'ppnpm run backup:create' }
    ]
  },
  'weekly': {
    name: 'Weekly Maintenance',
    description: 'Weekly comprehensive maintenance',
    steps: [
      { name: 'Full Maintenance', cmd: 'ppnpm run maintain:full' },
      { name: 'Performance Optimization', cmd: 'ppnpm run optimize:performance' },
      { name: 'Integration Tests', cmd: 'ppnpm run test:integration' },
      { name: 'System Integration', cmd: 'ppnpm run integrate:systems' }
    ]
  },
  'full-check': {
    name: 'Full System Check',
    description: 'Complete system validation',
    steps: [
      { name: 'Health Check', cmd: 'ppnpm run health:monitor:once' },
      { name: 'Quality Check', cmd: 'ppnpm run quality:enhanced' },
      { name: 'Integration Tests', cmd: 'ppnpm run test:integration' },
      { name: 'Performance Check', cmd: 'ppnpm run optimize:performance' }
    ]
  }
};

async function runWorkflow(workflowName) {
  const workflow = WORKFLOWS[workflowName];
  
  if (!workflow) {
    UserFeedback.error(`Workflow not found: ${workflowName}`);
    UserFeedback.suggestion('Available workflows', Object.keys(WORKFLOWS));
    return false;
  }

  UserFeedback.section(workflow.name);
  logger.info(workflow.description);
  logger.info('');

  const results = {
    passed: [],
    failed: []
  };

  for (let i = 0; i < workflow.steps.length; i++) {
    const step = workflow.steps[i];
    UserFeedback.step(i + 1, workflow.steps.length, step.name);

    try {
      execSync(step.cmd, { 
        cwd: BASE_DIR, 
        stdio: 'inherit',
        timeout: 300000 // 5 minutes
      });
      results.passed.push(step.name);
      UserFeedback.success(`${step.name} completed`);
    } catch (error) {
      results.failed.push(step.name);
      UserFeedback.error(`${step.name} failed`, `Check output above for details`);
    }
  }

  UserFeedback.section('Workflow Summary');
  logger.info(`✅ Passed: ${results.passed.length}`);
  logger.info(`❌ Failed: ${results.failed.length}`);

  logger.info(`Workflow completed: ${workflowName}`, results);
  return results.failed.length === 0;
}

function listWorkflows() {
  UserFeedback.section('Available Workflows');
  
  for (const [key, workflow] of Object.entries(WORKFLOWS)) {
    logger.info(`\n${key}:`);
    logger.info(`   Name: ${workflow.name}`);
    logger.info(`   Description: ${workflow.description}`);
    logger.info(`   Steps: ${workflow.steps.length}`);
    UserFeedback.command(`ppnpm run workflow:${key}`, `Run ${workflow.name}`);
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const workflowName = process.argv[2];
  
  if (!workflowName || workflowName === 'list') {
    listWorkflows();
  } else {
    runWorkflow(workflowName).then(success => process.exit(success ? 0 : 1));
  }
}

export { runWorkflow, listWorkflows, WORKFLOWS };

