extends Control
class_name VesselUI

## Vessel UI - Beautiful, flowing interface
## High-end Japanese tech aesthetic

@onready var vessel_system: VesselSystem = get_node("/root/VesselSystem")
@onready var vessel_container: VBoxContainer = $VesselContainer

var vessel_cards: Dictionary = {}  # vessel_id -> VesselCard

func _ready():
	# Connect to vessel system signals
	if vessel_system:
		vessel_system.vessel_created.connect(_on_vessel_created)
		vessel_system.vessel_manifested.connect(_on_vessel_manifested)
	
	# Create UI for existing vessels
	update_vessel_ui()

func _on_vessel_created(vessel: Vessel):
	create_vessel_card(vessel)

func _on_vessel_manifested(vessel: Vessel, result: Dictionary):
	# Update vessel card with result
	if vessel_cards.has(vessel.id):
		vessel_cards[vessel.id].show_manifestation(result)

func create_vessel_card(vessel: Vessel):
	var card = preload("res://scenes/ui/VesselCard.tscn").instantiate()
	card.setup(vessel)
	vessel_container.add_child(card)
	vessel_cards[vessel.id] = card

func update_vessel_ui():
	if not vessel_system:
		return
	
	for vessel in vessel_system.vessels.values():
		create_vessel_card(vessel)

