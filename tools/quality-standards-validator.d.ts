/**
 * Type declarations for quality-standards-validator.mjs
 * @license CC0-1.0 - Public Domain
 */

declare module './quality-standards-validator.mjs' {
  export default class QualityStandardsValidator {
    constructor();
    validateFile(file: string): { overall: { totalSuggestions: number } };
  }
}

declare module '../tools/quality-standards-validator.mjs' {
  export default class QualityStandardsValidator {
    constructor();
    validateFile(file: string): { overall: { totalSuggestions: number } };
  }
}
