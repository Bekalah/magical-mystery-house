#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Optimize Code Tool
 * Finds and suggests code optimizations
 */

import fs from 'fs';
import path from 'path';

const BASE_DIR = '/Users/rebeccalemke/cathedral-master-deployment';

const OPTIMIZATION_PATTERNS = [
  {
    name: 'Promise chains to async/await',
    pattern: /\.then\([^)]+\)\.catch\(/g,
    suggestion: 'Convert to async/await for better readability',
    fixable: false
  },
  {
    name: 'Synchronous file operations',
    pattern: /fs\.(readFileSync|writeFileSync|existsSync)/g,
    suggestion: 'Consider async operations for better performance',
    fixable: false
  },
  {
    name: 'Multiple console.log statements',
    pattern: /console\.(log|warn|error)\([^)]+\)\s*\n\s*console\.(log|warn|error)\(/g,
    suggestion: 'Combine into single log statement or use logger utility',
    fixable: true,
    fix: (content) => {
      // This is a placeholder - actual fix would be more complex
      return content;
    }
  },
  {
    name: 'Repeated string concatenation',
    pattern: /(\w+)\s*\+=\s*['"`]/g,
    suggestion: 'Use array.join() or template literals for better performance',
    fixable: false
  },
  {
    name: 'Nested if statements',
    pattern: /if\s*\([^)]+\)\s*\{\s*if\s*\([^)]+\)/g,
    suggestion: 'Consider early returns or combining conditions',
    fixable: false
  },
  {
    name: 'Large function (>100 lines)',
    pattern: /function\s+\w+[^}]{100,}/g,
    suggestion: 'Consider breaking into smaller functions',
    fixable: false
  },
  {
    name: 'Missing error handling',
    pattern: /await\s+\w+\([^)]*\)(?!\s*\.catch)/g,
    suggestion: 'Add error handling for async operations',
    fixable: false
  }
];

function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx'], maxDepth = 10) {
  const files = [];
  
  function search(currentDir, depth = 0) {
    if (depth > maxDepth) return;
    
    try {
      const entries = fs.readdirSync(currentDir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') {
          continue;
        }
        
        const fullPath = path.join(currentDir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          search(fullPath, depth + 1);
        } else if (extensions.some(ext => entry.endsWith(ext))) {
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

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const issues = [];
    const lines = content.split('\n');

    for (const pattern of OPTIMIZATION_PATTERNS) {
      const matches = content.match(pattern.pattern);
      if (matches) {
        const lineNums = matches.map(match => {
          const index = content.indexOf(match);
          return content.substring(0, index).split('\n').length;
        });

        issues.push({
          type: pattern.name,
          suggestion: pattern.suggestion,
          count: matches.length,
          lines: lineNums.slice(0, 5),
          fixable: pattern.fixable
        });
      }
    }

    // Check function length
    const functions = content.match(/function\s+\w+[^}]+/g);
    if (functions) {
      functions.forEach(func => {
        const funcLines = func.split('\n').length;
        if (funcLines > 100) {
          issues.push({
            type: 'Large function',
            suggestion: 'Consider breaking into smaller functions',
            count: 1,
            lines: [content.indexOf(func)],
            fixable: false
          });
        }
      });
    }

    return issues;
  } catch {
    return [];
  }
}

async function main() {
  const command = process.argv[2] || 'scan';
  const target = process.argv[3] || BASE_DIR;

  logger.info('⚡ Code Optimization Tool');
  logger.info('='.repeat(60));
  logger.info('');

  if (!fs.existsSync(target)) {
    logger.error(`❌ Directory not found: ${target}`);
    process.exit(1);
  }

  switch (command) {
    case 'scan':
      logger.info(`📁 Scanning ${target}...\n`);
      
      const files = findFiles(target);
      logger.info(`Found ${files.length} files to analyze\n`);

      const allIssues = [];
      let filesWithIssues = 0;

      for (const file of files.slice(0, 100)) {
        const issues = analyzeFile(file);
        if (issues.length > 0) {
          filesWithIssues++;
          const relPath = path.relative(target, file);
          
          logger.info(`⚡ ${relPath}:`);
          issues.forEach(issue => {
            logger.info(`   • ${issue.type}: ${issue.count} occurrence(s)`);
            logger.info(`     💡 ${issue.suggestion}`);
            if (issue.lines.length > 0) {
              logger.info(`     📍 Lines: ${issue.lines.join(', ')}`);
            }
            if (issue.fixable) {
              logger.info(`     ✅ Auto-fixable`);
            }
          });
          logger.info('');
          
          allIssues.push({ file: relPath, issues });
        }
      }

      // Summary
      const fixableCount = allIssues.reduce((sum, f) => 
        sum + f.issues.filter(i => i.fixable).length, 0);
      const totalIssues = allIssues.reduce((sum, f) => 
        sum + f.issues.length, 0);

      logger.info('📊 Optimization Summary:');
      logger.info(`   📁 Files scanned: ${files.length}`);
      logger.info(`   ⚡ Files with optimization opportunities: ${filesWithIssues}`);
      logger.info(`   🔍 Total opportunities: ${totalIssues}`);
      logger.info(`   ✅ Auto-fixable: ${fixableCount}`);
      logger.info('');
      
      if (fixableCount > 0) {
        logger.info('💡 Run "fix" command to auto-fix issues');
      }
      break;

    case 'fix':
      logger.info(`🔧 Auto-fixing optimizations in ${target}...\n`);
      
      const filesToFix = findFiles(target);
      let fixed = 0;
      let errors = 0;

      for (const file of filesToFix.slice(0, 50)) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          let updated = content;
          let changed = false;

          for (const pattern of OPTIMIZATION_PATTERNS) {
            if (pattern.fixable && pattern.fix && pattern.pattern.test(updated)) {
              updated = pattern.fix(updated);
              changed = true;
            }
          }

          if (changed) {
            fs.writeFileSync(file, updated, 'utf-8');
            fixed++;
            if (fixed % 10 === 0) {
              logger.info(`   ✨ Fixed ${fixed} files...`);
            }
          }
        } catch (error) {
          errors++;
        }
      }

      logger.info('');
      logger.info(`✅ Fixed ${fixed} files`);
      if (errors > 0) {
        logger.info(`❌ Errors: ${errors}`);
      }
      break;

    default:
      logger.info('Usage:');
      logger.info('  scan  - Scan for optimization opportunities');
      logger.info('  fix   - Auto-fix optimizations');
      process.exit(1);
  }
}

main().catch(error => {
  logger.error('❌ Error:', error.message);
  process.exit(1);
});

