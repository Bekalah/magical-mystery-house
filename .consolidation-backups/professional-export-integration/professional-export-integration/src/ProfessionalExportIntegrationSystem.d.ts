/**
 * Professional Export and Integration System
 *
 * Complete replacement for Adobe Creative Cloud and Figma export capabilities:
 * - Professional export formats (PDF, EPS, AI, SVG, PNG, JPG, WebP, etc.)
 * - Adobe Creative Cloud compatibility layers
 * - Figma import/export compatibility
 * - Print-ready production with CMYK, spot colors, bleeds
 * - Web-ready optimization and responsive exports
 * - Professional color management and ICC profiles
 * - Batch processing and automation capabilities
 * - Integration with existing design workflows
 * - Quality control validation before export
 *
 * Built for professional design production and distribution
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0 Professional Edition
 * @license CC0 - Your Original Work
 */
export interface ExportProfile {
    id: string;
    name: string;
    description: string;
    category: 'print' | 'web' | 'mobile' | 'social' | 'presentation' | 'archive';
    format: ExportFormat;
    quality_settings: QualitySettings;
    color_settings: ColorSettings;
    resolution_settings: ResolutionSettings;
    optimization: OptimizationSettings;
    metadata: ExportMetadata;
    created_by: string;
    created_at: Date;
    professional_grade: 'master' | 'professional' | 'standard';
    usage_context: string[];
    compatibility: CompatibilityMatrix;
}
export interface ExportFormat {
    type: 'pdf' | 'eps' | 'ai' | 'svg' | 'png' | 'jpg' | 'webp' | 'gif' | 'tiff' | 'bmp' | 'indd' | 'sketch' | 'fig';
    name: string;
    extension: string;
    mime_type: string;
    supports_layers: boolean;
    supports_vectors: boolean;
    supports_text: boolean;
    supports_images: boolean;
    supports_metadata: boolean;
    max_resolution?: number | 'unlimited';
    color_depths: number[];
    compression_options: CompressionOption[];
}
export interface QualitySettings {
    compression_level: 'lossless' | 'high' | 'medium' | 'low';
    quality_percentage: number;
    anti_aliasing: boolean;
    dithering: 'none' | 'floyd_steinberg' | 'ordered' | 'random';
    color_sampling: '4:4:4' | '4:2:2' | '4:2:0' | 'grayscale';
    progressive_jpeg: boolean;
    interlace: 'none' | 'adam7';
    optimize_for_web: boolean;
    include_srgb_profile: boolean;
    strip_metadata: boolean;
}
export interface ColorSettings {
    color_space: 'sRGB' | 'AdobeRGB' | 'ProPhotoRGB' | 'CMYK' | 'Lab' | 'Grayscale';
    icc_profile: string;
    preserve_embedded_colors: boolean;
    convert_to_dest_profile: boolean;
    black_point_compensation: boolean;
    render_intent: 'perceptual' | 'relative_colorimetric' | 'saturation' | 'absolute_colorimetric';
    spot_colors: SpotColor[];
    overprint_simulation: boolean;
    proof_colors: boolean;
}
export interface SpotColor {
    name: string;
    color_values: {
        CMYK?: {
            C: number;
            M: number;
            Y: number;
            K: number;
        };
        RGB?: {
            R: number;
            G: number;
            B: number;
        };
        Lab?: {
            L: number;
            a: number;
            b: number;
        };
        Pantone?: string;
    };
    transparency: number;
    overprint: boolean;
}
export interface ResolutionSettings {
    dpi: number;
    width: number | 'auto';
    height: number | 'auto';
    maintain_aspect_ratio: boolean;
    allow_upscaling: boolean;
    max_width?: number;
    max_height?: number;
    crop_to_fit: boolean;
    padding_color?: string;
    bleed?: BleedSettings;
}
export interface BleedSettings {
    enabled: boolean;
    top: number;
    right: number;
    bottom: number;
    left: number;
    units: 'mm' | 'in' | 'px';
}
export interface OptimizationSettings {
    file_size_limit: number;
    remove_unused_layers: boolean;
    flatten_layers: boolean;
    optimize_vectors: boolean;
    remove_text_outlines: boolean;
    combine_similar_elements: boolean;
    remove_duplicate_elements: boolean;
    compress_shapes: boolean;
    optimize_images: boolean;
    lazy_loading: boolean;
}
export interface ExportMetadata {
    title: string;
    description: string;
    author: string;
    copyright: string;
    keywords: string[];
    subject: string;
    creation_date: Date;
    modification_date: Date;
    application: string;
    version: string;
    custom_fields: Record<string, any>;
    include_xmp_metadata: boolean;
    include_iptc_metadata: boolean;
    include_exif_metadata: boolean;
}
export interface CompatibilityMatrix {
    adobe_creative_suite: {
        illustrator: boolean;
        photoshop: boolean;
        indesign: boolean;
        acrobat: boolean;
    };
    figma: boolean;
    sketch: boolean;
    affinity_designer: boolean;
    canva: boolean;
    coreldraw: boolean;
    inkscape: boolean;
    gimp: boolean;
    web_browsers: {
        chrome: boolean;
        firefox: boolean;
        safari: boolean;
        edge: boolean;
    };
}
export interface CompressionOption {
    name: string;
    description: string;
    level: number;
    lossless: boolean;
    algorithm: string;
}
export interface ExportJob {
    id: string;
    source_file: string;
    export_profile_id: string;
    output_path: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    progress: number;
    start_time: Date;
    end_time?: Date;
    error_message?: string;
    quality_report: ExportQualityReport;
    output_files: OutputFile[];
    metadata: ExportJobMetadata;
}
export interface OutputFile {
    path: string;
    size: number;
    format: ExportFormat['type'];
    checksum: string;
    quality_score: number;
    optimized: boolean;
    accessibility_score: number;
}
export interface ExportQualityReport {
    overall_score: number;
    file_size_score: number;
    quality_score: number;
    compatibility_score: number;
    accessibility_score: number;
    performance_score: number;
    issues: ExportIssue[];
    recommendations: ExportRecommendation[];
    validation_results: ValidationResult[];
}
export interface ExportIssue {
    severity: 'critical' | 'major' | 'minor' | 'info';
    category: 'color' | 'resolution' | 'compression' | 'metadata' | 'compatibility' | 'accessibility';
    title: string;
    description: string;
    impact: string;
    solution: string;
    automated_fix_available: boolean;
}
export interface ExportRecommendation {
    category: string;
    title: string;
    description: string;
    expected_improvement: number;
    effort_level: 'minimal' | 'moderate' | 'significant';
    benefits: string[];
}
export interface ValidationResult {
    check_name: string;
    passed: boolean;
    score: number;
    details: string;
    recommendations: string[];
}
export interface ExportJobMetadata {
    source_type: 'vector' | 'typography' | 'layout' | 'collaboration';
    project_id: string;
    user_id: string;
    batch_id?: string;
    retry_count: number;
    total_files_exported: number;
    success_rate: number;
    processing_time: number;
}
export interface BatchExportRequest {
    id: string;
    name: string;
    description: string;
    source_files: string[];
    export_profiles: string[];
    output_directory: string;
    naming_convention: NamingConvention;
    scheduling: ExportScheduling;
    notification_settings: NotificationSettings;
    quality_validation: QualityValidationSettings;
    created_by: string;
    created_at: Date;
}
export interface NamingConvention {
    pattern: string;
    variables: {
        project_name: boolean;
        page_number: boolean;
        date: boolean;
        time: boolean;
        profile_name: boolean;
        user_name: boolean;
        version: boolean;
        custom_fields: string[];
    };
    separator: string;
    case_style: 'original' | 'uppercase' | 'lowercase' | 'title_case';
    replace_spaces: boolean;
    invalid_character_replacement: string;
}
export interface ExportScheduling {
    enabled: boolean;
    schedule_type: 'immediate' | 'delayed' | 'recurring';
    delay_minutes?: number;
    recurring_pattern?: {
        frequency: 'daily' | 'weekly' | 'monthly';
        time: string;
        days_of_week?: number[];
        day_of_month?: number;
    };
    max_concurrent_jobs: number;
    priority: 'low' | 'normal' | 'high' | 'urgent';
}
export interface NotificationSettings {
    enabled: boolean;
    email_notifications: boolean;
    email_addresses: string[];
    webhook_url?: string;
    slack_webhook?: string;
    notify_on_completion: boolean;
    notify_on_failure: boolean;
    notify_on_progress: boolean;
    progress_interval: number;
}
export interface QualityValidationSettings {
    enabled: boolean;
    validation_level: 'basic' | 'standard' | 'comprehensive';
    fail_on_critical_issues: boolean;
    fail_on_major_issues: boolean;
    auto_retry_on_failure: boolean;
    max_retries: number;
    custom_checks: CustomCheck[];
}
export interface CustomCheck {
    id: string;
    name: string;
    description: string;
    script: string;
    parameters: Record<string, any>;
    severity: 'critical' | 'major' | 'minor';
    enabled: boolean;
}
export interface IntegrationConfig {
    adobe_creative_suite: AdobeIntegration;
    figma: FigmaIntegration;
    sketch: SketchIntegration;
    canva: CanvaIntegration;
    custom_integrations: CustomIntegration[];
}
export interface AdobeIntegration {
    enabled: boolean;
    version: string;
    api_endpoint?: string;
    authentication: AdobeAuth;
    sync_settings: AdobeSyncSettings;
    export_presets: AdobeExportPreset[];
}
export interface AdobeAuth {
    type: 'api_key' | 'oauth' | 'service_account';
    api_key?: string;
    client_id?: string;
    client_secret?: string;
    redirect_uri?: string;
    scopes: string[];
}
export interface AdobeSyncSettings {
    sync_direction: 'export_only' | 'import_only' | 'bidirectional';
    conflict_resolution: 'manual' | 'newer_wins' | 'adobe_wins' | 'local_wins';
    auto_sync: boolean;
    sync_interval: number;
    sync_on_save: boolean;
    include_metadata: boolean;
    include_annotations: boolean;
}
export interface AdobeExportPreset {
    name: string;
    description: string;
    format: string;
    settings: Record<string, any>;
    created_at: Date;
}
export interface FigmaIntegration {
    enabled: boolean;
    access_token: string;
    team_id?: string;
    project_id?: string;
    sync_settings: FigmaSyncSettings;
    import_options: FigmaImportOptions;
    export_options: FigmaExportOptions;
}
export interface FigmaSyncSettings {
    sync_direction: 'figma_to_local' | 'local_to_figma' | 'bidirectional';
    conflict_resolution: 'figma_wins' | 'local_wins' | 'manual';
    auto_sync: boolean;
    sync_interval: number;
    include_components: boolean;
    include_styles: boolean;
    include_tokens: boolean;
}
export interface FigmaImportOptions {
    import_mode: 'replace' | 'merge' | 'append';
    preserve_hierarchy: boolean;
    import_text_styles: boolean;
    import_effects: boolean;
    import_constraints: boolean;
    create_components: boolean;
    map_colors: boolean;
}
export interface FigmaExportOptions {
    export_format: 'svg' | 'png' | 'jpg' | 'pdf';
    scale_factors: number[];
    single_file: boolean;
    include_overflow: boolean;
    use_absolute_bounds: boolean;
    svg_include_id: boolean;
    svg_include_node_id: boolean;
}
export interface SketchIntegration {
    enabled: boolean;
    access_token: string;
    team_id?: string;
    sync_settings: SketchSyncSettings;
}
export interface SketchSyncSettings {
    sync_direction: 'sketch_to_local' | 'local_to_sketch' | 'bidirectional';
    auto_sync: boolean;
    include_symbols: boolean;
    include_styles: boolean;
    include_artboards: boolean;
}
export interface CanvaIntegration {
    enabled: boolean;
    api_key: string;
    sync_settings: CanvaSyncSettings;
}
export interface CanvaSyncSettings {
    sync_direction: 'canva_to_local' | 'local_to_canva' | 'bidirectional';
    auto_sync: boolean;
    import_brand_kit: boolean;
    include_fonts: boolean;
    include_colors: boolean;
}
export interface CustomIntegration {
    id: string;
    name: string;
    description: string;
    endpoint: string;
    api_version: string;
    authentication: CustomAuth;
    capabilities: IntegrationCapability[];
    settings: Record<string, any>;
    enabled: boolean;
}
export interface CustomAuth {
    type: 'api_key' | 'oauth' | 'bearer' | 'basic';
    credentials: Record<string, string>;
    headers: Record<string, string>;
}
export interface IntegrationCapability {
    name: string;
    description: string;
    supported_operations: string[];
    max_file_size: number;
    rate_limits: {
        requests_per_minute: number;
        requests_per_hour: number;
        requests_per_day: number;
    };
}
export declare class ProfessionalExportIntegrationSystem {
    private exportProfiles;
    private exportJobs;
    private integrationConfigs;
    private qualityValidator;
    private formatProcessors;
    private compatibilityCheckers;
    private static readonly SUPPORTED_FORMATS;
    constructor();
    /**
     * Initialize the integration configuration
     */
    private initializeIntegrationConfigs;
    /**
     * Initialize format processors
     */
    private initializeFormatProcessors;
    /**
     * Initialize compatibility checkers
     */
    private initializeCompatibilityCheckers;
    /**
     * Load default export profiles
     */
    private loadDefaultExportProfiles;
    /**
     * Export document with specified profile
     */
    exportDocument(sourceFile: string, profileId: string, outputPath?: string, options?: Partial<ExportOptions>): Promise<ExportJob>;
    /**
     * Create custom export profile
     */
    createCustomProfile(name: string, format: ExportFormat, settings?: Partial<ExportProfile>): ExportProfile;
    /**
     * Create batch export request
     */
    createBatchExport(request: Omit<BatchExportRequest, 'id' | 'created_at'>): BatchExportRequest;
    /**
     * Execute batch export
     */
    executeBatchExport(request: BatchExportRequest): Promise<BatchExportResult>;
    /**
     * Configure integration
     */
    configureIntegration(integration: keyof IntegrationConfig, config: any): void;
    /**
     * Validate export compatibility
     */
    validateCompatibility(format: ExportFormat['type'], requirements: CompatibilityRequirement[]): Promise<CompatibilityValidation>;
    /**
     * Get export progress
     */
    getExportProgress(jobId: string): ExportProgress;
    /**
     * Cancel export job
     */
    cancelExport(jobId: string): boolean;
    private processExportJob;
    private validateSourceFile;
    private preProcessContent;
    private generateOutputPath;
    private generateBatchOutputPath;
    private applyNamingConvention;
    private detectSourceType;
    private createEmptyQualityReport;
    private getCurrentStep;
    private estimateRemainingTime;
    private setupMonitoring;
    private createPrintReadyPDFProfile;
    private createWebPNGProfile;
    private createSocialJPGProfile;
    private createMobileWebPProfile;
    private createVectorSVGProfile;
    private createPrintEPSProfile;
    private getDefaultQualitySettings;
    private getDefaultColorSettings;
    private getDefaultResolutionSettings;
    private getDefaultOptimizationSettings;
    private getDefaultMetadata;
    private getDefaultCompatibility;
}
export interface ExportOptions {
    project_id?: string;
    user_id?: string;
    batch_id?: string;
    custom_settings?: Record<string, any>;
}
export interface ExportProgress {
    job_id: string;
    status: ExportJob['status'];
    progress: number;
    current_step: string;
    estimated_remaining: number;
    quality_score: number;
}
export interface BatchExportResult {
    batch_id: string;
    total_jobs: number;
    successful_jobs: number;
    failed_jobs_count: number;
    success_rate: number;
    results: ExportJob[];
    failed_jobs: FailedJob[];
    execution_time: number;
}
export interface FailedJob {
    source_file: string;
    profile_id: string;
    error: string;
}
export interface CompatibilityRequirement {
    type: 'resolution' | 'color_space' | 'format_version' | 'features' | 'size';
    value: any;
    comparison: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'supports';
}
export interface CompatibilityValidation {
    compatible: boolean;
    issues: string[];
    recommendations: string[];
    score: number;
}
export declare const professionalExportIntegrationSystem: ProfessionalExportIntegrationSystem;
export default professionalExportIntegrationSystem;
//# sourceMappingURL=ProfessionalExportIntegrationSystem.d.ts.map