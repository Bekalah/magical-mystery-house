#!/usr/bin/env node
/**
 * Organize and Merge All Data
 * 
 * Organizes all items, data, packages, and merges everything properly
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

class OrganizeAndMergeAll {
  constructor() {
    this.organized = [];
    this.merged = [];
    this.errors = [];
  }

  async organizeAndMerge() {
    console.log('🗂️  ORGANIZING AND MERGING ALL DATA\n');
    console.log('═'.repeat(80) + '\n');

    // Step 1: Organize all packages
    await this.organizePackages();

    // Step 2: Organize all apps
    await this.organizeApps();

    // Step 3: Organize all tools
    await this.organizeTools();

    // Step 4: Organize all data files
    await this.organizeDataFiles();

    // Step 5: Merge duplicates
    await this.mergeDuplicates();

    // Step 6: Organize directory structure
    await this.organizeDirectories();

    // Step 7: Generate organization report
    this.generateReport();
  }

  async organizePackages() {
    console.log('📦 Organizing packages...\n');

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
        await this.organizePackage(pkgPath, workspace);
      }
    }

    console.log(`   ✅ Organized ${this.organized.length} packages\n`);
  }

  async organizePackage(pkgPath, workspace) {
    try {
      // Ensure package.json exists
      const packageJsonPath = path.join(pkgPath, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        // Create basic package.json
        const packageJson = {
          name: path.basename(pkgPath),
          version: '1.0.0',
          license: 'CC0-1.0',
          description: '',
          main: 'src/index.ts',
          types: 'src/index.ts',
          scripts: {
            build: 'tsc'
          }
        };
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        this.organized.push({ type: 'package.json', path: pkgPath });
      }

      // Organize source files
      const srcDir = path.join(pkgPath, 'src');
      if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
        this.organized.push({ type: 'src-directory', path: srcDir });
      }

      // Move loose TypeScript files to src
      const files = fs.readdirSync(pkgPath);
      for (const file of files) {
        if (file.endsWith('.ts') && file !== 'tsconfig.json') {
          const oldPath = path.join(pkgPath, file);
          const newPath = path.join(srcDir, file);
          if (!fs.existsSync(newPath)) {
            fs.renameSync(oldPath, newPath);
            this.organized.push({ type: 'moved-file', from: oldPath, to: newPath });
          }
        }
      }

      // Ensure index.ts exists
      const indexPath = path.join(srcDir, 'index.ts');
      if (!fs.existsSync(indexPath)) {
        const indexContent = `/**
 * @license CC0-1.0 - Public Domain
 */

export * from './${path.basename(pkgPath)}';
`;
        fs.writeFileSync(indexPath, indexContent);
        this.organized.push({ type: 'index-file', path: indexPath });
      }

    } catch (e) {
      this.errors.push({ type: 'package-organization', path: pkgPath, error: e.message });
    }
  }

  async organizeApps() {
    console.log('📱 Organizing apps...\n');

    for (const workspace of WORKSPACE_PATHS) {
      const appsDir = path.join(workspace, 'apps');
      if (!fs.existsSync(appsDir)) continue;

      const apps = fs.readdirSync(appsDir)
        .filter(item => {
          const itemPath = path.join(appsDir, item);
          return fs.statSync(itemPath).isDirectory();
        });

      for (const app of apps) {
        const appPath = path.join(appsDir, app);
        await this.organizeApp(appPath, workspace);
      }
    }

    console.log(`   ✅ Organized apps\n`);
  }

  async organizeApp(appPath, workspace) {
    try {
      // Ensure package.json exists
      const packageJsonPath = path.join(appPath, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        const packageJson = {
          name: path.basename(appPath),
          version: '1.0.0',
          license: 'CC0-1.0',
          description: '',
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start'
          }
        };
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        this.organized.push({ type: 'app-package.json', path: appPath });
      }

      // Organize source files
      const srcDir = path.join(appPath, 'src');
      const pagesDir = path.join(appPath, 'pages');
      const appDir = path.join(appPath, 'app');

      if (!fs.existsSync(srcDir) && !fs.existsSync(pagesDir) && !fs.existsSync(appDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
        this.organized.push({ type: 'app-src-directory', path: srcDir });
      }

    } catch (e) {
      this.errors.push({ type: 'app-organization', path: appPath, error: e.message });
    }
  }

  async organizeTools() {
    console.log('🔧 Organizing tools...\n');

    // Ensure all tools have license headers
    for (const workspace of WORKSPACE_PATHS) {
      const toolsDir = path.join(workspace, 'tools');
      if (!fs.existsSync(toolsDir)) continue;

      const tools = fs.readdirSync(toolsDir)
        .filter(item => item.endsWith('.mjs') || item.endsWith('.js'));

      for (const tool of tools) {
        const toolPath = path.join(toolsDir, tool);
        await this.organizeTool(toolPath);
      }
    }

    console.log(`   ✅ Organized tools\n`);
  }

  async organizeTool(toolPath) {
    try {
      let content = fs.readFileSync(toolPath, 'utf-8');
      let updated = false;

      // Add license if missing
      if (!content.includes('CC0-1.0') && !content.includes('Public Domain')) {
        const licenseHeader = `/**
 * @license CC0-1.0 - Public Domain
 */

`;
        content = licenseHeader + content;
        updated = true;
      }

      if (updated) {
        fs.writeFileSync(toolPath, content, 'utf-8');
        this.organized.push({ type: 'tool-license', path: toolPath });
      }
    } catch (e) {
      this.errors.push({ type: 'tool-organization', path: toolPath, error: e.message });
    }
  }

  async organizeDataFiles() {
    console.log('📄 Organizing data files...\n');

    // Create data directory if it doesn't exist
    const dataDir = path.join(BASE_DIR, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Organize JSON reports
    const reportsDir = path.join(BASE_DIR, 'data', 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Move report files to data/reports
    const reportFiles = [
      'COMPREHENSIVE_AUDIT.json',
      'DISCOVERY_REPORT.json',
      'PARTIAL_ANALYSIS.json',
      'CODEX_ALIGNMENT_PLAN.json',
      'COMPLETION_ROADMAP.md',
      'COMPREHENSIVE_AUDIT.md'
    ];

    for (const file of reportFiles) {
      const oldPath = path.join(BASE_DIR, file);
      const newPath = path.join(reportsDir, file);
      if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
        this.organized.push({ type: 'moved-report', from: oldPath, to: newPath });
      }
    }

    console.log(`   ✅ Organized data files\n`);
  }

  async mergeDuplicates() {
    console.log('🔄 Merging duplicates...\n');

    // Use your existing deduplicator
    try {
      execSync('node scripts/real-deduplicator.mjs', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        timeout: 300000
      });

      // Then run the fixer
      execSync('node scripts/real-fixer.mjs', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        timeout: 300000
      });

      this.merged.push({ type: 'duplicates', description: 'Merged duplicate files' });
    } catch (e) {
      this.errors.push({ type: 'merge-duplicates', error: e.message });
    }

    console.log(`   ✅ Merged duplicates\n`);
  }

  async organizeDirectories() {
    console.log('📁 Organizing directory structure...\n');

    // Ensure standard directories exist
    const standardDirs = [
      'packages',
      'apps',
      'tools',
      'scripts',
      'data',
      'docs'
    ];

    for (const dir of standardDirs) {
      const dirPath = path.join(BASE_DIR, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        this.organized.push({ type: 'directory', path: dirPath });
      }
    }

    console.log(`   ✅ Organized directories\n`);
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      organized: this.organized,
      merged: this.merged,
      errors: this.errors,
      summary: {
        totalOrganized: this.organized.length,
        totalMerged: this.merged.length,
        totalErrors: this.errors.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'ORGANIZATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 Organization Report\n');
    console.log(`✅ Organized: ${this.organized.length}`);
    console.log(`🔄 Merged: ${this.merged.length}`);
    console.log(`⚠️  Errors: ${this.errors.length}`);
    console.log(`\n📄 Report saved: ${reportPath}\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const organizer = new OrganizeAndMergeAll();
  organizer.organizeAndMerge().catch(console.error);
}

export default OrganizeAndMergeAll;

