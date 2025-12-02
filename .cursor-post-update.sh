#!/bin/bash

# Cursor Post-Update Hook
# Automatically runs after Cursor updates to make codex independent

echo "🏛️✨ Cathedral Post-Update Hook"
echo "============================================="
echo ""
echo "Running automatic updates after Cursor patches..."
echo ""

# Change to project directory
cd "$(dirname "$0")"

# Run auto-update
pnpm run auto:update

# Run quick maintenance
pnpm run maintain:quick

echo ""
echo "✅ Post-update complete - codex is ready to work independently"
echo ""

