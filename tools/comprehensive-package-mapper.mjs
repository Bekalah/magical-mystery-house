#!/usr/bin/env node
/**
 * Comprehensive Package Mapper
 * 
 * Maps all packages with full relationship information:
 * - Dependencies (workspace, npm)
 * - Relationships (uses, used by)
 * - Codex connections
 * - Alchemical correspondences
 * - System connections
 * - Dependency graph
 * - Build order
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class ComprehensivePackageMapper {
  constructor() {
    this.packages = [];
    this.dependencies = new Map(); // package -> [dependencies]
    this.dependents = new Map(); // package -> [dependents]
    this.codexConnections = new Map();
    this.systemConnections = new Map();
    this.alchemicalMap = new Map();
    this.circularDeps = [];
    this.buildOrder = [];
  }

  async mapAll() {
    console.log('🗺️  COMPREHENSIVE PACKAGE MAPPING\n');
    console.log('═'.repeat(80) + '\n');

    // Load data
    await this.loadDiscoveryReport();
    await this.loadSystemLabels();
    
    // Map relationships
    await this.mapDependencies();
    await this.mapCodexConnections();
    await this.mapSystemConnections();
    await this.mapAlchemicalCorrespondences();
    
    // Analyze
    this.detectCircularDependencies();
    this.calculateBuildOrder();
    
    // Generate report
    this.generateMap();

    console.log('═'.repeat(80));
    console.log('\n✅ PACKAGE MAPPING COMPLETE\n');
    console.log(`📦 Packages mapped: ${this.packages.length}`);
    console.log(`🔗 Dependencies: ${this.dependencies.size}`);
    console.log(`⚗️  Codex connections: ${this.codexConnections.size}`);
    console.log(`🔮 System connections: ${this.systemConnections.size}`);
    console.log(`⚠️  Circular dependencies: ${this.circularDeps.length}\n`);
  }

  async loadDiscoveryReport() {
    const reportPath = path.join(BASE_DIR, 'DISCOVERY_REPORT.json');
    if (!fs.existsSync(reportPath)) {
      throw new Error('DISCOVERY_REPORT.json not found. Run comprehensive-discovery first.');
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    this.packages = report.discovered?.packages || [];
    console.log(`📂 Loaded ${this.packages.length} packages from discovery report\n`);
  }

  async loadSystemLabels() {
    const labelsPath = path.join(BASE_DIR, 'system-labels.json');
    if (!fs.existsSync(labelsPath)) {
      console.log('⚠️  system-labels.json not found, continuing without labels\n');
      return;
    }

    const labels = JSON.parse(fs.readFileSync(labelsPath, 'utf-8'));
    const labelMap = new Map();
    
    (labels.packages || []).forEach(pkg => {
      labelMap.set(pkg.name || pkg.packageName, pkg);
    });

    this.labelMap = labelMap;
    console.log(`🏷️  Loaded ${labelMap.size} package labels\n`);
  }

  async mapDependencies() {
    console.log('🔗 Mapping dependencies...\n');

    for (const pkg of this.packages) {
      const pkgPath = pkg.path;
      if (!pkgPath || !fs.existsSync(pkgPath)) continue;

      const packageJsonPath = path.join(pkgPath, 'package.json');
      if (!fs.existsSync(packageJsonPath)) continue;

      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const pkgName = packageJson.name || pkg.realName;
        const deps = [];

        // Workspace dependencies
        const allDeps = {
          ...(packageJson.dependencies || {}),
          ...(packageJson.devDependencies || {}),
          ...(packageJson.peerDependencies || {})
        };

        for (const [depName, depVersion] of Object.entries(allDeps)) {
          if (depVersion.startsWith('workspace:') || depVersion === '*' || depVersion.startsWith('^') || depVersion.startsWith('~')) {
            // Check if it's a workspace package
            const workspaceDep = this.packages.find(p => 
              (p.packageJson?.name === depName) || 
              (p.realName === depName) ||
              (p.packageJson?.name === depName.replace('@cathedral/', ''))
            );
            
            if (workspaceDep) {
              deps.push({
                name: depName,
                type: 'workspace',
                version: depVersion,
                target: workspaceDep.realName || workspaceDep.packageJson?.name
              });
            } else {
              deps.push({
                name: depName,
                type: 'external',
                version: depVersion
              });
            }
          } else {
            deps.push({
              name: depName,
              type: 'external',
              version: depVersion
            });
          }
        }

        this.dependencies.set(pkgName, deps);

        // Map dependents (reverse dependencies)
        for (const dep of deps) {
          if (dep.type === 'workspace' && dep.target) {
            if (!this.dependents.has(dep.target)) {
              this.dependents.set(dep.target, []);
            }
            this.dependents.get(dep.target).push({
              name: pkgName,
              type: 'workspace',
              package: pkg
            });
          }
        }
      } catch (e) {
        // Skip if can't read
      }
    }

    console.log(`   ✅ Mapped ${this.dependencies.size} package dependency sets\n`);
  }

  async mapCodexConnections() {
    console.log('⚗️  Mapping codex connections...\n');

    for (const pkg of this.packages) {
      const pkgPath = pkg.path;
      if (!pkgPath || !fs.existsSync(pkgPath)) continue;

      const pkgName = pkg.packageJson?.name || pkg.realName;
      const connections = [];

      // Check package.json for codex references
      const packageJsonPath = path.join(pkgPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          const name = packageJson.name || '';
          const description = packageJson.description || '';

          if (name.includes('codex') || description.includes('codex') || description.includes('144:99') || description.includes('144-99')) {
            connections.push({
              type: 'codex-package',
              level: 'direct'
            });
          }
        } catch (e) {
          // Skip
        }
      }

      // Check for codex files
      const codexFiles = this.findCodexFiles(pkgPath);
      if (codexFiles.length > 0) {
        connections.push({
          type: 'codex-files',
          files: codexFiles,
          level: 'data'
        });
      }

      // Check for codex imports in source
      const codexImports = this.findCodexImports(pkgPath);
      if (codexImports.length > 0) {
        connections.push({
          type: 'codex-imports',
          imports: codexImports,
          level: 'code'
        });
      }

      if (connections.length > 0) {
        this.codexConnections.set(pkgName, connections);
      }
    }

    console.log(`   ✅ Mapped ${this.codexConnections.size} codex connections\n`);
  }

  findCodexFiles(pkgPath) {
    const files = [];
    try {
      const entries = fs.readdirSync(pkgPath, { recursive: true, withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (
          entry.name.toLowerCase().includes('codex') ||
          entry.name.includes('144-99') ||
          entry.name.includes('144:99')
        )) {
          files.push(path.relative(pkgPath, path.join(entry.path, entry.name)));
        }
      }
    } catch (e) {
      // Skip
    }
    return files;
  }

  findCodexImports(pkgPath) {
    const imports = [];
    try {
      const entries = fs.readdirSync(pkgPath, { recursive: true, withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js') || entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))) {
          const filePath = path.join(entry.path, entry.name);
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const codexMatches = content.match(/from\s+['"](.*codex.*|.*144.*)['"]/gi);
            if (codexMatches) {
              imports.push(...codexMatches.map(m => m.replace(/from\s+['"]|['"]/g, '')));
            }
          } catch (e) {
            // Skip
          }
        }
      }
    } catch (e) {
      // Skip
    }
    return [...new Set(imports)];
  }

  async mapSystemConnections() {
    console.log('🔮 Mapping system connections...\n');

    const systems = ['trinity', 'liber-arcanae', 'circuitum99', 'codex', 'tesseract', 'stone-grimoire', 'tarot', 'fusionkink'];

    for (const pkg of this.packages) {
      const pkgPath = pkg.path;
      if (!pkgPath || !fs.existsSync(pkgPath)) continue;

      const pkgName = pkg.packageJson?.name || pkg.realName;
      const nameLower = pkgName.toLowerCase();
      const connections = [];

      for (const system of systems) {
        if (nameLower.includes(system)) {
          connections.push({
            system: system,
            type: 'name-match',
            level: 'direct'
          });
        }
      }

      // Check dependencies for system connections
      const deps = this.dependencies.get(pkgName) || [];
      for (const dep of deps) {
        if (dep.type === 'workspace' && dep.target) {
          const depLower = dep.target.toLowerCase();
          for (const system of systems) {
            if (depLower.includes(system) && !connections.find(c => c.system === system)) {
              connections.push({
                system: system,
                type: 'dependency',
                level: 'indirect',
                via: dep.target
              });
            }
          }
        }
      }

      if (connections.length > 0) {
        this.systemConnections.set(pkgName, connections);
      }
    }

    console.log(`   ✅ Mapped ${this.systemConnections.size} system connections\n`);
  }

  async mapAlchemicalCorrespondences() {
    console.log('⚗️  Mapping alchemical correspondences...\n');

    for (const pkg of this.packages) {
      const pkgName = pkg.packageJson?.name || pkg.realName;
      const label = this.labelMap?.get(pkgName);

      if (label) {
        this.alchemicalMap.set(pkgName, {
          symbol: label.symbol || '⊙',
          alchemical: label.alchemical || pkgName,
          element: label.element,
          planet: label.planet,
          metal: label.metal,
          label: label.label
        });
      } else {
        // Generate default
        this.alchemicalMap.set(pkgName, {
          symbol: '⊙',
          alchemical: this.getAlchemicalName(pkgName),
          element: this.getAlchemicalElement(pkgName),
          planet: this.getAlchemicalPlanet(pkgName),
          metal: this.getAlchemicalMetal(pkgName),
          label: `⊙ ${this.getAlchemicalName(pkgName)} (${pkgName})`
        });
      }
    }

    console.log(`   ✅ Mapped ${this.alchemicalMap.size} alchemical correspondences\n`);
  }

  getAlchemicalName(name) {
    const clean = name.replace(/^@cathedral\//, '').replace(/-/g, ' ');
    return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  getAlchemicalElement(name) {
    const lower = name.toLowerCase();
    if (lower.includes('art') || lower.includes('fire')) return 'Fire';
    if (lower.includes('music') || lower.includes('water')) return 'Water';
    if (lower.includes('science') || lower.includes('air')) return 'Air';
    if (lower.includes('game') || lower.includes('earth')) return 'Earth';
    return 'Aether';
  }

  getAlchemicalPlanet(name) {
    const lower = name.toLowerCase();
    if (lower.includes('art')) return 'Sun';
    if (lower.includes('music')) return 'Moon';
    if (lower.includes('science')) return 'Mercury';
    if (lower.includes('game')) return 'Saturn';
    return 'Jupiter';
  }

  getAlchemicalMetal(name) {
    const lower = name.toLowerCase();
    if (lower.includes('art')) return 'Gold';
    if (lower.includes('music')) return 'Silver';
    if (lower.includes('science')) return 'Mercury';
    if (lower.includes('game')) return 'Lead';
    return 'Copper';
  }

  detectCircularDependencies() {
    console.log('🔄 Detecting circular dependencies...\n');

    const visited = new Set();
    const recStack = new Set();

    const hasCycle = (pkgName, path = []) => {
      if (recStack.has(pkgName)) {
        const cycleStart = path.indexOf(pkgName);
        if (cycleStart !== -1) {
          this.circularDeps.push([...path.slice(cycleStart), pkgName]);
          return true;
        }
      }

      if (visited.has(pkgName)) return false;

      visited.add(pkgName);
      recStack.add(pkgName);

      const deps = this.dependencies.get(pkgName) || [];
      for (const dep of deps) {
        if (dep.type === 'workspace' && dep.target) {
          if (hasCycle(dep.target, [...path, pkgName])) {
            return true;
          }
        }
      }

      recStack.delete(pkgName);
      return false;
    };

    for (const pkg of this.packages) {
      const pkgName = pkg.packageJson?.name || pkg.realName;
      if (!visited.has(pkgName)) {
        hasCycle(pkgName);
      }
    }

    console.log(`   ⚠️  Found ${this.circularDeps.length} circular dependency chains\n`);
  }

  calculateBuildOrder() {
    console.log('📦 Calculating build order...\n');

    const inDegree = new Map();
    const graph = new Map();

    // Initialize
    for (const pkg of this.packages) {
      const pkgName = pkg.packageJson?.name || pkg.realName;
      inDegree.set(pkgName, 0);
      graph.set(pkgName, []);
    }

    // Build graph
    for (const pkg of this.packages) {
      const pkgName = pkg.packageJson?.name || pkg.realName;
      const deps = this.dependencies.get(pkgName) || [];
      
      for (const dep of deps) {
        if (dep.type === 'workspace' && dep.target) {
          graph.get(dep.target).push(pkgName);
          inDegree.set(pkgName, (inDegree.get(pkgName) || 0) + 1);
        }
      }
    }

    // Topological sort
    const queue = [];
    for (const [pkgName, degree] of inDegree.entries()) {
      if (degree === 0) {
        queue.push(pkgName);
      }
    }

    while (queue.length > 0) {
      const current = queue.shift();
      this.buildOrder.push(current);

      for (const neighbor of graph.get(current)) {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    console.log(`   ✅ Build order calculated: ${this.buildOrder.length} packages\n`);
  }

  generateMap() {
    const map = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      summary: {
        totalPackages: this.packages.length,
        totalDependencies: Array.from(this.dependencies.values()).reduce((sum, deps) => sum + deps.length, 0),
        totalCodexConnections: this.codexConnections.size,
        totalSystemConnections: this.systemConnections.size,
        circularDependencies: this.circularDeps.length,
        buildOrderLength: this.buildOrder.length
      },
      packages: this.packages.map(pkg => {
        const pkgName = pkg.packageJson?.name || pkg.realName;
        return {
          name: pkgName,
          realName: pkg.realName,
          path: pkg.path,
          workspace: pkg.workspace,
          type: pkg.type,
          dependencies: this.dependencies.get(pkgName) || [],
          dependents: this.dependents.get(pkgName) || [],
          codexConnections: this.codexConnections.get(pkgName) || [],
          systemConnections: this.systemConnections.get(pkgName) || [],
          alchemical: this.alchemicalMap.get(pkgName) || {}
        };
      }),
      dependencyGraph: {
        dependencies: Object.fromEntries(this.dependencies),
        dependents: Object.fromEntries(this.dependents)
      },
      circularDependencies: this.circularDeps,
      buildOrder: this.buildOrder
    };

    const mapPath = path.join(BASE_DIR, 'PACKAGE_MAP.json');
    fs.writeFileSync(mapPath, JSON.stringify(map, null, 2), 'utf-8');
    console.log(`📄 Package map saved: PACKAGE_MAP.json\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const mapper = new ComprehensivePackageMapper();
  mapper.mapAll().catch(console.error);
}

export default ComprehensivePackageMapper;

