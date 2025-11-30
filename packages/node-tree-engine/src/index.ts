/**
 * Node Tree Engine
 * Complete Node Tree Health System for 99 Mystical Codex Nodes
 */

/**
 * ⚗️ NodeHealth - The Principle
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
export interface NodeHealth {
  id: string;
  health: number;
  status: "healthy" | "degraded" | "critical";
  lastCheck: number;
}

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
  id: string;
  name: string;
  connections: string[];
  health: NodeHealth;
}

export const createNode = (id: string, name: string): CodexNode => {
  return {
    id,
    name,
    connections: [],
    health: {
      id,
      health: 100,
      status: "healthy",
      lastCheck: Date.now(),
    },
  };
};

export const updateNodeHealth = (
  node: CodexNode,
  health: number
): CodexNode => {
  const status =
    health > 80 ? "healthy" : health > 40 ? "degraded" : "critical";
  return {
    ...node,
    health: {
      ...node.health,
      health,
      status,
      lastCheck: Date.now(),
    },
  };
};

export default {
  createNode,
  updateNodeHealth,
};
