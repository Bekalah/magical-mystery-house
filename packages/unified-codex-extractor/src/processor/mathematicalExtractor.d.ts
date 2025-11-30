/**
 * Mathematical Extractor for Unified Codex Extraction
 *
 * Professional mathematical content extraction from ALL domains:
 * Scientific equations, mystical formulas, technical calculations, artistic proportions
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */
import { MathematicalEquation } from '../types/extraction-types';
export declare class MathematicalExtractor {
    private mathematicalSymbols;
    private sacredFormulas;
    private scientificFormulas;
    /**
     * Extract mathematical equations from image/text
     */
    extractEquations(imagePath: string, metadata: {
        domain: string;
        title: string;
        author: string;
    }): Promise<ExtractedMathContent[]>;
    /**
     * Extract mystical mathematical formulas
     */
    private extractMysticalFormulas;
    /**
     * Extract scientific equations
     */
    private extractScientificEquations;
    /**
     * Extract technical calculations
     */
    private extractTechnicalCalculations;
    /**
     * Extract general mathematics
     */
    private extractGeneralMathematics;
    /**
     * Analyze text for mathematical content
     */
    analyzeTextForMath(text: string): Promise<MathematicalValidation>;
    /**
     * Validate technical diagram
     */
    validateTechnicalDiagram(diagram: any): Promise<MathematicalValidation>;
    private convertLatexToMathML;
    private parseEquationToText;
    private inferDomain;
    private assessComplexity;
    private getFrequencyForFormula;
}
/**
 * ⚗️ ExtractedMathContent - The Principle
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
interface ExtractedMathContent {
    id: string;
    type: 'equation' | 'formula' | 'theorem' | 'calculation';
    domain: string;
    equation: MathematicalEquation;
    culturalContext: string;
    frequency: number;
    authenticity: number;
}
export {};
//# sourceMappingURL=mathematicalExtractor.d.ts.map