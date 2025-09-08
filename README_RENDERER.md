# Cosmic Helix Renderer

Static, offline canvas demo for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** — intersecting circles seed the grid (constants 3,7,9).
2. **Tree-of-Life scaffold** — 10 nodes and 22 connective paths.
3. **Fibonacci curve** — logarithmic spiral using 144 sampled points.
4. **Double-helix lattice** — two phase-shifted strands with 33 cross rungs.

## Use
- Open `index.html` directly in any modern browser.
- Optional: edit `data/palette.json` to change colors (file is read locally; if removed, a calm fallback palette is used).

## ND-safe choices
- No animation, autoplay, or flashing.
- Gentle contrast with readable inks on dark background.
- Layered geometry respects depth without relying on motion.

## Numerology constants
Constants are exposed in `index.html` as `NUM` and feed the renderer. Values: 3, 7, 9, 11, 22, 33, 99, 144.
