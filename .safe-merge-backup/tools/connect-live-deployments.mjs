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
 * Connect Live Deployments Tool
 * Ensures all repositories are connected to their live deployed sites
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

logger.info('🔧 IMPROVEMENT: Creating Connect Live Deployments Tool');
logger.info('   → Connects repositories to live deployed sites');
logger.info('   → Verifies GitHub Pages configuration');
logger.info('   → Ensures deployment workflows are active\n');

const LIVE_DEPLOYMENTS = [
  {
    name: 'Cathedral Main',
    repo: 'cathedral-real',
    localPath: path.join(USER_HOME, 'cathedral-real'),
    githubRepo: 'Bekalah/cathedral-master',
    githubUrl: 'https://github.com/Bekalah/cathedral-master',
    liveUrl: 'https://bekalah.github.io/cathedral-master',
    expectedRemote: 'https://github.com/Bekalah/cathedral-master.git'
  },
  {
    name: 'Cathedral Deployment',
    repo: 'cathedral-master-deployment',
    localPath: BASE_DIR,
    githubRepo: 'Bekalah/cathedral-master-deployment',
    githubUrl: 'https://github.com/Bekalah/cathedral-master-deployment',
    liveUrl: 'https://bekalah.github.io/cathedral-master-deployment',
    expectedRemote: 'https://github.com/Bekalah/cathedral-master-deployment.git'
  },
  {
    name: 'Cathedral Fixed Clean',
    repo: 'cathedral-fixed-clean',
    localPath: path.join(USER_HOME, 'cathedral-fixed-clean'),
    githubRepo: 'Bekalah/cathedral',
    githubUrl: 'https://github.com/Bekalah/cathedral',
    liveUrl: 'https://bekalah.github.io/cathedral',
    expectedRemote: 'https://github.com/Bekalah/cathedral.git'
  }
];

function checkRepository(deployment) {
  const result = {
    ...deployment,
    localExists: false,
    hasGit: false,
    remoteCorrect: false,
    hasDeployWorkflow: false,
    workflowConfigured: false,
    issues: []
  };

  // Check if local repository exists
  if (!fs.existsSync(deployment.localPath)) {
    result.issues.push(`Local repository does not exist: ${deployment.localPath}`);
    return result;
  }

  result.localExists = true;

  // Check if it's a git repository
  const gitDir = path.join(deployment.localPath, '.git');
  if (!fs.existsSync(gitDir)) {
    result.issues.push('Not a git repository');
    return result;
  }

  result.hasGit = true;

  // Check remote URL
  try {
    const remote = execSync('git remote get-url origin', {
      cwd: deployment.localPath,
      stdio: 'pipe',
      encoding: 'utf-8'
    }).trim();

    if (remote === deployment.expectedRemote || remote.includes(deployment.githubRepo.split('/')[1])) {
      result.remoteCorrect = true;
    } else {
      result.issues.push(`Incorrect remote URL. Expected: ${deployment.expectedRemote}, Found: ${remote}`);
    }
  } catch (error) {
    result.issues.push(`Failed to get remote URL: ${error.message}`);
  }

  // Check for deployment workflow
  const workflowsDir = path.join(deployment.localPath, '.github', 'workflows');
  if (fs.existsSync(workflowsDir)) {
    const workflows = fs.readdirSync(workflowsDir)
      .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
    
    const deployWorkflows = workflows.filter(wf => 
      wf.includes('deploy') || wf.includes('pages') || wf.includes('gh-pages')
    );

    if (deployWorkflows.length > 0) {
      result.hasDeployWorkflow = true;
      
      // Check if workflow has GitHub Pages deployment
      for (const workflow of deployWorkflows) {
        const workflowPath = path.join(workflowsDir, workflow);
        try {
          const content = fs.readFileSync(workflowPath, 'utf-8');
          if (content.includes('actions-gh-pages') || content.includes('gh-pages') || content.includes('GitHub Pages')) {
            result.workflowConfigured = true;
            break;
          }
        } catch {
          // Can't read workflow
        }
      }
    } else {
      result.issues.push('No deployment workflow found');
    }
  } else {
    result.issues.push('.github/workflows directory does not exist');
  }

  return result;
}

function fixRepository(deployment) {
  const fixes = [];

  if (!deployment.localExists) {
    return { fixed: false, fixes: ['Cannot fix: local repository does not exist'] };
  }

  // Fix remote URL if incorrect
  if (!deployment.remoteCorrect && deployment.hasGit) {
    try {
      execSync(`git remote set-url origin ${deployment.expectedRemote}`, {
        cwd: deployment.localPath,
        stdio: 'pipe'
      });
      fixes.push(`Fixed remote URL to: ${deployment.expectedRemote}`);
    } catch (error) {
      fixes.push(`Failed to fix remote URL: ${error.message}`);
    }
  }

  // Ensure .github/workflows directory exists
  const workflowsDir = path.join(deployment.localPath, '.github', 'workflows');
  if (!fs.existsSync(workflowsDir)) {
    fs.mkdirSync(workflowsDir, { recursive: true });
    fixes.push('Created .github/workflows directory');
  }

  return { fixed: fixes.length > 0, fixes };
}

async function connectLiveDeployments() {
  UserFeedback.section('Connect Live Deployments');

  const results = [];
  let allConnected = true;

  for (const deployment of LIVE_DEPLOYMENTS) {
    UserFeedback.info(`\nChecking: ${deployment.name}`);
    const result = checkRepository(deployment);
    results.push(result);

    logger.info(`  Local: ${result.localExists ? '✅' : '❌'}`);
    logger.info(`  Git: ${result.hasGit ? '✅' : '❌'}`);
    logger.info(`  Remote: ${result.remoteCorrect ? '✅' : '❌'}`);
    logger.info(`  Deploy Workflow: ${result.hasDeployWorkflow ? '✅' : '❌'}`);
    logger.info(`  Workflow Configured: ${result.workflowConfigured ? '✅' : '❌'}`);
    logger.info(`  Live URL: ${deployment.liveUrl}`);

    if (result.issues.length > 0) {
      allConnected = false;
      UserFeedback.warning(`  Issues found: ${result.issues.length}`);
      result.issues.forEach(issue => {
        logger.warn(`    - ${issue}`);
      });

      // Attempt to fix
      UserFeedback.info('  Attempting to fix...');
      const fixResult = fixRepository(result);
      if (fixResult.fixed) {
        fixResult.fixes.forEach(fix => {
          logger.info(`    ✅ ${fix}`);
        });
      }
    } else {
      UserFeedback.success(`  ✅ ${deployment.name} is properly connected`);
    }
  }

  UserFeedback.section('Connection Summary');
  const connectedCount = results.filter(r => r.remoteCorrect && r.workflowConfigured).length;
  logger.info(`Total deployments: ${LIVE_DEPLOYMENTS.length}`);
  logger.info(`Fully connected: ${connectedCount}`);
  logger.info(`Issues found: ${results.reduce((sum, r) => sum + r.issues.length, 0)}`);

  // Generate connection report
  const report = {
    timestamp: new Date().toISOString(),
    deployments: results.map(r => ({
      name: r.name,
      liveUrl: r.liveUrl,
      connected: r.remoteCorrect && r.workflowConfigured,
      issues: r.issues
    })),
    summary: {
      total: LIVE_DEPLOYMENTS.length,
      connected: connectedCount,
      needsAttention: LIVE_DEPLOYMENTS.length - connectedCount
    }
  };

  const reportPath = path.join(BASE_DIR, '.live-deployments-connection.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  logger.info(`\n📄 Connection report saved: ${reportPath}`);

  if (allConnected && connectedCount === LIVE_DEPLOYMENTS.length) {
    UserFeedback.success('\n✅ All deployments are properly connected to live sites!');
  } else {
    UserFeedback.warning('\n⚠️  Some deployments need attention. See report above.');
  }

  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  connectLiveDeployments();
}

export { connectLiveDeployments, checkRepository, LIVE_DEPLOYMENTS };

