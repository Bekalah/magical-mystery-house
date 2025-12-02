// patchLibrary.ts - archetype + crystal influenced patches
import { PatchDefinition } from './types';

export const patchLibrary: PatchDefinition[] = [
  {
    id: 'creator-spectral-bloom',
    name: 'Creator Spectral Bloom',
    archetypeTag: 'creator',
    crystalRefs: ['phenacite','herkimer'],
    description: 'Airy charged supersaw halo with phi-synced shimmer and deep polyrhythmic undertones.',
    graph: [
      { id: 'osc1', kind: 'osc', spec: { type: 'supersaw', voices: 7, spread: 0.7, detuneCents: 14 }, inputs: [] },
      { id: 'osc2', kind: 'osc', spec: { type: 'sine', detuneCents: -7 }, inputs: [] },
      { id: 'lfo-shimmer', kind: 'lfo', spec: { shape: 'triangle', rateHz: 1.618, depth: 0.3, targetIds: ['filter1'] }, inputs: [] },
      { id: 'filter1', kind: 'filter', spec: { type: 'lowpass', frequency: 1200, q: 18 }, inputs: ['osc1','osc2'] },
      { id: 'env-main', kind: 'env', spec: { attack: 0.9, decay: 2.2, sustain: 0.6, release: 3.4, curve: 'exp' }, inputs: [] },
      { id: 'dist1', kind: 'dist', spec: { kind: 'saturation', drive: 0.35, tone: 0.6 }, inputs: ['filter1'] },
      { id: 'reverb1', kind: 'reverb', spec: { space: 'cathedral', mix: 0.42, preDelayMs: 22, decaySeconds: 9 }, inputs: ['dist1'] },
      { id: 'out', kind: 'out', spec: {}, inputs: ['reverb1'] }
    ]
  },
  {
    id: 'transformer-rift-engine',
    name: 'Transformer Rift Engine',
    archetypeTag: 'transformer',
    crystalRefs: ['moldavite','herderite'],
    description: 'Tectonic mid-band tearing pulse with ritual polyrhythmic breath and granular haze.',
    graph: [
      { id: 'oscA', kind: 'osc', spec: { type: 'granular-cloud', voices: 3 }, inputs: [] },
      { id: 'oscB', kind: 'osc', spec: { type: 'noise-brown' }, inputs: [] },
      { id: 'lfo-rift', kind: 'lfo', spec: { shape: 'chaos', rateHz: 0.77, depth: 0.5, targetIds: ['filterA','distA'] }, inputs: [] },
      { id: 'filterA', kind: 'filter', spec: { type: 'bandpass', frequency: 680, q: 9 }, inputs: ['oscA','oscB'] },
      { id: 'env-slam', kind: 'env', spec: { attack: 0.02, decay: 0.6, sustain: 0.3, release: 0.8 }, inputs: [] },
      { id: 'distA', kind: 'dist', spec: { kind: 'fold', drive: 0.55 }, inputs: ['filterA'] },
      { id: 'reverbA', kind: 'reverb', spec: { space: 'underground', mix: 0.28, decaySeconds: 4.2 }, inputs: ['distA'] },
      { id: 'out', kind: 'out', spec: {}, inputs: ['reverbA'] }
    ]
  }
];
