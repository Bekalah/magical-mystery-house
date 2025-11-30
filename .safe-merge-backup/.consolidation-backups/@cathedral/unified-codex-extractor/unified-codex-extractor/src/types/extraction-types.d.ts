/**
 * Unified Codex Extraction Types
 *
 * Professional extraction system for all knowledge domains:
 * Science, Art, Technology, Architecture, Mysticism, Literature
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */
export interface ExtractionSettings {
    qualityThreshold: number;
    sacredMathematicsValidation: boolean;
    traumaSafeMode: boolean;
    multiDomainSupport: boolean;
    scientificAccuracy: boolean;
    mysticalAuthenticity: boolean;
    artisticIntegrity: boolean;
    technicalPrecision: boolean;
    outputFormats: ExportFormat[];
    vectorization: boolean;
    highResolution: boolean;
}
export interface BookSource {
    metadata: {
        title: string;
        author: string;
        domain: KnowledgeDomain;
        publicationDate?: string;
        isbn?: string;
        sourceType: 'physical' | 'digital' | 'manuscript' | 'scan';
        culturalContext: string;
        authenticityScore: number;
    };
    pages: PageSource[];
    provenance: ProvenanceInfo;
}
export interface PageSource {
    pageNumber: number;
    imagePath: string;
    ocrText?: string;
    content: ExtractedContent[];
    confidence: number;
}
export interface ExtractedContent {
    id: string;
    type: ContentType;
    domain: KnowledgeDomain;
    rawContent: string | Uint8Array;
    processedContent: ProcessedContent;
    confidence: number;
    authenticityScore: number;
    professionalGrade: ProfessionalGrade;
    sacredMath?: SacredGeometryValidation;
    mathematical?: MathematicalValidation;
    provenance: ProvenanceInfo;
    context: ContentContext;
}
export interface ProcessedContent {
    text: string;
    language: string;
    fontFamily?: string;
    fontSize?: number;
    image?: ProcessedImage;
    vector?: ProcessedVector;
    equations?: MathematicalEquation[];
    symbols?: SacredSymbol[];
    diagrams?: TechnicalDiagram[];
    colors?: ColorPalette[];
    style?: StyleAnalysis;
}
export interface ProcessedImage {
    width: number;
    height: number;
    resolution: number;
    format: string;
    colorSpace: string;
    quality: number;
    metadata: ImageMetadata;
}
export interface ProcessedVector {
    svg: string;
    paths: VectorPath[];
    accuracy: number;
    scalability: number;
}
export interface VectorPath {
    commands: SVGCommand[];
    stroke: string;
    fill: string;
    style: PathStyle;
}
export interface MathematicalEquation {
    latex: string;
    mathml: string;
    text: string;
    domain: MathematicalDomain;
    complexity: 'basic' | 'intermediate' | 'advanced' | 'research';
    verification: EquationVerification;
}
export interface SacredSymbol {
    unicode: string;
    name: string;
    domain: 'alchemy' | 'tarot' | 'mysticism' | 'reiki' | 'geometry' | 'other';
    culturalOrigin: string;
    meaning: string;
    relatedSymbols: string[];
    frequency: number;
}
export interface TechnicalDiagram {
    type: 'blueprint' | 'circuit' | 'flowchart' | 'graph' | 'chart' | 'other';
    components: DiagramComponent[];
    connections: DiagramConnection[];
    scale: number;
    units: string;
    accuracy: number;
}
export interface ColorPalette {
    name: string;
    domain: 'scientific' | 'artistic' | 'mystical' | 'technical';
    colors: ColorData[];
    harmony: ColorHarmony;
    accessibility: AccessibilityAnalysis;
}
export interface StyleAnalysis {
    typography: TypographyAnalysis;
    layout: LayoutAnalysis;
    aesthetics: AestheticAnalysis;
    cultural: CulturalAnalysis;
}
export interface SacredGeometryValidation {
    goldenRatio: GoldenRatioAnalysis;
    fibonacci: FibonacciAnalysis;
    platonicSolids: PlatonicSolidsAnalysis;
    144_99: Ratio_144_99_Analysis;
    authenticity: SacredAuthenticityScore;
}
export interface MathematicalValidation {
    equations: EquationVerification[];
    formulas: FormulaVerification[];
    calculations: CalculationVerification[];
    domain: MathematicalDomain;
    rigor: MathematicalRigor;
}
export interface QualityGuardian {
    id: string;
    domain: KnowledgeDomain;
    validator: QualityValidator;
    criteria: QualityCriterion[];
    standards: QualityStandard[];
    overrides?: QualityOverride[];
}
export interface QualityCriterion {
    name: string;
    weight: number;
    threshold: number;
    measurement: QualityMeasurement;
    validator: (content: ExtractedContent) => number;
}
export interface QualityStandard {
    domain: KnowledgeDomain;
    minimumScore: number;
    exceptionalScore: number;
    certification: QualityCertification;
}
export interface ExportFormat {
    type: 'svg' | 'pdf' | 'ai' | 'eps' | 'png' | 'jpg' | 'json' | 'xml';
    settings: ExportSettings;
    quality: ExportQuality;
    compatibility: CompatibilityLevel;
}
export interface ExportSettings {
    resolution: number;
    colorSpace: string;
    compression: number;
    transparency: boolean;
    layers: boolean;
    metadata: boolean;
}
export interface ExportQuality {
    fidelity: number;
    scalability: number;
    compatibility: number;
    professional: number;
}
export type KnowledgeDomain = 'scientific' | 'artistic' | 'mystical' | 'technical' | 'architectural' | 'literary' | 'historical' | 'cultural' | 'linguistic' | 'mathematical' | 'medical' | 'legal' | 'philosophical' | 'spiritual' | 'technological';
export type ContentType = 'text' | 'image' | 'diagram' | 'equation' | 'symbol' | 'chart' | 'table' | 'figure' | 'illustration' | 'photograph' | 'map' | 'blueprint' | 'handwriting' | 'calligraphy' | 'ornament' | 'mandala' | 'glyph' | 'formula' | 'notation';
export type ProfessionalGrade = 'amateur' | 'student' | 'professional' | 'master' | 'museum' | 'authentic' | 'masterwork';
export type ColorHarmony = 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'split-complementary' | 'sacred-geometry' | 'golden-ratio' | 'traditional' | 'cultural';
export type MathematicalDomain = 'algebra' | 'geometry' | 'calculus' | 'statistics' | 'physics' | 'chemistry' | 'biology' | 'engineering' | 'computer-science' | 'other' | 'frequency' | 'sequences' | 'complex_analysis' | 'quantum_mechanics' | 'electromagnetism' | 'general_relativity' | 'sacred_geometry';
export type CompatibilityLevel = 'basic' | 'standard' | 'professional' | 'advanced' | 'universal';
export interface DiagramComponent {
    id: string;
    type: string;
    position: Position;
    size: {
        width: number;
        height: number;
    };
    properties: Record<string, any>;
    label?: string;
}
export interface DiagramConnection {
    id: string;
    from: string;
    to: string;
    type: 'arrow' | 'line' | 'curve' | 'dependency' | 'data-flow';
    label?: string;
    properties: Record<string, any>;
}
export interface ProvenanceInfo {
    source: string;
    chain: ProvenanceChain[];
    verification: ProvenanceVerification;
    authenticity: number;
    dateExtracted: string;
    extractor: string;
    version: string;
}
export interface ContentContext {
    page: number;
    position: Position;
    surrounding: string[];
    relationships: ContentRelationship[];
    cultural: CulturalContext;
    historical: HistoricalContext;
    significance: ContentSignificance;
}
export interface QualityValidator {
    name: string;
    type: 'automated' | 'manual' | 'hybrid';
    criteria: string[];
    threshold: number;
    validate: (content: ExtractedContent) => QualityResult;
}
export interface QualityResult {
    score: number;
    passed: boolean;
    details: QualityDetail[];
    recommendations: string[];
    certification?: QualityCertification;
}
export interface ProvenanceChain {
}
export interface ProvenanceVerification {
}
export interface Position {
}
export interface ContentRelationship {
}
export interface CulturalContext {
}
export interface HistoricalContext {
}
export interface ContentSignificance {
}
export interface QualityDetail {
}
export interface QualityCertification {
}
export interface QualityOverride {
}
export interface QualityMeasurement {
}
export interface SVGCommand {
    type: 'M' | 'L' | 'C' | 'Q' | 'A' | 'Z';
    values: number[];
}
export interface PathStyle {
    strokeWidth: number;
    strokeColor: string;
    fillColor: string;
    opacity: number;
    dashArray?: number[];
}
export interface ImageMetadata {
    exif?: any;
    iptc?: any;
    xmp?: any;
    creationDate?: string;
    camera?: string;
    software?: string;
}
export interface EquationVerification {
    syntax: boolean;
    calculation: boolean;
    domain: boolean;
    accuracy: number;
}
export interface FormulaVerification {
    variables: VariableVerification[];
    constants: ConstantVerification[];
    structure: StructureVerification;
}
export interface CalculationVerification {
    steps: CalculationStep[];
    result: boolean;
    accuracy: number;
}
export interface VariableVerification {
}
export interface ConstantVerification {
}
export interface StructureVerification {
}
export interface CalculationStep {
}
export interface GoldenRatioAnalysis {
    detected: boolean;
    ratio: number;
    accuracy: number;
    application: string;
    authenticity: number;
}
export interface FibonacciAnalysis {
    detected: boolean;
    sequence: number[];
    application: string;
    natural: boolean;
    accuracy: number;
}
export interface PlatonicSolidsAnalysis {
    detected: boolean;
    solids: DetectedSolid[];
    authenticity: number;
}
export interface DetectedSolid {
    type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron';
    accuracy: number;
    proportions: number[];
}
export interface Ratio_144_99_Analysis {
    detected: boolean;
    ratio: number;
    accuracy: number;
    application: string;
    significance: string;
}
export interface SacredAuthenticityScore {
    overall: number;
    geometry: number;
    proportion: number;
    tradition: number;
    cultural: number;
}
export interface MathematicalRigor {
    precision: number;
    logical: number;
    proof: number;
    application: number;
}
export interface MathematicalValidation {
    equations: EquationVerification[];
    formulas: FormulaVerification[];
    calculations: CalculationVerification[];
    domain: MathematicalDomain;
    rigor: MathematicalRigor;
}
export interface ColorData {
    hex: string;
    rgb: RGB;
    hsl: HSL;
    lab: LAB;
    temperature: number;
    psychology: ColorPsychology;
    cultural: ColorCultural;
}
export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface HSL {
    h: number;
    s: number;
    l: number;
}
export interface LAB {
    l: number;
    a: number;
    b: number;
}
export interface ColorPsychology {
    emotion: string;
    energy: string;
    meaning: string;
    association: string[];
}
export interface ColorCultural {
    tradition: string;
    significance: string;
    禁忌: string;
    harmony: string;
}
export interface AccessibilityAnalysis {
    contrast: ContrastAnalysis;
    colorBlind: ColorBlindAnalysis;
    readability: ReadabilityAnalysis;
    universal: UniversalDesign;
}
export interface ContrastAnalysis {
}
export interface ColorBlindAnalysis {
}
export interface ReadabilityAnalysis {
}
export interface UniversalDesign {
}
export interface TypographyAnalysis {
    family: string;
    weight: string;
    style: string;
    readability: number;
    cultural: TypographyCultural;
}
export interface TypographyCultural {
    tradition: string;
    authenticity: number;
    readability: string;
    sacred: boolean;
}
export interface LayoutAnalysis {
    composition: CompositionAnalysis;
    balance: BalanceAnalysis;
    hierarchy: HierarchyAnalysis;
    cultural: LayoutCultural;
}
export interface CompositionAnalysis {
}
export interface BalanceAnalysis {
}
export interface HierarchyAnalysis {
}
export interface LayoutCultural {
}
export interface AestheticAnalysis {
    beauty: number;
    harmony: number;
    elegance: number;
    cultural: AestheticCultural;
}
export interface AestheticCultural {
}
export interface CulturalAnalysis {
}
export interface ProcessingResult {
    source: BookSource;
    content: ExtractedContent[];
    metadata: {
        totalPages: number;
        processedPages: number;
        extractionDate: string;
        qualityScore: number;
        authenticityScore: number;
    };
    exports: ExportResult[];
}
export interface ExportResult {
    format: ExportFormat;
    data: any;
    filename: string;
    size: number;
}
//# sourceMappingURL=extraction-types.d.ts.map