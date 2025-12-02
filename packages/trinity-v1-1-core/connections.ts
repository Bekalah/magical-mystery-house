/**
 * 🔗✨ TRINITY ARCHITECTURE CONNECTIONS
 *
 * Connects all Cathedral systems:
 * - 22 Master Arcanae (Liber Arcanae)
 * - Circuitum99 (Story Engine)
 * - Stone Grimoire (Body/Physical Expression)
 * - Cosmogenesis (Brain/Consciousness)
 * - Codex 144:99 (Knowledge Graph)
 *
 * @license CC0-1.0 - Public Domain
 */

import type { TrinityV11State } from './TrinityV11Core';

export interface ArcanaConnection {
  arcana_id: number; // 0-21 for 22 Major Arcanae
  name: string;
  consciousness_level: number;
  narrative_thread: string;
  creative_output: string[];
  gate_connections: number[]; // Connected Circuitum99 gates
  codex_nodes: string[]; // Connected Codex nodes
}

export interface Circuitum99Connection {
  gate_id: number; // 0-98 for 99 Gates
  name: string;
  arcana_connections: number[]; // Connected Arcanae
  narrative_state: string;
  wisdom_level: number;
  codex_connections: string[];
}

export interface CodexConnection {
  node_id: string;
  arcana_connections: number[];
  gate_connections: number[];
  knowledge_type: string;
  wisdom_integration: number;
}

export interface GrimoireConnection {
  chapel_id: number; // 0-7 for 8 Chapels
  name: string;
  arcana_resonance: number[];
  physical_manifestation: string[];
  skill_connections: string[];
}

export class TrinityConnections {
  private arcanae: Map<number, ArcanaConnection> = new Map();
  private gates: Map<number, Circuitum99Connection> = new Map();
  private codex: Map<string, CodexConnection> = new Map();
  private grimoire: Map<number, GrimoireConnection> = new Map();

  constructor() {
    this.initializeConnections();
  }

  private initializeConnections(): void {
    // Initialize 22 Master Arcanae connections
    this.initializeArcanae();

    // Initialize 99 Gates connections
    this.initializeGates();

    // Initialize Codex 144:99 connections
    this.initializeCodex();

    // Initialize Stone Grimoire connections
    this.initializeGrimoire();

    // Cross-connect everything
    this.crossConnect();
  }

  private initializeArcanae(): void {
    const arcanaeNames = [
      'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
      'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
      'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
      'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
      'Judgement', 'The World'
    ];

    for (let i = 0; i < 22; i++) {
      this.arcanae.set(i, {
        arcana_id: i,
        name: arcanaeNames[i],
        consciousness_level: Math.floor(i * 45.45), // 0-999 scale
        narrative_thread: `narrative_${i}`,
        creative_output: [],
        gate_connections: this.calculateGateConnections(i),
        codex_nodes: this.calculateCodexConnections(i)
      });
    }
  }

  private initializeGates(): void {
    for (let i = 0; i < 99; i++) {
      const arcanaIndex = Math.floor(i / 4.5); // Distribute across 22 Arcanae

      this.gates.set(i, {
        gate_id: i,
        name: `Gate ${i + 1}`,
        arcana_connections: [Math.min(21, arcanaIndex), Math.min(21, arcanaIndex + 1)],
        narrative_state: `gate_narrative_${i}`,
        wisdom_level: i * 1.01, // 0-100 scale
        codex_connections: [`codex_${Math.floor(i / 1.45)}`]
      });
    }
  }

  private initializeCodex(): void {
    // 144 nodes in Codex 144:99
    for (let i = 0; i < 144; i++) {
      const nodeId = `codex_${i}`;
      const arcanaIndex = Math.floor(i / 6.55); // Distribute across 22 Arcanae
      const gateIndex = Math.floor(i / 1.45); // Distribute across 99 Gates

      this.codex.set(nodeId, {
        node_id: nodeId,
        arcana_connections: [Math.min(21, arcanaIndex)],
        gate_connections: [Math.min(98, gateIndex)],
        knowledge_type: this.getKnowledgeType(i),
        wisdom_integration: (i / 144) * 100
      });
    }
  }

  private initializeGrimoire(): void {
    const chapels = [
      'Chapel of Earth', 'Chapel of Water', 'Chapel of Air', 'Chapel of Fire',
      'Chapel of Spirit', 'Chapel of Time', 'Chapel of Space', 'Chapel of Unity'
    ];

    for (let i = 0; i < 8; i++) {
      this.grimoire.set(i, {
        chapel_id: i,
        name: chapels[i],
        arcana_resonance: this.calculateChapelArcana(i),
        physical_manifestation: [`manifestation_${i}`],
        skill_connections: this.getSkillConnections(i)
      });
    }
  }

  private crossConnect(): void {
    // Connect Arcanae to Gates
    this.arcanae.forEach((arcana, id) => {
      arcana.gate_connections.forEach(gateId => {
        const gate = this.gates.get(gateId);
        if (gate && !gate.arcana_connections.includes(id)) {
          gate.arcana_connections.push(id);
        }
      });
    });

    // Connect Gates to Codex
    this.gates.forEach((gate, id) => {
      gate.codex_connections.forEach(nodeId => {
        const node = this.codex.get(nodeId);
        if (node && !node.gate_connections.includes(id)) {
          node.gate_connections.push(id);
        }
      });
    });

    // Connect Arcanae to Codex
    this.arcanae.forEach((arcana, id) => {
      arcana.codex_nodes.forEach(nodeId => {
        const node = this.codex.get(nodeId);
        if (node && !node.arcana_connections.includes(id)) {
          node.arcana_connections.push(id);
        }
      });
    });
  }

  private calculateGateConnections(arcanaId: number): number[] {
    // Each Arcana connects to approximately 4-5 gates
    const startGate = Math.floor((arcanaId / 22) * 99);
    const connections: number[] = [];

    for (let i = 0; i < 5; i++) {
      const gateId = (startGate + i) % 99;
      connections.push(gateId);
    }

    return connections;
  }

  private calculateCodexConnections(arcanaId: number): string[] {
    // Each Arcana connects to approximately 6-7 codex nodes
    const startNode = Math.floor((arcanaId / 22) * 144);
    const connections: string[] = [];

    for (let i = 0; i < 7; i++) {
      const nodeId = (startNode + i) % 144;
      connections.push(`codex_${nodeId}`);
    }

    return connections;
  }

  private getKnowledgeType(index: number): string {
    const types = ['sacred_geometry', 'philosophy', 'mathematics', 'art', 'music', 'science'];
    return types[index % types.length];
  }

  private calculateChapelArcana(chapelId: number): number[] {
    // Each Chapel resonates with 2-3 Arcanae
    const baseArcana = Math.floor((chapelId / 8) * 22);
    return [
      baseArcana % 22,
      (baseArcana + 1) % 22,
      (baseArcana + 2) % 22
    ];
  }

  private getSkillConnections(chapelId: number): string[] {
    const skills = ['design', 'writing', 'music', 'coding', 'synthesis', 'sacred_geometry'];
    return [skills[chapelId % skills.length], skills[(chapelId + 1) % skills.length]];
  }

  // Public API for accessing connections
  public getArcanaConnections(arcanaId: number): ArcanaConnection | undefined {
    return this.arcanae.get(arcanaId);
  }

  public getGateConnections(gateId: number): Circuitum99Connection | undefined {
    return this.gates.get(gateId);
  }

  public getCodexConnections(nodeId: string): CodexConnection | undefined {
    return this.codex.get(nodeId);
  }

  public getGrimoireConnections(chapelId: number): GrimoireConnection | undefined {
    return this.grimoire.get(chapelId);
  }

  public getAllConnections(): {
    arcanae: ArcanaConnection[];
    gates: Circuitum99Connection[];
    codex: CodexConnection[];
    grimoire: GrimoireConnection[];
  } {
    return {
      arcanae: Array.from(this.arcanae.values()),
      gates: Array.from(this.gates.values()),
      codex: Array.from(this.codex.values()),
      grimoire: Array.from(this.grimoire.values())
    };
  }

  public getConnectedSystems(arcanaId: number): {
    gates: Circuitum99Connection[];
    codex: CodexConnection[];
    grimoire: GrimoireConnection[];
  } {
    const arcana = this.arcanae.get(arcanaId);
    if (!arcana) {
      return { gates: [], codex: [], grimoire: [] };
    }

    const gates = arcana.gate_connections
      .map(id => this.gates.get(id))
      .filter((g): g is Circuitum99Connection => g !== undefined);

    const codex = arcana.codex_nodes
      .map(id => this.codex.get(id))
      .filter((c): c is CodexConnection => c !== undefined);

    const grimoire = Array.from(this.grimoire.values())
      .filter(g => g.arcana_resonance.includes(arcanaId));

    return { gates, codex, grimoire };
  }

  public integrateWithTrinityState(state: TrinityV11State): TrinityV11State {
    // Integrate connections into Trinity state
    const updatedState = { ...state };

    // Update soul gate activations based on connections
    this.gates.forEach((gate, id) => {
      if (gate.arcana_connections.length > 0) {
        updatedState.soul.gate_activations[id] = true;
      }
    });

    // Update brain consciousness based on arcana connections
    const arcanaConnections = Array.from(this.arcanae.values());
    const avgConsciousness = arcanaConnections.reduce((sum, a) => sum + a.consciousness_level, 0) / 22;
    updatedState.brain.consciousness_level = Math.min(999, Math.floor(avgConsciousness));

    // Update soul wisdom based on codex connections
    const codexConnections = Array.from(this.codex.values());
    const avgWisdom = codexConnections.reduce((sum, c) => sum + c.wisdom_integration, 0) / 144;
    updatedState.soul.wisdom_accumulation = Math.min(100, Math.floor(avgWisdom));

    return updatedState;
  }
}

export default TrinityConnections;

