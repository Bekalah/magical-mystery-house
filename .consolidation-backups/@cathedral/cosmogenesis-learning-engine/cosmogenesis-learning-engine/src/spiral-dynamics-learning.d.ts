/**
 * 🌀 SPIRAL DYNAMICS LEARNING ENGINE
 *
 * A revolutionary learning system that integrates:
 * - Clare Graves' Emergent Cyclical Levels of Existence
 * - Don Beck & Chris Cowan's Spiral Dynamics
 * - Codex 144:99 Sacred Mathematics
 * - Multi-modal creative learning (Game, Music, Art, Design, Research)
 *
 * This makes Cathedral internationally distinctive as a
 * consciousness-evolution learning platform
 *
 * @package @cathedral/cosmogenesis-learning-engine
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate spiral dynamics mechanics
 *
 * Creative use: Learning apps, education apps, spiral dynamics apps, consciousness apps
 */
/**
 * The 8 core Spiral Dynamics levels (vMEMEs)
 * Each level represents a worldview and value system
 */
export type SpiralLevel = 'beige' | 'purple' | 'red' | 'blue' | 'orange' | 'green' | 'yellow' | 'turquoise' | 'coral';
export interface SpiralLevelDefinition {
    level: SpiralLevel;
    color: string;
    name: string;
    worldview: string;
    coreValues: string[];
    learningStyle: string;
    motivation: string;
    fears: string[];
    strengths: string[];
    codexNodes: number[];
    frequency: number;
    element: string;
    sacredGeometry: string;
    arcanaCards: string[];
    creativeMode: string;
    artStyle: string;
    musicStyle: string;
}
/**
 * Complete Spiral Dynamics level definitions
 * Each level maps to specific Codex nodes and creative tools
 */
export declare const SPIRAL_LEVELS: Record<SpiralLevel, SpiralLevelDefinition>;
export interface LearningPath {
    id: string;
    name: string;
    description: string;
    currentLevel: SpiralLevel;
    targetLevel: SpiralLevel;
    progress: number;
    modules: LearningModule[];
    completedModules: string[];
    activeModule: string | null;
}
export interface LearningModule {
    id: string;
    name: string;
    spiralLevel: SpiralLevel;
    type: 'game' | 'music' | 'art' | 'design' | 'research' | 'practice' | 'integration';
    duration: number;
    difficulty: 1 | 2 | 3 | 4 | 5;
    prerequisites: string[];
    objectives: string[];
    content: ModuleContent;
    assessment: Assessment;
    codexNodes: number[];
    arcanaCards: string[];
}
export interface ModuleContent {
    introduction: string;
    theory: ContentSection[];
    practice: PracticeActivity[];
    reflection: ReflectionPrompt[];
    resources: Resource[];
}
export interface ContentSection {
    title: string;
    content: string;
    mediaType: 'text' | 'video' | 'audio' | 'interactive' | '3d';
    duration: number;
}
export interface PracticeActivity {
    id: string;
    type: 'game' | 'create' | 'explore' | 'meditate' | 'collaborate';
    description: string;
    duration: number;
    tools: string[];
    spiralLevel: SpiralLevel;
}
export interface ReflectionPrompt {
    question: string;
    spiralLevel: SpiralLevel;
    journalEntry?: boolean;
}
export interface Resource {
    title: string;
    type: 'book' | 'video' | 'article' | 'tool' | 'practice';
    url?: string;
    spiralLevel: SpiralLevel;
}
export interface Assessment {
    type: 'quiz' | 'project' | 'reflection' | 'peer-review' | 'self-assessment';
    criteria: AssessmentCriteria[];
    passingScore: number;
}
export interface AssessmentCriteria {
    name: string;
    description: string;
    weight: number;
    spiralAlignment: SpiralLevel[];
}
export interface LearnerProfile {
    id: string;
    name: string;
    currentLevels: Record<SpiralLevel, number>;
    dominantLevel: SpiralLevel;
    emergingLevel: SpiralLevel;
    learningPaths: LearningPath[];
    completedModules: string[];
    totalLearningTime: number;
    creativeOutputs: CreativeOutput[];
    spiralJourney: SpiralJourneyEntry[];
}
export interface SpiralJourneyEntry {
    timestamp: Date;
    fromLevel: SpiralLevel;
    toLevel: SpiralLevel;
    trigger: string;
    insight: string;
    integration: string;
}
export interface CreativeOutput {
    id: string;
    type: 'art' | 'music' | 'writing' | 'game' | 'design';
    spiralLevel: SpiralLevel;
    codexNodes: number[];
    created: Date;
    title: string;
    description: string;
}
/**
 * The Spiral Dynamics Learning Engine
 *
 * A revolutionary learning system that adapts to the learner's
 * developmental level and provides appropriate challenges
 */
export declare class SpiralDynamicsLearningEngine {
    private learnerProfile;
    private modules;
    private listeners;
    constructor();
    /**
     * Initialize learning modules for all spiral levels
     */
    private initializeModules;
    /**
     * Generate learning modules for a spiral level
     */
    private generateModulesForLevel;
    /**
     * Generate learning objectives for a module
     */
    private generateObjectives;
    /**
     * Generate content for a module
     */
    private generateContent;
    /**
     * Generate assessment for a module
     */
    private generateAssessment;
    /**
     * Capitalize first letter
     */
    private capitalize;
    /**
     * Create a new learner profile
     */
    createLearnerProfile(name: string): LearnerProfile;
    /**
     * Assess learner's spiral level
     */
    assessSpiralLevel(responses: Record<string, number>): {
        dominant: SpiralLevel;
        emerging: SpiralLevel;
        levels: Record<SpiralLevel, number>;
    };
    /**
     * Generate a personalized learning path
     */
    generateLearningPath(profile: LearnerProfile, targetLevel: SpiralLevel): LearningPath;
    /**
     * Get recommended module based on current state
     */
    getRecommendedModule(profile: LearnerProfile): LearningModule | null;
    /**
     * Complete a module
     */
    completeModule(profile: LearnerProfile, moduleId: string, score: number): void;
    /**
     * Check if learner is emerging to a new level
     */
    private checkLevelEmergence;
    /**
     * Get spiral level info
     */
    getSpiralLevel(level: SpiralLevel): SpiralLevelDefinition;
    /**
     * Get all spiral levels
     */
    getAllSpiralLevels(): SpiralLevelDefinition[];
    /**
     * Get modules for a level
     */
    getModulesForLevel(level: SpiralLevel): LearningModule[];
    /**
     * Get Codex nodes for a spiral level
     */
    getCodexNodesForLevel(level: SpiralLevel): number[];
    /**
     * Get creative mode for a spiral level
     */
    getCreativeModeForLevel(level: SpiralLevel): string;
    /**
     * Subscribe to events
     */
    on(event: string, callback: Function): () => void;
    /**
     * Emit an event
     */
    private emit;
}
export declare const spiralDynamicsEngine: SpiralDynamicsLearningEngine;
export default SpiralDynamicsLearningEngine;
//# sourceMappingURL=spiral-dynamics-learning.d.ts.map