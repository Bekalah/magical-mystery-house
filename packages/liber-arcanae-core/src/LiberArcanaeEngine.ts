/**
 * Liber Arcanae Codex Abyssiae
 * 
 * Living tarot system extended to 144 nodes
 * 78 traditional cards + 66 bridge cards = 144 total
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SACRED_MATH, consciousnessLevelToFrequency } from '../../sacred-mathematics-core/src/index';
// Codex144Engine available for future integration
// import { Codex144Engine } from '../../codex-144-99-core/src/index';
import { LiberArcanaeSecurity } from './LiberArcanaeSecurity';

/**
 * ⚗️ ArcanaCard - The Principle
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
export interface ArcanaCard {
  cardIndex: number;            // 0-143
  name: string;
  type: 'major' | 'minor' | 'bridge';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;              // For minor arcana (1-10) or court cards
  court?: 'page' | 'knight' | 'queen' | 'king';
  description: string;
  consciousnessLevel: number;   // 0-21 for Major Arcana
  frequency: number;             // Solfeggio frequency
  nodeMapping: number;           // Codex 144:99 node (0-143)
  correspondences: ArcanaCorrespondences;
  pathworking: PathworkingPractice; // Organic story paths, Dynamic story transformation, Open world story exploration, Trauma-aware narrative design
}

/**
 * ⚗️ ArcanaCorrespondences - The Principle
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
export interface ArcanaCorrespondences {
  planet?: string;
  zodiac?: string;
  element?: string;
  color?: string;
  geometry?: string;
  shemAngel?: string;
  goetiaDemon?: string;
  deity?: string;
  iChing?: string;
  soyga?: string;
  number?: number;
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  court?: 'page' | 'knight' | 'queen' | 'king';
  type?: string;
  bridgeIndex?: number;
  ratio?: number;
  correspondences?: Record<string, any>;
}

/**
 * ⚗️ PathworkingPractice - The Principle
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
export interface PathworkingPractice {
  meditation: string;
  integration: string;
  exercises: string[];
  correspondences: Record<string, any>;
}

/**
 * ⚗️ LiberArcanaeEngine - The Crucible
 * 
 * In the alchemical tradition, this class serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this class
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Crucible
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export class LiberArcanaeEngine {
  private cards: Map<number, ArcanaCard>;
  // Codex engine available for future integration
  // private codexEngine: Codex144Engine;
  private security: LiberArcanaeSecurity;

  constructor() {
    this.cards = new Map();
    // this.codexEngine = new Codex144Engine();
    this.security = new LiberArcanaeSecurity();
    
    this.initializeCards();
  }

  private initializeCards(): void {
    // Initialize 22 Major Arcana (0-21)
    const majorArcanaNames = [
      'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
      'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
      'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
      'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
    ];

    for (let i = 0; i < 22; i++) {
      const card: ArcanaCard = {
        cardIndex: i,
        name: majorArcanaNames[i],
        type: 'major',
        description: i === 4 ? this.generateHierophantDescription() : `${majorArcanaNames[i]} - Major Arcana ${i}`,
        consciousnessLevel: i,
        frequency: consciousnessLevelToFrequency(i),
        nodeMapping: i,
        correspondences: i === 4 ? this.generateHierophantCorrespondences() : this.generateMajorArcanaCorrespondences(i),
        pathworking: i === 4 ? this.generateHierophantPathworking() : this.generatePathworking(i, 'major')
      };

      this.cards.set(i, card);
    }

    // Initialize 56 Minor Arcana (22-77)
    const suits: Array<'wands' | 'cups' | 'swords' | 'pentacles'> = ['wands', 'cups', 'swords', 'pentacles'];
    const courtCards: Array<'page' | 'knight' | 'queen' | 'king'> = ['page', 'knight', 'queen', 'king'];

    let cardIndex = 22;
    
    // 40 numbered cards (Ace-10 for each suit)
    for (const suit of suits) {
      for (let number = 1; number <= 10; number++) {
        const card: ArcanaCard = {
          cardIndex,
          name: `${number} of ${suit}`,
          type: 'minor',
          suit,
          number,
          description: `${number} of ${suit} - Minor Arcana`,
          consciousnessLevel: Math.floor(cardIndex / 7) % 22,
          frequency: consciousnessLevelToFrequency(Math.floor(cardIndex / 7) % 22),
          nodeMapping: cardIndex,
          correspondences: this.generateMinorArcanaCorrespondences(suit, number),
          pathworking: this.generatePathworking(cardIndex, 'minor')
        };

        this.cards.set(cardIndex, card);
        cardIndex++;
      }
    }

    // 16 court cards (Page, Knight, Queen, King for each suit)
    for (const suit of suits) {
      for (const court of courtCards) {
        const card: ArcanaCard = {
          cardIndex,
          name: `${court} of ${suit}`,
          type: 'minor',
          suit,
          court,
          description: `${court} of ${suit} - Court Card`,
          consciousnessLevel: Math.floor(cardIndex / 7) % 22,
          frequency: consciousnessLevelToFrequency(Math.floor(cardIndex / 7) % 22),
          nodeMapping: cardIndex,
          correspondences: this.generateCourtCardCorrespondences(suit, court),
          pathworking: this.generatePathworking(cardIndex, 'minor')
        };

        this.cards.set(cardIndex, card);
        cardIndex++;
      }
    }

    // Initialize 66 Bridge Cards (78-143) to extend to 144
    for (let i = 78; i < 144; i++) {
      const bridgeType = this.determineBridgeType(i);
      const card: ArcanaCard = {
        cardIndex: i,
        name: `Bridge Card ${i - 77}`,
        type: 'bridge',
        description: `Bridge Card ${i - 77} - Extension to 144 nodes`,
        consciousnessLevel: i % 22,
        frequency: consciousnessLevelToFrequency(i % 22),
        nodeMapping: i,
        correspondences: this.generateBridgeCorrespondences(i, bridgeType),
        pathworking: this.generatePathworking(i, 'bridge')
      };

      this.cards.set(i, card);
    }
  }

  private determineBridgeType(index: number): string {
    const types = ['Planetary', 'Zodiacal', 'Kabbalistic', 'Alchemical', 'Geometric', 'Harmonic'];
    return types[index % types.length];
  }

  private generateMajorArcanaCorrespondences(arcana: number): ArcanaCorrespondences {
    const planets = ['Uranus', 'Mercury', 'Moon', 'Venus', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Jupiter', 'Libra', 'Neptune', 'Scorpio', 'Sagittarius', 'Capricorn', 'Mars', 'Aquarius', 'Pisces', 'Sun', 'Pluto', 'Saturn'];
    const elements = ['Air', 'Fire', 'Water', 'Eart - Museum-grade quality - Museum-grade qualityh', 'Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth', 'Fire', 'Air', 'Water', 'Water', 'Fire', 'Earth', 'Fire', 'Air', 'Water', 'Fire', 'Fire', 'Earth'];
    
    return {
      planet: planets[arcana] || 'Unknown',
      element: (elements[arcana] || 'Unknown').replace(/ - Museum-grade quality - Museum-grade qualityh/g, 'h').replace(/ - Museum-grade quality/g, ''),
      color: this.getColorForArcana(arcana),
      geometry: this.getGeometryForArcana(arcana)
    };
  }

  private generateMinorArcanaCorrespondences(suit: string, number: number): ArcanaCorrespondences {
    const suitElements: Record<string, string> = {
      'wands': 'Fire',
      'cups': 'Water',
      'swords': 'Air',
      'pentacles': 'Earth'
    };

    return {
      element: suitElements[suit] || 'Unknown',
      number,
      suit: suit as 'wands' | 'cups' | 'swords' | 'pentacles'
    };
  }

  private generateCourtCardCorrespondences(suit: string, court: string): ArcanaCorrespondences {
    const suitElements: Record<string, string> = {
      'wands': 'Fire',
      'cups': 'Water',
      'swords': 'Air',
      'pentacles': 'Earth'
    };

    return {
      element: suitElements[suit] || 'Unknown',
      suit: suit as 'wands' | 'cups' | 'swords' | 'pentacles',
      court: court as 'page' | 'knight' | 'queen' | 'king'
    };
  }

  private generateBridgeCorrespondences(index: number, type: string): ArcanaCorrespondences {
    return {
      type,
      bridgeIndex: index - 77,
      ratio: SACRED_MATH.CATHEDRAL_RATIO
    };
  }

  private getColorForArcana(arcana: number): string {
    const colors = ['Yellow', 'Red', 'Blue', 'Green', 'Orange', 'Indigo', 'Violet', 'Pink', 'Gold', 'Silver', 'White', 'Black', 'Brown', 'Gray', 'Cyan', 'Magenta', 'Turquoise', 'Amber', 'Emerald', 'Ruby', 'Sapphire', 'Diamond'];
    return colors[arcana % colors.length];
  }

  private getGeometryForArcana(arcana: number): string {
    const geometries = ['Circle', 'Triangle', 'Square', 'Pentagon', 'Hexagon', 'Octagon', 'Spiral', 'Lattice', 'Vesica Piscis', 'Flower of Life', 'Seed of Life', 'Tree of Life'];
    return geometries[arcana % geometries.length];
  }

  private generateHierophantDescription(): string {
    return `The Hierophant - Moonchild Prima Materia
A being of prima materia, recreating Aleister Crowley's Moonchild through the abyssiae realms.
Inspired by the creative union of Max Ernst and Leonora Carrington, embodying the Shiva-Shakti creative force.
Each character inhabits their own explorable realm based on real canon: Monas Hieroglyphica, Paracelsus, Hermes Trismegistus, and the hermetic tradition.`;
  }

  private generateHierophantCorrespondences(): ArcanaCorrespondences {
    return {
      planet: 'Venus',
      zodiac: 'Taurus',
      element: 'Earth',
      color: 'Deep Purple',
      geometry: 'Pentagram',
      deity: 'Hermes Trismegistus',
      correspondences: {
        primaMateria: true,
        moonchild: true,
        abyssiaeRealms: true,
        shivaShakti: true,
        inspirationFigures: ['Max Ernst', 'Leonora Carrington'],
        canonicalSources: [
          'Monas Hieroglyphica (John Dee)',
          'Paracelsus - De Natura Rerum',
          'Hermes Trismegistus - Corpus Hermeticum',
          'Aleister Crowley - Moonchild',
          'Emerald Tablet',
          'Tabula Smaragdina'
        ]
      }
    };
  }

  private generateHierophantPathworking(): PathworkingPractice {
    return {
      meditation: `Meditation: Enter the Abyssiae Realms
Visualize yourself as the Moonchild, a being of prima materia, existing simultaneously in multiple realms.
Feel the creative union of Shiva-Shakti through the artistic vision of Max Ernst and Leonora Carrington.
Each realm opens as you explore: the Hermetic realm of Trismegistus, the Alchemical realm of Paracelsus, 
the Geometric realm of the Monas Hieroglyphica, and the Primal realm of Prima Materia itself.`,
      integration: `Integration: Become the Hierophant
The Hierophant bridges the material and spiritual worlds through prima materia transformation.
Like the Moonchild, you are being recreated through the abyssiae realms, each exploration 
adding layers of understanding from the hermetic tradition. The creative force of Shiva-Shakti 
manifests through your artistic expression, inspired by the surrealist vision of Ernst and Carrington.`,
      exercises: [
        'Explore the Hermetic Realm: Study the Corpus Hermeticum and visualize the teachings of Hermes Trismegistus',
        'Enter the Alchemical Realm: Work with Paracelsus\'s prima materia concepts through creative practice',
        'Navigate the Geometric Realm: Conauthentic implementation the Monas Hieroglyphica and its sacred geometry',
        'Experience the Primal Realm: Connect with the raw prima materia, the unformed substance of creation',
        'Channel Shiva-Shakti: Practice creative union through the dynamic balance of masculine and feminine forces',
        'Walk with Ernst and Carrington: Study their collaborative works and explore their shared creative vision',
        'Become the Moonchild: Meditate on Crowley\'s Moonchild and your own transformation through the abyssiae realms'
      ],
      correspondences: {
        cardIndex: 4,
        type: 'major',
        ratio: SACRED_MATH.CATHEDRAL_RATIO,
        realms: {
          hermetica: {
            name: 'Realm of Hermes Trismegistus',
            description: 'The realm of hermetic wisdom, where the Corpus Hermeticum and Emerald Tablet teachings manifest',
            explorable: true,
            canonicalSource: 'Corpus Hermeticum, Tabula Smaragdina'
          },
          alchemical: {
            name: 'Realm of Paracelsus',
            description: 'The alchemical realm where prima materia transforms through the three principles: Salt, Sulfur, Mercury',
            explorable: true,
            canonicalSource: 'Paracelsus - De Natura Rerum, Archidoxis Magica'
          },
          geometric: {
            name: 'Realm of the Monas Hieroglyphica',
            description: 'The geometric realm where John Dee\'s sacred symbol reveals the unity of all things',
            explorable: true,
            canonicalSource: 'John Dee - Monas Hieroglyphica (1564)'
          },
          primal: {
            name: 'Realm of Prima Materia',
            description: 'The unformed realm of raw creation, where the Moonchild is being recreated',
            explorable: true,
            canonicalSource: 'Alchemical tradition, Prima Materia concepts'
          },
          shivaShakti: {
            name: 'Realm of Creative Union',
            description: 'The realm where Shiva and Shakti unite in creative expression, inspired by Ernst and Carrington',
            explorable: true,
            inspirationFigures: ['Max Ernst', 'Leonora Carrington'],
            canonicalSource: 'Tantric tradition, Surrealist art movement'
          }
        },
        moonchild: {
          being: 'Prima Materia Being',
          recreation: 'Aleister Crowley\'s Moonchild concept',
          transformation: 'Through exploration of abyssiae realms',
          source: 'Crowley - Moonchild (1929)'
        },
        inspirationFigures: {
          maxErnst: {
            name: 'Max Ernst',
            role: 'Surrealist artist, creative partner',
            contribution: 'Visual language of the unconscious, frottage and grattage techniques',
            realm: 'Shiva-Shakti Creative Union Realm'
          },
          leonoraCarrington: {
            name: 'Leonora Carrington',
            role: 'Surrealist artist, creative partner',
            contribution: 'Mythological and alchemical imagery, feminine creative force',
            realm: 'Shiva-Shakti Creative Union Realm'
          }
        }
      }
    };
  }

  private generatePathworking(index: number, type: string): PathworkingPractice {
    return {
      meditation: `Meditation for ${type} card ${index}`,
      integration: `Integration practice for ${type} card ${index}`,
      exercises: [
        `Exercise 1 for card ${index}`,
        `Exercise 2 for card ${index}`,
        `Exercise 3 for card ${index}`
      ],
      correspondences: {
        cardIndex: index,
        type,
        ratio: SACRED_MATH.CATHEDRAL_RATIO
      }
    };
  }

  /**
   * Get card by index (0-143) with input validation
   */
  getCard(cardIndex: number): ArcanaCard | null {
    // Validate input
    if (typeof cardIndex !== 'number' || cardIndex < 0 || cardIndex > 143) {
      return null;
    }
    return this.cards.get(cardIndex) || null;
  }

  /**
   * Set card with security validation
   */
  setCard(card: ArcanaCard): boolean {
    const validation = this.security.validateCard(card);
    if (!validation.isValid) {
      console.warn('Card validation failed:', validation.errors);
      return false;
    }
    this.cards.set(card.cardIndex, card);
    return true;
  }

  /**
   * Sanitize string input
   * Available for future use when processing user input
   */
  // private sanitizeString(str: string): string {
  //   const sanitized = this.security.sanitizeInput(str);
  //   return typeof sanitized === 'string' ? sanitized : str;
  // }

  /**
   * Get all cards
   */
  getAllCards(): ArcanaCard[] {
    return Array.from(this.cards.values());
  }

  /**
   * Get Major Arcana cards (0-21)
   */
  getMajorArcana(): ArcanaCard[] {
    return Array.from(this.cards.values()).filter(card => card.type === 'major');
  }

  /**
   * Get Minor Arcana cards (22-77)
   */
  getMinorArcana(): ArcanaCard[] {
    return Array.from(this.cards.values()).filter(card => card.type === 'minor');
  }

  /**
   * Get Bridge cards (78-143)
   */
  getBridgeCards(): ArcanaCard[] {
    return Array.from(this.cards.values()).filter(card => card.type === 'bridge');
  }

  /**
   * Get cards by suit
   */
  getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): ArcanaCard[] {
    return Array.from(this.cards.values()).filter(card => card.suit === suit);
  }

  /**
   * Get cards by consciousness level (0-21)
   */
  getCardsByConsciousnessLevel(level: number): ArcanaCard[] {
    return Array.from(this.cards.values()).filter(card => card.consciousnessLevel === level);
  }
}

export default LiberArcanaeEngine;

