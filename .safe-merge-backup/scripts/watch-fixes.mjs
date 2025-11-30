#!/usr/bin/env node
/**
 * Real-time Fixes Monitor
 * 
 * Watches the experiment and reports fixes as they occur
 * 
 * @license CC0-1.0 - Public Domain
 */

import { watch } from 'fs';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const LOG_FILE = path.join(rootDir, 'experiment-all-day.log');
const FIXES_LOG = path.join(rootDir, 'FIXES_LOG.md');
const STATE_FILE = path.join(rootDir, 'experiment-state.json');

let lastLogSize = 0;
let lastStateSize = 0;
let lastFixesSize = 0;
let cycleCount = 0;

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
}

function parseLogLine(line) {
  if (!line || line.trim() === '') return null;
  
  // Look for fix indicators
  if (line.includes('✅') || line.includes('Fixed') || line.includes('fix')) {
    return { type: 'fix', message: line };
  }
  
  if (line.includes('❌') || line.includes('Error') || line.includes('failed')) {
    return { type: 'error', message: line };
  }
  
  if (line.includes('🔄') || line.includes('Retrying') || line.includes('Cycle')) {
    return { type: 'cycle', message: line };
  }
  
  if (line.includes('🔧') || line.includes('Building') || line.includes('compiling')) {
    return { type: 'build', message: line };
  }
  
  return null;
}

function readNewLogLines() {
  if (!fs.existsSync(LOG_FILE)) {
    return [];
  }
  
  try {
    const stats = fs.statSync(LOG_FILE);
    const currentSize = stats.size;
    
    if (currentSize <= lastLogSize) {
      return [];
    }
    
    const file = fs.openSync(LOG_FILE, 'r');
    const buffer = Buffer.alloc(currentSize - lastLogSize);
    fs.readSync(file, buffer, 0, buffer.length, lastLogSize);
    fs.closeSync(file);
    
    lastLogSize = currentSize;
    
    const newContent = buffer.toString('utf8');
    return newContent.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    return [];
  }
}

function checkStateChanges() {
  if (!fs.existsSync(STATE_FILE)) {
    return null;
  }
  
  try {
    const stats = fs.statSync(STATE_FILE);
    const currentSize = stats.size;
    
    if (currentSize === lastStateSize) {
      return null;
    }
    
    lastStateSize = currentSize;
    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    
    return {
      cycle: state.currentCycle || 0,
      improvements: state.improvements?.length || 0,
      errors: state.errors?.length || 0
    };
  } catch (error) {
    return null;
  }
}

function checkFixesLog() {
  if (!fs.existsSync(FIXES_LOG)) {
    return null;
  }
  
  try {
    const stats = fs.statSync(FIXES_LOG);
    const currentSize = stats.size;
    
    if (currentSize === lastFixesSize) {
      return null;
    }
    
    lastFixesSize = currentSize;
    const content = fs.readFileSync(FIXES_LOG, 'utf8');
    
    // Extract latest fix
    const latestFixMatch = content.match(/### \d{4}-\d{2}-\d{2}.*?\n\n(.*?)(?=\n---|\n##|$)/s);
    if (latestFixMatch) {
      return latestFixMatch[1].trim();
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

function displayHeader() {
  console.clear();
  log('═══════════════════════════════════════════════════════════════', 'cyan');
  log('🔍 REAL-TIME FIXES MONITOR', 'bright');
  log('═══════════════════════════════════════════════════════════════', 'cyan');
  console.log('');
}

function displayStatus(state) {
  if (state) {
    log(`📊 Cycle: ${state.cycle} | Improvements: ${state.improvements} | Errors: ${state.errors}`, 'blue');
  }
}

function main() {
  displayHeader();
  log('Starting real-time fixes monitor...', 'green');
  log(`Watching: ${LOG_FILE}`, 'cyan');
  log('Press Ctrl+C to stop\n', 'yellow');
  
  // Initialize sizes
  if (fs.existsSync(LOG_FILE)) {
    lastLogSize = fs.statSync(LOG_FILE).size;
  }
  if (fs.existsSync(STATE_FILE)) {
    lastStateSize = fs.statSync(STATE_FILE).size;
  }
  if (fs.existsSync(FIXES_LOG)) {
    lastFixesSize = fs.statSync(FIXES_LOG).size;
  }
  
  // Watch for changes
  setInterval(() => {
    // Check log file
    const newLines = readNewLogLines();
    for (const line of newLines) {
      const parsed = parseLogLine(line);
      if (parsed) {
        if (parsed.type === 'fix') {
          log(`✅ FIX: ${parsed.message}`, 'green');
        } else if (parsed.type === 'error') {
          log(`❌ ERROR: ${parsed.message}`, 'red');
        } else if (parsed.type === 'cycle') {
          const cycleMatch = parsed.message.match(/Cycle (\d+)/);
          if (cycleMatch) {
            const cycle = parseInt(cycleMatch[1]);
            if (cycle > cycleCount) {
              cycleCount = cycle;
              log(`🔄 Cycle ${cycle} started`, 'cyan');
            }
          }
        } else if (parsed.type === 'build') {
          log(`🔧 BUILD: ${parsed.message}`, 'yellow');
        }
      }
    }
    
    // Check state changes
    const state = checkStateChanges();
    if (state) {
      displayStatus(state);
    }
    
    // Check fixes log
    const newFix = checkFixesLog();
    if (newFix) {
      log('📝 NEW FIX LOGGED:', 'magenta');
      console.log(newFix);
      console.log('');
    }
  }, 1000); // Check every second
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('\n\n👋 Stopping fixes monitor...', 'yellow');
  process.exit(0);
});

main();

