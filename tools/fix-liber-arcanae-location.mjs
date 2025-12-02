#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Fix Liber Arcanae Location
 * Fixes liber-arcanae repo location if needed
 * Ensures proper connections and accessibility
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function fixLiberArcanaeLocation() {
  console.log('🔧 Fixing Liber Arcanae Location...\n');
  
  const liberArcanaePath = path.join(rootDir, 'packages', 'liber-arcanae');
  const issues = [];
  const fixes = [];
  
  // Check if liber-arcanae exists
  if (!fs.existsSync(liberArcanaePath)) {
    issues.push('liber-arcanae package not found at expected location');
    console.log('⚠️  liber-arcanae not found at:', liberArcanaePath);
    
    // Try to find it elsewhere
    const possibleLocations = [
      path.join(rootDir, '..', 'liber-arcanae'),
      path.join(rootDir, 'liber-arcanae'),
      path.join(rootDir, 'packages', 'liber-arcanae-core')
    ];
    
    for (const loc of possibleLocations) {
      if (fs.existsSync(loc)) {
        console.log(`   Found at: ${loc}`);
        fixes.push({
          action: 'relocate',
          from: loc,
          to: liberArcanaePath,
          status: 'suggested'
        });
        break;
      }
    }
  } else {
    console.log('✅ liber-arcanae found at:', liberArcanaePath);
    
    // Check package.json
    const packageJsonPath = path.join(liberArcanaePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      console.log(`   Package: ${packageJson.name || 'unknown'}`);
      console.log(`   Version: ${packageJson.version || 'unknown'}`);
    } else {
      issues.push('package.json not found in liber-arcanae');
    }
    
    // Check src directory
    const srcPath = path.join(liberArcanaePath, 'src');
    if (!fs.existsSync(srcPath)) {
      issues.push('src directory not found in liber-arcanae');
    } else {
      const srcFiles = fs.readdirSync(srcPath);
      console.log(`   Source files: ${srcFiles.length}`);
    }
  }
  
  // Create connection file
  const connectionFile = path.join(liberArcanaePath, 'CONNECTIONS.json');
  const connections = {
    timestamp: new Date().toISOString(),
    location: liberArcanaePath,
    connected: [
      'godot-liber-arcanae',
      'codex-144',
      'codex-144-99',
      'circuitum99-core',
      'stone-grimoire'
    ],
    status: issues.length === 0 ? 'healthy' : 'needs-attention',
    issues,
    fixes
  };
  
  if (fs.existsSync(liberArcanaePath)) {
    fs.writeFileSync(connectionFile, JSON.stringify(connections, null, 2), 'utf-8');
    console.log(`\n✅ Connection file created: ${connectionFile}`);
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Issues found: ${issues.length}`);
  console.log(`   Fixes suggested: ${fixes.length}`);
  console.log(`   Status: ${connections.status}`);
  
  return connections;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fixLiberArcanaeLocation().catch(console.error);
}

export default fixLiberArcanaeLocation;

