Per Texturas Numerorum, Spira Loquitur.

# Cosmic Helix Renderer

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
- Still gradients and halo glows maintain layered geometry without motion or strobe.
- Palette choices maintain AA+ contrast and comment on ND-safe intent directly inside the source files.
- Offline-first workflow: no bundlers, pipelines, or CI. Just open the files locally.

## Recovery Protocol
- Safe stop is always available: close the page, or reinforce stillness via the motion gate inside the hub UI.
