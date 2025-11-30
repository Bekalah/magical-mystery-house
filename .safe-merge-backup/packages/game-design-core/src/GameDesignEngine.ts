/**
 * Game Design Engine - Interactive Experiences & RPG Mechanics
 * 
 * Creates game design frameworks from Codex144 nodes
 * Integrates RPG elements, interactive mechanics, and consciousness-based gameplay
 * 
 * @license CC0-1.0 - Public Domain
 */

// Codex144Engine available if needed
// import { Codex144Engine } from '../../codex-144-99-core/src/index';
// SACRED_MATH available if needed via imports

export interface GameNode {
  nodeIndex: number;
  gameMechanics: GameMechanic[];
  rpgElements: RPGElement[];
  interactionType: InteractionType;
  playStyle: PlayStyle;
  challengeLevel: number; // 0-10
  rewardStructure: RewardStructure;
  consciousnessLevel: number;
  sacredRatio: number;
}

export interface GameMechanic {
  name: string;
  type: 'exploration' | 'combat' | 'puzzle' | 'social' | 'creative' | 'narrative';
  complexity: number; // 0-10
  sacredGeometry: boolean;
  traumaAware: boolean;
}

export interface RPGElement {
  name: string;
  type: 'character' | 'quest' | 'item' | 'location' | 'ability' | 'story';
  consciousnessLevel: number;
  sacredRatio: number;
}

export type InteractionType = 'immersive-3d' | 'point-click' | 'text-based' | 'gesture' | 'voice' | 'multi-modal';
export type PlayStyle = 'open-world' | 'linear' | 'sandbox' | 'narrative-driven' | 'exploration-focused' | 'creative';

export interface RewardStructure {
  type: 'intrinsic' | 'extrinsic' | 'flow-state' | 'consciousness-evolution';
  rewards: string[];
  traumaAware: boolean;
}

export interface GameDesign {
  nodes: GameNode[];
  world: GameWorld;
  narrative: NarrativeStructure;
  sacredGeometry: {
    ratio: number;
    goldenRatio: number;
    fibonacci: number;
  };
}

export interface GameWorld {
  type: 'open-world' | 'procedural' | 'hand-crafted' | 'hybrid';
  size: number; // World size metric
  consciousnessMapping: boolean;
  sacredGeometry: boolean;
}

export interface NarrativeStructure {
  type: 'non-linear' | 'branching' | 'emergent' | 'procedural';
  consciousnessBased: boolean;
  traumaAware: boolean;
  sacredGeometry: boolean;
}

/**
 * Game Design Engine
 */
export class GameDesignEngine {
  // private codex144: Codex144Engine; // Available if needed
  // private designs: Map<number, GameDesign>; // Available if needed

  // Sacred ratios
  private readonly GOLDEN_RATIO = 1.618033988749895;
  private readonly RATIO_144_99 = 144 / 99;
  private readonly FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  // Game mechanics templates (used dynamically in generateGameMechanics)
  // These are reference templates, actual mechanics are generated per node
  
  // RPG elements templates (used dynamically in generateRPGElements)
  // These are reference templates, actual elements are generated per node

  constructor() {
    // this.codex144 = new Codex144Engine(); // Available if needed
    // this.designs = new Map(); // Available if needed
  }

  /**
   * Create game node from Codex144 node
   */
  public createGameNode(nodeIndex: number): GameNode {
    // Input validation
    if (typeof nodeIndex !== 'number' || nodeIndex < 0 || nodeIndex >= 144 || !Number.isInteger(nodeIndex)) {
      throw new Error(`Invalid nodeIndex: ${nodeIndex}. Must be an integer between 0 and 143.`);
    }
    
    // Codex144Engine may not have direct getNode method, create node data from index
    const consciousnessLevel = Math.floor((nodeIndex / 144) * 22);
    
    // Create codex node structure
    const codexNode = {
      nodeIndex,
      consciousnessLevel
    };

    // Generate game mechanics based on node
    const gameMechanics = this.generateGameMechanics(nodeIndex, codexNode);
    
    // Generate RPG elements
    const rpgElements = this.generateRPGElements(nodeIndex, codexNode);
    
    // Determine interaction type
    const interactionType = this.determineInteractionType(nodeIndex, codexNode);
    
    // Determine play style
    const playStyle = this.determinePlayStyle(nodeIndex, codexNode);
    
    // Calculate challenge level
    const challengeLevel = this.calculateChallengeLevel(nodeIndex, codexNode);
    
    // Create reward structure
    const rewardStructure = this.createRewardStructure(nodeIndex, codexNode);

    return {
      nodeIndex,
      gameMechanics,
      rpgElements,
      interactionType,
      playStyle,
      challengeLevel,
      rewardStructure,
      consciousnessLevel: codexNode.consciousnessLevel,
      sacredRatio: this.calculateSacredRatio(nodeIndex)
    };
  }

  /**
   * Generate game mechanics
   */
  private generateGameMechanics(_nodeIndex: number, codexNode: { consciousnessLevel: number }): GameMechanic[] {
    const mechanics: GameMechanic[] = [];
    
    // Always include exploration
    mechanics.push({
      name: 'Node Exploration',
      type: 'exploration',
      complexity: Math.floor(codexNode.consciousnessLevel / 2),
      sacredGeometry: true,
      traumaAware: true
    });
    
    // Add mechanics based on consciousness level
    if (codexNode.consciousnessLevel >= 7) {
      mechanics.push({
        name: 'Consciousness Mapping',
        type: 'narrative',
        complexity: codexNode.consciousnessLevel,
        sacredGeometry: true,
        traumaAware: true
      });
    }
    
    if (codexNode.consciousnessLevel >= 14) {
      mechanics.push({
        name: 'Sacred Geometry Puzzles',
        type: 'puzzle',
        complexity: 8,
        sacredGeometry: true,
        traumaAware: true
      });
    }
    
    if (codexNode.consciousnessLevel >= 17) {
      mechanics.push({
        name: 'Egregore Interaction',
        type: 'social',
        complexity: 9,
        sacredGeometry: true,
        traumaAware: true
      });
    }
    
    return mechanics;
  }

  /**
   * Generate RPG elements
   */
  private generateRPGElements(nodeIndex: number, codexNode: { consciousnessLevel: number }): RPGElement[] {
    const elements: RPGElement[] = [];
    
    // Character progression
    elements.push({
      name: `Consciousness Level ${codexNode.consciousnessLevel}`,
      type: 'character',
      consciousnessLevel: codexNode.consciousnessLevel,
      sacredRatio: this.RATIO_144_99
    });
    
    // Location
    elements.push({
      name: `Codex Node ${nodeIndex}`,
      type: 'location',
      consciousnessLevel: codexNode.consciousnessLevel,
      sacredRatio: this.RATIO_144_99
    });
    
    // Quest/Story
    if (codexNode.consciousnessLevel >= 10) {
      elements.push({
        name: `Node ${nodeIndex} Quest`,
        type: 'quest',
        consciousnessLevel: codexNode.consciousnessLevel,
        sacredRatio: this.RATIO_144_99
      });
    }
    
    // Ability
    if (codexNode.consciousnessLevel >= 14) {
      elements.push({
        name: `Sacred Geometry Pattern ${nodeIndex}`,
        type: 'ability',
        consciousnessLevel: codexNode.consciousnessLevel,
        sacredRatio: this.RATIO_144_99
      });
    }
    
    return elements;
  }

  /**
   * Determine interaction type
   */
  private determineInteractionType(_nodeIndex: number, codexNode: { consciousnessLevel: number }): InteractionType {
    if (codexNode.consciousnessLevel >= 17) {
      return 'multi-modal';
    } else if (codexNode.consciousnessLevel >= 14) {
      return 'immersive-3d';
    } else if (codexNode.consciousnessLevel >= 10) {
      return 'gesture';
    } else if (codexNode.consciousnessLevel >= 7) {
      return 'point-click';
    } else {
      return 'text-based';
    }
  }

  /**
   * Determine play style
   */
  private determinePlayStyle(_nodeIndex: number, codexNode: { consciousnessLevel: number }): PlayStyle {
    if (codexNode.consciousnessLevel >= 17) {
      return 'creative';
    } else if (codexNode.consciousnessLevel >= 14) {
      return 'exploration-focused';
    } else if (codexNode.consciousnessLevel >= 10) {
      return 'narrative-driven';
    } else if (codexNode.consciousnessLevel >= 7) {
      return 'sandbox';
    } else {
      return 'open-world';
    }
  }

  /**
   * Calculate challenge level
   */
  private calculateChallengeLevel(_nodeIndex: number, codexNode: { consciousnessLevel: number }): number {
    // Challenge increases with consciousness level, but capped at 10
    return Math.min(10, Math.floor(codexNode.consciousnessLevel / 2));
  }

  /**
   * Create reward structure
   */
  private createRewardStructure(_nodeIndex: number, codexNode: { consciousnessLevel: number }): RewardStructure {
    const rewards: string[] = [];
    
    if (codexNode.consciousnessLevel >= 14) {
      rewards.push('Consciousness evolution');
      rewards.push('Flow state achievement');
    } else if (codexNode.consciousnessLevel >= 10) {
      rewards.push('Node discovery');
      rewards.push('Sacred geometry pattern unlocked');
    } else {
      rewards.push('Exploration progress');
      rewards.push('Knowledge gained');
    }
    
    return {
      type: codexNode.consciousnessLevel >= 14 ? 'consciousness-evolution' : 'intrinsic',
      rewards,
      traumaAware: true
    };
  }

  /**
   * Calculate sacred ratio
   */
  private calculateSacredRatio(nodeIndex: number): number {
    const ratio144_99 = this.RATIO_144_99;
    const phi = this.GOLDEN_RATIO;
    const fibIndex = nodeIndex % this.FIBONACCI.length;
    const fibValue = this.FIBONACCI[fibIndex];
    
    return (ratio144_99 * phi) / fibValue;
  }

  /**
   * Create game design from multiple nodes
   */
  public createGameDesign(nodeIndices: number[], worldType: GameWorld['type'] = 'open-world'): GameDesign {
    const gameNodes = nodeIndices.map(index => this.createGameNode(index));
    
    const world: GameWorld = {
      type: worldType,
      size: nodeIndices.length * 100, // Scale with number of nodes
      consciousnessMapping: true,
      sacredGeometry: true
    };
    
    const narrative: NarrativeStructure = {
      type: 'non-linear',
      consciousnessBased: true,
      traumaAware: true,
      sacredGeometry: true
    };

    return {
      nodes: gameNodes,
      world,
      narrative,
      sacredGeometry: {
        ratio: this.RATIO_144_99,
        goldenRatio: this.GOLDEN_RATIO,
        fibonacci: this.FIBONACCI[nodeIndices.length % this.FIBONACCI.length]
      }
    };
  }

  /**
   * Get all game nodes for a range
   */
  public getGameNodes(startIndex: number = 0, endIndex: number = 143): GameNode[] {
    const nodes: GameNode[] = [];
    for (let i = startIndex; i <= endIndex && i <= 143; i++) {
      try {
        nodes.push(this.createGameNode(i));
      } catch (e) {
        // Skip invalid nodes
      }
    }
    return nodes;
  }
}

