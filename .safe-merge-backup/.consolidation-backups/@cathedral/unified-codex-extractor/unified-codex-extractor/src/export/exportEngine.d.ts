/**
 * Export Engine for Unified Codex Extraction
 *
 * Professional export system for your original codex creation:
 * Your Codex 144:99, your sacred mathematics, your personal libraries
 *
 * Supports multiple formats for your magnum opus:
 * - SVG for infinite scalability
 * - JSON for data integration
 * - PDF for publication
 * - AI/EPS for professional design
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 * @license CC0 - Your Original Work
 */
import { ProcessingResult, ExportFormat, ExportResult } from '../types/extraction-types';
export declare class ExportEngine {
    private exportFormats;
    /**
     * Export processing result in specified format
     */
    export(result: ProcessingResult, format: ExportFormat): Promise<ExportResult>;
    /**
     * Export to SVG (infinite scalability, your own sacred geometry)
     */
    private exportToSVG;
    /**
     * Export to JSON (for your data integration and analysis)
     */
    private exportToJSON;
    /**
     * Export to PDF (for publication and sharing)
     */
    private exportToPDF;
    /**
     * Export to AI (Adobe Illustrator - for professional design)
     */
    private exportToAI;
    /**
     * Export to EPS (Encapsulated PostScript)
     */
    private exportToEPS;
    /**
     * Export to PNG (for web and digital use)
     */
    private exportToPNG;
    /**
     * Export to JPG (for web and digital use)
     */
    private exportToJPG;
    private convertToSVG;
    private convertToAIFormat;
    private convertToEPS;
    private generateFilename;
    private generateQualityReport;
    private generateSacredGeometryReport;
}
//# sourceMappingURL=exportEngine.d.ts.map