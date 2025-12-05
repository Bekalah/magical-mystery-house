#!/usr/bin/env zsh
set -euo pipefail

# Validate Cursor to GitLab Connection
# Node: 25.2, Shell: zsh

echo "🔍 Validating Cursor to GitLab Connection..."
echo ""

# Check SSH key
echo "1️⃣  Checking SSH key..."
if [ -f ~/.ssh/id_ed25519_cursor_gitlab ]; then
  echo "   ✅ SSH key found: ~/.ssh/id_ed25519_cursor_gitlab"
  ssh-add -l | grep -q "id_ed25519_cursor_gitlab" && echo "   ✅ SSH key loaded in agent" || echo "   ⚠️  SSH key not in agent (run: ssh-add ~/.ssh/id_ed25519_cursor_gitlab)"
else
  echo "   ❌ SSH key not found"
  echo "   💡 Generate with: ssh-keygen -t ed25519 -C 'cursor-gitlab@bekalah' -f ~/.ssh/id_ed25519_cursor_gitlab -N ''"
fi

# Test SSH connection
echo ""
echo "2️⃣  Testing SSH connection..."
if ssh -T git@gitlab.com 2>&1 | grep -q "Welcome to GitLab"; then
  echo "   ✅ SSH connection successful"
else
  echo "   ❌ SSH connection failed"
  echo "   💡 Add SSH key to GitLab: Profile → Preferences → SSH Keys"
fi

# Check GitLab token
echo ""
echo "3️⃣  Checking GitLab token..."
if [ -n "${GITLAB_TOKEN:-}" ]; then
  echo "   ✅ GITLAB_TOKEN environment variable set"
  
  # Test API access
  echo "   Testing API access..."
  USER_INFO=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "https://gitlab.com/api/v4/user" 2>/dev/null)
  if echo "$USER_INFO" | jq -e '.username' >/dev/null 2>&1; then
    USERNAME=$(echo "$USER_INFO" | jq -r '.username')
    echo "   ✅ API access successful (user: ${USERNAME})"
  else
    echo "   ❌ API access failed"
    echo "   💡 Check token scopes: api, read_repository, write_repository"
  fi
else
  echo "   ❌ GITLAB_TOKEN not set"
  echo "   💡 Set with: export GITLAB_TOKEN='glpat-xxxxxxxxxxxx'"
fi

# Check GitLab namespace
echo ""
echo "4️⃣  Checking GitLab namespace..."
GL_NAMESPACE="${GL_NAMESPACE:-bekalah}"
if [ -n "${GITLAB_TOKEN:-}" ]; then
  NS_CHECK=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "https://gitlab.com/api/v4/namespaces?search=${GL_NAMESPACE}" 2>/dev/null)
  if echo "$NS_CHECK" | jq -e '.[0].id' >/dev/null 2>&1; then
    NS_ID=$(echo "$NS_CHECK" | jq -r '.[0].id')
    echo "   ✅ Namespace found: ${GL_NAMESPACE} (id: ${NS_ID})"
  else
    echo "   ⚠️  Namespace not found: ${GL_NAMESPACE}"
    echo "   💡 Create namespace in GitLab or update GL_NAMESPACE"
  fi
else
  echo "   ⚠️  Cannot check namespace (GITLAB_TOKEN not set)"
fi

# Test clone (if token available)
echo ""
echo "5️⃣  Testing repository access..."
if [ -n "${GITLAB_TOKEN:-}" ] && [ -n "${GL_NAMESPACE:-}" ]; then
  TEST_REPO="stone-grimoire"
  REPO_CHECK=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "https://gitlab.com/api/v4/projects/${GL_NAMESPACE}%2F${TEST_REPO}" 2>/dev/null)
  if echo "$REPO_CHECK" | jq -e '.id' >/dev/null 2>&1; then
    echo "   ✅ Repository accessible: ${GL_NAMESPACE}/${TEST_REPO}"
  else
    echo "   ⚠️  Repository not found or not accessible: ${GL_NAMESPACE}/${TEST_REPO}"
  fi
fi

# Check for required tools
echo ""
echo "6️⃣  Checking required tools..."
TOOLS_OK=true
for tool in git curl jq pnpm node; do
  if command -v "$tool" >/dev/null 2>&1; then
    VERSION=$($tool --version 2>/dev/null | head -1 || echo "installed")
    echo "   ✅ ${tool}: ${VERSION}"
  else
    echo "   ❌ ${tool}: not found"
    TOOLS_OK=false
  fi
done

if [ "$TOOLS_OK" = false ]; then
  echo "   💡 Install missing tools: brew install git curl jq corepack"
fi

# Check Node version
echo ""
echo "7️⃣  Checking Node version..."
NODE_VERSION=$(node -v 2>/dev/null || echo "not found")
if echo "$NODE_VERSION" | grep -q "v25.2"; then
  echo "   ✅ Node version correct: ${NODE_VERSION}"
else
  echo "   ⚠️  Node version: ${NODE_VERSION} (expected v25.2)"
  echo "   💡 Install with: brew install node@25"
fi

# Summary
echo ""
echo "📊 Summary:"
echo "   - SSH: $([ -f ~/.ssh/id_ed25519_cursor_gitlab ] && echo '✅' || echo '❌')"
echo "   - Token: $([ -n "${GITLAB_TOKEN:-}" ] && echo '✅' || echo '❌')"
echo "   - Tools: $([ "$TOOLS_OK" = true ] && echo '✅' || echo '⚠️')"
echo ""
echo "💡 Next steps:"
echo "   1. Fix any ❌ issues above"
echo "   2. Run: ./migrate_to_gitlab.sh <repo-name>"
echo "   3. Test clone: git clone git@gitlab.com:${GL_NAMESPACE}/stone-grimoire.git"
echo "   4. Create test MR via API (see CURSOR_GITLAB_SETUP.md)"

