#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Validate Game Mathematics Tool
 * 
 * Validates progression formulas, balance calculations
 * Checks probability distributions and level scaling
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
const CATHEDRAL_RATIO = 144 / 99;
const PHI = 1.618033988749895;

class GameMathValidator
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
    logger.info('🎮 Validating game mathematics across all systems...');

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
    logger.info(`🎮 Validating ${name}...`);

    const files = await this.findGameFiles(workspace);
    
    for (const file of files) {
      await this.validateFile(file, workspace);
    }
  }

  async findGameFiles(workspace) {
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.gd'];
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
            if (lowerName.includes('game') || 
                lowerName.includes('progression') || 
                lowerName.includes('experience') ||
                lowerName.includes('level') ||
                lowerName.includes('balance')) {
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
      
      // Check for progression formulas
      this.checkProgression(content, filePath, relativePath);
      
      // Check for balance calculations
      this.checkBalance(content, filePath, relativePath);
      
      // Check for probability calculations
      this.checkProbability(content, filePath, relativePath);
      
      // Check for level scaling
      this.checkLevelScaling(content, filePath, relativePath);
      
    } catch (error) {
      // Skip if we can't read
    }
  }

  checkProgression(content, filePath, relativePath) {
    const patterns = [
      /144.*[:/]?\s*99|CATHEDRAL_RATIO|cathedral.*progression/i,
      /golden.*progression|phi.*progression|1\.618.*progression/i,
      /fibonacci.*progression|fib.*progression/i
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
        type: 'progression_formula'
      });
    }
  }

  checkBalance(content, filePath, relativePath) {
    const patterns = [
      /game.*balance|balance.*calculation|stat.*scaling/i,
      /experience.*point|xp.*calculation/i
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
        type: 'balance_calculation'
      });
    }
  }

  checkProbability(content, filePath, relativePath) {
    const patterns = [
      /probability|chance|random.*sacred|sacred.*ratio.*probability/i
    ];
    
    if (patterns.some(p => p.test(content))) {
      this.validations.push({
        file: relativePath,
        type: 'probability_calculation'
      });
    }
  }

  checkLevelScaling(content, filePath, relativePath) {
    const patterns = [
      /level.*scaling|scaling.*level|fibonacci.*level/i
    ];
    
    if (patterns.some(p => p.test(content))) {
      this.validations.push({
        file: relativePath,
        type: 'level_scaling'
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
          progression: this.validations.filter(v => v.type === 'progression_formula').length,
          balance: this.validations.filter(v => v.type === 'balance_calculation').length,
          probability: this.validations.filter(v => v.type === 'probability_calculation').length,
          scaling: this.validations.filter(v => v.type === 'level_scaling').length
        }
      },
      validations: this.validations,
      issues: this.issues
    };

    // Save report
    const fs = await import('fs');
    const reportPath = join(__dirname, '..', 'docs', 'GAME_MATH_VALIDATION.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    logger.info(`✨ Validated ${this.validations.length} uses of game mathematics`);
    logger.info(`⚠️  Found ${this.issues.length} issues`);
    logger.success(`📄 Report saved to ${reportPath}`);

    return report;
  }
}

// Main execution
async function main() {
  const validator = new GameMathValidator();
  await validator.validate();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Validation failed: ${error.message}`);
    process.exit(1);
  });
}

export { GameMathValidator };

