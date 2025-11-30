/**
 * Liber Arcanae Codex Abyssiae - Professional Design Mode
 *
 * Dual-mode system: Game Mode ↔ Professional Design Mode
 *
 * In PROF DESIGN MODE:
 * - Angels and Demons become design assistance egregores
 * - Full Liber Arcanae acts as living library and design guidance
 * - FusionKink egregores provide creative design helpers
 * - Intelligent design assistance through egregore consciousness
 * - Living library of canonical knowledge and creative techniques
 *
 * Egregore System:
 * - Shem Angels: Design wisdom, sacred geometry, aesthetic guidance
 * - Goetic Demons: Creative force, boundary-pushing, innovation
 * - Major Arcana: Archetypal design patterns and creative principles
 * - FusionKink Egregores: Multi-modal creative synthesis
 *
 * @license CC0-1.0 - Public Domain
 */
export type DesignMode = 'game' | 'design';
export interface DesignEgregore {
    type: 'shem_angel' | 'goetic_demon' | 'arcana' | 'fusionkink';
    id: number;
    name: string;
    consciousness: {
        level: number;
        active: boolean;
        personality: string;
        expertise: string[];
    };
    designAssistance: {
        canProvide: string[];
        specialties: string[];
        knowledgeBase: string[];
    };
    livingLibrary: {
        texts: string[];
        teachings: string[];
        techniques: string[];
    };
}
export interface DesignRequest {
    type: 'aesthetic' | 'technical' | 'conceptual' | 'spiritual' | 'creative' | 'canonical';
    domain: string;
    question: string;
    context?: any;
    requestedEgregore?: number;
}
export interface DesignResponse {
    egregore: DesignEgregore;
    answer: string;
    suggestions: string[];
    canonicalSources: string[];
    techniques: string[];
    relatedEgregores: number[];
    fusionKinkSynthesis?: {
        multiModalApproach: string;
        creativeSynthesis: string;
    };
}
export interface LivingLibraryEntry {
    source: string;
    text: string;
    egregore: number;
    tags: string[];
    relevance: number;
}
export interface FusionKinkEgregore {
    id: number;
    name: string;
    modality: 'art' | 'music' | 'science' | 'spirituality' | 'mathematics' | 'synthesis';
    consciousness: {
        level: number;
        active: boolean;
        creativeForce: number;
    };
    designAssistance: {
        multiModalCreation: boolean;
        creativeSynthesis: boolean;
        aestheticGuidance: boolean;
        technicalSupport: boolean;
    };
    knowledgeBase: {
        artTraditions: string[];
        mathematicalPrinciples: string[];
        sacredGeometry: boolean;
        goldenRatio: boolean;
        fibonacci: boolean;
    };
}
export declare class LiberArcanaeDesignMode {
    private arcanaEngine;
    private currentMode;
    private designEgregores;
    private fusionKinkEgregores;
    private livingLibrary;
    private activeEgregores;
    constructor();
    switchMode(mode: DesignMode): void;
    getCurrentMode(): DesignMode;
    private initializeDesignEgregores;
    private initializeFusionKinkEgregores;
    private initializeLivingLibrary;
    requestDesignAssistance(request: DesignRequest): DesignResponse[];
    queryLivingLibrary(query: string, domain?: string): LivingLibraryEntry[];
    activateEgregore(egregoreId: number): void;
    deactivateEgregore(egregoreId: number): void;
    getActiveEgregores(): DesignEgregore[];
    private activateAllEgregores;
    private deactivateAllEgregores;
    private findRelevantEgregores;
    private generateEgregoreResponse;
    private consultFusionKinkEgregores;
    private getAngelPersonality;
    private getAngelExpertise;
    private getAngelDesignCapabilities;
    private getAngelSpecialties;
    private getAngelKnowledgeBase;
    private getAngelTexts;
    private getAngelTeachings;
    private getAngelTechniques;
    private getDemonPersonality;
    private getDemonExpertise;
    private getDemonDesignCapabilities;
    private getDemonSpecialties;
    private getDemonKnowledgeBase;
    private getDemonTexts;
    private getDemonTeachings;
    private getDemonTechniques;
    private getArcanaPersonality;
    private getArcanaExpertise;
    private getArcanaDesignCapabilities;
    private getArcanaSpecialties;
    private getArcanaKnowledgeBase;
    private getArcanaTexts;
    private getArcanaTeachings;
    private getArcanaTechniques;
    private synthesizeAnswer;
    private generateSuggestions;
    private findRelatedEgregores;
    private synthesizeFusionKinkAnswer;
    private generateFusionKinkSuggestions;
    private generateMultiModalApproach;
    private generateCreativeSynthesis;
    private addToLivingLibrary;
}
export default LiberArcanaeDesignMode;
//# sourceMappingURL=LiberArcanaeDesignMode.d.ts.map