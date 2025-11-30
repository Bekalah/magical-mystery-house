#!/usr/bin/env node

/**
 * Boost Rebecca Respawn's Ideas & Codex
 * 
 * Enhances and amplifies Rebecca's own ideas, codex, and creative vision
 * Ensures all work is under her pen name "Rebecca Respawn"
 * Aligns with open source vision
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import AlignmentDetector from './alignment-detector.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

class RebeccaIdeasBooster
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.authorName = 'Rebecca Respawn';
    this.license = 'CC0-1.0';
    this.codexFiles = [];
    this.ideaFiles = [];
    this.storyFiles = [];
    this.designFiles = [];
  }

  /**
   * Find all codex, idea, story, and design files
   */
  async discoverRebeccaContent() {
    logger.info('🔍 Discovering Rebecca Respawn\'s content...');
    
    const searchPaths = [
      path.join(BASE_DIR, 'packages'),
      path.join(BASE_DIR, 'docs'),
      path.join(BASE_DIR, 'REGISTRY')
    ];

    const patterns = {
      codex: /codex|144.*99|liber.*arcanae/i,
      ideas: /idea|vision|inspiration|creative/i,
      story: /story|narrative|pathworking|circuitum/i,
      design: /design|art|visual|aesthetic|sacred.*geometry/i
    };

    for (const searchPath of searchPaths) {
      if (fs.existsSync(searchPath)) {
        const files = this.findFiles(searchPath, ['.md', '.ts', '.js', '.json', '.tsx', '.jsx'], 3);
        
        for (const file of files) {
          try {
            const content = fs.readFileSync(file, 'utf-8');
            
            // Check for codex content
            if (patterns.codex.test(content) || patterns.codex.test(file)) {
              this.codexFiles.push({ file, type: 'codex', content });
            }
            
            // Check for ideas
            if (patterns.ideas.test(content) || patterns.ideas.test(file)) {
              this.ideaFiles.push({ file, type: 'idea', content });
            }
            
            // Check for story
            if (patterns.story.test(content) || patterns.story.test(file)) {
              this.storyFiles.push({ file, type: 'story', content });
            }
            
            // Check for design
            if (patterns.design.test(content) || patterns.design.test(file)) {
              this.designFiles.push({ file, type: 'design', content });
            }
          } catch (err) {
            // Skip files we can't read
          }
        }
      }
    }

    logger.info(`✅ Found ${this.codexFiles.length} codex files`);
    logger.info(`✅ Found ${this.ideaFiles.length} idea files`);
    logger.info(`✅ Found ${this.storyFiles.length} story files`);
    logger.info(`✅ Found ${this.designFiles.length} design files`);
  }

  /**
   * Ensure all files have proper attribution to Rebecca Respawn
   */
  async ensureRebeccaAttribution() {
    logger.info('✍️  Ensuring all content is under Rebecca Respawn\'s pen...');
    
    const allFiles = [
      ...this.codexFiles,
      ...this.ideaFiles,
      ...this.storyFiles,
      ...this.designFiles
    ];

    let updated = 0;
    
    for (const fileInfo of allFiles) {
      try {
        let content = fileInfo.content;
        let needsUpdate = false;
        
        // Check if author attribution exists
        if (!content.includes(this.authorName) && !content.includes('Rebecca Respawn')) {
          needsUpdate = true;
          
          // Add author header if file starts with comment or doc
          if (content.startsWith('/**') || content.startsWith('<!--') || content.startsWith('#')) {
            const authorLine = ` * @author ${this.authorName}\n`;
            const licenseLine = ` * @license ${this.license} - Public Domain\n`;
            
            if (content.startsWith('/**')) {
              // TypeScript/JavaScript file
              const insertPoint = content.indexOf('*/');
              if (insertPoint > 0) {
                content = content.slice(0, insertPoint) + authorLine + licenseLine + content.slice(insertPoint);
                needsUpdate = true;
              }
            } else if (content.startsWith('<!--')) {
              // Markdown with HTML comment
              const insertPoint = content.indexOf('-->');
              if (insertPoint > 0) {
                content = content.slice(0, insertPoint) + 
                  `\n * @author ${this.authorName}\n` +
                  ` * @license ${this.license} - Public Domain\n` +
                  content.slice(insertPoint);
                needsUpdate = true;
              }
            } else if (content.startsWith('#')) {
              // Markdown file - add at top
              const firstLine = content.split('\n')[0];
              content = `${firstLine}\n\n**Author**: ${this.authorName}  \n**License**: ${this.license} - Public Domain\n\n${content.slice(firstLine.length + 1)}`;
              needsUpdate = true;
            }
          }
        }
        
        // Ensure license is CC0-1.0
        if (content.includes('@license') && !content.includes('CC0-1.0')) {
          content = content.replace(/@license\s+[^\n]+/g, `@license ${this.license} - Public Domain`);
          needsUpdate = true;
        }
        
        if (needsUpdate) {
          // Preserve original line endings (cross-platform)
          const originalContent = fs.readFileSync(fileInfo.file, 'utf-8');
          const lineEnding = this.detectLineEnding(originalContent);
          content = this.normalizeLineEndings(content, lineEnding);
          
          // Only write if additive (preserves your work)
          if (content.length >= originalContent.length) {
            fs.writeFileSync(fileInfo.file, content, 'utf-8');
            updated++;
            logger.info(`   ✅ Updated: ${path.relative(BASE_DIR, fileInfo.file)}`);
          }
        }
      } catch (err) {
        logger.warning(`   ⚠️  Could not update: ${fileInfo.file} - ${err.message}`);
      }
    }
    
    logger.info(`✅ Updated ${updated} files with Rebecca Respawn attribution`);
  }

  /**
   * Boost codex content - enhance and amplify
   */
  async boostCodex() {
    logger.info('📚 Boosting Codex content...');
    
    for (const codexFile of this.codexFiles) {
      try {
        let content = codexFile.content;
        let enhanced = false;
        
        // Enhance codex descriptions
        if (content.includes('Codex') || content.includes('144:99')) {
          // Add more depth to codex descriptions
          const enhancements = [
            'Living egregore system',
            'Sacred mathematics integration',
            'Consciousness evolution mapping',
            'Open world exploration nodes'
          ];
          
          // Check if enhancements are missing
          for (const enhancement of enhancements) {
            if (!content.includes(enhancement)) {
              // Add enhancement near codex mentions
              const codexMatch = content.match(/codex.*144.*99/i);
              if (codexMatch) {
                const insertPoint = codexMatch.index + codexMatch[0].length;
                content = content.slice(0, insertPoint) + 
                  ` - ${enhancement}` + 
                  content.slice(insertPoint);
                enhanced = true;
              }
            }
          }
        }
        
        if (enhanced) {
          // Preserve original line endings (cross-platform)
          const originalContent = fs.readFileSync(codexFile.file, 'utf-8');
          const lineEnding = this.detectLineEnding(originalContent);
          content = this.normalizeLineEndings(content, lineEnding);
          
          // Only write if additive (preserves your work)
          if (content.length >= originalContent.length) {
            fs.writeFileSync(codexFile.file, content, 'utf-8');
            logger.info(`   ✅ Enhanced: ${path.relative(BASE_DIR, codexFile.file)}`);
          }
        }
      } catch (err) {
        logger.warning(`   ⚠️  Could not enhance: ${codexFile.file}`);
      }
    }
    
    logger.info('✅ Codex content boosted');
  }

  /**
   * Boost story quality
   */
  async boostStoryQuality() {
    logger.info('📖 Boosting story quality...');
    
    for (const storyFile of this.storyFiles) {
      try {
        let content = storyFile.content;
        let enhanced = false;
        
        // Enhance story elements
        const storyEnhancements = [
          'Dynamic story transformation',
          'Living narrative that responds to choices',
          'Open world story exploration',
          'Trauma-aware narrative design',
          'Organic story paths',
          'Non-linear narrative structure'
        ];
        
        // Check if story needs enhancement
        if (content.includes('story') || content.includes('narrative') || content.includes('pathworking')) {
          // Add story quality elements
          for (const enhancement of storyEnhancements) {
            if (!content.includes(enhancement)) {
              // Find a good place to add enhancement
              const storyMatch = content.match(/story|narrative|pathworking/i);
              if (storyMatch) {
                const insertPoint = storyMatch.index + storyMatch[0].length;
                const before = content.slice(0, insertPoint);
                const after = content.slice(insertPoint);
                
                // Add enhancement in a natural way
                if (!before.endsWith(enhancement)) {
                  content = before + ` (${enhancement})` + after;
                  enhanced = true;
                  break; // Add one at a time
                }
              }
            }
          }
        }
        
        if (enhanced) {
          // Preserve original line endings (cross-platform)
          const originalContent = fs.readFileSync(storyFile.file, 'utf-8');
          const lineEnding = this.detectLineEnding(originalContent);
          content = this.normalizeLineEndings(content, lineEnding);
          
          // Only write if additive (preserves your work)
          if (content.length >= originalContent.length) {
            fs.writeFileSync(storyFile.file, content, 'utf-8');
            logger.info(`   ✅ Enhanced story: ${path.relative(BASE_DIR, storyFile.file)}`);
          }
        }
      } catch (err) {
        logger.warning(`   ⚠️  Could not enhance story: ${storyFile.file}`);
      }
    }
    
    logger.info('✅ Story quality boosted');
  }

  /**
   * Boost design quality
   */
  async boostDesignQuality() {
    logger.info('🎨 Boosting design quality...');
    
    for (const designFile of this.designFiles) {
      try {
        let content = designFile.content;
        let enhanced = false;
        
        // Enhance design elements
        const designEnhancements = [
          'Museum-grade quality',
          'Sacred geometry integration',
          'Immersive 3D environments',
          'Open world design (not website-like)',
          'Trauma-aware visual design',
          'Organic, flowing aesthetics',
          'Multi-modal creation experiences'
        ];
        
        // Check if design needs enhancement
        if (content.includes('design') || content.includes('art') || content.includes('visual')) {
          // Add design quality elements
          for (const enhancement of designEnhancements) {
            if (!content.includes(enhancement.toLowerCase().replace(/[^a-z0-9]/g, ''))) {
              // Find a good place to add enhancement
              const designMatch = content.match(/design|art|visual|aesthetic/i);
              if (designMatch) {
                const insertPoint = designMatch.index + designMatch[0].length;
                const before = content.slice(0, insertPoint);
                const after = content.slice(insertPoint);
                
                // Add enhancement in a natural way
                if (!before.endsWith(enhancement)) {
                  content = before + ` - ${enhancement}` + after;
                  enhanced = true;
                  break; // Add one at a time
                }
              }
            }
          }
        }
        
        if (enhanced) {
          // Preserve original line endings (cross-platform)
          const originalContent = fs.readFileSync(designFile.file, 'utf-8');
          const lineEnding = this.detectLineEnding(originalContent);
          content = this.normalizeLineEndings(content, lineEnding);
          
          // Only write if additive (preserves your work)
          if (content.length >= originalContent.length) {
            fs.writeFileSync(designFile.file, content, 'utf-8');
            logger.info(`   ✅ Enhanced design: ${path.relative(BASE_DIR, designFile.file)}`);
          }
        }
      } catch (err) {
        logger.warning(`   ⚠️  Could not enhance design: ${designFile.file}`);
      }
    }
    
    logger.info('✅ Design quality boosted');
  }

  /**
   * Boost ideas - amplify Rebecca's creative vision
   */
  async boostIdeas() {
    logger.info('💡 Boosting Rebecca\'s ideas...');
    
    for (const ideaFile of this.ideaFiles) {
      try {
        let content = ideaFile.content;
        let enhanced = false;
        
        // Enhance idea connections
        const ideaConnections = [
          'Connects to sacred mathematics',
          'Integrates with consciousness systems',
          'Links to visionary art principles',
          'Relates to open world exploration',
          'Supports trauma-aware design',
          'Enhances organic creative process'
        ];
        
        // Add connections to ideas
        if (content.includes('idea') || content.includes('vision') || content.includes('inspiration')) {
          // Find idea mentions and enhance
          const ideaMatches = content.matchAll(/idea|vision|inspiration/gi);
          for (const match of ideaMatches) {
            // Check if connections are already there
            const context = content.slice(Math.max(0, match.index - 50), match.index + 100);
            if (!context.includes('Connects to') && !context.includes('Integrates with')) {
              // Add a connection
              const insertPoint = match.index + match[0].length;
              const connection = ideaConnections[Math.floor(Math.random() * ideaConnections.length)];
              content = content.slice(0, insertPoint) + ` (${connection})` + content.slice(insertPoint);
              enhanced = true;
              break; // Add one at a time
            }
          }
        }
        
        if (enhanced) {
          fs.writeFileSync(ideaFile.file, content, 'utf-8');
          logger.info(`   ✅ Enhanced idea: ${path.relative(BASE_DIR, ideaFile.file)}`);
        }
      } catch (err) {
        logger.warning(`   ⚠️  Could not enhance idea: ${ideaFile.file}`);
      }
    }
    
    logger.info('✅ Ideas boosted');
  }

  /**
   * Ensure open source alignment
   */
  async ensureOpenSourceAlignment() {
    logger.info('🌐 Ensuring open source alignment...');
    
    const allFiles = [
      ...this.codexFiles,
      ...this.ideaFiles,
      ...this.storyFiles,
      ...this.designFiles
    ];

    let aligned = 0;
    
    for (const fileInfo of allFiles) {
      try {
        let content = fileInfo.content;
        let needsAlignment = false;
        
        // Check for open source indicators
        const openSourceIndicators = [
          'CC0-1.0',
          'Public Domain',
          'open source',
          'free to use'
        ];
        
        const hasIndicator = openSourceIndicators.some(indicator => 
          content.toLowerCase().includes(indicator.toLowerCase())
        );
        
        if (!hasIndicator) {
          // Add open source header
          if (content.startsWith('/**')) {
            const licenseLine = ` * @license ${this.license} - Public Domain (Open Source)\n`;
            const insertPoint = content.indexOf('*/');
            if (insertPoint > 0) {
              content = content.slice(0, insertPoint) + licenseLine + content.slice(insertPoint);
              needsAlignment = true;
            }
          } else if (content.startsWith('#')) {
            // Markdown - add at top
            const firstLine = content.split('\n')[0];
            content = `${firstLine}\n\n**License**: ${this.license} - Public Domain (Open Source)\n\n${content.slice(firstLine.length + 1)}`;
            needsAlignment = true;
          }
        }
        
        if (needsAlignment) {
          fs.writeFileSync(fileInfo.file, content, 'utf-8');
          aligned++;
          logger.info(`   ✅ Aligned: ${path.relative(BASE_DIR, fileInfo.file)}`);
        }
      } catch (err) {
        logger.warning(`   ⚠️  Could not align: ${fileInfo.file}`);
      }
    }
    
    logger.info(`✅ Aligned ${aligned} files with open source vision`);
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
      // Skip directories we can't read
    }
    
    return files;
  }

  /**
   * Run all boosting operations
   */
  /**
   * Check alignment before boosting
   */
  async checkAlignment(filePath, content) {
    const detector = new AlignmentDetector();
    const alignment = detector.analyzeFile(filePath, content);
    
    // Skip boosting if misaligned (let alignment cleaner fix it first)
    if (alignment.misaligned && alignment.misaligned.length > 0) {
      const highSeverity = alignment.misaligned.some(i => i.severity === 'high');
      if (highSeverity) {
        logger.warning(`   ⚠️  Skipping misaligned content: ${path.relative(BASE_DIR, filePath)}`);
        logger.info(`      Issues: ${alignment.misaligned.map(i => i.type).join(', ')}`);
        return false;
      }
    }
    
    return true;
  }

  async boost() {
    logger.info('🚀 Boosting Rebecca Respawn\'s Ideas & Codex...');
    logger.info(`   Author: ${this.authorName}`);
    logger.info(`   License: ${this.license} - Public Domain\n`);
    
    await this.discoverRebeccaContent();
    
    // Check alignment before boosting
    logger.info('🔍 Checking alignment before boosting...');
    const alignmentIssues = [];
    const detector = new AlignmentDetector();
    
    // Filter out misaligned files
    this.codexFiles = this.codexFiles.filter(file => {
      const alignment = detector.analyzeFile(file.file, file.content);
      if (alignment.misaligned && alignment.misaligned.length > 0) {
        const highSeverity = alignment.misaligned.some(i => i.severity === 'high');
        if (highSeverity) {
          alignmentIssues.push({ file: file.file, type: 'codex' });
          return false;
        }
      }
      return true;
    });
    
    this.ideaFiles = this.ideaFiles.filter(file => {
      const alignment = detector.analyzeFile(file.file, file.content);
      if (alignment.misaligned && alignment.misaligned.length > 0) {
        const highSeverity = alignment.misaligned.some(i => i.severity === 'high');
        if (highSeverity) {
          alignmentIssues.push({ file: file.file, type: 'idea' });
          return false;
        }
      }
      return true;
    });
    
    this.storyFiles = this.storyFiles.filter(file => {
      const alignment = detector.analyzeFile(file.file, file.content);
      if (alignment.misaligned && alignment.misaligned.length > 0) {
        const highSeverity = alignment.misaligned.some(i => i.severity === 'high');
        if (highSeverity) {
          alignmentIssues.push({ file: file.file, type: 'story' });
          return false;
        }
      }
      return true;
    });
    
    this.designFiles = this.designFiles.filter(file => {
      const alignment = detector.analyzeFile(file.file, file.content);
      if (alignment.misaligned && alignment.misaligned.length > 0) {
        const highSeverity = alignment.misaligned.some(i => i.severity === 'high');
        if (highSeverity) {
          alignmentIssues.push({ file: file.file, type: 'design' });
          return false;
        }
      }
      return true;
    });
    
    if (alignmentIssues.length > 0) {
      logger.info(`   ⚠️  Skipped ${alignmentIssues.length} misaligned files (run alignment cleaner first)`);
    }
    
    await this.ensureRebeccaAttribution();
    await this.boostCodex();
    await this.boostStoryQuality();
    await this.boostDesignQuality();
    await this.boostIdeas();
    await this.ensureOpenSourceAlignment();
    
    logger.info('\n✅ All boosting complete!');
    logger.info('   ✍️  All content under Rebecca Respawn\'s pen');
    logger.info('   🌐 All aligned with open source vision');
    logger.info('   📚 Codex enhanced');
    logger.info('   📖 Story quality improved');
    logger.info('   🎨 Design quality improved');
    logger.info('   💡 Ideas amplified');
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
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const booster = new RebeccaIdeasBooster();
  booster.boost().catch(err => {
    logger.error(`Error boosting ideas: ${err.message}`);
    process.exit(1);
  });
}

export default RebeccaIdeasBooster;

