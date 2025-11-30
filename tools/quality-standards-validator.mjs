#!/usr/bin/env node
/**
 * Quality Standards Validator
 * 
 * Validates against highest art/3D/game standards
 * Checks sacred geometry compliance (golden ratio, Fibonacci)
 * Verifies trauma-safe design patterns
 * Validates 3D environment quality
 * Checks visual consistency
 * Ensures accessibility standards (WCAG AA)
 * 
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const GOLDEN_RATIO = 1.618033988749895;
const FIBONACCI_SEQUENCE = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

export class QualityStandardsValidator {
  validateSacredGeometry(filePath, content) {
    const issues = [];
    const checks = [];

    // Check for golden ratio usage
    const hasGoldenRatio = /1\.618|golden.ratio|phi/i.test(content);
    if (!hasGoldenRatio && filePath.includes('design') || filePath.includes('geometry')) {
      checks.push('Consider golden ratio (1.618) for proportions');
    }

    // Check for Fibonacci sequence
    const hasFibonacci = FIBONACCI_SEQUENCE.some(num => content.includes(num.toString()));
    if (!hasFibonacci && (filePath.includes('design') || filePath.includes('layout'))) {
      checks.push('Consider Fibonacci sequence for sizing');
    }

    // Check for 144:99 ratio
    const has14499 = /144.*99|99.*144|144:99/i.test(content);
    if (!has14499 && filePath.includes('codex')) {
      checks.push('Verify 144:99 ratio compliance');
    }

    return {
      compliant: issues.length === 0,
      issues,
      suggestions: checks
    };
  }

  validateTraumaSafe(content) {
    const issues = [];
    const patterns = {
      autoplay: /autoplay|auto.play/i,
      suddenSound: /play\(\)|\.play\(/i,
      flashing: /flash|blink|flicker/i,
      noExit: /no.*exit|cannot.*exit/i
    };

    for (const [name, pattern] of Object.entries(patterns)) {
      if (pattern.test(content)) {
        issues.push(`Potential trauma trigger: ${name}`);
      }
    }

    // Check for safety features
    const hasExit = /escape|esc.*exit|emergency.*exit/i.test(content);
    const hasPause = /pause|stop|break/i.test(content);
    const hasGrounding = /grounding|breathe|calm/i.test(content);

    const suggestions = [];
    if (!hasExit) suggestions.push('Add ESC key exit functionality');
    if (!hasPause) suggestions.push('Add pause/stop functionality');
    if (!hasGrounding) suggestions.push('Consider grounding exercise access');

    return {
      safe: issues.length === 0,
      issues,
      suggestions
    };
  }

  validate3DQuality(filePath, content) {
    const checks = [];
    
    if (filePath.includes('three') || filePath.includes('babylon') || filePath.includes('3d')) {
      // Check for proper 3D setup
      if (!content.includes('Scene') && !content.includes('scene')) {
        checks.push('Verify 3D scene setup');
      }
      if (!content.includes('Camera') && !content.includes('camera')) {
        checks.push('Verify camera configuration');
      }
      if (!content.includes('Light') && !content.includes('light')) {
        checks.push('Verify lighting setup');
      }
    }

    return {
      quality: checks.length === 0,
      suggestions: checks
    };
  }

  validateAccessibility(content) {
    const issues = [];
    const suggestions = [];

    // Check for keyboard navigation
    if (!content.includes('keyboard') && !content.includes('keydown') && !content.includes('keyup')) {
      suggestions.push('Add keyboard navigation support');
    }

    // Check for ARIA labels
    if (!content.includes('aria-label') && !content.includes('ariaLabel')) {
      suggestions.push('Add ARIA labels for screen readers');
    }

    // Check for focus management
    if (!content.includes('focus') && !content.includes('tabIndex')) {
      suggestions.push('Add focus management for accessibility');
    }

    return {
      accessible: issues.length === 0,
      issues,
      suggestions
    };
  }

  validateFile(filePath) {
    if (!existsSync(filePath)) {
      return { error: 'File not found' };
    }

    const content = readFileSync(filePath, 'utf-8');
    
    const sacredGeometry = this.validateSacredGeometry(filePath, content);
    const traumaSafe = this.validateTraumaSafe(content);
    const quality3D = this.validate3DQuality(filePath, content);
    const accessibility = this.validateAccessibility(content);

    return {
      file: filePath,
      sacredGeometry,
      traumaSafe,
      quality3D,
      accessibility,
      overall: {
        compliant: sacredGeometry.compliant && traumaSafe.safe && quality3D.quality && accessibility.accessible,
        totalIssues: sacredGeometry.issues.length + traumaSafe.issues.length + accessibility.issues.length,
        totalSuggestions: sacredGeometry.suggestions.length + traumaSafe.suggestions.length + quality3D.suggestions.length + accessibility.suggestions.length
      }
    };
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new QualityStandardsValidator();
  const filePath = process.argv[2];
  if (filePath) {
    const result = validator.validateFile(filePath);
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('Usage: quality-standards-validator.mjs <file-path>');
  }
}

export default QualityStandardsValidator;

