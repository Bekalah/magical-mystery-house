/**
 * @license CC0-1.0 - Public Domain
 */

// SoundScience: harmonic series, binaural beats, pythagorean intervals
/**
 * ⚗️ SoundScience - The Crucible
 * 
 * In the alchemical tradition, this class serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this class
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Crucible
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export class SoundScience {
  harmonicSeries(fundamental: number, numHarmonics = 8) {
    return Array.from({length: numHarmonics}, (_, i) => ({
      frequency: fundamental * (i+1),
      amplitude: 1/(i+1),
      phase: 0
    }));
  }
  binauralBeat(carrierFreq: number, beatFreq: number) {
    return {
      left: carrierFreq,
      right: carrierFreq + beatFreq
    };
  }
  pythagoreanIntervals() {
    return {
      unison: 1/1,
      minorSecond: 256/243,
      majorSecond: 9/8,
      minorThird: 32/27,
      majorThird: 81/64,
      perfectFourth: 4/3,
      tritone: 729/512,
      perfectFifth: 3/2,
      minorSixth: 128/81,
      majorSixth: 27/16,
      minorSeventh: 16/9,
      majorSeventh: 243/128,
      octave: 2/1
    };
  }
}
