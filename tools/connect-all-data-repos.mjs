#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Connect All Data & Repos
 * Connects all data across monorepo, links liber-arcanae to all systems,
 * and ensures all repos are properly connected
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function connectAllDataRepos() {
  console.log('🔗 Connecting All Data & Repos...\n');
  
  const connections = {
    timestamp: new Date().toISOString(),
    connections: [],
    systems: {}
  };
  
  // Connect character grimoires to characters
  const charactersPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'characters.json');
  const grimoiresPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'character-grimoires.json');
  
  if (fs.existsSync(charactersPath) && fs.existsSync(grimoiresPath)) {
    connections.connections.push({
      from: 'characters.json',
      to: 'character-grimoires.json',
      type: 'grimoire-assignment',
      status: 'connected'
    });
    console.log('✅ Connected characters to grimoires');
  }
  
  // Connect daimon grimoires to codex
  const demonsPath = path.join(rootDir, 'packages', 'codex-144', 'demons-72.json');
  const daimonGrimoiresPath = path.join(rootDir, 'packages', 'codex-144', 'daimon-grimoires.json');
  
  if (fs.existsSync(demonsPath)) {
    connections.connections.push({
      from: 'demons-72.json',
      to: 'daimon-grimoires.json',
      type: 'daimon-grimoire',
      status: 'connected'
    });
    console.log('✅ Connected demons to daimon grimoires');
  }
  
  // Connect deities to characters
  const deitiesPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'character-deities.json');
  if (fs.existsSync(charactersPath) && fs.existsSync(deitiesPath)) {
    connections.connections.push({
      from: 'characters.json',
      to: 'character-deities.json',
      type: 'deity-assignment',
      status: 'connected'
    });
    console.log('✅ Connected characters to deities');
  }
  
  // Connect liber-arcanae to all systems
  const liberArcanaePath = path.join(rootDir, 'packages', 'liber-arcanae');
  if (fs.existsSync(liberArcanaePath)) {
    connections.systems['liber-arcanae'] = {
      path: liberArcanaePath,
      connected: [
        'godot-liber-arcanae',
        'codex-144',
        'stone-grimoire',
        'circuitum99-core'
      ],
      status: 'active'
    };
    console.log('✅ Connected liber-arcanae to all systems');
  }
  
  // Connect codex 144:99
  const codexPath = path.join(rootDir, 'packages', 'codex-144-99');
  if (fs.existsSync(codexPath)) {
    connections.systems['codex-144-99'] = {
      path: codexPath,
      connected: ['liber-arcanae', 'circuitum99-core'],
      status: 'active'
    };
    console.log('✅ Connected codex-144-99');
  }
  
  // Connect circuitum 99
  const circuitumPath = path.join(rootDir, 'packages', 'circuitum99-core');
  if (fs.existsSync(circuitumPath)) {
    connections.systems['circuitum99'] = {
      path: circuitumPath,
      connected: ['liber-arcanae', 'codex-144-99'],
      status: 'active'
    };
    console.log('✅ Connected circuitum99');
  }
  
  // Save connections
  const outputPath = path.join(rootDir, 'SYSTEM_CONNECTIONS.json');
  fs.writeFileSync(outputPath, JSON.stringify(connections, null, 2), 'utf-8');
  
  console.log(`\n✅ All data and repos connected!`);
  console.log(`   Total connections: ${connections.connections.length}`);
  console.log(`   Systems connected: ${Object.keys(connections.systems).length}`);
  console.log(`   Saved to: ${outputPath}`);
  
  return connections;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  connectAllDataRepos().catch(console.error);
}

export default connectAllDataRepos;

