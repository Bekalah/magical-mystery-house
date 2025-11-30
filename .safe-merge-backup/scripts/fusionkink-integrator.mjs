#!/usr/bin/env node
/**
 * FusionKink Integrator - Brings together all tools, data, and codex
 * 
 * Scans and integrates:
 * - All tools across workspaces
 * - All codex data
 * - All fusion-kink systems
 * - All related packages
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class FusionKinkIntegrator {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-v1-consolidated',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    this.tools = [];
    this.codexData = [];
    this.fusionKinkSystems = [];
    this.packages = [];
    this.integration = {
      timestamp: Date.now(),
      tools: [],
      codex: [],
      fusionKink: [],
      packages: [],
      connections: [],
      unified: {}
    };
  }

  scanAll() {
    console.log('🔍 Scanning all tools, data, and codex...\n');
    
    this.scanTools();
    this.scanCodex();
    this.scanFusionKink();
    this.scanPackages();
    
    console.log(`✅ Scanned:`);
    console.log(`   Tools: ${this.tools.length}`);
    console.log(`   Codex: ${this.codexData.length}`);
    console.log(`   FusionKink: ${this.fusionKinkSystems.length}`);
    console.log(`   Packages: ${this.packages.length}\n`);
  }

  scanTools() {
    console.log('📦 Scanning tools...');
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      const scriptsDir = path.join(workspace, 'scripts');
      const toolsDir = path.join(workspace, 'tools');
      
      this.scanDirectory(scriptsDir, 'script', workspace);
      this.scanDirectory(toolsDir, 'tool', workspace);
    }
  }

  scanDirectory(dir, type, workspace) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.scanDirectory(fullPath, type, workspace);
        } else if (stat.isFile() && (entry.endsWith('.mjs') || entry.endsWith('.ts') || entry.endsWith('.js'))) {
          this.tools.push({
            name: entry,
            path: fullPath,
            workspace,
            type,
            relativePath: path.relative(workspace, fullPath),
            size: stat.size,
            mtime: stat.mtime
          });
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }

  scanCodex() {
    console.log('📚 Scanning codex data...');
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      // Look for codex files
      const codexDirs = [
        path.join(workspace, 'codex'),
        path.join(workspace, 'data'),
        path.join(workspace, 'docs'),
        path.join(workspace, 'packages', 'codex-144-99-core')
      ];
      
      for (const codexDir of codexDirs) {
        this.scanCodexDirectory(codexDir, workspace);
      }
      
      // Also scan root for codex JSON files
      try {
        const rootFiles = fs.readdirSync(workspace);
        for (const file of rootFiles) {
          if (file.includes('codex') && file.endsWith('.json')) {
            const filePath = path.join(workspace, file);
            this.codexData.push({
              name: file,
              path: filePath,
              workspace,
              type: 'codex-json'
            });
          }
        }
      } catch (e) {
        // Ignore
      }
    }
  }

  scanCodexDirectory(dir, workspace) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.')) continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.scanCodexDirectory(fullPath, workspace);
        } else if (stat.isFile() && (entry.endsWith('.json') || entry.endsWith('.md'))) {
          if (entry.includes('codex') || entry.includes('144') || entry.includes('99')) {
            this.codexData.push({
              name: entry,
              path: fullPath,
              workspace,
              type: entry.endsWith('.json') ? 'codex-json' : 'codex-doc',
              relativePath: path.relative(workspace, fullPath)
            });
          }
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }

  scanFusionKink() {
    console.log('🔗 Scanning FusionKink systems...');
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      // Look for fusion-kink packages
      const packagesDir = path.join(workspace, 'packages');
      if (fs.existsSync(packagesDir)) {
        try {
          const packages = fs.readdirSync(packagesDir);
          for (const pkg of packages) {
            if (pkg.toLowerCase().includes('fusion') || pkg.toLowerCase().includes('kink')) {
              const pkgPath = path.join(packagesDir, pkg);
              if (fs.statSync(pkgPath).isDirectory()) {
                this.fusionKinkSystems.push({
                  name: pkg,
                  path: pkgPath,
                  workspace,
                  type: 'package'
                });
              }
            }
          }
        } catch (e) {
          // Ignore
        }
      }
      
      // Look for fusion-kink tools
      for (const tool of this.tools) {
        if (tool.name.toLowerCase().includes('fusion') || tool.name.toLowerCase().includes('kink')) {
          this.fusionKinkSystems.push({
            name: tool.name,
            path: tool.path,
            workspace: tool.workspace,
            type: 'tool'
          });
        }
      }
    }
  }

  scanPackages() {
    console.log('📦 Scanning packages...');
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      const packagesDir = path.join(workspace, 'packages');
      if (fs.existsSync(packagesDir)) {
        try {
          const packages = fs.readdirSync(packagesDir);
          for (const pkg of packages) {
            const pkgPath = path.join(packagesDir, pkg);
            if (fs.statSync(pkgPath).isDirectory()) {
              const packageJson = path.join(pkgPath, 'package.json');
              if (fs.existsSync(packageJson)) {
                try {
                  const pkgData = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
                  this.packages.push({
                    name: pkgData.name || pkg,
                    packageName: pkg,
                    path: pkgPath,
                    workspace,
                    version: pkgData.version || 'unknown',
                    description: pkgData.description || ''
                  });
                } catch (e) {
                  // Ignore
                }
              }
            }
          }
        } catch (e) {
          // Ignore
        }
      }
    }
  }

  createConnections() {
    console.log('🔗 Creating connections...\n');
    
    // Connect tools to codex
    for (const tool of this.tools) {
      for (const codex of this.codexData) {
        if (tool.workspace === codex.workspace) {
          this.integration.connections.push({
            from: tool.name,
            to: codex.name,
            type: 'tool-codex',
            workspace: tool.workspace
          });
        }
      }
    }
    
    // Connect fusion-kink to packages
    for (const fusion of this.fusionKinkSystems) {
      for (const pkg of this.packages) {
        if (fusion.workspace === pkg.workspace) {
          this.integration.connections.push({
            from: fusion.name,
            to: pkg.name,
            type: 'fusion-package',
            workspace: fusion.workspace
          });
        }
      }
    }
    
    // Connect packages to codex
    for (const pkg of this.packages) {
      for (const codex of this.codexData) {
        if (pkg.workspace === codex.workspace) {
          this.integration.connections.push({
            from: pkg.name,
            to: codex.name,
            type: 'package-codex',
            workspace: pkg.workspace
          });
        }
      }
    }
    
    console.log(`✅ Created ${this.integration.connections.length} connections\n`);
  }

  buildUnified() {
    console.log('🔗 Building unified system...\n');
    
    this.integration.tools = this.tools;
    this.integration.codex = this.codexData;
    this.integration.fusionKink = this.fusionKinkSystems;
    this.integration.packages = this.packages;
    
    // Create unified fusion-kink system
    this.integration.unified = {
      fusionKink: {
        packages: this.fusionKinkSystems.filter(s => s.type === 'package'),
        tools: this.fusionKinkSystems.filter(s => s.type === 'tool'),
        total: this.fusionKinkSystems.length
      },
      codex: {
        files: this.codexData.length,
        workspaces: [...new Set(this.codexData.map(c => c.workspace))]
      },
      tools: {
        total: this.tools.length,
        byWorkspace: this.groupByWorkspace(this.tools)
      },
      packages: {
        total: this.packages.length,
        byWorkspace: this.groupByWorkspace(this.packages)
      }
    };
  }

  groupByWorkspace(items) {
    const grouped = {};
    for (const item of items) {
      if (!grouped[item.workspace]) {
        grouped[item.workspace] = [];
      }
      grouped[item.workspace].push(item);
    }
    return grouped;
  }

  saveIntegration() {
    const outputPath = path.join(rootDir, 'fusionkink-integration.json');
    fs.writeFileSync(outputPath, JSON.stringify(this.integration, null, 2));
    console.log(`✅ Integration saved to: ${outputPath}\n`);
    
    // Generate markdown report
    this.generateMarkdownReport();
  }

  generateMarkdownReport() {
    let md = '# 🔗 FusionKink Integration Report\n\n';
    md += `Generated: ${new Date(this.integration.timestamp).toLocaleString()}\n\n`;
    
    md += '## Summary\n\n';
    md += `- **Tools**: ${this.tools.length}\n`;
    md += `- **Codex Files**: ${this.codexData.length}\n`;
    md += `- **FusionKink Systems**: ${this.fusionKinkSystems.length}\n`;
    md += `- **Packages**: ${this.packages.length}\n`;
    md += `- **Connections**: ${this.integration.connections.length}\n\n`;
    
    md += '## FusionKink Systems\n\n';
    for (const fusion of this.fusionKinkSystems) {
      md += `### ${fusion.name}\n\n`;
      md += `- **Type**: ${fusion.type}\n`;
      md += `- **Workspace**: ${fusion.workspace}\n`;
      md += `- **Path**: ${fusion.path}\n\n`;
    }
    
    md += '## Codex Data\n\n';
    const codexByWorkspace = this.groupByWorkspace(this.codexData);
    for (const [workspace, codex] of Object.entries(codexByWorkspace)) {
      md += `### ${workspace}\n\n`;
      for (const item of codex) {
        md += `- ${item.name} (${item.type})\n`;
      }
      md += '\n';
    }
    
    md += '## Tools\n\n';
    const toolsByWorkspace = this.groupByWorkspace(this.tools);
    for (const [workspace, tools] of Object.entries(toolsByWorkspace)) {
      md += `### ${workspace} (${tools.length} tools)\n\n`;
      for (const tool of tools.slice(0, 20)) {
        md += `- ${tool.name}\n`;
      }
      if (tools.length > 20) {
        md += `- ... and ${tools.length - 20} more\n`;
      }
      md += '\n';
    }
    
    md += '## Connections\n\n';
    md += `Total: ${this.integration.connections.length}\n\n`;
    
    const reportPath = path.join(rootDir, 'FUSIONKINK_INTEGRATION.md');
    fs.writeFileSync(reportPath, md);
    console.log(`✅ Markdown report saved to: ${reportPath}\n`);
  }

  printSummary() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                    🔗 FUSIONKINK INTEGRATION SUMMARY                      ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📦 FUSIONKINK SYSTEMS:\n');
    for (const fusion of this.fusionKinkSystems) {
      console.log(`   ${fusion.name.padEnd(40)} ${fusion.type} @ ${path.basename(fusion.workspace)}`);
    }
    
    console.log(`\n📚 CODEX DATA: ${this.codexData.length} files\n`);
    const codexByWorkspace = this.groupByWorkspace(this.codexData);
    for (const [workspace, codex] of Object.entries(codexByWorkspace)) {
      console.log(`   ${path.basename(workspace)}: ${codex.length} files`);
    }
    
    console.log(`\n🔗 CONNECTIONS: ${this.integration.connections.length}\n`);
    
    console.log('═'.repeat(80) + '\n');
  }
}

async function main() {
  const integrator = new FusionKinkIntegrator();
  
  integrator.scanAll();
  integrator.createConnections();
  integrator.buildUnified();
  integrator.printSummary();
  integrator.saveIntegration();
  
  console.log('✅ FusionKink integration complete!\n');
}

main().catch(console.error);

