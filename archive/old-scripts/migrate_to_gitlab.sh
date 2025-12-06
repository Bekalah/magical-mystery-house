#!/usr/bin/env zsh
set -euo pipefail

# Usage: ./migrate_to_gitlab.sh repo1 repo2 ...
# Requires: GITHUB_TOKEN, GITLAB_TOKEN env vars; gh, git, jq, curl, git-lfs installed
# Node: 25.2, Shell: zsh

GH_USER="bekalah"
GL_NAMESPACE="bekalah"
API_GL="https://gitlab.com/api/v4"

: "${GITHUB_TOKEN:?Need GITHUB_TOKEN (exported)}"
: "${GITLAB_TOKEN:?Need GITLAB_TOKEN (exported)}"

timestamp(){ date +"%Y%m%d-%H%M%S"; }

ensure_namespace_id(){
  NS_ID=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "${API_GL}/namespaces?search=${GL_NAMESPACE}" | jq -r '.[0].id')
  if [ -z "$NS_ID" ] || [ "$NS_ID" = "null" ]; then
    echo "Could not find namespace ${GL_NAMESPACE} on GitLab. Create or set GL_NAMESPACE correctly." >&2
    exit 1
  fi
  echo "$NS_ID"
}

backup_bundle(){
  local repo="$1"
  mkdir -p backups
  echo "Cloning --mirror $repo..."
  git clone --mirror "git@github.com:${GH_USER}/${repo}.git" "backups/${repo}.git"
  (cd "backups/${repo}.git" && git bundle create "../${repo}_$(timestamp).bundle" --all)
  echo "Bundle created: backups/${repo}_$(timestamp).bundle"
}

create_gitlab_project(){
  local repo="$1"
  local nsid
  nsid=$(ensure_namespace_id)
  # If project exists, skip
  local exists
  exists=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "${API_GL}/projects?search=${repo}" | jq -r --arg repo "$repo" '.[] | select(.path==$repo) | .id' || true)
  if [ -n "$exists" ]; then
    echo "Project ${repo} already exists (id ${exists})."
    return 0
  fi
  echo "Creating GitLab project ${GL_NAMESPACE}/${repo}..."
  curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" -X POST "${API_GL}/projects" \
    -d "name=${repo}" -d "path=${repo}" -d "namespace_id=${nsid}" -d "visibility=private" >/dev/null
  echo "Created project ${repo}"
}

mirror_repo_to_gitlab(){
  local repo="$1"
  local tmpdir
  tmpdir="$(mktemp -d)"
  git clone --mirror "git@github.com:${GH_USER}/${repo}.git" "${tmpdir}/${repo}.git"
  create_gitlab_project "$repo"
  local gl_ssh="git@gitlab.com:${GL_NAMESPACE}/${repo}.git"
  (cd "${tmpdir}/${repo}.git" && git remote add gitlab "${gl_ssh}" || true)
  echo "Pushing --mirror to GitLab..."
  (cd "${tmpdir}/${repo}.git" && git push --mirror gitlab)
  rm -rf "${tmpdir}"
  echo "Mirrored ${repo} to GitLab"
}

migrate_lfs(){
  local repo="$1"
  echo "Migrating LFS for ${repo}..."
  tmp=$(mktemp -d)
  git clone "git@github.com:${GH_USER}/${repo}.git" "${tmp}/${repo}"
  cd "${tmp}/${repo}"
  git lfs fetch --all || true
  git lfs push --all "git@gitlab.com:${GL_NAMESPACE}/${repo}.git" || true
  cd - >/dev/null
  rm -rf "${tmp}"
  echo "LFS migrated for ${repo}"
}

enable_push_mirror(){
  local repo="$1"
  local project_id
  project_id=$(curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" "${API_GL}/projects?search=${repo}" | jq -r --arg repo "$repo" '.[] | select(.path==$repo) | .id' )
  if [ -z "$project_id" ] || [ "$project_id" = "null" ]; then
    echo "Project ${repo} not found in GitLab API." >&2
    return 1
  fi
  curl -s --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" -X POST "${API_GL}/projects/${project_id}/remote_mirrors" \
    -d "url=git@github.com:${GH_USER}/${repo}.git" -d "enabled=true" >/dev/null || true
  echo "Configured push mirror for ${repo}"
}

if [ $# -eq 0 ]; then
  echo "No repos provided. Use: $0 repo1 repo2 ..."
  exit 1
fi

for repo in "$@"; do
  echo "=== Migrating: ${repo} ==="
  backup_bundle "$repo"
  mirror_repo_to_gitlab "$repo"
  migrate_lfs "$repo" || true
  enable_push_mirror "$repo" || true
done

echo "All requested repos processed."

