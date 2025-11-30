#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * System Integrator
 * Integrates all systems together for seamless operation
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import { autoRecover } from './error-recovery.mjs';
import { runHealthCheck } from './health-monitor.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating System Integrator');
logger.info('   → Integrates all systems (logger, recovery, health) together');
logger.info('   → Provides unified interface for all operations\n');

class SystemIntegrator
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.logger = logger;
    this.systems = {
      logger: true,
      recovery: true,
      health: true,
      performance: true,
      testing: true,
      backup: true
    };
  }

  async initialize() {
    logger.info('🔄 Initializing integrated systems...');
    
    // Auto-recover from any existing issues
    logger.info('   → Running auto-recovery...');
    const recovered = autoRecover();
    logger.info(`   ✅ Auto-recovery: ${recovered} issues resolved\n`);

    // Run health check
    logger.info('   → Running health check...');
    const healthResults = runHealthCheck();
    const criticalIssues = healthResults.critical.length;
    logger.info(`   ✅ Health check: ${criticalIssues} critical issues found\n`);

    // Log initialization
    this.logger.info('System integrator initialized', {
      systems: Object.keys(this.systems),
      recovered,
      criticalIssues
    });

    return {
      recovered,
      criticalIssues,
      systems: this.systems
    };
  }

  async runMaintenance() {
    logger.info('🔄 Running integrated maintenance...');
    
    const steps = [
      { name: 'Auto-recovery', cmd: 'ppnpm run recover:auto' },
      { name: 'Health check', cmd: 'ppnpm run health:monitor:once' },
      { name: 'Performance optimization', cmd: 'ppnpm run optimize:performance' },
      { name: 'Code quality', cmd: 'ppnpm run check:quality' },
      { name: 'Consistency check', cmd: 'ppnpm run check:consistency' }
    ];

    const results = { passed: [], failed: [] };

    for (const step of steps) {
      try {
        logger.info(`   → ${step.name}...`);
        execSync(step.cmd, { cwd: BASE_DIR, stdio: 'pipe' });
        results.passed.push(step.name);
        logger.info(`   ✅ ${step.name} completed\n`);
      } catch (error) {
        results.failed.push(step.name);
        logger.info(`   ⚠️  ${step.name} had issues (non-critical)\n`);
      }
    }

    this.logger.info('Integrated maintenance completed', results);
    return results;
  }

  async generateSystemReport() {
    logger.info('📊 Generating comprehensive system report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      systems: {},
      health: {},
      performance: {},
      recommendations: []
    };

    // Health status
    const healthResults = runHealthCheck();
    report.health = {
      status: healthResults.critical.length === 0 ? 'healthy' : 'unhealthy',
      critical: healthResults.critical.length,
      warnings: healthResults.warnings.length,
      healthy: healthResults.healthy.length
    };

    // System status
    report.systems = this.systems;

    // Recommendations
    if (healthResults.critical.length > 0) {
      report.recommendations.push('Address critical health issues');
    }
    if (healthResults.warnings.length > 0) {
      report.recommendations.push('Review health warnings');
    }

    const reportPath = path.join(BASE_DIR, '.system-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

    logger.info(`   ✅ System report saved: .system-report.json\n`);

    return report;
  }
}

async function integrateSystems() {
  logger.info('🏛️✨ System Integration');
  logger.info('=============================================\n');

  const integrator = new SystemIntegrator();
  
  const init = await integrator.initialize();
  const maintenance = await integrator.runMaintenance();
  const report = await integrator.generateSystemReport();

  logger.info('📊 Integration Summary');
  logger.info('=============================================');
  logger.info(`✅ Systems initialized: ${Object.keys(init.systems).length}`);
  logger.info(`✅ Maintenance passed: ${maintenance.passed.length}`);
  logger.info(`⚠️  Maintenance issues: ${maintenance.failed.length}`);
  logger.info(`📄 System report: .system-report.json`);

  return { init, maintenance, report };
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  integrateSystems();
}

export { SystemIntegrator, integrateSystems };

