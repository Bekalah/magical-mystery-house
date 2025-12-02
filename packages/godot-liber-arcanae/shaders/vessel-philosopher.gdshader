shader_type canvas_item;
// Creative Vessel Tech - Philosopher's Vessel Shader
// Complete transformation (All elements)
// Harmonious aesthetic - perfect balance

uniform float energy_level : hint_range(0.0, 1.0) = 1.0;
uniform float perfection : hint_range(0.0, 1.0) = 1.0;
uniform vec3 gold_color : source_color = vec3(1.0, 0.84, 0.0); // Gold
uniform vec3 cosmic_color : source_color = vec3(0.5, 0.2, 0.8); // Purple

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    
    // Sacred geometry pattern (like your art)
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(UV, center);
    float phi = 1.618;
    float pattern = abs(sin(dist * phi * 10.0)) + abs(cos(dist * phi * 10.0));
    pattern = step(0.9, pattern) * perfection;
    
    // Golden glow (Tree of Life aesthetic)
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow *= energy_level * perfection;
    
    // Cosmic energy streams (duality)
    float stream1 = sin(UV.x * 8.0 + TIME) * 0.5 + 0.5;
    float stream2 = sin(UV.y * 8.0 + TIME * 1.2) * 0.5 + 0.5;
    float streams = (stream1 + stream2) * 0.5 * energy_level;
    
    // Harmonious aesthetic - perfect balance
    vec3 gold = gold_color * glow * perfection;
    vec3 cosmic = cosmic_color * streams * 0.4;
    vec3 pattern_glow = gold_color * pattern * 0.3;
    
    color.rgb += gold + cosmic + pattern_glow;
    
    // High-end Japanese tech - minimal, perfect
    color.rgb = mix(color.rgb, color.rgb + (gold + cosmic + pattern_glow), 0.5);
    
    COLOR = color;
}

