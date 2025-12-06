#!/bin/bash
# Free setup and run script - no paid dependencies required

set -e

echo "🚀 Setting up and running workspace integration..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js >= 18.0.0"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version should be >= 18.0.0"
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    elif command -v npm &> /dev/null; then
        pnpm install
    else
        echo "❌ Neither pnpm nor npm found"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

# Compile scripts
echo "🔨 Compiling TypeScript scripts..."
if command -v pnpm &> /dev/null; then
    pnpm run build:scripts || {
        echo "⚠️  pnpm build:scripts failed, trying direct tsc..."
        npx tsc -p scripts/tsconfig.scripts.json
    }
elif command -v npm &> /dev/null; then
    pnpm run build:scripts || {
        echo "⚠️  pnpm build:scripts failed, trying direct tsc..."
        npx tsc -p scripts/tsconfig.scripts.json
    }
else
    npx tsc -p scripts/tsconfig.scripts.json
fi

# Check if compilation succeeded
if [ ! -f "dist/scripts/workspace-integrator.js" ]; then
    echo "❌ Compilation failed. dist/scripts/workspace-integrator.js not found"
    exit 1
fi

echo "✅ Scripts compiled successfully"

# Run integration
echo ""
echo "🔄 Running workspace integration..."
echo ""

node dist/scripts/workspace-integrator.js

echo ""
echo "✅ Done!"


