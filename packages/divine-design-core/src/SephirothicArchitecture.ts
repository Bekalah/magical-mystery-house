/**
 * 🏛️ Sephirothic Architecture
 * 
 * The Tree of Life (Kabbalah) applied to design structure
 * 
 * @license CC0-1.0 - Public Domain
 */

export enum Sephirah {
  KETHER = 'kether',      // Crown - Unity, Source
  CHOKMAH = 'chokmah',    // Wisdom - Active Force
  BINAH = 'binah',        // Understanding - Receptive Form
  CHESED = 'chesed',      // Mercy - Expansion
  GEBURAH = 'geburah',    // Severity - Contraction
  TIPHARETH = 'tiphareth', // Beauty - Balance ⭐ CENTER
  NETZACH = 'netzach',    // Victory - Endurance
  HOD = 'hod',            // Glory - Form
  YESOD = 'yesod',        // Foundation - Connection
  MALKUTH = 'malkuth'     // Kingdom - Manifestation
}

/**
 * ⚗️ SephirahConfig - The Principle
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
export interface SephirahConfig {
  sephirah: Sephirah;
  element: 'fire' | 'water' | 'air' | 'earth' | 'aether';
  color: string;
  designPrinciple: string;
  packageRole: string;
  position: { x: number; y: number }; // For visualization
}

export const SEPHIROTH: Record<Sephirah, SephirahConfig> = {
  [Sephirah.KETHER]: {
    sephirah: Sephirah.KETHER,
    element: 'aether',
    color: '#FFFFFF',
    designPrinciple: 'Unity, Source',
    packageRole: 'Core architecture',
    position: { x: 0.5, y: 0 }
  },
  [Sephirah.CHOKMAH]: {
    sephirah: Sephirah.CHOKMAH,
    element: 'fire',
    color: '#0000FF',
    designPrinciple: 'Active Force, Wisdom',
    packageRole: 'Creative engines',
    position: { x: 0.3, y: 0.2 }
  },
  [Sephirah.BINAH]: {
    sephirah: Sephirah.BINAH,
    element: 'water',
    color: '#8B0000',
    designPrinciple: 'Receptive Form, Understanding',
    packageRole: 'Design systems',
    position: { x: 0.7, y: 0.2 }
  },
  [Sephirah.CHESED]: {
    sephirah: Sephirah.CHESED,
    element: 'water',
    color: '#00008B',
    designPrinciple: 'Expansion, Mercy',
    packageRole: 'Art tools',
    position: { x: 0.2, y: 0.4 }
  },
  [Sephirah.GEBURAH]: {
    sephirah: Sephirah.GEBURAH,
    element: 'fire',
    color: '#DC143C',
    designPrinciple: 'Contraction, Severity',
    packageRole: 'Editing/refinement',
    position: { x: 0.8, y: 0.4 }
  },
  [Sephirah.TIPHARETH]: {
    sephirah: Sephirah.TIPHARETH,
    element: 'air',
    color: '#FFD700',
    designPrinciple: 'Balance, Beauty ⭐',
    packageRole: 'Main interfaces',
    position: { x: 0.5, y: 0.5 }
  },
  [Sephirah.NETZACH]: {
    sephirah: Sephirah.NETZACH,
    element: 'fire',
    color: '#50C878',
    designPrinciple: 'Victory, Endurance',
    packageRole: 'Game systems',
    position: { x: 0.3, y: 0.7 }
  },
  [Sephirah.HOD]: {
    sephirah: Sephirah.HOD,
    element: 'water',
    color: '#FF8C00',
    designPrinciple: 'Glory, Form',
    packageRole: 'Audio/sound',
    position: { x: 0.7, y: 0.7 }
  },
  [Sephirah.YESOD]: {
    sephirah: Sephirah.YESOD,
    element: 'air',
    color: '#9370DB',
    designPrinciple: 'Foundation, Connection',
    packageRole: 'Data systems',
    position: { x: 0.5, y: 0.85 }
  },
  [Sephirah.MALKUTH]: {
    sephirah: Sephirah.MALKUTH,
    element: 'earth',
    color: '#FFD700',
    designPrinciple: 'Manifestation, Kingdom',
    packageRole: 'Export/rendering',
    position: { x: 0.5, y: 1.0 }
  }
};

/**
 * Get sephirah for a package based on its function
 */
/**
 * ⚗️ GetSephirahForPackage - Solve et Coagula
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
export function getSephirahForPackage(packageName: string): SephirahConfig | null {
  const name = packageName.toLowerCase();
  
  // Core architecture
  if (name.includes('core') && (name.includes('trinity') || name.includes('architecture'))) {
    return SEPHIROTH[Sephirah.KETHER];
  }
  
  // Creative engines
  if (name.includes('art') || name.includes('creative') || name.includes('engine')) {
    return SEPHIROTH[Sephirah.CHOKMAH];
  }
  
  // Design systems
  if (name.includes('design') || name.includes('style') || name.includes('visual')) {
    return SEPHIROTH[Sephirah.BINAH];
  }
  
  // Art tools
  if (name.includes('art-') || name.includes('painting') || name.includes('drawing')) {
    return SEPHIROTH[Sephirah.CHESED];
  }
  
  // Editing/refinement
  if (name.includes('edit') || name.includes('refine') || name.includes('quality')) {
    return SEPHIROTH[Sephirah.GEBURAH];
  }
  
  // Main interfaces
  if (name.includes('ui') || name.includes('interface') || name.includes('portal')) {
    return SEPHIROTH[Sephirah.TIPHARETH];
  }
  
  // Game systems
  if (name.includes('game') || name.includes('rpg') || name.includes('world')) {
    return SEPHIROTH[Sephirah.NETZACH];
  }
  
  // Audio/sound
  if (name.includes('audio') || name.includes('sound') || name.includes('music')) {
    return SEPHIROTH[Sephirah.HOD];
  }
  
  // Data systems
  if (name.includes('data') || name.includes('storage') || name.includes('persistence')) {
    return SEPHIROTH[Sephirah.YESOD];
  }
  
  // Export/rendering
  if (name.includes('export') || name.includes('render') || name.includes('output')) {
    return SEPHIROTH[Sephirah.MALKUTH];
  }
  
  return SEPHIROTH[Sephirah.TIPHARETH]; // Default to center
}

/**
 * Get the path between two sephiroth (for visualization)
 */
/**
 * ⚗️ GetPath - Solve et Coagula
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
export function getPath(from: Sephirah, to: Sephirah): Sephirah[] {
  // Simple path finding - can be enhanced
  const fromPos = SEPHIROTH[from].position;
  const toPos = SEPHIROTH[to].position;
  
  // If connected directly (parent-child), return direct path
  const paths: Record<string, Sephirah[]> = {
    'kether-chokmah': [Sephirah.KETHER, Sephirah.CHOKMAH],
    'kether-binah': [Sephirah.KETHER, Sephirah.BINAH],
    'chokmah-tiphareth': [Sephirah.CHOKMAH, Sephirah.TIPHARETH],
    'binah-tiphareth': [Sephirah.BINAH, Sephirah.TIPHARETH],
    'chesed-netzach': [Sephirah.CHESED, Sephirah.NETZACH],
    'geburah-hod': [Sephirah.GEBURAH, Sephirah.HOD],
    'tiphareth-yesod': [Sephirah.TIPHARETH, Sephirah.YESOD],
    'netzach-yesod': [Sephirah.NETZACH, Sephirah.YESOD],
    'hod-yesod': [Sephirah.HOD, Sephirah.YESOD],
    'yesod-malkuth': [Sephirah.YESOD, Sephirah.MALKUTH]
  };
  
  const key = `${from}-${to}`;
  return paths[key] || [from, to];
}

