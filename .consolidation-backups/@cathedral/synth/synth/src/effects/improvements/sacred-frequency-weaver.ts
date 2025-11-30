/**
 * Sacred Frequency Weaver
 * 
 * Created from doubt: "The audio effects need more depth and healing quality"
 * Improvement: Create fractal-based sound frequencies that actually help
 * 
 * This is how visionary art is created - from doubt comes beauty.
 * 
 * @package @cathedral/synth
 */

export interface SacredFrequency {
  id: string;
  name: string;
  frequency: number; // Hz
  solfeggio: boolean;
  healing: string; // What it helps with
  fractal: {
    depth: number;
    harmonics: number;
    pattern: 'sine' | 'sawtooth' | 'fractal';
  };
}

export const SACRED_FREQUENCIES: SacredFrequency[] = [
  {
    id: 'liberation',
    name: 'Liberation Frequency',
    frequency: 396,
    solfeggio: true,
    healing: 'Releases fear, guilt, trauma',
    fractal: {
      depth: 3,
      harmonics: 2,
      pattern: 'fractal'
    }
  },
  {
    id: 'transformation',
    name: 'Transformation Frequency',
    frequency: 417,
    solfeggio: true,
    healing: 'Facilitates change, undoes situations',
    fractal: {
      depth: 4,
      harmonics: 3,
      pattern: 'fractal'
    }
  },
  {
    id: 'manifestation',
    name: 'Manifestation Frequency',
    frequency: 528,
    solfeggio: true,
    healing: 'Love, DNA repair, transformation',
    fractal: {
      depth: 5,
      harmonics: 4,
      pattern: 'fractal'
    }
  },
  {
    id: 'connection',
    name: 'Connection Frequency',
    frequency: 639,
    solfeggio: true,
    healing: 'Relationships, connection, harmony',
    fractal: {
      depth: 4,
      harmonics: 3,
      pattern: 'fractal'
    }
  },
  {
    id: 'expression',
    name: 'Expression Frequency',
    frequency: 741,
    solfeggio: true,
    healing: 'Expression, solutions, creativity',
    fractal: {
      depth: 5,
      harmonics: 4,
      pattern: 'fractal'
    }
  },
  {
    id: 'intuition',
    name: 'Intuition Frequency',
    frequency: 852,
    solfeggio: true,
    healing: 'Intuition, spiritual order',
    fractal: {
      depth: 6,
      harmonics: 5,
      pattern: 'fractal'
    }
  }
];

/**
 * Sacred Frequency Weaver
 * 
 * Creates fractal-based sound frequencies for healing and focus
 */
export class SacredFrequencyWeaver {
  private context: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.context = new AudioContext();
    }
  }

  /**
   * Play a sacred frequency
   */
  async playFrequency(frequencyId: string, duration: number = 300): Promise<void> {
    if (!this.context) {
      throw new Error('AudioContext not available');
    }

    const freq = SACRED_FREQUENCIES.find(f => f.id === frequencyId);
    if (!freq) {
      throw new Error(`Frequency ${frequencyId} not found`);
    }

    // Create fractal-based oscillator
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const fractalGain = this.context.createGain();

    // Base frequency
    oscillator.frequency.value = freq.frequency;
    oscillator.type = 'sine';

    // Add fractal harmonics
    for (let i = 1; i <= freq.fractal.harmonics; i++) {
      const harmonic = this.context.createOscillator();
      const harmonicGain = this.context.createGain();
      
      harmonic.frequency.value = freq.frequency * (i + 1);
      harmonic.type = 'sine';
      harmonicGain.gain.value = 1 / (i + 1) * 0.3; // Decreasing volume
      
      harmonic.connect(harmonicGain);
      harmonicGain.connect(gainNode);
      
      harmonic.start(this.context.currentTime);
      harmonic.stop(this.context.currentTime + duration);
    }

    // Envelope
    gainNode.gain.setValueAtTime(0, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, this.context.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0.3, this.context.currentTime + duration - 0.5);
    gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + duration);
  }

  /**
   * Create fractal soundscape
   */
  async createFractalSoundscape(
    frequencies: string[],
    duration: number = 600
  ): Promise<void> {
    // Play multiple frequencies in harmony
    frequencies.forEach((freqId, index) => {
      setTimeout(() => {
        this.playFrequency(freqId, duration);
      }, index * 100);
    });
  }

  /**
   * Get frequency by healing property
   */
  getFrequencyForHealing(healing: string): SacredFrequency | undefined {
    return SACRED_FREQUENCIES.find(f => 
      f.healing.toLowerCase().includes(healing.toLowerCase())
    );
  }

  /**
   * Get all frequencies
   */
  getAllFrequencies(): SacredFrequency[] {
    return [...SACRED_FREQUENCIES];
  }
}

// Export singleton
export const sacredFrequencyWeaver = new SacredFrequencyWeaver();

// Export for easy use
export default sacredFrequencyWeaver;

