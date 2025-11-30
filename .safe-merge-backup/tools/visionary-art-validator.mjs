#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Visionary Art Validator
 * Ensures all tools and interfaces replace flat/boxy designs with immersive 3D visionary art
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';
import AlignmentDetector from './alignment-detector.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Visionary Art Validator');
logger.info('   → Replaces flat/boxy interfaces (Adobe, Figma)');
logger.info('   → Validates immersive 3D environments');
logger.info('   → Ensures visionary art standards\n');

// Anti-patterns: Flat/boxy design patterns to avoid
const FLAT_BOXY_ANTI_PATTERNS = [
  {
    name: 'Fixed Canvas',
    pattern: /fixed.*canvas|canvas.*fixed|confining.*canvas/i,
    issue: 'Flat, boxy canvas instead of immersive environment',
    replacement: '3D immersive environment or "walking into a book" experience'
  },
  {
    name: 'Linear Workflow',
    pattern: /step.*by.*step|linear.*workflow|sequential.*process/i,
    issue: 'Linear workflow doesn\'t match non-linear creative process',
    replacement: 'Non-linear, multi-modal simultaneous creation'
  },
  {
    name: 'Single Modal',
    pattern: /only.*visual|single.*mode|one.*at.*a.*time/i,
    issue: 'Single-modal creation instead of multi-modal',
    replacement: 'Art + Music + Science + Spirituality simultaneously'
  },
  {
    name: 'Flat UI Elements',
    pattern: /flat.*button|boxy.*interface|rectangular.*panel/i,
    issue: 'Flat, boxy UI elements',
    replacement: 'Sacred geometry-based, flowing, spiral-based aesthetics'
  },
  {
    name: 'Adobe/Figma References',
    pattern: /adobe|figma|sketch|photoshop|illustrator/i,
    issue: 'References to flat design tools',
    replacement: 'Cathedral Studio - immersive visionary art tools'
  },
  {
    name: 'Claustrophobic Design',
    pattern: /claustrophobic|confining|confined|cramped|restrictive|tight.*space|narrow.*view/i,
    issue: 'Claustrophobic, confining design - feels trapped or restricted',
    replacement: 'Expansive, open 3D environment with unlimited creative space'
  },
  {
    name: 'Fixed Boundaries',
    pattern: /fixed.*width|max.*width|constrained|bounded|limited.*space|wall.*around/i,
    issue: 'Fixed or constrained boundaries - limits creative expression',
    replacement: 'Unlimited, expansive space with fluid boundaries'
  },
  {
    name: 'Cramped Layout',
    pattern: /cramped.*layout|tight.*spacing|minimal.*space|no.*breathing.*room|overcrowded/i,
    issue: 'Cramped layout - no breathing room',
    replacement: 'Generous spacing with golden ratio proportions and breathing room'
  },
  {
    name: 'Restricted Movement',
    pattern: /no.*escape|can.*t.*move|stuck|trapped.*view|restricted.*navigation/i,
    issue: 'No escape or movement - feels trapped',
    replacement: 'Free movement and navigation in 3D space with multiple perspectives'
  },
  {
    name: 'Flattened Work',
    pattern: /flatten|flattened|flattening|\.flatten\(|2d|2-d|two.*dimensional/i,
    issue: 'Flattened work - no depth or spatial layering',
    replacement: '3D depth and spatial layering with sacred geometry'
  }
];

// Visionary art patterns to validate
const VISIONARY_ART_PATTERNS = [
  {
    name: '3D Environment',
    pattern: /three\.js|babylon|webgl|3d.*environment|immersive/i,
    required: true,
    description: '3D immersive environment instead of flat canvas'
  },
  {
    name: 'Sacred Geometry',
    pattern: /golden.*ratio|fibonacci|sacred.*geometry|phi|1\.618/i,
    required: true,
    description: 'Sacred geometry integration (golden ratio, Fibonacci)'
  },
  {
    name: 'Multi-Modal',
    pattern: /multi.*modal|simultaneous|all.*active|art.*music.*science/i,
    required: true,
    description: 'Multi-modal creation (Art + Music + Science + Spirituality)'
  },
  {
    name: 'Immersive Experience',
    pattern: /walk.*into|immersive|realm|environment|3d.*space/i,
    required: true,
    description: 'Immersive "walking into a book" experience'
  },
  {
    name: 'Non-Linear',
    pattern: /non.*linear|jump.*between|instant.*switch|all.*available/i,
    required: true,
    description: 'Non-linear navigation and workflow'
  }
];

function scanForFlatBoxyPatterns(filePath) {
  const issues = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    FLAT_BOXY_ANTI_PATTERNS.forEach(antiPattern => {
      if (antiPattern.pattern.test(content)) {
        issues.push({
          type: 'flat_boxy_pattern',
          pattern: antiPattern.name,
          issue: antiPattern.issue,
          replacement: antiPattern.replacement,
          file: path.relative(BASE_DIR, filePath)
        });
      }
    });
  } catch (error) {
    // Skip files that can't be read
  }
  
  return issues;
}

function validateVisionaryArtStandards(filePath) {
  const missing = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    VISIONARY_ART_PATTERNS.forEach(pattern => {
      if (pattern.required && !pattern.pattern.test(content)) {
        missing.push({
          type: 'missing_visionary_pattern',
          pattern: pattern.name,
          description: pattern.description,
          file: path.relative(BASE_DIR, filePath)
        });
      }
    });
  } catch (error) {
    // Skip files that can't be read
  }
  
  return missing;
}

function findRelevantFiles() {
  const files = [];
  const dirs = [
    path.join(BASE_DIR, 'packages'),
    path.join(BASE_DIR, 'apps'),
    path.join(BASE_DIR, 'tools')
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
      // Skip directories that can't be read
    }
  }
  
  dirs.forEach(dir => searchDir(dir));
  return files;
}

async function validateVisionaryArt() {
  UserFeedback.section('Visionary Art Validation');
  UserFeedback.info('Scanning for flat/boxy patterns and validating visionary art standards...\n');
  
  const files = findRelevantFiles();
  logger.info(`Scanning ${files.length} files...`);
  
  const flatBoxyIssues = [];
  const missingStandards = [];
  const alignmentIssues = [];
  const detector = new AlignmentDetector();
  
  for (const file of files) {
    const issues = scanForFlatBoxyPatterns(file);
    flatBoxyIssues.push(...issues);
    
    const missing = validateVisionaryArtStandards(file);
    missingStandards.push(...missing);
    
    // Check alignment
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const alignment = detector.analyzeFile(file, content);
      if (alignment.misaligned && alignment.misaligned.length > 0) {
        alignmentIssues.push({
          file: path.relative(BASE_DIR, file),
          issues: alignment.misaligned.map(i => ({
            type: i.type,
            severity: i.severity,
            description: i.description
          })),
          recommendations: alignment.recommendations
        });
      }
    } catch (err) {
      // Skip files we can't read
    }
  }
  
  UserFeedback.section('Flat/Boxy Pattern Detection');
  if (flatBoxyIssues.length > 0) {
    logger.warn(`Found ${flatBoxyIssues.length} flat/boxy patterns that need replacement:`);
    
    const byPattern = {};
    flatBoxyIssues.forEach(issue => {
      if (!byPattern[issue.pattern]) {
        byPattern[issue.pattern] = [];
      }
      byPattern[issue.pattern].push(issue);
    });
    
    Object.entries(byPattern).forEach(([pattern, issues]) => {
      logger.warn(`\n  ${pattern}: ${issues.length} occurrences`);
      issues.slice(0, 3).forEach(issue => {
        logger.info(`    - ${issue.file}`);
        logger.info(`      Issue: ${issue.issue}`);
        logger.info(`      Replace with: ${issue.replacement}`);
      });
      if (issues.length > 3) {
        logger.info(`    ... and ${issues.length - 3} more`);
      }
    });
  } else {
    UserFeedback.success('✅ No flat/boxy patterns detected!');
  }
  
  UserFeedback.section('Visionary Art Standards Validation');
  if (missingStandards.length > 0) {
    logger.warn(`Found ${missingStandards.length} files missing visionary art standards:`);
    
    const byPattern = {};
    missingStandards.forEach(missing => {
      if (!byPattern[missing.pattern]) {
        byPattern[missing.pattern] = [];
      }
      byPattern[missing.pattern].push(missing);
    });
    
    Object.entries(byPattern).forEach(([pattern, missing]) => {
      logger.warn(`\n  Missing ${pattern}: ${missing.length} files`);
      logger.info(`    Description: ${missing[0].description}`);
      missing.slice(0, 3).forEach(m => {
        logger.info(`    - ${m.file}`);
      });
      if (missing.length > 3) {
        logger.info(`    ... and ${missing.length - 3} more`);
      }
    });
  } else {
    UserFeedback.success('✅ All files meet visionary art standards!');
  }
  
  UserFeedback.section('Alignment Checking');
  if (alignmentIssues.length > 0) {
    logger.warn(`Found ${alignmentIssues.length} files with alignment issues:`);
    
    const highSeverity = alignmentIssues.filter(f => 
      f.issues.some(i => i.severity === 'high')
    );
    
    if (highSeverity.length > 0) {
      logger.warn(`\n  High Severity Alignment Issues: ${highSeverity.length} files`);
      highSeverity.slice(0, 5).forEach(issue => {
        logger.info(`    - ${issue.file}`);
        issue.issues.filter(i => i.severity === 'high').forEach(i => {
          logger.info(`      ${i.type}: ${i.description}`);
        });
        if (issue.recommendations.length > 0) {
          logger.info(`      Fix: ${issue.recommendations[0]}`);
        }
      });
    }
    
    const mediumSeverity = alignmentIssues.filter(f => 
      f.issues.some(i => i.severity === 'medium') && 
      !f.issues.some(i => i.severity === 'high')
    );
    
    if (mediumSeverity.length > 0) {
      logger.info(`\n  Medium Severity: ${mediumSeverity.length} files (see report for details)`);
    }
  } else {
    UserFeedback.success('✅ All files are aligned with Rebecca Respawn\'s vision!');
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    filesScanned: files.length,
    flatBoxyIssues: flatBoxyIssues.length,
    missingStandards: missingStandards.length,
    alignmentIssues: alignmentIssues.length,
    issues: flatBoxyIssues,
    missing: missingStandards,
    alignment: alignmentIssues,
    summary: {
      needsReplacement: flatBoxyIssues.length,
      needsEnhancement: missingStandards.length,
      needsAlignment: alignmentIssues.length,
      visionaryArtCompliant: flatBoxyIssues.length === 0 && missingStandards.length === 0 && alignmentIssues.length === 0
    }
  };
  
  const reportPath = path.join(BASE_DIR, '.visionary-art-validation.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  logger.info(`\n📄 Validation report saved: ${reportPath}`);
  
  UserFeedback.section('Summary');
  logger.info(`Files scanned: ${files.length}`);
  logger.info(`Flat/boxy patterns found: ${flatBoxyIssues.length}`);
  logger.info(`Missing visionary standards: ${missingStandards.length}`);
  
  if (report.summary.visionaryArtCompliant) {
    UserFeedback.success('\n✅ All code meets visionary art standards!');
    UserFeedback.success('No flat/boxy patterns detected. Immersive 3D environments confirmed.');
  } else {
    UserFeedback.warning(`\n⚠️  ${flatBoxyIssues.length + missingStandards.length} improvements needed`);
    UserFeedback.info('See report above for specific recommendations.');
  }
  
  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  validateVisionaryArt();
}

export { validateVisionaryArt, scanForFlatBoxyPatterns, validateVisionaryArtStandards };

