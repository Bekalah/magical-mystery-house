#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Partial Analyzer
 * Analyzes discovered partials to determine merge strategy
 * Documents what's missing in each partial
 * Maps relationships between partials
 * NO CHANGES - documentation only
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class PartialAnalyzer {
  constructor() {
    this.analysis = {
      partials: [],
      mergeStrategies: [],
      relationships: []
    };
  }

  async analyze() {
    console.log('🔍 Partial Analyzer - Analyzing Merge Strategy\n');
    console.log('═'.repeat(80) + '\n');

    // Load discovery report
    const discoveryPath = path.join(BASE_DIR, 'DISCOVERY_REPORT.json');
    if (!fs.existsSync(discoveryPath)) {
      console.error('❌ DISCOVERY_REPORT.json not found. Run comprehensive-discovery.mjs first.');
      process.exit(1);
    }

    const discovery = JSON.parse(fs.readFileSync(discoveryPath, 'utf-8'));

    console.log(`📋 Analyzing ${discovery.discovered.partials.length} partials...\n`);

    for (const partial of discovery.discovered.partials) {
      await this.analyzePartial(partial, discovery);
    }

    // Generate merge strategies
    this.generateMergeStrategies();

    // Generate report
    await this.generateReport();
  }

  async analyzePartial(partial, discovery) {
    console.log(`📦 Analyzing: ${partial.realName}`);

    const analysis = {
      realName: partial.realName,
      locations: [],
      missingFiles: [],
      missingDependencies: [],
      conflicts: [],
      mergeStrategy: null
    };

    // Analyze each location
    for (const location of partial.locations) {
      const locAnalysis = await this.analyzeLocation(location.path, partial.realName);
      analysis.locations.push({
        path: location.path,
        workspace: location.workspace,
        isComplete: location.isComplete,
        files: locAnalysis.files,
        dependencies: locAnalysis.dependencies,
        hasPackageJson: locAnalysis.hasPackageJson,
        hasSource: locAnalysis.hasSource,
        hasTests: locAnalysis.hasTests,
        hasDocs: locAnalysis.hasDocs
      });
    }

    // Determine what's missing
    this.determineMissing(analysis);

    // Check for conflicts
    this.checkConflicts(analysis);

    this.analysis.partials.push(analysis);
  }

  async analyzeLocation(locationPath, realName) {
    const analysis = {
      files: [],
      dependencies: [],
      hasPackageJson: false,
      hasSource: false,
      hasTests: false,
      hasDocs: false
    };

    if (!fs.existsSync(locationPath)) {
      return analysis;
    }

    // Check for package.json
    const packageJsonPath = path.join(locationPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      analysis.hasPackageJson = true;
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        analysis.dependencies = [
          ...Object.keys(pkg.dependencies || {}),
          ...Object.keys(pkg.devDependencies || {})
        ];
      } catch (e) {
        // Invalid package.json
      }
    }

    // Check for source files
    const srcPath = path.join(locationPath, 'src');
    if (fs.existsSync(srcPath)) {
      analysis.hasSource = true;
      analysis.files.push(...this.listFiles(srcPath));
    }

    // Check for tests
    const testPaths = ['test', 'tests', '__tests__', 'spec'];
    for (const testPath of testPaths) {
      const fullPath = path.join(locationPath, testPath);
      if (fs.existsSync(fullPath)) {
        analysis.hasTests = true;
        analysis.files.push(...this.listFiles(fullPath));
      }
    }

    // Check for docs
    const docPaths = ['docs', 'doc', 'README.md', 'README.txt'];
    for (const docPath of docPaths) {
      const fullPath = path.join(locationPath, docPath);
      if (fs.existsSync(fullPath)) {
        analysis.hasDocs = true;
        if (fs.statSync(fullPath).isFile()) {
          analysis.files.push(fullPath);
        } else {
          analysis.files.push(...this.listFiles(fullPath));
        }
      }
    }

    return analysis;
  }

  listFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) {
      return fileList;
    }

    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && !file.startsWith('.')) {
          this.listFiles(filePath, fileList);
        } else if (stat.isFile()) {
          fileList.push(filePath);
        }
      }
    } catch (e) {
      // Skip if can't read
    }

    return fileList;
  }

  determineMissing(analysis) {
    // Find files that exist in some locations but not others
    const allFiles = new Set();
    const locationFiles = analysis.locations.map(loc => new Set(loc.files.map(f => path.basename(f))));

    locationFiles.forEach(fileSet => {
      fileSet.forEach(file => allFiles.add(file));
    });

    // Files missing from each location
    analysis.locations.forEach((loc, index) => {
      const missing = [];
      allFiles.forEach(file => {
        if (!locationFiles[index].has(file)) {
          missing.push(file);
        }
      });
      if (missing.length > 0) {
        analysis.missingFiles.push({
          location: loc.path,
          missing: missing
        });
      }
    });

    // Dependencies missing from each location
    const allDeps = new Set();
    analysis.locations.forEach(loc => {
      loc.dependencies.forEach(dep => allDeps.add(dep));
    });

    analysis.locations.forEach((loc, index) => {
      const missing = [];
      allDeps.forEach(dep => {
        if (!loc.dependencies.includes(dep)) {
          missing.push(dep);
        }
      });
      if (missing.length > 0) {
        analysis.missingDependencies.push({
          location: loc.path,
          missing: missing
        });
      }
    });
  }

  checkConflicts(analysis) {
    // Check for conflicting package.json versions
    const versions = analysis.locations
      .filter(loc => loc.hasPackageJson)
      .map(loc => {
        try {
          const pkgPath = path.join(loc.path, 'package.json');
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
          return { location: loc.path, version: pkg.version };
        } catch (e) {
          return null;
        }
      })
      .filter(v => v !== null);

    if (versions.length > 1) {
      const uniqueVersions = new Set(versions.map(v => v.version));
      if (uniqueVersions.size > 1) {
        analysis.conflicts.push({
          type: 'version',
          description: 'Different versions in different locations',
          versions: versions
        });
      }
    }
  }

  generateMergeStrategies() {
    for (const partial of this.analysis.partials) {
      if (!partial.locations || partial.locations.length === 0) {
        continue;
      }

      // Determine primary location (most complete)
      const primary = partial.locations.reduce((best, current) => {
        const currentScore = (current.hasPackageJson ? 1 : 0) +
                           (current.hasSource ? 2 : 0) +
                           (current.hasTests ? 1 : 0) +
                           (current.hasDocs ? 1 : 0);
        const bestScore = (best.hasPackageJson ? 1 : 0) +
                         (best.hasSource ? 2 : 0) +
                         (best.hasTests ? 1 : 0) +
                         (best.hasDocs ? 1 : 0);
        return currentScore > bestScore ? current : best;
      }, partial.locations[0]);

      const mergeFrom = partial.locations.filter(loc => loc.path !== primary.path).map(loc => loc.path);
      const conflicts = partial.conflicts || [];
      const missingFiles = partial.missingFiles || [];
      const missingDependencies = partial.missingDependencies || [];

      const strategy = {
        realName: partial.realName,
        primaryLocation: primary.path,
        mergeFrom: mergeFrom,
        steps: [
          `1. Use ${path.basename(primary.path)} as primary location`,
          `2. Copy missing files from ${mergeFrom.length} other location(s)`,
          `3. Merge dependencies from all locations`,
          `4. Resolve conflicts (${conflicts.length} found)`,
          `5. Update all references to point to primary location`,
          `6. Remove duplicate locations (with backup)`
        ],
        estimatedFiles: missingFiles.reduce((sum, m) => sum + (m.missing?.length || 0), 0),
        estimatedDependencies: missingDependencies.reduce((sum, m) => sum + (m.missing?.length || 0), 0)
      };

      this.analysis.mergeStrategies.push(strategy);
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      summary: {
        totalPartials: this.analysis.partials.length,
        totalMergeStrategies: this.analysis.mergeStrategies.length,
        totalConflicts: this.analysis.partials.reduce((sum, p) => sum + p.conflicts.length, 0)
      },
      analysis: this.analysis
    };

    const reportPath = path.join(BASE_DIR, 'PARTIAL_ANALYSIS.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Analysis report saved: ${reportPath}`);

    // Markdown summary
    const md = `# Partial Analysis Report

**Generated:** ${report.timestamp}

## Summary

- **Total Partials:** ${report.summary.totalPartials}
- **Merge Strategies:** ${report.summary.totalMergeStrategies}
- **Conflicts Found:** ${report.summary.totalConflicts}

## Merge Strategies

${this.analysis.mergeStrategies.map(s => `
### ${s.realName}

- **Primary Location:** ${path.basename(s.primaryLocation)}
- **Merge From:** ${s.mergeFrom.length} location(s)
- **Estimated Files:** ${s.estimatedFiles}
- **Estimated Dependencies:** ${s.estimatedDependencies}

**Steps:**
${s.steps.map(step => `- ${step}`).join('\n')}
`).join('\n')}

---

**Note:** This is analysis only - no changes have been made.
`;

    const mdPath = path.join(BASE_DIR, 'PARTIAL_ANALYSIS.md');
    fs.writeFileSync(mdPath, md);
    console.log(`📄 Markdown summary: ${mdPath}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new PartialAnalyzer();
  analyzer.analyze().catch(console.error);
}

export default PartialAnalyzer;

