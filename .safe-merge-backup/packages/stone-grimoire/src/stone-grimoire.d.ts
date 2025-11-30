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