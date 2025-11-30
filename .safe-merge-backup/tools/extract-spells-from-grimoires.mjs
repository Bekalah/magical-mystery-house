#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Extract Spells from Grimoires Tool
 * 
 * Extracts real spells from authentic grimoires
 * Supports: Key of Solomon, Lesser Key, Agrippa, etc.
 * 
 * @license CC0-1.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { join, extname } = path;
const logger = new EnhancedLogger();

class SpellExtractor
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.spells = [];
    
    this.spellPatterns = {
      invocation: /invocation|invoke|call.*upon/i,
      evocation: /evocation|evoke|summon/i,
      conjuration: /conjuration|conjure/i,
      ritual: /ritual|rite|ceremony/i,
      spell: /spell|incantation|charm/i,
      prayer: /prayer|pray|supplication/i,
      formula: /formula|recipe|preparation/i
    };

    this.componentPatterns = {
      ingredients: /ingredient|herb|plant|mineral|stone|crystal/i,
      tools: /tool|instrument|wand|sword|cup|pentacle|dagger/i,
      timing: /time|hour|day|moon|phase|season|planetary.*hour/i,
      correspondences: /correspondence|planet|element|zodiac|sephirah/i,
      purpose: /purpose|intent|goal|aim|objective|to.*(?:obtain|achieve|gain)/i
    };
  }

  async extract() {
    logger.info('🔍 Extracting spells from grimoires...');

    // Look for grimoire files
    const grimoirePaths = await this.findGrimoireFiles();
    
    for (const path of grimoirePaths) {
      await this.extractFromFile(path);
    }

    // Also search codebase for spell definitions
    await this.searchCodebaseForSpells();

    return this.spells;
  }

  async findGrimoireFiles() {
    const paths = [];
    const workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];

    const grimoireNames = [
      'grimoire',
      'solomon',
      'key',
      'lesser',
      'agrippa',
      'ritual',
      'spell',
      'magic'
    ];

    for (const workspace of workspaces) {
      const scanDir = (dir, depth = 0) => {
        if (depth > 5) return;

        try {
          const entries = readdirSync(dir);
          
          for (const entry of entries) {
            const fullPath = join(dir, entry);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
              scanDir(fullPath, depth + 1);
            } else if (stat.isFile()) {
              const lowerName = entry.toLowerCase();
              if (grimoireNames.some(name => lowerName.includes(name))) {
                if (['.md', '.txt', '.json', '.js', '.ts'].includes(extname(entry))) {
                  paths.push(fullPath);
                }
              }
            }
          }
        } catch (error) {
          // Skip
        }
      };

      scanDir(workspace);
    }

    return paths;
  }

  async extractFromFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      let currentSpell = null;
      let inSpellBlock = false;

      lines.forEach((line, index) => {
        // Check if we're starting a new spell
        const isSpellStart = Object.values(this.spellPatterns).some(pattern => pattern.test(line));
        
        if (isSpellStart && !inSpellBlock) {
          // Start new spell
          currentSpell = {
            name: this.extractSpellName(line),
            type: this.extractSpellType(line),
            source: filePath,
            startLine: index + 1,
            text: [line.trim()],
            components: {},
            correspondences: {},
            purpose: null
          };
          inSpellBlock = true;
        } else if (inSpellBlock && currentSpell) {
          // Continue collecting spell text
          currentSpell.text.push(line.trim());

          // Extract components
          this.extractComponents(line, currentSpell);

          // Check if spell block ends (empty line or new spell starts)
          if (line.trim() === '' && currentSpell.text.length > 5) {
            // End of spell block
            currentSpell.endLine = index + 1;
            currentSpell.fullText = currentSpell.text.join('\n');
            this.spells.push(currentSpell);
            currentSpell = null;
            inSpellBlock = false;
          }
        }
      });

      // If we're still in a spell block at the end, save it
      if (currentSpell && inSpellBlock) {
        currentSpell.endLine = lines.length;
        currentSpell.fullText = currentSpell.text.join('\n');
        this.spells.push(currentSpell);
      }
    } catch (error) {
      // Skip files we can't read
    }
  }

  extractSpellName(line) {
    // Try to extract spell name
    const namePatterns = [
      /(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:spell|ritual|invocation)/i,
      /(?:to\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
      /"([^"]+)"/,
      /'([^']+)'/
    ];

    for (const pattern of namePatterns) {
      const match = line.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return 'Unnamed Spell';
  }

  extractSpellType(line) {
    for (const [type, pattern] of Object.entries(this.spellPatterns)) {
      if (pattern.test(line)) {
        return type;
      }
    }
    return 'spell';
  }

  extractComponents(line, spell) {
    // Extract ingredients
    if (this.componentPatterns.ingredients.test(line)) {
      if (!spell.components.ingredients) {
        spell.components.ingredients = [];
      }
      const match = line.match(/(?:ingredient|herb|plant|mineral|stone|crystal)[s]?[:\-]\s*(.+)/i);
      if (match) {
        spell.components.ingredients.push(match[1].trim());
      }
    }

    // Extract tools
    if (this.componentPatterns.tools.test(line)) {
      if (!spell.components.tools) {
        spell.components.tools = [];
      }
      const match = line.match(/(?:tool|instrument|wand|sword|cup|pentacle|dagger)[s]?[:\-]\s*(.+)/i);
      if (match) {
        spell.components.tools.push(match[1].trim());
      }
    }

    // Extract timing
    if (this.componentPatterns.timing.test(line)) {
      const match = line.match(/(?:time|hour|day|moon|phase|season|planetary.*hour)[:\-]\s*(.+)/i);
      if (match) {
        spell.components.timing = match[1].trim();
      }
    }

    // Extract purpose
    if (this.componentPatterns.purpose.test(line)) {
      const match = line.match(/(?:purpose|intent|goal|aim|objective|to\s+(?:obtain|achieve|gain))[:\-]\s*(.+)/i);
      if (match) {
        spell.purpose = match[1].trim();
      }
    }

    // Extract correspondences
    if (this.componentPatterns.correspondences.test(line)) {
      const planetMatch = line.match(/(?:planet|planetary)[:\-]\s*(\w+)/i);
      if (planetMatch) {
        spell.correspondences.planet = planetMatch[1];
      }

      const elementMatch = line.match(/(?:element|elemental)[:\-]\s*(\w+)/i);
      if (elementMatch) {
        spell.correspondences.element = elementMatch[1];
      }
    }
  }

  async searchCodebaseForSpells() {
    const workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];

    for (const workspace of workspaces) {
      await this.scanForSpellDefinitions(workspace);
    }
  }

  async scanForSpellDefinitions(rootPath) {
    const textExtensions = ['.js', '.ts', '.json', '.md'];
    const excludeDirs = ['node_modules', '.git', 'dist', 'build'];

    const scanDir = async (dir, depth = 0) => {
      if (depth > 5) return;

      try {
        const entries = readdirSync(dir);
        
        for (const entry of entries) {
          if (excludeDirs.includes(entry)) continue;

          const fullPath = join(dir, entry);
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            await scanDir(fullPath, depth + 1);
          } else if (stat.isFile() && textExtensions.includes(extname(entry))) {
            await this.extractFromFile(fullPath);
          }
        }
      } catch (error) {
        // Skip
      }
    };

    await scanDir(rootPath);
  }

  generateReport() {
    const report = {
      summary: {
        totalSpells: this.spells.length,
        byType: {},
        bySource: {}
      },
      spells: this.spells.slice(0, 30), // Top 30
      integrationSuggestions: []
    };

    // Group by type
    this.spells.forEach(spell => {
      report.summary.byType[spell.type] = (report.summary.byType[spell.type] || 0) + 1;
    });

    // Group by source
    this.spells.forEach(spell => {
      const source = spell.source.split('/').pop();
      report.summary.bySource[source] = (report.summary.bySource[source] || 0) + 1;
    });

    // Integration suggestions
    if (this.spells.length > 0) {
      report.integrationSuggestions.push({
        suggestion: 'Integrate spells into Circuitum99 game mechanics',
        count: this.spells.length,
        systems: ['circuitum99', 'stone-grimoire']
      });

      report.integrationSuggestions.push({
        suggestion: 'Create spell casting system with real correspondences',
        count: this.spells.length,
        systems: ['game-engine', 'liber-arcanae']
      });
    }

    return report;
  }
}

// Main execution
async function main() {
  const extractor = new SpellExtractor();
  await extractor.extract();
  const report = extractor.generateReport();

  logger.info(`✨ Extracted ${report.summary.totalSpells} spells from grimoires`);

  // Save to file
  const fs = await import('fs');
  const reportPath = join(__dirname, '..', 'docs', 'SPELLS_EXTRACTED.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  logger.success(`📄 Report saved to ${reportPath}`);

  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Extraction failed: ${error.message}`);
    process.exit(1);
  });
}

export { SpellExtractor };

