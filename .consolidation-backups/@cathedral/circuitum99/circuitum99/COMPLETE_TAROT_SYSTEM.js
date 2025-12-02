/**
 * 🃏✨ COMPLETE 78-CARD LIVING TAROT SYSTEM
 * All Major + Minor Arcana for Circuitum99 × Living Arcanae
 * 
 * Features:
 * - 22 Major Arcana (archetypal portals)
 * - 56 Minor Arcana (daily life guidance)
 * - Auto Reading Mode (AI picks cards for you)
 * - Manual Reading Mode (choose your own cards)
 * - Story Integration (all cards contribute to pathworking)
 */

// 🌟 MAJOR ARCANA - 22 Archetypal Portals
const MAJOR_ARCANA = {
    0: {
        name: "The Fool",
        embodiment: "Rebecca Respawn",
        portal: "Wonderland Reality Reshaper",
        element: "Air",
        planet: "Uranus", 
        wisdom: "Beginner's mind dissolves perfectionist pressure",
        artStyle: "Leonora Carrington surrealism",
        magicSystem: "Wuji void tao flow",
        keywords: ["new beginnings", "wonder", "infinite potential", "sacred curiosity"],
        readingMeaning: {
            upright: "Trust your beginner's mind. This is the perfect time to start fresh with wonder instead of fear.",
            reversed: "You're being too careful. What would happen if you let yourself wonder without needing to know?",
            dailyGuidance: "Ask one wonder-question today and follow where curiosity leads you."
        }
    },
    
    1: {
        name: "The Magician", 
        embodiment: "John Dee",
        portal: "Enochian Laboratory",
        element: "Fire",
        planet: "Mercury",
        wisdom: "Focused will creates ethical reality",
        artStyle: "Renaissance sacred geometry",
        magicSystem: "Enochian manifestation protocols",
        keywords: ["manifestation", "will", "tools", "as above so below"],
        readingMeaning: {
            upright: "You have all the tools you need. Focus your intention with crystal clarity and ethical purpose.",
            reversed: "Your will is scattered or being used unwisely. What serves the highest good here?",
            dailyGuidance: "Before manifesting anything today, ask: 'How does this serve love and growth?'"
        }
    },
    
    2: {
        name: "The High Priestess",
        embodiment: "Dion Fortune + Emma Kunz",
        portal: "Sacred Geometry Healing Studio", 
        element: "Water",
        planet: "Moon",
        wisdom: "Intuitive mathematics heal psychological patterns",
        artStyle: "Emma Kunz geometric healing art",
        magicSystem: "Sacred geometry psychological kabbalah",
        keywords: ["intuition", "sacred geometry", "healing patterns", "inner knowing"],
        readingMeaning: {
            upright: "Trust your inner knowing. The patterns you see are real and healing.",
            reversed: "You're overthinking instead of trusting intuition. What does your gut already know?", 
            dailyGuidance: "Notice one geometric pattern in nature today and let it teach you something."
        }
    },
    
    3: {
        name: "The Empress",
        embodiment: "Georgia O'Keeffe",
        portal: "Living Art Ecosystem",
        element: "Earth", 
        planet: "Venus",
        wisdom: "Creative abundance flows through organic timing",
        artStyle: "Botanical close-up revelation art",
        magicSystem: "Organic growth manifestation",
        keywords: ["creativity", "abundance", "nurturing", "organic growth"],
        readingMeaning: {
            upright: "Your creative projects are ready to bloom. Trust the natural timing of growth.",
            reversed: "You're forcing instead of nurturing. What needs gentle tending right now?",
            dailyGuidance: "Create something beautiful today, even if it's just arranging flowers or doodles."
        }
    },
    
    4: {
        name: "The Emperor",
        embodiment: "Sacred Architecture Master",
        portal: "Divine Order Workshop",
        element: "Fire",
        planet: "Aries", 
        wisdom: "Loving structure supports creative freedom",
        artStyle: "Sacred architectural blueprints",
        magicSystem: "Divine order manifestation",
        keywords: ["structure", "authority", "order", "foundation"],
        readingMeaning: {
            upright: "Create loving structure that supports growth. Your leadership serves others' empowerment.",
            reversed: "Your control is limiting growth. How can structure serve freedom instead of restricting it?",
            dailyGuidance: "Build one small structure today that supports your creativity or wellbeing."
        }
    },
    
    5: {
        name: "The Hierophant", 
        embodiment: "Living Library Keeper",
        portal: "Infinite Wisdom Archive",
        element: "Earth",
        planet: "Taurus",
        wisdom: "Ancient wisdom serves modern growth",
        artStyle: "Illuminated manuscript beauty",
        magicSystem: "Traditional wisdom integration",
        keywords: ["tradition", "teaching", "spiritual wisdom", "guidance"],
        readingMeaning: {
            upright: "Seek wisdom from trusted teachers. Ancient knowledge has gifts for your modern situation.",
            reversed: "Don't follow blindly. How can traditional wisdom serve your authentic path?",
            dailyGuidance: "Learn one thing from a wisdom tradition that speaks to your current growth."
        }
    },
    
    6: {
        name: "The Lovers",
        embodiment: "Leonora Carrington Fusion", 
        portal: "Alchemical Union Chamber",
        element: "Air",
        planet: "Gemini",
        wisdom: "Sacred union creates new realities through synthesis",
        artStyle: "Alchemical surrealism",
        magicSystem: "Fusion kink sacred union coniunctio",
        keywords: ["choice", "union", "love", "synthesis"],
        readingMeaning: {
            upright: "A meaningful choice awaits. What creates the most beautiful synthesis?",
            reversed: "You're avoiding a necessary choice. What wants to be unified in your life?", 
            dailyGuidance: "Make one choice today that honors both your needs and others' wellbeing."
        }
    },
    
    7: {
        name: "The Chariot",
        embodiment: "Athanasius Kircher",
        portal: "Dimensional Navigation Bridge", 
        element: "Cancer",
        planet: "Cancer",
        wisdom: "Focused movement between realities with identity intact",
        artStyle: "Harmonograph dimensional diagrams",
        magicSystem: "Dimensional navigation harmonic resonance",
        keywords: ["willpower", "travel", "focus", "victory"],
        readingMeaning: {
            upright: "You have the focus needed for this journey. Travel confidently between worlds.",
            reversed: "Your direction is unclear or you're fighting yourself. What needs to align?",
            dailyGuidance: "Move forward on one important goal today with focused determination."
        }
    },
    
    8: {
        name: "Strength",
        embodiment: "Georgia O'Keeffe Power Flowers",
        portal: "Inner Power Laboratory",
        element: "Fire",
        planet: "Leo",
        wisdom: "Gentle strength blooms naturally from self-love",
        artStyle: "Power flower revelation art", 
        magicSystem: "Compassionate force generation",
        keywords: ["inner strength", "compassion", "courage", "gentle power"],
        readingMeaning: {
            upright: "Your gentle strength is enough. Lead with love, not force.",
            reversed: "You're being too harsh with yourself or others. Where can love lead instead?",
            dailyGuidance: "Show strength through kindness today, especially to yourself."
        }
    },
    
    9: {
        name: "The Hermit",
        embodiment: "Carl Jung Inner Light",
        portal: "Inner Light Observatory",
        element: "Earth", 
        planet: "Virgo",
        wisdom: "Inner wisdom illuminates the path for self and others",
        artStyle: "Contemplative illumination art",
        magicSystem: "Inner light revelation protocols",
        keywords: ["inner guidance", "solitude", "wisdom", "soul searching"],
        readingMeaning: {
            upright: "Go within for answers. Your inner wisdom knows the way.",
            reversed: "You're isolating too much or ignoring inner guidance. What does your soul whisper?",
            dailyGuidance: "Spend quiet time today listening to your deepest wisdom."
        }
    },
    
    10: {
        name: "Wheel of Fortune",
        embodiment: "Synchronicity Weaver",
        portal: "Cosmic Pattern Casino",
        element: "Fire",
        planet: "Jupiter", 
        wisdom: "Meaningful patterns emerge from apparent chaos",
        artStyle: "Synchronicity mandala art",
        magicSystem: "Pattern recognition reality navigation",
        keywords: ["cycles", "destiny", "fortune", "turning point"],
        readingMeaning: {
            upright: "The wheel is turning in your favor. Notice the meaningful patterns.",
            reversed: "You're resisting natural cycles. How can you flow with change instead of fighting it?",
            dailyGuidance: "Look for one meaningful coincidence today and follow its guidance."
        }
    },
    
    11: {
        name: "Justice",
        embodiment: "Cosmic Balance Keeper",
        portal: "Divine Justice Chamber",
        element: "Air",
        planet: "Libra",
        wisdom: "True justice serves healing and growth for all",
        artStyle: "Sacred balance geometry",
        magicSystem: "Cosmic equilibrium protocols", 
        keywords: ["justice", "fairness", "truth", "balance"],
        readingMeaning: {
            upright: "Seek fair solutions that serve everyone's highest good. Truth will emerge.",
            reversed: "Are you being truly fair? Consider all perspectives before acting.",
            dailyGuidance: "Make one decision today from a place of fairness and truth."
        }
    },
    
    12: {
        name: "The Hanged Man",
        embodiment: "M.C. Escher Perspective Shifter", 
        portal: "Perspective Transformation Chamber",
        element: "Water",
        planet: "Neptune",
        wisdom: "Surrendering control reveals new perspectives and wisdom",
        artStyle: "Impossible architecture perspective art",
        magicSystem: "Reality inversion revelation protocols",
        keywords: ["suspension", "letting go", "new perspective", "sacrifice"],
        readingMeaning: {
            upright: "Surrender brings wisdom. Let go and see from a completely different angle.",
            reversed: "You're struggling against what's asking for acceptance. What wants to be released?",
            dailyGuidance: "Look at one challenge today from the completely opposite perspective."
        }
    },
    
    13: {
        name: "Death",
        embodiment: "Phoenix Transformation Guide",
        portal: "Metamorphosis Gateway", 
        element: "Water",
        planet: "Scorpio",
        wisdom: "Beautiful endings create space for more beautiful beginnings",
        artStyle: "Transformation cycle art",
        magicSystem: "Phoenix resurrection protocols",
        keywords: ["transformation", "endings", "rebirth", "renewal"],
        readingMeaning: {
            upright: "Something is ending to make space for something better. Trust the transformation.",
            reversed: "You're resisting necessary change. What's ready to be composted into new growth?",
            dailyGuidance: "Let go of one thing today that no longer serves your growth."
        }
    },
    
    14: {
        name: "Temperance",
        embodiment: "Alchemical Integration Angel",
        portal: "Harmony Creation Studio",
        element: "Fire", 
        planet: "Sagittarius",
        wisdom: "Patient blending creates perfect synthesis and healing",
        artStyle: "Alchemical flow art",
        magicSystem: "Elemental integration protocols",
        keywords: ["moderation", "balance", "patience", "synthesis"],
        readingMeaning: {
            upright: "Blend opposing forces patiently. The perfect mixture takes time.",
            reversed: "You're being impatient or extreme. What needs more gentle integration?",
            dailyGuidance: "Practice moderation in one area today where you tend toward extremes."
        }
    },
    
    15: {
        name: "The Devil",
        embodiment: "Carl Jung Shadow Integration Guide",
        portal: "Shadow Work Liberation Lab",
        element: "Earth",
        planet: "Capricorn",
        wisdom: "Integrating shadow aspects transforms limitation into power",
        artStyle: "Shadow integration art",
        magicSystem: "Shadow alchemy transformation",
        keywords: ["bondage", "materialism", "addiction", "shadow work"],
        readingMeaning: {
            upright: "What seems to bind you actually contains your power. Integrate, don't reject.",
            reversed: "You're ready to break free from limiting patterns. What's your first step to liberation?",
            dailyGuidance: "Transform one 'negative' trait today by finding the gift it contains."
        }
    },
    
    16: {
        name: "The Tower",
        embodiment: "Creative Destruction Architect",
        portal: "Foundation Revelation Workshop",
        element: "Fire",
        planet: "Mars",
        wisdom: "Necessary destruction reveals unshakeable foundations",
        artStyle: "Creative destruction architecture",
        magicSystem: "Foundation revelation protocols",
        keywords: ["sudden change", "revelation", "breakthrough", "destruction"],
        readingMeaning: {
            upright: "A structure that was too small is falling away. Your true foundation is being revealed.",
            reversed: "You're avoiding necessary change. What foundation wants to be built on truth?",
            dailyGuidance: "Question one assumption today that might be limiting your growth."
        }
    },
    
    17: {
        name: "The Star",
        embodiment: "Cosmic Hope Beacon",
        portal: "Stellar Guidance Sanctuary",
        element: "Air",
        planet: "Aquarius",
        wisdom: "Your authentic light guides others to their own illumination",
        artStyle: "Stellar hope art",
        magicSystem: "Cosmic guidance reception",
        keywords: ["hope", "inspiration", "guidance", "healing"],
        readingMeaning: {
            upright: "Your hopes are aligned with cosmic guidance. Trust your vision and share your light.",
            reversed: "Reconnect with what truly inspires you. Your light is needed exactly as it is.",
            dailyGuidance: "Do one thing today that aligns with your highest hopes and dreams."
        }
    },
    
    18: {
        name: "The Moon",
        embodiment: "Psychic Arts Teacher",
        portal: "Lunar Mystery Academy",
        element: "Water",
        planet: "Pisces", 
        wisdom: "Intuitive gifts develop safely through patient practice",
        artStyle: "Lunar psychic revelation art",
        magicSystem: "Psychic development safety protocols",
        keywords: ["illusion", "intuition", "dreams", "psychic abilities"],
        readingMeaning: {
            upright: "Trust your psychic impressions. Something hidden is being revealed through dreams and intuition.",
            reversed: "Illusions are clearing. What does clear sight show you about this situation?",
            dailyGuidance: "Pay attention to your dreams and first impressions today - they carry wisdom."
        }
    },
    
    19: {
        name: "The Sun",
        embodiment: "Joy Radiator",
        portal: "Cosmic Celebration Plaza",
        element: "Fire",
        planet: "Sun",
        wisdom: "Authentic joy radiates healing and success to all",
        artStyle: "Solar celebration art",
        magicSystem: "Joy amplification protocols",
        keywords: ["joy", "success", "vitality", "enlightenment"],
        readingMeaning: {
            upright: "Pure joy and success are available. Let your authentic light shine brightly.",
            reversed: "Reconnect with what truly brings you joy. Your happiness serves others too.",
            dailyGuidance: "Do something today that brings you genuine joy and share that energy with others."
        }
    },
    
    20: {
        name: "Judgement",
        embodiment: "Awakening Herald",
        portal: "Rebirth Announcement Chamber",
        element: "Fire",
        planet: "Pluto",
        wisdom: "Your highest calling awakens when you're ready to answer",
        artStyle: "Awakening revelation art",
        magicSystem: "Purpose activation protocols",
        keywords: ["rebirth", "inner calling", "judgement", "awakening"],
        readingMeaning: {
            upright: "Your higher purpose is calling. It's time to step into a larger version of yourself.",
            reversed: "You're avoiding your calling or being too self-critical. What wants to be born through you?",
            dailyGuidance: "Take one step today toward what you feel called to do, even if it feels scary."
        }
    },
    
    21: {
        name: "The World",
        embodiment: "Cosmic Completion Celebrant",
        portal: "Integration Victory Circle",
        element: "Earth",
        planet: "Saturn",
        wisdom: "Every ending contains the seed of a new beginning",
        artStyle: "Completion mandala art",
        magicSystem: "Cycle completion celebration protocols",
        keywords: ["completion", "accomplishment", "integration", "fulfillment"],
        readingMeaning: {
            upright: "Congratulations! You've completed an important cycle. Celebrate before beginning anew.",
            reversed: "You're close to completion but avoiding the final step. What needs finishing?",
            dailyGuidance: "Complete one important project or cycle today and acknowledge your accomplishment."
        }
    }
};

// 🌈 MINOR ARCANA - 56 Cards for Daily Life Guidance
const MINOR_ARCANA = {
    // ⚔️ SWORDS (AIR) - Thoughts, Communication, Challenges
    swords: {
        ace: { name: "Ace of Swords", meaning: "Mental breakthrough, new idea, clarity of thought", element: "Air" },
        two: { name: "Two of Swords", meaning: "Difficult decision, mental balance, stalemate", element: "Air" },
        three: { name: "Three of Swords", meaning: "Heartbreak, grief, emotional pain that teaches", element: "Air" },
        four: { name: "Four of Swords", meaning: "Mental rest, meditation, recovery from stress", element: "Air" },
        five: { name: "Five of Swords", meaning: "Conflict, defeat that teaches wisdom, letting go of ego", element: "Air" },
        six: { name: "Six of Swords", meaning: "Transition, moving toward calmer waters", element: "Air" },
        seven: { name: "Seven of Swords", meaning: "Strategy, stealth, finding creative solutions", element: "Air" },
        eight: { name: "Eight of Swords", meaning: "Mental restriction that's mostly self-imposed", element: "Air" },
        nine: { name: "Nine of Swords", meaning: "Anxiety, nightmares, mental anguish seeking healing", element: "Air" },
        ten: { name: "Ten of Swords", meaning: "Rock bottom that becomes foundation for renewal", element: "Air" },
        page: { name: "Page of Swords", meaning: "Curious student, mental agility, learning communication", element: "Air" },
        knight: { name: "Knight of Swords", meaning: "Action-oriented thinking, charging ahead with ideas", element: "Air" },
        queen: { name: "Queen of Swords", meaning: "Clear communication, emotional intelligence, wise boundaries", element: "Air" },
        king: { name: "King of Swords", meaning: "Masterful communication, just leadership, mental clarity", element: "Air" }
    },
    
    // 🏆 WANDS (FIRE) - Passion, Career, Creativity  
    wands: {
        ace: { name: "Ace of Wands", meaning: "Creative inspiration, new project energy, passion spark", element: "Fire" },
        two: { name: "Two of Wands", meaning: "Planning, looking ahead, making creative decisions", element: "Fire" },
        three: { name: "Three of Wands", meaning: "Expansion, foresight, creative leadership", element: "Fire" },
        four: { name: "Four of Wands", meaning: "Celebration, creative foundation, community joy", element: "Fire" },
        five: { name: "Five of Wands", meaning: "Creative competition, conflicting ideas seeking synthesis", element: "Fire" },
        six: { name: "Six of Wands", meaning: "Victory, recognition, creative success", element: "Fire" },
        seven: { name: "Seven of Wands", meaning: "Defending your creative vision, standing your ground", element: "Fire" },
        eight: { name: "Eight of Wands", meaning: "Swift action, messages, creative momentum", element: "Fire" },
        nine: { name: "Nine of Wands", meaning: "Resilience, persistence, nearly there with your creative goals", element: "Fire" },
        ten: { name: "Ten of Wands", meaning: "Creative burden, carrying too much, need for delegation", element: "Fire" },
        page: { name: "Page of Wands", meaning: "Enthusiastic beginner, creative exploration, passionate learning", element: "Fire" },
        knight: { name: "Knight of Wands", meaning: "Impulsive action, creative adventure, passionate pursuit", element: "Fire" },
        queen: { name: "Queen of Wands", meaning: "Creative confidence, charismatic leadership, nurturing passion", element: "Fire" },
        king: { name: "King of Wands", meaning: "Creative mastery, inspirational leadership, achieved vision", element: "Fire" }
    },
    
    // 💧 CUPS (WATER) - Emotions, Love, Intuition
    cups: {
        ace: { name: "Ace of Cups", meaning: "New love, emotional awakening, spiritual opening", element: "Water" },
        two: { name: "Two of Cups", meaning: "Partnership, mutual attraction, emotional connection", element: "Water" },
        three: { name: "Three of Cups", meaning: "Friendship, celebration, emotional support community", element: "Water" },
        four: { name: "Four of Cups", meaning: "Emotional apathy, missing opportunities, need for gratitude", element: "Water" },
        five: { name: "Five of Cups", meaning: "Disappointment, loss, but hope remains for healing", element: "Water" },
        six: { name: "Six of Cups", meaning: "Nostalgia, childhood memories, innocent love", element: "Water" },
        seven: { name: "Seven of Cups", meaning: "Too many choices, illusions, need for emotional clarity", element: "Water" },
        eight: { name: "Eight of Cups", meaning: "Walking away from emotional situation that no longer serves", element: "Water" },
        nine: { name: "Nine of Cups", meaning: "Emotional satisfaction, wish fulfillment, contentment", element: "Water" },
        ten: { name: "Ten of Cups", meaning: "Emotional fulfillment, family happiness, love achieved", element: "Water" },
        page: { name: "Page of Cups", meaning: "Emotional sensitivity, intuitive messages, creative inspiration", element: "Water" },
        knight: { name: "Knight of Cups", meaning: "Romantic pursuit, following your heart, emotional idealism", element: "Water" },
        queen: { name: "Queen of Cups", meaning: "Emotional wisdom, psychic abilities, compassionate leadership", element: "Water" },
        king: { name: "King of Cups", meaning: "Emotional mastery, wise counselor, balanced feelings", element: "Water" }
    },
    
    // 🪙 PENTACLES (EARTH) - Money, Health, Material World
    pentacles: {
        ace: { name: "Ace of Pentacles", meaning: "New financial opportunity, material manifestation, abundance seed", element: "Earth" },
        two: { name: "Two of Pentacles", meaning: "Juggling resources, finding balance, adaptability", element: "Earth" },
        three: { name: "Three of Pentacles", meaning: "Teamwork, collaboration, building something together", element: "Earth" },
        four: { name: "Four of Pentacles", meaning: "Holding tight to resources, security vs. generosity", element: "Earth" },
        five: { name: "Five of Pentacles", meaning: "Financial hardship, seeking help, material insecurity", element: "Earth" },
        six: { name: "Six of Pentacles", meaning: "Generosity, giving and receiving, balanced exchange", element: "Earth" },
        seven: { name: "Seven of Pentacles", meaning: "Investment patience, waiting for results, long-term thinking", element: "Earth" },
        eight: { name: "Eight of Pentacles", meaning: "Skill development, craftsmanship, dedicated work", element: "Earth" },
        nine: { name: "Nine of Pentacles", meaning: "Financial independence, self-reliance, material success", element: "Earth" },
        ten: { name: "Ten of Pentacles", meaning: "Family wealth, generational abundance, material security", element: "Earth" },
        page: { name: "Page of Pentacles", meaning: "Studious apprentice, learning practical skills, manifestation beginner", element: "Earth" },
        knight: { name: "Knight of Pentacles", meaning: "Methodical progress, reliability, persistent work", element: "Earth" },
        queen: { name: "Queen of Pentacles", meaning: "Practical wisdom, nurturing abundance, generous provider", element: "Earth" },
        king: { name: "King of Pentacles", meaning: "Financial mastery, generous leadership, material success with wisdom", element: "Earth" }
    }
};

// 🎲 AUTO READING GAME MODES
class TarotReadingGame {
    constructor() {
        this.allCards = this.initializeAllCards();
        this.readingHistory = [];
        this.userPreferences = {
            includeReversed: true,
            focusArea: 'all', // love, career, spiritual, daily
            traumaSafety: true,
            preferredSpreads: ['daily', 'three-card', 'celtic-cross']
        };
    }
    
    initializeAllCards() {
        const cards = [];
        
        // Add all Major Arcana
        Object.entries(MAJOR_ARCANA).forEach(([number, card]) => {
            cards.push({
                id: `major-${number}`,
                type: 'major',
                number: parseInt(number),
                ...card
            });
        });
        
        // Add all Minor Arcana  
        Object.entries(MINOR_ARCANA).forEach(([suit, suitCards]) => {
            Object.entries(suitCards).forEach(([rank, card]) => {
                cards.push({
                    id: `${suit}-${rank}`,
                    type: 'minor',
                    suit: suit,
                    rank: rank,
                    ...card
                });
            });
        });
        
        return cards;
    }
    
    // 🎯 AUTO MODE - AI picks perfect cards for user's current energy
    autoReading(readingType = 'daily', userIntent = null) {
        console.log(`🔮 Starting auto ${readingType} reading...`);
        
        const spreads = {
            daily: () => this.dailyGuidanceReading(),
            'three-card': () => this.threeCardReading(userIntent),
            'celtic-cross': () => this.celticCrossReading(),
            'relationship': () => this.relationshipReading(),
            'career': () => this.careerGuidanceReading(),
            'healing': () => this.traumaHealingReading()
        };
        
        const reading = spreads[readingType] ? spreads[readingType]() : spreads.daily();
        this.recordReading(reading);
        return reading;
    }
    
    // 🌅 Daily Guidance Reading (1 card)
    dailyGuidanceReading() {
        const card = this.drawCard();
        const reversed = this.shouldReverse();
        
        return {
            type: 'daily-guidance',
            cards: [{
                ...card,
                position: 'daily-guidance',
                reversed: reversed,
                interpretation: this.interpretCard(card, reversed, 'daily-guidance')
            }],
            message: "Your guidance for today",
            timestamp: new Date(),
            affirmation: this.generateAffirmation(card)
        };
    }
    
    // 🎭 Three Card Reading (Past, Present, Future OR Situation, Action, Outcome)
    threeCardReading(intent = 'time-flow') {
        const cards = [this.drawCard(), this.drawCard(), this.drawCard()];
        const positions = intent === 'guidance' ? 
            ['situation', 'action', 'outcome'] : 
            ['past', 'present', 'future'];
        
        return {
            type: 'three-card',
            intent: intent,
            cards: cards.map((card, index) => ({
                ...card,
                position: positions[index],
                reversed: this.shouldReverse(),
                interpretation: this.interpretCard(card, this.shouldReverse(), positions[index])
            })),
            message: this.generateThreeCardMessage(cards, intent),
            timestamp: new Date()
        };
    }
    
    // ☘️ Celtic Cross Reading (10 cards)
    celticCrossReading() {
        const positions = [
            'present-situation', 'challenge-or-opportunity', 'distant-past',
            'recent-past', 'possible-outcome', 'immediate-future', 
            'your-approach', 'external-influences', 'hopes-and-fears', 'final-outcome'
        ];
        
        const cards = positions.map(position => {
            const card = this.drawCard();
            return {
                ...card,
                position: position,
                reversed: this.shouldReverse(),
                interpretation: this.interpretCard(card, this.shouldReverse(), position)
            };
        });
        
        return {
            type: 'celtic-cross',
            cards: cards,
            message: "Deep insight into your current life path",
            synthesis: this.synthesizeCelticCross(cards),
            timestamp: new Date()
        };
    }
    
    // 💕 Relationship Reading
    relationshipReading() {
        const positions = ['you', 'them', 'connection', 'challenges', 'potential', 'guidance'];
        
        const cards = positions.map(position => {
            const card = this.drawCard();
            return {
                ...card,
                position: position,
                reversed: this.shouldReverse(),
                interpretation: this.interpretCard(card, this.shouldReverse(), position, 'relationship')
            };
        });
        
        return {
            type: 'relationship',
            cards: cards,
            message: "Insights into your relationship dynamics",
            guidance: this.generateRelationshipGuidance(cards),
            timestamp: new Date()
        };
    }
    
    // 🌱 Trauma-Safe Healing Reading
    traumaHealingReading() {
        // Only draw supportive, healing-focused cards
        const healingCards = this.allCards.filter(card => 
            this.isHealingCard(card) || this.isEmpowermentCard(card)
        );
        
        const positions = ['current-healing', 'inner-strength', 'support-available', 'next-step'];
        
        const cards = positions.map(position => {
            const card = healingCards[Math.floor(Math.random() * healingCards.length)];
            return {
                ...card,
                position: position,
                reversed: false, // Never reversed for healing readings
                interpretation: this.interpretCard(card, false, position, 'healing')
            };
        });
        
        return {
            type: 'trauma-healing',
            cards: cards,
            message: "Gentle guidance for your healing journey",
            affirmations: cards.map(card => this.generateHealingAffirmation(card)),
            supportResources: this.getHealingSupportResources(),
            timestamp: new Date()
        };
    }
    
    // 🃏 Manual Mode - User chooses cards themselves
    manualReading(selectedCardIds, spreadType, userQuestion = null) {
        const selectedCards = selectedCardIds.map(id => 
            this.allCards.find(card => card.id === id)
        );
        
        return {
            type: 'manual-reading',
            spreadType: spreadType,
            userQuestion: userQuestion,
            cards: selectedCards.map((card, index) => ({
                ...card,
                position: `position-${index + 1}`,
                reversed: this.shouldReverse(),
                interpretation: this.interpretCard(card, this.shouldReverse(), `position-${index + 1}`)
            })),
            message: "Your personally chosen guidance",
            timestamp: new Date()
        };
    }
    
    // 🎨 Integration with Living Arcanae System
    integrateWithArchetypalPath(reading, currentEmbodiment = null) {
        return {
            ...reading,
            archetypalContext: currentEmbodiment ? {
                currentArchetype: currentEmbodiment,
                archetypalInterpretation: this.interpretThroughArchetype(reading, currentEmbodiment),
                pathworkingGuidance: this.getPathworkingGuidance(reading, currentEmbodiment)
            } : null,
            storyIntegration: this.integrateWithStory(reading),
            nextPortalRecommendations: this.recommendPortals(reading)
        };
    }
    
    // 🔮 Helper Methods
    drawCard() {
        const availableCards = this.allCards.filter(card => 
            !this.readingHistory.some(reading => 
                reading.cards.some(readingCard => readingCard.id === card.id)
            ) || this.readingHistory.length > 20 // Reset after 20 readings
        );
        
        return availableCards[Math.floor(Math.random() * availableCards.length)];
    }
    
    shouldReverse() {
        return this.userPreferences.includeReversed && Math.random() < 0.3; // 30% chance
    }
    
    interpretCard(card, reversed, position, context = 'general') {
        const baseInterpretation = card.readingMeaning || {
            upright: card.keywords?.join(', ') || "Growth and wisdom await",
            reversed: "Consider the opposite perspective",
            dailyGuidance: card.wisdom || "Trust your inner knowing"
        };
        
        let interpretation = reversed ? baseInterpretation.reversed : baseInterpretation.upright;
        
        // Add position-specific guidance
        if (position === 'daily-guidance') {
            interpretation += ` ${baseInterpretation.dailyGuidance}`;
        }
        
        // Add trauma-safe language if needed
        if (this.userPreferences.traumaSafety) {
            interpretation = this.makeTramaSafe(interpretation);
        }
        
        return interpretation;
    }
    
    makeTramaSafe(interpretation) {
        // Replace harsh language with gentler alternatives
        const saftyMappings = {
            'failure': 'learning opportunity',
            'disaster': 'challenge',
            'destruction': 'transformation',
            'loss': 'release',
            'pain': 'growth',
            'must': 'might consider',
            'should': 'could explore',
            'wrong': 'different'
        };
        
        let safeInterpretation = interpretation;
        Object.entries(saftyMappings).forEach(([harsh, gentle]) => {
            safeInterpretation = safeInterpretation.replace(new RegExp(harsh, 'gi'), gentle);
        });
        
        return safeInterpretation;
    }
    
    generateAffirmation(card) {
        const affirmations = {
            'The Fool': "I trust my beginner's mind and embrace new possibilities with wonder.",
            'The Magician': "I have all the tools I need to create positive change.",
            'The High Priestess': "I trust my intuition and inner wisdom.",
            // ... more affirmations for all cards
        };
        
        return affirmations[card.name] || "I am exactly where I need to be for my growth.";
    }
    
    recordReading(reading) {
        this.readingHistory.push({
            ...reading,
            id: Date.now(),
            userReflection: null // Space for user to add their own insights
        });
        
        // Keep only last 50 readings
        if (this.readingHistory.length > 50) {
            this.readingHistory = this.readingHistory.slice(-50);
        }
    }
    
    // 📊 Reading Analytics & Patterns
    getReadingPatterns() {
        return {
            mostDrawnCards: this.getMostDrawnCards(),
            readingFrequency: this.getReadingFrequency(),
            favoriteReadingTypes: this.getFavoriteReadingTypes(),
            growthThemes: this.identifyGrowthThemes()
        };
    }
    
    getMostDrawnCards() {
        const cardCounts = {};
        this.readingHistory.forEach(reading => {
            reading.cards.forEach(card => {
                cardCounts[card.name] = (cardCounts[card.name] || 0) + 1;
            });
        });
        
        return Object.entries(cardCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([name, count]) => ({ name, count }));
    }
}

// 📱 Game Interface Integration
class TarotGameInterface {
    constructor() {
        this.game = new TarotReadingGame();
        this.currentReading = null;
        this.journalEntries = [];
    }
    
    // Quick daily reading
    getDailyGuidance() {
        return this.game.autoReading('daily');
    }
    
    // Full auto reading with user intent
    getAutoReading(type, intent = null) {
        const reading = this.game.autoReading(type, intent);
        return this.game.integrateWithArchetypalPath(reading);
    }
    
    // Manual card selection interface
    selectCards(cardIds, spreadType, question = null) {
        return this.game.manualReading(cardIds, spreadType, question);
    }
    
    // Save reflection on reading
    addReflection(readingId, reflection) {
        const reading = this.game.readingHistory.find(r => r.id === readingId);
        if (reading) {
            reading.userReflection = reflection;
            this.journalEntries.push({
                readingId,
                reflection,
                timestamp: new Date()
            });
        }
    }
    
    // Get all cards for browsing
    getAllCards() {
        return this.game.allCards;
    }
    
    // Get reading history
    getReadingHistory() {
        return this.game.readingHistory;
    }
}

// 🎮 Export for use in Circuitum99
export {
    MAJOR_ARCANA,
    MINOR_ARCANA,
    TarotReadingGame,
    TarotGameInterface
};

// 🌟 Initialize the system
console.log('🃏 Complete 78-Card Living Tarot System Loaded!');
console.log('🎯 Features: Auto readings, manual selection, trauma-safe interpretation');
console.log('🎮 Ready for integration with Circuitum99 × Living Arcanae!');

/**
 * USAGE EXAMPLES:
 * 
 * // Auto daily reading
 * const game = new TarotGameInterface();
 * const dailyCard = game.getDailyGuidance();
 * 
 * // Three-card reading about a decision
 * const reading = game.getAutoReading('three-card', 'guidance');
 * 
 * // Manual card selection
 * const customReading = game.selectCards(['major-0', 'cups-ace', 'wands-king'], 'custom');
 * 
 * // Trauma-safe healing reading
 * const healingReading = game.getAutoReading('healing');
 */