/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Enterprise Debug System
 * Comprehensive error tracking and diagnostics for Cathedral ecosystem
 */

// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import * as fs from 'fs';
// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import * as path from 'path';
// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import { execSync } from 'child_process';
// @ts-expect-error - Workspace dependency, types available when packages are linked
import type { HealthMap, PackageInfo } from '@cathedral/health-map-core';

export interface TypeScriptError {
  file: string;
  line: number;
  column: number;
  code: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface BuildError {
  package: string;
  command: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  timestamp: number;
}

export interface DependencyIssue {
  package: string;
  type: 'vulnerability' | 'outdated' | 'missing' | 'conflict';
  severity: 'critical' | 'high' | 'medium' | 'low';
  name: string;
  currentVersion?: string;
  recommendedVersion?: string;
  description: string;
}

export interface RuntimeError {
  component: string;
  type: string;
  message: string;
  stack?: string;
  timestamp: number;
  context: Record<string, any>;
}

export interface PerformanceMetric {
  component: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: number;
}

export interface DebugReport {
  timestamp: number;
  typescriptErrors: TypeScriptError[];
  buildErrors: BuildError[];
  dependencyIssues: DependencyIssue[];
  runtimeErrors: RuntimeError[];
  performanceMetrics: PerformanceMetric[];
  overallStatus: 'healthy' | 'degraded' | 'critical';
  recommendations: string[];
}

export class DebugSystem {
  private baseDir: string;

  // @ts-expect-error - process is available in Node.js runtime
  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
  }

  /**
   * Generate comprehensive debug report
   */
  public async generateDebugReport(healthMap: HealthMap): Promise<DebugReport> {
    const typescriptErrors = await this.checkTypeScriptErrors(healthMap.packages);
    const buildErrors = await this.checkBuildErrors(healthMap.packages);
    const dependencyIssues = await this.checkDependencyIssues(healthMap.packages);
    const runtimeErrors: RuntimeError[] = []; // Would be populated from runtime logs
    const performanceMetrics = await this.collectPerformanceMetrics(healthMap);
    const overallStatus = this.calculateOverallStatus(typescriptErrors, buildErrors, dependencyIssues, runtimeErrors);
    const recommendations = this.generateRecommendations(typescriptErrors, buildErrors, dependencyIssues, runtimeErrors);

    return {
      timestamp: Date.now(),
      typescriptErrors,
      buildErrors,
      dependencyIssues,
      runtimeErrors,
      performanceMetrics,
      overallStatus,
      recommendations
    };
  }

  /**
   * Check TypeScript errors across all packages
   */
  private async checkTypeScriptErrors(packages: PackageInfo[]): Promise<TypeScriptError[]> {
    const errors: TypeScriptError[] = [];

    for (const pkg of packages) {
      const tsconfigPath = path.join(pkg.path, 'tsconfig.json');
      if (!fs.existsSync(tsconfigPath)) continue;

      try {
        // Run TypeScript compiler in check mode
        // Compatible with Node 14+ (MacBook Air 2017 era)
        const result = execSync(
          `npx tsc --noEmit --skipLibCheck 2>&1 || true`,
          { 
            cwd: pkg.path, 
            encoding: 'utf-8', 
            maxBuffer: 10 * 1024 * 1024,
            // Windows compatibility
            // @ts-expect-error - process is available in Node.js runtime
            shell: process.platform === 'win32' ? true : false
          }
        );

        // Parse TypeScript errors from output
        const errorLines = result.split('\n').filter((line: string) => line.includes('error TS'));
        for (const line of errorLines) {
          const match = line.match(/(.+?)\((\d+),(\d+)\): error (TS\d+): (.+)/);
          if (match) {
            errors.push({
              file: match[1].trim(),
              line: parseInt(match[2], 10),
              column: parseInt(match[3], 10),
              code: match[4],
              message: match[5],
              severity: 'error'
            });
          }
        }
      } catch (error) {
        // Silent fail - package might not have TypeScript
      }
    }

    return errors;
  }

  /**
   * Check build errors
   */
  private async checkBuildErrors(packages: PackageInfo[]): Promise<BuildError[]> {
    const errors: BuildError[] = [];

    for (const pkg of packages) {
      const packageJsonPath = path.join(pkg.path, 'package.json');
      if (!fs.existsSync(packageJsonPath)) continue;

      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (!packageJson.scripts || !packageJson.scripts.build) continue;

        try {
          execSync('pnpm run build', { 
            cwd: pkg.path, 
            stdio: 'pipe', 
            maxBuffer: 10 * 1024 * 1024,
            // Windows compatibility
            // @ts-expect-error - process is available in Node.js runtime
            shell: process.platform === 'win32' ? true : false
          });
        } catch (buildError: any) {
          errors.push({
            package: pkg.name,
            command: 'pnpm run build',
            exitCode: buildError.status || 1,
            stdout: buildError.stdout?.toString() || '',
            stderr: buildError.stderr?.toString() || buildError.message || '',
            timestamp: Date.now()
          });
        }
      } catch (error) {
        // Silent fail
      }
    }

    return errors;
  }

  /**
   * Check dependency issues
   */
  private async checkDependencyIssues(_packages: PackageInfo[]): Promise<DependencyIssue[]> {
    const issues: DependencyIssue[] = [];

    // Check for pnpm audit results
    try {
      // @ts-expect-error - process is available in Node.js runtime
      const isWindows = typeof process !== 'undefined' && process.platform === 'win32';
      const auditResult = execSync('pnpm audit --json 2>&1 || true', {
        cwd: this.baseDir,
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
        // Windows compatibility
        shell: isWindows ? true : false
      });

      try {
        const audit = JSON.parse(auditResult);
        if (audit.vulnerabilities) {
          for (const [pkgName, vuln] of Object.entries(audit.vulnerabilities)) {
            const v = vuln as any;
            issues.push({
              package: 'root',
              type: 'vulnerability',
              severity: v.severity || 'medium',
              name: pkgName,
              currentVersion: v.version,
              description: v.title || 'Security vulnerability'
            });
          }
        }
      } catch (parseError) {
        // Audit output might not be valid JSON
      }
    } catch (error) {
      // Silent fail - audit might not be available
    }

    return issues;
  }

  /**
   * Collect performance metrics
   */
  private async collectPerformanceMetrics(healthMap: HealthMap): Promise<PerformanceMetric[]> {
    const metrics: PerformanceMetric[] = [];

    // Package count
    metrics.push({
      component: 'system',
      metric: 'package_count',
      value: healthMap.packages.length,
      unit: 'packages',
      timestamp: Date.now()
    });

    // Engine count
    metrics.push({
      component: 'system',
      metric: 'engine_count',
      value: healthMap.engines.length,
      unit: 'engines',
      timestamp: Date.now()
    });

    // Tool count
    metrics.push({
      component: 'system',
      metric: 'tool_count',
      value: healthMap.tools.length,
      unit: 'tools',
      timestamp: Date.now()
    });

    // Script count
    metrics.push({
      component: 'system',
      metric: 'script_count',
      value: healthMap.scripts.length,
      unit: 'scripts',
      timestamp: Date.now()
    });

    return metrics;
  }

  /**
   * Calculate overall status
   */
  private calculateOverallStatus(
    typescriptErrors: TypeScriptError[],
    buildErrors: BuildError[],
    dependencyIssues: DependencyIssue[],
    runtimeErrors: RuntimeError[]
  ): 'healthy' | 'degraded' | 'critical' {
    const criticalIssues = dependencyIssues.filter(i => i.severity === 'critical').length;
    const highIssues = dependencyIssues.filter(i => i.severity === 'high').length;
    const buildFailures = buildErrors.length;
    const runtimeFailures = runtimeErrors.length;

    if (criticalIssues > 0 || buildFailures > 5 || runtimeFailures > 10) {
      return 'critical';
    }
    if (highIssues > 0 || buildFailures > 0 || typescriptErrors.length > 50) {
      return 'degraded';
    }
    return 'healthy';
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(
    typescriptErrors: TypeScriptError[],
    buildErrors: BuildError[],
    dependencyIssues: DependencyIssue[],
    runtimeErrors: RuntimeError[]
  ): string[] {
    const recommendations: string[] = [];

    if (typescriptErrors.length > 0) {
      recommendations.push(`Fix ${typescriptErrors.length} TypeScript errors`);
    }

    if (buildErrors.length > 0) {
      recommendations.push(`Resolve ${buildErrors.length} build failures`);
    }

    const criticalVulns = dependencyIssues.filter(i => i.type === 'vulnerability' && i.severity === 'critical').length;
    if (criticalVulns > 0) {
      recommendations.push(`Address ${criticalVulns} critical security vulnerabilities`);
    }

    if (runtimeErrors.length > 0) {
      recommendations.push(`Investigate ${runtimeErrors.length} runtime errors`);
    }

    if (recommendations.length === 0) {
      recommendations.push('System is healthy - no immediate actions required');
    }

    return recommendations;
  }
}

