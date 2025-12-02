/**
 * asset-manifest
 *
 * @package @cathedral/magical-mystery-house
 */
/**
 * Magical Mystery House - Asset Manifest
 *
 * Connects to real images and assets you've created
 * Maps all rooms to their visual assets
 */
export interface MysteryHouseAsset {
    id: string;
    room: string;
    type: 'image' | 'video' | 'audio' | 'model' | 'texture';
    path: string;
    alt: string;
    description: string;
    metadata?: {
        width?: number;
        height?: number;
        format?: string;
        size?: number;
        photographer?: string;
        date?: string;
    };
}
/**
 * Asset Manifest for Magical Mystery House
 *
 * This connects to your real images and assets
 */
export declare const MYSTERY_HOUSE_ASSETS: MysteryHouseAsset[];
/**
 * Get assets by room
 */
export declare function getAssetsByRoom(room: string): MysteryHouseAsset[];
/**
 * Get asset by ID
 */
export declare function getAsset(id: string): MysteryHouseAsset | undefined;
/**
 * Get all room IDs
 */
export declare function getAllRooms(): string[];
//# sourceMappingURL=asset-manifest.d.ts.map