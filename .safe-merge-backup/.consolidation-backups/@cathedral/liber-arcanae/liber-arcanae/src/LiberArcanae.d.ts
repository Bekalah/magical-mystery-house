/**
 * LiberArcanae
 *
 * @package @cathedral/liber-arcanae
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate Liber Arcanae system
 *
 * Creative use: Game apps, tarot apps, divination apps, RPG apps
 */
/**
 * Liber Arcanae Codex Abyssiae System - Clean Version
 * 78-card tarot system that mirrors Codex 144:99 with fusion kink integration
 */
import { ArcanaCard, ArcanaSuit, LiberArcanaeConfig, ArcanaSearchQuery, ArcanaSearchResult, FusionKinkSession, ArcanaAnalytics } from './types';
export declare class LiberArcanae {
    private config;
    private cards;
    private fusionSessions;
    private codexLibrary;
    constructor(config?: Partial<LiberArcanaeConfig>);
    private initializeSystem;
    private loadCards;
    private generateMinorArcana;
    private generateMinorCardData;
    private generateCourtCardData;
    private createMajorArcanaCard;
    private createMinorArcanaCard;
    private getMajorArcanaNumber;
    private getMajorArcanaName;
    private calculateMirroredCodexNodes;
    private calculateResonance;
    private calculateCompatibleCards;
    private getElementForSuit;
    private getPlanetForSuit;
    private getZodiacForSuit;
    private getChakraForSuit;
    private getSolfeggioForSuit;
    private getColorForSuit;
    private getGeometryForSuit;
    private getPigmentForSuit;
    private getShemForSuit;
    private getGoetiaForSuit;
    private getSymbolForSuit;
    private setupCodexMirroring;
    private initializeFusionEngine;
    /**
     * Get a specific Arcana card
     */
    getCard(id: string): ArcanaCard | undefined;
    /**
     * Get all Arcana cards
     */
    getAllCards(): ArcanaCard[];
    /**
     * Get Major Arcana cards
     */
    getMajorArcana(): ArcanaCard[];
    /**
     * Get Minor Arcana cards
     */
    getMinorArcana(): ArcanaCard[];
    /**
     * Get cards by suit
     */
    getCardsBySuit(suit: ArcanaSuit): ArcanaCard[];
    /**
     * Search Arcana cards
     */
    searchCards(query: ArcanaSearchQuery): Promise<ArcanaSearchResult>;
    private generateFacets;
    /**
     * Create fusion kink session
     */
    createFusionSession(cardIds: string[], fusionType: string): FusionKinkSession;
    /**
     * Get fusion session
     */
    getFusionSession(id: string): FusionKinkSession | undefined;
    /**
     * Get all fusion sessions
     */
    getAllFusionSessions(): FusionKinkSession[];
    /**
     * Get analytics
     */
    getAnalytics(): ArcanaAnalytics;
    private calculateMirroredNodes;
    /**
     * Generate comprehensive report
     */
    generateReport(): string;
    private getMajorArcanaDistribution;
    private getMinorArcanaDistribution;
}
//# sourceMappingURL=LiberArcanae.d.ts.map