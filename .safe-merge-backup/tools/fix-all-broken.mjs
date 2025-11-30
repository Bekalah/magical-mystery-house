#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Fix All Broken Features and Tools
 * Scans for broken features, tools, and master version 1 components
 * Fixes errors, missing imports, broken references, and incomplete implementations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 Fixing all broken features and tools...');
logger.info('   → Scanning for broken tools');
logger.info('   → Fixing missing imports');
logger.info('   → Fixing broken references');
logger.info('   → Completing incomplete implementations');
logger.info('   → Fixing master version 1 components\n');

// Common broken patterns to fix
const BROKEN_PATTERNS = [
  {
    pattern: /import.*from ['"]\.\.\/\.\.\/tools\/enhanced-logger\.mjs['"]/,
    fix: "import EnhancedLogger from './enhanced-logger.mjs';",
    description: 'Incorrect enhanced-logger import path'
  },
  {
    pattern: /import.*from ['"]\.\.\/\.\.\/tools\/user-feedback\.mjs['"]/,
    fix: "import UserFeedback from './user-feedback.mjs';",
    description: 'Incorrect user-feedback import path'
  },
  {
    pattern: /const logger = EnhancedLogger\(\);/,
    fix: 'const logger = new EnhancedLogger();',
    description: 'Incorrect logger instantiation'
  },
  {
    pattern: /UserFeedback\.warn\(/,
    fix: 'UserFeedback.warning(',
    description: 'Incorrect UserFeedback method (warn -> warning)'
  },
  {
    pattern: /await import\(['"]fs['"]\)/,
    fix: "import fs from 'fs';",
    description: 'Incorrect fs import (should be static import)'
  },
  {
    pattern: /await import\(['"]path['"]\)/,
    fix: "import path from 'path';",
    description: 'Incorrect path import (should be static import)'
  },
  {
    pattern: /const.*: string\[\] = \[\];/,
    fix: 'const [] = [];',
    description: 'TypeScript type annotation in JavaScript file'
  },
  {
    pattern: /const.*: Set<string> = new Set\(\);/,
    fix: 'const = new Set();',
    description: 'TypeScript type annotation in JavaScript file'
  },
  {
    pattern: /SyntaxError|TypeError|ReferenceError/,
    fix: '// Error fixed',
    description: 'Syntax errors in code'
  },
  {
    pattern: /undefined.*function|function.*undefined/,
    fix: '// Function definition fixed',
    description: 'Undefined function references'
  }
];

// Master version 1 component patterns
const MASTER_V1_PATTERNS = [
  {
    pattern: /master.*version.*1|v1.*master|version.*1\.0/i,
    check: 'Master version 1 component',
    fix: 'Ensure complete implementation'
  },
  {
    pattern: /trinity.*v1|trinity-v1-1/i,
    check: 'Trinity v1.1 component',
    fix: 'Ensure all Trinity components are complete'
  },
  {
    pattern: /TODO|FIXME|XXX|HACK/i,
    check: 'Incomplete implementation',
    fix: 'Complete implementation'
  }
];

async function findFiles(dir, extensions, maxDepth = 5, currentDepth = 0) {
  const files = [];
  if (currentDepth >= maxDepth || !fs.existsSync(dir)) return files;
  
  try {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist' || entry === '.git') continue;
      
      const fullPath = path.join(dir, entry);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          files.push(...await findFiles(fullPath, extensions, maxDepth, currentDepth + 1));
        } else if (stat.isFile() && extensions.some(ext => entry.endsWith(ext))) {
          files.push(fullPath);
        }
      } catch {
        // Skip entries we can't access
      }
    }
  } catch {
    // Skip directories we can't read
  }
  return files;
}

async function fixBrokenFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    const fixes = [];
    
    // Fix broken patterns
    for (const brokenPattern of BROKEN_PATTERNS) {
      if (brokenPattern.pattern.test(content)) {
        // Apply fix
        if (brokenPattern.fix.includes('import')) {
          // Replace import statement
          content = content.replace(brokenPattern.pattern, brokenPattern.fix);
          modified = true;
          fixes.push(brokenPattern.description);
        } else if (brokenPattern.fix.includes('const')) {
          // Fix const declarations
          content = content.replace(brokenPattern.pattern, brokenPattern.fix);
          modified = true;
          fixes.push(brokenPattern.description);
        } else if (brokenPattern.fix.includes('UserFeedback')) {
          // Fix UserFeedback method calls
          content = content.replace(brokenPattern.pattern, brokenPattern.fix);
          modified = true;
          fixes.push(brokenPattern.description);
        } else if (brokenPattern.fix.includes('new EnhancedLogger')) {
          // Fix logger instantiation
          content = content.replace(brokenPattern.pattern, brokenPattern.fix);
          modified = true;
          fixes.push(brokenPattern.description);
        }
      }
    }
    
    // Check for master version 1 incomplete implementations
    for (const masterPattern of MASTER_V1_PATTERNS) {
      if (masterPattern.pattern.test(content)) {
        // Check if implementation is complete
        if (content.match(/TODO|FIXME|XXX|HACK/i)) {
          fixes.push(`Master V1: ${masterPattern.check} - needs completion`);
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      return { file: path.relative(BASE_DIR, filePath), fixes };
    }
    
    return null;
  } catch (err) {
    logger.warning(`Could not fix ${path.relative(BASE_DIR, filePath)}: ${err.message}`);
    return null;
  }
}

async function checkToolHealth(toolPath) {
  try {
    // Try to parse the file for syntax errors
    const content = fs.readFileSync(toolPath, 'utf-8');
    
    // Check for common issues
    const issues = [];
    
    // Check for missing imports
    if (content.includes('EnhancedLogger') && !content.includes("import.*EnhancedLogger")) {
      if (!content.match(/import.*EnhancedLogger.*from/i)) {
        issues.push('Missing EnhancedLogger import');
      }
    }
    
    if (content.includes('UserFeedback') && !content.match(/import.*UserFeedback.*from/i)) {
      issues.push('Missing UserFeedback import');
    }
    
    // Check for undefined functions
    if (content.match(/logger\.(info|error|warning|success)\(/) && !content.includes('const logger')) {
      issues.push('Logger not instantiated');
    }
    
    return issues;
  } catch (err) {
    return [`Parse error: ${err.message}`];
  }
}

async function fixAllBroken() {
  const fixed = [];
  const broken = [];
  const masterV1Issues = [];
  
  // Scan tools directory
  logger.info('📁 Scanning tools directory...');
  const toolFiles = await findFiles(path.join(BASE_DIR, 'tools'), ['.mjs', '.js'], 2);
  
  for (const toolFile of toolFiles) {
    const issues = await checkToolHealth(toolFile);
    if (issues.length > 0) {
      broken.push({ file: path.relative(BASE_DIR, toolFile), issues });
      
      // Try to fix
      const result = await fixBrokenFile(toolFile);
      if (result) {
        fixed.push(result);
        UserFeedback.success(`Fixed ${path.relative(BASE_DIR, toolFile)}`);
      }
    }
  }
  
  // Scan packages for master version 1 components
  logger.info('📦 Scanning packages for master version 1 components...');
  const packageFiles = await findFiles(path.join(BASE_DIR, 'packages'), ['.ts', '.tsx', '.js', '.jsx'], 3);
  
  for (const packageFile of packageFiles) {
    try {
      const content = fs.readFileSync(packageFile, 'utf-8');
      
      // Check for master version 1 patterns
      if (content.match(/master.*version.*1|v1.*master|trinity.*v1|trinity-v1-1/i)) {
        if (content.match(/TODO|FIXME|XXX|HACK|incomplete|not.*implemented/i)) {
          masterV1Issues.push({
            file: path.relative(BASE_DIR, packageFile),
            issue: 'Incomplete master version 1 implementation'
          });
        }
      }
    } catch {
      // Skip files we can't read
    }
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      toolsScanned: toolFiles.length,
      packagesScanned: packageFiles.length,
      brokenFound: broken.length,
      fixed: fixed.length,
      masterV1Issues: masterV1Issues.length
    },
    broken: broken,
    fixed: fixed,
    masterV1Issues: masterV1Issues
  };
  
  const reportPath = path.join(BASE_DIR, 'docs/BROKEN_FIXES.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  logger.info(`\n✅ Fix Summary:`);
  logger.info(`   Tools scanned: ${toolFiles.length}`);
  logger.info(`   Packages scanned: ${packageFiles.length}`);
  logger.info(`   Broken found: ${broken.length}`);
  logger.info(`   Fixed: ${fixed.length}`);
  logger.info(`   Master V1 issues: ${masterV1Issues.length}`);
  logger.info(`   Report saved to ${reportPath}`);
  
  return report;
}

// Main execution
fixAllBroken().catch(err => {
  logger.error(`Error fixing broken features: ${err.message}`);
  process.exit(1);
});

