#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Learn From Material
 * Analyzes your codebase, documentation, and content to continuously learn about you
 * Updates learning database and informs experiment improvements
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import AlignmentDetector from './alignment-detector.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const LEARNING_DB = path.join(BASE_DIR, 'docs/CONTINUOUS_LEARNING.json');
const MATERIAL_LEARNINGS = path.join(BASE_DIR, 'docs/MATERIAL_LEARNINGS.json');

logger.info('📚 Learning from your material...');
logger.info('   → Analyzing codebase, documentation, and content');
logger.info('   → Extracting patterns, preferences, and insights');
logger.info('   → Updating learning database\n');

class MaterialLearner
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.learnings = this.loadLearnings();
    this.materialInsights = {
      patterns: [],
      preferences: [],
      workingStyle: [],
      aestheticStandards: [],
      mathematicalApproach: [],
      creativeProcess: [],
      influences: [],
      contentThemes: [],
      architecturalVision: [],
      teachingMethods: [],
      alignmentPatterns: {
        aligned: [],
        misaligned: [],
        commonIssues: [],
        improvementTrends: []
      }
    };
    this.detector = new AlignmentDetector();
  }

  loadLearnings() {
    if (fs.existsSync(LEARNING_DB)) {
      try {
        return JSON.parse(fs.readFileSync(LEARNING_DB, 'utf-8'));
      } catch {
        return { learnings: {} };
      }
    }
    return { learnings: {} };
  }

  async analyzeMaterial() {
    logger.info('🔍 Analyzing material across all repositories...');

    // Analyze documentation
    await this.analyzeDocumentation();
    
    // Analyze code patterns
    await this.analyzeCodePatterns();
    
    // Analyze design patterns
    await this.analyzeDesignPatterns();
    
    // Analyze content
    await this.analyzeContent();
    
    // Learn alignment patterns
    await this.learnAlignmentPatterns();
    
    // Extract insights
    this.extractInsights();
    
    // Update learning database
    this.updateLearningDatabase();
    
    // Generate report
    this.generateReport();
  }

  async findFiles(dir, extensions, maxDepth = 5, currentDepth = 0) {
    if (currentDepth >= maxDepth) return [];
    if (!fs.existsSync(dir)) return [];
    
    const files = [];
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
        
        const fullPath = path.join(dir, entry);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            files.push(...this.findFiles(fullPath, extensions, maxDepth, currentDepth + 1));
          } else if (stat.isFile() && extensions.some(ext => entry.endsWith(ext))) {
            files.push(fullPath);
          }
        } catch {
          // Skip entries we can't access
        }
      }
    } catch {
      // Skip directories we can't read
    }
    return files;
  }

  async analyzeDocumentation() {
    logger.info('📄 Analyzing documentation...');
    
    const insights = {
      aestheticStandards: [],
      workingStyle: [],
      creativeProcess: [],
      mathematicalApproach: [],
      architecturalVision: [],
      teachingMethods: []
    };

    try {
      const files = await this.findFiles(BASE_DIR, ['.md', '.txt'], 5);
      
      for (const file of files.slice(0, 50)) { // Limit for performance
          try {
            const content = fs.readFileSync(path.join(BASE_DIR, file), 'utf-8');
            
            // Extract aesthetic standards
            if (content.match(/aristocrat|museum-grade|refined|sophistication|finest/i)) {
              insights.aestheticStandards.push({
                file,
                context: this.extractContext(content, /aristocrat|museum-grade|refined|sophistication|finest/i)
              });
            }

            // Extract working style
            if (content.match(/non-linear|multi-modal|all modes|simultaneously/i)) {
              insights.workingStyle.push({
                file,
                context: this.extractContext(content, /non-linear|multi-modal|all modes|simultaneously/i)
              });
            }

            // Extract creative process
            if (content.match(/solve.*coagula|doubt.*research|beauty.*wisdom/i)) {
              insights.creativeProcess.push({
                file,
                context: this.extractContext(content, /solve.*coagula|doubt.*research|beauty.*wisdom/i)
              });
            }

            // Extract mathematical approach
            if (content.match(/144:99|golden ratio|fibonacci|sacred geometry|mathematical precision/i)) {
              insights.mathematicalApproach.push({
                file,
                context: this.extractContext(content, /144:99|golden ratio|fibonacci|sacred geometry|mathematical precision/i)
              });
            }

            // Extract architectural vision
            if (content.match(/3D|immersive|spatial|architectural|sacred geometry.*space/i)) {
              insights.architecturalVision.push({
                file,
                context: this.extractContext(content, /3D|immersive|spatial|architectural|sacred geometry.*space/i)
              });
            }

            // Extract teaching methods
            if (content.match(/teaching.*aesthetic|beauty.*teach|excellence.*example|refinement.*instruction/i)) {
              insights.teachingMethods.push({
                file,
                context: this.extractContext(content, /teaching.*aesthetic|beauty.*teach|excellence.*example|refinement.*instruction/i)
              });
            }
          } catch (err) {
            // Skip files that can't be read
          }
        }
      } catch (err) {
        logger.error(`Error analyzing documentation: ${err.message}`);
      }

    Object.assign(this.materialInsights, insights);
    logger.info(`✅ Analyzed documentation: ${Object.values(insights).flat().length} insights found`);
  }

  async analyzeCodePatterns() {
    logger.info('💻 Analyzing code patterns...');
    
    const insights = {
      patterns: [],
      preferences: []
    };

    try {
      const files = await this.findFiles(BASE_DIR, ['.ts', '.js', '.tsx', '.jsx'], 3);
      
      for (const file of files.slice(0, 30)) { // Limit for performance
          try {
            const content = fs.readFileSync(path.join(BASE_DIR, file), 'utf-8');
            
            // Extract patterns
            if (content.match(/144|99|PHI|golden|fibonacci|sacred/i)) {
              insights.patterns.push({
                file,
                type: 'mathematical',
                context: this.extractContext(content, /144|99|PHI|golden|fibonacci|sacred/i)
              });
            }

            // Extract preferences
            if (content.match(/trauma-safe|accessibility|gentle|constructive/i)) {
              insights.preferences.push({
                file,
                type: 'trauma-aware',
                context: this.extractContext(content, /trauma-safe|accessibility|gentle|constructive/i)
              });
            }
          } catch (err) {
            // Skip files that can't be read
          }
        }
      } catch (err) {
        logger.error(`Error analyzing code patterns: ${err.message}`);
      }

    this.materialInsights.patterns.push(...insights.patterns);
    this.materialInsights.preferences.push(...insights.preferences);
    logger.info(`✅ Analyzed code: ${insights.patterns.length + insights.preferences.length} insights found`);
  }

  async analyzeDesignPatterns() {
    logger.info('🎨 Analyzing design patterns...');
    
    const insights = {
      badDesignPatterns: [],
      goodDesignPatterns: [],
      missingPatterns: []
    };

    try {
      const files = await this.findFiles(BASE_DIR, ['.ts', '.tsx', '.js', '.jsx', '.md'], 3);
      
      for (const file of files.slice(0, 30)) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          
          // Detect bad design
          if (content.match(/flat|boxy|adobe|figma|claustrophobic|confining|cramped/i)) {
            insights.badDesignPatterns.push({
              file: path.relative(BASE_DIR, file),
              type: 'bad-design',
              context: this.extractContext(content, /flat|boxy|adobe|figma|claustrophobic|confining|cramped/i)
            });
          }
          
          // Detect good design
          if (content.match(/3d|immersive|sacred.*geometry|golden.*ratio|expansive|open.*space/i)) {
            insights.goodDesignPatterns.push({
              file: path.relative(BASE_DIR, file),
              type: 'good-design',
              context: this.extractContext(content, /3d|immersive|sacred.*geometry|golden.*ratio|expansive|open.*space/i)
            });
          }
          
          // Detect missing patterns
          if (!content.match(/golden.*ratio|fibonacci|144:99|3d|immersive/i)) {
            insights.missingPatterns.push({
              file: path.relative(BASE_DIR, file),
              type: 'missing-sacred-geometry-or-3d'
            });
          }
        } catch (err) {
          // Skip files we can't read
        }
      }
    } catch (err) {
      logger.error(`Error analyzing design patterns: ${err.message}`);
    }

    this.materialInsights.designPatterns = insights;
    logger.info(`✅ Analyzed design: ${Object.values(insights).flat().length} patterns found`);
  }

  async analyzeContent() {
    logger.info('📚 Analyzing content...');
    
    // Analyze extracted content files
    const contentFiles = [
      'docs/SYMBOLS_EXTRACTED.json',
      'docs/SPELLS_EXTRACTED.json',
      'docs/INFLUENCES_DISCOVERY.json',
      'docs/AUTHENTIC_VISION_DISCOVERY.json'
    ];

    const insights = {
      contentThemes: [],
      influences: []
    };

    for (const file of contentFiles) {
      const filePath = path.join(BASE_DIR, file);
      if (fs.existsSync(filePath)) {
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          
          if (file.includes('INFLUENCES')) {
            insights.influences.push({
              source: file,
              count: Object.keys(content.summary || {}).length,
              topInfluences: Object.entries(content.summary || {}).slice(0, 10)
            });
          }

          if (file.includes('SYMBOLS') || file.includes('SPELLS')) {
            insights.contentThemes.push({
              source: file,
              type: file.includes('SYMBOLS') ? 'symbols' : 'spells',
              count: content.summary?.totalSymbols || content.summary?.totalSpells || 0
            });
          }
        } catch (err) {
          logger.error(`Error analyzing ${file}: ${err.message}`);
        }
      }
    }

    this.materialInsights.contentThemes.push(...insights.contentThemes);
    this.materialInsights.influences.push(...insights.influences);
    logger.info(`✅ Analyzed content: ${insights.contentThemes.length + insights.influences.length} insights found`);
  }

  async learnAlignmentPatterns() {
    logger.info('🔍 Learning alignment patterns...');
    
    try {
      const files = await this.findFiles(BASE_DIR, ['.ts', '.js', '.tsx', '.jsx', '.md', '.json'], 3);
      
      let alignedCount = 0;
      let misalignedCount = 0;
      const commonIssues = {};
      
      for (const file of files.slice(0, 50)) { // Limit for performance
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const alignment = this.detector.analyzeFile(file, content);
          
          if (alignment.aligned) {
            alignedCount++;
            this.materialInsights.alignmentPatterns.aligned.push({
              file: path.relative(BASE_DIR, file),
              score: alignment.alignmentScore
            });
          } else if (alignment.misaligned && alignment.misaligned.length > 0) {
            misalignedCount++;
            this.materialInsights.alignmentPatterns.misaligned.push({
              file: path.relative(BASE_DIR, file),
              issues: alignment.misaligned.map(i => i.type)
            });
            
            // Track common issues
            alignment.misaligned.forEach(issue => {
              if (!commonIssues[issue.type]) {
                commonIssues[issue.type] = 0;
              }
              commonIssues[issue.type]++;
            });
          }
        } catch (err) {
          // Skip files we can't read
        }
      }
      
      // Store common issues
      this.materialInsights.alignmentPatterns.commonIssues = Object.entries(commonIssues)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([type, count]) => ({ type, count }));
      
      logger.info(`✅ Learned alignment: ${alignedCount} aligned, ${misalignedCount} misaligned`);
      logger.info(`   Common issues: ${this.materialInsights.alignmentPatterns.commonIssues.map(i => `${i.type} (${i.count})`).join(', ')}`);
    } catch (err) {
      logger.error(`Error learning alignment patterns: ${err.message}`);
    }
  }

  extractContext(content, pattern) {
    const match = content.match(new RegExp(`.{0,100}${pattern.source}.{0,100}`, 'i'));
    return match ? match[0].trim() : '';
  }

  extractInsights() {
    logger.info('💡 Extracting insights...');

    // Extract key insights from material
    const insights = {
      aestheticStandards: this.materialInsights.aestheticStandards.length > 0,
      workingStyle: this.materialInsights.workingStyle.length > 0,
      creativeProcess: this.materialInsights.creativeProcess.length > 0,
      mathematicalApproach: this.materialInsights.mathematicalApproach.length > 0,
      architecturalVision: this.materialInsights.architecturalVision.length > 0,
      teachingMethods: this.materialInsights.teachingMethods.length > 0,
      patterns: this.materialInsights.patterns.length > 0,
      preferences: this.materialInsights.preferences.length > 0,
      contentThemes: this.materialInsights.contentThemes.length > 0,
      influences: this.materialInsights.influences.length > 0,
      alignmentPatterns: {
        alignedCount: this.materialInsights.alignmentPatterns.aligned.length,
        misalignedCount: this.materialInsights.alignmentPatterns.misaligned.length,
        commonIssues: this.materialInsights.alignmentPatterns.commonIssues
      }
    };

    logger.info(`✅ Extracted insights: ${Object.values(insights).filter(Boolean).length} categories`);
  }

  updateLearningDatabase() {
    logger.info('💾 Updating learning database...');

    const updatedLearnings = {
      ...this.learnings,
      materialInsights: this.materialInsights,
      lastMaterialAnalysis: new Date().toISOString(),
      summary: {
        ...(this.learnings.summary || {}),
        materialInsights: {
          aestheticStandards: this.materialInsights.aestheticStandards.length,
          workingStyle: this.materialInsights.workingStyle.length,
          creativeProcess: this.materialInsights.creativeProcess.length,
          mathematicalApproach: this.materialInsights.mathematicalApproach.length,
          architecturalVision: this.materialInsights.architecturalVision.length,
          teachingMethods: this.materialInsights.teachingMethods.length,
          patterns: this.materialInsights.patterns.length,
          preferences: this.materialInsights.preferences.length,
          contentThemes: this.materialInsights.contentThemes.length,
          influences: this.materialInsights.influences.length
        }
      }
    };

    fs.writeFileSync(LEARNING_DB, JSON.stringify(updatedLearnings, null, 2));
    logger.info('✅ Learning database updated');
  }

  generateReport() {
    logger.info('📊 Generating material learnings report...');

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalInsights: Object.values(this.materialInsights).flat().length,
        categories: Object.keys(this.materialInsights).length
      },
      insights: this.materialInsights,
      recommendations: this.generateRecommendations()
    };

    fs.writeFileSync(MATERIAL_LEARNINGS, JSON.stringify(report, null, 2));
    logger.info(`✅ Report saved to ${MATERIAL_LEARNINGS}`);
  }

  generateRecommendations() {
    const recommendations = [];

    // Recommendations based on material analysis
    if (this.materialInsights.aestheticStandards.length > 0) {
      recommendations.push({
        type: 'aesthetic',
        priority: 'high',
        recommendation: 'Continue applying aristocratic aesthetic standards throughout all work'
      });
    }

    if (this.materialInsights.mathematicalApproach.length > 0) {
      recommendations.push({
        type: 'mathematical',
        priority: 'high',
        recommendation: 'Maintain mathematical precision and sacred geometry in all systems'
      });
    }

    if (this.materialInsights.architecturalVision.length > 0) {
      recommendations.push({
        type: 'architectural',
        priority: 'high',
        recommendation: 'Continue developing immersive 3D environments with spatial consciousness'
      });
    }

    if (this.materialInsights.teachingMethods.length > 0) {
      recommendations.push({
        type: 'teaching',
        priority: 'high',
        recommendation: 'Continue teaching through beauty, excellence, and refinement'
      });
    }

    return recommendations;
  }
}

// Main execution
async function main() {
  const learner = new MaterialLearner();
  await learner.analyzeMaterial();
  logger.info('\n✅ Material learning complete!');
}

main().catch(err => {
  logger.error(`Error in material learning: ${err.message}`);
  process.exit(1);
});

