#!/bin/bash

# Cathedral Real - Deployment Validation Script
# Comprehensive testing and validation of build system and deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
VALIDATION_LOG="validation_${TIMESTAMP}.log"

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$VALIDATION_LOG"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$VALIDATION_LOG"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$VALIDATION_LOG"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$VALIDATION_LOG"
}

# Validation counters
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

# Test result tracking
record_test() {
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    if [ "$1" = "PASS" ]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        log_success "✅ Test $TESTS_TOTAL: $2"
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        log_error "❌ Test $TESTS_TOTAL: $2"
    fi
}

# Initialize validation log
echo "=== Cathedral Real - Deployment Validation ===" | tee "$VALIDATION_LOG"
echo "Timestamp: $(date)" | tee -a "$VALIDATION_LOG"
echo "Working Directory: $(pwd)" | tee -a "$VALIDATION_LOG"
echo "" | tee -a "$VALIDATION_LOG"

# 1. Environment Validation
log_info "🔧 Phase 1: Environment Validation"

# Check Node.js version
NODE_VERSION=$(node --version)
log_info "Node.js Version: $NODE_VERSION"
if [[ $NODE_VERSION =~ v20\. ]]; then
    record_test "PASS" "Node.js version $NODE_VERSION is correct"
else
    record_test "FAIL" "Node.js version should be 20.x, found $NODE_VERSION"
fi

# Check npm version
NPM_VERSION=$(npm --version)
log_info "npm Version: $NPM_VERSION"

# Check pnpm
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm --version)
    log_info "pnpm Version: $PNPM_VERSION"
    record_test "PASS" "pnpm is installed (v$PNPM_VERSION)"
else
    log_warn "pnpm not found - will install during build"
fi

# Check required files
REQUIRED_FILES=(
    "package.json"
    "turbo.json"
    "render.yaml"
    "scripts/deploy-render.sh"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        record_test "PASS" "Required file exists: $file"
    else
        record_test "FAIL" "Required file missing: $file"
    fi
done

# 2. Package Configuration Validation
log_info "📦 Phase 2: Package Configuration Validation"

# Validate root package.json
if [ -f "package.json" ]; then
    # Check for turbo configuration
    if grep -q '"turbo"' package.json; then
        record_test "PASS" "Root package.json has turbo configuration"
    else
        record_test "FAIL" "Root package.json missing turbo configuration"
    fi

    # Check for workspace configuration
    if grep -q '"workspaces"' package.json; then
        record_test "PASS" "Root package.json has workspace configuration"
    else
        record_test "FAIL" "Root package.json missing workspace configuration"
    fi
fi

# Validate turbo.json
if [ -f "turbo.json" ]; then
    if grep -q '"pipeline"' turbo.json; then
        record_test "PASS" "turbo.json has pipeline configuration"
    else
        record_test "FAIL" "turbo.json missing pipeline configuration"
    fi
fi

# 3. Vite Configuration Validation
log_info "⚡ Phase 3: Vite Configuration Validation"

# Check packages with Vite configs
VITE_PACKAGES=(
    "packages/cataract-book-scanner"
    "packages/hall-of-ateliers" 
    "packages/cathedral-logo-system"
)

for package in "${VITE_PACKAGES[@]}"; do
    if [ -d "$package" ]; then
        # Check for vite.config.ts or vite.config.js
        if [ -f "$package/vite.config.ts" ] || [ -f "$package/vite.config.js" ]; then
            record_test "PASS" "Vite config found for $package"
        else
            record_test "FAIL" "Vite config missing for $package"
        fi

        # Check package.json scripts
        if [ -f "$package/package.json" ]; then
            if grep -q '"build"' "$package/package.json"; then
                record_test "PASS" "Build script found in $package"
            else
                record_test "FAIL" "Build script missing in $package"
            fi

            if grep -q '"dev"' "$package/package.json"; then
                record_test "PASS" "Dev script found in $package"
            else
                record_test "FAIL" "Dev script missing in $package"
            fi
        fi
    fi
done

# 4. Node.js Version Consistency Check
log_info "🔄 Phase 4: Node.js Version Consistency"

# Check package.json files for Node.js engine specification
PACKAGE_JSON_FILES=$(find packages -name "package.json" -type f)
TOTAL_PACKAGES=0
CONSISTENT_PACKAGES=0

for pkg_file in $PACKAGE_JSON_FILES; do
    TOTAL_PACKAGES=$((TOTAL_PACKAGES + 1))
    
    if grep -q '"engines".*"node".*">=20\.18\.0"' "$pkg_file" || \
       grep -q '"engines".*"node".*">=20"' "$pkg_file"; then
        CONSISTENT_PACKAGES=$((CONSISTENT_PACKAGES + 1))
    fi
done

if [ $TOTAL_PACKAGES -gt 0 ]; then
    CONSISTENCY_PERCENT=$((CONSISTENT_PACKAGES * 100 / TOTAL_PACKAGES))
    log_info "Node.js version consistency: $CONSISTENT_PACKAGES/$TOTAL_PACKAGES packages ($CONSISTENCY_PERCENT%)"
    
    if [ $CONSISTENCY_PERCENT -ge 80 ]; then
        record_test "PASS" "Node.js version consistency is good ($CONSISTENCY_PERCENT%)"
    else
        record_test "FAIL" "Node.js version consistency is poor ($CONSISTENCY_PERCENT%)"
    fi
fi

# 5. Build System Test
log_info "🏗️ Phase 5: Build System Test"

# Test package installation
log_info "Testing package installation..."
if npm install &> /dev/null; then
    record_test "PASS" "npm install completed successfully"
else
    record_test "FAIL" "npm install failed"
fi

# Test Turbo build for a single package
log_info "Testing Turbo build for cataract-book-scanner..."
if cd packages/cataract-book-scanner && npm run build &> /dev/null; then
    record_test "PASS" "Turbo build successful for cataract-book-scanner"
    cd ../..
else
    record_test "FAIL" "Turbo build failed for cataract-book-scanner"
    cd ../..
fi

# 6. Deployment Configuration Validation
log_info "🚀 Phase 6: Deployment Configuration Validation"

# Check render.yaml
if [ -f "render.yaml" ]; then
    # Check for required services
    SERVICES=("cataract-book-scanner" "hall-of-ateliers" "cathedral-logo-system")
    
    for service in "${SERVICES[@]}"; do
        if grep -q "name: $service" render.yaml; then
            record_test "PASS" "Service configured: $service"
        else
            record_test "FAIL" "Service missing: $service"
        fi
    done
fi

# Check deployment script permissions
if [ -f "scripts/deploy-render.sh" ]; then
    if [ -x "scripts/deploy-render.sh" ]; then
        record_test "PASS" "Deploy script is executable"
    else
        log_warn "Deploy script is not executable - fixing..."
        chmod +x scripts/deploy-render.sh
        record_test "PASS" "Deploy script permissions fixed"
    fi
fi

# 7. TypeScript Configuration Check
log_info "📘 Phase 7: TypeScript Configuration"

TS_PACKAGES=(
    "packages/cataract-book-scanner"
    "packages/hall-of-ateliers"
    "packages/cathedral-logo-system"
)

for package in "${TS_PACKAGES[@]}"; do
    if [ -d "$package" ]; then
        # Check for tsconfig.json
        if [ -f "$package/tsconfig.json" ]; then
            record_test "PASS" "tsconfig.json found for $package"
            
            # Check if Vite is properly configured for TypeScript
            if [ -f "$package/vite.config.ts" ]; then
                if grep -q "resolve.*extensions.*ts" "$package/vite.config.ts"; then
                    record_test "PASS" "Vite TypeScript resolution configured for $package"
                else
                    record_test "FAIL" "Vite TypeScript resolution missing for $package"
                fi
            fi
        else
            record_test "FAIL" "tsconfig.json missing for $package"
        fi
    fi
done

# 8. CI/CD Pipeline Validation
log_info "🔄 Phase 8: CI/CD Pipeline Validation"

# Check GitHub workflows
if [ -d ".github/workflows" ]; then
    WORKFLOWS=("ci.yml" "docs.yml" "release.yml")
    
    for workflow in "${WORKFLOWS[@]}"; do
        if [ -f ".github/workflows/$workflow" ]; then
            record_test "PASS" "GitHub workflow exists: $workflow"
        else
            record_test "FAIL" "GitHub workflow missing: $workflow"
        fi
    done
fi

# 9. Performance Benchmark
log_info "⚡ Phase 9: Performance Benchmark"

# Test build performance for multiple packages
log_info "Testing build performance..."
START_TIME=$(date +%s)

cd packages/cataract-book-scanner
npm run build &> /dev/null
cd ../..

END_TIME=$(date +%s)
BUILD_TIME=$((END_TIME - START_TIME))

log_info "Build time for cataract-book-scanner: ${BUILD_TIME}s"

if [ $BUILD_TIME -le 30 ]; then
    record_test "PASS" "Build performance is good (${BUILD_TIME}s)"
else
    record_test "FAIL" "Build performance needs improvement (${BUILD_TIME}s)"
fi

# 10. Final Summary
log_info "📊 Phase 10: Validation Summary"

echo "" | tee -a "$VALIDATION_LOG"
echo "=== VALIDATION RESULTS ===" | tee -a "$VALIDATION_LOG"
echo "Total Tests: $TESTS_TOTAL" | tee -a "$VALIDATION_LOG"
echo "Passed: $TESTS_PASSED" | tee -a "$VALIDATION_LOG"
echo "Failed: $TESTS_FAILED" | tee -a "$VALIDATION_LOG"
echo "Success Rate: $((TESTS_PASSED * 100 / TESTS_TOTAL))%" | tee -a "$VALIDATION_LOG"
echo "" | tee -a "$VALIDATION_LOG"

if [ $TESTS_FAILED -eq 0 ]; then
    log_success "🎉 All validation tests PASSED!"
    log_success "Deployment system is ready for production"
    echo "Validation completed successfully" > "validation_success_${TIMESTAMP}.txt"
    exit 0
else
    log_error "⚠️  Some validation tests FAILED!"
    log_error "Please review the issues above before deploying"
    echo "Validation completed with failures" > "validation_failed_${TIMESTAMP}.txt"
    exit 1
fi