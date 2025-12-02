shader_type canvas_item;
// Creative Vessel Tech - Alembic Shader
// Distillation (Mercury/Cups)
// Flowing aesthetic - harmonious

uniform float energy_level : hint_range(0.0, 1.0) = 0.5;
uniform float flow : hint_range(0.0, 1.0) = 0.8;
uniform vec3 liquid_color : source_color = vec3(0.2, 0.6, 0.9); // Blue (Mercury)
uniform float purity : hint_range(0.0, 1.0) = 0.8;

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    
    // Flowing liquid effect (harmonious, beautiful)
    float wave = sin(UV.y * 8.0 + TIME * flow) * 0.3 + 0.7;
    wave *= energy_level;
    
    // Distillation bubbles
    float bubbles = fract(sin(UV.x * 50.0 + UV.y * 50.0 + TIME * 2.0) * 1000.0);
    bubbles = step(0.95, bubbles) * energy_level;
    
    // Glowing orb effect (like your art)
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(UV, center);
    float glow = 1.0 - smoothstep(0.0, 0.4, dist);
    glow *= energy_level * purity;
    
    // Flowing aesthetic - optimal flow
    vec3 liquid = liquid_color * wave * flow;
    liquid += vec3(1.0) * bubbles * 0.5;
    liquid += liquid_color * glow * 0.6;
    
    color.rgb = mix(color.rgb, color.rgb + liquid, 0.6);
    
    COLOR = color;
}

