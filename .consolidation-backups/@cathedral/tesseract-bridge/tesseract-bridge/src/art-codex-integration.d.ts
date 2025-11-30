/**
 * 🎨 Art-Codex Integration
 *
 * Connects the Codex 144:99 directly to art generation and visual tools
 * Every node has visual properties that can be rendered
 *
 * @package @cathedral/tesseract-bridge
 */
import { CreativeFlowBridge } from './creative-flow-bridge';
export interface CodexArtProperties {
    nodeId: number;
    element: string;
    visualStyle: VisualStyle;
    sacredGeometry: SacredGeometryConfig;
    colorHarmony: ColorHarmony;
    animationProfile: AnimationProfile;
    textureProfile: TextureProfile;
}
export interface VisualStyle {
    name: string;
    mood: 'ethereal' | 'grounded' | 'dynamic' | 'serene' | 'intense' | 'mysterious';
    complexity: number;
    contrast: number;
    saturation: number;
    brightness: number;
}
export interface SacredGeometryConfig {
    type: string;
    sides: number;
    iterations: number;
    scale: number;
    rotation: number;
    nested: boolean;
    goldenRatio: boolean;
}
export interface ColorHarmony {
    primary: string;
    secondary: string[];
    accent: string;
    background: string;
    harmony: 'complementary' | 'triadic' | 'analogous' | 'split-complementary' | 'tetradic';
    temperature: 'warm' | 'cool' | 'neutral';
}
export interface AnimationProfile {
    type: 'static' | 'breathing' | 'pulsing' | 'flowing' | 'spiraling' | 'morphing';
    speed: number;
    intensity: number;
    easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'elastic' | 'bounce';
}
export interface TextureProfile {
    type: 'smooth' | 'grainy' | 'organic' | 'crystalline' | 'ethereal' | 'metallic';
    opacity: number;
    blendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
}
export declare const SACRED_GEOMETRIES: Record<string, SacredGeometryConfig>;
export declare const ELEMENT_PALETTES: Record<string, ColorHarmony>;
/**
 * Art-Codex Integration
 *
 * Provides visual properties for every Codex 144:99 node
 */
export declare class ArtCodexIntegration {
    private creativeFlowBridge;
    private artPropertiesCache;
    constructor(creativeFlowBridge?: CreativeFlowBridge);
    /**
     * Initialize art properties for all 144 nodes
     */
    private initializeArtProperties;
    /**
     * Generate art properties for a Codex node
     */
    private generateArtProperties;
    /**
     * Generate visual style for element
     */
    private generateVisualStyle;
    /**
     * Generate color harmony for node
     */
    private generateColorHarmony;
    /**
     * Generate animation profile for node
     */
    private generateAnimationProfile;
    /**
     * Generate texture profile for node
     */
    private generateTextureProfile;
    /**
     * Get art properties for a Codex node
     */
    getNodeArtProperties(nodeId: number): CodexArtProperties | null;
    /**
     * Get art properties for multiple nodes
     */
    getNodesArtProperties(nodeIds: number[]): CodexArtProperties[];
    /**
     * Get all art properties for an element
     */
    getElementsByElement(element: string): CodexArtProperties[];
    /**
     * Get sacred geometry configuration
     */
    getSacredGeometry(type: string): SacredGeometryConfig | null;
    /**
     * Get element color palette
     */
    getElementPalette(element: string): ColorHarmony | null;
    /**
     * Generate combined art style from multiple nodes (Fusion)
     */
    fuseNodeStyles(nodeIds: number[]): CodexArtProperties | null;
    /**
     * Generate CSS for art properties
     */
    generateCSS(properties: CodexArtProperties): string;
    /**
     * Generate Three.js material config
     */
    generateThreeMaterial(properties: CodexArtProperties): object;
}
export declare const artCodexIntegration: ArtCodexIntegration;
export default ArtCodexIntegration;
//# sourceMappingURL=art-codex-integration.d.ts.map