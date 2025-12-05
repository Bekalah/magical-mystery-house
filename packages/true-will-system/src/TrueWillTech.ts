/**
 * @license CC0-1.0 - Public Domain
 * 
 * True Will Tech
 * Thelemic system for discovering and aligning with True Will
 * Based on Crowley's Thelema: "Do what thou wilt shall be the whole of the Law"
 */

/**
 * ⚗️ EntityData - The Principle
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
export interface EntityData {
  id?: string;
  arcana?: number;
  essence?: string;
  purpose?: string;
  expression?: string;
  star?: Star;
  khu?: Khu;
  khuName?: string;
  khuConnection?: string;
  khuManifestation?: string;
  daimon?: any;
}

/**
 * ⚗️ TrueWill - The Principle
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
export interface TrueWill {
  essence: string;
  purpose: string;
  expression: string;
  arcana: number | null;
  correspondences: {
    star: Star | null;
    khu: Khu | null;
    daimon: any | null;
  };
}

/**
 * ⚗️ Star - The Principle
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
export interface Star {
  arcana: number;
  planet: string;
  element: string;
  sign: string;
}

/**
 * ⚗️ Khu - The Principle
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
export interface Khu {
  name: string;
  connection: string;
  manifestation: string;
}

/**
 * ⚗️ Will - The Principle
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
export interface Will {
  id: string;
  entityId: string;
  entity: EntityData;
  discovered: string;
  will: TrueWill;
  alignment: number; // -100 to 100, where 100 is perfect alignment
  chaos: number; // Chaos meter based on alignment with True Will
  thelemic: {
    law: string;
    love: string;
    star: Star;
    khu: Khu;
  };
  obstacles: string[];
  paths: string[];
  lastAction?: {
    action: any;
    alignment: number;
    timestamp: string;
  };
}

/**
 * ⚗️ ChaosMeter - The Principle
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
export interface ChaosMeter {
  entityId: string;
  chaos: number;
  alignment: number;
  status: 'aligned' | 'seeking' | 'chaotic' | 'chaos';
  updated: string;
}

/**
 * ⚗️ TrueWillTech - The Crucible
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
export class TrueWillTech {
  private wills: Map<string, Will>;
  private alignments: Map<string, number>;
  private chaosMeters: Map<string, ChaosMeter>;

  constructor() {
    this.wills = new Map();
    this.alignments = new Map();
    this.chaosMeters = new Map();
  }

  /**
   * Discover True Will for a character/entity
   * Based on Thelemic principles
   */
  discoverTrueWill(entityId: string, entityData: EntityData): Will {
    const will: Will = {
      id: `will-${entityId}-${Date.now()}`,
      entityId: entityId,
      entity: entityData,
      discovered: new Date().toISOString(),
      will: this.calculateTrueWill(entityData),
      alignment: 0, // -100 to 100, where 100 is perfect alignment
      chaos: 0, // Chaos meter based on alignment with True Will
      thelemic: {
        law: "Do what thou wilt shall be the whole of the Law",
        love: "Love is the law, love under will",
        star: entityData.star || this.calculateStar(entityData),
        khu: entityData.khu || this.calculateKhu(entityData)
      },
      obstacles: [],
      paths: []
    };
    
    this.wills.set(will.id, will);
    this.updateChaosMeter(entityId, will);
    
    return will;
  }

  /**
   * Calculate True Will based on entity data
   * Uses Thelemic correspondences and arcanae
   */
  calculateTrueWill(entityData: EntityData): TrueWill {
    // True Will is discovered through:
    // 1. Arcana correspondence
    // 2. Star (astrological)
    // 3. Khu (divine self)
    // 4. Personal daimon (Shem Angel + Goetia Demon)
    
    const will: TrueWill = {
      essence: entityData.essence || 'Unknown',
      purpose: entityData.purpose || 'To discover purpose',
      expression: entityData.expression || 'Creative manifestation',
      arcana: entityData.arcana || null,
      correspondences: {
        star: entityData.star || null,
        khu: entityData.khu || null,
        daimon: entityData.daimon || null
      }
    };
    
    return will;
  }

  /**
   * Calculate Star (astrological True Will)
   */
  calculateStar(entityData: EntityData): Star {
    // In Thelema, the Star is the astrological chart
    // For now, use arcana number as seed
    const arcana = entityData.arcana || 0;
    return {
      arcana: arcana,
      planet: this.getPlanetForArcana(arcana),
      element: this.getElementForArcana(arcana),
      sign: this.getSignForArcana(arcana)
    };
  }

  /**
   * Calculate Khu (divine self)
   */
  calculateKhu(entityData: EntityData): Khu {
    // Khu is the divine self, the Holy Guardian Angel
    return {
      name: entityData.khuName || 'Unknown Khu',
      connection: entityData.khuConnection || 'To be discovered',
      manifestation: entityData.khuManifestation || 'Through True Will'
    };
  }

  /**
   * Get planet for arcana
   */
  getPlanetForArcana(arcana: number): string {
    const planets = [
      'Uranus', 'Mercury', 'Moon', 'Venus', 'Aries', 'Taurus',
      'Gemini', 'Cancer', 'Leo', 'Virgo', 'Jupiter', 'Libra',
      'Scorpio', 'Mars', 'Sagittarius', 'Saturn', 'Aquarius',
      'Pisces', 'Sun', 'Fire', 'Earth', 'Jupiter'
    ];
    return planets[arcana] || 'Unknown';
  }

  /**
   * Get element for arcana
   */
  getElementForArcana(arcana: number): string {
    const elements = ['Air', 'Air', 'Water', 'Earth', 'Fire', 'Earth',
                     'Air', 'Water', 'Fire', 'Earth', 'Fire', 'Air',
                     'Water', 'Water', 'Fire', 'Earth', 'Air', 'Water',
                     'Fire', 'Fire', 'Earth', 'Earth'];
    return elements[arcana] || 'Unknown';
  }

  /**
   * Get zodiac sign for arcana
   */
  getSignForArcana(arcana: number): string {
    const signs = ['Air', 'Mercury', 'Moon', 'Venus', 'Aries', 'Taurus',
                   'Gemini', 'Cancer', 'Leo', 'Virgo', 'Jupiter', 'Libra',
                   'Scorpio', 'Mars', 'Sagittarius', 'Capricorn', 'Aquarius',
                   'Pisces', 'Sun', 'Fire', 'Judgment', 'Saturn'];
    return signs[arcana] || 'Unknown';
  }

  /**
   * Update alignment with True Will
   */
  updateAlignment(entityId: string, action: any, willAlignment?: number): Will | null {
    const will = this.getWillForEntity(entityId);
    if (!will) {
      return null;
    }
    
    // Calculate alignment based on action
    const alignment = this.calculateAlignment(action, will.will);
    will.alignment = Math.max(-100, Math.min(100, will.alignment + alignment));
    will.lastAction = {
      action: action,
      alignment: alignment,
      timestamp: new Date().toISOString()
    };
    
    this.updateChaosMeter(entityId, will);
    
    return will;
  }

  /**
   * Calculate alignment for an action
   */
  calculateAlignment(action: any, trueWill: TrueWill): number {
    // Simple alignment calculation
    // In practice, this would be more sophisticated
    let alignment = 0;
    
    if (action.type === 'aligned') {
      alignment = 10;
    } else if (action.type === 'misaligned') {
      alignment = -10;
    } else if (action.type === 'neutral') {
      alignment = 0;
    }
    
    return alignment;
  }

  /**
   * Update chaos meter based on True Will alignment
   * Chaos = 100 - alignment (when aligned, chaos is low)
   */
  updateChaosMeter(entityId: string, will: Will): ChaosMeter {
    // Chaos meter: 0-100
    // 0 = Perfect alignment with True Will (no chaos)
    // 100 = Complete misalignment (maximum chaos)
    const chaos = Math.max(0, Math.min(100, 100 - will.alignment));
    
    const chaosMeter: ChaosMeter = {
      entityId: entityId,
      chaos: chaos,
      alignment: will.alignment,
      status: this.getChaosStatus(chaos),
      updated: new Date().toISOString()
    };
    
    this.chaosMeters.set(entityId, chaosMeter);
    will.chaos = chaos;
    
    return chaosMeter;
  }

  /**
   * Get chaos status
   */
  getChaosStatus(chaos: number): 'aligned' | 'seeking' | 'chaotic' | 'chaos' {
    if (chaos < 20) {
      return 'aligned'; // "Do what thou wilt"
    } else if (chaos < 50) {
      return 'seeking'; // Working towards True Will
    } else if (chaos < 80) {
      return 'chaotic'; // Misaligned
    } else {
      return 'chaos'; // Complete chaos, far from True Will
    }
  }

  /**
   * Get will for entity
   */
  getWillForEntity(entityId: string): Will | null {
    for (const will of this.wills.values()) {
      if (will.entityId === entityId) {
        return will;
      }
    }
    return null;
  }

  /**
   * Get chaos meter for entity
   */
  getChaosMeter(entityId: string): ChaosMeter | null {
    return this.chaosMeters.get(entityId) || null;
  }

  /**
   * Get all wills
   */
  getAllWills(): Will[] {
    return Array.from(this.wills.values());
  }
}

/**
 * Discover True Will (convenience function)
 */
export async function discoverTrueWill(entityId: string, entityData: EntityData): Promise<{ tech: TrueWillTech; will: Will }> {
  const tech = new TrueWillTech();
  const will = tech.discoverTrueWill(entityId, entityData);
  
  return { tech, will };
}

export default TrueWillTech;

