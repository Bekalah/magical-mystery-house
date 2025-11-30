/**
 * Type declarations for apply-security-fixes-monorepo.mjs
 * @license CC0-1.0 - Public Domain
 */

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
