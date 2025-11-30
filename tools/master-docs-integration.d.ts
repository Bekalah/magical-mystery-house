/**
 * Type declarations for master-docs-integration.mjs
 * @license CC0-1.0 - Public Domain
 */

declare module './master-docs-integration.mjs' {
  export default class MasterDocsIntegration {
    constructor();
    getStandards(): { traumaAware: string[]; sacredGeometry: string[] };
    validateImprovement(improvement: unknown): { valid: boolean; issues: string[] };
  }
}

declare module '../tools/master-docs-integration.mjs' {
  export default class MasterDocsIntegration {
    constructor();
    getStandards(): { traumaAware: string[]; sacredGeometry: string[] };
    validateImprovement(improvement: unknown): { valid: boolean; issues: string[] };
  }
}
