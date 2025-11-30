/**
 * 🎨 Art-Codex Integration
 *
 * Connects the Codex 144:99 directly to art generation and visual tools
 * Every node has visual properties that can be rendered
 *
 * @package @cathedral/tesseract-bridge
 */
import { CODEX_CREATIVE_MAP, CreativeFlowBridge } from './creative-flow-bridge';
// ============================================
// SACRED GEOMETRY DEFINITIONS
// ============================================
export const SACRED_GEOMETRIES = {
    'flower-of-life': {
        type: 'flower-of-life',
        sides: 6,
        iterations: 7,
        scale: 1,
        rotation: 0,
        nested: true,
        goldenRatio: true
    },
    'metatron': {
        type: 'metatron',
        sides: 13,
        iterations: 1,
        scale: 1.618,
        rotation: 0,
        nested: true,
        goldenRatio: true
    },
    'sri-yantra': {
        type: 'sri-yantra',
        sides: 9,
        iterations: 4,
        scale: 1,
        rotation: 0,
        nested: true,
        goldenRatio: true
    },
    'merkaba': {
        type: 'merkaba',
        sides: 8,
        iterations: 2,
        scale: 1.414,
        rotation: 45,
        nested: true,
        goldenRatio: false
    },
    'torus': {
        type: 'torus',
        sides: 36,
        iterations: 12,
        scale: 1,
        rotation: 0,
        nested: false,
        goldenRatio: true
    },
    'vesica-piscis': {
        type: 'vesica-piscis',
        sides: 2,
        iterations: 1,
        scale: 1,
        rotation: 0,
        nested: false,
        goldenRatio: true
    },
    'seed-of-life': {
        type: 'seed-of-life',
        sides: 7,
        iterations: 1,
        scale: 1,
        rotation: 0,
        nested: true,
        goldenRatio: true
    },
    'tree-of-life': {
        type: 'tree-of-life',
        sides: 10,
        iterations: 1,
        scale: 1.618,
        rotation: 0,
        nested: true,
        goldenRatio: true
    },
    'tetrahedron': {
        type: 'tetrahedron',
        sides: 4,
        iterations: 1,
        scale: 1,
        rotation: 0,
        nested: false,
        goldenRatio: false
    },
    'cube': {
        type: 'cube',
        sides: 6,
        iterations: 1,
        scale: 1,
        rotation: 0,
        nested: false,
        goldenRatio: false
    },
    'octahedron': {
        type: 'octahedron',
        sides: 8,
        iterations: 1,
        scale: 1,
        rotation: 45,
        nested: false,
        goldenRatio: false
    },
    'icosahedron': {
        type: 'icosahedron',
        sides: 20,
        iterations: 1,
        scale: 1.618,
        rotation: 0,
        nested: false,
        goldenRatio: true
    },
    'dodecahedron': {
        type: 'dodecahedron',
        sides: 12,
        iterations: 1,
        scale: 1.618,
        rotation: 36,
        nested: false,
        goldenRatio: true
    }
};
// ============================================
// ELEMENT-BASED COLOR PALETTES
// ============================================
export const ELEMENT_PALETTES = {
    Fire: {
        primary: '#FF4500',
        secondary: ['#FF6347', '#FF8C00', '#FFD700'],
        accent: '#FFFFFF',
        background: '#1A0000',
        harmony: 'analogous',
        temperature: 'warm'
    },
    Water: {
        primary: '#1E90FF',
        secondary: ['#00CED1', '#4169E1', '#7B68EE'],
        accent: '#FFFFFF',
        background: '#00001A',
        harmony: 'analogous',
        temperature: 'cool'
    },
    Earth: {
        primary: '#228B22',
        secondary: ['#8B4513', '#DAA520', '#556B2F'],
        accent: '#FFD700',
        background: '#0A1A0A',
        harmony: 'triadic',
        temperature: 'neutral'
    },
    Air: {
        primary: '#87CEEB',
        secondary: ['#E6E6FA', '#B0C4DE', '#F0F8FF'],
        accent: '#FFD700',
        background: '#0A0A1A',
        harmony: 'complementary',
        temperature: 'cool'
    },
    Spirit: {
        primary: '#FFD700',
        secondary: ['#FFFFFF', '#E6E6FA', '#DDA0DD'],
        accent: '#9932CC',
        background: '#0A0A0A',
        harmony: 'split-complementary',
        temperature: 'neutral'
    }
};
// ============================================
// ART-CODEX INTEGRATION CLASS
// ============================================
/**
 * Art-Codex Integration
 *
 * Provides visual properties for every Codex 144:99 node
 */
export class ArtCodexIntegration {
    creativeFlowBridge;
    artPropertiesCache = new Map();
    constructor(creativeFlowBridge) {
        this.creativeFlowBridge = creativeFlowBridge || new CreativeFlowBridge();
        this.initializeArtProperties();
    }
    /**
     * Initialize art properties for all 144 nodes
     */
    initializeArtProperties() {
        for (let nodeId = 1; nodeId <= 144; nodeId++) {
            const properties = this.generateArtProperties(nodeId);
            this.artPropertiesCache.set(nodeId, properties);
        }
    }
    /**
     * Generate art properties for a Codex node
     */
    generateArtProperties(nodeId) {
        const nodeMap = CODEX_CREATIVE_MAP[nodeId];
        const element = nodeMap?.element || 'Spirit';
        const geometry = nodeMap?.geometry || 'flower-of-life';
        const color = nodeMap?.color || '#FFD700';
        // Calculate visual style based on node position
        const layer = Math.floor((nodeId - 1) / 12) + 1;
        const position = (nodeId - 1) % 12;
        return {
            nodeId,
            element,
            visualStyle: this.generateVisualStyle(element, layer, position),
            sacredGeometry: SACRED_GEOMETRIES[geometry] || SACRED_GEOMETRIES['flower-of-life'],
            colorHarmony: this.generateColorHarmony(element, color),
            animationProfile: this.generateAnimationProfile(element, layer),
            textureProfile: this.generateTextureProfile(element)
        };
    }
    /**
     * Generate visual style for element
     */
    generateVisualStyle(element, layer, position) {
        const moods = {
            Fire: 'intense',
            Water: 'serene',
            Earth: 'grounded',
            Air: 'ethereal',
            Spirit: 'mysterious'
        };
        return {
            name: `${element} Layer ${layer}`,
            mood: moods[element] || 'ethereal',
            complexity: Math.min(10, layer + 2),
            contrast: element === 'Fire' ? 8 : element === 'Water' ? 4 : 6,
            saturation: element === 'Spirit' ? 10 : 7,
            brightness: element === 'Air' ? 9 : element === 'Earth' ? 5 : 7
        };
    }
    /**
     * Generate color harmony for node
     */
    generateColorHarmony(element, primaryColor) {
        const basePalette = ELEMENT_PALETTES[element] || ELEMENT_PALETTES['Spirit'];
        return {
            ...basePalette,
            primary: primaryColor
        };
    }
    /**
     * Generate animation profile for node
     */
    generateAnimationProfile(element, layer) {
        const animations = {
            Fire: 'pulsing',
            Water: 'flowing',
            Earth: 'breathing',
            Air: 'morphing',
            Spirit: 'spiraling'
        };
        return {
            type: animations[element] || 'breathing',
            speed: 0.3 + (layer / 24), // Faster for higher layers
            intensity: 0.5 + (layer / 24),
            easing: element === 'Fire' ? 'ease-in' : element === 'Water' ? 'ease-out' : 'ease-in-out'
        };
    }
    /**
     * Generate texture profile for node
     */
    generateTextureProfile(element) {
        const textures = {
            Fire: 'grainy',
            Water: 'smooth',
            Earth: 'crystalline',
            Air: 'ethereal',
            Spirit: 'metallic'
        };
        return {
            type: textures[element] || 'smooth',
            opacity: element === 'Air' ? 0.7 : 1,
            blendMode: element === 'Spirit' ? 'soft-light' : 'normal'
        };
    }
    // ============================================
    // PUBLIC API
    // ============================================
    /**
     * Get art properties for a Codex node
     */
    getNodeArtProperties(nodeId) {
        return this.artPropertiesCache.get(nodeId) || null;
    }
    /**
     * Get art properties for multiple nodes
     */
    getNodesArtProperties(nodeIds) {
        return nodeIds
            .map(id => this.artPropertiesCache.get(id))
            .filter((p) => p !== null);
    }
    /**
     * Get all art properties for an element
     */
    getElementsByElement(element) {
        return Array.from(this.artPropertiesCache.values())
            .filter(p => p.element === element);
    }
    /**
     * Get sacred geometry configuration
     */
    getSacredGeometry(type) {
        return SACRED_GEOMETRIES[type] || null;
    }
    /**
     * Get element color palette
     */
    getElementPalette(element) {
        return ELEMENT_PALETTES[element] || null;
    }
    /**
     * Generate combined art style from multiple nodes (Fusion)
     */
    fuseNodeStyles(nodeIds) {
        const properties = this.getNodesArtProperties(nodeIds);
        if (properties.length === 0)
            return null;
        // Blend all properties
        const fusedProperties = {
            nodeId: 0, // Fusion has no single node
            element: 'Spirit', // Fusion is always Spirit
            visualStyle: {
                name: `Fusion of ${nodeIds.length} nodes`,
                mood: 'mysterious',
                complexity: Math.round(properties.reduce((sum, p) => sum + p.visualStyle.complexity, 0) / properties.length),
                contrast: Math.round(properties.reduce((sum, p) => sum + p.visualStyle.contrast, 0) / properties.length),
                saturation: Math.round(properties.reduce((sum, p) => sum + p.visualStyle.saturation, 0) / properties.length),
                brightness: Math.round(properties.reduce((sum, p) => sum + p.visualStyle.brightness, 0) / properties.length)
            },
            sacredGeometry: SACRED_GEOMETRIES['metatron'], // Fusion uses Metatron's Cube
            colorHarmony: {
                primary: properties[0].colorHarmony.primary,
                secondary: properties.map(p => p.colorHarmony.primary),
                accent: '#FFD700',
                background: '#0A0A0A',
                harmony: 'tetradic',
                temperature: 'neutral'
            },
            animationProfile: {
                type: 'morphing',
                speed: 0.5,
                intensity: 0.8,
                easing: 'elastic'
            },
            textureProfile: {
                type: 'ethereal',
                opacity: 0.9,
                blendMode: 'soft-light'
            }
        };
        return fusedProperties;
    }
    /**
     * Generate CSS for art properties
     */
    generateCSS(properties) {
        const { colorHarmony, visualStyle, animationProfile } = properties;
        return `
      --primary-color: ${colorHarmony.primary};
      --secondary-color: ${colorHarmony.secondary[0]};
      --accent-color: ${colorHarmony.accent};
      --background-color: ${colorHarmony.background};
      --complexity: ${visualStyle.complexity};
      --contrast: ${visualStyle.contrast};
      --saturation: ${visualStyle.saturation}%;
      --brightness: ${visualStyle.brightness * 10}%;
      --animation-speed: ${animationProfile.speed}s;
      --animation-intensity: ${animationProfile.intensity};
      animation: ${animationProfile.type} var(--animation-speed) var(--animation-easing, ease-in-out) infinite;
    `;
    }
    /**
     * Generate Three.js material config
     */
    generateThreeMaterial(properties) {
        const { colorHarmony, textureProfile, visualStyle } = properties;
        return {
            color: colorHarmony.primary,
            emissive: colorHarmony.accent,
            emissiveIntensity: visualStyle.brightness / 10,
            metalness: textureProfile.type === 'metallic' ? 0.9 : 0.1,
            roughness: textureProfile.type === 'smooth' ? 0.1 : 0.5,
            opacity: textureProfile.opacity,
            transparent: textureProfile.opacity < 1
        };
    }
}
// ============================================
// SINGLETON INSTANCE
// ============================================
export const artCodexIntegration = new ArtCodexIntegration();
export default ArtCodexIntegration;
//# sourceMappingURL=art-codex-integration.js.map