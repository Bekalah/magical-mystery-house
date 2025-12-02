extends Panel
class_name VesselCard

## Vessel Card UI - Beautiful, minimal, flowing
## High-end Japanese tech aesthetic

@onready var title_label: Label = $VBoxContainer/Title
@onready var type_label: Label = $VBoxContainer/Type
@onready var energy_bar: ProgressBar = $VBoxContainer/EnergyBar
@onready var state_label: Label = $VBoxContainer/State
@onready var flow_label: Label = $VBoxContainer/Flow

var vessel: VesselSystem.Vessel

func setup(v: VesselSystem.Vessel):
	vessel = v
	update_display()

func update_display():
	if not vessel:
		return
	
	title_label.text = vessel.name
	type_label.text = "Type: %s" % VesselSystem.VesselType.keys()[vessel.type]
	energy_bar.value = vessel.current_energy
	state_label.text = "State: %s" % VesselSystem.VesselState.keys()[vessel.state]
	flow_label.text = "Flow: %.2f" % vessel.creative_flow
	
	# Update colors based on aesthetic (high-end Japanese tech)
	match vessel.aesthetic:
		"harmonious":
			modulate = Color(1.0, 1.0, 1.0, 1.0)  # Pure, balanced
		"flowing":
			modulate = Color(0.95, 0.98, 1.0, 1.0)  # Soft, flowing
		"minimal":
			modulate = Color(1.0, 1.0, 1.0, 0.95)  # Clean, minimal
		"dynamic":
			modulate = Color(1.0, 0.98, 0.95, 1.0)  # Warm, dynamic

func show_manifestation(result: Dictionary):
	# Beautiful animation for manifestation
	var tween = create_tween()
	tween.tween_property(self, "modulate", Color(1.0, 1.0, 0.5, 1.0), 0.3)
	tween.tween_property(self, "modulate", Color(1.0, 1.0, 1.0, 1.0), 0.3)
	
	# Update display
	update_display()

