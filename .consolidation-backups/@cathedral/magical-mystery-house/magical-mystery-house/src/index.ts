/**
 * Magical Mystery House - Extended Universe Implementation
 * Mystery Chambers and Extended Narrative System
 */

// Core Mystery House Types
export interface MysteryChamber {
  id: string;
  name: string;
  description: string;
  mystery: Mystery;
  connections: ChamberConnection[];
  discoveries: Discovery[];
  narrative: NarrativeThread;
  energy: number;
  unlocked: boolean;
}

export interface ChamberConnection {
  chamberId: string;
  type: 'door' | 'portal' | 'hidden' | 'locked';
  requirement?: string;
  energyCost?: number;
}

export interface Discovery {
  id: string;
  name: string;
  description: string;
  type: 'artifact' | 'knowledge' | 'ability' | 'memory';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  energy: number;
}

export interface NarrativeThread {
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  branches: NarrativeBranch[];
}

export interface NarrativeBranch {
  id: string;
  title: string;
  description: string;
  requirement?: string;
  consequence: string;
}

export interface Mystery {
  type: 'enigma' | 'paradox' | 'revelation' | 'transformation';
  difficulty: number;
  clues: string[];
  solution?: string;
  reward: Discovery;
}

/**
 * Magical Mystery House Engine
 * Implements the extended universe with mystery chambers
 */
export class MagicalMysteryHouse {
  private chambers: Map<string, MysteryChamber> = new Map();
  private currentChamber: string = 'entrance';
  private discoveredChambers: Set<string> = new Set();
  private playerProgress: PlayerProgress = {
    energy: 100,
    discoveries: [],
    narrativeProgress: new Map()
  };

  constructor() {
    this.initializeChambers();
  }

  /**
   * Initialize the mystery chambers
   */
  private initializeChambers(): void {
    // Entrance Chamber
    this.chambers.set('entrance', {
      id: 'entrance',
      name: 'The Grand Foyer',
      description: 'A magnificent entrance hall with doors leading to impossible places.',
      mystery: {
        type: 'enigma',
        difficulty: 1,
        clues: ['The doors seem to shift when not observed', 'Some doors lead to the same place'],
        solution: 'Consciousness creates reality',
        reward: {
          id: 'observer-key',
          name: 'Observer\'s Key',
          description: 'Understanding that consciousness shapes reality',
          type: 'knowledge',
          rarity: 'common',
          energy: 10
        }
      },
      connections: [
        { chamberId: 'library', type: 'door' },
        { chamberId: 'garden', type: 'door' },
        { chamberId: 'mirror', type: 'hidden', requirement: 'observer-key' }
      ],
      discoveries: [],
      narrative: {
        title: 'The House Awakens',
        description: 'You find yourself in a house that seems to breathe and change.',
        progress: 0,
        maxProgress: 10,
        branches: []
      },
      energy: 50,
      unlocked: true
    });

    // Library Chamber
    this.chambers.set('library', {
      id: 'library',
      name: 'The Infinite Library',
      description: 'Books float in the air, rearranging themselves as you approach.',
      mystery: {
        type: 'paradox',
        difficulty: 3,
        clues: ['Books contain stories that haven\'t been written yet', 'The librarian is also the library'],
        solution: 'Knowledge is consciousness manifesting',
        reward: {
          id: 'living-book',
          name: 'Living Grimoire',
          description: 'A book that writes itself based on your thoughts',
          type: 'artifact',
          rarity: 'rare',
          energy: 50
        }
      },
      connections: [
        { chamberId: 'entrance', type: 'door' },
        { chamberId: 'study', type: 'portal', energyCost: 20 }
      ],
      discoveries: [],
      narrative: {
        title: 'The Library of Consciousness',
        description: 'Books that contain the accumulated wisdom of countless minds.',
        progress: 0,
        maxProgress: 15,
        branches: []
      },
      energy: 75,
      unlocked: false
    });

    // Mirror Chamber
    this.chambers.set('mirror', {
      id: 'mirror',
      name: 'The Hall of Reflections',
      description: 'Infinite mirrors show not just your reflection, but possible selves.',
      mystery: {
        type: 'revelation',
        difficulty: 5,
        clues: ['Each reflection is a real possibility', 'The mirrors remember every choice'],
        solution: 'All possibilities exist simultaneously',
        reward: {
          id: 'mirror-self',
          name: 'Mirror Self',
          description: 'Ability to see and communicate with alternate versions of yourself',
          type: 'ability',
          rarity: 'legendary',
          energy: 100
        }
      },
      connections: [
        { chamberId: 'entrance', type: 'hidden' },
        { chamberId: 'nexus', type: 'portal', requirement: 'mirror-self' }
      ],
      discoveries: [],
      narrative: {
        title: 'Infinite Possibilities',
        description: 'Every choice creates a new reality, and all exist simultaneously.',
        progress: 0,
        maxProgress: 20,
        branches: []
      },
      energy: 90,
      unlocked: false
    });

    // Add more chambers...
    this.initializeAdditionalChambers();
  }

  /**
   * Initialize additional mystery chambers
   */
  private initializeAdditionalChambers(): void {
    // Garden Chamber
    this.chambers.set('garden', {
      id: 'garden',
      name: 'The Living Garden',
      description: 'Plants that respond to thoughts and emotions.',
      mystery: {
        type: 'transformation',
        difficulty: 2,
        clues: ['Plants grow based on emotional state', 'The garden reflects inner landscape'],
        solution: 'Consciousness and nature are interconnected',
        reward: {
          id: 'plant-empathy',
          name: 'Plant Empathy',
          description: 'Ability to communicate with plants and understand their wisdom',
          type: 'ability',
          rarity: 'uncommon',
          energy: 25
        }
      },
      connections: [
        { chamberId: 'entrance', type: 'door' },
        { chamberId: 'greenhouse', type: 'door' }
      ],
      discoveries: [],
      narrative: {
        title: 'The Garden of Consciousness',
        description: 'Plants as mirrors of the soul.',
        progress: 0,
        maxProgress: 12,
        branches: []
      },
      energy: 60,
      unlocked: false
    });

    // Study Chamber
    this.chambers.set('study', {
      id: 'study',
      name: 'The Alchemist\'s Study',
      description: 'A laboratory where thoughts become reality.',
      mystery: {
        type: 'transformation',
        difficulty: 4,
        clues: ['Thoughts manifest as physical objects', 'The study adapts to research needs'],
        solution: 'Consciousness is the ultimate alchemical agent',
        reward: {
          id: 'thought-manifestation',
          name: 'Thought Manifestation',
          description: 'Ability to manifest thoughts into physical reality',
          type: 'ability',
          rarity: 'rare',
          energy: 75
        }
      },
      connections: [
        { chamberId: 'library', type: 'portal' },
        { chamberId: 'laboratory', type: 'door' }
      ],
      discoveries: [],
      narrative: {
        title: 'The Alchemist\'s Study',
        description: 'Where consciousness meets matter.',
        progress: 0,
        maxProgress: 18,
        branches: []
      },
      energy: 80,
      unlocked: false
    });
  }

  /**
   * Explore a mystery chamber
   */
  exploreChamber(chamberId: string): ExplorationResult {
    const chamber = this.chambers.get(chamberId);
    if (!chamber || !chamber.unlocked) {
      return {
        success: false,
        message: 'Chamber is locked or does not exist',
        energyCost: 0
      };
    }

    // Check energy requirement
    if (this.playerProgress.energy < chamber.energy) {
      return {
        success: false,
        message: 'Not enough energy to explore this chamber',
        energyCost: 0
      };
    }

    // Deduct energy
    this.playerProgress.energy -= chamber.energy;

    // Mark chamber as discovered
    this.discoveredChambers.add(chamberId);
    this.currentChamber = chamberId;

    // Generate discoveries
    const discoveries = this.generateDiscoveries(chamber);

    return {
      success: true,
      message: `Entered ${chamber.name}: ${chamber.description}`,
      chamber,
      discoveries,
      energyCost: chamber.energy
    };
  }

  /**
   * Generate discoveries for a chamber
   */
  private generateDiscoveries(chamber: MysteryChamber): Discovery[] {
    const discoveries: Discovery[] = [];

    // Base discovery chance
    const discoveryChance = chamber.energy / 100;

    if (Math.random() < discoveryChance) {
      discoveries.push(chamber.mystery.reward);
      this.playerProgress.discoveries.push(chamber.mystery.reward);
    }

    return discoveries;
  }

  /**
   * Get current chamber
   */
  getCurrentChamber(): MysteryChamber | null {
    return this.chambers.get(this.currentChamber) || null;
  }

  /**
   * Get all unlocked chambers
   */
  getUnlockedChambers(): MysteryChamber[] {
    return Array.from(this.discoveredChambers)
      .map(id => this.chambers.get(id))
      .filter(chamber => chamber !== undefined) as MysteryChamber[];
  }

  /**
   * Get player progress
   */
  getPlayerProgress(): PlayerProgress {
    return { ...this.playerProgress };
  }

  /**
   * Unlock a chamber (usually through solving mysteries)
   */
  unlockChamber(chamberId: string): boolean {
    const chamber = this.chambers.get(chamberId);
    if (chamber) {
      chamber.unlocked = true;
      return true;
    }
    return false;
  }

  /**
   * Add energy to player
   */
  addEnergy(amount: number): void {
    this.playerProgress.energy = Math.min(100, this.playerProgress.energy + amount);
  }

  /**
   * Get all chambers for interface display
   */
  getAllChambers(): MysteryChamber[] {
    return Array.from(this.chambers.values());
  }
}

/**
 * Mystery Chamber Explorer
 * Handles interaction with mystery chambers
 */
export class MysteryExplorer {
  private house: MagicalMysteryHouse;

  constructor(house: MagicalMysteryHouse) {
    this.house = house;
  }

  /**
   * Explore a specific chamber
   */
  explore(chamberId: string): ExplorationResult {
    return this.house.exploreChamber(chamberId);
  }

  /**
   * Get exploration options from current chamber
   */
  getExplorationOptions(): ChamberConnection[] {
    const currentChamber = this.house.getCurrentChamber();
    return currentChamber ? currentChamber.connections : [];
  }

  /**
   * Attempt to solve a chamber's mystery
   */
  solveMystery(chamberId: string, solution: string): boolean {
    const chamber = this.house.getCurrentChamber();
    if (chamber && chamber.mystery.solution === solution) {
      // Unlock the mystery's reward and connections
      this.house.unlockChamber(chamberId);
      return true;
    }
    return false;
  }
}

/**
 * Export the main Magical Mystery House system
 */
export const magicalMysteryHouse = new MagicalMysteryHouse();
export const mysteryExplorer = new MysteryExplorer(magicalMysteryHouse);

// Default export for easy importing
export default MagicalMysteryHouse;

// Additional interfaces for the system
export interface PlayerProgress {
  energy: number;
  discoveries: Discovery[];
  narrativeProgress: Map<string, number>;
}

export interface ExplorationResult {
  success: boolean;
  message: string;
  chamber?: MysteryChamber;
  discoveries?: Discovery[];
  energyCost: number;
}
