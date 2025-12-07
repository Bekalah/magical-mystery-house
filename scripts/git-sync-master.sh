#!/bin/bash
set -e

echo "🌟 CATHEDRAL OF CIRCUITS: MASTER SYNC SYSTEM 🌟"
echo "Target: GitLab (Primary) & GitHub (Mirror)"

# 1. Ensure clean state (add everything)
echo "📦 Staging all files..."
git add .

# 2. Commit if there are changes
if git diff-index --quiet HEAD --; then
  echo "✨ No changes to commit."
else
  echo "✨ Committing changes..."
  git commit -m "feat(gold-standard): synchronize monorepo state [skip ci]"
fi

# 3. Push to GitLab (Primary)
echo "🚀 Pushing to GitLab (origin)..."
# Ensure origin is gitlab
# git remote set-url origin https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1.git
git push origin HEAD:main || git push origin HEAD:master || echo "⚠️ GitLab push failed (check permissions)"

# 4. Push to GitHub (Mirror)
echo "🚀 Pushing to GitHub (backup)..."
# Check if github remote exists, if not add it
if ! git remote | grep -q "github"; then
    echo "Adding GitHub remote..."
    git remote add github https://github.com/bekalah/cathedral-monorepo.git
fi
git push github HEAD:main || git push github HEAD:master || echo "⚠️ GitHub push failed (check permissions)"

echo "✅ SYNC COMPLETE"
