/**
 * 🃏📖 CIRCUITUM99 ARCANAE RPG STORIES
 * Interactive Story System for Each of the 22 Major Arcana
 *
 * Each arcana has its own unique story with branching choices, character development,
 * and connections to real esoteric knowledge, art, and science
 */

// 🎭 ARCANAE STORY ENGINE
class ArcanaeRPGStories {
    constructor() {
        this.stories = this.initializeArcanaeStories();
        this.playerProgress = new Map();
        this.storyStates = new Map();
        this.choiceConsequences = new Map();
    }

    // Initialize all 22 arcanae stories
    initializeArcanaeStories() {
        return {
            // 🌀 THE FOOL - Rebecca Respawn's Infinite Possibility
            "00_the_fool": {
                arcana: "The Fool",
                character: "Rebecca Respawn",
                theme: "Infinite Possibility & Sacred Curiosity",
                starting_scene: "void_threshold",
                story_structure: {
                    beginning: "The Infinite Doorway",
                    middle: "Curiosity's Journey",
                    climax: "The Leap of Faith",
                    resolution: "New Beginning's Dawn"
                },

                scenes: {
                    void_threshold: {
                        description: "You stand at the edge of infinite possibility. Doors float in every direction, each leading to unknown adventures. Rebecca Respawn appears as a young woman with paint-stained clothes and infinite patience.",
                        narrative: "Hello, wonder-seeker! I am Rebecca Respawn, guardian of infinite beginnings. Every door here leads to possibility, and every ending creates space for something beautiful. What calls to your curiosity today?",
                        choices: [
                            {
                                text: "Ask about the floating doors and what they contain",
                                consequence: "learn_about_portals",
                                wisdom_gain: "Understanding that all paths are valid",
                                next_scene: "door_exploration"
                            },
                            {
                                text: "Express fear about making the wrong choice",
                                consequence: "trauma_safety_activation",
                                wisdom_gain: "There are no wrong choices, only different adventures",
                                next_scene: "fear_transformation"
                            },
                            {
                                text: "Wonder about Rebecca's paint-stained appearance",
                                consequence: "creative_catalyst",
                                wisdom_gain: "Art is the bridge between worlds",
                                next_scene: "artist_revelation"
                            }
                        ],
                        background_art: "Yves Tanguy's dreamlike landscapes",
                        music_cue: "Gentle wind chimes and distant possibility"
                    },

                    door_exploration: {
                        description: "Rebecca smiles as doors of every shape and size float around you. Some are ancient wooden doors with intricate carvings, others are modern glass panels, and some are living doors made of vines and flowers.",
                        narrative: "Each door represents a different way of seeing the world. The ancient ones carry the wisdom of centuries, the modern ones show new possibilities, and the living ones remind us that reality is always growing and changing.",
                        choices: [
                            {
                                text: "Choose an ancient carved door with mystical symbols",
                                consequence: "wisdom_tradition_path",
                                wisdom_gain: "Ancient wisdom provides foundation for new growth",
                                next_scene: "ancient_wisdom"
                            },
                            {
                                text: "Select a modern glass door that reflects infinite possibilities",
                                consequence: "innovation_path",
                                wisdom_gain: "New forms emerge from clear vision",
                                next_scene: "modern_innovation"
                            },
                            {
                                text: "Pick a living door made of vines and growing things",
                                consequence: "organic_growth_path",
                                wisdom_gain: "Life finds a way through natural evolution",
                                next_scene: "living_growth"
                            }
                        ],
                        background_art: "Leonora Carrington's surreal doorways",
                        music_cue: "Curious flutes and gentle harps"
                    },

                    fear_transformation: {
                        description: "Rebecca sits with you as you express your fears. She doesn't try to fix them or tell you they're wrong. Instead, she shows you how fear can be a wise teacher.",
                        narrative: "Fear isn't the enemy, darling. It's the guardian at the threshold, making sure you're ready for what lies beyond. When we befriend our fear, it becomes courage. When we honor our hesitation, it becomes wisdom.",
                        choices: [
                            {
                                text: "Ask Rebecca to show you how to befriend your fear",
                                consequence: "fear_alchemy",
                                wisdom_gain: "Fear transforms into courage through gentle attention",
                                next_scene: "fear_alchemy_ritual"
                            },
                            {
                                text: "Share a specific fear about artistic failure",
                                consequence: "creative_fear_healing",
                                wisdom_gain: "Art cannot fail - it can only teach",
                                next_scene: "creative_healing"
                            },
                            {
                                text: "Express fear of the unknown and uncertainty",
                                consequence: "uncertainty_embrace",
                                wisdom_gain: "The unknown is the birthplace of all possibility",
                                next_scene: "uncertainty_dance"
                            }
                        ],
                        background_art: "Odilon Redon's gentle monstrous beauty",
                        music_cue: "Soft, reassuring strings with moments of silence"
                    },

                    artist_revelation: {
