#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Reset Experiment State
 * Resets the experiment to cycle 0 while preserving learnings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const statePath = path.join(rootDir, 'experiment-state.json');

// Load current state to preserve learnings
let currentState = {};
if (fs.existsSync(statePath)) {
  try {
    currentState = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
  } catch (e) {
    console.warn('Could not load current state:', e.message);
  }
}

// Reset to initial state but preserve learnings
const resetState = {
  startTime: Date.now(),
  endTime: null,
  currentCycle: 0,
  totalCycles: 3000,
  improvements: [],
  opportunities: [],
  errors: [],
  systemsScanned: [],
  packagesImproved: [],
  connectionsEstablished: 0,
  magnumOpus: {
    auditsRun: 0,
    licensingFixed: 0,
    packagesCompleted: 0,
    lastAuditCycle: 0
  },
  fixTracking: {
    totalFixAttempts: 0,
    epipeErrors: 0,
    fixCategories: {},
    lastFixCycle: 0,
    repeatedFixes: []
  },
  // Preserve learnings
  learnings: currentState.learnings || [],
  lastReset: new Date().toISOString(),
  resetReason: 'Updated with synchronizer, synthesizer, and fractal tech integration'
};

fs.writeFileSync(statePath, JSON.stringify(resetState, null, 2), 'utf-8');

console.log('✅ Experiment reset!');
console.log(`   Cycle: 0/${resetState.totalCycles}`);
console.log(`   Reason: ${resetState.resetReason}`);
console.log(`   Learnings preserved: ${currentState.learnings?.length || 0}`);

