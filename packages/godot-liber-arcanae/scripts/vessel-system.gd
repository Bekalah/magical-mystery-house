extends Node
class_name VesselSystem

## Creative Vessel Tech - Alchemical Transformation System
## Vessels are containers for transformation, like in alchemy
## Each vessel can hold, transform, and manifest energy

signal vessel_created(vessel: Vessel)
signal vessel_transformed(vessel: Vessel, transformation: Dictionary)
signal vessel_manifested(vessel: Vessel, result: Dictionary)

# Vessel types based on alchemical tradition
enum VesselType {
	CRUCIBLE,      # For intense transformation (Sulfur/Wands)
	ALEMBIC,       # For distillation (Mercury/Cups)
	RETORT,        # For separation (Salt/Swords)
	ATHANOR,       # For slow, steady work (Ash/Pentacles)
	PHILOSOPHER,   # For complete transformation (All elements)
	CREATIVE       # For creative neurodivergent process
}

# Vessel states
enum VesselState {
	EMPTY,         # Ready to receive
	FILLING,       # Receiving energy/materials
	TRANSFORMING,  # Active transformation
	MANIFESTING,   # Creating result
	COMPLETE,      # Transformation complete
	EXHAUSTED      # Needs rest/recharge
}

## Vessel data structure
class Vessel:
	var id: String
	var name: String
	var type: VesselType
	var state: VesselState
	var capacity: float  # 0-1, how much it can hold
	var current_energy: float  # 0-1, current energy level
	var transformation_rate: float  # How fast it transforms
	var quality: float  # 0-1, quality of transformations
	var correspondences: Dictionary  # Codex correspondences
	var character_connection: int  # Which character uses it (-1 if none)
	var creative_flow: float  # Creative neurodivergent flow
	var aesthetic: String  # harmonious, flowing, minimal, dynamic
	var shader_effect: String  # Which shader to use
	
	func _init(vessel_id: String, vessel_name: String, vessel_type: VesselType):
		id = vessel_id
		name = vessel_name
		type = vessel_type
		state = VesselState.EMPTY
		capacity = 1.0
		current_energy = 0.0
		transformation_rate = 0.5
		quality = 0.5
		correspondences = {}
		character_connection = -1
		creative_flow = 0.5
		aesthetic = "minimal"
		shader_effect = ""

var vessels: Dictionary = {}  # id -> Vessel
var active_vessels: Array[Vessel] = []

func _ready():
	initialize_vessel_system()

func initialize_vessel_system():
	# Create default vessels for each type
	create_vessel("crucible-default", "The Crucible", VesselType.CRUCIBLE)
	create_vessel("alembic-default", "The Alembic", VesselType.ALEMBIC)
	create_vessel("retort-default", "The Retort", VesselType.RETORT)
	create_vessel("athanor-default", "The Athanor", VesselType.ATHANOR)
	create_vessel("philosopher-default", "Philosopher's Vessel", VesselType.PHILOSOPHER)
	create_vessel("creative-default", "Creative Vessel", VesselType.CREATIVE)
	
	print("✅ Vessel System initialized with %d vessels" % vessels.size())

## Create a new vessel
func create_vessel(vessel_id: String, vessel_name: String, vessel_type: VesselType, character_num: int = -1) -> Vessel:
	var vessel = Vessel.new(vessel_id, vessel_name, vessel_type)
	
	# Set properties based on type
	match vessel_type:
		VesselType.CRUCIBLE:
			vessel.capacity = 0.8
			vessel.transformation_rate = 0.9  # Fast, intense
			vessel.quality = 0.7
			vessel.correspondences = {"element": "Sulfur", "suit": "wands", "intensity": 0.9}
			vessel.shader_effect = "cosmic-energy-stream"
			vessel.aesthetic = "dynamic"
		VesselType.ALEMBIC:
			vessel.capacity = 0.9
			vessel.transformation_rate = 0.6  # Moderate, flowing
			vessel.quality = 0.8
			vessel.correspondences = {"element": "Mercury", "suit": "cups", "flow": 0.8}
			vessel.shader_effect = "glowing-orb"
			vessel.aesthetic = "flowing"
		VesselType.RETORT:
			vessel.capacity = 0.7
			vessel.transformation_rate = 0.7  # Balanced
			vessel.quality = 0.75
			vessel.correspondences = {"element": "Salt", "suit": "swords", "precision": 0.8}
			vessel.shader_effect = "sacred-geometry"
			vessel.aesthetic = "minimal"
		VesselType.ATHANOR:
			vessel.capacity = 1.0
			vessel.transformation_rate = 0.3  # Slow, steady
			vessel.quality = 0.9
			vessel.correspondences = {"element": "Ash", "suit": "pentacles", "stability": 0.9}
			vessel.shader_effect = "tree-of-life"
			vessel.aesthetic = "harmonious"
		VesselType.PHILOSOPHER:
			vessel.capacity = 1.0
			vessel.transformation_rate = 0.5
			vessel.quality = 1.0  # Perfect quality
			vessel.correspondences = {"element": "All", "suit": "all", "perfection": 1.0}
			vessel.shader_effect = "duality"
			vessel.aesthetic = "harmonious"
		VesselType.CREATIVE:
			vessel.capacity = 0.85
			vessel.transformation_rate = 0.65  # Creative flow
			vessel.quality = 0.8
			vessel.correspondences = {"element": "Aether", "suit": "creative", "flow": 0.75}
			vessel.shader_effect = "cosmic-sky"
			vessel.aesthetic = "flowing"
	
	# Connect to character if specified
	if character_num >= 0:
		vessel.character_connection = character_num
		# Load character's codex correspondences
		load_character_correspondences(vessel, character_num)
	
	vessels[vessel_id] = vessel
	vessel_created.emit(vessel)
	
	return vessel

## Load character's codex correspondences into vessel
func load_character_correspondences(vessel: Vessel, character_num: int):
	# Load character data
	var char_file = FileAccess.open("res://characters.json", FileAccess.READ)
	if char_file:
		var json_string = char_file.get_as_text()
		char_file.close()
		var json = JSON.new()
		if json.parse(json_string) == OK:
			var data = json.data
			for arcana in data.major_arcana:
				if arcana.number == character_num:
					# Add character correspondences to vessel
					vessel.correspondences["character"] = arcana.name
					vessel.correspondences["fractal_signature"] = arcana.fractal_signature
					vessel.correspondences["color_palette"] = arcana.color_palette
					vessel.correspondences["frequency"] = arcana.frequency_resonance
					
					# Calculate creative flow from character
					vessel.creative_flow = calculate_creative_flow(arcana)
					
					# Determine aesthetic from character
					vessel.aesthetic = determine_aesthetic_from_character(arcana)
					break

## Calculate creative flow from character data
func calculate_creative_flow(character: Dictionary) -> float:
	# Flow based on character properties
	var flow = 0.5
	
	# Higher flow for certain playstyles
	if character.get("playstyle", "").contains("Explorer"):
		flow += 0.2
	if character.get("playstyle", "").contains("Mage"):
		flow += 0.15
	
	# Flow from frequency resonance
	var freq_str = character.get("frequency_resonance", "0.8 Hz")
	var freq = freq_str.replace(" Hz", "").to_float()
	flow += (freq / 10.0) * 0.1
	
	return clamp(flow, 0.0, 1.0)

## Determine aesthetic from character
func determine_aesthetic_from_character(character: Dictionary) -> String:
	var flow = calculate_creative_flow(character)
	
	if flow > 0.8:
		return "harmonious"
	elif flow > 0.6:
		return "flowing"
	elif flow > 0.4:
		return "minimal"
	else:
		return "dynamic"

## Fill vessel with energy
func fill_vessel(vessel_id: String, energy_amount: float) -> bool:
	if not vessels.has(vessel_id):
		return false
	
	var vessel = vessels[vessel_id]
	
	if vessel.state != VesselState.EMPTY and vessel.state != VesselState.EXHAUSTED:
		return false  # Can't fill if not empty
	
	vessel.state = VesselState.FILLING
	vessel.current_energy = min(vessel.capacity, vessel.current_energy + energy_amount)
	
	if vessel.current_energy >= vessel.capacity:
		vessel.state = VesselState.TRANSFORMING
		start_transformation(vessel)
	
	return true

## Start transformation process
func start_transformation(vessel: Vessel):
	vessel.state = VesselState.TRANSFORMING
	
	# Calculate transformation time based on rate
	var transformation_time = (1.0 - vessel.transformation_rate) * 5.0  # 0-5 seconds
	
	# Start transformation timer
	var timer = Timer.new()
	timer.wait_time = transformation_time
	timer.one_shot = true
	timer.timeout.connect(func(): complete_transformation(vessel))
	add_child(timer)
	timer.start()
	
	active_vessels.append(vessel)
	
	print("🔄 Vessel %s transforming (%.2fs)" % [vessel.name, transformation_time])

## Complete transformation
func complete_transformation(vessel: Vessel):
	vessel.state = VesselState.MANIFESTING
	
	# Generate result based on vessel type and correspondences
	var result = generate_manifestation(vessel)
	
	vessel.state = VesselState.COMPLETE
	vessel.current_energy = 0.0
	
	active_vessels.erase(vessel)
	
	vessel_manifested.emit(vessel, result)
	
	print("✨ Vessel %s manifested: %s" % [vessel.name, result.get("type", "unknown")])
	
	# Auto-reset after brief delay
	await get_tree().create_timer(1.0).timeout
	vessel.state = VesselState.EMPTY

## Generate manifestation from vessel
func generate_manifestation(vessel: Vessel) -> Dictionary:
	var result = {
		"type": "transformation",
		"vessel": vessel.name,
		"quality": vessel.quality,
		"aesthetic": vessel.aesthetic,
		"flow": vessel.creative_flow
	}
	
	match vessel.type:
		VesselType.CRUCIBLE:
			result["effect"] = "intense_transformation"
			result["element"] = "Sulfur"
			result["power"] = vessel.quality * 1.2
		VesselType.ALEMBIC:
			result["effect"] = "distillation"
			result["element"] = "Mercury"
			result["purity"] = vessel.quality * 1.1
		VesselType.RETORT:
			result["effect"] = "separation"
			result["element"] = "Salt"
			result["precision"] = vessel.quality * 1.15
		VesselType.ATHANOR:
			result["effect"] = "steady_work"
			result["element"] = "Ash"
			result["stability"] = vessel.quality * 1.3
		VesselType.PHILOSOPHER:
			result["effect"] = "complete_transformation"
			result["element"] = "All"
			result["perfection"] = 1.0
		VesselType.CREATIVE:
			result["effect"] = "creative_manifestation"
			result["element"] = "Aether"
			result["creativity"] = vessel.creative_flow * 1.2
	
	# Add correspondences to result
	result["correspondences"] = vessel.correspondences
	result["shader"] = vessel.shader_effect
	
	return result

## Get vessel by ID
func get_vessel(vessel_id: String) -> Vessel:
	return vessels.get(vessel_id, null)

## Get vessels for character
func get_character_vessels(character_num: int) -> Array[Vessel]:
	var char_vessels: Array[Vessel] = []
	for vessel in vessels.values():
		if vessel.character_connection == character_num:
			char_vessels.append(vessel)
	return char_vessels

## Get all active vessels
func get_active_vessels() -> Array[Vessel]:
	return active_vessels.duplicate()

