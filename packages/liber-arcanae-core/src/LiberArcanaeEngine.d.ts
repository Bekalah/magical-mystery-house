/**
 * Liber Arcanae Codex Abyssiae
 *
 * Living tarot system extended to 144 nodes
 * 78 traditional cards + 66 bridge cards = 144 total
 *
 * @license CC0-1.0 - Public Domain
 */
export interface ArcanaCard {
    cardIndex: number;
    name: string;
    type: 'major' | 'minor' | 'bridge';
    suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
    number?: number;
    court?: 'page' | 'knight' | 'queen' | 'king';
    description: string;
    consciousnessLevel: number;
    frequency: number;
    nodeMapping: number;
    correspondences: ArcanaCorrespondences;
    pathworking: PathworkingPractice;
}
export interface ArcanaCorrespondences {
    planet?: string;
    zodiac?: string;
    element?: string;
    color?: string;
    geometry?: string;
    shemAngel?: string;
    goetiaDemon?: string;
    deity?: string;
    iChing?: string;
    soyga?: string;
    number?: number;
    suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
    court?: 'page' | 'knight' | 'queen' | 'king';
    type?: string;
    bridgeIndex?: number;
    ratio?: number;
    correspondences?: Record<string, any>;
}
export interface PathworkingPractice {
    meditation: string;
    integration: string;
    exercises: string[];
    correspondences: Record<string, any>;
}
export declare class LiberArcanaeEngine {
    private cards;
    private security;
    constructor();
    private initializeCards;
    private determineBridgeType;
    private generateMajorArcanaCorrespondences;
    private generateMinorArcanaCorrespondences;
    private generateCourtCardCorrespondences;
    private generateBridgeCorrespondences;
    private getColorForArcana;
    private getGeometryForArcana;
    private generateHierophantDescription;
    private generateHierophantCorrespondences;
    private generateHierophantPathworking;
    private generatePathworking;
    /**
     * Get card by index (0-143) with input validation
     */
    getCard(cardIndex: number): ArcanaCard | null;
    /**
     * Set card with security validation
     */
    setCard(card: ArcanaCard): boolean;
    /**
     * Sanitize string input
     * Available for future use when processing user input
     */
    /**
     * Get all cards
     */
    getAllCards(): ArcanaCard[];
    /**
     * Get Major Arcana cards (0-21)
     */
    getMajorArcana(): ArcanaCard[];
    /**
     * Get Minor Arcana cards (22-77)
     */
    getMinorArcana(): ArcanaCard[];
    /**
     * Get Bridge cards (78-143)
     */
    getBridgeCards(): ArcanaCard[];
    /**
     * Get cards by suit
     */
    getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): ArcanaCard[];
    /**
     * Get cards by consciousness level (0-21)
     */
    getCardsByConsciousnessLevel(level: number): ArcanaCard[];
}
export default LiberArcanaeEngine;
//# sourceMappingURL=LiberArcanaeEngine.d.ts.map