#!/usr/bin/env node
/**
 * Archive Old Repos
 * 
 * Identifies and archives old/degraded repos that are not modern
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class OldRepoArchiver {
  constructor() {
    this.connectionsFile = path.join(BASE_DIR, 'CATHEDRAL_CONNECTIONS.json');
    this.archiveFile = path.join(BASE_DIR, 'ARCHIVED_REPOS.json');
    this.archived = [];
  }

  async archiveOld() {
    console.log('📦 ARCHIVING OLD REPOS\n');
    console.log('═'.repeat(80) + '\n');

    if (!fs.existsSync(this.connectionsFile)) {
      console.log('⚠️  CATHEDRAL_CONNECTIONS.json not found\n');
      return;
    }

    const connections = JSON.parse(fs.readFileSync(this.connectionsFile, 'utf-8'));
    const repos = connections.connections || [];

    // Identify old repos (minimal, research, old naming patterns)
    const oldPatterns = [
      /minimal/i,
      /research/i,
      /old/i,
      /legacy/i,
      /v1[_-]/i,
      /archive/i
    ];

    const modernRepos = [];
    const oldRepos = [];

    for (const repo of repos) {
      const remoteName = repo.remote || '';
      const isOld = oldPatterns.some(pattern => pattern.test(remoteName));
      
      if (isOld) {
        oldRepos.push(repo);
      } else {
        modernRepos.push(repo);
      }
    }

    console.log(`📊 Found ${repos.length} total repos`);
    console.log(`✅ Modern repos: ${modernRepos.length}`);
    console.log(`📦 Old repos to archive: ${oldRepos.length}\n`);

    // Archive old repos
    if (oldRepos.length > 0) {
      const archive = {
        timestamp: new Date().toISOString(),
        archived: oldRepos.map(repo => ({
          remote: repo.remote,
          remoteName: repo.remoteName,
          type: repo.type,
          reason: 'Old/degraded pattern detected',
          archivedAt: new Date().toISOString()
        })),
        modern: modernRepos.map(repo => ({
          remote: repo.remote,
          remoteName: repo.remoteName,
          type: repo.type
        }))
      };

      fs.writeFileSync(this.archiveFile, JSON.stringify(archive, null, 2), 'utf-8');
      console.log(`📄 Archive saved: ARCHIVED_REPOS.json\n`);

      // Update connections to only include modern repos
      connections.connections = modernRepos;
      fs.writeFileSync(this.connectionsFile, JSON.stringify(connections, null, 2), 'utf-8');
      console.log(`✅ Updated CATHEDRAL_CONNECTIONS.json with ${modernRepos.length} modern repos\n`);
    }

    console.log('═'.repeat(80));
    console.log('\n✅ ARCHIVING COMPLETE\n');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const archiver = new OldRepoArchiver();
  archiver.archiveOld().catch(console.error);
}

export default OldRepoArchiver;

