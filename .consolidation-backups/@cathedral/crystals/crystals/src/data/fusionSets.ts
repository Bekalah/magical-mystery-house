// fusionSets.ts - composite resonance groupings
import { CrystalFusionSet } from '../types';

export const fusionSets: CrystalFusionSet[] = [
  {
    id: 'super-seven',
    name: 'Super Seven (Melody Stone)',
    members: [
      'amethyst','cacoxenite','goethite','lepidocrocite','quartz','rutile','smoky-quartz'
    ],
    purpose: 'Multidimensional synchronization and layered field bridging',
    synergyModel: {
      amplification: 2.4,
      coherence: 0.82,
      waveformBlend: [
        { base: 'quartz', weight: 0.22 },
        { base: 'amethyst', weight: 0.18 },
        { base: 'rutile', weight: 0.14 },
        { base: 'lepidocrocite', weight: 0.12 },
        { base: 'goethite', weight: 0.11 },
        { base: 'cacoxenite', weight: 0.11 },
        { base: 'smoky-quartz', weight: 0.12 }
      ]
    },
    recommendedLayouts: ['merkaba-matrix','heptagon-wave-shell'],
    lore: 'Sevenfold resonance braid—anchors harmonic stratification and field intelligence layering.'
  },
  {
    id: 'ascension-12',
    name: 'Ascension Twelve Core Set',
    members: [
      'phenacite','herderite','herkimer','moldavite','danburite','scolecite','aegirine','tanzanite','blue-kyanite','apophyllite','labradorite','celestite'
    ],
    purpose: 'Structural uplift, neurogrid refinement, transpersonal linking',
    synergyModel: {
      amplification: 3.1,
      coherence: 0.77,
      waveformBlend: [
        { base: 'phenacite', weight: 0.11 },
        { base: 'herderite', weight: 0.09 },
        { base: 'herkimer', weight: 0.1 },
        { base: 'moldavite', weight: 0.095 },
        { base: 'danburite', weight: 0.09 },
        { base: 'scolecite', weight: 0.07 },
        { base: 'aegirine', weight: 0.07 },
        { base: 'tanzanite', weight: 0.08 },
        { base: 'blue-kyanite', weight: 0.07 },
        { base: 'apophyllite', weight: 0.065 },
        { base: 'labradorite', weight: 0.08 },
        { base: 'celestite', weight: 0.07 }
      ]
    },
    recommendedLayouts: ['dodecahedron-core','12-ray-wheel','crown-flower'],
    lore: 'Twelve-stream ascension engine—stages layered calibration of cognition, etheric bandwidth, and harmonic translation.'
  }
];
