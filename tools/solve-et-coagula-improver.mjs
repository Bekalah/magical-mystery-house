#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */

/**
 * Solve et Coagula Improver
 * Implements the alchemical creative process:
 * 1. Solve (Doubt) - "Is this good enough? What's missing?"
 * 2. Coagula (Research) - "How can we make it better?"
 * 3. Transmutation (Implementation) - Create new tools, new beauty, new wisdom
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Solve et Coagula Improver');
logger.info('   → Implements alchemical creative process');
logger.info('   → Doubt → Research → Implementation');
logger.info('   → Covers all tools, apps, packages, pages');
logger.info('   → Validates open source, license, security\n');

// Phase 1: SOLVE (Doubt) - What's missing?
function solvePhase() {
  logger.info('🔍 SOLVE Phase: Doubt - "Is this good enough? What\'s missing?"');
  
  const doubts = [];
  
  // Check for missing licenses
  const filesWithoutLicense = findFilesWithoutLicense();
  if (filesWithoutLicense.length > 0) {
    doubts.push({
      type: 'license',
      issue: `${filesWithoutLicense.length} files missing license headers`,
      files: filesWithoutLicense.slice(0, 10),
      priority: 'high'
    });
  }
  
  // Check for security issues
  const securityIssues = findSecurityIssues();
  if (securityIssues.length > 0) {
    doubts.push({
      type: 'security',
      issue: `${securityIssues.length} potential security issues`,
      issues: securityIssues.slice(0, 10),
      priority: 'critical'
    });
  }
  
  // Check for missing open source compliance
  const openSourceIssues = findOpenSourceIssues();
  if (openSourceIssues.length > 0) {
    doubts.push({
      type: 'open_source',
      issue: `${openSourceIssues.length} open source compliance issues`,
      issues: openSourceIssues.slice(0, 10),
      priority: 'high'
    });
  }
  
  // Check for incomplete implementations
  const incompleteFiles = findIncompleteFiles();
  if (incompleteFiles.length > 0) {
    doubts.push({
      type: 'incomplete',
      issue: `${incompleteFiles.length} files with incomplete implementations`,
      files: incompleteFiles.slice(0, 10),
      priority: 'medium'
    });
  }
  
  // Check for missing documentation
  const missingDocs = findMissingDocumentation();
  if (missingDocs.length > 0) {
    doubts.push({
      type: 'documentation',
      issue: `${missingDocs.length} packages/apps missing documentation`,
      files: missingDocs.slice(0, 10),
      priority: 'medium'
    });
  }
  
  logger.info(`   Found ${doubts.length} areas needing attention`);
  return doubts;
}

// Phase 2: COAGULA (Research) - How can we make it better?
function coagulaPhase(doubts) {
  logger.info('🔬 COAGULA Phase: Research - "How can we make it better?"');
  
  const research = [];
  
  for (const doubt of doubts) {
    const recommendations = researchImprovements(doubt);
    research.push({
      doubt: doubt,
      recommendations: recommendations,
      implementation: generateImplementationPlan(doubt, recommendations)
    });
  }
  
  logger.info(`   Researched ${research.length} improvement areas`);
  return research;
}

// Phase 3: TRANSMUTATION (Implementation) - Create new tools, new beauty
function transmutationPhase(research) {
  logger.info('✨ TRANSMUTATION Phase: Implementation - "Create new tools, new beauty"');
  
  const implementations = [];
  
  for (const item of research) {
    const result = implementImprovements(item);
    implementations.push(result);
  }
  
  logger.info(`   Implemented ${implementations.filter(i => i.success).length}/${implementations.length} improvements`);
  return implementations;
}

function findFilesWithoutLicense() {
  const files = [];
  const dirs = [
    path.join(BASE_DIR, 'packages'),
    path.join(BASE_DIR, 'apps'),
    path.join(BASE_DIR, 'tools')
  ];
  
  function searchDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchDir(fullPath);
        } else if (entry.match(/\.(ts|tsx|js|jsx|mjs)$/)) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          if (!content.includes('CC0-1.0') && !content.includes('@license') && !content.includes('Public Domain')) {
            files.push(fullPath);
          }
        }
      }
    } catch {
      // Skip
    }
  }
  
  dirs.forEach(dir => searchDir(dir));
  return files;
}

function findSecurityIssues() {
  const issues = [];
  const dirs = [
    path.join(BASE_DIR, 'packages'),
    path.join(BASE_DIR, 'apps'),
    path.join(BASE_DIR, 'tools')
  ];
  
  const securityPatterns = [
    { pattern: /eval\s*\(/, issue: 'Use of eval() - security risk' },
    { pattern: /process\.env\.\w+.*password/i, issue: 'Potential password in environment variable' },
    { pattern: /\.innerHTML\s*=/, issue: 'innerHTML assignment - XSS risk' },
    { pattern: /dangerouslySetInnerHTML/, issue: 'dangerouslySetInnerHTML - XSS risk' },
    { pattern: /execSync.*\$/, issue: 'Command injection risk' }
  ];
  
  function searchDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchDir(fullPath);
        } else if (entry.match(/\.(ts|tsx|js|jsx|mjs)$/)) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          securityPatterns.forEach(({ pattern, issue }) => {
            if (pattern.test(content) && !content.includes('// SECURITY:') && !content.includes('// SAFE:')) {
              issues.push({
                file: path.relative(BASE_DIR, fullPath),
                issue: issue
              });
            }
          });
        }
      }
    } catch {
      // Skip
    }
  }
  
  dirs.forEach(dir => searchDir(dir));
  return issues;
}

function findOpenSourceIssues() {
  const issues = [];
  
  // Check package.json files for license
  const packageJsonFiles = [];
  function findPackageJson(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          findPackageJson(fullPath);
        } else if (entry === 'package.json') {
          packageJsonFiles.push(fullPath);
        }
      }
    } catch {
      // Skip
    }
  }
  
  findPackageJson(BASE_DIR);
  
  packageJsonFiles.forEach(file => {
    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
      if (!content.license || (content.license !== 'CC0-1.0' && content.license !== 'MIT' && content.license !== 'Apache-2.0')) {
        issues.push({
          file: path.relative(BASE_DIR, file),
          issue: `License should be CC0-1.0 (or MIT/Apache-2.0 for open source)`,
          current: content.license || 'missing'
        });
      }
    } catch {
      // Skip invalid JSON
    }
  });
  
  return issues;
}

function findIncompleteFiles() {
  const files = [];
  const dirs = [
    path.join(BASE_DIR, 'packages'),
    path.join(BASE_DIR, 'apps'),
    path.join(BASE_DIR, 'tools')
  ];
  
  const incompletePatterns = [
    /TODO|FIXME|XXX|HACK|STUB|PLACEHOLDER/i,
    /throw new Error\('Not implemented'\)/,
    /return null;.*\/\/ TODO/
  ];
  
  function searchDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchDir(fullPath);
        } else if (entry.match(/\.(ts|tsx|js|jsx|mjs)$/)) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          incompletePatterns.forEach(pattern => {
            if (pattern.test(content)) {
              files.push(fullPath);
              return;
            }
          });
        }
      }
    } catch {
      // Skip
    }
  }
  
  dirs.forEach(dir => searchDir(dir));
  return [...new Set(files)]; // Remove duplicates
}

function findMissingDocumentation() {
  const missing = [];
  const dirs = [
    path.join(BASE_DIR, 'packages'),
    path.join(BASE_DIR, 'apps')
  ];
  
  function searchDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      const hasReadme = entries.includes('README.md');
      const hasPackageJson = entries.includes('package.json');
      
      if (hasPackageJson && !hasReadme) {
        missing.push(dir);
      }
      
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchDir(fullPath);
        }
      }
    } catch {
      // Skip
    }
  }
  
  dirs.forEach(dir => searchDir(dir));
  return missing;
}

function researchImprovements(doubt) {
  const recommendations = [];
  
  switch (doubt.type) {
    case 'license':
      recommendations.push({
        action: 'Add CC0-1.0 license headers',
        description: 'Add license header to all source files',
        example: '/**\n * @license CC0-1.0 - Public Domain\n */'
      });
      break;
      
    case 'security':
      recommendations.push({
        action: 'Fix security issues',
        description: 'Replace unsafe patterns with secure alternatives',
        examples: [
          'eval() → Use Function() or safer alternatives',
          'innerHTML → Use textContent or sanitize',
          'Command injection → Use parameterized commands'
        ]
      });
      break;
      
    case 'open_source':
      recommendations.push({
        action: 'Update licenses to CC0-1.0',
        description: 'Ensure all packages use open source licenses',
        note: 'CC0-1.0 is public domain, perfect for open source'
      });
      break;
      
    case 'incomplete':
      recommendations.push({
        action: 'Complete implementations',
        description: 'Remove TODOs and implement missing functionality',
        priority: 'medium'
      });
      break;
      
    case 'documentation':
      recommendations.push({
        action: 'Add README files',
        description: 'Create documentation for all packages and apps',
        template: 'Include purpose, usage, examples'
      });
      break;
  }
  
  return recommendations;
}

function generateImplementationPlan(doubt, recommendations) {
  return {
    steps: recommendations.map(rec => rec.action),
    priority: doubt.priority,
    estimatedTime: doubt.priority === 'critical' ? 'immediate' : doubt.priority === 'high' ? 'soon' : 'when possible'
  };
}

function implementImprovements(item) {
  const { doubt, recommendations, implementation } = item;
  let success = false;
  let changes = [];
  
  try {
    switch (doubt.type) {
      case 'license':
        // Add license headers to files
        doubt.files.slice(0, 5).forEach(file => {
          try {
            const content = fs.readFileSync(file, 'utf-8');
            if (!content.startsWith('/**')) {
              const licenseHeader = '/**\n * @license CC0-1.0 - Public Domain\n */\n\n';
              fs.writeFileSync(file, licenseHeader + content, 'utf-8');
              changes.push(`Added license to ${path.basename(file)}`);
            }
          } catch {
            // Skip files that can't be modified
          }
        });
        success = changes.length > 0;
        break;
        
      case 'open_source':
        // Update package.json licenses
        doubt.issues.slice(0, 5).forEach(issue => {
          try {
            const content = JSON.parse(fs.readFileSync(issue.file, 'utf-8'));
            content.license = 'CC0-1.0';
            fs.writeFileSync(issue.file, JSON.stringify(content, null, 2) + '\n', 'utf-8');
            changes.push(`Updated license in ${path.basename(issue.file)}`);
          } catch {
            // Skip
          }
        });
        success = changes.length > 0;
        break;
        
      case 'documentation':
        // Create README files
        doubt.files.slice(0, 3).forEach(dir => {
          try {
            const readmePath = path.join(dir, 'README.md');
            const packageJsonPath = path.join(dir, 'package.json');
            let name = path.basename(dir);
            let description = '';
            
            if (fs.existsSync(packageJsonPath)) {
              // Handle JSDoc header in package.json
              const pkgContent = fs.readFileSync(packageJsonPath, 'utf-8');
              const jsonStart = pkgContent.indexOf('{');
              const pkg = JSON.parse(pkgContent.substring(jsonStart));
              name = pkg.name || name;
              description = pkg.description || '';
            }
            
            const readme = `# ${name}\n\n${description}\n\n## License\n\nCC0-1.0 - Public Domain\n`;
            fs.writeFileSync(readmePath, readme, 'utf-8');
            changes.push(`Created README for ${name}`);
          } catch {
            // Skip
          }
        });
        success = changes.length > 0;
        break;
        
      default:
        // Other types need manual review
        success = false;
    }
  } catch (error) {
    logger.error(`Implementation failed: ${error.message}`);
    success = false;
  }
  
  return {
    success,
    doubt: doubt.type,
    changes,
    priority: doubt.priority
  };
}

async function runSolveEtCoagula() {
  UserFeedback.section('Solve et Coagula - Alchemical Improvement Process');
  
  // Phase 1: SOLVE (Doubt)
  const doubts = solvePhase();
  
  if (doubts.length === 0) {
    UserFeedback.success('✅ No doubts found - everything looks good!');
    return { doubts: [], research: [], implementations: [] };
  }
  
  // Phase 2: COAGULA (Research)
  const research = coagulaPhase(doubts);
  
  // Phase 3: TRANSMUTATION (Implementation)
  const implementations = transmutationPhase(research);
  
  // Summary
  UserFeedback.section('Summary');
  logger.info(`Doubts identified: ${doubts.length}`);
  logger.info(`Research completed: ${research.length}`);
  logger.info(`Implementations: ${implementations.filter(i => i.success).length}/${implementations.length} successful`);
  
  const report = {
    timestamp: new Date().toISOString(),
    doubts: doubts.length,
    research: research.length,
    implementations: implementations.filter(i => i.success).length,
    total: implementations.length,
    details: {
      doubts,
      research,
      implementations
    }
  };
  
  const reportPath = path.join(BASE_DIR, '.solve-et-coagula-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  logger.info(`\n📄 Report saved: ${reportPath}`);
  
  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runSolveEtCoagula();
}

export { runSolveEtCoagula, solvePhase, coagulaPhase, transmutationPhase };

