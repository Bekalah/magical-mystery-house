/**
 * complete-codex
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 - Complete Perfect System
 *
 * Fully perfected with:
 * - All 144 nodes complete
 * - Interconnected with Liber Arcanae (78 cards)
 * - Interconnected with Circuitum99 (33 chapters)
 * - All correspondences (Soyga, I Ching, 72 Shem Angels/Demons, Deities)
 * - Real canon and real creative aspects
 *
 * Never flat - always flowing, trauma-informed design.
 */
export interface PerfectCodexNode {
    id: number;
    node: any;
    tarot: {
        major: string[];
        minor: string[];
        all: string[];
    };
    circuitum: {
        chapters: number[];
        gates: number[];
    };
    correspondences: {
        soyga?: any;
        iChing?: any;
        shemAngel?: any;
        goetiaDemon?: any;
        deities?: any[];
    };
    connections: {
        harmonic: number[];
        dissonant: number[];
        tritone: number[];
    };
}
/**
 * Perfect Codex 144:99 System
 *
 * Complete interconnection with all systems
 */
export declare class PerfectCodex {
    private codex;
    constructor();
    /**
     * Get perfect node with all interconnections
     */
    getPerfectNode(nodeId: number): PerfectCodexNode;
    /**
     * Get all perfect nodes
     */
    getAllPerfectNodes(): PerfectCodexNode[];
    /**
     * Parse Shem angel number
     */
    private getShemAngelNumber;
    /**
     * Parse Goetia demon number
     */
    private getGoetiaDemonNumber;
}
//# sourceMappingURL=complete-codex.d.ts.map