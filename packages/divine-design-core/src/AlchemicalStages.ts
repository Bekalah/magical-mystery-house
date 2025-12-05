/**
 * ⚗️ Alchemical Transformation Stages
 * 
 * The 7 stages of alchemical transformation applied to design
 * 
 * @license CC0-1.0 - Public Domain
 */

export enum AlchemicalStage {
  CALCINATION = 'calcination',    // 🔥 Fire - Break down
  DISSOLUTION = 'dissolution',    // 💧 Water - Dissolve
  SEPARATION = 'separation',     // 🌬️ Air - Separate
  CONJUNCTION = 'conjunction',   // ⚡ Lightning - Unite
  FERMENTATION = 'fermentation', // 🌱 Earth - Transform
  DISTILLATION = 'distillation', // 💨 Air - Purify
  COAGULATION = 'coagulation'    // ✨ Aether - Solidify
}

/**
 * ⚗️ AlchemicalStageConfig - The Principle
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
export interface AlchemicalStageConfig {
  stage: AlchemicalStage;
  element: 'fire' | 'water' | 'air' | 'earth' | 'aether';
  color: string;
  purpose: string;
  designPrinciple: string;
  packageExamples: string[];
}

export const ALCHEMICAL_STAGES: Record<AlchemicalStage, AlchemicalStageConfig> = {
  [AlchemicalStage.CALCINATION]: {
    stage: AlchemicalStage.CALCINATION,
    element: 'fire',
    color: '#FF4500',
    purpose: 'Break down base materials',
    designPrinciple: 'Deconstruction, analysis, debugging',
    packageExamples: ['debug-system-core', 'professional-quality-control']
  },
  [AlchemicalStage.DISSOLUTION]: {
    stage: AlchemicalStage.DISSOLUTION,
    element: 'water',
    color: '#1E90FF',
    purpose: 'Dissolve into essence',
    designPrinciple: 'Flow, fluidity, merging',
    packageExamples: ['cathedral-integration-bridge', 'unified-codex-core']
  },
  [AlchemicalStage.SEPARATION]: {
    stage: AlchemicalStage.SEPARATION,
    element: 'air',
    color: '#FFD700',
    purpose: 'Separate pure from impure',
    designPrinciple: 'Filtering, categorization, organization',
    packageExamples: ['cathedral-data-core', 'mystical-data-unified']
  },
  [AlchemicalStage.CONJUNCTION]: {
    stage: AlchemicalStage.CONJUNCTION,
    element: 'aether',
    color: '#9370DB',
    purpose: 'Unite opposites',
    designPrinciple: 'Fusion, synthesis, integration',
    packageExamples: ['cathedral-fusion-kink-engine', 'fusion-kink-core']
  },
  [AlchemicalStage.FERMENTATION]: {
    stage: AlchemicalStage.FERMENTATION,
    element: 'earth',
    color: '#50C878',
    purpose: 'Transform through decay/rebirth',
    designPrinciple: 'Evolution, growth, learning',
    packageExamples: ['spiral-learning-engine', 'living-libraries']
  },
  [AlchemicalStage.DISTILLATION]: {
    stage: AlchemicalStage.DISTILLATION,
    element: 'air',
    color: '#C0C0C0',
    purpose: 'Purify and refine',
    designPrinciple: 'Refinement, optimization, clarity',
    packageExamples: ['professional-export-integration', 'art-standards-core']
  },
  [AlchemicalStage.COAGULATION]: {
    stage: AlchemicalStage.COAGULATION,
    element: 'aether',
    color: '#FFD700',
    purpose: 'Solidify the perfected',
    designPrinciple: 'Final form, completion, gold',
    packageExamples: ['magnum-opus', 'professional-suite']
  }
};

/**
 * Get alchemical stage for a package or system
 */
/**
 * ⚗️ GetAlchemicalStage - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getAlchemicalStage(packageName: string): AlchemicalStageConfig | null {
  const name = packageName.toLowerCase();
  
  for (const [stage, config] of Object.entries(ALCHEMICAL_STAGES)) {
    if (config.packageExamples.some(pkg => name.includes(pkg.replace('@cathedral/', '')))) {
      return config as AlchemicalStageConfig;
    }
  }
  
  // Default mapping based on keywords
  if (name.includes('debug') || name.includes('analysis')) {
    return ALCHEMICAL_STAGES[AlchemicalStage.CALCINATION];
  }
  if (name.includes('integration') || name.includes('bridge') || name.includes('unified')) {
    return ALCHEMICAL_STAGES[AlchemicalStage.DISSOLUTION];
  }
  if (name.includes('data') || name.includes('filter') || name.includes('organize')) {
    return ALCHEMICAL_STAGES[AlchemicalStage.SEPARATION];
  }
  if (name.includes('fusion') || name.includes('synthesis') || name.includes('merge')) {
    return ALCHEMICAL_STAGES[AlchemicalStage.CONJUNCTION];
  }
  if (name.includes('learning') || name.includes('growth') || name.includes('living')) {
    return ALCHEMICAL_STAGES[AlchemicalStage.FERMENTATION];
  }
  if (name.includes('export') || name.includes('refine') || name.includes('optimize')) {
    return ALCHEMICAL_STAGES[AlchemicalStage.DISTILLATION];
  }
  if (name.includes('magnum') || name.includes('opus') || name.includes('complete')) {
    return ALCHEMICAL_STAGES[AlchemicalStage.COAGULATION];
  }
  
  return null;
}

