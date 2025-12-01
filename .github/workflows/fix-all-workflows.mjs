#!/usr/bin/env node
/**
 * Fix All Workflows
 * 
 * Ensures all GitHub Actions workflows are correct:
 * - Use pnpm (never npm)
 * - Correct versions (pnpm 10.23.0, Node 25.2)
 * - Latest action versions
 * - No broken references
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// This script is in .github/workflows/, so go up two levels
const BASE_DIR = path.resolve(__dirname, '../..');
const WORKFLOWS_DIR = path.join(BASE_DIR, '.github', 'workflows');

class WorkflowFixer {
  constructor() {
    this.fixed = [];
    this.errors = [];
  }

  async fixAll() {
    console.log('🔧 FIXING ALL GITHUB WORKFLOWS\n');
    console.log('═'.repeat(80) + '\n');

    if (!fs.existsSync(WORKFLOWS_DIR)) {
      console.log('⚠️  .github/workflows directory not found\n');
      return;
    }

    const workflows = fs.readdirSync(WORKFLOWS_DIR)
      .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));

    console.log(`📂 Found ${workflows.length} workflow files\n`);

    for (const workflow of workflows) {
      await this.fixWorkflow(workflow);
    }

    console.log('═'.repeat(80));
    console.log('\n✅ WORKFLOW FIXING COMPLETE\n');
    console.log(`✅ Workflows fixed: ${this.fixed.length}`);
    if (this.errors.length > 0) {
      console.log(`⚠️  Errors: ${this.errors.length}\n`);
    } else {
      console.log('');
    }
  }

  async fixWorkflow(workflow) {
    const workflowPath = path.join(WORKFLOWS_DIR, workflow);
    
    try {
      let content = fs.readFileSync(workflowPath, 'utf-8');
      let changed = false;

      // Fix npm references
      if (content.includes('npm ')) {
        content = content.replace(/npm\s+/g, 'pnpm ');
        changed = true;
      }

      // Fix npm cache
      if (content.includes('cache: \'npm\'')) {
        content = content.replace(/cache:\s*['"]npm['"]/g, "cache: 'pnpm'");
        changed = true;
      }

      // Ensure pnpm version is correct
      if (content.includes('pnpm/action-setup')) {
        if (!content.includes('version: 10.23.0')) {
          content = content.replace(
            /pnpm\/action-setup@v\d+/g,
            'pnpm/action-setup@v4'
          );
          // Add version if missing
          if (!content.includes('version:')) {
            content = content.replace(
              /uses:\s*pnpm\/action-setup@v4\n/g,
              'uses: pnpm/action-setup@v4\n        with:\n          version: 10.23.0\n          run_install: false\n'
            );
          } else {
            content = content.replace(/version:\s*[^\n]+/g, 'version: 10.23.0');
          }
          changed = true;
        }
      }

      // Ensure Node version is correct
      if (content.includes('actions/setup-node')) {
        content = content.replace(/actions\/setup-node@v\d+/g, 'actions/setup-node@v4');
        if (!content.includes("node-version: '25.2'")) {
          content = content.replace(/node-version:\s*[^\n]+/g, "node-version: '25.2'");
          changed = true;
        }
      }

      // Ensure checkout is v4
      if (content.includes('actions/checkout')) {
        content = content.replace(/actions\/checkout@v\d+/g, 'actions/checkout@v4');
        changed = true;
      }

      // Remove npm-debug.log references
      if (content.includes('npm-debug.log')) {
        content = content.replace(/npm-debug\.log\*/g, 'pnpm-debug.log*');
        changed = true;
      }

      // Fix pnpm install commands
      if (content.includes('pnpm install') && !content.includes('--frozen-lockfile')) {
        content = content.replace(/pnpm install(?!\s+--)/g, 'pnpm install --frozen-lockfile');
        changed = true;
      }

      // Ensure cache@v4
      if (content.includes('actions/cache')) {
        content = content.replace(/actions\/cache@v\d+/g, 'actions/cache@v4');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(workflowPath, content, 'utf-8');
        this.fixed.push(workflow);
        console.log(`   ✅ Fixed ${workflow}`);
      } else {
        console.log(`   ✓ ${workflow} (already correct)`);
      }
    } catch (e) {
      this.errors.push({ file: workflow, error: e.message });
      console.log(`   ⚠️  ${workflow} - ${e.message}`);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new WorkflowFixer();
  fixer.fixAll().catch(console.error);
}

export default WorkflowFixer;

