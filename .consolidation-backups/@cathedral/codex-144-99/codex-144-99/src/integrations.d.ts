/**
 * integrations
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Integrations
 *
 * Integration with:
 * - Soyga (Book of Soyga)
 * - I Ching (64 Hexagrams)
 * - 72 Shem Angels
 * - 72 Goetia Demons
 * - Gods and Goddesses from all traditions
 * - Real research and correspondences
 * - Never flat - always flowing, trauma-informed
 */
export interface SoygaTable {
    id: string;
    name: string;
    element: string;
    correspondences: Record<string, any>;
    connections: number[];
}
export interface IChingHexagram {
    number: number;
    name: string;
    chinese: string;
    meaning: string;
    lines: string;
    correspondences: Record<string, any>;
    connections: number[];
}
export interface ShemAngel {
    number: number;
    name: string;
    meaning: string;
    planet: string;
    correspondences: Record<string, any>;
    connections: number[];
}
export interface GoetiaDemon {
    number: number;
    name: string;
    rank: string;
    description: string;
    correspondences: Record<string, any>;
    connections: number[];
}
export interface Deity {
    name: string;
    tradition: string;
    domain: string;
    correspondences: Record<string, any>;
    connections: number[];
}
export declare const SOYGA_TABLES: SoygaTable[];
export declare const I_CHING_HEXAGRAMS: IChingHexagram[];
export declare const SHEM_ANGELS: ShemAngel[];
export declare const GOETIA_DEMONS: GoetiaDemon[];
export declare const DEITIES: Deity[];
/**
 * Get Soyga table by element
 */
export declare function getSoygaTable(element: string): SoygaTable | undefined;
/**
 * Get I Ching hexagram by number
 */
export declare function getIChingHexagram(number: number): IChingHexagram | undefined;
/**
 * Get Shem Angel by number
 */
export declare function getShemAngel(number: number): ShemAngel | undefined;
/**
 * Get Goetia Demon by number
 */
export declare function getGoetiaDemon(number: number): GoetiaDemon | undefined;
/**
 * Get deities by tradition
 */
export declare function getDeitiesByTradition(tradition: string): Deity[];
/**
 * Get all correspondences for a Codex node
 */
export declare function getNodeCorrespondences(nodeId: number): {
    soyga?: SoygaTable;
    iChing?: IChingHexagram;
    shemAngel?: ShemAngel;
    goetiaDemon?: GoetiaDemon;
    deities?: Deity[];
};
//# sourceMappingURL=integrations.d.ts.map