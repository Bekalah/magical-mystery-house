/**
 * 🏛️ Cathedral Hall of Ateliers - Main Export
 * Professional artistic creation and collaboration systems
 * Body component of Trinity Architecture
 */

export { default as HallOfAteliers } from './core/hall-of-ateliers.js';
export * from './types/index.js';
export * from './config/trauma-safe.js';

import HallOfAteliers from './core/hall-of-ateliers.js';

// Export a singleton instance for easy integration
const hallOfAteliers = new HallOfAteliers();

export default hallOfAteliers;

// Professional studio configurations
export const STUDIO_SPACES = {
  PAINTING_ATELIER: 'painting_atelier',
  SCULPTURE_WORKSHOP: 'sculpture_workshop',
  DIGITAL_LAB: 'digital_lab',
  TEXTILE_STUDIO: 'textile_studio',
  MIXED_MEDIA_LAB: 'mixed_media_lab'
};

// Professional material categories
export const MATERIAL_CATEGORIES = {
  PIGMENT: 'pigment',
  SUPPORT: 'support',
  BRUSH: 'brush',
  TOOL: 'tool',
  MEDIUM: 'medium',
  METAL: 'metal',
  FABRIC: 'fabric',
  DIGITAL: 'digital'
};

// Quality grades
export const QUALITY_GRADES = {
  STUDENT: 'student',
  ARTIST: 'artist',
  PROFESSIONAL: 'professional',
  ARCHIVAL: 'archival'
};

// Trauma-safe presets
export const TRAUMA_SAFE_PRESETS = {
  HEALING: 'healing',
  GENTLE: 'gentle',
  STANDARD: 'standard',
  FULL: 'full'
};

// Quick start example
export const QUICK_START_EXAMPLE = {
  artist: {
    name: 'Elena Vasquez',
    primaryMedium: 'painting',
    skillLevel: 'advanced',
    specializations: ['portrait_painting', 'landscape']
  },
  project: {
    title: 'Sacred Geometry Installation',
    description: 'Large-scale mixed media installation combining painted panels with sculptural elements',
    primaryMedium: 'mixed_media',
    style: 'contemporary',
    projectType: 'exhibition'
  }
};

export { hallOfAteliers as atelierInstance };