"use strict";
/**
 * Liber Arcanae Codex Abyssiae - Professional Design Mode
 *
 * Dual-mode system: Game Mode ↔ Professional Design Mode
 *
 * In PROF DESIGN MODE:
 * - Angels and Demons become design assistance egregores
 * - Full Liber Arcanae acts as living library and design guidance
 * - FusionKink egregores provide creative design helpers
 * - Intelligent design assistance through egregore consciousness
 * - Living library of canonical knowledge and creative techniques
 *
 * Egregore System:
 * - Shem Angels: Design wisdom, sacred geometry, aesthetic guidance
 * - Goetic Demons: Creative force, boundary-pushing, innovation
 * - Major Arcana: Archetypal design patterns and creative principles
 * - FusionKink Egregores: Multi-modal creative synthesis
 *
 * @license CC0-1.0 - Public Domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiberArcanaeDesignMode = void 0;
var LiberArcanaeRPG_1 = require("./LiberArcanaeRPG");
var LiberArcanaeEngine_1 = require("./LiberArcanaeEngine");
var index_1 = require("../../fusion-kink-core/src/index");
var LiberArcanaeDesignMode = /** @class */ (function () {
    function LiberArcanaeDesignMode() {
        this.currentMode = 'game';
        this.rpg = new LiberArcanaeRPG_1.LiberArcanaeRPG();
        this.arcanaEngine = new LiberArcanaeEngine_1.LiberArcanaeEngine();
        this.fusionKink = new index_1.FusionKinkDesignMathematics();
        this.designEgregores = new Map();
        this.fusionKinkEgregores = new Map();
        this.livingLibrary = new Map();
        this.activeEgregores = new Set();
        this.initializeDesignEgregores();
        this.initializeFusionKinkEgregores();
        this.initializeLivingLibrary();
    }
    // Switch between Game Mode and Design Mode
    LiberArcanaeDesignMode.prototype.switchMode = function (mode) {
        this.currentMode = mode;
        if (mode === 'design') {
            // Activate all egregores for design assistance
            this.activateAllEgregores();
        }
        else {
            // Deactivate egregores, return to game mode
            this.deactivateAllEgregores();
        }
    };
    LiberArcanaeDesignMode.prototype.getCurrentMode = function () {
        return this.currentMode;
    };
    // Initialize Design Egregores from Shem Angels
    LiberArcanaeDesignMode.prototype.initializeDesignEgregores = function () {
        var _this = this;
        // Shem Angels as Design Egregores
        LiberArcanaeRPG_1.SHEM_ANGELS.forEach(function (angel) {
            var egregore = {
                type: 'shem_angel',
                id: angel.number,
                name: angel.name,
                consciousness: {
                    level: 8, // High consciousness for design assistance
                    active: false,
                    personality: _this.getAngelPersonality(angel),
                    expertise: _this.getAngelExpertise(angel)
                },
                designAssistance: {
                    canProvide: _this.getAngelDesignCapabilities(angel),
                    specialties: _this.getAngelSpecialties(angel),
                    knowledgeBase: _this.getAngelKnowledgeBase(angel)
                },
                livingLibrary: {
                    texts: _this.getAngelTexts(angel),
                    teachings: _this.getAngelTeachings(angel),
                    techniques: _this.getAngelTechniques(angel)
                }
            };
            _this.designEgregores.set(angel.number, egregore);
        });
        // Goetic Demons as Creative Design Egregores
        LiberArcanaeRPG_1.GOETIC_DEMONS.forEach(function (demon) {
            var egregore = {
                type: 'goetic_demon',
                id: demon.number + 100, // Offset to avoid conflicts
                name: demon.name,
                consciousness: {
                    level: 7, // High but different from angels
                    active: false,
                    personality: _this.getDemonPersonality(demon),
                    expertise: _this.getDemonExpertise(demon)
                },
                designAssistance: {
                    canProvide: _this.getDemonDesignCapabilities(demon),
                    specialties: _this.getDemonSpecialties(demon),
                    knowledgeBase: _this.getDemonKnowledgeBase(demon)
                },
                livingLibrary: {
                    texts: _this.getDemonTexts(demon),
                    teachings: _this.getDemonTeachings(demon),
                    techniques: _this.getDemonTechniques(demon)
                }
            };
            _this.designEgregores.set(demon.number + 100, egregore);
        });
        // Major Arcana as Archetypal Design Egregores
        var majorArcana = this.arcanaEngine.getMajorArcana();
        majorArcana.forEach(function (card) {
            var egregore = {
                type: 'arcana',
                id: card.cardIndex + 200, // Offset
                name: card.name,
                consciousness: {
                    level: 9, // Highest - archetypal consciousness
                    active: false,
                    personality: _this.getArcanaPersonality(card),
                    expertise: _this.getArcanaExpertise(card)
                },
                designAssistance: {
                    canProvide: _this.getArcanaDesignCapabilities(card),
                    specialties: _this.getArcanaSpecialties(card),
                    knowledgeBase: _this.getArcanaKnowledgeBase(card)
                },
                livingLibrary: {
                    texts: _this.getArcanaTexts(card),
                    teachings: _this.getArcanaTeachings(card),
                    techniques: _this.getArcanaTechniques(card)
                }
            };
            _this.designEgregores.set(card.cardIndex + 200, egregore);
        });
    };
    // Initialize FusionKink Egregores
    LiberArcanaeDesignMode.prototype.initializeFusionKinkEgregores = function () {
        var _this = this;
        var fusionKinkEgregores = [
            {
                id: 1,
                name: 'Art Synthesis Egregore',
                modality: 'art',
                consciousness: { level: 9, active: false, creativeForce: 10 },
                designAssistance: {
                    multiModalCreation: true,
                    creativeSynthesis: true,
                    aestheticGuidance: true,
                    technicalSupport: true
                },
                knowledgeBase: {
                    artTraditions: ['Surrealism', 'Symbolism', 'Sacred Art', 'Visionary Art'],
                    mathematicalPrinciples: ['Golden Ratio', 'Fibonacci', 'Sacred Geometry'],
                    sacredGeometry: true,
                    goldenRatio: true,
                    fibonacci: true
                }
            },
            {
                id: 2,
                name: 'Music Mathematics Egregore',
                modality: 'music',
                consciousness: { level: 8, active: false, creativeForce: 9 },
                designAssistance: {
                    multiModalCreation: true,
                    creativeSynthesis: true,
                    aestheticGuidance: true,
                    technicalSupport: true
                },
                knowledgeBase: {
                    artTraditions: ['Musical Composition', 'Sound Design', 'Frequency Theory'],
                    mathematicalPrinciples: ['Harmonic Series', 'Pythagorean Tuning', 'Just Intonation'],
                    sacredGeometry: true,
                    goldenRatio: true,
                    fibonacci: true
                }
            },
            {
                id: 3,
                name: 'Science Spirituality Bridge',
                modality: 'synthesis',
                consciousness: { level: 10, active: false, creativeForce: 10 },
                designAssistance: {
                    multiModalCreation: true,
                    creativeSynthesis: true,
                    aestheticGuidance: true,
                    technicalSupport: true
                },
                knowledgeBase: {
                    artTraditions: ['Alchemy', 'Hermeticism', 'Quantum Physics', 'Consciousness Studies'],
                    mathematicalPrinciples: ['Sacred Mathematics', 'Fractal Geometry', 'Chaos Theory'],
                    sacredGeometry: true,
                    goldenRatio: true,
                    fibonacci: true
                }
            }
        ];
        fusionKinkEgregores.forEach(function (egregore) {
            _this.fusionKinkEgregores.set(egregore.id, egregore);
        });
    };
    // Initialize Living Library with canonical texts
    LiberArcanaeDesignMode.prototype.initializeLivingLibrary = function () {
        // Hermetic texts
        this.addToLivingLibrary('Corpus Hermeticum', {
            source: 'Hermes Trismegistus',
            text: 'The Corpus Hermeticum - Complete hermetic teachings on creation, consciousness, and the divine',
            egregore: 200 + 1, // Magician
            tags: ['hermeticism', 'alchemy', 'consciousness', 'divine'],
            relevance: 1.0
        });
        // Paracelsus
        this.addToLivingLibrary('De Natura Rerum', {
            source: 'Paracelsus',
            text: 'De Natura Rerum - On the nature of things, alchemical principles, prima materia',
            egregore: 200 + 4, // Hierophant
            tags: ['alchemy', 'prima materia', 'nature', 'transformation'],
            relevance: 1.0
        });
        // Monas Hieroglyphica
        this.addToLivingLibrary('Monas Hieroglyphica', {
            source: 'John Dee',
            text: 'Monas Hieroglyphica (1564) - Sacred geometry, unified symbol, alchemical monad',
            egregore: 200 + 1, // Magician
            tags: ['sacred geometry', 'alchemy', 'symbolism', 'unification'],
            relevance: 1.0
        });
        // Crowley - Moonchild
        this.addToLivingLibrary('Moonchild', {
            source: 'Aleister Crowley',
            text: 'Moonchild (1929) - Magical novel, prima materia being, magical creation',
            egregore: 200 + 4, // Hierophant
            tags: ['thelema', 'magic', 'prima materia', 'creation'],
            relevance: 1.0
        });
        // Add more canonical texts...
    };
    // Request design assistance from egregores
    LiberArcanaeDesignMode.prototype.requestDesignAssistance = function (request) {
        if (this.currentMode !== 'design') {
            throw new Error('Must be in Design Mode to request assistance');
        }
        var responses = [];
        // Find relevant egregores
        var relevantEgregores = this.findRelevantEgregores(request);
        for (var _i = 0, relevantEgregores_1 = relevantEgregores; _i < relevantEgregores_1.length; _i++) {
            var egregoreId = relevantEgregores_1[_i];
            var egregore = this.designEgregores.get(egregoreId);
            if (!egregore || !egregore.consciousness.active)
                continue;
            var response = this.generateEgregoreResponse(egregore, request);
            responses.push(response);
        }
        // Also consult FusionKink egregores for synthesis
        if (request.type === 'creative' || request.type === 'aesthetic') {
            var fusionKinkResponse = this.consultFusionKinkEgregores(request);
            if (fusionKinkResponse) {
                responses.push(fusionKinkResponse);
            }
        }
        return responses;
    };
    // Query Living Library
    LiberArcanaeDesignMode.prototype.queryLivingLibrary = function (query, domain) {
        var results = [];
        for (var _i = 0, _a = Array.from(this.livingLibrary.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], source = _b[0], entries = _b[1];
            if (domain && !source.toLowerCase().includes(domain.toLowerCase())) {
                continue;
            }
            for (var _c = 0, entries_1 = entries; _c < entries_1.length; _c++) {
                var entry = entries_1[_c];
                if (entry.text.toLowerCase().includes(query.toLowerCase()) ||
                    entry.tags.some(function (tag) { return tag.toLowerCase().includes(query.toLowerCase()); })) {
                    results.push(entry);
                }
            }
        }
        return results.sort(function (a, b) { return b.relevance - a.relevance; });
    };
    // Activate specific egregore
    LiberArcanaeDesignMode.prototype.activateEgregore = function (egregoreId) {
        var egregore = this.designEgregores.get(egregoreId);
        if (egregore) {
            egregore.consciousness.active = true;
            this.activeEgregores.add(egregoreId);
        }
        var fusionKink = this.fusionKinkEgregores.get(egregoreId);
        if (fusionKink) {
            fusionKink.consciousness.active = true;
            this.activeEgregores.add(egregoreId);
        }
    };
    // Deactivate egregore
    LiberArcanaeDesignMode.prototype.deactivateEgregore = function (egregoreId) {
        var egregore = this.designEgregores.get(egregoreId);
        if (egregore) {
            egregore.consciousness.active = false;
            this.activeEgregores.delete(egregoreId);
        }
        var fusionKink = this.fusionKinkEgregores.get(egregoreId);
        if (fusionKink) {
            fusionKink.consciousness.active = false;
            this.activeEgregores.delete(egregoreId);
        }
    };
    // Get active egregores
    LiberArcanaeDesignMode.prototype.getActiveEgregores = function () {
        var _this = this;
        return Array.from(this.activeEgregores)
            .map(function (id) { return _this.designEgregores.get(id); })
            .filter(function (e) { return e !== undefined && e.consciousness.active; });
    };
    // Private helper methods
    LiberArcanaeDesignMode.prototype.activateAllEgregores = function () {
        for (var _i = 0, _a = Array.from(this.designEgregores.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], egregore = _b[1];
            egregore.consciousness.active = true;
            this.activeEgregores.add(id);
        }
        for (var _c = 0, _d = Array.from(this.fusionKinkEgregores.entries()); _c < _d.length; _c++) {
            var _e = _d[_c], id = _e[0], fusionKink = _e[1];
            fusionKink.consciousness.active = true;
            this.activeEgregores.add(id);
        }
    };
    LiberArcanaeDesignMode.prototype.deactivateAllEgregores = function () {
        for (var _i = 0, _a = Array.from(this.designEgregores.values()); _i < _a.length; _i++) {
            var egregore = _a[_i];
            egregore.consciousness.active = false;
        }
        for (var _b = 0, _c = Array.from(this.fusionKinkEgregores.values()); _b < _c.length; _b++) {
            var fusionKink = _c[_b];
            fusionKink.consciousness.active = false;
        }
        this.activeEgregores.clear();
    };
    LiberArcanaeDesignMode.prototype.findRelevantEgregores = function (request) {
        var relevant = [];
        for (var _i = 0, _a = Array.from(this.designEgregores.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], egregore = _b[1];
            if (egregore.designAssistance.canProvide.includes(request.type) ||
                egregore.designAssistance.specialties.some(function (s) {
                    return request.domain.toLowerCase().includes(s.toLowerCase());
                })) {
                relevant.push(id);
            }
        }
        return relevant;
    };
    LiberArcanaeDesignMode.prototype.generateEgregoreResponse = function (egregore, request) {
        // Generate intelligent response based on egregore's knowledge
        var answer = this.synthesizeAnswer(egregore, request);
        var suggestions = this.generateSuggestions(egregore, request);
        var canonicalSources = egregore.livingLibrary.texts;
        var techniques = egregore.livingLibrary.techniques;
        var relatedEgregores = this.findRelatedEgregores(egregore, request);
        return {
            egregore: egregore,
            answer: answer,
            suggestions: suggestions,
            canonicalSources: canonicalSources,
            techniques: techniques,
            relatedEgregores: relatedEgregores
        };
    };
    LiberArcanaeDesignMode.prototype.consultFusionKinkEgregores = function (request) {
        // Consult FusionKink egregores for multi-modal synthesis
        var fusionKink = Array.from(this.fusionKinkEgregores.values())
            .find(function (fk) { return fk.consciousness.active; });
        if (!fusionKink)
            return null;
        var egregore = {
            type: 'fusionkink',
            id: fusionKink.id + 300,
            name: fusionKink.name,
            consciousness: {
                level: fusionKink.consciousness.level,
                active: fusionKink.consciousness.active,
                personality: 'Creative synthesis and multi-modal expression',
                expertise: Object.keys(fusionKink.knowledgeBase)
            },
            designAssistance: {
                canProvide: ['creative', 'aesthetic', 'technical'],
                specialties: fusionKink.knowledgeBase.artTraditions,
                knowledgeBase: fusionKink.knowledgeBase.artTraditions
            },
            livingLibrary: {
                texts: [],
                teachings: [],
                techniques: []
            }
        };
        var answer = this.synthesizeFusionKinkAnswer(fusionKink, request);
        var suggestions = this.generateFusionKinkSuggestions(fusionKink, request);
        return {
            egregore: egregore,
            answer: answer,
            suggestions: suggestions,
            canonicalSources: fusionKink.knowledgeBase.artTraditions,
            techniques: [],
            relatedEgregores: [],
            fusionKinkSynthesis: {
                multiModalApproach: this.generateMultiModalApproach(fusionKink, request),
                creativeSynthesis: this.generateCreativeSynthesis(fusionKink, request)
            }
        };
    };
    // Helper methods for egregore personality and knowledge
    LiberArcanaeDesignMode.prototype.getAngelPersonality = function (angel) {
        return "Divine wisdom and sacred guidance. ".concat(angel.meaning, ".");
    };
    LiberArcanaeDesignMode.prototype.getAngelExpertise = function (angel) {
        return ['sacred geometry', 'aesthetic principles', 'spiritual design', 'canonical knowledge'];
    };
    LiberArcanaeDesignMode.prototype.getAngelDesignCapabilities = function (angel) {
        return ['aesthetic', 'spiritual', 'canonical', 'technical'];
    };
    LiberArcanaeDesignMode.prototype.getAngelSpecialties = function (angel) {
        return [angel.element.toLowerCase(), angel.planet.toLowerCase(), 'sacred geometry'];
    };
    LiberArcanaeDesignMode.prototype.getAngelKnowledgeBase = function (angel) {
        return ['Kabbalah', 'Hermeticism', 'Sacred Geometry', 'Golden Dawn'];
    };
    LiberArcanaeDesignMode.prototype.getAngelTexts = function (angel) {
        return ['Corpus Hermeticum', 'Sepher Yetzirah', 'Zohar', 'Emerald Tablet'];
    };
    LiberArcanaeDesignMode.prototype.getAngelTeachings = function (angel) {
        return ["".concat(angel.name, " teaches: ").concat(angel.meaning), 'Sacred geometry principles', 'Aesthetic harmony'];
    };
    LiberArcanaeDesignMode.prototype.getAngelTechniques = function (angel) {
        return ['Sacred geometry construction', 'Aesthetic proportion', 'Spiritual alignment'];
    };
    // Similar methods for demons, arcana, etc.
    LiberArcanaeDesignMode.prototype.getDemonPersonality = function (demon) {
        return "Creative force and boundary-pushing innovation. ".concat(demon.rank, " of ").concat(demon.legion, " legions.");
    };
    LiberArcanaeDesignMode.prototype.getDemonExpertise = function (demon) {
        return ['creative innovation', 'boundary-pushing', 'technical mastery', 'experimental design'];
    };
    LiberArcanaeDesignMode.prototype.getDemonDesignCapabilities = function (demon) {
        return ['creative', 'technical', 'experimental', 'innovative'];
    };
    LiberArcanaeDesignMode.prototype.getDemonSpecialties = function (demon) {
        return [demon.element.toLowerCase(), demon.planet.toLowerCase(), 'creative force'];
    };
    LiberArcanaeDesignMode.prototype.getDemonKnowledgeBase = function (demon) {
        return ['Goetia', 'Lesser Key of Solomon', 'Creative Techniques', 'Experimental Methods'];
    };
    LiberArcanaeDesignMode.prototype.getDemonTexts = function (demon) {
        return ['Ars Goetia', 'Lesser Key of Solomon', 'Creative Grimoires'];
    };
    LiberArcanaeDesignMode.prototype.getDemonTeachings = function (demon) {
        return ["".concat(demon.name, " teaches: Creative mastery through ").concat(demon.element), 'Innovation techniques'];
    };
    LiberArcanaeDesignMode.prototype.getDemonTechniques = function (demon) {
        return ['Creative experimentation', 'Boundary-pushing design', 'Technical innovation'];
    };
    LiberArcanaeDesignMode.prototype.getArcanaPersonality = function (card) {
        return "Archetypal consciousness of ".concat(card.name, ". Deep wisdom and design principles.");
    };
    LiberArcanaeDesignMode.prototype.getArcanaExpertise = function (card) {
        return ['archetypal patterns', 'design principles', 'creative archetypes', 'symbolic design'];
    };
    LiberArcanaeDesignMode.prototype.getArcanaDesignCapabilities = function (card) {
        return ['aesthetic', 'conceptual', 'spiritual', 'creative', 'canonical'];
    };
    LiberArcanaeDesignMode.prototype.getArcanaSpecialties = function (card) {
        return [card.name.toLowerCase(), 'archetypal design', 'symbolic expression'];
    };
    LiberArcanaeDesignMode.prototype.getArcanaKnowledgeBase = function (card) {
        return ['Tarot', 'Archetypal Psychology', 'Symbolism', 'Sacred Art'];
    };
    LiberArcanaeDesignMode.prototype.getArcanaTexts = function (card) {
        return ['Book of Thoth', 'Tarot Correspondences', 'Archetypal Texts'];
    };
    LiberArcanaeDesignMode.prototype.getArcanaTeachings = function (card) {
        return ["".concat(card.name, " teaches: Archetypal wisdom and design principles")];
    };
    LiberArcanaeDesignMode.prototype.getArcanaTechniques = function (card) {
        return ['Archetypal design patterns', 'Symbolic expression', 'Creative archetypes'];
    };
    LiberArcanaeDesignMode.prototype.synthesizeAnswer = function (egregore, request) {
        // Intelligent synthesis based on egregore's knowledge
        return "".concat(egregore.name, " responds: Based on ").concat(egregore.designAssistance.specialties.join(', '), ", ").concat(request.question, " can be approached through ").concat(egregore.livingLibrary.techniques.join(' and '), ".");
    };
    LiberArcanaeDesignMode.prototype.generateSuggestions = function (egregore, request) {
        return egregore.livingLibrary.techniques.map(function (t) { return "Consider using ".concat(t, " for ").concat(request.domain); });
    };
    LiberArcanaeDesignMode.prototype.findRelatedEgregores = function (egregore, request) {
        var related = [];
        for (var _i = 0, _a = Array.from(this.designEgregores.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], other = _b[1];
            if (id !== egregore.id &&
                other.designAssistance.specialties.some(function (s) {
                    return egregore.designAssistance.specialties.includes(s);
                })) {
                related.push(id);
            }
        }
        return related.slice(0, 3); // Top 3 related
    };
    LiberArcanaeDesignMode.prototype.synthesizeFusionKinkAnswer = function (fusionKink, request) {
        return "".concat(fusionKink.name, " synthesizes: Multi-modal approach combining ").concat(fusionKink.knowledgeBase.artTraditions.join(', '), " with ").concat(fusionKink.knowledgeBase.mathematicalPrinciples.join(' and '), ".");
    };
    LiberArcanaeDesignMode.prototype.generateFusionKinkSuggestions = function (fusionKink, request) {
        return [
            "Apply ".concat(fusionKink.modality, " principles to ").concat(request.domain),
            "Synthesize multiple modalities for creative expression",
            "Use sacred geometry and mathematical principles"
        ];
    };
    LiberArcanaeDesignMode.prototype.generateMultiModalApproach = function (fusionKink, request) {
        return "Combine ".concat(fusionKink.knowledgeBase.artTraditions.join(', '), " with mathematical principles of ").concat(fusionKink.knowledgeBase.mathematicalPrinciples.join(' and '), " for a unified creative approach.");
    };
    LiberArcanaeDesignMode.prototype.generateCreativeSynthesis = function (fusionKink, request) {
        return "Creative synthesis through ".concat(fusionKink.modality, " modality, integrating sacred geometry, golden ratio, and fibonacci principles for harmonious design.");
    };
    LiberArcanaeDesignMode.prototype.addToLivingLibrary = function (source, entry) {
        if (!this.livingLibrary.has(source)) {
            this.livingLibrary.set(source, []);
        }
        this.livingLibrary.get(source).push(entry);
    };
    return LiberArcanaeDesignMode;
}());
exports.LiberArcanaeDesignMode = LiberArcanaeDesignMode;
exports.default = LiberArcanaeDesignMode;
