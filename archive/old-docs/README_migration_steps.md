# Migration Steps - GitHub to GitLab

## Prerequisites
- Node 25.2 installed
- zsh shell
- Git, git-lfs, jq, curl installed
- pnpm via Corepack
- SSH key added to GitLab
- GitLab Personal Access Token (PAT)

## Step 1: Setup SSH Key for GitLab

```zsh
ssh-keygen -t ed25519 -C "cursor@bekalah" -f ~/.ssh/id_ed25519_gitlab -N ""
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_gitlab
cat ~/.ssh/id_ed25519_gitlab.pub
```

Copy the public key and add to GitLab: Profile → Preferences → SSH Keys

## Step 2: Create GitLab Personal Access Token

1. Go to GitLab → Profile → Settings → Access Tokens
2. Name: `Cursor-Integration-$(date +%Y%m%d)`
3. Expiration: 1 month
4. Scopes: `api`, `read_repository`, `write_repository`
5. Copy token and store securely

## Step 3: Set Environment Variables

```zsh
export GITLAB_TOKEN="glpat-xxxxxxxxxxxx"
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"  # If using GitHub API
export GL_NAMESPACE="bekalah"
```

## Step 4: Mirror Repos to GitLab

Run for each repo:
```zsh
./migrate_to_gitlab.sh stone-grimoire cosmogenesis-learning-engine magical-mystery-house liber-arcanae
```

Or use mirror-sync.sh for individual repos:
```zsh
./mirror-sync.sh stone-grimoire
```

## Step 5: Create Monorepo Structure

```zsh
mkdir -p ~/projects/cathedral-monorepo
cd ~/projects/cathedral-monorepo
git init
echo "# Cathedral Monorepo" > README.md
git add README.md
git commit -m "chore: init monorepo"
git branch -M main
git remote add origin git@gitlab.com:bekalah/cathedral-monorepo.git
git push -u origin main
```

## Step 6: Add Repos as Subtrees

```zsh
# Add each repo as subtree
git remote add stone-grimoire git@gitlab.com:bekalah/stone-grimoire.git
git fetch stone-grimoire
git subtree add --prefix=packages/stone-grimoire stone-grimoire main

# Repeat for other repos
```

## Step 7: Setup CI/CD

Copy `.gitlab-ci.yml` to monorepo root and configure.

## Step 8: Connect Cursor to GitLab

See `CURSOR_GITLAB_SETUP.md` for detailed steps.

