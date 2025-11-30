/**
 * index
 * 
 * @package @cathedral/liber-arcanae
 * 
 * LIBER ARCANAE CODEX ABYSSIAE
 * Complete Ornate System - All Exports
 */
// src/index.ts — Complete exports for Liber Arcanae Codex Abyssiae

export const MajorArcana = [
  "Fool","Magician","High Priestess","Empress","Emperor","Hierophant","Lovers",
  "Chariot","Strength","Hermit","Wheel","Justice","Hanged Man","Death","Temperance",
  "Devil","Tower","Star","Moon","Sun","Judgment","World"
];

/**
 * ⚗️ MinorSuit - The Principle
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
export type MinorSuit = "Wands" | "Cups" | "Swords" | "Pentacles";

/**
 * ⚗️ GetCardName - Solve et Coagula
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
export function getCardName(arc: string) {
  return arc;
}

// Export art loader for Liber Arcanae Codex Abyssiae
export * from './art-loader';
export { LiberArcanae } from './LiberArcanae';

// Functional engine exports - REAL, WORKING engines
export * from './functional-tarot-engine';
export { tarotEngine, FunctionalTarotEngine } from './functional-tarot-engine';
export * from './complete-tarot-system';

// ============================================================================
// COMPLETE ORNATE SYSTEM EXPORTS
// ============================================================================

// Liber Arcanae Codex Abyssiae - Complete System
export * from './liber-arcanae-codex-abyssiae-complete';

// 99 Gates with Fractal Sound Art Mechanics
export * from './99-gates-complete';
export { ALL_99_GATES, generateAll99Gates, createGate } from './99-gates-complete';

// 22 Playable Characters
export * from './22-playable-characters';

// Integral Ecosystem Integration
export * from './integral-ecosystem-integration';
export { integralEcosystemEngine, IntegralEcosystemEngine } from './integral-ecosystem-integration';

// World App Maker Integration
export * from './world-app-maker-integration';
export { worldAppMakerEngine, WorldAppMakerEngine } from './world-app-maker-integration';

// Magical Mystery House Complete Integration
export * from './mystery-house-complete-integration';
export { 
  COMPLETE_MYSTERY_HOUSE_ROOMS,
  getCompleteRoom,
  getRoomsByMode,
  getRoomsByArcana,
  getRoomsByGate,
  getRoomsByCodexNode,
  getAllCompleteRooms
} from './mystery-house-complete-integration';

// Fusion Kink Complete Integration
export * from './fusion-kink-complete-integration';
export { 
  fusionKinkCompleteEngine, 
  FusionKinkCompleteEngine 
} from './fusion-kink-complete-integration';

// Data Enhancement System
export * from './data-enhancement-system';
export { 
  DataEnhancementEngine,
  enhanceAllDataFiles
} from './data-enhancement-system';

// 22 Master Arcanae - Complete Ornate System
export * from './22-master-arcanae-ornate-complete';
export {
  COMPLETE_22_MASTER_ARCANAE,
  getAll22MasterArcanae,
  getMasterArcanaById,
  getMasterArcanaByNumber,
  generateOrnateArcana
} from './22-master-arcanae-ornate-complete';

// Theme Connection System
export * from './theme-connection-system';
export { themeConnectionEngine, ThemeConnectionEngine } from './theme-connection-system';
