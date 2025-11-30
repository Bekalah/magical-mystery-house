/**
 * package-registry
 * 
 * @package @cathedral/shared
 */
/**
 * Package Registry
 * 
 * Central registry of all Cathedral packages
 * Ensures proper cross-package discovery and connections
 */

export interface PackageInfo {
  name: string;
  path: string;
  type: 'package' | 'app';
  description: string;
  dependencies: string[];
  exports: string[];
  connections: string[];
}

/**
 * Complete Package Registry
 */
export const PACKAGE_REGISTRY: Record<string, PackageInfo> = {
  // Core Trinity
  '@cathedral/circuitum99': {
    name: '@cathedral/circuitum99',
    path: 'packages/circuitum99',
    type: 'package',
    description: 'Soul - 99 gates, 33 chapters',
    dependencies: ['@cathedral/codex-144-99', '@cathedral/shared'],
    exports: ['index.js', 'src/33-chapters.ts', 'src/fable-rpg-mechanics.ts'],
    connections: ['@cathedral/liber-arcanae', '@cathedral/stone-grimoire']
  },
  
  '@cathedral/stone-grimoire': {
    name: '@cathedral/stone-grimoire',
    path: 'packages/stone-grimoire',
    type: 'package',
    description: 'Body - 8 chapels, 144 folios',
    dependencies: ['@cathedral/shared'],
    exports: ['index.js', 'src/chapels.ts'],
    connections: ['@cathedral/circuitum99', '@cathedral/cosmogenesis-learning-engine']
  },
  
  '@cathedral/cosmogenesis-learning-engine': {
    name: '@cathedral/cosmogenesis-learning-engine',
    path: 'packages/cosmogenesis-learning-engine',
    type: 'package',
    description: 'Spirit/Brain - 144 nodes, learning engine',
    dependencies: ['@cathedral/codex-144-99', '@cathedral/shared'],
    exports: ['index.js'],
    connections: ['@cathedral/circuitum99', '@cathedral/stone-grimoire']
  },
  
  // Sacred Knowledge
  '@cathedral/codex-144-99': {
    name: '@cathedral/codex-144-99',
    path: 'packages/codex-144-99',
    type: 'package',
    description: 'Complete 144-node system',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js', 'src/complete-codex.ts', 'src/complete-interconnection.ts'],
    connections: ['@cathedral/liber-arcanae', '@cathedral/circuitum99']
  },
  
  '@cathedral/liber-arcanae': {
    name: '@cathedral/liber-arcanae',
    path: 'packages/liber-arcanae',
    type: 'package',
    description: 'Complete 78-card tarot',
    dependencies: ['@cathedral/codex-144-99', '@cathedral/shared'],
    exports: ['dist/index.js', 'src/complete-tarot-system.ts'],
    connections: ['@cathedral/codex-144-99', '@cathedral/circuitum99']
  },
  
  '@cathedral/tesseract-bridge': {
    name: '@cathedral/tesseract-bridge',
    path: 'packages/tesseract-bridge',
    type: 'package',
    description: 'Integration bridge',
    dependencies: ['@cathedral/shared'],
    exports: ['index.js'],
    connections: ['@cathedral/circuitum99', '@cathedral/stone-grimoire']
  },
  
  // Creative Systems
  '@cathedral/violet-flame-transmutation': {
    name: '@cathedral/violet-flame-transmutation',
    path: 'packages/violet-flame-transmutation',
    type: 'package',
    description: 'Universal transmutation',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/game-music-integration', '@cathedral/fractal-sound-game-bridge']
  },
  
  '@cathedral/game-music-integration': {
    name: '@cathedral/game-music-integration',
    path: 'packages/game-music-integration',
    type: 'package',
    description: 'Game + Music sync',
    dependencies: ['@cathedral/synth', '@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/violet-flame-transmutation', '@cathedral/fractal-sound-game-bridge']
  },
  
  '@cathedral/fractal-sound-game-bridge': {
    name: '@cathedral/fractal-sound-game-bridge',
    path: 'packages/fractal-sound-game-bridge',
    type: 'package',
    description: 'Unified fractal/sound/game',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/violet-flame-transmutation', '@cathedral/game-music-integration']
  },
  
  '@cathedral/professional-design-suite': {
    name: '@cathedral/professional-design-suite',
    path: 'packages/professional-design-suite',
    type: 'package',
    description: 'Complete design system',
    dependencies: ['@cathedral/visionary-art-colors', '@cathedral/visionary-art-textures', '@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/fusionkink-design-system']
  },
  
  // Visionary Art
  '@cathedral/visionary-art-colors': {
    name: '@cathedral/visionary-art-colors',
    path: 'packages/visionary-art-colors',
    type: 'package',
    description: 'Master color palettes',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/visionary-art-textures', '@cathedral/professional-design-suite']
  },
  
  '@cathedral/visionary-art-textures': {
    name: '@cathedral/visionary-art-textures',
    path: 'packages/visionary-art-textures',
    type: 'package',
    description: 'Master textures and tools',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/visionary-art-colors', '@cathedral/professional-design-suite']
  },
  
  '@cathedral/fusionkink-design-system': {
    name: '@cathedral/fusionkink-design-system',
    path: 'packages/fusionkink-design-system',
    type: 'package',
    description: 'GitHub-compatible design',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js', 'dist/fusionkink.css'],
    connections: ['@cathedral/professional-design-suite']
  },
  
  // RPG & Game
  '@cathedral/fable-rpg-mechanics': {
    name: '@cathedral/fable-rpg-mechanics',
    path: 'packages/fable-rpg-mechanics',
    type: 'package',
    description: 'RPG mechanics',
    dependencies: ['@cathedral/circuitum99', '@cathedral/liber-arcanae', '@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/unified-canon-system']
  },
  
  '@cathedral/unified-canon-system': {
    name: '@cathedral/unified-canon-system',
    path: 'packages/unified-canon-system',
    type: 'package',
    description: 'Unified canon system',
    dependencies: ['@cathedral/codex-144-99', '@cathedral/liber-arcanae', '@cathedral/circuitum99', '@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/fable-rpg-mechanics']
  },
  
  // Navigation
  '@cathedral/magical-mystery-house': {
    name: '@cathedral/magical-mystery-house',
    path: 'packages/magical-mystery-house',
    type: 'package',
    description: 'Navigation system',
    dependencies: ['@cathedral/shared'],
    exports: ['src/index.ts', 'src/rooms.ts', 'src/asset-manifest.ts', 'src/asset-loader.ts'],
    connections: ['@cathedral/circuitum99', '@cathedral/stone-grimoire', '@cathedral/cosmogenesis-learning-engine']
  },
  
  // Core Intelligence
  '@cathedral/brain': {
    name: '@cathedral/brain',
    path: 'packages/brain',
    type: 'package',
    description: 'Core intelligence',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/cosmogenesis-learning-engine']
  },
  
  '@cathedral/synth': {
    name: '@cathedral/synth',
    path: 'packages/synth',
    type: 'package',
    description: 'Audio synthesis library',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/game-music-integration']
  },
  
  '@cathedral/art-generation-node': {
    name: '@cathedral/art-generation-node',
    path: 'packages/art-generation-node',
    type: 'package',
    description: 'Art generation',
    dependencies: ['@cathedral/shared'],
    exports: ['dist/index.js'],
    connections: ['@cathedral/visionary-art-colors', '@cathedral/visionary-art-textures']
  },
  
  // Shared
  '@cathedral/shared': {
    name: '@cathedral/shared',
    path: 'packages/shared',
    type: 'package',
    description: 'Shared utilities',
    dependencies: [],
    exports: ['dist/index.js', 'src/cross-package-exports.ts', 'src/package-registry.ts'],
    connections: [] // Base package, no dependencies
  }
};

/**
 * Get package info
 */
export function getPackageInfo(packageName: string): PackageInfo | undefined {
  return PACKAGE_REGISTRY[packageName];
}

/**
 * Get all packages
 */
export function getAllPackages(): PackageInfo[] {
  return Object.values(PACKAGE_REGISTRY);
}

/**
 * Get packages by type
 */
export function getPackagesByType(type: 'package' | 'app'): PackageInfo[] {
  return Object.values(PACKAGE_REGISTRY).filter(pkg => pkg.type === type);
}

/**
 * Get package connections
 */
export function getPackageConnections(packageName: string): PackageInfo[] {
  const pkg = PACKAGE_REGISTRY[packageName];
  if (!pkg) return [];
  
  return pkg.connections
    .map(conn => PACKAGE_REGISTRY[conn])
    .filter(Boolean) as PackageInfo[];
}

/**
 * Verify all package dependencies exist
 */
export function verifyPackageDependencies(): {
  valid: boolean;
  missing: Array<{ package: string; missing: string[] }>;
} {
  const missing: Array<{ package: string; missing: string[] }> = [];
  
  Object.values(PACKAGE_REGISTRY).forEach(pkg => {
    const missingDeps = pkg.dependencies.filter(dep => !PACKAGE_REGISTRY[dep]);
    if (missingDeps.length > 0) {
      missing.push({ package: pkg.name, missing: missingDeps });
    }
  });
  
  return {
    valid: missing.length === 0,
    missing
  };
}
