/**
 * Music Performance - Real-time Performance Tools
 * 
 * Real-time performance features for Music Engine
 * Includes live synthesis, effects processing, and performance optimization
 * 
 * @license CC0-1.0 - Public Domain
 */

// Types available from MusicEngine if needed
// import type { MusicNode, RhythmPattern, TimbreProfile } from './MusicEngine';
import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

export interface PerformanceSettings {
  sampleRate: number;
  bufferSize: number;
  latency: number;
  sacredRatio: number;
}

export interface EffectChain {
  effects: Effect[];
  order: number[];
  sacredRatio: number;
}

export interface Effect {
  type: 'reverb' | 'delay' | 'chorus' | 'distortion' | 'filter' | 'sacred-geometry';
  parameters: Record<string, number>;
  consciousnessLevel: number;
}

/**
 * Music Performance Tools
 */
export class MusicPerformanceTools {
  private readonly GOLDEN_RATIO = SACRED_MATH.PHI;
  private readonly RATIO_144_99 = SACRED_MATH.CATHEDRAL_RATIO;
  private readonly FIBONACCI = SACRED_MATH.FIBONACCI;

  /**
   * Optimize performance settings
   */
  public optimizeSettings(consciousnessLevel: number): PerformanceSettings {
    // Sample rate based on consciousness (higher = better quality)
    const sampleRate = 44100 + (consciousnessLevel * 1000);
    
    // Buffer size using Fibonacci
    const fibIndex = consciousnessLevel % this.FIBONACCI.length;
    const bufferSize = this.FIBONACCI[fibIndex] * 64;
    
    // Latency calculation
    const latency = bufferSize / sampleRate;

    return {
      sampleRate: Math.min(96000, sampleRate),
      bufferSize: Math.min(4096, bufferSize),
      latency,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Generate effect chain
   */
  public generateEffectChain(consciousnessLevel: number): EffectChain {
    const effects: Effect[] = [];
    
    // Always include sacred geometry effect
    effects.push({
      type: 'sacred-geometry',
      parameters: {
        ratio: this.RATIO_144_99,
        goldenRatio: this.GOLDEN_RATIO,
        fibonacci: this.FIBONACCI[consciousnessLevel % this.FIBONACCI.length]
      },
      consciousnessLevel
    });

    // Add effects based on consciousness level
    if (consciousnessLevel >= 14) {
      effects.push({
        type: 'reverb',
        parameters: {
          roomSize: 0.8,
          damping: 0.5,
          wet: 0.3
        },
        consciousnessLevel
      });
    }
    
    if (consciousnessLevel >= 10) {
      effects.push({
        type: 'chorus',
        parameters: {
          rate: 1.5,
          depth: 0.3,
          feedback: 0.2
        },
        consciousnessLevel
      });
    }

    // Order effects using golden ratio
    const order = effects.map((_, i) => i).sort((a, b) => {
      return (a * this.GOLDEN_RATIO) % 1 - (b * this.GOLDEN_RATIO) % 1;
    });

    return {
      effects,
      order,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Calculate real-time performance metrics
   */
  public calculatePerformance(
    audioBuffer: Float32Array,
    _sampleRate: number
  ): {
    rms: number;
    peak: number;
    dynamicRange: number;
    sacredRatio: number;
  } {
    // Calculate RMS (Root Mean Square)
    let sumSquares = 0;
    let peak = 0;
    
    for (let i = 0; i < audioBuffer.length; i++) {
      const sample = Math.abs(audioBuffer[i]);
      sumSquares += sample * sample;
      peak = Math.max(peak, sample);
    }
    
    const rms = Math.sqrt(sumSquares / audioBuffer.length);
    const dynamicRange = peak > 0 ? 20 * Math.log10(peak / rms) : 0;

    return {
      rms,
      peak,
      dynamicRange,
      sacredRatio: this.RATIO_144_99
    };
  }
}

