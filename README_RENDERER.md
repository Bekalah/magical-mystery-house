Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas renderer for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers (depth-ordered)
1. **Vesica field** — intersecting circles seed the grid using 3 · 7 · 9 spacing.
2. **Tree-of-Life scaffold** — ten sephirot with 22 connective paths and soft halos.
3. **Fibonacci curve** — logarithmic spiral traced with 144 samples for gentle flow.
4. **Double helix** — two strands (99 sample points each) bridged by 33 rungs.

## Offline usage
- Double-click `index.html`. Any modern browser renders the canvas locally without a server.
- Optional: edit `data/palette.json` to retune hues. If the file is absent, the renderer shows a calm inline notice and uses the bundled ND-safe fallback.

## ND-safe choices
- No animation, autoplay, or flashing; each layer draws once.
- Gentle contrast with readable inks on a dark backdrop, maintaining layered depth.
- Geometry order preserves dimensionality without motion, honoring trauma-informed stillness.

## Numerology constants
`index.html` exposes constants requested for the cosmology stack: 3, 7, 9, 11, 22, 33, 99, 144. Every geometry helper receives these values so spacing, sampling, and lattice rhythm remain aligned with Cathedral lore.

## Provenance metadata
`index.html` annotates the canvas element with a small JSON payload describing canon, layer names, ND-safe status, and numerology set. This keeps provenance offline-first with no external dependencies.
