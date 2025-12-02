/**
 * rooms
 *
 * @package @cathedral/magical-mystery-house
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate room details
 *
 * Creative use: Game apps, exploration apps, visual apps, interactive apps
 */
/**
 * Magical Mystery House - 99 Rooms System
 *
 * Each room is an explorable space with:
 * - Real research and correspondences
 * - Master art and science
 * - Interactive exploration
 * - 22 Living Arcana as playable characters
 * - Trauma-informed design (never flat, always flowing)
 */
export interface MysteryRoom {
    id: string;
    name: string;
    number: number;
    theme: string;
    description: string;
    type: 'library' | 'laboratory' | 'studio' | 'chamber' | 'hall' | 'garden' | 'temple';
    features: RoomFeature[];
    correspondences: RoomCorrespondences;
    arcana: string[];
    research: ResearchSource[];
    art: ArtTradition[];
    science: ScienceTradition[];
    pathworking: PathworkingNode[];
    unlockCondition?: string;
}
export interface RoomFeature {
    id: string;
    name: string;
    type: 'interactive' | 'exploration' | 'creation' | 'learning' | 'pathworking' | 'character';
    description: string;
    arcana?: string;
    connections?: string[];
}
export interface RoomCorrespondences {
    element?: string;
    planet?: string;
    zodiac?: string;
    shemAngel?: string;
    goetiaDemon?: string;
    deity?: string;
    iChing?: string;
    soyga?: string;
    codexNode?: number;
}
export interface ResearchSource {
    name: string;
    type: 'library' | 'archive' | 'museum' | 'academic' | 'digital';
    url?: string;
    description: string;
}
export interface ArtTradition {
    name: string;
    period: string;
    techniques: string[];
    masters: string[];
    examples: string[];
}
export interface ScienceTradition {
    name: string;
    period: string;
    fields: string[];
    scientists: string[];
    discoveries: string[];
}
export interface PathworkingNode {
    id: string;
    title: string;
    description: string;
    exercises: string[];
    correspondences: Record<string, any>;
}
export declare const MYSTERY_ROOMS: MysteryRoom[];
/**
 * Get room by ID
 */
export declare function getRoom(id: string): MysteryRoom | undefined;
/**
 * Get room by number (0-98)
 */
export declare function getRoomByNumber(number: number): MysteryRoom | undefined;
/**
 * Get rooms by Arcana character
 */
export declare function getRoomsByArcana(arcanaId: string): MysteryRoom[];
/**
 * Get all rooms
 */
export declare function getAllRooms(): MysteryRoom[];
//# sourceMappingURL=rooms.d.ts.map