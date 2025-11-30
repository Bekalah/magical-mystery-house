/**
 * Circui - 144:99 ratio compliance - Fibonacci-based sizing - Golden ratio proportions - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Organic, quality) (Open world story (Open world story exploration) (Trauma-aware narrative design - Museum-grade quality - Museum-grade quality) exploration) (Living narrative that responds to choices) Engine
 * 
 * Double Tree Pathworking System with 99 Gates
 * Dynamic story transformation based on Major Arcana embodiment
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SACRED_MATH, gateToNodeMapping } from '../../sacred-mathematics-core/src/index';

// Major Arcana Embodiments
/**
 * ⚗️ MajorArcanaEmbodiment - The Principle
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
export interface MajorArcanaEmbodiment {
  arcana: number;              // 0-21
  name: string;
  character: string;
  description: string;
  storyTransformation: StoryTransformation;
  gateConnections: number[];  // Connected gates
  nodeMappings: number[];      // Codex 144:99 node mappings
}

// Story Transformation
/**
 * ⚗️ StoryTransformation - The Principle
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
export interface StoryTransformation {
  narrativeFlavor: string;
  worldPerception: string;
  gateExperience: string;
  pathworkingStyle: string;
  traumaSafeFeatures: string[];
}

// Gate Structure
/**
 * ⚗️ Gate - The Principle
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
export interface Gate {
  gateNumber: number;          // 1-99
  name: string;
  tier: 'Alpha' | 'Omega' | 'Rebirth';
  description: string;
  arcanaConnection?: number;   // Major Arcana (0-21) if applicable
  nodeMappings: number[];      // Codex 144:99 nodes
  chapelConnections: number[]; // Stone Grimoire chapels (1-8)
  roomConnections: number[];    // Mystery House rooms (1-99)
  mathematicalCorrespondences: {
    primaryGate: number;
    harmonicGate: number;
    spiralGate: number;
  };
  storyTransformation?: StoryTransformation;
  pathworkingNodes: PathworkingNode[];
}

// Pathworking Node
/**
 * ⚗️ PathworkingNode - The Principle
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
export interface PathworkingNode {
  nodeId: string;
  name: string;
  description: string;
  correspondences: string[];
  meditation: string;
  integration: string;
}

/**
 * ⚗️ Circuitum99StoryEngine - The Crucible
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
export class Circuitum99StoryEngine {
  private gates: Map<number, Gate>;
  private embodiments: Map<number, MajorArcanaEmbodiment>;
  private currentEmbodiment: number | null = null;

  constructor() {
    this.gates = new Map();
    this.embodiments = new Map();
    
    this.initializeEmbodiments();
    this.initializeGates();
  }

  private initializeEmbodiments(): void {
    // All 22 Major Arcana embodiments
    const embodimentData: MajorArcanaEmbodiment[] = [
      {
        arcana: 0,
        name: 'The Fool',
        character: 'Rebecca Respawn',
        description: 'Infinite curiosity, trauma-safe exploration, fresh perspective',
        storyTransformation: {
          narrativeFlavor: 'Open-ended exploration, discovery, wonder',
          worldPerception: 'Everything is new and full of possibility',
          gateExperience: 'Gates open easily, paths reveal themselves naturally',
          pathworkingStyle: 'Gentle, exploratory, non-linear',
          traumaSafeFeatures: ['No pressure', 'Safe exploration', 'Gentle guidance']
        },
        gateConnections: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        nodeMappings: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      {
        arcana: 1,
        name: 'The Magician',
        character: 'John Dee',
        description: 'Mathematics as mystical practice, alchemical transformation',
        storyTransformation: {
          narrativeFlavor: 'Precise, mathematical, transformative',
          worldPerception: 'Reality responds to mathematical principles',
          gateExperience: 'Gates require understanding of sacred geometry',
          pathworkingStyle: 'Structured, precise, mathematical',
          traumaSafeFeatures: ['Clear structure', 'Predictable patterns', 'Logical progression']
        },
        gateConnections: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        nodeMappings: [11, 12, 13, 14, 15, 16, 17, 20, 19, 20, 21]
      },
      {
        arcana: 2,
        name: 'The High Priestess',
        character: 'Dion Fortune + Emma Kunz',
        description: 'Intuitive wisdom, geometric healing, esoteric knowledge',
        storyTransformation: {
          narrativeFlavor: 'Mystical, intuitive, healing-focused',
          worldPerception: 'Geometric patterns reveal hidden truths',
          gateExperience: 'Gates respond to intuitive understanding',
          pathworkingStyle: 'Intuitive, flowing, healing-oriented',
          traumaSafeFeatures: ['Gentle healing', 'Intuitive guidance', 'Safe exploration']
        },
        gateConnections: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        nodeMappings: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
      }
      // ... Add remaining 19 embodiments (3-21)
    ];

    // Add remaining embodiments (simplified for space)
    for (let i = 3; i <= 21; i++) {
      const arcanaNames = [
        'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers',
        'The Chariot', 'Strength', 'The Hermit', 'Wheel of Fortune',
        'Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil',
        'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
      ];
      
      embodimentData.push({
        arcana: i,
        name: arcanaNames[i - 3],
        character: `Arcana ${i} Character`,
        description: `Major Arcana ${i} embodiment`,
        storyTransformation: {
          narrativeFlavor: `Arcana ${i} narrative flavor`,
          worldPerception: `Arcana ${i} world perception`,
          gateExperience: `Arcana ${i} gate experience`,
          pathworkingStyle: `Arcana ${i} pathworking style`,
          traumaSafeFeatures: ['Trauma-safe', 'Gentle', 'Supportive']
        },
        gateConnections: this.calculateGateConnections(i),
        nodeMappings: this.calculateNodeMappings(i)
      });
    }

    embodimentData.forEach(embodiment => {
      this.embodiments.set(embodiment.arcana, embodiment);
    });
  }

  private calculateGateConnections(arcana: number): number[] {
    // Calculate gate connections based on arcana and mathematical relationships
    const baseGate = ((arcana * 4) % 99) + 1;
    const connections: number[] = [];
    
    for (let i = 0; i < 11; i++) {
      const gate = ((baseGate + i * 9) % 99) + 1;
      connections.push(gate);
    }
    
    return connections;
  }

  private calculateNodeMappings(arcana: number): number[] {
    // Map arcana to Codex 144:99 nodes
    const baseNode = arcana;
    const mappings: number[] = [];
    
    for (let i = 0; i < 11; i++) {
      const node = (baseNode + i * 13) % 144;
      mappings.push(node);
    }
    
    return mappings;
  }

  private initializeGates(): void {
    // Initialize all 99 gates
    for (let gateNum = 1; gateNum <= 99; gateNum++) {
      const tier = this.determineTier(gateNum);
      const arcanaConnection = this.determineArcanaConnection(gateNum);
      const nodeMappings = this.calculateNodeMappingsForGate(gateNum);
      const chapelConnections = this.calculateChapelConnections(gateNum);
      const roomConnections = this.calculateRoomConnections(gateNum);
      
      const gate: Gate = {
        gateNumber: gateNum,
        name: `Gate ${gateNum}`,
        tier,
        description: `${tier} tier gate ${gateNum} - Pathworking and transformation`,
        arcanaConnection,
        nodeMappings,
        chapelConnections,
        roomConnections,
        mathematicalCorrespondences: {
          primaryGate: gateNum,
          harmonicGate: this.calculateHarmonicGate(gateNum),
          spiralGate: this.calculateSpiralGate(gateNum)
        },
        pathworkingNodes: this.generatePathworkingNodes(gateNum)
      };

      // Apply story transformation if arcana connection exists
      if (arcanaConnection !== undefined) {
        const embodiment = this.embodiments.get(arcanaConnection);
        if (embodiment) {
          gate.storyTransformation = embodiment.storyTransformation;
        }
      }

      this.gates.set(gateNum, gate);
    }
  }

  private determineTier(gateNum: number): 'Alpha' | 'Omega' | 'Rebirth' {
    if (gateNum <= 33) return 'Alpha';
    if (gateNum <= 66) return 'Omega';
    return 'Rebirth';
  }

  private determineArcanaConnection(gateNum: number): number | undefined {
    // Map gates to Major Arcana (0-21)
    // Gates 1-11 map to Arcana 0-10
    // Gates 12-22 map to Arcana 11-21
    // Pattern repeats
    if (gateNum <= 22) {
      return (gateNum - 1) % 22;
    }
    // For gates 23-99, use mathematical mapping
    return ((gateNum - 1) * 7) % 22;
  }

  private calculateNodeMappingsForGate(gateNum: number): number[] {
    // Use gate-to-node mapping from sacred-mathematics-core
    const nodes = gateToNodeMapping(gateNum);
    return nodes.slice(0, 5); // Limit to 5 nodes per gate
  }

  private calculateChapelConnections(gateNum: number): number[] {
    // Map gate to Stone Grimoire chapels (1-8)
    const chapel = ((gateNum - 1) % 8) + 1;
    return [chapel];
  }

  private calculateRoomConnections(gateNum: number): number[] {
    // Map gate to Mystery House rooms (1-99)
    // Direct mapping for now
    return [gateNum];
  }

  private calculateHarmonicGate(gateNum: number): number {
    // Harmonic gate using golden ratio
    return Math.round((gateNum * SACRED_MATH.PHI) % 99) + 1;
  }

  private calculateSpiralGate(gateNum: number): number {
    // Spiral gate using cathedral ratio
    return Math.round((gateNum * SACRED_MATH.CATHEDRAL_RATIO) % 99) + 1;
  }

  private generatePathworkingNodes(gateNum: number): PathworkingNode[] {
    // Generate pathworking nodes for each gate
    const nodes: PathworkingNode[] = [];
    
    for (let i = 0; i < 3; i++) {
      nodes.push({
        nodeId: `gate-${gateNum}-node-${i + 1}`,
        name: `Pathworking Node ${i + 1}`,
        description: `Pathworking node for Gate ${gateNum}`,
        correspondences: [`Gate ${gateNum}`, `Tier ${this.determineTier(gateNum)}`],
        meditation: `Meditation for Gate ${gateNum} Node ${i + 1}`,
        integration: `Integration practice for Gate ${gateNum} Node ${i + 1}`
      });
    }
    
    return nodes;
  }

  /**
   * Set current Major Arcana embodiment
   */
  setEmbodiment(arcana: number): void {
    if (arcana < 0 || arcana > 21) {
      throw new Error(`Invalid arcana: ${arcana}. Must be 0-21`);
    }
    this.currentEmbodiment = arcana;
  }

  /**
   * Get current embodiment
   */
  getCurrentEmbodiment(): MajorArcanaEmbodiment | null {
    if (this.currentEmbodiment === null) return null;
    return this.embodiments.get(this.currentEmbodiment) || null;
  }

  /**
   * Get gate by number
   */
  getGate(gateNumber: number): Gate | null {
    return this.gates.get(gateNumber) || null;
  }

  /**
   * Get all gates for current embodiment
   */
  getGatesForEmbodiment(arcana: number): Gate[] {
    const embodiment = this.embodiments.get(arcana);
    if (!embodiment) return [];
    
    return embodiment.gateConnections
      .map(gateNum => this.gates.get(gateNum))
      .filter((gate): gate is Gate => gate !== undefined);
  }

  /**
   * Transform story based on current embodiment
   */
  transformStory(gateNumber: number): StoryTransformation | null {
    const gate = this.gates.get(gateNumber);
    if (!gate || !gate.storyTransformation) return null;
    
    // Apply current embodiment transformation if set
    if (this.currentEmbodiment !== null) {
      const embodiment = this.embodiments.get(this.currentEmbodiment);
      if (embodiment) {
        return {
          ...gate.storyTransformation,
          ...embodiment.storyTransformation
        };
      }
    }
    
    return gate.storyTransformation;
  }

  /**
   * Get all 99 gates
   */
  getAllGates(): Gate[] {
    return Array.from(this.gates.values());
  }

  /**
   * Get gates by tier
   */
  getGatesByTier(tier: 'Alpha' | 'Omega' | 'Rebirth'): Gate[] {
    return Array.from(this.gates.values()).filter(gate => gate.tier === tier);
  }
}

export default Circuitum99StoryEngine;

