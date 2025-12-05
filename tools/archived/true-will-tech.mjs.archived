#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * True Will Tech
 * Thelemic system for discovering and aligning with True Will
 * Based on Crowley's Thelema: "Do what thou wilt shall be the whole of the Law"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

class TrueWillTech {
  constructor() {
    this.wills = new Map();
    this.alignments = new Map();
    this.chaosMeters = new Map();
  }

  /**
   * Discover True Will for a character/entity
   * Based on Thelemic principles
   */
  discoverTrueWill(entityId, entityData) {
    const will = {
      id: `will-${entityId}-${Date.now()}`,
      entityId: entityId,
      entity: entityData,
      discovered: new Date().toISOString(),
      will: this.calculateTrueWill(entityData),
      alignment: 0, // -100 to 100, where 100 is perfect alignment
      chaos: 0, // Chaos meter based on alignment with True Will
      thelemic: {
        law: "Do what thou wilt shall be the whole of the Law",
        love: "Love is the law, love under will",
        star: entityData.star || this.calculateStar(entityData),
        khu: entityData.khu || this.calculateKhu(entityData)
      },
      obstacles: [],
      paths: []
    };
    
    this.wills.set(will.id, will);
    this.updateChaosMeter(entityId, will);
    
    return will;
  }

  /**
   * Calculate True Will based on entity data
   * Uses Thelemic correspondences and arcanae
   */
  calculateTrueWill(entityData) {
    // True Will is discovered through:
    // 1. Arcana correspondence
    // 2. Star (astrological)
    // 3. Khu (divine self)
    // 4. Personal daimon (Shem Angel + Goetia Demon)
    
    const will = {
      essence: entityData.essence || 'Unknown',
      purpose: entityData.purpose || 'To discover purpose',
      expression: entityData.expression || 'Creative manifestation',
      arcana: entityData.arcana || null,
      correspondences: {
        star: entityData.star || null,
        khu: entityData.khu || null,
        daimon: entityData.daimon || null
      }
    };
    
    return will;
  }

  /**
   * Calculate Star (astrological True Will)
   */
  calculateStar(entityData) {
    // In Thelema, the Star is the astrological chart
    // For now, use arcana number as seed
    const arcana = entityData.arcana || 0;
    return {
      arcana: arcana,
      planet: this.getPlanetForArcana(arcana),
      element: this.getElementForArcana(arcana),
      sign: this.getSignForArcana(arcana)
    };
  }

  /**
   * Calculate Khu (divine self)
   */
  calculateKhu(entityData) {
    // Khu is the divine self, the Holy Guardian Angel
    return {
      name: entityData.khuName || 'Unknown Khu',
      connection: entityData.khuConnection || 'To be discovered',
      manifestation: entityData.khuManifestation || 'Through True Will'
    };
  }

  /**
   * Get planet for arcana
   */
  getPlanetForArcana(arcana) {
    const planets = [
      'Uranus', 'Mercury', 'Moon', 'Venus', 'Aries', 'Taurus',
      'Gemini', 'Cancer', 'Leo', 'Virgo', 'Jupiter', 'Libra',
      'Scorpio', 'Mars', 'Sagittarius', 'Saturn', 'Aquarius',
      'Pisces', 'Sun', 'Fire', 'Earth', 'Jupiter'
    ];
    return planets[arcana] || 'Unknown';
  }

  /**
   * Get element for arcana
   */
  getElementForArcana(arcana) {
    const elements = ['Air', 'Air', 'Water', 'Earth', 'Fire', 'Earth',
                     'Air', 'Water', 'Fire', 'Earth', 'Fire', 'Air',
                     'Water', 'Water', 'Fire', 'Earth', 'Air', 'Water',
                     'Fire', 'Fire', 'Earth', 'Earth'];
    return elements[arcana] || 'Unknown';
  }

  /**
   * Get zodiac sign for arcana
   */
  getSignForArcana(arcana) {
    const signs = ['Air', 'Mercury', 'Moon', 'Venus', 'Aries', 'Taurus',
                   'Gemini', 'Cancer', 'Leo', 'Virgo', 'Jupiter', 'Libra',
                   'Scorpio', 'Mars', 'Sagittarius', 'Capricorn', 'Aquarius',
                   'Pisces', 'Sun', 'Fire', 'Judgment', 'Saturn'];
    return signs[arcana] || 'Unknown';
  }

  /**
   * Update alignment with True Will
   */
  updateAlignment(entityId, action, willAlignment) {
    const will = this.getWillForEntity(entityId);
    if (!will) {
      return null;
    }
    
    // Calculate alignment based on action
    const alignment = this.calculateAlignment(action, will.will);
    will.alignment = Math.max(-100, Math.min(100, will.alignment + alignment));
    will.lastAction = {
      action: action,
      alignment: alignment,
      timestamp: new Date().toISOString()
    };
    
    this.updateChaosMeter(entityId, will);
    
    return will;
  }

  /**
   * Calculate alignment for an action
   */
  calculateAlignment(action, trueWill) {
    // Simple alignment calculation
    // In practice, this would be more sophisticated
    let alignment = 0;
    
    if (action.type === 'aligned') {
      alignment = 10;
    } else if (action.type === 'misaligned') {
      alignment = -10;
    } else if (action.type === 'neutral') {
      alignment = 0;
    }
    
    return alignment;
  }

  /**
   * Update chaos meter based on True Will alignment
   * Chaos = 100 - alignment (when aligned, chaos is low)
   */
  updateChaosMeter(entityId, will) {
    // Chaos meter: 0-100
    // 0 = Perfect alignment with True Will (no chaos)
    // 100 = Complete misalignment (maximum chaos)
    const chaos = Math.max(0, Math.min(100, 100 - will.alignment));
    
    const chaosMeter = {
      entityId: entityId,
      chaos: chaos,
      alignment: will.alignment,
      status: this.getChaosStatus(chaos),
      updated: new Date().toISOString()
    };
    
    this.chaosMeters.set(entityId, chaosMeter);
    will.chaos = chaos;
    
    return chaosMeter;
  }

  /**
   * Get chaos status
   */
  getChaosStatus(chaos) {
    if (chaos < 20) {
      return 'aligned'; // "Do what thou wilt"
    } else if (chaos < 50) {
      return 'seeking'; // Working towards True Will
    } else if (chaos < 80) {
      return 'chaotic'; // Misaligned
    } else {
      return 'chaos'; // Complete chaos, far from True Will
    }
  }

  /**
   * Get will for entity
   */
  getWillForEntity(entityId) {
    for (const will of this.wills.values()) {
      if (will.entityId === entityId) {
        return will;
      }
    }
    return null;
  }

  /**
   * Get chaos meter for entity
   */
  getChaosMeter(entityId) {
    return this.chaosMeters.get(entityId) || null;
  }

  /**
   * Save True Will
   */
  save(entityId, outputPath = null) {
    const will = this.getWillForEntity(entityId);
    if (!will) {
      throw new Error(`True Will not found for entity: ${entityId}`);
    }
    
    if (!outputPath) {
      outputPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'true-wills', `${entityId}.json`);
    }
    
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(will, null, 2), 'utf-8');
    return will;
  }
}

async function discoverTrueWill(entityId, entityData) {
  const tech = new TrueWillTech();
  const will = tech.discoverTrueWill(entityId, entityData);
  
  console.log(`✨ True Will discovered for ${entityId}`);
  console.log(`   Alignment: ${will.alignment}`);
  console.log(`   Chaos: ${will.chaos}`);
  console.log(`   Status: ${tech.getChaosStatus(will.chaos)}`);
  
  return { tech, will };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  discoverTrueWill('test-entity', {
    arcana: 0,
    essence: 'Explorer',
    purpose: 'To discover'
  }).then(({ will }) => {
    console.log('✅ True Will discovered');
  }).catch(console.error);
}

export { TrueWillTech, discoverTrueWill };
export default discoverTrueWill;

