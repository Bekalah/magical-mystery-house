#!/usr/bin/env node
/**
 * Live Round Analysis - Tracks and compares 3 rounds with detailed learnings
 * @license CC0-1.0
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const STATE_FILE = 'experiment-state.json';
const ROUNDS = [
  { name: 'Round 1', cycles: 300, intervalMinutes: 3, startCycle: 467 },
  { name: 'Round 2', cycles: 600, intervalMinutes: 6, startCycle: 767 },
  { name: 'Round 3', cycles: 900, intervalMinutes: 9, startCycle: 1367 }
];

const analysisFile = 'live-round-analysis.json';
const learningsFile = 'round-learnings.md';

// Initialize analysis structure
let analysis = {
  timestamp: new Date().toISOString(),
  rounds: {},
  currentRound: null,
  liveUpdates: [],
  comparisons: {}
};

// Load existing analysis
if (existsSync(analysisFile)) {
  try {
    analysis = JSON.parse(readFileSync(analysisFile, 'utf8'));
  } catch (e) {
    // Start fresh
  }
}

// Get current state snapshot with detailed info
const getDetailedSnapshot = () => {
  try {
    const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    const improvements = state.improvements || [];
    
    // Analyze improvements by type, system, package
    const byType = {};
    const bySystem = {};
    const byPackage = {};
    const byTool = {};
    const byEngine = {};
    const recentImprovements = improvements.slice(-100); // Last 100
    
    improvements.forEach(imp => {
      // By type
      byType[imp.type] = (byType[imp.type] || 0) + 1;
      
      // By system
      if (imp.system) {
        bySystem[imp.system] = (bySystem[imp.system] || 0) + 1;
      }
      
      // By package (extract from file paths)
      if (imp.file) {
        const pkgMatch = imp.file.match(/packages\/([^\/]+)/);
        if (pkgMatch) {
          byPackage[pkgMatch[1]] = (byPackage[pkgMatch[1]] || 0) + 1;
        }
        
        // Tools
        if (imp.file.includes('/tools/')) {
          const toolMatch = imp.file.match(/tools\/([^\/]+)/);
          if (toolMatch) {
            byTool[toolMatch[1]] = (byTool[toolMatch[1]] || 0) + 1;
          }
        }
        
        // Engines
        if (imp.file.includes('engine')) {
          const engineMatch = imp.file.match(/([^\/]+engine[^\/]*)/i);
          if (engineMatch) {
            byEngine[engineMatch[1]] = (byEngine[engineMatch[1]] || 0) + 1;
          }
        }
      }
    });
    
    // Extract learnings from improvement descriptions
    const learnings = [];
    const userInsights = [];
    const workInsights = [];
    
    recentImprovements.forEach(imp => {
      const desc = imp.description?.toLowerCase() || '';
      
      // Learning patterns
      if (desc.includes('learned') || desc.includes('discovered') || desc.includes('found')) {
        learnings.push(imp.description);
      }
      
      // User insights (mentions of preferences, patterns, style)
      if (desc.includes('prefer') || desc.includes('style') || desc.includes('pattern') || 
          desc.includes('quality') || desc.includes('standard')) {
        userInsights.push(imp.description);
      }
      
      // Work insights (mentions of work, transfer, migration, structure)
      if (desc.includes('work') || desc.includes('transfer') || desc.includes('migration') ||
          desc.includes('structure') || desc.includes('system') || desc.includes('connection')) {
        workInsights.push(imp.description);
      }
    });
    
    return {
      cycle: state.currentCycle || 0,
      improvements: improvements.length,
      improvementsByType: byType,
      systemsWorkedOn: Object.keys(bySystem).sort(),
      systemsCount: bySystem,
      packagesWorkedOn: Object.keys(byPackage).sort(),
      packagesCount: byPackage,
      toolsWorkedOn: Object.keys(byTool).sort(),
      toolsCount: byTool,
      enginesWorkedOn: Object.keys(byEngine).sort(),
      enginesCount: byEngine,
      connectionsEstablished: state.connectionsEstablished || 0,
      errors: state.errors?.length || 0,
      learnings: learnings.slice(-20), // Last 20 learnings
      userInsights: userInsights.slice(-20),
      workInsights: workInsights.slice(-20),
      timestamp: new Date().toISOString()
    };
  } catch (e) {
    return null;
  }
};

// Determine current round
const getCurrentRound = (currentCycle) => {
  if (currentCycle < ROUNDS[0].startCycle + ROUNDS[0].cycles) {
    return ROUNDS[0];
  } else if (currentCycle < ROUNDS[1].startCycle + ROUNDS[1].cycles) {
    return ROUNDS[1];
  } else if (currentCycle < ROUNDS[2].startCycle + ROUNDS[2].cycles) {
    return ROUNDS[2];
  }
  return null;
};

// Generate live update
const generateLiveUpdate = () => {
  const snapshot = getDetailedSnapshot();
  if (!snapshot) return;
  
  const currentRound = getCurrentRound(snapshot.cycle);
  if (!currentRound) return;
  
  const roundProgress = ((snapshot.cycle - currentRound.startCycle) / currentRound.cycles * 100).toFixed(1);
  const elapsedMinutes = (snapshot.cycle - currentRound.startCycle) * currentRound.intervalMinutes;
  
  const update = {
    timestamp: new Date().toISOString(),
    round: currentRound.name,
    cycle: snapshot.cycle,
    progress: `${roundProgress}%`,
    elapsedMinutes: elapsedMinutes.toFixed(1),
    improvements: snapshot.improvements,
    topPackages: Object.entries(snapshot.packagesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count })),
    topTools: Object.entries(snapshot.toolsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count })),
    topEngines: Object.entries(snapshot.enginesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count })),
    recentLearnings: snapshot.learnings.slice(-3),
    recentUserInsights: snapshot.userInsights.slice(-3),
    recentWorkInsights: snapshot.workInsights.slice(-3)
  };
  
  // Add to live updates (keep last 50)
  analysis.liveUpdates.push(update);
  if (analysis.liveUpdates.length > 50) {
    analysis.liveUpdates = analysis.liveUpdates.slice(-50);
  }
  
  // Update round data
  if (!analysis.rounds[currentRound.name]) {
    analysis.rounds[currentRound.name] = {
      name: currentRound.name,
      cycles: currentRound.cycles,
      intervalMinutes: currentRound.intervalMinutes,
      startCycle: currentRound.startCycle,
      snapshots: [],
      summary: null
    };
  }
  
  // Add snapshot (every 10 cycles)
  if (snapshot.cycle % 10 === 0) {
    analysis.rounds[currentRound.name].snapshots.push(snapshot);
  }
  
  analysis.currentRound = currentRound.name;
  
  return update;
};

// Generate comparison
const generateComparison = () => {
  const comparisons = {};
  
  // Compare Round 1 to Round 2
  if (analysis.rounds['Round 1']?.summary && analysis.rounds['Round 2']?.summary) {
    const r1 = analysis.rounds['Round 1'].summary;
    const r2 = analysis.rounds['Round 2'].summary;
    
    comparisons['Round1_vs_Round2'] = {
      cycles: r2.cycle - r1.cycle,
      improvementsAdded: r2.improvements - r1.improvements,
      newPackages: r2.packagesWorkedOn.filter(p => !r1.packagesWorkedOn.includes(p)),
      newTools: r2.toolsWorkedOn.filter(t => !r1.toolsWorkedOn.includes(t)),
      newEngines: r2.enginesWorkedOn.filter(e => !r1.enginesWorkedOn.includes(e)),
      connectionsAdded: r2.connectionsEstablished - r1.connectionsEstablished,
      learningsAdded: r2.learnings.filter(l => !r1.learnings.includes(l)),
      userInsightsAdded: r2.userInsights.filter(u => !r1.userInsights.includes(u)),
      workInsightsAdded: r2.workInsights.filter(w => !r1.workInsights.includes(w)),
      similarities: {
        commonPackages: r1.packagesWorkedOn.filter(p => r2.packagesWorkedOn.includes(p)),
        commonTools: r1.toolsWorkedOn.filter(t => r2.toolsWorkedOn.includes(t)),
        commonEngines: r1.enginesWorkedOn.filter(e => r2.enginesWorkedOn.includes(e))
      }
    };
  }
  
  // Compare Round 2 to Round 3
  if (analysis.rounds['Round 2']?.summary && analysis.rounds['Round 3']?.summary) {
    const r2 = analysis.rounds['Round 2'].summary;
    const r3 = analysis.rounds['Round 3'].summary;
    
    comparisons['Round2_vs_Round3'] = {
      cycles: r3.cycle - r2.cycle,
      improvementsAdded: r3.improvements - r2.improvements,
      newPackages: r3.packagesWorkedOn.filter(p => !r2.packagesWorkedOn.includes(p)),
      newTools: r3.toolsWorkedOn.filter(t => !r2.toolsWorkedOn.includes(t)),
      newEngines: r3.enginesWorkedOn.filter(e => !r2.enginesWorkedOn.includes(e)),
      connectionsAdded: r3.connectionsEstablished - r2.connectionsEstablished,
      learningsAdded: r3.learnings.filter(l => !r2.learnings.includes(l)),
      userInsightsAdded: r3.userInsights.filter(u => !r2.userInsights.includes(u)),
      workInsightsAdded: r3.workInsights.filter(w => !r2.workInsights.includes(w)),
      similarities: {
        commonPackages: r2.packagesWorkedOn.filter(p => r3.packagesWorkedOn.includes(p)),
        commonTools: r2.toolsWorkedOn.filter(t => r3.toolsWorkedOn.includes(t)),
        commonEngines: r2.enginesWorkedOn.filter(e => r3.enginesWorkedOn.includes(e))
      }
    };
  }
  
  // Overall comparison
  if (analysis.rounds['Round 1']?.summary && analysis.rounds['Round 3']?.summary) {
    const r1 = analysis.rounds['Round 1'].summary;
    const r3 = analysis.rounds['Round 3'].summary;
    
    comparisons['Overall'] = {
      totalCycles: r3.cycle - r1.cycle,
      totalImprovements: r3.improvements - r1.improvements,
      allPackages: [...new Set([...r1.packagesWorkedOn, ...r3.packagesWorkedOn])],
      allTools: [...new Set([...r1.toolsWorkedOn, ...r3.toolsWorkedOn])],
      allEngines: [...new Set([...r1.enginesWorkedOn, ...r3.enginesWorkedOn])],
      totalConnections: r3.connectionsEstablished - r1.connectionsEstablished,
      allLearnings: [...new Set([...r1.learnings, ...r3.learnings])],
      allUserInsights: [...new Set([...r1.userInsights, ...r3.userInsights])],
      allWorkInsights: [...new Set([...r1.workInsights, ...r3.workInsights])]
    };
  }
  
  analysis.comparisons = comparisons;
  return comparisons;
};

// Finalize round summary
const finalizeRound = (roundName) => {
  const round = analysis.rounds[roundName];
  if (!round || round.snapshots.length === 0) return;
  
  const lastSnapshot = round.snapshots[round.snapshots.length - 1];
  const firstSnapshot = round.snapshots[0];
  
  round.summary = {
    ...lastSnapshot,
    cyclesRun: lastSnapshot.cycle - firstSnapshot.cycle,
    improvementsAdded: lastSnapshot.improvements - firstSnapshot.improvements,
    packagesAdded: lastSnapshot.packagesWorkedOn.filter(p => !firstSnapshot.packagesWorkedOn.includes(p)),
    toolsAdded: lastSnapshot.toolsWorkedOn.filter(t => !firstSnapshot.toolsWorkedOn.includes(t)),
    enginesAdded: lastSnapshot.enginesWorkedOn.filter(e => !firstSnapshot.enginesWorkedOn.includes(e))
  };
};

// Generate markdown report
const generateMarkdownReport = () => {
  let md = `# Live Round Analysis & Learnings\n\n`;
  md += `**Last Updated**: ${new Date().toISOString()}\n\n`;
  md += `---\n\n`;
  
  // Current status
  if (analysis.currentRound) {
    const update = analysis.liveUpdates[analysis.liveUpdates.length - 1];
    if (update) {
      md += `## 📊 Current Status\n\n`;
      md += `**Round**: ${update.round}\n`;
      md += `**Cycle**: ${update.cycle}\n`;
      md += `**Progress**: ${update.progress}\n`;
      md += `**Elapsed**: ${update.elapsedMinutes} minutes\n`;
      md += `**Total Improvements**: ${update.improvements}\n\n`;
      
      if (update.topPackages.length > 0) {
        md += `**Top Packages Worked On**:\n`;
        update.topPackages.forEach(p => {
          md += `- ${p.name}: ${p.count} improvements\n`;
        });
        md += `\n`;
      }
      
      if (update.topTools.length > 0) {
        md += `**Top Tools Worked On**:\n`;
        update.topTools.forEach(t => {
          md += `- ${t.name}: ${t.count} improvements\n`;
        });
        md += `\n`;
      }
      
      if (update.topEngines.length > 0) {
        md += `**Top Engines Worked On**:\n`;
        update.topEngines.forEach(e => {
          md += `- ${e.name}: ${e.count} improvements\n`;
        });
        md += `\n`;
      }
      
      if (update.recentLearnings.length > 0) {
        md += `**Recent Learnings**:\n`;
        update.recentLearnings.forEach(l => {
          md += `- ${l}\n`;
        });
        md += `\n`;
      }
      
      if (update.recentUserInsights.length > 0) {
        md += `**Recent Insights About You**:\n`;
        update.recentUserInsights.forEach(u => {
          md += `- ${u}\n`;
        });
        md += `\n`;
      }
      
      if (update.recentWorkInsights.length > 0) {
        md += `**Recent Insights About Your Work**:\n`;
        update.recentWorkInsights.forEach(w => {
          md += `- ${w}\n`;
        });
        md += `\n`;
      }
    }
  }
  
  // Round summaries
  md += `---\n\n## 📋 Round Summaries\n\n`;
  Object.values(analysis.rounds).forEach(round => {
    if (round.summary) {
      md += `### ${round.name}\n\n`;
      md += `- **Cycles**: ${round.cycles} @ ${round.intervalMinutes} min intervals\n`;
      md += `- **Cycles Run**: ${round.summary.cyclesRun}\n`;
      md += `- **Improvements**: ${round.summary.improvements} total (+${round.summary.improvementsAdded})\n`;
      md += `- **Packages Worked On**: ${round.summary.packagesWorkedOn.length}\n`;
      md += `- **Tools Worked On**: ${round.summary.toolsWorkedOn.length}\n`;
      md += `- **Engines Worked On**: ${round.summary.enginesWorkedOn.length}\n`;
      md += `- **Connections**: ${round.summary.connectionsEstablished}\n\n`;
      
      if (round.summary.packagesWorkedOn.length > 0) {
        md += `**Packages**: ${round.summary.packagesWorkedOn.join(', ')}\n\n`;
      }
      
      if (round.summary.toolsWorkedOn.length > 0) {
        md += `**Tools**: ${round.summary.toolsWorkedOn.join(', ')}\n\n`;
      }
      
      if (round.summary.enginesWorkedOn.length > 0) {
        md += `**Engines**: ${round.summary.enginesWorkedOn.join(', ')}\n\n`;
      }
      
      if (round.summary.learnings.length > 0) {
        md += `**Learnings**:\n`;
        round.summary.learnings.forEach(l => {
          md += `- ${l}\n`;
        });
        md += `\n`;
      }
      
      if (round.summary.userInsights.length > 0) {
        md += `**Insights About You**:\n`;
        round.summary.userInsights.forEach(u => {
          md += `- ${u}\n`;
        });
        md += `\n`;
      }
      
      if (round.summary.workInsights.length > 0) {
        md += `**Insights About Your Work**:\n`;
        round.summary.workInsights.forEach(w => {
          md += `- ${w}\n`;
        });
        md += `\n`;
      }
    }
  });
  
  // Comparisons
  if (Object.keys(analysis.comparisons).length > 0) {
    md += `---\n\n## 🔄 Comparisons\n\n`;
    
    Object.entries(analysis.comparisons).forEach(([name, comp]) => {
      md += `### ${name}\n\n`;
      md += `- **Cycles**: ${comp.cycles || comp.totalCycles}\n`;
      md += `- **Improvements Added**: ${comp.improvementsAdded || comp.totalImprovements}\n`;
      md += `- **Connections Added**: ${comp.connectionsAdded || comp.totalConnections}\n\n`;
      
      if (comp.newPackages) {
        md += `**New Packages**: ${comp.newPackages.join(', ')}\n\n`;
      }
      
      if (comp.similarities) {
        md += `**Common Packages**: ${comp.similarities.commonPackages.join(', ')}\n\n`;
      }
      
      if (comp.learningsAdded) {
        md += `**New Learnings**:\n`;
        comp.learningsAdded.forEach(l => {
          md += `- ${l}\n`;
        });
        md += `\n`;
      }
    });
  }
  
  writeFileSync(learningsFile, md);
};

// Main loop
const run = () => {
  const update = generateLiveUpdate();
  if (update) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 LIVE UPDATE - ${update.round}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Cycle: ${update.cycle} | Progress: ${update.progress} | Elapsed: ${update.elapsedMinutes} min`);
    console.log(`Improvements: ${update.improvements}`);
    
    if (update.topPackages.length > 0) {
      console.log(`\nTop Packages:`);
      update.topPackages.forEach(p => {
        console.log(`  - ${p.name}: ${p.count}`);
      });
    }
    
    if (update.recentLearnings.length > 0) {
      console.log(`\nRecent Learnings:`);
      update.recentLearnings.forEach(l => {
        console.log(`  - ${l.substring(0, 80)}...`);
      });
    }
    
    // Check if round completed
    const currentRound = getCurrentRound(update.cycle);
    const nextRound = ROUNDS.find(r => r.startCycle > update.cycle);
    
    if (nextRound && update.cycle >= currentRound.startCycle + currentRound.cycles) {
      console.log(`\n✅ ${currentRound.name} COMPLETE!`);
      finalizeRound(currentRound.name);
      generateComparison();
    }
  }
  
  // Save analysis
  writeFileSync(analysisFile, JSON.stringify(analysis, null, 2));
  generateMarkdownReport();
  
  // Schedule next update (every 2 minutes)
  setTimeout(run, 120000);
};

// Start
console.log(`🔬 Live Round Analysis Started`);
console.log(`📊 Monitoring every 2 minutes`);
console.log(`📄 Reports: ${analysisFile}, ${learningsFile}\n`);

run();

