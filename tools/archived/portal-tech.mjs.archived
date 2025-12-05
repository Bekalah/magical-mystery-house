#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Portal Tech
 * Portal system for Codex 144:99 and Circuitum 99: Alpha et Omega
 * Connects nodes, gates, realms, and systems
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class PortalTech {
  constructor() {
    this.portals = new Map();
    this.connections = new Map();
    this.codexNodes = new Map();
    this.circuitumGates = new Map();
  }

  // Create a portal to Codex 144:99 node
  createCodexPortal(config) {
    const portalId = config.id || `portal-codex-${Date.now()}`;
    
    const portal = {
      id: portalId,
      type: 'codex-144-99',
      node: config.node || 1,
      name: config.name || `Codex Node ${config.node}`,
      destination: {
        system: 'codex-144-99',
        node: config.node,
        realm: config.realm || 'Unknown'
      },
      activation: config.activation || 'ritual',
      geometry: config.geometry || 'vesica-piscis',
      correspondences: config.correspondences || {},
      connections: config.connections || [],
      created: new Date().toISOString()
    };
    
    this.portals.set(portalId, portal);
    this.codexNodes.set(config.node, portal);
    
    return portal;
  }

  // Create a portal to Circuitum 99 gate
  createCircuitumPortal(config) {
    const portalId = config.id || `portal-circuitum-${Date.now()}`;
    
    const portal = {
      id: portalId,
      type: 'circuitum-99',
      gate: config.gate || 1,
      name: config.name || `Circuitum Gate ${config.gate}`,
      destination: {
        system: 'circuitum-99-alpha-et-omega',
        gate: config.gate,
        realm: config.realm || 'Unknown'
      },
      activation: config.activation || 'ritual',
      geometry: config.geometry || 'sacred-geometry',
      correspondences: config.correspondences || {},
      connections: config.connections || [],
      created: new Date().toISOString()
    };
    
    this.portals.set(portalId, portal);
    this.circuitumGates.set(config.gate, portal);
    
    return portal;
  }

  // Create a bidirectional portal between systems
  createBidirectionalPortal(config) {
    const portal1 = this.createCodexPortal({
      id: `portal-codex-${config.codexNode}`,
      node: config.codexNode,
      name: config.name || `Codex-Circuitum Portal ${config.codexNode}/${config.circuitumGate}`,
      connections: [`portal-circuitum-${config.circuitumGate}`]
    });
    
    const portal2 = this.createCircuitumPortal({
      id: `portal-circuitum-${config.circuitumGate}`,
      gate: config.circuitumGate,
      name: config.name || `Circuitum-Codex Portal ${config.circuitumGate}/${config.codexNode}`,
      connections: [`portal-codex-${config.codexNode}`]
    });
    
    // Link them
    portal1.destination.connectedPortal = portal2.id;
    portal2.destination.connectedPortal = portal1.id;
    
    return { codexPortal: portal1, circuitumPortal: portal2 };
  }

  // Connect portal to grimoire
  connectGrimoire(portalId, grimoireId) {
    if (!this.portals.has(portalId)) {
      throw new Error(`Portal not found: ${portalId}`);
    }
    
    const portal = this.portals.get(portalId);
    if (!portal.connections.includes(grimoireId)) {
      portal.connections.push(grimoireId);
    }
  }

  // Connect portal to arcana
  connectArcana(portalId, arcanaNumber) {
    if (!this.portals.has(portalId)) {
      throw new Error(`Portal not found: ${portalId}`);
    }
    
    const portal = this.portals.get(portalId);
    if (!portal.correspondences.arcanae) {
      portal.correspondences.arcanae = [];
    }
    if (!portal.correspondences.arcanae.includes(arcanaNumber)) {
      portal.correspondences.arcanae.push(arcanaNumber);
    }
  }

  // Activate a portal
  activate(portalId) {
    if (!this.portals.has(portalId)) {
      throw new Error(`Portal not found: ${portalId}`);
    }
    
    const portal = this.portals.get(portalId);
    portal.active = true;
    portal.activated = new Date().toISOString();
    
    return portal;
  }

  // Get all portals for a system
  getPortalsForSystem(system) {
    return Array.from(this.portals.values()).filter(p => 
      p.type === system || p.destination.system === system
    );
  }

  // Get portal by node/gate
  getPortalByNode(node, system = 'codex-144-99') {
    if (system === 'codex-144-99') {
      return this.codexNodes.get(node);
    } else if (system === 'circuitum-99') {
      return this.circuitumGates.get(node);
    }
    return null;
  }

  // Create portal network
  createNetwork(config) {
    const network = {
      id: `network-${Date.now()}`,
      name: config.name || 'Portal Network',
      portals: [],
      connections: [],
      created: new Date().toISOString()
    };
    
    // Create portals for each node/gate
    if (config.codexNodes) {
      for (const node of config.codexNodes) {
        const portal = this.createCodexPortal({
          node,
          name: `Codex Node ${node} Portal`
        });
        network.portals.push(portal.id);
      }
    }
    
    if (config.circuitumGates) {
      for (const gate of config.circuitumGates) {
        const portal = this.createCircuitumPortal({
          gate,
          name: `Circuitum Gate ${gate} Portal`
        });
        network.portals.push(portal.id);
      }
    }
    
    return network;
  }

  // Save portal
  save(portalId, outputPath = null) {
    if (!this.portals.has(portalId)) {
      throw new Error(`Portal not found: ${portalId}`);
    }
    
    if (!outputPath) {
      outputPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'portals', `${portalId}.json`);
    }
    
    const portal = this.portals.get(portalId);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(portal, null, 2), 'utf-8');
    return portal;
  }
}

async function createPortal(type, config) {
  const tech = new PortalTech();
  let portal;
  
  if (type === 'codex') {
    portal = tech.createCodexPortal(config);
  } else if (type === 'circuitum') {
    portal = tech.createCircuitumPortal(config);
  } else if (type === 'bidirectional') {
    const portals = tech.createBidirectionalPortal(config);
    portal = portals;
  } else {
    throw new Error(`Unknown portal type: ${type}`);
  }
  
  console.log(`🌀 Portal created: ${type}`);
  if (portal.id) {
    console.log(`   ID: ${portal.id}`);
  }
  
  return { tech, portal };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createPortal('codex', { node: 1 }).then(({ portal }) => {
    console.log('✅ Portal created');
  }).catch(console.error);
}

export { PortalTech, createPortal };
export default createPortal;

