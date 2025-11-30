/**
 * Tesseract Bridge - Integration System
 *
 * 7-Ribbon System connecting all Trinity components:
 * RESEARCH • GAME • FUSION_KINK • PSYCH • CRAFT • ESOTERIC • SCIENCE
 *
 * Provides seamless consciousness integration between:
 * - SOUL: Circuitum99 (99 gates)
 * - BODY: Stone Grimoire (8 chapels, 144 folios)
 * - SPIRIT: Codex 144:99 (144 nodes, 99 depths)
 *
 * @license CC0-1.0 - Public Domain
 */
export type RibbonType = 'RESEARCH' | 'GAME' | 'FUSION_KINK' | 'PSYCH' | 'CRAFT' | 'ESOTERIC' | 'SCIENCE';
export interface Ribbon {
    type: RibbonType;
    nodeRanges: number[][];
    systemConnections: string[];
    function: string;
    status: 'ACTIVE' | 'WARMING_UP' | 'AWAKENING' | 'CONSENT_REQUIRED';
    syncRules: SyncRule[];
}
export interface SyncRule {
    sourceSystem: string;
    targetSystem: string;
    mapping: (data: any) => any;
    validation: (data: any) => boolean;
}
export interface CrossSystemSync {
    codexToCircuitum: SyncRule;
    codexToGrimoire: SyncRule;
    codexToMystery: SyncRule;
    circuitumToGrimoire: SyncRule;
    circuitumToMystery: SyncRule;
    grimoireToMystery: SyncRule;
}
export declare class TesseractBridge {
    private ribbons;
    private syncEnabled;
    constructor();
    private initializeRibbons;
    private initializeCrossSystemSync;
    /**
     * Get ribbon by type
     */
    getRibbon(type: RibbonType): Ribbon | null;
    /**
     * Get all ribbons
     */
    getAllRibbons(): Ribbon[];
    /**
     * Synchronize data between systems
     */
    synchronize(_sourceSystem: string, _targetSystem: string, _data: any): any | null;
    /**
     * Validate mathematical compliance
     */
    validateMathematicalCompliance(data: any): {
        isValid: boolean;
        issues: string[];
    };
    /**
     * Get connected systems for a ribbon
     */
    getConnectedSystems(ribbonType: RibbonType): string[];
    /**
     * Get node ranges for a ribbon
     */
    getNodeRanges(ribbonType: RibbonType): number[][];
}
export default TesseractBridge;
//# sourceMappingURL=TesseractBridge.d.ts.map