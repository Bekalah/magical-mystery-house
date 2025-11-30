#!/bin/bash
# 🔗✨ INTEGRATE ALL WORKSPACES
# Syncs all workspaces to be master updated

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MASTER_DIR="$SCRIPT_DIR/.."
BASE_DIR="$(cd "$MASTER_DIR/.." && pwd)"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔗 INTEGRATING ALL WORKSPACES TO MASTER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Workspaces to integrate
WORKSPACES=(
  "cathedral-v1-consolidated/cathedral-master"
  "cathedral-real"
  "cathedral-fixed-clean"
)

# Critical packages to sync
PACKAGES=(
  "trinity-v1-1-core"
  "consciousness-aware-creative"
)

# Critical scripts to sync
SCRIPTS=(
  "scripts/10-hour-improvement-experiment.ts"
  "scripts/multi-repo-backup-scanner.ts"
  "scripts/workspace-integrator.ts"
)

echo "📦 Master workspace: $MASTER_DIR"
echo "📁 Base directory: $BASE_DIR"
echo ""

for workspace in "${WORKSPACES[@]}"; do
  WORKSPACE_PATH="$BASE_DIR/$workspace"
  
  if [ ! -d "$WORKSPACE_PATH" ]; then
    echo "⚠️  Workspace not found: $workspace"
    continue
  fi
  
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📦 Integrating: $workspace"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  # Sync packages
  for package in "${PACKAGES[@]}"; do
    MASTER_PKG="$MASTER_DIR/packages/$package"
    WS_PKG="$WORKSPACE_PATH/packages/$package"
    
    if [ -d "$MASTER_PKG" ]; then
      echo "   📦 Syncing package: $package"
      mkdir -p "$(dirname "$WS_PKG")"
      if [ -d "$WS_PKG" ]; then
        rsync -av --update "$MASTER_PKG/" "$WS_PKG/" || true
      else
        cp -r "$MASTER_PKG" "$WS_PKG" || true
      fi
    fi
  done
  
  # Sync scripts
  for script in "${SCRIPTS[@]}"; do
    MASTER_SCRIPT="$MASTER_DIR/$script"
    WS_SCRIPT="$WORKSPACE_PATH/$script"
    
    if [ -f "$MASTER_SCRIPT" ]; then
      echo "   📜 Syncing script: $script"
      mkdir -p "$(dirname "$WS_SCRIPT")"
      cp "$MASTER_SCRIPT" "$WS_SCRIPT" || true
    fi
  done
  
  # Update package.json scripts if exists
  if [ -f "$WORKSPACE_PATH/package.json" ] && [ -f "$MASTER_DIR/package.json" ]; then
    echo "   📄 Merging package.json improvements"
    # Use node to merge (safer than sed)
    node -e "
      const master = require('$MASTER_DIR/package.json');
      const target = require('$WORKSPACE_PATH/package.json');
      target.scripts = { ...target.scripts, ...master.scripts };
      require('fs').writeFileSync('$WORKSPACE_PATH/package.json', JSON.stringify(target, null, 2));
    " || true
  fi
  
  echo "   ✅ $workspace updated"
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ALL WORKSPACES INTEGRATED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Integration complete!"
echo "🔄 All workspaces are now master updated"

