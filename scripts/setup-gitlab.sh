#!/bin/bash

# Cathedral Real - GitLab Setup & Service Connection Script
# Sets up everything for free deployment to Render, Vercel, Coolify (Self-Hosted), and Godot

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SETUP_LOG="setup_$(date +%Y%m%d_%H%M%S).log"

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$SETUP_LOG"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$SETUP_LOG"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$SETUP_LOG"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$SETUP_LOG"
}

# Banner
echo -e "${BLUE}"
echo "🏛️  CATHEDRAL REAL - GITLAB SETUP & DEPLOYMENT"
echo "=================================================="
echo -e "${NC}"

log_info "Starting GitLab setup and service connection..."
log_info "Setup log: $SETUP_LOG"

# 1. Check Prerequisites
log_info "📋 Phase 1: Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    log_error "Node.js not found. Please install Node.js 20.18.0+"
    exit 1
fi

NODE_VERSION=$(node --version)
log_success "Node.js found: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    log_error "npm not found. Please install npm"
    exit 1
fi

NPM_VERSION=$(npm --version)
log_success "npm found: $NPM_VERSION"

# 2. Install Dependencies
log_info "📦 Phase 2: Installing dependencies..."

if [ -f "package.json" ]; then
    if command -v pnpm &> /dev/null; then
        log_info "Using pnpm for installation..."
        pnpm install
    else
        log_info "Installing pnpm globally..."
        npm install -g pnpm
        pnpm install
    fi
    log_success "Dependencies installed successfully"
else
    log_error "package.json not found in current directory"
    exit 1
fi

# 3. Validate Package Structure
log_info "🔍 Phase 3: Validating package structure..."

REQUIRED_PACKAGES=(
    "cataract-book-scanner"
    "hall-of-ateliers"
    "cathedral-logo-system"
    "brain"
    "arcana"
    "cosmogenesis"
    "stone-grimoire"
)

for package in "${REQUIRED_PACKAGES[@]}"; do
    if [ -d "packages/$package" ]; then
        log_success "Package found: $package"
    else
        log_warn "Package missing: $package"
    fi
done

# 4. Setup Render Services
log_info "🎨 Phase 4: Setting up Render deployment..."

if [ -f "render.yaml" ]; then
    log_success "Render configuration found (render.yaml)"
    log_info "To deploy to Render:"
    log_info "1. Create a Render account at https://render.com"
    log_info "2. Connect your GitLab repository"
    log_info "3. Create 3 web services using these names:"
    log_info "   - cataract-book-scanner"
    log_info "   - hall-of-ateliers"
    log_info "   - cathedral-logo-system"
    log_info "4. Add service IDs to GitLab CI/CD variables:"
    log_info "   - RENDER_SERVICE_ID_CATARACT"
    log_info "   - RENDER_SERVICE_ID_ATELIERS"
    log_info "   - RENDER_SERVICE_ID_LOGO"
else
    log_error "render.yaml not found"
fi

# 5. Setup Vercel Services
log_info "⚡ Phase 5: Setting up Vercel deployment..."

log_info "To deploy to Vercel:"
log_info "1. Create a Vercel account at https://vercel.com"
log_info "2. Install Vercel CLI: npm install -g vercel"
log_info "3. Run: vercel login"
log_info "4. Run: vercel --prod in each package directory"
log_info "5. Add VERCEL_TOKEN to GitLab CI/CD variables"

# 6. Setup Coolify Self-Hosted Platform
log_info "🏠 Phase 6: Setting up Coolify Self-Hosted Platform..."

log_info "To deploy with Coolify (Self-Hosted):"
log_info "1. Follow setup guide: docs/COOLIFY_SETUP_GUIDE.md"
log_info "2. Deploy Coolify stack: cd coolify && docker compose up -d"
log_info "3. Access Coolify dashboard at http://your-server-ip:3000"
log_info "4. Add COOLIFY_HOST and COOLIFY_TOKEN to GitLab CI/CD variables"

# 7. Setup Godot Services
log_info "🎮 Phase 7: Setting up Godot Cloud..."

log_info "To deploy Godot games:"
log_info "1. Create a Godot Cloud account"
log_info "2. Upload .pck files from godot packages"
log_info "3. Add GODOT_CLOUD_PROJECT_ID to GitLab CI/CD variables"

# 8. Create GitLab CI/CD Variables Template
log_info "🔧 Phase 8: Creating GitLab CI/CD variables template..."

cat > .gitlab-ci-vars-template.txt << 'EOF'
# GitLab CI/CD Variables Template
# Add these variables in your GitLab project settings → CI/CD → Variables

# Core Configuration
NODE_VERSION=20.18.0
PNPM_VERSION=8

# Render Deployment
RENDER_API_TOKEN=your_render_api_token_here
RENDER_SERVICE_ID_CATARACT=your_cataract_service_id_here
RENDER_SERVICE_ID_ATELIERS=your_ateliers_service_id_here
RENDER_SERVICE_ID_LOGO=your_logo_service_id_here

# Vercel Deployment
VERCEL_TOKEN=your_vercel_token_here

# Coolify Self-Hosted
COOLIFY_HOST=your_coolify_server_ip
COOLIFY_TOKEN=your_coolify_token

# Godot Cloud
GODOT_CLOUD_PROJECT_ID=your_godot_project_id_here

# NPM (if publishing packages)
NPM_TOKEN=your_npm_token_here
EOF

log_success "Created GitLab CI/CD variables template: .gitlab-ci-vars-template.txt"

# 9. Generate Service Deployment Guide
log_info "📚 Phase 9: Generating service deployment guide..."

cat > DEPLOYMENT_GUIDE.md << 'EOF'
# 🚀 Cathedral Real - Free Deployment Guide

## Quick Setup Steps

### 1. Clone to GitLab
```bash
git remote remove origin
git remote add origin https://gitlab.com/your-username/cathedral-real.git
git push -u origin main
```

### 2. Add CI/CD Variables to GitLab
Copy variables from `.gitlab-ci-vars-template.txt` to:
**Project Settings → CI/CD → Variables**

### 3. Setup Each Service

#### 🎨 Render (3 Web Apps)
1. Sign up at https://render.com
2. Create 3 web services:
   - cataract-book-scanner
   - hall-of-ateliers  
   - cathedral-logo-system
3. Connect to GitLab repo
4. Copy service IDs to GitLab variables

#### ⚡ Vercel (Frontend)
1. Sign up at https://vercel.com
2. Install CLI: `npm install -g vercel`
3. Deploy each app: `vercel --prod`
4. Add token to GitLab variables

#### 🏠 Coolify Self-Hosted
1. Follow setup guide: docs/COOLIFY_SETUP_GUIDE.md
2. Deploy Coolify stack with Docker Compose
3. Access dashboard at http://your-server-ip:3000
4. Add Coolify credentials to GitLab variables

#### 🎮 Godot Cloud (Games)
1. Sign up at Godot Cloud
2. Upload game files
3. Add project ID to GitLab variables

## Live URLs (After Deployment)
- cataract-book-scanner.onrender.com
- cataract-book-scanner.vercel.app
- cataract-book-scanner.pages.dev
- hall-of-ateliers.onrender.com
- cathedral-logo-system.onrender.com

**Total Cost: $0/month**
EOF

log_success "Created deployment guide: DEPLOYMENT_GUIDE.md"

# 10. Final Validation
log_info "✅ Phase 10: Running final validation..."

# Test build
if pnpm run build &> /dev/null; then
    log_success "Build test passed"
else
    log_warn "Build test failed - check logs"
fi

# Test validation script
if [ -f "scripts/validate-deployment.sh" ]; then
    chmod +x scripts/validate-deployment.sh
    log_success "Validation script ready"
else
    log_warn "Validation script not found"
fi

# Summary
echo ""
echo -e "${GREEN}🎉 SETUP COMPLETE!"
echo "=================="
echo -e "${NC}"
log_info "Your Cathedral Real project is ready for GitLab and free deployment!"
echo ""
log_info "Next steps:"
echo "1. Copy .gitlab-ci-vars-template.txt to GitLab CI/CD variables"
echo "2. Setup Render, Vercel, Cloudflare, and Godot accounts"
echo "3. Push to GitLab and let CI/CD handle deployment"
echo "4. Access your live apps!"
echo ""
log_success "Happy building! 🚀"
echo ""

# Create success marker
echo "Setup completed on $(date)" > "setup_success_$(date +%Y%m%d).txt"