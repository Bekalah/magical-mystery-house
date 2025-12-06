#!/usr/bin/env node

/**
 * Cathedral Build Error Enhancement and Reporting System
 * Provides enhanced error reporting and build diagnostics for the Cathedral monorepo
 * 
 * Author: Cathedral Build System Team
 * Purpose: Improve developer experience with detailed build error reporting
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CathedralBuildReporter {
  constructor() {
    this.startTime = Date.now();
    this.buildStats = {
      totalPackages: 0,
      successfulBuilds: 0,
      failedBuilds: 0,
      warnings: 0,
      errors: [],
      packages: []
    };
  }

  /**
   * Enhanced build execution with detailed reporting
   */
  async executeBuildWithReporting() {
    console.log('🏗️ Cathedral Build System - Enhanced Reporting Mode\n');
    
    try {
      // Get package list
      const packages = this.getAllPackages();
      this.buildStats.totalPackages = packages.length;
      
      console.log(`📦 Processing ${packages.length} packages...\n`);
      
      // Execute builds with enhanced error handling
      for (const packagePath of packages) {
        await this.buildPackageWithReporting(packagePath);
      }
      
      // Generate comprehensive report
      this.generateBuildReport();
      
      return this.buildStats.failedBuilds === 0;
    } catch (error) {
      console.error('❌ Build system error:', error.message);
      return false;
    }
  }

  /**
   * Get all packages in the packages directory
   */
  getAllPackages() {
    const packagesDir = path.join(__dirname, '..', 'packages');
    return fs.readdirSync(packagesDir)
      .map(name => path.join(packagesDir, name))
      .filter(dir => fs.statSync(dir).isDirectory())
      .filter(dir => fs.existsSync(path.join(dir, 'package.json')));
  }

  /**
   * Build a single package with enhanced reporting
   */
  async buildPackageWithReporting(packagePath) {
    const packageName = path.basename(packagePath);
    const packageJsonPath = path.join(packagePath, 'package.json');
    
    try {
      console.log(`🔧 Building: ${packageName}`);
      
      // Check if package has build script
      const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const buildScript = packageData.scripts?.build;
      
      if (!buildScript) {
        this.buildStats.warnings++;
        console.log(`  ⚠️  No build script defined`);
        this.buildStats.packages.push({
          name: packageName,
          status: 'no-build-script',
          warnings: ['No build script defined']
        });
        return;
      }
      
      // Execute build with timing
      const buildStart = Date.now();
      try {
        execSync(`cd ${packagePath} && ${buildScript}`, {
          stdio: 'pipe',
          encoding: 'utf8',
          timeout: 120000 // 2 minute timeout
        });
        
        const buildTime = Date.now() - buildStart;
        this.buildStats.successfulBuilds++;
        
        console.log(`  ✅ Built successfully (${buildTime}ms)`);
        this.buildStats.packages.push({
          name: packageName,
          status: 'success',
          buildTime,
          script: buildScript
        });
        
      } catch (buildError) {
        const buildTime = Date.now() - buildStart;
        this.buildStats.failedBuilds++;
        
        console.log(`  ❌ Build failed (${buildTime}ms)`);
        console.log(`     Error: ${buildError.message}`);
        
        this.buildStats.errors.push({
          package: packageName,
          error: buildError.message,
          buildTime
        });
        
        this.buildStats.packages.push({
          name: packageName,
          status: 'failed',
          buildTime,
          error: buildError.message,
          script: buildScript
        });
      }
      
    } catch (error) {
      this.buildStats.failedBuilds++;
      this.buildStats.errors.push({
        package: packageName,
        error: `Package analysis error: ${error.message}`
      });
      
      console.log(`  ❌ Package error: ${error.message}`);
    }
  }

  /**
   * Generate comprehensive build report
   */
  generateBuildReport() {
    const totalTime = Date.now() - this.startTime;
    const successRate = ((this.buildStats.successfulBuilds / this.buildStats.totalPackages) * 100).toFixed(1);
    
    console.log('\n📊 Cathedral Build System Report');
    console.log('=' .repeat(50));
    
    // Build Summary
    console.log('\n🏗️ Build Summary:');
    console.log(`  Total Packages: ${this.buildStats.totalPackages}`);
    console.log(`  ✅ Successful: ${this.buildStats.successfulBuilds}`);
    console.log(`  ❌ Failed: ${this.buildStats.failedBuilds}`);
    console.log(`  ⚠️  Warnings: ${this.buildStats.warnings}`);
    console.log(`  📈 Success Rate: ${successRate}%`);
    console.log(`  ⏱️  Total Time: ${totalTime}ms`);
    
    // Performance Metrics
    const successfulPackages = this.buildStats.packages.filter(p => p.status === 'success');
    if (successfulPackages.length > 0) {
      const avgBuildTime = successfulPackages.reduce((sum, p) => sum + p.buildTime, 0) / successfulPackages.length;
      const fastestBuild = Math.min(...successfulPackages.map(p => p.buildTime));
      const slowestBuild = Math.max(...successfulPackages.map(p => p.buildTime));
      
      console.log('\n⚡ Performance Metrics:');
      console.log(`  Average Build Time: ${avgBuildTime.toFixed(0)}ms`);
      console.log(`  Fastest Build: ${fastestBuild}ms`);
      console.log(`  Slowest Build: ${slowestBuild}ms`);
    }
    
    // Failed Builds
    if (this.buildStats.errors.length > 0) {
      console.log('\n❌ Failed Builds:');
      this.buildStats.errors.forEach(error => {
        console.log(`  • ${error.package}: ${error.error}`);
      });
    }
    
    // Turbo Configuration Validation
    console.log('\n🔧 Turbo Configuration:');
    const turboExists = fs.existsSync(path.join(__dirname, '..', 'turbo.json'));
    const packageJsonExists = fs.existsSync(path.join(__dirname, '..', 'package.json'));
    
    console.log(`  Turbo Config: ${turboExists ? '✅ Present' : '❌ Missing'}`);
    console.log(`  Root Package: ${packageJsonExists ? '✅ Present' : '❌ Missing'}`);
    
    // Recommendations
    console.log('\n💡 Recommendations:');
    
    if (this.buildStats.failedBuilds > 0) {
      console.log('  • Review failed builds for common patterns');
      console.log('  • Consider adding missing dependencies');
      console.log('  • Check TypeScript configuration in failed packages');
    }
    
    if (this.buildStats.warnings > 0) {
      console.log('  • Add build scripts to packages without them');
      console.log('  • Standardize build processes across packages');
    }
    
    const avgBuildTime = successfulPackages.length > 0 
      ? successfulPackages.reduce((sum, p) => sum + p.buildTime, 0) / successfulPackages.length
      : 0;
    
    if (avgBuildTime > 5000) {
      console.log('  • Consider optimizing slow-building packages');
      console.log('  • Review dependency graphs for unnecessary dependencies');
    }
    
    // Cathedral-Specific Checks
    console.log('\n🏰 Cathedral-Specific Validation:');
    
    const sacredGeometryPackages = this.buildStats.packages.filter(p => 
      p.name.includes('sacred-geometry') || p.name.includes('cathedral')
    );
    
    console.log(`  Sacred Geometry Packages: ${sacredGeometryPackages.length}`);
    
    if (sacredGeometryPackages.some(p => p.status === 'failed')) {
      console.log('  ⚠️  Sacred geometry packages need attention');
    }
    
    // Save detailed report to file
    this.saveDetailedReport();
    
    console.log('\n🎯 Build Optimization Target Status:');
    if (this.buildStats.failedBuilds === 0 && avgBuildTime < 300000) { // 5 minutes
      console.log('  ✅ Build system optimized and performing well!');
    } else {
      console.log('  ⚠️  Build system needs optimization attention');
    }
  }

  /**
   * Save detailed report to JSON file
   */
  saveDetailedReport() {
    const reportPath = path.join(__dirname, '..', 'build-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      totalTime: Date.now() - this.startTime,
      stats: this.buildStats,
      environment: {
        node: process.version,
        platform: process.platform,
        arch: process.arch
      }
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved: ${reportPath}`);
  }
}

// Execute if run directly
if (require.main === module) {
  const reporter = new CathedralBuildReporter();
  reporter.executeBuildWithReporting().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = CathedralBuildReporter;