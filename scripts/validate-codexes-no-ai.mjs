#!/usr/bin/env node
/**
 * Validate All Codexes Work Without AI
 * 
 * Ensures all codexes use only local functionality
 * No AI/LLM API dependencies
 * Uses Turbo/OpenSpec/Spec Kit for non-AI tooling
 * 
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const CODEX_PATTERNS = [
  'packages/*-core/src/**/*.ts',
  'packages/*-core/src/**/*Engine.ts',
  'packages/*-core/src/**/*Codex*.ts'
];

const FORBIDDEN_AI_PATTERNS = [
  /openai|anthropic|claude|gpt-|llm|api\.openai|api\.anthropic/i,
  /fetch\(.*['"]https?:\/\/.*(openai|anthropic|ai)/i,
  /axios.*(openai|anthropic|ai)/i
];

const ALLOWED_NON_AI = [
  /\.ai\s*['"]/, // File extensions
  /artificial\s+intelligence/i, // Comments
  /\/\/.*ai/i, // Comments
  /\/\*[\s\S]*?ai[\s\S]*?\*\//i // Comments
];

export async function validateAllCodexes() {
  console.log('🔍 Validating all codexes work without AI...\n');
  
  const codexFiles = await findCodexFiles();
  const results = {
    total: codexFiles.length,
    valid: 0,
    invalid: [],
    warnings: []
  };

  for (const file of codexFiles) {
    const validation = validateCodex(file);
    if (validation.valid) {
      results.valid++;
    } else {
      results.invalid.push(validation);
    }
    if (validation.warnings.length > 0) {
      results.warnings.push(...validation.warnings.map(w => ({ file, ...w })));
    }
  }

  // Check Turbo integration
  const turboValid = validateTurboIntegration();
  if (!turboValid) {
    results.warnings.push({ file: 'turbo.json', issue: 'Turbo not properly configured' });
  }

  // Check OpenSpec integration
  const openspecValid = validateOpenSpecIntegration();
  if (!openspecValid) {
    results.warnings.push({ file: 'openspec/', issue: 'OpenSpec not properly configured' });
  }

  console.log(`\n📊 Validation Results:`);
  console.log(`   Total codexes: ${results.total}`);
  console.log(`   ✅ Valid (AI-free): ${results.valid}`);
  console.log(`   ❌ Invalid: ${results.invalid.length}`);
  console.log(`   ⚠️  Warnings: ${results.warnings.length}`);

  if (results.invalid.length > 0) {
    console.log(`\n❌ Codexes with AI dependencies:`);
    results.invalid.forEach(v => {
      console.log(`   - ${v.file}: ${v.issue}`);
    });
  }

  return {
    success: results.invalid.length === 0,
    ...results
  };
}

async function findCodexFiles() {
  const files = [];
  const packagesDir = join(process.cwd(), 'packages');
  
  if (!existsSync(packagesDir)) {
    return files;
  }
  
  // Recursively find TypeScript files in packages/*-core/src
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
          } else if (entry.endsWith('.ts') && 
                     (entry.includes('Engine') || 
                      entry.includes('Codex') || 
                      relativePath.includes('-core/src/'))) {
            found.push(relativePath);
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
    if (pkg.endsWith('-core')) {
      const srcDir = join(packagesDir, pkg, 'src');
      if (existsSync(srcDir)) {
        files.push(...findTSFiles(srcDir));
      }
    }
  }
  
  return [...new Set(files)];
}

function validateCodex(filePath) {
  const fullPath = join(process.cwd(), filePath);
  
  if (!existsSync(fullPath)) {
    return { valid: false, issue: 'File not found', warnings: [] };
  }

  try {
    const content = readFileSync(fullPath, 'utf-8');
    const hasAI = checkForAI(content);
    const usesLocalOnly = checkLocalOnly(content);
    const usesTurbo = checkTurboUsage(content);
    const usesOpenSpec = checkOpenSpecUsage(content);

    const warnings = [];
    if (!usesTurbo && !usesOpenSpec && !usesLocalOnly) {
      warnings.push({ issue: 'No Turbo/OpenSpec/local-only patterns detected' });
    }

    if (hasAI) {
      return { 
        valid: false, 
        issue: 'Contains AI dependencies', 
        line: findAILine(content),
        warnings 
      };
    }

    return { 
      valid: true, 
      usesTurbo, 
      usesOpenSpec, 
      usesLocalOnly,
      warnings 
    };
  } catch (error) {
    return { 
      valid: false, 
      issue: `Error reading file: ${error.message}`, 
      warnings: [] 
    };
  }
}

function checkForAI(content) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip comments
    if (line.trim().startsWith('//') || line.includes('/*')) {
      continue;
    }

    for (const pattern of FORBIDDEN_AI_PATTERNS) {
      if (pattern.test(line)) {
        // Check if it's in a comment
        const commentIndex = line.indexOf('//');
        const matchIndex = line.search(pattern);
        if (commentIndex === -1 || matchIndex < commentIndex) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkLocalOnly(content) {
  // Check for local-only patterns
  return /local|standalone|offline|no.*ai|without.*ai/i.test(content) ||
         /import.*from.*['"]\.\.\/|import.*from.*['"]\.\//.test(content);
}

function checkTurboUsage(content) {
  return /turbo|@turbo|turbo\.json|turbo.*build/i.test(content);
}

function checkOpenSpecUsage(content) {
  return /openspec|spec-kit|AGENTS\.md|project\.md/i.test(content);
}

function findAILine(content) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const pattern of FORBIDDEN_AI_PATTERNS) {
      if (pattern.test(lines[i])) {
        return i + 1;
      }
    }
  }
  return -1;
}

function validateTurboIntegration() {
  const turboJson = join(process.cwd(), 'turbo.json');
  return existsSync(turboJson);
}

function validateOpenSpecIntegration() {
  const openspecPath = join(process.cwd(), 'openspec');
  return existsSync(openspecPath);
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  validateAllCodexes().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

export default validateAllCodexes;

