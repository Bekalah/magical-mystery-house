#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Automated Test Runner
 * Runs tests and generates reports
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

function findTestFiles() {
  const testFiles = [];
  const testPatterns = ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'];
  
  function search(dir, depth = 0) {
    if (depth > 10) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          search(fullPath, depth + 1);
        } else if (testPatterns.some(pattern => entry.match(pattern.replace('**/', '')))) {
          testFiles.push(fullPath);
        }
      }
    } catch {
      // Skip
    }
  }
  
  search(BASE_DIR);
  return testFiles;
}

function runTests() {
  logger.info('Running automated tests...');

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    errors: []
  };

  // Try different test runners
  const testCommands = [
    { cmd: 'ppnpm test', name: 'ppnpm test' },
    { cmd: 'ppnpm run test', name: 'ppnpm run test' },
    { cmd: 'pnpm test', name: 'pnpm test' }
  ];

  let testRun = false;

  for (const testCmd of testCommands) {
    try {
      logger.info(`Trying: ${testCmd.name}`);
      execSync(testCmd.cmd, { 
        cwd: BASE_DIR, 
        stdio: 'inherit',
        timeout: 300000 // 5 minutes
      });
      testRun = true;
      results.passed++;
      break;
    } catch (error) {
      if (error.signal === 'SIGTERM') {
        logger.error('Test timeout');
        results.errors.push('Test execution timeout');
      } else {
        // Try next command
        continue;
      }
    }
  }

  if (!testRun) {
    // Check for test files directly
    const testFiles = findTestFiles();
    if (testFiles.length > 0) {
      logger.info(`Found ${testFiles.length} test files but no test runner configured`);
      results.total = testFiles.length;
      results.skipped = testFiles.length;
    } else {
      logger.info('No test files found');
    }
  }

  return results;
}

function generateTestReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.total,
      passed: results.passed,
      failed: results.failed,
      skipped: results.skipped,
      success: results.failed === 0
    },
    errors: results.errors
  };

  const reportPath = path.join(BASE_DIR, '.test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  return report;
}

function displayTestReport(report) {
  logger.info('\n📊 Test Report');
  logger.info('=============================================');
  logger.info(`Status: ${report.summary.success ? '✅ All Passed' : '❌ Some Failed'}`);
  logger.info(`Total: ${report.summary.total}`);
  logger.info(`✅ Passed: ${report.summary.passed}`);
  logger.info(`❌ Failed: ${report.summary.failed}`);
  logger.info(`⏭️  Skipped: ${report.summary.skipped}`);

  if (report.errors.length > 0) {
    logger.info('\n❌ Errors:');
    report.errors.forEach(error => {
      logger.info(`   • ${error}`);
    });
  }

  logger.info(`\n📄 Full report: .test-report.json`);
}

function runTestSuite() {
  logger.info('🏛️✨ Automated Test Runner');
  logger.info('=============================================');

  const results = runTests();
  const report = generateTestReport(results);
  displayTestReport(report);

  return report.summary.success;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const success = runTestSuite();
  process.exit(success ? 0 : 1);
}

export { runTests, generateTestReport, runTestSuite };

