/**
 * 🔍✨ PATTERN RECOGNIZER
 *
 * Advanced pattern recognition for creative optimization.
 * Identifies personal patterns, tendencies, and optimization opportunities.
 *
 * @license CC0-1.0 - Public Domain
 */

export interface CreativePattern {
  id: string;
  name: string;
  frequency: number; // 0-1
  strength: number; // 0-100
  context: string[];
  outcomes: string[];
  optimizationPotential: number; // 0-100
}

export interface CreativeTendency {
  type: 'temporal' | 'spatial' | 'thematic' | 'methodological';
  description: string;
  confidence: number; // 0-1
  examples: string[];
}

export interface PatternInsight {
  pattern: CreativePattern;
  insight: string;
  recommendation: string;
  expectedImpact: 'low' | 'medium' | 'high';
}

export class PatternRecognizer {
  // Recognize patterns from creative history
  public static recognizePatterns(
    creativeHistory: Array<{
      timestamp: number;
      activity: string;
      context: Record<string, any>;
      outcome: string;
    }>
  ): CreativePattern[] {
    const patterns: Map<string, CreativePattern> = new Map();

    // Group by activity type
    const activityGroups = new Map<string, typeof creativeHistory>();
    for (const entry of creativeHistory) {
      if (!activityGroups.has(entry.activity)) {
        activityGroups.set(entry.activity, []);
      }
      activityGroups.get(entry.activity)!.push(entry);
    }

    // Analyze each activity group
    for (const [activity, entries] of activityGroups) {
      const frequency = entries.length / creativeHistory.length;
      const contexts = [...new Set(entries.flatMap(e => Object.keys(e.context)))];
      const outcomes = [...new Set(entries.map(e => e.outcome))];

      // Calculate strength based on consistency
      const strength = PatternRecognizer.calculateStrength(entries);

      // Estimate optimization potential
      const optimizationPotential = PatternRecognizer.estimateOptimizationPotential(
        frequency,
        strength,
        outcomes
      );

      patterns.set(activity, {
        id: `pattern_${activity}`,
        name: activity,
        frequency,
        strength,
        context: contexts,
        outcomes,
        optimizationPotential
      });
    }

    return Array.from(patterns.values());
  }

  // Calculate pattern strength
  private static calculateStrength(
    entries: Array<{ context: Record<string, any>; outcome: string }>
  ): number {
    if (entries.length < 2) {
      return 50; // Default moderate strength
    }

    // Check consistency of outcomes
    const outcomeCounts = new Map<string, number>();
    for (const entry of entries) {
      outcomeCounts.set(entry.outcome, (outcomeCounts.get(entry.outcome) || 0) + 1);
    }

    const maxCount = Math.max(...outcomeCounts.values());
    const consistency = maxCount / entries.length;

    // Check context similarity
    const contextSimilarity = PatternRecognizer.calculateContextSimilarity(entries);

    return (consistency * 0.6 + contextSimilarity * 0.4) * 100;
  }

  // Calculate context similarity
  private static calculateContextSimilarity(
    entries: Array<{ context: Record<string, any> }>
  ): number {
    if (entries.length < 2) {
      return 0.5;
    }

    const allKeys = new Set<string>();
    for (const entry of entries) {
      Object.keys(entry.context).forEach(k => allKeys.add(k));
    }

    let similaritySum = 0;
    let comparisons = 0;

    for (let i = 0; i < entries.length - 1; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        let matches = 0;
        for (const key of allKeys) {
          if (entries[i].context[key] === entries[j].context[key]) {
            matches++;
          }
        }
        similaritySum += matches / allKeys.size;
        comparisons++;
      }
    }

    return comparisons > 0 ? similaritySum / comparisons : 0.5;
  }

  // Estimate optimization potential
  private static estimateOptimizationPotential(
    frequency: number,
    strength: number,
    outcomes: string[]
  ): number {
    // High frequency + high strength = good optimization candidate
    const frequencyScore = frequency * 50;
    const strengthScore = strength * 0.5;
    const outcomeDiversity = Math.min(1, outcomes.length / 5) * 20;

    return Math.min(100, frequencyScore + strengthScore + outcomeDiversity);
  }

  // Identify creative tendencies
  public static identifyTendencies(
    patterns: CreativePattern[]
  ): CreativeTendency[] {
    const tendencies: CreativeTendency[] = [];

    // Temporal tendencies
    const temporalPatterns = patterns.filter(p =>
      p.context.some(c => c.includes('time') || c.includes('schedule'))
    );
    if (temporalPatterns.length > 0) {
      tendencies.push({
        type: 'temporal',
        description: 'Strong time-based creative patterns detected',
        confidence: temporalPatterns.length / patterns.length,
        examples: temporalPatterns.map(p => p.name)
      });
    }

    // Thematic tendencies
    const thematicPatterns = patterns.filter(p =>
      p.outcomes.some(o => o.includes('theme') || o.includes('topic'))
    );
    if (thematicPatterns.length > 0) {
      tendencies.push({
        type: 'thematic',
        description: 'Recurring thematic patterns in creative work',
        confidence: thematicPatterns.length / patterns.length,
        examples: thematicPatterns.map(p => p.name)
      });
    }

    // Methodological tendencies
    const methodologicalPatterns = patterns.filter(p =>
      p.name.includes('method') || p.name.includes('approach')
    );
    if (methodologicalPatterns.length > 0) {
      tendencies.push({
        type: 'methodological',
        description: 'Consistent methodological approaches',
        confidence: methodologicalPatterns.length / patterns.length,
        examples: methodologicalPatterns.map(p => p.name)
      });
    }

    return tendencies;
  }

  // Generate pattern insights
  public static generateInsights(
    patterns: CreativePattern[]
  ): PatternInsight[] {
    const insights: PatternInsight[] = [];

    // Sort by optimization potential
    const sortedPatterns = [...patterns].sort(
      (a, b) => b.optimizationPotential - a.optimizationPotential
    );

    // Generate insights for top patterns
    for (const pattern of sortedPatterns.slice(0, 5)) {
      const insight = PatternRecognizer.generateInsightForPattern(pattern);
      insights.push(insight);
    }

    return insights;
  }

  // Generate insight for a specific pattern
  private static generateInsightForPattern(
    pattern: CreativePattern
  ): PatternInsight {
    let insight = '';
    let recommendation = '';
    let expectedImpact: 'low' | 'medium' | 'high' = 'medium';

    if (pattern.frequency > 0.7 && pattern.strength > 70) {
      insight = `Strong, frequent pattern: ${pattern.name} appears consistently with high strength.`;
      recommendation = 'Leverage this pattern for predictable creative outcomes.';
      expectedImpact = 'high';
    } else if (pattern.frequency < 0.3 && pattern.strength > 60) {
      insight = `Infrequent but strong pattern: ${pattern.name} shows high quality when it occurs.`;
      recommendation = 'Explore ways to increase frequency of this high-quality pattern.';
      expectedImpact = 'medium';
    } else if (pattern.optimizationPotential > 80) {
      insight = `High optimization potential: ${pattern.name} could be enhanced significantly.`;
      recommendation = 'Focus optimization efforts on this pattern for maximum impact.';
      expectedImpact = 'high';
    } else {
      insight = `Pattern detected: ${pattern.name} with moderate characteristics.`;
      recommendation = 'Continue monitoring and refining this pattern.';
      expectedImpact = 'low';
    }

    return {
      pattern,
      insight,
      recommendation,
      expectedImpact
    };
  }
}

export default PatternRecognizer;

