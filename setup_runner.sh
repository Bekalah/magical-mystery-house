#!/usr/bin/env zsh
set -euo pipefail

# GitLab Runner Setup for macOS
# Node: 25.2, Shell: zsh

: "${RUNNER_TOKEN:?Set RUNNER_TOKEN (project/group runner registration token)}"
GITLAB_URL="${GITLAB_URL:-https://gitlab.com}"

# Install GitLab Runner (macOS)
if ! command -v gitlab-runner >/dev/null 2>&1; then
  echo "Installing GitLab Runner..."
  brew install gitlab-runner || {
    echo "Homebrew not found. Install manually from: https://docs.gitlab.com/runner/install/osx.html"
    exit 1
  }
fi

# Install dependencies
if ! command -v docker >/dev/null 2>&1; then
  echo "Installing Docker..."
  brew install --cask docker || {
    echo "Docker not found. Install from: https://www.docker.com/products/docker-desktop"
    exit 1
  }
fi

# Install Node 25.2
if ! command -v node >/dev/null 2>&1 || ! node -v | grep -q "v25.2"; then
  echo "Installing Node 25.2..."
  brew install node@25 || {
    echo "Node installation failed. Install manually."
    exit 1
  }
fi

# Install pnpm via Corepack
corepack enable
corepack prepare pnpm@latest --activate

# Install Godot (if needed for game builds)
if ! command -v godot >/dev/null 2>&1; then
  echo "Note: Godot not found. Install from: https://godotengine.org/download"
  echo "Or use: brew install --cask godot"
fi

echo "Register runner (example):"
echo "sudo gitlab-runner register --non-interactive \\"
echo "  --url ${GITLAB_URL} \\"
echo "  --registration-token ${RUNNER_TOKEN} \\"
echo "  --executor shell \\"
echo "  --description 'macos-heavy-build-runner' \\"
echo "  --tag-list 'heavy-build,macos,node-25' \\"
echo "  --run-untagged=false \\"
echo "  --locked=false"

echo ""
echo "After registration, start runner:"
echo "gitlab-runner start"

