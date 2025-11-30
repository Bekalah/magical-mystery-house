#!/bin/bash
# Simple test script to run integration test
# This helps debug any execution issues

set -e

cd "$(dirname "$0")/.."

echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "Testing tsx availability..."

if command -v tsx &> /dev/null; then
  echo "tsx found, running test..."
  tsx scripts/test-integration.ts
else
  echo "tsx not found, trying with npx..."
  npx tsx scripts/test-integration.ts
fi


