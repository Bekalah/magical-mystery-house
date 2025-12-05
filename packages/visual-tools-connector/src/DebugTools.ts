/**
 * 🐛 Debug Tools
 * 
 * Debugging utilities for visual and design tools
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { VISUAL_TOOLS, VisualTool } from './VisualToolsMap';

/**
 * ⚗️ DebugIssue - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface DebugIssue {
  tool: string;
  issue: string;
  severity: 'error' | 'warning' | 'info';
  fix?: string;
}

/**
 * Debug all visual tools
 */
/**
 * ⚗️ DebugVisualTools - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function debugVisualTools(rootDir: string): DebugIssue[] {
  const issues: DebugIssue[] = [];
  
  for (const [key, tool] of Object.entries(VISUAL_TOOLS)) {
    const packagePath = path.join(rootDir, 'packages', key);
    
    // Check if package exists
    if (!fs.existsSync(packagePath)) {
      issues.push({
        tool: tool.package,
        issue: 'Package directory does not exist',
        severity: 'error',
        fix: `Create package directory: packages/${key}`
      });
      continue;
    }
    
    // Check package.json
    const packageJsonPath = path.join(packagePath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      issues.push({
        tool: tool.package,
        issue: 'Missing package.json',
        severity: 'error',
        fix: `Create package.json for ${key}`
      });
      continue;
    }
    
    // Check src directory
    const srcPath = path.join(packagePath, 'src');
    if (!fs.existsSync(srcPath)) {
      issues.push({
        tool: tool.package,
        issue: 'Missing src directory',
        severity: 'error',
        fix: `Create src directory: packages/${key}/src`
      });
    }
    
    // Check index.ts
    const indexPath = path.join(srcPath, 'index.ts');
    if (fs.existsSync(srcPath) && !fs.existsSync(indexPath)) {
      issues.push({
        tool: tool.package,
        issue: 'Missing src/index.ts',
        severity: 'warning',
        fix: `Create src/index.ts for ${key}`
      });
    }
    
    // Check dist directory (build status)
    const distPath = path.join(packagePath, 'dist');
    if (!fs.existsSync(distPath)) {
      issues.push({
        tool: tool.package,
        issue: 'Not built (missing dist directory)',
        severity: 'warning',
        fix: `Run: cd packages/${key} && pnpm run build`
      });
    }
    
    // Check dependencies
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const deps = packageJson.dependencies || {};
      
      // Check if dependencies exist
      for (const [depName, depVersion] of Object.entries(deps)) {
        if (depVersion.toString().startsWith('workspace:')) {
          const workspaceDep = depName.replace('@cathedral/', '');
          const depPath = path.join(rootDir, 'packages', workspaceDep);
          if (!fs.existsSync(depPath)) {
            issues.push({
              tool: tool.package,
              issue: `Missing dependency: ${depName}`,
              severity: 'error',
              fix: `Create or install dependency: ${depName}`
            });
          }
        }
      }
    } catch (e) {
      issues.push({
        tool: tool.package,
        issue: `Error reading package.json: ${e}`,
        severity: 'error'
      });
    }
  }
  
  return issues;
}

/**
 * Generate debug report
 */
/**
 * ⚗️ GenerateDebugReport - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function generateDebugReport(rootDir: string): string {
  const issues = debugVisualTools(rootDir);
  
  let report = '# 🐛 Visual Tools Debug Report\n\n';
  report += `**Generated:** ${new Date().toLocaleString()}\n\n`;
  report += `**Total Issues:** ${issues.length}\n\n`;
  
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const info = issues.filter(i => i.severity === 'info');
  
  report += `- **Errors:** ${errors.length}\n`;
  report += `- **Warnings:** ${warnings.length}\n`;
  report += `- **Info:** ${info.length}\n\n`;
  
  if (errors.length > 0) {
    report += '## ❌ Errors\n\n';
    for (const issue of errors) {
      report += `### ${issue.tool}\n`;
      report += `- **Issue:** ${issue.issue}\n`;
      if (issue.fix) {
        report += `- **Fix:** ${issue.fix}\n`;
      }
      report += '\n';
    }
  }
  
  if (warnings.length > 0) {
    report += '## ⚠️ Warnings\n\n';
    for (const issue of warnings) {
      report += `### ${issue.tool}\n`;
      report += `- **Issue:** ${issue.issue}\n`;
      if (issue.fix) {
        report += `- **Fix:** ${issue.fix}\n`;
      }
      report += '\n';
    }
  }
  
  if (issues.length === 0) {
    report += '✅ All tools are working correctly!\n';
  }
  
  return report;
}

