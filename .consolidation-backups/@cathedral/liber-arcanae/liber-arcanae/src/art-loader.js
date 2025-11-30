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
export class LiberArcanaeArtLoader {
    artAssets = new Map();
    artBasePath;
    sealImage;
    constructor(artBasePath = '/data/liber-arcanae/art') {
        this.artBasePath = artBasePath;
        this.loadSeal();
    }
    /**
     * Load the Seal of Abyssiae (card back)
     */
    async loadSeal() {
        try {
            // Try to load seal from static assets
            const sealPath = `${this.artBasePath}/seal/seal-of-abyssiae.svg`;
            // If running in browser, try to fetch
            if (typeof window !== 'undefined') {
                try {
                    const response = await fetch(sealPath);
                    if (response.ok) {
                        this.sealImage = sealPath;
                        // console.log('✅ Loaded Seal of Abyssiae');
                    }
                }
                catch (error) {
                    // console.warn('Seal image not found, will generate programmatically');
                }
            }
            // Generate seal programmatically if not found
            if (!this.sealImage) {
                this.sealImage = this.generateSealSVG();
            }
        }
        catch (error) {
            // console.error('Error loading seal:', error);
            this.sealImage = this.generateSealSVG();
        }
    }
    /**
     * Generate Seal of Abyssiae programmatically
     */
    generateSealSVG() {
        // Generate the seal as SVG with sacred geometry
        return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sealGradient">
            <stop offset="0%" stop-color="#0d0b12"/>
            <stop offset="50%" stop-color="#8a7fff"/>
            <stop offset="100%" stop-color="#f4d03f"/>
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#sealGradient)" opacity="0.3"/>
        <circle cx="200" cy="200" r="150" fill="none" stroke="#f4d03f" stroke-width="2"/>
        <!-- 78 glyphs around outer ring -->
        <g transform="translate(200,200)">
          ${Array.from({ length: 78 }, (_, i) => {
            const angle = (i / 78) * Math.PI * 2;
            const x = Math.cos(angle) * 140;
            const y = Math.sin(angle) * 140;
            return `<text x="${x}" y="${y}" fill="#f4d03f" font-size="8" text-anchor="middle" transform="rotate(${angle * 180 / Math.PI + 90}, ${x}, ${y})">●</text>`;
        }).join('')}
        </g>
        <!-- 72 Shem angels / Goetia demons ring -->
        <g transform="translate(200,200)">
          ${Array.from({ length: 72 }, (_, i) => {
            const angle = (i / 72) * Math.PI * 2;
            const x = Math.cos(angle) * 100;
            const y = Math.sin(angle) * 100;
            return `<circle cx="${x}" cy="${y}" r="2" fill="${i % 2 === 0 ? '#6de0e0' : '#ff9fbe'}"/>`;
        }).join('')}
        </g>
        <!-- 33 alchemical beads -->
        <g transform="translate(200,200)">
          ${Array.from({ length: 33 }, (_, i) => {
            const angle = (i / 33) * Math.PI * 2;
            const x = Math.cos(angle) * 60;
            const y = Math.sin(angle) * 60;
            return `<circle cx="${x}" cy="${y}" r="3" fill="#8a7fff"/>`;
        }).join('')}
        </g>
        <!-- Hexagram -->
        <polygon points="200,50 250,100 200,150 150,100" fill="none" stroke="#f4d03f" stroke-width="2"/>
        <polygon points="200,150 250,200 200,250 150,200" fill="none" stroke="#f4d03f" stroke-width="2"/>
        <!-- Vesica with LuxCrux cross -->
        <ellipse cx="200" cy="200" rx="30" ry="50" fill="none" stroke="#f4d03f" stroke-width="2"/>
        <line x1="200" y1="150" x2="200" y2="250" stroke="#f4d03f" stroke-width="2"/>
        <line x1="150" y1="200" x2="250" y2="200" stroke="#f4d03f" stroke-width="2"/>
      </svg>
    `)}`;
    }
    /**
     * Load art for a specific card
     */
    async loadCardArt(cardId, config) {
        // Check if already loaded
        if (this.artAssets.has(cardId)) {
            return this.artAssets.get(cardId);
        }
        // Try to load from static assets first
        let artAsset = null;
        if (typeof window !== 'undefined') {
            try {
                const staticPath = `${this.artBasePath}/cards/${cardId}.png`;
                const response = await fetch(staticPath, { method: 'HEAD' });
                if (response.ok) {
                    artAsset = {
                        cardId,
                        frontImage: staticPath,
                        backImage: this.sealImage,
                        thumbnail: `${this.artBasePath}/cards/${cardId}_thumb.png`,
                        artStyle: 'visionary',
                        generated: false,
                        source: 'static'
                    };
                }
            }
            catch (error) {
                // Static asset not found, will generate
            }
        }
        // Generate art if not found
        if (!artAsset) {
            artAsset = await this.generateCardArt(cardId, config);
        }
        this.artAssets.set(cardId, artAsset);
        return artAsset;
    }
    /**
     * Generate card art programmatically
     */
    async generateCardArt(cardId, config) {
        const style = config?.style || 'visionary';
        // Use canvas to generate art if available
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 1200;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Generate sacred geometry background
                this.drawSacredGeometryBackground(ctx, canvas.width, canvas.height, style);
                // Add card-specific elements
                this.drawCardElements(ctx, cardId, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/png');
                return {
                    cardId,
                    frontImage: imageData,
                    backImage: this.sealImage,
                    artStyle: style,
                    generated: true,
                    source: 'generated'
                };
            }
        }
        // Fallback: return placeholder
        return {
            cardId,
            frontImage: this.generatePlaceholderSVG(cardId),
            backImage: this.sealImage,
            artStyle: style,
            generated: true,
            source: 'generated'
        };
    }
    /**
     * Draw sacred geometry background
     */
    drawSacredGeometryBackground(ctx, width, height, style) {
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#0d0b12');
        gradient.addColorStop(0.5, '#8a7fff');
        gradient.addColorStop(1, '#f4d03f');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        // Golden ratio spiral
        const centerX = width / 2;
        const centerY = height / 2;
        const phi = (1 + Math.sqrt(5)) / 2;
        ctx.strokeStyle = '#f4d03f';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 144; i++) {
            const angle = i * (Math.PI * 2 / 144) * (144 / 99);
            const radius = Math.sqrt(i) * 10;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            if (i === 0) {
                ctx.moveTo(x, y);
            }
            else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    /**
     * Draw card-specific elements
     */
    drawCardElements(ctx, cardId, width, height) {
        // Add card name and number
        ctx.fillStyle = '#f4d03f';
        ctx.font = 'bold 48px serif';
        ctx.textAlign = 'center';
        ctx.fillText(cardId, width / 2, height / 2);
    }
    /**
     * Generate placeholder SVG
     */
    generatePlaceholderSVG(cardId) {
        return `data:image/svg+xml;base64,${btoa(`
      <svg width="800" height="1200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0d0b12"/>
            <stop offset="50%" stop-color="#8a7fff"/>
            <stop offset="100%" stop-color="#f4d03f"/>
          </linearGradient>
        </defs>
        <rect width="800" height="1200" fill="url(#cardGradient)"/>
        <text x="400" y="600" font-family="serif" font-size="48" fill="#f4d03f" text-anchor="middle">${cardId}</text>
      </svg>
    `)}`;
    }
    /**
     * Get art asset for a card
     */
    getCardArt(cardId) {
        return this.artAssets.get(cardId);
    }
    /**
     * Get seal image
     */
    getSealImage() {
        return this.sealImage;
    }
    /**
     * Load all Major Arcana art
     */
    async loadAllMajorArcana() {
        const majorArcana = Array.from({ length: 22 }, (_, i) => `major_${i}`);
        const assets = new Map();
        for (const cardId of majorArcana) {
            const asset = await this.loadCardArt(cardId);
            assets.set(cardId, asset);
        }
        return assets;
    }
    /**
     * Preload all card art
     */
    async preloadAllCards() {
        // Load Major Arcana
        await this.loadAllMajorArcana();
        // Load Minor Arcana
        const suits = ['wands', 'cups', 'swords', 'pentacles'];
        const numbers = Array.from({ length: 14 }, (_, i) => i + 1);
        for (const suit of suits) {
            for (const number of numbers) {
                const cardId = `${suit}_${number}`;
                await this.loadCardArt(cardId);
            }
        }
    }
}
// Export singleton instance
export const liberArcanaeArtLoader = new LiberArcanaeArtLoader();
//# sourceMappingURL=art-loader.js.map