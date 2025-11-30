/**
 * Art Quality - Quality Assurance Tools
 * 
 * Quality assurance features for Art Standards
 * Includes quality metrics, optimization, and certification
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

// Note: GOLDEN_RATIO, RATIO_144_99, and FIBONACCI are available via SACRED_MATH if needed

export interface QualityMetrics {
  resolution: number;
  colorDepth: number;
  aspectRatio: number;
  sacredGeometry: number; // 0-1
  traumaAware: number; // 0-1
  consciousnessMapping: number; // 0-1
  overall: number; // 0-1
  sacredRatio: number;
}

export interface OptimizationResult {
  improved: boolean;
  metrics: QualityMetrics;
  recommendations: string[];
  sacredRatio: number;
}

export interface Certification {
  level: 'museum-grade' | 'professional' | 'high' | 'standard' | 'uncertified';
  score: number; // 0-100
  valid: boolean;
  sacredRatio: number;
}

/**
 * Art Quality Tools
 */
export class ArtQualityTools {
  // Sacred ratios - using SACRED_MATH directly
  private getCathedralRatio(): number {
    return SACRED_MATH.CATHEDRAL_RATIO;
  }
  // private readonly GOLDEN_RATIO = SACRED_MATH.PHI;
  // private readonly RATIO_144_99 = SACRED_MATH.CATHEDRAL_RATIO;
  // private readonly FIBONACCI = SACRED_MATH.FIBONACCI;

  /**
   * Calculate quality metrics
   */
  public calculateMetrics(art: {
    width: number;
    height: number;
    colorDepth: number;
    sacredGeometry: boolean;
    traumaAware: boolean;
    consciousnessLevel: number;
  }): QualityMetrics {
    // Input validation
    if (!art || typeof art.width !== 'number' || art.width <= 0) {
      throw new Error('Invalid art: width must be a positive number');
    }
    if (typeof art.height !== 'number' || art.height <= 0) {
      throw new Error('Invalid art: height must be a positive number');
    }
    if (typeof art.consciousnessLevel !== 'number' || art.consciousnessLevel < 0 || art.consciousnessLevel > 21) {
      throw new Error('Invalid art: consciousnessLevel must be between 0 and 21');
    }
    // Resolution score (normalized to 0-1)
    const resolution = Math.min(1, art.width * art.height / (3840 * 2160));
    
    // Color depth score
    const colorDepth = art.colorDepth >= 16 ? 1 : art.colorDepth >= 8 ? 0.7 : 0.4;
    
    // Aspect ratio score (144:99 compliance)
    const aspectRatio = art.width / art.height;
    const targetRatio = this.getCathedralRatio();
    const aspectRatioScore = 1 - Math.min(1, Math.abs(aspectRatio - targetRatio) / targetRatio);
    
    // Sacred geometry score
    const sacredGeometry = art.sacredGeometry ? 1 : 0;
    
    // Trauma-aware score
    const traumaAware = art.traumaAware ? 1 : 0;
    
    // Consciousness mapping score
    const consciousnessMapping = art.consciousnessLevel >= 0 && art.consciousnessLevel <= 21 ? 1 : 0;
    
    // Overall score (weighted average)
    const overall = (
      resolution * 0.2 +
      colorDepth * 0.2 +
      aspectRatioScore * 0.2 +
      sacredGeometry * 0.15 +
      traumaAware * 0.15 +
      consciousnessMapping * 0.1
    );

    return {
      resolution,
      colorDepth,
      aspectRatio: aspectRatioScore,
      sacredGeometry,
      traumaAware,
      consciousnessMapping,
      overall,
      sacredRatio: this.getCathedralRatio()
    };
  }

  /**
   * Optimize art quality
   */
  public optimize(art: {
    width: number;
    height: number;
    colorDepth: number;
    sacredGeometry: boolean;
    traumaAware: boolean;
    consciousnessLevel: number;
  }): OptimizationResult {
    // Input validation
    if (!art || typeof art !== 'object') {
      throw new Error('art must be an object');
    }
    if (typeof art.width !== 'number' || art.width <= 0) {
      throw new Error('art.width must be a positive number');
    }
    if (typeof art.height !== 'number' || art.height <= 0) {
      throw new Error('art.height must be a positive number');
    }
    if (typeof art.consciousnessLevel !== 'number' || art.consciousnessLevel < 0 || art.consciousnessLevel > 21) {
      throw new Error('art.consciousnessLevel must be a number between 0 and 21');
    }
    const currentMetrics = this.calculateMetrics(art);
    const recommendations: string[] = [];
    let improved = false;

    // Check resolution
    if (currentMetrics.resolution < 0.5) {
      recommendations.push(`Increase resolution to at least ${Math.ceil(art.width * 2)}x${Math.ceil(art.height * 2)}`);
      improved = true;
    }

    // Check color depth
    if (currentMetrics.colorDepth < 0.7) {
      recommendations.push('Increase color depth to 16-bit for professional quality');
      improved = true;
    }

    // Check aspect ratio
    if (currentMetrics.aspectRatio < 0.9) {
      const targetHeight = art.width / this.getCathedralRatio();
      recommendations.push(`Adjust height to ${Math.round(targetHeight)} to achieve 144:99 ratio`);
      improved = true;
    }

    // Check sacred geometry
    if (!art.sacredGeometry) {
      recommendations.push('Add sacred geometry patterns (golden ratio, Fibonacci, 144:99)');
      improved = true;
    }

    // Check trauma-aware
    if (!art.traumaAware) {
      recommendations.push('Ensure trauma-aware design principles are applied');
      improved = true;
    }

    // Calculate improved metrics
    const improvedArt = {
      ...art,
      width: recommendations.includes('Increase resolution') ? art.width * 2 : art.width,
      height: recommendations.includes('Adjust height') ? art.width / this.getCathedralRatio() : art.height,
      colorDepth: recommendations.includes('Increase color depth') ? 16 : art.colorDepth,
      sacredGeometry: true,
      traumaAware: true
    };

    const improvedMetrics = this.calculateMetrics(improvedArt);

    return {
      improved,
      metrics: improvedMetrics,
      recommendations,
      sacredRatio: this.getCathedralRatio()
    };
  }

  /**
   * Certify art quality
   */
  public certify(metrics: QualityMetrics): Certification {
    // Input validation
    if (!metrics || typeof metrics !== 'object') {
      throw new Error('metrics must be a QualityMetrics object');
    }
    if (typeof metrics.overall !== 'number' || metrics.overall < 0 || metrics.overall > 1) {
      throw new Error('metrics.overall must be a number between 0 and 1');
    }
    const score = metrics.overall * 100;
    
    let level: Certification['level'] = 'uncertified';
    if (score >= 90) {
      level = 'museum-grade';
    } else if (score >= 75) {
      level = 'professional';
    } else if (score >= 60) {
      level = 'high';
    } else if (score >= 40) {
      level = 'standard';
    }

    const valid = score >= 40 && metrics.sacredGeometry > 0.5 && metrics.traumaAware > 0.5;

    return {
      level,
      score: Math.round(score),
      valid,
      sacredRatio: this.getCathedralRatio()
    };
  }
}
