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

import codexData from '../../data/codex-144-expanded.json';

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
/**
 * ⚗️ FunctionalCodexEngine - The Crucible
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
export class FunctionalCodexEngine {
  private nodes: CodexNode[];
  private currentExploration: CodexExploration | null = null;
  private explorationHistory: number[] = [];

  constructor() {
    this.nodes = codexData.nodes as CodexNode[];
  }

  /**
   * Get a node by ID
   * Simple, direct, works
   */
  getNode(id: number): CodexNode | null {
    const node = this.nodes.find(n => n.id === id);
    if (!node) {
      return null;
    }
    return node;
  }

  /**
   * Search nodes by any property
   * Flexible, forgiving search
   */
  searchNodes(query: CodexQuery): CodexNode[] {
    return this.nodes.filter(node => {
      if (query.element && node.element !== query.element) return false;
      if (query.planet && node.planet !== query.planet) return false;
      if (query.zodiac && node.zodiac !== query.zodiac) return false;
      if (query.chakra && node.chakra !== query.chakra) return false;
      if (query.solfeggio && node.solfeggio !== query.solfeggio) return false;
      if (query.geometry && node.geometry !== query.geometry) return false;
      if (query.keyword) {
        const keywords = node.narrative?.keywords || [];
        if (!keywords.some(k => k.toLowerCase().includes(query.keyword!.toLowerCase()))) {
          return false;
        }
      }
      if (query.theme) {
        const theme = node.narrative?.theme || '';
        if (!theme.toLowerCase().includes(query.theme.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Explore a node - the main interactive function
   * Returns everything you need to know and do with this node
   */
  exploreNode(nodeId: number): CodexExploration {
    const node = this.getNode(nodeId);
    if (!node) {
      throw new Error(`Node ${nodeId} not found. Try a number between 1 and 144.`);
    }

    // Find connected nodes
    const harmonic = this.findHarmonicNodes(node);
    const dissonant = this.findDissonantNodes(node);
    const related = this.findRelatedNodes(node);

    // Generate suggestions
    const explore = this.suggestNodesToExplore(node, harmonic, related);
    const create = this.suggestCreativeActions(node);
    const learn = this.suggestLearningPaths(node);

    const exploration: CodexExploration = {
      currentNode: node,
      connectedNodes: [...harmonic, ...dissonant, ...related],
      connections: {
        harmonic,
        dissonant,
        related
      },
      suggestions: {
        explore,
        create,
        learn
      }
    };

    this.currentExploration = exploration;
    if (!this.explorationHistory.includes(nodeId)) {
      this.explorationHistory.push(nodeId);
    }

    return exploration;
  }

  /**
   * Find harmonic nodes (nodes that resonate well together)
   */
  private findHarmonicNodes(node: CodexNode): CodexNode[] {
    const harmonic: CodexNode[] = [];

    // Same element = harmonic
    const sameElement = this.nodes.filter(n => 
      n.id !== node.id && n.element === node.element
    );
    harmonic.push(...sameElement.slice(0, 3));

    // Related chakras = harmonic
    const chakraMap: { [key: string]: string[] } = {
      'Root': ['Root', 'Sacral'],
      'Sacral': ['Root', 'Sacral', 'Solar Plexus'],
      'Solar Plexus': ['Sacral', 'Solar Plexus', 'Heart'],
      'Heart': ['Solar Plexus', 'Heart', 'Throat'],
      'Throat': ['Heart', 'Throat', 'Third Eye'],
      'Third Eye': ['Throat', 'Third Eye', 'Crown'],
      'Crown': ['Third Eye', 'Crown']
    };
    if (node.chakra) {
      const relatedChakras = chakraMap[node.chakra] || [];
      const related = this.nodes.filter(n =>
        n.id !== node.id && n.chakra && relatedChakras.includes(n.chakra)
      );
      harmonic.push(...related.slice(0, 2));
    }

    return [...new Map(harmonic.map(n => [n.id, n])).values()];
  }

  /**
   * Find dissonant nodes (nodes that create tension - useful for growth)
   */
  private findDissonantNodes(node: CodexNode): CodexNode[] {
    const dissonant: CodexNode[] = [];

    // Opposite elements create tension
    const elementOpposites: { [key: string]: string } = {
      'Fire': 'Water',
      'Water': 'Fire',
      'Air': 'Earth',
      'Earth': 'Air'
    };
    const opposite = elementOpposites[node.element];
    if (opposite) {
      const oppositeNodes = this.nodes.filter(n =>
        n.id !== node.id && n.element === opposite
      );
      dissonant.push(...oppositeNodes.slice(0, 2));
    }

    return dissonant;
  }

  /**
   * Find related nodes (by theme, keyword, or narrative)
   */
  private findRelatedNodes(node: CodexNode): CodexNode[] {
    const related: CodexNode[] = [];

    // Same archetype theme
    if (node.narrative?.archetype) {
      const sameArchetype = this.nodes.filter(n =>
        n.id !== node.id &&
        n.narrative?.archetype === node.narrative.archetype
      );
      related.push(...sameArchetype.slice(0, 2));
    }

    // Shared keywords
    if (node.narrative?.keywords) {
      const keywords = node.narrative.keywords;
      const sharedKeywords = this.nodes.filter(n =>
        n.id !== node.id &&
        n.narrative?.keywords &&
        n.narrative.keywords.some(k => keywords.includes(k))
      );
      related.push(...sharedKeywords.slice(0, 2));
    }

    return [...new Map(related.map(n => [n.id, n])).values()];
  }

  /**
   * Suggest nodes to explore next
   */
  private suggestNodesToExplore(
    node: CodexNode,
    harmonic: CodexNode[],
    related: CodexNode[]
  ): CodexNode[] {
    const suggestions: CodexNode[] = [];

    // Suggest harmonic nodes (safe exploration)
    suggestions.push(...harmonic.slice(0, 2));

    // Suggest related nodes (deeper exploration)
    suggestions.push(...related.slice(0, 2));

    // Suggest sequential nodes (linear exploration)
    const nextId = node.id + 1;
    if (nextId <= 144) {
      const next = this.getNode(nextId);
      if (next) suggestions.push(next);
    }

    return [...new Map(suggestions.map(n => [n.id, n])).values()].slice(0, 5);
  }

  /**
   * Suggest creative actions based on the node
   */
  private suggestCreativeActions(node: CodexNode): string[] {
    const actions: string[] = [];

    // Art suggestions
    if (node.color) {
      actions.push(`Create art using ${node.color}`);
    }
    if (node.geometry) {
      actions.push(`Draw or build a ${node.geometry}`);
    }
    if (node.pigment) {
      actions.push(`Paint with ${node.pigment}`);
    }

    // Writing suggestions
    if (node.narrative?.storyBeats) {
      actions.push(`Write a story about: ${node.narrative.storyBeats[0]}`);
    }
    if (node.narrative?.keywords) {
      actions.push(`Write using these words: ${node.narrative.keywords.join(', ')}`);
    }

    // Music suggestions
    if (node.solfeggio) {
      actions.push(`Listen to or create music at ${node.solfeggio} Hz`);
    }

    // Game/play suggestions
    if (node.gameDesign?.mechanics) {
      actions.push(`Design a game mechanic: ${node.gameDesign.mechanics[0]}`);
    }

    return actions.slice(0, 5);
  }

  /**
   * Suggest learning paths
   */
  private suggestLearningPaths(node: CodexNode): string[] {
    const paths: string[] = [];

    if (node.element) {
      paths.push(`Learn about the element of ${node.element}`);
    }
    if (node.planet) {
      paths.push(`Study ${node.planet} in astrology`);
    }
    if (node.zodiac) {
      paths.push(`Explore ${node.zodiac} zodiac sign`);
    }
    if (node.chakra) {
      paths.push(`Learn about the ${node.chakra} chakra`);
    }
    if (node.geometry) {
      paths.push(`Study ${node.geometry} in sacred geometry`);
    }
    if (node.shem) {
      paths.push(`Research the Shem Angel ${node.shem}`);
    }
    if (node.goetia) {
      paths.push(`Learn about ${node.goetia} in Goetia`);
    }

    return paths.slice(0, 5);
  }

  /**
   * Get random node - for discovery and play
   */
  getRandomNode(): CodexNode {
    const randomId = Math.floor(Math.random() * 144) + 1;
    return this.getNode(randomId)!;
  }

  /**
   * Get exploration history
   */
  getHistory(): CodexNode[] {
    return this.explorationHistory.map(id => this.getNode(id)!).filter(Boolean);
  }

  /**
   * Clear exploration history
   */
  clearHistory(): void {
    this.explorationHistory = [];
    this.currentExploration = null;
  }

  /**
   * Get current exploration
   */
  getCurrentExploration(): CodexExploration | null {
    return this.currentExploration;
  }

  /**
   * Get all nodes
   */
  getAllNodes(): CodexNode[] {
    return [...this.nodes];
  }

  /**
   * Get nodes by element
   */
  getNodesByElement(element: string): CodexNode[] {
    return this.nodes.filter(n => n.element === element);
  }

  /**
   * Get nodes by chakra
   */
  getNodesByChakra(chakra: string): CodexNode[] {
    return this.nodes.filter(n => n.chakra === chakra);
  }

  /**
   * Get nodes by geometry
   */
  getNodesByGeometry(geometry: string): CodexNode[] {
    return this.nodes.filter(n => n.geometry === geometry);
  }
}

// Export singleton instance
export const codexEngine = new FunctionalCodexEngine();

// Export for easy use
export default codexEngine;

