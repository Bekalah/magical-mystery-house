// types.ts - audio engine types
export interface OscillatorSpec {
  id: string;
  type: OscillatorType | 'supersaw' | 'granular-cloud' | 'noise-pink' | 'noise-brown';
  detuneCents?: number;
  voices?: number;
  spread?: number; // stereo width factor
}

export interface FilterSpec {
  id: string;
  type: BiquadFilterType | 'formant';
  frequency: number;
  q?: number;
  gain?: number;
  modulationId?: string; // LFO / envelope link
}

export interface EnvelopeSpec {
  id: string;
  attack: number; decay: number; sustain: number; release: number;
  curve?: 'linear' | 'exp' | 'log';
}

export interface LfoSpec {
  id: string;
  shape: 'sine' | 'triangle' | 'saw' | 'square' | 'random-sample' | 'chaos';
  rateHz: number;
  depth: number;
  targetIds: string[];
  sync?: boolean;
}

export interface DistortionSpec {
  id: string;
  kind: 'waveshaper' | 'bitcrush' | 'saturation' | 'fold' | 'granular-fuzz';
  drive: number; // 0-1
  tone?: number; // high cut tilt
}

export interface ReverbSpec {
  id: string;
  space: 'cathedral' | 'underground' | 'plate' | 'drone-chamber' | 'void';
  mix: number; // 0-1
  preDelayMs?: number;
  decaySeconds?: number;
}

export interface ChainGraphNode {
  id: string;
  kind: 'osc' | 'filter' | 'env' | 'lfo' | 'dist' | 'reverb' | 'out' | 'mixer';
  spec: any;
  inputs: string[];
}

export interface PatchDefinition {
  id: string;
  name: string;
  archetypeTag?: string;
  crystalRefs?: string[];
  description?: string;
  graph: ChainGraphNode[];
}

export interface RenderRequest {
  patchId: string;
  durationSeconds: number;
  tempo?: number;
  seed?: number;
}
