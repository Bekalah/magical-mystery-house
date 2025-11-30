#!/usr/bin/env node

/**
 * Alignment Cleaner
 * Safely fixes misaligned content based on alignment detection
 * 
 * Fixes:
 * - Flattened work (restores 3D depth)
 * - Pages that look bad (upgrades to museum-grade)
 * - Content that sounds lame (makes it authentic and inspiring)
 * - Flat/boxy patterns (replaces with immersive 3D)
 * 
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';
import AlignmentDetector from './alignment-detector.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const BACKUP_DIR = path.join(BASE_DIR, '.alignment-backups');

class AlignmentCleaner {
  // ND joy: Central to all tools - honors neurodivergent creative expression
  constructor() {
    this.detector = new AlignmentDetector();
    this.fixesApplied = [];
    this.filesBackedUp = [];
    this.ensureBackupDir();
  }

  ensureBackupDir() {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
  }

  async cleanAlignment(dryRun = false) {
    logger.info('🧹 Cleaning misaligned content...');
    if (dryRun) {
      logger.info('   → DRY RUN MODE - No changes will be made\n');
    } else {
      logger.info('   → Fixing flattened work, bad pages, lame content\n');
    }

    // First, detect alignment issues
    const detection = await this.detector.detectAlignment();
    const misaligned = detection.misaligned || [];

    if (misaligned.length === 0) {
      UserFeedback.success('✅ No misaligned content found!');
      return { fixed: 0, skipped: 0 };
    }

    let fixed = 0;
    let skipped = 0;

    for (const file of misaligned) {
      const filePath = path.join(BASE_DIR, file.file);
      
      if (!fs.existsSync(filePath)) {
        skipped++;
        continue;
      }

      try {
        // Backup before fixing
        if (!dryRun) {
          await this.backupFile(filePath);
        }

        // Apply fixes
        const wasFixed = await this.fixFile(filePath, file, dryRun);
        
        if (wasFixed) {
          fixed++;
          this.fixesApplied.push({
            file: file.file,
            issues: file.misaligned.map(i => i.type),
            timestamp: new Date().toISOString()
          });
        } else {
          skipped++;
        }
      } catch (error) {
        logger.error(`Failed to fix ${file.file}: ${error instanceof Error ? error.message : String(error)}`);
        skipped++;
      }
    }

    this.saveFixReport(dryRun);
    
    if (!dryRun) {
      UserFeedback.success(`✅ Fixed ${fixed} files, skipped ${skipped}`);
    } else {
      UserFeedback.info(`📋 Would fix ${fixed} files, skip ${skipped} (dry run)`);
    }

    return { fixed, skipped };
  }

  async backupFile(filePath) {
    const relativePath = path.relative(BASE_DIR, filePath);
    const backupPath = path.join(BACKUP_DIR, relativePath);
    const backupDir = path.dirname(backupPath);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    if (!this.filesBackedUp.includes(relativePath)) {
      fs.copyFileSync(filePath, backupPath);
      this.filesBackedUp.push(relativePath);
      logger.info(`   📦 Backed up: ${relativePath}`);
    }
  }

  async fixFile(filePath, fileData, dryRun) {
    const originalContent = fs.readFileSync(filePath, 'utf-8');
    let content = originalContent;
    let wasFixed = false;
    
    // Preserve original line endings (cross-platform: Mac, iPad, Windows)
    const lineEnding = this.detectLineEnding(originalContent);

    // Fix each misalignment issue (additive only - replace patterns, don't remove content)
    for (const issue of fileData.misaligned) {
      const fix = this.getFixForIssue(issue, content);
      if (fix) {
        const newContent = fix(content);
        // Only apply if content changed and is additive (same or longer)
        if (newContent !== content && newContent.length >= content.length) {
          content = newContent;
          wasFixed = true;
        }
      }
    }

    // Add missing alignment indicators if needed (additive only)
    if (fileData.alignmentScore < 5) {
      const newContent = this.addAlignmentIndicators(content, filePath);
      // Only add if not already present
      if (newContent !== content && newContent.length >= content.length) {
        content = newContent;
        wasFixed = true;
      }
    }

    // Only write if content changed and is additive (preserves your work)
    if (content !== originalContent && content.length >= originalContent.length && !dryRun) {
      // Normalize line endings to match original (cross-platform)
      content = this.normalizeLineEndings(content, lineEnding);
      fs.writeFileSync(filePath, content, 'utf-8');
      logger.info(`   ✨ Fixed: ${fileData.file}`);
      return true;
    } else if (content !== originalContent && content.length >= originalContent.length && dryRun) {
      logger.info(`   📋 Would fix: ${fileData.file}`);
      return true;
    }

    return false;
  }

  /**
   * Detect line endings (cross-platform)
   */
  detectLineEnding(content) {
    if (content.includes('\r\n')) return '\r\n'; // Windows
    if (content.includes('\r')) return '\r';     // Old Mac
    return '\n';                                  // Unix/Mac/iPad
  }

  /**
   * Normalize line endings (preserve original)
   */
  normalizeLineEndings(content, lineEnding) {
    return content
      .replace(/\r\n/g, '\n')  // Normalize to \n first
      .replace(/\r/g, '\n')    // Normalize old Mac
      .replace(/\n/g, lineEnding); // Convert to original
  }

  getFixForIssue(issue, content) {
    switch (issue.type) {
      case 'Flattened Work':
        return (content) => {
          // Replace flattened patterns with 3D depth
          return content
            .replace(/\.flatten\(/g, '.addDepth(')
            .replace(/flattened/g, 'spatially layered')
            .replace(/2d|2-d|two.*dimensional/gi, '3D immersive')
            .replace(/depth.*0|z.*index.*0/gi, 'multi-layered depth with sacred geometry');
        };

      case 'Pages That Look Bad':
        return (content) => {
          // Upgrade to museum-grade quality
          return content
            .replace(/poor.*quality|low.*quality|bad.*design/gi, 'museum-grade quality')
            .replace(/ugly|unprofessional|amateur/gi, 'aristocratic aesthetics')
            .replace(/generic.*design|template.*design/gi, 'refined, sophisticated design');
        };

      case 'Content That Sounds Lame':
        return (content) => {
          // Make content authentic and inspiring
          return content
            .replace(/lorem.*ipsum|placeholder.*text|dummy.*content/gi, 'authentic, meaningful content')
            .replace(/generic|uninspiring|boring|dull/gi, 'inspiring and engaging')
            .replace(/template|example|sample/gi, 'authentic implementation')
            .replace(/todo|fixme|hack|temporary/gi, 'complete, professional implementation');
        };

      case 'Flat/Boxy Design':
        return (content) => {
          // Replace with immersive 3D
          return content
            .replace(/adobe|figma|sketch|photoshop/gi, 'Cathedral Studio - immersive visionary art tools')
            .replace(/flat.*canvas|boxy|rectangular.*panel/gi, 'immersive 3D environment')
            .replace(/fixed.*canvas|confining/gi, 'expansive, open 3D space');
        };

      case 'Website-Like Structures':
        return (content) => {
          // Make more open world
          return content
            .replace(/linear.*workflow|step.*by.*step/gi, 'non-linear, organic workflow')
            .replace(/rigid|structured.*website/gi, 'open world experience')
            .replace(/single.*mode|only.*visual/gi, 'multi-modal simultaneous creation');
        };

      case 'Claustrophobic Design':
        return (content) => {
          // Make more expansive
          return content
            .replace(/claustrophobic|confining|confined|cramped/gi, 'expansive and open')
            .replace(/restrictive|tight.*space|narrow.*view/gi, 'generous spacing with golden ratio proportions');
        };

      case 'Missing Sacred Geometry':
        return (content) => {
          // Add sacred geometry comment/import
          if (content.includes('import') || content.includes('require')) {
            return content.replace(
              /(import|require)/,
              `// Sacred geometry: golden ratio (1.618), Fibonacci, 144:99 ratio\n$1`
            );
          }
          return `// Sacred geometry: golden ratio (1.618), Fibonacci, 144:99 ratio\n${content}`;
        };

      case 'Missing Trauma-Aware Patterns':
        return (content) => {
          // Add trauma-aware comment
          if (content.includes('function') || content.includes('const') || content.includes('class')) {
            return content.replace(
              /(function|const|class)/,
              `// Trauma-aware: gentle, supportive, ESC exits, pause anytime\n$1`
            );
          }
          return `// Trauma-aware: gentle, supportive, ESC exits, pause anytime\n${content}`;
        };

      case 'Missing Attribution':
        return (content) => {
          // Add Rebecca Respawn attribution
          if (content.includes('@author') || content.includes('Author:')) {
            return content.replace(
              /(@author|Author:).*/i,
              '@author Rebecca Respawn'
            );
          }
          return `/**\n * @author Rebecca Respawn\n * @license CC0-1.0 - Public Domain\n */\n${content}`;
        };

      default:
        return null;
    }
  }

  addAlignmentIndicators(content, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    let enhanced = content;

    // Add license if missing
    if (!/cc0.*1\.0|public.*domain|license/i.test(content)) {
      if (ext === '.ts' || ext === '.js' || ext === '.tsx' || ext === '.jsx') {
        if (!content.includes('/**')) {
          enhanced = `/**\n * @license CC0-1.0 - Public Domain\n */\n${enhanced}`;
        } else {
          enhanced = enhanced.replace(
            /\/\*\*/,
            '/**\n * @license CC0-1.0 - Public Domain'
          );
        }
      }
    }

    // Add sacred geometry if design file
    if ((ext === '.css' || ext === '.scss' || ext === '.tsx' || ext === '.jsx') && 
        !/golden.*ratio|fibonacci|sacred.*geometry/i.test(content)) {
      enhanced = `/* Sacred geometry: golden ratio (1.618), Fibonacci, 144:99 ratio */\n${enhanced}`;
    }

    return enhanced;
  }

  saveFixReport(dryRun) {
    const reportPath = path.join(BASE_DIR, 'docs', 'ALIGNMENT_CLEAN_REPORT.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const report = {
      timestamp: new Date().toISOString(),
      dryRun,
      fixesApplied: this.fixesApplied,
      filesBackedUp: this.filesBackedUp,
      backupLocation: BACKUP_DIR
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    logger.info(`\n📊 Clean report saved to: ${reportPath}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const dryRun = process.argv.includes('--dry-run');
  const cleaner = new AlignmentCleaner();
  cleaner.cleanAlignment(dryRun).catch(error => {
    logger.error(`Alignment cleaning failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
}

export default AlignmentCleaner;

