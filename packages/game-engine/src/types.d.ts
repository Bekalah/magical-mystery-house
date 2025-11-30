/**
 * types.d
 * 
 * @package @cathedral/game-engine
 */
/**
 * 🏛️✨ CATHEDRAL GAME ENGINE - TYPE DECLARATIONS
 *
 * TypeScript declarations for the native ES game engine
 * Provides type safety for React integration
 */

/**
 * ⚗️ GameState - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface GameState {
  isInitialized: boolean;
  currentNode: any;
  activeCharacter: any;
  progression: any;
  traumaSafety: any;
  availableNodes?: number[];
}

/**
 * ⚗️ GameEngine - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface GameEngine {
  initialize(): Promise<void>;
  startGame(): Promise<any>;
  selectArcanae(arcanaeId: string): Promise<any>;
  navigateToNode(nodeId: number): Promise<any>;
  activateFusionKink(node1Id: number, node2Id: number): Promise<any>;
  getGameState(): GameState;
  gameState: {
    emergencyExit(): void;
  };
}

/**
 * ⚗️ CodexGameEngine - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * earth energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Earth
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface CodexGameEngine extends GameEngine {
  nodeManager: any;
  characterSystem: any;
  geometryRenderer: any;
}

export declare function createCathedralGame(): Promise<CodexGameEngine>;
export declare function startRoyalInitiatePath(): Promise<CodexGameEngine>;
