// AI-Powered Code Analysis System
// Advanced static analysis with pattern recognition and optimization suggestions

export class AICodeAnalyzer {
  private patterns = {
    performance: [
      /useMemo|useCallback|React.memo/gi,
      /.map().filter()/g,
      /fors*([^)]+)s*{[^}]*.push(/g
    ],
    security: [
      /eval(/g,
      /innerHTMLs*=/g,
      /dangerouslySetInnerHTML/g,
      /localStorage.setItem([^,]+,s*[^)]*)/g
    ],
    bestPractices: [
      /console.log(/g,
      /anys+/g,
      /@ts-ignore/g,
      /eslint-disable/g
    ]
  };

  analyze(code: string, filePath: string) {
    const issues = [];
    const suggestions = [];
    const metrics = {
      complexity: this.calculateComplexity(code),
      maintainability: this.calculateMaintainability(code),
      performance: this.analyzePerformance(code),
      security: this.analyzeSecurity(code)
    };

    // Pattern detection
    for (const [category, patterns] of Object.entries(this.patterns)) {
      patterns.forEach(pattern => {
        const matches = code.match(pattern);
        if (matches) {
          issues.push({
            category,
            pattern: pattern.toString(),
            count: matches.length,
            severity: this.calculateSeverity(category, matches.length)
          });
        }
      });
    });

    // Generate AI-powered suggestions
    suggestions.push(...this.generateSuggestions(metrics, issues));

    return {
      file: filePath,
      metrics,
      issues,
      suggestions,
      score: this.calculateScore(metrics, issues),
      timestamp: new Date().toISOString()
    };
  }

  private calculateComplexity(code: string): number {
    const cyclomatic = (code.match(/if|else|for|while|switch|case|catch/g) || []).length;
    const nesting = this.calculateNesting(code);
    return cyclomatic + nesting;
  }

  private calculateNesting(code: string): number {
    let maxDepth = 0;
    let currentDepth = 0;
    for (const char of code) {
      if (char === '{') {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
      } else if (char === '}') {
        currentDepth--;
      }
    }
    return maxDepth;
  }

  private calculateMaintainability(code: string): number {
    const lines = code.split('\n').length;
    const comments = (code.match(/\/\/|\/\*|\*\//g) || []).length;
    const functions = (code.match(/function|const\s+\w+\s*=\s*\(/g) || []).length;
    return Math.max(0, 100 - (lines / 10) - (functions / 2) + (comments / 5));
  }

  private analyzePerformance(code: string): {
    score: number;
    issues: string[];
  } {
    const issues = [];
    let score = 100;

    // Check for performance anti-patterns
    if (code.includes('.map(') && code.includes('.filter(') && code.includes('.map(')) {
      issues.push('Multiple array iterations - consider combining');
      score -= 20;
    }

    if (code.includes('useEffect') && !code.includes('dependencies')) {
      issues.push('Missing useEffect dependencies');
      score -= 15;
    }

    if (code.includes('inline style') && code.match(/style=\{\{/g)?.length > 3) {
      issues.push('Multiple inline styles - extract to CSS');
      score -= 10;
    }

    return { score, issues };
  }

  private analyzeSecurity(code: string): {
    score: number;
    vulnerabilities: string[];
  } {
    const vulnerabilities = [];
    let score = 100;

    if (code.includes('eval(')) {
      vulnerabilities.push('CRITICAL: eval() usage detected');
      score = 0;
    }

    if (code.includes('dangerouslySetInnerHTML')) {
      vulnerabilities.push('HIGH: dangerouslySetInnerHTML usage');
      score -= 30;
    }

    if (code.match(/password|secret|key.*=.*['"][^'"]+['"]/gi)) {
      vulnerabilities.push('HIGH: Hardcoded credentials detected');
      score -= 40;
    }

    return { score, vulnerabilities };
  }

  private calculateSeverity(category: string, count: number): 'low' | 'medium' | 'high' {
    if (category === 'security' && count > 0) return 'high';
    if (count > 5) return 'high';
    if (count > 2) return 'medium';
    return 'low';
  }

  private generateSuggestions(metrics: any, issues: any[]): string[] {
    const suggestions = [];

    if (metrics.complexity > 20) {
      suggestions.push('Consider refactoring to reduce cyclomatic complexity');
    }

    if (metrics.maintainability < 50) {
      suggestions.push('Add comments and documentation to improve maintainability');
    }

    if (metrics.performance.score < 70) {
      suggestions.push(...metrics.performance.issues.map(i => `Performance: ${i}`));
    }

    if (metrics.security.score < 70) {
      suggestions.push(...metrics.security.vulnerabilities.map(v => `Security: ${v}`));
    }

    return suggestions;
  }

  private calculateScore(metrics: any, issues: any[]): number {
    let score = 100;
    score -= (metrics.complexity / 10);
    score -= ((100 - metrics.maintainability) / 10);
    score -= ((100 - metrics.performance.score) / 5);
    score -= ((100 - metrics.security.score) / 2);
    score -= (issues.length * 2);
    return Math.max(0, Math.min(100, score));
  }
}

export const aiCodeAnalyzer = new AICodeAnalyzer();
