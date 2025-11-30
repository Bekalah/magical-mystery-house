#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Validate Sacred Mathematics Tool
 * 
 * Validates all systems use correct sacred mathematics constants
 * Checks 144:99 ratio compliance, golden ratio, Fibonacci, frequencies
 * 
 * @license CC0-1.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = new EnhancedLogger();

// Sacred Mathematics Constants (must match sacred-mathematics-core)
const SACRED_MATH = {
  CATHEDRAL_RATIO: 144 / 99,
  CATHEDRAL_INVERSE: 99 / 144,
  PHI: (1 + Math.sqrt(5)) / 2,
  PHI_INVERSE: (Math.sqrt(5) - 1) / 2,
  SQRT_2: Math.sqrt(2),
  SQRT_3: Math.sqrt(3),
  SQRT_5: Math.sqrt(5),
  SOLFEGGIO: {
    UT: 396,
    RE: 417,
    MI: 528,
    FA: 639,
    SOL: 741,
    LA: 852,
    SI: 963
  }
};

class SacredMathValidator
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    
    this.issues = [];
    this.validations = [];
  }

  async validate() {
    logger.info('🔍 Validating sacred mathematics across all systems...');

    for (const workspace of this.workspaces) {
      if (existsSync(workspace)) {
        await this.validateWorkspace(workspace);
      }
    }

    await this.generateReport();
    return {
      validations: this.validations.length,
      issues: this.issues.length
    };
  }

  async validateWorkspace(workspace) {
    const name = workspace.split('/').pop();
    logger.info(`📐 Validating ${name}...`);

    // Find all TypeScript/JavaScript files
    const files = await this.findMathFiles(workspace);
    
    for (const file of files) {
      await this.validateFile(file, workspace);
    }
  }

  async findMathFiles(workspace) {
    const extensions = ['.ts', '.js', '.tsx', '.jsx'];
    const excludeDirs = ['node_modules', 'dist', 'build', '.git', '.next', 'coverage'];
    const files = [];
    let fileCount = 0;
    const MAX_FILES = 100;
    
    const scanDir = (dir, depth = 0) => {
      if (depth > 5 || fileCount >= MAX_FILES) return;
      
      try {
        const entries = readdirSync(dir);
        
        for (const entry of entries) {
          if (fileCount >= MAX_FILES) break;
          if (excludeDirs.includes(entry)) continue;
          
          const fullPath = join(dir, entry);
          const stat = statSync(fullPath);
          
          if (stat.isDirectory()) {
            scanDir(fullPath, depth + 1);
          } else if (stat.isFile() && extensions.includes(extname(entry))) {
            fileCount++;
            files.push(fullPath);
          }
        }
      } catch (error) {
        // Skip
      }
    };
    
    scanDir(workspace);
    return files;
  }

  async validateFile(filePath, workspace) {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const relativePath = filePath.replace(workspace, '');
      
      // Check for sacred math constants
      this.checkConstants(content, filePath, relativePath);
      
      // Check for 144:99 ratio
      this.checkCathedralRatio(content, filePath, relativePath);
      
      // Check for golden ratio
      this.checkGoldenRatio(content, filePath, relativePath);
      
      // Check for Fibonacci
      this.checkFibonacci(content, filePath, relativePath);
      
      // Check for Solfeggio frequencies
      this.checkSolfeggio(content, filePath, relativePath);
      
    } catch (error) {
      // Skip if we can't read
    }
  }

  checkConstants(content, filePath, relativePath) {
    // Check if file uses sacred math constants correctly
    const hasCathedralRatio = /144\s*[/:]\s*99|CATHEDRAL_RATIO|cathedral.*ratio/i.test(content);
    const hasPhi = /PHI|phi|golden.*ratio|1\.618/i.test(content);
    const hasSqrt = /SQRT|sqrt|√[235]/i.test(content);
    
    if (hasCathedralRatio || hasPhi || hasSqrt) {
      // Validate actual values
      const cathedralMatch = content.match(/144\s*[/:]\s*99|CATHEDRAL_RATIO[:\s]*=[:\\s]*([\\d.]+)/);
      if (cathedralMatch) {
        const value = parseFloat(cathedralMatch[1] || '1.4545');
        if (Math.abs(value - SACRED_MATH.CATHEDRAL_RATIO) > 0.01) {
          this.issues.push({
            file: relativePath,
            type: 'incorrect_constant',
            constant: 'CATHEDRAL_RATIO',
            found: value,
            expected: SACRED_MATH.CATHEDRAL_RATIO
          });
        } else {
          this.validations.push({
            file: relativePath,
            type: 'correct_constant',
            constant: 'CATHEDRAL_RATIO'
          });
        }
      }
    }
  }

  checkCathedralRatio(content, filePath, relativePath) {
    // Check for 144:99 ratio usage
    const patterns = [
      /144\s*[:/]\s*99/,
      /144\s*\/\s*99/,
      /CATHEDRAL_RATIO/,
      /cathedral.*ratio/i
    ];
    
    let found = false;
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        found = true;
        break;
      }
    }
    
    if (found) {
      this.validations.push({
        file: relativePath,
        type: 'cathedral_ratio_usage'
      });
    }
  }

  checkGoldenRatio(content, filePath, relativePath) {
    // Check for golden ratio usage
    const patterns = [
      /1\.618/,
      /0\.618/,
      /PHI|phi/,
      /golden.*ratio/i
    ];
    
    let found = false;
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        found = true;
        break;
      }
    }
    
    if (found) {
      this.validations.push({
        file: relativePath,
        type: 'golden_ratio_usage'
      });
    }
  }

  checkFibonacci(content, filePath, relativePath) {
    // Check for Fibonacci sequence usage
    if (/fibonacci|fib/i.test(content)) {
      this.validations.push({
        file: relativePath,
        type: 'fibonacci_usage'
      });
    }
  }

  checkSolfeggio(content, filePath, relativePath) {
    // Check for Solfeggio frequencies
    const solfeggioFreqs = Object.values(SACRED_MATH.SOLFEGGIO);
    let found = false;
    
    for (const freq of solfeggioFreqs) {
      if (content.includes(freq.toString())) {
        found = true;
        break;
      }
    }
    
    if (found) {
      this.validations.push({
        file: relativePath,
        type: 'solfeggio_usage'
      });
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        validations: this.validations.length,
        issues: this.issues.length,
        byType: {
          cathedral_ratio: this.validations.filter(v => v.type === 'cathedral_ratio_usage').length,
          golden_ratio: this.validations.filter(v => v.type === 'golden_ratio_usage').length,
          fibonacci: this.validations.filter(v => v.type === 'fibonacci_usage').length,
          solfeggio: this.validations.filter(v => v.type === 'solfeggio_usage').length
        }
      },
      validations: this.validations,
      issues: this.issues
    };

    // Save report
    const fs = await import('fs');
    const reportPath = join(__dirname, '..', 'docs', 'SACRED_MATH_VALIDATION.json');
    fs.default.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    logger.info(`✨ Validated ${this.validations.length} uses of sacred mathematics`);
    logger.info(`⚠️  Found ${this.issues.length} issues`);
    logger.success(`📄 Report saved to ${reportPath}`);

    return report;
  }
}

// Main execution
async function main() {
  const validator = new SacredMathValidator();
  await validator.validate();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Validation failed: ${error.message}`);
    process.exit(1);
  });
}

export { SacredMathValidator };

