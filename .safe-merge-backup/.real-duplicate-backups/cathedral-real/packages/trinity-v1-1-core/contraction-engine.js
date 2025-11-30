"use strict";
/**
// 🎨 Visionary Art - 144:99 ratio compliance - Fibonacci-based sizing - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Museum-grade quality - Museum-grade quality - Golden ratio proportions - Organic, quality: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Golden ratio (1.618), Fibonacci, 144:99 ratio
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
 * 📉 CONTRACTION ENGINE
 *
 * Analyzes codebase and generates improvement opportunities.
 * PTSD-safe: Gentle analysis, constructive feedback only.
 *
 * @license CC0-1.0 - Public Domain
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractionEngine = void 0;
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
var multi_repo_backup_scanner_1 = require("../../scripts/multi-repo-backup-scanner");
var ContractionEngine = /** @class */ (function () {
    function ContractionEngine() {
        this.scanner = new multi_repo_backup_scanner_1.default();
    }
    ContractionEngine.prototype.analyze = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opportunities, scanResult, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        opportunities = [];
                        scanResult = this.scanner.scanAll();
                        opportunities.push.apply(opportunities, this.analyzeRepositories(scanResult));
                        _b = 
                        // Check build status
                        (_a = opportunities.push).apply;
                        _c = [
                            // Check build status
                            opportunities];
                        return [4 /*yield*/, this.analyzeBuildStatus()];
                    case 1:
                        // Check build status
                        _b.apply(_a, _c.concat([_d.sent()]));
                        // Check type definitions
                        opportunities.push.apply(opportunities, this.analyzeTypeDefinitions());
                        // Check connections
                        opportunities.push.apply(opportunities, this.analyzeConnections(scanResult));
                        // Check documentation
                        opportunities.push.apply(opportunities, this.analyzeDocumentation());
                        // Check for missing integrations
                        opportunities.push.apply(opportunities, this.analyzeMissingIntegrations());
                        // Check for performance optimizations
                        opportunities.push.apply(opportunities, this.analyzePerformanceOpportunities());
                        return [2 /*return*/, opportunities.sort(function (a, b) {
                                var priorityOrder = { high: 3, medium: 2, low: 1 };
                                return priorityOrder[b.priority] - priorityOrder[a.priority];
                            })];
                }
            });
        });
    };
    ContractionEngine.prototype.analyzeMissingIntegrations = function () {
        var opportunities = [];
        // Check if integration files exist
        var integrationsDir = path.join(process.cwd(), 'packages', 'trinity-v1-1-core', 'integrations');
        if (!fs.existsSync(integrationsDir)) {
            opportunities.push({
                priority: 'medium',
                type: 'connection',
                description: 'Integrations directory missing',
                suggestion: 'Create integrations directory for system connections'
            });
        }
        return opportunities;
    };
    ContractionEngine.prototype.analyzePerformanceOpportunities = function () {
        var opportunities = [];
        // Check for large files that could be optimized
        var packagesDir = path.join(process.cwd(), 'packages');
        if (fs.existsSync(packagesDir)) {
            var packages = fs.readdirSync(packagesDir);
            for (var _i = 0, _a = packages.slice(0, 3); _i < _a.length; _i++) { // Check top 3
                var pkg = _a[_i];
                var pkgPath = path.join(packagesDir, pkg);
                var tsFiles = this.findTypeScriptFiles(pkgPath);
                for (var _b = 0, _c = tsFiles.slice(0, 2); _b < _c.length; _b++) { // Check first 2 files
                    var tsFile = _c[_b];
                    try {
                        var stats = fs.statSync(tsFile);
                        if (stats.size > 50000) { // Files larger than 50KB
                            opportunities.push({
                                priority: 'low',
                                type: 'optimization',
                                description: "Large file detected: ".concat(path.relative(process.cwd(), tsFile), " (").concat((stats.size / 1024).toFixed(1), "KB)"),
                                file: tsFile,
                                suggestion: 'Consider splitting large files for better maintainability'
                            });
                        }
                    }
                    catch (_d) {
                        // Ignore errors
                    }
                }
            }
        }
        return opportunities.slice(0, 2); // Limit to 2
    };
    ContractionEngine.prototype.analyzeRepositories = function (scanResult) {
        var opportunities = [];
        if (scanResult.repositories.length === 0) {
            opportunities.push({
                priority: 'medium',
                type: 'connection',
                description: 'No repositories found - check workspace paths',
                suggestion: 'Verify repository paths in scanner configuration'
            });
        }
        else {
            opportunities.push({
                priority: 'low',
                type: 'enhancement',
                description: "Found ".concat(scanResult.repositories.length, " repositories with ").concat(scanResult.totalPackages, " packages"),
                suggestion: 'Consider enhancing cross-repository connections'
            });
        }
        return opportunities;
    };
    ContractionEngine.prototype.analyzeBuildStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opportunities, output, errorCount, errorObj, output;
            return __generator(this, function (_a) {
                opportunities = [];
                try {
                    output = (0, child_process_1.execSync)('pnpm build 2>&1', { encoding: 'utf-8', stdio: 'pipe' });
                    if (output.includes('error TS')) {
                        errorCount = (output.match(/error TS/g) || []).length;
                        opportunities.push({
                            priority: 'high',
                            type: 'fix',
                            description: "Found ".concat(errorCount, " TypeScript errors"),
                            suggestion: 'Fix TypeScript errors to improve build quality'
                        });
                    }
                }
                catch (e) {
                    errorObj = e && typeof e === 'object' ? e : {};
                    output = errorObj.stdout || errorObj.stderr || '';
                    if (output.includes('error')) {
                        opportunities.push({
                            priority: 'high',
                            type: 'fix',
                            description: 'Build has errors',
                            suggestion: 'Review and fix build errors'
                        });
                    }
                }
                return [2 /*return*/, opportunities];
            });
        });
    };
    ContractionEngine.prototype.analyzeTypeDefinitions = function () {
        var opportunities = [];
        var packagesDir = path.join(process.cwd(), 'packages');
        if (fs.existsSync(packagesDir)) {
            var packages = fs.readdirSync(packagesDir);
            for (var _i = 0, packages_1 = packages; _i < packages_1.length; _i++) {
                var pkg = packages_1[_i];
                var pkgPath = path.join(packagesDir, pkg);
                var tsFiles = this.findTypeScriptFiles(pkgPath);
                for (var _a = 0, tsFiles_1 = tsFiles; _a < tsFiles_1.length; _a++) {
                    var tsFile = tsFiles_1[_a];
                    var content = fs.readFileSync(tsFile, 'utf-8');
                    // Check for missing type definitions
                    if (content.includes('any') && !content.includes('// @ts-ignore')) {
                        opportunities.push({
                            priority: 'medium',
                            type: 'enhancement',
                            description: "File uses 'any' type: ".concat(path.relative(process.cwd(), tsFile)),
                            file: tsFile,
                            suggestion: 'Replace any types with proper type definitions'
                        });
                    }
                }
            }
        }
        return opportunities.slice(0, 5); // Limit to top 5
    };
    ContractionEngine.prototype.analyzeConnections = function (_scanResult) {
        var opportunities = [];
        var connections = this.scanner.getSystemConnections();
        // Check for missing connections
        if (connections.arcanae.length === 0) {
            opportunities.push({
                priority: 'high',
                type: 'connection',
                description: '22 Arcanae system not found',
                system: 'arcanae',
                suggestion: 'Connect to Liber Arcanae packages'
            });
        }
        if (connections.gates.length === 0) {
            opportunities.push({
                priority: 'high',
                type: 'connection',
                description: '99 Gates (Circuitum99) not found',
                system: 'gates',
                suggestion: 'Connect to Circuitum99 packages'
            });
        }
        if (connections.grimoire.length === 0) {
            opportunities.push({
                priority: 'medium',
                type: 'connection',
                description: 'Stone Grimoire (8 Chapels) not found',
                system: 'grimoire',
                suggestion: 'Connect to Stone Grimoire packages'
            });
        }
        if (connections.mysteryHouse.length === 0) {
            opportunities.push({
                priority: 'medium',
                type: 'connection',
                description: 'Magical Mystery House (99 Rooms) not found',
                system: 'mystery-house',
                suggestion: 'Connect to Magical Mystery House packages'
            });
        }
        return opportunities;
    };
    ContractionEngine.prototype.analyzeDocumentation = function () {
        var opportunities = [];
        var packagesDir = path.join(process.cwd(), 'packages');
        if (fs.existsSync(packagesDir)) {
            var packages = fs.readdirSync(packagesDir);
            for (var _i = 0, packages_2 = packages; _i < packages_2.length; _i++) {
                var pkg = packages_2[_i];
                var pkgPath = path.join(packagesDir, pkg);
                var readmePath = path.join(pkgPath, 'README.md');
                if (!fs.existsSync(readmePath)) {
                    opportunities.push({
                        priority: 'low',
                        type: 'documentation',
                        description: "Missing README for package: ".concat(pkg),
                        file: pkgPath,
                        suggestion: 'Add README.md with package documentation'
                    });
                }
            }
        }
        return opportunities.slice(0, 3); // Limit to top 3
    };
    ContractionEngine.prototype.findTypeScriptFiles = function (dir) {
        var files = [];
        try {
            var entries = fs.readdirSync(dir);
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                var fullPath = path.join(dir, entry);
                var stat = fs.statSync(fullPath);
                if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
                    files.push.apply(files, this.findTypeScriptFiles(fullPath));
                }
                else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
                    files.push(fullPath);
                }
            }
        }
        catch (_a) {
            // Cannot read
        }
        return files;
    };
    return ContractionEngine;
}());
exports.ContractionEngine = ContractionEngine;
exports.default = ContractionEngine;
