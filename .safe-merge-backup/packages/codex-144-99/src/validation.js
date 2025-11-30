/**
 * validation
 *
 * @package @cathedral/codex-144-99
 */
/**
 * Codex 144:99 Validation System
 * Comprehensive validation for sacred knowledge datasets
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class CodexValidator {
    validationRules = [
        { field: "id", type: "required", message: "Node ID is required" },
        { field: "name", type: "required", message: "Node name is required" },
        { field: "element", type: "required", message: "Element is required" },
        { field: "planet", type: "required", message: "Planet is required" },
        { field: "zodiac", type: "required", message: "Zodiac sign is required" },
        { field: "chakra", type: "required", message: "Chakra is required" },
        { field: "solfeggio", type: "range", value: { min: 100, max: 1000 }, message: "Solfeggio frequency must be between 100-1000 Hz" },
        { field: "color", type: "required", message: "Color is required" },
        { field: "geometry", type: "required", message: "Geometry is required" },
        { field: "pigment", type: "required", message: "Pigment is required" },
        { field: "shem", type: "required", message: "Shem angel is required" },
        { field: "goetia", type: "required", message: "Goetia demon is required" },
        { field: "harmonics.perfectConsonance", type: "required", message: "Perfect consonance harmonics are required" },
        { field: "harmonics.consonance", type: "required", message: "Consonance harmonics are required" },
        { field: "harmonics.dissonance", type: "required", message: "Dissonance harmonics are required" },
        { field: "narrative.theme", type: "required", message: "Narrative theme is required" },
        { field: "narrative.archetype", type: "required", message: "Narrative archetype is required" },
        { field: "narrative.keywords", type: "required", message: "Narrative keywords are required" },
        { field: "gameDesign.mechanics", type: "required", message: "Game mechanics are required" },
        { field: "gameDesign.abilityType", type: "required", message: "Game ability type is required" },
        { field: "architecture.roomType", type: "required", message: "Architecture room type is required" },
        { field: "symbolism.primarySymbol", type: "required", message: "Primary symbol is required" }
    ];
    sacredConstants = {
        totalNodes: 12,
        sacredRatio: 144 / 99,
        elements: ['Fire', 'Water', 'Earth', 'Air', 'Aether', 'All'],
        chakras: ['Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'],
        planets: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'],
        solfeggioFrequencies: [396, 417, 528, 639, 741, 852, 963]
    };
    /**
     * Validate a single Codex node
     */
    validateNode(node) {
        const errors = [];
        const warnings = [];
        // Check required fields
        this.validationRules.forEach(rule => {
            if (rule.type === 'required') {
                const value = this.getNestedValue(node, rule.field);
                if (!value || (Array.isArray(value) && value.length === 0)) {
                    errors.push({
                        field: rule.field,
                        message: rule.message,
                        value,
                        rule
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
                        rule
                    });
                }
            }
        });
        // Check sacred constants compliance
        if (!this.sacredConstants.elements.includes(node.element)) {
            warnings.push({
                field: 'element',
                message: `Element '${node.element}' not in standard sacred elements`,
                suggestion: `Use one of: ${this.sacredConstants.elements.join(', ')}`
            });
        }
        if (!this.sacredConstants.chakras.includes(node.chakra)) {
            warnings.push({
                field: 'chakra',
                message: `Chakra '${node.chakra}' not in standard chakra system`,
                suggestion: `Use one of: ${this.sacredConstants.chakras.join(', ')}`
            });
        }
        if (!this.sacredConstants.planets.includes(node.planet)) {
            warnings.push({
                field: 'planet',
                message: `Planet '${node.planet}' not in standard planetary system`,
                suggestion: `Use one of: ${this.sacredConstants.planets.join(', ')}`
            });
        }
        if (!this.sacredConstants.solfeggioFrequencies.includes(node.solfeggio)) {
            warnings.push({
                field: 'solfeggio',
                message: `Solfeggio frequency ${node.solfeggio}Hz not in standard healing frequencies`,
                suggestion: `Use one of: ${this.sacredConstants.solfeggioFrequencies.join(', ')}Hz`
            });
        }
        // Check harmonics integrity
        if (node.harmonics) {
            const totalHarmonics = [
                ...node.harmonics.perfectConsonance,
                ...node.harmonics.consonance,
                ...node.harmonics.dissonance,
                ...node.harmonics.tritone
            ];
            if (totalHarmonics.length === 0) {
                errors.push({
                    field: 'harmonics',
                    message: 'No harmonics defined for node',
                    value: node.harmonics,
                    rule: { field: 'harmonics', type: 'required', message: 'Harmonics are required' }
                });
            }
            // Check for mathematical relationships
            const ratio = node.id / 99;
            if (Math.abs(ratio - this.sacredConstants.sacredRatio) > 0.01) {
                warnings.push({
                    field: 'id',
                    message: `Node ID ${node.id} doesn't follow 144:99 sacred ratio`,
                    suggestion: `Consider using ID that relates to 99 (99, 198, 297, etc.)`
                });
            }
        }
        // Check color format
        if (node.color && !node.color.match(/^#[0-9A-Fa-f]{6}$/)) {
            warnings.push({
                field: 'color',
                message: `Color '${node.color}' not in hex format`,
                suggestion: 'Use hex color format like #FF0000'
            });
        }
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
    /**
     * Validate complete Codex dataset
     */
    validateCompleteDataset(dataPath = path.join(__dirname, '../../data')) {
        const errors = [];
        const warnings = [];
        try {
            // Load and validate Codex nodes
            const codexPath = path.join(dataPath, 'codex-144-expanded.json');
            if (fs.existsSync(codexPath)) {
                const codexData = JSON.parse(fs.readFileSync(codexPath, 'utf8'));
                if (codexData.nodes.length !== this.sacredConstants.totalNodes) {
                    warnings.push({
                        field: 'nodes',
                        message: `Expected ${this.sacredConstants.totalNodes} nodes, found ${codexData.nodes.length}`,
                        suggestion: 'Ensure all 12 sacred nodes are present'
                    });
                }
                codexData.nodes.forEach((node, index) => {
                    const validation = this.validateNode(node);
                    errors.push(...validation.errors.map(error => ({ ...error, nodeId: node.id })));
                    warnings.push(...validation.warnings.map(warning => ({ ...warning, nodeId: node.id })));
                });
            }
            // Validate research sources
            const sourcesPath = path.join(dataPath, 'research-sources.json');
            if (fs.existsSync(sourcesPath)) {
                const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
                sources.forEach((source, index) => {
                    if (!source.title || !source.author || !source.library) {
                        errors.push({
                            field: `researchSources[${index}]`,
                            message: 'Research source missing required fields',
                            value: source,
                            rule: { field: 'researchSources', type: 'required', message: 'Complete research source data required' }
                        });
                    }
                });
            }
            // Validate mirror system
            const mirrorPath = path.join(dataPath, 'codex-arcanae-mirror.json');
            if (fs.existsSync(mirrorPath)) {
                const mirrorData = JSON.parse(fs.readFileSync(mirrorPath, 'utf8'));
                if (!mirrorData.nodeArcanaMappings || mirrorData.nodeArcanaMappings.length === 0) {
                    warnings.push({
                        field: 'mirrorSystem',
                        message: 'No node-arcana mappings found',
                        suggestion: 'Add mappings between Codex nodes and Arcana for full integration'
                    });
                }
            }
        }
        catch (error) {
            errors.push({
                field: 'dataset',
                message: 'Error loading dataset files',
                value: error,
                rule: { field: 'dataset', type: 'required', message: 'Valid dataset files required' }
            });
        }
        const isValid = errors.length === 0;
        const checksum = this.generateChecksum(dataPath);
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
    generateChecksum(dataPath) {
        const files = [
            'codex-144-expanded.json',
            'research-sources.json',
            'codex-arcanae-mirror.json'
        ];
        let combinedData = '';
        files.forEach(file => {
            const filePath = path.join(dataPath, file);
            if (fs.existsSync(filePath)) {
                combinedData += fs.readFileSync(filePath, 'utf8');
            }
        });
        let hash = 0;
        for (let i = 0; i < combinedData.length; i++) {
            const char = combinedData.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(16);
    }
    /**
     * Generate validation report
     */
    generateValidationReport(validation) {
        return `
# 📚 Codex 144:99 Validation Report

## ✅ Overall Status
- **Valid**: ${validation.isValid ? '✅' : '❌'}
- **Errors**: ${validation.errors.length}
- **Warnings**: ${validation.warnings.length}
- **Checksum**: ${validation.checksum}
- **Last Validated**: ${validation.lastValidated.toISOString()}

## ❌ Errors Found
${validation.errors.length > 0 ?
            validation.errors.map(error => `- **${error.field}**: ${error.message}${error.nodeId ? ` (Node ${error.nodeId})` : ''}`).join('\n') :
            'No errors found ✅'}

## ⚠️ Warnings
${validation.warnings.length > 0 ?
            validation.warnings.map(warning => `- **${warning.field}**: ${warning.message}${warning.nodeId ? ` (Node ${warning.nodeId})` : ''}
  💡 ${warning.suggestion}`).join('\n') :
            'No warnings ✅'}

## 📊 Sacred Constants Compliance
- **Total Nodes**: ${this.sacredConstants.totalNodes} (Expected: 12)
- **Sacred Ratio**: ${this.sacredConstants.sacredRatio} (144:99)
- **Elements**: ${this.sacredConstants.elements.join(', ')}
- **Chakras**: ${this.sacredConstants.chakras.join(', ')}
- **Planets**: ${this.sacredConstants.planets.join(', ')}
- **Solfeggio Frequencies**: ${this.sacredConstants.solfeggioFrequencies.join(', ')}Hz

---
*Validation completed by Codex 144:99 Library System*
*${new Date().toISOString()}*
    `;
    }
}
//# sourceMappingURL=validation.js.map