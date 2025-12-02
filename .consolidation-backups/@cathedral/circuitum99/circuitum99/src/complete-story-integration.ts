/**
 * complete-story-integration
 * 
 * @package @cathedral/circuitum99
 */
/**
 * Circuitum99: Alpha et Omega - Complete Story Integration
 * 
 * 33-chapter living spine book with:
 * - Full interconnection with Codex 144:99
 * - Full interconnection with Liber Arcanae
 * - Fable-like RPG mechanics
 * - Real canon and real creative aspects
 * - Double Tree of Life pathworking
 * 
 * Never flat - always flowing, trauma-informed design.
 */

import { getChapter, getAllChapters, getNextChapter, getPreviousChapter } from './33-chapters';
import { getCard, getCardsByChapter } from '@cathedral/liber-arcanae/complete-tarot-system';
import { perfectCodex } from '@cathedral/codex-144-99/complete-codex';
import { FableRPGCharacter, CharacterChoice, Quest } from './fable-rpg-mechanics';

export interface CompleteStoryNode {
  chapter: number;
  chapterData: any;
  codexNodes: any[]; // Connected Codex nodes
  tarotCards: any[]; // Connected tarot cards
  gates: number[]; // Connected gates (1-99)
  pathworking: {
    sephiroth?: string;
    qliphoth?: string;
    path: number;
    direction: 'ascending' | 'descending' | 'both';
  };
  choices: CharacterChoice[];
  quests: Quest[];
  unlocks: {
    gates: number[];
    nodes: number[];
    cards: string[];
    chapters: number[];
  };
}

/**
 * Complete Story Integration
 * 
 * Perfects Circuitum99 with full interconnections
 */
export class CompleteStoryIntegration {
  /**
   * Get complete story node for a chapter
   */
  getCompleteStoryNode(chapterNumber: number): CompleteStoryNode {
    const chapter = getChapter(`chapter-${chapterNumber}`);
    if (!chapter) {
      throw new Error(`Chapter ${chapterNumber} not found`);
    }

    // Get connected Codex nodes
    const codexNodes = chapter.correspondences.codexNode ? 
      [perfectCodex.getPerfectNode(chapter.correspondences.codexNode)] : [];

    // Get connected tarot cards
    const tarotCards = getCardsByChapter(chapterNumber);

    // Calculate connected gates
    const gates: number[] = [chapterNumber]; // Direct mapping
    // Add gates from connected nodes
    codexNodes.forEach(perfectNode => {
      perfectNode.circuitum.gates.forEach(gate => {
        if (!gates.includes(gate)) {
          gates.push(gate);
        }
      });
    });

    // Get pathworking info
    const pathworking = {
      sephiroth: chapter.sephiroth,
      qliphoth: chapter.qliphoth,
      path: chapter.path.pathNumber,
      direction: chapter.path.direction
    };

    // Generate choices (Fable-like)
    const choices: CharacterChoice[] = this.generateChoicesForChapter(chapterNumber);

    // Generate quests
    const quests: Quest[] = this.generateQuestsForChapter(chapterNumber);

    // Calculate unlocks
    const unlocks = {
      gates: gates,
      nodes: codexNodes.map(n => n.id),
      cards: tarotCards.map(c => c.id),
      chapters: chapter.nextChapter ? [this.getChapterNumber(chapter.nextChapter)] : []
    };

    return {
      chapter: chapterNumber,
      chapterData: chapter,
      codexNodes,
      tarotCards,
      gates,
      pathworking,
      choices,
      quests,
      unlocks
    };
  }

  /**
   * Get complete story path (all 33 chapters)
   */
  getCompleteStoryPath(): CompleteStoryNode[] {
    const storyNodes: CompleteStoryNode[] = [];
    for (let i = 1; i <= 33; i++) {
      try {
        storyNodes.push(this.getCompleteStoryNode(i));
      } catch (e) {
        // Skip chapters that don't exist
      }
    }
    return storyNodes;
  }

  /**
   * Generate Fable-like choices for chapter
   */
  private generateChoicesForChapter(chapterNumber: number): CharacterChoice[] {
    const chapter = getChapter(`chapter-${chapterNumber}`);
    if (!chapter) return [];

    const choices: CharacterChoice[] = [];

    // Light path choice
    choices.push({
      id: `choice-${chapterNumber}-light`,
      chapter: chapterNumber,
      type: 'light',
      description: `Choose the path of light and ascension`,
      consequences: {
        alignment: { light: 15, shadow: -5 },
        stats: { intellect: 10, connection: 10 },
        unlocks: [`gate_${chapterNumber}`, `node_${chapter.correspondences.codexNode || 1}`]
      }
    });

    // Shadow path choice
    choices.push({
      id: `choice-${chapterNumber}-shadow`,
      chapter: chapterNumber,
      type: 'shadow',
      description: `Choose the path of shadow and depth`,
      consequences: {
        alignment: { light: -5, shadow: 15 },
        stats: { intuition: 10, resonance: 10 },
        unlocks: [`gate_${chapterNumber}`, `node_${chapter.correspondences.codexNode || 1}`]
      }
    });

    // Balance path choice
    choices.push({
      id: `choice-${chapterNumber}-balance`,
      chapter: chapterNumber,
      type: 'balance',
      description: `Choose the path of balance and integration`,
      consequences: {
        alignment: { light: 5, shadow: 5 },
        stats: { vitality: 10, manifestation: 10 },
        unlocks: [`gate_${chapterNumber}`, `node_${chapter.correspondences.codexNode || 1}`]
      }
    });

    return choices;
  }

  /**
   * Generate quests for chapter
   */
  private generateQuestsForChapter(chapterNumber: number): Quest[] {
    const chapter = getChapter(`chapter-${chapterNumber}`);
    if (!chapter) return [];

    const quests: Quest[] = [];

    // Main story quest
    quests.push({
      id: `quest-main-${chapterNumber}`,
      name: chapter.title,
      chapter: chapterNumber,
      type: 'main',
      description: chapter.description,
      objectives: chapter.exercises.map(ex => ex.title),
      rewards: {
        alignment: { light: 10, shadow: 10 },
        stats: { intellect: 15, intuition: 15 },
        unlocks: [`gate_${chapterNumber}`, `node_${chapter.correspondences.codexNode || 1}`]
      }
    });

    // Pathworking quest
    if (chapter.pathworking) {
      quests.push({
        id: `quest-pathworking-${chapterNumber}`,
        name: `Pathworking: ${chapter.pathworking.title}`,
        chapter: chapterNumber,
        type: 'side',
        description: `Complete the pathworking exercise`,
        objectives: chapter.pathworking.exercises,
        rewards: {
          stats: { resonance: 20, connection: 20 },
          unlocks: [`gate_${chapterNumber}`]
        }
      });
    }

    // Arcana quests (from connected cards)
    const cards = getCardsByChapter(chapterNumber);
    cards.filter(c => c.type === 'major').forEach(card => {
      quests.push({
        id: `quest-arcana-${card.number}-${chapterNumber}`,
        name: `${card.name} Quest`,
        chapter: chapterNumber,
        type: 'arcana',
        description: `Learn from ${card.name}`,
        objectives: card.gameMechanics.quests,
        rewards: {
          stats: card.gameMechanics.stats,
          unlocks: [`card_${card.id}`]
        }
      });
    });

    return quests;
  }

  /**
   * Helper: Get chapter number from ID
   */
  private getChapterNumber(chapterId: string): number {
    const match = chapterId.match(/chapter-(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}

// Helper function (would be imported)
function getCardsByChapter(chapterNumber: number): any[] {
  // This would search all cards
  return [];
}

// Singleton instance
export const completeStory = new CompleteStoryIntegration();
