#!/usr/bin/env node
/**
 * Include Remote Repos in Discovery
 * 
 * Clones/fetches all connected remotes for analysis
 * Reads from CATHEDRAL_CONNECTIONS.json
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');
const REMOTE_REPOS_DIR = path.join(BASE_DIR, '.remote-repos');
const CONNECTIONS_FILE = path.join(BASE_DIR, 'CATHEDRAL_CONNECTIONS.json');

async function syncAllRemotes() {
  console.log('🔄 Syncing all remote repositories for discovery...\n');
  
  if (!fs.existsSync(CONNECTIONS_FILE)) {
    console.log('⚠️  CATHEDRAL_CONNECTIONS.json not found');
    console.log('💡 Run: pnpm run connect:cathedral first\n');
    return;
  }
  
  const connections = JSON.parse(fs.readFileSync(CONNECTIONS_FILE, 'utf-8'));
  const remotes = connections.connections || [];
  
  if (remotes.length === 0) {
    console.log('⚠️  No remote connections found');
    return;
  }
  
  if (!fs.existsSync(REMOTE_REPOS_DIR)) {
    fs.mkdirSync(REMOTE_REPOS_DIR, { recursive: true });
  }
  
  console.log(`📥 Syncing ${remotes.length} remote repositories...\n`);
  
  let synced = 0;
  let errors = 0;
  
  for (const remote of remotes) {
    const repoName = remote.remote.split('/')[1];
    const localPath = path.join(REMOTE_REPOS_DIR, repoName);
    const url = `https://github.com/${remote.remote}.git`;
    
    try {
      if (fs.existsSync(localPath)) {
        console.log(`   🔄 Updating ${repoName}...`);
        execSync('git fetch --depth 1', { cwd: localPath, stdio: 'pipe', timeout: 30000 });
        synced++;
      } else {
        console.log(`   📥 Cloning ${repoName}...`);
        execSync(`git clone --depth 1 ${url} ${localPath}`, { stdio: 'pipe', timeout: 60000 });
        synced++;
      }
      console.log(`   ✅ ${repoName}`);
    } catch (e) {
      console.log(`   ⚠️  ${repoName} - ${e.message}`);
      errors++;
    }
  }
  
  console.log(`\n✅ Synced ${synced} repositories`);
  if (errors > 0) {
    console.log(`⚠️  ${errors} errors\n`);
  } else {
    console.log('');
  }
}

syncAllRemotes().catch(console.error);

