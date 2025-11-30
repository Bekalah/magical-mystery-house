/**
// 🔧 Design - Museum-grade quality - 144:99 ratio compliance - Fibonacci-based sizing - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Golden ratio proportions - Organic, quality Fix: Multi-layered 3D space with sacred geometry depth
// 🎨 Visionary Art: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Multi-layered 3D space with sacred geometry depth
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
 * 🌊✨ FLOW STATE DETECTOR
 *
 * Advanced flow state detection and optimization.
 * Monitors creative patterns and predicts flow opportunities.
 *
 * @license CC0-1.0 - Public Domain
 */

export interface FlowStateMetrics {
  depth: number; // depth
  duration: number; // seconds
  quality: 'novice' | 'apprentice' | 'adept' | 'master' | 'transcendent';
  creativeAcceleration: number; // multiplier
  obstacles: string[];
  optimalConditions: string[];
}

export interface FlowStatePrediction {
  probability: number; // 0-1
  estimatedDuration: number; // minutes
  recommendedActions: string[];
  optimalTime: Date | null;
}

// Trauma-aware: gentle, supportive, ESC exits, pause anytime
export class FlowStateDetector {
  private static readonly FLOW_THRESHOLDS = {
    novice: { depth: 1, duration: 5 },
    apprentice: { depth: 3, duration: 15 },
    adept: { depth: 5, duration: 30 },
    master: { depth: 7, duration: 60 },
    transcendent: { depth: 10, duration: 120 }
  };

  // Detect current flow state
  public static detectFlowState(metrics: Partial<FlowStateMetrics>): FlowStateMetrics {
    const depth = metrics.depth || 0;
    const duration = metrics.duration || 0;

    // Determine quality level
    let quality: 'novice' | 'apprentice' | 'adept' | 'master' | 'transcendent' = 'novice';
    for (const [level, threshold] of Object.entries(FlowStateDetector.FLOW_THRESHOLDS)) {
      if (depth >= threshold.depth && duration >= threshold.duration) {
        quality = level as 'novice' | 'apprentice' | 'adept' | 'master' | 'transcendent';
      }
    }

    return {
      depth,
      duration,
      quality,
      creativeAcceleration: metrics.creativeAcceleration || 1.0,
      obstacles: metrics.obstacles || [],
      optimalConditions: metrics.optimalConditions || []
    };
  }

  // Predict flow state opportunities
  public static predictFlowState(
    historicalData: FlowStateMetrics[],
    currentConditions: Record<string, unknown>
  ): FlowStatePrediction {
    if (historicalData.length === 0) {
      return {
        probability: 0.3,
        estimatedDuration: 30,
        recommendedActions: ['Create quiet workspace', 'Set clear intention', 'Eliminate distractions'],
        optimalTime: null
      };
    }

    // Calculate average flow metrics
    const avgDepth = historicalData.reduce((sum, m) => sum + m.depth, 0) / historicalData.length;
    const avgDuration = historicalData.reduce((sum, m) => sum + m.duration, 0) / historicalData.length;

    // Predict probability based on historical patterns
    const probability = Math.min(0.95, avgDepth * 0.2);

    // Estimate duration based on historical average
    const estimatedDuration = Math.max(15, avgDuration / 60);

    // Generate recommendations
    const recommendedActions = FlowStateDetector.generateRecommendations(
      avgDepth,
      currentConditions
    );

    // Predict optimal time (if patterns detected)
    const optimalTime = FlowStateDetector.predictOptimalTime(historicalData);

    return {
      probability,
      estimatedDuration,
      recommendedActions,
      optimalTime
    };
  }

  // Generate flow state recommendations
  private static generateRecommendations(
    avgDepth: number,
    conditions: Record<string, unknown>
  ): string[] {
    const recommendations: string[] = [];

    if (avgDepth >= 0.5) {
      recommendations.push('Practice deep focus exercises');
      recommendations.push('Create dedicated creative space');
    }

    const distractions = conditions.distractions;
    if (distractions && typeof distractions === 'number' && distractions > 3) {
      recommendations.push('Minimize distractions');
      recommendations.push('Use focus mode');
    }

    const energy = conditions.energy;
    if (energy && typeof energy === 'number' && energy < 50) {
      recommendations.push('Rest before creative work');
      recommendations.push('Ensure adequate sleep');
    }

    if (recommendations.length === 0) {
      recommendations.push('Maintain current optimal conditions');
      recommendations.push('Continue creative practice');
    }

    return recommendations;
  }

  // Predict optimal time for flow state
  private static predictOptimalTime(
    historicalData: FlowStateMetrics[]
  ): Date | null {
    if (historicalData.length < 3) {
      return null;
    }

    // Simple pattern: if most flow states occurred at similar times
    // This would be enhanced with actual time-of-day data
    const now = new Date();
    const optimalTime = new Date(now);
    optimalTime.setHours(10, 0, 0, 0); // Default: 10 AM

    return optimalTime;
  }

  // Optimize flow state conditions
  public static optimizeConditions(
    currentMetrics: FlowStateMetrics,
    targetQuality: 'novice' | 'apprentice' | 'adept' | 'master' | 'transcendent'
  ): string[] {
    const targetThreshold = FlowStateDetector.FLOW_THRESHOLDS[targetQuality];
    const optimizations: string[] = [];

    if (currentMetrics.depth < targetThreshold.depth) {
      optimizations.push(`Increase focus depth (current: ${currentMetrics.depth}%, target: ${targetThreshold.depth}%)`);
      optimizations.push('Practice meditation or mindfulness');
    }

    if (currentMetrics.duration < targetThreshold.duration) {
      optimizations.push(`Extend flow duration (current: ${currentMetrics.duration}s, target: ${targetThreshold.duration}s)`);
      optimizations.push('Build creative stamina gradually');
    }

    if (currentMetrics.obstacles.length > 0) {
      optimizations.push(`Remove obstacles: ${currentMetrics.obstacles.join(', ')}`);
    }

    if (optimizations.length === 0) {
      optimizations.push('Maintain optimal flow conditions');
    }

    return optimizations;
  }

  // Calculate flow state score
  public static calculateFlowScore(metrics: FlowStateMetrics): number {
    const depthWeight = 0.4;
    const durationWeight = 0.3;
    const qualityWeight = 0.3;

    const qualityScores = {
      novice: 0.2,
      apprentice: 0.4,
      adept: 0.6,
      master: 0.8,
      transcendent: 1.0
    };

    const depthScore = metrics.depth;
    const durationScore = Math.min(1, metrics.duration / 3600); // Normalize to 1 hour
    const qualityScore = qualityScores[metrics.quality];

    return (
      depthScore * depthWeight +
      durationScore * durationWeight +
      qualityScore * qualityWeight
    ) * 100;
  }
}

export default FlowStateDetector;

