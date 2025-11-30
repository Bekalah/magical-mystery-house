# Cathedral Graph Navigation Engine
# Core navigation system for the 10-node Cathedral of Circuits graph

import json
import math
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path

class NavigationState(Enum):
    """Current navigation state in the graph"""
    IDLE = "idle"
    TRANSITIONING = "transitioning"
    IN_ROOM = "in_room"
    FACTION_ENCOUNTER = "faction_encounter"
    RESPAWN_GATE = "respawn_gate"

@dataclass
class NodeVisit:
    """Record of visiting a node"""
    node_id: str
    timestamp: str
    duration: float
    artifacts_generated: List[str] = field(default_factory=list)
    intensity_level: float = 0.0
    edge_traversed: Optional[str] = None

@dataclass
class NavigationSession:
    """Complete navigation session through the cathedral graph"""
    session_id: str
    current_node: Optional[str] = None
    state: NavigationState = NavigationState.IDLE
    visit_history: List[NodeVisit] = field(default_factory=list)
    active_effects: List[str] = field(default_factory=list)
    accumulated_intensity: float = 0.0
    respawn_count: int = 0

class CathedralGraphNavigator:
    """Navigation engine for the Cathedral Core Graph"""
    
    def __init__(self, graph_data_path: str = "packages/graphs"):
        self.graph_path = Path(graph_data_path)
        self.core_nodes = self.load_core_nodes()
        self.navigation_rules = self.load_navigation_rules()
        self.render_hints = self.load_render_hints()
        self.current_session = None
        
    def load_core_nodes(self) -> Dict[str, Any]:
        """Load the core node map"""
        with open(self.graph_path / "core_node_map.json", 'r') as f:
            return json.load(f)
    
    def load_navigation_rules(self) -> Dict[str, Any]:
        """Load navigation behavior rules"""
        with open(self.graph_path / "navigation_rules.json", 'r') as f:
            return json.load(f)
    
    def load_render_hints(self) -> Dict[str, Any]:
        """Load rendering hints for each node"""
        with open(self.graph_path / "render_hints.json", 'r') as f:
            return json.load(f)
    
    def start_session(self, session_id: str) -> NavigationSession:
        """Start a new navigation session"""
        self.current_session = NavigationSession(
            session_id=session_id,
            state=NavigationState.IDLE
        )
        return self.current_session
    
    def enter_node(self, node_id: str, edge_type: Optional[str] = None) -> Dict[str, Any]:
        """Enter a specific node in the cathedral graph"""
        if not self.current_session:
            return {"error": "No active session. Start a session first."}
        
        if node_id not in [node["id"] for node in self.core_nodes["nodes"]]:
            return {"error": f"Node '{node_id}' not found in cathedral graph"}
        
        # Get node data
        node_data = next(node for node in self.core_nodes["nodes"] if node["id"] == node_id)
        
        # Apply edge behaviors if transitioning from another node
        edge_effects = []
        if edge_type and edge_type in self.navigation_rules["edgeBehaviors"]:
            edge_behaviors = self.navigation_rules["edgeBehaviors"][edge_type]
            edge_effects = edge_behaviors.get("onEnter", [])
            self.current_session.active_effects.extend(edge_effects)
        
        # Get render hints for this node
        render_data = self.render_hints["renderHints"].get(node_id, {})
        
        # Update session state
        self.current_session.current_node = node_id
        self.current_session.state = NavigationState.IN_ROOM if node_data["kind"] == "room" else NavigationState.FACTION_ENCOUNTER
        
        # Calculate intensity based on node and accumulated effects
        intensity = self.calculate_node_intensity(node_data, edge_effects)
        self.current_session.accumulated_intensity += intensity
        
        # Create visit record
        visit = NodeVisit(
            node_id=node_id,
            timestamp="current_session",
            duration=0.0,  # Will be updated on exit
            intensity_level=intensity,
            edge_traversed=edge_type
        )
        self.current_session.visit_history.append(visit)
        
        # Generate entry response
        return {
            "node_entered": node_id,
            "node_data": node_data,
            "render_hints": render_data,
            "edge_effects": edge_effects,
            "session_state": self.current_session.state.value,
            "intensity": intensity,
            "navigation_options": self.get_navigation_options(node_id),
            "artifact_opportunity": self.check_artifact_generation(node_data, intensity),
            "oracle_message": self.generate_oracle_message(node_data, edge_type)
        }
    
    def get_navigation_options(self, current_node_id: str) -> List[Dict[str, Any]]:
        """Get available navigation options from current node"""
        options = []
        
        for edge in self.core_nodes["edges"]:
            if edge["from"] == current_node_id:
                target_node = next(node for node in self.core_nodes["nodes"] if node["id"] == edge["to"])
                options.append({
                    "target_node": edge["to"],
                    "target_name": target_node["name"],
                    "edge_type": edge["type"],
                    "description": edge["note"],
                    "intensity": edge.get("intensity", 0.5)
                })
        
        return options
    
    def traverse_edge(self, target_node_id: str) -> Dict[str, Any]:
        """Traverse an edge to a target node"""
        if not self.current_session or not self.current_session.current_node:
            return {"error": "No current node to traverse from"}
        
        # Find the edge
        current_node = self.current_session.current_node
        edge = None
        for e in self.core_nodes["edges"]:
            if e["from"] == current_node and e["to"] == target_node_id:
                edge = e
                break
        
        if not edge:
            return {"error": f"No edge found from {current_node} to {target_node_id}"}
        
        # Apply exit behaviors
        edge_type = edge["type"]
        if edge_type in self.navigation_rules["edgeBehaviors"]:
            exit_effects = self.navigation_rules["edgeBehaviors"][edge_type].get("onExit", [])
            # Process exit effects here
        
        # Update session to transitioning state
        self.current_session.state = NavigationState.TRANSITIONING
        
        # Enter the target node
        return self.enter_node(target_node_id, edge_type)
    
    def calculate_node_intensity(self, node_data: Dict[str, Any], edge_effects: List[str]) -> float:
        """Calculate the intensity level for entering a node"""
        base_intensity = 0.3
        
        # Faction nodes are more intense
        if node_data["kind"] == "faction":
            base_intensity += 0.2
        
        # Certain archetypes have higher base intensity
        high_intensity_cards = ["XVI The Tower", "0 The Fool", "XVIII The Moon"]
        if node_data["tarotOverlay"] in high_intensity_cards:
            base_intensity += 0.3
        
        # Edge effects can increase intensity
        for effect in edge_effects:
            if "intensity" in effect.lower() or "lightning" in effect.lower():
                base_intensity += 0.2
            elif "chaos" in effect.lower() or "disruption" in effect.lower():
                base_intensity += 0.15
        
        # Apply safety maximum
        max_intensity = self.navigation_rules["safety"]["maxIntensity"]
        return min(base_intensity, max_intensity)
    
    def check_artifact_generation(self, node_data: Dict[str, Any], intensity: float) -> Dict[str, Any]:
        """Check if an artifact should be generated"""
        if intensity > 0.6:
            return {
                "generate_artifact": True,
                "artifact_type": node_data["artifact"],
                "quality_level": "museum_grade" if intensity > 0.8 else "elevated",
                "suggested_prompt": f"Generate {node_data['artifact']} in the style of {node_data['name']}"
            }
        
        return {"generate_artifact": False}
    
    def generate_oracle_message(self, node_data: Dict[str, Any], edge_type: Optional[str]) -> str:
        """Generate an oracle message for entering a node"""
        messages = {
            "tesla": "Lightning illuminates the path between worlds, where invention meets inspiration.",
            "hypatia": "The stars whisper ancient mathematics, weaving wisdom through celestial patterns.",
            "agrippa": "Correspondence tables unfold before you, revealing the hidden connections of all things.",
            "dee": "Angelic script shimmers in emerald light, offering keys to the divine lattice.", 
            "fortune": "Rose-cross shields surround you with protective light and temple wisdom.",
            "hilma": "Spiral gardens bloom in visionary colors, painting the soul's journey.",
            "witch-mods": "Digital eyes scan for truth, protecting the cathedral from false illusions.",
            "crowley-shadow": "Creative chaos stirs, demanding transformation through destruction.",
            "virelai": "Violet flames transmute all shadow into illumination and healing.",
            "rebecca-respawn": "The reset gate opens infinite possibilities for new beginnings."
        }
        
        base_message = messages.get(node_data["id"], "You have entered a sacred space of the cathedral.")
        
        if edge_type:
            edge_additions = {
                "amplifies": " The energy builds to crescendo.",
                "requiresReset": " A fresh start beckons through the gate.",
                "seeksProtection": " Safety and wisdom offer their embrace.",
                "summons": " Hidden forces gather for justice.",
                "tests": " Your integrity faces examination.",
                "influences": " Knowledge flows between ancient minds.",
                "inspires": " Visions kindle in the artistic flame.",
                "feeds": " Power nourishes the work ahead.",
                "fortifies": " Strength builds upon wisdom's foundation.",
                "grounds": " Ethereal insights take material form."
            }
            
            base_message += edge_additions.get(edge_type, "")
        
        return base_message
    
    def trigger_respawn(self) -> Dict[str, Any]:
        """Trigger the respawn gate mechanism"""
        if not self.current_session:
            return {"error": "No active session for respawn"}
        
        # Safety check
        if not self.navigation_rules["safety"]["respawnEnabled"]:
            return {"error": "Respawn is disabled for safety"}
        
        # Reset session state
        self.current_session.state = NavigationState.RESPAWN_GATE
        self.current_session.current_node = "rebecca-respawn"
        self.current_session.accumulated_intensity = 0.0
        self.current_session.active_effects = []
        self.current_session.respawn_count += 1
        
        return {
            "respawn_triggered": True,
            "reset_complete": True,
            "respawn_count": self.current_session.respawn_count,
            "message": "Rebecca Respawn gate activated. All intensity reset. New journey begins.",
            "current_node": "rebecca-respawn"
        }
    
    def get_session_status(self) -> Dict[str, Any]:
        """Get current session status"""
        if not self.current_session:
            return {"error": "No active session"}
        
        return {
            "session_id": self.current_session.session_id,
            "current_node": self.current_session.current_node,
            "state": self.current_session.state.value,
            "accumulated_intensity": self.current_session.accumulated_intensity,
            "nodes_visited": len(self.current_session.visit_history),
            "respawn_count": self.current_session.respawn_count,
            "active_effects": self.current_session.active_effects,
            "safety_status": {
                "within_intensity_limit": self.current_session.accumulated_intensity < self.navigation_rules["safety"]["maxIntensity"],
                "respawn_available": self.navigation_rules["safety"]["respawnEnabled"]
            }
        }
    
    def get_cathedral_map(self) -> Dict[str, Any]:
        """Get the complete cathedral map for visualization"""
        return {
            "graph_data": self.core_nodes,
            "render_hints": self.render_hints,
            "navigation_rules": self.navigation_rules,
            "current_session": self.get_session_status() if self.current_session else None
        }