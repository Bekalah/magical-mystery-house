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
import { CodexLibrary } from './index';
/**
 * Complete Codex 144:99 Mapper
 *
 * Generates comprehensive maps of all nodes and gates
 */
export class CodexMapper {
    codex;
    nodeMaps = new Map();
    gateMaps = new Map();
    constructor() {
        this.codex = new CodexLibrary();
        this.generateMaps();
    }
    /**
     * Generate complete maps of all nodes and gates
     */
    generateMaps() {
        // Generate all 144 node maps
        for (let i = 1; i <= 144; i++) {
            const node = this.codex.getNode(i);
            if (node) {
                this.nodeMaps.set(i, this.createNodeMap(i, node));
            }
        }
        // Generate all 99 gate maps
        for (let i = 1; i <= 99; i++) {
            this.gateMaps.set(i, this.createGateMap(i));
        }
    }
    /**
     * Create node map with spiral positioning
     */
    createNodeMap(nodeId, node) {
        // Calculate spiral position
        const layer = Math.ceil(nodeId / 12); // 12 nodes per layer
        const positionInLayer = ((nodeId - 1) % 12) + 1;
        const angle = (positionInLayer - 1) * 30; // 30 degrees per node in layer
        const radius = layer * 10; // Increasing radius per layer
        // Calculate connected gates
        const gates = this.calculateGatesForNode(nodeId, layer);
        // Get harmonic connections
        const harmonics = node.harmonics || {};
        const harmonic = harmonics.perfectConsonance || [];
        const dissonant = harmonics.dissonance || [];
        const tritone = harmonics.tritone || [];
        // Calculate adjacent nodes (spiral neighbors)
        const adjacent = [];
        if (nodeId > 1)
            adjacent.push(nodeId - 1);
        if (nodeId < 144)
            adjacent.push(nodeId + 1);
        // Add layer neighbors
        if (positionInLayer > 1) {
            const prevInLayer = nodeId - 1;
            if (prevInLayer > 0)
                adjacent.push(prevInLayer);
        }
        if (positionInLayer < 12) {
            const nextInLayer = nodeId + 1;
            if (nextInLayer <= 144)
                adjacent.push(nextInLayer);
        }
        return {
            nodeId,
            name: node.name || `Node ${nodeId}`,
            position: {
                spiral: nodeId,
                layer,
                angle,
                radius,
            },
            element: node.element || 'Unknown',
            chakra: node.chakra || 'Unknown',
            planet: node.planet || 'Unknown',
            zodiac: node.zodiac || 'Unknown',
            gates,
            connections: {
                harmonic,
                dissonant,
                tritone,
                adjacent: [...new Set(adjacent)], // Remove duplicates
            },
            correspondences: {
                shemAngel: node.shem ? this.parseShemNumber(node.shem) : undefined,
                goetiaDemon: node.goetia ? this.parseGoetiaNumber(node.goetia) : undefined,
                iChing: node.correspondences?.iChing ? parseInt(node.correspondences.iChing) : undefined,
                soyga: node.correspondences?.soyga,
            },
        };
    }
    /**
     * Calculate gates for a node
     *
     * Gates 1-99 are distributed:
     * - Gates 1-33: Direct chapter mapping (Circuitum99)
     * - Gates 34-66: Harmonic gates (based on node harmonics)
     * - Gates 67-99: Spiral gates (based on spiral position)
     */
    calculateGatesForNode(nodeId, layer) {
        const gates = [];
        // Primary gates (1-33): Direct mapping based on node position
        // Each node connects to gates based on its position in the spiral
        const primaryGate = ((nodeId - 1) % 33) + 1;
        gates.push(primaryGate);
        // Harmonic gates (34-66): Based on node harmonics
        const node = this.codex.getNode(nodeId);
        if (node?.harmonics?.perfectConsonance) {
            node.harmonics.perfectConsonance.forEach((harmonicNode) => {
                const harmonicGate = 33 + ((harmonicNode - 1) % 33) + 1;
                if (harmonicGate <= 66 && !gates.includes(harmonicGate)) {
                    gates.push(harmonicGate);
                }
            });
        }
        // Spiral gates (67-99): Based on spiral layer and position
        const spiralGate = 66 + ((layer - 1) % 33) + 1;
        if (spiralGate <= 99 && !gates.includes(spiralGate)) {
            gates.push(spiralGate);
        }
        // Additional gates based on node relationships
        if (node?.harmonics?.consonance) {
            node.harmonics.consonance.forEach((consonantNode) => {
                const consonantGate = 33 + ((consonantNode - 1) % 33) + 1;
                if (consonantGate <= 66 && !gates.includes(consonantGate)) {
                    gates.push(consonantGate);
                }
            });
        }
        return [...new Set(gates)].sort((a, b) => a - b);
    }
    /**
     * Create gate map
     */
    createGateMap(gateId) {
        // Determine gate type
        let type = 'primary';
        let chapter;
        if (gateId <= 33) {
            type = 'primary';
            chapter = gateId; // Direct chapter mapping
        }
        else if (gateId <= 66) {
            type = 'harmonic';
        }
        else {
            type = 'spiral';
        }
        // Calculate gate position
        const gateLayer = Math.ceil(gateId / 11); // 11 gates per layer (approximately)
        const positionInLayer = ((gateId - 1) % 11) + 1;
        const angle = (positionInLayer - 1) * (360 / 11);
        const radius = gateLayer * 8;
        // Find connected nodes
        const nodes = [];
        this.nodeMaps.forEach((nodeMap, nodeId) => {
            if (nodeMap.gates.includes(gateId)) {
                nodes.push(nodeId);
            }
        });
        return {
            gateId,
            name: this.getGateName(gateId, type, chapter),
            nodes,
            chapter,
            type,
            position: {
                layer: gateLayer,
                angle,
                radius,
            },
        };
    }
    /**
     * Get gate name
     */
    getGateName(gateId, type, chapter) {
        if (chapter) {
            return `Gate ${gateId} (Chapter ${chapter})`;
        }
        if (type === 'harmonic') {
            return `Harmonic Gate ${gateId}`;
        }
        if (type === 'spiral') {
            return `Spiral Gate ${gateId}`;
        }
        return `Gate ${gateId}`;
    }
    /**
     * Parse Shem angel number from string
     */
    parseShemNumber(shem) {
        const match = shem.match(/\d+/);
        return match ? parseInt(match[0]) : undefined;
    }
    /**
     * Parse Goetia demon number from string
     */
    parseGoetiaNumber(goetia) {
        const match = goetia.match(/\d+/);
        return match ? parseInt(match[0]) : undefined;
    }
    /**
     * Get node map
     */
    getNodeMap(nodeId) {
        return this.nodeMaps.get(nodeId);
    }
    /**
     * Get gate map
     */
    getGateMap(gateId) {
        return this.gateMaps.get(gateId);
    }
    /**
     * Get all node maps
     */
    getAllNodeMaps() {
        return Array.from(this.nodeMaps.values()).sort((a, b) => a.nodeId - b.nodeId);
    }
    /**
     * Get all gate maps
     */
    getAllGateMaps() {
        return Array.from(this.gateMaps.values()).sort((a, b) => a.gateId - b.gateId);
    }
    /**
     * Get nodes by layer
     */
    getNodesByLayer(layer) {
        return Array.from(this.nodeMaps.values()).filter(n => n.position.layer === layer);
    }
    /**
     * Get gates by type
     */
    getGatesByType(type) {
        return Array.from(this.gateMaps.values()).filter(g => g.type === type);
    }
    /**
     * Get nodes connected to a gate
     */
    getNodesForGate(gateId) {
        const gate = this.gateMaps.get(gateId);
        if (!gate)
            return [];
        return gate.nodes.map(nodeId => this.nodeMaps.get(nodeId)).filter(Boolean);
    }
    /**
     * Get gates for a node
     */
    getGatesForNode(nodeId) {
        const node = this.nodeMaps.get(nodeId);
        if (!node)
            return [];
        return node.gates.map(gateId => this.gateMaps.get(gateId)).filter(Boolean);
    }
    /**
     * Generate complete mapping JSON
     */
    generateMappingJSON() {
        const nodes = this.getAllNodeMaps();
        const gates = this.getAllGateMaps();
        // Calculate summary
        const nodesByLayer = {};
        nodes.forEach(node => {
            nodesByLayer[node.position.layer] = (nodesByLayer[node.position.layer] || 0) + 1;
        });
        const gatesByType = {};
        gates.forEach(gate => {
            gatesByType[gate.type] = (gatesByType[gate.type] || 0) + 1;
        });
        return {
            nodes,
            gates,
            summary: {
                totalNodes: nodes.length,
                totalGates: gates.length,
                nodesByLayer,
                gatesByType,
            },
        };
    }
}
//# sourceMappingURL=codex-mapper.js.map