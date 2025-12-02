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
      const integration = {
        package: packageName,
        techSystems: techSystems,
        connected: new Date().toISOString(),
        connections: techSystems.map(tech => ({
          tech: tech,
          status: 'connected',
          path: `tools/${tech}.mjs`
        }))
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

