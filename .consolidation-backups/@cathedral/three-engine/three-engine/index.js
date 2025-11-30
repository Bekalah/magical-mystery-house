/**
 * Three.js Engine
 * Wrapper and utilities for Cathedral 3D visualizations
 */

export const createScene = (config = {}) => {
  return {
    type: "three-scene",
    config,
    timestamp: Date.now(),
  };
};

export const sceneTypes = {
  SACRED_GEOMETRY: "sacred-geometry",
  FRACTAL: "fractal",
  COSMIC: "cosmic",
  PORTAL: "portal",
};

export const materialPresets = {
  HOLOGRAPHIC: {
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8,
  },
  CRYSTAL: { metalness: 0.1, roughness: 0.0, transparent: true, opacity: 0.95 },
  ETHEREAL: { metalness: 0.0, roughness: 0.3, transparent: true, opacity: 0.6 },
};

export default {
  createScene,
  sceneTypes,
  materialPresets,
};
