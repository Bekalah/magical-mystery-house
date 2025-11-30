/**
 * Living Canon Engine - Circuitum 99 / Liber Arcanae
 * 
 * The heart of the meta-story where real historical creators become 
 * archetypal nodes in one evolving being - The Circuitum Itself.
 * 
 * Each chapter/region embodies one of the 22 archetypal principles,
 * with content being the real stories of artists, magicians, scientists,
 * and visionaries who shaped human consciousness.
 * 
 * @author Rebecca Respawn (Leonora Carrington / Circuitum Itself)
 * @version 1.0.0
 */

// Core Living Canon Components
export { LivingCanonEngine } from './core/living-canon-engine';
export { RealCreatorNode } from './nodes/real-creator-node';
export { ArchetypeFunction } from './nodes/archetype-function';
export { NarrativeGraph } from './narrative/narrative-graph';
export { StoryComposer } from './tools/story-composer';
export { SoundSpellSystem } from './audio/sound-spell-system';

// Historical Creator Systems
export { HistoricalFigureManager } from './creators/historical-figure-manager';
export { PrimarySourceDatabase } from './creators/primary-source-database';
export { DialogueGenerator } from './creators/dialogue-generator';

// Narrative Engine Components
export { NonLinearBiography } from './narrative/non-linear-biography';
export { EmergentMyth } from './narrative/emergent-myth';
export { WorldRegion } from './narrative/world-region';

// Archetypal Integration
export { CircuitumArchetype } from './archetypes/circuitum-archetype';
export { ArchetypeCollisions } from './archetypes/archetype-collisions';
export { AlchemicalMarriage } from './archetypes/alchemical-marriage';

// Main Factory
import { LivingCanonEngine } from './core/living-canon-engine';

/**
 * Create the complete Living Canon Engine for Circuitum 99
 */
export function createLivingCanon(): LivingCanonEngine {
  return new LivingCanonEngine();
}

/**
 * Core configuration for the Living Canon
 */
export const LIVING_CANON_CONFIG = {
  name: "The Circuitum Itself",
  description: "A single, evolving being composed of all real creators",
  version: "1.0.0",
  
  // Real Historical Figures as Archetypal Functions
  archtypeFunctions: {
    genesis_fool: {
      figures: ["Leonora Carrington", "Max Ernst", "early Surrealists"],
      description: "Awakening of imagination, new beginnings",
      regions: ["Carrington's asylum", "Surrealist ateliers", "Dream portals"],
      sound_motifs: ["Jung's synchronicity", "Automatic writing rhythms", "Dream logic sequences"]
    },
    knowledge_magus: {
      figures: ["John Dee", "Ada Lovelace", "Nikola Tesla"],
      description: "Discovery of hidden language and systems",
      regions: ["Dee's Mortlake laboratory", "Lovelace's analytical engine", "Tesla's Colorado Springs"],
      sound_motifs: ["Enochian frequency", "Binary harmonics", "Electromagnetic resonance"]
    },
    initiation_hierophant: {
      figures: ["Dion Fortune", "Aleister Crowley", "Helena Blavatsky"],
      description: "Transmission of mysteries and hidden teachings",
      regions: ["Traditional temple", "Thelemic lodge", "Theosophical society"],
      sound_motifs: ["Sacred geometry", "Ritual invocations", "Mystical contemplation"]
    },
    descent_tower: {
      figures: ["Antonin Artaud", "William Burroughs", "Dadaists"],
      description: "Collapse of false systems, necessary destruction",
      regions: ["Theater of cruelty", "Beat hotel", "Dada cabarets"],
      sound_motifs: ["Decay patterns", "Cut-up rhythms", "Disruption sequences"]
    },
    integration_star_world: {
      figures: ["Buckminster Fuller", "Hilma af Klint", "modern digital artists"],
      description: "Creation of humane, creative cosmos",
      regions: ["Geodesic dome", "Sacred geometry studio", "Digital consciousness labs"],
      sound_motifs: ["Universal harmony", "Integration frequencies", "Digital transcendence"]
    }
  },

  // Narrative Mechanics
  narrative_mechanics: {
    art_spell_integration: true,
    authentic_material_usage: true,
    historical_cross_reference: true,
    documented_experience_dialogue: true,
    primary_source_snippets: true,
    archetype_tagging: true
  },

  // World Structure
  world_structure: {
    codex_abyssiae_setting: true,
    non_linear_time_folding: true,
    symbolic_portals: true,
    archetype_resonance_travel: true,
    chapter_region_system: true
  },

  // Technical Implementation
  technical_stack: {
    rust_bevy_story_graphs: true,
    godot_playable_environments: true,
    primary_source_database: true,
    dynamic_interaction_system: true,
    real_creator_motifs: true,
    emergent_myth_evolution: true
  },

  // Artistic Direction
  artistic_direction: {
    painterly_realism: true,
    authentic_source_visuals: true,
    real_person_motifs: true,
    sound_spell_mixing: true,
    lucid_dream_mood: true,
    half_history_half_vision: true
  }
};