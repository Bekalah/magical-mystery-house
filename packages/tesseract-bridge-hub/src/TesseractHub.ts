/**
 * Tesseract Bridge Hub - Central Orchestration System
 * 
 * Extends TesseractBridge to provide unified API for all systems:
 * - Egregore system (166+ design assistants)
 * - Codex systems (144:99, Circuitum99, Stone Grimoire, Mystery House)
 * - Improvement experiment integration
 * - Platform connections (Turbo, OpenSpec, Spec Kit)
 * - Living Library access
 * - Cross-system synchronization
 * 
 * @license CC0-1.0 - Public Domain
 */

import { TesseractBridge } from '../../tesseract-bridge-core/src/index';
// RibbonType available for future use
import { LiberArcanaeDesignMode, DesignRequest, DesignResponse } from '../../liber-arcanae-core/src/LiberArcanaeDesignMode';
import { Codex144Engine } from '../../codex-144-99-core/src/index';
// Components available for future integration
// import { Circuitum99StoryEngine } from '../../circuitum99-core/src/index';
// import { StoneGrimoireEngine } from '../../stone-grimoire-core/src/index';
// import { MysteryHouseEngine } from '../../mystery-house-core/src/index';

export interface HubHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  systems: {
    egregores: boolean;
    codexes: boolean;
    improvement: boolean;
    platforms: boolean;
    livingLibrary: boolean;
  };
  timestamp: string;
}

export interface SystemStatus {
  name: string;
  connected: boolean;
  lastSync: string;
  errorCount: number;
}

export class TesseractHub extends TesseractBridge {
  private designMode: LiberArcanaeDesignMode;
  private codexEngine: Codex144Engine;
  private systemStatuses: Map<string, SystemStatus>;

  constructor() {
    super();
    this.designMode = new LiberArcanaeDesignMode();
    this.codexEngine = new Codex144Engine();
    this.systemStatuses = new Map();
    
    this.initializeSystemStatuses();
    this.designMode.switchMode('design');
  }

  private initializeSystemStatuses(): void {
    this.systemStatuses.set('egregores', {
      name: 'Egregore System',
      connected: true,
      lastSync: new Date().toISOString(),
      errorCount: 0
    });
    this.systemStatuses.set('codexes', {
      name: 'Codex Systems',
      connected: true,
      lastSync: new Date().toISOString(),
      errorCount: 0
    });
    this.systemStatuses.set('improvement', {
      name: 'Improvement Experiment',
      connected: false,
      lastSync: '',
      errorCount: 0
    });
    this.systemStatuses.set('platforms', {
      name: 'Platform Connections',
      connected: false,
      lastSync: '',
      errorCount: 0
    });
    this.systemStatuses.set('livingLibrary', {
      name: 'Living Library',
      connected: true,
      lastSync: new Date().toISOString(),
      errorCount: 0
    });
  }

  /**
   * Get hub health status
   */
  getHealth(): HubHealth {
    const systems = {
      egregores: this.systemStatuses.get('egregores')?.connected || false,
      codexes: this.systemStatuses.get('codexes')?.connected || false,
      improvement: this.systemStatuses.get('improvement')?.connected || false,
      platforms: this.systemStatuses.get('platforms')?.connected || false,
      livingLibrary: this.systemStatuses.get('livingLibrary')?.connected || false
    };

    const allConnected = Object.values(systems).every(v => v);
    const anyConnected = Object.values(systems).some(v => v);

    let status: 'healthy' | 'degraded' | 'unhealthy';
    if (allConnected) {
      status = 'healthy';
    } else if (anyConnected) {
      status = 'degraded';
    } else {
      status = 'unhealthy';
    }

    return {
      status,
      systems,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Consult egregores for design assistance
   */
  consultEgregores(request: DesignRequest): DesignResponse | null {
    try {
      const response = this.designMode.requestDesignAssistance(request);
      if (response && response.length > 0) {
        return response[0];
      }
      return null;
    } catch (error) {
      this.incrementErrorCount('egregores');
      return null;
    }
  }

  /**
   * Query codex data
   */
  queryCodex(nodeIndex: number): any {
    try {
      return this.codexEngine.getNode(nodeIndex);
    } catch (error) {
      this.incrementErrorCount('codexes');
      return null;
    }
  }

  // Available for future use
  // /**
  //  * Get Circuitum99 engine (from parent)
  //  */
  // private getCircuitum99(): Circuitum99StoryEngine {
  //   // Access through parent's synchronize method or create new instance
  //   return new Circuitum99StoryEngine();
  // }

  // /**
  //  * Get Stone Grimoire engine (from parent)
  //  */
  // private getStoneGrimoire(): StoneGrimoireEngine {
  //   return new StoneGrimoireEngine();
  // }

  // /**
  //  * Get Mystery House engine (from parent)
  //  */
  // private getMysteryHouse(): MysteryHouseEngine {
  //   return new MysteryHouseEngine();
  // }

  /**
   * Query Living Library
   */
  queryLivingLibrary(query: string, domain: string): any[] {
    try {
      return this.designMode.queryLivingLibrary(query, domain);
    } catch (error) {
      this.incrementErrorCount('livingLibrary');
      return [];
    }
  }

  /**
   * Get system status
   */
  getSystemStatus(systemName: string): SystemStatus | null {
    return this.systemStatuses.get(systemName) || null;
  }

  /**
   * Get all system statuses
   */
  getAllSystemStatuses(): SystemStatus[] {
    return Array.from(this.systemStatuses.values());
  }

  /**
   * Update system status
   */
  updateSystemStatus(systemName: string, connected: boolean): void {
    const status = this.systemStatuses.get(systemName);
    if (status) {
      status.connected = connected;
      status.lastSync = new Date().toISOString();
    }
  }

  private incrementErrorCount(systemName: string): void {
    const status = this.systemStatuses.get(systemName);
    if (status) {
      status.errorCount++;
      if (status.errorCount > 10) {
        status.connected = false;
      }
    }
  }

  /**
   * Cross-system synchronization
   */
  syncSystems(sourceSystem: string, targetSystem: string, data: any): any | null {
    try {
      return this.synchronize(sourceSystem, targetSystem, data);
    } catch (error) {
      this.incrementErrorCount('codexes');
      return null;
    }
  }
}

export default TesseractHub;

