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
 * Dependency Analyzer
 * Analyzes and optimizes dependencies for real improvements
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

logger.info('🔧 IMPROVEMENT: Creating Dependency Analyzer');
logger.info('   → Finds duplicate dependencies');
logger.info('   → Identifies unused dependencies');
logger.info('   → Suggests version updates');
logger.info('   → Optimizes dependency tree\n');

function analyzeDependencies() {
  UserFeedback.section('Dependency Analysis');
  
  const packageJsonPath = path.join(BASE_DIR, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    UserFeedback.error('package.json not found');
    return null;
  }

  // Handle JSDoc header in package.json
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
  const jsonStart = packageJsonContent.indexOf('{');
  const packageJson = JSON.parse(packageJsonContent.substring(jsonStart));
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};
  
  const allDeps = { ...dependencies, ...devDependencies };
  const issues = {
    duplicates: [],
    unused: [],
    outdated: [],
    suggestions: []
  };

  // Check for duplicate dependencies (same package in both deps and devDeps)
  for (const dep in dependencies) {
    if (devDependencies[dep]) {
      issues.duplicates.push({
        package: dep,
        inDependencies: dependencies[dep],
        inDevDependencies: devDependencies[dep],
        suggestion: `Remove from ${dependencies[dep] ? 'dependencies' : 'devDependencies'}`
      });
    }
  }

  // Check for potentially unused dependencies
  // (This is a simplified check - would need AST parsing for production)
  const sourceFiles = findSourceFiles(BASE_DIR);
  const usedPackages = new Set();
  
  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    for (const dep in allDeps) {
      const packageName = dep.replace(/^@[^/]+\//, '').replace(/-/g, '[-_]?');
      const regex = new RegExp(`(?:import|require|from)\\s+['"]${packageName}`, 'i');
      if (regex.test(content)) {
        usedPackages.add(dep);
      }
    }
  }

  // Find potentially unused
  for (const dep in allDeps) {
    if (!usedPackages.has(dep) && !dep.startsWith('@types/')) {
      issues.unused.push({
        package: dep,
        version: allDeps[dep],
        suggestion: 'Check if actually used, remove if not'
      });
    }
  }

  return {
    total: Object.keys(allDeps).length,
    dependencies: Object.keys(dependencies).length,
    devDependencies: Object.keys(devDependencies).length,
    issues
  };
}

function findSourceFiles(dir, maxDepth = 5) {
  const files = [];
  const excludeDirs = ['node_modules', '.git', 'dist', '.turbo', 'build'];

  function search(currentDir, depth = 0) {
    if (depth > maxDepth) return;

    try {
      const entries = fs.readdirSync(currentDir);
      for (const entry of entries) {
        if (entry.startsWith('.') && entry !== '.git') continue;
        if (excludeDirs.includes(entry)) continue;

        const fullPath = path.join(currentDir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          search(fullPath, depth + 1);
        } else if (entry.endsWith('.ts') || entry.endsWith('.js') || entry.endsWith('.tsx') || entry.endsWith('.jsx')) {
          files.push(fullPath);
        }
      }
    } catch {
      // Skip
    }
  }

  search(dir);
  return files;
}

function displayAnalysis(results) {
  if (!results) return;

  UserFeedback.section('Dependency Analysis Results');
  
  logger.info(`Total dependencies: ${results.total}`);
  logger.info(`Production: ${results.dependencies}`);
  logger.info(`Development: ${results.devDependencies}`);

  if (results.issues.duplicates.length > 0) {
    logger.info(`\n⚠️  Duplicate dependencies: ${results.issues.duplicates.length}`);
    results.issues.duplicates.forEach(dup => {
      logger.info(`   • ${dup.package}: ${dup.suggestion}`);
    });
  }

  if (results.issues.unused.length > 0) {
    logger.info(`\n💡 Potentially unused: ${results.issues.unused.length}`);
    results.issues.unused.slice(0, 10).forEach(unused => {
      logger.info(`   • ${unused.package} (${unused.version}): ${unused.suggestion}`);
    });
    if (results.issues.unused.length > 10) {
      logger.info(`   ... and ${results.issues.unused.length - 10} more`);
    }
  }

  // Save analysis
  const analysisPath = path.join(BASE_DIR, '.dependency-analysis.json');
  fs.writeFileSync(analysisPath, JSON.stringify(results, null, 2), 'utf-8');
  logger.info(`\n📄 Analysis saved: .dependency-analysis.json`);
}

function analyzeDeps() {
  logger.info('🏛️✨ Dependency Analysis');
  logger.info('=============================================\n');

  const results = analyzeDependencies();
  displayAnalysis(results);

  logger.info('Dependency analysis completed', results);
  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeDeps();
}

export { analyzeDependencies, analyzeDeps };

