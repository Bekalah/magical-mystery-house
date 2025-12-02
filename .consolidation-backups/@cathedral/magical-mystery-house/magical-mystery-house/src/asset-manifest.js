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
/**
 * Asset Manifest for Magical Mystery House
 *
 * This connects to your real images and assets
 */
export const MYSTERY_HOUSE_ASSETS = [
    // Entry Hall
    {
        id: 'entry-hall-main',
        room: 'entry-hall',
        type: 'image',
        path: '/assets/magical-mystery-house/entry-hall/main.jpg',
        alt: 'Magical Mystery House Entry Hall',
        description: 'The grand entrance to the Magical Mystery House',
        metadata: {
            photographer: 'Rebecca Respawn',
            date: '2024'
        }
    },
    // Soul Library (Circuitum99)
    {
        id: 'soul-library-main',
        room: 'soul-library',
        type: 'image',
        path: '/assets/magical-mystery-house/soul-library/main.jpg',
        alt: 'Soul Library - Circuitum99 Connection',
        description: 'The library connecting to Circuitum99 and the 99 gates',
        metadata: {
            photographer: 'Rebecca Respawn',
            date: '2024'
        }
    },
    // Body Archive (Stone Grimoire)
    {
        id: 'body-archive-main',
        room: 'body-archive',
        type: 'image',
        path: '/assets/magical-mystery-house/body-archive/main.jpg',
        alt: 'Body Archive - Stone Grimoire Connection',
        description: 'The archive connecting to Stone Grimoire and 8 chapels',
        metadata: {
            photographer: 'Rebecca Respawn',
            date: '2024'
        }
    },
    // Spirit Observatory (Cosmogenesis)
    {
        id: 'spirit-observatory-main',
        room: 'spirit-observatory',
        type: 'image',
        path: '/assets/magical-mystery-house/spirit-observatory/main.jpg',
        alt: 'Spirit Observatory - Cosmogenesis Connection',
        description: 'The observatory connecting to Cosmogenesis Learning Engine',
        metadata: {
            photographer: 'Rebecca Respawn',
            date: '2024'
        }
    },
    // Fusion Chamber
    {
        id: 'fusion-chamber-main',
        room: 'fusion-chamber',
        type: 'image',
        path: '/assets/magical-mystery-house/fusion-chamber/main.jpg',
        alt: 'Fusion Chamber - 144:99 Fusion Kink Technology',
        description: 'The sacred space for Fusion Kink Technology',
        metadata: {
            photographer: 'Rebecca Respawn',
            date: '2024'
        }
    },
    // Ribbon Nexus (Tesseract Bridge)
    {
        id: 'ribbon-nexus-main',
        room: 'ribbon-nexus',
        type: 'image',
        path: '/assets/magical-mystery-house/ribbon-nexus/main.jpg',
        alt: 'Ribbon Nexus - Tesseract Bridge Control Room',
        description: 'The control room for the 7-ribbon Tesseract Bridge',
        metadata: {
            photographer: 'Rebecca Respawn',
            date: '2024'
        }
    },
    // Archetypal Grove
    {
        id: 'archetypal-grove-main',
        room: 'archetypal-grove',
        type: 'image',
        path: '/assets/magical-mystery-house/archetypal-grove/main.jpg',
        alt: 'Archetypal Grove - Living Beings Interaction Space',
        description: 'The grove for interacting with living archetypal beings',
        metadata: {
            photographer: 'Rebecca Respawn',
            date: '2024'
        }
    },
    // Mystery Portal
    {
        id: 'mystery-portal-main',
        room: 'mystery-portal',
        type: 'image',
        path: '/assets/magical-mystery-house/mystery-portal/main.jpg',
        alt: 'Mystery Portal - Extended Universe Connections',
        description: 'The portal to extended universe connections',
        metadata: {
            photographer: 'Rebecca Respawn',
            date: '2024'
        }
    }
];
/**
 * Get assets by room
 */
export function getAssetsByRoom(room) {
    return MYSTERY_HOUSE_ASSETS.filter(asset => asset.room === room);
}
/**
 * Get asset by ID
 */
export function getAsset(id) {
    return MYSTERY_HOUSE_ASSETS.find(asset => asset.id === id);
}
/**
 * Get all room IDs
 */
export function getAllRooms() {
    return Array.from(new Set(MYSTERY_HOUSE_ASSETS.map(asset => asset.room)));
}
//# sourceMappingURL=asset-manifest.js.map