/**
 * ⚗️ Cathedral of Circuits - Marbles & Medallions System
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Visual/physical representation of boons as collectible marbles and medallions
 * - God/Goddess Boons → Medallions (larger, ornate)
 * - Wisdom Boons → Marbles (smaller, sacred geometry patterns)
 * 
 * @license CC0-1.0 - Public Domain
 */

import { SACRED_MATH } from '@cathedral/sacred-mathematics-core';

/**
 * Marble Types - Wisdom Boons
 */
export const MARBLE_TYPES = {
  WISDOM: {
    id: 'wisdom',
    name: 'Wisdom Marble',
    color: '#7A33FF', // Violet core
    pattern: 'sacred_geometry',
    rarity: 'common',
    value: 1
  },
  KNOWLEDGE: {
    id: 'knowledge',
    name: 'Knowledge Marble',
    color: '#B39CFF', // Violet flare
    pattern: 'fibonacci_spiral',
    rarity: 'uncommon',
    value: 2
  },
  INSIGHT: {
    id: 'insight',
    name: 'Insight Marble',
    color: '#C8A44D', // Gold leaf
    pattern: 'golden_ratio',
    rarity: 'rare',
    value: 5
  },
  UNDERSTANDING: {
    id: 'understanding',
    name: 'Understanding Marble',
    color: '#00CED1', // Teal glow
    pattern: 'vesica_piscis',
    rarity: 'epic',
    value: 10
  },
  ENLIGHTENMENT: {
    id: 'enlightenment',
    name: 'Enlightenment Marble',
    color: '#FF6A00', // Ember core
    pattern: 'flower_of_life',
    rarity: 'legendary',
    value: 25
  }
};

/**
 * Medallion Types - God/Goddess Boons
 */
export const MEDALLION_TYPES = {
  DIVINE_BLESSING: {
    id: 'divine_blessing',
    name: 'Divine Blessing Medallion',
    material: 'gold',
    symbol: '☉', // Sun
    rarity: 'rare',
    value: 50,
    god: 'universal'
  },
  GODDESS_GRACE: {
    id: 'goddess_grace',
    name: 'Goddess Grace Medallion',
    material: 'silver',
    symbol: '☽', // Moon
    rarity: 'rare',
    value: 50,
    goddess: 'universal'
  },
  ARCANE_POWER: {
    id: 'arcane_power',
    name: 'Arcane Power Medallion',
    material: 'platinum',
    symbol: '⚡', // Lightning
    rarity: 'epic',
    value: 100,
    source: 'arcana'
  },
  SACRED_PROTECTION: {
    id: 'sacred_protection',
    name: 'Sacred Protection Medallion',
    material: 'bronze',
    symbol: '🛡️', // Shield
    rarity: 'epic',
    value: 100,
    source: 'sacred'
  },
  MAGNUM_OPUS: {
    id: 'magnum_opus',
    name: 'Magnum Opus Medallion',
    material: 'orichalcum',
    symbol: '⚗️', // Alchemy
    rarity: 'legendary',
    value: 500,
    source: 'alchemical'
  }
};

/**
 * Marbles & Medallions System
 */
export class MarblesAndMedallionsSystem {
  constructor() {
    this.marbles = new Map(); // wisdom boons
    this.medallions = new Map(); // god/goddess boons
    this.collection = {
      marbles: [],
      medallions: [],
      totalValue: 0
    };
    
    this.initializeMarbleTypes();
    this.initializeMedallionTypes();
  }

  /**
   * Initialize marble types
   */
  initializeMarbleTypes() {
    Object.values(MARBLE_TYPES).forEach(marble => {
      this.marbles.set(marble.id, {
        ...marble,
        count: 0,
        collected: []
      });
    });
  }

  /**
   * Initialize medallion types
   */
  initializeMedallionTypes() {
    Object.values(MEDALLION_TYPES).forEach(medallion => {
      this.medallions.set(medallion.id, {
        ...medallion,
        count: 0,
        collected: []
      });
    });
  }

  /**
   * Award a wisdom boon as a marble
   */
  awardWisdomBoon(type, source, metadata = {}) {
    const marbleType = this.marbles.get(type);
    if (!marbleType) {
      throw new Error(`Unknown marble type: ${type}`);
    }

    const marble = {
      id: `marble-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: marbleType.id,
      name: marbleType.name,
      color: marbleType.color,
      pattern: marbleType.pattern,
      rarity: marbleType.rarity,
      value: marbleType.value,
      source: source,
      collectedAt: new Date().toISOString(),
      metadata: metadata,
      geometry: this.generateMarbleGeometry(marbleType)
    };

    marbleType.count++;
    marbleType.collected.push(marble);
    this.collection.marbles.push(marble);
    this.collection.totalValue += marble.value;

    return marble;
  }

  /**
   * Award a god/goddess boon as a medallion
   */
  awardDivineBoon(type, deity, metadata = {}) {
    const medallionType = this.medallions.get(type);
    if (!medallionType) {
      throw new Error(`Unknown medallion type: ${type}`);
    }

    const medallion = {
      id: `medallion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: medallionType.id,
      name: medallionType.name,
      material: medallionType.material,
      symbol: medallionType.symbol,
      rarity: medallionType.rarity,
      value: medallionType.value,
      deity: deity,
      source: medallionType.source,
      collectedAt: new Date().toISOString(),
      metadata: metadata,
      design: this.generateMedallionDesign(medallionType, deity)
    };

    medallionType.count++;
    medallionType.collected.push(medallion);
    this.collection.medallions.push(medallion);
    this.collection.totalValue += medallion.value;

    return medallion;
  }

  /**
   * Generate marble geometry using sacred mathematics
   */
  generateMarbleGeometry(marbleType) {
    const patterns = {
      'sacred_geometry': {
        shape: 'sphere',
        pattern: 'flower_of_life',
        complexity: 6,
        goldenRatio: SACRED_MATH.PHI
      },
      'fibonacci_spiral': {
        shape: 'sphere',
        pattern: 'fibonacci',
        complexity: 8,
        fibonacci: SACRED_MATH.FIBONACCI.slice(0, 8)
      },
      'golden_ratio': {
        shape: 'sphere',
        pattern: 'golden_spiral',
        complexity: 5,
        ratio: SACRED_MATH.PHI
      },
      'vesica_piscis': {
        shape: 'sphere',
        pattern: 'vesica',
        complexity: 4,
        sacredRatio: 1.618
      },
      'flower_of_life': {
        shape: 'sphere',
        pattern: 'flower',
        complexity: 7,
        circles: 19
      }
    };

    return patterns[marbleType.pattern] || patterns['sacred_geometry'];
  }

  /**
   * Generate medallion design
   */
  generateMedallionDesign(medallionType, deity) {
    return {
      material: medallionType.material,
      symbol: medallionType.symbol,
      border: 'sacred_geometry',
      center: deity?.symbol || medallionType.symbol,
      inscription: deity?.name || 'Divine',
      geometry: {
        outerRadius: 50,
        innerRadius: 30,
        segments: 72, // Sacred number
        pattern: 'golden_ratio'
      }
    };
  }

  /**
   * Get collection summary
   */
  getCollectionSummary() {
    return {
      marbles: {
        total: this.collection.marbles.length,
        byType: Object.fromEntries(
          Array.from(this.marbles.entries()).map(([id, data]) => [id, data.count])
        ),
        totalValue: this.collection.marbles.reduce((sum, m) => sum + m.value, 0)
      },
      medallions: {
        total: this.collection.medallions.length,
        byType: Object.fromEntries(
          Array.from(this.medallions.entries()).map(([id, data]) => [id, data.count])
        ),
        totalValue: this.collection.medallions.reduce((sum, m) => sum + m.value, 0)
      },
      totalValue: this.collection.totalValue,
      rarityBreakdown: this.getRarityBreakdown()
    };
  }

  /**
   * Get rarity breakdown
   */
  getRarityBreakdown() {
    const breakdown = {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0
    };

    this.collection.marbles.forEach(marble => {
      breakdown[marble.rarity]++;
    });

    this.collection.medallions.forEach(medallion => {
      breakdown[medallion.rarity]++;
    });

    return breakdown;
  }

  /**
   * Render marble (for game display)
   */
  renderMarble(marble, canvas, x, y, size = 20) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw marble sphere with pattern
    const gradient = ctx.createRadialGradient(x, y - size * 0.3, 0, x, y, size);
    gradient.addColorStop(0, marble.color);
    gradient.addColorStop(1, this.darkenColor(marble.color, 0.5));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Draw pattern overlay
    this.drawMarblePattern(ctx, marble, x, y, size);
  }

  /**
   * Render medallion (for game display)
   */
  renderMedallion(medallion, canvas, x, y, size = 40) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw medallion circle
    const gradient = ctx.createRadialGradient(x, y - size * 0.2, 0, x, y, size);
    const materialColor = this.getMaterialColor(medallion.material);
    gradient.addColorStop(0, this.lightenColor(materialColor, 0.3));
    gradient.addColorStop(1, materialColor);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Draw border pattern
    ctx.strokeStyle = this.lightenColor(materialColor, 0.5);
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw symbol
    ctx.font = `${size * 0.6}px Arial`;
    ctx.fillStyle = materialColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(medallion.symbol, x, y);
  }

  /**
   * Draw marble pattern
   */
  drawMarblePattern(ctx, marble, x, y, size) {
    const pattern = marble.geometry.pattern;
    
    switch (pattern) {
      case 'flower_of_life':
        this.drawFlowerOfLife(ctx, x, y, size * 0.6);
        break;
      case 'fibonacci':
        this.drawFibonacciSpiral(ctx, x, y, size * 0.5);
        break;
      case 'golden_spiral':
        this.drawGoldenSpiral(ctx, x, y, size * 0.5);
        break;
      case 'vesica':
        this.drawVesicaPiscis(ctx, x, y, size * 0.6);
        break;
      default:
        this.drawSacredGeometry(ctx, x, y, size * 0.5);
    }
  }

  /**
   * Helper: Draw flower of life pattern
   */
  drawFlowerOfLife(ctx, x, y, radius) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw central circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw surrounding circles (simplified)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const cx = x + Math.cos(angle) * radius;
      const cy = y + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  /**
   * Helper: Draw Fibonacci spiral
   */
  drawFibonacciSpiral(ctx, x, y, maxRadius) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    
    const fib = SACRED_MATH.FIBONACCI.slice(0, 5);
    let angle = 0;
    
    fib.forEach((radius, i) => {
      const r = (radius / fib[fib.length - 1]) * maxRadius;
      const cx = x + Math.cos(angle) * r;
      const cy = y + Math.sin(angle) * r;
      
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
      
      angle += Math.PI / 2;
    });
    
    ctx.stroke();
  }

  /**
   * Helper: Draw golden spiral
   */
  drawGoldenSpiral(ctx, x, y, maxRadius) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    
    const phi = SACRED_MATH.PHI;
    for (let i = 0; i < 100; i++) {
      const angle = i * 0.1;
      const radius = Math.pow(phi, angle / Math.PI) * (maxRadius / 10);
      const cx = x + Math.cos(angle) * radius;
      const cy = y + Math.sin(angle) * radius;
      
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    
    ctx.stroke();
  }

  /**
   * Helper: Draw vesica piscis
   */
  drawVesicaPiscis(ctx, x, y, radius) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    
    // Draw two overlapping circles
    ctx.beginPath();
    ctx.arc(x - radius * 0.5, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x + radius * 0.5, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  /**
   * Helper: Draw sacred geometry
   */
  drawSacredGeometry(ctx, x, y, radius) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw hexagon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }

  /**
   * Helper: Get material color
   */
  getMaterialColor(material) {
    const colors = {
      'gold': '#C8A44D',
      'silver': '#C0C0C0',
      'platinum': '#E5E4E2',
      'bronze': '#CD7F32',
      'orichalcum': '#FFD700'
    };
    return colors[material] || '#C8A44D';
  }

  /**
   * Helper: Darken color
   */
  darkenColor(color, amount) {
    // Simplified - would use proper color manipulation
    return color;
  }

  /**
   * Helper: Lighten color
   */
  lightenColor(color, amount) {
    // Simplified - would use proper color manipulation
    return color;
  }
}

export default MarblesAndMedallionsSystem;




