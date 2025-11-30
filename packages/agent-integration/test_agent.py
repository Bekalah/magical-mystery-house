#!/usr/bin/env python3
"""
Test Agent of Kaoz Connection
Verify that Agent of Kaoz can generate divine/infernal harmony art
"""

import asyncio
import aiohttp
import json

async def test_agent_connection():
    """Test the Agent of Kaoz service connection"""
    base_url = "http://localhost:8000"
    
    print("🌟 Testing Agent of Kaoz Connection...")
    
    # Test health check
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(f"{base_url}/health") as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Health Check: {data}")
                else:
                    print(f"❌ Health Check Failed: {response.status}")
                    return
        except Exception as e:
            print(f"❌ Connection Failed: {e}")
            return
    
    # Test character activation (Rebecca Respawn)
    print("\n🔮 Testing Character Activation...")
    test_request = {
        "query": "Awaken Rebecca Respawn for cathedral exploration",
        "action_type": "character_activation", 
        "character": "rebecca_respawn",
        "context": {"location": "Rosslyn Chapel", "discovery": "apprentice_pillar"}
    }
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(f"{base_url}/invoke", json=test_request) as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Character Activation Response:")
                    print(f"📜 Response: {data['response'][:200]}...")
                    if data.get('art_prompt'):
                        print(f"🎨 Art Prompt Generated: {len(data['art_prompt'])} characters")
                        print(f"🎨 Art Preview: {data['art_prompt'][:150]}...")
                else:
                    error_text = await response.text()
                    print(f"❌ Character Activation Failed: {response.status} - {error_text}")
        except Exception as e:
            print(f"❌ Character Activation Error: {e}")
    
    # Test harmony art generation
    print("\n🎨 Testing Harmony Art Generation...")
    art_request = {
        "query": "Generate Heaven and Hell in perfect harmony",
        "action_type": "art_generation",
        "context": {"theme": "divine_infernal_balance"}
    }
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(f"{base_url}/invoke", json=art_request) as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Harmony Art Generated:")
                    print(f"🎨 Art Description: {data['response'][:300]}...")
                else:
                    error_text = await response.text()
                    print(f"❌ Art Generation Failed: {response.status} - {error_text}")
        except Exception as e:
            print(f"❌ Art Generation Error: {e}")
    
    # Test book reading
    print("\n📚 Testing Book Reading...")
    book_request = {
        "query": "What wisdom does this book offer for my journey?",
        "action_type": "book_reading",
        "context": {"title": "The Hearing Trumpet", "author": "Leonora Carrington"}
    }
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(f"{base_url}/invoke", json=book_request) as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Book Reading Response:")
                    print(f"📖 Mystical Interpretation: {data['response'][:200]}...")
                else:
                    error_text = await response.text()
                    print(f"❌ Book Reading Failed: {response.status} - {error_text}")
        except Exception as e:
            print(f"❌ Book Reading Error: {e}")
    
    print("\n🌟 Agent of Kaoz Testing Complete!")

if __name__ == "__main__":
    asyncio.run(test_agent_connection())