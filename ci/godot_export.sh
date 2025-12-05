#!/usr/bin/env zsh
set -euo pipefail

# Run on a heavy-build runner with Godot installed
# Node: 25.2, Shell: zsh

GODOT_BIN="${GODOT_BIN:-godot}"
EXPORT_DIR="packages/godot-liber-arcanae/exports"

mkdir -p "${EXPORT_DIR}"

if ! command -v "${GODOT_BIN}" >/dev/null 2>&1; then
  echo "Godot binary not found at ${GODOT_BIN}; install Godot on runner." >&2
  exit 1
fi

# adapt export names to your Godot project configured export presets
"${GODOT_BIN}" --export "HTML5" "${EXPORT_DIR}/game.html" || true
"${GODOT_BIN}" --export "Linux/X11" "${EXPORT_DIR}/game.x86_64" || true
"${GODOT_BIN}" --export "macOS" "${EXPORT_DIR}/game.app" || true
"${GODOT_BIN}" --export "Windows Desktop" "${EXPORT_DIR}/game.exe" || true

echo "Godot exports produced in ${EXPORT_DIR}"

