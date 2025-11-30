/**
 * CodexLibrary
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Library System
 * Main library class for managing sacred knowledge datasets and external library connections
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class CodexLibrary {
    config;
    nodes = new Map();
    researchSources = [];
    libraryConnections = [];
    validationRules = [];
    cache = new Map();
    constructor(config = {}) {
        this.config = {
            dataPath: config.dataPath || path.join(__dirname, '../../data'),
            cachePath: config.cachePath || path.join(__dirname, '../../cache'),
            externalLibraries: config.externalLibraries || this.getDefaultLibraries(),
            researchSources: config.researchSources || [],
            validationRules: config.validationRules || this.getDefaultValidationRules(),
            syncInterval: config.syncInterval || 60,
            ...config
        };
        this.initializeLibrary();
    }
    initializeLibrary() {
        this.loadNodes();
        this.loadResearchSources();
        this.loadLibraryConnections();
        this.setupCache();
    }
    loadNodes() {
        try {
            const codexPath = path.join(this.config.dataPath, 'codex-144-expanded.json');
            const codexData = JSON.parse(fs.readFileSync(codexPath, 'utf8'));
            for (const nodeData of codexData.nodes) {
                this.nodes.set(nodeData.id, nodeData);
            }
            // console.log(`📚 Loaded ${this.nodes.size} Codex nodes`);
        }
        catch (error) {
            // console.error('❌ Error loading Codex nodes:', error);
        }
    }
    loadResearchSources() {
        try {
            const sourcesPath = path.join(this.config.dataPath, 'research-sources.json');
            if (fs.existsSync(sourcesPath)) {
                this.researchSources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
            }
            // console.log(`📚 Loaded ${this.researchSources.length} research sources`);
        }
        catch (error) {
            // console.error('❌ Error loading research sources:', error);
        }
    }
    loadLibraryConnections() {
        this.libraryConnections = this.config.externalLibraries;
        // console.log(`📚 Connected to ${this.libraryConnections.length} external libraries`);
    }
    setupCache() {
        if (!fs.existsSync(this.config.cachePath)) {
            fs.mkdirSync(this.config.cachePath, { recursive: true });
        }
    }
    getDefaultLibraries() {
        return [
            {
                name: "Library of Congress",
                type: "academic",
                url: "https://www.loc.gov",
                description: "World's largest library with extensive occult and mystical collections",
                accessLevel: "public",
                subjects: ["occultism", "mysticism", "religion", "philosophy", "esotericism"],
                status: "active"
            },
            {
                name: "British Library",
                type: "academic",
                url: "https://www.bl.uk",
                description: "Contains rare manuscripts and esoteric texts",
                accessLevel: "public",
                subjects: ["alchemy", "hermeticism", "kabbalah", "tarot", "sacred-geometry"],
                status: "active"
            },
            {
                name: "Wellcome Collection",
                type: "research",
                url: "https://wellcomecollection.org",
                description: "Medicine, magic, and mystical health practices",
                accessLevel: "public",
                subjects: ["medical-magic", "herbalism", "healing-arts", "spiritual-medicine"],
                status: "active"
            },
            {
                name: "Internet Archive",
                type: "digital",
                url: "https://archive.org",
                description: "Digital library with extensive occult and esoteric collections",
                accessLevel: "public",
                subjects: ["occult", "esotericism", "mysticism", "tarot", "alchemy"],
                status: "active"
            },
            {
                name: "Sacred Texts Archive",
                type: "digital",
                url: "https://sacred-texts.com",
                description: "Comprehensive collection of sacred and mystical texts",
                accessLevel: "public",
                subjects: ["sacred-texts", "world-religions", "mysticism", "esotericism"],
                status: "active"
            },
            {
                name: "JSTOR",
                type: "academic",
                url: "https://jstor.org",
                description: "Academic articles on mysticism, religion, and consciousness studies",
                accessLevel: "subscription",
                subjects: ["religious-studies", "consciousness", "mysticism", "esotericism"],
                status: "active"
            }
        ];
    }
    getDefaultValidationRules() {
        return [
            { field: "id", type: "required", message: "Node ID is required" },
            { field: "name", type: "required", message: "Node name is required" },
            { field: "element", type: "required", message: "Element is required" },
            { field: "solfeggio", type: "range", value: { min: 100, max: 1000 }, message: "Solfeggio frequency must be between 100-1000 Hz" },
            { field: "harmonics.perfectConsonance", type: "required", message: "Perfect consonance harmonics are required" },
            { field: "narrative.theme", type: "required", message: "Narrative theme is required" },
            { field: "gameDesign.mechanics", type: "required", message: "Game mechanics are required" }
        ];
    }
    /**
     * Get a specific Codex node by ID
     */
    getNode(id) {
        return this.nodes.get(id);
    }
    /**
     * Get all Codex nodes
     */
    getAllNodes() {
        return Array.from(this.nodes.values());
    }
    /**
     * Get nodes by element
     */
    getNodesByElement(element) {
        return Array.from(this.nodes.values()).filter(node => node.element.toLowerCase() === element.toLowerCase());
    }
    /**
     * Get nodes by chakra
     */
    getNodesByChakra(chakra) {
        return Array.from(this.nodes.values()).filter(node => node.chakra.toLowerCase() === chakra.toLowerCase());
    }
    /**
     * Search research sources
     */
    async searchResearch(query) {
        const cacheKey = `search_${JSON.stringify(query)}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        let results = [...this.researchSources];
        // Filter by keywords
        if (query.keywords.length > 0) {
            results = results.filter(source => query.keywords.some(keyword => source.title.toLowerCase().includes(keyword.toLowerCase()) ||
                source.author.toLowerCase().includes(keyword.toLowerCase()) ||
                source.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase())) ||
                source.abstract?.toLowerCase().includes(keyword.toLowerCase())));
        }
        // Filter by node IDs
        if (query.nodeIds && query.nodeIds.length > 0) {
            const nodeKeywords = query.nodeIds.flatMap(id => {
                const node = this.getNode(id);
                return node ? [node.name, node.element, node.chakra, ...node.narrative.keywords] : [];
            });
            results = results.filter(source => nodeKeywords.some(keyword => source.title.toLowerCase().includes(keyword.toLowerCase()) ||
                source.subjects.some(subject => subject.toLowerCase().includes(keyword.toLowerCase()))));
        }
        // Filter by subjects
        if (query.subjects && query.subjects.length > 0) {
            results = results.filter(source => query.subjects.some(subject => source.subjects.some(s => s.toLowerCase().includes(subject.toLowerCase()))));
        }
        // Filter by libraries
        if (query.libraries && query.libraries.length > 0) {
            results = results.filter(source => query.libraries.includes(source.library));
        }
        // Sort by relevance
        results.sort((a, b) => b.relevance - a.relevance);
        // Apply pagination
        const totalCount = results.length;
        const offset = query.offset || 0;
        const limit = query.limit || 50;
        results = results.slice(offset, offset + limit);
        // Generate facets
        const facets = this.generateFacets(results);
        const searchResult = {
            sources: results,
            totalCount,
            facets,
            query
        };
        this.cache.set(cacheKey, searchResult);
        return searchResult;
    }
    generateFacets(sources) {
        const subjects = {};
        const libraries = {};
        const years = {};
        const accessLevels = {};
        sources.forEach(source => {
            // Count subjects
            source.subjects.forEach(subject => {
                subjects[subject] = (subjects[subject] || 0) + 1;
            });
            // Count libraries
            libraries[source.library] = (libraries[source.library] || 0) + 1;
            // Count years
            const year = source.publicationYear.toString();
            years[year] = (years[year] || 0) + 1;
            // Count access levels
            accessLevels[source.accessLevel] = (accessLevels[source.accessLevel] || 0) + 1;
        });
        return { subjects, libraries, years, accessLevels };
    }
    /**
     * Validate Codex data integrity
     */
    validateCodex() {
        const errors = [];
        const warnings = [];
        for (const [id, node] of this.nodes) {
            // Check required fields
            this.validationRules.forEach(rule => {
                if (rule.type === 'required') {
                    const value = this.getNestedValue(node, rule.field);
                    if (!value) {
                        errors.push({
                            field: rule.field,
                            message: rule.message,
                            value,
                            rule,
                            nodeId: id
                        });
                    }
                }
                if (rule.type === 'range' && rule.value) {
                    const value = this.getNestedValue(node, rule.field);
                    if (value && (value < rule.value.min || value > rule.value.max)) {
                        errors.push({
                            field: rule.field,
                            message: rule.message,
                            value,
                            rule,
                            nodeId: id
                        });
                    }
                }
            });
            // Check harmonics integrity
            if (node.harmonics) {
                const totalHarmonics = [
                    ...node.harmonics.perfectConsonance,
                    ...node.harmonics.consonance,
                    ...node.harmonics.dissonance,
                    ...node.harmonics.tritone
                ];
                if (totalHarmonics.length === 0) {
                    warnings.push({
                        field: 'harmonics',
                        message: 'No harmonics defined',
                        suggestion: 'Add harmonic relationships for this node',
                        nodeId: id
                    });
                }
            }
        }
        const isValid = errors.length === 0;
        const checksum = this.generateChecksum();
        return {
            isValid,
            errors,
            warnings,
            checksum,
            lastValidated: new Date()
        };
    }
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    generateChecksum() {
        const data = JSON.stringify([...this.nodes.values()].sort((a, b) => a.id - b.id));
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(16);
    }
    /**
     * Sync with external libraries
     */
    async syncExternalLibraries() {
        const results = [];
        for (const library of this.libraryConnections) {
            try {
                const result = await this.syncLibrary(library);
                results.push(result);
            }
            catch (error) {
                results.push({
                    library: library.name,
                    status: 'error',
                    sourcesAdded: 0,
                    sourcesUpdated: 0,
                    errors: [error instanceof Error ? error.message : 'Unknown error'],
                    lastSync: new Date()
                });
            }
        }
        return results;
    }
    async syncLibrary(library) {
        let sourcesAdded = 0;
        let sourcesUpdated = 0;
        const errors = [];
        try {
            // This would implement actual library API calls
            // For now, we'll simulate the sync process
            // console.log(`🔄 Syncing with ${library.name}...`);
            // Example: Search for relevant sources
            const searchResults = await this.searchLibraryAPI(library, this.getCodexKeywords());
            for (const result of searchResults) {
                const existingSource = this.researchSources.find(s => s.id === result.id);
                if (!existingSource) {
                    this.researchSources.push(result);
                    sourcesAdded++;
                }
                else if (this.shouldUpdateSource(existingSource, result)) {
                    Object.assign(existingSource, result);
                    sourcesUpdated++;
                }
            }
            // Save updated sources
            this.saveResearchSources();
            return {
                library: library.name,
                status: 'success',
                sourcesAdded,
                sourcesUpdated,
                errors,
                lastSync: new Date(),
                nextSync: new Date(Date.now() + this.config.syncInterval * 60 * 1000)
            };
        }
        catch (error) {
            return {
                library: library.name,
                status: 'error',
                sourcesAdded,
                sourcesUpdated,
                errors: [error instanceof Error ? error.message : 'Unknown error'],
                lastSync: new Date()
            };
        }
    }
    async searchLibraryAPI(library, keywords) {
        // This would implement actual API calls to library systems
        // For demonstration, we'll return mock data
        const mockSources = [
            {
                id: `${library.name}_${Date.now()}_1`,
                title: `Sacred Geometry in ${library.name} Collection`,
                author: "Unknown",
                type: "manuscript",
                library: library.name,
                publicationYear: 1800,
                subjects: ["sacred-geometry", "mysticism", "esotericism"],
                relevance: 0.9,
                accessLevel: "public",
                keywords: keywords,
                abstract: "Historical manuscript on sacred geometric principles"
            }
        ];
        return mockSources;
    }
    getCodexKeywords() {
        const keywords = new Set();
        for (const node of this.nodes.values()) {
            keywords.add(node.element);
            keywords.add(node.chakra);
            keywords.add(node.planet);
            keywords.add(node.zodiac);
            keywords.add(node.geometry);
            node.narrative.keywords.forEach(k => keywords.add(k));
        }
        return Array.from(keywords);
    }
    shouldUpdateSource(existing, updated) {
        return updated.relevance > existing.relevance ||
            updated.publicationYear > existing.publicationYear;
    }
    saveResearchSources() {
        const sourcesPath = path.join(this.config.dataPath, 'research-sources.json');
        fs.writeFileSync(sourcesPath, JSON.stringify(this.researchSources, null, 2));
    }
    /**
     * Get library analytics
     */
    getAnalytics() {
        const validation = this.validateCodex();
        return {
            totalNodes: this.nodes.size,
            activeNodes: this.nodes.size, // All nodes are active in this implementation
            totalConnections: this.calculateTotalConnections(),
            libraryConnections: this.libraryConnections.length,
            researchSources: this.researchSources.length,
            validationStatus: validation.isValid ? 'valid' : validation.warnings.length > 0 ? 'warnings' : 'errors',
            lastUpdated: new Date(),
            usageStats: {
                searches: 0, // Would track actual usage
                validations: 1,
                syncs: 0,
                generation: 0
            }
        };
    }
    calculateTotalConnections() {
        let connections = 0;
        // Count harmonic connections
        for (const node of this.nodes.values()) {
            connections += node.harmonics.perfectConsonance.length;
            connections += node.harmonics.consonance.length;
            connections += node.harmonics.dissonance.length;
        }
        // Count elemental connections
        const elements = ['Fire', 'Water', 'Earth', 'Air', 'Aether'];
        elements.forEach(element => {
            connections += this.getNodesByElement(element).length;
        });
        return connections;
    }
    /**
     * Generate comprehensive report
     */
    generateReport() {
        const analytics = this.getAnalytics();
        const validation = this.validateCodex();
        return `
# 📚 Codex 144:99 Library System Report

## 📊 System Overview
- **Total Nodes**: ${analytics.totalNodes}
- **Active Nodes**: ${analytics.activeNodes}
- **Total Connections**: ${analytics.totalConnections}
- **Library Connections**: ${analytics.libraryConnections}
- **Research Sources**: ${analytics.researchSources}
- **Validation Status**: ${analytics.validationStatus}

## 🔗 External Library Connections
${this.libraryConnections.map(lib => `- **${lib.name}** (${lib.type}): ${lib.description}`).join('\n')}

## ✅ Validation Results
- **Valid**: ${validation.isValid}
- **Errors**: ${validation.errors.length}
- **Warnings**: ${validation.warnings.length}
- **Checksum**: ${validation.checksum}

## 🎯 Node Distribution by Element
${this.getElementDistribution()}

## 🔄 Recent Activity
- **Last Validation**: ${validation.lastValidated.toISOString()}
- **Library Syncs**: ${analytics.usageStats.syncs}
- **Research Searches**: ${analytics.usageStats.searches}

---
*Report generated by Codex 144:99 Library System*
*${new Date().toISOString()}*
    `;
    }
    getElementDistribution() {
        const elements = ['Fire', 'Water', 'Earth', 'Air', 'Aether', 'All'];
        const distribution = {};
        elements.forEach(element => {
            distribution[element] = this.getNodesByElement(element).length;
        });
        return Object.entries(distribution)
            .map(([element, count]) => `- ${element}: ${count} nodes`)
            .join('\n');
    }
}
//# sourceMappingURL=CodexLibrary.js.map