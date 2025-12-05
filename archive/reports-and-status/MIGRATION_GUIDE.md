# Complete GitHub to GitLab Migration Guide - Free Tier

## Overview
This guide helps you migrate all GitHub repos to GitLab while staying on the free tier and preserving all history, branches, and tags.

## Prerequisites

### 1. Install Required Tools
```zsh
# macOS Homebrew
brew install git git-lfs jq curl gh corepack

# Enable pnpm
corepack enable
corepack prepare pnpm@latest --activate
```

### 2. Create GitHub Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Scopes: `repo` (full control)
4. Copy token: `ghp_xxxxxxxxxxxx`

### 3. Create GitLab Personal Access Token
1. Go to GitLab → Profile → Settings → Access Tokens
2. Token name: `GitHub-Migration`
3. Expiration: 1 year (or as needed)
4. Scopes: `api`, `read_repository`, `write_repository`
5. Copy token: `glpat-xxxxxxxxxxxx`

### 4. Setup SSH Keys
```zsh
# Generate SSH key for GitLab
ssh-keygen -t ed25519 -C "gitlab@bekalah" -f ~/.ssh/id_ed25519_gitlab -N ""
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_gitlab
cat ~/.ssh/id_ed25519_gitlab.pub
```

Add public key to GitLab: Profile → Preferences → SSH Keys

### 5. Authenticate GitHub CLI
```zsh
gh auth login
# Follow prompts, use token or browser
```

## Migration Steps

### Step 1: Set Environment Variables
```zsh
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
export GITLAB_TOKEN="glpat-xxxxxxxxxxxx"
export GL_NAMESPACE="bekalah"
```

### Step 2: Run Migration Script
```zsh
cd /Users/rebeccalemke/cathedral-master-deployment
chmod +x migrate-github-to-gitlab-free.sh
./migrate-github-to-gitlab-free.sh
```

The script will:
- ✅ List all your GitHub repos
- ✅ Create GitLab projects (private, free tier)
- ✅ Mirror all branches, tags, and history
- ✅ Migrate LFS objects if present
- ✅ Set up push mirrors (GitLab → GitHub)
- ✅ Create backups locally

### Step 3: Verify Migration
```zsh
# Test clone a repo
git clone git@gitlab.com:bekalah/stone-grimoire.git /tmp/test-clone
cd /tmp/test-clone
git log --oneline | head -10
git tag --list
cd ..
rm -rf /tmp/test-clone
```

### Step 4: Update Local Remotes
For each repo you work with locally:
```zsh
cd /path/to/local/repo
git remote set-url origin git@gitlab.com:bekalah/repo-name.git
git remote -v  # Verify
```

## Free Tier Limits

GitLab Free tier includes:
- ✅ Unlimited private repos
- ✅ 5GB storage per repo
- ✅ 10GB transfer per month
- ✅ 400 CI/CD minutes per month
- ✅ Unlimited collaborators

**Your repos fit comfortably in free tier!**

## What Gets Migrated

✅ **Everything preserved:**
- All commits and history
- All branches
- All tags
- All releases
- LFS objects (if present)
- Issue templates (manual copy)
- Wiki (manual copy)

## Post-Migration

### Update CI/CD
- Update `.gitlab-ci.yml` files
- Update deployment URLs
- Update webhook URLs

### Update Documentation
- Update README.md with new GitLab URLs
- Update contribution guides
- Update deployment docs

### Archive GitHub Repos (Optional)
After verifying everything works:
1. Archive GitHub repos (keeps them but marks as archived)
2. Or delete them (if you're sure)

## Troubleshooting

### SSH Connection Fails
```zsh
ssh-add ~/.ssh/id_ed25519_gitlab
ssh -T git@gitlab.com
```

### API Access Denied
- Check token hasn't expired
- Verify token has `api` scope
- Check namespace exists

### Large Repos
- GitLab free tier: 5GB per repo
- If repo is larger, consider:
  - Removing large files from history (git filter-repo)
  - Using GitLab LFS
  - Using external storage

## Cost Comparison

**GitHub:**
- Free: Public repos only
- Pro: $4/month for private repos

**GitLab:**
- Free: Unlimited private repos ✅
- Pro: $29/month (not needed for your use case)

**You save money by using GitLab free tier!**

## Next Steps After Migration

1. ✅ Verify all repos migrated
2. ✅ Test cloning and pushing
3. ✅ Update local remotes
4. ✅ Set up GitLab CI/CD
5. ✅ Deploy to free platforms (Vercel, Cloudflare Pages)
6. ✅ Archive/delete GitHub repos (optional)

## Support

If migration fails:
1. Check error messages in script output
2. Verify tokens are valid
3. Check GitLab namespace exists
4. Ensure SSH key is added to GitLab
5. Review backups in `backups/` directory

