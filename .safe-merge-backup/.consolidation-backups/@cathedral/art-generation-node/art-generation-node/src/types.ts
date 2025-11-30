/**
 * types
 * 
 * @package @cathedral/art-generation-node
 */
export interface PatternData {
  id: string;
  name: string;
  type: 'geometric' | 'organic' | 'fractal' | 'sacred' | 'fusion';
  source: 'real-world' | 'generated' | 'book-derived' | 'arcanae-derived';
  parameters: PatternParameters;
  realWorldConnection?: RealWorldSource;
  artStyle: ArtStyle;
  metadata: PatternMetadata;
}

export interface PatternParameters {
  // Geometric patterns
  sides?: number;
  radius?: number;
  rotation?: number;
  scale?: number;

  // Fractal patterns
  iterations?: number;
  fractalType?: 'mandelbrot' | 'julia' | 'burning-ship' | 'custom';

  // Organic patterns
  growthRate?: number;
  branchingFactor?: number;
  symmetry?: number;

  // Sacred geometry
  sacredRatio?: number;
  petalCount?: number;
  spiralCount?: number;

  // Fusion parameters
  fusionSources?: string[];
  fusionWeights?: number[];
  mutationRate?: number;

  // Allow for dynamic parameters
  [key: string]: any;
}

export interface RealWorldSource {
  type: 'book' | 'artwork' | 'nature' | 'architecture' | 'music' | 'person';
  id: string;
  name: string;
  description: string;
  dataPoints: number[];
  significance: string;
  artConnection: string;
}

export interface ArtStyle {
  name: string;
  genre: 'abstract' | 'figurative' | 'minimalist' | 'baroque' | 'art-nouveau' | 'fusion';
  medium: 'digital' | 'oil' | 'watercolor' | 'sculpture' | 'mixed-media' | 'generative';
  colorPalette: ColorPalette;
  techniques: string[];
  influences: string[];
}

export interface ColorPalette {
  primary: string[];
  secondary: string[];
  accent: string[];
  harmony: 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'sacred';
  temperature: 'warm' | 'cool' | 'balanced';
}

export interface PatternMetadata {
  created: Date;
  complexity: number;
  aestheticScore: number;
  innovationScore: number;
  culturalSignificance: number;
  tags: string[];
  description: string;
}

export interface ArtGenerationRequest {
  pattern: PatternData;
  style: ArtStyle;
  dimensions: { width: number; height: number };
  quality: 'draft' | 'standard' | 'high' | 'ultra';
  format: 'png' | 'jpg' | 'svg' | 'webp' | 'tiff';
  realDataIntegration: boolean;
  arcanaeMode?: ArcanaeMode;
}

export interface ArcanaeMode {
  active: boolean;
  primaryArcana: string;
  secondaryArcana?: string;
  bookSource?: string;
  autoMode: boolean;
  interconnectedPaths: boolean;
  individualExpression: boolean;
}

export interface GeneratedArtwork {
  id: string;
  request: ArtGenerationRequest;
  result: ArtGenerationResult;
  metadata: ArtworkMetadata;
  connections: ArtworkConnection[];
}

export interface ArtGenerationResult {
  success: boolean;
  imageData?: string; // Base64 encoded image
  svgData?: string; // SVG markup
  patternAnalysis: PatternAnalysis;
  styleAnalysis: StyleAnalysis;
  error?: string;
}

export interface PatternAnalysis {
  symmetry: number;
  complexity: number;
  fractalDimension?: number;
  aestheticRatios: number[];
  goldenRatioCompliance: number;
  sacredGeometryElements: string[];
}

export interface StyleAnalysis {
  styleAccuracy: number;
  colorHarmony: number;
  compositionBalance: number;
  artisticInnovation: number;
  technicalQuality: number;
}

export interface ArtworkMetadata {
  generationTime: number;
  fileSize: number;
  resolution: string;
  colorDepth: number;
  layers: number;
  techniques: string[];
}

export interface ArtworkConnection {
  type: 'inspiration' | 'technique' | 'subject' | 'style' | 'concept';
  source: RealWorldSource;
  strength: number;
  description: string;
}

export interface FusionEngine {
  combinePatterns(patterns: PatternData[]): PatternData;
  mergeStyles(styles: ArtStyle[]): ArtStyle;
  createFusionArtwork(requests: ArtGenerationRequest[]): GeneratedArtwork;
}

export interface AutoModeConfig {
  enabled: boolean;
  interval: number; // milliseconds between generations
  patternRotation: boolean;
  styleEvolution: boolean;
  realDataSync: boolean;
  arcanaeIntegration: boolean;
  maxGenerations?: number;
}

export interface PatternScienceResult {
  pattern: PatternData;
  analysis: {
    mathematicalProperties: any;
    aestheticProperties: any;
    culturalProperties: any;
    innovationMetrics: any;
  };
  realWorldApplications: string[];
  artGenerationPotential: number;
  scientificValue: number;
}
