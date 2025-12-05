#!/usr/bin/env zsh
set -euo pipefail

: "${GITHUB_TOKEN:?Need GITHUB_TOKEN}"
USER="bekalah"
OUT="repos_report.md"

echo "# GitHub Repo Inventory for ${USER}" > "${OUT}"
echo "Generated: $(date -u)" >> "${OUT}"
echo "" >> "${OUT}"

gh repo list "${USER}" --json name,description,pushedAt,updatedAt,size,visibility,archived,sshUrl --limit 1000 \
  | jq -r '.[] | "## \(.name)\n- description: \(.description // "none")\n- last push: \(.pushedAt)\n- updated: \(.updatedAt)\n- size KB: \(.size)\n- visibility: \(.visibility)\n- archived: \(.archived)\n- ssh: \(.sshUrl)\n"' >> "${OUT}"

echo "" >> "${OUT}"
echo "## Suggested cleanup (no push within 12 months)" >> "${OUT}"
gh repo list "${USER}" --json name,pushedAt,archived --limit 1000 \
  | jq -r '.[] | select(.archived==false) | select(.pushedAt <= "'$(date -I -d "1 year ago")'") | "- \(.name) (last push: \(.pushedAt))"' >> "${OUT}"

echo "Wrote ${OUT}"

