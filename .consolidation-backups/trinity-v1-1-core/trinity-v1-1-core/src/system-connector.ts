/**
// 🎨 Visionary Art - 144:99 ratio compliance - Fibonacci-based sizing - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Museum-grade quality - Museum-grade quality - Golden ratio proportions - Organic, quality: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
 * 🔗✨ SYSTEM CONNECTOR
 *
 * Connects Trinity Architecture to real packages found in monorepo.
 * Integrates 22 Arcanae, 99 Gates, Codex, Stone Grimoire, Magical Mystery House.
 *
 * @license CC0-1.0 - Public Domain
 
 * Trauma-aware narrative (Trauma-aware narrative design) (Organic story paths) (Dynamic story transformation) (Open world story exploration) design: Gentle, supportive story elements
*/

import * as fs from 'fs';
import * as path from 'path';
import MultiRepoBackupScanner from '../../scripts/multi-repo-backup-scanner';
import type { TrinityV11State } from './TrinityV11Core';
import TrinityConnections from './connections';

export interface RealSystemConnection {
  systemType: 'arcanae' | 'gates' | 'codex' | 'grimoire' | 'mystery-house';
  packagePath: string;
  packageName: string;
  connected: boolean;
  integrationLevel: number; // 0-1
}

export class SystemConnector {
  private scanner: MultiRepoBackupScanner;
  private connections: TrinityConnections;
  private realConnections: RealSystemConnection[] = [];

  constructor() {
    this.scanner = new MultiRepoBackupScanner();
    this.connections = new TrinityConnections();
  }

  public async connectAllSystems(): Promise<RealSystemConnection[]> {
    this.scanner.scanAll(); // Scan to populate connections
    const systemConnections = this.scanner.getSystemConnections();

    // Connect 22 Arcanae
    for (const arcanaPath of systemConnections.arcanae) {
      this.realConnections.push({
        systemType: 'arcanae',
        packagePath: arcanaPath,
        packageName: this.getPackageName(arcanaPath),
        connected: true,
        integrationLevel: await this.calculateIntegrationLevel(arcanaPath, 'arcanae')
      });
    }

    // Connect 99 Gates (Circuitum99)
    for (const gatePath of systemConnections.gates) {
      this.realConnections.push({
        systemType: 'gates',
        packagePath: gatePath,
        packageName: this.getPackageName(gatePath),
        connected: true,
        integrationLevel: await this.calculateIntegrationLevel(gatePath, 'gates')
      });
    }

    // Connect Codex 144:99
    for (const codexPath of systemConnections.codex) {
      this.realConnections.push({
        systemType: 'codex',
        packagePath: codexPath,
        packageName: this.getPackageName(codexPath),
        connected: true,
        integrationLevel: await this.calculateIntegrationLevel(codexPath, 'codex')
      });
    }

    // Connect Stone Grimoire
    for (const grimoirePath of systemConnections.grimoire) {
      this.realConnections.push({
        systemType: 'grimoire',
        packagePath: grimoirePath,
        packageName: this.getPackageName(grimoirePath),
        connected: true,
        integrationLevel: await this.calculateIntegrationLevel(grimoirePath, 'grimoire')
      });
    }

    // Connect Magical Mystery House
    for (const mysteryPath of systemConnections.mysteryHouse) {
      this.realConnections.push({
        systemType: 'mystery-house',
        packagePath: mysteryPath,
        packageName: this.getPackageName(mysteryPath),
        connected: true,
        integrationLevel: await this.calculateIntegrationLevel(mysteryPath, 'mystery-house')
      });
    }

    return this.realConnections;
  }

  public async enhanceConnections(): Promise<void> {
    // Enhance connections by creating integration files
    const connections = await this.connectAllSystems();

    for (const conn of connections) {
      if (conn.connected && conn.integrationLevel < 0.8) {
        await this.createIntegrationFile(conn);
      }
    }
  }

  private getPackageName(packagePath: string): string {
    try {
      const packageJsonPath = path.join(packagePath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        return pkg.name || path.basename(packagePath);
      }
    } catch {
      // Ignore errors
    }
    return path.basename(packagePath);
  }

  private async calculateIntegrationLevel(packagePath: string, _systemType: string): Promise<number> {
    let level = 0.5; // Base level

    try {
      // Check if package has TypeScript files
      const tsFiles = this.findTypeScriptFiles(packagePath);
      if (tsFiles.length > 0) level += 0.2;

      // Check if package has exports
      const packageJsonPath = path.join(packagePath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (pkg.main || pkg.exports) level += 0.2;
        if (pkg.types) level += 0.1;
      }

      // Check for README
      if (fs.existsSync(path.join(packagePath, 'README.md'))) {
        level += 0.1;
      }
    } catch {
      // Ignore errors
    }

    return Math.min(1.0, level);
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

  private async createIntegrationFile(connection: RealSystemConnection): Promise<void> {
    const integrationDir = path.join(process.cwd(), 'packages', 'trinity-v1-1-core', 'integrations');

    try {
      if (!fs.existsSync(integrationDir)) {
        fs.mkdirSync(integrationDir, { recursive: true });
      }

      const systemType = connection.systemType;
      const integrationFile = path.join(integrationDir, `${systemType}-${path.basename(connection.packagePath)}.ts`);

      const pascalType = this.toPascalCase(systemType);
      const camelType = this.toCamelCase(systemType);

      const content = `/**
 * Integration: ${connection.packageName}
 * System: ${systemType}
 * Path: ${connection.packagePath}
 *
 * @license CC0-1.0 - Public Domain
 */

export interface ${pascalType}Integration {
  packageName: string;
  packagePath: string;
  connected: boolean;
  integrationLevel: number;
}

export const ${camelType}Integration: ${pascalType}Integration = {
  packageName: '${connection.packageName}',
  packagePath: '${connection.packagePath}',
  connected: true,
  integrationLevel: ${connection.integrationLevel}
};
`;

      fs.writeFileSync(integrationFile, content);
    } catch (e) {
      // Ignore errors
    }
  }

  private toPascalCase(str: string): string {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }

  private toCamelCase(str: string): string {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  public getConnectionSummary(): {
    total: number;
    bySystem: Record<string, number>;
    averageIntegration: number;
  } {
    const bySystem: Record<string, number> = {};
    let totalIntegration = 0;

    for (const conn of this.realConnections) {
      bySystem[conn.systemType] = (bySystem[conn.systemType] || 0) + 1;
      totalIntegration += conn.integrationLevel;
    }

    return {
      total: this.realConnections.length,
      bySystem,
      averageIntegration: this.realConnections.length > 0
        ? totalIntegration / this.realConnections.length
        : 0
    };
  }

  public integrateWithTrinityState(state: TrinityV11State): TrinityV11State {
    const updatedState = this.connections.integrateWithTrinityState(state);

    // Enhance with real connections
    const summary = this.getConnectionSummary();

    // Update consciousness based on real connections
    if (summary.total > 0) {
      updatedState.brain.consciousness_level = Math.min(
        999,
        Math.floor(updatedState.brain.consciousness_level * (1 + summary.averageIntegration * 0.1))
      );
    }

    // Update wisdom based on system connections
    updatedState.soul.wisdom_accumulation = Math.min(
      100,
      updatedState.soul.wisdom_accumulation + (summary.total * 0.1)
    );

    return updatedState;
  }
}

export default SystemConnector;

