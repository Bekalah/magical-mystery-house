@tool
extends Node2D

# 🏰✨ Cathedral of Circuits - Sacred Geometry VFX
# Trauma-safe mystical geometry effects with divine proportions

@export var golden_ratio: bool = true
@export var ratio_144_99: bool = false
@export var fibonacci_spiral: bool = true
@export var flower_of_life: bool = false
@export var metatron_cube: bool = false

# Trauma Safety Settings
@export var trauma_safe: bool = true
@export var motion_enabled: bool = true
@export var speed_multiplier: float = 1.0
@export var esc_exit: bool = true

# Sacred Mathematics Constants
const GOLDEN_RATIO = 1.618033988749
const RATIO_144_99 = 1.454545454545
const TAU = 6.28318530718

var time: float = 0.0
var animation_speed: float = 1.0
var paused: bool = false

func _ready():
    # Set up trauma-safe defaults
    if trauma_safe:
        motion_enabled = false  # Start with motion disabled
