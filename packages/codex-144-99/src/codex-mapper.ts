/**
 * codex-mapper
 * 
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Complete Mapping System
 * 
 * Comprehensive mapping of:
 * - All 144 nodes with complete data
 * - All 99 gates with proper connections
 * - Spiral positioning and sacred geometry
 * - Interconnections with all systems
 */

import { CodexLibrary } from './index';

/**
 * ⚗️ CodexNodeMap - The Principle
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
export interface CodexNodeMap {
  nodeId: number;
  name: string;
  position: {
    spiral: number; // Position in spiral (1-144)
    layer: number; // Layer in spiral (1-12, 12 nodes per layer)
    angle: number; // Angle in degrees
    radius: number; // Distance from center
  };
  element: string;
  chakra: string;
  planet: string;
  zodiac: string;
  gates: number[]; // Connected gates (1-99)
  connections: {
    harmonic: number[]; // Harmonic nodes
    dissonant: number[]; // Dissonant nodes
    tritone: number[]; // Tritone nodes
    adjacent: number[]; // Adjacent in spiral
  };
  correspondences: {
    shemAngel?: number; // 1-72
    goetiaDemon?: number; // 1-72
    iChing?: number; // 1-64
    soyga?: string;
  };
}

/**
 * ⚗️ GateMap - The Principle
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
export interface GateMap {
  gateId: number; // 1-99
  name: string;
  nodes: number[]; // Connected nodes (1-144)
  chapter?: number; // Circuitum99 chapter (1-33)
  type: 'primary' | 'harmonic' | 'dissonant' | 'tritone' | 'spiral';
  position: {
    layer: number; // Gate layer (1-9, 11 gates per layer)
    angle: number;
    radius: number;
  };
}

/**
 * Complete Codex 144:99 Mapper
 * 
 * Generates comprehensive maps of all nodes and gates
 */
/**
 * ⚗️ CodexMapper - The Crucible
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
export class CodexMapper {
  private codex: CodexLibrary;
  private nodeMaps: Map<number, CodexNodeMap> = new Map();
  private gateMaps: Map<number, GateMap> = new Map();

  constructor() {
    this.codex = new CodexLibrary();
    this.generateMaps();
  }

  /**
   * Generate complete maps of all nodes and gates
   */
  private generateMaps(): void {
    // Generate all 144 node maps
    for (let i = 1; i <= 144; i++) {
      const node = this.codex.getNode(i);
      if (node) {
        this.nodeMaps.set(i, this.createNodeMap(i, node));
      }
    }

    // Generate all 99 gate maps
    for (let i = 1; i <= 99; i++) {
      this.gateMaps.set(i, this.createGateMap(i));
    }
  }

  /**
   * Create node map with spiral positioning
   */
  private createNodeMap(nodeId: number, node: any): CodexNodeMap {
    // Calculate spiral position
    const layer = Math.ceil(nodeId / 12); // 12 nodes per layer
    const positionInLayer = ((nodeId - 1) % 12) + 1;
    const angle = (positionInLayer - 1) * 30; // 30 degrees per node in layer
    const radius = layer * 10; // Increasing radius per layer

    // Calculate connected gates
    const gates = this.calculateGatesForNode(nodeId, layer);

    // Get harmonic connections
    const harmonics = node.harmonics || {};
    const harmonic = harmonics.perfectConsonance || [];
    const dissonant = harmonics.dissonance || [];
    const tritone = harmonics.tritone || [];

    // Calculate adjacent nodes (spiral neighbors)
    const adjacent: number[] = [];
    if (nodeId > 1) adjacent.push(nodeId - 1);
    if (nodeId < 144) adjacent.push(nodeId + 1);
    // Add layer neighbors
    if (positionInLayer > 1) {
      const prevInLayer = nodeId - 1;
      if (prevInLayer > 0) adjacent.push(prevInLayer);
    }
    if (positionInLayer < 12) {
      const nextInLayer = nodeId + 1;
      if (nextInLayer <= 144) adjacent.push(nextInLayer);
    }

    return {
      nodeId,
      name: node.name || `Node ${nodeId}`,
      position: {
        spiral: nodeId,
        layer,
        angle,
        radius,
      },
      element: node.element || 'Unknown',
      chakra: node.chakra || 'Unknown',
      planet: node.planet || 'Unknown',
      zodiac: node.zodiac || 'Unknown',
      gates,
      connections: {
        harmonic,
        dissonant,
        tritone,
        adjacent: [...new Set(adjacent)], // Remove duplicates
      },
      correspondences: {
        shemAngel: node.shem ? this.parseShemNumber(node.shem) : undefined,
        goetiaDemon: node.goetia ? this.parseGoetiaNumber(node.goetia) : undefined,
        iChing: node.correspondences?.iChing ? parseInt(node.correspondences.iChing) : undefined,
        soyga: node.correspondences?.soyga,
      },
    };
  }

  /**
   * Calculate gates for a node
   * 
   * Gates 1-99 are distributed:
   * - Gates 1-33: Direct chapter mapping (Circuitum99)
   * - Gates 34-66: Harmonic gates (based on node harmonics)
   * - Gates 67-99: Spiral gates (based on spiral position)
   */
  private calculateGatesForNode(nodeId: number, layer: number): number[] {
    const gates: number[] = [];

    // Primary gates (1-33): Direct mapping based on node position
    // Each node connects to gates based on its position in the spiral
    const primaryGate = ((nodeId - 1) % 33) + 1;
    gates.push(primaryGate);

    // Harmonic gates (34-66): Based on node harmonics
    const node = this.codex.getNode(nodeId);
    if (node?.harmonics?.perfectConsonance) {
      node.harmonics.perfectConsonance.forEach((harmonicNode: number) => {
        const harmonicGate = 33 + ((harmonicNode - 1) % 33) + 1;
        if (harmonicGate <= 66 && !gates.includes(harmonicGate)) {
          gates.push(harmonicGate);
        }
      });
    }

    // Spiral gates (67-99): Based on spiral layer and position
    const spiralGate = 66 + ((layer - 1) % 33) + 1;
    if (spiralGate <= 99 && !gates.includes(spiralGate)) {
      gates.push(spiralGate);
    }

    // Additional gates based on node relationships
    if (node?.harmonics?.consonance) {
      node.harmonics.consonance.forEach((consonantNode: number) => {
        const consonantGate = 33 + ((consonantNode - 1) % 33) + 1;
        if (consonantGate <= 66 && !gates.includes(consonantGate)) {
          gates.push(consonantGate);
        }
      });
    }

    return [...new Set(gates)].sort((a, b) => a - b);
  }

  /**
   * Create gate map
   */
  private createGateMap(gateId: number): GateMap {
    // Determine gate type
    let type: GateMap['type'] = 'primary';
    let chapter: number | undefined;
    
    if (gateId <= 33) {
      type = 'primary';
      chapter = gateId; // Direct chapter mapping
    } else if (gateId <= 66) {
      type = 'harmonic';
    } else {
      type = 'spiral';
    }

    // Calculate gate position
    const gateLayer = Math.ceil(gateId / 11); // 11 gates per layer (approximately)
    const positionInLayer = ((gateId - 1) % 11) + 1;
    const angle = (positionInLayer - 1) * (360 / 11);
    const radius = gateLayer * 8;

    // Find connected nodes
    const nodes: number[] = [];
    this.nodeMaps.forEach((nodeMap, nodeId) => {
      if (nodeMap.gates.includes(gateId)) {
        nodes.push(nodeId);
      }
    });

    return {
      gateId,
      name: this.getGateName(gateId, type, chapter),
      nodes,
      chapter,
      type,
      position: {
        layer: gateLayer,
        angle,
        radius,
      },
    };
  }

  /**
   * Get gate name
   */
  private getGateName(gateId: number, type: GateMap['type'], chapter?: number): string {
    if (chapter) {
      return `Gate ${gateId} (Chapter ${chapter})`;
    }
    if (type === 'harmonic') {
      return `Harmonic Gate ${gateId}`;
    }
    if (type === 'spiral') {
      return `Spiral Gate ${gateId}`;
    }
    return `Gate ${gateId}`;
  }

  /**
   * Parse Shem angel number from string
   */
  private parseShemNumber(shem: string): number | undefined {
    const match = shem.match(/\d+/);
    return match ? parseInt(match[0]) : undefined;
  }

  /**
   * Parse Goetia demon number from string
   */
  private parseGoetiaNumber(goetia: string): number | undefined {
    const match = goetia.match(/\d+/);
    return match ? parseInt(match[0]) : undefined;
  }

  /**
   * Get node map
   */
  getNodeMap(nodeId: number): CodexNodeMap | undefined {
    return this.nodeMaps.get(nodeId);
  }

  /**
   * Get gate map
   */
  getGateMap(gateId: number): GateMap | undefined {
    return this.gateMaps.get(gateId);
  }

  /**
   * Get all node maps
   */
  getAllNodeMaps(): CodexNodeMap[] {
    return Array.from(this.nodeMaps.values()).sort((a, b) => a.nodeId - b.nodeId);
  }

  /**
   * Get all gate maps
   */
  getAllGateMaps(): GateMap[] {
    return Array.from(this.gateMaps.values()).sort((a, b) => a.gateId - b.gateId);
  }

  /**
   * Get nodes by layer
   */
  getNodesByLayer(layer: number): CodexNodeMap[] {
    return Array.from(this.nodeMaps.values()).filter(n => n.position.layer === layer);
  }

  /**
   * Get gates by type
   */
  getGatesByType(type: GateMap['type']): GateMap[] {
    return Array.from(this.gateMaps.values()).filter(g => g.type === type);
  }

  /**
   * Get nodes connected to a gate
   */
  getNodesForGate(gateId: number): CodexNodeMap[] {
    const gate = this.gateMaps.get(gateId);
    if (!gate) return [];
    return gate.nodes.map(nodeId => this.nodeMaps.get(nodeId)).filter(Boolean) as CodexNodeMap[];
  }

  /**
   * Get gates for a node
   */
  getGatesForNode(nodeId: number): GateMap[] {
    const node = this.nodeMaps.get(nodeId);
    if (!node) return [];
    return node.gates.map(gateId => this.gateMaps.get(gateId)).filter(Boolean) as GateMap[];
  }

  /**
   * Generate complete mapping JSON
   */
  generateMappingJSON(): {
    nodes: CodexNodeMap[];
    gates: GateMap[];
    summary: {
      totalNodes: number;
      totalGates: number;
      nodesByLayer: Record<number, number>;
      gatesByType: Record<string, number>;
    };
  } {
    const nodes = this.getAllNodeMaps();
    const gates = this.getAllGateMaps();

    // Calculate summary
    const nodesByLayer: Record<number, number> = {};
    nodes.forEach(node => {
      nodesByLayer[node.position.layer] = (nodesByLayer[node.position.layer] || 0) + 1;
    });

    const gatesByType: Record<string, number> = {};
    gates.forEach(gate => {
      gatesByType[gate.type] = (gatesByType[gate.type] || 0) + 1;
    });

    return {
      nodes,
      gates,
      summary: {
        totalNodes: nodes.length,
        totalGates: gates.length,
        nodesByLayer,
        gatesByType,
      },
    };
  }
}
