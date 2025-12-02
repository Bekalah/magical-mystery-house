/**
 * Liber Arcanae Security Module
 * 
 * Security validation and safety measures for Liber Arcanae data structures
 * Validates cards, correspondences, pathworking practices
 * 
 * @license CC0-1.0 - Public Domain
 */

import { ArcanaCard, ArcanaCorrespondences, PathworkingPractice } from './LiberArcanaeEngine';

/**
 * ⚗️ SecurityValidation - The Principle
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
export interface SecurityValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * ⚗️ SecurityConfig - The Principle
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
export interface SecurityConfig {
  maxCardIndex: number;         // 143
  minConsciousnessLevel: number; // 0
  maxConsciousnessLevel: number; // 21
  maxStringLength: number;       // 10000
  maxArrayLength: number;        // 1000
  requireSanitization: boolean;  // true
  validateCorrespondences: boolean; // true
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  maxCardIndex: 143,
  minConsciousnessLevel: 0,
  maxConsciousnessLevel: 21,
  maxStringLength: 10000,
  maxArrayLength: 1000,
  requireSanitization: true,
  validateCorrespondences: true
};

/**
 * ⚗️ LiberArcanaeSecurity - The Crucible
 * 
 * In the alchemical tradition, this class serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this class
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Crucible
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export class LiberArcanaeSecurity {
  private config: SecurityConfig;

  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = { ...DEFAULT_SECURITY_CONFIG, ...config };
  }

  /**
   * Validate an ArcanaCard for security
   */
  validateCard(card: ArcanaCard): SecurityValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate cardIndex
    if (typeof card.cardIndex !== 'number' || card.cardIndex < 0 || card.cardIndex > this.config.maxCardIndex) {
      errors.push(`Invalid cardIndex: ${card.cardIndex} (must be 0-${this.config.maxCardIndex})`);
    }

    // Validate type
    if (!['major', 'minor', 'bridge'].includes(card.type)) {
      errors.push(`Invalid card type: ${card.type}`);
    }

    // Validate consciousnessLevel
    if (typeof card.consciousnessLevel !== 'number' || 
        card.consciousnessLevel < this.config.minConsciousnessLevel || 
        card.consciousnessLevel > this.config.maxConsciousnessLevel) {
      errors.push(`Invalid consciousnessLevel: ${card.consciousnessLevel}`);
    }

    // Validate nodeMapping
    if (typeof card.nodeMapping !== 'number' || card.nodeMapping < 0 || card.nodeMapping > 143) {
      errors.push(`Invalid nodeMapping: ${card.nodeMapping}`);
    }

    // Validate strings
    if (typeof card.name !== 'string' || card.name.length > this.config.maxStringLength) {
      errors.push(`Invalid card name: length ${card.name?.length || 0}`);
    }

    if (this.config.requireSanitization && card.name && this.containsUnsafeChars(card.name)) {
      errors.push(`Card name contains unsafe characters`);
    }

    // Validate suit if minor arcana
    if (card.type === 'minor' && card.suit) {
      if (!['wands', 'cups', 'swords', 'pentacles'].includes(card.suit)) {
        errors.push(`Invalid suit: ${card.suit}`);
      }
    }

    // Validate correspondences
    if (this.config.validateCorrespondences && card.correspondences) {
      const corrValidation = this.validateCorrespondences(card.correspondences);
      errors.push(...corrValidation.errors);
      warnings.push(...corrValidation.warnings);
    }

    // Validate pathworking
    if (card.pathworking) {
      const pathValidation = this.validatePathworking(card.pathworking);
      errors.push(...pathValidation.errors);
      warnings.push(...pathValidation.warnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate correspondences
   */
  validateCorrespondences(corr: ArcanaCorrespondences): SecurityValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate all string fields
    const stringFields = ['planet', 'zodiac', 'element', 'color', 'geometry', 'shemAngel', 'goetiaDemon', 'deity', 'iChing', 'soyga'];
    for (const field of stringFields) {
      const value = corr[field as keyof ArcanaCorrespondences];
      if (value && typeof value === 'string') {
        if (value.length > this.config.maxStringLength) {
          errors.push(`Correspondence ${field} too long: ${value.length}`);
        }
        if (this.config.requireSanitization && this.containsUnsafeChars(value)) {
          errors.push(`Correspondence ${field} contains unsafe characters`);
        }
      }
    }

    // Validate suit
    if (corr.suit && !['wands', 'cups', 'swords', 'pentacles'].includes(corr.suit)) {
      errors.push(`Invalid suit in correspondences: ${corr.suit}`);
    }

    // Validate court
    if (corr.court && !['page', 'knight', 'queen', 'king'].includes(corr.court)) {
      errors.push(`Invalid court in correspondences: ${corr.court}`);
    }

    // Validate number
    if (corr.number !== undefined) {
      if (typeof corr.number !== 'number' || corr.number < 1 || corr.number > 10) {
        errors.push(`Invalid number in correspondences: ${corr.number}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate pathworking practice
   */
  validatePathworking(path: PathworkingPractice): SecurityValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate strings
    if (typeof path.meditation !== 'string' || path.meditation.length > this.config.maxStringLength) {
      errors.push(`Pathworking meditation too long: ${path.meditation?.length || 0}`);
    }

    if (typeof path.integration !== 'string' || path.integration.length > this.config.maxStringLength) {
      errors.push(`Pathworking integration too long: ${path.integration?.length || 0}`);
    }

    // Validate exercises array
    if (Array.isArray(path.exercises)) {
      if (path.exercises.length > this.config.maxArrayLength) {
        errors.push(`Exercises array too long: ${path.exercises.length}`);
      }
      for (const exercise of path.exercises) {
        if (typeof exercise !== 'string') {
          errors.push(`Invalid exercise type: ${typeof exercise}`);
        } else if (exercise.length > this.config.maxStringLength) {
          errors.push(`Exercise too long: ${exercise.length}`);
        }
        if (this.config.requireSanitization && this.containsUnsafeChars(exercise)) {
          errors.push(`Exercise contains unsafe characters`);
        }
      }
    }

    // Validate correspondences object
    if (path.correspondences && this.config.requireSanitization) {
      if (this.containsUnsafeData(path.correspondences)) {
        errors.push(`Pathworking correspondences contain unsafe data`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Sanitize input data
   */
  sanitizeInput(input: unknown): unknown {
    if (typeof input === 'string') {
      return this.sanitizeString(input);
    }
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeInput(item));
    }
    if (input && typeof input === 'object' && !Array.isArray(input)) {
      const sanitized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(input)) {
        const sanitizedKey = this.sanitizeString(key);
        sanitized[sanitizedKey] = this.sanitizeInput(value);
      }
      return sanitized;
    }
    return input;
  }

  /**
   * Sanitize string input
   */
  private sanitizeString(str: string): string {
    // Remove null bytes
    str = str.replace(/\0/g, '');
    
    // Remove control characters except newlines and tabs
    str = str.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
    
    // Limit length
    if (str.length > this.config.maxStringLength) {
      str = str.substring(0, this.config.maxStringLength);
    }
    
    return str;
  }

  /**
   * Check for unsafe characters
   */
  private containsUnsafeChars(str: string): boolean {
    // Check for script injection patterns
    if (/<script|javascript:|on\w+\s*=/i.test(str)) {
      return true;
    }
    
    // Check for SQL injection patterns
    if (/(union|select|insert|update|delete|drop|exec|execute)\s+/i.test(str)) {
      return true;
    }
    
    // Check for null bytes
    if (str.includes('\0')) {
      return true;
    }
    
    return false;
  }

  /**
   * Check for unsafe data in objects
   */
  private containsUnsafeData(obj: unknown): boolean {
    if (typeof obj === 'string') {
      return this.containsUnsafeChars(obj);
    }
    if (Array.isArray(obj)) {
      return obj.some(item => this.containsUnsafeData(item));
    }
    if (obj && typeof obj === 'object') {
      return Object.values(obj).some(value => this.containsUnsafeData(value));
    }
    return false;
  }
}

export default LiberArcanaeSecurity;

