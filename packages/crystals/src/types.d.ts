/**
 * types.d
 * 
 * @package @cathedral/crystals
 */
/**
 * ⚗️ Crystal - The Principle
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
export interface Crystal {
    id: string;
    displayName: string;
    aliases?: string[];
    system: 'silicate' | 'oxide' | 'phosphate' | 'borate' | 'organic' | 'metal' | 'hybrid';
    hardnessMohs: number;
    densityGcm3?: number;
    refractiveIndex?: {
        min: number;
        max: number;
    };
    crystalSystem: 'cubic' | 'tetragonal' | 'orthorhombic' | 'hexagonal' | 'trigonal' | 'monoclinic' | 'triclinic' | 'amorphous';
    latticeGroup?: string;
    cleavage?: string;
    colorSpectrum: string[];
    dominantWavelengthNm?: number[];
    elementalResonance: string[];
    chakraAlignment?: string[];
    baseFrequenciesHz?: number[];
    piezoelectric?: boolean;
    luminescenceModes?: string[];
    inclusions?: string[];
    formationNotes?: string;
    synergyTags?: string[];
    mathematicalResonance?: {
        phiHarmonics?: number[];
        fibonacciIndices?: number[];
        latticePrimeFactors?: number[];
    };
    narrativeHook?: string;
}
/**
 * ⚗️ CrystalFusionSet - The Principle
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
export interface CrystalFusionSet {
    id: string;
    name: string;
    members: string[];
    purpose: string;
    synergyModel: {
        amplification: number;
        coherence: number;
        waveformBlend: Array<{
            base: string;
            weight: number;
        }>;
    };
    recommendedLayouts?: string[];
    lore?: string;
}
/**
 * ⚗️ ResonanceComputationResult - The Principle
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
export interface ResonanceComputationResult {
    compositeFrequency: number[];
    colorField: string[];
    phiScore: number;
    stability: number;
}
//# sourceMappingURL=types.d.ts.map
