/**
 * 🏛️ Body of God - Complete Anatomy
 * 
 * The complete technical structure of the Tree of Life
 * 
 * @license CC0-1.0 - Public Domain
 */

import { Sephirah, SEPHIROTH_TECH, getAllSephiroth } from './Sephiroth';
import { Path, PATHS_TECH, getPath, getPathsFrom, getPathsTo } from './Paths';

/**
 * ⚗️ BodyOfGodStructure - The Principle
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
export interface BodyOfGodStructure {
  sephiroth: Record<Sephirah, typeof SEPHIROTH_TECH[Sephirah]>;
  paths: Record<Path, typeof PATHS_TECH[Path]>;
  energyFlow: {
    fromKether: Sephirah[];
    toMalkuth: Sephirah[];
    center: Sephirah;
  };
  pillars: {
    mercy: Sephirah[];
    severity: Sephirah[];
    balance: Sephirah[];
  };
  worlds: {
    atziluth: Sephirah[];  // Archetypal World
    briah: Sephirah[];     // Creative World
    yetzirah: Sephirah[];  // Formative World
    assiah: Sephirah[];    // Material World
  };
}

/**
 * Get the complete Body of God structure
 */
/**
 * ⚗️ GetBodyOfGod - Solve et Coagula
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
export function getBodyOfGod(): BodyOfGodStructure {
  return {
    sephiroth: SEPHIROTH_TECH,
    paths: PATHS_TECH,
    energyFlow: {
      fromKether: [
        Sephirah.KETHER,
        Sephirah.CHOKMAH,
        Sephirah.BINAH,
        Sephirah.CHESED,
        Sephirah.GEBURAH,
        Sephirah.TIPHARETH,
        Sephirah.NETZACH,
        Sephirah.HOD,
        Sephirah.YESOD,
        Sephirah.MALKUTH
      ],
      toMalkuth: [
        Sephirah.MALKUTH,
        Sephirah.YESOD,
        Sephirah.TIPHARETH,
        Sephirah.CHOKMAH,
        Sephirah.BINAH,
        Sephirah.KETHER
      ],
      center: Sephirah.TIPHARETH
    },
    pillars: {
      mercy: [Sephirah.KETHER, Sephirah.CHESED, Sephirah.NETZACH],
      severity: [Sephirah.KETHER, Sephirah.GEBURAH, Sephirah.HOD],
      balance: [Sephirah.KETHER, Sephirah.TIPHARETH, Sephirah.YESOD, Sephirah.MALKUTH]
    },
    worlds: {
      atziluth: [Sephirah.KETHER, Sephirah.CHOKMAH, Sephirah.BINAH], // Archetypal
      briah: [Sephirah.CHESED, Sephirah.GEBURAH, Sephirah.TIPHARETH], // Creative
      yetzirah: [Sephirah.NETZACH, Sephirah.HOD, Sephirah.YESOD],     // Formative
      assiah: [Sephirah.MALKUTH]                                       // Material
    }
  };
}

/**
 * Get energy flow path from source to manifestation
 */
/**
 * ⚗️ GetEnergyFlowPath - Solve et Coagula
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
export function getEnergyFlowPath(): {
  path: Sephirah[];
  stages: Array<{ sephirah: Sephirah; role: string; energy: string }>;
} {
  const sephiroth = getAllSephiroth();
  
  return {
    path: [
      Sephirah.KETHER,
      Sephirah.CHOKMAH,
      Sephirah.BINAH,
      Sephirah.TIPHARETH,
      Sephirah.YESOD,
      Sephirah.MALKUTH
    ],
    stages: [
      {
        sephirah: Sephirah.KETHER,
        role: 'Source - Pure Being',
        energy: 'Unity'
      },
      {
        sephirah: Sephirah.CHOKMAH,
        role: 'Active Force - Creation',
        energy: 'Fire'
      },
      {
        sephirah: Sephirah.BINAH,
        role: 'Receptive Form - Structure',
        energy: 'Water'
      },
      {
        sephirah: Sephirah.TIPHARETH,
        role: 'Balance - Harmony',
        energy: 'Air'
      },
      {
        sephirah: Sephirah.YESOD,
        role: 'Foundation - Connection',
        energy: 'Air'
      },
      {
        sephirah: Sephirah.MALKUTH,
        role: 'Manifestation - Material',
        energy: 'Earth'
      }
    ]
  };
}

/**
 * Get the three pillars
 */
/**
 * ⚗️ GetPillars - Solve et Coagula
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
export function getPillars(): {
  mercy: Array<{ sephirah: Sephirah; name: string; role: string }>;
  severity: Array<{ sephirah: Sephirah; name: string; role: string }>;
  balance: Array<{ sephirah: Sephirah; name: string; role: string }>;
} {
  return {
    mercy: [
      { sephirah: Sephirah.KETHER, name: 'Kether', role: 'Source' },
      { sephirah: Sephirah.CHESED, name: 'Chesed', role: 'Expansion' },
      { sephirah: Sephirah.NETZACH, name: 'Netzach', role: 'Victory' }
    ],
    severity: [
      { sephirah: Sephirah.KETHER, name: 'Kether', role: 'Source' },
      { sephirah: Sephirah.GEBURAH, name: 'Geburah', role: 'Contraction' },
      { sephirah: Sephirah.HOD, name: 'Hod', role: 'Form' }
    ],
    balance: [
      { sephirah: Sephirah.KETHER, name: 'Kether', role: 'Source' },
      { sephirah: Sephirah.TIPHARETH, name: 'Tiphareth', role: 'Balance' },
      { sephirah: Sephirah.YESOD, name: 'Yesod', role: 'Foundation' },
      { sephirah: Sephirah.MALKUTH, name: 'Malkuth', role: 'Manifestation' }
    ]
  };
}

/**
 * Get the four worlds
 */
/**
 * ⚗️ GetWorlds - Solve et Coagula
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
export function getWorlds(): {
  atziluth: Array<{ sephirah: Sephirah; name: string; meaning: string }>;
  briah: Array<{ sephirah: Sephirah; name: string; meaning: string }>;
  yetzirah: Array<{ sephirah: Sephirah; name: string; meaning: string }>;
  assiah: Array<{ sephirah: Sephirah; name: string; meaning: string }>;
} {
  return {
    atziluth: [
      { sephirah: Sephirah.KETHER, name: 'Kether', meaning: 'Archetypal - Pure Being' },
      { sephirah: Sephirah.CHOKMAH, name: 'Chokmah', meaning: 'Archetypal - Active Force' },
      { sephirah: Sephirah.BINAH, name: 'Binah', meaning: 'Archetypal - Receptive Form' }
    ],
    briah: [
      { sephirah: Sephirah.CHESED, name: 'Chesed', meaning: 'Creative - Expansion' },
      { sephirah: Sephirah.GEBURAH, name: 'Geburah', meaning: 'Creative - Contraction' },
      { sephirah: Sephirah.TIPHARETH, name: 'Tiphareth', meaning: 'Creative - Balance' }
    ],
    yetzirah: [
      { sephirah: Sephirah.NETZACH, name: 'Netzach', meaning: 'Formative - Victory' },
      { sephirah: Sephirah.HOD, name: 'Hod', meaning: 'Formative - Form' },
      { sephirah: Sephirah.YESOD, name: 'Yesod', meaning: 'Formative - Foundation' }
    ],
    assiah: [
      { sephirah: Sephirah.MALKUTH, name: 'Malkuth', meaning: 'Material - Manifestation' }
    ]
  };
}

