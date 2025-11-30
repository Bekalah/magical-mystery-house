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
  // Universal settings for all content types
  qualityThreshold: number; // 0.0 - 1.0 (professional standard: 0.95)
  sacredMathematicsValidation: boolean; // Golden ratio, 144:99 ratio
  traumaSafeMode: boolean; // ESC exits, gentle processing
  multiDomainSupport: boolean; // Science = Art = Technology = All equal
  
  // Domain-specific settings
  scientificAccuracy: boolean; // Mathematical equations, data diagrams
  mysticalAuthenticity: boolean; // Sacred geometry, spiritual symbols
  artisticIntegrity: boolean; // Color accuracy, composition preservation
  technicalPrecision: boolean; // Technical diagrams, blueprints
  
  // Export preferences
  outputFormats: ExportFormat[];
  vectorization: boolean; // Convert raster to scalable vector
  highResolution: boolean; // 300+ DPI for professional use
}

export interface BookSource {
  metadata: {
    title: string;
    author: string;
    domain: KnowledgeDomain;
    publicationDate?: string;
    isbn?: string;
    sourceType: 'physical' | 'digital' | 'manuscript' | 'scan';
    culturalContext: string; // Cultural/historical context
    authenticityScore: number; // 0.0 - 1.0
  };
  pages: PageSource[];
  provenance: ProvenanceInfo;
}

export interface PageSource {
  pageNumber: number;
  imagePath: string;
  ocrText?: string;
  content: ExtractedContent[];
  confidence: number; // Overall extraction quality
}

export interface ExtractedContent {
  id: string;
  type: ContentType;
  domain: KnowledgeDomain;
  
  // Core content
  rawContent: string | Uint8Array;
  processedContent: ProcessedContent;
  
  // Quality metrics
  confidence: number; // 0.0 - 1.0
  authenticityScore: number; // 0.0 - 1.0
  professionalGrade: ProfessionalGrade;
  
  // Mathematical/sacred geometry validation
  sacredMath?: SacredGeometryValidation;
  mathematical?: MathematicalValidation;
  
  // Provenance and context
  provenance: ProvenanceInfo;
  context: ContentContext;
}

export interface ProcessedContent {
  // Text processing
  text: string;
  language: string;
  fontFamily?: string;
  fontSize?: number;
  
  // Image processing
  image?: ProcessedImage;
  vector?: ProcessedVector;
  
  // Special content
  equations?: MathematicalEquation[];
  symbols?: SacredSymbol[];
  diagrams?: TechnicalDiagram[];
  
  // Color and styling
  colors?: ColorPalette[];
  style?: StyleAnalysis;
}

export interface ProcessedImage {
  width: number;
  height: number;
  resolution: number; // DPI
  format: string;
  colorSpace: string;
  quality: number; // 0.0 - 1.0
  metadata: ImageMetadata;
}

export interface ProcessedVector {
  svg: string;
  paths: VectorPath[];
  accuracy: number; // Vectorization quality
  scalability: number; // Resolution independence
}

export interface VectorPath {
  commands: SVGCommand[];
  stroke: string;
  fill: string;
  style: PathStyle;
}

export interface MathematicalEquation {
  latex: string; // LaTeX representation
  mathml: string; // MathML representation
  text: string; // Plain text fallback
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
  frequency: number; // Solfeggio frequency if applicable
}

export interface TechnicalDiagram {
  type: 'blueprint' | 'circuit' | 'flowchart' | 'graph' | 'chart' | 'other';
  components: DiagramComponent[];
  connections: DiagramConnection[];
  scale: number;
  units: string;
  accuracy: number; // Technical precision
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
  weight: number; // 0.0 - 1.0
  threshold: number; // Minimum acceptable score
  measurement: QualityMeasurement;
  validator: (content: ExtractedContent) => number;
}

export interface QualityStandard {
  domain: KnowledgeDomain;
  minimumScore: number; // Professional standard
  exceptionalScore: number; // Excellence standard
  certification: QualityCertification;
}

export interface ExportFormat {
  type: 'svg' | 'pdf' | 'ai' | 'eps' | 'png' | 'jpg' | 'json' | 'xml';
  settings: ExportSettings;
  quality: ExportQuality;
  compatibility: CompatibilityLevel;
}

export interface ExportSettings {
  resolution: number; // DPI
  colorSpace: string; // sRGB, Adobe RGB, CMYK
  compression: number; // 0.0 - 1.0
  transparency: boolean;
  layers: boolean;
  metadata: boolean;
}

export interface ExportQuality {
  fidelity: number; // 0.0 - 1.0 (preservation of original)
  scalability: number; // 0.0 - 1.0 (resolution independence)
  compatibility: number; // 0.0 - 1.0 (software compatibility)
  professional: number; // 0.0 - 1.0 (publication quality)
}

// Enums
export type KnowledgeDomain = 
  | 'scientific'
  | 'artistic' 
  | 'mystical'
  | 'technical'
  | 'architectural'
  | 'literary'
  | 'historical'
  | 'cultural'
  | 'linguistic'
  | 'mathematical'
  | 'medical'
  | 'legal'
  | 'philosophical'
  | 'spiritual'
  | 'technological';

export type ContentType =
  | 'text'
  | 'image'
  | 'diagram'
  | 'equation'
  | 'symbol'
  | 'chart'
  | 'table'
  | 'figure'
  | 'illustration'
  | 'photograph'
  | 'map'
  | 'blueprint'
  | 'handwriting'
  | 'calligraphy'
  | 'ornament'
  | 'mandala'
  | 'glyph'
  | 'formula'
  | 'notation';

export type ProfessionalGrade =
  | 'amateur'
  | 'student'
  | 'professional'
  | 'master'
  | 'museum'
  | 'authentic'
  | 'masterwork';

export type ColorHarmony =
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'tetradic'
  | 'split-complementary'
  | 'sacred-geometry'
  | 'golden-ratio'
  | 'traditional'
  | 'cultural';

export type MathematicalDomain =
  | 'algebra'
  | 'geometry'
  | 'calculus'
  | 'statistics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'engineering'
  | 'computer-science'
  | 'other'
  | 'frequency'
  | 'sequences'
  | 'complex_analysis'
  | 'quantum_mechanics'
  | 'electromagnetism'
  | 'general_relativity'
  | 'sacred_geometry';

export type CompatibilityLevel =
  | 'basic'
  | 'standard'
  | 'professional'
  | 'advanced'
  | 'universal';

// Additional interfaces
export interface DiagramComponent {
  id: string;
  type: string;
  position: Position;
  size: { width: number; height: number };
  properties: Record<string, any>;
  label?: string;
}

export interface DiagramConnection {
  id: string;
  from: string; // Component ID
  to: string; // Component ID
  type: 'arrow' | 'line' | 'curve' | 'dependency' | 'data-flow';
  label?: string;
  properties: Record<string, any>;
}

export interface ProvenanceInfo {
  source: string;
  chain: ProvenanceChain[];
  verification: ProvenanceVerification;
  authenticity: number; // 0.0 - 1.0
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
  score: number; // 0.0 - 1.0
  passed: boolean;
  details: QualityDetail[];
  recommendations: string[];
  certification?: QualityCertification;
}

// Detailed interfaces (abbreviated for space)
export interface ProvenanceChain { /* ... */ }
export interface ProvenanceVerification { /* ... */ }
export interface Position { /* ... */ }
export interface ContentRelationship { /* ... */ }
export interface CulturalContext { /* ... */ }
export interface HistoricalContext { /* ... */ }
export interface ContentSignificance { /* ... */ }
export interface QualityDetail { /* ... */ }
export interface QualityCertification { /* ... */ }
export interface QualityOverride { /* ... */ }
export interface QualityMeasurement { /* ... */ }

// SVG and image interfaces
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

// Mathematical interfaces
export interface EquationVerification {
  syntax: boolean;
  calculation: boolean;
  domain: boolean;
  accuracy: number; // 0.0 - 1.0
}

export interface FormulaVerification {
  variables: VariableVerification[];
  constants: ConstantVerification[];
  structure: StructureVerification;
}

export interface CalculationVerification {
  steps: CalculationStep[];
  result: boolean;
  accuracy: number; // 0.0 - 1.0
}

export interface VariableVerification { /* ... */ }
export interface ConstantVerification { /* ... */ }
export interface StructureVerification { /* ... */ }
export interface CalculationStep { /* ... */ }

// Sacred geometry interfaces
export interface GoldenRatioAnalysis {
  detected: boolean;
  ratio: number;
  accuracy: number; // 0.0 - 1.0
  application: string;
  authenticity: number; // 0.0 - 1.0
}

export interface FibonacciAnalysis {
  detected: boolean;
  sequence: number[];
  application: string;
  natural: boolean;
  accuracy: number; // 0.0 - 1.0
}

export interface PlatonicSolidsAnalysis {
  detected: boolean;
  solids: DetectedSolid[];
  authenticity: number; // 0.0 - 1.0
}

export interface DetectedSolid {
  type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron';
  accuracy: number; // 0.0 - 1.0
  proportions: number[];
}

export interface Ratio_144_99_Analysis {
  detected: boolean;
  ratio: number;
  accuracy: number; // 0.0 - 1.0
  application: string;
  significance: string;
}

export interface SacredAuthenticityScore {
  overall: number; // 0.0 - 1.0
  geometry: number; // 0.0 - 1.0
  proportion: number; // 0.0 - 1.0
  tradition: number; // 0.0 - 1.0
  cultural: number; // 0.0 - 1.0
}

export interface MathematicalRigor {
  precision: number; // 0.0 - 1.0
  logical: number; // 0.0 - 1.0
  proof: number; // 0.0 - 1.0
  application: number; // 0.0 - 1.0
}

// Complete MathematicalValidation interface
export interface MathematicalValidation {
  equations: EquationVerification[];
  formulas: FormulaVerification[];
  calculations: CalculationVerification[];
  domain: MathematicalDomain;
  rigor: MathematicalRigor;
}

// Color and style interfaces
export interface ColorData {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  lab: LAB;
  temperature: number; // Color temperature
  psychology: ColorPsychology;
  cultural: ColorCultural;
}

export interface RGB { r: number; g: number; b: number; }
export interface HSL { h: number; s: number; l: number; }
export interface LAB { l: number; a: number; b: number; }

export interface ColorPsychology {
  emotion: string;
  energy: string;
  meaning: string;
  association: string[];
}

export interface ColorCultural {
  tradition: string;
  significance: string;
 禁忌: string; // Taboos
  harmony: string;
}

export interface AccessibilityAnalysis {
  contrast: ContrastAnalysis;
  colorBlind: ColorBlindAnalysis;
  readability: ReadabilityAnalysis;
  universal: UniversalDesign;
}

export interface ContrastAnalysis { /* ... */ }
export interface ColorBlindAnalysis { /* ... */ }
export interface ReadabilityAnalysis { /* ... */ }
export interface UniversalDesign { /* ... */ }

export interface TypographyAnalysis {
  family: string;
  weight: string;
  style: string;
  readability: number; // 0.0 - 1.0
  cultural: TypographyCultural;
}

export interface TypographyCultural {
  tradition: string;
  authenticity: number; // 0.0 - 1.0
  readability: string;
  sacred: boolean;
}

export interface LayoutAnalysis {
  composition: CompositionAnalysis;
  balance: BalanceAnalysis;
  hierarchy: HierarchyAnalysis;
  cultural: LayoutCultural;
}

export interface CompositionAnalysis { /* ... */ }
export interface BalanceAnalysis { /* ... */ }
export interface HierarchyAnalysis { /* ... */ }
export interface LayoutCultural { /* ... */ }

export interface AestheticAnalysis {
  beauty: number; // 0.0 - 1.0
  harmony: number; // 0.0 - 1.0
  elegance: number; // 0.0 - 1.0
  cultural: AestheticCultural;
}

export interface AestheticCultural { /* ... */ }
export interface CulturalAnalysis { /* ... */ }

// Complete ProcessingResult interface
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

// Export result interface
export interface ExportResult {
  format: ExportFormat;
  data: any;
  filename: string;
  size: number;
}