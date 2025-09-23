Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas demo for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** - intersecting circles seed the grid (3, 7, 9).
2. **Tree-of-Life scaffold** - 10 nodes with 22 connective paths.
3. **Fibonacci curve** - logarithmic spiral using 144 sampled points.
4. **Double-helix lattice** - two phase-shifted strands with 33 cross rungs.
1. **Vesica field** — intersecting circles seed the grid (3, 7, 9)
2. **Tree-of-Life scaffold** — 10 nodes with 22 connective paths
3. **Fibonacci curve** — logarithmic spiral using 144 sampled points
4. **Double-helix lattice** — two phase-shifted strands with 33 cross rungs

## Usage
- Open `index.html` directly in any modern browser (double-click works offline).
- Optional: edit `data/palette.json` to adjust colors; if the file is missing or unreadable, the renderer shows a header notice and falls back to the safe palette.

## ND-safe choices
- No animation, autoplay, or flashing.
- Gentle contrast with readable inks on a dark background.
- Layer order preserves depth without motion.

## Numerology constants
The renderer exposes constants that echo Fibonacci and Tarot harmonics: 3, 7, 9, 11, 22, 33, 99, 144. Geometry helpers rely on these values for spacing, sampling, and lattice rhythm.
The renderer uses constants that echo Fibonacci and Tarot harmonics: 3, 7, 9, 11, 22, 33, 99, 144.
Constants exposed in `index.html` as `NUM` feed the geometry: 3, 7, 9, 11, 22, 33, 99, 144.
Static, offline canvas render of layered sacred geometry. The scene now reflects a calmer, Fly-ready stack with luminous blues inspired by the provided artwork.

## Layers (Depth-Ordered)
1. **Vesica field** — Intersecting circles (3, 7, 9 ratios) with additive glow.
2. **Tree-of-Life scaffold** — 10 sephirot and 22 connective paths, haloed for depth.
3. **Fibonacci curve** — Logarithmic spiral traced with 144 samples and gentle gradient.
4. **Double helix** — Two strands (99 points each) with 33 rungs, phase-shifted but static.

## Offline Usage
- Double-click `index.html`. A modern browser is enough; no server is required.
- If `data/palette.json` cannot be fetched (common when running via `file://`), the header and canvas display a soft inline notice and a safe fallback palette.
- The render always respects ND-safe constraints: no motion, readable contrast, trauma-informed comments inside `js/helix-renderer.mjs`.

## Palette Tuning
- Primary colors live in `data/palette.json`. Edit the hex values to adjust the zen aura.
- The script attempts to load this file locally. When it fails, bundled tones (same harmony) keep the scene consistent.

## Fly.io Transition Notes
- Netlify-specific files have been retired to simplify the repository for Fly.io.
- A new `fly.toml` config pairs with the lightweight `flyio/static` image, serving the project as plain files.
- Suggested steps (no automated workflows):
  1. Install the Fly CLI: `curl -L https://fly.io/install.sh | sh` (requires network access once).
  2. Authenticate locally: `fly auth login`.
  3. Update the `app` name inside `fly.toml` if desired.
  4. Deploy from the repo root: `fly launch --no-deploy --copy-config` (creates the app without changing files), then `fly deploy`.
  5. Verify by visiting the Fly-provided URL; everything is static so scaling stays minimal.

## Numerology Constants
The renderer keeps these anchors in `index.html` to encode sacred ratios: 3, 7, 9, 11, 22, 33, 99, 144. They pass directly into the drawing routines for clarity.

## Why This Stays ND-Safe
- Still gradients evoke breath without animation or flicker.
- Luminous halos provide layered geometry (never flat) inspired by the shared mandalas.
- Canvas notices replace pop-ups to avoid startle.
- No build tooling, bundlers, or workflows — everything remains offline-first and transparent.

## Provenance Encoding
- `index.html` embeds the Cathedral Visionary provenance JSON directly onto the canvas element.
- This satisfies the Rosslyn ruleset requirement for metadata without introducing network calls or extra tooling.
