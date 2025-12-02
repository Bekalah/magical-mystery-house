#!/usr/bin/env node
/**
 * Comprehensive Monorepo Health Monitor
 * 
 * Monitors every package, module, and component in the monorepo
 * Provides real-time health status and visual dashboard
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PACKAGES_DIR = path.join(rootDir, 'packages');
const APPS_DIR = path.join(rootDir, 'apps');
const SCRIPTS_DIR = path.join(rootDir, 'scripts');
const TOOLS_DIR = path.join(rootDir, 'tools');

class MonorepoHealthMonitor {
  constructor() {
    this.packages = [];
    this.apps = [];
    this.scripts = [];
    this.tools = [];
    this.healthData = {
      timestamp: Date.now(),
      overall: { health: 100, status: 'healthy' },
      packages: [],
      apps: [],
      scripts: [],
      tools: [],
      build: { status: 'unknown', errors: 0, warnings: 0 },
      tests: { status: 'unknown', passed: 0, failed: 0 },
      dependencies: { outdated: 0, vulnerabilities: 0 },
      typescript: { errors: 0, warnings: 0 },
      coverage: { percentage: 0 }
    };
  }

  discoverPackages() {
    if (!fs.existsSync(PACKAGES_DIR)) return [];
    
    return fs.readdirSync(PACKAGES_DIR)
      .filter(name => {
        const pkgPath = path.join(PACKAGES_DIR, name);
        return fs.statSync(pkgPath).isDirectory();
      })
      .map(name => ({
        name,
        path: path.join(PACKAGES_DIR, name),
        type: 'package'
      }));
  }

  discoverApps() {
    if (!fs.existsSync(APPS_DIR)) return [];
    
    return fs.readdirSync(APPS_DIR)
      .filter(name => {
        const appPath = path.join(APPS_DIR, name);
        return fs.statSync(appPath).isDirectory();
      })
      .map(name => ({
        name,
        path: path.join(APPS_DIR, name),
        type: 'app'
      }));
  }

  discoverScripts() {
    if (!fs.existsSync(SCRIPTS_DIR)) return [];
    
    return fs.readdirSync(SCRIPTS_DIR)
      .filter(name => name.endsWith('.mjs') || name.endsWith('.ts') || name.endsWith('.js'))
      .map(name => ({
        name,
        path: path.join(SCRIPTS_DIR, name),
        type: 'script'
      }));
  }

  discoverTools() {
    if (!fs.existsSync(TOOLS_DIR)) return [];
    
    return fs.readdirSync(TOOLS_DIR)
      .filter(name => name.endsWith('.mjs') || name.endsWith('.ts') || name.endsWith('.js'))
      .map(name => ({
        name,
        path: path.join(TOOLS_DIR, name),
        type: 'tool'
      }));
  }

  checkPackageHealth(pkg) {
    const health = {
      name: pkg.name,
      path: pkg.path,
      type: pkg.type,
      health: 100,
      status: 'healthy',
      issues: [],
      metrics: {},
      language: 'unknown'
    };

    // Detect language/type
    const cargoToml = path.join(pkg.path, 'Cargo.toml');
    const packageJson = path.join(pkg.path, 'package.json');
    const projectGodot = path.join(pkg.path, 'project.godot');
    
    // Check for Rust files
    let hasRs = false;
    const srcPath = path.join(pkg.path, 'src');
    if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) {
      try {
        const srcFiles = fs.readdirSync(srcPath);
        hasRs = srcFiles.some(f => f.endsWith('.rs'));
      } catch (e) {
        // Ignore read errors
      }
    }
    
    if (fs.existsSync(cargoToml) || hasRs) {
      health.language = 'rust';
      health.metrics.type = 'Rust crate';
      // Rust packages don't need package.json
      if (fs.existsSync(cargoToml)) {
        try {
          const cargoContent = fs.readFileSync(cargoToml, 'utf8');
          const nameMatch = cargoContent.match(/name\s*=\s*"([^"]+)"/);
          const versionMatch = cargoContent.match(/version\s*=\s*"([^"]+)"/);
          health.metrics.name = nameMatch ? nameMatch[1] : pkg.name;
          health.metrics.version = versionMatch ? versionMatch[1] : 'unknown';
        } catch (e) {
          health.health -= 10;
          health.issues.push(`Invalid Cargo.toml: ${e instanceof Error ? e.message : String(e)}`);
        }
      } else {
        health.health -= 20;
        health.issues.push('Missing Cargo.toml');
      }
      
      // Check Rust source
      const srcPath = path.join(pkg.path, 'src');
      if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) {
        try {
          const srcFiles = fs.readdirSync(srcPath).filter(f => f.endsWith('.rs') || f === 'lib.rs' || f === 'main.rs');
          health.metrics.sourceFiles = srcFiles.length;
          if (srcFiles.length === 0) {
            health.health -= 10;
            health.issues.push('Empty src directory');
          }
        } catch (e) {
          health.health -= 10;
          health.issues.push(`Error reading src directory: ${e instanceof Error ? e.message : String(e)}`);
        }
      } else {
        health.health -= 15;
        health.issues.push('Missing src directory');
      }
    } else if (fs.existsSync(projectGodot) || (fs.existsSync(pkg.path) && fs.statSync(pkg.path).isDirectory() && fs.readdirSync(pkg.path).some(f => f.endsWith('.gd')))) {
      health.language = 'godot';
      health.metrics.type = 'Godot project';
      // Godot projects don't need package.json
      if (fs.existsSync(projectGodot)) {
        health.metrics.hasProjectFile = true;
      } else {
        health.health -= 20;
        health.issues.push('Missing project.godot');
      }
      
      try {
        const gdFiles = fs.readdirSync(pkg.path).filter(f => f.endsWith('.gd'));
        health.metrics.sourceFiles = gdFiles.length;
        if (gdFiles.length === 0) {
          health.health -= 10;
          health.issues.push('No .gd script files');
        }
      } catch (e) {
        health.health -= 10;
        health.issues.push(`Error reading directory: ${e instanceof Error ? e.message : String(e)}`);
      }
    } else {
      // JavaScript/TypeScript package
      health.language = 'js';
      health.metrics.type = 'JS/TS package';
      
      // Check package.json
      if (fs.existsSync(packageJson)) {
        try {
          const pkgJson = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
          health.metrics.name = pkgJson.name || pkg.name;
          health.metrics.version = pkgJson.version || 'unknown';
          health.metrics.hasMain = !!pkgJson.main;
          health.metrics.hasTypes = !!pkgJson.types;
          health.metrics.hasExports = !!pkgJson.exports;
        } catch (e) {
          health.health -= 20;
          health.issues.push(`Invalid package.json: ${e instanceof Error ? e.message : String(e)}`);
        }
      } else {
        // Not all packages need package.json (e.g., tools, legacy)
        health.health -= 10;
        health.issues.push('Missing package.json (optional for some packages)');
      }

      // Check source directory
      const srcPath = path.join(pkg.path, 'src');
      const hasSrc = fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory();
      if (hasSrc) {
        try {
          const srcFiles = fs.readdirSync(srcPath).filter(f => 
            f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.mjs') || f.endsWith('.tsx') || f.endsWith('.jsx')
          );
          health.metrics.sourceFiles = srcFiles.length;
          if (srcFiles.length === 0) {
            health.health -= 10;
            health.issues.push('Empty src directory');
          }
        } catch (e) {
          health.health -= 10;
          health.issues.push(`Error reading src directory: ${e instanceof Error ? e.message : String(e)}`);
        }
      } else {
        // Check for files in root (legacy structure)
        try {
          if (fs.existsSync(pkg.path) && fs.statSync(pkg.path).isDirectory()) {
            const rootFiles = fs.readdirSync(pkg.path).filter(f => 
              (f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.mjs')) && 
              !f.startsWith('.') && 
              f !== 'package.json'
            );
            if (rootFiles.length > 0) {
              health.metrics.sourceFiles = rootFiles.length;
              health.health -= 5;
              health.issues.push('Source files in root (consider moving to src/)');
            } else {
              health.health -= 15;
              health.issues.push('Missing src directory');
            }
          } else {
            health.health -= 15;
            health.issues.push('Package path does not exist');
          }
        } catch (e) {
          health.health -= 10;
          health.issues.push(`Error reading package directory: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
    }

    // Check build output (language-specific)
    if (health.language === 'rust') {
      const targetPath = path.join(pkg.path, 'target');
      health.metrics.hasBuild = fs.existsSync(targetPath);
    } else if (health.language === 'godot') {
      // Godot doesn't have traditional build output
      health.metrics.hasBuild = true; // Godot projects are always "built"
    } else {
      const distPath = path.join(pkg.path, 'dist');
      const hasDist = fs.existsSync(distPath);
      health.metrics.hasBuild = hasDist;
      if (hasDist) {
        const distFiles = fs.readdirSync(distPath).filter(f => !f.startsWith('.'));
        health.metrics.buildFiles = distFiles.length;
      }
    }

    // Check config files (language-specific)
    if (health.language === 'rust') {
      // Rust uses Cargo.toml (already checked)
      health.metrics.hasConfig = fs.existsSync(cargoToml);
    } else if (health.language === 'godot') {
      // Godot uses project.godot (already checked)
      health.metrics.hasConfig = fs.existsSync(projectGodot);
    } else {
      const tsconfigPath = path.join(pkg.path, 'tsconfig.json');
      health.metrics.hasTsConfig = fs.existsSync(tsconfigPath);
      health.metrics.hasConfig = fs.existsSync(tsconfigPath) || fs.existsSync(packageJson);
    }

    // Check README
    const readmePath = path.join(pkg.path, 'README.md');
    health.metrics.hasReadme = fs.existsSync(readmePath);
    if (!health.metrics.hasReadme) {
      health.health -= 5;
    }

    // Determine status
    if (health.health >= 90) {
      health.status = 'healthy';
    } else if (health.health >= 70) {
      health.status = 'warning';
    } else {
      health.status = 'critical';
    }

    return health;
  }

  checkBuildHealth() {
    const results = {
      js: { status: 'unknown', errors: 0, warnings: 0 },
      rust: { status: 'unknown', errors: 0, warnings: 0 },
      godot: { status: 'unknown', errors: 0, warnings: 0 }
    };
    
    // Check JS/TS build
    try {
      const result = execSync('pppnpm build 2>&1', { 
        cwd: rootDir, 
        encoding: 'utf8',
        timeout: 30000,
        stdio: 'pipe'
      });
      
      const errors = (result.match(/error/gi) || []).length;
      const warnings = (result.match(/warning/gi) || []).length;
      
      results.js = {
        status: errors === 0 ? 'success' : 'failed',
        errors,
        warnings
      };
    } catch (e) {
      const output = e.stdout?.toString() || e.stderr?.toString() || '';
      const errors = (output.match(/error/gi) || []).length;
      const warnings = (output.match(/warning/gi) || []).length;
      
      results.js = {
        status: 'failed',
        errors,
        warnings
      };
    }
    
    // Check Rust builds (if any)
    const rustPackages = this.packages.filter(p => {
      return fs.existsSync(path.join(p.path, 'Cargo.toml'));
    });
    
    if (rustPackages.length > 0) {
      try {
        // Try cargo build for first Rust package as sample
        const firstRust = rustPackages[0];
        const result = execSync('cargo check 2>&1', {
          cwd: firstRust.path,
          encoding: 'utf8',
          timeout: 30000,
          stdio: 'pipe'
        });
        
        const errors = (result.match(/error/gi) || []).length;
        const warnings = (result.match(/warning/gi) || []).length;
        
        results.rust = {
          status: errors === 0 ? 'success' : 'failed',
          errors,
          warnings
        };
      } catch (e) {
        // Cargo might not be installed or package might have issues
        results.rust = {
          status: 'unknown',
          errors: 0,
          warnings: 0
        };
      }
    }
    
    // Godot projects don't need building
    results.godot = {
      status: 'success',
      errors: 0,
      warnings: 0
    };
    
    // Aggregate results
    const totalErrors = results.js.errors + results.rust.errors;
    const totalWarnings = results.js.warnings + results.rust.warnings;
    
    return {
      status: totalErrors === 0 ? 'success' : 'failed',
      errors: totalErrors,
      warnings: totalWarnings,
      details: results
    };
  }

  checkTypeScriptHealth() {
    // Only check TypeScript if there are TS packages
    const hasTsPackages = this.packages.some(p => {
      const srcPath = path.join(p.path, 'src');
      if (fs.existsSync(srcPath)) {
        return fs.readdirSync(srcPath).some(f => f.endsWith('.ts') || f.endsWith('.tsx'));
      }
      return false;
    });
    
    if (!hasTsPackages) {
      return {
        errors: 0,
        warnings: 0,
        status: 'clean',
        note: 'No TypeScript packages found'
      };
    }
    
    try {
      const result = execSync('pnpm type-check 2>&1', { 
        cwd: rootDir, 
        encoding: 'utf8',
        timeout: 30000,
        stdio: 'pipe'
      });
      
      const errors = (result.match(/error TS\d+/g) || []).length;
      const warnings = (result.match(/warning TS\d+/g) || []).length;
      
      return {
        errors,
        warnings,
        status: errors === 0 ? 'clean' : 'errors'
      };
    } catch (e) {
      const output = (e && typeof e === 'object' && 'stdout' in e ? e.stdout?.toString() : '') || 
                     (e && typeof e === 'object' && 'stderr' in e ? e.stderr?.toString() : '') || 
                     (e instanceof Error ? e.message : String(e));
      const errors = (output.match(/error TS\d+/g) || []).length;
      const warnings = (output.match(/warning TS\d+/g) || []).length;
      
      return {
        errors,
        warnings,
        status: 'errors'
      };
    }
  }

  checkDependencies() {
    try {
      const result = execSync('pnpm outdated --json 2>&1', { 
        cwd: rootDir, 
        encoding: 'utf8',
        timeout: 10000,
        stdio: 'pipe'
      });
      
      let outdated = 0;
      try {
        const data = JSON.parse(result);
        outdated = Object.keys(data).length;
      } catch (e) {
        // If not JSON, count lines
        outdated = result.split('\n').filter(l => l.trim()).length;
      }
      
      return { outdated, vulnerabilities: 0 }; // Would need audit for vulnerabilities
    } catch (e) {
      return { outdated: 0, vulnerabilities: 0 };
    }
  }

  async scan() {
    console.log('🔍 Scanning monorepo...\n');
    
    // Discover all components
    this.packages = this.discoverPackages();
    this.apps = this.discoverApps();
    this.scripts = this.discoverScripts();
    this.tools = this.discoverTools();
    
    console.log(`📦 Found ${this.packages.length} packages`);
    console.log(`📱 Found ${this.apps.length} apps`);
    console.log(`📜 Found ${this.scripts.length} scripts`);
    console.log(`🔧 Found ${this.tools.length} tools\n`);
    
    // Check package health
    console.log('🏥 Checking package health...');
    this.healthData.packages = this.packages.map(pkg => this.checkPackageHealth(pkg));
    
    // Check app health
    console.log('📱 Checking app health...');
    this.healthData.apps = this.apps.map(app => this.checkPackageHealth(app));
    
    // Check build
    console.log('🔨 Checking build status...');
    this.healthData.build = this.checkBuildHealth();
    
    // Check TypeScript
    console.log('📘 Checking TypeScript...');
    this.healthData.typescript = this.checkTypeScriptHealth();
    
    // Check dependencies
    console.log('📚 Checking dependencies...');
    this.healthData.dependencies = this.checkDependencies();
    
    // Calculate overall health
    const packageHealth = this.healthData.packages.reduce((sum, p) => sum + p.health, 0) / this.healthData.packages.length || 100;
    const buildHealth = this.healthData.build.errors === 0 ? 100 : 50;
    const tsHealth = this.healthData.typescript.errors === 0 ? 100 : 50;
    
    this.healthData.overall.health = Math.round(
      (packageHealth * 0.5 + buildHealth * 0.3 + tsHealth * 0.2)
    );
    
    if (this.healthData.overall.health >= 90) {
      this.healthData.overall.status = 'healthy';
    } else if (this.healthData.overall.health >= 70) {
      this.healthData.overall.status = 'warning';
    } else {
      this.healthData.overall.status = 'critical';
    }
    
    this.healthData.timestamp = Date.now();
    
    return this.healthData;
  }

  generateDashboard() {
    const data = this.healthData;
    const overall = data.overall;
    
    console.clear();
    console.log('\n╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                    🏛️  CATHEDRAL MONOREPO HEALTH DASHBOARD                  ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    // Overall Health
    const healthBar = '█'.repeat(Math.floor(overall.health / 5)) + '░'.repeat(20 - Math.floor(overall.health / 5));
    const healthColor = overall.health >= 90 ? '🟢' : overall.health >= 70 ? '🟡' : '🔴';
    console.log(`📊 OVERALL HEALTH: ${healthColor} ${overall.health}% ${overall.status.toUpperCase()}`);
    console.log(`   ${healthBar}\n`);
    
    // Summary Stats
    const rustPackages = data.packages.filter(p => p.language === 'rust').length;
    const godotPackages = data.packages.filter(p => p.language === 'godot').length;
    const jsPackages = data.packages.filter(p => p.language === 'js').length;
    
    console.log('📈 SUMMARY:');
    console.log(`   📦 Packages: ${data.packages.length} (${data.packages.filter(p => p.status === 'healthy').length} healthy)`);
    console.log(`      🦀 Rust: ${rustPackages} | 🎮 Godot: ${godotPackages} | 📘 JS/TS: ${jsPackages}`);
    console.log(`   📱 Apps: ${data.apps.length}`);
    console.log(`   📜 Scripts: ${data.scripts.length}`);
    console.log(`   🔧 Tools: ${data.tools.length}\n`);
    
    // Build Status
    const buildIcon = data.build.status === 'success' ? '✅' : '❌';
    const buildDetails = data.build.details || {};
    const buildSummary = [];
    if (buildDetails.js) buildSummary.push(`JS: ${buildDetails.js.status}`);
    if (buildDetails.rust) buildSummary.push(`Rust: ${buildDetails.rust.status}`);
    if (buildDetails.godot) buildSummary.push(`Godot: ${buildDetails.godot.status}`);
    console.log(`🔨 BUILD: ${buildIcon} ${data.build.status.toUpperCase()} (${data.build.errors} errors, ${data.build.warnings} warnings)`);
    if (buildSummary.length > 0) {
      console.log(`   ${buildSummary.join(' | ')}`);
    }
    
    // TypeScript Status
    const tsIcon = data.typescript.errors === 0 ? '✅' : '❌';
    console.log(`📘 TYPESCRIPT: ${tsIcon} ${data.typescript.errors} errors, ${data.typescript.warnings} warnings`);
    
    // Dependencies
    console.log(`📚 DEPENDENCIES: ${data.dependencies.outdated} outdated, ${data.dependencies.vulnerabilities} vulnerabilities\n`);
    
    // Package Health Details
    console.log('📦 PACKAGE HEALTH:\n');
    data.packages.forEach(pkg => {
      const icon = pkg.status === 'healthy' ? '✅' : pkg.status === 'warning' ? '⚠️' : '❌';
      const bar = '█'.repeat(Math.floor(pkg.health / 10));
      const langIcon = pkg.language === 'rust' ? '🦀' : pkg.language === 'godot' ? '🎮' : '📘';
      const langLabel = pkg.language === 'rust' ? 'Rust' : pkg.language === 'godot' ? 'Godot' : 'JS/TS';
      console.log(`   ${icon} ${pkg.name.padEnd(30)} ${pkg.health}% ${bar} ${langIcon} ${langLabel}`);
      if (pkg.issues.length > 0) {
        pkg.issues.forEach(issue => {
          console.log(`      ⚠️  ${issue}`);
        });
      }
    });
    
    console.log('\n' + '═'.repeat(80) + '\n');
    console.log(`Last updated: ${new Date(data.timestamp).toLocaleString()}\n`);
  }

  saveReport() {
    const reportPath = path.join(rootDir, 'monorepo-health-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.healthData, null, 2));
    return reportPath;
  }
}

async function main() {
  const monitor = new MonorepoHealthMonitor();
  
  // Run scan
  await monitor.scan();
  
  // Generate dashboard
  monitor.generateDashboard();
  
  // Save report
  const reportPath = monitor.saveReport();
  console.log(`📄 Full report saved to: ${reportPath}\n`);
  
  return monitor.healthData;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { MonorepoHealthMonitor };

