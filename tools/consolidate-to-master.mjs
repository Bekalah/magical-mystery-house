#!/usr/bin/env node
/**
 * Consolidate Work into Master Repos
 * 
 * Consolidates all work into the newer "master" repos:
 * - Bekalah/cathedral-master (primary)
 * - cathedral-master-deployment (local consolidation)
 * 
 * Uses only free tools, no subscriptions
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

class ConsolidateToMaster {
  constructor() {
    this.masterRepo = 'Bekalah/cathedral-master';
    this.localMaster = BASE_DIR;
    this.consolidated = [];
    this.errors = [];
  }

  async run() {
    console.log('🔀 CONSOLIDATING TO MASTER REPOS\n');
    console.log('═'.repeat(80) + '\n');
    console.log('📋 Master Repos:');
    console.log(`   Primary: ${this.masterRepo}`);
    console.log(`   Local: ${path.basename(this.localMaster)}\n`);

    // Load connections
    const connections = await this.loadConnections();
    
    // Consolidate by category
    await this.consolidateCathedral(connections);
    await this.consolidateCircuits(connections);
    await this.consolidateMagnumOpus(connections);
    
    // Update remotes to point to master
    await this.updateRemotesToMaster();
    
    // Generate consolidation report
    this.generateReport();
  }

  async loadConnections() {
    const connectionsFile = path.join(BASE_DIR, 'CATHEDRAL_CONNECTIONS.json');
    if (!fs.existsSync(connectionsFile)) {
      console.log('⚠️  CATHEDRAL_CONNECTIONS.json not found');
      return { connections: [] };
    }
    
    return JSON.parse(fs.readFileSync(connectionsFile, 'utf-8'));
  }

  async consolidateCathedral(connections) {
    console.log('📂 Consolidating Cathedral repos...\n');
    
    const cathedralRepos = connections.cathedral || [];
    
    for (const repo of cathedralRepos) {
      if (repo === this.masterRepo) continue; // Skip master itself
      
      console.log(`   📦 ${repo}`);
      console.log(`      → Consolidating into ${this.masterRepo}`);
      
      // Add as remote if not already
      const remoteName = repo.split('/')[1].replace(/-/g, '_');
      try {
        execSync(`git remote add ${remoteName} https://github.com/${repo}.git 2>&1 || git remote set-url ${remoteName} https://github.com/${repo}.git`, {
          cwd: BASE_DIR,
          stdio: 'pipe'
        });
        
        this.consolidated.push({
          type: 'cathedral',
          repo: repo,
          consolidated: true,
          remote: remoteName
        });
        console.log(`      ✅ Added as remote: ${remoteName}\n`);
      } catch (e) {
        this.errors.push({ repo, error: e.message });
        console.log(`      ⚠️  Error: ${e.message}\n`);
      }
    }
  }

  async consolidateCircuits(connections) {
    console.log('⚡ Consolidating Circuit repos...\n');
    
    const circuitRepos = connections.circuits || [];
    
    for (const repo of circuitRepos) {
      console.log(`   ⚡ ${repo}`);
      console.log(`      → Circuitum99: Alpha et Omega`);
      console.log(`      → Consolidating into ${this.masterRepo}`);
      
      const remoteName = repo.split('/')[1].replace(/-/g, '_');
      try {
        execSync(`git remote add ${remoteName} https://github.com/${repo}.git 2>&1 || git remote set-url ${remoteName} https://github.com/${repo}.git`, {
          cwd: BASE_DIR,
          stdio: 'pipe'
        });
        
        this.consolidated.push({
          type: 'circuit',
          repo: repo,
          consolidated: true,
          remote: remoteName,
          note: 'Circuitum99: Alpha et Omega'
        });
        console.log(`      ✅ Added as remote: ${remoteName}\n`);
      } catch (e) {
        this.errors.push({ repo, error: e.message });
        console.log(`      ⚠️  Error: ${e.message}\n`);
      }
    }
  }

  async consolidateMagnumOpus(connections) {
    console.log('🎨 Consolidating Magnum Opus repos...\n');
    
    const magnumOpusRepos = connections.magnumOpus || [];
    
    for (const repo of magnumOpusRepos) {
      console.log(`   🎨 ${repo}`);
      console.log(`      → Consolidating into ${this.masterRepo}`);
      
      const remoteName = repo.split('/')[1].replace(/-/g, '_');
      try {
        execSync(`git remote add ${remoteName} https://github.com/${repo}.git 2>&1 || git remote set-url ${remoteName} https://github.com/${repo}.git`, {
          cwd: BASE_DIR,
          stdio: 'pipe'
        });
        
        this.consolidated.push({
          type: 'magnum-opus',
          repo: repo,
          consolidated: true,
          remote: remoteName
        });
        console.log(`      ✅ Added as remote: ${remoteName}\n`);
      } catch (e) {
        this.errors.push({ repo, error: e.message });
        console.log(`      ⚠️  Error: ${e.message}\n`);
      }
    }
  }

  async updateRemotesToMaster() {
    console.log('🔗 Updating remotes to point to master...\n');
    
    try {
      // Set origin to master
      execSync(`git remote set-url origin https://github.com/${this.masterRepo}.git`, {
        cwd: BASE_DIR,
        stdio: 'pipe'
      });
      console.log(`   ✅ origin → ${this.masterRepo}`);
      
      // Set master-cathedral to master
      execSync(`git remote set-url master-cathedral https://github.com/${this.masterRepo}.git 2>&1 || git remote add master-cathedral https://github.com/${this.masterRepo}.git`, {
        cwd: BASE_DIR,
        stdio: 'pipe'
      });
      console.log(`   ✅ master-cathedral → ${this.masterRepo}\n`);
    } catch (e) {
      console.log(`   ⚠️  Error updating remotes: ${e.message}\n`);
    }
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      masterRepo: this.masterRepo,
      localMaster: path.basename(this.localMaster),
      consolidated: this.consolidated,
      errors: this.errors,
      summary: {
        totalConsolidated: this.consolidated.length,
        cathedral: this.consolidated.filter(c => c.type === 'cathedral').length,
        circuits: this.consolidated.filter(c => c.type === 'circuit').length,
        magnumOpus: this.consolidated.filter(c => c.type === 'magnum-opus').length,
        errors: this.errors.length
      },
      tools: {
        policy: 'free-only',
        noSubscriptions: true,
        noPaidServices: true,
        localOnly: true
      }
    };

    const reportPath = path.join(BASE_DIR, 'CONSOLIDATION_TO_MASTER.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('═'.repeat(80));
    console.log('\n📊 CONSOLIDATION SUMMARY\n');
    console.log(`✅ Consolidated: ${this.consolidated.length} repos`);
    console.log(`   Cathedral: ${report.summary.cathedral}`);
    console.log(`   Circuits: ${report.summary.circuits}`);
    console.log(`   Magnum Opus: ${report.summary.magnumOpus}`);
    console.log(`\n📄 Report: ${reportPath}\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const consolidator = new ConsolidateToMaster();
  consolidator.run().catch(console.error);
}

export default ConsolidateToMaster;

