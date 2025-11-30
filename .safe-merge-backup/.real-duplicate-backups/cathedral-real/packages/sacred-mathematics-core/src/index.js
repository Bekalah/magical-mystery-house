"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SACRED_MATH = void 0;
exports.goldenRatioProportion = goldenRatioProportion;
exports.goldenRectangle = goldenRectangle;
exports.fibonacciSize = fibonacciSize;
exports.goldenSpiralPoint = goldenSpiralPoint;
exports.cathedralRatioProportion = cathedralRatioProportion;
exports.cathedralInverseProportion = cathedralInverseProportion;
exports.frequencyToConsciousnessLevel = frequencyToConsciousnessLevel;
exports.consciousnessLevelToFrequency = consciousnessLevelToFrequency;
exports.nodeToGateMapping = nodeToGateMapping;
exports.gateToNodeMapping = gateToNodeMapping;
exports.validateSacredMath = validateSacredMath;
exports.harmonicInterval = harmonicInterval;
exports.geometricMean = geometricMean;
exports.sacredProportion = sacredProportion;
/**
 * Sacred Mathematics Constants
 *
 * All constants used across Cathedral systems
 */
exports.SACRED_MATH = {
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
    FIBONACCI: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765],
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
    CODEX_RATIO: 144 / 99, // Open world exploration nodes - Consciousness evolution mapping - Sacred mathematics integration - Living egregore system
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
};
/**
 * Calculate golden ratio proportion
 */
function goldenRatioProportion(value) {
    return value * exports.SACRED_MATH.PHI_INVERSE;
}
/**
 * Calculate golden rectangle dimensions
 */
function goldenRectangle(width) {
    return {
        width: width,
        height: width * exports.SACRED_MATH.PHI_INVERSE
    };
}
/**
 * Calculate Fibonacci-based sizing
 */
function fibonacciSize(index) {
    if (index < 0 || index >= exports.SACRED_MATH.FIBONACCI.length) {
        return 1;
    }
    return exports.SACRED_MATH.FIBONACCI[index];
}
/**
 * Calculate golden spiral point
 */
function goldenSpiralPoint(angle, scale) {
    if (scale === void 0) { scale = 1; }
    var r = scale * Math.pow(exports.SACRED_MATH.PHI, angle / (Math.PI / 2));
    return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle)
    };
}
/**
 * Calculate 144:99 ratio proportion
 */
function cathedralRatioProportion(value) {
    return value * exports.SACRED_MATH.CATHEDRAL_RATIO;
}
/**
 * Calculate inverse 144:99 ratio proportion
 */
function cathedralInverseProportion(value) {
    return value * exports.SACRED_MATH.CATHEDRAL_INVERSE;
}
/**
 * Map frequency to consciousness level (0-21)
 */
function frequencyToConsciousnessLevel(frequency) {
    var solfeggioFreqs = Object.values(exports.SACRED_MATH.SOLFEGGIO);
    var minFreq = Math.min.apply(Math, solfeggioFreqs);
    var maxFreq = Math.max.apply(Math, solfeggioFreqs);
    // Normalize to 0-21
    var normalized = ((frequency - minFreq) / (maxFreq - minFreq)) * 21;
    return Math.round(Math.max(0, Math.min(21, normalized)));
}
/**
 * Map consciousness level (0-21) to frequency
 */
function consciousnessLevelToFrequency(level) {
    var solfeggioFreqs = Object.values(exports.SACRED_MATH.SOLFEGGIO);
    var minFreq = Math.min.apply(Math, solfeggioFreqs);
    var maxFreq = Math.max.apply(Math, solfeggioFreqs);
    // Map level 0-21 to frequency range
    var normalized = level / 21;
    return minFreq + (normalized * (maxFreq - minFreq));
}
/**
 * Calculate node-to-gate mapping (Codex 144:99 to Circuitum99)
 */
function nodeToGateMapping(nodeIndex) {
    // Primary gate: node % 99
    var primaryGate = (nodeIndex % 99) + 1;
    // Harmonic gate: using golden ratio
    var harmonicGate = Math.round((nodeIndex * exports.SACRED_MATH.PHI) % 99) + 1;
    // Spiral gate: using cathedral ratio
    var spiralGate = Math.round((nodeIndex * exports.SACRED_MATH.CATHEDRAL_RATIO) % 99) + 1;
    return {
        primaryGate: primaryGate,
        harmonicGate: harmonicGate,
        spiralGate: spiralGate
    };
}
/**
 * Calculate gate-to-node mapping (Circuitum99 to Codex 144:99)
 */
function gateToNodeMapping(gateIndex) {
    var nodes = [];
    // Find all nodes that map to this gate
    for (var node = 0; node < exports.SACRED_MATH.CODEX_NODES; node++) {
        var mapping = nodeToGateMapping(node);
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
function validateSacredMath(value, tolerance) {
    if (tolerance === void 0) { tolerance = 0.0001; }
    var matches = [];
    // Check against all constants
    Object.entries(exports.SACRED_MATH).forEach(function (_a) {
        var key = _a[0], constant = _a[1];
        if (typeof constant === 'number') {
            if (Math.abs(value - constant) < tolerance) {
                matches.push(key);
            }
        }
    });
    return {
        isValid: matches.length > 0,
        matches: matches
    };
}
/**
 * Calculate harmonic interval
 */
function harmonicInterval(freq1, freq2) {
    return freq2 / freq1;
}
/**
 * Calculate geometric mean
 */
function geometricMean(values) {
    if (values.length === 0)
        return 1;
    var product = values.reduce(function (acc, val) { return acc * val; }, 1);
    return Math.pow(product, 1 / values.length);
}
/**
 * Calculate sacred proportion
 */
function sacredProportion(value, ratio) {
    switch (ratio) {
        case 'phi':
            return value * exports.SACRED_MATH.PHI;
        case 'cathedral':
            return value * exports.SACRED_MATH.CATHEDRAL_RATIO;
        case 'sqrt2':
            return value * exports.SACRED_MATH.SQRT_2;
        case 'sqrt3':
            return value * exports.SACRED_MATH.SQRT_3;
        case 'sqrt5':
            return value * exports.SACRED_MATH.SQRT_5;
        default:
            return value;
    }
}
exports.default = exports.SACRED_MATH;
