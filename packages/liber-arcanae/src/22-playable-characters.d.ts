/**
 * 22-playable-characters
 *
 * @package @cathedral/liber-arcanae
 */
/**
 * Liber Arcanae Codex Abyssiae - 22 Playable Characters
 *
 * Each of the 22 Major Arcana is a fully playable character with:
 * - Complete backstory and personality
 * - Unique abilities and powers
 * - Teaching specializations
 * - Connections to real traditions
 * - Integration with Codex 144:99, Soyga, I Ching, 72 Shem Angels/Demons
 * - Never flat - always flowing, trauma-informed design
 */
export interface PlayableCharacter {
    id: string;
    number: number;
    name: string;
    title: string;
    element: string;
    hebrew: string;
    personality: CharacterPersonality;
    abilities: CharacterAbility[];
    teachings: Teaching[];
    correspondences: CharacterCorrespondences;
    connections: CharacterConnections;
    art: CharacterArt;
    research: CharacterResearch;
}
export interface CharacterPersonality {
    traits: string[];
    voice: string;
    approach: string;
    philosophy: string;
}
export interface CharacterAbility {
    id: string;
    name: string;
    description: string;
    type: 'active' | 'passive' | 'ultimate';
    cooldown?: number;
}
export interface Teaching {
    id: string;
    title: string;
    topic: string;
    tradition: string;
    description: string;
    exercises: string[];
}
export interface CharacterCorrespondences {
    planet: string;
    zodiac: string;
    element: string;
    color: string;
    geometry: string;
    shemAngel: string;
    goetiaDemon: string;
    deity: string;
    iChing: string;
    soyga: string;
    codexNodes: number[];
    chapel?: string;
    room?: string;
}
export interface CharacterConnections {
    allies: string[];
    students: string[];
    teachers: string[];
    systems: string[];
}
export interface CharacterArt {
    style: string;
    techniques: string[];
    masters: string[];
    examples: string[];
}
export interface CharacterResearch {
    sources: string[];
    topics: string[];
    traditions: string[];
}
export declare const PLAYABLE_CHARACTERS: PlayableCharacter[];
/**
 * Get character by ID
 */
export declare function getCharacter(id: string): PlayableCharacter | undefined;
/**
 * Get character by number (0-21)
 */
export declare function getCharacterByNumber(number: number): PlayableCharacter | undefined;
/**
 * Get all characters
 */
export declare function getAllCharacters(): PlayableCharacter[];
/**
 * Get characters by element
 */
export declare function getCharactersByElement(element: string): PlayableCharacter[];
//# sourceMappingURL=22-playable-characters.d.ts.map