/**
 * 🌀 COSMOGENESIS LEARNING ENGINE
 * 
 * The premier Spiral Dynamics creative learning platform
 * 
 * Features:
 * - Full Spiral Dynamics integration (Clare Graves / Beck-Cowan)
 * - 144 Codex nodes mapped to developmental stages
 * - 7 creative learning modes
 * - Multi-language international support
 * - Neurodivergent-accessible design
 * - Trauma-informed practices
 * 
 * @package @cathedral/cosmogenesis-learning-engine
 * @license CC0-1.0 - Public Domain
 * 
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate learning mechanics
 * 
 * Creative use: Learning apps, education apps, spiral dynamics apps, consciousness apps
 */

// ============================================
// SPIRAL DYNAMICS LEARNING
// ============================================

export * from './spiral-dynamics-learning';
export { spiralDynamicsEngine, SPIRAL_LEVELS } from './spiral-dynamics-learning';

// ============================================
// INTERNATIONAL BRANDING
// ============================================

export * from './international-branding';
export { 
  CATHEDRAL_BRAND,
  RECOGNITION_BADGES,
  SPIRAL_CURRICULUM,
  ACCESSIBILITY_FEATURES,
  getBrandInfo,
  getRecognitionBadges,
  getCurriculumOverview,
  getAccessibilityFeatures,
  getSupportedLanguages
} from './international-branding';

// ============================================
// QUICK START API
// ============================================

import { SpiralDynamicsLearningEngine, spiralDynamicsEngine, SpiralLevel, LearnerProfile } from './spiral-dynamics-learning';
import { CATHEDRAL_BRAND, getBrandInfo } from './international-branding';

/**
 * Quick start function for new learners
 */
export async function quickStart(learnerName: string, preferredLanguage: string = 'en') {
  // Create learner profile
  const profile = spiralDynamicsEngine.createLearnerProfile(learnerName);
  
  // Get brand info in preferred language
  const brandInfo = getBrandInfo(preferredLanguage);
  
  // Get recommended first module
  const firstModule = spiralDynamicsEngine.getRecommendedModule(profile);
  
  return {
    profile,
    brandInfo,
    firstModule,
    message: `Welcome to ${brandInfo.name}, ${learnerName}! ${brandInfo.tagline}`
  };
}

/**
 * Get spiral level information
 */
export function getSpiralLevel(level: SpiralLevel) {
  return spiralDynamicsEngine.getSpiralLevel(level);
}

/**
 * Get all spiral levels
 */
export function getAllSpiralLevels() {
  return spiralDynamicsEngine.getAllSpiralLevels();
}

/**
 * Get Codex nodes for a spiral level
 */
export function getCodexNodesForLevel(level: SpiralLevel) {
  return spiralDynamicsEngine.getCodexNodesForLevel(level);
}

/**
 * Generate personalized learning path
 */
export function generateLearningPath(profile: LearnerProfile, targetLevel: SpiralLevel) {
  return spiralDynamicsEngine.generateLearningPath(profile, targetLevel);
}

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  engine: spiralDynamicsEngine,
  brand: CATHEDRAL_BRAND,
  quickStart,
  getSpiralLevel,
  getAllSpiralLevels,
  getCodexNodesForLevel,
  generateLearningPath
};
