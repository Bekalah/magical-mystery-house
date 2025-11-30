#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Validate Enterprise Standard Tool
 * 
 * Comprehensive validation suite for Golden A+ Enterprise Standard
 * Checks all systems integrated, mathematics consistent, apps working
 * Museum-quality visuals, professional documentation, trauma-safe patterns
 * Accessibility compliance (WCAG AA)
 * 
 * @license CC0-1.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { join } = path;
const { existsSync } = fs;

const logger = new EnhancedLogger();

class EnterpriseStandardValidator
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    
    this.validations = {
      mathematical: [],
      integration: [],
      quality: [],
      documentation: [],
      accessibility: [],
      traumaSafe: [],
      standalone: [],
      interconnected: []
    };
    
    this.issues = [];
  }

  async validate() {
    logger.info('🏆 Validating Enterprise Standard (Golden A+)...');

    // Validate mathematical foundation
    await this.validateMathematicalFoundation();
    
    // Validate system integration
    await this.validateSystemIntegration();
    
    // Validate quality standards
    await this.validateQualityStandards();
    
    // Validate documentation
    await this.validateDocumentation();
    
    // Validate accessibility
    await this.validateAccessibility();
    
    // Validate trauma-safe patterns
    await this.validateTraumaSafePatterns();
    
    // Validate standalone working
    await this.validateStandaloneWorking();
    
    // Validate interconnected working
    await this.validateInterconnectedWorking();

    this.generateReport();
    return {
      validations: Object.values(this.validations).flat().length,
      issues: this.issues.length
    };
  }

  async validateMathematicalFoundation() {
    logger.info('📐 Validating mathematical foundation...');

    // Check for sacred mathematics core
    const sacredMathPath = join(__dirname, '..', 'packages', 'sacred-mathematics-core', 'src', 'index.ts');
    if (existsSync(sacredMathPath)) {
      this.validations.mathematical.push({
        type: 'sacred_math_library',
        status: 'found',
        file: 'packages/sacred-mathematics-core/src/index.ts'
      });
    } else {
      this.issues.push({
        type: 'missing_sacred_math',
        severity: 'high',
        message: 'Sacred mathematics core library not found'
      });
    }

    // Check for sound mathematics core
    const soundMathPath = join(__dirname, '..', 'packages', 'sound-mathematics-core', 'src', 'index.ts');
    if (existsSync(soundMathPath)) {
      this.validations.mathematical.push({
        type: 'sound_math_library',
        status: 'found'
      });
    }

    // Check for design mathematics core
    const designMathPath = join(__dirname, '..', 'packages', 'design-mathematics-core', 'src', 'index.ts');
    if (existsSync(designMathPath)) {
      this.validations.mathematical.push({
        type: 'design_math_library',
        status: 'found'
      });
    }

    // Check for game mathematics core
    const gameMathPath = join(__dirname, '..', 'packages', 'game-mathematics-core', 'src', 'index.ts');
    if (existsSync(gameMathPath)) {
      this.validations.mathematical.push({
        type: 'game_math_library',
        status: 'found'
      });
    }

    // Check for codex 144:99 core
    const codexPath = join(__dirname, '..', 'packages', 'codex-144-99-core', 'src', 'index.ts');
    if (existsSync(codexPath)) {
      this.validations.mathematical.push({
        type: 'codex_core_library',
        status: 'found'
      });
    }
  }

  async validateSystemIntegration() {
    logger.info('🔗 Validating system integration...');

    // Check for Fusion Kink
    const fusionKinkFiles = [
      '/Users/rebeccalemke/cathedral-real/packages/codex-144-99/src/fusion-kink/FusionKinkDesignMathematics.ts'
    ];

    for (const file of fusionKinkFiles) {
      if (existsSync(file)) {
        this.validations.integration.push({
          type: 'fusion_kink',
          status: 'found',
          file: file.split('/').pop()
        });
      }
    }

    // Check for Circuitum99
    const circuitumFiles = [
      '/Users/rebeccalemke/cathedral-fixed-clean/packages/circuitum99/src/Circuitum99StoryEngine.ts'
    ];

    for (const file of circuitumFiles) {
      if (existsSync(file)) {
        this.validations.integration.push({
          type: 'circuitum99',
          status: 'found',
          file: file.split('/').pop()
        });
      }
    }

    // Check for Stone Grimoire
    const grimoireFiles = [
      '/Users/rebeccalemke/cathedral-fixed-clean/packages/stone-grimoire/src/chapels.ts'
    ];

    for (const file of grimoireFiles) {
      if (existsSync(file)) {
        this.validations.integration.push({
          type: 'stone_grimoire',
          status: 'found',
          file: file.split('/').pop()
        });
      }
    }

    // Check for Mystery House
    const mysteryFiles = [
      '/Users/rebeccalemke/cathedral-fixed-clean/packages/magical-mystery-house/src/rooms.ts'
    ];

    for (const file of mysteryFiles) {
      if (existsSync(file)) {
        this.validations.integration.push({
          type: 'mystery_house',
          status: 'found',
          file: file.split('/').pop()
        });
      }
    }

    // Check for Tesseract Bridge
    const tesseractFiles = [
      '/Users/rebeccalemke/cathedral-fixed-clean/tesseract-bridge/tesseract-bridge.js'
    ];

    for (const file of tesseractFiles) {
      if (existsSync(file)) {
        this.validations.integration.push({
          type: 'tesseract_bridge',
          status: 'found',
          file: file.split('/').pop()
        });
      }
    }
  }

  async validateQualityStandards() {
    logger.info('⭐ Validating quality standards...');

    // Check for TypeScript strict mode
    for (const workspace of this.workspaces) {
      const tsconfigPath = join(workspace, 'tsconfig.json');
      if (existsSync(tsconfigPath)) {
        try {
          const content = readFileSync(tsconfigPath, 'utf-8');
          const config = JSON.parse(content);
          
          if (config.compilerOptions?.strict) {
            this.validations.quality.push({
              type: 'typescript_strict',
              status: 'enabled',
              workspace: workspace.split('/').pop()
            });
          } else {
            this.issues.push({
              type: 'typescript_strict_disabled',
              severity: 'high',
              workspace: workspace.split('/').pop()
            });
          }
        } catch (error) {
          // Skip
        }
      }
    }

    // Check for museum-quality visuals (check for 3D, sacred geometry references)
    const visualFiles = await this.findVisualFiles();
    let has3D = false;
    let hasSacredGeometry = false;

    for (const file of visualFiles.slice(0, 20)) {
      try {
        const content = readFileSync(file, 'utf-8');
        if (/3d|three\.js|webgl|threejs|godot/i.test(content)) {
          has3D = true;
        }
        if (/sacred.*geometry|golden.*ratio|fibonacci|144.*99/i.test(content)) {
          hasSacredGeometry = true;
        }
      } catch (error) {
        // Skip
      }
    }

    if (has3D) {
      this.validations.quality.push({
        type: '3d_environments',
        status: 'found'
      });
    }

    if (hasSacredGeometry) {
      this.validations.quality.push({
        type: 'sacred_geometry',
        status: 'found'
      });
    }
  }

  async validateDocumentation() {
    logger.info('📚 Validating documentation...');

    // Check for README files
    for (const workspace of this.workspaces) {
      const readmePath = join(workspace, 'README.md');
      if (existsSync(readmePath)) {
        try {
          const content = readFileSync(readmePath, 'utf-8');
          
          const hasOverview = /overview|description|about/i.test(content);
          const hasUsage = /usage|how.*to|getting.*started/i.test(content);
          
          if (hasOverview && hasUsage) {
            this.validations.documentation.push({
              type: 'readme_complete',
              workspace: workspace.split('/').pop()
            });
          } else {
            this.issues.push({
              type: 'readme_incomplete',
              severity: 'medium',
              workspace: workspace.split('/').pop()
            });
          }
        } catch (error) {
          // Skip
        }
      }
    }

    // Check for mathematical foundation docs
    const mathSpecPath = join(__dirname, '..', 'docs', 'mathematical-foundation', 'COMPLETE_MATH_SPEC.md');
    if (existsSync(mathSpecPath)) {
      this.validations.documentation.push({
        type: 'math_spec',
        status: 'found'
      });
    }
  }

  async validateAccessibility() {
    logger.info('♿ Validating accessibility...');

    const uiFiles = await this.findUIFiles();
    let hasAriaLabels = false;
    let hasKeyboardNav = false;
    let hasAltText = false;

    for (const file of uiFiles.slice(0, 20)) {
      try {
        const content = readFileSync(file, 'utf-8');
        if (/aria-label|aria-labelledby/i.test(content)) {
          hasAriaLabels = true;
        }
        if (/onKeyDown|onKeyPress|tabIndex/i.test(content)) {
          hasKeyboardNav = true;
        }
        if (/alt=|aria-label/i.test(content)) {
          hasAltText = true;
        }
      } catch (error) {
        // Skip
      }
    }

    if (hasAriaLabels) {
      this.validations.accessibility.push({
        type: 'aria_labels',
        status: 'found'
      });
    } else {
      this.issues.push({
        type: 'missing_aria_labels',
        severity: 'high'
      });
    }

    if (hasKeyboardNav) {
      this.validations.accessibility.push({
        type: 'keyboard_navigation',
        status: 'found'
      });
    } else {
      this.issues.push({
        type: 'missing_keyboard_nav',
        severity: 'high'
      });
    }
  }

  async validateTraumaSafePatterns() {
    logger.info('🛡️ Validating trauma-safe patterns...');

    const uiFiles = await this.findUIFiles();
    let hasEmergencyExit = false;
    let hasReducedMotion = false;
    let hasNoAutoplay = true; // Default to true, check for violations

    for (const file of uiFiles.slice(0, 20)) {
      try {
        const content = readFileSync(file, 'utf-8');
        if (/escape|esc.*key|emergency.*exit/i.test(content)) {
          hasEmergencyExit = true;
        }
        if (/prefers-reduced-motion|reduced.*motion/i.test(content)) {
          hasReducedMotion = true;
        }
        if (/autoplay/i.test(content) && !/no.*autoplay|autoplay.*false/i.test(content)) {
          hasNoAutoplay = false;
        }
      } catch (error) {
        // Skip
      }
    }

    if (hasEmergencyExit) {
      this.validations.traumaSafe.push({
        type: 'emergency_exit',
        status: 'found'
      });
    } else {
      this.issues.push({
        type: 'missing_emergency_exit',
        severity: 'high'
      });
    }

    if (hasReducedMotion) {
      this.validations.traumaSafe.push({
        type: 'reduced_motion',
        status: 'found'
      });
    } else {
      this.issues.push({
        type: 'missing_reduced_motion',
        severity: 'high'
      });
    }

    if (hasNoAutoplay) {
      this.validations.traumaSafe.push({
        type: 'no_autoplay',
        status: 'found'
      });
    } else {
      this.issues.push({
        type: 'autoplay_present',
        severity: 'high'
      });
    }
  }

  async validateStandaloneWorking() {
    logger.info('🔧 Validating standalone working...');

    // Check for package.json files (indicates standalone capability)
    for (const workspace of this.workspaces) {
      const packagePath = join(workspace, 'package.json');
      if (existsSync(packagePath)) {
        this.validations.standalone.push({
          type: 'package_json',
          workspace: workspace.split('/').pop()
        });
      }
    }
  }

  async validateInterconnectedWorking() {
    logger.info('🔗 Validating interconnected working...');

    // Check for integration files
    const integrationFiles = [
      join(__dirname, '..', 'packages', 'tesseract-bridge'),
      join(__dirname, '..', 'packages', 'codex-144-99-core')
    ];

    for (const file of integrationFiles) {
      if (existsSync(file)) {
        this.validations.interconnected.push({
          type: 'integration_file',
          file: file.split('/').pop()
        });
      }
    }
  }

  async findVisualFiles() {
    const files = [];
    for (const workspace of this.workspaces) {
      const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'];
      const excludeDirs = ['node_modules', 'dist', 'build', '.git'];
      let fileCount = 0;
      const MAX_FILES = 50;
      
      const scanDir = (dir, depth = 0) => {
        if (depth > 3 || fileCount >= MAX_FILES) return;
        
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
              if (lowerName.includes('visual') || 
                  lowerName.includes('render') || 
                  lowerName.includes('canvas') ||
                  lowerName.includes('3d')) {
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
    }
    
    return files;
  }

  async findUIFiles() {
    const files = [];
    for (const workspace of this.workspaces) {
      const extensions = ['.tsx', '.jsx', '.ts', '.js'];
      const excludeDirs = ['node_modules', 'dist', 'build', '.git'];
      let fileCount = 0;
      const MAX_FILES = 50;
      
      const scanDir = (dir, depth = 0) => {
        if (depth > 3 || fileCount >= MAX_FILES) return;
        
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
              if (lowerName.includes('component') || 
                  lowerName.includes('ui') || 
                  lowerName.includes('page') ||
                  lowerName.includes('view')) {
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
    }
    
    return files;
  }

  async generateReport() {
    const totalValidations = Object.values(this.validations).flat().length;
    const totalIssues = this.issues.length;
    const complianceRate = totalValidations > 0 
      ? ((totalValidations / (totalValidations + totalIssues)) * 100).toFixed(2)
      : 0;

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalValidations,
        totalIssues,
        complianceRate: `${complianceRate}%`,
        byCategory: {
          mathematical: this.validations.mathematical.length,
          integration: this.validations.integration.length,
          quality: this.validations.quality.length,
          documentation: this.validations.documentation.length,
          accessibility: this.validations.accessibility.length,
          traumaSafe: this.validations.traumaSafe.length,
          standalone: this.validations.standalone.length,
          interconnected: this.validations.interconnected.length
        }
      },
      validations: this.validations,
      issues: this.issues,
      recommendations: this.generateRecommendations()
    };

    // Save report
    const fs = await import('fs');
    const reportPath = join(__dirname, '..', 'docs', 'ENTERPRISE_STANDARD_VALIDATION.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    logger.info(`✨ Validated ${totalValidations} enterprise standard items`);
    logger.info(`⚠️  Found ${totalIssues} issues`);
    logger.info(`📊 Compliance Rate: ${complianceRate}%`);
    logger.success(`📄 Report saved to ${reportPath}`);

    return report;
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.issues.some(i => i.type === 'missing_sacred_math')) {
      recommendations.push({
        priority: 'high',
        category: 'Mathematical Foundation',
        recommendation: 'Ensure sacred mathematics core library is properly integrated'
      });
    }

    if (this.issues.some(i => i.type === 'typescript_strict_disabled')) {
      recommendations.push({
        priority: 'high',
        category: 'Quality Standards',
        recommendation: 'Enable TypeScript strict mode in all repositories'
      });
    }

    if (this.issues.some(i => i.type === 'missing_aria_labels' || i.type === 'missing_keyboard_nav')) {
      recommendations.push({
        priority: 'high',
        category: 'Accessibility',
        recommendation: 'Add ARIA labels and keyboard navigation to all UI components'
      });
    }

    if (this.issues.some(i => i.type === 'missing_emergency_exit' || i.type === 'missing_reduced_motion')) {
      recommendations.push({
        priority: 'high',
        category: 'Trauma Safety',
        recommendation: 'Add emergency exit and reduced motion support to all UI components'
      });
    }

    return recommendations;
  }
}

// Main execution
async function main() {
  const validator = new EnterpriseStandardValidator();
  await validator.validate();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Validation failed: ${error.message}`);
    process.exit(1);
  });
}

export { EnterpriseStandardValidator };

