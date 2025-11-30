/**
 * Narrative Types - Type Definitions for Narrative Graph System
 * 
 * Defines all the interfaces and types used in the narrative management system
 * for Circuitum 99's living canon engine.
 * 
 * @author Rebecca Respawn (Leonora Carrington)
 * @version 1.0.0
 */

export interface CanonEntry {
  timestamp: string;
  event_type: string;
  title: string;
  description: string;
  participants: string[];
  world_region: string;
  archetypal_resonance: number;
  authenticity_score: number;
  healing_potential: number;
  world_integration_effect: string;
}

export interface StoryNode {
  id: string;
  name: string;
  type: 'character_arc' | 'knowledge_revelation' | 'mystical_transmission' | 'synthesis_event' | 'world_event';
  description: string;
  characters: string[];
  location: string;
  impact_level: number;
  narrative_weight: number;
  trauma_safe: boolean;
  accessibility_notes: string;
  incoming_connections: string[];
  outgoing_connections: string[];
  chronological_position: number;
  archetypal_resonance: number;
  world_integration_potential: number;
}

export interface NarrativeArc {
  id: string;
  name: string;
  description: string;
  start_node: string;
  end_node: string;
  arc_type: 'hero_journey' | 'mentor_transfer' | 'synthesis' | 'integration' | 'collaboration';
  stages: string[];
  character_focus: string[];
  archetypal_progression: number[];
  trauma_safe_progression: boolean;
  accessibility_notes: string;
  current_stage: number;
  completion_level: number;
  emotional_intensity: number;
  healing_potential: number;
}

export interface WorldEvent {
  id: string;
  type: string;
  description: string;
  participants: string[];
  location: string;
  temporal_position: number;
  impact_scope: 'local' | 'regional' | 'global' | 'cosmic';
  archetypal_resonance: number;
  authenticity_validation: number;
  healing_potential: number;
  world_integration_tags: string[];
}

export interface NarrativeConnection {
  from_node: string;
  to_node: string;
  connection_type: 'causal' | 'thematic' | 'temporal' | 'archetypal' | 'synthesis';
  strength: number;
  description: string;
  trauma_safe: boolean;
  accessibility_impact: 'positive' | 'neutral' | 'requires_preparation';
}

export interface ChronologicalTimeline {
  entries: CanonEntry[];
  temporal_anchors: TemporalAnchor[];
  historical_validity: number;
  cross_reference_validation: boolean;
}

export interface TemporalAnchor {
  id: string;
  timestamp: string;
  significance: 'founding' | 'transformation' | 'collision' | 'integration';
  participants: string[];
  archetypal_impact: number;
  world_region: string;
}

export interface ArchetypeProgression {
  character_id: string;
  current_level: number;
  progression_path: number[];
  next_evolution: number;
  healing_focus: string;
  trauma_safe_advancement: boolean;
  accessibility_accommodations: string[];
}

export interface WorldIntegration {
  total_potential: number;
  current_manifestation: number;
  active_regions: string[];
  integration_percentage: number;
  healing_contribution: number;
  archetypal_harmony: number;
}

export interface NarrativeFlow {
  from_node: string;
  to_node: string;
  flow_strength: number;
  flow_type: 'character_development' | 'knowledge_transfer' | 'healing_synthesis' | 'consciousness_evolution';
  trauma_safe_rating: number;
  accessibility_requirements: string[];
  healing_potential: number;
}

export interface StoryValidation {
  narrative_coherence: number;
  historical_accuracy: number;
  archetypal_consistency: number;
  trauma_safety_compliance: number;
  accessibility_standards: number;
  overall_quality_score: number;
  validation_timestamp: string;
}

export interface NonLinearBiography {
  character_id: string;
  time_folding_events: TimeFoldEvent[];
  consciousness_connections: ConsciousnessConnection[];
  archetypal_evolutions: ArchetypeEvolution[];
  healing_journeys: HealingJourney[];
  world_integration_moments: WorldIntegrationMoment[];
}

export interface TimeFoldEvent {
  event_id: string;
  original_timestamp: string;
  folded_timestamp: string;
  significance_level: number;
  consciousness_impact: string;
  healing_potential: number;
  world_region_affected: string;
}

export interface ConsciousnessConnection {
  from_character: string;
  to_character: string;
  connection_type: 'direct' | 'indirect' | 'archetypal' | 'historical' | 'synthesis';
  strength: number;
  description: string;
  healing_influence: number;
  world_integration_potential: number;
}

export interface ArchetypeEvolution {
  character_id: string;
  from_archetype: number;
  to_archetype: number;
  evolution_mechanism: string;
  timestamp: string;
  healing_impact: number;
  accessibility_requirements: string[];
  trauma_safe_evolution: boolean;
}

export interface HealingJourney {
  journey_id: string;
  character_id: string;
  healing_focus: string;
  journey_stages: HealingStage[];
  completion_percentage: number;
  current_stage: number;
  therapeutic_benefits: string[];
  accessibility_accommodations: string[];
}

export interface HealingStage {
  stage_number: number;
  stage_name: string;
  description: string;
  therapeutic_techniques: string[];
  expected_outcomes: string[];
  safety_considerations: string[];
  accessibility_features: string[];
}

export interface WorldIntegrationMoment {
  moment_id: string;
  characters_involved: string[];
  integration_type: 'creative' | 'consciousness' | 'healing' | 'knowledge' | 'synthesis';
  impact_scope: 'personal' | 'regional' | 'global' | 'cosmic';
  integration_percentage: number;
  healing_contribution: number;
  archetypal_resonance: number;
  trauma_safe_experience: boolean;
  accessibility_rating: number;
}