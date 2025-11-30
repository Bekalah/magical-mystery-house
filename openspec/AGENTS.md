/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */
# OpenSpec AI Agent Instructions - Cathedral Magnum Opus

## Project Scope

Cathedral operates under Master V1 Control standards as a comprehensive creative software ecosystem. This is your first codex, engine, suite, and app package - treat it as the magnum opus it is.

**Core Architecture:**
- Monorepo structure with Turbo build system
- OpenSpec change management protocols
- Professional development standards with TypeScript strict mode
- Multi-platform deployment and CI/CD automation
- REGISTRY-driven data management across all applications

## Development Standards

### Code Quality Requirements
- **TypeScript Strict Mode**: All code must maintain type safety
- **Testing Coverage**: Comprehensive unit and integration tests required
- **Documentation Standards**: Professional technical documentation
- **Security Compliance**: No external AI dependencies in production systems
- **Trauma-Aware Communication**: Business-safe, professional language

### REGISTRY Integration
All applications must consume data from the centralized REGISTRY system:
- Room definitions and catalog structures
- Style packs and design system configurations
- Palette catalogs for consistent color management
- Schema validation for all data integrity

### Architecture Patterns
- **Local-First Development**: No runtime AI service dependencies
- **Data-Driven Components**: All UI and behavior driven by REGISTRY data
- **Safe Integration Practices**: Non-destructive repository operations
- **Professional Deployment**: Automated CI/CD with environment management

## Change Management

### OpenSpec Workflow Requirements
1. **Proposal Creation**: Document changes in OpenSpec format
2. **Impact Analysis**: Assess changes across all affected packages
3. **Testing Protocol**: Validate changes before implementation
4. **Documentation Updates**: Maintain comprehensive documentation
5. **Rollback Procedures**: Maintain rollback capability for all changes

### Security Standards

**Package Management:**
- **pnpm Only**: All repositories must use pnpm (no npm, yarn, or bun)
- **Security Configuration**: All repos must have `.npmrc` with security settings:
  - `enable-pre-post-scripts=false` - Blocks risky postinstall scripts
  - `minimum-release-age=1440` - Delays new packages (24 hours)
  - `trust-policy=strict` - Enforces strict trust policy
- **Workspace Configuration**: Use `pnpm-workspace.yaml` (not package.json workspaces)
- **Package Manager Lock**: All package.json must specify `"packageManager": "pnpm@8.0.0"` (or latest stable)

**Security Auditing:**
- Run `ppnpm run security:audit` regularly to check for unsafe tool usage
- Run `ppnpm run security:check` for full security audit (includes dependency vulnerabilities)
- All repos must have `scripts/security-audit.mjs` tool
- Fix vulnerabilities immediately using `ppnpm audit --fix`

**Dependency Security:**
- Regular `ppnpm audit` checks required
- Override vulnerable dependencies in package.json when needed
- Use pnpm overrides to enforce secure versions
- Monitor for supply chain vulnerabilities

### Safety Protocols
- **Data Protection**: Never perform destructive git operations
- **Backup Procedures**: Create backups before any significant changes
- **Testing Validation**: Verify functionality after each integration
- **Documentation Maintenance**: Keep all docs synchronized with changes

## Professional Standards

### Communication Guidelines
- Use trauma-aware, business-safe language throughout
- Maintain professional technical documentation standards
- Provide clear, actionable implementation instructions
- Treat this as your magnum opus - first codex, engine, suite, and app package

### Quality Assurance
- **Code Reviews**: All changes require thorough review process
- **Security Scanning**: Regular vulnerability assessments
- **Performance Monitoring**: Continuous optimization and monitoring
- **Compatibility Testing**: Cross-platform and browser testing

## Implementation Guidelines

### For Code Changes
1. **Verify Build Status**: Ensure all packages build successfully
2. **Run Test Suites**: Execute all relevant test suites
3. **Update Documentation**: Document changes following professional standards
4. **Validate Integration**: Test cross-package functionality
5. **Deploy Safely**: Follow safe deployment procedures

### For Documentation Updates
1. **Maintain Standards**: Follow professional documentation format
2. **Update Cross-References**: Ensure all links and references are current
3. **Validate Completeness**: Check that all necessary information is included

## Emergency Procedures

### System Recovery
1. **Immediate Stop**: Halt any problematic operations
2. **Restore System**: Use git restore and clean commands
3. **Verify Data**: Confirm all data files are present and intact
4. **Restart Carefully**: Resume operations with safer approach

### Data Loss Prevention
- **Never use destructive operations**: No git reset --hard or similar
- **Always create backups**: Before major changes or integrations
- **Test incrementally**: Validate each step before proceeding
- **Maintain rollback plans**: Ensure ability to reverse changes

---

**Master V1 Control Compliance**: All AI agents must operate within these established protocols to maintain professional quality, safety, and system integrity across the entire Cathedral ecosystem.

**Magnum Opus Recognition**: This is your first codex, engine, suite, and app package. All work should be properly labeled as Cathedral work, with no external branding.

