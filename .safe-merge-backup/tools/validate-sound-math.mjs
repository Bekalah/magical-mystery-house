#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Validate Sound Mathematics Tool
 * 
 * Validates all sound frequency calculations
 * Checks harmonic relationships, Solfeggio frequencies, golden ratio harmonics
 * 
 * @license CC0-1.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { join, extname } = path;
const logger = new EnhancedLogger();

// Solfeggio frequencies (must match sacred-mathematics-core)
const SOLFEGGIO = {
  UT: 396,
  RE: 417,
  MI: 528,
  FA: 639,
  SOL: 741,
  LA: 852,
  SI: 963
};

class SoundMathValidator
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
    logger.info('🔊 Validating sound mathematics across all systems...');

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
    logger.info(`🔊 Validating ${name}...`);

    const files = await this.findSoundFiles(workspace);
    
    for (const file of files) {
      await this.validateFile(file, workspace);
    }
  }

  async findSoundFiles(workspace) {
    const extensions = ['.ts', '.js', '.tsx', '.jsx', '.gd'];
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
            if (lowerName.includes('audio') || 
                lowerName.includes('sound') || 
                lowerName.includes('frequency') ||
                lowerName.includes('solfeggio') ||
                lowerName.includes('synthesis')) {
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
      
      // Check for Solfeggio frequencies
      this.checkSolfeggio(content, filePath, relativePath);
      
      // Check for harmonic relationships
      this.checkHarmonics(content, filePath, relativePath);
      
      // Check for golden ratio harmonics
      this.checkGoldenRatioHarmonics(content, filePath, relativePath);
      
    } catch (error) {
      // Skip if we can't read
    }
  }

  checkSolfeggio(content, filePath, relativePath) {
    const solfeggioFreqs = Object.values(SOLFEGGIO);
    let found = false;
    
    for (const freq of solfeggioFreqs) {
      if (content.includes(freq.toString())) {
        found = true;
        // Validate frequency is correct
        const pattern = new RegExp(`(?:${freq}|${freq}\\.0)`);
        if (pattern.test(content)) {
          this.validations.push({
            file: relativePath,
            type: 'solfeggio_frequency',
            frequency: freq
          });
        } else {
          this.issues.push({
            file: relativePath,
            type: 'incorrect_solfeggio',
            frequency: freq
          });
        }
      }
    }
    
    if (found) {
      this.validations.push({
        file: relativePath,
        type: 'solfeggio_usage'
      });
    }
  }

  checkHarmonics(content, filePath, relativePath) {
    const harmonicPatterns = [
      /octave|2\.0|×\s*2|\\*\s*2/i,
      /perfect.*fifth|1\.5|×\s*1\.5/i,
      /perfect.*fourth|1\.333|4\/3/i,
      /major.*third|1\.25/i,
      /minor.*third|1\.2/i
    ];
    
    let found = false;
    for (const pattern of harmonicPatterns) {
      if (pattern.test(content)) {
        found = true;
        break;
      }
    }
    
    if (found) {
      this.validations.push({
        file: relativePath,
        type: 'harmonic_usage'
      });
    }
  }

  checkGoldenRatioHarmonics(content, filePath, relativePath) {
    const patterns = [
      /golden.*ratio.*harmonic|phi.*harmonic|1\.618/i,
      /frequency.*×.*1\.618|freq.*\\*\s*1\.618/i
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
        type: 'golden_ratio_harmonic'
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
          solfeggio: this.validations.filter(v => v.type === 'solfeggio_usage').length,
          harmonics: this.validations.filter(v => v.type === 'harmonic_usage').length,
          golden_ratio: this.validations.filter(v => v.type === 'golden_ratio_harmonic').length
        }
      },
      validations: this.validations,
      issues: this.issues
    };

    // Save report
    const fs = await import('fs');
    const reportPath = join(__dirname, '..', 'docs', 'SOUND_MATH_VALIDATION.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    logger.info(`✨ Validated ${this.validations.length} uses of sound mathematics`);
    logger.info(`⚠️  Found ${this.issues.length} issues`);
    logger.success(`📄 Report saved to ${reportPath}`);

    return report;
  }
}

// Main execution
async function main() {
  const validator = new SoundMathValidator();
  await validator.validate();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Validation failed: ${error.message}`);
    process.exit(1);
  });
}

export { SoundMathValidator };

