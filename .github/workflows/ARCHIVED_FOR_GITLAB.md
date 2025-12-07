# GitHub Actions Workflows - Archived for GitLab Migration

All workflows have been migrated to GitLab CI (`.gitlab-ci.yml`).

## Archived Workflows
- `ci.yml` - Replaced by GitLab CI build stage
- `deploy.yml` - Replaced by GitLab CI release stage
- `deploy-docs.yml` - Replaced by GitLab CI build stage
- `deploy-vercel.yml` - REMOVED (paid service)
- `publish.yml` - Replaced by GitLab CI package/release stages

## Active GitLab CI
See `.gitlab-ci.yml` for the complete pipeline:
- Setup → Build → Test → Package → Release

## Migration Notes
- All deployments now use GitLab CI
- GitHub Pages deployment moved to GitLab Pages
- All paid services (Vercel, Cloudflare, Netlify, Fly.io, Railway) removed
- Dynamic release tags: `v1.YYYYMMDD.HHMMSS-COMMIT_SHA`

