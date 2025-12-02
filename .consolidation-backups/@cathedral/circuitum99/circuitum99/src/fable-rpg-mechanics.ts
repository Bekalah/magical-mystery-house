/**
 * fable-rpg-mechanics
 * 
 * @package @cathedral/circuitum99
 */
/**
 * Circuitum99: Alpha et Omega - Fable RPG Mechanics
 * 
 * Real canon, real creative aspects:
 * - Moral alignment system (Light/Shadow/Balance)
 * - Character progression through 33 chapters
 * - Real correspondences and canon
 * - Creative pathworking
 * - Interconnected with Codex 144:99 and Liber Arcanae
 * 
 * Never flat - always flowing, trauma-informed design.
 */

import { getChapter } from './33-chapters';
import { getCard } from '@cathedral/liber-arcanae/complete-tarot-system';
import { CodexLibrary } from '@cathedral/codex-144-99';

export interface CharacterAlignment {
  light: number; // 0-100
  shadow: number; // 0-100
  balance: number; // Calculated: 100 - |light - shadow|
  path: 'light' | 'shadow' | 'balance';
}

export interface CharacterStats {
  intellect: number; // 0-100
  intuition: number; // 0-100
  vitality: number; // 0-100
  resonance: number; // 0-100
  manifestation: number; // 0-100
  connection: number; // 0-100
}

export interface CharacterProgress {
  chapter: number; // Current chapter (1-33)
  gates: number[]; // Unlocked gates (1-99)
  codexNodes: number[]; // Discovered nodes (1-144)
  tarotCards: string[]; // Collected cards
  alignment: CharacterAlignment;
  stats: CharacterStats;
  choices: CharacterChoice[];
}

export interface CharacterChoice {
  id: string;
  chapter: number;
  type: 'light' | 'shadow' | 'balance';
  description: string;
  consequences: {
    alignment: { light?: number; shadow?: number };
    stats: Partial<CharacterStats>;
    unlocks: string[];
  };
}

export interface Quest {
  id: string;
  name: string;
  chapter: number;
  type: 'main' | 'side' | 'arcana' | 'codex';
  description: string;
  objectives: string[];
  rewards: {
    alignment?: { light?: number; shadow?: number };
    stats?: Partial<CharacterStats>;
    unlocks?: string[];
    items?: string[];
  };
  requirements?: {
    chapter?: number;
    alignment?: { minLight?: number; minShadow?: number };
    stats?: Partial<CharacterStats>;
  };
}

/**
 * Fable RPG Character System
 * 
 * Real canon, real creative aspects, Fable-like mechanics
 */
export class FableRPGCharacter {
  private progress: CharacterProgress;
  private codex: CodexLibrary;

  constructor(seed?: string) {
    this.codex = new CodexLibrary();
    this.progress = {
      chapter: 1,
      gates: [],
      codexNodes: [],
      tarotCards: [],
      alignment: {
        light: 50,
        shadow: 50,
        balance: 100,
        path: 'balance'
      },
      stats: {
        intellect: 50,
        intuition: 50,
        vitality: 50,
        resonance: 50,
        manifestation: 50,
        connection: 50
      },
      choices: []
    };
  }

  /**
   * Make a choice (Fable-like moral choice)
   */
  makeChoice(choice: CharacterChoice): void {
// console.log(`🎮 Making choice: ${choice.description}`);

    // Apply alignment changes
    if (choice.consequences.alignment.light) {
      this.progress.alignment.light = Math.max(0, Math.min(100,
        this.progress.alignment.light + choice.consequences.alignment.light
      ));
    }
    if (choice.consequences.alignment.shadow) {
      this.progress.alignment.shadow = Math.max(0, Math.min(100,
        this.progress.alignment.shadow + choice.consequences.alignment.shadow
      ));
    }

    // Recalculate balance
    this.progress.alignment.balance = 100 - Math.abs(
      this.progress.alignment.light - this.progress.alignment.shadow
    );

    // Determine path
    if (this.progress.alignment.light > this.progress.alignment.shadow + 10) {
      this.progress.alignment.path = 'light';
    } else if (this.progress.alignment.shadow > this.progress.alignment.light + 10) {
      this.progress.alignment.path = 'shadow';
    } else {
      this.progress.alignment.path = 'balance';
    }

    // Apply stat changes
    Object.entries(choice.consequences.stats).forEach(([stat, value]) => {
      if (value) {
        (this.progress.stats as any)[stat] = Math.max(0, Math.min(100,
          (this.progress.stats as any)[stat] + value
        ));
      }
    });

    // Unlock items
    if (choice.consequences.unlocks) {
      choice.consequences.unlocks.forEach(unlock => {
        if (unlock.startsWith('gate_')) {
          const gateNum = parseInt(unlock.replace('gate_', ''));
          if (!this.progress.gates.includes(gateNum)) {
            this.progress.gates.push(gateNum);
          }
        } else if (unlock.startsWith('node_')) {
          const nodeNum = parseInt(unlock.replace('node_', ''));
          if (!this.progress.codexNodes.includes(nodeNum)) {
            this.progress.codexNodes.push(nodeNum);
          }
        } else if (unlock.startsWith('card_')) {
          const cardId = unlock.replace('card_', '');
          if (!this.progress.tarotCards.includes(cardId)) {
            this.progress.tarotCards.push(cardId);
          }
        }
      });
    }

    // Record choice
    this.progress.choices.push(choice);
  }

  /**
   * Progress to next chapter
   */
  progressToChapter(chapterNumber: number): void {
    if (chapterNumber < 1 || chapterNumber > 33) {
      throw new Error('Chapter number must be between 1 and 33');
    }

    if (chapterNumber !== this.progress.chapter + 1) {
      throw new Error(`Can only progress to next chapter. Current: ${this.progress.chapter}, Attempted: ${chapterNumber}`);
    }

    this.progress.chapter = chapterNumber;

    // Unlock corresponding gate
    const gateNumber = chapterNumber; // 1-33 chapters map to gates 1-33
    if (!this.progress.gates.includes(gateNumber)) {
      this.progress.gates.push(gateNumber);
    }

    // Discover corresponding Codex nodes
    const chapter = getChapter(`chapter-${chapterNumber}`);
    if (chapter?.correspondences.codexNode) {
      if (!this.progress.codexNodes.includes(chapter.correspondences.codexNode)) {
        this.progress.codexNodes.push(chapter.correspondences.codexNode);
      }
    }

    // Discover corresponding tarot cards
    const cards = getCardsByChapter(chapterNumber);
    cards.forEach(card => {
      if (!this.progress.tarotCards.includes(card.id)) {
        this.progress.tarotCards.push(card.id);
      }
    });
  }

  /**
   * Get available choices for current chapter
   */
  getAvailableChoices(): CharacterChoice[] {
    const chapter = getChapter(`chapter-${this.progress.chapter}`);
    if (!chapter) return [];

    // Generate choices based on chapter and alignment
    const choices: CharacterChoice[] = [];

    // Light path choice
    if (this.progress.alignment.path !== 'shadow') {
      choices.push({
        id: `choice-${this.progress.chapter}-light`,
        chapter: this.progress.chapter,
        type: 'light',
        description: chapter.pathworking?.[0]?.title || 'Choose the path of light',
        consequences: {
          alignment: { light: 10 },
          stats: { intellect: 5, connection: 5 },
          unlocks: [`gate_${this.progress.chapter}`, `node_${chapter.correspondences.codexNode || 1}`]
        }
      });
    }

    // Shadow path choice
    if (this.progress.alignment.path !== 'light') {
      choices.push({
        id: `choice-${this.progress.chapter}-shadow`,
        chapter: this.progress.chapter,
        type: 'shadow',
        description: 'Choose the path of shadow',
        consequences: {
          alignment: { shadow: 10 },
          stats: { intuition: 5, resonance: 5 },
          unlocks: [`gate_${this.progress.chapter}`, `node_${chapter.correspondences.codexNode || 1}`]
        }
      });
    }

    // Balance path choice
    choices.push({
      id: `choice-${this.progress.chapter}-balance`,
      chapter: this.progress.chapter,
      type: 'balance',
      description: 'Choose the path of balance',
      consequences: {
        alignment: { light: 5, shadow: 5 },
        stats: { vitality: 5, manifestation: 5 },
        unlocks: [`gate_${this.progress.chapter}`, `node_${chapter.correspondences.codexNode || 1}`]
      }
    });

    return choices;
  }

  /**
   * Get available quests
   */
  getAvailableQuests(): Quest[] {
    const quests: Quest[] = [];

    // Main story quest (current chapter)
    const chapter = getChapter(`chapter-${this.progress.chapter}`);
    if (chapter) {
      quests.push({
        id: `quest-chapter-${this.progress.chapter}`,
        name: chapter.title,
        chapter: this.progress.chapter,
        type: 'main',
        description: chapter.description,
        objectives: chapter.exercises.map(ex => ex.title),
        rewards: {
          alignment: { light: 5, shadow: 5 },
          stats: { intellect: 10, intuition: 10 },
          unlocks: [`gate_${this.progress.chapter}`, `node_${chapter.correspondences.codexNode || 1}`]
        }
      });
    }

    // Arcana quests (based on collected cards)
    this.progress.tarotCards.forEach(cardId => {
      const card = getCard(cardId);
      if (card && card.type === 'major') {
        quests.push({
          id: `quest-arcana-${card.number}`,
          name: `${card.name} Quest`,
          chapter: this.progress.chapter,
          type: 'arcana',
          description: `Learn from ${card.name}`,
          objectives: card.gameMechanics?.quests || [],
          rewards: {
            stats: card.gameMechanics?.stats || {},
            unlocks: [`card_${cardId}`]
          }
        });
      }
    });

    // Codex quests (based on discovered nodes)
    this.progress.codexNodes.forEach(nodeId => {
      const node = this.codex.getNode(nodeId);
      if (node) {
        quests.push({
          id: `quest-codex-${nodeId}`,
          name: `${node.name} Quest`,
          chapter: this.progress.chapter,
          type: 'codex',
          description: `Explore ${node.name}`,
          objectives: node.narrative?.storyBeats || [],
          rewards: {
            stats: { resonance: 10, connection: 10 },
            unlocks: [`node_${nodeId}`]
          }
        });
      }
    });

    return quests;
  }

  /**
   * Get character progress
   */
  getProgress(): CharacterProgress {
    return { ...this.progress };
  }

  /**
   * Get alignment
   */
  getAlignment(): CharacterAlignment {
    return { ...this.progress.alignment };
  }

  /**
   * Get stats
   */
  getStats(): CharacterStats {
    return { ...this.progress.stats };
  }
}

// Helper function (needs to be imported)
function getCardsByChapter(chapterNumber: number): any[] {
  // This would use the complete tarot system
  return [];
}
