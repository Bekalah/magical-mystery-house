extends Node
class_name TrueWillSystem

## True Will System - Thelemic
## "Do what thou wilt shall be the whole of the Law"
## Chaos meter based on alignment with True Will

signal true_will_discovered(character: Node, will: Dictionary)
signal alignment_changed(character: Node, alignment: float, chaos: float)
signal chaos_status_changed(character: Node, status: String)

# True Will data
var true_wills: Dictionary = {}
var chaos_meters: Dictionary = {}

func _ready():
	load_true_wills()

func load_true_wills():
	# Load True Will data from JSON
	var file = FileAccess.open("res://data/true-wills/characters.json", FileAccess.READ)
	if file:
		var json_string = file.get_as_text()
		file.close()
		var json = JSON.new()
		var parse_result = json.parse(json_string)
		if parse_result == OK:
			true_wills = json.data
		else:
			print("Failed to parse true-wills.json")
	else:
		print("true-wills.json not found, creating empty dictionary")
		true_wills = {}

func discover_true_will(character: Node, character_data: Dictionary) -> Dictionary:
	# Discover True Will for character
	# Based on Thelemic principles
	var will = {
		"entity_id": character.name,
		"discovered": Time.get_datetime_string_from_system(),
		"will": calculate_true_will(character_data),
		"alignment": 0.0,  # -100 to 100
		"chaos": 50.0,  # 0-100, starts at neutral
		"thelemic": {
			"law": "Do what thou wilt shall be the whole of the Law",
			"love": "Love is the law, love under will",
			"star": calculate_star(character_data),
			"khu": calculate_khu(character_data)
		}
	}
	
	true_wills[character.name] = will
	update_chaos_meter(character, will)
	true_will_discovered.emit(character, will)
	
	return will

func calculate_true_will(character_data: Dictionary) -> Dictionary:
	# Calculate True Will based on character data
	return {
		"essence": character_data.get("essence", "Unknown"),
		"purpose": character_data.get("purpose", "To discover purpose"),
		"expression": character_data.get("expression", "Creative manifestation"),
		"arcana": character_data.get("arcana", 0)
	}

func calculate_star(character_data: Dictionary) -> Dictionary:
	# Calculate Star (astrological True Will)
	var arcana = character_data.get("arcana", 0)
	return {
		"arcana": arcana,
		"planet": get_planet_for_arcana(arcana),
		"element": get_element_for_arcana(arcana),
		"sign": get_sign_for_arcana(arcana)
	}

func calculate_khu(character_data: Dictionary) -> Dictionary:
	# Calculate Khu (divine self, Holy Guardian Angel)
	return {
		"name": character_data.get("khu_name", "Unknown Khu"),
		"connection": character_data.get("khu_connection", "To be discovered"),
		"manifestation": character_data.get("khu_manifestation", "Through True Will")
	}

func get_planet_for_arcana(arcana: int) -> String:
	var planets = [
		"Uranus", "Mercury", "Moon", "Venus", "Aries", "Taurus",
		"Gemini", "Cancer", "Leo", "Virgo", "Jupiter", "Libra",
		"Scorpio", "Mars", "Sagittarius", "Saturn", "Aquarius",
		"Pisces", "Sun", "Fire", "Earth", "Jupiter"
	]
	if arcana >= 0 and arcana < planets.size():
		return planets[arcana]
	return "Unknown"

func get_element_for_arcana(arcana: int) -> String:
	var elements = [
		"Air", "Air", "Water", "Earth", "Fire", "Earth",
		"Air", "Water", "Fire", "Earth", "Fire", "Air",
		"Water", "Water", "Fire", "Earth", "Air", "Water",
		"Fire", "Fire", "Earth", "Earth"
	]
	if arcana >= 0 and arcana < elements.size():
		return elements[arcana]
	return "Unknown"

func get_sign_for_arcana(arcana: int) -> String:
	var signs = [
		"Air", "Mercury", "Moon", "Venus", "Aries", "Taurus",
		"Gemini", "Cancer", "Leo", "Virgo", "Jupiter", "Libra",
		"Scorpio", "Mars", "Sagittarius", "Capricorn", "Aquarius",
		"Pisces", "Sun", "Fire", "Judgment", "Saturn"
	]
	if arcana >= 0 and arcana < signs.size():
		return signs[arcana]
	return "Unknown"

func update_alignment(character: Node, action: Dictionary) -> void:
	# Update alignment with True Will based on action
	if not true_wills.has(character.name):
		return
	
	var will = true_wills[character.name]
	var alignment_change = calculate_alignment(action, will.will)
	
	will.alignment = clamp(will.alignment + alignment_change, -100.0, 100.0)
	will.last_action = {
		"action": action,
		"alignment": alignment_change,
		"timestamp": Time.get_datetime_string_from_system()
	}
	
	update_chaos_meter(character, will)
	alignment_changed.emit(character, will.alignment, will.chaos)

func calculate_alignment(action: Dictionary, true_will: Dictionary) -> float:
	# Calculate alignment for an action
	# Returns positive for aligned, negative for misaligned
	var alignment = 0.0
	
	match action.get("type", "neutral"):
		"aligned":
			alignment = 10.0
		"misaligned":
			alignment = -10.0
		"neutral":
			alignment = 0.0
	
	return alignment

func update_chaos_meter(character: Node, will: Dictionary) -> void:
	# Update chaos meter based on True Will alignment
	# Chaos = 100 - alignment (when aligned, chaos is low)
	var chaos = clamp(100.0 - will.alignment, 0.0, 100.0)
	will.chaos = chaos
	
	var status = get_chaos_status(chaos)
	chaos_meters[character.name] = {
		"chaos": chaos,
		"alignment": will.alignment,
		"status": status,
		"updated": Time.get_datetime_string_from_system()
	}
	
	chaos_status_changed.emit(character, status)

func get_chaos_status(chaos: float) -> String:
	# Get chaos status based on chaos level
	if chaos < 20.0:
		return "aligned"  # "Do what thou wilt"
	elif chaos < 50.0:
		return "seeking"  # Working towards True Will
	elif chaos < 80.0:
		return "chaotic"  # Misaligned
	else:
		return "chaos"  # Complete chaos, far from True Will

func get_chaos_meter(character: Node) -> Dictionary:
	# Get chaos meter for character
	return chaos_meters.get(character.name, {})

func get_true_will(character: Node) -> Dictionary:
	# Get True Will for character
	return true_wills.get(character.name, {})

