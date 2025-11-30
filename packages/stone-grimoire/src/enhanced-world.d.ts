/**
 * enhanced-world
 *
 * @package @cathedral/stone-grimoire
 */
import { GameObject, RealObject } from './types';
/**
 * ⚗️ WitcherStyleWorld - The Principle
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
export interface WitcherStyleWorld {
    currentRealm: 'stone-grimoire' | 'sound-realm' | 'art-realm' | 'science-realm' | 'cathedral-hub';
    playerPosition: {
        x: number;
        y: number;
        z: number;
    };
    discoveredLocations: string[];
    completedQuests: string[];
    skillTrees: SkillTrees;
    inventory: WitcherInventory;
    journal: Journal;
    mapMarkers: MapMarker[];
    realmConnections: RealmPortal[];
}
/**
 * ⚗️ SkillTrees - The Principle
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
export interface SkillTrees {
    art: ArtSkills;
    sound: SoundSkills;
    science: ScienceSkills;
    magic: MagicSkills;
    combat: CombatSkills;
}
/**
 * ⚗️ ArtSkills - The Principle
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
export interface ArtSkills {
    drawing: number;
    painting: number;
    sculpture: number;
    digitalArt: number;
    sacredGeometry: number;
    colorTheory: number;
}
/**
 * ⚗️ SoundSkills - The Principle
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
export interface SoundSkills {
    musicTheory: number;
    composition: number;
    audioEngineering: number;
    sacredSound: number;
    voice: number;
    instrumentMastery: number;
}
/**
 * ⚗️ ScienceSkills - The Principle
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
export interface ScienceSkills {
    mathematics: number;
    physics: number;
    chemistry: number;
    biology: number;
    computerScience: number;
    research: number;
}
/**
 * ⚗️ MagicSkills - The Principle
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
export interface MagicSkills {
    divination: number;
    manifestation: number;
    energyWork: number;
    ritualMagic: number;
    psychicAbilities: number;
    healing: number;
}
/**
 * ⚗️ CombatSkills - The Principle
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
export interface CombatSkills {
    swordsmanship: number;
    archery: number;
    handToHand: number;
    strategy: number;
    defense: number;
    survival: number;
}
/**
 * ⚗️ WitcherInventory - The Principle
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
export interface WitcherInventory {
    weapons: GameObject[];
    armor: GameObject[];
    potions: GameObject[];
    ingredients: GameObject[];
    books: GameObject[];
    artifacts: GameObject[];
    tools: GameObject[];
}
/**
 * ⚗️ Journal - The Principle
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
export interface Journal {
    quests: Quest[];
    discoveries: Discovery[];
    bestiary: BestiaryEntry[];
    recipes: Recipe[];
    notes: string[];
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
    status: 'active' | 'completed' | 'failed';
    objectives: QuestObjective[];
    rewards: QuestReward[];
    relatedRealm: string;
}
/**
 * ⚗️ QuestObjective - The Principle
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
export interface QuestObjective {
    id: string;
    description: string;
    completed: boolean;
    location?: string;
}
/**
 * ⚗️ QuestReward - The Principle
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
export interface QuestReward {
    type: 'experience' | 'item' | 'skill' | 'knowledge';
    value: any;
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
    location: string;
    category: 'historical' | 'magical' | 'scientific' | 'artistic';
    realWorldConnection?: RealObject;
}
/**
 * ⚗️ BestiaryEntry - The Principle
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
export interface BestiaryEntry {
    id: string;
    name: string;
    description: string;
    weaknesses: string[];
    loot: string[];
    dangerous: boolean;
}
/**
 * ⚗️ Recipe - The Principle
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
export interface Recipe {
    id: string;
    name: string;
    type: 'potion' | 'artwork' | 'spell' | 'tool';
    ingredients: string[];
    skillRequired: string;
    effect: string;
}
/**
 * ⚗️ MapMarker - The Principle
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
export interface MapMarker {
    id: string;
    name: string;
    type: 'quest' | 'discovery' | 'portal' | 'danger' | 'ally';
    position: {
        x: number;
        y: number;
        z: number;
    };
    description: string;
    discovered: boolean;
    realm: string;
}
/**
 * ⚗️ RealmPortal - The Principle
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
export interface RealmPortal {
    id: string;
    name: string;
    fromRealm: string;
    toRealm: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    requirements: string[];
    activated: boolean;
}
export declare class WitcherStyleEngine {
    private worldState;
    private listeners;
    constructor();
    private createInitialWorld;
    getWorldState(): WitcherStyleWorld;
    subscribe(listener: (state: WitcherStyleWorld) => void): () => void;
    private notifyListeners;
    moveToRealm(realm: string): boolean;
    private canAccessRealm;
    updatePlayerPosition(x: number, y: number, z: number): void;
    private checkLocationTriggers;
    private calculateDistance;
    private discoverLocation;
    addQuest(quest: Quest): void;
    completeQuest(questId: string): void;
    private applyReward;
    gainSkill(skillTree: keyof SkillTrees, skill: string, amount: number): void;
    addToInventory(category: keyof WitcherInventory, item: GameObject): void;
    getNearbyLocations(radius?: number): MapMarker[];
    getActiveQuests(): Quest[];
    getSkillLevel(skillTree: keyof SkillTrees, skill: string): number;
    canAccessContent(requirements: string[]): boolean;
    saveGame(): string;
    loadGame(saveData: string): boolean;
    getRealmConnections(): RealmPortal[];
    activatePortal(portalId: string): boolean;
}
//# sourceMappingURL=enhanced-world.d.ts.map