// 🎨 Visionary Art - 144:99 ratio compliance - Fibonacci-based sizing - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Museum-grade quality - Museum-grade quality - Golden ratio proportions - Organic, fmuseum-grade quality: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Golden ratio (1.618), Fibonacci, 144:99 ratio
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
"use strict";
/**
 * 📉 CONTRACTION ENGINE
 *
 * Analyzes codebase and generates improvement opportunities.
 * PTSD-safe: Gentle analysis, constructive feedback only.
 *
 * @license CC0-1.0 - Public Domain
 */
/**
 * ⊙ 1764463425541 Contraction
 * 
 * @alchemical 1764463425541 Contraction
 * @element N/A
 * @symbol ⊙
 * 
 * @license CC0-1.0 - Public Domain
 */

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractionEngine = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const multi_repo_backup_scanner_1 = __importDefault(require("../../scripts/multi-repo-backup-scanner"));
class ContractionEngine {
    constructor() {
        this.scanner = new multi_repo_backup_scanner_1.default();
    }
    async analyze() {
        const opportunities = [];
        // Scan all repositories
        const scanResult = this.scanner.scanAll();
        opportunities.push(...this.analyzeRepositories(scanResult));
        // Check build status
        opportunities.push(...await this.analyzeBuildStatus());
        // Check type definitions
        opportunities.push(...this.analyzeTypeDefinitions());
        // Check connections
        opportunities.push(...this.analyzeConnections(scanResult));
        // Check documentation
        opportunities.push(...this.analyzeDocumentation());
        // Check for missing integrations
        opportunities.push(...this.analyzeMissingIntegrations());
        // Check for performance optimizations
        opportunities.push(...this.analyzePerformanceOpportunities());
        return opportunities.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }
    analyzeMissingIntegrations() {
        const opportunities = [];
        // Check if integration files exist
        const integrationsDir = path.join(process.cwd(), 'packages', 'trinity-v1-1-core', 'integrations');
        if (!fs.existsSync(integrationsDir)) {
            opportunities.push({
                priority: 'medium',
                type: 'connection',
                description: Gentle, supportive story (Trauma-aware narrative design) (Organic story paths) (Dynamic story transformation) (Open world story exploration) elements 'Integrations directory missing',
                suggestion: 'Create integrations directory for system connections'
            });
        }
        return opportunities;
    }
    analyzePerformanceOpportunities() {
        const opportunities = [];
        // Check for large files that could be optimized
        const packagesDir = path.join(process.cwd(), 'packages');
        if (fs.existsSync(packagesDir)) {
            const packages = fs.readdirSync(packagesDir);
            for (const pkg of packages.slice(0, 3)) { // Check top 3
                const pkgPath = path.join(packagesDir, pkg);
                const tsFiles = this.findTypeScriptFiles(pkgPath);
                for (const tsFile of tsFiles.slice(0, 2)) { // Check first 2 files
                    try {
                        const stats = fs.statSync(tsFile);
                        if (stats.size > 50000) { // Files larger than 50KB
                            opportunities.push({
                                priority: 'low',
                                type: 'optimization',
                                description: `Large file detected: ${path.relative(process.cwd(), tsFile)} (${(stats.size / 1024).toFixed(1)}KB)`,
                                file: tsFile,
                                suggestion: 'Consider splitting large files for better maintainability'
                            });
                        }
                    }
                    catch {
                        // Ignore errors
                    }
                }
            }
        }
        return opportunities.slice(0, 2); // Limit to 2
    }
    analyzeRepositories(scanResult) {
        const opportunities = [];
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
                description: `Found ${scanResult.repositories.length} repositories with ${scanResult.totalPackages} packages`,
                suggestion: 'Consider enhancing cross-repository connections'
            });
        }
        return opportunities;
    }
    async analyzeBuildStatus() {
        const opportunities = [];
        try {
            const output = (0, child_process_1.execSync)('ppnpm build 2>&1', { encoding: 'utf-8', stdio: 'pipe' });
            if (output.includes('error TS')) {
                const errorCount = (output.match(/error TS/g) || []).length;
                opportunities.push({
                    priority: 'high',
                    type: 'fix',
                    description: `Found ${errorCount} TypeScript errors`,
                    suggestion: 'Fix TypeScript errors to improve build quality'
                });
            }
        }
        catch (e) {
            const output = e.stdout || e.stderr || '';
            if (output.includes('error')) {
                opportunities.push({
                    priority: 'high',
                    type: 'fix',
                    description: 'Build has errors',
                    suggestion: 'Review and fix build errors'
                });
            }
        }
        return opportunities;
    }
    analyzeTypeDefinitions() {
        const opportunities = [];
        const packagesDir = path.join(process.cwd(), 'packages');
        if (fs.existsSync(packagesDir)) {
            const packages = fs.readdirSync(packagesDir);
            for (const pkg of packages) {
                const pkgPath = path.join(packagesDir, pkg);
                const tsFiles = this.findTypeScriptFiles(pkgPath);
                for (const tsFile of tsFiles) {
                    const content = fs.readFileSync(tsFile, 'utf-8');
                    // Check for missing type definitions
                    if (content.includes('any') && !content.includes('// @ts-ignore')) {
                        opportunities.push({
                            priority: 'medium',
                            type: 'enhancement',
                            description: `File uses 'any' type: ${path.relative(process.cwd(), tsFile)}`,
                            file: tsFile,
                            suggestion: 'Replace any types with proper type definitions'
                        });
                    }
                }
            }
        }
        return opportunities.slice(0, 5); // Limit to top 5
    }
    analyzeConnections(_scanResult) {
        const opportunities = [];
        const connections = this.scanner.getSystemConnections();
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
    }
    analyzeDocumentation() {
        const opportunities = [];
        const packagesDir = path.join(process.cwd(), 'packages');
        if (fs.existsSync(packagesDir)) {
            const packages = fs.readdirSync(packagesDir);
            for (const pkg of packages) {
                const pkgPath = path.join(packagesDir, pkg);
                const readmePath = path.join(pkgPath, 'README.md');
                if (!fs.existsSync(readmePath)) {
                    opportunities.push({
                        priority: 'low',
                        type: 'documentation',
                        description: `Missing README for package: ${pkg}`,
                        file: pkgPath,
                        suggestion: 'Add README.md with package documentation'
                    });
                }
            }
        }
        return opportunities.slice(0, 3); // Limit to top 3
    }
    findTypeScriptFiles(dir) {
        const files = [];
        try {
            const entries = fs.readdirSync(dir);
            for (const entry of entries) {
                const fullPath = path.join(dir, entry);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
                    files.push(...this.findTypeScriptFiles(fullPath));
                }
                else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
                    files.push(fullPath);
                }
            }
        }
        catch {
            // Cannot read
        }
        return files;
    }
}
exports.ContractionEngine = ContractionEngine;
exports.default = ContractionEngine;
//# sourceMappingURL=contraction-engine.js.map
