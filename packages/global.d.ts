/**
 * Global type declarations for .mjs modules
 * @license CC0-1.0 - Public Domain
 */

declare module './scripts/apply-security-fixes-monorepo.mjs' {
  export default class MonorepoSecurityFixer {
    constructor();
    applyAllFixes(): Promise<{ fixed: number; errors: string[] }>;
  }
}

declare module '../scripts/apply-security-fixes-monorepo.mjs' {
  export default class MonorepoSecurityFixer {
    constructor();
    applyAllFixes(): Promise<{ fixed: number; errors: string[] }>;
  }
}

declare module '../../scripts/apply-security-fixes-monorepo.mjs' {
  export default class MonorepoSecurityFixer {
    constructor();
    applyAllFixes(): Promise<{ fixed: number; errors: string[] }>;
  }
}

declare module '../scripts/apply-security-fixes-monorepo.mjs' {
  export default class MonorepoSecurityFixer {
    constructor();
    applyAllFixes(): Promise<{ fixed: number; errors: string[] }>;
  }
}

declare module './scripts/apply-security-fixes-monorepo.mjs' {
  export default class MonorepoSecurityFixer {
    constructor();
    applyAllFixes(): Promise<{ fixed: number; errors: string[] }>;
  }
}

declare module './tools/master-docs-integration.mjs' {
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

declare module './tools/orchestration-validator.mjs' {
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

declare module './tools/quality-standards-validator.mjs' {
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

