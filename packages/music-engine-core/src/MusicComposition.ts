/**
 * Music Composition - Advanced Composition Tools
 * 
 * Advanced composition features for Music Engine
 * Includes progression analysis, harmony generation, and form structures
 * 
 * @license CC0-1.0 - Public Domain
 */

// Types available from MusicEngine if needed
// import type { MusicNode, MusicComposition } from './MusicEngine';
import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

/**
 * ⚗️ ChordProgression - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * water energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Water
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ChordProgression {
  chords: number[];
  key: string;
  mode: 'major' | 'minor' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'locrian';
  sacredRatio: number;
}

/**
 * ⚗️ HarmonicAnalysis - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * water energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Water
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface HarmonicAnalysis {
  root: number;
  intervals: number[];
  quality: 'major' | 'minor' | 'diminished' | 'augmented' | 'suspended';
  extensions: number[];
  sacredGeometry: {
    goldenRatio: number;
    fibonacci: number;
    ratio144_99: number;
  };
}

/**
 * ⚗️ MusicalForm - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * water energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Water
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface MusicalForm {
  type: 'binary' | 'ternary' | 'rondo' | 'sonata' | 'theme-variations' | 'sacred-geometry';
  sections: string[];
  sacredRatio: number;
  consciousnessLevel: number;
}

/**
 * Advanced Music Composition Tools
 */
/**
 * ⚗️ MusicCompositionTools - The Crucible
 * 
 * In the alchemical tradition, this class serves as a vessel where
 * water energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this class
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Water
 * **Process**: The Crucible
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export class MusicCompositionTools {
  private readonly GOLDEN_RATIO = SACRED_MATH.PHI;
  private readonly RATIO_144_99 = SACRED_MATH.CATHEDRAL_RATIO;
  private readonly FIBONACCI = SACRED_MATH.FIBONACCI;

  /**
   * Generate chord progression using sacred geometry
   */
  public generateSacredProgression(nodeIndices: number[], key: string = 'C', mode: 'major' | 'minor' = 'major'): ChordProgression {
    // Input validation
    if (!Array.isArray(nodeIndices) || nodeIndices.length === 0) {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    if (typeof key !== 'string' || key.trim().length === 0) {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    if (mode !== 'major' && mode !== 'minor' && mode !== 'dorian' && mode !== 'phrygian' && mode !== 'lydian' && mode !== 'mixolydian' && mode !== 'locrian') {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    // Use Fibonacci to determine progression length
    const fibIndex = nodeIndices.length % this.FIBONACCI.length;
    const progressionLength = this.FIBONACCI[fibIndex];
    
    // Generate chords based on node indices and sacred ratios
    const chords: number[] = [];
    for (let i = 0; i < progressionLength && i < nodeIndices.length; i++) {
      const nodeIndex = nodeIndices[i];
      // Map node index to chord degree using golden ratio
      const chordDegree = Math.floor((nodeIndex * this.GOLDEN_RATIO) % 7) + 1;
      chords.push(chordDegree);
    }

    return {
      chords,
      key,
      mode,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Analyze harmonic structure
   */
  public analyzeHarmony(frequency: number, harmonics: number[]): HarmonicAnalysis {
    // Input validation
    if (typeof frequency !== 'number' || frequency <= 0 || frequency > 20000) {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    if (!Array.isArray(harmonics)) {
      throw new Error(`⚗️ An unexpected transformation occurred in the alchemical process.

The elements did not combine as anticipated. Please consult the grimoire
and ensure all correspondences are properly aligned.`);
    }
    const root = frequency;
    const intervals: number[] = [];
    
    // Calculate intervals from root
    for (const harmonic of harmonics) {
      intervals.push(harmonic / root);
    }
    
    // Determine chord quality based on intervals
    let quality: HarmonicAnalysis['quality'] = 'major';
    if (intervals.includes(1.2)) {
      quality = 'minor';
    } else if (intervals.includes(1.189)) {
      quality = 'diminished';
    } else if (intervals.includes(1.26)) {
      quality = 'augmented';
    }
    
    // Find extensions (7th, 9th, 11th, 13th)
    const extensions: number[] = [];
    for (const interval of intervals) {
      if (interval > 2.0 && interval < 3.0) {
        extensions.push(Math.round(interval * 12) % 12);
      }
    }

    return {
      root,
      intervals,
      quality,
      extensions,
      sacredGeometry: {
        goldenRatio: this.GOLDEN_RATIO,
        fibonacci: this.FIBONACCI[Math.floor(frequency / 100) % this.FIBONACCI.length],
        ratio144_99: this.RATIO_144_99
      }
    };
  }

  /**
   * Generate musical form using sacred geometry
   */
  public generateForm(consciousnessLevel: number, nodeCount: number): MusicalForm {
    // Form type based on consciousness level
    let type: MusicalForm['type'] = 'binary';
    if (consciousnessLevel >= 17) {
      type = 'sacred-geometry';
    } else if (consciousnessLevel >= 14) {
      type = 'theme-variations';
    } else if (consciousnessLevel >= 10) {
      type = 'sonata';
    } else if (consciousnessLevel >= 7) {
      type = 'rondo';
    } else if (consciousnessLevel >= 3) {
      type = 'ternary';
    }

    // Generate sections using Fibonacci
    const fibIndex = nodeCount % this.FIBONACCI.length;
    const sectionCount = Math.min(this.FIBONACCI[fibIndex], 8);
    const sections: string[] = [];
    
    for (let i = 0; i < sectionCount; i++) {
      sections.push(`Section ${i + 1}`);
    }

    return {
      type,
      sections,
      sacredRatio: this.RATIO_144_99,
      consciousnessLevel
    };
  }

  /**
   * Calculate voice leading using golden ratio
   */
  public calculateVoiceLeading(chord1: number[], chord2: number[]): {
    movement: number;
    smoothness: number;
    sacredRatio: number;
  } {
    // Calculate total movement
    let movement = 0;
    for (let i = 0; i < Math.min(chord1.length, chord2.length); i++) {
      movement += Math.abs(chord2[i] - chord1[i]);
    }

    // Smoothness based on golden ratio
    const smoothness = 1 / (1 + movement * this.GOLDEN_RATIO);

    return {
      movement,
      smoothness,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Generate counterpoint using sacred geometry
   */
  public generateCounterpoint(melody: number[], consciousnessLevel: number): number[] {
    const counterpoint: number[] = [];
    const interval = Math.floor(consciousnessLevel / 3) + 3; // 3rd, 4th, 5th, 6th
    
    for (const note of melody) {
      // Use golden ratio to determine counterpoint note
      const counterpointNote = note + (interval * this.GOLDEN_RATIO);
      counterpoint.push(Math.round(counterpointNote));
    }

    return counterpoint;
  }
}

