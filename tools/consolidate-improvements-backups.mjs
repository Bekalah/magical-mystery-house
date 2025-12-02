#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Consolidate All Improvements & Backups
 * Merges all improvement files into one, all backups into one
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function consolidateAll() {
  console.log('🔧 Consolidating Improvements & Backups...\n');
  
  // Find all improvement files
  const improvementFiles = [
    'CHARACTER_DATA_IMPROVEMENTS.json',
    'IMPROVEMENT_EXPERIMENT_LOG.json',
    '.continuous-improvement-state.json',
    '.continuous-improvement-archive.json',
    '.egregore-improvement-state.json',
    'docs/MONOREPO_IMPROVEMENT_REPORT.json',
    'GAME_DATA_COMPILATION.json'
  ];
  
  // Find all backup files
  const backupFiles = [
    'system-labels.backup.json',
    'experiment-state.json' // Keep this as main state
  ];
  
  // Consolidate improvements
  const allImprovements = {
    timestamp: new Date().toISOString(),
    consolidated: true,
    sources: [],
    improvements: [],
    opportunities: [],
    characterData: null,
    gameData: null,
    experimentLog: []
  };
  
  for (const file of improvementFiles) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        allImprovements.sources.push({ file, timestamp: data.timestamp || new Date().toISOString() });
        
        if (data.improvements) {
          allImprovements.improvements.push(...(Array.isArray(data.improvements) ? data.improvements : [data.improvements]));
        }
        if (data.opportunities) {
          allImprovements.opportunities.push(...(Array.isArray(data.opportunities) ? data.opportunities : [data.opportunities]));
        }
        if (file.includes('CHARACTER')) {
          allImprovements.characterData = data;
        }
        if (file.includes('GAME')) {
          allImprovements.gameData = data;
        }
        if (file.includes('EXPERIMENT_LOG')) {
          allImprovements.experimentLog.push(data);
        }
      } catch (e) {
        console.warn(`⚠️  Could not read ${file}: ${e.message}`);
      }
    }
  }
  
  // Consolidate backups
  const allBackups = {
    timestamp: new Date().toISOString(),
    consolidated: true,
    sources: [],
    backups: {}
  };
  
  for (const file of backupFiles) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath) && file !== 'experiment-state.json') {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        allBackups.sources.push({ file, timestamp: data.timestamp || new Date().toISOString() });
        allBackups.backups[file] = data;
      } catch (e) {
        console.warn(`⚠️  Could not read ${file}: ${e.message}`);
      }
    }
  }
  
  // Save consolidated files
  const improvementsPath = path.join(rootDir, 'CONSOLIDATED_IMPROVEMENTS.json');
  const backupsPath = path.join(rootDir, 'CONSOLIDATED_BACKUPS.json');
  
  fs.writeFileSync(improvementsPath, JSON.stringify(allImprovements, null, 2), 'utf-8');
  fs.writeFileSync(backupsPath, JSON.stringify(allBackups, null, 2), 'utf-8');
  
  console.log(`✅ Consolidated ${allImprovements.sources.length} improvement files`);
  console.log(`   Improvements: ${allImprovements.improvements.length}`);
  console.log(`   Opportunities: ${allImprovements.opportunities.length}`);
  console.log(`   Saved to: ${improvementsPath}`);
  console.log(`\n✅ Consolidated ${allBackups.sources.length} backup files`);
  console.log(`   Saved to: ${backupsPath}`);
  
  // Archive old files (move to archive directory)
  const archiveDir = path.join(rootDir, '.archive');
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }
  
  let archived = 0;
  for (const file of [...improvementFiles, ...backupFiles]) {
    if (file === 'experiment-state.json') continue;
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      const archivePath = path.join(archiveDir, path.basename(file));
      fs.renameSync(filePath, archivePath);
      archived++;
    }
  }
  
  console.log(`\n📦 Archived ${archived} files to .archive/`);
  
  return { improvements: allImprovements, backups: allBackups };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  consolidateAll().catch(console.error);
}

export default consolidateAll;

