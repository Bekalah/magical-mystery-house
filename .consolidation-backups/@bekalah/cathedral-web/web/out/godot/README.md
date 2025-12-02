# Godot HTML5 export slot

Use this folder to serve your Godot 4.x HTML5 export at `/godot/`.

What to place here (from Godot HTML5 export):

- `index.html`
- `*.wasm`, `*.pck`, `*.png`/`*.jpg` assets as exported by Godot

Notes:

- Keep filenames unchanged from the export; the Next.js static export will copy this folder to `/godot/`.
- For large assets, consider CDN/Pages for caching; Vercel/Cloudflare/Pages handle this well.

## Quick import helper

Run the sync script to copy a local Godot HTML5 export into this folder (dry-run by default):

```bash
bash tools/sync/import_godot_export.sh /path/to/godot-html5-export
```

Add `--apply` to actually copy files.

## Local test after export

```bash
pnpm web:dev
```

Open: <http://localhost:3000/godot/>

## CI/CD

- GitHub Pages, Vercel, and Cloudflare Pages will publish `apps/web/out`. This folder is included.
