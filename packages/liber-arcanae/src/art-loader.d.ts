/**
 * art-loader
 *
 * @package @cathedral/liber-arcanae
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate art loading
 *
 * Creative use: Game apps, art apps, visual apps, tarot apps
 */
/**
 * Liber Arcanae Codex Abyssiae Art Loader
 *
 * Loads and manages art assets for the 78-card tarot deck
 * Supports both generated art and static assets
 */
/**
 * ⚗️ CardArtAsset - The Principle
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
export interface CardArtAsset {
    cardId: string;
    frontImage?: string;
    backImage?: string;
    thumbnail?: string;
    artStyle: 'visionary' | 'renaissance' | 'baroque' | 'sacred-geometry';
    generated: boolean;
    source: 'generated' | 'static' | 'user-upload';
}
/**
 * ⚗️ ArtGeneratorConfig - The Principle
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
export interface ArtGeneratorConfig {
    style: 'visionary' | 'renaissance' | 'baroque';
    palette: string[];
    sacredGeometry: boolean;
    includeSeal: boolean;
}
export declare class LiberArcanaeArtLoader {
    private artAssets;
    private artBasePath;
    private sealImage?;
    constructor(artBasePath?: string);
    /**
     * Load the Seal of Abyssiae (card back)
     */
    private loadSeal;
    /**
     * Generate Seal of Abyssiae programmatically
     */
    private generateSealSVG;
    /**
     * Load art for a specific card
     */
    loadCardArt(cardId: string, config?: ArtGeneratorConfig): Promise<CardArtAsset>;
    /**
     * Generate card art programmatically
     */
    private generateCardArt;
    /**
     * Draw sacred geometry background
     */
    private drawSacredGeometryBackground;
    /**
     * Draw card-specific elements
     */
    private drawCardElements;
    /**
     * Generate placeholder SVG
     */
    private generatePlaceholderSVG;
    /**
     * Get art asset for a card
     */
    getCardArt(cardId: string): CardArtAsset | undefined;
    /**
     * Get seal image
     */
    getSealImage(): string | undefined;
    /**
     * Load all Major Arcana art
     */
    loadAllMajorArcana(): Promise<Map<string, CardArtAsset>>;
    /**
     * Preload all card art
     */
    preloadAllCards(): Promise<void>;
}
export declare const liberArcanaeArtLoader: LiberArcanaeArtLoader;
//# sourceMappingURL=art-loader.d.ts.map