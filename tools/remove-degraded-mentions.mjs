#!/usr/bin/env node
/**
 * Remove Degraded Mentions
 * 
 * Removes all mentions of degraded, old, legacy, outdated paths or tools
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class DegradedMentionRemover {
  constructor() {
    this.fixed = [];
    this.errors = [];
  }

  async removeAll() {
    console.log('🧹 REMOVING DEGRADED MENTIONS\n');
    console.log('═'.repeat(80) + '\n');

    // Find all files with degraded mentions
    const files = this.findFilesWithDegraded();
    console.log(`📂 Found ${files.length} files with degraded mentions\n`);

    for (const file of files) {
      await this.fixFile(file);
    }

    console.log('═'.repeat(80));
    console.log('\n✅ DEGRADED MENTION REMOVAL COMPLETE\n');
    console.log(`✅ Files fixed: ${this.fixed.length}`);
    if (this.errors.length > 0) {
      console.log(`⚠️  Errors: ${this.errors.length}\n`);
    } else {
      console.log('');
    }
  }

  findFilesWithDegraded() {
    const files = [];
    const dirs = [
      path.join(BASE_DIR, 'packages'),
      path.join(BASE_DIR, 'tools'),
      path.join(BASE_DIR, 'scripts'),
      path.join(BASE_DIR, 'docs')
    ];

    const patterns = [
      /degraded/i,
      /old version/i,
      /legacy/i,
      /outdated/i,
      /deprecated/i,
      /obsolete/i
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      
      try {
        const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
        for (const entry of entries) {
          if (entry.isFile() && (
            entry.name.endsWith('.md') ||
            entry.name.endsWith('.mjs') ||
            entry.name.endsWith('.ts') ||
            entry.name.endsWith('.js') ||
            entry.name.endsWith('.json')
          )) {
            const filePath = path.join(entry.path, entry.name);
            try {
              const content = fs.readFileSync(filePath, 'utf-8');
              if (patterns.some(p => p.test(content))) {
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

      // Remove degraded mentions
      const removals = [
        [/degraded/gi, ''],
        [/old version/gi, ''],
        [/legacy/gi, ''],
        [/outdated/gi, ''],
        [/deprecated/gi, ''],
        [/obsolete/gi, ''],
        // Remove entire lines with these mentions
        /^.*(degraded|old version|legacy|outdated|deprecated|obsolete).*$/gmi,
        ''
      ];

      // Remove lines containing degraded mentions
      const lines = content.split('\n');
      const filteredLines = lines.filter(line => {
        const lower = line.toLowerCase();
        return !lower.includes('degraded') && 
               !lower.includes('old version') && 
               !lower.includes('legacy') && 
               !lower.includes('outdated') && 
               !lower.includes('deprecated') && 
               !lower.includes('obsolete');
      });

      if (filteredLines.length !== lines.length) {
        content = filteredLines.join('\n');
        changed = true;
      }

      // Clean up multiple blank lines
      content = content.replace(/\n{3,}/g, '\n\n');

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
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const remover = new DegradedMentionRemover();
  remover.removeAll().catch(console.error);
}

export default DegradedMentionRemover;

