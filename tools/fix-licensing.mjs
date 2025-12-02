#!/usr/bin/env node
/**
 * Fix Licensing Tool
 * 
 * Automatically adds CC0-1.0 Public Domain license to all files
 * that are missing licenses or have incorrect licenses
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class LicensingFixer {
  constructor() {
    this.fixed = [];
    this.errors = [];
  }

  async fixAllLicensing() {
    console.log('📜 FIXING LICENSING - CC0-1.0 Public Domain\n');
    console.log('═'.repeat(80) + '\n');

    // Load audit results
    const auditPath = path.join(BASE_DIR, 'COMPREHENSIVE_AUDIT.json');
    if (!fs.existsSync(auditPath)) {
      console.log('❌ Please run audit:all first\n');
      return;
    }

    const audit = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));

    // Fix missing licenses
    console.log(`📜 Fixing ${audit.licensing.missing.length} missing licenses...\n`);
    for (const item of audit.licensing.missing) {
      await this.fixLicense(item);
    }

    // Fix licenses that need update
    console.log(`\n📜 Updating ${audit.licensing.needsUpdate.length} licenses...\n`);
    for (const item of audit.licensing.needsUpdate) {
      await this.fixLicense(item);
    }

    // Generate report
    this.generateReport();
  }

  async fixLicense(item) {
    try {
      const { path: itemPath, type, name } = item;

      if (type === 'package' || type === 'app') {
        // Fix package.json
        const packageJsonPath = path.join(itemPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          packageJson.license = 'CC0-1.0';
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
          this.fixed.push({ name, type, path: itemPath, file: 'package.json' });
          console.log(`   ✅ Fixed license in ${name}/package.json`);
        }
      }

      // Add license header to source files
      await this.addLicenseHeader(itemPath, type);

    } catch (e) {
      this.errors.push({ name: item.name, error: e.message });
      console.log(`   ⚠️  Error fixing ${item.name}: ${e.message}`);
    }
  }

  async addLicenseHeader(itemPath, type) {
    if (!fs.existsSync(itemPath)) return;

    const licenseHeader = `/**
 * @license CC0-1.0 - Public Domain
 */\n\n`;

    // For packages/apps, add to main source files
    if (type === 'package' || type === 'app') {
      const srcDir = path.join(itemPath, 'src');
      const libDir = path.join(itemPath, 'lib');
      const indexFile = path.join(itemPath, 'index.ts');
      const indexJs = path.join(itemPath, 'index.js');

      const filesToCheck = [];
      if (fs.existsSync(srcDir)) {
        filesToCheck.push(...this.findSourceFiles(srcDir));
      }
      if (fs.existsSync(libDir)) {
        filesToCheck.push(...this.findSourceFiles(libDir));
      }
      if (fs.existsSync(indexFile)) filesToCheck.push(indexFile);
      if (fs.existsSync(indexJs)) filesToCheck.push(indexJs);

      for (const file of filesToCheck.slice(0, 5)) { // Limit to first 5 files
        await this.addHeaderToFile(file, licenseHeader);
      }
    } else if (type === 'tool') {
      // For tools, add directly to the file
      await this.addHeaderToFile(itemPath, licenseHeader);
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
        } else if (item.endsWith('.ts') || item.endsWith('.js') || item.endsWith('.mjs')) {
          files.push(itemPath);
        }
      }
    } catch (e) {
      // Skip
    }
    return files;
  }

  async addHeaderToFile(filePath, header) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Skip if already has license
      if (content.includes('CC0-1.0') || content.includes('Public Domain')) {
        return;
      }

      // Add header at the beginning
      if (!content.startsWith('/**')) {
        content = header + content;
        fs.writeFileSync(filePath, content, 'utf-8');
      }
    } catch (e) {
      // Skip files we can't modify
    }
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      fixed: this.fixed,
      errors: this.errors,
      summary: {
        totalFixed: this.fixed.length,
        totalErrors: this.errors.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'LICENSING_FIX_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 Licensing Fix Report\n');
    console.log(`✅ Fixed: ${this.fixed.length}`);
    console.log(`⚠️  Errors: ${this.errors.length}`);
    console.log(`\n📄 Report saved: ${reportPath}\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new LicensingFixer();
  fixer.fixAllLicensing().catch(console.error);
}

export default LicensingFixer;

