/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node
/**
 * Fix all paths and references for GitLab migration
 * Updates package.json, README files, and code references
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const GITLAB_NAMESPACE = 'bekalah';
const GITLAB_BASE = `https://gitlab.com/${GITLAB_NAMESPACE}`;

console.log('🔧 Fixing paths for GitLab migration...\n');

// Find all package.json files
function findPackageJsonFiles(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        files.push(...findPackageJsonFiles(fullPath));
      } else if (entry.name === 'package.json') {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Skip errors
  }
  return files;
}

// Update package.json
function updatePackageJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const pkg = JSON.parse(content);
    let updated = false;

    // Update repository URLs
    if (pkg.repository) {
      if (typeof pkg.repository === 'string') {
        if (pkg.repository.includes('github.com')) {
          const repoName = pkg.repository.split('/').pop().replace('.git', '');
          pkg.repository = {
            type: 'git',
            url: `${GITLAB_BASE}/${repoName}.git`
          };
          updated = true;
        }
      } else if (pkg.repository.url && pkg.repository.url.includes('github.com')) {
        const repoName = pkg.repository.url.split('/').pop().replace('.git', '');
        pkg.repository.url = `${GITLAB_BASE}/${repoName}.git`;
        updated = true;
      }
    }

    // Update homepage
    if (pkg.homepage && pkg.homepage.includes('github.io')) {
      pkg.homepage = pkg.homepage.replace('github.io', 'gitlab.io');
      updated = true;
    }

    // Update bugs URL
    if (pkg.bugs && pkg.bugs.url && pkg.bugs.url.includes('github.com')) {
      const repoName = pkg.bugs.url.split('/').slice(-2).join('/').replace('/issues', '');
      pkg.bugs.url = `${GITLAB_BASE}/${repoName}/-/issues`;
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      console.log(`  ✅ Updated: ${path.relative(rootDir, filePath)}`);
      return true;
    }
  } catch (err) {
    console.error(`  ❌ Error updating ${filePath}:`, err.message);
  }
  return false;
}

// Update README and other markdown files
function updateMarkdownFiles(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        files.push(...updateMarkdownFiles(fullPath));
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Skip errors
  }
  return files;
}

function updateMarkdown(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Replace GitHub URLs with GitLab
    const githubPatterns = [
      [/https?:\/\/github\.com\/([^\/]+)\/([^\/\s\)]+)/g, `${GITLAB_BASE}/$2`],
      [/github\.io/g, 'gitlab.io'],
      [/GitHub/g, 'GitLab'],
      [/github\.com/g, 'gitlab.com']
    ];

    for (const [pattern, replacement] of githubPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated: ${path.relative(rootDir, filePath)}`);
      return true;
    }
  } catch (err) {
    // Skip errors
  }
  return false;
}

// Main execution
console.log('📦 Updating package.json files...');
const packageFiles = findPackageJsonFiles(rootDir);
let packageCount = 0;
for (const file of packageFiles) {
  if (updatePackageJson(file)) packageCount++;
}

console.log(`\n📝 Updating markdown files...`);
const markdownFiles = updateMarkdownFiles(rootDir);
let markdownCount = 0;
for (const file of markdownFiles) {
  if (updateMarkdown(file)) markdownCount++;
}

console.log(`\n✅ GitLab migration path fixes complete!`);
console.log(`   - Updated ${packageCount} package.json files`);
console.log(`   - Updated ${markdownCount} markdown files`);
console.log(`\n🌐 All references now point to GitLab: ${GITLAB_BASE}`);

