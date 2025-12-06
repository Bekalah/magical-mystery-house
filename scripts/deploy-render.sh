#!/bin/bash

# Cathedral Real - Render Deployment Script
# $0/month deployment strategy implementation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
RENDER_API_TOKEN="${RENDER_API_TOKEN:-}"
RENDER_SERVICE_IDS=(
    "cataract-book-scanner:${RENDER_SERVICE_ID_CATARACT:-}"
    "hall-of-ateliers:${RENDER_SERVICE_ID_ATELIERS:-}"
    "cathedral-logo-system:${RENDER_SERVICE_ID_LOGO:-}"
)

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check required environment variables
check_environment() {
    log_info "Checking environment configuration..."
    
    if [ -z "$RENDER_API_TOKEN" ]; then
        log_error "RENDER_API_TOKEN is required"
        echo "Set it with: export RENDER_API_TOKEN=your_token"
        exit 1
    fi
    
    log_success "Environment configuration validated"
}

# Install Render CLI if not present
install_render_cli() {
    if ! command -v render &> /dev/null; then
        log_info "Installing Render CLI..."
        npm install -g @render/cli
        log_success "Render CLI installed"
    else
        log_info "Render CLI already installed"
    fi
}

# Build web applications
build_web_apps() {
    log_info "Building web applications..."
    
    # Build cataract-book-scanner
    if [ -d "packages/cataract-book-scanner" ]; then
        log_info "Building cataract-book-scanner..."
        cd packages/cataract-book-scanner
        npm install
        npm run build
        cd ../..
        log_success "cataract-book-scanner built successfully"
    fi
    
    # Build hall-of-ateliers
    if [ -d "packages/hall-of-ateliers" ]; then
        log_info "Building hall-of-ateliers..."
        cd packages/hall-of-ateliers
        npm install
        npm run build
        cd ../..
        log_success "hall-of-ateliers built successfully"
    fi
    
    # Build cathedral-logo-system
    if [ -d "packages/cathedral-logo-system" ]; then
        log_info "Building cathedral-logo-system..."
        cd packages/cathedral-logo-system
        npm install
        npm run build
        cd ../..
        log_success "cathedral-logo-system built successfully"
    fi
}

# Deploy to Render
deploy_to_render() {
    log_info "Deploying to Render platform..."
    
    for service_config in "${RENDER_SERVICE_IDS[@]}"; do
        IFS=':' read -r service_name service_id <<< "$service_config"
        
        if [ -n "$service_id" ]; then
            log_info "Deploying $service_name to Render..."
            
            # Use Render CLI to deploy
            render deploy --service-id "$service_id" --token "$RENDER_API_TOKEN"
            
            log_success "$service_name deployed successfully"
        else
            log_warn "Service ID not configured for $service_name"
        fi
    done
}

# Health check function
health_check() {
    log_info "Running health checks..."
    
    # Wait for services to be ready
    sleep 30
    
    # Check each service
    for service_config in "${RENDER_SERVICE_IDS[@]}"; do
        IFS=':' read -r service_name service_id <<< "$service_config"
        
        if [ -n "$service_id" ]; then
            log_info "Checking health of $service_name..."
            
            # Get service URL (you'll need to configure this)
            service_url="https://${service_name}.onrender.com"
            
            if curl -f -s "$service_url" > /dev/null; then
                log_success "$service_name is healthy at $service_url"
            else
                log_error "$service_name health check failed at $service_url"
            fi
        fi
    done
}

# Rollback function
rollback_deployment() {
    log_warn "Rollback functionality would be implemented here"
    log_info "You can manually rollback through Render dashboard"
}

# Main deployment function
main() {
    local environment="${1:-production}"
    
    log_info "Starting Render deployment for environment: $environment"
    
    case "$environment" in
        "staging")
            log_info "Deploying to staging environment"
            ;;
        "production")
            log_info "Deploying to production environment"
            ;;
        *)
            log_error "Invalid environment: $environment"
            echo "Usage: $0 [staging|production]"
            exit 1
            ;;
    esac
    
    check_environment
    install_render_cli
    build_web_apps
    deploy_to_render
    health_check
    
    log_success "Deployment completed successfully!"
    log_info "Access your applications at:"
    log_info "- Cataract Book Scanner: https://cataract-book-scanner.onrender.com"
    log_info "- Hall of Ateliers: https://hall-of-ateliers.onrender.com"
    log_info "- Cathedral Logo System: https://cathedral-logo-system.onrender.com"
}

# Script entry point
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
        echo "Cathedral Real - Render Deployment Script"
        echo ""
        echo "Usage: $0 [environment]"
        echo ""
        echo "Environments:"
        echo "  staging    Deploy to staging environment"
        echo "  production Deploy to production environment"
        echo ""
        echo "Environment Variables Required:"
        echo "  RENDER_API_TOKEN          Render API token"
        echo "  RENDER_SERVICE_ID_CATARACT Service ID for cataract-book-scanner"
        echo "  RENDER_SERVICE_ID_ATELIERS Service ID for hall-of-ateliers"
        echo "  RENDER_SERVICE_ID_LOGO    Service ID for cathedral-logo-system"
        echo ""
        exit 0
    fi
    
    main "$@"
fi