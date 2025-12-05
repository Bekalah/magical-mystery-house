shader_type canvas_item;

// Dragon/Fairy Combo Theme
// Combines fire (dragon) and ethereal (fairy) effects

uniform float fire_intensity : hint_range(0.0, 1.0) = 0.5;
uniform float fairy_intensity : hint_range(0.0, 1.0) = 0.5;
uniform vec3 fire_color : source_color = vec3(1.0, 0.3, 0.0);
uniform vec3 fairy_color : source_color = vec3(0.5, 0.8, 1.0);

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    
    // Fire effect (dragon theme)
    float fire_noise = sin(UV.x * 10.0 + TIME * 2.0) * cos(UV.y * 10.0 + TIME * 1.5);
    vec3 fire_effect = fire_color * fire_intensity * (fire_noise * 0.5 + 0.5);
    
    // Fairy effect (ethereal glow)
    float fairy_glow = sin(UV.x * 5.0 + TIME) * sin(UV.y * 5.0 + TIME * 0.7);
    vec3 fairy_effect = fairy_color * fairy_intensity * (fairy_glow * 0.5 + 0.5);
    
    // Blend both effects
    color.rgb += fire_effect + fairy_effect;
    
    COLOR = color;
}
