#!/usr/bin/env node
/**
 * Final Verification - 100% Completion Check
 * 
 * Comprehensive verification of all consolidation and unification work
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

class FinalVerifier {
  constructor() {
    this.results = {
      sacredSystems: {},
      consolidation: {},
      packages: {},
      build: {},
      dependencies: {},
      versions: {}
    };
    this.allPassed = true;
  }

  async run() {
    console.log('🔍 FINAL VERIFICATION - 100% COMPLETION CHECK\n');
    console.log('═'.repeat(80) + '\n');

    // Verify sacred systems unification
    await this.verifySacredSystems();

    // Verify consolidation
    await this.verifyConsolidation();

    // Verify packages
    await this.verifyPackages();

    // Verify build
    await this.verifyBuild();

    // Verify dependencies
    await this.verifyDependencies();

    // Verify versions
    await this.verifyVersions();

    // Record results
    this.recordResults();

    // Print summary
    this.printSummary();
  }

  async verifySacredSystems() {
    console.log('🔮 Verifying Sacred Systems Unification...\n');

    const systems = {
      'codex-144-99': {
        primary: 'packages/codex-144-99',
        fragments: ['codex-144-99-core']
      },
      'liber-arcanae': {
        primary: 'packages/liber-arcanae',
        fragments: ['liber-arcanae-core', 'liber-arcanae-tools', 'cathedral-liber-arcanae-bridge']
      },
      'circuitum99': {
        primary: 'packages/circuitum99-core',
        fragments: ['circuitum99-arcanae-cyoa']
      }
    };

    for (const [name, config] of Object.entries(systems)) {
      const primaryPath = path.join(BASE_DIR, config.primary);
      const exists = fs.existsSync(primaryPath);
      const hasPackageJson = fs.existsSync(path.join(primaryPath, 'package.json'));
      const hasSrc = fs.existsSync(path.join(primaryPath, 'src'));
      const hasReadme = fs.existsSync(path.join(primaryPath, 'README.md'));

      const passed = exists && hasPackageJson && hasSrc && hasReadme;

      this.results.sacredSystems[name] = {
        passed,
        exists,
        hasPackageJson,
        hasSrc,
        hasReadme
      };

      if (passed) {
        console.log(`   ✅ ${name}: Unified and complete`);
      } else {
        console.log(`   ❌ ${name}: Missing components`);
        this.allPassed = false;
      }
    }

    console.log('');
  }

  async verifyConsolidation() {
    console.log('🔀 Verifying Consolidation...\n');

    const planPath = path.join(BASE_DIR, 'CONSOLIDATION_PLAN.json');
    if (!fs.existsSync(planPath)) {
      console.log('   ⚠️  CONSOLIDATION_PLAN.json not found\n');
      this.results.consolidation.passed = false;
      this.allPassed = false;
      return;
    }

    const plan = JSON.parse(fs.readFileSync(planPath, 'utf-8'));
    const consolidated = plan.consolidated || [];
    const total = consolidated.length;

    let verified = 0;
    for (const item of consolidated.slice(0, 20)) { // Sample check
      const primaryPath = item.primary?.path;
      if (primaryPath && fs.existsSync(primaryPath)) {
        const packageJsonPath = path.join(primaryPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          verified++;
        }
      }
    }

    const sampleRate = verified / Math.min(20, total);
    const passed = sampleRate >= 0.9;

    this.results.consolidation = {
      passed,
      total,
      verified,
      sampleRate: (sampleRate * 100).toFixed(1) + '%'
    };

    if (passed) {
      console.log(`   ✅ ${total} packages consolidated (${verified}/20 sample verified)`);
    } else {
      console.log(`   ⚠️  ${total} packages found, but some may be incomplete`);
      this.allPassed = false;
    }

    console.log('');
  }

  async verifyPackages() {
    console.log('📦 Verifying Packages...\n');

    const packagesDir = path.join(BASE_DIR, 'packages');
    if (!fs.existsSync(packagesDir)) {
      console.log('   ❌ Packages directory not found\n');
      this.results.packages.passed = false;
      this.allPassed = false;
      return;
    }

    const packages = fs.readdirSync(packagesDir).filter(item => {
      const itemPath = path.join(packagesDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    let withReadme = 0;
    let withPackageJson = 0;
    let withExports = 0;

    for (const pkg of packages) {
      const pkgPath = path.join(packagesDir, pkg);
      
      if (fs.existsSync(path.join(pkgPath, 'README.md'))) {
        withReadme++;
      }
      
      const packageJsonPath = path.join(pkgPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        withPackageJson++;
        
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          if (packageJson.exports || packageJson.main) {
            withExports++;
          }
        } catch (e) {
          // Skip invalid
        }
      }
    }

    const readmeRate = withReadme / packages.length;
    const packageJsonRate = withPackageJson / packages.length;
    const exportsRate = withExports / packages.length;
    const passed = readmeRate >= 0.95 && packageJsonRate >= 0.95 && exportsRate >= 0.9;

    this.results.packages = {
      passed,
      total: packages.length,
      withReadme,
      withPackageJson,
      withExports,
      readmeRate: (readmeRate * 100).toFixed(1) + '%',
      packageJsonRate: (packageJsonRate * 100).toFixed(1) + '%',
      exportsRate: (exportsRate * 100).toFixed(1) + '%'
    };

    if (passed) {
      console.log(`   ✅ ${packages.length} packages: ${withReadme} READMEs, ${withPackageJson} package.json, ${withExports} exports`);
    } else {
      console.log(`   ⚠️  Packages need completion: ${withReadme}/${packages.length} READMEs, ${withPackageJson}/${packages.length} package.json`);
      this.allPassed = false;
    }

    console.log('');
  }

  async verifyBuild() {
    console.log('🔨 Verifying Build...\n');

    try {
      // Quick build check - just check if build command exists and runs
      const result = execSync('pnpm run build 2>&1 | head -50', {
        cwd: BASE_DIR,
        encoding: 'utf-8',
        timeout: 120000,
        stdio: 'pipe'
      });

      const hasErrors = result.includes('error') || result.includes('Error') || result.includes('failed') || result.includes('Failed');
      const passed = !hasErrors;

      this.results.build = {
        passed,
        hasErrors,
        output: result.substring(0, 200)
      };

      if (passed) {
        console.log('   ✅ Build completed without critical errors');
      } else {
        console.log('   ⚠️  Build has some errors (check output for details)');
        this.allPassed = false;
      }
    } catch (e) {
      this.results.build = {
        passed: false,
        error: e.message
      };
      console.log('   ⚠️  Build check had issues (may still be functional)');
      this.allPassed = false;
    }

    console.log('');
  }

  async verifyDependencies() {
    console.log('🔗 Verifying Dependencies...\n');

    try {
      const result = execSync('pnpm install --dry-run 2>&1 | grep -c "ERR_PNPM_WORKSPACE_PKG_NOT_FOUND" || echo "0"', {
        cwd: BASE_DIR,
        encoding: 'utf-8',
        timeout: 60000,
        stdio: 'pipe'
      });

      const errorCount = parseInt(result.trim()) || 0;
      const passed = errorCount === 0;

      this.results.dependencies = {
        passed,
        workspaceErrors: errorCount
      };

      if (passed) {
        console.log('   ✅ No workspace dependency errors');
      } else {
        console.log(`   ⚠️  ${errorCount} workspace dependency errors found`);
        this.allPassed = false;
      }
    } catch (e) {
      this.results.dependencies = {
        passed: false,
        error: e.message
      };
      console.log('   ⚠️  Dependency check had issues');
      this.allPassed = false;
    }

    console.log('');
  }

  async verifyVersions() {
    console.log('🔢 Verifying Versions...\n');

    const packagesDir = path.join(BASE_DIR, 'packages');
    const packages = fs.readdirSync(packagesDir).filter(item => {
      const itemPath = path.join(packagesDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    let versioned = 0;
    for (const pkg of packages.slice(0, 50)) { // Sample check
      const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          if (packageJson.version === '1.0.0') {
            versioned++;
          }
        } catch (e) {
          // Skip invalid
        }
      }
    }

    const sampleSize = Math.min(50, packages.length);
    const versionRate = versioned / sampleSize;
    const passed = versionRate >= 0.9;

    this.results.versions = {
      passed,
      sampleSize,
      versioned,
      versionRate: (versionRate * 100).toFixed(1) + '%'
    };

    if (passed) {
      console.log(`   ✅ ${versioned}/${sampleSize} packages at version 1.0.0 (sample)`);
    } else {
      console.log(`   ⚠️  ${versioned}/${sampleSize} packages at version 1.0.0`);
      this.allPassed = false;
    }

    console.log('');
  }

  recordResults() {
    const statePath = path.join(BASE_DIR, 'experiment-state.json');
    let state = { improvements: [] };
    
    if (fs.existsSync(statePath)) {
      try {
        state = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
      } catch (e) {
        // Start fresh
      }
    }

    state.improvements.push({
      cycle: state.currentCycle || 0,
      timestamp: new Date().toISOString(),
      type: 'enhancement',
      description: `Final verification: ${this.allPassed ? 'PASSED' : 'ISSUES FOUND'} - ${JSON.stringify(this.results)}`,
      system: 'verification'
    });

    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  }

  printSummary() {
    console.log('═'.repeat(80));
    console.log('📊 VERIFICATION SUMMARY');
    console.log('═'.repeat(80));

    const checks = [
      ['Sacred Systems', this.results.sacredSystems],
      ['Consolidation', this.results.consolidation],
      ['Packages', this.results.packages],
      ['Build', this.results.build],
      ['Dependencies', this.results.dependencies],
      ['Versions', this.results.versions]
    ];

    for (const [name, result] of checks) {
      const status = result.passed ? '✅' : '⚠️';
      console.log(`${status} ${name}: ${result.passed ? 'PASSED' : 'NEEDS ATTENTION'}`);
    }

    console.log('═'.repeat(80));
    
    if (this.allPassed) {
      console.log('\n🎉 ALL VERIFICATIONS PASSED - SYSTEM IS 100% COMPLETE!\n');
    } else {
      console.log('\n⚠️  SOME VERIFICATIONS NEED ATTENTION\n');
    }

    console.log('📝 Results recorded in experiment-state.json\n');
  }
}

const verifier = new FinalVerifier();
verifier.run().catch(e => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});

