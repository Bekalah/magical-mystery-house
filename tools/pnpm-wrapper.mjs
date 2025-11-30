#!/usr/bin/env node
/**
 * pnpm Wrapper - Handles JSDoc header in package.json
 * Automatically creates pnpm-compatible version before running pnpm
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const PACKAGE_JSON = path.join(BASE_DIR, 'package.json');
const PACKAGE_JSON_BACKUP = path.join(BASE_DIR, 'package.json.backup-for-pnpm');

// Read package.json
const content = fs.readFileSync(PACKAGE_JSON, 'utf-8');

// Check if it has JSDoc header
if (content.trim().startsWith('/**')) {
  // Extract JSON part
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
  
  // Backup original
  fs.copyFileSync(PACKAGE_JSON, PACKAGE_JSON_BACKUP);
  
  // Write pnpm-compatible version
  fs.writeFileSync(PACKAGE_JSON, jsonOnly, 'utf-8');
  
  // Run pnpm command
  const args = process.argv.slice(2);
  const command = `pnpm ${args.join(' ')}`;
  
  try {
    execSync(command, {
      cwd: BASE_DIR,
      stdio: 'inherit',
      shell: true
    });
  } finally {
    // Restore original
    fs.copyFileSync(PACKAGE_JSON_BACKUP, PACKAGE_JSON);
    fs.unlinkSync(PACKAGE_JSON_BACKUP);
  }
} else {
  // No JSDoc, run pnpm directly
  const args = process.argv.slice(2);
  const command = `pnpm ${args.join(' ')}`;
  execSync(command, {
    cwd: BASE_DIR,
    stdio: 'inherit',
    shell: true
  });
}

