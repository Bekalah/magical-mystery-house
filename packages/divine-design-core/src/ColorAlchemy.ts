/**
 * 🎨 Color Alchemy
 * 
 * Elemental, alchemical, and sephirothic color systems
 * 
 * @license CC0-1.0 - Public Domain
 */

import { Sephirah } from './SephirothicArchitecture';
import { AlchemicalStage } from './AlchemicalStages';

/**
 * Elemental Colors
 */
export const ELEMENTAL_COLORS = {
  fire: '#FF4500',      // Energy, passion, action
  water: '#1E90FF',    // Flow, emotion, depth
  air: '#FFD700',       // Lightness, intellect
  earth: '#8B4513',     // Grounding, stability
  aether: '#9370DB'     // Transcendence, magic
} as const;

/**
 * Alchemical Stage Colors
 */
export const ALCHEMICAL_COLORS = {
  nigredo: '#1a1a2e',   // Black - Death, dissolution
  albedo: '#FFFFFF',    // White - Purification
  citrinitas: '#FFD700', // Yellow - Awakening
  rubedo: '#E0115F'     // Red - Completion
} as const;

/**
 * Sephirothic Colors
 */
export const SEPHIROTHIC_COLORS: Record<Sephirah, string> = {
  [Sephirah.KETHER]: '#FFFFFF',      // Pure white, unity
  [Sephirah.CHOKMAH]: '#0000FF',     // Deep blue, wisdom
  [Sephirah.BINAH]: '#8B0000',       // Crimson, understanding
  [Sephirah.CHESED]: '#00008B',      // Deep blue, mercy
  [Sephirah.GEBURAH]: '#DC143C',     // Crimson, severity
  [Sephirah.TIPHARETH]: '#FFD700',   // Gold, beauty ⭐
  [Sephirah.NETZACH]: '#50C878',     // Emerald, victory
  [Sephirah.HOD]: '#FF8C00',         // Orange, glory
  [Sephirah.YESOD]: '#9370DB',       // Violet, foundation
  [Sephirah.MALKUTH]: '#FFD700'      // Citrine, kingdom
};

/**
 * Get color for element
 */
/**
 * ⚗️ GetElementColor - Solve et Coagula
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
export function getElementColor(element: 'fire' | 'water' | 'air' | 'earth' | 'aether'): string {
  return ELEMENTAL_COLORS[element];
}

/**
 * Get color for sephirah
 */
/**
 * ⚗️ GetSephirahColor - Solve et Coagula
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
export function getSephirahColor(sephirah: Sephirah): string {
  return SEPHIROTHIC_COLORS[sephirah];
}

/**
 * Get color for alchemical stage
 */
/**
 * ⚗️ GetAlchemicalColor - Solve et Coagula
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
export function getAlchemicalColor(stage: AlchemicalStage): string {
  const stageColors: Record<AlchemicalStage, string> = {
    [AlchemicalStage.CALCINATION]: ELEMENTAL_COLORS.fire,
    [AlchemicalStage.DISSOLUTION]: ELEMENTAL_COLORS.water,
    [AlchemicalStage.SEPARATION]: ELEMENTAL_COLORS.air,
    [AlchemicalStage.CONJUNCTION]: ELEMENTAL_COLORS.aether,
    [AlchemicalStage.FERMENTATION]: '#50C878', // Green
    [AlchemicalStage.DISTILLATION]: '#C0C0C0', // Silver
    [AlchemicalStage.COAGULATION]: '#FFD700'   // Gold
  };
  
  return stageColors[stage];
}

/**
 * Create gradient from two colors
 */
/**
 * ⚗️ CreateGradient - Solve et Coagula
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
export function createGradient(color1: string, color2: string, steps: number = 10): string[] {
  const gradient: string[] = [];
  
  // Simple RGB interpolation
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);
  
  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);
  
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    gradient.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
  }
  
  return gradient;
}

/**
 * Create alchemical gradient (base → gold)
 */
/**
 * ⚗️ CreateAlchemicalGradient - Solve et Coagula
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
export function createAlchemicalGradient(): string[] {
  return createGradient(ALCHEMICAL_COLORS.nigredo, ALCHEMICAL_COLORS.rubedo, 7);
}

