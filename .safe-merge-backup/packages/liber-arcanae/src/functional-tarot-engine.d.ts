/**
 * Functional Tarot Engine
 *
 * A REAL, WORKING tarot reading system that anyone can use
 * Especially designed for people with PTSD and neurodivergence
 *
 * Features:
 * - Simple, clear language
 * - Trauma-safe interpretations
 * - Multiple spread types
 * - Accessible interface
 * - Fun and playful
 * - Deep and intricate
 *
 * @package @cathedral/liber-arcanae
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate tarot engine mechanics
 *
 * Creative use: Game apps, tarot apps, divination apps, RPG apps
 */
import { CompleteTarotCard } from './complete-tarot-system';
export interface TarotReading {
    id: string;
    type: 'daily' | 'three-card' | 'celtic-cross' | 'relationship' | 'healing';
    cards: ReadingCard[];
    question?: string;
    timestamp: Date;
    interpretation: string;
}
export interface ReadingCard {
    card: CompleteTarotCard;
    position: string;
    reversed: boolean;
    interpretation: string;
}
export type SpreadType = 'daily' | 'three-card' | 'celtic-cross' | 'relationship' | 'healing';
/**
 * Functional Tarot Engine
 *
 * A real, working tarot reading system
 */
export declare class FunctionalTarotEngine {
    private allCards;
    private readingHistory;
    constructor();
    /**
     * Get a daily guidance card
     * Simple, gentle, supportive
     */
    getDailyGuidance(): ReadingCard;
    /**
     * Three-card reading
     * Past, Present, Future OR Situation, Action, Outcome
     */
    getThreeCardReading(intent?: 'time' | 'guidance'): TarotReading;
    /**
     * Celtic Cross reading (10 cards)
     * Deep, comprehensive reading
     */
    getCelticCrossReading(question?: string): TarotReading;
    /**
     * Relationship reading
     * Trauma-safe, gentle, supportive
     */
    getRelationshipReading(): TarotReading;
    /**
     * Healing reading
     * Only supportive, empowering cards
     */
    getHealingReading(): TarotReading;
    /**
     * Draw a random card
     */
    private drawRandomCard;
    /**
     * Interpret a card
     * Trauma-safe, clear, supportive language
     */
    private interpretCard;
    /**
     * Make language trauma-safe
     * Replace harsh language with gentler alternatives
     */
    private makeTraumaSafe;
    /**
     * Get daily action suggestion
     */
    private getDailyAction;
    /**
     * Check if card is healing-oriented
     */
    private isHealingCard;
    /**
     * Check if card is empowering
     */
    private isEmpowermentCard;
    /**
     * Synthesize three-card reading
     */
    private synthesizeThreeCard;
    /**
     * Synthesize Celtic Cross reading
     */
    private synthesizeCelticCross;
    /**
     * Synthesize relationship reading
     */
    private synthesizeRelationship;
    /**
     * Synthesize healing reading
     */
    private synthesizeHealing;
    /**
     * Get reading history
     */
    getHistory(): TarotReading[];
    /**
     * Clear history
     */
    clearHistory(): void;
    /**
     * Get all cards
     */
    getAllCards(): CompleteTarotCard[];
    /**
     * Get card by ID
     */
    getCard(id: string): CompleteTarotCard | undefined;
    /**
     * Search cards
     */
    searchCards(query: string): CompleteTarotCard[];
}
export declare const tarotEngine: FunctionalTarotEngine;
export default tarotEngine;
//# sourceMappingURL=functional-tarot-engine.d.ts.map