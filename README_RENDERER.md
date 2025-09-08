# Cosmic Helix Renderer

Static, offline canvas demo for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** — intersecting circles seed the grid (constants 3, 7, 9)
2. **Tree-of-Life scaffold** — 10 nodes with 22 connective paths
3. **Fibonacci curve** — logarithmic spiral sampled at 144 points
4. **Double-helix lattice** — two phase-shifted strands with 33 rungs

## Use
- Open `index.html` directly in any modern browser (no server required).
- Optional palette lives in `data/palette.json`; if missing, a calm fallback palette is used.

## ND-safe choices
- No animation, autoplay, or flashing.
- Gentle contrast with readable inks on dark background.
- Layered geometry preserves depth without motion.

## Numerology constants
Exposed in `index.html` as `NUM`: 3, 7, 9, 11, 22, 33, 99, 144.
