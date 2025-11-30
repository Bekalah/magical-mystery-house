/**
 * @license CC0-1.0 - Public Domain
 */

// integration.ts - future hooks bridging crystals & archetypes to synth parameters
import { patchLibrary } from './patchLibrary';

// To prevent cross-project circular TS reference issues we accept injectable helpers
// from the crystals package rather than importing directly here.
/**
 * ⚗️ FusionHelpers - The Principle
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
export interface FusionHelpers {
  listFusionSets: () => Array<{ id: string; name: string }>;
  computeFusionResonance: (id: string) => any;
}

/**
 * ⚗️ MapFusionToPatchModifiers - Solve et Coagula
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
