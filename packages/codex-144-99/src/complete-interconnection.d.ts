/**
 * complete-interconnection
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Complete Interconnection System
 *
 * Perfect interconnection with:
 * - Liber Arcanae (78 cards)
 * - Circuitum99 (33 chapters, 99 gates)
 * - All correspondences (Soyga, I Ching, 72 Shem Angels/Demons, Deities)
 * - Real canon and real creative aspects
 *
 * Never flat - always flowing, trauma-informed design.
 */
/**
 * ⚗️ CompleteNodeInterconnection - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface CompleteNodeInterconnection {
    nodeId: number;
    node: any;
    tarotCards: string[];
    chapters: number[];
    gates: number[];
    soyga?: any;
    iChing?: any;
    shemAngel?: any;
    goetiaDemon?: any;
    deities?: any[];
    connections: {
        toNodes: number[];
        toCards: string[];
        toChapters: number[];
    };
}
/**
 * Complete Interconnection System
 *
 * Perfects Codex 144:99 with full interconnections
 */
export declare class CompleteInterconnection {
    private codex;
    constructor();
    /**
     * Get complete interconnection for a node
     */
    getNodeInterconnection(nodeId: number): CompleteNodeInterconnection;
    /**
     * Get complete interconnection for a tarot card
     */
    getCardInterconnection(cardId: string): any;
    /**
     * Get complete interconnection for a chapter
     */
    getChapterInterconnection(chapterId: string): any;
    /**
     * Helper: Get Shem Angel number from name
     */
    private getShemAngelNumber;
    /**
     * Helper: Get Goetia Demon number from name
     */
    private getGoetiaDemonNumber;
}
export declare const completeInterconnection: CompleteInterconnection;
//# sourceMappingURL=complete-interconnection.d.ts.map