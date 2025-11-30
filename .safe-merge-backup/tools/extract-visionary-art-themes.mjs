#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Extract Visionary Art Themes & Symbols Tool
 * 
 * Extracts visual themes, symbols, and artistic elements from books
 * Integrates them into canvas tools and game systems
 * Aligned with highest art standards: 3D, sacred geometry, immersive
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

class VisionaryArtExtractor
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.themes = [];
    this.symbols = [];
    this.colorPalettes = [];
    this.compositions = [];
    this.geometricPatterns = [];
    
    // Visual theme patterns
    this.themePatterns = {
      cosmic: /cosmic|cosmos|universe|galaxy|star|nebula|void|infinity/i,
      mystical: /mystical|mystery|arcane|esoteric|occult|sacred|divine/i,
      alchemical: /alchemical|alchemy|transmutation|solve.*coagula|philosopher.*stone/i,
      geometric: /geometric|geometry|sacred.*geometry|fractal|spiral|mandala/i,
      botanical: /botanical|plant|flower|tree|garden|nature|organic|biomorphic/i,
      architectural: /architectural|temple|cathedral|structure|building|space/i,
      celestial: /celestial|heaven|angel|archangel|divine.*hierarchy/i,
      elemental: /elemental|fire|water|air|earth|spirit|quintessence/i,
      chthonic: /chthonic|underworld|abyss|shadow|dark|depth/i,
      luminous: /luminous|light|radiant|glowing|shimmer|brilliant/i
    };

    // Symbol patterns (visual elements)
    this.symbolPatterns = {
      spiral: /spiral|helix|vortex|whorl/i,
      circle: /circle|ring|orb|sphere|round/i,
      triangle: /triangle|pyramid|trinity|three.*sided/i,
      square: /square|cube|four.*sided|quadrilateral/i,
      pentagon: /pentagon|pentagram|five.*pointed/i,
      hexagon: /hexagon|hexagram|six.*pointed/i,
      octagon: /octagon|octagram|eight.*sided/i,
      cross: /cross|crucifix|intersection/i,
      star: /star|asterisk|stellar/i,
      eye: /eye|all.*seeing|vision|sight/i,
      hand: /hand|palm|gesture|mudra/i,
      key: /key|unlock|gateway|portal/i,
      door: /door|gate|threshold|entrance/i,
      path: /path|road|journey|way|trail/i,
      tree: /tree|branch|root|trunk|foliage/i,
      flower: /flower|bloom|petal|blossom/i,
      sun: /sun|solar|radiant|golden.*disc/i,
      moon: /moon|lunar|silver|crescent/i
    };

    // Color patterns
    this.colorPatterns = {
      gold: /gold|golden|aureate|gilt/i,
      silver: /silver|argent|metallic.*white/i,
      red: /red|crimson|scarlet|ruby|vermilion/i,
      blue: /blue|azure|sapphire|cerulean|indigo/i,
      green: /green|emerald|verdant|jade|viridian/i,
      purple: /purple|violet|amethyst|lavender|mauve/i,
      white: /white|ivory|pearl|alabaster/i,
      black: /black|ebony|obsidian|jet|sable/i,
      yellow: /yellow|golden|amber|citrine|saffron/i,
      orange: /orange|amber|copper|rust|terracotta/i
    };

    // Composition patterns
    this.compositionPatterns = {
      centered: /centered|central|focus|middle|core/i,
      symmetrical: /symmetrical|balanced|mirror|reflection/i,
      spiral: /spiral|helical|coiling|winding/i,
      layered: /layered|stacked|depth|overlapping/i,
      radial: /radial|radiating|spokes|rays|sunburst/i,
      grid: /grid|lattice|matrix|pattern|network/i,
      flowing: /flowing|organic|curved|smooth|undulating/i,
      geometric: /geometric|angular|precise|structured/i
    };

    // Sacred geometry patterns
    this.geometryPatterns = {
      goldenRatio: /golden.*ratio|phi|1\.618|divine.*proportion/i,
      fibonacci: /fibonacci|spiral|sequence|1.*1.*2.*3.*5/i,
      vesica: /vesica|piscis|almond|mandorla/i,
      flowerOfLife: /flower.*of.*life|seed.*of.*life|sacred.*geometry/i,
      merkaba: /merkaba|merkabah|star.*tetrahedron/i,
      metatron: /metatron|cube|sacred.*geometry/i,
      platonic: /platonic.*solid|tetrahedron|cube|octahedron|icosahedron|dodecahedron/i,
      torus: /torus|donut|ring.*shape/i
    };
  }

  async extract() {
    logger.info('🎨 Extracting visionary art themes and symbols from books...');

    // Look for book files and documentation
    const bookPaths = await this.findBookFiles();
    
    for (const path of bookPaths) {
      await this.extractFromFile(path);
    }

    // Also search codebase for art definitions
    await this.searchCodebaseForArt();

    return {
      themes: this.themes,
      symbols: this.symbols,
      colorPalettes: this.colorPalettes,
      compositions: this.compositions,
      geometricPatterns: this.geometricPatterns
    };
  }

  async findBookFiles() {
    const paths = [];
    const workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];

    const bookNames = [
      'book',
      'text',
      'reference',
      'source',
      'documentation',
      'docs',
      'research',
      'art',
      'design',
      'visionary'
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
              // Check if it's a docs or research directory
              if (['docs', 'research', 'documentation', 'references'].includes(entry.toLowerCase())) {
                scanDir(fullPath, depth + 1);
              } else if (depth < 2) {
                scanDir(fullPath, depth + 1);
              }
            } else if (stat.isFile()) {
              const lowerName = entry.toLowerCase();
              if (bookNames.some(name => lowerName.includes(name)) || 
                  ['docs', 'research'].some(dir => fullPath.includes(dir))) {
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
        // Extract themes
        this.extractThemes(line, filePath, index + 1);
        
        // Extract symbols
        this.extractSymbols(line, filePath, index + 1);
        
        // Extract colors
        this.extractColors(line, filePath, index + 1);
        
        // Extract compositions
        this.extractCompositions(line, filePath, index + 1);
        
        // Extract geometric patterns
        this.extractGeometricPatterns(line, filePath, index + 1);
      });
    } catch (error) {
      // Skip files we can't read
    }
  }

  extractThemes(line, file, lineNumber) {
    for (const [themeType, pattern] of Object.entries(this.themePatterns)) {
      if (pattern.test(line)) {
        const existing = this.themes.find(
          t => t.file === file && t.line === lineNumber && t.type === themeType
        );

        if (!existing) {
          this.themes.push({
            type: themeType,
            name: this.extractThemeName(line, themeType),
            source: file,
            line: lineNumber,
            text: line.trim(),
            description: this.extractDescription(line),
            correspondences: this.extractCorrespondences(line)
          });
        }
      }
    }
  }

  extractSymbols(line, file, lineNumber) {
    for (const [symbolType, pattern] of Object.entries(this.symbolPatterns)) {
      if (pattern.test(line)) {
        const existing = this.symbols.find(
          s => s.file === file && s.line === lineNumber && s.type === symbolType
        );

        if (!existing) {
          this.symbols.push({
            type: symbolType,
            name: this.extractSymbolName(line, symbolType),
            source: file,
            line: lineNumber,
            text: line.trim(),
            description: this.extractDescription(line),
            visualProperties: this.extractVisualProperties(line),
            correspondences: this.extractCorrespondences(line)
          });
        }
      }
    }
  }

  extractColors(line, file, lineNumber) {
    for (const [colorType, pattern] of Object.entries(this.colorPatterns)) {
      if (pattern.test(line)) {
        const existing = this.colorPalettes.find(
          c => c.file === file && c.line === lineNumber && c.color === colorType
        );

        if (!existing) {
          this.colorPalettes.push({
            color: colorType,
            source: file,
            line: lineNumber,
            text: line.trim(),
            description: this.extractDescription(line),
            context: this.getContext(line)
          });
        }
      }
    }
  }

  extractCompositions(line, file, lineNumber) {
    for (const [compType, pattern] of Object.entries(this.compositionPatterns)) {
      if (pattern.test(line)) {
        const existing = this.compositions.find(
          c => c.file === file && c.line === lineNumber && c.type === compType
        );

        if (!existing) {
          this.compositions.push({
            type: compType,
            source: file,
            line: lineNumber,
            text: line.trim(),
            description: this.extractDescription(line)
          });
        }
      }
    }
  }

  extractGeometricPatterns(line, file, lineNumber) {
    for (const [geoType, pattern] of Object.entries(this.geometryPatterns)) {
      if (pattern.test(line)) {
        const existing = this.geometricPatterns.find(
          g => g.file === file && g.line === lineNumber && g.type === geoType
        );

        if (!existing) {
          this.geometricPatterns.push({
            type: geoType,
            source: file,
            line: lineNumber,
            text: line.trim(),
            description: this.extractDescription(line),
            mathematicalProperties: this.extractMathematicalProperties(line)
          });
        }
      }
    }
  }

  extractThemeName(line, themeType) {
    const namePatterns = [
      /(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:theme|realm|world)/i,
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
      new RegExp(`(${themeType})`, 'i')
    ];

    for (const pattern of namePatterns) {
      const match = line.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return themeType.charAt(0).toUpperCase() + themeType.slice(1);
  }

  extractSymbolName(line, symbolType) {
    const namePatterns = [
      /(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:symbol|sigil|seal)/i,
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
      new RegExp(`(${symbolType})`, 'i')
    ];

    for (const pattern of namePatterns) {
      const match = line.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return symbolType.charAt(0).toUpperCase() + symbolType.slice(1);
  }

  extractDescription(line) {
    const descPattern = /[:\-]\s*(.+)/;
    const match = line.match(descPattern);
    return match ? match[1].trim() : line.trim();
  }

  extractCorrespondences(line) {
    const correspondences = {};
    
    // Extract planet, element, zodiac, etc.
    const patterns = {
      planet: /(?:planet|planetary)[:\-]\s*(\w+)/i,
      element: /(?:element|elemental)[:\-]\s*(\w+)/i,
      zodiac: /(?:zodiac|sign)[:\-]\s*(\w+)/i,
      sephirah: /(?:sephirah|sephiroth)[:\-]\s*(\w+)/i,
      number: /(?:number|numerology)[:\-]\s*(\d+)/i
    };

    for (const [key, pattern] of Object.entries(patterns)) {
      const match = line.match(pattern);
      if (match) {
        correspondences[key] = match[1];
      }
    }

    return correspondences;
  }

  extractVisualProperties(line) {
    const properties = {};
    
    const patterns = {
      size: /(?:size|scale)[:\-]\s*(\w+)/i,
      position: /(?:position|location|place)[:\-]\s*(\w+)/i,
      rotation: /(?:rotation|angle|orientation)[:\-]\s*(\w+)/i,
      opacity: /(?:opacity|transparency|alpha)[:\-]\s*([\d.]+)/i,
      glow: /(?:glow|shimmer|radiance|luminous)/i
    };

    for (const [key, pattern] of Object.entries(patterns)) {
      if (pattern.test(line)) {
        const match = line.match(pattern);
        if (match) {
          properties[key] = match[1] || true;
        }
      }
    }

    return properties;
  }

  extractMathematicalProperties(line) {
    const properties = {};
    
    const patterns = {
      ratio: /(?:ratio|proportion)[:\-]\s*([\d.]+)/i,
      angle: /(?:angle|degree)[:\-]\s*(\d+)/i,
      scale: /(?:scale|factor)[:\-]\s*([\d.]+)/i,
      fibonacci: /fibonacci[:\-]\s*(\d+)/i,
      goldenRatio: /(?:golden.*ratio|phi)[:\-]\s*([\d.]+)/i
    };

    for (const [key, pattern] of Object.entries(patterns)) {
      const match = line.match(pattern);
      if (match) {
        properties[key] = parseFloat(match[1]) || match[1];
      }
    }

    return properties;
  }

  getContext(line) {
    // Extract surrounding context for color usage
    return {
      before: '',
      after: ''
    };
  }

  async searchCodebaseForArt() {
    const workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];

    for (const workspace of workspaces) {
      await this.scanForArtDefinitions(workspace);
    }
  }

  async scanForArtDefinitions(rootPath) {
    const textExtensions = ['.js', '.ts', '.json', '.md'];
    const excludeDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];
    let fileCount = 0;
    const MAX_FILES = 500; // Limit to prevent memory issues

    const scanDir = async (dir, depth = 0) => {
      if (depth > 3 || fileCount >= MAX_FILES) return; // Reduced depth and limit files

      try {
        const entries = readdirSync(dir);
        
        for (const entry of entries) {
          if (fileCount >= MAX_FILES) break;
          if (excludeDirs.includes(entry)) continue;

          const fullPath = join(dir, entry);
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            await scanDir(fullPath, depth + 1);
          } else if (stat.isFile() && textExtensions.includes(extname(entry))) {
            // Check if it's art-related
            const lowerName = entry.toLowerCase();
            if (lowerName.includes('art') || 
                lowerName.includes('design') || 
                lowerName.includes('visual') ||
                lowerName.includes('canvas') ||
                lowerName.includes('theme') ||
                lowerName.includes('symbol')) {
              fileCount++;
              await this.extractFromFile(fullPath);
            }
          }
        }
      } catch (error) {
        // Skip
      }
    };

    await scanDir(rootPath);
  }

  generateCanvasIntegration() {
    // Generate data structure for canvas tools
    return {
      themes: this.themes.map(theme => ({
        id: `theme-${theme.type}-${theme.line}`,
        name: theme.name,
        type: theme.type,
        description: theme.description,
        colors: this.colorPalettes.filter(c => 
          c.line >= theme.line - 5 && c.line <= theme.line + 5
        ).map(c => c.color),
        symbols: this.symbols.filter(s => 
          s.line >= theme.line - 5 && s.line <= theme.line + 5
        ).map(s => ({
          type: s.type,
          name: s.name,
          visualProperties: s.visualProperties
        })),
        geometricPatterns: this.geometricPatterns.filter(g => 
          g.line >= theme.line - 5 && g.line <= theme.line + 5
        ).map(g => ({
          type: g.type,
          mathematicalProperties: g.mathematicalProperties
        }))
      })),
      symbols: this.symbols.map(symbol => ({
        id: `symbol-${symbol.type}-${symbol.line}`,
        name: symbol.name,
        type: symbol.type,
        description: symbol.description,
        visualProperties: symbol.visualProperties,
        correspondences: symbol.correspondences,
        canvasConfig: {
          shape: symbol.type,
          color: this.colorPalettes.find(c => 
            c.line >= symbol.line - 2 && c.line <= symbol.line + 2
          )?.color || 'gold',
          size: symbol.visualProperties.size || 'medium',
          position: symbol.visualProperties.position || 'center',
          rotation: symbol.visualProperties.rotation || 0,
          opacity: symbol.visualProperties.opacity || 1.0,
          glow: symbol.visualProperties.glow || false
        }
      }))
    };
  }

  generateGameIntegration() {
    // Generate data structure for game systems
    return {
      themes: this.themes.map(theme => ({
        id: `theme-${theme.type}-${theme.line}`,
        name: theme.name,
        type: theme.type,
        description: theme.description,
        gameMechanics: {
          environment: theme.type,
          mood: theme.type,
          visualStyle: theme.type,
          soundTheme: theme.correspondences.planet || 'neutral'
        },
        symbols: this.symbols.filter(s => 
          s.line >= theme.line - 5 && s.line <= theme.line + 5
        ).map(s => ({
          type: s.type,
          name: s.name,
          gameObject: {
            type: 'symbol',
            interactable: true,
            collectible: true,
            effect: s.correspondences.element || 'neutral'
          }
        }))
      })),
      symbols: this.symbols.map(symbol => ({
        id: `symbol-${symbol.type}-${symbol.line}`,
        name: symbol.name,
        type: symbol.type,
        gameObject: {
          name: symbol.name,
          type: 'symbol',
          interactable: true,
          collectible: true,
          effect: symbol.correspondences.element || 'neutral',
          visual: {
            shape: symbol.type,
            color: this.colorPalettes.find(c => 
              c.line >= symbol.line - 2 && c.line <= symbol.line + 2
            )?.color || 'gold',
            size: symbol.visualProperties.size || 'medium',
            glow: symbol.visualProperties.glow || false
          },
          properties: {
            correspondences: symbol.correspondences,
            description: symbol.description
          }
        }
      }))
    };
  }

  generateReport() {
    const canvasData = this.generateCanvasIntegration();
    const gameData = this.generateGameIntegration();

    const report = {
      summary: {
        themesFound: this.themes.length,
        symbolsFound: this.symbols.length,
        colorsFound: this.colorPalettes.length,
        compositionsFound: this.compositions.length,
        geometricPatternsFound: this.geometricPatterns.length
      },
      canvasIntegration: canvasData,
      gameIntegration: gameData,
      rawData: {
        themes: this.themes.slice(0, 50),
        symbols: this.symbols.slice(0, 50),
        colorPalettes: this.colorPalettes.slice(0, 30),
        compositions: this.compositions.slice(0, 30),
        geometricPatterns: this.geometricPatterns.slice(0, 30)
      },
      integrationSuggestions: [
        {
          suggestion: 'Create canvas tool that loads themes and symbols',
          systems: ['canvas-apps', 'design-tools'],
          dataAvailable: canvasData.themes.length + canvasData.symbols.length
        },
        {
          suggestion: 'Integrate symbols into game as collectible items',
          systems: ['circuitum99', 'game-engine'],
          dataAvailable: gameData.symbols.length
        },
        {
          suggestion: 'Use themes for environment generation',
          systems: ['mystery-house', 'stone-grimoire'],
          dataAvailable: gameData.themes.length
        }
      ]
    };

    return report;
  }
}

// Main execution
async function main() {
  const extractor = new VisionaryArtExtractor();
  await extractor.extract();
  const report = extractor.generateReport();

  logger.info(`🎨 Extracted ${report.summary.themesFound} themes, ${report.summary.symbolsFound} symbols, ${report.summary.colorsFound} colors`);

  // Save to file
  const fs = await import('fs');
  const reportPath = join(__dirname, '..', 'docs', 'VISIONARY_ART_THEMES_EXTRACTED.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  logger.success(`📄 Report saved to ${reportPath}`);

  // Also save canvas and game integration files separately
  const canvasPath = join(__dirname, '..', 'data', 'canvas-themes-symbols.json');
  const gamePath = join(__dirname, '..', 'data', 'game-themes-symbols.json');
  
  const fsPromises = fs.promises;
  await fsPromises.mkdir(join(__dirname, '..', 'data'), { recursive: true });
  await fsPromises.writeFile(canvasPath, JSON.stringify(report.canvasIntegration, null, 2));
  await fsPromises.writeFile(gamePath, JSON.stringify(report.gameIntegration, null, 2));

  logger.success(`📄 Canvas integration saved to ${canvasPath}`);
  logger.success(`📄 Game integration saved to ${gamePath}`);

  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Extraction failed: ${error.message}`);
    process.exit(1);
  });
}

export { VisionaryArtExtractor };

