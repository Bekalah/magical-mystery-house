#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - GitHub ↔ GitLab Sync with Gemini Integration
 * 
 * Syncs Gemini 3 changes between GitHub and GitLab
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Gemini integration files that were added
const GEMINI_FILES = [
  'scripts/gemini-deployment-assistant.mjs',
  '.github/workflows/gemini-deployment-assistant.yml',
  '.github/workflows/deploy-render.yml',
  '.github/workflows/deploy-surge.yml',
  'docs/GEMINI_DEPLOYMENT_SETUP.md',
  'docs/GEMINI_INTEGRATION_COMPLETE.md',
  'GEMINI_SETUP_QUICKSTART.md',
  'GEMINI_EVERYTHING_SETUP.md'
];

function runCommand(cmd, options = {}) {
  try {
    const result = execSync(cmd, {
      encoding: 'utf-8',
      cwd: rootDir,
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout || '' };
  }
}

function checkGitStatus() {
  console.log('📊 Checking git status...\n');
  
  const status = runCommand('git status --porcelain', { silent: true });
  if (status.output.trim()) {
    console.log('📝 Uncommitted changes:');
    console.log(status.output);
    return true;
  }
  console.log('✅ Working directory clean\n');
  return false;
}

function getRemotes() {
  const remotes = runCommand('git remote -v', { silent: true });
  const lines = remotes.output.split('\n').filter(l => l.trim());
  
  const github = lines.find(l => l.includes('github.com'));
  const gitlab = lines.find(l => l.includes('gitlab.com'));
  
  return { github, gitlab, all: lines };
}

function setupRemotes() {
  console.log('🔧 Setting up remotes...\n');
  
  const { github, gitlab } = getRemotes();
  
  // Add GitHub remote if not exists
  if (!github) {
    console.log('➕ Adding GitHub remote...');
    const githubUrl = process.env.GITHUB_REPO_URL || 'https://github.com/your-username/cathedral-master-deployment.git';
    runCommand(`git remote add github ${githubUrl}`);
  } else {
    console.log('✅ GitHub remote exists:', github.split('\t')[1]);
  }
  
  // Add GitLab remote if not exists
  if (!gitlab) {
    console.log('➕ Adding GitLab remote...');
    const gitlabUrl = process.env.GITLAB_REPO_URL || 'https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1.git';
    runCommand(`git remote add gitlab ${gitlabUrl}`);
  } else {
    console.log('✅ GitLab remote exists:', gitlab.split('\t')[1]);
  }
  
  console.log('');
}

function fetchAll() {
  console.log('📥 Fetching from all remotes...\n');
  
  const result = runCommand('git fetch --all --prune');
  if (result.success) {
    console.log('✅ Fetched from all remotes\n');
  } else {
    console.log('⚠️  Fetch had issues:', result.error);
  }
  
  return result.success;
}

function checkGeminiFiles() {
  console.log('🤖 Checking Gemini integration files...\n');
  
  const missing = [];
  const present = [];
  
  GEMINI_FILES.forEach(file => {
    const path = join(rootDir, file);
    if (existsSync(path)) {
      present.push(file);
      console.log(`  ✅ ${file}`);
    } else {
      missing.push(file);
      console.log(`  ❌ ${file} (missing)`);
    }
  });
  
  console.log(`\n📊 Summary: ${present.length}/${GEMINI_FILES.length} files present\n`);
  
  return { present, missing };
}

function commitGeminiChanges() {
  console.log('💾 Committing Gemini changes...\n');
  
  // Check if there are changes
  const status = runCommand('git status --porcelain', { silent: true });
  if (!status.output.trim()) {
    console.log('ℹ️  No changes to commit\n');
    return true;
  }
  
  // Stage Gemini files
  GEMINI_FILES.forEach(file => {
    const path = join(rootDir, file);
    if (existsSync(path)) {
      runCommand(`git add "${file}"`, { silent: true });
    }
  });
  
  // Also stage package.json if it has Gemini scripts
  if (existsSync(join(rootDir, 'package.json'))) {
    const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
    if (pkg.scripts && Object.keys(pkg.scripts).some(s => s.includes('gemini'))) {
      runCommand('git add package.json', { silent: true });
    }
  }
  
  // Commit
  const commitMsg = `🤖 Add Gemini 3 (Antigravity) deployment assistant integration

- Added Gemini deployment assistant script
- Integrated Gemini into all deployment workflows
- Added comprehensive documentation
- Added npm scripts for easy access

Part of Cathedral of Circuits - Magnum Opus Version 1.0`;
  
  const result = runCommand(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
  
  if (result.success) {
    console.log('✅ Committed Gemini changes\n');
    return true;
  } else {
    console.log('⚠️  Commit failed:', result.error);
    return false;
  }
}

function pushToRemotes(branch = 'main') {
  console.log(`🚀 Pushing to remotes (branch: ${branch})...\n`);
  
  const { github, gitlab } = getRemotes();
  const results = {};
  
  // Push to GitHub
  if (github) {
    console.log('📤 Pushing to GitHub...');
    const result = runCommand(`git push github ${branch}`, { silent: false });
    results.github = result.success;
    if (result.success) {
      console.log('✅ Pushed to GitHub\n');
    } else {
      console.log('⚠️  GitHub push failed:', result.error, '\n');
    }
  }
  
  // Push to GitLab
  if (gitlab) {
    console.log('📤 Pushing to GitLab...');
    const result = runCommand(`git push gitlab ${branch}`, { silent: false });
    results.gitlab = result.success;
    if (result.success) {
      console.log('✅ Pushed to GitLab\n');
    } else {
      console.log('⚠️  GitLab push failed:', result.error, '\n');
    }
  }
  
  return results;
}

function getCurrentBranch() {
  const result = runCommand('git branch --show-current', { silent: true });
  return result.output.trim() || 'main';
}

async function main() {
  console.log('⚗️  GitHub ↔ GitLab Sync with Gemini Integration\n');
  console.log('='.repeat(60) + '\n');
  
  // Check git status
  const hasChanges = checkGitStatus();
  
  // Setup remotes
  setupRemotes();
  
  // Fetch from all remotes
  fetchAll();
  
  // Check Gemini files
  const geminiStatus = checkGeminiFiles();
  
  // Commit changes if needed
  if (hasChanges) {
    commitGeminiChanges();
  }
  
  // Get current branch
  const branch = getCurrentBranch();
  console.log(`📍 Current branch: ${branch}\n`);
  
  // Push to both remotes
  const pushResults = pushToRemotes(branch);
  
  // Summary
  console.log('='.repeat(60));
  console.log('📊 SYNC SUMMARY\n');
  console.log(`Branch: ${branch}`);
  console.log(`Gemini Files: ${geminiStatus.present.length}/${GEMINI_FILES.length} present`);
  console.log(`GitHub Push: ${pushResults.github ? '✅ Success' : '❌ Failed'}`);
  console.log(`GitLab Push: ${pushResults.gitlab ? '✅ Success' : '❌ Failed'}`);
  console.log('\n' + '='.repeat(60));
  
  if (pushResults.github && pushResults.gitlab) {
    console.log('\n🎉 Successfully synced to both GitHub and GitLab!');
  } else {
    console.log('\n⚠️  Some pushes failed. Check the output above for details.');
  }
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

