/**
 * Functional Codex Engine
 *
 * A REAL, WORKING engine that anyone can use - especially people with:
 * - Chronic PTSD
 * - Extreme neurodivergence
 * - High creativity
 *
 * This is the OPPOSITE of shitty school experiences.
 * It's functional, fun, playful, real, deep, and intricate.
 *
 * @package @cathedral/codex-144-99
 */
/**
 * ⚗️ CodexNode - The Principle
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
export interface CodexNode {
    id: number;
    name: string;
    element: string;
    planet?: string;
    zodiac?: string;
    chakra?: string;
    solfeggio?: number;
    color: string;
    geometry?: string;
    pigment?: string;
    shem?: string;
    goetia?: string;
    narrative?: {
        theme: string;
        archetype: string;
        storyBeats: string[];
        dialogueStyle: string;
        keywords: string[];
    };
    gameDesign?: {
        abilityType: string;
        mechanics: string[];
        questType: string;
        rewardStyle: string;
        enemyAffinity?: string;
        environmentEffect?: string;
    };
}
/**
 * ⚗️ CodexQuery - The Principle
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
export interface CodexQuery {
    element?: string;
    planet?: string;
    zodiac?: string;
    chakra?: string;
    solfeggio?: number;
    geometry?: string;
    keyword?: string;
    theme?: string;
}
/**
 * ⚗️ CodexExploration - The Principle
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
export interface CodexExploration {
    currentNode: CodexNode;
    connectedNodes: CodexNode[];
    connections: {
        harmonic: CodexNode[];
        dissonant: CodexNode[];
        related: CodexNode[];
    };
    suggestions: {
        explore: CodexNode[];
        create: string[];
        learn: string[];
    };
}
/**
 * Functional Codex Engine
 *
 * A real, working system for exploring the Codex 144:99
 */
export declare class FunctionalCodexEngine {
    private nodes;
    private currentExploration;
    private explorationHistory;
    constructor();
    /**
     * Get a node by ID
     * Simple, direct, works
     */
    getNode(id: number): CodexNode | null;
    /**
     * Search nodes by any property
     * Flexible, forgiving search
     */
    searchNodes(query: CodexQuery): CodexNode[];
    /**
     * Explore a node - the main interactive function
     * Returns everything you need to know and do with this node
     */
    exploreNode(nodeId: number): CodexExploration;
    /**
     * Find harmonic nodes (nodes that resonate well together)
     */
    private findHarmonicNodes;
    /**
     * Find dissonant nodes (nodes that create tension - useful for growth)
     */
    private findDissonantNodes;
    /**
     * Find related nodes (by theme, keyword, or narrative)
     */
    private findRelatedNodes;
    /**
     * Suggest nodes to explore next
     */
    private suggestNodesToExplore;
    /**
     * Suggest creative actions based on the node
     */
    private suggestCreativeActions;
    /**
     * Suggest learning paths
     */
    private suggestLearningPaths;
    /**
     * Get random node - for discovery and play
     */
    getRandomNode(): CodexNode;
    /**
     * Get exploration history
     */
    getHistory(): CodexNode[];
    /**
     * Clear exploration history
     */
    clearHistory(): void;
    /**
     * Get current exploration
     */
    getCurrentExploration(): CodexExploration | null;
    /**
     * Get all nodes
     */
    getAllNodes(): CodexNode[];
    /**
     * Get nodes by element
     */
    getNodesByElement(element: string): CodexNode[];
    /**
     * Get nodes by chakra
     */
    getNodesByChakra(chakra: string): CodexNode[];
    /**
     * Get nodes by geometry
     */
    getNodesByGeometry(geometry: string): CodexNode[];
}
export declare const codexEngine: FunctionalCodexEngine;
export default codexEngine;
//# sourceMappingURL=functional-codex-engine.d.ts.map