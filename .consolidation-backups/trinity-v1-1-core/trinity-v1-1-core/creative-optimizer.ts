/**
 * 🎯✨ CREATIVE OPTIMIZER
 *
 * Optimizes creative workflows and individual creative profiles.
 * Provides personalized recommendations and workflow enhancements.
 *
 * @license CC0-1.0 - Public Domain
 */

import FlowStateDetector from './flow-state-detector';
import PatternRecognizer from './pattern-recognizer';
import type { FlowStateMetrics } from './flow-state-detector';
import type { CreativePattern } from './pattern-recognizer';

export interface OptimizationRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: 'workflow' | 'environment' | 'timing' | 'technique' | 'integration';
  title: string;
  description: string;
  expectedImpact: number; // 0-100
  implementationDifficulty: 'easy' | 'medium' | 'hard';
  steps: string[];
}

export interface CreativeProfile {
  flowStateHistory: FlowStateMetrics[];
  patterns: CreativePattern[];
  strengths: string[];
  areasForGrowth: string[];
  optimalConditions: Record<string, any>;
}

export class CreativeOptimizer {
  // Optimize creative profile
  public static optimizeProfile(
    profile: CreativeProfile
  ): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    // Analyze flow state history
    if (profile.flowStateHistory.length > 0) {
      const flowRecommendations = CreativeOptimizer.optimizeFlowState(profile);
      recommendations.push(...flowRecommendations);
    }

    // Analyze patterns
    if (profile.patterns.length > 0) {
      const patternRecommendations = CreativeOptimizer.optimizePatterns(profile);
      recommendations.push(...patternRecommendations);
    }

    // Analyze strengths and growth areas
    const growthRecommendations = CreativeOptimizer.optimizeGrowth(profile);
    recommendations.push(...growthRecommendations);

    // Sort by priority and expected impact
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.expectedImpact - a.expectedImpact;
    });
  }

  // Optimize flow state
  private static optimizeFlowState(
    profile: CreativeProfile
  ): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];
    const history = profile.flowStateHistory;

    // Predict future flow states
    const prediction = FlowStateDetector.predictFlowState(
      history,
      profile.optimalConditions
    );

    if (prediction.probability < 0.5) {
      recommendations.push({
        priority: 'high',
        category: 'environment',
        title: 'Improve Flow State Conditions',
        description: 'Current conditions are not optimal for flow state. Implement recommended actions to increase flow probability.',
        expectedImpact: 70,
        implementationDifficulty: 'medium',
        steps: prediction.recommendedActions
      });
    }

    // Optimize for higher quality flow
    const avgQuality = history.reduce((sum, h) => {
      const qualityScores = { novice: 1, apprentice: 2, adept: 3, master: 4, transcendent: 5 };
      return sum + qualityScores[h.quality];
    }, 0) / history.length;

    if (avgQuality < 3) {
      const targetQuality: FlowStateMetrics['quality'] = avgQuality < 2 ? 'apprentice' : 'adept';
      const optimizations = FlowStateDetector.optimizeConditions(
        history[history.length - 1] || {
          depth: 0,
          duration: 0,
          quality: 'novice',
          creativeAcceleration: 1,
          obstacles: [],
          optimalConditions: []
        },
        targetQuality
      );

      recommendations.push({
        priority: 'medium',
        category: 'technique',
        title: `Advance to ${targetQuality} Flow State`,
        description: `Optimize conditions to achieve ${targetQuality} level flow states consistently.`,
        expectedImpact: 60,
        implementationDifficulty: 'medium',
        steps: optimizations
      });
    }

    return recommendations;
  }

  // Optimize patterns
  private static optimizePatterns(
    profile: CreativeProfile
  ): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];
    const insights = PatternRecognizer.generateInsights(profile.patterns);

    for (const insight of insights.slice(0, 3)) {
      if (insight.expectedImpact === 'high') {
        recommendations.push({
          priority: 'high',
          category: 'workflow',
          title: `Optimize Pattern: ${insight.pattern.name}`,
          description: insight.insight,
          expectedImpact: insight.pattern.optimizationPotential,
          implementationDifficulty: 'medium',
          steps: [insight.recommendation]
        });
      } else if (insight.expectedImpact === 'medium') {
        recommendations.push({
          priority: 'medium',
          category: 'workflow',
          title: `Enhance Pattern: ${insight.pattern.name}`,
          description: insight.insight,
          expectedImpact: insight.pattern.optimizationPotential * 0.7,
          implementationDifficulty: 'easy',
          steps: [insight.recommendation]
        });
      }
    }

    return recommendations;
  }

  // Optimize growth areas
  private static optimizeGrowth(
    profile: CreativeProfile
  ): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    // Recommend leveraging strengths
    if (profile.strengths.length > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'technique',
        title: 'Leverage Creative Strengths',
        description: `Focus on your strengths: ${profile.strengths.join(', ')}`,
        expectedImpact: 50,
        implementationDifficulty: 'easy',
        steps: [
          `Prioritize projects that use: ${profile.strengths[0]}`,
          `Build on existing strengths to develop mastery`,
          `Share strengths with others to reinforce patterns`
        ]
      });
    }

    // Recommend addressing growth areas
    if (profile.areasForGrowth.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'technique',
        title: 'Develop Growth Areas',
        description: `Focus on developing: ${profile.areasForGrowth.join(', ')}`,
        expectedImpact: 80,
        implementationDifficulty: 'hard',
        steps: [
          `Set specific goals for: ${profile.areasForGrowth[0]}`,
          `Practice regularly with focused attention`,
          `Seek feedback and iterate on improvements`
        ]
      });
    }

    return recommendations;
  }

  // Generate personalized workflow
  public static generateWorkflow(
    profile: CreativeProfile,
    recommendations: OptimizationRecommendation[]
  ): {
    daily: string[];
    weekly: string[];
    monthly: string[];
  } {
    // Use profile to personalize workflow
    const profileContext = profile.strengths.length > 0 ? profile.strengths[0] : 'creative work';
    const highPriority = recommendations.filter(r => r.priority === 'high');
    const mediumPriority = recommendations.filter(r => r.priority === 'medium');

    return {
      daily: [
        ...highPriority.slice(0, 2).flatMap(r => r.steps.slice(0, 1)),
        `Maintain optimal creative conditions for ${profileContext}`,
        'Track flow state metrics'
      ],
      weekly: [
        ...highPriority.slice(0, 1).flatMap(r => r.steps),
        ...mediumPriority.slice(0, 2).flatMap(r => r.steps.slice(0, 1)),
        'Review and adjust patterns'
      ],
      monthly: [
        'Complete pattern analysis',
        'Update creative profile',
        'Set new optimization goals',
        'Review long-term creative growth'
      ]
    };
  }

  // Calculate optimization score
  public static calculateOptimizationScore(
    profile: CreativeProfile,
    recommendations: OptimizationRecommendation[]
  ): number {
    const implementedCount = recommendations.filter(r =>
      r.implementationDifficulty === 'easy'
    ).length;

    const avgFlowScore = profile.flowStateHistory.length > 0
      ? profile.flowStateHistory.reduce((sum, h) =>
          sum + FlowStateDetector.calculateFlowScore(h), 0
        ) / profile.flowStateHistory.length
      : 0;

    const patternStrength = profile.patterns.length > 0
      ? profile.patterns.reduce((sum, p) => sum + p.strength, 0) / profile.patterns.length
      : 0;

    // Profile is used above in avgFlowScore and patternStrength calculations
    return (implementedCount * 20 + avgFlowScore * 0.4 + patternStrength * 0.4);
  }
}

export default CreativeOptimizer;

