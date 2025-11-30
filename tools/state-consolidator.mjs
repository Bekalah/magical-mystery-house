#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * State Consolidator Tool
 * Consolidates and optimizes state file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const STATE_FILE = path.join(BASE_DIR, '.continuous-improvement-state.json');
const BACKUP_DIR = path.join(BASE_DIR, '.backups');

logger.info('🔧 IMPROVEMENT: Creating State Consolidator');
logger.info('   → Consolidates state file');
logger.info('   → Optimizes data structure');
logger.info('   → Removes duplicates and old data\n');

function loadState() {
  if (!fs.existsSync(STATE_FILE)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  } catch (error) {
    logger.error('Failed to load state file', { error: error.message });
    return null;
  }
}

function backupState() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(BACKUP_DIR, `state-backup-${timestamp}.json`);
  
  if (fs.existsSync(STATE_FILE)) {
    fs.copyFileSync(STATE_FILE, backupFile);
    logger.info(`State backed up to: ${backupFile}`);
    return backupFile;
  }
  return null;
}

function consolidateState(state) {
  const consolidated = {
    startTime: state.startTime,
    lastUpdate: new Date().toISOString(),
    totalImprovements: state.totalImprovements || 0,
    cycles: []
  };

  // Keep only last 100 cycles (most recent)
  const cycles = (state.cycles || []).slice(-100);
  
  // Remove duplicate cycles (same timestamp)
  const seenTimestamps = new Set();
  const uniqueCycles = [];
  
  for (const cycle of cycles) {
    const key = `${cycle.cycle}-${cycle.timestamp}`;
    if (!seenTimestamps.has(key)) {
      seenTimestamps.add(key);
      uniqueCycles.push(cycle);
    }
  }
  
  consolidated.cycles = uniqueCycles;
  
  // Recalculate total improvements
  consolidated.totalImprovements = uniqueCycles.reduce((sum, cycle) => 
    sum + (cycle.improvements?.length || 0), 0
  );

  // Optimize cycle data structure
  consolidated.cycles = consolidated.cycles.map(cycle => {
    const optimized = {
      cycle: cycle.cycle,
      timestamp: cycle.timestamp,
      duration: cycle.duration || 0,
      improvements: (cycle.improvements || []).map(imp => ({
        tool: imp.tool,
        status: imp.status,
        duration: imp.duration || 0,
        phase: imp.phase
      })),
      errors: (cycle.errors || []).map(err => ({
        tool: err.tool,
        error: err.error ? err.error.substring(0, 200) : 'Unknown error',
        phase: err.phase
      }))
    };
    return optimized;
  });

  return consolidated;
}

function optimizeStateFile(state) {
  // Remove old backups (keep only last 5)
  if (fs.existsSync(BACKUP_DIR)) {
    const backups = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('state-backup-') && f.endsWith('.json'))
      .map(f => ({
        name: f,
        path: path.join(BACKUP_DIR, f),
        mtime: fs.statSync(path.join(BACKUP_DIR, f)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime);
    
    if (backups.length > 5) {
      backups.slice(5).forEach(backup => {
        fs.unlinkSync(backup.path);
        logger.info(`Removed old backup: ${backup.name}`);
      });
    }
  }

  return state;
}

async function main() {
  UserFeedback.section('State Consolidator');
  
  const state = loadState();
  if (!state) {
    UserFeedback.error('No state file found.');
    process.exit(1);
  }

  UserFeedback.info('Creating backup...');
  backupState();

  UserFeedback.info('Consolidating state...');
  const consolidated = consolidateState(state);
  
  UserFeedback.info('Optimizing state file...');
  const optimized = optimizeStateFile(consolidated);

  // Save consolidated state
  fs.writeFileSync(STATE_FILE, JSON.stringify(optimized, null, 2), 'utf-8');
  
  const originalSize = JSON.stringify(state).length;
  const newSize = JSON.stringify(optimized).length;
  const reduction = ((1 - newSize / originalSize) * 100).toFixed(2);

  UserFeedback.section('Consolidation Summary');
  console.log(`Original cycles: ${state.cycles?.length || 0}`);
  console.log(`Consolidated cycles: ${optimized.cycles.length}`);
  console.log(`Original size: ${(originalSize / 1024).toFixed(2)}KB`);
  console.log(`New size: ${(newSize / 1024).toFixed(2)}KB`);
  console.log(`Size reduction: ${reduction}%`);
  
  UserFeedback.success('State consolidated successfully');
  logger.info('State consolidated', {
    originalCycles: state.cycles?.length || 0,
    consolidatedCycles: optimized.cycles.length,
    sizeReduction: `${reduction}%`
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { consolidateState, optimizeStateFile, backupState };

