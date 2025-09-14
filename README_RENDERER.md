Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas demo for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** — intersecting circles seed the grid (3, 7, 9)
2. **Tree-of-Life scaffold** — 10 nodes with 22 connective paths
3. **Fibonacci curve** — logarithmic spiral using 144 sampled points
4. **Double-helix lattice** — two phase-shifted strands with 33 cross rungs
1. **Vesica field** — intersecting circles seed the grid (3, 7, 9).
2. **Tree-of-Life scaffold** — 10 nodes with 22 connective paths.
3. **Fibonacci curve** — logarithmic spiral using 144 sampled points.
4. **Double-helix lattice** — two phase-shifted strands with 33 cross rungs.

## Usage
- Open `index.html` directly in any modern browser.
- Optional: edit `data/palette.json` to change colors; if missing, a calm fallback palette is used and the header shows a notice.

## ND-safe choices
- No animation, autoplay, or flashing.
- Gentle contrast with readable inks on dark background.
- Layer order preserves depth without motion.

## Numerology constants
Constants exposed in `index.html` as `NUM` feed the geometry: 3, 7, 9, 11, 22, 33, 99, 144.
The renderer uses constants that echo Fibonacci and Tarot harmonics: 3, 7, 9, 11, 22, 33, 99, 144.
