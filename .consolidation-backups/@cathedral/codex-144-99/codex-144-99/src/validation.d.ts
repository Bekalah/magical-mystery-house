/**
 * validation
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Validation System
 * Comprehensive validation for sacred knowledge datasets
 */
import { CodexNode, CodexValidationResult, ValidationError, ValidationWarning } from './types';
export declare class CodexValidator {
    private validationRules;
    private sacredConstants;
    /**
     * Validate a single Codex node
     */
    validateNode(node: CodexNode): {
        isValid: boolean;
        errors: ValidationError[];
        warnings: ValidationWarning[];
    };
    /**
     * Validate complete Codex dataset
     */
    validateCompleteDataset(dataPath?: string): CodexValidationResult;
    private getNestedValue;
    private generateChecksum;
    /**
     * Generate validation report
     */
    generateValidationReport(validation: CodexValidationResult): string;
}
//# sourceMappingURL=validation.d.ts.map