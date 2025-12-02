import { GameState, GameScene, PlayerStats, GameObject, RealObject } from './types';
import { GAME_SCENES } from './scenes';
import { REAL_OBJECTS, REAL_BOOKS } from './realObjects';

export class CathedralGameEngine {
  private gameState: GameState;
  private listeners: Array<(state: GameState) => void> = [];

  constructor() {
    this.gameState = this.createInitialState();
  }

  private createInitialState(): GameState {
    return {
      currentScene: 'start',
      inventory: [],
      visitedScenes: [],
      gameFlags: {},
      playerStats: {
        wisdom: 0,
        courage: 0,
        compassion: 0,
        knowledge: 0,
        experience: 0
      },
      realObjects: []
    };
  }

  public getGameState(): GameState {
    return { ...this.gameState };
  }

  public subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getGameState()));
  }

  public makeChoice(choiceId: string): boolean {
    const currentScene = GAME_SCENES[this.gameState.currentScene];
    if (!currentScene) return false;

    const choice = currentScene.choices.find(c => c.id === choiceId);
    if (!choice) return false;

    // Apply choice effects
    if (choice.effects) {
      this.applyStatEffects(choice.effects);
    }

    // Set game flags if needed
    if (choice.consequences) {
      choice.consequences.forEach(flag => {
        this.gameState.gameFlags[flag] = true;
      });
    }

    // Move to next scene
    const nextScene = GAME_SCENES[choice.targetScene];
    if (nextScene) {
      this.gameState.currentScene = choice.targetScene;

      if (!this.gameState.visitedScenes.includes(choice.targetScene)) {
        this.gameState.visitedScenes.push(choice.targetScene);
      }

      // Handle real world connections
      this.discoverRealObjects(nextScene);

      this.notifyListeners();
      return true;
    }

    return false;
  }

  private applyStatEffects(effects: Partial<PlayerStats>): void {
    Object.keys(effects).forEach(stat => {
      const key = stat as keyof PlayerStats;
      if (key in this.gameState.playerStats) {
        this.gameState.playerStats[key] += effects[key] || 0;
      }
    });
  }

  private discoverRealObjects(scene: GameScene): void {
    if (scene.realWorldConnections) {
      scene.realWorldConnections.forEach(objectId => {
        if (!this.gameState.realObjects.find(obj => obj.id === objectId)) {
          const realObject = REAL_OBJECTS[objectId];
          if (realObject) {
            this.gameState.realObjects.push(realObject);
          }
        }
      });
    }
  }

  public getCurrentScene(): GameScene | null {
    return GAME_SCENES[this.gameState.currentScene] || null;
  }

  public getAvailableChoices(): GameScene['choices'] {
    const scene = this.getCurrentScene();
    return scene ? scene.choices : [];
  }

  public getRealObjectConnections(): RealObject[] {
    return this.gameState.realObjects;
  }

  public getPlayerStats(): PlayerStats {
    return { ...this.gameState.playerStats };
  }

  public canAccessChoice(choiceId: string): boolean {
    const scene = this.getCurrentScene();
    if (!scene) return false;

    const choice = scene.choices.find(c => c.id === choiceId);
    if (!choice) return false;

    // Check requirements
    if (choice.requirements) {
      return choice.requirements.every(req => this.gameState.gameFlags[req]);
    }

    return true;
  }

  public addToInventory(object: GameObject): void {
    this.gameState.inventory.push(object);
    this.notifyListeners();
  }

  public hasVisitedScene(sceneId: string): boolean {
    return this.gameState.visitedScenes.includes(sceneId);
  }

  public getGameProgress(): {
    scenesVisited: number;
    totalScenes: number;
    objectsDiscovered: number;
    totalObjects: number;
    level: number;
  } {
    const totalScenes = Object.keys(GAME_SCENES).length;
    const totalObjects = Object.keys(REAL_OBJECTS).length;

    // Calculate level based on experience
    const level = Math.floor(this.gameState.playerStats.experience / 100) + 1;

    return {
      scenesVisited: this.gameState.visitedScenes.length,
      totalScenes,
      objectsDiscovered: this.gameState.realObjects.length,
      totalObjects,
      level
    };
  }

  public resetGame(): void {
    this.gameState = this.createInitialState();
    this.notifyListeners();
  }

  public saveGame(): string {
    return btoa(JSON.stringify(this.gameState));
  }

  public loadGame(saveData: string): boolean {
    try {
      const state = JSON.parse(atob(saveData));
      this.gameState = state;
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Failed to load game:', error);
      return false;
    }
  }

  public getConnectedBooks(): Array<{
    book: any;
    connection: string;
    discoveredInScene?: string;
  }> {
    return this.gameState.realObjects
      .filter(obj => obj.type === 'book' || REAL_BOOKS[obj.id])
      .map(obj => ({
        book: REAL_BOOKS[obj.id],
        connection: obj.gameConnection,
        discoveredInScene: this.gameState.visitedScenes.find(sceneId =>
          GAME_SCENES[sceneId]?.realWorldConnections?.includes(obj.id)
        )
      }));
  }

  public getConnectedArtworks(): RealObject[] {
    return this.gameState.realObjects.filter(obj => obj.type === 'artwork');
  }

  public getConnectedPlaces(): RealObject[] {
    return this.gameState.realObjects.filter(obj => obj.type === 'place');
  }

  public getConnectedArtifacts(): RealObject[] {
    return this.gameState.realObjects.filter(obj => obj.type === 'artifact');
  }
}
