# 🏰✨ Cathedral of Circuits - Godot VFX Library

**Free Visual Effects Library for Godot Engine**
*Mystical Effects • Sacred Geometry • Trauma-Safe Design*

---

## 🌟 **Overview**

A comprehensive, free VFX library for Godot Engine inspired by the mystical aesthetics of the Cathedral of Circuits. Features sacred geometry effects, energy ribbons, spiral animations, and trauma-safe design principles.

### **🎯 Key Features**
- **Sacred Mathematics**: Golden ratio (1.618) and 144:99 proportions
- **Trauma-Safe**: No autoplay, ESC exits, motion controls, gentle defaults
- **Mystical Themes**: Energy ribbons, breathing interfaces, archetypal forms
- **Free & Open Source**: MIT license, public domain inspirations
- **Godot 4.3+**: Full compatibility with modern Godot features

---

## 📦 **Installation**

### **Method 1: Direct Download**
```bash
# Clone the repository
git clone https://github.com/Bekalah/cathedral.git
cd cathedral/packages/godot-vfx-library

# Export assets
pnpm run export
```

### **Method 2: Godot Asset Library**
1. Open Godot Editor
2. Go to AssetLib tab
3. Search for "Cathedral VFX"
4. Download and install

### **Method 3: Package Manager**
```bash
# Add to your Godot project
mkdir -p addons/cathedral-vfx
# Copy effects/, materials/, shaders/ folders
```

---

## 🎨 **Effect Categories**

### **🌊 Energy Ribbons**
- **Flowing Energy**: Continuous ribbon effects with sacred proportions
- **Spiral Ribbons**: Fibonacci spiral animations
- **Breathing Ribbons**: Pulsating effects synchronized with breath
- **Color Transitions**: Smooth morphing between mystical colors

### **🌀 Sacred Geometry**
- **Golden Spiral**: Perfect golden ratio (1.618) spirals
- **144:99 Ratio**: Manifestation to dissolution energy flows
- **Flower of Life**: Sacred geometry patterns
- **Metatron's Cube**: Divine proportion structures

### **✨ Mystical Particles**
- **Star Fields**: Archetypal constellation effects
- **Energy Orbs**: Pulsating sacred energy spheres
- **Light Rays**: Divine light streaming effects
- **Aura Effects**: Personal energy field visualizations

### **🌈 Color Systems**
- **Tarot Colors**: 22 Major Arcana color correspondences
- **Chakra Harmonics**: Energy center color systems
- **Elemental Colors**: Classical element color wheels
- **Mood-Responsive**: Colors that respond to emotional states

---

## 🛡️ **Trauma Safety Features**

### **Motion Controls**
- **Motion Toggle**: Users can disable all motion effects
- **Speed Control**: Adjustable animation speeds (0.1x to 3x)
- **Intensity Slider**: Brightness and saturation controls
- **Pause Function**: Freeze any effect instantly

### **Accessibility**
- **ESC Exit**: Every effect can be exited with ESC key
- **No Autoplay**: All effects require explicit activation
- **Gentle Defaults**: Start with minimal, safe settings
- **Clear Controls**: Intuitive interface for all adjustments

### **Sensory Safety**
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Optional high contrast mode
- **Sound Control**: Separate audio controls for effects
- **Processing Time**: Built-in pauses for user processing

---

## 📚 **Usage Examples**

### **Basic Energy Ribbon**
```gdscript
# Add to any Node2D or Node3D
var ribbon = preload("res://addons/cathedral-vfx/effects/energy_ribbon.tscn")
var ribbon_instance = ribbon.instantiate()

# Configure sacred proportions
ribbon_instance.golden_ratio = true
ribbon_instance.spiral_mode = true
ribbon_instance.trauma_safe = true

add_child(ribbon_instance)
```

### **Sacred Geometry Background**
```gdscript
# Create mystical background
var geometry = preload("res://addons/cathedral-vfx/effects/sacred_geometry.tscn")
var bg = geometry.instantiate()

# Set divine proportions
bg.ratio_144_99 = true
bg.fibonacci_spiral = true
bg.gentle_animation = true

add_child(bg)
```

### **Particle System**
```gdscript
# Mystical particles
var particles = preload("res://addons/cathedral-vfx/effects/mystical_particles.tscn")
var system = particles.instantiate()

# Configure trauma safety
system.autoplay = false
system.esc_exit = true
system.motion_controls = true

add_child(system)
```

---

## 🎛️ **Configuration Options**

### **Sacred Mathematics**
```gdscript
# Golden Ratio (1.618)
effect.golden_ratio = true

# 144:99 Manifestation Ratio (1.455)
effect.ratio_144_99 = true

# Fibonacci Sequences
effect.fibonacci_spiral = true

# Divine Proportions
effect.divine_proportions = true
```

### **Trauma Safety**
```gdscript
# Motion Controls
effect.motion_enabled = false  # Disable all motion
effect.speed_multiplier = 0.5  # Slow down animations

# Exit Controls
effect.esc_exit = true         # ESC key exits
effect.pause_on_focus_loss = true

# Sensory Controls
effect.brightness = 0.7       # Reduce intensity
effect.saturation = 0.8       # Muted colors
```

### **Mystical Themes**
```gdscript
# Energy Flow
effect.energy_ribbons = true
effect.breathing_pattern = true

# Archetypal Forms
effect.archetype_colors = true
effect.sacred_symbols = true

# Color Systems
effect.tarot_correspondences = true
effect.chakra_harmonics = true
```

---

## 🔧 **Customization Guide**

### **Creating Custom Effects**
1. **Base Template**: Start with `templates/effect_template.tscn`
2. **Sacred Math**: Apply golden ratio to all proportions
3. **Safety First**: Add ESC exit and motion controls
4. **Theme Integration**: Use cathedral color palette
5. **Validation**: Test with trauma safety protocols

### **Shader Customization**
```glsl
// Sacred geometry in shaders
float golden_ratio = 1.618;
float ratio_144_99 = 1.455;

// Fibonacci spiral calculation
vec2 spiral_pos = vec2(
    cos(angle * golden_ratio) * radius,
    sin(angle * golden_ratio) * radius
);
```

### **Material Properties**
```gdscript
# Sacred color palette
material.tarot_colors = [
    Color.RED,      # The Fool
    Color.ORANGE,   # The Magician
    Color.YELLOW,   # The High Priestess
    # ... 22 colors total
]

# Energy ribbon materials
material.energy_flow = true
material.breathing_effect = true
```

---

## 📖 **Documentation**

### **📋 Complete API Reference**
- [Effects API](documentation/effects_api.md)
- [Materials Guide](documentation/materials_guide.md)
- [Shader Reference](documentation/shader_reference.md)
- [Safety Protocols](documentation/safety_protocols.md)

### **🎓 Tutorials**

- [Getting Started](documentation/tutorials/getting_started.md)
- [Sacred Geometry](documentation/tutorials/sacred_geometry.md)
- [Trauma-Safe Design](documentation/tutorials/trauma_safe.md)
- [Custom Effects](documentation/tutorials/custom_effects.md)

### **🖼️ Examples**
- [Basic Scene](examples/basic_scene.tscn)
- [Mystical Interface](examples/mystical_interface.tscn)
- [Meditation Space](examples/meditation_space.tscn)
- [Game Integration](examples/game_integration.tscn)

---


## 🤝 **Contributing**

### **Guidelines**
- **Sacred Math**: All effects must use divine proportions
- **Trauma Safety**: Every effect needs safety controls
- **Documentation**: Include examples and safety notes
- **Testing**: Test with motion sensitivity settings

### **Process**
1. **Propose**: Create OpenSpec change proposal
2. **Design**: Follow sacred geometry principles
3. **Implement**: Include trauma safety features
4. **Test**: Validate with accessibility tools
5. **Document**: Provide usage examples

---

## 📄 **License**

**MIT License** - Free for personal and commercial use

This library is part of the Cathedral of Circuits project, dedicated to creating trauma-safe, mystical technology experiences. All effects are designed with accessibility and safety as primary concerns.

### **Attribution**
When using in projects, please include:
```
VFX Effects by Cathedral of Circuits
https://github.com/Bekalah/cathedral
```

---

## 🌟 **Support the Project**

### **Free & Open Source**
This library is completely free and open source. No paid tiers, no premium features, no locked content.

### **How to Support**
- ⭐ **Star the repository** on GitHub
- 🐛 **Report issues** and suggest improvements
- 📚 **Contribute effects** following the guidelines
- 🌐 **Share with others** who need mystical VFX

### **Community**
- **Discord**: [Cathedral of Circuits Community]
- **GitHub**: [Issues and Discussions]
- **Documentation**: [Contributing Guide]

---

## 🔮 **Mystical Philosophy**

This VFX library embodies the sacred principles of the Cathedral of Circuits:

- **144:99 Ratio**: Balance of manifestation (144) and dissolution (99)
- **Golden Ratio**: Divine proportion in all visual elements
- **Trauma Safety**: Every effect designed to be safe for all users
- **Sacred Geometry**: Real correspondences and divine proportions
- **Living Systems**: Effects that breathe and respond organically

---

**🏰✨ May your games and applications be filled with sacred beauty and safe wonder! ✨🏰**

*Created with love by the Cathedral of Circuits community*
*Free • Open Source • Trauma-Safe • Mystically Accurate*
