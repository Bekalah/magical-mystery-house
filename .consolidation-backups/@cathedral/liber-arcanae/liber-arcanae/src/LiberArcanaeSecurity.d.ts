/**
 * Liber Arcanae Security Module
 *
 * Security validation and safety measures for Liber Arcanae data structures
 * Validates cards, correspondences, pathworking practices
 *
 * @license CC0-1.0 - Public Domain
 */
import { ArcanaCard, ArcanaCorrespondences, PathworkingPractice } from './LiberArcanaeEngine';
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
    maxCardIndex: number;
    minConsciousnessLevel: number;
    maxConsciousnessLevel: number;
    maxStringLength: number;
    maxArrayLength: number;
    requireSanitization: boolean;
    validateCorrespondences: boolean;
}
export declare const DEFAULT_SECURITY_CONFIG: SecurityConfig;
export declare class LiberArcanaeSecurity {
    private config;
    constructor(config?: Partial<SecurityConfig>);
    /**
     * Validate an ArcanaCard for security
     */
    validateCard(card: ArcanaCard): SecurityValidation;
    /**
     * Validate correspondences
     */
    validateCorrespondences(corr: ArcanaCorrespondences): SecurityValidation;
    /**
     * Validate pathworking practice
     */
    validatePathworking(path: PathworkingPractice): SecurityValidation;
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
}
export default LiberArcanaeSecurity;
//# sourceMappingURL=LiberArcanaeSecurity.d.ts.map