#!/usr/bin/env node
/**
 * Comprehensive Audit System
 * 
 * Audits every package, repo, and directory
 * Labels everything with real names
 * Maps completion status and creates roadmap
 * Ensures open source/public domain readiness
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

// All known workspace paths
const WORKSPACE_PATHS = [
  BASE_DIR, // cathedral-master-deployment
  path.resolve(BASE_DIR, '../cathedral-real'),
  path.resolve(BASE_DIR, '../cathedral-v1-consolidated'),
  path.resolve(BASE_DIR, '../cathedral-fixed-clean'),
  path.resolve(BASE_DIR, '../cosmogenesis-engine'),
  path.resolve(BASE_DIR, '../Roo-Code')
].filter(p => fs.existsSync(p));

class ComprehensiveAuditSystem {
  constructor() {
    this.audit = {
      timestamp: Date.now(),
      workspaces: [],
      packages: [],
      apps: [],
      tools: [],
      systems: [],
      engines: [],
      repos: [],
      directories: [],
      licensing: {
        publicDomain: 0,
        missing: [],
        needsUpdate: []
      },
      completion: {
        complete: [],
        partial: [],
        incomplete: [],
        needsWork: []
      },
      dependencies: {},
      connections: {},
      roadmap: []
    };
  }

  async runFullAudit() {
    console.log('🔍 COMPREHENSIVE AUDIT SYSTEM\n');
    console.log('═'.repeat(80) + '\n');
    console.log(`📁 Scanning ${WORKSPACE_PATHS.length} workspaces...\n`);

    // Audit each workspace
    for (const workspacePath of WORKSPACE_PATHS) {
      await this.auditWorkspace(workspacePath);
    }

    // Analyze completion status
    this.analyzeCompletion();

    // Check licensing
    this.checkLicensing();

    // Map dependencies
    this.mapDependencies();

    // Create roadmap
    this.createRoadmap();

    // Generate reports
    await this.generateReports();

    console.log('\n' + '═'.repeat(80));
    console.log('\n✅ COMPREHENSIVE AUDIT COMPLETE\n');
    console.log(`📦 Packages: ${this.audit.packages.length}`);
    console.log(`📱 Apps: ${this.audit.apps.length}`);
    console.log(`🔧 Tools: ${this.audit.tools.length}`);
    console.log(`⚙️  Systems: ${this.audit.systems.length}`);
    console.log(`🎯 Engines: ${this.audit.engines.length}`);
    console.log(`\n📄 Reports generated in: ${BASE_DIR}\n`);
  }

  async auditWorkspace(workspacePath) {
    const workspaceName = path.basename(workspacePath);
    console.log(`📁 Auditing: ${workspaceName}...`);

    const workspace = {
      name: workspaceName,
      path: workspacePath,
      packages: [],
      apps: [],
      tools: [],
      systems: [],
      engines: [],
      directories: []
    };

    // Discover packages
    const packagesDir = path.join(workspacePath, 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir)
        .filter(item => {
          const itemPath = path.join(packagesDir, item);
          return fs.statSync(itemPath).isDirectory();
        })
        .map(item => this.auditPackage(path.join(packagesDir, item), workspaceName));
      
      workspace.packages = packages;
      this.audit.packages.push(...packages);
    }

    // Discover apps
    const appsDir = path.join(workspacePath, 'apps');
    if (fs.existsSync(appsDir)) {
      const apps = fs.readdirSync(appsDir)
        .filter(item => {
          const itemPath = path.join(appsDir, item);
          return fs.statSync(itemPath).isDirectory();
        })
        .map(item => this.auditApp(path.join(appsDir, item), workspaceName));
      
      workspace.apps = apps;
      this.audit.apps.push(...apps);
    }

    // Discover tools
    const toolsDir = path.join(workspacePath, 'tools');
    if (fs.existsSync(toolsDir)) {
      const tools = fs.readdirSync(toolsDir)
        .filter(item => {
          const itemPath = path.join(toolsDir, item);
          return fs.statSync(itemPath).isFile() && item.endsWith('.mjs');
        })
        .map(item => this.auditTool(path.join(toolsDir, item), workspaceName));
      
      workspace.tools = tools;
      this.audit.tools.push(...tools);
    }

    // Discover scripts (also tools)
    const scriptsDir = path.join(workspacePath, 'scripts');
    if (fs.existsSync(scriptsDir)) {
      const scripts = fs.readdirSync(scriptsDir)
        .filter(item => {
          const itemPath = path.join(scriptsDir, item);
          return fs.statSync(itemPath).isFile() && (item.endsWith('.mjs') || item.endsWith('.ts'));
        })
        .map(item => this.auditTool(path.join(scriptsDir, item), workspaceName, 'script'));
      
      workspace.tools.push(...scripts);
      this.audit.tools.push(...scripts);
    }

    // Discover systems and engines
    this.discoverSystemsAndEngines(workspacePath, workspace);

    // Discover directories
    this.discoverDirectories(workspacePath, workspace);

    this.audit.workspaces.push(workspace);
    console.log(`   ✅ Found ${workspace.packages.length} packages, ${workspace.apps.length} apps, ${workspace.tools.length} tools\n`);
  }

  auditPackage(packagePath, workspace) {
    const packageName = path.basename(packagePath);
    const packageJsonPath = path.join(packagePath, 'package.json');
    
    let packageJson = null;
    let realName = packageName;
    let version = 'unknown';
    let description = '';
    let license = '';
    let dependencies = {};
    let hasSource = false;
    let hasTests = false;
    let hasDocs = false;
    let hasReadme = false;

    if (fs.existsSync(packageJsonPath)) {
      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        realName = packageJson.name || packageName;
        version = packageJson.version || 'unknown';
        description = packageJson.description || '';
        license = packageJson.license || '';
        dependencies = {
          ...(packageJson.dependencies || {}),
          ...(packageJson.devDependencies || {})
        };
      } catch (e) {
        // Invalid JSON
      }
    }

    // Check for source files
    const srcDir = path.join(packagePath, 'src');
    const libDir = path.join(packagePath, 'lib');
    hasSource = fs.existsSync(srcDir) || fs.existsSync(libDir) || 
                fs.readdirSync(packagePath).some(f => f.endsWith('.ts') || f.endsWith('.js'));

    // Check for tests
    const testDir = path.join(packagePath, 'test');
    const testsDir = path.join(packagePath, 'tests');
    const specDir = path.join(packagePath, '__tests__');
    hasTests = fs.existsSync(testDir) || fs.existsSync(testsDir) || fs.existsSync(specDir);

    // Check for docs
    const docsDir = path.join(packagePath, 'docs');
    hasDocs = fs.existsSync(docsDir);

    // Check for README
    hasReadme = fs.existsSync(path.join(packagePath, 'README.md')) || 
                fs.existsSync(path.join(packagePath, 'README.txt'));

    return {
      realName,
      packageName,
      workspace,
      path: packagePath,
      version,
      description,
      license,
      dependencies,
      hasSource,
      hasTests,
      hasDocs,
      hasReadme,
      completion: this.assessCompletion({ hasSource, hasTests, hasDocs, hasReadme, license }),
      type: 'package'
    };
  }

  auditApp(appPath, workspace) {
    const appName = path.basename(appPath);
    const packageJsonPath = path.join(appPath, 'package.json');
    
    let packageJson = null;
    let realName = appName;
    let version = 'unknown';
    let description = '';
    let license = '';
    let hasSource = false;
    let hasBuild = false;
    let hasConfig = false;

    if (fs.existsSync(packageJsonPath)) {
      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        realName = packageJson.name || appName;
        version = packageJson.version || 'unknown';
        description = packageJson.description || '';
        license = packageJson.license || '';
        hasBuild = !!(packageJson.scripts && packageJson.scripts.build);
      } catch (e) {
        // Invalid JSON
      }
    }

    // Check for source
    const srcDir = path.join(appPath, 'src');
    const pagesDir = path.join(appPath, 'pages');
    const appDir = path.join(appPath, 'app');
    hasSource = fs.existsSync(srcDir) || fs.existsSync(pagesDir) || fs.existsSync(appDir);

    // Check for config
    hasConfig = fs.existsSync(path.join(appPath, 'next.config.js')) ||
                fs.existsSync(path.join(appPath, 'vite.config.js')) ||
                fs.existsSync(path.join(appPath, 'webpack.config.js'));

    return {
      realName,
      appName,
      workspace,
      path: appPath,
      version,
      description,
      license,
      hasSource,
      hasBuild,
      hasConfig,
      completion: this.assessCompletion({ hasSource, hasBuild, hasConfig, license }),
      type: 'app'
    };
  }

  auditTool(toolPath, workspace, category = 'tool') {
    const toolName = path.basename(toolPath);
    const realName = toolName.replace(/\.(mjs|ts|js)$/, '');
    
    let license = '';
    let hasLicense = false;
    let description = '';

    // Read file to check for license and description
    try {
      const content = fs.readFileSync(toolPath, 'utf-8');
      if (content.includes('CC0-1.0') || content.includes('Public Domain')) {
        license = 'CC0-1.0';
        hasLicense = true;
      }
      // Extract description from JSDoc
      const descMatch = content.match(/\/\*\*[\s\S]*?\* ([^\n]+)/);
      if (descMatch) {
        description = descMatch[1];
      }
    } catch (e) {
      // Can't read file
    }

    return {
      realName,
      toolName,
      workspace,
      path: toolPath,
      category,
      description,
      license: hasLicense ? license : '',
      completion: this.assessCompletion({ hasLicense }),
      type: 'tool'
    };
  }

  discoverSystemsAndEngines(workspacePath, workspace) {
    // Look for system/engine indicators in package names and descriptions
    const allEntities = [
      ...this.audit.packages.filter(p => p.workspace === path.basename(workspacePath)),
      ...this.audit.apps.filter(a => a.workspace === path.basename(workspacePath))
    ];

    for (const entity of allEntities) {
      const name = entity.realName.toLowerCase();
      const desc = (entity.description || '').toLowerCase();

      if (name.includes('engine') || desc.includes('engine')) {
        if (!this.audit.engines.find(e => e.realName === entity.realName)) {
          this.audit.engines.push({ ...entity, type: 'engine' });
        }
      }

      if (name.includes('system') || desc.includes('system')) {
        if (!this.audit.systems.find(s => s.realName === entity.realName)) {
          this.audit.systems.push({ ...entity, type: 'system' });
        }
      }
    }
  }

  discoverDirectories(workspacePath, workspace) {
    const topLevelDirs = fs.readdirSync(workspacePath)
      .filter(item => {
        const itemPath = path.join(workspacePath, item);
        return fs.statSync(itemPath).isDirectory() && 
               !['node_modules', '.git', 'dist', 'build', '.next', '.turbo'].includes(item);
      })
      .map(item => ({
        name: item,
        path: path.join(workspacePath, item),
        workspace: path.basename(workspacePath),
        type: this.classifyDirectory(item)
      }));

    workspace.directories = topLevelDirs;
    this.audit.directories.push(...topLevelDirs);
  }

  classifyDirectory(dirName) {
    const name = dirName.toLowerCase();
    if (name.includes('package')) return 'package';
    if (name.includes('app')) return 'app';
    if (name.includes('tool')) return 'tool';
    if (name.includes('script')) return 'script';
    if (name.includes('doc')) return 'documentation';
    if (name.includes('test')) return 'test';
    if (name.includes('config')) return 'config';
    return 'other';
  }

  assessCompletion(checks) {
    const total = Object.keys(checks).length;
    const complete = Object.values(checks).filter(Boolean).length;
    const percentage = (complete / total) * 100;

    if (percentage >= 80) return 'complete';
    if (percentage >= 50) return 'partial';
    if (percentage >= 20) return 'incomplete';
    return 'needsWork';
  }

  analyzeCompletion() {
    console.log('\n📊 Analyzing completion status...\n');

    const allEntities = [
      ...this.audit.packages.map(p => ({ ...p, entityType: 'package' })),
      ...this.audit.apps.map(a => ({ ...a, entityType: 'app' })),
      ...this.audit.tools.map(t => ({ ...t, entityType: 'tool' }))
    ];

    for (const entity of allEntities) {
      if (entity.completion === 'complete') {
        this.audit.completion.complete.push({
          name: entity.realName,
          type: entity.entityType,
          workspace: entity.workspace
        });
      } else if (entity.completion === 'partial') {
        this.audit.completion.partial.push({
          name: entity.realName,
          type: entity.entityType,
          workspace: entity.workspace,
          missing: this.getMissingItems(entity)
        });
      } else if (entity.completion === 'incomplete') {
        this.audit.completion.incomplete.push({
          name: entity.realName,
          type: entity.entityType,
          workspace: entity.workspace,
          missing: this.getMissingItems(entity)
        });
      } else {
        this.audit.completion.needsWork.push({
          name: entity.realName,
          type: entity.entityType,
          workspace: entity.workspace,
          missing: this.getMissingItems(entity)
        });
      }
    }

    console.log(`   ✅ Complete: ${this.audit.completion.complete.length}`);
    console.log(`   ⚠️  Partial: ${this.audit.completion.partial.length}`);
    console.log(`   ⚠️  Incomplete: ${this.audit.completion.incomplete.length}`);
    console.log(`   ❌ Needs Work: ${this.audit.completion.needsWork.length}\n`);
  }

  getMissingItems(entity) {
    const missing = [];
    if (!entity.hasSource && entity.type !== 'tool') missing.push('source');
    if (!entity.hasTests && entity.type === 'package') missing.push('tests');
    if (!entity.hasDocs && entity.type === 'package') missing.push('docs');
    if (!entity.hasReadme && entity.type === 'package') missing.push('README');
    if (!entity.license) missing.push('license');
    if (entity.type === 'app' && !entity.hasBuild) missing.push('build');
    if (entity.type === 'app' && !entity.hasConfig) missing.push('config');
    return missing;
  }

  checkLicensing() {
    console.log('📜 Checking licensing...\n');

    const allFiles = [
      ...this.audit.packages,
      ...this.audit.apps,
      ...this.audit.tools
    ];

    for (const entity of allFiles) {
      if (entity.license === 'CC0-1.0' || entity.license === 'CC0' || entity.license === 'Public Domain') {
        this.audit.licensing.publicDomain++;
      } else if (!entity.license) {
        this.audit.licensing.missing.push({
          name: entity.realName,
          type: entity.type,
          workspace: entity.workspace,
          path: entity.path
        });
      } else {
        this.audit.licensing.needsUpdate.push({
          name: entity.realName,
          type: entity.type,
          workspace: entity.workspace,
          currentLicense: entity.license,
          path: entity.path
        });
      }
    }

    console.log(`   ✅ Public Domain (CC0-1.0): ${this.audit.licensing.publicDomain}`);
    console.log(`   ⚠️  Missing License: ${this.audit.licensing.missing.length}`);
    console.log(`   ⚠️  Needs Update: ${this.audit.licensing.needsUpdate.length}\n`);
  }

  mapDependencies() {
    console.log('🔗 Mapping dependencies...\n');

    for (const pkg of this.audit.packages) {
      if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
        this.audit.dependencies[pkg.realName] = {
          workspace: pkg.workspace,
          dependencies: Object.keys(pkg.dependencies),
          internal: Object.keys(pkg.dependencies).filter(dep => 
            this.audit.packages.some(p => p.realName === dep || p.packageName === dep)
          ),
          external: Object.keys(pkg.dependencies).filter(dep => 
            !this.audit.packages.some(p => p.realName === dep || p.packageName === dep)
          )
        };
      }
    }

    console.log(`   ✅ Mapped dependencies for ${Object.keys(this.audit.dependencies).length} packages\n`);
  }

  createRoadmap() {
    console.log('🗺️  Creating completion roadmap...\n');

    // Priority 1: Fix licensing (required for open source)
    for (const item of this.audit.licensing.missing) {
      this.audit.roadmap.push({
        priority: 1,
        category: 'licensing',
        action: 'Add CC0-1.0 Public Domain license',
        target: item.name,
        workspace: item.workspace,
        path: item.path,
        reason: 'Required for open source/public domain release'
      });
    }

    for (const item of this.audit.licensing.needsUpdate) {
      this.audit.roadmap.push({
        priority: 1,
        category: 'licensing',
        action: `Update license from ${item.currentLicense} to CC0-1.0`,
        target: item.name,
        workspace: item.workspace,
        path: item.path,
        reason: 'Ensure consistent Public Domain licensing'
      });
    }

    // Priority 2: Complete incomplete packages
    for (const item of this.audit.completion.needsWork) {
      this.audit.roadmap.push({
        priority: 2,
        category: 'completion',
        action: `Complete ${item.type}: add ${item.missing.join(', ')}`,
        target: item.name,
        workspace: item.workspace,
        missing: item.missing,
        reason: 'Package is incomplete and needs core components'
      });
    }

    // Priority 3: Fix partial packages
    for (const item of this.audit.completion.partial) {
      this.audit.roadmap.push({
        priority: 3,
        category: 'completion',
        action: `Complete ${item.type}: add ${item.missing.join(', ')}`,
        target: item.name,
        workspace: item.workspace,
        missing: item.missing,
        reason: 'Package is partially complete'
      });
    }

    // Priority 4: Add missing documentation
    const needsDocs = [
      ...this.audit.completion.partial.filter(p => p.missing.includes('docs')),
      ...this.audit.completion.incomplete.filter(p => p.missing.includes('docs'))
    ];
    for (const item of needsDocs) {
      this.audit.roadmap.push({
        priority: 4,
        category: 'documentation',
        action: 'Add documentation',
        target: item.name,
        workspace: item.workspace,
        reason: 'Improve open source usability'
      });
    }

    console.log(`   ✅ Created ${this.audit.roadmap.length} roadmap items\n`);
  }

  async generateReports() {
    // JSON report
    const jsonPath = path.join(BASE_DIR, 'COMPREHENSIVE_AUDIT.json');
    fs.writeFileSync(jsonPath, JSON.stringify(this.audit, null, 2));

    // Markdown report
    const mdPath = path.join(BASE_DIR, 'COMPREHENSIVE_AUDIT.md');
    const md = this.generateMarkdownReport();
    fs.writeFileSync(mdPath, md);

    // Roadmap report
    const roadmapPath = path.join(BASE_DIR, 'COMPLETION_ROADMAP.md');
    const roadmapMd = this.generateRoadmapMarkdown();
    fs.writeFileSync(roadmapPath, roadmapMd);

    console.log('📄 Generated reports:');
    console.log(`   - ${jsonPath}`);
    console.log(`   - ${mdPath}`);
    console.log(`   - ${roadmapPath}\n`);
  }

  generateMarkdownReport() {
    let md = `# Comprehensive Audit Report\n\n`;
    md += `**Generated:** ${new Date(this.audit.timestamp).toISOString()}\n\n`;
    md += `## Summary\n\n`;
    md += `- **Workspaces:** ${this.audit.workspaces.length}\n`;
    md += `- **Packages:** ${this.audit.packages.length}\n`;
    md += `- **Apps:** ${this.audit.apps.length}\n`;
    md += `- **Tools:** ${this.audit.tools.length}\n`;
    md += `- **Systems:** ${this.audit.systems.length}\n`;
    md += `- **Engines:** ${this.audit.engines.length}\n\n`;

    md += `## Completion Status\n\n`;
    md += `- ✅ **Complete:** ${this.audit.completion.complete.length}\n`;
    md += `- ⚠️  **Partial:** ${this.audit.completion.partial.length}\n`;
    md += `- ⚠️  **Incomplete:** ${this.audit.completion.incomplete.length}\n`;
    md += `- ❌ **Needs Work:** ${this.audit.completion.needsWork.length}\n\n`;

    md += `## Licensing Status\n\n`;
    md += `- ✅ **Public Domain (CC0-1.0):** ${this.audit.licensing.publicDomain}\n`;
    md += `- ⚠️  **Missing License:** ${this.audit.licensing.missing.length}\n`;
    md += `- ⚠️  **Needs Update:** ${this.audit.licensing.needsUpdate.length}\n\n`;

    md += `## All Packages\n\n`;
    for (const pkg of this.audit.packages) {
      md += `### ${pkg.realName}\n`;
      md += `- **Workspace:** ${pkg.workspace}\n`;
      md += `- **Version:** ${pkg.version}\n`;
      md += `- **License:** ${pkg.license || '❌ Missing'}\n`;
      md += `- **Completion:** ${pkg.completion}\n`;
      md += `- **Description:** ${pkg.description || 'No description'}\n\n`;
    }

    md += `## All Apps\n\n`;
    for (const app of this.audit.apps) {
      md += `### ${app.realName}\n`;
      md += `- **Workspace:** ${app.workspace}\n`;
      md += `- **Version:** ${app.version}\n`;
      md += `- **License:** ${app.license || '❌ Missing'}\n`;
      md += `- **Completion:** ${app.completion}\n`;
      md += `- **Description:** ${app.description || 'No description'}\n\n`;
    }

    return md;
  }

  generateRoadmapMarkdown() {
    let md = `# Completion Roadmap\n\n`;
    md += `**Generated:** ${new Date(this.audit.timestamp).toISOString()}\n\n`;
    md += `## Overview\n\n`;
    md += `This roadmap outlines the steps needed to complete the project for open source/public domain release.\n\n`;
    md += `**Total Items:** ${this.audit.roadmap.length}\n\n`;

    // Group by priority
    const byPriority = {
      1: this.audit.roadmap.filter(r => r.priority === 1),
      2: this.audit.roadmap.filter(r => r.priority === 2),
      3: this.audit.roadmap.filter(r => r.priority === 3),
      4: this.audit.roadmap.filter(r => r.priority === 4)
    };

    for (const [priority, items] of Object.entries(byPriority)) {
      if (items.length === 0) continue;

      md += `## Priority ${priority}\n\n`;
      for (const item of items) {
        md += `### ${item.target}\n`;
        md += `- **Action:** ${item.action}\n`;
        md += `- **Workspace:** ${item.workspace}\n`;
        md += `- **Category:** ${item.category}\n`;
        md += `- **Reason:** ${item.reason}\n`;
        if (item.missing) {
          md += `- **Missing:** ${item.missing.join(', ')}\n`;
        }
        md += `\n`;
      }
    }

    return md;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const audit = new ComprehensiveAuditSystem();
  audit.runFullAudit().catch(console.error);
}

export default ComprehensiveAuditSystem;

