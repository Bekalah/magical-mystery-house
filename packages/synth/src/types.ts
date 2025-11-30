/**
 * @license CC0-1.0 - Public Domain
 */

// types.ts - audio engine types
/**
 * ⚗️ OscillatorSpec - The Principle
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
export interface OscillatorSpec {
  id: string;
  type: OscillatorType | 'supersaw' | 'granular-cloud' | 'noise-pink' | 'noise-brown';
  detuneCents?: number;
  voices?: number;
  spread?: number; // stereo width factor
}

/**
 * ⚗️ FilterSpec - The Principle
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
export interface FilterSpec {
  id: string;
  type: BiquadFilterType | 'formant';
  frequency: number;
  q?: number;
  gain?: number;
  modulationId?: string; // LFO / envelope link
}

/**
 * ⚗️ EnvelopeSpec - The Principle
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
export interface EnvelopeSpec {
  id: string;
  attack: number; decay: number; sustain: number; release: number;
  curve?: 'linear' | 'exp' | 'log';
}

/**
 * ⚗️ LfoSpec - The Principle
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
export interface LfoSpec {
  id: string;
  shape: 'sine' | 'triangle' | 'saw' | 'square' | 'random-sample' | 'chaos';
  rateHz: number;
  depth: number;
  targetIds: string[];
  sync?: boolean;
}

/**
 * ⚗️ DistortionSpec - The Principle
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
export interface DistortionSpec {
  id: string;
  kind: 'waveshaper' | 'bitcrush' | 'saturation' | 'fold' | 'granular-fuzz';
  drive: number; // 0-1
  tone?: number; // high cut tilt
}

/**
 * ⚗️ ReverbSpec - The Principle
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
export interface ReverbSpec {
  id: string;
  space: 'cathedral' | 'underground' | 'plate' | 'drone-chamber' | 'void';
  mix: number; // 0-1
  preDelayMs?: number;
  decaySeconds?: number;
}

/**
 * ⚗️ ChainGraphNode - The Principle
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
export interface ChainGraphNode {
  id: string;
  kind: 'osc' | 'filter' | 'env' | 'lfo' | 'dist' | 'reverb' | 'out' | 'mixer';
  spec: any;
  inputs: string[];
}

/**
 * ⚗️ PatchDefinition - The Principle
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
export interface PatchDefinition {
  id: string;
  name: string;
  archetypeTag?: string;
  crystalRefs?: string[];
  description?: string;
  graph: ChainGraphNode[];
}

/**
 * ⚗️ RenderRequest - The Principle
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
export interface RenderRequest {
  patchId: string;
  durationSeconds: number;
  tempo?: number;
  seed?: number;
}
