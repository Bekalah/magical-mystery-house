/**
 * 🌌 Cosmic Harmony
 * 
 * Interconnected visual systems for cosmic harmony
 * 
 * @license CC0-1.0 - Public Domain
 */

/**
 * ⚗️ CosmicConfig - The Principle
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
export interface CosmicConfig {
  stars: number;
  nebulaColors: string[];
  particleCount: number;
  speed: number;
}

/**
 * Generate cosmic background with stars and nebula
 */
/**
 * ⚗️ GenerateCosmicBackground - Solve et Coagula
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
export function generateCosmicBackground(config: CosmicConfig = {
  stars: 200,
  nebulaColors: ['#9370db', '#4a90e2', '#20b2aa', '#ffb347'],
  particleCount: 50,
  speed: 1
}): string {
  let css = `
    .cosmic-background {
      background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%);
      position: relative;
      overflow: hidden;
    }

    .cosmic-background::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(2px 2px at 20% 30%, white, transparent),
        radial-gradient(2px 2px at 60% 70%, white, transparent),
        radial-gradient(1px 1px at 50% 50%, white, transparent),
        radial-gradient(1px 1px at 80% 10%, white, transparent),
        radial-gradient(2px 2px at 90% 60%, white, transparent),
        radial-gradient(1px 1px at 33% 80%, white, transparent),
        radial-gradient(1px 1px at 10% 40%, white, transparent);
      background-size: 200% 200%;
      background-position: 0% 0%;
      animation: starfield ${20 / config.speed}s linear infinite;
      opacity: 0.8;
    }

    @keyframes starfield {
      from { background-position: 0% 0%; }
      to { background-position: 100% 100%; }
    }
  `;

  // Generate nebula layers
  config.nebulaColors.forEach((color, i) => {
    const opacity = 0.3 / (i + 1);
    const size = 100 + (i * 50);
    const x = 20 + (i * 20);
    const y = 30 + (i * 15);
    
    css += `
      .cosmic-background::after {
        content: '';
        position: absolute;
        top: ${y}%;
        left: ${x}%;
        width: ${size}%;
        height: ${size}%;
        background: radial-gradient(ellipse, ${color}${Math.round(opacity * 255).toString(16)} 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(${30 + i * 10}px);
        animation: nebula-float ${(15 + i * 5) / config.speed}s ease-in-out infinite alternate;
        mix-blend-mode: screen;
      }
    `;
  });

  css += `
    @keyframes nebula-float {
      from { transform: translate(0, 0) scale(1); }
      to { transform: translate(20px, -20px) scale(1.1); }
    }
  `;

  return css;
}

/**
 * Generate particle system CSS
 */
/**
 * ⚗️ GenerateParticleSystem - Solve et Coagula
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
export function generateParticleSystem(count: number = 50, speed: number = 1): string {
  let css = '.particle-system { position: relative; overflow: hidden; }';
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = (Math.random() * 10 + 5) / speed;
    const delay = Math.random() * 5;
    
    css += `
      .particle-system::before {
        content: '';
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        animation: particle-float-${i} ${duration}s ${delay}s ease-in-out infinite;
        opacity: ${0.3 + Math.random() * 0.5};
      }

      @keyframes particle-float-${i} {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: ${0.3 + Math.random() * 0.5};
        }
        50% {
          transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(${1 + Math.random() * 0.5});
          opacity: ${0.1 + Math.random() * 0.3};
        }
      }
    `;
  }
  
  return css;
}

/**
 * Generate interconnected energy ribbons
 */
/**
 * ⚗️ GenerateEnergyRibbons - Solve et Coagula
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
export function generateEnergyRibbons(): string {
  return `
    .energy-ribbon {
      position: relative;
      overflow: hidden;
    }

    .energy-ribbon::before,
    .energy-ribbon::after {
      content: '';
      position: absolute;
      width: 200%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(147, 112, 219, 0.5),
        rgba(74, 144, 226, 0.5),
        rgba(32, 178, 170, 0.5),
        transparent
      );
      animation: ribbon-flow 3s linear infinite;
    }

    .energy-ribbon::before {
      top: 20%;
      transform: rotate(-45deg);
    }

    .energy-ribbon::after {
      bottom: 20%;
      transform: rotate(45deg);
      animation-delay: 1.5s;
    }

    @keyframes ribbon-flow {
      from { transform: translateX(-100%) rotate(-45deg); }
      to { transform: translateX(100%) rotate(-45deg); }
    }
  `;
}

