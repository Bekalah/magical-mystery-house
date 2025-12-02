extends CharacterBody2D
class_name LiberArcanaeCharacter

## Base class for all 22 Major Arcana playable characters

@export var character_number: int = 0
@export var character_name: String = "The Fool"
@export var purity_designation: String = ""
@export var fractal_signature: String = ""

# Character stats
@export var max_health: int = 100
@export var max_mana: int = 50
@export var speed: float = 200.0
@export var attack_power: int = 10
@export var defense: int = 5
@export var magic_power: int = 10

# Current stats
var current_health: int
var current_mana: int

# Color palette from character data
var color_palette: Array[Color] = []

# Abilities
var abilities: Array[String] = []
var ability_cooldowns: Dictionary = {}

# Movement
var move_direction: Vector2 = Vector2.ZERO
var is_moving: bool = false

# Animation
@onready var sprite: Sprite2D = $Sprite2D
@onready var animation_player: AnimationPlayer = $AnimationPlayer

signal health_changed(new_health: int, max_health: int)
signal mana_changed(new_mana: int, max_mana: int)
signal ability_used(ability_name: String)
signal character_died

func _ready():
	current_health = max_health
	current_mana = max_mana
	load_character_data()
	setup_abilities()
	
func load_character_data():
	# Load character data from JSON
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
					character_name = arcana.name
					purity_designation = arcana.purity_designation
					fractal_signature = arcana.fractal_signature
					abilities = arcana.abilities
					# Convert hex colors to Color objects
					for hex_color in arcana.color_palette:
						color_palette.append(Color(hex_color))
					break

func setup_abilities():
	# Initialize ability cooldowns
	for ability in abilities:
		ability_cooldowns[ability] = 0.0

func _physics_process(delta):
	handle_movement(delta)
	update_cooldowns(delta)
	
func handle_movement(delta):
	move_direction = Vector2.ZERO
	
	# Get input
	if Input.is_action_pressed("move_up"):
		move_direction.y -= 1
	if Input.is_action_pressed("move_down"):
		move_direction.y += 1
	if Input.is_action_pressed("move_left"):
		move_direction.x -= 1
	if Input.is_action_pressed("move_right"):
		move_direction.x += 1
	
	# Normalize diagonal movement
	if move_direction.length() > 0:
		move_direction = move_direction.normalized()
		is_moving = true
		velocity = move_direction * speed
	else:
		is_moving = false
		velocity = Vector2.ZERO
	
	move_and_slide()
	
	# Update sprite direction
	if move_direction.x != 0:
		if move_direction.x < 0:
			sprite.scale.x = -1
		else:
			sprite.scale.x = 1

func update_cooldowns(delta):
	for ability in ability_cooldowns.keys():
		if ability_cooldowns[ability] > 0:
			ability_cooldowns[ability] -= delta

func use_ability(ability_name: String):
	if ability_name in abilities and (ability_name not in ability_cooldowns or ability_cooldowns[ability_name] <= 0):
		# Ability-specific logic handled by subclasses
		ability_cooldowns[ability_name] = get_ability_cooldown(ability_name)
		ability_used.emit(ability_name)
		return true
	return false

func get_ability_cooldown(ability_name: String) -> float:
	# Default cooldown times
	match ability_name:
		"Leap of Faith", "Quantum Jump":
			return 3.0
		"Elemental Mastery", "Reality Manipulation":
			return 5.0
		"Intuitive Vision", "Lunar Power":
			return 4.0
		"Nature Command", "Growth":
			return 6.0
		"Dimensional Travel", "Speed":
			return 8.0
		"Fortune Spin", "Probability Control":
			return 10.0
		"Transformation", "Rebirth":
			return 15.0
		"Destruction", "Revelation":
			return 12.0
		"Radiance", "Vitality":
			return 5.0
		"Completion", "Mastery":
			return 20.0
		_:
			return 5.0

func take_damage(amount: int):
	var actual_damage = max(1, amount - defense)
	current_health -= actual_damage
	health_changed.emit(current_health, max_health)
	
	if current_health <= 0:
		die()

func heal(amount: int):
	current_health = min(max_health, current_health + amount)
	health_changed.emit(current_health, max_health)

func use_mana(amount: int) -> bool:
	if current_mana >= amount:
		current_mana -= amount
		mana_changed.emit(current_mana, max_mana)
		return true
	return false

func restore_mana(amount: int):
	current_mana = min(max_mana, current_mana + amount)
	mana_changed.emit(current_mana, max_mana)

func die():
	character_died.emit()
	# Handle death - can be overridden by subclasses

func get_primary_color() -> Color:
	if color_palette.size() > 0:
		return color_palette[0]
	return Color.WHITE

