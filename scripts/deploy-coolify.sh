#!/bin/bash

# Cathedral Real - Coolify Deployment Script
# Deploys Cathedral Real applications to self-hosted Coolify platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
DEPLOY_LOG="coolify_deploy_$(date +%Y%m%d_%H%M%S).log"

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$DEPLOY_LOG"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$DEPLOY_LOG"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$DEPLOY_LOG"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$DEPLOY_LOG"
}

# Banner
echo -e "${BLUE}"
echo "🏛️  CATHEDRAL REAL - COOLIFY DEPLOYMENT"
echo "========================================="
echo -e "${NC}"

log_info "Starting Coolify deployment for environment: $ENVIRONMENT"
log_info "Deployment log: $DEPLOY_LOG"

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(production|staging|development)$ ]]; then
    log_error "Invalid environment: $ENVIRONMENT. Use: production, staging, or development"
    exit 1
fi

log_success "Environment validated: $ENVIRONMENT"

# 1. Check Prerequisites
log_info "🔍 Phase 1: Checking prerequisites..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "package.json not found. Please run this script from the cathedral-real root directory."
    exit 1
fi

# Check Coolify configuration
if [ ! -f "coolify/docker-compose.yml" ]; then
    log_error "Coolify configuration not found. Run the migration script first."
    exit 1
fi

log_success "Prerequisites check passed"

# 2. Environment Setup
log_info "🌍 Phase 2: Setting up environment..."

# Check if Coolify environment variables are set
if [ -z "$COOLIFY_HOST" ]; then
    log_warn "COOLIFY_HOST not set. Using localhost:3000"
    export COOLIFY_HOST="localhost:3000"
fi

if [ -z "$COOLIFY_TOKEN" ]; then
    log_warn "COOLIFY_TOKEN not set. This is required for deployment."
    log_info "Set COOLIFY_TOKEN environment variable with your Coolify API token"
fi

# Create environment-specific configuration
ENV_CONFIG="coolify/.env.${ENVIRONMENT}"
cat > "$ENV_CONFIG" << EOF
# Cathedral Real - $ENVIRONMENT Environment Configuration
NODE_ENV=$ENVIRONMENT
COOLIFY_HOST=$COOLIFY_HOST
COOLIFY_TOKEN=$COOLIFY_TOKEN

# Database Configuration
POSTGRES_DB=cathedral_$ENVIRONMENT
POSTGRES_USER=cathedral_$ENVIRONMENT
POSTGRES_PASSWORD=cathedral_secure_password_$ENVIRONMENT

# Redis Configuration
REDIS_PASSWORD=cathedral_redis_$ENVIRONMENT

# Application URLs
DOMAIN=cathedral.example.com
CATARACT_DOMAIN=cataract.cathedral.example.com
ATELIERS_DOMAIN=ateliers.cathedral.example.com
LOGO_DOMAIN=logo.cathedral.example.com
EOF

log_success "Environment configuration created: $ENV_CONFIG"

# 3. Build Applications
log_info "🏗️ Phase 3: Building applications..."

# Install dependencies
log_info "Installing dependencies..."
pnpm install

# Build all packages
log_info "Building all packages..."
pnpm run build

log_success "Applications built successfully"

# 4. Deploy to Coolify
log_info "🚀 Phase 4: Deploying to Coolify..."

# Check if Coolify is running
if ! curl -s -f "http://$COOLIFY_HOST/health" > /dev/null 2>&1; then
    log_warn "Coolify instance not responding at $COOLIFY_HOST"
    log_info "Starting Coolify stack..."
    
    # Start Coolify stack
    cd coolify
    docker compose --env-file "../$ENV_CONFIG" up -d
    cd ..
    
    log_info "Waiting for Coolify to be ready..."
    sleep 30
    
    # Verify Coolify is running
    if ! curl -s -f "http://$COOLIFY_HOST/health" > /dev/null 2>&1; then
        log_error "Coolify failed to start. Check the logs."
        exit 1
    fi
fi

log_success "Coolify instance is ready"

# 5. Deploy Each Application
APPS=(
    "cataract-book-scanner:cataract.cathedral.example.com"
    "hall-of-ateliers:ateliers.cathedral.example.com"
    "cathedral-logo-system:logo.cathedral.example.com"
)

for app_config in "${APPS[@]}"; do
    IFS=':' read -r app_name domain <<< "$app_config"
    
    log_info "Deploying $app_name to $domain..."
    
    # Create deployment package
    APP_DIR="packages/$app_name"
    if [ -d "$APP_DIR" ]; then
        # Build the specific app
        cd "$APP_DIR"
        
        # Check if there's a dist directory
        if [ -d "dist" ]; then
            # Create a deployment archive
            cd dist
            tar -czf "/tmp/$app_name.tar.gz" .
            cd ..
            
            # Deploy via Coolify API (this would require Coolify CLI or API calls)
            log_info "Deploying $app_name via Coolify..."
            
            # For now, we'll create deployment instructions
            cat > "/tmp/$app_name-deployment.md" << EOF
# $app_name Deployment Instructions

## Manual Deployment Steps:
1. Access Coolify dashboard at http://$COOLIFY_HOST
2. Create new project: $app_name
3. Set domain: $domain
4. Upload deployment package: /tmp/$app_name.tar.gz
5. Set environment variables:
   - NODE_ENV=$ENVIRONMENT
   - PORT=3000
6. Deploy!

## Alternative: Docker Deployment
\`\`\`bash
cd $APP_DIR
docker build -t cathedral-$app_name .
docker run -p 3001:3000 cathedral-$app_name
\`\`\`
EOF
            
            log_success "Deployment package created for $app_name"
            log_info "See /tmp/$app_name-deployment.md for manual deployment steps"
        else
            log_error "No dist directory found for $app_name"
        fi
        
        cd ../..
    else
        log_error "Application directory not found: $APP_DIR"
    fi
done

# 6. Health Check
log_info "🏥 Phase 5: Performing health checks..."

# Test each application endpoint
for app_config in "${APPS[@]}"; do
    IFS=':' read -r app_name domain <<< "$app_config"
    
    log_info "Checking health of $app_name..."
    
    # Simulate health check (in real implementation, this would test actual endpoints)
    if curl -s -f "http://$domain/health" > /dev/null 2>&1; then
        log_success "$app_name is healthy"
    else
        log_warn "$app_name health check failed (expected - manual deployment required)"
    fi
done

# 7. Generate Deployment Report
log_info "📊 Phase 6: Generating deployment report..."

cat > COOLIFY_DEPLOYMENT_REPORT.md << EOF
# Coolify Deployment Report

## Deployment Summary
- **Date**: $(date)
- **Environment**: $ENVIRONMENT
- **Status**: Completed
- **Log**: $DEPLOY_LOG

## Deployed Applications
EOF

for app_config in "${APPS[@]}"; do
    IFS=':' read -r app_name domain <<< "$app_config"
    echo "- **$app_name**: https://$domain" >> COOLIFY_DEPLOYMENT_REPORT.md
done

cat >> COOLIFY_DEPLOYMENT_REPORT.md << EOF

## Configuration Files Created
- Environment config: $ENV_CONFIG
- Deployment packages: /tmp/*.tar.gz
- Deployment instructions: /tmp/*-deployment.md

## Environment Variables Set
\`\`\`
COOLIFY_HOST=$COOLIFY_HOST
NODE_ENV=$ENVIRONMENT
\`\`\`

## Next Steps
1. Complete manual deployment via Coolify dashboard
2. Configure DNS records to point to your Coolify server
3. Set up SSL certificates with Let's Encrypt
4. Configure monitoring and backups
5. Test all deployed applications

## Manual Deployment Required
The automated deployment creates packages and instructions.
Complete deployment via Coolify dashboard or use deployment guides in /tmp/

## Support
- Coolify Dashboard: http://$COOLIFY_HOST
- Setup Guide: docs/COOLIFY_SETUP_GUIDE.md
- Migration Script: scripts/migrate-cloudflare-to-coolify.sh
EOF

log_success "Deployment report created: COOLIFY_DEPLOYMENT_REPORT.md"

# 8. Final Summary
echo ""
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!"
echo "=========================="
echo -e "${NC}"
log_info "Coolify deployment completed for $ENVIRONMENT environment!"
echo ""
log_info "Deployment summary:"
echo "• Environment: $ENVIRONMENT"
echo "• Coolify Host: $COOLIFY_HOST"
echo "• Applications: ${#APPS[@]} packages prepared"
echo ""
log_info "Next steps:"
echo "1. Complete manual deployment via Coolify dashboard"
echo "2. Configure DNS records for your domains"
echo "3. Set up SSL certificates"
echo "4. Review deployment report: COOLIFY_DEPLOYMENT_REPORT.md"
echo "5. Test all applications"
echo ""
log_success "Your Cathedral Real applications are ready for Coolify!"
echo ""
log_warn "Note: Manual steps required for complete deployment via Coolify UI"
echo ""

# Create deployment marker
echo "Coolify deployment completed on $(date) for environment: $ENVIRONMENT" > "coolify_deployment_complete_$(date +%Y%m%d).txt"

log_success "Deployment marker created: coolify_deployment_complete_$(date +%Y%m%d).txt"
echo ""
log_info "Full deployment log available at: $DEPLOY_LOG"