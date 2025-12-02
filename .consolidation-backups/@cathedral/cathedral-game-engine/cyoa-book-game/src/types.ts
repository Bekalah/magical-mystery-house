export interface GameState {
  currentScene: string;
  inventory: GameObject[];
  visitedScenes: string[];
  gameFlags: Record<string, boolean>;
  playerStats: PlayerStats;
  realObjects: RealObject[];
}

export interface PlayerStats {
  wisdom: number;
  courage: number;
  compassion: number;
  knowledge: number;
  experience: number;
}

export interface GameObject {
  id: string;
  name: string;
  description: string;
  type: 'artifact' | 'book' | 'tool' | 'key';
  properties: Record<string, any>;
  realWorldConnection?: RealObject;
}

export interface RealObject {
  id: string;
  name: string;
  type: 'book' | 'artwork' | 'artifact' | 'place' | 'person';
  description: string;
  location?: string;
  significance: string;
  gameConnection: string;
  imageUrl?: string;
  externalLink?: string;
}

export interface SceneChoice {
  id: string;
  text: string;
  targetScene: string;
  requirements?: string[];
  consequences?: string[];
  effects?: Partial<PlayerStats>;
}

export interface GameScene {
  id: string;
  title: string;
  description: string;
  image?: string;
  backgroundMusic?: string;
  choices: SceneChoice[];
  objects?: string[]; // Object IDs that can be found here
  realWorldConnections?: string[]; // Real object IDs connected to this scene
  onEnter?: string; // Special script to run when entering
  onExit?: string; // Special script to run when leaving
}

export interface BookData {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  isbn?: string;
  description: string;
  themes: string[];
  gameConnection: string;
  realWorldLocation?: string;
  significance: string;
}
