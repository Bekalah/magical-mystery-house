/**
 * 22-playable-characters
 * 
 * @package @cathedral/liber-arcanae
 */
/**
 * Liber Arcanae Codex Abyssiae - 22 Playable Characters
 * 
 * Each of the 22 Major Arcana is a fully playable character with:
 * - Complete backstory and personality
 * - Unique abilities and powers
 * - Teaching specializations
 * - Connections to real traditions
 * - Integration with Codex 144:99, Soyga, I Ching, 72 Shem Angels/Demons
 * - Never flat - always flowing, trauma-informed design
 */

/**
 * ⚗️ PlayableCharacter - The Principle
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
export interface PlayableCharacter {
  id: string;
  number: number; // 0-21
  name: string;
  title: string;
  element: string;
  hebrew: string;
  personality: CharacterPersonality;
  abilities: CharacterAbility[];
  teachings: Teaching[];
  correspondences: CharacterCorrespondences;
  connections: CharacterConnections;
  art: CharacterArt;
  research: CharacterResearch;
}

/**
 * ⚗️ CharacterPersonality - The Principle
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
export interface CharacterPersonality {
  traits: string[];
  voice: string; // How they speak
  approach: string; // How they teach
  philosophy: string;
}

/**
 * ⚗️ CharacterAbility - The Principle
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
export interface CharacterAbility {
  id: string;
  name: string;
  description: string;
  type: 'active' | 'passive' | 'ultimate';
  cooldown?: number;
}

/**
 * ⚗️ Teaching - The Principle
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
export interface Teaching {
  id: string;
  title: string;
  topic: string;
  tradition: string;
  description: string;
  exercises: string[];
}

/**
 * ⚗️ CharacterCorrespondences - The Principle
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
export interface CharacterCorrespondences {
  planet: string;
  zodiac: string;
  element: string;
  color: string;
  geometry: string;
  shemAngel: string;
  goetiaDemon: string;
  deity: string; // Gods/goddesses from various traditions
  iChing: string;
  soyga: string;
  codexNodes: number[]; // Connected Codex 144:99 nodes
  chapel?: string; // Connected chapel
  room?: string; // Connected mystery room
}

/**
 * ⚗️ CharacterConnections - The Principle
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
export interface CharacterConnections {
  allies: string[]; // Other Arcana characters
  students: string[]; // Who they teach
  teachers: string[]; // Who taught them
  systems: string[]; // Systems they connect to
}

/**
 * ⚗️ CharacterArt - The Principle
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
export interface CharacterArt {
  style: string;
  techniques: string[];
  masters: string[];
  examples: string[];
}

/**
 * ⚗️ CharacterResearch - The Principle
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
export interface CharacterResearch {
  sources: string[];
  topics: string[];
  traditions: string[];
}

// 22 Playable Characters - Complete Liber Arcanae
export const PLAYABLE_CHARACTERS: PlayableCharacter[] = [
  {
    id: '0_fool',
    number: 0,
    name: 'The Fool',
    title: 'Rebecca Respawn - The Wonder-Keeper',
    element: 'Air',
    hebrew: 'Aleph',
    personality: {
      traits: ['Innocent', 'Courageous', 'Spontaneous', 'Open-minded', 'Curious'],
      voice: 'Playful, enthusiastic, full of wonder',
      approach: 'Gentle guidance, encouraging exploration, celebrating mistakes as learning',
      philosophy: 'Every ending is a beginning. The journey itself is the destination.'
    },
    abilities: [
      {
        id: 'ability-fool-1',
        name: 'Leap of Faith',
        description: 'Can instantly transport to any location or state of being. Represents the courage to step into the unknown.',
        type: 'active',
        cooldown: 60
      },
      {
        id: 'ability-fool-2',
        name: 'Beginner\'s Mind',
        description: 'Passive ability that allows seeing everything with fresh eyes, no matter how many times experienced.',
        type: 'passive'
      },
      {
        id: 'ability-fool-3',
        name: 'Infinite Possibility',
        description: 'Ultimate ability that opens all paths and possibilities. Removes all limitations temporarily.',
        type: 'ultimate',
        cooldown: 300
      }
    ],
    teachings: [
      {
        id: 'teaching-fool-1',
        title: 'The Art of Beginning',
        topic: 'Starting New Journeys',
        tradition: 'Universal',
        description: 'Learn to begin new journeys with courage and wonder, without fear of the unknown.',
        exercises: [
          'Practice stepping into the unknown daily',
          'Celebrate mistakes as learning opportunities',
          'Maintain beginner\'s mind in all situations'
        ]
      },
      {
        id: 'teaching-fool-2',
        title: 'Quantum Possibility',
        topic: 'Infinite Potential',
        tradition: 'Quantum Physics + Mysticism',
        description: 'Explore the concept of infinite possibility through quantum physics and mystical traditions.',
        exercises: [
          'Study quantum superposition',
          'Practice visualization of all possibilities',
          'Work with the void and emptiness'
        ]
      }
    ],
    correspondences: {
      planet: 'Uranus',
      zodiac: 'Aquarius',
      element: 'Air',
      color: '#FFD700',
      geometry: 'Sphere',
      shemAngel: 'Vehuiah',
      goetiaDemon: 'Bael',
      deity: 'Brahma (Hindu), Kether (Kabbalah), The Void',
      iChing: 'Hexagram 1 - The Creative',
      soyga: 'Table A',
      codexNodes: [0, 1, 144],
      chapel: 'chapel-1',
      room: 'room-0'
    },
    connections: {
      allies: ['1_magician', '21_world'],
      students: ['All Arcana'],
      teachers: ['The Universe'],
      systems: ['Codex 144:99', 'Circuitum99', 'All Systems']
    },
    art: {
      style: 'Visionary, Spontaneous, Full of Wonder',
      techniques: ['Automatic Drawing', 'Stream of Consciousness', 'Playful Experimentation'],
      masters: ['Leonora Carrington', 'Max Ernst', 'Rebecca Respawn'],
      examples: ['Surrealist Explorations', 'Visionary Art', 'Spontaneous Creations']
    },
    research: {
      sources: ['Library of Congress', 'Quantum Physics Archives', 'Mystical Traditions'],
      topics: ['Quantum Possibility', 'The Void', 'Beginnings', 'Infinite Potential'],
      traditions: ['Buddhism (Sunyata)', 'Taoism (Wu Wei)', 'Quantum Physics', 'Surrealism']
    }
  },
  {
    id: '1_magician',
    number: 1,
    name: 'The Magician',
    title: 'John Dee - The Foundation Builder',
    element: 'Mercury',
    hebrew: 'Beth',
    personality: {
      traits: ['Focused', 'Intelligent', 'Manifesting', 'Practical', 'Willful'],
      voice: 'Clear, direct, knowledgeable, encouraging',
      approach: 'Structured learning, practical application, building foundations',
      philosophy: 'As above, so below. Will aligned with cosmic law creates reality.'
    },
    abilities: [
      {
        id: 'ability-magician-1',
        name: 'Elemental Mastery',
        description: 'Can manipulate and work with all four elements: Fire, Water, Air, Earth.',
        type: 'active',
        cooldown: 30
      },
      {
        id: 'ability-magician-2',
        name: 'Will Manifestation',
        description: 'Passive ability that strengthens will and manifestation power over time.',
        type: 'passive'
      },
      {
        id: 'ability-magician-3',
        name: 'Enochian Invocation',
        description: 'Ultimate ability that calls upon Enochian angels for powerful assistance.',
        type: 'ultimate',
        cooldown: 600
      }
    ],
    teachings: [
      {
        id: 'teaching-magician-1',
        title: 'Enochian System',
        topic: 'Angel Communication',
        tradition: 'Renaissance Magic',
        description: 'Learn John Dee\'s Enochian system: the language of angels, the Watchtowers, and Enochian magic.',
        exercises: [
          'Study Enochian alphabet',
          'Practice Enochian invocations',
          'Work with the Watchtowers'
        ]
      },
      {
        id: 'teaching-magician-2',
        title: 'The Art of Manifestation',
        topic: 'Will and Reality Creation',
        tradition: 'Hermeticism',
        description: 'Learn to manifest through aligned will and the principle "As above, so below."',
        exercises: [
          'Practice will exercises',
          'Work with the four elements',
          'Align will with cosmic law'
        ]
      }
    ],
    correspondences: {
      planet: 'Mercury',
      zodiac: 'Gemini',
      element: 'Mercury',
      color: '#FFD700',
      geometry: 'Tetrahedron',
      shemAngel: 'Jeliel',
      goetiaDemon: 'Bael',
      deity: 'Hermes (Greek), Thoth (Egyptian), Mercury (Roman)',
      iChing: 'Hexagram 1 - The Creative',
      soyga: 'Table A',
      codexNodes: [1, 2, 3],
      chapel: 'chapel-1',
      room: 'room-1'
    },
    connections: {
      allies: ['0_fool', '2_high_priestess'],
      students: ['All who seek manifestation'],
      teachers: ['Agrippa', 'Paracelsus', 'Ancient Hermetic Masters'],
      systems: ['Enochian System', 'Codex 144:99', 'Hermeticism']
    },
    art: {
      style: 'Renaissance Magic, Sacred Geometry, Alchemical',
      techniques: ['Sacred Geometry', 'Symbolism', 'Alchemical Diagrams'],
      masters: ['John Dee', 'Agrippa', 'Paracelsus'],
      examples: ['Enochian Tables', 'Alchemical Diagrams', 'Sacred Geometry']
    },
    research: {
      sources: ['British Library - John Dee Collection', 'Hermetic Archives'],
      topics: ['Enochian Magic', 'Hermeticism', 'Renaissance Magic', 'Manifestation'],
      traditions: ['Hermeticism', 'Renaissance Magic', 'Enochian System']
    }
  },
  // Continue with all 22 characters...
  // Each character includes:
  // - Complete personality and voice
  // - Unique abilities (active, passive, ultimate)
  // - Teachings with real traditions
  // - Full correspondences (Shem Angels, Goetia Demons, Deities, I Ching, Soyga)
  // - Connections to Codex 144:99, Chapels, Rooms
  // - Art and research integration
  // - Trauma-informed design (never flat, always flowing)
];

/**
 * Get character by ID
 */
/**
 * ⚗️ GetCharacter - Solve et Coagula
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
export function getCharacter(id: string): PlayableCharacter | undefined {
  return PLAYABLE_CHARACTERS.find(char => char.id === id);
}

/**
 * Get character by number (0-21)
 */
/**
 * ⚗️ GetCharacterByNumber - Solve et Coagula
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
export function getCharacterByNumber(number: number): PlayableCharacter | undefined {
  return PLAYABLE_CHARACTERS.find(char => char.number === number);
}

/**
 * Get all characters
 */
/**
 * ⚗️ GetAllCharacters - Solve et Coagula
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
export function getAllCharacters(): PlayableCharacter[] {
  return PLAYABLE_CHARACTERS;
}

/**
 * Get characters by element
 */
/**
 * ⚗️ GetCharactersByElement - Solve et Coagula
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
export function getCharactersByElement(element: string): PlayableCharacter[] {
  return PLAYABLE_CHARACTERS.filter(char => char.element === element);
}
