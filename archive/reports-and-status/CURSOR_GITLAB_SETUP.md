# Cursor to GitLab Connection Guide

## Quick Setup for Cursor Pro + GitLab Pro

### Step 1: Create GitLab Personal Access Token

1. Go to GitLab.com → Profile (top right) → **Settings** → **Access Tokens**
2. Click **Add new token**
3. **Token name**: `Cursor-Pro-Integration`
4. **Expiration date**: Set to 1 month from now
5. **Select scopes**:
   - ✅ `api` (full API access for MRs, pipelines, AI features)
   - ✅ `read_repository` (read repos)
   - ✅ `write_repository` (write/push to repos)
   - ✅ `read_registry` (if using container registry)
6. Click **Create personal access token**
7. **Copy the token immediately** (shown only once)
   - Format: `glpat-xxxxxxxxxxxxxxxxxxxx`
   - Store in password manager

### Step 2: Generate SSH Key for GitLab

Run in Cursor terminal (zsh):

```zsh
# Generate SSH key
ssh-keygen -t ed25519 -C "cursor-gitlab@bekalah" -f ~/.ssh/id_ed25519_cursor_gitlab -N ""

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_cursor_gitlab

# Display public key (copy this)
cat ~/.ssh/id_ed25519_cursor_gitlab.pub
```

### Step 3: Add SSH Key to GitLab

1. Copy the public key from Step 2
2. Go to GitLab → Profile → **Preferences** → **SSH Keys**
3. Click **Add new key**
4. Paste the public key
5. **Title**: `Cursor macOS`
6. **Expires at**: 1 month (optional)
7. Click **Add key**

### Step 4: Verify SSH Connection

In Cursor terminal:

```zsh
ssh -T git@gitlab.com
```

Should see: `Welcome to GitLab, @bekalah!`

### Step 5: Configure Cursor to Use GitLab

#### Option A: Via Cursor Settings (if available)

1. Open Cursor Settings (Cmd+,)
2. Search for "GitLab" or "Git"
3. Add GitLab integration:
   - **GitLab URL**: `https://gitlab.com`
   - **Personal Access Token**: Paste your PAT
   - **SSH Key Path**: `~/.ssh/id_ed25519_cursor_gitlab`

#### Option B: Via Environment Variables

Add to your `~/.zshrc`:

```zsh
export GITLAB_TOKEN="glpat-xxxxxxxxxxxxxxxxxxxx"
export GITLAB_URL="https://gitlab.com"
export GIT_SSH_KEY_PATH="~/.ssh/id_ed25519_cursor_gitlab"
```

Then reload:
```zsh
source ~/.zshrc
```

#### Option C: Via Cursor Secret Store

1. In Cursor, open Command Palette (Cmd+Shift+P)
2. Search for "Secrets" or "Settings"
3. Add secret:
   - Name: `GITLAB_TOKEN`
   - Value: Your PAT
   - Mark as secret

### Step 6: Test GitLab Connection

In Cursor terminal:

```zsh
# Clone a repo via SSH
git clone git@gitlab.com:bekalah/stone-grimoire.git /tmp/test-clone
cd /tmp/test-clone
git log --oneline | head -5
cd ..
rm -rf /tmp/test-clone

# Test API access
curl -s --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/user" | jq '.username'
```

### Step 7: Enable GitLab AI Features in Cursor

GitLab Pro AI features available:
- **Merge Request Assistant** - Auto-generate MR descriptions
- **Code Suggestions** - AI-powered code completion
- **Security Analysis** - AI-assisted vulnerability detection
- **Pipeline Insights** - AI suggestions for CI/CD fixes

To use via Cursor:

1. Ensure your GitLab account has Pro plan active
2. Cursor can access these via API if PAT has `api` scope
3. Cursor will automatically use AI features when:
   - Creating MRs (auto-generate descriptions)
   - Reviewing code (suggest improvements)
   - Fixing CI/CD issues (suggest pipeline fixes)

### Step 8: Create Test Merge Request

Test full integration:

```zsh
# In your monorepo
git checkout -b cursor-test-integration
echo "# Cursor Test" > CURSOR_TEST.md
git add CURSOR_TEST.md
git commit -m "test: cursor gitlab integration"
git push -u origin cursor-test-integration

# Create MR via API
curl -s --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  -X POST "https://gitlab.com/api/v4/projects/bekalah%2Fcathedral-monorepo/merge_requests" \
  -d "source_branch=cursor-test-integration" \
  -d "target_branch=main" \
  -d "title=Cursor Integration Test" \
  | jq '.web_url'
```

### Step 9: Configure Cursor for GitLab CI/CD

Cursor can trigger pipelines and read status:

```zsh
# Trigger pipeline
curl -s --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  -X POST "https://gitlab.com/api/v4/projects/bekalah%2Fcathedral-monorepo/pipeline" \
  -d "ref=main" | jq '.web_url'

# Check pipeline status
curl -s --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/projects/bekalah%2Fcathedral-monorepo/pipelines" \
  | jq '.[0] | {status, web_url}'
```

## Security Best Practices

1. **Token Expiry**: Set PAT to expire in 1 month, renew as needed
2. **Least Privilege**: Only grant `api` scope if you need MR/pipeline control
3. **Revoke Unused**: Revoke old tokens in GitLab → Access Tokens
4. **SSH Key Security**: Use separate key for Cursor, don't share
5. **Secret Storage**: Use Cursor's secret store, not plain files

## Troubleshooting

### SSH Connection Fails
```zsh
# Check SSH agent
ssh-add -l

# Re-add key
ssh-add ~/.ssh/id_ed25519_cursor_gitlab

# Test again
ssh -T git@gitlab.com
```

### API Access Denied
- Verify PAT has `api` scope
- Check token hasn't expired
- Verify token is set in environment: `echo $GITLAB_TOKEN`

### Cursor Can't Push
- Ensure SSH key is added to GitLab
- Check SSH agent has key loaded: `ssh-add -l`
- Test SSH: `ssh -T git@gitlab.com`

## Next Steps

1. ✅ Complete migration scripts
2. ✅ Mirror repos to GitLab
3. ✅ Set up monorepo
4. ✅ Configure CI/CD
5. ✅ Connect Cursor
6. ✅ Test AI features
7. ✅ Deploy to free platforms

