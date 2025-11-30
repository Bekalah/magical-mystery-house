/**
 * types
 * 
 * @package @cathedral/art-generation-node
 */
/**
 * ⚗️ PatternData - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
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

/**
 * ⚗️ PatternParameters - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
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

/**
 * ⚗️ RealWorldSource - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface RealWorldSource {
  type: 'book' | 'artwork' | 'nature' | 'architecture' | 'music' | 'person';
  id: string;
  name: string;
  description: string;
  dataPoints: number[];
  significance: string;
  artConnection: string;
}

/**
 * ⚗️ ArtStyle - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ArtStyle {
  name: string;
  genre: 'abstract' | 'figurative' | 'minimalist' | 'baroque' | 'art-nouveau' | 'fusion';
  medium: 'digital' | 'oil' | 'watercolor' | 'sculpture' | 'mixed-media' | 'generative';
  colorPalette: ColorPalette;
  techniques: string[];
  influences: string[];
}

/**
 * ⚗️ ColorPalette - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ColorPalette {
  primary: string[];
  secondary: string[];
  accent: string[];
  harmony: 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'sacred';
  temperature: 'warm' | 'cool' | 'balanced';
}

/**
 * ⚗️ PatternMetadata - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface PatternMetadata {
  created: Date;
  complexity: number;
  aestheticScore: number;
  innovationScore: number;
  culturalSignificance: number;
  tags: string[];
  description: string;
}

/**
 * ⚗️ ArtGenerationRequest - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ArtGenerationRequest {
  pattern: PatternData;
  style: ArtStyle;
  dimensions: { width: number; height: number };
  quality: 'draft' | 'standard' | 'high' | 'ultra';
  format: 'png' | 'jpg' | 'svg' | 'webp' | 'tiff';
  realDataIntegration: boolean;
  arcanaeMode?: ArcanaeMode;
}

/**
 * ⚗️ ArcanaeMode - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ArcanaeMode {
  active: boolean;
  primaryArcana: string;
  secondaryArcana?: string;
  bookSource?: string;
  autoMode: boolean;
  interconnectedPaths: boolean;
  individualExpression: boolean;
}

/**
 * ⚗️ GeneratedArtwork - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface GeneratedArtwork {
  id: string;
  request: ArtGenerationRequest;
  result: ArtGenerationResult;
  metadata: ArtworkMetadata;
  connections: ArtworkConnection[];
}

/**
 * ⚗️ ArtGenerationResult - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ArtGenerationResult {
  success: boolean;
  imageData?: string; // Base64 encoded image
  svgData?: string; // SVG markup
  patternAnalysis: PatternAnalysis;
  styleAnalysis: StyleAnalysis;
  error?: string;
}

/**
 * ⚗️ PatternAnalysis - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface PatternAnalysis {
  symmetry: number;
  complexity: number;
  fractalDimension?: number;
  aestheticRatios: number[];
  goldenRatioCompliance: number;
  sacredGeometryElements: string[];
}

/**
 * ⚗️ StyleAnalysis - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface StyleAnalysis {
  styleAccuracy: number;
  colorHarmony: number;
  compositionBalance: number;
  artisticInnovation: number;
  technicalQuality: number;
}

/**
 * ⚗️ ArtworkMetadata - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ArtworkMetadata {
  generationTime: number;
  fileSize: number;
  resolution: string;
  colorDepth: number;
  layers: number;
  techniques: string[];
}

/**
 * ⚗️ ArtworkConnection - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface ArtworkConnection {
  type: 'inspiration' | 'technique' | 'subject' | 'style' | 'concept';
  source: RealWorldSource;
  strength: number;
  description: string;
}

/**
 * ⚗️ FusionEngine - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface FusionEngine {
  combinePatterns(patterns: PatternData[]): PatternData;
  mergeStyles(styles: ArtStyle[]): ArtStyle;
  createFusionArtwork(requests: ArtGenerationRequest[]): GeneratedArtwork;
}

/**
 * ⚗️ AutoModeConfig - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface AutoModeConfig {
  enabled: boolean;
  interval: number; // milliseconds between generations
  patternRotation: boolean;
  styleEvolution: boolean;
  realDataSync: boolean;
  arcanaeIntegration: boolean;
  maxGenerations?: number;
}

/**
 * ⚗️ PatternScienceResult - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * fire energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Fire
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
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
