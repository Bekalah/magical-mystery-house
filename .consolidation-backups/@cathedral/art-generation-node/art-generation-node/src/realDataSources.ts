import { RealWorldSource, PatternData, ArtStyle } from './types';

export const SACRED_BOOKS_DATA: Record<string, RealWorldSource> = {
  'codex-seraphinianus': {
    type: 'book',
    id: 'codex-seraphinianus',
    name: 'Codex Seraphinianus',
    description: 'An illustrated encyclopedia of an imaginary world with unknown script',
    dataPoints: [
      1.618, // Golden ratio in illustrations
      3.14159, // Pi relationships in diagrams
      2.718, // Euler's number in organic forms
      1.414, // √2 in geometric constructions
      0.618, // Golden ratio conjugate
    ],
    significance: 'Contains the true language of angels and impossible architectures',
    artConnection: 'Source of surreal geometric and organic pattern combinations'
  },

  'voynich-manuscript': {
    type: 'book',
    id: 'voynich-manuscript',
    name: 'Voynich Manuscript',
    description: 'Undeciphered manuscript with bizarre botanical and astronomical illustrations',
    dataPoints: [
      28, // 28 plant-like illustrations
      12, // 12 zodiac-like medallions
      6, // 6 different section types
      240, // Approximately 240 pages
      35, // 35 unique symbols estimated
    ],
    significance: 'Plant consciousness and celestial navigation encoded in unknown script',
    artConnection: 'Botanical patterns and celestial mapping for organic art generation'
  },

  'hypnerotomachia-poliphili': {
    type: 'book',
    id: 'hypnerotomachia-poliphili',
    name: 'Hypnerotomachia Poliphili',
    description: 'Renaissance dream quest with architectural and romantic elements',
    dataPoints: [
      1.618, // Golden ratio in architectural descriptions
      1499, // Publication year
      234, // Woodcut illustrations
      16, // 16th century Renaissance style
      3, // 3 main architectural styles depicted
    ],
    significance: 'Sacred architecture and dream symbolism in Renaissance style',
    artConnection: 'Architectural patterns and symbolic dream imagery'
  },

  'book-of-kells': {
    type: 'book',
    id: 'book-of-kells',
    name: 'Book of Kells',
    description: 'Illuminated manuscript of the four Gospels with intricate Celtic designs',
    dataPoints: [
      680, // Approximate creation year
      4, // Four Gospels
      340, // Folios (pages)
      8, // Major decorated initials
      2, // Chi Rho pages (most famous)
    ],
    significance: 'Celtic illumination and sacred text decoration',
    artConnection: 'Interlace patterns and illuminated letter forms'
  }
};

export const FAMOUS_ARTWORKS_DATA: Record<string, RealWorldSource> = {
  'creation-of-adam': {
    type: 'artwork',
    id: 'creation-of-adam',
    name: 'The Creation of Adam',
    description: 'Michelangelo\'s Sistine Chapel fresco depicting divine creation',
    dataPoints: [
      5.7, // Meters width
      2.8, // Meters height
      1508, // Creation year
      1.618, // Golden ratio in composition
      93, // Square meters area
    ],
    significance: 'Divine spark of consciousness and human creation',
    artConnection: 'Gesture and energy flow patterns for dynamic composition'
  },

  'starry-night': {
    type: 'artwork',
    id: 'starry-night',
    name: 'The Starry Night',
    description: 'Van Gogh\'s swirling depiction of the night sky over Saint-Rémy',
    dataPoints: [
      0.737, // Meters width
      0.921, // Meters height
      1889, // Creation year
      11, // Swirling stars
      1, // Cypress tree
    ],
    significance: 'Living, breathing cosmos and emotional turbulence',
    artConnection: 'Swirling patterns and celestial mapping for emotional art'
  },

  'girl-with-pearl-earring': {
    type: 'artwork',
    id: 'girl-with-pearl-earring',
    name: 'Girl with a Pearl Earring',
    description: 'Vermeer\'s painting capturing a moment of consciousness',
    dataPoints: [
      0.39, // Meters width
      0.445, // Meters height
      1665, // Approximate creation year
      1, // Pearl earring
      24, // Age of model (estimated)
    ],
    significance: 'Moment of awakening consciousness and inner vision',
    artConnection: 'Light reflection and consciousness awakening patterns'
  },

  'flower-of-life': {
    type: 'artwork',
    id: 'flower-of-life',
    name: 'Flower of Life',
    description: 'Sacred geometric pattern of overlapping circles',
    dataPoints: [
      19, // Circles in complete pattern
      1.618, // Golden ratio relationships
      7, // Days of creation
      6, // Around 1 pattern
      12, // Around 2 pattern
    ],
    significance: 'Fundamental pattern of creation in sacred geometry',
    artConnection: 'Perfect symmetry and mathematical beauty in geometric art'
  }
};

export const SACRED_SITES_DATA: Record<string, RealWorldSource> = {
  'chartres-cathedral': {
    type: 'architecture',
    id: 'chartres-cathedral',
    name: 'Chartres Cathedral',
    description: 'Gothic masterpiece with sacred geometry and stained glass',
    dataPoints: [
      1194, // Construction began
      130, // Meters length
      37, // Meters height (nave)
      176, // Stained glass windows
      1.618, // Golden ratio in proportions
    ],
    significance: 'Gothic architecture and sacred geometry mastery',
    artConnection: 'Gothic arches and rose window patterns for architectural art'
  },

  'rosslyn-chapel': {
    type: 'architecture',
    id: 'rosslyn-chapel',
    name: 'Rosslyn Chapel',
    description: '15th-century chapel with intricate carvings and Masonic symbols',
    dataPoints: [
      1446, // Construction began
      213, // Carved cubes in chapel
      110, // Carved faces
      43, // Meters length
      7, // Arches in Lady Chapel
    ],
    significance: 'Hidden symbols and Masonic connections in stone',
    artConnection: 'Symbolic carving patterns and Masonic geometry'
  }
};

export const MUSIC_DATA_SOURCES: Record<string, RealWorldSource> = {
  'bach-goldberg': {
    type: 'music',
    id: 'bach-goldberg',
    name: 'Goldberg Variations',
    description: 'J.S. Bach\'s masterpiece of variation form and mathematical precision',
    dataPoints: [
      30, // Variations
      32, // Total movements (including aria)
      1741, // Composition year
      1, // Aria theme
      14, // Canons
    ],
    significance: 'Mathematical precision and spiritual depth in music',
    artConnection: 'Variation patterns and mathematical relationships in visual art'
  },

  'bjork-vespertine': {
    type: 'music',
    id: 'bjork-vespertine',
    name: 'Vespertine',
    description: 'Björk\'s intimate album exploring microbeats and organic sounds',
    dataPoints: [
      12, // Tracks
      55, // Minutes duration
      2001, // Release year
      7, // Microbeats per second (average)
      9, // Collaborators
    ],
    significance: 'Organic, breathing quality and intimate emotional expression',
    artConnection: 'Micro-patterns and intimate, breathing compositions'
  }
};

export const NATURE_DATA_SOURCES: Record<string, RealWorldSource> = {
  'nautilus-shell': {
    type: 'nature',
    id: 'nautilus-shell',
    name: 'Nautilus Shell',
    description: 'Perfect example of logarithmic spiral in nature',
    dataPoints: [
      1.618, // Golden ratio spiral
      2.718, // Natural logarithm base
      0.306, // Growth factor per quarter turn
      137.5, // Angle of divergence (degrees)
      12, // Typical chambers
    ],
    significance: 'Perfect mathematical spiral and chambered growth',
    artConnection: 'Logarithmic spirals and natural growth patterns'
  },

  'sunflower-head': {
    type: 'nature',
    id: 'sunflower-head',
    name: 'Sunflower Seed Head',
    description: 'Fibonacci spiral pattern in seed arrangement',
    dataPoints: [
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, // Fibonacci sequence visible
      137.5, // Golden angle
      0.618, // Golden ratio conjugate
      1.618, // Golden ratio
      2, // Directions of spirals
    ],
    significance: 'Fibonacci mathematics in optimal seed packing',
    artConnection: 'Fibonacci spirals and optimal packing patterns'
  }
};

export const SCIENCE_DATA_SOURCES: Record<string, RealWorldSource> = {
  'dna-structure': {
    type: 'nature',
    id: 'dna-structure',
    name: 'DNA Double Helix',
    description: 'The molecular structure of genetic information',
    dataPoints: [
      0.34, // Nanometers per base pair
      2, // Nanometers diameter
      3.4, // Nanometers per turn
      10, // Base pairs per turn
      1.618, // Golden ratio in proportions
    ],
    significance: 'Information storage and replication at molecular level',
    artConnection: 'Helical patterns and information encoding in art'
  },

  'protein-folding': {
    type: 'nature',
    id: 'protein-folding',
    name: 'Protein Folding',
    description: 'Complex 3D structures formed by amino acid chains',
    dataPoints: [
      20, // Standard amino acids
      4, // Levels of protein structure
      100, // Typical amino acids per protein
      1.618, // Golden ratio in optimal folding
      3, // Dimensional folding
    ],
    significance: 'Energy optimization and functional conformation',
    artConnection: '3D folding patterns and energy optimization in sculpture'
  }
};

// Combined real data sources for pattern generation
export const REAL_DATA_SOURCES = {
  ...SACRED_BOOKS_DATA,
  ...FAMOUS_ARTWORKS_DATA,
  ...SACRED_SITES_DATA,
  ...MUSIC_DATA_SOURCES,
  ...NATURE_DATA_SOURCES,
  ...SCIENCE_DATA_SOURCES,
};

// Pre-configured pattern templates derived from real data
export const PATTERN_TEMPLATES: Record<string, PatternData> = {
  'codex-geometric': {
    id: 'codex-geometric',
    name: 'Codex Seraphinianus Geometric Fusion',
    type: 'fusion',
    source: 'book-derived',
    parameters: {
      sides: 11,
      radius: 1.618,
      rotation: 137.5,
      scale: 0.618,
      sacredRatio: 1.618,
      fusionSources: ['codex-seraphinianus', 'flower-of-life'],
      mutationRate: 0.1
    },
    realWorldConnection: REAL_DATA_SOURCES['codex-seraphinianus'],
    artStyle: {
      name: 'Surreal Sacred Geometry',
      genre: 'abstract',
      medium: 'digital',
      colorPalette: {
        primary: ['#ffd700', '#b87333', '#50c878'],
        secondary: ['#483d8b', '#191970', '#0b0b1a'],
        accent: ['#e0115f', '#c0c0c0'],
        harmony: 'sacred',
        temperature: 'balanced'
      },
      techniques: ['sacred-geometry', 'surreal-illustration', 'golden-ratio-composition'],
      influences: ['Luigi Serafini', 'Emma Kunz', 'Hilma af Klint']
    },
    metadata: {
      created: new Date(),
      complexity: 0.8,
      aestheticScore: 0.9,
      innovationScore: 0.85,
      culturalSignificance: 0.7,
      tags: ['sacred-geometry', 'surreal', 'codex-seraphinianus', 'golden-ratio'],
      description: 'Geometric patterns inspired by the Codex Seraphinianus with sacred ratio overlays'
    }
  },

  'voynich-botanical': {
    id: 'voynich-botanical',
    name: 'Voynich Botanical Consciousness',
    type: 'organic',
    source: 'book-derived',
    parameters: {
      growthRate: 1.414,
      branchingFactor: 0.618,
      symmetry: 5,
      iterations: 7,
      fractalType: 'custom'
    },
    realWorldConnection: REAL_DATA_SOURCES['voynich-manuscript'],
    artStyle: {
      name: 'Living Botanical Art',
      genre: 'abstract',
      medium: 'digital',
      colorPalette: {
        primary: ['#50c878', '#228b22', '#32cd32'],
        secondary: ['#8b4513', '#daa520', '#ff6347'],
        accent: ['#9370db', '#4169e1'],
        harmony: 'analogous',
        temperature: 'cool'
      },
      techniques: ['plant-morphology', 'fractal-growth', 'consciousness-mapping'],
      influences: ['Voynich Manuscript', 'Karl Blossfeldt', 'Georgia O\'Keeffe']
    },
    metadata: {
      created: new Date(),
      complexity: 0.75,
      aestheticScore: 0.8,
      innovationScore: 0.9,
      culturalSignificance: 0.6,
      tags: ['botanical', 'fractal', 'plant-consciousness', 'voynich'],
      description: 'Organic patterns based on the Voynich Manuscript\'s mysterious botanical illustrations'
    }
  },

  'chartres-rose': {
    id: 'chartres-rose',
    name: 'Chartres Rose Window Pattern',
    type: 'sacred',
    source: 'real-world',
    parameters: {
      petalCount: 12,
      spiralCount: 3,
      sacredRatio: 1.618,
      rotation: 30,
      scale: 2.718
    },
    realWorldConnection: REAL_DATA_SOURCES['chartres-cathedral'],
    artStyle: {
      name: 'Gothic Rose Illumination',
      genre: 'abstract',
      medium: 'digital',
      colorPalette: {
        primary: ['#000080', '#4169e1', '#1e90ff'],
        secondary: ['#ffd700', '#ff6347', '#50c878'],
        accent: ['#800080', '#ff1493'],
        harmony: 'complementary',
        temperature: 'cool'
      },
      techniques: ['gothic-tracery', 'stained-glass-simulation', 'radial-symmetry'],
      influences: ['Chartres Cathedral', 'William Morris', 'Art Nouveau']
    },
    metadata: {
      created: new Date(),
      complexity: 0.9,
      aestheticScore: 0.95,
      innovationScore: 0.7,
      culturalSignificance: 0.9,
      tags: ['gothic', 'rose-window', 'sacred-geometry', 'chartres'],
      description: 'Rose window patterns inspired by Chartres Cathedral\'s magnificent stained glass'
    }
  },

  'fibonacci-spiral': {
    id: 'fibonacci-spiral',
    name: 'Fibonacci Spiral Galaxy',
    type: 'fractal',
    source: 'real-world',
    parameters: {
      iterations: 15,
      fractalType: 'julia',
      rotation: 137.5,
      scale: 1.618,
      sacredRatio: 1.618
    },
    realWorldConnection: REAL_DATA_SOURCES['sunflower-head'],
    artStyle: {
      name: 'Mathematical Beauty',
      genre: 'abstract',
      medium: 'digital',
      colorPalette: {
        primary: ['#ffd700', '#daa520', '#b8860b'],
        secondary: ['#8b4513', '#deb887', '#f4a460'],
        accent: ['#ff6347', '#ff4500'],
        harmony: 'analogous',
        temperature: 'warm'
      },
      techniques: ['fibonacci-sequences', 'spiral-composition', 'mathematical-mapping'],
      influences: ['Fibonacci', 'M.C. Escher', 'Bridget Riley']
    },
    metadata: {
      created: new Date(),
      complexity: 0.85,
      aestheticScore: 0.9,
      innovationScore: 0.8,
      culturalSignificance: 0.75,
      tags: ['fibonacci', 'spiral', 'mathematical', 'fractal'],
      description: 'Fibonacci spiral patterns found in nature and mathematics'
    }
  }
};
