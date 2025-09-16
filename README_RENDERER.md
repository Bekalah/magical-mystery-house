Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas demo for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** - intersecting circles seed the grid (3, 7, 9)
2. **Tree-of-Life scaffold** - 10 nodes with 22 connective paths
3. **Fibonacci curve** - logarithmic spiral using 144 sampled points
4. **Double-helix lattice** - two phase-shifted strands with 33 cross rungs

## Usage
- Open `index.html` directly in any modern browser.
- Optional: edit `data/palette.json` to change colors. If the file cannot be loaded (common when opening via the `file://` protocol), the script logs a gentle status and falls back to the bundled palette.

## ND-safe choices
- No animation, autoplay, or flashing.
- Gentle contrast with readable inks on dark background.
- Layer order preserves depth without motion.
- Comments inside the renderer explain the trauma-informed choices for each layer.

## Numerology constants
The renderer uses constants that echo Fibonacci and Tarot harmonics: 3, 7, 9, 11, 22, 33, 99, and 144. They are defined in `index.html` and passed into the renderer to keep geometry parameterized.
