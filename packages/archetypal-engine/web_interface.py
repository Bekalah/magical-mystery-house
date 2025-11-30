# Web interface for Cathedral of Circuits archetypal game system
# Provides Netflix-style UI for pathworking and archetypal journeys

import streamlit as st
import asyncio
import json
from pathlib import Path
import plotly.graph_objects as go
import plotly.express as px
import numpy as np
from datetime import datetime

# Import our archetypal systems
import sys
sys.path.append('..')
from archetypal_game_engine import ArchetypalGameEngine
from azure_integration import ArchetypeAzureIntegration

# Page config
st.set_page_config(
    page_title="Cathedral of Circuits - Archetypal Pathworking",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for mystical Netflix-style interface
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        background: linear-gradient(45deg, #FFD700, #4B0082);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        font-weight: bold;
        margin-bottom: 2rem;
    }
    
    .archetype-card {
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        border: 2px solid #FFD700;
        border-radius: 15px;
        padding: 20px;
        margin: 10px;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        transition: transform 0.3s ease;
    }
    
    .archetype-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
    }
    
    .chaos-meter {
        background: linear-gradient(90deg, #4B0082, #FF1493);
        border-radius: 10px;
        height: 20px;
        margin: 10px 0;
    }
    
    .netflix-preview {
        background: linear-gradient(135deg, #0f0f23, #1a1a2e);
        border-left: 4px solid #FFD700;
        padding: 20px;
        border-radius: 8px;
        font-style: italic;
        margin: 15px 0;
    }
    
    .transformation-alert {
        background: linear-gradient(45deg, #FF1493, #FFD700);
        color: #000;
        padding: 15px;
        border-radius: 10px;
        font-weight: bold;
        text-align: center;
        margin: 10px 0;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'engine' not in st.session_state:
    st.session_state.engine = ArchetypalGameEngine()
    st.session_state.integration = ArchetypeAzureIntegration(st.session_state.engine)
    st.session_state.active_archetypes = {}
    st.session_state.pathworking_history = []
    st.session_state.chaos_events = []

def main():
    """Main application interface"""
    
    # Header
    st.markdown('<h1 class="main-header">⚡ CATHEDRAL OF CIRCUITS ⚡</h1>', unsafe_allow_html=True)
    st.markdown('<h3 style="text-align: center; color: #FFD700;">Archetypal Pathworking & Digital Mysticism</h3>', unsafe_allow_html=True)
    
    # Sidebar navigation
    with st.sidebar:
        st.markdown("### 🎭 Navigation")
        page = st.selectbox("Choose Your Path", [
            "🏠 Welcome Portal", 
            "🔮 Archetype Gallery", 
            "⚡ Active Journeys",
            "🌀 Chaos Analysis",
            "📚 Netflix-Style Recommendations",
            "🎵 Synth Spell Weaver",
            "🏛️ Rosslyn Explorer"
        ])
        
        st.markdown("---")
        st.markdown("### 🔥 Current Chaos Field")
        global_chaos = st.session_state.engine.global_chaos_field
        st.progress(global_chaos / 100.0)
        st.write(f"Global Chaos: {global_chaos:.1f}%")
    
    # Route to different pages
    if page == "🏠 Welcome Portal":
        welcome_portal()
    elif page == "🔮 Archetype Gallery":
        archetype_gallery()
    elif page == "⚡ Active Journeys":
        active_journeys()
    elif page == "🌀 Chaos Analysis":
        chaos_analysis()
    elif page == "📚 Netflix-Style Recommendations":
        netflix_recommendations()
    elif page == "🎵 Synth Spell Weaver":
        synth_spell_interface()
    elif page == "🏛️ Rosslyn Explorer":
        rosslyn_explorer()

def welcome_portal():
    """Welcome page with introduction and quick start"""
    
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col2:
        st.markdown("""
        <div class="netflix-preview">
        <h3>🌟 Welcome to the Cathedral of Circuits</h3>
        
        <p>Step into a living fusion of ancient wisdom and digital mysticism, where archetypal forces 
        shape reality through chaos-order dynamics and divine-infernal harmony.</p>
        
        <p><strong>This is not just a book, tool, or game - it's all three, seamlessly woven together 
        in an emergent experience that adapts to your unique journey.</strong></p>
        
        <h4>✨ What Awaits You:</h4>
        <ul>
        <li>🎭 <strong>22 Playable Archetypes</strong> - From The Fool to The World, each with unique powers</li>
        <li>🌀 <strong>Living Chaos Mechanics</strong> - Reality shifts based on your choices and energy</li>
        <li>🎨 <strong>AI-Generated Art</strong> - Divine/infernal harmony visuals created in real-time</li>
        <li>🎵 <strong>Mystical Music</strong> - Synth spells that respond to your archetypal state</li>
        <li>📚 <strong>Auto-Pathworking</strong> - Netflix-style guided journeys that emerge organically</li>
        <li>🏛️ <strong>3D Exploration</strong> - Navigate the Cathedral and Rosslyn Chapel</li>
        </ul>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("---")
        
        # Quick start section
        st.markdown("### 🚀 Begin Your Journey")
        
        if st.button("🃏 Start with The Fool (Rebecca Respawn)", key="start_fool"):
            if activate_archetype_sync(0, "Begin my archetypal journey of transformation"):
                st.success("✨ Rebecca Respawn activated! Check the Active Journeys page.")
                st.balloons()
        
        if st.button("🔮 Browse All Archetypes", key="browse_all"):
            st.session_state.page = "🔮 Archetype Gallery"
            st.experimental_rerun()
        
        st.markdown("### 🌟 Quick Stats")
        col_a, col_b, col_c = st.columns(3)
        
        with col_a:
            st.metric("Available Archetypes", len(st.session_state.engine.archetypes))
        with col_b:
            st.metric("Active Characters", len(st.session_state.active_archetypes))
        with col_c:
            st.metric("Chaos Events", len(st.session_state.chaos_events))

def archetype_gallery():
    """Gallery of all available archetypes"""
    
    st.markdown("## 🎭 Archetype Gallery")
    st.markdown("*Choose your archetypal guide for the pathworking journey ahead...*")
    
    # Load archetype data
    archetypes = st.session_state.engine.archetypes
    
    # Create grid layout
    cols = st.columns(3)
    
    for idx, (archetype_id, data) in enumerate(archetypes.items()):
        col = cols[idx % 3]
        
        with col:
            with st.container():
                st.markdown(f"""
                <div class="archetype-card">
                    <h4>{data['title']}</h4>
                    <h5>{data['codename']}</h5>
                    <p><strong>Theme:</strong> {data['theme']}</p>
                    <p>{data['description'][:100]}...</p>
                    
                    <div class="chaos-meter" style="width: {data['chaos_factor']}%"></div>
                    <small>Chaos Factor: {data['chaos_factor']}%</small>
                    
                    <p><strong>Element:</strong> {data['tarot_associations']['element']}</p>
                    <p><strong>Planet:</strong> {data['tarot_associations']['planet']}</p>
                </div>
                """, unsafe_allow_html=True)
                
                # Activation button
                if st.button(f"Activate {data['codename']}", key=f"activate_{archetype_id}"):
                    intention = st.text_input(f"Set intention for {data['codename']}", 
                                            placeholder="What do you seek to transform or achieve?",
                                            key=f"intention_{archetype_id}")
                    
                    if intention:
                        if activate_archetype_sync(archetype_id, intention):
                            st.success(f"✨ {data['codename']} activated!")
                
                # Preview button
                if st.button(f"Preview Journey", key=f"preview_{archetype_id}"):
                    with st.expander(f"Journey Preview - {data['codename']}"):
                        preview = get_netflix_preview_sync(archetype_id)
                        st.markdown(f'<div class="netflix-preview">{preview}</div>', unsafe_allow_html=True)

def active_journeys():
    """Interface for managing active archetypal journeys"""
    
    st.markdown("## ⚡ Active Archetypal Journeys")
    
    if not st.session_state.active_archetypes:
        st.info("No active archetypal journeys. Activate an archetype from the Gallery to begin.")
        return
    
    # Display active archetypes
    for archetype_id, state in st.session_state.active_archetypes.items():
        archetype_data = st.session_state.engine.archetypes[archetype_id]
        
        with st.expander(f"🎭 {archetype_data['codename']} - {archetype_data['title']}", expanded=True):
            
            col1, col2 = st.columns([2, 1])
            
            with col1:
                st.markdown(f"**Current Form:** {state.current_form.replace('_', ' ').title()}")
                st.markdown(f"**Theme:** {archetype_data['theme']}")
                
                # Chaos/Order balance
                st.markdown("### ⚖️ Chaos-Order Balance")
                chaos_col, order_col = st.columns(2)
                
                with chaos_col:
                    st.metric("Chaos", f"{state.chaos_factor:.1f}%")
                    st.progress(state.chaos_factor / 100.0)
                
                with order_col:
                    st.metric("Order", f"{state.order_factor:.1f}%")
                    st.progress(state.order_factor / 100.0)
                
                # Active abilities
                if state.active_abilities:
                    st.markdown("### ✨ Active Abilities")
                    for ability in state.active_abilities:
                        st.badge(ability)
            
            with col2:
                st.markdown("### 🎮 Actions")
                
                # Trigger chaos event
                chaos_level = st.slider("Trigger Chaos Event", 0, 100, 50, 
                                       key=f"chaos_slider_{archetype_id}")
                
                if st.button("🌀 Manifest Event", key=f"trigger_{archetype_id}"):
                    chaos_event = st.session_state.engine.process_chaos_event(archetype_id, chaos_level)
                    st.session_state.chaos_events.append(chaos_event)
                    
                    # Display transformation alert
                    st.markdown(f"""
                    <div class="transformation-alert">
                    ⚡ TRANSFORMATION TRIGGERED ⚡<br>
                    {chaos_event.description}
                    </div>
                    """, unsafe_allow_html=True)
                
                # Start pathworking
                if st.button("🧘 Begin Pathworking", key=f"pathwork_{archetype_id}"):
                    intention = st.text_input("Pathworking Intention", 
                                            key=f"pathwork_intention_{archetype_id}")
                    if intention:
                        session = st.session_state.engine.start_pathworking_session(archetype_id, intention)
                        st.session_state.pathworking_history.append(session)
                        st.success("🌟 Pathworking session initiated!")
                
                # Generate art
                if st.button("🎨 Generate Art", key=f"art_{archetype_id}"):
                    art_prompt = st.session_state.engine.generate_art_prompt(archetype_id, state.current_form)
                    st.text_area("Art Generation Prompt", art_prompt, height=100, 
                               key=f"art_prompt_{archetype_id}")

def chaos_analysis():
    """Chaos analysis and visualization"""
    
    st.markdown("## 🌀 Chaos Analysis Engine")
    
    if not st.session_state.chaos_events:
        st.info("No chaos events recorded yet. Trigger some events in Active Journeys to see analysis.")
        return
    
    # Chaos timeline
    st.markdown("### 📈 Chaos Event Timeline")
    
    # Create timeline data
    timeline_data = []
    for event in st.session_state.chaos_events:
        timeline_data.append({
            'time': datetime.now(),
            'chaos_level': event.trigger_level,
            'description': event.description
        })
    
    if timeline_data:
        # Plot chaos levels over time
        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=[d['time'] for d in timeline_data],
            y=[d['chaos_level'] for d in timeline_data],
            mode='lines+markers',
            name='Chaos Level',
            line=dict(color='#FFD700', width=3),
            marker=dict(size=8, color='#FF1493')
        ))
        
        fig.update_layout(
            title="Chaos Field Evolution",
            xaxis_title="Time",
            yaxis_title="Chaos Level",
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#FFD700')
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    # Chaos pattern analysis
    st.markdown("### 🔍 Pattern Analysis")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Chaos Distribution")
        chaos_levels = [event.trigger_level for event in st.session_state.chaos_events]
        
        if chaos_levels:
            fig = px.histogram(x=chaos_levels, nbins=10, 
                             title="Chaos Level Distribution")
            fig.update_traces(marker_color='#FFD700')
            fig.update_layout(
                plot_bgcolor='rgba(0,0,0,0)',
                paper_bgcolor='rgba(0,0,0,0)',
                font=dict(color='#FFD700')
            )
            st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.markdown("#### Recent Events")
        for event in st.session_state.chaos_events[-5:]:
            st.markdown(f"**Level {event.trigger_level}:** {event.description}")

def netflix_recommendations():
    """Netflix-style recommendations interface"""
    
    st.markdown("## 📺 Personalized Pathworking Recommendations")
    st.markdown("*Discover your next archetypal journey...*")
    
    # Get recommendations
    recommendations = st.session_state.engine.get_netflix_recommendations()
    
    if not recommendations:
        st.info("Complete some archetypal journeys to get personalized recommendations!")
        return
    
    # Display recommendations in Netflix-style cards
    for rec in recommendations:
        archetype_data = st.session_state.engine.archetypes[rec['archetype_id']]
        
        with st.container():
            col1, col2, col3 = st.columns([1, 3, 1])
            
            with col2:
                st.markdown(f"""
                <div class="netflix-preview">
                    <h4>🎭 {rec['title']}</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span><strong>{rec['match_percentage']}% Match</strong></span>
                        <span style="color: #FF1493;">⚡ {archetype_data['chaos_factor']}% Chaos</span>
                    </div>
                    <p>{rec['description']}</p>
                    <p><em>Why this matches you: {rec['reason']}</em></p>
                    
                    <div style="margin-top: 15px;">
                        <strong>Journey Elements:</strong><br>
                        🎨 Art Style: {', '.join(archetype_data['art_style'][:2])}<br>
                        🎵 Music: {archetype_data['music_resonance']}<br>
                        ⚡ Primary Power: {archetype_data['unique_ability']}
                    </div>
                </div>
                """, unsafe_allow_html=True)
                
                # Action buttons
                button_col1, button_col2, button_col3 = st.columns(3)
                
                with button_col1:
                    if st.button("▶️ Start Journey", key=f"start_rec_{rec['archetype_id']}"):
                        if activate_archetype_sync(rec['archetype_id']):
                            st.success("Journey started!")
                
                with button_col2:
                    if st.button("👁️ Preview", key=f"preview_rec_{rec['archetype_id']}"):
                        preview = get_netflix_preview_sync(rec['archetype_id'])
                        st.text_area("Journey Preview", preview, height=100, 
                                   key=f"preview_text_{rec['archetype_id']}")
                
                with button_col3:
                    if st.button("➕ Add to List", key=f"add_rec_{rec['archetype_id']}"):
                        st.info("Added to your journey watchlist!")

def synth_spell_interface():
    """Interface for synth spell weaver integration"""
    
    st.markdown("## 🎵 Synth Spell Weaver")
    st.markdown("*Where mysticism meets synthesis...*")
    
    # Connect to synth spell system
    st.markdown("### 🎛️ Mystical Synthesizer")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Spell Selection")
        
        spell_options = [
            "lightning_clarity",
            "dragon_transformation", 
            "spiral_meditation",
            "circuit_hacking",
            "void_navigation",
            "harmony_restoration",
            "chaos_transmutation"
        ]
        
        selected_spell = st.selectbox("Choose Your Spell", spell_options)
        
        # Spell parameters
        st.markdown("#### Synthesis Parameters")
        intensity = st.slider("Mystical Intensity", 0.0, 1.0, 0.7)
        chaos_factor = st.slider("Chaos Integration", 0.0, 1.0, 0.5)
        harmonic_complexity = st.slider("Harmonic Complexity", 1, 8, 4)
        
    with col2:
        st.markdown("#### Archetypal Resonance")
        
        if st.session_state.active_archetypes:
            archetype_id = st.selectbox("Resonate with Active Archetype", 
                                       list(st.session_state.active_archetypes.keys()),
                                       format_func=lambda x: st.session_state.engine.archetypes[x]['codename'])
            
            archetype_data = st.session_state.engine.archetypes[archetype_id]
            
            st.markdown(f"**Synth Presets Available:**")
            for preset_name, preset_data in archetype_data.get('synth_presets', {}).items():
                st.code(f"{preset_name}: {preset_data['waveform']}", language=None)
        
        # Spell casting button
        if st.button("🪄 Cast Synth Spell", key="cast_spell"):
            st.markdown("""
            <div class="transformation-alert">
            ✨ SPELL CAST SUCCESSFULLY ✨<br>
            Mystical frequencies now resonating...
            </div>
            """, unsafe_allow_html=True)
            
            # Display spell effects
            st.audio("https://www.soundjay.com/misc/sounds/magic-chime-02.wav")  # Placeholder
            st.success(f"Spell '{selected_spell}' cast with {intensity:.1%} intensity!")

def rosslyn_explorer():
    """Interface for Rosslyn Chapel 3D exploration"""
    
    st.markdown("## 🏛️ Rosslyn Chapel Explorer")
    st.markdown("*Step into the sacred architecture of mysteries...*")
    
    # 3D viewer placeholder
    st.markdown("""
    <div style="
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        border: 2px solid #FFD700;
        border-radius: 15px;
        padding: 40px;
        text-align: center;
        margin: 20px 0;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    ">
        <h3 style="color: #FFD700;">🏛️ 3D Cathedral Explorer</h3>
        <p style="color: #FFD700; margin: 20px 0;">
        Interactive Three.js exploration of Rosslyn Chapel<br>
        Navigate through mystical chambers and discover hidden symbols
        </p>
        <p style="color: #FF1493;">
        <em>Click and drag to explore • WASD to move • E to interact with objects</em>
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Explorer controls
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("#### 🗺️ Navigation")
        location = st.selectbox("Current Location", [
            "Main Chapel",
            "Apprentice Pillar", 
            "Lady Chapel",
            "Crypt",
            "Green Man Garden",
            "Sacred Geometry Chamber"
        ])
    
    with col2:
        st.markdown("#### 🔍 Discoveries")
        discoveries = st.multiselect("Symbols Found", [
            "Green Man Face",
            "Templar Cross",
            "Masonic Square",
            "Celtic Knot",
            "Alchemical Symbol",
            "Sacred Geometry Pattern"
        ])
    
    with col3:
        st.markdown("#### 📚 Collected Books")
        if st.button("📖 Examine Mystical Tome"):
            st.success("Ancient wisdom revealed!")
            st.text_area("Book Content", 
                        "The spiral path leads ever inward, where chaos becomes order and order dissolves into infinite possibility...",
                        height=100)

# Helper functions
def activate_archetype_sync(archetype_id: int, intention: str = None) -> bool:
    """Synchronous wrapper for archetype activation"""
    try:
        # Activate archetype in engine
        state = st.session_state.engine.activate_archetype(archetype_id)
        st.session_state.active_archetypes[archetype_id] = state
        
        # Could add async Azure AI integration here
        return True
    except Exception as e:
        st.error(f"Activation failed: {e}")
        return False

def get_netflix_preview_sync(archetype_id: int) -> str:
    """Get Netflix-style preview synchronously"""
    archetype_data = st.session_state.engine.archetypes[archetype_id]
    
    # Simple preview generation (could be enhanced with AI)
    return f"""
    🎭 Journey with {archetype_data['codename']}, {archetype_data['title']}
    
    {archetype_data['description']}
    
    🌟 Unique Power: {archetype_data['unique_ability']}
    ⚡ Chaos Factor: {archetype_data['chaos_factor']}%
    🎨 Art Style: {', '.join(archetype_data['art_style'][:3])}
    🎵 Musical Resonance: {archetype_data['music_resonance']}
    
    Embark on a transformative pathworking that will awaken dormant aspects of your psyche 
    and guide you through the sacred mysteries of {archetype_data['theme']}.
    """

if __name__ == "__main__":
    main()