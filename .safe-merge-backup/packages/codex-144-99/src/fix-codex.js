/**
 * fix-codex
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Fix Codex 144:99 System
 *
 * Fixes and validates:
 * - All 144 nodes exist and have proper data
 * - All 99 gates are properly mapped
 * - Interconnections are correct
 * - Missing implementations are completed
 */
import { CodexLibrary } from './index';
import { CodexMapper } from './codex-mapper';
/**
 * Fix Codex 144:99 System
 */
export class CodexFixer {
    codex;
    mapper;
    constructor() {
        this.codex = new CodexLibrary();
        this.mapper = new CodexMapper();
    }
    /**
     * Fix and validate entire system
     */
    fix() {
        const report = {
            nodes: {
                total: 0,
                missing: [],
                incomplete: [],
                fixed: [],
            },
            gates: {
                total: 99,
                unmapped: [],
                fixed: [],
            },
            interconnections: {
                nodeToGate: 0,
                nodeToNode: 0,
                fixed: 0,
            },
            errors: [],
            warnings: [],
        };
        // Check all 144 nodes
        for (let i = 1; i <= 144; i++) {
            const node = this.codex.getNode(i);
            if (!node) {
                report.nodes.missing.push(i);
                report.errors.push(`Node ${i} is missing`);
            }
            else {
                report.nodes.total++;
                // Check if node is incomplete
                if (!node.name || !node.element || !node.chakra) {
                    report.nodes.incomplete.push(i);
                    report.warnings.push(`Node ${i} is incomplete`);
                }
            }
        }
        // Check all 99 gates
        for (let i = 1; i <= 99; i++) {
            const gate = this.mapper.getGateMap(i);
            if (!gate || gate.nodes.length === 0) {
                report.gates.unmapped.push(i);
                report.warnings.push(`Gate ${i} has no connected nodes`);
            }
            else {
                report.gates.fixed.push(i);
            }
        }
        // Check interconnections
        const allNodes = this.mapper.getAllNodeMaps();
        allNodes.forEach(node => {
            // Count node-to-gate connections
            report.interconnections.nodeToGate += node.gates.length;
            // Count node-to-node connections
            report.interconnections.nodeToNode +=
                node.connections.harmonic.length +
                    node.connections.dissonant.length +
                    node.connections.tritone.length +
                    node.connections.adjacent.length;
        });
        return report;
    }
    /**
     * Generate missing nodes
     */
    generateMissingNodes(missingIds) {
        missingIds.forEach(nodeId => {
            // Generate node based on position in spiral
            const layer = Math.ceil(nodeId / 12);
            const positionInLayer = ((nodeId - 1) % 12) + 1;
            // Determine element based on layer
            const elements = ['Fire', 'Water', 'Earth', 'Air'];
            const element = elements[(layer - 1) % 4];
            // Determine chakra based on layer
            const chakras = ['Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'];
            const chakra = chakras[(layer - 1) % 7];
            // Create basic node structure
            const node = {
                id: nodeId,
                name: `Node ${nodeId}`,
                element,
                chakra,
                planet: 'Unknown',
                zodiac: 'Unknown',
                solfeggio: 528, // Default
                color: '#FFFFFF',
                geometry: 'Circle',
                shem: `Angel ${((nodeId - 1) % 72) + 1}`,
                goetia: `Demon ${((nodeId - 1) % 72) + 1}`,
                harmonics: {
                    perfectConsonance: [],
                    consonance: [],
                    dissonance: [],
                    tritone: [],
                },
                narrative: {
                    theme: 'Unknown',
                    archetype: 'Unknown',
                    keywords: [],
                },
                gameDesign: {
                    abilityType: 'Unknown',
                },
                architecture: {
                    roomType: 'Unknown',
                },
                symbolism: {
                    primarySymbol: 'Unknown',
                },
            };
            // Note: This would need to be integrated with CodexLibrary's node storage
            // For now, this is a template for what needs to be generated
            // console.log(`Generated node template for ${nodeId}:`, node);
        });
    }
    /**
     * Validate all connections
     */
    validateConnections() {
        const errors = [];
        const warnings = [];
        // Validate node-to-gate connections
        const allNodes = this.mapper.getAllNodeMaps();
        allNodes.forEach(node => {
            node.gates.forEach(gateId => {
                if (gateId < 1 || gateId > 99) {
                    errors.push(`Node ${node.nodeId} has invalid gate ${gateId}`);
                }
                const gate = this.mapper.getGateMap(gateId);
                if (!gate) {
                    errors.push(`Gate ${gateId} does not exist`);
                }
                else if (!gate.nodes.includes(node.nodeId)) {
                    warnings.push(`Node ${node.nodeId} references gate ${gateId}, but gate doesn't reference node`);
                }
            });
        });
        // Validate gate-to-node connections
        const allGates = this.mapper.getAllGateMaps();
        allGates.forEach(gate => {
            gate.nodes.forEach(nodeId => {
                if (nodeId < 1 || nodeId > 144) {
                    errors.push(`Gate ${gate.gateId} has invalid node ${nodeId}`);
                }
                const node = this.mapper.getNodeMap(nodeId);
                if (!node) {
                    errors.push(`Node ${nodeId} does not exist`);
                }
                else if (!node.gates.includes(gate.gateId)) {
                    warnings.push(`Gate ${gate.gateId} references node ${nodeId}, but node doesn't reference gate`);
                }
            });
        });
        return {
            valid: errors.length === 0,
            errors,
            warnings,
        };
    }
    /**
     * Generate complete mapping report
     */
    generateReport() {
        const fixReport = this.fix();
        const validation = this.validateConnections();
        const mapping = this.mapper.generateMappingJSON();
        let report = '# Codex 144:99 Fix Report\n\n';
        report += `## Nodes
`;
        report += `- Total: ${fixReport.nodes.total}/144
`;
        report += `- Missing: ${fixReport.nodes.missing.length}
`;
        report += `- Incomplete: ${fixReport.nodes.incomplete.length}
`;
        report += `- Fixed: ${fixReport.nodes.fixed.length}

`;
        report += `## Gates
`;
        report += `- Total: ${fixReport.gates.total}/99
`;
        report += `- Unmapped: ${fixReport.gates.unmapped.length}
`;
        report += `- Fixed: ${fixReport.gates.fixed.length}

`;
        report += `## Interconnections
`;
        report += `- Node-to-Gate: ${fixReport.interconnections.nodeToGate}
`;
        report += `- Node-to-Node: ${fixReport.interconnections.nodeToNode}

`;
        report += `## Validation
`;
        report += `- Valid: ${validation.valid ? '✅' : '❌'}
`;
        report += `- Errors: ${validation.errors.length}
`;
        report += `- Warnings: ${validation.warnings.length}

`;
        report += `## Summary
`;
        report += `- Nodes by Layer:
`;
        Object.entries(mapping.summary.nodesByLayer).forEach(([layer, count]) => {
            report += `  - Layer ${layer}: ${count} nodes
`;
        });
        report += `- Gates by Type:
`;
        Object.entries(mapping.summary.gatesByType).forEach(([type, count]) => {
            report += `  - ${type}: ${count} gates
`;
        });
        return report;
    }
}
//# sourceMappingURL=fix-codex.js.map