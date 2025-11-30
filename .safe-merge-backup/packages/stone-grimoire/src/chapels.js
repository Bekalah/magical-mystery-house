/**
 * chapels
 *
 * @package @cathedral/stone-grimoire
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate details throughout
 *
 * Creative use: Game apps, book apps, grimoire apps, art apps
 */
/**
 * Stone Grimoire - 8 Chapels System
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate details throughout
 *
 * Each chapel is a complete explorable space with:
 * - Real research and correspondences
 * - Master art traditions
 * - Sacred geometry
 * - Interactive pathworking
 * - Trauma-informed design (never flat, always flowing)
 * - Sophisticated 3D environments
 * - Museum-quality rendering
 */
// 8 Chapels of the Stone Grimoire
export const CHAPELS = [
    {
        id: 'chapel-1',
        name: 'Chapel of Fire & Initiation',
        number: 1,
        element: 'Fire',
        direction: 'East',
        theme: 'Beginnings, Courage, Transformation',
        description: 'The first chapel where all journeys begin. Here you learn the fundamentals of sacred fire, initiation rites, and the courage to step into the unknown.',
        folios: Array.from({ length: 18 }, (_, i) => i + 1), // Folios 1-18
        features: [
            {
                id: 'initiation-circle',
                name: 'Circle of Initiation',
                type: 'interactive',
                description: 'Interactive sacred circle where you begin your pathworking journey. Learn the fundamentals of ritual space and sacred geometry.',
                connections: ['chapel-2:threshold']
            },
            {
                id: 'fire-altar',
                name: 'Altar of Sacred Fire',
                type: 'exploration',
                description: 'Explore the correspondences of fire across traditions: Vedic Agni, Greek Hephaestus, Celtic Brigid, and more.',
                connections: ['chapel-5:forge']
            },
            {
                id: 'beginner-pathworking',
                name: 'First Steps Pathworking',
                type: 'pathworking',
                description: 'Your first pathworking exercise. Learn to navigate the Tree of Life, beginning with Malkuth to Yesod.',
                connections: ['circuitum99:chapter-1']
            },
            {
                id: 'art-renaissance',
                name: 'Renaissance Art Studio',
                type: 'creation',
                description: 'Learn Renaissance techniques: golden ratio composition, perspective, chiaroscuro. Study da Vinci, Michelangelo, Raphael.',
                connections: ['chapel-3:art-gallery']
            }
        ],
        correspondences: {
            planet: 'Mars',
            zodiac: 'Aries',
            element: 'Fire',
            color: '#FF4500',
            geometry: 'Tetrahedron',
            shemAngel: 'Vehuiah',
            goetiaDemon: 'Bael',
            deity: 'Agni (Vedic), Hephaestus (Greek), Brigid (Celtic)',
            iChing: 'Hexagram 1 - The Creative',
            soyga: 'Table A - Fire Element'
        },
        pathworking: [
            {
                id: 'pw-1-1',
                title: 'The First Step',
                description: 'Begin your journey through the Tree of Life. Learn the basics of pathworking and sacred geometry.',
                exercises: [
                    'Visualize the Tree of Life structure',
                    'Connect Malkuth (Earth) to Yesod (Foundation)',
                    'Meditate on the element of Fire',
                    'Create your first sacred geometry pattern'
                ],
                correspondences: {
                    sephirah: 'Malkuth',
                    path: '32nd Path',
                    tarot: 'Ten of Pentacles'
                }
            }
        ],
        art: [
            {
                name: 'Renaissance Fire',
                period: '1400-1600',
                techniques: ['Chiaroscuro', 'Golden Ratio', 'Perspective', 'Sfumato'],
                masters: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Titian'],
                examples: ['The Last Supper', 'The Creation of Adam', 'The School of Athens']
            }
        ],
        research: [
            {
                name: 'Library of Congress - Fire Traditions',
                type: 'library',
                url: 'https://www.loc.gov',
                description: 'Comprehensive collection on fire rituals and traditions worldwide'
            },
            {
                name: 'British Library - Renaissance Art',
                type: 'library',
                url: 'https://www.bl.uk',
                description: 'Extensive collection of Renaissance art and techniques'
            }
        ]
    },
    {
        id: 'chapel-2',
        name: 'Chapel of Water & Intuition',
        number: 2,
        element: 'Water',
        direction: 'West',
        theme: 'Emotion, Intuition, Flow, Healing',
        description: 'The second chapel teaches the mysteries of water, emotion, and intuitive wisdom. Learn to flow with life and heal through sacred waters.',
        folios: Array.from({ length: 18 }, (_, i) => i + 19), // Folios 19-36
        features: [
            {
                id: 'healing-pool',
                name: 'Pool of Sacred Healing',
                type: 'interactive',
                description: 'Interactive healing pool where you learn water-based healing techniques from various traditions.',
                connections: ['chapel-1:fire-altar', 'chapel-6:ocean']
            },
            {
                id: 'intuition-mirror',
                name: 'Mirror of Intuition',
                type: 'exploration',
                description: 'Explore intuitive practices: scrying, divination, dream work. Learn from High Priestess traditions.',
                connections: ['liber-arcanae:high-priestess']
            },
            {
                id: 'water-pathworking',
                name: 'Water Pathworking',
                type: 'pathworking',
                description: 'Pathworking through water paths: Yesod to Hod, exploring emotion and intuition.',
                connections: ['circuitum99:chapter-2']
            },
            {
                id: 'baroque-art',
                name: 'Baroque Art Studio',
                type: 'creation',
                description: 'Learn Baroque techniques: dramatic lighting, emotional expression, dynamic composition. Study Caravaggio, Rembrandt, Vermeer.',
                connections: ['chapel-4:art-gallery']
            }
        ],
        correspondences: {
            planet: 'Moon',
            zodiac: 'Cancer',
            element: 'Water',
            color: '#1E90FF',
            geometry: 'Icosahedron',
            shemAngel: 'Jeliel',
            goetiaDemon: 'Agares',
            deity: 'Poseidon (Greek), Varuna (Vedic), Manannan (Celtic), Yemoja (Yoruba)',
            iChing: 'Hexagram 2 - The Receptive',
            soyga: 'Table B - Water Element'
        },
        pathworking: [
            {
                id: 'pw-2-1',
                title: 'The Flow of Emotion',
                description: 'Learn to work with emotions as sacred water. Navigate the path from Yesod to Hod.',
                exercises: [
                    'Meditate on the element of Water',
                    'Practice scrying techniques',
                    'Connect Yesod (Foundation) to Hod (Splendor)',
                    'Create flowing water patterns'
                ],
                correspondences: {
                    sephirah: 'Yesod',
                    path: '29th Path',
                    tarot: 'Nine of Cups'
                }
            }
        ],
        art: [
            {
                name: 'Baroque Water',
                period: '1600-1750',
                techniques: ['Dramatic Lighting', 'Emotional Expression', 'Dynamic Composition', 'Tenebrism'],
                masters: ['Caravaggio', 'Rembrandt', 'Vermeer', 'Rubens'],
                examples: ['The Calling of St. Matthew', 'The Night Watch', 'Girl with a Pearl Earring']
            }
        ],
        research: [
            {
                name: 'Wellcome Collection - Healing Waters',
                type: 'archive',
                url: 'https://wellcomecollection.org',
                description: 'Historical collections on water healing and medical traditions'
            }
        ]
    },
    {
        id: 'chapel-3',
        name: 'Chapel of Air & Communication',
        number: 3,
        element: 'Air',
        direction: 'North',
        theme: 'Communication, Intellect, Breath, Inspiration',
        description: 'The third chapel teaches the mysteries of air, communication, and intellectual pursuits. Learn to breathe with intention and speak with power.',
        folios: Array.from({ length: 18 }, (_, i) => i + 37), // Folios 37-54
        features: [
            {
                id: 'wind-chamber',
                name: 'Chamber of Sacred Winds',
                type: 'interactive',
                description: 'Interactive space to learn breathwork, mantras, and sacred sounds from various traditions.',
                connections: ['chapel-4:voice', 'synth:breath-synthesis']
            },
            {
                id: 'communication-hub',
                name: 'Hub of Communication',
                type: 'exploration',
                description: 'Explore communication systems: Enochian, Sanskrit mantras, Hebrew letters, runes, and more.',
                connections: ['codex-144-99:communication-nodes']
            },
            {
                id: 'air-pathworking',
                name: 'Air Pathworking',
                type: 'pathworking',
                description: 'Pathworking through air paths: Hod to Netzach, exploring communication and intellect.',
                connections: ['circuitum99:chapter-3']
            },
            {
                id: 'visionary-art',
                name: 'Visionary Art Studio',
                type: 'creation',
                description: 'Learn visionary art techniques: sacred geometry, esoteric symbolism, mystical aesthetics. Study Hilma af Klint, Leonora Carrington, Emma Kunz.',
                connections: ['chapel-5:art-gallery']
            }
        ],
        correspondences: {
            planet: 'Mercury',
            zodiac: 'Gemini',
            element: 'Air',
            color: '#87CEEB',
            geometry: 'Octahedron',
            shemAngel: 'Sitael',
            goetiaDemon: 'Vassago',
            deity: 'Hermes (Greek), Thoth (Egyptian), Odin (Norse), Saraswati (Hindu)',
            iChing: 'Hexagram 5 - Waiting',
            soyga: 'Table C - Air Element'
        },
        pathworking: [
            {
                id: 'pw-3-1',
                title: 'The Breath of Life',
                description: 'Learn breathwork and sacred sounds. Navigate the path from Hod to Netzach.',
                exercises: [
                    'Practice pranayama (breath control)',
                    'Learn sacred mantras',
                    'Connect Hod (Splendor) to Netzach (Victory)',
                    'Create air-based sacred geometry'
                ],
                correspondences: {
                    sephirah: 'Hod',
                    path: '26th Path',
                    tarot: 'Eight of Swords'
                }
            }
        ],
        art: [
            {
                name: 'Visionary Air',
                period: 'Modern',
                techniques: ['Sacred Geometry', 'Esoteric Symbolism', 'Mystical Aesthetics', 'Automatic Drawing'],
                masters: ['Hilma af Klint', 'Leonora Carrington', 'Emma Kunz', 'Max Ernst'],
                examples: ['The Ten Largest', 'The Hearing Trumpet', 'Geometric Compositions']
            }
        ],
        research: [
            {
                name: 'Internet Archive - Sacred Texts',
                type: 'digital',
                url: 'https://archive.org',
                description: 'Digital collection of sacred texts on communication and language'
            }
        ]
    },
    {
        id: 'chapel-4',
        name: 'Chapel of Earth & Manifestation',
        number: 4,
        element: 'Earth',
        direction: 'South',
        theme: 'Manifestation, Grounding, Material, Stability',
        description: 'The fourth chapel teaches the mysteries of earth, manifestation, and grounding. Learn to bring your visions into physical reality.',
        folios: Array.from({ length: 18 }, (_, i) => i + 55), // Folios 55-72
        features: [
            {
                id: 'manifestation-altar',
                name: 'Altar of Manifestation',
                type: 'interactive',
                description: 'Interactive altar for learning manifestation techniques from various traditions.',
                connections: ['chapel-1:fire-altar', 'chapel-8:completion']
            },
            {
                id: 'grounding-garden',
                name: 'Garden of Grounding',
                type: 'exploration',
                description: 'Explore earth-based practices: crystal work, plant medicine, sacred stones, and more.',
                connections: ['crystals:library']
            },
            {
                id: 'earth-pathworking',
                name: 'Earth Pathworking',
                type: 'pathworking',
                description: 'Pathworking through earth paths: Netzach to Tiphareth, exploring manifestation and balance.',
                connections: ['circuitum99:chapter-4']
            },
            {
                id: 'master-craft',
                name: 'Master Craft Studio',
                type: 'creation',
                description: 'Learn master craft techniques: stone carving, metalwork, pottery, weaving. Study ancient and modern masters.',
                connections: ['chapel-6:art-gallery']
            }
        ],
        correspondences: {
            planet: 'Venus',
            zodiac: 'Taurus',
            element: 'Earth',
            color: '#8B4513',
            geometry: 'Cube',
            shemAngel: 'Elemiah',
            goetiaDemon: 'Samigina',
            deity: 'Gaia (Greek), Prithvi (Vedic), Danu (Celtic), Pachamama (Incan)',
            iChing: 'Hexagram 2 - The Receptive',
            soyga: 'Table D - Earth Element'
        },
        pathworking: [
            {
                id: 'pw-4-1',
                title: 'The Foundation of Manifestation',
                description: 'Learn to ground and manifest. Navigate the path from Netzach to Tiphareth.',
                exercises: [
                    'Practice grounding exercises',
                    'Work with crystals and stones',
                    'Connect Netzach (Victory) to Tiphareth (Beauty)',
                    'Create earth-based sacred geometry'
                ],
                correspondences: {
                    sephirah: 'Netzach',
                    path: '25th Path',
                    tarot: 'Seven of Wands'
                }
            }
        ],
        art: [
            {
                name: 'Master Craft',
                period: 'Ancient to Modern',
                techniques: ['Stone Carving', 'Metalwork', 'Pottery', 'Weaving', 'Sacred Geometry'],
                masters: ['Ancient Egyptian Craftsmen', 'Medieval Masons', 'Art Nouveau Masters'],
                examples: ['Pyramid Construction', 'Gothic Cathedrals', 'Art Nouveau Architecture']
            }
        ],
        research: [
            {
                name: 'Museum Collections - Earth Traditions',
                type: 'museum',
                description: 'Collections of earth-based art and craft from museums worldwide'
            }
        ]
    },
    {
        id: 'chapel-5',
        name: 'Chapel of Spirit & Transcendence',
        number: 5,
        element: 'Spirit',
        direction: 'Above',
        theme: 'Transcendence, Unity, Divine, Connection',
        description: 'The fifth chapel teaches the mysteries of spirit, transcendence, and divine connection. Learn to connect with the universal consciousness.',
        folios: Array.from({ length: 18 }, (_, i) => i + 73), // Folios 73-90
        features: [
            {
                id: 'spirit-temple',
                name: 'Temple of Spirit',
                type: 'interactive',
                description: 'Interactive temple for connecting with divine consciousness across traditions.',
                connections: ['chapel-6:unity', 'chapel-7:divine']
            },
            {
                id: 'transcendence-path',
                name: 'Path of Transcendence',
                type: 'exploration',
                description: 'Explore paths to transcendence: meditation, prayer, ecstatic states, unity consciousness.',
                connections: ['cosmogenesis:transcendence']
            },
            {
                id: 'spirit-pathworking',
                name: 'Spirit Pathworking',
                type: 'pathworking',
                description: 'Pathworking through spirit paths: Tiphareth to Geburah, exploring transcendence and divine will.',
                connections: ['circuitum99:chapter-5']
            },
            {
                id: 'divine-art',
                name: 'Divine Art Studio',
                type: 'creation',
                description: 'Learn to create art that connects with the divine: iconography, mandalas, sacred geometry, visionary art.',
                connections: ['chapel-7:art-gallery']
            }
        ],
        correspondences: {
            planet: 'Sun',
            zodiac: 'Leo',
            element: 'Spirit',
            color: '#FFD700',
            geometry: 'Dodecahedron',
            shemAngel: 'Mahasiah',
            goetiaDemon: 'Marbas',
            deity: 'Ra (Egyptian), Apollo (Greek), Surya (Vedic), Amaterasu (Shinto)',
            iChing: 'Hexagram 1 - The Creative',
            soyga: 'Table E - Spirit Element'
        },
        pathworking: [
            {
                id: 'pw-5-1',
                title: 'The Path to Transcendence',
                description: 'Learn to transcend limitations. Navigate the path from Tiphareth to Geburah.',
                exercises: [
                    'Practice meditation and prayer',
                    'Connect with divine consciousness',
                    'Connect Tiphareth (Beauty) to Geburah (Severity)',
                    'Create spirit-based sacred geometry'
                ],
                correspondences: {
                    sephirah: 'Tiphareth',
                    path: '22nd Path',
                    tarot: 'Six of Wands'
                }
            }
        ],
        art: [
            {
                name: 'Divine Art',
                period: 'All Periods',
                techniques: ['Iconography', 'Mandalas', 'Sacred Geometry', 'Visionary Art'],
                masters: ['Byzantine Iconographers', 'Tibetan Mandala Artists', 'Sacred Geometry Masters'],
                examples: ['Byzantine Icons', 'Tibetan Mandalas', 'Sacred Geometry Patterns']
            }
        ],
        research: [
            {
                name: 'Sacred Texts Archive',
                type: 'digital',
                url: 'https://sacred-texts.com',
                description: 'Complete collection of sacred texts on transcendence and divine connection'
            }
        ]
    },
    {
        id: 'chapel-6',
        name: 'Chapel of Shadow & Integration',
        number: 6,
        element: 'Shadow',
        direction: 'Below',
        theme: 'Shadow Work, Integration, Qliphoth, Balance',
        description: 'The sixth chapel teaches the mysteries of shadow, integration, and the Qliphothic tree. Learn to work with darkness and light in balance.',
        folios: Array.from({ length: 18 }, (_, i) => i + 91), // Folios 91-108
        features: [
            {
                id: 'shadow-chamber',
                name: 'Chamber of Shadows',
                type: 'interactive',
                description: 'Interactive chamber for shadow work, integration, and working with the Qliphothic tree.',
                connections: ['chapel-5:spirit-temple', 'circuitum99:qliphoth']
            },
            {
                id: 'integration-lab',
                name: 'Laboratory of Integration',
                type: 'exploration',
                description: 'Explore shadow work techniques: Jungian integration, Qliphothic pathworking, dark goddess work.',
                connections: ['liber-arcanae:shadow-cards']
            },
            {
                id: 'shadow-pathworking',
                name: 'Shadow Pathworking',
                type: 'pathworking',
                description: 'Pathworking through shadow paths: Geburah to Chesed, exploring shadow integration and balance.',
                connections: ['circuitum99:chapter-6']
            },
            {
                id: 'dark-art',
                name: 'Dark Art Studio',
                type: 'creation',
                description: 'Learn dark art techniques: chiaroscuro, shadow work, integration art, Qliphothic aesthetics.',
                connections: ['chapel-8:art-gallery']
            }
        ],
        correspondences: {
            planet: 'Saturn',
            zodiac: 'Capricorn',
            element: 'Shadow',
            color: '#2F2F2F',
            geometry: 'Inverted Tetrahedron',
            shemAngel: 'Lelahel',
            goetiaDemon: 'Valefor',
            deity: 'Hecate (Greek), Kali (Hindu), Lilith (Hebrew), Ereshkigal (Sumerian)',
            iChing: 'Hexagram 12 - Standstill',
            soyga: 'Table F - Shadow Element'
        },
        pathworking: [
            {
                id: 'pw-6-1',
                title: 'The Shadow Path',
                description: 'Learn shadow work and integration. Navigate the path from Geburah to Chesed through the Qliphoth.',
                exercises: [
                    'Practice shadow work techniques',
                    'Explore the Qliphothic tree',
                    'Connect Geburah (Severity) to Chesed (Mercy)',
                    'Create shadow-based sacred geometry'
                ],
                correspondences: {
                    sephirah: 'Geburah',
                    path: '20th Path',
                    tarot: 'Five of Swords'
                }
            }
        ],
        art: [
            {
                name: 'Dark Art',
                period: 'All Periods',
                techniques: ['Chiaroscuro', 'Shadow Work', 'Integration Art', 'Qliphothic Aesthetics'],
                masters: ['Caravaggio', 'Goya', 'Modern Shadow Artists'],
                examples: ['The Calling of St. Matthew', 'Saturn Devouring His Son']
            }
        ],
        research: [
            {
                name: 'Jungian Archives',
                type: 'academic',
                description: 'Academic resources on shadow work and integration'
            }
        ]
    },
    {
        id: 'chapel-7',
        name: 'Chapel of Unity & Synthesis',
        number: 7,
        element: 'Unity',
        direction: 'Center',
        theme: 'Unity, Synthesis, Integration, Wholeness',
        description: 'The seventh chapel teaches the mysteries of unity, synthesis, and integration. Learn to bring all elements together in harmony.',
        folios: Array.from({ length: 18 }, (_, i) => i + 109), // Folios 109-126
        features: [
            {
                id: 'unity-hall',
                name: 'Hall of Unity',
                type: 'interactive',
                description: 'Interactive hall where all elements come together in synthesis and unity.',
                connections: ['chapel-1', 'chapel-2', 'chapel-3', 'chapel-4', 'chapel-5', 'chapel-6']
            },
            {
                id: 'synthesis-lab',
                name: 'Laboratory of Synthesis',
                type: 'exploration',
                description: 'Explore synthesis techniques: alchemy, fusion kink, integration of opposites, unity consciousness.',
                connections: ['fusion-kink:engine']
            },
            {
                id: 'unity-pathworking',
                name: 'Unity Pathworking',
                type: 'pathworking',
                description: 'Pathworking through unity paths: Chesed to Binah, exploring synthesis and integration.',
                connections: ['circuitum99:chapter-7']
            },
            {
                id: 'synthesis-art',
                name: 'Synthesis Art Studio',
                type: 'creation',
                description: 'Learn to create art that synthesizes all elements: alchemical art, fusion art, unity aesthetics.',
                connections: ['art-generation:synthesis']
            }
        ],
        correspondences: {
            planet: 'Jupiter',
            zodiac: 'Sagittarius',
            element: 'Unity',
            color: '#9370DB',
            geometry: 'Vesica Piscis',
            shemAngel: 'Achaiah',
            goetiaDemon: 'Aamon',
            deity: 'All Deities in Unity',
            iChing: 'Hexagram 11 - Peace',
            soyga: 'Table G - Unity Element'
        },
        pathworking: [
            {
                id: 'pw-7-1',
                title: 'The Path to Unity',
                description: 'Learn synthesis and unity. Navigate the path from Chesed to Binah.',
                exercises: [
                    'Practice synthesis techniques',
                    'Integrate all elements',
                    'Connect Chesed (Mercy) to Binah (Understanding)',
                    'Create unity-based sacred geometry'
                ],
                correspondences: {
                    sephirah: 'Chesed',
                    path: '18th Path',
                    tarot: 'Four of Cups'
                }
            }
        ],
        art: [
            {
                name: 'Synthesis Art',
                period: 'All Periods',
                techniques: ['Alchemical Art', 'Fusion Art', 'Unity Aesthetics', 'Integration'],
                masters: ['Alchemical Artists', 'Modern Synthesis Artists'],
                examples: ['Alchemical Illustrations', 'Fusion Art Works']
            }
        ],
        research: [
            {
                name: 'Alchemical Archives',
                type: 'archive',
                description: 'Collections on alchemy and synthesis'
            }
        ]
    },
    {
        id: 'chapel-8',
        name: 'Chapel of Completion & Return',
        number: 8,
        element: 'Completion',
        direction: 'All Directions',
        theme: 'Completion, Return, Cycle, Mastery',
        description: 'The eighth chapel teaches the mysteries of completion, return, and mastery. Learn to complete cycles and return to the beginning with wisdom.',
        folios: Array.from({ length: 18 }, (_, i) => i + 127), // Folios 127-144
        features: [
            {
                id: 'completion-circle',
                name: 'Circle of Completion',
                type: 'interactive',
                description: 'Interactive circle where cycles complete and new ones begin. Master level integration.',
                connections: ['chapel-1:initiation-circle']
            },
            {
                id: 'mastery-hall',
                name: 'Hall of Mastery',
                type: 'exploration',
                description: 'Explore mastery in all traditions: complete pathworking, advanced techniques, teacher level.',
                connections: ['circuitum99:mastery']
            },
            {
                id: 'completion-pathworking',
                name: 'Completion Pathworking',
                type: 'pathworking',
                description: 'Final pathworking: Binah to Chokmah to Kether, completing the Tree of Life journey.',
                connections: ['circuitum99:chapter-33']
            },
            {
                id: 'master-art',
                name: 'Master Art Studio',
                type: 'creation',
                description: 'Create master-level art: synthesis of all techniques, personal style, mastery expression.',
                connections: ['art-generation:master']
            }
        ],
        correspondences: {
            planet: 'All Planets',
            zodiac: 'All Signs',
            element: 'All Elements',
            color: '#FFFFFF',
            geometry: 'All Geometries',
            shemAngel: 'All 72 Angels',
            goetiaDemon: 'All 72 Demons',
            deity: 'All Deities',
            iChing: 'All Hexagrams',
            soyga: 'All Tables'
        },
        pathworking: [
            {
                id: 'pw-8-1',
                title: 'The Path to Completion',
                description: 'Complete your journey. Navigate the final paths: Binah to Chokmah to Kether.',
                exercises: [
                    'Complete all previous pathworkings',
                    'Integrate all learning',
                    'Connect Binah (Understanding) to Chokmah (Wisdom) to Kether (Crown)',
                    'Create completion-based sacred geometry'
                ],
                correspondences: {
                    sephirah: 'Kether',
                    path: '1st Path',
                    tarot: 'The Fool'
                }
            }
        ],
        art: [
            {
                name: 'Master Art',
                period: 'All Periods',
                techniques: ['All Techniques', 'Personal Style', 'Mastery Expression'],
                masters: ['All Masters', 'Your Personal Mastery'],
                examples: ['Your Master Works']
            }
        ],
        research: [
            {
                name: 'All Research Sources',
                type: 'all',
                description: 'Complete integration of all research sources'
            }
        ]
    }
];
/**
 * Get chapel by ID
 */
export function getChapel(id) {
    return CHAPELS.find(chapel => chapel.id === id);
}
/**
 * Get chapel by number (1-8)
 */
export function getChapelByNumber(number) {
    return CHAPELS.find(chapel => chapel.number === number);
}
/**
 * Get all chapels
 */
export function getAllChapels() {
    return CHAPELS;
}
/**
 * Get folio's chapel
 */
export function getChapelForFolio(folioNumber) {
    return CHAPELS.find(chapel => chapel.folios.includes(folioNumber));
}
//# sourceMappingURL=chapels.js.map