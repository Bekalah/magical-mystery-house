# Cosmic Helix Renderer

Static HTML + Canvas tool for visualizing layered sacred geometry.

## Usage
1. Open `index.html` directly in any modern browser (no server required).
2. The renderer draws four layers on a 1440x900 canvas:
   - Vesica field
   - Tree-of-Life scaffold
   - Fibonacci curve
   - Static double-helix lattice

If `data/palette.json` is missing, a calm fallback palette is used and a notice appears in the header.

## Notes on ND-safety
- No animation, autoplay, or motion.
- Colors maintain gentle contrast for readability in low-light settings.
- Layers are ordered to preserve depth without flattening the geometry.

## Development
The code lives in `js/helix-renderer.mjs` and uses ES modules with no dependencies. Geometry routines rely on numerological constants (3,7,9,11,22,33,99,144) for proportions.
