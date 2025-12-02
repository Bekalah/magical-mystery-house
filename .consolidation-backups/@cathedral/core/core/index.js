/**
 * @cathedral/core - Core node logic and JSON data
 * Exports for Codex 144:99 + Morgan Le Fay Avalon system
 */

// Export Morgan Le Fay Avalon System
export { MorganLeFay } from '../../MorganLeFay.js';
export { AvalonRealmEngine } from '../../AvalonRealmEngine.js';
export { TarotCreatureSystem } from '../../TarotCreatureSystem.js';
export { AvalonNodeIntegration } from '../../AvalonNodeIntegration.js';

// Node data and schemas
export const NODE_SCHEMAS = {
  node: {
    id: "number",
    name: "string",
    ego: "string",
    shem: "string",
    goet: "string",
    chakra: "string",
    planet: "string",
    element: "string",
    frequency_hz: "number",
    geometry: "string",
    music: {
      root_note: "string",
      scale: "string",
      instruments: "array"
    },
    tarot: "string",
    fusion_gate: "number",
    living_spine_chapter: "number"
  },

  avalon_realm: {
    id: "string",
    name: "string",
    style: "string",
    purpose: "string",
    node_influence: "object",
    architecture: "object",
    inhabitants: "array",
    magical_features: "array"
  },

  tarot_creature: {
    id: "string",
    name: "string",
    tarot_archetype: "object",
    elemental_base: "object",
    evolution: "object",
    abilities: "object",
    magical_style: "object"
  }
};

// Utility functions for node processing
export const NodeUtils = {
  /**
   * Generate complete node experience with all integrations
   */
  generateNodeExperience: (nodeId, morganLeFay, avalonEngine, tarotCreatureSystem, avalonNodeIntegration) => {
    const nodePackage = avalonNodeIntegration.generateAvalonNode(nodeId, {
      includeGeometry: true,
      includeAudio: true,
      includeVisuals: true,
      includeRealm: true,
      includeTarotCreature: true,
      style: "dion_fortune"
    });

    return {
      node: nodePackage,
      experience: {
        name: `${nodePackage.base_data.name} - Complete Avalon Experience`,
        type: "Immersive Node Exploration",
        components: {
          realm: nodePackage.avalon_realm,
          creature: nodePackage.tarot_creature,
          geometry: nodePackage.procedural_elements.geometry,
          audio: nodePackage.procedural_elements.audio,
          visuals: nodePackage.procedural_elements.visuals
        },
        integrations: {
          threejs: nodePackage.threejs_geometry,
          tonejs: nodePackage.tonejs_audio,
          p5js: nodePackage.p5js_visual,
          babylonjs: nodePackage.babylonjs_scene,
          godot: nodePackage.godot_scene
        },
        morgan_le_fay_presence: true,
        style: "dion_fortune",
        generated: new Date().toISOString()
      }
    };
  },

  /**
   * Get all available nodes for exploration
   */
  getAllNodes: (avalonNodeIntegration) => {
    return avalonNodeIntegration.getAvailableNodes();
  },

  /**
   * Generate Morgan Le Fay teaching for a node
   */
  getNodeTeaching: (nodeId, avalonNodeIntegration) => {
    return avalonNodeIntegration.getNodeTeaching(nodeId);
  },

  /**
   * Generate visionary art prompt for a node
   */
  generateNodeArtPrompt: (nodeId, avalonNodeIntegration) => {
    return avalonNodeIntegration.generateNodeArtPrompt(nodeId);
  }
};

// Export validation schemas using Zod
import { z } from 'zod';

export const NodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  ego: z.string(),
  shem: z.string(),
  goet: z.string(),
  chakra: z.string(),
  planet: z.string(),
  element: z.string(),
  frequency_hz: z.number(),
  geometry: z.string(),
  music: z.object({
    root_note: z.string(),
    scale: z.string(),
    instruments: z.array(z.string())
  }),
  tarot: z.string(),
  fusion_gate: z.number(),
  living_spine_chapter: z.number()
});

export const AvalonRealmSchema = z.object({
  id: z.string(),
  name: z.string(),
  style: z.string(),
  purpose: z.string(),
  node_influence: z.object(),
  architecture: z.object(),
  inhabitants: z.array(z.string()),
  magical_features: z.array(z.string())
});

export const TarotCreatureSchema = z.object({
  id: z.string(),
  name: z.string(),
  tarot_archetype: z.object(),
  elemental_base: z.object(),
  evolution: z.object(),
  abilities: z.object(),
  magical_style: z.object()
});

// Validation functions
export const validateNode = (node) => NodeSchema.parse(node);
export const validateRealm = (realm) => AvalonRealmSchema.parse(realm);
export const validateCreature = (creature) => TarotCreatureSchema.parse(creature);
