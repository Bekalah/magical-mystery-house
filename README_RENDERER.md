Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

Static, offline canvas renderer for layered sacred geometry. No build step, no network calls, ND-safe by design.

## Layers
1. **Vesica field** - intersecting circles seed the grid (3, 7, 9).
2. **Tree-of-Life scaffold** - 10 nodes with 22 connective paths.
3. **Fibonacci curve** - logarithmic spiral using 144 sampled points.
4. **Double-helix lattice** - two phase-shifted strands with 33 cross rungs.
1. **Vesica field** — intersecting circles seed the grid (3, 7, 9)
2. **Tree-of-Life scaffold** — 10 nodes with 22 connective paths
3. **Fibonacci curve** — logarithmic spiral using 144 sampled points
4. **Double-helix lattice** — two phase-shifted strands with 33 cross rungs
1. **Vesica field** - intersecting circles seed the grid (3, 7, 9)
2. **Tree-of-Life scaffold** - 10 nodes with 22 connective paths
3. **Fibonacci curve** - logarithmic spiral using 144 sampled points
4. **Double-helix lattice** - two phase-shifted strands with 33 cross rungs

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
Static, offline canvas render of layered sacred geometry. The scene remains motionless yet dimensional, reflecting vesica fields, Tree-of-Life scaffolding, Fibonacci curvature, and a still double helix lattice.

## Layers (Depth-Ordered)
1. **Vesica field** — Intersecting circles woven with 3 · 7 · 9 spacing, additive glow for depth.
2. **Tree-of-Life scaffold** — Ten sephirot with halos plus 22 connective paths.
3. **Fibonacci curve** — Logarithmic spiral traced with 144 samples for gentle flow.
4. **Double helix** — Two strands (99 sample points each) bridged by 33 rungs.

## Offline Usage
- Double-click `index.html`. A browser renders the canvas locally — no server or build step.
- If `data/palette.json` cannot be read (common via `file://`), the header shows a fallback note and the renderer paints with bundled ND-safe tones while logging the notice inline.
- Canvas metadata embeds the Cathedral Visionary provenance JSON for traceability without network calls.

## Palette Tuning
- Edit `data/palette.json` to retune layers. Each entry mirrors the numerology stack and keeps AA+ contrast.
- Absent palette files trigger a bundled fallback (`index.html` describes the notice).

## Shared Shell & Event Bus
- `/public/ui/index.html` hosts the two-panel hub with a motion gate toggle. It relies on the shared tokens defined in `/public/ui/tokens.css` and `/public/ui/primitives.css` to honor Kanso / Ma / Shibumi guidance.
- `/libs/event-bus.ts` provides a lightweight bridge to `wss://cathedral-core.fly.dev/ws`. The connector queues messages and never leaves the device without explicit consent.

## Numerology Constants
The renderer keeps these anchors inside `index.html` and passes them into `js/helix-renderer.mjs`: 3, 7, 9, 11, 22, 33, 99, 144.

## Why This Stays ND-Safe
- Still gradients evoke breath without animation or flicker.
- Luminous halos provide layered geometry (never flat) inspired by the shared mandalas.
- Canvas notices replace pop-ups to avoid startle.
- No build tooling, bundlers, or workflows — everything remains offline-first and transparent.

## Provenance Encoding
- `index.html` embeds the Cathedral Visionary provenance JSON directly onto the canvas element.
- This satisfies the Rosslyn ruleset requirement for metadata without introducing network calls or extra tooling.
The renderer references 3, 7, 9, 11, 22, 33, 99, and 144 to align with the cathedral numerology and geometry mappings.
- Still gradients and halo glows maintain layered geometry without motion or strobe.
- Palette choices maintain AA+ contrast and comment on ND-safe intent directly inside the source files.
- Offline-first workflow: no bundlers, pipelines, or CI. Just open the files locally.

## Recovery Protocol
- Safe stop is always available: close the page, or reinforce stillness via the motion gate inside the hub UI.
- Open `index.html` directly in any modern browser (offline-first).
- Optional: edit `data/palette.json` to change colors; if the file is missing the header shows a calm fallback notice and the default palette is used.

## ND-safe choices
- No animation, autoplay, or flashing; every layer renders once.
- Gentle contrast with readable inks on dark background; palette overrides stay ND-safe via sane defaults.
- Layer order preserves depth without motion so the geometry feels dimensional yet steady.

## Numerology constants
The renderer exposes constants (3, 7, 9, 11, 22, 33, 99, 144) in `index.html` as `NUM` so each geometric routine remains grounded in the requested harmonics.
