/**
 * Sacred Mathematics Core Library
 *
 * Comprehensive sacred mathematics constants and functions
 * Used throughout all Cathedral systems
 *
 * @license CC0-1.0 - Public Domain
 * @author Rebecca Respawn
 */

/**
 * Sacred Mathematics Constants
 *
 * All constants used across Cathedral systems
 */
export const SACRED_MATH = {
  // Cathedral 144:99 Ratio (Signature)
  CATHEDRAL_RATIO: 144 / 99, // 1.4545454545454546
  CATHEDRAL_INVERSE: 99 / 144, // 0.6875
  CATHEDRAL_SQUARED: Math.pow(144 / 99, 2), // ~2.116
  // Golden Ratio (Phi)
  PHI: (1 + Math.sqrt(5)) / 2, // 1.618033988749895
  PHI_INVERSE: (Math.sqrt(5) - 1) / 2, // 0.6180339887498949
  PHI_SQUARED: Math.pow((1 + Math.sqrt(5)) / 2, 2), // ~2.618
  PHI_CUBED: Math.pow((1 + Math.sqrt(5)) / 2, 3), // ~4.236
  // Sacred Square Roots
  SQRT_2: Math.sqrt(2), // 1.4142135623730951
  SQRT_3: Math.sqrt(3), // 1.7320508075688772
  SQRT_5: Math.sqrt(5), // 2.23606797749979
  SQRT_7: Math.sqrt(7), // 2.6457513110645907
  SQRT_11: Math.sqrt(11), // 3.3166247903554
  // Pi and Tau
  PI: Math.PI, // 3.141592653589793
  TAU: Math.PI * 2, // 6.283185307179586
  PI_HALF: Math.PI / 2, // 1.5707963267948966
  // Fibonacci Sequence (first 20)
  FIBONACCI: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765] as const,
  // Solfeggio Frequencies (Hz)
  SOLFEGGIO: {
    UT: 396, // Liberation from fear
    RE: 417, // Undoing situations
    MI: 528, // Transformation/DNA repair
    FA: 639, // Connecting/relationships
    SOL: 741, // Awakening intuition
    LA: 852, // Returning to spiritual order
    SI: 963 // Divine consciousness
  },
  // Golden Angle (137.508 degrees in radians)
  GOLDEN_ANGLE: (Math.PI * 2) / ((1 + Math.sqrt(5)) / 2), // ~2.399963229728653
  // Sacred Ratios
  OCTAVE: 2.0,
  PERFECT_FIFTH: 1.5,
  PERFECT_FOURTH: 4 / 3, // ~1.333
  MAJOR_THIRD: 1.25,
  MINOR_THIRD: 1.2,
  // Consciousness Levels (0-21, Major Arcana)
  CONSCIOUSNESS_LEVELS: 22,
  // Codex Structure
  CODEX_NODES: 144,
  CODEX_DEPTHS: 99,
  CODEX_RATIO: 144 / 99,
  // Circuitum99 Structure
  CIRCUITUM_GATES: 99,
  CIRCUITUM_LATTICE: 144,
  CIRCUITUM_TOTAL: 243,
  // Stone Grimoire Structure
  GRIMOIRE_CHAPELS: 8,
  GRIMOIRE_FOLIOS: 144,
  FOLIOS_PER_CHAPEL: 18,
  // Mystery House Structure
  MYSTERY_ROOMS: 99
} as const;

/**
 * Calculate golden ratio proportion
 */
export function goldenRatioProportion(value: number): number {
  return value * SACRED_MATH.PHI_INVERSE;
}

/**
 * Calculate golden rectangle dimensions
 */
export function goldenRectangle(width: number): { width: number; height: number } {
  return {
    width: width,
    height: width * SACRED_MATH.PHI_INVERSE
  };
}

/**
 * Calculate Fibonacci-based sizing
 */
export function fibonacciSize(index: number): number {
  if (index < 0 || index >= SACRED_MATH.FIBONACCI.length) {
    return 1;
  }
  return SACRED_MATH.FIBONACCI[index];
}

/**
 * Calculate golden spiral point
 */
export function goldenSpiralPoint(angle: number, scale: number = 1): { x: number; y: number } {
  const r = scale * Math.pow(SACRED_MATH.PHI, angle / (Math.PI / 2));
  return {
    x: r * Math.cos(angle),
    y: r * Math.sin(angle)
  };
}

/**
 * Calculate 144:99 ratio proportion
 */
export function cathedralRatioProportion(value: number): number {
  return value * SACRED_MATH.CATHEDRAL_RATIO;
}

/**
 * Calculate inverse 144:99 ratio proportion
 */
export function cathedralInverseProportion(value: number): number {
  return value * SACRED_MATH.CATHEDRAL_INVERSE;
}

/**
 * Map frequency to consciousness level (0-21)
 */
export function frequencyToConsciousnessLevel(frequency: number): number {
  const solfeggioFreqs = Object.values(SACRED_MATH.SOLFEGGIO);
  const minFreq = Math.min(...solfeggioFreqs);
  const maxFreq = Math.max(...solfeggioFreqs);
  // Normalize to 0-21
  const normalized = ((frequency - minFreq) / (maxFreq - minFreq)) * 21;
  return Math.round(Math.max(0, Math.min(21, normalized)));
}

/**
 * Map consciousness level (0-21) to frequency
 */
export function consciousnessLevelToFrequency(level: number): number {
  const solfeggioFreqs = Object.values(SACRED_MATH.SOLFEGGIO);
  const minFreq = Math.min(...solfeggioFreqs);
  const maxFreq = Math.max(...solfeggioFreqs);
  // Map level 0-21 to frequency range
  const normalized = level / 21;
  return minFreq + (normalized * (maxFreq - minFreq));
}

/**
 * Calculate node-to-gate mapping (Codex 144:99 to Circuitum99)
 */
export function nodeToGateMapping(nodeIndex: number): {
  primaryGate: number;
  harmonicGate: number;
  spiralGate: number;
} {
  // Primary gate: node % 99
  const primaryGate = (nodeIndex % 99) + 1;
  // Harmonic gate: using golden ratio
  const harmonicGate = Math.round((nodeIndex * SACRED_MATH.PHI) % 99) + 1;
  // Spiral gate: using cathedral ratio
  const spiralGate = Math.round((nodeIndex * SACRED_MATH.CATHEDRAL_RATIO) % 99) + 1;
  return {
    primaryGate,
    harmonicGate,
    spiralGate
  };
}

/**
 * Calculate gate-to-node mapping (Circuitum99 to Codex 144:99)
 */
export function gateToNodeMapping(gateIndex: number): number[] {
  const nodes: number[] = [];
  // Find all nodes that map to this gate
  for (let node = 0; node < SACRED_MATH.CODEX_NODES; node++) {
    const mapping = nodeToGateMapping(node);
    if (mapping.primaryGate === gateIndex ||
        mapping.harmonicGate === gateIndex ||
        mapping.spiralGate === gateIndex) {
      nodes.push(node);
    }
  }
  return nodes;
}

/**
 * Validate sacred math compliance
 */
export function validateSacredMath(value: number, tolerance: number = 0.0001): {
  isValid: boolean;
  matches: string[];
} {
  const matches: string[] = [];
  // Check against all constants
  Object.entries(SACRED_MATH).forEach(([key, constant]) => {
    if (typeof constant === 'number') {
      if (Math.abs(value - constant) < tolerance) {
        matches.push(key);
      }
    }
  });
  return {
    isValid: matches.length > 0,
    matches
  };
}

/**
 * Calculate harmonic interval
 */
export function harmonicInterval(freq1: number, freq2: number): number {
  return freq2 / freq1;
}

/**
 * Calculate geometric mean
 */
export function geometricMean(values: number[]): number {
  if (values.length === 0) return 1;
  const product = values.reduce((acc, val) => acc * val, 1);
  return Math.pow(product, 1 / values.length);
}

/**
 * Calculate sacred proportion
 */
export function sacredProportion(value: number, ratio: 'phi' | 'cathedral' | 'sqrt2' | 'sqrt3' | 'sqrt5'): number {
  switch (ratio) {
    case 'phi':
      return value * SACRED_MATH.PHI;
    case 'cathedral':
      return value * SACRED_MATH.CATHEDRAL_RATIO;
    case 'sqrt2':
      return value * SACRED_MATH.SQRT_2;
    case 'sqrt3':
      return value * SACRED_MATH.SQRT_3;
    case 'sqrt5':
      return value * SACRED_MATH.SQRT_5;
    default:
      return value;
  }
}

export default SACRED_MATH;

