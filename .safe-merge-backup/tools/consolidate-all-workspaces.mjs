#!/usr/bin/env node
/**
 * Consolidate All Workspaces
 * 
 * Scans ALL workspaces, compares using real information,
 * connects them, consolidates, then eliminates separate workspaces
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

// Discover workspaces - preserve remote repos
function discoverWorkspaces() {
  const workspaces = [
    BASE_DIR, // cathedral-master-deployment (primary)
    path.resolve(BASE_DIR, '../cathedral-real'), // Remote repo - preserve
    path.resolve(BASE_DIR, '../cathedral-v1-consolidated'),
    path.resolve(BASE_DIR, '../cathedral-fixed-clean'),
    path.resolve(BASE_DIR, '../cosmogenesis-engine')
  ];
  
  return workspaces.filter(p => {
    if (!fs.existsSync(p)) return false;
    // Always include primary
    if (p === BASE_DIR) return true;
    // Check if it's a remote repo (has .git) - preserve those
    const gitDir = path.join(p, '.git');
    if (fs.existsSync(gitDir)) {
      // It's a git repo - preserve it
      return true;
    }
    // Include other workspaces
    return true;
  });
}

const ALL_WORKSPACES = discoverWorkspaces();

class ConsolidateAllWorkspaces {
  constructor() {
    this.entities = {
      packages: new Map(),
      apps: new Map(),
      tools: new Map(),
      systems: new Map(),
      engines: new Map()
    };
    this.connections = [];
    this.duplicates = [];
    this.partials = [];
    this.consolidated = [];
    this.errors = [];
  }

  async run() {
    console.log('🔗 CONSOLIDATE ALL WORKSPACES\n');
    console.log('═'.repeat(80) + '\n');

    // Phase 1: Discover everything in all workspaces
    await this.discoverAll();

    // Phase 2: Compare using real information
    await this.compareAll();

    // Phase 3: Connect based on real data
    await this.connectAll();

    // Phase 4: Consolidate duplicates and partials
    await this.consolidateAll();

    // Phase 5: Generate consolidation plan
    this.generatePlan();

    // Phase 6: Report what can be eliminated
    this.reportEliminations();
  }

  async discoverAll() {
    console.log('🔍 Phase 1: Discovering ALL entities in ALL workspaces...\n');

    for (const workspace of ALL_WORKSPACES) {
      const wsName = path.basename(workspace);
      console.log(`📂 Scanning: ${wsName}...`);

      // Discover packages
      await this.discoverPackages(workspace, wsName);

      // Discover apps
      await this.discoverApps(workspace, wsName);

      // Discover tools
      await this.discoverTools(workspace, wsName);

      // Discover systems
      await this.discoverSystems(workspace, wsName);

      // Discover engines
      await this.discoverEngines(workspace, wsName);
    }

    console.log(`\n   ✅ Discovered:`);
    console.log(`      Packages: ${this.entities.packages.size}`);
    console.log(`      Apps: ${this.entities.apps.size}`);
    console.log(`      Tools: ${this.entities.tools.size}`);
    console.log(`      Systems: ${this.entities.systems.size}`);
    console.log(`      Engines: ${this.entities.engines.size}\n`);
  }

  async discoverPackages(workspace, wsName) {
    const packagesDir = path.join(workspace, 'packages');
    if (!fs.existsSync(packagesDir)) return;

    const packages = fs.readdirSync(packagesDir).filter(item => {
      const itemPath = path.join(packagesDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const pkg of packages) {
      const pkgPath = path.join(packagesDir, pkg);
      const packageJsonPath = path.join(pkgPath, 'package.json');
      
      if (!fs.existsSync(packageJsonPath)) continue;

      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const realName = packageJson.name || pkg;
        
        if (!this.entities.packages.has(realName)) {
          this.entities.packages.set(realName, []);
        }

        const entity = {
          name: realName,
          workspace: wsName,
          path: pkgPath,
          version: packageJson.version,
          license: packageJson.license,
          hasSource: fs.existsSync(path.join(pkgPath, 'src')),
          hasTests: fs.existsSync(path.join(pkgPath, '__tests__')) || fs.existsSync(path.join(pkgPath, 'test')),
          hasDocs: fs.existsSync(path.join(pkgPath, 'README.md')),
          dependencies: packageJson.dependencies || {},
          packageJson
        };
        
        // Calculate quality score
        entity.qualityScore = this.calculateQuality(entity);
        entity.completenessScore = this.calculateCompleteness(entity);
        
        this.entities.packages.get(realName).push(entity);
      } catch (e) {
        this.errors.push({ type: 'package', workspace: wsName, package: pkg, error: e.message });
      }
    }
  }

  async discoverApps(workspace, wsName) {
    const appsDir = path.join(workspace, 'apps');
    if (!fs.existsSync(appsDir)) return;

    const apps = fs.readdirSync(appsDir).filter(item => {
      const itemPath = path.join(appsDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const app of apps) {
      const appPath = path.join(appsDir, app);
      const packageJsonPath = path.join(appPath, 'package.json');
      
      if (!fs.existsSync(packageJsonPath)) continue;

      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const realName = packageJson.name || app;
        
        if (!this.entities.apps.has(realName)) {
          this.entities.apps.set(realName, []);
        }

        const entity = {
          name: realName,
          workspace: wsName,
          path: appPath,
          version: packageJson.version,
          license: packageJson.license,
          hasSource: fs.existsSync(path.join(appPath, 'src')) || fs.existsSync(path.join(appPath, 'app')),
          hasTests: fs.existsSync(path.join(appPath, '__tests__')) || fs.existsSync(path.join(appPath, 'test')),
          hasDocs: fs.existsSync(path.join(appPath, 'README.md')),
          dependencies: packageJson.dependencies || {},
          packageJson
        };
        
        // Calculate quality score
        entity.qualityScore = this.calculateQuality(entity);
        entity.completenessScore = this.calculateCompleteness(entity);
        
        this.entities.apps.get(realName).push(entity);
      } catch (e) {
        this.errors.push({ type: 'app', workspace: wsName, app: app, error: e.message });
      }
    }
  }

  async discoverTools(workspace, wsName) {
    const toolsDir = path.join(workspace, 'tools');
    if (!fs.existsSync(toolsDir)) return;

    const tools = fs.readdirSync(toolsDir).filter(item => {
      const itemPath = path.join(toolsDir, item);
      return fs.statSync(itemPath).isFile() && (item.endsWith('.mjs') || item.endsWith('.ts') || item.endsWith('.js'));
    });

    for (const tool of tools) {
      const toolPath = path.join(toolsDir, tool);
      const realName = path.basename(tool, path.extname(tool));
      
      if (!this.entities.tools.has(realName)) {
        this.entities.tools.set(realName, []);
      }

      this.entities.tools.get(realName).push({
        name: realName,
        workspace: wsName,
        path: toolPath,
        size: fs.statSync(toolPath).size,
        modified: fs.statSync(toolPath).mtimeMs
      });
    }
  }

  async discoverSystems(workspace, wsName) {
    // Systems are typically in packages or defined in configs
    // For now, scan for system-related files
    const systemFiles = [
      path.join(workspace, 'system-map.json'),
      path.join(workspace, 'SYSTEM_MAP.md'),
      path.join(workspace, 'system-labels.json')
    ];

    for (const sysFile of systemFiles) {
      if (fs.existsSync(sysFile)) {
        const sysName = path.basename(sysFile, path.extname(sysFile));
        if (!this.entities.systems.has(sysName)) {
          this.entities.systems.set(sysName, []);
        }
        this.entities.systems.get(sysName).push({
          name: sysName,
          workspace: wsName,
          path: sysFile
        });
      }
    }
  }

  async discoverEngines(workspace, wsName) {
    // Engines are typically packages with "engine" in name
    const packagesDir = path.join(workspace, 'packages');
    if (!fs.existsSync(packagesDir)) return;

    const packages = fs.readdirSync(packagesDir).filter(item => {
      const itemPath = path.join(packagesDir, item);
      return fs.statSync(itemPath).isDirectory() && 
             (item.includes('engine') || item.includes('Engine'));
    });

    for (const engine of packages) {
      const enginePath = path.join(packagesDir, engine);
      const packageJsonPath = path.join(enginePath, 'package.json');
      
      if (!fs.existsSync(packageJsonPath)) continue;

      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const realName = packageJson.name || engine;
        
        if (!this.entities.engines.has(realName)) {
          this.entities.engines.set(realName, []);
        }

        this.entities.engines.get(realName).push({
          name: realName,
          workspace: wsName,
          path: enginePath,
          version: packageJson.version
        });
      } catch (e) {
        // Skip
      }
    }
  }

  async compareAll() {
    console.log('🔍 Phase 2: Comparing entities using REAL information...\n');

    // Compare packages
    for (const [name, locations] of this.entities.packages.entries()) {
      if (locations.length > 1) {
        this.duplicates.push({
          type: 'package',
          name: name,
          locations: locations.map(loc => ({
            workspace: loc.workspace,
            path: loc.path,
            version: loc.version,
            completeness: loc.completenessScore || this.calculateCompleteness(loc),
            quality: loc.qualityScore || this.calculateQuality(loc)
          }))
        });
      }
    }

    // Compare apps
    for (const [name, locations] of this.entities.apps.entries()) {
      if (locations.length > 1) {
        this.duplicates.push({
          type: 'app',
          name: name,
          locations: locations.map(loc => ({
            workspace: loc.workspace,
            path: loc.path,
            version: loc.version,
            completeness: loc.completenessScore || this.calculateCompleteness(loc),
            quality: loc.qualityScore || this.calculateQuality(loc)
          }))
        });
      }
    }

    // Compare tools
    for (const [name, locations] of this.entities.tools.entries()) {
      if (locations.length > 1) {
        // Check if files are identical
        const files = locations.map(loc => ({
          workspace: loc.workspace,
          path: loc.path,
          size: loc.size,
          modified: loc.modified,
          content: fs.readFileSync(loc.path, 'utf-8')
        }));

        const identical = files.every(f => f.content === files[0].content);
        
        this.duplicates.push({
          type: 'tool',
          name: name,
          locations: files.map(f => ({
            workspace: f.workspace,
            path: f.path,
            size: f.size
          })),
          identical: identical
        });
      }
    }

    console.log(`   ✅ Found ${this.duplicates.length} duplicate entities\n`);
  }

  calculateCompleteness(entity) {
    let score = 0;
    if (entity.hasSource) score += 2;
    if (entity.hasTests) score += 1;
    if (entity.hasDocs) score += 1;
    if (Object.keys(entity.dependencies || {}).length > 0) score += 1;
    return score;
  }

  calculateQuality(entity) {
    let qualityScore = 0;
    
    // Completeness (0-5 points)
    qualityScore += this.calculateCompleteness(entity);
    
    // Code quality checks
    if (entity.path) {
      try {
        const srcPath = path.join(entity.path, 'src');
        if (fs.existsSync(srcPath)) {
          const srcFiles = this.getAllSourceFiles(srcPath);
          
          // Check for TypeScript (better than JS)
          const tsFiles = srcFiles.filter(f => f.endsWith('.ts'));
          if (tsFiles.length > 0) qualityScore += 1;
          
          // Check file sizes (not too large = better organized)
          const avgSize = srcFiles.reduce((sum, f) => {
            try {
              return sum + fs.statSync(f).size;
            } catch {
              return sum;
            }
          }, 0) / srcFiles.length;
          if (avgSize < 50000) qualityScore += 1; // Well-organized files
          
          // Check for proper exports
          const hasIndex = srcFiles.some(f => f.includes('index.ts') || f.includes('index.js'));
          if (hasIndex) qualityScore += 1;
        }
      } catch (e) {
        // Skip quality checks if can't read
      }
    }
    
    // License check
    if (entity.license === 'CC0-1.0' || entity.license === 'CC0-1.0 - Public Domain') {
      qualityScore += 1;
    }
    
    // Version check (has version = better)
    if (entity.version && entity.version !== 'unknown') {
      qualityScore += 1;
    }
    
    return qualityScore;
  }

  getAllSourceFiles(dir) {
    const files = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          files.push(...this.getAllSourceFiles(fullPath));
        } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
          files.push(fullPath);
        }
      }
    } catch (e) {
      // Skip
    }
    return files;
  }

  async connectAll() {
    console.log('🔗 Phase 3: Connecting entities using REAL information...\n');

    // Connect based on dependencies
    for (const [name, locations] of this.entities.packages.entries()) {
      for (const loc of locations) {
        for (const [dep, version] of Object.entries(loc.dependencies || {})) {
          if (version.startsWith('workspace:') || this.entities.packages.has(dep)) {
            this.connections.push({
              from: { type: 'package', name: name, workspace: loc.workspace },
              to: { type: 'package', name: dep },
              relationship: 'depends-on'
            });
          }
        }
      }
    }

    console.log(`   ✅ Found ${this.connections.length} connections\n`);
  }

  async consolidateAll() {
    console.log('🔀 Phase 4: Consolidating duplicates based on QUALITY...\n');

    // Determine primary location for each duplicate (HIGHEST QUALITY)
    for (const dup of this.duplicates) {
      // Get full entity data with quality scores
      const entities = dup.locations.map(loc => {
        const entityList = this.entities[dup.type + 's'].get(dup.name) || [];
        return entityList.find(e => e.workspace === loc.workspace && e.path === loc.path);
      }).filter(e => e);
      
      // Choose highest quality
      const primary = entities.reduce((best, current) => {
        const bestScore = best.qualityScore || 0;
        const currentScore = current.qualityScore || 0;
        if (currentScore > bestScore) return current;
        if (currentScore === bestScore) {
          // Tie-breaker: prefer cathedral-master-deployment
          if (current.workspace === 'cathedral-master-deployment') return current;
          if (best.workspace === 'cathedral-master-deployment') return best;
        }
        return best;
      }, entities[0]);

      this.consolidated.push({
        type: dup.type,
        name: dup.name,
        primary: {
          workspace: primary.workspace,
          path: primary.path
        },
        mergeFrom: dup.locations
          .filter(loc => loc.workspace !== primary.workspace)
          .map(loc => ({
            workspace: loc.workspace,
            path: loc.path
          }))
      });
    }

    console.log(`   ✅ Consolidated ${this.consolidated.length} entities\n`);
  }

  generatePlan() {
    console.log('📋 Phase 5: Generating consolidation plan...\n');

    const plan = {
      timestamp: Date.now(),
      workspaces: ALL_WORKSPACES.map(ws => ({
        name: path.basename(ws),
        path: ws,
        canEliminate: path.basename(ws) !== 'cathedral-master-deployment'
      })),
      entities: {
        packages: this.entities.packages.size,
        apps: this.entities.apps.size,
        tools: this.entities.tools.size,
        systems: this.entities.systems.size,
        engines: this.entities.engines.size
      },
      duplicates: this.duplicates.length,
      consolidated: this.consolidated,
      connections: this.connections.length,
      consolidationSteps: this.generateConsolidationSteps()
    };

    const planPath = path.join(BASE_DIR, 'CONSOLIDATION_PLAN.json');
    fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));

    console.log(`   ✅ Plan saved: ${planPath}\n`);
  }

  generateConsolidationSteps() {
    const steps = [];

    // Step 1: Merge all packages into primary workspace
    steps.push({
      step: 1,
      action: 'Merge packages',
      description: 'Copy all unique packages from other workspaces to cathedral-master-deployment/packages',
      entities: this.consolidated.filter(c => c.type === 'package').length
    });

    // Step 2: Merge all apps
    steps.push({
      step: 2,
      action: 'Merge apps',
      description: 'Copy all unique apps from other workspaces to cathedral-master-deployment/apps',
      entities: this.consolidated.filter(c => c.type === 'app').length
    });

    // Step 3: Merge all tools
    steps.push({
      step: 3,
      action: 'Merge tools',
      description: 'Copy all unique tools from other workspaces to cathedral-master-deployment/tools',
      entities: this.consolidated.filter(c => c.type === 'tool').length
    });

    // Step 4: Update all references
    steps.push({
      step: 4,
      action: 'Update references',
      description: 'Update all import paths and dependencies to point to consolidated locations'
    });

    // Step 5: Verify consolidation
    steps.push({
      step: 5,
      action: 'Verify',
      description: 'Run builds and tests to verify everything works'
    });

    // Step 6: Archive old workspaces
    steps.push({
      step: 6,
      action: 'Archive workspaces',
      description: 'Move old workspaces to archive directory (don\'t delete yet)',
      workspaces: ALL_WORKSPACES
        .filter(ws => path.basename(ws) !== 'cathedral-master-deployment')
        .map(ws => path.basename(ws))
    });

    return steps;
  }

  reportEliminations() {
    console.log('🗑️  Phase 6: Workspaces that can be eliminated...\n');

    const canEliminate = ALL_WORKSPACES.filter(ws => 
      path.basename(ws) !== 'cathedral-master-deployment'
    );

    for (const ws of canEliminate) {
      const wsName = path.basename(ws);
      const entitiesFromWs = {
        packages: Array.from(this.entities.packages.values())
          .flat()
          .filter(e => e.workspace === wsName).length,
        apps: Array.from(this.entities.apps.values())
          .flat()
          .filter(e => e.workspace === wsName).length,
        tools: Array.from(this.entities.tools.values())
          .flat()
          .filter(e => e.workspace === wsName).length
      };

      console.log(`   📂 ${wsName}:`);
      console.log(`      Packages: ${entitiesFromWs.packages}`);
      console.log(`      Apps: ${entitiesFromWs.apps}`);
      console.log(`      Tools: ${entitiesFromWs.tools}`);
      console.log(`      Status: Can be consolidated and eliminated\n`);
    }

    console.log('✅ Consolidation complete!\n');
    console.log('📄 See CONSOLIDATION_PLAN.json for full details\n');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const consolidator = new ConsolidateAllWorkspaces();
  consolidator.run().catch(console.error);
}

export default ConsolidateAllWorkspaces;

