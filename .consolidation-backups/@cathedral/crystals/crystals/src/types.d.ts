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
export interface ResonanceComputationResult {
    compositeFrequency: number[];
    colorField: string[];
    phiScore: number;
    stability: number;
}
//# sourceMappingURL=types.d.ts.map