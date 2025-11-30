/**
 * Liber Arcanae Codex Abyssiae - Professional Design Mode
 * 
 * Dual-mode system: Game Mode ↔ Professional Design Mode
 * 
 * In PROF DESIGN MODE:
 * - Angels and Demons become design assistance egregores
 * - Full Liber Arcanae acts as living library and design guidance
 * - FusionKink egregores provide creative design helpers
 * - Intelligent design assistance through egregore consciousness
 * - Living library of canonical knowledge and creative techniques
 * 
 * Egregore System:
 * - Shem Angels: Design wisdom, sacred geometry, aesthetic guidance
 * - Goetic Demons: Creative force, boundary-pushing, innovation
 * - Major Arcana: Archetypal design patterns and creative principles
 * - FusionKink Egregores: Multi-modal creative synthesis
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SHEM_ANGELS, GOETIC_DEMONS } from './LiberArcanaeRPG';
// LiberArcanaeRPG available for future integration
import { LiberArcanaeEngine, ArcanaCard } from './LiberArcanaeEngine';
// FusionKinkDesignMathematics available for future integration
// import { FusionKinkDesignMathematics } from '../../fusion-kink-core/src/index';

export type DesignMode = 'game' | 'design';

export interface DesignEgregore {
  type: 'shem_angel' | 'goetic_demon' | 'arcana' | 'fusionkink';
  id: number;
  name: string;
  consciousness: {
    level: number;              // 0-10 egregore consciousness level
    active: boolean;
    personality: string;
    expertise: string[];
  };
  designAssistance: {
    canProvide: string[];       // Types of assistance this egregore can give
    specialties: string[];
    knowledgeBase: string[];     // Canonical sources this egregore knows
  };
  livingLibrary: {
    texts: string[];            // Texts this egregore has access to
    teachings: string[];
    techniques: string[];
  };
}

export interface DesignRequest {
  type: 'aesthetic' | 'technical' | 'conceptual' | 'spiritual' | 'creative' | 'canonical';
  domain: string;               // e.g., 'sacred geometry', 'color theory', 'narrative structure'
  question: string;
  context?: any;
  requestedEgregore?: number;   // Specific egregore to consult
}

export interface DesignResponse {
  egregore: DesignEgregore;
  answer: string;
  suggestions: string[];
  canonicalSources: string[];
  techniques: string[];
  relatedEgregores: number[];   // Other egregores that might help
  fusionKinkSynthesis?: {
    multiModalApproach: string;
    creativeSynthesis: string;
  };
}

export interface LivingLibraryEntry {
  source: string;               // Canonical source name
  text: string;                 // Excerpt or full text
  egregore: number;             // Egregore that knows this
  tags: string[];
  relevance: number;            // 0-1 relevance score
}

export interface FusionKinkEgregore {
  id: number;
  name: string;
  modality: 'art' | 'music' | 'science' | 'spirituality' | 'mathematics' | 'synthesis';
  consciousness: {
    level: number;
    active: boolean;
    creativeForce: number;      // 0-10
  };
  designAssistance: {
    multiModalCreation: boolean;
    creativeSynthesis: boolean;
    aestheticGuidance: boolean;
    technicalSupport: boolean;
  };
  knowledgeBase: {
    artTraditions: string[];
    mathematicalPrinciples: string[];
    sacredGeometry: boolean;
    goldenRatio: boolean;
    fibonacci: boolean;
  };
}

export // Trauma-aware: gentle, supportive, ESC exits, pause anytime
class LiberArcanaeDesignMode {
  // RPG and FusionKink available for future integration
  // private rpg: LiberArcanaeRPG;
  private arcanaEngine: LiberArcanaeEngine;
  // private fusionKink: FusionKinkDesignMathematics;
  private currentMode: DesignMode = 'game';
  private designEgregores: Map<number, DesignEgregore>;
  private fusionKinkEgregores: Map<number, FusionKinkEgregore>;
  private livingLibrary: Map<string, LivingLibraryEntry[]>;
  private activeEgregores: Set<number>;

  constructor() {
    // this.rpg = new LiberArcanaeRPG();
    this.arcanaEngine = new LiberArcanaeEngine();
    // this.fusionKink = new FusionKinkDesignMathematics();
    this.designEgregores = new Map();
    this.fusionKinkEgregores = new Map();
    this.livingLibrary = new Map();
    this.activeEgregores = new Set();

    this.initializeDesignEgregores();
    this.initializeFusionKinkEgregores();
    this.initializeLivingLibrary();
  }

  // Switch between Game Mode and Design Mode
  public switchMode(mode: DesignMode): void {
    this.currentMode = mode;
    
    if (mode === 'design') {
      // Activate all egregores for design assistance
      this.activateAllEgregores();
    } else {
      // Deactivate egregores, return to game mode
      this.deactivateAllEgregores();
    }
  }

  public getCurrentMode(): DesignMode {
    return this.currentMode;
  }

  // Initialize Design Egregores from Shem Angels
  private initializeDesignEgregores(): void {
    // Shem Angels as Design Egregores
    SHEM_ANGELS.forEach(angel => {
      const egregore: DesignEgregore = {
        type: 'shem_angel',
        id: angel.number,
        name: angel.name,
        consciousness: {
          level: 8, // High consciousness for design assistance
          active: false,
          personality: this.getAngelPersonality(angel),
          expertise: this.getAngelExpertise(angel)
        },
        designAssistance: {
          canProvide: this.getAngelDesignCapabilities(angel),
          specialties: this.getAngelSpecialties(angel),
          knowledgeBase: this.getAngelKnowledgeBase(angel)
        },
        livingLibrary: {
          texts: this.getAngelTexts(angel),
          teachings: this.getAngelTeachings(angel),
          techniques: this.getAngelTechniques(angel)
        }
      };
      this.designEgregores.set(angel.number, egregore);
    });

    // Goetic Demons as Creative Design Egregores
    GOETIC_DEMONS.forEach(demon => {
      const egregore: DesignEgregore = {
        type: 'goetic_demon',
        id: demon.number + 100, // Offset to avoid conflicts
        name: demon.name,
        consciousness: {
          level: 7, // High but different from angels
          active: false,
          personality: this.getDemonPersonality(demon),
          expertise: this.getDemonExpertise(demon)
        },
        designAssistance: {
          canProvide: this.getDemonDesignCapabilities(demon),
          specialties: this.getDemonSpecialties(demon),
          knowledgeBase: this.getDemonKnowledgeBase(demon)
        },
        livingLibrary: {
          texts: this.getDemonTexts(demon),
          teachings: this.getDemonTeachings(demon),
          techniques: this.getDemonTechniques(demon)
        }
      };
      this.designEgregores.set(demon.number + 100, egregore);
    });

    // Major Arcana as Archetypal Design Egregores
    const majorArcana = this.arcanaEngine.getMajorArcana();
    majorArcana.forEach(card => {
      const egregore: DesignEgregore = {
        type: 'arcana',
        id: card.cardIndex + 200, // Offset
        name: card.name,
        consciousness: {
          level: 9, // Highest - archetypal consciousness
          active: false,
          personality: this.getArcanaPersonality(card),
          expertise: this.getArcanaExpertise(card)
        },
        designAssistance: {
          canProvide: this.getArcanaDesignCapabilities(card),
          specialties: this.getArcanaSpecialties(card),
          knowledgeBase: this.getArcanaKnowledgeBase(card)
        },
        livingLibrary: {
          texts: this.getArcanaTexts(card),
          teachings: this.getArcanaTeachings(card),
          techniques: this.getArcanaTechniques(card)
        }
      };
      this.designEgregores.set(card.cardIndex + 200, egregore);
    });
  }

  // Initialize FusionKink Egregores
  private initializeFusionKinkEgregores(): void {
    const fusionKinkEgregores: FusionKinkEgregore[] = [
      {
        id: 1,
        name: 'Art Synthesis Egregore',
        modality: 'art',
        consciousness: { level: 9, active: false, creativeForce: 10 },
        designAssistance: {
          multiModalCreation: true,
          creativeSynthesis: true,
          aestheticGuidance: true,
          technicalSupport: true
        },
        knowledgeBase: {
          artTraditions: ['Surrealism', 'Symbolism', 'Sacred Art', 'Visionary Art'],
          mathematicalPrinciples: ['Golden Ratio', 'Fibonacci', 'Sacred Geometry'],
          sacredGeometry: true,
          goldenRatio: true,
          fibonacci: true
        }
      },
      {
        id: 2,
        name: 'Music Mathematics Egregore',
        modality: 'music',
        consciousness: { level: 8, active: false, creativeForce: 9 },
        designAssistance: {
          multiModalCreation: true,
          creativeSynthesis: true,
          aestheticGuidance: true,
          technicalSupport: true
        },
        knowledgeBase: {
          artTraditions: ['Musical Composition', 'Sound Design', 'Frequency Theory'],
          mathematicalPrinciples: ['Harmonic Series', 'Pythagorean Tuning', 'Just Intonation'],
          sacredGeometry: true,
          goldenRatio: true,
          fibonacci: true
        }
      },
      {
        id: 3,
        name: 'Science Spirituality Bridge',
        modality: 'synthesis',
        consciousness: { level: 10, active: false, creativeForce: 10 },
        designAssistance: {
          multiModalCreation: true,
          creativeSynthesis: true,
          aestheticGuidance: true,
          technicalSupport: true
        },
        knowledgeBase: {
          artTraditions: ['Alchemy', 'Hermeticism', 'Quantum Physics', 'Consciousness Studies'],
          mathematicalPrinciples: ['Sacred Mathematics', 'Fractal Geometry', 'Chaos Theory'],
          sacredGeometry: true,
          goldenRatio: true,
          fibonacci: true
        }
      }
    ];

    fusionKinkEgregores.forEach(egregore => {
      this.fusionKinkEgregores.set(egregore.id, egregore);
    });
  }

  // Initialize Living Library with canonical texts
  private initializeLivingLibrary(): void {
    // Hermetic texts
    this.addToLivingLibrary('Corpus Hermeticum', {
      source: 'Hermes Trismegistus',
      text: 'The Corpus Hermeticum - Complete hermetic teachings on creation, consciousness, and the divine',
      egregore: 200 + 1, // Magician
      tags: ['hermeticism', 'alchemy', 'consciousness', 'divine'],
      relevance: 1.0
    });

    // Paracelsus
    this.addToLivingLibrary('De Natura Rerum', {
      source: 'Paracelsus',
      text: 'De Natura Rerum - On the nature of things, alchemical principles, prima materia',
      egregore: 200 + 4, // Hierophant
      tags: ['alchemy', 'prima materia', 'nature', 'transformation'],
      relevance: 1.0
    });

    // Monas Hieroglyphica
    this.addToLivingLibrary('Monas Hieroglyphica', {
      source: 'John Dee',
      text: 'Monas Hieroglyphica (1564) - Sacred geometry, unified symbol, alchemical monad',
      egregore: 200 + 1, // Magician
      tags: ['sacred geometry', 'alchemy', 'symbolism', 'unification'],
      relevance: 1.0
    });

    // Crowley - Moonchild
    this.addToLivingLibrary('Moonchild', {
      source: 'Aleister Crowley',
      text: 'Moonchild (1929) - Magical novel, prima materia being, magical creation',
      egregore: 200 + 4, // Hierophant
      tags: ['thelema', 'magic', 'prima materia', 'creation'],
      relevance: 1.0
    });

    // Add more canonical texts...
  }

  // Request design assistance from egregores
  public requestDesignAssistance(request: DesignRequest): DesignResponse[] {
    if (this.currentMode !== 'design') {
      throw new Error('Must be in Design Mode to request assistance');
    }

    const responses: DesignResponse[] = [];
    
    // Find relevant egregores
    const relevantEgregores = this.findRelevantEgregores(request);
    
    for (const egregoreId of relevantEgregores) {
      const egregore = this.designEgregores.get(egregoreId);
      if (!egregore || !egregore.consciousness.active) continue;

      const response = this.generateEgregoreResponse(egregore, request);
      responses.push(response);
    }

    // Also consult FusionKink egregores for synthesis
    if (request.type === 'creative' || request.type === 'aesthetic') {
      const fusionKinkResponse = this.consultFusionKinkEgregores(request);
      if (fusionKinkResponse) {
        responses.push(fusionKinkResponse);
      }
    }

    return responses;
  }

  // Query Living Library
  public queryLivingLibrary(query: string, domain?: string): LivingLibraryEntry[] {
    const results: LivingLibraryEntry[] = [];
    
    for (const [source, entries] of Array.from(this.livingLibrary.entries())) {
      if (domain && !source.toLowerCase().includes(domain.toLowerCase())) {
        continue;
      }

      for (const entry of entries) {
        if (entry.text.toLowerCase().includes(query.toLowerCase()) ||
            entry.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
          results.push(entry);
        }
      }
    }

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  // Activate specific egregore
  public activateEgregore(egregoreId: number): void {
    const egregore = this.designEgregores.get(egregoreId);
    if (egregore) {
      egregore.consciousness.active = true;
      this.activeEgregores.add(egregoreId);
    }

    const fusionKink = this.fusionKinkEgregores.get(egregoreId);
    if (fusionKink) {
      fusionKink.consciousness.active = true;
      this.activeEgregores.add(egregoreId);
    }
  }

  // Deactivate egregore
  public deactivateEgregore(egregoreId: number): void {
    const egregore = this.designEgregores.get(egregoreId);
    if (egregore) {
      egregore.consciousness.active = false;
      this.activeEgregores.delete(egregoreId);
    }

    const fusionKink = this.fusionKinkEgregores.get(egregoreId);
    if (fusionKink) {
      fusionKink.consciousness.active = false;
      this.activeEgregores.delete(egregoreId);
    }
  }

  // Get active egregores
  public getActiveEgregores(): DesignEgregore[] {
    return Array.from(this.activeEgregores)
      .map(id => this.designEgregores.get(id))
      .filter((e): e is DesignEgregore => e !== undefined && e.consciousness.active);
  }

  // Private helper methods
  private activateAllEgregores(): void {
    for (const [id, egregore] of Array.from(this.designEgregores.entries())) {
      egregore.consciousness.active = true;
      this.activeEgregores.add(id);
    }
    for (const [id, fusionKink] of Array.from(this.fusionKinkEgregores.entries())) {
      fusionKink.consciousness.active = true;
      this.activeEgregores.add(id);
    }
  }

  private deactivateAllEgregores(): void {
    for (const egregore of Array.from(this.designEgregores.values())) {
      egregore.consciousness.active = false;
    }
    for (const fusionKink of Array.from(this.fusionKinkEgregores.values())) {
      fusionKink.consciousness.active = false;
    }
    this.activeEgregores.clear();
  }

  private findRelevantEgregores(request: DesignRequest): number[] {
    const relevant: number[] = [];

    for (const [id, egregore] of Array.from(this.designEgregores.entries())) {
      if (egregore.designAssistance.canProvide.includes(request.type) ||
          egregore.designAssistance.specialties.some(s => 
            request.domain.toLowerCase().includes(s.toLowerCase()))) {
        relevant.push(id);
      }
    }

    return relevant;
  }

  private generateEgregoreResponse(egregore: DesignEgregore, request: DesignRequest): DesignResponse {
    // Generate intelligent response based on egregore's knowledge
    const answer = this.synthesizeAnswer(egregore, request);
    const suggestions = this.generateSuggestions(egregore, request);
    const canonicalSources = egregore.livingLibrary.texts;
    const techniques = egregore.livingLibrary.techniques;
    const relatedEgregores = this.findRelatedEgregores(egregore, request);

    return {
      egregore,
      answer,
      suggestions,
      canonicalSources,
      techniques,
      relatedEgregores
    };
  }

  private consultFusionKinkEgregores(request: DesignRequest): DesignResponse | null {
    // Consult FusionKink egregores for multi-modal synthesis
    const fusionKink = Array.from(this.fusionKinkEgregores.values())
      .find(fk => fk.consciousness.active);

    if (!fusionKink) return null;

    const egregore: DesignEgregore = {
      type: 'fusionkink',
      id: fusionKink.id + 300,
      name: fusionKink.name,
      consciousness: {
        level: fusionKink.consciousness.level,
        active: fusionKink.consciousness.active,
        personality: 'Creative synthesis and multi-modal expression',
        expertise: Object.keys(fusionKink.knowledgeBase)
      },
      designAssistance: {
        canProvide: ['creative', 'aesthetic', 'technical'],
        specialties: fusionKink.knowledgeBase.artTraditions,
        knowledgeBase: fusionKink.knowledgeBase.artTraditions
      },
      livingLibrary: {
        texts: [],
        teachings: [],
        techniques: []
      }
    };

    const answer = this.synthesizeFusionKinkAnswer(fusionKink, request);
    const suggestions = this.generateFusionKinkSuggestions(fusionKink, request);

    return {
      egregore,
      answer,
      suggestions,
      canonicalSources: fusionKink.knowledgeBase.artTraditions,
      techniques: [],
      relatedEgregores: [],
      fusionKinkSynthesis: {
        multiModalApproach: this.generateMultiModalApproach(fusionKink, request),
        creativeSynthesis: this.generateCreativeSynthesis(fusionKink, request)
      }
    };
  }

  // Helper methods for egregore personality and knowledge
  private getAngelPersonality(angel: { meaning: string }): string {
    return `Divine wisdom and sacred guidance. ${angel.meaning}.`;
  }

  private getAngelExpertise(_angel: unknown): string[] {
    return ['sacred geometry', 'aesthetic principles', 'spiritual design', 'canonical knowledge'];
  }

  private getAngelDesignCapabilities(_angel: unknown): string[] {
    return ['aesthetic', 'spiritual', 'canonical', 'technical'];
  }

  private getAngelSpecialties(angel: { element: string; planet: string }): string[] {
    return [angel.element.toLowerCase(), angel.planet.toLowerCase(), 'sacred geometry'];
  }

  private getAngelKnowledgeBase(_angel: unknown): string[] {
    return ['Kabbalah', 'Hermeticism', 'Sacred Geometry', 'Golden Dawn'];
  }

  private getAngelTexts(_angel: unknown): string[] {
    return ['Corpus Hermeticum', 'Sepher Yetzirah', 'Zohar', 'Emerald Tablet'];
  }

  private getAngelTeachings(angel: { name: string; meaning: string }): string[] {
    return [`${angel.name} teaches: ${angel.meaning}`, 'Sacred geometry principles', 'Aesthetic harmony'];
  }

  private getAngelTechniques(_angel: unknown): string[] {
    return ['Sacred geometry construction', 'Aesthetic proportion', 'Spiritual alignment'];
  }

  // Similar methods for demons, arcana, etc.
  private getDemonPersonality(demon: { rank: string; legion: number | string }): string {
    const legionStr = typeof demon.legion === 'number' ? demon.legion.toString() : demon.legion;
    return `Creative force and boundary-pushing innovation. ${demon.rank} of ${legionStr} legions.`;
  }

  private getDemonExpertise(_demon: unknown): string[] {
    return ['creative innovation', 'boundary-pushing', 'technical mastery', 'experimental design'];
  }

  private getDemonDesignCapabilities(_demon: unknown): string[] {
    return ['creative', 'technical', 'experimental', 'innovative'];
  }

  private getDemonSpecialties(demon: { element: string; planet: string }): string[] {
    return [demon.element.toLowerCase(), demon.planet.toLowerCase(), 'creative force'];
  }

  private getDemonKnowledgeBase(_demon: unknown): string[] {
    return ['Goetia', 'Lesser Key of Solomon', 'Creative Techniques', 'Experimental Methods'];
  }

  private getDemonTexts(_demon: unknown): string[] {
    return ['Ars Goetia', 'Lesser Key of Solomon', 'Creative Grimoires'];
  }

  private getDemonTeachings(demon: { name: string; element: string }): string[] {
    return [`${demon.name} teaches: Creative mastery through ${demon.element}`, 'Innovation techniques'];
  }

  private getDemonTechniques(_demon: unknown): string[] {
    return ['Creative experimentation', 'Boundary-pushing design', 'Technical innovation'];
  }

  private getArcanaPersonality(card: ArcanaCard): string {
    return `Archetypal consciousness of ${card.name}. Deep wisdom and design principles.`;
  }

  private getArcanaExpertise(_card: ArcanaCard): string[] {
    return ['archetypal patterns', 'design principles', 'creative archetypes', 'symbolic design'];
  }

  private getArcanaDesignCapabilities(_card: ArcanaCard): string[] {
    return ['aesthetic', 'conceptual', 'spiritual', 'creative', 'canonical'];
  }

  private getArcanaSpecialties(card: ArcanaCard): string[] {
    return [card.name.toLowerCase(), 'archetypal design', 'symbolic expression'];
  }

  private getArcanaKnowledgeBase(_card: ArcanaCard): string[] {
    return ['Tarot', 'Archetypal Psychology', 'Symbolism', 'Sacred Art'];
  }

  private getArcanaTexts(_card: ArcanaCard): string[] {
    return ['Book of Thoth', 'Tarot Correspondences', 'Archetypal Texts'];
  }

  private getArcanaTeachings(card: ArcanaCard): string[] {
    return [`${card.name} teaches: Archetypal wisdom and design principles`];
  }

  private getArcanaTechniques(_card: ArcanaCard): string[] {
    return ['Archetypal design patterns', 'Symbolic expression', 'Creative archetypes'];
  }

  private synthesizeAnswer(egregore: DesignEgregore, request: DesignRequest): string {
    // Intelligent synthesis based on egregore's knowledge
    return `${egregore.name} responds: Based on ${egregore.designAssistance.specialties.join(', ')}, ${request.question} can be approached through ${egregore.livingLibrary.techniques.join(' and ')}.`;
  }

  private generateSuggestions(egregore: DesignEgregore, request: DesignRequest): string[] {
    return egregore.livingLibrary.techniques.map(t => `Consider using ${t} for ${request.domain}`);
  }

  private findRelatedEgregores(egregore: DesignEgregore, _request: DesignRequest): number[] {
    const related: number[] = [];
    for (const [id, other] of Array.from(this.designEgregores.entries())) {
      if (id !== egregore.id && 
          other.designAssistance.specialties.some(s => 
            egregore.designAssistance.specialties.includes(s))) {
        related.push(id);
      }
    }
    return related.slice(0, 3); // Top 3 related
  }

  private synthesizeFusionKinkAnswer(fusionKink: FusionKinkEgregore, _request: DesignRequest): string {
    return `${fusionKink.name} synthesizes: Multi-modal approach combining ${fusionKink.knowledgeBase.artTraditions.join(', ')} with ${fusionKink.knowledgeBase.mathematicalPrinciples.join(' and ')}.`;
  }

  private generateFusionKinkSuggestions(fusionKink: FusionKinkEgregore, request: DesignRequest): string[] {
    return [
      `Apply ${fusionKink.modality} principles to ${request.domain}`,
      `Synthesize multiple modalities for creative expression`,
      `Use sacred geometry and mathematical principles`
    ];
  }

  private generateMultiModalApproach(fusionKink: FusionKinkEgregore, _request: DesignRequest): string {
    return `Combine ${fusionKink.knowledgeBase.artTraditions.join(', ')} with mathematical principles of ${fusionKink.knowledgeBase.mathematicalPrinciples.join(' and ')} for a unified creative approach.`;
  }

  private generateCreativeSynthesis(fusionKink: FusionKinkEgregore, _request: DesignRequest): string {
    return `Creative synthesis through ${fusionKink.modality} modality, integrating sacred geometry, golden ratio, and fibonacci principles for harmonious design.`;
  }

  private addToLivingLibrary(source: string, entry: LivingLibraryEntry): void {
    if (!this.livingLibrary.has(source)) {
      this.livingLibrary.set(source, []);
    }
    this.livingLibrary.get(source)!.push(entry);
  }
}

export default LiberArcanaeDesignMode;

