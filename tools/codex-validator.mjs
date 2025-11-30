#!/usr/bin/env node
/**
 * Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational
 */
/**
 * ND joy: Central to all tools - honors neurodivergent creative expression
 */
/**
 * Codex Validator - Ensures all codexes work without AI dependencies
 * 
 * Validates:
 * - No AI/LLM API calls in codexes
 * - All codexes use local-only functionality
 * - Turbo/OpenSpec/Spec Kit integration where appropriate
 * - All systems work standalone
 * 
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const FORBIDDEN_PATTERNS = [
  /openai/i,
  /anthropic/i,
  /claude/i,
  /gpt/i,
  /llm/i,
  /api\.openai/i,
  /api\.anthropic/i,
  /fetch.*ai/i,
  /axios.*ai/i,
  /\.ai\s*['"]/i
];

const ALLOWED_PATTERNS = [
  /\.ai\s*['"]/i, // File extensions like .ai are OK
  /artificial/i, // Comments mentioning AI are OK
  /describe/i // Common words are OK
];

export class CodexValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validated = [];
  }

  async validateAllCodexes() {
    const codexFiles = await this.findCodexFiles();
    
    for (const file of codexFiles) {
      this.validateCodex(file);
    }

    return {
      validated: this.validated.length,
      errors: this.errors,
      warnings: this.warnings,
      allValid: this.errors.length === 0
    };
  }

  async findCodexFiles() {
    const files = [];
    const packagesDir = join(process.cwd(), 'packages');
    
    if (!existsSync(packagesDir)) {
      return files;
    }
    
    // Recursively find TypeScript files matching codex patterns
    function findTSFiles(dir, baseDir = process.cwd()) {
      const found = [];
      try {
        const entries = readdirSync(dir);
        for (const entry of entries) {
          const fullPath = join(dir, entry);
          const relativePath = fullPath.replace(baseDir + '/', '');
          try {
            const stat = statSync(fullPath);
            if (stat.isDirectory()) {
              found.push(...findTSFiles(fullPath, baseDir));
            } else if (entry.endsWith('.ts') || entry.endsWith('.js')) {
              // Match codex patterns
              if (entry.includes('Codex') || 
                  entry.includes('codex') || 
                  entry.includes('Engine') ||
                  relativePath.includes('/src/')) {
                found.push(relativePath);
              }
            }
          } catch (e) {
            // Skip files we can't access
          }
        }
      } catch (e) {
        // Skip directories we can't access
      }
      return found;
    }
    
    const packages = readdirSync(packagesDir);
    for (const pkg of packages) {
      const pkgPath = join(packagesDir, pkg);
      if (existsSync(pkgPath)) {
        const srcDir = join(pkgPath, 'src');
        if (existsSync(srcDir)) {
          files.push(...findTSFiles(srcDir));
        }
        // Also check root of package for Engine files
        files.push(...findTSFiles(pkgPath).filter(f => f.includes('Engine') || f.includes('Codex')));
      }
    }
    
    return [...new Set(files)];
  }

  validateCodex(filePath) {
    try {
      if (!existsSync(filePath)) {
        this.warnings.push(`File not found: ${filePath}`);
        return;
      }

      const content = readFileSync(filePath, 'utf-8');
      const hasAI = this.checkForAI(content, filePath);
      const usesTurbo = this.checkTurboUsage(content, filePath);
      const usesOpenSpec = this.checkOpenSpecUsage(content, filePath);
      const isStandalone = this.checkStandalone(content, filePath);

      if (!hasAI && (usesTurbo || usesOpenSpec || isStandalone)) {
        this.validated.push({
          file: filePath,
          status: 'valid',
          usesTurbo,
          usesOpenSpec,
          isStandalone
        });
      } else if (hasAI) {
        this.errors.push({
          file: filePath,
          issue: 'Contains AI dependencies',
          line: this.findAILine(content)
        });
      } else {
        this.warnings.push({
          file: filePath,
          issue: 'No Turbo/OpenSpec usage detected - may need integration'
        });
      }
    } catch (error) {
      this.errors.push({
        file: filePath,
        issue: `Validation error: ${error.message}`
      });
    }
  }

  checkForAI(content, filePath) {
    for (const pattern of FORBIDDEN_PATTERNS) {
      // Check if it's in a comment or string (which might be OK)
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(pattern);
        if (match) {
          // Check if it's in a comment
          const commentMatch = line.match(/\/\/.*|(\/\*[\s\S]*?\*\/)/);
          if (!commentMatch || commentMatch.index > match.index) {
            // Not in a comment, this is a problem
            return true;
          }
        }
      }
    }
    return false;
  }

  checkTurboUsage(content) {
    return /turbo|@turbo|turbo\.json/i.test(content);
  }

  checkOpenSpecUsage(content) {
    return /openspec|spec-kit|AGENTS\.md/i.test(content);
  }

  checkStandalone(content) {
    // Check if codex works without external AI dependencies
    const hasLocalOnly = !this.checkForAI(content);
    const hasLocalData = /local|standalone|offline/i.test(content);
    return hasLocalOnly && hasLocalData;
  }

  findAILine(content) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      for (const pattern of FORBIDDEN_PATTERNS) {
        if (pattern.test(lines[i])) {
          return i + 1;
        }
      }
    }
    return -1;
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new CodexValidator();
  validator.validateAllCodexes().then(result => {
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.allValid ? 0 : 1);
  });
}

export default CodexValidator;

