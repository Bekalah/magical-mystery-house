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
export interface ChapelFeature {
    id: string;
    name: string;
    type: 'interactive' | 'exploration' | 'creation' | 'learning' | 'pathworking';
    description: string;
    unlockCondition?: string;
    connections?: string[];
}
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
export interface PathworkingNode {
    id: string;
    title: string;
    description: string;
    exercises: string[];
    correspondences: Record<string, any>;
}
export interface ArtTradition {
    name: string;
    period: string;
    techniques: string[];
    masters: string[];
    examples: string[];
}
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