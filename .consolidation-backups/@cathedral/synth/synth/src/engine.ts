// engine.ts - lightweight synthesis graph planner (placeholder Web Audio binding)
import { PatchDefinition, ChainGraphNode, RenderRequest } from './types';
import { patchLibrary } from './patchLibrary';

export class SynthEngine {
  private patches: Map<string, PatchDefinition> = new Map();

  constructor(seedPatches: PatchDefinition[] = patchLibrary) {
    seedPatches.forEach(p => this.patches.set(p.id, p));
  }

  listPatches() { return Array.from(this.patches.values()).map(p => ({ id: p.id, name: p.name })); }

  getPatch(id: string) { return this.patches.get(id) || null; }

  planGraph(patchId: string): ChainGraphNode[] | null {
    const p = this.getPatch(patchId);
    if (!p) return null;
    // future: topological sort / validation
    return p.graph;
  }

  render(req: RenderRequest) {
    const graph = this.planGraph(req.patchId);
    if (!graph) return { ok: false, error: 'PATCH_NOT_FOUND' } as const;
    // Placeholder: would instantiate Web Audio nodes, connect, schedule envelopes.
    return {
      ok: true as const,
      patchId: req.patchId,
      nodes: graph.length,
      duration: req.durationSeconds,
      estimatedVoices: graph.filter(n => n.kind === 'osc').length,
      note: 'Audio rendering not yet implemented—graph plan returned.'
    };
  }
}
