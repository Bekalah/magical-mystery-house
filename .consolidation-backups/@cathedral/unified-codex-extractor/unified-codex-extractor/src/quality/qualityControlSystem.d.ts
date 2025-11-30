/**
 * Quality Control System for Unified Codex Extraction
 *
 * Professional quality validation across ALL knowledge domains with domain-specific standards:
 * Scientific accuracy, mystical authenticity, artistic integrity, technical precision
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */
import { ExtractedContent, BookSource, KnowledgeDomain } from '../types/extraction-types';
export declare class QualityControlSystem {
    private qualityGuardians;
    constructor();
    /**
     * Initialize domain-specific quality guardians
     */
    private initializeQualityGuardians;
    /**
     * Validate all content with appropriate domain guardians
     */
    validateAllContent(content: ExtractedContent[], metadata: BookSource['metadata']): Promise<ExtractedContent[]>;
    /**
     * Scientific domain validation
     */
    private validateScientific;
    /**
     * Mystical domain validation
     */
    private validateMystical;
    /**
     * Artistic domain validation
     */
    private validateArtistic;
    /**
     * Technical domain validation
     */
    private validateTechnical;
    /**
     * Enhance content with validation results
     */
    private enhanceContentWithValidation;
    /**
     * Get quality report for a domain
     */
    getQualityReport(domain: KnowledgeDomain): any;
}
//# sourceMappingURL=qualityControlSystem.d.ts.map