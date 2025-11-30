/**
 * Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational
 */
/**
 * ND joy: Central to all tools - honors neurodivergent creative expression
 */
/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Create a comprehensive reference map showing old → new paths
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const PATH_MAPPINGS = {
  'docs/status/experiment.md': 'docs/status/experiment.md',
  'docs/status/workspace-integration.md': 'docs/status/workspace-integration.md',
  'docs/improvements/complete.md': 'docs/improvements/complete.md',
  'docs/improvements/focus.md': 'docs/improvements/focus.md',
  'docs/integration/checklist.md': 'docs/integration/checklist.md',
  'docs/integration/fixes.md': 'docs/integration/fixes.md',
  'docs/integration/extraction.md': 'docs/integration/extraction.md',
  'docs/github/fix-summary.md': 'docs/github/fix-summary.md',
  'docs/github/workflow-fix.md': 'docs/github/workflow-fix.md',
  'docs/github/troubleshooting.md': 'docs/github/troubleshooting.md',
  'docs/cleanup/complete.md': 'docs/cleanup/complete.md',
  'docs/rebranding/magnum-opus.md': 'docs/rebranding/magnum-opus.md',
  'docs/info/main-repo.md': 'docs/info/main-repo.md',
  'docs/info/repository-structure.md': 'docs/info/repository-structure.md',
  'docs/info/inventory-summary.md': 'docs/info/inventory-summary.md',
  'docs/info/system-inventory.md': 'docs/info/system-inventory.md',
  'docs/guides/how-to-run.md': 'docs/guides/how-to-run.md',
  'docs/guides/run-integration.md': 'docs/guides/run-integration.md',
  'docs/guides/experiment.md': 'docs/guides/experiment.md',
  'docs/guides/fix-and-integration-plan.md': 'docs/guides/fix-and-integration-plan.md'
};

function createReferenceMap() {
  let output = '# 📋 File Reference Map - Old → New Locations\n\n';
  output += '**Generated**: ' + new Date().toISOString() + '\n\n';
  output += 'This document maps all old file locations to their new consolidated locations.\n\n';
  output += '---\n\n';
  
  // Group by category
  const categories = {
    'Status Reports': ['docs/status/experiment.md', 'docs/status/workspace-integration.md'],
    'Improvements': ['docs/improvements/complete.md', 'docs/improvements/focus.md'],
    'Integration': ['docs/integration/checklist.md', 'docs/integration/fixes.md', 'docs/integration/extraction.md'],
    'GitHub': ['docs/github/fix-summary.md', 'docs/github/workflow-fix.md', 'docs/github/troubleshooting.md'],
    'Cleanup': ['docs/cleanup/complete.md'],
    'Rebranding': ['docs/rebranding/magnum-opus.md'],
    'Info': ['docs/info/main-repo.md', 'docs/info/repository-structure.md', 'docs/info/inventory-summary.md', 'docs/info/system-inventory.md'],
    'Guides': ['docs/guides/how-to-run.md', 'docs/guides/run-integration.md', 'docs/guides/experiment.md', 'docs/guides/fix-and-integration-plan.md']
  };
  
  for (const [category, files] of Object.entries(categories)) {
    output += `## ${category}\n\n`;
    output += '| Old Location | New Location |\n';
    output += '|--------------|-------------|\n';
    
    for (const file of files) {
      if (PATH_MAPPINGS[file]) {
        output += `| \`${file}\` | \`${PATH_MAPPINGS[file]}\` |\n`;
      }
    }
    
    output += '\n';
  }
  
  output += '---\n\n';
  output += '## Quick Reference\n\n';
  output += '### By Category\n\n';
  
  for (const [category, files] of Object.entries(categories)) {
    output += `**${category}**:\n`;
    for (const file of files) {
      if (PATH_MAPPINGS[file]) {
        output += `- \`${file}\` → \`${PATH_MAPPINGS[file]}\`\n`;
      }
    }
    output += '\n';
  }
  
  output += '---\n\n';
  output += '**Note**: All old root-level files have been moved to organized `docs/` subdirectories.\n';
  output += 'Use this map to update any references in your code or documentation.\n';
  
  const outputPath = path.join(BASE_DIR, 'docs/REFERENCE_MAP.md');
  fs.writeFileSync(outputPath, output, 'utf-8');
  
  console.log('✅ Reference map created: docs/REFERENCE_MAP.md');
}

createReferenceMap();

