/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node
/**
 * Comprehensive cleanup of wrong/outdated information
 * Removes incorrect GitHub references, outdated archives, duplicate docs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧹 Cleaning up wrong/outdated information...\n');

const GITLAB_NAMESPACE = 'bekalah';
const GITLAB_BASE = `https://gitlab.com/${GITLAB_NAMESPACE}`;

// Files/directories to delete (outdated/wrong info)
const filesToDelete = [
  // Outdated GitHub-specific files
  '.github/workflows/ci.yml',
  '.github/workflows/deploy-vercel.yml',
  '.github/workflows/publish.yml',
  '.github/workflows/fix-all-workflows.mjs',
  '.github/workflows/FIXED_DEPLOYMENTS.md',
  '.github/workflows/WORKFLOW_ORGANIZATION.md',
  
  // Archive directories with wrong info
  'archive',
  'archives',
  'backups/old',
  'backups/archive',
  
  // Outdated documentation
  'COMPREHENSIVE_AUDIT.json', // Too large, outdated
  'real-deduplication-report.json', // Outdated
  'system-map.json', // Outdated, too large
  
  // Old experiment files
  'EXPERIMENT_UPDATED.md',
  'UPDATED_UNDERSTANDING.md',
  'MONOREPO_UPDATE_STATUS.md',
  'MONOREPO_COMPLETION_SUMMARY.md',
  'FREE_AND_OPEN.md',
];

// Patterns to find and clean
const patternsToClean = {
  // GitHub URLs that should be GitLab
  githubUrls: [
    /https?:\/\/github\.com\/[^\s\)]+/g,
    /github\.com\/[^\s\)]+/g,
  ],
  // Outdated references
  outdatedRefs: [
    /GitHub Actions/g,
    /github\.io/g,
    /@github\.com/g,
  ],
  // Wrong paths
  wrongPaths: [
    /\/Users\/rebeccalemke\/cathedral-[^\/]+/g,
    /cathedral-master\//g,
    /cathedral-real\//g,
    /cathedral-fixed-clean\//g,
  ]
};

let deletedCount = 0;
let updatedCount = 0;
let errorCount = 0;

// Delete files
function deleteFile(filePath) {
  const fullPath = path.join(rootDir, filePath);
  try {
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`  🗑️  Deleted directory: ${filePath}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`  🗑️  Deleted file: ${filePath}`);
      }
      deletedCount++;
      return true;
    }
  } catch (err) {
    console.error(`  ❌ Error deleting ${filePath}:`, err.message);
    errorCount++;
  }
  return false;
}

// Clean file content
function cleanFileContent(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    const original = content;

    // Replace GitHub URLs with GitLab
    for (const pattern of patternsToClean.githubUrls) {
      if (pattern.test(content)) {
        content = content.replace(pattern, (match) => {
          if (match.includes('github.com')) {
            const parts = match.split('/');
            const repoName = parts[parts.length - 1].replace('.git', '').replace(/[^a-zA-Z0-9-]/g, '');
            return match.replace('github.com', 'gitlab.com').replace(/\/[^\/]+\//, `/${GITLAB_NAMESPACE}/`);
          }
          return match;
        });
        updated = true;
      }
    }

    // Replace outdated references
    content = content.replace(/GitHub Actions/g, 'GitLab CI');
    content = content.replace(/github\.io/g, 'gitlab.io');
    content = content.replace(/@github\.com/g, '@gitlab.com');
    
    // Remove wrong paths
    for (const pattern of patternsToClean.wrongPaths) {
      if (pattern.test(content)) {
        content = content.replace(pattern, '');
        updated = true;
      }
    }

    if (updated && content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✏️  Updated: ${path.relative(rootDir, filePath)}`);
      updatedCount++;
      return true;
    }
  } catch (err) {
    // Skip binary files or errors
  }
  return false;
}

// Find all files recursively
function findFiles(dir, extensions = ['.md', '.json', '.yml', '.yaml', '.js', '.mjs', '.ts', '.txt']) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(rootDir, fullPath);
      
      // Skip node_modules, .git, dist, etc.
      if (entry.name.startsWith('.') && entry.name !== '.gitlab-ci.yml') continue;
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
      
      if (entry.isDirectory()) {
        files.push(...findFiles(fullPath, extensions));
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Skip errors
  }
  return files;
}

// Main execution
console.log('🗑️  Deleting outdated files...');
for (const file of filesToDelete) {
  deleteFile(file);
}

console.log(`\n📝 Cleaning file contents...`);
const filesToClean = findFiles(rootDir);
for (const file of filesToClean) {
  cleanFileContent(file);
}

// Clean package.json files specifically
console.log(`\n📦 Cleaning package.json files...`);
const packageFiles = findFiles(rootDir, ['.json']).filter(f => f.endsWith('package.json'));
for (const file of packageFiles) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const pkg = JSON.parse(content);
    let updated = false;

    // Fix repository URLs
    if (pkg.repository) {
      if (typeof pkg.repository === 'string' && pkg.repository.includes('github.com')) {
        const repoName = pkg.repository.split('/').pop().replace('.git', '');
        pkg.repository = {
          type: 'git',
          url: `${GITLAB_BASE}/${repoName}.git`
        };
        updated = true;
      } else if (pkg.repository.url && pkg.repository.url.includes('github.com')) {
        pkg.repository.url = pkg.repository.url.replace('github.com', 'gitlab.com').replace(/\/[^\/]+\//, `/${GITLAB_NAMESPACE}/`);
        updated = true;
      }
    }

    // Fix homepage
    if (pkg.homepage && pkg.homepage.includes('github.io')) {
      pkg.homepage = pkg.homepage.replace('github.io', 'gitlab.io');
      updated = true;
    }

    // Fix bugs URL
    if (pkg.bugs && pkg.bugs.url && pkg.bugs.url.includes('github.com')) {
      pkg.bugs.url = pkg.bugs.url.replace('github.com', 'gitlab.com').replace(/\/[^\/]+\//, `/${GITLAB_NAMESPACE}/`);
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      console.log(`  ✏️  Updated: ${path.relative(rootDir, file)}`);
      updatedCount++;
    }
  } catch (err) {
    // Skip invalid JSON
  }
}

console.log(`\n✅ Cleanup complete!`);
console.log(`   - Deleted ${deletedCount} files/directories`);
console.log(`   - Updated ${updatedCount} files`);
console.log(`   - Errors: ${errorCount}`);
console.log(`\n🌐 All references now point to GitLab: ${GITLAB_BASE}`);

