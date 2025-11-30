#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Improvement Insights Tool
 * Generates improvement reports and insights
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';
import { calculateMetrics, loadState } from './experiment-analytics.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const STATE_FILE = path.join(BASE_DIR, '.continuous-improvement-state.json');
const INSIGHTS_DIR = path.join(BASE_DIR, 'docs', 'insights');

logger.info('🔧 IMPROVEMENT: Creating Improvement Insights');
logger.info('   → Generates improvement reports');
logger.info('   → Provides actionable insights');
logger.info('   → Identifies trends and patterns\n');

function ensureInsightsDir() {
  if (!fs.existsSync(INSIGHTS_DIR)) {
    fs.mkdirSync(INSIGHTS_DIR, { recursive: true });
  }
}

function generateInsights(metrics) {
  const insights = {
    recommendations: [],
    warnings: [],
    trends: [],
    opportunities: []
  };

  // Success rate insights
  if (metrics.summary.successRate < 80) {
    insights.warnings.push({
      type: 'low_success_rate',
      message: `Overall success rate is ${metrics.summary.successRate}%, below target of 80%`,
      severity: 'high',
      suggestion: 'Review error patterns and improve tool reliability'
    });
  }

  // Tool performance insights
  const underperformingTools = Object.entries(metrics.toolStats)
    .filter(([_, stats]) => parseFloat(stats.successRate) < 70)
    .sort((a, b) => parseFloat(a[1].successRate) - parseFloat(b[1].successRate))
    .slice(0, 5);

  if (underperformingTools.length > 0) {
    insights.recommendations.push({
      type: 'tool_improvement',
      message: `Found ${underperformingTools.length} underperforming tools`,
      tools: underperformingTools.map(([name, stats]) => ({
        name,
        successRate: stats.successRate,
        runs: stats.runs
      })),
      suggestion: 'Review and fix these tools to improve overall system performance'
    });
  }

  // Error pattern insights
  const topErrors = Object.entries(metrics.errorPatterns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (topErrors.length > 0) {
    insights.warnings.push({
      type: 'recurring_errors',
      message: 'Most common errors detected',
      errors: topErrors.map(([error, count]) => ({ error, count })),
      suggestion: 'Address these recurring errors to improve system stability'
    });
  }

  // Trend analysis
  if (metrics.trend.improvements.length >= 5) {
    const recent = metrics.trend.improvements.slice(-5);
    const earlier = metrics.trend.improvements.slice(0, 5);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
    
    if (recentAvg > earlierAvg * 1.2) {
      insights.trends.push({
        type: 'improving',
        message: 'Improvement rate is increasing',
        trend: 'positive',
        data: { recentAvg, earlierAvg }
      });
    } else if (recentAvg < earlierAvg * 0.8) {
      insights.trends.push({
        type: 'declining',
        message: 'Improvement rate is declining',
        trend: 'negative',
        data: { recentAvg, earlierAvg }
      });
    }
  }

  // Performance opportunities
  const slowTools = Object.entries(metrics.toolStats)
    .filter(([_, stats]) => stats.avgDuration > 30000) // > 30 seconds
    .sort((a, b) => b[1].avgDuration - a[1].avgDuration)
    .slice(0, 5);

  if (slowTools.length > 0) {
    insights.opportunities.push({
      type: 'performance_optimization',
      message: 'Tools with high average duration detected',
      tools: slowTools.map(([name, stats]) => ({
        name,
        avgDuration: (stats.avgDuration / 1000).toFixed(2) + 's',
        runs: stats.runs
      })),
      suggestion: 'Optimize these tools to reduce cycle time'
    });
  }

  // Phase performance insights
  Object.entries(metrics.phaseStats).forEach(([phase, stats]) => {
    const total = stats.successes + stats.failures;
    if (total > 0) {
      const phaseSuccessRate = (stats.successes / total * 100).toFixed(2);
      if (parseFloat(phaseSuccessRate) < 80) {
        insights.recommendations.push({
          type: 'phase_improvement',
          message: `${phase} phase has low success rate: ${phaseSuccessRate}%`,
          phase,
          successRate: phaseSuccessRate,
          suggestion: `Review and improve tools in ${phase} phase`
        });
      }
    }
  });

  return insights;
}

function generateReport(metrics, insights) {
  const timestamp = new Date().toISOString();
  const reportDate = new Date().toLocaleDateString();
  
  let report = `# Improvement Insights Report\n\n`;
  report += `**Generated**: ${reportDate}\n`;
  report += `**Timestamp**: ${timestamp}\n\n`;
  report += `---\n\n`;

  // Summary
  report += `## 📊 Summary\n\n`;
  report += `- **Total Cycles**: ${metrics.summary.totalCycles}\n`;
  report += `- **Success Rate**: ${metrics.summary.successRate}%\n`;
  report += `- **Total Improvements**: ${metrics.summary.totalImprovements}\n`;
  report += `- **Average Duration**: ${(metrics.summary.avgDuration / 1000).toFixed(2)}s\n\n`;

  // Recommendations
  if (insights.recommendations.length > 0) {
    report += `## 💡 Recommendations\n\n`;
    insights.recommendations.forEach((rec, i) => {
      report += `### ${i + 1}. ${rec.message}\n\n`;
      if (rec.tools) {
        report += `**Tools**:\n`;
        rec.tools.forEach(tool => {
          report += `- ${tool.name}: ${tool.successRate}% success rate (${tool.runs} runs)\n`;
        });
        report += `\n`;
      }
      if (rec.suggestion) {
        report += `**Suggestion**: ${rec.suggestion}\n\n`;
      }
    });
  }

  // Warnings
  if (insights.warnings.length > 0) {
    report += `## ⚠️  Warnings\n\n`;
    insights.warnings.forEach((warn, i) => {
      report += `### ${i + 1}. ${warn.message}\n\n`;
      if (warn.errors) {
        report += `**Common Errors**:\n`;
        warn.errors.forEach(err => {
          report += `- ${err.error}: ${err.count} occurrences\n`;
        });
        report += `\n`;
      }
      if (warn.suggestion) {
        report += `**Suggestion**: ${warn.suggestion}\n\n`;
      }
    });
  }

  // Trends
  if (insights.trends.length > 0) {
    report += `## 📈 Trends\n\n`;
    insights.trends.forEach((trend, i) => {
      report += `### ${i + 1}. ${trend.message}\n\n`;
      if (trend.data) {
        report += `- Recent Average: ${trend.data.recentAvg.toFixed(2)}\n`;
        report += `- Earlier Average: ${trend.data.earlierAvg.toFixed(2)}\n\n`;
      }
    });
  }

  // Opportunities
  if (insights.opportunities.length > 0) {
    report += `## 🚀 Opportunities\n\n`;
    insights.opportunities.forEach((opp, i) => {
      report += `### ${i + 1}. ${opp.message}\n\n`;
      if (opp.tools) {
        report += `**Tools to Optimize**:\n`;
        opp.tools.forEach(tool => {
          report += `- ${tool.name}: ${tool.avgDuration} average (${tool.runs} runs)\n`;
        });
        report += `\n`;
      }
      if (opp.suggestion) {
        report += `**Suggestion**: ${opp.suggestion}\n\n`;
      }
    });
  }

  return report;
}

async function main() {
  UserFeedback.section('Improvement Insights');
  
  ensureInsightsDir();

  const state = loadState();
  if (!state) {
    UserFeedback.error('No state file found. Run the continuous improvement runner first.');
    process.exit(1);
  }

  UserFeedback.info('Calculating metrics...');
  const metrics = calculateMetrics(state);
  
  if (metrics.error) {
    UserFeedback.error(metrics.error);
    process.exit(1);
  }

  UserFeedback.info('Generating insights...');
  const insights = generateInsights(metrics);

  UserFeedback.info('Generating report...');
  const report = generateReport(metrics, insights);

  // Save report
  const reportFile = path.join(INSIGHTS_DIR, `insights-${new Date().toISOString().split('T')[0]}.md`);
  fs.writeFileSync(reportFile, report, 'utf-8');

  // Save insights JSON
  const insightsFile = path.join(INSIGHTS_DIR, `insights-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(insightsFile, JSON.stringify({ metrics, insights }, null, 2), 'utf-8');

  UserFeedback.section('Insights Summary');
  logger.info(`Recommendations: ${insights.recommendations.length}`);
  logger.info(`Warnings: ${insights.warnings.length}`);
  logger.info(`Trends: ${insights.trends.length}`);
  logger.info(`Opportunities: ${insights.opportunities.length}`);
  logger.info(`\nReport saved to: ${reportFile}`);
  logger.info(`Insights JSON saved to: ${insightsFile}`);

  UserFeedback.success('Insights report generated successfully');
  logger.info('Insights generated', {
    recommendations: insights.recommendations.length,
    warnings: insights.warnings.length,
    trends: insights.trends.length,
    opportunities: insights.opportunities.length
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateInsights, generateReport };

