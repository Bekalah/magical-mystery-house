/**
 * types
 * 
 * @package @cathedral/stone-grimoire
 */
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
  art: number;
  sound: number;
  science: number;
  magic: number;
}

export interface GameObject {
  id: string;
  name: string;
  description: string;
  type: 'artifact' | 'book' | 'tool' | 'key' | 'weapon' | 'ingredient';
  properties: Record<string, any>;
  realWorldConnection?: RealObject;
}

export interface RealObject {
  id: string;
  name: string;
  type: 'book' | 'artwork' | 'artifact' | 'place' | 'person' | 'music' | 'science';
  description: string;
  location?: string;
  significance: string;
  gameConnection: string;
  imageUrl?: string;
  externalLink?: string;
  dataPoints?: number[];
}

export interface WitcherRealm {
  id: string;
  name: string;
  description: string;
  type: 'hub' | 'art' | 'sound' | 'science' | 'magic' | 'study';
  locations: RealmLocation[];
  npcs: NPC[];
  quests: Quest[];
  discoveries: Discovery[];
  backgroundMusic?: string;
  atmosphere: Atmosphere;
}

export interface RealmLocation {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
  type: 'study-area' | 'workshop' | 'library' | 'portal' | 'danger' | 'safe';
  activities: Activity[];
  requirements?: string[];
  connections: string[]; // Connected location IDs
}

export interface Activity {
  id: string;
  name: string;
  type: 'study' | 'create' | 'experiment' | 'meditate' | 'combat' | 'social';
  description: string;
  duration: number; // minutes
  skillGains: Partial<PlayerStats>;
  requirements?: string[];
  rewards?: Reward[];
}

export interface NPC {
  id: string;
  name: string;
  role: 'teacher' | 'guardian' | 'fellow-student' | 'master' | 'spirit';
  personality: string;
  knowledge: string[];
  dialogues: Dialogue[];
  quests?: string[]; // Quest IDs this NPC offers
  position: { x: number; y: number; z: number };
  schedule?: Schedule;
}

export interface Dialogue {
  id: string;
  trigger: string;
  text: string;
  responses?: DialogueResponse[];
  conditions?: string[];
}

export interface DialogueResponse {
  text: string;
  nextDialogue?: string;
  actions?: string[];
  requirements?: string[];
}

export interface Schedule {
  dailyRoutine: DailyActivity[];
  specialEvents?: SpecialEvent[];
}

export interface DailyActivity {
  time: string; // HH:MM format
  activity: string;
  location: string;
}

export interface SpecialEvent {
  name: string;
  date: string;
  time: string;
  description: string;
  participants: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'side' | 'study' | 'artistic' | 'scientific';
  status: 'available' | 'active' | 'completed' | 'failed';
  prerequisites?: string[];
  objectives: Objective[];
  rewards: Reward[];
  timeLimit?: number; // hours
  relatedRealm: string;
  relatedNPC?: string;
}

export interface Objective {
  id: string;
  description: string;
  type: 'collect' | 'study' | 'create' | 'discover' | 'defeat' | 'reach';
  target: string;
  current: number;
  required: number;
  completed: boolean;
}

export interface Reward {
  type: 'experience' | 'item' | 'skill' | 'knowledge' | 'access';
  value: any;
  description: string;
}

export interface Discovery {
  id: string;
  title: string;
  description: string;
  category: 'historical' | 'scientific' | 'artistic' | 'magical' | 'personal';
  importance: 'common' | 'uncommon' | 'rare' | 'legendary';
  realWorldConnection?: RealObject;
  studyMaterials?: StudyMaterial[];
  experiments?: Experiment[];
}

export interface StudyMaterial {
  type: 'text' | 'video' | 'audio' | 'interactive';
  title: string;
  url?: string;
  content?: string;
  duration?: number; // minutes
}

export interface Experiment {
  name: string;
  description: string;
  materials: string[];
  procedure: string[];
  expectedResults: string;
  safetyNotes?: string;
}

export interface Atmosphere {
  lighting: 'bright' | 'dim' | 'candlelight' | 'magical' | 'natural';
  soundscape: 'silent' | 'whispers' | 'music' | 'nature' | 'industrial';
  temperature: 'cold' | 'cool' | 'warm' | 'hot' | 'variable';
  energy: 'calm' | 'focused' | 'creative' | 'chaotic' | 'sacred';
  particles: 'none' | 'dust' | 'sparks' | 'light' | 'mist';
}
