#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Witch Mod Tech
 * Modular system for creating and managing witch mods
 * Integrates with grimoires, spells, and arcanae systems
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class WitchModTech {
  constructor() {
    this.mods = new Map();
    this.modules = new Map();
    this.connections = new Map();
  }

  // Create a new witch mod
  createMod(config) {
    const modId = config.id || `mod-${Date.now()}`;
    
    const mod = {
      id: modId,
      name: config.name || 'Unnamed Mod',
      type: config.type || 'spell-mod',
      description: config.description || '',
      author: config.author || 'Unknown',
      version: config.version || '1.0.0',
      dependencies: config.dependencies || [],
      grimoires: config.grimoires || [],
      spells: config.spells || [],
      arcanae: config.arcanae || [],
      correspondences: config.correspondences || {},
      activation: config.activation || 'manual',
      effects: config.effects || [],
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
    
    this.mods.set(modId, mod);
    return mod;
  }

  // Add a module to a mod
  addModule(modId, module) {
    if (!this.mods.has(modId)) {
      throw new Error(`Mod not found: ${modId}`);
    }
    
    const mod = this.mods.get(modId);
    const moduleData = {
      id: module.id || `module-${Date.now()}`,
      name: module.name,
      type: module.type || 'spell-module',
      code: module.code || '',
      config: module.config || {},
      connections: module.connections || []
    };
    
    if (!mod.modules) {
      mod.modules = [];
    }
    mod.modules.push(moduleData);
    this.modules.set(moduleData.id, moduleData);
    
    return moduleData;
  }

  // Connect mod to grimoire
  connectGrimoire(modId, grimoireId) {
    if (!this.mods.has(modId)) {
      throw new Error(`Mod not found: ${modId}`);
    }
    
    const mod = this.mods.get(modId);
    if (!mod.grimoires.includes(grimoireId)) {
      mod.grimoires.push(grimoireId);
    }
    
    // Create connection record
    const connectionId = `connection-${modId}-${grimoireId}`;
    this.connections.set(connectionId, {
      id: connectionId,
      from: modId,
      to: grimoireId,
      type: 'grimoire',
      created: new Date().toISOString()
    });
  }

  // Connect mod to arcana
  connectArcana(modId, arcanaNumber) {
    if (!this.mods.has(modId)) {
      throw new Error(`Mod not found: ${modId}`);
    }
    
    const mod = this.mods.get(modId);
    if (!mod.arcanae.includes(arcanaNumber)) {
      mod.arcanae.push(arcanaNumber);
    }
  }

  // Activate a mod
  activate(modId) {
    if (!this.mods.has(modId)) {
      throw new Error(`Mod not found: ${modId}`);
    }
    
    const mod = this.mods.get(modId);
    mod.active = true;
    mod.activated = new Date().toISOString();
    
    return mod;
  }

  // Deactivate a mod
  deactivate(modId) {
    if (!this.mods.has(modId)) {
      throw new Error(`Mod not found: ${modId}`);
    }
    
    const mod = this.mods.get(modId);
    mod.active = false;
    mod.deactivated = new Date().toISOString();
    
    return mod;
  }

  // Get all active mods
  getActiveMods() {
    return Array.from(this.mods.values()).filter(mod => mod.active);
  }

  // Save mod
  save(modId, outputPath = null) {
    if (!this.mods.has(modId)) {
      throw new Error(`Mod not found: ${modId}`);
    }
    
    if (!outputPath) {
      outputPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'witch-mods', `${modId}.json`);
    }
    
    const mod = this.mods.get(modId);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(mod, null, 2), 'utf-8');
    return mod;
  }
}

async function createWitchMod(config) {
  const tech = new WitchModTech();
  const mod = tech.createMod(config);
  
  console.log(`🔮 Witch Mod created: ${mod.name}`);
  console.log(`   ID: ${mod.id}`);
  console.log(`   Type: ${mod.type}`);
  
  return { tech, mod };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createWitchMod({
    name: 'Test Mod',
    type: 'spell-mod',
    description: 'Test witch mod'
  }).then(({ mod }) => {
    console.log('✅ Witch Mod created');
  }).catch(console.error);
}

export { WitchModTech, createWitchMod };
export default createWitchMod;

