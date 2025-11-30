#!/usr/bin/env node
/**
 * Comprehensive Deduplicator - Finds and fixes ALL duplicates and mismatches
 * 
 * Scans packages, systems, apps, and tools across all workspaces
 * Identifies duplicates, mismatches, and connection issues
 * Provides actionable fixes
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class ComprehensiveDeduplicator {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-v1-consolidated',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    this.packages = new Map();
    this.systems = new Map();
    this.apps = new Map();
    this.tools = new Map();
    this.duplicates = [];
    this.mismatches = [];
    this.fixes = [];
  }

  async run() {
    console.log('🔍 COMPREHENSIVE DEDUPLICATION - Finding ALL Duplicates & Mismatches\n');
    console.log('═'.repeat(80) + '\n');
    
    this.scanAll();
    this.findDuplicates();
    this.findMismatches();
    this.generateFixes();
    this.printReport();
    this.saveReport();
  }

  scanAll() {
    console.log('📦 Scanning all workspaces...\n');
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      console.log(`   Scanning: ${path.basename(workspace)}`);
      this.scanPackages(workspace);
      this.scanSystems(workspace);
      this.scanApps(workspace);
      this.scanTools(workspace);
    }
    
    console.log(`\n✅ Scanned:`);
    console.log(`   Packages: ${this.packages.size}`);
    console.log(`   Systems: ${this.systems.size}`);
    console.log(`   Apps: ${this.apps.size}`);
    console.log(`   Tools: ${this.tools.size}\n`);
  }

  scanPackages(workspace) {
    const packagesDir = path.join(workspace, 'packages');
    if (!fs.existsSync(packagesDir)) return;
    
    try {
      const entries = fs.readdirSync(packagesDir);
      for (const entry of entries) {
        const pkgPath = path.join(packagesDir, entry);
        if (!fs.statSync(pkgPath).isDirectory()) continue;
        
        const packageJson = path.join(pkgPath, 'package.json');
        if (fs.existsSync(packageJson)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
            const key = (pkg.name || entry).toLowerCase();
            
            if (!this.packages.has(key)) {
              this.packages.set(key, []);
            }
            
            this.packages.get(key).push({
              name: pkg.name || entry,
              workspace,
              path: pkgPath,
              version: pkg.version || 'unknown',
              description: pkg.description || '',
              packageJson
            });
          } catch (e) {
            // Invalid package.json
          }
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  scanSystems(workspace) {
    const scriptsDir = path.join(workspace, 'scripts');
    if (!fs.existsSync(scriptsDir)) return;
    
    try {
      const entries = fs.readdirSync(scriptsDir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules') continue;
        
        const fullPath = path.join(scriptsDir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile() && (entry.endsWith('.mjs') || entry.endsWith('.ts') || entry.endsWith('.js'))) {
          const key = entry.toLowerCase();
          
          if (!this.systems.has(key)) {
            this.systems.set(key, []);
          }
          
          this.systems.get(key).push({
            name: entry,
            workspace,
            path: fullPath,
            size: stat.size,
            mtime: stat.mtime
          });
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  scanApps(workspace) {
    const appsDir = path.join(workspace, 'apps');
    if (!fs.existsSync(appsDir)) return;
    
    try {
      const entries = fs.readdirSync(appsDir);
      for (const entry of entries) {
        const appPath = path.join(appsDir, entry);
        if (!fs.statSync(appPath).isDirectory()) continue;
        
        const packageJson = path.join(appPath, 'package.json');
        if (fs.existsSync(packageJson)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
            const key = (pkg.name || entry).toLowerCase();
            
            if (!this.apps.has(key)) {
              this.apps.set(key, []);
            }
            
            this.apps.get(key).push({
              name: pkg.name || entry,
              workspace,
              path: appPath,
              version: pkg.version || 'unknown',
              packageJson
            });
          } catch (e) {
            // Ignore
          }
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  scanTools(workspace) {
    const toolsDir = path.join(workspace, 'tools');
    if (!fs.existsSync(toolsDir)) return;
    
    try {
      const entries = fs.readdirSync(toolsDir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules') continue;
        
        const fullPath = path.join(toolsDir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile() && (entry.endsWith('.mjs') || entry.endsWith('.ts') || entry.endsWith('.js'))) {
          const key = entry.toLowerCase();
          
          if (!this.tools.has(key)) {
            this.tools.set(key, []);
          }
          
          this.tools.get(key).push({
            name: entry,
            workspace,
            path: fullPath,
            size: stat.size,
            mtime: stat.mtime
          });
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  findDuplicates() {
    console.log('🔍 Finding duplicates...\n');
    
    // Packages
    for (const [key, items] of this.packages.entries()) {
      if (items.length > 1) {
        this.duplicates.push({
          type: 'package',
          name: key,
          count: items.length,
          items: items.map(item => ({
            workspace: item.workspace,
            path: item.path,
            version: item.version
          })),
          recommendation: this.recommendPackageMerge(items)
        });
      }
    }
    
    // Systems
    for (const [key, items] of this.systems.entries()) {
      if (items.length > 1) {
        this.duplicates.push({
          type: 'system',
          name: key,
          count: items.length,
          items: items.map(item => ({
            workspace: item.workspace,
            path: item.path,
            size: item.size,
            mtime: item.mtime
          })),
          recommendation: this.recommendSystemMerge(items)
        });
      }
    }
    
    // Apps
    for (const [key, items] of this.apps.entries()) {
      if (items.length > 1) {
        this.duplicates.push({
          type: 'app',
          name: key,
          count: items.length,
          items: items.map(item => ({
            workspace: item.workspace,
            path: item.path,
            version: item.version
          })),
          recommendation: this.recommendAppMerge(items)
        });
      }
    }
    
    // Tools
    for (const [key, items] of this.tools.entries()) {
      if (items.length > 1) {
        this.duplicates.push({
          type: 'tool',
          name: key,
          count: items.length,
          items: items.map(item => ({
            workspace: item.workspace,
            path: item.path,
            size: item.size,
            mtime: item.mtime
          })),
          recommendation: this.recommendToolMerge(items)
        });
      }
    }
    
    console.log(`   Found ${this.duplicates.length} duplicate groups\n`);
  }

  findMismatches() {
    console.log('🔍 Finding mismatches...\n');
    
    // Check for packages with same name but different versions
    for (const [key, items] of this.packages.entries()) {
      if (items.length > 1) {
        const versions = [...new Set(items.map(i => i.version))];
        if (versions.length > 1) {
          this.mismatches.push({
            type: 'version-mismatch',
            category: 'package',
            name: key,
            versions,
            items: items.map(item => ({
              workspace: item.workspace,
              version: item.version
            }))
          });
        }
      }
    }
    
    // Check for systems with same name but different sizes (likely different content)
    for (const [key, items] of this.systems.entries()) {
      if (items.length > 1) {
        const sizes = items.map(i => i.size);
        const avgSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;
        const variance = sizes.reduce((sum, size) => sum + Math.pow(size - avgSize, 2), 0) / sizes.length;
        
        if (variance > avgSize * 0.2) {
          this.mismatches.push({
            type: 'content-mismatch',
            category: 'system',
            name: key,
            sizeVariance: variance,
            items: items.map(item => ({
              workspace: item.workspace,
              size: item.size
            }))
          });
        }
      }
    }
    
    console.log(`   Found ${this.mismatches.length} mismatches\n`);
  }

  recommendPackageMerge(items) {
    // Prefer cathedral-master-deployment
    const primary = items.find(i => i.workspace.includes('master-deployment'));
    if (primary) return { action: 'keep', item: primary, reason: 'Primary workspace' };
    
    // Prefer most recent
    return { action: 'keep', item: items[0], reason: 'First found' };
  }

  recommendSystemMerge(items) {
    // Prefer largest (most complete)
    const largest = items.reduce((a, b) => a.size > b.size ? a : b);
    return { action: 'keep', item: largest, reason: 'Largest file (most complete)' };
  }

  recommendAppMerge(items) {
    // Prefer cathedral-master-deployment
    const primary = items.find(i => i.workspace.includes('master-deployment'));
    if (primary) return { action: 'keep', item: primary, reason: 'Primary workspace' };
    
    return { action: 'keep', item: items[0], reason: 'First found' };
  }

  recommendToolMerge(items) {
    // Prefer largest (most complete)
    const largest = items.reduce((a, b) => a.size > b.size ? a : b);
    return { action: 'keep', item: largest, reason: 'Largest file (most complete)' };
  }

  generateFixes() {
    console.log('🔧 Generating fixes...\n');
    
    for (const dup of this.duplicates) {
      const recommendation = dup.recommendation;
      const keep = recommendation.item;
      const remove = dup.items.filter(item => item.path !== keep.path);
      
      this.fixes.push({
        type: 'deduplicate',
        category: dup.type,
        name: dup.name,
        keep: {
          workspace: keep.workspace,
          path: keep.path
        },
        remove: remove.map(item => ({
          workspace: item.workspace,
          path: item.path
        })),
        reason: recommendation.reason
      });
    }
    
    console.log(`   Generated ${this.fixes.length} fixes\n`);
  }

  printReport() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                  🔍 DEDUPLICATION REPORT                                   ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 SUMMARY:\n');
    console.log(`   Packages: ${this.packages.size} unique, ${this.duplicates.filter(d => d.type === 'package').length} duplicates`);
    console.log(`   Systems: ${this.systems.size} unique, ${this.duplicates.filter(d => d.type === 'system').length} duplicates`);
    console.log(`   Apps: ${this.apps.size} unique, ${this.duplicates.filter(d => d.type === 'app').length} duplicates`);
    console.log(`   Tools: ${this.tools.size} unique, ${this.duplicates.filter(d => d.type === 'tool').length} duplicates`);
    console.log(`   Mismatches: ${this.mismatches.length}`);
    console.log(`   Fixes: ${this.fixes.length}\n`);
    
    if (this.duplicates.length > 0) {
      console.log('🔍 TOP DUPLICATES:\n');
      for (const dup of this.duplicates.slice(0, 10)) {
        console.log(`   ${dup.type.toUpperCase()}: ${dup.name} (${dup.count} instances)`);
        console.log(`      Keep: ${path.basename(dup.recommendation.item.workspace)}`);
        console.log(`      Remove: ${dup.items.filter(i => i.path !== dup.recommendation.item.path).length} others\n`);
      }
    }
    
    console.log('═'.repeat(80) + '\n');
  }

  saveReport() {
    const report = {
      timestamp: Date.now(),
      summary: {
        packages: this.packages.size,
        systems: this.systems.size,
        apps: this.apps.size,
        tools: this.tools.size,
        duplicates: this.duplicates.length,
        mismatches: this.mismatches.length,
        fixes: this.fixes.length
      },
      duplicates: this.duplicates,
      mismatches: this.mismatches,
      fixes: this.fixes
    };
    
    const reportPath = path.join(rootDir, 'deduplication-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`✅ Report saved to: ${reportPath}\n`);
    
    return report;
  }
}

async function main() {
  const deduplicator = new ComprehensiveDeduplicator();
  await deduplicator.run();
}

main().catch(console.error);

