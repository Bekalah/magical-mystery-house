/**
 * stone-grimoire
 *
 * @package @cathedral/stone-grimoire
 */
/**
 * Stone Grimoire - Body System
 *
 * 8 octagram halls with 144 folios
 * Sacred archive and chapel navigation
 * Real implementation with master art principles
 */
/**
 * ⚗️ OctagramHall - The Principle
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
export interface OctagramHall {
    id: number;
    name: string;
    element: string;
    folios: number[];
    geometry: {
        points: {
            x: number;
            y: number;
            z: number;
        }[];
        center: {
            x: number;
            y: number;
            z: number;
        };
        radius: number;
    };
    correspondences: {
        chakra: string;
        planet: string;
        color: string;
        frequency: number;
    };
}
/**
 * ⚗️ Folio - The Principle
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
export interface Folio {
    id: number;
    hall: number;
    name: string;
    content: string;
    correspondences: {
        codexNode: number;
        tarotCard?: string;
        chapter?: number;
    };
}
/**
 * Stone Grimoire System
 *
 * Complete implementation with master art principles
 */
export declare class StoneGrimoire {
    private codex;
    private halls;
    private folios;
    constructor();
    /**
     * Initialize 8 octagram halls
     */
    private initializeHalls;
    /**
     * Initialize 144 folios (18 per hall)
     */
    private initializeFolios;
    /**
     * Get folios for a hall
     */
    private getFoliosForHall;
    /**
     * Get hall color based on element
     */
    private getHallColor;
    /**
     * Get hall frequency (Solfeggio)
     */
    private getHallFrequency;
    /**
     * Get hall by ID
     */
    getHall(hallId: number): OctagramHall | undefined;
    /**
     * Get folio by ID
     */
    getFolio(folioId: number): Folio | undefined;
    /**
     * Get all halls
     */
    getAllHalls(): OctagramHall[];
    /**
     * Get all folios
     */
    getAllFolios(): Folio[];
    /**
     * Get folios in a hall
     */
    getFoliosInHall(hallId: number): Folio[];
}
//# sourceMappingURL=stone-grimoire.d.ts.map