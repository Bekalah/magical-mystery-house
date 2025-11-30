/**
 * Professional Quality Control and Validation System
 *
 * Enterprise-grade quality assurance for all creative tools:
 * - Automated quality assessment with professional standards
 * - Design principle validation (composition, color, typography, accessibility)
 * - Sacred geometry and mathematical proportion validation
 * - Professional workflow integration with quality gates
 * - Automated suggestions and corrections
 * - Quality reporting and analytics
 * - Integration with all Cathedral professional tools
 * - Traditional art and design principle adherence
 *
 * Built for quality control across the entire design ecosystem
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0 Professional Edition
 * @license CC0 - Your Original Work
 */
export interface QualityStandard {
    id: string;
    name: string;
    category: 'design' | 'accessibility' | 'performance' | 'technical' | 'aesthetic' | 'mathematical';
    description: string;
    criteria: QualityCriterion[];
    severity_levels: SeverityLevel[];
    automation_level: 'manual' | 'semi_automatic' | 'fully_automatic';
    professional_thresholds: {
        master: number;
        professional: number;
        standard: number;
    };
    traditional_principles: string[];
    mathematical_requirements?: MathematicalRequirement[];
}
export interface QualityCriterion {
    id: string;
    name: string;
    description: string;
    metric_type: 'boolean' | 'numerical' | 'percentage' | 'ratio' | 'proportion';
    calculation_method: string;
    target_value?: number;
    acceptable_range?: {
        min: number;
        max: number;
    };
    weight: number;
    automation_capable: boolean;
    examples: string[];
}
export interface SeverityLevel {
    level: 'critical' | 'major' | 'minor' | 'info';
    threshold: number;
    description: string;
    action_required: string;
    auto_fixable: boolean;
}
export interface MathematicalRequirement {
    type: 'golden_ratio' | 'fibonacci' | 'sacred_geometry' | 'proportion' | 'symmetry';
    formula: string;
    tolerance: number;
    importance: 'essential' | 'important' | 'optional';
    cultural_context: string;
    traditional_source: string;
}
export interface QualityAssessment {
    id: string;
    subject_id: string;
    subject_type: 'vector' | 'typography' | 'layout' | 'image' | 'project' | 'collaboration';
    standards_applied: string[];
    overall_score: number;
    grade: 'master' | 'professional' | 'standard' | 'below_standard';
    category_scores: Map<string, number>;
    findings: QualityFinding[];
    recommendations: QualityRecommendation[];
    automation_applied: boolean;
    assessor: 'system' | 'human' | 'hybrid';
    created_at: Date;
    validated_at?: Date;
    expires_at?: Date;
    metadata: {
        processing_time: number;
        accuracy_confidence: number;
        professional_grade: 'master' | 'professional' | 'standard' | 'below_standard';
        cultural_authenticity: number;
        traditional_adherence: number;
    };
}
export interface QualityFinding {
    id: string;
    standard_id: string;
    criterion_id: string;
    severity: 'critical' | 'major' | 'minor' | 'info';
    category: string;
    title: string;
    description: string;
    location?: {
        element_id?: string;
        page?: number;
        coordinates?: {
            x: number;
            y: number;
        };
    };
    current_value: any;
    expected_value: any;
    impact_score: number;
    fix_difficulty: 'easy' | 'moderate' | 'difficult' | 'expert_required';
    automated_fix_available: boolean;
    fix_suggestion: string;
    traditional_context?: string;
    cultural_significance?: string;
    professional_impact: string;
    related_findings: string[];
}
export interface QualityRecommendation {
    id: string;
    category: string;
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    expected_impact: number;
    implementation_effort: 'minimal' | 'moderate' | 'significant';
    benefits: string[];
    risks: string[];
    implementation_steps: string[];
    traditional_wisdom?: string;
    mathematical_principles?: string;
    professional_standards?: string[];
    before_after_example?: {
        before: string;
        after: string;
        improvement_score: number;
    };
}
export interface QualityGate {
    id: string;
    name: string;
    description: string;
    stage: 'design' | 'review' | 'approval' | 'deployment' | 'maintenance';
    standards: string[];
    thresholds: {
        overall_score: number;
        category_scores: Map<string, number>;
        critical_issues: number;
        major_issues: number;
    };
    rules: QualityRule[];
    auto_fail_conditions: AutoFailCondition[];
    created_at: Date;
    updated_at: Date;
    owner: string;
    professional_grade: 'master' | 'professional' | 'standard';
}
export interface QualityRule {
    id: string;
    condition: string;
    action: 'pass' | 'fail' | 'warn' | 'require_review';
    description: string;
    severity: 'critical' | 'major' | 'minor';
    automation_level: 'manual' | 'automatic';
}
export interface AutoFailCondition {
    id: string;
    condition: string;
    reason: string;
    severity: 'critical' | 'major';
    bypass_allowed: boolean;
    bypass_requirements: string[];
}
export interface ValidationEngine {
    id: string;
    name: string;
    type: 'rule_based' | 'machine_learning' | 'mathematical' | 'traditional' | 'hybrid';
    capabilities: ValidationCapability[];
    accuracy_rate: number;
    training_data?: string[];
    update_frequency: string;
    last_trained?: Date;
    active: boolean;
}
export interface ValidationCapability {
    name: string;
    description: string;
    input_types: string[];
    output_quality: 'high' | 'medium' | 'low';
    speed: 'real_time' | 'fast' | 'moderate' | 'slow';
    resource_requirements: ResourceRequirement[];
}
export interface ResourceRequirement {
    type: 'cpu' | 'memory' | 'gpu' | 'storage' | 'network';
    amount: number;
    unit: string;
}
export interface QualityReport {
    id: string;
    title: string;
    period: {
        start: Date;
        end: Date;
    };
    scope: {
        projects: string[];
        users: string[];
        categories: string[];
    };
    summary: {
        total_assessments: number;
        average_score: number;
        grade_distribution: Map<string, number>;
        top_issues: QualityFinding[];
        improvement_trends: Map<string, number>;
        professional_progress: number;
    };
    details: AssessmentDetail[];
    recommendations: QualityRecommendation[];
    generated_at: Date;
    generated_by: string;
    report_type: 'individual' | 'team' | 'project' | 'organization' | 'historical';
}
export interface AssessmentDetail {
    assessment_id: string;
    subject: string;
    score_breakdown: Map<string, number>;
    key_findings: QualityFinding[];
    improvements_made: string[];
    professional_grade_achieved: 'master' | 'professional' | 'standard';
    validation_method: string;
    human_validator?: string;
}
export declare class ProfessionalQualityControlSystem {
    private standards;
    private assessmentHistory;
    private qualityGates;
    private validationEngines;
    private reportCache;
    private traditionalPrinciples;
    constructor();
    /**
     * Initialize the quality control system
     */
    private initializeQualitySystem;
    /**
     * Load professional quality standards
     */
    private loadStandards;
    /**
     * Set up validation engines
     */
    private setupValidationEngines;
    /**
     * Create default quality gates
     */
    private createDefaultQualityGates;
    /**
     * Perform comprehensive quality assessment
     */
    performQualityAssessment(subjectId: string, subjectType: QualityAssessment['subject_type'], options?: {
        standards?: string[];
        thoroughness?: 'quick' | 'standard' | 'comprehensive';
        include_traditional?: boolean;
        include_mathematical?: boolean;
        human_validation?: boolean;
    }): Promise<QualityAssessment>;
    /**
     * Validate against quality gate
     */
    validateQualityGate(gateId: string, assessmentId: string): Promise<{
        passed: boolean;
        details: any;
    }>;
    /**
     * Generate quality report
     */
    generateQualityReport(scope: {
        projects?: string[];
        users?: string[];
        period?: {
            start: Date;
            end: Date;
        };
        report_type: 'individual' | 'team' | 'project' | 'organization' | 'historical';
    }): Promise<QualityReport>;
    /**
     * Get automated quality fixes
     */
    getAutomatedFixes(assessmentId: string): AutomatedFix[];
    /**
     * Apply automated quality fixes
     */
    applyAutomatedFixes(assessmentId: string, fixIds: string[]): Promise<FixResult>;
    private createDesignPrinciplesStandard;
    private createAccessibilityStandard;
    private createMathematicalPrecisionStandard;
    private createTypographyStandard;
    private createSacredGeometryStandard;
    private createTraditionalArtStandard;
    private assessAgainstStandard;
    private assessCriterion;
    private calculateOverallScore;
    private determineGrade;
    private calculateConfidence;
    private calculateCulturalAuthenticity;
    private calculateTraditionalAdherence;
    private evaluateRule;
    private filterAssessmentsByScope;
    private calculateReportSummary;
    private generateReportRecommendations;
    private createAssessmentDetail;
    private createAutomatedFix;
    private getAutomatedFix;
    private executeFix;
    private generateFixSuggestion;
    private getTraditionalContext;
    private getProfessionalImpact;
    private getBenefits;
    private getRisks;
    private getImplementationSteps;
    private getTraditionalWisdom;
    private getMathematicalPrinciples;
    private getProfessionalStandards;
}
export interface AutomatedFix {
    id: string;
    finding_id: string;
    title: string;
    description: string;
    expected_improvement: number;
    application_method: 'automatic' | 'semi_automatic';
    preview_available: boolean;
    risk_level: 'low' | 'medium' | 'high';
}
export interface AppliedFix {
    fix_id: string;
    original_finding: string;
    new_score: number;
    improvement: number;
}
export interface FailedFix {
    fix_id: string;
    reason: string;
    severity: 'minor' | 'moderate' | 'major';
}
export interface FixResult {
    success: boolean;
    applied_fixes: AppliedFix[];
    failed_fixes: FailedFix[];
    total_improvement: number;
    new_assessment_score: number;
}
export declare const professionalQualityControlSystem: ProfessionalQualityControlSystem;
export default professionalQualityControlSystem;
//# sourceMappingURL=ProfessionalQualityControlSystem.d.ts.map