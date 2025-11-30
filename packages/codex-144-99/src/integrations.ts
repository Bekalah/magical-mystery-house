/**
 * integrations
 * 
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Integrations
 * 
 * Integration with:
 * - Soyga (Book of Soyga)
 * - I Ching (64 Hexagrams)
 * - 72 Shem Angels
 * - 72 Goetia Demons
 * - Gods and Goddesses from all traditions
 * - Real research and correspondences
 * - Never flat - always flowing, trauma-informed
 */

/**
 * ⚗️ SoygaTable - The Principle
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
export interface SoygaTable {
  id: string;
  name: string;
  element: string;
  correspondences: Record<string, any>;
  connections: number[]; // Codex 144:99 node connections
}

/**
 * ⚗️ IChingHexagram - The Principle
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
export interface IChingHexagram {
  number: number; // 1-64
  name: string;
  chinese: string;
  meaning: string;
  lines: string; // 6 lines (yin/yang)
  correspondences: Record<string, any>;
  connections: number[]; // Codex 144:99 node connections
}

/**
 * ⚗️ ShemAngel - The Principle
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
export interface ShemAngel {
  number: number; // 1-72
  name: string;
  meaning: string;
  planet: string;
  correspondences: Record<string, any>;
  connections: number[]; // Codex 144:99 node connections
}

/**
 * ⚗️ GoetiaDemon - The Principle
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
export interface GoetiaDemon {
  number: number; // 1-72
  name: string;
  rank: string;
  description: string;
  correspondences: Record<string, any>;
  connections: number[]; // Codex 144:99 node connections
}

/**
 * ⚗️ Deity - The Principle
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
export interface Deity {
  name: string;
  tradition: string; // Greek, Hindu, Egyptian, Celtic, Norse, etc.
  domain: string;
  correspondences: Record<string, any>;
  connections: number[]; // Codex 144:99 node connections
}

// Soyga Tables (6 tables: A-F for elements)
export const SOYGA_TABLES: SoygaTable[] = [
  {
    id: 'soyga-a',
    name: 'Table A - Fire',
    element: 'Fire',
    correspondences: {
      planet: 'Mars',
      zodiac: 'Aries',
      color: '#FF4500',
      geometry: 'Tetrahedron'
    },
    connections: [1, 13, 25, 37, 49, 61, 73, 85, 97, 109, 121, 133] // Every 12th node
  },
  {
    id: 'soyga-b',
    name: 'Table B - Water',
    element: 'Water',
    correspondences: {
      planet: 'Moon',
      zodiac: 'Cancer',
      color: '#1E90FF',
      geometry: 'Icosahedron'
    },
    connections: [2, 14, 26, 38, 50, 62, 74, 86, 98, 110, 122, 134]
  },
  {
    id: 'soyga-c',
    name: 'Table C - Air',
    element: 'Air',
    correspondences: {
      planet: 'Mercury',
      zodiac: 'Gemini',
      color: '#87CEEB',
      geometry: 'Octahedron'
    },
    connections: [3, 15, 27, 39, 51, 63, 75, 87, 99, 111, 123, 135]
  },
  {
    id: 'soyga-d',
    name: 'Table D - Earth',
    element: 'Earth',
    correspondences: {
      planet: 'Venus',
      zodiac: 'Taurus',
      color: '#8B4513',
      geometry: 'Cube'
    },
    connections: [4, 16, 28, 40, 52, 64, 76, 88, 100, 112, 124, 136]
  },
  {
    id: 'soyga-e',
    name: 'Table E - Spirit',
    element: 'Spirit',
    correspondences: {
      planet: 'Sun',
      zodiac: 'Leo',
      color: '#FFD700',
      geometry: 'Dodecahedron'
    },
    connections: [5, 17, 29, 41, 53, 65, 77, 89, 101, 113, 125, 137]
  },
  {
    id: 'soyga-f',
    name: 'Table F - Shadow',
    element: 'Shadow',
    correspondences: {
      planet: 'Saturn',
      zodiac: 'Capricorn',
      color: '#2F2F2F',
      geometry: 'Inverted Tetrahedron'
    },
    connections: [6, 18, 30, 42, 54, 66, 78, 90, 102, 114, 126, 138]
  }
];

// I Ching Hexagrams (sample - full 64 would be here)
export const I_CHING_HEXAGRAMS: IChingHexagram[] = [
  {
    number: 1,
    name: 'The Creative',
    chinese: '乾',
    meaning: 'Heaven, Creative Force, Yang',
    lines: '111111', // All yang
    correspondences: {
      element: 'Heaven',
      direction: 'North',
      season: 'Summer',
      color: '#FFD700'
    },
    connections: [1, 73, 144] // Connected Codex nodes
  },
  {
    number: 2,
    name: 'The Receptive',
    chinese: '坤',
    meaning: 'Earth, Receptive Force, Yin',
    lines: '000000', // All yin
    correspondences: {
      element: 'Earth',
      direction: 'South',
      season: 'Winter',
      color: '#8B4513'
    },
    connections: [2, 74, 99]
  },
  // Continue with all 64 hexagrams...
];

// 72 Shem Angels (sample - full 72 would be here)
export const SHEM_ANGELS: ShemAngel[] = [
  {
    number: 1,
    name: 'Vehuiah',
    meaning: 'God who exalts',
    planet: 'Mercury',
    correspondences: {
      element: 'Fire',
      zodiac: 'Aries',
      color: '#FF4500'
    },
    connections: [1, 13, 25]
  },
  {
    number: 2,
    name: 'Jeliel',
    meaning: 'God who helps',
    planet: 'Moon',
    correspondences: {
      element: 'Water',
      zodiac: 'Cancer',
      color: '#1E90FF'
    },
    connections: [2, 14, 26]
  },
  // Continue with all 72 angels...
];

// 72 Goetia Demons (sample - full 72 would be here)
export const GOETIA_DEMONS: GoetiaDemon[] = [
  {
    number: 1,
    name: 'Bael',
    rank: 'King',
    description: 'First king of Hell, appears as a cat, toad, or man, or all three',
    correspondences: {
      element: 'Fire',
      planet: 'Mars',
      color: '#FF4500'
    },
    connections: [1, 13, 25]
  },
  {
    number: 2,
    name: 'Agares',
    rank: 'Duke',
    description: 'Teaches languages, can cause earthquakes',
    correspondences: {
      element: 'Earth',
      planet: 'Venus',
      color: '#8B4513'
    },
    connections: [2, 14, 26]
  },
  // Continue with all 72 demons...
];

// Deities from various traditions (sample)
export const DEITIES: Deity[] = [
  // Greek
  {
    name: 'Hermes',
    tradition: 'Greek',
    domain: 'Communication, Magic, Travel',
    correspondences: {
      element: 'Mercury',
      planet: 'Mercury',
      color: '#FFD700'
    },
    connections: [1, 3, 5]
  },
  {
    name: 'Hecate',
    tradition: 'Greek',
    domain: 'Magic, Crossroads, Shadow',
    correspondences: {
      element: 'Shadow',
      planet: 'Moon',
      color: '#2F2F2F'
    },
    connections: [6, 18, 30]
  },
  // Hindu
  {
    name: 'Shiva',
    tradition: 'Hindu',
    domain: 'Destruction, Transformation, Yoga',
    correspondences: {
      element: 'Fire',
      planet: 'Saturn',
      color: '#FF4500'
    },
    connections: [1, 13, 25]
  },
  {
    name: 'Kali',
    tradition: 'Hindu',
    domain: 'Time, Death, Transformation',
    correspondences: {
      element: 'Shadow',
      planet: 'Saturn',
      color: '#2F2F2F'
    },
    connections: [6, 18, 30]
  },
  // Egyptian
  {
    name: 'Thoth',
    tradition: 'Egyptian',
    domain: 'Wisdom, Writing, Magic',
    correspondences: {
      element: 'Mercury',
      planet: 'Mercury',
      color: '#FFD700'
    },
    connections: [1, 3, 5]
  },
  {
    name: 'Isis',
    tradition: 'Egyptian',
    domain: 'Magic, Healing, Protection',
    correspondences: {
      element: 'Water',
      planet: 'Moon',
      color: '#1E90FF'
    },
    connections: [2, 14, 26]
  },
  // Celtic
  {
    name: 'Brigid',
    tradition: 'Celtic',
    domain: 'Fire, Poetry, Healing',
    correspondences: {
      element: 'Fire',
      planet: 'Sun',
      color: '#FF4500'
    },
    connections: [1, 13, 25]
  },
  {
    name: 'The Morrigan',
    tradition: 'Celtic',
    domain: 'War, Fate, Sovereignty',
    correspondences: {
      element: 'Shadow',
      planet: 'Mars',
      color: '#2F2F2F'
    },
    connections: [6, 18, 30]
  },
  // Norse
  {
    name: 'Odin',
    tradition: 'Norse',
    domain: 'Wisdom, Magic, Poetry',
    correspondences: {
      element: 'Air',
      planet: 'Mercury',
      color: '#87CEEB'
    },
    connections: [3, 15, 27]
  },
  {
    name: 'Freyja',
    tradition: 'Norse',
    domain: 'Love, War, Magic',
    correspondences: {
      element: 'Venus',
      planet: 'Venus',
      color: '#FF69B4'
    },
    connections: [4, 16, 28]
  },
  // Continue with deities from all traditions...
  // Yoruba, Shinto, Native American, African, etc.
];

/**
 * Get Soyga table by element
 */
/**
 * ⚗️ GetSoygaTable - Solve et Coagula
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
export function getSoygaTable(element: string): SoygaTable | undefined {
  return SOYGA_TABLES.find(table => table.element === element);
}

/**
 * Get I Ching hexagram by number
 */
/**
 * ⚗️ GetIChingHexagram - Solve et Coagula
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
export function getIChingHexagram(number: number): IChingHexagram | undefined {
  return I_CHING_HEXAGRAMS.find(hex => hex.number === number);
}

/**
 * Get Shem Angel by number
 */
/**
 * ⚗️ GetShemAngel - Solve et Coagula
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
export function getShemAngel(number: number): ShemAngel | undefined {
  return SHEM_ANGELS.find(angel => angel.number === number);
}

/**
 * Get Goetia Demon by number
 */
/**
 * ⚗️ GetGoetiaDemon - Solve et Coagula
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
export function getGoetiaDemon(number: number): GoetiaDemon | undefined {
  return GOETIA_DEMONS.find(demon => demon.number === number);
}

/**
 * Get deities by tradition
 */
/**
 * ⚗️ GetDeitiesByTradition - Solve et Coagula
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
export function getDeitiesByTradition(tradition: string): Deity[] {
  return DEITIES.filter(deity => deity.tradition === tradition);
}

/**
 * Get all correspondences for a Codex node
 */
/**
 * ⚗️ GetNodeCorrespondences - Solve et Coagula
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
export function getNodeCorrespondences(nodeId: number): {
  soyga?: SoygaTable;
  iChing?: IChingHexagram;
  shemAngel?: ShemAngel;
  goetiaDemon?: GoetiaDemon;
  deities?: Deity[];
} {
  const correspondences: any = {};
  
  // Find Soyga table
  const soygaTable = SOYGA_TABLES.find(table => table.connections.includes(nodeId));
  if (soygaTable) correspondences.soyga = soygaTable;
  
  // Find I Ching hexagram
  const iChing = I_CHING_HEXAGRAMS.find(hex => hex.connections.includes(nodeId));
  if (iChing) correspondences.iChing = iChing;
  
  // Find Shem Angel
  const shemAngel = SHEM_ANGELS.find(angel => angel.connections.includes(nodeId));
  if (shemAngel) correspondences.shemAngel = shemAngel;
  
  // Find Goetia Demon
  const goetiaDemon = GOETIA_DEMONS.find(demon => demon.connections.includes(nodeId));
  if (goetiaDemon) correspondences.goetiaDemon = goetiaDemon;
  
  // Find Deities
  const deities = DEITIES.filter(deity => deity.connections.includes(nodeId));
  if (deities.length > 0) correspondences.deities = deities;
  
  return correspondences;
}
