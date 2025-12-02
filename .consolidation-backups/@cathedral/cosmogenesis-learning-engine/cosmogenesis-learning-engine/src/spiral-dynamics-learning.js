/**
 * 🌀 SPIRAL DYNAMICS LEARNING ENGINE
 *
 * A revolutionary learning system that integrates:
 * - Clare Graves' Emergent Cyclical Levels of Existence
 * - Don Beck & Chris Cowan's Spiral Dynamics
 * - Codex 144:99 Sacred Mathematics
 * - Multi-modal creative learning (Game, Music, Art, Design, Research)
 *
 * This makes Cathedral internationally distinctive as a
 * consciousness-evolution learning platform
 *
 * @package @cathedral/cosmogenesis-learning-engine
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate spiral dynamics mechanics
 *
 * Creative use: Learning apps, education apps, spiral dynamics apps, consciousness apps
 */
/**
 * Complete Spiral Dynamics level definitions
 * Each level maps to specific Codex nodes and creative tools
 */
export const SPIRAL_LEVELS = {
    beige: {
        level: 'beige',
        color: '#D2B48C',
        name: 'Survival',
        worldview: 'The world is a natural state to survive',
        coreValues: ['Survival', 'Instinct', 'Basic needs', 'Safety'],
        learningStyle: 'Experiential, sensory, immediate',
        motivation: 'Stay alive, meet basic needs',
        fears: ['Death', 'Starvation', 'Exposure'],
        strengths: ['Awareness', 'Instinct', 'Adaptability'],
        codexNodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Fire nodes
        frequency: 174, // Foundation frequency
        element: 'Earth',
        sacredGeometry: 'point',
        arcanaCards: ['the-fool', 'the-magician'],
        creativeMode: 'sensory',
        artStyle: 'Primal marks, earth tones, cave art',
        musicStyle: 'Drums, heartbeat rhythms, nature sounds'
    },
    purple: {
        level: 'purple',
        color: '#800080',
        name: 'Tribal/Magical',
        worldview: 'The world is mysterious, controlled by spirits',
        coreValues: ['Tradition', 'Ritual', 'Ancestors', 'Magic', 'Belonging'],
        learningStyle: 'Stories, rituals, oral tradition, ceremony',
        motivation: 'Keep the tribe safe, honor ancestors',
        fears: ['Curses', 'Abandonment', 'Displeasing spirits'],
        strengths: ['Community', 'Ritual', 'Intuition', 'Connection'],
        codexNodes: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // Water nodes
        frequency: 285, // Healing frequency
        element: 'Water',
        sacredGeometry: 'vesica-piscis',
        arcanaCards: ['the-high-priestess', 'the-empress', 'the-moon'],
        creativeMode: 'ritual',
        artStyle: 'Tribal patterns, totems, symbolic imagery',
        musicStyle: 'Chanting, ceremonial drums, call-response'
    },
    red: {
        level: 'red',
        color: '#FF0000',
        name: 'Power/Egocentric',
        worldview: 'The world is a jungle where the strong survive',
        coreValues: ['Power', 'Action', 'Dominance', 'Respect', 'Courage'],
        learningStyle: 'Competition, conquest, immediate rewards',
        motivation: 'Express self, gain power, be respected',
        fears: ['Shame', 'Weakness', 'Being controlled'],
        strengths: ['Courage', 'Action', 'Independence', 'Creativity'],
        codexNodes: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], // Fire nodes
        frequency: 396, // Liberation frequency
        element: 'Fire',
        sacredGeometry: 'triangle',
        arcanaCards: ['the-emperor', 'strength', 'the-chariot', 'the-tower'],
        creativeMode: 'conquest',
        artStyle: 'Bold colors, sharp angles, power imagery',
        musicStyle: 'Heavy beats, aggressive rhythms, anthems'
    },
    blue: {
        level: 'blue',
        color: '#0000FF',
        name: 'Order/Absolutistic',
        worldview: 'The world is controlled by a Higher Power with rules',
        coreValues: ['Order', 'Discipline', 'Truth', 'Purpose', 'Sacrifice'],
        learningStyle: 'Structure, rules, authority, scripture',
        motivation: 'Find meaning, follow the path, achieve salvation',
        fears: ['Chaos', 'Punishment', 'Loss of purpose'],
        strengths: ['Discipline', 'Loyalty', 'Purpose', 'Persistence'],
        codexNodes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], // Air nodes
        frequency: 417, // Transformation frequency
        element: 'Air',
        sacredGeometry: 'square',
        arcanaCards: ['the-hierophant', 'justice', 'judgement'],
        creativeMode: 'devotional',
        artStyle: 'Sacred art, religious iconography, symmetry',
        musicStyle: 'Hymns, sacred music, structured compositions'
    },
    orange: {
        level: 'orange',
        color: '#FFA500',
        name: 'Achievement/Strategic',
        worldview: 'The world is full of opportunities to achieve',
        coreValues: ['Success', 'Progress', 'Innovation', 'Competition', 'Results'],
        learningStyle: 'Goals, metrics, experimentation, optimization',
        motivation: 'Win, succeed, improve, prosper',
        fears: ['Failure', 'Mediocrity', 'Being behind'],
        strengths: ['Innovation', 'Strategy', 'Excellence', 'Entrepreneurship'],
        codexNodes: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], // Spirit nodes
        frequency: 528, // Love/DNA frequency
        element: 'Fire',
        sacredGeometry: 'pentagon',
        arcanaCards: ['the-magician', 'wheel-of-fortune', 'the-sun'],
        creativeMode: 'innovation',
        artStyle: 'Modern design, tech aesthetic, sleek minimalism',
        musicStyle: 'Electronic, progressive, dynamic'
    },
    green: {
        level: 'green',
        color: '#00FF00',
        name: 'Community/Relativistic',
        worldview: 'The world is a community where we must care for all',
        coreValues: ['Equality', 'Community', 'Consensus', 'Harmony', 'Feelings'],
        learningStyle: 'Dialogue, sharing, collaboration, exploration',
        motivation: 'Connect, belong, create harmony, heal',
        fears: ['Exclusion', 'Conflict', 'Hierarchy'],
        strengths: ['Empathy', 'Collaboration', 'Inclusion', 'Healing'],
        codexNodes: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72], // Water nodes
        frequency: 639, // Connection frequency
        element: 'Water',
        sacredGeometry: 'hexagon',
        arcanaCards: ['the-lovers', 'the-star', 'temperance'],
        creativeMode: 'collaborative',
        artStyle: 'Organic forms, nature-inspired, community murals',
        musicStyle: 'World music, ambient, healing sounds'
    },
    yellow: {
        level: 'yellow',
        color: '#FFFF00',
        name: 'Integrative/Systemic',
        worldview: 'The world is a complex adaptive system',
        coreValues: ['Integration', 'Flexibility', 'Knowledge', 'Competence', 'Flow'],
        learningStyle: 'Systems thinking, self-directed, multi-perspective',
        motivation: 'Understand, integrate, optimize, flow',
        fears: ['Stagnation', 'Oversimplification', 'Dogma'],
        strengths: ['Systems thinking', 'Flexibility', 'Autonomy', 'Integration'],
        codexNodes: [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96], // Double layer
        frequency: 741, // Intuition frequency
        element: 'Air',
        sacredGeometry: 'flower-of-life',
        arcanaCards: ['the-hermit', 'the-hanged-man', 'the-world'],
        creativeMode: 'systemic',
        artStyle: 'Fractals, systems maps, data visualization',
        musicStyle: 'Complex compositions, polyrhythms, adaptive music'
    },
    turquoise: {
        level: 'turquoise',
        color: '#40E0D0',
        name: 'Holistic/Global',
        worldview: 'The world is one living system',
        coreValues: ['Holism', 'Spirituality', 'Collective consciousness', 'Global'],
        learningStyle: 'Intuitive, holistic, collective, experiential',
        motivation: 'Serve the whole, awaken consciousness, heal the planet',
        fears: ['Disconnection', 'Fragmentation', 'Unconsciousness'],
        strengths: ['Holistic vision', 'Intuition', 'Compassion', 'Integration'],
        codexNodes: [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120], // Double layer
        frequency: 852, // Spiritual frequency
        element: 'Spirit',
        sacredGeometry: 'metatron',
        arcanaCards: ['the-fool', 'the-world', 'the-universe'],
        creativeMode: 'holistic',
        artStyle: 'Sacred geometry, cosmic imagery, unified fields',
        musicStyle: 'Ambient soundscapes, binaural, harmonic resonance'
    },
    coral: {
        level: 'coral',
        color: '#FF7F50',
        name: 'Transcendent/Emerging',
        worldview: 'Reality is beyond comprehension, ever-emerging',
        coreValues: ['Transcendence', 'Evolution', 'Mystery', 'Emergence'],
        learningStyle: 'Direct knowing, emergence, beyond methods',
        motivation: 'Participate in cosmic evolution',
        fears: ['None - embraces all'],
        strengths: ['Transcendence', 'Presence', 'Flow', 'Mystery'],
        codexNodes: [121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144], // Crown layer
        frequency: 963, // Awakening frequency
        element: 'Spirit',
        sacredGeometry: 'sri-yantra',
        arcanaCards: ['the-fool', 'the-world'], // Alpha and Omega
        creativeMode: 'transcendent',
        artStyle: 'Beyond categories, pure expression, light itself',
        musicStyle: 'Silence, pure tones, cosmic harmonics'
    }
};
// ============================================
// SPIRAL DYNAMICS LEARNING ENGINE
// ============================================
/**
 * The Spiral Dynamics Learning Engine
 *
 * A revolutionary learning system that adapts to the learner's
 * developmental level and provides appropriate challenges
 */
export class SpiralDynamicsLearningEngine {
    learnerProfile = null;
    modules = new Map();
    listeners = new Map();
    constructor() {
        this.initializeModules();
    }
    /**
     * Initialize learning modules for all spiral levels
     */
    initializeModules() {
        // Generate modules for each spiral level
        Object.values(SPIRAL_LEVELS).forEach(level => {
            this.generateModulesForLevel(level);
        });
    }
    /**
     * Generate learning modules for a spiral level
     */
    generateModulesForLevel(level) {
        const moduleTypes = ['game', 'music', 'art', 'design', 'research', 'practice', 'integration'];
        moduleTypes.forEach((type, index) => {
            const module = {
                id: `${level.level}-${type}-${index}`,
                name: `${level.name}: ${this.capitalize(type)} Module`,
                spiralLevel: level.level,
                type,
                duration: 30 + (index * 10),
                difficulty: Math.min(5, Math.floor(index / 2) + 1),
                prerequisites: index > 0 ? [`${level.level}-${moduleTypes[index - 1]}-${index - 1}`] : [],
                objectives: this.generateObjectives(level, type),
                content: this.generateContent(level, type),
                assessment: this.generateAssessment(level, type),
                codexNodes: level.codexNodes.slice(0, 3),
                arcanaCards: level.arcanaCards.slice(0, 2)
            };
            this.modules.set(module.id, module);
        });
    }
    /**
     * Generate learning objectives for a module
     */
    generateObjectives(level, type) {
        const baseObjectives = {
            game: [
                `Experience ${level.worldview} through gameplay`,
                `Develop ${level.strengths[0]} through interactive challenges`,
                `Integrate ${level.coreValues[0]} into decision-making`
            ],
            music: [
                `Understand ${level.musicStyle} and its connection to ${level.name}`,
                `Create music at ${level.frequency}Hz frequency`,
                `Express ${level.coreValues[0]} through sound`
            ],
            art: [
                `Explore ${level.artStyle}`,
                `Create visual art expressing ${level.worldview}`,
                `Use ${level.sacredGeometry} in compositions`
            ],
            design: [
                `Apply ${level.name} principles to design`,
                `Create interfaces for ${level.learningStyle} learners`,
                `Design with ${level.element} element qualities`
            ],
            research: [
                `Study the ${level.name} stage of development`,
                `Connect ${level.level} to Codex 144:99 nodes`,
                `Research ${level.coreValues.join(', ')}`
            ],
            practice: [
                `Embody ${level.coreValues[0]} in daily practice`,
                `Develop ${level.strengths[1]} through repetition`,
                `Transform ${level.fears[0]} into strength`
            ],
            integration: [
                `Integrate ${level.name} with previous levels`,
                `Recognize ${level.level} in self and others`,
                `Prepare for emergence to next level`
            ]
        };
        return baseObjectives[type];
    }
    /**
     * Generate content for a module
     */
    generateContent(level, type) {
        return {
            introduction: `Welcome to the ${level.name} module. In this ${type} experience, you'll explore the worldview: "${level.worldview}" through ${level.creativeMode} creative expression.`,
            theory: [
                {
                    title: `Understanding ${level.name}`,
                    content: `The ${level.level} level represents the worldview that ${level.worldview}. Core values include ${level.coreValues.join(', ')}.`,
                    mediaType: 'text',
                    duration: 5
                },
                {
                    title: `${level.name} Learning Style`,
                    content: `At this level, learning happens through ${level.learningStyle}. The motivation is to ${level.motivation}.`,
                    mediaType: 'text',
                    duration: 5
                }
            ],
            practice: [
                {
                    id: `${level.level}-${type}-practice-1`,
                    type: type === 'game' ? 'game' : type === 'music' || type === 'art' ? 'create' : 'explore',
                    description: `Engage with ${level.name} through ${type} activities`,
                    duration: 15,
                    tools: [level.creativeMode, level.element],
                    spiralLevel: level.level
                }
            ],
            reflection: [
                {
                    question: `How does ${level.worldview} resonate with your experience?`,
                    spiralLevel: level.level,
                    journalEntry: true
                },
                {
                    question: `Where do you see ${level.coreValues[0]} in your life?`,
                    spiralLevel: level.level,
                    journalEntry: true
                }
            ],
            resources: [
                {
                    title: `${level.name} Deep Dive`,
                    type: 'article',
                    spiralLevel: level.level
                }
            ]
        };
    }
    /**
     * Generate assessment for a module
     */
    generateAssessment(level, type) {
        return {
            type: type === 'integration' ? 'reflection' : type === 'art' || type === 'music' ? 'project' : 'self-assessment',
            criteria: [
                {
                    name: 'Understanding',
                    description: `Demonstrates understanding of ${level.name} worldview`,
                    weight: 30,
                    spiralAlignment: [level.level]
                },
                {
                    name: 'Application',
                    description: `Applies ${level.coreValues[0]} in practice`,
                    weight: 40,
                    spiralAlignment: [level.level]
                },
                {
                    name: 'Integration',
                    description: `Integrates learning with previous levels`,
                    weight: 30,
                    spiralAlignment: [level.level]
                }
            ],
            passingScore: 70
        };
    }
    /**
     * Capitalize first letter
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    // ============================================
    // PUBLIC API
    // ============================================
    /**
     * Create a new learner profile
     */
    createLearnerProfile(name) {
        const profile = {
            id: `learner-${Date.now()}`,
            name,
            currentLevels: {
                beige: 100, // Everyone starts with survival
                purple: 50, // Some tribal/magical
                red: 30, // Some power
                blue: 20, // Some order
                orange: 10, // Some achievement
                green: 5, // Little community
                yellow: 0, // No integration yet
                turquoise: 0, // No holistic yet
                coral: 0 // No transcendent yet
            },
            dominantLevel: 'purple',
            emergingLevel: 'red',
            learningPaths: [],
            completedModules: [],
            totalLearningTime: 0,
            creativeOutputs: [],
            spiralJourney: []
        };
        this.learnerProfile = profile;
        return profile;
    }
    /**
     * Assess learner's spiral level
     */
    assessSpiralLevel(responses) {
        // Calculate level scores based on responses
        const levels = {
            beige: 0, purple: 0, red: 0, blue: 0,
            orange: 0, green: 0, yellow: 0, turquoise: 0, coral: 0
        };
        // Simple scoring algorithm (would be more sophisticated in production)
        Object.entries(responses).forEach(([question, value]) => {
            const levelMatch = question.match(/^(beige|purple|red|blue|orange|green|yellow|turquoise|coral)/);
            if (levelMatch) {
                const level = levelMatch[1];
                levels[level] += value;
            }
        });
        // Normalize scores
        const maxScore = Math.max(...Object.values(levels));
        if (maxScore > 0) {
            Object.keys(levels).forEach(level => {
                levels[level] = Math.round((levels[level] / maxScore) * 100);
            });
        }
        // Find dominant and emerging levels
        const sortedLevels = Object.entries(levels)
            .sort(([, a], [, b]) => b - a);
        return {
            dominant: sortedLevels[0][0],
            emerging: sortedLevels[1][0],
            levels
        };
    }
    /**
     * Generate a personalized learning path
     */
    generateLearningPath(profile, targetLevel) {
        const currentLevel = profile.dominantLevel;
        const levelOrder = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise', 'coral'];
        const currentIndex = levelOrder.indexOf(currentLevel);
        const targetIndex = levelOrder.indexOf(targetLevel);
        // Get all levels between current and target
        const pathLevels = levelOrder.slice(Math.min(currentIndex, targetIndex), Math.max(currentIndex, targetIndex) + 1);
        // Collect modules for each level
        const pathModules = [];
        pathLevels.forEach(level => {
            const levelModules = Array.from(this.modules.values())
                .filter(m => m.spiralLevel === level);
            pathModules.push(...levelModules);
        });
        const path = {
            id: `path-${profile.id}-${targetLevel}-${Date.now()}`,
            name: `${currentLevel} → ${targetLevel} Journey`,
            description: `A transformational journey from ${SPIRAL_LEVELS[currentLevel].name} to ${SPIRAL_LEVELS[targetLevel].name}`,
            currentLevel,
            targetLevel,
            progress: 0,
            modules: pathModules,
            completedModules: [],
            activeModule: pathModules[0]?.id || null
        };
        return path;
    }
    /**
     * Get recommended module based on current state
     */
    getRecommendedModule(profile) {
        const currentLevel = profile.dominantLevel;
        const emergingLevel = profile.emergingLevel;
        // Find modules at current or emerging level not yet completed
        const availableModules = Array.from(this.modules.values())
            .filter(m => (m.spiralLevel === currentLevel || m.spiralLevel === emergingLevel) &&
            !profile.completedModules.includes(m.id))
            .sort((a, b) => a.difficulty - b.difficulty);
        return availableModules[0] || null;
    }
    /**
     * Complete a module
     */
    completeModule(profile, moduleId, score) {
        if (!profile.completedModules.includes(moduleId)) {
            profile.completedModules.push(moduleId);
            const module = this.modules.get(moduleId);
            if (module) {
                profile.totalLearningTime += module.duration;
                // Update level development
                const currentScore = profile.currentLevels[module.spiralLevel];
                profile.currentLevels[module.spiralLevel] = Math.min(100, currentScore + (score / 10));
                // Check for level emergence
                this.checkLevelEmergence(profile);
            }
        }
    }
    /**
     * Check if learner is emerging to a new level
     */
    checkLevelEmergence(profile) {
        const levelOrder = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise', 'coral'];
        const currentIndex = levelOrder.indexOf(profile.dominantLevel);
        const nextLevel = levelOrder[currentIndex + 1];
        if (nextLevel && profile.currentLevels[nextLevel] >= 50) {
            // Record the journey
            profile.spiralJourney.push({
                timestamp: new Date(),
                fromLevel: profile.dominantLevel,
                toLevel: nextLevel,
                trigger: 'Module completion threshold reached',
                insight: `Emerging from ${SPIRAL_LEVELS[profile.dominantLevel].name} to ${SPIRAL_LEVELS[nextLevel].name}`,
                integration: `Integrating ${SPIRAL_LEVELS[profile.dominantLevel].coreValues[0]} with ${SPIRAL_LEVELS[nextLevel].coreValues[0]}`
            });
            // Update levels
            profile.emergingLevel = profile.dominantLevel;
            profile.dominantLevel = nextLevel;
            // Emit event
            this.emit('level-emergence', { profile, newLevel: nextLevel });
        }
    }
    /**
     * Get spiral level info
     */
    getSpiralLevel(level) {
        return SPIRAL_LEVELS[level];
    }
    /**
     * Get all spiral levels
     */
    getAllSpiralLevels() {
        return Object.values(SPIRAL_LEVELS);
    }
    /**
     * Get modules for a level
     */
    getModulesForLevel(level) {
        return Array.from(this.modules.values())
            .filter(m => m.spiralLevel === level);
    }
    /**
     * Get Codex nodes for a spiral level
     */
    getCodexNodesForLevel(level) {
        return SPIRAL_LEVELS[level].codexNodes;
    }
    /**
     * Get creative mode for a spiral level
     */
    getCreativeModeForLevel(level) {
        return SPIRAL_LEVELS[level].creativeMode;
    }
    /**
     * Subscribe to events
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
        return () => {
            this.listeners.get(event)?.delete(callback);
        };
    }
    /**
     * Emit an event
     */
    emit(event, data) {
        this.listeners.get(event)?.forEach(callback => {
            try {
                callback(data);
            }
            catch (error) {
                console.error('Error in event listener:', error);
            }
        });
    }
}
// ============================================
// SINGLETON INSTANCE
// ============================================
export const spiralDynamicsEngine = new SpiralDynamicsLearningEngine();
export default SpiralDynamicsLearningEngine;
//# sourceMappingURL=spiral-dynamics-learning.js.map