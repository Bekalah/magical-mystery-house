#!/bin/bash

# GitHub Token Setup Script
# Usage: ./tools/set-github-token.sh YOUR_TOKEN_HERE

if [ -z "$1" ]; then
  echo "Usage: ./tools/set-github-token.sh YOUR_TOKEN_HERE"
  echo ""
  echo "Or set it manually:"
  echo "  export GITHUB_TOKEN=your_token_here"
  exit 1
fi

TOKEN=$1

# Set for current session
export GITHUB_TOKEN=$TOKEN

# Add to .zshrc if not already present
if ! grep -q "GITHUB_TOKEN" ~/.zshrc 2>/dev/null; then
  echo "" >> ~/.zshrc
  echo "# GitHub Token for Cathedral Master" >> ~/.zshrc
  echo "export GITHUB_TOKEN=$TOKEN" >> ~/.zshrc
  echo "✓ Added to ~/.zshrc"
else
  echo "⚠️  GITHUB_TOKEN already exists in ~/.zshrc"
  echo "   Please update it manually or remove the old entry first"
fi

echo "✓ Token set for current session"
echo ""
echo "Testing connection..."
echo ""

# Run diagnostics
node tools/github-diagnostics.mjs

