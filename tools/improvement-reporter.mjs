#!/usr/bin/env node
/**
 * Improvement Reporter - Generates regular improvement reports
 * Tracks progress, improvements, and system status
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const STATE_FILE = path.join(BASE_DIR, '.continuous-improvement-state.json');
const REPORTS_DIR = path.join(BASE_DIR, 'docs', 'improvement-reports');

class ImprovementReporter {
  constructor() {
    this.ensureReportsDir();
  }

  ensureReportsDir() {
    if (!fs.existsSync(REPORTS_DIR)) {
      fs.mkdirSync(REPORTS_DIR, { recursive: true });
    }
  }

  async generateReport() {
    logger.info('📊 Generating improvement report...');
    
    const state = this.loadState();
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateSummary(state),
      recentCycles: this.getRecentCycles(state),
      improvements: this.analyzeImprovements(state),
      codexEntries: this.countCodexEntries(),
      alignment: this.getAlignmentStatus(),
      remoteStatus: await this.getRemoteStatus(),
      metrics: this.calculateMetrics(state),
      nextActions: this.suggestNextActions(state)
    };

    const reportFile = path.join(REPORTS_DIR, `report-${Date.now()}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf-8');
    
    const markdownReport = this.generateMarkdownReport(report);
    const markdownFile = path.join(REPORTS_DIR, `report-${Date.now()}.md`);
    fs.writeFileSync(markdownFile, markdownReport, 'utf-8');
    
    logger.info(`✅ Report saved: ${markdownFile}`);
    
    return report;
  }

  loadState() {
    try {
      const content = fs.readFileSync(STATE_FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      return { cycles: [], totalImprovements: 0 };
    }
  }

  generateSummary(state) {
    const totalCycles = state.cycles?.length || 0;
    const totalImprovements = state.totalImprovements || 0;
    const recentCycles = state.cycles?.slice(-10) || [];
    const recentImprovements = recentCycles.reduce((sum, cycle) => 
      sum + (cycle.improvements?.length || 0), 0);
    const recentErrors = recentCycles.reduce((sum, cycle) => 
      sum + (cycle.errors?.length || 0), 0);

    return {
      totalCycles,
      totalImprovements,
      recentImprovements,
      recentErrors,
      successRate: recentCycles.length > 0 
        ? ((recentImprovements / (recentImprovements + recentErrors)) * 100).toFixed(1) + '%'
        : 'N/A'
    };
  }

  getRecentCycles(state) {
    return (state.cycles || []).slice(-10).map(cycle => ({
      cycle: cycle.cycle,
      timestamp: cycle.timestamp,
      improvements: cycle.improvements?.length || 0,
      errors: cycle.errors?.length || 0,
      duration: cycle.duration
    }));
  }

  analyzeImprovements(state) {
    const allImprovements = (state.cycles || []).flatMap(cycle => cycle.improvements || []);
    const byPhase = {};
    const byTool = {};

    allImprovements.forEach(imp => {
      const phase = imp.phase || 'unknown';
      byPhase[phase] = (byPhase[phase] || 0) + 1;
      
      const tool = imp.tool || 'unknown';
      byTool[tool] = (byTool[tool] || 0) + 1;
    });

    return {
      total: allImprovements.length,
      byPhase,
      byTool,
      topPhases: Object.entries(byPhase)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
      topTools: Object.entries(byTool)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    };
  }

  countCodexEntries() {
    try {
      const codexDir = path.join(BASE_DIR, 'docs', 'codex-generated');
      if (!fs.existsSync(codexDir)) return 0;
      const files = fs.readdirSync(codexDir).filter(f => f.endsWith('.json'));
      return files.length;
    } catch {
      return 0;
    }
  }

  getAlignmentStatus() {
    try {
      const reportFile = path.join(BASE_DIR, 'docs', 'ALIGNMENT_REPORT.json');
      if (!fs.existsSync(reportFile)) return null;
      const report = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));
      return {
        totalFiles: report.totalFiles || 0,
        aligned: report.aligned?.length || 0,
        misaligned: report.misaligned?.length || 0,
        alignmentScore: report.alignmentScore || 0
      };
    } catch {
      return null;
    }
  }

  async getRemoteStatus() {
    try {
      const { default: AutoPushChanges } = await import('./auto-push-changes.mjs');
      const pusher = new AutoPushChanges();
      const status = await pusher.monitorRemoteWork();
      return status.map(s => ({
        repo: s.repo,
        remotes: s.remotes || {},
        error: s.error || null
      }));
    } catch {
      return [];
    }
  }

  calculateMetrics(state) {
    const cycles = state.cycles || [];
    if (cycles.length === 0) return {};

    const durations = cycles.map(c => c.duration || 0).filter(d => d > 0);
    const avgDuration = durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;

    const improvementsPerCycle = cycles.map(c => (c.improvements || []).length);
    const avgImprovements = improvementsPerCycle.length > 0
      ? improvementsPerCycle.reduce((a, b) => a + b, 0) / improvementsPerCycle.length
      : 0;

    return {
      avgCycleDuration: Math.round(avgDuration),
      avgImprovementsPerCycle: avgImprovements.toFixed(1),
      totalCycles: cycles.length,
      totalImprovements: state.totalImprovements || 0
    };
  }

  suggestNextActions(state) {
    const actions = [];
    const recentCycles = (state.cycles || []).slice(-5);
    const errorCount = recentCycles.reduce((sum, c) => sum + (c.errors?.length || 0), 0);

    if (errorCount > 10) {
      actions.push('High error rate detected - investigate and fix issues');
    }

    const alignment = this.getAlignmentStatus();
    if (alignment && alignment.misaligned > 50) {
      actions.push('Many misaligned files - run alignment cleaning');
    }

    actions.push('Continue organic doubt & research');
    actions.push('Generate more codex entries');
    actions.push('Weave vision throughout');
    actions.push('Improve tools continuously');
    actions.push('Enhance magnum opus');

    return actions;
  }

  generateMarkdownReport(report) {
    return `# Improvement Report

**Generated:** ${new Date(report.timestamp).toLocaleString()}

## Summary

- **Total Cycles:** ${report.summary.totalCycles}
- **Total Improvements:** ${report.summary.totalImprovements}
- **Recent Improvements:** ${report.summary.recentImprovements} (last 10 cycles)
- **Success Rate:** ${report.summary.successRate}

## Recent Activity

${report.recentCycles.map(c => `- Cycle #${c.cycle}: ${c.improvements} improvements, ${c.errors} errors (${(c.duration / 1000).toFixed(1)}s)`).join('\n')}

## Improvements Analysis

- **Total:** ${report.improvements.total}
- **Top Phases:** ${report.improvements.topPhases.map(([phase, count]) => `${phase} (${count})`).join(', ')}
- **Top Tools:** ${report.improvements.topTools.map(([tool, count]) => `${tool} (${count})`).join(', ')}

## Codex Generation

- **Entries Created:** ${report.codexEntries}

## Alignment Status

${report.alignment ? `
- **Total Files:** ${report.alignment.totalFiles}
- **Aligned:** ${report.alignment.aligned}
- **Misaligned:** ${report.alignment.misaligned}
- **Alignment Score:** ${report.alignment.alignmentScore}
` : 'No alignment data available'}

## Remote Status

${report.remoteStatus.map(r => `- **${r.repo}:** ${r.error ? `Error: ${r.error}` : Object.keys(r.remotes).length + ' remotes monitored'}`).join('\n')}

## Metrics

- **Avg Cycle Duration:** ${report.metrics.avgCycleDuration}ms
- **Avg Improvements/Cycle:** ${report.metrics.avgImprovementsPerCycle}
- **Total Cycles:** ${report.metrics.totalCycles}
- **Total Improvements:** ${report.metrics.totalImprovements}

## Next Actions

${report.nextActions.map(a => `- ${a}`).join('\n')}

---

*Report generated automatically by continuous improvement system*
`;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const reporter = new ImprovementReporter();
  reporter.generateReport().catch(err => {
    logger.error(`Error generating report: ${err.message}`);
    process.exit(1);
  });
}

export default ImprovementReporter;

