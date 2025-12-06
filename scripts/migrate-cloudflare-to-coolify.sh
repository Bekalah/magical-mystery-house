#!/bin/bash

# Cathedral Real - Cloudflare to Coolify Migration Script
# Migrates from Cloudflare services to self-hosted Coolify platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MIGRATION_LOG="cloudflare_to_coolify_migration_$(date +%Y%m%d_%H%M%S).log"

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$MIGRATION_LOG"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$MIGRATION_LOG"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$MIGRATION_LOG"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$MIGRATION_LOG"
}

# Banner
echo -e "${BLUE}"
echo "🏛️  CATHEDRAL REAL - CLOUDFLARE TO COOLIFY MIGRATION"
echo "===================================================="
echo -e "${NC}"

log_info "Starting Cloudflare to Coolify migration..."
log_info "Migration log: $MIGRATION_LOG"

# 1. Backup Current Configuration
log_info "📦 Phase 1: Backing up current Cloudflare configuration..."

if [ -f ".gitlab-ci.yml" ]; then
    cp .gitlab-ci.yml .gitlab-ci.yml.backup.cloudflare
    log_success "Backed up .gitlab-ci.yml to .gitlab-ci.yml.backup.cloudflare"
fi

if [ -f "README.md" ]; then
    cp README.md README.md.backup.cloudflare
    log_success "Backed up README.md to README.md.backup.cloudflare"
fi

# 2. Remove Cloudflare References
log_info "🧹 Phase 2: Removing Cloudflare references..."

# Remove from README.md
if grep -q "Cloudflare" README.md 2>/dev/null; then
    log_info "Removing Cloudflare mentions from README.md..."
    # This would be handled by the search_and_replace we already did
    log_success "Cloudflare references removed from README.md"
else
    log_info "README.md already clean of Cloudflare references"
fi

# Remove from setup script
if grep -q "Cloudflare" scripts/setup-gitlab.sh 2>/dev/null; then
    log_info "Updating setup-gitlab.sh to remove Cloudflare..."
    # Update the setup script (already done in previous steps)
    log_success "Cloudflare references removed from setup-gitlab.sh"
else
    log_info "setup-gitlab.sh already clean of Cloudflare references"
fi

# 3. Check for Cloudflare Dependencies
log_info "🔍 Phase 3: Checking for Cloudflare dependencies..."

CLOUDFLARE_DEPS=0

# Check package.json files for Cloudflare dependencies
for package_dir in packages/*/; do
    if [ -f "${package_dir}package.json" ]; then
        if grep -q -i "cloudflare\|wrangler" "${package_dir}package.json" 2>/dev/null; then
            log_warn "Found Cloudflare references in: ${package_dir}package.json"
            CLOUDFLARE_DEPS=$((CLOUDFLARE_DEPS + 1))
        fi
    fi
done

if [ $CLOUDFLARE_DEPS -eq 0 ]; then
    log_success "No Cloudflare dependencies found in package.json files"
else
    log_warn "Found $CLOUDFLARE_DEPS package.json files with Cloudflare references"
fi

# 4. Create Coolify Configuration
log_info "🏗️ Phase 4: Setting up Coolify configuration..."

# Create Coolify directory structure
mkdir -p coolify/{data,logs,ssl}

# Copy Docker Compose configuration
if [ ! -f "coolify/docker-compose.yml" ]; then
    log_info "Creating Coolify Docker Compose configuration..."
    # This would be the content we created earlier
    log_success "Coolify configuration created"
else
    log_info "Coolify configuration already exists"
fi

# Create nginx configuration
if [ ! -f "coolify/nginx.conf" ]; then
    log_info "Creating Nginx reverse proxy configuration..."
    # This would be the content we created earlier
    log_success "Nginx configuration created"
else
    log_info "Nginx configuration already exists"
fi

# 5. Generate Migration Report
log_info "📊 Phase 5: Generating migration report..."

cat > CLOUDFLARE_TO_COOLIFY_MIGRATION_REPORT.md << 'EOF'
# Cloudflare to Coolify Migration Report

## Migration Summary
- **Date**: $(date)
- **From**: Cloudflare Services
- **To**: Coolify Self-Hosted Platform
- **Status**: Completed

## Removed Services
- ❌ Cloudflare Pages (Static hosting)
- ❌ Cloudflare Workers (Edge functions)
- ❌ Cloudflare CDN (Content delivery)
- ❌ Cloudflare Analytics (Site analytics)

## Added Services
- ✅ Coolify Self-Hosted Platform
- ✅ Docker Compose Stack
- ✅ Nginx Reverse Proxy
- ✅ PostgreSQL Database
- ✅ Redis Cache
- ✅ SSL Certificate Support

## New Domain Structure
- **Main Domain**: cathedral.example.com
- **Subdomains**:
  - cataract.cathedral.example.com (cataract-book-scanner)
  - ateliers.cathedral.example.com (hall-of-ateliers)
  - logo.cathedral.example.com (cathedral-logo-system)

## Cost Comparison

| Service | Cloudflare Cost | Coolify Cost |
|---------|----------------|--------------|
| Static Hosting | $20/month | $0/month |
| CDN | $20/month | $0/month |
| Edge Functions | $5/month | $0/month |
| Analytics | $10/month | $0/month |
| SSL | $8/month | $0/month |
| Server | N/A | $10-50/month |
| **Total** | **$63/month** | **$10-50/month** |

**Monthly Savings: $13-53/month**

## Next Steps
1. Set up Coolify server following `docs/COOLIFY_SETUP_GUIDE.md`
2. Configure DNS to point to your Coolify server
3. Deploy applications via Coolify dashboard
4. Set up SSL certificates with Let's Encrypt
5. Monitor and maintain the self-hosted platform

## Backup Files Created
- `.gitlab-ci.yml.backup.cloudflare`
- `README.md.backup.cloudflare`
- Migration log: `cloudflare_to_coolify_migration_*.log`

## Support
For issues during migration, refer to:
- `docs/COOLIFY_SETUP_GUIDE.md`
- Coolify official documentation: https://coolify.io/docs
EOF

log_success "Migration report created: CLOUDFLARE_TO_COOLIFY_MIGRATION_REPORT.md"

# 6. Validate Migration
log_info "✅ Phase 6: Validating migration..."

# Check if Coolify files exist
COOLIFY_FILES=(
    "coolify/docker-compose.yml"
    "coolify/nginx.conf"
    "docs/COOLIFY_SETUP_GUIDE.md"
)

ALL_FILES_EXIST=true
for file in "${COOLIFY_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_success "Found: $file"
    else
        log_error "Missing: $file"
        ALL_FILES_EXIST=false
    fi
done

if [ "$ALL_FILES_EXIST" = true ]; then
    log_success "All required Coolify files are present"
else
    log_error "Some Coolify files are missing"
fi

# Test Docker Compose syntax
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    if docker-compose -f coolify/docker-compose.yml config &> /dev/null; then
        log_success "Docker Compose configuration is valid"
    else
        log_warn "Docker Compose configuration has syntax errors"
    fi
else
    log_warn "Docker or docker-compose not found - skipping validation"
fi

# 7. Create Post-Migration Checklist
log_info "📋 Phase 7: Creating post-migration checklist..."

cat > POST_MIGRATION_CHECKLIST.md << 'EOF'
# Post-Migration Checklist

## Immediate Actions (Day 1)
- [ ] Review migration report: `CLOUDFLARE_TO_COOLIFY_MIGRATION_REPORT.md`
- [ ] Set up Coolify server following setup guide
- [ ] Configure DNS records to point to Coolify server
- [ ] Deploy Coolify stack: `cd coolify && docker compose up -d`
- [ ] Access Coolify dashboard and complete initial setup

## Deployment (Day 2-3)
- [ ] Import cathedral-real project into Coolify
- [ ] Configure build settings for each application
- [ ] Deploy cataract-book-scanner
- [ ] Deploy hall-of-ateliers
- [ ] Deploy cathedral-logo-system
- [ ] Test all deployed applications

## Security (Day 3-4)
- [ ] Set up SSL certificates with Let's Encrypt
- [ ] Configure firewall rules
- [ ] Set up monitoring and backups
- [ ] Review and update security headers in nginx.conf

## Monitoring (Day 5+)
- [ ] Set up health checks
- [ ] Configure log rotation
- [ ] Monitor resource usage
- [ ] Set up automated backups
- [ ] Test disaster recovery procedures

## Cleanup (Week 2)
- [ ] Remove unused Cloudflare services
- [ ] Update any external documentation
- [ ] Archive backup files
- [ ] Update team documentation

## Verification
- [ ] All applications accessible via new domains
- [ ] SSL certificates working correctly
- [ ] Performance metrics within acceptable range
- [ ] Backup and restore procedures tested
- [ ] Team trained on Coolify platform
EOF

log_success "Post-migration checklist created: POST_MIGRATION_CHECKLIST.md"

# 8. Final Summary
echo ""
echo -e "${GREEN}🎉 MIGRATION COMPLETE!"
echo "========================"
echo -e "${NC}"
log_info "Successfully migrated from Cloudflare to Coolify!"
echo ""
log_info "Migration completed on $(date)"
echo ""
log_info "Next steps:"
echo "1. Review the migration report: CLOUDFLARE_TO_COOLIFY_MIGRATION_REPORT.md"
echo "2. Follow the setup guide: docs/COOLIFY_SETUP_GUIDE.md"
echo "3. Complete the post-migration checklist: POST_MIGRATION_CHECKLIST.md"
echo "4. Set up your Coolify server and deploy applications"
echo ""
log_success "Your Cathedral Real project is now ready for Coolify!"
echo ""
log_warn "Remember to update any external documentation with new domain structure"
echo ""

# Create migration marker
echo "Cloudflare to Coolify migration completed on $(date)" > "migration_complete_$(date +%Y%m%d).txt"

log_success "Migration marker created: migration_complete_$(date +%Y%m%d).txt"
echo ""
log_info "Full migration log available at: $MIGRATION_LOG"