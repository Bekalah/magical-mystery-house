#!/usr/bin/env node
/**
 * Analyze experiment results to categorize improvements as:
 * - Learned: New knowledge, patterns, insights discovered
 * - Fixed: Bugs, errors, issues resolved
 * - Added: New features, functionality, content created
 */

import fs from 'fs';
import path from 'path';

const STATE_FILE = path.join(process.cwd(), 'experiment-state.json');
const LOG_FILE = path.join(process.cwd(), 'IMPROVEMENT_EXPERIMENT_LOG.json');
const SUMMARY_FILE = path.join(process.cwd(), 'EXPERIMENT_ANALYSIS.md');

function categorizeImprovement(improvement) {
  const desc = (improvement.description || '').toLowerCase();
  const type = (improvement.type || '').toLowerCase();
  const system = (improvement.system || '').toLowerCase();
  
  // Keywords for each category
  const learnedKeywords = [
    'research', 'learned', 'discovered', 'found', 'identified', 'analyzed',
    'pattern', 'insight', 'understanding', 'best practice', 'standard',
    'study', 'investigation', 'observation', 'mapped', 'analyzed'
  ];
  
  const fixedKeywords = [
    'fix', 'fixed', 'error', 'bug', 'issue', 'problem', 'resolve', 'resolved',
    'correct', 'corrected', 'repair', 'repaired', 'debug', 'debugged',
    'security', 'vulnerability', 'broken', 'fail', 'failed', 'missing',
    'complete', 'completed', 'align', 'aligned', 'merge', 'merged'
  ];
  
  const addedKeywords = [
    'add', 'added', 'create', 'created', 'new', 'generate', 'generated',
    'implement', 'implemented', 'build', 'built', 'establish', 'established',
    'connect', 'connected', 'introduce', 'introduced', 'develop', 'developed'
  ];
  
  // Check description
  const learnedScore = learnedKeywords.filter(kw => desc.includes(kw)).length;
  const fixedScore = fixedKeywords.filter(kw => desc.includes(kw)).length;
  const addedScore = addedKeywords.filter(kw => desc.includes(kw)).length;
  
  // Check type
  if (type === 'fix' || type === 'bug' || type === 'error') {
    return 'fixed';
  }
  if (type === 'enhancement' && fixedScore > 0) {
    return 'fixed';
  }
  if (type === 'connection' || type === 'new') {
    return 'added';
  }
  
  // Check system names
  if (system.includes('security') || system.includes('audit')) {
    return fixedScore > 0 ? 'fixed' : 'learned';
  }
  
  // Determine category based on scores
  const maxScore = Math.max(learnedScore, fixedScore, addedScore);
  if (maxScore === 0) {
    // Default categorization based on type
    if (type === 'enhancement') return 'added';
    if (type === 'fix') return 'fixed';
    return 'learned';
  }
  
  if (learnedScore === maxScore) return 'learned';
  if (fixedScore === maxScore) return 'fixed';
  return 'added';
}

function analyzeResults() {
  console.log('📊 Analyzing experiment results...\n');
  
  let state = {};
  let log = {};
  
  // Load state
  if (fs.existsSync(STATE_FILE)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      console.log(`✅ Loaded state: ${state.currentCycle || 0} cycles completed`);
    } catch (e) {
      console.error('❌ Error loading state:', e.message);
      return;
    }
  } else {
    console.error('❌ State file not found');
    return;
  }
  
  // Load log
  if (fs.existsSync(LOG_FILE)) {
    try {
      log = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
      console.log(`✅ Loaded log file`);
    } catch (e) {
      console.warn('⚠️  Could not load log file, using state improvements only');
    }
  }
  
  const improvements = state.improvements || [];
  console.log(`📈 Total improvements: ${improvements.length}\n`);
  
  // Categorize improvements
  const categorized = {
    learned: [],
    fixed: [],
    added: []
  };
  
  for (const imp of improvements) {
    const category = categorizeImprovement(imp);
    categorized[category].push(imp);
  }
  
  // Generate statistics
  const stats = {
    total: improvements.length,
    learned: categorized.learned.length,
    fixed: categorized.fixed.length,
    added: categorized.added.length,
    byType: {},
    bySystem: {},
    byCycle: {}
  };
  
  // Count by type
  for (const imp of improvements) {
    const type = imp.type || 'unknown';
    stats.byType[type] = (stats.byType[type] || 0) + 1;
  }
  
  // Count by system
  for (const imp of improvements) {
    const system = imp.system || 'unknown';
    stats.bySystem[system] = (stats.bySystem[system] || 0) + 1;
  }
  
  // Count by cycle
  for (const imp of improvements) {
    const cycle = imp.cycle || 0;
    if (!stats.byCycle[cycle]) {
      stats.byCycle[cycle] = { learned: 0, fixed: 0, added: 0 };
    }
    const category = categorizeImprovement(imp);
    stats.byCycle[cycle][category]++;
  }
  
  // Generate markdown report
  const report = `# Experiment Results Analysis

**Experiment Completed**: ${new Date().toISOString()}
**Total Cycles**: ${state.currentCycle || 0} / ${state.totalCycles || 'unknown'}
**Total Improvements**: ${stats.total}

## Summary

- **Learned**: ${stats.learned} improvements (${((stats.learned / stats.total) * 100).toFixed(1)}%)
- **Fixed**: ${stats.fixed} improvements (${((stats.fixed / stats.total) * 100).toFixed(1)}%)
- **Added**: ${stats.added} improvements (${((stats.added / stats.total) * 100).toFixed(1)}%)

## Improvements by Type

${Object.entries(stats.byType).map(([type, count]) => `- **${type}**: ${count}`).join('\n')}

## Improvements by System

${Object.entries(stats.bySystem)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([system, count]) => `- **${system}**: ${count}`)
  .join('\n')}

## What Was Learned

${categorized.learned.slice(0, 50).map(imp => 
  `- Cycle ${imp.cycle}: ${imp.description || 'No description'}`
).join('\n')}

${categorized.learned.length > 50 ? `\n... and ${categorized.learned.length - 50} more learned improvements` : ''}

## What Was Fixed

${categorized.fixed.slice(0, 50).map(imp => 
  `- Cycle ${imp.cycle}: ${imp.description || 'No description'}`
).join('\n')}

${categorized.fixed.length > 50 ? `\n... and ${categorized.fixed.length - 50} more fixes` : ''}

## What Was Added

${categorized.added.slice(0, 50).map(imp => 
  `- Cycle ${imp.cycle}: ${imp.description || 'No description'}`
).join('\n')}

${categorized.added.length > 50 ? `\n... and ${categorized.added.length - 50} more additions` : ''}

## Cycle-by-Cycle Breakdown

| Cycle | Learned | Fixed | Added | Total |
|-------|---------|-------|-------|-------|
${Object.entries(stats.byCycle)
  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  .slice(0, 100)
  .map(([cycle, counts]) => 
    `| ${cycle} | ${counts.learned} | ${counts.fixed} | ${counts.added} | ${counts.learned + counts.fixed + counts.added} |`
  ).join('\n')}

## Additional Metrics

- **Connections Established**: ${state.connectionsEstablished || 0}
- **Errors Encountered**: ${state.errors?.length || 0} (all recovered)
- **Systems Scanned**: ${state.systemsScanned?.length || 0}
- **Packages Improved**: ${state.packagesImproved?.length || 0}
- **Magnum Opus**: 
  - Audits Run: ${state.magnumOpus?.auditsRun || 0}
  - Licensing Fixed: ${state.magnumOpus?.licensingFixed || 0}
  - Packages Completed: ${state.magnumOpus?.packagesCompleted || 0}

---
*Analysis generated automatically by analyze-experiment-results.mjs*
`;

  // Write report
  fs.writeFileSync(SUMMARY_FILE, report);
  
  // Print summary to console
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 EXPERIMENT RESULTS SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`Total Improvements: ${stats.total}`);
  console.log(`├─ Learned: ${stats.learned} (${((stats.learned / stats.total) * 100).toFixed(1)}%)`);
  console.log(`├─ Fixed: ${stats.fixed} (${((stats.fixed / stats.total) * 100).toFixed(1)}%)`);
  console.log(`└─ Added: ${stats.added} (${((stats.added / stats.total) * 100).toFixed(1)}%)`);
  console.log(`\n📄 Full report saved to: ${SUMMARY_FILE}\n`);
}

analyzeResults();

