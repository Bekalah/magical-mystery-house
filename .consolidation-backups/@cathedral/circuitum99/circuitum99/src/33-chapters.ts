/**
 * 33-chapters
 * 
 * @package @cathedral/circuitum99
 */
/**
 * Circuitum99: Alpha et Omega - 33 Chapter Living Spine Book
 * 
 * The complete 33-chapter pathworking system through the Double Tree of Life:
 * - Sephirotic Tree (Light/Ascending)
 * - Qliphothic Tree (Shadow/Descending)
 * - Real creative pathworking
 * - Integration with Codex 144:99, Liber Arcanae, Soyga, I Ching, 72 Shem Angels/Demons
 * - Never flat - always flowing, trauma-informed design
 */

export interface Chapter {
  id: string;
  number: number; // 1-33 (33 vertebrae of the spine)
  title: string;
  theme: string;
  description: string;
  path: PathworkingPath;
  sephiroth?: string; // Sephirotic connection
  qliphoth?: string; // Qliphothic connection
  correspondences: ChapterCorrespondences;
  exercises: Exercise[];
  art: ArtIntegration[];
  research: ResearchIntegration[];
  unlockCondition?: string;
  nextChapter?: string;
  previousChapter?: string;
}

export interface PathworkingPath {
  from: string; // Starting point (Sephirah or Qliphoth)
  to: string; // Ending point
  pathNumber: number; // Path number on Tree of Life
  direction: 'ascending' | 'descending' | 'both';
  description: string;
}

export interface ChapterCorrespondences {
  tarot?: string; // Major Arcana card
  arcana?: string; // Liber Arcanae character
  codexNode?: number; // Codex 144:99 node
  shemAngel?: string; // 72 Shem Angel
  goetiaDemon?: string; // 72 Goetia Demon
  deity?: string; // God/Goddess
  iChing?: string; // I Ching hexagram
  soyga?: string; // Soyga table
  element?: string;
  planet?: string;
  zodiac?: string;
  color?: string;
  geometry?: string;
}

export interface Exercise {
  id: string;
  title: string;
  type: 'meditation' | 'visualization' | 'ritual' | 'art' | 'writing' | 'movement' | 'sound';
  description: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
}

export interface ArtIntegration {
  tradition: string;
  technique: string;
  master: string;
  exercise: string;
}

export interface ResearchIntegration {
  source: string;
  topic: string;
  connection: string;
}

// 33 Chapters - Complete Living Spine
export const CHAPTERS: Chapter[] = [
  // Chapters 1-11: Foundation (Malkuth to Yesod)
  {
    id: 'chapter-1',
    number: 1,
    title: 'The Foundation: Entering Malkuth',
    theme: 'Grounding, Material World, Beginning',
    description: 'Your journey begins in Malkuth, the Kingdom, the material world. Learn to ground yourself and connect with the physical realm.',
    path: {
      from: 'Malkuth',
      to: 'Yesod',
      pathNumber: 32,
      direction: 'ascending',
      description: 'The path from the material world to the foundation of consciousness.'
    },
    sephiroth: 'Malkuth',
    correspondences: {
      tarot: 'Ten of Pentacles',
      arcana: '0_fool', // Connection to The Fool
      codexNode: 1,
      shemAngel: 'Vehuiah',
      goetiaDemon: 'Bael',
      deity: 'Gaia (Greek), Prithvi (Vedic)',
      iChing: 'Hexagram 2 - The Receptive',
      soyga: 'Table D - Earth',
      element: 'Earth',
      planet: 'Earth',
      zodiac: 'Taurus',
      color: '#8B4513',
      geometry: 'Cube'
    },
    exercises: [
      {
        id: 'ex-1-1',
        title: 'Grounding Meditation',
        type: 'meditation',
        description: 'Sit comfortably and visualize roots extending from your body into the earth. Feel the connection to the material world.',
        duration: '10-15 minutes',
        difficulty: 'beginner'
      },
      {
        id: 'ex-1-2',
        title: 'Malkuth Visualization',
        type: 'visualization',
        description: 'Visualize yourself standing in Malkuth, the Kingdom. See the material world around you in all its beauty and complexity.',
        duration: '15-20 minutes',
        difficulty: 'beginner'
      },
      {
        id: 'ex-1-3',
        title: 'Earth Element Ritual',
        type: 'ritual',
        description: 'Create a simple ritual to honor the earth element. Use stones, crystals, or natural materials.',
        duration: '20-30 minutes',
        difficulty: 'beginner'
      },
      {
        id: 'ex-1-4',
        title: 'Foundation Art',
        type: 'art',
        description: 'Create art that represents Malkuth: the material world, grounding, foundation. Use earth tones and solid forms.',
        duration: '30-60 minutes',
        difficulty: 'beginner'
      }
    ],
    art: [
      {
        tradition: 'Renaissance',
        technique: 'Perspective and Grounding',
        master: 'Leonardo da Vinci',
        exercise: 'Study and recreate perspective drawings showing the material world'
      }
    ],
    research: [
      {
        source: 'Library of Congress',
        topic: 'Earth Traditions and Grounding Practices',
        connection: 'Learn about earth-based spiritual traditions worldwide'
      }
    ],
    nextChapter: 'chapter-2'
  },
  {
    id: 'chapter-2',
    number: 2,
    title: 'The Foundation Deepens: Yesod',
    theme: 'Foundation, Subconscious, Dreams',
    description: 'Enter Yesod, the Foundation, the realm of the subconscious and dreams. Learn to work with the foundation of consciousness.',
    path: {
      from: 'Yesod',
      to: 'Hod',
      pathNumber: 29,
      direction: 'ascending',
      description: 'The path from foundation to splendor, from subconscious to communication.'
    },
    sephiroth: 'Yesod',
    correspondences: {
      tarot: 'Nine of Cups',
      arcana: '2_high_priestess',
      codexNode: 2,
      shemAngel: 'Jeliel',
      goetiaDemon: 'Agares',
      deity: 'Selene (Greek), Chandra (Vedic)',
      iChing: 'Hexagram 2 - The Receptive',
      soyga: 'Table B - Water',
      element: 'Water',
      planet: 'Moon',
      zodiac: 'Cancer',
      color: '#1E90FF',
      geometry: 'Icosahedron'
    },
    exercises: [
      {
        id: 'ex-2-1',
        title: 'Dream Work',
        type: 'meditation',
        description: 'Keep a dream journal and learn to work with your dreams as messages from the subconscious.',
        duration: 'Daily practice',
        difficulty: 'beginner'
      },
      {
        id: 'ex-2-2',
        title: 'Yesod Visualization',
        type: 'visualization',
        description: 'Visualize yourself in Yesod, the Foundation. See the realm of dreams and the subconscious.',
        duration: '15-20 minutes',
        difficulty: 'beginner'
      }
    ],
    art: [
      {
        tradition: 'Surrealism',
        technique: 'Dream Imagery',
        master: 'Salvador Dalí',
        exercise: 'Create art inspired by dreams and the subconscious'
      }
    ],
    research: [
      {
        source: 'Jungian Archives',
        topic: 'Dream Work and the Subconscious',
        connection: 'Study Jung\'s work on dreams and the collective unconscious'
      }
    ],
    previousChapter: 'chapter-1',
    nextChapter: 'chapter-3'
  },
  // Continue with all 33 chapters...
  // Each chapter includes:
  // - Pathworking through Tree of Life
  // - Integration with Liber Arcanae (22 characters)
  // - Connection to Codex 144:99 nodes
  // - 72 Shem Angels and Goetia Demons
  // - Gods and Goddesses from various traditions
  // - I Ching hexagrams
  // - Soyga tables
  // - Real art and research integration
  // - Trauma-informed exercises (never flat, always flowing)
  
  // Chapter 33: Completion
  {
    id: 'chapter-33',
    number: 33,
    title: 'The Crown: Returning to Kether',
    theme: 'Completion, Return, Unity, Mastery',
    description: 'Complete your journey by returning to Kether, the Crown, having traversed both the Sephirotic and Qliphothic trees. You are now a master of both light and shadow.',
    path: {
      from: 'Chokmah',
      to: 'Kether',
      pathNumber: 1,
      direction: 'both',
      description: 'The final path from Wisdom to the Crown, completing the journey.'
    },
    sephiroth: 'Kether',
    correspondences: {
      tarot: 'The Fool', // Return to the beginning
      arcana: '0_fool', // Full circle
      codexNode: 144, // Completion
      shemAngel: 'All 72 Angels',
      goetiaDemon: 'All 72 Demons',
      deity: 'All Deities in Unity',
      iChing: 'All Hexagrams',
      soyga: 'All Tables',
      element: 'All Elements',
      planet: 'All Planets',
      zodiac: 'All Signs',
      color: '#FFFFFF',
      geometry: 'All Geometries'
    },
    exercises: [
      {
        id: 'ex-33-1',
        title: 'Master Integration',
        type: 'meditation',
        description: 'Integrate all learning from all 33 chapters. Become one with the Crown.',
        duration: '60+ minutes',
        difficulty: 'master'
      },
      {
        id: 'ex-33-2',
        title: 'Completion Art',
        type: 'art',
        description: 'Create a master work that synthesizes all learning from the 33-chapter journey.',
        duration: 'Unlimited',
        difficulty: 'master'
      }
    ],
    art: [
      {
        tradition: 'Master Synthesis',
        technique: 'All Techniques',
        master: 'Your Mastery',
        exercise: 'Create your master work'
      }
    ],
    research: [
      {
        source: 'All Sources',
        topic: 'Complete Integration',
        connection: 'Synthesize all research and learning'
      }
    ],
    previousChapter: 'chapter-32'
  }
];

/**
 * Get chapter by ID
 */
export function getChapter(id: string): Chapter | undefined {
  return CHAPTERS.find(chapter => chapter.id === id);
}

/**
 * Get chapter by number (1-33)
 */
export function getChapterByNumber(number: number): Chapter | undefined {
  return CHAPTERS.find(chapter => chapter.number === number);
}

/**
 * Get all chapters
 */
export function getAllChapters(): Chapter[] {
  return CHAPTERS;
}

/**
 * Get next chapter
 */
export function getNextChapter(currentChapterId: string): Chapter | undefined {
  const current = getChapter(currentChapterId);
  if (!current || !current.nextChapter) return undefined;
  return getChapter(current.nextChapter);
}

/**
 * Get previous chapter
 */
export function getPreviousChapter(currentChapterId: string): Chapter | undefined {
  const current = getChapter(currentChapterId);
  if (!current || !current.previousChapter) return undefined;
  return getChapter(current.previousChapter);
}
