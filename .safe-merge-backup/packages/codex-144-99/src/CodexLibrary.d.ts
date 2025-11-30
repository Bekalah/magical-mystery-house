/**
 * CodexLibrary
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Library System
 * Main library class for managing sacred knowledge datasets and external library connections
 */
import { CodexNode, CodexLibraryConfig, LibrarySearchQuery, LibrarySearchResult, CodexValidationResult, LibrarySyncResult, CodexAnalytics } from './types';
export declare class CodexLibrary {
    private config;
    private nodes;
    private researchSources;
    private libraryConnections;
    private validationRules;
    private cache;
    constructor(config?: Partial<CodexLibraryConfig>);
    private initializeLibrary;
    private loadNodes;
    private loadResearchSources;
    private loadLibraryConnections;
    private setupCache;
    private getDefaultLibraries;
    private getDefaultValidationRules;
    /**
     * Get a specific Codex node by ID
     */
    getNode(id: number): CodexNode | undefined;
    /**
     * Get all Codex nodes
     */
    getAllNodes(): CodexNode[];
    /**
     * Get nodes by element
     */
    getNodesByElement(element: string): CodexNode[];
    /**
     * Get nodes by chakra
     */
    getNodesByChakra(chakra: string): CodexNode[];
    /**
     * Search research sources
     */
    searchResearch(query: LibrarySearchQuery): Promise<LibrarySearchResult>;
    private generateFacets;
    /**
     * Validate Codex data integrity
     */
    validateCodex(): CodexValidationResult;
    private getNestedValue;
    private generateChecksum;
    /**
     * Sync with external libraries
     */
    syncExternalLibraries(): Promise<LibrarySyncResult[]>;
    private syncLibrary;
    private searchLibraryAPI;
    private getCodexKeywords;
    private shouldUpdateSource;
    private saveResearchSources;
    /**
     * Get library analytics
     */
    getAnalytics(): CodexAnalytics;
    private calculateTotalConnections;
    /**
     * Generate comprehensive report
     */
    generateReport(): string;
    private getElementDistribution;
}
//# sourceMappingURL=CodexLibrary.d.ts.map