/**
 * 🎨✨ VISUALIZATION ENGINE
 *
 * Advanced 3D visualization for all Cathedral systems.
 * Integrates sacred geometry, consciousness mapping, and fractal patterns.
 *
 * @license CC0-1.0 - Public Domain
 */

import SacredGeometryEngine, { SacredGeometryPoint, SacredGeometryPattern } from './sacred-geometry-engine';
import ConsciousnessMapper from './consciousness-mapper';

export interface VisualizationConfig {
  systemType: 'arcana' | 'gate' | 'codex' | 'chapel' | 'room';
  systemId: number;
  consciousnessLevel: number;
  colorScheme: 'consciousness' | 'sacred' | 'custom';
  customColors?: string[];
  dimensions: '2d' | '3d';
  animation: boolean;
}

export interface VisualizationData {
  points: SacredGeometryPoint[];
  connections: number[][];
  colors: string[];
  metadata: {
    pattern: SacredGeometryPattern;
    consciousness: ReturnType<typeof ConsciousnessMapper.mapConsciousness>;
    systemInfo: string;
  };
}

export class VisualizationEngine {
  // Generate visualization for a system
  public static generateVisualization(config: VisualizationConfig): VisualizationData {
    // Generate sacred geometry pattern
    const pattern = SacredGeometryEngine.generatePatternForSystem(config.systemType, config.systemId);

    // Map consciousness level
    const consciousness = ConsciousnessMapper.mapConsciousness(config.consciousnessLevel);

    // Generate colors based on scheme
    const colors = VisualizationEngine.generateColors(config, consciousness);

    // Generate 3D points if needed
    let points = pattern.points;
    if (config.dimensions === '3d') {
      points = VisualizationEngine.elevateTo3D(points, config.consciousnessLevel);
    }

    return {
      points: points,
      connections: pattern.connections,
      colors: colors,
      metadata: {
        pattern: pattern,
        consciousness: consciousness,
        systemInfo: `${config.systemType}_${config.systemId}`
      }
    };
  }

  // Generate colors based on scheme
  private static generateColors(config: VisualizationConfig, consciousness: ReturnType<typeof ConsciousnessMapper.mapConsciousness>): string[] {
    switch (config.colorScheme) {
      case 'consciousness':
        return VisualizationEngine.generateConsciousnessColors(consciousness);
      case 'sacred':
        return VisualizationEngine.generateSacredColors(config.systemId);
      case 'custom':
        return config.customColors || ['#ffffff'];
      default:
        return ['#ffffff'];
    }
  }

  // Generate colors based on consciousness level
  private static generateConsciousnessColors(consciousness: ReturnType<typeof ConsciousnessMapper.mapConsciousness>): string[] {
    const baseColor = consciousness.color;
    const colors: string[] = [baseColor];

    // Generate gradient
    for (let i = 1; i < 5; i++) {
      const alpha = 1 - (i * 0.2);
      colors.push(VisualizationEngine.adjustColorAlpha(baseColor, alpha));
    }

    return colors;
  }

  // Generate sacred colors using golden ratio
  private static generateSacredColors(systemId: number): string[] {
    const phi = SacredGeometryEngine.PHI;
    const colors: string[] = [];

    // Generate colors using PHI-based hue rotation
    for (let i = 0; i < 8; i++) {
      const hue = (systemId * phi * i * 45) % 360;
      const saturation = 70 + (i * 5);
      const lightness = 50 + (i * 5);
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
  }

  // Elevate 2D points to 3D using consciousness level
  private static elevateTo3D(points: SacredGeometryPoint[], consciousnessLevel: number): SacredGeometryPoint[] {
    const zScale = consciousnessLevel / 999; // Normalize to 0-1

    return points.map((point, index) => {
      // Use golden ratio for z-coordinate variation
      const phi = SacredGeometryEngine.PHI;
      const z = Math.sin(index * phi) * zScale * 100;

      return {
        x: point.x,
        y: point.y,
        z: z
      };
    });
  }

  // Generate animation frames
  public static generateAnimationFrames(visualization: VisualizationData, frameCount: number): VisualizationData[] {
    const frames: VisualizationData[] = [];

    for (let frame = 0; frame < frameCount; frame++) {
      const progress = frame / frameCount;
      const phi = SacredGeometryEngine.PHI;

      // Rotate points around center
      const rotatedPoints = visualization.points.map(point => {
        const angle = progress * 2 * Math.PI * phi;
        const distance = Math.sqrt(point.x * point.x + point.y * point.y);
        const originalAngle = Math.atan2(point.y, point.x);

        return {
          x: distance * Math.cos(originalAngle + angle),
          y: distance * Math.sin(originalAngle + angle),
          z: point.z
        };
      });

      frames.push({
        ...visualization,
        points: rotatedPoints
      });
    }

    return frames;
  }

  // Adjust color alpha (for gradients)
  private static adjustColorAlpha(color: string, alpha: number): string {
    // Convert hex to rgba
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // If already rgba/rgb, extract and modify
    const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
    }

    return color;
  }

  // Generate visualization for all systems of a type
  public static generateSystemVisualizations(
    systemType: 'arcana' | 'gate' | 'codex' | 'chapel' | 'room',
    count: number,
    consciousnessLevel: number
  ): VisualizationData[] {
    const visualizations: VisualizationData[] = [];

    for (let i = 0; i < count; i++) {
      visualizations.push(VisualizationEngine.generateVisualization({
        systemType: systemType,
        systemId: i,
        consciousnessLevel: consciousnessLevel,
        colorScheme: 'consciousness',
        dimensions: '3d',
        animation: true
      }));
    }

    return visualizations;
  }
}

export default VisualizationEngine;

