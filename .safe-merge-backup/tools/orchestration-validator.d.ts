/**
 * Type declarations for orchestration-validator.mjs
 * @license CC0-1.0 - Public Domain
 */

declare module './orchestration-validator.mjs' {
  export default class OrchestrationValidator {
    constructor();
    validateOrchestration(): { overall: { valid: boolean; issues: string[] } };
  }
}

declare module '../tools/orchestration-validator.mjs' {
  export default class OrchestrationValidator {
    constructor();
    validateOrchestration(): { overall: { valid: boolean; issues: string[] } };
  }
}
