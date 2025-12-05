/**
 * 🎬 Animations
 * 
 * Breathing, flowing, and transcendent animations
 * 
 * @license CC0-1.0 - Public Domain
 */

/**
 * Generate breathing animation (zen-like transcendence)
 */
/**
 * ⚗️ GenerateBreathingAnimation - Solve et Coagula
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
export function generateBreathingAnimation(duration: number = 4): string {
  return `
    @keyframes breathe {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.9;
      }
    }

    .breathing {
      animation: breathe ${duration}s ease-in-out infinite;
    }
  `;
}

/**
 * Generate flowing animation (gentle, organic movements)
 */
/**
 * ⚗️ GenerateFlowingAnimation - Solve et Coagula
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
export function generateFlowingAnimation(): string {
  return `
    @keyframes flow {
      0% {
        transform: translateX(0) translateY(0) rotate(0deg);
      }
      33% {
        transform: translateX(10px) translateY(-5px) rotate(2deg);
      }
      66% {
        transform: translateX(-5px) translateY(5px) rotate(-2deg);
      }
      100% {
        transform: translateX(0) translateY(0) rotate(0deg);
      }
    }

    .flowing {
      animation: flow 6s ease-in-out infinite;
    }
  `;
}

/**
 * Generate transcendent animation (smooth, ethereal transitions)
 */
/**
 * ⚗️ GenerateTranscendentAnimation - Solve et Coagula
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
export function generateTranscendentAnimation(): string {
  return `
    @keyframes transcend {
      0% {
        transform: translateY(0) scale(1);
        filter: blur(0px) brightness(1);
      }
      50% {
        transform: translateY(-10px) scale(1.02);
        filter: blur(2px) brightness(1.2);
      }
      100% {
        transform: translateY(0) scale(1);
        filter: blur(0px) brightness(1);
      }
    }

    .transcendent {
      animation: transcend 8s ease-in-out infinite;
    }
  `;
}

/**
 * Generate cosmic animation (expansive, universal motions)
 */
/**
 * ⚗️ GenerateCosmicAnimation - Solve et Coagula
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
export function generateCosmicAnimation(): string {
  return `
    @keyframes cosmic-expand {
      0% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: scale(1.1) rotate(180deg);
        opacity: 0.8;
      }
      100% {
        transform: scale(1) rotate(360deg);
        opacity: 1;
      }
    }

    .cosmic {
      animation: cosmic-expand 20s linear infinite;
    }
  `;
}

/**
 * Generate all animations
 */
/**
 * ⚗️ GenerateAllAnimations - Solve et Coagula
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
export function generateAllAnimations(): string {
  return `
    ${generateBreathingAnimation()}
    ${generateFlowingAnimation()}
    ${generateTranscendentAnimation()}
    ${generateCosmicAnimation()}
  `;
}

