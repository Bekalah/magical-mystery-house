#!/usr/bin/env node
/**
 * Orchestration Validator
 * 
 * Verifies all layers are complete
 * Checks Trinity Architecture integration
 * Validates Brain/Soul/Body connections
 * Ensures all systems are orchestrated
 * Checks for missing connections
 * Validates complete system integration
 * 
 * @license CC0-1.0 - Public Domain
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const PACKAGES_DIR = join(process.cwd(), 'packages');

export class OrchestrationValidator {
  validateOrchestration() {
    const results = {
      trinityArchitecture: this.validateTrinityArchitecture(),
      systemConnections: this.validateSystemConnections(),
      missingConnections: this.findMissingConnections(),
      layerCompleteness: this.checkLayerCompleteness(),
      overall: { valid: false, issues: [] }
    };

    // Calculate overall status
    const allValid = 
      results.trinityArchitecture.valid &&
      results.systemConnections.valid &&
      results.missingConnections.length === 0 &&
      results.layerCompleteness.complete;

    results.overall.valid = allValid;
    if (!allValid) {
      results.overall.issues.push(...results.trinityArchitecture.issues);
      results.overall.issues.push(...results.systemConnections.issues);
      results.overall.issues.push(...results.missingConnections.map(m => `Missing: ${m}`));
      if (!results.layerCompleteness.complete) {
        results.overall.issues.push('Some layers incomplete');
      }
    }

    return results;
  }

  validateTrinityArchitecture() {
    const required = {
      brain: ['cosmogenesis', 'consciousness', 'flow'],
      soul: ['circuitum99', 'narrative', 'memory'],
      body: ['stone-grimoire', 'creative-output', 'skill']
    };

    const found = {
      brain: [],
      soul: [],
      body: []
    };

    // Check for Brain components
    if (existsSync(join(PACKAGES_DIR, 'trinity-v1-1-core'))) {
      found.brain.push('trinity-core');
    }

    // Check for Soul components
    if (existsSync(join(PACKAGES_DIR, 'circuitum99-core'))) {
      found.soul.push('circuitum99');
    }

    // Check for Body components
    if (existsSync(join(PACKAGES_DIR, 'stone-grimoire-core'))) {
      found.body.push('stone-grimoire');
    }

    const issues = [];
    let valid = true;

    for (const [component, requiredItems] of Object.entries(required)) {
      for (const item of requiredItems) {
        const foundItems = found[component];
        if (!foundItems.some(f => f.includes(item))) {
          issues.push(`Missing ${component} component: ${item}`);
          valid = false;
        }
      }
    }

    return { valid, issues, found };
  }

  validateSystemConnections() {
    const connections = {
      codex: existsSync(join(PACKAGES_DIR, 'codex-144-99-core')),
      circuitum: existsSync(join(PACKAGES_DIR, 'circuitum99-core')),
      grimoire: existsSync(join(PACKAGES_DIR, 'stone-grimoire-core')),
      mystery: existsSync(join(PACKAGES_DIR, 'mystery-house-core')),
      tesseract: existsSync(join(PACKAGES_DIR, 'tesseract-bridge-core')),
      hub: existsSync(join(PACKAGES_DIR, 'tesseract-bridge-hub')),
      liber: existsSync(join(PACKAGES_DIR, 'liber-arcanae-core'))
    };

    const allConnected = Object.values(connections).every(v => v);
    const issues = [];

    if (!allConnected) {
      for (const [system, connected] of Object.entries(connections)) {
        if (!connected) {
          issues.push(`System not found: ${system}`);
        }
      }
    }

    return {
      valid: allConnected,
      issues,
      connections
    };
  }

  findMissingConnections() {
    const missing = [];

    // Check for Tesseract Bridge connections
    if (existsSync(join(PACKAGES_DIR, 'tesseract-bridge-core'))) {
      const bridgeFile = join(PACKAGES_DIR, 'tesseract-bridge-core/src/TesseractBridge.ts');
      if (existsSync(bridgeFile)) {
        const content = readFileSync(bridgeFile, 'utf-8');
        if (!content.includes('Codex144Engine') && existsSync(join(PACKAGES_DIR, 'codex-144-99-core'))) {
          missing.push('Tesseract Bridge → Codex connection');
        }
        if (!content.includes('Circuitum99') && existsSync(join(PACKAGES_DIR, 'circuitum99-core'))) {
          missing.push('Tesseract Bridge → Circuitum99 connection');
        }
      }
    }

    return missing;
  }

  checkLayerCompleteness() {
    const layers = {
      core: existsSync(join(PACKAGES_DIR, 'codex-144-99-core')),
      trinity: existsSync(join(PACKAGES_DIR, 'trinity-v1-1-core')),
      bridge: existsSync(join(PACKAGES_DIR, 'tesseract-bridge-core')),
      hub: existsSync(join(PACKAGES_DIR, 'tesseract-bridge-hub'))
    };

    const complete = Object.values(layers).every(v => v);

    return {
      complete,
      layers
    };
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new OrchestrationValidator();
  const result = validator.validateOrchestration();
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.overall.valid ? 0 : 1);
}

export default OrchestrationValidator;

