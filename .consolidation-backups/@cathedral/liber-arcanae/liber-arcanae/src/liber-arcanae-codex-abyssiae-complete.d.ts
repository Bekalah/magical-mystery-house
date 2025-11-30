/**
 * Liber Arcanae Codex Abyssiae - Complete Ornate System
 *
 * @package @cathedral/liber-arcanae
 *
 * THE LIVING GRIMOIRE
 * Written by Moonchild (The Hierophant)
 * Gatekeeper: Rebecca Respawn (The Fool)
 *
 * Complete integration:
 * - 22 Master Arcanae with ornate chariots matching archetypes
 * - Each mirrors Codex 144:99 nodes
 * - 99 Gates with fractal sound art mechanics
 * - Personal daimons (72 Shem Angels + 72 Goetia Demons)
 * - Will-driven RPG mechanics
 * - Pathworking system
 * - Fully usable tarot spreads
 * - Living grimoire (Hocus Pocus style)
 *
 * Deep integration: Ken Wilber, Tim Leary, Carl Jung, Israel Regardie
 */
export interface LivingGrimoire {
    id: 'liber-arcanae-codex-abyssiae';
    author: 'Moonchild';
    authorArcana: 'the-hierophant';
    gatekeeper: 'Rebecca Respawn';
    gatekeeperArcana: 'the-fool';
    title: 'Liber Arcanae Codex Abyssiae';
    subtitle: 'The Living Book of 22 Masters, 99 Gates, and Infinite Paths';
    description: string;
    personality: GrimoirePersonality;
    pages: GrimoirePage[];
    gates: Gate[];
    characters: MasterArcana[];
    tarotSpreads: TarotSpread[];
    pathworking: PathworkingSystem;
}
export interface GrimoirePersonality {
    voice: string;
    tone: string;
    speakingStyle: string;
    responses: {
        greeting: string[];
        guidance: string[];
        warning: string[];
        encouragement: string[];
        mystery: string[];
    };
    metaAwareness: {
        knowsItIsABook: boolean;
        canWriteItself: boolean;
        interactsWithReader: boolean;
        adaptsToReader: boolean;
    };
}
export interface GrimoirePage {
    id: string;
    number: number;
    title: string;
    content: string;
    type: 'narrative' | 'instruction' | 'ritual' | 'pathworking' | 'tarot' | 'character' | 'gate';
    connections: string[];
    illustrations?: string[];
    sounds?: SoundArt[];
    interactive?: InteractiveElement[];
}
export interface Gate {
    id: string;
    number: number;
    name: string;
    title: string;
    realm: GateRealm;
    description: string;
    gatekeeper: 'Rebecca Respawn';
    unlockCondition: string;
    fractalSoundArt: FractalSoundArtMechanics;
    codexNodes: number[];
    arcanaConnection?: string;
    chariot?: Chariot;
    daimon?: DaimonPair;
    pathworking: PathworkingGate;
    willMechanics: WillMechanics;
    correspondences: GateCorrespondences;
}
export type GateRealm = 'foundation' | 'wisdom' | 'creation' | 'structure' | 'learning' | 'union' | 'transport' | 'healing' | 'integration';
export interface FractalSoundArtMechanics {
    baseFrequency: number;
    fractalDepth: number;
    geometricPattern: string;
    harmonics: HarmonicLayer[];
    resonance: ResonanceProfile;
    spatialAudio: SpatialAudioConfig;
    interactiveElements: SoundInteraction[];
    solfeggioConnection?: number;
    codexFrequency?: number;
}
export interface HarmonicLayer {
    layer: number;
    frequency: number;
    amplitude: number;
    phase: number;
    geometry: string;
    color: string;
    meaning: string;
}
export interface ResonanceProfile {
    primaryResonance: number;
    secondaryResonances: number[];
    dissonancePoints: number[];
    goldenRatioPoints: number[];
    fibonacciSequence: number[];
}
export interface SpatialAudioConfig {
    channels: number;
    positioning: 'static' | 'dynamic' | 'interactive';
    movementPattern: string;
    depth: number;
    width: number;
    height: number;
}
export interface SoundInteraction {
    id: string;
    trigger: 'touch' | 'proximity' | 'will' | 'breath' | 'movement' | 'thought';
    response: SoundResponse;
    feedback: string;
}
export interface SoundResponse {
    type: 'frequency_shift' | 'harmonic_add' | 'resonance_boost' | 'pattern_change';
    parameters: Record<string, any>;
    duration: number;
}
export interface PathworkingGate {
    entryRitual: string;
    journey: string[];
    challenges: GateChallenge[];
    rewards: GateReward[];
    exitRitual: string;
    integration: string;
}
export interface GateChallenge {
    id: string;
    type: 'will' | 'knowledge' | 'creativity' | 'integration' | 'shadow';
    description: string;
    solution: string;
    reward: string;
}
export interface GateReward {
    type: 'ability' | 'knowledge' | 'item' | 'relationship' | 'gateway';
    name: string;
    description: string;
    unlocks: string[];
}
export interface WillMechanics {
    willRequired: number;
    willType: 'pure' | 'aligned' | 'shadow' | 'balanced';
    willTest: string;
    willReward: string;
    willFailure: string;
    willGrowth: string;
}
export interface GateCorrespondences {
    element: string;
    planet: string;
    zodiac: string;
    color: string;
    geometry: string;
    shemAngel?: string;
    goetiaDemon?: string;
    deity?: string;
    iChing?: string;
    soyga?: string;
    chakra?: string;
    solfeggio?: number;
}
export interface MasterArcana {
    id: string;
    number: number;
    name: string;
    title: string;
    historicalFigure: string;
    cathedralCharacter: string;
    element: string;
    hebrew: string;
    chariot: Chariot;
    daimon: DaimonPair;
    codexMirror: CodexMirror;
    wilberIntegration: WilberIntegration;
    learyIntegration: LearyIntegration;
    jungIntegration: JungIntegration;
    regardieIntegration: RegardieIntegration;
    personality: CharacterPersonality;
    abilities: CharacterAbility[];
    teachings: Teaching[];
    correspondences: CharacterCorrespondences;
    connections: CharacterConnections;
    art: CharacterArt;
    research: CharacterResearch;
    rpgStats: RPGStats;
    willMechanics: CharacterWillMechanics;
    pathworking: CharacterPathworking;
}
export interface Chariot {
    id: string;
    name: string;
    archetype: string;
    form: ChariotForm;
    description: string;
    appearance: ChariotAppearance;
    mechanics: ChariotMechanics;
    sound: ChariotSound;
    correspondences: ChariotCorrespondences;
}
export type ChariotForm = 'vehicle' | 'creature' | 'construct' | 'elemental' | 'geometric' | 'astral' | 'composite';
export interface ChariotAppearance {
    primaryForm: string;
    secondaryForms: string[];
    colors: string[];
    materials: string[];
    symbols: string[];
    sacredGeometry: string[];
    size: 'tiny' | 'small' | 'medium' | 'large' | 'gargantuan' | 'infinite';
    movement: string;
    presence: string;
}
export interface ChariotMechanics {
    speed: number;
    maneuverability: number;
    defense: number;
    specialAbilities: string[];
    transformations: ChariotTransformation[];
    interactions: ChariotInteraction[];
}
export interface ChariotTransformation {
    trigger: string;
    newForm: ChariotForm;
    description: string;
    duration?: number;
}
export interface ChariotInteraction {
    type: 'merge' | 'split' | 'combine' | 'evolve';
    with: string;
    result: string;
}
export interface ChariotSound {
    voice: string;
    frequencies: number[];
    harmonics: HarmonicLayer[];
    movementSound: string;
    presenceSound: string;
}
export interface ChariotCorrespondences {
    element: string;
    planet: string;
    zodiac: string;
    color: string;
    geometry: string;
    shemAngel?: string;
    goetiaDemon?: string;
    deity?: string;
}
export interface DaimonPair {
    shemAngel: {
        number: number;
        name: string;
        meaning: string;
        planet: string;
        correspondences: Record<string, any>;
        personality: string;
        guidance: string;
        abilities: string[];
    };
    goetiaDemon: {
        number: number;
        name: string;
        rank: string;
        description: string;
        correspondences: Record<string, any>;
        personality: string;
        shadowWisdom: string;
        abilities: string[];
    };
    fusion: {
        name: string;
        nature: string;
        wisdom: string;
        power: string;
        balance: string;
    };
}
export interface CodexMirror {
    primaryNodes: number[];
    harmonicNodes: number[];
    spiralNodes: number[];
    gateConnections: number[];
    latticePosition: {
        row: number;
        column: number;
    };
    mirrorDepth: number;
}
export interface WilberIntegration {
    quadrants: {
        upperLeft: string;
        upperRight: string;
        lowerLeft: string;
        lowerRight: string;
    };
    levels: string[];
    lines: string[];
    states: string[];
    types: string[];
    aqalMap: string;
}
export interface LearyIntegration {
    circuits: {
        circuit1: string;
        circuit2: string;
        circuit3: string;
        circuit4: string;
        circuit5: string;
        circuit6: string;
        circuit7: string;
        circuit8: string;
    };
    imprinting: string;
    deconditioning: string;
    reimprinting: string;
}
export interface JungIntegration {
    archetype: string;
    shadow: string;
    animaAnimus: string;
    collectiveUnconscious: string;
    individuation: string;
    synchronicity: string;
    activeImagination: string;
}
export interface RegardieIntegration {
    sephiroth: string;
    path: string;
    grade: string;
    ritual: string[];
    correspondences: Record<string, any>;
    practicalMagic: string[];
}
export interface CharacterPersonality {
    traits: string[];
    voice: string;
    approach: string;
    philosophy: string;
    wisdom: string[];
    flaws: string[];
    virtues: string[];
    emotionalRange: string[];
    communicationStyle: string;
}
export interface CharacterAbility {
    id: string;
    name: string;
    description: string;
    type: 'active' | 'passive' | 'ultimate' | 'ritual';
    cooldown?: number;
    willCost?: number;
    requirements?: string[];
    effects: string[];
}
export interface Teaching {
    id: string;
    title: string;
    topic: string;
    tradition: string;
    description: string;
    exercises: string[];
    resources: string[];
}
export interface CharacterCorrespondences {
    planet: string;
    zodiac: string;
    element: string;
    color: string;
    geometry: string;
    shemAngel: string;
    goetiaDemon: string;
    deity: string;
    iChing: string;
    soyga: string;
    codexNodes: number[];
    chapel?: string;
    room?: string;
}
export interface CharacterConnections {
    allies: string[];
    students: string[];
    teachers: string[];
    systems: string[];
    gates: number[];
}
export interface CharacterArt {
    style: string;
    techniques: string[];
    masters: string[];
    examples: string[];
}
export interface CharacterResearch {
    sources: string[];
    topics: string[];
    traditions: string[];
}
export interface RPGStats {
    intellect: number;
    intuition: number;
    vitality: number;
    resonance: number;
    manifestation: number;
    connection: number;
}
export interface CharacterWillMechanics {
    willType: 'pure' | 'aligned' | 'shadow' | 'balanced';
    willPower: number;
    willGrowth: string;
    willTests: string[];
    willRewards: string[];
}
export interface CharacterPathworking {
    entry: string;
    journey: string[];
    challenges: string[];
    rewards: string[];
    exit: string;
    integration: string;
}
export interface TarotSpread {
    id: string;
    name: string;
    description: string;
    cards: number;
    layout: SpreadLayout;
    positions: SpreadPosition[];
    interpretation: SpreadInterpretation;
    pathworking: string;
    willMechanics?: WillMechanics;
}
export interface SpreadLayout {
    type: 'linear' | 'circular' | 'tree' | 'geometric' | 'custom';
    shape: string;
    geometry: string;
    positions: Position[];
}
export interface Position {
    id: string;
    number: number;
    name: string;
    meaning: string;
    correspondences: Record<string, any>;
}
export interface SpreadPosition {
    position: number;
    meaning: string;
    question: string;
    correspondences: Record<string, any>;
}
export interface SpreadInterpretation {
    method: string;
    layers: InterpretationLayer[];
    synthesis: string;
    pathworking: string;
}
export interface InterpretationLayer {
    layer: number;
    name: string;
    method: string;
    depth: 'surface' | 'symbolic' | 'archetypal' | 'mystical';
}
export interface PathworkingSystem {
    id: string;
    name: string;
    description: string;
    entry: PathworkingEntry;
    paths: PathworkingPath[];
    integration: PathworkingIntegration;
}
export interface PathworkingEntry {
    ritual: string;
    preparation: string[];
    intention: string;
    protection: string[];
}
export interface PathworkingPath {
    id: string;
    name: string;
    description: string;
    steps: PathworkingStep[];
    challenges: string[];
    rewards: string[];
    correspondences: Record<string, any>;
}
export interface PathworkingStep {
    number: number;
    title: string;
    description: string;
    exercise: string;
    duration?: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
}
export interface PathworkingIntegration {
    return: string;
    grounding: string[];
    journaling: string[];
    practice: string[];
}
/**
 * Generate fractal sound frequencies using sacred mathematics
 */
export declare function generateFractalFrequencies(baseFreq: number, depth: number, pattern: 'golden_ratio' | 'fibonacci' | 'vesica_piscis' | 'flower_of_life'): number[];
/**
 * Calculate gate number from Codex node
 */
export declare function getGateFromCodexNode(nodeId: number): number;
/**
 * Get daimon pair for an Arcana
 */
export declare function getDaimonPairForArcana(arcanaNumber: number): DaimonPair;
/**
 * Create chariot for an Arcana based on archetype
 */
export declare function createChariotForArcana(arcana: MasterArcana): Chariot;
export type { LivingGrimoire, GrimoirePersonality, GrimoirePage, Gate, GateRealm, FractalSoundArtMechanics, HarmonicLayer, ResonanceProfile, SpatialAudioConfig, SoundInteraction, SoundResponse, PathworkingGate, GateChallenge, GateReward, WillMechanics, GateCorrespondences, MasterArcana, Chariot, ChariotForm, ChariotAppearance, ChariotMechanics, ChariotTransformation, ChariotInteraction, ChariotSound, ChariotCorrespondences, DaimonPair, CodexMirror, WilberIntegration, LearyIntegration, JungIntegration, RegardieIntegration, CharacterPersonality, CharacterAbility, Teaching, CharacterCorrespondences, CharacterConnections, CharacterArt, CharacterResearch, RPGStats, CharacterWillMechanics, CharacterPathworking, TarotSpread, SpreadLayout, Position, SpreadPosition, SpreadInterpretation, InterpretationLayer, PathworkingSystem, PathworkingEntry, PathworkingPath, PathworkingStep, PathworkingIntegration };
//# sourceMappingURL=liber-arcanae-codex-abyssiae-complete.d.ts.map