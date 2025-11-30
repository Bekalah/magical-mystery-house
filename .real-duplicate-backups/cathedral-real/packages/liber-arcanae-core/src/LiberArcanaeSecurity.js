"use strict";
/**
 * Liber Arcanae Security Module
 *
 * Security validation and safety measures for Liber Arcanae data structures
 * Validates cards, correspondences, pathworking practices
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiberArcanaeSecurity = exports.DEFAULT_SECURITY_CONFIG = void 0;
exports.DEFAULT_SECURITY_CONFIG = {
    maxCardIndex: 143,
    minConsciousnessLevel: 0,
    maxConsciousnessLevel: 21,
    maxStringLength: 10000,
    maxArrayLength: 1000,
    requireSanitization: true,
    validateCorrespondences: true
};
var LiberArcanaeSecurity = /** @class */ (function () {
    function LiberArcanaeSecurity(config) {
        if (config === void 0) { config = {}; }
        this.config = __assign(__assign({}, exports.DEFAULT_SECURITY_CONFIG), config);
    }
    /**
     * Validate an ArcanaCard for security
     */
    LiberArcanaeSecurity.prototype.validateCard = function (card) {
        var _a;
        var errors = [];
        var warnings = [];
        // Validate cardIndex
        if (typeof card.cardIndex !== 'number' || card.cardIndex < 0 || card.cardIndex > this.config.maxCardIndex) {
            errors.push("Invalid cardIndex: ".concat(card.cardIndex, " (must be 0-").concat(this.config.maxCardIndex, ")"));
        }
        // Validate type
        if (!['major', 'minor', 'bridge'].includes(card.type)) {
            errors.push("Invalid card type: ".concat(card.type));
        }
        // Validate consciousnessLevel
        if (typeof card.consciousnessLevel !== 'number' ||
            card.consciousnessLevel < this.config.minConsciousnessLevel ||
            card.consciousnessLevel > this.config.maxConsciousnessLevel) {
            errors.push("Invalid consciousnessLevel: ".concat(card.consciousnessLevel));
        }
        // Validate nodeMapping
        if (typeof card.nodeMapping !== 'number' || card.nodeMapping < 0 || card.nodeMapping > 143) {
            errors.push("Invalid nodeMapping: ".concat(card.nodeMapping));
        }
        // Validate strings
        if (typeof card.name !== 'string' || card.name.length > this.config.maxStringLength) {
            errors.push("Invalid card name: length ".concat(((_a = card.name) === null || _a === void 0 ? void 0 : _a.length) || 0));
        }
        if (this.config.requireSanitization && card.name && this.containsUnsafeChars(card.name)) {
            errors.push("Card name contains unsafe characters");
        }
        // Validate suit if minor arcana
        if (card.type === 'minor' && card.suit) {
            if (!['wands', 'cups', 'swords', 'pentacles'].includes(card.suit)) {
                errors.push("Invalid suit: ".concat(card.suit));
            }
        }
        // Validate correspondences
        if (this.config.validateCorrespondences && card.correspondences) {
            var corrValidation = this.validateCorrespondences(card.correspondences);
            errors.push.apply(errors, corrValidation.errors);
            warnings.push.apply(warnings, corrValidation.warnings);
        }
        // Validate pathworking
        if (card.pathworking) {
            var pathValidation = this.validatePathworking(card.pathworking);
            errors.push.apply(errors, pathValidation.errors);
            warnings.push.apply(warnings, pathValidation.warnings);
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    };
    /**
     * Validate correspondences
     */
    LiberArcanaeSecurity.prototype.validateCorrespondences = function (corr) {
        var errors = [];
        var warnings = [];
        // Validate all string fields
        var stringFields = ['planet', 'zodiac', 'element', 'color', 'geometry', 'shemAngel', 'goetiaDemon', 'deity', 'iChing', 'soyga'];
        for (var _i = 0, stringFields_1 = stringFields; _i < stringFields_1.length; _i++) {
            var field = stringFields_1[_i];
            var value = corr[field];
            if (value && typeof value === 'string') {
                if (value.length > this.config.maxStringLength) {
                    errors.push("Correspondence ".concat(field, " too long: ").concat(value.length));
                }
                if (this.config.requireSanitization && this.containsUnsafeChars(value)) {
                    errors.push("Correspondence ".concat(field, " contains unsafe characters"));
                }
            }
        }
        // Validate suit
        if (corr.suit && !['wands', 'cups', 'swords', 'pentacles'].includes(corr.suit)) {
            errors.push("Invalid suit in correspondences: ".concat(corr.suit));
        }
        // Validate court
        if (corr.court && !['page', 'knight', 'queen', 'king'].includes(corr.court)) {
            errors.push("Invalid court in correspondences: ".concat(corr.court));
        }
        // Validate number
        if (corr.number !== undefined) {
            if (typeof corr.number !== 'number' || corr.number < 1 || corr.number > 10) {
                errors.push("Invalid number in correspondences: ".concat(corr.number));
            }
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    };
    /**
     * Validate pathworking practice
     */
    LiberArcanaeSecurity.prototype.validatePathworking = function (path) {
        var _a, _b;
        var errors = [];
        var warnings = [];
        // Validate strings
        if (typeof path.meditation !== 'string' || path.meditation.length > this.config.maxStringLength) {
            errors.push("Pathworking meditation too long: ".concat(((_a = path.meditation) === null || _a === void 0 ? void 0 : _a.length) || 0));
        }
        if (typeof path.integration !== 'string' || path.integration.length > this.config.maxStringLength) {
            errors.push("Pathworking integration too long: ".concat(((_b = path.integration) === null || _b === void 0 ? void 0 : _b.length) || 0));
        }
        // Validate exercises array
        if (Array.isArray(path.exercises)) {
            if (path.exercises.length > this.config.maxArrayLength) {
                errors.push("Exercises array too long: ".concat(path.exercises.length));
            }
            for (var _i = 0, _c = path.exercises; _i < _c.length; _i++) {
                var exercise = _c[_i];
                if (typeof exercise !== 'string') {
                    errors.push("Invalid exercise type: ".concat(typeof exercise));
                }
                else if (exercise.length > this.config.maxStringLength) {
                    errors.push("Exercise too long: ".concat(exercise.length));
                }
                if (this.config.requireSanitization && this.containsUnsafeChars(exercise)) {
                    errors.push("Exercise contains unsafe characters");
                }
            }
        }
        // Validate correspondences object
        if (path.correspondences && this.config.requireSanitization) {
            if (this.containsUnsafeData(path.correspondences)) {
                errors.push("Pathworking correspondences contain unsafe data");
            }
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    };
    /**
     * Sanitize input data
     */
    LiberArcanaeSecurity.prototype.sanitizeInput = function (input) {
        var _this = this;
        if (typeof input === 'string') {
            return this.sanitizeString(input);
        }
        if (Array.isArray(input)) {
            return input.map(function (item) { return _this.sanitizeInput(item); });
        }
        if (input && typeof input === 'object') {
            var sanitized = {};
            for (var _i = 0, _a = Object.entries(input); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var sanitizedKey = this.sanitizeString(key);
                sanitized[sanitizedKey] = this.sanitizeInput(value);
            }
            return sanitized;
        }
        return input;
    };
    /**
     * Sanitize string input
     */
    LiberArcanaeSecurity.prototype.sanitizeString = function (str) {
        // Remove null bytes
        str = str.replace(/\0/g, '');
        // Remove control characters except newlines and tabs
        str = str.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
        // Limit length
        if (str.length > this.config.maxStringLength) {
            str = str.substring(0, this.config.maxStringLength);
        }
        return str;
    };
    /**
     * Check for unsafe characters
     */
    LiberArcanaeSecurity.prototype.containsUnsafeChars = function (str) {
        // Check for script injection patterns
        if (/<script|javascript:|on\w+\s*=/i.test(str)) {
            return true;
        }
        // Check for SQL injection patterns
        if (/(union|select|insert|update|delete|drop|exec|execute)\s+/i.test(str)) {
            return true;
        }
        // Check for null bytes
        if (str.includes('\0')) {
            return true;
        }
        return false;
    };
    /**
     * Check for unsafe data in objects
     */
    LiberArcanaeSecurity.prototype.containsUnsafeData = function (obj) {
        var _this = this;
        if (typeof obj === 'string') {
            return this.containsUnsafeChars(obj);
        }
        if (Array.isArray(obj)) {
            return obj.some(function (item) { return _this.containsUnsafeData(item); });
        }
        if (obj && typeof obj === 'object') {
            return Object.values(obj).some(function (value) { return _this.containsUnsafeData(value); });
        }
        return false;
    };
    return LiberArcanaeSecurity;
}());
exports.LiberArcanaeSecurity = LiberArcanaeSecurity;
exports.default = LiberArcanaeSecurity;
