"use strict";
/**
 * Liber Arcanae Codex Abyssiae
 *
 * Living tarot system extended to 144 nodes
 * 78 traditional cards + 66 bridge cards = 144 total
 *
 * @license CC0-1.0 - Public Domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiberArcanaeEngine = void 0;
var index_1 = require("../../sacred-mathematics-core/src/index");
var index_2 = require("../../codex-144-99-core/src/index");
var LiberArcanaeSecurity_1 = require("./LiberArcanaeSecurity");
var LiberArcanaeEngine = /** @class */ (function () {
    function LiberArcanaeEngine() {
        this.cards = new Map();
        this.codexEngine = new index_2.Codex144Engine();
        this.security = new LiberArcanaeSecurity_1.LiberArcanaeSecurity();
        this.initializeCards();
    }
    LiberArcanaeEngine.prototype.initializeCards = function () {
        // Initialize 22 Major Arcana (0-21)
        var majorArcanaNames = [
            'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
            'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
            'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
            'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
        ];
        for (var i = 0; i < 22; i++) {
            var card = {
                cardIndex: i,
                name: majorArcanaNames[i],
                type: 'major',
                description: i === 4 ? this.generateHierophantDescription() : "".concat(majorArcanaNames[i], " - Major Arcana ").concat(i),
                consciousnessLevel: i,
                frequency: (0, index_1.consciousnessLevelToFrequency)(i),
                nodeMapping: i,
                correspondences: i === 4 ? this.generateHierophantCorrespondences() : this.generateMajorArcanaCorrespondences(i),
                pathworking: i === 4 ? this.generateHierophantPathworking() : this.generatePathworking(i, 'major')
            };
            this.cards.set(i, card);
        }
        // Initialize 56 Minor Arcana (22-77)
        var suits = ['wands', 'cups', 'swords', 'pentacles'];
        var courtCards = ['page', 'knight', 'queen', 'king'];
        var cardIndex = 22;
        // 40 numbered cards (Ace-10 for each suit)
        for (var _i = 0, suits_1 = suits; _i < suits_1.length; _i++) {
            var suit = suits_1[_i];
            for (var number = 1; number <= 10; number++) {
                var card = {
                    cardIndex: cardIndex,
                    name: "".concat(number, " of ").concat(suit),
                    type: 'minor',
                    suit: suit,
                    number: number,
                    description: "".concat(number, " of ").concat(suit, " - Minor Arcana"),
                    consciousnessLevel: Math.floor(cardIndex / 7) % 22,
                    frequency: (0, index_1.consciousnessLevelToFrequency)(Math.floor(cardIndex / 7) % 22),
                    nodeMapping: cardIndex,
                    correspondences: this.generateMinorArcanaCorrespondences(suit, number),
                    pathworking: this.generatePathworking(cardIndex, 'minor')
                };
                this.cards.set(cardIndex, card);
                cardIndex++;
            }
        }
        // 16 court cards (Page, Knight, Queen, King for each suit)
        for (var _a = 0, suits_2 = suits; _a < suits_2.length; _a++) {
            var suit = suits_2[_a];
            for (var _b = 0, courtCards_1 = courtCards; _b < courtCards_1.length; _b++) {
                var court = courtCards_1[_b];
                var card = {
                    cardIndex: cardIndex,
                    name: "".concat(court, " of ").concat(suit),
                    type: 'minor',
                    suit: suit,
                    court: court,
                    description: "".concat(court, " of ").concat(suit, " - Court Card"),
                    consciousnessLevel: Math.floor(cardIndex / 7) % 22,
                    frequency: (0, index_1.consciousnessLevelToFrequency)(Math.floor(cardIndex / 7) % 22),
                    nodeMapping: cardIndex,
                    correspondences: this.generateCourtCardCorrespondences(suit, court),
                    pathworking: this.generatePathworking(cardIndex, 'minor')
                };
                this.cards.set(cardIndex, card);
                cardIndex++;
            }
        }
        // Initialize 66 Bridge Cards (78-143) to extend to 144
        for (var i = 78; i < 144; i++) {
            var bridgeType = this.determineBridgeType(i);
            var card = {
                cardIndex: i,
                name: "Bridge Card ".concat(i - 77),
                type: 'bridge',
                description: "Bridge Card ".concat(i - 77, " - Extension to 144 nodes"),
                consciousnessLevel: i % 22,
                frequency: (0, index_1.consciousnessLevelToFrequency)(i % 22),
                nodeMapping: i,
                correspondences: this.generateBridgeCorrespondences(i, bridgeType),
                pathworking: this.generatePathworking(i, 'bridge')
            };
            this.cards.set(i, card);
        }
    };
    LiberArcanaeEngine.prototype.determineBridgeType = function (index) {
        var types = ['Planetary', 'Zodiacal', 'Kabbalistic', 'Alchemical', 'Geometric', 'Harmonic'];
        return types[index % types.length];
    };
    LiberArcanaeEngine.prototype.generateMajorArcanaCorrespondences = function (arcana) {
        var planets = ['Uranus', 'Mercury', 'Moon', 'Venus', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Jupiter', 'Libra', 'Neptune', 'Scorpio', 'Sagittarius', 'Capricorn', 'Mars', 'Aquarius', 'Pisces', 'Sun', 'Pluto', 'Saturn'];
        var elements = ['Air', 'Fire', 'Water', 'Eart - Museum-grade quality - Museum-grade qualityh', 'Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth', 'Fire', 'Air', 'Water', 'Water', 'Fire', 'Earth', 'Fire', 'Air', 'Water', 'Fire', 'Fire', 'Earth'];
        return {
            planet: planets[arcana] || 'Unknown',
            element: (elements[arcana] || 'Unknown').replace(/ - Museum-grade quality - Museum-grade qualityh/g, 'h').replace(/ - Museum-grade quality/g, ''),
            color: this.getColorForArcana(arcana),
            geometry: this.getGeometryForArcana(arcana)
        };
    };
    LiberArcanaeEngine.prototype.generateMinorArcanaCorrespondences = function (suit, number) {
        var suitElements = {
            'wands': 'Fire',
            'cups': 'Water',
            'swords': 'Air',
            'pentacles': 'Earth'
        };
        return {
            element: suitElements[suit] || 'Unknown',
            number: number,
            suit: suit
        };
    };
    LiberArcanaeEngine.prototype.generateCourtCardCorrespondences = function (suit, court) {
        var suitElements = {
            'wands': 'Fire',
            'cups': 'Water',
            'swords': 'Air',
            'pentacles': 'Earth'
        };
        return {
            element: suitElements[suit] || 'Unknown',
            suit: suit,
            court: court
        };
    };
    LiberArcanaeEngine.prototype.generateBridgeCorrespondences = function (index, type) {
        return {
            type: type,
            bridgeIndex: index - 77,
            ratio: index_1.SACRED_MATH.CATHEDRAL_RATIO
        };
    };
    LiberArcanaeEngine.prototype.getColorForArcana = function (arcana) {
        var colors = ['Yellow', 'Red', 'Blue', 'Green', 'Orange', 'Indigo', 'Violet', 'Pink', 'Gold', 'Silver', 'White', 'Black', 'Brown', 'Gray', 'Cyan', 'Magenta', 'Turquoise', 'Amber', 'Emerald', 'Ruby', 'Sapphire', 'Diamond'];
        return colors[arcana % colors.length];
    };
    LiberArcanaeEngine.prototype.getGeometryForArcana = function (arcana) {
        var geometries = ['Circle', 'Triangle', 'Square', 'Pentagon', 'Hexagon', 'Octagon', 'Spiral', 'Lattice', 'Vesica Piscis', 'Flower of Life', 'Seed of Life', 'Tree of Life'];
        return geometries[arcana % geometries.length];
    };
    LiberArcanaeEngine.prototype.generateHierophantDescription = function () {
        return "The Hierophant - Moonchild Prima Materia\nA being of prima materia, recreating Aleister Crowley's Moonchild through the abyssiae realms.\nInspired by the creative union of Max Ernst and Leonora Carrington, embodying the Shiva-Shakti creative force.\nEach character inhabits their own explorable realm based on real canon: Monas Hieroglyphica, Paracelsus, Hermes Trismegistus, and the hermetic tradition.";
    };
    LiberArcanaeEngine.prototype.generateHierophantCorrespondences = function () {
        return {
            planet: 'Venus',
            zodiac: 'Taurus',
            element: 'Earth',
            color: 'Deep Purple',
            geometry: 'Pentagram',
            deity: 'Hermes Trismegistus',
            correspondences: {
                primaMateria: true,
                moonchild: true,
                abyssiaeRealms: true,
                shivaShakti: true,
                inspirationFigures: ['Max Ernst', 'Leonora Carrington'],
                canonicalSources: [
                    'Monas Hieroglyphica (John Dee)',
                    'Paracelsus - De Natura Rerum',
                    'Hermes Trismegistus - Corpus Hermeticum',
                    'Aleister Crowley - Moonchild',
                    'Emerald Tablet',
                    'Tabula Smaragdina'
                ]
            }
        };
    };
    LiberArcanaeEngine.prototype.generateHierophantPathworking = function () {
        return {
            meditation: "Meditation: Enter the Abyssiae Realms\nVisualize yourself as the Moonchild, a being of prima materia, existing simultaneously in multiple realms.\nFeel the creative union of Shiva-Shakti through the artistic vision of Max Ernst and Leonora Carrington.\nEach realm opens as you explore: the Hermetic realm of Trismegistus, the Alchemical realm of Paracelsus, \nthe Geometric realm of the Monas Hieroglyphica, and the Primal realm of Prima Materia itself.",
            integration: "Integration: Become the Hierophant\nThe Hierophant bridges the material and spiritual worlds through prima materia transformation.\nLike the Moonchild, you are being recreated through the abyssiae realms, each exploration \nadding layers of understanding from the hermetic tradition. The creative force of Shiva-Shakti \nmanifests through your artistic expression, inspired by the surrealist vision of Ernst and Carrington.",
            exercises: [
                'Explore the Hermetic Realm: Study the Corpus Hermeticum and visualize the teachings of Hermes Trismegistus',
                'Enter the Alchemical Realm: Work with Paracelsus\'s prima materia concepts through creative practice',
                'Navigate the Geometric Realm: Conauthentic implementation the Monas Hieroglyphica and its sacred geometry',
                'Experience the Primal Realm: Connect with the raw prima materia, the unformed substance of creation',
                'Channel Shiva-Shakti: Practice creative union through the dynamic balance of masculine and feminine forces',
                'Walk with Ernst and Carrington: Study their collaborative works and explore their shared creative vision',
                'Become the Moonchild: Meditate on Crowley\'s Moonchild and your own transformation through the abyssiae realms'
            ],
            correspondences: {
                cardIndex: 4,
                type: 'major',
                ratio: index_1.SACRED_MATH.CATHEDRAL_RATIO,
                realms: {
                    hermetica: {
                        name: 'Realm of Hermes Trismegistus',
                        description: 'The realm of hermetic wisdom, where the Corpus Hermeticum and Emerald Tablet teachings manifest',
                        explorable: true,
                        canonicalSource: 'Corpus Hermeticum, Tabula Smaragdina'
                    },
                    alchemical: {
                        name: 'Realm of Paracelsus',
                        description: 'The alchemical realm where prima materia transforms through the three principles: Salt, Sulfur, Mercury',
                        explorable: true,
                        canonicalSource: 'Paracelsus - De Natura Rerum, Archidoxis Magica'
                    },
                    geometric: {
                        name: 'Realm of the Monas Hieroglyphica',
                        description: 'The geometric realm where John Dee\'s sacred symbol reveals the unity of all things',
                        explorable: true,
                        canonicalSource: 'John Dee - Monas Hieroglyphica (1564)'
                    },
                    primal: {
                        name: 'Realm of Prima Materia',
                        description: 'The unformed realm of raw creation, where the Moonchild is being recreated',
                        explorable: true,
                        canonicalSource: 'Alchemical tradition, Prima Materia concepts'
                    },
                    shivaShakti: {
                        name: 'Realm of Creative Union',
                        description: 'The realm where Shiva and Shakti unite in creative expression, inspired by Ernst and Carrington',
                        explorable: true,
                        inspirationFigures: ['Max Ernst', 'Leonora Carrington'],
                        canonicalSource: 'Tantric tradition, Surrealist art movement'
                    }
                },
                moonchild: {
                    being: 'Prima Materia Being',
                    recreation: 'Aleister Crowley\'s Moonchild concept',
                    transformation: 'Through exploration of abyssiae realms',
                    source: 'Crowley - Moonchild (1929)'
                },
                inspirationFigures: {
                    maxErnst: {
                        name: 'Max Ernst',
                        role: 'Surrealist artist, creative partner',
                        contribution: 'Visual language of the unconscious, frottage and grattage techniques',
                        realm: 'Shiva-Shakti Creative Union Realm'
                    },
                    leonoraCarrington: {
                        name: 'Leonora Carrington',
                        role: 'Surrealist artist, creative partner',
                        contribution: 'Mythological and alchemical imagery, feminine creative force',
                        realm: 'Shiva-Shakti Creative Union Realm'
                    }
                }
            }
        };
    };
    LiberArcanaeEngine.prototype.generatePathworking = function (index, type) {
        return {
            meditation: "Meditation for ".concat(type, " card ").concat(index),
            integration: "Integration practice for ".concat(type, " card ").concat(index),
            exercises: [
                "Exercise 1 for card ".concat(index),
                "Exercise 2 for card ".concat(index),
                "Exercise 3 for card ".concat(index)
            ],
            correspondences: {
                cardIndex: index,
                type: type,
                ratio: index_1.SACRED_MATH.CATHEDRAL_RATIO
            }
        };
    };
    /**
     * Get card by index (0-143)
     */
    LiberArcanaeEngine.prototype.getCard = function (cardIndex) {
        return this.cards.get(cardIndex) || null;
    };
    /**
     * Get all cards
     */
    LiberArcanaeEngine.prototype.getAllCards = function () {
        return Array.from(this.cards.values());
    };
    /**
     * Get Major Arcana cards (0-21)
     */
    LiberArcanaeEngine.prototype.getMajorArcana = function () {
        return Array.from(this.cards.values()).filter(function (card) { return card.type === 'major'; });
    };
    /**
     * Get Minor Arcana cards (22-77)
     */
    LiberArcanaeEngine.prototype.getMinorArcana = function () {
        return Array.from(this.cards.values()).filter(function (card) { return card.type === 'minor'; });
    };
    /**
     * Get Bridge cards (78-143)
     */
    LiberArcanaeEngine.prototype.getBridgeCards = function () {
        return Array.from(this.cards.values()).filter(function (card) { return card.type === 'bridge'; });
    };
    /**
     * Get cards by suit
     */
    LiberArcanaeEngine.prototype.getCardsBySuit = function (suit) {
        return Array.from(this.cards.values()).filter(function (card) { return card.suit === suit; });
    };
    /**
     * Get cards by consciousness level (0-21)
     */
    LiberArcanaeEngine.prototype.getCardsByConsciousnessLevel = function (level) {
        return Array.from(this.cards.values()).filter(function (card) { return card.consciousnessLevel === level; });
    };
    return LiberArcanaeEngine;
}());
exports.LiberArcanaeEngine = LiberArcanaeEngine;
exports.default = LiberArcanaeEngine;
