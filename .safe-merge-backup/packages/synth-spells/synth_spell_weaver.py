#!/usr/bin/env python3
"""
Synth Spell Integration System
Connects Agent of Kaoz spells with synth lab emulation for mystical sound generation
Each spell triggers unique synth patches and audio experiences
"""

import json
import asyncio
import aiohttp
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

@dataclass
class SpellSynthMapping:
    """Maps spells to synth parameters"""
    spell_name: str
    synth_type: str  # 'yamaha_cs80', 'moog_modular', 'aphex_twin'
    patch_name: str
    parameters: Dict[str, float]
    midi_notes: List[int]
    duration: float
    description: str

class SynthSpellWeaver:
    """Weaves spells with synth magic for immersive cathedral exploration"""
    
    def __init__(self, agent_url: str = "http://localhost:8000"):
        self.agent_url = agent_url
        
        # Define spell-synth mappings
        self.spell_mappings = {
            "lightning_clarity": SpellSynthMapping(
                spell_name="lightning_clarity",
                synth_type="yamaha_cs80",
                patch_name="Lightning Strike",
                parameters={
                    "cutoff": 0.9,
                    "resonance": 0.7,
                    "attack": 0.0,
                    "decay": 0.3,
                    "sustain": 0.6,
                    "release": 0.8,
                    "filter_env": 0.8,
                    "chorus": 0.6,
                    "reverb": 0.9
                },
                midi_notes=[60, 67, 72, 79],  # C, G, C, G (octaves)
                duration=3.0,
                description="Yamaha CS-80 bright lead with lightning-fast attack and cosmic reverb"
            ),
            
            "dragon_transformation": SpellSynthMapping(
                spell_name="dragon_transformation",
                synth_type="moog_modular",
                patch_name="Dragon Breath",
                parameters={
                    "vcf_cutoff": 0.4,
                    "vcf_resonance": 0.8,
                    "vca_attack": 0.1,
                    "vca_decay": 1.5,
                    "vca_sustain": 0.7,
                    "vca_release": 2.0,
                    "lfo_rate": 0.3,
                    "lfo_depth": 0.6,
                    "noise_level": 0.2
                },
                midi_notes=[36, 43, 48, 55],  # Low C, G, C, G (dragon growl)
                duration=5.0,
                description="Moog Modular deep bass with slow filter sweep and growling resonance"
            ),
            
            "spiral_meditation": SpellSynthMapping(
                spell_name="spiral_meditation",
                synth_type="aphex_twin",
                patch_name="Spiral Dreams",
                parameters={
                    "grain_size": 0.1,
                    "grain_density": 0.7,
                    "time_stretch": 0.5,
                    "pitch_shift": 0.2,
                    "filter_freq": 0.6,
                    "delay_time": 0.375,  # Eighth note triplets
                    "delay_feedback": 0.7,
                    "reverb_size": 0.9,
                    "chorus_rate": 0.2
                },
                midi_notes=[64, 67, 71, 74, 78],  # E, G, B, D, F# (spiral harmony)
                duration=8.0,
                description="Aphex Twin-style granular synthesis with time-stretched harmonics and ambient textures"
            ),
            
            "surreal_transformation": SpellSynthMapping(
                spell_name="surreal_transformation",
                synth_type="yamaha_cs80",
                patch_name="Leonora's Trumpet",
                parameters={
                    "cutoff": 0.7,
                    "resonance": 0.5,
                    "attack": 0.2,
                    "decay": 0.8,
                    "sustain": 0.8,
                    "release": 1.5,
                    "filter_env": 0.6,
                    "chorus": 0.8,
                    "reverb": 0.7,
                    "portamento": 0.4
                },
                midi_notes=[57, 60, 64, 67, 72],  # A, C, E, G, C (trumpet call)
                duration=6.0,
                description="CS-80 brass lead with portamento slides and surrealist modulation"
            ),
            
            "trauma_healing": SpellSynthMapping(
                spell_name="trauma_healing",
                synth_type="moog_modular",
                patch_name="Healing Waters",
                parameters={
                    "vcf_cutoff": 0.8,
                    "vcf_resonance": 0.3,
                    "vca_attack": 0.8,
                    "vca_decay": 1.0,
                    "vca_sustain": 0.9,
                    "vca_release": 3.0,
                    "lfo_rate": 0.1,
                    "lfo_depth": 0.3,
                    "noise_level": 0.05
                },
                midi_notes=[48, 52, 55, 60, 64],  # C, E, G, C, E (healing progression)
                duration=10.0,
                description="Moog warm pads with gentle LFO modulation and extended release for emotional healing"
            ),
            
            "wild_wisdom": SpellSynthMapping(
                spell_name="wild_wisdom",
                synth_type="aphex_twin",
                patch_name="Wolf Song",
                parameters={
                    "grain_size": 0.05,
                    "grain_density": 0.9,
                    "time_stretch": 0.8,
                    "pitch_shift": -0.3,
                    "filter_freq": 0.4,
                    "delay_time": 0.25,
                    "delay_feedback": 0.6,
                    "reverb_size": 0.8,
                    "formant_shift": 0.7
                },
                midi_notes=[50, 54, 57, 62, 66],  # D, F#, A, D, F# (wild howling)
                duration=7.0,
                description="Granular vocal synthesis with formant shifting and wild, untamed textures"
            ),
            
            "arcane_knowledge": SpellSynthMapping(
                spell_name="arcane_knowledge",
                synth_type="yamaha_cs80",
                patch_name="Mystic Bells",
                parameters={
                    "cutoff": 1.0,
                    "resonance": 0.2,
                    "attack": 0.0,
                    "decay": 2.0,
                    "sustain": 0.4,
                    "release": 4.0,
                    "filter_env": 0.3,
                    "chorus": 0.9,
                    "reverb": 1.0,
                    "ring_mod": 0.3
                },
                midi_notes=[72, 76, 79, 84, 88],  # C, E, G, C, E (high bells)
                duration=12.0,
                description="CS-80 bell tones with ring modulation and infinite reverb for ancient wisdom"
            )
        }
    
    async def cast_spell_with_synth(self, spell_name: str, context: str = "") -> Dict[str, Any]:
        """Cast a spell and generate corresponding synth audio"""
        
        # Get spell mapping
        mapping = self.spell_mappings.get(spell_name)
        if not mapping:
            return {"error": f"Unknown spell: {spell_name}"}
        
        # Request spell creation from Agent of Kaoz
        spell_request = {
            "query": f"Cast the {spell_name} spell in the cathedral",
            "action_type": "spell_creation",
            "context": {"spell": spell_name, "additional_context": context}
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(f"{self.agent_url}/invoke", json=spell_request) as response:
                    if response.status == 200:
                        spell_data = await response.json()
                        
                        # Generate synth patch
                        synth_patch = self.generate_synth_patch(mapping)
                        
                        # Create combined response
                        return {
                            "spell_response": spell_data["response"],
                            "art_prompt": spell_data.get("art_prompt"),
                            "synth_patch": synth_patch,
                            "audio_instructions": self.create_audio_instructions(mapping),
                            "success": True
                        }
                    else:
                        return {"error": f"Agent of Kaoz error: {response.status}"}
                        
        except Exception as e:
            return {"error": f"Connection error: {str(e)}"}
    
    def generate_synth_patch(self, mapping: SpellSynthMapping) -> Dict[str, Any]:
        """Generate synth patch configuration"""
        
        base_patch = {
            "spell_name": mapping.spell_name,
            "synth_type": mapping.synth_type,
            "patch_name": mapping.patch_name,
            "parameters": mapping.parameters,
            "description": mapping.description,
            "duration": mapping.duration
        }
        
        # Add synth-specific configurations
        if mapping.synth_type == "yamaha_cs80":
            base_patch.update({
                "oscillator_1": {"waveform": "sawtooth", "octave": 0, "fine_tune": 0},
                "oscillator_2": {"waveform": "square", "octave": -1, "fine_tune": 5},
                "filter": {"type": "lowpass", "poles": 4},
                "effects": ["chorus", "reverb"],
                "touch_sensitivity": True
            })
            
        elif mapping.synth_type == "moog_modular":
            base_patch.update({
                "oscillator_bank": ["vco_1", "vco_2", "vco_3"],
                "filter": {"type": "moog_ladder", "poles": 4},
                "modulation": {
                    "lfo_1": {"target": "vcf_cutoff", "amount": mapping.parameters.get("lfo_depth", 0.5)},
                    "env_1": {"target": "vcf_cutoff", "amount": 0.8}
                },
                "noise_generator": {"color": "white", "level": mapping.parameters.get("noise_level", 0.1)}
            })
            
        elif mapping.synth_type == "aphex_twin":
            base_patch.update({
                "granular_engine": {
                    "grain_size": mapping.parameters.get("grain_size", 0.1),
                    "overlap": 0.7,
                    "randomization": 0.3
                },
                "time_fx": {
                    "stretch_ratio": mapping.parameters.get("time_stretch", 1.0),
                    "pitch_shift": mapping.parameters.get("pitch_shift", 0.0)
                },
                "processing_chain": ["granular", "filter", "delay", "reverb"]
            })
        
        return base_patch
    
    def create_audio_instructions(self, mapping: SpellSynthMapping) -> Dict[str, Any]:
        """Create instructions for audio playback in the browser"""
        
        # Convert MIDI notes to frequencies
        frequencies = [self.midi_to_frequency(note) for note in mapping.midi_notes]
        
        # Create Web Audio API instructions
        audio_instructions = {
            "type": "spell_audio",
            "spell_name": mapping.spell_name,
            "synth_type": mapping.synth_type,
            "duration": mapping.duration,
            "frequencies": frequencies,
            "parameters": mapping.parameters,
            "sequence": self.create_note_sequence(mapping),
            "web_audio_config": self.create_web_audio_config(mapping)
        }
        
        return audio_instructions
    
    def midi_to_frequency(self, midi_note: int) -> float:
        """Convert MIDI note to frequency"""
        return 440.0 * (2.0 ** ((midi_note - 69) / 12.0))
    
    def create_note_sequence(self, mapping: SpellSynthMapping) -> List[Dict[str, Any]]:
        """Create a timed sequence of notes for the spell"""
        
        sequence = []
        duration_per_note = mapping.duration / len(mapping.midi_notes)
        
        for i, note in enumerate(mapping.midi_notes):
            sequence.append({
                "time": i * duration_per_note * 0.8,  # Slight overlap
                "frequency": self.midi_to_frequency(note),
                "duration": duration_per_note * 1.2,
                "velocity": 0.7 + (i * 0.1),  # Slight crescendo
                "pan": (i - len(mapping.midi_notes) / 2) * 0.2  # Stereo spread
            })
        
        return sequence
    
    def create_web_audio_config(self, mapping: SpellSynthMapping) -> Dict[str, Any]:
        """Create Web Audio API configuration for browser synthesis"""
        
        if mapping.synth_type == "yamaha_cs80":
            return {
                "oscillator_type": "sawtooth",
                "filter": {
                    "type": "lowpass",
                    "frequency": mapping.parameters.get("cutoff", 0.5) * 2000 + 200,
                    "Q": mapping.parameters.get("resonance", 0.5) * 20 + 1
                },
                "envelope": {
                    "attack": mapping.parameters.get("attack", 0.1),
                    "decay": mapping.parameters.get("decay", 0.3),
                    "sustain": mapping.parameters.get("sustain", 0.7),
                    "release": mapping.parameters.get("release", 0.5)
                },
                "effects": {
                    "chorus": {"rate": 0.5, "depth": mapping.parameters.get("chorus", 0.3)},
                    "reverb": {"roomSize": mapping.parameters.get("reverb", 0.5), "decay": 3.0}
                }
            }
            
        elif mapping.synth_type == "moog_modular":
            return {
                "oscillator_type": "square",
                "filter": {
                    "type": "lowpass",
                    "frequency": mapping.parameters.get("vcf_cutoff", 0.5) * 1500 + 100,
                    "Q": mapping.parameters.get("vcf_resonance", 0.5) * 25 + 1
                },
                "envelope": {
                    "attack": mapping.parameters.get("vca_attack", 0.1),
                    "decay": mapping.parameters.get("vca_decay", 0.5),
                    "sustain": mapping.parameters.get("vca_sustain", 0.7),
                    "release": mapping.parameters.get("vca_release", 1.0)
                },
                "lfo": {
                    "rate": mapping.parameters.get("lfo_rate", 0.2),
                    "depth": mapping.parameters.get("lfo_depth", 0.3),
                    "target": "filter"
                }
            }
            
        elif mapping.synth_type == "aphex_twin":
            return {
                "type": "granular",
                "grain_size": mapping.parameters.get("grain_size", 0.1),
                "grain_density": mapping.parameters.get("grain_density", 0.7),
                "filter": {
                    "type": "bandpass",
                    "frequency": mapping.parameters.get("filter_freq", 0.5) * 3000 + 200,
                    "Q": 5
                },
                "delay": {
                    "time": mapping.parameters.get("delay_time", 0.3),
                    "feedback": mapping.parameters.get("delay_feedback", 0.4)
                },
                "modulation": {
                    "rate": 0.1,
                    "depth": 0.2,
                    "targets": ["pitch", "filter", "grain_size"]
                }
            }
        
        return {}
    
    def get_available_spells(self) -> List[str]:
        """Get list of available spells"""
        return list(self.spell_mappings.keys())
    
    def get_spell_info(self, spell_name: str) -> Optional[Dict[str, Any]]:
        """Get information about a specific spell"""
        mapping = self.spell_mappings.get(spell_name)
        if not mapping:
            return None
            
        return {
            "name": mapping.spell_name,
            "synth_type": mapping.synth_type,
            "patch_name": mapping.patch_name,
            "description": mapping.description,
            "duration": mapping.duration,
            "note_count": len(mapping.midi_notes),
            "frequency_range": [
                self.midi_to_frequency(min(mapping.midi_notes)),
                self.midi_to_frequency(max(mapping.midi_notes))
            ]
        }

# Test the synth spell system
async def test_synth_spells():
    """Test the synth spell integration"""
    weaver = SynthSpellWeaver()
    
    print("🌟 Testing Synth Spell Integration...")
    
    # Test available spells
    spells = weaver.get_available_spells()
    print(f"📜 Available Spells: {', '.join(spells)}")
    
    # Test a specific spell
    spell_name = "lightning_clarity"
    print(f"\n⚡ Testing {spell_name}...")
    
    result = await weaver.cast_spell_with_synth(spell_name, "Testing in Rosslyn Chapel")
    
    if result.get("success"):
        print("✅ Spell cast successfully!")
        print(f"🔮 Spell Response: {result['spell_response'][:200]}...")
        print(f"🎵 Synth Patch: {result['synth_patch']['patch_name']}")
        print(f"🎹 Audio Config: {result['audio_instructions']['web_audio_config']['oscillator_type']}")
    else:
        print(f"❌ Spell failed: {result.get('error')}")

if __name__ == "__main__":
    asyncio.run(test_synth_spells())