/**
 * Node Tree Engine
 * Complete Node Tree Health System for 99 Mystical Codex Nodes
 */

export interface NodeHealth {
  id: string;
  health: number;
  status: "healthy" | "degraded" | "critical";
  lastCheck: number;
}

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
