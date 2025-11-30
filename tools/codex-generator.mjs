#!/usr/bin/env node

/**
 * Codex Generator
 * Creates codex entries inspired by your codex, mimicking doubt and expansion cycles
 * 
 * Reflects Solve et Coagula: Doubt (contraction) → Research → Expansion → Beauty → Wisdom
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const CODEX_DIR = path.join(BASE_DIR, 'docs', 'codex-generated');
const INSPIRATION_DIR = path.join(BASE_DIR, 'packages', 'codex-144-99-core');

class CodexGenerator {
  constructor() {
    this.ensureDirectories();
    this.doubtMoments = [];
    this.expansions = [];
  }

  ensureDirectories() {
    if (!fs.existsSync(CODEX_DIR)) {
      fs.mkdirSync(CODEX_DIR, { recursive: true });
    }
  }

  /**
   * Phase 1: Doubt (Contraction) - "Is this good enough? What's missing?"
   */
  createDoubtMoment(context) {
    const doubt = {
      id: `doubt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      context: context || 'General creative exploration',
      questions: this.generateDoubtQuestions(context),
      uncertainty: this.generateUncertainty(),
      feeling: 'contraction',
      phase: 'solve' // Dissolution
    };

    this.doubtMoments.push(doubt);
    logger.info(`🤔 Doubt moment created: ${doubt.id}`);
    logger.info(`   Questions: ${doubt.questions.length}`);
    
    return doubt;
  }

  /**
   * Generate organic doubt questions
   */
  generateDoubtQuestions(context) {
    const baseQuestions = [
      'What if this could be more beautiful?',
      'Is there sacred geometry missing?',
      'Does this honor the esoteric traditions?',
      'Is ND joy present here?',
      'What would make this more museum-grade?',
      'How can this break more academic barriers?',
      'What connections am I missing?',
      'Is this too flat? Too website-like?',
      'What would make this feel more alive?',
      'How can this celebrate high creativity more?'
    ];

    const contextQuestions = context ? [
      `What's missing from ${context}?`,
      `How can ${context} be more organic?`,
      `What would make ${context} more inspiring?`
    ] : [];

    const allQuestions = [...baseQuestions, ...contextQuestions];
    const count = Math.floor(Math.random() * 4) + 3; // 3-6 questions
    const selected = [];
    
    for (let i = 0; i < count; i++) {
      const q = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      if (!selected.includes(q)) {
        selected.push(q);
      }
    }
    
    return selected;
  }

  /**
   * Generate uncertainty feelings
   */
  generateUncertainty() {
    const uncertainties = [
      'wondering if this is the right path',
      'feeling the need to explore deeper',
      'curiosity about alternatives',
      'uncertainty about direction',
      'excitement mixed with anxiety',
      'need to pause and reflect'
    ];
    
    return uncertainties[Math.floor(Math.random() * uncertainties.length)];
  }

  /**
   * Phase 2: Research - Explore the doubt
   */
  async researchDoubt(doubt) {
    logger.info(`🔍 Researching doubt: ${doubt.id}`);
    
    const research = {
      id: `research-${Date.now()}`,
      doubtId: doubt.id,
      timestamp: new Date().toISOString(),
      explorations: this.exploreDoubtQuestions(doubt.questions),
      connections: this.findConnections(doubt),
      insights: [],
      phase: 'research'
    };

    // Generate insights from exploration
    research.insights = this.generateInsights(research.explorations);
    
    return research;
  }

  /**
   * Explore doubt questions organically
   */
  exploreDoubtQuestions(questions) {
    const explorations = [];
    
    for (const question of questions.slice(0, 3)) { // Explore top 3
      explorations.push({
        question,
        approach: this.selectResearchApproach(),
        findings: this.generateFindings(question),
        connections: this.findQuestionConnections(question)
      });
    }
    
    return explorations;
  }

  /**
   * Select organic research approach
   */
  selectResearchApproach() {
    const approaches = [
      'following intuitive connections',
      'deep diving into one aspect',
      'broad scanning across domains',
      'exploratory wandering',
      'organic exploration',
      'gentle investigation'
    ];
    
    return approaches[Math.floor(Math.random() * approaches.length)];
  }

  /**
   * Generate findings from question
   */
  generateFindings(question) {
    const findings = [];
    
    if (question.includes('beautiful') || question.includes('museum')) {
      findings.push('Museum-grade quality requires aristocratic aesthetics');
      findings.push('Sacred geometry enhances beauty');
    }
    
    if (question.includes('esoteric') || question.includes('traditions')) {
      findings.push('Soyga, I Ching, Kabbalah, Alchemy are core');
      findings.push('Esoteric traditions connect to sacred mathematics');
    }
    
    if (question.includes('ND joy') || question.includes('neurodivergent')) {
      findings.push('ND joy is central to all tools');
      findings.push('Neurodivergent creative expression must be honored');
    }
    
    if (question.includes('academic') || question.includes('barriers')) {
      findings.push('This project conquers Western academia barriers');
      findings.push('Breaking access and support limitations');
    }
    
    if (question.includes('flat') || question.includes('website')) {
      findings.push('Open world experiences, not website-like');
      findings.push('3D immersive environments required');
    }
    
    // Always add some general findings
    findings.push('144:99 ratio is foundational');
    findings.push('Trinity Architecture connects all systems');
    findings.push('Collective creative riches enhance everything');
    
    return findings.slice(0, Math.floor(Math.random() * 3) + 2); // 2-4 findings
  }

  /**
   * Find connections for question
   */
  findQuestionConnections(question) {
    const connections = [];
    
    if (question.includes('geometry') || question.includes('sacred')) {
      connections.push('Sacred Mathematics');
      connections.push('Golden Ratio');
      connections.push('Fibonacci');
    }
    
    if (question.includes('trinity') || question.includes('architecture')) {
      connections.push('Brain/Soul/Body');
      connections.push('Cosmogenesis/Circuitum99/Stone Grimoire');
    }
    
    if (question.includes('creative') || question.includes('art')) {
      connections.push('Visionary Art');
      connections.push('Multi-modal Creation');
      connections.push('Collective Creative');
    }
    
    return connections;
  }

  /**
   * Find connections for doubt
   */
  findConnections(doubt) {
    return [
      'Connects to sacred mathematics',
      'Relates to consciousness evolution',
      'Links to visionary art principles',
      'Touches on trauma-aware design',
      'Connects to open world exploration'
    ].slice(0, Math.floor(Math.random() * 3) + 2);
  }

  /**
   * Generate insights from research
   */
  generateInsights(explorations) {
    const insights = [];
    
    for (const exploration of explorations) {
      if (exploration.findings.length > 0) {
        insights.push({
          source: exploration.question,
          insight: exploration.findings[0],
          connections: exploration.connections
        });
      }
    }
    
    // Add synthesis insights
    insights.push({
      source: 'synthesis',
      insight: 'Doubt leads to deeper understanding',
      connections: ['Solve et Coagula', 'Creative Process']
    });
    
    return insights;
  }

  /**
   * Phase 3: Expansion - "How can we make it better?"
   */
  async expandFromResearch(doubt, research) {
    logger.info(`✨ Expanding from research: ${research.id}`);
    
    const expansion = {
      id: `expansion-${Date.now()}`,
      doubtId: doubt.id,
      researchId: research.id,
      timestamp: new Date().toISOString(),
      enhancements: this.generateEnhancements(research),
      beauty: this.addBeauty(),
      wisdom: this.extractWisdom(research),
      phase: 'coagula' // Coagulation
    };

    this.expansions.push(expansion);
    
    return expansion;
  }

  /**
   * Generate enhancements from research
   */
  generateEnhancements(research) {
    const enhancements = [];
    
    for (const insight of research.insights) {
      enhancements.push({
        basedOn: insight.source,
        enhancement: this.createEnhancement(insight),
        approach: 'organic, inspired by doubt and research'
      });
    }
    
    return enhancements;
  }

  /**
   * Create specific enhancement
   */
  createEnhancement(insight) {
    if (insight.insight.includes('museum-grade')) {
      return 'Upgrade to aristocratic aesthetics with refined sophistication';
    }
    
    if (insight.insight.includes('sacred geometry')) {
      return 'Integrate golden ratio, Fibonacci, and 144:99 proportions';
    }
    
    if (insight.insight.includes('esoteric')) {
      return 'Honor Soyga, I Ching, Kabbalah, Alchemy connections';
    }
    
    if (insight.insight.includes('ND joy')) {
      return 'Center on neurodivergent creative expression';
    }
    
    if (insight.insight.includes('3D') || insight.insight.includes('immersive')) {
      return 'Create immersive 3D environments, not flat designs';
    }
    
    return 'Enhance with meaningful, authentic details';
  }

  /**
   * Add beauty (Phase 4)
   */
  addBeauty() {
    return {
      aesthetic: 'aristocratic, museum-grade',
      geometry: 'sacred proportions and ratios',
      depth: 'multi-layered, spatially rich',
      quality: 'refined, sophisticated, timeless'
    };
  }

  /**
   * Extract wisdom (Phase 5)
   */
  extractWisdom(research) {
    return {
      teaching: 'Doubt leads to deeper understanding',
      principle: 'Solve et Coagula: Contraction enables expansion',
      connection: 'All systems interconnect through sacred mathematics',
      legacy: 'Creating work that honors high creativity and collective riches'
    };
  }

  /**
   * Generate complete codex entry from doubt/expansion cycle
   */
  async generateCodexEntry(context) {
    logger.info('\n📖 Generating codex entry...');
    logger.info(`   Context: ${context || 'General'}`);
    
    // Phase 1: Doubt (Contraction)
    const doubt = this.createDoubtMoment(context);
    
    // Phase 2: Research
    const research = await this.researchDoubt(doubt);
    
    // Phase 3: Expansion
    const expansion = await this.expandFromResearch(doubt, research);
    
    // Create codex entry
    const codexEntry = {
      id: `codex-${Date.now()}`,
      timestamp: new Date().toISOString(),
      context,
      cycle: {
        doubt,
        research,
        expansion
      },
      entry: this.formatCodexEntry(doubt, research, expansion),
      metadata: {
        author: 'Rebecca Respawn',
        license: 'CC0-1.0',
        inspiredBy: 'Codex 144:99',
        process: 'Solve et Coagula'
      }
    };
    
    // Save codex entry
    const entryFile = path.join(CODEX_DIR, `${codexEntry.id}.json`);
    fs.writeFileSync(entryFile, JSON.stringify(codexEntry, null, 2), 'utf-8');
    
    logger.info(`✅ Codex entry saved: ${entryFile}`);
    
    return codexEntry;
  }

  /**
   * Format codex entry as readable text
   */
  formatCodexEntry(doubt, research, expansion) {
    return {
      title: `Codex Entry: ${doubt.context}`,
      doubt: {
        phase: 'Solve (Contraction)',
        questions: doubt.questions,
        uncertainty: doubt.uncertainty
      },
      research: {
        phase: 'Exploration',
        explorations: research.explorations.map(e => ({
          question: e.question,
          findings: e.findings
        })),
        insights: research.insights.map(i => i.insight)
      },
      expansion: {
        phase: 'Coagula (Expansion)',
        enhancements: expansion.enhancements.map(e => e.enhancement),
        beauty: expansion.beauty,
        wisdom: expansion.wisdom
      },
      synthesis: 'Through doubt and research, we expand into beauty and wisdom, honoring the complete vision.'
    };
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new CodexGenerator();
  const context = process.argv[2] || 'Continuous improvement and magnum opus enhancement';
  
  generator.generateCodexEntry(context)
    .then(entry => {
      logger.info('\n✅ Codex entry generated!');
      logger.info(`   ID: ${entry.id}`);
      logger.info(`   Context: ${entry.context}`);
      logger.info(`   Doubt questions: ${entry.cycle.doubt.questions.length}`);
      logger.info(`   Research insights: ${entry.cycle.research.insights.length}`);
      logger.info(`   Enhancements: ${entry.cycle.expansion.enhancements.length}`);
      logger.info(`\n📄 Entry saved to: docs/codex-generated/${entry.id}.json`);
    })
    .catch(err => {
      logger.error('Error:', err.message);
      process.exit(1);
    });
}

export { CodexGenerator };

