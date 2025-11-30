/**
 * Liber Arcanae Codex Abyssiae - Complete Ornate System
 *
 * @package @cathedral/liber-arcanae
 *
 * THE LIVING GRIMOIRE
 * Written by Moonchild (The Hierophant)
 * Gatekeeper: Rebecca Respawn (The Fool)
 *
 * Complete integration:
 * - 22 Master Arcanae with ornate chariots matching archetypes
 * - Each mirrors Codex 144:99 nodes
 * - 99 Gates with fractal sound art mechanics
 * - Personal daimons (72 Shem Angels + 72 Goetia Demons)
 * - Will-driven RPG mechanics
 * - Pathworking system
 * - Fully usable tarot spreads
 * - Living grimoire (Hocus Pocus style)
 *
 * Deep integration: Ken Wilber, Tim Leary, Carl Jung, Israel Regardie
 */
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/**
 * Generate fractal sound frequencies using sacred mathematics
 */
export function generateFractalFrequencies(baseFreq, depth, pattern) {
    const frequencies = [baseFreq];
    for (let i = 1; i <= depth; i++) {
        let nextFreq;
        switch (pattern) {
            case 'golden_ratio':
                nextFreq = baseFreq * Math.pow(1.6180339887, i);
                break;
            case 'fibonacci':
                const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
                nextFreq = baseFreq * (fib[i % fib.length] || 1);
                break;
            case 'vesica_piscis':
                nextFreq = baseFreq * Math.pow(Math.sqrt(3), i);
                break;
            case 'flower_of_life':
                nextFreq = baseFreq * Math.pow(2, i) * Math.PI;
                break;
            default:
                nextFreq = baseFreq * (1 + i * 0.618);
        }
        frequencies.push(nextFreq);
    }
    return frequencies;
}
/**
 * Calculate gate number from Codex node
 */
export function getGateFromCodexNode(nodeId) {
    // Primary gate (1-33)
    const primaryGate = ((nodeId - 1) % 33) + 1;
    // Harmonic gate (34-66)
    const harmonicGate = 33 + ((nodeId - 1) % 33) + 1;
    // Spiral gate (67-99)
    const layer = Math.ceil(nodeId / 12);
    const spiralGate = 66 + ((layer - 1) % 33) + 1;
    // Return primary gate (can be extended to return all three)
    return primaryGate;
}
/**
 * Get daimon pair for an Arcana
 */
export function getDaimonPairForArcana(arcanaNumber) {
    // Map Arcana 0-21 to Shem Angels 1-72 and Goetia Demons 1-72
    const shemNumber = ((arcanaNumber * 3) % 72) + 1;
    const goetiaNumber = ((arcanaNumber * 3 + 1) % 72) + 1;
    // This would fetch from actual Shem Angel and Goetia Demon data
    // For now, return structure
    return {
        shemAngel: {
            number: shemNumber,
            name: `Shem Angel ${shemNumber}`,
            meaning: 'Divine guidance',
            planet: 'Mercury',
            correspondences: {},
            personality: 'Wise and guiding',
            guidance: 'Follow your highest path',
            abilities: ['Guidance', 'Protection', 'Wisdom']
        },
        goetiaDemon: {
            number: goetiaNumber,
            name: `Goetia Demon ${goetiaNumber}`,
            rank: 'Duke',
            description: 'Shadow wisdom',
            correspondences: {},
            personality: 'Challenging and transformative',
            shadowWisdom: 'Face your shadows',
            abilities: ['Transformation', 'Power', 'Shadow Work']
        },
        fusion: {
            name: `Daimon ${arcanaNumber}`,
            nature: 'Balanced divine and shadow',
            wisdom: 'Integrated wisdom',
            power: 'Complete power',
            balance: 'Perfect balance'
        }
    };
}
/**
 * Create chariot for an Arcana based on archetype
 */
export function createChariotForArcana(arcana) {
    // Chariot form matches archetype
    const chariotForms = {
        'the-fool': 'elemental',
        'the-magician': 'geometric',
        'the-high-priestess': 'astral',
        'the-empress': 'creature',
        'the-emperor': 'construct',
        'the-hierophant': 'composite',
        'the-lovers': 'composite',
        'the-chariot': 'vehicle',
        'strength': 'creature',
        'the-hermit': 'astral',
        'wheel-of-fortune': 'geometric',
        'justice': 'construct',
        'the-hanged-man': 'astral',
        'death': 'elemental',
        'temperance': 'composite',
        'the-devil': 'creature',
        'the-tower': 'construct',
        'the-star': 'astral',
        'the-moon': 'astral',
        'the-sun': 'elemental',
        'judgement': 'construct',
        'the-world': 'composite'
    };
    return {
        id: `chariot-${arcana.id}`,
        name: `${arcana.name}'s Chariot`,
        archetype: arcana.name,
        form: chariotForms[arcana.id] || 'composite',
        description: `The ornate chariot of ${arcana.name}, matching their archetypal nature.`,
        appearance: {
            primaryForm: 'Sacred geometry form',
            secondaryForms: [],
            colors: [arcana.correspondences.color],
            materials: ['Etheric', 'Sacred'],
            symbols: [arcana.correspondences.geometry],
            sacredGeometry: [arcana.correspondences.geometry],
            size: 'medium',
            movement: 'Ethereal flow',
            presence: 'Powerful and guiding'
        },
        mechanics: {
            speed: 50,
            maneuverability: 50,
            defense: 50,
            specialAbilities: [],
            transformations: [],
            interactions: []
        },
        sound: {
            voice: 'Harmonic resonance',
            frequencies: [arcana.correspondences.solfeggio || 528],
            harmonics: [],
            movementSound: 'Ethereal whoosh',
            presenceSound: 'Sacred hum'
        },
        correspondences: arcana.correspondences
    };
}
//# sourceMappingURL=liber-arcanae-codex-abyssiae-complete.js.map