#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Extract Symbols from Books Tool
 * 
 * Extracts real symbols from grimoires and esoteric texts
 * Supports: Agrippa's Three Books, Dee's Monas Hieroglyphica, B.O.T.A. symbols, etc.
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

class SymbolExtractor
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.symbols = [];
    this.grimoireSources = [
      'agrippa',
      'dee',
      'bota',
      'key of solomon',
      'lesser key',
      'soyga',
      'ars notoria',
      'enochian'
    ];

    this.symbolPatterns = {
      // Geometric symbols
      pentagram: /pentagram|pentacle|five.*pointed/i,
      hexagram: /hexagram|six.*pointed|star.*of.*david/i,
      circle: /circle|ring|circumference/i,
      triangle: /triangle|three.*sided/i,
      square: /square|four.*sided|quadrilateral/i,
      
      // Sacred symbols
      monad: /monas|monad|hieroglyphica/i,
      vesica: /vesica|piscis|almond/i,
      flowerOfLife: /flower.*of.*life|seed.*of.*life/i,
      merkaba: /merkaba|merkabah/i,
      
      // Alchemical symbols
      sun: /☉|sun.*symbol/i,
      moon: /☾|moon.*symbol/i,
      mercury: /☿|mercury.*symbol/i,
      venus: /♀|venus.*symbol/i,
      mars: /♂|mars.*symbol/i,
      jupiter: /♃|jupiter.*symbol/i,
      saturn: /♄|saturn.*symbol/i,
      
      // Hebrew letters
      aleph: /aleph|א/i,
      beth: /beth|ב/i,
      gimel: /gimel|ג/i,
      
      // Sigils and seals
      sigil: /sigil|seal|symbol.*of/i,
      seal: /seal.*of|seal.*of.*solomon/i
    };

    this.correspondencePatterns = {
      planet: /planet|planetary|mercury|venus|mars|jupiter|saturn/i,
      element: /element|fire|water|air|earth/i,
      zodiac: /zodiac|aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces/i,
      sephirah: /sephirah|kether|chokmah|binah|chesed|geburah|tiphereth|netzach|hod|yesod|malkuth/i,
      color: /color|colour|red|blue|yellow|green|violet|orange/i,
      number: /number|numerology|\d+/i
    };
  }

  async extract() {
    logger.info('🔍 Extracting symbols from grimoires and esoteric texts...');

    // Look for grimoire files
    const grimoirePaths = await this.findGrimoireFiles();
    
    for (const path of grimoirePaths) {
      await this.extractFromFile(path);
    }

    // Also search codebase for symbol definitions
    await this.searchCodebaseForSymbols();

    return this.symbols;
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
      'agrippa',
      'dee',
      'solomon',
      'key',
      'soyga',
      'notoria',
      'enochian',
      'symbol',
      'sigil',
      'seal'
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

      lines.forEach((line, index) => {
        // Check for symbol patterns
        for (const [symbolType, pattern] of Object.entries(this.symbolPatterns)) {
          if (pattern.test(line)) {
            const symbol = this.parseSymbol(line, filePath, index + 1, symbolType);
            if (symbol) {
              this.symbols.push(symbol);
            }
          }
        }
      });
    } catch (error) {
      // Skip files we can't read
    }
  }

  parseSymbol(line, file, lineNumber, symbolType) {
    const symbol = {
      name: this.extractSymbolName(line, symbolType),
      type: symbolType,
      source: file,
      line: lineNumber,
      text: line.trim(),
      correspondences: this.extractCorrespondences(line),
      description: this.extractDescription(line)
    };

    return symbol;
  }

  extractSymbolName(line, symbolType) {
    // Try to extract a name from the line
    const namePatterns = [
      /(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
      /([A-Z][a-z]+(?:\s+of\s+[A-Z][a-z]+)*)/,
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+symbol/i
    ];

    for (const pattern of namePatterns) {
      const match = line.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return symbolType.charAt(0).toUpperCase() + symbolType.slice(1);
  }

  extractCorrespondences(line) {
    const correspondences = {};

    for (const [type, pattern] of Object.entries(this.correspondencePatterns)) {
      if (pattern.test(line)) {
        const match = line.match(pattern);
        if (match) {
          correspondences[type] = match[0];
        }
      }
    }

    return correspondences;
  }

  extractDescription(line) {
    // Try to extract a description (usually after colon or dash)
    const descPattern = /[:\-]\s*(.+)/;
    const match = line.match(descPattern);
    return match ? match[1].trim() : line.trim();
  }

  async searchCodebaseForSymbols() {
    const workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];

    for (const workspace of workspaces) {
      await this.scanForSymbolDefinitions(workspace);
    }
  }

  async scanForSymbolDefinitions(rootPath) {
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
        totalSymbols: this.symbols.length,
        byType: {},
        bySource: {}
      },
      symbols: this.symbols.slice(0, 50), // Top 50
      integrationSuggestions: []
    };

    // Group by type
    this.symbols.forEach(symbol => {
      report.summary.byType[symbol.type] = (report.summary.byType[symbol.type] || 0) + 1;
    });

    // Group by source
    this.symbols.forEach(symbol => {
      const source = symbol.source.split('/').pop();
      report.summary.bySource[source] = (report.summary.bySource[source] || 0) + 1;
    });

    // Integration suggestions
    if (this.symbols.length > 0) {
      report.integrationSuggestions.push({
        suggestion: 'Integrate symbols into Stone Grimoire chapels',
        count: this.symbols.length,
        systems: ['stone-grimoire', 'codex-144-99', 'liber-arcanae']
      });

      report.integrationSuggestions.push({
        suggestion: 'Create interactive symbol viewer in game',
        count: this.symbols.length,
        systems: ['circuitum99', 'mystery-house']
      });
    }

    return report;
  }
}

// Main execution
async function main() {
  const extractor = new SymbolExtractor();
  await extractor.extract();
  const report = extractor.generateReport();

  logger.info(`✨ Extracted ${report.summary.totalSymbols} symbols from grimoires`);

  // Save to file
  const fs = await import('fs');
  const reportPath = join(__dirname, '..', 'docs', 'SYMBOLS_EXTRACTED.json');
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

export { SymbolExtractor };

