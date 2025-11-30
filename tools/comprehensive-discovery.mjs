#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Comprehensive Discovery Tool
 * Discovers ALL packages, tools, apps, engines, systems across ALL workspaces
 * Documents what's COMPLETE vs PARTIAL (no changes yet)
 * Uses REAL NAMES from package.json, not generated IDs
 * 
 * This is Phase 1: Documentation - document what exists before any fixes
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

// All workspaces to scan - includes ALL found places
const WORKSPACES = [
  '/Users/rebeccalemke/cathedral-master-deployment',
  '/Users/rebeccalemke/cathedral-real',
  '/Users/rebeccalemke/cathedral-fixed-clean',
  '/Users/rebeccalemke/cathedral-v1-consolidated',
  '/Users/rebeccalemke/cosmogenesis-engine'
];

// Read remote repos from CATHEDRAL_CONNECTIONS.json
function getRemoteRepos() {
  const connectionsFile = path.join(BASE_DIR, 'CATHEDRAL_CONNECTIONS.json');
  const remoteReposDir = path.join(BASE_DIR, '.remote-repos');
  
  if (!fs.existsSync(connectionsFile)) {
    return [];
  }
  
  try {
    const connections = JSON.parse(fs.readFileSync(connectionsFile, 'utf-8'));
    const remotes = connections.connections || [];
    
    // Return paths to cloned remote repos
    return remotes.map(remote => {
      const repoName = remote.remote.split('/')[1];
      return path.join(remoteReposDir, repoName);
    }).filter(p => fs.existsSync(p));
  } catch (e) {
    return [];
  }
}

// Also check for additional workspaces dynamically
function discoverAdditionalWorkspaces() {
  const additional = [];
  const baseDir = '/Users/rebeccalemke';
  
  try {
    const entries = fs.readdirSync(baseDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.startsWith('cathedral')) {
        const fullPath = path.join(baseDir, entry.name);
        if (!WORKSPACES.includes(fullPath) && fs.existsSync(path.join(fullPath, 'package.json'))) {
          additional.push(fullPath);
        }
      }
    }
  } catch (e) {
    // Skip if can't read
  }
  
  // Add remote repos
  const remoteRepos = getRemoteRepos();
  
  return [...WORKSPACES, ...additional, ...remoteRepos];
}

class ComprehensiveDiscovery {
  constructor() {
    this.discovered = {
      packages: [],
      tools: [],
      apps: [],
      engines: [],
      systems: [],
      partials: [] // Packages found in multiple locations
    };
    this.pathMap = new Map(); // Track all paths for each entity
  }

  async discover() {
    console.log('🔍 Comprehensive Discovery - Documenting What Exists\n');
    console.log('═'.repeat(80) + '\n');

    // Discover ALL workspaces (including dynamically found ones)
    const allWorkspaces = discoverAdditionalWorkspaces();
    console.log(`📂 Found ${allWorkspaces.length} workspaces to scan\n`);

    for (const workspace of allWorkspaces) {
      if (!fs.existsSync(workspace)) {
        console.log(`⚠️  Workspace not found: ${workspace}`);
        continue;
      }

      console.log(`📂 Scanning: ${path.basename(workspace)}`);
      await this.scanWorkspace(workspace);
    }

    // Identify partials (same name in multiple locations)
    this.identifyPartials();

    // Generate report
    await this.generateReport();

    console.log('\n✅ Discovery Complete!');
    console.log(`   Packages: ${this.discovered.packages.length}`);
    console.log(`   Tools: ${this.discovered.tools.length}`);
    console.log(`   Apps: ${this.discovered.apps.length}`);
    console.log(`   Engines: ${this.discovered.engines.length}`);
    console.log(`   Systems: ${this.discovered.systems.length}`);
    console.log(`   Partials: ${this.discovered.partials.length}`);
  }

  async scanWorkspace(workspace) {
    // Scan packages
    const packagesDir = path.join(workspace, 'packages');
    if (fs.existsSync(packagesDir)) {
      await this.scanDirectory(packagesDir, 'package', workspace);
    }

    // Scan tools
    const toolsDir = path.join(workspace, 'tools');
    if (fs.existsSync(toolsDir)) {
      await this.scanDirectory(toolsDir, 'tool', workspace);
    }

    // Scan apps
    const appsDir = path.join(workspace, 'apps');
    if (fs.existsSync(appsDir)) {
      await this.scanDirectory(appsDir, 'app', workspace);
    }

    // Scan engines (may be in packages or separate)
    const enginesDir = path.join(workspace, 'engines');
    if (fs.existsSync(enginesDir)) {
      await this.scanDirectory(enginesDir, 'engine', workspace);
    }
  }

  async scanDirectory(dir, type, workspace) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (!entry.isDirectory() || entry.name.startsWith('.')) {
          continue;
        }

        const itemPath = path.join(dir, entry.name);
        const packageJsonPath = path.join(itemPath, 'package.json');
        
        let realName = entry.name;
        let packageJson = null;
        let isComplete = false;
        let description = '';

        // Try to get real name from package.json
        if (fs.existsSync(packageJsonPath)) {
          try {
            packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            realName = packageJson.name || entry.name;
            description = packageJson.description || '';
            
            // Check if complete (has main entry, scripts, etc.)
            isComplete = !!(
              packageJson.main || 
              packageJson.module || 
              packageJson.exports ||
              (packageJson.scripts && Object.keys(packageJson.scripts).length > 0)
            );
          } catch (e) {
            // Invalid package.json, use directory name
          }
        }

        // Determine entity type
        let entityType = type;
        if (type === 'package') {
          // Check if it's actually an engine or system
          if (realName.includes('engine') || description.includes('engine')) {
            entityType = 'engine';
          } else if (realName.includes('system') || description.includes('system')) {
            entityType = 'system';
          }
        }

        const entity = {
          realName: realName,
          directoryName: entry.name,
          path: itemPath,
          workspace: path.basename(workspace),
          type: entityType,
          isComplete: isComplete,
          description: description,
          packageJson: packageJson ? {
            name: packageJson.name,
            version: packageJson.version,
            description: packageJson.description,
            main: packageJson.main,
            module: packageJson.module,
            exports: packageJson.exports,
            scripts: packageJson.scripts ? Object.keys(packageJson.scripts) : []
          } : null,
          hasPackageJson: !!packageJson,
          timestamp: new Date().toISOString()
        };

        // Add to appropriate collection
        switch (entityType) {
          case 'package':
            this.discovered.packages.push(entity);
            break;
          case 'tool':
            this.discovered.tools.push(entity);
            break;
          case 'app':
            this.discovered.apps.push(entity);
            break;
          case 'engine':
            this.discovered.engines.push(entity);
            break;
          case 'system':
            this.discovered.systems.push(entity);
            break;
        }

        // Track paths for partial detection
        if (!this.pathMap.has(realName)) {
          this.pathMap.set(realName, []);
        }
        this.pathMap.get(realName).push({
          path: itemPath,
          workspace: path.basename(workspace),
          isComplete: isComplete
        });
      }
    } catch (e) {
      console.error(`   ⚠️  Error scanning ${dir}:`, e.message);
    }
  }

  identifyPartials() {
    // Find entities with same real name in multiple locations
    for (const [realName, paths] of this.pathMap.entries()) {
      if (paths.length > 1) {
        // Check if any is complete
        const hasComplete = paths.some(p => p.isComplete);
        const allIncomplete = paths.every(p => !p.isComplete);

        this.discovered.partials.push({
          realName: realName,
          locations: paths,
          isPartial: allIncomplete || !hasComplete,
          needsMerge: true,
          primaryLocation: hasComplete 
            ? paths.find(p => p.isComplete)?.path 
            : paths[0].path // Use first as primary if none complete
        });
      }
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      summary: {
        totalPackages: this.discovered.packages.length,
        totalTools: this.discovered.tools.length,
        totalApps: this.discovered.apps.length,
        totalEngines: this.discovered.engines.length,
        totalSystems: this.discovered.systems.length,
        totalPartials: this.discovered.partials.length,
        completePackages: this.discovered.packages.filter(p => p.isComplete).length,
        incompletePackages: this.discovered.packages.filter(p => !p.isComplete).length
      },
      workspaces: discoverAdditionalWorkspaces().map(w => path.basename(w)),
      discovered: this.discovered,
      pathMap: Object.fromEntries(this.pathMap)
    };

    const reportPath = path.join(BASE_DIR, 'DISCOVERY_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report saved: ${reportPath}`);

    // Also create markdown summary
    await this.generateMarkdownSummary(report);
  }

  async generateMarkdownSummary(report) {
    const md = `# Comprehensive Discovery Report

**Generated:** ${report.timestamp}
**Version:** ${report.version}

## Summary

- **Total Packages:** ${report.summary.totalPackages}
- **Total Tools:** ${report.summary.totalTools}
- **Total Apps:** ${report.summary.totalApps}
- **Total Engines:** ${report.summary.totalEngines}
- **Total Systems:** ${report.summary.totalSystems}
- **Partials (need merge):** ${report.summary.totalPartials}
- **Complete Packages:** ${report.summary.completePackages}
- **Incomplete Packages:** ${report.summary.incompletePackages}

## Workspaces Scanned

${report.workspaces.map(w => `- ${w}`).join('\n')}

## Partials Requiring Merge

${report.discovered.partials.map(p => `- **${p.realName}**: ${p.locations.length} locations (primary: ${path.basename(p.primaryLocation)})`).join('\n')}

## Next Steps

1. Review DISCOVERY_REPORT.json for full details
2. Run partial-analyzer.mjs to analyze merge strategy
3. Run codex-alignment-analyzer.mjs to check codex alignment
4. Create fix/merge plan based on analysis

---

**Note:** This is documentation only - no changes have been made.
`;

    const mdPath = path.join(BASE_DIR, 'DISCOVERY_REPORT.md');
    fs.writeFileSync(mdPath, md);
    console.log(`📄 Markdown summary: ${mdPath}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const discovery = new ComprehensiveDiscovery();
  discovery.discover().catch(console.error);
}

export default ComprehensiveDiscovery;

