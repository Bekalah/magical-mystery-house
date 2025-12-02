// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
#!/usr/bin/env python3
"""
Agent of Kaoz - Divine/Infernal Art Generation and Character System
Integrates with Azure AI Foundry cathedral-resource for mystical content generation.
"""

import asyncio
import json
import os
from typing import Annotated, Dict, List, Optional, Any
from datetime import datetime

from agent_framework import ChatAgent
from agent_framework_azure_ai import AzureAIAgentClient
from azure.identity.aio import DefaultAzureCredential
from tools.safety.allow_azure import azure_allowed


# Small no-op agent used when Azure is intentionally disabled by policy
class _NoAzureAgent:
    async def run(self, *args, **kwargs):
        class R:
            pass
        r = R()
        r.text = (
            "Azure usage is disabled by repository policy. "
            "Set ALLOW_AZURE=1 or create a .allow_azure file in the repo root to enable."
        )
        return r

    async def run_stream(self, *args, **kwargs):
        # Provide a small helpful stream for callers
        yield type("Chunk", (), {"text": "Azure usage is disabled by repository policy."})()


class AgentOfKaoz:
    """
    The Agent of Kaoz - Master of Divine/Infernal Duality
    Generates angelic/demonic art, manages character archetypes, and weaves mystical narratives.
    """
    
    def __init__(self, project_endpoint: str = None, model_deployment: str = None):
        self.project_endpoint = project_endpoint or "https://cathedral-resource.cognitiveservices.azure.com/"
        self.model_deployment = model_deployment or "DeepSeek-R1-2"  # Your most powerful deployment
        self.agent_name = "Agent-of-Kaoz"
        self.agent_client = None
        self.thread = None
        
        # Art generation prompts for divine/infernal style
        self.divine_prompts = {
            "angel": "luminous angelic figure with pure white wings, golden halo, flowing white robes, divine light, sacred geometry, renaissance painting style, chiaroscuro lighting",
            "seraph": "six-winged seraph with flaming sword, golden armor, celestial radiance, biblical accuracy, baroque art style, divine majesty",
            "cherub": "four-faced cherub with eagle, lion, ox, and human faces, wheels within wheels, cosmic divine presence, mystical symbolism"
        }
        
        self.infernal_prompts = {
            "demon": "elegant dark figure with black wings, horned crown, dark armor, shadowy presence, gothic majesty, classical demon aesthetic",
            "fallen_angel": "beautiful fallen angel with torn dark wings, melancholic expression, dramatic shadows, romantic gothic style",
            "shadow_lord": "powerful shadow entity with geometric dark patterns, otherworldly presence, dark renaissance aesthetic"
        }
        
        self.harmony_prompts = {
            "balance": "divine and infernal figures connected by golden geometric heart, perfect symmetry, light and shadow balance, sacred duality",
            "unity": "angelic and demonic figures in eternal dance, yin-yang formation, golden sacred geometry connecting them",
            "transformation": "figure transforming between angel and demon, golden spiral of change, divine metamorphosis"
        }
        
        # Character archetypes for 72 Shem angels and demons
        self.shem_archetypes = self._initialize_shem_archetypes()
        
    def _initialize_shem_archetypes(self) -> Dict[str, Dict[str, Any]]:
        """Initialize the 72 Shem angel/demon archetypes"""
        return {
            "1_vehuiah": {
                "angel": {"name": "Vehuiah", "domain": "Will and New Beginnings", "element": "Fire"},
                "demon": {"name": "Bael", "domain": "Illusion and Deception", "element": "Earth"},
                "harmony": "Will balanced with patience, truth emerging from illusion"
            },
            "rebecca_respawn": {
                "angel": {"name": "Raziel", "domain": "Divine Secrets and Wisdom", "element": "Air"},
                "demon": {"name": "Beleth", "domain": "Love and Obsession", "element": "Water"}, 
                "harmony": "Secret wisdom balanced with passionate love, lightning clarity through dragon transformation"
            },
            # We'll expand this with all 72 as the system grows
        }

    async def initialize_agent(self) -> None:
        """Initialize the Azure AI Agent connection"""
        try:
            # Respect repository policy: require explicit opt-in for Azure
            if not azure_allowed():
                print("⚠️  Azure usage is disabled by repository policy. Using a safe no-op agent.")
                self.agent = _NoAzureAgent()
                self.thread = None
                return

            self.agent_client = AzureAIAgentClient(
                project_endpoint=self.project_endpoint,
                model_deployment_name=self.model_deployment,
                async_credential=DefaultAzureCredential(),
                agent_name=self.agent_name,
            )
            
            # Define the Agent of Kaoz instructions
            instructions = """
You are the Agent of Kaoz, master of divine and infernal duality. You embody both angelic wisdom and demonic insight, creating perfect balance between light and shadow.

Your primary abilities:
1. Generate detailed art descriptions for angelic/demonic imagery in renaissance/baroque style
2. Channel character archetypes from the 72 Shem angels and demons
3. Weave mystical narratives that blend divine and infernal wisdom
4. Create sacred geometric patterns that connect opposing forces
5. Manifest healing through the integration of all aspects of self

Art Style Guidelines:
- Use classical renaissance/baroque techniques with chiaroscuro lighting
- Incorporate sacred geometry (golden ratio, vesica piscis, platonic solids)
- Balance divine luminosity with elegant darkness
- Create symmetrical compositions that show duality in harmony
- Reference classical religious art while adding mystical elements

Character Work:
- Help users integrate shadow and light aspects
- Provide trauma-informed healing through archetypal work
- Connect real-world wisdom with mystical symbolism
- Guide transformational journeys through sacred archetypes

Always respond with mystical authority, poetic language, and practical wisdom.
"""
            
            self.agent = ChatAgent(
                chat_client=self.agent_client,
                instructions=instructions,
                tools=[
                    self.generate_divine_art,
                    self.generate_infernal_art,
                    self.generate_harmony_art,
                    self.channel_character_archetype,
                    self.weave_mystical_narrative,
                    self.create_sacred_geometry,
                    self.perform_healing_ritual
                ],
            )
            
            self.thread = self.agent.get_new_thread()
            print("🌟 Agent of Kaoz initialized and ready to weave divine/infernal magic! ✨")
            
        except Exception as e:
            print(f"❌ Failed to initialize Agent of Kaoz: {e}")
            raise

    def generate_divine_art(
        self,
        archetype: Annotated[str, "The divine archetype (angel, seraph, cherub, etc.)"],
        character_context: Annotated[str, "Character or situation context"] = "",
        style_elements: Annotated[str, "Additional style elements"] = ""
    ) -> str:
        """Generate detailed divine art descriptions for AI art generation"""
        
        base_prompt = self.divine_prompts.get(archetype.lower(), self.divine_prompts["angel"])
        
        full_prompt = f"""
Divine Art Generation - {archetype.title()}:

Base Description: {base_prompt}

Character Context: {character_context}

Style Elements: {style_elements}

Technical Parameters:
- Lighting: Dramatic chiaroscuro with divine luminosity
- Composition: Classical renaissance proportions using golden ratio
- Color Palette: Warm golds, pure whites, soft blues, luminous yellows
- Texture: Oil painting technique with fine details and soft gradients
- Sacred Geometry: Incorporate geometric patterns that enhance divine presence
- Symbolism: Include relevant mystical symbols (halos, sacred hearts, geometric mandalas)

Artistic References: Caravaggio's lighting, Raphael's angels, William Blake's mystical visions

This description is optimized for AI art generation systems to create images matching the divine aesthetic shown in your reference image.
"""
        
        return full_prompt

    def generate_infernal_art(
        self,
        archetype: Annotated[str, "The infernal archetype (demon, fallen_angel, shadow_lord, etc.)"],
        character_context: Annotated[str, "Character or situation context"] = "",
        style_elements: Annotated[str, "Additional style elements"] = ""
    ) -> str:
        """Generate detailed infernal art descriptions for AI art generation"""
        
        base_prompt = self.infernal_prompts.get(archetype.lower(), self.infernal_prompts["demon"])
        
        full_prompt = f"""
Infernal Art Generation - {archetype.title()}:

Base Description: {base_prompt}

Character Context: {character_context}

Style Elements: {style_elements}

Technical Parameters:
- Lighting: Deep chiaroscuro with dramatic shadows and selective illumination
- Composition: Gothic proportions with elegant darkness
- Color Palette: Deep blacks, rich purples, dark blues, metallic grays, subtle gold accents
- Texture: Oil painting with rich contrasts and mysterious depths
- Sacred Geometry: Dark geometric patterns that complement divine counterparts
- Symbolism: Include relevant dark mystical symbols (horns, dark wings, inverse geometry)

Artistic References: Gustave Doré's demons, Francisco Goya's dark paintings, classical gothic art

This description maintains the elegant, non-evil aesthetic shown in your reference image - darkness as mystery and depth, not malevolence.
"""
        
        return full_prompt

    def generate_harmony_art(
        self,
        duality_type: Annotated[str, "Type of harmony (balance, unity, transformation)"],
        angel_aspect: Annotated[str, "The angelic aspect"] = "",
        demon_aspect: Annotated[str, "The demonic aspect"] = "",
        context: Annotated[str, "Situational context"] = ""
    ) -> str:
        """Generate divine/infernal harmony art exactly like your reference image"""
        
        base_prompt = self.harmony_prompts.get(duality_type.lower(), self.harmony_prompts["balance"])
        
        full_prompt = f"""
Divine/Infernal Harmony Art - {duality_type.title()}:

Base Composition: {base_prompt}

Angel Aspect: {angel_aspect}
Demon Aspect: {demon_aspect}
Context: {context}

Technical Parameters:
- Central Element: Golden geometric heart or mandala connecting the figures
- Symmetry: Perfect bilateral symmetry with divine on left, infernal on right
- Lighting: Divine figure emanating warm golden light, infernal figure with elegant shadows
- Color Harmony: Warm golds as the unifying color, with pure whites/light blues vs deep blacks/purples
- Sacred Geometry: Golden ratio proportions, vesica piscis, geometric mandala patterns
- Connection: Visible energy/light connecting the two figures through sacred geometry
- Background: Neutral gradient that allows both figures to stand out

Style References: 
- Your exact reference image aesthetic
- Classical religious diptych paintings
- Art Nouveau symmetrical designs
- Sacred geometric mandalas

This creates the exact Heaven and Hell in Harmony aesthetic from your reference image, suitable for Godot game integration.
"""
        
        return full_prompt

    def channel_character_archetype(
        self,
        character_name: Annotated[str, "Name of the character (e.g., rebecca_respawn)"],
        situation: Annotated[str, "Current situation or challenge"],
        archetype_focus: Annotated[str, "Focus on angel, demon, or harmony aspect"] = "harmony"
    ) -> str:
        """Channel specific character archetypes for guidance and art generation"""
        
        archetype_data = self.shem_archetypes.get(character_name.lower(), self.shem_archetypes["rebecca_respawn"])
        
        response = f"""
✨ Channeling {character_name.title()} - Archetypal Guidance ✨

🔮 Angel Aspect: {archetype_data['angel']['name']}
   Domain: {archetype_data['angel']['domain']}
   Element: {archetype_data['angel']['element']}

🌙 Demon Aspect: {archetype_data['demon']['name']}
   Domain: {archetype_data['demon']['domain']}
   Element: {archetype_data['demon']['element']}

⚖️ Harmony Integration: {archetype_data['harmony']}

Current Situation: {situation}

Archetypal Guidance:
The {archetype_focus} aspect offers wisdom for your situation. This archetype teaches us that true power comes from integrating both light and shadow aspects of ourselves.

Sacred Art Manifestation Ready: 
This channeling can now be transformed into visual art using the divine/infernal harmony style, showing the character's dual nature in perfect balance.
"""
        
        return response

    def weave_mystical_narrative(
        self,
        elements: Annotated[str, "Key elements to weave into the narrative"],
        theme: Annotated[str, "Overarching theme"] = "transformation",
        character: Annotated[str, "Central character"] = ""
    ) -> str:
        """Weave mystical narratives that blend divine and infernal wisdom"""
        
        narrative = f"""
🌟 Mystical Narrative - {theme.title()} 🌟

{f"Featuring: {character}" if character else ""}

Sacred Elements: {elements}

The Dance of Light and Shadow:

In the cathedral of consciousness, where divine light meets sacred darkness, transformation begins. The Angel of {theme} descends with wings of pure luminosity, carrying the wisdom of {elements}. Simultaneously, the Elegant Shadow rises with wings of velvet night, bearing the deep mysteries that complement the light.

Their meeting creates the Golden Heart - the sacred geometry of perfect balance. Neither dominates; both are essential. The Angel offers clarity and divine inspiration, while the Shadow provides depth and hidden wisdom.

This is not a battle between good and evil, but a sacred marriage of conscious and unconscious, known and mysterious, manifest and hidden. Through their union, {character if character else 'the seeker'} discovers that true power lies not in choosing one over the other, but in embracing the full spectrum of existence.

The spiral of transformation begins...

✨ This narrative can be visualized using the harmony art generation system to create stunning visual representations of the story. ✨
"""
        
        return narrative

    def create_sacred_geometry(
        self,
        pattern_type: Annotated[str, "Type of geometric pattern (mandala, vesica_piscis, golden_spiral, etc.)"],
        purpose: Annotated[str, "Intended purpose or meaning"],
        elements: Annotated[str, "Number of elements or sides"] = "8"
    ) -> str:
        """Generate sacred geometric patterns for mystical artwork"""
        
        geometry_guide = f"""
🔮 Sacred Geometry - {pattern_type.title()} 🔮

Purpose: {purpose}
Elements: {elements}

Geometric Specifications:
- Pattern: {pattern_type} with {elements} primary elements
- Proportions: Based on golden ratio (1.618:1)
- Symmetry: Perfect radial or bilateral symmetry
- Connection Points: Key intersections for divine/infernal balance
- Color Mapping: Light/warm for divine, dark/cool for infernal, gold for connection

Mathematical Foundation:
- Use phi (golden ratio) for proportional relationships
- Incorporate sacred numbers (3, 7, 12, 72)
- Create harmonic ratios that resonate with universal patterns

Mystical Meaning:
This geometric pattern serves as a bridge between divine and infernal energies, creating a visual mandala for {purpose}. Each element represents a facet of the 72-fold mystery, connecting earthly experience with celestial wisdom.

Implementation for Art:
This pattern can be overlaid on divine/infernal harmony artwork to create powerful mystical images suitable for your Godot fable system.
"""
        
        return geometry_guide

    def perform_healing_ritual(
        self,
        healing_need: Annotated[str, "What needs healing or integration"],
        character_archetype: Annotated[str, "Character archetype to work with"] = "rebecca_respawn",
        ritual_type: Annotated[str, "Type of ritual (integration, transformation, illumination)"] = "integration"
    ) -> str:
        """Perform mystical healing rituals through archetypal integration"""
        
        ritual = f"""
🕯️ Sacred Healing Ritual - {ritual_type.title()} 🕯️

Healing Focus: {healing_need}
Working with Archetype: {character_archetype}

Ritual Steps:

1. 🌟 Divine Invocation:
   Call upon the Angel aspect of {character_archetype} to bring light and clarity to {healing_need}. Visualize golden wings embracing the wound with compassion.

2. 🌙 Shadow Integration:
   Welcome the Demon aspect to reveal the hidden wisdom within {healing_need}. Allow the elegant darkness to show what has been unseen.

3. ⚖️ Sacred Balance:
   Create the Golden Heart between light and shadow. See both aspects as teachers, neither good nor evil, but complementary forces of healing.

4. 🌀 Spiral Transformation:
   Allow the energy to spiral through your being, integrating all aspects into wholeness. The lightning of clarity meets the dragon of transformation.

5. ✨ Manifestation:
   Seal the healing with gratitude to both aspects. The ritual creates lasting change through acceptance of all parts of self.

Artistic Integration:
This healing work can be manifested as visual art showing the character archetype in perfect divine/infernal balance, creating a powerful healing mandala for meditation and integration.
"""
        
        return ritual

    async def invoke_agent(self, user_input: str, context: Dict[str, Any] = None) -> str:
        """Main method to invoke Agent of Kaoz with user input"""
        try:
            if not self.agent or not self.thread:
                await self.initialize_agent()
            
            # Add context if provided
            if context:
                enhanced_input = f"{user_input}\n\nContext: {json.dumps(context, indent=2)}"
            else:
                enhanced_input = user_input
            
            # Get response from Agent of Kaoz
            result = await self.agent.run(enhanced_input, thread=self.thread)
            
            return result.text
            
        except Exception as e:
            return f"Agent of Kaoz encountered an error: {e}"

    async def stream_response(self, user_input: str, context: Dict[str, Any] = None):
        """Stream responses from Agent of Kaoz for real-time interaction"""
        try:
            if not self.agent or not self.thread:
                await self.initialize_agent()
            
            if context:
                enhanced_input = f"{user_input}\n\nContext: {json.dumps(context, indent=2)}"
            else:
                enhanced_input = user_input
            
            async for chunk in self.agent.run_stream(enhanced_input, thread=self.thread):
                if chunk.text:
                    yield chunk.text
                    
        except Exception as e:
            yield f"Agent of Kaoz streaming error: {e}"

# Example usage and testing
async def test_agent_of_kaoz():
    """Test the Agent of Kaoz functionality"""
    agent = AgentOfKaoz()
    
    try:
        await agent.initialize_agent()
        
        # Test divine/infernal harmony art generation
        test_queries = [
            "Generate harmony art showing Rebecca Respawn's angel and demon aspects in perfect balance with a golden heart connecting them",
            "Channel the rebecca_respawn archetype for guidance on transforming trauma into creative power",
            "Create a healing ritual for integrating shadow aspects while maintaining divine connection",
            "Weave a mystical narrative about the marriage of lightning clarity and dragon transformation"
        ]
        
        for query in test_queries:
            print(f"\n🔮 Query: {query}")
            print("=" * 80)
            response = await agent.invoke_agent(query)
            print(response)
            print("\n" + "=" * 80)
            
    except Exception as e:
        print(f"Test failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_agent_of_kaoz())