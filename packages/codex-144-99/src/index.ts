/**
 * index
 * 
 * @package @cathedral/codex-144-99
 */
// src/index.ts — main entry point for codex-144-99 package
export * from './core';
export * from './types';
export * from './CodexLibrary';
export * from './integrations';
export * from './validation';
export * from './complete-codex';
export * from './complete-interconnection';
export * from './codex-mapper';
export * from './fix-codex';

// Main library export
export { CodexLibrary } from './CodexLibrary';

// Functional engine exports - REAL, WORKING engines
export * from './functional-codex-engine';
export { codexEngine, FunctionalCodexEngine } from './functional-codex-engine';

// Double Tree Pathworking Tech
export * from './DoubleTreePathworkingTech';
export { DoubleTreePathworkingTech, createPathworking, SEPHIROTH, QLIPHOTH, PATHS } from './DoubleTreePathworkingTech';
export type { Pathworking, PathDetail, Sephirah, Qliphah, Path } from './DoubleTreePathworkingTech';
