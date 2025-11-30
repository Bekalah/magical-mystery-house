/**
 * Art Standards - Museum-Grade Quality & Sacred Geometry
 * 
 * Defines art standards for Cathedral:
 * - Museum-grade quality
 * - Sacred geometry (144:99 ratio, golden ratio, Fibonacci)
 * - Trauma-aware design
 * - Multi-modal integration
 * - Consciousness-based aesthetics
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

export interface ArtStandard {
  name: string;
  description: string;
  requirements: string[];
  sacredGeometry: {
    ratio: number;
    goldenRatio: boolean;
    fibonacci: boolean;
  };
  traumaAware: boolean;
  consciousnessLevel: number; // 0-21
}

export interface ColorStandard {
  name: string;
  rgb: { r: number; g: number; b: number };
  hex: string;
  consciousnessLevel: number;
  emotionalResonance: string;
  sacredRatio: number;
}

export interface CompositionStandard {
  name: string;
  layout: 'golden-ratio' | 'rule-of-thirds' | 'sacred-geometry' | 'fibonacci' | '144-99';
  focalPoints: number;
  balance: 'symmetrical' | 'asymmetrical' | 'radial';
  depth: number;
  sacredGeometry: boolean;
}

export interface QualityStandard {
  level: 'museum-grade' | 'professional' | 'high' | 'standard';
  requirements: {
    resolution: { min: number; recommended: number };
    colorDepth: number;
    fileFormat: string[];
    sacredGeometry: boolean;
    traumaAware: boolean;
    consciousnessMapping: boolean;
  };
}

/**
 * Art Standards Engine
 */
export class ArtStandards {
  private readonly STANDARDS: ArtStandard[] = [
    {
      name: 'Museum-Grade Visionary Art',
      description: 'Highest quality art with sacred geometry and consciousness mapping',
      requirements: [
        '144:99 ratio compliance',
        'Golden ratio proportions',
        'Fibonacci sequences in composition',
        'Trauma-aware visual design',
        'Consciousness-based color mapping',
        'Multi-modal integration',
        'Museum-grade resolution (300+ DPI)',
        'Professional color depth (16-bit+)',
        'Sacred geometry patterns',
        'Alchemical correspondences'
      ],
      sacredGeometry: {
        ratio: SACRED_MATH.CATHEDRAL_RATIO,
        goldenRatio: true,
        fibonacci: true
      },
      traumaAware: true,
      consciousnessLevel: 21
    },
    {
      name: 'Professional Design Art',
      description: 'Professional quality with sacred geometry principles',
      requirements: [
        '144:99 ratio consideration',
        'Golden ratio where applicable',
        'Trauma-aware design',
        'Consciousness-based aesthetics',
        'Professional resolution (150+ DPI)',
        'High color depth (8-bit+)',
        'Sacred geometry patterns'
      ],
      sacredGeometry: {
        ratio: SACRED_MATH.CATHEDRAL_RATIO,
        goldenRatio: true,
        fibonacci: false
      },
      traumaAware: true,
      consciousnessLevel: 14
    },
    {
      name: 'High Quality Art',
      description: 'High quality with basic sacred geometry',
      requirements: [
        '144:99 ratio awareness',
        'Trauma-aware design',
        'High resolution (72+ DPI)',
        'Good color depth',
        'Basic sacred geometry'
      ],
      sacredGeometry: {
        ratio: SACRED_MATH.CATHEDRAL_RATIO,
        goldenRatio: false,
        fibonacci: false
      },
      traumaAware: true,
      consciousnessLevel: 7
    }
  ];

  private readonly COLOR_STANDARDS: ColorStandard[] = [
    // Consciousness Level 0-7: Foundation
    { name: 'Void Black', rgb: { r: 0, g: 0, b: 0 }, hex: '#000000', consciousnessLevel: 0, emotionalResonance: 'Foundation, void, potential', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Deep Purple', rgb: { r: 40, g: 20, b: 60 }, hex: '#28143C', consciousnessLevel: 1, emotionalResonance: 'Mystery, depth, initiation', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Royal Purple', rgb: { r: 80, g: 40, b: 120 }, hex: '#502878', consciousnessLevel: 2, emotionalResonance: 'Wisdom, transformation', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Violet', rgb: { r: 120, g: 60, b: 180 }, hex: '#783CB4', consciousnessLevel: 3, emotionalResonance: 'Spirituality, intuition', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    
    // Consciousness Level 4-10: Growth
    { name: 'Indigo Blue', rgb: { r: 0, g: 50, b: 100 }, hex: '#003264', consciousnessLevel: 4, emotionalResonance: 'Depth, understanding', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Deep Blue', rgb: { r: 0, g: 100, b: 150 }, hex: '#006496', consciousnessLevel: 5, emotionalResonance: 'Communication, expression', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Cyan Blue', rgb: { r: 0, g: 150, b: 200 }, hex: '#0096C8', consciousnessLevel: 6, emotionalResonance: 'Clarity, flow', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Light Cyan', rgb: { r: 0, g: 200, b: 200 }, hex: '#00C8C8', consciousnessLevel: 7, emotionalResonance: 'Balance, harmony', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    
    // Consciousness Level 8-14: Integration
    { name: 'Teal', rgb: { r: 0, g: 200, b: 150 }, hex: '#00C896', consciousnessLevel: 8, emotionalResonance: 'Healing, growth', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Green Teal', rgb: { r: 0, g: 200, b: 100 }, hex: '#00C864', consciousnessLevel: 9, emotionalResonance: 'Nature, life', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Forest Green', rgb: { r: 50, g: 200, b: 50 }, hex: '#32C832', consciousnessLevel: 10, emotionalResonance: 'Growth, abundance', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Lime Green', rgb: { r: 100, g: 200, b: 0 }, hex: '#64C800', consciousnessLevel: 11, emotionalResonance: 'Vitality, energy', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Yellow Green', rgb: { r: 150, g: 200, b: 0 }, hex: '#96C800', consciousnessLevel: 12, emotionalResonance: 'Joy, creativity', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Bright Yellow', rgb: { r: 200, g: 200, b: 0 }, hex: '#C8C800', consciousnessLevel: 13, emotionalResonance: 'Illumination, wisdom', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Golden Yellow', rgb: { r: 200, g: 150, b: 0 }, hex: '#C89600', consciousnessLevel: 14, emotionalResonance: 'Transcendence, enlightenment', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    
    // Consciousness Level 15-21: Transcendence
    { name: 'Orange', rgb: { r: 200, g: 100, b: 0 }, hex: '#C86400', consciousnessLevel: 15, emotionalResonance: 'Passion, transformation', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Red Orange', rgb: { r: 200, g: 50, b: 0 }, hex: '#C83200', consciousnessLevel: 16, emotionalResonance: 'Power, will', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Deep Red', rgb: { r: 200, g: 0, b: 50 }, hex: '#C80032', consciousnessLevel: 17, emotionalResonance: 'Root, foundation', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Magenta Red', rgb: { r: 200, g: 0, b: 100 }, hex: '#C80064', consciousnessLevel: 18, emotionalResonance: 'Integration, unity', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Magenta', rgb: { r: 200, g: 0, b: 150 }, hex: '#C80096', consciousnessLevel: 19, emotionalResonance: 'Divine love, compassion', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Violet Magenta', rgb: { r: 180, g: 0, b: 200 }, hex: '#B400C8', consciousnessLevel: 20, emotionalResonance: 'Spiritual connection', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO },
    { name: 'Transcendent White', rgb: { r: 255, g: 255, b: 255 }, hex: '#FFFFFF', consciousnessLevel: 21, emotionalResonance: 'Unity, oneness, transcendence', sacredRatio: SACRED_MATH.CATHEDRAL_RATIO }
  ];

  private readonly COMPOSITION_STANDARDS: CompositionStandard[] = [
    {
      name: 'Golden Ratio Composition',
      layout: 'golden-ratio',
      focalPoints: 3,
      balance: 'asymmetrical',
      depth: 0.8,
      sacredGeometry: true
    },
    {
      name: '144:99 Ratio Composition',
      layout: '144-99',
      focalPoints: 5,
      balance: 'symmetrical',
      depth: 1.0,
      sacredGeometry: true
    },
    {
      name: 'Fibonacci Spiral',
      layout: 'fibonacci',
      focalPoints: 8,
      balance: 'radial',
      depth: 0.9,
      sacredGeometry: true
    },
    {
      name: 'Sacred Geometry Grid',
      layout: 'sacred-geometry',
      focalPoints: 12,
      balance: 'symmetrical',
      depth: 0.7,
      sacredGeometry: true
    },
    {
      name: 'Rule of Thirds',
      layout: 'rule-of-thirds',
      focalPoints: 4,
      balance: 'asymmetrical',
      depth: 0.6,
      sacredGeometry: false
    }
  ];

  private readonly QUALITY_STANDARDS: QualityStandard[] = [
    {
      level: 'museum-grade',
      requirements: {
        resolution: { min: 300, recommended: 600 },
        colorDepth: 16,
        fileFormat: ['TIFF', 'PNG', 'PSD', 'SVG'],
        sacredGeometry: true,
        traumaAware: true,
        consciousnessMapping: true
      }
    },
    {
      level: 'professional',
      requirements: {
        resolution: { min: 150, recommended: 300 },
        colorDepth: 8,
        fileFormat: ['PNG', 'JPEG', 'SVG'],
        sacredGeometry: true,
        traumaAware: true,
        consciousnessMapping: false
      }
    },
    {
      level: 'high',
      requirements: {
        resolution: { min: 72, recommended: 150 },
        colorDepth: 8,
        fileFormat: ['PNG', 'JPEG', 'SVG'],
        sacredGeometry: false,
        traumaAware: true,
        consciousnessMapping: false
      }
    },
    {
      level: 'standard',
      requirements: {
        resolution: { min: 72, recommended: 72 },
        colorDepth: 8,
        fileFormat: ['PNG', 'JPEG'],
        sacredGeometry: false,
        traumaAware: false,
        consciousnessMapping: false
      }
    }
  ];

  /**
   * Get art standard by name
   */
  public getStandard(name: string): ArtStandard | null {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('name must be a non-empty string');
    }
    return this.STANDARDS.find(s => s.name === name) || null;
  }

  /**
   * Get color standard by consciousness level
   */
  public getColorByConsciousness(level: number): ColorStandard | null {
    const clampedLevel = Math.max(0, Math.min(21, Math.floor(level)));
    return this.COLOR_STANDARDS.find(c => c.consciousnessLevel === clampedLevel) || null;
  }

  /**
   * Get composition standard by layout
   */
  public getComposition(layout: CompositionStandard['layout']): CompositionStandard | null {
    if (!layout || typeof layout !== 'string') {
      throw new Error('layout must be a valid composition layout type');
    }
    return this.COMPOSITION_STANDARDS.find(c => c.layout === layout) || null;
  }

  /**
   * Get quality standard by level
   */
  public getQuality(level: QualityStandard['level']): QualityStandard | null {
    if (!level || typeof level !== 'string') {
      throw new Error('level must be a valid quality level type');
    }
    return this.QUALITY_STANDARDS.find(q => q.level === level) || null;
  }

  /**
   * Validate art against standards
   */
  public validateArt(art: {
    width: number;
    height: number;
    colorDepth: number;
    fileFormat: string;
    consciousnessLevel: number;
    sacredGeometry: boolean;
    traumaAware: boolean;
  }): {
    valid: boolean;
    standard: ArtStandard | null;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Check aspect ratio (144:99)
    const aspectRatio = art.width / art.height;
    const targetRatio = SACRED_MATH.CATHEDRAL_RATIO;
    if (Math.abs(aspectRatio - targetRatio) > 0.1) {
      issues.push(`Aspect ratio ${aspectRatio.toFixed(2)} does not match 144:99 ratio (${targetRatio.toFixed(2)})`);
      recommendations.push(`Adjust dimensions to maintain 144:99 ratio (${targetRatio.toFixed(2)})`);
    }
    
    // Check consciousness level
    const colorStandard = this.getColorByConsciousness(art.consciousnessLevel);
    if (!colorStandard) {
      issues.push(`Invalid consciousness level: ${art.consciousnessLevel}`);
      recommendations.push('Use consciousness level 0-21');
    }
    
    // Check quality - calculate resolution from dimensions (assuming DPI)
    const quality = art.colorDepth >= 16 ? 'museum-grade' : art.colorDepth >= 8 ? 'professional' : 'high';
    const qualityStandard = this.getQuality(quality);
    // Estimate resolution: for display, assume 72 DPI; for print, calculate from dimensions
    const estimatedDPI = Math.max(art.width, art.height) / 10; // Rough estimate
    if (qualityStandard && estimatedDPI < qualityStandard.requirements.resolution.min) {
      issues.push(`Estimated resolution (${estimatedDPI.toFixed(0)} DPI) below ${qualityStandard.level} standard`);
      recommendations.push(`Increase resolution to ${qualityStandard.requirements.resolution.recommended} DPI`);
    }
    
    // Check sacred geometry
    if (!art.sacredGeometry) {
      recommendations.push('Consider adding sacred geometry patterns (golden ratio, Fibonacci, 144:99)');
    }
    
    // Check trauma-aware
    if (!art.traumaAware) {
      recommendations.push('Ensure trauma-aware design principles are applied');
    }
    
    const standard = this.getStandard('Museum-Grade Visionary Art');
    
    return {
      valid: issues.length === 0,
      standard,
      issues,
      recommendations
    };
  }

  /**
   * Get all standards
   */
  public getAllStandards(): ArtStandard[] {
    return [...this.STANDARDS];
  }

  /**
   * Get all color standards
   */
  public getAllColors(): ColorStandard[] {
    return [...this.COLOR_STANDARDS];
  }

  /**
   * Get all composition standards
   */
  public getAllCompositions(): CompositionStandard[] {
    return [...this.COMPOSITION_STANDARDS];
  }
}

