/**
 * OCR Processor for Unified Codex Extraction
 *
 * Handles text extraction from ALL domains with professional quality:
 * Scientific papers, mystical texts, literary works, technical manuals, etc.
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */
import { BookSource } from '../types/extraction-types';
export declare class OCRProcessor {
    private languages;
    /**
     * Extract text from image with domain-specific optimization
     */
    extractText(imagePath: string, metadata: BookSource['metadata']): Promise<string | null>;
    /**
     * Domain-specific OCR optimization settings
     */
    private getOptimizedSettings;
    /**
     * Detect optimal language for OCR
     */
    private detectLanguage;
    /**
     * Perform OCR with domain awareness
     */
    private performOCR;
    /**
     * Clean and process extracted text based on domain
     */
    private cleanExtractedText;
    private cleanScientificText;
    private cleanMysticalText;
    private cleanTechnicalText;
    private cleanArtisticText;
    private cleanGeneralText;
    /**
     * Infer domain from file path
     */
    private inferDomainFromPath;
    /**
     * Calculate OCR confidence score
     */
    calculateOCRConfidence(text: string, domain: string): number;
    /**
     * Extract mathematical content from text
     */
    extractMathematicalContent(text: string): {
        equations: string[];
        formulas: string[];
    };
    /**
     * Extract sacred symbols from text
     */
    extractSacredSymbols(text: string): {
        symbols: string[];
        meanings: Record<string, string>;
    };
}
//# sourceMappingURL=ocrProcessor.d.ts.map