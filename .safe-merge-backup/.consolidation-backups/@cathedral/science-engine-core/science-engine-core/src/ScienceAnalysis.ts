/**
 * Science Analysis - Advanced Analysis Tools
 * 
 * Advanced analysis features for Science Engine
 * Includes statistical analysis, pattern recognition, and validation
 * 
 * @license CC0-1.0 - Public Domain
 */

import type { DataPoint } from './ScienceEngine';
import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

export interface StatisticalAnalysis {
  mean: number;
  median: number;
  mode: number;
  standardDeviation: number;
  variance: number;
  range: [number, number];
  sacredRatio: number;
}

export interface PatternRecognition {
  patterns: string[];
  confidence: number; // 0-1
  sacredGeometry: boolean;
  consciousnessLevel: number;
}

export interface ValidationResult {
  valid: boolean;
  confidence: number; // 0-1
  issues: string[];
  recommendations: string[];
  sacredRatio: number;
}

/**
 * Advanced Science Analysis Tools
 */
export class ScienceAnalysisTools {
  private readonly GOLDEN_RATIO = SACRED_MATH.PHI;
  private readonly RATIO_144_99 = SACRED_MATH.CATHEDRAL_RATIO;
  private readonly FIBONACCI = SACRED_MATH.FIBONACCI;

  /**
   * Perform statistical analysis on data points
   */
  public analyzeStatistics(dataPoints: DataPoint[], valueKey: string): StatisticalAnalysis {
    const values = dataPoints.map(dp => {
      const value = dp.values[valueKey];
      return typeof value === 'number' ? value : 0;
    }).filter(v => !isNaN(v));

    if (values.length === 0) {
      return {
        mean: 0,
        median: 0,
        mode: 0,
        standardDeviation: 0,
        variance: 0,
        range: [0, 0],
        sacredRatio: this.RATIO_144_99
      };
    }

    // Calculate mean
    const mean = values.reduce((a, b) => a + b, 0) / values.length;

    // Calculate median
    const sorted = [...values].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    // Calculate mode (simplified - most frequent value)
    const frequency: Record<number, number> = {};
    for (const value of values) {
      const rounded = Math.round(value * 10) / 10;
      frequency[rounded] = (frequency[rounded] || 0) + 1;
    }
    const mode = parseFloat(Object.keys(frequency).reduce((a, b) => frequency[parseFloat(a)] > frequency[parseFloat(b)] ? a : b));

    // Calculate variance and standard deviation
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const standardDeviation = Math.sqrt(variance);

    // Calculate range
    const range: [number, number] = [Math.min(...values), Math.max(...values)];

    return {
      mean,
      median,
      mode,
      standardDeviation,
      variance,
      range,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Recognize patterns in data
   */
  public recognizePatterns(dataPoints: DataPoint[], consciousnessLevel: number): PatternRecognition {
    const patterns: string[] = [];
    let confidence = 0.5;

    // Check for Fibonacci patterns
    const values = dataPoints.map(dp => {
      const freq = dp.values.frequency;
      return typeof freq === 'number' ? freq : 0;
    });
    
    if (values.length > 2) {
      const ratios: number[] = [];
      for (let i = 1; i < values.length; i++) {
        if (values[i - 1] !== 0) {
          ratios.push(values[i] / values[i - 1]);
        }
      }
      
      // Check if ratios approximate golden ratio
      const goldenRatioMatches = ratios.filter(r => Math.abs(r - this.GOLDEN_RATIO) < 0.1).length;
      if (goldenRatioMatches > ratios.length * 0.3) {
        patterns.push('Golden ratio progression');
        confidence += 0.2;
      }
      
      // Check for Fibonacci-like sequences
      const fibMatches = ratios.filter(r => {
        for (const fib of this.FIBONACCI.slice(1, 5)) {
          if (Math.abs(r - (fib / this.FIBONACCI[this.FIBONACCI.indexOf(fib) - 1])) < 0.1) {
            return true;
          }
        }
        return false;
      }).length;
      
      if (fibMatches > ratios.length * 0.2) {
        patterns.push('Fibonacci-like sequence');
        confidence += 0.15;
      }
    }

    // Check for 144:99 ratio patterns
    if (values.length >= 2) {
      const ratio = values[values.length - 1] / values[0];
      if (Math.abs(ratio - this.RATIO_144_99) < 0.1) {
        patterns.push('144:99 ratio pattern');
        confidence += 0.1;
      }
    }

    // Consciousness-based patterns
    if (consciousnessLevel >= 14) {
      patterns.push('High consciousness pattern');
      confidence += 0.1;
    }

    return {
      patterns,
      confidence: Math.min(1, confidence),
      sacredGeometry: patterns.length > 0,
      consciousnessLevel
    };
  }

  /**
   * Validate experiment results
   */
  public validateExperiment(
    dataPoints: DataPoint[],
    _hypothesis: string,
    methodology: string
  ): ValidationResult {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let confidence = 1.0;

    // Check sample size
    if (dataPoints.length < 10) {
      issues.push('Sample size too small for statistical significance');
      recommendations.push('Increase sample size to at least 30 data points');
      confidence -= 0.2;
    }

    // Check data quality
    const validPoints = dataPoints.filter(dp => {
      const freq = dp.values.frequency;
      return typeof freq === 'number' && !isNaN(freq) && freq > 0;
    });
    
    if (validPoints.length < dataPoints.length * 0.9) {
      issues.push('Data quality issues detected');
      recommendations.push('Review and clean data points');
      confidence -= 0.15;
    }

    // Check for sacred geometry compliance
    const stats = this.analyzeStatistics(dataPoints, 'frequency');
    if (stats.standardDeviation === 0) {
      issues.push('No variation in data');
      recommendations.push('Ensure data has natural variation');
      confidence -= 0.1;
    }

    // Check methodology
    if (!methodology.includes('sacred') && !methodology.includes('geometry')) {
      recommendations.push('Consider incorporating sacred geometry principles');
    }

    return {
      valid: issues.length === 0,
      confidence: Math.max(0, confidence),
      issues,
      recommendations,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Calculate correlation between variables
   */
  public calculateCorrelation(
    dataPoints: DataPoint[],
    key1: string,
    key2: string
  ): {
    correlation: number; // -1 to 1
    strength: 'weak' | 'moderate' | 'strong';
    sacredRatio: number;
  } {
    const values1 = dataPoints.map(dp => {
      const val = dp.values[key1];
      return typeof val === 'number' ? val : 0;
    });
    const values2 = dataPoints.map(dp => {
      const val = dp.values[key2];
      return typeof val === 'number' ? val : 0;
    });

    if (values1.length !== values2.length || values1.length === 0) {
      return {
        correlation: 0,
        strength: 'weak',
        sacredRatio: this.RATIO_144_99
      };
    }

    // Calculate means
    const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
    const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

    // Calculate correlation coefficient
    let numerator = 0;
    let sumSq1 = 0;
    let sumSq2 = 0;

    for (let i = 0; i < values1.length; i++) {
      const diff1 = values1[i] - mean1;
      const diff2 = values2[i] - mean2;
      numerator += diff1 * diff2;
      sumSq1 += diff1 * diff1;
      sumSq2 += diff2 * diff2;
    }

    const denominator = Math.sqrt(sumSq1 * sumSq2);
    const correlation = denominator !== 0 ? numerator / denominator : 0;

    // Determine strength
    const absCorr = Math.abs(correlation);
    let strength: 'weak' | 'moderate' | 'strong' = 'weak';
    if (absCorr >= 0.7) {
      strength = 'strong';
    } else if (absCorr >= 0.4) {
      strength = 'moderate';
    }

    return {
      correlation,
      strength,
      sacredRatio: this.RATIO_144_99
    };
  }
}

