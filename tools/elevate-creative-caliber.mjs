#!/usr/bin/env node
/**
 * Elevate Creative Caliber - Le Guin & Brom Level
 * 
 * Transforms all code, documentation, and design to the highest
 * creative caliber: literary depth, philosophical rigor, artistic beauty.
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class CreativeCaliberElevator {
  constructor() {
    this.updated = [];
    this.errors = [];
    this.standards = this.loadStandards();
  }

  loadStandards() {
    const standardsPath = path.join(BASE_DIR, 'docs', 'CREATIVE_CALIBER_STANDARDS.md');
    if (fs.existsSync(standardsPath)) {
      return fs.readFileSync(standardsPath, 'utf-8');
    }
    return null;
  }

  async elevateAll() {
    console.log('⚗️  ELEVATING CREATIVE CALIBER TO LE GUIN & BROM LEVEL\n');
    console.log('═'.repeat(80) + '\n');

    // Step 1: Elevate package READMEs
    await this.elevateReadmes();

    // Step 2: Elevate code comments
    await this.elevateCodeComments();

    // Step 3: Elevate error messages
    await this.elevateErrorMessages();

    // Step 4: Elevate documentation
    await this.elevateDocumentation();

    console.log('═'.repeat(80));
    console.log('\n✅ CREATIVE CALIBER ELEVATION COMPLETE\n');
    console.log(`📝 Elevated: ${this.updated.length} files`);
    if (this.errors.length > 0) {
      console.log(`⚠️  Errors: ${this.errors.length}\n`);
    } else {
      console.log('');
    }
  }

  async elevateReadmes() {
    console.log('📚 Step 1: Elevating READMEs to literary quality...\n');

    const packagesDir = path.join(BASE_DIR, 'packages');
    if (!fs.existsSync(packagesDir)) return;

    const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    for (const pkg of packages) {
      const readmePath = path.join(packagesDir, pkg, 'README.md');
      if (!fs.existsSync(readmePath)) continue;

      try {
        const content = fs.readFileSync(readmePath, 'utf-8');
        const elevated = this.elevateReadmeContent(content, pkg);
        
        if (elevated !== content) {
          fs.writeFileSync(readmePath, elevated, 'utf-8');
          this.updated.push(readmePath);
          console.log(`   ✅ ${pkg}/README.md`);
        }
      } catch (e) {
        this.errors.push({ file: readmePath, error: e.message });
      }
    }
    console.log('');
  }

  elevateReadmeContent(content, packageName) {
    // Check if already elevated (has literary quality)
    if (content.includes('⚗️') && content.includes('alchemical tradition')) {
      return content; // Already elevated
    }

    // Extract package info
    const pkgJsonPath = path.join(BASE_DIR, 'packages', packageName, 'package.json');
    let description = '';
    let alchemical = {};

    if (fs.existsSync(pkgJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
        description = pkg.description || '';
        alchemical = pkg.alchemical || {};
      } catch (e) {
        // Skip if can't read
      }
    }

    // Create elevated introduction
    const elevatedIntro = this.createLiteraryIntroduction(packageName, description, alchemical);

    // Replace or prepend to existing content
    if (content.startsWith('# ')) {
      // Replace first heading with elevated version
      const lines = content.split('\n');
      const firstHeadingEnd = lines.findIndex((line, i) => i > 0 && line.trim() === '');
      if (firstHeadingEnd > 0) {
        return elevatedIntro + '\n\n' + lines.slice(firstHeadingEnd + 1).join('\n');
      }
      return elevatedIntro + '\n\n' + content;
    }

    return elevatedIntro + '\n\n' + content;
  }

  createLiteraryIntroduction(packageName, description, alchemical) {
    const cleanName = packageName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const symbol = alchemical.symbol || '⊙';
    const alchemicalName = alchemical.name || cleanName;

    return `# ${symbol} ${alchemicalName} - ${packageName}

**Alchemical Correspondence:**
- Element: ${this.getAlchemicalElement(packageName)}
- Planet: ${this.getAlchemicalPlanet(packageName)}
- Metal: ${this.getAlchemicalMetal(packageName)}
- Symbol: ${symbol}

---

# ${symbol} ${alchemicalName}

In the alchemical tradition, this system serves as a crucible where mathematics, 
sacred geometry, and creative consciousness converge to manifest visionary works.

Like the philosopher's stone transforming base metals to gold, this system 
transforms raw data and mathematical principles into art that speaks to the 
deepest layers of human experience.

${description ? `\n**Purpose**: ${description}\n` : ''}

**Process**: Solve et Coagula (Dissolution and Coagulation)  
**Ratio**: 144:99 (Sacred Cathedral Proportion)  
**Principle**: ${this.getAlchemicalPrinciple(packageName)}`;
  }

  getAlchemicalElement(packageName) {
    if (packageName.includes('art') || packageName.includes('fire')) return 'Fire';
    if (packageName.includes('music') || packageName.includes('water')) return 'Water';
    if (packageName.includes('science') || packageName.includes('air')) return 'Air';
    if (packageName.includes('game') || packageName.includes('earth')) return 'Earth';
    return 'Aether';
  }

  getAlchemicalPlanet(packageName) {
    if (packageName.includes('art')) return 'Sun';
    if (packageName.includes('music')) return 'Moon';
    if (packageName.includes('science')) return 'Mercury';
    if (packageName.includes('game')) return 'Saturn';
    return 'Jupiter';
  }

  getAlchemicalMetal(packageName) {
    if (packageName.includes('art')) return 'Gold';
    if (packageName.includes('music')) return 'Silver';
    if (packageName.includes('science')) return 'Mercury';
    if (packageName.includes('game')) return 'Lead';
    return 'Copper';
  }

  getAlchemicalPrinciple(packageName) {
    if (packageName.includes('unified') || packageName.includes('codex')) return 'Unity (Monad)';
    if (packageName.includes('bridge') || packageName.includes('connector')) return 'Conjunction (Coniunctio)';
    if (packageName.includes('transform') || packageName.includes('fusion')) return 'Transformation (Rebis)';
    return 'Creative Expression';
  }

  async elevateCodeComments() {
    console.log('💻 Step 2: Elevating code comments to poetic precision...\n');

    const packagesDir = path.join(BASE_DIR, 'packages');
    if (!fs.existsSync(packagesDir)) return;

    const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    let elevatedCount = 0;

    for (const pkg of packages) {
      const srcDir = path.join(packagesDir, pkg, 'src');
      if (!fs.existsSync(srcDir)) continue;

      const tsFiles = this.findTypeScriptFiles(srcDir);
      
      for (const filePath of tsFiles) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const elevated = this.elevateCodeFile(content, pkg);
          
          if (elevated !== content) {
            fs.writeFileSync(filePath, elevated, 'utf-8');
            this.updated.push(filePath);
            elevatedCount++;
          }
        } catch (e) {
          this.errors.push({ file: filePath, error: e.message });
        }
      }
    }

    console.log(`   ✅ Elevated ${elevatedCount} code files\n`);
  }

  findTypeScriptFiles(dir) {
    const files = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...this.findTypeScriptFiles(fullPath));
        } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
          files.push(fullPath);
        }
      }
    } catch (e) {
      // Skip if can't read
    }
    return files;
  }

  elevateCodeFile(content, packageName) {
    // Check if already elevated
    if (content.includes('⚗️') && content.includes('alchemical tradition')) {
      return content;
    }

    // Elevate class/function comments
    const lines = content.split('\n');
    const elevated = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      // Check for class/function declarations
      if (line.match(/^(export\s+)?(class|function|interface|type)\s+\w+/)) {
        // Look for existing comment above
        if (i > 0 && lines[i - 1].trim().startsWith('/**')) {
          // Already has comment, skip
          elevated.push(line);
          i++;
          continue;
        }

        // Add elevated comment
        const name = line.match(/(?:class|function|interface|type)\s+(\w+)/)?.[1] || 'Unknown';
        const elevatedComment = this.createCodeComment(name, packageName, line.includes('class') ? 'class' : line.includes('function') ? 'function' : 'type');
        
        elevated.push(elevatedComment);
        elevated.push(line);
        i++;
      } else {
        elevated.push(line);
        i++;
      }
    }

    return elevated.join('\n');
  }

  createCodeComment(name, packageName, type) {
    const element = this.getAlchemicalElement(packageName);
    const process = type === 'function' ? 'Solve et Coagula' : type === 'class' ? 'The Crucible' : 'The Principle';
    
    return `/**
 * ⚗️ ${this.capitalizeFirst(name)} - ${process}
 * 
 * In the alchemical tradition, this ${type} serves as a vessel where
 * ${element.toLowerCase()} energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this ${type}
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: ${element}
 * **Process**: ${process}
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */`;
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async elevateErrorMessages() {
    console.log('⚠️  Step 3: Elevating error messages to beautiful guidance...\n');

    const packagesDir = path.join(BASE_DIR, 'packages');
    if (!fs.existsSync(packagesDir)) return;

    const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    let elevatedCount = 0;

    for (const pkg of packages) {
      const srcDir = path.join(packagesDir, pkg, 'src');
      if (!fs.existsSync(srcDir)) continue;

      const tsFiles = this.findTypeScriptFiles(srcDir);
      
      for (const filePath of tsFiles) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const elevated = this.elevateErrorMessagesInFile(content);
          
          if (elevated !== content) {
            fs.writeFileSync(filePath, elevated, 'utf-8');
            this.updated.push(filePath);
            elevatedCount++;
          }
        } catch (e) {
          this.errors.push({ file: filePath, error: e.message });
        }
      }
    }

    console.log(`   ✅ Elevated ${elevatedCount} files with beautiful error messages\n`);
  }

  elevateErrorMessagesInFile(content) {
    // Replace common error patterns with beautiful messages
    let elevated = content;

    // throw new Error('...')
    elevated = elevated.replace(
      /throw new Error\(['"]([^'"]+)['"]\)/g,
      (match, message) => {
        if (message.includes('⚗️') || message.includes('alchemical')) {
          return match; // Already elevated
        }
        return `throw new Error(\`⚗️ ${this.beautifyErrorMessage(message)}\`)`;
      }
    );

    // console.error('...')
    elevated = elevated.replace(
      /console\.error\(['"]([^'"]+)['"]\)/g,
      (match, message) => {
        if (message.includes('⚗️') || message.includes('alchemical')) {
          return match; // Already elevated
        }
        return `console.error(\`⚗️ ${this.beautifyErrorMessage(message)}\`)`;
      }
    );

    return elevated;
  }

  beautifyErrorMessage(original) {
    const lower = original.toLowerCase();
    
    if (lower.includes('not found') || lower.includes('missing')) {
      return `The path you seek has not yet been revealed.\n\nThe grimoire you requested exists in the realm of possibility, but has not yet been manifested in this dimension.\n\nPerhaps the path needs to be created first, or perhaps you seek something that exists by another name.`;
    }
    
    if (lower.includes('failed') || lower.includes('error')) {
      return `The alchemical process encountered an unexpected transformation.\n\nThe elements did not combine as anticipated, and the philosopher's stone\nremains elusive. The crucible awaits your guidance to continue the work.`;
    }
    
    if (lower.includes('invalid') || lower.includes('wrong')) {
      return `The formula you have provided does not align with the sacred mathematics.\n\nLike a misaligned constellation, the elements cannot find their harmony.\n\nPlease consult the grimoire and ensure your invocation follows the 144:99 ratio.`;
    }
    
    if (lower.includes('timeout') || lower.includes('time')) {
      return `The transformation requires more time than the crucible can sustain.\n\nLike a slow-burning fire, some processes need patience to reveal their gold.\n\nConsider breaking the work into smaller alchemical operations.`;
    }
    
    // Default beautiful message
    return `An unexpected transformation occurred in the alchemical process.\n\nThe elements did not combine as anticipated. Please consult the grimoire\nand ensure all correspondences are properly aligned.`;
  }

  async elevateDocumentation() {
    console.log('📖 Step 4: Elevating documentation to grimoire quality...\n');

    const docsDir = path.join(BASE_DIR, 'docs');
    if (!fs.existsSync(docsDir)) return;

    const docFiles = this.findMarkdownFiles(docsDir);
    let elevatedCount = 0;

    for (const filePath of docFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Skip if already elevated or is the standards doc itself
        if (content.includes('⚗️') && content.includes('alchemical tradition')) {
          continue;
        }
        if (filePath.includes('CREATIVE_CALIBER_STANDARDS')) {
          continue;
        }

        const elevated = this.elevateDocumentationFile(content, path.basename(filePath));
        
        if (elevated !== content) {
          fs.writeFileSync(filePath, elevated, 'utf-8');
          this.updated.push(filePath);
          elevatedCount++;
        }
      } catch (e) {
        this.errors.push({ file: filePath, error: e.message });
      }
    }

    console.log(`   ✅ Elevated ${elevatedCount} documentation files\n`);
  }

  findMarkdownFiles(dir) {
    const files = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...this.findMarkdownFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          files.push(fullPath);
        }
      }
    } catch (e) {
      // Skip if can't read
    }
    return files;
  }

  elevateDocumentationFile(content, fileName) {
    // Add grimoire-style header if missing
    if (!content.includes('⚗️') && !content.includes('alchemical tradition')) {
      const title = fileName.replace(/\.md$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      const header = `# ⚗️ ${title}

**In the alchemical tradition, this grimoire contains the sacred knowledge**
**and principles that guide the transformation of base materials into gold.**

---

`;

      // Insert after first heading if exists, otherwise prepend
      if (content.startsWith('# ')) {
        const lines = content.split('\n');
        const firstHeadingEnd = lines.findIndex((line, i) => i > 0 && line.trim() === '');
        if (firstHeadingEnd > 0) {
          return lines.slice(0, firstHeadingEnd + 1).join('\n') + '\n\n' + header + lines.slice(firstHeadingEnd + 1).join('\n');
        }
      }
      
      return header + content;
    }

    return content;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const elevator = new CreativeCaliberElevator();
  elevator.elevateAll().catch(console.error);
}

export default CreativeCaliberElevator;

