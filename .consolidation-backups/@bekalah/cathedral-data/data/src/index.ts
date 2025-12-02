/**
 * 📊✨ CATHEDRAL DATA - CENTRAL EXPORTS
 * 
 * Unified access to Codex 144:99 and Living Arcanae systems
 */

// Cathedral System Constants
export const CATHEDRAL_VERSION = '2.0.0'
export const CODEX_VERSION = '144:99'
export const LIVING_ARCANAE_COUNT = 22
export const FUSION_COMBINATIONS = 231

// Type definitions for the data structures
export interface CodexNode {
  id: number;
  slug: string;
  title: string;
  frequency_hz: number;
  crystal: string;
  guardian: string;
  fusion_kink: {
    enabled: boolean;
    combines_with: string;
    specialty: string;
  };
}

export interface ArcanaeCard {
  id: string;
  name: string;
  guardian: string;
  tradition_engine: string;
  fusion_kink: string;
  lineage: string[];
}

// Re-export JSON data (will be available at runtime)
export { default as codexNodes } from '../codex/codex_nodes.json'
export { default as livingArcanae } from '../arcana/majors.json'