#!/usr/bin/env node
/**
 * Debug All - Comprehensive Debugging Tool
 * 
 * Finds and fixes all debug issues across the monorepo
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const WORKSPACE_PATHS = [
  BASE_DIR,
  path.resolve(BASE_DIR, '../cathedral-real'),
  path.resolve(BASE_DIR, '../cathedral-v1-consolidated'),
  path.resolve(BASE_DIR, '../cathedral-fixed-clean'),
  path.resolve(BASE_DIR, '../cosmogenesis-engine'),
  path.resolve(BASE_DIR, '../Roo-Code')
].filter(p => fs.existsSync(p));

class DebugAll {
  constructor() {
    this.issues = [];
    this.fixed = [];
    this.errors = [];
  }

  async debugAll() {
    console.log('🐛 DEBUGGING ALL ISSUES\n');
    console.log('═'.repeat(80) + '\n');

    // Step 1: Find TypeScript errors
    await this.findTypeScriptErrors();

    // Step 2: Find import errors
    await this.findImportErrors();

    // Step 3: Find missing files
    await this.findMissingFiles();

    // Step 4: Find broken references
    await this.findBrokenReferences();

    // Step 5: Fix common issues
    await this.fixCommonIssues();

    // Step 6: Generate debug report
    this.generateReport();
  }

  async findTypeScriptErrors() {
    console.log('📘 Finding TypeScript errors...\n');

    for (const workspace of WORKSPACE_PATHS) {
      try {
        const result = execSync('npx tsc --noEmit 2>&1', {
          cwd: workspace,
          stdio: 'pipe',
          timeout: 60000
        });
        // No errors if command succeeds
      } catch (e) {
        const output = e.stdout?.toString() || e.stderr?.toString() || '';
        const errors = output.split('\n').filter(line => line.includes('error TS'));
        for (const error of errors) {
          this.issues.push({
            type: 'typescript',
            workspace: path.basename(workspace),
            error: error.trim()
          });
        }
      }
    }

    console.log(`   Found ${this.issues.filter(i => i.type === 'typescript').length} TypeScript errors\n`);
  }

  async findImportErrors() {
    console.log('📥 Finding import errors...\n');

    for (const workspace of WORKSPACE_PATHS) {
      const packagesDir = path.join(workspace, 'packages');
      if (!fs.existsSync(packagesDir)) continue;

      const packages = fs.readdirSync(packagesDir)
        .filter(item => {
          const itemPath = path.join(packagesDir, item);
          return fs.statSync(itemPath).isDirectory();
        });

      for (const pkg of packages) {
        const pkgPath = path.join(packagesDir, pkg);
        await this.checkImports(pkgPath, workspace);
      }
    }

    console.log(`   Found ${this.issues.filter(i => i.type === 'import').length} import errors\n`);
  }

  async checkImports(pkgPath, workspace) {
    const srcDir = path.join(pkgPath, 'src');
    if (!fs.existsSync(srcDir)) return;

    const files = this.findSourceFiles(srcDir);
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const imports = content.match(/import\s+.*?from\s+['"](.+?)['"]/g) || [];
        
        for (const imp of imports) {
          const match = imp.match(/from\s+['"](.+?)['"]/);
          if (match) {
            const importPath = match[1];
            // Check if import is valid
            if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
              // External import - check if it exists in node_modules
              const nodeModulesPath = path.join(pkgPath, 'node_modules', importPath);
              if (!fs.existsSync(nodeModulesPath) && !importPath.startsWith('@')) {
                this.issues.push({
                  type: 'import',
                  workspace: path.basename(workspace),
                  file: file,
                  import: importPath,
                  error: 'Missing dependency'
                });
              }
            }
          }
        }
      } catch (e) {
        // Skip files we can't read
      }
    }
  }

  findSourceFiles(dir) {
    const files = [];
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          files.push(...this.findSourceFiles(itemPath));
        } else if (item.endsWith('.ts') || item.endsWith('.js')) {
          files.push(itemPath);
        }
      }
    } catch (e) {
      // Skip
    }
    return files;
  }

  async findMissingFiles() {
    console.log('📄 Finding missing files...\n');

    for (const workspace of WORKSPACE_PATHS) {
      const packageJsonPath = path.join(workspace, 'package.json');
      if (!fs.existsSync(packageJsonPath)) continue;

      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const scripts = packageJson.scripts || {};

        for (const [name, command] of Object.entries(scripts)) {
          if (typeof command === 'string' && command.startsWith('node ')) {
            const scriptPath = command.replace('node ', '').split(' ')[0];
            const fullPath = path.join(workspace, scriptPath);
            
            if (!fs.existsSync(fullPath)) {
              this.issues.push({
                type: 'missing-file',
                workspace: path.basename(workspace),
                script: name,
                file: scriptPath,
                error: 'Script file not found'
              });
            }
          }
        }
      } catch (e) {
        // Skip invalid package.json
      }
    }

    console.log(`   Found ${this.issues.filter(i => i.type === 'missing-file').length} missing files\n`);
  }

  async findBrokenReferences() {
    console.log('🔗 Finding broken references...\n');

    // Check for broken package references
    for (const workspace of WORKSPACE_PATHS) {
      const packagesDir = path.join(workspace, 'packages');
      if (!fs.existsSync(packagesDir)) continue;

      const packages = fs.readdirSync(packagesDir)
        .filter(item => {
          const itemPath = path.join(packagesDir, item);
          return fs.statSync(itemPath).isDirectory();
        });

      for (const pkg of packages) {
        const pkgPath = path.join(packagesDir, pkg);
        const packageJsonPath = path.join(pkgPath, 'package.json');
        
        if (fs.existsSync(packageJsonPath)) {
          try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            const deps = {
              ...(packageJson.dependencies || {}),
              ...(packageJson.devDependencies || {})
            };

            for (const [dep, version] of Object.entries(deps)) {
              if (version.startsWith('workspace:')) {
                // Check if workspace dependency exists
                const depPath = path.join(workspace, 'packages', dep.replace('@cathedral/', ''));
                if (!fs.existsSync(depPath)) {
                  this.issues.push({
                    type: 'broken-reference',
                    workspace: path.basename(workspace),
                    package: pkg,
                    dependency: dep,
                    error: 'Workspace dependency not found'
                  });
                }
              }
            }
          } catch (e) {
            // Skip
          }
        }
      }
    }

    console.log(`   Found ${this.issues.filter(i => i.type === 'broken-reference').length} broken references\n`);
  }

  async fixCommonIssues() {
    console.log('🔧 Fixing common issues...\n');

    // Fix missing package.json files
    for (const workspace of WORKSPACE_PATHS) {
      const packagesDir = path.join(workspace, 'packages');
      if (!fs.existsSync(packagesDir)) continue;

      const packages = fs.readdirSync(packagesDir)
        .filter(item => {
          const itemPath = path.join(packagesDir, item);
          return fs.statSync(itemPath).isDirectory();
        });

      for (const pkg of packages) {
        const pkgPath = path.join(packagesDir, pkg);
        const packageJsonPath = path.join(pkgPath, 'package.json');
        
        if (!fs.existsSync(packageJsonPath)) {
          const packageJson = {
            name: pkg,
            version: '1.0.0',
            license: 'CC0-1.0',
            description: '',
            main: 'src/index.ts',
            types: 'src/index.ts'
          };
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
          this.fixed.push({ type: 'package.json', path: packageJsonPath });
        }
      }
    }

    console.log(`   Fixed ${this.fixed.length} issues\n`);
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      issues: this.issues,
      fixed: this.fixed,
      errors: this.errors,
      summary: {
        totalIssues: this.issues.length,
        totalFixed: this.fixed.length,
        totalErrors: this.errors.length,
        byType: this.issues.reduce((acc, issue) => {
          acc[issue.type] = (acc[issue.type] || 0) + 1;
          return acc;
        }, {})
      }
    };

    const reportPath = path.join(BASE_DIR, 'DEBUG_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 Debug Report\n');
    console.log(`🐛 Issues Found: ${this.issues.length}`);
    console.log(`✅ Fixed: ${this.fixed.length}`);
    console.log(`⚠️  Errors: ${this.errors.length}`);
    console.log(`\n📄 Report saved: ${reportPath}\n`);

    if (this.issues.length > 0) {
      console.log('Issues by Type:');
      for (const [type, count] of Object.entries(report.summary.byType)) {
        console.log(`  ${type}: ${count}`);
      }
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const debugTool = new DebugAll();
  debugTool.debugAll().catch(console.error);
}

export default DebugAll;

