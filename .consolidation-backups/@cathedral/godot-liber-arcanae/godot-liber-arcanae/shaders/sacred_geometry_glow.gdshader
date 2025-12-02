shader_type canvas_item;

// Sacred Geometry Glow - For mystical/alchemical themes
uniform float glow_strength : hint_range(0.0, 2.0) = 1.0;
uniform vec3 glow_color : source_color = vec3(0.5, 0.8, 1.0);
uniform float glow_threshold : hint_range(0.0, 1.0) = 0.7;

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    // Glow effect for bright areas (mystical energy)
    vec4 glow = vec4(0.0);
    if (brightness > glow_threshold) {
        float glow_intensity = (brightness - glow_threshold) / (1.0 - glow_threshold);
        glow = vec4(glow_color, 1.0) * glow_strength * glow_intensity;
    }
    
    COLOR = color + glow;
}

