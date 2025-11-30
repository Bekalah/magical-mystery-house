/**
// 🎨 Visionary Art: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Golden ratio (1.618), Fibonacci, 144:99 ratio
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
 * 🔗✨ WORKSPACE INTEGRATOR
 *
 * Integrates all workspaces and directories until they are all master updated.
 * Syncs improvements, packages, and configurations across all workspaces.
 *
 * @license CC0-1.0 - Public Domain
 */

// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import * as fs from 'fs';
// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import * as path from 'path';
// import { execSync } from 'child_process'; // Available for future use
// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import { fileURLToPath } from 'url';
// @ts-expect-error - Node.js built-in modules, types available when @types/node is installed
import { createRequire } from 'module';

// @ts-expect-error - Node.js global, types available when @types/node is installed
declare const __dirname: string;
// @ts-expect-error - Node.js global, types available when @types/node is installed
declare const process: NodeJS.Process;

// CommonJS compatibility - use a different name to avoid conflicts
// Trauma-aware: gentle, supportive, ESC exits, pause anytime
const createRequireForModule = createRequire;

interface WorkspaceInfo {
  path: string;
  name: string;
  type: 'deployment' | 'consolidated' | 'real' | 'fixed' | 'other';
  packages: string[];
  apps: string[];
  needsUpdate: boolean;
  updatePriority: 'high' | 'medium' | 'low';
  lastUpdated?: number;
}

interface IntegrationPlan {
  workspace: string;
  actions: Array<{
    type: 'sync' | 'update' | 'merge' | 'copy' | 'create';
    source?: string;
    target: string;
    description: string;
  }>;
  priority: 'high' | 'medium' | 'low';
}

export class WorkspaceIntegrator {

  // Helper to safely extract error message
 workspaces: Map<string, WorkspaceInfo> = new Map();
  private masterWorkspace: string;
  private baseDir: string;

  // Helper to safely extract error message
  private getErrorMessage(e: unknown): string {
    if (e instanceof Error) return e.message;
    if (typeof e === 'string') return e;
    return String(e);
  }

  constructor() {
    // Use fileURLToPath for proper ESM path resolution
    try {
      // @ts-expect-error - import.meta is available in ESNext modules
      const scriptPath = typeof import.meta !== 'undefined' && import.meta.url
        ? fileURLToPath(import.meta.url)
        : path.resolve(__dirname || process.cwd());
      const scriptDir = path.dirname(scriptPath);
      this.masterWorkspace = path.resolve(scriptDir, '..');
      this.baseDir = path.resolve(this.masterWorkspace, '..');
    } catch (e: unknown) {
      // Fallback for CommonJS or other contexts
      const scriptDir = process.cwd();
      this.masterWorkspace = scriptDir;
      this.baseDir = path.resolve(scriptDir, '..');
      // const errorMessage = e instanceof Error ? this.getErrorMessage(e) : String(e); // Available for logging
      // logger.warn('⚠️  Using fallback path resolution:', errorMessage);
    }

    // Validate paths exist - use process.cwd() as final fallback
    if (!fs.existsSync(this.masterWorkspace)) {
      // logger.warn(`⚠️  Master workspace not found: ${this.masterWorkspace}, using process.cwd()`);
      this.masterWorkspace = process.cwd();
      this.baseDir = path.resolve(this.masterWorkspace, '..');
    }

    // // // // // // // // // // // // // // // logger.info(`📁 Master workspace: ${this.masterWorkspace}`);
    // // // // // // // // // // // // // // // logger.info(`📁 Base directory: ${this.baseDir}`);

    try {
      this.scanWorkspaces();
    } catch (e: unknown) {
      // logger.error('❌ Error during workspace scanning:', this.getErrorMessage(e));
      // Don't throw - allow script to continue with empty workspace list
    }
  }

  private scanWorkspaces(): void {
    try {
      // cathedral-real is the MAIN repository (per CATHEDRAL_MASTER_SETUP.md)
      // cathedral-master-deployment is the deployment/integration workspace
      // Correct repositories - only actual git repos that exist
      const workspacePaths = [
        { path: path.join(this.baseDir, 'cathedral-real'), name: 'cathedral-real', type: 'real' as const, priority: 'high' },
        { path: path.join(this.baseDir, 'cathedral-fixed-clean'), name: 'cathedral-fixed-clean', type: 'fixed' as const, priority: 'high' },
        { path: path.join(this.baseDir, 'cathedral-master-deployment'), name: 'cathedral-master-deployment', type: 'deployment' as const, priority: 'high' },
        { path: path.join(this.baseDir, 'cathedral'), name: 'cathedral', type: 'other' as const, priority: 'medium' }
      ];

      let found = 0;
      for (const ws of workspacePaths) {
        try {
          if (fs.existsSync(ws.path)) {
            const info = this.analyzeWorkspace(ws.path, ws.name, ws.type);
            if (info) {
              this.workspaces.set(ws.name, info);
              found++;
              // // // // // // // // // // // // // // // logger.info(`✅ Found workspace: ${ws.name} (${info.packages.length} packages, ${info.apps.length} apps)`);
            }
          } else {
            // // // // // // // // // // // // // // // logger.info(`⚠️  Workspace not found: ${ws.path}`);
          }
        } catch (e: unknown) {
          // logger.error(`❌ Error scanning ${ws.name}:`, this.getErrorMessage(e));
        }
      }

      // // // // // // // // // // // // // // // logger.info(`📊 Total workspaces found: ${found}/${workspacePaths.length}`);
    } catch (e: unknown) {
      // logger.error('❌ Fatal error in scanWorkspaces:', this.getErrorMessage(e));
      throw e;
    }
  }

  private analyzeWorkspace(wsPath: string, name: string, type: WorkspaceInfo['type']): WorkspaceInfo | null {
    try {
      const packages: string[] = [];
      const apps: string[] = [];

      // Find packages
      const packagesDir = path.join(wsPath, 'packages');
      if (fs.existsSync(packagesDir)) {
        try {
          const entries = fs.readdirSync(packagesDir);
          for (const entry of entries) {
            try {
              const fullPath = path.join(packagesDir, entry);
              const stat = fs.statSync(fullPath);
              if (stat.isDirectory() && !entry.startsWith('.')) {
                const pkgJson = path.join(fullPath, 'package.json');
                if (fs.existsSync(pkgJson)) {
                  packages.push(entry);
                }
              }
            } catch {
              // Skip entries that can't be read
              continue;
            }
          }
        } catch {
          // Can't read packages directory
        }
      }

      // Find apps
      const appsDir = path.join(wsPath, 'apps');
      if (fs.existsSync(appsDir)) {
        try {
          const entries = fs.readdirSync(appsDir);
          for (const entry of entries) {
            try {
              const fullPath = path.join(appsDir, entry);
              const stat = fs.statSync(fullPath);
              if (stat.isDirectory() && !entry.startsWith('.')) {
                apps.push(entry);
              }
            } catch {
              // Skip entries that can't be read
              continue;
            }
          }
        } catch {
          // Can't read apps directory
        }
      }

      // Determine if needs update
      const needsUpdate = this.determineUpdateNeeded(wsPath, name);
      const updatePriority = this.determinePriority(name, type, needsUpdate);

      return {
        path: wsPath,
        name,
        type,
        packages,
        apps,
        needsUpdate,
        updatePriority
      };
    } catch (e: unknown) {
      // logger.error(`Failed to analyze workspace ${name}:`, this.getErrorMessage(e));
      return null;
    }
  }

  private determineUpdateNeeded(wsPath: string, _name: string): boolean {
    try {
      // Check if workspace has latest improvements
      const masterPackages = this.getMasterPackages();
      const wsPackages = this.getWorkspacePackages(wsPath);

      // Check for missing packages
      for (const masterPkg of masterPackages) {
        if (!wsPackages.includes(masterPkg)) {
          return true;
        }
      }

      // Check for outdated files
      const criticalFiles = [
        'packages/trinity-v1-1-core',
        'scripts/10-hour-improvement-experiment.ts',
        'package.json'
      ];

      for (const file of criticalFiles) {
        try {
          const masterFile = path.join(this.masterWorkspace, file);
          const wsFile = path.join(wsPath, file);

          if (fs.existsSync(masterFile)) {
            if (!fs.existsSync(wsFile)) {
              return true;
            }

            // Check modification time
            const masterStat = fs.statSync(masterFile);
            const wsStat = fs.statSync(wsFile);
            if (masterStat.mtime > wsStat.mtime) {
              return true;
            }
          }
        } catch (e: unknown) {
          // Skip files that can't be checked
          continue;
        }
      }

      return false;
    } catch (e: unknown) {
      // logger.warn(`Error determining update needed for ${name}: ${this.getErrorMessage(e)}`);
      // Default to needing update if we can't determine
      return true;
    }
  }

  private getMasterPackages(): string[] {
    const packagesDir = path.join(this.masterWorkspace, 'packages');
    if (!fs.existsSync(packagesDir)) {
      // logger.warn(`⚠️  Packages directory not found: ${packagesDir}`);
      return [];
    }

    const packages: string[] = [];
    try {
      const entries = fs.readdirSync(packagesDir);
      for (const entry of entries) {
        try {
          const fullPath = path.join(packagesDir, entry);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory() && !entry.startsWith('.')) {
            packages.push(entry);
          }
        } catch (e: unknown) {
          // Skip entries that can't be read
          continue;
        }
      }
    } catch (e: unknown) {
      // logger.error(`Error reading packages directory: ${this.getErrorMessage(e)}`);
    }
    return packages;
  }

  private getWorkspacePackages(wsPath: string): string[] {
    const packagesDir = path.join(wsPath, 'packages');
    if (!fs.existsSync(packagesDir)) {
      return [];
    }

    const packages: string[] = [];
    try {
      const entries = fs.readdirSync(packagesDir);
      for (const entry of entries) {
        const fullPath = path.join(packagesDir, entry);
        if (fs.statSync(fullPath).isDirectory()) {
          packages.push(entry);
        }
      }
    } catch {
      return [];
    }
    return packages;
  }

  private determinePriority(_name: string, type: WorkspaceInfo['type'], needsUpdate: boolean): 'high' | 'medium' | 'low' {
    if (!needsUpdate) {
      return 'low';
    }

    if (type === 'deployment' || type === 'consolidated') {
      return 'high';
    }

    if (type === 'real' || type === 'fixed') {
      return 'medium';
    }

    return 'low';
  }

  public generateIntegrationPlan(): IntegrationPlan[] {
    const plans: IntegrationPlan[] = [];

    for (const [name, workspace] of Array.from(this.workspaces.entries())) {
      if (!workspace.needsUpdate) {
        continue;
      }

      const actions: IntegrationPlan['actions'] = [];

      // Sync critical packages
      const masterPackages = this.getMasterPackages();
      for (const pkg of masterPackages) {
        const masterPkgPath = path.join(this.masterWorkspace, 'packages', pkg);
        const wsPkgPath = path.join(workspace.path, 'packages', pkg);

        if (fs.existsSync(masterPkgPath)) {
          if (!fs.existsSync(wsPkgPath)) {
            actions.push({
              type: 'copy',
              source: masterPkgPath,
              target: wsPkgPath,
              description: `Copy package ${pkg} to ${name}`
            });
          } else {
            actions.push({
              type: 'sync',
              source: masterPkgPath,
              target: wsPkgPath,
              description: `Sync package ${pkg} in ${name}`
            });
          }
        }
      }

      // Sync critical scripts
      const criticalScripts = [
        'scripts/10-hour-improvement-experiment.ts',
        'scripts/multi-repo-backup-scanner.ts'
      ];

      for (const script of criticalScripts) {
        const masterScript = path.join(this.masterWorkspace, script);
        const wsScript = path.join(workspace.path, script);

        if (fs.existsSync(masterScript)) {
          const scriptDir = path.dirname(wsScript);
          if (!fs.existsSync(scriptDir)) {
            fs.mkdirSync(scriptDir, { recursive: true });
          }

          actions.push({
            type: 'copy',
            source: masterScript,
            target: wsScript,
            description: `Update script ${script} in ${name}`
          });
        }
      }

      // Update package.json if needed
      const masterPkgJson = path.join(this.masterWorkspace, 'package.json');
      const wsPkgJson = path.join(workspace.path, 'package.json');

      if (fs.existsSync(masterPkgJson) && fs.existsSync(wsPkgJson)) {
        actions.push({
          type: 'merge',
          source: masterPkgJson,
          target: wsPkgJson,
          description: `Merge package.json improvements to ${name}`
        });
      }

      if (actions.length > 0) {
        plans.push({
          workspace: name,
          actions,
          priority: workspace.updatePriority
        });
      }
    }

    return plans.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  public async executeIntegration(plan: IntegrationPlan): Promise<{
    success: boolean;
    actionsCompleted: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let actionsCompleted = 0;
      // const totalActions = plan.actions.length; // Available for logging

    // Process actions with progress reporting
    for (let i = 0; i < plan.actions.length; i++) {
      const action = plan.actions[i];
      // const progress = ((i + 1) / totalActions * 100).toFixed(1); // Available for logging

      try {
        switch (action.type) {
          case 'copy':
            if (action.source && fs.existsSync(action.source)) {
              const targetDir = path.dirname(action.target);
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }

              if (fs.statSync(action.source).isDirectory()) {
                this.copyDirectory(action.source, action.target);
              } else {
                fs.copyFileSync(action.source, action.target);
              }
              actionsCompleted++;
              if (i % 10 === 0 || i === plan.actions.length - 1) {
                // // // // // // // // // // // // // // // logger.info(`   Progress: ${progress}% (${i + 1}/${totalActions})`);
              }
            }
            break;

          case 'sync':
            if (action.source && fs.existsSync(action.source)) {
              // Sync directory recursively
              this.syncDirectory(action.source, action.target);
              actionsCompleted++;
              if (i % 10 === 0 || i === plan.actions.length - 1) {
                // // // // // // // // // // // // // // // logger.info(`   Progress: ${progress}% (${i + 1}/${totalActions})`);
              }
            }
            break;

          case 'merge':
            if (action.source && action.target && fs.existsSync(action.source) && fs.existsSync(action.target)) {
              this.mergePackageJson(action.source, action.target);
              actionsCompleted++;
            }
            break;

          case 'create':
            // Create new file/directory
            const targetDir = path.dirname(action.target);
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }
            if (!fs.existsSync(action.target)) {
              fs.writeFileSync(action.target, '');
            }
            actionsCompleted++;
            break;
        }
      } catch (e: unknown) {
        errors.push(`Failed ${action.type} ${action.target}: ${this.getErrorMessage(e)}`);
      }
    }

    return {
      success: errors.length === 0,
      actionsCompleted,
      errors
    };
  }

  private copyDirectory(source: string, target: string): void {
    try {
      if (!fs.existsSync(source)) {
        // logger.warn(`Source directory does not exist: ${source}`);
        return;
      }

      const sourceStat = fs.statSync(source);
      if (!sourceStat.isDirectory()) {
        // If source is a file, copy it directly
        const targetDir = path.dirname(target);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.copyFileSync(source, target);
        return;
      }

      if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
      }

      // Batch process entries for better performance
      const entries = fs.readdirSync(source);
      const files: string[] = [];
      const dirs: string[] = [];

      // Separate files and directories (process files first for better performance)
      for (const entry of entries) {
        // Skip hidden files and build artifacts
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist' || entry === '.turbo') {
          continue;
        }

        const sourcePath = path.join(source, entry);
        if (!fs.existsSync(sourcePath)) {
          continue;
        }

        const stat = fs.statSync(sourcePath);
        if (stat.isDirectory()) {
          dirs.push(entry);
        } else {
          files.push(entry);
        }
      }

      // Process files first (faster, no recursion)
      for (const entry of files) {
        try {
          const sourcePath = path.join(source, entry);
          const targetPath = path.join(target, entry);
          const targetDir = path.dirname(targetPath);

          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          fs.copyFileSync(sourcePath, targetPath);
        } catch (e: unknown) {
          // logger.warn(`Skipping file ${entry}: ${this.getErrorMessage(e)}`);
        }
      }

      // Process directories recursively
      for (const entry of dirs) {
        try {
          const sourcePath = path.join(source, entry);
          const targetPath = path.join(target, entry);
          this.copyDirectory(sourcePath, targetPath);
        } catch (e: unknown) {
          // logger.warn(`Skipping directory ${entry}: ${this.getErrorMessage(e)}`);
        }
      }
    } catch (e: unknown) {
      // Directory copy failed, but continue
      // logger.error(`Failed to copy directory ${source} to ${target}:`, this.getErrorMessage(e));
    }
  }

  private syncDirectory(source: string, target: string): void {
    if (!fs.existsSync(source)) {
      // logger.warn(`Source does not exist: ${source}`);
      return;
    }

    const sourceStat = fs.statSync(source);

    // If source is a file, copy it directly
    if (sourceStat.isFile()) {
      const targetDir = path.dirname(target);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.copyFileSync(source, target);
      return;
    }

    // Source is a directory
    if (!fs.existsSync(target)) {
      this.copyDirectory(source, target);
      return;
    }

    // Both exist, sync recursively
    const entries = fs.readdirSync(source);
    for (const entry of entries) {
      if (entry.startsWith('.')) {
        continue; // Skip hidden files
      }

      const sourcePath = path.join(source, entry);
      const targetPath = path.join(target, entry);

      try {
        const sourceStat = fs.statSync(sourcePath);

        if (!fs.existsSync(targetPath)) {
          // Copy new files/directories
          if (sourceStat.isDirectory()) {
            this.copyDirectory(sourcePath, targetPath);
          } else {
            const targetDir = path.dirname(targetPath);
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }
            fs.copyFileSync(sourcePath, targetPath);
          }
        } else {
          // Update if source is newer
          const targetStat = fs.statSync(targetPath);

          if (sourceStat.mtime > targetStat.mtime) {
            if (sourceStat.isDirectory() && targetStat.isDirectory()) {
              this.syncDirectory(sourcePath, targetPath);
            } else if (sourceStat.isFile() && targetStat.isFile()) {
              fs.copyFileSync(sourcePath, targetPath);
            }
          }
        }
      } catch (e: unknown) {
        // logger.warn(`Failed to sync ${entry}: ${this.getErrorMessage(e)}`);
      }
    }
  }

  private mergePackageJson(masterPath: string, targetPath: string): void {
    try {
      if (!fs.existsSync(masterPath) || !fs.existsSync(targetPath)) {
        // logger.warn(`Cannot merge package.json: files don't exist`);
        return;
      }

      const masterContent = fs.readFileSync(masterPath, 'utf-8');
      const targetContent = fs.readFileSync(targetPath, 'utf-8');

      const master = JSON.parse(masterContent);
      const target = JSON.parse(targetContent);

      // Merge scripts (prefer master)
      if (master.scripts) {
        target.scripts = { ...target.scripts, ...master.scripts };
      }

      // Merge devDependencies (prefer master versions)
      if (master.devDependencies) {
        target.devDependencies = { ...target.devDependencies, ...master.devDependencies };
      }

      // Keep target's name and version
      fs.writeFileSync(targetPath, JSON.stringify(target, null, 2));
    } catch (e: unknown) {
      // logger.error(`Failed to merge package.json: ${this.getErrorMessage(e)}`);
      throw e;
    }
  }

  public buildMissingComponents(workspacePath: string): number {
    let built = 0;

    // Get master component paths
    const masterComponents = this.getMasterPackages().map(pkg => ({
      name: pkg,
      masterPath: path.join(this.masterWorkspace, 'packages', pkg),
      targetPath: path.join(workspacePath, 'packages', pkg)
    }));

    for (const component of masterComponents) {
      if (!fs.existsSync(component.targetPath)) {
        try {
          // // // // // // // // // // // // // // // logger.info(`   🔨 Building missing component: ${component.name}`);

          if (fs.existsSync(component.masterPath)) {
            // Copy from master
            this.copyDirectory(component.masterPath, component.targetPath);
            built++;
            // // // // // // // // // // // // // // // logger.info(`   ✅ Copied ${component.name} from master`);
          } else {
            // Create minimal structure
            fs.mkdirSync(component.targetPath, { recursive: true });

            // Create package.json
            const pkgJson = path.join(component.targetPath, 'package.json');
            const pkgData = {
              name: `@cathedral/${component.name}`,
              version: '1.0.0',
              main: 'dist/index.js',
              types: 'dist/index.d.ts',
              scripts: {
                build: 'tsc'
              },
              license: 'CC0-1.0'
            };
            fs.writeFileSync(pkgJson, JSON.stringify(pkgData, null, 2));

            // Create tsconfig.json
            const tsconfigPath = path.join(component.targetPath, 'tsconfig.json');
            const masterTsconfig = path.join(this.masterWorkspace, 'tsconfig.json');
            if (fs.existsSync(masterTsconfig)) {
              fs.copyFileSync(masterTsconfig, tsconfigPath);
            }

            built++;
            // // // // // // // // // // // // // // // logger.info(`   ✅ Created minimal ${component.name}`);
          }
        } catch (e: unknown) {
          // logger.error(`   ❌ Failed to build ${component.name}:`, this.getErrorMessage(e));
        }
      }
    }

    return built;
  }

  public validateIntegration(workspaceName: string): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const workspace = this.workspaces.get(workspaceName);

    if (!workspace) {
      return { valid: false, errors: [`Workspace ${workspaceName} not found`], warnings: [] };
    }

    // Validate critical packages exist
    const criticalPackages = ['trinity-v1-1-core'];
    for (const pkg of criticalPackages) {
      const pkgPath = path.join(workspace.path, 'packages', pkg);
      if (!fs.existsSync(pkgPath)) {
        errors.push(`Missing critical package: ${pkg}`);
      } else {
        const pkgJson = path.join(pkgPath, 'package.json');
        if (!fs.existsSync(pkgJson)) {
          warnings.push(`Package ${pkg} missing package.json`);
        }
      }
    }

    // Validate scripts exist
    const criticalScripts = ['scripts/10-hour-improvement-experiment.ts'];
    for (const script of criticalScripts) {
      const scriptPath = path.join(workspace.path, script);
      if (!fs.existsSync(scriptPath)) {
        warnings.push(`Missing script: ${script}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  public generateStatusReport(): string {
    const status = this.getWorkspaceStatus();

    let report = `# Workspace Integration Status\n\n`;
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += `## Workspace Summary\n\n`;

    for (const ws of status) {
      report += `### ${ws.name}\n`;
      report += `- **Type**: ${ws.type}\n`;
      report += `- **Packages**: ${ws.packages}\n`;
      report += `- **Apps**: ${ws.apps}\n`;
      report += `- **Needs Update**: ${ws.needsUpdate ? 'Yes' : 'No'}\n`;
      report += `- **Priority**: ${ws.priority}\n\n`;
    }

    const plans = this.generateIntegrationPlan();
    report += `## Integration Plans\n\n`;
    report += `Total plans: ${plans.length}\n\n`;

    for (const plan of plans) {
      report += `### ${plan.workspace}\n`;
      report += `- **Priority**: ${plan.priority}\n`;
      report += `- **Actions**: ${plan.actions.length}\n`;
      report += `\n`;
    }

    return report;
  }

  public saveStatusReport(filePath: string): void {
    const report = this.generateStatusReport();
    fs.writeFileSync(filePath, report);
    // // // // // // // // // // // // // // // logger.info(`📄 Status report saved to ${filePath}`);
  }

  public async integrateAll(): Promise<{
    totalWorkspaces: number;
    updated: number;
    skipped: number;
    built: number;
    validated: number;
    errors: string[];
  }> {
    const plans = this.generateIntegrationPlan();
    const errors: string[] = [];
    let updated = 0;
    let skipped = 0;
    let built = 0;
    let validated = 0;

    // // // // // // // // // // // // // // // logger.info(`\n🔗 Integrating ${plans.length} workspaces...\n`);

    for (const plan of plans) {
      const workspace = this.workspaces.get(plan.workspace);
      if (!workspace) continue;

      // // // // // // // // // // // // // // // logger.info(`📦 Updating ${plan.workspace} (${plan.priority} priority)...`);

      // Build missing components first
      const componentsBuilt = this.buildMissingComponents(workspace.path);
      built += componentsBuilt;

      const result = await this.executeIntegration(plan);

      if (result.success) {
        // // // // // // // // // // // // // // // logger.info(`   ✅ Completed ${result.actionsCompleted} actions`);
        updated++;

        // Validate
        const validation = this.validateIntegration(plan.workspace);
        if (validation.valid) {
          validated++;
        } else {
          errors.push(...validation.errors.map(e => `${plan.workspace}: ${e}`));
        }
      } else {
        // // // // // // // // // // // // // // // logger.info(`   ⚠️  Completed ${result.actionsCompleted} actions with ${result.errors.length} errors`);
        errors.push(...result.errors);
        updated++; // Still count as updated if some actions succeeded
      }

      // Update timestamp
      workspace.lastUpdated = Date.now();
    }

    skipped = this.workspaces.size - plans.length;

    // Save status report
    const statusPath = path.join(this.masterWorkspace, 'docs/status/workspace-integration.md');
    this.saveStatusReport(statusPath);

    return {
      totalWorkspaces: this.workspaces.size,
      updated,
      skipped,
      built,
      validated,
      errors
    };
  }

  public getWorkspaceStatus(): Array<{
    name: string;
    type: string;
    packages: number;
    apps: number;
    needsUpdate: boolean;
    priority: string;
  }> {
    return Array.from(this.workspaces.values()).map(ws => ({
      name: ws.name,
      type: ws.type,
      packages: ws.packages.length,
      apps: ws.apps.length,
      needsUpdate: ws.needsUpdate,
      priority: ws.updatePriority
    }));
  }
}

// Main entry point - check if this file is being run directly
// Support both ESM and CommonJS
let isMainModule = false;
try {
  // Check if we're in CommonJS context
  const requireFn = createRequireForModule(// @ts-expect-error - import.meta is available in ESNext modules
import.meta.url);
  if (typeof requireFn !== 'undefined' && requireFn.main) {
    isMainModule = requireFn.main === requireFn.cache[requireFn.resolve(// @ts-expect-error - import.meta is available in ESNext modules
import.meta.url)];
  }
} catch (e: unknown) {
  // Not in CommonJS context, check ESM
}
if (!isMainModule) {
  try {
    // @ts-expect-error - import.meta is available in ESNext modules
    const metaUrl = typeof import.meta !== 'undefined' && import.meta.url
      ? import.meta.url
      : '';
    const scriptPath = metaUrl ? fileURLToPath(metaUrl) : path.resolve(__dirname || process.cwd());
    isMainModule =
      process.argv[1]?.endsWith('workspace-integrator.ts') ||
      process.argv[1]?.endsWith('workspace-integrator.js') ||
      process.argv[1]?.includes(scriptPath);
  } catch (e: unknown) {
    // Fallback
    isMainModule = process.argv[1]?.includes('workspace-integrator');
  }
}

async function main() {
  try {
    // // // // // // // // // // // // // // // logger.info('🚀 Starting Workspace Integration...\n');

    const integrator = new WorkspaceIntegrator();

    // Show status
    const status = integrator.getWorkspaceStatus();
    // // // // // // // // // // // // // // // logger.info('📊 Workspace Status:');
    status.forEach(_ws => {
      // // // // // // // // // // // // // // // logger.info(`  ${ws.needsUpdate ? '⚠️' : '✅'} ${ws.name}: ${ws.packages} packages, ${ws.apps} apps`);
    });

    // Generate and show plan
    const plans = integrator.generateIntegrationPlan();
    // // // // // // // // // // // // // // // logger.info(`\n📋 Integration Plan: ${plans.length} workspaces need updates\n`);

    if (plans.length === 0) {
      // // // // // // // // // // // // // // // logger.info('✅ All workspaces are up to date!');
      return;
    }

    // Execute integration
    // // // // // // // // // // // // // // // logger.info('🔄 Executing integration...\n');
    const result = await integrator.integrateAll();

    // // // // // // // // // // // // // // // logger.info('\n📊 Integration Results:');
    // // // // // // // // // // // // // // // logger.info(`  ✅ Updated: ${result.updated} workspaces`);
    // // // // // // // // // // // // // // // logger.info(`  🔨 Built: ${result.built} components`);
    // // // // // // // // // // // // // // // logger.info(`  ✓ Validated: ${result.validated} workspaces`);

    if (result.errors.length > 0) {
      // // // // // // // // // // // // // // // logger.info(`\n⚠️  Errors (${result.errors.length}):`);
      result.errors.slice(0, 10).forEach(_e => {
        // // // // // // // // // // // // // // // logger.info(`  - ${e}`)
      });
      if (result.errors.length > 10) {
        // // // // // // // // // // // // // // // logger.info(`  ... and ${result.errors.length - 10} more`);
      }
    }

    // // // // // // // // // // // // // // // logger.info('\n✅ Integration complete!');

  } catch (e: unknown) {
    // const errorMessage = e instanceof Error ? e.message : String(e); // Available for logging
    // logger.error('❌ Fatal error:', errorMessage);
    if (e instanceof Error && e.stack) {
      // logger.error(e.stack);
    }
    process.exit(1);
  }
}

if (isMainModule) {
  main();
}

export default WorkspaceIntegrator;

