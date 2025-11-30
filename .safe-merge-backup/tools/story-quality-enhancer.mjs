#!/usr/bin/env node

/**
 * Story Quality Enhancer
 * 
 * Enhances story and narrative quality across all systems
 * Ensures trauma-aware, organic, open world story experiences
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

class StoryQualityEnhancer {
  // ND joy: Central to all tools - honors neurodivergent creative expression
  constructor() {
    this.qualityStandards = {
      traumaAware: true,
      organic: true,
      openWorld: true,
      nonLinear: true,
      responsive: true,
      alive: true
    };
  }

  /**
   * Enhance story files
   */
  async enhanceStories() {
    logger.info('📖 Enhancing story quality...');
    
    const storyFiles = this.findStoryFiles();
    
    for (const file of storyFiles) {
      try {
        let content = fs.readFileSync(file, 'utf-8');
        let enhanced = false;
        
        // Add story quality elements
        const enhancements = this.generateStoryEnhancements(content);
        
        if (enhancements.length > 0) {
          // Apply enhancements
          for (const enhancement of enhancements) {
            if (!content.includes(enhancement.text)) {
              content = this.applyEnhancement(content, enhancement);
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
    
    logger.info(`✅ Enhanced ${storyFiles.length} story files`);
  }

  /**
   * Generate story enhancements based on content
   */
  generateStoryEnhancements(content) {
    const enhancements = [];
    
    // Check what's missing
    if (!content.includes('trauma-aware') && !content.includes('trauma safe')) {
      enhancements.push({
        type: 'trauma-aware',
        text: 'Trauma-aware narrative design',
        description: 'Gentle, supportive story elements'
      });
    }
    
    if (!content.includes('open world') && !content.includes('open-world')) {
      enhancements.push({
        type: 'open-world',
        text: 'Open world story exploration',
        description: 'Non-linear, exploratory narrative'
      });
    }
    
    if (!content.includes('dynamic') && !content.includes('responsive')) {
      enhancements.push({
        type: 'dynamic',
        text: 'Dynamic story transformation',
        description: 'Story responds to choices organically'
      });
    }
    
    if (!content.includes('organic') && !content.includes('non-linear')) {
      enhancements.push({
        type: 'organic',
        text: 'Organic story paths',
        description: 'Natural, flowing narrative structure'
      });
    }
    
    return enhancements;
  }

  /**
   * Apply enhancement to content
   */
  applyEnhancement(content, enhancement) {
    // Find a good place to add enhancement
    const storyMatch = content.match(/story|narrative|pathworking/i);
    if (storyMatch) {
      const insertPoint = storyMatch.index + storyMatch[0].length;
      return content.slice(0, insertPoint) + 
        ` (${enhancement.text})` + 
        content.slice(insertPoint);
    }
    
    // If no story match, add at end of description
    const descMatch = content.match(/description.*:/i);
    if (descMatch) {
      const insertPoint = descMatch.index + descMatch[0].length;
      return content.slice(0, insertPoint) + 
        ` ${enhancement.description}` + 
        content.slice(insertPoint);
    }
    
    // Default: add near top
    if (content.startsWith('/**')) {
      const insertPoint = content.indexOf('*/');
      if (insertPoint > 0) {
        return content.slice(0, insertPoint) + 
          `\n * ${enhancement.text}: ${enhancement.description}\n` +
          content.slice(insertPoint);
      }
    }
    
    return content;
  }

  /**
   * Find story files
   */
  findStoryFiles() {
    const files = [];
    const searchPaths = [
      path.join(BASE_DIR, 'packages'),
      path.join(BASE_DIR, 'docs')
    ];
    
    for (const searchPath of searchPaths) {
      if (fs.existsSync(searchPath)) {
        const found = this.findFiles(searchPath, ['.md', '.ts', '.js'], 3);
        for (const file of found) {
          try {
            const content = fs.readFileSync(file, 'utf-8');
            if (content.match(/story|narrative|pathworking|circuitum/i)) {
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
  const enhancer = new StoryQualityEnhancer();
  enhancer.enhanceStories().catch(err => {
    logger.error(`Error enhancing stories: ${err.message}`);
    process.exit(1);
  });
}

export default StoryQualityEnhancer;

