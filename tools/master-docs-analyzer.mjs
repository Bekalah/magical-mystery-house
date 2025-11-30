#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Master Docs Analyzer
 * Analyzes master docs, READMEs, and wiki pages to extract improvement patterns
 * and ensure all work aligns with documented standards
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

logger.info('🔧 IMPROVEMENT: Creating Master Docs Analyzer');
logger.info('   → Analyzes master docs, READMEs, wiki pages');
logger.info('   → Extracts improvement patterns');
logger.info('   → Ensures alignment with documented standards\n');

// Key patterns from master documentation
const MASTER_PATTERNS = {
  registry: {
    name: 'REGISTRY Integration',
    pattern: /registry|REGISTRY|centralized.*data|room.*definitions|style.*packs|palette.*catalogs/i,
    required: true,
    description: 'All apps must consume from centralized REGISTRY system',
    source: 'OpenSpec AGENTS.md, REGISTRY_ARCHITECTURE.md'
  },
  trinity: {
    name: 'Trinity Architecture',
    pattern: /trinity.*architecture|brain.*soul.*body|cosmogenesis|circuitum99|stone.*grimoire/i,
    required: true,
    description: 'Brain (Cosmogenesis), Soul (Circuitum99), Body (Stone Grimoire)',
    source: 'project.md, LEARNED_ABOUT_USER.md'
  },
  traumaSafe: {
    name: 'Trauma-Safe Design',
    pattern: /trauma.*safe|trauma.*aware|esc.*exit|no.*autoplay|grounding|pause.*anytime/i,
    required: true,
    description: 'ESC exits, no autoplay, grounding exercises, pause anytime',
    source: 'project.md, TOOLS_DESIGN_PHILOSOPHY.md'
  },
  modular: {
    name: 'Modular Architecture',
    pattern: /standalone.*interconnected|modular|self.*contained|can.*work.*together/i,
    required: true,
    description: 'Everything works standalone OR interconnected',
    source: 'AGENTS.md, LEARNED_ABOUT_USER.md'
  },
  sacredMath: {
    name: 'Sacred Mathematics',
    pattern: /144.*99|golden.*ratio|fibonacci|sacred.*geometry|phi|1\.618/i,
    required: true,
    description: '144:99 ratio, golden ratio, Fibonacci, sacred geometry',
    source: 'project.md, VISIONARY_ART_VISION.md'
  },
  accessibility: {
    name: 'Accessibility First',
    pattern: /accessibility|wcag|keyboard.*navigation|screen.*reader|high.*contrast/i,
    required: true,
    description: 'WCAG AA, keyboard navigation, screen reader support',
    source: 'project.md, TOOLS_DESIGN_PHILOSOPHY.md'
  },
  livingCanon: {
    name: 'Living Canon',
    pattern: /living.*canon|real.*correspondences|real.*research|real.*sources/i,
    required: true,
    description: 'Real correspondences, real research sources, living canon',
    source: 'project.md, TOOLS_DESIGN_PHILOSOPHY.md'
  },
  documentation: {
    name: '140-Line Documentation',
    pattern: /140.*line|professional.*documentation|trauma.*aware.*language|business.*safe/i,
    required: false,
    description: 'Professional 140-line format, trauma-aware, business-safe',
    source: 'DOCUMENTATION_CLEANUP_PLAN.md, SYSTEM_ANALYSIS.md'
  },
  solveEtCoagula: {
    name: 'Solve et Coagula Process',
    pattern: /solve.*et.*coagula|doubt.*improvement.*creation|dissolution.*coagulation/i,
    required: false,
    description: 'Doubt → Improvement → Creation process',
    source: 'TOOLS_DESIGN_PHILOSOPHY.md'
  },
  masterV1: {
    name: 'Master V1 Control',
    pattern: /master.*v1|master.*v1.*control|professional.*standards|type.*safety/i,
    required: true,
    description: 'Master V1 Control standards, professional quality',
    source: 'AGENTS.md, SYSTEM_ANALYSIS.md'
  }
};

function findMasterDocs() {
  const docs = [];
  const searchDirs = [
    path.join(BASE_DIR, 'docs'),
    path.join(BASE_DIR, 'openspec'),
    path.join(BASE_DIR, '..', 'cathedral-real', 'docs'),
    path.join(BASE_DIR, '..', 'cathedral-fixed-clean', 'docs')
  ];
  
  function searchDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchDir(fullPath);
        } else if (entry.endsWith('.md')) {
          docs.push(fullPath);
        }
      }
    } catch {
      // Skip
    }
  }
  
  searchDirs.forEach(dir => searchDir(dir));
  return docs;
}

function analyzeFile(filePath) {
  const analysis = {
    file: path.relative(BASE_DIR, filePath),
    patterns: {},
    missing: [],
    score: 0
  };
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    Object.entries(MASTER_PATTERNS).forEach(([key, pattern]) => {
      const found = pattern.pattern.test(content);
      analysis.patterns[key] = found;
      
      if (pattern.required && !found) {
        analysis.missing.push({
          pattern: pattern.name,
          description: pattern.description,
          source: pattern.source
        });
      }
      
      if (found) analysis.score++;
    });
  } catch {
    // Skip files that can't be read
  }
  
  return analysis;
}

function generateImprovements(analyses) {
  const improvements = [];
  const missingCounts = {};
  
  analyses.forEach(analysis => {
    analysis.missing.forEach(missing => {
      if (!missingCounts[missing.pattern]) {
        missingCounts[missing.pattern] = {
          count: 0,
          description: missing.description,
          source: missing.source,
          files: []
        };
      }
      missingCounts[missing.pattern].count++;
      missingCounts[missing.pattern].files.push(analysis.file);
    });
  });
  
  Object.entries(missingCounts).forEach(([pattern, data]) => {
    improvements.push({
      priority: 'high',
      type: 'master_standard',
      pattern: pattern,
      description: data.description,
      source: data.source,
      affectedFiles: data.count,
      sampleFiles: data.files.slice(0, 5)
    });
  });
  
  return improvements;
}

async function analyzeMasterDocs() {
  UserFeedback.section('Master Documentation Analysis');
  UserFeedback.info('Analyzing master docs, READMEs, and wiki pages...\n');
  
  const docs = findMasterDocs();
  logger.info(`Found ${docs.length} documentation files to analyze`);
  
  const analyses = docs.map(doc => analyzeFile(doc));
  const improvements = generateImprovements(analyses);
  
  // Calculate compliance scores
  const totalPatterns = Object.keys(MASTER_PATTERNS).length;
  const avgScore = analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length;
  const compliance = (avgScore / totalPatterns) * 100;
  
  UserFeedback.section('Master Standards Compliance');
  logger.info(`Average compliance: ${compliance.toFixed(1)}%`);
  logger.info(`Total patterns checked: ${totalPatterns}`);
  logger.info(`Files analyzed: ${analyses.length}\n`);
  
  UserFeedback.section('Missing Master Standards');
  if (improvements.length > 0) {
    logger.warn(`Found ${improvements.length} missing master standards:\n`);
    
    improvements.forEach((imp, i) => {
      logger.warn(`${i + 1}. ${imp.pattern}`);
      logger.info(`   Description: ${imp.description}`);
      logger.info(`   Source: ${imp.source}`);
      logger.info(`   Affected files: ${imp.affectedFiles}`);
      logger.info(`   Sample files: ${imp.sampleFiles.join(', ')}`);
      logger.info('');
    });
  } else {
    UserFeedback.success('✅ All files meet master standards!');
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    filesAnalyzed: analyses.length,
    totalPatterns: totalPatterns,
    averageCompliance: compliance,
    improvements: improvements,
    patternBreakdown: Object.entries(MASTER_PATTERNS).map(([key, pattern]) => ({
      name: pattern.name,
      required: pattern.required,
      foundIn: analyses.filter(a => a.patterns[key]).length,
      percentage: (analyses.filter(a => a.patterns[key]).length / analyses.length * 100).toFixed(1)
    }))
  };
  
  const reportPath = path.join(BASE_DIR, '.master-docs-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  logger.info(`\n📄 Analysis report saved: ${reportPath}`);
  
  UserFeedback.section('Summary');
  logger.info(`Files analyzed: ${analyses.length}`);
  logger.info(`Average compliance: ${compliance.toFixed(1)}%`);
  logger.info(`Improvements needed: ${improvements.length}`);
  
  if (compliance >= 80) {
    UserFeedback.success('\n✅ High compliance with master standards!');
  } else if (compliance >= 60) {
    UserFeedback.warning(`\n⚠️  Moderate compliance (${compliance.toFixed(1)}%)`);
    UserFeedback.info('See improvements above for specific recommendations.');
  } else {
    UserFeedback.warning(`\n⚠️  Low compliance (${compliance.toFixed(1)}%)`);
    UserFeedback.info('Significant improvements needed. See report above.');
  }
  
  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeMasterDocs();
}

export { analyzeMasterDocs, MASTER_PATTERNS };

