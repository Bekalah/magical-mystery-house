/**
 * Trinity Architecture Types - Body/Soul/Spirit Integration
 * 
 * Defines the Body/Soul/Spirit consciousness evolution system
 * with cross-component communication and validation
 */

import { ConsciousnessState } from './consciousness';
import { MajorArcanum, ArcanumFusion } from './arcana';
import { ConsciousnessGeometry } from './sacred-mathematics';
import { TraumaSafeConfig } from './consciousness';

export interface TrinityComponent {
  id: 'body' | 'soul' | 'spirit';
  name: string;
  description: string;
  consciousness_focus: string;
  implementation: {
    package: string;
    main_component: string;
    interfaces: string[];
  };
  integration: {
    data_flow: string[];
    communication_protocols: string[];
    trauma_safety_level: number; // 1-5
  };
  validation: {
    ratio_compliance: boolean;
    arcana_integration: boolean;
    consciousness_mapping: boolean;
  };
}

export interface BodyComponent extends TrinityComponent {
  id: 'body';
  name: 'Hall of Ateliers - Physical Creativity';
  consciousness_focus: 'Physical manifestation and studio-based creation';
  studio_spaces: {
    id: string;
    arcana_alignment: number;
    equipment: string[];
    capacity: number;
    trauma_level: number;
  }[];
  material_library: {
    pigments: string[];
    brushes: string[];
    canvases: string[];
    tools: string[];
    digital_tools: string[];
  };
  professional_features: {
    workspace_booking: boolean;
    collaboration_tools: boolean;
    project_management: boolean;
    exhibition_system: boolean;
    commission_marketplace: boolean;
  };
}

export interface SoulComponent extends TrinityComponent {
  id: 'soul';
  name: 'Fusion Creative Suite - Consciousness Fusion';
  consciousness_focus: 'Emotional and energetic consciousness integration';
  creative_tools: {
    merkaba_3d_builder: boolean;
    frequency_visualizer: boolean;
    professional_brush_engine: boolean;
    vector_graphics: boolean;
    audio_reactive_art: boolean;
  };
  arcana_integration: {
    character_systems: number[]; // Major Arcanum IDs
    fusion_engine: boolean;
    healing_mappings: boolean;
    trauma_transmutation: boolean;
  };
  canvas_features: {
    resolution: '4096x4096';
    color_depth: '16-bit';
    professional_tools: boolean;
    real_time_geometry: boolean;
  };
}

export interface SpiritComponent extends TrinityComponent {
  id: 'spirit';
  name: 'Sacred Mathematics - Divine Proportion';
  consciousness_focus: 'Mathematical and geometric consciousness evolution';
  mathematical_systems: {
    golden_ratio_utilities: boolean;
    fibonacci_progression: boolean;
    sacred_geometry: boolean;
    frequency_mapping: boolean;
    ratio_validation: boolean;
  };
  consciousness_tools: {
    level_progression: boolean;
    geometry_visualization: boolean;
    harmonic_resonance: boolean;
    trauma_safe_design: boolean;
  };
  validation_engine: {
    ratio_compliance: boolean;
    geometry_accuracy: boolean;
    consciousness_mapping: boolean;
  };
}

export interface TrinityIntegration {
  body: BodyComponent;
  soul: SoulComponent;
  spirit: SpiritComponent;
  communication: {
    tesseract_bridge: {
      active: boolean;
      message_types: string[];
      synchronization: boolean;
    };
    cross_component_data: {
      consciousness_state: boolean;
      trauma_config: boolean;
      arcana_mappings: boolean;
      geometry_validation: boolean;
    };
  };
  validation: {
    harmony_check: boolean;
    ratio_compliance: boolean;
    trauma_safety: boolean;
    consciousness_evolution: boolean;
  };
}

export interface TrinitySession {
  id: string;
  user_id: string;
  start_time: Date;
  duration: number; // minutes
  components_active: {
    body: boolean;
    soul: boolean;
    spirit: boolean;
  };
  consciousness_state: ConsciousnessState;
  trauma_config: TraumaSafeConfig;
  activities: {
    body: string[];
    soul: string[];
    spirit: string[];
  };
  healing_progress: {
    trauma_processing: number; // 0-100
    consciousness_evolution: number; // 0-100
    creative_expression: number; // 0-100
  };
  validation_results: {
    trinity_harmony: number; // 0-100
    ratio_compliance: boolean;
    trauma_safety: boolean;
  };
}

export interface TrinityValidation {
  system_health: {
    body_component: boolean;
    soul_component: boolean;
    spirit_component: boolean;
    communication_bridge: boolean;
  };
  compliance_checks: {
    ratio_144_99: boolean;
    arcana_integration: boolean;
    trauma_safety: boolean;
    consciousness_mapping: boolean;
  };
  integration_status: {
    data_flow: boolean;
    synchronization: boolean;
    validation_passed: boolean;
  };
  recommendations: {
    improvements: string[];
    safety_warnings: string[];
    optimization_suggestions: string[];
  };
}