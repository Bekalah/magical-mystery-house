/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Deployment Report
 * Reports on live sites, deployments, and fixes
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
const USER_HOME = process.env.HOME || process.env.USERPROFILE;

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Deployment Report');
logger.info('   → Reports live sites');
logger.info('   → Shows deployment status');
logger.info('   → Documents fixes made\n');

// Known Cathedral deployments
const DEPLOYMENTS = [
  {
    name: 'Cathedral Main',
    repo: 'cathedral-real',
    localPath: path.join(USER_HOME, 'cathedral-real'),
    githubRepo: 'Bekalah/cathedral-master',
    expectedUrl: 'https://bekalah.github.io/cathedral-master',
    type: 'GitHub Pages',
    status: 'unknown'
  },
  {
    name: 'Cathedral Deployment',
    repo: 'cathedral-master-deployment',
    localPath: path.join(USER_HOME, 'cathedral-master-deployment'),
    githubRepo: 'Bekalah/cathedral-master-deployment',
    expectedUrl: 'https://bekalah.github.io/cathedral-master-deployment',
    type: 'GitHub Pages',
    status: 'unknown'
  },
  {
    name: 'Cathedral Fixed Clean',
    repo: 'cathedral-fixed-clean',
    localPath: path.join(USER_HOME, 'cathedral-fixed-clean'),
    githubRepo: 'Bekalah/cathedral',
    expectedUrl: 'https://bekalah.github.io/cathedral',
    type: 'GitHub Pages / Cloudflare',
    status: 'unknown'
  }
];

// Deployment fixes made
const FIXES = [
  {
    date: '2025-11-27',
    deployment: 'GitHub Actions CI/CD',
    issue: 'pnpm version mismatch, Node.js version issues, caching problems',
    fix: 'Updated to pnpm 9, Node.js 25.2, added proper caching, improved error handling',
    status: 'fixed'
  },
  {
    date: '2025-11-27',
    deployment: 'GitHub Authentication',
    issue: 'Replit-specific authentication, missing token handling',
    fix: 'Created universal GitHub auth helper, supports both Replit and standard tokens',
    status: 'fixed'
  },
  {
    date: '2025-11-27',
    deployment: 'Repository Connections',
    issue: 'Incorrect remote URLs, missing connections',
    fix: 'Fixed all git remotes, verified connections, added repository connector tool',
    status: 'fixed'
  },
  {
    date: '2025-11-27',
    deployment: 'Build Process',
    issue: 'TypeScript compilation errors, module resolution issues',
    fix: 'Fixed tsconfig.json, improved module resolution, added proper type safety',
    status: 'fixed'
  },
  {
    date: '2025-11-27',
    deployment: 'Code Quality',
    issue: 'Type safety issues, console.logs in production, missing error handling',
    fix: 'Fixed all any types, replaced console.logs with logger, improved error handling',
    status: 'fixed'
  }
];

function checkDeployment(deployment) {
  const result = {
    ...deployment,
    localExists: false,
    hasGit: false,
    hasWorkflows: false,
    remoteConfigured: false,
    workflows: []
  };

  // Check local repository
  if (fs.existsSync(deployment.localPath)) {
    result.localExists = true;

    // Check git
    const gitDir = path.join(deployment.localPath, '.git');
    if (fs.existsSync(gitDir)) {
      result.hasGit = true;

      // Check remote
      try {
        const remote = execSync('git remote get-url origin', {
          cwd: deployment.localPath,
          stdio: 'pipe',
          encoding: 'utf-8'
        }).trim();
        
        if (remote.includes(deployment.githubRepo.split('/')[1])) {
          result.remoteConfigured = true;
        }
      } catch {
        // Remote not configured
      }
    }

    // Check workflows
    const workflowsDir = path.join(deployment.localPath, '.github', 'workflows');
    if (fs.existsSync(workflowsDir)) {
      result.hasWorkflows = true;
      try {
        result.workflows = fs.readdirSync(workflowsDir)
          .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
      } catch {
        // Can't read workflows
      }
    }
  }

  return result;
}

function generateDeploymentReport() {
  logger.info('🏛️✨ Deployment Report');
  logger.info('=============================================\n');

  UserFeedback.section('Live Sites & Deployments');

  const results = DEPLOYMENTS.map(checkDeployment);

  for (const deployment of results) {
    logger.info(`\n📦 ${deployment.name}`);
    logger.info(`   Type: ${deployment.type}`);
    logger.info(`   Expected URL: ${deployment.expectedUrl}`);
    logger.info(`   Local: ${deployment.localExists ? '✅ Exists' : '❌ Missing'}`);
    logger.info(`   Git: ${deployment.hasGit ? '✅ Configured' : '❌ Not configured'}`);
    logger.info(`   Remote: ${deployment.remoteConfigured ? '✅ Connected' : '⚠️  Not connected'}`);
    logger.info(`   Workflows: ${deployment.hasWorkflows ? `✅ ${deployment.workflows.length} workflow(s)` : '❌ None'}`);
    if (deployment.workflows.length > 0) {
      deployment.workflows.forEach(wf => {
        logger.info(`      • ${wf}`);
      });
    }
  }

  UserFeedback.section('Deployment Fixes Made');

  for (const fix of FIXES) {
    logger.info(`\n📅 ${fix.date} - ${fix.deployment}`);
    logger.info(`   Issue: ${fix.issue}`);
    logger.info(`   Fix: ${fix.fix}`);
    logger.info(`   Status: ${fix.status === 'fixed' ? '✅ Fixed' : '⚠️  In progress'}`);
  }

  // Check CI/CD status
  UserFeedback.section('CI/CD Status');

  const ciWorkflow = path.join(BASE_DIR, '.github', 'workflows', 'ci.yml');
  if (fs.existsSync(ciWorkflow)) {
    logger.info('\n✅ CI/CD Workflow: Configured');
    try {
      const workflowContent = fs.readFileSync(ciWorkflow, 'utf-8');
      const hasPnpm = workflowContent.includes('pnpm');
      const hasNode = workflowContent.includes('node-version');
      const hasCache = workflowContent.includes('cache');
      
      logger.info(`   pnpm setup: ${hasPnpm ? '✅' : '❌'}`);
      logger.info(`   Node.js setup: ${hasNode ? '✅' : '❌'}`);
      logger.info(`   Caching: ${hasCache ? '✅' : '❌'}`);
    } catch {
      // Can't read workflow
    }
  } else {
    logger.info('\n⚠️  CI/CD Workflow: Not found');
  }

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    deployments: results,
    fixes: FIXES,
    summary: {
      totalDeployments: results.length,
      configured: results.filter(r => r.remoteConfigured).length,
      withWorkflows: results.filter(r => r.hasWorkflows).length,
      fixesApplied: FIXES.filter(f => f.status === 'fixed').length
    }
  };

  const reportPath = path.join(BASE_DIR, '.deployment-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  logger.info('\n📊 Summary');
  logger.info('=============================================');
  logger.info(`Total deployments: ${report.summary.totalDeployments}`);
  logger.info(`Configured: ${report.summary.configured}`);
  logger.info(`With workflows: ${report.summary.withWorkflows}`);
  logger.info(`Fixes applied: ${report.summary.fixesApplied}`);
  logger.info(`\n📄 Full report: .deployment-report.json`);

  logger.info('Deployment report generated', report.summary);
  return report;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  generateDeploymentReport();
}

export { checkDeployment, generateDeploymentReport, DEPLOYMENTS, FIXES };

