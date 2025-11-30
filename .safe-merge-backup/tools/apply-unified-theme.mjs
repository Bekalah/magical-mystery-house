#!/usr/bin/env node
/**
 * Apply Unified Professional Theme
 * 
 * Applies high-end, portfolio-quality design standards across:
 * - Games
 * - Design Mathematics
 * - FusionKink
 * - Books/Grimoires
 * - All Tools
 * - All Systems
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class ApplyUnifiedTheme {
  constructor() {
    this.updated = [];
    this.errors = [];
  }

  async run() {
    console.log('🎨 APPLYING UNIFIED PROFESSIONAL THEME\n');
    console.log('═'.repeat(80) + '\n');

    // Find all component files
    const components = await this.findComponents();
    console.log(`📂 Found ${components.length} components to update\n`);

    // Apply theme to each
    for (const component of components) {
      await this.applyTheme(component);
    }

    // Update CSS files
    await this.updateCSSFiles();

    // Update package.json files
    await this.updatePackageFiles();

    console.log('═'.repeat(80));
    console.log('\n✅ THEME APPLICATION COMPLETE\n');
    console.log(`📝 Updated: ${this.updated.length} files`);
    if (this.errors.length > 0) {
      console.log(`⚠️  Errors: ${this.errors.length}\n`);
    } else {
      console.log('');
    }
  }

  async findComponents() {
    const components = [];
    const searchDirs = [
      path.join(BASE_DIR, 'packages'),
      path.join(BASE_DIR, 'apps'),
      path.join(BASE_DIR, 'tools'),
      path.join(BASE_DIR, 'scripts')
    ];

    for (const dir of searchDirs) {
      if (fs.existsSync(dir)) {
        this.searchDirectory(dir, components);
      }
    }

    return components;
  }

  searchDirectory(dir, components, depth = 0) {
    if (depth > 5) return;
    if (dir.includes('node_modules') || dir.includes('dist')) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          this.searchDirectory(fullPath, components, depth + 1);
        } else if (entry.isFile() && 
                   (entry.name.endsWith('.tsx') || 
                    entry.name.endsWith('.ts') ||
                    entry.name.endsWith('.jsx') ||
                    entry.name.endsWith('.js'))) {
          // Check if it's a component file
          if (this.isComponentFile(fullPath)) {
            components.push(fullPath);
          }
        }
      }
    } catch (e) {
      // Skip
    }
  }

  isComponentFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.includes('React') || 
           content.includes('Component') ||
           content.includes('export') ||
           filePath.includes('component') ||
           filePath.includes('Component');
  }

  async applyTheme(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const original = content;

      // Add theme import if not present
      if (!content.includes('unified-professional-theme') && 
          !content.includes('unified-professional.css')) {
        // Determine if it's a React component or regular JS
        if (content.includes('import React') || content.includes('from \'react\'')) {
          // React component - add CSS import
          const importMatch = content.match(/^import .* from ['"]react['"];?/m);
          if (importMatch) {
            content = content.replace(
              importMatch[0],
              `${importMatch[0]}\nimport '@cathedral/shared/src/styles/unified-professional.css';`
            );
          }
        }
      }

      // Add theme application if component
      if (content.includes('className') || content.includes('style=')) {
        // Ensure professional classes are used
        content = content.replace(
          /className=["']([^"']*)["']/g,
          (match, classes) => {
            if (!classes.includes('professional') && !classes.includes('sophisticated')) {
              return `className="${classes} professional-theme"`;
            }
            return match;
          }
        );
      }

      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        this.updated.push(filePath);
        console.log(`   ✅ ${path.relative(BASE_DIR, filePath)}`);
      }
    } catch (e) {
      this.errors.push({ file: filePath, error: e.message });
    }
  }

  async updateCSSFiles() {
    const cssFiles = [
      path.join(BASE_DIR, 'packages', 'shared', 'alchemy-engine.css'),
      path.join(BASE_DIR, 'packages', 'shared', 'assets', 'css', 'couture.css'),
      path.join(BASE_DIR, 'apps', 'frontend', 'src', 'App.css'),
      path.join(BASE_DIR, 'apps', 'frontend', 'src', 'index.css'),
    ];

    for (const cssFile of cssFiles) {
      if (fs.existsSync(cssFile)) {
        try {
          let content = fs.readFileSync(cssFile, 'utf-8');
          
          // Add theme import if not present
          if (!content.includes('unified-professional.css')) {
            content = `@import '@cathedral/shared/src/styles/unified-professional.css';\n\n${content}`;
            fs.writeFileSync(cssFile, content, 'utf-8');
            this.updated.push(cssFile);
            console.log(`   ✅ CSS: ${path.relative(BASE_DIR, cssFile)}`);
          }
        } catch (e) {
          this.errors.push({ file: cssFile, error: e.message });
        }
      }
    }
  }

  async updatePackageFiles() {
    // Update package.json to include theme in dependencies
    const packageJsonPath = path.join(BASE_DIR, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        
        // Add theme script if not present
        if (!pkg.scripts['theme:apply']) {
          pkg.scripts['theme:apply'] = 'node tools/apply-unified-theme.mjs';
          fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
          this.updated.push(packageJsonPath);
          console.log(`   ✅ package.json updated`);
        }
      } catch (e) {
        // Skip
      }
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const applier = new ApplyUnifiedTheme();
  applier.run().catch(console.error);
}

export default ApplyUnifiedTheme;

