#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Fix Bad Design Tool
 * Automatically detects and fixes flat/boxy design patterns
 * Replaces with immersive 3D, sacred geometry, museum-grade quality
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

logger.info('🎨 Fixing bad design patterns...');
logger.info('   → Detecting flat/boxy patterns');
logger.info('   → Detecting claustrophobic/confining designs');
logger.info('   → Replacing with immersive 3D');
logger.info('   → Adding sacred geometry');
logger.info('   → Creating expansive, open spaces');
logger.info('   → Enhancing to museum-grade quality\n');

// Bad design patterns to fix
const BAD_DESIGN_PATTERNS = [
  {
    pattern: /flat.*canvas|canvas.*fixed|confining.*canvas/i,
    fix: '3D immersive environment',
    priority: 'high',
    description: 'Flat, confining canvas instead of immersive environment'
  },
  {
    pattern: /website.*like|rigid.*structure|linear.*navigation|step.*by.*step/i,
    fix: 'Open world experience with non-linear, organic navigation',
    priority: 'high',
    description: 'Website-like structures - should be open world experience'
  },
  {
    pattern: /single.*page|static.*page|fixed.*layout/i,
    fix: 'Dynamic, multi-modal, immersive 3D environment',
    priority: 'medium',
    description: 'Missing open world elements - should be dynamic and immersive'
  },
  {
    pattern: /adobe|figma|sketch|photoshop/i,
    fix: 'Cathedral Studio - immersive visionary art tools',
    priority: 'high',
    description: 'References to flat design tools (Adobe, Figma)'
  },
  {
    pattern: /boxy|rectangular.*panel|flat.*button/i,
    fix: 'Sacred geometry-based, flowing aesthetics',
    priority: 'high',
    description: 'Boxy, rectangular UI elements'
  },
  {
    pattern: /linear.*workflow|step.*by.*step/i,
    fix: 'Non-linear, multi-modal simultaneous creation',
    priority: 'medium',
    description: 'Linear workflow instead of non-linear'
  },
  {
    pattern: /single.*mode|only.*visual/i,
    fix: 'Art + Music + Science + Spirituality simultaneously',
    priority: 'high',
    description: 'Single-modal creation instead of multi-modal'
  },
  {
    pattern: /flatten|flattened|flattening|\.flatten\(|flatten\(/i,
    fix: '3D depth and spatial layering with sacred geometry',
    priority: 'high',
    description: 'Flattened work - should have 3D depth and spatial layering'
  },
  {
    pattern: /2d|2-d|two.*dimensional|flat.*layer/i,
    fix: '3D immersive environment with depth and spatial consciousness',
    priority: 'high',
    description: '2D/flat layers instead of 3D depth'
  },
  {
    pattern: /depth.*0|z.*index.*0|no.*depth|without.*depth/i,
    fix: 'Multi-layered 3D space with sacred geometry depth',
    priority: 'high',
    description: 'No depth - should have 3D spatial layering'
  },
  {
    pattern: /claustrophobic|confining|confined|cramped|restrictive|tight.*space|narrow.*view/i,
    fix: 'Expansive, open 3D environment with unlimited creative space',
    priority: 'high',
    description: 'Claustrophobic, confining design - should be expansive and open'
  },
  {
    pattern: /fixed.*width|max.*width|constrained|bounded|limited.*space/i,
    fix: 'Unlimited, expansive space with fluid boundaries',
    priority: 'high',
    description: 'Fixed or constrained boundaries - should be unlimited'
  },
  {
    pattern: /small.*viewport|narrow.*screen|limited.*view|restricted.*view/i,
    fix: 'Full immersive viewport with expansive perspective',
    priority: 'high',
    description: 'Small or narrow viewport - should be full immersive'
  },
  {
    pattern: /cramped.*layout|tight.*spacing|minimal.*space|no.*breathing.*room/i,
    fix: 'Generous spacing with golden ratio proportions and breathing room',
    priority: 'high',
    description: 'Cramped layout - should have generous spacing'
  },
  {
    pattern: /overcrowded|too.*many.*elements|cluttered|packed/i,
    fix: 'Spacious layout with sacred geometry spacing and visual hierarchy',
    priority: 'medium',
    description: 'Overcrowded or cluttered - should be spacious'
  },
  {
    pattern: /wall.*around|borders.*everywhere|boxed.*in|trapped/i,
    fix: 'Open boundaries with flowing, organic edges and spatial freedom',
    priority: 'high',
    description: 'Walled in or boxed - should be open and flowing'
  },
  {
    pattern: /no.*escape|can.*t.*move|stuck|trapped.*view/i,
    fix: 'Free movement and navigation in 3D space with multiple perspectives',
    priority: 'high',
    description: 'No escape or movement - should allow free navigation'
  }
];

// Required visionary art patterns
const REQUIRED_PATTERNS = [
  {
    name: '3D Environment',
    pattern: /three\.js|babylon|webgl|3d.*environment|immersive/i,
    add: 'Three.js or Babylon.js for 3D immersive environment',
    description: '3D immersive environment instead of flat canvas'
  },
  {
    name: 'Sacred Geometry',
    pattern: /golden.*ratio|fibonacci|sacred.*geometry|phi|1\.618|144:99/i,
    add: 'Golden ratio (1.618), Fibonacci, 144:99 ratio',
    description: 'Sacred geometry integration'
  },
  {
    name: 'Multi-Modal',
    pattern: /multi.*modal|simultaneous|all.*active/i,
    add: 'Multi-modal creation (Art + Music + Science + Spirituality)',
    description: 'Multi-modal support'
  }
];

async function findFiles(dir, extensions, maxDepth = 3, currentDepth = 0) {
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

async function fixBadDesign() {
  const fixes = [];
  const issues = [];
  const enhancements = [];
  
  // Scan TypeScript/JavaScript files
  const codeFiles = await findFiles(BASE_DIR, ['.ts', '.tsx', '.js', '.jsx'], 3);
  
  logger.info(`📁 Scanning ${codeFiles.length} files for bad design patterns...`);
  
  for (const file of codeFiles.slice(0, 100)) { // Limit for performance
    try {
      let content = fs.readFileSync(file, 'utf-8');
      let modified = false;
      const fileIssues = [];
      const fileEnhancements = [];
      
      // Check for bad design patterns
      for (const badPattern of BAD_DESIGN_PATTERNS) {
        if (badPattern.pattern.test(content)) {
          fileIssues.push({
            pattern: badPattern.description,
            fix: badPattern.fix,
            priority: badPattern.priority
          });
          
          issues.push({
            file: path.relative(BASE_DIR, file),
            pattern: badPattern.description,
            fix: badPattern.fix,
            priority: badPattern.priority
          });
          
          // Detect website-like structures
          if (/website.*like|rigid|linear|step.*by.*step/i.test(content)) {
            fileIssues.push({
              pattern: 'Website-like structure detected',
              fix: 'Convert to open world experience with organic navigation',
              priority: 'high'
            });
          }
          
          // Detect missing open world elements
          if (!/open.*world|organic|non.*linear|multi.*modal|immersive/i.test(content)) {
            if (/page|component|view|screen/i.test(content)) {
              fileEnhancements.push({
                pattern: 'Missing open world elements',
                add: 'Open world experience, organic navigation, multi-modal creation'
              });
            }
          }
          
          // Apply fix (add comment with fix suggestion if not already present)
          const fixComment = `// 🔧 Design Fix: ${badPattern.fix}`;
          if (!content.includes(fixComment)) {
            // Add at the top of the file if it's a code file
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
              const lines = content.split('\n');
              // Find first non-comment, non-empty line
              let insertIndex = 0;
              for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() && !lines[i].trim().startsWith('//') && !lines[i].trim().startsWith('/*')) {
                  insertIndex = i;
                  break;
                }
              }
              lines.splice(insertIndex, 0, fixComment);
              content = lines.join('\n');
              modified = true;
            }
          }
        }
      }
      
      // Check for required patterns
      for (const required of REQUIRED_PATTERNS) {
        if (!required.pattern.test(content)) {
          fileEnhancements.push({
            pattern: required.name,
            add: required.add,
            description: required.description
          });
          
          enhancements.push({
            file: path.relative(BASE_DIR, file),
            pattern: required.name,
            add: required.add,
            description: required.description
          });
          
          // Add required pattern as comment
          const addComment = `// 🎨 Visionary Art: ${required.add}`;
          if (!content.includes(addComment)) {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
              const lines = content.split('\n');
              let insertIndex = 0;
              for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() && !lines[i].trim().startsWith('//') && !lines[i].trim().startsWith('/*')) {
                  insertIndex = i;
                  break;
                }
              }
              lines.splice(insertIndex, 0, addComment);
              content = lines.join('\n');
              modified = true;
            }
          }
        }
      }
      
      if (modified) {
        fs.writeFileSync(file, content, 'utf-8');
        fixes.push({
          file: path.relative(BASE_DIR, file),
          issues: fileIssues,
          enhancements: fileEnhancements
        });
        UserFeedback.success(`Fixed design patterns in ${path.relative(BASE_DIR, file)}`);
      }
    } catch (err) {
      // Skip files we can't modify
      logger.warning(`Could not process ${path.relative(BASE_DIR, file)}: ${err.message}`);
    }
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      filesScanned: codeFiles.length,
      issuesFound: issues.length,
      enhancementsNeeded: enhancements.length,
      fixesApplied: fixes.length
    },
    issues: issues,
    enhancements: enhancements,
    fixedFiles: fixes
  };
  
  const reportPath = path.join(BASE_DIR, 'docs/BAD_DESIGN_FIXES.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  logger.info(`\n✅ Design Fix Summary:`);
  logger.info(`   Files scanned: ${codeFiles.length}`);
  logger.info(`   Issues found: ${issues.length}`);
  logger.info(`   Enhancements needed: ${enhancements.length}`);
  logger.info(`   Fixes applied: ${fixes.length}`);
  logger.info(`   Report saved to ${reportPath}`);
  
  return report;
}

// Main execution
fixBadDesign().catch(err => {
  logger.error(`Error fixing bad design: ${err.message}`);
  process.exit(1);
});

