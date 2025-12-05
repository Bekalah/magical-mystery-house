#!/usr/bin/env zsh
set -euo pipefail

ROOT="${1:-.}"

find "${ROOT}" -name package.json -not -path "*/node_modules/*" | while read -r pkg; do
  jq '. + {mona: {role: "artifact", aesthetic: "MonaS Hieroglyphica"}}' "${pkg}" > "${pkg}.tmp" && mv "${pkg}.tmp" "${pkg}"
  echo "Annotated ${pkg}"
done

