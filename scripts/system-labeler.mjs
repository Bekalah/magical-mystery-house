#!/usr/bin/env node
/**
 * System Labeler - Clearly labels all systems, packages, and codex
 * 
 * Creates unique labels and connections without duplicates
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class SystemLabeler {
  constructor() {
    this.systems = new Map();
    this.packages = new Map();
    this.codex = new Map();
    this.labels = new Map();
    this.connections = [];
    this.duplicates = [];
  }

  async run() {
    console.log('🏷️  SYSTEM LABELER - Labeling All Systems, Packages, and Codex\n');
    console.log('═'.repeat(80) + '\n');
    
    this.scanPackages();
    this.scanCodex();
    this.scanSystems();
    this.createLabels();
    this.findDuplicates();
    this.createConnections();
    this.generateReport();
    
    console.log('✅ Labeling complete!\n');
  }

  scanPackages() {
    console.log('📦 Scanning packages...');
    
    const packagesDir = path.join(rootDir, 'packages');
    if (!fs.existsSync(packagesDir)) return;
    
    const entries = fs.readdirSync(packagesDir);
    for (const entry of entries) {
      const pkgPath = path.join(packagesDir, entry);
      if (!fs.statSync(pkgPath).isDirectory()) continue;
      
      const packageJson = path.join(pkgPath, 'package.json');
      if (fs.existsSync(packageJson)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
          const label = this.createPackageLabel(entry, pkg);
          
          this.packages.set(label.id, {
            id: label.id,
            name: label.name,
            label: label.label,
            path: pkgPath,
            packageName: pkg.name || entry,
            version: pkg.version || '1.0.0',
            description: pkg.description || '',
            type: this.detectPackageType(pkgPath, pkg),
            alchemical: label.alchemical,
            element: label.element,
            planet: label.planet,
            metal: label.metal,
            process: label.process,
            principle: label.principle,
            tool: label.tool,
            symbol: label.symbol
          });
        } catch (e) {
          // Ignore
        }
      }
    }
    
    console.log(`   Found ${this.packages.size} packages\n`);
  }

  scanCodex() {
    console.log('📚 Scanning codex...');
    
    const codexDirs = [
      path.join(rootDir, 'codex'),
      path.join(rootDir, 'docs', 'codex-generated'),
      path.join(rootDir, 'codex-reports'),
      path.join(rootDir, 'packages', 'codex-144-99-core')
    ];
    
    for (const codexDir of codexDirs) {
      this.scanCodexDirectory(codexDir);
    }
    
    console.log(`   Found ${this.codex.size} codex files\n`);
  }

  scanCodexDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.')) continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.scanCodexDirectory(fullPath);
        } else if (stat.isFile() && (entry.endsWith('.json') || entry.includes('codex'))) {
          const label = this.createCodexLabel(entry, fullPath);
          
          this.codex.set(label.id, {
            id: label.id,
            name: label.name,
            label: label.label,
            path: fullPath,
            type: entry.endsWith('.json') ? 'codex-json' : 'codex-doc',
            size: stat.size,
            mtime: stat.mtime
          });
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  scanSystems() {
    console.log('🔧 Scanning systems...');
    
    const systems = [
      { name: 'health-monitor', path: 'scripts/monorepo-health-monitor.mjs', type: 'monitoring' },
      { name: 'improvement-experiment', path: 'scripts/run-improvement-experiment.mjs', type: 'automation' },
      { name: 'fusionkink-integrator', path: 'scripts/fusionkink-integrator.mjs', type: 'integration' },
      { name: 'system-connector', path: 'scripts/system-connector.mjs', type: 'integration' },
      { name: 'error-fixer', path: 'scripts/comprehensive-error-fixer.mjs', type: 'quality' },
      { name: 'backup-system', path: 'scripts/comprehensive-backup-system.mjs', type: 'backup' },
      { name: 'security-audit', path: 'scripts/security-audit.mjs', type: 'security' }
    ];
    
    for (const system of systems) {
      const fullPath = path.join(rootDir, system.path);
      if (fs.existsSync(fullPath)) {
        const label = this.createSystemLabel(system.name, system.type);
        
        this.systems.set(label.id, {
          id: label.id,
          name: label.name,
          label: label.label,
          path: fullPath,
          type: system.type,
          category: this.categorizeSystem(system.type)
        });
      }
    }
    
    console.log(`   Found ${this.systems.size} systems\n`);
  }

  createPackageLabel(name, pkg) {
    const cleanName = name.replace(/-core$/, '').replace(/^@cathedral\//, '');
    const id = `pkg:${cleanName}`;
    
    // Get alchemical name
    const alchemical = this.getAlchemicalName(pkg.name || name, this.detectPackageType(path.join(rootDir, 'packages', name), pkg));
    
    // Create hermetic label with symbol
    const label = `[${alchemical.symbol}] ${alchemical.alchemical} | ${pkg.name || name}`;
    
    return { 
      id, 
      name: pkg.name || name, 
      label,
      alchemical: alchemical.alchemical,
      element: alchemical.element,
      planet: alchemical.planet,
      metal: alchemical.metal,
      process: alchemical.process,
      principle: alchemical.principle,
      tool: alchemical.tool,
      symbol: alchemical.symbol
    };
  }

  getAlchemicalName(packageName, type) {
    // Expanded Thematic Name Mapping - Alchemy, Hermetica, Visionary Art, Jung, William James, Timothy Leary, Paracelsus, Neoplatonism, Golden Dawn, Thelema, Mystic Christianity
    
    // Load expanded themes
    const expandedThemes = this.loadExpandedThemes();
    
    // Alchemical/Hermetic Name Mapping
    const ALCHEMICAL_NAMES = {
      // Elements & Engines
      'art-engine': { alchemical: 'Ignis', element: 'Fire', planet: 'Sun', metal: 'Gold', symbol: '☉' },
      'art-standards': { alchemical: 'Ignis Refinatus', element: 'Fire', planet: 'Sun', metal: 'Gold', symbol: '☉' },
      'music-engine': { alchemical: 'Aqua', element: 'Water', planet: 'Moon', metal: 'Silver', symbol: '☽' },
      'science-engine': { alchemical: 'Aer', element: 'Air', planet: 'Mercury', metal: 'Mercury', symbol: '☿' },
      'game-design': { alchemical: 'Terra', element: 'Earth', planet: 'Saturn', metal: 'Lead', symbol: '♄' },
      'game-engine': { alchemical: 'Terra Ludus', element: 'Earth', planet: 'Saturn', metal: 'Lead', symbol: '♄' },
      
      // Games - Expanded Themes
      'circuit-craft-creative-game': { alchemical: 'Eight Circuit Model', theme: 'Timothy Leary', symbol: '⚡' },
      'circuitum99-arcanae-cyoa': { alchemical: 'Individuation', theme: 'Jung', symbol: '🔄' },
      'gem-tower-engine': { alchemical: 'Tree of Life', theme: 'Golden Dawn', symbol: '🌳' },
      'tarot-arena': { alchemical: 'Archetypal Journey', theme: 'Jung', symbol: '🃏' },
      'mystical-treasure-hunt': { alchemical: 'Vision Quest', theme: 'Visionary Art', symbol: '🔍' },
      'stone-grimoire': { alchemical: 'Emerald Tablet', theme: 'Hermetica', symbol: '💎' },
      'liber-arcanae': { alchemical: 'Corpus Hermeticum', theme: 'Hermetica', symbol: '📜' },
      'living-library': { alchemical: 'Bibliotheca Hermetica', theme: 'Hermetica', symbol: '📚' },
      'cosmogenesis-visualizer': { alchemical: 'Emanation', theme: 'Neoplatonism', symbol: '✨' },
      'cathedral-of-circuits': { alchemical: 'The One', theme: 'Neoplatonism', symbol: '⊙' },
      
      // Shaders - Expanded Themes
      'visionary-design': { alchemical: 'Alex Grey', theme: 'Visionary Art', symbol: '🎨' },
      'sacred-geometry': { alchemical: 'Flower of Life', theme: 'Visionary Art', symbol: '◊' },
      'fusion-kink': { alchemical: 'Rebis', theme: 'Alchemy', symbol: '⚥' },
      'tarot-art': { alchemical: 'Archetypal Light', theme: 'Jung', symbol: '🃏' },
      
      // Libraries - Expanded Themes
      'cathedral-design-library': { alchemical: 'Bibliotheca Hermetica', theme: 'Hermetica', symbol: '📚' },
      'cathedral-lightweight-library': { alchemical: 'Ars Magna', theme: 'Alchemy', symbol: '📖' },
      'stone-grimoire-library': { alchemical: 'Tabula Smaragdina', theme: 'Alchemy', symbol: '💎' },
      'liber-arcanae-core': { alchemical: 'Corpus Hermeticum', theme: 'Hermetica', symbol: '📜' },
      'codex-144-99': { alchemical: 'Emerald Tablet', theme: 'Hermetica', symbol: '💎' },
      'unified-codex': { alchemical: 'Monad', theme: 'Neoplatonism', symbol: '⊙' },
      'sacred-mathematics': { alchemical: 'Golden Ratio', theme: 'Visionary Art', symbol: '∞' },
      'design-mathematics': { alchemical: 'Divine Proportion', theme: 'Visionary Art', symbol: '◊' },
      
      // Alchemical Processes
      'error-fixer': { alchemical: 'Solve', process: 'Dissolution', symbol: '▽' },
      'improvement-experiment': { alchemical: 'Coagula', process: 'Coagulation', symbol: '△' },
      'system-connector': { alchemical: 'Coniunctio', process: 'Conjunction', symbol: '⊙' },
      'comprehensive-consolidator': { alchemical: 'Coagula', process: 'Coagulation', symbol: '△' },
      'comprehensive-discovery': { alchemical: 'Separatio', process: 'Separation', symbol: '⚛' },
      
      // Alchemical Principles
      'unified-codex': { alchemical: 'Monad', principle: 'Unity', symbol: '⊙' },
      'codex-144-99': { alchemical: 'Monad Hieroglyphica', principle: 'Unity in Diversity', symbol: '⊙' },
      'tesseract-bridge': { alchemical: 'Tesseract', principle: 'Four-Dimensional Unity', symbol: '⊞' },
      'fusion-kink': { alchemical: 'Rebis', principle: 'Unified Opposites', symbol: '⚥' },
      'circuitum99': { alchemical: 'Circularis', principle: 'Eternal Return', symbol: '○' },
      
      // Tools & Systems
      'health-monitor': { alchemical: 'Speculum', tool: 'Mirror', symbol: '◉' },
      'health-map': { alchemical: 'Mappa Mundi', tool: 'World Map', symbol: '🗺' },
      'backup-system': { alchemical: 'Arca', tool: 'Ark', symbol: '⊡' },
      'debug-system': { alchemical: 'Speculum Veritas', tool: 'Mirror of Truth', symbol: '◉' },
      'liber-arcanae': { alchemical: 'Liber Arcanae', principle: 'Book of Secrets', symbol: '📖' },
      'stone-grimoire': { alchemical: 'Lapis Philosophorum', principle: 'Philosopher\'s Stone', symbol: '🔮' },
      
      // Bridges & Connectors
      'tesseract-bridge-hub': { alchemical: 'Tesseract Centrum', principle: 'Central Unity', symbol: '⊞' },
      'cathedral-integration-bridge': { alchemical: 'Pontifex', principle: 'Bridge Builder', symbol: '🌉' },
      
      // Design & Creation
      'design-library': { alchemical: 'Bibliotheca', tool: 'Library', symbol: '📚' },
      'sacred-mathematics': { alchemical: 'Mathematica Sacra', principle: 'Sacred Math', symbol: '∞' },
      'sacred-geometry': { alchemical: 'Geometria Sacra', principle: 'Sacred Geometry', symbol: '◊' },
    };
    
    const key = (packageName || name)
      .replace(/^@cathedral\//, '')
      .replace(/-core$/, '')
      .replace(/-engine$/, '')
      .toLowerCase();
    
    const mapping = ALCHEMICAL_NAMES[key];
    if (mapping) {
      return {
        alchemical: mapping.alchemical,
        element: mapping.element,
        planet: mapping.planet,
        metal: mapping.metal,
        process: mapping.process,
        principle: mapping.principle,
        tool: mapping.tool,
        symbol: mapping.symbol,
        fullLabel: `${mapping.symbol} ${mapping.alchemical} (${packageName})`
      };
    }
    
    // Default: Generate from name using alchemical principles
    const capitalized = key.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return {
      alchemical: capitalized,
      symbol: '⊙',
      fullLabel: `⊙ ${capitalized} (${packageName})`
    };
  }

  createCodexLabel(name, path) {
    const cleanName = name.replace(/\.json$/, '').replace(/codex-?/gi, '').replace(/[^a-z0-9]/gi, '-');
    const id = `codex:${cleanName}`;
    const label = `[CODEX] ${name}`;
    
    return { id, name, label };
  }

  createSystemLabel(name, type) {
    const id = `sys:${name}`;
    
    // Get alchemical name for system
    const alchemical = this.getAlchemicalName(name, type);
    
    const label = `[${alchemical.symbol}] ${alchemical.alchemical} | ${name} [${type.toUpperCase()}]`;
    
    return { 
      id, 
      name, 
      label,
      alchemical: alchemical.alchemical,
      process: alchemical.process,
      tool: alchemical.tool,
      symbol: alchemical.symbol
    };
  }

  loadExpandedThemes() {
    const themesPath = path.join(rootDir, 'tools', 'expanded-thematic-names.json');
    if (fs.existsSync(themesPath)) {
      try {
        return JSON.parse(fs.readFileSync(themesPath, 'utf8'));
      } catch (e) {
        // Return empty if can't load
      }
    }
    return { themes: {}, mappings: {} };
  }

  detectPackageType(pkgPath, pkg) {
    // Check for Rust
    if (fs.existsSync(path.join(pkgPath, 'Cargo.toml'))) return 'rust';
    
    // Check for Godot
    if (fs.existsSync(path.join(pkgPath, 'project.godot'))) return 'godot';
    
    // Check package.json for clues
    if (pkg.name?.includes('engine')) return 'engine';
    if (pkg.name?.includes('core')) return 'core';
    if (pkg.name?.includes('bridge')) return 'bridge';
    if (pkg.name?.includes('game') || pkgPath.includes('game')) return 'game';
    if (pkg.name?.includes('shader') || pkgPath.includes('shader')) return 'shader';
    if (pkg.name?.includes('library') || pkgPath.includes('library')) return 'library';
    
    return 'library';
  }

  categorizeSystem(type) {
    const categories = {
      monitoring: 'health',
      automation: 'workflow',
      integration: 'connectivity',
      quality: 'development',
      backup: 'data',
      security: 'safety'
    };
    
    return categories[type] || 'utility';
  }

  createLabels() {
    console.log('🏷️  Creating unique labels...\n');
    
    // Create labels for all items
    for (const [id, pkg] of this.packages.entries()) {
      this.labels.set(id, {
        id,
        type: 'package',
        label: pkg.label,
        item: pkg
      });
    }
    
    for (const [id, codex] of this.codex.entries()) {
      this.labels.set(id, {
        id,
        type: 'codex',
        label: codex.label,
        item: codex
      });
    }
    
    for (const [id, system] of this.systems.entries()) {
      this.labels.set(id, {
        id,
        type: 'system',
        label: system.label,
        item: system
      });
    }
    
    console.log(`   Created ${this.labels.size} unique labels\n`);
  }

  findDuplicates() {
    console.log('🔍 Finding duplicates...\n');
    
    const nameMap = new Map();
    
    // Check packages
    for (const [id, pkg] of this.packages.entries()) {
      const key = pkg.packageName.toLowerCase();
      if (!nameMap.has(key)) {
        nameMap.set(key, []);
      }
      nameMap.get(key).push({ id, type: 'package', item: pkg });
    }
    
    // Check codex
    for (const [id, codex] of this.codex.entries()) {
      const key = codex.name.toLowerCase();
      if (!nameMap.has(key)) {
        nameMap.set(key, []);
      }
      nameMap.get(key).push({ id, type: 'codex', item: codex });
    }
    
    // Check systems
    for (const [id, system] of this.systems.entries()) {
      const key = system.name.toLowerCase();
      if (!nameMap.has(key)) {
        nameMap.set(key, []);
      }
      nameMap.get(key).push({ id, type: 'system', item: system });
    }
    
    // Find duplicates
    for (const [name, items] of nameMap.entries()) {
      if (items.length > 1) {
        this.duplicates.push({
          name,
          items,
          count: items.length
        });
      }
    }
    
    console.log(`   Found ${this.duplicates.length} duplicate names\n`);
  }

  createConnections() {
    console.log('🔗 Creating connections...\n');
    
    // Connect packages to codex
    for (const [pkgId, pkg] of this.packages.entries()) {
      if (pkg.packageName.includes('codex')) {
        for (const [codexId, codex] of this.codex.entries()) {
          this.connections.push({
            from: pkgId,
            to: codexId,
            type: 'package-codex',
            strength: 'strong'
          });
        }
      }
    }
    
    // Connect systems to packages
    for (const [sysId, system] of this.systems.entries()) {
      for (const [pkgId, pkg] of this.packages.entries()) {
        if (system.name.includes(pkg.name) || pkg.name.includes(system.name)) {
          this.connections.push({
            from: sysId,
            to: pkgId,
            type: 'system-package',
            strength: 'medium'
          });
        }
      }
    }
    
    console.log(`   Created ${this.connections.length} connections\n`);
  }

  generateReport() {
    console.log('📊 Generating report...\n');
    
    const report = {
      timestamp: Date.now(),
      summary: {
        packages: this.packages.size,
        codex: this.codex.size,
        systems: this.systems.size,
        labels: this.labels.size,
        connections: this.connections.length,
        duplicates: this.duplicates.length
      },
      packages: Array.from(this.packages.values()),
      codex: Array.from(this.codex.values()),
      systems: Array.from(this.systems.values()),
      labels: Array.from(this.labels.values()),
      connections: this.connections,
      duplicates: this.duplicates
    };
    
    // Save JSON
    const jsonPath = path.join(rootDir, 'system-labels.json');
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    console.log(`   ✅ JSON report: ${jsonPath}\n`);
    
    // Generate markdown
    this.generateMarkdown(report);
  }

  generateMarkdown(report) {
    let md = '# 🏷️ System Labels - All Systems, Packages, and Codex\n\n';
    md += `Generated: ${new Date(report.timestamp).toLocaleString()}\n\n`;
    
    md += '## Summary\n\n';
    md += `- **Packages**: ${report.summary.packages}\n`;
    md += `- **Codex**: ${report.summary.codex}\n`;
    md += `- **Systems**: ${report.summary.systems}\n`;
    md += `- **Total Labels**: ${report.summary.labels}\n`;
    md += `- **Connections**: ${report.summary.connections}\n`;
    md += `- **Duplicates Found**: ${report.summary.duplicates}\n\n`;
    
    md += '## Packages\n\n';
    for (const pkg of report.packages) {
      md += `### ${pkg.label}\n\n`;
      md += `- **ID**: \`${pkg.id}\`\n`;
      md += `- **Name**: ${pkg.packageName}\n`;
      md += `- **Type**: ${pkg.type}\n`;
      md += `- **Version**: ${pkg.version}\n`;
      if (pkg.description) {
        md += `- **Description**: ${pkg.description}\n`;
      }
      md += `- **Path**: \`${path.relative(rootDir, pkg.path)}\`\n\n`;
    }
    
    md += '## Codex\n\n';
    const codexByType = {};
    for (const codex of report.codex) {
      if (!codexByType[codex.type]) {
        codexByType[codex.type] = [];
      }
      codexByType[codex.type].push(codex);
    }
    
    for (const [type, items] of Object.entries(codexByType)) {
      md += `### ${type}\n\n`;
      for (const codex of items) {
        md += `- **${codex.label}** (\`${codex.id}\`)\n`;
        md += `  - Path: \`${path.relative(rootDir, codex.path)}\`\n`;
      }
      md += '\n';
    }
    
    md += '## Systems\n\n';
    const systemsByCategory = {};
    for (const system of report.systems) {
      if (!systemsByCategory[system.category]) {
        systemsByCategory[system.category] = [];
      }
      systemsByCategory[system.category].push(system);
    }
    
    for (const [category, items] of Object.entries(systemsByCategory)) {
      md += `### ${category.toUpperCase()}\n\n`;
      for (const system of items) {
        md += `- **${system.label}** (\`${system.id}\`)\n`;
        md += `  - Type: ${system.type}\n`;
        md += `  - Path: \`${path.relative(rootDir, system.path)}\`\n`;
      }
      md += '\n';
    }
    
    md += '## Connections\n\n';
    md += `Total: ${report.connections.length}\n\n`;
    
    const byType = {};
    for (const conn of report.connections) {
      if (!byType[conn.type]) {
        byType[conn.type] = [];
      }
      byType[conn.type].push(conn);
    }
    
    for (const [type, conns] of Object.entries(byType)) {
      md += `### ${type}\n\n`;
      md += `Count: ${conns.length}\n\n`;
    }
    
    if (report.duplicates.length > 0) {
      md += '## Duplicates (Need Resolution)\n\n';
      for (const dup of report.duplicates) {
        md += `### ${dup.name} (${dup.count} instances)\n\n`;
        for (const item of dup.items) {
          md += `- ${item.type}: \`${item.id}\`\n`;
        }
        md += '\n';
      }
    }
    
    const mdPath = path.join(rootDir, 'SYSTEM_LABELS.md');
    fs.writeFileSync(mdPath, md);
    console.log(`   ✅ Markdown report: ${mdPath}\n`);
    
    // Print summary
    this.printSummary(report);
  }

  printSummary(report) {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                      🏷️  LABELING SUMMARY                                  ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📦 PACKAGES:');
    for (const pkg of report.packages.slice(0, 10)) {
      console.log(`   ${pkg.label.padEnd(50)} ${pkg.id}`);
    }
    if (report.packages.length > 10) {
      console.log(`   ... and ${report.packages.length - 10} more`);
    }
    
    console.log(`\n📚 CODEX: ${report.codex.length} files`);
    console.log(`🔧 SYSTEMS: ${report.systems.length} systems`);
    console.log(`🔗 CONNECTIONS: ${report.connections.length}`);
    
    if (report.duplicates.length > 0) {
      console.log(`\n⚠️  DUPLICATES: ${report.duplicates.length} found`);
      for (const dup of report.duplicates.slice(0, 5)) {
        console.log(`   ${dup.name}: ${dup.count} instances`);
      }
    }
    
    console.log('\n' + '═'.repeat(80) + '\n');
  }
}

async function main() {
  const labeler = new SystemLabeler();
  await labeler.run();
}

main().catch(console.error);

