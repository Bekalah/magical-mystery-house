# Cosmic Helix Task List

## Completed Setup
- Static offline renderer (`index.html`, `js/helix-renderer.mjs`) draws four ND-safe geometry layers.
- Local palettes in `data/palette.json` and world variants in `data/worlds.json`.
- Documentation in `README_RENDERER.md` describes usage and numerology constants.

## Current Repo Links
- This repo is self-contained; no active links to other repos.
- Modules are pure ES modules and could be imported by other game projects as needed.

## Next Steps for Multi-Game & World Building
- Expand `data/worlds.json` with more themed palettes and geometry constants for each game world.
- Expose a small API for games to inject custom geometry or narrative data.
- Provide mapping from game state to renderer layers for complex environments.
- Consider packaging the renderer as a drop-in module for different engines.

## Outstanding Tasks
- Connect this renderer to other repos or engines (none linked yet).
- Build authoring tools for world data (GUI or scripts).
- Add tests or linting for long-term maintenance.
- Document how multiple games can share palettes and geometry presets.
