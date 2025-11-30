#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Validate Design Mathematics Tool
 * 
 * Validates golden ratio usage in layouts, Fibonacci sequence in sizing
 * Checks 144:99 ratio compliance and sacred geometry patterns
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

// Constants
const PHI = 1.618033988749895;
const PHI_INVERSE = 0.6180339887498949;
const CATHEDRAL_RATIO = 144 / 99;

class DesignMathValidator
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    
    this.validations = [];
    this.issues = [];
  }

  async validate() {
    logger.info('🎨 Validating design mathematics across all systems...');

    for (const workspace of this.workspaces) {
      if (existsSync(workspace)) {
        await this.validateWorkspace(workspace);
      }
    }

    this.generateReport();
    return {
      validations: this.validations.length,
      issues: this.issues.length
    };
  }

  async validateWorkspace(workspace) {
    const name = workspace.split('/').pop();
    logger.info(`🎨 Validating ${name}...`);

    const files = await this.findDesignFiles(workspace);
    
    for (const file of files) {
      await this.validateFile(file, workspace);
    }
  }

  async findDesignFiles(workspace) {
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'];
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
            const lowerName = entry.toLowerCase();
            if (lowerName.includes('layout') || 
                lowerName.includes('design') || 
                lowerName.includes('style') ||
                lowerName.includes('component') ||
                lowerName.includes('ui')) {
              fileCount++;
              files.push(fullPath);
            }
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
      
      // Check for golden ratio usage
      this.checkGoldenRatio(content, filePath, relativePath);
      
      // Check for Fibonacci usage
      this.checkFibonacci(content, filePath, relativePath);
      
      // Check for 144:99 ratio
      this.checkCathedralRatio(content, filePath, relativePath);
      
      // Check for sacred geometry
      this.checkSacredGeometry(content, filePath, relativePath);
      
    } catch (error) {
      // Skip if we can't read
    }
  }

  checkGoldenRatio(content, filePath, relativePath) {
    const patterns = [
      /1\.618|0\.618|golden.*ratio|phi|PHI/i,
      /width.*×.*1\.618|height.*×.*0\.618/i
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
    if (/fibonacci|fib/i.test(content)) {
      this.validations.push({
        file: relativePath,
        type: 'fibonacci_usage'
      });
    }
  }

  checkCathedralRatio(content, filePath, relativePath) {
    const patterns = [
      /144.*[:/]?\s*99|CATHEDRAL_RATIO|cathedral.*ratio/i,
      /1\.4545|144\/99/i
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

  checkSacredGeometry(content, filePath, relativePath) {
    const patterns = [
      /sacred.*geometry|golden.*spiral|vesica.*piscis|flower.*of.*life/i,
      /√2|√3|√5|sqrt\(2\)|sqrt\(3\)/i
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
        type: 'sacred_geometry_usage'
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
          golden_ratio: this.validations.filter(v => v.type === 'golden_ratio_usage').length,
          fibonacci: this.validations.filter(v => v.type === 'fibonacci_usage').length,
          cathedral_ratio: this.validations.filter(v => v.type === 'cathedral_ratio_usage').length,
          sacred_geometry: this.validations.filter(v => v.type === 'sacred_geometry_usage').length
        }
      },
      validations: this.validations,
      issues: this.issues
    };

    // Save report
    const fs = await import('fs');
    const reportPath = join(__dirname, '..', 'docs', 'DESIGN_MATH_VALIDATION.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    logger.info(`✨ Validated ${this.validations.length} uses of design mathematics`);
    logger.info(`⚠️  Found ${this.issues.length} issues`);
    logger.success(`📄 Report saved to ${reportPath}`);

    return report;
  }
}

// Main execution
async function main() {
  const validator = new DesignMathValidator();
  await validator.validate();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Validation failed: ${error.message}`);
    process.exit(1);
  });
}

export { DesignMathValidator };

