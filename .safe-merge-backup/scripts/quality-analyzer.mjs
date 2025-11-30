#!/usr/bin/env node
/**
 * Quality Analyzer - Finds best implementations across workspaces
 * Learns from what it finds and updates the experiment
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class QualityAnalyzer {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];
    this.bestImplementations = new Map();
    this.learnings = [];
  }

  async run() {
    console.log('🔍 QUALITY ANALYZER - Finding Best Implementations\n');
    console.log('═'.repeat(80) + '\n');
    
    await this.analyzeExperimentFiles();
    await this.analyzeEngineFiles();
    await this.analyzeToolFiles();
    await this.extractLearnings();
    await this.updateExperiment();
    this.printReport();
  }

  async analyzeExperimentFiles() {
    console.log('📊 Analyzing experiment files...\n');
    
    const experimentFiles = [];
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      // Direct file search
      const searchPaths = [
        path.join(workspace, 'scripts'),
        path.join(workspace, 'tools'),
        path.join(workspace, 'packages')
      ];
      
      for (const searchPath of searchPaths) {
        if (!fs.existsSync(searchPath)) continue;
        
        const files = this.findFilesRecursive(searchPath, [
          'improvement',
          'experiment',
          'doubt'
        ]);
        
        for (const file of files) {
          try {
            const content = fs.readFileSync(file, 'utf8');
            const quality = this.assessQuality(content, file);
            
            experimentFiles.push({
              file,
              workspace,
              quality,
              content
            });
          } catch (e) {
            // Skip if can't read
          }
        }
      }
    }
    
    // Find best by category
    const categories = ['structure', 'error-handling', 'documentation', 'type-safety', 'features'];
    
    for (const category of categories) {
      const best = experimentFiles
        .filter(f => f.quality[category] > 0)
        .sort((a, b) => b.quality[category] - a.quality[category])[0];
      
      if (best) {
        const key = `experiment-${category}`;
        this.bestImplementations.set(key, best);
        console.log(`   ✅ Best ${category}: ${path.relative(rootDir, best.file)}`);
      }
    }
    
    console.log(`\n   Analyzed ${experimentFiles.length} experiment files\n`);
  }

  async analyzeEngineFiles() {
    console.log('⚙️  Analyzing engine files...\n');
    
    const engineFiles = [];
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      const packagesDir = path.join(workspace, 'packages');
      if (!fs.existsSync(packagesDir)) continue;
      
      const files = this.findFiles(packagesDir, [
        '**/*engine*.ts',
        '**/*Engine*.ts',
        '**/*core*.ts',
        '**/*Core*.ts'
      ]);
      
      for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const quality = this.assessQuality(content, file);
        
        engineFiles.push({
          file,
          workspace,
          quality,
          content
        });
      }
    }
    
    // Find best engines
    const bestOverall = engineFiles
      .sort((a, b) => {
        const aTotal = Object.values(a.quality).reduce((sum, v) => sum + v, 0);
        const bTotal = Object.values(b.quality).reduce((sum, v) => sum + v, 0);
        return bTotal - aTotal;
      })[0];
    
    if (bestOverall) {
      this.bestImplementations.set('engine-best', bestOverall);
      console.log(`   ✅ Best engine: ${path.relative(rootDir, bestOverall.file)}`);
    }
    
    console.log(`\n   Analyzed ${engineFiles.length} engine files\n`);
  }

  async analyzeToolFiles() {
    console.log('🛠️  Analyzing tool files...\n');
    
    const toolFiles = [];
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      const toolsDir = path.join(workspace, 'tools');
      const scriptsDir = path.join(workspace, 'scripts');
      
      const files = [
        ...(fs.existsSync(toolsDir) ? this.findFiles(toolsDir, ['**/*.mjs', '**/*.ts']) : []),
        ...(fs.existsSync(scriptsDir) ? this.findFiles(scriptsDir, ['**/*.mjs', '**/*.ts']) : [])
      ];
      
      for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const quality = this.assessQuality(content, file);
        
        toolFiles.push({
          file,
          workspace,
          quality,
          content
        });
      }
    }
    
    // Find best tools
    const bestTool = toolFiles
      .sort((a, b) => {
        const aTotal = Object.values(a.quality).reduce((sum, v) => sum + v, 0);
        const bTotal = Object.values(b.quality).reduce((sum, v) => sum + v, 0);
        return bTotal - aTotal;
      })[0];
    
    if (bestTool) {
      this.bestImplementations.set('tool-best', bestTool);
      console.log(`   ✅ Best tool: ${path.relative(rootDir, bestTool.file)}`);
    }
    
    console.log(`\n   Analyzed ${toolFiles.length} tool files\n`);
  }

  findFiles(dir, patterns) {
    const files = [];
    
    if (!fs.existsSync(dir)) return files;
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.name.startsWith('.') || 
            entry.name === 'node_modules' || 
            entry.name === 'dist' ||
            entry.name === 'build') continue;
        
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          files.push(...this.findFiles(fullPath, patterns));
        } else if (entry.isFile()) {
          // Check if file matches any pattern
          let matches = false;
          for (const pattern of patterns) {
            if (this.matchesPattern(entry.name, pattern) || 
                this.matchesPattern(fullPath, pattern)) {
              matches = true;
              break;
            }
          }
          if (matches) {
            files.push(fullPath);
          }
        }
      }
    } catch (e) {
      // Ignore
    }
    
    return files;
  }

  matchesPattern(filename, pattern) {
    const regex = pattern
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*')
      .replace(/\./g, '\\.');
    return new RegExp(regex, 'i').test(filename);
  }

  findFilesRecursive(dir, keywords) {
    const files = [];
    
    if (!fs.existsSync(dir)) return files;
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.name.startsWith('.') || 
            entry.name === 'node_modules' || 
            entry.name === 'dist' ||
            entry.name === 'build') continue;
        
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          files.push(...this.findFilesRecursive(fullPath, keywords));
        } else if (entry.isFile()) {
          // Check if filename contains any keyword
          const lowerName = entry.name.toLowerCase();
          const lowerPath = fullPath.toLowerCase();
          
          for (const keyword of keywords) {
            if (lowerName.includes(keyword.toLowerCase()) || 
                lowerPath.includes(keyword.toLowerCase())) {
              if (entry.name.endsWith('.ts') || 
                  entry.name.endsWith('.mjs') || 
                  entry.name.endsWith('.js')) {
                files.push(fullPath);
                break;
              }
            }
          }
        }
      }
    } catch (e) {
      // Ignore
    }
    
    return files;
  }

  assessQuality(content, filePath) {
    const quality = {
      structure: 0,
      'error-handling': 0,
      documentation: 0,
      'type-safety': 0,
      features: 0,
      performance: 0,
      security: 0
    };
    
    // Structure quality
    if (content.includes('class ') && content.includes('constructor')) quality.structure += 2;
    if (content.includes('async ') && content.includes('await')) quality.structure += 1;
    if (content.includes('export ')) quality.structure += 1;
    if (content.match(/function\s+\w+/g)) quality.structure += 1;
    
    // Error handling
    const errorHandlingPatterns = [
      /try\s*\{/g,
      /catch\s*\(/g,
      /\.catch\(/g,
      /if\s*\(.*error/gi,
      /throw\s+new\s+Error/gi
    ];
    errorHandlingPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) quality['error-handling'] += matches.length;
    });
    
    // Documentation
    if (content.includes('/**')) quality.documentation += 2;
    if (content.includes('@license')) quality.documentation += 1;
    if (content.includes('@author')) quality.documentation += 1;
    if (content.match(/\/\/\s+[A-Z]/g)) quality.documentation += 1;
    if (content.includes('README') || content.includes('README.md')) quality.documentation += 1;
    
    // Type safety
    if (filePath.endsWith('.ts')) {
      if (content.includes(': string') || content.includes(': number')) quality['type-safety'] += 2;
      if (content.includes('interface ') || content.includes('type ')) quality['type-safety'] += 2;
      if (!content.includes(': any')) quality['type-safety'] += 1;
      if (content.includes('as const')) quality['type-safety'] += 1;
    }
    
    // Features
    if (content.includes('import ') || content.includes('require(')) quality.features += 1;
    if (content.includes('export ')) quality.features += 1;
    if (content.includes('async')) quality.features += 1;
    if (content.includes('await')) quality.features += 1;
    if (content.includes('Promise')) quality.features += 1;
    
    // Performance
    if (content.includes('cache') || content.includes('Cache')) quality.performance += 1;
    if (content.includes('lazy') || content.includes('Lazy')) quality.performance += 1;
    if (content.includes('memoize') || content.includes('Memoize')) quality.performance += 1;
    
    // Security
    if (content.includes('validate') || content.includes('Validate')) quality.security += 1;
    if (content.includes('sanitize') || content.includes('Sanitize')) quality.security += 1;
    if (!content.includes('eval(')) quality.security += 2;
    if (!content.includes('innerHTML')) quality.security += 1;
    
    return quality;
  }

  async extractLearnings() {
    console.log('🧠 Extracting learnings...\n');
    
    for (const [key, implementation] of this.bestImplementations.entries()) {
      const learnings = this.analyzeImplementation(implementation);
      this.learnings.push({
        source: key,
        file: path.relative(rootDir, implementation.file),
        learnings
      });
      
      console.log(`   ✅ Learned from ${path.basename(implementation.file)}:`);
      learnings.forEach(l => console.log(`      - ${l}`));
    }
    
    console.log('');
  }

  analyzeImplementation(impl) {
    const learnings = [];
    const content = impl.content;
    
    // Extract patterns
    if (content.includes('class ') && content.includes('async ')) {
      learnings.push('Use async class methods for better structure');
    }
    
    if (content.match(/try\s*\{[\s\S]{1,200}catch/)) {
      learnings.push('Comprehensive error handling with try-catch');
    }
    
    if (content.includes('/**') && content.includes('@license')) {
      learnings.push('Well-documented with JSDoc and license');
    }
    
    if (content.includes('interface ') || content.includes('type ')) {
      learnings.push('Strong type definitions');
    }
    
    if (content.includes('export ') && content.includes('export default')) {
      learnings.push('Proper module exports');
    }
    
    if (content.includes('validate') || content.includes('sanitize')) {
      learnings.push('Input validation and sanitization');
    }
    
    if (content.includes('cache') || content.includes('memoize')) {
      learnings.push('Performance optimization with caching');
    }
    
    return learnings;
  }

  async updateExperiment() {
    console.log('🔄 Updating experiment with best practices...\n');
    
    const experimentFile = path.join(rootDir, 'scripts/10-hour-improvement-experiment.ts');
    if (!fs.existsSync(experimentFile)) {
      console.log('   ⚠️  Experiment file not found\n');
      return;
    }
    
    let content = fs.readFileSync(experimentFile, 'utf8');
    let updated = false;
    
    // Add learnings as comments
    const learningsComment = `\n  /**
   * Best Practices Learned from Quality Analysis:
   * ${this.learnings.map(l => `   * - ${l.learnings.join(', ')}`).join('\n   * ')}
   */\n`;
    
    if (!content.includes('Best Practices Learned')) {
      // Find a good place to insert
      const classMatch = content.match(/(class\s+\w+[^{]*\{)/);
      if (classMatch) {
        const insertPos = classMatch.index + classMatch[0].length;
        content = content.slice(0, insertPos) + learningsComment + content.slice(insertPos);
        updated = true;
      }
    }
    
    // Ensure error handling patterns
    if (!content.includes('try {') && content.includes('async ')) {
      // Add error handling example
      const asyncMatch = content.match(/(async\s+\w+\([^)]*\)\s*\{)/);
      if (asyncMatch && !content.slice(asyncMatch.index).includes('try {')) {
        // Would need more context to safely add
      }
    }
    
    if (updated) {
      fs.writeFileSync(experimentFile, content, 'utf8');
      console.log('   ✅ Experiment updated with learnings\n');
    } else {
      console.log('   ℹ️  Experiment already follows best practices\n');
    }
  }

  printReport() {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                  🔍 QUALITY ANALYSIS REPORT                                   ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 BEST IMPLEMENTATIONS FOUND:\n');
    
    for (const [key, impl] of this.bestImplementations.entries()) {
      console.log(`   ${key}:`);
      console.log(`      File: ${path.relative(rootDir, impl.file)}`);
      console.log(`      Quality Scores:`);
      Object.entries(impl.quality).forEach(([k, v]) => {
        if (v > 0) console.log(`         ${k}: ${v}`);
      });
      console.log('');
    }
    
    console.log('🧠 LEARNINGS EXTRACTED:\n');
    this.learnings.forEach(l => {
      console.log(`   From ${l.file}:`);
      l.learnings.forEach(learning => console.log(`      - ${learning}`));
      console.log('');
    });
    
    console.log('═'.repeat(80) + '\n');
  }
}

async function main() {
  const analyzer = new QualityAnalyzer();
  await analyzer.run();
}

main().catch(console.error);

