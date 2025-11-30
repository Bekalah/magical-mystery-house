/**
 * types
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Library System Types
 * Comprehensive type definitions for the sacred knowledge library
 */
export interface CodexNode {
    id: number;
    name: string;
    element: string;
    planet: string;
    zodiac: string;
    chakra: string;
    solfeggio: number;
    color: string;
    geometry: string;
    pigment: string;
    shem: string;
    goetia: string;
    narrative: NarrativeData;
    gameDesign: GameDesignData;
    architecture: ArchitectureData;
    symbolism: SymbolismData;
    harmonics: HarmonicsData;
}
export interface NarrativeData {
    theme: string;
    archetype: string;
    storyBeats: string[];
    dialogueStyle: string;
    keywords: string[];
}
export interface GameDesignData {
    abilityType: string;
    mechanics: string[];
    questType: string;
    rewardStyle: string;
    enemyAffinity: string;
    environmentEffect: string;
}
export interface ArchitectureData {
    spatialQuality: string;
    roomType: string;
    lighting: string;
    materials: string[];
    ambience: string;
    symbolPlacement: string;
}
export interface SymbolismData {
    primarySymbol: string;
    secondarySymbols: string[];
    geometricPattern: string;
    colorBlending: string;
}
export interface HarmonicsData {
    perfectConsonance: number[];
    consonance: number[];
    dissonance: number[];
    tritone: number[];
}
export interface LibraryConnection {
    name: string;
    type: 'academic' | 'mystical' | 'research' | 'public' | 'digital';
    url?: string;
    api?: string;
    description: string;
    accessLevel: 'public' | 'restricted' | 'premium' | 'subscription';
    subjects: string[];
    lastSync?: Date;
    status: 'active' | 'offline' | 'error';
}
export interface ResearchSource {
    id: string;
    title: string;
    author: string;
    type: 'book' | 'article' | 'manuscript' | 'website' | 'database';
    library: string;
    url?: string;
    doi?: string;
    isbn?: string;
    publicationYear: number;
    subjects: string[];
    relevance: number;
    accessLevel: 'open' | 'subscription' | 'restricted' | 'public' | 'premium';
    abstract?: string;
    keywords: string[];
}
export interface CodexLibraryConfig {
    dataPath: string;
    cachePath: string;
    externalLibraries: LibraryConnection[];
    researchSources: ResearchSource[];
    validationRules: ValidationRule[];
    syncInterval: number;
}
export interface ValidationRule {
    field: string;
    type: 'required' | 'format' | 'range' | 'reference';
    value?: any;
    message: string;
}
export interface LibrarySearchQuery {
    keywords: string[];
    nodeIds?: number[];
    subjects?: string[];
    libraries?: string[];
    dateRange?: {
        start: Date;
        end: Date;
    };
    accessLevel?: string[];
    limit?: number;
    offset?: number;
}
export interface LibrarySearchResult {
    sources: ResearchSource[];
    totalCount: number;
    facets: {
        subjects: {
            [key: string]: number;
        };
        libraries: {
            [key: string]: number;
        };
        years: {
            [key: string]: number;
        };
        accessLevels: {
            [key: string]: number;
        };
    };
    query: LibrarySearchQuery;
}
export interface CodexValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    checksum: string;
    lastValidated: Date;
}
export interface ValidationError {
    field: string;
    message: string;
    value: any;
    rule: ValidationRule;
    nodeId?: number;
}
export interface ValidationWarning {
    field: string;
    message: string;
    suggestion: string;
    nodeId?: number;
}
export interface LibrarySyncResult {
    library: string;
    status: 'success' | 'partial' | 'error';
    sourcesAdded: number;
    sourcesUpdated: number;
    errors: string[];
    lastSync: Date;
    nextSync?: Date;
}
export interface CodexAnalytics {
    totalNodes: number;
    activeNodes: number;
    totalConnections: number;
    libraryConnections: number;
    researchSources: number;
    validationStatus: 'valid' | 'warnings' | 'errors';
    lastUpdated: Date;
    usageStats: {
        searches: number;
        validations: number;
        syncs: number;
        generation: number;
    };
}
//# sourceMappingURL=types.d.ts.map