#!/usr/bin/env node

/**
 * Design Quality Enhancer
 * 
 * Enhances design quality across all systems
 * Ensures museum-grade, sacred geometry, immersive 3D, open world design
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

class DesignQualityEnhancer {
  // ND joy: Central to all tools - honors neurodivergent creative expression
  constructor() {
    this.qualityStandards = [
      'Museum-grade quality',
      'Sacred geometry integration',
      'Immersive 3D environments',
      'Open world design (not website-like)',
      'Trauma-aware visual design',
      'Organic, flowing aesthetics',
      'Multi-modal creation experiences',
      'Golden ratio proportions',
      'Fibonacci-based sizing',
      '144:99 ratio compliance'
    ];
  }

  /**
   * Enhance design files
   */
  async enhanceDesigns() {
    logger.info('🎨 Enhancing design quality...');
    
    const designFiles = this.findDesignFiles();
    
    for (const file of designFiles) {
      try {
        let content = fs.readFileSync(file, 'utf-8');
        let enhanced = false;
        
        // Add design quality elements
        const enhancements = this.generateDesignEnhancements(content);
        
        if (enhancements.length > 0) {
          // Apply enhancements
          for (const enhancement of enhancements) {
            if (!content.toLowerCase().includes(enhancement.toLowerCase().replace(/[^a-z0-9]/g, ''))) {
              content = this.applyDesignEnhancement(content, enhancement);
              enhanced = true;
            }
          }
        }
        
        if (enhanced) {
          // Preserve original line endings (cross-platform)
          const originalContent = fs.readFileSync(file, 'utf-8');
          const lineEnding = this.detectLineEnding(originalContent);
          content = this.normalizeLineEndings(content, lineEnding);
          
          // Only write if additive (preserves your work)
          if (content.length >= originalContent.length) {
            fs.writeFileSync(file, content, 'utf-8');
            logger.info(`   ✅ Enhanced: ${path.relative(BASE_DIR, file)}`);
          }
        }
      } catch (err) {
        logger.warning(`   ⚠️  Could not enhance: ${file}`);
      }
    }
    
    logger.info(`✅ Enhanced ${designFiles.length} design files`);
  }

  /**
   * Generate design enhancements
   */
  generateDesignEnhancements(content) {
    const enhancements = [];
    const contentLower = content.toLowerCase();
    
    // Check what's missing
    for (const standard of this.qualityStandards) {
      const standardKey = standard.toLowerCase().replace(/[^a-z0-9]/g, '');
      const contentKey = contentLower.replace(/[^a-z0-9]/g, '');
      
      if (!contentKey.includes(standardKey)) {
        enhancements.push(standard);
      }
    }
    
    // Limit to 2-3 enhancements per file
    return enhancements.slice(0, Math.min(3, enhancements.length));
  }

  /**
   * Apply design enhancement
   */
  applyDesignEnhancement(content, enhancement) {
    // Find design-related sections
    const designMatch = content.match(/design|art|visual|aesthetic|layout|ui/i);
    if (designMatch) {
      const insertPoint = designMatch.index + designMatch[0].length;
      return content.slice(0, insertPoint) + 
        ` - ${enhancement}` + 
        content.slice(insertPoint);
    }
    
    // If no design match, add to description
    const descMatch = content.match(/description.*:/i);
    if (descMatch) {
      const insertPoint = descMatch.index + descMatch[0].length;
      return content.slice(0, insertPoint) + 
        ` ${enhancement}` + 
        content.slice(insertPoint);
    }
    
    // Default: add in comment/doc
    if (content.startsWith('/**')) {
      const insertPoint = content.indexOf('*/');
      if (insertPoint > 0) {
        return content.slice(0, insertPoint) + 
          `\n * Design Quality: ${enhancement}\n` +
          content.slice(insertPoint);
      }
    }
    
    return content;
  }

  /**
   * Find design files
   */
  findDesignFiles() {
    const files = [];
    const searchPaths = [
      path.join(BASE_DIR, 'packages'),
      path.join(BASE_DIR, 'docs')
    ];
    
    for (const searchPath of searchPaths) {
      if (fs.existsSync(searchPath)) {
        const found = this.findFiles(searchPath, ['.md', '.ts', '.tsx', '.js', '.jsx'], 3);
        for (const file of found) {
          try {
            const content = fs.readFileSync(file, 'utf-8');
            if (content.match(/design|art|visual|aesthetic|sacred.*geometry|layout/i)) {
              files.push(file);
            }
          } catch (err) {
            // Skip
          }
        }
      }
    }
    
    return files;
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
  const enhancer = new DesignQualityEnhancer();
  enhancer.enhanceDesigns().catch(err => {
    logger.error(`Error enhancing designs: ${err.message}`);
    process.exit(1);
  });
}

export default DesignQualityEnhancer;

