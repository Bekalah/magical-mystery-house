# Cathedral Style Guide Implementation
# Sacred geometry + visionary healing + gothic elegance workflow

import math
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass
from enum import Enum

class StyleTier(Enum):
    """Elevation levels for artistic output"""
    BASIC = "basic"
    ELEVATED = "elevated" 
    MUSEUM_GRADE = "museum_grade"
    TRANSCENDENT = "transcendent"

@dataclass
class SacredGeometry:
    """Sacred geometric principles and proportions"""
    golden_ratio: float = 1.618033988749
    vesica_ratio: float = 1.732050807569  # sqrt(3)
    pentagram_ratio: float = 1.618033988749
    octagon_ratio: float = 2.414213562373  # 1 + sqrt(2)

class CathedralStyleEngine:
    """Implements Cathedral Style Guide for museum-quality output"""
    
    def __init__(self):
        self.geometry = SacredGeometry()
        self.style_principles = self.load_style_principles()
        self.color_harmonies = self.load_color_harmonies()
        self.composition_rules = self.load_composition_rules()
    
    def load_style_principles(self) -> Dict[str, Any]:
        """Core principles from Cathedral Style Guide"""
        return {
            "sacred_geometry": {
                "golden_ratio": "Apply phi proportions to layouts and compositions",
                "vesica_piscis": "Use for portal and gateway imagery", 
                "pentagram": "Star and protection symbolism",
                "octagon": "Transformation and regeneration",
                "fibonacci_spiral": "Growth and natural flow patterns"
            },
            "visionary_healing": {
                "color_therapy": "Colors aligned with chakra and healing properties",
                "symmetrical_balance": "Bilateral harmony for psychological equilibrium",
                "organic_flow": "Natural curves that promote relaxation",
                "crystalline_clarity": "Clear geometric forms for mental focus",
                "light_gradients": "Soft transitions that guide consciousness"
            },
            "gothic_elegance": {
                "vertical_aspiration": "Upward movement expressing transcendence",
                "ornate_detail": "Rich decorative elements showing craftsmanship",
                "dramatic_contrast": "Light/shadow interplay for emotional depth",
                "architectural_precision": "Mathematical perfection in structure",
                "mystical_symbolism": "Esoteric imagery with layered meaning"
            }
        }
    
    def load_color_harmonies(self) -> Dict[str, Dict[str, str]]:
        """Color palettes for each style tier"""
        return {
            StyleTier.BASIC.value: {
                "primary": "#8B4513",     # Saddle brown
                "secondary": "#DAA520",   # Goldenrod
                "accent": "#4B0082",      # Indigo
                "background": "#F5F5DC"   # Beige
            },
            StyleTier.ELEVATED.value: {
                "primary": "#B8860B",     # Dark goldenrod
                "secondary": "#8A2BE2",   # Blue violet
                "accent": "#DC143C",      # Crimson
                "background": "#F0F8FF",  # Alice blue
                "metallic": "#FFD700"     # Gold
            },
            StyleTier.MUSEUM_GRADE.value: {
                "primary": "#2F4F4F",     # Dark slate gray
                "secondary": "#8B008B",   # Dark magenta
                "accent": "#FF6347",      # Tomato
                "background": "#FFF8DC",  # Cornsilk
                "metallic": "#B8860B",    # Dark goldenrod
                "jewel": "#9932CC"        # Dark orchid
            },
            StyleTier.TRANSCENDENT.value: {
                "primary": "#191970",     # Midnight blue
                "secondary": "#8B0000",   # Dark red
                "accent": "#FF4500",      # Orange red
                "background": "#FFFAF0",  # Floral white
                "metallic": "#CD853F",    # Peru
                "jewel": "#4B0082",       # Indigo
                "celestial": "#E6E6FA",   # Lavender
                "ethereal": "#F0E68C"     # Khaki
            }
        }
    
    def load_composition_rules(self) -> Dict[str, Any]:
        """Layout and composition guidelines"""
        return {
            "golden_rectangles": {
                "width_to_height": self.geometry.golden_ratio,
                "subdivision": "Divide using phi proportions",
                "focal_points": "Place key elements at phi intersections"
            },
            "vesica_piscis_layouts": {
                "overlapping_circles": "Two circles with centers on circumferences",
                "portal_proportion": self.geometry.vesica_ratio,
                "sacred_intersection": "Central mandorla for focal content"
            },
            "gothic_proportions": {
                "vertical_emphasis": "Height 2-3x width for aspiration",
                "pointed_arches": "Use pointed arch ratios",
                "rose_windows": "Circular mandala compositions"
            }
        }
    
    def calculate_golden_layout(self, canvas_width: float, canvas_height: float) -> Dict[str, Any]:
        """Generate golden ratio layout grid"""
        phi = self.geometry.golden_ratio
        
        # Primary divisions
        vertical_phi = canvas_width / phi
        horizontal_phi = canvas_height / phi
        
        # Focal point intersections
        focal_points = [
            (vertical_phi, horizontal_phi),
            (canvas_width - vertical_phi, horizontal_phi),
            (vertical_phi, canvas_height - horizontal_phi),
            (canvas_width - vertical_phi, canvas_height - horizontal_phi)
        ]
        
        return {
            "canvas": {"width": canvas_width, "height": canvas_height},
            "phi_divisions": {
                "vertical": vertical_phi,
                "horizontal": horizontal_phi
            },
            "focal_points": focal_points,
            "golden_rectangles": [
                {"x": 0, "y": 0, "width": vertical_phi, "height": horizontal_phi},
                {"x": vertical_phi, "y": 0, "width": canvas_width - vertical_phi, "height": horizontal_phi},
                {"x": 0, "y": horizontal_phi, "width": vertical_phi, "height": canvas_height - horizontal_phi},
                {"x": vertical_phi, "y": horizontal_phi, "width": canvas_width - vertical_phi, "height": canvas_height - horizontal_phi}
            ]
        }
    
    def create_vesica_piscis(self, center_x: float, center_y: float, radius: float) -> Dict[str, Any]:
        """Generate vesica piscis geometry"""
        # Two circles with centers separated by radius distance
        circle1_center = (center_x - radius/2, center_y)
        circle2_center = (center_x + radius/2, center_y)
        
        # Intersection points
        height = radius * math.sqrt(3) / 2
        intersection_top = (center_x, center_y + height)
        intersection_bottom = (center_x, center_y - height)
        
        return {
            "circle1": {"center": circle1_center, "radius": radius},
            "circle2": {"center": circle2_center, "radius": radius},
            "vesica": {
                "center": (center_x, center_y),
                "width": radius,
                "height": radius * self.geometry.vesica_ratio,
                "intersection_points": [intersection_top, intersection_bottom]
            }
        }
    
    def elevate_prompt_style(self, base_prompt: str, tier: StyleTier, archetype: str = None) -> str:
        """Enhance prompt based on style tier and principles"""
        enhanced_prompt = base_prompt
        colors = self.color_harmonies[tier.value]
        
        if tier == StyleTier.BASIC:
            enhanced_prompt += f", warm earth tones, simple geometric patterns"
        
        elif tier == StyleTier.ELEVATED:
            enhanced_prompt += f", rich colors with golden accents, sacred geometric proportions, subtle mystical symbolism"
        
        elif tier == StyleTier.MUSEUM_GRADE:
            enhanced_prompt += f", museum-quality composition with golden ratio proportions, jewel-toned color palette, intricate sacred geometry, gothic architectural elements, professional artistic technique"
        
        elif tier == StyleTier.TRANSCENDENT:
            enhanced_prompt += f", transcendent artistic mastery, celestial color harmonies with ethereal gradients, perfect sacred geometric proportions, gothic cathedral elegance, visionary healing energy patterns, crystalline clarity, luminous depth, divine mathematical precision"
        
        # Add archetype-specific style elements
        if archetype:
            archetype_styles = {
                "magician": "dynamic energy flows, transformative symbolism",
                "high_priestess": "moonlit mysteries, intuitive curves", 
                "hierophant": "ceremonial grandeur, traditional ornament",
                "hermit": "contemplative lighting, solitary wisdom",
                "temperance": "balanced harmonies, flowing transitions",
                "star": "celestial radiance, hope and inspiration",
                "sun": "golden illumination, life-giving energy",
                "world": "cosmic completion, universal mandala"
            }
            
            if archetype.lower() in archetype_styles:
                enhanced_prompt += f", {archetype_styles[archetype.lower()]}"
        
        return enhanced_prompt
    
    def generate_style_guidelines(self, tier: StyleTier) -> Dict[str, Any]:
        """Generate complete style guidelines for a tier"""
        colors = self.color_harmonies[tier.value]
        
        guidelines = {
            "tier": tier.value,
            "color_palette": colors,
            "geometry_principles": self.style_principles["sacred_geometry"],
            "composition_rules": self.composition_rules,
            "quality_standards": {
                StyleTier.BASIC: "Clean, readable, geometrically sound",
                StyleTier.ELEVATED: "Sophisticated, harmonious, symbolically rich",
                StyleTier.MUSEUM_GRADE: "Professional exhibition quality, historically informed, masterful technique",
                StyleTier.TRANSCENDENT: "Visionary masterpiece, consciousness-expanding, divinely inspired perfection"
            }[tier]
        }
        
        return guidelines
    
    def validate_composition(self, layout_data: Dict[str, Any]) -> Dict[str, Any]:
        """Check if composition follows Cathedral Style Guide principles"""
        validation = {
            "passes_golden_ratio": False,
            "has_focal_hierarchy": False,
            "uses_sacred_geometry": False,
            "score": 0,
            "recommendations": []
        }
        
        # Check for golden ratio proportions
        if "golden_rectangles" in layout_data:
            validation["passes_golden_ratio"] = True
            validation["score"] += 30
        else:
            validation["recommendations"].append("Apply golden ratio proportions to layout")
        
        # Check for focal point hierarchy
        if "focal_points" in layout_data and len(layout_data["focal_points"]) >= 1:
            validation["has_focal_hierarchy"] = True
            validation["score"] += 25
        else:
            validation["recommendations"].append("Establish clear focal point hierarchy")
        
        # Check for sacred geometry
        if any(key in layout_data for key in ["vesica", "phi_divisions", "fibonacci_spiral"]):
            validation["uses_sacred_geometry"] = True
            validation["score"] += 45
        else:
            validation["recommendations"].append("Incorporate sacred geometric principles")
        
        return validation