/**
 * Art Engine - Sacred Geometry & Visual Creation
 * 
 * Creates art from Codex144 nodes using sacred geometry
 * Integrates 144:99 ratio, golden ratio, Fibonacci, and consciousness mapping
 * 
 * @license CC0-1.0 - Public Domain
 */

// Codex144Engine and SACRED_MATH available if needed
// import { Codex144Engine } from '../../codex-144-99-core/src/index';
// import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

export interface ArtNode {
  nodeIndex: number;
  geometry: GeometryShape;
  colors: ColorPalette;
  patterns: Pattern[];
  composition: Composition;
  consciousnessLevel: number;
  sacredRatio: number;
}

export interface GeometryShape {
  type: 'circle' | 'square' | 'triangle' | 'pentagon' | 'hexagon' | 'spiral' | 'mandala';
  vertices: Point[];
  center: Point;
  radius: number;
  rotation: number;
  scale: number;
}

export interface Point {
  x: number;
  y: number;
  z?: number;
}

export interface ColorPalette {
  primary: Color;
  secondary: Color;
  accent: Color[];
  background: Color;
  consciousnessBased: boolean;
}

export interface Color {
  r: number;  // 0-255
  g: number;  // 0-255
  b: number;  // 0-255
  a: number;  // 0-1
}

export interface Pattern {
  type: 'fractal' | 'sacred-geometry' | 'organic' | 'geometric';
  complexity: number;
  iterations: number;
  seed: number;
}

export interface Composition {
  layout: 'golden-ratio' | 'rule-of-thirds' | 'sacred-geometry' | 'fibonacci';
  focalPoints: Point[];
  balance: 'symmetrical' | 'asymmetrical' | 'radial';
  depth: number;
}

export interface ArtComposition {
  nodes: ArtNode[];
  canvas: {
    width: number;
    height: number;
    aspectRatio: number; // 144:99 ratio
  };
  sacredGeometry: {
    ratio: number;
    goldenRatio: number;
    fibonacci: number;
  };
}

/**
 * Art Engine - Creates art from Codex144 nodes
 */
export class ArtEngine {
  // private codex144: Codex144Engine; // Available if needed
  // private compositions: Map<number, ArtComposition>; // Available if needed

  // Sacred ratios
  private readonly GOLDEN_RATIO = 1.618033988749895;
  private readonly RATIO_144_99 = 144 / 99;
  private readonly FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  // Color mappings for consciousness levels (0-21)
  private readonly CONSCIOUSNESS_COLORS: Color[] = [
    { r: 0, g: 0, b: 0, a: 1 },        // 0: Black (void)
    { r: 20, g: 10, b: 30, a: 1 },     // 1: Deep purple
    { r: 40, g: 20, b: 60, a: 1 },     // 2: Purple
    { r: 60, g: 30, b: 90, a: 1 },     // 3: Light purple
    { r: 80, g: 40, b: 120, a: 1 },   // 4: Blue-purple
    { r: 0, g: 50, b: 100, a: 1 },     // 5: Blue
    { r: 0, g: 100, b: 150, a: 1 },   // 6: Cyan-blue
    { r: 0, g: 150, b: 200, a: 1 },   // 7: Light cyan
    { r: 0, g: 200, b: 200, a: 1 },   // 8: Cyan
    { r: 0, g: 200, b: 150, a: 1 },   // 9: Teal
    { r: 0, g: 200, b: 100, a: 1 },   // 10: Green-teal
    { r: 50, g: 200, b: 50, a: 1 },   // 11: Green
    { r: 100, g: 200, b: 0, a: 1 },   // 12: Yellow-green
    { r: 150, g: 200, b: 0, a: 1 },   // 13: Lime
    { r: 200, g: 200, b: 0, a: 1 },   // 14: Yellow
    { r: 200, g: 150, b: 0, a: 1 },   // 15: Orange-yellow
    { r: 200, g: 100, b: 0, a: 1 },   // 16: Orange
    { r: 200, g: 50, b: 0, a: 1 },    // 17: Red-orange
    { r: 200, g: 0, b: 50, a: 1 },    // 18: Red
    { r: 200, g: 0, b: 100, a: 1 },   // 19: Magenta-red
    { r: 200, g: 0, b: 150, a: 1 },   // 20: Magenta
    { r: 255, g: 255, b: 255, a: 1 }  // 21: White (transcendence)
  ];

  constructor() {
    // Codex144Engine and compositions available if needed
    // this.codex144 = new Codex144Engine();
    // this.compositions = new Map();
  }

  /**
   * Create art node from Codex144 node
   */
  public createArtNode(nodeIndex: number): ArtNode {
    // Input validation
    if (typeof nodeIndex !== 'number' || nodeIndex < 0 || nodeIndex >= 144 || !Number.isInteger(nodeIndex)) {
      throw new Error(`Invalid nodeIndex: ${nodeIndex}. Must be an integer between 0 and 143.`);
    }
    
    // Codex144Engine may not have direct getNode method, create node data from index
    const consciousnessLevel = Math.floor((nodeIndex / 144) * 22);

    // Create geometry based on node
    const geometry = this.createGeometry(nodeIndex, { consciousnessLevel });
    
    // Create color palette
    const colors = this.createColorPalette(consciousnessLevel, nodeIndex);
    
    // Create patterns
    const patterns = this.createPatterns(nodeIndex, { consciousnessLevel });
    
    // Create composition
    const composition = this.createCompositionLayout(nodeIndex, { consciousnessLevel });

    return {
      nodeIndex,
      geometry,
      colors,
      patterns,
      composition,
      consciousnessLevel,
      sacredRatio: this.calculateSacredRatio(nodeIndex)
    };
  }

  /**
   * Create geometry shape
   */
  private createGeometry(nodeIndex: number, codexNode: { consciousnessLevel: number }): GeometryShape {
    const types: GeometryShape['type'][] = ['circle', 'square', 'triangle', 'pentagon', 'hexagon', 'spiral', 'mandala'];
    const type = types[nodeIndex % types.length];
    
    const center: Point = { x: 0, y: 0, z: 0 };
    const radius = 100 * (1 + (codexNode.consciousnessLevel / 21) * 0.5);
    
    // Generate vertices based on type
    const vertices = this.generateVertices(type, center, radius, nodeIndex);
    
    // Rotation based on node index and golden ratio
    const rotation = (nodeIndex * this.GOLDEN_RATIO * 360) % 360;
    
    // Scale based on consciousness
    const scale = 1 + (codexNode.consciousnessLevel / 21) * 0.5;

    return {
      type,
      vertices,
      center,
      radius,
      rotation,
      scale
    };
  }

  /**
   * Generate vertices for shape
   */
  private generateVertices(type: GeometryShape['type'], center: Point, radius: number, nodeIndex: number): Point[] {
    const vertices: Point[] = [];
    let sides = 3;
    
    switch (type) {
      case 'circle':
        sides = 64; // Smooth circle
        break;
      case 'square':
        sides = 4;
        break;
      case 'triangle':
        sides = 3;
        break;
      case 'pentagon':
        sides = 5;
        break;
      case 'hexagon':
        sides = 6;
        break;
      case 'spiral':
        // Spiral uses different generation
        return this.generateSpiral(center, radius, nodeIndex);
      case 'mandala':
        sides = 8; // Octagon base
        break;
    }
    
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * 2 * Math.PI;
      vertices.push({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        z: center.z || 0
      });
    }
    
    return vertices;
  }

  /**
   * Generate spiral vertices
   */
  private generateSpiral(center: Point, radius: number, _nodeIndex: number): Point[] {
    const vertices: Point[] = [];
    const turns = 3;
    const pointsPerTurn = 20;
    
    for (let i = 0; i < turns * pointsPerTurn; i++) {
      const t = i / (turns * pointsPerTurn);
      const angle = t * turns * 2 * Math.PI;
      const r = radius * t;
      
      vertices.push({
        x: center.x + r * Math.cos(angle),
        y: center.y + r * Math.sin(angle),
        z: center.z || (t * 10) // 3D spiral
      });
    }
    
    return vertices;
  }

  /**
   * Create color palette
   */
  private createColorPalette(consciousnessLevel: number, nodeIndex: number): ColorPalette {
    // Primary color from consciousness level
    const primary = this.CONSCIOUSNESS_COLORS[Math.min(consciousnessLevel, 21)];
    
    // Secondary color (complementary or adjacent)
    const secondaryIndex = (consciousnessLevel + 7) % 22;
    const secondary = this.CONSCIOUSNESS_COLORS[secondaryIndex];
    
    // Accent colors (Fibonacci-based selection)
    const accent: Color[] = [];
    for (let i = 0; i < 3; i++) {
      const fibIndex = (nodeIndex + this.FIBONACCI[i]) % 22;
      accent.push(this.CONSCIOUSNESS_COLORS[fibIndex]);
    }
    
    // Background (opposite end of spectrum)
    const backgroundIndex = (22 - consciousnessLevel) % 22;
    const background = this.CONSCIOUSNESS_COLORS[backgroundIndex];
    background.a = 0.1; // Transparent background

    return {
      primary,
      secondary,
      accent,
      background,
      consciousnessBased: true
    };
  }

  /**
   * Create patterns
   */
  private createPatterns(nodeIndex: number, codexNode: { consciousnessLevel: number }): Pattern[] {
    const patterns: Pattern[] = [];
    
    // Fractal pattern
    if (nodeIndex % 3 === 0) {
      patterns.push({
        type: 'fractal',
        complexity: 3 + (codexNode.consciousnessLevel % 5),
        iterations: 5 + (nodeIndex % 10),
        seed: nodeIndex
      });
    }
    
    // Sacred geometry pattern
    if (nodeIndex % 5 === 0) {
      patterns.push({
        type: 'sacred-geometry',
        complexity: 2 + (codexNode.consciousnessLevel % 4),
        iterations: 3 + (nodeIndex % 7),
        seed: nodeIndex * 7
      });
    }
    
    // Organic pattern
    if (nodeIndex % 7 === 0) {
      patterns.push({
        type: 'organic',
        complexity: 1 + (codexNode.consciousnessLevel % 3),
        iterations: 4 + (nodeIndex % 6),
        seed: nodeIndex * 13
      });
    }
    
    return patterns;
  }

  /**
   * Create composition layout
   */
  private createCompositionLayout(nodeIndex: number, codexNode: { consciousnessLevel: number }): Composition {
    const layouts: Composition['layout'][] = ['golden-ratio', 'rule-of-thirds', 'sacred-geometry', 'fibonacci'];
    const layout = layouts[nodeIndex % layouts.length];
    
    // Focal points based on golden ratio
    const focalPoints: Point[] = [];
    const phi = this.GOLDEN_RATIO;
    
    // Golden ratio focal points
    focalPoints.push({ x: 100 * (phi - 1), y: 100 * (phi - 1) });
    focalPoints.push({ x: -100 * (phi - 1), y: 100 * (phi - 1) });
    focalPoints.push({ x: 100 * (phi - 1), y: -100 * (phi - 1) });
    
    // Balance based on consciousness
    const balance: Composition['balance'] = 
      codexNode.consciousnessLevel < 7 ? 'symmetrical' :
      codexNode.consciousnessLevel < 14 ? 'asymmetrical' :
      'radial';
    
    // Depth based on consciousness
    const depth = codexNode.consciousnessLevel / 21;

    return {
      layout,
      focalPoints,
      balance,
      depth
    };
  }

  /**
   * Calculate sacred ratio
   */
  private calculateSacredRatio(nodeIndex: number): number {
    const ratio144_99 = this.RATIO_144_99;
    const phi = this.GOLDEN_RATIO;
    const fibIndex = nodeIndex % this.FIBONACCI.length;
    const fibValue = this.FIBONACCI[fibIndex];
    
    return (ratio144_99 * phi) / fibValue;
  }

  /**
   * Create art composition from multiple nodes
   */
  public createArtComposition(nodeIndices: number[], canvasWidth: number = 1920, _canvasHeight: number = 1080): ArtComposition {
    // Input validation
    if (!Array.isArray(nodeIndices) || nodeIndices.length === 0) {
      throw new Error('nodeIndices must be a non-empty array');
    }
    if (nodeIndices.some(idx => typeof idx !== 'number' || idx < 0 || idx >= 144 || !Number.isInteger(idx))) {
      throw new Error('All nodeIndices must be integers between 0 and 143');
    }
    if (typeof canvasWidth !== 'number' || canvasWidth <= 0) {
      throw new Error('canvasWidth must be a positive number');
    }
    const artNodes = nodeIndices.map(index => this.createArtNode(index));
    
    // Use 144:99 ratio for canvas
    const aspectRatio = this.RATIO_144_99;
    const adjustedHeight = canvasWidth / aspectRatio;
    
    return {
      nodes: artNodes,
      canvas: {
        width: canvasWidth,
        height: adjustedHeight,
        aspectRatio
      },
      sacredGeometry: {
        ratio: this.RATIO_144_99,
        goldenRatio: this.GOLDEN_RATIO,
        fibonacci: this.FIBONACCI[nodeIndices.length % this.FIBONACCI.length]
      }
    };
  }

  /**
   * Generate SVG from art node
   */
  public generateSVG(artNode: ArtNode, width: number = 800, _height: number = 600): string {
    // Input validation
    if (!artNode) {
      throw new Error('artNode is required');
    }
    if (typeof width !== 'number' || width <= 0) {
      throw new Error('width must be a positive number');
    }
    const aspectRatio = this.RATIO_144_99;
    const adjustedHeight = width / aspectRatio;
    
    let svg = `<svg width="${width}" height="${adjustedHeight}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Background
    const bg = artNode.colors.background;
    svg += `<rect width="${width}" height="${adjustedHeight}" fill="rgba(${bg.r},${bg.g},${bg.b},${bg.a})"/>`;
    
    // Draw geometry
    const vertices = artNode.geometry.vertices;
    if (vertices.length > 0) {
      const points = vertices.map(v => `${v.x + width/2},${v.y + adjustedHeight/2}`).join(' ');
      
      if (artNode.geometry.type === 'spiral') {
        // Draw spiral as path
        let path = `M ${vertices[0].x + width/2} ${vertices[0].y + adjustedHeight/2}`;
        for (let i = 1; i < vertices.length; i++) {
          path += ` L ${vertices[i].x + width/2} ${vertices[i].y + adjustedHeight/2}`;
        }
        const color = artNode.colors.primary;
        svg += `<path d="${path}" stroke="rgba(${color.r},${color.g},${color.b},${color.a})" fill="none" stroke-width="2"/>`;
      } else {
        // Draw polygon
        const color = artNode.colors.primary;
        svg += `<polygon points="${points}" fill="rgba(${color.r},${color.g},${color.b},${color.a * 0.5})" stroke="rgba(${color.r},${color.g},${color.b},${color.a})" stroke-width="2"/>`;
      }
    }
    
    svg += `</svg>`;
    return svg;
  }

  /**
   * Get all art nodes for a range
   */
  public getArtNodes(startIndex: number = 0, endIndex: number = 143): ArtNode[] {
    const nodes: ArtNode[] = [];
    for (let i = startIndex; i <= endIndex && i <= 143; i++) {
      try {
        nodes.push(this.createArtNode(i));
      } catch (e) {
        // Skip invalid nodes
      }
    }
    return nodes;
  }
}

