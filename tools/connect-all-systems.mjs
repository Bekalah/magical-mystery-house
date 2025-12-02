#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Connect all systems: circuitum99 (alpha et omega), mystery-house, stone-grimoire
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CORE_SYSTEMS = {
  circuitum99: {
    packages: ['circuitum99-core', 'circuitum99-arcanae-cyoa'],
    description: 'Circuitum99: Alpha et Omega - Interactive story system'
  },
  mysteryHouse: {
    packages: ['mystery-house-core'],
    description: 'Magical Mystery House - Mystery room system'
  },
  stoneGrimoire: {
    packages: ['stone-grimoire', 'stone-grimoire-core', 'stone-grimoire-library-engine'],
    description: 'Stone Grimoire - 8 Chapels system with body nodes'
  },
  liberArcanae: {
    packages: ['liber-arcanae', 'liber-arcanae-core', 'liber-arcanae-tools'],
    description: 'Liber Arcanae - 22 Major Arcana character system'
  },
  codex14499: {
    packages: ['codex-144-99', 'codex-144-99-core'],
    description: 'Codex 144:99 - Sacred mathematics and geometry'
  }
};

function shouldConnect(pkgName, pkgJson) {
  // Connect game/story packages to circuitum99
  if (pkgName.includes('game') || pkgName.includes('story') || pkgName.includes('cyoa')) {
    return ['circuitum99'];
  }
  
  // Connect mystery/room packages to mystery-house
  if (pkgName.includes('mystery') || pkgName.includes('room') || pkgName.includes('house')) {
    return ['mysteryHouse'];
  }
  
  // Connect stone/grimoire/chapel packages to stone-grimoire
  if (pkgName.includes('stone') || pkgName.includes('grimoire') || pkgName.includes('chapel')) {
    return ['stoneGrimoire'];
  }
  
  // Connect arcanae/tarot/character packages to liber-arcanae
  if (pkgName.includes('arcanae') || pkgName.includes('tarot') || pkgName.includes('character')) {
    return ['liberArcanae'];
  }
  
  // Connect codex packages to codex-144-99
  if (pkgName.includes('codex')) {
    return ['codex14499'];
  }
  
  // Connect design/art packages to all core systems
  if (pkgName.includes('design') || pkgName.includes('art') || pkgName.includes('visual')) {
    return ['circuitum99', 'mysteryHouse', 'stoneGrimoire', 'liberArcanae', 'codex14499'];
  }
  
  return [];
}

async function connectAllSystems() {
  const packagesDir = path.join(rootDir, 'packages');
  const packages = fs.readdirSync(packagesDir).filter(item => {
    const itemPath = path.join(packagesDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  let connected = 0;
  const connections = {};

  for (const pkgName of packages) {
    const pkgPath = path.join(packagesDir, pkgName);
    const packageJsonPath = path.join(pkgPath, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) continue;

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const systemsToConnect = shouldConnect(pkgName, packageJson);
      
      if (systemsToConnect.length > 0) {
        // Ensure cathedral.integration exists
        if (!packageJson.cathedral) {
          packageJson.cathedral = {};
        }
        if (!packageJson.cathedral.integration) {
          packageJson.cathedral.integration = { connects_to: [] };
        }
        if (!Array.isArray(packageJson.cathedral.integration.connects_to)) {
          packageJson.cathedral.integration.connects_to = [];
        }

        let updated = false;
        
        // Add connections
        for (const systemKey of systemsToConnect) {
          const system = CORE_SYSTEMS[systemKey];
          if (system) {
            for (const targetPkg of system.packages) {
              if (!packageJson.cathedral.integration.connects_to.includes(targetPkg)) {
                packageJson.cathedral.integration.connects_to.push(targetPkg);
                updated = true;
                
                if (!connections[systemKey]) {
                  connections[systemKey] = [];
                }
                connections[systemKey].push(pkgName);
              }
            }
          }
        }

        // Add dependencies if needed
        if (!packageJson.dependencies) {
          packageJson.dependencies = {};
        }

        for (const systemKey of systemsToConnect) {
          const system = CORE_SYSTEMS[systemKey];
          if (system) {
            for (const targetPkg of system.packages) {
              const depName = `@cathedral/${targetPkg}`;
              if (!packageJson.dependencies[depName] && !packageJson.dependencies[targetPkg]) {
                // Use workspace protocol for monorepo
                packageJson.dependencies[depName] = 'workspace:*';
                updated = true;
              }
            }
          }
        }

        if (updated) {
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
          connected++;
          console.log(`🔗 Connected: ${pkgName} → ${systemsToConnect.join(', ')}`);
        }
      }
    } catch (e) {
      console.error(`⚠️  Error processing ${pkgName}:`, e.message);
    }
  }

  console.log(`\n✅ System Connections Complete!`);
  console.log(`   - Packages connected: ${connected}`);
  console.log(`\n📊 Connection Summary:`);
  
  for (const [systemKey, pkgs] of Object.entries(connections)) {
    const system = CORE_SYSTEMS[systemKey];
    console.log(`   - ${system.description}: ${pkgs.length} packages`);
  }

  // Generate connection map
  const connectionMap = {
    timestamp: new Date().toISOString(),
    systems: CORE_SYSTEMS,
    connections
  };

  fs.writeFileSync(
    path.join(rootDir, 'SYSTEM_CONNECTIONS.json'),
    JSON.stringify(connectionMap, null, 2),
    'utf-8'
  );

  console.log(`\n📄 Connection map saved to: SYSTEM_CONNECTIONS.json`);

  return { connected, connections };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  connectAllSystems().catch(console.error);
}

export default connectAllSystems;

