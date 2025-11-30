/**
 * Creative Codex Mapper
 * 
 * @package @cathedral/shared
 * @license CC0-1.0 - Public Domain
 * 
 * Creative tool for mapping Codex 144:99 nodes to visual/audio properties
 * Use in: Art apps, visual apps, game apps, codex apps
 * 
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate mappings
 */

export interface CodexMapping {
  nodeId: number;
  visual: {
    color: string;
    geometry: string;
    position: { x: number; y: number; z: number };
  };
  audio: {
    frequency: number;
    harmonics: number[];
  };
  creativeUse: string;
}

/**
 * Map Codex nodes to creative properties
 * 
 * Creative applications:
 * - Art apps: Generate art from Codex
 * - Visual apps: Visualize Codex nodes
 * - Game apps: Use Codex in gameplay
 * - Audio apps: Generate sound from Codex
 */
export class CreativeCodexMapper {
  /**
   * Map Codex node to visual/audio properties
   * Creative use: Art apps, visual apps, game apps, audio apps
   */
  mapNode(nodeId: number): CodexMapping {
    const phi = (1 + Math.sqrt(5)) / 2;
    const angle = nodeId * (144 / 99) * Math.PI * 2;
    const radius = Math.sqrt(nodeId) * 10;
    
    return {
      nodeId,
      visual: {
        color: this.nodeToColor(nodeId),
        geometry: this.nodeToGeometry(nodeId),
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: nodeId * phi * 0.1
        }
      },
      audio: {
        frequency: 174 + (nodeId % 9) * 111, // Solfeggio range
        harmonics: this.generateHarmonics(nodeId)
      },
      creativeUse: 'Art apps, visual apps, game apps, audio apps - Map Codex to creative properties'
    };
  }

  private nodeToColor(nodeId: number): string {
    const hue = (nodeId * 137.508) % 360; // Golden angle
    return `hsl(${hue}, 70%, 50%)`;
  }

  private nodeToGeometry(nodeId: number): string {
    const geometries = ['circle', 'vesica-piscis', 'pentagram', 'octagon', 'flower-of-life', 'metatron-cube'];
    return geometries[nodeId % geometries.length];
  }

  private generateHarmonics(nodeId: number): number[] {
    const base = 174 + (nodeId % 9) * 111;
    return [base, base * 2, base * goldenRatio, base * 3];
  }
}

const goldenRatio = (1 + Math.sqrt(5)) / 2;
export const creativeCodexMapper = new CreativeCodexMapper();

