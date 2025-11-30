/**
 * Sacred Mathematics Core Library
 *
 * Comprehensive sacred mathematics constants and functions
 * Used throughout all Cathedral systems
 *
 * @license CC0-1.0
  * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain

 * Trauma-aware narrative (Organic story paths) (Dynamic story transformation) (Open world story exploration) (Trauma-aware narrative design - 144:99 ratio compliance - Golden ratio proportions - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Museum-grade quality - Museum-grade quality - Multi-modal creation experiences - Organic, quality: Gentle, supportive story elements
*/
/**
 * Sacred Mathematics Constants
 *
 * All constants used across Cathedral systems
 */
export declare const SACRED_MATH: {
    readonly CATHEDRAL_RATIO: number;
    readonly CATHEDRAL_INVERSE: number;
    readonly CATHEDRAL_SQUARED: number;
    readonly PHI: number;
    readonly PHI_INVERSE: number;
    readonly PHI_SQUARED: number;
    readonly PHI_CUBED: number;
    readonly SQRT_2: number;
    readonly SQRT_3: number;
    readonly SQRT_5: number;
    readonly SQRT_7: number;
    readonly SQRT_11: number;
    readonly PI: number;
    readonly TAU: number;
    readonly PI_HALF: number;
    readonly FIBONACCI: readonly [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
    readonly SOLFEGGIO: {
        readonly UT: 396;
        readonly RE: 417;
        readonly MI: 528;
        readonly FA: 639;
        readonly SOL: 741;
        readonly LA: 852;
        readonly SI: 963;
    };
    readonly GOLDEN_ANGLE: number;
    readonly OCTAVE: 2;
    readonly PERFECT_FIFTH: 1.5;
    readonly PERFECT_FOURTH: number;
    readonly MAJOR_THIRD: 1.25;
    readonly MINOR_THIRD: 1.2;
    readonly CONSCIOUSNESS_LEVELS: 22;
    readonly CODEX_NODES: 144;
    readonly CODEX_DEPTHS: 99;
    readonly CODEX_RATIO: number;
    readonly CIRCUITUM_GATES: 99;
    readonly CIRCUITUM_LATTICE: 144;
    readonly CIRCUITUM_TOTAL: 243;
    readonly GRIMOIRE_CHAPELS: 8;
    readonly GRIMOIRE_FOLIOS: 144;
    readonly FOLIOS_PER_CHAPEL: 18;
    readonly MYSTERY_ROOMS: 99;
};
/**
 * Calculate golden ratio proportion
 */
export declare function goldenRatioProportion(value: number): number;
/**
 * Calculate golden rectangle dimensions
 */
export declare function goldenRectangle(width: number): {
    width: number;
    height: number;
};
/**
 * Calculate Fibonacci-based sizing
 */
export declare function fibonacciSize(index: number): number;
/**
 * Calculate golden spiral point
 */
export declare function goldenSpiralPoint(angle: number, scale?: number): {
    x: number;
    y: number;
};
/**
 * Calculate 144:99 ratio proportion
 */
export declare function cathedralRatioProportion(value: number): number;
/**
 * Calculate inverse 144:99 ratio proportion
 */
export declare function cathedralInverseProportion(value: number): number;
/**
 * Map frequency to consciousness level (0-21)
 */
export declare function frequencyToConsciousnessLevel(frequency: number): number;
/**
 * Map consciousness level (0-21) to frequency
 */
export declare function consciousnessLevelToFrequency(level: number): number;
/**
 * Calculate node-to-gate mapping (Codex 144:99 to Circuitum99)
 */
export declare function nodeToGateMapping(nodeIndex: number): {
    primaryGate: number;
    harmonicGate: number;
    spiralGate: number;
};
/**
 * Calculate gate-to-node mapping (Circuitum99 to Codex 144:99)
 */
export declare function gateToNodeMapping(gateIndex: number): number[];
/**
 * Validate sacred math compliance
 */
export declare function validateSacredMath(value: number, tolerance?: number): {
    isValid: boolean;
    matches: string[];
};
/**
 * Calculate harmonic interval
 */
export declare function harmonicInterval(freq1: number, freq2: number): number;
/**
 * Calculate geometric mean
 */
export declare function geometricMean(values: number[]): number;
/**
 * Calculate sacred proportion
 */
export declare function sacredProportion(value: number, ratio: 'phi' | 'cathedral' | 'sqrt2' | 'sqrt3' | 'sqrt5'): number;
export default SACRED_MATH;
//# sourceMappingURL=index.d.ts.map