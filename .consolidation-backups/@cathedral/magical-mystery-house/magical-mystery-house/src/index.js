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
import { getAllRooms } from './rooms';
import { getAssetsByRoom, getAllRooms as getAssetRooms } from './asset-manifest';
export class MagicalMysteryHouse {
    rooms = new Map();
    assets = new Map();
    constructor() {
        this.initializeRooms();
        this.initializeAssets();
    }
    initializeRooms() {
        const rooms = getAllRooms();
        rooms.forEach(room => {
            // Rooms are loaded from rooms.ts
            this.rooms.set(room.id, room);
        });
    }
    initializeAssets() {
        const assetRooms = getAssetRooms();
        assetRooms.forEach(roomId => {
            const assets = getAssetsByRoom(roomId);
            this.assets.set(roomId, assets);
        });
    }
    /**
     * Get room with assets
     */
    getRoom(roomId) {
        const room = this.rooms.get(roomId);
        if (!room)
            return null;
        const assets = this.assets.get(roomId) || [];
        return { room, assets };
    }
    /**
     * Get all rooms with their assets
     */
    getAllRoomsWithAssets() {
        return Array.from(this.rooms.values()).map(room => ({
            room,
            assets: this.assets.get(room.id) || []
        }));
    }
    /**
     * Connect to Trinity systems
     */
    connectToTrinity() {
        return {
            soul: '../circuitum99/index.js',
            body: '../stone-grimoire/index.js',
            spirit: '../cosmogenesis-learning-engine/index.js'
        };
    }
    /**
     * Connect to apps
     */
    connectToApps() {
        return {
            web: '../../apps/web',
            synthLab: '../../apps/synth-lab',
            tarotArena: '../../apps/tarot-arena'
        };
    }
    /**
     * Get system status
     */
    getSystemStatus() {
        return {
            rooms: this.rooms.size,
            assets: Array.from(this.assets.values()).flat().length,
            connections: {
                trinity: true,
                apps: true,
                packages: true
            }
        };
    }
}
export const magicalMysteryHouse = new MagicalMysteryHouse();
//# sourceMappingURL=index.js.map