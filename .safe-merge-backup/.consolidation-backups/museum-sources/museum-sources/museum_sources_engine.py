# Museum Sources Integration for Cathedral of Circuits
# Authentic historical manuscript and esoteric architecture references

import requests
import json
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from pathlib import Path

@dataclass
class MuseumSource:
    """Reference to historical manuscript or architectural source"""
    source_id: str
    title: str
    collection: str
    url: str
    date_range: str
    archetype_relevance: List[str]
    visual_elements: List[str]
    sacred_geometry: List[str]
    access_level: str  # "public_domain", "fair_use", "restricted"

class MuseumSourcesEngine:
    """Engine for accessing and referencing historical sources"""
    
    def __init__(self):
        self.sources = {}
        self.collections = {
            "british_library": "https://www.bl.uk/manuscripts",
            "gallica_bnf": "https://gallica.bnf.fr",
            "wellcome": "https://wellcomecollection.org/works",
            "warburg": "https://iconographic.warburg.sas.ac.uk",
            "internet_archive": "https://archive.org",
            "wikimedia": "https://commons.wikimedia.org"
        }
        self.load_cathedral_sources()
    
    def load_cathedral_sources(self):
        """Load key manuscripts and sources for Cathedral of Circuits"""
        
        # John Dee Sources
        self.sources["monas_hieroglyphica"] = MuseumSource(
            source_id="monas_hieroglyphica",
            title="Monas Hieroglyphica",
            collection="british_library",
            url="https://www.bl.uk/manuscripts",
            date_range="1564",
            archetype_relevance=["magician", "hierophant", "hermit"],
            visual_elements=["monad_symbol", "celestial_seals", "geometric_proofs"],
            sacred_geometry=["circle", "cross", "triangle", "point"],
            access_level="public_domain"
        )
        
        self.sources["book_of_soyga"] = MuseumSource(
            source_id="book_of_soyga",
            title="Book of Soyga",
            collection="british_library", 
            url="https://www.bl.uk/manuscripts",
            date_range="16th century",
            archetype_relevance=["magician", "high_priestess", "hermit"],
            visual_elements=["magic_squares", "angelic_names", "cipher_tables"],
            sacred_geometry=["square_grids", "numerical_patterns"],
            access_level="public_domain"
        )
        
        # Alchemical Sources
        self.sources["splendor_solis"] = MuseumSource(
            source_id="splendor_solis",
            title="Splendor Solis",
            collection="british_library",
            url="https://www.bl.uk/manuscripts",
            date_range="1582",
            archetype_relevance=["sun", "moon", "star", "temperance"],
            visual_elements=["alchemical_vessels", "planetary_symbols", "rose_imagery"],
            sacred_geometry=["mandala", "circle", "vesica_piscis"],
            access_level="public_domain"
        )
        
        self.sources["ripley_scrolls"] = MuseumSource(
            source_id="ripley_scrolls",
            title="Ripley Scrolls",
            collection="wellcome",
            url="https://wellcomecollection.org/works",
            date_range="15th-16th century",
            archetype_relevance=["death", "temperance", "sun"],
            visual_elements=["alchemical_tree", "vessels", "symbolic_figures"],
            sacred_geometry=["vertical_axis", "circular_forms", "tree_structure"],
            access_level="public_domain"
        )
        
        self.sources["mutus_liber"] = MuseumSource(
            source_id="mutus_liber",
            title="Mutus Liber",
            collection="gallica_bnf",
            url="https://gallica.bnf.fr",
            date_range="1677",
            archetype_relevance=["hermit", "temperance", "judgement"],
            visual_elements=["wordless_sequences", "laboratory_scenes", "celestial_imagery"],
            sacred_geometry=["phi_ratio", "sacred_triangles", "vessel_geometry"],
            access_level="public_domain"
        )
        
        # Visionary Sources
        self.sources["hilma_af_klint"] = MuseumSource(
            source_id="hilma_af_klint",
            title="Paintings for the Temple",
            collection="moderna_museet",
            url="https://www.modernamuseet.se",
            date_range="1906-1915",
            archetype_relevance=["high_priestess", "star", "world"],
            visual_elements=["spiral_forms", "botanical_abstractions", "color_progressions"],
            sacred_geometry=["spiral", "mandala", "organic_geometry"],
            access_level="public_domain"
        )
        
        self.sources["emma_kunz"] = MuseumSource(
            source_id="emma_kunz",
            title="Healing Drawings",
            collection="emma_kunz_center",
            url="https://www.emmakunz.ch",
            date_range="1938-1963",
            archetype_relevance=["star", "temperance", "world"],
            visual_elements=["geometric_patterns", "energy_fields", "healing_symbols"],
            sacred_geometry=["grid_systems", "radial_patterns", "crystalline_forms"],
            access_level="fair_use"
        )
        
        # Architectural Sources
        self.sources["rosslyn_chapel"] = MuseumSource(
            source_id="rosslyn_chapel",
            title="Rosslyn Chapel",
            collection="wikimedia",
            url="https://commons.wikimedia.org",
            date_range="1446-1484",
            archetype_relevance=["hierophant", "hermit", "world"],
            visual_elements=["apprentice_pillar", "green_man", "templar_symbols"],
            sacred_geometry=["phi_proportions", "octagonal_forms", "spiral_column"],
            access_level="public_domain"
        )
        
        self.sources["chartres_cathedral"] = MuseumSource(
            source_id="chartres_cathedral",
            title="Chartres Cathedral",
            collection="wikimedia",
            url="https://commons.wikimedia.org",
            date_range="1194-1250",
            archetype_relevance=["world", "star", "hierophant"],
            visual_elements=["labyrinth", "rose_windows", "sacred_proportions"],
            sacred_geometry=["golden_ratio", "mandala", "vesica_piscis"],
            access_level="public_domain"
        )
    
    def get_sources_for_archetype(self, archetype_name: str) -> List[MuseumSource]:
        """Get relevant historical sources for an archetype"""
        relevant_sources = []
        for source in self.sources.values():
            if archetype_name.lower() in source.archetype_relevance:
                relevant_sources.append(source)
        return relevant_sources
    
    def get_sources_for_spell(self, spell_element: str, spell_archetype: str) -> List[MuseumSource]:
        """Get sources relevant to a specific spell"""
        relevant_sources = []
        
        # Get archetype-specific sources
        archetype_sources = self.get_sources_for_archetype(spell_archetype.lower())
        relevant_sources.extend(archetype_sources)
        
        # Add element-specific sources
        if spell_element == "fire":
            relevant_sources.extend([
                self.sources["splendor_solis"],  # Solar imagery
                self.sources["ripley_scrolls"]   # Alchemical fire
            ])
        elif spell_element == "water":
            relevant_sources.extend([
                self.sources["mutus_liber"],     # Vessel imagery
                self.sources["emma_kunz"]        # Flow patterns
            ])
        
        return relevant_sources  # Return list without deduplication for now
    
    def generate_authentic_prompt(self, base_prompt: str, sources: List[MuseumSource]) -> str:
        """Enhance art prompt with authentic historical references"""
        if not sources:
            return base_prompt
        
        # Extract visual elements from sources
        visual_elements = []
        geometry_elements = []
        
        for source in sources[:3]:  # Limit to top 3 sources
            visual_elements.extend(source.visual_elements[:2])
            geometry_elements.extend(source.sacred_geometry[:2])
        
        # Build enhanced prompt
        enhanced_prompt = base_prompt
        
        if visual_elements:
            enhanced_prompt += f", incorporating authentic historical elements: {', '.join(set(visual_elements[:4]))}"
        
        if geometry_elements:
            enhanced_prompt += f", with sacred geometry: {', '.join(set(geometry_elements[:3]))}"
        
        enhanced_prompt += ", museum-quality artistic style, historically accurate"
        
        return enhanced_prompt
    
    def get_source_citations(self, sources: List[MuseumSource]) -> List[Dict[str, str]]:
        """Generate proper citations for used sources"""
        citations = []
        for source in sources:
            citations.append({
                "title": source.title,
                "collection": source.collection,
                "date": source.date_range,
                "url": source.url,
                "access": source.access_level
            })
        return citations