/**
 * World App Maker Integration - Complete Ornate System
 *
 * @package @cathedral/liber-arcanae
 *
 * COSMOGENESIS LEARNING ENGINE - World App Maker
 * Technology to switch between:
 * - 🎮 Game Mode (RPG, exploration, pathworking)
 * - 🎨 High-Level Art Mode (Master art, sacred geometry, luxury design)
 * - 🎵 Sound Mode (Synthesis, fractal sound art, frequencies)
 * - 💼 Professional Mode (Design suite, export, collaboration)
 *
 * Integrates:
 * - 8 Magical Mystery House Rooms
 * - Fusion Kink Engine (A × B = D)
 * - Cosmogenesis Learning Engine (Spiral Dynamics)
 * - All 22 Master Arcanae
 * - All 99 Gates
 * - Complete Codex 144:99
 */
import { FusionKinkEngine } from '@cathedral/cathedral-fusion-kink-engine';
import { spiralDynamicsEngine } from '@cathedral/cosmogenesis-learning-engine';
/**
 * ⚗️ WorldAppMaker - The Principle
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
export interface WorldAppMaker {
    id: 'cosmogenesis-world-app-maker';
    name: 'Cosmogenesis World App Maker';
    description: 'Technology to seamlessly switch between game, art, sound, and professional modes';
    modes: AppMode[];
    currentMode: AppMode;
    modeSwitcher: ModeSwitcher;
    rooms: MysteryHouseRoomIntegration[];
    fusionEngine: FusionKinkIntegration;
    learningEngine: CosmogenesisIntegration;
}
/**
 * ⚗️ AppMode - The Principle
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
export interface AppMode {
    id: string;
    name: string;
    type: 'game' | 'art' | 'sound' | 'professional' | 'fusion' | 'flow';
    description: string;
    tools: ModeTool[];
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
    rooms: string[];
    frequency: number;
    colorPalette: string[];
    sacredGeometry: string;
    spiralLevel: number;
    integralMapping: IntegralModeMapping;
}
/**
 * ⚗️ ModeTool - The Principle
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
export interface ModeTool {
    id: string;
    name: string;
    type: string;
    description: string;
    package: string;
    app?: string;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
/**
 * ⚗️ ModeSwitcher - The Principle
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
export interface ModeSwitcher {
    currentMode: AppMode;
    previousMode: AppMode | null;
    transitionHistory: ModeTransition[];
    contextPreservation: boolean;
    transitionEffects: TransitionEffect[];
}
/**
 * ⚗️ ModeTransition - The Principle
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
export interface ModeTransition {
    from: AppMode;
    to: AppMode;
    timestamp: number;
    duration: number;
    contextPreserved: boolean;
    toolsCarriedOver: string[];
    codexNodesCarriedOver: number[];
}
/**
 * ⚗️ TransitionEffect - The Principle
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
export interface TransitionEffect {
    type: 'fade' | 'morph' | 'harmonic' | 'geometric' | 'frequency';
    duration: number;
    easing: string;
    sound?: number;
    visual?: string;
}
/**
 * ⚗️ IntegralModeMapping - The Principle
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
export interface IntegralModeMapping {
    wilber: {
        quadrant: 'upperLeft' | 'upperRight' | 'lowerLeft' | 'lowerRight';
        level: number;
        line: string;
        state: string;
    };
    leary: {
        circuit: number;
        name: string;
    };
    jung: {
        archetype: string;
        shadow: string;
    };
    regardie: {
        sephirah: string;
        path: string;
        grade: string;
    };
}
/**
 * ⚗️ MysteryHouseRoomIntegration - The Principle
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
export interface MysteryHouseRoomIntegration {
    id: string;
    name: string;
    number: number;
    description: string;
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
    modes: AppMode[];
    fusionOpportunities: FusionOpportunity[];
    learningPath: LearningPath;
    assets: RoomAsset[];
    portals: RoomPortal[];
}
/**
 * ⚗️ FusionOpportunity - The Principle
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
export interface FusionOpportunity {
    id: string;
    name: string;
    description: string;
    arcanaA: string;
    arcanaB: string;
    result: string;
    codexNodes: number[];
    gates: number[];
}
/**
 * ⚗️ LearningPath - The Principle
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
export interface LearningPath {
    spiralLevel: number;
    stages: LearningStage[];
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
}
/**
 * ⚗️ LearningStage - The Principle
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
export interface LearningStage {
    number: number;
    name: string;
    description: string;
    exercises: string[];
    arcanaConnection?: string;
    gateConnection?: number;
}
/**
 * ⚗️ RoomAsset - The Principle
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
export interface RoomAsset {
    id: string;
    name: string;
    type: 'image' | 'sound' | 'geometry' | 'text' | 'interactive';
    path: string;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
/**
 * ⚗️ RoomPortal - The Principle
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
export interface RoomPortal {
    id: string;
    name: string;
    destination: string;
    type: 'room' | 'app' | 'mode' | 'gate' | 'arcana';
    arcanaConnection?: string;
    gateConnection?: number;
}
/**
 * ⚗️ FusionKinkIntegration - The Principle
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
export interface FusionKinkIntegration {
    engine: FusionKinkEngine;
    arcanaFusions: ArcanaFusion[];
    gateFusions: GateFusion[];
    codexFusions: CodexFusion[];
    modeFusions: ModeFusion[];
}
/**
 * ⚗️ ArcanaFusion - The Principle
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
export interface ArcanaFusion {
    id: string;
    arcanaA: string;
    arcanaB: string;
    result: string;
    description: string;
    codexNodes: number[];
    gates: number[];
    modes: AppMode[];
    chariot: ChariotFusion;
    daimon: DaimonFusion;
}
/**
 * ⚗️ GateFusion - The Principle
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
export interface GateFusion {
    id: string;
    gateA: number;
    gateB: number;
    result: number;
    description: string;
    fractalSoundArt: FractalSoundArtFusion;
    codexNodes: number[];
    arcanae: string[];
}
/**
 * ⚗️ CodexFusion - The Principle
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
export interface CodexFusion {
    id: string;
    nodeA: number;
    nodeB: number;
    result: number;
    description: string;
    arcanae: string[];
    gates: number[];
    modes: AppMode[];
}
/**
 * ⚗️ ModeFusion - The Principle
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
export interface ModeFusion {
    id: string;
    modeA: AppMode;
    modeB: AppMode;
    result: AppMode;
    description: string;
    tools: ModeTool[];
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
}
/**
 * ⚗️ ChariotFusion - The Principle
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
export interface ChariotFusion {
    chariotA: string;
    chariotB: string;
    result: string;
    form: string;
    abilities: string[];
}
/**
 * ⚗️ DaimonFusion - The Principle
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
export interface DaimonFusion {
    daimonA: string;
    daimonB: string;
    result: string;
    nature: string;
    wisdom: string;
}
/**
 * ⚗️ FractalSoundArtFusion - The Principle
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
export interface FractalSoundArtFusion {
    frequencyA: number;
    frequencyB: number;
    result: number;
    harmonics: number[];
    geometry: string;
}
/**
 * ⚗️ CosmogenesisIntegration - The Principle
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
export interface CosmogenesisIntegration {
    engine: typeof spiralDynamicsEngine;
    fourWorlds: FourWorldIntegration[];
    learningSpiral: LearningSpiralIntegration;
    modeMappings: ModeSpiralMapping[];
    worldAppMaker: WorldAppMakerFeatures;
}
/**
 * ⚗️ FourWorldIntegration - The Principle
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
export interface FourWorldIntegration {
    world: string;
    hebrew: string;
    description: string;
    modes: AppMode[];
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
    spiralLevel: number;
}
/**
 * ⚗️ LearningSpiralIntegration - The Principle
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
export interface LearningSpiralIntegration {
    currentLevel: number;
    levels: SpiralLevelIntegration[];
    progression: SpiralProgression;
    modeUnlocks: ModeUnlock[];
}
/**
 * ⚗️ SpiralLevelIntegration - The Principle
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
export interface SpiralLevelIntegration {
    level: number;
    name: string;
    color: string;
    description: string;
    modes: AppMode[];
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
    exercises: string[];
}
/**
 * ⚗️ SpiralProgression - The Principle
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
export interface SpiralProgression {
    current: number;
    next: number;
    unlocked: number[];
    requirements: ProgressionRequirement[];
}
/**
 * ⚗️ ProgressionRequirement - The Principle
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
export interface ProgressionRequirement {
    type: 'gate' | 'arcana' | 'codex' | 'fusion' | 'mode';
    id: string;
    description: string;
}
/**
 * ⚗️ ModeUnlock - The Principle
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
export interface ModeUnlock {
    mode: AppMode;
    level: number;
    requirements: ProgressionRequirement[];
}
/**
 * ⚗️ ModeSpiralMapping - The Principle
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
export interface ModeSpiralMapping {
    mode: AppMode;
    spiralLevel: number;
    world: string;
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
}
/**
 * ⚗️ WorldAppMakerFeatures - The Principle
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
export interface WorldAppMakerFeatures {
    modeSwitching: {
        enabled: boolean;
        transitions: TransitionEffect[];
        contextPreservation: boolean;
        autoSuggest: boolean;
    };
    fusionCreation: {
        enabled: boolean;
        arcanaFusion: boolean;
        gateFusion: boolean;
        codexFusion: boolean;
        modeFusion: boolean;
    };
    learningIntegration: {
        spiralDynamics: boolean;
        fourWorlds: boolean;
        pathworking: boolean;
        exercises: boolean;
    };
    roomExploration: {
        enabled: boolean;
        portals: boolean;
        assets: boolean;
        fusionOpportunities: boolean;
    };
}
export declare class WorldAppMakerEngine {
    private creativeFlowBridge;
    private mysteryHouse;
    private fusionEngine;
    private worldAppMaker;
    constructor();
    /**
     * Create the complete World App Maker system
     */
    private createWorldAppMaker;
    /**
     * Create all app modes
     */
    private createAppModes;
    /**
     * Create transition effects
     */
    private createTransitionEffects;
    /**
     * Create Mystery House room integrations
     */
    private createMysteryHouseRooms;
    /**
     * Create Fusion Kink integration
     */
    private createFusionKinkIntegration;
    /**
     * Create Cosmogenesis integration
     */
    private createCosmogenesisIntegration;
    /**
     * Switch to a new mode
     */
    switchMode(newModeId: string, options?: {
        preserveContext?: boolean;
        transitionEffect?: TransitionEffect;
        codexNodes?: number[];
        arcanae?: string[];
        gates?: number[];
    }): Promise<AppMode>;
    /**
     * Get current mode
     */
    getCurrentMode(): AppMode;
    /**
     * Get all modes
     */
    getAllModes(): AppMode[];
    /**
     * Get mode by ID
     */
    getMode(id: string): AppMode | undefined;
}
export declare const worldAppMakerEngine: WorldAppMakerEngine;
export type { WorldAppMaker, AppMode, ModeTool, ModeSwitcher, ModeTransition, TransitionEffect, IntegralModeMapping, MysteryHouseRoomIntegration, FusionOpportunity, LearningPath, LearningStage, RoomAsset, RoomPortal, FusionKinkIntegration, ArcanaFusion, GateFusion, CodexFusion, ModeFusion, ChariotFusion, DaimonFusion, FractalSoundArtFusion, CosmogenesisIntegration, FourWorldIntegration, LearningSpiralIntegration, SpiralLevelIntegration, SpiralProgression, ProgressionRequirement, ModeUnlock, ModeSpiralMapping, WorldAppMakerFeatures };
//# sourceMappingURL=world-app-maker-integration.d.ts.map