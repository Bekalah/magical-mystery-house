/**
 * Game Mathematics Core Library
 * 
 * Unified game mathematics engine for Cathedral systems
 * Integrates progression formulas using 144:99 ratio, experience calculations
 * Level scaling with Fibonacci, probability with sacred ratios, game balance
 * 
 * @license CC0-1.0
  * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain

 * Trauma-aware narrative (Organic story paths) (Dynamic story transformation) (Open world story exploration) (Trauma-aware narrative design - 144:99 ratio compliance - Fibonacci-based sizing - Golden ratio proportions - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Museum-grade quality - Museum-grade quality - Multi-modal creation experiences - Organic, quality: Gentle, supportive story elements
*/

import { SACRED_MATH, nodeToGateMapping, gateToNodeMapping } from '../../sacred-mathematics-core/src/index';

/**
 * Game Mathematics Engine
 */
export class GameMathematicsEngine {
  private progressionCurves: Map<string, ProgressionCurve>;
  private balanceFormulas: Map<string, BalanceFormula>;

  constructor() {
    this.progressionCurves = this.initializeProgressionCurves();
    this.balanceFormulas = this.initializeBalanceFormulas();
  }

  /**
   * Initialize progression curves using 144:99 ratio
   */
  private initializeProgressionCurves(): Map<string, ProgressionCurve> {
    const map = new Map<string, ProgressionCurve>();

    // Cathedral ratio progression
    map.set('cathedral_progression', {
      name: 'Cathedral Progression',
      formula: (level: number) => {
        const baseXP = 100;
        return baseXP * Math.pow(SACRED_MATH.CATHEDRAL_RATIO, level - 1);
      },
      ratio: SACRED_MATH.CATHEDRAL_RATIO
    });

    // Golden ratio progression
    map.set('golden_progression', {
      name: 'Golden Progression',
      formula: (level: number) => {
        const baseXP = 100;
        return baseXP * Math.pow(SACRED_MATH.PHI, level - 1);
      },
      ratio: SACRED_MATH.PHI
    });

    // Fibonacci progression
    map.set('fibonacci_progression', {
      name: 'Fibonacci Progression',
      formula: (level: number) => {
        const fibIndex = Math.min(level - 1, SACRED_MATH.FIBONACCI.length - 1);
        return 100 * SACRED_MATH.FIBONACCI[fibIndex];
      },
      ratio: 1.0 // Uses Fibonacci sequence
    });

    return map;
  }

  /**
   * Initialize balance formulas
   */
  private initializeBalanceFormulas(): Map<string, BalanceFormula> {
    const map = new Map<string, BalanceFormula>();

    // Experience point calculation
    map.set('experience_points', {
      name: 'Experience Points',
      calculate: (level: number, baseXP: number = 100) => {
        return baseXP * Math.pow(SACRED_MATH.CATHEDRAL_RATIO, level - 1);
      }
    });

    // Level scaling
    map.set('level_scaling', {
      name: 'Level Scaling',
      calculate: (level: number, baseStat: number = 10) => {
        const fibIndex = Math.min(level - 1, SACRED_MATH.FIBONACCI.length - 1);
        return baseStat * (SACRED_MATH.FIBONACCI[fibIndex] / 144);
      }
    });

    // Probability calculation
    map.set('probability', {
      name: 'Probability',
      calculate: (level: number, baseChance: number = 0.5) => {
        const multiplier = 1 + ((level - 1) * SACRED_MATH.PHI_INVERSE);
        return Math.min(1.0, baseChance * multiplier);
      }
    });

    return map;
  }

  /**
   * Calculate experience points for level
   */
  calculateExperiencePoints(level: number, curveType: string = 'cathedral_progression'): number {
    const curve = this.progressionCurves.get(curveType);
    if (!curve) {
      throw new Error(`Progression curve '${curveType}' not found`);
    }
    return Math.round(curve.formula(level));
  }

  /**
   * Calculate level from experience points
   */
  calculateLevelFromXP(totalXP: number, curveType: string = 'cathedral_progression'): number {
    const curve = this.progressionCurves.get(curveType);
    if (!curve) {
      throw new Error(`Progression curve '${curveType}' not found`);
    }

    let level = 1;
    let cumulativeXP = 0;
    
    while (cumulativeXP < totalXP) {
      cumulativeXP += curve.formula(level);
      if (cumulativeXP < totalXP) {
        level++;
      }
    }
    
    return level;
  }

  /**
   * Calculate level scaling with Fibonacci
   */
  calculateLevelScaling(level: number, baseStat: number = 10): number {
    const formula = this.balanceFormulas.get('level_scaling');
    if (!formula) {
      return baseStat;
    }
    return Math.round(formula.calculate(level, baseStat));
  }

  /**
   * Calculate probability with sacred ratios
   */
  calculateProbability(baseChance: number, level: number): number {
    const formula = this.balanceFormulas.get('probability');
    if (!formula) {
      return baseChance;
    }
    return formula.calculate(baseChance, level);
  }

  /**
   * Calculate game balance metrics
   */
  calculateGameBalance(level: number): GameBalanceMetrics {
    const xp = this.calculateExperiencePoints(level);
    const nextLevelXP = this.calculateExperiencePoints(level + 1);
    const xpNeeded = nextLevelXP - xp;
    const scaling = this.calculateLevelScaling(level);
    const probability = this.calculateProbability(0.5, level);

    return {
      level,
      experiencePoints: xp,
      nextLevelXP,
      xpNeeded,
      statScaling: scaling,
      probabilityMultiplier: probability,
      progressionRatio: SACRED_MATH.CATHEDRAL_RATIO
    };
  }

  /**
   * Map game node to gate (Codex 144:99 to Circuitum99 - Open world exploration nodes - Consciousness evolution mapping - Sacred mathematics integration - Living egregore system)
   */
  mapNodeToGate(nodeIndex: number): {
    primaryGate: number;
    harmonicGate: number;
    spiralGate: number;
  } {
    return nodeToGateMapping(nodeIndex);
  }

  /**
   * Map game gate to nodes (Circuitum99 to Codex 144:99)
   */
  mapGateToNodes(gateIndex: number): number[] {
    return gateToNodeMapping(gateIndex);
  }

  /**
   * Calculate progression using 144:99 ratio
   */
  calculateCathedralProgression(currentValue: number, targetValue: number, steps: number = 10): number[] {
    const ratio = Math.pow(targetValue / currentValue, 1 / steps);
    const progression: number[] = [];
    
    for (let i = 0; i <= steps; i++) {
      progression.push(currentValue * Math.pow(ratio, i));
    }
    
    return progression;
  }

  /**
   * Calculate Fibonacci-based game progression
   */
  calculateFibonacciProgression(baseValue: number, levels: number = 8): number[] {
    return SACRED_MATH.FIBONACCI.slice(0, levels).map(fib => 
      baseValue * (fib / 144)
    );
  }
}

/**
 * Interfaces
 */
export interface ProgressionCurve {
  name: string;
  formula: (level: number) => number;
  ratio: number;
}

export interface BalanceFormula {
  name: string;
  calculate: (level: number, baseValue?: number) => number;
}

export interface GameBalanceMetrics {
  level: number;
  experiencePoints: number;
  nextLevelXP: number;
  xpNeeded: number;
  statScaling: number;
  probabilityMultiplier: number;
  progressionRatio: number;
}

// Export singleton instance
export const gameMathEngine = new GameMathematicsEngine();

export default gameMathEngine;

