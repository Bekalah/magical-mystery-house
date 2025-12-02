#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Performance Optimizer
 * Identifies and fixes performance issues
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

const OPTIMIZATIONS = {
  'large_files': {
    name: 'Large Files',
    check: (filePath) => {
      const stats = fs.statSync(filePath);
      return stats.size > 1024 * 1024; // 1MB
    },
    optimize: (filePath) => {
      logger.info(`Large file detected: ${filePath}`);
      // Could suggest splitting, compression, etc.
      return { optimized: false, suggestion: 'Consider splitting or compressing large files' };
    }
  },
  'unused_imports': {
    name: 'Unused Imports',
    check: (filePath) => {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return false;
      const content = fs.readFileSync(filePath, 'utf-8');
      // Simple check for potential unused imports
      const importLines = content.match(/^import\s+.*from\s+['"].*['"];?$/gm) || [];
      return importLines.length > 20; // Heuristic
    },
    optimize: (filePath) => {
      logger.info(`Many imports detected: ${filePath}`);
      return { optimized: false, suggestion: 'Run pnpm run find:unused to detect unused imports' };
    }
  },
  'slow_builds': {
    name: 'Slow Builds',
    check: () => {
      const turboCache = path.join(BASE_DIR, '.turbo');
      if (!fs.existsSync(turboCache)) return false;
      const cacheSize = getDirSize(turboCache);
      return cacheSize > 500 * 1024 * 1024; // 500MB
    },
    optimize: () => {
      logger.info('Large Turbo cache detected');
      try {
        execSync('pnpm run clean', { cwd: BASE_DIR, stdio: 'pipe' });
        logger.success('Cleaned build cache');
        return { optimized: true };
      } catch {
        return { optimized: false, suggestion: 'Clear .turbo cache manually' };
      }
    }
  },
  'duplicate_code': {
    name: 'Duplicate Code',
    check: (filePath) => {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return false;
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      const uniqueLines = new Set(lines.map(l => l.trim()).filter(l => l.length > 10));
      const duplicateRatio = 1 - (uniqueLines.size / lines.length);
      return duplicateRatio > 0.3; // More than 30% duplicate
    },
    optimize: (filePath) => {
      logger.info(`Potential duplicate code: ${filePath}`);
      return { optimized: false, suggestion: 'Consider refactoring to reduce duplication' };
    }
  }
};

function getDirSize(dirPath) {
  let size = 0;
  try {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        size += getDirSize(filePath);
      } else {
        size += stats.size;
      }
    }
  } catch {
    // Ignore
  }
  return size;
}

function findOptimizations() {
  logger.info('Scanning for performance optimizations...');

  const optimizations = [];
  const files = findSourceFiles(BASE_DIR);

  for (const file of files) {
    for (const [key, opt] of Object.entries(OPTIMIZATIONS)) {
      try {
        if (opt.check(file)) {
          const result = opt.optimize(file);
          optimizations.push({
            file: path.relative(BASE_DIR, file),
            type: key,
            name: opt.name,
            ...result
          });
        }
      } catch {
        // Skip files that can't be checked
      }
    }
  }

  // Check global optimizations
  for (const [key, opt] of Object.entries(OPTIMIZATIONS)) {
    if (opt.check && typeof opt.check === 'function' && opt.check.length === 0) {
      try {
        if (opt.check()) {
          const result = opt.optimize();
          optimizations.push({
            file: 'global',
            type: key,
            name: opt.name,
            ...result
          });
        }
      } catch {
        // Ignore
      }
    }
  }

  return optimizations;
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
        } else if (entry.endsWith('.ts') || entry.endsWith('.js') || entry.endsWith('.mjs')) {
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

function applyOptimizations(optimizations) {
  logger.info(`Applying ${optimizations.length} optimizations...`);

  let applied = 0;
  let failed = 0;

  for (const opt of optimizations) {
    if (opt.optimized) {
      applied++;
      logger.success(`Optimized: ${opt.name} (${opt.file})`);
    } else {
      failed++;
      logger.info(`Suggestion: ${opt.name} (${opt.file}) - ${opt.suggestion || 'Manual optimization needed'}`);
    }
  }

  return { applied, failed, total: optimizations.length };
}

function optimizePerformance() {
  logger.info('🏛️✨ Performance Optimization');
  logger.info('=============================================');

  const optimizations = findOptimizations();
  const result = applyOptimizations(optimizations);

  logger.info('\n📊 Optimization Summary');
  logger.info('=============================================');
  logger.info(`Total Issues Found: ${result.total}`);
  logger.info(`✅ Auto-optimized: ${result.applied}`);
  logger.info(`💡 Suggestions: ${result.failed}`);

  if (result.failed > 0) {
    logger.info('\n💡 Optimization Suggestions:');
    optimizations
      .filter(o => !o.optimized)
      .forEach(opt => {
        logger.info(`   • ${opt.name} (${opt.file}): ${opt.suggestion || 'Review needed'}`);
      });
  }

  return result;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizePerformance();
}

export { findOptimizations, applyOptimizations, optimizePerformance };

