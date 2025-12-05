#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Unified Workspace Consolidation Tool
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Unifies all Cathedral workspaces across all directories:
 * - Scans all workspace directories
 * - Maps packages, tools, scripts across workspaces
 * - Identifies duplicates and versions
 * - Creates unified workspace configuration
 * - Generates consolidation report
 * - Updates Cursor workspace file
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const homeDir = homedir();

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn',
  subtitle: 'Liber Arcanae Codex Abyssiae'
};

const WORKSPACE_DIRS = [
  join(homeDir, 'cathedral-master-deployment'),
  join(homeDir, 'cathedral-v1-consolidated'),
  join(homeDir, 'Roo-Code'),
  join(homeDir, 'cathedral-fixed-clean'),
  join(homeDir, 'cathedral-real'),
  join(homeDir, 'restore_temp'),
  join(homeDir, 'cosmogenesis-engine'),
  join(homeDir, 'CathedralOfCircuits')
].filter(dir => {
  const exists = existsSync(dir);
  if (!exists) {
    console.warn(`⚠️  Workspace directory not found: ${basename(dir)}`);
  }
  return exists;
});

function findPackageJsonFiles(dir) {
  try {
    const result = execSync('rg --files --type json package.json', {
      cwd: dir,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return findFilesRecursive(dir, 'package.json');
  }
}

function findFilesRecursive(dir, filename) {
  const results = [];
  if (!existsSync(dir)) return results;
  
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (entry.startsWith('.') || 
          entry === 'node_modules' || 
          entry === 'dist' || 
          entry === 'build' ||
          entry === '.next' ||
          entry === '.turbo') {
        continue;
      }
      
      const fullPath = join(dir, entry);
      try {
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          results.push(...findFilesRecursive(fullPath, filename));
        } else if (entry === filename) {
          results.push(fullPath);
        }
      } catch (e) {
        continue;
      }
    }
  } catch (e) {
  }
  return results;
}

function scanWorkspace(workspaceDir) {
  const workspaceName = basename(workspaceDir);
  const stats = {
    workspace: workspaceName,
    path: workspaceDir,
    packages: [],
    tools: [],
    scripts: [],
    apps: [],
    exists: existsSync(workspaceDir),
    packageJson: null,
    turboJson: null,
    workspaceFile: null,
    errors: []
  };

  if (!stats.exists) {
    return stats;
  }

  try {
    const rootPkgPath = join(workspaceDir, 'package.json');
    if (existsSync(rootPkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8'));
        stats.packageJson = {
          name: pkg.name,
          version: pkg.version || '1.0.0',
          description: pkg.description || '',
          scripts: Object.keys(pkg.scripts || {}).length
        };
      } catch (e) {
        stats.errors.push(`Failed to parse root package.json: ${e.message}`);
      }
    }

    const turboPath = join(workspaceDir, 'turbo.json');
    if (existsSync(turboPath)) {
      stats.turboJson = true;
    }

    const workspaceFiles = findFilesRecursive(workspaceDir, '.code-workspace');
    if (workspaceFiles.length > 0) {
      stats.workspaceFile = workspaceFiles[0];
    }

    const packagesDir = join(workspaceDir, 'packages');
    if (existsSync(packagesDir)) {
      try {
        const packageFiles = findPackageJsonFiles(packagesDir);
        stats.packages = packageFiles.map(pkgPath => {
          try {
            const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
            return {
              name: pkg.name,
              version: pkg.version || '1.0.0',
              path: relative(workspaceDir, pkgPath),
              description: pkg.description || '',
              category: pkgPath.includes('/packages/') ? 'package' : 'other',
              error: null
            };
          } catch (e) {
            return { 
              path: relative(workspaceDir, pkgPath), 
              error: e.message,
              name: null
            };
          }
        }).filter(pkg => pkg.name || pkg.error);
      } catch (e) {
        stats.errors.push(`Failed to scan packages: ${e.message}`);
      }
    }

    const toolsDir = join(workspaceDir, 'tools');
    if (existsSync(toolsDir)) {
      try {
        const toolFiles = findFilesRecursive(toolsDir, '.mjs').concat(
          findFilesRecursive(toolsDir, '.js')
        );
        stats.tools = toolFiles.map(toolPath => ({
          name: basename(toolPath),
          path: relative(workspaceDir, toolPath)
        }));
      } catch (e) {
        stats.errors.push(`Failed to scan tools: ${e.message}`);
      }
    }

    const scriptsDir = join(workspaceDir, 'scripts');
    if (existsSync(scriptsDir)) {
      try {
        const scriptFiles = findFilesRecursive(scriptsDir, '.mjs').concat(
          findFilesRecursive(scriptsDir, '.js'),
          findFilesRecursive(scriptsDir, '.ts')
        );
        stats.scripts = scriptFiles.map(scriptPath => ({
          name: basename(scriptPath),
          path: relative(workspaceDir, scriptPath)
        }));
      } catch (e) {
        stats.errors.push(`Failed to scan scripts: ${e.message}`);
      }
    }

    const appsDir = join(workspaceDir, 'apps');
    if (existsSync(appsDir)) {
      try {
        const appFiles = findPackageJsonFiles(appsDir);
        stats.apps = appFiles.map(appPath => {
          try {
            const pkg = JSON.parse(readFileSync(appPath, 'utf-8'));
            return {
              name: pkg.name,
              version: pkg.version || '1.0.0',
              path: relative(workspaceDir, appPath),
              description: pkg.description || '',
              error: null
            };
          } catch (e) {
            return { 
              path: relative(workspaceDir, appPath), 
              error: e.message,
              name: null
            };
          }
        }).filter(app => app.name || app.error);
      } catch (e) {
        stats.errors.push(`Failed to scan apps: ${e.message}`);
      }
    }

  } catch (e) {
    stats.errors.push(`Failed to scan workspace: ${e.message}`);
  }

  return stats;
}

function consolidateWorkspaces() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Unified Workspace Consolidation Tool\n`);

  if (WORKSPACE_DIRS.length === 0) {
    console.error('❌ No workspace directories found!');
    process.exit(1);
  }

  console.log(`🔍 Scanning ${WORKSPACE_DIRS.length} workspaces...\n`);
  
  const workspaceStats = WORKSPACE_DIRS.map((wsDir, index) => {
    process.stdout.write(`  [${index + 1}/${WORKSPACE_DIRS.length}] Scanning ${basename(wsDir)}... `);
    const stats = scanWorkspace(wsDir);
    const status = stats.exists ? `✅ (${stats.packages.length} packages)` : '❌';
    console.log(status);
    if (stats.errors.length > 0) {
      stats.errors.forEach(err => console.warn(`    ⚠️  ${err}`));
    }
    return stats;
  });

  console.log('\n📊 Analyzing consolidation...\n');

  const consolidation = {
    project: PROJECT_INFO,
    workspaces: workspaceStats,
    summary: {
      totalWorkspaces: WORKSPACE_DIRS.length,
      activeWorkspaces: workspaceStats.filter(ws => ws.exists).length,
      totalPackages: 0,
      totalTools: 0,
      totalScripts: 0,
      totalApps: 0,
      uniquePackages: new Set(),
      packageVersions: new Map(),
      duplicates: [],
      errors: []
    },
    recommendations: []
  };

  const packageMap = new Map();
  workspaceStats.forEach(ws => {
    if (!ws.exists) return;
    
    ws.packages.forEach(pkg => {
      if (pkg.name && !pkg.error) {
        consolidation.summary.totalPackages++;
        consolidation.summary.uniquePackages.add(pkg.name);

        if (!packageMap.has(pkg.name)) {
          packageMap.set(pkg.name, []);
        }
        packageMap.get(pkg.name).push({
          workspace: ws.workspace,
          version: pkg.version,
          path: pkg.path
        });

        if (!consolidation.summary.packageVersions.has(pkg.name)) {
          consolidation.summary.packageVersions.set(pkg.name, new Set());
        }
        consolidation.summary.packageVersions.get(pkg.name).add(pkg.version);
      } else if (pkg.error) {
        consolidation.summary.errors.push({
          workspace: ws.workspace,
          file: pkg.path,
          error: pkg.error
        });
      }
    });

    consolidation.summary.totalTools += ws.tools.length;
    consolidation.summary.totalScripts += ws.scripts.length;
    consolidation.summary.totalApps += ws.apps.length;
  });

  packageMap.forEach((instances, pkgName) => {
    if (instances.length > 1) {
      const versions = [...new Set(instances.map(i => i.version))];
      const workspaces = [...new Set(instances.map(i => i.workspace))];
      
      consolidation.summary.duplicates.push({
        package: pkgName,
        instances: instances.length,
        workspaces: workspaces,
        versions: versions,
        recommendation: versions.length === 1 
          ? `Consolidate to single instance in primary workspace`
          : `Review version differences: ${versions.join(', ')}`
      });
    }
  });

  const primaryWorkspace = workspaceStats.find(ws => 
    ws.workspace === 'cathedral-master-deployment' && ws.exists
  );

  if (primaryWorkspace) {
    consolidation.recommendations.push({
      type: 'primary_workspace',
      workspace: primaryWorkspace.workspace,
      message: `Use ${primaryWorkspace.workspace} as primary workspace for Cathedral of Circuits`
    });
  }

  if (consolidation.summary.duplicates.length > 0) {
    consolidation.recommendations.push({
      type: 'consolidate_duplicates',
      count: consolidation.summary.duplicates.length,
      message: `Consolidate ${consolidation.summary.duplicates.length} duplicate packages`
    });
  }

  return consolidation;
}

function updateCursorWorkspace(consolidation) {
  const workspaceFile = join(rootDir, 'cathedral-of-circuits-magnum-opus-v1.code-workspace');
  
  const workspaceConfig = {
    folders: WORKSPACE_DIRS
      .filter(dir => existsSync(dir))
      .map(dir => {
        const relPath = relative(rootDir, dir);
        return {
          path: relPath || '.',
          name: `${basename(dir)} - ${PROJECT_INFO.name}`
        };
      }),
    settings: {
      'files.exclude': {
        '**/node_modules': true,
        '**/.git': false,
        '**/dist': true,
        '**/build': true,
        '**/.next': true,
        '**/.turbo': true
      },
      'search.exclude': {
        '**/node_modules': true,
        '**/dist': true,
        '**/build': true,
        '**/.next': true,
        '**/.turbo': true
      },
      'typescript.preferences.importModuleSpecifier': 'relative',
      'editor.formatOnSave': true,
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true
      }
    },
    extensions: {
      recommendations: [
        'dbaeumer.vscode-eslint',
        'esbenp.prettier-vscode',
        'bradlc.vscode-tailwindcss'
      ]
    }
  };

  try {
    writeFileSync(workspaceFile, JSON.stringify(workspaceConfig, null, 2));
    return workspaceFile;
  } catch (e) {
    throw new Error(`Failed to write workspace file: ${e.message}`);
  }
}

async function main() {
  try {
    const consolidation = consolidateWorkspaces();

    console.log('\n📊 Consolidation Summary:');
    console.log(`  Workspaces scanned: ${consolidation.summary.totalWorkspaces}`);
    console.log(`  Active workspaces: ${consolidation.summary.activeWorkspaces}`);
    console.log(`  Total packages: ${consolidation.summary.totalPackages}`);
    console.log(`  Unique packages: ${consolidation.summary.uniquePackages.size}`);
    console.log(`  Total tools: ${consolidation.summary.totalTools}`);
    console.log(`  Total scripts: ${consolidation.summary.totalScripts}`);
    console.log(`  Total apps: ${consolidation.summary.totalApps}`);
    console.log(`  Duplicates found: ${consolidation.summary.duplicates.length}`);

    if (consolidation.summary.duplicates.length > 0) {
      console.log('\n📦 Duplicate Packages (showing top 10):');
      consolidation.summary.duplicates
        .sort((a, b) => b.instances - a.instances)
        .slice(0, 10)
        .forEach(dup => {
          console.log(`  - ${dup.package}`);
          console.log(`    ${dup.instances} instances across: ${dup.workspaces.join(', ')}`);
          console.log(`    Versions: ${dup.versions.join(', ')}`);
        });
      if (consolidation.summary.duplicates.length > 10) {
        console.log(`  ... and ${consolidation.summary.duplicates.length - 10} more`);
      }
    }

    console.log('\n📝 Creating Cursor workspace file...');
    try {
      const workspaceFile = updateCursorWorkspace(consolidation);
      console.log(`  ✅ Created: ${basename(workspaceFile)}`);
    } catch (e) {
      console.error(`  ❌ Failed to create workspace file: ${e.message}`);
      throw e;
    }

    const reportPath = join(rootDir, 'workspace-consolidation-report.json');
    try {
      const reportData = {
        ...consolidation,
        summary: {
          ...consolidation.summary,
          uniquePackages: Array.from(consolidation.summary.uniquePackages),
          packageVersions: Object.fromEntries(
            Array.from(consolidation.summary.packageVersions.entries()).map(([k, v]) => [k, Array.from(v)])
          )
        }
      };
      writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
      console.log(`  ✅ Report: ${basename(reportPath)}`);
    } catch (e) {
      console.error(`  ⚠️  Failed to write JSON report: ${e.message}`);
    }

    const mdReportPath = join(rootDir, 'WORKSPACE_CONSOLIDATION_REPORT.md');
    try {
      const mdReport = `# ${PROJECT_INFO.fullName} - Workspace Consolidation Report

**Author**: ${PROJECT_INFO.author} (pen name)  
**Generated**: ${new Date().toISOString()}

## Summary

- **Workspaces Scanned**: ${consolidation.summary.totalWorkspaces}
- **Active Workspaces**: ${consolidation.summary.activeWorkspaces}
- **Total Packages**: ${consolidation.summary.totalPackages}
- **Unique Packages**: ${consolidation.summary.uniquePackages.size}
- **Total Tools**: ${consolidation.summary.totalTools}
- **Total Scripts**: ${consolidation.summary.totalScripts}
- **Total Apps**: ${consolidation.summary.totalApps}
- **Duplicates Found**: ${consolidation.summary.duplicates.length}

## Workspaces

${consolidation.workspaces.map(ws => `
### ${ws.workspace}

- **Path**: ${ws.path}
- **Exists**: ${ws.exists ? '✅' : '❌'}
- **Packages**: ${ws.packages.length}
- **Tools**: ${ws.tools.length}
- **Scripts**: ${ws.scripts.length}
- **Apps**: ${ws.apps.length}
${ws.packageJson ? `- **Root Package**: ${ws.packageJson.name} v${ws.packageJson.version}` : ''}
${ws.turboJson ? '- **Turbo**: ✅' : ''}
${ws.errors.length > 0 ? `- **Errors**: ${ws.errors.length}` : ''}
`).join('\n')}

## Next Steps

1. Review duplicate packages and consolidate
2. Use primary workspace: ${consolidation.recommendations.find(r => r.type === 'primary_workspace')?.workspace || 'cathedral-master-deployment'}
3. Open updated workspace file: \`cathedral-of-circuits-magnum-opus-v1.code-workspace\`

---

**Part of ${PROJECT_INFO.fullName}**
`;

      writeFileSync(mdReportPath, mdReport);
      console.log(`  ✅ Markdown report: ${basename(mdReportPath)}`);
    } catch (e) {
      console.error(`  ⚠️  Failed to write markdown report: ${e.message}`);
    }

    console.log(`\n✅ Workspace consolidation complete for ${PROJECT_INFO.fullName}!\n`);

  } catch (error) {
    console.error('\n❌ Error during consolidation:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main().catch(console.error);
