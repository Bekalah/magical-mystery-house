/**
 * 🧠✨ ADAPTIVE LEARNING ENGINE
 *
 * Adapts to individual creative patterns and optimizes learning.
 * Personalizes recommendations based on user behavior.
 *
 * @license CC0-1.0 - Public Domain
 */

import type { FlowStateMetrics } from './flow-state-detector';
import type { CreativePattern } from './pattern-recognizer';

export interface LearningProfile {
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'multimodal';
  pace: 'slow' | 'moderate' | 'fast';
  retentionRate: number; // 0-1
  preferredComplexity: 'simple' | 'moderate' | 'complex';
  adaptationSpeed: number; // 0-100
}

export interface LearningRecommendation {
  type: 'technique' | 'content' | 'timing' | 'environment';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedImprovement: number; // 0-100
  implementationSteps: string[];
}

export interface AdaptiveLearningState {
  profile: LearningProfile;
  currentLevel: number; // 0-100
  learningVelocity: number; // rate of improvement
  masteryAreas: string[];
  growthAreas: string[];
  recentBreakthroughs: Array<{
    area: string;
    timestamp: number;
    improvement: number;
  }>;
}

export class AdaptiveLearningEngine {
  private state: AdaptiveLearningState;

  constructor() {
    this.state = this.initializeState();
  }

  private initializeState(): AdaptiveLearningState {
    return {
      profile: {
        learningStyle: 'multimodal',
        pace: 'moderate',
        retentionRate: 0.7,
        preferredComplexity: 'moderate',
        adaptationSpeed: 50
      },
      currentLevel: 0,
      learningVelocity: 1.0,
      masteryAreas: [],
      growthAreas: [],
      recentBreakthroughs: []
    };
  }

  // Analyze learning patterns from creative history
  public analyzeLearningPatterns(
    flowHistory: FlowStateMetrics[],
    creativePatterns: CreativePattern[]
  ): LearningProfile {
    // Analyze flow state patterns
    const avgFlowDepth = flowHistory.length > 0
      ? flowHistory.reduce((sum, f) => sum + f.depth, 0) / flowHistory.length
      : 0;

    // Analyze pattern strength
    const avgPatternStrength = creativePatterns.length > 0
      ? creativePatterns.reduce((sum, p) => sum + p.strength, 0) / creativePatterns.length
      : 0;

    // Determine learning style based on patterns
    let learningStyle: LearningProfile['learningStyle'] = 'multimodal';
    if (avgFlowDepth > 70 && avgPatternStrength > 60) {
      learningStyle = 'visual';
    } else if (avgFlowDepth > 50) {
      learningStyle = 'kinesthetic';
    }

    // Determine pace
    const pace: LearningProfile['pace'] = avgFlowDepth > 60 ? 'fast' : avgFlowDepth > 30 ? 'moderate' : 'slow';

    // Calculate retention rate from pattern frequency
    const retentionRate = Math.min(1, avgPatternStrength / 100);

    // Determine preferred complexity
    const preferredComplexity: LearningProfile['preferredComplexity'] =
      avgPatternStrength > 70 ? 'complex' : avgPatternStrength > 40 ? 'moderate' : 'simple';

    // Calculate adaptation speed
    const adaptationSpeed = Math.min(100, (avgFlowDepth + avgPatternStrength) / 2);

    this.state.profile = {
      learningStyle,
      pace,
      retentionRate,
      preferredComplexity,
      adaptationSpeed
    };

    return this.state.profile;
  }

  // Generate personalized learning recommendations
  public generateRecommendations(
    currentLevel: number,
    targetLevel: number
  ): LearningRecommendation[] {
    const recommendations: LearningRecommendation[] = [];
    const gap = targetLevel - currentLevel;

    if (gap > 20) {
      recommendations.push({
        type: 'technique',
        priority: 'high',
        title: 'Accelerated Learning Path',
        description: `Large gap detected (${gap} levels). Focus on foundational techniques first.`,
        expectedImprovement: 30,
        implementationSteps: [
          'Review fundamental concepts',
          'Practice core techniques daily',
          'Build strong foundation before advancing'
        ]
      });
    }

    if (this.state.profile.learningStyle === 'visual') {
      recommendations.push({
        type: 'content',
        priority: 'medium',
        title: 'Visual Learning Enhancement',
        description: 'Leverage visual learning style with diagrams and visualizations.',
        expectedImprovement: 25,
        implementationSteps: [
          'Use visual aids and diagrams',
          'Create mind maps for concepts',
          'Engage with visual examples'
        ]
      });
    }

    if (this.state.profile.pace === 'fast') {
      recommendations.push({
        type: 'timing',
        priority: 'medium',
        title: 'Fast-Paced Learning Schedule',
        description: 'Optimize for rapid learning with intensive sessions.',
        expectedImprovement: 20,
        implementationSteps: [
          'Schedule intensive learning blocks',
          'Maintain high focus during sessions',
          'Take strategic breaks to prevent burnout'
        ]
      });
    }

    // Growth area recommendations
    for (const area of this.state.growthAreas.slice(0, 2)) {
      recommendations.push({
        type: 'technique',
        priority: 'high',
        title: `Develop ${area}`,
        description: `Focus on developing skills in ${area} area.`,
        expectedImprovement: 35,
        implementationSteps: [
          `Study ${area} fundamentals`,
          `Practice ${area} techniques`,
          `Apply ${area} in creative projects`
        ]
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Update learning state after activity
  public updateLearningState(
    activity: {
      type: string;
      duration: number;
      quality: number;
      improvement: number;
    }
  ): void {
    // Update current level
    this.state.currentLevel = Math.min(100, this.state.currentLevel + activity.improvement);

    // Update learning velocity
    const velocityChange = activity.quality / 100;
    this.state.learningVelocity = Math.min(2.0, this.state.learningVelocity + velocityChange * 0.1);

    // Check for breakthrough
    if (activity.improvement > 10) {
      this.state.recentBreakthroughs.push({
        area: activity.type,
        timestamp: Date.now(),
        improvement: activity.improvement
      });

      // Keep only last 10 breakthroughs
      if (this.state.recentBreakthroughs.length > 10) {
        this.state.recentBreakthroughs.shift();
      }
    }

    // Update mastery/growth areas
    if (activity.quality > 80 && activity.improvement > 5) {
      if (!this.state.masteryAreas.includes(activity.type)) {
        this.state.masteryAreas.push(activity.type);
      }
    } else if (activity.quality < 50 && activity.improvement < 3) {
      if (!this.state.growthAreas.includes(activity.type)) {
        this.state.growthAreas.push(activity.type);
      }
    }
  }

  // Get current learning state
  public getLearningState(): AdaptiveLearningState {
    return { ...this.state };
  }

  // Calculate learning efficiency
  public calculateEfficiency(): number {
    const profileScore = (
      (this.state.profile.retentionRate * 30) +
      (this.state.profile.adaptationSpeed / 100 * 30) +
      (this.state.learningVelocity * 20) +
      (this.state.masteryAreas.length * 5) +
      (this.state.recentBreakthroughs.length * 5)
    );

    return Math.min(100, profileScore);
  }

  // Predict learning trajectory
  public predictTrajectory(targetLevel: number): {
    estimatedTime: number; // hours
    recommendedPace: string;
    milestones: Array<{ level: number; estimatedTime: number }>;
  } {
    const gap = targetLevel - this.state.currentLevel;
    const hoursPerLevel = 10 / this.state.learningVelocity;
    const estimatedTime = gap * hoursPerLevel;

    const milestones: Array<{ level: number; estimatedTime: number }> = [];
    const milestoneLevels = [25, 50, 75, 100];

    for (const level of milestoneLevels) {
      if (level > this.state.currentLevel && level <= targetLevel) {
        const levelGap = level - this.state.currentLevel;
        milestones.push({
          level,
          estimatedTime: levelGap * hoursPerLevel
        });
      }
    }

    const recommendedPace = this.state.profile.pace === 'fast'
      ? 'Intensive daily practice'
      : this.state.profile.pace === 'moderate'
      ? 'Regular consistent practice'
      : 'Steady gradual practice';

    return {
      estimatedTime,
      recommendedPace,
      milestones
    };
  }
}

export default AdaptiveLearningEngine;

