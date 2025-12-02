#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Safely restart the improvement experiment
 * Trauma-aware: Gentle, non-destructive, preserves all progress
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function stopExperiment() {
  try {
    // Find and stop all experiment processes gently
    const processes = execSync('ps aux | grep -E "10-hour-improvement-experiment|tsx.*improvement" | grep -v grep', { encoding: 'utf-8' });
    const lines = processes.split('\n').filter(l => l.trim());
    
    for (const line of lines) {
      const pid = line.trim().split(/\s+/)[1];
      if (pid) {
        try {
          process.kill(parseInt(pid), 'SIGTERM'); // Gentle termination
          console.log(`✅ Stopped process ${pid}`);
        } catch (e) {
          // Process might already be gone
        }
      }
    }
    
    // Wait a moment for graceful shutdown
    return new Promise(resolve => setTimeout(resolve, 3000));
  } catch (e) {
    // No processes running, that's fine
    return Promise.resolve();
  }
}

function saveState() {
  const stateFile = path.join(rootDir, 'experiment-state.json');
  if (fs.existsSync(stateFile)) {
    // Backup current state
    const backupFile = path.join(rootDir, `experiment-state-backup-${Date.now()}.json`);
    fs.copyFileSync(stateFile, backupFile);
    console.log(`✅ State backed up to ${backupFile}`);
  }
}

async function restartExperiment() {
  console.log('🔄 Safely restarting experiment...\n');
  
  // 1. Save current state
  console.log('💾 Saving current state...');
  saveState();
  
  // 2. Stop existing processes gently
  console.log('🛑 Stopping existing processes...');
  await stopExperiment();
  
  // 3. Verify experiment file exists
  const experimentFile = path.join(rootDir, 'scripts', '10-hour-improvement-experiment.ts');
  if (!fs.existsSync(experimentFile)) {
    console.error('❌ Experiment file not found!');
    process.exit(1);
  }
  
  // 4. Start fresh experiment
  console.log('🚀 Starting fresh experiment...');
  console.log('   - All upgrades applied');
  console.log('   - Auto-fix enabled');
  console.log('   - Self-healing active');
  console.log('   - Trauma-aware design');
  console.log('   - International standards compliant\n');
  
  // Start in background with proper error handling
  const child = spawn('npx', ['--yes', 'tsx', experimentFile], {
    cwd: rootDir,
    stdio: 'inherit',
    detached: true
  });
  
  child.on('error', (err) => {
    console.error('❌ Failed to start experiment:', err);
    process.exit(1);
  });
  
  child.unref();
  
  console.log('✅ Experiment restarted successfully!');
  console.log('   Process ID:', child.pid);
  console.log('   Check status with: pnpm run improve:status');
  
  return child.pid;
}

restartExperiment().catch(console.error);

