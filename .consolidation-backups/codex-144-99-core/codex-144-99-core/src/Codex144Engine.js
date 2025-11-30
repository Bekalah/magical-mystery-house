"use strict";
/**
 * Codex 144:99 Engine
 *
 * Complete integration of 144 Nodes and 99 Depths
 * Maps all nodes to gates, chapels, rooms, and consciousness levels
 *
 * @license CC0-1.0 - Public Domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codex144Engine = void 0;
var index_1 = require("../../sacred-mathematics-core/src/index");
var index_2 = require("../../fusion-kink-core/src/index");
var Codex144Security_1 = require("./Codex144Security");
// Trauma-aware: gentle, supportive, ESC exits, pause anytime
var Codex144Engine = /** @class */ (function () {
    function Codex144Engine() {
        this.nodes = new Map();
        this.depths = new Map();
        this.fusionKink = new index_2.FusionKinkDesignMathematics();
        this.security = new Codex144Security_1.Codex144Security();
        this.initializeNodes();
        this.initializeDepths();
    }
    Codex144Engine.prototype.initializeNodes = function () {
        // Initialize all 144 nodes
        for (var nodeIndex = 0; nodeIndex < 144; nodeIndex++) {
            var consciousnessLevel = nodeIndex % 22; // Map to 0-21
            var frequency = (0, index_1.consciousnessLevelToFrequency)(consciousnessLevel);
            // Calculate gate mappings
            var gateMapping = (0, index_1.nodeToGateMapping)(nodeIndex);
            // Calculate chapel mapping (direct 1:1 for folio)
            var chapelNumber = Math.floor(nodeIndex / 18) + 1;
            var folioNumber = nodeIndex;
            // Calculate room mapping
            var roomNumber = Math.round((nodeIndex * index_1.SACRED_MATH.CATHEDRAL_RATIO) % 99) + 1;
            // Get quality parameters from Fusion Kink
            var qualityParams = this.fusionKink.calculateQualityParameters(consciousnessLevel);
            var node = {
                nodeIndex: nodeIndex,
                name: this.generateNodeName(nodeIndex, consciousnessLevel),
                description: this.generateNodeDescription(nodeIndex, consciousnessLevel),
                consciousnessLevel: consciousnessLevel,
                frequency: frequency,
                gateMappings: {
                    primaryGate: gateMapping.primaryGate,
                    harmonicGate: gateMapping.harmonicGate,
                    spiralGate: gateMapping.spiralGate
                },
                chapelMapping: {
                    chapelNumber: chapelNumber,
                    folioNumber: folioNumber
                },
                roomMapping: {
                    roomNumber: roomNumber
                },
                qualityParameters: {
                    intensity: qualityParams.intensity,
                    sophistication: qualityParams.sophistication,
                    harmony_factor: qualityParams.harmony_factor,
                    emotional_resonance: qualityParams.emotional_resonance
                },
                correspondences: this.generateCorrespondences(nodeIndex, consciousnessLevel)
            };
            this.nodes.set(nodeIndex, node);
        }
    };
    Codex144Engine.prototype.generateNodeName = function (nodeIndex, consciousnessLevel) {
        var arcanaNames = [
            'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
            'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
            'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
            'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
        ];
        if (nodeIndex < 22) {
            return "".concat(arcanaNames[nodeIndex], " Node");
        }
        return "Node ".concat(nodeIndex, " (").concat(arcanaNames[consciousnessLevel], " Path)");
    };
    Codex144Engine.prototype.generateNodeDescription = function (nodeIndex, consciousnessLevel) {
        return "Codex Node ".concat(nodeIndex, " - Consciousness Level ").concat(consciousnessLevel, ". A manifestation point in the 144:99 lattice.");
    };
    Codex144Engine.prototype.generateCorrespondences = function (nodeIndex, consciousnessLevel) {
        return {
            arcana: consciousnessLevel,
            node: nodeIndex,
            frequency: (0, index_1.consciousnessLevelToFrequency)(consciousnessLevel),
            ratio: index_1.SACRED_MATH.CATHEDRAL_RATIO,
            phi: index_1.SACRED_MATH.PHI
        };
    };
    Codex144Engine.prototype.initializeDepths = function () {
        // Initialize all 99 depths
        for (var depthIndex = 0; depthIndex < 99; depthIndex++) {
            var consciousnessEvolution = Math.floor((depthIndex / 99) * 22);
            var dissolutionLevel = Math.floor(depthIndex / 10);
            // Calculate node connections (depths connect to multiple nodes)
            var nodeConnections = [];
            for (var i = 0; i < 144; i++) {
                var gateMapping = (0, index_1.nodeToGateMapping)(i);
                // Connect if this depth's gate number matches any gate mapping
                var depthGate = (depthIndex % 99) + 1;
                if (gateMapping.primaryGate === depthGate ||
                    gateMapping.harmonicGate === depthGate ||
                    gateMapping.spiralGate === depthGate) {
                    nodeConnections.push(i);
                }
            }
            // Limit connections
            var limitedNodeConnections = nodeConnections.slice(0, 11);
            // Calculate gate connections
            var gateConnections = [(depthIndex % 99) + 1];
            var depth = {
                depthIndex: depthIndex,
                name: "Depth ".concat(depthIndex + 1),
                description: "Dissolution depth ".concat(depthIndex + 1, " - Consciousness evolution level ").concat(consciousnessEvolution),
                consciousnessEvolution: consciousnessEvolution,
                dissolutionLevel: dissolutionLevel,
                nodeConnections: limitedNodeConnections,
                gateConnections: gateConnections,
                mathematicalProgression: {
                    ratio: index_1.SACRED_MATH.CATHEDRAL_RATIO,
                    frequency: (0, index_1.consciousnessLevelToFrequency)(consciousnessEvolution),
                    quality: dissolutionLevel
                }
            };
            this.depths.set(depthIndex, depth);
        }
    };
    /**
     * Get node by index (0-143)
     */
    Codex144Engine.prototype.getNode = function (nodeIndex) {
        return this.nodes.get(nodeIndex) || null;
    };
    /**
     * Get all nodes
     */
    Codex144Engine.prototype.getAllNodes = function () {
        return Array.from(this.nodes.values());
    };
    /**
     * Get nodes by consciousness level (0-21)
     */
    Codex144Engine.prototype.getNodesByConsciousnessLevel = function (level) {
        return Array.from(this.nodes.values()).filter(function (node) { return node.consciousnessLevel === level; });
    };
    /**
     * Get depth by index (0-98)
     */
    Codex144Engine.prototype.getDepth = function (depthIndex) {
        return this.depths.get(depthIndex) || null;
    };
    /**
     * Get all depths
     */
    Codex144Engine.prototype.getAllDepths = function () {
        return Array.from(this.depths.values());
    };
    /**
     * Get nodes connected to a gate
     */
    Codex144Engine.prototype.getNodesForGate = function (gateNumber) {
        var _this = this;
        var nodes = (0, index_1.gateToNodeMapping)(gateNumber);
        return nodes.map(function (nodeIndex) { return _this.nodes.get(nodeIndex); }).filter(function (node) { return node !== undefined; });
    };
    /**
     * Get nodes connected to a chapel
     */
    Codex144Engine.prototype.getNodesForChapel = function (chapelNumber) {
        var folioStart = (chapelNumber - 1) * 18;
        var folioEnd = folioStart + 18;
        return Array.from(this.nodes.values()).filter(function (node) {
            return node.nodeIndex >= folioStart && node.nodeIndex < folioEnd;
        });
    };
    /**
     * Get nodes connected to a room
     */
    Codex144Engine.prototype.getNodesForRoom = function (roomNumber) {
        return Array.from(this.nodes.values()).filter(function (node) {
            return node.roomMapping.roomNumber === roomNumber;
        });
    };
    return Codex144Engine;
}());
exports.Codex144Engine = Codex144Engine;
exports.default = Codex144Engine;
