/**
 * @license CC0-1.0 - Public Domain
 * 
 * Portal Tech
 * Portal system for Codex 144:99 and Circuitum 99: Alpha et Omega
 * Connects nodes, gates, realms, and systems
 */

/**
 * ⚗️ PortalConfig - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface PortalConfig {
  id?: string;
  node?: number;
  gate?: number;
  name?: string;
  realm?: string;
  activation?: string;
  geometry?: string;
  correspondences?: Record<string, any>;
  connections?: string[];
}

/**
 * ⚗️ Portal - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface Portal {
  id: string;
  type: 'codex-144-99' | 'circuitum-99';
  node?: number;
  gate?: number;
  name: string;
  destination: {
    system: string;
    node?: number;
    gate?: number;
    realm: string;
    connectedPortal?: string;
  };
  activation: string;
  geometry: string;
  correspondences: Record<string, any>;
  connections: string[];
  created: string;
  active?: boolean;
  activated?: string;
}

/**
 * ⚗️ PortalNetwork - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface PortalNetwork {
  id: string;
  name: string;
  portals: string[];
  connections: string[];
  created: string;
}

/**
 * ⚗️ PortalTech - The Crucible
 * 
 * In the alchemical tradition, this class serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this class
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Crucible
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export class PortalTech {
  private portals: Map<string, Portal>;
  private connections: Map<string, string[]>;
  private codexNodes: Map<number, Portal>;
  private circuitumGates: Map<number, Portal>;

  constructor() {
    this.portals = new Map();
    this.connections = new Map();
    this.codexNodes = new Map();
    this.circuitumGates = new Map();
  }

  /**
   * Create a portal to Codex 144:99 node
   */
  createCodexPortal(config: PortalConfig): Portal {
    const portalId = config.id || `portal-codex-${Date.now()}`;
    
    const portal: Portal = {
      id: portalId,
      type: 'codex-144-99',
      node: config.node || 1,
      name: config.name || `Codex Node ${config.node}`,
      destination: {
        system: 'codex-144-99',
        node: config.node || 1,
        realm: config.realm || 'Unknown'
      },
      activation: config.activation || 'ritual',
      geometry: config.geometry || 'vesica-piscis',
      correspondences: config.correspondences || {},
      connections: config.connections || [],
      created: new Date().toISOString()
    };
    
    this.portals.set(portalId, portal);
    if (portal.node) {
      this.codexNodes.set(portal.node, portal);
    }
    
    return portal;
  }

  /**
   * Create a portal to Circuitum 99 gate
   */
  createCircuitumPortal(config: PortalConfig): Portal {
    const portalId = config.id || `portal-circuitum-${Date.now()}`;
    
    const portal: Portal = {
      id: portalId,
      type: 'circuitum-99',
      gate: config.gate || 1,
      name: config.name || `Circuitum Gate ${config.gate}`,
      destination: {
        system: 'circuitum-99-alpha-et-omega',
        gate: config.gate || 1,
        realm: config.realm || 'Unknown'
      },
      activation: config.activation || 'ritual',
      geometry: config.geometry || 'sacred-geometry',
      correspondences: config.correspondences || {},
      connections: config.connections || [],
      created: new Date().toISOString()
    };
    
    this.portals.set(portalId, portal);
    if (portal.gate) {
      this.circuitumGates.set(portal.gate, portal);
    }
    
    return portal;
  }

  /**
   * Create a bidirectional portal between systems
   */
  createBidirectionalPortal(config: {
    codexNode: number;
    circuitumGate: number;
    name?: string;
  }): { codexPortal: Portal; circuitumPortal: Portal } {
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

  /**
   * Connect portal to grimoire
   */
  connectGrimoire(portalId: string, grimoireId: string): void {
    if (!this.portals.has(portalId)) {
      throw new Error(`Portal not found: ${portalId}`);
    }
    
    const portal = this.portals.get(portalId)!;
    if (!portal.connections.includes(grimoireId)) {
      portal.connections.push(grimoireId);
    }
  }

  /**
   * Connect portal to arcana
   */
  connectArcana(portalId: string, arcanaNumber: number): void {
    if (!this.portals.has(portalId)) {
      throw new Error(`Portal not found: ${portalId}`);
    }
    
    const portal = this.portals.get(portalId)!;
    if (!portal.correspondences.arcanae) {
      portal.correspondences.arcanae = [];
    }
    const arcanae = portal.correspondences.arcanae as number[];
    if (!arcanae.includes(arcanaNumber)) {
      arcanae.push(arcanaNumber);
    }
  }

  /**
   * Activate a portal
   */
  activate(portalId: string): Portal {
    if (!this.portals.has(portalId)) {
      throw new Error(`Portal not found: ${portalId}`);
    }
    
    const portal = this.portals.get(portalId)!;
    portal.active = true;
    portal.activated = new Date().toISOString();
    
    return portal;
  }

  /**
   * Get all portals for a system
   */
  getPortalsForSystem(system: string): Portal[] {
    return Array.from(this.portals.values()).filter(p => 
      p.type === system || p.destination.system === system
    );
  }

  /**
   * Get portal by node/gate
   */
  getPortalByNode(node: number, system: 'codex-144-99' | 'circuitum-99' = 'codex-144-99'): Portal | null {
    if (system === 'codex-144-99') {
      return this.codexNodes.get(node) || null;
    } else if (system === 'circuitum-99') {
      return this.circuitumGates.get(node) || null;
    }
    return null;
  }

  /**
   * Create portal network
   */
  createNetwork(config: {
    name?: string;
    codexNodes?: number[];
    circuitumGates?: number[];
  }): PortalNetwork {
    const network: PortalNetwork = {
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

  /**
   * Get portal by ID
   */
  getPortal(portalId: string): Portal | null {
    return this.portals.get(portalId) || null;
  }

  /**
   * Get all portals
   */
  getAllPortals(): Portal[] {
    return Array.from(this.portals.values());
  }
}

/**
 * Create a portal (convenience function)
 */
export async function createPortal(
  type: 'codex' | 'circuitum' | 'bidirectional',
  config: PortalConfig & { codexNode?: number; circuitumGate?: number }
): Promise<{ tech: PortalTech; portal: Portal | { codexPortal: Portal; circuitumPortal: Portal } }> {
  const tech = new PortalTech();
  let portal: Portal | { codexPortal: Portal; circuitumPortal: Portal };
  
  if (type === 'codex') {
    portal = tech.createCodexPortal(config);
  } else if (type === 'circuitum') {
    portal = tech.createCircuitumPortal(config);
  } else if (type === 'bidirectional') {
    if (config.codexNode === undefined || config.circuitumGate === undefined) {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    portal = tech.createBidirectionalPortal({
      codexNode: config.codexNode,
      circuitumGate: config.circuitumGate,
      name: config.name
    });
  } else {
    throw new Error(`Unknown portal type: ${type}`);
  }
  
  return { tech, portal };
}

export default PortalTech;

