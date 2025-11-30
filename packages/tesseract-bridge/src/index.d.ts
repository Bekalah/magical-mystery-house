/**
 * index
 *
 * @package @cathedral/tesseract-bridge
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate bridge mechanics
 *
 * Creative use: Bridge apps, integration apps, data apps, sync apps
 */
/**
 * Tesseract Bridge - Cross-Repository Integration System
 * Data Synchronization and Communication Protocols
 */
export interface BridgeEndpoint {
    name: string;
    url: string;
    protocol: BridgeProtocol;
    security: SecuritySeal;
    status: 'active' | 'inactive' | 'error';
}
export interface BridgeProtocol {
    type: 'data-sync' | 'event-bridge' | 'state-management';
    version: string;
    encryption: boolean;
    compression: boolean;
}
export interface SecuritySeal {
    type: 'protection-seal' | 'provenance-tracking' | 'immutable-schema';
    enabled: boolean;
    signature?: string;
}
export interface SyncOperation {
    id: string;
    type: 'full-sync' | 'incremental' | 'event';
    source: string;
    target: string;
    data: any;
    timestamp: number;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
}
export interface BridgeEvent {
    id: string;
    type: string;
    source: string;
    data: any;
    timestamp: number;
    propagation: string[];
}
/**
 * Tesseract Bridge Engine
 * Implements cross-repository data synchronization
 */
export declare class TesseractBridge {
    private endpoints;
    private syncOperations;
    private eventListeners;
    private protectionSeals;
    constructor();
    /**
     * Initialize default bridge endpoints
     */
    private initializeDefaultEndpoints;
    /**
     * Initialize protection seals
     */
    private initializeProtectionSeals;
    /**
     * Register a new bridge endpoint
     */
    registerEndpoint(endpoint: BridgeEndpoint): boolean;
    /**
     * Validate security seal
     */
    private validateSecuritySeal;
    /**
     * Synchronize data between repositories
     */
    syncRepositories(endpoints?: string[]): Promise<SyncResult>;
    /**
     * Perform synchronization with a specific endpoint
     */
    private performSync;
    /**
     * Generate protection signature for data integrity
     */
    private generateProtectionSignature;
    /**
     * Emit an event across the bridge
     */
    emitEvent(event: BridgeEvent): void;
    /**
     * Propagate event to connected endpoints
     */
    private propagateEvent;
    /**
     * Subscribe to bridge events
     */
    subscribe(eventType: string, listener: Function): () => void;
    /**
     * Get bridge status
     */
    getBridgeStatus(): BridgeStatus;
    /**
     * Get all endpoints
     */
    getEndpoints(): BridgeEndpoint[];
    /**
     * Get sync operations
     */
    getSyncOperations(): SyncOperation[];
    /**
     * Utility function for delays
     */
    private delay;
}
/**
 * Bridge Event Manager
 * Handles event coordination across repositories
 */
export declare class BridgeEventManager {
    private bridge;
    constructor(bridge: TesseractBridge);
    /**
     * Emit a CODEX 144:99 event
     */
    emitCodexEvent(nodeId: number, eventType: string, data: any): void;
    /**
     * Emit a Circuitum99 event
     */
    emitCircuitumEvent(gateId: number, eventType: string, data: any): void;
    /**
     * Emit a Mystery House event
     */
    emitMysteryEvent(chamberId: string, eventType: string, data: any): void;
}
/**
 * Bridge Security Manager
 * Handles protection seals and security protocols
 */
export declare class BridgeSecurityManager {
    private protectionSeals;
    constructor();
    /**
     * Initialize protection seals
     */
    private initializeProtectionSeals;
    /**
     * Validate data integrity
     */
    validateData(data: any, seal: SecuritySeal): boolean;
    /**
     * Apply protection seal to data
     */
    applyProtectionSeal(data: any, sealType: SecuritySeal['type']): any;
    /**
     * Verify data provenance
     */
    verifyProvenance(data: any): boolean;
}
/**
 * Export the main Tesseract Bridge system
 */
export declare const tesseractBridge: TesseractBridge;
export declare const bridgeEventManager: BridgeEventManager;
export declare const bridgeSecurityManager: BridgeSecurityManager;
export default TesseractBridge;
export * from './creative-flow-bridge';
export { creativeFlowBridge } from './creative-flow-bridge';
export * from './art-codex-integration';
export { artCodexIntegration } from './art-codex-integration';
export interface BridgeStatus {
    totalEndpoints: number;
    activeEndpoints: number;
    totalOperations: number;
    protectionSeals: number;
    timestamp: number;
}
export interface SyncResult {
    success: boolean;
    operations: SyncOperation[];
    timestamp: number;
}
//# sourceMappingURL=index.d.ts.map