/**
// 🎨 Visionary Art - 144:99 ratio compliance - Fibonacci-based sizing - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Museum-grade quality - Museum-grade quality - Golden ratio proportions - Organic, quality: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Golden ratio (1.618), Fibonacci, 144:99 ratio
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
 * 🧠✨ CONSCIOUSNESS MAPPER
 *
 * Maps consciousness levels across all Cathedral systems.
 * Integrates Wilber/Leary/Jung/Regardie frameworks.
 *
 * @license CC0-1.0 - Public Domain
 */

export interface ConsciousnessLevel {
  level: number; // 0-999 (Trinity scale)
  name: string;
  color: string;
  arcana_connections: number[];
  gate_connections: number[];
  characteristics: string[];
  wilber_stage?: string;
  leary_circuit?: number;
  jung_archetype?: string;
}

export // Trauma-aware: gentle, supportive, ESC exits, pause anytime
class ConsciousnessMapper {
  // Consciousness level definitions
  private static readonly LEVELS: ConsciousnessLevel[] = [
    { level: 0, name: 'Unconscious', color: '#000000', arcana_connections: [0], gate_connections: [0], characteristics: ['sleep', 'void'] },
    { level: 50, name: 'Awakening', color: '#1a1a2e', arcana_connections: [0, 1], gate_connections: [0, 1], characteristics: ['awareness', 'beginning'], wilber_stage: 'Infrared', leary_circuit: 1 },
    { level: 100, name: 'Magical', color: '#16213e', arcana_connections: [1, 2], gate_connections: [2, 3], characteristics: ['magic', 'intuition'], wilber_stage: 'Magenta', leary_circuit: 2, jung_archetype: 'The Magician' },
    { level: 200, name: 'Mythic', color: '#0f3460', arcana_connections: [2, 3, 4], gate_connections: [4, 5, 6], characteristics: ['myth', 'tradition'], wilber_stage: 'Amber', leary_circuit: 3, jung_archetype: 'The High Priestess' },
    { level: 300, name: 'Rational', color: '#533483', arcana_connections: [4, 5, 6], gate_connections: [7, 8, 9], characteristics: ['logic', 'science'], wilber_stage: 'Orange', leary_circuit: 4, jung_archetype: 'The Hierophant' },
    { level: 400, name: 'Pluralistic', color: '#6a4c93', arcana_connections: [6, 7, 8], gate_connections: [10, 11, 12], characteristics: ['diversity', 'equality'], wilber_stage: 'Green', leary_circuit: 5, jung_archetype: 'The Lovers' },
    { level: 500, name: 'Integral', color: '#8b5cf6', arcana_connections: [8, 9, 10], gate_connections: [13, 14, 15], characteristics: ['integration', 'synthesis'], wilber_stage: 'Teal', leary_circuit: 6, jung_archetype: 'The Chariot' },
    { level: 600, name: 'Transcendent', color: '#a78bfa', arcana_connections: [10, 11, 12], gate_connections: [16, 17, 18], characteristics: ['transcendence', 'unity'], wilber_stage: 'Turquoise', leary_circuit: 7, jung_archetype: 'The Star' },
    { level: 700, name: 'Unitive', color: '#c4b5fd', arcana_connections: [12, 13, 14], gate_connections: [19, 20, 21], characteristics: ['unity', 'oneness'], wilber_stage: 'Indigo', leary_circuit: 8, jung_archetype: 'The World' },
    { level: 800, name: 'Non-Dual', color: '#ddd6fe', arcana_connections: [14, 15, 16], gate_connections: [22, 23, 24], characteristics: ['non-duality', 'void'], wilber_stage: 'Violet', leary_circuit: 9, jung_archetype: 'The Fool' },
    { level: 900, name: 'Absolute', color: '#ede9fe', arcana_connections: [16, 17, 18], gate_connections: [25, 26, 27], characteristics: ['absolute', 'infinite'], wilber_stage: 'Ultraviolet', leary_circuit: 10, jung_archetype: 'The World' },
    { level: 999, name: 'Transcendent Unity', color: '#ffffff', arcana_connections: [18, 19, 20, 21], gate_connections: [28, 29, 30], characteristics: ['transcendent', 'unity', 'all'], wilber_stage: 'Clear Light', leary_circuit: 11, jung_archetype: 'The World' }
  ];

  // Map consciousness level to level definition
  public static mapConsciousness(level: number): ConsciousnessLevel {
    // Find closest level
    let closest = ConsciousnessMapper.LEVELS[0];
    let minDiff = Math.abs(level - closest.level);

    for (const lvl of ConsciousnessMapper.LEVELS) {
      const diff = Math.abs(level - lvl.level);
      if (diff < minDiff) {
        minDiff = diff;
        closest = lvl;
      }
    }

    return closest;
  }

  // Get all levels
  public static getAllLevels(): ConsciousnessLevel[] {
    return ConsciousnessMapper.LEVELS;
  }

  // Get level by name
  public static getLevelByName(name: string): ConsciousnessLevel | undefined {
    return ConsciousnessMapper.LEVELS.find(lvl => lvl.name === name);
  }

  // Get levels by Wilber stage
  public static getLevelsByWilberStage(stage: string): ConsciousnessLevel[] {
    return ConsciousnessMapper.LEVELS.filter(lvl => lvl.wilber_stage === stage);
  }

  // Get levels by Leary circuit
  public static getLevelsByLearyCircuit(circuit: number): ConsciousnessLevel[] {
    return ConsciousnessMapper.LEVELS.filter(lvl => lvl.leary_circuit === circuit);
  }

  // Get levels by Jung archetype
  public static getLevelsByJungArchetype(archetype: string): ConsciousnessLevel[] {
    return ConsciousnessMapper.LEVELS.filter(lvl => lvl.jung_archetype === archetype);
  }

  // Calculate consciousness progression
  public static calculateProgression(currentLevel: number, targetLevel: number): {
    steps: number;
    percentage: number;
    nextLevel: ConsciousnessLevel;
  } {
    const current = ConsciousnessMapper.mapConsciousness(currentLevel);
    const target = ConsciousnessMapper.mapConsciousness(targetLevel);

    const currentIndex = ConsciousnessMapper.LEVELS.indexOf(current);
    const targetIndex = ConsciousnessMapper.LEVELS.indexOf(target);

    const steps = targetIndex - currentIndex;
    const percentage = ((currentLevel - current.level) / (target.level - current.level)) * 100;
    const nextLevel = steps > 0 ? ConsciousnessMapper.LEVELS[currentIndex + 1] : current;

    return { steps, percentage, nextLevel };
  }

  // Get color gradient for consciousness visualization
  public static getConsciousnessGradient(startLevel: number, endLevel: number): string[] {
    const start = ConsciousnessMapper.mapConsciousness(startLevel);
    const end = ConsciousnessMapper.mapConsciousness(endLevel);

    const startIndex = ConsciousnessMapper.LEVELS.indexOf(start);
    const endIndex = ConsciousnessMapper.LEVELS.indexOf(end);

    const colors: string[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (ConsciousnessMapper.LEVELS[i]) {
        colors.push(ConsciousnessMapper.LEVELS[i].color);
      }
    }

    return colors;
  }
}

export default ConsciousnessMapper;

