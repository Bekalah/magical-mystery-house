// ML-Powered Insights System
// Advanced analytics with machine learning predictions

export class MLInsights {
  private data: Array<{
    timestamp: number;
    metrics: any;
    userActions: any[];
    errors: any[];
  }> = [];

  record(data: {
    metrics: any;
    userActions: any[];
    errors: any[];
  }) {
    this.data.push({
      timestamp: Date.now(),
      ...data
    });

    // Keep last 30 days
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    this.data = this.data.filter(d => d.timestamp > thirtyDaysAgo);
  }

  predictTrends(): {
    predictions: Array<{ metric: string; trend: 'increasing' | 'decreasing' | 'stable'; confidence: number }>;
    insights: string[];
  } {
    const predictions = [];
    const insights = [];

    // Analyze error rate trend
    const errorTrend = this.analyzeTrend('errors');
    if (errorTrend.trend === 'increasing' && errorTrend.confidence > 0.7) {
      predictions.push({
        metric: 'error-rate',
        trend: 'increasing',
        confidence: errorTrend.confidence
      });
      insights.push('Error rate is increasing - investigate root causes');
    }

    // Analyze performance trend
    const performanceTrend = this.analyzeTrend('performance');
    if (performanceTrend.trend === 'decreasing' && performanceTrend.confidence > 0.7) {
      predictions.push({
        metric: 'performance',
        trend: 'decreasing',
        confidence: performanceTrend.confidence
      });
      insights.push('Performance is degrading - optimize now');
    }

    // Analyze user engagement
    const engagementTrend = this.analyzeTrend('engagement');
    if (engagementTrend.trend === 'decreasing' && engagementTrend.confidence > 0.6) {
      insights.push('User engagement is decreasing - review UX');
    }

    return { predictions, insights };
  }

  private analyzeTrend(metric: string): {
    trend: 'increasing' | 'decreasing' | 'stable';
    confidence: number;
  } {
    // Simple linear regression for trend analysis
    const recent = this.data.slice(-30);
    if (recent.length < 10) {
      return { trend: 'stable', confidence: 0 };
    }

    // Calculate trend
    const values = recent.map((d, i) => this.getMetricValue(d, metric));
    const slope = this.calculateSlope(values);
    const confidence = Math.abs(slope) * 10;

    if (slope > 0.1) return { trend: 'increasing', confidence: Math.min(1, confidence) };
    if (slope < -0.1) return { trend: 'decreasing', confidence: Math.min(1, Math.abs(confidence)) };
    return { trend: 'stable', confidence: 0 };
  }

  private getMetricValue(data: any, metric: string): number {
    // Extract metric value from data
    if (metric === 'errors') return data.errors?.length || 0;
    if (metric === 'performance') return data.metrics?.responseTime || 0;
    if (metric === 'engagement') return data.userActions?.length || 0;
    return 0;
  }

  private calculateSlope(values: number[]): number {
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, y, i) => sum + i * y, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  }

  getRecommendations(): string[] {
    const trends = this.predictTrends();
    return trends.insights;
  }
}

export const mlInsights = new MLInsights();
