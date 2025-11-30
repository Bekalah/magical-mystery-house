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
