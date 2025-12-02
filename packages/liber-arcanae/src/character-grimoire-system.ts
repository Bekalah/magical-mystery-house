/**
 * @license CC0-1.0 - Public Domain
 * 
 * Character Grimoire System
 * Manages character grimoires, connects to daimons, realms, and spells
 */

import { Grimoire } from '@cathedral/stone-grimoire/grimoire-maker';

export interface CharacterGrimoire extends Grimoire {
  character: {
    number: number;
    name: string;
    purityDesignation: string;
    fractalSignature: string;
  };
  inspiration: {
    realWorld: string;
    realm: string;
    themes: string[];
    historicalSources: string[];
  };
  alchemical: {
    operation: string;
    tarotSuit: string;
    alchemicalElement: string;
  };
  daimons: {
    shemAngel: string;
    goetiaDemon: string;
  };
  spells: Array<{
    id: string;
    name: string;
    source: string;
    tarotSuit: string;
    alchemicalElement: string;
    description: string;
    creativeInterpretation: string;
  }>;
}

export class CharacterGrimoireSystem {
  private grimoires: Map<number, CharacterGrimoire> = new Map();

  /**
   * Load character grimoire
   */
  async loadGrimoire(arcanaNumber: number): Promise<CharacterGrimoire | null> {
    // This would load from the generated character-grimoires.json
    // For now, return from map if exists
    return this.grimoires.get(arcanaNumber) || null;
  }

  /**
   * Get all character grimoires
   */
  getAllGrimoires(): CharacterGrimoire[] {
    return Array.from(this.grimoires.values());
  }

  /**
   * Connect grimoire to daimon
   */
  connectDaimon(arcanaNumber: number, daimonType: 'shem' | 'goetia', daimonName: string): void {
    const grimoire = this.grimoires.get(arcanaNumber);
    if (grimoire) {
      if (daimonType === 'shem') {
        grimoire.daimons.shemAngel = daimonName;
      } else {
        grimoire.daimons.goetiaDemon = daimonName;
      }
    }
  }

  /**
   * Get spells for character
   */
  getSpells(arcanaNumber: number): CharacterGrimoire['spells'] {
    const grimoire = this.grimoires.get(arcanaNumber);
    return grimoire?.spells || [];
  }
}

export default CharacterGrimoireSystem;

