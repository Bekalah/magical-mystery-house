#!/usr/bin/env node
/**
 * Compress Experiment State
 * 
 * Keeps experiment-state.json manageable by:
 * - Keeping recent improvements (last N cycles)
 * - Archiving old improvements to a summary
 * - Maintaining current cycle and stats
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const STATE_FILE = path.join(BASE_DIR, 'experiment-state.json');
const ARCHIVE_FILE = path.join(BASE_DIR, 'experiment-state-archive.json');
const MAX_IMPROVEMENTS = 1000; // Keep last 1000 improvements
const MAX_FILE_SIZE_MB = 5; // Compress if file exceeds 5MB

class StateCompressor {
  async compress() {
    if (!fs.existsSync(STATE_FILE)) {
      return;
    }

    const stats = fs.statSync(STATE_FILE);
    const sizeMB = stats.size / (1024 * 1024);

    // Only compress if file is getting large
    if (sizeMB < MAX_FILE_SIZE_MB) {
      return;
    }

    console.log(`📦 Compressing experiment state (${sizeMB.toFixed(2)}MB)...\n`);

    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    const improvements = state.improvements || [];
    const errors = state.errors || [];

    // Keep recent improvements
    const recentImprovements = improvements.slice(-MAX_IMPROVEMENTS);
    const archivedImprovements = improvements.slice(0, -MAX_IMPROVEMENTS);

    // Keep recent errors
    const recentErrors = errors.slice(-500);
    const archivedErrors = errors.slice(0, -500);

    // Create archive entry
    const archiveEntry = {
      timestamp: new Date().toISOString(),
      cycles: {
        from: archivedImprovements[0]?.cycle || 0,
        to: archivedImprovements[archivedImprovements.length - 1]?.cycle || 0
      },
      improvements: archivedImprovements.length,
      errors: archivedErrors.length,
      summary: {
        enhancements: archivedImprovements.filter(i => i.type === 'enhancement').length,
        fixes: archivedImprovements.filter(i => i.type === 'fix').length,
        connections: archivedImprovements.filter(i => i.type === 'connection').length
      }
    };

    // Load existing archive
    let archive = { entries: [] };
    if (fs.existsSync(ARCHIVE_FILE)) {
      try {
        archive = JSON.parse(fs.readFileSync(ARCHIVE_FILE, 'utf-8'));
      } catch (e) {
        // Start fresh archive
      }
    }

    // Add new archive entry
    archive.entries.push(archiveEntry);
    archive.lastUpdated = new Date().toISOString();
    archive.totalArchived = archive.entries.reduce((sum, e) => sum + e.improvements, 0);

    // Update state with recent data only
    state.improvements = recentImprovements;
    state.errors = recentErrors;
    state.archived = {
      improvements: archive.totalArchived,
      entries: archive.entries.length,
      lastArchived: archiveEntry.timestamp
    };

    // Save compressed state
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
    
    // Save archive
    fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(archive, null, 2));

    const newSizeMB = fs.statSync(STATE_FILE).size / (1024 * 1024);
    console.log(`✅ Compressed: ${sizeMB.toFixed(2)}MB → ${newSizeMB.toFixed(2)}MB`);
    console.log(`   Kept: ${recentImprovements.length} recent improvements`);
    console.log(`   Archived: ${archivedImprovements.length} improvements\n`);
  }
}

const compressor = new StateCompressor();
compressor.compress().catch(e => {
  console.error('❌ Compression error:', e);
  process.exit(1);
});

