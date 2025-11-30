/**
 * Archetype Collisions - Creative Synthesis and Conflict Resolution
 * 
 * Manages the complex interactions when different archetypal energies
 * collide, creating synthesis, conflict, or transformation in the meta-narrative.
 * 
 * @author Rebecca Respawn (Leonora Carrington)
 * @version 1.0.0
 */

import { RealCreatorNode } from '../nodes/real-creator-node';

export interface ArchetypeCollision {
  id: string;
  primary_archetype: number;
  secondary_archetype: number;
  collision_type: 'synthesis' | 'tension' | 'transformation' | 'revelation' | 'integration';
  involved_figures: string[];
  collision_description: string;
  synthesis_outcome: string;
  healing_potential: number;
  trauma_safe_experience: boolean;
  accessibility_accommodations: string[];
  creative_output: CreativeOutput;
  consciousness_evolution: number;
  world_integration_impact: number;
}

export interface CreativeOutput {
  artistic_synthesis: string;
  narrative_development: string;
  archetypal_evolution: string;
  historical_significance: string;
  modern_applicability: string;
  healing_techniques: string[];
  collaboration_methods: string[];
}

export interface CollisionPattern {
  archetype_pair: [number, number];
  frequency_of_occurrence: number;
  typical_outcome: string;
  healing_benefits: string[];
  creative_potential: number;
  trauma_safe_rating: number;
  accessibility_features: string[];
}

export interface ArchetypeResonance {
  source_figure: string;
  target_figure: string;
  resonance_frequency: number;
  archetypal_harmony: number;
  creative_collaboration: number;
  healing_influence: number;
  world_integration_potential: number;
}

export interface SynthesisEvent {
  event_id: string;
  colliding_archetypes: number[];
  figures_involved: string[];
  synthesis_type: 'artistic' | 'philosophical' | 'practical' | 'mystical' | 'scientific';
  collaboration_outcome: string;
  historical_impact: number;
  modern_relevance: number;
  healing_contribution: number;
  accessibility_requirements: string[];
  trauma_safe_experience: boolean;
}

export class ArchetypeCollisions {
  private collision_database: Map<string, ArchetypeCollision> = new Map();
  private pattern_library: CollisionPattern[] = [];
  private active_collisions: Map<string, ArchetypeCollision> = new Map();
  private synthesis_events: SynthesisEvent[] = [];
  private archetypal_network: Map<string, ArchetypeResonance[]> = new Map();

  constructor() {
    this.initializeCollisionPatterns();
    this.initializeArchetypeNetwork();
  }

  private initializeCollisionPatterns(): void {
    const patterns: CollisionPattern[] = [
      {
        archetype_pair: [0, 1], // Fool + Magician
        frequency_of_occurrence: 0.8,
        typical_outcome: 'Visionary manifestation',
        healing_benefits: [
          'Translates dreams into reality',
          'Maintains wonder while building practical skills',
          'Balances intuition with method'
        ],
        creative_potential: 0.9,
        trauma_safe_rating: 0.8,
        accessibility_features: [
          'Gentle progression from imagination to action',
          'Celebrates mistakes as learning opportunities',
          'Maintains childlike wonder safely'
        ]
      },
      {
        archetype_pair: [1, 5], // Magician + Hierophant
        frequency_of_occurrence: 0.7,
        typical_outcome: 'Knowledge transmission through practical wisdom',
        healing_benefits: [
          'Bridges theoretical and practical knowledge',
          'Makes wisdom accessible and applicable',
          'Honors tradition while encouraging innovation'
        ],
        creative_potential: 0.85,
        trauma_safe_rating: 0.9,
        accessibility_features: [
          'Respectful approach to traditional knowledge',
          'Clear, structured learning paths',
          'Encourages questions and exploration'
        ]
      },
      {
        archetype_pair: [5, 21], // Hierophant + World
        frequency_of_occurrence: 0.6,
        typical_outcome: 'Integration of wisdom into completion',
        healing_benefits: [
          'Synthesizes diverse knowledge systems',
          'Brings wisdom to completion and mastery',
          'Creates comprehensive understanding'
        ],
        creative_potential: 0.95,
        trauma_safe_rating: 0.7,
        accessibility_features: [
          'Gradual integration of complex concepts',
          'Celebration of different wisdom traditions',
          'Support for different learning styles'
        ]
      },
      {
        archetype_pair: [0, 21], // Fool + World
        frequency_of_occurrence: 0.9,
        typical_outcome: 'Return to innocence with full wisdom',
        healing_benefits: [
          'Maintains wonder while achieving mastery',
          'Preserves beginner\'s mind in expertise',
          'Creates compassionate wisdom'
        ],
        creative_potential: 1.0,
        trauma_safe_rating: 0.85,
        accessibility_features: [
          'Approachable despite complexity',
          'Maintains joy and playfulness',
          'Celebrates diversity and uniqueness'
        ]
      }
    ];

    this.pattern_library = patterns;
  }

  private initializeArchetypeNetwork(): void {
    // Initialize with key archetypal resonances
    const keyResonances: ArchetypeResonance[] = [
      {
        source_figure: 'Leonora Carrington',
        target_figure: 'John Dee',
        resonance_frequency: 741, // Consciousness expansion
        archetypal_harmony: 0.8,
        creative_collaboration: 0.9,
        healing_influence: 0.85,
        world_integration_potential: 0.9
      },
      {
        source_figure: 'John Dee',
        target_figure: 'Dion Fortune',
        resonance_frequency: 210, // Healing and lunar wisdom
        archetypal_harmony: 0.85,
        creative_collaboration: 0.8,
        healing_influence: 0.95,
        world_integration_potential: 0.8
      },
      {
        source_figure: 'Leonora Carrington',
        target_figure: 'Dion Fortune',
        resonance_frequency: 528, // DNA activation, love
        archetypal_harmony: 0.9,
        creative_collaboration: 0.85,
        healing_influence: 0.9,
        world_integration_potential: 0.85
      }
    ];

    for (const resonance of keyResonances) {
      const key = `${resonance.source_figure}->${resonance.target_figure}`;
      if (!this.archetypal_network.has(resonance.source_figure)) {
        this.archetypal_network.set(resonance.source_figure, []);
      }
      this.archetypal_network.get(resonance.source_figure)!.push(resonance);
    }
  }

  // Core Methods
  public async detectCollision(
    primary_archetype: number,
    secondary_archetype: number,
    involved_figures: string[]
  ): Promise<ArchetypeCollision> {
    const collisionId = this.generateCollisionId(primary_archetype, secondary_archetype);
    
    // Check if collision already exists
    if (this.collision_database.has(collisionId)) {
      return this.collision_database.get(collisionId)!;
    }

    // Create new collision based on pattern matching
    const collision = await this.createCollisionFromPattern(
      primary_archetype,
      secondary_archetype,
      involved_figures
    );

    this.collision_database.set(collisionId, collision);
    this.active_collisions.set(collisionId, collision);

    return collision;
  }

  public async resolveCollision(
    collisionId: string,
    resolution_type: 'synthesis' | 'transformation' | 'integration' | 'reconciliation'
  ): Promise<{
    resolved: boolean;
    outcome: string;
    creative_output: CreativeOutput;
    healing_impact: number;
    accessibility_benefits: string[];
  }> {
    const collision = this.collision_database.get(collisionId);
    if (!collision) {
      return {
        resolved: false,
        outcome: 'Collision not found',
        creative_output: {} as CreativeOutput,
        healing_impact: 0,
        accessibility_benefits: []
      };
    }

    const resolution = await this.calculateResolutionOutcome(collision, resolution_type);
    
    // Create synthesis event
    const synthesisEvent: SynthesisEvent = {
      event_id: `synthesis_${Date.now()}`,
      colliding_archetypes: [collision.primary_archetype, collision.secondary_archetype],
      figures_involved: collision.involved_figures,
      synthesis_type: this.determineSynthesisType(collision),
      collaboration_outcome: resolution.outcome,
      historical_impact: 0.8,
      modern_relevance: 0.9,
      healing_contribution: resolution.healing_impact,
      accessibility_requirements: collision.accessibility_accommodations,
      trauma_safe_experience: collision.trauma_safe_experience
    };

    this.synthesis_events.push(synthesisEvent);
    this.active_collisions.delete(collisionId);

    return resolution;
  }

  public getActiveCollisions(): ArchetypeCollision[] {
    return Array.from(this.active_collisions.values());
  }

  public getCollisionPatterns(): CollisionPattern[] {
    return [...this.pattern_library];
  }

  public getSynthesisEvents(): SynthesisEvent[] {
    return [...this.synthesis_events];
  }

  public calculateArchetypalResonance(
    figure1: string,
    figure2: string
  ): ArchetypeResonance | null {
    const figure1Resonances = this.archetypal_network.get(figure1);
    if (!figure1Resonances) return null;

    return figure1Resonances.find(r => r.target_figure === figure2) || null;
  }

  public getCollisionPotential(
    primary_archetype: number,
    secondary_archetype: number
  ): {
    collision_probability: number;
    typical_outcome: string;
    creative_potential: number;
    healing_benefits: string[];
    accessibility_rating: number;
    trauma_safe_experience: boolean;
  } {
    const pattern = this.pattern_library.find(p => 
      (p.archetype_pair[0] === primary_archetype && p.archetype_pair[1] === secondary_archetype) ||
      (p.archetype_pair[0] === secondary_archetype && p.archetype_pair[1] === primary_archetype)
    );

    if (pattern) {
      return {
        collision_probability: pattern.frequency_of_occurrence,
        typical_outcome: pattern.typical_outcome,
        creative_potential: pattern.creative_potential,
        healing_benefits: pattern.healing_benefits,
        accessibility_rating: pattern.trauma_safe_rating,
        trauma_safe_experience: pattern.trauma_safe_rating > 0.7
      };
    }

    // Default assessment for unknown combinations
    return {
      collision_probability: 0.5,
      typical_outcome: 'Unknown archetypal interaction',
      creative_potential: 0.6,
      healing_benefits: ['Exploration of new archetypal territory'],
      accessibility_rating: 0.6,
      trauma_safe_experience: true
    };
  }

  public async facilitateCollaboration(
    figure1: string,
    figure2: string,
    collaboration_type: 'creative' | 'healing' | 'knowledge' | 'consciousness'
  ): Promise<{
    collaboration_feasible: boolean;
    resonance_strength: number;
    creative_potential: number;
    healing_benefits: string[];
    accessibility_requirements: string[];
    safety_rating: number;
    recommended_approach: string;
  }> {
    const resonance = this.calculateArchetypalResonance(figure1, figure2);
    if (!resonance) {
      return {
        collaboration_feasible: false,
        resonance_strength: 0,
        creative_potential: 0,
        healing_benefits: [],
        accessibility_requirements: [],
        safety_rating: 0,
        recommended_approach: 'No archetypal resonance detected'
      };
    }

    const collaboration_feasible = resonance.archetypal_harmony > 0.5;
    const approach = this.determineCollaborationApproach(collaboration_type, resonance);

    return {
      collaboration_feasible,
      resonance_strength: resonance.archetypal_harmony,
      creative_potential: resonance.creative_collaboration,
      healing_benefits: this.extractHealingBenefits(resonance),
      accessibility_requirements: this.determineAccessibilityRequirements(resonance),
      safety_rating: resonance.healing_influence,
      recommended_approach: approach
    };
  }

  public getArchetypeNetworkStatus(): {
    total_figures: number;
    active_resonances: number;
    average_harmony: number;
    creative_collaboration_potential: number;
    healing_network_strength: number;
    accessibility_rating: number;
  } {
    const figures = Array.from(this.archetypal_network.keys());
    const allResonances = Array.from(this.archetypal_network.values()).flat();

    const averageHarmony = allResonances.reduce((sum, r) => sum + r.archetypal_harmony, 0) / allResonances.length;
    const averageCollaboration = allResonances.reduce((sum, r) => sum + r.creative_collaboration, 0) / allResonances.length;
    const averageHealing = allResonances.reduce((sum, r) => sum + r.healing_influence, 0) / allResonances.length;

    return {
      total_figures: figures.length,
      active_resonances: allResonances.length,
      average_harmony: averageHarmony,
      creative_collaboration_potential: averageCollaboration,
      healing_network_strength: averageHealing,
      accessibility_rating: this.calculateAccessibilityRating(allResonances)
    };
  }

  // Helper Methods
  private async createCollisionFromPattern(
    primary_archetype: number,
    secondary_archetype: number,
    involved_figures: string[]
  ): Promise<ArchetypeCollision> {
    const pattern = this.pattern_library.find(p => 
      (p.archetype_pair[0] === primary_archetype && p.archetype_pair[1] === secondary_archetype) ||
      (p.archetype_pair[0] === secondary_archetype && p.archetype_pair[1] === primary_archetype)
    );

    const collisionType = this.determineCollisionType(pattern, primary_archetype, secondary_archetype);

    return {
      id: this.generateCollisionId(primary_archetype, secondary_archetype),
      primary_archetype,
      secondary_archetype,
      collision_type: collisionType,
      involved_figures,
      collision_description: this.generateCollisionDescription(pattern, collisionType, involved_figures),
      synthesis_outcome: pattern?.typical_outcome || 'Archetypal synthesis',
      healing_potential: pattern?.creative_potential || 0.6,
      trauma_safe_experience: (pattern?.trauma_safe_rating || 0.6) > 0.7,
      accessibility_accommodations: pattern?.accessibility_features || [
        'Gentle progression through archetypal interaction',
        'Clear communication of archetypal roles',
        'Support for different processing styles'
      ],
      creative_output: this.generateCreativeOutput(involved_figures, pattern),
      consciousness_evolution: pattern?.creative_potential || 0.6,
      world_integration_impact: pattern?.creative_potential || 0.6
    };
  }

  private generateCollisionId(primary: number, secondary: number): string {
    return `collision_${primary}_${secondary}_${Date.now()}`;
  }

  private determineCollisionType(
    pattern: CollisionPattern | undefined,
    primary: number,
    secondary: number
  ): ArchetypeCollision['collision_type'] {
    if (!pattern) return 'transformation';

    if (primary === 0 || secondary === 0) return 'synthesis';
    if (primary === 21 || secondary === 21) return 'integration';
    if (Math.abs(primary - secondary) < 3) return 'revelation';
    return 'tension';
  }

  private generateCollisionDescription(
    pattern: CollisionPattern | undefined,
    collisionType: ArchetypeCollision['collision_type'],
    figures: string[]
  ): string {
    const figureNames = figures.join(' and ');
    
    if (pattern) {
      return `The archetypal energies of ${pattern.typical_outcome} manifest through ${figureNames}, creating a ${collisionType} that promotes healing and creative expression.`;
    }
    
    return `The archetypal energies of ${figureNames} engage in ${collisionType}, creating opportunities for growth and synthesis.`;
  }

  private generateCreativeOutput(
    figures: string[],
    pattern: CollisionPattern | undefined
  ): CreativeOutput {
    return {
      artistic_synthesis: `Collaborative artwork blending ${figures.join(' and ')}'s unique perspectives`,
      narrative_development: `A story of archetypal evolution through ${figures.join(' and ')}'s interaction`,
      archetypal_evolution: `The evolution of archetypal understanding through this specific combination`,
      historical_significance: `A significant moment in the evolution of archetypal wisdom`,
      modern_applicability: `Relevant for contemporary understanding of archetypal psychology and healing`,
      healing_techniques: pattern?.healing_benefits || ['Archetypal exploration', 'Collaborative healing'],
      collaboration_methods: ['Dialogue-based exploration', 'Creative expression', 'Shared meditation']
    };
  }

  private async calculateResolutionOutcome(
    collision: ArchetypeCollision,
    resolution_type: 'synthesis' | 'transformation' | 'integration' | 'reconciliation'
  ): Promise<{
    resolved: boolean;
    outcome: string;
    creative_output: CreativeOutput;
    healing_impact: number;
    accessibility_benefits: string[];
  }> {
    const healing_impact = collision.healing_potential * (resolution_type === 'synthesis' ? 1.2 : 1.0);
    
    const accessibility_benefits = [
      'Clear archetypal role definition',
      'Gradual introduction of complex concepts',
      'Multiple access points for different learning styles',
      'Support for processing archetypal imagery',
      'Safe space for archetypal exploration'
    ];

    return {
      resolved: true,
      outcome: `Successful ${resolution_type} of archetypal collision with enhanced healing potential`,
      creative_output: collision.creative_output,
      healing_impact,
      accessibility_benefits
    };
  }

  private determineSynthesisType(collision: ArchetypeCollision): SynthesisEvent['synthesis_type'] {
    if (collision.collision_type === 'synthesis' || collision.collision_type === 'integration') {
      return 'mystical';
    }
    if (collision.primary_archetype === 1 || collision.secondary_archetype === 1) {
      return 'philosophical';
    }
    return 'artistic';
  }

  private determineCollaborationApproach(
    collaboration_type: string,
    resonance: ArchetypeResonance
  ): string {
    if (collaboration_type === 'creative') {
      return `Leverage ${resonance.creative_collaboration * 100}% creative potential through structured creative sessions`;
    }
    if (collaboration_type === 'healing') {
      return `Utilize ${resonance.healing_influence * 100}% healing influence through therapeutic collaboration`;
    }
    return `Build on ${resonance.archetypal_harmony * 100}% archetypal harmony for knowledge sharing`;
  }

  private extractHealingBenefits(resonance: ArchetypeResonance): string[] {
    const benefits = [];
    
    if (resonance.healing_influence > 0.8) {
      benefits.push('High-potential healing collaboration');
    }
    if (resonance.creative_collaboration > 0.8) {
      benefits.push('Creative synthesis and co-creation');
    }
    if (resonance.world_integration_potential > 0.8) {
      benefits.push('Integration into larger healing context');
    }
    
    return benefits.length > 0 ? benefits : ['Moderate healing potential through archetypal resonance'];
  }

  private determineAccessibilityRequirements(resonance: ArchetypeResonance): string[] {
    const requirements = [];
    
    if (resonance.healing_influence < 0.7) {
      requirements.push('Gradual introduction to archetypal concepts');
    }
    if (resonance.creative_collaboration < 0.7) {
      requirements.push('Structured creative activities');
    }
    if (resonance.world_integration_potential < 0.7) {
      requirements.push('Clear connection to practical application');
    }
    
    return requirements.length > 0 ? requirements : ['Standard accessibility support'];
  }

  private calculateAccessibilityRating(resonances: ArchetypeResonance[]): number {
    const safeResonances = resonances.filter(r => r.healing_influence > 0.7).length;
    return safeResonances / resonances.length;
  }
}