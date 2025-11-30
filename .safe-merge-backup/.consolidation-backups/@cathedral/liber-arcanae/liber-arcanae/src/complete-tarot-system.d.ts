/**
 * complete-tarot-system
 *
 * @package @cathedral/liber-arcanae
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate complete tarot system
 *
 * Creative use: Game apps, tarot apps, divination apps, RPG apps
 */
/**
 * Liber Arcanae Codex Abyssiae - Complete 78-Card Tarot System
 *
 * Full tarot mapped out and interconnected:
 * - 22 Major Arcana (complete with all correspondences)
 * - 56 Minor Arcana (4 suits × 14 cards each)
 * - Interconnected with Codex 144:99
 * - Connected to Circuitum99 33-chapter story
 * - Fable-like RPG mechanics with real canon
 *
 * Never flat - always flowing, trauma-informed design.
 */
export interface CompleteTarotCard {
    id: string;
    number: number;
    name: string;
    type: 'major' | 'minor';
    suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
    rank?: number;
    element: string;
    planet?: string;
    zodiac?: string;
    hebrew?: string;
    correspondences: TarotCorrespondences;
    narrative: TarotNarrative;
    gameMechanics: FableRPGMechanics;
    connections: TarotConnections;
}
export interface TarotCorrespondences {
    codexNodes: number[];
    circuitumChapters: number[];
    shemAngel?: string;
    goetiaDemon?: string;
    deity?: string;
    iChing?: string;
    soyga?: string;
    sephirah?: string;
    path?: number;
}
export interface TarotNarrative {
    theme: string;
    archetype: string;
    storyBeats: string[];
    meaning: {
        upright: string;
        reversed?: string;
    };
    keywords: string[];
}
export interface FableRPGMechanics {
    alignment: {
        light: number;
        shadow: number;
        balance: number;
    };
    stats: {
        intellect: number;
        intuition: number;
        vitality: number;
        resonance: number;
        manifestation: number;
        connection: number;
    };
    abilities: string[];
    quests: string[];
    rewards: string[];
}
export interface TarotConnections {
    allies: string[];
    challenges: string[];
    transformations: string[];
    fusion: string[];
}
export declare const COMPLETE_TAROT: CompleteTarotCard[];
/**
 * Get card by ID
 */
export declare function getCard(id: string): CompleteTarotCard | undefined;
/**
 * Get all Major Arcana
 */
export declare function getMajorArcana(): CompleteTarotCard[];
/**
 * Get all Minor Arcana
 */
export declare function getMinorArcana(): CompleteTarotCard[];
/**
 * Get cards by suit
 */
export declare function getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): CompleteTarotCard[];
/**
 * Get cards connected to Codex node
 */
export declare function getCardsByCodexNode(nodeId: number): CompleteTarotCard[];
/**
 * Get cards connected to Circuitum99 chapter
 */
export declare function getCardsByChapter(chapterNumber: number): CompleteTarotCard[];
//# sourceMappingURL=complete-tarot-system.d.ts.map