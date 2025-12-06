#!/usr/bin/env zsh
set -euo pipefail

# Complete GitHub to GitLab Migration - Free Tier
# Transfers all repos while keeping everything free
# Node: 25.2, Shell: zsh

GH_USER="bekalah"
GL_NAMESPACE="bekalah"
GL_API="https://gitlab.com/api/v4"

: "${GITHUB_TOKEN:?Need GITHUB_TOKEN (GitHub Personal Access Token)}"
: "${GITLAB_TOKEN:?Need GITLAB_TOKEN (GitLab Personal Access Token with api scope)}"

echo "🚀 GitHub to GitLab Migration - Free Tier"
echo "=========================================="
echo ""

# Step 1: Get all GitHub repos
echo "📋 Step 1: Fetching GitHub repositories..."
GH_REPOS=$(gh repo list "${GH_USER}" --limit 1000 --json name,description,private,archived,sshUrl --jq '.[] | select(.archived == false) | .name' || echo "")

if [ -z "$GH_REPOS" ]; then
  echo "❌ Failed to fetch GitHub repos. Check GITHUB_TOKEN and gh CLI."
  exit 1
fi

REPO_COUNT=$(echo "$GH_REPOS" | wc -l | tr -d ' ')
echo "   Found ${REPO_COUNT} active repositories"
echo ""

# Step 2: Ensure GitLab namespace exists
echo "📦 Step 2: Verifying GitLab namespace..."
NS_ID=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "${GL_API}/namespaces?search=${GL_NAMESPACE}" | jq -r '.[0].id // empty')

if [ -z "$NS_ID" ] || [ "$NS_ID" = "null" ]; then
  echo "   Creating namespace ${GL_NAMESPACE}..."
  NS_RESPONSE=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" -X POST "${GL_API}/namespaces" \
    -d "name=${GL_NAMESPACE}" -d "path=${GL_NAMESPACE}" -d "visibility=private" 2>/dev/null)
  NS_ID=$(echo "$NS_RESPONSE" | jq -r '.id // empty')
  
  if [ -z "$NS_ID" ] || [ "$NS_ID" = "null" ]; then
    echo "❌ Failed to create/find namespace. Check GITLAB_TOKEN permissions."
    exit 1
  fi
fi

echo "   ✅ Namespace verified: ${GL_NAMESPACE} (id: ${NS_ID})"
echo ""

# Step 3: Create backup directory
BACKUP_DIR="backups/github-migration-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "💾 Step 3: Backup directory created: ${BACKUP_DIR}"
echo ""

# Step 4: Migrate each repo
echo "🔄 Step 4: Migrating repositories..."
echo ""

SUCCESS=0
FAILED=0
SKIPPED=0

for repo in $(echo "$GH_REPOS"); do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📚 Processing: ${repo}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  # Check if repo already exists in GitLab
  EXISTING=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
    "${GL_API}/projects?search=${repo}" | jq -r --arg repo "$repo" '.[] | select(.path==$repo) | .id' | head -1)
  
  if [ -n "$EXISTING" ] && [ "$EXISTING" != "null" ]; then
    echo "   ⏭️  Already exists in GitLab (id: ${EXISTING}), skipping..."
    SKIPPED=$((SKIPPED + 1))
    echo ""
    continue
  fi
  
  # Create GitLab project
  echo "   📦 Creating GitLab project..."
  CREATE_RESPONSE=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" -X POST "${GL_API}/projects" \
    -d "name=${repo}" \
    -d "path=${repo}" \
    -d "namespace_id=${NS_ID}" \
    -d "visibility=private" \
    -d "description=Migrated from GitHub" 2>/dev/null)
  
  GL_PROJECT_ID=$(echo "$CREATE_RESPONSE" | jq -r '.id // empty')
  
  if [ -z "$GL_PROJECT_ID" ] || [ "$GL_PROJECT_ID" = "null" ]; then
    ERROR_MSG=$(echo "$CREATE_RESPONSE" | jq -r '.message // "Unknown error"' 2>/dev/null || echo "Failed to create project")
    echo "   ❌ Failed to create project: ${ERROR_MSG}"
    FAILED=$((FAILED + 1))
    echo ""
    continue
  fi
  
  echo "   ✅ Project created (id: ${GL_PROJECT_ID})"
  
  # Backup GitHub repo
  echo "   💾 Backing up from GitHub..."
  BACKUP_PATH="${BACKUP_DIR}/${repo}.git"
  if [ -d "$BACKUP_PATH" ]; then
    echo "   ⏭️  Backup already exists, using existing..."
  else
    git clone --mirror "git@github.com:${GH_USER}/${repo}.git" "$BACKUP_PATH" 2>&1 | grep -E "(Cloning|done)" || true
    echo "   ✅ Backup created"
  fi
  
  # Push to GitLab
  echo "   📤 Pushing to GitLab..."
  GL_URL="git@gitlab.com:${GL_NAMESPACE}/${repo}.git"
  
  (cd "$BACKUP_PATH" && \
    git remote set-url origin "$GL_URL" && \
    git push --mirror origin 2>&1 | tail -3) || {
    echo "   ❌ Push failed"
    FAILED=$((FAILED + 1))
    echo ""
    continue
  }
  
  echo "   ✅ Pushed to GitLab"
  
  # Migrate LFS if present
  if [ -f "${BACKUP_PATH}/lfs/objects" ] || git -C "$BACKUP_PATH" lfs ls-files 2>/dev/null | head -1 | grep -q .; then
    echo "   📦 Migrating LFS objects..."
    TEMP_CLONE=$(mktemp -d)
    git clone "git@github.com:${GH_USER}/${repo}.git" "${TEMP_CLONE}/${repo}" 2>/dev/null || true
    if [ -d "${TEMP_CLONE}/${repo}" ]; then
      (cd "${TEMP_CLONE}/${repo}" && \
        git lfs fetch --all 2>/dev/null && \
        git remote add gitlab "$GL_URL" && \
        git lfs push --all gitlab 2>/dev/null) || echo "   ⚠️  LFS migration had issues (non-critical)"
      rm -rf "${TEMP_CLONE}"
    fi
    echo "   ✅ LFS migration attempted"
  fi
  
  # Enable push mirror (GitLab → GitHub, optional)
  echo "   🔄 Setting up push mirror (GitLab → GitHub)..."
  curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" -X POST \
    "${GL_API}/projects/${GL_PROJECT_ID}/remote_mirrors" \
    -d "url=git@github.com:${GH_USER}/${repo}.git" \
    -d "enabled=true" \
    -d "keep_divergent_refs=true" >/dev/null 2>&1 || echo "   ⚠️  Push mirror setup skipped (non-critical)"
  
  SUCCESS=$((SUCCESS + 1))
  echo "   ✅ Migration complete: ${repo}"
  echo ""
done

# Step 5: Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Migration Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   ✅ Successful: ${SUCCESS}"
echo "   ⏭️  Skipped: ${SKIPPED}"
echo "   ❌ Failed: ${FAILED}"
echo "   💾 Backups: ${BACKUP_DIR}"
echo ""

# Step 6: Update local remotes
echo "🔗 Step 6: Updating local git remotes..."
if [ -d ".git" ]; then
  for repo in $(echo "$GH_REPOS" | head -10); do
    # Check if remote exists
    if git remote | grep -q "^${repo}$"; then
      GL_REMOTE="git@gitlab.com:${GL_NAMESPACE}/${repo}.git"
      git remote set-url "${repo}" "$GL_REMOTE" 2>/dev/null || true
      echo "   ✅ Updated remote: ${repo}"
    fi
  done
fi

echo ""
echo "✅ Migration complete!"
echo ""
echo "🌐 Your repos are now on GitLab (free tier):"
echo "   https://gitlab.com/${GL_NAMESPACE}"
echo ""
echo "💡 Next steps:"
echo "   1. Verify repos in GitLab UI"
echo "   2. Update local remotes: git remote set-url origin git@gitlab.com:${GL_NAMESPACE}/<repo>.git"
echo "   3. Test clone: git clone git@gitlab.com:${GL_NAMESPACE}/<repo>.git"
echo "   4. Keep backups in: ${BACKUP_DIR}"

