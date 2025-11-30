#!/usr/bin/env node
/**
 * Fix npm References
 * 
 * Removes all npm references and replaces with pnpm
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

class NpmReferenceFixer {
  constructor() {
    this.fixed = [];
    this.errors = [];
  }

  async fixAll() {
    console.log('🔧 FIXING NPM REFERENCES\n');
    console.log('═'.repeat(80) + '\n');

    // Find all files with npm references
    const files = this.findFilesWithNpm();
    console.log(`📂 Found ${files.length} files with npm references\n`);

    for (const file of files) {
      await this.fixFile(file);
    }

    // Remove package-lock.json files
    this.removePackageLockFiles();

    console.log('═'.repeat(80));
    console.log('\n✅ NPM REFERENCE FIXING COMPLETE\n');
    console.log(`✅ Files fixed: ${this.fixed.length}`);
    if (this.errors.length > 0) {
      console.log(`⚠️  Errors: ${this.errors.length}\n`);
    } else {
      console.log('');
    }
  }

  findFilesWithNpm() {
    const files = [];
    const dirs = [
      path.join(BASE_DIR, 'packages'),
      path.join(BASE_DIR, 'tools'),
      path.join(BASE_DIR, 'scripts'),
      path.join(BASE_DIR, '.github')
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      
      try {
        const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
        for (const entry of entries) {
          if (entry.isFile() && (
            entry.name.endsWith('.json') ||
            entry.name.endsWith('.md') ||
            entry.name.endsWith('.mjs') ||
            entry.name.endsWith('.ts') ||
            entry.name.endsWith('.js') ||
            entry.name.endsWith('.yml') ||
            entry.name.endsWith('.yaml')
          )) {
            const filePath = path.join(entry.path, entry.name);
            try {
              const content = fs.readFileSync(filePath, 'utf-8');
              if (content.includes('npm ') || content.includes('npm,') || content.includes('npm.') || 
                  content.includes('npm install') || content.includes('npm run') || 
                  content.includes('npm ci') || content.includes('npm audit') ||
                  content.includes('package-lock.json') || content.includes('npm@')) {
                files.push(filePath);
              }
            } catch (e) {
              // Skip if can't read
            }
          }
        }
      } catch (e) {
        // Skip if can't read dir
      }
    }

    return files;
  }

  async fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      let changed = false;

      // Replace npm commands with pnpm
      const replacements = [
        [/npm install/g, 'pnpm install'],
        [/npm run/g, 'pnpm run'],
        [/npm ci/g, 'pnpm install --frozen-lockfile'],
        [/npm audit/g, 'pnpm audit'],
        [/npm publish/g, 'pnpm publish'],
        [/npm link/g, 'pnpm link'],
        [/npm uninstall/g, 'pnpm remove'],
        [/npm update/g, 'pnpm update'],
        [/npm@/g, 'pnpm@'],
        [/package-lock\.json/g, 'pnpm-lock.yaml'],
        [/npm /g, 'pnpm '],
        [/npm,/g, 'pnpm,'],
        [/npm\./g, 'pnpm.'],
        [/use npm/g, 'use pnpm'],
        [/using npm/g, 'using pnpm'],
        [/via npm/g, 'via pnpm'],
        [/with npm/g, 'with pnpm']
      ];

      for (const [pattern, replacement] of replacements) {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        this.fixed.push(filePath);
        console.log(`   ✅ ${path.relative(BASE_DIR, filePath)}`);
      }
    } catch (e) {
      this.errors.push({ file: filePath, error: e.message });
      console.log(`   ⚠️  ${path.relative(BASE_DIR, filePath)} - ${e.message}`);
    }
  }

  removePackageLockFiles() {
    console.log('\n🗑️  Removing package-lock.json files...\n');
    
    try {
      const result = execSync('find . -name "package-lock.json" -type f', {
        cwd: BASE_DIR,
        encoding: 'utf-8'
      });
      
      const files = result.trim().split('\n').filter(f => f);
      
      for (const file of files) {
        try {
          fs.unlinkSync(file);
          console.log(`   ✅ Removed ${path.relative(BASE_DIR, file)}`);
        } catch (e) {
          console.log(`   ⚠️  Could not remove ${path.relative(BASE_DIR, file)}`);
        }
      }
    } catch (e) {
      // No package-lock.json files found
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new NpmReferenceFixer();
  fixer.fixAll().catch(console.error);
}

export default NpmReferenceFixer;

