/**
 * core
 *
 * @package @cathedral/codex-144-99
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate codex node generation
 *
 * Creative use: Game apps, codex apps, knowledge apps, visual apps
 */
/**
 * ⚗️ SpiralConfig - The Principle
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
export type SpiralConfig = {
    seed?: string;
    depth?: number;
    ratio?: number;
};
export declare class SpiralEngine {
    config: SpiralConfig;
    constructor(cfg?: SpiralConfig);
    describe(): string;
    generateNode(index?: number): {
        id: string;
        archetype: string;
        position: {
            x: number;
            y: number;
            z: number;
        };
        connections: number[];
        correspondences: string[];
        quality: "perfect";
    };
    /**
     * Generate sophisticated correspondences for node
     * Enhanced with real correspondences from Codex 144:99
     */
    private generateCorrespondences;
    private calculateConnections;
    private fibonacci;
}
//# sourceMappingURL=core.d.ts.map