/**
 * 🔊 Sound Connection to Body of God
 * 
 * Connects sound/audio systems to the Tree of Life
 * 
 * @license CC0-1.0 - Public Domain
 */

import { Sephirah, SEPHIROTH_TECH } from './Sephiroth';
import { Path, getPath } from './Paths';

/**
 * ⚗️ SoundSephirahMapping - The Principle
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
export interface SoundSephirahMapping {
  soundType: 'synthesis' | 'music' | 'audio' | 'vibration';
  sephirah: Sephirah;
  frequency: number; // Hz - sacred frequencies
  element: 'fire' | 'water' | 'air' | 'earth' | 'aether';
  purpose: string;
}

/**
 * ⚗️ Sound to Sephirah Mapping
 * 
 * Maps sound types to their corresponding sephiroth
 * Uses sacred frequencies and harmonic ratios
 */
export const SOUND_SEPHIROTH_MAP: SoundSephirahMapping[] = [
  {
    soundType: 'synthesis',
    sephirah: Sephirah.HOD,
    frequency: 432, // A4 in Hz (sacred tuning)
    element: 'water',
    purpose: 'Form creation through sound synthesis'
  },
  {
    soundType: 'music',
    sephirah: Sephirah.CHOKMAH,
    frequency: 528, // C5 in Hz (love frequency)
    element: 'fire',
    purpose: 'Creative force expressed through music'
  },
  {
    soundType: 'audio',
    sephirah: Sephirah.TIPHARETH,
    frequency: 396, // G4 in Hz (liberation frequency)
    element: 'air',
    purpose: 'Balanced harmony through audio'
  },
  {
    soundType: 'vibration',
    sephirah: Sephirah.YESOD,
    frequency: 741, // F#5 in Hz (expression frequency)
    element: 'air',
    purpose: 'Foundation vibration for all sound'
  }
];

/**
 * ⚗️ GenerateSoundForSephirah - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function generateSoundForSephirah(
  sephirah: Sephirah,
  options?: {
    duration?: number;
    amplitude?: number;
    waveform?: 'sine' | 'square' | 'sawtooth' | 'triangle';
  }
): {
  sound: SoundSephirahMapping;
  sephirahTech: typeof SEPHIROTH_TECH[Sephirah];
  path: ReturnType<typeof getPath>;
  config: {
    frequency: number;
    duration: number;
    amplitude: number;
    waveform: string;
    element: string;
  };
} {
  const mapping = SOUND_SEPHIROTH_MAP.find(m => m.sephirah === sephirah) || 
    SOUND_SEPHIROTH_MAP[0];
  
  const sephirahTech = SEPHIROTH_TECH[sephirah];
  const path = getPath(Sephirah.KETHER, sephirah);
  
  return {
    sound: mapping,
    sephirahTech,
    path,
    config: {
      frequency: mapping.frequency,
      duration: options?.duration || 1.618, // Golden ratio seconds
      amplitude: options?.amplitude || 0.5,
      waveform: options?.waveform || 'sine',
      element: mapping.element
    }
  };
}

/**
 * ⚗️ ConnectSoundToBodyOfGod - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function connectSoundToBodyOfGod(soundData: {
  type: string;
  frequency?: number;
  element?: string;
}): {
  sephirah: Sephirah;
  connection: {
    energyFlow: string;
    transformation: string;
    frequency: number;
  };
} {
  // Map sound type to sephirah
  let sephirah: Sephirah = Sephirah.HOD; // Default to sound
  
  if (soundData.type.includes('music') || soundData.type.includes('creative')) {
    sephirah = Sephirah.CHOKMAH;
  } else if (soundData.type.includes('synthesis') || soundData.type.includes('form')) {
    sephirah = Sephirah.HOD;
  } else if (soundData.type.includes('balance') || soundData.type.includes('harmony')) {
    sephirah = Sephirah.TIPHARETH;
  } else if (soundData.type.includes('foundation') || soundData.type.includes('vibration')) {
    sephirah = Sephirah.YESOD;
  }
  
  const sephirahTech = SEPHIROTH_TECH[sephirah];
  const mapping = SOUND_SEPHIROTH_MAP.find(m => m.sephirah === sephirah) || 
    SOUND_SEPHIROTH_MAP[0];
  
  return {
    sephirah,
    connection: {
      energyFlow: sephirahTech.energyType,
      transformation: `${sephirahTech.name} transforms sound into ${sephirahTech.techRole}`,
      frequency: mapping.frequency
    }
  };
}

