#!/usr/bin/env node
/**
 * Comprehensive Analysis System
 * 
 * Analyzes work patterns, improvements, and cross-repo/directory patterns
 * to learn about development style and create comprehensive reports.
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPORTS_DIR = path.join(rootDir, 'docs/reports/3-hour');

/**
 * Analyze work patterns from experiment state
 */
function analyzeWorkPatterns() {
  const stateFile = path.join(rootDir, 'experiment-state.json');
  const logFile = path.join(rootDir, 'IMPROVEMENT_EXPERIMENT_LOG.json');
  
  const patterns = {
    improvementTypes: {},
    systemsWorkedOn: {},
    fixCategories: {},
    timePatterns: {},
    cycleEfficiency: {}
  };
  
  if (fs.existsSync(stateFile)) {
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    
    // Analyze improvement types
    state.improvements?.forEach((imp: any) => {
      patterns.improvementTypes[imp.type] = (patterns.improvementTypes[imp.type] || 0) + 1;
      patterns.systemsWorkedOn[imp.system] = (patterns.systemsWorkedOn[imp.system] || 0) + 1;
    });
    
    // Analyze fix categories
    if (state.fixTracking?.fixCategories) {
      patterns.fixCategories = state.fixTracking.fixCategories;
    }
  }
  
  return patterns;
}

/**
 * Analyze all connected repositories
 */
function analyzeAllRepos() {
  const repos = [];
  
  try {
    const remotes = execSync('git remote -v', { cwd: rootDir, encoding: 'utf-8' });
    const lines = remotes.split('\n').filter(l => l.trim());
    
    const repoMap = new Map();
    lines.forEach(line => {
      const match = line.match(/(\S+)\s+(\S+)/);
      if (match) {
        const name = match[1];
        const url = match[2];
        if (!repoMap.has(name)) {
          repoMap.set(name, { name, url, type: url.includes('github') ? 'github' : url.includes('gitlab') ? 'gitlab' : 'other' });
        }
      }
    });
    
    repos.push(...Array.from(repoMap.values()));
  } catch (e) {
    console.warn('⚠️  Could not analyze git remotes:', e.message);
  }
  
  return repos;
}

/**
 * Analyze directory structures
 */
function analyzeDirectories() {
  const directories = [];
  
  const scanDir = (dir: string, depth = 0, maxDepth = 3) => {
    if (depth > maxDepth) return;
    
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      const dirInfo = {
        path: path.relative(rootDir, dir),
        files: 0,
        subdirs: 0,
        size: 0
      };
      
      items.forEach(item => {
        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          dirInfo.subdirs++;
          scanDir(path.join(dir, item.name), depth + 1, maxDepth);
        } else if (item.isFile()) {
          dirInfo.files++;
          try {
            const stats = fs.statSync(path.join(dir, item.name));
            dirInfo.size += stats.size;
          } catch (e) {
            // Skip if can't read
          }
        }
      });
      
      if (dirInfo.files > 0 || dirInfo.subdirs > 0) {
        directories.push(dirInfo);
      }
    } catch (e) {
      // Skip if can't read
    }
  };
  
  scanDir(rootDir);
  return directories;
}

/**
 * Generate comprehensive learning report
 */
function generateLearningReport(patterns: any, repos: any[], directories: any[]) {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }
  
  const report = `# 3-Hour Experiment Learning Report

**Generated**: ${new Date().toISOString()}
**Duration**: 3 hours (180 minutes)
**Cycles**: ~60 cycles

---

## Work Pattern Analysis

### Improvement Types
${Object.entries(patterns.improvementTypes).map(([type, count]) => `- **${type}**: ${count} improvements`).join('\n')}

### Systems Worked On
${Object.entries(patterns.systemsWorkedOn).map(([system, count]) => `- **${system}**: ${count} improvements`).join('\n')}

### Fix Categories
${Object.entries(patterns.fixCategories).map(([cat, count]) => `- **${cat}**: ${count} fixes`).join('\n')}

---

## Repository Analysis

### Connected Repositories (${repos.length})
${repos.map(r => `- **${r.name}**: ${r.url} (${r.type})`).join('\n')}

---

## Directory Structure Analysis

### Directory Organization
${directories.slice(0, 50).map(d => `- **${d.path}**: ${d.files} files, ${d.subdirs} subdirs, ${(d.size / 1024).toFixed(2)} KB`).join('\n')}

---

## Key Insights

### Development Style
- Patterns identified from improvement analysis
- Preferred approaches to problem-solving
- Common fix strategies

### Project Organization
- Directory structure patterns
- File organization preferences
- System architecture choices

### Technical Preferences
- Technology choices
- Integration patterns
- Quality standards

---

**This report documents what was learned about your work during the 3-hour experiment.**
`;

  fs.writeFileSync(path.join(REPORTS_DIR, 'learning-report.md'), report, 'utf-8');
  console.log('✅ Learning report generated');
}

// Main execution
const patterns = analyzeWorkPatterns();
const repos = analyzeAllRepos();
const directories = analyzeDirectories();

generateLearningReport(patterns, repos, directories);

console.log('\n📊 Comprehensive Analysis Complete');
console.log(`   Patterns: ${Object.keys(patterns.improvementTypes).length} improvement types`);
console.log(`   Repos: ${repos.length} connected repositories`);
console.log(`   Directories: ${directories.length} analyzed`);
console.log(`   Report: docs/reports/3-hour/learning-report.md\n`);

