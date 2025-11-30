/**
 * Vector Extractor for Unified Codex Extraction
 *
 * Extracts and processes vector graphics from ALL knowledge domains:
 * Scientific schematics, mystical mandalas, technical blueprints, artistic illustrations
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */
import { ProcessedVector, KnowledgeDomain } from '../types/extraction-types';
export declare class VectorExtractor {
    private sacredGeometryPaths;
    private mathematicalPaths;
    /**
     * Extract vector graphics from image
     */
    extractVectors(imagePath: string, metadata: {
        domain: KnowledgeDomain;
        title: string;
        author: string;
    }): Promise<ExtractedVectorContent[]>;
    /**
     * Extract mysticalsacred geometry vectors
     */
    private extractMysticalVectors;
    /**
     * Extract scientific vectors
     */
    private extractScientificVectors;
    /**
     * Extract technical vectors
     */
    private extractTechnicalVectors;
    /**
     * Extract artistic vectors
     */
    private extractArtisticVectors;
    /**
     * Extract general vectors
     */
    private extractGeneralVectors;
    /**
     * Process extracted vector into professional format
     */
    processVector(vector: ExtractedVectorContent): ProcessedVector;
    /**
     * Parse SVG path into commands
     */
    private parseSVGPath;
    /**
     * Generate SVG from vector data
     */
    private generateSVG;
    /**
     * Calculate vector accuracy
     */
    private calculateVectorAccuracy;
    private getFrequencyForPattern;
    private getMeaningForPattern;
    private getFormulaForDiagram;
}
/**
 * ⚗️ ExtractedVectorContent - The Principle
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
interface ExtractedVectorContent {
    id: string;
    type: string;
    domain: KnowledgeDomain;
    path: string;
    style: {
        stroke: string;
        fill: string;
        strokeWidth: number;
        opacity: number;
    };
    metadata: Record<string, any>;
}
export {};
//# sourceMappingURL=vectorExtractor.d.ts.map