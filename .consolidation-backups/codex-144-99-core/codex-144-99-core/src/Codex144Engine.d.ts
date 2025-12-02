/**
 * Codex 144:99 Engine
 *
 * Complete integration of 144 Nodes and 99 Depths
 * Maps all nodes to gates, chapels, rooms, and consciousness levels
 *
 * @license CC0-1.0 - Public Domain
 */
export interface CodexNode {
    nodeIndex: number;
    name: string;
    description: string;
    consciousnessLevel: number;
    frequency: number;
    gateMappings: {
        primaryGate: number;
        harmonicGate: number;
        spiralGate: number;
    };
    chapelMapping: {
        chapelNumber: number;
        folioNumber: number;
    };
    roomMapping: {
        roomNumber: number;
    };
    qualityParameters: {
        intensity: number;
        sophistication: number;
        harmony_factor: number;
        emotional_resonance: number;
    };
    correspondences: Record<string, any>;
}
export interface CodexDepth {
    depthIndex: number;
    name: string;
    description: string;
    consciousnessEvolution: number;
    dissolutionLevel: number;
    nodeConnections: number[];
    gateConnections: number[];
    mathematicalProgression: {
        ratio: number;
        frequency: number;
        quality: number;
    };
}
export declare class Codex144Engine {
    private nodes;
    private depths;
    private fusionKink;
    constructor();
    private initializeNodes;
    private generateNodeName;
    private generateNodeDescription;
    private generateCorrespondences;
    private initializeDepths;
    /**
     * Get node by index (0-143)
     */
    getNode(nodeIndex: number): CodexNode | null;
    /**
     * Get all nodes
     */
    getAllNodes(): CodexNode[];
    /**
     * Get nodes by consciousness level (0-21)
     */
    getNodesByConsciousnessLevel(level: number): CodexNode[];
    /**
     * Get depth by index (0-98)
     */
    getDepth(depthIndex: number): CodexDepth | null;
    /**
     * Get all depths
     */
    getAllDepths(): CodexDepth[];
    /**
     * Get nodes connected to a gate
     */
    getNodesForGate(gateNumber: number): CodexNode[];
    /**
     * Get nodes connected to a chapel
     */
    getNodesForChapel(chapelNumber: number): CodexNode[];
    /**
     * Get nodes connected to a room
     */
    getNodesForRoom(roomNumber: number): CodexNode[];
}
export default Codex144Engine;
//# sourceMappingURL=Codex144Engine.d.ts.map