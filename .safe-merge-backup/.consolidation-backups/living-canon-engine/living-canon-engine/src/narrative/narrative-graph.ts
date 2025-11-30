/**
 * Narrative Graph - Story Network Management
 * 
 * Manages the complex network of story elements, character interactions,
 * and world events that make up the meta-narrative of Circuitum 99.
 * 
 * @author Rebecca Respawn (Leonora Carrington)
 * @version 1.0.0
 */

import { CanonEntry, StoryNode, NarrativeArc, WorldEvent } from './narrative-types';

export class NarrativeGraph {
  private nodes: Map<string, StoryNode> = new Map();
  private arcs: Map<string, NarrativeArc> = new Map();
  private connections: Map<string, StoryNode[]> = new Map();
  private narrative_momentum: number = 0.5;
  private active_arcs: Set<string> = new Set();
  private historical_timeline: CanonEntry[] = [];

  constructor() {
    this.initializeNarrativeStructures();
  }

  private initializeNarrativeStructures(): void {
    // Initialize core story nodes
    this.createCoreNodes();
    
    // Initialize narrative arcs
    this.initializeArcs();
    
    // Load historical timeline
    this.loadHistoricalTimeline();
  }

  private createCoreNodes(): void {
    const coreNodes = [
      {
        id: 'carrington_dream_awakening',
        name: 'The Dream Awakening',
        type: 'character_arc',
        description: 'Leonora Carrington discovers her visionary abilities',
        characters: ['Leonora Carrington'],
        location: 'asylum_dreamscape',
        impact_level: 0.8,
        narrative_weight: 0.7,
        trauma_safe: true,
        accessibility_notes: 'Soft transition through dream imagery'
      },
      {
        id: 'dee_angelic_computation',
        name: 'The Angelic Computation',
        type: 'knowledge_revelation',
        description: 'John Dee discovers the mathematical language of angels',
        characters: ['John Dee'],
        location: 'mortlake_laboratory',
        impact_level: 0.9,
        narrative_weight: 0.8,
        trauma_safe: true,
        accessibility_notes: 'Mathematical precision with gentle progression'
      },
      {
        id: 'fortune_lunar_initiation',
        name: 'Lunar Consciousness Initiation',
        type: 'mystical_transmission',
        description: 'Dion Fortune receives lunar wisdom through feminine mystery',
        characters: ['Dion Fortune'],
        location: 'inner_light_temple',
        impact_level: 0.75,
        narrative_weight: 0.6,
        trauma_safe: true,
        accessibility_notes: 'Gentle lunar rhythm, accessible mythology'
      },
      {
        id: 'collaboration_convergence',
        name: 'The Great Collaboration',
        type: 'synthesis_event',
        description: 'Multiple creators unite for unprecedented synthesis',
        characters: ['Leonora Carrington', 'John Dee', 'Dion Fortune'],
        location: 'circuitum_nexus',
        impact_level: 1.0,
        narrative_weight: 0.95,
        trauma_safe: true,
        accessibility_notes: 'Harmonious convergence of diverse perspectives'
      }
    ];

    for (const nodeData of coreNodes) {
      const node: StoryNode = {
        id: nodeData.id,
        name: nodeData.name,
        type: nodeData.type,
        description: nodeData.description,
        characters: nodeData.characters,
        location: nodeData.location,
        impact_level: nodeData.impact_level,
        narrative_weight: nodeData.narrative_weight,
        trauma_safe: nodeData.trauma_safe,
        accessibility_notes: nodeData.accessibility_notes,
        incoming_connections: [],
        outgoing_connections: [],
        chronological_position: this.calculateChronologicalPosition(nodeData.type),
        archetypal_resonance: this.calculateArchetypalResonance(nodeData.type),
        world_integration_potential: this.calculateWorldIntegration(nodeData.characters)
      };

      this.nodes.set(node.id, node);
    }
  }

  private initializeArcs(): void {
    const arcs = [
      {
        id: 'genesis_to_integration',
        name: 'From Genesis to Integration',
        description: 'The complete journey from awakening to unified consciousness',
        start_node: 'carrington_dream_awakening',
        end_node: 'collaboration_convergence',
        arc_type: 'hero_journey',
        stages: [
          'awakening',
          'revelation',
          'initiation',
          'collaboration',
          'integration'
        ],
        character_focus: ['Leonora Carrington', 'John Dee', 'Dion Fortune'],
        archetypal_progression: [0, 1, 5, 21], // Fool → Magus → Hierophant → World
        trauma_safe_progression: true,
        accessibility_notes: 'Gentle progression through archetypal levels'
      },
      {
        id: 'knowledge_transmission',
        name: 'The Knowledge Transmission Arc',
        description: 'Wisdom passed from one generation to the next',
        start_node: 'dee_angelic_computation',
        end_node: 'fortune_lunar_initiation',
        arc_type: 'mentor_transfer',
        stages: [
          'revelation',
          'preservation',
          'transmission',
          'reception'
        ],
        character_focus: ['John Dee', 'Dion Fortune'],
        archetypal_progression: [1, 5], // Magus → Hierophant
        trauma_safe_progression: true,
        accessibility_notes: 'Safe transmission of knowledge and wisdom'
      }
    ];

    for (const arcData of arcs) {
      const arc: NarrativeArc = {
        id: arcData.id,
        name: arcData.name,
        description: arcData.description,
        start_node: arcData.start_node,
        end_node: arcData.end_node,
        arc_type: arcData.arc_type,
        stages: arcData.stages,
        character_focus: arcData.character_focus,
        archetypal_progression: arcData.archetypal_progression,
        trauma_safe_progression: arcData.trauma_safe_progression,
        accessibility_notes: arcData.accessibility_notes,
        current_stage: 0,
        completion_level: 0,
        emotional_intensity: 0.5,
        healing_potential: this.calculateHealingPotential(arcData.arc_type)
      };

      this.arcs.set(arc.id, arc);
    }
  }

  private loadHistoricalTimeline(): void {
    // Initialize with foundational canon entries
    const foundationalEntries: CanonEntry[] = [
      {
        timestamp: '1917-05-06T00:00:00Z',
        event_type: 'character_birth',
        title: 'Leonora Carrington Born',
        description: 'The Genesis figure enters the world',
        participants: ['Leonora Carrington'],
        world_region: 'earth_england',
        archetypal_resonance: 0,
        authenticity_score: 1.0,
        healing_potential: 0.7,
        world_integration_effect: 'establishes_fool_archetype'
      },
      {
        timestamp: '1527-01-01T00:00:00Z',
        event_type: 'knowledge_discovery',
        title: 'John Dee\'s Mathematical Awakening',
        description: 'The Magus discovers the angelic language of mathematics',
        participants: ['John Dee'],
        world_region: 'mortlake_england',
        archetypal_resonance: 1,
        authenticity_score: 0.95,
        healing_potential: 0.8,
        world_integration_effect: 'establishes_knowledge_archetype'
      },
      {
        timestamp: '1890-01-01T00:00:00Z',
        event_type: 'mystical_initiation',
        title: 'Dion Fortune\'s Psychic Development',
        description: 'The Hierophant in feminine form begins her journey',
        participants: ['Dion Fortune'],
        world_region: 'england_mystical',
        archetypal_resonance: 5,
        authenticity_score: 0.92,
        healing_potential: 0.9,
        world_integration_effect: 'establishes_feminine_wisdom'
      }
    ];

    for (const entry of foundationalEntries) {
      this.historical_timeline.push(entry);
    }

    // Sort timeline by timestamp
    this.historical_timeline.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }

  // Core Methods
  public async addEntry(entry: CanonEntry): Promise<void> {
    this.historical_timeline.push(entry);
    
    // Sort timeline to maintain chronological order
    this.historical_timeline.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Update narrative momentum based on entry
    this.updateNarrativeMomentum(entry);

    // Trigger any relevant arc progressions
    await this.checkArcProgressions(entry);
  }

  public getNode(nodeId: string): StoryNode | null {
    return this.nodes.get(nodeId) || null;
  }

  public getArc(arcId: string): NarrativeArc | null {
    return this.arcs.get(arcId) || null;
  }

  public getConnectedNodes(nodeId: string): StoryNode[] {
    return this.connections.get(nodeId) || [];
  }

  public getActiveArcs(): NarrativeArc[] {
    return Array.from(this.active_arcs).map(arcId => this.arcs.get(arcId)!).filter(Boolean);
  }

  public getCurrentNarrativeState(): {
    active_nodes: StoryNode[];
    active_arcs: NarrativeArc[];
    narrative_momentum: number;
    chronological_position: number;
    world_stability: number;
  } {
    const activeNodes = Array.from(this.nodes.values()).filter(node => 
      node.impact_level > 0.5
    );

    return {
      active_nodes: activeNodes,
      active_arcs: this.getActiveArcs(),
      narrative_momentum: this.narrative_momentum,
      chronological_position: this.calculateChronologicalPosition(),
      world_stability: this.calculateWorldStability()
    };
  }

  public progressArc(arcId: string): boolean {
    const arc = this.arcs.get(arcId);
    if (!arc) return false;

    if (arc.current_stage < arc.stages.length - 1) {
      arc.current_stage++;
      arc.completion_level = (arc.current_stage + 1) / arc.stages.length;
      arc.emotional_intensity = this.calculateEmotionalIntensity(arc);
      
      this.active_arcs.add(arcId);
      this.updateNarrativeMomentum(null, arcId);
      
      return true;
    }
    return false;
  }

  public getTimelineEntries(startDate?: Date, endDate?: Date): CanonEntry[] {
    let filtered = this.historical_timeline;

    if (startDate) {
      filtered = filtered.filter(entry => new Date(entry.timestamp) >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter(entry => new Date(entry.timestamp) <= endDate);
    }

    return filtered;
  }

  public addStoryNode(node: Omit<StoryNode, 'incoming_connections' | 'outgoing_connections'>): void {
    const fullNode: StoryNode = {
      ...node,
      incoming_connections: [],
      outgoing_connections: []
    };

    this.nodes.set(node.id, fullNode);
  }

  public connectNodes(fromNodeId: string, toNodeId: string, connectionType: string): void {
    const fromNode = this.nodes.get(fromNodeId);
    const toNode = this.nodes.get(toNodeId);
    
    if (fromNode && toNode) {
      fromNode.outgoing_connections.push(toNodeId);
      toNode.incoming_connections.push(fromNodeId);
      
      // Track connections in the connections map
      if (!this.connections.has(fromNodeId)) {
        this.connections.set(fromNodeId, []);
      }
      this.connections.get(fromNodeId)!.push(toNode);
    }
  }

  public calculateNarrativeFlow(fromNodeId: string, toNodeId: string): number {
    const fromNode = this.nodes.get(fromNodeId);
    const toNode = this.nodes.get(toNodeId);
    
    if (!fromNode || !toNode) return 0;

    // Calculate flow based on multiple factors
    const characterOverlap = this.calculateCharacterOverlap(fromNode.characters, toNode.characters);
    const thematicConnection = this.calculateThematicConnection(fromNode.type, toNode.type);
    const impactBalance = Math.min(fromNode.impact_level, toNode.impact_level);
    const traumaSafeScore = (fromNode.trauma_safe && toNode.trauma_safe) ? 1.0 : 0.7;

    return (characterOverlap + thematicConnection + impactBalance) * traumaSafeScore / 3;
  }

  public searchNarrativeElements(query: string): {
    nodes: StoryNode[];
    arcs: NarrativeArc[];
    entries: CanonEntry[];
  } {
    const lowerQuery = query.toLowerCase();
    
    const matchingNodes = Array.from(this.nodes.values()).filter(node =>
      node.name.toLowerCase().includes(lowerQuery) ||
      node.description.toLowerCase().includes(lowerQuery) ||
      node.type.toLowerCase().includes(lowerQuery)
    );

    const matchingArcs = Array.from(this.arcs.values()).filter(arc =>
      arc.name.toLowerCase().includes(lowerQuery) ||
      arc.description.toLowerCase().includes(lowerQuery)
    );

    const matchingEntries = this.historical_timeline.filter(entry =>
      entry.title.toLowerCase().includes(lowerQuery) ||
      entry.description.toLowerCase().includes(lowerQuery) ||
      entry.event_type.toLowerCase().includes(lowerQuery)
    );

    return {
      nodes: matchingNodes,
      arcs: matchingArcs,
      entries: matchingEntries
    };
  }

  public getArchetypalProgression(characterId: string): number[] {
    const characterNodes = Array.from(this.nodes.values()).filter(node =>
      node.characters.includes(characterId)
    );

    return characterNodes
      .map(node => node.archetypal_resonance)
      .sort((a, b) => a - b);
  }

  public getWorldIntegrationStatus(): {
    total_potential: number;
    current_manifestation: number;
    integration_percentage: number;
    active_regions: string[];
  } {
    const allNodes = Array.from(this.nodes.values());
    const totalPotential = allNodes.reduce((sum, node) => sum + node.world_integration_potential, 0);
    const currentManifestation = allNodes.reduce((sum, node) => 
      sum + (node.world_integration_potential * node.impact_level), 0
    );
    
    const integrationPercentage = totalPotential > 0 ? currentManifestation / totalPotential : 0;
    const activeRegions = [...new Set(allNodes.map(node => node.location))];

    return {
      total_potential: totalPotential,
      current_manifestation: currentManifestation,
      integration_percentage: integrationPercentage,
      active_regions: activeRegions
    };
  }

  // Helper Methods
  private updateNarrativeMomentum(entry: CanonEntry | null, arcId?: string): void {
    if (entry) {
      // Base momentum from entry type
      const baseMomentum = this.getEventMomentumBase(entry.event_type);
      this.narrative_momentum = Math.min(1.0, this.narrative_momentum + baseMomentum * 0.1);
    }

    if (arcId) {
      const arc = this.arcs.get(arcId);
      if (arc) {
        this.narrative_momentum = Math.min(1.0, this.narrative_momentum + arc.emotional_intensity * 0.05);
      }
    }
  }

  private getEventMomentumBase(eventType: string): number {
    const momentumMap: { [key: string]: number } = {
      'character_birth': 0.3,
      'knowledge_discovery': 0.7,
      'mystical_initiation': 0.5,
      'collaboration': 0.9,
      'synthesis': 1.0,
      'healing': 0.6,
      'creative_act': 0.4
    };
    return momentumMap[eventType] || 0.2;
  }

  private async checkArcProgressions(entry: CanonEntry): Promise<void> {
    // Check if this entry triggers progression in any arcs
    for (const [arcId, arc] of this.arcs.entries()) {
      const shouldProgress = this.shouldArcProgress(arc, entry);
      if (shouldProgress) {
        this.progressArc(arcId);
      }
    }
  }

  private shouldArcProgress(arc: NarrativeArc, entry: CanonEntry): boolean {
    // Check if entry relates to arc's character focus
    const hasMatchingCharacter = arc.character_focus.some((char: string) =>
      entry.participants.includes(char)
    );
    
    // Check if entry type aligns with arc stages
    const currentStage = arc.stages[arc.current_stage];
    const eventAlignsWithStage = this.eventTypeAlignsWithStage(entry.event_type, currentStage);
    
    return hasMatchingCharacter && eventAlignsWithStage;
  }

  private eventTypeAlignsWithStage(eventType: string, stage: string): boolean {
    const stageAlignment: { [key: string]: string[] } = {
      'awakening': ['character_birth', 'revelation'],
      'revelation': ['knowledge_discovery', 'mystical_initiation'],
      'initiation': ['mystical_initiation', 'creative_act'],
      'collaboration': ['collaboration', 'synthesis'],
      'integration': ['synthesis', 'healing']
    };

    return stageAlignment[stage]?.includes(eventType) || false;
  }

  private calculateChronologicalPosition(nodeType?: string): number {
    if (nodeType === 'character_arc') return 0.3;
    if (nodeType === 'knowledge_revelation') return 0.5;
    if (nodeType === 'mystical_transmission') return 0.7;
    if (nodeType === 'synthesis_event') return 1.0;
    return this.narrative_momentum;
  }

  private calculateArchetypalResonance(nodeType: string): number {
    const resonanceMap: { [key: string]: number } = {
      'character_arc': 0,
      'knowledge_revelation': 1,
      'mystical_transmission': 5,
      'synthesis_event': 21
    };
    return resonanceMap[nodeType] || 0;
  }

  private calculateWorldIntegration(characters: string[]): number {
    return characters.length * 0.2 + 0.3;
  }

  private calculateHealingPotential(arcType: string): number {
    const healingMap: { [key: string]: number } = {
      'hero_journey': 0.8,
      'mentor_transfer': 0.7,
      'synthesis': 0.9,
      'integration': 1.0
    };
    return healingMap[arcType] || 0.5;
  }

  private calculateEmotionalIntensity(arc: NarrativeArc): number {
    return Math.min(1.0, arc.completion_level * 1.2);
  }

  private calculateCharacterOverlap(characters1: string[], characters2: string[]): number {
    const overlap = characters1.filter(char => characters2.includes(char)).length;
    const total = Math.max(characters1.length, characters2.length);
    return total > 0 ? overlap / total : 0;
  }

  private calculateThematicConnection(type1: string, type2: string): number {
    const connections: { [key: string]: string[] } = {
      'character_arc': ['knowledge_revelation', 'mystical_transmission'],
      'knowledge_revelation': ['mystical_transmission', 'synthesis_event'],
      'mystical_transmission': ['synthesis_event'],
      'synthesis_event': ['character_arc', 'knowledge_revelation', 'mystical_transmission']
    };

    return connections[type1]?.includes(type2) ? 0.8 : 0.2;
  }

  private calculateWorldStability(): number {
    const activeNodes = Array.from(this.nodes.values()).filter(node => node.impact_level > 0.5);
    const avgImpact = activeNodes.reduce((sum, node) => sum + node.impact_level, 0) / activeNodes.length;
    return Math.min(1.0, avgImpact * 1.2);
  }
}