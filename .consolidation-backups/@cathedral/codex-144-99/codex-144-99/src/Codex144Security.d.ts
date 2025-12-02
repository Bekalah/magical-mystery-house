/**
 * Codex 144:99 Security Module
 *
 * Security validation and safety measures for Codex data structures
 * Based on security research: input validation, data integrity, schema validation
 *
 * @license CC0-1.0 - Public Domain
 */
import { CodexNode, CodexDepth } from './Codex144Engine';
/**
 * ⚗️ SecurityValidation - The Principle
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
export interface SecurityValidation {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}
/**
 * ⚗️ SecurityConfig - The Principle
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
export interface SecurityConfig {
    maxNodeIndex: number;
    maxDepthIndex: number;
    minConsciousnessLevel: number;
    maxConsciousnessLevel: number;
    minFrequency: number;
    maxFrequency: number;
    maxStringLength: number;
    maxArrayLength: number;
    allowExternalData: boolean;
    requireSanitization: boolean;
}
export declare const DEFAULT_SECURITY_CONFIG: SecurityConfig;
export declare class Codex144Security {
    private config;
    constructor(config?: Partial<SecurityConfig>);
    /**
     * Validate a CodexNode for security
     */
    validateNode(node: CodexNode): SecurityValidation;
    /**
     * Validate a CodexDepth for security
     */
    validateDepth(depth: CodexDepth): SecurityValidation;
    /**
     * Sanitize input data
     */
    sanitizeInput(input: unknown): unknown;
    /**
     * Sanitize string input
     */
    private sanitizeString;
    /**
     * Check for unsafe characters
     */
    private containsUnsafeChars;
    /**
     * Check for unsafe data in objects
     */
    private containsUnsafeData;
    /**
     * Validate external data before importing
     */
    validateExternalData(data: any): SecurityValidation;
}
export default Codex144Security;
//# sourceMappingURL=Codex144Security.d.ts.map