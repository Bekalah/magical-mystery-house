/**
 * types
 * 
 * @package @cathedral/crystals
 */
// types.ts - domain types for crystal intelligence
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
  densityGcm3?: number; // physical density
  refractiveIndex?: { min: number; max: number };
  crystalSystem: 'cubic' | 'tetragonal' | 'orthorhombic' | 'hexagonal' | 'trigonal' | 'monoclinic' | 'triclinic' | 'amorphous';
  latticeGroup?: string; // e.g. space group symbol
  cleavage?: string;
  colorSpectrum: string[]; // hex colors capturing core band
  dominantWavelengthNm?: number[]; // spectral emission/absorption approximations
  elementalResonance: string[]; // metaphysical element set (air, fire, water, earth, aether, plasma, void)
  chakraAlignment?: string[]; // optional energetic mapping
  baseFrequenciesHz?: number[]; // commonly cited energetic frequencies
  piezoelectric?: boolean;
  luminescenceModes?: string[];
  inclusions?: string[]; // notable inclusions or growth patterns
  formationNotes?: string;
  synergyTags?: string[]; // classifier tags for fusion algorithms
  mathematicalResonance?: {
    phiHarmonics?: number[]; // golden ratio scaled intervals
    fibonacciIndices?: number[]; // indexes used
    latticePrimeFactors?: number[]; // prime decomposition highlights
  };
  narrativeHook?: string; // short lore fragment for Codex use
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
  members: string[]; // crystal ids
  purpose: string;
  synergyModel: {
    amplification: number; // 1.0 baseline
    coherence: number; // 0-1 normalized pattern stability
    waveformBlend: Array<{ base: string; weight: number }>; // blend recipe
  };
  recommendedLayouts?: string[]; // sacred geometry grids (e.g. vesica, merkaba, dodecahedron)
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
  compositeFrequency: number[]; // merged frequency stack
  colorField: string[]; // emergent color set
  phiScore: number; // 0-1 how aligned to golden proportion structures
  stability: number; // 0-1 predicted coherence
  aiLore?: string; // AI-generated metaphysical description
}
