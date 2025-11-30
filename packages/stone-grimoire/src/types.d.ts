/**
 * types
 *
 * @package @cathedral/stone-grimoire
 */
/**
 * ⚗️ GameState - The Principle
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
export interface GameState {
    currentScene: string;
    inventory: GameObject[];
    visitedScenes: string[];
    gameFlags: Record<string, boolean>;
    playerStats: PlayerStats;
    realObjects: RealObject[];
}
/**
 * ⚗️ PlayerStats - The Principle
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
/**
 * ⚗️ GameObject - The Principle
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
export interface GameObject {
    id: string;
    name: string;
    description: string;
    type: 'artifact' | 'book' | 'tool' | 'key' | 'weapon' | 'ingredient';
    properties: Record<string, any>;
    realWorldConnection?: RealObject;
}
/**
 * ⚗️ RealObject - The Principle
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
/**
 * ⚗️ WitcherRealm - The Principle
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
/**
 * ⚗️ RealmLocation - The Principle
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
export interface RealmLocation {
    id: string;
    name: string;
    description: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    type: 'study-area' | 'workshop' | 'library' | 'portal' | 'danger' | 'safe';
    activities: Activity[];
    requirements?: string[];
    connections: string[];
}
/**
 * ⚗️ Activity - The Principle
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
export interface Activity {
    id: string;
    name: string;
    type: 'study' | 'create' | 'experiment' | 'meditate' | 'combat' | 'social';
    description: string;
    duration: number;
    skillGains: Partial<PlayerStats>;
    requirements?: string[];
    rewards?: Reward[];
}
/**
 * ⚗️ NPC - The Principle
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
export interface NPC {
    id: string;
    name: string;
    role: 'teacher' | 'guardian' | 'fellow-student' | 'master' | 'spirit';
    personality: string;
    knowledge: string[];
    dialogues: Dialogue[];
    quests?: string[];
    position: {
        x: number;
        y: number;
        z: number;
    };
    schedule?: Schedule;
}
/**
 * ⚗️ Dialogue - The Principle
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
export interface Dialogue {
    id: string;
    trigger: string;
    text: string;
    responses?: DialogueResponse[];
    conditions?: string[];
}
/**
 * ⚗️ DialogueResponse - The Principle
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
export interface DialogueResponse {
    text: string;
    nextDialogue?: string;
    actions?: string[];
    requirements?: string[];
}
/**
 * ⚗️ Schedule - The Principle
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
export interface Schedule {
    dailyRoutine: DailyActivity[];
    specialEvents?: SpecialEvent[];
}
/**
 * ⚗️ DailyActivity - The Principle
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
export interface DailyActivity {
    time: string;
    activity: string;
    location: string;
}
/**
 * ⚗️ SpecialEvent - The Principle
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
export interface SpecialEvent {
    name: string;
    date: string;
    time: string;
    description: string;
    participants: string[];
}
/**
 * ⚗️ Quest - The Principle
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
export interface Quest {
    id: string;
    title: string;
    description: string;
    type: 'main' | 'side' | 'study' | 'artistic' | 'scientific';
    status: 'available' | 'active' | 'completed' | 'failed';
    prerequisites?: string[];
    objectives: Objective[];
    rewards: Reward[];
    timeLimit?: number;
    relatedRealm: string;
    relatedNPC?: string;
}
/**
 * ⚗️ Objective - The Principle
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
export interface Objective {
    id: string;
    description: string;
    type: 'collect' | 'study' | 'create' | 'discover' | 'defeat' | 'reach';
    target: string;
    current: number;
    required: number;
    completed: boolean;
}
/**
 * ⚗️ Reward - The Principle
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
export interface Reward {
    type: 'experience' | 'item' | 'skill' | 'knowledge' | 'access';
    value: any;
    description: string;
}
/**
 * ⚗️ Discovery - The Principle
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
/**
 * ⚗️ StudyMaterial - The Principle
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
export interface StudyMaterial {
    type: 'text' | 'video' | 'audio' | 'interactive';
    title: string;
    url?: string;
    content?: string;
    duration?: number;
}
/**
 * ⚗️ Experiment - The Principle
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
export interface Experiment {
    name: string;
    description: string;
    materials: string[];
    procedure: string[];
    expectedResults: string;
    safetyNotes?: string;
}
/**
 * ⚗️ Atmosphere - The Principle
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
export interface Atmosphere {
    lighting: 'bright' | 'dim' | 'candlelight' | 'magical' | 'natural';
    soundscape: 'silent' | 'whispers' | 'music' | 'nature' | 'industrial';
    temperature: 'cold' | 'cool' | 'warm' | 'hot' | 'variable';
    energy: 'calm' | 'focused' | 'creative' | 'chaotic' | 'sacred';
    particles: 'none' | 'dust' | 'sparks' | 'light' | 'mist';
}
//# sourceMappingURL=types.d.ts.map