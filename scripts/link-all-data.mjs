#!/usr/bin/env node
/**
 * Link All Data - Verify and Fix Data Connections
 * 
 * Uses UNIFIED_SYSTEM_MAP.json to verify all data connections work
 * and fixes broken links.
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SYSTEM_MAP = path.join(rootDir, 'data/UNIFIED_SYSTEM_MAP.json');
const REPORT_FILE = path.join(rootDir, 'data-connection-report.json');

function loadSystemMap() {
  if (!fs.existsSync(SYSTEM_MAP)) {
    console.error('❌ UNIFIED_SYSTEM_MAP.json not found!');
    process.exit(1);
  }
  
  return JSON.parse(fs.readFileSync(SYSTEM_MAP, 'utf-8'));
}

function verifyPath(mapPath, basePath = rootDir) {
  const fullPath = path.isAbsolute(mapPath) ? mapPath : path.join(basePath, mapPath);
  
  // Handle glob patterns
  if (mapPath.includes('*')) {
    const dir = path.dirname(fullPath);
    const pattern = path.basename(fullPath);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      const matches = files.filter(f => {
        const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
        return regex.test(f);
      });
      return { exists: matches.length > 0, path: fullPath, matches };
    }
    return { exists: false, path: fullPath, matches: [] };
  }
  
  return { exists: fs.existsSync(fullPath), path: fullPath };
}

function verifyConnections(systemMap, basePath = rootDir, prefix = '') {
  const results = {
    verified: [],
    missing: [],
    broken: []
  };
  
  for (const [key, value] of Object.entries(systemMap)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      const check = verifyPath(value, basePath);
      if (check.exists) {
        results.verified.push({ path: currentPath, file: value, status: 'exists' });
      } else {
        results.missing.push({ path: currentPath, file: value, status: 'missing' });
      }
    } else if (typeof value === 'object' && value !== null) {
      const nested = verifyConnections(value, basePath, currentPath);
      results.verified.push(...nested.verified);
      results.missing.push(...nested.missing);
      results.broken.push(...nested.broken);
    }
  }
  
  return results;
}

function createMissingDirectories(results) {
  let created = 0;
  
  for (const item of results.missing) {
    const fullPath = path.isAbsolute(item.file) ? item.file : path.join(rootDir, item.file);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
        created++;
        console.log(`✅ Created directory: ${dir}`);
      } catch (e) {
        console.error(`❌ Failed to create ${dir}: ${e.message}`);
      }
    }
  }
  
  return created;
}

function main() {
  console.log('🔗 Linking All Data Connections\n');
  
  const systemMap = loadSystemMap();
  console.log('📋 Loaded unified system map\n');
  
  const results = verifyConnections(systemMap);
  
  console.log(`✅ Verified: ${results.verified.length} connections`);
  console.log(`❌ Missing: ${results.missing.length} connections`);
  console.log(`⚠️  Broken: ${results.broken.length} connections\n`);
  
  // Create missing directories
  const created = createMissingDirectories(results);
  if (created > 0) {
    console.log(`\n📁 Created ${created} missing directories\n`);
  }
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    verified: results.verified.length,
    missing: results.missing.length,
    broken: results.broken.length,
    details: {
      verified: results.verified,
      missing: results.missing,
      broken: results.broken
    }
  };
  
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`📄 Report saved: ${REPORT_FILE}\n`);
  
  if (results.missing.length === 0 && results.broken.length === 0) {
    console.log('✅ All data connections verified!\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some connections need attention (see report)\n');
    process.exit(1);
  }
}

main();

