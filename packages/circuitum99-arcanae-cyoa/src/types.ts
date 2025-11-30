/**
 * Circuitum99: Alpha et Omega CYOA Story System Types
 * Interactive storytelling connecting all Arcanae in massive narrative experience
 */

export interface CYOAStory {
  id: string;
  title: string;
  description: string;
  type: 'alpha' | 'omega' | 'circuitum' | 'fusion' | 'complete';
  arcanae: string[]; // Arcana card IDs
  codexNodes: number[]; // Codex node IDs
  pathways: StoryPathway[];
  currentState: StoryState;
  participants: StoryParticipant[];
  settings: StorySettings;
}

export interface StoryPathway {
  id: string;
  name: string;
  description: string;
  fromNode: string;
  toNode: string;
  conditions: PathwayCondition[];
  consequences: PathwayConsequence[];
  requirements: StoryRequirement[];
  rewards: StoryReward[];
}

export interface PathwayCondition {
  type: 'arcanae' | 'codex' | 'fusion' | 'personal' | 'environmental';
  requirement: string;
  value: any;
  operator: 'equals' | 'greater' | 'less' | 'contains' | 'resonance';
}

export interface PathwayConsequence {
  type: 'story' | 'character' | 'world' | 'fusion' | 'revelation';
  effect: string;
  magnitude: number;
  duration: 'immediate' | 'temporary' | 'permanent';
  scope: 'personal' | 'interpersonal' | 'collective' | 'universal';
}

export interface StoryRequirement {
  type: 'knowledge' | 'experience' | 'fusion' | 'resonance' | 'wisdom';
  name: string;
  description: string;
  current: number;
  required: number;
  unit: string;
}

export interface StoryReward {
  type: 'wisdom' | 'power' | 'connection' | 'revelation' | 'transformation';
  name: string;
  description: string;
  value: number;
  permanent: boolean;
}

export interface StoryState {
  currentNode: string;
  visitedNodes: string[];
  completedPathways: string[];
  activeEffects: StoryEffect[];
  inventory: StoryItem[];
  relationships: StoryRelationship[];
  progress: StoryProgress;
}

export interface StoryEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff' | 'transformation' | 'revelation';
  description: string;
  duration: number;
  remaining: number;
  magnitude: number;
  source: string;
}

export interface StoryItem {
  id: string;
  name: string;
  type: 'artifact' | 'knowledge' | 'memory' | 'power' | 'connection';
  description: string;
  arcanae: string[];
  codexNodes: number[];
  properties: ItemProperty[];
  usage: ItemUsage;
}

export interface ItemProperty {
  name: string;
  value: any;
  type: 'sacred' | 'psychological' | 'material' | 'energetic';
  description: string;
}

export interface ItemUsage {
  type: 'consumable' | 'permanent' | 'activatable' | 'passive';
  effects: string[];
  requirements: string[];
  cooldown: number;
  charges: number;
}

export interface StoryRelationship {
  id: string;
  name: string;
  type: 'ally' | 'mentor' | 'companion' | 'rival' | 'antagonist';
  arcanae: string[];
  trust: number;
  intimacy: number;
  wisdom: number;
  history: RelationshipEvent[];
}

export interface RelationshipEvent {
  timestamp: Date;
  type: 'meeting' | 'conflict' | 'revelation' | 'fusion' | 'transformation';
  description: string;
  impact: number;
  consequences: string[];
}

export interface StoryProgress {
  completion: number; // 0-100
  chapters: StoryChapter[];
  achievements: StoryAchievement[];
  milestones: StoryMilestone[];
  revelations: StoryRevelation[];
}

export interface StoryChapter {
  id: string;
  title: string;
  description: string;
  startNode: string;
  endNode: string;
  completed: boolean;
  rewards: StoryReward[];
  revelations: string[];
}

export interface StoryAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlocked: Date;
  requirements: string[];
}

export interface StoryMilestone {
  id: string;
  name: string;
  description: string;
  achieved: Date;
  significance: 'personal' | 'interpersonal' | 'collective' | 'universal';
  rewards: StoryReward[];
}

export interface StoryRevelation {
  id: string;
  title: string;
  content: string;
  source: 'arcanae' | 'codex' | 'fusion' | 'personal' | 'universal';
  significance: number;
  unlocked: Date;
  connections: string[];
}

export interface StoryParticipant {
  id: string;
  name: string;
  type: 'player' | 'character' | 'archetype' | 'guide' | 'antagonist';
  arcanae: string[];
  codexNodes: number[];
  personality: ParticipantPersonality;
  motivations: string[];
  relationships: string[];
  inventory: string[];
}

export interface ParticipantPersonality {
  traits: string[];
  values: string[];
  fears: string[];
  desires: string[];
  communication: string;
  decisionMaking: string;
}

export interface StorySettings {
  mode: 'interactive' | 'auto' | 'design' | 'theatre' | 'collaborative';
  difficulty: 'gentle' | 'moderate' | 'intense' | 'extreme';
  length: 'short' | 'medium' | 'long' | 'epic';
  theme: 'personal' | 'interpersonal' | 'collective' | 'universal';
  safety: 'maximum' | 'high' | 'moderate' | 'minimal';
  accessibility: 'full' | 'moderate' | 'minimal';
}

export interface CYOANode {
  id: string;
  title: string;
  content: string;
  type: 'story' | 'choice' | 'fusion' | 'revelation' | 'transformation';
  arcanae: string[];
  codexNodes: number[];
  choices: CYOAChoice[];
  effects: StoryEffect[];
  requirements: StoryRequirement[];
}

export interface CYOAChoice {
  id: string;
  text: string;
  description: string;
  consequences: PathwayConsequence[];
  requirements: StoryRequirement[];
  leadsTo: string;
  weight: number;
  sacred: boolean;
}

export interface StoryEngine {
  stories: Map<string, CYOAStory>;
  activeStories: Map<string, CYOAStory>;
  participants: Map<string, StoryParticipant>;
  globalState: GlobalStoryState;
}

export interface GlobalStoryState {
  activeStories: string[];
  completedStories: string[];
  globalEffects: StoryEffect[];
  sharedInventory: StoryItem[];
  collectiveWisdom: StoryRevelation[];
  universalConnections: StoryRelationship[];
}

export interface TheatreExperience {
  id: string;
  name: string;
  type: 'solo' | 'duet' | 'ensemble' | 'collective';
  participants: string[];
  arcanae: string[];
  setting: TheatreSetting;
  performance: TheatrePerformance;
  audience: TheatreAudience;
}

export interface TheatreSetting {
  type: 'intimate' | 'ceremonial' | 'grand' | 'cosmic' | 'virtual';
  atmosphere: string[];
  lighting: string[];
  soundscape: string[];
  sacredElements: string[];
  fusionElements: string[];
}

export interface TheatrePerformance {
  script: TheatreScript;
  improvisation: boolean;
  fusionMechanics: boolean;
  audienceInteraction: boolean;
  sacredElements: boolean;
  duration: number;
}

export interface TheatreScript {
  acts: TheatreAct[];
  scenes: TheatreScene[];
  characters: TheatreCharacter[];
  dialogue: TheatreDialogue[];
  directions: TheatreDirection[];
}

export interface TheatreAct {
  number: number;
  title: string;
  purpose: string;
  arcanae: string[];
  fusionElements: string[];
  climax: string;
}

export interface TheatreScene {
  id: string;
  title: string;
  setting: string;
  characters: string[];
  action: string;
  dialogue: string[];
  sacredElements: string[];
}

export interface TheatreCharacter {
  id: string;
  name: string;
  arcanae: string[];
  role: string;
  motivations: string[];
  relationships: string[];
  sacredAspects: string[];
}

export interface TheatreDialogue {
  character: string;
  content: string;
  type: 'spoken' | 'whispered' | 'sung' | 'chanted' | 'silent';
  sacredElements: boolean;
  fusionMechanics: boolean;
}

export interface TheatreDirection {
  type: 'movement' | 'lighting' | 'sound' | 'sacred' | 'fusion';
  description: string;
  timing: string;
  sacredSignificance: string;
}

export interface TheatreAudience {
  type: 'none' | 'intimate' | 'participants' | 'invited' | 'public';
  interaction: boolean;
  energy: string[];
  sacredRole: string;
  fusionParticipation: boolean;
}

export interface DesignMode {
  id: string;
  name: string;
  type: 'visual' | 'narrative' | 'architectural' | 'sonic' | 'complete';
  tools: DesignTool[];
  canvas: DesignCanvas;
  elements: DesignElement[];
  fusion: DesignFusion;
}

export interface DesignTool {
  id: string;
  name: string;
  type: 'brush' | 'geometry' | 'color' | 'fusion' | 'sacred';
  properties: ToolProperty[];
  sacredCorrespondences: string[];
  fusionMechanics: boolean;
}

export interface ToolProperty {
  name: string;
  type: 'number' | 'color' | 'select' | 'boolean' | 'sacred';
  value: any;
  sacred: boolean;
  fusion: boolean;
}

export interface DesignCanvas {
  width: number;
  height: number;
  background: string;
  sacredGrid: boolean;
  fusionZones: boolean;
  elements: string[];
}

export interface DesignElement {
  id: string;
  type: 'shape' | 'symbol' | 'text' | 'fusion' | 'sacred';
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: ElementProperty[];
  sacredAspects: string[];
  fusionElements: string[];
}

export interface ElementProperty {
  name: string;
  value: any;
  sacred: boolean;
  psychological: boolean;
  fusion: boolean;
}

export interface StoryAnalytics {
  totalStories: number;
  completedStories: number;
  activeStories: number;
  totalParticipants: number;
  totalPathways: number;
  totalRevelations: number;
  fusionSessions: number;
  sacredMoments: number;
  wisdomGained: number;
  connectionsMade: number;
}