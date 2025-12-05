/**
 * 🗺️ Visual Tools Map
 * 
 * Complete mapping of all visual and design tools
 * 
 * @license CC0-1.0 - Public Domain
 */

/**
 * ⚗️ VisualTool - The Principle
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
export interface VisualTool {
  name: string;
  package: string;
  category: 'visual' | 'design' | 'art' | 'typography' | 'vector' | 'threeD' | 'fractal';
  purpose: string;
  features: string[];
  connections: string[];
  status: 'working' | 'needs-build' | 'needs-src' | 'needs-fix';
}

export const VISUAL_TOOLS: Record<string, VisualTool> = {
  'cathedral-visual-engine': {
    name: 'Cathedral Visual Engine',
    package: '@cathedral/cathedral-visual-engine',
    category: 'visual',
    purpose: 'High-end visual system with shimmering, fractals, cosmic harmony',
    features: [
      'Shimmering effects',
      'Fractal visuals',
      'Cosmic backgrounds',
      'Technicolor palette',
      'Animations'
    ],
    connections: ['visionary-design-system', 'divine-design-core'],
    status: 'working'
  },
  
  'visionary-design-system': {
    name: 'Visionary Design System',
    package: '@cathedral/visionary-design-system',
    category: 'design',
    purpose: 'Core design system for Cathedral',
    features: [
      'Design tokens',
      'Component system',
      'Sacred geometry'
    ],
    connections: ['cathedral-design-library', 'divine-design-core'],
    status: 'working'
  },
  
  'cathedral-design-library': {
    name: 'Cathedral Design Library',
    package: '@cathedral/cathedral-design-library',
    category: 'design',
    purpose: 'Figma-style design system with sacred mathematics',
    features: [
      'Design components',
      'Design canvas',
      'Sacred grids',
      'Design workflows'
    ],
    connections: ['visionary-design-system', 'design-mathematics-core'],
    status: 'working'
  },
  
  'art-engine-core': {
    name: 'Art Engine Core',
    package: '@cathedral/art-engine-core',
    category: 'art',
    purpose: 'Art generation from Codex144 using sacred geometry',
    features: [
      'Art node generation',
      'Sacred geometry shapes',
      'Color palettes',
      'Pattern generation',
      'SVG rendering'
    ],
    connections: ['art-standards-core', 'codex-144-99'],
    status: 'working'
  },
  
  'art-standards-core': {
    name: 'Art Standards Core',
    package: '@cathedral/art-standards-core',
    category: 'art',
    purpose: 'Museum-grade art quality standards',
    features: [
      'Art standards',
      'Color standards',
      'Quality validation',
      'Sacred geometry compliance'
    ],
    connections: ['art-engine-core', 'sacred-mathematics-core'],
    status: 'working'
  },
  
  'divine-design-core': {
    name: 'Divine Design Core',
    package: '@cathedral/divine-design-core',
    category: 'design',
    purpose: 'Alchemy, Hermeticism & Sacred Architecture design system',
    features: [
      'Alchemical stages',
      'Sephirothic architecture',
      'Hermetic principles',
      'Fusion kink',
      'Sacred geometry',
      'Color alchemy',
      'Design tokens'
    ],
    connections: ['body-of-god-core', 'cathedral-visual-engine'],
    status: 'working'
  },
  
  'body-of-god-core': {
    name: 'Body of God Core',
    package: '@cathedral/body-of-god-core',
    category: 'design',
    purpose: 'Tree of Life (Sephiroth) technical implementation',
    features: [
      'Sephiroth mapping',
      'Paths between sephiroth',
      'Energy flow',
      'Tech mapping',
      'Fractal connections',
      'Sound connections',
      'Circuitum99 connections'
    ],
    connections: ['divine-design-core', 'fractal-flames-daemon-deity'],
    status: 'working'
  },
  
  'fractal-flames-daemon-deity': {
    name: 'Fractal Flames Daemon Deity',
    package: '@cathedral/fractal-flames-daemon-deity',
    category: 'fractal',
    purpose: 'Fractal flames with elements, daimons, and deities',
    features: [
      'Fractal flame generation',
      'Elemental fractals',
      'Daemon/deity forms',
      'Sacred geometry fractals'
    ],
    connections: ['body-of-god-core', 'cathedral-visual-engine'],
    status: 'working'
  },
  
  'professional-typography-engine': {
    name: 'Professional Typography Engine',
    package: '@cathedral/professional-typography-engine',
    category: 'typography',
    purpose: 'Professional typography system',
    features: [
      'Font management',
      'Typography scales',
      'Text rendering',
      'Sacred proportions'
    ],
    connections: ['visionary-design-system'],
    status: 'needs-build'
  },
  
  'professional-vector-engine': {
    name: 'Professional Vector Engine',
    package: '@cathedral/professional-vector-engine',
    category: 'vector',
    purpose: 'Vector graphics system',
    features: [
      'SVG generation',
      'Vector paths',
      'Shape creation',
      'Vector manipulation'
    ],
    connections: ['art-engine-core'],
    status: 'needs-build'
  },
  
  'three-engine': {
    name: 'Three Engine',
    package: '@cathedral/three-engine',
    category: 'threeD',
    purpose: 'Three.js wrapper for 3D visualizations',
    features: [
      '3D rendering',
      'WebGL support',
      'Scene management',
      '3D objects'
    ],
    connections: ['cathedral-visual-engine'],
    status: 'needs-build'
  },
  
  'godot-design-studio': {
    name: 'Godot Design Studio',
    package: '@cathedral/godot-design-studio',
    category: 'threeD',
    purpose: 'Figma-like design tools for Godot',
    features: [
      'Design tools',
      'UI components',
      'Trauma-safe design',
      'Sacred geometry'
    ],
    connections: ['visionary-design-system', 'cathedral-design-library'],
    status: 'working'
  }
};

/**
 * Get tool by package name
 */
/**
 * ⚗️ GetTool - Solve et Coagula
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
export function getTool(packageName: string): VisualTool | null {
  const key = Object.keys(VISUAL_TOOLS).find(
    k => VISUAL_TOOLS[k].package === packageName || VISUAL_TOOLS[k].package.includes(packageName)
  );
  return key ? VISUAL_TOOLS[key] : null;
}

/**
 * Get tools by category
 */
/**
 * ⚗️ GetToolsByCategory - Solve et Coagula
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
export function getToolsByCategory(category: VisualTool['category']): VisualTool[] {
  return Object.values(VISUAL_TOOLS).filter(t => t.category === category);
}

/**
 * Get all connected tools
 */
/**
 * ⚗️ GetConnectedTools - Solve et Coagula
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
export function getConnectedTools(packageName: string): VisualTool[] {
  const tool = getTool(packageName);
  if (!tool) return [];
  
  return tool.connections
    .map(conn => getTool(conn))
    .filter((t): t is VisualTool => t !== null);
}

