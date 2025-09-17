Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas demo for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** — intersecting circles seed the grid (3, 7, 9)
2. **Tree-of-Life scaffold** — 10 nodes with 22 connective paths
3. **Fibonacci curve** — logarithmic spiral using 144 sampled points
4. **Double-helix lattice** — two phase-shifted strands with 33 cross rungs

## Usage
- Open `index.html` directly in any modern browser (offline-first).
- Optional: edit `data/palette.json` to change colors; if the file is missing the header shows a calm fallback notice and the default palette is used.

## ND-safe choices
- No animation, autoplay, or flashing; every layer renders once.
- Gentle contrast with readable inks on dark background; palette overrides stay ND-safe via sane defaults.
- Layer order preserves depth without motion so the geometry feels dimensional yet steady.

## Numerology constants
The renderer exposes constants (3, 7, 9, 11, 22, 33, 99, 144) in `index.html` as `NUM` so each geometric routine remains grounded in the requested harmonics.
