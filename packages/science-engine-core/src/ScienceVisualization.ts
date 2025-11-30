/**
 * Science Visualization - Advanced Visualization Tools
 * 
 * Advanced visualization features for Science Engine
 * Includes interactive charts, 3D visualizations, and real-time data display
 * 
 * @license CC0-1.0 - Public Domain
 */

import type { DataPoint, Visualization } from './ScienceEngine';
import { SACRED_MATH } from '../../sacred-mathematics-core/src/index';

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
  sacredRatio: number;
}

export interface Dataset {
  label: string;
  data: number[];
  color: string;
  consciousnessLevel: number;
}

export interface InteractiveVisualization {
  type: 'interactive-chart' | '3d-scatter' | 'network-graph' | 'sacred-geometry-plot';
  data: any;
  interactions: Interaction[];
  sacredRatio: number;
}

export interface Interaction {
  type: 'zoom' | 'pan' | 'filter' | 'select' | 'animate';
  enabled: boolean;
  parameters: Record<string, any>;
}

/**
 * Science Visualization Tools
 */
export class ScienceVisualizationTools {
  private readonly GOLDEN_RATIO = SACRED_MATH.PHI;
  private readonly RATIO_144_99 = SACRED_MATH.CATHEDRAL_RATIO;
  // FIBONACCI available via SACRED_MATH.FIBONACCI if needed

  /**
   * Generate chart data from data points
   */
  public generateChartData(
    dataPoints: DataPoint[],
    valueKey: string,
    consciousnessLevel: number
  ): ChartData {
    const labels: string[] = [];
    const data: number[] = [];

    for (const point of dataPoints) {
      const timestamp = new Date(point.timestamp).toLocaleTimeString();
      labels.push(timestamp);
      
      const value = point.values[valueKey];
      data.push(typeof value === 'number' ? value : 0);
    }

    // Generate color based on consciousness level
    const hue = (consciousnessLevel / 21) * 360;
    const color = this.hueToHex(hue, 70, 50);

    const datasets: Dataset[] = [{
      label: valueKey,
      data,
      color,
      consciousnessLevel
    }];

    return {
      labels,
      datasets,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Create interactive visualization
   */
  public createInteractive(
    visualization: Visualization,
    consciousnessLevel: number
  ): InteractiveVisualization {
    const interactions: Interaction[] = [];

    // Add interactions based on consciousness level
    if (consciousnessLevel >= 14) {
      interactions.push({
        type: 'zoom',
        enabled: true,
        parameters: { minZoom: 0.1, maxZoom: 10 }
      });
      interactions.push({
        type: 'pan',
        enabled: true,
        parameters: { bounds: 'unlimited' }
      });
    }

    if (consciousnessLevel >= 10) {
      interactions.push({
        type: 'filter',
        enabled: true,
        parameters: { filterType: 'sacred-geometry' }
      });
    }

    if (consciousnessLevel >= 7) {
      interactions.push({
        type: 'select',
        enabled: true,
        parameters: { multiSelect: true }
      });
    }

    // Determine visualization type
    let type: InteractiveVisualization['type'] = 'interactive-chart';
    if (consciousnessLevel >= 17) {
      type = 'sacred-geometry-plot';
    } else if (consciousnessLevel >= 14) {
      type = 'network-graph';
    } else if (consciousnessLevel >= 10) {
      type = '3d-scatter';
    }

    return {
      type,
      data: visualization.data,
      interactions,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Generate 3D scatter plot data
   */
  public generate3DScatter(
    dataPoints: DataPoint[],
    xKey: string,
    yKey: string,
    zKey: string
  ): {
    points: Array<{ x: number; y: number; z: number; color: string }>;
    sacredRatio: number;
  } {
    const points: Array<{ x: number; y: number; z: number; color: string }> = [];

    for (const point of dataPoints) {
      const x = typeof point.values[xKey] === 'number' ? point.values[xKey] : 0;
      const y = typeof point.values[yKey] === 'number' ? point.values[yKey] : 0;
      const z = typeof point.values[zKey] === 'number' ? point.values[zKey] : 0;

      // Color based on position using golden ratio
      const hue = ((x + y + z) * this.GOLDEN_RATIO) % 360;
      const color = this.hueToHex(hue, 70, 50);

      points.push({ x, y, z, color });
    }

    return {
      points,
      sacredRatio: this.RATIO_144_99
    };
  }

  /**
   * Convert hue to hex color
   */
  private hueToHex(h: number, s: number, l: number): string {
    const hNorm = h / 360;
    const c = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100);
    const x = c * (1 - Math.abs((hNorm * 6) % 2 - 1));
    const m = (l / 100) - c / 2;

    let r = 0, g = 0, b = 0;
    if (hNorm < 1/6) {
      r = c; g = x; b = 0;
    } else if (hNorm < 2/6) {
      r = x; g = c; b = 0;
    } else if (hNorm < 3/6) {
      r = 0; g = c; b = x;
    } else if (hNorm < 4/6) {
      r = 0; g = x; b = c;
    } else if (hNorm < 5/6) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}

