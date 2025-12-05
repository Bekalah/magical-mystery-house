/**
 * 🎨 Unified Visual System
 * 
 * Unified interface for all visual and design tools
 * 
 * @license CC0-1.0 - Public Domain
 */

import { VISUAL_TOOLS, VisualTool } from './VisualToolsMap';
import { TOOL_CONNECTIONS, ToolConnection } from './ToolConnections';

/**
 * ⚗️ UnifiedVisualConfig - The Principle
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
export interface UnifiedVisualConfig {
  shimmering: boolean;
  fractals: boolean;
  cosmic: boolean;
  technicolor: boolean;
  animations: boolean;
  sacredGeometry: boolean;
}

/**
 * Unified Visual System
 * 
 * Connects all visual tools together into a single system
 */
/**
 * ⚗️ UnifiedVisualSystem - The Crucible
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
export class UnifiedVisualSystem {
  private config: UnifiedVisualConfig;
  
  constructor(config: Partial<UnifiedVisualConfig> = {}) {
    this.config = {
      shimmering: true,
      fractals: true,
      cosmic: true,
      technicolor: true,
      animations: true,
      sacredGeometry: true,
      ...config
    };
  }
  
  /**
   * Generate complete visual system CSS
   */
  async generateVisualCSS(): Promise<string> {
    const css: string[] = [];
    
    // Import from visual engine
    if (this.config.shimmering || this.config.fractals || this.config.cosmic || this.config.technicolor) {
      try {
        const { generateCompleteVisualSystem } = await import('@cathedral/cathedral-visual-engine');
        css.push(generateCompleteVisualSystem());
      } catch (e) {
        console.warn('Could not import visual engine:', e);
      }
    }
    
    // Import from divine design
    if (this.config.sacredGeometry) {
      try {
        const { generateTechnicolorCSS } = await import('@cathedral/divine-design-core');
        // css.push(generateTechnicolorCSS());
      } catch (e) {
        console.warn('Could not import divine design:', e);
      }
    }
    
    return css.join('\n\n');
  }
  
  /**
   * Generate art using art engine
   */
  async generateArt(config: {
    nodes: number;
    pattern: 'mandala' | 'spiral' | 'tree' | 'flame' | 'snowflake';
    colors: string[];
  }): Promise<string> {
    try {
      const { generateFractalSVG } = await import('@cathedral/cathedral-visual-engine');
      return generateFractalSVG({
        iterations: config.nodes,
        scale: 15,
        rotation: 0,
        colors: config.colors,
        pattern: config.pattern
      });
    } catch (e) {
      console.error('Could not generate art:', e);
      return '';
    }
  }
  
  /**
   * Get all available tools
   */
  getAvailableTools(): VisualTool[] {
    return Object.values(VISUAL_TOOLS);
  }
  
  /**
   * Get tool connections
   */
  getToolConnections(packageName: string): {
    incoming: ToolConnection[];
    outgoing: ToolConnection[];
  } {
    return {
      incoming: TOOL_CONNECTIONS.filter(c => c.to === packageName),
      outgoing: TOOL_CONNECTIONS.filter(c => c.from === packageName)
    };
  }
  
  /**
   * Validate tool connections
   */
  validateConnections(): {
    valid: string[];
    invalid: string[];
    missing: string[];
  } {
    const valid: string[] = [];
    const invalid: string[] = [];
    const missing: string[] = [];
    
    for (const conn of TOOL_CONNECTIONS) {
      const fromTool = Object.values(VISUAL_TOOLS).find(t => t.package.includes(conn.from));
      const toTool = Object.values(VISUAL_TOOLS).find(t => t.package.includes(conn.to));
      
      if (fromTool && toTool) {
        valid.push(`${conn.from} -> ${conn.to}`);
      } else {
        if (!fromTool) missing.push(conn.from);
        if (!toTool) missing.push(conn.to);
        invalid.push(`${conn.from} -> ${conn.to}`);
      }
    }
    
    return { valid, invalid, missing };
  }
}

