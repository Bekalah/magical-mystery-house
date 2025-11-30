#!/usr/bin/env node
/**
 * System Connector - Maps and connects all tools across directories
 * 
 * Connects tools from:
 * - cathedral-master-deployment
 * - cathedral-real
 * - Other cathedral workspaces
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SystemConnector {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-v1-consolidated',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    this.tools = new Map();
    this.systems = new Map();
    this.connections = [];
    this.systemMap = {
      health: [],
      build: [],
      deploy: [],
      backup: [],
      security: [],
      integration: [],
      monitoring: [],
      automation: []
    };
  }

  discoverTools() {
    console.log('🔍 Discovering tools across all workspaces...\n');
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      const scriptsDir = path.join(workspace, 'scripts');
      const toolsDir = path.join(workspace, 'tools');
      
      this.scanDirectory(scriptsDir, 'script', workspace);
      this.scanDirectory(toolsDir, 'tool', workspace);
    }
    
    console.log(`✅ Found ${this.tools.size} tools across ${this.workspaces.length} workspaces\n`);
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
          const toolId = `${workspace}:${type}:${entry}`;
          const category = this.categorizeTool(entry);
          
          this.tools.set(toolId, {
            id: toolId,
            name: entry,
            path: fullPath,
            workspace,
            type,
            category,
            relativePath: path.relative(workspace, fullPath)
          });
          
          // Add to system map
          if (this.systemMap[category]) {
            this.systemMap[category].push(toolId);
          }
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }

  categorizeTool(filename) {
    const name = filename.toLowerCase();
    
    if (name.includes('health') || name.includes('monitor')) return 'health';
    if (name.includes('build') || name.includes('compile')) return 'build';
    if (name.includes('deploy') || name.includes('publish')) return 'deploy';
    if (name.includes('backup') || name.includes('save')) return 'backup';
    if (name.includes('security') || name.includes('audit')) return 'security';
    if (name.includes('integrat') || name.includes('sync')) return 'integration';
    if (name.includes('watch') || name.includes('dashboard')) return 'monitoring';
    if (name.includes('automate') || name.includes('runner')) return 'automation';
    
    return 'other';
  }

  findConnections() {
    console.log('🔗 Finding connections between tools...\n');
    
    const toolArray = Array.from(this.tools.values());
    
    for (let i = 0; i < toolArray.length; i++) {
      for (let j = i + 1; j < toolArray.length; j++) {
        const tool1 = toolArray[i];
        const tool2 = toolArray[j];
        
        // Check if tools are related
        if (this.areRelated(tool1, tool2)) {
          this.connections.push({
            from: tool1.id,
            to: tool2.id,
            type: this.getConnectionType(tool1, tool2),
            strength: this.calculateStrength(tool1, tool2)
          });
        }
      }
    }
    
    console.log(`✅ Found ${this.connections.length} connections\n`);
  }

  areRelated(tool1, tool2) {
    // Same category
    if (tool1.category === tool2.category && tool1.category !== 'other') return true;
    
    // Similar names
    const name1 = tool1.name.toLowerCase();
    const name2 = tool2.name.toLowerCase();
    if (name1.includes(name2.substring(0, 5)) || name2.includes(name1.substring(0, 5))) return true;
    
    // Same workspace
    if (tool1.workspace === tool2.workspace) return true;
    
    return false;
  }

  getConnectionType(tool1, tool2) {
    if (tool1.category === tool2.category) return 'same-category';
    if (tool1.workspace === tool2.workspace) return 'same-workspace';
    return 'related';
  }

  calculateStrength(tool1, tool2) {
    let strength = 0;
    
    if (tool1.category === tool2.category) strength += 3;
    if (tool1.workspace === tool2.workspace) strength += 2;
    if (tool1.type === tool2.type) strength += 1;
    
    return strength;
  }

  generateSystemMap() {
    console.log('📊 Generating system map...\n');
    
    const map = {
      timestamp: Date.now(),
      workspaces: this.workspaces.filter(w => fs.existsSync(w)),
      tools: Array.from(this.tools.values()),
      connections: this.connections,
      systems: {},
      recommendations: []
    };
    
    // Generate system groupings
    for (const [category, toolIds] of Object.entries(this.systemMap)) {
      if (toolIds.length > 0) {
        map.systems[category] = {
          tools: toolIds.map(id => this.tools.get(id)),
          count: toolIds.length
        };
      }
    }
    
    // Generate recommendations
    map.recommendations = this.generateRecommendations();
    
    return map;
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Find duplicate tools
    const toolNames = new Map();
    for (const tool of this.tools.values()) {
      const name = tool.name;
      if (!toolNames.has(name)) {
        toolNames.set(name, []);
      }
      toolNames.get(name).push(tool);
    }
    
    for (const [name, tools] of toolNames.entries()) {
      if (tools.length > 1) {
        recommendations.push({
          type: 'merge',
          priority: 'high',
          message: `Found ${tools.length} instances of ${name} - consider merging`,
          tools: tools.map(t => t.id)
        });
      }
    }
    
    // Find missing connections
    const healthTools = Array.from(this.tools.values()).filter(t => t.category === 'health');
    const backupTools = Array.from(this.tools.values()).filter(t => t.category === 'backup');
    
    if (healthTools.length > 0 && backupTools.length > 0) {
      recommendations.push({
        type: 'connect',
        priority: 'medium',
        message: 'Health and backup tools should be connected',
        tools: [...healthTools.map(t => t.id), ...backupTools.map(t => t.id)]
      });
    }
    
    return recommendations;
  }

  saveMap(outputPath) {
    const map = this.generateSystemMap();
    fs.writeFileSync(outputPath, JSON.stringify(map, null, 2));
    console.log(`✅ System map saved to: ${outputPath}\n`);
    return map;
  }

  printSummary() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                        🗺️  SYSTEM MAP SUMMARY                              ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📦 TOOLS BY CATEGORY:\n');
    for (const [category, toolIds] of Object.entries(this.systemMap)) {
      if (toolIds.length > 0) {
        console.log(`   ${category.toUpperCase().padEnd(15)} ${toolIds.length} tools`);
      }
    }
    
    console.log('\n🔗 CONNECTIONS:\n');
    console.log(`   Total connections: ${this.connections.length}`);
    const byType = {};
    for (const conn of this.connections) {
      byType[conn.type] = (byType[conn.type] || 0) + 1;
    }
    for (const [type, count] of Object.entries(byType)) {
      console.log(`   ${type.padEnd(20)} ${count} connections`);
    }
    
    console.log('\n💡 RECOMMENDATIONS:\n');
    const map = this.generateSystemMap();
    for (const rec of map.recommendations.slice(0, 5)) {
      console.log(`   [${rec.priority.toUpperCase()}] ${rec.message}`);
    }
    
    console.log('\n' + '═'.repeat(80) + '\n');
  }

  generateSystemMap() {
    const map = {
      timestamp: Date.now(),
      workspaces: this.workspaces.filter(w => fs.existsSync(w)),
      tools: Array.from(this.tools.values()),
      connections: this.connections,
      systems: {},
      recommendations: []
    };
    
    // Generate system groupings
    for (const [category, toolIds] of Object.entries(this.systemMap)) {
      if (toolIds.length > 0) {
        map.systems[category] = {
          tools: toolIds.map(id => this.tools.get(id)),
          count: toolIds.length
        };
      }
    }
    
    // Generate recommendations
    map.recommendations = this.generateRecommendations();
    
    return map;
  }
}

async function main() {
  const connector = new SystemConnector();
  
  connector.discoverTools();
  connector.findConnections();
  connector.printSummary();
  
  const mapPath = path.join(__dirname, '..', 'system-map.json');
  const map = connector.saveMap(mapPath);
  
  // Generate markdown report
  const reportPath = path.join(__dirname, '..', 'SYSTEM_MAP.md');
  generateMarkdownReport(map, reportPath);
  
  console.log('✅ System mapping complete!\n');
}

function generateMarkdownReport(map, outputPath) {
  let md = '# 🗺️ System Map - All Tools and Connections\n\n';
  md += `Generated: ${new Date(map.timestamp).toLocaleString()}\n\n`;
  
  md += '## Workspaces\n\n';
  for (const workspace of map.workspaces) {
    md += `- ${workspace}\n`;
  }
  
  md += '\n## Tools by Category\n\n';
  for (const [category, system] of Object.entries(map.systems)) {
    md += `### ${category.toUpperCase()} (${system.count} tools)\n\n`;
    for (const tool of system.tools) {
      md += `- **${tool.name}**\n`;
      md += `  - Workspace: ${tool.workspace}\n`;
      md += `  - Path: ${tool.relativePath}\n`;
      md += `  - Type: ${tool.type}\n\n`;
    }
  }
  
  md += '\n## Connections\n\n';
  md += `Total: ${map.connections.length}\n\n`;
  
  md += '\n## Recommendations\n\n';
  for (const rec of map.recommendations) {
    md += `### [${rec.priority.toUpperCase()}] ${rec.type}\n\n`;
    md += `${rec.message}\n\n`;
    md += `Tools: ${rec.tools.join(', ')}\n\n`;
  }
  
  fs.writeFileSync(outputPath, md);
  console.log(`✅ Markdown report saved to: ${outputPath}\n`);
}

main().catch(console.error);

