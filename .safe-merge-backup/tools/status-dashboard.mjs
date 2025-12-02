#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Status Dashboard
 * Real-time system status overview
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

logger.info('🔧 IMPROVEMENT: Creating Status Dashboard');
logger.info('   → Real-time system status');
logger.info('   → Visual indicators');
logger.info('   → Quick overview\n');

function getSystemStatus() {
  const status = {
    timestamp: new Date().toISOString(),
    systems: {},
    health: 'unknown',
    performance: 'unknown',
    recommendations: []
  };

  // Check systems
  const systemChecks = {
    'Logger': () => {
      try {
        const logger = new EnhancedLogger();
        logger.info('Test');
        return { status: 'operational', message: 'Working' };
      } catch {
        return { status: 'error', message: 'Failed' };
      }
    },
    'Error Recovery': () => {
      const recoveryPath = path.join(BASE_DIR, 'tools/error-recovery.mjs');
      return fs.existsSync(recoveryPath) 
        ? { status: 'operational', message: 'Available' }
        : { status: 'error', message: 'Missing' };
    },
    'Health Monitor': () => {
      const healthPath = path.join(BASE_DIR, 'tools/health-monitor.mjs');
      return fs.existsSync(healthPath)
        ? { status: 'operational', message: 'Available' }
        : { status: 'error', message: 'Missing' };
    },
    'Backup System': () => {
      const backupDir = path.join(BASE_DIR, '.backups');
      return fs.existsSync(backupDir)
        ? { status: 'operational', message: 'Ready' }
        : { status: 'warning', message: 'No backups yet' };
    },
    'Documentation': () => {
      const docsDir = path.join(BASE_DIR, 'docs');
      const docCount = fs.existsSync(docsDir)
        ? fs.readdirSync(docsDir, { recursive: true })
            .filter(f => f.endsWith('.md')).length
        : 0;
      return docCount > 0
        ? { status: 'operational', message: `${docCount} docs` }
        : { status: 'warning', message: 'No docs' };
    }
  };

  for (const [name, check] of Object.entries(systemChecks)) {
    status.systems[name] = check();
  }

  // Overall health
  const operational = Object.values(status.systems)
    .filter(s => s.status === 'operational').length;
  const total = Object.keys(status.systems).length;
  
  if (operational === total) {
    status.health = 'healthy';
  } else if (operational >= total * 0.8) {
    status.health = 'good';
  } else if (operational >= total * 0.5) {
    status.health = 'degraded';
  } else {
    status.health = 'unhealthy';
  }

  // Recommendations
  if (status.health !== 'healthy') {
    status.recommendations.push('Run health check: pppnpm run health:monitor:once');
  }

  return status;
}

function displayDashboard(status) {
  UserFeedback.section('System Status Dashboard');
  
  logger.info(`Status: ${getStatusIcon(status.health)} ${status.health.toUpperCase()}`);
  logger.info(`Time: ${new Date(status.timestamp).toLocaleString()}\n`);

  logger.info('Systems:');
  for (const [name, system] of Object.entries(status.systems)) {
    const icon = getStatusIcon(system.status);
    logger.info(`   ${icon} ${name}: ${system.message}`);
  }

  if (status.recommendations.length > 0) {
    logger.info('\n💡 Recommendations:');
    status.recommendations.forEach(rec => {
      logger.info(`   • ${rec}`);
    });
  }

  // Quick stats
  logger.info('\n📊 Quick Stats:');
  try {
    // Handle JSDoc header in package.json
    const packageJsonContent = fs.readFileSync(path.join(BASE_DIR, 'package.json'), 'utf-8');
    const jsonStart = packageJsonContent.indexOf('{');
    const packageJson = JSON.parse(packageJsonContent.substring(jsonStart));
    const scriptCount = Object.keys(packageJson.scripts || {}).length;
    logger.info(`   • Commands: ${scriptCount}`);
    
    const toolsDir = path.join(BASE_DIR, 'tools');
    const toolCount = fs.existsSync(toolsDir)
      ? fs.readdirSync(toolsDir).filter(f => f.endsWith('.mjs') || f.endsWith('.js')).length
      : 0;
    logger.info(`   • Tools: ${toolCount}`);
  } catch {
    // Ignore
  }
}

function getStatusIcon(status) {
  const icons = {
    'operational': '✅',
    'healthy': '✅',
    'good': '✅',
    'warning': '⚠️',
    'degraded': '⚠️',
    'error': '❌',
    'unhealthy': '❌',
    'unknown': '❓'
  };
  return icons[status] || '❓';
}

function showDashboard() {
  logger.info('🏛️✨ Status Dashboard');
  logger.info('=============================================\n');

  const status = getSystemStatus();
  displayDashboard(status);

  // Save status
  const statusPath = path.join(BASE_DIR, '.status.json');
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2), 'utf-8');
  logger.info(`\n📄 Status saved: .status.json`);

  logger.info('Dashboard displayed', { health: status.health });
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  showDashboard();
}

export { getSystemStatus, displayDashboard, showDashboard };

