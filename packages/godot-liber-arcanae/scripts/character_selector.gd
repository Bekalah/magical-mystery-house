extends Control
class_name CharacterSelector

## Character selection screen for choosing one of 22 Major Arcana

signal character_selected(character_number: int)

@onready var character_grid: GridContainer = $VBoxContainer/ScrollContainer/CharacterGrid
@onready var character_info: VBoxContainer = $VBoxContainer/CharacterInfo
@onready var character_name_label: Label = $VBoxContainer/CharacterInfo/NameLabel
@onready var character_description: RichTextLabel = $VBoxContainer/CharacterInfo/DescriptionLabel
@onready var abilities_list: ItemList = $VBoxContainer/CharacterInfo/AbilitiesList
@onready var select_button: Button = $VBoxContainer/CharacterInfo/SelectButton

var characters_data: Array = []
var selected_character: int = -1

func _ready():
	load_characters()
	create_character_cards()
	select_button.pressed.connect(_on_select_pressed)

func load_characters():
	var file = FileAccess.open("res://characters.json", FileAccess.READ)
	if file:
		var json_string = file.get_as_text()
		file.close()
		var json = JSON.new()
		var parse_result = json.parse(json_string)
		if parse_result == OK:
			characters_data = json.data.major_arcana
		else:
			push_error("Failed to parse characters.json")

func create_character_cards():
	for i in range(22):
		var card = create_character_card(i)
		character_grid.add_child(card)

func create_character_card(character_number: int) -> Control:
	var card = PanelContainer.new()
	card.custom_minimum_size = Vector2(150, 200)
	
	var vbox = VBoxContainer.new()
	card.add_child(vbox)
	
	# Character number
	var number_label = Label.new()
	number_label.text = str(character_number)
	number_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	vbox.add_child(number_label)
	
	# Character name
	var name_label = Label.new()
	if character_number < characters_data.size():
		name_label.text = characters_data[character_number].name
	else:
		name_label.text = "Character " + str(character_number)
	name_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	vbox.add_child(name_label)
	
	# Character icon placeholder
	var icon = ColorRect.new()
	icon.custom_minimum_size = Vector2(100, 100)
	if character_number < characters_data.size() and characters_data[character_number].color_palette.size() > 0:
		var hex_color = characters_data[character_number].color_palette[0]
		icon.color = Color(hex_color)
	vbox.add_child(icon)
	
	# Select button
	var select_btn = Button.new()
	select_btn.text = "Select"
	select_btn.pressed.connect(func(): _on_card_selected(character_number))
	vbox.add_child(select_btn)
	
	return card

func _on_card_selected(character_number: int):
	selected_character = character_number
	update_character_info(character_number)

func update_character_info(character_number: int):
	if character_number >= characters_data.size():
		return
		
	var char_data = characters_data[character_number]
	
	character_name_label.text = char_data.name + " (" + str(character_number) + ")"
	
	var description = "[b]" + char_data.purity_designation + "[/b]\n\n"
	description += "[i]" + char_data.fractal_signature + "[/i]\n\n"
	description += "Frequency: " + char_data.frequency_resonance + "\n"
	description += "Playstyle: " + char_data.playstyle
	
	character_description.text = description
	
	abilities_list.clear()
	for ability in char_data.abilities:
		abilities_list.add_item(ability)
	
	select_button.disabled = false

func _on_select_pressed():
	if selected_character >= 0:
		character_selected.emit(selected_character)

