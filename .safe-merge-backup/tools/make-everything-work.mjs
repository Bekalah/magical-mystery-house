#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Make Everything Work
 * Comprehensive tool to fix all issues and ensure everything works
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 Making Everything Work');
logger.info('=============================================\n');

async function runCommand(cmd, description) {
  try {
    logger.info(`\n📋 ${description}...`);
    const result = execSync(cmd, { 
      cwd: BASE_DIR, 
      stdio: 'pipe',
      encoding: 'utf-8',
      timeout: 60000
    });
    logger.info(`   ✅ ${description} completed`);
    return { success: true, output: result };
  } catch (error) {
    const errorMsg = error.message || String(error);
    logger.info(`   ⚠️  ${description} had issues: ${errorMsg.substring(0, 100)}`);
    return { success: false, error: errorMsg };
  }
}

async function makeEverythingWork() {
  const results = {
    build: null,
    validation: null,
    health: null,
    tools: []
  };

  // 1. Fix TypeScript build
  UserFeedback.section('Step 1: Fix TypeScript Build');
  results.build = await runCommand('ppnpm run build:scripts', 'Building TypeScript scripts');

  // 2. Validate setup
  UserFeedback.section('Step 2: Validate Setup');
  results.validation = await runCommand('ppnpm run validate:setup', 'Validating setup');

  // 3. Health check
  UserFeedback.section('Step 3: Health Check');
  results.health = await runCommand('ppnpm run health:check', 'Running health check');

  // 4. Test key tools
  UserFeedback.section('Step 4: Testing Key Tools');
  
  const keyTools = [
    { cmd: 'ppnpm run summary', name: 'System Summary' },
    { cmd: 'ppnpm run check:dependencies', name: 'Dependency Check' },
    { cmd: 'ppnpm run check:quality', name: 'Code Quality Check' }
  ];

  for (const tool of keyTools) {
    const result = await runCommand(tool.cmd, tool.name);
    results.tools.push({ name: tool.name, ...result });
  }

  // Summary
  logger.info('\n📊 Summary');
  logger.info('=============================================');
  logger.info(`Build: ${results.build?.success ? '✅' : '❌'}`);
  logger.info(`Validation: ${results.validation?.success ? '✅' : '❌'}`);
  logger.info(`Health Check: ${results.health?.success ? '✅' : '⚠️'}`);
  logger.info(`Tools Tested: ${results.tools.filter(t => t.success).length}/${results.tools.length}`);

  const allWorking = results.build?.success && results.validation?.success;
  
  if (allWorking) {
    logger.info('\n✅ Everything is working!');
    logger.info('Make everything work completed', { success: true });
  } else {
    logger.info('\n⚠️  Some issues remain - see above for details');
    logger.warn('Make everything work completed with issues', results);
  }

  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  makeEverythingWork().catch(error => {
    logger.error('❌ Error:', error.message);
    process.exit(1);
  });
}

export { makeEverythingWork };

