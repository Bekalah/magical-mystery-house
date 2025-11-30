#!/usr/bin/env node
/**
 * Update Codex with Circuitum99: Alpha et Omega
 * 
 * Updates all codex files to include circuitum99 as alpha et omega
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class UpdateCodexCircuitum99 {
  constructor() {
    this.updated = [];
    this.errors = [];
  }

  async run() {
    console.log('📚 UPDATING CODEX: Circuitum99 - Alpha et Omega\n');
    console.log('═'.repeat(80) + '\n');

    // Find all codex files
    const codexFiles = await this.findCodexFiles();
    console.log(`📂 Found ${codexFiles.length} codex files\n`);

    // Update each codex file
    for (const file of codexFiles) {
      await this.updateCodexFile(file);
    }

    // Create/update main codex entry
    await this.createMainCodexEntry();

    console.log('═'.repeat(80));
    console.log('\n✅ CODEX UPDATE COMPLETE\n');
    console.log(`📝 Updated: ${this.updated.length} files`);
    if (this.errors.length > 0) {
      console.log(`⚠️  Errors: ${this.errors.length}\n`);
    } else {
      console.log('');
    }
  }

  async findCodexFiles() {
    const files = [];
    
    // Search directories recursively
    const searchDirs = [
      path.join(BASE_DIR, 'docs', 'codex-generated'),
      path.join(BASE_DIR, 'packages', 'codex-144-99-core'),
      path.join(BASE_DIR, 'packages', 'codex-144-99'),
      BASE_DIR
    ];
    
    for (const dir of searchDirs) {
      if (fs.existsSync(dir)) {
        this.searchDirectory(dir, files);
      }
    }
    
    return [...new Set(files)];
  }

  searchDirectory(dir, files, depth = 0) {
    if (depth > 5) return; // Limit depth
    if (dir.includes('node_modules') || dir.includes('dist')) return;
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          this.searchDirectory(fullPath, files, depth + 1);
        } else if (entry.isFile() && 
                   (entry.name.toLowerCase().includes('codex') || 
                    entry.name.startsWith('CODEX')) &&
                   entry.name.endsWith('.json')) {
          files.push(fullPath);
        }
      }
    } catch (e) {
      // Skip
    }
  }

  async updateCodexFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const codex = JSON.parse(content);

      // Add circuitum99 as alpha et omega
      if (!codex.circuitum99) {
        codex.circuitum99 = {
          name: 'Circuitum99',
          title: 'Alpha et Omega',
          description: 'The beginning and the end - the complete circuit of creation',
          type: 'alpha-et-omega',
          status: 'master',
          principle: 'Complete cycle of transformation',
          alchemical: 'Circularis',
          symbol: '○',
          element: 'All',
          correspondences: {
            alpha: 'Beginning, creation, initiation',
            omega: 'Completion, fulfillment, return',
            cycle: 'Eternal return, continuous transformation'
          }
        };
      } else {
        // Update existing entry
        codex.circuitum99.title = 'Alpha et Omega';
        codex.circuitum99.type = 'alpha-et-omega';
        codex.circuitum99.status = 'master';
        codex.circuitum99.alchemical = 'Circularis';
        codex.circuitum99.symbol = '○';
      }

      // Add to systems if not present
      if (!codex.systems) codex.systems = [];
      if (!codex.systems.find(s => s.name === 'circuitum99')) {
        codex.systems.push({
          name: 'circuitum99',
          title: 'Alpha et Omega',
          type: 'master-system',
          status: 'active'
        });
      }

      fs.writeFileSync(filePath, JSON.stringify(codex, null, 2));
      this.updated.push(filePath);
      console.log(`   ✅ Updated: ${path.relative(BASE_DIR, filePath)}`);
    } catch (e) {
      this.errors.push({ file: filePath, error: e.message });
      console.log(`   ⚠️  Error: ${path.relative(BASE_DIR, filePath)} - ${e.message}`);
    }
  }

  async createMainCodexEntry() {
    const mainCodexPath = path.join(BASE_DIR, 'CODEX_MASTER.json');
    
    const masterCodex = {
      timestamp: Date.now(),
      version: '1.0.0',
      title: 'Cathedral Master Codex',
      license: 'CC0-1.0 - Public Domain',
      circuitum99: {
        name: 'Circuitum99',
        title: 'Alpha et Omega',
        description: 'The beginning and the end - the complete circuit of creation and transformation',
        type: 'alpha-et-omega',
        status: 'master',
        principle: 'Complete cycle of transformation',
        alchemical: 'Circularis',
        symbol: '○',
        element: 'All Elements',
        planet: 'All Planets',
        metal: 'Philosopher\'s Stone',
        correspondences: {
          alpha: 'Beginning, creation, initiation, first principle',
          omega: 'Completion, fulfillment, return, final state',
          cycle: 'Eternal return, continuous transformation, alchemical circulation',
          process: 'Solve et Coagula - dissolution and coagulation in perfect cycle'
        },
        repositories: [
          'Bekalah/circuitum99',
          'Bekalah/circuitum99-minimal',
          'Bekalah/codex-14499'
        ],
        integration: {
          cathedral: 'Master integration point',
          circuits: 'Core circuit system',
          magnumOpus: 'Alpha et Omega of the work'
        }
      },
      masterRepos: {
        primary: 'Bekalah/cathedral-master',
        consolidation: 'cathedral-master-deployment',
        status: 'consolidated'
      },
      tools: {
        policy: 'free-only',
        noSubscriptions: true,
        noPaidServices: true,
        localOnly: true
      }
    };

    fs.writeFileSync(mainCodexPath, JSON.stringify(masterCodex, null, 2));
    this.updated.push(mainCodexPath);
    console.log(`\n   ✅ Created: CODEX_MASTER.json\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const updater = new UpdateCodexCircuitum99();
  updater.run().catch(console.error);
}

export default UpdateCodexCircuitum99;

