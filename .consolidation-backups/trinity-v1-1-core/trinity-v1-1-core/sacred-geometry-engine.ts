/**
 * 🔺✨ SACRED GEOMETRY ENGINE
 *
 * Advanced sacred geometry calculations for all Cathedral systems.
 * Integrates PHI, Fibonacci, Vesica Piscis, Pentagram, and more.
 *
 * @license CC0-1.0 - Public Domain
 */

export interface SacredGeometryPoint {
  x: number;
  y: number;
  z?: number;
}

export interface SacredGeometryPattern {
  name: string;
  points: SacredGeometryPoint[];
  connections: number[][];
  phi_ratio: number;
  fibonacci_sequence: number[];
}

export class SacredGeometryEngine {
  // Golden Ratio (PHI)
  public static readonly PHI = 1.618033988749895;
  public static readonly PHI_INVERSE = 0.618033988749895;

  // Golden Angle (137.508°)
  public static readonly GOLDEN_ANGLE = 137.508;

  // Fibonacci sequence generator
  public static generateFibonacci(n: number): number[] {
    const sequence: number[] = [0, 1];
    for (let i = 2; i < n; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
  }

  // Generate Golden Spiral points
  public static generateGoldenSpiral(center: SacredGeometryPoint, turns: number, points: number): SacredGeometryPoint[] {
    const spiral: SacredGeometryPoint[] = [];
    const angleStep = (turns * 2 * Math.PI) / points;

    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const radius = Math.pow(SacredGeometryEngine.PHI, angle / (2 * Math.PI)) * 10;
      spiral.push({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      });
    }

    return spiral;
  }

  // Generate Vesica Piscis pattern
  public static generateVesicaPiscis(center: SacredGeometryPoint, radius: number): SacredGeometryPoint[] {
    const points: SacredGeometryPoint[] = [];
    const segments = 64;

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * 2 * Math.PI;
      points.push({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      });
    }

    // Add second circle (vesica piscis intersection)
    const offset = radius * SacredGeometryEngine.PHI_INVERSE;
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * 2 * Math.PI;
      points.push({
        x: center.x + offset + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      });
    }

    return points;
  }

  // Generate Pentagram pattern
  public static generatePentagram(center: SacredGeometryPoint, radius: number): SacredGeometryPoint[] {
    const points: SacredGeometryPoint[] = [];
    const vertices = 5;

    for (let i = 0; i < vertices; i++) {
      const angle = (i * 2 * Math.PI / vertices) - (Math.PI / 2); // Start at top
      points.push({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      });
    }

    return points;
  }

  // Generate Flower of Life pattern
  public static generateFlowerOfLife(center: SacredGeometryPoint, radius: number, rings: number): SacredGeometryPoint[] {
    const points: SacredGeometryPoint[] = [];
    const circlesPerRing = 6;

    // Center circle
    for (let i = 0; i < 64; i++) {
      const angle = (i / 64) * 2 * Math.PI;
      points.push({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      });
    }

    // Rings
    for (let ring = 1; ring <= rings; ring++) {
      const ringRadius = radius * ring * SacredGeometryEngine.PHI_INVERSE;
      for (let circle = 0; circle < circlesPerRing * ring; circle++) {
        const angle = (circle / (circlesPerRing * ring)) * 2 * Math.PI;
        const circleCenter = {
          x: center.x + ringRadius * Math.cos(angle),
          y: center.y + ringRadius * Math.sin(angle)
        };

        for (let i = 0; i < 32; i++) {
          const pointAngle = (i / 32) * 2 * Math.PI;
          points.push({
            x: circleCenter.x + radius * Math.cos(pointAngle),
            y: circleCenter.y + radius * Math.sin(pointAngle)
          });
        }
      }
    }

    return points;
  }

  // Calculate PHI-based proportions
  public static calculatePhiProportion(value: number, direction: 'up' | 'down' = 'up'): number {
    return direction === 'up'
      ? value * SacredGeometryEngine.PHI
      : value * SacredGeometryEngine.PHI_INVERSE;
  }

  // Generate pattern for specific system (Arcana, Gate, etc.)
  public static generatePatternForSystem(systemType: 'arcana' | 'gate' | 'codex' | 'chapel' | 'room', id: number): SacredGeometryPattern {
    const fibonacci = SacredGeometryEngine.generateFibonacci(12);
    const center: SacredGeometryPoint = { x: 0, y: 0 };

    let pattern: SacredGeometryPattern;

    switch (systemType) {
      case 'arcana':
        pattern = {
          name: `Arcana ${id} Pattern`,
          points: SacredGeometryEngine.generatePentagram(center, 100),
          connections: [[0, 2], [2, 4], [4, 1], [1, 3], [3, 0]],
          phi_ratio: SacredGeometryEngine.PHI,
          fibonacci_sequence: fibonacci
        };
        break;

      case 'gate':
        pattern = {
          name: `Gate ${id} Pattern`,
          points: SacredGeometryEngine.generateGoldenSpiral(center, 3, 64),
          connections: [],
          phi_ratio: SacredGeometryEngine.PHI,
          fibonacci_sequence: fibonacci
        };
        break;

      case 'codex':
        pattern = {
          name: `Codex ${id} Pattern`,
          points: SacredGeometryEngine.generateVesicaPiscis(center, 100),
          connections: [],
          phi_ratio: SacredGeometryEngine.PHI,
          fibonacci_sequence: fibonacci
        };
        break;

      case 'chapel':
        pattern = {
          name: `Chapel ${id} Pattern`,
          points: SacredGeometryEngine.generateFlowerOfLife(center, 50, 2),
          connections: [],
          phi_ratio: SacredGeometryEngine.PHI,
          fibonacci_sequence: fibonacci
        };
        break;

      case 'room':
        pattern = {
          name: `Room ${id} Pattern`,
          points: SacredGeometryEngine.generateGoldenSpiral(center, 2, 32),
          connections: [],
          phi_ratio: SacredGeometryEngine.PHI,
          fibonacci_sequence: fibonacci
        };
        break;
    }

    return pattern;
  }
}

export default SacredGeometryEngine;

