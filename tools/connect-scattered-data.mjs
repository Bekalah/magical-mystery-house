#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Connect Scattered Data - Finds and connects data across all workspaces
 * Fast, permanent, and comprehensive
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const WORKSPACES = [
  rootDir,
  path.join(rootDir, '..', 'cathedral-real'),
  path.join(rootDir, '..', 'cathedral-fixed-clean'),
  path.join(rootDir, '..', 'cathedral-v1-consolidated'),
  path.join(rootDir, '..', 'cosmogenesis-engine'),
  path.join(rootDir, '..', 'Roo-Code')
].filter(ws => {
  try {
    return fs.existsSync(ws);
  } catch {
    return false;
  }
});

function findScatteredData() {
  const scattered = {
    characterData: [],
    gameData: [],
    shaderFiles: [],
    designFiles: [],
    creativeIdeas: [],
    documentation: [],
    configFiles: []
  };

  for (const workspace of WORKSPACES) {
    // Find character data
    const charPaths = [
      path.join(workspace, 'packages', 'liber-arcanae', 'data', 'complete-arcana-profiles.json'),
      path.join(workspace, 'packages', 'liber-arcanae', 'data', '*.json'),
      path.join(workspace, 'packages', 'godot-liber-arcanae', 'characters.json')
    ];

    for (const charPath of charPaths) {
      if (fs.existsSync(charPath) && charPath.endsWith('.json')) {
        scattered.characterData.push({ path: charPath, workspace });
      }
    }

    // Find game data
    const gamePaths = [
      path.join(workspace, 'GAME_DATA_COMPILATION.json'),
      path.join(workspace, 'packages', 'game-*', '**', '*.json'),
      path.join(workspace, 'packages', 'circuitum99-*', '**', '*.json')
    ];

    // Find shader files
    const shaderDirs = [
      path.join(workspace, 'packages', 'godot-*', 'shaders'),
      path.join(workspace, 'packages', 'godot-*', 'materials')
    ];

    for (const shaderDir of shaderDirs) {
      if (fs.existsSync(shaderDir)) {
        const files = fs.readdirSync(shaderDir, { recursive: true }).filter(f => 
          f.endsWith('.gdshader') || f.endsWith('.shader') || f.endsWith('.glsl')
        );
        for (const file of files) {
          scattered.shaderFiles.push({ path: path.join(shaderDir, file), workspace });
        }
      }
    }

    // Find design files
    const designPaths = [
      path.join(workspace, 'packages', 'godot-design-studio', '**', '*'),
      path.join(workspace, 'packages', 'cathedral-design-library', '**', '*'),
      path.join(workspace, 'packages', 'design-mathematics-core', '**', '*')
    ];

    // Find creative ideas
    const ideaPaths = [
      path.join(workspace, 'CREATIVE_IDEAS.json'),
      path.join(workspace, 'tools', 'creative-ideas-generator.mjs')
    ];

    for (const ideaPath of ideaPaths) {
      if (fs.existsSync(ideaPath)) {
        scattered.creativeIdeas.push({ path: ideaPath, workspace });
      }
    }
  }

  return scattered;
}

function connectScatteredData() {
  const scattered = findScatteredData();
  
  // Create connection map
  const connections = {
    timestamp: new Date().toISOString(),
    characterData: {
      locations: scattered.characterData,
      primary: scattered.characterData.find(d => d.workspace === rootDir) || scattered.characterData[0],
      needsConsolidation: scattered.characterData.length > 1
    },
    shaderFiles: {
      locations: scattered.shaderFiles,
      total: scattered.shaderFiles.length,
      needsConsolidation: scattered.shaderFiles.length > 0
    },
    creativeIdeas: {
      locations: scattered.creativeIdeas,
      needsIntegration: scattered.creativeIdeas.length > 0
    }
  };

  // Save connection map
  const outputPath = path.join(rootDir, 'SCATTERED_DATA_CONNECTIONS.json');
  fs.writeFileSync(outputPath, JSON.stringify(connections, null, 2), 'utf-8');

  console.log('🔗 Scattered data connections:');
  console.log(`   - Character data: ${scattered.characterData.length} locations`);
  console.log(`   - Shader files: ${scattered.shaderFiles.length} found`);
  console.log(`   - Creative ideas: ${scattered.creativeIdeas.length} locations`);
  console.log(`   - Saved to: SCATTERED_DATA_CONNECTIONS.json`);

  return connections;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  connectScatteredData();
}

export default connectScatteredData;


