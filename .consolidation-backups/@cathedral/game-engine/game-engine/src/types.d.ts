/**
 * 🏛️✨ CATHEDRAL GAME ENGINE - TYPE DECLARATIONS
 *
 * TypeScript declarations for the native ES game engine
 * Provides type safety for React integration
 */

export interface GameState {
  isInitialized: boolean;
  currentNode: any;
  activeCharacter: any;
  progression: any;
  traumaSafety: any;
  availableNodes?: number[];
}

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

export interface CodexGameEngine extends GameEngine {
  nodeManager: any;
  characterSystem: any;
  geometryRenderer: any;
}

export declare function createCathedralGame(): Promise<CodexGameEngine>;
export declare function startRoyalInitiatePath(): Promise<CodexGameEngine>;
