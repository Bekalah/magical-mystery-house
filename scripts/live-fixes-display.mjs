/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node
/**
 * Live Fixes Display
 * Simple real-time display of fixes and improvements
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const LOG_FILE = path.join(rootDir, 'experiment-all-day.log');
const FIXES_LOG = path.join(rootDir, 'FIXES_LOG.md');

let lastPosition = 0;

function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[0f');
}

function displayHeader() {
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('🔍 LIVE FIXES MONITOR - Real-time Fix Tracking');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

function displayLatestFixes() {
  if (!fs.existsSync(LOG_FILE)) {
    console.log('⏳ Waiting for experiment to start...\n');
    return;
  }
  
  try {
    const content = fs.readFileSync(LOG_FILE, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    
    // Get last 15 lines with relevant content
    const relevant = lines
      .filter(l => 
        l.includes('✅') || 
        l.includes('❌') || 
        l.includes('🔄') || 
        l.includes('🔧') ||
        l.includes('Fixed') ||
        l.includes('fix') ||
        l.includes('Cycle') ||
        l.includes('Error')
      )
      .slice(-15);
    
    if (relevant.length > 0) {
      console.log('📊 RECENT ACTIVITY:\n');
      relevant.forEach(line => {
        const timestamp = line.match(/\[(.*?)\]/)?.[1] || '';
        const message = line.replace(/\[.*?\]\s*/, '').trim();
        
        if (line.includes('✅') || line.includes('Fixed')) {
          console.log(`  ✅ ${message}`);
        } else if (line.includes('❌') || line.includes('Error') || line.includes('failed')) {
          console.log(`  ❌ ${message}`);
        } else if (line.includes('🔄') || line.includes('Cycle')) {
          console.log(`  🔄 ${message}`);
        } else if (line.includes('🔧')) {
          console.log(`  🔧 ${message}`);
        } else {
          console.log(`  📝 ${message}`);
        }
      });
    } else {
      console.log('⏳ No recent activity...\n');
    }
  } catch (error) {
    console.log('⚠️  Could not read log file\n');
  }
}

function displayFixesSummary() {
  if (!fs.existsSync(FIXES_LOG)) {
    return;
  }
  
  try {
    const content = fs.readFileSync(FIXES_LOG, 'utf8');
    const fixes = content.match(/### \d{4}-\d{2}-\d{2}.*? - (.*?)\n/g) || [];
    
    if (fixes.length > 0) {
      console.log('\n📋 LOGGED FIXES:\n');
      fixes.slice(-5).forEach(fix => {
        const title = fix.match(/### .*? - (.*?)\n/)?.[1] || 'Unknown fix';
        console.log(`  • ${title}`);
      });
    }
  } catch (error) {
    // Ignore
  }
}

function main() {
  clearScreen();
  displayHeader();
  
  // Update every 2 seconds
  setInterval(() => {
    clearScreen();
    displayHeader();
    displayLatestFixes();
    displayFixesSummary();
    console.log('\n🔄 Auto-refreshing every 2 seconds... (Ctrl+C to stop)\n');
  }, 2000);
  
  // Initial display
  displayLatestFixes();
  displayFixesSummary();
  console.log('\n🔄 Auto-refreshing every 2 seconds... (Ctrl+C to stop)\n');
}

process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping live display...\n');
  process.exit(0);
});

main();

