shader_type canvas_item;

// Sacred Geometry Pattern
// 144:99 ratio patterns and golden ratio spirals

uniform float pattern_scale : hint_range(0.1, 10.0) = 1.0;
uniform float golden_ratio : hint_range(1.0, 2.0) = 1.618;
uniform float cathedral_ratio : hint_range(1.0, 2.0) = 1.455; // 144:99

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    
    // Create sacred geometry pattern
    vec2 scaled_uv = UV * pattern_scale;
    float pattern = sin(scaled_uv.x * golden_ratio) * cos(scaled_uv.y * cathedral_ratio);
    pattern = step(0.0, pattern); // Binary pattern
    
    // Blend pattern with base color
    color.rgb = mix(color.rgb, color.rgb * 1.5, pattern * 0.3);
    
    COLOR = color;
}
