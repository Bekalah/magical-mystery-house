extends Node2D
class_name GameSceneHandler

## Handles the main game scene

@onready var player: LiberArcanaeCharacter = $Player
@onready var health_bar: ProgressBar = $UI/HealthBar
@onready var mana_bar: ProgressBar = $UI/ManaBar
@onready var character_name_label: Label = $UI/CharacterName

func _ready():
	# Initialize player character
	if player:
		player.character_number = GameManager.current_character_number
		player.load_character_data()
		
		# Connect signals
		player.health_changed.connect(_on_health_changed)
		player.mana_changed.connect(_on_mana_changed)
		
		# Update UI
		character_name_label.text = player.character_name
		health_bar.max_value = player.max_health
		health_bar.value = player.current_health
		mana_bar.max_value = player.max_mana
		mana_bar.value = player.current_mana

func _on_health_changed(new_health: int, max_health: int):
	health_bar.max_value = max_health
	health_bar.value = new_health

func _on_mana_changed(new_mana: int, max_mana: int):
	mana_bar.max_value = max_mana
	mana_bar.value = new_mana

func _input(event):
	if event.is_action_pressed("ui_cancel"):
		# Return to main menu
		get_tree().change_scene_to_file("res://scenes/main_menu.tscn")

