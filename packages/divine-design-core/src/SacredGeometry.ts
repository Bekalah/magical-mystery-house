/**
 * 📐 Sacred Geometry in Design
 * 
 * Golden ratio, 144:99 ratio, Fibonacci, and sacred proportions
 * 
 * @license CC0-1.0 - Public Domain
 */

export const GOLDEN_RATIO = 1.618033988749895;
export const CATHEDRAL_RATIO = 144 / 99; // 1.454545...
export const FIBONACCI_SEQUENCE = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];

/**
 * Calculate dimensions using golden ratio
 */
/**
 * ⚗️ GoldenRatioDimensions - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function goldenRatioDimensions(base: number): { width: number; height: number } {
  return {
    width: base * GOLDEN_RATIO,
    height: base
  };
}

/**
 * Calculate dimensions using 144:99 Cathedral ratio
 */
/**
 * ⚗️ CathedralRatioDimensions - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function cathedralRatioDimensions(base: number): { width: number; height: number } {
  return {
    width: base * CATHEDRAL_RATIO,
    height: base
  };
}

/**
 * Get Fibonacci spacing scale
 */
/**
 * ⚗️ GetFibonacciSpacing - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getFibonacciSpacing(level: number): number {
  if (level < 0 || level >= FIBONACCI_SEQUENCE.length) {
    return FIBONACCI_SEQUENCE[FIBONACCI_SEQUENCE.length - 1];
  }
  return FIBONACCI_SEQUENCE[level];
}

/**
 * Sacred geometry shapes
 */
export enum SacredShape {
  CIRCLE = 'circle',       // Unity, completeness (Kether)
  TRIANGLE = 'triangle',   // Active force, fire (Chokmah)
  SQUARE = 'square',       // Stability, earth (Malkuth)
  HEXAGON = 'hexagon',     // Balance, harmony (Tiphareth)
  PENTAGON = 'pentagon',   // Divine proportion
  SPIRAL = 'spiral'        // Growth, evolution
}

/**
 * ⚗️ SacredShapeConfig - The Principle
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
export interface SacredShapeConfig {
  shape: SacredShape;
  meaning: string;
  sephirah: string;
  element: string;
  useCase: string[];
}

export const SACRED_SHAPES: Record<SacredShape, SacredShapeConfig> = {
  [SacredShape.CIRCLE]: {
    shape: SacredShape.CIRCLE,
    meaning: 'Unity, completeness, wholeness',
    sephirah: 'Kether',
    element: 'Aether',
    useCase: ['Icons', 'Buttons', 'Avatars', 'Unity elements']
  },
  [SacredShape.TRIANGLE]: {
    shape: SacredShape.TRIANGLE,
    meaning: 'Active force, fire, direction',
    sephirah: 'Chokmah',
    element: 'Fire',
    useCase: ['Alerts', 'Actions', 'Navigation', 'Active elements']
  },
  [SacredShape.SQUARE]: {
    shape: SacredShape.SQUARE,
    meaning: 'Stability, earth, foundation',
    sephirah: 'Malkuth',
    element: 'Earth',
    useCase: ['Cards', 'Containers', 'Grids', 'Stable elements']
  },
  [SacredShape.HEXAGON]: {
    shape: SacredShape.HEXAGON,
    meaning: 'Balance, harmony, efficiency',
    sephirah: 'Tiphareth',
    element: 'Air',
    useCase: ['Icons', 'Tiles', 'Networks', 'Balanced elements']
  },
  [SacredShape.PENTAGON]: {
    shape: SacredShape.PENTAGON,
    meaning: 'Divine proportion, golden ratio',
    sephirah: 'Tiphareth',
    element: 'Aether',
    useCase: ['Special icons', 'Decorative elements', 'Sacred patterns']
  },
  [SacredShape.SPIRAL]: {
    shape: SacredShape.SPIRAL,
    meaning: 'Growth, evolution, transformation',
    sephirah: 'All',
    element: 'All',
    useCase: ['Loading', 'Progress', 'Growth indicators', 'Evolution']
  }
};

/**
 * Generate sacred geometry pattern
 */
/**
 * ⚗️ GenerateSacredPattern - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function generateSacredPattern(
  shape: SacredShape,
  size: number,
  count: number = 1
): Array<{ x: number; y: number; size: number; shape: SacredShape }> {
  const pattern: Array<{ x: number; y: number; size: number; shape: SacredShape }> = [];
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = size * GOLDEN_RATIO;
    
    pattern.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: size / GOLDEN_RATIO,
      shape
    });
  }
  
  return pattern;
}

