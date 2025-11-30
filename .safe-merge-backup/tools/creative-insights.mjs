#!/usr/bin/env node
/**
 * Creative Insights Tool
 * 
 * Generates creative process reports
 * Tracks flow state improvements
 * Identifies breakthrough moments
 * Documents creative evolution
 * Shows how improvements enhance creativity
 * Connects improvements to master vision
 * 
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const STATE_FILE = join(process.cwd(), 'experiment-state.json');
const OUTPUT_FILE = join(process.cwd(), 'docs/creative-insights-report.json');

export class CreativeInsights {
  analyzeCreativeProcess() {
    if (!existsSync(STATE_FILE)) {
      return { error: 'No experiment state file found' };
    }

    const state = JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
    const insights = {
      totalCycles: state.currentCycle || 0,
      totalImprovements: state.improvements?.length || 0,
      improvementTypes: this.categorizeImprovements(state.improvements || []),
      flowPatterns: this.analyzeFlowPatterns(state.improvements || []),
      breakthroughMoments: this.findBreakthroughs(state.improvements || []),
      creativeEvolution: this.trackEvolution(state.improvements || []),
      masterVisionAlignment: this.checkVisionAlignment(state.improvements || []),
      recommendations: this.generateRecommendations(state)
    };

    // Save insights
    if (!existsSync(join(process.cwd(), 'docs'))) {
      require('fs').mkdirSync(join(process.cwd(), 'docs'), { recursive: true });
    }
    writeFileSync(OUTPUT_FILE, JSON.stringify(insights, null, 2));

    return insights;
  }

  categorizeImprovements(improvements) {
    const categories = {
      fix: 0,
      enhancement: 0,
      connection: 0,
      documentation: 0,
      optimization: 0
    };

    improvements.forEach(imp => {
      const type = imp.type || 'enhancement';
      categories[type] = (categories[type] || 0) + 1;
    });

    return categories;
  }

  analyzeFlowPatterns(improvements) {
    // Group by time periods
    const patterns = {
      early: improvements.filter(i => i.cycle <= 20).length,
      middle: improvements.filter(i => i.cycle > 20 && i.cycle <= 100).length,
      late: improvements.filter(i => i.cycle > 100).length
    };

    return {
      distribution: patterns,
      peakCycle: this.findPeakCycle(improvements),
      consistency: this.measureConsistency(improvements)
    };
  }

  findPeakCycle(improvements) {
    const cycleCounts = {};
    improvements.forEach(imp => {
      const cycle = imp.cycle || 0;
      cycleCounts[cycle] = (cycleCounts[cycle] || 0) + 1;
    });

    let maxCount = 0;
    let peakCycle = 0;
    for (const [cycle, count] of Object.entries(cycleCounts)) {
      if (count > maxCount) {
        maxCount = count;
        peakCycle = parseInt(cycle);
      }
    }

    return { cycle: peakCycle, improvements: maxCount };
  }

  measureConsistency(improvements) {
    if (improvements.length < 2) return 'insufficient data';
    
    const cycles = improvements.map(i => i.cycle || 0).sort((a, b) => a - b);
    const intervals = [];
    for (let i = 1; i < cycles.length; i++) {
      intervals.push(cycles[i] - cycles[i - 1]);
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, i) => sum + Math.pow(i - avgInterval, 2), 0) / intervals.length;
    
    if (variance < 5) return 'very consistent';
    if (variance < 15) return 'consistent';
    if (variance < 30) return 'moderate';
    return 'variable';
  }

  findBreakthroughs(improvements) {
    // Find cycles with significant improvements
    const significant = improvements.filter(imp => 
      imp.type === 'enhancement' || imp.type === 'connection'
    );

    return significant.slice(0, 5).map(imp => ({
      cycle: imp.cycle,
      timestamp: imp.timestamp,
      description: imp.description,
      impact: 'high'
    }));
  }

  trackEvolution(improvements) {
    const evolution = {
      early: improvements.filter(i => i.cycle <= 20).map(i => i.type),
      middle: improvements.filter(i => i.cycle > 20 && i.cycle <= 100).map(i => i.type),
      late: improvements.filter(i => i.cycle > 100).map(i => i.type)
    };

    return {
      phases: evolution,
      progression: this.analyzeProgression(evolution)
    };
  }

  analyzeProgression(evolution) {
    const earlyTypes = new Set(evolution.early);
    const lateTypes = new Set(evolution.late);
    
    return {
      maintained: [...earlyTypes].filter(t => lateTypes.has(t)),
      evolved: [...lateTypes].filter(t => !earlyTypes.has(t)),
      dropped: [...earlyTypes].filter(t => !lateTypes.has(t))
    };
  }

  checkVisionAlignment(improvements) {
    const visionKeywords = [
      'sacred geometry', 'golden ratio', 'fibonacci',
      'trauma-aware', 'museum-grade', 'trinity',
      'egregore', 'codex', 'circuitum', 'grimoire'
    ];

    const aligned = improvements.filter(imp => {
      const desc = (imp.description || '').toLowerCase();
      return visionKeywords.some(keyword => desc.includes(keyword));
    });

    return {
      aligned: aligned.length,
      total: improvements.length,
      percentage: improvements.length > 0 ? (aligned.length / improvements.length * 100).toFixed(1) : 0
    };
  }

  generateRecommendations(state) {
    const recommendations = [];

    const improvements = state.improvements || [];
    if (improvements.length < 10) {
      recommendations.push('Continue improvement cycles to build momentum');
    }

    const fixCount = improvements.filter(i => i.type === 'fix').length;
    const enhancementCount = improvements.filter(i => i.type === 'enhancement').length;
    
    if (fixCount > enhancementCount * 2) {
      recommendations.push('Consider more enhancement-focused improvements');
    }

    if (state.currentCycle && state.currentCycle > 50) {
      recommendations.push('Review and consolidate improvements for coherence');
    }

    return recommendations;
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const insights = new CreativeInsights();
  const result = insights.analyzeCreativeProcess();
  console.log(JSON.stringify(result, null, 2));
}

export default CreativeInsights;

