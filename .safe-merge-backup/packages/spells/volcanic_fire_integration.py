# Volcanic Fire Spell Integration with Library of Alexandria
# Connecting archetypal engine with the restored Library

import yaml
import json
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, field
from pathlib import Path

# Import from existing packages
import sys
sys.path.append("packages/archetypal-engine")
sys.path.append("packages/alexandria-library")
sys.path.append("packages/museum-sources")
sys.path.append("packages/cathedral-style")

try:
    from archetypal_game_engine import ArchetypalGameEngine, SpellResult
except ImportError:
    print("⚠️ Archetypal engine not found - creating basic interface")
    
    @dataclass
    class SpellResult:
        spell_name: str
        archetype: str
        intention: str
        chaos_delta: int
        npc_reactions: List[str]
        oracle_message: str
        visual_description: str
        museum_sources: List[str] = field(default_factory=list)
        style_tier: str = "elevated"

try:
    from alexandria_architecture import AlexandriaArchitecture, LibraryWing
    from hall_of_gnosis import HallOfGnosis
    from hall_of_shadows import HallOfShadows, ShadowType
except ImportError:
    print("⚠️ Alexandria library components not found")

try:
    from museum_sources_engine import MuseumSourcesEngine
    from cathedral_style_engine import CathedralStyleEngine, StyleTier
except ImportError:
    print("⚠️ Museum and style engines not found")

@dataclass
class VolcanicFireVisualization:
    """Three.js visualization parameters for Volcanic Fire spell"""
    particle_count: int = 5000
    color_palette: List[str] = field(default_factory=lambda: ["#ff4500", "#ffd700", "#ac2b00", "#ff6b35"])
    intensity: float = 0.8
    eruption_height: float = 20.0
    lava_flow_speed: float = 0.3
    smoke_density: float = 0.6
    geological_transformations: List[str] = field(default_factory=lambda: [
        "terrain_cracking", "new_mountain_formation", "lava_rivers", "volcanic_glass_creation"
    ])
    weather_effects: List[str] = field(default_factory=lambda: [
        "storm_clouds", "lightning", "ash_rain", "thermal_updrafts"
    ])

@dataclass
class NPCReaction:
    """NPC reaction to Volcanic Fire spell"""
    npc_id: str
    name: str
    archetype: str
    emotional_state: str
    dialogue: str
    action_taken: str
    inspiration_level: float

class VolcanicFireEngine:
    """Enhanced engine for Volcanic Fire spell with Library integration"""
    
    def __init__(self):
        # Initialize core components
        self.spell_config = self.load_volcanic_fire_config()
        self.visualization_params = VolcanicFireVisualization()
        
        # Try to initialize Library components
        try:
            self.library = AlexandriaArchitecture()
            self.hall_of_gnosis = HallOfGnosis()
            self.hall_of_shadows = HallOfShadows()
            self.library_enabled = True
        except:
            self.library_enabled = False
        
        # Try to initialize museum and style engines
        try:
            self.museum_engine = MuseumSourcesEngine()
            self.style_engine = CathedralStyleEngine()
            self.enhancement_enabled = True
        except:
            self.enhancement_enabled = False
        
        # Initialize NPCs
        self.npcs = self.initialize_npcs()
    
    def load_volcanic_fire_config(self) -> Dict[str, Any]:
        """Load the Volcanic Fire spell configuration"""
        return {
            "id": "volcanic_fire",
            "name": "Volcanic Fire",
            "element": "fire",
            "archetype": "Tower / Crowley",
            "tags": ["eruption", "creative destruction", "energy", "transformation"],
            "parameters": {
                "musical_mode": "Phrygian",
                "color_palette": ["#ff4500", "#ffd700", "#ac2b00"],
                "intensity": 0.8,
                "duration": 30.0,
                "geological_impact": "high",
                "consciousness_impact": "transformative"
            },
            "function": {
                "transform": "destroy barriers, birth new terrain",
                "modify_world": "change weather to storm/wildlight",
                "npc_emotion": "awe, alarm, creative inspiration",
                "psychological_effect": "breakthrough, liberation, creative catalysis"
            },
            "oracle_sentence": "From the depths comes the fire that cracks the world and brings new life in its wake.",
            "extended_oracle": "The earth splits open like a cosmic egg, revealing the molten heart of creation. What seemed solid dissolves in divine fire, and from the ashes, new possibilities crystallize into being. The NPCs witness the sacred destruction that precedes all genuine birth.",
            "three_js_parameters": {
                "particle_systems": ["lava_fountain", "ash_cloud", "ember_storm"],
                "lighting_effects": ["volcanic_glow", "lightning_flashes", "molten_reflections"],
                "terrain_modifications": ["ground_cracking", "lava_flows", "new_formations"],
                "atmospheric_changes": ["smoke_density", "heat_distortion", "color_shifts"]
            }
        }
    
    def initialize_npcs(self) -> List[NPCReaction]:
        """Initialize NPCs for Volcanic Fire reactions"""
        return [
            NPCReaction(
                npc_id="dee_magus",
                name="John Dee",
                archetype="Magus",
                emotional_state="fascinated_caution",
                dialogue="By the sacred fire of Geburah! You have awakened the volcanic current that reshapes realms. Such power requires wisdom to direct...",
                action_taken="begins_protective_calculations",
                inspiration_level=0.9
            ),
            NPCReaction(
                npc_id="carrington_artist",
                name="Leonora Carrington",
                archetype="Artist-Mage",
                emotional_state="ecstatic_inspiration",
                dialogue="The fire paints itself across reality's canvas! I must capture this transformation before the colors cool into ordinary matter...",
                action_taken="starts_painting_eruption",
                inspiration_level=0.95
            ),
            NPCReaction(
                npc_id="blake_visionary",
                name="William Blake",
                archetype="Visionary",
                emotional_state="prophetic_awe",
                dialogue="I see the tigers of wrath burning through the forests of experience! This fire consumes illusion and births eternal truth!",
                action_taken="begins_composing_epic",
                inspiration_level=0.92
            ),
            NPCReaction(
                npc_id="tesla_inventor",
                name="Nikola Tesla",
                archetype="Electric Sage",
                emotional_state="scientific_wonder",
                dialogue="Magnificent! The electromagnetic fields generated by this geological transformation could power entirely new technologies...",
                action_taken="measures_energy_patterns",
                inspiration_level=0.88
            ),
            NPCReaction(
                npc_id="jung_psychologist",
                name="Carl Jung",
                archetype="Soul Explorer",
                emotional_state="analytical_fascination",
                dialogue="A perfect manifestation of the Shadow's integration - destruction that serves individuation. The psyche erupts to birth new consciousness...",
                action_taken="documents_psychological_effects",
                inspiration_level=0.85
            )
        ]
    
    def cast_volcanic_fire(self, player_intention: str, player_archetype: str = "magician") -> Dict[str, Any]:
        """Cast the Volcanic Fire spell with full Library integration"""
        print("🌋 Casting Volcanic Fire spell...")
        
        # Basic spell result
        result = {
            "spell_name": "Volcanic Fire",
            "element": "fire",
            "archetype": "Tower / Crowley",
            "player_intention": player_intention,
            "player_archetype": player_archetype,
            "chaos_delta": 14,  # High chaos for volcanic transformation
            "oracle_message": self.spell_config["oracle_sentence"],
            "extended_oracle": self.spell_config["extended_oracle"]
        }
        
        # Generate NPC reactions
        npc_reactions = []
        for npc in self.npcs:
            # Modify reaction based on player intention
            if "creation" in player_intention.lower():
                npc.inspiration_level *= 1.1
            elif "destruction" in player_intention.lower():
                npc.inspiration_level *= 0.9
            
            npc_reactions.append({
                "npc": npc.name,
                "archetype": npc.archetype,
                "emotion": npc.emotional_state,
                "dialogue": npc.dialogue,
                "action": npc.action_taken,
                "inspiration": round(npc.inspiration_level, 2)
            })
        
        result["npc_reactions"] = npc_reactions
        
        # Generate Three.js visualization parameters
        result["visualization"] = {
            "particle_count": self.visualization_params.particle_count,
            "color_palette": self.visualization_params.color_palette,
            "intensity": self.visualization_params.intensity,
            "effects": self.spell_config["three_js_parameters"],
            "duration": self.spell_config["parameters"]["duration"]
        }
        
        # Library integration if available
        if self.library_enabled:
            result["library_integration"] = self.integrate_with_library(player_intention)
        
        # Museum and style enhancement if available
        if self.enhancement_enabled:
            result["museum_enhancement"] = self.enhance_with_museum_sources()
            result["style_elevation"] = self.elevate_with_cathedral_style()
        
        # World state changes
        result["world_changes"] = {
            "terrain": "Volcanic terrain created - lava flows, new mountains, fertile ash soil",
            "weather": "Storm system with lightning, thermal updrafts, ash precipitation", 
            "atmosphere": "Charged with creative energy and transformation potential",
            "consciousness": "Collective breakthrough and liberation from limiting patterns"
        }
        
        return result
    
    def integrate_with_library(self, player_intention: str) -> Dict[str, Any]:
        """Integrate spell casting with Library of Alexandria"""
        integration = {}
        
        # Record in Hall of Gnosis if philosophical intention
        if any(word in player_intention.lower() for word in ["wisdom", "knowledge", "understanding", "truth"]):
            inquiry_result = self.hall_of_gnosis.philosophical_inquiry(
                f"What wisdom does Volcanic Fire teach us? {player_intention}"
            )
            integration["gnosis_inquiry"] = inquiry_result["inquiry_id"]
            integration["philosophical_perspectives"] = inquiry_result["philosophical_perspectives"]
        
        # Record in Hall of Shadows if transformational intention
        if any(word in player_intention.lower() for word in ["transform", "release", "destroy", "heal", "shadow"]):
            shadow_record_id = self.hall_of_shadows.create_shadow_record(
                shadow_type=ShadowType.INTEGRATION_WORK,
                title=f"Volcanic Fire Transformation: {player_intention}",
                content=f"Player cast Volcanic Fire with intention: {player_intention}. The spell's destructive-creative energy was used for transformation and integration work."
            )
            integration["shadow_record"] = shadow_record_id
            integration["integration_guidance"] = "Volcanic Fire energy available for shadow transformation"
        
        # Activate relevant spinal vertebrae
        activated_vertebrae = []
        # Vertebra 5 - Camael/Marbas (Strength/Fire)
        activation = self.library.activate_vertebra(5, "GEBURAH STRIKES")
        if activation["success"]:
            activated_vertebrae.append(activation)
        
        # Vertebra 11 - Uriel/Barbatos (Fire of God)
        activation = self.library.activate_vertebra(11, "FLAME PURIFIES")
        if activation["success"]:
            activated_vertebrae.append(activation)
        
        integration["activated_vertebrae"] = activated_vertebrae
        
        # Filter through rose windows
        rose_filter = self.library.filter_through_rose_window("navigation", "fire transformation volcanic creation")
        integration["rose_window_resonance"] = rose_filter
        
        return integration
    
    def enhance_with_museum_sources(self) -> Dict[str, Any]:
        """Enhance spell with authentic historical sources"""
        if not self.enhancement_enabled:
            return {"note": "Museum enhancement not available"}
        
        # Get relevant sources for fire/transformation
        fire_sources = self.museum_engine.get_sources_for_spell("fire", "magician")
        
        # Generate authentic art prompt
        base_prompt = "Volcanic eruption with molten lava flows, transformative fire energy, sacred geometry"
        enhanced_prompt = self.museum_engine.generate_authentic_prompt(base_prompt, fire_sources)
        
        return {
            "historical_sources": [source.source_id for source in fire_sources[:3]],
            "enhanced_art_prompt": enhanced_prompt,
            "citations": self.museum_engine.get_source_citations(fire_sources[:3]),
            "authenticity_level": "museum_grade"
        }
    
    def elevate_with_cathedral_style(self) -> Dict[str, Any]:
        """Elevate spell visualization with Cathedral style guide"""
        if not self.enhancement_enabled:
            return {"note": "Style elevation not available"}
        
        # Elevate visual description
        base_description = "Volcanic fire eruption with lava and transformation"
        elevated_description = self.style_engine.elevate_prompt_style(
            base_description,
            self.style_engine.StyleTier.MUSEUM_GRADE,
            "tower"
        )
        
        # Generate sacred geometry layout for visualization
        golden_layout = self.style_engine.calculate_golden_layout(1920, 1080)
        
        return {
            "elevated_description": elevated_description,
            "style_tier": "museum_grade",
            "golden_layout": golden_layout,
            "color_harmony": self.style_engine.color_harmonies["museum_grade"],
            "sacred_geometry": "Golden ratio proportions applied to volcanic formation"
        }
    
    def generate_react_component_code(self) -> str:
        """Generate React component code for Volcanic Fire scene"""
        return '''
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function VolcanicFireParticles({ intensity = 0.8, colorPalette = ["#ff4500", "#ffd700", "#ac2b00"] }) {
  const pointsRef = useRef();
  const [positions, setPositions] = useState(new Float32Array(5000 * 3));
  const [velocities] = useState(new Float32Array(5000 * 3));
  
  useEffect(() => {
    // Initialize particle positions and velocities
    const posArray = new Float32Array(5000 * 3);
    const velArray = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      // Start particles at volcanic vent
      posArray[i3] = (Math.random() - 0.5) * 2; // x
      posArray[i3 + 1] = 0; // y (ground level)
      posArray[i3 + 2] = (Math.random() - 0.5) * 2; // z
      
      // Volcanic eruption velocities
      velArray[i3] = (Math.random() - 0.5) * 0.1;
      velArray[i3 + 1] = Math.random() * 0.3 + 0.1; // upward velocity
      velArray[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    
    setPositions(posArray);
    velocities.set(velArray);
  }, []);
  
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      
      // Update positions with velocities
      positions[i3] += velocities[i3] * delta * intensity;
      positions[i3 + 1] += velocities[i3 + 1] * delta * intensity;
      positions[i3 + 2] += velocities[i3 + 2] * delta * intensity;
      
      // Apply gravity and wind effects
      velocities[i3 + 1] -= 0.01 * delta; // gravity
      
      // Reset particles that fall below ground or get too far
      if (positions[i3 + 1] < -5 || Math.abs(positions[i3]) > 50) {
        positions[i3] = (Math.random() - 0.5) * 2;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = (Math.random() - 0.5) * 2;
        velocities[i3 + 1] = Math.random() * 0.3 + 0.1;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={colorPalette[0]}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function VolcanicTerrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshStandardMaterial 
        color="#2c1810" 
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}

export default function VolcanicFireScene({ spellResult }) {
  const { visualization = {}, oracle_message, npc_reactions = [] } = spellResult;
  
  return (
    <div style={{ width: '100%', height: '600px', background: '#1a1a2e' }}>
      <Canvas camera={{ position: [0, 10, 30], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={2} color="#ff4500" />
        <pointLight position={[10, 15, 10]} intensity={1} color="#ffd700" />
        
        <VolcanicFireParticles 
          intensity={visualization.intensity || 0.8}
          colorPalette={visualization.color_palette || ["#ff4500", "#ffd700", "#ac2b00"]}
        />
        <VolcanicTerrain />
        
        {/* Add atmospheric effects */}
        <fog attach="fog" args={['#16213e', 30, 100]} />
      </Canvas>
      
      <div style={{ 
        position: 'absolute', 
        top: 20, 
        left: 20, 
        color: 'white', 
        maxWidth: '300px',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h3>🌋 Volcanic Fire Oracle</h3>
        <p>{oracle_message}</p>
        
        <h4>🎭 NPC Reactions</h4>
        {npc_reactions.slice(0, 3).map((npc, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>
            <strong>{npc.npc}:</strong> {npc.emotion}
            <br />
            <em>"{npc.dialogue.slice(0, 60)}..."</em>
          </div>
        ))}
      </div>
    </div>
  );
}
'''
    
    def generate_fastapi_endpoint(self) -> str:
        """Generate FastAPI endpoint code for Volcanic Fire"""
        return '''
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import json

app = FastAPI(title="Cathedral of Circuits - Volcanic Fire API")

class SpellCastRequest(BaseModel):
    player_intention: str
    player_archetype: str = "magician"
    intensity_override: Optional[float] = None

@app.post("/api/spells/cast/volcanic_fire")
async def cast_volcanic_fire(request: SpellCastRequest):
    """Cast the Volcanic Fire spell with player intention"""
    try:
        # Initialize the Volcanic Fire engine
        engine = VolcanicFireEngine()
        
        # Cast the spell
        result = engine.cast_volcanic_fire(
            player_intention=request.player_intention,
            player_archetype=request.player_archetype
        )
        
        # Override intensity if provided
        if request.intensity_override:
            result["visualization"]["intensity"] = request.intensity_override
            result["chaos_delta"] = int(result["chaos_delta"] * request.intensity_override)
        
        return {
            "success": True,
            "spell_result": result,
            "timestamp": datetime.now().isoformat(),
            "message": "Volcanic Fire spell cast successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Spell casting failed: {str(e)}")

@app.get("/api/spells/volcanic_fire/info")
async def get_volcanic_fire_info():
    """Get information about the Volcanic Fire spell"""
    engine = VolcanicFireEngine()
    
    return {
        "spell_config": engine.spell_config,
        "visualization_params": {
            "particle_count": engine.visualization_params.particle_count,
            "color_palette": engine.visualization_params.color_palette,
            "intensity": engine.visualization_params.intensity
        },
        "available_npcs": [npc.name for npc in engine.npcs],
        "library_integration": engine.library_enabled,
        "enhancement_features": engine.enhancement_enabled
    }

@app.get("/api/library/status")
async def get_library_status():
    """Get status of the Library of Alexandria integration"""
    try:
        library = AlexandriaArchitecture()
        return library.get_library_status()
    except Exception as e:
        return {"error": f"Library not available: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
'''

# Test the Volcanic Fire integration
if __name__ == "__main__":
    print("🌋 Testing Volcanic Fire Integration with Library of Alexandria...")
    
    engine = VolcanicFireEngine()
    
    # Test spell casting
    result = engine.cast_volcanic_fire(
        player_intention="I seek to transform my creative blocks through the power of volcanic fire",
        player_archetype="artist_mage"
    )
    
    print(f"✨ Spell Cast: {result['spell_name']}")
    print(f"🔥 Oracle: {result['oracle_message']}")
    print(f"🌀 Chaos Delta: +{result['chaos_delta']}")
    print(f"🎭 NPC Reactions: {len(result['npc_reactions'])}")
    
    if 'library_integration' in result:
        print(f"🏛️ Library Integration: Active")
        if 'activated_vertebrae' in result['library_integration']:
            print(f"⚡ Activated Vertebrae: {len(result['library_integration']['activated_vertebrae'])}")
    
    if 'museum_enhancement' in result:
        print(f"🏛️ Museum Enhancement: {result['museum_enhancement'].get('authenticity_level', 'basic')}")
    
    if 'style_elevation' in result:
        print(f"🎨 Style Elevation: {result['style_elevation'].get('style_tier', 'basic')}")
    
    print("\n🎉 Volcanic Fire integration with Library of Alexandria complete!")
    print("Ready for React/Three.js frontend and FastAPI backend deployment!")