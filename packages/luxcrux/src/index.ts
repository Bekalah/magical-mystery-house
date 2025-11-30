/**
 * index
 * 
 * @package @cathedral/luxcrux
 */
/**
 * Luxcrux - Elemental Directions and Spatial Consciousness
 * 
 * Real implementation with master art principles
 */

import { SACRED_MATH, generateOctagon } from '@cathedral/master-art-principles';

/**
 * ⚗️ ElementalDirection - The Principle
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
export interface ElementalDirection {
  id: string;
  name: string;
  element: 'Fire' | 'Water' | 'Earth' | 'Air' | 'Spirit';
  direction: 'North' | 'South' | 'East' | 'West' | 'Center' | 'Above' | 'Below';
  color: string;
  geometry: { points: { x: number; y: number; z: number }[] };
  correspondences: {
    planet: string;
    zodiac: string;
    chakra: string;
    frequency: number;
  };
}

/**
 * ⚗️ Luxcrux - The Crucible
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
export class Luxcrux {
  private directions: Map<string, ElementalDirection> = new Map();

  constructor() {
    this.initializeDirections();
  }

  private initializeDirections(): void {
    const elements: Array<{ element: ElementalDirection['element']; direction: ElementalDirection['direction']; color: string; planet: string; zodiac: string; chakra: string; frequency: number }> = [
      { element: 'Fire', direction: 'South', color: '#FF4500', planet: 'Mars', zodiac: 'Aries', chakra: 'Solar Plexus', frequency: 528 },
      { element: 'Water', direction: 'West', color: '#1E90FF', planet: 'Moon', zodiac: 'Cancer', chakra: 'Sacral', frequency: 639 },
      { element: 'Earth', direction: 'North', color: '#8B4513', planet: 'Saturn', zodiac: 'Taurus', chakra: 'Root', frequency: 396 },
      { element: 'Air', direction: 'East', color: '#87CEEB', planet: 'Mercury', zodiac: 'Gemini', chakra: 'Heart', frequency: 741 },
      { element: 'Spirit', direction: 'Center', color: '#D4AF37', planet: 'Sun', zodiac: 'Leo', chakra: 'Crown', frequency: 852 },
    ];

    elements.forEach((elem, index) => {
      const radius = 50 * SACRED_MATH.PHI;
      const angle = (index * 360) / elements.length;
      const rad = (angle * Math.PI) / 180;
      
      const center = {
        x: Math.cos(rad) * radius * 2,
        y: 0,
        z: Math.sin(rad) * radius * 2,
      };

      const octagon = generateOctagon(radius, center);

      const direction: ElementalDirection = {
        id: `direction-${elem.element.toLowerCase()}`,
        name: `${elem.element} - ${elem.direction}`,
        element: elem.element,
        direction: elem.direction,
        color: elem.color,
        geometry: {
          points: octagon.map(p => ({ x: p.x, y: p.y || 0, z: 0 })),
        },
        correspondences: {
          planet: elem.planet,
          zodiac: elem.zodiac,
          chakra: elem.chakra,
          frequency: elem.frequency,
        },
      };

      this.directions.set(direction.id, direction);
    });
  }

  getDirection(id: string): ElementalDirection | undefined {
    return this.directions.get(id);
  }

  getAllDirections(): ElementalDirection[] {
    return Array.from(this.directions.values());
  }

  getDirectionByElement(element: ElementalDirection['element']): ElementalDirection | undefined {
    return Array.from(this.directions.values()).find(d => d.element === element);
  }
}
