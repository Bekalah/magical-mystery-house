/**
 * Theme Connection System - Complete Ornate Integration
 *
 * @package @cathedral/liber-arcanae
 *
 * CONNECTS ALL THEMES WITH SOPHISTICATED PERFECTION:
 *
 * Alchemy × Esotericism × Art × Science × Mysticism × Psychology × Math × Sociology
 *
 * Each theme deeply integrated with:
 * - Real correspondences
 * - Master art principles
 * - Sacred geometry
 * - Fractal sound art
 * - High-end styling
 * - Sophisticated connections
 * - Perfect polish
 */
import { mcqueenTokens } from '@cathedral/japanese-design-system/mcqueen-tokens';
export interface ThemeConnectionSystem {
    themes: ConnectedTheme[];
    connections: ThemeConnection[];
    styling: SophisticatedStyling;
    integration: ThemeIntegration;
    polish: HighEndPolish;
}
export interface ConnectedTheme {
    id: string;
    name: string;
    description: string;
    corePrinciples: string[];
    correspondences: ThemeCorrespondences;
    artIntegration: ArtThemeIntegration;
    scienceIntegration: ScienceThemeIntegration;
    mysticismIntegration: MysticismThemeIntegration;
    psychologyIntegration: PsychologyThemeIntegration;
    mathIntegration: MathThemeIntegration;
    sociologyIntegration: SociologyThemeIntegration;
    styling: ThemeStyling;
    connections: string[];
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
    rooms: string[];
    modes: string[];
}
export interface ThemeCorrespondences {
    element: string;
    planet: string;
    zodiac: string;
    color: string;
    geometry: string;
    frequency: number;
    shemAngel: string;
    goetiaDemon: string;
    deity: string;
    iChing: string;
    soyga: string;
    chakra: string;
    solfeggio: number;
    pigment: string;
    crystal: string;
    metal: string;
    season: string;
    time: string;
    direction: string;
}
export interface ArtThemeIntegration {
    traditions: ArtTradition[];
    masters: ArtMaster[];
    techniques: ArtTechnique[];
    styles: ArtStyle[];
    movements: ArtMovement[];
    principles: ArtPrinciple[];
    sacredGeometry: SacredGeometryArt[];
    colorHarmony: ColorHarmonyArt[];
    composition: CompositionArt[];
}
export interface ArtTradition {
    name: string;
    period: string;
    description: string;
    masters: string[];
    techniques: string[];
    examples: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface ArtMaster {
    name: string;
    period: string;
    style: string;
    description: string;
    works: string[];
    techniques: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
    lineage: string[];
}
export interface ArtTechnique {
    name: string;
    description: string;
    materials: string[];
    process: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface ArtStyle {
    name: string;
    period: string;
    description: string;
    characteristics: string[];
    masters: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface ArtMovement {
    name: string;
    period: string;
    description: string;
    characteristics: string[];
    artists: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface ArtPrinciple {
    name: string;
    description: string;
    application: string[];
    correspondences: ThemeCorrespondences;
    sacredMath: SacredMathPrinciple;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface SacredMathPrinciple {
    goldenRatio: boolean;
    fibonacci: boolean;
    vesicaPiscis: boolean;
    pentagram: boolean;
    flowerOfLife: boolean;
    cathedralRatio: boolean;
    ratios: number[];
    angles: number[];
}
export interface SacredGeometryArt {
    name: string;
    description: string;
    form: string;
    application: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface ColorHarmonyArt {
    name: string;
    description: string;
    palette: string[];
    harmony: 'triadic' | 'complementary' | 'analogous' | 'monochromatic' | 'golden';
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface CompositionArt {
    name: string;
    description: string;
    rules: string[];
    application: string[];
    correspondences: ThemeCorrespondences;
    sacredMath: SacredMathPrinciple;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface ScienceThemeIntegration {
    disciplines: ScienceDiscipline[];
    scientists: Scientist[];
    discoveries: Discovery[];
    theories: Theory[];
    methodologies: Methodology[];
    correspondences: ThemeCorrespondences;
}
export interface ScienceDiscipline {
    name: string;
    description: string;
    fields: string[];
    scientists: string[];
    discoveries: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface Scientist {
    name: string;
    period: string;
    discipline: string;
    discoveries: string[];
    theories: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface Discovery {
    name: string;
    scientist: string;
    year: string;
    description: string;
    impact: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface Theory {
    name: string;
    scientist: string;
    description: string;
    principles: string[];
    applications: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface Methodology {
    name: string;
    description: string;
    process: string[];
    applications: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface MysticismThemeIntegration {
    traditions: MysticalTradition[];
    practices: MysticalPractice[];
    texts: MysticalText[];
    symbols: MysticalSymbol[];
    correspondences: ThemeCorrespondences;
}
export interface MysticalTradition {
    name: string;
    origin: string;
    period: string;
    description: string;
    practices: string[];
    texts: string[];
    masters: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface MysticalPractice {
    name: string;
    tradition: string;
    description: string;
    process: string[];
    benefits: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface MysticalText {
    name: string;
    tradition: string;
    author: string;
    period: string;
    description: string;
    teachings: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface MysticalSymbol {
    name: string;
    tradition: string;
    description: string;
    meaning: string[];
    usage: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface PsychologyThemeIntegration {
    schools: PsychologySchool[];
    psychologists: Psychologist[];
    theories: PsychologyTheory[];
    practices: PsychologyPractice[];
    correspondences: ThemeCorrespondences;
}
export interface PsychologySchool {
    name: string;
    founder: string;
    period: string;
    description: string;
    principles: string[];
    practices: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface Psychologist {
    name: string;
    school: string;
    period: string;
    contributions: string[];
    theories: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface PsychologyTheory {
    name: string;
    psychologist: string;
    description: string;
    principles: string[];
    applications: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface PsychologyPractice {
    name: string;
    school: string;
    description: string;
    process: string[];
    benefits: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface MathThemeIntegration {
    branches: MathBranch[];
    mathematicians: Mathematician[];
    concepts: MathConcept[];
    formulas: MathFormula[];
    correspondences: ThemeCorrespondences;
}
export interface MathBranch {
    name: string;
    description: string;
    concepts: string[];
    mathematicians: string[];
    applications: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface Mathematician {
    name: string;
    period: string;
    contributions: string[];
    concepts: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface MathConcept {
    name: string;
    description: string;
    formula: string;
    applications: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface MathFormula {
    name: string;
    formula: string;
    description: string;
    applications: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface SociologyThemeIntegration {
    theories: SociologyTheory[];
    sociologists: Sociologist[];
    concepts: SociologyConcept[];
    movements: SociologyMovement[];
    correspondences: ThemeCorrespondences;
}
export interface SociologyTheory {
    name: string;
    sociologist: string;
    period: string;
    description: string;
    principles: string[];
    applications: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface Sociologist {
    name: string;
    period: string;
    contributions: string[];
    theories: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface SociologyConcept {
    name: string;
    description: string;
    applications: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface SociologyMovement {
    name: string;
    period: string;
    description: string;
    characteristics: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface ThemeStyling {
    colors: string[];
    typography: TypographyStyling;
    spacing: SpacingStyling;
    motion: MotionStyling;
    shadows: ShadowStyling;
    borders: BorderStyling;
    glass: GlassStyling;
    geometry: GeometryStyling;
}
export interface TypographyStyling {
    fontDisplay: string;
    fontBody: string;
    fontUi: string;
    fontMono: string;
    scale: Record<string, string>;
    weights: Record<string, number>;
    letterSpacing: Record<string, string>;
    lineHeight: Record<string, number>;
}
export interface SpacingStyling {
    unit: number;
    scale: Record<string, string>;
    phi: number;
    phiInverse: number;
}
export interface MotionStyling {
    duration: Record<string, string>;
    easing: Record<string, string>;
    keyframes: Record<string, any>;
}
export interface ShadowStyling {
    subtle: string;
    medium: string;
    deep: string;
    glow: Record<string, string>;
    inset: Record<string, string>;
}
export interface BorderStyling {
    width: Record<string, string>;
    radius: Record<string, string>;
    style: Record<string, string>;
}
export interface GlassStyling {
    light: GlassStyle;
    dark: GlassStyle;
    amber: GlassStyle;
    violet: GlassStyle;
}
export interface GlassStyle {
    background: string;
    backdropFilter: string;
    border: string;
}
export interface GeometryStyling {
    phi: number;
    phiInverse: number;
    angles: Record<string, number>;
    ratios: Record<string, number>;
    cathedral: number;
}
export interface ThemeConnection {
    themeA: string;
    themeB: string;
    type: 'complementary' | 'harmonious' | 'transformative' | 'transcendent';
    description: string;
    fusion: ThemeFusion;
    correspondences: ThemeCorrespondences;
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
}
export interface ThemeFusion {
    name: string;
    description: string;
    result: string;
    correspondences: ThemeCorrespondences;
    applications: string[];
}
export interface SophisticatedStyling {
    mcqueenTokens: typeof mcqueenTokens;
    masterArtPrinciples: MasterArtPrinciplesStyling;
    luxuryMetallics: LuxuryMetallicsStyling;
    sacredGeometry: SacredGeometryStyling;
    fractalSoundArt: FractalSoundArtStyling;
    highEndPolish: HighEndPolishStyling;
}
export interface MasterArtPrinciplesStyling {
    sacredMath: {
        goldenRatio: number;
        fibonacci: number[];
        cathedralRatio: number;
    };
    composition: {
        ruleOfThirds: boolean;
        dynamicSymmetry: boolean;
        goldenRatioLayout: boolean;
    };
    colorHarmony: {
        goldenRatioColors: string[];
        triadic: string[];
        analogous: string[];
    };
    rendering: {
        goldenRatioCamera: boolean;
        masterLighting: boolean;
        fluidAnimations: boolean;
    };
}
export interface LuxuryMetallicsStyling {
    tiffany: {
        tiffanyBlue: string;
        sterlingSilver: string;
        gold: string;
        roseGold: string;
        platinum: string;
        diamond: string;
    };
    materials: Record<string, MaterialStyling>;
    shaders: Record<string, ShaderStyling>;
}
export interface MaterialStyling {
    name: string;
    color: string;
    metallic: number;
    roughness: number;
    ior: number;
    clearcoat: number;
    sheen: number;
}
export interface ShaderStyling {
    name: string;
    type: 'three' | 'babylon';
    properties: Record<string, any>;
}
export interface SacredGeometryStyling {
    vesicaPiscis: GeometryStyle;
    pentagram: GeometryStyle;
    octagon: GeometryStyle;
    flowerOfLife: GeometryStyle;
    metatron: GeometryStyle;
    fibonacci: GeometryStyle;
}
export interface GeometryStyle {
    name: string;
    description: string;
    form: string;
    colors: string[];
    application: string[];
}
export interface FractalSoundArtStyling {
    frequencies: number[];
    harmonics: HarmonicStyling[];
    geometry: string;
    spatialAudio: SpatialAudioStyling;
    interactive: InteractiveStyling[];
}
export interface HarmonicStyling {
    layer: number;
    frequency: number;
    amplitude: number;
    phase: number;
    geometry: string;
    color: string;
    meaning: string;
}
export interface SpatialAudioStyling {
    channels: number;
    positioning: 'static' | 'dynamic' | 'interactive';
    movementPattern: string;
    depth: number;
    width: number;
    height: number;
}
export interface InteractiveStyling {
    id: string;
    trigger: 'touch' | 'proximity' | 'will' | 'breath' | 'movement' | 'thought';
    response: InteractiveResponse;
    feedback: string;
}
export interface InteractiveResponse {
    type: 'frequency_shift' | 'harmonic_add' | 'resonance_boost' | 'pattern_change';
    parameters: Record<string, any>;
    duration: number;
}
export interface HighEndPolishStyling {
    quality: 'museum' | 'luxury' | 'master' | 'perfection';
    details: PolishDetail[];
    refinements: Refinement[];
    perfection: PerfectionLevel;
}
export interface PolishDetail {
    type: 'typography' | 'spacing' | 'color' | 'motion' | 'geometry' | 'sound' | 'interaction';
    description: string;
    implementation: string;
    quality: 'museum' | 'luxury' | 'master';
}
export interface Refinement {
    area: string;
    description: string;
    improvements: string[];
    quality: 'museum' | 'luxury' | 'master';
}
export interface PerfectionLevel {
    overall: 'museum' | 'luxury' | 'master' | 'perfection';
    details: Record<string, 'museum' | 'luxury' | 'master' | 'perfection'>;
    standards: string[];
}
export interface ThemeIntegration {
    alchemy: AlchemyTheme;
    esotericism: EsotericismTheme;
    art: ArtTheme;
    science: ScienceTheme;
    mysticism: MysticismTheme;
    psychology: PsychologyTheme;
    math: MathTheme;
    sociology: SociologyTheme;
    crossConnections: CrossThemeConnection[];
}
export interface AlchemyTheme extends ConnectedTheme {
    id: 'alchemy';
    processes: AlchemicalProcess[];
    symbols: AlchemicalSymbol[];
    stages: AlchemicalStage[];
    transmutation: TransmutationProcess[];
}
export interface AlchemicalProcess {
    name: string;
    description: string;
    stages: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface AlchemicalSymbol {
    name: string;
    description: string;
    meaning: string[];
    usage: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface AlchemicalStage {
    name: string;
    description: string;
    process: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface TransmutationProcess {
    name: string;
    description: string;
    from: string;
    to: string;
    process: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface EsotericismTheme extends ConnectedTheme {
    id: 'esotericism';
    traditions: EsotericTradition[];
    practices: EsotericPractice[];
    symbols: EsotericSymbol[];
    correspondences: EsotericCorrespondence[];
}
export interface EsotericTradition {
    name: string;
    origin: string;
    period: string;
    description: string;
    practices: string[];
    masters: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface EsotericPractice {
    name: string;
    tradition: string;
    description: string;
    process: string[];
    benefits: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface EsotericSymbol {
    name: string;
    tradition: string;
    description: string;
    meaning: string[];
    usage: string[];
    correspondences: ThemeCorrespondences;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface EsotericCorrespondence {
    system: string;
    correspondences: Record<string, any>;
    arcanaConnection?: string;
    gateConnection?: number;
    codexNode?: number;
}
export interface ArtTheme extends ConnectedTheme {
    id: 'art';
}
export interface ScienceTheme extends ConnectedTheme {
    id: 'science';
}
export interface MysticismTheme extends ConnectedTheme {
    id: 'mysticism';
}
export interface PsychologyTheme extends ConnectedTheme {
    id: 'psychology';
}
export interface MathTheme extends ConnectedTheme {
    id: 'math';
}
export interface SociologyTheme extends ConnectedTheme {
    id: 'sociology';
}
export interface CrossThemeConnection {
    themes: string[];
    type: 'fusion' | 'harmony' | 'transformation' | 'transcendence';
    description: string;
    correspondences: ThemeCorrespondences;
    arcanae: string[];
    gates: number[];
    codexNodes: number[];
    applications: string[];
}
export declare class ThemeConnectionEngine {
    private system;
    constructor();
    /**
     * Initialize complete theme connection system
     */
    private initializeSystem;
    /**
     * Create all themes with complete integration
     */
    private createAllThemes;
    /**
     * Create Alchemy Theme
     */
    private createAlchemyTheme;
    /**
     * Create Esotericism Theme
     */
    private createEsotericismTheme;
    /**
     * Create Art Theme
     */
    private createArtTheme;
    /**
     * Create Science Theme
     */
    private createScienceTheme;
    /**
     * Create Mysticism Theme
     */
    private createMysticismTheme;
    /**
     * Create Psychology Theme
     */
    private createPsychologyTheme;
    /**
     * Create Math Theme
     */
    private createMathTheme;
    /**
     * Create Sociology Theme
     */
    private createSociologyTheme;
    /**
     * Create theme connections
     */
    private createThemeConnections;
    /**
     * Create sophisticated styling
     */
    private createSophisticatedStyling;
    /**
     * Create theme integration
     */
    private createThemeIntegration;
    /**
     * Create high-end polish
     */
    private createHighEndPolish;
    /**
     * Create theme styling
     */
    private createThemeStyling;
    private getAlchemyCorrespondences;
    private getEsotericismCorrespondences;
    private getArtCorrespondences;
    private getScienceCorrespondences;
    private getMysticismCorrespondences;
    private getPsychologyCorrespondences;
    private getMathCorrespondences;
    private getSociologyCorrespondences;
    /**
     * Get complete theme system
     */
    getSystem(): ThemeConnectionSystem;
    /**
     * Get theme by ID
     */
    getTheme(id: string): ConnectedTheme | undefined;
    /**
     * Get all themes
     */
    getAllThemes(): ConnectedTheme[];
    /**
     * Get theme connections
     */
    getConnections(): ThemeConnection[];
    /**
     * Get sophisticated styling
     */
    getStyling(): SophisticatedStyling;
    /**
     * Get high-end polish
     */
    getPolish(): HighEndPolish;
}
export declare const themeConnectionEngine: ThemeConnectionEngine;
export type { ThemeConnectionSystem, ConnectedTheme, ThemeCorrespondences, ArtThemeIntegration, ArtTradition, ArtMaster, ArtTechnique, ArtStyle, ArtMovement, ArtPrinciple, SacredMathPrinciple, SacredGeometryArt, ColorHarmonyArt, CompositionArt, ScienceThemeIntegration, ScienceDiscipline, Scientist, Discovery, Theory, Methodology, MysticismThemeIntegration, MysticalTradition, MysticalPractice, MysticalText, MysticalSymbol, PsychologyThemeIntegration, PsychologySchool, Psychologist, PsychologyTheory, PsychologyPractice, MathThemeIntegration, MathBranch, Mathematician, MathConcept, MathFormula, SociologyThemeIntegration, SociologyTheory, Sociologist, SociologyConcept, SociologyMovement, ThemeStyling, TypographyStyling, SpacingStyling, MotionStyling, ShadowStyling, BorderStyling, GlassStyling, GlassStyle, GeometryStyling, ThemeConnection, ThemeFusion, SophisticatedStyling, MasterArtPrinciplesStyling, LuxuryMetallicsStyling, MaterialStyling, ShaderStyling, SacredGeometryStyling, GeometryStyle, FractalSoundArtStyling, HarmonicStyling, SpatialAudioStyling, InteractiveStyling, InteractiveResponse, HighEndPolishStyling, PolishDetail, Refinement, PerfectionLevel, ThemeIntegration, AlchemyTheme, AlchemicalProcess, AlchemicalSymbol, AlchemicalStage, TransmutationProcess, EsotericismTheme, EsotericTradition, EsotericPractice, EsotericSymbol, EsotericCorrespondence, ArtTheme, ScienceTheme, MysticismTheme, PsychologyTheme, MathTheme, SociologyTheme, CrossThemeConnection };
//# sourceMappingURL=theme-connection-system.d.ts.map