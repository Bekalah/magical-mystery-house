shader_type canvas_item;

// Alchemical Transformation Shader
// Color shifting effects for transformation sequences
uniform float transformation_progress : hint_range(0.0, 1.0) = 0.0;
uniform vec3 base_color : source_color = vec3(1.0, 0.8, 0.5); // Gold
uniform vec3 target_color : source_color = vec3(0.5, 0.3, 1.0); // Purple

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    
    // Interpolate between base and target color based on transformation
    vec3 transformed_color = mix(base_color, target_color, transformation_progress);
    
    // Add pulsing effect (breathing animation - trauma-aware)
    float pulse = sin(TIME * 2.0) * 0.1 + 1.0;
    color.rgb *= transformed_color * pulse;
    
    COLOR = color;
}

