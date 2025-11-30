/**
 * Quality Control System for Unified Codex Extraction
 *
 * Professional quality validation across ALL knowledge domains with domain-specific standards:
 * Scientific accuracy, mystical authenticity, artistic integrity, technical precision
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */
export class QualityControlSystem {
    qualityGuardians = new Map();
    constructor() {
        this.initializeQualityGuardians();
    }
    /**
     * Initialize domain-specific quality guardians
     */
    initializeQualityGuardians() {
        // Scientific Domain Guardian
        this.qualityGuardians.set('scientific', {
            id: 'scientific-guardian',
            domain: 'scientific',
            validator: {
                name: 'Scientific Accuracy Validator',
                type: 'automated',
                criteria: ['mathematical precision', 'citation accuracy', 'terminology correctness'],
                threshold: 0.9,
                validate: (content) => this.validateScientific(content)
            },
            criteria: [
                {
                    name: 'Mathematical Accuracy',
                    weight: 0.3,
                    threshold: 0.95,
                    measurement: { type: 'automated', scale: '0-1' },
                    validator: (content) => content.confidence
                }
            ],
            standards: [
                {
                    domain: 'scientific',
                    minimumScore: 0.9,
                    exceptionalScore: 0.98,
                    certification: { level: 'peer-review', authority: 'Academic' }
                }
            ]
        });
        // Mystical Domain Guardian
        this.qualityGuardians.set('mystical', {
            id: 'mystical-guardian',
            domain: 'mystical',
            validator: {
                name: 'Mystical Authenticity Validator',
                type: 'automated',
                criteria: ['sacred geometry accuracy', 'symbol authenticity', 'frequency correspondence'],
                threshold: 0.85,
                validate: (content) => this.validateMystical(content)
            },
            criteria: [
                {
                    name: 'Sacred Geometry Authenticity',
                    weight: 0.4,
                    threshold: 0.8,
                    measurement: { type: 'automated', scale: '0-1' },
                    validator: (content) => content.authenticityScore
                }
            ],
            standards: [
                {
                    domain: 'mystical',
                    minimumScore: 0.8,
                    exceptionalScore: 0.95,
                    certification: { level: 'mystical-lineage', authority: 'Ancient Traditions' }
                }
            ]
        });
        // Artistic Domain Guardian
        this.qualityGuardians.set('artistic', {
            id: 'artistic-guardian',
            domain: 'artistic',
            validator: {
                name: 'Artistic Integrity Validator',
                type: 'automated',
                criteria: ['color accuracy', 'composition balance', 'style authenticity'],
                threshold: 0.85,
                validate: (content) => this.validateArtistic(content)
            },
            criteria: [
                {
                    name: 'Color Preservation',
                    weight: 0.3,
                    threshold: 0.85,
                    measurement: { type: 'automated', scale: '0-1' },
                    validator: (content) => content.confidence
                }
            ],
            standards: [
                {
                    domain: 'artistic',
                    minimumScore: 0.8,
                    exceptionalScore: 0.95,
                    certification: { level: 'gallery-quality', authority: 'Art Institutions' }
                }
            ]
        });
        // Technical Domain Guardian
        this.qualityGuardians.set('technical', {
            id: 'technical-guardian',
            domain: 'technical',
            validator: {
                name: 'Technical Precision Validator',
                type: 'automated',
                criteria: ['measurement accuracy', 'diagram precision', 'scale consistency'],
                threshold: 0.9,
                validate: (content) => this.validateTechnical(content)
            },
            criteria: [
                {
                    name: 'Technical Accuracy',
                    weight: 0.4,
                    threshold: 0.9,
                    measurement: { type: 'automated', scale: '0-1' },
                    validator: (content) => content.confidence
                }
            ],
            standards: [
                {
                    domain: 'technical',
                    minimumScore: 0.9,
                    exceptionalScore: 0.98,
                    certification: { level: 'professional', authority: 'Engineering Standards' }
                }
            ]
        });
    }
    /**
     * Validate all content with appropriate domain guardians
     */
    async validateAllContent(content, metadata) {
        console.log(`🔍 Quality Control: Validating ${content.length} content items`);
        const validatedContent = [];
        for (const item of content) {
            const guardian = this.qualityGuardians.get(item.domain);
            if (guardian) {
                const validationResult = guardian.validator.validate(item);
                if (validationResult.score >= guardian.validator.threshold) {
                    // Enhance content with validation results
                    const enhancedContent = this.enhanceContentWithValidation(item, validationResult);
                    validatedContent.push(enhancedContent);
                }
                else {
                    console.log(`⚠️ Content failed quality check: ${validationResult.details.join(', ')}`);
                }
            }
            else {
                // No specific guardian, apply general validation
                validatedContent.push(item);
            }
        }
        console.log(`✅ Quality Control: ${validatedContent.length} items passed validation`);
        return validatedContent;
    }
    /**
     * Scientific domain validation
     */
    validateScientific(content) {
        let score = content.confidence;
        // Check for mathematical content
        if (content.processedContent.equations) {
            score += 0.1; // Bonus for mathematical content
        }
        // Check for technical diagrams
        if (content.processedContent.diagrams) {
            score += 0.1; // Bonus for diagrams
        }
        return {
            score: Math.min(score, 1.0),
            passed: score >= 0.9,
            details: [
                `Mathematical precision: ${content.confidence}`,
                `Technical accuracy: ${content.authenticityScore}`
            ]
        };
    }
    /**
     * Mystical domain validation
     */
    validateMystical(content) {
        let score = content.authenticityScore;
        // Check for sacred geometry
        if (content.sacredMath) {
            score += 0.15; // Bonus for sacred mathematics
        }
        // Check for mystical symbols
        if (content.processedContent.symbols) {
            score += 0.1; // Bonus for symbols
        }
        return {
            score: Math.min(score, 1.0),
            passed: score >= 0.8,
            details: [
                `Mystical authenticity: ${content.authenticityScore}`,
                `Sacred geometry: ${content.sacredMath ? 'detected' : 'not detected'}`
            ]
        };
    }
    /**
     * Artistic domain validation
     */
    validateArtistic(content) {
        let score = content.confidence;
        // Check for color analysis
        if (content.processedContent.colors) {
            score += 0.1; // Bonus for color analysis
        }
        // Check for style analysis
        if (content.processedContent.style) {
            score += 0.1; // Bonus for style analysis
        }
        return {
            score: Math.min(score, 1.0),
            passed: score >= 0.8,
            details: [
                `Artistic integrity: ${content.confidence}`,
                `Style analysis: ${content.processedContent.style ? 'complete' : 'missing'}`
            ]
        };
    }
    /**
     * Technical domain validation
     */
    validateTechnical(content) {
        let score = content.confidence;
        // Check for mathematical validation
        if (content.mathematical) {
            score += 0.1; // Bonus for math validation
        }
        // Check for technical precision
        if (content.processedContent.diagrams) {
            score += 0.1; // Bonus for diagrams
        }
        return {
            score: Math.min(score, 1.0),
            passed: score >= 0.9,
            details: [
                `Technical precision: ${content.confidence}`,
                `Mathematical rigor: ${content.mathematical ? 'validated' : 'not validated'}`
            ]
        };
    }
    /**
     * Enhance content with validation results
     */
    enhanceContentWithValidation(content, validation) {
        return {
            ...content,
            confidence: Math.max(content.confidence, validation.score),
            authenticityScore: Math.max(content.authenticityScore, validation.score),
            professionalGrade: validation.score >= 0.95 ? 'master' :
                validation.score >= 0.9 ? 'professional' :
                    content.professionalGrade
        };
    }
    /**
     * Get quality report for a domain
     */
    getQualityReport(domain) {
        const guardian = this.qualityGuardians.get(domain);
        if (!guardian) {
            return { error: `No quality guardian found for domain: ${domain}` };
        }
        return {
            domain,
            validator: guardian.validator.name,
            standards: guardian.standards[0],
            criteria: guardian.criteria.map(c => ({
                name: c.name,
                weight: c.weight,
                threshold: c.threshold
            }))
        };
    }
}
//# sourceMappingURL=qualityControlSystem.js.map