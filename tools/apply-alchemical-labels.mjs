#!/usr/bin/env node
/**
 * Apply Alchemical/Hermetic Labels Across All Files
 * 
 * Connects and updates the alchemical/hermetic label system
 * across all working files and directories
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class AlchemicalLabelApplier {
  constructor() {
    this.updated = [];
    this.errors = [];
  }

  async run() {
    console.log('⚗️  APPLYING ALCHEMICAL/HERMETIC LABELS\n');
    console.log('═'.repeat(80) + '\n');

    // Step 1: Run system labeler
    await this.runSystemLabeler();

    // Step 2: Update package.json files with alchemical labels
    await this.updatePackageFiles();

    // Step 3: Update README files with alchemical labels
    await this.updateReadmeFiles();

    // Step 4: Update code files with alchemical comments
    await this.updateCodeFiles();

    console.log('═'.repeat(80));
    console.log('\n✅ ALCHEMICAL LABEL APPLICATION COMPLETE\n');
    console.log(`📝 Updated: ${this.updated.length} files`);
    if (this.errors.length > 0) {
      console.log(`⚠️  Errors: ${this.errors.length}\n`);
    } else {
      console.log('');
    }
  }

  async runSystemLabeler() {
    console.log('🔮 Step 1: Running system labeler...\n');
    try {
      execSync('node scripts/system-labeler.mjs', {
        cwd: BASE_DIR,
        stdio: 'inherit'
      });
      console.log('   ✅ System labels generated\n');
    } catch (e) {
      console.log(`   ⚠️  System labeler: ${e.message}\n`);
      this.errors.push({ step: 'system-labeler', error: e.message });
    }
  }

  async updatePackageFiles() {
    console.log('📦 Step 2: Updating package.json files with alchemical labels...\n');

    const packageFiles = [];
    this.findFiles('package.json', BASE_DIR, packageFiles, 5);

    for (const pkgFile of packageFiles) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
        const pkgName = pkg.name || path.basename(path.dirname(pkgFile));
        const alchemical = this.getAlchemicalLabel(pkgName);

        // Add alchemical metadata
        if (!pkg.alchemical) {
          pkg.alchemical = {
            name: alchemical.alchemical,
            element: alchemical.element,
            planet: alchemical.planet,
            metal: alchemical.metal,
            symbol: alchemical.symbol,
            label: alchemical.fullLabel
          };

          fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
          this.updated.push(pkgFile);
          console.log(`   ✅ ${path.relative(BASE_DIR, pkgFile)}`);
        }
      } catch (e) {
        this.errors.push({ file: pkgFile, error: e.message });
      }
    }
    console.log('');
  }

  async updateReadmeFiles() {
    console.log('📖 Step 3: Updating README files with alchemical labels...\n');

    const readmeFiles = [];
    this.findFiles('README.md', BASE_DIR, readmeFiles, 5);

    for (const readmeFile of readmeFiles) {
      try {
        let content = fs.readFileSync(readmeFile, 'utf-8');
        const dirName = path.basename(path.dirname(readmeFile));
        const alchemical = this.getAlchemicalLabel(dirName);

        // Add alchemical header if not present
        if (!content.includes('⚗️') && !content.includes('alchemical')) {
          const header = `# ${alchemical.symbol} ${alchemical.alchemical} - ${dirName}\n\n`;
          const metadata = `**Alchemical Correspondence:**\n- Element: ${alchemical.element || 'N/A'}\n- Planet: ${alchemical.planet || 'N/A'}\n- Metal: ${alchemical.metal || 'N/A'}\n- Symbol: ${alchemical.symbol}\n\n---\n\n`;
          
          content = header + metadata + content;
          fs.writeFileSync(readmeFile, content, 'utf-8');
          this.updated.push(readmeFile);
          console.log(`   ✅ ${path.relative(BASE_DIR, readmeFile)}`);
        }
      } catch (e) {
        this.errors.push({ file: readmeFile, error: e.message });
      }
    }
    console.log('');
  }

  async updateCodeFiles() {
    console.log('💻 Step 4: Updating code files with alchemical comments...\n');

    const codeFiles = [];
    this.findFiles(['.ts', '.tsx', '.js', '.jsx'], BASE_DIR, codeFiles, 5);

    for (const codeFile of codeFiles.slice(0, 100)) { // Limit to first 100
      try {
        let content = fs.readFileSync(codeFile, 'utf-8');
        const fileName = path.basename(codeFile, path.extname(codeFile));
        const alchemical = this.getAlchemicalLabel(fileName);

        // Add alchemical header comment if not present
        if (!content.includes('⚗️') && !content.includes('alchemical')) {
          const header = `/**\n * ${alchemical.symbol} ${alchemical.alchemical}\n * \n * @alchemical ${alchemical.alchemical}\n * @element ${alchemical.element || 'N/A'}\n * @symbol ${alchemical.symbol}\n * \n * @license CC0-1.0 - Public Domain\n */\n\n`;
          
          // Find first import or export and insert before it
          const importMatch = content.match(/^(import|export|const|let|var|function|class|interface|type)/m);
          if (importMatch) {
            const insertPos = content.indexOf(importMatch[0]);
            content = content.slice(0, insertPos) + header + content.slice(insertPos);
          } else {
            content = header + content;
          }

          fs.writeFileSync(codeFile, content, 'utf-8');
          this.updated.push(codeFile);
          console.log(`   ✅ ${path.relative(BASE_DIR, codeFile)}`);
        }
      } catch (e) {
        // Skip if can't update
      }
    }
    console.log('');
  }

  findFiles(pattern, dir, results, maxDepth = 5, currentDepth = 0) {
    if (currentDepth >= maxDepth) return;
    if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('dist')) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          this.findFiles(pattern, fullPath, results, maxDepth, currentDepth + 1);
        } else if (entry.isFile()) {
          const patterns = Array.isArray(pattern) ? pattern : [pattern];
          if (patterns.some(p => entry.name === p || entry.name.endsWith(p))) {
            results.push(fullPath);
          }
        }
      }
    } catch (e) {
      // Skip
    }
  }

  getAlchemicalLabel(name) {
    // Import from system-labeler logic
    const cleanName = name
      .replace(/^@cathedral\//, '')
      .replace(/-core$/, '')
      .replace(/-engine$/, '')
      .toLowerCase();

    const ALCHEMICAL_NAMES = {
      'art-engine': { alchemical: 'Ignis', element: 'Fire', planet: 'Sun', metal: 'Gold', symbol: '☉' },
      'music-engine': { alchemical: 'Aqua', element: 'Water', planet: 'Moon', metal: 'Silver', symbol: '☽' },
      'science-engine': { alchemical: 'Aer', element: 'Air', planet: 'Mercury', metal: 'Mercury', symbol: '☿' },
      'game-design': { alchemical: 'Terra', element: 'Earth', planet: 'Saturn', metal: 'Lead', symbol: '♄' },
      'error-fixer': { alchemical: 'Solve', process: 'Dissolution', symbol: '▽' },
      'improvement-experiment': { alchemical: 'Coagula', process: 'Coagulation', symbol: '△' },
      'system-connector': { alchemical: 'Coniunctio', process: 'Conjunction', symbol: '⊙' },
      'unified-codex': { alchemical: 'Monad', principle: 'Unity', symbol: '⊙' },
      'tesseract-bridge': { alchemical: 'Tesseract', principle: 'Four-Dimensional Unity', symbol: '⊞' },
      'fusion-kink': { alchemical: 'Rebis', principle: 'Unified Opposites', symbol: '⚥' },
      'health-monitor': { alchemical: 'Speculum', tool: 'Mirror', symbol: '◉' },
      'backup-system': { alchemical: 'Arca', tool: 'Ark', symbol: '⊡' },
    };

    const mapping = ALCHEMICAL_NAMES[cleanName];
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
        fullLabel: `${mapping.symbol} ${mapping.alchemical} (${name})`
      };
    }

    // Default
    const capitalized = cleanName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return {
      alchemical: capitalized,
      symbol: '⊙',
      fullLabel: `⊙ ${capitalized} (${name})`
    };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const applier = new AlchemicalLabelApplier();
  applier.run().catch(console.error);
}

export default AlchemicalLabelApplier;

