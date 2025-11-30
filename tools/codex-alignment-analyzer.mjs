#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Codex Alignment Analyzer
 * Compares discovered entities to codex requirements
 * Identifies misalignments
 * Creates alignment plan
 * NO CHANGES - documentation only
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class CodexAlignmentAnalyzer {
  constructor() {
    this.codexRequirements = this.loadCodexRequirements();
    this.alignment = {
      aligned: [],
      misaligned: [],
      missing: [],
      recommendations: []
    };
  }

  loadCodexRequirements() {
    // Load codex requirements from OpenSpec and project docs
    const requirements = {
      // Core systems from project.md
      coreSystems: [
        'codex-144-99',
        'liber-arcanae',
        'circuitum99',
        'stone-grimoire'
      ],
      // Game mechanics
      gameMechanics: [
        'fable-rpg-mechanics',
        'factions'
      ],
      // Design systems
      designSystems: [
        'japanese-design-system',
        'master-art-principles',
        'luxury-metallics-shaders'
      ],
      // Creative tools
      creativeTools: [
        'synth',
        '3d-environments',
        'art-generation-node'
      ],
      // Apps
      apps: [
        'web',
        'tarot-arena',
        'synth-lab',
        'cathedral-design-studio'
      ],
      // Naming conventions (from codex)
      namingPatterns: [
        /^@cathedral\//,  // Scoped packages
        /-core$/,         // Core packages
        /-engine$/,       // Engine packages
        /-system$/,       // System packages
      ],
      // Required structure
      requiredFiles: [
        'package.json',
        'README.md'
      ],
      // Master V1.0 standards
      masterV1Standards: {
        typescript: true,
        testing: true,
        documentation: true,
        security: true,
        traumaAware: true
      }
    };

    // Try to load from OpenSpec
    const openspecPath = path.join(BASE_DIR, 'openspec', 'project.md');
    if (fs.existsSync(openspecPath)) {
      const content = fs.readFileSync(openspecPath, 'utf-8');
      // Extract requirements from project.md
      // (This is a simplified version - can be expanded)
    }

    return requirements;
  }

  async analyze() {
    console.log('🔍 Codex Alignment Analyzer\n');
    console.log('═'.repeat(80) + '\n');

    // Load discovery report
    const discoveryPath = path.join(BASE_DIR, 'DISCOVERY_REPORT.json');
    if (!fs.existsSync(discoveryPath)) {
      console.error('❌ DISCOVERY_REPORT.json not found. Run comprehensive-discovery.mjs first.');
      process.exit(1);
    }

    const discovery = JSON.parse(fs.readFileSync(discoveryPath, 'utf-8'));

    console.log('📋 Analyzing alignment with codex requirements...\n');

    // Check core systems
    this.checkCoreSystems(discovery);

    // Check naming conventions
    this.checkNamingConventions(discovery);

    // Check structure requirements
    this.checkStructureRequirements(discovery);

    // Check Master V1.0 standards
    this.checkMasterV1Standards(discovery);

    // Generate recommendations
    this.generateRecommendations();

    // Generate report
    await this.generateReport();
  }

  checkCoreSystems(discovery) {
    console.log('🔍 Checking core systems...');

    for (const required of this.codexRequirements.coreSystems) {
      const found = [
        ...discovery.discovered.packages,
        ...discovery.discovered.engines,
        ...discovery.discovered.systems
      ].filter(e => 
        e.realName.includes(required) || 
        e.directoryName.includes(required)
      );

      if (found.length === 0) {
        this.alignment.missing.push({
          type: 'core-system',
          name: required,
          description: `Required core system "${required}" not found`
        });
      } else if (found.length > 1) {
        this.alignment.misaligned.push({
          type: 'core-system',
          name: required,
          description: `Core system "${required}" found in ${found.length} locations (needs merge)`,
          locations: found.map(f => f.path)
        });
      } else {
        const entity = found[0];
        if (!entity.isComplete) {
          this.alignment.misaligned.push({
            type: 'core-system',
            name: required,
            description: `Core system "${required}" is incomplete`,
            location: entity.path,
            issues: this.getCompletenessIssues(entity)
          });
        } else {
          this.alignment.aligned.push({
            type: 'core-system',
            name: required,
            location: entity.path,
            status: 'aligned'
          });
        }
      }
    }
  }

  checkNamingConventions(discovery) {
    console.log('🔍 Checking naming conventions...');

    const allEntities = [
      ...discovery.discovered.packages,
      ...discovery.discovered.tools,
      ...discovery.discovered.apps,
      ...discovery.discovered.engines,
      ...discovery.discovered.systems
    ];

    for (const entity of allEntities) {
      const name = entity.realName || entity.directoryName;
      let matchesPattern = false;

      for (const pattern of this.codexRequirements.namingPatterns) {
        if (pattern.test(name)) {
          matchesPattern = true;
          break;
        }
      }

      if (!matchesPattern && !name.startsWith('@')) {
        this.alignment.misaligned.push({
          type: 'naming',
          name: name,
          description: `Name "${name}" doesn't match codex naming patterns`,
          location: entity.path,
          recommendation: this.suggestName(name, entity.type)
        });
      }
    }
  }

  checkStructureRequirements(discovery) {
    console.log('🔍 Checking structure requirements...');

    const allEntities = [
      ...discovery.discovered.packages,
      ...discovery.discovered.engines,
      ...discovery.discovered.systems
    ];

    for (const entity of allEntities) {
      const missing = [];

      for (const required of this.codexRequirements.requiredFiles) {
        const filePath = path.join(entity.path, required);
        if (!fs.existsSync(filePath)) {
          missing.push(required);
        }
      }

      if (missing.length > 0) {
        this.alignment.misaligned.push({
          type: 'structure',
          name: entity.realName,
          description: `Missing required files: ${missing.join(', ')}`,
          location: entity.path,
          missing: missing
        });
      }
    }
  }

  checkMasterV1Standards(discovery) {
    console.log('🔍 Checking Master V1.0 standards...');

    const allEntities = [
      ...discovery.discovered.packages,
      ...discovery.discovered.engines,
      ...discovery.discovered.systems
    ];

    for (const entity of allEntities) {
      const issues = [];

      // Check TypeScript
      if (this.codexRequirements.masterV1Standards.typescript) {
        const tsFiles = this.findFiles(entity.path, /\.tsx?$/);
        if (tsFiles.length === 0 && entity.hasPackageJson) {
          issues.push('No TypeScript files found');
        }
      }

      // Check documentation
      if (this.codexRequirements.masterV1Standards.documentation) {
        const readmePath = path.join(entity.path, 'README.md');
        if (!fs.existsSync(readmePath)) {
          issues.push('Missing README.md');
        }
      }

      if (issues.length > 0) {
        this.alignment.misaligned.push({
          type: 'master-v1-standards',
          name: entity.realName,
          description: `Master V1.0 standards issues: ${issues.join(', ')}`,
          location: entity.path,
          issues: issues
        });
      }
    }
  }

  getCompletenessIssues(entity) {
    const issues = [];
    if (!entity.hasPackageJson) {
      issues.push('Missing package.json');
    }
    if (!entity.packageJson?.main && !entity.packageJson?.module) {
      issues.push('Missing main/module entry point');
    }
    if (!entity.packageJson?.scripts || Object.keys(entity.packageJson.scripts).length === 0) {
      issues.push('Missing scripts');
    }
    return issues;
  }

  suggestName(currentName, type) {
    // Suggest name based on codex patterns
    if (type === 'engine') {
      return currentName.endsWith('-engine') ? currentName : `${currentName}-engine`;
    }
    if (type === 'system') {
      return currentName.endsWith('-system') ? currentName : `${currentName}-system`;
    }
    if (type === 'package') {
      return currentName.startsWith('@cathedral/') ? currentName : `@cathedral/${currentName}`;
    }
    return currentName;
  }

  findFiles(dir, pattern) {
    const files = [];
    if (!fs.existsSync(dir)) {
      return files;
    }

    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        const filePath = path.join(dir, entry);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && !entry.startsWith('.')) {
          files.push(...this.findFiles(filePath, pattern));
        } else if (stat.isFile() && pattern.test(entry)) {
          files.push(filePath);
        }
      }
    } catch (e) {
      // Skip if can't read
    }

    return files;
  }

  generateRecommendations() {
    // Generate alignment recommendations
    for (const misaligned of this.alignment.misaligned) {
      const recommendation = {
        entity: misaligned.name,
        type: misaligned.type,
        issue: misaligned.description,
        fix: this.generateFix(misaligned)
      };

      this.alignment.recommendations.push(recommendation);
    }
  }

  generateFix(misaligned) {
    switch (misaligned.type) {
      case 'naming':
        return `Rename to: ${misaligned.recommendation}`;
      case 'structure':
        return `Add missing files: ${misaligned.missing.join(', ')}`;
      case 'master-v1-standards':
        return `Fix: ${misaligned.issues.join(', ')}`;
      case 'core-system':
        return `Merge ${misaligned.locations?.length || 0} locations into one complete package`;
      default:
        return 'Review and fix according to codex requirements';
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      summary: {
        aligned: this.alignment.aligned.length,
        misaligned: this.alignment.misaligned.length,
        missing: this.alignment.missing.length,
        recommendations: this.alignment.recommendations.length
      },
      alignment: this.alignment
    };

    const reportPath = path.join(BASE_DIR, 'CODEX_ALIGNMENT_PLAN.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Alignment plan saved: ${reportPath}`);

    // Markdown summary
    const md = `# Codex Alignment Plan

**Generated:** ${report.timestamp}

## Summary

- **Aligned:** ${report.summary.aligned}
- **Misaligned:** ${report.summary.misaligned}
- **Missing:** ${report.summary.missing}
- **Recommendations:** ${report.summary.recommendations}

## Missing Core Systems

${this.alignment.missing.map(m => `- **${m.name}**: ${m.description}`).join('\n') || 'None'}

## Misalignments

${this.alignment.misaligned.slice(0, 20).map(m => `- **${m.name}** (${m.type}): ${m.description}`).join('\n')}

## Recommendations

${this.alignment.recommendations.slice(0, 20).map(r => `
### ${r.entity}

- **Issue:** ${r.issue}
- **Fix:** ${r.fix}
`).join('\n')}

---

**Note:** This is analysis only - no changes have been made.
`;

    const mdPath = path.join(BASE_DIR, 'CODEX_ALIGNMENT_PLAN.md');
    fs.writeFileSync(mdPath, md);
    console.log(`📄 Markdown summary: ${mdPath}`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new CodexAlignmentAnalyzer();
  analyzer.analyze().catch(console.error);
}

export default CodexAlignmentAnalyzer;

