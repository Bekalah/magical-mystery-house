shader_type canvas_item;
// Creative Vessel Tech - Crucible Shader
// Intense transformation (Sulfur/Wands)
// Dynamic aesthetic - high-end Japanese tech

uniform float energy_level : hint_range(0.0, 1.0) = 0.5;
uniform float transformation_rate : hint_range(0.0, 1.0) = 0.9;
uniform vec3 energy_color : source_color = vec3(1.0, 0.5, 0.1); // Orange-red (Sulfur)
uniform float intensity : hint_range(0.0, 2.0) = 1.0;

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    
    // Cosmic energy stream effect (flowing, minimal)
    float stream = sin(UV.x * 10.0 + TIME * transformation_rate * 2.0) * 0.5 + 0.5;
    stream *= energy_level;
    
    // Glowing orb effect at center
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(UV, center);
    float glow = 1.0 - smoothstep(0.0, 0.3, dist);
    glow *= energy_level;
    
    // Dynamic aesthetic - flowing energy
    vec3 energy = energy_color * stream * intensity;
    energy += energy_color * glow * 0.5;
    
    color.rgb += energy;
    
    // High-end Japanese tech - minimal, flowing
    color.rgb = mix(color.rgb, color.rgb + energy, 0.7);
    
    COLOR = color;
}

