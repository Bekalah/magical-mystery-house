/**
 * Beautiful Details System
 * 
 * Created from doubt: "The design needs more beautiful details that people love"
 * Improvement: Create a system for adding beautiful, meaningful details everywhere
 * 
 * This is how visionary art is created - every detail matters.
 * 
 * @package @cathedral/cathedral-design-library
 */

export interface BeautifulDetail {
  id: string;
  type: 'micro-interaction' | 'typography' | 'spacing' | 'color' | 'animation' | 'pattern';
  description: string;
  implementation: string;
  beauty: string; // What makes it beautiful
  wisdom: string; // What wisdom it contains
}

export const BEAUTIFUL_DETAILS: BeautifulDetail[] = [
  {
    id: 'golden-ratio-spacing',
    type: 'spacing',
    description: 'All spacing uses golden ratio (1.618) for harmonious proportions',
    implementation: 'spacing: calc(base * 1.618^n)',
    beauty: 'Creates natural, pleasing proportions that feel right',
    wisdom: 'Nature uses golden ratio - we should too'
  },
  {
    id: 'sacred-geometry-borders',
    type: 'pattern',
    description: 'Borders use sacred geometry patterns (vesica piscis, flower of life)',
    implementation: 'border-image: url(sacred-geometry-pattern.svg)',
    beauty: 'Adds depth and meaning to every edge',
    wisdom: 'Sacred geometry connects us to universal patterns'
  },
  {
    id: 'fractal-hover-effects',
    type: 'micro-interaction',
    description: 'Hover effects use fractal-based animations',
    implementation: 'transition: transform 0.3s cubic-bezier(fractal-curve)',
    beauty: 'Smooth, organic-feeling interactions',
    wisdom: 'Fractals create natural, pleasing motion'
  },
  {
    id: 'typography-harmony',
    type: 'typography',
    description: 'Typography scales use musical intervals for harmony',
    implementation: 'font-size: base * (1.5^n) for perfect fifths',
    beauty: 'Text feels harmonious, like music',
    wisdom: 'Music and typography share mathematical foundations'
  },
  {
    id: 'color-alchemy',
    type: 'color',
    description: 'Colors derived from alchemical correspondences',
    implementation: 'color: alchemical-color(element, planet)',
    beauty: 'Colors have meaning and depth',
    wisdom: 'Color is magic - use it with intention'
  },
  {
    id: 'breathing-animations',
    type: 'animation',
    description: 'Subtle breathing animations for living feel',
    implementation: 'animation: breathe 4s ease-in-out infinite',
    beauty: 'Makes interfaces feel alive, not static',
    wisdom: 'Life has rhythm - interfaces should too'
  }
];

/**
 * Beautiful Details System
 * 
 * Applies beautiful, meaningful details throughout the design
 */
export class BeautifulDetailsSystem {
  /**
   * Get details by type
   */
  getDetailsByType(type: BeautifulDetail['type']): BeautifulDetail[] {
    return BEAUTIFUL_DETAILS.filter(d => d.type === type);
  }

  /**
   * Apply beautiful spacing
   */
  getSpacing(level: number): string {
    const base = 8; // 8px base unit
    const goldenRatio = 1.618033988749895;
    return `calc(${base}px * ${Math.pow(goldenRatio, level)})`;
  }

  /**
   * Get typography scale
   */
  getTypographyScale(level: number): string {
    const base = 16; // 16px base
    const perfectFifth = 1.5; // Musical perfect fifth
    return `${base * Math.pow(perfectFifth, level)}px`;
  }

  /**
   * Get alchemical color
   */
  getAlchemicalColor(element: string, planet?: string): string {
    const colors: { [key: string]: string } = {
      fire: '#FF4500',
      water: '#1E90FF',
      air: '#87CEEB',
      earth: '#8B4513',
      mercury: '#C0C0C0',
      venus: '#FFD700',
      mars: '#DC143C',
      jupiter: '#9370DB',
      saturn: '#2F4F4F'
    };

    if (planet && colors[planet.toLowerCase()]) {
      return colors[planet.toLowerCase()];
    }
    return colors[element.toLowerCase()] || '#000000';
  }

  /**
   * Generate breathing animation CSS
   */
  getBreathingAnimation(): string {
    return `
      @keyframes breathe {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.02); opacity: 0.95; }
      }
    `;
  }

  /**
   * Apply beautiful detail
   */
  applyDetail(element: HTMLElement, detail: BeautifulDetail): void {
    switch (detail.type) {
      case 'spacing':
        element.style.padding = this.getSpacing(2);
        element.style.margin = this.getSpacing(1);
        break;
      case 'typography':
        element.style.fontSize = this.getTypographyScale(0);
        element.style.lineHeight = '1.618';
        break;
      case 'color':
        element.style.color = this.getAlchemicalColor('fire');
        break;
      case 'animation':
        element.style.animation = 'breathe 4s ease-in-out infinite';
        break;
    }
  }
}

// Export singleton
export const beautifulDetailsSystem = new BeautifulDetailsSystem();

// Export for easy use
export default beautifulDetailsSystem;

