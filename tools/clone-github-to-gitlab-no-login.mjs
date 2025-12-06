#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Clone GitHub to GitLab (No Login Required)
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Clones repository from GitHub to GitLab without needing GitLab login:
 * - Uses SSH keys or tokens
 * - Bypasses VS Code login issues
 * - Creates GitLab repo via API (if token provided)
 * - Mirrors all branches
 * - Preserves history
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, execSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn',
  github: {
    repo: 'cathedral-master',
    owner: 'Bekalah',
    url: 'https://github.com/Bekalah/cathedral-master.git'
  },
  gitlab: {
    namespace: 'bekalah',
    repoName: 'cathedral-of-circuits-magnum-opus-v1',
    url: `https://gitlab.com/bekalah/cathedral-of-circuits-magnum-opus-v1.git`,
    sshUrl: `git@gitlab.com:bekalah/cathedral-of-circuits-magnum-opus-v1.git`
  }
};

function checkSSHKeys() {
  const sshDir = join(homedir(), '.ssh');
  const publicKeys = [];
  
  try {
    const keys = execSync(`ls ${sshDir}/id_*.pub 2>/dev/null || true`, {
      encoding: 'utf-8',
      shell: true
    }).trim().split('\n').filter(Boolean);
    
    keys.forEach(keyPath => {
      try {
        const key = readFileSync(keyPath, 'utf-8');
        publicKeys.push({
          path: keyPath,
          type: key.match(/^(ssh-\w+)/)?.[1] || 'unknown',
          exists: true
        });
      } catch (e) {
        // Skip
      }
    });
  } catch (e) {
    // No keys found
  }
  
  return publicKeys;
}

function testGitHubAccess() {
  try {
    execSync('ssh -T git@github.com 2>&1', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 5000
    });
    return { accessible: true, method: 'ssh' };
  } catch (e) {
    const output = e.message || e.stdout || '';
    if (output.includes('successfully authenticated') || output.includes('Hi')) {
      return { accessible: true, method: 'ssh' };
    }
  }
  
  // Test HTTPS
  try {
    execSync('git ls-remote https://github.com/Bekalah/cathedral-master.git 2>&1', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 5000
    });
    return { accessible: true, method: 'https' };
  } catch (e) {
    return { accessible: false, error: 'Cannot access GitHub' };
  }
}

function createGitLabRepoScript() {
  const scriptPath = join(rootDir, 'create-gitlab-repo.sh');
  
  const script = `#!/bin/bash
# ⚗️ Create GitLab Repository (No Login Required)
# Uses GitLab API with token

GITLAB_TOKEN="${process.env.GITLAB_TOKEN || 'YOUR_GITLAB_TOKEN_HERE'}"
GITLAB_URL="https://gitlab.com/api/v4"
NAMESPACE="${PROJECT_INFO.gitlab.namespace}"
REPO_NAME="${PROJECT_INFO.gitlab.repoName}"

echo "🚀 Creating GitLab repository..."

# Create repository via API
curl --request POST \\
  --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \\
  --header "Content-Type: application/json" \\
  --data '{
    "name": "'"$REPO_NAME"'",
    "namespace_id": null,
    "visibility": "private",
    "initialize_with_readme": false
  }' \\
  "$GITLAB_URL/projects?name=$REPO_NAME&namespace=$NAMESPACE"

echo ""
echo "✅ Repository created (or already exists)"
echo "📋 Next: Run the clone script"
`;

  writeFileSync(scriptPath, script);
  execSync(`chmod +x ${scriptPath}`);
  return scriptPath;
}

function createCloneScript() {
  const scriptPath = join(rootDir, 'clone-github-to-gitlab.sh');
  
  const script = `#!/bin/bash
# ⚗️ Clone GitHub to GitLab (No Login Required)
# Magnum Opus Version 1.0

set -e

GITHUB_REPO="${PROJECT_INFO.github.url}"
GITLAB_REPO="${PROJECT_INFO.gitlab.sshUrl}"
TEMP_DIR="/tmp/cathedral-gitlab-migration-$$"

echo "⚗️  Cathedral of Circuits - GitHub to GitLab Migration"
echo "=================================================="
echo ""
echo "GitHub: $GITHUB_REPO"
echo "GitLab: $GITLAB_REPO"
echo ""

# Step 1: Clone from GitHub (mirror)
echo "📥 Step 1: Cloning from GitHub (mirror mode)..."
if [ -d "$TEMP_DIR" ]; then
  rm -rf "$TEMP_DIR"
fi

git clone --mirror "$GITHUB_REPO" "$TEMP_DIR"
cd "$TEMP_DIR"

# Step 2: Remove GitHub remote
echo ""
echo "🗑️  Step 2: Removing GitHub remote..."
git remote remove origin 2>/dev/null || true

# Step 3: Add GitLab remote
echo ""
echo "🌿 Step 3: Adding GitLab remote..."
git remote add gitlab "$GITLAB_REPO"

# Step 4: Push all branches and tags to GitLab
echo ""
echo "📤 Step 4: Pushing to GitLab (this may take a while)..."
echo "   This will push all branches and tags"
echo "   You may be prompted for GitLab credentials"

# Try SSH first
if git ls-remote "$GITLAB_REPO" &>/dev/null; then
  echo "   ✅ GitLab repository accessible via SSH"
  git push gitlab --mirror
else
  echo "   ⚠️  SSH not accessible, trying HTTPS..."
  HTTPS_URL="${PROJECT_INFO.gitlab.url}"
  git remote set-url gitlab "$HTTPS_URL"
  
  # Use token if provided
  if [ -n "$GITLAB_TOKEN" ]; then
    HTTPS_URL_WITH_TOKEN="${PROJECT_INFO.gitlab.url/https:\\/\\//https://oauth2:$GITLAB_TOKEN@}"
    git remote set-url gitlab "$HTTPS_URL_WITH_TOKEN"
  fi
  
  git push gitlab --mirror
fi

# Step 5: Cleanup
echo ""
echo "🧹 Step 5: Cleaning up..."
cd "$rootDir"
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Migration complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to GitLab: https://gitlab.com/${PROJECT_INFO.gitlab.namespace}/${PROJECT_INFO.gitlab.repoName}"
echo "   2. Verify all branches are there"
echo "   3. Update default branch if needed"
echo "   4. Set up CI/CD from .gitlab-ci.yml"
echo ""
`;

  writeFileSync(scriptPath, script);
  execSync(`chmod +x ${scriptPath}`);
  return scriptPath;
}

function createTokenGuide() {
  const guidePath = join(rootDir, 'GITLAB_TOKEN_SETUP.md');
  
  const guide = `# GitLab Token Setup (No Login Required)

**Project**: ${PROJECT_INFO.fullName}

## Problem
Cannot log into GitLab due to VS Code verification error.

## Solution: Use GitLab Token Instead

### Option 1: Generate Token from Command Line

If you have GitLab CLI installed:
\`\`\`bash
glab auth login
\`\`\`

### Option 2: Generate Token via Browser (Without Login)

1. Go to: https://gitlab.com/users/sign_in
2. Click "Forgot your password?"
3. Or create account with email: https://gitlab.com/users/sign_up
4. Once logged in: User Settings → Access Tokens
5. Create token with scopes: \`api\`, \`write_repository\`

### Option 3: Use SSH Key (Recommended)

1. Generate SSH key if you don't have one:
\`\`\`bash
ssh-keygen -t ed25519 -C "your_email@example.com"
\`\`\`

2. Add to GitLab:
   - Go to: https://gitlab.com/-/profile/keys
   - Paste your public key: \`cat ~/.ssh/id_ed25519.pub\`

3. Test:
\`\`\`bash
ssh -T git@gitlab.com
\`\`\`

### Option 4: Use GitLab API (No Web Login)

\`\`\`bash
# Set token
export GITLAB_TOKEN="your_token_here"

# Create repo via API
curl --request POST \\
  --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \\
  --header "Content-Type: application/json" \\
  --data '{
    "name": "${PROJECT_INFO.gitlab.repoName}",
    "visibility": "private"
  }' \\
  "https://gitlab.com/api/v4/projects?name=${PROJECT_INFO.gitlab.repoName}&namespace=${PROJECT_INFO.gitlab.namespace}"
\`\`\`

## Using the Migration Script

\`\`\`bash
# Option 1: With SSH (recommended)
./clone-github-to-gitlab.sh

# Option 2: With Token
export GITLAB_TOKEN="your_token_here"
./clone-github-to-gitlab.sh
\`\`\`

## Troubleshooting

### "Repository not found"
- Repository might not exist on GitLab yet
- Run \`create-gitlab-repo.sh\` first (with token)
- Or create manually via API

### "Permission denied"
- SSH key not added to GitLab
- Token doesn't have correct permissions
- Check token scopes: \`api\`, \`write_repository\`

### "Authentication failed"
- Token expired or invalid
- SSH key not configured correctly
- Try HTTPS with token instead

---

**Part of ${PROJECT_INFO.fullName}**
`;

  writeFileSync(guidePath, guide);
  return guidePath;
}

async function main() {
  console.log(`⚗️  ${PROJECT_INFO.fullName}`);
  console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
  console.log(`Clone GitHub to GitLab (No Login Required)\n`);

  const results = {
    project: PROJECT_INFO,
    ssh: { keys: [] },
    github: {},
    gitlab: {},
    scripts: [],
    timestamp: new Date().toISOString()
  };

  // 1. Check SSH keys
  console.log('🔑 Step 1: Checking SSH keys...');
  const sshKeys = checkSSHKeys();
  results.ssh.keys = sshKeys;
  
  if (sshKeys.length > 0) {
    console.log(`   ✅ Found ${sshKeys.length} SSH key(s):`);
    sshKeys.forEach(key => {
      console.log(`      - ${basename(key.path)} (${key.type})`);
    });
  } else {
    console.log(`   ⚠️  No SSH keys found`);
    console.log(`   💡 Generate one with: ssh-keygen -t ed25519 -C "your_email@example.com"`);
  }
  console.log('');

  // 2. Test GitHub access
  console.log('📥 Step 2: Testing GitHub access...');
  const githubAccess = testGitHubAccess();
  results.github = githubAccess;
  
  if (githubAccess.accessible) {
    console.log(`   ✅ GitHub accessible via ${githubAccess.method}`);
  } else {
    console.log(`   ⚠️  GitHub access issue: ${githubAccess.error}`);
  }
  console.log('');

  // 3. Create scripts
  console.log('📝 Step 3: Creating migration scripts...');
  const cloneScript = createCloneScript();
  const repoScript = createGitLabRepoScript();
  const guide = createTokenGuide();
  
  results.scripts = [
    relative(rootDir, cloneScript),
    relative(rootDir, repoScript),
    relative(rootDir, guide)
  ];
  
  console.log(`   ✅ Created: ${relative(rootDir, cloneScript)}`);
  console.log(`   ✅ Created: ${relative(rootDir, repoScript)}`);
  console.log(`   ✅ Created: ${relative(rootDir, guide)}`);
  console.log('');

  // 4. Generate report
  const reportPath = join(rootDir, 'github-to-gitlab-migration-setup.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('📊 Summary:');
  console.log(`   🔑 SSH keys: ${sshKeys.length}`);
  console.log(`   📥 GitHub access: ${githubAccess.accessible ? '✅' : '❌'}`);
  console.log(`   📝 Scripts created: ${results.scripts.length}\n`);
  console.log(`📄 Reports:`);
  console.log(`   - ${relative(rootDir, reportPath)}`);
  console.log(`   - ${relative(rootDir, guide)}\n`);
  console.log(`✅ Migration setup complete!\n`);
  console.log(`🚀 Next steps:`);
  console.log(`   1. Read: ${relative(rootDir, guide)}`);
  console.log(`   2. Set up SSH key or token (see guide)`);
  console.log(`   3. Run: ./${basename(cloneScript)}\n`);
}

main().catch(console.error);


