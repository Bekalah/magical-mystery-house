/**
 * @license CC0-1.0 - Public Domain
 */

// Pure algorithmic SpiralEngine — research and exploration using only algorithmic and data-driven approaches
/**
 * ⚗️ SpiralConfig - The Principle
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
export type SpiralConfig = {
  seed?: string;
  depth?: number;
  ratio?: number; // Sacred mathematics ratio (144:99)
};

/**
 * ⚗️ SpiralEngine - The Crucible
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
export class SpiralEngine {
  config: SpiralConfig;

  constructor(cfg?: SpiralConfig) {
    this.config = {
      seed: cfg?.seed ?? "moonseed",
      depth: cfg?.depth ?? 3,
      ratio: cfg?.ratio ?? 144/99
    };
  }

  describe() {
    return `SpiralEngine(seed=${this.config.seed}, depth=${this.config.depth}, ratio=${this.config.ratio})`;
  }

  // Pure algorithmic node generation using sacred mathematics
  generateNode(index = 0) {
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const angle = index * this.config.ratio! * Math.PI * 2;
    const radius = Math.sqrt(index) * this.config.depth!;

    return {
      id: `node-${index}`,
      archetype: `archetype-${index % 12}`,
      position: {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: index * phi * 0.1
      },
      connections: this.calculateConnections(index)
    };
  }

  // Algorithmic connection calculation using Fibonacci sequence
  private calculateConnections(index: number): number[] {
    const connections: number[] = [];
    const fib = this.fibonacci(Math.min(index + 1, 12));

    for (let i = 1; i < fib.length; i++) {
      const connectionIndex = index - fib[i];
      if (connectionIndex >= 0) {
        connections.push(connectionIndex);
      }
    }

    return connections;
  }

  // Fibonacci sequence for sacred mathematics
  private fibonacci(n: number): number[] {
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
      sequence.push(sequence[i-1] + sequence[i-2]);
    }
    return sequence;
  }
}
