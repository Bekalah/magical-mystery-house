/**
 * module.d
 * 
 * @package @cathedral/game-engine
 */
/**
 * 🏛️✨ CATHEDRAL GAME ENGINE - MODULE DECLARATIONS
 *
 * Module declarations for TypeScript integration
 */

declare module '@cathedral/game-engine/src/index.js' {
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

  export function createCathedralGame(): Promise<CodexGameEngine>;
  export function startRoyalInitiatePath(): Promise<CodexGameEngine>;
}
