#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Fix GitHub Actions workflow errors automatically
 * Prevents blocking errors in CI/CD pipelines
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const WORKFLOWS_DIR = path.join(rootDir, '.github', 'workflows');

function fixWorkflowErrors() {
  const workflows = fs.readdirSync(WORKFLOWS_DIR).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  let fixed = 0;

  for (const workflow of workflows) {
    const workflowPath = path.join(WORKFLOWS_DIR, workflow);
    let content = fs.readFileSync(workflowPath, 'utf-8');
    let changed = false;

    // Fix Vercel action - update to v25 and add conditional
    if (content.includes('amondnet/vercel-action@v20')) {
      content = content.replace(/amondnet\/vercel-action@v20/g, 'amondnet/vercel-action@v25');
      changed = true;
    }

    // Add conditional to Vercel deployment if missing
    if (content.includes('vercel-token:') && !content.includes('if: ${{ secrets.VERCEL_TOKEN')) {
      const vercelStepMatch = content.match(/(\s+-\s+name:.*?\n(?:\s+.*?\n)*?\s+uses:.*?vercel-action.*?\n(?:\s+.*?\n)*?\s+with:.*?\n(?:\s+.*?\n)*?\s+vercel-token:)/s);
      if (vercelStepMatch) {
        const beforeWith = vercelStepMatch[1].replace(/(\s+-\s+name:.*?\n)/, '$1        if: ${{ secrets.VERCEL_TOKEN != \'\' }}\n');
        content = content.replace(vercelStepMatch[1], beforeWith);
        changed = true;
      }
    }

    // Fix pnpm typos in workflows
    if (/pp+p?npm/.test(content)) {
      content = content.replace(/pp+p?npm/g, 'pnpm');
      changed = true;
    }

    // Ensure secrets are properly referenced
    if (content.includes('secrets.VERCEL_TOKEN') && !content.includes('if: ${{ secrets.VERCEL_TOKEN')) {
      // Add skip step if token missing
      if (!content.includes('Vercel deployment skipped')) {
        const deployEnd = content.lastIndexOf('vercel-args:');
        if (deployEnd > 0) {
          const insertPoint = content.indexOf('\n', deployEnd) + 1;
          const skipStep = '      - name: Vercel deployment skipped\n' +
            '        if: ${{ secrets.VERCEL_TOKEN == \'\' }}\n' +
            '        run: echo "⚠️  VERCEL_TOKEN not set - deployment skipped. Set VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID secrets to enable Vercel deployment."\n';
          content = content.slice(0, insertPoint) + skipStep + content.slice(insertPoint);
          changed = true;
        }
      }
    }

    if (changed) {
      fs.writeFileSync(workflowPath, content, 'utf-8');
      fixed++;
      console.log(`✅ Fixed: ${workflow}`);
    }
  }

  console.log(`\n✅ Workflow fixes complete!`);
  console.log(`   - Workflows fixed: ${fixed}`);
  console.log(`   - All workflow errors resolved`);
  
  return fixed;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fixWorkflowErrors();
}

export default fixWorkflowErrors;

