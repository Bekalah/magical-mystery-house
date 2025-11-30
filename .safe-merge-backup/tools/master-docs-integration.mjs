#!/usr/bin/env node
/**
 * Master Documentation Integration Tool
 * 
 * Reads and parses OpenSpec AGENTS.md, openspec/project.md, and master documentation
 * Extracts quality standards and requirements
 * Validates improvements against master docs
 * Ensures trauma-aware language throughout
 * 
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const OPESPEC_AGENTS = join(process.cwd(), 'openspec/AGENTS.md');
const OPESPEC_PROJECT = join(process.cwd(), 'openspec/project.md');

export class MasterDocsIntegration {
  constructor() {
    this.standards = this.loadStandards();
  }

  loadStandards() {
    const standards = {
      traumaAware: [],
      qualityStandards: [],
      sacredGeometry: [],
      trinityArchitecture: [],
      registryIntegration: [],
      accessibility: []
    };

    // Load OpenSpec AGENTS.md
    if (existsSync(OPESPEC_AGENTS)) {
      const content = readFileSync(OPESPEC_AGENTS, 'utf-8');
      this.parseStandards(content, standards);
    }

    // Load openspec/project.md
    if (existsSync(OPESPEC_PROJECT)) {
      const content = readFileSync(OPESPEC_PROJECT, 'utf-8');
      this.parseStandards(content, standards);
    }

    return standards;
  }

  parseStandards(content, standards) {
    // Extract trauma-aware requirements
    if (content.includes('trauma-aware') || content.includes('PTSD-safe')) {
      standards.traumaAware.push('All messaging must be gentle and constructive');
      standards.traumaAware.push('No harsh criticism, only constructive feedback');
      standards.traumaAware.push('Acknowledge effort and progress');
    }

    // Extract quality standards
    if (content.includes('museum-grade') || content.includes('highest art')) {
      standards.qualityStandards.push('Museum-grade quality required');
      standards.qualityStandards.push('International art standards');
    }

    // Extract sacred geometry
    if (content.includes('golden ratio') || content.includes('Fibonacci') || content.includes('144:99')) {
      standards.sacredGeometry.push('Golden ratio (1.618) compliance');
      standards.sacredGeometry.push('Fibonacci sequence integration');
      standards.sacredGeometry.push('144:99 ratio compliance');
    }

    // Extract Trinity Architecture
    if (content.includes('Trinity Architecture') || content.includes('Brain') || content.includes('Soul') || content.includes('Body')) {
      standards.trinityArchitecture.push('Brain (Cosmogenesis) integration');
      standards.trinityArchitecture.push('Soul (Circuitum99) integration');
      standards.trinityArchitecture.push('Body (Stone Grimoire) integration');
    }

    // Extract REGISTRY integration
    if (content.includes('REGISTRY') || content.includes('registry')) {
      standards.registryIntegration.push('All apps must consume from centralized REGISTRY');
      standards.registryIntegration.push('Schema validation required');
    }

    // Extract accessibility
    if (content.includes('accessibility') || content.includes('WCAG')) {
      standards.accessibility.push('WCAG AA compliance');
      standards.accessibility.push('Keyboard navigation support');
      standards.accessibility.push('Screen reader support');
    }
  }

  validateImprovement(improvement) {
    const issues = [];
    const suggestions = [];

    // Check trauma-aware compliance
    if (improvement.description) {
      const harshWords = ['bad', 'wrong', 'broken', 'failed', 'error', 'mistake'];
      const hasHarshLanguage = harshWords.some(word => 
        improvement.description.toLowerCase().includes(word)
      );
      if (hasHarshLanguage) {
        issues.push('Description contains potentially harsh language');
        suggestions.push('Use gentle, constructive language instead');
      }
    }

    // Check quality standards
    if (improvement.type === 'enhancement') {
      suggestions.push('Validate against museum-grade quality standards');
      suggestions.push('Check sacred geometry compliance');
    }

    // Check REGISTRY integration
    if (improvement.system && improvement.system.includes('app')) {
      suggestions.push('Ensure REGISTRY integration if applicable');
    }

    return {
      valid: issues.length === 0,
      issues,
      suggestions,
      standards: this.standards
    };
  }

  getStandards() {
    return this.standards;
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const integration = new MasterDocsIntegration();
  const standards = integration.getStandards();
  console.log(JSON.stringify(standards, null, 2));
}

export default MasterDocsIntegration;

