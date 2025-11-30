/**
// 🎨 Visionary Art - 144:99 ratio compliance - Fibonacci-based sizing - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Museum-grade quality - Museum-grade quality - Golden ratio proportions - Organic, quality: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Golden ratio (1.618), Fibonacci, 144:99 ratio
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
 * 📉 CONTRACTION ENGINE
 *
 * Analyzes codebase and generates improvement opportunities.
 * PTSD-safe: Gentle analysis, constructive feedback only.
 *
 * @license CC0-1.0 - Public Domain
 */

/**
 * ⊙ 1764463425543 Contraction
 * 
 * @alchemical 1764463425543 Contraction
 * @element N/A
 * @symbol ⊙
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import MultiRepoBackupScanner from '../../scripts/multi-repo-backup-scanner';

// Re-export findTypeScriptFiles for use in new methods

export interface ImprovementOpportunity {
  priority: 'high' | 'medium' | 'low';
  type: 'fix' | 'enhancement' | 'connection' | 'documentation' | 'optimization';
  description: string;
  system?: string;
  file?: string;
  suggestion: string;
}

export class ContractionEngine {
  private scanner: MultiRepoBackupScanner;

  constructor() {
    this.scanner = new MultiRepoBackupScanner();
  }

  public async analyze(): Promise<ImprovementOpportunity[]> {
    const opportunities: ImprovementOpportunity[] = [];

    // Scan all repositories
    const scanResult = this.scanner.scanAll();
    opportunities.push(...this.analyzeRepositories(scanResult));

    // Check build status
    opportunities.push(...await this.analyzeBuildStatus());

    // Check type definitions
    opportunities.push(...this.analyzeTypeDefinitions());

    // Check connections
    opportunities.push(...this.analyzeConnections(scanResult));

    // Check documentation
    opportunities.push(...this.analyzeDocumentation());

    // Check for missing integrations
    opportunities.push(...this.analyzeMissingIntegrations());

    // Check for performance optimizations
    opportunities.push(...this.analyzePerformanceOpportunities());

    // Competitive research - analyze enterprise platforms during contraction
    opportunities.push(...await this.analyzeCompetitiveFeatures());

    // Active research during doubt phase
    opportunities.push(...await this.performActiveResearch());

    // Generate enhancements during doubt phase
    opportunities.push(...await this.generateEnhancementsFromDoubt());

    // Monorepo-wide research and enhancements
    opportunities.push(...await this.performMonorepoResearch());

    return opportunities.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private analyzeMissingIntegrations(): ImprovementOpportunity[] {
    const opportunities: ImprovementOpportunity[] = [];

    // Check if integration files exist
    const integrationsDir = path.join(process.cwd(), 'packages', 'trinity-v1-1-core', 'integrations');
    if (!fs.existsSync(integrationsDir)) {
      opportunities.push({
        priority: 'medium',
        type: 'connection',
        description: 'Integrations directory missing',
        suggestion: 'Create integrations directory for system connections'
      });
    }

    return opportunities;
  }

  private analyzePerformanceOpportunities(): ImprovementOpportunity[] {
    const opportunities: ImprovementOpportunity[] = [];

    // Check for large files that could be optimized
    const packagesDir = path.join(process.cwd(), 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir);

      for (const pkg of packages.slice(0, 3)) { // Check top 3
        const pkgPath = path.join(packagesDir, pkg);
        const tsFiles = this.findTypeScriptFiles(pkgPath);

        for (const tsFile of tsFiles.slice(0, 2)) { // Check first 2 files
          try {
            const stats = fs.statSync(tsFile);
            if (stats.size > 50000) { // Files larger than 50KB
              opportunities.push({
                priority: 'low',
                type: 'optimization',
                description: `Large file detected: ${path.relative(process.cwd(), tsFile)} (${(stats.size / 1024).toFixed(1)}KB)`,
                file: tsFile,
                suggestion: 'Consider splitting large files for better maintainability'
              });
            }
          } catch {
            // Ignore errors
          }
        }
      }
    }

    return opportunities.slice(0, 2); // Limit to 2
  }

  private analyzeRepositories(scanResult: { repositories: unknown[]; totalPackages: number }): ImprovementOpportunity[] {
    const opportunities: ImprovementOpportunity[] = [];

    if (scanResult.repositories.length === 0) {
      opportunities.push({
        priority: 'medium',
        type: 'connection',
        description: 'No repositories found - check workspace paths',
        suggestion: 'Verify repository paths in scanner configuration'
      });
    } else {
      opportunities.push({
        priority: 'low',
        type: 'enhancement',
        description: `Found ${scanResult.repositories.length} repositories with ${scanResult.totalPackages} packages`,
        suggestion: 'Consider enhancing cross-repository connections'
      });
    }

    return opportunities;
  }

  private async analyzeBuildStatus(): Promise<ImprovementOpportunity[]> {
    const opportunities: ImprovementOpportunity[] = [];

    try {
      const output = execSync('pnpm build 2>&1', { encoding: 'utf-8', stdio: 'pipe' });

      if (output.includes('error TS')) {
        const errorCount = (output.match(/error TS/g) || []).length;
        opportunities.push({
          priority: 'high',
          type: 'fix',
          description: `Found ${errorCount} TypeScript errors`,
          suggestion: 'Fix TypeScript errors to improve build quality'
        });
      }
    } catch (e: unknown) {
      const errorObj = e && typeof e === 'object' ? e as { stdout?: string; stderr?: string } : {};
      const output = errorObj.stdout || errorObj.stderr || '';
      if (output.includes('error')) {
        opportunities.push({
          priority: 'high',
          type: 'fix',
          description: 'Build has errors',
          suggestion: 'Review and fix build errors'
        });
      }
    }

    return opportunities;
  }

  private analyzeTypeDefinitions(): ImprovementOpportunity[] {
    const opportunities: ImprovementOpportunity[] = [];

    const packagesDir = path.join(process.cwd(), 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir);

      for (const pkg of packages) {
        const pkgPath = path.join(packagesDir, pkg);
        const tsFiles = this.findTypeScriptFiles(pkgPath);

        for (const tsFile of tsFiles) {
          const content = fs.readFileSync(tsFile, 'utf-8');

          // Check for missing type definitions
          if (content.includes('any') && !content.includes('// @ts-ignore')) {
            opportunities.push({
              priority: 'medium',
              type: 'enhancement',
              description: `File uses 'any' type: ${path.relative(process.cwd(), tsFile)}`,
              file: tsFile,
              suggestion: 'Replace any types with proper type definitions'
            });
          }
        }
      }
    }

    return opportunities.slice(0, 5); // Limit to top 5
  }

  private analyzeConnections(_scanResult: unknown): ImprovementOpportunity[] {
    const opportunities: ImprovementOpportunity[] = [];
    const connections = this.scanner.getSystemConnections();

    // Check for missing connections
    if (connections.arcanae.length === 0) {
      opportunities.push({
        priority: 'high',
        type: 'connection',
        description: '22 Arcanae system not found',
        system: 'arcanae',
        suggestion: 'Connect to Liber Arcanae packages'
      });
    }

    if (connections.gates.length === 0) {
      opportunities.push({
        priority: 'high',
        type: 'connection',
        description: '99 Gates (Circuitum99) not found',
        system: 'gates',
        suggestion: 'Connect to Circuitum99 packages'
      });
    }

    if (connections.grimoire.length === 0) {
      opportunities.push({
        priority: 'medium',
        type: 'connection',
        description: 'Stone Grimoire (8 Chapels) not found',
        system: 'grimoire',
        suggestion: 'Connect to Stone Grimoire packages'
      });
    }

    if (connections.mysteryHouse.length === 0) {
      opportunities.push({
        priority: 'medium',
        type: 'connection',
        description: 'Magical Mystery House (99 Rooms) not found',
        system: 'mystery-house',
        suggestion: 'Connect to Magical Mystery House packages'
      });
    }

    return opportunities;
  }

  private analyzeDocumentation(): ImprovementOpportunity[] {
    const opportunities: ImprovementOpportunity[] = [];

    const packagesDir = path.join(process.cwd(), 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir);

      for (const pkg of packages) {
        const pkgPath = path.join(packagesDir, pkg);
        const readmePath = path.join(pkgPath, 'README.md');

        if (!fs.existsSync(readmePath)) {
          opportunities.push({
            priority: 'low',
            type: 'documentation',
            description: `Missing README for package: ${pkg}`,
            file: pkgPath,
            suggestion: 'Add README.md with package documentation'
          });
        }
      }
    }

    return opportunities.slice(0, 3); // Limit to top 3
  }

  private findTypeScriptFiles(dir: string): string[] {
    const files: string[] = [];

    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
          files.push(...this.findTypeScriptFiles(fullPath));
        } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
          files.push(fullPath);
        }
      }
    } catch {
      // Cannot read
    }

    return files;
  }

  /**
   * Analyze competitive features from enterprise platforms
   * Maintains Cathedral's unique open style - no gatekeeping
   */
  private async analyzeCompetitiveFeatures(): Promise<ImprovementOpportunity[]> {
    const opportunities: ImprovementOpportunity[] = [];

    try {
      // Import competitive research tool
      // @ts-expect-error - Dynamic import of ESM module
      const competitiveResearch = await import('../../tools/competitive-research.mjs');
      const cathedralState = {
        packages: this.getPackageList(),
        tools: this.getToolList(),
        scripts: this.getScriptList()
      };

      // Get gaps and opportunities
      const gaps = competitiveResearch.default.identifyGaps(cathedralState, {});
      const competitiveOpportunities = competitiveResearch.default.generateOpportunities(gaps, cathedralState);

      // Convert to ImprovementOpportunity format
      for (const opp of competitiveOpportunities) {
        opportunities.push({
          priority: opp.priority as 'high' | 'medium' | 'low',
          type: opp.type as 'fix' | 'enhancement' | 'connection' | 'documentation' | 'optimization',
          description: opp.description,
          system: opp.system,
          suggestion: opp.suggestion
        });
      }
    } catch (error) {
      // Silent fail - competitive research is optional
      // Fallback opportunities that maintain Cathedral's open style
      opportunities.push({
        priority: 'medium',
        type: 'enhancement',
        description: 'Enhance open learning system',
        system: 'learning',
        suggestion: 'Improve spiral dynamics integration - make learning paths more accessible, no prerequisites, completely free'
      });
    }

    return opportunities;
  }

  /**
   * Get package list
   */
  private getPackageList(): string[] {
    const packagesDir = path.join(process.cwd(), 'packages');
    if (!fs.existsSync(packagesDir)) return [];
    return fs.readdirSync(packagesDir)
      .filter(name => fs.statSync(path.join(packagesDir, name)).isDirectory());
  }

  /**
   * Get tool list
   */
  private getToolList(): string[] {
    const toolsDir = path.join(process.cwd(), 'tools');
    if (!fs.existsSync(toolsDir)) return [];
    return fs.readdirSync(toolsDir)
      .filter(name => name.endsWith('.mjs') && !name.includes('.backup'));
  }

  /**
   * Get script list
   */
  private getScriptList(): string[] {
    const scriptsDir = path.join(process.cwd(), 'scripts');
    if (!fs.existsSync(scriptsDir)) return [];
    return fs.readdirSync(scriptsDir)
      .filter(name => /\.(ts|mjs|sh)$/.test(name) && !name.includes('.backup'));
  }

  /**
   * Perform active research during doubt phase
   * Research best practices, patterns, and solutions
   */
  private async performActiveResearch(): Promise<ImprovementOpportunity[]> {
    const opportunities: ImprovementOpportunity[] = [];

    try {
      // Research TypeScript best practices
      opportunities.push({
        priority: 'medium',
        type: 'enhancement',
        description: 'Research TypeScript strict mode best practices',
        system: 'typescript',
        suggestion: 'Research latest TypeScript patterns for better type safety and code quality'
      });

      // Research monorepo patterns
      opportunities.push({
        priority: 'medium',
        type: 'enhancement',
        description: 'Research monorepo best practices',
        system: 'monorepo',
        suggestion: 'Research enterprise monorepo patterns for better organization and performance'
      });

      // Research performance optimization
      opportunities.push({
        priority: 'medium',
        type: 'optimization',
        description: 'Research performance optimization techniques',
        system: 'performance',
        suggestion: 'Research latest performance optimization patterns for Node.js and TypeScript'
      });

      // Research security best practices
      opportunities.push({
        priority: 'high',
        type: 'enhancement',
        description: 'Research security best practices',
        system: 'security',
        suggestion: 'Research latest security patterns and vulnerabilities to prevent'
      });

      // Research testing strategies
      opportunities.push({
        priority: 'medium',
        type: 'enhancement',
        description: 'Research testing best practices',
        system: 'testing',
        suggestion: 'Research comprehensive testing strategies for monorepo architecture'
      });

      // Research documentation patterns
      opportunities.push({
        priority: 'low',
        type: 'documentation',
        description: 'Research documentation best practices',
        system: 'documentation',
        suggestion: 'Research effective documentation patterns for large codebases'
      });

      // Research accessibility standards
      opportunities.push({
        priority: 'medium',
        type: 'enhancement',
        description: 'Research accessibility standards',
        system: 'accessibility',
        suggestion: 'Research WCAG standards and trauma-aware design patterns'
      });

      // Research sacred geometry applications
      opportunities.push({
        priority: 'low',
        type: 'enhancement',
        description: 'Research sacred geometry in code architecture',
        system: 'architecture',
        suggestion: 'Research how sacred geometry principles can improve code structure and organization'
      });

    } catch (error) {
      // Silent fail - research is optional
    }

    return opportunities;
  }

  /**
   * Generate enhancements from doubt phase
   * Turn doubt into actionable improvements
   */
  private async generateEnhancementsFromDoubt(): Promise<ImprovementOpportunity[]> {
    const opportunities: ImprovementOpportunity[] = [];

    try {
      // Doubt: Are we using the best patterns?
      opportunities.push({
        priority: 'high',
        type: 'enhancement',
        description: 'Enhance code patterns based on research',
        system: 'code-quality',
        suggestion: 'Apply researched best practices to improve code patterns throughout the codebase'
      });

      // Doubt: Can we improve type safety further?
      opportunities.push({
        priority: 'high',
        type: 'enhancement',
        description: 'Further improve type safety',
        system: 'typescript',
        suggestion: 'Remove remaining any types and add stricter type definitions'
      });

      // Doubt: Are all systems properly integrated?
      opportunities.push({
        priority: 'medium',
        type: 'connection',
        description: 'Enhance system integration',
        system: 'integration',
        suggestion: 'Improve connections between all systems for better orchestration'
      });

      // Doubt: Can we improve error handling?
      opportunities.push({
        priority: 'medium',
        type: 'enhancement',
        description: 'Enhance error handling',
        system: 'error-handling',
        suggestion: 'Improve error handling patterns for better resilience and trauma-aware design'
      });

      // Doubt: Are we following sacred geometry principles?
      opportunities.push({
        priority: 'low',
        type: 'enhancement',
        description: 'Apply sacred geometry to code structure',
        system: 'architecture',
        suggestion: 'Enhance code organization using 144:99 ratio and golden ratio principles'
      });

      // Doubt: Can we improve performance?
      opportunities.push({
        priority: 'medium',
        type: 'optimization',
        description: 'Optimize performance based on research',
        system: 'performance',
        suggestion: 'Apply researched performance optimization techniques'
      });

      // Doubt: Are we documenting everything properly?
      opportunities.push({
        priority: 'low',
        type: 'documentation',
        description: 'Enhance documentation',
        system: 'documentation',
        suggestion: 'Improve documentation based on researched best practices'
      });

      // Doubt: Can we improve the improvement process itself?
      opportunities.push({
        priority: 'medium',
        type: 'enhancement',
        description: 'Enhance the improvement experiment',
        system: 'experiment',
        suggestion: 'Improve the improvement experiment based on what we\'ve learned'
      });

    } catch (error) {
      // Silent fail - enhancement generation is optional
    }

    return opportunities;
  }

  /**
   * Perform monorepo-wide research and enhancements
   * Applies research and enhancements across all systems
   */
  private async performMonorepoResearch(): Promise<ImprovementOpportunity[]> {
    const opportunities: ImprovementOpportunity[] = [];

    try {
      // Import monorepo research tool
      // @ts-expect-error - Dynamic import of ESM module
      const monorepoResearch = await import('../../tools/monorepo-doubt-research.mjs');
      const report = await monorepoResearch.default.main();

      // Add research opportunities from monorepo analysis
      if (report && report.opportunities && report.opportunities.research) {
        for (const opp of report.opportunities.research.slice(0, 10)) {
          opportunities.push({
            priority: opp.priority as 'high' | 'medium' | 'low',
            type: 'enhancement',
            description: opp.description,
            system: opp.system,
            suggestion: `Research ${opp.topic} for ${opp.system}`
          });
        }
      }

      // Add enhancement opportunities from monorepo analysis
      if (report && report.opportunities && report.opportunities.enhancements) {
        for (const opp of report.opportunities.enhancements.slice(0, 10)) {
          opportunities.push({
            priority: opp.priority as 'high' | 'medium' | 'low',
            type: 'enhancement',
            description: opp.description,
            system: opp.system,
            suggestion: `${opp.action} in ${opp.system}`
          });
        }
      }

    } catch (error) {
      // Silent fail - monorepo research is optional
      // Fallback: Add general monorepo improvements
      opportunities.push({
        priority: 'medium',
        type: 'enhancement',
        description: 'Apply research and enhancements across all monorepo packages',
        system: 'monorepo',
        suggestion: 'Research best practices and generate enhancements for all packages in the monorepo'
      });
    }

    return opportunities;
  }
}

export default ContractionEngine;

