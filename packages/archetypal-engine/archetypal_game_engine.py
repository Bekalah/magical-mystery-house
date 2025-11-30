# Cathedral of Circuits - Archetypal Game System
# Complete fusion of book, tool, and game with chaos-order mechanics

import yaml
import json
import random
import numpy as np
from typing import Dict, List, Tuple, Optional, Any
from datetime import datetime
import asyncio
from dataclasses import dataclass, asdict, field
from pathlib import Path

@dataclass
class ChaosEvent:
    name: str
    trigger_level: int
    description: str
    effects: List[str]
    story_branches: List[str]
    art_prompt: str

@dataclass
class SpellResult:
    """Result of casting a spell in the Cathedral"""
    spell_id: str
    spell_name: str
    effect_type: str
    visual_config: Dict[str, Any]
    audio_config: Dict[str, Any]
    oracle_message: str
    oracle_extended: str
    world_changes: Dict[str, Any]
    npc_reactions: List[Dict[str, str]]
    chaos_delta: int = 0
    order_delta: int = 0
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())

@dataclass
class ArchetypeState:
    archetype_id: int
    chaos_factor: float
    order_factor: float
    current_form: str  # base, angel, demon, unified, chaos_max
    active_abilities: List[str]
    story_progress: Dict[str, bool]
    relationship_web: Dict[str, float]
    
class ArchetypalGameEngine:
    """Core engine for the Cathedral of Circuits archetypal system"""
    
    def __init__(self, archetype_data_path: str = "game-data/archetypes/", spell_data_path: str = "game-data/spells/"):
        self.archetype_path = Path(archetype_data_path)
        self.spell_path = Path(spell_data_path)
        self.archetypes = {}
        self.spells = {}
        self.active_characters = {}
        self.global_chaos_field = 0.0
        self.story_branches = {}
        self.pathworking_session = None
        
        # Netflix-style recommendation engine
        self.recommendation_engine = RecommendationEngine()
        
        # Double-helix codex system
        self.liber_arcanae = LiberArcanae()
        self.codex_144 = Codex144()
        
        # Chaos analysis engines
        self.chaos_analyzer = ChaosAnalyzer()
        self.art_generator = ArtGenerationEngine()
        self.music_weaver = MusicWeaverEngine()
        
        self.load_all_archetypes()
        self.load_all_spells()
    
    def load_all_archetypes(self):
        """Load all 22/78 major arcana archetypes"""
        for yaml_file in self.archetype_path.glob("*.yaml"):
            with open(yaml_file, 'r') as f:
                archetype_data = yaml.safe_load(f)
                self.archetypes[archetype_data['id']] = archetype_data
    
    def load_all_spells(self):
        """Load all spells for archetypal magic system"""
        if not self.spell_path.exists():
            self.spell_path.mkdir(parents=True, exist_ok=True)
            
        for yaml_file in self.spell_path.glob("*.yaml"):
            with open(yaml_file, 'r') as f:
                spell_data = yaml.safe_load(f)
                self.spells[spell_data['id']] = spell_data
    
    def activate_archetype(self, archetype_id: int, user_resonance: Dict = None) -> ArchetypeState:
        """Activate an archetype for the current session"""
        if archetype_id not in self.archetypes:
            raise ValueError(f"Archetype {archetype_id} not found")
        
        archetype_data = self.archetypes[archetype_id]
        
        # Calculate initial state based on user resonance
        base_chaos = archetype_data['chaos_factor']
        base_order = archetype_data['order_factor']
        
        if user_resonance:
            base_chaos = self.adjust_for_resonance(base_chaos, user_resonance)
            base_order = 100 - base_chaos
        
        state = ArchetypeState(
            archetype_id=archetype_id,
            chaos_factor=base_chaos,
            order_factor=base_order,
            current_form="base_form",
            active_abilities=[],
            story_progress={},
            relationship_web={}
        )
        
        self.active_characters[archetype_id] = state
        return state
    
    def process_chaos_event(self, archetype_id: int, trigger_value: float) -> ChaosEvent:
        """Process a chaos event and update game state"""
        archetype_data = self.archetypes[archetype_id]
        state = self.active_characters[archetype_id]
        
        # Determine chaos event category
        if trigger_value <= 30:
            events = archetype_data['chaos_events']['low_chaos']
        elif trigger_value <= 70:
            events = archetype_data['chaos_events']['medium_chaos']
        elif trigger_value <= 85:
            events = archetype_data['chaos_events']['high_chaos']
        else:
            events = archetype_data['chaos_events']['max_chaos']
        
        # Select random event from category
        event_description = random.choice(events)
        
        # Update archetypal form based on chaos level
        new_form = self.determine_form_transformation(trigger_value)
        if new_form != state.current_form:
            state.current_form = new_form
            self.trigger_transformation_sequence(archetype_id, new_form)
        
        # Create chaos event
        chaos_event = ChaosEvent(
            name=f"chaos_event_{trigger_value:.0f}",
            trigger_level=int(trigger_value),
            description=event_description,
            effects=self.calculate_event_effects(archetype_id, trigger_value),
            story_branches=self.get_available_story_branches(archetype_id),
            art_prompt=self.generate_art_prompt(archetype_id, new_form),
            music_parameters=self.generate_music_parameters(archetype_id, trigger_value)
        )
        
        # Update global chaos field
        self.global_chaos_field = np.mean([s.chaos_factor for s in self.active_characters.values()])
        
        return chaos_event
    
    def determine_form_transformation(self, chaos_level: float) -> str:
        """Determine which archetypal form to manifest"""
        if chaos_level >= 95:
            return "chaos_max"
        elif chaos_level >= 80:
            return "unified_form"
        elif chaos_level >= 60:
            return random.choice(["angel_aspect", "demon_aspect"])
        else:
            return "base_form"
    
    def trigger_transformation_sequence(self, archetype_id: int, new_form: str):
        """Trigger visual/audio transformation sequence"""
        archetype_data = self.archetypes[archetype_id]
        
        # Get art prompt for new form
        art_prompt = archetype_data['art_prompts'][new_form]
        
        # Generate transformation art
        transformation_art = self.art_generator.generate_transformation_sequence(
            archetype_id, art_prompt
        )
        
        # Generate transformation music
        transformation_music = self.music_weaver.generate_transformation_music(
            archetype_id, new_form
        )
        
        # Trigger Agent of Kaoz for mystical narration
        from agent_integration.agent_service import agent_service
        narration = agent_service.generate_transformation_narration(
            archetype_id, new_form
        )
        
        return {
            'art': transformation_art,
            'music': transformation_music,
            'narration': narration
        }
    
    def generate_art_prompt(self, archetype_id: int, form: str) -> str:
        """Generate art prompt for current archetypal state"""
        archetype_data = self.archetypes[archetype_id]
        base_prompt = archetype_data['art_prompts'][form]
        
        # Add chaos-specific modifications
        chaos_level = self.active_characters[archetype_id].chaos_factor
        
        if chaos_level > 80:
            base_prompt += ", reality distortion effects, impossible geometry"
        elif chaos_level > 60:
            base_prompt += ", dynamic energy patterns, transformation aura"
        elif chaos_level > 40:
            base_prompt += ", subtle magical emanations, mystical symbols"
        
        return base_prompt
    
    def cast_spell(self, spell_id: str, caster_archetype_id: Optional[int] = None, 
                   player_input: Optional[Dict] = None) -> SpellResult:
        """Cast a spell and return comprehensive result for UI rendering"""
        if spell_id not in self.spells:
            raise ValueError(f"Spell {spell_id} not found")
            
        spell_data = self.spells[spell_id]
        
        # Get caster archetype data if provided
        caster_data = None
        if caster_archetype_id is not None and caster_archetype_id in self.archetypes:
            caster_data = self.archetypes[caster_archetype_id]
        
        # Calculate spell effectiveness based on archetypal resonance
        effectiveness = 1.0
        if caster_data:
            # Check if spell resonates with caster's archetype
            if 'rebecca_resonance' in spell_data:
                effectiveness *= spell_data['rebecca_resonance']
            
            # Chaos/order alignment affects spell power
            chaos_alignment = abs(caster_data['chaos_factor'] - spell_data['parameters']['chaos_factor']) / 100
            effectiveness *= (1.0 - chaos_alignment * 0.5)
        
        # Generate NPC reactions
        npc_reactions = []
        if 'npc_reactions' in spell_data:
            for archetype_name, reaction in spell_data['npc_reactions'].items():
                npc_reactions.append({
                    'npc_archetype': archetype_name,
                    'reaction': reaction,
                    'intensity': effectiveness
                })
        
        # Calculate world changes
        world_changes = {
            'terrain_effect': spell_data['function'].get('terrain_effect', 'none'),
            'weather': spell_data['function'].get('modify_world', 'normal'),
            'chaos_field_delta': spell_data['parameters']['chaos_factor'] * effectiveness / 10,
            'spell_active': True,
            'duration': spell_data['parameters'].get('duration', 10)
        }
        
        # Update global chaos field
        chaos_delta = int(spell_data['parameters']['chaos_factor'] * effectiveness / 5)
        self.global_chaos_field = min(100, max(0, self.global_chaos_field + chaos_delta))
        
        # Create comprehensive spell result
        result = SpellResult(
            spell_id=spell_id,
            spell_name=spell_data['name'],
            effect_type=spell_data['element'],
            visual_config=spell_data.get('visual_config', {}),
            audio_config=spell_data.get('synth_parameters', {}),
            oracle_message=spell_data['oracle_sentence'],
            oracle_extended=spell_data.get('oracle_extended', ''),
            world_changes=world_changes,
            npc_reactions=npc_reactions,
            chaos_delta=chaos_delta,
            order_delta=-chaos_delta // 2,
            timestamp=datetime.now().isoformat()
        )
        
        return result
    
    def get_available_spells(self, archetype_id: Optional[int] = None) -> List[Dict]:
        """Get spells available to cast, optionally filtered by archetype"""
        available = []
        
        for spell_id, spell_data in self.spells.items():
            spell_info = {
                'id': spell_id,
                'name': spell_data['name'],
                'element': spell_data['element'],
                'archetype': spell_data['archetype'],
                'chaos_factor': spell_data['parameters']['chaos_factor'],
                'description': spell_data['oracle_sentence']
            }
            
            # Add resonance info if archetype provided
            if archetype_id is not None and archetype_id in self.archetypes:
                archetype_data = self.archetypes[archetype_id]
                if 'rebecca_resonance' in spell_data:
                    spell_info['resonance'] = spell_data['rebecca_resonance']
                    spell_info['recommended'] = spell_data['rebecca_resonance'] > 0.7
            
            available.append(spell_info)
        
        return available
    
    def start_pathworking_session(self, archetype_id: int, intention: str = None):
        """Start auto-pathworking session with Netflix-style experience"""
        archetype_data = self.archetypes[archetype_id]
        
        self.pathworking_session = {
            'archetype_id': archetype_id,
            'start_time': datetime.now(),
            'intention': intention,
            'current_path': archetype_data['codex_144_link'],
            'mirror_path': archetype_data['liber_arcanae_link'],
            'branch_points': [],
            'user_choices': [],
            'emergent_story': []
        }
        
        return self.pathworking_session
    
    def get_netflix_recommendations(self, user_id: str = None) -> List[Dict]:
        """Generate Netflix-style recommendations for next pathworking"""
        recommendations = []
        
        if not self.active_characters:
            # First time user - recommend Rebecca Respawn (The Fool)
            recommendations.append({
                'archetype_id': 0,
                'title': "Begin Your Journey - The Fool's Path",
                'description': "Start your transformation with Rebecca Respawn, the Alpha & Omega Architect-Scribe",
                'match_percentage': 95,
                'reason': "Perfect starting point for new initiates"
            })
        else:
            # Analyze current character resonances
            for archetype_id, state in self.active_characters.items():
                related_archetypes = self.find_resonant_archetypes(archetype_id, state)
                for related_id in related_archetypes:
                    recommendations.append({
                        'archetype_id': related_id,
                        'title': self.archetypes[related_id]['title'],
                        'description': self.archetypes[related_id]['description'],
                        'match_percentage': self.calculate_match_percentage(state, related_id),
                        'reason': f"Resonates with your {self.archetypes[archetype_id]['title']} energy"
                    })
        
        return sorted(recommendations, key=lambda x: x['match_percentage'], reverse=True)[:5]

class ChaosAnalyzer:
    """Analyzes chaos patterns for art and music generation"""
    
    def __init__(self):
        self.chaos_patterns = {
            'spiral': self.analyze_spiral_chaos,
            'lightning': self.analyze_lightning_chaos,
            'dragon': self.analyze_dragon_chaos,
            'circuit': self.analyze_circuit_chaos
        }
    
    def analyze_chaos_signature(self, chaos_data: np.ndarray) -> Dict[str, float]:
        """Analyze chaos patterns in input data"""
        results = {}
        for pattern_name, analyzer in self.chaos_patterns.items():
            results[pattern_name] = analyzer(chaos_data)
        return results
    
    def analyze_spiral_chaos(self, data: np.ndarray) -> float:
        """Detect spiral patterns in chaos data"""
        # Implement spiral pattern detection using FFT and polar coordinates
        return random.uniform(0.0, 1.0)  # Placeholder
    
    def analyze_lightning_chaos(self, data: np.ndarray) -> float:
        """Detect lightning/fractal patterns"""
        # Implement fractal dimension calculation
        return random.uniform(0.0, 1.0)  # Placeholder
    
    def analyze_dragon_chaos(self, data: np.ndarray) -> float:
        """Detect dragon/transformation patterns"""
        # Implement strange attractor analysis
        return random.uniform(0.0, 1.0)  # Placeholder
    
    def analyze_circuit_chaos(self, data: np.ndarray) -> float:
        """Detect digital/binary patterns"""
        # Implement information entropy analysis
        return random.uniform(0.0, 1.0)  # Placeholder

class ArtGenerationEngine:
    """Generates art based on archetypal states and chaos analysis"""
    
    def __init__(self):
        self.style_templates = self.load_style_templates()
    
    def load_style_templates(self) -> Dict:
        """Load art style templates for different archetypes"""
        return {
            'divine_infernal_harmony': {
                'style': 'Renaissance with surreal elements',
                'lighting': 'Dramatic chiaroscuro with golden accents',
                'composition': 'Balanced duality with central focal point',
                'texture': 'Oil painting with digital glitch effects'
            }
        }
    
    def generate_transformation_sequence(self, archetype_id: int, prompt: str) -> List[str]:
        """Generate sequence of art prompts for transformation"""
        base_prompt = prompt
        
        # Create transformation sequence
        sequence = [
            f"{base_prompt}, beginning transformation, subtle energy gathering",
            f"{base_prompt}, mid-transformation, energy intensifying, form shifting",
            f"{base_prompt}, transformation peak, reality bending, maximum power",
            f"{base_prompt}, transformation complete, new form stabilized, harmonious"
        ]
        
        return sequence

class MusicWeaverEngine:
    """Generates music parameters for archetypal states"""
    
    def __init__(self):
        self.harmonic_ratios = self.calculate_harmonic_ratios()
    
    def calculate_harmonic_ratios(self) -> Dict:
        """Calculate sacred harmonic ratios for archetypal music"""
        return {
            'golden_ratio': 1.618033988749,
            'silver_ratio': 2.414213562373,
            'phi_squared': 2.618033988749,
            'sqrt_2': 1.414213562373,
            'sqrt_3': 1.732050807569
        }
    
    def generate_transformation_music(self, archetype_id: int, form: str) -> Dict:
        """Generate music parameters for transformation"""
        base_freq = 440.0  # A4
        
        # Use chaos analysis to determine musical parameters
        chaos_signature = np.random.random(100)  # Placeholder for real chaos data
        
        return {
            'base_frequency': base_freq,
            'harmonic_series': self.generate_harmonic_series(base_freq),
            'rhythm_pattern': self.generate_rhythm_pattern(form),
            'texture_layers': self.generate_texture_layers(archetype_id),
            'transformation_curve': self.generate_transformation_curve()
        }
    
    def generate_harmonic_series(self, base_freq: float) -> List[float]:
        """Generate harmonic series based on sacred ratios"""
        harmonics = [base_freq]
        for ratio in self.harmonic_ratios.values():
            harmonics.append(base_freq * ratio)
        return harmonics
    
    def generate_rhythm_pattern(self, form: str) -> List[float]:
        """Generate rhythm pattern for archetypal form"""
        patterns = {
            'base_form': [1.0, 0.5, 0.75, 0.25],
            'angel_aspect': [1.0, 0.33, 0.67, 0.5],
            'demon_aspect': [1.0, 0.75, 0.25, 0.5],
            'unified_form': [1.0, 0.618, 0.382, 0.5],
            'chaos_max': [1.0, 0.8, 0.3, 0.7, 0.2, 0.9]
        }
        return patterns.get(form, patterns['base_form'])
    
    def generate_texture_layers(self, archetype_id: int) -> List[Dict]:
        """Generate layered musical texture"""
        return [
            {'instrument': 'synthesizer', 'role': 'harmony', 'chaos_factor': 0.3},
            {'instrument': 'digital_effects', 'role': 'texture', 'chaos_factor': 0.7},
            {'instrument': 'organic_elements', 'role': 'grounding', 'chaos_factor': 0.1}
        ]
    
    def generate_transformation_curve(self) -> List[float]:
        """Generate musical transformation curve"""
        # Use golden spiral for transformation timing
        phi = self.harmonic_ratios['golden_ratio']
        curve = []
        for i in range(100):
            t = i / 100.0
            value = np.sin(phi * t * 2 * np.pi) * np.exp(-t * 0.5)
            curve.append(value)
        return curve

class LiberArcanae:
    """The living book system - first half of double-helix codex"""
    
    def __init__(self):
        self.chapters = {}
        self.active_chapter = None
        self.reading_state = {}
    
    def activate_chapter(self, path: str) -> Dict:
        """Activate a chapter for pathworking"""
        # Implementation for living book system
        return {'chapter': path, 'state': 'active'}

class Codex144:
    """The second half of double-helix codex system"""
    
    def __init__(self):
        self.paths = {}
        self.mirror_links = {}
    
    def navigate_path(self, path: str) -> Dict:
        """Navigate through Codex 144 paths"""
        # Implementation for path navigation
        return {'path': path, 'mirrors': []}

class RecommendationEngine:
    """Netflix-style recommendation system for pathworking"""
    
    def __init__(self):
        self.user_profiles = {}
        self.interaction_history = {}
    
    def generate_recommendations(self, user_id: str) -> List[Dict]:
        """Generate personalized recommendations"""
        # Implementation for recommendation algorithm
        return []

# Example usage and testing
if __name__ == "__main__":
    # Initialize the game engine
    engine = ArchetypalGameEngine()
    
    # Activate Rebecca Respawn (The Fool)
    rebecca_state = engine.activate_archetype(0)
    print(f"Activated: {engine.archetypes[0]['title']}")
    print(f"Chaos Factor: {rebecca_state.chaos_factor}")
    
    # Trigger a chaos event
    chaos_event = engine.process_chaos_event(0, 75.0)
    print(f"Chaos Event: {chaos_event.description}")
    print(f"New Form: {rebecca_state.current_form}")
    
    # Start pathworking session
    session = engine.start_pathworking_session(0, "Transform trauma into creative power")
    print(f"Pathworking started: {session['current_path']}")
    
    # Get recommendations
    recommendations = engine.get_netflix_recommendations()
    print("Recommendations:")
    for rec in recommendations:
        print(f"- {rec['title']} ({rec['match_percentage']}% match)")