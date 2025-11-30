# 🏰✨ Cathedral of Circuits - Godot Codex 144:99
# Sacred lattice system for mystical game development
# Trauma-safe, sacred geometry compliant

@tool
extends Node

# Sacred Mathematics Constants
const GOLDEN_RATIO = 1.618033988749
const RATIO_144_99 = 1.454545454545
const TOTAL_NODES = 144
const TOTAL_GATES = 99

# Configuration
@export var golden_ratio: bool = true
@export var ratio_144_99: bool = true
@export var fibonacci_spiral: bool = true
@export var trauma_safe: bool = true

# Trauma Safety Settings
@export var motion_enabled: bool = true
@export var speed_multiplier: float = 1.0
@export var esc_exit: bool = true
@export var autoplay: bool = false

# Node Management
var nodes: Array = []
var gates: Array = []
var connections: Array = []
var lattice_ready: bool = false

# Signals
signal node_activated(node_index: int, energy: float)
signal gate_opened(gate_index: int, resonance: float)
signal lattice_complete(energy_flow: float)
signal trauma_safety_triggered()

func _ready():
    # Initialize trauma-safe defaults
    if trauma_safe:
        motion_enabled = false
        autoplay = false
        speed_multiplier = 0.3

    # Set up input handling
    if esc_exit:
        set_process_input(true)

    # Initialize sacred lattice
    initialize_lattice()

func _input(event):
    if esc_exit and event.is_action_pressed("ui_cancel"):
        emergency_stop()
        trauma_safety_triggered.emit()

func initialize_lattice():
    """Initialize the 144-node sacred lattice system"""
    nodes.clear()
    gates.clear()
    connections.clear()

    # Create 144 nodes with sacred positioning
    for i in range(TOTAL_NODES):
        var node = create_sacred_node(i)
        nodes.append(node)
        add_child(node)

    # Create 99 gates
    for i in range(TOTAL_GATES):
        var gate = create_sacred_gate(i)
        gates.append(gate)
        add_child(gate)

    # Establish sacred connections
    establish_sacred_connections()

    lattice_ready = true
    lattice_complete.emit(calculate_total_energy())

func create_sacred_node(index: int) -> Node2D:
    """Create a single node with sacred positioning"""
    var node = Node2D.new()
    node.name = "Node_%d" % index

    # Calculate sacred position using golden ratio
    var angle = (index * GOLDEN_RATIO * PI * 2) / TOTAL_NODES
    var radius = 100 + (index * GOLDEN_RATIO)

    if golden_ratio:
        radius *= GOLDEN_RATIO

    node.position = Vector2(
        cos(angle) * radius,
        sin(angle) * radius
    )

    # Add visual representation
    var sprite = ColorRect.new()
    sprite.size = Vector2(8, 8)
    sprite.color = get_node_color(index)
    node.add_child(sprite)

    # Connect interaction
    node.input_event.connect(_on_node_input.bind(index))

    return node

func create_sacred_gate(index: int) -> Node2D:
    """Create a sacred gate with divine proportions"""
    var gate = Node2D.new()
    gate.name = "Gate_%d" % index

    # Position gates using 144:99 ratio
    var angle = (index * RATIO_144_99 * PI * 2) / TOTAL_GATES
    var radius = 150 + (index * RATIO_144_99)

    gate.position = Vector2(
        cos(angle) * radius,
        sin(angle) * radius
    )

    # Add gate visual
    var gate_sprite = ColorRect.new()
    gate_sprite.size = Vector2(12, 12)
    gate_sprite.color = get_gate_color(index)
    gate.add_child(gate_sprite)

    return gate

func establish_sacred_connections():
    """Establish connections using sacred mathematics"""
    connections.clear()

    # Connect nodes using Fibonacci sequences
    for i in range(TOTAL_NODES):
        var connections_count = fibonacci_connections(i)
        for j in range(connections_count):
            var target = (i + j * 8) % TOTAL_NODES  # Sacred offset
            if i != target:
                create_connection(i, target)

    # Connect gates using 144:99 ratio
    for i in range(TOTAL_GATES):
        var node_target = int(i * RATIO_144_99) % TOTAL_NODES
        create_gate_connection(i, node_target)

func fibonacci_connections(node_index: int) -> int:
    """Calculate connection count using Fibonacci sequence"""
    var fib = [1, 1, 2, 3, 5, 8, 13, 21]
    return fib[node_index % fib.size()]

func create_connection(node1: int, node2: int):
    """Create a sacred connection between nodes"""
    var connection = {
        "source": node1,
        "target": node2,
        "sacred_ratio": calculate_sacred_ratio(node1, node2),
        "energy_flow": 0.0
    }
    connections.append(connection)

func create_gate_connection(gate: int, node: int):
    """Create connection between gate and node"""
    var connection = {
        "gate": gate,
        "node": node,
        "resonance": calculate_gate_resonance(gate, node),
        "active": false
    }
    connections.append(connection)

func calculate_sacred_ratio(node1: int, node2: int) -> float:
    """Calculate sacred ratio between nodes"""
    if golden_ratio:
        return GOLDEN_RATIO
    elif ratio_144_99:
        return RATIO_144_99
    else:
        return 1.0

func calculate_gate_resonance(gate: int, node: int) -> float:
    """Calculate resonance between gate and node"""
    var ratio = float(gate + 1) / float(node + 1)
    return ratio * RATIO_144_99

func get_node_color(index: int) -> Color:
    """Get mystical color for node based on sacred correspondence"""
    var colors = [
        Color.RED,      # Root - Survival
        Color.ORANGE,   # Sacral - Creation
        Color.YELLOW,   # Solar Plexus - Will
        Color.GREEN,    # Heart - Love
        Color.BLUE,     # Throat - Expression
        Color.INDIGO,   # Third Eye - Vision
        Color.VIOLET,   # Crown - Unity
        Color.WHITE,    # Soul - Divinity
    ]
    return colors[index % colors.size()]

func get_gate_color(index: int) -> Color:
    """Get mystical color for gate"""
    var gate_colors = [
        Color.GOLD,     # Divine gates
        Color.SILVER,   # Lunar gates
        Color.CYAN,     # Celestial gates
    ]
    return gate_colors[index % gate_colors.size()]

func _on_node_input(viewport: Viewport, event: InputEvent, shape_idx: int, node_index: int):
    """Handle node interaction with trauma safety"""
    if not event is InputEventMouseButton:
        return

    var mouse_event = event as InputEventMouseButton
    if mouse_event.pressed and mouse_event.button_index == MOUSE_BUTTON_LEFT:
        activate_node(node_index)

func activate_node(node_index: int):
    """Activate a node with sacred energy calculation"""
    if not lattice_ready or node_index >= nodes.size():
        return

    var node = nodes[node_index]
    var energy = calculate_node_energy(node_index)

    # Emit signal for other systems
    node_activated.emit(node_index, energy)

    # Visual feedback
    animate_node_activation(node, energy)

func calculate_node_energy(node_index: int) -> float:
    """Calculate sacred energy for node"""
    var base_energy = float(node_index + 1) / TOTAL_NODES
    var sacred_multiplier = 1.0

    if golden_ratio:
        sacred_multiplier *= GOLDEN_RATIO
    if ratio_144_99:
        sacred_multiplier *= RATIO_144_99

    return base_energy * sacred_multiplier

func calculate_total_energy() -> float:
    """Calculate total energy flow in the lattice"""
    var total = 0.0
    for connection in connections:
        if connection.has("energy_flow"):
            total += connection.energy_flow
    return total / connections.size()

func animate_node_activation(node: Node2D, energy: float):
    """Animate node activation with trauma-safe effects"""
    if not motion_enabled:
        return

    # Gentle pulsing animation
    var tween = create_tween()
    var sprite = node.get_child(0)

    # Scale animation based on energy
    var scale = 1.0 + (energy * 0.5)
    tween.tween_property(sprite, "scale", Vector2(scale, scale), 0.3 * speed_multiplier)
    tween.tween_property(sprite, "scale", Vector2.ONE, 0.7 * speed_multiplier)

    # Color intensity based on energy
    var intensity = 0.7 + (energy * 0.3)
    tween.tween_property(sprite, "color", sprite.color * intensity, 0.2 * speed_multiplier)

func emergency_stop():
    """Emergency stop for trauma safety"""
    motion_enabled = false
    autoplay = false

    # Stop all animations
    for node in nodes:
        if node.has_method("stop_animations"):
            node.stop_animations()

    for gate in gates:
        if gate.has_method("stop_animations"):
            gate.stop_animations()

func enable_motion():
    """Safely enable motion with user consent"""
    if trauma_safe:
        # Gradual motion increase
        speed_multiplier = 0.1
        motion_enabled = true
    else:
        motion_enabled = true

func get_node_count() -> int:
    """Get total number of nodes"""
    return nodes.size()

func get_gate_count() -> int:
    """Get total number of gates"""
    return gates.size()

func get_connection_count() -> int:
    """Get total number of connections"""
    return connections.size()

# Public API methods for integration
func get_node(index: int):
    """Get node by index"""
    if index >= 0 and index < nodes.size():
        return nodes[index]
    return null

func get_gate(index: int):
    """Get gate by index"""
    if index >= 0 and index < gates.size():
        return gates[index]
    return null

func calculate_energy_flow() -> float:
    """Calculate current energy flow"""
    return calculate_total_energy()

func is_trauma_safe() -> bool:
    """Check if system is in trauma-safe mode"""
    return trauma_safe

func set_motion_controls(enabled: bool):
    """Enable or disable motion controls"""
    motion_enabled = enabled
    if not enabled:
        emergency_stop()
