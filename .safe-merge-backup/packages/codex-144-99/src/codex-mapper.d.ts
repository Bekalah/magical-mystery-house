/**
 * codex-mapper
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Complete Mapping System
 *
 * Comprehensive mapping of:
 * - All 144 nodes with complete data
 * - All 99 gates with proper connections
 * - Spiral positioning and sacred geometry
 * - Interconnections with all systems
 */
export interface CodexNodeMap {
    nodeId: number;
    name: string;
    position: {
        spiral: number;
        layer: number;
        angle: number;
        radius: number;
    };
    element: string;
    chakra: string;
    planet: string;
    zodiac: string;
    gates: number[];
    connections: {
        harmonic: number[];
        dissonant: number[];
        tritone: number[];
        adjacent: number[];
    };
    correspondences: {
        shemAngel?: number;
        goetiaDemon?: number;
        iChing?: number;
        soyga?: string;
    };
}
export interface GateMap {
    gateId: number;
    name: string;
    nodes: number[];
    chapter?: number;
    type: 'primary' | 'harmonic' | 'dissonant' | 'tritone' | 'spiral';
    position: {
        layer: number;
        angle: number;
        radius: number;
    };
}
/**
 * Complete Codex 144:99 Mapper
 *
 * Generates comprehensive maps of all nodes and gates
 */
export declare class CodexMapper {
    private codex;
    private nodeMaps;
    private gateMaps;
    constructor();
    /**
     * Generate complete maps of all nodes and gates
     */
    private generateMaps;
    /**
     * Create node map with spiral positioning
     */
    private createNodeMap;
    /**
     * Calculate gates for a node
     *
     * Gates 1-99 are distributed:
     * - Gates 1-33: Direct chapter mapping (Circuitum99)
     * - Gates 34-66: Harmonic gates (based on node harmonics)
     * - Gates 67-99: Spiral gates (based on spiral position)
     */
    private calculateGatesForNode;
    /**
     * Create gate map
     */
    private createGateMap;
    /**
     * Get gate name
     */
    private getGateName;
    /**
     * Parse Shem angel number from string
     */
    private parseShemNumber;
    /**
     * Parse Goetia demon number from string
     */
    private parseGoetiaNumber;
    /**
     * Get node map
     */
    getNodeMap(nodeId: number): CodexNodeMap | undefined;
    /**
     * Get gate map
     */
    getGateMap(gateId: number): GateMap | undefined;
    /**
     * Get all node maps
     */
    getAllNodeMaps(): CodexNodeMap[];
    /**
     * Get all gate maps
     */
    getAllGateMaps(): GateMap[];
    /**
     * Get nodes by layer
     */
    getNodesByLayer(layer: number): CodexNodeMap[];
    /**
     * Get gates by type
     */
    getGatesByType(type: GateMap['type']): GateMap[];
    /**
     * Get nodes connected to a gate
     */
    getNodesForGate(gateId: number): CodexNodeMap[];
    /**
     * Get gates for a node
     */
    getGatesForNode(nodeId: number): GateMap[];
    /**
     * Generate complete mapping JSON
     */
    generateMappingJSON(): {
        nodes: CodexNodeMap[];
        gates: GateMap[];
        summary: {
            totalNodes: number;
            totalGates: number;
            nodesByLayer: Record<number, number>;
            gatesByType: Record<string, number>;
        };
    };
}
//# sourceMappingURL=codex-mapper.d.ts.map