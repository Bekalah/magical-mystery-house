/**
 * ⚡✨ CIRCUITUM99 CONNECTOR
 *
 * Connects 99 Gates of Circuitum99 to Trinity Architecture.
 * Each Gate represents a narrative thread and wisdom pathway.
 *
 * @license CC0-1.0 - Public Domain
 */

import type { TrinityV11State } from './TrinityV11Core';
import FractalSoundSynthesizer from './fractal-sound-synthesizer';

export interface CircuitumGate {
  gate_id: number; // 0-98 for 99 Gates
  name: string;
  narrative_thread: string;
  arcana_connections: number[]; // Connected Arcanae (0-21)
  codex_connections: string[]; // Connected Codex nodes
  wisdom_level: number; // 0-100
  activation_state: boolean;
  fractal_sound_frequency?: number; // Hz
}

export class Circuitum99Connector {
  private gates: Map<number, CircuitumGate> = new Map();

  constructor() {
    this.initializeGates();
  }

  private initializeGates(): void {
    for (let i = 0; i < 99; i++) {
      const arcanaIndex = Math.floor(i / 4.5); // Distribute across 22 Arcanae
      const codexIndex = Math.floor(i / 1.45); // Distribute across 144 Codex nodes

      // Calculate fractal sound frequency using advanced synthesizer
      const fractalPattern = FractalSoundSynthesizer.generateFractalPattern(i);
      const fractalFreq = fractalPattern.base_frequency;

      this.gates.set(i, {
        gate_id: i,
        name: `Gate ${i + 1}`,
        narrative_thread: `narrative_${i}`,
        arcana_connections: [
          Math.min(21, arcanaIndex),
          Math.min(21, arcanaIndex + 1)
        ],
        codex_connections: [
          `codex_${codexIndex % 144}`,
          `codex_${(codexIndex + 1) % 144}`
        ],
        wisdom_level: (i / 99) * 100,
        activation_state: false,
        fractal_sound_frequency: fractalFreq
      });
    }
  }

  public getGate(gateId: number): CircuitumGate | undefined {
    return this.gates.get(gateId);
  }

  public getAllGates(): CircuitumGate[] {
    return Array.from(this.gates.values());
  }

  public getGatesByArcana(arcanaId: number): CircuitumGate[] {
    return Array.from(this.gates.values())
      .filter(gate => gate.arcana_connections.includes(arcanaId));
  }

  public getGatesByCodex(codexNodeId: string): CircuitumGate[] {
    return Array.from(this.gates.values())
      .filter(gate => gate.codex_connections.includes(codexNodeId));
  }

  public activateGate(gateId: number): void {
    const gate = this.gates.get(gateId);
    if (gate) {
      gate.activation_state = true;
    }
  }

  public integrateWithTrinityState(state: TrinityV11State): TrinityV11State {
    const updatedState = { ...state };

    // Update gate activations
    this.gates.forEach((gate, id) => {
      updatedState.soul.gate_activations[id] = gate.activation_state;
    });

    // Update soul wisdom based on activated gates
    const activatedGates = Array.from(this.gates.values())
      .filter(gate => gate.activation_state);

    if (activatedGates.length > 0) {
      const avgWisdom = activatedGates.reduce((sum, gate) => sum + gate.wisdom_level, 0) / activatedGates.length;
      updatedState.soul.wisdom_accumulation = Math.min(
        100,
        Math.floor(avgWisdom)
      );
    }

    // Update narrative threads
    const narrativeThreads = Array.from(this.gates.values())
      .map(gate => ({
        id: gate.narrative_thread,
        title: gate.name,
        coherence: gate.wisdom_level / 100,
        depth: gate.activation_state ? 1 : 0.5,
        connections: gate.codex_connections
      }));

    updatedState.soul.narrative_threads = narrativeThreads;

    return updatedState;
  }
}

export default Circuitum99Connector;

