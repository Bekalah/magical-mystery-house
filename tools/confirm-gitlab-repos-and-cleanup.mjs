#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Confirm GitLab Repos & Cleanup
 * - Identifies repos that need GitLab upload/clone
 * - Cleans up duplicate/incorrect paths
 * - Updates info to correct info
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPORT_FILE = path.join(rootDir, 'GITLAB_REPOS_CLEANUP.json');

// Get all git remotes
function getGitRemotes() {
  const remotes = {};
  try {
    const output = execSync('git remote -v', { 
      cwd: rootDir, 
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    
    for (const line of output.split('\n')) {
      if (line.trim()) {
        const match = line.match(/(\S+)\s+(\S+)\s+\((fetch|push)\)/);
        if (match) {
          const [, name, url, type] = match;
          if (!remotes[name]) {
            remotes[name] = { url, fetch: null, push: null, isGitHub: false, isGitLab: false };
          }
          remotes[name][type] = url;
          if (url.includes('github.com')) remotes[name].isGitHub = true;
          if (url.includes('gitlab.com')) remotes[name].isGitLab = true;
        }
      }
    }
  } catch (e) {}
  return remotes;
}

// Find repo local paths
function findRepoPaths(remoteName) {
  const paths = [];
  const possiblePaths = [
    { path: path.join(rootDir, '.remote-repos', remoteName), type: 'remote-repos' },
    { path: path.join(rootDir, 'packages', remoteName), type: 'packages' },
    { path: path.join(rootDir, 'packages', remoteName.replace('cathedral-', '').replace('_', '-')), type: 'packages-alt' },
    { path: path.join(rootDir, 'apps', remoteName), type: 'apps' },
    { path: path.join(rootDir, 'apps', remoteName.replace('cathedral-', '').replace('_', '-')), type: 'apps-alt' }
  ];

  for (const possible of possiblePaths) {
    if (fs.existsSync(possible.path)) {
      const gitPath = path.join(possible.path, '.git');
      if (fs.existsSync(gitPath)) {
        paths.push({ ...possible, isGitRepo: true });
      } else {
        paths.push({ ...possible, isGitRepo: false });
      }
    }
  }
  return paths;
}

// Determine correct path
function determineCorrectPath(remoteName, remoteUrl, existingPaths) {
  // Core sacred systems should be in packages
  const coreSystems = ['circuitum99', 'codex-14499', 'codex_14499', 'stone-grimoire', 'stone_grimoire', 
                       'liber-arcanae', 'liber_arcanae', 'magical-mystery-house', 'magical_mystery_house',
                       'cosmogenesis-learning-engine', 'cosmogenesis_learning_engine'];
  
  // Apps should be in apps
  const appNames = ['liber-arcanae-tarot', 'web', 'test-ground', 'tarot-arena', 'synth-lab', 
                    'cathedral-unity', 'mystical-treasure-hunt', 'frontend', 'learning-device'];
  
  const normalizedName = remoteName.replace('_', '-').replace('cathedral-', '');
  
  if (coreSystems.includes(normalizedName) || coreSystems.includes(remoteName)) {
    return {
      correct: path.join(rootDir, 'packages', normalizedName.replace('_', '-')),
      type: 'package',
      reason: 'Core sacred system'
    };
  }
  
  if (appNames.includes(normalizedName) || appNames.includes(remoteName)) {
    return {
      correct: path.join(rootDir, 'apps', normalizedName.replace('_', '-')),
      type: 'app',
      reason: 'Application'
    };
  }
  
  // Default to packages for cathedral-* repos
  if (remoteName.startsWith('cathedral_') || remoteName.startsWith('cathedral-')) {
    return {
      correct: path.join(rootDir, 'packages', normalizedName.replace('cathedral-', '').replace('_', '-')),
      type: 'package',
      reason: 'Cathedral package'
    };
  }
  
  // Use first existing path if found
  if (existingPaths.length > 0) {
    const gitRepo = existingPaths.find(p => p.isGitRepo);
    if (gitRepo) {
      return {
        correct: gitRepo.path,
        type: gitRepo.type,
        reason: 'Existing git repo'
      };
    }
    return {
      correct: existingPaths[0].path,
      type: existingPaths[0].type,
      reason: 'Existing path'
    };
  }
  
  // Default to packages
  return {
    correct: path.join(rootDir, 'packages', normalizedName),
    type: 'package',
    reason: 'Default location'
  };
}

// Check if repo needs GitLab
function needsGitLab(remote) {
  // If already on GitLab, no need
  if (remote.isGitLab) return false;
  
  // Core repos that should be on GitLab
  const coreRepos = ['circuitum99', 'codex-14499', 'codex_14499', 'stone-grimoire', 'stone_grimoire',
                     'liber-arcanae', 'liber_arcanae', 'magical-mystery-house', 'magical_mystery_house',
                     'cosmogenesis-learning-engine', 'cosmogenesis_learning_engine',
                     'cathedral-master', 'cathedral_master', 'cathedral', 'tesseract-bridge', 'tesseract_bridge'];
  
  const normalizedName = remote.url.split('/').pop()?.replace('.git', '') || '';
  return coreRepos.some(core => normalizedName.includes(core) || remote.url.includes(core));
}

// Generate GitLab URL
function generateGitLabUrl(remoteUrl) {
  // Convert GitHub URL to GitLab URL
  if (remoteUrl.includes('github.com')) {
    return remoteUrl.replace('github.com', 'gitlab.com').replace('Bekalah/', 'bekalah/');
  }
  // If already GitLab, return as is
  if (remoteUrl.includes('gitlab.com')) {
    return remoteUrl;
  }
  // Generate new GitLab URL
  const repoName = remoteUrl.split('/').pop()?.replace('.git', '') || 'unknown';
  return `https://gitlab.com/bekalah/${repoName}.git`;
}

// Main function
async function main() {
  console.log('🔍 Confirming repos for GitLab and cleaning up paths...');
  console.log('');

  const remotes = getGitRemotes();
  console.log(`Found ${Object.keys(remotes).length} git remotes`);
  console.log('');

  const analysis = {
    repos: {},
    gitlab: {
      needsUpload: [],
      needsClone: [],
      alreadyOnGitLab: []
    },
    cleanup: {
      duplicates: [],
      incorrectPaths: [],
      missingPaths: []
    },
    corrections: []
  };

  for (const [remoteName, remoteInfo] of Object.entries(remotes)) {
    console.log(`📚 Analyzing ${remoteName}...`);
    
    const repoAnalysis = {
      remoteName,
      remoteUrl: remoteInfo.url,
      isGitHub: remoteInfo.isGitHub,
      isGitLab: remoteInfo.isGitLab,
      existingPaths: [],
      correctPath: null,
      needsGitLab: false,
      gitLabUrl: null,
      issues: [],
      actions: []
    };

    // Find existing paths
    repoAnalysis.existingPaths = findRepoPaths(remoteName);
    
    // Determine correct path
    const correctPath = determineCorrectPath(remoteName, remoteInfo.url, repoAnalysis.existingPaths);
    repoAnalysis.correctPath = correctPath;

    // Check if needs GitLab
    repoAnalysis.needsGitLab = needsGitLab(remoteInfo);
    if (repoAnalysis.needsGitLab) {
      repoAnalysis.gitLabUrl = generateGitLabUrl(remoteInfo.url);
      if (remoteInfo.isGitLab) {
        analysis.gitlab.alreadyOnGitLab.push({
          name: remoteName,
          url: remoteInfo.url
        });
      } else {
        analysis.gitlab.needsUpload.push({
          name: remoteName,
          githubUrl: remoteInfo.url,
          gitlabUrl: repoAnalysis.gitLabUrl,
          localPath: repoAnalysis.existingPaths.find(p => p.isGitRepo)?.path || correctPath.correct
        });
      }
    }

    // Check for issues
    if (repoAnalysis.existingPaths.length === 0) {
      repoAnalysis.issues.push('No local path found');
      analysis.cleanup.missingPaths.push({
        remote: remoteName,
        correctPath: correctPath.correct,
        action: 'clone'
      });
      repoAnalysis.actions.push(`Clone to ${correctPath.correct}`);
    } else if (repoAnalysis.existingPaths.length > 1) {
      repoAnalysis.issues.push('Multiple paths found');
      analysis.cleanup.duplicates.push({
        remote: remoteName,
        paths: repoAnalysis.existingPaths,
        correctPath: correctPath.correct
      });
      repoAnalysis.actions.push(`Keep ${correctPath.correct}, remove others`);
    } else {
      const existing = repoAnalysis.existingPaths[0];
      if (existing.path !== correctPath.correct) {
        repoAnalysis.issues.push('Incorrect path');
        analysis.cleanup.incorrectPaths.push({
          remote: remoteName,
          current: existing.path,
          correct: correctPath.correct,
          action: 'move'
        });
        repoAnalysis.actions.push(`Move from ${existing.path} to ${correctPath.correct}`);
      }
    }

    analysis.repos[remoteName] = repoAnalysis;

    console.log(`   URL: ${remoteInfo.url}`);
    console.log(`   GitHub: ${remoteInfo.isGitHub}, GitLab: ${remoteInfo.isGitLab}`);
    console.log(`   Existing paths: ${repoAnalysis.existingPaths.length}`);
    console.log(`   Correct path: ${correctPath.correct}`);
    console.log(`   Needs GitLab: ${repoAnalysis.needsGitLab}`);
    if (repoAnalysis.needsGitLab && !remoteInfo.isGitLab) {
      console.log(`   GitLab URL: ${repoAnalysis.gitLabUrl}`);
    }
    if (repoAnalysis.issues.length > 0) {
      console.log(`   Issues: ${repoAnalysis.issues.join(', ')}`);
    }
    if (repoAnalysis.actions.length > 0) {
      console.log(`   Actions: ${repoAnalysis.actions.join(', ')}`);
    }
    console.log('');
  }

  // Generate corrections
  for (const [remoteName, repoAnalysis] of Object.entries(analysis.repos)) {
    if (repoAnalysis.actions.length > 0) {
      analysis.corrections.push({
        remote: remoteName,
        actions: repoAnalysis.actions,
        correctPath: repoAnalysis.correctPath,
        gitLabUrl: repoAnalysis.gitLabUrl
      });
    }
  }

  // Summary
  const summary = {
    totalRepos: Object.keys(remotes).length,
    needsGitLabUpload: analysis.gitlab.needsUpload.length,
    alreadyOnGitLab: analysis.gitlab.alreadyOnGitLab.length,
    duplicates: analysis.cleanup.duplicates.length,
    incorrectPaths: analysis.cleanup.incorrectPaths.length,
    missingPaths: analysis.cleanup.missingPaths.length,
    totalCorrections: analysis.corrections.length
  };

  // Write report
  const report = {
    timestamp: new Date().toISOString(),
    summary,
    analysis
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  console.log('📊 Summary:');
  console.log(`   - Total Repos: ${summary.totalRepos}`);
  console.log(`   - Need GitLab Upload: ${summary.needsGitLabUpload}`);
  console.log(`   - Already on GitLab: ${summary.alreadyOnGitLab}`);
  console.log(`   - Duplicates: ${summary.duplicates}`);
  console.log(`   - Incorrect Paths: ${summary.incorrectPaths}`);
  console.log(`   - Missing Paths: ${summary.missingPaths}`);
  console.log(`   - Total Corrections: ${summary.totalCorrections}`);
  console.log('');

  console.log('📤 Repos That Need GitLab Upload:');
  for (const repo of analysis.gitlab.needsUpload) {
    console.log(`   - ${repo.name}`);
    console.log(`     GitHub: ${repo.githubUrl}`);
    console.log(`     GitLab: ${repo.gitlabUrl}`);
    console.log(`     Local: ${repo.localPath}`);
    console.log('');
  }

  console.log('🔧 Path Corrections Needed:');
  for (const correction of analysis.corrections.slice(0, 10)) {
    console.log(`   - ${correction.remote}:`);
    for (const action of correction.actions) {
      console.log(`     • ${action}`);
    }
    if (correction.gitLabUrl) {
      console.log(`     • Add GitLab remote: ${correction.gitLabUrl}`);
    }
    console.log('');
  }

  if (analysis.corrections.length > 10) {
    console.log(`   ... and ${analysis.corrections.length - 10} more`);
    console.log('');
  }

  console.log(`✅ Report saved to: ${REPORT_FILE}`);
  console.log('');
  console.log('💡 Next Steps:');
  console.log('   1. Review repos that need GitLab upload');
  console.log('   2. Create GitLab repos (or use existing)');
  console.log('   3. Push to GitLab');
  console.log('   4. Clean up duplicate/incorrect paths');
  console.log('   5. Update remotes to include GitLab');

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

