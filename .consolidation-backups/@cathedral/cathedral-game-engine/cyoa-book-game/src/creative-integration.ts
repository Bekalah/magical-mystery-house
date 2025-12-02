/**
 * Creative Engine Integration for CYOA Book Game
 * Adds harmonic generation capabilities to the interactive story system
 */

// Define types locally to avoid import issues
interface CodexNode {
  id: number;
  name: string;
  element: string;
  solfeggio: number;
  color: string;
  geometry: string;
  narrative?: any;
  architecture?: any;
}

interface HarmonicAnalysis {
  relationship: string;
  consonanceScore: number;
  elementalBalance: any;
  freqRatios: any[];
  overallHarmony: string;
}

interface CreativeEngine {
  combineNodes(nodeIds: number[]): any;
  getNodes(nodeIds: number[]): CodexNode[];
  getAllNodes(): CodexNode[];
  harmonic: {
    analyzeHarmony(nodes: CodexNode[]): HarmonicAnalysis;
  };
}

interface CreativeOutput {
  harmony: HarmonicAnalysis;
  narrative?: any;
  game?: any;
  architecture?: any;
  symbol?: any;
}

// Global creative engine instance (loaded at runtime)
declare global {
  var creativeEngineInstance: CreativeEngine | null;
  var loadCodexData: () => Promise<CodexNode[]>;
  var createCreativeEngine: (nodes: CodexNode[]) => CreativeEngine;
}

export interface CreativeScene {
  id: string;
  title: string;
  description: string;
  choices: CreativeChoice[];
  nodeIds: number[];
  realObjects?: RealObject[];
  backgroundMusic?: string;
  atmosphere?: string;
}

export interface CreativeChoice {
  id: string;
  text: string;
  targetScene?: string;
  nodeIds?: number[];
  effects?: {
    wisdom?: number;
    courage?: number;
    compassion?: number;
    knowledge?: number;
    experience?: number;
  };
  requirements?: {
    minWisdom?: number;
    minCourage?: number;
    minCompassion?: number;
    minKnowledge?: number;
  };
}

export interface RealObject {
  name: string;
  description: string;
  gameConnection: string;
  realWorldLink?: string;
  imageUrl?: string;
  nodeId?: number;
}

export interface CreativeGameState {
  currentScene: string;
  visitedScenes: string[];
  playerStats: {
    wisdom: number;
    courage: number;
    compassion: number;
    knowledge: number;
    experience: number;
  };
  selectedNodes: number[];
  realObjects: RealObject[];
  creativeMode: boolean;
}

/**
 * Enhanced Game Engine with Creative Integration
 */
export class CreativeGameEngine {
  private creativeEngine: CreativeEngine | null = null;
  private gameState: CreativeGameState;
  private scenes: Map<string, CreativeScene>;

  constructor() {
    this.scenes = new Map();
    this.gameState = {
      currentScene: 'start',
      visitedScenes: [],
      playerStats: {
        wisdom: 0,
        courage: 0,
        compassion: 0,
        knowledge: 0,
        experience: 0
      },
      selectedNodes: [],
      realObjects: [],
      creativeMode: false
    };
  }

  /**
   * Initialize the creative game engine
   */
  async initialize(): Promise<void> {
    try {
      // Load codex data
      const codexData = await loadCodexData();
      this.creativeEngine = createCreativeEngine(codexData);

      // Initialize scenes with creative content
      this.initializeCreativeScenes();

      console.log('✅ Creative Game Engine initialized with', codexData.length, 'nodes');
    } catch (error) {
      console.error('❌ Failed to initialize creative game engine:', error);
      throw error;
    }
  }

  /**
   * Initialize scenes with creative node integration
   */
  private initializeCreativeScenes(): void {
    if (!this.creativeEngine) return;

    // Create scenes based on node combinations
    const nodes = this.creativeEngine.getAllNodes();

    nodes.slice(0, 8).forEach((node, index) => {
      const sceneId = `node-${node.id}`;
      const scene = this.createSceneFromNode(node, index);
      this.scenes.set(sceneId, scene);
    });

    // Create combination scenes
    this.createCombinationScenes();
  }

  /**
   * Create a scene from a single node
   */
  private createSceneFromNode(node: CodexNode, index: number): CreativeScene {
    const nextNodeId = index < 7 ? `node-${node.id + 1}` : 'combination-scene';

    return {
      id: `node-${node.id}`,
      title: `The ${node.name}`,
      description: this.generateNodeDescription(node),
      nodeIds: [node.id],
      choices: [
        {
          id: `explore-${node.id}`,
          text: `Explore the ${node.element} aspect of ${node.name}`,
          targetScene: nextNodeId,
          nodeIds: [node.id],
          effects: {
            wisdom: node.element === 'Air' ? 2 : 1,
            courage: node.element === 'Fire' ? 2 : 1,
            experience: node.solfeggio / 50
          }
        },
        {
          id: `meditate-${node.id}`,
          text: `Meditate on the ${node.solfeggio}Hz frequency`,
          targetScene: 'meditation-scene',
          nodeIds: [node.id],
          effects: {
            compassion: 2,
            knowledge: 1,
            experience: node.solfeggio / 100
          }
        }
      ],
      backgroundMusic: `${node.element.toLowerCase()}-frequency-${node.solfeggio}`,
      atmosphere: node.architecture?.ambience || 'Sacred silence'
    };
  }

  /**
   * Create scenes from node combinations
   */
  private createCombinationScenes(): void {
    // Fire + Water combination scene
    const fireWaterCombo = this.scenes.get('node-1');
    if (fireWaterCombo) {
      const combinationScene: CreativeScene = {
        id: 'combination-scene',
        title: 'Elemental Fusion Chamber',
        description: 'You stand in a chamber where fire and water energies dance in perfect balance. The air shimmers with harmonic resonance as opposing elements find unity.',
        nodeIds: [1, 2], // Fire + Water
        choices: [
          {
            id: 'embrace-unity',
            text: 'Embrace the unity of opposing forces',
            targetScene: 'unity-reward',
            nodeIds: [1, 2],
            effects: {
              wisdom: 3,
              courage: 2,
              compassion: 2,
              experience: 100
            }
          },
          {
            id: 'study-balance',
            text: 'Study the delicate balance between elements',
            targetScene: 'balance-reward',
            nodeIds: [1, 2],
            effects: {
              knowledge: 4,
              experience: 80
            }
          }
        ]
      };
      this.scenes.set('combination-scene', combinationScene);
    }
  }

  /**
   * Generate scene description from node properties
   */
  private generateNodeDescription(node: CodexNode): string {
    const baseDescription = `You enter the realm of ${node.name}, where ${node.element.toLowerCase()} energy flows through sacred geometry.`;

    if (node.architecture) {
      return `${baseDescription} The ${node.architecture.roomType.toLowerCase()} is illuminated with ${node.architecture.lighting.toLowerCase()} light, creating an atmosphere of ${node.architecture.ambience.toLowerCase()}.`;
    }

    if (node.narrative) {
      return `${baseDescription} Here, ${node.narrative.theme.toLowerCase()} guides those who follow ${node.narrative.archetype.toLowerCase()} path.`;
    }

    return baseDescription;
  }

  /**
   * Make a choice and update game state
   */
  makeChoice(choiceId: string): boolean {
    const currentScene = this.scenes.get(this.gameState.currentScene);
    if (!currentScene) return false;

    const choice = currentScene.choices.find(c => c.id === choiceId);
    if (!choice) return false;

    // Apply choice effects
    if (choice.effects) {
      Object.keys(choice.effects).forEach(stat => {
        if (stat in this.gameState.playerStats) {
          const effectValue = choice.effects![stat as keyof typeof choice.effects];
          this.gameState.playerStats[stat as keyof typeof this.gameState.playerStats] += effectValue || 0;
        }
      });
    }

    // Add selected nodes to game state
    if (choice.nodeIds) {
      this.gameState.selectedNodes.push(...choice.nodeIds);
    }

    // Move to next scene
    if (choice.targetScene) {
      this.gameState.currentScene = choice.targetScene;
      if (!this.gameState.visitedScenes.includes(choice.targetScene)) {
        this.gameState.visitedScenes.push(choice.targetScene);
      }
    }

    // Generate real objects if creative mode is active
    if (this.gameState.creativeMode && choice.nodeIds) {
      this.generateRealObjects(choice.nodeIds);
    }

    return true;
  }

  /**
   * Generate real-world objects connected to nodes
   */
  private generateRealObjects(nodeIds: number[]): void {
    if (!this.creativeEngine) return;

    const nodes = this.creativeEngine.getNodes(nodeIds);

    nodes.forEach(node => {
      const realObject = this.createRealObjectFromNode(node);
      if (realObject) {
        this.gameState.realObjects.push(realObject);
      }
    });
  }

  /**
   * Create real-world object connection from node
   */
  private createRealObjectFromNode(node: CodexNode): RealObject | null {
    // Map nodes to real books, artworks, and sacred sites
    const realConnections: Record<number, RealObject> = {
      1: { // Fire
        name: "The Alchemist",
        description: "Paulo Coelho's masterpiece about following dreams and omens",
        gameConnection: "Teaches the Path of Fire - transformation through courage",
        realWorldLink: "https://en.wikipedia.org/wiki/The_Alchemist_(novel)",
        nodeId: 1
      },
      2: { // Water
        name: "The Prophet",
        description: "Kahlil Gibran's poetic wisdom on love, marriage, and life",
        gameConnection: "Reveals the Path of Water - emotional wisdom and flow",
        realWorldLink: "https://en.wikipedia.org/wiki/The_Prophet_(book)",
        nodeId: 2
      },
      3: { // Earth
        name: "Chartres Cathedral",
        description: "Medieval Gothic cathedral with sacred geometry and labyrinth",
        gameConnection: "Embodies the Path of Earth - solid foundation and patient growth",
        realWorldLink: "https://en.wikipedia.org/wiki/Chartres_Cathedral",
        nodeId: 3
      }
    };

    return realConnections[node.id] || null;
  }

  /**
   * Get current scene with creative enhancements
   */
  getCurrentScene(): CreativeScene | null {
    return this.scenes.get(this.gameState.currentScene) || null;
  }

  /**
   * Get game state
   */
  getGameState(): CreativeGameState {
    return { ...this.gameState };
  }

  /**
   * Toggle creative mode
   */
  toggleCreativeMode(): void {
    this.gameState.creativeMode = !this.gameState.creativeMode;
  }

  /**
   * Generate creative content from selected nodes
   */
  generateCreativeContent(): any {
    if (this.gameState.selectedNodes.length < 2) {
      return null;
    }

    return this.creativeEngine.combineNodes(this.gameState.selectedNodes);
  }

  /**
   * Get creative suggestions for current state
   */
  getCreativeSuggestions(): string[] {
    const suggestions = [];

    if (this.gameState.selectedNodes.length > 0) {
      const nodes = this.creativeEngine.getNodes(this.gameState.selectedNodes);
      const harmony = this.creativeEngine['harmonic'].analyzeHarmony(nodes);

      suggestions.push(`Harmonic relationship: ${harmony.relationship}`);
      suggestions.push(`Dominant element: ${harmony.elementalBalance.dominant}`);
      suggestions.push(`Overall harmony: ${harmony.overallHarmony}/10`);
    }

    if (this.gameState.realObjects.length > 0) {
      suggestions.push(`Discovered ${this.gameState.realObjects.length} real-world connections`);
    }

    return suggestions;
  }
}

/**
 * Integration with existing game engine
 */
export class GameEngineIntegration {
  private creativeEngine: CreativeGameEngine;

  constructor(existingGameEngine: any) {
    this.creativeEngine = new CreativeGameEngine();
  }

  /**
   * Enhance existing scene with creative elements
   */
  enhanceScene(scene: any, nodeIds: number[]): any {
    if (!this.creativeEngine) return scene;

    const creativeOutput = this.creativeEngine.combineNodes(nodeIds);

    return {
      ...scene,
      creative: {
        harmony: creativeOutput.harmony,
        narrative: creativeOutput.narrative,
        architecture: creativeOutput.architecture
      },
      enhancedDescription: this.blendDescriptions(scene.description, creativeOutput)
    };
  }

  /**
   * Blend original and creative descriptions
   */
  private blendDescriptions(original: string, creative: any): string {
    if (!creative.narrative) return original;

    const creativeIntro = `This space resonates with ${creative.harmony.relationship.toLowerCase()} energy, where ${creative.narrative.themes.join(' and ').toLowerCase()} guide the seeker.`;

    return `${original}\n\n${creativeIntro}`;
  }

  /**
   * Generate dynamic choices based on node combinations
   */
  generateDynamicChoices(baseChoices: any[], nodeIds: number[]): any[] {
    if (nodeIds.length < 2 || !this.creativeEngine) return baseChoices;

    const creativeOutput = this.creativeEngine.combineNodes(nodeIds);
    const dynamicChoices = [];

    // Add creative choice based on harmony
    if (creativeOutput.harmony.relationship === 'Perfect Harmony') {
      dynamicChoices.push({
        id: 'creative-harmony',
        text: 'Follow the path of perfect harmony',
        effects: { wisdom: 3, experience: 50 },
        creative: true
      });
    }

    return [...baseChoices, ...dynamicChoices];
  }
}
