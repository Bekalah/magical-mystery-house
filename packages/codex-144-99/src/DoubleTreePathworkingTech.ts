/**
 * @license CC0-1.0 - Public Domain
 * 
 * Double Tree Pathworking Tech
 * Pathworking system using the Tree of Life (Kabbalah) and Tree of Death
 * Dual tree navigation for complete spiritual work
 */

/**
 * ⚗️ Sephirah - The Principle
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
export interface Sephirah {
  number: number;
  name: string;
  hebrew: string;
  meaning: string;
  element: string;
}

/**
 * ⚗️ Qliphah - The Principle
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
export interface Qliphah {
  number: number;
  name: string;
  meaning: string;
  shadow: string;
}

/**
 * ⚗️ Path - The Principle
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
export interface Path {
  number: number;
  from: number;
  to: number;
  arcana: number;
  name: string;
}

/**
 * ⚗️ Pathworking - The Principle
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
export interface Pathworking {
  id: string;
  tree: 'life' | 'death' | 'dual';
  start?: number;
  end?: number;
  sephirothStart?: number;
  sephirothEnd?: number;
  qliphothStart?: number;
  qliphothEnd?: number;
  path?: PathDetail[];
  life?: Pathworking;
  death?: Pathworking;
  current?: number;
  completed: boolean;
  started: string;
  completedAt?: string;
  balance?: string;
}

/**
 * ⚗️ PathDetail - The Principle
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
export interface PathDetail {
  sephiroth?: Sephirah;
  qliphoth?: Qliphah;
  path?: Path;
  arcana?: number;
  shadow?: string;
}

// Tree of Life Sephiroth (10 + Daath)
export const SEPHIROTH: Sephirah[] = [
  { number: 1, name: 'Kether', hebrew: 'כתר', meaning: 'Crown', element: 'Aether' },
  { number: 2, name: 'Chokmah', hebrew: 'חכמה', meaning: 'Wisdom', element: 'Fire' },
  { number: 3, name: 'Binah', hebrew: 'בינה', meaning: 'Understanding', element: 'Water' },
  { number: 4, name: 'Chesed', hebrew: 'חסד', meaning: 'Mercy', element: 'Water' },
  { number: 5, name: 'Geburah', hebrew: 'גבורה', meaning: 'Severity', element: 'Fire' },
  { number: 6, name: 'Tiphareth', hebrew: 'תפארת', meaning: 'Beauty', element: 'Air' },
  { number: 7, name: 'Netzach', hebrew: 'נצח', meaning: 'Victory', element: 'Fire' },
  { number: 8, name: 'Hod', hebrew: 'הוד', meaning: 'Glory', element: 'Water' },
  { number: 9, name: 'Yesod', hebrew: 'יסוד', meaning: 'Foundation', element: 'Air' },
  { number: 10, name: 'Malkuth', hebrew: 'מלכות', meaning: 'Kingdom', element: 'Earth' },
  { number: 11, name: 'Daath', hebrew: 'דעת', meaning: 'Knowledge', element: 'Aether' }
];

// Tree of Death Qliphoth (corresponding to Sephiroth)
export const QLIPHOTH: Qliphah[] = [
  { number: 1, name: 'Thaumiel', meaning: 'Twins of God', shadow: 'Kether' },
  { number: 2, name: 'Ghagiel', meaning: 'Hinderers', shadow: 'Chokmah' },
  { number: 3, name: 'Sathariel', meaning: 'Concealment of God', shadow: 'Binah' },
  { number: 4, name: 'Gamchicoth', meaning: 'Disturbers', shadow: 'Chesed' },
  { number: 5, name: 'Golachab', meaning: 'Burners', shadow: 'Geburah' },
  { number: 6, name: 'Thagirion', meaning: 'Disputers', shadow: 'Tiphareth' },
  { number: 7, name: 'A\'arab Zaraq', meaning: 'Ravens of Dispersion', shadow: 'Netzach' },
  { number: 8, name: 'Samael', meaning: 'Poison of God', shadow: 'Hod' },
  { number: 9, name: 'Gamaliel', meaning: 'Obscene Ones', shadow: 'Yesod' },
  { number: 10, name: 'Lilith', meaning: 'Night', shadow: 'Malkuth' },
  { number: 11, name: 'Daath Qliphoth', meaning: 'Abyss', shadow: 'Daath' }
];

// Paths between Sephiroth (22 paths, corresponding to Major Arcana)
export const PATHS: Path[] = [
  { number: 11, from: 1, to: 2, arcana: 0, name: 'The Fool' },
  { number: 12, from: 1, to: 3, arcana: 1, name: 'The Magician' },
  { number: 13, from: 2, to: 3, arcana: 2, name: 'The High Priestess' },
  { number: 14, from: 2, to: 6, arcana: 3, name: 'The Empress' },
  { number: 15, from: 3, to: 6, arcana: 4, name: 'The Emperor' },
  { number: 16, from: 2, to: 4, arcana: 5, name: 'The Hierophant' },
  { number: 17, from: 3, to: 5, arcana: 6, name: 'The Lovers' },
  { number: 18, from: 4, to: 5, arcana: 7, name: 'The Chariot' },
  { number: 19, from: 4, to: 6, arcana: 8, name: 'Strength' },
  { number: 20, from: 5, to: 6, arcana: 9, name: 'The Hermit' },
  { number: 21, from: 4, to: 7, arcana: 10, name: 'Wheel of Fortune' },
  { number: 22, from: 5, to: 8, arcana: 11, name: 'Justice' },
  { number: 23, from: 6, to: 7, arcana: 12, name: 'The Hanged Man' },
  { number: 24, from: 6, to: 8, arcana: 13, name: 'Death' },
  { number: 25, from: 6, to: 9, arcana: 14, name: 'Temperance' },
  { number: 26, from: 7, to: 8, arcana: 15, name: 'The Devil' },
  { number: 27, from: 7, to: 9, arcana: 16, name: 'The Tower' },
  { number: 28, from: 7, to: 10, arcana: 17, name: 'The Star' },
  { number: 29, from: 8, to: 9, arcana: 18, name: 'The Moon' },
  { number: 30, from: 8, to: 10, arcana: 19, name: 'The Sun' },
  { number: 31, from: 9, to: 10, arcana: 20, name: 'Judgment' },
  { number: 32, from: 1, to: 6, arcana: 21, name: 'The World' }
];

/**
 * ⚗️ DoubleTreePathworkingTech - The Crucible
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
export class DoubleTreePathworkingTech {
  private pathworkings: Map<string, Pathworking>;
  private currentPath: Pathworking | null;

  constructor() {
    this.pathworkings = new Map();
    this.currentPath = null;
  }

  /**
   * Start pathworking on Tree of Life
   */
  startTreeOfLifePathworking(startSephiroth: number, endSephiroth: number): Pathworking {
    const path = this.findPath(startSephiroth, endSephiroth, 'life');
    const pathworking: Pathworking = {
      id: `pathworking-life-${Date.now()}`,
      tree: 'life',
      start: startSephiroth,
      end: endSephiroth,
      path: path,
      current: startSephiroth,
      completed: false,
      started: new Date().toISOString()
    };
    
    this.pathworkings.set(pathworking.id, pathworking);
    this.currentPath = pathworking;
    return pathworking;
  }

  /**
   * Start pathworking on Tree of Death
   */
  startTreeOfDeathPathworking(startQliphoth: number, endQliphoth: number): Pathworking {
    const path = this.findPath(startQliphoth, endQliphoth, 'death');
    const pathworking: Pathworking = {
      id: `pathworking-death-${Date.now()}`,
      tree: 'death',
      start: startQliphoth,
      end: endQliphoth,
      path: path,
      current: startQliphoth,
      completed: false,
      started: new Date().toISOString()
    };
    
    this.pathworkings.set(pathworking.id, pathworking);
    this.currentPath = pathworking;
    return pathworking;
  }

  /**
   * Find path between two nodes
   */
  findPath(start: number, end: number, tree: 'life' | 'death'): PathDetail[] {
    if (tree === 'life') {
      // Find path through Tree of Life
      const sephirothPath = this.findSephirothPath(start, end);
      const pathDetails: PathDetail[] = sephirothPath.map((node, idx) => {
        if (idx < sephirothPath.length - 1) {
          const path = PATHS.find(p => 
            (p.from === node && p.to === sephirothPath[idx + 1]) ||
            (p.to === node && p.from === sephirothPath[idx + 1])
          );
          return {
            sephiroth: SEPHIROTH.find(s => s.number === node),
            path: path || undefined,
            arcana: path ? path.arcana : undefined
          };
        }
        return {
          sephiroth: SEPHIROTH.find(s => s.number === node),
          path: undefined,
          arcana: undefined
        };
      });
      return pathDetails;
    } else {
      // Find path through Tree of Death
      const qliphothPath = this.findQliphothPath(start, end);
      return qliphothPath.map(node => ({
        qliphoth: QLIPHOTH.find(q => q.number === node),
        shadow: QLIPHOTH.find(q => q.number === node)?.shadow
      }));
    }
  }

  /**
   * Simple pathfinding for Sephiroth
   */
  private findSephirothPath(start: number, end: number): number[] {
    // Simplified - in practice, use proper graph traversal
    // For now, return direct path if exists
    const directPath = PATHS.find(p => 
      (p.from === start && p.to === end) || (p.to === start && p.from === end)
    );
    
    if (directPath) {
      return [start, end];
    }
    
    // Otherwise, find through Tiphareth (middle pillar)
    if (start !== 6 && end !== 6) {
      return [start, 6, end];
    }
    
    return [start, end];
  }

  /**
   * Simple pathfinding for Qliphoth
   */
  private findQliphothPath(start: number, end: number): number[] {
    // Similar to Sephiroth but through shadow tree
    return [start, end];
  }

  /**
   * Progress through pathworking
   */
  progressPathworking(pathworkingId: string, nextNode: number): Pathworking {
    const pathworking = this.pathworkings.get(pathworkingId);
    if (!pathworking) {
      throw new Error(`Pathworking not found: ${pathworkingId}`);
    }
    
    pathworking.current = nextNode;
    
    if (pathworking.current === pathworking.end) {
      pathworking.completed = true;
      pathworking.completedAt = new Date().toISOString();
    }
    
    return pathworking;
  }

  /**
   * Get pathworking for arcana
   */
  getPathworkingForArcana(arcanaNumber: number): {
    path: Path;
    sephiroth: { from: Sephirah | undefined; to: Sephirah | undefined };
    qliphoth: { from: Qliphah | undefined; to: Qliphah | undefined };
  } | null {
    const path = PATHS.find(p => p.arcana === arcanaNumber);
    if (!path) {
      return null;
    }
    
    return {
      path: path,
      sephiroth: {
        from: SEPHIROTH.find(s => s.number === path.from),
        to: SEPHIROTH.find(s => s.number === path.to)
      },
      qliphoth: {
        from: QLIPHOTH.find(q => q.shadow === SEPHIROTH.find(s => s.number === path.from)?.name),
        to: QLIPHOTH.find(q => q.shadow === SEPHIROTH.find(s => s.number === path.to)?.name)
      }
    };
  }

  /**
   * Dual tree pathworking (both trees simultaneously)
   */
  startDualPathworking(
    sephirothStart: number,
    sephirothEnd: number,
    qliphothStart: number,
    qliphothEnd: number
  ): Pathworking {
    const lifePathworking = this.startTreeOfLifePathworking(sephirothStart, sephirothEnd);
    const deathPathworking = this.startTreeOfDeathPathworking(qliphothStart, qliphothEnd);
    
    const dualPathworking: Pathworking = {
      id: `pathworking-dual-${Date.now()}`,
      tree: 'dual',
      life: lifePathworking,
      death: deathPathworking,
      balance: 'seeking-equilibrium',
      completed: false,
      started: new Date().toISOString()
    };
    
    this.pathworkings.set(dualPathworking.id, dualPathworking);
    return dualPathworking;
  }

  /**
   * Get pathworking by ID
   */
  getPathworking(pathworkingId: string): Pathworking | null {
    return this.pathworkings.get(pathworkingId) || null;
  }

  /**
   * Get all pathworkings
   */
  getAllPathworkings(): Pathworking[] {
    return Array.from(this.pathworkings.values());
  }
}

/**
 * Create pathworking (convenience function)
 */
export async function createPathworking(
  type: 'life' | 'death' | 'dual',
  config: {
    start?: number;
    end?: number;
    sephirothStart?: number;
    sephirothEnd?: number;
    qliphothStart?: number;
    qliphothEnd?: number;
  }
): Promise<{ tech: DoubleTreePathworkingTech; pathworking: Pathworking }> {
  const tech = new DoubleTreePathworkingTech();
  let pathworking: Pathworking;
  
  if (type === 'life') {
    if (config.start === undefined || config.end === undefined) {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    pathworking = tech.startTreeOfLifePathworking(config.start, config.end);
  } else if (type === 'death') {
    if (config.start === undefined || config.end === undefined) {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    pathworking = tech.startTreeOfDeathPathworking(config.start, config.end);
  } else if (type === 'dual') {
    if (config.sephirothStart === undefined || config.sephirothEnd === undefined ||
        config.qliphothStart === undefined || config.qliphothEnd === undefined) {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    pathworking = tech.startDualPathworking(
      config.sephirothStart,
      config.sephirothEnd,
      config.qliphothStart,
      config.qliphothEnd
    );
  } else {
    throw new Error(`Unknown pathworking type: ${type}`);
  }
  
  return { tech, pathworking };
}

export default DoubleTreePathworkingTech;

