#!/bin/bash
# Cathedral Real - Vercel Deployment Script
# Automated deployment with GitLab CI/CD integration

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_ROOT/deployment.log"

# Environment variables
ENVIRONMENT=${ENVIRONMENT:-"preview"}
BRANCH=${BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
COMMIT_SHA=${COMMIT_SHA:-$(git rev-parse HEAD)}
CI_PIPELINE_ID=${CI_PIPELINE_ID:-"local"}

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

log_info() { log "INFO" "$@"; }
log_warn() { log "WARN" "${YELLOW}$*${NC}"; }
log_error() { log "ERROR" "${RED}$*${NC}"; }
log_success() { log "SUCCESS" "${GREEN}$*${NC}"; }

# Check dependencies
check_dependencies() {
    log_info "Checking dependencies..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    # Check pnpm
    if ! command -v pnpm &> /dev/null; then
        log_error "pnpm is not installed"
        exit 1
    fi
    
    # Check Vercel CLI
    if ! command -v vercel &> /dev/null; then
        log_warn "Vercel CLI not found, installing..."
        npm install -g vercel@latest
    fi
    
    # Verify Vercel login
    if ! vercel whoami &> /dev/null; then
        log_error "Not logged in to Vercel. Please run 'vercel login'"
        exit 1
    fi
    
    log_success "All dependencies verified"
}

# Setup environment
setup_environment() {
    log_info "Setting up deployment environment..."
    
    cd "$PROJECT_ROOT"
    
    # Install dependencies
    log_info "Installing dependencies..."
    pnpm install --frozen-lockfile
    
    # Validate build
    log_info "Validating build configuration..."
    if [ ! -f "vercel.json" ]; then
        log_error "vercel.json not found"
        exit 1
    fi
    
    # Set Vercel environment variables
    export VERCEL_ORG_ID="${VERCEL_ORG_ID}"
    export VERCEL_PROJECT_ID="${VERCEL_PROJECT_ID}"
    export VERCEL_TOKEN="${VERCEL_TOKEN}"
    
    log_success "Environment setup complete"
}

# Build application
build_application() {
    log_info "Building application for $ENVIRONMENT..."
    
    # Build with environment-specific settings
    case "$ENVIRONMENT" in
        "production")
            export NODE_ENV=production
            export BUILD_TYPE=production
            ;;
        "preview")
            export NODE_ENV=production
            export BUILD_TYPE=preview
            ;;
        *)
            export NODE_ENV=development
            export BUILD_TYPE=development
            ;;
    esac
    
    # Run build command
    if [ -f "package.json" ]; then
        log_info "Running build: pnpm run build:ci"
        pnpm run build:ci || {
            log_error "Build failed"
            exit 1
        }
    else
        log_warn "No package.json found, skipping build"
    fi
    
    log_success "Build completed successfully"
}

# Deploy to Vercel
deploy_to_vercel() {
    log_info "Deploying to Vercel (environment: $ENVIRONMENT)..."
    
    # Prepare deployment arguments
    local deploy_args="--token $VERCEL_TOKEN"
    
    case "$ENVIRONMENT" in
        "production")
            deploy_args="$deploy_args --prod"
            ;;
        "preview")
            deploy_args="$deploy_args"
            ;;
        *)
            deploy_args="$deploy_args"
            ;;
    esac
    
    # Add metadata to deployment
    deploy_args="$deploy_args --meta cathedral-branch=$BRANCH"
    deploy_args="$deploy_args --meta cathedral-commit=$COMMIT_SHA"
    deploy_args="$deploy_args --meta cathedral-pipeline=$CI_PIPELINE_ID"
    deploy_args="$deploy_args --meta cathedral-deploy-time=$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
    
    # Pull configuration
    log_info "Pulling Vercel configuration..."
    vercel pull --yes --environment=$ENVIRONMENT --token=$VERCEL_TOKEN
    
    # Build
    log_info "Building with Vercel..."
    vercel build --token=$VERCEL_TOKEN
    
    # Deploy
    log_info "Deploying application..."
    local deploy_output
    deploy_output=$(vercel deploy --prebuilt $deploy_args 2>&1)
    
    if [ $? -eq 0 ]; then
        # Extract deployment URL
        local deployment_url
        deployment_url=$(echo "$deploy_output" | grep -E "https://.*\.vercel\.app" | tail -1)
        
        if [ -n "$deployment_url" ]; then
            log_success "Deployment successful!"
            log_info "URL: $deployment_url"
            
            # Store deployment info for monitoring
            echo "DEPLOYMENT_URL=$deployment_url" >> "$GITHUB_ENV" 2>/dev/null || true
            echo "VERCEL_DEPLOYMENT_URL=$deployment_url" >> "$GITHUB_ENV" 2>/dev/null || true
            
            return 0
        else
            log_error "Deployment succeeded but URL not found in output"
            echo "$deploy_output"
            return 1
        fi
    else
        log_error "Deployment failed"
        echo "$deploy_output"
        return 1
    fi
}

# Health check
perform_health_check() {
    log_info "Performing health check..."
    
    local deployment_url="${1:-}"
    if [ -z "$deployment_url" ]; then
        log_warn "No deployment URL provided, skipping health check"
        return 0
    fi
    
    # Basic health check
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        log_info "Health check attempt $attempt/$max_attempts..."
        
        if curl -f -s "$deployment_url" > /dev/null; then
            log_success "Health check passed"
            return 0
        fi
        
        log_warn "Health check failed, waiting 10 seconds..."
        sleep 10
        ((attempt++))
    done
    
    log_error "Health check failed after $max_attempts attempts"
    return 1
}

# Rollback deployment
rollback_deployment() {
    log_warn "Rolling back deployment..."
    
    # Get previous deployment
    local previous_deployments
    previous_deployments=$(vercel ls --token="$VERCEL_TOKEN" | grep -v "ready" | head -n 2)
    
    if [ -n "$previous_deployments" ]; then
        local deployment_url
        deployment_url=$(echo "$previous_deployments" | tail -1 | awk '{print $2}')
        
        log_info "Rolling back to: $deployment_url"
        vercel alias set "$deployment_url" "$(echo "$deployment_url" | sed 's|https://||' | sed 's|\.vercel\.app||')" --token="$VERCEL_TOKEN"
        
        if [ $? -eq 0 ]; then
            log_success "Rollback completed"
        else
            log_error "Rollback failed"
            return 1
        fi
    else
        log_error "No previous deployment found to rollback to"
        return 1
    fi
}

# Cleanup
cleanup() {
    log_info "Cleaning up temporary files..."
    
    # Remove build artifacts if needed
    # Add cleanup logic here
    
    log_success "Cleanup completed"
}

# Main deployment function
main() {
    log_info "Starting Cathedral Real deployment..."
    log_info "Environment: $ENVIRONMENT"
    log_info "Branch: $BRANCH"
    log_info "Commit: $COMMIT_SHA"
    log_info "Pipeline: $CI_PIPELINE_ID"
    
    # Set up error handling
    trap cleanup EXIT
    
    # Execute deployment steps
    check_dependencies
    setup_environment
    build_application
    
    # Perform deployment
    if deploy_to_vercel; then
        perform_health_check "${VERCEL_DEPLOYMENT_URL:-}"
        
        # Send success notification
        log_success "Deployment completed successfully for $ENVIRONMENT environment"
        exit 0
    else
        log_error "Deployment failed"
        
        # Attempt rollback if in production
        if [ "$ENVIRONMENT" = "production" ]; then
            rollback_deployment
        fi
        
        exit 1
    fi
}

# Handle script arguments
case "${1:-}" in
    "rollback")
        rollback_deployment
        ;;
    "health-check")
        perform_health_check "${2:-}"
        ;;
    "help"|"--help"|"-h")
        echo "Cathedral Real Vercel Deployment Script"
        echo ""
        echo "Usage: $0 [COMMAND]"
        echo ""
        echo "Commands:"
        echo "  deploy (default)  Deploy to Vercel"
        echo "  rollback          Rollback to previous deployment"
        echo "  health-check URL  Perform health check on deployment"
        echo "  help              Show this help message"
        echo ""
        echo "Environment variables:"
        echo "  ENVIRONMENT       Deployment environment (preview|production)"
        echo "  VERCEL_TOKEN      Vercel API token"
        echo "  VERCEL_ORG_ID     Vercel organization ID"
        echo "  VERCEL_PROJECT_ID Vercel project ID"
        exit 0
        ;;
    *)
        main
        ;;
esac