/**
 * @license CC0-1.0 - Public Domain
 */

// Archetype frequency signatures and interference
export const archetypes = {
  creator: {
    colorWavelength: 450,
    soundFrequency: 528,
    harmonics: [1, 3, 5],
    element: 'water'
  },
  transformer: {
    colorWavelength: 590,
    soundFrequency: 417,
    harmonics: [1, 2, 4],
    element: 'fire'
  },
  preserver: {
    colorWavelength: 520,
    soundFrequency: 639,
    harmonics: [1, 2, 3],
    element: 'earth'
  }
};


export function archetypeInterference(
  arch1: { soundFrequency: number },
  arch2: { soundFrequency: number },
  time: number
) {
  const wave1 = Math.sin(2 * Math.PI * arch1.soundFrequency * time);
  const wave2 = Math.sin(2 * Math.PI * arch2.soundFrequency * time);
  return {
    constructive: wave1 + wave2,
    destructive: wave1 - wave2,
    beat: 2 * Math.cos(Math.PI * (arch1.soundFrequency - arch2.soundFrequency) * time)
  };
}
