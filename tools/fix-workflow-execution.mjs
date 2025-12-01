#!/usr/bin/env node
/**
 * Fix Workflow Execution
 * Ensures all workflows are properly formatted and will execute
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');
const WORKFLOWS_DIR = path.join(BASE_DIR, '.github', 'workflows');

const workflows = fs.readdirSync(WORKFLOWS_DIR)
  .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));

console.log('🔧 Fixing workflow execution issues...\n');

for (const workflow of workflows) {
  const workflowPath = path.join(WORKFLOWS_DIR, workflow);
  let content = fs.readFileSync(workflowPath, 'utf-8');
  
  // Remove any BOM
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  
  // Ensure Unix line endings
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Ensure file ends with newline
  if (!content.endsWith('\n')) {
    content += '\n';
  }
  
  fs.writeFileSync(workflowPath, content, 'utf-8');
  console.log(`   ✅ Fixed ${workflow}`);
}

console.log('\n✅ All workflows fixed!\n');
