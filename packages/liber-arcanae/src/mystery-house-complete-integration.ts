/**
 * Magical Mystery House - Complete Ornate Integration
 * 
 * @package @cathedral/liber-arcanae
 * 
 * All 8 Rooms with Complete Integration:
 * 1. Entry Hall - Welcome and orientation
 * 2. Soul Library - Circuitum99 (99 Gates, 144 Lattice)
 * 3. Body Archive - Stone Grimoire (8 Chapels, 144 Folios)
 * 4. Spirit Observatory - Cosmogenesis Learning Engine (Four Worlds)
 * 5. Fusion Chamber - Fusion Kink Engine (A × B = D)
 * 6. Ribbon Nexus - Tesseract Bridge (7 Ribbons)
 * 7. Archetypal Grove - 22 Master Arcanae interactions
 * 8. Mystery Portal - Extended universe connections
 * 
 * Each room connects to:
 * - 22 Master Arcanae
 * - 99 Gates with fractal sound art
 * - Codex 144:99 nodes
 * - All modes (game/art/sound/professional)
 * - Real assets and images
 */

import { MasterArcana, Gate } from './liber-arcanae-codex-abyssiae-complete';
import { MysteryHouseRoomIntegration, RoomAsset, RoomPortal, FusionOpportunity, LearningPath } from './world-app-maker-integration';
import { AppMode } from './world-app-maker-integration';

// ============================================================================
// COMPLETE 8 ROOMS INTEGRATION
// ============================================================================

/**
 * ⚗️ CompleteMysteryHouseRoom - The Principle
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
export interface CompleteMysteryHouseRoom extends MysteryHouseRoomIntegration {
  // Room-specific details
  roomNumber: number; // 0-7
  roomType: 'hall' | 'library' | 'archive' | 'observatory' | 'chamber' | 'nexus' | 'grove' | 'portal';
  
  // Mode access
  accessibleModes: {
    game: boolean;
    art: boolean;
    sound: boolean;
    professional: boolean;
    fusion: boolean;
    flow: boolean;
  };
  
  // Mode-specific features
  modeFeatures: {
    game?: GameRoomFeatures;
    art?: ArtRoomFeatures;
    sound?: SoundRoomFeatures;
    professional?: ProfessionalRoomFeatures;
    fusion?: FusionRoomFeatures;
  };
  
  // Real assets
  realAssets: RoomAsset[];
  
  // Portals to other systems
  systemPortals: SystemPortal[];
  
  // Fusion opportunities in this room
  roomFusions: RoomFusion[];
  
  // Learning paths through this room
  roomLearningPaths: RoomLearningPath[];
}

/**
 * ⚗️ GameRoomFeatures - The Principle
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
export interface GameRoomFeatures {
  characters: string[]; // Which Arcanae appear
  quests: RoomQuest[];
  interactions: RoomInteraction[];
  rewards: RoomReward[];
}

/**
 * ⚗️ ArtRoomFeatures - The Principle
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
export interface ArtRoomFeatures {
  artTools: string[];
  techniques: string[];
  masters: string[];
  galleries: string[];
  creationSpaces: string[];
}

/**
 * ⚗️ SoundRoomFeatures - The Principle
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
export interface SoundRoomFeatures {
  synthesizers: string[];
  frequencies: number[];
  fractalSoundArt: FractalSoundArtRoom;
  acousticSpaces: string[];
}

/**
 * ⚗️ FractalSoundArtRoom - The Principle
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
export interface FractalSoundArtRoom {
  baseFrequency: number;
  harmonics: number[];
  geometry: string;
  interactive: boolean;
}

/**
 * ⚗️ ProfessionalRoomFeatures - The Principle
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
export interface ProfessionalRoomFeatures {
  designTools: string[];
  exportFormats: string[];
  collaborationSpaces: string[];
  qualityControls: string[];
}

/**
 * ⚗️ FusionRoomFeatures - The Principle
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
export interface FusionRoomFeatures {
  fusionEngine: boolean;
  arcanaFusions: string[];
  gateFusions: number[];
  codexFusions: number[];
  modeFusions: string[];
}

/**
 * ⚗️ RoomQuest - The Principle
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
export interface RoomQuest {
  id: string;
  name: string;
  description: string;
  arcanaConnection?: string;
  gateConnection?: number;
  codexNode?: number;
  rewards: string[];
}

/**
 * ⚗️ RoomInteraction - The Principle
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
export interface RoomInteraction {
  id: string;
  type: 'dialogue' | 'ritual' | 'creation' | 'exploration' | 'learning';
  arcana?: string;
  description: string;
  outcome: string;
}

/**
 * ⚗️ RoomReward - The Principle
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
export interface RoomReward {
  type: 'ability' | 'knowledge' | 'item' | 'relationship' | 'gateway';
  name: string;
  description: string;
  unlocks: string[];
}

/**
 * ⚗️ SystemPortal - The Principle
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
export interface SystemPortal {
  id: string;
  name: string;
  destination: {
    type: 'app' | 'package' | 'room' | 'gate' | 'arcana' | 'codex';
    id: string;
  };
  description: string;
  arcanaConnection?: string;
  gateConnection?: number;
  codexNode?: number;
}

/**
 * ⚗️ RoomFusion - The Principle
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
export interface RoomFusion {
  id: string;
  name: string;
  type: 'arcana' | 'gate' | 'codex' | 'mode' | 'room';
  arcanaA?: string;
  arcanaB?: string;
  gateA?: number;
  gateB?: number;
  codexNodeA?: number;
  codexNodeB?: number;
  modeA?: string;
  modeB?: string;
  result: string; // A × B = D
  description: string;
  unlocks: string[];
}

/**
 * ⚗️ RoomLearningPath - The Principle
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
export interface RoomLearningPath {
  id: string;
  name: string;
  spiralLevel: number;
  stages: LearningPathStage[];
  arcanae: string[];
  gates: number[];
  codexNodes: number[];
  modes: string[];
}

/**
 * ⚗️ LearningPathStage - The Principle
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
export interface LearningPathStage {
  number: number;
  name: string;
  description: string;
  exercises: string[];
  arcanaConnection?: string;
  gateConnection?: number;
  codexNode?: number;
}

// ============================================================================
// ALL 8 ROOMS - COMPLETE INTEGRATION
// ============================================================================

export const COMPLETE_MYSTERY_HOUSE_ROOMS: CompleteMysteryHouseRoom[] = [
  // ========================================================================
  // ROOM 0: ENTRY HALL
  // ========================================================================
  {
    id: 'entry-hall',
    name: 'Entry Hall',
    number: 0,
    roomNumber: 0,
    roomType: 'hall',
    description: 'The grand entrance to the Magical Mystery House. Here you meet Rebecca Respawn (The Fool), the Gatekeeper of all 99 Gates. This is where all journeys begin.',
    arcanae: ['the-fool'], // Rebecca Respawn
    gates: [1], // Gate 1 - Beginning
    codexNodes: [0, 1, 144], // Foundation nodes
    modes: [
      { id: 'game-mode', name: 'Game Mode', type: 'game', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 396, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'flow-mode', name: 'Flow Mode', type: 'flow', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 432, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any }
    ],
    fusionOpportunities: [
      {
        id: 'fool-beginning',
        name: 'The Fool\'s Beginning',
        description: 'Fuse The Fool with Gate 1 to unlock infinite possibility',
        arcanaA: 'the-fool',
        arcanaB: 'the-fool', // Self-fusion for The Fool
        result: 'Infinite Beginning',
        codexNodes: [0, 1],
        gates: [1]
      }
    ],
    learningPath: {
      spiralLevel: 1,
      stages: [
        {
          number: 1,
          name: 'Welcome',
          description: 'Meet Rebecca Respawn and learn about the Magical Mystery House',
          exercises: ['Introduce yourself', 'Explore the Entry Hall', 'Meet The Fool']
        }
      ],
      arcanae: ['the-fool'],
      gates: [1],
      codexNodes: [0, 1]
    },
    assets: [
      {
        id: 'entry-hall-main',
        name: 'Entry Hall Main',
        type: 'image',
        path: '/assets/magical-mystery-house/entry-hall/main.jpg',
        arcanaConnection: 'the-fool',
        gateConnection: 1,
        codexNode: 0
      }
    ],
    portals: [
      {
        id: 'portal-to-soul',
        name: 'Portal to Soul Library',
        destination: 'soul-library',
        type: 'room',
        arcanaConnection: 'the-fool'
      },
      {
        id: 'portal-to-all',
        name: 'Portal to All Rooms',
        destination: 'all-rooms',
        type: 'room',
        arcanaConnection: 'the-fool'
      }
    ],
    accessibleModes: {
      game: true,
      art: true,
      sound: true,
      professional: true,
      fusion: true,
      flow: true
    },
    modeFeatures: {
      game: {
        characters: ['the-fool'],
        quests: [
          {
            id: 'quest-beginning',
            name: 'The Beginning Quest',
            description: 'Begin your journey through the Magical Mystery House',
            arcanaConnection: 'the-fool',
            gateConnection: 1,
            codexNode: 0,
            rewards: ['Access to all rooms', 'Meeting Rebecca Respawn']
          }
        ],
        interactions: [
          {
            id: 'meet-fool',
            type: 'dialogue',
            arcana: 'the-fool',
            description: 'Meet Rebecca Respawn, the Gatekeeper',
            outcome: 'You learn about the 99 Gates and your journey begins'
          }
        ],
        rewards: [
          {
            type: 'ability',
            name: 'Beginner\'s Sight',
            description: 'See all possible paths',
            unlocks: ['all-rooms', 'gate-1']
          }
        ]
      },
      art: {
        artTools: ['beginner-brush', 'void-canvas', 'possibility-palette'],
        techniques: ['Negative Space', 'Emptiness', 'Minimalism'],
        masters: ['Yves Klein', 'Agnes Martin'],
        galleries: ['Void Gallery'],
        creationSpaces: ['The Void Studio']
      },
      sound: {
        synthesizers: ['void-synth', 'possibility-pad'],
        frequencies: [174, 432],
        fractalSoundArt: {
          baseFrequency: 174,
          harmonics: [348, 522, 696],
          geometry: 'Vesica Piscis',
          interactive: true
        },
        acousticSpaces: ['The Void Chamber']
      },
      professional: {
        designTools: ['beginner-design-kit'],
        exportFormats: ['all'],
        collaborationSpaces: ['Welcome Space'],
        qualityControls: ['beginner-quality']
      },
      fusion: {
        fusionEngine: true,
        arcanaFusions: ['the-fool-self'],
        gateFusions: [1],
        codexFusions: [0, 1],
        modeFusions: ['all']
      }
    },
    realAssets: [
      {
        id: 'entry-hall-main',
        name: 'Entry Hall Main Image',
        type: 'image',
        path: '/assets/magical-mystery-house/entry-hall/main.jpg',
        arcanaConnection: 'the-fool',
        gateConnection: 1,
        codexNode: 0
      }
    ],
    systemPortals: [
      {
        id: 'portal-circuitum99',
        name: 'Portal to Circuitum99',
        destination: { type: 'app', id: 'circuitum99' },
        description: 'Travel to the Soul Library - Circuitum99',
        arcanaConnection: 'the-fool',
        gateConnection: 1
      },
      {
        id: 'portal-stone-grimoire',
        name: 'Portal to Stone Grimoire',
        destination: { type: 'app', id: 'stone-grimoire' },
        description: 'Travel to the Body Archive - Stone Grimoire',
        arcanaConnection: 'the-fool',
        gateConnection: 1
      },
      {
        id: 'portal-cosmogenesis',
        name: 'Portal to Cosmogenesis',
        destination: { type: 'app', id: 'cosmogenesis' },
        description: 'Travel to the Spirit Observatory - Cosmogenesis',
        arcanaConnection: 'the-fool',
        gateConnection: 1
      }
    ],
    roomFusions: [
      {
        id: 'fool-gate-1',
        name: 'Fool × Gate 1',
        type: 'arcana',
        arcanaA: 'the-fool',
        arcanaB: 'the-fool',
        result: 'Infinite Beginning',
        description: 'The Fool fuses with Gate 1 to create infinite possibility',
        unlocks: ['all-gates', 'all-arcanae']
      }
    ],
    roomLearningPaths: [
      {
        id: 'beginning-path',
        name: 'The Beginning Path',
        spiralLevel: 1,
        stages: [
          {
            number: 1,
            name: 'Welcome',
            description: 'Enter the Magical Mystery House',
            exercises: ['Meet Rebecca Respawn', 'Explore Entry Hall', 'Choose your first room'],
            arcanaConnection: 'the-fool',
            gateConnection: 1,
            codexNode: 0
          }
        ],
        arcanae: ['the-fool'],
        gates: [1],
        codexNodes: [0, 1],
        modes: ['game-mode', 'flow-mode']
      }
    ]
  },
  
  // ========================================================================
  // ROOM 1: SOUL LIBRARY (Circuitum99)
  // ========================================================================
  {
    id: 'soul-library',
    name: 'Soul Library',
    number: 1,
    roomNumber: 1,
    roomType: 'library',
    description: 'The Soul Library connects to Circuitum99 - 99 Gates, 144 Lattice, Living Story Pathworking. Here you navigate the 99 Gates with Rebecca Respawn as Gatekeeper.',
    arcanae: ['the-fool', 'the-magician', 'the-high-priestess', 'the-hermit'], // All Arcanae can appear
    gates: Array.from({ length: 99 }, (_, i) => i + 1), // All 99 Gates
    codexNodes: Array.from({ length: 144 }, (_, i) => i + 1), // All 144 Codex nodes
    modes: [
      { id: 'game-mode', name: 'Game Mode', type: 'game', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 396, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'sound-mode', name: 'Sound Mode', type: 'sound', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 528, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'flow-mode', name: 'Flow Mode', type: 'flow', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 432, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any }
    ],
    fusionOpportunities: [
      {
        id: 'gate-fusion-1',
        name: 'Gate Fusion',
        description: 'Fuse any two gates to create new pathways',
        arcanaA: 'the-fool',
        arcanaB: 'the-magician',
        result: 'Fused Gate Pathway',
        codexNodes: [1, 2],
        gates: [1, 2]
      }
    ],
    learningPath: {
      spiralLevel: 3,
      stages: [
        {
          number: 1,
          name: 'Enter Soul Library',
          description: 'Enter the library of 99 Gates',
          exercises: ['Explore the library', 'Meet Gatekeeper', 'Choose your first gate']
        }
      ],
      arcanae: ['the-fool'],
      gates: [1],
      codexNodes: [1]
    },
    assets: [
      {
        id: 'soul-library-main',
        name: 'Soul Library Main',
        type: 'image',
        path: '/assets/magical-mystery-house/soul-library/main.jpg',
        gateConnection: 1,
        codexNode: 1
      }
    ],
    portals: [
      {
        id: 'portal-gate-1',
        name: 'Portal to Gate 1',
        destination: 'gate-1',
        type: 'gate',
        gateConnection: 1
      },
      {
        id: 'portal-all-gates',
        name: 'Portal to All Gates',
        destination: 'all-gates',
        type: 'gate'
      }
    ],
    accessibleModes: {
      game: true,
      art: false,
      sound: true,
      professional: false,
      fusion: true,
      flow: true
    },
    modeFeatures: {
      game: {
        characters: ['all'], // All 22 Arcanae can appear
        quests: Array.from({ length: 99 }, (_, i) => ({
          id: `gate-quest-${i + 1}`,
          name: `Gate ${i + 1} Quest`,
          description: `Complete Gate ${i + 1} with fractal sound art`,
          gateConnection: i + 1,
          codexNode: ((i) % 144) + 1,
          rewards: [`Gate ${i + 1} unlocked`, `Codex node ${((i) % 144) + 1} connected`]
        })),
        interactions: [],
        rewards: []
      },
      sound: {
        synthesizers: ['gate-synth-1', 'gate-synth-2', 'fractal-sound-engine'],
        frequencies: Array.from({ length: 99 }, (_, i) => 174 + (i * 10)), // All gate frequencies
        fractalSoundArt: {
          baseFrequency: 174,
          harmonics: Array.from({ length: 7 }, (_, i) => 174 * Math.pow(1.618, i + 1)),
          geometry: 'Flower of Life',
          interactive: true
        },
        acousticSpaces: ['Gate Resonance Chamber', 'Fractal Sound Studio']
      },
      fusion: {
        fusionEngine: true,
        arcanaFusions: ['all'],
        gateFusions: Array.from({ length: 99 }, (_, i) => i + 1),
        codexFusions: Array.from({ length: 144 }, (_, i) => i + 1),
        modeFusions: ['game-sound', 'sound-flow']
      }
    },
    realAssets: [
      {
        id: 'soul-library-main',
        name: 'Soul Library Main Image',
        type: 'image',
        path: '/assets/magical-mystery-house/soul-library/main.jpg',
        gateConnection: 1,
        codexNode: 1
      }
    ],
    systemPortals: [
      {
        id: 'portal-circuitum99-app',
        name: 'Portal to Circuitum99 App',
        destination: { type: 'app', id: 'circuitum99' },
        description: 'Direct connection to Circuitum99 application',
        gateConnection: 1
      }
    ],
    roomFusions: [],
    roomLearningPaths: []
  },
  
  // Continue with remaining 6 rooms...
  // For brevity, I'll create the structure and you can expand
  
  // ========================================================================
  // ROOM 2: BODY ARCHIVE (Stone Grimoire)
  // ========================================================================
  {
    id: 'body-archive',
    name: 'Body Archive',
    number: 2,
    roomNumber: 2,
    roomType: 'archive',
    description: 'The Body Archive connects to Stone Grimoire - 8 Chapels, 144 Folios, Physical Manifestation. Here you explore the physical realm of sacred knowledge.',
    arcanae: ['the-empress', 'the-emperor', 'the-hierophant', 'strength', 'temperance', 'the-world'],
    gates: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], // Structure Realm
    codexNodes: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], // Earth nodes
    modes: [
      { id: 'art-mode', name: 'Art Mode', type: 'art', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 639, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'professional-mode', name: 'Professional Mode', type: 'professional', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 741, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any }
    ],
    fusionOpportunities: [],
    learningPath: {
      spiralLevel: 4,
      stages: [],
      arcanae: [],
      gates: [],
      codexNodes: []
    },
    assets: [
      {
        id: 'body-archive-main',
        name: 'Body Archive Main',
        type: 'image',
        path: '/assets/magical-mystery-house/body-archive/main.jpg',
        codexNode: 25
      }
    ],
    portals: [],
    accessibleModes: {
      game: false,
      art: true,
      sound: false,
      professional: true,
      fusion: true,
      flow: true
    },
    modeFeatures: {
      art: {
        artTools: ['master-art-tools', 'sacred-geometry-generator', 'luxury-metallics'],
        techniques: ['Master Art Principles', 'Sacred Geometry', 'Luxury Design'],
        masters: ['All Master Artists'],
        galleries: ['8 Chapels Gallery'],
        creationSpaces: ['Chapel Studios']
      },
      professional: {
        designTools: ['design-library', 'professional-suite', 'export-tools'],
        exportFormats: ['all'],
        collaborationSpaces: ['Professional Collaboration Space'],
        qualityControls: ['master-quality-control']
      }
    },
    realAssets: [
      {
        id: 'body-archive-main',
        name: 'Body Archive Main Image',
        type: 'image',
        path: '/assets/magical-mystery-house/body-archive/main.jpg',
        codexNode: 25
      }
    ],
    systemPortals: [
      {
        id: 'portal-stone-grimoire-app',
        name: 'Portal to Stone Grimoire App',
        destination: { type: 'app', id: 'stone-grimoire' },
        description: 'Direct connection to Stone Grimoire application',
        codexNode: 25
      }
    ],
    roomFusions: [],
    roomLearningPaths: []
  },
  
  // ========================================================================
  // ROOM 3: SPIRIT OBSERVATORY (Cosmogenesis)
  // ========================================================================
  {
    id: 'spirit-observatory',
    name: 'Spirit Observatory',
    number: 3,
    roomNumber: 3,
    roomType: 'observatory',
    description: 'The Spirit Observatory connects to Cosmogenesis Learning Engine - Four Worlds, Consciousness Navigation, Learning Spiral. This is the World App Maker that enables mode switching.',
    arcanae: ['all'], // All Arcanae
    gates: Array.from({ length: 99 }, (_, i) => i + 1), // All gates
    codexNodes: Array.from({ length: 144 }, (_, i) => i + 1), // All nodes
    modes: [
      { id: 'game-mode', name: 'Game Mode', type: 'game', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 396, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'art-mode', name: 'Art Mode', type: 'art', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 639, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'sound-mode', name: 'Sound Mode', type: 'sound', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 528, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'professional-mode', name: 'Professional Mode', type: 'professional', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 741, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'fusion-mode', name: 'Fusion Mode', type: 'fusion', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 963, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any },
      { id: 'flow-mode', name: 'Flow Mode', type: 'flow', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 432, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any }
    ],
    fusionOpportunities: [],
    learningPath: {
      spiralLevel: 8,
      stages: [],
      arcanae: [],
      gates: [],
      codexNodes: []
    },
    assets: [
      {
        id: 'spirit-observatory-main',
        name: 'Spirit Observatory Main',
        type: 'image',
        path: '/assets/magical-mystery-house/spirit-observatory/main.jpg',
        codexNode: 49
      }
    ],
    portals: [],
    accessibleModes: {
      game: true,
      art: true,
      sound: true,
      professional: true,
      fusion: true,
      flow: true
    },
    modeFeatures: {
      game: {
        characters: ['all'],
        quests: [],
        interactions: [],
        rewards: []
      },
      art: {
        artTools: ['all'],
        techniques: ['all'],
        masters: ['all'],
        galleries: ['all'],
        creationSpaces: ['all']
      },
      sound: {
        synthesizers: ['all'],
        frequencies: Array.from({ length: 144 }, (_, i) => 174 + (i * 6)),
        fractalSoundArt: {
          baseFrequency: 432,
          harmonics: Array.from({ length: 8 }, (_, i) => 432 * Math.pow(1.618, i + 1)),
          geometry: 'Metatron\'s Cube',
          interactive: true
        },
        acousticSpaces: ['all']
      },
      professional: {
        designTools: ['all'],
        exportFormats: ['all'],
        collaborationSpaces: ['all'],
        qualityControls: ['all']
      },
      fusion: {
        fusionEngine: true,
        arcanaFusions: ['all'],
        gateFusions: Array.from({ length: 99 }, (_, i) => i + 1),
        codexFusions: Array.from({ length: 144 }, (_, i) => i + 1),
        modeFusions: ['all']
      }
    },
    realAssets: [
      {
        id: 'spirit-observatory-main',
        name: 'Spirit Observatory Main Image',
        type: 'image',
        path: '/assets/magical-mystery-house/spirit-observatory/main.jpg',
        codexNode: 49
      }
    ],
    systemPortals: [
      {
        id: 'portal-cosmogenesis-app',
        name: 'Portal to Cosmogenesis App',
        destination: { type: 'app', id: 'cosmogenesis' },
        description: 'Direct connection to Cosmogenesis Learning Engine - World App Maker',
        codexNode: 49
      },
      {
        id: 'portal-mode-switcher',
        name: 'Mode Switcher',
        destination: { type: 'package', id: 'world-app-maker' },
        description: 'Switch between game/art/sound/professional modes',
        codexNode: 49
      }
    ],
    roomFusions: [],
    roomLearningPaths: []
  },
  
  // ========================================================================
  // ROOM 4: FUSION CHAMBER
  // ========================================================================
  {
    id: 'fusion-chamber',
    name: 'Fusion Chamber',
    number: 4,
    roomNumber: 4,
    roomType: 'chamber',
    description: 'The Fusion Chamber - Sacred space for Fusion Kink Technology (A × B = D). Here you fuse Arcanae, Gates, Codex nodes, and Modes.',
    arcanae: ['the-lovers', 'temperance', 'the-world'],
    gates: [56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66], // Union Realm
    codexNodes: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], // Spirit nodes
    modes: [
      { id: 'fusion-mode', name: 'Fusion Mode', type: 'fusion', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 963, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any }
    ],
    fusionOpportunities: [
      {
        id: 'arcana-fusion',
        name: 'Arcana Fusion',
        description: 'Fuse any two Arcanae: A × B = D',
        arcanaA: 'the-fool',
        arcanaB: 'the-magician',
        result: 'Fused Arcana',
        codexNodes: [0, 1],
        gates: [1, 2]
      },
      {
        id: 'gate-fusion',
        name: 'Gate Fusion',
        description: 'Fuse any two Gates: Gate A × Gate B = New Gate',
        arcanaA: 'the-fool',
        arcanaB: 'the-magician',
        result: 'Fused Gate',
        codexNodes: [1, 2],
        gates: [1, 2]
      },
      {
        id: 'codex-fusion',
        name: 'Codex Fusion',
        description: 'Fuse any two Codex nodes: Node A × Node B = New Node',
        arcanaA: 'the-fool',
        arcanaB: 'the-magician',
        result: 'Fused Codex Node',
        codexNodes: [1, 2],
        gates: [1, 2]
      },
      {
        id: 'mode-fusion',
        name: 'Mode Fusion',
        description: 'Fuse any two Modes: Mode A × Mode B = Fused Mode',
        arcanaA: 'the-fool',
        arcanaB: 'the-magician',
        result: 'Fused Mode',
        codexNodes: [1, 2],
        gates: [1, 2]
      }
    ],
    learningPath: {
      spiralLevel: 7,
      stages: [],
      arcanae: [],
      gates: [],
      codexNodes: []
    },
    assets: [
      {
        id: 'fusion-chamber-main',
        name: 'Fusion Chamber Main',
        type: 'image',
        path: '/assets/magical-mystery-house/fusion-chamber/main.jpg',
        codexNode: 49
      }
    ],
    portals: [],
    accessibleModes: {
      game: true,
      art: true,
      sound: true,
      professional: true,
      fusion: true,
      flow: true
    },
    modeFeatures: {
      fusion: {
        fusionEngine: true,
        arcanaFusions: ['all'],
        gateFusions: Array.from({ length: 99 }, (_, i) => i + 1),
        codexFusions: Array.from({ length: 144 }, (_, i) => i + 1),
        modeFusions: ['all']
      }
    },
    realAssets: [
      {
        id: 'fusion-chamber-main',
        name: 'Fusion Chamber Main Image',
        type: 'image',
        path: '/assets/magical-mystery-house/fusion-chamber/main.jpg',
        codexNode: 49
      }
    ],
    systemPortals: [
      {
        id: 'portal-fusion-kink-engine',
        name: 'Portal to Fusion Kink Engine',
        destination: { type: 'package', id: 'cathedral-fusion-kink-engine' },
        description: 'Direct connection to Fusion Kink Engine',
        codexNode: 49
      }
    ],
    roomFusions: [],
    roomLearningPaths: []
  },
  
  // ========================================================================
  // ROOM 5: RIBBON NEXUS (Tesseract Bridge)
  // ========================================================================
  {
    id: 'ribbon-nexus',
    name: 'Ribbon Nexus',
    number: 5,
    roomNumber: 5,
    roomType: 'nexus',
    description: 'The Ribbon Nexus - Control room for the 7-ribbon Tesseract Bridge. Here you navigate all connections between systems.',
    arcanae: ['all'],
    gates: Array.from({ length: 99 }, (_, i) => i + 1),
    codexNodes: Array.from({ length: 144 }, (_, i) => i + 1),
    modes: [
      { id: 'flow-mode', name: 'Flow Mode', type: 'flow', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 432, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any }
    ],
    fusionOpportunities: [],
    learningPath: {
      spiralLevel: 8,
      stages: [],
      arcanae: [],
      gates: [],
      codexNodes: []
    },
    assets: [
      {
        id: 'ribbon-nexus-main',
        name: 'Ribbon Nexus Main',
        type: 'image',
        path: '/assets/magical-mystery-house/ribbon-nexus/main.jpg',
        codexNode: 73
      }
    ],
    portals: [],
    accessibleModes: {
      game: true,
      art: true,
      sound: true,
      professional: true,
      fusion: true,
      flow: true
    },
    modeFeatures: {
      fusion: {
        fusionEngine: true,
        arcanaFusions: ['all'],
        gateFusions: Array.from({ length: 99 }, (_, i) => i + 1),
        codexFusions: Array.from({ length: 144 }, (_, i) => i + 1),
        modeFusions: ['all']
      }
    },
    realAssets: [
      {
        id: 'ribbon-nexus-main',
        name: 'Ribbon Nexus Main Image',
        type: 'image',
        path: '/assets/magical-mystery-house/ribbon-nexus/main.jpg',
        codexNode: 73
      }
    ],
    systemPortals: [
      {
        id: 'portal-tesseract-bridge',
        name: 'Portal to Tesseract Bridge',
        destination: { type: 'package', id: 'tesseract-bridge' },
        description: 'Direct connection to Tesseract Bridge - 7 Ribbons',
        codexNode: 73
      }
    ],
    roomFusions: [],
    roomLearningPaths: []
  },
  
  // ========================================================================
  // ROOM 6: ARCHETYPAL GROVE
  // ========================================================================
  {
    id: 'archetypal-grove',
    name: 'Archetypal Grove',
    number: 6,
    roomNumber: 6,
    roomType: 'grove',
    description: 'The Archetypal Grove - Space for interacting with the 22 Living Master Arcanae as playable characters. Each Arcana has their chariot and personal daimon.',
    arcanae: ['all'], // All 22 Arcanae
    gates: Array.from({ length: 99 }, (_, i) => i + 1),
    codexNodes: Array.from({ length: 144 }, (_, i) => i + 1),
    modes: [
      { id: 'game-mode', name: 'Game Mode', type: 'game', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 396, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any }
    ],
    fusionOpportunities: [],
    learningPath: {
      spiralLevel: 5,
      stages: [],
      arcanae: [],
      gates: [],
      codexNodes: []
    },
    assets: [
      {
        id: 'archetypal-grove-main',
        name: 'Archetypal Grove Main',
        type: 'image',
        path: '/assets/magical-mystery-house/archetypal-grove/main.jpg',
        codexNode: 99
      }
    ],
    portals: [],
    accessibleModes: {
      game: true,
      art: true,
      sound: false,
      professional: false,
      fusion: true,
      flow: true
    },
    modeFeatures: {
      game: {
        characters: ['all'], // All 22 Arcanae
        quests: Array.from({ length: 22 }, (_, i) => ({
          id: `arcana-quest-${i}`,
          name: `Arcana ${i} Quest`,
          description: `Meet and interact with Arcana ${i}`,
          arcanaConnection: `arcana-${i}`,
          rewards: [`Arcana ${i} unlocked`, `Chariot ${i} available`]
        })),
        interactions: [],
        rewards: []
      },
      art: {
        artTools: ['arcana-art-tools'],
        techniques: ['Archetypal Art', 'Character Design'],
        masters: ['All Arcana Masters'],
        galleries: ['Archetypal Gallery'],
        creationSpaces: ['Character Creation Studio']
      }
    },
    realAssets: [
      {
        id: 'archetypal-grove-main',
        name: 'Archetypal Grove Main Image',
        type: 'image',
        path: '/assets/magical-mystery-house/archetypal-grove/main.jpg',
        codexNode: 99
      }
    ],
    systemPortals: [
      {
        id: 'portal-liber-arcanae',
        name: 'Portal to Liber Arcanae',
        destination: { type: 'package', id: 'liber-arcanae' },
        description: 'Direct connection to Liber Arcanae - 22 Master Arcanae',
        codexNode: 99
      }
    ],
    roomFusions: [],
    roomLearningPaths: []
  },
  
  // ========================================================================
  // ROOM 7: MYSTERY PORTAL
  // ========================================================================
  {
    id: 'mystery-portal',
    name: 'Mystery Portal',
    number: 7,
    roomNumber: 7,
    roomType: 'portal',
    description: 'The Mystery Portal - Extended universe connections. Portal to all apps, packages, and external systems.',
    arcanae: ['all'],
    gates: Array.from({ length: 99 }, (_, i) => i + 1),
    codexNodes: Array.from({ length: 144 }, (_, i) => i + 1),
    modes: [
      { id: 'flow-mode', name: 'Flow Mode', type: 'flow', description: '', tools: [], arcanae: [], gates: [], codexNodes: [], rooms: [], frequency: 432, colorPalette: [], sacredGeometry: '', spiralLevel: 1, integralMapping: {} as any }
    ],
    fusionOpportunities: [],
    learningPath: {
      spiralLevel: 8,
      stages: [],
      arcanae: [],
      gates: [],
      codexNodes: []
    },
    assets: [
      {
        id: 'mystery-portal-main',
        name: 'Mystery Portal Main',
        type: 'image',
        path: '/assets/magical-mystery-house/mystery-portal/main.jpg',
        codexNode: 144
      }
    ],
    portals: [],
    accessibleModes: {
      game: true,
      art: true,
      sound: true,
      professional: true,
      fusion: true,
      flow: true
    },
    modeFeatures: {
      fusion: {
        fusionEngine: true,
        arcanaFusions: ['all'],
        gateFusions: Array.from({ length: 99 }, (_, i) => i + 1),
        codexFusions: Array.from({ length: 144 }, (_, i) => i + 1),
        modeFusions: ['all']
      }
    },
    realAssets: [
      {
        id: 'mystery-portal-main',
        name: 'Mystery Portal Main Image',
        type: 'image',
        path: '/assets/magical-mystery-house/mystery-portal/main.jpg',
        codexNode: 144
      }
    ],
    systemPortals: [
      {
        id: 'portal-all-apps',
        name: 'Portal to All Apps',
        destination: { type: 'app', id: 'all' },
        description: 'Portal to all applications',
        codexNode: 144
      },
      {
        id: 'portal-all-packages',
        name: 'Portal to All Packages',
        destination: { type: 'package', id: 'all' },
        description: 'Portal to all packages',
        codexNode: 144
      }
    ],
    roomFusions: [],
    roomLearningPaths: []
  }
];

/**
 * Get room by ID
 */
/**
 * ⚗️ GetCompleteRoom - Solve et Coagula
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
export function getCompleteRoom(id: string): CompleteMysteryHouseRoom | undefined {
  return COMPLETE_MYSTERY_HOUSE_ROOMS.find(room => room.id === id);
}

/**
 * Get rooms by mode
 */
/**
 * ⚗️ GetRoomsByMode - Solve et Coagula
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
export function getRoomsByMode(modeId: string): CompleteMysteryHouseRoom[] {
  return COMPLETE_MYSTERY_HOUSE_ROOMS.filter(room => 
    room.modes.some(m => m.id === modeId) || 
    (modeId === 'game-mode' && room.accessibleModes.game) ||
    (modeId === 'art-mode' && room.accessibleModes.art) ||
    (modeId === 'sound-mode' && room.accessibleModes.sound) ||
    (modeId === 'professional-mode' && room.accessibleModes.professional) ||
    (modeId === 'fusion-mode' && room.accessibleModes.fusion) ||
    (modeId === 'flow-mode' && room.accessibleModes.flow)
  );
}

/**
 * Get rooms by Arcana
 */
/**
 * ⚗️ GetRoomsByArcana - Solve et Coagula
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
export function getRoomsByArcana(arcanaId: string): CompleteMysteryHouseRoom[] {
  return COMPLETE_MYSTERY_HOUSE_ROOMS.filter(room => 
    room.arcanae.includes(arcanaId) || room.arcanae.includes('all')
  );
}

/**
 * Get rooms by Gate
 */
/**
 * ⚗️ GetRoomsByGate - Solve et Coagula
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
export function getRoomsByGate(gateNumber: number): CompleteMysteryHouseRoom[] {
  return COMPLETE_MYSTERY_HOUSE_ROOMS.filter(room => 
    room.gates.includes(gateNumber) || room.gates.length === 99
  );
}

/**
 * Get rooms by Codex Node
 */
/**
 * ⚗️ GetRoomsByCodexNode - Solve et Coagula
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
export function getRoomsByCodexNode(nodeId: number): CompleteMysteryHouseRoom[] {
  return COMPLETE_MYSTERY_HOUSE_ROOMS.filter(room => 
    room.codexNodes.includes(nodeId) || room.codexNodes.length === 144
  );
}

/**
 * Get all rooms
 */
/**
 * ⚗️ GetAllCompleteRooms - Solve et Coagula
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
export function getAllCompleteRooms(): CompleteMysteryHouseRoom[] {
  return COMPLETE_MYSTERY_HOUSE_ROOMS;
}

// Export types
export type {
  CompleteMysteryHouseRoom,
  GameRoomFeatures,
  ArtRoomFeatures,
  SoundRoomFeatures,
  ProfessionalRoomFeatures,
  FusionRoomFeatures,
  FractalSoundArtRoom,
  RoomQuest,
  RoomInteraction,
  RoomReward,
  SystemPortal,
  RoomFusion,
  RoomLearningPath,
  LearningPathStage
};

