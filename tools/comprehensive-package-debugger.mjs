#!/usr/bin/env node
/**
 * Comprehensive Package Debugger
 * 
 * Debugs all packages comprehensively:
 * - Package.json issues
 * - TypeScript issues
 * - Build issues
 * - Dependency issues
 * - Documentation issues
 * - Code quality issues
 * - Codex integration issues
 * - Alchemical label issues
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class ComprehensivePackageDebugger {
  constructor() {
    this.packages = [];
    this.issues = [];
    this.fixed = [];
    this.errors = [];
  }

  async debugAll() {
    console.log('⚗️  COMPREHENSIVE PACKAGE DEBUGGING - Cathedral Ecosystem\n');
    console.log('*Solve et Coagula - Dissolution and Coagulation*\n');
    console.log('═'.repeat(80) + '\n');

    // Load packages
    await this.loadPackages();

    // Debug each package
    for (const pkg of this.packages) {
      await this.debugPackage(pkg);
    }

    // Generate report
    this.generateReport();

    console.log('═'.repeat(80));
    console.log('\n✅ PACKAGE DEBUGGING COMPLETE\n');
    console.log(`📦 Packages debugged: ${this.packages.length}`);
    console.log(`⚠️  Issues found: ${this.issues.length}`);
    console.log(`✅ Issues fixed: ${this.fixed.length}`);
    if (this.errors.length > 0) {
      console.log(`❌ Errors: ${this.errors.length}\n`);
    } else {
      console.log('');
    }
  }

  async loadPackages() {
    // Try to load from current directory first
    let reportPath = path.join(BASE_DIR, 'DISCOVERY_REPORT.json');
    
    // If not found, search across all workspaces
    if (!fs.existsSync(reportPath)) {
      const workspaces = this.findAllWorkspaces();
      for (const workspace of workspaces) {
        const candidatePath = path.join(workspace, 'DISCOVERY_REPORT.json');
        if (fs.existsSync(candidatePath)) {
          reportPath = candidatePath;
          break;
        }
      }
    }

    if (!fs.existsSync(reportPath)) {
      throw new Error('DISCOVERY_REPORT.json not found. Run comprehensive-discovery first.');
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    this.packages = report.discovered?.packages || [];
    
    // Also include packages from all workspaces
    if (report.workspaces) {
      for (const workspace of report.workspaces) {
        const workspaceReportPath = path.join(workspace, 'DISCOVERY_REPORT.json');
        if (fs.existsSync(workspaceReportPath) && workspaceReportPath !== reportPath) {
          try {
            const workspaceReport = JSON.parse(fs.readFileSync(workspaceReportPath, 'utf-8'));
            const workspacePackages = workspaceReport.discovered?.packages || [];
            for (const pkg of workspacePackages) {
              if (!this.packages.find(p => p.path === pkg.path)) {
                this.packages.push(pkg);
              }
            }
          } catch (e) {
            // Skip if can't read
          }
        }
      }
    }
    
    console.log(`📂 Loaded ${this.packages.length} packages for debugging across all workspaces\n`);
  }

  findAllWorkspaces() {
    const workspaces = [BASE_DIR];
    const baseDir = path.dirname(BASE_DIR);
    
    try {
      const entries = fs.readdirSync(baseDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && (
          entry.name.startsWith('cathedral') ||
          entry.name.startsWith('cosmogenesis') ||
          entry.name.includes('circuit') ||
          entry.name.includes('codex')
        )) {
          const workspacePath = path.join(baseDir, entry.name);
          if (fs.existsSync(path.join(workspacePath, 'package.json'))) {
            workspaces.push(workspacePath);
          }
        }
      }
    } catch (e) {
      // Skip if can't read
    }

    // Also check for remote repos directory
    const remoteReposDir = path.join(BASE_DIR, '.remote-repos');
    if (fs.existsSync(remoteReposDir)) {
      try {
        const remoteEntries = fs.readdirSync(remoteReposDir, { withFileTypes: true });
        for (const entry of remoteEntries) {
          if (entry.isDirectory()) {
            const remotePath = path.join(remoteReposDir, entry.name);
            if (fs.existsSync(path.join(remotePath, 'package.json'))) {
              workspaces.push(remotePath);
            }
          }
        }
      } catch (e) {
        // Skip if can't read
      }
    }

    return workspaces;
  }

  async debugPackage(pkg) {
    const pkgPath = pkg.path;
    if (!pkgPath || !fs.existsSync(pkgPath)) return;

    const pkgName = pkg.packageJson?.name || pkg.realName;
    const packageIssues = [];

    // 1. Package.json issues
    packageIssues.push(...await this.checkPackageJson(pkgPath, pkgName));

    // 2. TypeScript issues
    packageIssues.push(...await this.checkTypeScript(pkgPath, pkgName));

    // 3. Build issues
    packageIssues.push(...await this.checkBuild(pkgPath, pkgName));

    // 4. Dependency issues
    packageIssues.push(...await this.checkDependencies(pkgPath, pkgName));

    // 5. Documentation issues
    packageIssues.push(...await this.checkDocumentation(pkgPath, pkgName));

    // 6. Code quality issues
    packageIssues.push(...await this.checkCodeQuality(pkgPath, pkgName));

    // 7. Codex integration issues
    packageIssues.push(...await this.checkCodexIntegration(pkgPath, pkgName));

    // 8. Alchemical label issues
    packageIssues.push(...await this.checkAlchemicalLabels(pkgPath, pkgName));

    if (packageIssues.length > 0) {
      this.issues.push({
        package: pkgName,
        path: pkgPath,
        issues: packageIssues
      });
    }
  }

  async checkPackageJson(pkgPath, pkgName) {
    const issues = [];
    const packageJsonPath = path.join(pkgPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      issues.push({
        type: 'package-json',
        severity: 'critical',
        issue: 'Missing package.json',
        fix: 'Create package.json with name, version, license'
      });
      return issues;
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Check required fields
      if (!packageJson.name) {
        issues.push({
          type: 'package-json',
          severity: 'critical',
          issue: 'Missing name field',
          fix: 'Add "name" field to package.json'
        });
      }

      if (!packageJson.version) {
        issues.push({
          type: 'package-json',
          severity: 'critical',
          issue: 'Missing version field',
          fix: 'Add "version": "1.0.0" to package.json'
        });
      }

      if (!packageJson.license || packageJson.license !== 'CC0-1.0') {
        issues.push({
          type: 'package-json',
          severity: 'warning',
          issue: `License is "${packageJson.license || 'missing'}", should be "CC0-1.0"`,
          fix: 'Set "license": "CC0-1.0" in package.json'
        });
      }

      // Check engines
      if (!packageJson.engines) {
        issues.push({
          type: 'package-json',
          severity: 'warning',
          issue: 'Missing engines field',
          fix: 'Add "engines": { "node": "*", "pnpm": "*" }'
        });
      } else {
        if (packageJson.engines.node && packageJson.engines.node !== '*') {
          issues.push({
            type: 'package-json',
            severity: 'info',
            issue: `Node version pinned to "${packageJson.engines.node}", should be "*"`,
            fix: 'Set "engines": { "node": "*", "pnpm": "*" }'
          });
        }
        if (packageJson.engines.pnpm && packageJson.engines.pnpm !== '*') {
          issues.push({
            type: 'package-json',
            severity: 'info',
            issue: `pnpm version pinned to "${packageJson.engines.pnpm}", should be "*"`,
            fix: 'Set "engines": { "node": "*", "pnpm": "*" }'
          });
        }
      }

      // Check packageManager
      if (!packageJson.packageManager) {
        issues.push({
          type: 'package-json',
          severity: 'warning',
          issue: 'Missing packageManager field',
          fix: 'Add "packageManager": "pnpm@10.23.0"'
        });
      }

      // Check publishConfig
      if (!packageJson.publishConfig) {
        issues.push({
          type: 'package-json',
          severity: 'info',
          issue: 'Missing publishConfig',
          fix: 'Add "publishConfig": { "access": "public" }'
        });
      }

      // Check alchemical labels
      if (!packageJson.alchemical) {
        issues.push({
          type: 'alchemical',
          severity: 'warning',
          issue: 'Missing alchemical labels',
          fix: 'Run: pnpm run label:alchemical'
        });
      }

      // Check scripts
      if (!packageJson.scripts || !packageJson.scripts.build) {
        const hasTsFiles = this.hasTypeScriptFiles(pkgPath);
        if (hasTsFiles) {
          issues.push({
            type: 'package-json',
            severity: 'warning',
            issue: 'Missing build script (TypeScript files found)',
            fix: 'Add "scripts": { "build": "tsc" }'
          });
        }
      }

    } catch (e) {
      issues.push({
        type: 'package-json',
        severity: 'critical',
        issue: `Error reading package.json: ${e.message}`,
        fix: 'Fix JSON syntax errors'
      });
    }

    return issues;
  }

  async checkTypeScript(pkgPath, pkgName) {
    const issues = [];
    const tsconfigPath = path.join(pkgPath, 'tsconfig.json');
    const hasTsFiles = this.hasTypeScriptFiles(pkgPath);

    if (hasTsFiles && !fs.existsSync(tsconfigPath)) {
      issues.push({
        type: 'typescript',
        severity: 'critical',
        issue: 'TypeScript files found but no tsconfig.json',
        fix: 'Create tsconfig.json with proper TypeScript configuration'
      });
      return issues;
    }

    if (!hasTsFiles) {
      return issues; // No TypeScript, skip
    }

    // Check TypeScript compilation
    try {
      execSync('tsc --noEmit', {
        cwd: pkgPath,
        stdio: 'pipe',
        timeout: 30000
      });
    } catch (e) {
      const errorOutput = e.stdout?.toString() || e.stderr?.toString() || e.message;
      issues.push({
        type: 'typescript',
        severity: 'critical',
        issue: 'TypeScript compilation errors',
        details: errorOutput.split('\n').slice(0, 10).join('\n'),
        fix: 'Fix TypeScript errors (run: tsc --noEmit)'
      });
    }

    // Check tsconfig quality
    if (fs.existsSync(tsconfigPath)) {
      try {
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
        
        if (!tsconfig.compilerOptions?.strict) {
          issues.push({
            type: 'typescript',
            severity: 'warning',
            issue: 'TypeScript strict mode not enabled',
            fix: 'Set "compilerOptions": { "strict": true }'
          });
        }

        if (!tsconfig.compilerOptions?.declaration) {
          issues.push({
            type: 'typescript',
            severity: 'info',
            issue: 'TypeScript declaration files not generated',
            fix: 'Set "compilerOptions": { "declaration": true }'
          });
        }
      } catch (e) {
        // Skip if can't read
      }
    }

    return issues;
  }

  async checkBuild(pkgPath, pkgName) {
    const issues = [];
    const packageJsonPath = path.join(pkgPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) return issues;

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      if (packageJson.scripts?.build) {
        // Try to build
        try {
          execSync('pnpm run build', {
            cwd: pkgPath,
            stdio: 'pipe',
            timeout: 60000
          });
        } catch (e) {
          issues.push({
            type: 'build',
            severity: 'critical',
            issue: 'Build script fails',
            details: e.message,
            fix: 'Fix build errors'
          });
        }

        // Check output
        if (packageJson.main && !fs.existsSync(path.join(pkgPath, packageJson.main))) {
          issues.push({
            type: 'build',
            severity: 'warning',
            issue: `Main file "${packageJson.main}" not found after build`,
            fix: 'Ensure build script generates the main file'
          });
        }

        if (packageJson.types && !fs.existsSync(path.join(pkgPath, packageJson.types))) {
          issues.push({
            type: 'build',
            severity: 'warning',
            issue: `Types file "${packageJson.types}" not found after build`,
            fix: 'Ensure build script generates type definitions'
          });
        }
      }
    } catch (e) {
      // Skip if can't read
    }

    return issues;
  }

  async checkDependencies(pkgPath, pkgName) {
    const issues = [];
    const packageJsonPath = path.join(pkgPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) return issues;

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const allDeps = {
        ...(packageJson.dependencies || {}),
        ...(packageJson.devDependencies || {})
      };

      // Check for npm (should be pnpm)
      if (fs.existsSync(path.join(pkgPath, 'pnpm-lock.yaml'))) {
        issues.push({
          type: 'dependency',
          severity: 'warning',
          issue: 'pnpm-lock.yaml found (npm), should use pnpm',
          fix: 'Delete pnpm-lock.yaml and use pnpm'
        });
      }

      // Check for missing workspace dependencies
      for (const [depName, depVersion] of Object.entries(allDeps)) {
        if (depVersion.startsWith('workspace:')) {
          // Check if workspace package exists
          const workspacePkg = this.packages.find(p => 
            (p.packageJson?.name === depName) || 
            (p.realName === depName)
          );
          
          if (!workspacePkg) {
            issues.push({
              type: 'dependency',
              severity: 'warning',
              issue: `Workspace dependency "${depName}" not found`,
              fix: `Check if "${depName}" exists in workspace or remove dependency`
            });
          }
        }
      }
    } catch (e) {
      // Skip
    }

    return issues;
  }

  async checkDocumentation(pkgPath, pkgName) {
    const issues = [];
    const readmePath = path.join(pkgPath, 'README.md');
    const licensePath = path.join(pkgPath, 'LICENSE');

    if (!fs.existsSync(readmePath)) {
      issues.push({
        type: 'documentation',
        severity: 'warning',
        issue: 'Missing README.md',
        fix: 'Create README.md with package description and usage'
      });
    } else {
      // Check README quality
      try {
        const readme = fs.readFileSync(readmePath, 'utf-8');
        if (readme.length < 100) {
          issues.push({
            type: 'documentation',
            severity: 'info',
            issue: 'README.md is very short',
            fix: 'Expand README with more details'
          });
        }
        if (!readme.includes('Installation') && !readme.includes('Usage')) {
          issues.push({
            type: 'documentation',
            severity: 'info',
            issue: 'README.md missing Installation/Usage sections',
            fix: 'Add Installation and Usage sections to README'
          });
        }
      } catch (e) {
        // Skip
      }
    }

    if (!fs.existsSync(licensePath)) {
      issues.push({
        type: 'documentation',
        severity: 'warning',
        issue: 'Missing LICENSE file',
        fix: 'Create LICENSE file with CC0-1.0 Public Domain license'
      });
    }

    return issues;
  }

  async checkCodeQuality(pkgPath, pkgName) {
    const issues = [];
    
    // Check for common code quality issues
    const srcPath = path.join(pkgPath, 'src');
    if (!fs.existsSync(srcPath)) return issues;

    try {
      const files = this.findSourceFiles(srcPath);
      let hasConsoleLog = false;
      let hasTodo = false;
      let hasAnyType = false;

      for (const file of files.slice(0, 10)) { // Sample first 10 files
        try {
          const content = fs.readFileSync(file, 'utf-8');
          if (content.includes('console.log') && !content.includes('// eslint-disable')) {
            hasConsoleLog = true;
          }
          if (content.includes('TODO') || content.includes('FIXME')) {
            hasTodo = true;
          }
          if (content.includes(': any') && !content.includes('// @ts-ignore')) {
            hasAnyType = true;
          }
        } catch (e) {
          // Skip
        }
      }

      if (hasConsoleLog) {
        issues.push({
          type: 'code-quality',
          severity: 'info',
          issue: 'console.log statements found (should be removed in production)',
          fix: 'Remove or replace console.log with proper logging'
        });
      }

      if (hasTodo) {
        issues.push({
          type: 'code-quality',
          severity: 'info',
          issue: 'TODO/FIXME comments found',
          fix: 'Address TODO/FIXME comments or remove them'
        });
      }

      if (hasAnyType) {
        issues.push({
          type: 'code-quality',
          severity: 'warning',
          issue: 'Usage of "any" type found (reduces type safety)',
          fix: 'Replace "any" with proper types'
        });
      }
    } catch (e) {
      // Skip
    }

    return issues;
  }

  async checkCodexIntegration(pkgPath, pkgName) {
    const issues = [];
    const nameLower = pkgName.toLowerCase();
    const description = (this.packages.find(p => (p.packageJson?.name || p.realName) === pkgName)?.packageJson?.description || '').toLowerCase();

    // Check if package should have codex integration
    const shouldHaveCodex = nameLower.includes('codex') || 
                           nameLower.includes('144') ||
                           description.includes('codex') ||
                           description.includes('144:99') ||
                           description.includes('144-99');

    if (shouldHaveCodex) {
      // Check for codex files
      const codexFiles = this.findCodexFiles(pkgPath);
      if (codexFiles.length === 0) {
        issues.push({
          type: 'codex',
          severity: 'info',
          issue: 'Package name suggests codex integration but no codex files found',
          fix: 'Add codex integration or update package name/description'
        });
      }

      // Check for codex imports
      const codexImports = this.findCodexImports(pkgPath);
      if (codexImports.length === 0) {
        issues.push({
          type: 'codex',
          severity: 'info',
          issue: 'Package should use codex but no codex imports found',
          fix: 'Import and use codex modules'
        });
      }
    }

    return issues;
  }

  async checkAlchemicalLabels(pkgPath, pkgName) {
    const issues = [];
    const packageJsonPath = path.join(pkgPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) return issues;

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      if (!packageJson.alchemical) {
        issues.push({
          type: 'alchemical',
          severity: 'warning',
          issue: 'Missing alchemical labels',
          fix: 'Run: pnpm run label:alchemical'
        });
      } else {
        // Check completeness
        if (!packageJson.alchemical.symbol) {
          issues.push({
            type: 'alchemical',
            severity: 'info',
            issue: 'Alchemical label missing symbol',
            fix: 'Add symbol to alchemical label'
          });
        }
        if (!packageJson.alchemical.name) {
          issues.push({
            type: 'alchemical',
            severity: 'info',
            issue: 'Alchemical label missing name',
            fix: 'Add name to alchemical label'
          });
        }
      }
    } catch (e) {
      // Skip
    }

    return issues;
  }

  hasTypeScriptFiles(dir) {
    try {
      const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
      return entries.some(e => e.isFile() && (e.name.endsWith('.ts') || e.name.endsWith('.tsx')));
    } catch {
      return false;
    }
  }

  findSourceFiles(dir) {
    const files = [];
    try {
      const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
          files.push(path.join(entry.path, entry.name));
        }
      }
    } catch {
      // Skip
    }
    return files;
  }

  findCodexFiles(pkgPath) {
    const files = [];
    try {
      const entries = fs.readdirSync(pkgPath, { recursive: true, withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (
          entry.name.toLowerCase().includes('codex') ||
          entry.name.includes('144-99') ||
          entry.name.includes('144:99')
        )) {
          files.push(path.relative(pkgPath, path.join(entry.path, entry.name)));
        }
      }
    } catch {
      // Skip
    }
    return files;
  }

  findCodexImports(pkgPath) {
    const imports = [];
    try {
      const entries = fs.readdirSync(pkgPath, { recursive: true, withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js') || entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))) {
          const filePath = path.join(entry.path, entry.name);
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const codexMatches = content.match(/from\s+['"](.*codex.*|.*144.*)['"]/gi);
            if (codexMatches) {
              imports.push(...codexMatches.map(m => m.replace(/from\s+['"]|['"]/g, '')));
            }
          } catch {
            // Skip
          }
        }
      }
    } catch {
      // Skip
    }
    return [...new Set(imports)];
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      theme: 'Monas Hieroglyphica - Unity in Diversity',
      alchemical: {
        principle: 'Monas Hieroglyphica - Unity in Diversity',
        symbol: '⊙',
        ratio: '144:99',
        process: 'Solve et Coagula (Dissolution and Coagulation)'
      },
      summary: {
        totalPackages: this.packages.length,
        packagesWithIssues: this.issues.length,
        totalIssues: this.issues.reduce((sum, pkg) => sum + pkg.issues.length, 0),
        issuesBySeverity: {
          critical: this.issues.reduce((sum, pkg) => sum + pkg.issues.filter(i => i.severity === 'critical').length, 0),
          warning: this.issues.reduce((sum, pkg) => sum + pkg.issues.filter(i => i.severity === 'warning').length, 0),
          info: this.issues.reduce((sum, pkg) => sum + pkg.issues.filter(i => i.severity === 'info').length, 0)
        },
        issuesByType: {}
      },
      packages: this.issues
    };

    // Count issues by type
    for (const pkg of this.issues) {
      for (const issue of pkg.issues) {
        report.summary.issuesByType[issue.type] = (report.summary.issuesByType[issue.type] || 0) + 1;
      }
    }

    const reportPath = path.join(BASE_DIR, 'PACKAGE_DEBUG_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`📄 Debug report saved: PACKAGE_DEBUG_REPORT.json\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const packageDebugger = new ComprehensivePackageDebugger();
  packageDebugger.debugAll().catch(console.error);
}

export default ComprehensivePackageDebugger;

