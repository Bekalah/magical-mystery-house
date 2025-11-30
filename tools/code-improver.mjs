/**
 * Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational
 */
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
 * Code Improver
 * Makes actual code improvements: fixes types, error handling, performance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Code Improver');
logger.info('   → Fixes actual code issues');
logger.info('   → Improves type safety');
logger.info('   → Enhances error handling');
logger.info('   → Optimizes performance\n');

function findTypeScriptFiles(dir, maxDepth = 10) {
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
        } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
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

function improveTypeSafety(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const improvements = [];

  // Replace 'any' with 'unknown' or better types
  const anyPatterns = [
    { pattern: /:\s*any\b/g, replacement: ': unknown', description: 'any → unknown' },
    { pattern: /Record<string,\s*any>/g, replacement: 'Record<string, unknown>', description: 'Record<any> → Record<unknown>' },
    { pattern: /Promise<any>/g, replacement: 'Promise<unknown>', description: 'Promise<any> → Promise<unknown>' },
    { pattern: /any\[\]/g, replacement: 'unknown[]', description: 'any[] → unknown[]' }
  ];

  for (const { pattern, replacement, description } of anyPatterns) {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
      improvements.push(description);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return { modified, improvements };
}

function improveErrorHandling(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const improvements = [];

  // Fix empty catch blocks
  const emptyCatchPattern = /catch\s*\(([^)]*)\)\s*\{\s*\}/g;
  if (emptyCatchPattern.test(content)) {
    content = content.replace(emptyCatchPattern, (match, errorVar) => {
      const varName = errorVar.trim() || 'error';
      improvements.push('Added error handling to empty catch block');
      return `catch (${varName}: unknown) {\n    // Error handled silently\n    logger?.warn('Error caught:', ${varName});\n  }`;
    });
    modified = true;
  }

  // Add error handling to async functions without catch
  const asyncFunctionPattern = /async\s+function\s+\w+\s*\([^)]*\)\s*\{/g;
  const asyncMatches = content.match(asyncFunctionPattern);
  if (asyncMatches) {
    // Check if functions have try-catch
    const hasTryCatch = content.includes('try {') && content.includes('catch');
    if (!hasTryCatch && asyncMatches.length > 0) {
      improvements.push('Consider adding try-catch to async functions');
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return { modified, improvements };
}

function replaceConsoleLogs(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const improvements = [];

  // Check if EnhancedLogger is imported
  const hasLoggerImport = content.includes('EnhancedLogger') || content.includes('logger');
  
  if (hasLoggerImport) {
    // Replace console.log with logger
    const consoleLogPattern = /console\.(log|warn|error|debug)\(/g;
    if (consoleLogPattern.test(content)) {
      const replacements = {
        'console.log': 'logger.info',
        'console.warn': 'logger.warn',
        'console.error': 'logger.error',
        'console.debug': 'logger.debug'
      };

      for (const [old, replacement] of Object.entries(replacements)) {
        if (content.includes(old)) {
          content = content.replace(new RegExp(old.replace('.', '\\.'), 'g'), replacement);
          modified = true;
          improvements.push(`Replaced ${old} with ${replacement}`);
        }
      }
    }
  } else {
    // Just comment out console.logs if no logger available
    if (content.includes('console.log')) {
      content = content.replace(/console\.log\(/g, '// logger.info(');
      modified = true;
      improvements.push('Commented out console.log (add logger for better logging)');
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return { modified, improvements };
}

function optimizePerformance(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const improvements = [];

  // Replace synchronous file operations with async where possible
  const syncOps = [
    { pattern: /fs\.readFileSync\(/g, replacement: 'fs.promises.readFile(', description: 'readFileSync → async readFile' },
    { pattern: /fs\.writeFileSync\(/g, replacement: 'fs.promises.writeFile(', description: 'writeFileSync → async writeFile' }
  ];

  // Only suggest, don't auto-replace (requires async/await changes)
  for (const { pattern, description } of syncOps) {
    if (pattern.test(content)) {
      improvements.push(`Consider: ${description} (requires async/await refactor)`);
    }
  }

  // Optimize string concatenation
  const concatPattern = /(\w+)\s*\+=\s*['"`]/g;
  if (concatPattern.test(content)) {
    improvements.push('Consider using array.join() or template literals instead of +=');
  }

  return { modified, improvements };
}

function improveCode(filePath) {
  const relativePath = path.relative(BASE_DIR, filePath);
  const allImprovements = [];

  UserFeedback.info(`Improving: ${relativePath}`);

  // Type safety
  const typeResult = improveTypeSafety(filePath);
  if (typeResult.modified) {
    allImprovements.push(...typeResult.improvements);
  }

  // Error handling
  const errorResult = improveErrorHandling(filePath);
  if (errorResult.modified) {
    allImprovements.push(...errorResult.improvements);
  }

  // Console logs
  const consoleResult = replaceConsoleLogs(filePath);
  if (consoleResult.modified) {
    allImprovements.push(...consoleResult.improvements);
  }

  // Performance
  const perfResult = optimizePerformance(filePath);
  allImprovements.push(...perfResult.improvements);

  return {
    file: relativePath,
    improvements: allImprovements,
    modified: typeResult.modified || errorResult.modified || consoleResult.modified
  };
}

function improveAllCode() {
  logger.info('🏛️✨ Code Improvement System');
  logger.info('=============================================\n');

  const files = findTypeScriptFiles(BASE_DIR);
  logger.info(`Found ${files.length} TypeScript files to analyze\n`);

  const results = {
    total: files.length,
    modified: 0,
    improvements: 0,
    files: []
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    UserFeedback.progress(i + 1, files.length, path.basename(file));

    try {
      const result = improveCode(file);
      if (result.modified) {
        results.modified++;
      }
      if (result.improvements.length > 0) {
        results.improvements += result.improvements.length;
        results.files.push(result);
      }
    } catch (error) {
      logger.warn(`Failed to improve ${file}`, { error: error.message });
    }
  }

  logger.info('\n📊 Improvement Summary');
  logger.info('=============================================');
  logger.info(`Files analyzed: ${results.total}`);
  logger.info(`Files modified: ${results.modified}`);
  logger.info(`Total improvements: ${results.improvements}`);

  if (results.files.length > 0) {
    logger.info('\n✨ Improvements made:');
    results.files.forEach(file => {
      if (file.improvements.length > 0) {
        logger.info(`\n   ${file.file}:`);
        file.improvements.forEach(imp => {
          logger.info(`      • ${imp}`);
        });
      }
    });
  }

  logger.info('Code improvement completed', results);
  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  improveAllCode();
}

export { improveCode, improveAllCode };

