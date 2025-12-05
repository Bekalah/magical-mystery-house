/**
 * 🏛️ Sephiroth - The 10 Emanations
 * 
 * Technical implementation of the Tree of Life
 * 
 * @license CC0-1.0 - Public Domain
 */

export enum Sephirah {
  KETHER = 'kether',      // Crown - Unity, Source, Pure Being
  CHOKMAH = 'chokmah',    // Wisdom - Active Force, Creative Energy
  BINAH = 'binah',        // Understanding - Receptive Form, Structure
  CHESED = 'chesed',      // Mercy - Expansion, Growth, Abundance
  GEBURAH = 'geburah',    // Severity - Contraction, Discipline, Judgment
  TIPHARETH = 'tiphareth', // Beauty - Balance, Harmony, Center ⭐
  NETZACH = 'netzach',    // Victory - Endurance, Persistence, Emotion
  HOD = 'hod',            // Glory - Form, Structure, Intellect
  YESOD = 'yesod',        // Foundation - Connection, Communication, Interface
  MALKUTH = 'malkuth'     // Kingdom - Manifestation, Material, Output
}

/**
 * ⚗️ SephirahTech - The Principle
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
export interface SephirahTech {
  sephirah: Sephirah;
  name: string;
  meaning: string;
  element: 'fire' | 'water' | 'air' | 'earth' | 'aether';
  color: string;
  position: { x: number; y: number; z?: number };
  
  // Technical mapping
  techRole: string;
  packageTypes: string[];
  dataFlow: 'input' | 'output' | 'both' | 'transform';
  energyType: 'active' | 'receptive' | 'balanced';
  
  // Connections
  parents: Sephirah[];
  children: Sephirah[];
  paths: string[];
}

export const SEPHIROTH_TECH: Record<Sephirah, SephirahTech> = {
  [Sephirah.KETHER]: {
    sephirah: Sephirah.KETHER,
    name: 'Kether',
    meaning: 'Crown - Unity, Source, Pure Being',
    element: 'aether',
    color: '#FFFFFF',
    position: { x: 0.5, y: 0, z: 1 },
    techRole: 'Core Architecture - The Source',
    packageTypes: ['core', 'architecture', 'foundation'],
    dataFlow: 'output',
    energyType: 'balanced',
    parents: [],
    children: [Sephirah.CHOKMAH, Sephirah.BINAH],
    paths: ['kether-chokmah', 'kether-binah']
  },
  
  [Sephirah.CHOKMAH]: {
    sephirah: Sephirah.CHOKMAH,
    name: 'Chokmah',
    meaning: 'Wisdom - Active Force, Creative Energy',
    element: 'fire',
    color: '#0000FF',
    position: { x: 0.3, y: 0.2, z: 0.8 },
    techRole: 'Creative Engines - Active Force',
    packageTypes: ['engine', 'creative', 'generator', 'active'],
    dataFlow: 'output',
    energyType: 'active',
    parents: [Sephirah.KETHER],
    children: [Sephirah.TIPHARETH],
    paths: ['chokmah-tiphareth']
  },
  
  [Sephirah.BINAH]: {
    sephirah: Sephirah.BINAH,
    name: 'Binah',
    meaning: 'Understanding - Receptive Form, Structure',
    element: 'water',
    color: '#8B0000',
    position: { x: 0.7, y: 0.2, z: 0.8 },
    techRole: 'Design Systems - Receptive Form',
    packageTypes: ['design', 'system', 'structure', 'form'],
    dataFlow: 'input',
    energyType: 'receptive',
    parents: [Sephirah.KETHER],
    children: [Sephirah.TIPHARETH],
    paths: ['binah-tiphareth']
  },
  
  [Sephirah.CHESED]: {
    sephirah: Sephirah.CHESED,
    name: 'Chesed',
    meaning: 'Mercy - Expansion, Growth, Abundance',
    element: 'water',
    color: '#00008B',
    position: { x: 0.2, y: 0.4, z: 0.6 },
    techRole: 'Art Tools - Expansion',
    packageTypes: ['art', 'tool', 'expansion', 'growth'],
    dataFlow: 'both',
    energyType: 'active',
    parents: [Sephirah.CHOKMAH],
    children: [Sephirah.NETZACH],
    paths: ['chesed-netzach']
  },
  
  [Sephirah.GEBURAH]: {
    sephirah: Sephirah.GEBURAH,
    name: 'Geburah',
    meaning: 'Severity - Contraction, Discipline, Judgment',
    element: 'fire',
    color: '#DC143C',
    position: { x: 0.8, y: 0.4, z: 0.6 },
    techRole: 'Editing/Refinement - Contraction',
    packageTypes: ['edit', 'refine', 'quality', 'control', 'discipline'],
    dataFlow: 'transform',
    energyType: 'receptive',
    parents: [Sephirah.BINAH],
    children: [Sephirah.HOD],
    paths: ['geburah-hod']
  },
  
  [Sephirah.TIPHARETH]: {
    sephirah: Sephirah.TIPHARETH,
    name: 'Tiphareth',
    meaning: 'Beauty - Balance, Harmony, Center ⭐',
    element: 'air',
    color: '#FFD700',
    position: { x: 0.5, y: 0.5, z: 0.5 },
    techRole: 'Main Interfaces - Balance & Harmony',
    packageTypes: ['ui', 'interface', 'portal', 'bridge', 'center'],
    dataFlow: 'both',
    energyType: 'balanced',
    parents: [Sephirah.CHOKMAH, Sephirah.BINAH],
    children: [Sephirah.YESOD],
    paths: ['tiphareth-yesod']
  },
  
  [Sephirah.NETZACH]: {
    sephirah: Sephirah.NETZACH,
    name: 'Netzach',
    meaning: 'Victory - Endurance, Persistence, Emotion',
    element: 'fire',
    color: '#50C878',
    position: { x: 0.3, y: 0.7, z: 0.3 },
    techRole: 'Game Systems - Victory & Endurance',
    packageTypes: ['game', 'rpg', 'world', 'victory', 'emotion'],
    dataFlow: 'both',
    energyType: 'active',
    parents: [Sephirah.CHESED],
    children: [Sephirah.YESOD],
    paths: ['netzach-yesod']
  },
  
  [Sephirah.HOD]: {
    sephirah: Sephirah.HOD,
    name: 'Hod',
    meaning: 'Glory - Form, Structure, Intellect',
    element: 'water',
    color: '#FF8C00',
    position: { x: 0.7, y: 0.7, z: 0.3 },
    techRole: 'Audio/Sound - Glory & Form',
    packageTypes: ['audio', 'sound', 'music', 'synthesis', 'form'],
    dataFlow: 'both',
    energyType: 'receptive',
    parents: [Sephirah.GEBURAH],
    children: [Sephirah.YESOD],
    paths: ['hod-yesod']
  },
  
  [Sephirah.YESOD]: {
    sephirah: Sephirah.YESOD,
    name: 'Yesod',
    meaning: 'Foundation - Connection, Communication, Interface',
    element: 'air',
    color: '#9370DB',
    position: { x: 0.5, y: 0.85, z: 0.2 },
    techRole: 'Data Systems - Foundation & Connection',
    packageTypes: ['data', 'storage', 'persistence', 'foundation', 'connection'],
    dataFlow: 'both',
    energyType: 'balanced',
    parents: [Sephirah.TIPHARETH, Sephirah.NETZACH, Sephirah.HOD],
    children: [Sephirah.MALKUTH],
    paths: ['yesod-malkuth']
  },
  
  [Sephirah.MALKUTH]: {
    sephirah: Sephirah.MALKUTH,
    name: 'Malkuth',
    meaning: 'Kingdom - Manifestation, Material, Output',
    element: 'earth',
    color: '#FFD700',
    position: { x: 0.5, y: 1.0, z: 0 },
    techRole: 'Export/Rendering - Manifestation',
    packageTypes: ['export', 'render', 'output', 'material', 'manifestation'],
    dataFlow: 'input',
    energyType: 'receptive',
    parents: [Sephirah.YESOD],
    children: [],
    paths: []
  }
};

/**
 * Get sephirah by name
 */
/**
 * ⚗️ GetSephirah - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getSephirah(name: string): SephirahTech | null {
  const key = Object.keys(Sephirah).find(
    k => Sephirah[k as keyof typeof Sephirah].toLowerCase() === name.toLowerCase()
  ) as keyof typeof Sephirah;
  
  return key ? SEPHIROTH_TECH[Sephirah[key]] : null;
}

/**
 * Get all sephiroth in order (top to bottom)
 */
/**
 * ⚗️ GetAllSephiroth - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getAllSephiroth(): SephirahTech[] {
  return [
    SEPHIROTH_TECH[Sephirah.KETHER],
    SEPHIROTH_TECH[Sephirah.CHOKMAH],
    SEPHIROTH_TECH[Sephirah.BINAH],
    SEPHIROTH_TECH[Sephirah.CHESED],
    SEPHIROTH_TECH[Sephirah.GEBURAH],
    SEPHIROTH_TECH[Sephirah.TIPHARETH],
    SEPHIROTH_TECH[Sephirah.NETZACH],
    SEPHIROTH_TECH[Sephirah.HOD],
    SEPHIROTH_TECH[Sephirah.YESOD],
    SEPHIROTH_TECH[Sephirah.MALKUTH]
  ];
}

/**
 * Get sephiroth by element
 */
/**
 * ⚗️ GetSephirothByElement - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getSephirothByElement(element: 'fire' | 'water' | 'air' | 'earth' | 'aether'): SephirahTech[] {
  return getAllSephiroth().filter(s => s.element === element);
}

/**
 * Get sephiroth by energy type
 */
/**
 * ⚗️ GetSephirothByEnergy - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getSephirothByEnergy(energyType: 'active' | 'receptive' | 'balanced'): SephirahTech[] {
  return getAllSephiroth().filter(s => s.energyType === energyType);
}

