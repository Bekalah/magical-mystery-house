/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Enterprise Health Map Engine
 * Comprehensive catalog and health monitoring for Cathedral ecosystem
 * Includes: packages, engines, tools, scripts, platforms, deployments, security
 */

// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import * as fs from 'fs';
// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import * as path from 'path';

export type HealthStatus = 'operational' | 'degraded' | 'error' | 'unknown';

export interface ComponentHealth {
  status: HealthStatus;
  lastChecked: number;
  errors: string[];
  warnings: string[];
  metadata: Record<string, any>;
}

export interface PackageInfo {
  name: string;
  path: string;
  version?: string;
  dependencies: string[];
  devDependencies: string[];
  health: ComponentHealth;
  buildStatus?: 'success' | 'failed' | 'not_built';
  typeCheckStatus?: 'success' | 'failed' | 'not_checked';
}

export interface EngineInfo {
  name: string;
  package: string;
  path: string;
  exports: string[];
  health: ComponentHealth;
  integrationStatus: Record<string, boolean>;
}

export interface ToolInfo {
  name: string;
  path: string;
  type: 'mjs' | 'ts' | 'sh' | 'js';
  executable: boolean;
  health: ComponentHealth;
  dependencies: string[];
}

export interface ScriptInfo {
  name: string;
  path: string;
  type: 'ts' | 'mjs' | 'sh' | 'js';
  health: ComponentHealth;
  dependencies: string[];
}

export interface PlatformInfo {
  name: string;
  type: 'github' | 'vercel' | 'custom' | 'local';
  url?: string;
  status: HealthStatus;
  deployments: DeploymentInfo[];
  health: ComponentHealth;
}

export interface DeploymentInfo {
  name: string;
  platform: string;
  environment: 'production' | 'staging' | 'development';
  url?: string;
  status: HealthStatus;
  lastDeployed?: number;
  version?: string;
  health: ComponentHealth;
}

export interface SecurityInfo {
  package: string;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  outdatedPackages: string[];
  securityConfig: {
    npmrcExists: boolean;
    securitySettings: Record<string, any>;
  };
  health: ComponentHealth;
}

export interface HealthMap {
  timestamp: number;
  packages: PackageInfo[];
  engines: EngineInfo[];
  tools: ToolInfo[];
  scripts: ScriptInfo[];
  platforms: PlatformInfo[];
  deployments: DeploymentInfo[];
  security: SecurityInfo[];
  dependencyGraph: Record<string, string[]>;
  overallHealth: HealthStatus;
}

export class HealthMapEngine {
  private baseDir: string;
  private packagesDir: string;
  private toolsDir: string;
  private scriptsDir: string;

  // @ts-expect-error - process is available in Node.js runtime
  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
    this.packagesDir = path.join(baseDir, 'packages');
    this.toolsDir = path.join(baseDir, 'tools');
    this.scriptsDir = path.join(baseDir, 'scripts');
  }

  /**
   * Generate comprehensive health map
   */
  public async generateHealthMap(): Promise<HealthMap> {
    const packages = await this.discoverPackages();
    const engines = await this.discoverEngines(packages);
    const tools = await this.discoverTools();
    const scripts = await this.discoverScripts();
    const platforms = await this.discoverPlatforms();
    const deployments = await this.discoverDeployments(platforms);
    const security = await this.discoverSecurity(packages);
    const dependencyGraph = this.buildDependencyGraph(packages);
    const overallHealth = this.calculateOverallHealth(packages, engines, tools, scripts, platforms, deployments, security);

    return {
      timestamp: Date.now(),
      packages,
      engines,
      tools,
      scripts,
      platforms,
      deployments,
      security,
      dependencyGraph,
      overallHealth
    };
  }

  /**
   * Discover all packages in monorepo
   */
  private async discoverPackages(): Promise<PackageInfo[]> {
    const packages: PackageInfo[] = [];
    
    if (!fs.existsSync(this.packagesDir)) {
      return packages;
    }

    // Compatible with Node 14+ (MacBook Air 2017 era)
    let packageDirs: string[];
    try {
      const entries = fs.readdirSync(this.packagesDir, { withFileTypes: true });
      packageDirs = entries
        .filter((dirent: any) => dirent.isDirectory())
        .map((dirent: any) => dirent.name);
    } catch {
      // Fallback for very old Node versions
      const names = fs.readdirSync(this.packagesDir);
      packageDirs = names.filter((name: string) => {
        const fullPath = path.join(this.packagesDir, name);
        try {
          return fs.statSync(fullPath).isDirectory();
        } catch {
          return false;
        }
      });
    }

    for (const pkgName of packageDirs) {
      const pkgPath = path.join(this.packagesDir, pkgName);
      const packageJsonPath = path.join(pkgPath, 'package.json');
      
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          const health = await this.checkPackageHealth(pkgPath, packageJson);
          
          packages.push({
            name: packageJson.name || pkgName,
            path: pkgPath,
            version: packageJson.version,
            dependencies: Object.keys(packageJson.dependencies || {}),
            devDependencies: Object.keys(packageJson.devDependencies || {}),
            health,
            buildStatus: await this.checkBuildStatus(pkgPath),
            typeCheckStatus: await this.checkTypeCheckStatus(pkgPath)
          });
        } catch (error) {
          packages.push({
            name: pkgName,
            path: pkgPath,
            dependencies: [],
            devDependencies: [],
            health: {
              status: 'error',
              lastChecked: Date.now(),
              errors: [error instanceof Error ? error.message : String(error)],
              warnings: [],
              metadata: {}
            }
          });
        }
      }
    }

    return packages;
  }

  /**
   * Discover all engines in packages
   */
  private async discoverEngines(packages: PackageInfo[]): Promise<EngineInfo[]> {
    const engines: EngineInfo[] = [];
    const enginePatterns = ['*Engine.ts', '*Engine.js', '*Core.ts', '*Core.js', '*Bridge.ts', '*Bridge.js'];

    for (const pkg of packages) {
      const srcDir = path.join(pkg.path, 'src');
      const rootDir = pkg.path;

      for (const pattern of enginePatterns) {
        const files = this.findFiles(srcDir, pattern);
        const rootFiles = this.findFiles(rootDir, pattern);
        const allFiles = [...files, ...rootFiles];

        for (const filePath of allFiles) {
          const fileName = path.basename(filePath, path.extname(filePath));
          const engineName = fileName;
          
          try {
            const exports = await this.extractExports(filePath);
            const health = await this.checkEngineHealth(filePath, pkg.name);
            const integrationStatus = await this.checkEngineIntegration(filePath, pkg.name);

            engines.push({
              name: engineName,
              package: pkg.name,
              path: filePath,
              exports,
              health,
              integrationStatus
            });
          } catch (error) {
            engines.push({
              name: engineName,
              package: pkg.name,
              path: filePath,
              exports: [],
              health: {
                status: 'error',
                lastChecked: Date.now(),
                errors: [error instanceof Error ? error.message : String(error)],
                warnings: [],
                metadata: {}
              },
              integrationStatus: {}
            });
          }
        }
      }
    }

    return engines;
  }

  /**
   * Discover all tools
   */
  private async discoverTools(): Promise<ToolInfo[]> {
    const tools: ToolInfo[] = [];

    if (!fs.existsSync(this.toolsDir)) {
      return tools;
    }

    const toolFiles = fs.readdirSync(this.toolsDir)
      .filter((file: string) => /\.(mjs|ts|sh|js)$/.test(file) && !file.includes('.backup') && !file.includes('.vision-backup'));

    for (const fileName of toolFiles) {
      const filePath = path.join(this.toolsDir, fileName);
      const ext = path.extname(fileName).slice(1) as ToolInfo['type'];
      
      try {
        const health = await this.checkToolHealth(filePath);
        const dependencies = await this.extractToolDependencies(filePath);

        tools.push({
          name: fileName,
          path: filePath,
          type: ext,
          executable: fs.statSync(filePath).mode & 0o111 ? true : false,
          health,
          dependencies
        });
      } catch (error) {
        tools.push({
          name: fileName,
          path: filePath,
          type: ext,
          executable: false,
          health: {
            status: 'error',
            lastChecked: Date.now(),
            errors: [error instanceof Error ? error.message : String(error)],
            warnings: [],
            metadata: {}
          },
          dependencies: []
        });
      }
    }

    return tools;
  }

  /**
   * Discover all scripts
   */
  private async discoverScripts(): Promise<ScriptInfo[]> {
    const scripts: ScriptInfo[] = [];

    if (!fs.existsSync(this.scriptsDir)) {
      return scripts;
    }

    const scriptFiles = fs.readdirSync(this.scriptsDir)
      .filter((file: string) => /\.(ts|mjs|sh|js)$/.test(file) && !file.includes('.backup'));

    for (const fileName of scriptFiles) {
      const filePath = path.join(this.scriptsDir, fileName);
      const ext = path.extname(fileName).slice(1) as ScriptInfo['type'];
      
      try {
        const health = await this.checkScriptHealth(filePath);
        const dependencies = await this.extractScriptDependencies(filePath);

        scripts.push({
          name: fileName,
          path: filePath,
          type: ext,
          health,
          dependencies
        });
      } catch (error) {
        scripts.push({
          name: fileName,
          path: filePath,
          type: ext,
          health: {
            status: 'error',
            lastChecked: Date.now(),
            errors: [error instanceof Error ? error.message : String(error)],
            warnings: [],
            metadata: {}
          },
          dependencies: []
        });
      }
    }

    return scripts;
  }

  /**
   * Discover platforms (GitHub, Vercel, etc.)
   */
  private async discoverPlatforms(): Promise<PlatformInfo[]> {
    const platforms: PlatformInfo[] = [];

    // Check for GitHub
    if (fs.existsSync(path.join(this.baseDir, '.git'))) {
      try {
        const gitConfig = fs.readFileSync(path.join(this.baseDir, '.git', 'config'), 'utf-8');
        const githubMatch = gitConfig.match(/github\.com[\/:]([^\/]+)\/([^\.]+)/);
        
        if (githubMatch) {
          platforms.push({
            name: 'GitHub',
            type: 'github',
            url: `https://github.com/${githubMatch[1]}/${githubMatch[2]}`,
            status: 'operational',
            deployments: [],
            health: {
              status: 'operational',
              lastChecked: Date.now(),
              errors: [],
              warnings: [],
              metadata: { repo: `${githubMatch[1]}/${githubMatch[2]}` }
            }
          });
        }
      } catch (error) {
        // Silent fail
      }
    }

    // Check for Vercel
    if (fs.existsSync(path.join(this.baseDir, '.vercel'))) {
      platforms.push({
        name: 'Vercel',
        type: 'vercel',
        status: 'operational',
        deployments: [],
        health: {
          status: 'operational',
          lastChecked: Date.now(),
          errors: [],
          warnings: [],
          metadata: {}
        }
      });
    }

    // Local platform
    platforms.push({
      name: 'Local Development',
      type: 'local',
      status: 'operational',
      deployments: [],
      health: {
        status: 'operational',
        lastChecked: Date.now(),
        errors: [],
        warnings: [],
        metadata: { path: this.baseDir }
      }
    });

    return platforms;
  }

  /**
   * Discover deployments
   */
  private async discoverDeployments(platforms: PlatformInfo[]): Promise<DeploymentInfo[]> {
    const deployments: DeploymentInfo[] = [];

    for (const platform of platforms) {
      // Check for deployment configurations
      const vercelDeployments = await this.discoverVercelDeployments(platform);
      
      deployments.push(...vercelDeployments);
    }

    return deployments;
  }

  /**
   * Discover security status
   */
  private async discoverSecurity(packages: PackageInfo[]): Promise<SecurityInfo[]> {
    const security: SecurityInfo[] = [];

    for (const pkg of packages) {
      const npmrcPath = path.join(pkg.path, '.npmrc');
      
      try {
        const npmrcExists = fs.existsSync(npmrcPath);
        let securitySettings: Record<string, any> = {};

        if (npmrcExists) {
          const npmrcContent = fs.readFileSync(npmrcPath, 'utf-8');
          securitySettings = this.parseNpmrc(npmrcContent);
        }

        security.push({
          package: pkg.name,
          vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0
          },
          outdatedPackages: [],
          securityConfig: {
            npmrcExists,
            securitySettings
          },
          health: {
            status: npmrcExists ? 'operational' : 'degraded',
            lastChecked: Date.now(),
            errors: [],
            warnings: npmrcExists ? [] : ['No .npmrc file found'],
            metadata: {}
          }
        });
      } catch (error) {
        security.push({
          package: pkg.name,
          vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
          outdatedPackages: [],
          securityConfig: { npmrcExists: false, securitySettings: {} },
          health: {
            status: 'error',
            lastChecked: Date.now(),
            errors: [error instanceof Error ? error.message : String(error)],
            warnings: [],
            metadata: {}
          }
        });
      }
    }

    return security;
  }

  /**
   * Check package health
   */
  private async checkPackageHealth(pkgPath: string, packageJson: any): Promise<ComponentHealth> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for required fields
    if (!packageJson.name) warnings.push('Missing name field');
    if (!packageJson.version) warnings.push('Missing version field');

    // Check for build output
    if (packageJson.main && !fs.existsSync(path.join(pkgPath, packageJson.main))) {
      warnings.push('Main entry point not found');
    }

    return {
      status: errors.length > 0 ? 'error' : warnings.length > 0 ? 'degraded' : 'operational',
      lastChecked: Date.now(),
      errors,
      warnings,
      metadata: {
        hasMain: !!packageJson.main,
        hasTypes: !!packageJson.types,
        hasScripts: Object.keys(packageJson.scripts || {}).length
      }
    };
  }

  /**
   * Check build status
   */
  private async checkBuildStatus(pkgPath: string): Promise<'success' | 'failed' | 'not_built'> {
    const distPath = path.join(pkgPath, 'dist');
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      return files.length > 0 ? 'success' : 'not_built';
    }
    return 'not_built';
  }

  /**
   * Check type check status
   */
  private async checkTypeCheckStatus(pkgPath: string): Promise<'success' | 'failed' | 'not_checked'> {
    // This would require running tsc, which is expensive
    // For now, check if tsconfig.json exists
    const tsconfigPath = path.join(pkgPath, 'tsconfig.json');
    return fs.existsSync(tsconfigPath) ? 'not_checked' : 'not_checked';
  }

  /**
   * Check engine health
   */
  private async checkEngineHealth(enginePath: string, _packageName: string): Promise<ComponentHealth> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!fs.existsSync(enginePath)) {
      errors.push('Engine file not found');
    } else {
      const content = fs.readFileSync(enginePath, 'utf-8');
      if (!content.includes('export')) {
        warnings.push('No exports found');
      }
    }

    return {
      status: errors.length > 0 ? 'error' : warnings.length > 0 ? 'degraded' : 'operational',
      lastChecked: Date.now(),
      errors,
      warnings,
      metadata: {}
    };
  }

  /**
   * Check engine integration status
   */
  private async checkEngineIntegration(_enginePath: string, _packageName: string): Promise<Record<string, boolean>> {
    // Check which other packages import this engine
    const integrations: Record<string, boolean> = {};
    
    // This would require scanning all files for imports
    // Simplified for now
    return integrations;
  }

  /**
   * Check tool health
   */
  private async checkToolHealth(toolPath: string): Promise<ComponentHealth> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!fs.existsSync(toolPath)) {
      errors.push('Tool file not found');
    } else {
      const content = fs.readFileSync(toolPath, 'utf-8');
      if (!content.includes('#!/usr/bin/env node') && toolPath.endsWith('.mjs')) {
        warnings.push('Missing shebang');
      }
    }

    return {
      status: errors.length > 0 ? 'error' : warnings.length > 0 ? 'degraded' : 'operational',
      lastChecked: Date.now(),
      errors,
      warnings,
      metadata: {}
    };
  }

  /**
   * Check script health
   */
  private async checkScriptHealth(scriptPath: string): Promise<ComponentHealth> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!fs.existsSync(scriptPath)) {
      errors.push('Script file not found');
    }

    return {
      status: errors.length > 0 ? 'error' : 'operational',
      lastChecked: Date.now(),
      errors,
      warnings,
      metadata: {}
    };
  }

  /**
   * Extract exports from TypeScript/JavaScript file
   */
  private async extractExports(filePath: string): Promise<string[]> {
    const exports: string[] = [];
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const exportMatches = content.matchAll(/export\s+(?:default\s+)?(?:class|interface|type|const|function|enum)\s+(\w+)/g);
      
      for (const match of exportMatches) {
        exports.push(match[1]);
      }
    } catch (error) {
      // Silent fail
    }

    return exports;
  }

  /**
   * Extract tool dependencies
   */
  private async extractToolDependencies(toolPath: string): Promise<string[]> {
    const dependencies: string[] = [];
    
    try {
      const content = fs.readFileSync(toolPath, 'utf-8');
      const importMatches = content.matchAll(/import\s+(?:.*?\s+from\s+)?['"]([^'"]+)['"]/g);
      
      for (const match of importMatches) {
        dependencies.push(match[1]);
      }
    } catch (error) {
      // Silent fail
    }

    return dependencies;
  }

  /**
   * Extract script dependencies
   */
  private async extractScriptDependencies(scriptPath: string): Promise<string[]> {
    return this.extractToolDependencies(scriptPath);
  }

  /**
   * Discover Vercel deployments
   */
  private async discoverVercelDeployments(platform: PlatformInfo): Promise<DeploymentInfo[]> {
    const deployments: DeploymentInfo[] = [];
    
    if (platform.type === 'vercel' && fs.existsSync(path.join(this.baseDir, '.vercel'))) {
      // Simplified - would need to parse .vercel config
      deployments.push({
        name: 'Vercel Production',
        platform: 'Vercel',
        environment: 'production',
        status: 'operational',
        health: {
          status: 'operational',
          lastChecked: Date.now(),
          errors: [],
          warnings: [],
          metadata: {}
        }
      });
    }

    return deployments;
  }

  /**
   * Parse .npmrc file
   */
  private parseNpmrc(content: string): Record<string, any> {
    const settings: Record<string, any> = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          settings[key.trim()] = valueParts.join('=').trim();
        }
      }
    }

    return settings;
  }

  /**
   * Build dependency graph
   */
  private buildDependencyGraph(packages: PackageInfo[]): Record<string, string[]> {
    const graph: Record<string, string[]> = {};

    for (const pkg of packages) {
      const deps: string[] = [];
      
      for (const dep of pkg.dependencies) {
        // Check if dependency is a workspace package
        const workspaceDep = packages.find(p => p.name === dep);
        if (workspaceDep) {
          deps.push(workspaceDep.name);
        }
      }

      graph[pkg.name] = deps;
    }

    return graph;
  }

  /**
   * Find files matching pattern
   * Compatible with Node 14+ (MacBook Air 2017 era)
   */
  private findFiles(dir: string, pattern: string): string[] {
    const files: string[] = [];
    if (!fs.existsSync(dir)) return files;
    
    try {
      // Use withFileTypes for Node 10.10+, fallback for older versions
      let entries: any[];
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch {
        // Fallback for very old Node versions
        const names = fs.readdirSync(dir);
        entries = names.map((name: string) => {
          const fullPath = path.join(dir, name);
          const stat = fs.statSync(fullPath);
          return {
            name: name,
            isDirectory: () => stat.isDirectory(),
            isFile: () => stat.isFile()
          };
        });
      }
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const subFiles = this.findFiles(fullPath, pattern);
          files.push.apply(files, subFiles);
        } else if (entry.isFile() && this.matchesPattern(entry.name, pattern)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Silent fail
    }
    
    return files;
  }

  /**
   * Check if filename matches pattern
   */
  private matchesPattern(filename: string, pattern: string): boolean {
    // Convert glob pattern to regex
    const regexPattern = pattern
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.');
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(filename);
  }

  /**
   * Calculate overall health
   */
  private calculateOverallHealth(
    packages: PackageInfo[],
    engines: EngineInfo[],
    tools: ToolInfo[],
    scripts: ScriptInfo[],
    platforms: PlatformInfo[],
    deployments: DeploymentInfo[],
    security: SecurityInfo[]
  ): HealthStatus {
    const allComponents = [
      ...packages.map(p => p.health.status),
      ...engines.map(e => e.health.status),
      ...tools.map(t => t.health.status),
      ...scripts.map(s => s.health.status),
      ...platforms.map(p => p.health.status),
      ...deployments.map(d => d.health.status),
      ...security.map(s => s.health.status)
    ];

    if (allComponents.some(s => s === 'error')) return 'error';
    if (allComponents.some(s => s === 'degraded')) return 'degraded';
    if (allComponents.every(s => s === 'operational')) return 'operational';
    return 'unknown';
  }
}

