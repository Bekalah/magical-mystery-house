/**
 * fix-codex
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Fix Codex 144:99 System
 *
 * Fixes and validates:
 * - All 144 nodes exist and have proper data
 * - All 99 gates are properly mapped
 * - Interconnections are correct
 * - Missing implementations are completed
 */
/**
 * ⚗️ CodexFixReport - The Principle
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
export interface CodexFixReport {
    nodes: {
        total: number;
        missing: number[];
        incomplete: number[];
        fixed: number[];
    };
    gates: {
        total: number;
        unmapped: number[];
        fixed: number[];
    };
    interconnections: {
        nodeToGate: number;
        nodeToNode: number;
        fixed: number;
    };
    errors: string[];
    warnings: string[];
}
/**
 * Fix Codex 144:99 System
 */
export declare class CodexFixer {
    private codex;
    private mapper;
    constructor();
    /**
     * Fix and validate entire system
     */
    fix(): CodexFixReport;
    /**
     * Generate missing nodes
     */
    generateMissingNodes(missingIds: number[]): void;
    /**
     * Validate all connections
     */
    validateConnections(): {
        valid: boolean;
        errors: string[];
        warnings: string[];
    };
    /**
     * Generate complete mapping report
     */
    generateReport(): string;
}
//# sourceMappingURL=fix-codex.d.ts.map