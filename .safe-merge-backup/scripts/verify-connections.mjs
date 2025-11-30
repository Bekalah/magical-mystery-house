#!/usr/bin/env node
/**
 * Verify All Directory Connections
 * 
 * Confirms all directories are properly connected
 * Creates missing directories if needed
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REQUIRED_DIRS = {
  packages: path.join(rootDir, 'packages'),
  apps: path.join(rootDir, 'apps'),
  scripts: path.join(rootDir, 'scripts'),
  tools: path.join(rootDir, 'tools'),
  docs: path.join(rootDir, 'docs'),
  openspec: path.join(rootDir, 'openspec')
};

function verifyConnections() {
  console.log('🔗 Verifying Directory Connections...\n');
  
  const results = {
    connected: [],
    created: [],
    missing: [],
    errors: []
  };
  
  for (const [name, dirPath] of Object.entries(REQUIRED_DIRS)) {
    try {
      if (fs.existsSync(dirPath)) {
        if (fs.statSync(dirPath).isDirectory()) {
          const items = fs.readdirSync(dirPath).length;
          results.connected.push({ name, path: dirPath, items });
          console.log(`   ✅ ${name.padEnd(15)} Connected (${items} items)`);
        } else {
          results.errors.push({ name, error: 'Exists but is not a directory' });
          console.log(`   ❌ ${name.padEnd(15)} Exists but is not a directory`);
        }
      } else {
        // Create missing directory
        try {
          fs.mkdirSync(dirPath, { recursive: true });
          results.created.push({ name, path: dirPath });
          console.log(`   ✨ ${name.padEnd(15)} Created`);
        } catch (e) {
          results.missing.push({ name, error: e.message });
          console.log(`   ❌ ${name.padEnd(15)} Failed to create: ${e.message}`);
        }
      }
    } catch (e) {
      results.errors.push({ name, error: e.message });
      console.log(`   ❌ ${name.padEnd(15)} Error: ${e.message}`);
    }
  }
  
  console.log('\n📊 SUMMARY:');
  console.log(`   ✅ Connected: ${results.connected.length}`);
  console.log(`   ✨ Created: ${results.created.length}`);
  console.log(`   ❌ Missing/Errors: ${results.missing.length + results.errors.length}\n`);
  
  if (results.connected.length === Object.keys(REQUIRED_DIRS).length) {
    console.log('✅ All directories connected properly!\n');
    return true;
  } else {
    console.log('⚠️  Some directories need attention\n');
    return false;
  }
}

verifyConnections();

