#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Integration Testing Framework
 * Tests integration between all systems
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Integration Testing Framework');
logger.info('   → Tests system integrations');
logger.info('   → Validates component interactions');
logger.info('   → End-to-end system validation\n');

const INTEGRATION_TESTS = [
  {
    name: 'Logger Integration',
    test: () => {
      try {
        const logger = new EnhancedLogger();
        logger.info('Test message');
        return { passed: true, message: 'Logger works correctly' };
      } catch (error) {
        return { passed: false, message: `Logger failed: ${error.message}` };
      }
    }
  },
  {
    name: 'Error Recovery Integration',
    test: async () => {
      try {
        const { autoRecover } = await import('./error-recovery.mjs');
        const recovered = autoRecover();
        return { passed: true, message: `Recovery system works (${recovered} issues checked)` };
      } catch (error) {
        return { passed: false, message: `Recovery system failed: ${error.message}` };
      }
    }
  },
  {
    name: 'Health Monitor Integration',
    test: async () => {
      try {
        const { runHealthCheck } = await import('./health-monitor.mjs');
        const results = runHealthCheck();
        return { 
          passed: results.critical.length === 0, 
          message: `Health check works (${results.critical.length} critical issues)` 
        };
      } catch (error) {
        return { passed: false, message: `Health check failed: ${error.message}` };
      }
    }
  },
  {
    name: 'File System Integration',
    test: () => {
      try {
        const testFile = path.join(BASE_DIR, '.test-integration');
        fs.writeFileSync(testFile, 'test');
        const content = fs.readFileSync(testFile, 'utf-8');
        fs.unlinkSync(testFile);
        return { passed: content === 'test', message: 'File system operations work' };
      } catch (error) {
        return { passed: false, message: `File system failed: ${error.message}` };
      }
    }
  },
  {
    name: 'Command Execution',
    test: () => {
      try {
        execSync('echo "test"', { cwd: BASE_DIR, stdio: 'pipe' });
        return { passed: true, message: 'Command execution works' };
      } catch (error) {
        return { passed: false, message: `Command execution failed: ${error.message}` };
      }
    }
  },
  {
    name: 'Backup System Integration',
    test: () => {
      try {
        const backupDir = path.join(BASE_DIR, '.backups');
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }
        return { passed: true, message: 'Backup directory accessible' };
      } catch (error) {
        return { passed: false, message: `Backup system failed: ${error.message}` };
      }
    }
  }
];

async function runIntegrationTests() {
  UserFeedback.section('Integration Testing');
  
  const results = {
    total: INTEGRATION_TESTS.length,
    passed: 0,
    failed: 0,
    tests: []
  };

  for (let i = 0; i < INTEGRATION_TESTS.length; i++) {
    const test = INTEGRATION_TESTS[i];
    UserFeedback.step(i + 1, INTEGRATION_TESTS.length, test.name);
    
    try {
      const result = await test.test();
      results.tests.push({
        name: test.name,
        ...result
      });
      
      if (result.passed) {
        results.passed++;
        UserFeedback.success(result.message);
      } else {
        results.failed++;
        UserFeedback.error(result.message);
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: test.name,
        passed: false,
        message: `Test error: ${error.message}`
      });
      UserFeedback.error(`Test failed: ${error.message}`);
    }
  }

  return results;
}

function displayIntegrationReport(results) {
  UserFeedback.section('Integration Test Results');
  
  logger.info(`Total Tests: ${results.total}`);
  logger.info(`✅ Passed: ${results.passed}`);
  logger.info(`❌ Failed: ${results.failed}`);
  
  if (results.failed > 0) {
    logger.info('\n❌ Failed Tests:');
    results.tests
      .filter(t => !t.passed)
      .forEach(test => {
        logger.info(`   • ${test.name}: ${test.message}`);
      });
  }

  const reportPath = path.join(BASE_DIR, '.integration-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  logger.info(`\n📄 Full report: .integration-test-report.json`);
}

async function testIntegration() {
  logger.info('🏛️✨ Integration Testing Framework');
  logger.info('=============================================\n');

  const results = await runIntegrationTests();
  displayIntegrationReport(results);

  logger.info('Integration tests completed', results);
  return results.failed === 0;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  testIntegration().then(success => process.exit(success ? 0 : 1));
}

export { runIntegrationTests, testIntegration };

