/**
 * @cathedral/types
 * Shared TypeScript type definitions for Cathedral monorepo
 */

// Core Cathedral Types
/**
 * ⚗️ CathedralNode - The Principle
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
export interface CathedralNode {
  id: string;
  name: string;
  type: 'arcana' | 'angel' | 'demon' | 'sacred-geometry' | 'codex';
  metadata?: Record<string, unknown>;
}

/**
 * ⚗️ SacredGeometry - The Principle
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
export interface SacredGeometry {
  id: string;
  pattern: 'flower-of-life' | 'metatrons-cube' | 'vesica-piscis' | 'golden-spiral';
  dimensions: number;
  coordinates?: number[][];
}

/**
 * ⚗️ ArcanaCard - The Principle
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
export interface ArcanaCard {
  id: string;
  number: number;
  name: string;
  divineAspect?: string;
  shadowAspect?: string;
  harmonyForm?: string;
  keywords: string[];
  upright: string[];
  reversed: string[];
}

/**
 * ⚗️ CodexEntry - The Principle
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
export interface CodexEntry {
  node: number;
  title: string;
  description: string;
  connections: number[];
  sources?: string[];
}

// Turbo & Build Types
/**
 * ⚗️ BuildConfig - The Principle
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
export interface BuildConfig {
  target: string;
  minify: boolean;
  sourcemap: boolean;
}

/**
 * ⚗️ PackageMetadata - The Principle
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
export interface PackageMetadata {
  name: string;
  version: string;
  role: string;
  features: string[];
}

// Export all types
export type * from './arcana';
export type * from './codex';
