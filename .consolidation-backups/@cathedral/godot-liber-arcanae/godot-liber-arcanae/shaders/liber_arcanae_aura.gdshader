shader_type canvas_item;

// Liber Arcanae Character Aura Shader
// Each of the 22 Major Arcana has unique frequency resonance and color
uniform int arcana_number : hint_range(0, 21) = 0;
uniform float aura_strength : hint_range(0.0, 2.0) = 1.0;
uniform float frequency_resonance : hint_range(0.1, 1000.0) = 528.0;

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    
    // Each arcana has unique frequency and color
    // Frequency affects the pulsing rate (sacred mathematics)
    float pulse = sin(TIME * frequency_resonance * 0.01) * 0.3 + 1.0;
    
    // Arcana-specific color shifts (based on arcana number)
    // Uses golden ratio and sacred geometry for color distribution
    float hue_shift = float(arcana_number) / 21.0;
    vec3 arcana_color = vec3(
        sin(hue_shift * 6.28) * 0.5 + 0.5,
        sin((hue_shift + 0.33) * 6.28) * 0.5 + 0.5,
        sin((hue_shift + 0.66) * 6.28) * 0.5 + 0.5
    );
    
    // Apply aura with pulsing effect
    color.rgb = mix(color.rgb, arcana_color, aura_strength * 0.2 * pulse);
    
    COLOR = color;
}

