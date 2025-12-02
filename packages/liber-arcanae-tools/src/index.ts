/**
 * Liber Arcanae Tools - Professional Creative Canvas
 * 
 * A hybrid art-game and creative platform built on Trinity Architecture.
 * "Art = Spell" - every act of creation changes the world.
 * Figma replacement with consciousness evolution integration.
 * 
 * @author Rebecca Respawn (Leonora Carrington)
 * @version 1.0.0
 * @project Circuitum 99 / Liber Arcanae
 */

// Core Liber Arcanae Components
export { LiberArcanaeCanvas } from './canvas/liber-arcanae-canvas';
export { VectorDrawingEngine } from './canvas/vector-drawing-engine';
export { MetadataSystem } from './canvas/metadata-system';
export { ArchetypeIntegration } from './canvas/archetype-integration';

// Godot Integration
export { GodotImporter } from './godot/godot-importer';
export { TSCNGenerator } from './godot/tscn-generator';
export { JSONExporter } from './godot/json-exporter';

// Sound & Frequency Systems
export { SoundLoom } from './sound/sound-loom';
export { ColorSoundCorrespondences } from './sound/color-sound-system';
export { FrequencyVisualizer } from './sound/frequency-visualizer';

// Real-time Collaboration
export { CollaborativeEngine } from './collaboration/collaborative-engine';
export { CRDTManager } from './collaboration/crdt-manager';

// Symbol Library
export { SacredGeometryLibrary } from './symbols/sacred-geometry-library';
export { AlchemicalIconSystem } from './symbols/alchemical-icon-system';
export { ArchetypeSymbolLibrary } from './symbols/archetype-symbol-library';

// Accessibility & Trauma-Safety
export { LowStimUIMode } from './accessibility/low-stim-ui';
export { TraumaSafeCreativeTools } from './accessibility/trauma-safe-tools';

// Codex Integration
export { CodexLoggingSystem } from './codex/codex-logging';
export { ArchetypeMentor } from './codex/archetype-mentor';

// Main Factory
import { LiberArcanaeCanvas } from './canvas/liber-arcanae-canvas';
import { TraumaSafeConfig } from '@cathedral-real/trinity-architecture';

/**
 * Create a complete Liber Arcanae Creative Platform
 */
/**
 * ⚗️ CreateLiberArcanaeTools - Solve et Coagula
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
export function createLiberArcanaeTools(traumaConfig?: Partial<TraumaSafeConfig>): LiberArcanaeCanvas {
  const config: TraumaSafeConfig = {
    level: 5,
    escExitAvailable: true,
    motionControl: true,
    screenReaderSupport: true,
    processingTimeAllowance: 3000,
    gentleDefaults: true,
    neurodivergentFriendly: true,
    lowStimMode: true,
    colorBlindnessSupport: true,
    soundLevelControl: true,
    ...traumaConfig
  };

  return new LiberArcanaeCanvas(config);
}

/**
 * Export default configuration for Circuitum 99 / Liber Arcanae
 */
export const LIBER_ARCANAE_CONFIG = {
  name: "Circuitum 99 / Liber Arcanae",
  version: "1.0.0",
  philosophy: {
    art_as_spell: true,
    play_as_learning: true,
    thelema_backbone: true,
    accessibility: true
  },
  world: {
    setting: "Codex Abyssiae",
    protagonist: "Rebecca Respawn (Leonora Carrington)",
    archetype_system: "22 Major Arcana"
  },
  technology: {
    canvas_resolution: "4096x4096",
    color_depth: "16-bit",
    real_time_collaboration: true,
    godot_integration: true,
    frequency_sound_mapping: true
  },
  accessibility: {
    trauma_sensitive: true,
    low_stim_mode: true,
    screen_reader_support: true,
    gentle_defaults: true,
    esc_exit_available: true
  }
};