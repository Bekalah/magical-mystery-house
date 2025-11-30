#!/usr/bin/env node

/**
 * Vision Weaver
 * Weaves your complete vision throughout the magnum opus
 * Ensures ND joy, esoteric traditions, academic barriers, and high creativity are honored
 * 
 * @author Rebecca Respawn
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

class VisionWeaver {
  constructor() {
    this.visionElements = {
      ndJoy: {
        keywords: ['ND joy', 'neurodivergent joy', 'neurodivergent creative'],
        principles: [
          'Central to all game and design tools',
          'Honors neurodivergent creative expression',
          'Celebrates different ways of thinking and creating'
        ]
      },
      esoteric: {
        keywords: ['Soyga', 'I Ching', 'Kabbalah', 'Kabbala', 'Alchemy'],
        traditions: [
          'Soyga: Sacred tables and correspondences',
          'I Ching: Hexagram wisdom and change',
          'Kabbalah: Tree of Life and paths',
          'Alchemy: Transformation and transmutation'
        ]
      },
      academicBarriers: {
        keywords: ['Western academia', 'academic barriers', 'never fit', 'didn\'t have access'],
        themes: [
          'Conquering Western academia barriers',
          'Breaking access and support limitations',
          'Celebrating what was excluded from traditional structures'
        ]
      },
      highCreativity: {
        keywords: ['high creativity', 'collective creative', 'creative riches'],
        celebration: [
          'Celebration of high creativity',
          'Collective creative riches',
          'Multi-disciplinary integration'
        ]
      },
      sacredMath: {
        keywords: ['144:99', 'golden ratio', 'Fibonacci', 'sacred geometry', 'phi', '1.618'],
        foundations: [
          '144:99 ratio is foundational',
          'Golden ratio (1.618) in all proportions',
          'Fibonacci sequences throughout',
          'Sacred geometry as physical principles'
        ]
      },
      museumGrade: {
        keywords: ['museum-grade', 'aristocratic', 'refined', 'sophisticated'],
        standards: [
          'Museum-grade quality',
          'Aristocratic aesthetics',
          'Refined sophistication',
          'Timeless beauty'
        ]
      }
    };
  }

  /**
   * Phase 1: Doubt - "Is the vision woven throughout?"
   */
  createVisionDoubt() {
    const doubt = {
      id: `vision-doubt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      questions: [
        'Is ND joy present throughout?',
        'Are esoteric traditions honored everywhere?',
        'Is academic barrier breaking documented?',
        'Is high creativity celebrated?',
        'Is sacred mathematics integrated?',
        'Is museum-grade quality maintained?',
        'Are connections between vision elements clear?'
      ],
      feeling: 'contraction',
      phase: 'solve',
      scope: 'complete vision integration'
    };

    logger.info(`🤔 Vision doubt created: ${doubt.questions.length} questions`);
    return doubt;
  }

  /**
   * Phase 2: Research - Find where vision needs weaving
   */
  async researchVisionWeaving(doubt) {
    logger.info('🔍 Researching vision weaving opportunities...');
    
    const research = {
      id: `vision-research-${Date.now()}`,
      doubtId: doubt.id,
      timestamp: new Date().toISOString(),
      findings: [],
      opportunities: []
    };

    // Research each vision element
    for (const [elementName, element] of Object.entries(this.visionElements)) {
      const finding = await this.researchVisionElement(elementName, element);
      research.findings.push(finding);
      
      if (finding.opportunities.length > 0) {
        research.opportunities.push(...finding.opportunities);
      }
    }

    return research;
  }

  /**
   * Research a specific vision element
   */
  async researchVisionElement(elementName, element) {
    const finding = {
      element: elementName,
      present: [],
      missing: [],
      opportunities: []
    };

    // Search across key directories
    const searchPaths = [
      path.join(BASE_DIR, 'packages'),
      path.join(BASE_DIR, 'docs'),
      path.join(BASE_DIR, 'tools')
    ];

    for (const searchPath of searchPaths) {
      if (!fs.existsSync(searchPath)) continue;
      
      const files = this.findFiles(searchPath, ['.ts', '.js', '.mjs', '.md'], 2);
      
      for (const file of files.slice(0, 30)) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const hasElement = element.keywords.some(kw => 
            content.toLowerCase().includes(kw.toLowerCase())
          );
          
          if (hasElement) {
            finding.present.push(path.relative(BASE_DIR, file));
          } else {
            // Check if this file should have this element
            if (this.shouldHaveElement(file, elementName)) {
              finding.missing.push(path.relative(BASE_DIR, file));
              finding.opportunities.push({
                file: path.relative(BASE_DIR, file),
                element: elementName,
                action: this.generateWeavingAction(elementName, element)
              });
            }
          }
        } catch (err) {
          // Skip
        }
      }
    }

    return finding;
  }

  /**
   * Determine if file should have vision element
   */
  shouldHaveElement(file, elementName) {
    // Core packages should have all elements
    if (file.includes('packages/') && (
      file.includes('codex') || 
      file.includes('circuitum') || 
      file.includes('grimoire') ||
      file.includes('fusion-kink')
    )) {
      return true;
    }
    
    // Tools should have ND joy and sacred math
    if (file.includes('tools/') && (elementName === 'ndJoy' || elementName === 'sacredMath')) {
      return true;
    }
    
    // Docs should have academic barriers and high creativity
    if (file.includes('docs/') && (elementName === 'academicBarriers' || elementName === 'highCreativity')) {
      return true;
    }
    
    return false;
  }

  /**
   * Generate weaving action
   */
  generateWeavingAction(elementName, element) {
    if (elementName === 'ndJoy') {
      return 'Add ND joy principles: Central to all tools, honors neurodivergent creative expression';
    }
    
    if (elementName === 'esoteric') {
      return 'Honor esoteric traditions: Soyga, I Ching, Kabbalah, Alchemy';
    }
    
    if (elementName === 'academicBarriers') {
      return 'Document academic barrier breaking: Conquering Western academia barriers';
    }
    
    if (elementName === 'highCreativity') {
      return 'Celebrate high creativity: Collective creative riches, multi-disciplinary';
    }
    
    if (elementName === 'sacredMath') {
      return 'Integrate sacred mathematics: 144:99 ratio, golden ratio, Fibonacci';
    }
    
    if (elementName === 'museumGrade') {
      return 'Maintain museum-grade quality: Aristocratic aesthetics, refined sophistication';
    }
    
    return 'Weave vision element throughout';
  }

  /**
   * Phase 3: Expansion - Weave vision throughout
   */
  async weaveVision(doubt, research) {
    logger.info('✨ Weaving vision throughout magnum opus...');
    
    const expansion = {
      id: `vision-expansion-${Date.now()}`,
      doubtId: doubt.id,
      researchId: research.id,
      timestamp: new Date().toISOString(),
      woven: [],
      connections: this.createVisionConnections()
    };

    // Weave high-priority opportunities
    for (const opportunity of research.opportunities.slice(0, 10)) {
      try {
        const woven = await this.weaveIntoFile(opportunity);
        if (woven) {
          expansion.woven.push(opportunity);
          logger.info(`   ✅ Woven ${opportunity.element} into ${path.basename(opportunity.file)}`);
        }
      } catch (error) {
        logger.warn(`   ⚠️ Failed to weave into ${opportunity.file}: ${error.message}`);
      }
    }

    return expansion;
  }

  /**
   * Weave vision element into file (ADDITIVE ONLY, cross-platform)
   */
  async weaveIntoFile(opportunity) {
    const filePath = path.join(BASE_DIR, opportunity.file);
    
    if (!fs.existsSync(filePath)) {
      return false;
    }

    const originalContent = fs.readFileSync(filePath, 'utf-8');
    let content = originalContent;
    const element = this.visionElements[opportunity.element];
    
    // Check if already present (case-insensitive)
    const hasElement = element.keywords.some(kw => 
      content.toLowerCase().includes(kw.toLowerCase())
    );
    
    if (hasElement) {
      return false; // Already woven, don't overwrite
    }

    // Add vision element comment (only if missing)
    const comment = this.generateVisionComment(opportunity.element, element);
    
    // Preserve original line endings
    const lineEnding = this.detectLineEnding(content);
    
    // Add after shebang or at top (preserve structure)
    if (content.startsWith('#!/')) {
      const lines = content.split(/\r?\n/);
      // Only add if not already there
      if (!lines.some(l => l.includes(comment.substring(0, 20)))) {
        lines.splice(1, 0, comment);
        content = lines.join(lineEnding);
      }
    } else {
      // Only add if not already present
      if (!content.includes(comment.substring(0, 20))) {
        content = comment + lineEnding + content;
      }
    }

    // Only write if content changed and is additive
    if (content !== originalContent && content.length >= originalContent.length) {
      // Normalize line endings to match original
      content = this.normalizeLineEndings(content, lineEnding);
      
      // Backup (only if doesn't exist)
      const backupPath = filePath + '.vision-backup';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
      }
      
      // Write (cross-platform)
      fs.writeFileSync(filePath, content, 'utf-8');
      
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

  /**
   * Generate vision comment
   */
  generateVisionComment(elementName, element) {
    if (elementName === 'ndJoy') {
      return '/**\n * ND joy: Central to all tools - honors neurodivergent creative expression\n */';
    }
    
    if (elementName === 'esoteric') {
      return '/**\n * Esoteric traditions: Honors Soyga, I Ching, Kabbalah, Alchemy\n */';
    }
    
    if (elementName === 'academicBarriers') {
      return '/**\n * Academic barrier breaking: Conquering Western academia barriers\n */';
    }
    
    if (elementName === 'highCreativity') {
      return '/**\n * High creativity: Celebration of collective creative riches\n */';
    }
    
    if (elementName === 'sacredMath') {
      return '/**\n * Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational\n */';
    }
    
    if (elementName === 'museumGrade') {
      return '/**\n * Museum-grade quality: Aristocratic aesthetics, refined sophistication\n */';
    }
    
    return '/**\n * Vision element\n */';
  }

  /**
   * Create vision connections
   */
  createVisionConnections() {
    return {
      unified: 'All vision elements connect through Trinity Architecture',
      foundation: 'Sacred mathematics (144:99) is the foundation',
      center: 'ND joy is central to all tools and experiences',
      traditions: 'Esoteric traditions link across all systems',
      purpose: 'Academic barrier breaking is the unifying purpose',
      quality: 'Museum-grade quality maintains standards throughout',
      celebration: 'High creativity celebration honors collective riches'
    };
  }

  /**
   * Find files recursively
   */
  findFiles(dir, extensions, maxDepth, currentDepth = 0) {
    if (currentDepth >= maxDepth) return [];
    
    const files = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.includes('node_modules')) {
          files.push(...this.findFiles(fullPath, extensions, maxDepth, currentDepth + 1));
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (err) {
      // Skip
    }
    return files;
  }

  /**
   * Weave complete vision
   */
  async weaveCompleteVision() {
    logger.info('\n🧵 Weaving complete vision throughout magnum opus...\n');
    
    // Phase 1: Doubt
    const doubt = this.createVisionDoubt();
    
    // Phase 2: Research
    const research = await this.researchVisionWeaving(doubt);
    
    // Phase 3: Expansion
    const expansion = await this.weaveVision(doubt, research);
    
    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      doubt,
      research,
      expansion,
      summary: {
        elementsResearched: Object.keys(this.visionElements).length,
        opportunitiesFound: research.opportunities.length,
        woven: expansion.woven.length
      }
    };
    
    const reportFile = path.join(BASE_DIR, 'docs', 'VISION_WEAVING_REPORT.json');
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf-8');
    
    logger.info(`\n✅ Vision weaving complete`);
    logger.info(`   Elements researched: ${report.summary.elementsResearched}`);
    logger.info(`   Opportunities found: ${report.summary.opportunitiesFound}`);
    logger.info(`   Woven: ${report.summary.woven}`);
    logger.info(`   Report: ${reportFile}`);
    
    return report;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const weaver = new VisionWeaver();
  weaver.weaveCompleteVision()
    .then(report => {
      console.log('\n✅ Vision weaving complete!');
      console.log(`   Opportunities: ${report.summary.opportunitiesFound}`);
      console.log(`   Woven: ${report.summary.woven}`);
    })
    .catch(err => {
      console.error('Error:', err.message);
      process.exit(1);
    });
}

export { VisionWeaver };

