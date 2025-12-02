// packages/codex-144-99/src/engine.ts
// Canonical ONLINE Codex 144:99 engine for this monorepo.
//
// Design:
// - Mirrors the authoritative offline engine at (external/codex-144-99/src/core/Codex144Engine.ts:1)
//   and the PERSONAL_WORK_MANIFEST.md (openspec/secure-rules/PERSONAL_WORK_MANIFEST.md:1).
// - Implements a modular, data-driven core using codex14499-lattice.json as the single source of truth.
// - Provides stable, typed APIs for consumers: web apps, Godot bridges, design tools, plugin system, etc.
// - Excludes "AI-occult" narrative, MLM/therapy voice, or unverifiable claims.
// - Keeps all mystical/theoretical content as structured data with provenance,
//   so it can be audited, replaced, or expanded cleanly.
//
// This file is intentionally lean, professional, and integration-focused.

import latticeJson from './data/codex14499-lattice.json';
import type {
  CodexNode,
  CodexLattice,
  GeometryProfile,
  ColorProfile,
  SoundProfile,
  CrystalProfile,
  ArchetypeProfile,
} from './types';

// Load and validate lattice at module init.
// Any issues should be caught in CI and surfaced clearly to developers.

const lattice: CodexLattice = latticeJson as CodexLattice;

// Basic integrity check (non-throwing; detailed validation via validateCodex()).
const hasAnyNodes =
  Array.isArray(lattice.primary_nodes) && lattice.primary_nodes.length > 0 &&
  Array.isArray(lattice.gateway_nodes) && lattice.gateway_nodes.length > 0;

/**
 * Lookup helpers
 */

/**
 * ⚗️ FindNode - Solve et Coagula
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
function findNode(id: string): CodexNode | undefined {
  return (
    lattice.primary_nodes.find((n) => n.id === id) ||
    lattice.gateway_nodes.find((n) => n.id === id)
  );
}

/**
 * ⚗️ FindGeometry - Solve et Coagula
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
function findGeometry(id: string): GeometryProfile | undefined {
  return lattice.geometry_profiles?.find((g) => g.id === id);
}

/**
 * ⚗️ FindColor - Solve et Coagula
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
function findColor(id: string): ColorProfile | undefined {
  return lattice.color_profiles?.find((c) => c.id === id);
}

/**
 * ⚗️ FindSound - Solve et Coagula
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
function findSound(id: string): SoundProfile | undefined {
  return lattice.sound_profiles?.find((s) => s.id === id);
}

/**
 * ⚗️ FindCrystal - Solve et Coagula
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
function findCrystal(id: string): CrystalProfile | undefined {
  return lattice.crystal_profiles?.find((c) => c.id === id);
}

/**
 * ⚗️ FindArchetype - Solve et Coagula
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
function findArchetype(id: string): ArchetypeProfile | undefined {
  return lattice.archetype_profiles?.find((a) => a.id === id);
}

/**
 * Public Engine API
 *
 * This is the contract other packages rely on.
 * Keep these surfaces stable and additive.
 */

/**
 * ⚗️ GetCodexLattice - Solve et Coagula
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
export function getCodexLattice(): CodexLattice {
  return lattice;
}

/**
 * ⚗️ GetNode - Solve et Coagula
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
export function getNode(id: string): CodexNode | undefined {
  return findNode(id);
}

/**
 * ⚗️ GetAllNodes - Solve et Coagula
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
export function getAllNodes(): CodexNode[] {
  return [...lattice.primary_nodes, ...lattice.gateway_nodes];
}

/**
 * ⚗️ ResolveSymbol - Solve et Coagula
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
export function resolveSymbol(symbol: {
  node_id?: string;
  geometry_profile_id?: string;
  color_profile_id?: string;
  sound_profile_id?: string;
  crystal_profile_id?: string;
  archetype_profile_id?: string;
}) {
  const node = symbol.node_id ? findNode(symbol.node_id) : undefined;

  const geometryId =
    symbol.geometry_profile_id ?? node?.vector_profile_ids.geometry_profile_id;
  const colorId =
    symbol.color_profile_id ?? node?.vector_profile_ids.color_profile_id;
  const soundId =
    symbol.sound_profile_id ?? node?.vector_profile_ids.sound_profile_id;
  const crystalId =
    symbol.crystal_profile_id ?? node?.vector_profile_ids.crystal_profile_id;
  const archetypeId =
    symbol.archetype_profile_id ?? node?.vector_profile_ids.archetype_profile_id;

  const geometry = geometryId ? findGeometry(geometryId) : undefined;
  const color = colorId ? findColor(colorId) : undefined;
  const sound = soundId ? findSound(soundId) : undefined;
  const crystal = crystalId ? findCrystal(crystalId) : undefined;
  const archetype = archetypeId ? findArchetype(archetypeId) : undefined;

  return {
    node,
    geometry,
    color,
    sound,
    crystal,
    archetype,
  };
}

/**
 * Neighborhood/query helpers
 */

/**
 * ⚗️ LatticeNeighborhoodOptions - The Principle
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
export interface LatticeNeighborhoodOptions {
  ringRadius?: number;
}

/**
 * ⚗️ LatticeNeighborhood - Solve et Coagula
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
export function latticeNeighborhood(
  centerId: string,
  options: LatticeNeighborhoodOptions = {},
): CodexNode[] {
  const center = findNode(centerId);
  if (!center) return [];

  const { ringRadius = 0 } = options;
  if (ringRadius <= 0 || !center.coordinates) return [center];

  const { ring: centerRing } = center.coordinates;

  return getAllNodes().filter((node) => {
    if (!node.coordinates || node.id === center.id) return false;
    const dr = Math.abs((node.coordinates.ring ?? 0) - (centerRing ?? 0));
    return dr <= ringRadius;
  });
}

/**
 * Palette helper, for UI/design tools.
 * Deterministic: uses lattice color profiles only.
 */

/**
 * ⚗️ SamplePalette - Solve et Coagula
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
export function samplePalette(nodeId: string): string[] {
  const node = findNode(nodeId);
  if (!node) return [];

  const colorId = node.vector_profile_ids.color_profile_id;
  const colorProfile = colorId ? findColor(colorId) : undefined;
  return colorProfile?.colors ?? [];
}

/**
 * Export mappings for consumers
 */

/**
 * ⚗️ ExportForGodot - Solve et Coagula
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
export function exportForGodot() {
  // Minimal, transport-safe payload for Godot integrations.
  return {
    version: lattice.version,
    nodes: getAllNodes().map((n) => ({
      id: n.id,
      kind: n.kind,
      label: n.label,
      coordinates: n.coordinates,
      vector_profile_ids: n.vector_profile_ids,
    })),
  };
}

/**
 * ⚗️ ExportForSPIRIT - Solve et Coagula
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
export function exportForSPIRIT() {
  // For shader/audio/visual engines.
  return {
    sound_profiles: lattice.sound_profiles,
    crystal_profiles: lattice.crystal_profiles,
    geometry_profiles: lattice.geometry_profiles,
    color_profiles: lattice.color_profiles,
  };
}

/**
 * ⚗️ ExportForCircuitum99 - Solve et Coagula
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
export function exportForCircuitum99() {
  // For lodge-map and navigation engines.
  return {
    nodes: getAllNodes().map((n) => ({
      id: n.id,
      label: n.label,
      circuitum99_ids: n.references.circuitum99_ids ?? [],
    })),
  };
}

/**
 * ⚗️ ExportForLiberArcanae - Solve et Coagula
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
export function exportForLiberArcanae() {
  // For tarot/arcana engines.
  return {
    nodes: getAllNodes().map((n) => ({
      id: n.id,
      label: n.label,
      liber_arcanae_ids: n.references.liber_arcanae_ids ?? [],
      archetype_profile_id: n.vector_profile_ids.archetype_profile_id,
    })),
    archetype_profiles: lattice.archetype_profiles,
  };
}

/**
 * ⚗️ ExportForCosmogenesis - Solve et Coagula
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
export function exportForCosmogenesis() {
  // For cosmogenesis-learning-engine and similar tools.
  return {
    version: lattice.version,
    nodes: getAllNodes(),
    geometry_profiles: lattice.geometry_profiles,
    color_profiles: lattice.color_profiles,
    sound_profiles: lattice.sound_profiles,
    crystal_profiles: lattice.crystal_profiles,
    archetype_profiles: lattice.archetype_profiles,
  };
}

/**
 * Validation / audit
 *
 * Used to confirm that online data matches the expectations from the offline manifest.
 */

/**
 * ⚗️ CodexValidationIssue - The Principle
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
export interface CodexValidationIssue {
  level: 'error' | 'warning';
  message: string;
  context?: Record<string, unknown>;
}

/**
 * ⚗️ CodexValidationReport - The Principle
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
export interface CodexValidationReport {
  ok: boolean;
  issues: CodexValidationIssue[];
  summary: {
    total_nodes: number;
    primary_nodes: number;
    gateway_nodes: number;
    geometry_profiles: number;
    color_profiles: number;
    sound_profiles: number;
    crystal_profiles: number;
    archetype_profiles: number;
  };
}

/**
 * ⚗️ ValidateCodex - Solve et Coagula
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
export function validateCodex(): CodexValidationReport {
  const issues: CodexValidationIssue[] = [];

  const all = getAllNodes();
  const primaryCount = lattice.primary_nodes.length;
  const gatewayCount = lattice.gateway_nodes.length;

  if (!hasAnyNodes) {
    issues.push({
      level: 'error',
      message: 'No Codex 144:99 nodes loaded. Populate codex14499-lattice.json from offline canonical data.',
    });
  }

  // Example expectations from manifest/spec:
  // - 144 manifestation + 99 gateway nodes in completed state.
  // We do NOT hard-fail if not reached; we record as warnings so the repo can be built incrementally.

  if (all.length < 2) {
    issues.push({
      level: 'warning',
      message:
        'Codex lattice contains only bootstrap nodes. Sync from external/codex-144-99 and PERSONAL_WORK_MANIFEST canonical datasets.',
      context: { total_nodes: all.length },
    });
  }

  // Basic ID uniqueness
  const idSet = new Set<string>();
  for (const node of all) {
    if (idSet.has(node.id)) {
      issues.push({
        level: 'error',
        message: `Duplicate node id detected: ${node.id}`,
      });
    }
    idSet.add(node.id);
  }

  // Ensure profile references resolve
  for (const node of all) {
    const vp = node.vector_profile_ids;
    if (vp.geometry_profile_id && !findGeometry(vp.geometry_profile_id)) {
      issues.push({
        level: 'error',
        message: `Missing geometry profile for node ${node.id}`,
        context: { geometry_profile_id: vp.geometry_profile_id },
      });
    }
    if (vp.color_profile_id && !findColor(vp.color_profile_id)) {
      issues.push({
        level: 'error',
        message: `Missing color profile for node ${node.id}`,
        context: { color_profile_id: vp.color_profile_id },
      });
    }
    if (vp.sound_profile_id && !findSound(vp.sound_profile_id)) {
      issues.push({
        level: 'error',
        message: `Missing sound profile for node ${node.id}`,
        context: { sound_profile_id: vp.sound_profile_id },
      });
    }
    if (vp.crystal_profile_id && !findCrystal(vp.crystal_profile_id)) {
      issues.push({
        level: 'error',
        message: `Missing crystal profile for node ${node.id}`,
        context: { crystal_profile_id: vp.crystal_profile_id },
      });
    }
    if (vp.archetype_profile_id && !findArchetype(vp.archetype_profile_id)) {
      issues.push({
        level: 'warning',
        message: `Missing archetype profile for node ${node.id}`,
        context: { archetype_profile_id: vp.archetype_profile_id },
      });
    }
  }

  return {
    ok: issues.every((i) => i.level !== 'error'),
    issues,
    summary: {
      total_nodes: all.length,
      primary_nodes: primaryCount,
      gateway_nodes: gatewayCount,
      geometry_profiles: lattice.geometry_profiles?.length ?? 0,
      color_profiles: lattice.color_profiles?.length ?? 0,
      sound_profiles: lattice.sound_profiles?.length ?? 0,
      crystal_profiles: lattice.crystal_profiles?.length ?? 0,
      archetype_profiles: lattice.archetype_profiles?.length ?? 0,
    },
  };
}

/**
 * Human-readable status for dashboards / health checks.
 */
/**
 * ⚗️ GenerateReport - Solve et Coagula
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
export function generateReport(): string {
  const report = validateCodex();
  const status = report.ok ? 'OK' : 'ISSUES';
  const lines: string[] = [];

  lines.push(`Codex 144:99 Lattice Status: ${status}`);
  lines.push(
    `Nodes: total=${report.summary.total_nodes}, primary=${report.summary.primary_nodes}, gateway=${report.summary.gateway_nodes}`,
  );
  lines.push(
    `Profiles: geom=${report.summary.geometry_profiles}, color=${report.summary.color_profiles}, sound=${report.summary.sound_profiles}, crystal=${report.summary.crystal_profiles}, archetype=${report.summary.archetype_profiles}`,
  );

  for (const issue of report.issues) {
    lines.push(
      `${issue.level.toUpperCase()}: ${issue.message}${
        issue.context ? ` ${JSON.stringify(issue.context)}` : ''
      }`,
    );
  }

  return lines.join('\n');
}

// Default export: minimal engine facade.
const Codex144Engine = {
  getCodexLattice,
  getNode,
  getAllNodes,
  resolveSymbol,
  latticeNeighborhood,
  samplePalette,
  exportForGodot,
  exportForSPIRIT,
  exportForCircuitum99,
  exportForLiberArcanae,
  exportForCosmogenesis,
  validateCodex,
  generateReport,
};

export default Codex144Engine;