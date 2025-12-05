#!/usr/bin/env node
/**
 * Complete 300 cycles, then update saved data to live git
 * @license CC0-1.0
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const STATE_FILE = 'experiment-state.json';
const TARGET_CYCLES = 300;
const START_CYCLE = JSON.parse(readFileSync(STATE_FILE, 'utf8')).currentCycle || 467;
const TARGET_CYCLE = START_CYCLE + TARGET_CYCLES;

console.log(`\n🔬 EXPERIMENT RUN: 300 CYCLES`);
console.log(`📊 Starting from cycle ${START_CYCLE}`);
console.log(`🎯 Target cycle: ${TARGET_CYCLE}`);
console.log(`⏱️  Estimated duration: ${(TARGET_CYCLES * 2.5 / 60).toFixed(1)} hours\n`);

// Wait for experiment to complete
const waitForCompletion = () => {
  let lastCycle = START_CYCLE;
  let checkCount = 0;
  
  return new Promise((resolve) => {
    const checkProgress = () => {
      try {
        if (!existsSync(STATE_FILE)) {
          console.log('⚠️  State file not found, waiting...');
          setTimeout(checkProgress, 30000);
          return;
        }
        
        const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
        const currentCycle = state.currentCycle || START_CYCLE;
        const improvements = state.improvements?.length || 0;
        
        if (currentCycle !== lastCycle) {
          const progress = ((currentCycle - START_CYCLE) / TARGET_CYCLES * 100).toFixed(1);
          const elapsed = ((currentCycle - START_CYCLE) * 2.5).toFixed(1);
          console.log(`📈 Cycle ${currentCycle}/${TARGET_CYCLE} (${progress}% | ~${elapsed} min elapsed)`);
          console.log(`   💡 Improvements tracked: ${improvements}`);
          lastCycle = currentCycle;
        }
        
        if (currentCycle >= TARGET_CYCLE) {
          console.log(`\n✅ Reached target cycle ${TARGET_CYCLE}!`);
          resolve(currentCycle);
          return;
        }
        
        checkCount++;
        if (checkCount % 20 === 0) {
          const elapsed = checkCount * 30 / 60;
          console.log(`⏳ Still running... (~${elapsed.toFixed(1)} hours elapsed)`);
        }
        
        setTimeout(checkProgress, 30000); // Check every 30 seconds
      } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        setTimeout(checkProgress, 60000); // Wait longer on error
      }
    };
    
    checkProgress();
  });
};

// Stop experiment
const stopExperiment = () => {
  try {
    console.log(`\n🛑 Stopping experiment...`);
    execSync('pkill -f "10-hour-improvement-experiment"', { stdio: 'ignore' });
    execSync('pkill -f "monitor-experiment"', { stdio: 'ignore' });
    console.log(`✅ Experiment stopped`);
    return true;
  } catch (e) {
    console.log(`⚠️  Experiment may have already stopped`);
    return false;
  }
};

// Generate summary report
const generateReport = () => {
  try {
    const state = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    const startState = { currentCycle: START_CYCLE };
    
    const cyclesRun = state.currentCycle - START_CYCLE;
    const improvements = state.improvements || [];
    const newImprovements = improvements.filter(i => i.cycle > START_CYCLE);
    
    const report = {
      timestamp: new Date().toISOString(),
      cyclesRun,
      startCycle: START_CYCLE,
      endCycle: state.currentCycle,
      totalImprovements: improvements.length,
      newImprovements: newImprovements.length,
      improvementsByType: newImprovements.reduce((acc, imp) => {
        acc[imp.type] = (acc[imp.type] || 0) + 1;
        return acc;
      }, {}),
      systemsScanned: state.systemsScanned || [],
      packagesImproved: state.packagesImproved || [],
      connectionsEstablished: state.connectionsEstablished || 0,
    };
    
    writeFileSync('experiment-300-cycles-report.json', JSON.stringify(report, null, 2));
    console.log(`\n📄 Report generated: experiment-300-cycles-report.json`);
    return report;
  } catch (error) {
    console.error(`❌ Error generating report: ${error.message}`);
    return null;
  }
};

// Update git
const updateGit = async () => {
  try {
    console.log(`\n📤 Updating saved data to live git...`);
    
    // Check if git repo
    try {
      execSync('git status', { stdio: 'ignore' });
    } catch (e) {
      console.log(`⚠️  Not a git repository, skipping git update`);
      return false;
    }
    
    // Add all changes
    console.log(`   📝 Staging changes...`);
    execSync('git add -A', { stdio: 'pipe' });
    
    // Check if there are changes
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (!status.trim()) {
        console.log(`   ℹ️  No changes to commit`);
        return false;
      }
    } catch (e) {
      console.log(`   ⚠️  Could not check git status`);
      return false;
    }
    
    // Commit
    const commitMessage = `Experiment: 300 cycles completed (${START_CYCLE} → ${START_CYCLE + 300})\n\n- Ran improvement experiment for 300 cycles\n- Generated improvements and fixes\n- Updated system connections\n- Enhanced documentation`;
    console.log(`   💾 Committing changes...`);
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });
    
    // Push
    console.log(`   🚀 Pushing to remote...`);
    try {
      execSync('git push', { stdio: 'pipe' });
      console.log(`   ✅ Successfully pushed to remote`);
      return true;
    } catch (e) {
      console.log(`   ⚠️  Could not push (may need to set remote or authenticate)`);
      console.log(`   ℹ️  Changes committed locally`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating git: ${error.message}`);
    return false;
  }
};

// Main execution
(async () => {
  try {
    // Wait for completion
    const finalCycle = await waitForCompletion();
    
    // Stop experiment
    stopExperiment();
    
    // Generate report
    const report = generateReport();
    
    // Update git
    const gitSuccess = await updateGit();
    
    // Final summary
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🎉 EXPERIMENT COMPLETE: 300 CYCLES`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📊 Cycles completed: ${finalCycle - START_CYCLE}`);
    console.log(`💡 Total improvements: ${report?.totalImprovements || 'N/A'}`);
    console.log(`🆕 New improvements: ${report?.newImprovements || 'N/A'}`);
    console.log(`🔗 Connections: ${report?.connectionsEstablished || 0}`);
    if (gitSuccess) {
      console.log(`✅ Git: Changes pushed to remote`);
    } else {
      console.log(`ℹ️  Git: Changes committed locally (push may need manual action)`);
    }
    console.log(`${'='.repeat(60)}\n`);
    
  } catch (error) {
    console.error(`\n❌ Fatal error: ${error.message}`);
    process.exit(1);
  }
})();

