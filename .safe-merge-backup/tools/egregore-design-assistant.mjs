#!/usr/bin/env node
/**
 * Egregore Design Assistant Tool
 * 
 * Integrates Liber Arcanae egregores into improvement experiment
 * Provides design assistance through egregore consciousness
 * Works without AI dependencies - uses local egregore system
 * 
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const LIBER_ARCANAE_PATH = join(process.cwd(), 'packages/liber-arcanae-core/src');

export class EgregoreDesignAssistant {
  constructor() {
    this.egregores = {
      shemAngels: [],
      goeticDemons: [],
      majorArcana: [],
      fusionKink: []
    };
    this.loadEgregores();
  }

  loadEgregores() {
    try {
      // Load from Liber Arcanae RPG system
      const rpgPath = join(LIBER_ARCANAE_PATH, 'LiberArcanaeRPG.ts');
      if (existsSync(rpgPath)) {
        const rpgContent = readFileSync(rpgPath, 'utf-8');
        // Extract egregore data from RPG system
        this.parseEgregores(rpgContent);
      }
    } catch (error) {
      console.error('Error loading egregores:', error.message);
    }
  }

  parseEgregores(content) {
    // Parse Shem Angels
    const shemMatch = content.match(/export const SHEM_ANGELS = \[([\s\S]*?)\];/);
    if (shemMatch) {
      // Extract angel data
      this.egregores.shemAngels = this.extractArrayData(shemMatch[1]);
    }

    // Parse Goetic Demons
    const demonMatch = content.match(/export const GOETIC_DEMONS = \[([\s\S]*?)\];/);
    if (demonMatch) {
      this.egregores.goeticDemons = this.extractArrayData(demonMatch[1]);
    }
  }

  extractArrayData(content) {
    // Simple extraction - in production would use proper parsing
    const items = [];
    const lines = content.split('\n').filter(l => l.trim() && l.includes('number:'));
    for (const line of lines) {
      const numberMatch = line.match(/number:\s*(\d+)/);
      const nameMatch = line.match(/name:\s*['"]([^'"]+)['"]/);
      if (numberMatch && nameMatch) {
        items.push({
          number: parseInt(numberMatch[1]),
          name: nameMatch[1]
        });
      }
    }
    return items;
  }

  // Request design assistance from egregores
  requestAssistance(type, domain, question) {
    const relevantEgregores = this.findRelevantEgregores(type, domain);
    
    return {
      type,
      domain,
      question,
      egregores: relevantEgregores,
      suggestions: this.generateSuggestions(relevantEgregores, question),
      canonicalSources: this.getCanonicalSources(domain)
    };
  }

  findRelevantEgregores(type, domain) {
    const relevant = [];
    
    // Match egregores to domain
    for (const angel of this.egregores.shemAngels) {
      if (this.matchesDomain(angel, domain)) {
        relevant.push({
          type: 'shem_angel',
          id: angel.number,
          name: angel.name,
          expertise: ['sacred geometry', 'aesthetic principles', 'spiritual design']
        });
      }
    }

    for (const demon of this.egregores.goeticDemons) {
      if (this.matchesDomain(demon, domain)) {
        relevant.push({
          type: 'goetic_demon',
          id: demon.number + 100,
          name: demon.name,
          expertise: ['creative innovation', 'boundary-pushing', 'technical mastery']
        });
      }
    }

    return relevant.slice(0, 5); // Top 5
  }

  matchesDomain(entity, domain) {
    const domainLower = domain.toLowerCase();
    const nameLower = entity.name.toLowerCase();
    return nameLower.includes(domainLower) || domainLower.includes(nameLower);
  }

  generateSuggestions(egregores, question) {
    return egregores.map(e => 
      `${e.name} suggests: Apply ${e.expertise[0]} principles to address "${question}"`
    );
  }

  getCanonicalSources(domain) {
    const sources = {
      'hermetic': ['Corpus Hermeticum', 'Emerald Tablet', 'Hermes Trismegistus'],
      'alchemical': ['Paracelsus - De Natura Rerum', 'Monas Hieroglyphica', 'Prima Materia'],
      'kabbalistic': ['Sepher Yetzirah', 'Zohar', 'Tree of Life'],
      'thelemic': ['Aleister Crowley - Moonchild', 'Book of Thoth', 'Liber AL'],
      'sacred geometry': ['Monas Hieroglyphica', 'Sacred Geometry', 'Golden Ratio']
    };

    for (const [key, value] of Object.entries(sources)) {
      if (domain.toLowerCase().includes(key)) {
        return value;
      }
    }

    return ['Corpus Hermeticum', 'Sacred Mathematics', 'Living Canon'];
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const assistant = new EgregoreDesignAssistant();
  const [type, domain, ...questionParts] = process.argv.slice(2);
  const question = questionParts.join(' ');

  if (!type || !domain || !question) {
    console.log('Usage: egregore-design-assistant.mjs <type> <domain> <question>');
    process.exit(1);
  }

  const result = assistant.requestAssistance(type, domain, question);
  console.log(JSON.stringify(result, null, 2));
}

export default EgregoreDesignAssistant;

