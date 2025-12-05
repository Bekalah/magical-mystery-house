#!/usr/bin/env node
/**
 * Connect All Tech with Design Rules
 * 
 * Maps all packages, apps, and tools showing:
 * - How they connect together
 * - Which design rules are applied
 * - Quality standards enforced
 * - Business strategies implemented
 * 
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const OUTPUT_FILE = path.join(ROOT, 'COMPLETE_TECH_CONNECTION_REPORT.json');
const OUTPUT_MD = path.join(ROOT, 'COMPLETE_TECH_CONNECTION_REPORT.md');

class TechConnector {
  constructor() {
    this.packages = [];
    this.apps = [];
    this.tools = [];
    this.connections = [];
    this.designRules = {
      sacredGeometry: [],
      traumaSafe: [],
      museumGrade: [],
      accessibility: [],
      professional: []
    };
  }

  scanPackages() {
    const packagesDir = path.join(ROOT, 'packages');
    if (!fs.existsSync(packagesDir)) return;

    const dirs = fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const pkgName of dirs) {
      const pkgPath = path.join(packagesDir, pkgName);
      const pkgJsonPath = path.join(pkgPath, 'package.json');
      
      if (!fs.existsSync(pkgJsonPath)) continue;

      try {
        const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
        const readmePath = path.join(pkgPath, 'README.md');
        const hasReadme = fs.existsSync(readmePath);

        const pkg = {
          name: pkgName,
          path: pkgPath,
          description: pkgJson.description || '',
          version: pkgJson.version || '1.0.0',
          license: pkgJson.license || 'CC0-1.0',
          dependencies: Object.keys(pkgJson.dependencies || {}),
          devDependencies: Object.keys(pkgJson.devDependencies || {}),
          hasReadme,
          alchemical: pkgJson.alchemical || {},
          cathedral: pkgJson.cathedral || {},
          designRules: this.extractDesignRules(pkgJson, pkgPath),
          connections: this.findConnections(pkgJson, pkgName),
          category: this.categorizePackage(pkgName, pkgJson)
        };

        this.packages.push(pkg);
        this.recordDesignRules(pkg);
      } catch (e) {
        console.warn(`⚠️  Could not parse ${pkgName}: ${e.message}`);
      }
    }
  }

  scanApps() {
    const appsDir = path.join(ROOT, 'apps');
    if (!fs.existsSync(appsDir)) return;

    const dirs = fs.readdirSync(appsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const appName of dirs) {
      const appPath = path.join(appsDir, appName);
      const pkgJsonPath = path.join(appPath, 'package.json');
      
      if (!fs.existsSync(pkgJsonPath)) continue;

      try {
        const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));

        const app = {
          name: appName,
          path: appPath,
          description: pkgJson.description || '',
          version: pkgJson.version || '1.0.0',
          dependencies: Object.keys(pkgJson.dependencies || {}),
          devDependencies: Object.keys(pkgJson.devDependencies || {}),
          designRules: this.extractDesignRules(pkgJson, appPath),
          connections: this.findConnections(pkgJson, appName),
          deployment: this.findDeployment(appPath),
          category: this.categorizeApp(appName, pkgJson)
        };

        this.apps.push(app);
        this.recordDesignRules(app);
      } catch (e) {
        console.warn(`⚠️  Could not parse app ${appName}: ${e.message}`);
      }
    }
  }

  scanTools() {
    const toolsDir = path.join(ROOT, 'tools');
    if (!fs.existsSync(toolsDir)) return;

    const files = fs.readdirSync(toolsDir)
      .filter(f => f.endsWith('.mjs') || f.endsWith('.js'))
      .map(f => ({ name: f, path: path.join(toolsDir, f) }));

    for (const tool of files) {
      try {
        const content = fs.readFileSync(tool.path, 'utf-8');
        const toolInfo = {
          name: tool.name,
          path: tool.path,
          size: fs.statSync(tool.path).size,
          designRules: this.extractDesignRulesFromCode(content),
          connections: this.findConnectionsFromCode(content),
          category: this.categorizeTool(tool.name, content)
        };

        this.tools.push(toolInfo);
        this.recordDesignRules(toolInfo);
      } catch (e) {
        console.warn(`⚠️  Could not parse tool ${tool.name}: ${e.message}`);
      }
    }
  }

  extractDesignRules(pkgJson, itemPath) {
    const rules = {
      sacredGeometry: false,
      traumaSafe: false,
      museumGrade: false,
      accessibility: false,
      professional: false
    };

    // Check package.json
    const cathedral = pkgJson.cathedral || {};
    rules.sacredGeometry = !!(cathedral.sacred_mathematics || 
      pkgJson.name?.includes('sacred') || 
      pkgJson.name?.includes('geometry') ||
      pkgJson.name?.includes('codex'));
    rules.traumaSafe = !!(cathedral.trauma_safety || 
      pkgJson.name?.includes('trauma'));
    rules.museumGrade = !!(pkgJson.name?.includes('museum') || 
      pkgJson.name?.includes('professional') ||
      pkgJson.name?.includes('art-standards'));
    rules.accessibility = !!(pkgJson.name?.includes('accessibility') ||
      pkgJson.name?.includes('universal'));
    rules.professional = !!(pkgJson.name?.includes('professional') ||
      pkgJson.quality || pkgJson.standards);

    // Check README
    const readmePath = path.join(itemPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      const readme = fs.readFileSync(readmePath, 'utf-8');
      rules.sacredGeometry = rules.sacredGeometry || 
        /golden.*ratio|fibonacci|144:99|sacred.*geometry/i.test(readme);
      rules.traumaSafe = rules.traumaSafe || 
        /trauma.*safe|esc.*exit|no.*autoplay/i.test(readme);
      rules.museumGrade = rules.museumGrade || 
        /museum.*grade|professional|high.*end/i.test(readme);
      rules.accessibility = rules.accessibility || 
        /wcag|accessibility|screen.*reader/i.test(readme);
    }

    return rules;
  }

  extractDesignRulesFromCode(content) {
    return {
      sacredGeometry: /golden.*ratio|fibonacci|144:99|sacred.*geometry/i.test(content),
      traumaSafe: /trauma.*safe|esc.*exit|no.*autoplay/i.test(content),
      museumGrade: /museum.*grade|professional|high.*end/i.test(content),
      accessibility: /wcag|accessibility|screen.*reader/i.test(content),
      professional: /professional|quality.*control|standard/i.test(content)
    };
  }

  findConnections(pkgJson, name) {
    const connections = [];
    
    // Dependencies are connections
    const deps = [
      ...Object.keys(pkgJson.dependencies || {}),
      ...Object.keys(pkgJson.devDependencies || {})
    ];

    for (const dep of deps) {
      // Check if it's a local package
      if (this.packages.find(p => p.name === dep)) {
        connections.push({
          type: 'package',
          target: dep,
          relationship: 'depends-on'
        });
      }
    }

    // Category-based connections
    if (name.includes('codex')) {
      connections.push({ type: 'system', target: 'codex-144-99', relationship: 'part-of' });
    }
    if (name.includes('sacred') || name.includes('geometry')) {
      connections.push({ type: 'system', target: 'sacred-mathematics', relationship: 'part-of' });
    }
    if (name.includes('art')) {
      connections.push({ type: 'system', target: 'art-systems', relationship: 'part-of' });
    }
    if (name.includes('music') || name.includes('sound')) {
      connections.push({ type: 'system', target: 'sound-systems', relationship: 'part-of' });
    }

    return connections;
  }

  findConnectionsFromCode(content) {
    const connections = [];
    
    // Find imports/requires
    const imports = [
      ...content.matchAll(/import.*from ['"]([^'"]+)['"]/g),
      ...content.matchAll(/require\(['"]([^'"]+)['"]\)/g)
    ];

    for (const match of imports) {
      const importPath = match[1];
      if (importPath.startsWith('@') || importPath.startsWith('./') || importPath.startsWith('../')) {
        connections.push({
          type: 'code',
          target: importPath,
          relationship: 'imports'
        });
      }
    }

    return connections;
  }

  findDeployment(appPath) {
    const deployments = {};
    
    if (fs.existsSync(path.join(appPath, 'vercel.json'))) {
      deployments.vercel = true;
    }
    if (fs.existsSync(path.join(appPath, 'netlify.toml'))) {
      deployments.netlify = true;
    }
    if (fs.existsSync(path.join(appPath, 'wrangler.toml'))) {
      deployments.cloudflare = true;
    }
    const workflowPath = path.join(ROOT, '.github', 'workflows');
    if (fs.existsSync(workflowPath)) {
      const workflows = fs.readdirSync(workflowPath);
      if (workflows.some(f => f.includes('deploy') || f.includes('pages'))) {
        deployments.githubPages = true;
      }
    }

    return deployments;
  }

  categorizePackage(name, pkgJson) {
    if (name.includes('codex')) return 'codex-system';
    if (name.includes('sacred') || name.includes('geometry') || name.includes('mathematics')) return 'mathematics';
    if (name.includes('art')) return 'art-system';
    if (name.includes('music') || name.includes('sound')) return 'sound-system';
    if (name.includes('game')) return 'game-system';
    if (name.includes('professional')) return 'professional-suite';
    if (name.includes('ui') || name.includes('interface')) return 'ui-system';
    if (name.includes('grimoire') || name.includes('liber')) return 'grimoire-system';
    if (name.includes('fusion')) return 'fusion-system';
    if (name.includes('circuitum')) return 'circuitum-system';
    return 'support-system';
  }

  categorizeApp(name, pkgJson) {
    if (name.includes('web')) return 'web-app';
    if (name.includes('studio')) return 'studio-app';
    if (name.includes('tarot')) return 'tarot-app';
    if (name.includes('cathedral')) return 'cathedral-app';
    return 'application';
  }

  categorizeTool(name, content) {
    if (name.includes('quality') || name.includes('validate')) return 'quality-tool';
    if (name.includes('connect') || name.includes('integrate')) return 'connection-tool';
    if (name.includes('deploy')) return 'deployment-tool';
    if (name.includes('package')) return 'package-tool';
    if (name.includes('fix') || name.includes('repair')) return 'fix-tool';
    return 'utility-tool';
  }

  recordDesignRules(item) {
    const rules = item.designRules || {};
    if (rules.sacredGeometry) this.designRules.sacredGeometry.push(item.name);
    if (rules.traumaSafe) this.designRules.traumaSafe.push(item.name);
    if (rules.museumGrade) this.designRules.museumGrade.push(item.name);
    if (rules.accessibility) this.designRules.accessibility.push(item.name);
    if (rules.professional) this.designRules.professional.push(item.name);
  }

  generateReport() {
    const report = {
      generated: new Date().toISOString(),
      statistics: {
        totalPackages: this.packages.length,
        totalApps: this.apps.length,
        totalTools: this.tools.length,
        totalItems: this.packages.length + this.apps.length + this.tools.length
      },
      designRules: {
        sacredGeometry: {
          count: this.designRules.sacredGeometry.length,
          items: this.designRules.sacredGeometry
        },
        traumaSafe: {
          count: this.designRules.traumaSafe.length,
          items: this.designRules.traumaSafe
        },
        museumGrade: {
          count: this.designRules.museumGrade.length,
          items: this.designRules.museumGrade
        },
        accessibility: {
          count: this.designRules.accessibility.length,
          items: this.designRules.accessibility
        },
        professional: {
          count: this.designRules.professional.length,
          items: this.designRules.professional
        }
      },
      packages: this.packages,
      apps: this.apps,
      tools: this.tools,
      connections: this.buildConnectionGraph()
    };

    return report;
  }

  buildConnectionGraph() {
    const graph = {
      byCategory: {},
      bySystem: {},
      byDesignRule: {}
    };

    // Group by category
    for (const pkg of this.packages) {
      if (!graph.byCategory[pkg.category]) {
        graph.byCategory[pkg.category] = [];
      }
      graph.byCategory[pkg.category].push(pkg.name);
    }

    return graph;
  }

  generateMarkdown(report) {
    let md = `# Complete Tech Connection Report

**Generated**: ${new Date(report.generated).toLocaleString()}

## 📊 Statistics

- **Total Packages**: ${report.statistics.totalPackages}
- **Total Apps**: ${report.statistics.totalApps}
- **Total Tools**: ${report.statistics.totalTools}
- **Total Items**: ${report.statistics.totalItems}

## 🎨 Design Rules Applied

### Sacred Geometry
- **Count**: ${report.designRules.sacredGeometry.count}
- **Items**: ${report.designRules.sacredGeometry.items.slice(0, 20).join(', ')}${report.designRules.sacredGeometry.count > 20 ? ` (and ${report.designRules.sacredGeometry.count - 20} more)` : ''}

### Trauma-Safe Design
- **Count**: ${report.designRules.traumaSafe.count}
- **Items**: ${report.designRules.traumaSafe.items.slice(0, 20).join(', ')}${report.designRules.traumaSafe.count > 20 ? ` (and ${report.designRules.traumaSafe.count - 20} more)` : ''}

### Museum-Grade Quality
- **Count**: ${report.designRules.museumGrade.count}
- **Items**: ${report.designRules.museumGrade.items.slice(0, 20).join(', ')}${report.designRules.museumGrade.count > 20 ? ` (and ${report.designRules.museumGrade.count - 20} more)` : ''}

### Accessibility
- **Count**: ${report.designRules.accessibility.count}
- **Items**: ${report.designRules.accessibility.items.join(', ')}

### Professional Standards
- **Count**: ${report.designRules.professional.count}
- **Items**: ${report.designRules.professional.items.slice(0, 20).join(', ')}${report.designRules.professional.count > 20 ? ` (and ${report.designRules.professional.count - 20} more)` : ''}

## 📦 Packages by Category

`;

    // Group packages by category
    const byCategory = {};
    for (const pkg of report.packages) {
      if (!byCategory[pkg.category]) {
        byCategory[pkg.category] = [];
      }
      byCategory[pkg.category].push(pkg);
    }

    for (const [category, pkgs] of Object.entries(byCategory)) {
      md += `### ${category.replace(/-/g, ' ').toUpperCase()}\n\n`;
      for (const pkg of pkgs) {
        const rules = Object.entries(pkg.designRules)
          .filter(([_, v]) => v)
          .map(([k]) => k);
        md += `- **${pkg.name}**: ${pkg.description || 'No description'}\n`;
        if (rules.length > 0) {
          md += `  - Design Rules: ${rules.join(', ')}\n`;
        }
        if (pkg.connections.length > 0) {
          md += `  - Connections: ${pkg.connections.map(c => c.target).join(', ')}\n`;
        }
        md += '\n';
      }
    }

    md += `## 🚀 Apps by Category

`;

    // Group apps by category
    const byAppCategory = {};
    for (const app of report.apps) {
      if (!byAppCategory[app.category]) {
        byAppCategory[app.category] = [];
      }
      byAppCategory[app.category].push(app);
    }

    for (const [category, apps] of Object.entries(byAppCategory)) {
      md += `### ${category.replace(/-/g, ' ').toUpperCase()}\n\n`;
      for (const app of apps) {
        const rules = Object.entries(app.designRules)
          .filter(([_, v]) => v)
          .map(([k]) => k);
        md += `- **${app.name}**: ${app.description || 'No description'}\n`;
        if (rules.length > 0) {
          md += `  - Design Rules: ${rules.join(', ')}\n`;
        }
        const deployments = Object.keys(app.deployment || {});
        if (deployments.length > 0) {
          md += `  - Deployments: ${deployments.join(', ')}\n`;
        }
        md += '\n';
      }
    }

    md += `## 🛠️ Tools by Category

`;

    // Group tools by category
    const byToolCategory = {};
    for (const tool of report.tools) {
      if (!byToolCategory[tool.category]) {
        byToolCategory[tool.category] = [];
      }
      byToolCategory[tool.category].push(tool);
    }

    for (const [category, tools] of Object.entries(byToolCategory)) {
      md += `### ${category.replace(/-/g, ' ').toUpperCase()}\n\n`;
      for (const tool of tools.slice(0, 20)) {
        md += `- **${tool.name}**\n`;
      }
      if (tools.length > 20) {
        md += `\n... and ${tools.length - 20} more ${category} tools\n`;
      }
      md += '\n';
    }

    return md;
  }
}

// Main execution
async function main() {
  console.log('🔗 Connecting All Tech with Design Rules...\n');
  console.log('═'.repeat(80) + '\n');

  const connector = new TechConnector();

  console.log('📦 Scanning packages...');
  connector.scanPackages();
  console.log(`   Found ${connector.packages.length} packages\n`);

  console.log('🚀 Scanning apps...');
  connector.scanApps();
  console.log(`   Found ${connector.apps.length} apps\n`);

  console.log('🛠️  Scanning tools...');
  connector.scanTools();
  console.log(`   Found ${connector.tools.length} tools\n`);

  console.log('📊 Generating report...');
  const report = connector.generateReport();

  console.log('💾 Saving reports...');
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));
  const md = connector.generateMarkdown(report);
  fs.writeFileSync(OUTPUT_MD, md);

  console.log('\n✅ Complete!\n');
  console.log(`📄 JSON Report: ${OUTPUT_FILE}`);
  console.log(`📄 Markdown Report: ${OUTPUT_MD}\n`);
  console.log('═'.repeat(80) + '\n');
  console.log('📊 Summary:\n');
  console.log(`   Packages: ${report.statistics.totalPackages}`);
  console.log(`   Apps: ${report.statistics.totalApps}`);
  console.log(`   Tools: ${report.statistics.totalTools}`);
  console.log(`   Sacred Geometry: ${report.designRules.sacredGeometry.count} items`);
  console.log(`   Trauma-Safe: ${report.designRules.traumaSafe.count} items`);
  console.log(`   Museum-Grade: ${report.designRules.museumGrade.count} items`);
  console.log(`   Accessibility: ${report.designRules.accessibility.count} items`);
  console.log(`   Professional: ${report.designRules.professional.count} items\n`);
}

main().catch(e => {
  console.error('❌ Error:', e);
  process.exit(1);
});

