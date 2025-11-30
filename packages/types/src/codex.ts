/**
 * codex
 * 
 * @package @cathedral/types
 */
/**
 * Codex 144:99 Types
 */

/**
 * ⚗️ Codex144Node - The Principle
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
export interface Codex144Node {
  id: number;
  title: string;
  category: CodexCategory;
  description: string;
  connections: number[];
  sources: CodexSource[];
  sacredGeometry?: string[];
  keywords: string[];
}

/**
 * ⚗️ CodexCategory - The Principle
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
export type CodexCategory = 
  | 'alchemy'
  | 'sacred-geometry'
  | 'mystery-traditions'
  | 'consciousness'
  | 'esoteric-philosophy'
  | 'mystical-mathematics'
  | 'occult-sciences'
  | 'spiritual-practices';

/**
 * ⚗️ CodexSource - The Principle
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
export interface CodexSource {
  type: 'book' | 'article' | 'archive' | 'research-paper';
  title: string;
  author?: string;
  url?: string;
  library?: string;
  publicDomain: boolean;
  accessed?: string;
}

/**
 * ⚗️ CodexSearchResult - The Principle
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
export interface CodexSearchResult {
  node: Codex144Node;
  score: number;
  matchedKeywords: string[];
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
  valid: boolean;
  errors: string[];
  warnings: string[];
  nodeCount: number;
}
