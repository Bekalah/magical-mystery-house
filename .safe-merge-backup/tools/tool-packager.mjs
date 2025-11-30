#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Tool Packager
 * 
 * Packages tools, themes, engines, and systems with Monad Hieroglyphica alchemy theme
 * for coherent distribution and integration.
 * 
 * Creates packages that:
 * - Follow Monad Hieroglyphica alchemical principles
 * - Maintain 144:99 ratio and golden ratio proportions
 * - Include all necessary dependencies and themes
 * - Preserve your vision and attribution
 * - Ensure museum-grade quality
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';
import MonadHieroglyphicaTheme from './monad-hieroglyphica-theme.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

/**
 * Tool Packager
 */
class ToolPackager {
  constructor() {
    this.packages = {
      tools: [],
      themes: [],
      engines: [],
      systems: [],
    };
    this.themeApplier = new MonadHieroglyphicaTheme();
  }

  /**
   * Identify tools, themes, engines, systems
   */
  async identifyComponents() {
    logger.info('🔍 Identifying tools, themes, engines, and systems...');

    const components = {
      tools: [],
      themes: [],
      engines: [],
      systems: [],
    };

    // Identify tools
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (fs.existsSync(toolsDir)) {
      const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith('.mjs') && !f.includes('.backup'));
      
      for (const toolFile of toolFiles) {
        const toolPath = path.join(toolsDir, toolFile);
        const content = fs.readFileSync(toolPath, 'utf-8');
        
        // Categorize tools
        const toolInfo = {
          name: toolFile.replace('.mjs', ''),
          path: toolPath,
          category: this.categorizeTool(toolFile, content),
          dependencies: this.extractDependencies(content),
          theme: this.checkTheme(content),
        };
        
        components.tools.push(toolInfo);
      }
    }

    // Identify themes (could be in docs, or embedded in tools)
    const docsDir = path.join(BASE_DIR, 'docs');
    if (fs.existsSync(docsDir)) {
      const themeFiles = fs.readdirSync(docsDir)
        .filter(f => f.includes('theme') || f.includes('vision') || f.includes('monad'));
      
      for (const themeFile of themeFiles) {
        components.themes.push({
          name: themeFile,
          path: path.join(docsDir, themeFile),
          type: 'documentation',
        });
      }
    }

    // Identify engines (fractal, sound, game, etc.)
    const enginePatterns = ['fractal', 'sound', 'game', 'engine', 'synthesis', 'synth'];
    components.tools.forEach(tool => {
      if (enginePatterns.some(pattern => tool.name.toLowerCase().includes(pattern))) {
        components.engines.push({
          ...tool,
          engineType: this.identifyEngineType(tool.name),
        });
      }
    });

    // Identify systems (package.json, config files, etc.)
    const systemFiles = [
      'package.json',
      'pnpm-wrapper.mjs',
      'turbo.json',
    ].filter(f => fs.existsSync(path.join(BASE_DIR, f)));

    for (const sysFile of systemFiles) {
      components.systems.push({
        name: sysFile,
        path: path.join(BASE_DIR, sysFile),
        type: 'configuration',
      });
    }

    logger.info(`   ✅ Identified:`);
    logger.info(`      Tools: ${components.tools.length}`);
    logger.info(`      Themes: ${components.themes.length}`);
    logger.info(`      Engines: ${components.engines.length}`);
    logger.info(`      Systems: ${components.systems.length}`);

    this.packages = components;
    return components;
  }

  /**
   * Categorize tool by name and content
   */
  categorizeTool(name, content) {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('vision') || nameLower.includes('codex') || nameLower.includes('weaver')) {
      return 'vision';
    } else if (nameLower.includes('improve') || nameLower.includes('enhance') || nameLower.includes('boost')) {
      return 'improvement';
    } else if (nameLower.includes('align') || nameLower.includes('clean') || nameLower.includes('fix')) {
      return 'maintenance';
    } else if (nameLower.includes('generate') || nameLower.includes('create') || nameLower.includes('extract')) {
      return 'generation';
    } else if (nameLower.includes('validate') || nameLower.includes('check') || nameLower.includes('test')) {
      return 'validation';
    } else if (nameLower.includes('monitor') || nameLower.includes('report') || nameLower.includes('status')) {
      return 'monitoring';
    } else {
      return 'utility';
    }
  }

  /**
   * Extract dependencies from tool content
   */
  extractDependencies(content) {
    const dependencies = [];
    const importRegex = /import\s+.*?\s+from\s+['"](.+?)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const dep = match[1];
      if (!dep.startsWith('.') && !dep.startsWith('/')) {
        dependencies.push(dep);
      }
    }
    
    return dependencies;
  }

  /**
   * Check if tool has Monad Hieroglyphica theme
   */
  checkTheme(content) {
    return {
      hasMonadTheme: content.includes('Monad Hieroglyphica') || 
                    content.includes('monad-hieroglyphica') ||
                    content.includes('MONAD_THEME'),
      hasAlchemy: content.includes('alchemy') || content.includes('solve-et-coagula'),
      hasSacredMath: content.includes('144:99') || content.includes('golden ratio') || content.includes('fibonacci'),
    };
  }

  /**
   * Identify engine type
   */
  identifyEngineType(name) {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('fractal')) return 'fractal';
    if (nameLower.includes('sound') || nameLower.includes('synth') || nameLower.includes('audio')) return 'sound';
    if (nameLower.includes('game')) return 'game';
    if (nameLower.includes('design')) return 'design';
    if (nameLower.includes('render') || nameLower.includes('graphics')) return 'rendering';
    return 'general';
  }

  /**
   * Package a component with Monad Hieroglyphica theme
   */
  async packageComponent(component, packageType) {
    logger.info(`📦 Packaging ${component.name} (${packageType})...`);

    const packageInfo = {
      name: component.name,
      type: packageType,
      timestamp: new Date().toISOString(),
      theme: 'Monad Hieroglyphica',
      alchemicalPrinciples: {
        solve: 'dissolution - breaking down for analysis',
        coagula: 'coagulation - building up for synthesis',
        ratio: '144:99 signature ratio',
        goldenRatio: '1.618...',
        quality: 'museum-grade, aristocratic refinement',
      },
      components: [],
      dependencies: component.dependencies || [],
      metadata: {},
    };

    // Add component files
    if (component.path && fs.existsSync(component.path)) {
      packageInfo.components.push({
        path: component.path,
        type: path.extname(component.path),
        size: fs.statSync(component.path).size,
      });
    }

    // Apply theme if not already applied
    if (component.path && component.theme && !component.theme.hasMonadTheme) {
      await this.themeApplier.applyThemeToFile(component.path);
    }

    // Add metadata
    packageInfo.metadata = {
      category: component.category || 'general',
      engineType: component.engineType || null,
      vision: 'ND joy, esoteric traditions, academic barrier breaking',
      quality: 'museum-grade, aristocratic refinement',
      license: 'CC0-1.0 - Public Domain',
      author: 'Rebecca Respawn',
    };

    return packageInfo;
  }

  /**
   * Create package manifest
   */
  async createPackageManifest() {
    logger.info('📋 Creating package manifest...');

    const manifest = {
      name: 'cathedral-magnum-opus-packages',
      version: '1.0.0',
      description: 'Packaged tools, themes, engines, and systems with Monad Hieroglyphica alchemy theme',
      theme: 'Monad Hieroglyphica',
      alchemicalPrinciples: {
        monad: 'Unity in diversity - one symbol containing all',
        solve: 'Dissolution - breaking down for analysis',
        coagula: 'Coagulation - building up for synthesis',
        ratio: '144:99 signature ratio',
        goldenRatio: '1.618...',
        quality: 'museum-grade, aristocratic refinement',
      },
      packages: {
        tools: [],
        themes: [],
        engines: [],
        systems: [],
      },
      coherence: {
        themeApplied: 0,
        totalComponents: 0,
        score: 0,
      },
      timestamp: new Date().toISOString(),
      author: 'Rebecca Respawn',
      license: 'CC0-1.0 - Public Domain',
    };

    // Package all components
    for (const tool of this.packages.tools) {
      const packaged = await this.packageComponent(tool, 'tool');
      manifest.packages.tools.push(packaged);
      manifest.coherence.totalComponents++;
      if (packaged.components.some(c => c.themeApplied)) {
        manifest.coherence.themeApplied++;
      }
    }

    for (const theme of this.packages.themes) {
      const packaged = await this.packageComponent(theme, 'theme');
      manifest.packages.themes.push(packaged);
      manifest.coherence.totalComponents++;
    }

    for (const engine of this.packages.engines) {
      const packaged = await this.packageComponent(engine, 'engine');
      manifest.packages.engines.push(packaged);
    }

    for (const system of this.packages.systems) {
      const packaged = await this.packageComponent(system, 'system');
      manifest.packages.systems.push(packaged);
      manifest.coherence.totalComponents++;
    }

    // Calculate coherence score
    if (manifest.coherence.totalComponents > 0) {
      manifest.coherence.score = (manifest.coherence.themeApplied / manifest.coherence.totalComponents) * 100;
    }

    // Save manifest
    const manifestPath = path.join(BASE_DIR, 'packages', 'manifest.json');
    const manifestDir = path.dirname(manifestPath);
    
    if (!fs.existsSync(manifestDir)) {
      fs.mkdirSync(manifestDir, { recursive: true });
    }

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    logger.info(`✅ Package manifest created: ${manifestPath}`);

    return manifest;
  }

  /**
   * Package all tools, themes, engines, systems
   */
  async packageAll() {
    logger.info('📦 Packaging Tools, Themes, Engines, and Systems');
    logger.info('   → Applying Monad Hieroglyphica alchemy theme');
    logger.info('   → Ensuring coherence across all components');
    logger.info('   → Maintaining museum-grade quality\n');

    // Identify all components
    await this.identifyComponents();

    // Create package manifest
    const manifest = await this.createPackageManifest();

    logger.info(`\n✅ Packaging complete`);
    logger.info(`   Tools packaged: ${manifest.packages.tools.length}`);
    logger.info(`   Themes packaged: ${manifest.packages.themes.length}`);
    logger.info(`   Engines packaged: ${manifest.packages.engines.length}`);
    logger.info(`   Systems packaged: ${manifest.packages.systems.length}`);
    logger.info(`   Coherence score: ${manifest.coherence.score.toFixed(1)}%`);

    return manifest;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const packager = new ToolPackager();
  
  packager.packageAll()
    .then(manifest => {
      UserFeedback.success(`Packaged ${manifest.packages.tools.length} tools, ${manifest.packages.themes.length} themes, ${manifest.packages.engines.length} engines, ${manifest.packages.systems.length} systems`);
      process.exit(0);
    })
    .catch(error => {
      logger.error(`Error: ${error.message}`);
      process.exit(1);
    });
}

export default ToolPackager;

