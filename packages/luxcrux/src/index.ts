/**
 * Luxcrux - Elemental directions and spatial consciousness
 * 
 * Core package for the Cathedral of Circuits that provides
 * elemental directional awareness and spatial consciousness mapping.
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */

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
  name: string;
  element: 'fire' | 'water' | 'air' | 'earth' | 'spirit';
  direction: 'north' | 'south' | 'east' | 'west' | 'center';
  frequency: number;
  color: string;
  energy: string;
}

/**
 * ⚗️ SpatialConsciousness - The Principle
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
export interface SpatialConsciousness {
  position: { x: number; y: number; z: number };
  elementalAlignment: ElementalDirection;
  energyField: number;
  consciousnessLevel: 'low' | 'medium' | 'high' | 'transcendent';
}

/**
 * ⚗️ LuxcruxEngine - The Crucible
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
export class LuxcruxEngine {
  private elementalDirections: ElementalDirection[] = [];
  private spatialMap: Map<string, SpatialConsciousness> = new Map();

  constructor() {
    this.initializeElementalDirections();
  }

  private initializeElementalDirections(): void {
    this.elementalDirections = [
      {
        name: 'Fire North',
        element: 'fire',
        direction: 'north',
        frequency: 528, // Love frequency
        color: '#ff4444',
        energy: 'passion'
      },
      {
        name: 'Water South', 
        element: 'water',
        direction: 'south',
        frequency: 432, // Healing frequency
        color: '#4444ff',
        energy: 'emotion'
      },
      {
        name: 'Air East',
        element: 'air', 
        direction: 'east',
        frequency: 741, // Intuition frequency
        color: '#44ff44',
        energy: 'thought'
      },
      {
        name: 'Earth West',
        element: 'earth',
        direction: 'west', 
        frequency: 396, // Liberation frequency
        color: '#884444',
        energy: 'material'
      },
      {
        name: 'Center',
        element: 'spirit',
        direction: 'center',
        frequency: 963, // Divine frequency
        color: '#ffffff',
        energy: 'unity'
      }
    ];
  }

  public getElementalDirection(element: string, direction?: string): ElementalDirection {
    if (direction === 'center') {
      return this.elementalDirections[4]; // Center element
    }
    
    return this.elementalDirections.find(d => 
      d.element === element && d.direction === direction
    ) || this.elementalDirections[0]; // Default to fire north
  }

  public mapSpatialConsciousness(
    id: string, 
    x: number, 
    y: number, 
    z: number, 
    element: string = 'fire'
  ): SpatialConsciousness {
    const elementalAlignment = this.getElementalDirection(element);
    
    const consciousness: SpatialConsciousness = {
      position: { x, y, z },
      elementalAlignment,
      energyField: this.calculateEnergyField(x, y, z),
      consciousnessLevel: this.determineConsciousnessLevel(x, y, z)
    };

    this.spatialMap.set(id, consciousness);
    return consciousness;
  }

  private calculateEnergyField(x: number, y: number, z: number): number {
    // Calculate energy field based on position relative to center
    const distance = Math.sqrt(x * x + y * y + z * z);
    return Math.max(0, 100 - distance);
  }

  private determineConsciousnessLevel(x: number, y: number, z: number): SpatialConsciousness['consciousnessLevel'] {
    const energy = this.calculateEnergyField(x, y, z);
    
    if (energy >= 80) return 'transcendent';
    if (energy >= 60) return 'high';
    if (energy >= 30) return 'medium';
    return 'low';
  }

  public getAllElementalDirections(): ElementalDirection[] {
    return [...this.elementalDirections];
  }

  public getSpatialConsciousness(id: string): SpatialConsciousness | undefined {
    return this.spatialMap.get(id);
  }

  public generateElementalPattern(): string {
    // Generate a sacred geometry pattern based on elemental directions
    const pattern = this.elementalDirections
      .map(dir => `${dir.element.charAt(0).toUpperCase()}${dir.direction.charAt(0).toUpperCase()}`)
      .join(' → ');
    
    return `Sacred Elemental Pattern: ${pattern} → Center`;
  }

  public harmonizeFrequencies(frequency1: number, frequency2: number): number {
    // Create harmonic resonance between two frequencies
    const ratio = frequency1 / frequency2;
    return frequency1 * Math.pow(ratio, 0.5); // Geometric mean for harmony
  }

  public getConsciousnessDescription(consciousness: SpatialConsciousness): string {
    const { position, elementalAlignment, energyField, consciousnessLevel } = consciousness;
    
    return `
    Spatial Consciousness at (${position.x}, ${position.y}, ${position.z}):
    - Element: ${elementalAlignment.name}
    - Frequency: ${elementalAlignment.frequency} Hz
    - Energy Field: ${energyField.toFixed(1)}%
    - Consciousness Level: ${consciousnessLevel}
    - Sacred Color: ${elementalAlignment.color}
    - Energy Type: ${elementalAlignment.energy}
    `;
  }
}

// Export singleton instance for global use
export const luxcruxEngine = new LuxcruxEngine();

// Default export for package compatibility
export default luxcruxEngine;