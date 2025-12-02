#!/usr/bin/env node
/**
 * Connect All Cathedral/Circuits/Magnum Opus Work
 * 
 * Maps and connects all related repositories
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class ConnectCathedralWork {
  constructor() {
    this.cathedralRepos = [];
    this.circuitRepos = [];
    this.magnumOpusRepos = [];
    this.connections = [];
  }

  async run() {
    console.log('🔗 CONNECTING ALL CATHEDRAL/CIRCUITS/MAGNUM OPUS WORK\n');
    console.log('═'.repeat(80) + '\n');

    await this.identifyRepos();
    await this.mapConnections();
    await this.connectRepos();
    this.generateReport();
  }

  async identifyRepos() {
    console.log('🔍 Identifying related repositories...\n');

    // Cathedral repos
    const cathedralRepos = [
      'Bekalah/cathedral-master',
      'Bekalah/cathedral',
      'Bekalah/cathedral-integration-workspace',
      'Bekalah/cathedral-minimal',
      'Bekalah/cathedral-research',
      'Bekalah/cathedral-vercel',
      'Bekalah/cathedral-connection-map',
      'Bekalah/BUILDING-CATHEDRALS'
    ];

    // Circuit repos
    const circuitRepos = [
      'Bekalah/circuitum99',
      'Bekalah/circuitum99-minimal',
      'Bekalah/codex-14499',
      'Bekalah/tesseract-bridge'
    ];

    // Magnum Opus / Related
    const magnumOpusRepos = [
      'Bekalah/stone-grimoire',
      'Bekalah/liber-arcanae',
      'Bekalah/liber-arcanae-game',
      'Bekalah/magical-mystery-house',
      'Bekalah/cosmogenesis-learning-engine',
      'Bekalah/master-catalog-browser'
    ];

    console.log('📂 Cathedral Repositories:');
    for (const repo of cathedralRepos) {
      const exists = await this.checkRepoExists(repo);
      if (exists) {
        this.cathedralRepos.push(repo);
        console.log(`   ✅ ${repo}`);
      }
    }

    console.log('\n⚡ Circuit Repositories:');
    for (const repo of circuitRepos) {
      const exists = await this.checkRepoExists(repo);
      if (exists) {
        this.circuitRepos.push(repo);
        console.log(`   ✅ ${repo}`);
      }
    }

    console.log('\n🎨 Magnum Opus Repositories:');
    for (const repo of magnumOpusRepos) {
      const exists = await this.checkRepoExists(repo);
      if (exists) {
        this.magnumOpusRepos.push(repo);
        console.log(`   ✅ ${repo}`);
      }
    }
    console.log('');
  }

  async checkRepoExists(repo) {
    try {
      execSync(`git ls-remote https://github.com/${repo}.git 2>&1`, {
        stdio: 'pipe',
        timeout: 5000
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async mapConnections() {
    console.log('🔗 Mapping connections...\n');

    // Main hub: cathedral-master-deployment
    const mainRepo = BASE_DIR;
    
    // Add remotes for all related repos
    const allRepos = [
      ...this.cathedralRepos,
      ...this.circuitRepos,
      ...this.magnumOpusRepos
    ];

    for (const repo of allRepos) {
      const repoName = repo.split('/')[1];
      const remoteName = repoName.replace(/-/g, '_');
      
      this.connections.push({
        local: 'cathedral-master-deployment',
        remote: repo,
        remoteName: remoteName,
        type: this.getRepoType(repo)
      });
    }

    console.log(`   ✅ Mapped ${this.connections.length} connections\n`);
  }

  getRepoType(repo) {
    if (this.cathedralRepos.includes(repo)) return 'cathedral';
    if (this.circuitRepos.includes(repo)) return 'circuit';
    if (this.magnumOpusRepos.includes(repo)) return 'magnum-opus';
    return 'other';
  }

  async connectRepos() {
    console.log('🔗 Connecting remotes to cathedral-master-deployment...\n');

    if (!fs.existsSync(path.join(BASE_DIR, '.git'))) {
      console.log('   ⚠️  Not a git repo, initializing...');
      execSync('git init', { cwd: BASE_DIR, stdio: 'pipe' });
    }

    for (const conn of this.connections) {
      const repoName = conn.remote.split('/')[1];
      const remoteName = repoName.replace(/-/g, '_');
      const url = `https://github.com/${conn.remote}.git`;

      try {
        // Check if remote exists
        try {
          execSync(`git remote get-url ${remoteName}`, {
            cwd: BASE_DIR,
            stdio: 'pipe'
          });
          // Update if exists
          execSync(`git remote set-url ${remoteName} ${url}`, {
            cwd: BASE_DIR,
            stdio: 'pipe'
          });
          console.log(`   ✅ Updated: ${remoteName} → ${conn.remote}`);
        } catch (e) {
          // Add if doesn't exist
          execSync(`git remote add ${remoteName} ${url}`, {
            cwd: BASE_DIR,
            stdio: 'pipe'
          });
          console.log(`   ✅ Added: ${remoteName} → ${conn.remote}`);
        }
      } catch (e) {
        console.log(`   ⚠️  Failed: ${remoteName} - ${e.message}`);
      }
    }
    console.log('');
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      cathedral: this.cathedralRepos,
      circuits: this.circuitRepos,
      magnumOpus: this.magnumOpusRepos,
      connections: this.connections,
      summary: {
        totalCathedral: this.cathedralRepos.length,
        totalCircuits: this.circuitRepos.length,
        totalMagnumOpus: this.magnumOpusRepos.length,
        totalConnections: this.connections.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'CATHEDRAL_CONNECTIONS.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('═'.repeat(80));
    console.log('\n📊 CONNECTION SUMMARY\n');
    console.log(`📂 Cathedral: ${this.cathedralRepos.length} repos`);
    console.log(`⚡ Circuits: ${this.circuitRepos.length} repos`);
    console.log(`🎨 Magnum Opus: ${this.magnumOpusRepos.length} repos`);
    console.log(`🔗 Total Connections: ${this.connections.length}`);
    console.log(`\n📄 Report: ${reportPath}\n`);
    console.log('💡 All remotes added to cathedral-master-deployment');
    console.log('   Use: git fetch <remote-name> to sync\n');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const connector = new ConnectCathedralWork();
  connector.run().catch(console.error);
}

export default ConnectCathedralWork;

