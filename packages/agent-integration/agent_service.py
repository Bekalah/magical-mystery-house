// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
// Azure dependencies removed - free/open source only
// This is a healing space, completely free and open
#!/usr/bin/env python3
"""
Agent of Kaoz Web Service
FastAPI service that connects the Rosslyn Cathedral explorer to Agent of Kaoz
Provides real Azure AI responses for mystical content generation
"""

import asyncio
import json
import os
from typing import Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from agent_of_kaoz import AgentOfKaoz

app = FastAPI(title="Agent of Kaoz API", description="Divine/Infernal AI for Cathedral Exploration")

# Enable CORS for web integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Agent of Kaoz
agent_of_kaoz = AgentOfKaoz()

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

@app.on_event("startup")
async def startup_event():
    """Initialize Agent of Kaoz on startup"""
    try:
        await agent_of_kaoz.initialize_agent()
        print("🌟 Agent of Kaoz service started successfully!")
    except Exception as e:
        print(f"❌ Failed to start Agent of Kaoz: {e}")

@app.post("/invoke", response_model=AgentResponse)
async def invoke_agent(request: AgentRequest):
    """Main endpoint to invoke Agent of Kaoz"""
    try:
        # Route to specific handlers based on action type
        if request.action_type == "character_activation":
            return await handle_character_activation(request)
        elif request.action_type == "book_reading":
            return await handle_book_reading(request)
        elif request.action_type == "art_generation":
            return await handle_art_generation(request)
        elif request.action_type == "spell_creation":
            return await handle_spell_creation(request)
        elif request.action_type == "harmony_art":
            return await handle_harmony_art(request)
        else:
            return await handle_general_query(request)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent of Kaoz error: {str(e)}")

async def handle_character_activation(request: AgentRequest) -> AgentResponse:
    """Handle character activation requests"""
    character = request.character or "rebecca_respawn"
    
    query = f"""
Activate the {character} archetype for cathedral exploration. Generate:
1. A mystical welcome message as the character awakens
2. Art description for divine/infernal harmony showing this character's dual nature
3. Specific powers and abilities this character brings to the exploration
4. Sacred guidance for the user's journey

Context: {json.dumps(request.context or {}, indent=2)}
"""
    
    response = await agent_of_kaoz.invoke_agent(query)
    
    # Generate harmony art for the character
    art_prompt = agent_of_kaoz.generate_harmony_art(
        "balance",
        f"{character} angel aspect",
        f"{character} demon aspect", 
        "character activation in cathedral"
    )
    
    return AgentResponse(
        response=response,
        art_prompt=art_prompt,
        character_data=agent_of_kaoz.shem_archetypes.get(character.lower()),
        success=True
    )

async def handle_book_reading(request: AgentRequest) -> AgentResponse:
    """Handle book reading with mystical interpretation"""
    book_title = request.context.get("title", "Unknown Book") if request.context else "Unknown Book"
    
    query = f"""
Channel mystical wisdom from the book "{book_title}" discovered in Rosslyn Chapel. Provide:
1. The deeper esoteric meaning of this book's teachings
2. How it connects to the divine/infernal balance
3. Practical wisdom for the seeker's journey
4. Art description showing the book's essence as divine/infernal harmony

Book context: {json.dumps(request.context or {}, indent=2)}
User query: {request.query}
"""
    
    response = await agent_of_kaoz.invoke_agent(query)
    
    # Generate art based on the book's theme
    art_prompt = agent_of_kaoz.generate_harmony_art(
        "wisdom",
        "divine knowledge and clarity",
        "hidden mysteries and depth",
        f"wisdom from {book_title}"
    )
    
    return AgentResponse(
        response=response,
        art_prompt=art_prompt,
        success=True
    )

async def handle_art_generation(request: AgentRequest) -> AgentResponse:
    """Handle pure art generation requests"""
    art_theme = request.context.get("theme", "mystery") if request.context else "mystery"
    
    query = f"""
Generate divine/infernal harmony artwork for the theme "{art_theme}". Create:
1. Detailed artistic description in the style of your reference image
2. Sacred geometric elements to include
3. Mystical symbolism and meaning
4. Color palette and lighting instructions

Theme: {art_theme}
Context: {json.dumps(request.context or {}, indent=2)}
"""
    
    response = await agent_of_kaoz.invoke_agent(query)
    
    # Generate specific art prompt
    art_prompt = agent_of_kaoz.generate_harmony_art(
        "transformation",
        "divine inspiration",
        "mystical wisdom",
        art_theme
    )
    
    return AgentResponse(
        response=response,
        art_prompt=art_prompt,
        success=True
    )

async def handle_spell_creation(request: AgentRequest) -> AgentResponse:
    """Handle spell/ritual creation"""
    spell_name = request.context.get("spell", "unknown") if request.context else "unknown"
    
    query = f"""
Create and activate the mystical spell "{spell_name}" for cathedral exploration. Provide:
1. The spell's divine and infernal components
2. Sacred geometry pattern for the spell
3. Effects on the cathedral environment and exploration
4. Art description showing the spell's manifestation as divine/infernal balance

Spell: {spell_name}
Context: {json.dumps(request.context or {}, indent=2)}
"""
    
    response = await agent_of_kaoz.invoke_agent(query)
    
    # Generate spell manifestation art
    art_prompt = agent_of_kaoz.generate_harmony_art(
        "unity",
        "divine power activation",
        "shadow magic integration",
        f"spell manifestation: {spell_name}"
    )
    
    return AgentResponse(
        response=response,
        art_prompt=art_prompt,
        success=True
    )

async def handle_harmony_art(request: AgentRequest) -> AgentResponse:
    """Handle requests specifically for harmony art like your reference image"""
    
    query = f"""
Create a divine/infernal harmony artwork exactly like the reference image style. Generate:
1. Detailed description of angelic figure (left side)
2. Detailed description of demonic figure (right side)  
3. Golden geometric heart connecting them
4. Perfect symmetrical composition
5. Color harmony and lighting specifications

Request: {request.query}
Context: {json.dumps(request.context or {}, indent=2)}
"""
    
    response = await agent_of_kaoz.invoke_agent(query)
    
    # Generate the exact harmony art style
    art_prompt = agent_of_kaoz.generate_harmony_art(
        "balance",
        "luminous angel with white wings and golden halo",
        "elegant demon with dark wings and graceful presence",
        "Heaven and Hell in perfect harmony"
    )
    
    return AgentResponse(
        response=response,
        art_prompt=art_prompt,
        success=True
    )

async def handle_general_query(request: AgentRequest) -> AgentResponse:
    """Handle general queries to Agent of Kaoz"""
    response = await agent_of_kaoz.invoke_agent(request.query, request.context)
    
    return AgentResponse(
        response=response,
        success=True
    )

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "agent": "Agent of Kaoz", "ready": True}

@app.get("/characters")
async def get_characters():
    """Get available character archetypes"""
    return {
        "characters": list(agent_of_kaoz.shem_archetypes.keys()),
        "archetypes": agent_of_kaoz.shem_archetypes
    }

@app.post("/art/divine")
async def generate_divine_art(archetype: str, context: str = "", style: str = ""):
    """Generate divine art descriptions"""
    art_prompt = agent_of_kaoz.generate_divine_art(archetype, context, style)
    return {"art_prompt": art_prompt, "type": "divine"}

@app.post("/art/infernal")
async def generate_infernal_art(archetype: str, context: str = "", style: str = ""):
    """Generate infernal art descriptions"""
    art_prompt = agent_of_kaoz.generate_infernal_art(archetype, context, style)
    return {"art_prompt": art_prompt, "type": "infernal"}

@app.post("/art/harmony")
async def generate_harmony_art(duality_type: str, angel_aspect: str = "", demon_aspect: str = "", context: str = ""):
    """Generate divine/infernal harmony art like your reference image"""
    art_prompt = agent_of_kaoz.generate_harmony_art(duality_type, angel_aspect, demon_aspect, context)
    return {"art_prompt": art_prompt, "type": "harmony"}

if __name__ == "__main__":
    # Run the service
    print("🌟 Starting Agent of Kaoz Web Service...")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")