#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * REGISTRY Validator
 * Ensures all applications properly integrate with REGISTRY system
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

logger.info('🔧 IMPROVEMENT: Creating REGISTRY Validator');
logger.info('   → Validates REGISTRY integration');
logger.info('   → Ensures centralized data consumption');
logger.info('   → Checks for room definitions, style packs, palettes\n');

// REGISTRY integration patterns
const REGISTRY_PATTERNS = [
  {
    name: 'REGISTRY Import',
    pattern: /from.*registry|import.*registry|require.*registry/i,
    required: true,
    description: 'Must import from REGISTRY system'
  },
  {
    name: 'Room Definitions',
    pattern: /room.*definitions|REGISTRY.*rooms|registry.*rooms/i,
    required: false,
    description: 'Should consume room definitions from REGISTRY'
  },
  {
    name: 'Style Packs',
    pattern: /style.*packs|REGISTRY.*styles|registry.*styles/i,
    required: false,
    description: 'Should consume style packs from REGISTRY'
  },
  {
    name: 'Palette Catalogs',
    pattern: /palette.*catalogs|REGISTRY.*palettes|registry.*palettes/i,
    required: false,
    description: 'Should consume palette catalogs from REGISTRY'
  },
  {
    name: 'Schema Validation',
    pattern: /schema.*validation|validate.*schema|registry.*schema/i,
    required: false,
    description: 'Should validate data against REGISTRY schemas'
  }
];

// Anti-patterns: Hardcoded data instead of REGISTRY
const ANTI_PATTERNS = [
  {
    name: 'Hardcoded Room Data',
    pattern: /const.*rooms\s*=\s*\[|rooms:\s*\[|hardcoded.*rooms/i,
    issue: 'Hardcoded room data instead of REGISTRY consumption',
    fix: 'Import from REGISTRY/rooms'
  },
  {
    name: 'Hardcoded Styles',
    pattern: /const.*styles\s*=\s*\{|styles:\s*\{|hardcoded.*styles/i,
    issue: 'Hardcoded styles instead of REGISTRY consumption',
    fix: 'Import from REGISTRY/styles'
  },
  {
    name: 'Hardcoded Palettes',
    pattern: /const.*palettes\s*=\s*\[|palettes:\s*\[|hardcoded.*palettes/i,
    issue: 'Hardcoded palettes instead of REGISTRY consumption',
    fix: 'Import from REGISTRY/palettes'
  }
];

function findCodeFiles() {
  const files = [];
  const dirs = [
    path.join(BASE_DIR, 'packages'),
    path.join(BASE_DIR, 'apps'),
    path.join(BASE_DIR, '..', 'cathedral-real', 'packages'),
    path.join(BASE_DIR, '..', 'cathedral-real', 'apps')
  ];
  
  function searchDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') {
          continue;
        }
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchDir(fullPath);
        } else if (entry.match(/\.(ts|tsx|js|jsx|mjs)$/)) {
          files.push(fullPath);
        }
      }
    } catch {
      // Skip
    }
  }
  
  dirs.forEach(dir => searchDir(dir));
  return files;
}

function validateRegistryIntegration(filePath) {
  const issues = [];
  const found = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check for REGISTRY patterns
    REGISTRY_PATTERNS.forEach(pattern => {
      if (pattern.pattern.test(content)) {
        found.push(pattern.name);
      } else if (pattern.required) {
        issues.push({
          type: 'missing_registry',
          pattern: pattern.name,
          description: pattern.description,
          file: path.relative(BASE_DIR, filePath)
        });
      }
    });
    
    // Check for anti-patterns
    ANTI_PATTERNS.forEach(antiPattern => {
      if (antiPattern.pattern.test(content)) {
        issues.push({
          type: 'anti_pattern',
          pattern: antiPattern.name,
          issue: antiPattern.issue,
          fix: antiPattern.fix,
          file: path.relative(BASE_DIR, filePath)
        });
      }
    });
  } catch {
    // Skip files that can't be read
  }
  
  return { issues, found };
}

async function validateRegistry() {
  UserFeedback.section('REGISTRY Integration Validation');
  UserFeedback.info('Validating REGISTRY integration across all applications...\n');
  
  const files = findCodeFiles();
  logger.info(`Scanning ${files.length} code files...`);
  
  const allIssues = [];
  const allFound = [];
  let compliantFiles = 0;
  
  for (const file of files) {
    const { issues, found } = validateRegistryIntegration(file);
    allIssues.push(...issues);
    allFound.push(...found);
    
    if (issues.length === 0) {
      compliantFiles++;
    }
  }
  
  UserFeedback.section('REGISTRY Integration Results');
  logger.info(`Files scanned: ${files.length}`);
  logger.info(`Compliant files: ${compliantFiles} (${(compliantFiles / files.length * 100).toFixed(1)}%)`);
  logger.info(`Issues found: ${allIssues.length}\n`);
  
  if (allIssues.length > 0) {
    logger.warn('REGISTRY Integration Issues:\n');
    
    const byType = {};
    allIssues.forEach(issue => {
      if (!byType[issue.type]) {
        byType[issue.type] = [];
      }
      byType[issue.type].push(issue);
    });
    
    Object.entries(byType).forEach(([type, issues]) => {
      logger.warn(`${type}: ${issues.length} occurrences`);
      issues.slice(0, 5).forEach(issue => {
        logger.info(`  - ${issue.file}`);
        logger.info(`    ${issue.issue || issue.description}`);
        if (issue.fix) {
          logger.info(`    Fix: ${issue.fix}`);
        }
      });
      if (issues.length > 5) {
        logger.info(`  ... and ${issues.length - 5} more`);
      }
      logger.info('');
    });
  } else {
    UserFeedback.success('✅ All files properly integrate with REGISTRY!');
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    filesScanned: files.length,
    compliantFiles: compliantFiles,
    complianceRate: (compliantFiles / files.length * 100).toFixed(1),
    issues: allIssues,
    patternsFound: [...new Set(allFound)]
  };
  
  const reportPath = path.join(BASE_DIR, '.registry-validation.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  logger.info(`\n📄 Validation report saved: ${reportPath}`);
  
  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  validateRegistry();
}

export { validateRegistry, REGISTRY_PATTERNS, ANTI_PATTERNS };

