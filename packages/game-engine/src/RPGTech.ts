/**
 * @license CC0-1.0 - Public Domain
 * 
 * RPG Tech
 * Complete RPG system for fable-like game with:
 * - Boons and treasures based on real cannon
 * - Real stories integration
 * - Thelemic True Will integration
 * - Character progression
 * - Quest system
 */

/**
 * ⚗️ CanonBoon - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface CanonBoon {
  name: string;
  source: string;
  type: 'treasure' | 'boon';
  effect: string;
  story: string;
  thelemic: string;
}

/**
 * ⚗️ RealStory - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface RealStory {
  name: string;
  source: string;
  type: 'quest';
  boons: string[];
  story: string;
  thelemic: string;
}

/**
 * ⚗️ CharacterStats - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface CharacterStats {
  strength: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

/**
 * ⚗️ Character - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface Character {
  id: string;
  name: string;
  arcana: number;
  level: number;
  experience: number;
  stats: CharacterStats;
  trueWill: string | null;
  chaosMeter: number;
  inventory: string[];
  boons: CanonBoon[];
  treasures: CanonBoon[];
  quests: Quest[];
  created: string;
}

/**
 * ⚗️ Quest - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface Quest {
  id: string;
  characterId: string;
  name: string;
  story: RealStory;
  status: 'active' | 'completed';
  progress: number;
  started: string;
  completed?: string;
}

/**
 * ⚗️ CharacterData - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface CharacterData {
  id?: string;
  name: string;
  arcana?: number;
  strength?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

// Real cannon boons and treasures
export const CANON_BOONS: CanonBoon[] = [
  {
    name: 'The Philosopher\'s Stone',
    source: 'Alchemical tradition',
    type: 'treasure',
    effect: 'Complete transformation',
    story: 'The ultimate goal of alchemy, capable of transmuting base metals to gold and granting immortality',
    thelemic: 'Represents the completion of the Great Work'
  },
  {
    name: 'The Holy Grail',
    source: 'Arthurian legend',
    type: 'treasure',
    effect: 'Divine connection',
    story: 'The cup used by Christ at the Last Supper, sought by King Arthur\'s knights',
    thelemic: 'Symbol of divine union and completion'
  },
  {
    name: 'The Key of Solomon',
    source: 'Key of Solomon grimoire',
    type: 'boon',
    effect: 'Mastery of magic',
    story: 'Legendary grimoire attributed to King Solomon, containing powerful magical operations',
    thelemic: 'Represents the keys to understanding and mastery'
  },
  {
    name: 'The Enochian Tablets',
    source: 'John Dee\'s Enochian system',
    type: 'treasure',
    effect: 'Angelic communication',
    story: 'The tablets received by John Dee through angelic communication, containing the Enochian language',
    thelemic: 'Connection to the divine through angelic realms'
  },
  {
    name: 'Morgan Le Fay\'s Mirror',
    source: 'Avalon traditions',
    type: 'treasure',
    effect: 'Vision and scrying',
    story: 'The mirror of Morgan Le Fay, allowing vision into other realms and times',
    thelemic: 'Reflection of True Will and inner vision'
  },
  {
    name: 'The Emerald Tablet',
    source: 'Hermetic tradition',
    type: 'treasure',
    effect: 'Hermetic wisdom',
    story: 'The legendary tablet containing the secrets of alchemy, attributed to Hermes Trismegistus',
    thelemic: 'The foundation of Hermetic and Thelemic wisdom'
  },
  {
    name: 'Carrington\'s Kitchen Alchemy',
    source: 'Leonora Carrington',
    type: 'boon',
    effect: 'Transformation through creativity',
    story: 'The art of transformation through kitchen work, as practiced by surrealist artist Leonora Carrington',
    thelemic: 'Creative expression as True Will'
  },
  {
    name: 'Fortune\'s Sea Priestess Current',
    source: 'Dion Fortune',
    type: 'boon',
    effect: 'Avalon connection',
    story: 'The magical current of the Sea Priestess, connecting to Avalon and the inner planes',
    thelemic: 'Feminine mysteries and inner plane work'
  }
];

// Real stories for quests
export const REAL_STORIES: RealStory[] = [
  {
    name: 'The Quest for the Holy Grail',
    source: 'Arthurian legend',
    type: 'quest',
    boons: ['The Holy Grail', 'Divine connection'],
    story: 'The quest undertaken by King Arthur\'s knights to find the Holy Grail',
    thelemic: 'The search for divine union and completion'
  },
  {
    name: 'Dee\'s Enochian Communications',
    source: 'John Dee\'s diaries',
    type: 'quest',
    boons: ['The Enochian Tablets', 'Angelic communication'],
    story: 'John Dee\'s work with Edward Kelley to receive angelic communications and the Enochian language',
    thelemic: 'Connection to the divine through angelic work'
  },
  {
    name: 'The Alchemical Great Work',
    source: 'Alchemical tradition',
    type: 'quest',
    boons: ['The Philosopher\'s Stone', 'Complete transformation'],
    story: 'The alchemical process of transformation from base matter to the Philosopher\'s Stone',
    thelemic: 'The Great Work of Thelema, achieving True Will'
  },
  {
    name: 'The Journey to Avalon',
    source: 'Avalon traditions',
    type: 'quest',
    boons: ['Morgan Le Fay\'s Mirror', 'Avalon connection'],
    story: 'The journey to the mystical isle of Avalon, realm of Morgan Le Fay',
    thelemic: 'Inner plane work and feminine mysteries'
  }
];

/**
 * ⚗️ RPGTech - The Crucible
 * 
 * In the alchemical tradition, this class serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this class
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Crucible
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export class RPGTech {
  private characters: Map<string, Character>;
  private quests: Map<string, Quest>;
  private boons: Map<string, { characterId: string; boon: CanonBoon; acquired: string }>;
  private treasures: Map<string, { characterId: string; treasure: CanonBoon; acquired: string }>;
  private inventories: Map<string, string[]>;

  constructor() {
    this.characters = new Map();
    this.quests = new Map();
    this.boons = new Map();
    this.treasures = new Map();
    this.inventories = new Map();
  }

  /**
   * Create character
   */
  createCharacter(characterData: CharacterData): Character {
    const character: Character = {
      id: characterData.id || `character-${Date.now()}`,
      name: characterData.name,
      arcana: characterData.arcana || 0,
      level: 1,
      experience: 0,
      stats: {
        strength: characterData.strength || 10,
        intelligence: characterData.intelligence || 10,
        wisdom: characterData.wisdom || 10,
        charisma: characterData.charisma || 10
      },
      trueWill: null, // Will be set by True Will tech
      chaosMeter: 50, // Starts at neutral
      inventory: [],
      boons: [],
      treasures: [],
      quests: [],
      created: new Date().toISOString()
    };
    
    this.characters.set(character.id, character);
    this.inventories.set(character.id, []);
    
    return character;
  }

  /**
   * Add boon to character
   */
  addBoon(characterId: string, boonName: string): Character {
    const character = this.characters.get(characterId);
    if (!character) {
      throw new Error(`Character not found: ${characterId}`);
    }
    
    const boon = CANON_BOONS.find(b => b.name === boonName);
    if (!boon) {
      throw new Error(`Boon not found: ${boonName}`);
    }
    
    if (!character.boons.find(b => b.name === boonName)) {
      character.boons.push(boon);
      this.boons.set(`${characterId}-${boonName}`, {
        characterId: characterId,
        boon: boon,
        acquired: new Date().toISOString()
      });
      
      // Apply boon effect
      this.applyBoonEffect(character, boon);
    }
    
    return character;
  }

  /**
   * Add treasure to character
   */
  addTreasure(characterId: string, treasureName: string): Character {
    const character = this.characters.get(characterId);
    if (!character) {
      throw new Error(`Character not found: ${characterId}`);
    }
    
    const treasure = CANON_BOONS.find(t => t.name === treasureName && t.type === 'treasure');
    if (!treasure) {
      throw new Error(`Treasure not found: ${treasureName}`);
    }
    
    if (!character.treasures.find(t => t.name === treasureName)) {
      character.treasures.push(treasure);
      this.treasures.set(`${characterId}-${treasureName}`, {
        characterId: characterId,
        treasure: treasure,
        acquired: new Date().toISOString()
      });
      
      // Apply treasure effect
      this.applyTreasureEffect(character, treasure);
    }
    
    return character;
  }

  /**
   * Apply boon effect
   */
  private applyBoonEffect(character: Character, boon: CanonBoon): void {
    // Apply boon effects to character stats or abilities
    // This would integrate with the game system
  }

  /**
   * Apply treasure effect
   */
  private applyTreasureEffect(character: Character, treasure: CanonBoon): void {
    // Apply treasure effects
  }

  /**
   * Start quest
   */
  startQuest(characterId: string, questName: string): Quest {
    const character = this.characters.get(characterId);
    if (!character) {
      throw new Error(`Character not found: ${characterId}`);
    }
    
    const story = REAL_STORIES.find(s => s.name === questName);
    if (!story) {
      throw new Error(`Quest not found: ${questName}`);
    }
    
    const quest: Quest = {
      id: `quest-${characterId}-${Date.now()}`,
      characterId: characterId,
      name: story.name,
      story: story,
      status: 'active',
      progress: 0,
      started: new Date().toISOString()
    };
    
    this.quests.set(quest.id, quest);
    character.quests.push(quest);
    
    return quest;
  }

  /**
   * Complete quest
   */
  completeQuest(questId: string): Quest {
    const quest = this.quests.get(questId);
    if (!quest) {
      throw new Error(`Quest not found: ${questId}`);
    }
    
    quest.status = 'completed';
    quest.completed = new Date().toISOString();
    
    const character = this.characters.get(quest.characterId);
    if (character) {
      // Award experience and boons
      character.experience += 100;
      character.level = Math.floor(character.experience / 100) + 1;
      
      // Award boons from quest
      for (const boonName of quest.story.boons) {
        this.addBoon(quest.characterId, boonName);
      }
    }
    
    return quest;
  }

  /**
   * Update chaos meter based on True Will alignment
   */
  updateChaosMeter(characterId: string, alignment: number): number {
    const character = this.characters.get(characterId);
    if (!character) {
      throw new Error(`Character not found: ${characterId}`);
    }
    
    // Chaos meter: 0-100
    // Based on True Will alignment
    // 0 = Perfect alignment (no chaos)
    // 100 = Complete misalignment (maximum chaos)
    const chaos = Math.max(0, Math.min(100, 100 - alignment));
    character.chaosMeter = chaos;
    
    return chaos;
  }

  /**
   * Get character
   */
  getCharacter(characterId: string): Character | null {
    return this.characters.get(characterId) || null;
  }

  /**
   * Get all characters
   */
  getAllCharacters(): Character[] {
    return Array.from(this.characters.values());
  }
}

/**
 * Create RPG character (convenience function)
 */
export async function createRPGCharacter(characterData: CharacterData): Promise<{ rpg: RPGTech; character: Character }> {
  const rpg = new RPGTech();
  const character = rpg.createCharacter(characterData);
  
  return { rpg, character };
}

export default RPGTech;

