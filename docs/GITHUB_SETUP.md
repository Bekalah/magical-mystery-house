# ⚗️ GITHUB_SETUP

**In the alchemical tradition, this grimoire contains the sacred knowledge**
**and principles that guide the transformation of base materials into gold.**

---

/**
 * High creativity: Celebration of collective creative riches
 */
/**
 * Academic barrier breaking: Conquering Western academia barriers
 */
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */
# GitHub Integration Setup Gui - 144:99 ratio compliance - Fibonacci-based sizing - Golden ratio proportions - Multi-modal creation experiences - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Organic, fmuseum-grade quality (not website-like) - Immersive 3D environments - Sacred geometry integrationde

**License**: CC0-1.0 - Public Domain (Open Source)


This guide helps you set up GitHub authentication and troubleshoot connectivity issues.

## Quick Start - Museum-grade quality - Museum-grade quality - Museum-grade quality - Museum-grade quality

1. **Set up GitHub Token:**
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

2. **Test connectivity:**
   ```bash
   node tools/github-diagnostics.mjs
   ```

3. **Publish to GitHub:**
   ```bash
   node tools/auto-publish-to-github.mjs
   ```

## Authentication Methods

### Method 1: GitHub Personal Access Token (Recommended)

This works everywhere (local, CI/CD, cloud environments).

#### Step 1: Create a Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Cathedral Master Deployment")
4. Select expiration (or "No expiration" for long-term use)
5. **Required scopes:**
   - ✅ `repo` - Full control of private repositories
   - ✅ `workflow` - Update GitHub Action workflows
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

#### Step 2: Set the Token

**On macOS/Linux:**
```bash
export GITHUB_TOKEN=ghp_your_token_here
```

**Make it permanent:**
```bash
echo 'export GITHUB_TOKEN=ghp_your_token_here' >> ~/.zshrc
# or for bash:
echo 'export GITHUB_TOKEN=ghp_your_token_here' >> ~/.bashrc
source ~/.zshrc  # or source ~/.bashrc
```

**On Windows (PowerShell):**
```powershell
$env:GITHUB_TOKEN="ghp_your_token_here"
```

**Make it permanent (Windows):**
```powershell
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_your_token_here', 'User')
```

**In CI/CD (GitHub Actions):**
```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**In CI/CD (other platforms):**
Add `GITHUB_TOKEN` as a secret/environment variable in your CI/CD platform.

### Method 2: Replit Connector (Replit Only)

If you're running in Replit, the system will automatically use the Replit GitHub connector if:
- `REPLIT_CONNECTORS_HOSTNAME` is set
- `REPL_IDENTITY` or `WEB_REPL_RENEWAL` is set

No additional setup needed in Replit.

## Troubleshooting

### Problem: "GitHub authentication not found"

**Solution:**
1. Verify token is set: `echo $GITHUB_TOKEN`
2. Check token hasn't expired
3. Regenerate token if needed

### Problem: "Network connectivity failed"

**Possible causes:**
- No internet connection
- Firewall blocking GitHub API
- DNS issues
- GitHub API outage

**Solutions:**
1. Test connectivity: `curl https://api.github.com`
2. Check firewall/proxy settings
3. Try from a different network
4. Check GitHub status: https://www.githubstatus.com

### Problem: "Repository not found" or "Access denied"

**Solutions:**
1. Verify repository exists: Visit `https://github.com/owner/repo`
2. Check token has `repo` scope
3. For private repos, ensure token has access
4. Verify repository name is correct (case-sensitive)

### Problem: "Rate limit exceeded"

**Solutions:**
1. Wait for rate limit to reset (usually 1 hour)
2. Use authenticated requests (they have higher limits)
3. Reduce API call frequency
4. Check rate limit: `node tools/github-diagnostics.mjs`

### Problem: GitHub Actions workflows failing

**Common causes:**
1. Missing `GITHUB_TOKEN` secret
2. Incorrect repository URL
3. Branch protection rules
4. Workflow syntax errors

**Solutions:**
1. Check workflow file syntax
2. Verify repository secrets are set
3. Check Actions tab for detailed error messages
4. Ensure workflow has necessary permissions

## Diagnostic Tools

### Run Full Diagnostics

```bash
node tools/github-diagnostics.mjs
```

This will test:
- Network connectivity
- Authentication
- Rate limits
- Repository access (if specified)

### Test Specific Repository

```bash
node tools/github-diagnostics.mjs --repo=owner/repo-name
```

### Check Authentication Only

```bash
node -e "import('./tools/github-auth.mjs').then(m => m.testGitHubConnection())"
```

## Security Best Practices

1. **Never commit tokens to git:**
   - Use `.env` files (and add to `.gitignore`)
   - Use environment variables
   - Use secret management systems

2. **Use minimal scopes:**
   - Only grant necessary permissions
   - Review token scopes regularly

3. **Rotate tokens regularly:**
   - Set expiration dates
   - Regenerate tokens periodically
   - Revoke unused tokens

4. **Use different tokens for different purposes:**
   - Development token (local)
   - CI/CD token (automated)
   - Production token (deployments)

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub personal access token | Yes (if not in Replit) |
| `GH_TOKEN` | Alternative token variable | No (fallback) |
| `GITHUB_REPO` | Default repository name | No |
| `REPLIT_CONNECTORS_HOSTNAME` | Replit connector hostname | No (Replit only) |
| `REPL_IDENTITY` | Replit identity token | No (Replit only) |
| `WEB_REPL_RENEWAL` | Replit renewal token | No (Replit only) |

## Common Commands

```bash
# Test connectivity
node tools/github-diagnostics.mjs

# Publish to default repo
node tools/auto-publish-to-github.mjs

# Publish to specific repo
node tools/auto-publish-to-github.mjs --repo=owner/repo-name

# Check token is set
echo $GITHUB_TOKEN

# Verify token works
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
```

## Getting Help

If you're still experiencing issues:

1. Run diagnostics: `node tools/github-diagnostics.mjs`
2. Check GitHub status: https://www.githubstatus.com
3. Review GitHub API documentation: https://docs.github.com/en/rest
4. Check token permissions: https://github.com/settings/tokens

## Related Files

- `tools/github-auth.mjs` - Universal authentication helper
- `tools/github-diagnostics.mjs` - Diagnostic tool
- `tools/auto-publish-to-github.mjs` - Publishing script
- `.github/workflows/*.yml` - GitHub Actions workflows

