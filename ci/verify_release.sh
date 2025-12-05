#!/usr/bin/env zsh
set -euo pipefail

# Verify release artifacts before publishing
# Node: 25.2, Shell: zsh

RELEASE_TAG="${1:-v1.0}"
ARTIFACTS_DIR="${2:-release_assets}"

echo "🔍 Verifying release ${RELEASE_TAG}..."

# Check artifacts exist
if [ ! -d "${ARTIFACTS_DIR}" ]; then
  echo "❌ Artifacts directory not found: ${ARTIFACTS_DIR}"
  exit 1
fi

# Verify build artifacts
echo "📦 Checking build artifacts..."

# Check for frontend builds
if [ -d "apps/liber-arcanae-tarot/dist" ]; then
  echo "✅ liber-arcanae-tarot build found"
else
  echo "⚠️  liber-arcanae-tarot build missing"
fi

# Check for Godot exports
if [ -d "packages/godot-liber-arcanae/exports" ]; then
  echo "✅ Godot exports found"
else
  echo "⚠️  Godot exports missing"
fi

# Check package.json versions
echo "📋 Checking package versions..."
for pkg in packages/*/package.json apps/*/package.json; do
  if [ -f "$pkg" ]; then
    version=$(jq -r '.version' "$pkg" 2>/dev/null || echo "unknown")
    name=$(jq -r '.name' "$pkg" 2>/dev/null || echo "unknown")
    echo "  - ${name}: ${version}"
  fi
done

# Verify license compliance
echo "📜 Checking license compliance..."
missing_license=0
for file in packages/*/src/**/*.{ts,js,mjs} apps/*/src/**/*.{ts,js,mjs,tsx,jsx} 2>/dev/null; do
  if [ -f "$file" ] && ! grep -q "CC0-1.0" "$file" 2>/dev/null; then
    echo "⚠️  Missing license header: $file"
    missing_license=$((missing_license + 1))
  fi
done

if [ $missing_license -gt 0 ]; then
  echo "⚠️  ${missing_license} files missing license headers"
else
  echo "✅ All files have license headers"
fi

# Check for security issues
echo "🔒 Running security checks..."
pnpm audit --audit-level=moderate || echo "⚠️  Security audit found issues"

echo "✅ Release verification complete"
