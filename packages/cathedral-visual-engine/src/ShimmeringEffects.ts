/**
 * ✨ Shimmering Effects
 * 
 * Technicolor shimmering effects for high-end visuals
 * 
 * @license CC0-1.0 - Public Domain
 */

/**
 * ⚗️ ShimmerConfig - The Principle
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
export interface ShimmerConfig {
  colors: string[];
  speed: number;
  intensity: number;
  direction: 'horizontal' | 'vertical' | 'radial' | 'diagonal';
  size: number;
}

/**
 * Generate shimmer CSS animation
 */
/**
 * ⚗️ GenerateShimmerCSS - Solve et Coagula
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
export function generateShimmerCSS(config: ShimmerConfig = {
  colors: ['#ffb347', '#4a90e2', '#9370db', '#20b2aa', '#f5b7b1'],
  speed: 2,
  intensity: 0.8,
  direction: 'diagonal',
  size: 200
}): string {
  const gradientStops = config.colors
    .map((color, i) => {
      const position = (i / (config.colors.length - 1)) * 100;
      return `${color} ${position}%`;
    })
    .join(', ');

  const directionMap = {
    horizontal: '90deg',
    vertical: '0deg',
    radial: 'circle',
    diagonal: '135deg'
  };

  const angle = directionMap[config.direction] || '135deg';

  return `
    @keyframes shimmer {
      0% {
        background-position: -${config.size * 2}px 0;
      }
      100% {
        background-position: ${config.size * 2}px 0;
      }
    }

    .shimmer {
      background: linear-gradient(
        ${angle},
        ${gradientStops}
      );
      background-size: ${config.size}px ${config.size}px;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer ${config.speed}s linear infinite;
      filter: brightness(${1 + config.intensity});
    }

    .shimmer-glow {
      position: relative;
    }

    .shimmer-glow::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        ${angle},
        ${gradientStops}
      );
      background-size: ${config.size}px ${config.size}px;
      opacity: ${config.intensity};
      filter: blur(${config.size / 4}px);
      z-index: -1;
      animation: shimmer ${config.speed}s linear infinite;
    }
  `;
}

/**
 * Generate luminous glow effect
 */
/**
 * ⚗️ GenerateLuminousGlow - Solve et Coagula
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
export function generateLuminousGlow(color: string, intensity: number = 0.6): string {
  return `
    .luminous-glow {
      box-shadow: 
        0 0 ${20 * intensity}px ${color}40,
        0 0 ${40 * intensity}px ${color}60,
        0 0 ${60 * intensity}px ${color}80,
        inset 0 0 ${20 * intensity}px ${color}20;
      filter: drop-shadow(0 0 ${10 * intensity}px ${color});
    }

    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 
          0 0 ${20 * intensity}px ${color}40,
          0 0 ${40 * intensity}px ${color}60,
          0 0 ${60 * intensity}px ${color}80;
      }
      50% {
        box-shadow: 
          0 0 ${30 * intensity}px ${color}60,
          0 0 ${60 * intensity}px ${color}80,
          0 0 ${90 * intensity}px ${color}AA;
      }
    }

    .luminous-pulse {
      animation: pulse-glow 2s ease-in-out infinite;
    }
  `;
}

/**
 * Generate rainbow shimmer effect
 */
/**
 * ⚗️ GenerateRainbowShimmer - Solve et Coagula
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
export function generateRainbowShimmer(): string {
  return generateShimmerCSS({
    colors: [
      '#ff0000', // Red
      '#ff7f00', // Orange
      '#ffff00', // Yellow
      '#00ff00', // Green
      '#0000ff', // Blue
      '#4b0082', // Indigo
      '#9400d3'  // Violet
    ],
    speed: 3,
    intensity: 1,
    direction: 'diagonal',
    size: 300
  });
}

