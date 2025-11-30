/**
 * chapels
 *
 * @package @cathedral/stone-grimoire
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate details throughout
 *
 * Creative use: Game apps, book apps, grimoire apps, art apps
 */
/**
 * Stone Grimoire - 8 Chapels System
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate details throughout
 *
 * Each chapel is a complete explorable space with:
 * - Real research and correspondences
 * - Master art traditions
 * - Sacred geometry
 * - Interactive pathworking
 * - Trauma-informed design (never flat, always flowing)
 * - Sophisticated 3D environments
 * - Museum-quality rendering
 */
/**
 * ⚗️ Chapel - The Principle
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
export interface Chapel {
    id: string;
    name: string;
    number: number;
    element: string;
    direction: string;
    theme: string;
    description: string;
    folios: number[];
    features: ChapelFeature[];
    correspondences: ChapelCorrespondences;
    pathworking: PathworkingNode[];
    art: ArtTradition[];
    research: ResearchSource[];
}
/**
 * ⚗️ ChapelFeature - The Principle
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
export interface ChapelFeature {
    id: string;
    name: string;
    type: 'interactive' | 'exploration' | 'creation' | 'learning' | 'pathworking';
    description: string;
    unlockCondition?: string;
    connections?: string[];
}
/**
 * ⚗️ ChapelCorrespondences - The Principle
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
export interface ChapelCorrespondences {
    planet: string;
    zodiac: string;
    element: string;
    color: string;
    geometry: string;
    shemAngel?: string;
    goetiaDemon?: string;
    deity?: string;
    iChing?: string;
    soyga?: string;
}
/**
 * ⚗️ PathworkingNode - The Principle
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
export interface PathworkingNode {
    id: string;
    title: string;
    description: string;
    exercises: string[];
    correspondences: Record<string, any>;
}
/**
 * ⚗️ ArtTradition - The Principle
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
export interface ArtTradition {
    name: string;
    period: string;
    techniques: string[];
    masters: string[];
    examples: string[];
}
/**
 * ⚗️ ResearchSource - The Principle
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
export interface ResearchSource {
    name: string;
    type: 'library' | 'archive' | 'museum' | 'academic' | 'digital';
    url?: string;
    description: string;
}
export declare const CHAPELS: Chapel[];
/**
 * Get chapel by ID
 */
export declare function getChapel(id: string): Chapel | undefined;
/**
 * Get chapel by number (1-8)
 */
export declare function getChapelByNumber(number: number): Chapel | undefined;
/**
 * Get all chapels
 */
export declare function getAllChapels(): Chapel[];
/**
 * Get folio's chapel
 */
export declare function getChapelForFolio(folioNumber: number): Chapel | undefined;
//# sourceMappingURL=chapels.d.ts.map