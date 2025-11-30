#!/usr/bin/env node
/**
 * Fix package.json for pnpm compatibility
 * Creates a pnpm-compatible version by stripping JSDoc header
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const PACKAGE_JSON = path.join(BASE_DIR, 'package.json');
const PACKAGE_JSON_PNPM = path.join(BASE_DIR, 'package.json.pnpm');

// Read package.json with JSDoc
const content = fs.readFileSync(PACKAGE_JSON, 'utf-8');

// Extract JSON part (after JSDoc)
const jsonStart = content.indexOf('{');
if (jsonStart === -1) {
  console.error('❌ Could not find JSON start in package.json');
  process.exit(1);
}

const jsonOnly = content.substring(jsonStart);

// Validate JSON
try {
  JSON.parse(jsonOnly);
} catch (error) {
  console.error('❌ Invalid JSON:', error.message);
  process.exit(1);
}

// Write pnpm-compatible version
fs.writeFileSync(PACKAGE_JSON_PNPM, jsonOnly, 'utf-8');

console.log('✅ Created package.json.pnpm (pnpm-compatible)');
console.log('   → Use: pnpm --config-file package.json.pnpm <command>');
console.log('   → Or symlink: ln -sf package.json.pnpm package.json');

