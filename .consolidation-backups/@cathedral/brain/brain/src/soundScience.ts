// SoundScience: harmonic series, binaural beats, pythagorean intervals
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
