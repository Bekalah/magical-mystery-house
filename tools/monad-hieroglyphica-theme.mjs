#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Monad Hieroglyphica Theme Applier
 * 
 * Applies John Dee's Monad Hieroglyphica alchemy theme throughout the magnum opus
 * for coherence across all tools, themes, engines, and systems.
 * 
 * The Monad Hieroglyphica represents:
 * - Unity in diversity (one symbol containing all)
 * - Alchemical transformation (solve et coagula)
 * - Sacred geometry and mathematical precision
 * - Mystical correspondences
 * - Aristocratic refinement
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

/**
 * Monad Hieroglyphica Alchemical Principles
 * Based on John Dee's work (1564)
 */
const MONAD_PRINCIPLES = {
  // Core alchemical symbols from Monad Hieroglyphica
  symbols: {
    monad: '⊙', // The unified symbol - one containing all
    sun: '☉', // Solar principle - active, creative
    moon: '☽', // Lunar principle - receptive, reflective
    earth: '♁', // Earthly manifestation
    fire: '△', // Transformation, purification
    water: '▽', // Flow, dissolution
    air: '△', // Breath, spirit
    mercury: '☿', // Mercury - the alchemical agent
    salt: '⊡', // Crystallization, structure
    sulfur: '🜍', // Volatile, transformative
    gold: '☉', // Perfection, completion
    silver: '☽', // Reflection, purity
    philosopherStone: '⊙', // The ultimate unity
  },
  
  // Alchemical processes (solve et coagula)
  processes: {
    solve: 'dissolution', // Breaking down, analysis
    coagula: 'coagulation', // Building up, synthesis
    calcinatio: 'calcination', // Burning away impurities
    solutio: 'solution', // Dissolving in water
    separatio: 'separation', // Distinguishing elements
    coniunctio: 'conjunction', // Uniting opposites
    putrefactio: 'putrefaction', // Decay before rebirth
    sublimatio: 'sublimation', // Rising to higher state
    fermentatio: 'fermentation', // Transformation
    multiplicatio: 'multiplication', // Amplification
    proiectio: 'projection', // Final transformation
  },
  
  // Sacred geometry correspondences
  geometry: {
    circle: 'unity, wholeness, perfection',
    triangle: 'trinity, balance, stability',
    square: 'earth, foundation, structure',
    pentagon: 'pentagram, microcosm, human',
    hexagon: 'hexagram, macrocosm, universe',
    heptagon: 'seven planets, seven metals',
    octagon: 'regeneration, infinity',
    nonagon: 'nine spheres, completion',
    decagon: 'ten sephiroth, divine order',
  },
  
  // Mathematical correspondences (144:99 ratio, golden ratio)
  mathematics: {
    ratio144_99: 144 / 99, // Your signature ratio
    goldenRatio: 1.618033988749895,
    phi: 1.618033988749895,
    fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
    sacredRoots: {
      sqrt2: Math.sqrt(2),
      sqrt3: Math.sqrt(3),
      sqrt5: Math.sqrt(5),
    },
  },
  
  // Elemental correspondences
  elements: {
    fire: { direction: 'south', quality: 'hot/dry', planet: 'mars', metal: 'iron' },
    water: { direction: 'west', quality: 'cold/wet', planet: 'moon', metal: 'silver' },
    air: { direction: 'east', quality: 'hot/wet', planet: 'jupiter', metal: 'tin' },
    earth: { direction: 'north', quality: 'cold/dry', planet: 'saturn', metal: 'lead' },
  },
  
  // Planetary correspondences
  planets: {
    sun: { metal: 'gold', day: 'sunday', number: 6 },
    moon: { metal: 'silver', day: 'monday', number: 7 },
    mars: { metal: 'iron', day: 'tuesday', number: 3 },
    mercury: { metal: 'mercury', day: 'wednesday', number: 8 },
    jupiter: { metal: 'tin', day: 'thursday', number: 4 },
    venus: { metal: 'copper', day: 'friday', number: 5 },
    saturn: { metal: 'lead', day: 'saturday', number: 9 },
  },
};

/**
 * Monad Hieroglyphica Theme Applier
 */
class MonadHieroglyphicaTheme {
  constructor() {
    this.themeData = {
      applied: [],
      coherence: [],
      opportunities: [],
    };
  }

  /**
   * Apply Monad Hieroglyphica theme to a file
   * Additive-only: only adds theme elements if missing
   */
  async applyThemeToFile(filePath, context = {}) {
    try {
      if (!fs.existsSync(filePath)) {
        logger.warn(`File not found: ${filePath}`);
        return { applied: false, reason: 'file_not_found' };
      }

      // Detect line endings
      const content = fs.readFileSync(filePath, 'utf-8');
      const lineEnding = content.includes('\r\n') ? '\r\n' : (content.includes('\n') ? '\n' : '\r\n');
      
      let newContent = content;
      let applied = false;
      const additions = [];

      // Check if file already has Monad theme
      const hasMonadTheme = content.includes('Monad Hieroglyphica') || 
                           content.includes('monad-hieroglyphica') ||
                           content.includes('alchemical theme');

      if (!hasMonadTheme) {
        // Add Monad Hieroglyphica header comment if it's a code file
        if (filePath.endsWith('.mjs') || filePath.endsWith('.js') || filePath.endsWith('.ts')) {
          const headerPattern = /^(\/\*\*[\s\S]*?\*\/\s*\n)?/;
          const existingHeader = content.match(headerPattern)?.[0] || '';
          
          if (!existingHeader.includes('Monad Hieroglyphica')) {
            const monadHeader = `/**
 * Monad Hieroglyphica Alchemy Theme
 * 
 * This file is part of the unified alchemical system based on John Dee's Monad Hieroglyphica.
 * The Monad represents unity in diversity - one symbol containing all.
 * 
 * Alchemical Principles:
 * - Solve et Coagula (dissolve and coagulate)
 * - Sacred geometry and mathematical precision (144:99 ratio, golden ratio)
 * - Mystical correspondences (elements, planets, metals)
 * - Aristocratic refinement and museum-grade quality
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */
${existingHeader ? '' : '\n'}`;
            
            newContent = monadHeader + content.replace(headerPattern, '');
            additions.push('Monad Hieroglyphica header');
            applied = true;
          }
        }
      }

      // Add theme constants if it's a tool file
      if (filePath.includes('/tools/') && filePath.endsWith('.mjs')) {
        const hasThemeConstants = content.includes('MONAD_PRINCIPLES') || 
                                 content.includes('monadPrinciples');
        
        if (!hasThemeConstants) {
          // Add theme constants at the end of imports
          const importEnd = newContent.lastIndexOf('import') !== -1 
            ? newContent.lastIndexOf(';', newContent.lastIndexOf('import')) + 1
            : 0;
          
          const themeConstants = `
/**
 * Monad Hieroglyphica Theme Constants
 * 
 * Alchemical symbols, processes, and correspondences for coherence
 */
const MONAD_THEME = {
  ratio: ${MONAD_PRINCIPLES.mathematics.ratio144_99}, // 144:99 signature ratio
  goldenRatio: ${MONAD_PRINCIPLES.mathematics.goldenRatio},
  process: 'solve-et-coagula', // Dissolve and coagulate
  principle: 'unity-in-diversity', // One containing all
  quality: 'aristocratic-refinement', // Museum-grade quality
};
`;
          
          if (importEnd > 0) {
            newContent = newContent.slice(0, importEnd + 1) + themeConstants + newContent.slice(importEnd + 1);
          } else {
            newContent = themeConstants + newContent;
          }
          
          additions.push('Monad theme constants');
          applied = true;
        }
      }

      // Only write if we made changes (additive-only)
      if (applied && newContent.length > content.length) {
        // Preserve original line endings
        const normalizedContent = newContent.replace(/\r\n|\r|\n/g, lineEnding);
        fs.writeFileSync(filePath, normalizedContent, 'utf-8');
        
        this.themeData.applied.push({
          file: filePath,
          additions,
          timestamp: new Date().toISOString(),
        });
        
        return { applied: true, additions, file: filePath };
      }

      return { applied: false, reason: 'already_has_theme_or_no_changes' };
    } catch (error) {
      logger.error(`Error applying theme to ${filePath}: ${error.message}`);
      return { applied: false, error: error.message };
    }
  }

  /**
   * Apply theme to all tools, themes, engines, systems
   */
  async applyThemeToAll() {
    logger.info('🔮 Applying Monad Hieroglyphica Alchemy Theme');
    logger.info('   → Unity in diversity (one symbol containing all)');
    logger.info('   → Alchemical transformation (solve et coagula)');
    logger.info('   → Sacred geometry and mathematical precision');
    logger.info('   → Mystical correspondences and aristocratic refinement\n');

    const results = {
      tools: [],
      themes: [],
      engines: [],
      systems: [],
      totalApplied: 0,
      totalSkipped: 0,
    };

    // Apply to all tools
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (fs.existsSync(toolsDir)) {
      const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith('.mjs') && !f.includes('.backup'));
      
      for (const toolFile of toolFiles) {
        const toolPath = path.join(toolsDir, toolFile);
        const result = await this.applyThemeToFile(toolPath, { type: 'tool' });
        if (result.applied) {
          results.tools.push(result);
          results.totalApplied++;
        } else {
          results.totalSkipped++;
        }
      }
    }

    // Apply to package.json and other system files
    const systemFiles = [
      path.join(BASE_DIR, 'package.json'),
    ];

    for (const sysFile of systemFiles) {
      if (fs.existsSync(sysFile)) {
        const result = await this.applyThemeToFile(sysFile, { type: 'system' });
        if (result.applied) {
          results.systems.push(result);
          results.totalApplied++;
        } else {
          results.totalSkipped++;
        }
      }
    }

    // Check coherence
    const coherence = await this.checkCoherence();

    logger.info(`\n✅ Theme application complete`);
    logger.info(`   Applied: ${results.totalApplied} files`);
    logger.info(`   Skipped: ${results.totalSkipped} files (already themed or no changes needed)`);
    logger.info(`   Coherence score: ${coherence.score.toFixed(1)}%`);

    return {
      ...results,
      coherence,
      themeData: this.themeData,
    };
  }

  /**
   * Check coherence of Monad Hieroglyphica theme across all files
   */
  async checkCoherence() {
    logger.info('🔍 Checking Monad Hieroglyphica theme coherence...');

    const coherence = {
      score: 0,
      totalFiles: 0,
      themedFiles: 0,
      missingTheme: [],
      opportunities: [],
    };

    // Check all tool files
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (fs.existsSync(toolsDir)) {
      const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith('.mjs') && !f.includes('.backup'));
      
      coherence.totalFiles = toolFiles.length;

      for (const toolFile of toolFiles) {
        const toolPath = path.join(toolsDir, toolFile);
        const content = fs.readFileSync(toolPath, 'utf-8');
        
        const hasTheme = content.includes('Monad Hieroglyphica') || 
                        content.includes('monad-hieroglyphica') ||
                        content.includes('MONAD_THEME') ||
                        content.includes('alchemical theme');
        
        if (hasTheme) {
          coherence.themedFiles++;
        } else {
          coherence.missingTheme.push(toolFile);
          coherence.opportunities.push({
            file: toolFile,
            type: 'missing_theme',
            priority: 'high',
          });
        }
      }
    }

    // Calculate coherence score
    if (coherence.totalFiles > 0) {
      coherence.score = (coherence.themedFiles / coherence.totalFiles) * 100;
    }

    this.themeData.coherence.push({
      timestamp: new Date().toISOString(),
      score: coherence.score,
      details: coherence,
    });

    return coherence;
  }

  /**
   * Generate theme documentation
   */
  async generateThemeDocumentation() {
    const docPath = path.join(BASE_DIR, 'docs', 'MONAD_HIEROGLYPHICA_THEME.md');
    const docDir = path.dirname(docPath);
    
    if (!fs.existsSync(docDir)) {
      fs.mkdirSync(docDir, { recursive: true });
    }

    const documentation = `# Monad Hieroglyphica Alchemy Theme

**Author**: Rebecca Respawn  
**License**: CC0-1.0 - Public Domain  
**Updated**: ${new Date().toISOString()}

## Overview

The Monad Hieroglyphica theme is applied throughout the magnum opus to create coherence across all tools, themes, engines, and systems. Based on John Dee's work (1564), the Monad represents unity in diversity - one symbol containing all.

## Core Principles

### 1. Unity in Diversity
- The Monad (⊙) represents the unified whole
- One symbol containing all elements, processes, and correspondences
- Coherence across all systems while maintaining individual identity

### 2. Alchemical Transformation (Solve et Coagula)
- **Solve** (dissolution): Breaking down, analysis, research
- **Coagula** (coagulation): Building up, synthesis, implementation
- Continuous cycle of improvement and refinement

### 3. Sacred Geometry & Mathematical Precision
- 144:99 ratio (signature ratio)
- Golden ratio (1.618...)
- Fibonacci sequence
- Sacred square roots (√2, √3, √5)

### 4. Mystical Correspondences
- Elements: Fire, Water, Air, Earth
- Planets: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
- Metals: Gold, Silver, Iron, Mercury, Tin, Copper, Lead
- Directions, qualities, and symbolic meanings

### 5. Aristocratic Refinement
- Museum-grade quality
- Refined sophistication
- Timeless beauty
- Teaching through excellence

## Alchemical Symbols

${Object.entries(MONAD_PRINCIPLES.symbols).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## Alchemical Processes

${Object.entries(MONAD_PRINCIPLES.processes).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## Sacred Geometry

${Object.entries(MONAD_PRINCIPLES.geometry).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## Mathematical Correspondences

- **144:99 Ratio**: ${MONAD_PRINCIPLES.mathematics.ratio144_99.toFixed(6)} (signature ratio)
- **Golden Ratio (φ)**: ${MONAD_PRINCIPLES.mathematics.goldenRatio.toFixed(15)}
- **Fibonacci Sequence**: ${MONAD_PRINCIPLES.mathematics.fibonacci.join(', ')}
- **Sacred Roots**: √2 = ${MONAD_PRINCIPLES.mathematics.sacredRoots.sqrt2.toFixed(6)}, √3 = ${MONAD_PRINCIPLES.mathematics.sacredRoots.sqrt3.toFixed(6)}, √5 = ${MONAD_PRINCIPLES.mathematics.sacredRoots.sqrt5.toFixed(6)}

## Elemental Correspondences

${Object.entries(MONAD_PRINCIPLES.elements).map(([element, data]) => 
  `- **${element}**: Direction: ${data.direction}, Quality: ${data.quality}, Planet: ${data.planet}, Metal: ${data.metal}`
).join('\n')}

## Planetary Correspondences

${Object.entries(MONAD_PRINCIPLES.planets).map(([planet, data]) => 
  `- **${planet}**: Metal: ${data.metal}, Day: ${data.day}, Number: ${data.number}`
).join('\n')}

## Application

The Monad Hieroglyphica theme is applied to:
- All tools in \`tools/\` directory
- System configuration files
- Documentation
- Code structure and organization

## Coherence

The theme ensures:
- Consistent alchemical language and symbols
- Unified mathematical principles (144:99, golden ratio)
- Coherent mystical correspondences
- Aristocratic refinement throughout
- Museum-grade quality standards

## Integration

The theme integrates with:
- Solve et Coagula improvement cycle
- Vision weaving system
- Codex generation
- Tool improvement system
- Magnum opus enhancement

---

**The Monad Hieroglyphica theme creates coherence across all systems while honoring the alchemical tradition and maintaining your unique vision and attribution.**
`;

    fs.writeFileSync(docPath, documentation, 'utf-8');
    logger.info(`✅ Theme documentation generated: ${docPath}`);

    return docPath;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2] || 'apply';
  
  const applier = new MonadHieroglyphicaTheme();
  
  if (command === 'apply') {
    applier.applyThemeToAll()
      .then(results => {
        UserFeedback.success(`Theme applied to ${results.totalApplied} files`);
        process.exit(0);
      })
      .catch(error => {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
      });
  } else if (command === 'check') {
    applier.checkCoherence()
      .then(coherence => {
        logger.info(`Coherence score: ${coherence.score.toFixed(1)}%`);
        logger.info(`Themed files: ${coherence.themedFiles}/${coherence.totalFiles}`);
        if (coherence.missingTheme.length > 0) {
          logger.info(`Missing theme: ${coherence.missingTheme.length} files`);
        }
        process.exit(0);
      })
      .catch(error => {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
      });
  } else if (command === 'docs') {
    applier.generateThemeDocumentation()
      .then(docPath => {
        UserFeedback.success(`Documentation generated: ${docPath}`);
        process.exit(0);
      })
      .catch(error => {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
      });
  } else {
    logger.error(`Unknown command: ${command}`);
    logger.info('Usage: node monad-hieroglyphica-theme.mjs [apply|check|docs]');
    process.exit(1);
  }
}

export default MonadHieroglyphicaTheme;

