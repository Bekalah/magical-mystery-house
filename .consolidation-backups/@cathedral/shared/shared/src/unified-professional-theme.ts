/**
 * Unified Professional Theme System
 * 
 * High-end, portfolio-quality design standards applied across:
 * - Games
 * - Design Mathematics
 * - FusionKink
 * - Books/Grimoires
 * - All Tools
 * - All Systems
 * 
 * Alchemical/Hermetic theme with professional business standards
 * 
 * @license CC0-1.0 - Public Domain
 */

export interface ProfessionalTheme {
  // Core Identity
  name: string;
  version: string;
  principle: string;
  alchemical: string;
  symbol: string;
  
  // Color Palette (High-End Professional)
  colors: {
    primary: string;        // Burnished Gold
    secondary: string;     // Deep Violet
    accent: string;         // Amber
    background: string;     // Deep Black
    surface: string;        // Rich Dark
    text: {
      primary: string;     // Champagne
      secondary: string;   // Soft Gold
      muted: string;       // Deep Gray
    };
    alchemical: {
      fire: string;         // Gold
      water: string;       // Silver
      air: string;         // Mercury
      earth: string;       // Lead
    };
  };
  
  // Typography (Museum-Quality)
  typography: {
    display: {
      fontFamily: string;
      weights: number[];
      sizes: number[];
      lineHeight: number;
    };
    body: {
      fontFamily: string;
      weights: number[];
      sizes: number[];
      lineHeight: number;
    };
    mono: {
      fontFamily: string;
      weights: number[];
      sizes: number[];
    };
  };
  
  // Spacing (Sacred Geometry)
  spacing: {
    unit: number;           // Base unit (8px)
    scale: number[];        // Fibonacci-based
    goldenRatio: number;    // 1.618
    cathedralRatio: number; // 144:99
  };
  
  // Shadows & Depth (Professional Layering)
  shadows: {
    subtle: string;
    medium: string;
    deep: string;
    glow: string;
    alchemical: string;
  };
  
  // Borders & Shapes (Never Flat)
  borders: {
    radius: {
      none: number;
      subtle: number;
      medium: number;
      large: number;
      organic: string;     // Asymmetric, breathing
    };
    width: {
      thin: number;
      medium: number;
      thick: number;
    };
    style: {
      solid: string;
      gradient: string;
      alchemical: string;
    };
  };
  
  // Gradients (High-End Depth)
  gradients: {
    background: string;
    surface: string;
    accent: string;
    alchemical: {
      fire: string;
      water: string;
      air: string;
      earth: string;
    };
  };
  
  // Animations (Sophisticated, Never Jarring)
  animations: {
    duration: {
      instant: number;
      fast: number;
      normal: number;
      slow: number;
      glacial: number;
    };
    easing: {
      smooth: string;
      breathe: string;
      reveal: string;
      alchemical: string;
    };
  };
  
  // Materials (Museum-Grade)
  materials: {
    glass: {
      blur: number;
      opacity: number;
      border: string;
    };
    metal: {
      finish: string;
      reflection: string;
      patina: string;
    };
    paper: {
      texture: string;
      quality: string;
      age: string;
    };
  };
}

export const UNIFIED_PROFESSIONAL_THEME: ProfessionalTheme = {
  name: 'Cathedral Professional',
  version: '1.0.0',
  principle: 'Monas Hieroglyphica - Unity in Diversity',
  alchemical: 'Philosopher\'s Stone',
  symbol: '⊙',
  
  colors: {
    primary: '#D4AF37',        // Burnished Gold
    secondary: '#6B46C1',     // Deep Violet
    accent: '#F59E0B',        // Amber
    background: '#0A0A0A',    // Deep Black
    surface: '#1A1333',       // Rich Dark Purple
    text: {
      primary: '#F5E6D3',     // Champagne
      secondary: '#D4AF37',   // Soft Gold
      muted: '#6B7280',      // Deep Gray
    },
    alchemical: {
      fire: '#FFD700',        // Gold
      water: '#C0C0C0',       // Silver
      air: '#E6E6FA',         // Mercury (Lavender)
      earth: '#2F4F4F',       // Lead (Dark Slate)
    },
  },
  
  typography: {
    display: {
      fontFamily: '"Cormorant Garamond", "EB Garamond", serif',
      weights: [400, 500, 600, 700],
      sizes: [48, 64, 80, 96, 120],
      lineHeight: 1.2,
    },
    body: {
      fontFamily: '"Crimson Text", "Lora", serif',
      weights: [400, 500, 600],
      sizes: [16, 18, 20, 24, 28],
      lineHeight: 1.618, // Golden ratio
    },
    mono: {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      weights: [400, 500, 600],
      sizes: [14, 16, 18],
    },
  },
  
  spacing: {
    unit: 8,
    scale: [8, 13, 21, 34, 55, 89, 144], // Fibonacci
    goldenRatio: 1.618033988749895,
    cathedralRatio: 144 / 99, // 1.4545...
  },
  
  shadows: {
    subtle: '0 2px 8px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(212, 175, 55, 0.1)',
    deep: '0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(212, 175, 55, 0.15)',
    glow: '0 0 24px rgba(212, 175, 55, 0.3), 0 0 48px rgba(212, 175, 55, 0.15)',
    alchemical: '0 0 32px rgba(212, 175, 55, 0.4), inset 0 0 16px rgba(107, 70, 193, 0.2)',
  },
  
  borders: {
    radius: {
      none: 0,
      subtle: 2,
      medium: 4,
      large: 8,
      organic: '4px 8px 12px 6px', // Asymmetric, breathing
    },
    width: {
      thin: 1,
      medium: 2,
      thick: 4,
    },
    style: {
      solid: 'solid',
      gradient: 'linear-gradient(135deg, #D4AF37, #6B46C1)',
      alchemical: 'linear-gradient(135deg, rgba(212, 175, 55, 0.8), rgba(107, 70, 193, 0.8))',
    },
  },
  
  gradients: {
    background: 'radial-gradient(ellipse at 50% 0%, rgba(25, 20, 35, 0.98) 0%, rgba(8, 6, 12, 1) 50%, rgba(0, 0, 0, 1) 100%)',
    surface: 'linear-gradient(135deg, rgba(26, 19, 51, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
    accent: 'linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #D4AF37 100%)',
    alchemical: {
      fire: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      water: 'linear-gradient(135deg, #C0C0C0 0%, #E6E6FA 100%)',
      air: 'linear-gradient(135deg, #E6E6FA 0%, #B0E0E6 100%)',
      earth: 'linear-gradient(135deg, #2F4F4F 0%, #556B2F 100%)',
    },
  },
  
  animations: {
    duration: {
      instant: 0,
      fast: 150,
      normal: 300,
      slow: 600,
      glacial: 1200,
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      breathe: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      reveal: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      alchemical: 'cubic-bezier(0.618, 0, 0.382, 1)', // Golden ratio easing
    },
  },
  
  materials: {
    glass: {
      blur: 20,
      opacity: 0.1,
      border: '1px solid rgba(212, 175, 55, 0.2)',
    },
    metal: {
      finish: 'linear-gradient(135deg, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0.4))',
      reflection: '0 0 16px rgba(212, 175, 55, 0.3)',
      patina: 'rgba(107, 70, 193, 0.1)',
    },
    paper: {
      texture: 'url("data:image/svg+xml,...")', // Subtle paper texture
      quality: 'museum-grade',
      age: 'aged-parchment',
    },
  },
};

/**
 * Apply theme to component
 */
export function applyProfessionalTheme(component: string, variant?: string): Record<string, any> {
  const theme = UNIFIED_PROFESSIONAL_THEME;
  
  const baseStyles = {
    fontFamily: theme.typography.body.fontFamily,
    color: theme.colors.text.primary,
    background: theme.gradients.background,
  };
  
  // Component-specific overrides
  const componentStyles: Record<string, Record<string, any>> = {
    game: {
      ...baseStyles,
      fontFamily: theme.typography.display.fontFamily,
      background: theme.gradients.alchemical.fire,
    },
    'design-math': {
      ...baseStyles,
      background: theme.gradients.alchemical.air,
      border: `2px solid ${theme.colors.alchemical.air}`,
    },
    fusionkink: {
      ...baseStyles,
      background: theme.gradients.alchemical.water,
      border: `2px solid ${theme.colors.alchemical.water}`,
    },
    book: {
      ...baseStyles,
      background: theme.materials.paper.texture,
      color: theme.colors.text.primary,
      fontFamily: theme.typography.body.fontFamily,
    },
    tool: {
      ...baseStyles,
      background: theme.gradients.surface,
      boxShadow: theme.shadows.medium,
    },
  };
  
  return componentStyles[component] || baseStyles;
}

/**
 * Get alchemical styling for element
 */
export function getAlchemicalStyle(element: 'fire' | 'water' | 'air' | 'earth'): Record<string, any> {
  const theme = UNIFIED_PROFESSIONAL_THEME;
  
  return {
    background: theme.gradients.alchemical[element],
    border: `2px solid ${theme.colors.alchemical[element]}`,
    boxShadow: theme.shadows.glow,
    color: theme.colors.text.primary,
  };
}

export default UNIFIED_PROFESSIONAL_THEME;

