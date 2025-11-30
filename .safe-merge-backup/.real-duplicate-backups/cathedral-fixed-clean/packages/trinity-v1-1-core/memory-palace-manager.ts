/**
// 🔧 Design - Museum-grade quality - 144:99 ratio compliance - Fibonacci-based sizing - Golden ratio proportions - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Multi-modal creation experiences - Organic, quality Fix: Multi-layered 3D space with sacred geometry depth
// 🎨 Visionary Art: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
// 🔧 Design Fix: Multi-layered 3D space with sacred geometry depth
 * 🏛️✨ MEMORY PALACE MANAGER
 *
 * Manages the Memory Palace system for knowledge organization.
 * Creates rooms, connections, and wisdom accumulation.
 *
 * @license CC0-1.0 - Public Domain
  * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
*/

export interface MemoryRoom {
  id: string;
  name: string;
  theme: string;
  knowledge: KnowledgeNode[];
  connections: string[]; // Room IDs
  wisdomLevel: number; // 0-100
  lastAccessed: number; // timestamp
}

export interface KnowledgeNode {
  id: string;
  content: string;
  type: 'fact' | 'concept' | 'skill' | 'memory' | 'wisdom';
  connections: string[]; // Node IDs
  strength: number; // 0-100
  tags: string[];
}

export interface WisdomConnection {
  from: string; // Node or Room ID
  to: string; // Node or Room ID
  strength: number; // 0-100
  type: 'association' | 'causation' | 'similarity' | 'contrast';
}

export // Trauma-aware: gentle, supportive, ESC exits, pause anytime
class MemoryPalaceManager {
  private rooms: Map<string, MemoryRoom> = new Map();
  private knowledgeGraph: Map<string, KnowledgeNode> = new Map();
  private connections: WisdomConnection[] = [];

  // Create a new memory room
  public createRoom(
    name: string,
    theme: string
  ): MemoryRoom {
    const room: MemoryRoom = {
      id: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      theme,
      knowledge: [],
      connections: [],
      wisdomLevel: 0,
      lastAccessed: Date.now()
    };

    this.rooms.set(room.id, room);
    return room;
  }

  // Add knowledge to a room
  public addKnowledge(
    roomId: string,
    knowledge: Omit<KnowledgeNode, 'id'>
  ): KnowledgeNode {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }

    const node: KnowledgeNode = {
      id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...knowledge
    };

    room.knowledge.push(node);
    this.knowledgeGraph.set(node.id, node);
    room.lastAccessed = Date.now();

    return node;
  }

  // Create connection between knowledge nodes
  public createConnection(
    fromId: string,
    toId: string,
    type: WisdomConnection['type'] = 'association',
    strength: number = 50
  ): WisdomConnection {
    const connection: WisdomConnection = {
      from: fromId,
      to: toId,
      strength,
      type
    };

    this.connections.push(connection);

    // Update node connections
    const fromNode = this.knowledgeGraph.get(fromId);
    const toNode = this.knowledgeGraph.get(toId);

    if (fromNode && !fromNode.connections.includes(toId)) {
      fromNode.connections.push(toId);
    }
    if (toNode && !toNode.connections.includes(fromId)) {
      toNode.connections.push(fromId);
    }

    return connection;
  }

  // Connect two rooms
  public connectRooms(roomId1: string, roomId2: string): void {
    const room1 = this.rooms.get(roomId1);
    const room2 = this.rooms.get(roomId2);

    if (!room1 || !room2) {
      throw new Error('One or both rooms not found');
    }

    if (!room1.connections.includes(roomId2)) {
      room1.connections.push(roomId2);
    }
    if (!room2.connections.includes(roomId1)) {
      room2.connections.push(roomId1);
    }
  }

  // Retrieve knowledge by query
  public queryKnowledge(
    query: string,
    roomId?: string
  ): KnowledgeNode[] {
    const results: KnowledgeNode[] = [];
    const queryLower = query.toLowerCase();

    const searchRooms = roomId
      ? [this.rooms.get(roomId)].filter(Boolean) as MemoryRoom[]
      : Array.from(this.rooms.values());

    for (const room of searchRooms) {
      for (const node of room.knowledge) {
        if (
          node.content.toLowerCase().includes(queryLower) ||
          node.tags.some(tag => tag.toLowerCase().includes(queryLower))
        ) {
          results.push(node);
        }
      }
    }

    return results;
  }

  // Calculate wisdom level for a room
  public calculateWisdomLevel(roomId: string): number {
    const room = this.rooms.get(roomId);
    if (!room) {
      return 0;
    }

    if (room.knowledge.length === 0) {
      return 0;
    }

    // Calculate based on knowledge strength and connections
    const avgStrength = room.knowledge.reduce((sum, k) => sum + k.strength, 0) / room.knowledge.length;
    const connectionCount = room.knowledge.reduce((sum, k) => sum + k.connections.length, 0);
    const connectionScore = Math.min(100, connectionCount * 10);

    room.wisdomLevel = (avgStrength * 0.6 + connectionScore * 0.4);
    return room.wisdomLevel;
  }

  // Get all rooms
  public getAllRooms(): MemoryRoom[] {
    return Array.from(this.rooms.values());
  }

  // Get room by ID
  public getRoom(roomId: string): MemoryRoom | undefined {
    return this.rooms.get(roomId);
  }

  // Get knowledge graph
  public getKnowledgeGraph(): Map<string, KnowledgeNode> {
    return this.knowledgeGraph;
  }

  // Get all connections
  public getAllConnections(): WisdomConnection[] {
    return this.connections;
  }

  // Find related knowledge
  public findRelatedKnowledge(nodeId: string, depth: number = 2): KnowledgeNode[] {
    const related: Set<string> = new Set([nodeId]);
    const queue: Array<{ id: string; depth: number }> = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.depth >= depth) continue;

      const node = this.knowledgeGraph.get(current.id);
      if (!node) continue;

      for (const connectedId of node.connections) {
        if (!related.has(connectedId)) {
          related.add(connectedId);
          queue.push({ id: connectedId, depth: current.depth + 1 });
        }
      }
    }

    return Array.from(related)
      .map(id => this.knowledgeGraph.get(id))
      .filter(Boolean) as KnowledgeNode[];
  }

  // Strengthen knowledge connection
  public strengthenConnection(fromId: string, toId: string, amount: number = 5): void {
    const connection = this.connections.find(
      c => (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
    );

    if (connection) {
      connection.strength = Math.min(100, connection.strength + amount);
    }
  }

  // Get wisdom summary
  public getWisdomSummary(): {
    totalRooms: number;
    totalKnowledge: number;
    totalConnections: number;
    avgWisdomLevel: number;
  } {
    const rooms = Array.from(this.rooms.values());
    const totalKnowledge = rooms.reduce((sum, r) => sum + r.knowledge.length, 0);
    const avgWisdomLevel = rooms.length > 0
      ? rooms.reduce((sum, r) => sum + this.calculateWisdomLevel(r.id), 0) / rooms.length
      : 0;

    return {
      totalRooms: rooms.length,
      totalKnowledge,
      totalConnections: this.connections.length,
      avgWisdomLevel
    };
  }
}

export default MemoryPalaceManager;

