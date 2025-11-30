#!/usr/bin/env python3
"""
Cathedral Art Systems - Traditional Style Generator
Implementing classical art techniques with mathematical precision
"""

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import math
import json
from pathlib import Path

class GoldenRatioPalette:
    """Generate palettes based on golden ratio proportions"""
    
    def __init__(self):
        self.golden_ratio = (1 + 5 ** 0.5) / 2
        
    def generate_palette(self, n=12, base_hue=0.0, saturation=0.8, lightness=0.6):
        """Generate golden ratio based color palette"""
        colors = []
        h = base_hue
        
        for i in range(n):
            h = (h + 1/self.golden_ratio) % 1
            # Convert HSL to RGB
            r, g, b = self._hsl_to_rgb(h, saturation, lightness)
            colors.append((int(r*255), int(g*255), int(b*255)))
            
        return colors
    
    def _hsl_to_rgb(self, h, s, l):
        """Convert HSL to RGB"""
        c = (1 - abs(2*l - 1)) * s
        x = c * (1 - abs((h * 6) % 2 - 1))
        m = l - c/2
        
        if h < 1/6:
            r, g, b = c, x, 0
        elif h < 2/6:
            r, g, b = x, c, 0
        elif h < 3/6:
            r, g, b = 0, c, x
        elif h < 4/6:
            r, g, b = 0, x, c
        elif h < 5/6:
            r, g, b = x, 0, c
        else:
            r, g, b = c, 0, x
            
        return r + m, g + m, b + m

class ChiaroscuroEngine:
    """Implement Caravaggio-style chiaroscuro lighting"""
    
    def __init__(self, width=800, height=600):
        self.width = width
        self.height = height
        
    def create_light_map(self, light_source=(0.3, 0.2), intensity=1.0):
        """Create a light intensity map"""
        img = Image.new('L', (self.width, self.height))
        pixels = img.load()
        
        for y in range(self.height):
            for x in range(self.width):
                # Normalize coordinates
                nx = x / self.width
                ny = y / self.height
                
                # Calculate distance from light source
                dist = math.sqrt((nx - light_source[0])**2 + (ny - light_source[1])**2)
                
                # Apply inverse square law with artistic modification
                light_val = intensity / (1 + dist * 3)
                light_val = max(0, min(1, light_val))
                
                pixels[x, y] = int(light_val * 255)
                
        return img
    
    def apply_chiaroscuro(self, base_image, light_map, contrast=1.5):
        """Apply chiaroscuro effect to base image"""
        # Convert to RGBA if not already
        if base_image.mode != 'RGBA':
            base_image = base_image.convert('RGBA')
            
        # Apply light map
        result = Image.new('RGBA', base_image.size)
        
        for y in range(base_image.height):
            for x in range(base_image.width):
                base_pixel = base_image.getpixel((x, y))
                light_val = light_map.getpixel((x, y)) / 255.0
                
                # Apply dramatic contrast
                light_val = light_val ** (1/contrast)
                
                new_pixel = tuple(int(c * light_val) for c in base_pixel[:3]) + (base_pixel[3],)
                result.putpixel((x, y), new_pixel)
                
        return result

class FrescoTexture:
    """Generate fresco-like texture and aging effects"""
    
    @staticmethod
    def create_aged_texture(width, height, grain_size=3, crack_density=0.02):
        """Create aged fresco texture"""
        # Base texture
        img = Image.new('RGBA', (width, height), (245, 240, 235, 255))
        
        # Add grain
        noise = np.random.randint(0, 20, (height, width, 3))
        grain_img = Image.fromarray(noise.astype('uint8'), 'RGB')
        grain_img = grain_img.filter(ImageFilter.GaussianBlur(radius=grain_size))
        
        # Blend grain with base
        img = Image.blend(img.convert('RGB'), grain_img, 0.1)
        
        # Add cracks
        draw = ImageDraw.Draw(img)
        num_cracks = int(width * height * crack_density / 10000)
        
        for _ in range(num_cracks):
            x1 = np.random.randint(0, width)
            y1 = np.random.randint(0, height)
            length = np.random.randint(10, 50)
            angle = np.random.uniform(0, 2 * math.pi)
            
            x2 = x1 + int(length * math.cos(angle))
            y2 = y1 + int(length * math.sin(angle))
            
            draw.line([(x1, y1), (x2, y2)], fill=(210, 200, 190), width=1)
            
        return img.convert('RGBA')

class MedievalPerspective:
    """Implement medieval and early Renaissance perspective systems"""
    
    @staticmethod
    def create_perspective_grid(width, height, vanishing_point=(0.5, 0.4), grid_density=20):
        """Create perspective construction grid"""
        img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        vp_x = vanishing_point[0] * width
        vp_y = vanishing_point[1] * height
        
        # Horizontal lines (orthogonals to vanishing point)
        for i in range(0, height, grid_density):
            draw.line([(0, i), (vp_x, vp_y)], fill=(100, 100, 100, 128), width=1)
            draw.line([(width, i), (vp_x, vp_y)], fill=(100, 100, 100, 128), width=1)
            
        # Vertical lines
        for i in range(0, width, grid_density):
            draw.line([(i, 0), (i, height)], fill=(100, 100, 100, 128), width=1)
            
        return img

class TraditionalArtGenerator:
    """Main class coordinating all traditional art systems"""
    
    def __init__(self):
        self.palette_gen = GoldenRatioPalette()
        self.chiaroscuro = ChiaroscuroEngine()
        
    def generate_master_study(self, style="renaissance", width=800, height=600):
        """Generate art in traditional style"""
        
        if style == "renaissance":
            return self._generate_renaissance_study(width, height)
        elif style == "baroque":
            return self._generate_baroque_study(width, height)
        elif style == "fresco":
            return self._generate_fresco_study(width, height)
        else:
            raise ValueError(f"Style '{style}' not implemented")
    
    def _generate_renaissance_study(self, width, height):
        """Generate Renaissance-style study"""
        # Create base composition
        base = Image.new('RGB', (width, height), (240, 235, 220))
        
        # Add perspective grid
        perspective = MedievalPerspective.create_perspective_grid(width, height)
        base.paste(perspective, (0, 0), perspective)
        
        # Generate golden ratio palette
        palette = self.palette_gen.generate_palette(8, base_hue=0.1, saturation=0.6, lightness=0.4)
        
        # Add geometric forms with golden ratio proportions
        draw = ImageDraw.Draw(base)
        
        # Golden rectangle
        gr = self.palette_gen.golden_ratio
        rect_width = width // 3
        rect_height = int(rect_width / gr)
        x = (width - rect_width) // 2
        y = (height - rect_height) // 2
        
        draw.rectangle([x, y, x + rect_width, y + rect_height], 
                      fill=palette[0], outline=palette[1], width=3)
        
        return base
    
    def _generate_baroque_study(self, width, height):
        """Generate Baroque-style study with dramatic chiaroscuro"""
        # Create base
        base = Image.new('RGB', (width, height), (40, 30, 20))
        
        # Generate dramatic lighting
        light_map = self.chiaroscuro.create_light_map((0.2, 0.3), intensity=1.5)
        
        # Add forms and apply chiaroscuro
        draw = ImageDraw.Draw(base)
        
        # Create some basic forms
        draw.ellipse([width//4, height//4, 3*width//4, 3*height//4], 
                    fill=(120, 100, 80))
        
        # Apply chiaroscuro effect
        base_rgba = base.convert('RGBA')
        result = self.chiaroscuro.apply_chiaroscuro(base_rgba, light_map, contrast=2.0)
        
        return result
    
    def _generate_fresco_study(self, width, height):
        """Generate fresco-style study"""
        # Create aged texture base
        base = FrescoTexture.create_aged_texture(width, height)
        
        # Add simple geometric forms
        draw = ImageDraw.Draw(base)
        palette = self.palette_gen.generate_palette(6, base_hue=0.05, saturation=0.5, lightness=0.7)
        
        # Simple architectural forms
        draw.rectangle([width//6, height//3, 5*width//6, 2*height//3], 
                      fill=palette[0], outline=palette[1], width=2)
        
        return base

def main():
    """Generate sample traditional art studies"""
    generator = TraditionalArtGenerator()
    
    # Create output directory
    output_dir = Path("generated_art")
    output_dir.mkdir(exist_ok=True)
    
    # Generate studies in different styles
    styles = ["renaissance", "baroque", "fresco"]
    
    for style in styles:
        print(f"Generating {style} study...")
        artwork = generator.generate_master_study(style, 800, 600)
        artwork.save(output_dir / f"{style}_study.png")
        
        # Also generate palette
        palette = generator.palette_gen.generate_palette(12)
        palette_img = Image.new('RGB', (400, 40*len(palette)))
        draw = ImageDraw.Draw(palette_img)
        
        for i, color in enumerate(palette):
            draw.rectangle([0, i*40, 400, (i+1)*40], fill=color)
            
        palette_img.save(output_dir / f"{style}_palette.png")
    
    print(f"Generated art studies saved to {output_dir}")

if __name__ == "__main__":
    main()