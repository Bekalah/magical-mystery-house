/**
 * Music Engine - Sacred Frequencies & Harmonic Synthesis
 * 
 * Integrates with Codex144 for consciousness-based music creation
 * Uses Solfeggio frequencies, sacred ratios, and harmonic mathematics
 * 
 * @license CC0-1.0 - Public Domain
 */

// Codex144Engine, CodexNode, and SACRED_MATH available if needed
// import { Codex144Engine } from '../../codex-144-99-core/src/index';
// import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

export interface MusicNode {
  nodeIndex: number;
  frequency: number;           // Solfeggio frequency (396-963 Hz)
  harmonic: number;            // Harmonic ratio
  chord: number[];             // Chord frequencies
  rhythm: RhythmPattern;
  timbre: TimbreProfile;
  consciousnessLevel: number;   // 0-21
  sacredRatio: number;         // Golden ratio, Fibonacci, etc.
}

export interface RhythmPattern {
  beats: number[];              // Beat positions (0-1)
  tempo: number;                // BPM
  timeSignature: [number, number]; // [beats, note value]
  polyrhythm?: number[];        // Polyrhythmic layers
}

export interface TimbreProfile {
  waveform: 'sine' | 'square' | 'sawtooth' | 'triangle' | 'complex';
  harmonics: number[];          // Harmonic amplitudes
  envelope: Envelope;
  filter: FilterSettings;
}

export interface Envelope {
  attack: number;   // 0-1 seconds
  decay: number;    // 0-1 seconds
  sustain: number;  // 0-1 amplitude
  release: number;  // 0-1 seconds
}

export interface FilterSettings {
  type: 'lowpass' | 'highpass' | 'bandpass' | 'notch';
  frequency: number;
  resonance: number;
}

export interface MusicComposition {
  nodes: MusicNode[];
  progression: number[];        // Node indices in sequence
  key: string;                   // Musical key
  mode: 'major' | 'minor' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'locrian';
  timeSignature: [number, number];
  tempo: number;
  sacredGeometry: {
    ratio: number;               // 144:99 ratio
    goldenRatio: number;         // 1.618
    fibonacci: number;           // Fibonacci sequence
  };
}

/**
 * Music Engine - Creates music from Codex144 nodes
 */
export class MusicEngine {
  // private codex144: Codex144Engine; // Available if needed
  // private compositions: Map<number, MusicComposition>; // Available if needed

  // Solfeggio frequencies (UT to SI)
  private readonly SOLFEGGIO_FREQUENCIES = {
    UT: 396,  // Liberation, releasing emotional patterns
    RE: 417,  // Facilitating change, undoing situations
    MI: 528,  // Transformation, miracles, DNA repair
    FA: 639,  // Connection, relationships
    SOL: 741, // Expression, solutions
    LA: 852,  // Intuition, awakening
    SI: 963   // Connection to source, oneness
  };

  // Sacred ratios for music
  private readonly SACRED_RATIOS = {
    goldenRatio: 1.618033988749895,
    fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
    perfectFifth: 1.5,
    perfectFourth: 1.3333333333333333,
    majorThird: 1.25,
    minorThird: 1.2
  };

  constructor() {
    // Codex144Engine and compositions available if needed
    // this.codex144 = new Codex144Engine();
    // this.compositions = new Map();
  }

  /**
   * Create music node from Codex144 node
   */
  public createMusicNode(nodeIndex: number): MusicNode {
    // Input validation
    if (typeof nodeIndex !== 'number' || nodeIndex < 0 || nodeIndex >= 144 || !Number.isInteger(nodeIndex)) {
      throw new Error(`Invalid nodeIndex: ${nodeIndex}. Must be an integer between 0 and 143.`);
    }
    
    // Codex144Engine may not have direct getNode method, create node data from index
    const consciousnessLevel = Math.floor((nodeIndex / 144) * 22);
    
    // Create codex node structure
    const codexNode = {
      nodeIndex,
      consciousnessLevel
    };

    // Map consciousness level to Solfeggio frequency
    const frequency = this.mapConsciousnessToFrequency(codexNode.consciousnessLevel);
    
    // Calculate harmonic based on node index and sacred ratios
    const harmonic = this.calculateHarmonic(nodeIndex, codexNode.consciousnessLevel);
    
    // Generate chord from frequency and harmonic
    const chord = this.generateChord(frequency, harmonic);
    
    // Create rhythm pattern based on node properties
    const rhythm = this.createRhythmPattern(nodeIndex, codexNode);
    
    // Create timbre profile
    const timbre = this.createTimbreProfile(nodeIndex, codexNode);

    return {
      nodeIndex,
      frequency,
      harmonic,
      chord,
      rhythm,
      timbre,
      consciousnessLevel: codexNode.consciousnessLevel,
      sacredRatio: this.calculateSacredRatio(nodeIndex)
    };
  }

  /**
   * Map consciousness level (0-21) to Solfeggio frequency
   */
  private mapConsciousnessToFrequency(consciousnessLevel: number): number {
    // Map 0-21 to 396-963 Hz range
    const frequencies = Object.values(this.SOLFEGGIO_FREQUENCIES);
    const index = Math.floor((consciousnessLevel / 21) * (frequencies.length - 1));
    return frequencies[index];
  }

  /**
   * Calculate harmonic ratio using sacred mathematics
   */
  private calculateHarmonic(nodeIndex: number, consciousnessLevel: number): number {
    // Use golden ratio and Fibonacci
    const phi = this.SACRED_RATIOS.goldenRatio;
    const fibIndex = nodeIndex % this.SACRED_RATIOS.fibonacci.length;
    const fibValue = this.SACRED_RATIOS.fibonacci[fibIndex];
    
    // Combine with consciousness level
    const baseHarmonic = 1 + (consciousnessLevel / 21) * 0.5;
    const sacredHarmonic = baseHarmonic * (phi / fibValue);
    
    return sacredHarmonic;
  }

  /**
   * Generate chord from root frequency and harmonic
   */
  private generateChord(rootFrequency: number, harmonic: number): number[] {
    const chord: number[] = [rootFrequency];
    
    // Add perfect fifth
    chord.push(rootFrequency * this.SACRED_RATIOS.perfectFifth);
    
    // Add major third
    chord.push(rootFrequency * this.SACRED_RATIOS.majorThird);
    
    // Add harmonic-based note
    chord.push(rootFrequency * harmonic);
    
    return chord.sort((a, b) => a - b);
  }

  /**
   * Create rhythm pattern based on node
   */
  private createRhythmPattern(nodeIndex: number, codexNode: { consciousnessLevel: number }): RhythmPattern {
    // Use node index to determine rhythm complexity
    const complexity = (nodeIndex % 8) + 1; // 1-8
    const beats: number[] = [];
    
    // Generate beats based on complexity
    for (let i = 0; i < complexity; i++) {
      beats.push(i / complexity);
    }
    
    // Tempo based on consciousness level (slower = higher consciousness)
    const tempo = 60 + (codexNode.consciousnessLevel * 5); // 60-165 BPM
    
    // Time signature based on sacred ratios
    const timeSignature: [number, number] = [4, 4]; // Default 4/4
    
    // Polyrhythm for complex nodes
    const polyrhythm = complexity > 4 ? [3, 4, 5] : undefined;
    
    return {
      beats,
      tempo,
      timeSignature,
      polyrhythm
    };
  }

  /**
   * Create timbre profile
   */
  private createTimbreProfile(nodeIndex: number, codexNode: { consciousnessLevel: number }): TimbreProfile {
    // Waveform based on node index
    const waveforms: TimbreProfile['waveform'][] = ['sine', 'square', 'sawtooth', 'triangle', 'complex'];
    const waveform = waveforms[nodeIndex % waveforms.length];
    
    // Harmonics based on consciousness level
    const harmonics: number[] = [];
    for (let i = 1; i <= 8; i++) {
      const amplitude = Math.pow(0.5, i) * (1 + codexNode.consciousnessLevel / 21);
      harmonics.push(amplitude);
    }
    
    // Envelope
    const envelope: Envelope = {
      attack: 0.1 + (codexNode.consciousnessLevel / 21) * 0.2,
      decay: 0.2,
      sustain: 0.7,
      release: 0.5 + (codexNode.consciousnessLevel / 21) * 0.5
    };
    
    // Filter
    const filter: FilterSettings = {
      type: 'lowpass',
      frequency: 2000 + (codexNode.consciousnessLevel / 21) * 4000,
      resonance: 0.5
    };
    
    return {
      waveform,
      harmonics,
      envelope,
      filter
    };
  }

  /**
   * Calculate sacred ratio for node
   */
  private calculateSacredRatio(nodeIndex: number): number {
    // Use 144:99 ratio
    const ratio144_99 = 144 / 99;
    
    // Combine with golden ratio
    const phi = this.SACRED_RATIOS.goldenRatio;
    
    // Fibonacci influence
    const fibIndex = nodeIndex % this.SACRED_RATIOS.fibonacci.length;
    const fibValue = this.SACRED_RATIOS.fibonacci[fibIndex];
    
    return (ratio144_99 * phi) / fibValue;
  }

  /**
   * Create composition from multiple nodes
   */
  public createComposition(nodeIndices: number[], key: string = 'C', mode: 'major' | 'minor' = 'major'): MusicComposition {
    // Input validation
    if (!Array.isArray(nodeIndices) || nodeIndices.length === 0) {
      throw new Error('nodeIndices must be a non-empty array');
    }
    if (nodeIndices.some(idx => typeof idx !== 'number' || idx < 0 || idx >= 144 || !Number.isInteger(idx))) {
      throw new Error('All nodeIndices must be integers between 0 and 143');
    }
    if (typeof key !== 'string' || key.trim().length === 0) {
      throw new Error('key must be a non-empty string');
    }
    if (mode !== 'major' && mode !== 'minor') {
      throw new Error('mode must be either "major" or "minor"');
    }
    const musicNodes = nodeIndices.map(index => this.createMusicNode(index));
    
    return {
      nodes: musicNodes,
      progression: nodeIndices,
      key,
      mode,
      timeSignature: [4, 4],
      tempo: 120,
      sacredGeometry: {
        ratio: 144 / 99,
        goldenRatio: this.SACRED_RATIOS.goldenRatio,
        fibonacci: this.SACRED_RATIOS.fibonacci[nodeIndices.length % this.SACRED_RATIOS.fibonacci.length]
      }
    };
  }

  /**
   * Generate audio data for composition
   */
  public generateAudio(composition: MusicComposition, duration: number = 10): Float32Array {
    // Input validation
    if (!composition || typeof composition !== 'object') {
      throw new Error('composition must be a MusicComposition object');
    }
    if (typeof duration !== 'number' || duration <= 0 || duration > 3600) {
      throw new Error('duration must be a positive number between 0 and 3600 seconds');
    }
    const sampleRate = 44100;
    const samples = duration * sampleRate;
    const audio = new Float32Array(samples);
    
    // Generate audio for each node in progression
    const nodeDuration = duration / composition.nodes.length;
    
    for (let i = 0; i < composition.nodes.length; i++) {
      const node = composition.nodes[i];
      const startSample = Math.floor(i * nodeDuration * sampleRate);
      const endSample = Math.floor((i + 1) * nodeDuration * sampleRate);
      
      // Generate waveform for this node
      for (let sample = startSample; sample < endSample && sample < samples; sample++) {
        const time = sample / sampleRate;
        const phase = 2 * Math.PI * node.frequency * time;
        
        // Generate based on waveform type
        let value = 0;
        switch (node.timbre.waveform) {
          case 'sine':
            value = Math.sin(phase);
            break;
          case 'square':
            value = Math.sign(Math.sin(phase));
            break;
          case 'sawtooth':
            value = 2 * ((phase / (2 * Math.PI)) % 1) - 1;
            break;
          case 'triangle':
            value = 2 * Math.abs(2 * ((phase / (2 * Math.PI)) % 1) - 1) - 1;
            break;
          case 'complex':
            // Add harmonics
            value = Math.sin(phase);
            for (let h = 2; h <= 8; h++) {
              value += node.timbre.harmonics[h - 1] * Math.sin(phase * h);
            }
            break;
        }
        
        // Apply envelope
        const envelopeValue = this.applyEnvelope(time - (startSample / sampleRate), nodeDuration, node.timbre.envelope);
        value *= envelopeValue;
        
        audio[sample] = value * 0.3; // Normalize
      }
    }
    
    return audio;
  }

  /**
   * Apply envelope to audio
   */
  private applyEnvelope(time: number, duration: number, envelope: Envelope): number {
    if (time < 0) return 0;
    if (time > duration) return 0;
    
    const env = envelope;
    const releaseStart = duration - env.release;
    
    if (time < env.attack) {
      // Attack phase
      return time / env.attack;
    } else if (time < env.attack + env.decay) {
      // Decay phase
      const decayProgress = (time - env.attack) / env.decay;
      return 1 - (decayProgress * (1 - env.sustain));
    } else if (time < releaseStart) {
      // Sustain phase
      return env.sustain;
    } else {
      // Release phase
      const releaseProgress = (time - releaseStart) / env.release;
      return env.sustain * (1 - releaseProgress);
    }
  }

  /**
   * Get all music nodes for a range
   */
  public getMusicNodes(startIndex: number = 0, endIndex: number = 143): MusicNode[] {
    const nodes: MusicNode[] = [];
    for (let i = startIndex; i <= endIndex && i <= 143; i++) {
      try {
        nodes.push(this.createMusicNode(i));
      } catch (e) {
        // Skip invalid nodes
      }
    }
    return nodes;
  }
}

