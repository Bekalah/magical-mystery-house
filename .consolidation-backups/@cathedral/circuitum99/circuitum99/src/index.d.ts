/**
 * index
 *
 * @package @cathedral/circuitum99
 */
/**
 * Circuitum99: Alpha et Omega - SOUL Layer Implementation
 * Book/Wisdom System with 99 Gates and 144 Lattice
 */
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
export declare class Circuitum99Engine {
    private gates;
    private lattice;
    private wisdomMatrix;
    constructor();
    /**
     * Initialize the 99 Gates system
     */
    private initializeGates;
    /**
     * Initialize the 144 Lattice points
     */
    private initializeLattice;
    /**
     * Build the wisdom matrix for pattern recognition
     */
    private buildWisdomMatrix;
    /**
     * Calculate gate energy using sacred mathematics
     */
    private calculateGateEnergy;
    /**
     * Calculate lattice energy using Fibonacci sequence
     */
    private calculateLatticeEnergy;
    /**
     * Calculate gate connections using sacred geometry
     */
    private calculateGateConnections;
    /**
     * Calculate lattice connections using hexagonal grid
     */
    private calculateLatticeConnections;
    /**
     * Process wisdom through the Circuitum99 system
     */
    processWisdom(input: WisdomInput): WisdomOutput;
    /**
     * Select optimal gate for the given input
     */
    private selectOptimalGate;
    /**
     * Select optimal lattice point for the given input and gate
     */
    private selectOptimalLattice;
    /**
     * Calculate how well a gate matches the input
     */
    private calculateGateScore;
    /**
     * Calculate how well a lattice point matches the input and gate
     */
    private calculateLatticeScore;
    /**
     * Generate wisdom from the selected gate and lattice
     */
    private generateWisdom;
    /**
     * Find connections between wisdom elements
     */
    private findWisdomConnections;
    /**
     * Simple text similarity calculation
     */
    private calculateTextSimilarity;
    /**
     * Get all gates for interface display
     */
    getGates(): GateSystem[];
    /**
     * Get all lattice points for visualization
     */
    getLattice(): LatticePoint[];
    /**
     * Get wisdom matrix for advanced analysis
     */
    getWisdomMatrix(): number[][];
}
/**
 * Circuitum99 Interface Manager
 * Handles the Alpha et Omega interface modes
 */
export declare class Circuitum99Interface {
    private engine;
    private currentMode;
    constructor();
    /**
     * Set the current interface mode
     */
    setMode(mode: 'hermetic' | 'tree' | 'aeons' | 'avalon'): void;
    /**
     * Get current mode
     */
    getMode(): string;
    /**
     * Process wisdom in current mode context
     */
    processWisdom(input: WisdomInput): WisdomOutput;
    /**
     * Enhance wisdom for Hermetic mode
     */
    private enhanceHermeticWisdom;
    /**
     * Enhance wisdom for Tree of Life mode
     */
    private enhanceTreeWisdom;
    /**
     * Enhance wisdom for Theosophical Aeons mode
     */
    private enhanceAeonsWisdom;
    /**
     * Enhance wisdom for Avalon Current mode
     */
    private enhanceAvalonWisdom;
}
/**
 * Export the main Circuitum99 system
 */
export declare const circuitum99: Circuitum99Engine;
export declare const circuitum99Interface: Circuitum99Interface;
export default Circuitum99Engine;
//# sourceMappingURL=index.d.ts.map