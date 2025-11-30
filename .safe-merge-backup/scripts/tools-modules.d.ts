/**
 * Type declarations for tools .mjs modules
 * @license CC0-1.0 - Public Domain
 */

declare module '../tools/master-docs-integration.mjs' {
  export default class MasterDocsIntegration {
    constructor();
    getStandards(): { traumaAware: string[]; sacredGeometry: string[] };
    validateImprovement(improvement: unknown): { valid: boolean; issues: string[] };
  }
}

declare module './tools/master-docs-integration.mjs' {
  export default class MasterDocsIntegration {
    constructor();
    getStandards(): { traumaAware: string[]; sacredGeometry: string[] };
    validateImprovement(improvement: unknown): { valid: boolean; issues: string[] };
  }
}

declare module '../tools/orchestration-validator.mjs' {
  export default class OrchestrationValidator {
    constructor();
    validateOrchestration(): { overall: { valid: boolean; issues: string[] } };
  }
}

declare module './tools/orchestration-validator.mjs' {
  export default class OrchestrationValidator {
    constructor();
    validateOrchestration(): { overall: { valid: boolean; issues: string[] } };
  }
}

declare module '../tools/quality-standards-validator.mjs' {
  export default class QualityStandardsValidator {
    constructor();
    validateFile(file: string): { overall: { totalSuggestions: number } };
  }
}

declare module './tools/quality-standards-validator.mjs' {
  export default class QualityStandardsValidator {
    constructor();
    validateFile(file: string): { overall: { totalSuggestions: number } };
  }
}

declare module './apply-security-fixes-monorepo.mjs' {
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

declare module '../tools/app-completion-research.mjs' {
  interface AppCompletionReport {
    timestamp: number;
    appsScanned: number;
    appsWithIssues: number;
    opportunities: {
      splitApps?: Array<{ name: string; locations: string[]; repo: string }>;
      lostApps?: Array<{ name: string; missingFiles: string[]; repo: string }>;
      codeIssues?: Array<{ app: string; description: string; severity: 'high' | 'medium' | 'low'; file?: string; repo: string }>;
      formatIssues?: Array<{ app: string; description: string; type: 'format' | 'style'; file?: string; repo: string }>;
      completionIssues?: Array<{ app: string; description: string; missing: string[]; repo: string }>;
    };
  }
  
  interface AppCompletionResearch {
    main(): Promise<AppCompletionReport>;
    discoverAllApps(): Promise<Array<{ name: string; path: string; repo: string; type: 'local' | 'remote'; packageJson: any }>>;
    checkAppCompletion(app: { name: string; path: string; repo: string; type: string; packageJson: any }): Promise<{
      app: string;
      repo: string;
      path: string;
      split: { isSplit: boolean; locations: string[] };
      lost: { isLost: boolean; missingFiles: string[] };
      codeQuality: Array<{ type: string; severity: string; description: string; file?: string }>;
      formatIssues: Array<{ type: string; description: string }>;
      styleIssues: Array<{ type: string; description: string; file?: string }>;
      completionIssues: Array<{ type: string; description: string; missing: string[] }>;
      missing: string[];
    }>;
  }
  
  const default: AppCompletionResearch;
  export default default;
}
