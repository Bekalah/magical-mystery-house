/**
 * Professional Real-Time Collaboration Engine with Version Control
 *
 * Complete replacement for Figma's collaboration with enterprise-grade features:
 * - Real-time collaborative editing with conflict-free replicated data types
 * - Professional version control with branching, merging, and quality gates
 * - Quality control integration with automated validation
 * - Team management with role-based permissions
 * - Professional workflow tools with approval systems
 * - Adobe Creative Cloud and Figma compatibility layers
 * - Advanced conflict resolution and resolution tracking
 * - Professional audit trails and compliance features
 *
 * Built for quality control and professional team collaboration
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0 Professional Edition
 * @license CC0 - Your Original Work
 */
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'admin' | 'designer' | 'reviewer' | 'viewer';
    permissions: Permission[];
    avatar?: string;
    presence: UserPresence;
    professional_grade: 'master' | 'professional' | 'junior';
    expertise_areas: string[];
    last_active: Date;
    time_zone: string;
    language: string;
}
export interface UserPresence {
    status: 'online' | 'away' | 'busy' | 'offline';
    current_location: string;
    editing_element?: string;
    cursor_position?: {
        x: number;
        y: number;
    };
    selection: string[];
    tool_active: string;
    timestamp: Date;
}
export interface Permission {
    resource: 'project' | 'file' | 'element' | 'version' | 'export' | 'user_management';
    actions: ('read' | 'write' | 'delete' | 'admin' | 'approve' | 'quality_control')[];
    scope: 'global' | 'project' | 'file' | 'element';
    conditions?: {
        require_approval: boolean;
        quality_gates: string[];
        time_restrictions?: {
            start: string;
            end: string;
        };
    };
}
export interface Project {
    id: string;
    name: string;
    description: string;
    owner: string;
    team: User[];
    files: Map<string, CollaborativeFile>;
    branches: Map<string, ProjectBranch>;
    active_branch: string;
    settings: {
        collaboration_mode: 'real_time' | 'review' | 'locked';
        quality_control: boolean;
        require_approval: boolean;
        version_control: boolean;
        audit_trail: boolean;
        compliance_mode: boolean;
    };
    metadata: {
        created: Date;
        modified: Date;
        version: string;
        professional_grade: 'master' | 'professional' | 'standard';
        quality_score: number;
        total_contributors: number;
    };
}
export interface CollaborativeFile {
    id: string;
    name: string;
    type: 'design' | 'prototype' | 'vector' | 'typography' | 'layout' | 'component';
    content: FileContent;
    versions: Map<string, FileVersion>;
    current_version: string;
    collaborators: Map<string, UserPresence>;
    locks: Map<string, ElementLock>;
    comments: Comment[];
    activities: ActivityLog[];
    metadata: {
        created: Date;
        modified: Date;
        size: number;
        professional_grade: 'master' | 'professional' | 'standard';
        quality_score: number;
        last_quality_check: Date;
    };
}
export interface FileContent {
    elements: Map<string, DesignElement>;
    layers: Layer[];
    artboards: Artboard[];
    components: Component[];
    styles: StyleLibrary;
    constraints: ConstraintSystem;
    animations?: AnimationSystem;
    prototypes?: PrototypeSystem;
}
export interface DesignElement {
    id: string;
    type: 'shape' | 'text' | 'image' | 'component' | 'group' | 'frame';
    name: string;
    properties: ElementProperties;
    styles: ElementStyles;
    constraints: ElementConstraints;
    metadata: {
        created_by: string;
        created_at: Date;
        modified_by: string;
        modified_at: Date;
        version: number;
        quality_score: number;
        professional_grade: 'master' | 'professional' | 'standard';
        approval_status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
    };
    collaboration: {
        locked_by?: string;
        locked_at?: Date;
        conflicts: ConflictInfo[];
        merge_status: 'clean' | 'conflicted' | 'merged';
    };
}
export interface ElementProperties {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    opacity: number;
    visible: boolean;
    children?: string[];
    parent?: string;
}
export interface ElementStyles {
    fills: FillStyle[];
    strokes: StrokeStyle[];
    effects: EffectStyle[];
    typography?: TypographyStyle;
    shadows?: ShadowStyle[];
    blur?: BlurStyle;
}
export interface ElementConstraints {
    auto_layout?: AutoLayoutConstraints;
    resizing?: ResizingConstraints;
    spacing?: SpacingConstraints;
    alignment?: AlignmentConstraints;
}
export interface FileVersion {
    id: string;
    name: string;
    description: string;
    author: string;
    created_at: Date;
    parent_version?: string;
    changes: VersionChange[];
    quality_metrics: QualityMetrics;
    approval_status: 'draft' | 'review' | 'approved' | 'rejected' | 'archived';
    reviewers: string[];
    comments: VersionComment[];
    export_settings?: ExportSettings;
    metadata: {
        size: number;
        elements_count: number;
        collaboration_score: number;
        professional_grade: 'master' | 'professional' | 'standard';
    };
}
export interface VersionChange {
    type: 'create' | 'update' | 'delete' | 'move' | 'style_change' | 'constraint_change';
    element_id: string;
    old_value?: any;
    new_value?: any;
    author: string;
    timestamp: Date;
    quality_impact: QualityImpact;
}
export interface QualityImpact {
    impact_score: number;
    affected_metrics: string[];
    automation_applied: boolean;
    requires_review: boolean;
}
export interface QualityMetrics {
    overall_score: number;
    design_principles: number;
    accessibility: number;
    performance: number;
    maintainability: number;
    professional_standards: number;
    consistency: number;
    usability: number;
    issues: QualityIssue[];
    recommendations: QualityRecommendation[];
}
export interface QualityIssue {
    severity: 'critical' | 'major' | 'minor' | 'info';
    category: 'design' | 'accessibility' | 'performance' | 'consistency' | 'usability';
    description: string;
    element_id?: string;
    recommendation: string;
    auto_fixable: boolean;
}
export interface QualityRecommendation {
    category: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
    benefits: string[];
    implementation_notes: string;
}
export interface ProjectBranch {
    id: string;
    name: string;
    description: string;
    created_by: string;
    created_at: Date;
    base_branch: string;
    parent_branch?: string;
    status: 'active' | 'merged' | 'archived' | 'abandoned';
    merge_conflicts: MergeConflict[];
    quality_gates: QualityGate[];
    approvals: BranchApproval[];
    last_activity: Date;
    metadata: {
        commit_count: number;
        contributor_count: number;
        professional_grade: 'master' | 'professional' | 'standard';
        quality_trend: 'improving' | 'stable' | 'declining';
    };
}
export interface MergeConflict {
    element_id: string;
    type: 'content' | 'style' | 'constraint' | 'position';
    description: string;
    resolution_strategy: 'ours' | 'theirs' | 'manual' | 'blend';
    resolved: boolean;
    resolved_by?: string;
    resolved_at?: Date;
}
export interface QualityGate {
    id: string;
    name: string;
    description: string;
    type: 'automatic' | 'manual' | 'approval';
    criteria: QualityCriterion[];
    required: boolean;
    status: 'pending' | 'passed' | 'failed' | 'skipped';
    evaluated_at?: Date;
    evaluated_by?: string;
    notes?: string;
}
export interface QualityCriterion {
    metric: string;
    operator: '>' | '<' | '>=' | '<=' | '==' | '!=';
    threshold: number;
    weight: number;
    description: string;
}
export interface BranchApproval {
    id: string;
    reviewer: string;
    status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
    comment?: string;
    approved_at?: Date;
    professional_grade: 'master' | 'professional' | 'junior';
}
export interface Comment {
    id: string;
    content: string;
    author: string;
    created_at: Date;
    updated_at?: Date;
    resolved: boolean;
    resolved_by?: string;
    resolved_at?: Date;
    replies: CommentReply[];
    mentions: string[];
    attachments: string[];
    position?: {
        x: number;
        y: number;
    };
    target_element?: string;
    status: 'open' | 'resolved' | 'archived';
    priority: 'high' | 'medium' | 'low';
}
export interface CommentReply {
    id: string;
    content: string;
    author: string;
    created_at: Date;
    updated_at?: Date;
}
export interface ActivityLog {
    id: string;
    type: 'create' | 'update' | 'delete' | 'comment' | 'approve' | 'merge' | 'branch' | 'export';
    actor: string;
    target: string;
    description: string;
    details: any;
    timestamp: Date;
    impact: 'high' | 'medium' | 'low';
    quality_related: boolean;
}
export interface ElementLock {
    element_id: string;
    locked_by: string;
    locked_at: Date;
    lock_type: 'edit' | 'style' | 'delete' | 'move';
    reason?: string;
    expires_at?: Date;
}
export interface ConflictInfo {
    type: 'concurrent_edit' | 'style_conflict' | 'position_conflict' | 'hierarchy_conflict';
    description: string;
    conflicting_users: string[];
    detected_at: Date;
    resolution_suggestions: string[];
    auto_resolvable: boolean;
}
export interface Layer {
    id: string;
    name: string;
    type: 'frame' | 'group' | 'vector' | 'text' | 'image' | 'component';
    visible: boolean;
    locked: boolean;
    opacity: number;
    blend_mode: string;
    children?: string[];
    effects?: EffectStyle[];
}
export interface Artboard {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    background: string;
    preset: 'custom' | 'desktop' | 'tablet' | 'mobile' | 'print' | 'social';
}
export interface Component {
    id: string;
    name: string;
    description: string;
    variants: ComponentVariant[];
    properties: ComponentProperty[];
    instances: string[];
}
export interface ComponentVariant {
    id: string;
    name: string;
    properties: Record<string, any>;
    size: 'small' | 'medium' | 'large';
}
export interface ComponentProperty {
    id: string;
    name: string;
    type: 'text' | 'boolean' | 'number' | 'color' | 'instance' | 'variant';
    default_value: any;
    options?: any[];
}
export interface StyleLibrary {
    text_styles: Map<string, TypographyStyle>;
    grid_styles: Map<string, GridStyle>;
    effect_styles: Map<string, EffectStyle>;
    fill_styles: Map<string, FillStyle>;
    stroke_styles: Map<string, StrokeStyle>;
}
export interface ConstraintSystem {
    layout_constraints: LayoutConstraint[];
    sizing_constraints: SizingConstraint[];
    position_constraints: PositionConstraint[];
}
export interface AnimationSystem {
    interactions: Interaction[];
    transitions: Transition[];
    micro_interactions: MicroInteraction[];
}
export interface PrototypeSystem {
    flows: PrototypeFlow[];
    triggers: PrototypeTrigger[];
    overlays: PrototypeOverlay[];
}
export interface FillStyle {
}
export interface StrokeStyle {
}
export interface EffectStyle {
}
export interface TypographyStyle {
}
export interface ShadowStyle {
}
export interface BlurStyle {
}
export interface AutoLayoutConstraints {
}
export interface ResizingConstraints {
}
export interface SpacingConstraints {
}
export interface AlignmentConstraints {
}
export interface GridStyle {
}
export interface LayoutConstraint {
}
export interface SizingConstraint {
}
export interface PositionConstraint {
}
export interface Interaction {
}
export interface Transition {
}
export interface MicroInteraction {
}
export interface PrototypeFlow {
}
export interface PrototypeTrigger {
}
export interface PrototypeOverlay {
}
export interface VersionComment {
}
export interface ExportSettings {
}
export declare class ProfessionalCollaborationEngine {
    private projects;
    private users;
    private connectionManager;
    private conflictResolver;
    private qualityController;
    private versionController;
    private auditLogger;
    constructor();
    /**
     * Initialize the collaboration system
     */
    private initializeCollaborationSystem;
    /**
     * Create a new project
     */
    createProject(name: string, owner: string, options?: Partial<Project>): Project;
    /**
     * Add user to project
     */
    addUserToProject(projectId: string, userId: string, role: User['role'], permissions: Permission[]): void;
    /**
     * Create a collaborative file
     */
    createCollaborativeFile(projectId: string, name: string, type: CollaborativeFile['type']): CollaborativeFile;
    /**
     * Start real-time collaboration session
     */
    startCollaborationSession(fileId: string, userId: string): CollaborationSession;
    /**
     * Apply collaborative changes
     */
    applyCollaborativeChanges(fileId: string, changes: VersionChange[], userId: string): Promise<ChangeResult>;
    /**
     * Create a new version
     */
    createVersion(fileId: string, name: string, description: string, userId: string): Promise<FileVersion>;
    /**
     * Create a project branch
     */
    createBranch(projectId: string, name: string, description: string): ProjectBranch;
    /**
     * Merge branches with quality control
     */
    mergeBranches(projectId: string, sourceBranch: string, targetBranch: string, userId: string): Promise<MergeResult>;
    /**
     * Request version approval
     */
    requestVersionApproval(fileId: string, versionId: string, reviewerIds: string[]): void;
    /**
     * Approve or reject version
     */
    processVersionApproval(fileId: string, versionId: string, reviewerId: string, approved: boolean, comment?: string): void;
    private createEmptyFileContent;
    private createInitialVersion;
    private findFileById;
    private generateVersionId;
    private calculateChanges;
    private applyChange;
    private calculateFileQuality;
    private calculateFileSize;
    private calculateCollaborationScore;
    private determineFileGrade;
    private createDefaultQualityGates;
    private checkQualityGates;
    private detectMergeConflicts;
    private performMerge;
    private notifyReviewers;
}
export interface CollaborationSession {
    id: string;
    file_id: string;
    user_id: string;
    started_at: Date;
    last_activity: Date;
    connection_quality: 'excellent' | 'good' | 'fair' | 'poor';
    sync_status: 'synchronized' | 'syncing' | 'conflicted' | 'offline';
}
export interface ChangeResult {
    success: boolean;
    conflicts?: ConflictInfo[];
    quality_results?: QualityMetrics;
    applied_changes?: number;
    message?: string;
}
export interface MergeResult {
    success: boolean;
    merged_files?: number;
    quality_improvement?: number;
    reason?: string;
    conflicts?: MergeConflict[];
    quality_results?: QualityGateResult;
}
export interface QualityGateResult {
    passed: boolean;
    improvement_score: number;
    failed_gates: QualityGate[];
}
export declare const professionalCollaborationEngine: ProfessionalCollaborationEngine;
export default professionalCollaborationEngine;
//# sourceMappingURL=ProfessionalCollaborationEngine.d.ts.map