/**
 * map-codex
 * 
 * @package @cathedral/codex-144-99
 */
#!/usr/bin/env node
/**
 * Codex 144:99 Mapping Tool
 * 
 * Generates complete mapping of all 144 nodes and 99 gates
 */

import { CodexMapper } from '../src/codex-mapper';
import { CodexFixer } from '../src/fix-codex';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mapper = new CodexMapper();
const fixer = new CodexFixer();

// console.log('🗺️  Generating Codex 144:99 Complete Mapping...
');

// Generate mapping
const mapping = mapper.generateMappingJSON();

// Generate fix report
const fixReport = fixer.fix();
const validation = fixer.validateConnections();
const report = fixer.generateReport();

// Save mapping JSON
const mappingPath = path.join(__dirname, '../data/codex-144-99-complete-map.json');
fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
// console.log(`✅ Saved complete mapping to: ${mappingPath}`);

// Save fix report
const reportPath = path.join(__dirname, '../data/codex-144-99-fix-report.md');
fs.writeFileSync(reportPath, report);
// console.log(`✅ Saved fix report to: ${reportPath}`);

// Print summary
// console.log('
📊 Mapping Summary:');
// console.log(`   Nodes: ${mapping.summary.totalNodes}/144`);
// console.log(`   Gates: ${mapping.summary.totalGates}/99`);
// console.log(`   Validation: ${validation.valid ? '✅ Valid' : '❌ Errors found'}`);
// console.log(`   Errors: ${validation.errors.length}`);
// console.log(`   Warnings: ${validation.warnings.length}`);

if (validation.errors.length > 0) {
// console.log('
❌ Errors:');
  validation.errors.slice(0, 10).forEach(err => console.log(`   - ${err}`));
  if (validation.errors.length > 10) {
// console.log(`   ... and ${validation.errors.length - 10} more`);
  }
}

if (validation.warnings.length > 0) {
// console.log('
⚠️  Warnings:');
  validation.warnings.slice(0, 10).forEach(warn => console.log(`   - ${warn}`));
  if (validation.warnings.length > 10) {
// console.log(`   ... and ${validation.warnings.length - 10} more`);
  }
}

// console.log('
✅ Codex 144:99 mapping complete!');
