#!/usr/bin/env node
/**
 * Detailed Comparison Report - Comprehensive analysis of all rounds
 * Runs continuously and generates detailed comparison reports
 * @license CC0-1.0
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';

const STATE_FILE = 'experiment-state.json';
const ANALYSIS_FILE = 'live-round-analysis.json';
const REPORT_FILE = 'DETAILED_COMPARISON_REPORT.md';
const JSON_REPORT = 'detailed-comparison-report.json';

// Load data
const loadData = () => {
  let state = null;
  let analysis = null;
  
  try {
    state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch (e) {
    console.error('Could not load state file');
  }
  
  try {
    analysis = JSON.parse(readFileSync(ANALYSIS_FILE, 'utf8'));
  } catch (e) {
    console.error('Could not load analysis file');
  }
  
  return { state, analysis };
};

// Generate detailed comparison
const generateDetailedComparison = (state, analysis) => {
  const report = {
    timestamp: new Date().toISOString(),
    rounds: {},
    comparisons: {},
    learnings: {
      technical: [],
      aboutUser: [],
      aboutWork: []
    },
    packages: {
      round1: [],
      round2: [],
      round3: [],
      all: [],
      common: [],
      unique: {}
    },
    tools: {
      round1: [],
      round2: [],
      round3: [],
      all: [],
      common: [],
      unique: {}
    },
    engines: {
      round1: [],
      round2: [],
      round3: [],
      all: [],
      common: [],
      unique: {}
    }
  };
  
  // Process each round
  Object.entries(analysis.rounds || {}).forEach(([roundName, roundData]) => {
    if (roundData.summary) {
      report.rounds[roundName] = {
        cycles: roundData.cycles,
        intervalMinutes: roundData.intervalMinutes,
        cyclesRun: roundData.summary.cyclesRun || 0,
        improvements: roundData.summary.improvements || 0,
        improvementsAdded: roundData.summary.improvementsAdded || 0,
        packages: roundData.summary.packagesWorkedOn || [],
        tools: roundData.summary.toolsWorkedOn || [],
        engines: roundData.summary.enginesWorkedOn || [],
        systems: roundData.summary.systemsWorkedOn || [],
        connections: roundData.summary.connectionsEstablished || 0,
        learnings: roundData.summary.learnings || [],
        userInsights: roundData.summary.userInsights || [],
        workInsights: roundData.summary.workInsights || []
      };
      
      // Collect learnings
      report.learnings.technical.push(...(roundData.summary.learnings || []));
      report.learnings.aboutUser.push(...(roundData.summary.userInsights || []));
      report.learnings.aboutWork.push(...(roundData.summary.workInsights || []));
      
      // Collect packages/tools/engines by round
      if (roundName === 'Round 1') {
        report.packages.round1 = roundData.summary.packagesWorkedOn || [];
        report.tools.round1 = roundData.summary.toolsWorkedOn || [];
        report.engines.round1 = roundData.summary.enginesWorkedOn || [];
      } else if (roundName === 'Round 2') {
        report.packages.round2 = roundData.summary.packagesWorkedOn || [];
        report.tools.round2 = roundData.summary.toolsWorkedOn || [];
        report.engines.round2 = roundData.summary.enginesWorkedOn || [];
      } else if (roundName === 'Round 3') {
        report.packages.round3 = roundData.summary.packagesWorkedOn || [];
        report.tools.round3 = roundData.summary.toolsWorkedOn || [];
        report.engines.round3 = roundData.summary.enginesWorkedOn || [];
      }
    }
  });
  
  // Find common and unique items
  const allPackages = [...new Set([
    ...report.packages.round1,
    ...report.packages.round2,
    ...report.packages.round3
  ])];
  report.packages.all = allPackages;
  report.packages.common = allPackages.filter(p => 
    report.packages.round1.includes(p) && 
    report.packages.round2.includes(p) && 
    report.packages.round3.includes(p)
  );
  
  // Unique to each round
  report.packages.unique.round1 = report.packages.round1.filter(p => 
    !report.packages.round2.includes(p) && !report.packages.round3.includes(p)
  );
  report.packages.unique.round2 = report.packages.round2.filter(p => 
    !report.packages.round1.includes(p) && !report.packages.round3.includes(p)
  );
  report.packages.unique.round3 = report.packages.round3.filter(p => 
    !report.packages.round1.includes(p) && !report.packages.round2.includes(p)
  );
  
  // Same for tools
  const allTools = [...new Set([
    ...report.tools.round1,
    ...report.tools.round2,
    ...report.tools.round3
  ])];
  report.tools.all = allTools;
  report.tools.common = allTools.filter(t => 
    report.tools.round1.includes(t) && 
    report.tools.round2.includes(t) && 
    report.tools.round3.includes(t)
  );
  report.tools.unique.round1 = report.tools.round1.filter(t => 
    !report.tools.round2.includes(t) && !report.tools.round3.includes(t)
  );
  report.tools.unique.round2 = report.tools.round2.filter(t => 
    !report.tools.round1.includes(t) && !report.tools.round3.includes(t)
  );
  report.tools.unique.round3 = report.tools.round3.filter(t => 
    !report.tools.round1.includes(t) && !report.tools.round2.includes(t)
  );
  
  // Same for engines
  const allEngines = [...new Set([
    ...report.engines.round1,
    ...report.engines.round2,
    ...report.engines.round3
  ])];
  report.engines.all = allEngines;
  report.engines.common = allEngines.filter(e => 
    report.engines.round1.includes(e) && 
    report.engines.round2.includes(e) && 
    report.engines.round3.includes(e)
  );
  report.engines.unique.round1 = report.engines.round1.filter(e => 
    !report.engines.round2.includes(e) && !report.engines.round3.includes(e)
  );
  report.engines.unique.round2 = report.engines.round2.filter(e => 
    !report.engines.round1.includes(e) && !report.engines.round3.includes(e)
  );
  report.engines.unique.round3 = report.engines.round3.filter(e => 
    !report.engines.round1.includes(e) && !report.engines.round2.includes(e)
  );
  
  // Generate comparisons
  if (report.rounds['Round 1'] && report.rounds['Round 2']) {
    const r1 = report.rounds['Round 1'];
    const r2 = report.rounds['Round 2'];
    
    report.comparisons.round1_vs_round2 = {
      cyclesDifference: r2.cyclesRun - r1.cyclesRun,
      improvementsDifference: r2.improvements - r1.improvements,
      connectionsDifference: r2.connections - r1.connections,
      newPackages: r2.packages.filter(p => !r1.packages.includes(p)),
      newTools: r2.tools.filter(t => !r1.tools.includes(t)),
      newEngines: r2.engines.filter(e => !r1.engines.includes(e)),
      commonPackages: r1.packages.filter(p => r2.packages.includes(p)),
      commonTools: r1.tools.filter(t => r2.tools.includes(t)),
      commonEngines: r1.engines.filter(e => r2.engines.includes(e)),
      newLearnings: r2.learnings.filter(l => !r1.learnings.includes(l)),
      newUserInsights: r2.userInsights.filter(u => !r1.userInsights.includes(u)),
      newWorkInsights: r2.workInsights.filter(w => !r1.workInsights.includes(w))
    };
  }
  
  if (report.rounds['Round 2'] && report.rounds['Round 3']) {
    const r2 = report.rounds['Round 2'];
    const r3 = report.rounds['Round 3'];
    
    report.comparisons.round2_vs_round3 = {
      cyclesDifference: r3.cyclesRun - r2.cyclesRun,
      improvementsDifference: r3.improvements - r2.improvements,
      connectionsDifference: r3.connections - r2.connections,
      newPackages: r3.packages.filter(p => !r2.packages.includes(p)),
      newTools: r3.tools.filter(t => !r2.tools.includes(t)),
      newEngines: r3.engines.filter(e => !r2.engines.includes(e)),
      commonPackages: r2.packages.filter(p => r3.packages.includes(p)),
      commonTools: r2.tools.filter(t => r3.tools.includes(t)),
      commonEngines: r2.engines.filter(e => r3.engines.includes(e)),
      newLearnings: r3.learnings.filter(l => !r2.learnings.includes(l)),
      newUserInsights: r3.userInsights.filter(u => !r2.userInsights.includes(u)),
      newWorkInsights: r3.workInsights.filter(w => !r2.workInsights.includes(w))
    };
  }
  
  if (report.rounds['Round 1'] && report.rounds['Round 3']) {
    const r1 = report.rounds['Round 1'];
    const r3 = report.rounds['Round 3'];
    
    report.comparisons.overall = {
      totalCycles: r3.cyclesRun - r1.cyclesRun,
      totalImprovements: r3.improvements - r1.improvements,
      totalConnections: r3.connections - r1.connections,
      allPackages: allPackages,
      allTools: allTools,
      allEngines: allEngines,
      packagesWorkedOnAllRounds: report.packages.common,
      toolsWorkedOnAllRounds: report.tools.common,
      enginesWorkedOnAllRounds: report.engines.common
    };
  }
  
  return report;
};

// Generate markdown report
const generateMarkdownReport = (report) => {
  let md = `# Detailed Comparison Report - 3 Rounds Analysis\n\n`;
  md += `**Generated**: ${new Date().toISOString()}\n`;
  md += `**Status**: Continuously Updated\n\n`;
  md += `---\n\n`;
  
  // Round Summaries
  md += `## 📋 Round Summaries\n\n`;
  
  Object.entries(report.rounds).forEach(([roundName, round]) => {
    md += `### ${roundName}\n\n`;
    md += `- **Cycles**: ${round.cycles} @ ${round.intervalMinutes} min intervals\n`;
    md += `- **Cycles Run**: ${round.cyclesRun}\n`;
    md += `- **Total Improvements**: ${round.improvements}\n`;
    md += `- **Improvements Added**: +${round.improvementsAdded}\n`;
    md += `- **Connections Established**: ${round.connections}\n\n`;
    
    md += `#### Packages Worked On (${round.packages.length})\n`;
    if (round.packages.length > 0) {
      md += round.packages.map(p => `- ${p}`).join('\n') + '\n\n';
    } else {
      md += `- *None yet*\n\n`;
    }
    
    md += `#### Tools Worked On (${round.tools.length})\n`;
    if (round.tools.length > 0) {
      md += round.tools.map(t => `- ${t}`).join('\n') + '\n\n';
    } else {
      md += `- *None yet*\n\n`;
    }
    
    md += `#### Engines Worked On (${round.engines.length})\n`;
    if (round.engines.length > 0) {
      md += round.engines.map(e => `- ${e}`).join('\n') + '\n\n';
    } else {
      md += `- *None yet*\n\n`;
    }
    
    md += `#### Learnings (${round.learnings.length})\n`;
    if (round.learnings.length > 0) {
      round.learnings.slice(0, 10).forEach(l => {
        md += `- ${l.substring(0, 200)}${l.length > 200 ? '...' : ''}\n`;
      });
      if (round.learnings.length > 10) {
        md += `- *... and ${round.learnings.length - 10} more*\n`;
      }
      md += `\n`;
    } else {
      md += `- *None yet*\n\n`;
    }
    
    md += `#### Insights About You (${round.userInsights.length})\n`;
    if (round.userInsights.length > 0) {
      round.userInsights.slice(0, 10).forEach(u => {
        md += `- ${u.substring(0, 200)}${u.length > 200 ? '...' : ''}\n`;
      });
      if (round.userInsights.length > 10) {
        md += `- *... and ${round.userInsights.length - 10} more*\n`;
      }
      md += `\n`;
    } else {
      md += `- *None yet*\n\n`;
    }
    
    md += `#### Insights About Your Work (${round.workInsights.length})\n`;
    if (round.workInsights.length > 0) {
      round.workInsights.slice(0, 10).forEach(w => {
        md += `- ${w.substring(0, 200)}${w.length > 200 ? '...' : ''}\n`;
      });
      if (round.workInsights.length > 10) {
        md += `- *... and ${round.workInsights.length - 10} more*\n`;
      }
      md += `\n`;
    } else {
      md += `- *None yet*\n\n`;
    }
    
    md += `---\n\n`;
  });
  
  // Detailed Comparisons
  md += `## 🔄 Detailed Comparisons\n\n`;
  
  // Round 1 vs Round 2
  if (report.comparisons.round1_vs_round2) {
    const comp = report.comparisons.round1_vs_round2;
    md += `### Round 1 vs Round 2\n\n`;
    md += `#### Differences\n`;
    md += `- **Cycles**: +${comp.cyclesDifference}\n`;
    md += `- **Improvements**: +${comp.improvementsDifference}\n`;
    md += `- **Connections**: +${comp.connectionsDifference}\n\n`;
    
    md += `#### New in Round 2\n`;
    md += `- **Packages**: ${comp.newPackages.length > 0 ? comp.newPackages.join(', ') : 'None'}\n`;
    md += `- **Tools**: ${comp.newTools.length > 0 ? comp.newTools.join(', ') : 'None'}\n`;
    md += `- **Engines**: ${comp.newEngines.length > 0 ? comp.newEngines.join(', ') : 'None'}\n\n`;
    
    md += `#### Common (Worked on in Both)\n`;
    md += `- **Packages**: ${comp.commonPackages.length > 0 ? comp.commonPackages.join(', ') : 'None'}\n`;
    md += `- **Tools**: ${comp.commonTools.length > 0 ? comp.commonTools.join(', ') : 'None'}\n`;
    md += `- **Engines**: ${comp.commonEngines.length > 0 ? comp.commonEngines.join(', ') : 'None'}\n\n`;
    
    md += `#### New Learnings in Round 2\n`;
    if (comp.newLearnings.length > 0) {
      comp.newLearnings.slice(0, 5).forEach(l => {
        md += `- ${l.substring(0, 150)}${l.length > 150 ? '...' : ''}\n`;
      });
      if (comp.newLearnings.length > 5) {
        md += `- *... and ${comp.newLearnings.length - 5} more*\n`;
      }
    } else {
      md += `- *None yet*\n`;
    }
    md += `\n`;
    
    md += `#### New Insights About You in Round 2\n`;
    if (comp.newUserInsights.length > 0) {
      comp.newUserInsights.slice(0, 5).forEach(u => {
        md += `- ${u.substring(0, 150)}${u.length > 150 ? '...' : ''}\n`;
      });
      if (comp.newUserInsights.length > 5) {
        md += `- *... and ${comp.newUserInsights.length - 5} more*\n`;
      }
    } else {
      md += `- *None yet*\n`;
    }
    md += `\n`;
    
    md += `#### New Insights About Your Work in Round 2\n`;
    if (comp.newWorkInsights.length > 0) {
      comp.newWorkInsights.slice(0, 5).forEach(w => {
        md += `- ${w.substring(0, 150)}${w.length > 150 ? '...' : ''}\n`;
      });
      if (comp.newWorkInsights.length > 5) {
        md += `- *... and ${comp.newWorkInsights.length - 5} more*\n`;
      }
    } else {
      md += `- *None yet*\n`;
    }
    md += `\n---\n\n`;
  }
  
  // Round 2 vs Round 3
  if (report.comparisons.round2_vs_round3) {
    const comp = report.comparisons.round2_vs_round3;
    md += `### Round 2 vs Round 3\n\n`;
    md += `#### Differences\n`;
    md += `- **Cycles**: +${comp.cyclesDifference}\n`;
    md += `- **Improvements**: +${comp.improvementsDifference}\n`;
    md += `- **Connections**: +${comp.connectionsDifference}\n\n`;
    
    md += `#### New in Round 3\n`;
    md += `- **Packages**: ${comp.newPackages.length > 0 ? comp.newPackages.join(', ') : 'None'}\n`;
    md += `- **Tools**: ${comp.newTools.length > 0 ? comp.newTools.join(', ') : 'None'}\n`;
    md += `- **Engines**: ${comp.newEngines.length > 0 ? comp.newEngines.join(', ') : 'None'}\n\n`;
    
    md += `#### Common (Worked on in Both)\n`;
    md += `- **Packages**: ${comp.commonPackages.length > 0 ? comp.commonPackages.join(', ') : 'None'}\n`;
    md += `- **Tools**: ${comp.commonTools.length > 0 ? comp.commonTools.join(', ') : 'None'}\n`;
    md += `- **Engines**: ${comp.commonEngines.length > 0 ? comp.commonEngines.join(', ') : 'None'}\n\n`;
    
    md += `---\n\n`;
  }
  
  // Overall Summary
  if (report.comparisons.overall) {
    const overall = report.comparisons.overall;
    md += `### Overall Summary (All Rounds)\n\n`;
    md += `- **Total Cycles**: ${overall.totalCycles}\n`;
    md += `- **Total Improvements**: +${overall.totalImprovements}\n`;
    md += `- **Total Connections**: +${overall.totalConnections}\n\n`;
    
    md += `#### All Packages Worked On (${overall.allPackages.length})\n`;
    if (overall.allPackages.length > 0) {
      md += overall.allPackages.map(p => `- ${p}`).join('\n') + '\n\n';
    }
    
    md += `#### All Tools Worked On (${overall.allTools.length})\n`;
    if (overall.allTools.length > 0) {
      md += overall.allTools.map(t => `- ${t}`).join('\n') + '\n\n';
    }
    
    md += `#### All Engines Worked On (${overall.allEngines.length})\n`;
    if (overall.allEngines.length > 0) {
      md += overall.allEngines.map(e => `- ${e}`).join('\n') + '\n\n';
    }
    
    md += `#### Worked On in ALL Rounds\n`;
    md += `- **Packages**: ${overall.packagesWorkedOnAllRounds.length > 0 ? overall.packagesWorkedOnAllRounds.join(', ') : 'None'}\n`;
    md += `- **Tools**: ${overall.toolsWorkedOnAllRounds.length > 0 ? overall.toolsWorkedOnAllRounds.join(', ') : 'None'}\n`;
    md += `- **Engines**: ${overall.enginesWorkedOnAllRounds.length > 0 ? overall.enginesWorkedOnAllRounds.join(', ') : 'None'}\n\n`;
  }
  
  // Unique Items
  md += `## 🎯 Unique Items by Round\n\n`;
  md += `### Unique to Round 1\n`;
  md += `- **Packages**: ${report.packages.unique.round1.length > 0 ? report.packages.unique.round1.join(', ') : 'None'}\n`;
  md += `- **Tools**: ${report.tools.unique.round1.length > 0 ? report.tools.unique.round1.join(', ') : 'None'}\n`;
  md += `- **Engines**: ${report.engines.unique.round1.length > 0 ? report.engines.unique.round1.join(', ') : 'None'}\n\n`;
  
  md += `### Unique to Round 2\n`;
  md += `- **Packages**: ${report.packages.unique.round2.length > 0 ? report.packages.unique.round2.join(', ') : 'None'}\n`;
  md += `- **Tools**: ${report.tools.unique.round2.length > 0 ? report.tools.unique.round2.join(', ') : 'None'}\n`;
  md += `- **Engines**: ${report.engines.unique.round2.length > 0 ? report.engines.unique.round2.join(', ') : 'None'}\n\n`;
  
  md += `### Unique to Round 3\n`;
  md += `- **Packages**: ${report.packages.unique.round3.length > 0 ? report.packages.unique.round3.join(', ') : 'None'}\n`;
  md += `- **Tools**: ${report.tools.unique.round3.length > 0 ? report.tools.unique.round3.join(', ') : 'None'}\n`;
  md += `- **Engines**: ${report.engines.unique.round3.length > 0 ? report.engines.unique.round3.join(', ') : 'None'}\n\n`;
  
  // All Learnings
  md += `## 📚 All Learnings\n\n`;
  md += `### Technical Learnings (${report.learnings.technical.length})\n`;
  const uniqueTechLearnings = [...new Set(report.learnings.technical)];
  uniqueTechLearnings.slice(0, 20).forEach(l => {
    md += `- ${l.substring(0, 200)}${l.length > 200 ? '...' : ''}\n`;
  });
  if (uniqueTechLearnings.length > 20) {
    md += `- *... and ${uniqueTechLearnings.length - 20} more*\n`;
  }
  md += `\n`;
  
  md += `### Insights About You (${report.learnings.aboutUser.length})\n`;
  const uniqueUserInsights = [...new Set(report.learnings.aboutUser)];
  uniqueUserInsights.slice(0, 20).forEach(u => {
    md += `- ${u.substring(0, 200)}${u.length > 200 ? '...' : ''}\n`;
  });
  if (uniqueUserInsights.length > 20) {
    md += `- *... and ${uniqueUserInsights.length - 20} more*\n`;
  }
  md += `\n`;
  
  md += `### Insights About Your Work (${report.learnings.aboutWork.length})\n`;
  const uniqueWorkInsights = [...new Set(report.learnings.aboutWork)];
  uniqueWorkInsights.slice(0, 20).forEach(w => {
    md += `- ${w.substring(0, 200)}${w.length > 200 ? '...' : ''}\n`;
  });
  if (uniqueWorkInsights.length > 20) {
    md += `- *... and ${uniqueWorkInsights.length - 20} more*\n`;
  }
  md += `\n`;
  
  md += `---\n\n`;
  md += `*Report continuously updated. Last update: ${new Date().toISOString()}*\n`;
  
  return md;
};

// Main loop
const run = () => {
  try {
    const { state, analysis } = loadData();
    
    if (!analysis) {
      console.log('⏳ Waiting for analysis data...');
      setTimeout(run, 30000); // Check every 30 seconds
      return;
    }
    
    const report = generateDetailedComparison(state, analysis);
    
    // Save JSON report
    writeFileSync(JSON_REPORT, JSON.stringify(report, null, 2));
    
    // Generate and save markdown report
    const md = generateMarkdownReport(report);
    writeFileSync(REPORT_FILE, md);
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 Detailed Comparison Report Updated`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Rounds tracked: ${Object.keys(report.rounds).length}`);
    console.log(`Packages: ${report.packages.all.length} total, ${report.packages.common.length} in all rounds`);
    console.log(`Tools: ${report.tools.all.length} total, ${report.tools.common.length} in all rounds`);
    console.log(`Engines: ${report.engines.all.length} total, ${report.engines.common.length} in all rounds`);
    console.log(`Technical learnings: ${report.learnings.technical.length}`);
    console.log(`User insights: ${report.learnings.aboutUser.length}`);
    console.log(`Work insights: ${report.learnings.aboutWork.length}`);
    console.log(`Reports: ${REPORT_FILE}, ${JSON_REPORT}`);
    console.log(`${'='.repeat(60)}\n`);
    
  } catch (error) {
    console.error(`❌ Error generating report: ${error.message}`);
  }
  
  // Run every 3 minutes
  setTimeout(run, 180000);
};

// Start
console.log(`\n${'='.repeat(60)}`);
console.log(`📊 Detailed Comparison Report Generator`);
console.log(`${'='.repeat(60)}`);
console.log(`Updates: Every 3 minutes`);
console.log(`Reports: ${REPORT_FILE}, ${JSON_REPORT}`);
console.log(`${'='.repeat(60)}\n`);

run();

