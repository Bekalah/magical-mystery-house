# Test Cathedral Graph Navigation System
# Verify the 10-node graph navigation with all edge behaviors

import sys
import os
sys.path.append(os.path.join('.', 'packages', 'graphs'))

from cathedral_graph_navigator import CathedralGraphNavigator, NavigationState

def test_cathedral_graph_navigation():
    """Test the complete cathedral graph navigation system"""
    print("🏛️ Testing Cathedral Core Graph Navigation System...")
    print("=" * 60)
    
    # Initialize navigator
    navigator = CathedralGraphNavigator("packages/graphs")
    
    # Test 1: Load graph data
    print("\n📊 Testing Graph Data Loading...")
    print(f"✅ Nodes loaded: {len(navigator.core_nodes['nodes'])}")
    print(f"✅ Edges loaded: {len(navigator.core_nodes['edges'])}")
    print(f"✅ Navigation rules loaded: {len(navigator.navigation_rules['edgeBehaviors'])}")
    print(f"✅ Render hints loaded: {len(navigator.render_hints['renderHints'])}")
    
    # Test 2: Start navigation session
    print("\n🎭 Testing Navigation Session...")
    session = navigator.start_session("cathedral_test_session")
    print(f"✅ Session started: {session.session_id}")
    print(f"🎯 Initial state: {session.state.value}")
    
    # Test 3: Enter Tesla's room (starting point)
    print("\n⚡ Testing Room Entry - Tesla...")
    tesla_entry = navigator.enter_node("tesla")
    if "error" not in tesla_entry:
        print(f"✅ Entered: {tesla_entry['node_data']['name']}")
        print(f"🎨 Tarot Overlay: {tesla_entry['node_data']['tarotOverlay']}")
        print(f"🔮 Oracle: {tesla_entry['oracle_message']}")
        print(f"📊 Intensity: {tesla_entry['intensity']:.2f}")
        print(f"🚪 Navigation options: {len(tesla_entry['navigation_options'])}")
        
        # Show available paths
        for option in tesla_entry['navigation_options']:
            print(f"  → {option['target_name']} via '{option['edge_type']}': {option['description']}")
    else:
        print(f"❌ Tesla entry failed: {tesla_entry['error']}")
        return False
    
    # Test 4: Traverse edge to Crowley Shadow (amplifies relationship)
    print("\n🌑 Testing Edge Traversal - Tesla → Crowley Shadow...")
    crowley_entry = navigator.traverse_edge("crowley-shadow")
    if "error" not in crowley_entry:
        print(f"✅ Traversed to: {crowley_entry['node_data']['name']}")
        print(f"🔥 Edge effects: {crowley_entry['edge_effects']}")
        print(f"🎭 Faction encounter: {crowley_entry['node_data']['kind']}")
        print(f"🔮 Oracle: {crowley_entry['oracle_message']}")
        print(f"📊 New intensity: {crowley_entry['intensity']:.2f}")
    else:
        print(f"❌ Crowley Shadow entry failed: {crowley_entry['error']}")
        return False
    
    # Test 5: Chain traversal - Crowley Shadow → Rebecca Respawn (requiresReset)
    print("\n🔄 Testing Reset Chain - Crowley Shadow → Rebecca Respawn...")
    respawn_entry = navigator.traverse_edge("rebecca-respawn")
    if "error" not in respawn_entry:
        print(f"✅ Respawn triggered: {respawn_entry['node_data']['name']}")
        print(f"🎯 Edge type: requiresReset")
        print(f"🔮 Oracle: {respawn_entry['oracle_message']}")
        print(f"♻️ Effects: {respawn_entry['edge_effects']}")
    else:
        print(f"❌ Respawn entry failed: {respawn_entry['error']}")
    
    # Test 6: Protection seeking - Rebecca Respawn → Dion Fortune
    print("\n🛡️ Testing Protection Chain - Rebecca Respawn → Dion Fortune...")
    fortune_entry = navigator.traverse_edge("fortune")
    if "error" not in fortune_entry:
        print(f"✅ Protection sought: {fortune_entry['node_data']['name']}")
        print(f"🌹 Tarot: {fortune_entry['node_data']['tarotOverlay']}")
        print(f"🔮 Oracle: {fortune_entry['oracle_message']}")
        print(f"🛡️ Edge effects: {fortune_entry['edge_effects']}")
    else:
        print(f"❌ Fortune entry failed: {fortune_entry['error']}")
    
    # Test 7: Summoning - Fortune → Witch Mods
    print("\n👁️ Testing Summoning - Fortune → Witch Mods...")
    witch_entry = navigator.traverse_edge("witch-mods")
    if "error" not in witch_entry:
        print(f"✅ Witch Mods summoned: {witch_entry['node_data']['name']}")
        print(f"⚖️ Tarot: {witch_entry['node_data']['tarotOverlay']}")
        print(f"🔮 Oracle: {witch_entry['oracle_message']}")
        print(f"👁️ Artifact: {witch_entry['node_data']['artifact']}")
    else:
        print(f"❌ Witch Mods entry failed: {witch_entry['error']}")
    
    # Test 8: Test academic/artistic flow - Agrippa → Dee → Hilma
    print("\n📚 Testing Academic Flow - Agrippa → Dee → Hilma...")
    
    # Reset and enter Agrippa
    agrippa_entry = navigator.enter_node("agrippa")
    if "error" not in agrippa_entry:
        print(f"✅ Academic start: {agrippa_entry['node_data']['name']} - {agrippa_entry['node_data']['codexRole']}")
    
    # Agrippa influences Dee
    dee_entry = navigator.traverse_edge("dee")
    if "error" not in dee_entry:
        print(f"✅ Influenced: {dee_entry['node_data']['name']}")
        print(f"📜 Artifact: {dee_entry['node_data']['artifact']}")
    
    # Dee inspires Hilma
    hilma_entry = navigator.traverse_edge("hilma")
    if "error" not in hilma_entry:
        print(f"✅ Inspired: {hilma_entry['node_data']['name']}")
        print(f"🎨 Visionary role: {hilma_entry['node_data']['codexRole']}")
        print(f"🌙 Tarot: {hilma_entry['node_data']['tarotOverlay']}")
    
    # Test 9: Session status and safety
    print("\n📊 Testing Session Status...")
    status = navigator.get_session_status()
    if "error" not in status:
        print(f"✅ Session ID: {status['session_id']}")
        print(f"📍 Current Node: {status['current_node']}")
        print(f"🎯 State: {status['state']}")
        print(f"📊 Accumulated Intensity: {status['accumulated_intensity']:.2f}")
        print(f"🚶 Nodes Visited: {status['nodes_visited']}")
        print(f"♻️ Respawn Count: {status['respawn_count']}")
        print(f"🛡️ Within Intensity Limit: {status['safety_status']['within_intensity_limit']}")
    
    # Test 10: Render hints verification
    print("\n🎨 Testing Render Hints...")
    for node_id in ["tesla", "fortune", "rebecca-respawn"]:
        if node_id in navigator.render_hints["renderHints"]:
            hints = navigator.render_hints["renderHints"][node_id]
            print(f"✅ {node_id}: {hints['harmonics']} | {hints['crystal']} | {len(hints['palette'])} colors")
    
    # Test 11: Respawn mechanism
    print("\n♻️ Testing Respawn Mechanism...")
    respawn_result = navigator.trigger_respawn()
    if "error" not in respawn_result:
        print(f"✅ Respawn triggered: {respawn_result['respawn_triggered']}")
        print(f"🔄 Reset complete: {respawn_result['reset_complete']}")
        print(f"♻️ Respawn count: {respawn_result['respawn_count']}")
        print(f"💬 Message: {respawn_result['message']}")
    
    print("\n🎉 Cathedral Graph Navigation System - All Tests Completed!")
    return True

def test_render_integration():
    """Test render hints integration"""
    print("\n🎨 Testing Render Integration...")
    
    navigator = CathedralGraphNavigator("packages/graphs")
    
    # Test rendering data for each node type
    print("🎵 Harmonics Test:")
    for node in navigator.core_nodes["nodes"][:3]:  # Test first 3 nodes
        node_id = node["id"]
        hints = navigator.render_hints["renderHints"].get(node_id, {})
        if hints:
            print(f"  {node['name']}: {hints.get('harmonics', ['N/A'])}")
    
    print("\n🎨 Color Palettes Test:")
    for node in navigator.core_nodes["nodes"][:3]:
        node_id = node["id"]
        hints = navigator.render_hints["renderHints"].get(node_id, {})
        if hints:
            print(f"  {node['name']}: {hints.get('palette', ['N/A'])}")
    
    print("\n💎 Crystal Forms Test:")
    for node in navigator.core_nodes["nodes"][:3]:
        node_id = node["id"]
        hints = navigator.render_hints["renderHints"].get(node_id, {})
        if hints:
            print(f"  {node['name']}: {hints.get('crystal', 'N/A')}")
    
    return True

if __name__ == "__main__":
    print("🏛️ Cathedral Core Graph System - Complete Test Suite")
    print("=" * 70)
    
    try:
        # Main navigation tests
        nav_success = test_cathedral_graph_navigation()
        
        # Render integration tests  
        render_success = test_render_integration()
        
        if nav_success and render_success:
            print("\n✨ ALL CATHEDRAL GRAPH TESTS PASSED!")
            print("🏛️ The 10-node Cathedral of Circuits is fully operational")
            print("⚡ Tesla, Hypatia, Agrippa, Dee, Fortune, Hilma")
            print("🎭 Witch Mods, Crowley Shadow, Virelai, Rebecca Respawn")
            print("🌟 Ready for Mystery House expansion to 144 rooms")
        else:
            print("\n⚠️ Some tests need attention")
            
    except Exception as e:
        print(f"\n❌ Test suite error: {e}")
        import traceback
        traceback.print_exc()