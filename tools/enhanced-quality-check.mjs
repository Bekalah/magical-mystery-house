/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Enhanced Code Quality Checker
 * Comprehensive code quality analysis with detailed feedback
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

logger.info('🔧 IMPROVEMENT: Creating Enhanced Code Quality Checker');
logger.info('   → Comprehensive code quality analysis');
logger.info('   → Detailed feedback and suggestions');
logger.info('   → Type safety checks\n');

const QUALITY_CHECKS = {
  'type_safety': {
    name: 'Type Safety',
    check: (filePath) => {
      if (!filePath.endsWith('.ts')) return null;
      const content = fs.readFileSync(filePath, 'utf-8');
      const issues = [];
      
      // Check for 'any' types
      const anyMatches = content.match(/: any\b/g);
      if (anyMatches) {
        issues.push({
          severity: 'warning',
          message: `Found ${anyMatches.length} 'any' types - consider using 'unknown' or specific types`,
          count: anyMatches.length
        });
      }
      
      // Check for missing return types
      const functionMatches = content.match(/function\s+\w+\s*\([^)]*\)\s*\{/g);
      const asyncMatches = content.match(/async\s+function\s+\w+\s*\([^)]*\)\s*\{/g);
      if (functionMatches || asyncMatches) {
        const total = (functionMatches?.length || 0) + (asyncMatches?.length || 0);
        const withReturnTypes = (content.match(/:\s*\w+/g) || []).length;
        if (withReturnTypes < total * 0.5) {
          issues.push({
            severity: 'info',
            message: 'Consider adding explicit return types to functions',
            count: total
          });
        }
      }
      
      return issues.length > 0 ? issues : null;
    }
  },
  'error_handling': {
    name: 'Error Handling',
    check: (filePath) => {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return null;
      const content = fs.readFileSync(filePath, 'utf-8');
      const issues = [];
      
      // Check for empty catch blocks
      const emptyCatch = content.match(/catch\s*\([^)]*\)\s*\{\s*\}/g);
      if (emptyCatch) {
        issues.push({
          severity: 'warning',
          message: `Found ${emptyCatch.length} empty catch blocks - add error handling`,
          count: emptyCatch.length
        });
      }
      
      // Check for unhandled promises
      const awaitMatches = content.match(/await\s+\w+\(/g);
      const catchMatches = content.match(/\.catch\(/g);
      if (awaitMatches && (!catchMatches || catchMatches.length < awaitMatches.length * 0.3)) {
        issues.push({
          severity: 'warning',
          message: 'Some async operations may not have error handling',
          count: awaitMatches.length
        });
      }
      
      return issues.length > 0 ? issues : null;
    }
  },
  'code_duplication': {
    name: 'Code Duplication',
    check: (filePath) => {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return null;
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 10);
      const uniqueLines = new Set(lines);
      const duplicateRatio = 1 - (uniqueLines.size / lines.length);
      
      if (duplicateRatio > 0.3) {
        return [{
          severity: 'info',
          message: `High code duplication (${(duplicateRatio * 100).toFixed(1)}%) - consider refactoring`,
          count: Math.round(duplicateRatio * lines.length)
        }];
      }
      
      return null;
    }
  },
  'documentation': {
    name: 'Documentation',
    check: (filePath) => {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return null;
      const content = fs.readFileSync(filePath, 'utf-8');
      const issues = [];
      
      // Check for JSDoc on exported functions
      const exportMatches = content.match(/export\s+(?:async\s+)?function\s+(\w+)/g);
      if (exportMatches) {
        for (const match of exportMatches) {
          const funcName = match.match(/(\w+)\s*\(/)?.[1];
          if (funcName) {
            const funcIndex = content.indexOf(match);
            const beforeFunc = content.substring(Math.max(0, funcIndex - 200), funcIndex);
            if (!beforeFunc.includes('/**') && !beforeFunc.includes('* @')) {
              issues.push({
                severity: 'info',
                message: `Exported function '${funcName}' lacks JSDoc documentation`,
                count: 1
              });
            }
          }
        }
      }
      
      return issues.length > 0 ? issues : null;
    }
  }
};

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

function runQualityCheck() {
  logger.info('🔍 Running enhanced quality check...');
  
  const files = findSourceFiles(BASE_DIR);
  const results = {
    files: {},
    summary: {
      total: files.length,
      issues: 0,
      warnings: 0,
      info: 0
    }
  };

  for (const file of files) {
    const relativePath = path.relative(BASE_DIR, file);
    const fileIssues = [];

    for (const [key, check] of Object.entries(QUALITY_CHECKS)) {
      try {
        const issues = check.check(file);
        if (issues) {
          fileIssues.push({
            category: check.name,
            issues
          });
        }
      } catch (error) {
        logger.warn(`Quality check failed for ${relativePath}`, { error: error.message });
      }
    }

    if (fileIssues.length > 0) {
      results.files[relativePath] = fileIssues;
      fileIssues.forEach(cat => {
        cat.issues.forEach(issue => {
          results.summary.issues++;
          if (issue.severity === 'warning') results.summary.warnings++;
          if (issue.severity === 'info') results.summary.info++;
        });
      });
    }
  }

  return results;
}

function displayQualityReport(results) {
  logger.info('\n📊 Quality Check Report');
  logger.info('=============================================');
  logger.info(`Files checked: ${results.summary.total}`);
  logger.info(`Total issues: ${results.summary.issues}`);
  logger.info(`⚠️  Warnings: ${results.summary.warnings}`);
  logger.info(`ℹ️  Info: ${results.summary.info}`);

  if (Object.keys(results.files).length > 0) {
    logger.info('\n📋 Issues by file:');
    for (const [file, categories] of Object.entries(results.files)) {
      logger.info(`\n   ${file}:`);
      categories.forEach(cat => {
        cat.issues.forEach(issue => {
          const icon = issue.severity === 'warning' ? '⚠️' : 'ℹ️';
          logger.info(`      ${icon} ${cat.category}: ${issue.message}`);
        });
      });
    }
  }

  const reportPath = path.join(BASE_DIR, '.quality-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  logger.info(`\n📄 Full report: .quality-report.json`);
}

function checkQuality() {
  logger.info('🏛️✨ Enhanced Code Quality Check');
  logger.info('=============================================\n');

  const results = runQualityCheck();
  displayQualityReport(results);

  logger.info('Quality check completed', results.summary);
  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  checkQuality();
}

export { runQualityCheck, checkQuality };

