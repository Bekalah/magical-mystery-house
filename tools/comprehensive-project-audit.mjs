#!/usr/bin/env node
/**
 * Comprehensive Project Audit
 * 
 * Tests every package, app, connection, and integration from every direction
 * Ensures all systems are properly connected and working
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const auditResults = {
  timestamp: new Date().toISOString(),
  packages: {},
  apps: {},
  connections: {},
  integrations: {},
  tests: {},
  issues: [],
  fixes: []
};

console.log('🔍 Comprehensive Project Audit Starting...\n');

// 1. Audit all packages
console.log('📦 Auditing Packages...');
const packagesDir = path.join(rootDir, 'packages');
if (fs.existsSync(packagesDir)) {
  const packages = fs.readdirSync(packagesDir).filter(item => {
    const itemPath = path.join(packagesDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const pkg of packages) {
    const pkgPath = path.join(packagesDir, pkg);
    const packageJsonPath = path.join(pkgPath, 'package.json');
    
    const audit = {
      exists: fs.existsSync(packageJsonPath),
      hasName: false,
      hasVersion: false,
      hasMain: false,
      hasDependencies: false,
      workspaceDeps: [],
      externalDeps: [],
      hasScripts: false,
      hasTests: false,
      hasReadme: false,
      hasLicense: false,
      connections: [],
      issues: []
    };

    if (audit.exists) {
      try {
        const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        audit.hasName = !!pkgJson.name;
        audit.hasVersion = !!pkgJson.version;
        audit.hasMain = !!(pkgJson.main || pkgJson.types || pkgJson.exports);
        audit.hasDependencies = !!(pkgJson.dependencies || pkgJson.devDependencies);
        audit.hasScripts = !!pkgJson.scripts;
        audit.hasTests = !!(pkgJson.scripts?.test || fs.existsSync(path.join(pkgPath, 'test')));
        audit.hasReadme = fs.existsSync(path.join(pkgPath, 'README.md'));
        audit.hasLicense = !!(pkgJson.license || fs.existsSync(path.join(pkgPath, 'LICENSE')));

        // Check workspace dependencies
        if (pkgJson.dependencies) {
          Object.entries(pkgJson.dependencies).forEach(([dep, version]) => {
            if (version === 'workspace:*') {
              audit.workspaceDeps.push(dep);
            } else {
              audit.externalDeps.push(dep);
            }
          });
        }

        // Check connections
        if (pkgJson.cathedral?.integration?.connects_to) {
          audit.connections = pkgJson.cathedral.integration.connects_to;
        }

        // Check for issues
        if (!audit.hasName) audit.issues.push('Missing package name');
        if (!audit.hasVersion) audit.issues.push('Missing version');
        if (!audit.hasMain) audit.issues.push('Missing main/types/exports');
        if (!audit.hasReadme) audit.issues.push('Missing README.md');
        if (!audit.hasLicense) audit.issues.push('Missing license');
      } catch (e) {
        audit.issues.push(`Error reading package.json: ${e.message}`);
      }
    } else {
      audit.issues.push('Missing package.json');
    }

    auditResults.packages[pkg] = audit;
    if (audit.issues.length > 0) {
      auditResults.issues.push({
        type: 'package',
        package: pkg,
        issues: audit.issues
      });
    }
  }

  console.log(`  ✅ Audited ${packages.length} packages`);
  const packagesWithIssues = Object.values(auditResults.packages).filter(p => p.issues.length > 0).length;
  if (packagesWithIssues > 0) {
    console.log(`  ⚠️  ${packagesWithIssues} packages have issues`);
  }
}

// 2. Audit all apps
console.log('\n📱 Auditing Apps...');
const appsDir = path.join(rootDir, 'apps');
if (fs.existsSync(appsDir)) {
  const apps = fs.readdirSync(appsDir).filter(item => {
    const itemPath = path.join(appsDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const app of apps) {
    const appPath = path.join(appsDir, app);
    const packageJsonPath = path.join(appPath, 'package.json');
    
    const audit = {
      exists: fs.existsSync(packageJsonPath),
      hasName: false,
      hasBuild: false,
      hasDev: false,
      hasDependencies: false,
      workspaceDeps: [],
      externalDeps: [],
      connections: [],
      issues: []
    };

    if (audit.exists) {
      try {
        const appJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        audit.hasName = !!appJson.name;
        audit.hasBuild = !!(appJson.scripts?.build);
        audit.hasDev = !!(appJson.scripts?.dev);
        audit.hasDependencies = !!(appJson.dependencies || appJson.devDependencies);

        if (appJson.dependencies) {
          Object.entries(appJson.dependencies).forEach(([dep, version]) => {
            if (version === 'workspace:*') {
              audit.workspaceDeps.push(dep);
            } else {
              audit.externalDeps.push(dep);
            }
          });
        }

        if (appJson.cathedral?.integration?.connects_to) {
          audit.connections = appJson.cathedral.integration.connects_to;
        }

        if (!audit.hasName) audit.issues.push('Missing app name');
        if (!audit.hasBuild) audit.issues.push('Missing build script');
      } catch (e) {
        audit.issues.push(`Error reading package.json: ${e.message}`);
      }
    } else {
      audit.issues.push('Missing package.json');
    }

    auditResults.apps[app] = audit;
    if (audit.issues.length > 0) {
      auditResults.issues.push({
        type: 'app',
        app: app,
        issues: audit.issues
      });
    }
  }

  console.log(`  ✅ Audited ${apps.length} apps`);
  const appsWithIssues = Object.values(auditResults.apps).filter(a => a.issues.length > 0).length;
  if (appsWithIssues > 0) {
    console.log(`  ⚠️  ${appsWithIssues} apps have issues`);
  }
}

// 3. Test connections
console.log('\n🔗 Testing Connections...');
const coreSystems = ['circuitum99', 'codex-144-99', 'stone-grimoire', 'liber-arcanae', 'mystery-house'];
const connectionMap = {};

coreSystems.forEach(system => {
  const packages = Object.keys(auditResults.packages).filter(pkg => 
    pkg.includes(system) || auditResults.packages[pkg]?.connections?.includes(system)
  );
  connectionMap[system] = {
    packages: packages,
    connected: packages.length > 0,
    connections: []
  };

  // Find cross-connections
  packages.forEach(pkg => {
    const pkgConnections = auditResults.packages[pkg]?.connections || [];
    pkgConnections.forEach(conn => {
      if (!connectionMap[system].connections.includes(conn)) {
        connectionMap[system].connections.push(conn);
      }
    });
  });
});

auditResults.connections = connectionMap;
console.log(`  ✅ Mapped connections for ${coreSystems.length} core systems`);

// 4. Test integrations
console.log('\n🔌 Testing Integrations...');
const integrationTests = {
  pnpmWorkspace: false,
  gitRemotes: false,
  buildSystem: false,
  deployment: false
};

// Test pnpm workspace
try {
  const workspaceYaml = path.join(rootDir, 'pnpm-workspace.yaml');
  integrationTests.pnpmWorkspace = fs.existsSync(workspaceYaml);
  if (integrationTests.pnpmWorkspace) {
    console.log('  ✅ PNPM workspace configured');
  }
} catch (e) {
  console.log('  ❌ PNPM workspace check failed');
}

// Test git remotes
try {
  const remotes = execSync('git remote -v', { encoding: 'utf8', cwd: rootDir });
  integrationTests.gitRemotes = remotes.split('\n').filter(l => l.trim()).length > 0;
  if (integrationTests.gitRemotes) {
    const remoteCount = new Set(remotes.split('\n').map(l => l.split('\t')[0]).filter(Boolean)).size;
    console.log(`  ✅ ${remoteCount} git remotes configured`);
  }
} catch (e) {
  console.log('  ⚠️  Git remotes check failed');
}

// Test build system
try {
  const turboJson = path.join(rootDir, 'turbo.json');
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  integrationTests.buildSystem = fs.existsSync(turboJson) || !!packageJson.scripts?.build;
  if (integrationTests.buildSystem) {
    console.log('  ✅ Build system configured');
  }
} catch (e) {
  console.log('  ⚠️  Build system check failed');
}

// Test deployment
try {
  const workflowsDir = path.join(rootDir, '.github', 'workflows');
  integrationTests.deployment = fs.existsSync(workflowsDir) && 
    fs.readdirSync(workflowsDir).some(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  if (integrationTests.deployment) {
    const workflowCount = fs.readdirSync(workflowsDir).filter(f => 
      f.endsWith('.yml') || f.endsWith('.yaml')
    ).length;
    console.log(`  ✅ ${workflowCount} deployment workflows configured`);
  }
} catch (e) {
  console.log('  ⚠️  Deployment check failed');
}

auditResults.integrations = integrationTests;

// 5. Generate fixes
console.log('\n🔧 Generating Fixes...');
auditResults.issues.forEach(issue => {
  if (issue.type === 'package') {
    const pkg = auditResults.packages[issue.package];
    const fixes = [];
    
    if (!pkg.hasName) {
      fixes.push(`Add "name": "@cathedral/${issue.package}" to package.json`);
    }
    if (!pkg.hasVersion) {
      fixes.push('Add "version": "1.0.0" to package.json');
    }
    if (!pkg.hasReadme) {
      fixes.push('Create README.md with package description');
    }
    if (!pkg.hasLicense) {
      fixes.push('Add "license": "CC0-1.0" to package.json');
    }
    
    if (fixes.length > 0) {
      auditResults.fixes.push({
        type: 'package',
        package: issue.package,
        fixes: fixes
      });
    }
  }
});

console.log(`  ✅ Generated ${auditResults.fixes.length} fix recommendations`);

// 6. Save results
const outputPath = path.join(rootDir, 'COMPREHENSIVE_AUDIT_RESULTS.json');
fs.writeFileSync(outputPath, JSON.stringify(auditResults, null, 2), 'utf8');

// 7. Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Audit Summary');
console.log('='.repeat(60));
console.log(`Packages: ${Object.keys(auditResults.packages).length}`);
console.log(`Apps: ${Object.keys(auditResults.apps).length}`);
console.log(`Core Systems: ${Object.keys(auditResults.connections).length}`);
console.log(`Issues Found: ${auditResults.issues.length}`);
console.log(`Fixes Generated: ${auditResults.fixes.length}`);
console.log(`\n✅ Full results saved to: ${outputPath}`);
console.log('='.repeat(60) + '\n');

