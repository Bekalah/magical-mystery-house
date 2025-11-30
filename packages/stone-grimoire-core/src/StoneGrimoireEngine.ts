/**
 * Stone Grimoire - 8 Chapels System
 * 
 * Sacred archive and chapel navigation system
 * 144 folios distributed across 8 chapels (18 per chapel)
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SACRED_MATH, nodeToGateMapping, goldenRectangle } from '../../sacred-mathematics-core/src/index';
// gateToNodeMapping available for future use

export interface Chapel {
  chapelNumber: number;        // 1-8
  name: string;
  element: string;
  direction: string;
  theme: string;
  description: string;
  folios: number[];            // 18 folios (0-143)
  nodeMappings: number[];       // Codex 144:99 nodes
  gateConnections: number[];    // Circui - 144:99 ratio compliance - Fibonacci-based sizing - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Organic, quality (not website-like) - Immersive 3D environments - Sacred geometry integrationtum99 gates (1-99)
  roomConnections: number[];    // Mystery House rooms (1-99)
  sacredGeometry: SacredGeometry;
  correspondences: ChapelCorrespondences;
  pathworkingNodes: PathworkingNode[]; // Organic story paths, Dynamic story transformation, Open world story exploration, Trauma-aware narrative design
  artTraditions: ArtTradition[]; // Museum-grade quality
  researchSources: ResearchSource[];
}

export interface SacredGeometry {
  goldenRatioProportions: { width: number; height: number };
  fibonacciSpacing: number[];
  cathedralRatio: number;
  geometricPattern: string;
  shape: string;
}

export interface ChapelCorrespondences {
  planet: string;
  zodiac: string;
  element: string;
  color: string;
  geometry: string;
  shemAngel?: string;
  goetiaDemon?: string;
  deity?: string;
  iChing?: string;
  soyga?: string;
}

export interface PathworkingNode {
  nodeId: string;
  title: string;
  description: string;
  exercises: string[];
  correspondences: Record<string, any>;
}

export interface ArtTradition {
  name: string;
  period: string;
  techniques: string[];
  masters: string[];
  authenticImplementations: string[];
}

export interface ResearchSource {
  name: string;
  type: 'library' | 'archive' | 'museum' | 'academic' | 'digital';
  url?: string;
  description: string;
}

export interface Folio {
  folioNumber: number;          // 0-143
  chapelNumber: number;         // 1-8
  nodeMapping: number;          // Codex 144:99 node
  content: {
    symbols: string[];
    spells: string[];
    correspondences: Record<string, any>;
  };
  sacredGeometry: {
    proportions: { width: number; height: number };
    pattern: string;
  };
  pathworkingConnections: string[];
}

export class StoneGrimoireEngine {
  private chapels: Map<number, Chapel>;
  private folios: Map<number, Folio>;
  constructor() {
    this.chapels = new Map();
    this.folios = new Map();
    
    this.initializeFolios();
    this.initializeChapels();
  }

  private initializeFolios(): void {
    // Create all 144 folios, distributed across 8 chapels (18 per chapel)
    for (let folioNum = 0; folioNum < 144; folioNum++) {
      const chapelNum = Math.floor(folioNum / 18) + 1;
      const nodeMapping = folioNum; // Direct 1:1 mapping
      
      // Calculate gate connections for this node (available for future use)
      // const gateConnections = gateToNodeMapping(nodeMapping);
      
      const folio: Folio = {
        folioNumber: folioNum,
        chapelNumber: chapelNum,
        nodeMapping,
        content: {
          symbols: [], // To be populated from discovered content
          spells: [],  // To be populated from discovered content
          correspondences: {}
        },
        sacredGeometry: {
          proportions: goldenRectangle(100 + (folioNum % 10) * 10),
          pattern: this.determineGeometricPattern(folioNum)
        },
        pathworkingConnections: this.calculatePathworkingConnections(folioNum)
      };

      this.folios.set(folioNum, folio);
    }
  }

  private determineGeometricPattern(folioNum: number): string {
    const patterns = ['Golden Spiral', 'Fibonacci Spiral', 'Sacred Lattice', 'Octagram', 'Pentagram', 'Vesica Piscis'];
    return patterns[folioNum % patterns.length];
  }

  private calculatePathworkingConnections(folioNum: number): string[] {
    const connections: string[] = [];
    
    // Connect to adjacent folios
    if (folioNum > 0) connections.push(`folio-${folioNum - 1}`);
    if (folioNum < 143) connections.push(`folio-${folioNum + 1}`);
    
    // Connect to chapel pathworking nodes
    const chapelNum = Math.floor(folioNum / 18) + 1;
    connections.push(`chapel-${chapelNum}-pathworking`);
    
    return connections;
  }

  private initializeChapels(): void {
    const chapelData = [
      {
        number: 1,
        name: 'Chapel of Fire & Initiation',
        element: 'Fire',
        direction: 'East',
        theme: 'Beginnings, Courage, Transformation',
        planet: 'Mars',
        zodiac: 'Aries',
        color: 'Red',
        geometry: 'Triangle'
      },
      {
        number: 2,
        name: 'Chapel of Water & Intuition',
        element: 'Water',
        direction: 'West',
        theme: 'Emotion, Intuition, Flow',
        planet: 'Moon',
        zodiac: 'Cancer',
        color: 'Blue',
        geometry: 'Crescent'
      },
      {
        number: 3,
        name: 'Chapel of Air & Communication',
        element: 'Air',
        direction: 'North',
        theme: 'Thought, Communication, Movement',
        planet: 'Mercury',
        zodiac: 'Gemini',
        color: 'Yellow',
        geometry: 'Circle'
      },
      {
        number: 4,
        name: 'Chapel of Earth & Manifestation',
        element: 'Earth',
        direction: 'South',
        theme: 'Stability, Manifestation, Grounding',
        planet: 'Saturn',
        zodiac: 'Capricorn',
        color: 'Green',
        geometry: 'Square'
      },
      {
        number: 5,
        name: 'Chapel of Spirit & Transcendence',
        element: 'Spirit',
        direction: 'Center',
        theme: 'Unity, Transcendence, Integration',
        planet: 'Sun',
        zodiac: 'Leo',
        color: 'Gold',
        geometry: 'Pentagram'
      },
      {
        number: 6,
        name: 'Chapel of Light & Illumination',
        element: 'Light',
        direction: 'Above',
        theme: 'Illumination, Wisdom, Clarity',
        planet: 'Jupiter',
        zodiac: 'Sagittarius',
        color: 'White',
        geometry: 'Hexagram'
      },
      {
        number: 7,
        name: 'Chapel of Shadow & Mystery',
        element: 'Shadow',
        direction: 'Below',
        theme: 'Mystery, Depth, Transformation',
        planet: 'Pluto',
        zodiac: 'Scorpio',
        color: 'Black',
        geometry: 'Octagram'
      },
      {
        number: 8,
        name: 'Chapel of Unity & Completion',
        element: 'Unity',
        direction: 'All Directions',
        theme: 'Completion, Integration, Wholeness',
        planet: 'Neptune',
        zodiac: 'Pisces',
        color: 'Violet',
        geometry: 'Circle of Unity'
      }
    ];

    chapelData.forEach(data => {
      const folioStart = (data.number - 1) * 18;
      const folios = Array.from({ length: 18 }, (_, i) => folioStart + i);
      const nodeMappings = folios; // Direct 1:1 mapping
      
      // Calculate gate connections from node mappings using nodeToGateMapping
      const gateConnections: number[] = [];
      nodeMappings.forEach(node => {
        const gateMapping = nodeToGateMapping(node);
        gateConnections.push(gateMapping.primaryGate, gateMapping.harmonicGate, gateMapping.spiralGate);
      });
      const uniqueGates = Array.from(new Set(gateConnections)).slice(0, 11); // Limit to 11 gates
      
      // Calculate room connections (simplified: chapel number maps to room ranges)
      const roomConnections = this.calculateRoomConnections(data.number);
      
      const chapel: Chapel = {
        chapelNumber: data.number,
        name: data.name,
        element: data.element,
        direction: data.direction,
        theme: data.theme,
        description: `${data.name} - ${data.theme}. A sacred space for exploration, learning, and pathworking.`,
        folios,
        nodeMappings,
        gateConnections: uniqueGates,
        roomConnections,
        sacredGeometry: {
          goldenRatioProportions: goldenRectangle(100 * data.number),
          fibonacciSpacing: this.calculateFibonacciSpacing(data.number),
          cathedralRatio: SACRED_MATH.CATHEDRAL_RATIO,
          geometricPattern: data.geometry,
          shape: data.geometry
        },
        correspondences: {
          planet: data.planet,
          zodiac: data.zodiac,
          element: data.element,
          color: data.color,
          geometry: data.geometry
        },
        pathworkingNodes: this.generatePathworkingNodes(data.number),
        artTraditions: this.generateArtTraditions(data.number),
        researchSources: this.generateResearchSources(data.number)
      };

      this.chapels.set(data.number, chapel);
    });
  }

  private calculateFibonacciSpacing(chapelNum: number): number[] {
    return SACRED_MATH.FIBONACCI.slice(0, 8).map(fib => fib * chapelNum);
  }

  private calculateRoomConnections(chapelNum: number): number[] {
    // Map chapel to Mystery House rooms
    // Each chapel connects to approximately 12-13 rooms
    const roomStart = (chapelNum - 1) * 12 + 1;
    return Array.from({ length: 12 }, (_, i) => roomStart + i).filter(r => r <= 99);
  }

  private generatePathworkingNodes(chapelNum: number): PathworkingNode[] {
    const nodes: PathworkingNode[] = [];
    
    for (let i = 0; i < 3; i++) {
      nodes.push({
        nodeId: `chapel-${chapelNum}-pathworking-${i + 1}`,
        title: `Pathworking Node ${i + 1}`,
        description: `Pathworking practice for ${this.chapels.get(chapelNum)?.name}`,
        exercises: [
          `Exercise 1 for Chapel ${chapelNum}`,
          `Exercise 2 for Chapel ${chapelNum}`,
          `Exercise 3 for Chapel ${chapelNum}`
        ],
        correspondences: {
          chapel: chapelNum,
          element: this.chapels.get(chapelNum)?.element,
          direction: this.chapels.get(chapelNum)?.direction
        }
      });
    }
    
    return nodes;
  }

  private generateArtTraditions(_chapelNum: number): ArtTradition[] {
    const traditions: ArtTradition[] = [
      {
        name: 'Sacred Geometry Art',
        period: 'Ancient to Modern',
        techniques: ['Golden Ratio Composition', 'Fibonacci Spiral', 'Sacred Lattice'],
        masters: ['Hilma af Klint', 'Emma Kunz', 'Leonora Carrington'],
        authenticImplementations: ['Geometric patterns', 'Sacred symbols', 'Mystical compositions']
      }
    ];
    
    return traditions;
  }

  private generateResearchSources(_chapelNum: number): ResearchSource[] {
    const sources: ResearchSource[] = [
      {
        name: 'Sacred Geometry Library',
        type: 'library',
        description: 'Comprehensive collection of sacred geometry texts'
      },
      {
        name: 'Mystical Archive',
        type: 'archive',
        description: 'Historical grimoires and esoteric texts'
      }
    ];
    
    return sources;
  }

  /**
   * Get chapel by number (1-8)
   */
  getChapel(chapelNumber: number): Chapel | null {
    return this.chapels.get(chapelNumber) || null;
  }

  /**
   * Get all chapels
   */
  getAllChapels(): Chapel[] {
    return Array.from(this.chapels.values());
  }

  /**
   * Get folio by number (0-143)
   */
  getFolio(folioNumber: number): Folio | null {
    return this.folios.get(folioNumber) || null;
  }

  /**
   * Get folios for a chapel
   */
  getFoliosForChapel(chapelNumber: number): Folio[] {
    return Array.from(this.folios.values()).filter(f => f.chapelNumber === chapelNumber);
  }

  /**
   * Get chapel for a folio
   */
  getChapelForFolio(folioNumber: number): Chapel | null {
    const folio = this.folios.get(folioNumber);
    if (!folio) return null;
    return this.chapels.get(folio.chapelNumber) || null;
  }
}

export default StoneGrimoireEngine;

