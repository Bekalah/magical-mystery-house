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
import { getCard, getCardsByCodexNode } from '@cathedral/liber-arcanae/complete-tarot-system';
import { getChapter, getChaptersByCodexNode } from '@cathedral/circuitum99/33-chapters';
import { getSoygaTable, getIChingHexagram, getShemAngel, getGoetiaDemon, getDeitiesByTradition } from './integrations';

/**
 * ⚗️ PerfectCodexNode - The Principle
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
export interface PerfectCodexNode {
  id: number;
  node: any; // Full CodexNode
  tarot: {
    major: string[]; // Connected Major Arcana
    minor: string[]; // Connected Minor Arcana
    all: string[]; // All connected cards
  };
  circuitum: {
    chapters: number[]; // Connected chapters (1-33)
    gates: number[]; // Connected gates (1-99)
  };
  correspondences: {
    soyga?: any;
    iChing?: any;
    shemAngel?: any;
    goetiaDemon?: any;
    deities?: any[];
  };
  connections: {
    harmonic: number[]; // Harmonic nodes
    dissonant: number[]; // Dissonant nodes
    tritone: number[]; // Tritone nodes
  };
}

/**
 * Perfect Codex 144:99 System
 * 
 * Complete interconnection with all systems
 */
/**
 * ⚗️ PerfectCodex - The Crucible
 * 
 * In the alchemical tradition, this class serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this class
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Crucible
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export class PerfectCodex {
  private codex: CodexLibrary;

  constructor() {
    this.codex = new CodexLibrary();
  }

  /**
   * Get perfect node with all interconnections
   */
  getPerfectNode(nodeId: number): PerfectCodexNode {
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
    const gates: number[] = [];
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
    const deities = getDeitiesByTradition('all').filter((d: any) => 
      d.connections?.includes(nodeId)
    );

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
  getAllPerfectNodes(): PerfectCodexNode[] {
    const nodes: PerfectCodexNode[] = [];
    for (let i = 1; i <= 144; i++) {
      try {
        nodes.push(this.getPerfectNode(i));
      } catch (error) {
// console.warn(`Node ${i} not available:`, error);
      }
    }
    return nodes;
  }

  /**
   * Parse Shem angel number
   */
  private getShemAngelNumber(shem: string | number): number {
    if (typeof shem === 'number') return shem;
    const match = String(shem).match(/\d+/);
    return match ? parseInt(match[0]) : 1;
  }

  /**
   * Parse Goetia demon number
   */
  private getGoetiaDemonNumber(goetia: string | number): number {
    if (typeof goetia === 'number') return goetia;
    const match = String(goetia).match(/\d+/);
    return match ? parseInt(match[0]) : 1;
  }
}
