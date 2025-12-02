extends Node
class_name GameManager

## Main game manager for Liber Arcanae game

var current_character: LiberArcanaeCharacter = null
var current_character_number: int = -1

signal character_changed(character: LiberArcanaeCharacter)

func _ready():
	# Setup input map
	_setup_input_map()

func _setup_input_map():
	# Movement
	if not InputMap.has_action("move_up"):
		InputMap.add_action("move_up")
		var event_up = InputEventKey.new()
		event_up.keycode = KEY_W
		InputMap.action_add_event("move_up", event_up)
		
	if not InputMap.has_action("move_down"):
		InputMap.add_action("move_down")
		var event_down = InputEventKey.new()
		event_down.keycode = KEY_S
		InputMap.action_add_event("move_down", event_down)
		
	if not InputMap.has_action("move_left"):
		InputMap.add_action("move_left")
		var event_left = InputEventKey.new()
		event_left.keycode = KEY_A
		InputMap.action_add_event("move_left", event_left)
		
	if not InputMap.has_action("move_right"):
		InputMap.add_action("move_right")
		var event_right = InputEventKey.new()
		event_right.keycode = KEY_D
		InputMap.action_add_event("move_right", event_right)

func set_character(character_number: int):
	current_character_number = character_number
	# Character will be instantiated by the game scene
	character_changed.emit(current_character)

func get_character_data(character_number: int) -> Dictionary:
	var file = FileAccess.open("res://characters.json", FileAccess.READ)
	if file:
		var json_string = file.get_as_text()
		file.close()
		var json = JSON.new()
		var parse_result = json.parse(json_string)
		if parse_result == OK:
			var data = json.data
			for arcana in data.major_arcana:
				if arcana.number == character_number:
					return arcana
	return {}

