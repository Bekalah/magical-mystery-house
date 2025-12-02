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

  /**
   * FIXED & PROTECTED: Generate unified correspondences with all system mappings
   * 
   * PROTECTION MARKER: DO NOT REMOVE UNIFIED CORRESPONDENCES
   * This function contains critical unified correspondence data required for:
   * - Game integration (codex-to-character mapping)
   * - Design tools (color palettes, geometries, flows)
   * - Creative neurodivergent mimic tech
   * - Master V1 integration
   * 
   * Includes: Soyga, I Ching, Kabbalah, Evolutionary Astrology, Solfeggio, Fractal, Fusion Kink
   * Last Updated: 2025-12-02 - Unified system mappings added and protected
   */
  private generateCorrespondences(nodeIndex: number, consciousnessLevel: number): Record<string, any> {
    // Core properties (always included)
    const core = {
      arcana: consciousnessLevel,
      node: nodeIndex,
      frequency: consciousnessLevelToFrequency(consciousnessLevel),
      ratio: SACRED_MATH.CATHEDRAL_RATIO,
      phi: SACRED_MATH.PHI
    };
    
    // PROTECTED: Generate unified correspondences inline (protected from import failures)
    const unified = this.generateUnifiedCorrespondencesInline(nodeIndex, consciousnessLevel);
    
    // PROTECTED: Return merged correspondences with all unified system mappings
    // DO NOT REMOVE these properties - they are required for integration
    return {
      ...core,
      // PROTECTED: Unified system mappings - DO NOT REMOVE
      soyga: unified.soyga,
      iChing: unified.iChing,
      kabbalah: unified.kabbalah,
      evolutionaryAstrology: unified.evolutionaryAstrology,
      solfeggio: unified.solfeggio,
      fractal: unified.fractal,
      fusionKink: unified.fusionKink,
      // Flow and aesthetic (high-end Japanese tech) - PROTECTED
      flow: this.calculateFlow(unified),
      aesthetic: this.determineAesthetic(unified)
    };
  }
  
  /**
   * PROTECTED: Fallback unified correspondences generator
   * This ensures unified mappings are always available even if external imports fail
   * DO NOT REMOVE - Required for proper codex functionality
   */
  private generateUnifiedCorrespondencesInline(nodeIndex: number, consciousnessLevel: number): any {
    const position = nodeIndex % 144;
    const level = consciousnessLevel % 22;
    
    return {
      soyga: {
        table: ['A', 'B', 'C', 'D'][Math.floor(position / 36)],
        letter: String.fromCharCode(65 + (position % 26)),
        number: (position % 36) + 1,
        color: `#${((position * 7) % 16777215).toString(16).padStart(6, '0')}`
      },
      iChing: {
        hexagram: ((position * 7 + level * 3) % 64) + 1,
        trigram: ['☰', '☷', '☳', '☴', '☵', '☲', '☶', '☱'][position % 8],
        name: `Hexagram ${((position * 7 + level * 3) % 64) + 1}`,
        meaning: `Harmonious flow at position ${position}`
      },
      kabbalah: {
        sephira: ['Kether', 'Chokmah', 'Binah', 'Chesed', 'Geburah', 'Tiphereth', 'Netzach', 'Hod', 'Yesod', 'Malkuth'][level % 10],
        path: (position % 22) + 1,
        hebrew: 'אבגדהוזסעפצקרשת'[position % 22] || 'א',
        meaning: `Path of ${['Kether', 'Chokmah', 'Binah', 'Chesed', 'Geburah', 'Tiphereth', 'Netzach', 'Hod', 'Yesod', 'Malkuth'][level % 10]}`
      },
      evolutionaryAstrology: {
        planet: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'][level % 10],
        sign: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][position % 12],
        house: (position % 12) + 1,
        aspect: ['Conjunction', 'Sextile', 'Square', 'Trine', 'Opposition'][level % 5]
      },
      solfeggio: {
        frequency: [174, 285, 396, 417, 528, 639, 741, 852, 963][level % 9],
        tone: ['UT', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'UT', 'RE'][level % 9],
        color: ['#9B59B6', '#3498DB', '#2ECC71', '#F39C12', '#E74C3C', '#1ABC9C', '#E67E22', '#95A5A6', '#34495E'][level % 9],
        healing: `Healing frequency for consciousness level ${level}`
      },
      fractal: {
        pattern: ['Mandelbrot', 'Julia', 'IFS', 'L-System', 'Sacred Geometry'][position % 5],
        depth: Math.floor(position / 28) + 3,
        signature: `Fractal-${position}-${level}`,
        sound: [174, 285, 396, 417, 528, 639, 741, 852, 963][level % 9] * (1 + position / 144)
      },
      fusionKink: {
        intensity: (position % 100) / 100,
        sophistication: (level * 5) / 100,
        harmony: ((position + level) % 100) / 100,
        resonance: ((position * level) % 100) / 100
      }
    };
  }
  
  /**
   * PROTECTED: Calculate flow from unified correspondences
   * Required for high-end Japanese tech aesthetic
   */
  private calculateFlow(unified: any): number {
    if (!unified || !unified.fusionKink) return 0.5;
    return (unified.fusionKink.harmony * 0.4 + 
            unified.fusionKink.sophistication * 0.3 + 
            unified.fusionKink.resonance * 0.3);
  }
  
  /**
   * PROTECTED: Determine aesthetic from flow
   * Required for optimal design flow (harmonious, flowing, minimal, dynamic)
   */
  private determineAesthetic(unified: any): string {
    const flow = this.calculateFlow(unified);
    return flow > 0.8 ? 'harmonious' :
           flow > 0.6 ? 'flowing' :
           flow > 0.4 ? 'minimal' : 'dynamic';
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
