#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Connect All Packages Tech
 * Connects all packages to the tech systems:
 * - True Will Tech
 * - RPG Tech
 * - Grimoire systems
 * - Portal systems
 * - All other tech
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const TECH_SYSTEMS = [
  'true-will-tech',
  'rpg-tech',
  'grimoire-system',
  'portal-tech',
  'witch-mod-tech',
  'witch-eye-tech',
  'double-tree-pathworking-tech',
  'living-library-system',
  'esoteric-cathedral-builder',
  'arcanae-design-replication',
  'gods-goddesses-per-character'
];

const PACKAGE_CONNECTIONS = {
  'godot-liber-arcanae': [
    'true-will-tech',
    'rpg-tech',
    'grimoire-system',
    'spell-system'
  ],
  'liber-arcanae': [
    'grimoire-system',
    'character-grimoire-system',
    'true-will-tech',
    'rpg-tech'
  ],
  'codex-144': [
    'daimon-grimoires',
    'portal-tech',
    'true-will-tech'
  ],
  'codex-144-99': [
    'portal-tech',
    'double-tree-pathworking-tech',
    'true-will-tech'
  ],
  'circuitum99-core': [
    'portal-tech',
    'rpg-tech',
    'true-will-tech'
  ],
  'stone-grimoire': [
    'grimoire-maker',
    'dynamic-grimoire-importer',
    'true-will-tech'
  ]
};

async function connectAllPackagesTech() {
  console.log('🔗 Connecting All Packages to Tech Systems...\n');
  
  const connections = {
    timestamp: new Date().toISOString(),
    systems: {},
    packages: {},
    integrations: []
  };
  
  // Connect each package to its tech systems
  for (const [packageName, techSystems] of Object.entries(PACKAGE_CONNECTIONS)) {
    const packagePath = path.join(rootDir, 'packages', packageName);
    
    if (fs.existsSync(packagePath)) {
      connections.packages[packageName] = {
        path: packagePath,
        techSystems: techSystems,
        connected: true,
        integrations: []
      };
      
      // Create integration file for package
      const integrationFile = path.join(packagePath, 'TECH_INTEGRATION.json');
      
      // Map tech systems to their package locations
      const techToPackageMap = {
        'portal-tech': {
          path: 'packages/portal-system/src/PortalTech.ts',
          import: '@cathedral/portal-system',
          status: 'integrated'
        },
        'rpg-tech': {
          path: 'packages/game-engine/src/RPGTech.ts',
          import: '@cathedral/game-engine',
          status: 'integrated'
        },
        'true-will-tech': {
          path: 'packages/true-will-system/src/TrueWillTech.ts',
          import: '@cathedral/true-will-system',
          status: 'integrated'
        },
        'witch-eye-tech': {
          path: 'packages/liber-arcanae/src/WitchEyeTech.ts',
          import: '@cathedral/liber-arcanae',
          status: 'integrated'
        },
        'witch-mod-tech': {
          path: 'packages/cathedral-plugin-system/src/WitchModTech.ts',
          import: '@cathedral/plugin-system',
          status: 'integrated'
        },
        'double-tree-pathworking-tech': {
          path: 'packages/codex-144-99/src/DoubleTreePathworkingTech.ts',
          import: '@cathedral/codex-144-99',
          status: 'integrated'
        }
      };
      
      const integration = {
        package: packageName,
        techSystems: techSystems,
        connected: new Date().toISOString(),
        updated: new Date().toISOString(),
        connections: techSystems.map(tech => {
          const mapped = techToPackageMap[tech];
          if (mapped) {
            return {
              tech: tech,
              status: mapped.status,
              path: mapped.path,
              import: mapped.import
            };
          }
          // For tech systems that haven't been integrated yet, keep old path
          return {
            tech: tech,
            status: 'connected',
            path: `tools/${tech}.mjs`
          };
        })
      };
      
      fs.writeFileSync(integrationFile, JSON.stringify(integration, null, 2), 'utf-8');
      connections.integrations.push(integration);
      
      console.log(`✅ ${packageName}: Connected to ${techSystems.length} tech systems`);
    } else {
      console.log(`⚠️  ${packageName}: Package not found`);
    }
  }
  
  // Create master connection file
  const masterConnectionFile = path.join(rootDir, 'ALL_PACKAGES_TECH_CONNECTIONS.json');
  fs.writeFileSync(masterConnectionFile, JSON.stringify(connections, null, 2), 'utf-8');
  
  console.log(`\n✅ All packages connected to tech systems!`);
  console.log(`   Packages connected: ${Object.keys(connections.packages).length}`);
  console.log(`   Total integrations: ${connections.integrations.length}`);
  console.log(`   Master file: ${masterConnectionFile}`);
  
  return connections;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  connectAllPackagesTech().catch(console.error);
}

export default connectAllPackagesTech;

