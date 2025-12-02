/**
 * Codex 144:99 Engine
 * 
 * Complete integration of 144 Nodes and 99 Depths
 * Maps all nodes to gates, chapels, rooms, and consciousness levels
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SACRED_MATH, nodeToGateMapping, gateToNodeMapping, consciousnessLevelToFrequency } from '../../sacred-mathematics-core/src/index';
import { FusionKinkDesignMathematics } from '../../fusion-kink-core/src/index';
// Codex144Security available for future use
// import { Codex144Security } from './Codex144Security';

/**
 * ⚗️ CodexNode - The Principle
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
export interface CodexNode {
  nodeIndex: number;           // 0-143
  name: string;
  description: string;
  consciousnessLevel: number;   // 0-21 (Major Arcana)
  frequency: number;            // Solfeggio frequency
  gateMappings: {
    primaryGate: number;
    harmonicGate: number;
    spiralGate: number;
  };
  chapelMapping: {
    chapelNumber: number;       // 1-8
    folioNumber: number;         // 0-143
  };
  roomMapping: {
    roomNumber: number;          // 1-99
  };
  qualityParameters: {
    intensity: number;
    sophistication: number;
    harmony_factor: number;
    emotional_resonance: number;
  };
  correspondences: Record<string, any>;
}

/**
 * ⚗️ CodexDepth - The Principle
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
export interface CodexDepth {
  depthIndex: number;            // 0-98 (multi-layered depth with sacred geometry)
  name: string;
  description: string;
  consciousnessEvolution: number; // 0-21
  dissolutionLevel: number;      // 0-10
  nodeConnections: number[];      // Connected nodes (0-143)
  gateConnections: number[];     // Connected gates (1-99)
  mathematicalProgression: {
    ratio: number;
    frequency: number;
    quality: number;
  };
}

// Trauma-aware: gentle, supportive, ESC exits, pause anytime
/**
 * ⚗️ Codex144Engine - The Crucible
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
export class Codex144Engine {
  private nodes: Map<number, CodexNode>;
  private depths: Map<number, CodexDepth>;
  private fusionKink: FusionKinkDesignMathematics;

  constructor() {
    this.nodes = new Map();
    this.depths = new Map();
    this.fusionKink = new FusionKinkDesignMathematics();
    // this.security = new Codex144Security();
    
    this.initializeNodes();
    this.initializeDepths();
  }

  private initializeNodes(): void {
    // Initialize all 144 nodes
    for (let nodeIndex = 0; nodeIndex < 144; nodeIndex++) {
      const consciousnessLevel = nodeIndex % 22; // Map to 0-21
      const frequency = consciousnessLevelToFrequency(consciousnessLevel);
      
      // Calculate gate mappings
      const gateMapping = nodeToGateMapping(nodeIndex);
      
      // Calculate chapel mapping (direct 1:1 for folio)
      const chapelNumber = Math.floor(nodeIndex / 18) + 1;
      const folioNumber = nodeIndex;
      
      // Calculate room mapping
      const roomNumber = Math.round((nodeIndex * SACRED_MATH.CATHEDRAL_RATIO) % 99) + 1;
      
      // Get quality parameters from Fusion Kink
      const qualityParams = this.fusionKink.calculateQualityParameters(consciousnessLevel);
      
      const node: CodexNode = {
        nodeIndex,
        name: this.generateNodeName(nodeIndex, consciousnessLevel),
        description: this.generateNodeDescription(nodeIndex, consciousnessLevel),
        consciousnessLevel,
        frequency,
        gateMappings: {
          primaryGate: gateMapping.primaryGate,
          harmonicGate: gateMapping.harmonicGate,
          spiralGate: gateMapping.spiralGate
        },
        chapelMapping: {
          chapelNumber,
          folioNumber
        },
        roomMapping: {
          roomNumber
        },
        qualityParameters: {
          intensity: qualityParams.intensity,
          sophistication: qualityParams.sophistication,
          harmony_factor: qualityParams.harmony_factor,
          emotional_resonance: qualityParams.emotional_resonance
        },
        correspondences: this.generateCorrespondences(nodeIndex, consciousnessLevel)
      };

      this.nodes.set(nodeIndex, node);
    }
  }

  private generateNodeName(nodeIndex: number, consciousnessLevel: number): string {
    const arcanaNames = [
      'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
      'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
      'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
      'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
    ];
    
    if (nodeIndex < 22) {
      return `${arcanaNames[nodeIndex]} Node`;
    }
    
    return `Node ${nodeIndex} (${arcanaNames[consciousnessLevel]} Path)`;
  }

  private generateNodeDescription(nodeIndex: number, consciousnessLevel: number): string {
    return `Codex Node ${nodeIndex} - Consciousness Level ${consciousnessLevel}. A manifestation point in the 144:99 lattice.`;
  }

  private generateCorrespondences(nodeIndex: number, consciousnessLevel: number): Record<string, any> {
    // Unified correspondences: Soyga, I Ching, Kabbalah, Evolutionary Astrology, Solfeggio, Fractal, Fusion Kink
    const soygaTable = (nodeIndex % 36) + 1;
    const ichingHexagram = (nodeIndex % 64) + 1;
    const kabbalahSephirah = (consciousnessLevel % 10) + 1;
    const kabbalahPath = consciousnessLevel; // 0-21 maps to 22 Paths
    const solfeggioFreq = consciousnessLevelToFrequency(consciousnessLevel);
    const fractalIteration = nodeIndex;
    const fusionKinkCard = (nodeIndex % 78) + 1;
    
    return {
      arcana: consciousnessLevel,
      node: nodeIndex,
      frequency: solfeggioFreq,
      ratio: SACRED_MATH.CATHEDRAL_RATIO,
      phi: SACRED_MATH.PHI,
      // Unified system correspondences
      soyga: {
        table: soygaTable,
        planetary: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'][nodeIndex % 7]
      },
      iching: {
        hexagram: ichingHexagram,
        changing_lines: [nodeIndex % 6 + 1]
      },
      kabbalah: {
        sephirah: kabbalahSephirah,
        path: kabbalahPath
      },
      astrology: {
        planetary_node: ['North Node', 'South Node'][nodeIndex % 2],
        evolution: consciousnessLevel
      },
      solfeggio: {
        frequency: solfeggioFreq,
        hz: solfeggioFreq
      },
      fractal: {
        iteration: fractalIteration,
        pattern: ['Mandelbrot', 'Julia', 'Sacred Geometry'][nodeIndex % 3]
      },
      fusion_kink: {
        card: fusionKinkCard,
        arcana: consciousnessLevel
      }
    };
  }

  private initializeDepths(): void {
    // Initialize all 99 depths
    for (let depthIndex = 0; depthIndex < 99; depthIndex++) {
      const consciousnessEvolution = Math.floor((depthIndex / 99) * 22);
      const dissolutionLevel = Math.floor(depthIndex / 10);
      
      // Calculate node connections (depths connect to multiple nodes)
      const nodeConnections: number[] = [];
      for (let i = 0; i < 144; i++) {
        const gateMapping = nodeToGateMapping(i);
        // Connect if this depth's gate number matches any gate mapping
        const depthGate = (depthIndex % 99) + 1;
        if (gateMapping.primaryGate === depthGate || 
            gateMapping.harmonicGate === depthGate || 
            gateMapping.spiralGate === depthGate) {
          nodeConnections.push(i);
        }
      }
      
      // Limit connections
      const limitedNodeConnections = nodeConnections.slice(0, 11);
      
      // Calculate gate connections
      const gateConnections = [(depthIndex % 99) + 1];
      
      const depth: CodexDepth = {
        depthIndex,
        name: `Depth ${depthIndex + 1}`,
        description: `Dissolution depth ${depthIndex + 1} - Consciousness evolution level ${consciousnessEvolution}`,
        consciousnessEvolution,
        dissolutionLevel,
        nodeConnections: limitedNodeConnections,
        gateConnections,
        mathematicalProgression: {
          ratio: SACRED_MATH.CATHEDRAL_RATIO,
          frequency: consciousnessLevelToFrequency(consciousnessEvolution),
          quality: dissolutionLevel
        }
      };

      this.depths.set(depthIndex, depth);
    }
  }

  /**
   * Get node by index (0-143)
   */
  getNode(nodeIndex: number): CodexNode | null {
    return this.nodes.get(nodeIndex) || null;
  }

  /**
   * Get all nodes
   */
  getAllNodes(): CodexNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get nodes by consciousness level (0-21)
   */
  getNodesByConsciousnessLevel(level: number): CodexNode[] {
    return Array.from(this.nodes.values()).filter(node => node.consciousnessLevel === level);
  }

  /**
   * Get depth by index (0-98)
   */
  getDepth(depthIndex: number): CodexDepth | null {
    return this.depths.get(depthIndex) || null;
  }

  /**
   * Get all depths
   */
  getAllDepths(): CodexDepth[] {
    return Array.from(this.depths.values());
  }

  /**
   * Get nodes connected to a gate
   */
  getNodesForGate(gateNumber: number): CodexNode[] {
    const nodes = gateToNodeMapping(gateNumber);
    return nodes.map(nodeIndex => this.nodes.get(nodeIndex)).filter((node): node is CodexNode => node !== undefined);
  }

  /**
   * Get nodes connected to a chapel
   */
  getNodesForChapel(chapelNumber: number): CodexNode[] {
    const folioStart = (chapelNumber - 1) * 18;
    const folioEnd = folioStart + 18;
    return Array.from(this.nodes.values()).filter(node => 
      node.nodeIndex >= folioStart && node.nodeIndex < folioEnd
    );
  }

  /**
   * Get nodes connected to a room
   */
  getNodesForRoom(roomNumber: number): CodexNode[] {
    return Array.from(this.nodes.values()).filter(node => 
      node.roomMapping.roomNumber === roomNumber
    );
  }
}

export default Codex144Engine;

