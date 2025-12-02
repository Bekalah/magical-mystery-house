extends Node
class_name SpellSystem

## Spell System using grimoire spells
## Replaces generic abilities with real grimoire spells

signal spell_cast(spell_name: String, caster: Node, target: Node)
signal spell_learned(spell_name: String, caster: Node)

# Load grimoire spells
var grimoire_spells: Dictionary = {}
var character_spells: Dictionary = {}

func _ready():
	load_grimoire_spells()

func load_grimoire_spells():
	# Load grimoire spells from JSON
	var file = FileAccess.open("res://data/grimoire-spells.json", FileAccess.READ)
	if file:
		var json_string = file.get_as_text()
		file.close()
		var json = JSON.new()
		var parse_result = json.parse(json_string)
		if parse_result == OK:
			grimoire_spells = json.data
		else:
			print("Failed to parse grimoire-spells.json")
	else:
		print("grimoire-spells.json not found, creating empty dictionary")
		grimoire_spells = {}

func get_spells_for_character(character_number: int) -> Array:
	# Get spells from character's grimoire
	if character_spells.has(character_number):
		return character_spells[character_number]
	
	# Load from character grimoire
	var grimoire_file = FileAccess.open("res://data/character-grimoires.json", FileAccess.READ)
	if grimoire_file:
		var json_string = grimoire_file.get_as_text()
		grimoire_file.close()
		var json = JSON.new()
		var parse_result = json.parse(json_string)
		if parse_result == OK:
			var grimoires = json.data
			if grimoires.has(str(character_number)):
				var grimoire = grimoires[str(character_number)]
				var spells = grimoire.get("spells", [])
				character_spells[character_number] = spells
				return spells
	
	return []

func cast_spell(spell_name: String, caster: Node, target: Node = null):
	# Find spell in grimoire
	var spell = find_spell(spell_name)
	if spell:
		# Cast the spell
		spell_cast.emit(spell_name, caster, target)
		
		# Apply spell effects based on alchemical element
		var element = spell.get("alchemicalElement", "Unknown")
		match element:
			"Sulfur":
				apply_sulfur_effect(spell, caster, target)
			"Mercury":
				apply_mercury_effect(spell, caster, target)
			"Salt":
				apply_salt_effect(spell, caster, target)
			"Ash":
				apply_ash_effect(spell, caster, target)
			_:
				apply_generic_effect(spell, caster, target)
		
		return true
	else:
		print("Spell not found: ", spell_name)
		return false

func find_spell(spell_name: String) -> Dictionary:
	# Search in all grimoires
	for character_num in character_spells.keys():
		var spells = character_spells[character_num]
		for spell in spells:
			if spell.get("name", "") == spell_name:
				return spell
	
	# Search in general grimoire spells
	for spell_key in grimoire_spells.keys():
		var spell = grimoire_spells[spell_key]
		if spell.get("name", "") == spell_name:
			return spell
	
	return {}

func apply_sulfur_effect(spell: Dictionary, caster: Node, target: Node):
	# Sulfur (Wands) - Fire/Will effects
	# High damage, action-oriented
	if target and target.has_method("take_damage"):
		var damage = 20
		target.take_damage(damage)
	
	# Visual effect - fire/will based
	create_spell_visual(spell, caster, target, Color.ORANGE_RED)

func apply_mercury_effect(spell: Dictionary, caster: Node, target: Node):
	# Mercury (Cups) - Water/Emotion effects
	# Healing, emotional, transformative
	if target and target.has_method("heal"):
		var healing = 15
		target.heal(healing)
	
	# Visual effect - water/emotion based
	create_spell_visual(spell, caster, target, Color.CYAN)

func apply_salt_effect(spell: Dictionary, caster: Node, target: Node):
	# Salt (Swords) - Air/Intellect effects
	# Mental, cutting, analytical
	if target and target.has_method("apply_status"):
		target.apply_status("intellect_boost", 10.0)
	
	# Visual effect - air/intellect based
	create_spell_visual(spell, caster, target, Color.LIGHT_BLUE)

func apply_ash_effect(spell: Dictionary, caster: Node, target: Node):
	# Ash (Pentacles) - Earth/Manifestation effects
	# Material, grounding, manifestation
	if caster and caster.has_method("add_resource"):
		caster.add_resource("mana", 10)
	
	# Visual effect - earth/manifestation based
	create_spell_visual(spell, caster, target, Color.BROWN)

func apply_generic_effect(spell: Dictionary, caster: Node, target: Node):
	# Generic spell effect
	create_spell_visual(spell, caster, target, Color.WHITE)

func create_spell_visual(spell: Dictionary, caster: Node, target: Node, color: Color):
	# Create visual effect for spell
	# This would integrate with shader system
	var effect = {
		"spell": spell.get("name", "Unknown"),
		"color": color,
		"caster": caster,
		"target": target,
		"alchemicalElement": spell.get("alchemicalElement", "Unknown")
	}
	
	# Emit signal for visual system
	spell_cast.emit(spell.get("name", "Unknown"), caster, target)

