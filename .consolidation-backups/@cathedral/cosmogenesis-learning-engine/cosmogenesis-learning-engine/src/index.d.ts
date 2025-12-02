/**
 * 🌀 COSMOGENESIS LEARNING ENGINE
 *
 * The premier Spiral Dynamics creative learning platform
 *
 * Features:
 * - Full Spiral Dynamics integration (Clare Graves / Beck-Cowan)
 * - 144 Codex nodes mapped to developmental stages
 * - 7 creative learning modes
 * - Multi-language international support
 * - Neurodivergent-accessible design
 * - Trauma-informed practices
 *
 * @package @cathedral/cosmogenesis-learning-engine
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate learning mechanics
 *
 * Creative use: Learning apps, education apps, spiral dynamics apps, consciousness apps
 */
export * from './spiral-dynamics-learning';
export { spiralDynamicsEngine, SPIRAL_LEVELS } from './spiral-dynamics-learning';
export * from './international-branding';
export { CATHEDRAL_BRAND, RECOGNITION_BADGES, SPIRAL_CURRICULUM, ACCESSIBILITY_FEATURES, getBrandInfo, getRecognitionBadges, getCurriculumOverview, getAccessibilityFeatures, getSupportedLanguages } from './international-branding';
import { SpiralDynamicsLearningEngine, SpiralLevel, LearnerProfile } from './spiral-dynamics-learning';
/**
 * Quick start function for new learners
 */
export declare function quickStart(learnerName: string, preferredLanguage?: string): Promise<{
    profile: LearnerProfile;
    brandInfo: {
        tagline: string;
        name: string;
        mission: string;
        taglines: {
            en: string;
            es: string;
            fr: string;
            de: string;
            it: string;
            pt: string;
            ja: string;
            zh: string;
            ko: string;
            ar: string;
            hi: string;
            ru: string;
        };
        valuePropositions: string[];
        differentiators: {
            codex144: string;
            spiralIntegration: string;
            multiModal: string;
            sacredGeometry: string;
            solfeggioFrequencies: string;
            traumaInformed: string;
            freeForever: string;
        };
    };
    firstModule: import("@cathedral/shared").LearningModule | null;
    message: string;
}>;
/**
 * Get spiral level information
 */
export declare function getSpiralLevel(level: SpiralLevel): import("@cathedral/shared").SpiralLevelDefinition;
/**
 * Get all spiral levels
 */
export declare function getAllSpiralLevels(): import("@cathedral/shared").SpiralLevelDefinition[];
/**
 * Get Codex nodes for a spiral level
 */
export declare function getCodexNodesForLevel(level: SpiralLevel): number[];
/**
 * Generate personalized learning path
 */
export declare function generateLearningPath(profile: LearnerProfile, targetLevel: SpiralLevel): import("@cathedral/shared").LearningPath;
declare const _default: {
    engine: SpiralDynamicsLearningEngine;
    brand: {
        name: string;
        tagline: string;
        mission: string;
        taglines: {
            en: string;
            es: string;
            fr: string;
            de: string;
            it: string;
            pt: string;
            ja: string;
            zh: string;
            ko: string;
            ar: string;
            hi: string;
            ru: string;
        };
        valuePropositions: string[];
        differentiators: {
            codex144: string;
            spiralIntegration: string;
            multiModal: string;
            sacredGeometry: string;
            solfeggioFrequencies: string;
            traumaInformed: string;
            freeForever: string;
        };
    };
    quickStart: typeof quickStart;
    getSpiralLevel: typeof getSpiralLevel;
    getAllSpiralLevels: typeof getAllSpiralLevels;
    getCodexNodesForLevel: typeof getCodexNodesForLevel;
    generateLearningPath: typeof generateLearningPath;
};
export default _default;
//# sourceMappingURL=index.d.ts.map