/**
 * types
 * 
 * @package @cathedral/cathedral-plugin-system
 */
/**
 * Cathedral Plugin System Types
 * Unified architecture for modular integration of sacred systems
 */

export type PluginType = 'codex-144-99' | 'liber-arcanae' | 'fusion-kink' | 'complete-system';

export interface PluginConfig {
  type: PluginType;
  enabled: boolean;
  dependencies?: string[];
  settings: { [key: string]: any };
  hooks: PluginHooks;
}

export interface PluginHooks {
  onInitialize?: () => Promise<void>;
  onActivate?: () => Promise<void>;
  onDeactivate?: () => Promise<void>;
  onDataLoad?: (data: any) => Promise<void>;
  onError?: (error: Error) => Promise<void>;
  onFusion?: (session: any) => Promise<void>;
  onSearch?: (query: any) => Promise<void>;
  onValidation?: (result: any) => Promise<void>;
}

export interface PluginMetadata {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  repository: string;
  keywords: string[];
  type: PluginType;
  dependencies: string[];
  peerDependencies: string[];
}

export interface PluginInstance {
  id: string;
  metadata: PluginMetadata;
  config: PluginConfig;
  instance: any;
  status: 'loading' | 'active' | 'inactive' | 'error';
  dependencies: string[];
  dependents: string[];
}

export interface PluginManagerConfig {
  autoLoad: boolean;
  parallelLoading: boolean;
  maxRetries: number;
  timeout: number;
  cacheEnabled: boolean;
  validationEnabled: boolean;
}

export interface PluginLoadResult {
  success: boolean;
  pluginId: string;
  error?: string;
  loadTime: number;
  dependencies: string[];
}

export interface SystemIntegration {
  codexLibrary?: any;
  liberArcanae?: any;
  fusionEngine?: any;
  sharedServices?: any;
  [key: string]: any;
}

export interface PluginContext {
  system: SystemIntegration;
  config: PluginManagerConfig;
  plugins: Map<string, PluginInstance>;
  events: EventEmitter;
  cache: Map<string, any>;
  logger: Logger;
}

export interface EventEmitter {
  on(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
  emit(event: string, ...args: any[]): void;
}

export interface Logger {
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, error?: Error, meta?: any): void;
  debug(message: string, meta?: any): void;
}

export interface PluginDependencyGraph {
  nodes: Map<string, PluginInstance>;
  edges: Map<string, string[]>;
  loadOrder: string[];
  circularDependencies: string[][];
}

export interface PluginCapabilities {
  provides: string[];
  requires: string[];
  conflicts: string[];
  enhances: string[];
}

export interface PluginAPI {
  // Core plugin management
  registerPlugin(metadata: PluginMetadata, instance: any): Promise<string>;
  unregisterPlugin(pluginId: string): Promise<void>;
  getPlugin(pluginId: string): PluginInstance | undefined;
  getAllPlugins(): PluginInstance[];

  // System integration
  getSystemIntegration(): SystemIntegration;
  setSystemIntegration(integration: Partial<SystemIntegration>): void;

  // Event system
  emit(event: string, ...args: any[]): void;
  on(event: string, listener: (...args: any[]) => void): void;

  // Data access
  getSharedData(key: string): any;
  setSharedData(key: string, value: any): void;

  // Service access
  getService(serviceName: string): any;
  registerService(serviceName: string, service: any): void;

  // Logging
  log(level: 'info' | 'warn' | 'error' | 'debug', message: string, meta?: any): void;
}

export interface ModularSystem {
  // Individual system access
  codex144: {
    getNode(id: number): any;
    getAllNodes(): any[];
    searchNodes(query: any): Promise<any[]>;
    validateSystem(): any;
    generateReport(): string;
  };

  liberArcanae: {
    getCard(id: string): any;
    getAllCards(): any[];
    searchCards(query: any): Promise<any[]>;
    createFusionSession(cards: string[], type: string): any;
    getAllFusionSessions(): any[];
    getAnalytics(): any;
  };

  fusionKink: {
    createSession(participants: string[], type: string): any;
    validateSafety(cards: any[], intensity: number): any;
    calculateCompatibility(card1: any, card2: any): number;
    generateRecommendations(cardId: string, available: any[]): string[];
  };

  // Combined operations
  crossReference: {
    findArcanaForCodexNode(nodeId: number): any[];
    findCodexNodesForArcana(cardId: string): number[];
    createFusionWithCodexNodes(cardIds: string[], nodeIds: number[]): any;
  };

  // Plugin system
  plugins: PluginAPI;
}

export interface IntegrationExample {
  name: string;
  description: string;
  type: 'game' | 'art' | 'design' | 'app' | 'research';
  systems: PluginType[];
  code: string;
  documentation: string;
  tags: string[];
}

export interface PluginTemplate {
  name: string;
  type: PluginType;
  template: string;
  description: string;
  requiredDependencies: string[];
  exampleUsage: string;
}
