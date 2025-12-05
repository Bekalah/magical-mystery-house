shader_type canvas_item;

// Cel Shading
// Hard-edged shading for anime/cartoon style

void fragment() {
    vec4 color = texture(TEXTURE, UV);
    float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = step(0.5, brightness) * vec3(1.0) + (1.0 - step(0.5, brightness)) * color.rgb * 0.5;
    COLOR = color;
}
