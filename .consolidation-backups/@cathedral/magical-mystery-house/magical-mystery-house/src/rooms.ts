/**
 * rooms
 * 
 * @package @cathedral/magical-mystery-house
 * @license CC0-1.0 - Public Domain
 * 
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate room details
 * 
 * Creative use: Game apps, exploration apps, visual apps, interactive apps
 */
/**
 * Magical Mystery House - 99 Rooms System
 * 
 * Each room is an explorable space with:
 * - Real research and correspondences
 * - Master art and science
 * - Interactive exploration
 * - 22 Living Arcana as playable characters
 * - Trauma-informed design (never flat, always flowing)
 */

export interface MysteryRoom {
  id: string;
  name: string;
  number: number; // 1-99
  theme: string;
  description: string;
  type: 'library' | 'laboratory' | 'studio' | 'chamber' | 'hall' | 'garden' | 'temple';
  features: RoomFeature[];
  correspondences: RoomCorrespondences;
  arcana: string[]; // Which of the 22 Major Arcana are associated
  research: ResearchSource[];
  art: ArtTradition[];
  science: ScienceTradition[];
  pathworking: PathworkingNode[];
  unlockCondition?: string;
}

export interface RoomFeature {
  id: string;
  name: string;
  type: 'interactive' | 'exploration' | 'creation' | 'learning' | 'pathworking' | 'character';
  description: string;
  arcana?: string; // Which Arcana character is featured
  connections?: string[];
}

export interface RoomCorrespondences {
  element?: string;
  planet?: string;
  zodiac?: string;
  shemAngel?: string;
  goetiaDemon?: string;
  deity?: string;
  iChing?: string;
  soyga?: string;
  codexNode?: number; // Connection to Codex 144:99
}

export interface ResearchSource {
  name: string;
  type: 'library' | 'archive' | 'museum' | 'academic' | 'digital';
  url?: string;
  description: string;
}

export interface ArtTradition {
  name: string;
  period: string;
  techniques: string[];
  masters: string[];
  examples: string[];
}

export interface ScienceTradition {
  name: string;
  period: string;
  fields: string[];
  scientists: string[];
  discoveries: string[];
}

export interface PathworkingNode {
  id: string;
  title: string;
  description: string;
  exercises: string[];
  correspondences: Record<string, any>;
}

// 99 Rooms organized by themes (sample of key rooms)
export const MYSTERY_ROOMS: MysteryRoom[] = [
  // Rooms 1-11: Foundation Rooms (The Fool through The Wheel)
  {
    id: 'room-0',
    name: 'The Fool\'s Chamber of Infinite Possibility',
    number: 0,
    theme: 'Beginnings, Infinite Potential, The Void',
    description: 'The first room where all journeys begin. Here you meet The Fool (Rebecca Respawn) and learn that every ending is a beginning.',
    type: 'chamber',
    features: [
      {
        id: 'fool-character',
        name: 'The Fool - Rebecca Respawn',
        type: 'character',
        description: 'Playable character: The Fool teaches infinite possibility, beginner\'s mind, and the courage to leap into the unknown.',
        arcana: '0_fool',
        connections: ['room-1:magician', 'room-21:world']
      },
      {
        id: 'void-exploration',
        name: 'Exploration of the Void',
        type: 'exploration',
        description: 'Explore the concept of the void, emptiness, and infinite potential across traditions: Buddhist sunyata, Taoist wu wei, quantum vacuum.',
        connections: ['codex-144-99:node-0']
      },
      {
        id: 'beginner-pathworking',
        name: 'First Steps Pathworking',
        type: 'pathworking',
        description: 'Your first pathworking: learn to step into the unknown with courage and beginner\'s mind.',
        connections: ['circuitum99:chapter-1']
      }
    ],
    correspondences: {
      element: 'Air',
      planet: 'Uranus',
      zodiac: 'Aquarius',
      shemAngel: 'Vehuiah',
      deity: 'Brahma (Hindu), Kether (Kabbalah)',
      iChing: 'Hexagram 1 - The Creative',
      soyga: 'Table A',
      codexNode: 0
    },
    arcana: ['0_fool'],
    research: [
      {
        name: 'Library of Congress - Void Traditions',
        type: 'library',
        url: 'https://www.loc.gov',
        description: 'Collections on void, emptiness, and infinite potential'
      }
    ],
    art: [
      {
        name: 'Void Art',
        period: 'Modern',
        techniques: ['Negative Space', 'Emptiness', 'Minimalism'],
        masters: ['Yves Klein', 'Agnes Martin', 'Ad Reinhardt'],
        examples: ['Monochrome Paintings', 'Void Compositions']
      }
    ],
    science: [
      {
        name: 'Quantum Vacuum',
        period: 'Modern',
        fields: ['Quantum Physics', 'Cosmology'],
        scientists: ['Heisenberg', 'Dirac', 'Hawking'],
        discoveries: ['Quantum Vacuum Fluctuations', 'Zero-Point Energy']
      }
    ],
    pathworking: [
      {
        id: 'pw-room-0',
        title: 'The Leap of Faith',
        description: 'Learn to step into the unknown with courage.',
        exercises: [
          'Meditate on the void',
          'Practice beginner\'s mind',
          'Take your first step into the unknown'
        ],
        correspondences: {
          sephirah: 'Kether',
          path: '11th Path',
          tarot: 'The Fool'
        }
      }
    ]
  },
  {
    id: 'room-1',
    name: 'The Magician\'s Laboratory of Manifestation',
    number: 1,
    theme: 'Will, Manifestation, As Above So Below',
    description: 'The second room where you meet The Magician (John Dee) and learn the art of manifestation through will and the four elements.',
    type: 'laboratory',
    features: [
      {
        id: 'magician-character',
        name: 'The Magician - John Dee',
        type: 'character',
        description: 'Playable character: The Magician teaches will, manifestation, and the connection between above and below.',
        arcana: '1_magician',
        connections: ['room-0:fool', 'room-2:high-priestess']
      },
      {
        id: 'four-elements-altar',
        name: 'Altar of the Four Elements',
        type: 'interactive',
        description: 'Interactive altar where you learn to work with the four elements: Fire, Water, Air, Earth.',
        connections: ['chapel-1', 'chapel-2', 'chapel-3', 'chapel-4']
      },
      {
        id: 'enochian-system',
        name: 'Enochian System Study',
        type: 'exploration',
        description: 'Explore John Dee\'s Enochian system: the language of angels, the Watchtowers, and Enochian magic.',
        connections: ['codex-144-99:enochian-nodes']
      },
      {
        id: 'manifestation-pathworking',
        name: 'Manifestation Pathworking',
        type: 'pathworking',
        description: 'Learn to manifest through will. Pathworking from Kether to Binah.',
        connections: ['circuitum99:chapter-2']
      }
    ],
    correspondences: {
      element: 'Mercury',
      planet: 'Mercury',
      zodiac: 'Gemini',
      shemAngel: 'Jeliel',
      goetiaDemon: 'Bael',
      deity: 'Hermes (Greek), Thoth (Egyptian), Mercury (Roman)',
      iChing: 'Hexagram 1 - The Creative',
      soyga: 'Table A',
      codexNode: 1
    },
    arcana: ['1_magician'],
    research: [
      {
        name: 'British Library - John Dee Collection',
        type: 'library',
        url: 'https://www.bl.uk',
        description: 'John Dee\'s manuscripts and Enochian system'
      }
    ],
    art: [
      {
        name: 'Renaissance Magic',
        period: 'Renaissance',
        techniques: ['Sacred Geometry', 'Symbolism', 'Alchemical Art'],
        masters: ['John Dee', 'Agrippa', 'Paracelsus'],
        examples: ['Enochian Tables', 'Alchemical Diagrams']
      }
    ],
    science: [
      {
        name: 'Renaissance Science',
        period: 'Renaissance',
        fields: ['Mathematics', 'Astronomy', 'Navigation'],
        scientists: ['John Dee', 'Copernicus', 'Galileo'],
        discoveries: ['Enochian System', 'Heliocentric Model']
      }
    ],
    pathworking: [
      {
        id: 'pw-room-1',
        title: 'The Path of Manifestation',
        description: 'Learn to manifest through will and the four elements.',
        exercises: [
          'Work with the four elements',
          'Practice Enochian invocations',
          'Connect Kether to Binah through will'
        ],
        correspondences: {
          sephirah: 'Binah',
          path: '12th Path',
          tarot: 'The Magician'
        }
      }
    ]
  },
  // Add more rooms for each of the 22 Major Arcana...
  // This is a sample structure - you would expand this to all 99 rooms
  // Each room connects to:
  // - One or more of the 22 Major Arcana characters
  // - Codex 144:99 nodes
  // - Circuitum99 chapters
  // - Chapels
  // - Real research sources
  // - Master art and science traditions
];

/**
 * Get room by ID
 */
export function getRoom(id: string): MysteryRoom | undefined {
  return MYSTERY_ROOMS.find(room => room.id === id);
}

/**
 * Get room by number (0-98)
 */
export function getRoomByNumber(number: number): MysteryRoom | undefined {
  return MYSTERY_ROOMS.find(room => room.number === number);
}

/**
 * Get rooms by Arcana character
 */
export function getRoomsByArcana(arcanaId: string): MysteryRoom[] {
  return MYSTERY_ROOMS.filter(room => room.arcana.includes(arcanaId));
}

/**
 * Get all rooms
 */
export function getAllRooms(): MysteryRoom[] {
  return MYSTERY_ROOMS;
}
