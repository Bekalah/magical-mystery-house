/**
 * Art Composition - Advanced Composition Tools
 * 
 * Advanced composition features for Art Engine
 * Includes layout optimization, color harmony, and pattern generation
 * 
 * @license CC0-1.0 - Public Domain
 */

import type { Color, Point } from './ArtEngine';
import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

export interface ColorHarmony {
  type: 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'sacred-geometry';
  colors: Color[];
  consciousnessLevel: number;
  sacredRatio: number;
}

export interface LayoutOptimization {
  focalPoints: Point[];
  balance: number; // 0-1
  rhythm: number; // 0-1
  unity: number; // 0-1
  sacredGeometry: boolean;
}

export interface PatternGenerator {
  type: 'fractal' | 'sacred-geometry' | 'organic' | 'geometric' | 'consciousness-based';
  complexity: number; // 0-10
  iterations: number;
  seed: number;
  sacredRatio: number;
}

/**
 * Advanced Art Composition Tools
 */
export class ArtCompositionTools {
  private readonly GOLDEN_RATIO = SACRED_MATH.PHI;
  private readonly RATIO_144_99 = SACRED_MATH.CATHEDRAL_RATIO;
  private readonly FIBONACCI = SACRED_MATH.FIBONACCI;

  /**
   * Generate color harmony using sacred geometry
   */
  public generateColorHarmony(baseColor: Color, consciousnessLevel: number): ColorHarmony {
    // Harmony type based on consciousness level
    let type: ColorHarmony['type'] = 'monochromatic';
    if (consciousnessLevel >= 17) {
      type = 'sacred-geometry';
    } else if (consciousnessLevel >= 14) {
      type = 'tetradic';
    } else if (consciousnessLevel >= 10) {
      type = 'triadic';
    } else if (consciousnessLevel >= 7) {
      type = 'complementary';
    } else if (consciousnessLevel >= 3) {
      type = 'analogous';
    }

    const colors: Color[] = [baseColor];
    
    // Generate harmony colors
    switch (type) {
      case 'monochromatic':
        // Variations of base color
        for (let i = 1; i <= 3; i++) {
          colors.push({
            r: Math.min(255, baseColor.r + (i * 20)),
            g: Math.min(255, baseColor.g + (i * 20)),
            b: Math.min(255, baseColor.b + (i * 20)),
            a: baseColor.a
          });
        }
        break;
      case 'analogous':
        // Adjacent colors on color wheel
        colors.push({
          r: Math.min(255, baseColor.r + 30),
          g: baseColor.g,
          b: baseColor.b,
          a: baseColor.a
        });
        colors.push({
          r: Math.max(0, baseColor.r - 30),
          g: baseColor.g,
          b: baseColor.b,
          a: baseColor.a
        });
        break;
      case 'complementary':
        // Opposite color
        colors.push({
          r: 255 - baseColor.r,
          g: 255 - baseColor.g,
          b: 255 - baseColor.b,
          a: baseColor.a
        });
        break;
      case 'triadic':
        // Three evenly spaced colors
        const hue1 = (baseColor.r + 120) % 360;
        const hue2 = (baseColor.r + 240) % 360;
        colors.push(this.hueToRgb(hue1, baseColor.g, baseColor.b, baseColor.a));
        colors.push(this.hueToRgb(hue2, baseColor.g, baseColor.b, baseColor.a));
        break;
      case 'sacred-geometry':
        // Colors based on golden ratio and Fibonacci
        for (let i = 0; i < 4; i++) {
          const fibValue = this.FIBONACCI[i % this.FIBONACCI.length];
          const ratio = this.GOLDEN_RATIO * (fibValue / 144);
          colors.push({
            r: Math.min(255, Math.round(baseColor.r * ratio)),
            g: Math.min(255, Math.round(baseColor.g * ratio)),
            b: Math.min(255, Math.round(baseColor.b * ratio)),
            a: baseColor.a
          });
        }
        break;
    }

    return {
      type,
      colors,
      consciousnessLevel,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Optimize layout using sacred geometry
   */
  public optimizeLayout(width: number, height: number, nodeCount: number): LayoutOptimization {
    // Calculate focal points using golden ratio
    const focalPoints: Point[] = [];
    const phi = this.GOLDEN_RATIO;
    
    // Golden ratio focal points
    focalPoints.push({ x: width * (phi - 1), y: height * (phi - 1) });
    focalPoints.push({ x: width * (1 - (phi - 1)), y: height * (phi - 1) });
    focalPoints.push({ x: width * (phi - 1), y: height * (1 - (phi - 1)) });
    focalPoints.push({ x: width * (1 - (phi - 1)), y: height * (1 - (phi - 1)) });
    
    // Center point
    focalPoints.push({ x: width / 2, y: height / 2 });

    // Calculate balance (symmetry)
    const balance = 0.8; // High balance with golden ratio
    
    // Calculate rhythm (repetition pattern)
    const rhythm = 0.7 + (nodeCount % 10) * 0.03;
    
    // Calculate unity (coherence)
    const unity = 0.9; // High unity with sacred geometry

    return {
      focalPoints,
      balance: Math.min(1, balance),
      rhythm: Math.min(1, rhythm),
      unity: Math.min(1, unity),
      sacredGeometry: true
    };
  }

  /**
   * Generate pattern using sacred geometry
   */
  public generatePattern(type: PatternGenerator['type'], complexity: number, seed: number): PatternGenerator {
    // Determine iterations based on complexity and Fibonacci
    const fibIndex = complexity % this.FIBONACCI.length;
    const iterations = this.FIBONACCI[fibIndex] * 2;

    return {
      type,
      complexity,
      iterations,
      seed,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Calculate visual weight distribution
   */
  public calculateVisualWeight(elements: Array<{ size: number; color: Color; position: Point }>): {
    totalWeight: number;
    distribution: number[];
    balance: number;
    sacredRatio: number;
  } {
    const distribution: number[] = [];
    let totalWeight = 0;

    for (const element of elements) {
      // Weight = size * color intensity * position importance
      const colorIntensity = (element.color.r + element.color.g + element.color.b) / 765;
      const positionWeight = 1 / (1 + Math.sqrt(Math.pow(element.position.x, 2) + Math.pow(element.position.y, 2)) / 100);
      const weight = element.size * colorIntensity * positionWeight;
      distribution.push(weight);
      totalWeight += weight;
    }

    // Balance based on golden ratio
    const balance = 1 / (1 + Math.abs(totalWeight - (totalWeight * this.GOLDEN_RATIO)));

    return {
      totalWeight,
      distribution,
      balance: Math.min(1, balance),
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Convert hue to RGB
   */
  private hueToRgb(hue: number, s: number, l: number, a: number): Color {
    // Simplified hue to RGB conversion
    const h = hue / 360;
    const r = Math.round(255 * h);
    const g = Math.round(255 * s / 255);
    const b = Math.round(255 * l / 255);
    
    return { r, g, b, a };
  }
}

