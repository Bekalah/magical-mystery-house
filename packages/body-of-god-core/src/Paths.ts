/**
 * 🔗 Paths - The 22 Channels Between Sephiroth
 * 
 * Technical implementation of the paths connecting the Tree of Life
 * 
 * @license CC0-1.0 - Public Domain
 */

import { Sephirah, SEPHIROTH_TECH } from './Sephiroth';

export enum Path {
  // Paths from Kether
  KETHER_CHOKMAH = 'kether-chokmah',  // Path 11 - Aleph (Air)
  KETHER_BINAH = 'kether-binah',      // Path 12 - Bet (Mercury)
  
  // Paths from Chokmah
  CHOKMAH_TIPHARETH = 'chokmah-tiphareth', // Path 14 - Daleth (Venus)
  CHOKMAH_CHESED = 'chokmah-chesed',       // Path 15 - Heh (Aries)
  
  // Paths from Binah
  BINAH_TIPHARETH = 'binah-tiphareth',     // Path 13 - Gimel (Moon)
  BINAH_GEBURAH = 'binah-geburah',         // Path 16 - Vav (Taurus)
  
  // Paths from Chesed
  CHESED_NETZACH = 'chesed-netzach',       // Path 19 - Teth (Leo)
  CHESED_TIPHARETH = 'chesed-tiphareth',   // Path 17 - Zayin (Gemini)
  
  // Paths from Geburah
  GEBURAH_HOD = 'geburah-hod',             // Path 20 - Yod (Virgo)
  GEBURAH_TIPHARETH = 'geburah-tiphareth', // Path 18 - Cheth (Cancer)
  
  // Paths from Tiphareth
  TIPHARETH_NETZACH = 'tiphareth-netzach', // Path 22 - Lamed (Libra)
  TIPHARETH_HOD = 'tiphareth-hod',         // Path 23 - Mem (Water)
  TIPHARETH_YESOD = 'tiphareth-yesod',     // Path 24 - Nun (Scorpio)
  TIPHARETH_GEBURAH = 'tiphareth-geburah', // Path 25 - Samekh (Sagittarius)
  TIPHARETH_CHESED = 'tiphareth-chesed',   // Path 26 - Ayin (Capricorn)
  
  // Paths from Netzach
  NETZACH_HOD = 'netzach-hod',             // Path 27 - Peh (Mars)
  NETZACH_YESOD = 'netzach-yesod',         // Path 28 - Tzaddi (Aquarius)
  
  // Paths from Hod
  HOD_YESOD = 'hod-yesod',                 // Path 29 - Qoph (Pisces)
  
  // Path from Yesod
  YESOD_MALKUTH = 'yesod-malkuth'          // Path 32 - Tau (Saturn)
}

/**
 * ⚗️ PathTech - The Principle
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
export interface PathTech {
  path: Path;
  from: Sephirah;
  to: Sephirah;
  hebrewLetter: string;
  planet: string;
  element: 'fire' | 'water' | 'air' | 'earth';
  techRole: string;
  dataFlow: 'unidirectional' | 'bidirectional';
  protocol: string;
}

export const PATHS_TECH: Record<Path, PathTech> = {
  [Path.KETHER_CHOKMAH]: {
    path: Path.KETHER_CHOKMAH,
    from: Sephirah.KETHER,
    to: Sephirah.CHOKMAH,
    hebrewLetter: 'א',
    planet: 'Air',
    element: 'air',
    techRole: 'Source → Creative Force',
    dataFlow: 'unidirectional',
    protocol: 'creation'
  },
  
  [Path.KETHER_BINAH]: {
    path: Path.KETHER_BINAH,
    from: Sephirah.KETHER,
    to: Sephirah.BINAH,
    hebrewLetter: 'ב',
    planet: 'Mercury',
    element: 'air',
    techRole: 'Source → Structure',
    dataFlow: 'unidirectional',
    protocol: 'formation'
  },
  
  [Path.CHOKMAH_TIPHARETH]: {
    path: Path.CHOKMAH_TIPHARETH,
    from: Sephirah.CHOKMAH,
    to: Sephirah.TIPHARETH,
    hebrewLetter: 'ד',
    planet: 'Venus',
    element: 'air',
    techRole: 'Creative Force → Balance',
    dataFlow: 'bidirectional',
    protocol: 'harmony'
  },
  
  [Path.BINAH_TIPHARETH]: {
    path: Path.BINAH_TIPHARETH,
    from: Sephirah.BINAH,
    to: Sephirah.TIPHARETH,
    hebrewLetter: 'ג',
    planet: 'Moon',
    element: 'water',
    techRole: 'Structure → Balance',
    dataFlow: 'bidirectional',
    protocol: 'integration'
  },
  
  [Path.CHESED_NETZACH]: {
    path: Path.CHESED_NETZACH,
    from: Sephirah.CHESED,
    to: Sephirah.NETZACH,
    hebrewLetter: 'ט',
    planet: 'Leo',
    element: 'fire',
    techRole: 'Expansion → Victory',
    dataFlow: 'bidirectional',
    protocol: 'growth'
  },
  
  [Path.GEBURAH_HOD]: {
    path: Path.GEBURAH_HOD,
    from: Sephirah.GEBURAH,
    to: Sephirah.HOD,
    hebrewLetter: 'י',
    planet: 'Virgo',
    element: 'earth',
    techRole: 'Contraction → Form',
    dataFlow: 'bidirectional',
    protocol: 'refinement'
  },
  
  [Path.TIPHARETH_YESOD]: {
    path: Path.TIPHARETH_YESOD,
    from: Sephirah.TIPHARETH,
    to: Sephirah.YESOD,
    hebrewLetter: 'נ',
    planet: 'Scorpio',
    element: 'water',
    techRole: 'Balance → Foundation',
    dataFlow: 'bidirectional',
    protocol: 'connection'
  },
  
  [Path.NETZACH_YESOD]: {
    path: Path.NETZACH_YESOD,
    from: Sephirah.NETZACH,
    to: Sephirah.YESOD,
    hebrewLetter: 'צ',
    planet: 'Aquarius',
    element: 'air',
    techRole: 'Victory → Foundation',
    dataFlow: 'bidirectional',
    protocol: 'persistence'
  },
  
  [Path.HOD_YESOD]: {
    path: Path.HOD_YESOD,
    from: Sephirah.HOD,
    to: Sephirah.YESOD,
    hebrewLetter: 'ק',
    planet: 'Pisces',
    element: 'water',
    techRole: 'Form → Foundation',
    dataFlow: 'bidirectional',
    protocol: 'structure'
  },
  
  [Path.YESOD_MALKUTH]: {
    path: Path.YESOD_MALKUTH,
    from: Sephirah.YESOD,
    to: Sephirah.MALKUTH,
    hebrewLetter: 'ת',
    planet: 'Saturn',
    element: 'earth',
    techRole: 'Foundation → Manifestation',
    dataFlow: 'unidirectional',
    protocol: 'manifestation'
  },
  
  // Additional paths for completeness
  [Path.CHOKMAH_CHESED]: {
    path: Path.CHOKMAH_CHESED,
    from: Sephirah.CHOKMAH,
    to: Sephirah.CHESED,
    hebrewLetter: 'ה',
    planet: 'Aries',
    element: 'fire',
    techRole: 'Creative → Expansion',
    dataFlow: 'bidirectional',
    protocol: 'creation'
  },
  
  [Path.BINAH_GEBURAH]: {
    path: Path.BINAH_GEBURAH,
    from: Sephirah.BINAH,
    to: Sephirah.GEBURAH,
    hebrewLetter: 'ו',
    planet: 'Taurus',
    element: 'earth',
    techRole: 'Structure → Contraction',
    dataFlow: 'bidirectional',
    protocol: 'discipline'
  },
  
  [Path.CHESED_TIPHARETH]: {
    path: Path.CHESED_TIPHARETH,
    from: Sephirah.CHESED,
    to: Sephirah.TIPHARETH,
    hebrewLetter: 'ז',
    planet: 'Gemini',
    element: 'air',
    techRole: 'Expansion → Balance',
    dataFlow: 'bidirectional',
    protocol: 'harmony'
  },
  
  [Path.GEBURAH_TIPHARETH]: {
    path: Path.GEBURAH_TIPHARETH,
    from: Sephirah.GEBURAH,
    to: Sephirah.TIPHARETH,
    hebrewLetter: 'ח',
    planet: 'Cancer',
    element: 'water',
    techRole: 'Contraction → Balance',
    dataFlow: 'bidirectional',
    protocol: 'balance'
  },
  
  [Path.TIPHARETH_NETZACH]: {
    path: Path.TIPHARETH_NETZACH,
    from: Sephirah.TIPHARETH,
    to: Sephirah.NETZACH,
    hebrewLetter: 'ל',
    planet: 'Libra',
    element: 'air',
    techRole: 'Balance → Victory',
    dataFlow: 'bidirectional',
    protocol: 'endurance'
  },
  
  [Path.TIPHARETH_HOD]: {
    path: Path.TIPHARETH_HOD,
    from: Sephirah.TIPHARETH,
    to: Sephirah.HOD,
    hebrewLetter: 'מ',
    planet: 'Water',
    element: 'water',
    techRole: 'Balance → Form',
    dataFlow: 'bidirectional',
    protocol: 'structure'
  },
  
  [Path.TIPHARETH_GEBURAH]: {
    path: Path.TIPHARETH_GEBURAH,
    from: Sephirah.TIPHARETH,
    to: Sephirah.GEBURAH,
    hebrewLetter: 'ס',
    planet: 'Sagittarius',
    element: 'fire',
    techRole: 'Balance → Contraction',
    dataFlow: 'bidirectional',
    protocol: 'discipline'
  },
  
  [Path.TIPHARETH_CHESED]: {
    path: Path.TIPHARETH_CHESED,
    from: Sephirah.TIPHARETH,
    to: Sephirah.CHESED,
    hebrewLetter: 'ע',
    planet: 'Capricorn',
    element: 'earth',
    techRole: 'Balance → Expansion',
    dataFlow: 'bidirectional',
    protocol: 'growth'
  },
  
  [Path.NETZACH_HOD]: {
    path: Path.NETZACH_HOD,
    from: Sephirah.NETZACH,
    to: Sephirah.HOD,
    hebrewLetter: 'פ',
    planet: 'Mars',
    element: 'fire',
    techRole: 'Victory ↔ Form',
    dataFlow: 'bidirectional',
    protocol: 'synthesis'
  }
};

/**
 * Get path between two sephiroth
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
export function getPath(from: Sephirah, to: Sephirah): PathTech | null {
  const pathKey = Object.keys(Path).find(
    key => PATHS_TECH[Path[key as keyof typeof Path]].from === from &&
           PATHS_TECH[Path[key as keyof typeof Path]].to === to
  ) as keyof typeof Path;
  
  return pathKey ? PATHS_TECH[Path[pathKey]] : null;
}

/**
 * Get all paths from a sephirah
 */
/**
 * ⚗️ GetPathsFrom - Solve et Coagula
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
export function getPathsFrom(sephirah: Sephirah): PathTech[] {
  return Object.values(PATHS_TECH).filter(p => p.from === sephirah);
}

/**
 * Get all paths to a sephirah
 */
/**
 * ⚗️ GetPathsTo - Solve et Coagula
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
export function getPathsTo(sephirah: Sephirah): PathTech[] {
  return Object.values(PATHS_TECH).filter(p => p.to === sephirah);
}

/**
 * Get complete path from Kether to Malkuth
 */
/**
 * ⚗️ GetPathToMalkuth - Solve et Coagula
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
export function getPathToMalkuth(): PathTech[] {
  return [
    PATHS_TECH[Path.KETHER_TIPHARETH] || PATHS_TECH[Path.KETHER_CHOKMAH],
    PATHS_TECH[Path.CHOKMAH_TIPHARETH],
    PATHS_TECH[Path.TIPHARETH_YESOD],
    PATHS_TECH[Path.YESOD_MALKUTH]
  ].filter(Boolean);
}

