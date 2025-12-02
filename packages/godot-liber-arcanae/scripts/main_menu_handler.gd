extends Control
class_name MainMenuHandler

## Handles main menu and character selection flow

@onready var character_selector: CharacterSelector = $CharacterSelector
@onready var game_scene_path: String = "res://scenes/game_scene.tscn"

func _ready():
	if character_selector:
		character_selector.character_selected.connect(_on_character_selected)

func _on_character_selected(character_number: int):
	# Store selected character number
	GameManager.set_character(character_number)
	
	# Load game scene
	get_tree().change_scene_to_file(game_scene_path)

