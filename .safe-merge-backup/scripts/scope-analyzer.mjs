/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node
/**
 * Scope and Package Analyzer
 * Analyzes the complete scope of the monorepo
 * Tracks dependencies, relationships, and module boundaries
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class ScopeAnalyzer {
  constructor() {
    this.scope = {
      packages: new Map(),
      apps: new Map(),
      scripts: new Map(),
      tools: new Map(),
      dependencies: new Map(),
      relationships: []
    };
  }

  analyzePackage(pkgPath, name) {
    // Detect language/type
    const cargoToml = path.join(pkgPath, 'Cargo.toml');
    const packageJson = path.join(pkgPath, 'package.json');
    const projectGodot = path.join(pkgPath, 'project.godot');
    
    // Rust package
    if (fs.existsSync(cargoToml)) {
      try {
        const cargoContent = fs.readFileSync(cargoToml, 'utf8');
        const nameMatch = cargoContent.match(/name\s*=\s*"([^"]+)"/);
        const versionMatch = cargoContent.match(/version\s*=\s*"([^"]+)"/);
        
        return {
          name: nameMatch ? nameMatch[1] : name,
          version: versionMatch ? versionMatch[1] : 'unknown',
          type: 'rust',
          language: 'rust',
          files: this.getPackageFiles(pkgPath),
          dependencies: this.parseCargoDeps(cargoContent)
        };
      } catch (e) {
        return { name, type: 'rust', error: e.message };
      }
    }
    
    // Godot project
    if (fs.existsSync(projectGodot)) {
      return {
        name,
        version: 'unknown',
        type: 'godot',
        language: 'godot',
        files: this.getPackageFiles(pkgPath),
        dependencies: {}
      };
    }
    
    // JavaScript/TypeScript package
    if (!fs.existsSync(packageJson)) {
      // Legacy package without package.json
      return {
        name,
        version: 'unknown',
        type: 'legacy',
        language: 'js',
        files: this.getPackageFiles(pkgPath),
        dependencies: {}
      };
    }
    
    try {
      const pkgJson = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
      
      const analysis = {
        name: pkgJson.name || name,
        version: pkgJson.version || 'unknown',
        type: pkgJson.type || 'commonjs',
        language: 'js',
        main: pkgJson.main,
        types: pkgJson.types,
        exports: pkgJson.exports,
        dependencies: pkgJson.dependencies || {},
        devDependencies: pkgJson.devDependencies || {},
        peerDependencies: pkgJson.peerDependencies || {},
        scripts: pkgJson.scripts || {},
        files: this.getPackageFiles(pkgPath),
        exports: this.analyzeExports(pkgPath, pkgJson)
      };
      
      return analysis;
    } catch (e) {
      return { name, error: e.message };
    }
  }

  parseCargoDeps(cargoContent) {
    const deps = {};
    const depsMatch = cargoContent.match(/\[dependencies\]([\s\S]*?)(?=\[|$)/);
    if (depsMatch) {
      const depsSection = depsMatch[1];
      const depLines = depsSection.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
      depLines.forEach(line => {
        const match = line.match(/(\w+)\s*=\s*"([^"]+)"/);
        if (match) {
          deps[match[1]] = match[2];
        }
      });
    }
    return deps;
  }

  getPackageFiles(pkgPath) {
    const files = {
      source: [],
      tests: [],
      config: [],
      docs: []
    };
    
    function walkDir(dir, basePath = pkgPath) {
      if (!fs.existsSync(dir)) return;
      
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || 
            entry === 'node_modules' || 
            entry === 'dist' || 
            entry === 'target' ||
            entry === '.godot') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        const relativePath = path.relative(basePath, fullPath);
        
        if (stat.isDirectory()) {
          walkDir(fullPath, basePath);
        } else {
          const ext = path.extname(entry).toLowerCase();
          if (relativePath.startsWith('src/') || 
              ext === '.rs' || 
              ext === '.ts' || 
              ext === '.js' || 
              ext === '.gd') {
            files.source.push(relativePath);
          } else if (relativePath.includes('test') || relativePath.includes('spec')) {
            files.tests.push(relativePath);
          } else if (ext === '.json' || ext === '.toml' || ext === '.godot' || relativePath.includes('config')) {
            files.config.push(relativePath);
          } else if (ext === '.md') {
            files.docs.push(relativePath);
          }
        }
      }
    }
    
    walkDir(pkgPath);
    return files;
  }

  analyzeExports(pkgPath, pkgJson) {
    const exports = {
      main: null,
      types: null,
      modules: []
    };
    
    if (pkgJson.main) {
      exports.main = pkgJson.main;
    }
    
    if (pkgJson.types) {
      exports.types = pkgJson.types;
    }
    
    if (pkgJson.exports) {
      if (typeof pkgJson.exports === 'object') {
        exports.modules = Object.keys(pkgJson.exports);
      }
    }
    
    return exports;
  }

  analyzeDependencies() {
    const allDeps = new Map();
    
    // Analyze package dependencies
    for (const [name, pkg] of this.scope.packages) {
      if (pkg.dependencies) {
        Object.keys(pkg.dependencies).forEach(dep => {
          if (!allDeps.has(dep)) {
            allDeps.set(dep, { packages: [], apps: [] });
          }
          allDeps.get(dep).packages.push(name);
        });
      }
    }
    
    // Analyze app dependencies
    for (const [name, app] of this.scope.apps) {
      if (app.dependencies) {
        Object.keys(app.dependencies).forEach(dep => {
          if (!allDeps.has(dep)) {
            allDeps.set(dep, { packages: [], apps: [] });
          }
          allDeps.get(dep).apps.push(name);
        });
      }
    }
    
    this.scope.dependencies = allDeps;
  }

  analyzeRelationships() {
    const relationships = [];
    
    // Package to package relationships
    for (const [name, pkg] of this.scope.packages) {
      if (pkg.dependencies) {
        Object.keys(pkg.dependencies).forEach(dep => {
          if (this.scope.packages.has(dep) || dep.startsWith('@cathedral/')) {
            relationships.push({
              from: name,
              to: dep,
              type: 'dependency',
              scope: 'internal'
            });
          } else {
            relationships.push({
              from: name,
              to: dep,
              type: 'dependency',
              scope: 'external'
            });
          }
        });
      }
    }
    
    this.scope.relationships = relationships;
  }

  async analyze() {
    console.log('🔍 Analyzing monorepo scope...\n');
    
    // Analyze packages
    const packagesDir = path.join(rootDir, 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir).filter(name => {
        const pkgPath = path.join(packagesDir, name);
        return fs.statSync(pkgPath).isDirectory();
      });
      
      for (const pkg of packages) {
        const pkgPath = path.join(packagesDir, pkg);
        const analysis = this.analyzePackage(pkgPath, pkg);
        if (analysis) {
          this.scope.packages.set(pkg, analysis);
        }
      }
    }
    
    // Analyze apps
    const appsDir = path.join(rootDir, 'apps');
    if (fs.existsSync(appsDir)) {
      const apps = fs.readdirSync(appsDir).filter(name => {
        const appPath = path.join(appsDir, name);
        return fs.statSync(appPath).isDirectory();
      });
      
      for (const app of apps) {
        const appPath = path.join(appsDir, app);
        const analysis = this.analyzePackage(appPath, app);
        if (analysis) {
          this.scope.apps.set(app, analysis);
        }
      }
    }
    
    // Analyze dependencies and relationships
    this.analyzeDependencies();
    this.analyzeRelationships();
    
    return this.scope;
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      summary: {
        totalPackages: this.scope.packages.size,
        totalApps: this.scope.apps.size,
        totalDependencies: this.scope.dependencies.size,
        internalRelationships: this.scope.relationships.filter(r => r.scope === 'internal').length,
        externalRelationships: this.scope.relationships.filter(r => r.scope === 'external').length
      },
      packages: Array.from(this.scope.packages.entries()).map(([name, data]) => ({
        name,
        ...data
      })),
      apps: Array.from(this.scope.apps.entries()).map(([name, data]) => ({
        name,
        ...data
      })),
      dependencies: Array.from(this.scope.dependencies.entries()).map(([name, data]) => ({
        name,
        ...data
      })),
      relationships: this.scope.relationships
    };
    
    return report;
  }

  displaySummary() {
    console.log('\n╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                         📊 MONOREPO SCOPE ANALYSIS                           ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📦 PACKAGES:');
    this.scope.packages.forEach((pkg, name) => {
      const deps = Object.keys(pkg.dependencies || {}).length;
      const files = pkg.files?.source?.length || 0;
      console.log(`   • ${name.padEnd(30)} v${pkg.version} (${deps} deps, ${files} files)`);
    });
    
    console.log('\n📱 APPS:');
    this.scope.apps.forEach((app, name) => {
      const deps = Object.keys(app.dependencies || {}).length;
      console.log(`   • ${name.padEnd(30)} v${app.version} (${deps} deps)`);
    });
    
    console.log('\n🔗 INTERNAL RELATIONSHIPS:');
    const internal = this.scope.relationships.filter(r => r.scope === 'internal');
    internal.slice(0, 20).forEach(rel => {
      console.log(`   ${rel.from} → ${rel.to}`);
    });
    if (internal.length > 20) {
      console.log(`   ... and ${internal.length - 20} more`);
    }
    
    console.log('\n📚 TOP DEPENDENCIES:');
    const topDeps = Array.from(this.scope.dependencies.entries())
      .sort((a, b) => (b[1].packages.length + b[1].apps.length) - (a[1].packages.length + a[1].apps.length))
      .slice(0, 10);
    
    topDeps.forEach(([name, data]) => {
      const total = data.packages.length + data.apps.length;
      console.log(`   • ${name.padEnd(30)} used by ${total} components`);
    });
    
    console.log('\n' + '═'.repeat(80) + '\n');
  }
}

async function main() {
  const analyzer = new ScopeAnalyzer();
  await analyzer.analyze();
  analyzer.displaySummary();
  
  const report = analyzer.generateReport();
  const reportPath = path.join(rootDir, 'monorepo-scope-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Full scope report saved to: ${reportPath}\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ScopeAnalyzer };

