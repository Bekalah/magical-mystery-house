/**
 * 🎨 Design Tokens
 * 
 * Typography, spacing, and component tokens based on sacred geometry
 * 
 * @license CC0-1.0 - Public Domain
 */

import { getFibonacciSpacing, GOLDEN_RATIO, CATHEDRAL_RATIO } from './SacredGeometry';
import { ELEMENTAL_COLORS, SEPHIROTHIC_COLORS } from './ColorAlchemy';
import { Sephirah } from './SephirothicArchitecture';

/**
 * Typography Scale (Golden Ratio)
 */
export const TYPOGRAPHY_SCALE = {
  xs: `${8 / GOLDEN_RATIO}px`,      // ~4.9px
  sm: '8px',
  base: `${8 * GOLDEN_RATIO}px`,    // ~12.9px
  md: `${13 * GOLDEN_RATIO}px`,     // ~21px
  lg: `${21 * GOLDEN_RATIO}px`,     // ~34px
  xl: `${34 * GOLDEN_RATIO}px`,     // ~55px
  '2xl': `${55 * GOLDEN_RATIO}px`,  // ~89px
  '3xl': '144px'
};

/**
 * Spacing Scale (Fibonacci)
 */
export const SPACING_SCALE = {
  xs: getFibonacciSpacing(2),   // 2
  sm: getFibonacciSpacing(3),   // 3
  base: getFibonacciSpacing(4), // 5
  md: getFibonacciSpacing(5),  // 8
  lg: getFibonacciSpacing(6),   // 13
  xl: getFibonacciSpacing(7),   // 21
  '2xl': getFibonacciSpacing(8), // 34
  '3xl': getFibonacciSpacing(9)  // 55
};

/**
 * Component Tokens
 */
export const COMPONENT_TOKENS = {
  button: {
    fire: {
      color: ELEMENTAL_COLORS.fire,
      shape: 'pointed', // Triangle/pyramid
      animation: 'pulse'
    },
    water: {
      color: ELEMENTAL_COLORS.water,
      shape: 'rounded', // Circle/sphere
      animation: 'flow'
    },
    air: {
      color: ELEMENTAL_COLORS.air,
      shape: 'hexagon',
      animation: 'float'
    },
    earth: {
      color: ELEMENTAL_COLORS.earth,
      shape: 'square', // Cube
      animation: 'solid'
    }
  },
  input: {
    water: {
      color: ELEMENTAL_COLORS.water,
      shape: 'rounded',
      animation: 'flow'
    }
  },
  card: {
    air: {
      color: ELEMENTAL_COLORS.air,
      shape: 'hexagon',
      animation: 'float'
    }
  },
  container: {
    earth: {
      color: ELEMENTAL_COLORS.earth,
      shape: 'square',
      animation: 'solid'
    }
  }
};

/**
 * Get design tokens for a sephirah
 */
/**
 * ⚗️ GetSephirahTokens - Solve et Coagula
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
export function getSephirahTokens(sephirah: Sephirah) {
  return {
    color: SEPHIROTHIC_COLORS[sephirah],
    spacing: SPACING_SCALE,
    typography: TYPOGRAPHY_SCALE,
    ratio: sephirah === Sephirah.TIPHARETH ? GOLDEN_RATIO : CATHEDRAL_RATIO
  };
}

/**
 * Get design tokens for element
 */
/**
 * ⚗️ GetElementTokens - Solve et Coagula
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
export function getElementTokens(element: 'fire' | 'water' | 'air' | 'earth' | 'aether') {
  return {
    color: ELEMENTAL_COLORS[element],
    component: COMPONENT_TOKENS.button[element] || COMPONENT_TOKENS.button.fire
  };
}

