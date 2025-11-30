#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Health Map Generator
 * Generates comprehensive health maps in JSON, Markdown, and HTML formats
 * Compatible with MacBook Air 2017 era and older Windows systems
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

// Import the health map engine (will be available after build)
let HealthMapEngine;
try {
  const healthMapPath = path.join(BASE_DIR, 'packages', 'health-map-core', 'dist', 'index.js');
  if (fs.existsSync(healthMapPath)) {
    const healthMapModule = await import(`file://${healthMapPath}`);
    HealthMapEngine = healthMapModule.HealthMapEngine || healthMapModule.default;
  }
} catch (error) {
  console.error('Error loading HealthMapEngine:', error.message);
  process.exit(1);
}

/**
 * Generate JSON health map
 */
function generateJSON(healthMap) {
  return JSON.stringify(healthMap, null, 2);
}

/**
 * Generate Markdown health map
 */
function generateMarkdown(healthMap) {
  let md = `# Cathedral Ecosystem Health Map\n\n`;
  md += `Generated: ${new Date(healthMap.timestamp).toISOString()}\n\n`;
  md += `## Overall Health: ${healthMap.overallHealth.toUpperCase()}\n\n`;
  
  md += `### Summary\n\n`;
  md += `- **Packages**: ${healthMap.packages.length}\n`;
  md += `- **Engines**: ${healthMap.engines.length}\n`;
  md += `- **Tools**: ${healthMap.tools.length}\n`;
  md += `- **Scripts**: ${healthMap.scripts.length}\n`;
  md += `- **Platforms**: ${healthMap.platforms.length}\n`;
  md += `- **Deployments**: ${healthMap.deployments.length}\n`;
  md += `- **Security Checks**: ${healthMap.security.length}\n\n`;
  
  md += `### Packages\n\n`;
  for (const pkg of healthMap.packages) {
    const statusIcon = pkg.health.status === 'operational' ? '✅' : 
                      pkg.health.status === 'degraded' ? '⚠️' : '❌';
    md += `${statusIcon} **${pkg.name}** (${pkg.version || 'no version'})\n`;
    md += `  - Path: ${pkg.path}\n`;
    md += `  - Status: ${pkg.health.status}\n`;
    if (pkg.health.errors.length > 0) {
      md += `  - Errors: ${pkg.health.errors.join(', ')}\n`;
    }
    if (pkg.health.warnings.length > 0) {
      md += `  - Warnings: ${pkg.health.warnings.join(', ')}\n`;
    }
    md += `\n`;
  }
  
  md += `### Engines\n\n`;
  for (const engine of healthMap.engines) {
    const statusIcon = engine.health.status === 'operational' ? '✅' : 
                      engine.health.status === 'degraded' ? '⚠️' : '❌';
    md += `${statusIcon} **${engine.name}** (${engine.package})\n`;
    md += `  - Path: ${engine.path}\n`;
    md += `  - Exports: ${engine.exports.length}\n`;
    md += `\n`;
  }
  
  md += `### Tools\n\n`;
  for (const tool of healthMap.tools) {
    const statusIcon = tool.health.status === 'operational' ? '✅' : 
                      tool.health.status === 'degraded' ? '⚠️' : '❌';
    md += `${statusIcon} **${tool.name}** (${tool.type})\n`;
    md += `  - Executable: ${tool.executable ? 'Yes' : 'No'}\n`;
    md += `\n`;
  }
  
  md += `### Platforms & Deployments\n\n`;
  for (const platform of healthMap.platforms) {
    md += `- **${platform.name}** (${platform.type}): ${platform.status}\n`;
    for (const deployment of platform.deployments) {
      md += `  - ${deployment.name}: ${deployment.status}\n`;
    }
  }
  
  md += `### Security\n\n`;
  for (const sec of healthMap.security) {
    const hasVulns = sec.vulnerabilities.critical + sec.vulnerabilities.high > 0;
    const statusIcon = hasVulns ? '⚠️' : '✅';
    md += `${statusIcon} **${sec.package}**\n`;
    md += `  - .npmrc: ${sec.securityConfig.npmrcExists ? 'Yes' : 'No'}\n`;
    if (hasVulns) {
      md += `  - Vulnerabilities: Critical: ${sec.vulnerabilities.critical}, High: ${sec.vulnerabilities.high}\n`;
    }
    md += `\n`;
  }
  
  return md;
}

/**
 * Generate HTML health map
 */
function generateHTML(healthMap) {
  const statusColors = {
    operational: '#28a745',
    degraded: '#ffc107',
    error: '#dc3545',
    unknown: '#6c757d'
  };
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cathedral Ecosystem Health Map</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #333; }
    .status { display: inline-block; padding: 4px 8px; border-radius: 4px; color: white; font-weight: bold; }
    .operational { background: ${statusColors.operational}; }
    .degraded { background: ${statusColors.degraded}; }
    .error { background: ${statusColors.error}; }
    .unknown { background: ${statusColors.unknown}; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
    .summary-card { background: #f8f9fa; padding: 15px; border-radius: 4px; }
    .summary-card h3 { margin: 0 0 10px 0; }
    .summary-card .number { font-size: 2em; font-weight: bold; color: #007bff; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: bold; }
    .error-list { color: #dc3545; }
    .warning-list { color: #ffc107; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Cathedral Ecosystem Health Map</h1>
    <p>Generated: ${new Date(healthMap.timestamp).toISOString()}</p>
    <p>Overall Health: <span class="status ${healthMap.overallHealth}">${healthMap.overallHealth.toUpperCase()}</span></p>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Packages</h3>
        <div class="number">${healthMap.packages.length}</div>
      </div>
      <div class="summary-card">
        <h3>Engines</h3>
        <div class="number">${healthMap.engines.length}</div>
      </div>
      <div class="summary-card">
        <h3>Tools</h3>
        <div class="number">${healthMap.tools.length}</div>
      </div>
      <div class="summary-card">
        <h3>Scripts</h3>
        <div class="number">${healthMap.scripts.length}</div>
      </div>
    </div>
    
    <h2>Packages</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Version</th>
          <th>Status</th>
          <th>Errors</th>
          <th>Warnings</th>
        </tr>
      </thead>
      <tbody>
`;
  
  for (const pkg of healthMap.packages) {
    html += `        <tr>
          <td>${pkg.name}</td>
          <td>${pkg.version || 'N/A'}</td>
          <td><span class="status ${pkg.health.status}">${pkg.health.status}</span></td>
          <td class="error-list">${pkg.health.errors.length}</td>
          <td class="warning-list">${pkg.health.warnings.length}</td>
        </tr>
`;
  }
  
  html += `      </tbody>
    </table>
  </div>
</body>
</html>`;
  
  return html;
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Generating Health Map...\n');
  
  try {
    const engine = new HealthMapEngine(BASE_DIR);
    const healthMap = await engine.generateHealthMap();
    
    // Generate outputs
    const outputDir = path.join(BASE_DIR, 'health-reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // JSON
    const jsonPath = path.join(outputDir, 'health-map.json');
    fs.writeFileSync(jsonPath, generateJSON(healthMap), 'utf-8');
    console.log(`✅ JSON: ${jsonPath}`);
    
    // Markdown
    const mdPath = path.join(outputDir, 'health-map.md');
    fs.writeFileSync(mdPath, generateMarkdown(healthMap), 'utf-8');
    console.log(`✅ Markdown: ${mdPath}`);
    
    // HTML
    const htmlPath = path.join(outputDir, 'health-map.html');
    fs.writeFileSync(htmlPath, generateHTML(healthMap), 'utf-8');
    console.log(`✅ HTML: ${htmlPath}`);
    
    console.log(`\n📊 Health Map Summary:`);
    console.log(`   Overall: ${healthMap.overallHealth}`);
    console.log(`   Packages: ${healthMap.packages.length}`);
    console.log(`   Engines: ${healthMap.engines.length}`);
    console.log(`   Tools: ${healthMap.tools.length}`);
    console.log(`   Scripts: ${healthMap.scripts.length}`);
    
  } catch (error) {
    console.error('❌ Error generating health map:', error.message);
    process.exit(1);
  }
}

main();

