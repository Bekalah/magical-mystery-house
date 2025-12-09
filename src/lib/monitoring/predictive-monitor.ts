// Predictive Monitoring System
// Uses ML patterns to predict issues before they occur

export class PredictiveMonitor {
  private metrics: Array<{
    timestamp: number;
    errorRate: number;
    responseTime: number;
    memoryUsage: number;
    cpuUsage: number;
  }> = [];

  private patterns = {
    errorSpike: { threshold: 0.1, window: 300000 },
    performanceDegradation: { threshold: 2000, window: 600000 },
    memoryLeak: { threshold: 0.8, window: 1800000 }
  };

  recordMetrics(metrics: {
    errorRate: number;
    responseTime: number;
    memoryUsage: number;
    cpuUsage: number;
  }) {
    this.metrics.push({
      timestamp: Date.now(),
      ...metrics
    });

    // Keep only last hour of metrics
    const oneHourAgo = Date.now() - 3600000;
    this.metrics = this.metrics.filter(m => m.timestamp > oneHourAgo);

    // Analyze patterns
    return this.analyzePatterns();
  }

  private analyzePatterns(): {
    predictions: Array<{ type: string; probability: number; action: string }>;
    alerts: string[];
  } {
    const predictions = [];
    const alerts = [];

    // Predict error spike
    const recentErrorRate = this.calculateAverage('errorRate', this.patterns.errorSpike.window);
    if (recentErrorRate > this.patterns.errorSpike.threshold) {
      predictions.push({
        type: 'error-spike',
        probability: this.calculateProbability('errorRate', this.patterns.errorSpike.threshold),
        action: 'Scale up resources or investigate root cause'
      });
      alerts.push('Predicted error spike - take preventive action');
    }

    // Predict performance degradation
    const recentResponseTime = this.calculateAverage('responseTime', this.patterns.performanceDegradation.window);
    if (recentResponseTime > this.patterns.performanceDegradation.threshold) {
      predictions.push({
        type: 'performance-degradation',
        probability: this.calculateProbability('responseTime', this.patterns.performanceDegradation.threshold),
        action: 'Optimize queries or add caching'
      });
      alerts.push('Predicted performance degradation - optimize now');
    }

    // Predict memory leak
    const recentMemory = this.calculateAverage('memoryUsage', this.patterns.memoryLeak.window);
    if (recentMemory > this.patterns.memoryLeak.threshold) {
      predictions.push({
        type: 'memory-leak',
        probability: this.calculateProbability('memoryUsage', this.patterns.memoryLeak.threshold),
        action: 'Investigate memory leaks and optimize'
      });
      alerts.push('Predicted memory leak - investigate immediately');
    }

    return { predictions, alerts };
  }

  private calculateAverage(metric: string, window: number): number {
    const windowStart = Date.now() - window;
    const relevantMetrics = this.metrics.filter(m => m.timestamp > windowStart);
    if (relevantMetrics.length === 0) return 0;
    const sum = relevantMetrics.reduce((acc, m) => acc + (m[metric] || 0), 0);
    return sum / relevantMetrics.length;
  }

  private calculateProbability(metric: string, threshold: number): number {
    const recent = this.metrics.slice(-10);
    const aboveThreshold = recent.filter(m => (m[metric] || 0) > threshold).length;
    return (aboveThreshold / recent.length) * 100;
  }

  getPredictions() {
    return this.analyzePatterns();
  }
}

export const predictiveMonitor = new PredictiveMonitor();
