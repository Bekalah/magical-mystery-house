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
import { CodexLibrary } from './index';
import { getCardsByCodexNode } from '@cathedral/liber-arcanae/complete-tarot-system';
import { getChaptersByCodexNode } from '@cathedral/circuitum99/33-chapters';
import { getSoygaTable, getIChingHexagram, getShemAngel, getGoetiaDemon, getDeitiesByTradition } from './integrations';
/**
 * Perfect Codex 144:99 System
 *
 * Complete interconnection with all systems
 */
export class PerfectCodex {
    codex;
    constructor() {
        this.codex = new CodexLibrary();
    }
    /**
     * Get perfect node with all interconnections
     */
    getPerfectNode(nodeId) {
        const node = this.codex.getNode(nodeId);
        if (!node) {
            throw new Error(`Node ${nodeId} not found`);
        }
        // Get connected tarot cards
        const allCards = getCardsByCodexNode(nodeId);
        const majorCards = allCards.filter(c => c.type === 'major').map(c => c.id);
        const minorCards = allCards.filter(c => c.type === 'minor').map(c => c.id);
        // Get connected chapters
        const chapters = getChaptersByCodexNode(nodeId).map(ch => ch.number);
        // Calculate connected gates
        const gates = [];
        chapters.forEach(ch => {
            gates.push(ch); // Direct chapter-to-gate mapping (1-33)
        });
        // Add harmonic gates (34-66)
        if (node.harmonics) {
            node.harmonics.perfectConsonance?.forEach(harmonicNode => {
                const harmonicChapters = getChaptersByCodexNode(harmonicNode);
                harmonicChapters.forEach(ch => {
                    const harmonicGate = 33 + ch.number;
                    if (harmonicGate <= 66 && !gates.includes(harmonicGate)) {
                        gates.push(harmonicGate);
                    }
                });
            });
        }
        // Add spiral gates (67-99) based on node position
        const layer = Math.ceil(nodeId / 12);
        const spiralGate = 66 + ((layer - 1) % 33) + 1;
        if (spiralGate <= 99 && !gates.includes(spiralGate)) {
            gates.push(spiralGate);
        }
        // Get correspondences
        const soyga = getSoygaTable(node.element);
        const iChing = node.correspondences?.iChing ?
            getIChingHexagram(parseInt(node.correspondences.iChing)) : undefined;
        const shemAngel = node.shem ?
            getShemAngel(this.getShemAngelNumber(node.shem)) : undefined;
        const goetiaDemon = node.goetia ?
            getGoetiaDemon(this.getGoetiaDemonNumber(node.goetia)) : undefined;
        const deities = getDeitiesByTradition('all').filter((d) => d.connections?.includes(nodeId));
        // Get harmonic connections
        const harmonic = node.harmonics?.perfectConsonance || [];
        const dissonant = node.harmonics?.dissonance || [];
        const tritone = node.harmonics?.tritone || [];
        return {
            id: nodeId,
            node,
            tarot: {
                major: majorCards,
                minor: minorCards,
                all: allCards.map(c => c.id)
            },
            circuitum: {
                chapters,
                gates: [...new Set(gates)].sort((a, b) => a - b)
            },
            correspondences: {
                soyga,
                iChing,
                shemAngel,
                goetiaDemon,
                deities
            },
            connections: {
                harmonic,
                dissonant,
                tritone
            }
        };
    }
    /**
     * Get all perfect nodes
     */
    getAllPerfectNodes() {
        const nodes = [];
        for (let i = 1; i <= 144; i++) {
            try {
                nodes.push(this.getPerfectNode(i));
            }
            catch (error) {
                // console.warn(`Node ${i} not available:`, error);
            }
        }
        return nodes;
    }
    /**
     * Parse Shem angel number
     */
    getShemAngelNumber(shem) {
        if (typeof shem === 'number')
            return shem;
        const match = String(shem).match(/\d+/);
        return match ? parseInt(match[0]) : 1;
    }
    /**
     * Parse Goetia demon number
     */
    getGoetiaDemonNumber(goetia) {
        if (typeof goetia === 'number')
            return goetia;
        const match = String(goetia).match(/\d+/);
        return match ? parseInt(match[0]) : 1;
    }
}
//# sourceMappingURL=complete-codex.js.map