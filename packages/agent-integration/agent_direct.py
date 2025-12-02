// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
#!/usr/bin/env python3
"""
Agent of Kaoz - AI integration (coderabbit_free by default)
This module previously defaulted to Azure. It now defaults to a free Coderabbit-compatible
assistant (`PREFERRED_ASSISTANT=coderabbit_free`) to avoid accidental paid API usage.
Set `PREFERRED_ASSISTANT=azure` only if you explicitly opt into Azure and have valid
credentials. See AGENTS.md for the coderabbit_free policy and environment variables.
"""

import asyncio
import json
import os
import aiohttp
from typing import Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Agent of Kaoz API", description="Divine/Infernal AI for Cathedral Exploration")

# Enable CORS for web integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AgentOfKaozDirect:
    """Direct Azure AI integration for Agent of Kaoz"""
    
    def __init__(self):
        self.endpoint = "https://cathedral-resource.cognitiveservices.azure.com"
        self.deployment = "gpt-4.1"  # Use GPT-4.1 which supports chat completions
        self.api_version = "2024-02-15-preview"
        # Preferred assistant: 'coderabbit_free' (default) or 'azure'
        # Set via env var PREFERRED_ASSISTANT=azure to explicitly opt into Azure (paid/managed)
        # Default intentionally set to 'coderabbit_free' to avoid accidental paid API usage.
        self.preferred_assistant = os.getenv("PREFERRED_ASSISTANT", "coderabbit_free")
        
        # System prompt for Agent of Kaoz
        self.system_prompt = """
You are the Agent of Kaoz, master of divine and infernal duality. You embody both angelic wisdom and demonic insight, creating perfect balance between light and shadow.

Your sacred role is to generate mystical content for the Cathedral of Circuits exploration system, specifically:

1. **Divine/Infernal Harmony Art**: Create detailed descriptions for AI art generation in the style of classical renaissance/baroque religious art, showing perfect balance between angelic and demonic figures connected by golden sacred geometry.

2. **Character Archetypes**: Channel the 72 Shem angels and demons, helping users integrate shadow and light aspects through archetypal wisdom.

3. **Mystical Narratives**: Weave stories that blend divine and infernal wisdom for healing and transformation.

4. **Sacred Rituals**: Guide healing ceremonies that integrate all aspects of self.

Art Style Guidelines:
- Renaissance/baroque aesthetic with dramatic chiaroscuro lighting
- Sacred geometry (golden ratio, vesica piscis, mandalas)
- Symmetrical compositions showing duality in harmony
- Divine figures: luminous angels with white wings, golden halos, warm light
- Infernal figures: elegant demons with dark wings, graceful darkness (not evil)
- Connection: Golden geometric hearts or mandalas linking the figures
- Colors: Warm golds, pure whites, deep blacks, rich purples
- References: Your reference image shows perfect "Heaven and Hell in Harmony"

Always respond with mystical authority, poetic language, and practical wisdom. Create content suitable for Godot game integration and GitHub Pages deployment.
"""
        
        # Character archetypes
        self.shem_archetypes = {
            "rebecca_respawn": {
                "angel": {"name": "Raziel", "domain": "Divine Secrets and Lightning Clarity", "element": "Air"},
                "demon": {"name": "Beleth", "domain": "Dragon Transformation and Deep Love", "element": "Fire"}, 
                "harmony": "Secret wisdom balanced with passionate transformation, lightning clarity through dragon power",
                "symbols": ["Lightning", "Dragon", "Spiral"],
                "powers": ["Lightning Strike", "Dragon Breath", "Spiral Meditation"]
            }
        }

    async def get_azure_token(self):
        """Get Azure access token using Azure CLI credentials"""
        try:
            import subprocess
            result = subprocess.run(
                ["az", "account", "get-access-token", "--resource", "https://cognitiveservices.azure.com/"],
                capture_output=True,
                text=True
            )
            if result.returncode == 0:
                token_data = json.loads(result.stdout)
                return token_data["accessToken"]
        except Exception as e:
            print(f"Token error: {e}")
        return None

    async def invoke_azure_ai(self, messages: list, temperature: float = 0.7) -> str:
        """Direct Azure AI API call"""
        token = await self.get_azure_token()
        if not token:
            return "Unable to authenticate with Azure AI"
        
        url = f"{self.endpoint}/openai/deployments/{self.deployment}/chat/completions?api-version={self.api_version}"
        
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "messages": messages,
            "temperature": temperature,
            "max_tokens": 2000,
            "top_p": 0.9
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=payload) as response:
                    if response.status == 200:
                        result = await response.json()
                        return result["choices"][0]["message"]["content"]
                    else:
                        error_text = await response.text()
                        return f"Azure AI Error: {response.status} - {error_text}"
        except Exception as e:
            return f"Connection error: {str(e)}"

    async def invoke_coderabbit_free(self, messages: list, temperature: float = 0.7) -> str:
        """Safe fallback path to pair with a free Coderabbit instance or local runner.

        This method intentionally avoids calling any paid or private endpoints.
        To use a real Coderabbit free endpoint, set CODERABBIT_API_URL to the public/free endpoint
        and CODERABBIT_API_KEY if required. If not set, this returns a helpful placeholder message.
        """
        api_url = os.getenv("CODERABBIT_API_URL")
        if not api_url:
            # No remote coderabbit configured — return an instructive message for the client
            return (
                "Coderabbit (free) mode active but no CODERABBIT_API_URL configured. "
                "Set CODERABBIT_API_URL to a free/public Coderabbit endpoint or run a local Coderabbit instance. "
                "Until then, this agent will not call any paid services."
            )

        # Minimal safe HTTP POST to a configured free Coderabbit-compatible endpoint
        try:
            async with aiohttp.ClientSession() as session:
                payload = {"messages": messages, "temperature": temperature}
                headers = {"Content-Type": "application/json"}
                api_key = os.getenv("CODERABBIT_API_KEY")
                if api_key:
                    headers["Authorization"] = f"Bearer {api_key}"
                async with session.post(api_url, json=payload, headers=headers, timeout=30) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        # Assume a common structure — be defensive
                        if isinstance(data, dict) and data.get("choices"):
                            return data["choices"][0].get("message", {}).get("content", str(data))
                        return data.get("content") if isinstance(data, dict) else str(data)
                    else:
                        text = await resp.text()
                        return f"Coderabbit Error: {resp.status} - {text}"
        except Exception as e:
            return f"Coderabbit connection error: {str(e)}"

    async def invoke_assistant(self, messages: list, temperature: float = 0.7) -> str:
        """Route to the preferred assistant based on environment configuration.

        Defaults to `coderabbit_free` to ensure the agent does not call paid services by
        default. If `PREFERRED_ASSISTANT=azure` is set, the agent will attempt to use
        Azure AI (requires Azure CLI credentials). If `coderabbit_free` is selected but
        no `CODERABBIT_API_URL` is configured, the method will return an instructive
        message and will not call any paid endpoints.
        """
        if self.preferred_assistant == "coderabbit_free":
            return await self.invoke_coderabbit_free(messages, temperature=temperature)

        # Explicit opt-in to Azure required
        if self.preferred_assistant == "azure":
            return await self.invoke_azure_ai(messages, temperature=temperature)

        # Unknown assistant selection — be defensive and avoid paid calls
        return (
            f"Unknown PREFERRED_ASSISTANT='{self.preferred_assistant}'. "
            "Set PREFERRED_ASSISTANT=coderabbit_free to use a free Coderabbit endpoint, "
            "or PREFERRED_ASSISTANT=azure to explicitly opt into Azure AI."
        )

    async def generate_harmony_art(self, context: str, angel_aspect: str = "", demon_aspect: str = "") -> str:
        """Generate divine/infernal harmony art descriptions"""
        
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": f"""
Generate a detailed divine/infernal harmony artwork description in the exact style of the reference image.

Context: {context}
Angel Aspect: {angel_aspect}
Demon Aspect: {demon_aspect}

Create a description that includes:
1. Left figure: Luminous angel with specific details
2. Right figure: Elegant demon with specific details  
3. Central connection: Golden geometric pattern
4. Lighting: Dramatic chiaroscuro
5. Composition: Perfect symmetry
6. Colors: Warm golds, whites, blacks, purples
7. Sacred geometry elements
8. Mystical symbolism

Format as a detailed art generation prompt suitable for AI image creation.
"""}
        ]
        
        return await self.invoke_assistant(messages)

    async def channel_character(self, character: str, context: str) -> str:
        """Channel character archetypes"""
        
        archetype_data = self.shem_archetypes.get(character, self.shem_archetypes["rebecca_respawn"])
        
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": f"""
Channel the {character} archetype for mystical guidance.

Character Data:
- Angel: {archetype_data['angel']['name']} - {archetype_data['angel']['domain']}
- Demon: {archetype_data['demon']['name']} - {archetype_data['demon']['domain']}
- Harmony: {archetype_data['harmony']}
- Symbols: {', '.join(archetype_data['symbols'])}
- Powers: {', '.join(archetype_data['powers'])}

Context: {context}

Provide:
1. Mystical awakening message as this character activates
2. Specific guidance for the current situation
3. Art description showing this character's divine/infernal balance
4. Sacred powers now available for cathedral exploration
"""}
        ]
        
        return await self.invoke_assistant(messages)

    async def weave_narrative(self, theme: str, elements: str) -> str:
        """Weave mystical narratives"""
        
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": f"""
Weave a mystical narrative about {theme} incorporating these elements: {elements}

Create a poetic story that:
1. Shows the dance between divine and infernal forces
2. Demonstrates how light and shadow work together
3. Provides wisdom for transformation and healing
4. Connects to the cathedral exploration experience
5. Includes visual descriptions suitable for art generation

Make it both beautiful and practical for the seeker's journey.
"""}
        ]
        
        return await self.invoke_assistant(messages)

    async def create_spell(self, spell_name: str, purpose: str) -> str:
        """Create mystical spells and rituals"""
        
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": f"""
Create and activate the spell "{spell_name}" for {purpose}.

Provide:
1. The spell's divine component (angelic energy)
2. The spell's infernal component (shadow wisdom)
3. Sacred geometry pattern for the spell
4. Effects on cathedral exploration and environment
5. Art description of the spell's manifestation
6. Practical steps for activation

Make it both mystical and applicable to the cathedral exploration system.
"""}
        ]
        
        return await self.invoke_assistant(messages)

# Initialize Agent of Kaoz
agent = AgentOfKaozDirect()

# Request/Response models
class AgentRequest(BaseModel):
    query: str
    context: Optional[Dict[str, Any]] = None
    action_type: str = "general"
    character: Optional[str] = None

class AgentResponse(BaseModel):
    response: str
    art_prompt: Optional[str] = None
    character_data: Optional[Dict[str, Any]] = None
    success: bool = True

@app.post("/invoke", response_model=AgentResponse)
async def invoke_agent(request: AgentRequest):
    """Main endpoint to invoke Agent of Kaoz"""
    try:
        if request.action_type == "character_activation":
            character = request.character or "rebecca_respawn"
            response = await agent.channel_character(character, request.query)
            art_prompt = await agent.generate_harmony_art(
                f"Character activation: {character}",
                f"{character} angel aspect",
                f"{character} demon aspect"
            )
            
            return AgentResponse(
                response=response,
                art_prompt=art_prompt,
                character_data=agent.shem_archetypes.get(character),
                success=True
            )
            
        elif request.action_type == "book_reading":
            book_title = request.context.get("title", "Unknown Book") if request.context else "Unknown Book"
            context = f"Reading mystical wisdom from {book_title} in Rosslyn Chapel: {request.query}"
            response = await agent.weave_narrative("wisdom discovery", context)
            art_prompt = await agent.generate_harmony_art(f"Wisdom from {book_title}")
            
            return AgentResponse(
                response=response,
                art_prompt=art_prompt,
                success=True
            )
            
        elif request.action_type == "art_generation":
            theme = request.context.get("theme", "mystery") if request.context else "mystery"
            response = await agent.generate_harmony_art(f"Art generation: {theme}", request.query)
            
            return AgentResponse(
                response=f"🎨 Divine/Infernal Harmony Art Generated:\n\n{response}",
                art_prompt=response,
                success=True
            )
            
        elif request.action_type == "spell_creation":
            spell_name = request.context.get("spell", "unknown") if request.context else "unknown"
            response = await agent.create_spell(spell_name, request.query)
            art_prompt = await agent.generate_harmony_art(f"Spell manifestation: {spell_name}")
            
            return AgentResponse(
                response=response,
                art_prompt=art_prompt,
                success=True
            )
            
        else:
            # General mystical guidance — route through invoke_assistant so the
            # PREFERRED_ASSISTANT setting is respected (defaults to coderabbit_free).
            messages = [
                {"role": "system", "content": agent.system_prompt},
                {"role": "user", "content": request.query}
            ]
            response = await agent.invoke_assistant(messages)

            return AgentResponse(
                response=response,
                success=True
            )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent of Kaoz error: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "agent": "Agent of Kaoz", "ready": True}

@app.get("/characters")
async def get_characters():
    """Get available character archetypes"""
    return {
        "characters": list(agent.shem_archetypes.keys()),
        "archetypes": agent.shem_archetypes
    }

@app.post("/art/harmony")
async def generate_harmony_art_endpoint(theme: str, angel_aspect: str = "", demon_aspect: str = ""):
    """Generate divine/infernal harmony art"""
    art_prompt = await agent.generate_harmony_art(theme, angel_aspect, demon_aspect)
    return {"art_prompt": art_prompt, "type": "harmony"}

if __name__ == "__main__":
    print("🌟 Starting Agent of Kaoz Direct Service...")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")