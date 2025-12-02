/**
 * asset-loader
 * 
 * @package @cathedral/magical-mystery-house
 */
/**
 * Magical Mystery House - Asset Loader
 * 
 * Loads and manages real images and assets
 * Connects to actual files you've created
 */

import { MysteryHouseAsset, getAssetsByRoom, getAsset } from './asset-manifest';

export class AssetLoader {
  private loadedAssets: Map<string, HTMLImageElement | HTMLVideoElement | HTMLAudioElement> = new Map();
  private assetBasePath: string;

  constructor(basePath: string = '/assets/magical-mystery-house') {
    this.assetBasePath = basePath;
  }

  /**
   * Load image asset
   */
  async loadImage(asset: MysteryHouseAsset): Promise<HTMLImageElement> {
    const cacheKey = asset.id;
    
    if (this.loadedAssets.has(cacheKey)) {
      return this.loadedAssets.get(cacheKey) as HTMLImageElement;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedAssets.set(cacheKey, img);
        resolve(img);
      };
      img.onerror = () => {
// console.warn(`⚠️ Failed to load image: ${asset.path}`);
        // Create placeholder
        const placeholder = this.createPlaceholder(asset);
        this.loadedAssets.set(cacheKey, placeholder);
        resolve(placeholder);
      };
      img.src = this.assetBasePath + asset.path;
      img.alt = asset.alt;
    });
  }

  /**
   * Load all assets for a room
   */
  async loadRoomAssets(roomId: string): Promise<Map<string, HTMLImageElement>> {
    const assets = getAssetsByRoom(roomId);
    const loaded = new Map<string, HTMLImageElement>();

    await Promise.all(
      assets.map(async (asset) => {
        if (asset.type === 'image') {
          const img = await this.loadImage(asset);
          loaded.set(asset.id, img);
        }
      })
    );

    return loaded;
  }

  /**
   * Create placeholder image
   */
  private createPlaceholder(asset: MysteryHouseAsset): HTMLImageElement {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw placeholder
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#eee';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(asset.alt, canvas.width / 2, canvas.height / 2);
      
      ctx.fillStyle = '#888';
      ctx.font = '16px Arial';
      ctx.fillText('Placeholder - Image coming soon', canvas.width / 2, canvas.height / 2 + 40);
    }

    const img = new Image();
    img.src = canvas.toDataURL();
    img.alt = asset.alt;
    return img;
  }

  /**
   * Get asset URL
   */
  getAssetUrl(asset: MysteryHouseAsset): string {
    return this.assetBasePath + asset.path;
  }

  /**
   * Preload all assets
   */
  async preloadAll(): Promise<void> {
    const allAssets = getAssetsByRoom('entry-hall')
      .concat(getAssetsByRoom('soul-library'))
      .concat(getAssetsByRoom('body-archive'))
      .concat(getAssetsByRoom('spirit-observatory'))
      .concat(getAssetsByRoom('fusion-chamber'))
      .concat(getAssetsByRoom('ribbon-nexus'))
      .concat(getAssetsByRoom('archetypal-grove'))
      .concat(getAssetsByRoom('mystery-portal'));

    await Promise.all(
      allAssets
        .filter(asset => asset.type === 'image')
        .map(asset => this.loadImage(asset))
    );
  }
}

export const assetLoader = new AssetLoader();
