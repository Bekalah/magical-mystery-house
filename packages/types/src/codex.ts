/**
 * codex
 * 
 * @package @cathedral/types
 */
/**
 * Codex 144:99 Types
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

export type CodexCategory = 
  | 'alchemy'
  | 'sacred-geometry'
  | 'mystery-traditions'
  | 'consciousness'
  | 'esoteric-philosophy'
  | 'mystical-mathematics'
  | 'occult-sciences'
  | 'spiritual-practices';

export interface CodexSource {
  type: 'book' | 'article' | 'archive' | 'research-paper';
  title: string;
  author?: string;
  url?: string;
  library?: string;
  publicDomain: boolean;
  accessed?: string;
}

export interface CodexSearchResult {
  node: Codex144Node;
  score: number;
  matchedKeywords: string[];
}

export interface CodexValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  nodeCount: number;
}
