/**
 * Liber Arcanae Codex Abyssiae - 3D RPG System
 *
 * A Fable-like 3D RPG where Major Arcana are playable characters
 * exploring real pathworking with 72 Shem Angels and Goetic Demons
 * through Circuitum 99: Alpha et Omega
 *
 * Features:
 * - Playable Major Arcana characters (22 archetypal beings)
 * - Real pathworking with 72 Shem Angels (Kabbalistic tradition)
 * - 72 Goetic Demons (Lesser Key of Solomon)
 * - Circuitum 99: Alpha et Omega gate system
 * - Antero Alli Angel Tech mechanics
 * - Crossing the Abyss mechanics
 * - Holy Guardian Angel quest system
 * - Fable-like explorable 3D world
 *
 * Based on real canon:
 * - Aleister Crowley - Thelema, Crossing the Abyss, Holy Guardian Angel
 * - Golden Dawn - Kabbalah, Shem Angels, Pathworking
 * - Lesser Key of Solomon - 72 Goetic Demons
 * - Antero Alli - Angel Tech, Pathworking techniques
 * - Hermetic Qabalah - Tree of Life, 72 Names of God
 *
 * @license CC0-1.0 - Public Domain
 */
export declare const SHEM_ANGELS: {
    number: number;
    name: string;
    meaning: string;
    planet: string;
    element: string;
    gate: number;
}[];
export declare const GOETIC_DEMONS: {
    number: number;
    name: string;
    rank: string;
    legion: number;
    gate: number;
    element: string;
    planet: string;
}[];
/**
 * ⚗️ RPGCharacter - The Principle
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
export interface RPGCharacter {
    arcanaIndex: number;
    name: string;
    archetype: string;
    level: number;
    experience: number;
    attributes: {
        strength: number;
        wisdom: number;
        intuition: number;
        creativity: number;
        willpower: number;
        charisma: number;
    };
    pathworking: {
        currentPath: number;
        abyssCrossed: boolean;
        holyGuardianAngel: {
            found: boolean;
            name?: string;
            gate?: number;
        };
        shemAngels: number[];
        goeticDemons: number[];
        circuitumGates: number[];
    };
    realm: {
        name: string;
        description: string;
        explorable: boolean;
        connections: number[];
    };
}
/**
 * ⚗️ AbyssCrossing - The Principle
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
export interface AbyssCrossing {
    characterIndex: number;
    stage: 'preparation' | 'crossing' | 'crossed' | 'failed';
    chokmahBinah: boolean;
    daath: boolean;
    kether: boolean;
    tests: {
        knowledge: boolean;
        will: boolean;
        surrender: boolean;
    };
}
/**
 * ⚗️ HolyGuardianAngel - The Principle
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
export interface HolyGuardianAngel {
    characterIndex: number;
    name: string;
    gate: number;
    shemAngel: number;
    found: boolean;
    contacted: boolean;
    communion: {
        level: number;
        teachings: string[];
        revelations: string[];
    };
}
/**
 * ⚗️ PathworkingSession - The Principle
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
export interface PathworkingSession {
    characterIndex: number;
    type: 'shem_angel' | 'goetic_demon' | 'circuitum_gate' | 'abyss' | 'hga';
    target: number;
    success: boolean;
    experience: number;
    revelations: string[];
    canonicalSource: string;
}
export declare class LiberArcanaeRPG {
    private arcanaEngine;
    private characters;
    private abyssCrossings;
    private holyGuardianAngels;
    private pathworkingHistory;
    constructor();
    private initializeCharacters;
    private getArchetypeForArcana;
    private generateAttributes;
    private getStartingPath;
    private generateRealm;
    private initializeAbyssCrossing;
    pathworkWithShemAngel(characterIndex: number, angelNumber: number): PathworkingSession;
    pathworkWithGoeticDemon(characterIndex: number, demonNumber: number): PathworkingSession;
    openCircuitumGate(characterIndex: number, gateNumber: number): PathworkingSession;
    attemptAbyssCrossing(characterIndex: number): AbyssCrossing;
    findHolyGuardianAngel(characterIndex: number): HolyGuardianAngel;
    communeWithHGA(characterIndex: number): string[];
    private attemptPathworking;
    private checkLevelUp;
    private testKnowledge;
    private testWill;
    private testSurrender;
    private calculateHGAGate;
    private calculateHGAShemAngel;
    private generateHGAName;
    private generateRevelations;
    private generateHGATeachings;
    private generateHGARevelations;
    private achieveAlphaOmega;
    getCharacter(arcanaIndex: number): RPGCharacter | null;
    getAllCharacters(): RPGCharacter[];
    exploreRealm(characterIndex: number, targetRealmIndex?: number): RPGCharacter['realm'];
}
export default LiberArcanaeRPG;
//# sourceMappingURL=LiberArcanaeRPG.d.ts.map