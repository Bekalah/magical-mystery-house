"use strict";
/**
 * Liber Arcanae Codex Abyssiae - 3D RPG System
 *
 * A Fable-like 3D RPG where Major Arcana are playable characters
 * exploring real pathworking with 72 Shem Angels and Goetic Demons
 * through Circuitum 99: Alpha et Omega
 *
 * Features:
 * - Playable Major Arcana characters (22 archetypal beings)
 * - Real pathworking with 72 Shem Angels (Kabbalistic tradition)
 * - 72 Goetic Demons (Lesser Key of Solomon)
 * - Circuitum 99: Alpha et Omega gate system
 * - Antero Alli Angel Tech mechanics
 * - Crossing the Abyss mechanics
 * - Holy Guardian Angel quest system
 * - Fable-like explorable 3D world
 *
 * Based on real canon:
 * - Aleister Crowley - Thelema, Crossing the Abyss, Holy Guardian Angel
 * - Golden Dawn - Kabbalah, Shem Angels, Pathworking
 * - Lesser Key of Solomon - 72 Goetic Demons
 * - Antero Alli - Angel Tech, Pathworking techniques
 * - Hermetic Qabalah - Tree of Life, 72 Names of God
 *
 * @license CC0-1.0 - Public Domain
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiberArcanaeRPG = exports.GOETIC_DEMONS = exports.SHEM_ANGELS = void 0;
var LiberArcanaeEngine_1 = require("./LiberArcanaeEngine");
var index_1 = require("../../codex-144-99-core/src/index");
// 72 Shem Angels (Names of God from Exodus 14:19-21, Kabbalistic tradition)
exports.SHEM_ANGELS = [
    { number: 1, name: 'Vehuiah', meaning: 'God the Exalter', planet: 'Mercury', element: 'Fire', gate: 1 },
    { number: 2, name: 'Jeliel', meaning: 'God who Hastes to Help', planet: 'Moon', element: 'Water', gate: 2 },
    { number: 3, name: 'Sitael', meaning: 'God the Protector', planet: 'Jupiter', element: 'Earth', gate: 3 },
    { number: 4, name: 'Elemiah', meaning: 'God the Concealer', planet: 'Mars', element: 'Fire', gate: 4 },
    { number: 5, name: 'Mahasiah', meaning: 'God the Savior', planet: 'Sun', element: 'Air', gate: 5 },
    { number: 6, name: 'Lelahel', meaning: 'God the Praiser', planet: 'Venus', element: 'Water', gate: 6 },
    { number: 7, name: 'Achaiah', meaning: 'God the Patient', planet: 'Saturn', element: 'Earth', gate: 7 },
    { number: 8, name: 'Cahetel', meaning: 'God to be Venerated', planet: 'Jupiter', element: 'Fire', gate: 8 },
    { number: 9, name: 'Haziel', meaning: 'God of Mercy', planet: 'Mars', element: 'Water', gate: 9 },
    { number: 10, name: 'Aladiah', meaning: 'God the Favorable', planet: 'Sun', element: 'Air', gate: 10 },
    { number: 11, name: 'Lauviah', meaning: 'God the Praiseworthy', planet: 'Venus', element: 'Water', gate: 11 },
    { number: 12, name: 'Hahaiah', meaning: 'God the Refuge', planet: 'Mercury', element: 'Air', gate: 12 },
    { number: 13, name: 'Iezalel', meaning: 'God who Rejoices', planet: 'Moon', element: 'Water', gate: 13 },
    { number: 14, name: 'Mebahel', meaning: 'God the Preserver', planet: 'Saturn', element: 'Earth', gate: 14 },
    { number: 15, name: 'Hariel', meaning: 'God the Creator', planet: 'Jupiter', element: 'Fire', gate: 15 },
    { number: 16, name: 'Hakamiah', meaning: 'God the Protector', planet: 'Mars', element: 'Fire', gate: 16 },
    { number: 17, name: 'Lauviah', meaning: 'God the Praiseworthy', planet: 'Venus', element: 'Water', gate: 17 },
    { number: 18, name: 'Caliel', meaning: 'God who Hastens', planet: 'Sun', element: 'Air', gate: 18 },
    { number: 19, name: 'Leuviah', meaning: 'God the Exalter', planet: 'Mercury', element: 'Air', gate: 19 },
    { number: 20, name: 'Pahaliah', meaning: 'God the Redeemer', planet: 'Moon', element: 'Water', gate: 20 },
    // Continue through all 72 - this is a simplified list, full list would have all 72 names
    { number: 72, name: 'Mumiah', meaning: 'God the Mighty', planet: 'Moon', element: 'Water', gate: 72 }
];
// 72 Goetic Demons (Lesser Key of Solomon)
exports.GOETIC_DEMONS = [
    { number: 1, name: 'Baal', rank: 'King', legion: 66, gate: 1, element: 'Fire', planet: 'Sun' },
    { number: 2, name: 'Agares', rank: 'Duke', legion: 31, gate: 2, element: 'Earth', planet: 'Venus' },
    { number: 3, name: 'Vassago', rank: 'Prince', legion: 26, gate: 3, element: 'Air', planet: 'Mercury' },
    { number: 4, name: 'Samigina', rank: 'Marquis', legion: 30, gate: 4, element: 'Water', planet: 'Moon' },
    { number: 5, name: 'Marbas', rank: 'President', legion: 36, gate: 5, element: 'Fire', planet: 'Mars' },
    { number: 6, name: 'Valefor', rank: 'Duke', legion: 10, gate: 6, element: 'Air', planet: 'Mercury' },
    { number: 7, name: 'Amon', rank: 'Marquis', legion: 40, gate: 7, element: 'Fire', planet: 'Mars' },
    { number: 8, name: 'Barbatos', rank: 'Duke', legion: 30, gate: 8, element: 'Earth', planet: 'Venus' },
    { number: 9, name: 'Paimon', rank: 'King', legion: 200, gate: 9, element: 'Air', planet: 'Moon' },
    { number: 10, name: 'Buer', rank: 'President', legion: 50, gate: 10, element: 'Fire', planet: 'Mars' },
    // Continue through all 72 - this is a simplified list, full Lesser Key has all 72 demons
    { number: 72, name: 'Andromalius', rank: 'Earl', legion: 36, gate: 72, element: 'Earth', planet: 'Saturn' }
];
var LiberArcanaeRPG = /** @class */ (function () {
    function LiberArcanaeRPG() {
        this.arcanaEngine = new LiberArcanaeEngine_1.LiberArcanaeEngine();
        this.codexEngine = new index_1.Codex144Engine();
        this.characters = new Map();
        this.abyssCrossings = new Map();
        this.holyGuardianAngels = new Map();
        this.pathworkingHistory = [];
        this.initializeCharacters();
    }
    LiberArcanaeRPG.prototype.initializeCharacters = function () {
        var majorArcana = this.arcanaEngine.getMajorArcana();
        for (var _i = 0, majorArcana_1 = majorArcana; _i < majorArcana_1.length; _i++) {
            var card = majorArcana_1[_i];
            var character = {
                arcanaIndex: card.cardIndex,
                name: card.name,
                archetype: this.getArchetypeForArcana(card.cardIndex),
                level: 1,
                experience: 0,
                attributes: this.generateAttributes(card.cardIndex),
                pathworking: {
                    currentPath: this.getStartingPath(card.cardIndex),
                    abyssCrossed: false,
                    holyGuardianAngel: { found: false },
                    shemAngels: [],
                    goeticDemons: [],
                    circuitumGates: []
                },
                realm: this.generateRealm(card.cardIndex)
            };
            this.characters.set(card.cardIndex, character);
            this.abyssCrossings.set(card.cardIndex, this.initializeAbyssCrossing(card.cardIndex));
        }
    };
    LiberArcanaeRPG.prototype.getArchetypeForArcana = function (index) {
        var archetypes = [
            'The Innocent', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
            'The Hierophant', 'The Lovers', 'The Charioteer', 'Strength', 'The Hermit',
            'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
            'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
        ];
        return archetypes[index] || 'Unknown';
    };
    LiberArcanaeRPG.prototype.generateAttributes = function (index) {
        // Each Major Arcana has different attribute strengths
        var baseAttributes = {
            strength: 10,
            wisdom: 10,
            intuition: 10,
            creativity: 10,
            willpower: 10,
            charisma: 10
        };
        // Customize based on arcana
        switch (index) {
            case 0: // The Fool
                return __assign(__assign({}, baseAttributes), { intuition: 15, creativity: 15, wisdom: 5 });
            case 1: // The Magician
                return __assign(__assign({}, baseAttributes), { willpower: 15, creativity: 15, strength: 12 });
            case 4: // The Hierophant
                return __assign(__assign({}, baseAttributes), { wisdom: 18, charisma: 15, willpower: 12 });
            case 13: // Death
                return __assign(__assign({}, baseAttributes), { willpower: 15, wisdom: 15, strength: 12 });
            case 20: // Judgement
                return __assign(__assign({}, baseAttributes), { wisdom: 18, intuition: 15, charisma: 12 });
            case 21: // The World
                return __assign(__assign({}, baseAttributes), { strength: 15, wisdom: 15, creativity: 15 });
            default:
                return baseAttributes;
        }
    };
    LiberArcanaeRPG.prototype.getStartingPath = function (arcanaIndex) {
        // Map Major Arcana to Tree of Life paths (1-32)
        // Based on Golden Dawn correspondences
        var pathMappings = {
            0: 11, // Fool - Aleph (Air)
            1: 12, // Magician - Beth (Mercury)
            2: 13, // High Priestess - Gimel (Moon)
            3: 14, // Empress - Daleth (Venus)
            4: 15, // Hierophant - Heh (Aries)
            5: 16, // Emperor - Vau (Taurus)
            6: 17, // Lovers - Zain (Gemini)
            7: 18, // Chariot - Cheth (Cancer)
            8: 19, // Strength - Teth (Leo)
            9: 20, // Hermit - Yod (Virgo)
            10: 21, // Wheel - Kaph (Jupiter)
            11: 22, // Justice - Lamed (Libra)
            12: 23, // Hanged Man - Mem (Water)
            13: 24, // Death - Nun (Scorpio)
            14: 25, // Temperance - Samekh (Sagittarius)
            15: 26, // Devil - Ayin (Capricorn)
            16: 27, // Tower - Peh (Mars)
            17: 28, // Star - Tzaddi (Aquarius)
            18: 29, // Moon - Qoph (Pisces)
            19: 30, // Sun - Resh (Sun)
            20: 31, // Judgement - Shin (Fire)
            21: 32 // World - Tav (Saturn)
        };
        return pathMappings[arcanaIndex] || 11;
    };
    LiberArcanaeRPG.prototype.generateRealm = function (arcanaIndex) {
        var realms = {
            0: {
                name: 'Realm of Infinite Potential',
                description: 'The Fool\'s realm of pure possibility, where all paths begin',
                explorable: true,
                connections: [1, 21] // Connected to Magician and World
            },
            4: {
                name: 'Realm of Hierophantic Wisdom',
                description: 'The Hierophant\'s realm of sacred tradition, Moonchild prima materia, and abyssiae exploration',
                explorable: true,
                connections: [3, 5, 9] // Connected to Empress, Lovers, Hermit
            },
            // Add all 22 realms...
            21: {
                name: 'Realm of Cosmic Completion',
                description: 'The World\'s realm of integration and wholeness',
                explorable: true,
                connections: [0, 20] // Connected to Fool and Judgement
            }
        };
        return realms[arcanaIndex] || {
            name: "Realm of ".concat(this.getArchetypeForArcana(arcanaIndex)),
            description: "The ".concat(this.getArchetypeForArcana(arcanaIndex), "'s personal realm"),
            explorable: true,
            connections: []
        };
    };
    LiberArcanaeRPG.prototype.initializeAbyssCrossing = function (arcanaIndex) {
        return {
            characterIndex: arcanaIndex,
            stage: 'preparation',
            chokmahBinah: false,
            daath: false,
            kether: false,
            tests: {
                knowledge: false,
                will: false,
                surrender: false
            }
        };
    };
    // Pathworking with Shem Angels (Antero Alli Angel Tech style)
    LiberArcanaeRPG.prototype.pathworkWithShemAngel = function (characterIndex, angelNumber) {
        var character = this.characters.get(characterIndex);
        if (!character) {
            throw new Error("Character ".concat(characterIndex, " not found"));
        }
        var angel = exports.SHEM_ANGELS.find(function (a) { return a.number === angelNumber; });
        if (!angel) {
            throw new Error("Shem Angel ".concat(angelNumber, " not found"));
        }
        // Antero Alli Angel Tech: Direct contact through ritual and meditation
        var success = this.attemptPathworking(character, 'shem_angel', angelNumber);
        if (success) {
            if (!character.pathworking.shemAngels.includes(angelNumber)) {
                character.pathworking.shemAngels.push(angelNumber);
            }
            character.experience += 100;
            this.checkLevelUp(character);
        }
        var session = {
            characterIndex: characterIndex,
            type: 'shem_angel',
            target: angelNumber,
            success: success,
            experience: success ? 100 : 10,
            revelations: this.generateRevelations('shem_angel', angel),
            canonicalSource: 'Kabbalistic tradition - 72 Names of God (Exodus 14:19-21), Golden Dawn'
        };
        this.pathworkingHistory.push(session);
        return session;
    };
    // Pathworking with Goetic Demons
    LiberArcanaeRPG.prototype.pathworkWithGoeticDemon = function (characterIndex, demonNumber) {
        var character = this.characters.get(characterIndex);
        if (!character) {
            throw new Error("Character ".concat(characterIndex, " not found"));
        }
        var demon = exports.GOETIC_DEMONS.find(function (d) { return d.number === demonNumber; });
        if (!demon) {
            throw new Error("Goetic Demon ".concat(demonNumber, " not found"));
        }
        // Lesser Key of Solomon: Evocation and binding
        var success = this.attemptPathworking(character, 'goetic_demon', demonNumber);
        if (success) {
            if (!character.pathworking.goeticDemons.includes(demonNumber)) {
                character.pathworking.goeticDemons.push(demonNumber);
            }
            character.experience += 150; // Demons give more XP but are riskier
            this.checkLevelUp(character);
        }
        var session = {
            characterIndex: characterIndex,
            type: 'goetic_demon',
            target: demonNumber,
            success: success,
            experience: success ? 150 : 5,
            revelations: this.generateRevelations('goetic_demon', demon),
            canonicalSource: 'Lesser Key of Solomon - Goetia, Ars Goetia'
        };
        this.pathworkingHistory.push(session);
        return session;
    };
    // Open Circuitum 99 Gate (Alpha et Omega)
    LiberArcanaeRPG.prototype.openCircuitumGate = function (characterIndex, gateNumber) {
        var character = this.characters.get(characterIndex);
        if (!character) {
            throw new Error("Character ".concat(characterIndex, " not found"));
        }
        if (gateNumber < 1 || gateNumber > 99) {
            throw new Error("Gate ".concat(gateNumber, " must be between 1 and 99"));
        }
        // Circuitum 99: Alpha et Omega - The complete circuit
        var success = this.attemptPathworking(character, 'circuitum_gate', gateNumber);
        if (success) {
            if (!character.pathworking.circuitumGates.includes(gateNumber)) {
                character.pathworking.circuitumGates.push(gateNumber);
            }
            character.experience += 200;
            this.checkLevelUp(character);
            // Special: Opening gate 1 (Alpha) and gate 99 (Omega) together
            if (character.pathworking.circuitumGates.includes(1) &&
                character.pathworking.circuitumGates.includes(99)) {
                this.achieveAlphaOmega(character);
            }
        }
        var session = {
            characterIndex: characterIndex,
            type: 'circuitum_gate',
            target: gateNumber,
            success: success,
            experience: success ? 200 : 20,
            revelations: this.generateRevelations('circuitum_gate', { gate: gateNumber }),
            canonicalSource: 'Circuitum 99: Alpha et Omega - Complete gate system'
        };
        this.pathworkingHistory.push(session);
        return session;
    };
    // Crossing the Abyss (Crowley's system)
    LiberArcanaeRPG.prototype.attemptAbyssCrossing = function (characterIndex) {
        var character = this.characters.get(characterIndex);
        var crossing = this.abyssCrossings.get(characterIndex);
        if (!character || !crossing) {
            throw new Error("Character ".concat(characterIndex, " not found"));
        }
        if (crossing.stage === 'crossed') {
            return crossing; // Already crossed
        }
        // Requirements for crossing (Crowley's system)
        var requirements = {
            knowledge: character.attributes.wisdom >= 15,
            will: character.attributes.willpower >= 15,
            surrender: character.level >= 5,
            paths: character.pathworking.currentPath >= 20
        };
        if (requirements.knowledge && requirements.will && requirements.surrender) {
            // Test 1: Knowledge (Chokmah to Binah)
            if (!crossing.chokmahBinah) {
                crossing.chokmahBinah = this.testKnowledge(character);
                crossing.tests.knowledge = crossing.chokmahBinah;
            }
            // Test 2: Will (Navigate Daath - the Abyss)
            if (crossing.chokmahBinah && !crossing.daath) {
                crossing.daath = this.testWill(character);
                crossing.tests.will = crossing.daath;
            }
            // Test 3: Surrender (Reach Kether)
            if (crossing.daath && !crossing.kether) {
                crossing.kether = this.testSurrender(character);
                crossing.tests.surrender = crossing.kether;
            }
            if (crossing.kether) {
                crossing.stage = 'crossed';
                character.pathworking.abyssCrossed = true;
                character.experience += 1000;
                this.checkLevelUp(character);
            }
            else {
                crossing.stage = 'crossing';
            }
        }
        else {
            crossing.stage = 'preparation';
        }
        return crossing;
    };
    // Find Holy Guardian Angel (Crowley's central quest)
    LiberArcanaeRPG.prototype.findHolyGuardianAngel = function (characterIndex) {
        var character = this.characters.get(characterIndex);
        if (!character) {
            throw new Error("Character ".concat(characterIndex, " not found"));
        }
        var hga = this.holyGuardianAngels.get(characterIndex);
        if (!hga) {
            // Generate HGA based on character's path and attributes
            var gate = this.calculateHGAGate(character);
            var shemAngel = this.calculateHGAShemAngel(character);
            var name_1 = this.generateHGAName(character);
            hga = {
                characterIndex: characterIndex,
                name: name_1,
                gate: gate,
                shemAngel: shemAngel,
                found: false,
                contacted: false,
                communion: {
                    level: 0,
                    teachings: [],
                    revelations: []
                }
            };
            this.holyGuardianAngels.set(characterIndex, hga);
        }
        // Requirements to find HGA (Crowley's system)
        var canFind = character.level >= 3 &&
            character.pathworking.circuitumGates.length >= 5 &&
            character.attributes.wisdom >= 12;
        if (canFind && !hga.found) {
            // The HGA reveals itself
            hga.found = true;
            character.pathworking.holyGuardianAngel = {
                found: true,
                name: hga.name,
                gate: hga.gate
            };
            character.experience += 500;
            this.checkLevelUp(character);
        }
        return hga;
    };
    // Commune with Holy Guardian Angel
    LiberArcanaeRPG.prototype.communeWithHGA = function (characterIndex) {
        var _a, _b;
        var hga = this.holyGuardianAngels.get(characterIndex);
        if (!hga || !hga.found) {
            throw new Error('Holy Guardian Angel not found');
        }
        if (!hga.contacted) {
            hga.contacted = true;
            hga.communion.level = 1;
        }
        // Increase communion level
        if (hga.communion.level < 10) {
            hga.communion.level++;
        }
        // Generate teachings and revelations
        var teachings = this.generateHGATeachings(hga);
        (_a = hga.communion.teachings).push.apply(_a, teachings);
        var revelations = this.generateHGARevelations(hga);
        (_b = hga.communion.revelations).push.apply(_b, revelations);
        return __spreadArray(__spreadArray([], teachings, true), revelations, true);
    };
    // Helper methods
    LiberArcanaeRPG.prototype.attemptPathworking = function (character, type, target) {
        // Success based on character attributes and level
        var baseChance = 0.5;
        var levelBonus = character.level * 0.05;
        var attributeBonus = (character.attributes.willpower + character.attributes.wisdom) / 40;
        var chance = Math.min(0.95, baseChance + levelBonus + attributeBonus);
        return Math.random() < chance;
    };
    LiberArcanaeRPG.prototype.checkLevelUp = function (character) {
        var expNeeded = character.level * 1000;
        if (character.experience >= expNeeded) {
            character.level++;
            character.experience -= expNeeded;
            // Increase attributes on level up
            var attrs = ['strength', 'wisdom', 'intuition', 'creativity', 'willpower', 'charisma'];
            var attr = attrs[Math.floor(Math.random() * attrs.length)];
            character.attributes[attr] += 1;
        }
    };
    LiberArcanaeRPG.prototype.testKnowledge = function (character) {
        return character.attributes.wisdom >= 15 && character.pathworking.currentPath >= 20;
    };
    LiberArcanaeRPG.prototype.testWill = function (character) {
        return character.attributes.willpower >= 15 && character.level >= 5;
    };
    LiberArcanaeRPG.prototype.testSurrender = function (character) {
        return character.attributes.wisdom >= 18 && character.pathworking.abyssCrossed === false;
    };
    LiberArcanaeRPG.prototype.calculateHGAGate = function (character) {
        // HGA gate is based on character's arcana and path
        return ((character.arcanaIndex * 4) + character.pathworking.currentPath) % 99 + 1;
    };
    LiberArcanaeRPG.prototype.calculateHGAShemAngel = function (character) {
        // HGA Shem Angel is based on character's attributes
        var sum = character.attributes.strength + character.attributes.wisdom +
            character.attributes.intuition + character.attributes.creativity;
        return (sum % 72) + 1;
    };
    LiberArcanaeRPG.prototype.generateHGAName = function (character) {
        var names = [
            'Metatron', 'Raziel', 'Tzaphkiel', 'Tzadkiel', 'Kamael',
            'Raphael', 'Haniel', 'Michael', 'Gabriel', 'Sandalphon'
        ];
        return names[character.arcanaIndex % names.length];
    };
    LiberArcanaeRPG.prototype.generateRevelations = function (type, entity) {
        var revelations = [];
        if (type === 'shem_angel') {
            revelations.push("Contacted ".concat(entity.name, ": ").concat(entity.meaning));
            revelations.push("Gate ".concat(entity.gate, " resonates with ").concat(entity.element, " energy"));
        }
        else if (type === 'goetic_demon') {
            revelations.push("Encountered ".concat(entity.name, ", ").concat(entity.rank, " of ").concat(entity.legion, " legions"));
            revelations.push("Gate ".concat(entity.gate, " opens to ").concat(entity.element, " realm"));
        }
        else if (type === 'circuitum_gate') {
            revelations.push("Gate ".concat(entity.gate, " opened - Alpha et Omega circuit activated"));
        }
        return revelations;
    };
    LiberArcanaeRPG.prototype.generateHGATeachings = function (hga) {
        return [
            "The Holy Guardian Angel ".concat(hga.name, " teaches: \"Know thyself through the pathworking\""),
            "Gate ".concat(hga.gate, " reveals deeper mysteries of the Circuitum"),
            "Shem Angel ".concat(hga.shemAngel, " guides your journey")
        ];
    };
    LiberArcanaeRPG.prototype.generateHGARevelations = function (hga) {
        return [
            "Revelation: Your True Will aligns with gate ".concat(hga.gate),
            "Revelation: The abyssiae realms are interconnected through the Circuitum",
            "Revelation: All pathworking leads to the Holy Guardian Angel"
        ];
    };
    LiberArcanaeRPG.prototype.achieveAlphaOmega = function (character) {
        // Special achievement: Complete Alpha et Omega
        character.experience += 500;
        character.attributes.willpower += 2;
        character.attributes.wisdom += 2;
        this.checkLevelUp(character);
    };
    // Get character by index
    LiberArcanaeRPG.prototype.getCharacter = function (arcanaIndex) {
        return this.characters.get(arcanaIndex) || null;
    };
    // Get all characters
    LiberArcanaeRPG.prototype.getAllCharacters = function () {
        return Array.from(this.characters.values());
    };
    // Explore realm
    LiberArcanaeRPG.prototype.exploreRealm = function (characterIndex, targetRealmIndex) {
        var character = this.characters.get(characterIndex);
        if (!character) {
            throw new Error("Character ".concat(characterIndex, " not found"));
        }
        if (targetRealmIndex !== undefined) {
            var targetCharacter = this.characters.get(targetRealmIndex);
            if (targetCharacter) {
                return targetCharacter.realm;
            }
        }
        return character.realm;
    };
    return LiberArcanaeRPG;
}());
exports.LiberArcanaeRPG = LiberArcanaeRPG;
exports.default = LiberArcanaeRPG;
