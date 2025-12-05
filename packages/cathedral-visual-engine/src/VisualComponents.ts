/**
 * 🎨 Visual Components
 * 
 * High-end visual components with stunning effects
 * 
 * @license CC0-1.0 - Public Domain
 */

import { generateShimmerCSS, generateLuminousGlow } from './ShimmeringEffects';
import { generateFractalCSS, FractalConfig } from './FractalVisuals';
import { generateCosmicBackground, generateParticleSystem, generateEnergyRibbons } from './CosmicHarmony';
import { generateTechnicolorCSS, generateTechnicolorGradient, TECHNICOLOR_PALETTE } from './TechnicolorPalette';

/**
 * Generate complete visual system CSS
 */
/**
 * ⚗️ GenerateCompleteVisualSystem - Solve et Coagula
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
export function generateCompleteVisualSystem(): string {
  return `
    /* Shimmering Effects */
    ${generateShimmerCSS()}
    ${generateRainbowShimmer()}
    ${generateLuminousGlow(TECHNICOLOR_PALETTE.celestialPurple, 0.8)}

    /* Fractal Visuals */
    ${generateFractalCSS({
      iterations: 8,
      scale: 15,
      rotation: 0,
      colors: [
        TECHNICOLOR_PALETTE.celestialPurple,
        TECHNICOLOR_PALETTE.celestialBlue,
        TECHNICOLOR_PALETTE.celestialTeal,
        TECHNICOLOR_PALETTE.gold
      ],
      pattern: 'mandala'
    })}

    /* Cosmic Harmony */
    ${generateCosmicBackground()}
    ${generateParticleSystem(50, 1)}
    ${generateEnergyRibbons()}

    /* Technicolor Palette */
    ${generateTechnicolorCSS()}

    /* High-End Component Styles */
    .visionary-card {
      background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(60, 60, 84, 0.9) 100%);
      border-radius: 20px;
      padding: 2rem;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(147, 112, 219, 0.3);
      position: relative;
      overflow: hidden;
    }

    .visionary-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: ${generateTechnicolorGradient('radial')};
      opacity: 0.1;
      animation: card-shimmer 10s linear infinite;
    }

    @keyframes card-shimmer {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .visionary-button {
      background: linear-gradient(135deg, ${TECHNICOLOR_PALETTE.celestialPurple} 0%, ${TECHNICOLOR_PALETTE.celestialBlue} 100%);
      border: none;
      padding: 1rem 2rem;
      border-radius: 50px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .visionary-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .visionary-button:hover::before {
      width: 300px;
      height: 300px;
    }

    .visionary-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(147, 112, 219, 0.5);
    }

    .ethereal-text {
      font-family: 'Georgia', serif;
      background: linear-gradient(135deg, ${TECHNICOLOR_PALETTE.moonGlow} 0%, ${TECHNICOLOR_PALETTE.starSilver} 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px rgba(230, 230, 250, 0.5);
      letter-spacing: 0.1em;
    }

    .cosmic-container {
      ${generateCosmicBackground()}
      ${generateParticleSystem(30, 0.8)}
      ${generateEnergyRibbons()}
      min-height: 100vh;
      padding: 2rem;
    }
  `;
}

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
function generateRainbowShimmer(): string {
  return generateShimmerCSS({
    colors: [
      TECHNICOLOR_PALETTE.red,
      TECHNICOLOR_PALETTE.orange,
      TECHNICOLOR_PALETTE.yellow,
      TECHNICOLOR_PALETTE.green,
      TECHNICOLOR_PALETTE.blue,
      TECHNICOLOR_PALETTE.indigo,
      TECHNICOLOR_PALETTE.violet
    ],
    speed: 3,
    intensity: 1,
    direction: 'diagonal',
    size: 300
  });
}

/**
 * Generate HTML demo page
 */
/**
 * ⚗️ GenerateVisualDemoHTML - Solve et Coagula
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
export function generateVisualDemoHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cathedral Visual Engine - High-End Visuals</title>
  <style>
    ${generateCompleteVisualSystem()}
    
    body {
      margin: 0;
      font-family: 'Georgia', serif;
      color: white;
    }
    
    .demo-section {
      padding: 4rem 2rem;
      margin: 2rem 0;
    }
    
    h1 {
      font-size: 3rem;
      margin-bottom: 2rem;
    }
    
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
  </style>
</head>
<body class="cosmic-container">
  <div class="demo-section">
    <h1 class="technicolor-text ethereal-text">Cathedral Visual Engine</h1>
    <p class="shimmer">High-end visuals with technicolor shimmering, fractals, and cosmic harmony</p>
    
    <div class="demo-grid">
      <div class="visionary-card fractal-background">
        <h2 class="shimmer">Fractal Mandala</h2>
        <p>Intricate fractal patterns dancing across the surface</p>
      </div>
      
      <div class="visionary-card luminous-glow luminous-pulse">
        <h2 class="technicolor-text">Luminous Glow</h2>
        <p>Pulsing, glowing elements with ethereal light</p>
      </div>
      
      <div class="visionary-card technicolor-border">
        <h2 class="shimmer">Technicolor Border</h2>
        <p>Rainbow borders with shimmering effects</p>
      </div>
      
      <div class="visionary-card energy-ribbon">
        <h2>Energy Ribbons</h2>
        <p>Flowing energy ribbons connecting elements</p>
      </div>
    </div>
    
    <div style="margin-top: 4rem; text-align: center;">
      <button class="visionary-button">Experience the Vision</button>
    </div>
  </div>
</body>
</html>`;
}

