"use strict";
/**
 * Codex 144:99 Security Module
 *
 * Security validation and safety measures for Codex data structures
 * Based on security research: input validation, data integrity, schema validation
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
exports.Codex144Security = exports.DEFAULT_SECURITY_CONFIG = void 0;
exports.DEFAULT_SECURITY_CONFIG = {
    maxNodeIndex: 143,
    maxDepthIndex: 98,
    minConsciousnessLevel: 0,
    maxConsciousnessLevel: 21,
    minFrequency: 396, // UT - lowest Solfeggio
    maxFrequency: 963, // SI - highest Solfeggio
    maxStringLength: 10000,
    maxArrayLength: 1000,
    allowExternalData: false,
    requireSanitization: true
};
var Codex144Security = /** @class */ (function () {
    function Codex144Security(config) {
        if (config === void 0) { config = {}; }
        this.config = __assign(__assign({}, exports.DEFAULT_SECURITY_CONFIG), config);
    }
    /**
     * Validate a CodexNode for security
     */
    Codex144Security.prototype.validateNode = function (node) {
        var _a, _b;
        var errors = [];
        var warnings = [];
        // Validate nodeIndex
        if (typeof node.nodeIndex !== 'number' || node.nodeIndex < 0 || node.nodeIndex > this.config.maxNodeIndex) {
            errors.push("Invalid nodeIndex: ".concat(node.nodeIndex, " (must be 0-").concat(this.config.maxNodeIndex, ")"));
        }
        // Validate consciousnessLevel
        if (typeof node.consciousnessLevel !== 'number' ||
            node.consciousnessLevel < this.config.minConsciousnessLevel ||
            node.consciousnessLevel > this.config.maxConsciousnessLevel) {
            errors.push("Invalid consciousnessLevel: ".concat(node.consciousnessLevel, " (must be ").concat(this.config.minConsciousnessLevel, "-").concat(this.config.maxConsciousnessLevel, ")"));
        }
        // Validate frequency
        if (typeof node.frequency !== 'number' ||
            node.frequency < this.config.minFrequency ||
            node.frequency > this.config.maxFrequency) {
            warnings.push("Frequency ".concat(node.frequency, " outside Solfeggio range (").concat(this.config.minFrequency, "-").concat(this.config.maxFrequency, ")"));
        }
        // Validate strings
        if (typeof node.name !== 'string' || node.name.length > this.config.maxStringLength) {
            errors.push("Invalid name: length ".concat(((_a = node.name) === null || _a === void 0 ? void 0 : _a.length) || 0, " exceeds max ").concat(this.config.maxStringLength));
        }
        if (typeof node.description !== 'string' || node.description.length > this.config.maxStringLength) {
            errors.push("Invalid description: length ".concat(((_b = node.description) === null || _b === void 0 ? void 0 : _b.length) || 0, " exceeds max ").concat(this.config.maxStringLength));
        }
        // Sanitize strings if required
        if (this.config.requireSanitization) {
            if (node.name && this.containsUnsafeChars(node.name)) {
                errors.push("Name contains unsafe characters");
            }
            if (node.description && this.containsUnsafeChars(node.description)) {
                errors.push("Description contains unsafe characters");
            }
        }
        // Validate gate mappings
        if (node.gateMappings) {
            if (node.gateMappings.primaryGate < 1 || node.gateMappings.primaryGate > 99) {
                errors.push("Invalid primaryGate: ".concat(node.gateMappings.primaryGate));
            }
            if (node.gateMappings.harmonicGate < 1 || node.gateMappings.harmonicGate > 99) {
                errors.push("Invalid harmonicGate: ".concat(node.gateMappings.harmonicGate));
            }
            if (node.gateMappings.spiralGate < 1 || node.gateMappings.spiralGate > 99) {
                errors.push("Invalid spiralGate: ".concat(node.gateMappings.spiralGate));
            }
        }
        // Validate chapel mapping
        if (node.chapelMapping) {
            if (node.chapelMapping.chapelNumber < 1 || node.chapelMapping.chapelNumber > 8) {
                errors.push("Invalid chapelNumber: ".concat(node.chapelMapping.chapelNumber));
            }
            if (node.chapelMapping.folioNumber < 0 || node.chapelMapping.folioNumber > 143) {
                errors.push("Invalid folioNumber: ".concat(node.chapelMapping.folioNumber));
            }
        }
        // Validate quality parameters
        if (node.qualityParameters) {
            var params = node.qualityParameters;
            if (typeof params.intensity !== 'number' || params.intensity < 0 || params.intensity > 1) {
                warnings.push("Intensity ".concat(params.intensity, " should be 0-1"));
            }
            if (typeof params.sophistication !== 'number' || params.sophistication < 0 || params.sophistication > 1) {
                warnings.push("Sophistication ".concat(params.sophistication, " should be 0-1"));
            }
        }
        // Validate correspondences (check for unsafe data)
        if (node.correspondences && this.config.requireSanitization) {
            if (this.containsUnsafeData(node.correspondences)) {
                errors.push("Correspondences contain unsafe data");
            }
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    };
    /**
     * Validate a CodexDepth for security
     */
    Codex144Security.prototype.validateDepth = function (depth) {
        var _a;
        var errors = [];
        var warnings = [];
        // Validate depthIndex
        if (typeof depth.depthIndex !== 'number' || depth.depthIndex < 0 || depth.depthIndex > this.config.maxDepthIndex) {
            errors.push("Invalid depthIndex: ".concat(depth.depthIndex, " (must be 0-").concat(this.config.maxDepthIndex, ")"));
        }
        // Validate consciousnessEvolution
        if (typeof depth.consciousnessEvolution !== 'number' ||
            depth.consciousnessEvolution < this.config.minConsciousnessLevel ||
            depth.consciousnessEvolution > this.config.maxConsciousnessLevel) {
            errors.push("Invalid consciousnessEvolution: ".concat(depth.consciousnessEvolution));
        }
        // Validate dissolutionLevel
        if (typeof depth.dissolutionLevel !== 'number' || depth.dissolutionLevel < 0 || depth.dissolutionLevel > 10) {
            errors.push("Invalid dissolutionLevel: ".concat(depth.dissolutionLevel, " (must be 0-10)"));
        }
        // Validate arrays
        if (Array.isArray(depth.nodeConnections)) {
            if (depth.nodeConnections.length > this.config.maxArrayLength) {
                errors.push("nodeConnections array too long: ".concat(depth.nodeConnections.length));
            }
            for (var _i = 0, _b = depth.nodeConnections; _i < _b.length; _i++) {
                var node = _b[_i];
                if (typeof node !== 'number' || node < 0 || node > this.config.maxNodeIndex) {
                    errors.push("Invalid node connection: ".concat(node));
                }
            }
        }
        if (Array.isArray(depth.gateConnections)) {
            if (depth.gateConnections.length > this.config.maxArrayLength) {
                errors.push("gateConnections array too long: ".concat(depth.gateConnections.length));
            }
            for (var _c = 0, _d = depth.gateConnections; _c < _d.length; _c++) {
                var gate = _d[_c];
                if (typeof gate !== 'number' || gate < 1 || gate > 99) {
                    errors.push("Invalid gate connection: ".concat(gate));
                }
            }
        }
        // Validate strings
        if (typeof depth.name !== 'string' || depth.name.length > this.config.maxStringLength) {
            errors.push("Invalid depth name: length ".concat(((_a = depth.name) === null || _a === void 0 ? void 0 : _a.length) || 0));
        }
        if (this.config.requireSanitization && depth.name && this.containsUnsafeChars(depth.name)) {
            errors.push("Depth name contains unsafe characters");
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
    Codex144Security.prototype.sanitizeInput = function (input) {
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
    Codex144Security.prototype.sanitizeString = function (str) {
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
    Codex144Security.prototype.containsUnsafeChars = function (str) {
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
    Codex144Security.prototype.containsUnsafeData = function (obj) {
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
    /**
     * Validate external data before importing
     */
    Codex144Security.prototype.validateExternalData = function (data) {
        var errors = [];
        var warnings = [];
        if (!this.config.allowExternalData) {
            errors.push('External data import is disabled for security');
            return { isValid: false, errors: errors, warnings: warnings };
        }
        // Check for circular references
        var seen = new WeakSet();
        var checkCircular = function (obj, path) {
            if (path === void 0) { path = []; }
            if (obj === null || typeof obj !== 'object') {
                return false;
            }
            if (seen.has(obj)) {
                return true;
            }
            seen.add(obj);
            for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (checkCircular(value, __spreadArray(__spreadArray([], path, true), [key], false))) {
                    return true;
                }
            }
            seen.delete(obj);
            return false;
        };
        if (checkCircular(data)) {
            errors.push('Circular reference detected in external data');
        }
        // Check data size
        var dataSize = JSON.stringify(data).length;
        if (dataSize > 10 * 1024 * 1024) { // 10MB limit
            errors.push("External data too large: ".concat(dataSize, " bytes"));
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    };
    return Codex144Security;
}());
exports.Codex144Security = Codex144Security;
exports.default = Codex144Security;
