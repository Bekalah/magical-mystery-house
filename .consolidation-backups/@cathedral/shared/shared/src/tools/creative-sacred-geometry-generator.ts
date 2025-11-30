/**
 * Creative Sacred Geometry Generator
 * 
 * @package @cathedral/shared
 * @license CC0-1.0 - Public Domain
 * 
 * Creative tool for generating sacred geometry patterns
 * Use in: Art apps, design apps, visual apps, game apps
 * 
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate details
 */

import { goldenRatio, fibonacci, vesicaPiscis, pentagram, octagon } from '@cathedral/master-artPrinciples/geometry';

export interface SacredGeometryPattern {
  type: 'vesica-piscis' | 'pentagram' | 'octagon' | 'flower-of-life' | 'metatron-cube' | 'golden-spiral';
  vertices: Array<{ x: number; y: number; z?: number }>;
  colors: string[];
  animation?: AnimationConfig;
  creativeUse: string;
}

export interface AnimationConfig {
  type: 'rotation' | 'pulse' | 'spiral' | 'fractal';
  duration: number;
  easing: 'golden' | 'fibonacci' | 'linear';
}

/**
 * Generate sacred geometry pattern for creative use
 * 
 * Creative applications:
 * - Art generation apps
 * - Design tools
 * - Visual effects
 * - Game environments
 * - Interactive installations
 */
export class CreativeSacredGeometryGenerator {
  /**
   * Generate Vesica Piscis pattern
   * Creative use: Art backgrounds, logo design, visual effects
   */
  generateVesicaPiscis(size: number = 100): SacredGeometryPattern {
    const phi = goldenRatio;
    const vertices = vesicaPiscis(size, phi);
    
    return {
      type: 'vesica-piscis',
      vertices,
      colors: ['#DDA0DD', '#9370DB', '#8B008B'],
      animation: {
        type: 'rotation',
        duration: 5000,
        easing: 'golden'
      },
      creativeUse: 'Art backgrounds, logo design, visual effects in apps'
    };
  }

  /**
   * Generate Pentagram pattern
   * Creative use: Game symbols, art patterns, design elements
   */
  generatePentagram(size: number = 100): SacredGeometryPattern {
    const vertices = pentagram(size);
    
    return {
      type: 'pentagram',
      vertices,
      colors: ['#FFD700', '#FFA500', '#FF6347'],
      animation: {
        type: 'pulse',
        duration: 3000,
        easing: 'fibonacci'
      },
      creativeUse: 'Game symbols, art patterns, design elements'
    };
  }

  /**
   * Generate Flower of Life pattern
   * Creative use: Mandala generation, art creation, visual meditation
   */
  generateFlowerOfLife(size: number = 100, layers: number = 3): SacredGeometryPattern {
    const vertices: Array<{ x: number; y: number }> = [];
    const phi = goldenRatio;
    
    // Generate flower of life pattern
    for (let layer = 0; layer < layers; layer++) {
      const radius = size * Math.pow(phi, layer);
      const circles = 6 * (layer + 1);
      
      for (let i = 0; i < circles; i++) {
        const angle = (i / circles) * Math.PI * 2;
        vertices.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        });
      }
    }
    
    return {
      type: 'flower-of-life',
      vertices,
      colors: ['#FF69B4', '#FF1493', '#DC143C', '#8B0000'],
      animation: {
        type: 'spiral',
        duration: 8000,
        easing: 'golden'
      },
      creativeUse: 'Mandala generation, art creation, visual meditation apps'
    };
  }

  /**
   * Generate Golden Spiral
   * Creative use: Layout design, composition guides, art creation
   */
  generateGoldenSpiral(size: number = 100, turns: number = 3): SacredGeometryPattern {
    const phi = goldenRatio;
    const vertices: Array<{ x: number; y: number }> = [];
    const points = 100;
    
    for (let i = 0; i < points; i++) {
      const t = (i / points) * turns * Math.PI * 2;
      const radius = size * Math.pow(phi, t / (Math.PI * 2));
      vertices.push({
        x: Math.cos(t) * radius,
        y: Math.sin(t) * radius
      });
    }
    
    return {
      type: 'golden-spiral',
      vertices,
      colors: ['#FFD700', '#FFA500', '#FF8C00'],
      animation: {
        type: 'spiral',
        duration: 6000,
        easing: 'golden'
      },
      creativeUse: 'Layout design, composition guides, art creation tools'
    };
  }
}

export const creativeSacredGeometryGenerator = new CreativeSacredGeometryGenerator();

