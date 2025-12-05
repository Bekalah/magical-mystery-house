/**
 * 🔮 Fractal Visuals
 * 
 * Intricate fractal patterns for psychedelic enchanted visuals
 * 
 * @license CC0-1.0 - Public Domain
 */

/**
 * ⚗️ FractalConfig - The Principle
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
export interface FractalConfig {
  iterations: number;
  scale: number;
  rotation: number;
  colors: string[];
  pattern: 'mandala' | 'spiral' | 'tree' | 'flame' | 'snowflake';
}

/**
 * Generate fractal SVG pattern
 */
/**
 * ⚗️ GenerateFractalSVG - Solve et Coagula
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
export function generateFractalSVG(config: FractalConfig): string {
  const { iterations, scale, rotation, colors, pattern } = config;
  
  let svg = `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<defs>`;
  
  // Create gradient
  svg += `<linearGradient id="fractalGradient" x1="0%" y1="0%" x2="100%" y2="100%">`;
  colors.forEach((color, i) => {
    const offset = (i / (colors.length - 1)) * 100;
    svg += `<stop offset="${offset}%" style="stop-color:${color};stop-opacity:1" />`;
  });
  svg += `</linearGradient>`;
  
  svg += `</defs>`;
  
  // Generate fractal based on pattern type
  switch (pattern) {
    case 'mandala':
      svg += generateMandalaFractal(iterations, scale, rotation);
      break;
    case 'spiral':
      svg += generateSpiralFractal(iterations, scale, rotation);
      break;
    case 'tree':
      svg += generateTreeFractal(iterations, scale, rotation);
      break;
    case 'flame':
      svg += generateFlameFractal(iterations, scale, rotation);
      break;
    case 'snowflake':
      svg += generateSnowflakeFractal(iterations, scale, rotation);
      break;
  }
  
  svg += `</svg>`;
  return svg;
}

/**
 * ⚗️ GenerateMandalaFractal - Solve et Coagula
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
function generateMandalaFractal(iterations: number, scale: number, rotation: number): string {
  let svg = '';
  const centerX = 400;
  const centerY = 400;
  
  for (let i = 0; i < iterations; i++) {
    const angle = (i / iterations) * Math.PI * 2 + rotation;
    const radius = 50 + (i * scale);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const size = 20 - (i * 0.5);
    
    svg += `<circle cx="${x}" cy="${y}" r="${size}" fill="url(#fractalGradient)" opacity="${1 - i / iterations}">`;
    svg += `<animateTransform attributeName="transform" type="rotate" values="0 ${centerX} ${centerY};360 ${centerX} ${centerY}" dur="20s" repeatCount="indefinite"/>`;
    svg += `</circle>`;
    
    // Nested circles
    for (let j = 0; j < 8; j++) {
      const nestedAngle = (j / 8) * Math.PI * 2;
      const nestedX = x + Math.cos(nestedAngle) * (size * 0.6);
      const nestedY = y + Math.sin(nestedAngle) * (size * 0.6);
      svg += `<circle cx="${nestedX}" cy="${nestedY}" r="${size * 0.3}" fill="url(#fractalGradient)" opacity="${0.5 - i / iterations}"/>`;
    }
  }
  
  return svg;
}

/**
 * ⚗️ GenerateSpiralFractal - Solve et Coagula
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
function generateSpiralFractal(iterations: number, scale: number, rotation: number): string {
  let svg = '';
  const centerX = 400;
  const centerY = 400;
  const goldenRatio = 1.618;
  
  for (let i = 0; i < iterations; i++) {
    const angle = i * goldenRatio * Math.PI + rotation;
    const radius = i * scale;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const size = 10 - (i * 0.1);
    
    if (size > 0) {
      svg += `<circle cx="${x}" cy="${y}" r="${size}" fill="url(#fractalGradient)" opacity="${1 - i / iterations}"/>`;
    }
  }
  
  return svg;
}

/**
 * ⚗️ GenerateTreeFractal - Solve et Coagula
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
function generateTreeFractal(iterations: number, scale: number, rotation: number): string {
  let svg = '';
  
  function drawBranch(x: number, y: number, angle: number, length: number, depth: number): void {
    if (depth === 0) return;
    
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    
    svg += `<line x1="${x}" y1="${y}" x2="${endX}" y2="${endY}" stroke="url(#fractalGradient)" stroke-width="${depth}" opacity="${depth / iterations}"/>`;
    
    // Recursive branches
    drawBranch(endX, endY, angle - Math.PI / 6, length * 0.7, depth - 1);
    drawBranch(endX, endY, angle + Math.PI / 6, length * 0.7, depth - 1);
  }
  
  drawBranch(400, 700, -Math.PI / 2, 100, iterations);
  
  return svg;
}

/**
 * ⚗️ GenerateFlameFractal - Solve et Coagula
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
function generateFlameFractal(iterations: number, scale: number, rotation: number): string {
  let svg = '';
  const baseX = 400;
  const baseY = 700;
  
  for (let i = 0; i < iterations; i++) {
    const y = baseY - (i * scale * 10);
    const width = 50 + Math.sin(i * 0.5) * 20;
    const x1 = baseX - width / 2 + Math.sin(i * 0.3) * 10;
    const x2 = baseX + width / 2 + Math.sin(i * 0.3 + Math.PI) * 10;
    
    svg += `<path d="M ${baseX} ${baseY} L ${x1} ${y} L ${x2} ${y} Z" fill="url(#fractalGradient)" opacity="${1 - i / iterations}">`;
    svg += `<animate attributeName="opacity" values="${1 - i / iterations};${0.5 - i / iterations};${1 - i / iterations}" dur="${2 + i * 0.1}s" repeatCount="indefinite"/>`;
    svg += `</path>`;
  }
  
  return svg;
}

/**
 * ⚗️ GenerateSnowflakeFractal - Solve et Coagula
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
function generateSnowflakeFractal(iterations: number, scale: number, rotation: number): string {
  let svg = '';
  const centerX = 400;
  const centerY = 400;
  
  function drawArm(x: number, y: number, angle: number, length: number, depth: number): void {
    if (depth === 0) return;
    
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    
    svg += `<line x1="${x}" y1="${y}" x2="${endX}" y2="${endY}" stroke="url(#fractalGradient)" stroke-width="${depth}" opacity="${depth / iterations}"/>`;
    
    // Side branches
    drawArm(endX, endY, angle - Math.PI / 3, length * 0.5, depth - 1);
    drawArm(endX, endY, angle + Math.PI / 3, length * 0.5, depth - 1);
    drawArm(endX, endY, angle, length * 0.7, depth - 1);
  }
  
  // 6 arms
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + rotation;
    drawArm(centerX, centerY, angle, 150, iterations);
  }
  
  return svg;
}

/**
 * Generate fractal CSS background
 */
/**
 * ⚗️ GenerateFractalCSS - Solve et Coagula
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
export function generateFractalCSS(config: FractalConfig): string {
  const svg = generateFractalSVG(config);
  const encoded = encodeURIComponent(svg);
  
  return `
    .fractal-background {
      background-image: url("data:image/svg+xml,${encoded}");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      animation: fractal-rotate 30s linear infinite;
    }

    @keyframes fractal-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .fractal-overlay {
      position: relative;
    }

    .fractal-overlay::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,${encoded}");
      background-size: cover;
      opacity: 0.3;
      mix-blend-mode: overlay;
      animation: fractal-rotate 30s linear infinite reverse;
    }
  `;
}

