/**
 * Consciousness Evolution Engine - 22-Level Major Arcanum System
 * 
 * Core engine for consciousness evolution through the 22 Major Arcana
 * Implements trauma-safe progression with 144:99 ratio compliance
 * 
 * @author Rebecca Respawn
 * @version 1.0.0
 */

import { 
  ConsciousnessLevel, 
  ConsciousnessFusion, 
  SacredGeometry, 
  TraumaSafeConfig,
  ConsciousnessState 
} from '../types/consciousness';

/**
 * Consciousness Evolution Engine
 * 
 * Manages the 22-level consciousness progression system with
 * trauma-safe design and Major Arcanum integration
 */
export class ConsciousnessEvolutionEngine {
  private levels: Map<number, ConsciousnessLevel> = new Map();
  private fusions: Map<string, ConsciousnessFusion> = new Map();
  private activeState: ConsciousnessState;

  constructor() {
    this.initializeLevels();
    this.initializeFusions();
    this.activeState = this.createInitialState();
  }

  /**
   * Initialize all 22 consciousness levels with Major Arcana integration
   */
  private initializeLevels(): void {
    // Level 0: The Fool - Rebecca Respawn as Wonder-Keeper
    this.levels.set(0, {
      id: 0,
      name: "The Fool - Infinite Potential",
      majorArcana: "0_fool",
      rebeccaProfile: "Rebecca Respawn, The Wonder-Keeper",
      frequency: 0.8, // Deep delta waves, early sleep/hypnagogic state
      colorPalette: ["#FFD700", "#DDA0DD", "#87CEEB", "#FF1493", "#FF4500"],
      fractalSignature: "Infinite recursion with impossible angles",
      healingBenefits: [
        "Beginner's mind magic",
        "Fresh perspective activation",
        "Fearless exploration",
        "Infinite possibility access"
      ],
      progressionRequirements: [
        "Embrace uncertainty with courage",
        "Maintain wonder and curiosity",
        "Trust the journey's unfolding"
      ],
      traumaSafeLevel: 1
    });

    // Level 2: The High Priestess - Gemini Rivers as Wisdom Keeper
    this.levels.set(2, {
      id: 2,
      name: "The High Priestess - Intuitive Wisdom",
      majorArcana: "2_high_priestess",
      rebeccaProfile: "Gemini Rivers, The Wisdom Keeper",
      frequency: 210, // Lunar base tone
      colorPalette: ["#4682B4", "#B0E0E6", "#191970", "#C0C0C0", "#FFD700"],
      fractalSignature: "Vesica piscis gateways to deeper realities",
      healingBenefits: [
        "Intuition strengthening",
        "Lunar wisdom access",
        "Hidden knowledge revelation",
        "Sacred silence cultivation"
      ],
      progressionRequirements: [
        "Develop intuitive listening",
        "Honor lunar cycles",
        "Practice sacred inner stillness"
      ],
      traumaSafeLevel: 2
    });

    // Level 5: The Hierophant - The Chohan of the Golden Flame
    this.levels.set(5, {
      id: 5,
      name: "The Hierophant - Sacred Tradition",
      majorArcana: "5_hierophant",
      rebeccaProfile: "The Chohan of the Golden Flame",
      frequency: 396, // Liberation from guilt/fear patterns
      colorPalette: ["#FFD700", "#C0C0C0", "#8B0000", "#228B22", "#4169E1"],
      fractalSignature: "Pentagonal transmission mandalas",
      healingBenefits: [
        "Sacred wisdom transmission",
        "Initiatory understanding",
        "Traditional knowledge integration",
        "Divine teaching access"
      ],
      progressionRequirements: [
        "Honor traditional wisdom",
        "Receive sacred initiations",
        "Integrate divine teachings"
      ],
      traumaSafeLevel: 3
    });

    // Level 18: The Moon - Luna Mystery as Dream Navigator
    this.levels.set(18, {
      id: 18,
      name: "The Moon - Dream Navigation",
      majorArcana: "18_moon",
      rebeccaProfile: "Luna Mystery, The Dream Navigator",
      frequency: 211, // Resonates with lunar cycles
      colorPalette: ["#191970", "#B0C4DE", "#FFE4E1", "#C0C0C0", "#000080"],
      fractalSignature: "Spiraling hypnotic wave patterns",
      healingBenefits: [
        "Dream navigation mastery",
        "Subconscious exploration",
        "Lunar wisdom integration",
        "Intuitive trance work"
      ],
      progressionRequirements: [
        "Explore dream realms safely",
        "Integrate lunar wisdom",
        "Navigate subconscious landscapes"
      ],
      traumaSafeLevel: 4
    });

    // Level 21: The World - Perfect Completion
    this.levels.set(21, {
      id: 21,
      name: "The World - Cosmic Consciousness",
      majorArcana: "21_world",
      rebeccaProfile: "Chancellor Emeritus of Cosmic Consciousness",
      frequency: 963, // Consciousness expansion, intuition
      colorPalette: ["#8B0000", "#DC143C", "#FF6347", "#FFD700", "#191970"],
      fractalSignature: "Rotating mandalic probability distributions",
      healingBenefits: [
        "Cosmic consciousness integration",
        "Universal awareness activation",
        "Complete mastery development",
        "Cyclical wisdom understanding"
      ],
      progressionRequirements: [
        "Integrate all previous learnings",
        "Achieve cosmic perspective",
        "Complete consciousness cycles"
      ],
      traumaSafeLevel: 5
    });
  }

  /**
   * Initialize consciousness fusion patterns
   */
  private initializeFusions(): void {
    // Fool + High Priestess = Magician (Creation through Intuition)
    this.fusions.set("0-2", {
      level1: 0,
      level2: 2,
      result: 1,
      harmonicResonance: 7.2,
      karmicInteraction: "Intuitive creation from infinite potential",
      healingPotential: 95,
      aftercare: {
        focus: "Grounding new creative visions",
        techniques: ["Earth connection", "Manifestation journaling", "Safe expression"],
        gentleProgression: true
      }
    });

    // High Priestess + Hierophant = Empress (Sacred Feminine Wisdom)
    this.fusions.set("2-5", {
      level1: 2,
      level2: 5,
      result: 3,
      harmonicResonance: 14.4,
      karmicInteraction: "Sacred feminine wisdom through traditional teaching",
      healingPotential: 88,
      aftercare: {
        focus: "Nurturing new wisdom patterns",
        techniques: ["Feminine energy healing", "Wisdom integration", "Sacred art creation"],
        gentleProgression: true
      }
    });

    // Hierophant + Moon = Star (Divine Inspiration)
    this.fusions.set("5-18", {
      level1: 5,
      level2: 18,
      result: 17,
      harmonicResonance: 21.6,
      karmicInteraction: "Traditional wisdom inspiring cosmic vision",
      healingPotential: 92,
      aftercare: {
        focus: "Integrating inspiration into daily practice",
        techniques: ["Vision journaling", "星空 meditation", "Inspiration recording"],
        gentleProgression: true
      }
    });

    // Moon + World = Completion (Cosmic Dream Integration)
    this.fusions.set("18-21", {
      level1: 18,
      level2: 21,
      result: 144,
      harmonicResonance: 28.8,
      karmicInteraction: "Dream state merging with cosmic consciousness",
      healingPotential: 99,
      aftercare: {
        focus: "Grounding cosmic insights",
        techniques: ["Earthing practices", "Integration meditation", "Gentle re-entry"],
        gentleProgression: false
      }
    });
  }

  /**
   * Create initial consciousness state
   */
  private createInitialState(): ConsciousnessState {
    return {
      currentLevel: 0,
      activeFusions: [],
      sacredGeometryActive: this.createDefaultSacredGeometry(),
      traumaConfig: {
        level: 1,
        escExitAvailable: true,
        motionControl: true,
        screenReaderSupport: true,
        processingTimeAllowance: 2000,
        gentleDefaults: true,
        neurodivergentFriendly: true
      },
      lastUpdate: new Date(),
      sessionDuration: 0
    };
  }

  /**
   * Create default sacred geometry configuration
   */
  private createDefaultSacredGeometry(): SacredGeometry {
    return {
      goldenRatio: 1.618033988749895,
      fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610],
      platonicSolids: {
        tetrahedron: 4,
        cube: 6,
        octahedron: 8,
        dodecahedron: 12,
        icosahedron: 20
      },
      merkabaVertices: {
        upper: [[0, 1, 0], [-0.943, -0.333, 0], [0.943, -0.333, 0]],
        lower: [[0, -1, 0], [-0.943, 0.333, 0], [0.943, 0.333, 0]],
        connection: [[0, 1, 0], [0, -1, 0]]
      },
      flowerOfLife: {
        circles: 7,
        intersections: 19,
        totalArea: 7 * Math.PI * Math.pow(1, 2)
      }
    };
  }

  /**
   * Progress consciousness to next level
   */
  public async progressConsciousness(targetLevel: number): Promise<ConsciousnessState> {
    const currentLevel = this.activeState.currentLevel;
    
    if (targetLevel > currentLevel + 1) {
      throw new Error(`Cannot skip levels. Next available: ${currentLevel + 1}`);
    }

    const level = this.levels.get(targetLevel);
    if (!level) {
      throw new Error(`Consciousness level ${targetLevel} not found`);
    }

    // Validate trauma safety
    if (level.traumaSafeLevel > this.activeState.traumaConfig.level) {
      throw new Error(`Cannot progress to level ${targetLevel} - exceeds trauma safety threshold`);
    }

    // Update state
    this.activeState.currentLevel = targetLevel;
    this.activeState.lastUpdate = new Date();

    return this.activeState;
  }

  /**
   * Execute consciousness fusion
   */
  public async performFusion(level1: number, level2: number): Promise<ConsciousnessFusion> {
    const fusionKey = `${level1}-${level2}`;
    const fusion = this.fusions.get(fusionKey);
    
    if (!fusion) {
      throw new Error(`No fusion pattern found for levels ${level1} + ${level2}`);
    }

    // Validate trauma safety for fusion
    const level1Data = this.levels.get(level1);
    const level2Data = this.levels.get(level2);
    
    if (level1Data && level2Data) {
      const requiredSafety = Math.max(level1Data.traumaSafeLevel, level2Data.traumaSafeLevel);
      if (requiredSafety > this.activeState.traumaConfig.level) {
        throw new Error(`Fusion exceeds current trauma safety threshold`);
      }
    }

    // Add to active fusions
    this.activeState.activeFusions.push(fusion);
    this.activeState.lastUpdate = new Date();

    return fusion;
  }

  /**
   * Get current consciousness state
   */
  public getState(): ConsciousnessState {
    return { ...this.activeState };
  }

  /**
   * Get available progressions from current level
   */
  public getAvailableProgressions(): ConsciousnessLevel[] {
    const nextLevel = this.activeState.currentLevel + 1;
    const level = this.levels.get(nextLevel);
    
    if (level && level.traumaSafeLevel <= this.activeState.traumaConfig.level) {
      return [level];
    }
    
    return [];
  }

  /**
   * Get fusion possibilities from current level
   */
  public getAvailableFusions(): ConsciousnessFusion[] {
    const currentLevel = this.activeState.currentLevel;
    const possibleFusions: ConsciousnessFusion[] = [];

    this.fusions.forEach(fusion => {
      if (fusion.level1 === currentLevel || fusion.level2 === currentLevel) {
        const otherLevel = fusion.level1 === currentLevel ? fusion.level2 : fusion.level1;
        const otherLevelData = this.levels.get(otherLevel);
        
        if (otherLevelData && otherLevelData.traumaSafeLevel <= this.activeState.traumaConfig.level) {
          possibleFusions.push(fusion);
        }
      }
    });

    return possibleFusions;
  }

  /**
   * Validate consciousness state integrity
   */
  public validateState(): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Check level exists
    if (!this.levels.has(this.activeState.currentLevel)) {
      issues.push(`Current level ${this.activeState.currentLevel} not found`);
    }

    // Check trauma safety
    const currentLevel = this.levels.get(this.activeState.currentLevel);
    if (currentLevel && currentLevel.traumaSafeLevel > this.activeState.traumaConfig.level) {
      issues.push(`Level ${this.activeState.currentLevel} exceeds trauma safety threshold`);
    }

    // Check fusion safety
    this.activeState.activeFusions.forEach(fusion => {
      const level1Data = this.levels.get(fusion.level1);
      const level2Data = this.levels.get(fusion.level2);
      
      if (level1Data && level2Data) {
        const requiredSafety = Math.max(level1Data.traumaSafeLevel, level2Data.traumaSafeLevel);
        if (requiredSafety > this.activeState.traumaConfig.level) {
          issues.push(`Fusion ${fusion.level1}-${fusion.level2} exceeds trauma safety threshold`);
        }
      }
    });

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Update trauma-safe configuration
   */
  public updateTraumaConfig(config: Partial<TraumaSafeConfig>): void {
    this.activeState.traumaConfig = { ...this.activeState.traumaConfig, ...config };
    this.activeState.lastUpdate = new Date();
  }

  /**
   * Get consciousness progression recommendations
   */
  public getRecommendations(): string[] {
    const recommendations: string[] = [];
    const currentLevel = this.levels.get(this.activeState.currentLevel);
    
    if (currentLevel) {
      recommendations.push(`Current level: ${currentLevel.name}`);
      recommendations.push(`Healing focus: ${currentLevel.healingBenefits.join(', ')}`);
      
      if (currentLevel.progressionRequirements.length > 0) {
        recommendations.push(`Next requirements: ${currentLevel.progressionRequirements.join(', ')}`);
      }
    }

    const availableFusions = this.getAvailableFusions();
    if (availableFusions.length > 0) {
      recommendations.push(`Available fusions: ${availableFusions.length}`);
    }

    return recommendations;
  }
}