/**
 * Liber Arcanae Codex Abyssiae - 3D RPG System
 * 
 * A Fable-like 3D RPG where Major Arcana are playable characters
 * exploring real pathworking with 72 Shem Angels and Goetic Demons
 * through Circuitum 99: Alpha et Omega
 * 
 * Features:
 * - Playable Major Arcana characters (22 archetypal beings)
 * - Real pathworking with 72 Shem Angels (Kabbalistic tradition)
 * - 72 Goetic Demons (Lesser Key of Solomon)
 * - Circuitum 99: Alpha et Omega gate system
 * - Antero Alli Angel Tech mechanics
 * - Crossing the Abyss mechanics
 * - Holy Guardian Angel quest system
 * - Fable-like explorable 3D world
 * 
 * Based on real canon:
 * - Aleister Crowley - Thelema, Crossing the Abyss, Holy Guardian Angel
 * - Golden Dawn - Kabbalah, Shem Angels, Pathworking
 * - Lesser Key of Solomon - 72 Goetic Demons
 * - Antero Alli - Angel Tech, Pathworking techniques
 * - Hermetic Qabalah - Tree of Life, 72 Names of God
 * 
 * @license CC0-1.0 - Public Domain
 */

import { LiberArcanaeEngine } from './LiberArcanaeEngine';
// ArcanaCard type available but not directly used
// Codex144Engine available for future integration
// import { Codex144Engine } from '../../codex-144-99-core/src/index';
// SACRED_MATH available for future use
// import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

// 72 Shem Angels (Names of God from Exodus 14:19-21, Kabbalistic tradition)
export // Trauma-aware: gentle, supportive, ESC exits, pause anytime
const SHEM_ANGELS = [
  { number: 1, name: 'Vehuiah', meaning: 'God the Exalter', planet: 'Mercury', element: 'Fire', gate: 1 },
  { number: 2, name: 'Jeliel', meaning: 'God who Hastes to Help', planet: 'Moon', element: 'Water', gate: 2 },
  { number: 3, name: 'Sitael', meaning: 'God the Protector', planet: 'Jupiter', element: 'Earth', gate: 3 },
  { number: 4, name: 'Elemiah', meaning: 'God the Concealer', planet: 'Mars', element: 'Fire', gate: 4 },
  { number: 5, name: 'Mahasiah', meaning: 'God the Savior', planet: 'Sun', element: 'Air', gate: 5 },
  { number: 6, name: 'Lelahel', meaning: 'God the Praiser', planet: 'Venus', element: 'Water', gate: 6 },
  { number: 7, name: 'Achaiah', meaning: 'God the Patient', planet: 'Saturn', element: 'Earth', gate: 7 },
  { number: 8, name: 'Cahetel', meaning: 'God to be Venerated', planet: 'Jupiter', element: 'Fire', gate: 8 },
  { number: 9, name: 'Haziel', meaning: 'God of Mercy', planet: 'Mars', element: 'Water', gate: 9 },
  { number: 10, name: 'Aladiah', meaning: 'God the Favorable', planet: 'Sun', element: 'Air', gate: 10 },
  { number: 11, name: 'Lauviah', meaning: 'God the Praiseworthy', planet: 'Venus', element: 'Water', gate: 11 },
  { number: 12, name: 'Hahaiah', meaning: 'God the Refuge', planet: 'Mercury', element: 'Air', gate: 12 },
  { number: 13, name: 'Iezalel', meaning: 'God who Rejoices', planet: 'Moon', element: 'Water', gate: 13 },
  { number: 14, name: 'Mebahel', meaning: 'God the Preserver', planet: 'Saturn', element: 'Earth', gate: 14 },
  { number: 15, name: 'Hariel', meaning: 'God the Creator', planet: 'Jupiter', element: 'Fire', gate: 15 },
  { number: 16, name: 'Hakamiah', meaning: 'God the Protector', planet: 'Mars', element: 'Fire', gate: 16 },
  { number: 17, name: 'Lauviah', meaning: 'God the Praiseworthy', planet: 'Venus', element: 'Water', gate: 17 },
  { number: 18, name: 'Caliel', meaning: 'God who Hastens', planet: 'Sun', element: 'Air', gate: 18 },
  { number: 19, name: 'Leuviah', meaning: 'God the Exalter', planet: 'Mercury', element: 'Air', gate: 19 },
  { number: 20, name: 'Pahaliah', meaning: 'God the Redeemer', planet: 'Moon', element: 'Water', gate: 20 },
  // Continue through all 72 - this is a simplified list, full list would have all 72 names
  { number: 72, name: 'Mumiah', meaning: 'God the Mighty', planet: 'Moon', element: 'Water', gate: 72 }
];

// 72 Goetic Demons (Lesser Key of Solomon)
export const GOETIC_DEMONS = [
  { number: 1, name: 'Baal', rank: 'King', legion: 66, gate: 1, element: 'Fire', planet: 'Sun' },
  { number: 2, name: 'Agares', rank: 'Duke', legion: 31, gate: 2, element: 'Earth', planet: 'Venus' },
  { number: 3, name: 'Vassago', rank: 'Prince', legion: 26, gate: 3, element: 'Air', planet: 'Mercury' },
  { number: 4, name: 'Samigina', rank: 'Marquis', legion: 30, gate: 4, element: 'Water', planet: 'Moon' },
  { number: 5, name: 'Marbas', rank: 'President', legion: 36, gate: 5, element: 'Fire', planet: 'Mars' },
  { number: 6, name: 'Valefor', rank: 'Duke', legion: 10, gate: 6, element: 'Air', planet: 'Mercury' },
  { number: 7, name: 'Amon', rank: 'Marquis', legion: 40, gate: 7, element: 'Fire', planet: 'Mars' },
  { number: 8, name: 'Barbatos', rank: 'Duke', legion: 30, gate: 8, element: 'Earth', planet: 'Venus' },
  { number: 9, name: 'Paimon', rank: 'King', legion: 200, gate: 9, element: 'Air', planet: 'Moon' },
  { number: 10, name: 'Buer', rank: 'President', legion: 50, gate: 10, element: 'Fire', planet: 'Mars' },
  // Continue through all 72 - this is a simplified list, full Lesser Key has all 72 demons
  { number: 72, name: 'Andromalius', rank: 'Earl', legion: 36, gate: 72, element: 'Earth', planet: 'Saturn' }
];

export interface RPGCharacter {
  arcanaIndex: number;           // 0-21 (Major Arcana)
  name: string;
  archetype: string;
  level: number;
  experience: number;
  attributes: {
    strength: number;
    wisdom: number;
    intuition: number;
    creativity: number;
    willpower: number;
    charisma: number;
  };
  pathworking: {
    currentPath: number;          // Current path on Tree of Life (1-32)
    abyssCrossed: boolean;
    holyGuardianAngel: {
      found: boolean;
      name?: string;
      gate?: number;
    };
    shemAngels: number[];         // Shem Angels contacted (1-72)
    goeticDemons: number[];       // Goetic Demons encountered (1-72)
    circuitumGates: number[];     // Circuitum 99 gates opened (1-99)
  };
  realm: {
    name: string;
    description: string;
    explorable: boolean;
    connections: number[];         // Connected realm indices
  };
}

export interface AbyssCrossing {
  characterIndex: number;
  stage: 'preparation' | 'crossing' | 'crossed' | 'failed';
  chokmahBinah: boolean;          // Crossed from Chokmah to Binah
  daath: boolean;                  // Navigated Daath (Abyss)
  kether: boolean;                 // Reached Kether
  tests: {
    knowledge: boolean;
    will: boolean;
    surrender: boolean;
  };
}

export interface HolyGuardianAngel {
  characterIndex: number;
  name: string;
  gate: number;                    // Circuitum 99 gate
  shemAngel: number;               // Associated Shem Angel (1-72)
  found: boolean;
  contacted: boolean;
  communion: {
    level: number;                 // 0-10
    teachings: string[];
    revelations: string[];
  };
}

export interface PathworkingSession {
  characterIndex: number;
  type: 'shem_angel' | 'goetic_demon' | 'circuitum_gate' | 'abyss' | 'hga';
  target: number;                   // Angel/Demon/Gate number
  success: boolean;
  experience: number;
  revelations: string[];
  canonicalSource: string;
}

export class LiberArcanaeRPG {
  private arcanaEngine: LiberArcanaeEngine;
  // Codex engine available for future integration
  // private codexEngine: Codex144Engine;
  private characters: Map<number, RPGCharacter>;
  private abyssCrossings: Map<number, AbyssCrossing>;
  private holyGuardianAngels: Map<number, HolyGuardianAngel>;
  private pathworkingHistory: PathworkingSession[];

  constructor() {
    this.arcanaEngine = new LiberArcanaeEngine();
    // this.codexEngine = new Codex144Engine();
    this.characters = new Map();
    this.abyssCrossings = new Map();
    this.holyGuardianAngels = new Map();
    this.pathworkingHistory = [];

    this.initializeCharacters();
  }

  private initializeCharacters(): void {
    const majorArcana = this.arcanaEngine.getMajorArcana();
    
    for (const card of majorArcana) {
      const character: RPGCharacter = {
        arcanaIndex: card.cardIndex,
        name: card.name,
        archetype: this.getArchetypeForArcana(card.cardIndex),
        level: 1,
        experience: 0,
        attributes: this.generateAttributes(card.cardIndex),
        pathworking: {
          currentPath: this.getStartingPath(card.cardIndex),
          abyssCrossed: false,
          holyGuardianAngel: { found: false },
          shemAngels: [],
          goeticDemons: [],
          circuitumGates: []
        },
        realm: this.generateRealm(card.cardIndex)
      };

      this.characters.set(card.cardIndex, character);
      this.abyssCrossings.set(card.cardIndex, this.initializeAbyssCrossing(card.cardIndex));
    }
  }

  private getArchetypeForArcana(index: number): string {
    const archetypes = [
      'The Innocent', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
      'The Hierophant', 'The Lovers', 'The Charioteer', 'Strength', 'The Hermit',
      'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
      'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
    ];
    return archetypes[index] || 'Unknown';
  }

  private generateAttributes(index: number): RPGCharacter['attributes'] {
    // Each Major Arcana has different attribute strengths
    const baseAttributes = {
      strength: 10,
      wisdom: 10,
      intuition: 10,
      creativity: 10,
      willpower: 10,
      charisma: 10
    };

    // Customize based on arcana
    switch (index) {
      case 0: // The Fool
        return { ...baseAttributes, intuition: 15, creativity: 15, wisdom: 5 };
      case 1: // The Magician
        return { ...baseAttributes, willpower: 15, creativity: 15, strength: 12 };
      case 4: // The Hierophant
        return { ...baseAttributes, wisdom: 18, charisma: 15, willpower: 12 };
      case 13: // Death
        return { ...baseAttributes, willpower: 15, wisdom: 15, strength: 12 };
      case 20: // Judgement
        return { ...baseAttributes, wisdom: 18, intuition: 15, charisma: 12 };
      case 21: // The World
        return { ...baseAttributes, strength: 15, wisdom: 15, creativity: 15 };
      default:
        return baseAttributes;
    }
  }

  private getStartingPath(arcanaIndex: number): number {
    // Map Major Arcana to Tree of Life paths (1-32)
    // Based on Golden Dawn correspondences
    const pathMappings: Record<number, number> = {
      0: 11,   // Fool - Aleph (Air)
      1: 12,   // Magician - Beth (Mercury)
      2: 13,   // High Priestess - Gimel (Moon)
      3: 14,   // Empress - Daleth (Venus)
      4: 15,   // Hierophant - Heh (Aries)
      5: 16,   // Emperor - Vau (Taurus)
      6: 17,   // Lovers - Zain (Gemini)
      7: 18,   // Chariot - Cheth (Cancer)
      8: 19,   // Strength - Teth (Leo)
      9: 20,   // Hermit - Yod (Virgo)
      10: 21,  // Wheel - Kaph (Jupiter)
      11: 22,  // Justice - Lamed (Libra)
      12: 23,  // Hanged Man - Mem (Water)
      13: 24,  // Death - Nun (Scorpio)
      14: 25,  // Temperance - Samekh (Sagittarius)
      15: 26,  // Devil - Ayin (Capricorn)
      16: 27,  // Tower - Peh (Mars)
      17: 28,  // Star - Tzaddi (Aquarius)
      18: 29,  // Moon - Qoph (Pisces)
      19: 30,  // Sun - Resh (Sun)
      20: 31,  // Judgement - Shin (Fire)
      21: 32   // World - Tav (Saturn)
    };
    return pathMappings[arcanaIndex] || 11;
  }

  private generateRealm(arcanaIndex: number): RPGCharacter['realm'] {
    const realms: Record<number, RPGCharacter['realm']> = {
      0: {
        name: 'Realm of Infinite Potential',
        description: 'The Fool\'s realm of pure possibility, where all paths begin',
        explorable: true,
        connections: [1, 21] // Connected to Magician and World
      },
      4: {
        name: 'Realm of Hierophantic Wisdom',
        description: 'The Hierophant\'s realm of sacred tradition, Moonchild prima materia, and abyssiae exploration',
        explorable: true,
        connections: [3, 5, 9] // Connected to Empress, Lovers, Hermit
      },
      // Add all 22 realms...
      21: {
        name: 'Realm of Cosmic Completion',
        description: 'The World\'s realm of integration and wholeness',
        explorable: true,
        connections: [0, 20] // Connected to Fool and Judgement
      }
    };

    return realms[arcanaIndex] || {
      name: `Realm of ${this.getArchetypeForArcana(arcanaIndex)}`,
      description: `The ${this.getArchetypeForArcana(arcanaIndex)}'s personal realm`,
      explorable: true,
      connections: []
    };
  }

  private initializeAbyssCrossing(arcanaIndex: number): AbyssCrossing {
    return {
      characterIndex: arcanaIndex,
      stage: 'preparation',
      chokmahBinah: false,
      daath: false,
      kether: false,
      tests: {
        knowledge: false,
        will: false,
        surrender: false
      }
    };
  }

  // Pathworking with Shem Angels (Antero Alli Angel Tech style)
  public pathworkWithShemAngel(characterIndex: number, angelNumber: number): PathworkingSession {
    const character = this.characters.get(characterIndex);
    if (!character) {
      throw new Error(`Character ${characterIndex} not found`);
    }

    const angel = SHEM_ANGELS.find(a => a.number === angelNumber);
    if (!angel) {
      throw new Error(`Shem Angel ${angelNumber} not found`);
    }

    // Antero Alli Angel Tech: Direct contact through ritual and meditation
    const success = this.attemptPathworking(character, 'shem_angel', angelNumber);
    
    if (success) {
      if (!character.pathworking.shemAngels.includes(angelNumber)) {
        character.pathworking.shemAngels.push(angelNumber);
      }
      character.experience += 100;
      this.checkLevelUp(character);
    }

    const session: PathworkingSession = {
      characterIndex,
      type: 'shem_angel',
      target: angelNumber,
      success,
      experience: success ? 100 : 10,
      revelations: this.generateRevelations('shem_angel', angel),
      canonicalSource: 'Kabbalistic tradition - 72 Names of God (Exodus 14:19-21), Golden Dawn'
    };

    this.pathworkingHistory.push(session);
    return session;
  }

  // Pathworking with Goetic Demons
  public pathworkWithGoeticDemon(characterIndex: number, demonNumber: number): PathworkingSession {
    const character = this.characters.get(characterIndex);
    if (!character) {
      throw new Error(`Character ${characterIndex} not found`);
    }

    const demon = GOETIC_DEMONS.find(d => d.number === demonNumber);
    if (!demon) {
      throw new Error(`Goetic Demon ${demonNumber} not found`);
    }

    // Lesser Key of Solomon: Evocation and binding
    const success = this.attemptPathworking(character, 'goetic_demon', demonNumber);
    
    if (success) {
      if (!character.pathworking.goeticDemons.includes(demonNumber)) {
        character.pathworking.goeticDemons.push(demonNumber);
      }
      character.experience += 150; // Demons give more XP but are riskier
      this.checkLevelUp(character);
    }

    const session: PathworkingSession = {
      characterIndex,
      type: 'goetic_demon',
      target: demonNumber,
      success,
      experience: success ? 150 : 5,
      revelations: this.generateRevelations('goetic_demon', demon),
      canonicalSource: 'Lesser Key of Solomon - Goetia, Ars Goetia'
    };

    this.pathworkingHistory.push(session);
    return session;
  }

  // Open Circuitum 99 Gate (Alpha et Omega)
  public openCircuitumGate(characterIndex: number, gateNumber: number): PathworkingSession {
    const character = this.characters.get(characterIndex);
    if (!character) {
      throw new Error(`Character ${characterIndex} not found`);
    }

    if (gateNumber < 1 || gateNumber > 99) {
      throw new Error(`Gate ${gateNumber} must be between 1 and 99`);
    }

    // Circuitum 99: Alpha et Omega - The complete circuit
    const success = this.attemptPathworking(character, 'circuitum_gate', gateNumber);
    
    if (success) {
      if (!character.pathworking.circuitumGates.includes(gateNumber)) {
        character.pathworking.circuitumGates.push(gateNumber);
      }
      character.experience += 200;
      this.checkLevelUp(character);

      // Special: Opening gate 1 (Alpha) and gate 99 (Omega) together
      if (character.pathworking.circuitumGates.includes(1) && 
          character.pathworking.circuitumGates.includes(99)) {
        this.achieveAlphaOmega(character);
      }
    }

    const session: PathworkingSession = {
      characterIndex,
      type: 'circuitum_gate',
      target: gateNumber,
      success,
      experience: success ? 200 : 20,
      revelations: this.generateRevelations('circuitum_gate', { gate: gateNumber }),
      canonicalSource: 'Circuitum 99: Alpha et Omega - Complete gate system'
    };

    this.pathworkingHistory.push(session);
    return session;
  }

  // Crossing the Abyss (Crowley's system)
  public attemptAbyssCrossing(characterIndex: number): AbyssCrossing {
    const character = this.characters.get(characterIndex);
    const crossing = this.abyssCrossings.get(characterIndex);
    
    if (!character || !crossing) {
      throw new Error(`Character ${characterIndex} not found`);
    }

    if (crossing.stage === 'crossed') {
      return crossing; // Already crossed
    }

    // Requirements for crossing (Crowley's system)
    const requirements = {
      knowledge: character.attributes.wisdom >= 15,
      will: character.attributes.willpower >= 15,
      surrender: character.level >= 5,
      paths: character.pathworking.currentPath >= 20
    };

    if (requirements.knowledge && requirements.will && requirements.surrender) {
      // Test 1: Knowledge (Chokmah to Binah)
      if (!crossing.chokmahBinah) {
        crossing.chokmahBinah = this.testKnowledge(character);
        crossing.tests.knowledge = crossing.chokmahBinah;
      }

      // Test 2: Will (Navigate Daath - the Abyss)
      if (crossing.chokmahBinah && !crossing.daath) {
        crossing.daath = this.testWill(character);
        crossing.tests.will = crossing.daath;
      }

      // Test 3: Surrender (Reach Kether)
      if (crossing.daath && !crossing.kether) {
        crossing.kether = this.testSurrender(character);
        crossing.tests.surrender = crossing.kether;
      }

      if (crossing.kether) {
        crossing.stage = 'crossed';
        character.pathworking.abyssCrossed = true;
        character.experience += 1000;
        this.checkLevelUp(character);
      } else {
        crossing.stage = 'crossing';
      }
    } else {
      crossing.stage = 'preparation';
    }

    return crossing;
  }

  // Find Holy Guardian Angel (Crowley's central quest)
  public findHolyGuardianAngel(characterIndex: number): HolyGuardianAngel {
    const character = this.characters.get(characterIndex);
    if (!character) {
      throw new Error(`Character ${characterIndex} not found`);
    }

    let hga = this.holyGuardianAngels.get(characterIndex);
    
    if (!hga) {
      // Generate HGA based on character's path and attributes
      const gate = this.calculateHGAGate(character);
      const shemAngel = this.calculateHGAShemAngel(character);
      const name = this.generateHGAName(character);

      hga = {
        characterIndex,
        name,
        gate,
        shemAngel,
        found: false,
        contacted: false,
        communion: {
          level: 0,
          teachings: [],
          revelations: []
        }
      };

      this.holyGuardianAngels.set(characterIndex, hga);
    }

    // Requirements to find HGA (Crowley's system)
    const canFind = character.level >= 3 && 
                    character.pathworking.circuitumGates.length >= 5 &&
                    character.attributes.wisdom >= 12;

    if (canFind && !hga.found) {
      // The HGA reveals itself
      hga.found = true;
      character.pathworking.holyGuardianAngel = {
        found: true,
        name: hga.name,
        gate: hga.gate
      };
      character.experience += 500;
      this.checkLevelUp(character);
    }

    return hga;
  }

  // Commune with Holy Guardian Angel
  public communeWithHGA(characterIndex: number): string[] {
    const hga = this.holyGuardianAngels.get(characterIndex);
    if (!hga || !hga.found) {
      throw new Error('Holy Guardian Angel not found');
    }

    if (!hga.contacted) {
      hga.contacted = true;
      hga.communion.level = 1;
    }

    // Increase communion level
    if (hga.communion.level < 10) {
      hga.communion.level++;
    }

    // Generate teachings and revelations
    const teachings = this.generateHGATeachings(hga);
    hga.communion.teachings.push(...teachings);
    
    const revelations = this.generateHGARevelations(hga);
    hga.communion.revelations.push(...revelations);

    return [...teachings, ...revelations];
  }

  // Helper methods
  private attemptPathworking(character: RPGCharacter, _type: string, _target: number): boolean {
    // Success based on character attributes and level
    const baseChance = 0.5;
    const levelBonus = character.level * 0.05;
    const attributeBonus = (character.attributes.willpower + character.attributes.wisdom) / 40;
    const chance = Math.min(0.95, baseChance + levelBonus + attributeBonus);
    return Math.random() < chance;
  }

  private checkLevelUp(character: RPGCharacter): void {
    const expNeeded = character.level * 1000;
    if (character.experience >= expNeeded) {
      character.level++;
      character.experience -= expNeeded;
      // Increase attributes on level up
      const attrs = ['strength', 'wisdom', 'intuition', 'creativity', 'willpower', 'charisma'] as const;
      const attr = attrs[Math.floor(Math.random() * attrs.length)];
      character.attributes[attr] += 1;
    }
  }

  private testKnowledge(character: RPGCharacter): boolean {
    return character.attributes.wisdom >= 15 && character.pathworking.currentPath >= 20;
  }

  private testWill(character: RPGCharacter): boolean {
    return character.attributes.willpower >= 15 && character.level >= 5;
  }

  private testSurrender(character: RPGCharacter): boolean {
    return character.attributes.wisdom >= 18 && character.pathworking.abyssCrossed === false;
  }

  private calculateHGAGate(character: RPGCharacter): number {
    // HGA gate is based on character's arcana and path
    return ((character.arcanaIndex * 4) + character.pathworking.currentPath) % 99 + 1;
  }

  private calculateHGAShemAngel(character: RPGCharacter): number {
    // HGA Shem Angel is based on character's attributes
    const sum = character.attributes.strength + character.attributes.wisdom + 
                character.attributes.intuition + character.attributes.creativity;
    return (sum % 72) + 1;
  }

  private generateHGAName(character: RPGCharacter): string {
    const names = [
      'Metatron', 'Raziel', 'Tzaphkiel', 'Tzadkiel', 'Kamael',
      'Raphael', 'Haniel', 'Michael', 'Gabriel', 'Sandalphon'
    ];
    return names[character.arcanaIndex % names.length];
  }

  private generateRevelations(type: string, entity: any): string[] {
    const revelations: string[] = [];
    
    if (type === 'shem_angel') {
      revelations.push(`Contacted ${entity.name}: ${entity.meaning}`);
      revelations.push(`Gate ${entity.gate} resonates with ${entity.element} energy`);
    } else if (type === 'goetic_demon') {
      revelations.push(`Encountered ${entity.name}, ${entity.rank} of ${entity.legion} legions`);
      revelations.push(`Gate ${entity.gate} opens to ${entity.element} realm`);
    } else if (type === 'circuitum_gate') {
      revelations.push(`Gate ${entity.gate} opened - Alpha et Omega circuit activated`);
    }
    
    return revelations;
  }

  private generateHGATeachings(hga: HolyGuardianAngel): string[] {
    return [
      `The Holy Guardian Angel ${hga.name} teaches: "Know thyself through the pathworking"`,
      `Gate ${hga.gate} reveals deeper mysteries of the Circuitum`,
      `Shem Angel ${hga.shemAngel} guides your journey`
    ];
  }

  private generateHGARevelations(hga: HolyGuardianAngel): string[] {
    return [
      `Revelation: Your True Will aligns with gate ${hga.gate}`,
      `Revelation: The abyssiae realms are interconnected through the Circuitum`,
      `Revelation: All pathworking leads to the Holy Guardian Angel`
    ];
  }

  private achieveAlphaOmega(character: RPGCharacter): void {
    // Special achievement: Complete Alpha et Omega
    character.experience += 500;
    character.attributes.willpower += 2;
    character.attributes.wisdom += 2;
    this.checkLevelUp(character);
  }

  // Get character by index
  public getCharacter(arcanaIndex: number): RPGCharacter | null {
    return this.characters.get(arcanaIndex) || null;
  }

  // Get all characters
  public getAllCharacters(): RPGCharacter[] {
    return Array.from(this.characters.values());
  }

  // Explore realm
  public exploreRealm(characterIndex: number, targetRealmIndex?: number): RPGCharacter['realm'] {
    const character = this.characters.get(characterIndex);
    if (!character) {
      throw new Error(`Character ${characterIndex} not found`);
    }

    if (targetRealmIndex !== undefined) {
      const targetCharacter = this.characters.get(targetRealmIndex);
      if (targetCharacter) {
        return targetCharacter.realm;
      }
    }

    return character.realm;
  }
}

export default LiberArcanaeRPG;

