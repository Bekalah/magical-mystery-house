#!/usr/bin/env zsh
set -euo pipefail

# Mirror and sync repo between GitHub and GitLab
# Node: 25.2, Shell: zsh

REPO="$1"
GL_NAMESPACE="${GL_NAMESPACE:-bekalah}"

if [ -z "$REPO" ]; then
  echo "Usage: $0 <repo-name>"
  exit 1
fi

GL="git@gitlab.com:${GL_NAMESPACE}/${REPO}.git"
GH="git@github.com:bekalah/${REPO}.git"

tmp="$(mktemp -d)"
git clone --mirror "${GH}" "${tmp}/${REPO}.git"

(cd "${tmp}/${REPO}.git" && git remote add gitlab "${GL}" || true)
(cd "${tmp}/${REPO}.git" && git push --mirror gitlab)

rm -rf "${tmp}"

echo "Synced ${REPO} -> GitLab"

