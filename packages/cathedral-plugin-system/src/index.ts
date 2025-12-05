/**
 * @license CC0-1.0 - Public Domain
 */

/**
 * index
 * 
 * @package @cathedral/cathedral-plugin-system
 */
/**
 * Cathedral Plugin System - Main Export
 * Unified system for modular integration of sacred technologies
 */

export { PluginManager } from './PluginManager';
export * from './types';

// Witch Mod Tech
export * from './WitchModTech';
export { WitchModTech, createWitchMod } from './WitchModTech';
export type { Mod, ModConfig, Module, Connection } from './WitchModTech';

// Core systems are available as separate packages:
// - @cathedral/codex-library
// - @cathedral/liber-arcanae
// - @cathedral/fusion-kink (integrated in liber-arcanae)
