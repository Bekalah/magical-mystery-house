/**
 * 🔮 Hermetic Principles Applied to Design
 * 
 * The 7 Hermetic Principles from The Kybalion
 * 
 * @license CC0-1.0 - Public Domain
 */

export enum HermeticPrinciple {
  MENTALISM = 'mentalism',           // All is Mind
  CORRESPONDENCE = 'correspondence', // As above, so below
  VIBRATION = 'vibration',           // Nothing rests; everything moves
  POLARITY = 'polarity',            // Everything is dual
  RHYTHM = 'rhythm',                // Everything flows, out and in
  CAUSE_EFFECT = 'cause_effect',    // Every cause has its effect
  GENDER = 'gender'                 // Gender is in everything
}

/**
 * ⚗️ HermeticPrincipleConfig - The Principle
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
export interface HermeticPrincipleConfig {
  principle: HermeticPrinciple;
  axiom: string;
  designApplication: string;
  packageExamples: string[];
}

export const HERMETIC_PRINCIPLES: Record<HermeticPrinciple, HermeticPrincipleConfig> = {
  [HermeticPrinciple.MENTALISM]: {
    principle: HermeticPrinciple.MENTALISM,
    axiom: 'All is Mind; The Universe is Mental',
    designApplication: 'Thoughtful interfaces, consciousness-aware systems',
    packageExamples: ['consciousness-aware-creative', 'brain']
  },
  [HermeticPrinciple.CORRESPONDENCE]: {
    principle: HermeticPrinciple.CORRESPONDENCE,
    axiom: 'As above, so below; as below, so above',
    designApplication: 'Micro/macro patterns, fractal scaling, nested structures',
    packageExamples: ['sacred-geometry-core', 'fractal-flames-daemon-deity']
  },
  [HermeticPrinciple.VIBRATION]: {
    principle: HermeticPrinciple.VIBRATION,
    axiom: 'Nothing rests; everything moves; everything vibrates',
    designApplication: 'Animation, flow, rhythm, dynamic interfaces',
    packageExamples: ['cathedral-audio-synthesis', 'music-engine-core']
  },
  [HermeticPrinciple.POLARITY]: {
    principle: HermeticPrinciple.POLARITY,
    axiom: 'Everything is dual; everything has poles; everything has its pair of opposites',
    designApplication: 'Light/dark modes, expansion/contraction, active/receptive',
    packageExamples: ['trinity-v1-1-core'] // Brain/Soul/Body
  },
  [HermeticPrinciple.RHYTHM]: {
    principle: HermeticPrinciple.RHYTHM,
    axiom: 'Everything flows, out and in; everything has its tides',
    designApplication: 'Cycles, patterns, breathing interfaces, natural flow',
    packageExamples: ['spiral-learning-engine', 'living-canon-engine']
  },
  [HermeticPrinciple.CAUSE_EFFECT]: {
    principle: HermeticPrinciple.CAUSE_EFFECT,
    axiom: 'Every cause has its effect; every effect has its cause',
    designApplication: 'Action/reaction, feedback loops, responsive systems',
    packageExamples: ['game-engine', 'story-engine']
  },
  [HermeticPrinciple.GENDER]: {
    principle: HermeticPrinciple.GENDER,
    axiom: 'Gender is in everything; everything has its Masculine and Feminine Principles',
    designApplication: 'Active/receptive balance, yin/yang harmony',
    packageExamples: ['fusion-kink-core', 'cathedral-fusion-kink-engine']
  }
};

/**
 * Get hermetic principle for a package
 */
/**
 * ⚗️ GetHermeticPrinciple - Solve et Coagula
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
export function getHermeticPrinciple(packageName: string): HermeticPrincipleConfig | null {
  const name = packageName.toLowerCase();
  
  for (const [principle, config] of Object.entries(HERMETIC_PRINCIPLES)) {
    if (config.packageExamples.some(pkg => name.includes(pkg))) {
      return config as HermeticPrincipleConfig;
    }
  }
  
  // Default mapping
  if (name.includes('consciousness') || name.includes('brain') || name.includes('mind')) {
    return HERMETIC_PRINCIPLES[HermeticPrinciple.MENTALISM];
  }
  if (name.includes('geometry') || name.includes('fractal') || name.includes('pattern')) {
    return HERMETIC_PRINCIPLES[HermeticPrinciple.CORRESPONDENCE];
  }
  if (name.includes('audio') || name.includes('music') || name.includes('vibration')) {
    return HERMETIC_PRINCIPLES[HermeticPrinciple.VIBRATION];
  }
  if (name.includes('trinity') || name.includes('polar') || name.includes('dual')) {
    return HERMETIC_PRINCIPLES[HermeticPrinciple.POLARITY];
  }
  if (name.includes('spiral') || name.includes('cycle') || name.includes('rhythm')) {
    return HERMETIC_PRINCIPLES[HermeticPrinciple.RHYTHM];
  }
  if (name.includes('game') || name.includes('story') || name.includes('effect')) {
    return HERMETIC_PRINCIPLES[HermeticPrinciple.CAUSE_EFFECT];
  }
  if (name.includes('fusion') || name.includes('kink') || name.includes('gender')) {
    return HERMETIC_PRINCIPLES[HermeticPrinciple.GENDER];
  }
  
  return null;
}

