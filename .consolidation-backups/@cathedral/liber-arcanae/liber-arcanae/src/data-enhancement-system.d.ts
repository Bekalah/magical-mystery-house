/**
 * Data Enhancement System - Enhance Every Detail
 *
 * @package @cathedral/liber-arcanae
 *
 * Systematically enhances all data files with ornate details:
 * - Complete Arcana profiles
 * - Gate details
 * - Codex node connections
 * - Room integrations
 * - Fusion opportunities
 * - Learning paths
 * - Real correspondences
 * - Master art principles
 * - Sacred geometry
 * - Fractal sound art
 */
export interface DataEnhancementConfig {
    targetDirectories: string[];
    enhancementLevel: 'basic' | 'ornate' | 'master';
    preserveOriginal: boolean;
    backupBeforeEnhance: boolean;
}
export declare class DataEnhancementEngine {
    private config;
    constructor(config: DataEnhancementConfig);
    /**
     * Enhance all data files in target directories
     */
    enhanceAllData(): Promise<EnhancementReport>;
    /**
     * Enhance a directory
     */
    private enhanceDirectory;
    /**
     * Get all data files in directory
     */
    private getDataFiles;
    /**
     * Check if file is a data file
     */
    private isDataFile;
    /**
     * Enhance a single file
     */
    private enhanceFile;
    /**
     * Enhance content based on file type
     */
    private enhanceContent;
    /**
     * Enhance JSON content
     */
    private enhanceJSON;
    /**
     * Enhance JSON data object
     */
    private enhanceJSONData;
    /**
     * Enhance Arcana data
     */
    private enhanceArcanaData;
    /**
     * Enhance a single Arcana item
     */
    private enhanceArcanaItem;
    /**
     * Generate chariot details for Arcana
     */
    private generateChariotDetails;
    /**
     * Generate daimon details for Arcana
     */
    private generateDaimonDetails;
    /**
     * Generate Codex mirror for Arcana
     */
    private generateCodexMirror;
    /**
     * Generate Wilber integration
     */
    private generateWilberIntegration;
    /**
     * Generate Leary integration
     */
    private generateLearyIntegration;
    /**
     * Generate Jung integration
     */
    private generateJungIntegration;
    /**
     * Generate Regardie integration
     */
    private generateRegardieIntegration;
    /**
     * Generate fractal sound art
     */
    private generateFractalSoundArt;
    /**
     * Generate sacred geometry
     */
    private generateSacredGeometry;
    /**
     * Generate master art principles
     */
    private generateMasterArtPrinciples;
    /**
     * Generate color palette
     */
    private generateColorPalette;
    /**
     * Adjust color brightness
     */
    private adjustColor;
    /**
     * Enhance Gate data
     */
    private enhanceGateData;
    /**
     * Enhance a single Gate item
     */
    private enhanceGateItem;
    /**
     * Generate fractal sound art for gate
     */
    private generateFractalSoundArtForGate;
    /**
     * Generate chariot for gate
     */
    private generateChariotForGate;
    /**
     * Generate daimon for gate
     */
    private generateDaimonForGate;
    /**
     * Generate pathworking for gate
     */
    private generatePathworkingForGate;
    /**
     * Generate will mechanics for gate
     */
    private generateWillMechanicsForGate;
    /**
     * Enhance Codex data
     */
    private enhanceCodexData;
    /**
     * Enhance a single Codex item
     */
    private enhanceCodexItem;
    /**
     * Generate Arcana connections for Codex node
     */
    private generateArcanaConnections;
    /**
     * Generate Gate connections for Codex node
     */
    private generateGateConnections;
    /**
     * Generate room connections for Codex node
     */
    private generateRoomConnections;
    /**
     * Generate fusion opportunities for Codex node
     */
    private generateFusionOpportunities;
    /**
     * Generate learning paths for Codex node
     */
    private generateLearningPaths;
    /**
     * Generate fractal sound art for Codex node
     */
    private generateFractalSoundArtForCodex;
    /**
     * Generate sacred geometry for Codex node
     */
    private generateSacredGeometryForCodex;
    /**
     * Generate master art principles for Codex node
     */
    private generateMasterArtPrinciplesForCodex;
    /**
     * Enhance Room data
     */
    private enhanceRoomData;
    /**
     * Enhance a single Room item
     */
    private enhanceRoomItem;
    /**
     * Generate Arcana connections for room
     */
    private generateArcanaConnectionsForRoom;
    /**
     * Generate Gate connections for room
     */
    private generateGateConnectionsForRoom;
    /**
     * Generate Codex connections for room
     */
    private generateCodexConnectionsForRoom;
    /**
     * Generate mode features for room
     */
    private generateModeFeaturesForRoom;
    /**
     * Generate fusion opportunities for room
     */
    private generateFusionOpportunitiesForRoom;
    /**
     * Generate learning paths for room
     */
    private generateLearningPathsForRoom;
    /**
     * Generate real assets for room
     */
    private generateRealAssetsForRoom;
    /**
     * Generate system portals for room
     */
    private generateSystemPortalsForRoom;
    /**
     * Enhance TypeScript content
     */
    private enhanceTypeScript;
    /**
     * Backup file before enhancement
     */
    private backupFile;
}
export interface EnhancementReport {
    filesProcessed: number;
    filesEnhanced: number;
    filesCreated: number;
    errors: EnhancementError[];
    enhancements: EnhancementDetail[];
}
export interface EnhancementError {
    file: string;
    error: string;
}
export interface EnhancementDetail {
    file: string;
    type: 'enhanced' | 'created';
    details: string;
}
/**
 * Create and run data enhancement
 */
export declare function enhanceAllDataFiles(targetDirectories?: string[], enhancementLevel?: 'basic' | 'ornate' | 'master'): Promise<EnhancementReport>;
export { DataEnhancementEngine };
//# sourceMappingURL=data-enhancement-system.d.ts.map