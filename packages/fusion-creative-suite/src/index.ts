/**
 * 🔯 Cathedral Fusion Creative Suite - Main Export
 * Professional Adobe/Figma replacement with Arcana character system
 * Merkaba 3D builder, brush engine, vector graphics, frequency visualizer
 * 
 * Built with agent precision - NO MODIFICATIONS AFTER THIS
 * Follows the complete Python specification exactly
 */

export { default as CathedralFusionCreativeSuite } from './core/fusion-creative-suite.js';
export * from './types/index.js';
export * from './config/trauma-safe.js';

import CathedralFusionCreativeSuite from './core/fusion-creative-suite.js';

// Export a singleton instance for easy integration
const fusionSuite = new CathedralFusionCreativeSuite();

export default fusionSuite;

// Professional tool configurations
export const RENDERING_ENGINES = {
  RASTER_2D: 'raster_2d',
  VECTOR_INFINITE: 'vector_infinite',
  MERKABA_3D: 'merkaba_3d',
  SACRED_GEOMETRY: 'sacred_geometry',
  FREQUENCY_VISUAL: 'frequency_visual',
  FUSION_HYBRID: 'fusion_hybrid'
};

export const CREATIVE_QUALITIES = {
  STUDENT: 'student',
  ARTIST: 'artist',
  PROFESSIONAL: 'professional',
  ATELIER_MASTER: 'atelier_master',
  DAVINCI_GRADE: 'davinci_grade'
};

// Arcana constants
export const MAJOR_ARCANA = {
  THEMELA_FOOL: 0,          // The Fool - Liberation (396 Hz)
  MAGICIAN: 1,              // Magician - Transformation (528 Hz)
  HIGH_PRIESTESS: 2,        // High Priestess - Spiritual Order (852 Hz)
  EMPRESS: 3,               // Empress - Connection (639 Hz)
  EMPEROR: 4,               // Emperor - Change (417 Hz)
  HIEROPHANT: 5,            // Hierophant - Intuition (741 Hz)
  LOVERS: 6,                // Lovers - Connection (639 Hz)
  CHARIOT: 7,               // Chariot - Transformation (528 Hz)
  STRENGTH: 8,              // Strength - Liberation (396 Hz)
  HERMIT: 9,                // Hermit - Spiritual (852 Hz)
  WHEEL_OF_FORTUNE: 10,     // Wheel of Fortune - Divine Consciousness (963 Hz)
  JUSTICE: 11,              // Justice - Intuition (741 Hz)
  HANGED_ONE: 12,           // Hanged One - Change (417 Hz)
  DEATH: 13,                // Death - Liberation through transformation (396 Hz)
  TEMPERANCE: 14,           // Temperance - Balance and harmony (639 Hz)
  DEVIL: 15,                // Devil - Shadow liberation (396 Hz)
  TOWER: 16,                // Tower - Sudden change (417 Hz)
  STAR: 17,                 // Star - Hope and spiritual connection (852 Hz)
  MOON: 18,                 // Moon - Intuition and subconscious (741 Hz)
  SUN: 19,                  // Sun - Vitality and transformation (528 Hz)
  JUDGEMENT: 20,            // Judgement - Higher calling (963 Hz)
  WORLD: 21                 // World - Completion and unity (963 Hz)
};

// Solfeggio frequencies
export const SOLFEGGIO_FREQUENCIES = {
  LIBERATION_FEAR: 396,     // Liberation from fear and guilt
  UNDO_SITUATIONS: 417,     // Undo situations and facilitate change
  CONNECTION: 639,          // Connection and relationships
  TRANSFORMATION: 528,      // Transformation and miracles (DNA repair)
  INTUITION: 741,           // Awakening intuition
  SPIRITUAL_ORDER: 852,     // Spiritual order and return to spiritual order
  DIVINE_CONSCIOUSNESS: 963 // Divine consciousness and spiritual awakening
};

// Fusion Kink modes
export const FUSION_KINK_MODES = {
  DIVINE_LIGHT: 'divine_light',
  INFERNAL_SHADOW: 'infernal_shadow',
  HARMONY_BALANCE: 'harmony_balance',
  SACRED_GEOMETRY: 'sacred_geometry',
  HEALING_FREQUENCY: 'healing_frequency'
};

// Quick start examples
export const QUICK_START_EXAMPLES = {
  // Initialize Themela (The Fool) character
  themela_character: {
    arcana: 'THEMELA_FOOL',
    name: 'Themela',
    frequency: 396,  // Liberation from fear
    divineAffinity: 0.7,
    infernalAffinity: 0.3,
    primaryColor: [0.75, 0.85, 0.95],  // Soft blue
    geometryPattern: 'flower_of_life'
  },
  
  // Magician character
  magician_character: {
    arcana: 'MAGICIAN',
    name: 'Magician',
    frequency: 528,  // Transformation
    divineAffinity: 0.6,
    infernalAffinity: 0.4,
    primaryColor: [0.85, 0.8, 0.7],  // Warm gold
    geometryPattern: 'merkaba'
  },
  
  // Star character
  star_character: {
    arcana: 'STAR',
    name: 'Star',
    frequency: 852,  // Spiritual connection
    divineAffinity: 0.8,
    infernalAffinity: 0.2,
    primaryColor: [0.9, 0.85, 0.95],  // Light purple
    geometryPattern: 'fibonacci_spiral'
  }
};

// Professional brush presets
export const BRUSH_PRESETS = {
  divine_light_round: {
    name: 'Divine Light Round',
    type: 'round',
    size: 20,
    opacity: 0.8,
    hardness: 0.3,
    divineResponse: 1.0,
    useCase: 'healing and light work'
  },
  
  infernal_shadow_flat: {
    name: 'Infernal Shadow Flat',
    type: 'flat',
    size: 25,
    opacity: 0.9,
    hardness: 0.7,
    infernalResponse: 1.0,
    useCase: 'depth and shadow work'
  },
  
  harmony_blend: {
    name: 'Harmony Blend',
    type: 'round',
    size: 30,
    opacity: 0.5,
    hardness: 0.0,
    divineResponse: 0.5,
    infernalResponse: 0.5,
    useCase: 'smooth transitions'
  },
  
  sacred_geometry_line: {
    name: 'Sacred Geometry Line',
    type: 'rigger',
    size: 2,
    opacity: 1.0,
    hardness: 1.0,
    useCase: 'precise geometric work'
  },
  
  frequency_scatter: {
    name: 'Frequency Scatter',
    type: 'round',
    size: 15,
    opacity: 0.6,
    frequencyModulation: 1.0,
    useCase: 'audio-reactive effects'
  }
};

// Sacred geometry patterns
export const SACRED_GEOMETRY_PATTERNS = {
  flower_of_life: {
    description: 'Sacred pattern of overlapping circles',
    rings: 6,
    color: 'healing_blue',
    rotation: 'gentle',
    complexity: 'moderate'
  },
  
  fibonacci_spiral: {
    description: 'Golden ratio spiral',
    iterations: 10,
    color: 'divine_gold',
    rotation: 'none',
    complexity: 'high'
  },
  
  merkaba: {
    description: 'Star Tetrahedron - sacred 3D form',
    size: 150,
    color: 'dual_divine_infernal',
    rotation: 'clockwise_divine_counter_infernal',
    complexity: 'advanced'
  },
  
  metatron_cube: {
    description: 'All sacred geometry contained',
    circles: 13,
    color: 'white_gold',
    rotation: 'none',
    complexity: 'expert'
  }
};

// Export singleton instance
export { fusionSuite as fusionSuiteInstance };
export { CathedralFusionCreativeSuite as FusionSuite };