/**
 * Sacred Geometry Core
 * Fractal settings and geometry nodes for Codex 144:99 integration
 */

export const geometryTypes = {
  FLOWER_OF_LIFE: "flower-of-life",
  METATRONS_CUBE: "metatrons-cube",
  VESICA_PISCIS: "vesica-piscis",
  SEED_OF_LIFE: "seed-of-life",
  TREE_OF_LIFE: "tree-of-life",
  PLATONIC_SOLIDS: "platonic-solids",
};

export const createGeometryNode = (type, params = {}) => {
  return {
    type,
    params,
    timestamp: Date.now(),
  };
};

export const fractalSettings = {
  iterations: 7,
  scale: 1.618, // Golden ratio
  rotation: 0,
  complexity: 144,
};

export const getFractalSettingsForNode = (nodeId) => {
  // Legacy function for compatibility
  return {
    nodeId,
    ...fractalSettings,
  };
};

export default {
  geometryTypes,
  createGeometryNode,
  fractalSettings,
  getFractalSettingsForNode,
};
