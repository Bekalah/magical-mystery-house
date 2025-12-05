#!/usr/bin/env node
/**
 * Map and Connect All Visual & Design Tools
 * 
 * Maps all visual/design/art tools, understands what they do,
 * connects them together, and debugs issues
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 Mapping and Connecting Visual & Design Tools...\n');

// Tool categories
const TOOL_CATEGORIES = {
  visual: {
    name: 'Visual Engines',
    packages: [],
    purpose: 'Rendering, visualization, effects'
  },
  design: {
    name: 'Design Systems',
    packages: [],
    purpose: 'Design tools, components, libraries'
  },
  art: {
    name: 'Art Generation',
    packages: [],
    purpose: 'Art creation, standards, rendering'
  },
  typography: {
    name: 'Typography',
    packages: [],
    purpose: 'Text, fonts, typography systems'
  },
  vector: {
    name: 'Vector Graphics',
    packages: [],
    purpose: 'Vector graphics, SVG, paths'
  },
  threeD: {
    name: '3D Graphics',
    packages: [],
    purpose: '3D rendering, WebGL, Three.js'
  },
  fractal: {
    name: 'Fractals',
    packages: [],
    purpose: 'Fractal generation, patterns'
  }
};

// Scan packages directory
const packagesDir = path.join(rootDir, 'packages');
const packages = fs.readdirSync(packagesDir).filter(item => {
  const itemPath = path.join(packagesDir, item);
  return fs.statSync(itemPath).isDirectory();
});

// Map tools
const toolMap = new Map();

for (const pkg of packages) {
  const packagePath = path.join(packagesDir, pkg);
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) continue;
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const name = packageJson.name || pkg;
    const description = packageJson.description || '';
    const keywords = packageJson.keywords || [];
    
    // Categorize
    const pkgLower = pkg.toLowerCase();
    const descLower = description.toLowerCase();
    const keywordsLower = keywords.join(' ').toLowerCase();
    const allText = `${pkgLower} ${descLower} ${keywordsLower}`;
    
    let category = null;
    let issues = [];
    let connections = [];
    
    // Visual engines
    if (allText.includes('visual') || allText.includes('render') || allText.includes('canvas')) {
      category = 'visual';
      TOOL_CATEGORIES.visual.packages.push(pkg);
    }
    
    // Design systems
    if (allText.includes('design') && !allText.includes('math')) {
      category = 'design';
      TOOL_CATEGORIES.design.packages.push(pkg);
    }
    
    // Art generation
    if (allText.includes('art') && !allText.includes('part')) {
      category = 'art';
      TOOL_CATEGORIES.art.packages.push(pkg);
    }
    
    // Typography
    if (allText.includes('typography') || allText.includes('font') || allText.includes('text')) {
      category = 'typography';
      TOOL_CATEGORIES.typography.packages.push(pkg);
    }
    
    // Vector
    if (allText.includes('vector') || allText.includes('svg') || allText.includes('path')) {
      category = 'vector';
      TOOL_CATEGORIES.vector.packages.push(pkg);
    }
    
    // 3D
    if (allText.includes('three') || allText.includes('3d') || allText.includes('webgl') || allText.includes('godot')) {
      category = 'threeD';
      TOOL_CATEGORIES.threeD.packages.push(pkg);
    }
    
    // Fractals
    if (allText.includes('fractal')) {
      category = 'fractal';
      TOOL_CATEGORIES.fractal.packages.push(pkg);
    }
    
    // Check for issues
    const srcDir = path.join(packagePath, 'src');
    const hasSrc = fs.existsSync(srcDir);
    const hasIndex = hasSrc && fs.existsSync(path.join(srcDir, 'index.ts'));
    const hasBuild = fs.existsSync(path.join(packagePath, 'dist')) || fs.existsSync(path.join(packagePath, 'build'));
    
    if (!hasSrc) {
      issues.push('Missing src directory');
    }
    if (hasSrc && !hasIndex) {
      issues.push('Missing src/index.ts');
    }
    if (!hasBuild && packageJson.scripts?.build) {
      issues.push('Not built (run build)');
    }
    
    // Check dependencies
    const deps = packageJson.dependencies || {};
    const visualDeps = Object.keys(deps).filter(d => 
      d.includes('visual') || d.includes('design') || d.includes('art')
    );
    connections = visualDeps;
    
    // Check integration config
    const integration = packageJson.cathedral?.integration?.connects_to || [];
    connections.push(...integration);
    
    toolMap.set(pkg, {
      name,
      package: pkg,
      description,
      category,
      keywords,
      issues,
      connections,
      hasSrc,
      hasIndex,
      hasBuild,
      packageJson
    });
    
  } catch (e) {
    console.error(`❌ Error reading ${pkg}:`, e.message);
  }
}

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  categories: TOOL_CATEGORIES,
  tools: Array.from(toolMap.values()),
  summary: {
    total: toolMap.size,
    byCategory: {},
    withIssues: [],
    connected: []
  }
};

// Count by category
for (const tool of toolMap.values()) {
  if (tool.category) {
    report.summary.byCategory[tool.category] = (report.summary.byCategory[tool.category] || 0) + 1;
  }
  if (tool.issues.length > 0) {
    report.summary.withIssues.push(tool.package);
  }
  if (tool.connections.length > 0) {
    report.summary.connected.push(tool.package);
  }
}

// Save report
const reportPath = path.join(rootDir, 'docs', 'VISUAL_TOOLS_MAP.json');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('📊 Tool Mapping Complete!\n');
console.log(`Total Tools: ${report.summary.total}`);
console.log('\nBy Category:');
for (const [cat, count] of Object.entries(report.summary.byCategory)) {
  console.log(`  ${cat}: ${count}`);
}
console.log(`\nTools with Issues: ${report.summary.withIssues.length}`);
console.log(`Connected Tools: ${report.summary.connected.length}`);

// Generate markdown report
let md = '# 🎨 Visual & Design Tools Map\n\n';
md += `**Generated:** ${new Date().toLocaleString()}\n\n`;
md += `**Total Tools:** ${report.summary.total}\n\n`;

md += '## 📊 Categories\n\n';
for (const [key, cat] of Object.entries(TOOL_CATEGORIES)) {
  if (cat.packages.length > 0) {
    md += `### ${cat.name}\n`;
    md += `**Purpose:** ${cat.purpose}\n\n`;
    md += `**Packages:**\n`;
    for (const pkg of cat.packages) {
      const tool = toolMap.get(pkg);
      md += `- **${pkg}** - ${tool?.description || 'No description'}\n`;
      if (tool?.issues.length > 0) {
        md += `  - ⚠️ Issues: ${tool.issues.join(', ')}\n`;
      }
      if (tool?.connections.length > 0) {
        md += `  - 🔗 Connects to: ${tool.connections.join(', ')}\n`;
      }
    }
    md += '\n';
  }
}

md += '## 🔧 Tools Needing Attention\n\n';
const toolsWithIssues = report.tools.filter(t => t.issues.length > 0);
if (toolsWithIssues.length > 0) {
  for (const tool of toolsWithIssues) {
    md += `### ${tool.package}\n`;
    md += `- Issues: ${tool.issues.join(', ')}\n`;
    md += `- Description: ${tool.description || 'None'}\n\n`;
  }
} else {
  md += '✅ All tools are in good shape!\n\n';
}

md += '## 🔗 Connection Map\n\n';
md += '```\n';
for (const tool of report.tools) {
  if (tool.connections.length > 0) {
    md += `${tool.package}\n`;
    for (const conn of tool.connections) {
      md += `  └─> ${conn}\n`;
    }
  }
}
md += '```\n';

const mdPath = path.join(rootDir, 'docs', 'VISUAL_TOOLS_MAP.md');
fs.writeFileSync(mdPath, md);

console.log(`\n✅ Reports saved:`);
console.log(`   - ${reportPath}`);
console.log(`   - ${mdPath}`);

