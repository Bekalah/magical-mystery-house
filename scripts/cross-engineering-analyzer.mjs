#!/usr/bin/env node
/**
 * Cross-Engineering Analyzer
 * 
 * Identifies cross-engineering opportunities across all repos and systems,
 * finds reusable components, and documents integration points.
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPORTS_DIR = path.join(rootDir, 'docs/reports/3-hour');

/**
 * Find reusable components across packages
 */
function findReusableComponents() {
  const components = [];
  const packagesDir = path.join(rootDir, 'packages');
  
  if (!fs.existsSync(packagesDir)) return components;
  
  const packages = fs.readdirSync(packagesDir).filter(item => {
    const itemPath = path.join(packagesDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  // Find common patterns
  const patterns = {
    engines: [],
    utilities: [],
    types: [],
    configs: []
  };
  
  packages.forEach(pkg => {
    const pkgPath = path.join(packagesDir, pkg);
    const srcPath = path.join(pkgPath, 'src');
    
    if (fs.existsSync(srcPath)) {
      const files = fs.readdirSync(srcPath, { recursive: true });
      files.forEach((file: string) => {
        if (file.includes('Engine') || file.includes('engine')) {
          patterns.engines.push({ package: pkg, file });
        }
        if (file.includes('util') || file.includes('helper')) {
          patterns.utilities.push({ package: pkg, file });
        }
        if (file.includes('types') || file.includes('Type')) {
          patterns.types.push({ package: pkg, file });
        }
      });
    }
  });
  
  return patterns;
}

/**
 * Find integration points
 */
function findIntegrationPoints() {
  const integrations = [];
  
  // Check TECH_INTEGRATION.json files
  const packagesDir = path.join(rootDir, 'packages');
  if (fs.existsSync(packagesDir)) {
    const packages = fs.readdirSync(packagesDir);
    packages.forEach(pkg => {
      const techIntPath = path.join(packagesDir, pkg, 'TECH_INTEGRATION.json');
      if (fs.existsSync(techIntPath)) {
        try {
          const tech = JSON.parse(fs.readFileSync(techIntPath, 'utf-8'));
          if (tech.integrations) {
            integrations.push({
              package: pkg,
              integrations: tech.integrations
            });
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    });
  }
  
  return integrations;
}

/**
 * Generate cross-engineering report
 */
function generateCrossEngineeringReport(components: any, integrations: any[]) {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }
  
  const report = `# Cross-Engineering Report

**Generated**: ${new Date().toISOString()}

---

## Reusable Components

### Engines (${components.engines.length})
${components.engines.map((c: any) => `- **${c.package}**: ${c.file}`).join('\n')}

### Utilities (${components.utilities.length})
${components.utilities.map((c: any) => `- **${c.package}**: ${c.file}`).join('\n')}

### Types (${components.types.length})
${components.types.map((c: any) => `- **${c.package}**: ${c.file}`).join('\n')}

---

## Integration Points

${integrations.map(i => `
### ${i.package}
${JSON.stringify(i.integrations, null, 2)}
`).join('\n')}

---

## Cross-Engineering Opportunities

1. **Shared Engine Pattern**: Multiple engines can share common base classes
2. **Utility Library**: Common utilities can be extracted to shared package
3. **Type Definitions**: Shared types can be in common package
4. **Integration Layer**: Unified integration system for all packages

---

**This report identifies cross-engineering opportunities across all systems.**
`;

  fs.writeFileSync(path.join(REPORTS_DIR, 'cross-engineering-report.md'), report, 'utf-8');
  console.log('✅ Cross-engineering report generated');
}

// Main execution
const components = findReusableComponents();
const integrations = findIntegrationPoints();

generateCrossEngineeringReport(components, integrations);

console.log('\n🔧 Cross-Engineering Analysis Complete');
console.log(`   Engines: ${components.engines.length}`);
console.log(`   Utilities: ${components.utilities.length}`);
console.log(`   Types: ${components.types.length}`);
console.log(`   Integrations: ${integrations.length}`);
console.log(`   Report: docs/reports/3-hour/cross-engineering-report.md\n`);

