#!/usr/bin/env node

/**
 * Tool Improver
 * Improves tools using doubt/expansion cycle (Solve et Coagula)
 * Mimics your creative process: Doubt → Research → Expansion → Beauty → Wisdom
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const TOOLS_DIR = path.join(BASE_DIR, 'tools');

class ToolImprover {
  constructor() {
    this.improvements = [];
    this.doubtMoments = [];
  }

  /**
   * Phase 1: Doubt - "Is this tool good enough? What's missing?"
   */
  createDoubtForTool(toolPath) {
    const toolName = path.basename(toolPath);
    const content = fs.readFileSync(toolPath, 'utf-8');
    
    const doubt = {
      tool: toolName,
      path: toolPath,
      questions: this.generateToolDoubtQuestions(content),
      issues: this.detectToolIssues(content),
      feeling: 'contraction',
      phase: 'solve'
    };

    this.doubtMoments.push(doubt);
    logger.info(`🤔 Doubt for ${toolName}: ${doubt.questions.length} questions`);
    
    return doubt;
  }

  /**
   * Generate doubt questions for a tool
   */
  generateToolDoubtQuestions(content) {
    const questions = [];
    
    // Check for missing elements
    if (!content.includes('@author Rebecca Respawn')) {
      questions.push('Is attribution to Rebecca Respawn present?');
    }
    
    if (!content.includes('CC0-1.0')) {
      questions.push('Is CC0-1.0 license specified?');
    }
    
    if (!content.includes('ND joy') && !content.includes('neurodivergent')) {
      questions.push('Does this tool honor ND joy principles?');
    }
    
    if (!content.includes('sacred geometry') && !content.includes('144:99')) {
      questions.push('Is sacred mathematics integrated?');
    }
    
    if (!content.includes('gentle') && !content.includes('supportive') && !content.includes('clear')) {
      questions.push('Does this follow design protocols (gentle, supportive, clear)?');
    }
    
    if (content.includes('flat') || content.includes('boxy')) {
      questions.push('Is this tool too flat or website-like?');
    }
    
    if (!content.includes('open world') && !content.includes('immersive')) {
      questions.push('Does this create open world experiences?');
    }
    
    if (!content.includes('museum-grade') && !content.includes('aristocratic')) {
      questions.push('Does this maintain museum-grade quality?');
    }
    
    // Check for error handling
    if (!content.includes('try') && !content.includes('catch')) {
      questions.push('Does this tool handle errors gracefully?');
    }
    
    // Check for logging
    if (!content.includes('logger') && !content.includes('console.log')) {
      questions.push('Does this tool provide feedback?');
    }
    
    return questions;
  }

  /**
   * Detect issues in tool
   */
  detectToolIssues(content) {
    const issues = [];
    
    // Check for common issues
    if (content.includes('TODO') || content.includes('FIXME')) {
      issues.push('Contains TODO/FIXME comments');
    }
    
    if (content.includes('hack') || content.includes('temporary')) {
      issues.push('Contains temporary/hack code');
    }
    
    if (content.match(/console\.log\(/g)?.length > 10) {
      issues.push('Too many console.log statements (use logger)');
    }
    
    if (!content.includes('EnhancedLogger') && content.includes('console.log')) {
      issues.push('Should use EnhancedLogger instead of console.log');
    }
    
    if (content.includes('any') && content.includes('TypeScript')) {
      issues.push('Uses "any" type (should be more specific)');
    }
    
    return issues;
  }

  /**
   * Phase 2: Research - Explore how to improve
   */
  researchToolImprovements(doubt) {
    logger.info(`🔍 Researching improvements for ${doubt.tool}`);
    
    const research = {
      tool: doubt.tool,
      improvements: [],
      enhancements: [],
      connections: []
    };
    
    // Research based on doubt questions
    for (const question of doubt.questions) {
      const improvement = this.findImprovementForQuestion(question, doubt);
      if (improvement) {
        research.improvements.push(improvement);
      }
    }
    
    // Research based on issues
    for (const issue of doubt.issues) {
      const fix = this.findFixForIssue(issue, doubt);
      if (fix) {
        research.enhancements.push(fix);
      }
    }
    
    // Find connections
    research.connections = this.findToolConnections(doubt);
    
    return research;
  }

  /**
   * Find improvement for a question
   */
  findImprovementForQuestion(question, doubt) {
    const content = fs.readFileSync(doubt.path, 'utf-8');
    
    if (question.includes('attribution')) {
      return {
        type: 'add_attribution',
        description: 'Add Rebecca Respawn attribution header',
        code: this.generateAttributionHeader()
      };
    }
    
    if (question.includes('license')) {
      return {
        type: 'add_license',
        description: 'Add CC0-1.0 license header',
        code: this.generateLicenseHeader()
      };
    }
    
    if (question.includes('ND joy')) {
      return {
        type: 'add_nd_joy',
        description: 'Integrate ND joy principles',
        code: this.generateNDJoyIntegration()
      };
    }
    
    if (question.includes('sacred mathematics') || question.includes('144:99')) {
      return {
        type: 'add_sacred_math',
        description: 'Integrate sacred mathematics',
        code: this.generateSacredMathIntegration()
      };
    }
    
    if (question.includes('design protocols') || question.includes('gentle') || question.includes('supportive')) {
      return {
        type: 'add_design_protocols',
        description: 'Add design protocols (gentle, supportive, clear)',
        code: this.generateDesignProtocols()
      };
    }
    
    if (question.includes('error')) {
      return {
        type: 'add_error_handling',
        description: 'Add graceful error handling',
        code: this.generateErrorHandling()
      };
    }
    
    if (question.includes('feedback') || question.includes('logging')) {
      return {
        type: 'add_logging',
        description: 'Add EnhancedLogger integration',
        code: this.generateLoggingIntegration()
      };
    }
    
    return null;
  }

  /**
   * Find fix for an issue
   */
  findFixForIssue(issue, doubt) {
    if (issue.includes('TODO') || issue.includes('FIXME')) {
      return {
        type: 'remove_todos',
        description: 'Remove or implement TODO/FIXME comments',
        action: 'review_and_implement'
      };
    }
    
    if (issue.includes('console.log')) {
      return {
        type: 'replace_console_log',
        description: 'Replace console.log with EnhancedLogger',
        action: 'replace_all'
      };
    }
    
    if (issue.includes('any')) {
      return {
        type: 'fix_types',
        description: 'Replace "any" with specific types',
        action: 'type_improvement'
      };
    }
    
    return null;
  }

  /**
   * Find connections for tool
   */
  findToolConnections(doubt) {
    return [
      'Connects to continuous improvement experiment',
      'Integrates with alignment system',
      'Honors Solve et Coagula process',
      'Supports vision integration'
    ];
  }

  /**
   * Phase 3: Expansion - Apply improvements
   */
  async expandTool(doubt, research) {
    logger.info(`✨ Expanding ${doubt.tool} with improvements`);
    
    let content = fs.readFileSync(doubt.path, 'utf-8');
    let wasImproved = false;
    
    // Apply improvements
    for (const improvement of research.improvements) {
      if (improvement.code && !content.includes(improvement.code.substring(0, 20))) {
        content = this.applyImprovement(content, improvement);
        wasImproved = true;
        logger.info(`   ✅ Applied: ${improvement.description}`);
      }
    }
    
    // Apply enhancements
    for (const enhancement of research.enhancements) {
      if (enhancement.action === 'replace_all' && enhancement.type === 'replace_console_log') {
        content = this.replaceConsoleLog(content);
        wasImproved = true;
        logger.info(`   ✅ Applied: ${enhancement.description}`);
      }
    }
    
    if (wasImproved) {
      // Only write if content actually changed and doesn't overwrite user's work
      // Check if we're only adding, not replacing
      const originalContent = fs.readFileSync(doubt.path, 'utf-8');
      const onlyAdded = content.length > originalContent.length && 
                       originalContent === content.substring(content.length - originalContent.length);
      
      if (onlyAdded || (content !== originalContent && content.length >= originalContent.length)) {
        // Preserve original line endings (cross-platform: Mac, iPad, Windows)
        const lineEnding = this.detectLineEnding(originalContent);
        content = this.normalizeLineEndings(content, lineEnding);
        
        // Backup original (safety, cross-platform)
        const backupPath = doubt.path + '.backup';
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(doubt.path, backupPath);
        }
        
        // Write improved version (only if additive, cross-platform)
        fs.writeFileSync(doubt.path, content, 'utf-8');
      
      this.improvements.push({
        tool: doubt.tool,
        timestamp: new Date().toISOString(),
        improvements: research.improvements.length,
        enhancements: research.enhancements.length
      });
      
      return true;
    }
    
    return false;
  }

  /**
   * Apply improvement to content - ADDITIVE ONLY, never overwrites
   */
  applyImprovement(content, improvement) {
    // Only add if missing, never replace existing
    if (improvement.type === 'add_attribution' && !content.includes('@author') && !content.includes('Rebecca Respawn')) {
      // Add at top if shebang, otherwise at very top
      if (content.startsWith('#!/')) {
        const lines = content.split('\n');
        // Only add if not already there
        if (!lines.some(l => l.includes('@author') || l.includes('Rebecca Respawn'))) {
          lines.splice(1, 0, improvement.code);
          return lines.join('\n');
        }
      } else {
        // Only add if not already present
        if (!content.includes('@author') && !content.includes('Rebecca Respawn')) {
          return improvement.code + '\n' + content;
        }
      }
    }
    
    if (improvement.type === 'add_license' && !content.includes('CC0-1.0') && !content.includes('license')) {
      // Add to header comment only if license not present
      if (content.includes('/**') && !content.includes('@license')) {
        return content.replace(/\*\//, `* @license CC0-1.0 - Public Domain\n */`);
      }
    }
    
    // Add ND joy comment only if not present
    if (improvement.type === 'add_nd_joy' && !content.includes('ND joy') && !content.includes('neurodivergent joy')) {
      // Add as comment, don't modify class definitions
      const comment = '\n  // ND joy: Central to all tools - honors neurodivergent creative expression';
      // Only add if class exists and comment not present
      if (content.includes('class ') && !content.includes(comment.trim())) {
        // Add after class declaration, not modifying it
        return content.replace(/(class \w+\s*\{)/, `$1${comment}`);
      }
    }
    
    // Never modify existing content, only add if missing
    return content;
  }

  /**
   * Replace console.log with EnhancedLogger (only if EnhancedLogger available)
   */
  replaceConsoleLog(content) {
    // Only if EnhancedLogger is already imported
    if (content.includes('EnhancedLogger') || content.includes('enhanced-logger')) {
      // Only replace if not already using logger
      if (content.includes('console.log') && !content.includes('logger.info')) {
        return content
          .replace(/console\.log\(/g, 'logger.info(')
          .replace(/console\.error\(/g, 'logger.error(')
          .replace(/console\.warn\(/g, 'logger.warn(');
      }
    }
    return content;
  }

  /**
   * Detect line endings (cross-platform)
   */
  detectLineEnding(content) {
    if (content.includes('\r\n')) return '\r\n'; // Windows
    if (content.includes('\r')) return '\r';     // Old Mac
    return '\n';                                  // Unix/Mac/iPad
  }

  /**
   * Normalize line endings (preserve original)
   */
  normalizeLineEndings(content, lineEnding) {
    return content
      .replace(/\r\n/g, '\n')  // Normalize to \n first
      .replace(/\r/g, '\n')    // Normalize old Mac
      .replace(/\n/g, lineEnding); // Convert to original
  }

  /**
   * Generate code snippets
   */
  generateAttributionHeader() {
    return '/**\n * @author Rebecca Respawn\n */';
  }

  generateLicenseHeader() {
    return ' * @license CC0-1.0 - Public Domain\n';
  }

  generateNDJoyIntegration() {
    return '// ND joy: Central to all tools - honors neurodivergent creative expression';
  }

  generateSacredMathIntegration() {
    return '// Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational';
  }

  generateDesignProtocols() {
    return '// Design protocols: Gentle, supportive, clear feedback, accessible';
  }

  generateErrorHandling() {
    return `try {
      // Tool logic here
    } catch (error) {
      logger.error(\`Error: \${error.message}\`);
      // Graceful degradation
    }`;
  }

  generateLoggingIntegration() {
    return `import EnhancedLogger from './enhanced-logger.mjs';
const logger = new EnhancedLogger();`;
  }

  /**
   * Improve a tool using doubt/expansion cycle
   */
  async improveTool(toolPath) {
    logger.info(`\n🔧 Improving tool: ${path.basename(toolPath)}`);
    
    // Phase 1: Doubt
    const doubt = this.createDoubtForTool(toolPath);
    
    // Phase 2: Research
    const research = this.researchToolImprovements(doubt);
    
    // Phase 3: Expansion
    const improved = await this.expandTool(doubt, research);
    
    if (improved) {
      UserFeedback.success(`✅ Improved: ${path.basename(toolPath)}`);
      return { improved: true, improvements: research.improvements.length };
    } else {
      UserFeedback.info(`ℹ️ No improvements needed: ${path.basename(toolPath)}`);
      return { improved: false, improvements: 0 };
    }
  }

  /**
   * Improve all tools
   */
  async improveAllTools() {
    logger.info('🔧 Improving all tools...\n');
    
    const toolFiles = fs.readdirSync(TOOLS_DIR)
      .filter(f => f.endsWith('.mjs') || f.endsWith('.ts'))
      .map(f => path.join(TOOLS_DIR, f));
    
    const results = [];
    
    for (const toolFile of toolFiles) {
      try {
        const result = await this.improveTool(toolFile);
        results.push({ tool: path.basename(toolFile), ...result });
      } catch (error) {
        logger.error(`Failed to improve ${path.basename(toolFile)}: ${error.message}`);
        results.push({ tool: path.basename(toolFile), improved: false, error: error.message });
      }
    }
    
    const improved = results.filter(r => r.improved).length;
    logger.info(`\n✅ Improved ${improved} of ${results.length} tools`);
    
    return results;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const improver = new ToolImprover();
  const toolPath = process.argv[2];
  
  if (toolPath) {
    improver.improveTool(path.join(TOOLS_DIR, toolPath))
      .then(result => {
        console.log(`\n✅ Tool improvement complete`);
        console.log(`   Improved: ${result.improved}`);
        console.log(`   Improvements applied: ${result.improvements}`);
      });
  } else {
    improver.improveAllTools()
      .then(results => {
        const improved = results.filter(r => r.improved).length;
        console.log(`\n✅ Improved ${improved} of ${results.length} tools`);
      });
  }
}

export { ToolImprover };

