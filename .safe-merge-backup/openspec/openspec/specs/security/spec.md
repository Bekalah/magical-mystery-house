# Security Specification

## Overview

This specification defines security standards for all Cathedral repositories, ensuring safe tool usage and vulnerability mitigation.

## Package Management

### pnpm Only Policy

- **Required**: All repositories MUST use pnpm as the package manager
- **Forbidden**: npm, yarn, and bun are NOT allowed
- **Enforcement**: Security audit tool checks for forbidden tool usage

### Configuration Files

#### pnpm-workspace.yaml

All monorepos must have `pnpm-workspace.yaml`:

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

**Do NOT use** `package.json` workspaces field - pnpm requires separate file.

#### .npmrc Security Settings

All repos must have `.npmrc` with these security settings:

```
# Security: Block risky postinstall scripts (pnpm v10+)
enable-pre-post-scripts=false

# Security: Delay new packages (24 hours = 1440 minutes)
# Prevents installation of packages until they've been available for 24h
# Allows community time to identify vulnerabilities
minimum-release-age=1440

# Security: Enforce strict trust policy
# Prevents installation if trust level has decreased
trust-policy=strict
```

#### package.json Security Fields

All package.json files must include:

```json
{
  "packageManager": "ppnpm@8.0.0",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

**Remove** `workspaces` field from package.json (use pnpm-workspace.yaml instead).

## Security Tools

### Security Audit Tool

All repos must have `scripts/security-audit.mjs` that:
- Checks for forbidden tools (npm, yarn, bun)
- Verifies packageManager field
- Verifies engines field
- Runs ppnpm audit
- Reports security issues

### Security Scripts

All package.json must include:

```json
{
  "scripts": {
    "security:audit": "node scripts/security-audit.mjs",
    "security:check": "ppnpm audit && pppnpm run security:audit",
    "security:fix": "ppnpm audit --fix"
  }
}
```

## Turbo Integration

All `turbo.json` files must include security task:

```json
{
  "pipeline": {
    "security:check": {
      "cache": false,
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

## Vulnerability Mitigation

### Regular Audits

- Run `ppnpm audit` weekly
- Run `pppnpm run security:check` before commits
- Fix vulnerabilities immediately

### Dependency Overrides

Use pnpm overrides to enforce secure versions:

```json
{
  "pnpm": {
    "overrides": {
      "vulnerable-package": ">=secure-version"
    }
  }
}
```

### Supply Chain Security

- Block risky postinstall scripts (enabled by default in pnpm v10+)
- Delay new package installations (24-hour minimum)
- Enforce trust policies
- Monitor for compromised packages

## Compliance

All repositories must:
1. Pass `pppnpm run security:audit` with no issues
2. Have `.npmrc` with security settings
3. Have `pnpm-workspace.yaml` (if monorepo)
4. Have `packageManager` field in package.json
5. Have security scripts in package.json
6. Have security task in turbo.json

## References

- [pnpm Security Documentation](https://pnpm.io/next/supply-chain-security)
- [pnpm Audit](https://pnpm.io/cli/audit)
- [Turbo Security](https://turbo.build/repo/docs/core-concepts/monorepos/security)

