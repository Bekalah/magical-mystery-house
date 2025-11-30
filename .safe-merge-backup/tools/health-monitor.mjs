#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Health Monitor with real-time monitoring and alerts
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

const HEALTH_CHECKS = {
  'dependencies': {
    name: 'Dependencies',
    check: () => {
      try {
        execSync('pnpm list --depth=0', { cwd: BASE_DIR, stdio: 'pipe' });
        return { healthy: true, message: 'All dependencies installed' };
      } catch {
        return { healthy: false, message: 'Dependencies missing or corrupted' };
      }
    }
  },
  'build': {
    name: 'Build System',
    check: () => {
      const distPath = path.join(BASE_DIR, 'dist');
      if (!fs.existsSync(distPath)) {
        return { healthy: false, message: 'Build artifacts missing' };
      }
      return { healthy: true, message: 'Build artifacts present' };
    }
  },
  'tools': {
    name: 'Tools',
    check: () => {
      const toolsDir = path.join(BASE_DIR, 'tools');
      const tools = fs.readdirSync(toolsDir).filter(f => f.endsWith('.mjs'));
      const executable = tools.filter(f => {
        const toolPath = path.join(toolsDir, f);
        return fs.statSync(toolPath).mode & 0o111;
      });
      
      if (executable.length < tools.length * 0.8) {
        return { healthy: false, message: `${tools.length - executable.length} tools not executable` };
      }
      return { healthy: true, message: `${executable.length}/${tools.length} tools executable` };
    }
  },
  'documentation': {
    name: 'Documentation',
    check: () => {
      const docsDir = path.join(BASE_DIR, 'docs');
      if (!fs.existsSync(docsDir)) {
        return { healthy: false, message: 'Documentation directory missing' };
      }
      const docs = fs.readdirSync(docsDir, { recursive: true })
        .filter(f => f.endsWith('.md'));
      return { healthy: docs.length > 0, message: `${docs.length} documentation files` };
    }
  },
  'openspec': {
    name: 'OpenSpec',
    check: () => {
      const openspecDir = path.join(BASE_DIR, 'openspec');
      if (!fs.existsSync(openspecDir)) {
        return { healthy: false, message: 'OpenSpec directory missing' };
      }
      const required = ['AGENTS.md', 'project.md', 'README.md'];
      const existing = required.filter(f => fs.existsSync(path.join(openspecDir, f)));
      return { 
        healthy: existing.length === required.length, 
        message: `${existing.length}/${required.length} required files present` 
      };
    }
  },
  'disk_space': {
    name: 'Disk Space',
    check: () => {
      try {
        const output = execSync('df -h .', { encoding: 'utf-8' });
        const match = output.match(/(\d+)%/);
        if (match) {
          const usage = parseInt(match[1]);
          if (usage > 90) {
            return { healthy: false, message: `Disk usage critical: ${usage}%` };
          }
          if (usage > 80) {
            return { healthy: true, message: `Disk usage high: ${usage}%` };
          }
          return { healthy: true, message: `Disk usage: ${usage}%` };
        }
      } catch {
        // Ignore
      }
      return { healthy: true, message: 'Disk space check unavailable' };
    }
  }
};

function runHealthCheck() {
  logger.info('Running comprehensive health check...');

  const results = {
    healthy: [],
    warnings: [],
    critical: []
  };

  for (const [key, check] of Object.entries(HEALTH_CHECKS)) {
    try {
      const result = check.check();
      const status = {
        name: check.name,
        key,
        ...result
      };

      if (result.healthy) {
        results.healthy.push(status);
        logger.info(`✅ ${check.name}: ${result.message}`);
      } else {
        results.critical.push(status);
        logger.error(`❌ ${check.name}: ${result.message}`);
      }
    } catch (error) {
      results.warnings.push({
        name: check.name,
        key,
        healthy: false,
        message: `Check failed: ${error.message}`
      });
      logger.warn(`⚠️  ${check.name}: Check failed`);
    }
  }

  return results;
}

function generateHealthReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: Object.keys(HEALTH_CHECKS).length,
      healthy: results.healthy.length,
      warnings: results.warnings.length,
      critical: results.critical.length
    },
    checks: {
      healthy: results.healthy,
      warnings: results.warnings,
      critical: results.critical
    },
    status: results.critical.length === 0 ? 'healthy' : 'unhealthy'
  };

  const reportPath = path.join(BASE_DIR, '.health-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  return report;
}

function displayHealthReport(report) {
  logger.info('\n📊 Health Report');
  logger.info('=============================================');
  logger.info(`Status: ${report.status === 'healthy' ? '✅ Healthy' : '❌ Unhealthy'}`);
  logger.info(`Total Checks: ${report.summary.total}`);
  logger.info(`✅ Healthy: ${report.summary.healthy}`);
  logger.info(`⚠️  Warnings: ${report.summary.warnings}`);
  logger.info(`❌ Critical: ${report.summary.critical}`);

  if (report.checks.critical.length > 0) {
    logger.info('\n❌ Critical Issues:');
    report.checks.critical.forEach(check => {
      logger.info(`   • ${check.name}: ${check.message}`);
    });
  }

  if (report.checks.warnings.length > 0) {
    logger.info('\n⚠️  Warnings:');
    report.checks.warnings.forEach(check => {
      logger.info(`   • ${check.name}: ${check.message}`);
    });
  }

  logger.info(`\n📄 Full report: .health-report.json`);
}

function monitorHealth(interval = 300000) { // 5 minutes default
  logger.info(`Starting health monitoring (interval: ${interval}ms)`);

  const checkHealth = () => {
    const results = runHealthCheck();
    const report = generateHealthReport(results);
    displayHealthReport(report);

    if (report.status === 'unhealthy') {
      logger.error('System health check failed', { report });
    }
  };

  // Initial check
  checkHealth();

  // Set up interval
  const intervalId = setInterval(checkHealth, interval);

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    clearInterval(intervalId);
    logger.info('Health monitoring stopped');
    process.exit(0);
  });

  return intervalId;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const mode = process.argv[2] || 'once';
  
  if (mode === 'monitor') {
    const interval = parseInt(process.argv[3]) || 300000;
    monitorHealth(interval);
  } else {
    const results = runHealthCheck();
    const report = generateHealthReport(results);
    displayHealthReport(report);
    process.exit(report.status === 'healthy' ? 0 : 1);
  }
}

export { runHealthCheck, generateHealthReport, monitorHealth };

