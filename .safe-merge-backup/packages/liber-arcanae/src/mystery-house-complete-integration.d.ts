/**
 * Magical Mystery House - Complete Ornate Integration
 *
 * @package @cathedral/liber-arcanae
 *
 * All 8 Rooms with Complete Integration:
 * 1. Entry Hall - Welcome and orientation
 * 2. Soul Library - Circuitum99 (99 Gates, 144 Lattice)
 * 3. Body Archive - Stone Grimoire (8 Chapels, 144 Folios)
 * 4. Spirit Observatory - Cosmogenesis Learning Engine (Four Worlds)
 * 5. Fusion Chamber - Fusion Kink Engine (A × B = D)
 * 6. Ribbon Nexus - Tesseract Bridge (7 Ribbons)
 * 7. Archetypal Grove - 22 Master Arcanae interactions
 * 8. Mystery Portal - Extended universe connections
 *
 * Each room connects to:
 * - 22 Master Arcanae
 * - 99 Gates with fractal sound art
 * - Codex 144:99 nodes
 * - All modes (game/art/sound/professional)
 * - Real assets and images
 */
import { MysteryHouseRoomIntegration, RoomAsset } from './world-app-maker-integration';
export interface CompleteMysteryHouseRoom extends MysteryHouseRoomIntegration {
    roomNumber: number;
    roomType: 'hall' | 'library' | 'archive' | 'observatory' | 'chamber' | 'nexus' | 'grove' | 'portal';
    accessibleModes: {
        game: boolean;
        art: boolean;
        sound: boolean;
        professional: boolean;
        fusion: boolean;
        flow: boolean;
    };
    modeFeatures: {
        game?: GameRoomFeatures;
        art?: ArtRoomFeatures;
        sound?: SoundRoomFeatures;
        professional?: ProfessionalRoomFeatures;
        fusion?: FusionRoomFeatures;
    };
    realAssets: RoomAsset[];
    systemPortals: SystemPortal[];
    roomFusions: RoomFusion[];
    roomLearningPaths: RoomLearningPath[];
}
export interface GameRoomFeatures {
    characters: string[];
    quests: RoomQuest[];
    interactions: RoomInteraction[];
    rewards: RoomReward[];
}
export interface ArtRoomFeatures {
    artTools: string[];
    techniques: string[];
    masters: string[];
    galleries: string[];
    creationSpaces: string[];
}
export interface SoundRoomFeatures {
    synthesizers: string[];
    frequencies: number[];
    fractalSoundArt: FractalSoundArtRoom;
    acousticSpaces: string[];
}
export interface FractalSoundArtRoom {
    baseFrequency: number;
    harmonics: number[];
    geometry: string;
    interactive: boolean;
}
export interface ProfessionalRoomFeatures {
    designTools: string[];
    exportFormats: string[];
    collaborationSpaces: string[];
    qualityControls: string[];
}
export interface FusionRoomFeatures {
    fusionEngine: boolean;
    arcanaFusions: string[];
    gateFusions: number[];
    codexFusions: number[];
    modeFusions: string[];
}
export interface RoomQuest {
    id: string;
    name: string;
    description: string;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
    rewards: string[];
}
export interface RoomInteraction {
    id: string;
    type: 'dialogue' | 'ritual' | 'creation' | 'exploration' | 'learning';
    arcana?: string;
    description: string;
    outcome: string;
}
export interface RoomReward {
    type: 'ability' | 'knowledge' | 'item' | 'relationship' | 'gateway';
    name: string;
    description: string;
    unlocks: string[];
}
export interface SystemPortal {
    id: string;
    name: string;
    destination: {
        type: 'app' | 'package' | 'room' | 'gate' | 'arcana' | 'codex';
        id: string;
    };
    description: string;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface RoomFusion {
    id: string;
    name: string;
    type: 'arcana' | 'gate' | 'codex' | 'mode' | 'room';
    arcanaA?: string;
    arcanaB?: string;
    gateA?: number;
    gateB?: number;
    codexNodeA?: number;
    codexNodeB?: number;
    modeA?: string;
    modeB?: string;
    result: string;
    description: string;
    unlocks: string[];
}
export interface RoomLearningPath {
    id: string;
    name: string;
    spiralLevel: number;
    stages: LearningPathStage[];
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
    modes: string[];
}
export interface LearningPathStage {
    number: number;
    name: string;
    description: string;
    exercises: string[];
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export declare const COMPLETE_MYSTERY_HOUSE_ROOMS: CompleteMysteryHouseRoom[];
/**
 * Get room by ID
 */
export declare function getCompleteRoom(id: string): CompleteMysteryHouseRoom | undefined;
/**
 * Get rooms by mode
 */
export declare function getRoomsByMode(modeId: string): CompleteMysteryHouseRoom[];
/**
 * Get rooms by Arcana
 */
export declare function getRoomsByArcana(arcanaId: string): CompleteMysteryHouseRoom[];
/**
 * Get rooms by Gate
 */
export declare function getRoomsByGate(gateNumber: number): CompleteMysteryHouseRoom[];
/**
 * Get rooms by Codex Node
 */
export declare function getRoomsByCodexNode(nodeId: number): CompleteMysteryHouseRoom[];
/**
 * Get all rooms
 */
export declare function getAllCompleteRooms(): CompleteMysteryHouseRoom[];
export type { CompleteMysteryHouseRoom, GameRoomFeatures, ArtRoomFeatures, SoundRoomFeatures, ProfessionalRoomFeatures, FusionRoomFeatures, FractalSoundArtRoom, RoomQuest, RoomInteraction, RoomReward, SystemPortal, RoomFusion, RoomLearningPath, LearningPathStage };
//# sourceMappingURL=mystery-house-complete-integration.d.ts.map