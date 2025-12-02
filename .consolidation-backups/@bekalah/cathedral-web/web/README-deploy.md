# Deploying @bekalah/cathedral-web (Next.js) to Vercel (free) and Cloudflare Pages

This app lives in a monorepo at `apps/web`. It’s a Next.js 14 project configured for static export (see `next.config.js: output: "export"`).

## Vercel (free) — recommended

Use Vercel’s dashboard and set the Root Directory to `apps/web` so Vercel builds only the web app and ignores the repo root `vercel.json`.

1. Import the repo

- Create a project on [Vercel](https://vercel.com) → Import `Bekalah/cathedral`.
- When prompted, set Root Directory to `apps/web`.

2. Build settings

- Framework: Next.js (auto-detected)
- Install: auto (Vercel detects pnpm via `pnpm-lock.yaml` at repo root)
- Build Command: `next build` (default; with `output: "export"`, this produces a static site in `apps/web/out`)
- Output: auto (Next.js)
- Node: 18+ (defaults are fine)

3. Environment variables (optional)

- Add any keys your app needs under Project Settings → Environment Variables.

4. Deploy

- Click Deploy. You’ll get a preview URL and automatic deploys on pushes to `main`.

CLI quickstart (optional):
```bash
# from repo root
pnpm install
cd apps/web
pnpm dlx vercel link    # select the new project
pnpm dlx vercel          # preview deploy
pnpm dlx vercel --prod   # production deploy
```

Notes:
- `next.config.js` currently sets `basePath` and `assetPrefix` for GitHub Pages (`/cathedral`). If you see paths under `/cathedral` on Vercel, set `NEXT_PUBLIC_GH_PAGES=false` and remove `basePath`/`assetPrefix` from your build, or condition them by environment.

## Cloudflare Pages

You can deploy the static export (`apps/web/out`) to Cloudflare Pages.

Option A — Cloudflare Pages Dashboard
1) Create a Pages project and connect `Bekalah/cathedral`.
2) Set Root Directory to `apps/web`.
3) Build command: `pnpm -w install && pnpm run build --filter=apps/web`
4) Output directory: `out`
5) Deploy.

Option B — Wrangler (advanced)
If you prefer Wrangler, ensure the build outputs `apps/web/out` and that your config points Pages to that directory. The repo contains `wrangler.toml` files created by Replit; adjust if needed:
- Use `publish = "out"` for static Pages sites.
- Or use the Next-on-Pages adapter if you need server-side features.

## GitHub Pages (current config)
`next.config.js` contains:
- `output: "export"`
- `basePath: "/cathedral"`
- `assetPrefix: "/cathedral/"`
- `trailingSlash: true`

Those are ideal for GitHub Pages project sites (served at `https://bekalah.github.io/cathedral`). For Vercel or Cloudflare Pages root domains, remove or condition those values.

## Troubleshooting
- 404s for assets on Vercel: remove `basePath`/`assetPrefix` or condition them per environment.
- Build succeeds, no site on Cloudflare: ensure Output Directory is `out` and Root Directory is `apps/web`.
- Large repo warnings: avoid committing exports; the root `.gitignore` now ignores `BUILDING_CATHEDRALS_ARCHIVE/`.

## GitHub Action for Vercel (optional)

This repo includes `.github/workflows/vercel-deploy.yml` which deploys `apps/web` to Vercel on pushes and PRs when the following repository secrets are set:

- `VERCEL_TOKEN` — Vercel personal token
- `VERCEL_ORG_ID` — Organization ID
- `VERCEL_PROJECT_ID` — Project ID

Notes:

- The workflow auto-skips if secrets are missing.
- It sets `NEXT_PUBLIC_GH_PAGES=false` to avoid GitHub Pages basePath during Vercel builds.

---

Deployment trigger note: documentation touch to kick off CI for apps/web on 2025-11-01.

Re-trigger: 2025-11-01T00:00:00Z — Vercel secrets set, kicking workflow again.
