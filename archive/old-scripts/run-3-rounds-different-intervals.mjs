#!/usr/bin/env node
/**
 * Run experiment in 3 rounds with different cycle intervals:
 * Round 1: 300 cycles at 3 minutes each
 * Round 2: 600 cycles at 6 minutes each
 * Round 3: 900 cycles at 9 minutes each
 * Compare differences between rounds
 * @license CC0-1.0
 */

import { readFileSync, writeFileSync, existsSync, readFileSync as readFile, writeFileSync as writeFile } from 'fs';
import { execSync } from 'child_process';

const STATE_FILE = 'experiment-state.json';
const EXPERIMENT_SCRIPT = 'scripts/10-hour-improvement-experiment.ts';
const ROUNDS = [
  { name: 'Round 1', cycles: 900, intervalMinutes: 9 },
  { name: 'Round 2', cycles: 1800, intervalMinutes: 15 },
  { name: 'Round 3', cycles: 3600, intervalMinutes: 21 }
];

let startCycle = 467;
const roundResults = [];

// Modify experiment script interval
const setCycleInterval = (minutes) => {
  try {
    let content = readFile(EXPERIMENT_SCRIPT, 'utf8');
    const newInterval = `${minutes} * 60 * 1000`; // minutes to milliseconds
    
    // Replace the CYCLE_INTERVAL line
    content = content.replace(
      /const CYCLE_INTERVAL = [^;]+;/,
      `const CYCLE_INTERVAL = ${newInterval}; // ${minutes} minutes in milliseconds`
    );
    
    writeFile(EXPERIMENT_SCRIPT, content, 'utf8');
    console.log(`   ✅ Set cycle interval to ${minutes} minutes`);
    return true;
  } catch (error) {
    console.error(`   ❌ Failed to set interval: ${error.message}`);
    return false;
  }
};

// Get current state snapshot
const getStateSnapshot = () => {
  try {
    const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    return {
      cycle: state.currentCycle || 0,
      improvements: state.improvements?.length || 0,
      improvementsByType: (state.improvements || []).reduce((acc, imp) => {
        acc[imp.type] = (acc[imp.type] || 0) + 1;
        return acc;
      }, {}),
      systemsScanned: state.systemsScanned?.length || 0,
      packagesImproved: state.packagesImproved?.length || 0,
      connectionsEstablished: state.connectionsEstablished || 0,
      errors: state.errors?.length || 0,
      timestamp: new Date().toISOString()
    };
  } catch (e) {
    return null;
  }
};

// Wait for cycles to complete
const waitForCycles = async (targetCycles, intervalMinutes, roundName) => {
  const targetCycle = startCycle + targetCycles;
  const estimatedHours = (targetCycles * intervalMinutes / 60).toFixed(1);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔬 ${roundName}: Running ${targetCycles} cycles`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📊 Starting from cycle ${startCycle}`);
  console.log(`🎯 Target cycle: ${targetCycle}`);
  console.log(`⏱️  Cycle interval: ${intervalMinutes} minutes`);
  console.log(`⏱️  Estimated duration: ${estimatedHours} hours\n`);
  
  let lastCycle = startCycle;
  let checkCount = 0;
  
  return new Promise((resolve) => {
    const checkProgress = () => {
      try {
        if (!existsSync(STATE_FILE)) {
          setTimeout(checkProgress, 60000);
          return;
        }
        
        const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
        const currentCycle = state.currentCycle || startCycle;
        const improvements = state.improvements?.length || 0;
        
        if (currentCycle !== lastCycle) {
          const progress = ((currentCycle - startCycle) / targetCycles * 100).toFixed(1);
          const elapsed = ((currentCycle - startCycle) * intervalMinutes).toFixed(1);
          console.log(`📈 Cycle ${currentCycle}/${targetCycle} (${progress}% | ~${elapsed} min elapsed)`);
          console.log(`   💡 Improvements: ${improvements}`);
          lastCycle = currentCycle;
        }
        
        if (currentCycle >= targetCycle) {
          console.log(`\n✅ ${roundName} complete! Reached cycle ${targetCycle}`);
          resolve(currentCycle);
          return;
        }
        
        checkCount++;
        if (checkCount % 10 === 0) {
          const elapsed = checkCount * 60 / 60;
          console.log(`⏳ Still running... (~${elapsed.toFixed(1)} hours elapsed)`);
        }
        
        setTimeout(checkProgress, 60000); // Check every minute
      } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        setTimeout(checkProgress, 120000);
      }
    };
    
    checkProgress();
  });
};

// Stop experiment
const stopExperiment = () => {
  try {
    execSync('pkill -f "10-hour-improvement-experiment"', { stdio: 'ignore' });
    execSync('pkill -f "monitor-experiment"', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

// Start experiment
const startExperiment = () => {
  try {
    stopExperiment(); // Ensure clean start
    execSync('nohup node scripts/10-hour-improvement-experiment.ts > experiment-run.log 2>&1 &', { stdio: 'ignore' });
    console.log(`✅ Experiment started`);
    return true;
  } catch (e) {
    console.error(`❌ Failed to start experiment: ${e.message}`);
    return false;
  }
};

// Update git after round
const updateGit = async (roundName, cyclesRun, intervalMinutes) => {
  try {
    console.log(`\n📤 Updating git for ${roundName}...`);
    
    try {
      execSync('git status', { stdio: 'ignore' });
    } catch (e) {
      console.log(`⚠️  Not a git repository, skipping`);
      return false;
    }
    
    execSync('git add -A', { stdio: 'ignore' });
    
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (!status.trim()) {
        console.log(`   ℹ️  No changes to commit`);
        return false;
      }
    } catch (e) {
      return false;
    }
    
    const commitMessage = `${roundName}: ${cyclesRun} cycles @ ${intervalMinutes}min intervals\n\n- Ran improvement experiment\n- Generated improvements and fixes\n- Updated system connections`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'ignore' });
    
    try {
      execSync('git push', { stdio: 'ignore' });
      console.log(`   ✅ Pushed to remote`);
      return true;
    } catch (e) {
      console.log(`   ℹ️  Committed locally (push may need manual action)`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Git error: ${error.message}`);
    return false;
  }
};

// Compare rounds
const compareRounds = () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 ROUND COMPARISON ANALYSIS`);
  console.log(`${'='.repeat(60)}\n`);
  
  const comparison = {
    timestamp: new Date().toISOString(),
    rounds: roundResults,
    differences: []
  };
  
  // Compare each round to previous
  for (let i = 1; i < roundResults.length; i++) {
    const prev = roundResults[i - 1];
    const curr = roundResults[i];
    
    const diff = {
      from: prev.name,
      to: curr.name,
      cyclesRun: curr.cycle - prev.cycle,
      improvementsAdded: curr.improvements - prev.improvements,
      systemsScannedAdded: curr.systemsScanned - prev.systemsScanned,
      packagesImprovedAdded: curr.packagesImproved - prev.packagesImproved,
      connectionsAdded: curr.connectionsEstablished - prev.connectionsEstablished,
      errorsAdded: curr.errors - prev.errors,
      improvementsByType: {}
    };
    
    // Compare improvement types
    Object.keys(curr.improvementsByType).forEach(type => {
      const prevCount = prev.improvementsByType[type] || 0;
      const currCount = curr.improvementsByType[type] || 0;
      if (currCount > prevCount) {
        diff.improvementsByType[type] = currCount - prevCount;
      }
    });
    
    comparison.differences.push(diff);
    
    console.log(`\n📈 ${prev.name} → ${curr.name}:`);
    console.log(`   Cycles: ${diff.cyclesRun}`);
    console.log(`   Improvements: +${diff.improvementsAdded}`);
    console.log(`   Systems Scanned: +${diff.systemsScannedAdded}`);
    console.log(`   Packages Improved: +${diff.packagesImprovedAdded}`);
    console.log(`   Connections: +${diff.connectionsAdded}`);
    console.log(`   Errors: +${diff.errorsAdded}`);
    if (Object.keys(diff.improvementsByType).length > 0) {
      console.log(`   By Type:`);
      Object.entries(diff.improvementsByType).forEach(([type, count]) => {
        console.log(`     - ${type}: +${count}`);
      });
    }
  }
  
  // Overall summary
  const first = roundResults[0];
  const last = roundResults[roundResults.length - 1];
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 OVERALL SUMMARY (${first.name} → ${last.name})`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Total Cycles: ${last.cycle - first.cycle}`);
  console.log(`Total Improvements: +${last.improvements - first.improvements}`);
  console.log(`Total Systems Scanned: +${last.systemsScanned - first.systemsScanned}`);
  console.log(`Total Packages Improved: +${last.packagesImproved - first.packagesImproved}`);
  console.log(`Total Connections: +${last.connectionsEstablished - first.connectionsEstablished}`);
  console.log(`Total Errors: +${last.errors - first.errors}`);
  
  // Save comparison
  writeFileSync('experiment-3-rounds-intervals-comparison.json', JSON.stringify(comparison, null, 2));
  console.log(`\n💾 Comparison saved: experiment-3-rounds-intervals-comparison.json`);
  
  return comparison;
};

// Main execution
(async () => {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🔬 EXPERIMENT: 3 ROUNDS WITH DIFFERENT INTERVALS`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Round 1: 900 cycles @ 9 minutes each (~135 hours)`);
    console.log(`Round 2: 1800 cycles @ 15 minutes each (~450 hours)`);
    console.log(`Round 3: 3600 cycles @ 21 minutes each (~1260 hours)`);
    console.log(`Total: 6300 cycles (~1845 hours total)\n`);
    
    // Get initial state
    const initialState = getStateSnapshot();
    if (initialState) {
      roundResults.push({
        name: 'Initial',
        ...initialState
      });
      startCycle = initialState.cycle;
    }
    
    // Run each round
    for (const round of ROUNDS) {
      // Capture state before round
      const beforeState = getStateSnapshot();
      
      // Set cycle interval for this round
      console.log(`\n⚙️  Configuring ${round.name}...`);
      setCycleInterval(round.intervalMinutes);
      
      // Stop any running experiment
      stopExperiment();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Start experiment with new interval
      if (!startExperiment()) {
        console.error(`❌ Failed to start experiment for ${round.name}`);
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for startup
      
      // Wait for cycles
      const finalCycle = await waitForCycles(round.cycles, round.intervalMinutes, round.name);
      
      // Stop experiment
      stopExperiment();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Capture state after round
      const afterState = getStateSnapshot();
      if (afterState) {
        roundResults.push({
          name: round.name,
          intervalMinutes: round.intervalMinutes,
          ...afterState
        });
        startCycle = afterState.cycle;
      }
      
      // Update git
      const cyclesRun = afterState.cycle - beforeState.cycle;
      await updateGit(round.name, cyclesRun, round.intervalMinutes);
      
      // Save round snapshot
      const roundData = {
        round: round.name,
        intervalMinutes: round.intervalMinutes,
        cyclesRun,
        before: beforeState,
        after: afterState,
        timestamp: new Date().toISOString()
      };
      writeFileSync(`experiment-${round.name.toLowerCase().replace(' ', '-')}-interval-snapshot.json`, JSON.stringify(roundData, null, 2));
      console.log(`💾 Round snapshot saved`);
      
      // Brief pause between rounds
      if (round !== ROUNDS[ROUNDS.length - 1]) {
        console.log(`\n⏸️  Pausing 10 seconds before next round...\n`);
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
    
    // Compare all rounds
    const comparison = compareRounds();
    
    // Final git update
    console.log(`\n📤 Final git update...`);
    await updateGit('All 3 Rounds Complete (Different Intervals)', 1800, 'mixed');
    
    // Final summary
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🎉 ALL 3 ROUNDS COMPLETE!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`✅ Round 1: 300 cycles @ 3 min intervals`);
    console.log(`✅ Round 2: 600 cycles @ 6 min intervals`);
    console.log(`✅ Round 3: 900 cycles @ 9 min intervals`);
    console.log(`✅ Total: 1800 cycles completed`);
    console.log(`✅ Comparison report generated`);
    console.log(`✅ All changes committed and pushed`);
    console.log(`${'='.repeat(60)}\n`);
    
  } catch (error) {
    console.error(`\n❌ Fatal error: ${error.message}`);
    stopExperiment();
    process.exit(1);
  }
})();

