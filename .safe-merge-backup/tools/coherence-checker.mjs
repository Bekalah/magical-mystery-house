#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Coherence Checker
 * 
 * Checks and ensures Monad Hieroglyphica alchemy theme coherence
 * across all tools, themes, engines, and systems.
 * 
 * Verifies:
 * - Theme consistency
 * - Mathematical coherence (144:99, golden ratio)
 * - Alchemical principles alignment
 * - Quality standards
 * - Vision integration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';
import MonadHieroglyphicaTheme from './monad-hieroglyphica-theme.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

/**
 * Coherence Checker
 */
class CoherenceChecker {
  constructor() {
    this.checks = {
      theme: [],
      mathematics: [],
      alchemy: [],
      quality: [],
      vision: [],
    };
    this.themeApplier = new MonadHieroglyphicaTheme();
  }

  /**
   * Check theme coherence
   */
  async checkThemeCoherence() {
    logger.info('🔍 Checking theme coherence...');

    const results = {
      totalFiles: 0,
      themedFiles: 0,
      missingTheme: [],
      inconsistentTheme: [],
      score: 0,
    };

    // Check all tool files
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (fs.existsSync(toolsDir)) {
      const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith('.mjs') && !f.includes('.backup'));
      
      results.totalFiles = toolFiles.length;

      for (const toolFile of toolFiles) {
        const toolPath = path.join(toolsDir, toolFile);
        const content = fs.readFileSync(toolPath, 'utf-8');
        
        const hasMonad = content.includes('Monad Hieroglyphica') || 
                        content.includes('monad-hieroglyphica') ||
                        content.includes('MONAD_THEME');
        const hasAlchemy = content.includes('alchemy') || 
                          content.includes('solve-et-coagula') ||
                          content.includes('solve et coagula');
        
        if (hasMonad && hasAlchemy) {
          results.themedFiles++;
        } else if (hasMonad || hasAlchemy) {
          results.inconsistentTheme.push({
            file: toolFile,
            hasMonad,
            hasAlchemy,
          });
        } else {
          results.missingTheme.push(toolFile);
        }
      }
    }

    // Calculate score
    if (results.totalFiles > 0) {
      results.score = (results.themedFiles / results.totalFiles) * 100;
    }

    this.checks.theme.push({
      timestamp: new Date().toISOString(),
      results,
    });

    logger.info(`   Theme coherence: ${results.score.toFixed(1)}%`);
    logger.info(`   Themed: ${results.themedFiles}/${results.totalFiles}`);
    if (results.missingTheme.length > 0) {
      logger.info(`   Missing theme: ${results.missingTheme.length} files`);
    }
    if (results.inconsistentTheme.length > 0) {
      logger.info(`   Inconsistent: ${results.inconsistentTheme.length} files`);
    }

    return results;
  }

  /**
   * Check mathematical coherence (144:99, golden ratio)
   */
  async checkMathematicalCoherence() {
    logger.info('🔍 Checking mathematical coherence...');

    const results = {
      totalFiles: 0,
      hasRatio144_99: 0,
      hasGoldenRatio: 0,
      hasFibonacci: 0,
      hasSacredRoots: 0,
      score: 0,
    };

    // Check all tool files
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (fs.existsSync(toolsDir)) {
      const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith('.mjs') && !f.includes('.backup'));
      
      results.totalFiles = toolFiles.length;

      for (const toolFile of toolFiles) {
        const toolPath = path.join(toolsDir, toolFile);
        const content = fs.readFileSync(toolPath, 'utf-8');
        
        if (content.includes('144:99') || content.includes('144/99') || content.includes('1.4545')) {
          results.hasRatio144_99++;
        }
        if (content.includes('golden ratio') || content.includes('1.618') || content.includes('phi')) {
          results.hasGoldenRatio++;
        }
        if (content.includes('fibonacci') || content.includes('fib')) {
          results.hasFibonacci++;
        }
        if (content.includes('sqrt') || content.includes('√')) {
          results.hasSacredRoots++;
        }
      }
    }

    // Calculate score (average of all mathematical elements)
    if (results.totalFiles > 0) {
      const ratioScore = (results.hasRatio144_99 / results.totalFiles) * 100;
      const goldenScore = (results.hasGoldenRatio / results.totalFiles) * 100;
      const fibScore = (results.hasFibonacci / results.totalFiles) * 100;
      const rootScore = (results.hasSacredRoots / results.totalFiles) * 100;
      
      results.score = (ratioScore + goldenScore + fibScore + rootScore) / 4;
    }

    this.checks.mathematics.push({
      timestamp: new Date().toISOString(),
      results,
    });

    logger.info(`   Mathematical coherence: ${results.score.toFixed(1)}%`);
    logger.info(`   144:99 ratio: ${results.hasRatio144_99}/${results.totalFiles}`);
    logger.info(`   Golden ratio: ${results.hasGoldenRatio}/${results.totalFiles}`);
    logger.info(`   Fibonacci: ${results.hasFibonacci}/${results.totalFiles}`);
    logger.info(`   Sacred roots: ${results.hasSacredRoots}/${results.totalFiles}`);

    return results;
  }

  /**
   * Check alchemical principles coherence
   */
  async checkAlchemicalCoherence() {
    logger.info('🔍 Checking alchemical principles coherence...');

    const results = {
      totalFiles: 0,
      hasSolve: 0,
      hasCoagula: 0,
      hasSolveEtCoagula: 0,
      hasElements: 0,
      hasPlanets: 0,
      score: 0,
    };

    // Check all tool files
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (fs.existsSync(toolsDir)) {
      const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith('.mjs') && !f.includes('.backup'));
      
      results.totalFiles = toolFiles.length;

      for (const toolFile of toolFiles) {
        const toolPath = path.join(toolsDir, toolFile);
        const content = fs.readFileSync(toolPath, 'utf-8').toLowerCase();
        
        if (content.includes('solve') || content.includes('dissolution')) {
          results.hasSolve++;
        }
        if (content.includes('coagula') || content.includes('coagulation')) {
          results.hasCoagula++;
        }
        if (content.includes('solve-et-coagula') || content.includes('solve et coagula')) {
          results.hasSolveEtCoagula++;
        }
        if (content.includes('element') && (content.includes('fire') || content.includes('water') || content.includes('air') || content.includes('earth'))) {
          results.hasElements++;
        }
        if (content.includes('planet') || content.includes('sun') || content.includes('moon') || content.includes('mars') || content.includes('mercury')) {
          results.hasPlanets++;
        }
      }
    }

    // Calculate score
    if (results.totalFiles > 0) {
      const solveScore = (results.hasSolve / results.totalFiles) * 100;
      const coagulaScore = (results.hasCoagula / results.totalFiles) * 100;
      const solveEtCoagulaScore = (results.hasSolveEtCoagula / results.totalFiles) * 100;
      const elementsScore = (results.hasElements / results.totalFiles) * 100;
      const planetsScore = (results.hasPlanets / results.totalFiles) * 100;
      
      results.score = (solveScore + coagulaScore + solveEtCoagulaScore + elementsScore + planetsScore) / 5;
    }

    this.checks.alchemy.push({
      timestamp: new Date().toISOString(),
      results,
    });

    logger.info(`   Alchemical coherence: ${results.score.toFixed(1)}%`);
    logger.info(`   Solve: ${results.hasSolve}/${results.totalFiles}`);
    logger.info(`   Coagula: ${results.hasCoagula}/${results.totalFiles}`);
    logger.info(`   Solve et Coagula: ${results.hasSolveEtCoagula}/${results.totalFiles}`);

    return results;
  }

  /**
   * Check quality standards coherence
   */
  async checkQualityCoherence() {
    logger.info('🔍 Checking quality standards coherence...');

    const results = {
      totalFiles: 0,
      hasMuseumGrade: 0,
      hasAristocratic: 0,
      hasRefinement: 0,
      hasCC0: 0,
      score: 0,
    };

    // Check all tool files
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (fs.existsSync(toolsDir)) {
      const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith('.mjs') && !f.includes('.backup'));
      
      results.totalFiles = toolFiles.length;

      for (const toolFile of toolFiles) {
        const toolPath = path.join(toolsDir, toolFile);
        const content = fs.readFileSync(toolPath, 'utf-8').toLowerCase();
        
        if (content.includes('museum-grade') || content.includes('museum grade')) {
          results.hasMuseumGrade++;
        }
        if (content.includes('aristocratic') || content.includes('refined')) {
          results.hasAristocratic++;
        }
        if (content.includes('refinement') || content.includes('sophisticated')) {
          results.hasRefinement++;
        }
        if (content.includes('cc0-1.0') || content.includes('public domain')) {
          results.hasCC0++;
        }
      }
    }

    // Calculate score
    if (results.totalFiles > 0) {
      const museumScore = (results.hasMuseumGrade / results.totalFiles) * 100;
      const aristocraticScore = (results.hasAristocratic / results.totalFiles) * 100;
      const refinementScore = (results.hasRefinement / results.totalFiles) * 100;
      const cc0Score = (results.hasCC0 / results.totalFiles) * 100;
      
      results.score = (museumScore + aristocraticScore + refinementScore + cc0Score) / 4;
    }

    this.checks.quality.push({
      timestamp: new Date().toISOString(),
      results,
    });

    logger.info(`   Quality coherence: ${results.score.toFixed(1)}%`);
    logger.info(`   Museum-grade: ${results.hasMuseumGrade}/${results.totalFiles}`);
    logger.info(`   Aristocratic: ${results.hasAristocratic}/${results.totalFiles}`);
    logger.info(`   CC0-1.0: ${results.hasCC0}/${results.totalFiles}`);

    return results;
  }

  /**
   * Check vision integration coherence
   */
  async checkVisionCoherence() {
    logger.info('🔍 Checking vision integration coherence...');

    const results = {
      totalFiles: 0,
      hasNDJoy: 0,
      hasEsoteric: 0,
      hasAcademic: 0,
      hasSacredGeometry: 0,
      score: 0,
    };

    // Check all tool files
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (fs.existsSync(toolsDir)) {
      const toolFiles = fs.readdirSync(toolsDir)
        .filter(f => f.endsWith('.mjs') && !f.includes('.backup'));
      
      results.totalFiles = toolFiles.length;

      for (const toolFile of toolFiles) {
        const toolPath = path.join(toolsDir, toolFile);
        const content = fs.readFileSync(toolPath, 'utf-8').toLowerCase();
        
        if (content.includes('nd joy') || content.includes('neurodivergent')) {
          results.hasNDJoy++;
        }
        if (content.includes('esoteric') || content.includes('kabbalah') || content.includes('hermetic') || content.includes('alchemy')) {
          results.hasEsoteric++;
        }
        if (content.includes('academic') || content.includes('barrier') || content.includes('western academia')) {
          results.hasAcademic++;
        }
        if (content.includes('sacred geometry') || content.includes('sacred-geometry')) {
          results.hasSacredGeometry++;
        }
      }
    }

    // Calculate score
    if (results.totalFiles > 0) {
      const ndScore = (results.hasNDJoy / results.totalFiles) * 100;
      const esotericScore = (results.hasEsoteric / results.totalFiles) * 100;
      const academicScore = (results.hasAcademic / results.totalFiles) * 100;
      const geometryScore = (results.hasSacredGeometry / results.totalFiles) * 100;
      
      results.score = (ndScore + esotericScore + academicScore + geometryScore) / 4;
    }

    this.checks.vision.push({
      timestamp: new Date().toISOString(),
      results,
    });

    logger.info(`   Vision coherence: ${results.score.toFixed(1)}%`);
    logger.info(`   ND Joy: ${results.hasNDJoy}/${results.totalFiles}`);
    logger.info(`   Esoteric: ${results.hasEsoteric}/${results.totalFiles}`);
    logger.info(`   Academic: ${results.hasAcademic}/${results.totalFiles}`);

    return results;
  }

  /**
   * Run all coherence checks
   */
  async checkAll() {
    logger.info('🔮 Checking Monad Hieroglyphica Coherence');
    logger.info('   → Theme consistency');
    logger.info('   → Mathematical coherence (144:99, golden ratio)');
    logger.info('   → Alchemical principles alignment');
    logger.info('   → Quality standards');
    logger.info('   → Vision integration\n');

    const themeResults = await this.checkThemeCoherence();
    const mathResults = await this.checkMathematicalCoherence();
    const alchemyResults = await this.checkAlchemicalCoherence();
    const qualityResults = await this.checkQualityCoherence();
    const visionResults = await this.checkVisionCoherence();

    // Calculate overall coherence score
    const overallScore = (
      themeResults.score +
      mathResults.score +
      alchemyResults.score +
      qualityResults.score +
      visionResults.score
    ) / 5;

    const report = {
      timestamp: new Date().toISOString(),
      overallScore,
      checks: {
        theme: themeResults,
        mathematics: mathResults,
        alchemy: alchemyResults,
        quality: qualityResults,
        vision: visionResults,
      },
      recommendations: this.generateRecommendations({
        theme: themeResults,
        mathematics: mathResults,
        alchemy: alchemyResults,
        quality: qualityResults,
        vision: visionResults,
      }),
    };

    // Save report
    const reportPath = path.join(BASE_DIR, 'docs', 'coherence-report.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

    logger.info(`\n✅ Coherence check complete`);
    logger.info(`   Overall coherence score: ${overallScore.toFixed(1)}%`);
    logger.info(`   Report saved: ${reportPath}`);

    return report;
  }

  /**
   * Generate recommendations based on coherence checks
   */
  generateRecommendations(results) {
    const recommendations = [];

    if (results.theme.score < 80) {
      recommendations.push({
        priority: 'high',
        category: 'theme',
        action: 'Apply Monad Hieroglyphica theme to missing files',
        files: results.theme.missingTheme.slice(0, 10), // Top 10
      });
    }

    if (results.mathematics.score < 60) {
      recommendations.push({
        priority: 'medium',
        category: 'mathematics',
        action: 'Integrate 144:99 ratio and golden ratio into more tools',
      });
    }

    if (results.alchemy.score < 70) {
      recommendations.push({
        priority: 'high',
        category: 'alchemy',
        action: 'Strengthen solve et coagula principles',
      });
    }

    if (results.quality.score < 90) {
      recommendations.push({
        priority: 'medium',
        category: 'quality',
        action: 'Ensure all files mention museum-grade quality and CC0-1.0 license',
      });
    }

    if (results.vision.score < 70) {
      recommendations.push({
        priority: 'high',
        category: 'vision',
        action: 'Integrate ND joy, esoteric traditions, and academic barrier breaking',
      });
    }

    return recommendations;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const checker = new CoherenceChecker();
  
  checker.checkAll()
    .then(report => {
      UserFeedback.success(`Coherence check complete: ${report.overallScore.toFixed(1)}% overall`);
      if (report.recommendations.length > 0) {
        logger.info(`\n📋 Recommendations:`);
        report.recommendations.forEach((rec, i) => {
          logger.info(`   ${i + 1}. [${rec.priority}] ${rec.action}`);
        });
      }
      process.exit(0);
    })
    .catch(error => {
      logger.error(`Error: ${error.message}`);
      process.exit(1);
    });
}

export default CoherenceChecker;

