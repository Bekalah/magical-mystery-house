/**
 * index
 *
 * @package @cathedral/magical-mystery-house
 */
/**
 * Magical Mystery House - Complete Integration
 *
 * Connects to:
 * - Real images and assets you've created
 * - All Trinity systems (Soul/Body/Spirit)
 * - All packages and apps
 * - Cross-directory connections
 */
import { MysteryRoom } from './rooms';
import { MysteryHouseAsset } from './asset-manifest';
export declare class MagicalMysteryHouse {
    private rooms;
    private assets;
    constructor();
    private initializeRooms;
    private initializeAssets;
    /**
     * Get room with assets
     */
    getRoom(roomId: string): {
        room: MysteryRoom;
        assets: MysteryHouseAsset[];
    } | null;
    /**
     * Get all rooms with their assets
     */
    getAllRoomsWithAssets(): Array<{
        room: MysteryRoom;
        assets: MysteryHouseAsset[];
    }>;
    /**
     * Connect to Trinity systems
     */
    connectToTrinity(): {
        soul: string;
        body: string;
        spirit: string;
    };
    /**
     * Connect to apps
     */
    connectToApps(): {
        web: string;
        synthLab: string;
        tarotArena: string;
    };
    /**
     * Get system status
     */
    getSystemStatus(): {
        rooms: number;
        assets: number;
        connections: {
            trinity: boolean;
            apps: boolean;
            packages: boolean;
        };
    };
}
export declare const magicalMysteryHouse: MagicalMysteryHouse;
//# sourceMappingURL=index.d.ts.map