/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node
/**
 * Test All Connections
 * 
 * Tests every possible connection between packages, apps, and systems
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const testResults = {
  timestamp: new Date().toISOString(),
  packageConnections: {},
  appConnections: {},
  systemConnections: {},
  integrationTests: {},
  failures: []
};

console.log('🧪 Testing All Connections...\n');

// 1. Test package-to-package connections
console.log('📦 Testing Package Connections...');
const packagesDir = path.join(rootDir, 'packages');
if (fs.existsSync(packagesDir)) {
  const packages = fs.readdirSync(packagesDir).filter(item => {
    return fs.statSync(path.join(packagesDir, item)).isDirectory();
  });

  packages.forEach(pkg => {
    const pkgPath = path.join(packagesDir, pkg);
    const packageJsonPath = path.join(pkgPath, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies } || {};
        
        const workspaceDeps = Object.entries(deps)
          .filter(([_, version]) => version === 'workspace:*')
          .map(([name]) => name);
        
        // Test if each workspace dependency exists
        const connectionTests = {};
        workspaceDeps.forEach(dep => {
          const depName = dep.replace('@cathedral/', '');
          const depPath = path.join(packagesDir, depName);
          const depExists = fs.existsSync(depPath);
          
          connectionTests[dep] = {
            exists: depExists,
            path: depPath,
            valid: depExists && fs.existsSync(path.join(depPath, 'package.json'))
          };
          
          if (!connectionTests[dep].valid) {
            testResults.failures.push({
              type: 'package-connection',
              from: pkg,
              to: dep,
              issue: 'Workspace dependency not found'
            });
          }
        });
        
        testResults.packageConnections[pkg] = {
          workspaceDeps: workspaceDeps,
          tests: connectionTests,
          allValid: Object.values(connectionTests).every(t => t.valid)
        };
      } catch (e) {
        testResults.failures.push({
          type: 'package-connection',
          from: pkg,
          issue: `Error testing connections: ${e.message}`
        });
      }
    }
  });

  const validConnections = Object.values(testResults.packageConnections)
    .filter(c => c.allValid).length;
  console.log(`  ✅ Tested ${packages.length} packages`);
  console.log(`  ✅ ${validConnections}/${packages.length} have valid connections`);
}

// 2. Test app-to-package connections
console.log('\n📱 Testing App Connections...');
const appsDir = path.join(rootDir, 'apps');
if (fs.existsSync(appsDir)) {
  const apps = fs.readdirSync(appsDir).filter(item => {
    return fs.statSync(path.join(appsDir, item)).isDirectory();
  });

  apps.forEach(app => {
    const appPath = path.join(appsDir, app);
    const packageJsonPath = path.join(appPath, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      try {
        const appJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...appJson.dependencies, ...appJson.devDependencies } || {};
        
        const workspaceDeps = Object.entries(deps)
          .filter(([_, version]) => version === 'workspace:*')
          .map(([name]) => name);
        
        const connectionTests = {};
        workspaceDeps.forEach(dep => {
          const depName = dep.replace('@cathedral/', '');
          const depPath = path.join(packagesDir, depName);
          const depExists = fs.existsSync(depPath);
          
          connectionTests[dep] = {
            exists: depExists,
            valid: depExists && fs.existsSync(path.join(depPath, 'package.json'))
          };
          
          if (!connectionTests[dep].valid) {
            testResults.failures.push({
              type: 'app-connection',
              from: app,
              to: dep,
              issue: 'Workspace dependency not found'
            });
          }
        });
        
        testResults.appConnections[app] = {
          workspaceDeps: workspaceDeps,
          tests: connectionTests,
          allValid: Object.values(connectionTests).every(t => t.valid)
        };
      } catch (e) {
        testResults.failures.push({
          type: 'app-connection',
          from: app,
          issue: `Error testing connections: ${e.message}`
        });
      }
    }
  });

  const validConnections = Object.values(testResults.appConnections)
    .filter(c => c.allValid).length;
  console.log(`  ✅ Tested ${apps.length} apps`);
  console.log(`  ✅ ${validConnections}/${apps.length} have valid connections`);
}

// 3. Test system connections
console.log('\n🔗 Testing System Connections...');
const coreSystems = {
  circuitum99: ['circuitum99-core', 'circuitum99-arcanae-cyoa'],
  codex14499: ['codex-144-99', 'codex-144-99-core'],
  stoneGrimoire: ['stone-grimoire', 'stone-grimoire-core', 'stone-grimoire-library-engine'],
  liberArcanae: ['liber-arcanae', 'liber-arcanae-core', 'liber-arcanae-tools'],
  mysteryHouse: ['mystery-house-core']
};

Object.entries(coreSystems).forEach(([system, expectedPackages]) => {
  const systemTests = {
    packages: {},
    allExist: true,
    connections: []
  };

  expectedPackages.forEach(pkg => {
    const pkgPath = path.join(packagesDir, pkg);
    const exists = fs.existsSync(pkgPath);
    systemTests.packages[pkg] = exists;
    
    if (!exists) {
      systemTests.allExist = false;
      testResults.failures.push({
        type: 'system-connection',
        system: system,
        package: pkg,
        issue: 'Expected package not found'
      });
    } else {
      // Check if package connects to system
      const packageJsonPath = path.join(pkgPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          if (pkgJson.cathedral?.integration?.connects_to) {
            systemTests.connections.push(...pkgJson.cathedral.integration.connects_to);
          }
        } catch (e) {
          // Ignore
        }
      }
    }
  });

  testResults.systemConnections[system] = systemTests;
});

const validSystems = Object.values(testResults.systemConnections)
  .filter(s => s.allExist).length;
console.log(`  ✅ Tested ${Object.keys(coreSystems).length} core systems`);
console.log(`  ✅ ${validSystems}/${Object.keys(coreSystems).length} systems complete`);

// 4. Test integrations
console.log('\n🔌 Testing Integrations...');

// Test pnpm install
try {
  execSync('pnpm list --depth=0', { 
    encoding: 'utf8', 
    cwd: rootDir,
    stdio: 'pipe',
    timeout: 10000
  });
  testResults.integrationTests.pnpm = { success: true };
  console.log('  ✅ PNPM workspace valid');
} catch (e) {
  testResults.integrationTests.pnpm = { success: false, error: e.message };
  console.log('  ⚠️  PNPM workspace test failed');
}

// Test build
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  testResults.integrationTests.build = { 
    success: !!packageJson.scripts?.build,
    command: packageJson.scripts?.build
  };
  if (testResults.integrationTests.build.success) {
    console.log('  ✅ Build script configured');
  }
} catch (e) {
  testResults.integrationTests.build = { success: false, error: e.message };
}

// Save results
const outputPath = path.join(rootDir, 'CONNECTION_TEST_RESULTS.json');
fs.writeFileSync(outputPath, JSON.stringify(testResults, null, 2), 'utf8');

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Connection Test Summary');
console.log('='.repeat(60));
console.log(`Package Connections: ${Object.keys(testResults.packageConnections).length}`);
console.log(`App Connections: ${Object.keys(testResults.appConnections).length}`);
console.log(`System Connections: ${Object.keys(testResults.systemConnections).length}`);
console.log(`Failures: ${testResults.failures.length}`);
console.log(`\n✅ Full results saved to: ${outputPath}`);
console.log('='.repeat(60) + '\n');

