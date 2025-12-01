/**
 * Magical Mystery House - 99 Rooms System
 * 
 * Open-world exploration system with 99 explorable rooms
 * Each room connects to gates, nodes, chapels, and arcana
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SACRED_MATH, gateToNodeMapping } from '../../sacred-mathematics-core/src/index';
// nodeToGateMapping available for future use

/**
 * ⚗️ MysteryRoom - The Principle
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
export interface MysteryRoom {
  roomNumber: number;          // 1-99
  name: string;
  theme: string;
  description: string;
  type: 'library' | 'laboratory' | 'studio' | 'chamber' | 'hall' | 'garden' | 'temple';
  tier: 'Foundation' | 'Growth' | 'Integration' | 'Harmonic' | 'Spiral';
  features: RoomFeature[];
  correspondences: RoomCorrespondences;
  arcanaConnections: number[]; // Major Arcana (0-21)
  gateConnections: number[];  // Circui - 144:99 ratio compliance - Fibonacci-based sizing - Golden ratio proportions - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integrationtum99 gates (1-99)
  nodeConnections: number[];  // Codex 144:99 nodes (0-143)
  chapelConnections: number[]; // Stone Grimoire chapels (1-8)
  research: ResearchSource[];
  art: ArtTradition[]; // Museum-grade quality
  science: ScienceTradition[];
  pathworking: PathworkingNode[]; // Organic story paths, Dynamic story transformation, Open world story exploration, Trauma-aware narrative design
  unlockCondition?: string;
  connections: number[];       // Connected room numbers
}

/**
 * ⚗️ RoomFeature - The Principle
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
export interface RoomFeature {
  id: string;
  name: string;
  type: 'interactive' | 'exploration' | 'creation' | 'learning' | 'pathworking' | 'character';
  description: string;
  arcana?: number; // Which Arcana character is featured
  connections?: string[];
}

/**
 * ⚗️ RoomCorrespondences - The Principle
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
export interface RoomCorrespondences {
  element?: string;
  planet?: string;
  zodiac?: string;
  shemAngel?: string;
  goetiaDemon?: string;
  deity?: string;
  iChing?: string;
  soyga?: string;
  kabbalah?: string;
  astrology?: string;
  solfeggio?: string;
  fractal?: string;
  fusion_kink?: string;
}

/**
 * ⚗️ ResearchSource - The Principle
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
export interface ResearchSource {
  name: string;
  type: 'library' | 'archive' | 'museum' | 'academic' | 'digital';
  url?: string;
  description: string;
}

/**
 * ⚗️ ArtTradition - The Principle
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
export interface ArtTradition {
  name: string;
  period: string;
  techniques: string[];
  masters: string[];
  authenticImplementations: string[];
}

/**
 * ⚗️ ScienceTradition - The Principle
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
export interface ScienceTradition {
  name: string;
  period: string;
  fields: string[];
  scientists: string[];
  discoveries: string[];
}

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
  id: string;
  title: string;
  description: string;
  exercises: string[];
  correspondences: Record<string, any>;
}

/**
 * ⚗️ MysteryHouseEngine - The Crucible
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
export class MysteryHouseEngine {
  private rooms: Map<number, MysteryRoom>;

  constructor() {
    this.rooms = new Map();
    this.initializeRooms();
  }

  private initializeRooms(): void {
    // Initialize all 99 rooms
    for (let roomNum = 1; roomNum <= 99; roomNum++) {
      const tier = this.determineTier(roomNum);
      const type = this.determineType(roomNum);
      
      // Calculate mathematical correspondences
      const gateConnections = [roomNum]; // Direct 1:1 mapping
      const nodeConnections = this.calculateNodeConnections(roomNum);
      const chapelConnections = this.calculateChapelConnections(roomNum);
      const arcanaConnections = this.calculateArcanaConnections(roomNum);
      
      const room: MysteryRoom = {
        roomNumber: roomNum,
        name: this.generateRoomName(roomNum, tier),
        theme: this.generateTheme(roomNum, tier),
        description: this.generateDescription(roomNum, tier, type),
        type,
        tier,
        features: this.generateFeatures(roomNum, type),
        correspondences: this.generateCorrespondences(roomNum),
        arcanaConnections,
        gateConnections,
        nodeConnections,
        chapelConnections,
        research: this.generateResearchSources(roomNum),
        art: this.generateArtTraditions(roomNum),
        science: this.generateScienceTraditions(roomNum),
        pathworking: this.generatePathworkingNodes(roomNum),
        connections: this.calculateRoomConnections(roomNum)
      };

      this.rooms.set(roomNum, room);
    }
  }

  private determineTier(roomNum: number): 'Foundation' | 'Growth' | 'Integration' | 'Harmonic' | 'Spiral' {
    if (roomNum <= 11) return 'Foundation';
    if (roomNum <= 22) return 'Growth';
    if (roomNum <= 33) return 'Integration';
    if (roomNum <= 66) return 'Harmonic';
    return 'Spiral';
  }

  private determineType(roomNum: number): 'library' | 'laboratory' | 'studio' | 'chamber' | 'hall' | 'garden' | 'temple' {
    const types: Array<'library' | 'laboratory' | 'studio' | 'chamber' | 'hall' | 'garden' | 'temple'> = 
      ['library', 'laboratory', 'studio', 'chamber', 'hall', 'garden', 'temple'];
    return types[(roomNum - 1) % types.length];
  }

  private calculateNodeConnections(roomNum: number): number[] {
    // Room-to-Node Mapping: Node = round((Room Number × CATHEDRAL_RATIO) % 144)
    const primaryNode = Math.round((roomNum * SACRED_MATH.CATHEDRAL_RATIO) % 144);
    
    // Also get nodes from gate connections (room number = gate number)
    const gateNodes = gateToNodeMapping(roomNum);
    
    const allNodes = [primaryNode, ...gateNodes];
    return Array.from(new Set(allNodes)).slice(0, 5);
  }

  private calculateChapelConnections(roomNum: number): number[] {
    // Room-to-Chapel Mapping: Chapel = ((Room Number - 1) % 8) + 1
    const chapel = ((roomNum - 1) % 8) + 1;
    return [chapel];
  }

  private calculateArcanaConnections(roomNum: number): number[] {
    // Map room to Major Arcana (0-21)
    // Rooms 1-22 map directly to Arcana 0-21
    if (roomNum <= 22) {
      return [roomNum - 1];
    }
    // For rooms 23-99, use mathematical mapping
    return [(roomNum - 1) % 22];
  }

  private generateRoomName(roomNum: number, tier: string): string {
    const tierNames: Record<string, string[]> = {
      'Foundation': ['The Beginning', 'The Threshold', 'The Initiation', 'The Awakening'],
      'Growth': ['The Expansion', 'The Development', 'The Evolution', 'The Flourishing'],
      'Integration': ['The Synthesis', 'The Harmony', 'The Balance', 'The Unity'],
      'Harmonic': ['The Resonance', 'The Frequency', 'The Vibration', 'The Wave'],
      'Spiral': ['The Ascent', 'The Transcendence', 'The Completion', 'The Return']
    };
    
    const names = tierNames[tier] || tierNames['Foundation'];
    return `${names[roomNum % names.length]} - Room ${roomNum}`;
  }

  private generateTheme(roomNum: number, tier: string): string {
    const themes: Record<string, string[]> = {
      'Foundation': ['Beginnings', 'Potential', 'Discovery', 'Exploration'],
      'Growth': ['Development', 'Learning', 'Expansion', 'Progress'],
      'Integration': ['Synthesis', 'Harmony', 'Balance', 'Unity'],
      'Harmonic': ['Resonance', 'Frequency', 'Vibration', 'Wave'],
      'Spiral': ['Ascent', 'Transcendence', 'Completion', 'Return']
    };
    
    const tierThemes = themes[tier] || themes['Foundation'];
    return tierThemes[roomNum % tierThemes.length];
  }

  private generateDescription(roomNum: number, tier: string, type: string): string {
    return `Room ${roomNum} - A ${type} in the ${tier} tier. An explorable space for research, art, science, and interactive exploration.`;
  }

  private generateFeatures(roomNum: number, type: string): RoomFeature[] {
    const features: RoomFeature[] = [
      {
        id: `room-${roomNum}-feature-1`,
        name: 'Interactive Exploration',
        type: 'exploration',
        description: `Explore the ${type} and discover its secrets`,
        connections: [`room-${roomNum}`]
      },
      {
        id: `room-${roomNum}-feature-2`,
        name: 'Learning Station',
        type: 'learning',
        description: `Learn about the correspondences and traditions of this ${type}`,
        connections: [`room-${roomNum}`]
      }
    ];
    
    return features;
  }

  private generateCorrespondences(roomNum: number): RoomCorrespondences {
    const elements = ['Fire', 'Water', 'Air', 'Earth', 'Spirit'];
    const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
    
    return {
      element: elements[roomNum % elements.length],
      planet: planets[roomNum % planets.length]
    };
  }

  private generateResearchSources(_roomNum: number): ResearchSource[] {
    return [
      {
        name: `Research Library ${_roomNum}`,
        type: 'library',
        description: `Comprehensive research sources for Room ${_roomNum}`
      }
    ];
  }

  private generateArtTraditions(_roomNum: number): ArtTradition[] {
    return [
      {
        name: 'Sacred Geometry Art',
        period: 'Ancient to Modern',
        techniques: ['Golden Ratio', 'Fibonacci Spiral', 'Sacred Lattice'],
        masters: ['Hilma af Klint', 'Emma Kunz', 'Leonora Carrington'],
        authenticImplementations: ['Geometric patterns', 'Mystical compositions']
      }
    ];
  }

  private generateScienceTraditions(_roomNum: number): ScienceTradition[] {
    return [
      {
        name: 'Sacred Mathematics',
        period: 'Ancient to Modern',
        fields: ['Geometry', 'Harmonics', 'Frequency'],
        scientists: ['Pythagoras', 'Kepler', 'Tesla'],
        discoveries: ['Golden Ratio', 'Fibonacci Sequence', 'Solfeggio Frequencies']
      }
    ];
  }

  private generatePathworkingNodes(roomNum: number): PathworkingNode[] {
    return [
      {
        id: `room-${roomNum}-pathworking-1`,
        title: `Pathworking Node 1`,
        description: `Pathworking practice for Room ${roomNum}`,
        exercises: [
          `Exercise 1 for Room ${roomNum}`,
          `Exercise 2 for Room ${roomNum}`
        ],
        correspondences: {
          room: roomNum,
          gate: roomNum,
          node: this.calculateNodeConnections(roomNum)[0]
        }
      }
    ];
  }

  private calculateRoomConnections(roomNum: number): number[] {
    const connections: number[] = [];
    
    // Connect to adjacent rooms
    if (roomNum > 1) connections.push(roomNum - 1);
    if (roomNum < 99) connections.push(roomNum + 1);
    
    // Connect to rooms in same tier
    const tier = this.determineTier(roomNum);
    const tierRanges: Record<string, [number, number]> = {
      'Foundation': [1, 11],
      'Growth': [12, 22],
      'Integration': [23, 33],
      'Harmonic': [34, 66],
      'Spiral': [67, 99]
    };
    
    const [start, end] = tierRanges[tier] || [1, 99];
    for (let i = start; i <= end && i !== roomNum; i++) {
      if (Math.abs(i - roomNum) <= 2) {
        connections.push(i);
      }
    }
    
    const uniqueConnections = Array.from(new Set(connections));
    return uniqueConnections.slice(0, 5);
  }

  /**
   * Get room by number (1-99)
   */
  getRoom(roomNumber: number): MysteryRoom | null {
    return this.rooms.get(roomNumber) || null;
  }

  /**
   * Get all rooms
   */
  getAllRooms(): MysteryRoom[] {
    return Array.from(this.rooms.values());
  }

  /**
   * Get rooms by tier
   */
  getRoomsByTier(tier: 'Foundation' | 'Growth' | 'Integration' | 'Harmonic' | 'Spiral'): MysteryRoom[] {
    return Array.from(this.rooms.values()).filter(room => room.tier === tier);
  }

  /**
   * Get rooms by type
   */
  getRoomsByType(type: 'library' | 'laboratory' | 'studio' | 'chamber' | 'hall' | 'garden' | 'temple'): MysteryRoom[] {
    return Array.from(this.rooms.values()).filter(room => room.type === type);
  }

  /**
   * Get rooms connected to a gate
   */
  getRoomsForGate(gateNumber: number): MysteryRoom[] {
    return Array.from(this.rooms.values()).filter(room => 
      room.gateConnections.includes(gateNumber)
    );
  }

  /**
   * Get rooms connected to a node
   */
  getRoomsForNode(nodeNumber: number): MysteryRoom[] {
    return Array.from(this.rooms.values()).filter(room => 
      room.nodeConnections.includes(nodeNumber)
    );
  }

  /**
   * Get rooms connected to a chapel
   */
  getRoomsForChapel(chapelNumber: number): MysteryRoom[] {
    return Array.from(this.rooms.values()).filter(room => 
      room.chapelConnections.includes(chapelNumber)
    );
  }
}

export default MysteryHouseEngine;

