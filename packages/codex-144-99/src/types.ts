/**
 * types
 * 
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Library System Types
 * Comprehensive type definitions for the sacred knowledge library
 */

/**
 * ⚗️ CodexNode - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
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

/**
 * ⚗️ NarrativeData - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface NarrativeData {
  theme: string;
  archetype: string;
  storyBeats: string[];
  dialogueStyle: string;
  keywords: string[];
}

/**
 * ⚗️ GameDesignData - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface GameDesignData {
  abilityType: string;
  mechanics: string[];
  questType: string;
  rewardStyle: string;
  enemyAffinity: string;
  environmentEffect: string;
}

/**
 * ⚗️ ArchitectureData - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ArchitectureData {
  spatialQuality: string;
  roomType: string;
  lighting: string;
  materials: string[];
  ambience: string;
  symbolPlacement: string;
}

/**
 * ⚗️ SymbolismData - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface SymbolismData {
  primarySymbol: string;
  secondarySymbols: string[];
  geometricPattern: string;
  colorBlending: string;
}

/**
 * ⚗️ HarmonicsData - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface HarmonicsData {
  perfectConsonance: number[];
  consonance: number[];
  dissonance: number[];
  tritone: number[];
}

/**
 * ⚗️ LibraryConnection - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
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

/**
 * ⚗️ ResearchSource - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
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
  relevance: number; // 0-1 score
  accessLevel: 'open' | 'subscription' | 'restricted' | 'public' | 'premium';
  abstract?: string;
  keywords: string[];
}

/**
 * ⚗️ CodexLibraryConfig - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface CodexLibraryConfig {
  dataPath: string;
  cachePath: string;
  externalLibraries: LibraryConnection[];
  researchSources: ResearchSource[];
  validationRules: ValidationRule[];
  syncInterval: number; // minutes
}

/**
 * ⚗️ ValidationRule - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ValidationRule {
  field: string;
  type: 'required' | 'format' | 'range' | 'reference';
  value?: any;
  message: string;
}

/**
 * ⚗️ LibrarySearchQuery - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
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

/**
 * ⚗️ LibrarySearchResult - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface LibrarySearchResult {
  sources: ResearchSource[];
  totalCount: number;
  facets: {
    subjects: { [key: string]: number };
    libraries: { [key: string]: number };
    years: { [key: string]: number };
    accessLevels: { [key: string]: number };
  };
  query: LibrarySearchQuery;
}

/**
 * ⚗️ CodexValidationResult - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface CodexValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  checksum: string;
  lastValidated: Date;
}

/**
 * ⚗️ ValidationError - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ValidationError {
  field: string;
  message: string;
  value: any;
  rule: ValidationRule;
  nodeId?: number;
}

/**
 * ⚗️ ValidationWarning - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ValidationWarning {
  field: string;
  message: string;
  suggestion: string;
  nodeId?: number;
}

/**
 * ⚗️ LibrarySyncResult - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface LibrarySyncResult {
  library: string;
  status: 'success' | 'partial' | 'error';
  sourcesAdded: number;
  sourcesUpdated: number;
  errors: string[];
  lastSync: Date;
  nextSync?: Date;
}

/**
 * ⚗️ CodexAnalytics - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
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
