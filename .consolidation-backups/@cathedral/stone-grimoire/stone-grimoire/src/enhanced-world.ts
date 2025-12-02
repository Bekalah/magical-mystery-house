import { GameState, PlayerStats, GameObject, RealObject } from './types';

export interface WitcherStyleWorld {
  currentRealm: 'stone-grimoire' | 'sound-realm' | 'art-realm' | 'science-realm' | 'cathedral-hub';
  playerPosition: { x: number; y: number; z: number };
  discoveredLocations: string[];
  completedQuests: string[];
  skillTrees: SkillTrees;
  inventory: WitcherInventory;
  journal: Journal;
  mapMarkers: MapMarker[];
  realmConnections: RealmPortal[];
}

export interface SkillTrees {
  art: ArtSkills;
  sound: SoundSkills;
  science: ScienceSkills;
  magic: MagicSkills;
  combat: CombatSkills;
}

export interface ArtSkills {
  drawing: number;
  painting: number;
  sculpture: number;
  digitalArt: number;
  sacredGeometry: number;
  colorTheory: number;
}

export interface SoundSkills {
  musicTheory: number;
  composition: number;
  audioEngineering: number;
  sacredSound: number;
  voice: number;
  instrumentMastery: number;
}

export interface ScienceSkills {
  mathematics: number;
  physics: number;
  chemistry: number;
  biology: number;
  computerScience: number;
  research: number;
}

export interface MagicSkills {
  divination: number;
  manifestation: number;
  energyWork: number;
  ritualMagic: number;
  psychicAbilities: number;
  healing: number;
}

export interface CombatSkills {
  swordsmanship: number;
  archery: number;
  handToHand: number;
  strategy: number;
  defense: number;
  survival: number;
}

export interface WitcherInventory {
  weapons: GameObject[];
  armor: GameObject[];
  potions: GameObject[];
  ingredients: GameObject[];
  books: GameObject[];
  artifacts: GameObject[];
  tools: GameObject[];
}

export interface Journal {
  quests: Quest[];
  discoveries: Discovery[];
  bestiary: BestiaryEntry[];
  recipes: Recipe[];
  notes: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'failed';
  objectives: QuestObjective[];
  rewards: QuestReward[];
  relatedRealm: string;
}

export interface QuestObjective {
  id: string;
  description: string;
  completed: boolean;
  location?: string;
}

export interface QuestReward {
  type: 'experience' | 'item' | 'skill' | 'knowledge';
  value: any;
}

export interface Discovery {
  id: string;
  title: string;
  description: string;
  location: string;
  category: 'historical' | 'magical' | 'scientific' | 'artistic';
  realWorldConnection?: RealObject;
}

export interface BestiaryEntry {
  id: string;
  name: string;
  description: string;
  weaknesses: string[];
  loot: string[];
  dangerous: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  type: 'potion' | 'artwork' | 'spell' | 'tool';
  ingredients: string[];
  skillRequired: string;
  effect: string;
}

export interface MapMarker {
  id: string;
  name: string;
  type: 'quest' | 'discovery' | 'portal' | 'danger' | 'ally';
  position: { x: number; y: number; z: number };
  description: string;
  discovered: boolean;
  realm: string;
}

export interface RealmPortal {
  id: string;
  name: string;
  fromRealm: string;
  toRealm: string;
  position: { x: number; y: number; z: number };
  requirements: string[];
  activated: boolean;
}

export class WitcherStyleEngine {
  private worldState: WitcherStyleWorld;
  private listeners: Array<(state: WitcherStyleWorld) => void> = [];

  constructor() {
    this.worldState = this.createInitialWorld();
  }

  private createInitialWorld(): WitcherStyleWorld {
    return {
      currentRealm: 'cathedral-hub',
      playerPosition: { x: 0, y: 0, z: 0 },
      discoveredLocations: [],
      completedQuests: [],
      skillTrees: {
        art: { drawing: 1, painting: 0, sculpture: 0, digitalArt: 0, sacredGeometry: 0, colorTheory: 0 },
        sound: { musicTheory: 0, composition: 0, audioEngineering: 0, sacredSound: 0, voice: 0, instrumentMastery: 0 },
        science: { mathematics: 0, physics: 0, chemistry: 0, biology: 0, computerScience: 0, research: 0 },
        magic: { divination: 0, manifestation: 0, energyWork: 0, ritualMagic: 0, psychicAbilities: 0, healing: 0 },
        combat: { swordsmanship: 0, archery: 0, handToHand: 0, strategy: 0, defense: 0, survival: 0 }
      },
      inventory: {
        weapons: [],
        armor: [],
        potions: [],
        ingredients: [],
        books: [],
        artifacts: [],
        tools: []
      },
      journal: {
        quests: [],
        discoveries: [],
        bestiary: [],
        recipes: [],
        notes: []
      },
      mapMarkers: [],
      realmConnections: []
    };
  }

  public getWorldState(): WitcherStyleWorld {
    return { ...this.worldState };
  }

  public subscribe(listener: (state: WitcherStyleWorld) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getWorldState()));
  }

  public moveToRealm(realm: string): boolean {
    if (this.canAccessRealm(realm)) {
      this.worldState.currentRealm = realm as any;
      this.notifyListeners();
      return true;
    }
    return false;
  }

  private canAccessRealm(realm: string): boolean {
    // Check if player has discovered or unlocked this realm
    switch (realm) {
      case 'stone-grimoire':
        return this.worldState.discoveredLocations.includes('stone-grimoire-entrance');
      case 'sound-realm':
        return this.worldState.skillTrees.sound.musicTheory >= 5;
      case 'art-realm':
        return this.worldState.skillTrees.art.drawing >= 5;
      case 'science-realm':
        return this.worldState.skillTrees.science.mathematics >= 5;
      default:
        return true;
    }
  }

  public updatePlayerPosition(x: number, y: number, z: number): void {
    this.worldState.playerPosition = { x, y, z };
    this.checkLocationTriggers();
    this.notifyListeners();
  }

  private checkLocationTriggers(): void {
    // Check if player is near any discoveries or quest triggers
    this.worldState.mapMarkers.forEach(marker => {
      const distance = this.calculateDistance(this.worldState.playerPosition, marker.position);
      if (distance < 50 && !marker.discovered) {
        marker.discovered = true;
        this.discoverLocation(marker);
      }
    });
  }

  private calculateDistance(pos1: { x: number; y: number; z: number }, pos2: { x: number; y: number; z: number }): number {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) +
      Math.pow(pos1.y - pos2.y, 2) +
      Math.pow(pos1.z - pos2.z, 2)
    );
  }

  private discoverLocation(marker: MapMarker): void {
    if (marker.type === 'discovery') {
      this.worldState.journal.discoveries.push({
        id: marker.id,
        title: marker.name,
        description: marker.description,
        location: `${this.worldState.currentRealm}:${marker.position.x},${marker.position.y}`,
        category: 'historical'
      });
    }
  }

  public addQuest(quest: Quest): void {
    this.worldState.journal.quests.push(quest);
    this.notifyListeners();
  }

  public completeQuest(questId: string): void {
    const quest = this.worldState.journal.quests.find(q => q.id === questId);
    if (quest) {
      quest.status = 'completed';
      this.worldState.completedQuests.push(questId);

      // Apply rewards
      quest.rewards.forEach(reward => {
        this.applyReward(reward);
      });
    }
    this.notifyListeners();
  }

  private applyReward(reward: QuestReward): void {
    switch (reward.type) {
      case 'experience':
        // Add experience to relevant skill trees
        break;
      case 'item':
        // Add item to inventory
        break;
      case 'skill':
        // Increase specific skill
        break;
    }
  }

  public gainSkill(skillTree: keyof SkillTrees, skill: string, amount: number): void {
    const tree = this.worldState.skillTrees[skillTree];
    if (tree && skill in tree) {
      (tree as any)[skill] += amount;
    }
    this.notifyListeners();
  }

  public addToInventory(category: keyof WitcherInventory, item: GameObject): void {
    this.worldState.inventory[category].push(item);
    this.notifyListeners();
  }

  public getNearbyLocations(radius: number = 100): MapMarker[] {
    return this.worldState.mapMarkers.filter(marker => {
      const distance = this.calculateDistance(this.worldState.playerPosition, marker.position);
      return distance <= radius && marker.discovered;
    });
  }

  public getActiveQuests(): Quest[] {
    return this.worldState.journal.quests.filter(q => q.status === 'active');
  }

  public getSkillLevel(skillTree: keyof SkillTrees, skill: string): number {
    const tree = this.worldState.skillTrees[skillTree];
    return tree && skill in tree ? (tree as any)[skill] : 0;
  }

  public canAccessContent(requirements: string[]): boolean {
    // Check if player meets requirements for content access
    return requirements.every(req => {
      const [category, skill, levelStr] = req.split(':');
      const requiredLevel = parseInt(levelStr);
      return this.getSkillLevel(category as keyof SkillTrees, skill) >= requiredLevel;
    });
  }

  public saveGame(): string {
    return btoa(JSON.stringify(this.worldState));
  }

  public loadGame(saveData: string): boolean {
    try {
      const state = JSON.parse(atob(saveData));
      this.worldState = state;
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Failed to load Witcher-style game:', error);
      return false;
    }
  }

  public getRealmConnections(): RealmPortal[] {
    return this.worldState.realmConnections.filter(portal => portal.activated);
  }

  public activatePortal(portalId: string): boolean {
    const portal = this.worldState.realmConnections.find(p => p.id === portalId);
    if (portal && this.canAccessRealm(portal.toRealm)) {
      portal.activated = true;
      this.notifyListeners();
      return true;
    }
    return false;
  }
}
