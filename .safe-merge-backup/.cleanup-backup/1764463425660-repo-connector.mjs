#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */

/**
 * Repository Connector
 * Ensures repositories are properly connected, free, and high standard
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

logger.info('🔧 IMPROVEMENT: Creating Repository Connector');
logger.info('   → Ensures repos are properly connected');
logger.info('   → Verifies they are free/open source');
logger.info('   → Maintains high standards');
logger.info('   → Quality over quantity\n');

// Your main Cathedral repositories (quality, not quantity)
const MAIN_REPOS = [
  {
    name: 'cathedral-master-deployment',
    path: path.join(USER_HOME, 'cathedral-master-deployment'),
    description: 'Main deployment and tooling repository',
    priority: 'critical'
  },
  {
    name: 'cathedral-real',
    path: path.join(USER_HOME, 'cathedral-real'),
    description: 'Main Cathedral codebase',
    priority: 'critical'
  },
  {
    name: 'cathedral-fixed-clean',
    path: path.join(USER_HOME, 'cathedral-fixed-clean'),
    description: 'Cleaned and fixed Cathedral code',
    priority: 'high'
  },
  {
    name: 'cosmogenesis-engine',
    path: path.join(USER_HOME, 'cosmogenesis-engine'),
    description: 'Cosmogenesis engine core',
    priority: 'high'
  }
];

function checkRepoConnection(repo) {
  const results = {
    name: repo.name,
    path: repo.path,
    connected: false,
    issues: [],
    fixes: []
  };

  if (!fs.existsSync(repo.path)) {
    results.issues.push('Repository directory does not exist');
    return results;
  }

  const gitDir = path.join(repo.path, '.git');
  if (!fs.existsSync(gitDir)) {
    results.issues.push('Not a git repository');
    results.fixes.push('Initialize git: git init');
    return results;
  }

  try {
    // Check remote
    const remotes = execSync('git remote -v', {
      cwd: repo.path,
      stdio: 'pipe',
      encoding: 'utf-8'
    }).trim();

    if (!remotes || !remotes.includes('origin')) {
      results.issues.push('No origin remote configured');
      results.fixes.push('Add remote: git remote add origin <url>');
    } else {
      results.connected = true;
      
      // Check if remote is GitHub and public
      const originUrl = execSync('git remote get-url origin', {
        cwd: repo.path,
        stdio: 'pipe',
        encoding: 'utf-8'
      }).trim();

      if (originUrl.includes('github.com')) {
        // Verify it's your Cathedral work
        if (!originUrl.includes('Bekalah') && !originUrl.includes('cathedral')) {
          results.issues.push('Remote URL does not match Cathedral work');
        }
      }
    }

    // Check branch
    try {
      const branch = execSync('git branch --show-current', {
        cwd: repo.path,
        stdio: 'pipe',
        encoding: 'utf-8'
      }).trim();
      
      if (!branch) {
        results.issues.push('No branch checked out');
      }
    } catch {
      results.issues.push('Could not determine current branch');
    }

    // Check for proper structure
    const packageJson = path.join(repo.path, 'package.json');
    if (!fs.existsSync(packageJson)) {
      results.issues.push('Missing package.json (not a Node.js project)');
    }

    // Check for README
    const readme = path.join(repo.path, 'README.md');
    if (!fs.existsSync(readme)) {
      results.issues.push('Missing README.md');
      results.fixes.push('Create README.md with project description');
    }

    // Check for license (free/open source)
    const licenseFiles = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];
    const hasLicense = licenseFiles.some(lic => fs.existsSync(path.join(repo.path, lic)));
    if (!hasLicense) {
      results.issues.push('Missing LICENSE file (needed for free/open source)');
      results.fixes.push('Add LICENSE file (CC0-1.0 recommended for Cathedral)');
    }

  } catch (error) {
    results.issues.push(`Error checking repo: ${error instanceof Error ? error.message : String(error)}`);
  }

  return results;
}

function ensureHighStandards(repo) {
  const standards = {
    name: repo.name,
    checks: [],
    fixes: []
  };

  const repoPath = repo.path;
  if (!fs.existsSync(repoPath)) {
    return standards;
  }

  // Check 1: Has proper .gitignore
  const gitignore = path.join(repoPath, '.gitignore');
  if (!fs.existsSync(gitignore)) {
    standards.checks.push({ item: '.gitignore', status: 'missing', priority: 'high' });
    standards.fixes.push('Create .gitignore file');
  }

  // Check 2: Has proper structure
  const hasSrc = fs.existsSync(path.join(repoPath, 'src')) || 
                 fs.existsSync(path.join(repoPath, 'packages')) ||
                 fs.existsSync(path.join(repoPath, 'tools'));
  if (!hasSrc) {
    standards.checks.push({ item: 'Source structure', status: 'unclear', priority: 'medium' });
  }

  // Check 3: Has documentation
  const hasDocs = fs.existsSync(path.join(repoPath, 'docs')) ||
                  fs.existsSync(path.join(repoPath, 'README.md'));
  if (!hasDocs) {
    standards.checks.push({ item: 'Documentation', status: 'missing', priority: 'high' });
    standards.fixes.push('Add documentation directory or comprehensive README');
  }

  // Check 4: Has proper package.json
  const packageJson = path.join(repoPath, 'package.json');
  if (fs.existsSync(packageJson)) {
    try {
      // Handle JSDoc header in package.json
      const pkgContent = fs.readFileSync(packageJson, 'utf-8');
      const jsonStart = pkgContent.indexOf('{');
      const pkg = JSON.parse(pkgContent.substring(jsonStart));
      
      if (!pkg.license) {
        standards.checks.push({ item: 'Package license', status: 'missing', priority: 'high' });
        standards.fixes.push('Add "license": "CC0-1.0" to package.json');
      }
      
      if (!pkg.description) {
        standards.checks.push({ item: 'Package description', status: 'missing', priority: 'medium' });
      }
    } catch {
      // Invalid package.json
    }
  }

  return standards;
}

function connectRepositories() {
  logger.info('🏛️✨ Repository Connection & Standards Check');
  logger.info('=============================================\n');

  const results = {
    repos: [],
    connected: 0,
    issues: 0,
    standards: []
  };

  for (const repo of MAIN_REPOS) {
    UserFeedback.info(`Checking: ${repo.name} (${repo.priority} priority)`);
    
    const connection = checkRepoConnection(repo);
    const standards = ensureHighStandards(repo);
    
    results.repos.push({
      ...connection,
      standards: standards.checks,
      fixes: [...connection.fixes, ...standards.fixes]
    });

    if (connection.connected && connection.issues.length === 0) {
      results.connected++;
      UserFeedback.success(`${repo.name}: Connected and ready`);
    } else {
      results.issues++;
      if (connection.issues.length > 0) {
        UserFeedback.warning(`${repo.name}: ${connection.issues.length} issue(s)`);
        connection.issues.forEach(issue => {
          logger.info(`   ⚠️  ${issue}`);
        });
      }
      if (connection.fixes.length > 0 || standards.fixes.length > 0) {
        logger.info(`   💡 Fixes needed:`);
        [...connection.fixes, ...standards.fixes].forEach(fix => {
          logger.info(`      • ${fix}`);
        });
      }
    }
    logger.info('');
  }

  logger.info('\n📊 Connection Summary');
  logger.info('=============================================');
  logger.info(`Repositories checked: ${MAIN_REPOS.length}`);
  logger.info(`Fully connected: ${results.connected}`);
  logger.info(`Issues found: ${results.issues}`);

  // Save report
  const reportPath = path.join(BASE_DIR, '.repo-connection-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  logger.info(`\n📄 Report saved: .repo-connection-report.json`);

  logger.info('Repository connection check completed', {
    checked: MAIN_REPOS.length,
    connected: results.connected,
    issues: results.issues
  });

  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  connectRepositories();
}

export { checkRepoConnection, ensureHighStandards, connectRepositories, MAIN_REPOS };

