// Real-Time Learning System
// 1000000x: Systems that learn and adapt in real-time

export class RealTimeLearningSystem {
  private knowledgeBase: Map<string, any> = new Map();
  private patterns: Map<string, number> = new Map();
  private adaptations: Array<{ context: string; action: string; result: number }> = [];

  learn(context: string, action: string, result: number) {
    const key = `${context}:${action}`;
    
    // Update knowledge base
    if (!this.knowledgeBase.has(key)) {
      this.knowledgeBase.set(key, { count: 0, totalResult: 0, averageResult: 0 });
    }
    
    const knowledge = this.knowledgeBase.get(key);
    knowledge.count++;
    knowledge.totalResult += result;
    knowledge.averageResult = knowledge.totalResult / knowledge.count;
    
    // Update patterns
    const patternKey = context;
    this.patterns.set(patternKey, (this.patterns.get(patternKey) || 0) + 1);
    
    // Store adaptation
    this.adaptations.push({ context, action, result });
    
    // Keep only recent adaptations (last 10000)
    if (this.adaptations.length > 10000) {
      this.adaptations = this.adaptations.slice(-10000);
    }
  }

  predict(context: string): {
    bestAction: string;
    confidence: number;
    alternatives: Array<{ action: string; expectedResult: number }>;
  } {
    // Find best action based on learned knowledge
    const relevantKnowledge = Array.from(this.knowledgeBase.entries())
      .filter(([key]) => key.startsWith(context + ':'))
      .map(([key, value]) => ({
        action: key.split(':')[1],
        expectedResult: value.averageResult,
        confidence: Math.min(1, value.count / 10)
      }))
      .sort((a, b) => b.expectedResult - a.expectedResult);

    if (relevantKnowledge.length === 0) {
      return {
        bestAction: 'default',
        confidence: 0,
        alternatives: []
      };
    }

    return {
      bestAction: relevantKnowledge[0].action,
      confidence: relevantKnowledge[0].confidence,
      alternatives: relevantKnowledge.slice(1, 5)
    };
  }

  adapt(currentState: any, goal: any): {
    adaptations: string[];
    expectedImprovement: number;
  } {
    const context = this.extractContext(currentState);
    const prediction = this.predict(context);
    
    const adaptations = [
      `Apply action: ${prediction.bestAction}`,
      `Expected improvement: ${prediction.confidence * 100}%`,
      `Based on ${this.adaptations.length} learned experiences`
    ];

    return {
      adaptations,
      expectedImprovement: prediction.confidence * 100
    };
  }

  private extractContext(state: any): string {
    // Extract relevant context from state
    return JSON.stringify(state).slice(0, 100);
  }

  getKnowledgeSummary() {
    return {
      totalKnowledge: this.knowledgeBase.size,
      totalPatterns: this.patterns.size,
      totalAdaptations: this.adaptations.length,
      topPatterns: Array.from(this.patterns.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([pattern, count]) => ({ pattern, count }))
    };
  }
}

export const realTimeLearningSystem = new RealTimeLearningSystem();
