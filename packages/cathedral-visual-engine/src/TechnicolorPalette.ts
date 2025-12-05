/**
 * 🌈 Technicolor Palette
 * 
 * Luminous rainbow hues for vibrant, saturated visuals
 * 
 * @license CC0-1.0 - Public Domain
 */

export const TECHNICOLOR_PALETTE = {
  // Primary rainbow hues
  red: '#ff0000',
  orange: '#ff7f00',
  yellow: '#ffff00',
  green: '#00ff00',
  blue: '#0000ff',
  indigo: '#4b0082',
  violet: '#9400d3',
  
  // Luminous variants
  luminousRed: '#ff4444',
  luminousOrange: '#ff9944',
  luminousYellow: '#ffff44',
  luminousGreen: '#44ff44',
  luminousBlue: '#4444ff',
  luminousIndigo: '#6b20a2',
  luminousViolet: '#b420e3',
  
  // Shimmering golds
  gold: '#ffd700',
  goldLeaf: '#c8a44d',
  antiqueGold: '#d4af37',
  roseGold: '#e8b4b8',
  
  // Celestial colors
  celestialBlue: '#4a90e2',
  celestialPurple: '#9370db',
  celestialTeal: '#20b2aa',
  celestialRose: '#f5b7b1',
  
  // Cosmic colors
  cosmicVoid: '#0a0a0f',
  cosmicIndigo: '#4b0082',
  starSilver: '#c0c0c0',
  moonGlow: '#e6e6fa',
  sunGold: '#ffd700',
  
  // Aether colors
  aether: '#9370db',
  aetherLight: '#dda0dd',
  aetherDark: '#663399'
};

/**
 * Generate technicolor gradient
 */
/**
 * ⚗️ GenerateTechnicolorGradient - Solve et Coagula
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
export function generateTechnicolorGradient(
  direction: 'horizontal' | 'vertical' | 'diagonal' | 'radial' = 'diagonal',
  colors: string[] = Object.values(TECHNICOLOR_PALETTE).slice(0, 7)
): string {
  const angleMap = {
    horizontal: '90deg',
    vertical: '0deg',
    diagonal: '135deg',
    radial: 'circle'
  };
  
  const stops = colors
    .map((color, i) => `${color} ${(i / (colors.length - 1)) * 100}%`)
    .join(', ');
  
  if (direction === 'radial') {
    return `radial-gradient(circle, ${stops})`;
  }
  
  return `linear-gradient(${angleMap[direction]}, ${stops})`;
}

/**
 * Generate CSS for technicolor elements
 */
/**
 * ⚗️ GenerateTechnicolorCSS - Solve et Coagula
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
export function generateTechnicolorCSS(): string {
  return `
    .technicolor-text {
      background: ${generateTechnicolorGradient('diagonal')};
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: brightness(1.2) saturate(1.5);
    }

    .technicolor-border {
      border: 2px solid;
      border-image: ${generateTechnicolorGradient('horizontal')} 1;
      filter: drop-shadow(0 0 10px rgba(147, 112, 219, 0.5));
    }

    .technicolor-glow {
      box-shadow: 
        0 0 20px ${TECHNICOLOR_PALETTE.celestialPurple}80,
        0 0 40px ${TECHNICOLOR_PALETTE.celestialBlue}60,
        0 0 60px ${TECHNICOLOR_PALETTE.celestialTeal}40;
    }

    .technicolor-background {
      background: ${generateTechnicolorGradient('radial')};
      position: relative;
    }

    .technicolor-background::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${generateTechnicolorGradient('diagonal')};
      opacity: 0.3;
      mix-blend-mode: overlay;
      animation: technicolor-shift 5s ease-in-out infinite alternate;
    }

    @keyframes technicolor-shift {
      from { filter: hue-rotate(0deg); }
      to { filter: hue-rotate(60deg); }
    }
  `;
}

