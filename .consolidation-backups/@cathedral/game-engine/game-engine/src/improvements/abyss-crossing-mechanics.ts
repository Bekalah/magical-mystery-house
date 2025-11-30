/**
 * Abyss Crossing Mechanics
 * 
 * Created from doubt: "The game needs to represent the real journey of crossing the abyss"
 * Improvement: Create game mechanics that track and reward the solve et coagula process
 * 
 * This is how visionary art is created - the struggle becomes the game.
 * 
 * @package @cathedral/game-engine
 */

export interface AbyssCrossing {
  id: string;
  cycle: number;
  doubt: string;
  improvement: string;
  toolCreated: string;
  beautyAdded: string;
  wisdomGained: string;
  timestamp: Date;
  rewards: {
    experience: number;
    wisdom: number;
    beauty: number;
    tools: string[];
  };
}

export interface AbyssProgress {
  cyclesCompleted: number;
  toolsCreated: number;
  beautyPoints: number;
  wisdomPoints: number;
  abyssLevel: number; // 1-10, crossing the abyss
  achievements: string[];
}

/**
 * Abyss Crossing Mechanics
 * 
 * Tracks and rewards the solve et coagula process in the game
 */
export class AbyssCrossingMechanics {
  private crossings: AbyssCrossing[] = [];
  private progress: AbyssProgress = {
    cyclesCompleted: 0,
    toolsCreated: 0,
    beautyPoints: 0,
    wisdomPoints: 0,
    abyssLevel: 1,
    achievements: []
  };

  /**
   * Record an abyss crossing
   */
  recordCrossing(
    doubt: string,
    improvement: string,
    toolCreated: string,
    beautyAdded: string,
    wisdomGained: string
  ): AbyssCrossing {
    const crossing: AbyssCrossing = {
      id: `crossing-${Date.now()}`,
      cycle: this.progress.cyclesCompleted + 1,
      doubt,
      improvement,
      toolCreated,
      beautyAdded,
      wisdomGained,
      timestamp: new Date(),
      rewards: {
        experience: 100,
        wisdom: 50,
        beauty: 75,
        tools: [toolCreated]
      }
    };

    this.crossings.push(crossing);
    this.updateProgress(crossing);

    return crossing;
  }

  /**
   * Update progress from crossing
   */
  private updateProgress(crossing: AbyssCrossing): void {
    this.progress.cyclesCompleted++;
    this.progress.toolsCreated++;
    this.progress.beautyPoints += crossing.rewards.beauty;
    this.progress.wisdomPoints += crossing.rewards.wisdom;

    // Calculate abyss level (1-10)
    const totalPoints = this.progress.beautyPoints + this.progress.wisdomPoints;
    this.progress.abyssLevel = Math.min(10, Math.floor(totalPoints / 100) + 1);

    // Check for achievements
    this.checkAchievements();
  }

  /**
   * Check for achievements
   */
  private checkAchievements(): void {
    const achievements: string[] = [];

    if (this.progress.cyclesCompleted >= 10) {
      achievements.push('Dedicated Creator');
    }
    if (this.progress.cyclesCompleted >= 50) {
      achievements.push('Master of Doubt');
    }
    if (this.progress.cyclesCompleted >= 100) {
      achievements.push('Abyss Walker');
    }
    if (this.progress.toolsCreated >= 10) {
      achievements.push('Tool Maker');
    }
    if (this.progress.toolsCreated >= 50) {
      achievements.push('Master Craftsman');
    }
    if (this.progress.beautyPoints >= 1000) {
      achievements.push('Beauty Seeker');
    }
    if (this.progress.wisdomPoints >= 1000) {
      achievements.push('Wisdom Keeper');
    }
    if (this.progress.abyssLevel >= 5) {
      achievements.push('Abyss Crosser');
    }
    if (this.progress.abyssLevel >= 10) {
      achievements.push('Abyss Master');
    }

    achievements.forEach(achievement => {
      if (!this.progress.achievements.includes(achievement)) {
        this.progress.achievements.push(achievement);
      }
    });
  }

  /**
   * Get progress
   */
  getProgress(): AbyssProgress {
    return { ...this.progress };
  }

  /**
   * Get all crossings
   */
  getCrossings(): AbyssCrossing[] {
    return [...this.crossings];
  }

  /**
   * Get crossing by ID
   */
  getCrossing(id: string): AbyssCrossing | undefined {
    return this.crossings.find(c => c.id === id);
  }

  /**
   * Get statistics
   */
  getStatistics(): {
    totalCycles: number;
    totalTools: number;
    totalBeauty: number;
    totalWisdom: number;
    abyssLevel: number;
    achievements: number;
  } {
    return {
      totalCycles: this.progress.cyclesCompleted,
      totalTools: this.progress.toolsCreated,
      totalBeauty: this.progress.beautyPoints,
      totalWisdom: this.progress.wisdomPoints,
      abyssLevel: this.progress.abyssLevel,
      achievements: this.progress.achievements.length
    };
  }
}

// Export singleton
export const abyssCrossingMechanics = new AbyssCrossingMechanics();

// Export for easy use
export default abyssCrossingMechanics;

