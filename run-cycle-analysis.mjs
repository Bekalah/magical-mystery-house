#!/usr/bin/env node
/**
 * Run cycle differences analysis
 * @license CC0-1.0
 */

import { readFileSync, writeFileSync } from 'fs';

const STATE_FILE = 'experiment-state.json';

// Define cycle ranges
const RANGES = {
  '300 cycles': { start: 467, end: 767 },
  '600 cycles': { start: 467, end: 1067 },
  '900 cycles': { start: 467, end: 1367 }
};

const analyzeRange = (start, end, label) => {
  try {
    const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    const improvements = state.improvements || [];
    const currentCycle = state.currentCycle || 467;
    
    // Only analyze up to current cycle
    const actualEnd = Math.min(end, currentCycle);
    const rangeImprovements = improvements.filter(imp => 
      imp.cycle >= start && imp.cycle < actualEnd
    );
    
    // Analyze by type
    const byType = {};
    const bySystem = {};
    const byPackage = {};
    const byTool = {};
    const byEngine = {};
    const learnings = [];
    const userInsights = [];
    const workInsights = [];
    
    rangeImprovements.forEach(imp => {
      byType[imp.type] = (byType[imp.type] || 0) + 1;
      
      if (imp.system) {
        bySystem[imp.system] = (bySystem[imp.system] || 0) + 1;
      }
      
      if (imp.file) {
        const pkgMatch = imp.file.match(/packages\/([^\/]+)/);
        if (pkgMatch) {
          byPackage[pkgMatch[1]] = (byPackage[pkgMatch[1]] || 0) + 1;
        }
        
        if (imp.file.includes('/tools/')) {
          const toolMatch = imp.file.match(/tools\/([^\/]+)/);
          if (toolMatch) {
            byTool[toolMatch[1]] = (byTool[toolMatch[1]] || 0) + 1;
          }
        }
        
        if (imp.file.includes('engine')) {
          const engineMatch = imp.file.match(/([^\/]+engine[^\/]*)/i);
          if (engineMatch) {
            byEngine[engineMatch[1]] = (byEngine[engineMatch[1]] || 0) + 1;
          }
        }
      }
      
      const desc = imp.description?.toLowerCase() || '';
      if (desc.includes('learned') || desc.includes('discovered') || desc.includes('found')) {
        learnings.push(imp.description);
      }
      if (desc.includes('prefer') || desc.includes('style') || desc.includes('pattern') || 
          desc.includes('quality') || desc.includes('standard')) {
        userInsights.push(imp.description);
      }
      if (desc.includes('work') || desc.includes('transfer') || desc.includes('migration') ||
          desc.includes('structure') || desc.includes('system') || desc.includes('connection')) {
        workInsights.push(imp.description);
      }
    });
    
    return {
      label,
      cycles: actualEnd - start,
      improvements: rangeImprovements.length,
      byType,
      systemsWorkedOn: Object.keys(bySystem).sort(),
      systemsCount: bySystem,
      packagesWorkedOn: Object.keys(byPackage).sort(),
      packagesCount: byPackage,
      toolsWorkedOn: Object.keys(byTool).sort(),
      toolsCount: byTool,
      enginesWorkedOn: Object.keys(byEngine).sort(),
      enginesCount: byEngine,
      learnings: [...new Set(learnings)],
      userInsights: [...new Set(userInsights)],
      workInsights: [...new Set(workInsights)]
    };
  } catch (e) {
    return null;
  }
};

// Generate comparison
const generateComparison = () => {
  const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  const currentCycle = state.currentCycle || 467;
  
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📊 CYCLE DIFFERENCES ANALYSIS`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Current Cycle: ${currentCycle}\n`);
  
  const results = {};
  
  Object.entries(RANGES).forEach(([label, range]) => {
    if (currentCycle >= range.start) {
      const analysis = analyzeRange(range.start, range.end, label);
      if (analysis) {
        results[label] = analysis;
      }
    }
  });
  
  // Display results
  Object.entries(results).forEach(([label, data]) => {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`📈 ${label.toUpperCase()}`);
    console.log(`${'='.repeat(70)}`);
    console.log(`Cycles Analyzed: ${data.cycles}`);
    console.log(`Total Improvements: ${data.improvements}`);
    console.log(`Improvements per Cycle: ${(data.improvements / data.cycles).toFixed(2)}`);
    
    console.log(`\n📊 By Type:`);
    Object.entries(data.byType)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`  ${type}: ${count}`);
      });
    
    console.log(`\n📦 Packages Worked On: ${data.packagesWorkedOn.length}`);
    if (data.packagesWorkedOn.length > 0) {
      const topPackages = Object.entries(data.packagesCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);
      topPackages.forEach(([pkg, count]) => {
        console.log(`  ${pkg}: ${count} improvements`);
      });
    }
    
    console.log(`\n🔧 Tools Worked On: ${data.toolsWorkedOn.length}`);
    if (data.toolsWorkedOn.length > 0) {
      const topTools = Object.entries(data.toolsCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);
      topTools.forEach(([tool, count]) => {
        console.log(`  ${tool}: ${count} improvements`);
      });
    }
    
    console.log(`\n⚙️  Engines Worked On: ${data.enginesWorkedOn.length}`);
    if (data.enginesWorkedOn.length > 0) {
      const topEngines = Object.entries(data.enginesCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);
      topEngines.forEach(([engine, count]) => {
        console.log(`  ${engine}: ${count} improvements`);
      });
    }
    
    console.log(`\n💡 Learnings: ${data.learnings.length}`);
    if (data.learnings.length > 0) {
      data.learnings.slice(0, 10).forEach(l => {
        console.log(`  - ${l.substring(0, 120)}${l.length > 120 ? '...' : ''}`);
      });
      if (data.learnings.length > 10) {
        console.log(`  ... and ${data.learnings.length - 10} more`);
      }
    }
    
    console.log(`\n👤 Insights About You: ${data.userInsights.length}`);
    if (data.userInsights.length > 0) {
      data.userInsights.slice(0, 10).forEach(u => {
        console.log(`  - ${u.substring(0, 120)}${u.length > 120 ? '...' : ''}`);
      });
      if (data.userInsights.length > 10) {
        console.log(`  ... and ${data.userInsights.length - 10} more`);
      }
    }
    
    console.log(`\n💼 Insights About Your Work: ${data.workInsights.length}`);
    if (data.workInsights.length > 0) {
      data.workInsights.slice(0, 10).forEach(w => {
        console.log(`  - ${w.substring(0, 120)}${w.length > 120 ? '...' : ''}`);
      });
      if (data.workInsights.length > 10) {
        console.log(`  ... and ${data.workInsights.length - 10} more`);
      }
    }
  });
  
  // Compare if we have multiple ranges
  if (Object.keys(results).length > 1) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`🔄 COMPARISONS`);
    console.log(`${'='.repeat(70)}`);
    
    const labels = Object.keys(results);
    for (let i = 0; i < labels.length - 1; i++) {
      const current = results[labels[i]];
      const next = results[labels[i + 1]];
      
      console.log(`\n${labels[i]} → ${labels[i + 1]}:`);
      console.log(`  Improvements: +${next.improvements - current.improvements}`);
      console.log(`  New Packages: ${next.packagesWorkedOn.filter(p => !current.packagesWorkedOn.includes(p)).length}`);
      console.log(`  New Tools: ${next.toolsWorkedOn.filter(t => !current.toolsWorkedOn.includes(t)).length}`);
      console.log(`  New Engines: ${next.enginesWorkedOn.filter(e => !current.enginesWorkedOn.includes(e)).length}`);
      console.log(`  New Learnings: ${next.learnings.filter(l => !current.learnings.includes(l)).length}`);
      console.log(`  New User Insights: ${next.userInsights.filter(u => !current.userInsights.includes(u)).length}`);
      console.log(`  New Work Insights: ${next.workInsights.filter(w => !current.workInsights.includes(w)).length}`);
      
      const newPackages = next.packagesWorkedOn.filter(p => !current.packagesWorkedOn.includes(p));
      if (newPackages.length > 0) {
        console.log(`  New Package Names: ${newPackages.slice(0, 10).join(', ')}${newPackages.length > 10 ? '...' : ''}`);
      }
    }
  }
  
  // Save to file
  const report = {
    timestamp: new Date().toISOString(),
    currentCycle,
    results,
    comparisons: {}
  };
  
  const labels = Object.keys(results);
  for (let i = 0; i < labels.length - 1; i++) {
    const current = results[labels[i]];
    const next = results[labels[i + 1]];
    
    report.comparisons[`${labels[i]}_vs_${labels[i + 1]}`] = {
      improvementsAdded: next.improvements - current.improvements,
      newPackages: next.packagesWorkedOn.filter(p => !current.packagesWorkedOn.includes(p)),
      newTools: next.toolsWorkedOn.filter(t => !current.toolsWorkedOn.includes(t)),
      newEngines: next.enginesWorkedOn.filter(e => !current.enginesWorkedOn.includes(e)),
      commonPackages: current.packagesWorkedOn.filter(p => next.packagesWorkedOn.includes(p)),
      commonTools: current.toolsWorkedOn.filter(t => next.toolsWorkedOn.includes(t)),
      commonEngines: current.enginesWorkedOn.filter(e => next.enginesWorkedOn.includes(e))
    };
  }
  
  writeFileSync('cycle-differences-analysis.json', JSON.stringify(report, null, 2));
  console.log(`\n💾 Analysis saved: cycle-differences-analysis.json`);
  
  return report;
};

generateComparison();



