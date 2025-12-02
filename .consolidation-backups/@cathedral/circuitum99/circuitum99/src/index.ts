/**
 * Circuitum99: Alpha et Omega - SOUL Layer Implementation
 * Book/Wisdom System with 99 Gates and 144 Lattice
 */

// Core Circuitum99 Types
export interface WisdomInput {
  query: string;
  context?: string;
  energyLevel?: number;
  gatePreference?: number;
}

export interface WisdomOutput {
  wisdom: string;
  gate: number;
  lattice: number;
  energy: number;
  connections: WisdomConnection[];
}

export interface WisdomConnection {
  nodeId: number;
  strength: number;
  type: 'harmonic' | 'dissonant' | 'neutral';
}

export interface GateSystem {
  id: number;
  name: string;
  energy: number;
  wisdom: string;
  connections: number[];
}

export interface LatticePoint {
  id: number;
  x: number;
  y: number;
  energy: number;
  connections: number[];
}

/**
 * Circuitum99: Alpha et Omega Engine
 * Implements the SOUL layer with 99 gates and 144 lattice
 */
export class Circuitum99Engine {
  private gates: GateSystem[] = [];
  private lattice: LatticePoint[] = [];
  private wisdomMatrix: number[][] = [];

  constructor() {
    this.initializeGates();
    this.initializeLattice();
    this.buildWisdomMatrix();
  }

  /**
   * Initialize the 99 Gates system
   */
  private initializeGates(): void {
    for (let i = 1; i <= 99; i++) {
      this.gates.push({
        id: i,
        name: `Gate ${i}`,
        energy: this.calculateGateEnergy(i),
        wisdom: `Wisdom of Gate ${i}`,
        connections: this.calculateGateConnections(i)
      });
    }
  }

  /**
   * Initialize the 144 Lattice points
   */
  private initializeLattice(): void {
    for (let i = 1; i <= 144; i++) {
      const angle = (i / 144) * 2 * Math.PI;
      const radius = Math.sqrt(i / 144);

      this.lattice.push({
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        energy: this.calculateLatticeEnergy(i),
        connections: this.calculateLatticeConnections(i)
      });
    }
  }

  /**
   * Build the wisdom matrix for pattern recognition
   */
  private buildWisdomMatrix(): void {
    this.wisdomMatrix = Array(99).fill(null).map(() =>
      Array(144).fill(0).map(() => Math.random())
    );
  }

  /**
   * Calculate gate energy using sacred mathematics
   */
  private calculateGateEnergy(gateId: number): number {
    // Use 144:99 ratio and golden mean in energy calculation
    const goldenRatio = 1.618033988749895;
    const codexRatio = 144 / 99;

    return Math.sin(gateId * goldenRatio * codexRatio) * 50 + 50;
  }

  /**
   * Calculate lattice energy using Fibonacci sequence
   */
  private calculateLatticeEnergy(latticeId: number): number {
    // Fibonacci sequence for lattice point energy
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    const fibIndex = (latticeId - 1) % fibonacci.length;

    return fibonacci[fibIndex] * 10;
  }

  /**
   * Calculate gate connections using sacred geometry
   */
  private calculateGateConnections(gateId: number): number[] {
    const connections: number[] = [];
    const connectionRadius = 3;

    for (let i = 1; i <= connectionRadius * 2; i++) {
      const connectionId = ((gateId - 1 + i - connectionRadius) % 99) + 1;
      if (connectionId !== gateId) {
        connections.push(connectionId);
      }
    }

    return connections;
  }

  /**
   * Calculate lattice connections using hexagonal grid
   */
  private calculateLatticeConnections(latticeId: number): number[] {
    const connections: number[] = [];
    const ring = Math.floor(Math.sqrt(latticeId));
    const position = latticeId - ring * ring;

    // Connect to adjacent lattice points
    if (position > 0) connections.push(latticeId - 1);
    if (position < ring * 2) connections.push(latticeId + 1);

    return connections;
  }

  /**
   * Process wisdom through the Circuitum99 system
   */
  processWisdom(input: WisdomInput): WisdomOutput {
    const gate = this.selectOptimalGate(input);
    const lattice = this.selectOptimalLattice(input, gate);

    const wisdom = this.generateWisdom(input, gate, lattice);
    const connections = this.findWisdomConnections(gate, lattice);

    return {
      wisdom,
      gate: gate.id,
      lattice: lattice.id,
      energy: (gate.energy + lattice.energy) / 2,
      connections
    };
  }

  /**
   * Select optimal gate for the given input
   */
  private selectOptimalGate(input: WisdomInput): GateSystem {
    let bestGate = this.gates[0];
    let bestScore = 0;

    for (const gate of this.gates) {
      const score = this.calculateGateScore(input, gate);
      if (score > bestScore) {
        bestScore = score;
        bestGate = gate;
      }
    }

    return bestGate;
  }

  /**
   * Select optimal lattice point for the given input and gate
   */
  private selectOptimalLattice(input: WisdomInput, gate: GateSystem): LatticePoint {
    let bestLattice = this.lattice[0];
    let bestScore = 0;

    for (const latticePoint of this.lattice) {
      const score = this.calculateLatticeScore(input, gate, latticePoint);
      if (score > bestScore) {
        bestScore = score;
        bestLattice = latticePoint;
      }
    }

    return bestLattice;
  }

  /**
   * Calculate how well a gate matches the input
   */
  private calculateGateScore(input: WisdomInput, gate: GateSystem): number {
    const energyMatch = input.energyLevel ?
      1 - Math.abs(gate.energy - input.energyLevel) / 100 : 1;

    const queryMatch = input.query.length > 0 ?
      this.calculateTextSimilarity(input.query, gate.wisdom) : 1;

    return (energyMatch + queryMatch) / 2;
  }

  /**
   * Calculate how well a lattice point matches the input and gate
   */
  private calculateLatticeScore(input: WisdomInput, gate: GateSystem, lattice: LatticePoint): number {
    const matrixValue = this.wisdomMatrix[gate.id - 1][lattice.id - 1];
    const energyCompatibility = 1 - Math.abs(gate.energy - lattice.energy) / 100;

    return (matrixValue + energyCompatibility) / 2;
  }

  /**
   * Generate wisdom from the selected gate and lattice
   */
  private generateWisdom(input: WisdomInput, gate: GateSystem, lattice: LatticePoint): string {
    const baseWisdom = `Through Gate ${gate.id} and Lattice ${lattice.id}, `;
    const energy = `with energy level ${(gate.energy + lattice.energy) / 2}.`;

    return baseWisdom + gate.wisdom + " " + energy;
  }

  /**
   * Find connections between wisdom elements
   */
  private findWisdomConnections(gate: GateSystem, lattice: LatticePoint): WisdomConnection[] {
    const connections: WisdomConnection[] = [];

    // Gate connections
    for (const gateId of gate.connections) {
      connections.push({
        nodeId: gateId,
        strength: 0.8,
        type: 'harmonic'
      });
    }

    // Lattice connections
    for (const latticeId of lattice.connections) {
      connections.push({
        nodeId: latticeId + 1000, // Offset to distinguish from gates
        strength: 0.6,
        type: 'neutral'
      });
    }

    return connections;
  }

  /**
   * Simple text similarity calculation
   */
  private calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(' ');
    const words2 = text2.toLowerCase().split(' ');

    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  /**
   * Get all gates for interface display
   */
  getGates(): GateSystem[] {
    return [...this.gates];
  }

  /**
   * Get all lattice points for visualization
   */
  getLattice(): LatticePoint[] {
    return [...this.lattice];
  }

  /**
   * Get wisdom matrix for advanced analysis
   */
  getWisdomMatrix(): number[][] {
    return this.wisdomMatrix.map(row => [...row]);
  }
}

/**
 * Circuitum99 Interface Manager
 * Handles the Alpha et Omega interface modes
 */
export class Circuitum99Interface {
  private engine: Circuitum99Engine;
  private currentMode: 'hermetic' | 'tree' | 'aeons' | 'avalon' = 'hermetic';

  constructor() {
    this.engine = new Circuitum99Engine();
  }

  /**
   * Set the current interface mode
   */
  setMode(mode: 'hermetic' | 'tree' | 'aeons' | 'avalon'): void {
    this.currentMode = mode;
  }

  /**
   * Get current mode
   */
  getMode(): string {
    return this.currentMode;
  }

  /**
   * Process wisdom in current mode context
   */
  processWisdom(input: WisdomInput): WisdomOutput {
    const baseOutput = this.engine.processWisdom(input);

    // Enhance output based on current mode
    switch (this.currentMode) {
      case 'hermetic':
        return this.enhanceHermeticWisdom(baseOutput);
      case 'tree':
        return this.enhanceTreeWisdom(baseOutput);
      case 'aeons':
        return this.enhanceAeonsWisdom(baseOutput);
      case 'avalon':
        return this.enhanceAvalonWisdom(baseOutput);
      default:
        return baseOutput;
    }
  }

  /**
   * Enhance wisdom for Hermetic mode
   */
  private enhanceHermeticWisdom(output: WisdomOutput): WisdomOutput {
    return {
      ...output,
      wisdom: `🔥 HERMETIC: ${output.wisdom} - Alchemical transformation through elemental forces.`,
      energy: output.energy * 1.2 // Hermetic amplification
    };
  }

  /**
   * Enhance wisdom for Tree of Life mode
   */
  private enhanceTreeWisdom(output: WisdomOutput): WisdomOutput {
    return {
      ...output,
      wisdom: `🌳 TREE: ${output.wisdom} - Sephirothic wisdom flowing through the Tree of Life.`,
      energy: output.energy * 1.1 // Kabbalistic enhancement
    };
  }

  /**
   * Enhance wisdom for Theosophical Aeons mode
   */
  private enhanceAeonsWisdom(output: WisdomOutput): WisdomOutput {
    return {
      ...output,
      wisdom: `🌌 AEONS: ${output.wisdom} - Cosmic wisdom from the great aeons of time.`,
      energy: output.energy * 1.3 // Aeonic expansion
    };
  }

  /**
   * Enhance wisdom for Avalon Current mode
   */
  private enhanceAvalonWisdom(output: WisdomOutput): WisdomOutput {
    return {
      ...output,
      wisdom: `🏰 AVALON: ${output.wisdom} - Arthurian wisdom flowing through the Avalon current.`,
      energy: output.energy * 1.15 // Grail enhancement
    };
  }
}

/**
 * Export the main Circuitum99 system
 */
export const circuitum99 = new Circuitum99Engine();
export const circuitum99Interface = new Circuitum99Interface();

// Default export for easy importing
export default Circuitum99Engine;
