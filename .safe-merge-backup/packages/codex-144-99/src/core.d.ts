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