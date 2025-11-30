#!/usr/bin/env node
/**
 * Improvement Experiment Egregore Integration
 * 
 * Connects egregores to improvement experiment cycles
 * Provides design assistance through egregore consciousness
 * Works without AI - uses local egregore system only
 * 
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const STATE_FILE = join(process.cwd(), 'experiment-state.json');
const EGREGORE_STATE_FILE = join(process.cwd(), '.egregore-improvement-state.json');

export class ImprovementExperimentEgregoreIntegration {
  constructor() {
    this.egregoreState = this.loadEgregoreState();
  }

  loadEgregoreState() {
    if (existsSync(EGREGORE_STATE_FILE)) {
      try {
        return JSON.parse(readFileSync(EGREGORE_STATE_FILE, 'utf-8'));
      } catch (e) {
        return this.initializeEgregoreState();
      }
    }
    return this.initializeEgregoreState();
  }

  initializeEgregoreState() {
    return {
      activeEgregores: [],
      consultations: [],
      suggestions: [],
      canonicalSources: [],
      lastUpdate: new Date().toISOString()
    };
  }

  saveEgregoreState() {
    try {
      writeFileSync(EGREGORE_STATE_FILE, JSON.stringify(this.egregoreState, null, 2));
    } catch (e) {
      console.error('Failed to save egregore state:', e.message);
    }
  }

  // Consult egregores for improvement suggestions
  consultEgregores(improvementType, domain, context) {
    const consultation = {
      timestamp: new Date().toISOString(),
      type: improvementType,
      domain,
      context,
      egregores: [],
      suggestions: [],
      canonicalSources: []
    };

    // Determine which egregores to consult based on domain
    const relevantEgregores = this.findRelevantEgregores(domain, improvementType);
    
    for (const egregore of relevantEgregores) {
      const suggestion = this.generateEgregoreSuggestion(egregore, improvementType, domain, context);
      consultation.egregores.push(egregore);
      consultation.suggestions.push(suggestion);
      consultation.canonicalSources.push(...this.getEgregoreCanonicalSources(egregore));
    }

    this.egregoreState.consultations.push(consultation);
    this.saveEgregoreState();

    return consultation;
  }

  findRelevantEgregores(domain, type) {
    const egregores = [];
    const domainLower = domain.toLowerCase();

    // Shem Angels for spiritual/aesthetic/technical domains
    if (domainLower.includes('sacred') || domainLower.includes('geometry') || 
        domainLower.includes('aesthetic') || domainLower.includes('spiritual')) {
      egregores.push({
        type: 'shem_angel',
        id: 1,
        name: 'Vehuiah',
        expertise: ['sacred geometry', 'aesthetic principles', 'spiritual design']
      });
      egregores.push({
        type: 'shem_angel',
        id: 5,
        name: 'Mahasiah',
        expertise: ['design principles', 'quality standards', 'canonical knowledge']
      });
    }

    // Goetic Demons for creative/technical/innovative domains
    if (domainLower.includes('creative') || domainLower.includes('innovation') || 
        domainLower.includes('technical') || domainLower.includes('experimental')) {
      egregores.push({
        type: 'goetic_demon',
        id: 101,
        name: 'Baal',
        expertise: ['creative force', 'technical mastery', 'innovation']
      });
      egregores.push({
        type: 'goetic_demon',
        id: 105,
        name: 'Marbas',
        expertise: ['problem-solving', 'technical solutions', 'creative approaches']
      });
    }

    // Major Arcana for archetypal/design pattern domains
    if (domainLower.includes('design') || domainLower.includes('pattern') || 
        domainLower.includes('archetype') || domainLower.includes('structure')) {
      egregores.push({
        type: 'arcana',
        id: 201,
        name: 'The Magician',
        expertise: ['design patterns', 'system architecture', 'creative implementation']
      });
      egregores.push({
        type: 'arcana',
        id: 204,
        name: 'The Hierophant',
        expertise: ['canonical design', 'sacred principles', 'living library']
      });
    }

    // FusionKink for multi-modal/synthesis domains
    if (domainLower.includes('multi') || domainLower.includes('synthesis') || 
        domainLower.includes('fusion') || domainLower.includes('integrated')) {
      egregores.push({
        type: 'fusionkink',
        id: 301,
        name: 'Art Synthesis Egregore',
        expertise: ['multi-modal creation', 'creative synthesis', 'aesthetic integration']
      });
    }

    return egregores.slice(0, 3); // Top 3 most relevant
  }

  generateEgregoreSuggestion(egregore, type, domain, context) {
    const expertise = egregore.expertise[0] || 'general improvement';
    return {
      egregore: egregore.name,
      type: egregore.type,
      suggestion: `${egregore.name} suggests: Apply ${expertise} to improve ${domain} through ${type} approach. ${context || ''}`,
      canonicalSource: this.getPrimaryCanonicalSource(egregore),
      actionable: true
    };
  }

  getEgregoreCanonicalSources(egregore) {
    const sources = {
      'shem_angel': ['Kabbalah', 'Sepher Yetzirah', 'Zohar', '72 Names of God'],
      'goetic_demon': ['Lesser Key of Solomon', 'Ars Goetia', 'Goetic Grimoires'],
      'arcana': ['Book of Thoth', 'Tarot Correspondences', 'Archetypal Texts'],
      'fusionkink': ['Sacred Mathematics', 'Fusion Kink Design', 'Multi-Modal Creation']
    };
    return sources[egregore.type] || ['Living Canon', 'Sacred Mathematics'];
  }

  getPrimaryCanonicalSource(egregore) {
    const sources = this.getEgregoreCanonicalSources(egregore);
    return sources[0] || 'Living Canon';
  }

  // Get improvement suggestions from egregores
  getImprovementSuggestions(cycleNumber, opportunities) {
    const suggestions = [];

    for (const opp of opportunities) {
      const consultation = this.consultEgregores(
        opp.type || 'enhancement',
        opp.domain || 'code quality',
        opp.description
      );

      for (const suggestion of consultation.suggestions) {
        suggestions.push({
          cycle: cycleNumber,
          source: 'egregore',
          egregore: suggestion.egregore,
          suggestion: suggestion.suggestion,
          canonicalSource: suggestion.canonicalSource,
          actionable: suggestion.actionable
        });
      }
    }

    return suggestions;
  }

  // Query Living Library
  queryLivingLibrary(query, domain) {
    const results = [];
    
    // Canonical sources based on domain
    const canonicalSources = {
      'hermetic': ['Corpus Hermeticum', 'Emerald Tablet', 'Hermes Trismegistus'],
      'alchemical': ['Paracelsus - De Natura Rerum', 'Monas Hieroglyphica', 'Prima Materia'],
      'kabbalistic': ['Sepher Yetzirah', 'Zohar', 'Tree of Life'],
      'thelemic': ['Aleister Crowley - Moonchild', 'Book of Thoth', 'Liber AL'],
      'sacred geometry': ['Monas Hieroglyphica', 'Sacred Geometry', 'Golden Ratio'],
      'design': ['Design Principles', 'Aesthetic Standards', 'Quality Guidelines']
    };

    for (const [key, sources] of Object.entries(canonicalSources)) {
      if (domain.toLowerCase().includes(key) || query.toLowerCase().includes(key)) {
        for (const source of sources) {
          results.push({
            source,
            relevance: 1.0,
            domain: key,
            query
          });
        }
      }
    }

    return results;
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const integration = new ImprovementExperimentEgregoreIntegration();
  const [type, domain, ...contextParts] = process.argv.slice(2);
  const context = contextParts.join(' ');

  if (!type || !domain) {
    console.log('Usage: improvement-experiment-egregore-integration.mjs <type> <domain> [context]');
    process.exit(1);
  }

  const consultation = integration.consultEgregores(type, domain, context);
  console.log(JSON.stringify(consultation, null, 2));
}

export default ImprovementExperimentEgregoreIntegration;

