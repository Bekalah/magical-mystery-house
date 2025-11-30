#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Nested Git Updater
 * Finds and updates all nested git repositories
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

logger.info('🔧 IMPROVEMENT: Creating Nested Git Updater');
logger.info('   → Finds all nested git repositories');
logger.info('   → Updates them automatically');
logger.info('   → Tracks nested repo status\n');

function findNestedGitRepos(baseDir, maxDepth = 10) {
  const gitRepos = [];
  const excludeDirs = ['node_modules', '.git', 'dist', '.turbo', 'build', '.next'];

  function search(currentDir, depth = 0, parentRepo = null) {
    if (depth > maxDepth) return;

    try {
      // Check if current directory is a git repo
      const gitDir = path.join(currentDir, '.git');
      if (fs.existsSync(gitDir)) {
        const stat = fs.statSync(gitDir);
        if (stat.isDirectory() || stat.isFile()) { // .git can be file (worktree) or dir
          try {
            const remoteUrl = execSync('git remote get-url origin', {
              cwd: currentDir,
              stdio: 'pipe',
              encoding: 'utf-8'
            }).trim();
            
            const branch = execSync('git branch --show-current', {
              cwd: currentDir,
              stdio: 'pipe',
              encoding: 'utf-8'
            }).trim();

            const status = execSync('git status --porcelain', {
              cwd: currentDir,
              stdio: 'pipe',
              encoding: 'utf-8'
            }).trim();

            gitRepos.push({
              path: currentDir,
              relativePath: path.relative(BASE_DIR, currentDir),
              remote: remoteUrl,
              branch,
              hasChanges: status.length > 0,
              parentRepo
            });

            parentRepo = currentDir; // Nested repos have this as parent
          } catch {
            // Not a valid git repo or can't read info
          }
        }
      }

      // Continue searching subdirectories
      const entries = fs.readdirSync(currentDir);
      for (const entry of entries) {
        if (entry.startsWith('.') && entry !== '.git') continue;
        if (excludeDirs.includes(entry)) continue;

        const fullPath = path.join(currentDir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Skip if we're already in a git repo and this is a submodule
          const isSubmodule = fs.existsSync(path.join(fullPath, '.git')) && 
                             fs.existsSync(path.join(currentDir, '.gitmodules'));
          
          if (!isSubmodule || !parentRepo) {
            search(fullPath, depth + 1, parentRepo);
          }
        }
      }
    } catch {
      // Skip directories we can't read
    }
  }

  search(baseDir);
  return gitRepos;
}

function updateNestedRepo(repo) {
  const results = {
    repo: repo.relativePath,
    actions: [],
    errors: [],
    warnings: []
  };

  try {
    // Check if remote exists and is accessible
    let remoteExists = false;
    try {
      execSync('git remote get-url origin', {
        cwd: repo.path,
        stdio: 'pipe',
        timeout: 5000
      });
      remoteExists = true;
    } catch {
      results.warnings.push('No remote origin configured');
      return results;
    }

    // Check if we have authentication (for private repos)
    const hasToken = !!process.env.GITHUB_TOKEN;
    
    // Try to fetch latest changes
    try {
      UserFeedback.info(`  Fetching: ${repo.relativePath}...`);
      
      // Use token if available for private repos
      const env = hasToken ? { ...process.env, GIT_ASKPASS: 'echo', GIT_TERMINAL_PROMPT: '0' } : process.env;
      
      execSync('git fetch origin', {
        cwd: repo.path,
        stdio: 'pipe',
        timeout: 30000,
        env
      });
      results.actions.push('fetched');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      // Handle common errors gracefully
      if (errorMsg.includes('Repository not found')) {
        results.warnings.push('Repository not found or not accessible (may be private or moved)');
      } else if (errorMsg.includes('Authentication failed') || errorMsg.includes('Permission denied')) {
        results.warnings.push('Authentication required (set GITHUB_TOKEN for private repos)');
      } else if (errorMsg.includes('not a git repository')) {
        results.warnings.push('Not a valid git repository');
      } else {
        results.errors.push(`Fetch failed: ${errorMsg}`);
      }
      return results; // Don't continue if fetch fails
    }

    // Check if behind (only if fetch succeeded)
    try {
      const behind = execSync(`git rev-list --count HEAD..origin/${repo.branch} 2>/dev/null || echo "0"`, {
        cwd: repo.path,
        stdio: 'pipe',
        encoding: 'utf-8',
        shell: true
      }).trim();

      if (parseInt(behind) > 0) {
        // Pull latest changes (only if no local changes)
        if (!repo.hasChanges) {
          UserFeedback.info(`  Pulling: ${repo.relativePath}...`);
          execSync(`git pull origin ${repo.branch}`, {
            cwd: repo.path,
            stdio: 'pipe',
            timeout: 30000
          });
          results.actions.push('pulled');
        } else {
          results.actions.push('skipped (has local changes)');
          results.warnings.push('Local changes detected - manual merge may be needed');
        }
      } else {
        results.actions.push('already up to date');
      }
    } catch (error) {
      // Branch might not exist remotely or other issues
      results.warnings.push(`Could not check for updates: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Update submodules if any
    if (fs.existsSync(path.join(repo.path, '.gitmodules'))) {
      UserFeedback.info(`  Updating submodules: ${repo.relativePath}...`);
      try {
        execSync('git submodule update --init --recursive', {
          cwd: repo.path,
          stdio: 'pipe',
          timeout: 60000
        });
        results.actions.push('submodules updated');
      } catch (error) {
        results.warnings.push(`Submodule update: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

  } catch (error) {
    results.errors.push(error instanceof Error ? error.message : String(error));
  }

  return results;
}

function updateAllNestedRepos() {
  logger.info('🏛️✨ Nested Git Repository Updater');
  logger.info('=============================================\n');

  UserFeedback.info('Scanning for nested git repositories...');
  const repos = findNestedGitRepos(BASE_DIR);
  
  logger.info(`Found ${repos.length} git repository(ies)\n`);

  if (repos.length === 0) {
    UserFeedback.info('No nested git repositories found');
    return { repos: [], updated: 0, errors: 0 };
  }

  // Display found repos
  logger.info('📁 Found repositories:');
  repos.forEach((repo, index) => {
    logger.info(`   ${index + 1}. ${repo.relativePath || '.'}`);
    logger.info(`      Branch: ${repo.branch}`);
    logger.info(`      Remote: ${repo.remote}`);
    logger.info(`      Changes: ${repo.hasChanges ? '⚠️  Yes' : '✅ None'}`);
    logger.info('');
  });

  // Update each repo
  const results = {
    repos: [],
    updated: 0,
    errors: 0,
    warnings: 0
  };

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    UserFeedback.step(i + 1, repos.length, `Updating: ${repo.relativePath || 'root'}`);

    const updateResult = updateNestedRepo(repo);
    results.repos.push(updateResult);

    if (updateResult.errors.length > 0) {
      results.errors++;
      UserFeedback.error(`Update had errors: ${updateResult.errors.join(', ')}`);
    } else if (updateResult.warnings.length > 0) {
      results.warnings++;
      UserFeedback.warning(`Update warnings: ${updateResult.warnings.join(', ')}`);
      if (updateResult.actions.length > 0) {
        results.updated++;
      }
    } else {
      results.updated++;
      UserFeedback.success(`Updated: ${updateResult.actions.join(', ')}`);
    }
  }

  logger.info('\n📊 Update Summary');
  logger.info('=============================================');
  logger.info(`Repositories found: ${repos.length}`);
  logger.info(`Successfully updated: ${results.updated}`);
  logger.info(`Warnings: ${results.warnings}`);
  logger.info(`Errors: ${results.errors}`);

  logger.info('Nested git repos updated', results);
  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  updateAllNestedRepos();
}

export { findNestedGitRepos, updateNestedRepo, updateAllNestedRepos };

