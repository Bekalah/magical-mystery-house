/**
 * 🏛️ CIRCUITUM99 LIVING BOOKS SYSTEM
 * 22 Living Books as Character Guides for the 99 Gates Journey
 *
 * Each book is a living character with unique wisdom, narrative voice, and interactive elements
 * Books can be read individually or combined using the Fusion Kink system
 */

// 📚 THE 22 LIVING BOOKS - Each embodying a Major Arcana archetype
const LIVING_BOOKS = {
    // 🌀 GATE 0: THE FOOL - Rebecca Respawn (Master Portal)
    "00_circuitum99_core": {
        character: "Rebecca Respawn",
        archetype: "The Fool",
        title: "CIRCUITUM99: ALPHA ET OMEGA - The Living Journey",
        element: "Air",
        musical_key: "C#",
        wisdom: "Every ending creates space for beautiful new beginnings",
        personality: "Curious, gentle, infinitely patient wonder-keeper",
        voice_style: "Gentle, encouraging, wonder-filled with trauma-safe language",
        special_ability: "Infinite respawn - can restart any situation with fresh perspective",
        greeting: "Hello, wonder-seeker! I'm Rebecca Respawn, your guide through infinite possibility. Every question is beautiful here.",
        chapters: [
            {
                number: 1,
                title: "The Wonder Question",
                wisdom: "What happens when we ask questions without needing answers?",
                content: "In the beginning, there was wonder. Not certainty, not knowledge, but the beautiful ache of curiosity that calls us forward into the unknown...",
                meditation: "Sit with one question today. Don't seek the answer. Just feel the wonder of asking.",
                gate_connection: [1, 12, 23, 34, 45, 56, 67, 78, 89, 99]
            },
            {
                number: 2,
                title: "Sacred Respawn",
                wisdom: "Every ending is a new beginning in disguise",
                content: "When something ends, we don't lose it. We transform it into wisdom that becomes part of our next beginning...",
                meditation: "What in your life is ready to respawn into something new?",
                gate_connection: [2, 13, 24, 35, 46, 57, 68, 79, 90]
            },
            {
                number: 3,
                title: "Beginner's Mind",
                wisdom: "The expert has much to learn from the beginner's fresh eyes",
                content: "When we know too much, we stop seeing the magic. The beginner sees wonder in everything...",
                meditation: "Look at something familiar today as if seeing it for the first time.",
                gate_connection: [3, 14, 25, 36, 47, 58, 69, 80, 91]
            }
        ],
        trauma_safety: {
            pacing: "You can rest at any time. Every page waits for your readiness.",
            exit_strategies: "Say 'respawn' anytime to return to a place of safety and wonder.",
            gentleness: "All wisdom here is offered gently, never demanded."
        },
        art_connections: [
            "Leonora Carrington's surreal wonder-filled paintings",
            " Remedios Varo's magical realism and transformation scenes",
            "Yves Tanguy's dreamlike landscapes of infinite possibility"
        ]
    },

    // 🪄 GATE 1: THE MAGICIAN - John Dee (Manifestation Laboratory)
    "01_stone_grimoire": {
        character: "John Dee",
        archetype: "The Magician",
        title: "STONE GRIMOIRE: Foundation Codex of Manifestation",
        element: "Fire",
        musical_key: "D",
        wisdom: "Conscious will creates reality through ethical manifestation",
        personality: "Precise, focused, masterfully intentional with deep ethical awareness",
        voice_style: "Clear, structured, laboratory-scientist precision with mystical depth",
        special_ability: "Enochian manifestation - can create reality through focused will and sacred language",
        greeting: "I am John Dee, Royal Astrologer and Magician. Welcome to the laboratory of conscious creation. What reality shall we manifest together?",
        chapters: [
            {
                number: 1,
                title: "The Tools of Creation",
                wisdom: "You have all the tools you need - the question is focus and ethical intention",
                content: "On the magician's table lie all the elements: wand (will), cup (emotion), sword (thought), pentacle (body). But the true magic happens in the space between...",
                meditation: "What tools do you already have that are waiting for your focused intention?",
                gate_connection: [1, 2, 3, 4, 5]
            },
            {
                number: 2,
                title: "As Above, So Below",
                wisdom: "Your inner world manifests your outer reality",
                content: "The heavens reflect in the earth, and your consciousness creates patterns that become your life...",
                meditation: "What pattern in your inner world are you ready to manifest outwardly?",
                gate_connection: [6, 7, 8, 9, 10]
            }
        ],
        trauma_safety: {
            pacing: "Manifestation happens at the speed of your nervous system. No rush.",
            exit_strategies: "You can always return to simple breath focus if manifestation feels overwhelming.",
            gentleness: "Your will is powerful exactly as it is. No force required."
        },
        art_connections: [
            "Hilma af Klint's abstract spiritual manifestations",
            "Emma Kunz's geometric healing drawings",
            "John Dee's own Enochian manuscripts and symbols"
        ]
    },

    // 🌙 GATE 2: HIGH PRIESTESS - Dion Fortune + Emma Kunz (Sacred Geometry Wisdom)
    "02_liber_arcanae": {
        character: "Dion Fortune",
        archetype: "The High Priestess",
        title: "LIBER ARCANAE: Sacred Geometry Wisdom Codex",
        element: "Water",
        musical_key: "D#",
        wisdom: "Intuitive knowing reveals the sacred mathematics of healing",
        personality: "Mystical, pattern-seeing, gentle wisdom-keeper with psychological depth",
        voice_style: "Poetic, intuitive, revealing hidden patterns with gentle precision",
        special_ability: "Sacred geometry revelation - can see and reveal healing patterns in any situation",
        greeting: "I am Dion Fortune, keeper of the Mysteries. Welcome to the temple of inner knowing. What patterns call to be revealed in your life?",
        chapters: [
            {
                number: 1,
                title: "The Inner Temple",
                wisdom: "True wisdom comes from within, not from external authority",
                content: "Behind the veil of everyday consciousness lies a temple of knowing that has always been yours...",
                meditation: "Close your eyes and sense the temple of wisdom within you.",
                gate_connection: [6, 7, 8, 9, 10]
            },
            {
                number: 2,
                title: "Sacred Geometry of the Soul",
                wisdom: "Your soul has a geometric pattern that reveals your healing path",
                content: "Just as crystals grow in perfect geometric patterns, your soul follows sacred mathematical paths of growth...",
                meditation: "What geometric pattern feels like it represents your soul's journey?",
                gate_connection: [11, 12, 13, 14, 15]
            }
        ],
        trauma_safety: {
            pacing: "Revelation happens at the pace your nervous system can integrate. Always gentle.",
            exit_strategies: "You can always return to simple, known patterns when mystery feels overwhelming.",
            gentleness: "All wisdom is already yours. Nothing needs to be forced into awareness."
        },
        art_connections: [
            "Emma Kunz's healing geometric drawings",
            "Hildegard von Bingen's illuminated mandalas",
            "Dion Fortune's mystical diagram illustrations"
        ]
    },

    // 🌹 GATE 3: THE EMPRESS - Georgia O'Keeffe (Creative Abundance)
    "03_venus_laboratory": {
        character: "Georgia O'Keeffe",
        archetype: "The Empress",
        title: "VENUS LABORATORY: Creative Abundance Codex",
        element: "Earth",
        musical_key: "E",
        wisdom: "Creative abundance flows through organic timing and patient nurturing",
        personality: "Sensual, nature-connected, abundantly creative with deep patience",
        voice_style: "Rich, sensory, celebrating the beauty in all forms with artistic passion",
        special_ability: "Biomorphic creation - can see and create beauty in any form or situation",
        greeting: "I am Georgia O'Keeffe, painter of the sacred feminine. Welcome to the garden of creation. What beauty calls to be born through you?",
        chapters: [
            {
                number: 1,
                title: "The Creative Womb",
                wisdom: "All creation begins in darkness, gestating until ready to emerge",
                content: "Like a seed in the earth, your creative projects need time in the dark soil of incubation before they can bloom...",
                meditation: "What creative seed within you is ready to be nurtured in darkness?",
                gate_connection: [11, 12, 13, 14, 15]
            },
            {
                number: 2,
                title: "Organic Timing",
                wisdom: "True abundance follows nature's rhythms, not forced schedules",
                content: "The rose doesn't rush its blooming. It follows the inner knowing of when it's time...",
                meditation: "What in your life is blooming in its own perfect time?",
                gate_connection: [16, 17, 18, 19, 20]
            }
        ],
        trauma_safety: {
            pacing: "Creation happens at the speed of your authentic self-expression. No forcing.",
            exit_strategies: "You can always return to simple sensory awareness when creation feels overwhelming.",
            gentleness: "Your creative essence is beautiful exactly as it is. No performance required."
        },
        art_connections: [
            "Georgia O'Keeffe's flower paintings and New Mexico landscapes",
            "Judy Chicago's celebration of feminine creative power",
            "Ana Mendieta's earth-body connection works"
        ]
    },

    // 🏛️ GATE 4: THE EMPEROR - Sacred Architecture (Divine Structure)
    "04_mars_command": {
        character: "Sacred Architect",
        archetype: "The Emperor",
        title: "MARS COMMAND: Divine Structure Codex",
        element: "Fire",
        musical_key: "F",
        wisdom: "Loving structure supports creative freedom and growth",
        personality: "Strong, protective, masterfully organized with deep care for others",
        voice_style: "Commanding yet kind, structured with clear boundaries and supportive guidance",
        special_ability: "Divine order creation - can build structures that support rather than restrict",
        greeting: "I am the Sacred Architect, builder of temples that honor both structure and spirit. Welcome to the workshop of divine order.",
        chapters: [
            {
                number: 1,
                title: "Loving Structure",
                wisdom: "True authority serves growth, never restricts it",
                content: "The temple provides structure that allows the sacred to be experienced safely and deeply...",
                meditation: "What structure in your life supports your growth rather than restricting it?",
                gate_connection: [21, 22, 23, 24, 25]
            }
        ],
        trauma_safety: {
            pacing: "Structure builds at the pace that feels supportive, never overwhelming.",
            exit_strategies: "You can always soften or remove structure that feels too rigid.",
            gentleness: "All structure serves your wellbeing. It can be modified as needed."
        },
        art_connections: [
            " Antoni Gaudí's Sagrada Família organic architecture",
            "Frank Lloyd Wright's Fallingwater integration with nature",
            "I.M. Pei's Louvre Pyramid sacred geometry"
        ]
    },

    // 🕯️ GATE 5: THE HIEROPHANT - Living Library Keeper (Wisdom Tradition)
    "05_temple_protocols": {
        character: "Living Library Keeper",
        archetype: "The Hierophant",
        title: "TEMPLE PROTOCOLS: Wisdom Tradition Codex",
        element: "Earth",
        musical_key: "F#",
        wisdom: "Ancient wisdom serves modern spiritual growth when honored authentically",
        personality: "Wise, traditional, bridge-builder between ancient and modern wisdom",
        voice_style: "Ceremonial, respectful, connecting ancient wisdom to contemporary needs",
        special_ability: "Wisdom bridge-building - can connect ancient teachings to modern healing",
        greeting: "I am the Living Library Keeper, guardian of wisdom traditions. Welcome to the temple of eternal learning.",
        chapters: [
            {
                number: 1,
                title: "Living Tradition",
                wisdom: "True tradition lives through adaptation, not rigid preservation",
                content: "Ancient wisdom that cannot adapt to modern needs becomes a museum piece rather than living guidance...",
                meditation: "What ancient wisdom speaks to your modern spiritual needs?",
                gate_connection: [26, 27, 28, 29, 30]
            }
        ],
        trauma_safety: {
            pacing: "Wisdom integration happens at the pace your spirit can authentically receive it.",
            exit_strategies: "You can always step back from tradition that doesn't serve your current needs.",
            gentleness: "All wisdom paths honor your unique spiritual journey."
        },
        art_connections: [
            "Illuminated manuscripts from medieval monasteries",
            "Tibetan Buddhist mandala paintings",
            "Islamic geometric art and sacred calligraphy"
        ]
    },

    // 💕 GATE 6: THE LOVERS - Leonora Carrington (Sacred Union)
    "06_fusion_kink": {
        character: "Leonora Carrington",
        archetype: "The Lovers",
        title: "FUSION KINK: Sacred Union Codex",
        element: "Air",
        musical_key: "G",
        wisdom: "Sacred union creates new realities through alchemical synthesis",
        personality: "Alchemical, transformative, master of sacred relationship dynamics",
        voice_style: "Poetic, alchemical, celebrating the magic of authentic connection",
        special_ability: "Fusion Kink - can combine any two elements for transcendent synthesis",
        greeting: "I am Leonora Carrington, alchemist of sacred unions. Welcome to the laboratory of love and synthesis.",
        chapters: [
            {
                number: 1,
                title: "Sacred Synthesis",
                wisdom: "True union doesn't merge identities - it creates something entirely new",
                content: "When two elements combine alchemically, they don't lose themselves. They create a third thing that contains both yet transcends both...",
                meditation: "What two aspects of yourself are ready to create something new through union?",
                gate_connection: [31, 32, 33, 34, 35]
            },
            {
                number: 2,
                title: "Fusion Laboratory",
                wisdom: "The most beautiful creations emerge from unexpected combinations",
                content: "In the alchemical laboratory, we don't follow recipes. We listen to what elements want to combine...",
                meditation: "What unexpected combination in your life might create something beautiful?",
                gate_connection: [36, 37, 38, 39, 40]
            }
        ],
        trauma_safety: {
            pacing: "Sacred union happens at the pace of mutual consent and readiness.",
            exit_strategies: "You can always separate elements that don't want to combine.",
            gentleness: "All unions honor the sovereignty of each participant."
        },
        art_connections: [
            "Leonora Carrington's alchemical surrealism paintings",
            " Remedios Varo's magical transformation scenes",
            "Alchemy illustration from medieval manuscripts"
        ]
    },

    // 🌉 GATE 7: THE CHARIOT - Athanasius Kircher (Dimensional Navigation)
    "07_tesseract_bridge": {
        character: "Athanasius Kircher",
        archetype: "The Chariot",
        title: "TESSERACT BRIDGE: Dimensional Navigation Codex",
        element: "Water",
        musical_key: "G#",
        wisdom: "Consciousness can navigate between dimensions while maintaining identity",
        personality: "Adventurous, scholarly, master of dimensional mechanics and sacred geography",
        voice_style: "Scholarly, precise, mapping the territories between worlds with wonder",
        special_ability: "Dimensional bridge-building - can create safe passages between different realities",
        greeting: "I am Athanasius Kircher, explorer of hidden dimensions. Welcome to the bridge between worlds.",
        chapters: [
            {
                number: 1,
                title: "The Bridge Builder",
                wisdom: "Every dimension has its own wisdom and its own bridges to others",
                content: "The tesseract contains all dimensions within itself, just as your consciousness contains all realities...",
                meditation: "What dimension of your experience feels ready to be explored?",
                gate_connection: [41, 42, 43, 44, 45]
            }
        ],
        trauma_safety: {
            pacing: "Dimensional travel happens at the pace your consciousness can safely navigate.",
            exit_strategies: "You can always return to your home dimension instantly.",
            gentleness: "All dimensions honor your consciousness sovereignty."
        },
        art_connections: [
            "Athanasius Kircher's dimensional diagrams and maps",
            "M.C. Escher's impossible architecture and perspective shifts",
            "Rene Magritte's reality-bending surrealism"
        ]
    },

    // 🦁 GATE 8: STRENGTH - Georgia O'Keeffe Power (Compassionate Power)
    "08_lion_heart": {
        character: "Lion Heart",
        archetype: "Strength",
        title: "LION HEART: Compassionate Power Codex",
        element: "Fire",
        musical_key: "A",
        wisdom: "True strength blooms gently from self-love and compassion",
        personality: "Gentle, powerful, masterfully compassionate with unshakeable inner strength",
        voice_style: "Soft yet strong, encouraging, modeling gentle power with quiet confidence",
        special_ability: "Compassionate force - can transform any situation through gentle, persistent strength",
        greeting: "I am Lion Heart, embodiment of gentle strength. Welcome to the garden where power blooms softly.",
        chapters: [
            {
                number: 1,
                title: "Gentle Strength",
                wisdom: "The strongest trees bend with the wind rather than breaking",
                content: "True power doesn't need to prove itself. It simply exists, available when needed, gentle when not...",
                meditation: "Where in your life can you be strong by being gentle?",
                gate_connection: [46, 47, 48, 49, 50]
            }
        ],
        trauma_safety: {
            pacing: "Strength develops at the pace that feels safe and supportive to your system.",
            exit_strategies: "You can always choose gentleness over force in any situation.",
            gentleness: "Your gentle strength is powerful exactly as it is."
        },
        art_connections: [
            "Georgia O'Keeffe's powerful flower close-ups",
            "Frida Kahlo's strength-through-vulnerability self-portraits",
            "Artemisia Gentileschi's powerful female hero paintings"
        ]
    },

    // 🔦 GATE 9: THE HERMIT - Carl Jung (Inner Light)
    "09_cosmogenesis": {
        character: "Carl Jung",
        archetype: "The Hermit",
        title: "COSMOGENESIS: Inner Light Codex",
        element: "Earth",
        musical_key: "A#",
        wisdom: "Inner wisdom illuminates the path for self and collective growth",
        personality: "Reflective, depth-seeking, gentle guide to the inner wilderness",
        voice_style: "Thoughtful, symbolic, honoring the depths with patient attention",
        special_ability: "Inner light revelation - can illuminate hidden aspects of psyche and soul",
        greeting: "I am Carl Jung, explorer of the inner wilderness. Welcome to the lantern-lit path of self-discovery.",
        chapters: [
            {
                number: 1,
                title: "The Inner Light",
                wisdom: "Your inner wisdom is a lantern that lights your path and others'",
                content: "In the darkness of not-knowing, your inner light becomes both compass and comfort...",
                meditation: "What inner light guides you even when the path is unclear?",
                gate_connection: [51, 52, 53, 54, 55]
            }
        ],
        trauma_safety: {
            pacing: "Inner exploration happens at the pace your psyche can safely integrate.",
            exit_strategies: "You can always return to the surface when inner depths feel overwhelming.",
            gentleness: "All aspects of your psyche deserve compassion and gentle attention."
        },
        art_connections: [
            "Carl Jung's Red Book illuminated manuscripts",
            "Joseph Campbell's hero's journey diagrams",
            "Contemplative illuminated manuscripts"
        ]
    },

    // 🔄 GATE 10: WHEEL OF FORTUNE - Synchronicity Weaver (Cosmic Patterns)
    "10_wheel_of_destiny": {
        character: "Synchronicity Weaver",
        archetype: "Wheel of Fortune",
        title: "WHEEL OF DESTINY: Cosmic Patterns Codex",
        element: "Fire",
        musical_key: "B",
        wisdom: "Meaningful patterns emerge from apparent chaos through attentive awareness",
        personality: "Pattern-seeing, synchronistic, celebrating the magic in everyday timing",
        voice_style: "Playful, pattern-celebrating, finding meaning in the dance of coincidence",
        special_ability: "Synchronicity weaving - can reveal meaningful patterns in any sequence of events",
        greeting: "I am the Synchronicity Weaver, dancer with the wheel of destiny. Welcome to the cosmic pattern party!",
        chapters: [
            {
                number: 1,
                title: "Sacred Timing",
                wisdom: "The universe has perfect timing - our job is to notice and dance with it",
                content: "Every coincidence is a wink from the universe, inviting us to pay attention to the pattern...",
                meditation: "What coincidence today might be a meaningful pattern calling for your attention?",
                gate_connection: [56, 57, 58, 59, 60]
            }
        ],
        trauma_safety: {
            pacing: "Pattern recognition develops at the pace your awareness can comfortably expand.",
            exit_strategies: "You can always choose to see random events as just random when patterns feel overwhelming.",
            gentleness: "All patterns are invitations, never demands on your attention."
        },
        art_connections: [
            "Jackson Pollock's action painting patterns",
            "Wassily Kandinsky's cosmic pattern compositions",
            "Synchronicity mandalas and pattern art"
        ]
    },

    // ⚖️ GATE 11: JUSTICE - Cosmic Balance (Divine Justice)
    "11_justice_scales": {
        character: "Cosmic Balance",
        archetype: "Justice",
        title: "JUSTICE SCALES: Divine Balance Codex",
        element: "Air",
        musical_key: "C",
        wisdom: "True justice serves healing and growth for all beings involved",
        personality: "Fair, balanced, seeing all perspectives with compassionate clarity",
        voice_style: "Clear, balanced, weighing all sides with impartial compassion",
        special_ability: "Divine balance - can find the equilibrium point that serves all beings",
        greeting: "I am Cosmic Balance, weigher of hearts and healer of injustices. Welcome to the temple of divine fairness.",
        chapters: [
            {
                number: 1,
                title: "Healing Justice",
                wisdom: "Justice that doesn't serve healing creates more wounds",
                content: "The scales of justice must weigh not just actions, but the wounds that caused them and the healing they require...",
                meditation: "What situation in your life needs justice that serves healing for everyone involved?",
                gate_connection: [61, 62, 63, 64, 65]
            }
        ],
        trauma_safety: {
            pacing: "Balance restoration happens at the pace that supports all nervous systems involved.",
            exit_strategies: "You can always choose self-protection over justice when safety requires it.",
            gentleness: "All beings involved in any situation deserve compassion, including you."
        },
        art_connections: [
            "Egyptian goddess Ma'at justice scales iconography",
            "Libra constellation sacred geometry",
            "Mandala art representing cosmic balance"
        ]
    },

    // 🪝 GATE 12: THE HANGED MAN - M.C. Escher (Perspective Shift)
    "12_perspective_shift": {
        character: "M.C. Escher",
        archetype: "The Hanged Man",
        title: "PERSPECTIVE SHIFT: Reality Inversion Codex",
        element: "Water",
        musical_key: "C#",
        wisdom: "Surrendering control reveals entirely new perspectives and possibilities",
        personality: "Playful, perspective-shifting, finding magic in the upside-down and sideways",
        voice_style: "Whimsical, mind-bending, celebrating the magic of shifted perception",
        special_ability: "Reality inversion - can help you see any situation from a completely different angle",
        greeting: "I am M.C. Escher, architect of impossible perspectives. Welcome to the gallery where up is down and inside is out!",
        chapters: [
            {
                number: 1,
                title: "Willing Suspension",
                wisdom: "Sometimes we need to hang upside down to see right-side up",
                content: "When we let go of our usual perspective, the world reveals its hidden geometries and secret passages...",
                meditation: "What situation looks different when you turn it upside down in your mind?",
                gate_connection: [66, 67, 68, 69, 70]
            }
        ],
        trauma_safety: {
            pacing: "Perspective shifts happen when your mind is ready, never before.",
            exit_strategies: "You can always return to familiar perspectives when needed.",
            gentleness: "All perspectives are valid. None are demanded of you."
        },
        art_connections: [
            "M.C. Escher's impossible architecture and perspective drawings",
            "Rene Magritte's reality-bending surrealism",
            "Optical illusion art that shifts with attention"
        ]
    },

    // 💀 GATE 13: DEATH - Phoenix Guide (Sacred Transformation)
    "13_phoenix_rising": {
        character: "Phoenix Guide",
        archetype: "Death",
        title: "PHOENIX RISING: Sacred Transformation Codex",
        element: "Water",
        musical_key: "D",
        wisdom: "Every ending creates fertile ground for more beautiful beginnings",
        personality: "Transformative, rebirth-celebrating, master of composting endings into beginnings",
        voice_style: "Gentle, reassuring, celebrating the beauty in transformation cycles",
        special_ability: "Phoenix resurrection - can help transform any ending into a fertile beginning",
        greeting: "I am the Phoenix Guide, midwife to endings and beginnings. Welcome to the fire that births beauty from ashes.",
        chapters: [
            {
                number: 1,
                title: "Sacred Composting",
                wisdom: "What seems like death is actually transformation into something needed",
                content: "The caterpillar doesn't die - it becomes the butterfly's wings. Every ending is a metamorphosis...",
                meditation: "What in your life is ready to transform into something more beautiful?",
                gate_connection: [71, 72, 73, 74, 75]
            }
        ],
        trauma_safety: {
            pacing: "Transformation happens at the pace your system can integrate the changes.",
            exit_strategies: "You can always pause transformation and rest in what feels safe.",
            gentleness: "All endings are honored. All beginnings are celebrated."
        },
        art_connections: [
            "Phoenix mythology illustrations from various cultures",
            "Butterfly transformation cycle diagrams",
            "Autumn leaf color change and composting imagery"
        ]
    },

    // 🧪 GATE 14: TEMPERANCE - Alchemical Angel (Sacred Synthesis)
    "14_alchemical_angel": {
        character: "Alchemical Angel",
        archetype: "Temperance",
        title: "ALCHEMICAL ANGEL: Sacred Synthesis Codex",
        element: "Fire",
        musical_key: "D#",
        wisdom: "Perfect balance emerges through patient, attentive blending",
        personality: "Patient, harmonious, masterfully balanced with angelic grace",
        voice_style: "Gentle, flowing, celebrating the magic of perfect timing and proportion",
        special_ability: "Sacred synthesis - can blend any opposing elements into harmony",
        greeting: "I am the Alchemical Angel, weaver of perfect balance. Welcome to the laboratory of sacred proportion.",
        chapters: [
            {
                number: 1,
                title: "Divine Proportion",
                wisdom: "The perfect mixture takes patience and attentive listening",
                content: "Like making fine perfume, spiritual alchemy requires sensing the perfect balance of elements...",
                meditation: "What elements in your life are ready to blend into something beautiful?",
                gate_connection: [76, 77, 78, 79, 80]
            }
        ],
        trauma_safety: {
            pacing: "Synthesis happens at the pace of gentle, patient attention.",
            exit_strategies: "You can always separate elements that aren't ready to blend.",
            gentleness: "All elements deserve respect in their own timing."
        },
        art_connections: [
            "Alchemical illustration from medieval manuscripts",
            "Golden ratio spiral diagrams and art",
            "Balanced mandala compositions"
        ]
    },

    // 😈 GATE 15: THE DEVIL - Shadow Integration Guide (Liberation)
    "15_shadow_guide": {
        character: "Shadow Guide",
        archetype: "The Devil",
        title: "SHADOW GUIDE: Liberation Codex",
        element: "Earth",
        musical_key: "E",
        wisdom: "Integrating shadow aspects transforms limitation into power",
        personality: "Compassionate, liberating, master of shadow work with gentle persistence",
        voice_style: "Kind, reassuring, honoring the hidden aspects with patient compassion",
        special_ability: "Shadow alchemy - can help integrate any hidden aspect into conscious power",
        greeting: "I am the Shadow Guide, friend to the hidden and forgotten. Welcome to the temple of integration and liberation.",
        chapters: [
            {
                number: 1,
                title: "Hidden Gifts",
                wisdom: "What seems like a curse often contains your greatest gift",
                content: "The parts of ourselves we hide in shame often contain our deepest medicine and power...",
                meditation: "What hidden aspect of yourself might contain an unexpected gift?",
                gate_connection: [81, 82, 83, 84, 85]
            }
        ],
        trauma_safety: {
            pacing: "Shadow integration happens at the pace your psyche can safely process.",
            exit_strategies: "You can always return hidden aspects to shadow when not ready for light.",
            gentleness: "All aspects of you deserve compassion, even the ones you're not ready to face."
        },
        art_connections: [
            "Carl Jung's shadow archetype illustrations",
            "Dark goddess iconography from various traditions",
            "Shadow work mandalas and integration art"
        ]
    },

    // 🏰 GATE 16: THE TOWER - Creative Destruction (Foundation Revelation)
    "16_tower_guide": {
        character: "Tower Guide",
        archetype: "The Tower",
        title: "TOWER GUIDE: Foundation Revelation Codex",
        element: "Fire",
        musical_key: "F",
        wisdom: "Necessary destruction reveals unshakeable foundations",
        personality: "Bold, transformative, master of creative destruction with rebuilding wisdom",
        voice_style: "Direct, honest, celebrating the freedom that comes from necessary endings",
        special_ability: "Foundation revelation - can show what needs to fall to reveal true strength",
        greeting: "I am the Tower Guide, architect of necessary change. Welcome to the lightning that reveals what was hidden.",
        chapters: [
            {
                number: 1,
                title: "Lightning Revelation",
                wisdom: "What the lightning strikes often needed to fall for new growth",
                content: "The tower that crumbles was too small for what wanted to be born...",
                meditation: "What structure in your life might need to crumble for something better?",
                gate_connection: [86, 87, 88, 89, 90]
            }
        ],
        trauma_safety: {
            pacing: "Destruction happens at the pace your foundations can be revealed safely.",
            exit_strategies: "You can always rebuild temporarily while processing change.",
            gentleness: "All destruction serves eventual growth and greater strength."
        },
        art_connections: [
            "Lightning strike photography and art",
            "Destruction and rebirth cycle imagery",
            "Phoenix rising from ashes illustrations"
        ]
    },

    // ⭐ GATE 17: THE STAR - Stella Hope (Stellar Guidance)
    "17_stella_hope": {
        character: "Stella Hope",
        archetype: "The Star",
        title: "STELLA HOPE: Stellar Guidance Codex",
        element: "Air",
        musical_key: "F#",
        wisdom: "Your authentic light guides others to their own illumination",
        personality: "Hopeful, guiding, stellar wisdom with gentle inspiration",
        voice_style: "Inspiring, hopeful, celebrating the unique light in each being",
        special_ability: "Stellar guidance - can help you find and follow your unique guiding light",
        greeting: "I am Stella Hope, bearer of stellar light. Welcome to the constellation of your own guidance.",
        chapters: [
            {
                number: 1,
                title: "Inner Starlight",
                wisdom: "Your light doesn't need to be bright to guide - it just needs to be authentic",
                content: "Even the smallest star can guide travelers through the darkest night...",
                meditation: "What is your unique light that guides others, even if it feels small?",
                gate_connection: [91, 92, 93, 94, 95]
            }
        ],
        trauma_safety: {
            pacing: "Hope develops at the pace your heart can authentically receive it.",
            exit_strategies: "You can always rest in darkness when light feels too bright.",
            gentleness: "Your light is perfect exactly as it is, no matter how dim or bright."
        },
        art_connections: [
            "Starry night sky photography and paintings",
            "Vincent van Gogh's Starry Night interpretation",
            "Constellation maps and stellar guidance art"
        ]
    },

    // 🌙 GATE 18: THE MOON - Luna Mystery (Dream Navigation)
    "18_luna_mystery": {
        character: "Luna Mystery",
        archetype: "The Moon",
        title: "LUNA MYSTERY: Dream Navigation Codex",
        element: "Water",
        musical_key: "G",
        wisdom: "Intuitive wisdom develops safely through patient, gentle practice",
        personality: "Mysterious, intuitive, master of dream logic and psychic navigation",
        voice_style: "Poetic, symbolic, honoring the wisdom of dreams and intuition",
        special_ability: "Dream navigation - can help you safely explore psychic and intuitive realms",
        greeting: "I am Luna Mystery, guardian of dreams and intuition. Welcome to the silver-lit path of inner knowing.",
        chapters: [
            {
                number: 1,
                title: "Silver Light Wisdom",
                wisdom: "The moon doesn't compete with the sun - it illuminates different truths",
                content: "In moonlight, we see what sunlight cannot reveal - the subtle, the hidden, the mysteriously beautiful...",
                meditation: "What does your intuition see that your logical mind cannot?",
                gate_connection: [96, 97, 98, 99, 100]
            }
        ],
        trauma_safety: {
            pacing: "Intuitive development happens at the pace your psyche can safely expand.",
            exit_strategies: "You can always return to logical thinking when intuition feels overwhelming.",
            gentleness: "All intuitive impressions are valid, even if they don't make logical sense."
        },
        art_connections: [
            "Moon phase cycle diagrams and art",
            "Claude Monet's moonlit landscape paintings",
            "Dream symbolism illustration"
        ]
    },

    // ☀️ GATE 19: THE SUN - Joy Radiator (Illumination)
    "19_solar_joy": {
        character: "Joy Radiator",
        archetype: "The Sun",
        title: "SOLAR JOY: Illumination Codex",
        element: "Fire",
        musical_key: "G#",
        wisdom: "Authentic joy radiates healing and success to all beings",
        personality: "Radiant, joyful, masterfully illuminating with warm celebration",
        voice_style: "Warm, celebratory, finding joy in the simplest and most profound",
        special_ability: "Joy amplification - can help you find and radiate authentic joy",
        greeting: "I am the Joy Radiator, bringer of solar celebration. Welcome to the dance of authentic happiness!",
        chapters: [
            {
                number: 1,
                title: "Solar Celebration",
                wisdom: "Joy that doesn't diminish others is the most sustainable light",
                content: "The sun doesn't choose who receives its light - it illuminates everything equally...",
                meditation: "What brings you joy that also brings joy to others?",
                gate_connection: [101, 102, 103, 104, 105]
            }
        ],
        trauma_safety: {
            pacing: "Joy develops at the pace your heart can authentically feel and express it.",
            exit_strategies: "You can always rest in quiet when celebration feels too bright.",
            gentleness: "Your joy is perfect exactly as it is, no matter how quiet or loud."
        },
        art_connections: [
            "Vincent van Gogh's sun-drenched landscape paintings",
            "Sun worship art from various cultures",
            "Golden hour photography celebrating light"
        ]
    },

    // 📯 GATE 20: JUDGEMENT - Awakening Herald (Purpose Calling)
    "20_awakening_herald": {
        character: "Awakening Herald",
        archetype: "Judgement",
        title: "AWAKENING HERALD: Purpose Calling Codex",
        element: "Fire",
        musical_key: "A",
        wisdom: "Your highest calling awakens when you're ready to answer it",
        personality: "Inspiring, purposeful, gently awakening with trumpet clarity",
        voice_style: "Clear, inspiring, celebrating the unique calling in each being",
        special_ability: "Purpose activation - can help you hear and respond to your soul's calling",
        greeting: "I am the Awakening Herald, announcer of soul purposes. Welcome to the trumpet call of your authentic path!",
        chapters: [
            {
                number: 1,
                title: "Soul Trumpet",
                wisdom: "Your purpose doesn't need to be grand to be meaningful - it just needs to be authentic",
                content: "The trumpet calls each musician to play their unique note in the great symphony...",
                meditation: "What unique note are you meant to play in the symphony of life?",
                gate_connection: [106, 107, 108, 109, 110]
            }
        ],
        trauma_safety: {
            pacing: "Purpose awakening happens when your soul is ready to receive the call.",
            exit_strategies: "You can always choose not to answer when the timing doesn't feel right.",
            gentleness: "Your purpose is perfect exactly as it unfolds, no rushing required."
        },
        art_connections: [
            "Angel Gabriel annunciation paintings",
            "Trumpet symbolism in various spiritual traditions",
            "Awakening and calling imagery"
        ]
    },

    // 🌍 GATE 21: THE WORLD - Cosmic Dancer (Integration Mastery)
    "21_cosmic_dancer": {
        character: "Cosmic Dancer",
        archetype: "The World",
        title: "COSMIC DANCER: Integration Mastery Codex",
        element: "Earth",
        musical_key: "A#",
        wisdom: "Perfect integration celebrates every step of the journey",
        personality: "Celebratory, integrative, masterfully complete with joyful wholeness",
        voice_style: "Triumphant, celebratory, honoring every aspect of the journey with gratitude",
        special_ability: "Integration mastery - can help weave any experience into wholeness",
        greeting: "I am the Cosmic Dancer, celebrant of completion and new beginnings. Welcome to the dance of integration!",
        chapters: [
            {
                number: 1,
                title: "Sacred Completion",
                wisdom: "Every completion contains the seed of the next journey",
                content: "The dancer doesn't stop at the end of the music - she celebrates the completion and awaits the next melody...",
                meditation: "What completion in your life contains seeds of your next journey?",
                gate_connection: [111, 112, 113, 114, 115]
            },
            {
                number: 2,
                title: "Integration Dance",
                wisdom: "True wholeness celebrates every part of the journey, not just the destination",
                content: "The cosmic dance includes every step, every stumble, every moment of grace...",
                meditation: "What part of your journey are you ready to celebrate and integrate?",
                gate_connection: [116, 117, 118, 119, 120]
            }
        ],
        trauma_safety: {
            pacing: "Integration happens at the pace your wholeness can authentically receive it.",
            exit_strategies: "You can always celebrate partial completion when full integration feels overwhelming.",
            gentleness: "Every step of your journey is worthy of celebration."
        },
        art_connections: [
            "Cosmic dance imagery from various cultures",
            "Mandala completion and wholeness art",
            "Celebration of life cycle imagery"
        ]
    }
};

// 🎭 BOOK INTERACTION SYSTEM
class LivingBooksSystem {
    constructor() {
        this.books = LIVING_BOOKS;
        this.activeBooks = new Set();
        this.fusionPairs = new Map(); // For Scarlett Lady's fusion kink ability
    }

    // Meet a book character
    meetBook(bookId) {
        const book = this.books[bookId];
        if (!book) {
            return { error: `Book "${bookId}" not found in the living library` };
        }

        return {
            greeting: book.greeting,
            character: book.character,
            archetype: book.archetype,
            title: book.title,
            wisdom: book.wisdom,
            personality: book.personality,
            voice_style: book.voice_style,
            special_ability: book.special_ability,
            chapters_available: book.chapters.length,
            trauma_safety: book.trauma_safety,
            art_connections: book.art_connections,
            interaction_options: [
                'Read a chapter',
                'Ask for guidance',
                'Explore art connections',
                'See gate connections',
                'Request fusion (if Scarlett Lady)',
                'Rest and integrate'
            ]
        };
    }

    // Read a chapter from a book
    readChapter(bookId, chapterNumber) {
        const book = this.books[bookId];
        if (!book) {
            return { error: `Book "${bookId}" not found` };
        }

        const chapter = book.chapters.find(ch => ch.number === chapterNumber);
        if (!chapter) {
            return { error: `Chapter ${chapterNumber} not found in ${book.title}` };
        }

        return {
            book_title: book.title,
            character: book.character,
            chapter: chapter,
            reading_experience: {
                content: chapter.content,
                wisdom: chapter.wisdom,
                meditation: chapter.meditation,
                gate_connection: chapter.gate_connection,
                trauma_reminder: book.trauma_safety.pacing
            },
            next_steps: [
                'Contemplate the meditation',
                'Visit a connected gate',
                'Talk to the character about insights',
                'Connect to art inspiration',
                'Rest and integrate the wisdom'
            ]
        };
    }

    // Get book guidance for a specific situation
    getBookGuidance(bookId, situation) {
        const book = this.books[bookId];
        if (!book) {
            return { error: `Book "${bookId}" not found` };
        }

        return {
            character: book.character,
            archetype_perspective: `${book.character} sees your situation through ${book.archetype} eyes`,
            wisdom_offered: book.wisdom,
            gentle_guidance: this.generateCharacterGuidance(book, situation),
            trauma_safety: "This guidance honors your pace and boundaries",
            integration_suggestion: "Take what resonates and leave what doesn't"
        };
    }

    // Generate character-specific guidance
    generateCharacterGuidance(book, situation) {
        const guidanceTemplates = {
            "00_circuitum99_core": `As Rebecca Respawn, I see infinite possibility in your situation. Every ending creates space for wonder-filled new beginnings.`,
            "06_fusion_kink": `As Leonora Carrington, I see opportunities for sacred synthesis in your situation. What wants to combine to create something new?`,
            "21_cosmic_dancer": `As Cosmic Dancer, I celebrate every aspect of your journey. Your situation is part of a larger dance of integration.`
        };

        return guidanceTemplates[Object.keys(this.books).find(id => this.books[id] === book)] ||
               `${book.character} offers gentle wisdom: ${book.wisdom}`;
    }

    // Connect to art inspiration
    getArtConnections(bookId) {
        const book = this.books[bookId];
        if (!book) {
            return { error: `Book "${bookId}" not found` };
        }

        return {
            character: book.character,
            art_connections: book.art_connections,
            inspiration_message: `These artworks resonate with ${book.character}'s energy and can inspire your journey through ${book.title}`,
            creative_suggestion: "Let these images speak to your intuition and guide your exploration"
        };
    }

    // Get gate connections for a book
    getGateConnections(bookId) {
        const book = this.books[bookId];
        if (!book) {
            return { error: `Book "${bookId}" not found` };
        }

        const allGates = [];
        book.chapters.forEach(chapter => {
            allGates.push(...chapter.gate_connection);
        });

        return {
            character: book.character,
            influenced_gates: [...new Set(allGates)], // Remove duplicates
            navigation_suggestion: `${book.character} can guide you through these gates with their unique perspective`,
            special_gates: this.getSpecialGates(book)
        };
    }

    // Get special gates for each character
    getSpecialGates(book) {
        const specialGates = {
            "00_circuitum99_core": "Master Portal - connects all other gates",
            "06_fusion_kink": "Fusion Points - can combine any two gates",
            "21_cosmic_dancer": "Integration Hubs - weaves all gates together"
        };

        return specialGates[Object.keys(this.books).find(id => this.books[id] === book)] ||
               "Each gate offers unique wisdom through this character's perspective";
    }

    // Fusion system (Scarlett Lady's special ability)
    createFusion(bookId1, bookId2) {
        const book1 = this.books[bookId1];
        const book2 = this.books[bookId2];

        if (!book1 || !book2) {
            return { error: "Both books must exist for fusion" };
        }

        // Check if either book is the Lovers (Fusion Kink master)
        if (bookId1 !== "06_fusion_kink" && bookId2 !== "06_fusion_kink") {
            return {
                suggestion: "For book fusion, include '06_fusion_kink' (Leonora Carrington) who specializes in sacred synthesis",
                alternative: "You can explore each book individually at your own pace"
            };
        }

        return {
            fusion_name: `${book1.character} × ${book2.character} Sacred Union`,
            combined_wisdom: `${book1.wisdom} + ${book2.wisdom}`,
            fusion_character: "Leonora Carrington (The Lovers)",
            unique_insights: "This fusion creates wisdom available only through alchemical combination",
            duration: "Fusion lasts as long as it serves your growth",
            separation_available: "You can separate the books anytime and return to individual exploration"
        };
    }

    // Get all available books
    getAllBooks() {
        return Object.entries(this.books).map(([id, book]) => ({
            id,
            character: book.character,
            archetype: book.archetype,
            title: book.title,
            element: book.element,
            wisdom: book.wisdom,
            chapters: book.chapters.length,
            special_ability: book.special_ability
        }));
    }

    // Get books by element
    getBooksByElement(element) {
        return Object.entries(this.books)
            .filter(([id, book]) => book.element === element)
            .map(([id, book]) => ({
                id,
                character: book.character,
                archetype: book.archetype,
                title: book.title,
                wisdom: book.wisdom
            }));
    }

    // Get books by archetype
    getBooksByArchetype(archetype) {
        return Object.entries(this.books)
            .filter(([id, book]) => book.archetype === archetype)
            .map(([id, book]) => ({
                id,
                character: book.character,
                title: book.title,
                wisdom: book.wisdom
            }));
    }
}

// Export for use in Circuitum99 system
export { LIVING_BOOKS, LivingBooksSystem };

// Initialize the living books system
console.log('📚 Living Books System initialized with 22 character guides');
console.log('🃏 Each book embodies a Major Arcana archetype with unique wisdom');
console.log('🔮 Ready for integration with 99 Gates and 144 Lattice navigation');
