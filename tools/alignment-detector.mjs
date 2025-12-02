#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */

/**
 * Alignment Detector
 * Detects what's aligned vs. misaligned with Rebecca Respawn's work
 * 
 * Detects:
 * - Flattened work (makes visionary art look flat)
 * - Pages that look bad (poor visual quality)
 * - Content that sounds lame (generic, uninspiring)
 * - Flat/boxy design patterns
 * - Missing sacred geometry, trauma-aware patterns, attribution
 * 
 * @license CC0-1.0 - Public Domain
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
const REPORT_FILE = path.join(BASE_DIR, 'docs', 'ALIGNMENT_REPORT.json');

// Positive indicators (aligned with Rebecca Respawn's work)
const ALIGNED_PATTERNS = [
  {
    name: 'Sacred Mathematics',
    patterns: [
      /144.*99|144:99|cathedral.*ratio/i,
      /golden.*ratio|phi|1\.618|φ/i,
      /fibonacci|fib/i,
      /solfeggio.*frequenc|396|417|528|639|741|852|963/i,
      /sacred.*geometry|√2|√3|√5/i
    ],
    weight: 3
  },
  {
    name: 'Trinity Architecture',
    patterns: [
      /trinity.*architecture|brain.*soul.*body/i,
      /cosmogenesis|circuitum99|stone.*grimoire/i
    ],
    weight: 2
  },
  {
    name: 'Trauma-Aware',
    patterns: [
      /trauma.*aware|trauma.*safe|trauma.*informed/i,
      /gentle|supportive|grounding/i,
      /esc.*exit|pause.*anytime/i
    ],
    weight: 2
  },
  {
    name: 'Museum-Grade Quality',
    patterns: [
      /museum.*grade|aristocratic.*aesthetic/i,
      /immersive.*3d|3d.*environment/i,
      /sacred.*geometry|golden.*ratio/i
    ],
    weight: 3
  },
  {
    name: 'Open World Experience',
    patterns: [
      /open.*world|not.*website|organic.*non.*linear/i,
      /multi.*modal|simultaneous.*creation/i
    ],
    weight: 2
  },
  {
    name: 'Rebecca Respawn Attribution',
    patterns: [
      /rebecca.*respawn|@author.*rebecca/i,
      /by.*rebecca.*respawn/i
    ],
    weight: 2
  },
  {
    name: 'CC0-1.0 License',
    patterns: [
      /cc0.*1\.0|public.*domain/i,
      /license.*cc0/i
    ],
    weight: 1
  },
  {
    name: 'Codex Systems',
    patterns: [
      /fusion.*kink|circuitum99|codex.*144|liber.*arcanae/i,
      /magical.*mystery.*house|stone.*grimoire/i
    ],
    weight: 2
  }
];

// Negative indicators (misaligned)
const MISALIGNED_PATTERNS = [
  {
    name: 'Flattened Work',
    patterns: [
      /\.flatten\(|flattened|flattening/i,
      /2d|2-d|two.*dimensional/i,
      /depth.*0|z.*index.*0|no.*depth/i,
      /flat.*layer|without.*depth/i
    ],
    severity: 'high',
    description: 'Makes visionary art look flat - should have 3D depth and spatial layering'
  },
  {
    name: 'Pages That Look Bad',
    patterns: [
      /poor.*quality|low.*quality|bad.*design/i,
      /ugly|unprofessional|amateur/i,
      /not.*meeting.*standards|below.*standard/i,
      /generic.*design|template.*design/i
    ],
    severity: 'high',
    description: 'Poor visual quality - not meeting museum-grade standards'
  },
  {
    name: 'Content That Sounds Lame',
    patterns: [
      /lorem.*ipsum|placeholder.*text|dummy.*content/i,
      /generic|uninspiring|boring|dull/i,
      /template|example|sample/i,
      /todo|fixme|hack|temporary/i,
      /low.*quality.*content|poor.*writing/i
    ],
    severity: 'high',
    description: 'Generic, placeholder, or uninspiring content - should be authentic and high-quality'
  },
  {
    name: 'Flat/Boxy Design',
    patterns: [
      /adobe|figma|sketch|photoshop/i,
      /flat.*canvas|boxy|rectangular.*panel/i,
      /fixed.*canvas|confining/i
    ],
    severity: 'high',
    description: 'Flat/boxy design paradigms - should be immersive 3D'
  },
  {
    name: 'Website-Like Structures',
    patterns: [
      /linear.*workflow|step.*by.*step/i,
      /rigid|structured.*website/i,
      /single.*mode|only.*visual/i
    ],
    severity: 'medium',
    description: 'Website-like structures - should be open world experience'
  },
  {
    name: 'Claustrophobic Design',
    patterns: [
      /claustrophobic|confining|confined|cramped/i,
      /restrictive|tight.*space|narrow.*view/i
    ],
    severity: 'high',
    description: 'Claustrophobic design - should be expansive and open'
  },
  {
    name: 'Missing Sacred Geometry',
    patterns: [
      // Negative check - if file is about design/art but has no sacred geometry
    ],
    severity: 'medium',
    description: 'Missing sacred geometry - should include golden ratio, Fibonacci, etc.'
  },
  {
    name: 'Missing Trauma-Aware Patterns',
    patterns: [
      // Negative check - if file is UI/UX but has no trauma-aware patterns
    ],
    severity: 'medium',
    description: 'Missing trauma-aware patterns - should be gentle and supportive'
  },
  {
    name: 'Missing Attribution',
    patterns: [
      // Negative check - if file is content but has no Rebecca Respawn attribution
    ],
    severity: 'low',
    description: 'Missing Rebecca Respawn attribution'
  },
  {
    name: 'Wrong License',
    patterns: [
      /mit.*license|apache|gpl|proprietary/i
    ],
    severity: 'medium',
    description: 'Wrong license - should be CC0-1.0'
  }
];

// ND joy: Central to all tools - honors neurodivergent creative expression
class AlignmentDetector {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      aligned: [],
      misaligned: [],
      needsEnhancement: [],
      summary: {
        totalFiles: 0,
        alignedCount: 0,
        misalignedCount: 0,
        needsEnhancementCount: 0
      }
    };
  }

  async detectAlignment() {
    logger.info('🔍 Detecting alignment with Rebecca Respawn\'s work...');
    logger.info('   → Scanning for flattened work, bad pages, lame content');
    logger.info('   → Checking alignment indicators\n');

    const files = await this.findFiles(BASE_DIR);
    this.results.summary.totalFiles = files.length;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const alignment = this.analyzeFile(file, content);
        
        if (alignment.aligned) {
          this.results.aligned.push(alignment);
        } else if (alignment.misaligned.length > 0) {
          this.results.misaligned.push(alignment);
        } else if (alignment.needsEnhancement) {
          this.results.needsEnhancement.push(alignment);
        }
      } catch (error) {
        // Skip files we can't read
      }
    }

    this.results.summary.alignedCount = this.results.aligned.length;
    this.results.summary.misalignedCount = this.results.misaligned.length;
    this.results.summary.needsEnhancementCount = this.results.needsEnhancement.length;

    this.saveReport();
    this.printSummary();

    return this.results;
  }

  analyzeFile(filePath, content) {
    const relativePath = path.relative(BASE_DIR, filePath);
    const alignmentScore = this.calculateAlignmentScore(content);
    const misaligned = this.detectMisaligned(content, relativePath);
    const needsEnhancement = alignmentScore < 5 && misaligned.length === 0;

    return {
      file: relativePath,
      alignmentScore,
      aligned: alignmentScore >= 5 && misaligned.length === 0,
      misaligned,
      needsEnhancement,
      recommendations: this.generateRecommendations(alignmentScore, misaligned)
    };
  }

  calculateAlignmentScore(content) {
    let score = 0;
    
    for (const indicator of ALIGNED_PATTERNS) {
      for (const pattern of indicator.patterns) {
        if (pattern.test(content)) {
          score += indicator.weight;
          break; // Count each indicator only once
        }
      }
    }

    return score;
  }

  detectMisaligned(content, filePath) {
    const issues = [];
    const isDesignFile = /\.(css|scss|tsx|jsx|html|svg)$/i.test(filePath);
    const isContentFile = /\.(md|txt|json)$/i.test(filePath);
    const isCodeFile = /\.(ts|js|tsx|jsx)$/i.test(filePath);

    for (const indicator of MISALIGNED_PATTERNS) {
      for (const pattern of indicator.patterns) {
        if (pattern.test(content)) {
          issues.push({
            type: indicator.name,
            severity: indicator.severity,
            description: indicator.description,
            pattern: pattern.toString()
          });
          break;
        }
      }
    }

    // Negative checks for missing patterns
    if (isDesignFile && !/golden.*ratio|fibonacci|sacred.*geometry|phi|1\.618/i.test(content)) {
      issues.push({
        type: 'Missing Sacred Geometry',
        severity: 'medium',
        description: 'Design file missing sacred geometry - should include golden ratio, Fibonacci, etc.'
      });
    }

    if ((isDesignFile || isCodeFile) && !/trauma.*aware|trauma.*safe|gentle|supportive/i.test(content)) {
      if (/ui|interface|component|page/i.test(content)) {
        issues.push({
          type: 'Missing Trauma-Aware Patterns',
          severity: 'medium',
          description: 'UI/UX file missing trauma-aware patterns - should be gentle and supportive'
        });
      }
    }

    if (isContentFile && !/rebecca.*respawn|@author/i.test(content) && content.length > 200) {
      issues.push({
        type: 'Missing Attribution',
        severity: 'low',
        description: 'Content file missing Rebecca Respawn attribution'
      });
    }

    return issues;
  }

  generateRecommendations(score, misaligned) {
    const recommendations = [];

    if (score < 5) {
      recommendations.push('Add more alignment indicators (sacred mathematics, Trinity Architecture, etc.)');
    }

    for (const issue of misaligned) {
      if (issue.type === 'Flattened Work') {
        recommendations.push('Restore 3D depth and spatial layering with sacred geometry');
      } else if (issue.type === 'Pages That Look Bad') {
        recommendations.push('Upgrade to museum-grade quality with aristocratic aesthetics');
      } else if (issue.type === 'Content That Sounds Lame') {
        recommendations.push('Replace with authentic, inspiring, high-quality content');
      } else if (issue.type === 'Flat/Boxy Design') {
        recommendations.push('Replace with immersive 3D environment');
      } else if (issue.type === 'Website-Like Structures') {
        recommendations.push('Make more open world and organic, less rigid');
      } else if (issue.type === 'Claustrophobic Design') {
        recommendations.push('Make more expansive and open with generous spacing');
      } else if (issue.type === 'Missing Sacred Geometry') {
        recommendations.push('Add golden ratio, Fibonacci, and sacred geometry');
      } else if (issue.type === 'Missing Trauma-Aware Patterns') {
        recommendations.push('Add trauma-aware, gentle, supportive patterns');
      } else if (issue.type === 'Missing Attribution') {
        recommendations.push('Add Rebecca Respawn attribution');
      }
    }

    return recommendations;
  }

  async findFiles(dir, maxDepth = 5, currentDepth = 0) {
    if (currentDepth >= maxDepth) return [];
    if (!fs.existsSync(dir)) return [];

    const files = [];
    const ignoreDirs = ['node_modules', 'dist', '.git', '.turbo', 'coverage', '.next'];
    const ignoreFiles = ['.continuous-improvement-state.json', 'pnpm-lock.yaml'];

    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') && entry !== '.github') continue;
        if (ignoreDirs.includes(entry)) continue;
        if (ignoreFiles.includes(entry)) continue;

        const fullPath = path.join(dir, entry);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            files.push(...await this.findFiles(fullPath, maxDepth, currentDepth + 1));
          } else if (stat.isFile()) {
            const ext = path.extname(entry).toLowerCase();
            if (['.ts', '.tsx', '.js', '.jsx', '.md', '.json', '.css', '.scss', '.html', '.svg'].includes(ext)) {
              files.push(fullPath);
            }
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

  saveReport() {
    const reportDir = path.dirname(REPORT_FILE);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(REPORT_FILE, JSON.stringify(this.results, null, 2));
    logger.info(`\n📊 Alignment report saved to: ${REPORT_FILE}`);
  }

  printSummary() {
    UserFeedback.section('Alignment Detection Summary');
    logger.info(`Total Files Scanned: ${this.results.summary.totalFiles}`);
    logger.info(`✅ Aligned: ${this.results.summary.alignedCount}`);
    logger.info(`❌ Misaligned: ${this.results.summary.misalignedCount}`);
    logger.info(`⚠️  Needs Enhancement: ${this.results.summary.needsEnhancementCount}\n`);

    if (this.results.summary.misalignedCount > 0) {
      UserFeedback.warning('Misaligned Files Found:');
      const highSeverity = this.results.misaligned.filter(f => 
        f.misaligned.some(i => i.severity === 'high')
      );
      logger.info(`   High Severity: ${highSeverity.length}`);
      logger.info(`   - Flattened work: ${highSeverity.filter(f => f.misaligned.some(i => i.type === 'Flattened Work')).length}`);
      logger.info(`   - Bad pages: ${highSeverity.filter(f => f.misaligned.some(i => i.type === 'Pages That Look Bad')).length}`);
      logger.info(`   - Lame content: ${highSeverity.filter(f => f.misaligned.some(i => i.type === 'Content That Sounds Lame')).length}\n`);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const detector = new AlignmentDetector();
  detector.detectAlignment().catch(error => {
    logger.error(`Alignment detection failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
}

export default AlignmentDetector;

