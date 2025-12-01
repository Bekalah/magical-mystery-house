#!/usr/bin/env node
/**
 * Generate Package Information
 * 
 * Generates comprehensive information about each package:
 * - Basic info (name, version, description, path, workspace, type, status)
 * - Alchemical info (symbol, element, planet, metal, correspondences, process)
 * - Codex info (integration status, 144:99 ratio usage, connections)
 * - Dependencies (workspace, external, dependents)
 * - Build info (scripts, status, output files, TypeScript config)
 * - Documentation (README, LICENSE, completeness)
 * - Issues (all issues from debugger, severity, fix suggestions)
 * - Quality metrics (code quality, documentation, build health, overall)
 * - Improvement suggestions (experiment learnings, best practices, creative caliber)
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class PackageInfoGenerator {
  constructor() {
    this.packages = [];
    this.packageMap = null;
    this.debugReport = null;
    this.discoveryReport = null;
    this.systemLabels = null;
    this.completeInfo = [];
  }

  async generateAll() {
    console.log('⚗️  GENERATING COMPREHENSIVE PACKAGE INFORMATION - Cathedral Ecosystem\n');
    console.log('*Monas Hieroglyphica - Unity in Diversity*\n');
    console.log('═'.repeat(80) + '\n');

    // Load all data sources
    await this.loadDataSources();

    // Generate info for each package
    for (const pkg of this.packages) {
      const info = await this.generatePackageInfo(pkg);
      this.completeInfo.push(info);
    }

    // Generate reports
    this.generateJSONReport();
    this.generateMarkdownReport();

    console.log('═'.repeat(80));
    console.log('\n✅ PACKAGE INFORMATION GENERATION COMPLETE\n');
    console.log(`📦 Packages documented: ${this.completeInfo.length}`);
    console.log(`📄 JSON report: COMPLETE_PACKAGE_INFO.json`);
    console.log(`📄 Markdown report: COMPLETE_PACKAGE_INFO.md\n`);
  }

  async loadDataSources() {
    console.log('📂 Loading data sources from all workspaces...\n');

    const workspaces = this.findAllWorkspaces();

    // Load discovery report from all workspaces
    let totalPackages = 0;
    for (const workspace of workspaces) {
      const discoveryPath = path.join(workspace, 'DISCOVERY_REPORT.json');
      if (fs.existsSync(discoveryPath)) {
        try {
          const report = JSON.parse(fs.readFileSync(discoveryPath, 'utf-8'));
          const packages = report.discovered?.packages || [];
          for (const pkg of packages) {
            if (!this.packages.find(p => p.path === pkg.path)) {
              this.packages.push(pkg);
            }
          }
          totalPackages += packages.length;
        } catch (e) {
          // Skip if can't read
        }
      }
    }
    
    if (this.packages.length > 0) {
      this.discoveryReport = { discovered: { packages: this.packages } };
      console.log(`   ✅ Discovery reports: ${totalPackages} packages from ${workspaces.length} workspaces`);
    }

    // Load package map from all workspaces (merge them)
    const packageMapData = { packages: [] };
    for (const workspace of workspaces) {
      const mapPath = path.join(workspace, 'PACKAGE_MAP.json');
      if (fs.existsSync(mapPath)) {
        try {
          const map = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
          if (map.packages) {
            packageMapData.packages.push(...map.packages);
          }
        } catch (e) {
          // Skip if can't read
        }
      }
    }
    
    if (packageMapData.packages.length > 0) {
      this.packageMap = packageMapData;
      console.log(`   ✅ Package maps: ${packageMapData.packages.length} packages mapped`);
    } else {
      console.log(`   ⚠️  Package map not found (run map:packages first)`);
    }

    // Load debug report from all workspaces (merge them)
    const debugData = { packages: [] };
    for (const workspace of workspaces) {
      const debugPath = path.join(workspace, 'PACKAGE_DEBUG_REPORT.json');
      if (fs.existsSync(debugPath)) {
        try {
          const report = JSON.parse(fs.readFileSync(debugPath, 'utf-8'));
          if (report.packages) {
            debugData.packages.push(...report.packages);
          }
        } catch (e) {
          // Skip if can't read
        }
      }
    }
    
    if (debugData.packages.length > 0) {
      this.debugReport = debugData;
      console.log(`   ✅ Debug reports: ${debugData.packages.length} packages with issues`);
    } else {
      console.log(`   ⚠️  Debug report not found (run debug:packages first)`);
    }

    // Load system labels from all workspaces (merge them)
    const labelsData = { packages: [] };
    for (const workspace of workspaces) {
      const labelsPath = path.join(workspace, 'system-labels.json');
      if (fs.existsSync(labelsPath)) {
        try {
          const labels = JSON.parse(fs.readFileSync(labelsPath, 'utf-8'));
          if (labels.packages) {
            labelsData.packages.push(...labels.packages);
          }
        } catch (e) {
          // Skip if can't read
        }
      }
    }
    
    if (labelsData.packages.length > 0) {
      this.systemLabels = labelsData;
      console.log(`   ✅ System labels: ${labelsData.packages.length} packages`);
    }

    console.log('');
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

  async generatePackageInfo(pkg) {
    const pkgName = pkg.packageJson?.name || pkg.realName;
    const pkgPath = pkg.path;

    // Get data from various sources
    const mapData = this.packageMap?.packages?.find(p => p.name === pkgName);
    const debugData = this.debugReport?.packages?.find(p => p.package === pkgName);
    const labelData = this.systemLabels?.packages?.find(p => (p.name === pkgName) || (p.packageName === pkgName));

    // Basic Info
    const basicInfo = {
      name: pkgName,
      realName: pkg.realName,
      version: pkg.packageJson?.version || '1.0.0',
      description: pkg.packageJson?.description || pkg.description || '',
      path: pkgPath,
      workspace: pkg.workspace,
      type: pkg.type || 'package',
      status: pkg.isComplete ? 'complete' : 'incomplete'
    };

    // Alchemical Info
    const alchemicalInfo = {
      symbol: labelData?.symbol || mapData?.alchemical?.symbol || '⊙',
      alchemical: labelData?.alchemical || mapData?.alchemical?.alchemical || this.getAlchemicalName(pkgName),
      element: labelData?.element || mapData?.alchemical?.element || this.getAlchemicalElement(pkgName),
      planet: labelData?.planet || mapData?.alchemical?.planet || this.getAlchemicalPlanet(pkgName),
      metal: labelData?.metal || mapData?.alchemical?.metal || this.getAlchemicalMetal(pkgName),
      label: labelData?.label || mapData?.alchemical?.label || `⊙ ${this.getAlchemicalName(pkgName)} (${pkgName})`,
      process: this.getAlchemicalProcess(pkgName),
      correspondences: {
        element: this.getAlchemicalElement(pkgName),
        planet: this.getAlchemicalPlanet(pkgName),
        metal: this.getAlchemicalMetal(pkgName),
        principle: this.getAlchemicalPrinciple(pkgName)
      }
    };

    // Codex Info
    const codexInfo = {
      integrationStatus: mapData?.codexConnections?.length > 0 ? 'integrated' : 'not-integrated',
      hasCodexFiles: (mapData?.codexConnections || []).some(c => c.type === 'codex-files'),
      hasCodexImports: (mapData?.codexConnections || []).some(c => c.type === 'codex-imports'),
      codexConnections: mapData?.codexConnections || [],
      uses14499Ratio: this.check14499Usage(pkgPath),
      codexLevel: this.getCodexLevel(mapData?.codexConnections || [])
    };

    // Dependencies
    const dependencies = {
      workspace: (mapData?.dependencies || []).filter(d => d.type === 'workspace'),
      external: (mapData?.dependencies || []).filter(d => d.type === 'external'),
      dependents: mapData?.dependents || [],
      totalDependencies: (mapData?.dependencies || []).length,
      totalDependents: (mapData?.dependents || []).length
    };

    // Build Info
    const buildInfo = {
      hasBuildScript: !!(pkg.packageJson?.scripts?.build),
      buildScript: pkg.packageJson?.scripts?.build || null,
      main: pkg.packageJson?.main || null,
      types: pkg.packageJson?.types || null,
      hasTypeScript: this.hasTypeScriptFiles(pkgPath),
      hasTsConfig: fs.existsSync(path.join(pkgPath, 'tsconfig.json')),
      buildStatus: this.getBuildStatus(pkgPath, pkg.packageJson),
      outputFiles: this.getOutputFiles(pkgPath, pkg.packageJson)
    };

    // Documentation
    const documentation = {
      hasReadme: fs.existsSync(path.join(pkgPath, 'README.md')),
      hasLicense: fs.existsSync(path.join(pkgPath, 'LICENSE')),
      readmeLength: this.getReadmeLength(pkgPath),
      readmeQuality: this.getReadmeQuality(pkgPath),
      hasUsageExamples: this.hasUsageExamples(pkgPath),
      documentationScore: this.calculateDocumentationScore(pkgPath)
    };

    // Issues
    const issues = {
      all: debugData?.issues || [],
      bySeverity: {
        critical: (debugData?.issues || []).filter(i => i.severity === 'critical'),
        warning: (debugData?.issues || []).filter(i => i.severity === 'warning'),
        info: (debugData?.issues || []).filter(i => i.severity === 'info')
      },
      byType: this.groupIssuesByType(debugData?.issues || []),
      total: (debugData?.issues || []).length,
      fixSuggestions: (debugData?.issues || []).map(i => i.fix).filter(Boolean)
    };

    // Quality Metrics
    const qualityMetrics = {
      codeQuality: this.calculateCodeQualityScore(pkgPath, issues.all),
      documentation: documentation.documentationScore,
      buildHealth: this.calculateBuildHealthScore(buildInfo, issues.all),
      overall: this.calculateOverallScore(pkgPath, issues.all, documentation, buildInfo)
    };

    // Improvement Suggestions
    const improvements = {
      fromExperiment: this.getExperimentLearnings(pkgName, issues.all),
      bestPractices: this.getBestPracticeSuggestions(pkgPath, issues.all),
      creativeCaliber: this.getCreativeCaliberSuggestions(pkgPath, documentation),
      codexIntegration: this.getCodexIntegrationSuggestions(codexInfo, pkgName),
      alchemical: this.getAlchemicalSuggestions(alchemicalInfo, pkg.packageJson)
    };

    return {
      ...basicInfo,
      alchemical: alchemicalInfo,
      codex: codexInfo,
      dependencies,
      build: buildInfo,
      documentation,
      issues,
      quality: qualityMetrics,
      improvements
    };
  }

  getAlchemicalName(name) {
    const clean = name.replace(/^@cathedral\//, '').replace(/-/g, ' ');
    return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  getAlchemicalElement(name) {
    const lower = name.toLowerCase();
    if (lower.includes('art') || lower.includes('fire')) return 'Fire';
    if (lower.includes('music') || lower.includes('water')) return 'Water';
    if (lower.includes('science') || lower.includes('air')) return 'Air';
    if (lower.includes('game') || lower.includes('earth')) return 'Earth';
    return 'Aether';
  }

  getAlchemicalPlanet(name) {
    const lower = name.toLowerCase();
    if (lower.includes('art')) return 'Sun';
    if (lower.includes('music')) return 'Moon';
    if (lower.includes('science')) return 'Mercury';
    if (lower.includes('game')) return 'Saturn';
    return 'Jupiter';
  }

  getAlchemicalMetal(name) {
    const lower = name.toLowerCase();
    if (lower.includes('art')) return 'Gold';
    if (lower.includes('music')) return 'Silver';
    if (lower.includes('science')) return 'Mercury';
    if (lower.includes('game')) return 'Lead';
    return 'Copper';
  }

  getAlchemicalProcess(name) {
    const lower = name.toLowerCase();
    if (lower.includes('transform') || lower.includes('fusion')) return 'Transformation (Rebis)';
    if (lower.includes('bridge') || lower.includes('connector')) return 'Conjunction (Coniunctio)';
    if (lower.includes('unified') || lower.includes('codex')) return 'Unity (Monad)';
    return 'Solve et Coagula';
  }

  getAlchemicalPrinciple(name) {
    const lower = name.toLowerCase();
    if (lower.includes('unified') || lower.includes('codex')) return 'Unity (Monad)';
    if (lower.includes('bridge') || lower.includes('connector')) return 'Conjunction (Coniunctio)';
    if (lower.includes('transform') || lower.includes('fusion')) return 'Transformation (Rebis)';
    return 'Creative Expression';
  }

  check14499Usage(pkgPath) {
    try {
      const entries = fs.readdirSync(pkgPath, { recursive: true, withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
          const filePath = path.join(entry.path, entry.name);
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            if (content.includes('144:99') || content.includes('144/99') || content.includes('CATHEDRAL_RATIO')) {
              return true;
            }
          } catch {
            // Skip
          }
        }
      }
    } catch {
      // Skip
    }
    return false;
  }

  getCodexLevel(connections) {
    if (connections.some(c => c.level === 'code')) return 'code';
    if (connections.some(c => c.level === 'data')) return 'data';
    if (connections.some(c => c.level === 'direct')) return 'direct';
    return 'none';
  }

  hasTypeScriptFiles(pkgPath) {
    try {
      const entries = fs.readdirSync(pkgPath, { recursive: true, withFileTypes: true });
      return entries.some(e => e.isFile() && (e.name.endsWith('.ts') || e.name.endsWith('.tsx')));
    } catch {
      return false;
    }
  }

  getBuildStatus(pkgPath, packageJson) {
    if (!packageJson?.scripts?.build) return 'no-build-script';
    
    const mainPath = packageJson.main ? path.join(pkgPath, packageJson.main) : null;
    if (mainPath && fs.existsSync(mainPath)) return 'built';
    return 'not-built';
  }

  getOutputFiles(pkgPath, packageJson) {
    const files = [];
    if (packageJson?.main && fs.existsSync(path.join(pkgPath, packageJson.main))) {
      files.push(packageJson.main);
    }
    if (packageJson?.types && fs.existsSync(path.join(pkgPath, packageJson.types))) {
      files.push(packageJson.types);
    }
    return files;
  }

  getReadmeLength(pkgPath) {
    const readmePath = path.join(pkgPath, 'README.md');
    if (!fs.existsSync(readmePath)) return 0;
    try {
      return fs.readFileSync(readmePath, 'utf-8').length;
    } catch {
      return 0;
    }
  }

  getReadmeQuality(pkgPath) {
    const readmePath = path.join(pkgPath, 'README.md');
    if (!fs.existsSync(readmePath)) return 'missing';
    
    try {
      const content = fs.readFileSync(readmePath, 'utf-8');
      if (content.length < 100) return 'very-short';
      if (content.length < 500) return 'short';
      if (content.includes('Installation') && content.includes('Usage')) return 'good';
      if (content.includes('Installation') || content.includes('Usage')) return 'basic';
      return 'minimal';
    } catch {
      return 'error';
    }
  }

  hasUsageExamples(pkgPath) {
    const readmePath = path.join(pkgPath, 'README.md');
    if (!fs.existsSync(readmePath)) return false;
    
    try {
      const content = fs.readFileSync(readmePath, 'utf-8');
      return content.includes('```') || content.includes('example') || content.includes('Example');
    } catch {
      return false;
    }
  }

  calculateDocumentationScore(pkgPath) {
    let score = 0;
    if (fs.existsSync(path.join(pkgPath, 'README.md'))) score += 3;
    if (fs.existsSync(path.join(pkgPath, 'LICENSE'))) score += 2;
    if (this.hasUsageExamples(pkgPath)) score += 2;
    if (this.getReadmeQuality(pkgPath) === 'good') score += 3;
    return score;
  }

  groupIssuesByType(issues) {
    const grouped = {};
    for (const issue of issues) {
      if (!grouped[issue.type]) {
        grouped[issue.type] = [];
      }
      grouped[issue.type].push(issue);
    }
    return grouped;
  }

  calculateCodeQualityScore(pkgPath, issues) {
    let score = 10;
    const criticalIssues = issues.filter(i => i.severity === 'critical' && i.type === 'typescript');
    const warningIssues = issues.filter(i => i.severity === 'warning' && (i.type === 'code-quality' || i.type === 'typescript'));
    
    score -= criticalIssues.length * 3;
    score -= warningIssues.length * 1;
    
    return Math.max(0, Math.min(10, score));
  }

  calculateBuildHealthScore(buildInfo, issues) {
    let score = 10;
    if (!buildInfo.hasBuildScript) score -= 2;
    if (buildInfo.buildStatus === 'not-built') score -= 3;
    if (buildInfo.buildStatus === 'no-build-script') score -= 5;
    
    const buildIssues = issues.filter(i => i.type === 'build');
    score -= buildIssues.filter(i => i.severity === 'critical').length * 3;
    score -= buildIssues.filter(i => i.severity === 'warning').length * 1;
    
    return Math.max(0, Math.min(10, score));
  }

  calculateOverallScore(pkgPath, issues, documentation, buildInfo) {
    const codeQuality = this.calculateCodeQualityScore(pkgPath, issues);
    const docScore = documentation.documentationScore / 10; // Normalize to 0-10
    const buildScore = this.calculateBuildHealthScore(buildInfo, issues);
    
    const criticalCount = issues.filter(i => i.severity === 'critical').length;
    const warningCount = issues.filter(i => i.severity === 'warning').length;
    
    let overall = (codeQuality + docScore + buildScore) / 3;
    overall -= criticalCount * 2;
    overall -= warningCount * 0.5;
    
    return Math.max(0, Math.min(10, overall));
  }

  getExperimentLearnings(pkgName, issues) {
    const suggestions = [];
    
    if (issues.some(i => i.type === 'package-json' && i.issue.includes('engines'))) {
      suggestions.push('Update engines to use node: * and pnpm: * for flexibility');
    }
    
    if (issues.some(i => i.type === 'typescript' && i.issue.includes('strict'))) {
      suggestions.push('Enable TypeScript strict mode for better type safety');
    }
    
    if (issues.some(i => i.type === 'documentation' && i.issue.includes('README'))) {
      suggestions.push('Add comprehensive README with Installation and Usage sections');
    }
    
    return suggestions;
  }

  getBestPracticeSuggestions(pkgPath, issues) {
    const suggestions = [];
    
    if (issues.some(i => i.type === 'code-quality' && i.issue.includes('any'))) {
      suggestions.push('Replace "any" types with proper TypeScript types');
    }
    
    if (issues.some(i => i.type === 'code-quality' && i.issue.includes('console.log'))) {
      suggestions.push('Remove or replace console.log with proper logging system');
    }
    
    if (issues.some(i => i.type === 'dependency' && i.issue.includes('package-lock.json'))) {
      suggestions.push('Remove package-lock.json and ensure pnpm is used');
    }
    
    return suggestions;
  }

  getCreativeCaliberSuggestions(pkgPath, documentation) {
    const suggestions = [];
    
    if (documentation.readmeQuality === 'minimal' || documentation.readmeQuality === 'very-short') {
      suggestions.push('Elevate README to literary quality (Le Guin & Brom level)');
    }
    
    if (!documentation.hasUsageExamples) {
      suggestions.push('Add usage examples with poetic precision');
    }
    
    return suggestions;
  }

  getCodexIntegrationSuggestions(codexInfo, pkgName) {
    const suggestions = [];
    
    if (codexInfo.integrationStatus === 'not-integrated') {
      const nameLower = pkgName.toLowerCase();
      if (nameLower.includes('codex') || nameLower.includes('144')) {
        suggestions.push('Package name suggests codex integration - add codex files or imports');
      }
    }
    
    if (!codexInfo.uses14499Ratio && codexInfo.integrationStatus === 'integrated') {
      suggestions.push('Consider using 144:99 ratio in codex integration');
    }
    
    return suggestions;
  }

  getAlchemicalSuggestions(alchemicalInfo, packageJson) {
    const suggestions = [];
    
    if (!packageJson?.alchemical) {
      suggestions.push('Add alchemical labels to package.json (run: pnpm run label:alchemical)');
    }
    
    return suggestions;
  }

  generateJSONReport() {
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
        totalPackages: this.completeInfo.length,
        packagesByStatus: {
          complete: this.completeInfo.filter(p => p.status === 'complete').length,
          incomplete: this.completeInfo.filter(p => p.status === 'incomplete').length
        },
        packagesByType: {},
        averageQuality: this.completeInfo.reduce((sum, p) => sum + p.quality.overall, 0) / this.completeInfo.length,
        totalIssues: this.completeInfo.reduce((sum, p) => sum + p.issues.total, 0)
      },
      packages: this.completeInfo
    };

    // Count by type
    for (const pkg of this.completeInfo) {
      report.summary.packagesByType[pkg.type] = (report.summary.packagesByType[pkg.type] || 0) + 1;
    }

    const reportPath = path.join(BASE_DIR, 'COMPLETE_PACKAGE_INFO.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`📄 JSON report saved: COMPLETE_PACKAGE_INFO.json\n`);
  }

  generateMarkdownReport() {
    let markdown = `# ⚗️ Complete Package Information - Cathedral Ecosystem\n\n`;
    markdown += `**Alchemical Principle**: Monas Hieroglyphica - Unity in Diversity\n`;
    markdown += `**Generated**: ${new Date().toISOString()}\n`;
    markdown += `**Total Packages**: ${this.completeInfo.length}\n`;
    markdown += `**Ratio**: 144:99 (Sacred Cathedral Proportion)\n\n`;
    markdown += `---\n\n`;

    // Summary
    markdown += `## Summary\n\n`;
    markdown += `- **Total Packages**: ${this.completeInfo.length}\n`;
    markdown += `- **Complete**: ${this.completeInfo.filter(p => p.status === 'complete').length}\n`;
    markdown += `- **Incomplete**: ${this.completeInfo.filter(p => p.status === 'incomplete').length}\n`;
    markdown += `- **Average Quality Score**: ${(this.completeInfo.reduce((sum, p) => sum + p.quality.overall, 0) / this.completeInfo.length).toFixed(2)}/10\n`;
    markdown += `- **Total Issues**: ${this.completeInfo.reduce((sum, p) => sum + p.issues.total, 0)}\n\n`;
    markdown += `---\n\n`;

    // Package details
    for (const pkg of this.completeInfo) {
      markdown += `## ${pkg.alchemical.symbol} ${pkg.alchemical.alchemical} - ${pkg.name}\n\n`;
      markdown += `*In the alchemical tradition, this package serves as a vessel where mathematics, sacred geometry, and creative consciousness converge to manifest visionary works.*\n\n`;
      
      markdown += `### ⚗️ Basic Information\n\n`;
      markdown += `- **Name**: ${pkg.name}\n`;
      markdown += `- **Version**: ${pkg.version}\n`;
      markdown += `- **Description**: ${pkg.description || 'No description'}\n`;
      markdown += `- **Path**: ${pkg.path}\n`;
      markdown += `- **Workspace**: ${pkg.workspace}\n`;
      markdown += `- **Type**: ${pkg.type}\n`;
      markdown += `- **Status**: ${pkg.status}\n\n`;

      markdown += `### ⚗️ Alchemical Correspondence\n\n`;
      markdown += `*Like the philosopher's stone transforming base metals to gold, this system transforms raw data and principles into art that speaks to the deepest layers of human experience.*\n\n`;
      markdown += `- **Symbol**: ${pkg.alchemical.symbol}\n`;
      markdown += `- **Alchemical Name**: ${pkg.alchemical.alchemical}\n`;
      markdown += `- **Element**: ${pkg.alchemical.element}\n`;
      markdown += `- **Planet**: ${pkg.alchemical.planet}\n`;
      markdown += `- **Metal**: ${pkg.alchemical.metal}\n`;
      markdown += `- **Process**: ${pkg.alchemical.process}\n`;
      markdown += `- **Principle**: ${pkg.alchemical.correspondences.principle}\n`;
      markdown += `- **Ratio**: 144:99 (Sacred Cathedral Proportion)\n\n`;

      markdown += `### Codex Integration\n\n`;
      markdown += `- **Status**: ${pkg.codex.integrationStatus}\n`;
      markdown += `- **Level**: ${pkg.codex.codexLevel}\n`;
      markdown += `- **Uses 144:99 Ratio**: ${pkg.codex.uses14499Ratio ? 'Yes' : 'No'}\n`;
      markdown += `- **Connections**: ${pkg.codex.codexConnections.length}\n\n`;

      markdown += `### Dependencies\n\n`;
      markdown += `- **Workspace Dependencies**: ${pkg.dependencies.workspace.length}\n`;
      markdown += `- **External Dependencies**: ${pkg.dependencies.external.length}\n`;
      markdown += `- **Dependents**: ${pkg.dependencies.totalDependents}\n\n`;

      markdown += `### Build Information\n\n`;
      markdown += `- **Has Build Script**: ${pkg.build.hasBuildScript ? 'Yes' : 'No'}\n`;
      markdown += `- **Build Status**: ${pkg.build.buildStatus}\n`;
      markdown += `- **Has TypeScript**: ${pkg.build.hasTypeScript ? 'Yes' : 'No'}\n`;
      markdown += `- **Has tsconfig.json**: ${pkg.build.hasTsConfig ? 'Yes' : 'No'}\n\n`;

      markdown += `### Documentation\n\n`;
      markdown += `- **Has README**: ${pkg.documentation.hasReadme ? 'Yes' : 'No'}\n`;
      markdown += `- **Has LICENSE**: ${pkg.documentation.hasLicense ? 'Yes' : 'No'}\n`;
      markdown += `- **README Quality**: ${pkg.documentation.readmeQuality}\n`;
      markdown += `- **Has Usage Examples**: ${pkg.documentation.hasUsageExamples ? 'Yes' : 'No'}\n`;
      markdown += `- **Documentation Score**: ${pkg.documentation.documentationScore}/10\n\n`;

      markdown += `### Issues\n\n`;
      if (pkg.issues.total === 0) {
        markdown += `✅ No issues found!\n\n`;
      } else {
        markdown += `- **Total Issues**: ${pkg.issues.total}\n`;
        markdown += `- **Critical**: ${pkg.issues.bySeverity.critical.length}\n`;
        markdown += `- **Warnings**: ${pkg.issues.bySeverity.warning.length}\n`;
        markdown += `- **Info**: ${pkg.issues.bySeverity.info.length}\n\n`;
      }

      markdown += `### Quality Metrics\n\n`;
      markdown += `- **Code Quality**: ${pkg.quality.codeQuality.toFixed(1)}/10\n`;
      markdown += `- **Documentation**: ${pkg.quality.documentation.toFixed(1)}/10\n`;
      markdown += `- **Build Health**: ${pkg.quality.buildHealth.toFixed(1)}/10\n`;
      markdown += `- **Overall Score**: ${pkg.quality.overall.toFixed(1)}/10\n\n`;

      markdown += `### Improvement Suggestions\n\n`;
      const allSuggestions = [
        ...pkg.improvements.fromExperiment,
        ...pkg.improvements.bestPractices,
        ...pkg.improvements.creativeCaliber,
        ...pkg.improvements.codexIntegration,
        ...pkg.improvements.alchemical
      ];
      
      if (allSuggestions.length === 0) {
        markdown += `✅ No improvement suggestions - package is in excellent condition!\n\n`;
      } else {
        for (const suggestion of allSuggestions) {
          markdown += `- ${suggestion}\n`;
        }
        markdown += `\n`;
      }

      markdown += `---\n\n`;
    }

    const reportPath = path.join(BASE_DIR, 'COMPLETE_PACKAGE_INFO.md');
    fs.writeFileSync(reportPath, markdown, 'utf-8');
    console.log(`📄 Markdown report saved: COMPLETE_PACKAGE_INFO.md\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new PackageInfoGenerator();
  generator.generateAll().catch(console.error);
}

export default PackageInfoGenerator;

