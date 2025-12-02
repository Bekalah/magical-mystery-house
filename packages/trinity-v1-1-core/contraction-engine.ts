/**
 * 📉 CONTRACTION ENGINE
 *
 * Analyzes codebase and generates improvement opportunities.
 * PTSD-safe: Gentle analysis, constructive feedback only.
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

  private analyzeRepositories(scanResult: { repositories: any[]; totalPackages: number }): ImprovementOpportunity[] {
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
    } catch (e: any) {
      const output = e.stdout || e.stderr || '';
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

  private analyzeConnections(_scanResult: any): ImprovementOpportunity[] {
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
}

export default ContractionEngine;

