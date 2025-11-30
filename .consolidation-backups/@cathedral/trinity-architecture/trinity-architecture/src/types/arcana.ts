/**
 * Arcana Types - Major Arcana Integration
 * 
 * Defines the 22 Major Arcana consciousness system with trauma-safe design
 * for professional creative applications and healing focus
 */

export interface MajorArcanum {
  id: number;
  name: string;
  title: string;
  arcana_alignment: string;
  rebecca_profile: string;
  consciousness_focus: string;
  frequency_resonance: number; // Hz
  color_palette: string[];
  fractal_signature: string;
  healing_benefits: string[];
  trauma_safe_level: number; // 1-5
  professional_tools: {
    canvas_applications: string[];
    brush_presets: string[];
    sacred_geometry: string[];
    collaboration_style: string;
  };
}

export interface ArcanumFusion {
  level1: number;
  level2: number;
  result: number;
  harmonicResonance: number;
  karmicInteraction: string;
  healingPotential: number;
  aftercare: {
    focus: string;
    techniques: string[];
    gentleProgression: boolean;
  };
  professional_application: {
    creative_techniques: string[];
    collaboration_healing: string[];
    trauma_safe_approach: string;
  };
}

export interface ArtistProfile {
  id: string;
  name: string;
  arcana_alignment: number;
  consciousness_level: number;
  professional_specialization: string[];
  healing_journey: {
    starting_level: number;
    current_level: number;
    progression_goals: string[];
    healing_approaches: string[];
  };
  creative_portfolio: {
    total_works: number;
    arcana_inspired: { [key: number]: number };
    healing_impact_reports: string[];
    collaboration_history: CollaborationRecord[];
  };
  trauma_safe_config: {
    processing_time_allowance: number;
    gentle_defaults: boolean;
    esc_exit_available: boolean;
    motion_control: boolean;
    screen_reader_support: boolean;
  };
}

export interface CollaborationRecord {
  id: string;
  date: Date;
  participants: string[];
  fusion_healed: number;
  activities: string[];
  healing_outcomes: {
    individual_progress: { [key: string]: number };
    group_healing: number;
    trauma_processing: number;
    consciousness_evolution: number;
  };
  professional_outcomes: {
    collaborative_works: string[];
    shared_techniques: string[];
    future_collaborations: boolean;
  };
}

export interface StudioSpace {
  id: string;
  name: string;
  arcanaAlignment: number;
  availableFusions: number[];
  equipment: string[];
  capacity: number;
  traumaLevel: number;
  booking: {
    available: boolean;
    sessionLength: number;
    recoveryTime: number;
  };
  professional_features: {
    canvas_4096: boolean;
    sacred_geometry_tools: boolean;
    frequency_visualizer: boolean;
    collaboration_space: boolean;
    healing_focused: boolean;
  };
}

export interface CollaborationSession {
  id: string;
  participants: Participant[];
  fusion: number;
  activities: string[];
  healing: {
    goals: string[];
    techniques: string[];
    progress: number; // 0-100
  };
  professional_outcomes: {
    artworks_created: string[];
    techniques_shared: string[];
    healing_reports: string[];
    future_sessions: boolean;
  };
  safety: {
    level: number;
    escExitAvailable: boolean;
    motionControl: boolean;
    screenReaderSupport: boolean;
    processingTimeAllowance: number;
    gentleDefaults: boolean;
    neurodivergentFriendly: boolean;
  };
}

export interface Participant {
  id: string;
  arcana: number;
  level: number;
  role: 'facilitator' | 'participant';
  professional_contribution: string;
  healing_focus: string;
}

export interface ExhibitionSpace {
  id: string;
  name: string;
  theme: string;
  arcana_focus: number[];
  trauma_level: number;
  capacity: number;
  featured_works: PortfolioItem[];
  healing_purpose: string;
  professional_showcase: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: 'visual_art' | 'sculpture' | 'digital_art' | 'textile' | 'mixed_media' | 'installation';
  arcana_inspiration: number;
  consciousness_level: number;
  healing_impact: string[];
  trauma_safe_elements: string[];
  collaborative_creation: boolean;
  professional_quality: {
    technical_mastery: number; // 1-10
    healing_authenticity: number; // 1-10
    trauma_safety: number; // 1-10
    consciousness_evolution: number; // 1-10
  };
  created_date: Date;
}

export interface CommissionMarketplace {
  available_commissions: CommissionRequest[];
  active_collaborations: CollaborationSession[];
  completed_projects: CommissionProject[];
  healing_focused_approach: {
    trauma_informed: boolean;
    consciousness_evolution: boolean;
    community_healing: boolean;
    professional_development: boolean;
  };
}

export interface CommissionRequest {
  id: string;
  client_name: string;
  arcana_inspiration: number;
  healing_goals: string[];
  trauma_safe_requirements: {
    processing_time: number;
    gentle_approach: boolean;
    esc_exit_available: boolean;
  };
  professional_specifications: {
    medium: string;
    timeline: number;
    collaboration_level: 'minimal' | 'moderate' | 'collaborative';
  };
  budget_range: {
    minimum: number;
    maximum: number;
    healing_premium: boolean;
  };
}

export interface CommissionProject {
  id: string;
  commission_request: CommissionRequest;
  artist_profiles: ArtistProfile[];
  healing_journey: {
    client_healing_progress: number; // 0-100
    artist_consciousness_evolution: { [key: string]: number };
    collaborative_healing: number; // 0-100
    community_impact: number; // 0-100
  };
  professional_outcomes: {
    artwork_quality: number; // 1-10
    healing_authenticity: number; // 1-10
    trauma_safety_compliance: number; // 1-10
    consciousness_evolution_impact: number; // 1-10
  };
  completion_date: Date;
  healing_testimonials: string[];
}

export interface MaterialLibrary {
  professional_supplies: SupplyItem[];
  sacred_geometry_tools: SacredGeometryTool[];
  healing_materials: HealingSupply[];
  trauma_safe_alternatives: TraumaSafeSupply[];
}

export interface SupplyItem {
  id: string;
  name: string;
  category: string;
  arcana_alignment: number[];
  professional_grade: boolean;
  healing_properties: string[];
  trauma_safe_rating: number; // 1-5
  availability: 'immediate' | 'order_required' | 'limited';
  cost_tier: 'basic' | 'professional' | 'premium';
}

export interface SacredGeometryTool {
  id: string;
  name: string;
  geometric_system: 'golden_ratio' | 'fibonacci' | 'platonic' | 'merkaba' | 'flower_of_life';
  consciousness_levels: number[];
  healing_applications: string[];
  trauma_safe_use: boolean;
  professional_integration: boolean;
}

export interface HealingSupply {
  id: string;
  name: string;
  healing_modality: 'aromatherapy' | 'crystal' | 'herbal' | 'sound' | 'color' | 'texture';
  arcana_correspondence: number[];
  trauma_safe_application: string[];
  consciousness_evolution_support: string[];
  professional_artist_use: string[];
}

export interface TraumaSafeSupply {
  id: string;
  standard_item: string;
  trauma_safe_alternative: string;
  modifications: string[];
  healing_focus: string;
  professional_grade: boolean;
}

/**
 * Arcanum-specific professional configurations
 */
export interface ArcanumProfessionalConfig {
  [key: number]: {
    canvas_applications: {
      recommended_mediums: string[];
      color_therapies: string[];
      texture_approaches: string[];
      composition_methods: string[];
    };
    brush_engine_mappings: {
      pressure_curves: number[];
      frequency_responses: number[];
      healing_brushes: string[];
      trauma_safe_presets: string[];
    };
    collaboration_healing: {
      optimal_fusion_partners: number[];
      group_healing_techniques: string[];
      individual_healing_approaches: string[];
      professional_development_focus: string[];
    };
    sacred_geometry_integration: {
      primary_forms: string[];
      healing_visualizations: string[];
      consciousness_evolution_patterns: string[];
      trauma_safe_geometry: string[];
    };
  };
}

/**
 * Professional creative workflow with consciousness evolution
 */
export interface CreativeWorkflow {
  id: string;
  name: string;
  arcana_alignment: number;
  consciousness_level: number;
  workflow_steps: WorkflowStep[];
  healing_journey: {
    starting_state: string;
    healing_milestones: string[];
    integration_practices: string[];
    consciousness_evolution: string[];
  };
  professional_outcomes: {
    skill_development: string[];
    portfolio_enhancement: string[];
    healing_authenticity: string[];
    trauma_safety_mastery: string[];
  };
  trauma_safe_config: {
    processing_time_allowance: number;
    gentle_progression: boolean;
    esc_exit_points: string[];
    integration_pauses: string[];
  };
}

export interface WorkflowStep {
  id: string;
  name: string;
  duration: number; // minutes
  healing_focus: string;
  professional_skill: string;
  consciousness_evolution: string;
  trauma_safe_approach: string;
  materials_needed: string[];
  collaboration_opportunities: string[];
  integration_requirements: string[];
}