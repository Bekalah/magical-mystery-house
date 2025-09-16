Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas demo for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** - intersecting circles seed the grid (3, 7, 9).
2. **Tree-of-Life scaffold** - 10 nodes with 22 connective paths.
3. **Fibonacci curve** - logarithmic spiral using 144 sampled points.
4. **Double-helix lattice** - two phase-shifted strands with 33 cross rungs.

## Usage
- Open `index.html` directly in any modern browser (double-click works offline).
- Optional: edit `data/palette.json` to adjust colors; if the file is missing or unreadable, the renderer shows a header notice and falls back to the safe palette.

## ND-safe choices
- No animation, autoplay, or flashing.
- Gentle contrast with readable inks on a dark background.
- Layer order preserves depth without motion.

## Numerology constants
The renderer exposes constants that echo Fibonacci and Tarot harmonics: 3, 7, 9, 11, 22, 33, 99, 144. Geometry helpers rely on these values for spacing, sampling, and lattice rhythm.
