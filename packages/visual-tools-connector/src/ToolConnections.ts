/**
 * 🔗 Tool Connections
 * 
 * Connects visual tools together
 * 
 * @license CC0-1.0 - Public Domain
 */

import { VISUAL_TOOLS, VisualTool } from './VisualToolsMap';

/**
 * ⚗️ ToolConnection - The Principle
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
export interface ToolConnection {
  from: string;
  to: string;
  type: 'imports' | 'extends' | 'uses' | 'generates' | 'transforms';
  description: string;
}

/**
 * Connection map between tools
 */
export const TOOL_CONNECTIONS: ToolConnection[] = [
  // Visual Engine connections
  {
    from: 'cathedral-visual-engine',
    to: 'visionary-design-system',
    type: 'uses',
    description: 'Uses design tokens and components from visionary design system'
  },
  {
    from: 'cathedral-visual-engine',
    to: 'divine-design-core',
    type: 'uses',
    description: 'Uses divine design tokens and color alchemy'
  },
  {
    from: 'cathedral-visual-engine',
    to: 'fractal-flames-daemon-deity',
    type: 'generates',
    description: 'Generates fractal visuals using fractal flames'
  },
  
  // Design System connections
  {
    from: 'visionary-design-system',
    to: 'cathedral-design-library',
    type: 'extends',
    description: 'Extends design library with visionary components'
  },
  {
    from: 'visionary-design-system',
    to: 'divine-design-core',
    type: 'uses',
    description: 'Uses divine design principles and tokens'
  },
  
  // Design Library connections
  {
    from: 'cathedral-design-library',
    to: 'visionary-design-system',
    type: 'uses',
    description: 'Uses visionary design system components'
  },
  {
    from: 'cathedral-design-library',
    to: 'design-mathematics-core',
    type: 'uses',
    description: 'Uses design mathematics for sacred geometry'
  },
  
  // Art Engine connections
  {
    from: 'art-engine-core',
    to: 'art-standards-core',
    type: 'uses',
    description: 'Validates art against museum-grade standards'
  },
  {
    from: 'art-engine-core',
    to: 'codex-144-99',
    type: 'generates',
    description: 'Generates art from Codex144 nodes'
  },
  {
    from: 'art-engine-core',
    to: 'professional-vector-engine',
    type: 'uses',
    description: 'Uses vector engine for SVG generation'
  },
  
  // Art Standards connections
  {
    from: 'art-standards-core',
    to: 'sacred-mathematics-core',
    type: 'uses',
    description: 'Uses sacred mathematics for geometry validation'
  },
  
  // Divine Design connections
  {
    from: 'divine-design-core',
    to: 'body-of-god-core',
    type: 'uses',
    description: 'Uses Body of God structure for design mapping'
  },
  {
    from: 'divine-design-core',
    to: 'sacred-geometry-core',
    type: 'uses',
    description: 'Uses sacred geometry for proportions'
  },
  
  // Body of God connections
  {
    from: 'body-of-god-core',
    to: 'fractal-flames-daemon-deity',
    type: 'connects',
    description: 'Connects fractals to Tree of Life structure'
  },
  {
    from: 'body-of-god-core',
    to: 'cathedral-audio-synthesis',
    type: 'connects',
    description: 'Connects sound to Tree of Life structure'
  },
  
  // Typography connections
  {
    from: 'professional-typography-engine',
    to: 'visionary-design-system',
    type: 'uses',
    description: 'Uses design system for typography scales'
  },
  
  // Vector connections
  {
    from: 'professional-vector-engine',
    to: 'art-engine-core',
    type: 'generates',
    description: 'Generates vector graphics for art engine'
  },
  
  // 3D connections
  {
    from: 'three-engine',
    to: 'cathedral-visual-engine',
    type: 'extends',
    description: 'Extends visual engine with 3D capabilities'
  },
  
  // Godot connections
  {
    from: 'godot-design-studio',
    to: 'visionary-design-system',
    type: 'uses',
    description: 'Uses visionary design system in Godot'
  },
  {
    from: 'godot-design-studio',
    to: 'cathedral-design-library',
    type: 'uses',
    description: 'Uses design library components in Godot'
  }
];

/**
 * Get connections for a tool
 */
/**
 * ⚗️ GetConnectionsForTool - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getConnectionsForTool(packageName: string): {
  incoming: ToolConnection[];
  outgoing: ToolConnection[];
} {
  return {
    incoming: TOOL_CONNECTIONS.filter(c => c.to === packageName),
    outgoing: TOOL_CONNECTIONS.filter(c => c.from === packageName)
  };
}

/**
 * Get connection path between two tools
 */
/**
 * ⚗️ GetConnectionPath - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getConnectionPath(from: string, to: string): ToolConnection[] {
  const path: ToolConnection[] = [];
  const visited = new Set<string>();
  
  function findPath(current: string, target: string): boolean {
    if (current === target) return true;
    if (visited.has(current)) return false;
    visited.add(current);
    
    const outgoing = TOOL_CONNECTIONS.filter(c => c.from === current);
    for (const conn of outgoing) {
      path.push(conn);
      if (findPath(conn.to, target)) {
        return true;
      }
      path.pop();
    }
    
    return false;
  }
  
  findPath(from, to);
  return path;
}

