#!/usr/bin/env node
/**
 * Comprehensive Registry Creator
 * 
 * Creates a complete registry of all packages, tools, apps, engines, and systems
 * with paths, links, connections, and Turbo/OpenSpec integration
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const REGISTRY_FILE = path.join(BASE_DIR, 'COMPREHENSIVE_REGISTRY.json');
const REGISTRY_MD = path.join(BASE_DIR, 'COMPREHENSIVE_REGISTRY.md');

// All workspace paths
const WORKSPACES = [
  '/Users/rebeccalemke/cathedral-master-deployment',
  '/Users/rebeccalemke/cathedral-real',
  '/Users/rebeccalemke/cathedral-fixed-clean',
  '/Users/rebeccalemke/cathedral-v1-consolidated',
  '/Users/rebeccalemke/cosmogenesis-engine',
  '/Users/rebeccalemke/Roo-Code'
];

class ComprehensiveRegistry {
  constructor() {
    this.registry = {
      timestamp: Date.now(),
      version: '1.0.0',
      workspaces: {},
      packages: [],
      tools: [],
      apps: [],
      engines: [],
      systems: [],
      connections: [],
      turbo: {},
      openspec: {},
      paths: {},
      platforms: {}
    };
  }

  async build() {
    console.log('📋 Building Comprehensive Registry...\n');
    
    // Scan all workspaces
    for (const workspace of WORKSPACES) {
      if (fs.existsSync(workspace)) {
        await this.scanWorkspace(workspace);
      }
    }
    
    // Build connections
    this.buildConnections();
    
    // Map Turbo tasks
    this.mapTurboTasks();
    
    // Map OpenSpec
    this.mapOpenSpec();
    
    // Save registry
    this.saveRegistry();
    
    console.log('\n✅ Registry complete!');
    console.log(`   Packages: ${this.registry.packages.length}`);
    console.log(`   Tools: ${this.registry.tools.length}`);
    console.log(`   Apps: ${this.registry.apps.length}`);
    console.log(`   Engines: ${this.registry.engines.length}`);
    console.log(`   Systems: ${this.registry.systems.length}`);
    console.log(`   Connections: ${this.registry.connections.length}`);
  }

  async scanWorkspace(workspacePath) {
    const workspaceName = path.basename(workspacePath);
    console.log(`📁 Scanning ${workspaceName}...`);
    
    this.registry.workspaces[workspaceName] = {
      path: workspacePath,
      packages: [],
      tools: [],
      apps: [],
      engines: [],
      systems: []
    };
    
    // Scan packages
    const packagesDir = path.join(workspacePath, 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = this.scanPackages(packagesDir, workspaceName);
      this.registry.packages.push(...packages);
      this.registry.workspaces[workspaceName].packages = packages.map(p => p.id);
    }
    
    // Scan tools
    const toolsDir = path.join(workspacePath, 'tools');
    if (fs.existsSync(toolsDir)) {
      const tools = this.scanTools(toolsDir, workspaceName);
      this.registry.tools.push(...tools);
      this.registry.workspaces[workspaceName].tools = tools.map(t => t.id);
    }
    
    // Scan apps
    const appsDir = path.join(workspacePath, 'apps');
    if (fs.existsSync(appsDir)) {
      const apps = this.scanApps(appsDir, workspaceName);
      this.registry.apps.push(...apps);
      this.registry.workspaces[workspaceName].apps = apps.map(a => a.id);
    }
    
    // Scan engines and systems from packages
    const engines = this.registry.packages.filter(p => 
      p.name.includes('engine') || p.name.includes('Engine') || 
      p.path.includes('engine') || p.type === 'engine'
    );
    this.registry.engines.push(...engines.map(e => ({
      id: e.id,
      name: e.name,
      package: e.id,
      path: e.path,
      workspace: e.workspace,
      type: 'engine'
    })));
    
    const systems = this.registry.packages.filter(p => 
      p.name.includes('system') || p.name.includes('System') || 
      p.path.includes('system') || p.type === 'system'
    );
    this.registry.systems.push(...systems.map(s => ({
      id: s.id,
      name: s.name,
      package: s.id,
      path: s.path,
      workspace: s.workspace,
      type: 'system'
    })));
  }

  scanPackages(packagesDir, workspace) {
    const packages = [];
    
    try {
      const entries = fs.readdirSync(packagesDir);
      for (const entry of entries) {
        const pkgPath = path.join(packagesDir, entry);
        if (!fs.statSync(pkgPath).isDirectory()) continue;
        
        const packageJson = path.join(pkgPath, 'package.json');
        if (fs.existsSync(packageJson)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf-8'));
            const pkgId = `pkg:${workspace}:${entry}`;
            
            packages.push({
              id: pkgId,
              name: pkg.name || entry,
              displayName: entry,
              version: pkg.version || '1.0.0',
              path: pkgPath,
              workspace,
              type: this.detectType(pkgPath, pkg),
              description: pkg.description || '',
              dependencies: pkg.dependencies || {},
              devDependencies: pkg.devDependencies || {},
              scripts: pkg.scripts || {},
              turbo: this.getTurboConfig(pkgPath),
              openspec: this.getOpenSpecConfig(pkgPath)
            });
          } catch (e) {
            // Skip invalid packages
          }
        }
      }
    } catch (e) {
      // Can't read packages directory
    }
    
    return packages;
  }

  scanTools(toolsDir, workspace) {
    const tools = [];
    
    try {
      const entries = fs.readdirSync(toolsDir);
      for (const entry of entries) {
        if (!entry.endsWith('.mjs') && !entry.endsWith('.js') && !entry.endsWith('.ts')) continue;
        
        const toolPath = path.join(toolsDir, entry);
        if (!fs.statSync(toolPath).isFile()) continue;
        
        const toolId = `tool:${workspace}:${entry.replace(/\.(mjs|js|ts)$/, '')}`;
        
        tools.push({
          id: toolId,
          name: entry,
          path: toolPath,
          workspace,
          type: 'tool',
          extension: path.extname(entry),
          description: this.extractToolDescription(toolPath)
        });
      }
    } catch (e) {
      // Can't read tools directory
    }
    
    return tools;
  }

  scanApps(appsDir, workspace) {
    const apps = [];
    
    try {
      const entries = fs.readdirSync(appsDir);
      for (const entry of entries) {
        const appPath = path.join(appsDir, entry);
        if (!fs.statSync(appPath).isDirectory()) continue;
        
        const packageJson = path.join(appPath, 'package.json');
        if (fs.existsSync(packageJson)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf-8'));
            const appId = `app:${workspace}:${entry}`;
            
            apps.push({
              id: appId,
              name: pkg.name || entry,
              displayName: entry,
              path: appPath,
              workspace,
              type: 'app',
              version: pkg.version || '1.0.0',
              description: pkg.description || '',
              dependencies: pkg.dependencies || {},
              scripts: pkg.scripts || {}
            });
          } catch (e) {
            // Skip invalid apps
          }
        }
      }
    } catch (e) {
      // Can't read apps directory
    }
    
    return apps;
  }

  detectType(pkgPath, pkg) {
    const name = (pkg.name || '').toLowerCase();
    const pathLower = pkgPath.toLowerCase();
    
    if (name.includes('engine') || pathLower.includes('engine')) return 'engine';
    if (name.includes('system') || pathLower.includes('system')) return 'system';
    if (name.includes('core') || pathLower.includes('core')) return 'core';
    if (name.includes('bridge') || pathLower.includes('bridge')) return 'bridge';
    if (name.includes('hub') || pathLower.includes('hub')) return 'hub';
    
    return 'package';
  }

  getTurboConfig(pkgPath) {
    const turboJson = path.join(path.dirname(pkgPath), '..', 'turbo.json');
    if (fs.existsSync(turboJson)) {
      try {
        return JSON.parse(fs.readFileSync(turboJson, 'utf-8'));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  getOpenSpecConfig(pkgPath) {
    const openspecDir = path.join(path.dirname(pkgPath), '..', 'openspec');
    const openspecFiles = [];
    
    if (fs.existsSync(openspecDir)) {
      try {
        const files = fs.readdirSync(openspecDir, { recursive: true });
        for (const file of files) {
          if (file.endsWith('.md') || file.endsWith('.json')) {
            openspecFiles.push(path.join(openspecDir, file));
          }
        }
      } catch (e) {
        // Can't read openspec
      }
    }
    
    return openspecFiles.length > 0 ? openspecFiles : null;
  }

  extractToolDescription(toolPath) {
    try {
      const content = fs.readFileSync(toolPath, 'utf-8');
      const match = content.match(/\/\*\*[\s\S]*?\*\//);
      if (match) {
        return match[0].replace(/\*\//g, '').replace(/\/\*\*/g, '').trim();
      }
    } catch (e) {
      // Can't read tool
    }
    return '';
  }

  buildConnections() {
    console.log('🔗 Building connections...');
    
    // Connect packages to apps
    for (const app of this.registry.apps) {
      for (const dep of Object.keys(app.dependencies || {})) {
        const pkg = this.registry.packages.find(p => p.name === dep);
        if (pkg) {
          this.registry.connections.push({
            from: app.id,
            to: pkg.id,
            type: 'dependency',
            relationship: 'app-uses-package'
          });
        }
      }
    }
    
    // Connect packages to packages
    for (const pkg of this.registry.packages) {
      for (const dep of Object.keys(pkg.dependencies || {})) {
        const depPkg = this.registry.packages.find(p => p.name === dep);
        if (depPkg) {
          this.registry.connections.push({
            from: pkg.id,
            to: depPkg.id,
            type: 'dependency',
            relationship: 'package-depends-on-package'
          });
        }
      }
    }
    
    // Connect tools to packages/apps
    for (const tool of this.registry.tools) {
      // Tools can reference packages/apps in their code
      // This is a simplified connection
      this.registry.connections.push({
        from: tool.id,
        to: 'workspace',
        type: 'tool',
        relationship: 'tool-operates-on-workspace'
      });
    }
  }

  mapTurboTasks() {
    console.log('⚡ Mapping Turbo tasks...');
    
    const turboJson = path.join(BASE_DIR, 'turbo.json');
    if (fs.existsSync(turboJson)) {
      try {
        const turbo = JSON.parse(fs.readFileSync(turboJson, 'utf-8'));
        this.registry.turbo = {
          config: turbo,
          tasks: Object.keys(turbo.tasks || {}),
          packages: this.registry.packages.map(p => p.id)
        };
      } catch (e) {
        // Can't read turbo.json
      }
    }
  }

  mapOpenSpec() {
    console.log('📖 Mapping OpenSpec...');
    
    const openspecDir = path.join(BASE_DIR, 'openspec');
    if (fs.existsSync(openspecDir)) {
      const specs = [];
      try {
        const files = fs.readdirSync(openspecDir, { recursive: true });
        for (const file of files) {
          if (file.endsWith('.md') || file.endsWith('.json')) {
            specs.push({
              path: path.join(openspecDir, file),
              name: file,
              type: file.endsWith('.md') ? 'markdown' : 'json'
            });
          }
        }
        this.registry.openspec = {
          directory: openspecDir,
          specs
        };
      } catch (e) {
        // Can't read openspec
      }
    }
  }

  saveRegistry() {
    // Update timestamp to current time right before saving
    const currentTimestamp = Date.now();
    this.registry.timestamp = currentTimestamp;
    
    // Save JSON
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(this.registry, null, 2), 'utf-8');
    
    // Save Markdown with current timestamp
    const md = this.generateMarkdown(currentTimestamp);
    fs.writeFileSync(REGISTRY_MD, md, 'utf-8');
    
    console.log(`\n💾 Registry saved:`);
    console.log(`   JSON: ${REGISTRY_FILE}`);
    console.log(`   Markdown: ${REGISTRY_MD}`);
    console.log(`   Timestamp: ${new Date(currentTimestamp).toISOString()}`);
  }

  generateMarkdown(timestamp = null) {
    // Use provided timestamp or current time
    const genTimestamp = timestamp || this.registry.timestamp || Date.now();
    let md = `# Comprehensive Registry\n\n`;
    md += `**Generated:** ${new Date(genTimestamp).toISOString()}\n\n`;
    md += `## Summary\n\n`;
    md += `- **Packages:** ${this.registry.packages.length}\n`;
    md += `- **Tools:** ${this.registry.tools.length}\n`;
    md += `- **Apps:** ${this.registry.apps.length}\n`;
    md += `- **Engines:** ${this.registry.engines.length}\n`;
    md += `- **Systems:** ${this.registry.systems.length}\n`;
    md += `- **Connections:** ${this.registry.connections.length}\n\n`;
    
    md += `## Packages\n\n`;
    for (const pkg of this.registry.packages) {
      md += `### ${pkg.name}\n`;
      md += `- **ID:** \`${pkg.id}\`\n`;
      md += `- **Path:** \`${pkg.path}\`\n`;
      md += `- **Workspace:** ${pkg.workspace}\n`;
      md += `- **Type:** ${pkg.type}\n`;
      md += `- **Version:** ${pkg.version}\n`;
      if (pkg.description) md += `- **Description:** ${pkg.description}\n`;
      md += `\n`;
    }
    
    md += `## Tools\n\n`;
    for (const tool of this.registry.tools) {
      md += `### ${tool.name}\n`;
      md += `- **ID:** \`${tool.id}\`\n`;
      md += `- **Path:** \`${tool.path}\`\n`;
      md += `- **Workspace:** ${tool.workspace}\n`;
      md += `\n`;
    }
    
    md += `## Apps\n\n`;
    for (const app of this.registry.apps) {
      md += `### ${app.name}\n`;
      md += `- **ID:** \`${app.id}\`\n`;
      md += `- **Path:** \`${app.path}\`\n`;
      md += `- **Workspace:** ${app.workspace}\n`;
      md += `\n`;
    }
    
    md += `## Engines\n\n`;
    for (const engine of this.registry.engines) {
      md += `### ${engine.name}\n`;
      md += `- **ID:** \`${engine.id}\`\n`;
      md += `- **Package:** \`${engine.package}\`\n`;
      md += `- **Path:** \`${engine.path}\`\n`;
      md += `\n`;
    }
    
    md += `## Systems\n\n`;
    for (const system of this.registry.systems) {
      md += `### ${system.name}\n`;
      md += `- **ID:** \`${system.id}\`\n`;
      md += `- **Package:** \`${system.package}\`\n`;
      md += `- **Path:** \`${system.path}\`\n`;
      md += `\n`;
    }
    
    md += `## Connections\n\n`;
    md += `Total: ${this.registry.connections.length}\n\n`;
    
    md += `## Turbo Configuration\n\n`;
    if (this.registry.turbo.tasks) {
      md += `**Tasks:** ${this.registry.turbo.tasks.join(', ')}\n\n`;
    }
    
    md += `## OpenSpec\n\n`;
    if (this.registry.openspec.specs) {
      md += `**Specs:** ${this.registry.openspec.specs.length}\n\n`;
    }
    
    return md;
  }
}

// Run
const registry = new ComprehensiveRegistry();
registry.build().catch(console.error);

