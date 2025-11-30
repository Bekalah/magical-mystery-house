/**
 * @license CC0-1.0 - Public Domain
 */

// integration.ts - future hooks bridging crystals & archetypes to synth parameters
import { patchLibrary } from './patchLibrary';

// To prevent cross-project circular TS reference issues we accept injectable helpers
// from the crystals package rather than importing directly here.
export interface FusionHelpers {
  listFusionSets: () => Array<{ id: string; name: string }>;
  computeFusionResonance: (id: string) => any;
}

export function mapFusionToPatchModifiers(fusionId: string, helpers: FusionHelpers) {
  const fusion = helpers.listFusionSets().find(f => f.id === fusionId);
  if (!fusion) return null;
  const resonance = helpers.computeFusionResonance(fusionId);
  if (!resonance) return null;
  // Map phiScore & stability into modulation shaping suggestions
  return {
    suggestedLfoRate: Number((resonance.phiScore * 2 + 0.5).toFixed(3)),
    suggestedReverbMix: Math.min(0.85, 0.2 + resonance.stability * 0.6),
    colorField: resonance.colorField,
    patchCandidates: patchLibrary.slice(0,3).map(p => p.id)
  };
}
