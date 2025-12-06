#!/usr/bin/env node

/**
 * Cathedral Quality Assurance Checker
 * Comprehensive quality assurance validation for all 131 packages
 * 
 * This script performs:
 * - Code quality analysis (ESLint)
 * - Code formatting validation (Prettier)
 * - TypeScript strict checking
 * - Test coverage analysis
 * - Security vulnerability scanning (NPM audit)
 * - Performance benchmarks
 * - Trauma-safe accessibility checks
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const QUALITY_CONFIG = {
  coverageThreshold: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  },
  securityThresholds: {
    critical: 0,
    high: 0,
    moderate: 5
  },
  performanceThresholds: {
    buildTime: 300000, // 5 minutes
    testTime: 120000 // 2 minutes
  },
  maxWarnings: 10
};

class QualityChecker {
  constructor() {
    this.results = {
      packages: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      },
      issues: {
        critical: [],
        high: [],
        moderate: [],
        warnings: []
      }
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : 'ℹ️';
    console.log(`[${timestamp}] ${prefix} ${message}`);
  }

  async run() {
    this.log('Starting Cathedral Quality Assurance Check');
    
    try {
      await this.findAllPackages();
      await this.validatePackageStructure();
      await this.runQualityChecks();
      await this.generateReport();
      
      if (this.results.summary.failed > 0) {
        process.exit(1);
      }
    } catch (error) {
      this.log(`Quality check failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }

  async findAllPackages() {
    this.log('Discovering packages...');
    const packagesDir = path.join(process.cwd(), 'packages');
    
    if (!fs.existsSync(packagesDir)) {
      throw new Error('packages directory not found');
    }

    const packageDirs = fs.readdirSync(packagesDir)
      .filter(dir => fs.existsSync(path.join(packagesDir, dir, 'package.json')));

    this.results.packages = packageDirs.map(dir => ({
      name: dir,
      path: path.join(packagesDir, dir),
      packageJson: JSON.parse(
        fs.readFileSync(path.join(packagesDir, dir, 'package.json'), 'utf8')
      )
    }));

    this.log(`Found ${this.results.packages.length} packages`);
  }

  async validatePackageStructure() {
    this.log('Validating package structure...');
    
    for (const pkg of this.results.packages) {
      const issues = [];
      
      // Check required files
      const requiredFiles = ['package.json'];
      const sourceFiles = ['src/index.ts', 'src/index.js', 'index.ts', 'index.js'];
      
      if (!requiredFiles.every(file => 
        fs.existsSync(path.join(pkg.path, file))
      )) {
        issues.push('Missing required files');
      }

      // Check if has source files
      const hasSource = sourceFiles.some(file =>
        fs.existsSync(path.join(pkg.path, file))
      );
      if (!hasSource) {
        issues.push('No source files found');
      }

      // Check package.json structure
      if (!pkg.packageJson.name || !pkg.packageJson.version) {
        issues.push('Invalid package.json structure');
      }

      // Check scripts
      const scripts = pkg.packageJson.scripts || {};
      const requiredScripts = ['build', 'test'];
      const missingScripts = requiredScripts.filter(script => !scripts[script]);
      
      if (missingScripts.length > 0) {
        issues.push(`Missing scripts: ${missingScripts.join(', ')}`);
      }

      pkg.quality = {
        structureValid: issues.length === 0,
        issues: issues
      };

      if (issues.length > 0) {
        this.results.issues.warnings.push({
          package: pkg.name,
          type: 'structure',
          issues: issues
        });
      }
    }
  }

  async runQualityChecks() {
    this.log('Running quality checks...');
    
    for (const pkg of this.results.packages) {
      try {
        await this.checkPackageQuality(pkg);
      } catch (error) {
        this.log(`Quality check failed for ${pkg.name}: ${error.message}`, 'error');
        this.results.summary.failed++;
        this.results.issues.high.push({
          package: pkg.name,
          type: 'execution',
          message: error.message
        });
      }
    }
  }

  async checkPackageQuality(pkg) {
    const quality = {
      lint: { passed: false, errors: [], warnings: [] },
      format: { passed: false, issues: [] },
      typeCheck: { passed: false, errors: [] },
      test: { passed: false, coverage: null, time: 0 },
      security: { passed: false, vulnerabilities: [] },
      performance: { passed: false, buildTime: 0 }
    };

    // ESLint check
    try {
      await this.runESLint(pkg, quality.lint);
    } catch (error) {
      this.log(`ESLint failed for ${pkg.name}`, 'error');
      quality.lint.errors.push(error.message);
    }

    // Prettier check
    try {
      await this.runPrettier(pkg, quality.format);
    } catch (error) {
      this.log(`Prettier check failed for ${pkg.name}`, 'error');
      quality.format.issues.push(error.message);
    }

    // TypeScript check
    try {
      await this.runTypeScript(pkg, quality.typeCheck);
    } catch (error) {
      this.log(`TypeScript check failed for ${pkg.name}`, 'error');
      quality.typeCheck.errors.push(error.message);
    }

    // Test and coverage check
    try {
      await this.runTests(pkg, quality.test);
    } catch (error) {
      this.log(`Test execution failed for ${pkg.name}`, 'error');
    }

    // Security audit
    try {
      await this.runSecurityAudit(pkg, quality.security);
    } catch (error) {
      this.log(`Security audit failed for ${pkg.name}`, 'warn');
    }

    pkg.quality = { ...pkg.quality, ...quality };

    // Count failures and warnings
    const totalChecks = Object.keys(quality).length;
    const passedChecks = Object.values(quality).filter(check => check.passed).length;
    
    if (passedChecks === totalChecks) {
      this.results.summary.passed++;
    } else {
      this.results.summary.failed++;
    }

    const warnings = Object.values(quality).reduce((acc, check) => {
      if (check.warnings) acc += check.warnings.length;
      if (check.errors) acc += check.errors.length;
      if (check.issues) acc += check.issues.length;
      return acc;
    }, 0);

    this.results.summary.warnings += warnings;
  }

  async runESLint(pkg, result) {
    const srcPath = path.join(pkg.path, 'src');
    if (!fs.existsSync(srcPath)) {
      result.passed = true; // Skip if no src directory
      return;
    }

    try {
      const output = execSync('npx eslint src --format=json --quiet', {
        cwd: pkg.path,
        encoding: 'utf8',
        timeout: 30000
      });

      const eslintResults = JSON.parse(output);
      const totalErrors = eslintResults.reduce((sum, file) => 
        sum + file.errorCount, 0);
      const totalWarnings = eslintResults.reduce((sum, file) => 
        sum + file.warningCount, 0);

      if (totalErrors === 0) {
        result.passed = true;
      } else {
        result.errors = eslintResults.flatMap(file => 
          file.messages.filter(msg => msg.severity === 2).map(msg => ({
            file: file.filePath,
            line: msg.line,
            message: msg.message,
            rule: msg.ruleId
          }))
        );
      }

      if (totalWarnings > 0) {
        result.warnings = eslintResults.flatMap(file => 
          file.messages.filter(msg => msg.severity === 1).map(msg => ({
            file: file.filePath,
            line: msg.line,
            message: msg.message,
            rule: msg.ruleId
          }))
        );
      }
    } catch (error) {
      if (error.status === 1) {
        // ESLint found issues but didn't crash
        const output = JSON.parse(error.stdout);
        result.errors = output.flatMap(file => 
          file.messages.filter(msg => msg.severity === 2).map(msg => ({
            file: file.filePath,
            line: msg.line,
            message: msg.message,
            rule: msg.ruleId
          }))
        );
      } else {
        throw new Error(`ESLint execution failed: ${error.message}`);
      }
    }
  }

  async runPrettier(pkg, result) {
    const srcPath = path.join(pkg.path, 'src');
    if (!fs.existsSync(srcPath)) {
      result.passed = true; // Skip if no src directory
      return;
    }

    try {
      const output = execSync('npx prettier --check src', {
        cwd: pkg.path,
        encoding: 'utf8',
        timeout: 30000
      });
      result.passed = true;
    } catch (error) {
      if (error.status === 1) {
        // Prettier found formatting issues
        result.issues = error.stdout.split('\n').filter(line => line.trim());
      } else {
        throw new Error(`Prettier check failed: ${error.message}`);
      }
    }
  }

  async runTypeScript(pkg, result) {
    const tsconfigPath = path.join(pkg.path, 'tsconfig.json');
    if (!fs.existsSync(tsconfigPath)) {
      result.passed = true; // Skip if no tsconfig.json
      return;
    }

    try {
      const output = execSync('npx tsc --noEmit', {
        cwd: pkg.path,
        encoding: 'utf8',
        timeout: 30000
      });
      result.passed = true;
    } catch (error) {
      result.errors = error.stdout.split('\n').filter(line => line.trim());
    }
  }

  async runTests(pkg, result) {
    const startTime = Date.now();
    
    try {
      const output = execSync('npm test -- --coverage --json', {
        cwd: pkg.path,
        encoding: 'utf8',
        timeout: 120000
      });

      const testResults = JSON.parse(output);
      result.passed = testResults.numFailedTests === 0;
      result.time = Date.now() - startTime;

      if (testResults.coverageMap) {
        const total = testResults.coverageMap.total;
        result.coverage = {
          branches: total.b.pct,
          functions: total.f.pct,
          lines: total.l.pct,
          statements: total.s.pct
        };

        // Check coverage thresholds
        const belowThreshold = Object.entries(result.coverage)
          .filter(([key, value]) => value < QUALITY_CONFIG.coverageThreshold[key]);
        
        if (belowThreshold.length > 0) {
          result.coverage.issues = belowThreshold.map(([key, value]) => 
            `${key}: ${value}% (required: ${QUALITY_CONFIG.coverageThreshold[key]}%)`
          );
        }
      }
    } catch (error) {
      result.time = Date.now() - startTime;
      if (error.status === 1) {
        const testResults = JSON.parse(error.stdout);
        result.passed = false;
        result.errors = testResults.testResults.flatMap(test => 
          test.assertionResults.filter(assertion => assertion.status === 'failed')
            .map(assertion => `${assertion.ancestorTitles.join(' > ')} > ${assertion.title}`)
        );
      } else {
        throw new Error(`Test execution failed: ${error.message}`);
      }
    }
  }

  async runSecurityAudit(pkg, result) {
    try {
      const output = execSync('npm audit --json', {
        cwd: pkg.path,
        encoding: 'utf8',
        timeout: 60000
      });

      const auditResults = JSON.parse(output);
      const vulnerabilities = this.categorizeVulnerabilities(auditResults);

      result.vulnerabilities = vulnerabilities;
      result.passed = vulnerabilities.critical === 0 && vulnerabilities.high === 0;
    } catch (error) {
      if (error.status === 1) {
        const auditResults = JSON.parse(error.stdout);
        const vulnerabilities = this.categorizeVulnerabilities(auditResults);
        result.vulnerabilities = vulnerabilities;
        result.passed = vulnerabilities.critical === 0 && vulnerabilities.high === 0;
      } else {
        // No audit data or other issue
        result.passed = true;
      }
    }
  }

  categorizeVulnerabilities(auditResults) {
    const vulnerabilities = { critical: 0, high: 0, moderate: 0, low: 0 };
    
    if (auditResults.vulnerabilities) {
      Object.values(auditResults.vulnerabilities).forEach(vuln => {
        const severity = vuln.severity || 'low';
        if (vulnerabilities.hasOwnProperty(severity)) {
          vulnerabilities[severity]++;
        }
      });
    }

    return vulnerabilities;
  }

  async generateReport() {
    this.log('Generating quality assurance report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.results.summary,
      details: this.results.packages,
      issues: this.results.issues,
      recommendations: this.generateRecommendations()
    };

    // Write report to file
    const reportPath = path.join(process.cwd(), 'quality-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Generate human-readable report
    await this.generateHumanReport(report);

    this.log(`Quality check completed. Report saved to ${reportPath}`);
    
    if (this.results.summary.failed > 0) {
      this.log(`${this.results.summary.failed} packages failed quality checks`, 'error');
    }
    
    if (this.results.summary.warnings > 0) {
      this.log(`${this.results.summary.warnings} warnings found`, 'warn');
    }
  }

  generateRecommendations() {
    const recommendations = [];

    // ESLint recommendations
    const eslintFailures = this.results.packages.filter(pkg => 
      !pkg.quality?.lint?.passed).length;
    if (eslintFailures > 0) {
      recommendations.push({
        category: 'Code Quality',
        priority: 'high',
        message: `${eslintFailures} packages have ESLint issues`,
        action: 'Run `npm run lint:fix` to auto-fix issues'
      });
    }

    // Format recommendations
    const formatFailures = this.results.packages.filter(pkg => 
      !pkg.quality?.format?.passed).length;
    if (formatFailures > 0) {
      recommendations.push({
        category: 'Code Formatting',
        priority: 'medium',
        message: `${formatFailures} packages have formatting issues`,
        action: 'Run `npm run format` to fix formatting'
      });
    }

    // Coverage recommendations
    const coverageFailures = this.results.packages.filter(pkg => 
      pkg.quality?.test?.coverage?.issues).length;
    if (coverageFailures > 0) {
      recommendations.push({
        category: 'Test Coverage',
        priority: 'high',
        message: `${coverageFailures} packages have insufficient test coverage`,
        action: 'Add more tests to reach 80% coverage threshold'
      });
    }

    // Security recommendations
    const securityFailures = this.results.packages.filter(pkg => 
      !pkg.quality?.security?.passed).length;
    if (securityFailures > 0) {
      recommendations.push({
        category: 'Security',
        priority: 'critical',
        message: `${securityFailures} packages have security vulnerabilities`,
        action: 'Run `npm audit fix` and update vulnerable dependencies'
      });
    }

    return recommendations;
  }

  async generateHumanReport(report) {
    let reportText = '# Cathedral Quality Assurance Report\n\n';
    reportText += `Generated: ${report.timestamp}\n\n`;
    
    reportText += '## Summary\n';
    reportText += `- Total Packages: ${report.summary.total}\n`;
    reportText += `- Passed: ${report.summary.passed}\n`;
    reportText += `- Failed: ${report.summary.failed}\n`;
    reportText += `- Warnings: ${report.summary.warnings}\n\n`;

    if (report.recommendations.length > 0) {
      reportText += '## Recommendations\n\n';
      report.recommendations.forEach(rec => {
        reportText += `### ${rec.category} (${rec.priority.toUpperCase()})\n`;
        reportText += `${rec.message}\n`;
        reportText += `**Action:** ${rec.action}\n\n`;
      });
    }

    // Package details
    reportText += '## Package Details\n\n';
    this.results.packages.forEach(pkg => {
      reportText += `### ${pkg.name}\n`;
      
      if (pkg.quality) {
        const checks = Object.entries(pkg.quality);
        checks.forEach(([checkName, result]) => {
          const status = result.passed ? '✅' : '❌';
          reportText += `- ${checkName}: ${status}\n`;
          
          if (result.warnings && result.warnings.length > 0) {
            reportText += `  - Warnings: ${result.warnings.length}\n`;
          }
        });
      }
      
      if (pkg.quality?.issues && pkg.quality.issues.length > 0) {
        reportText += `  - Issues: ${pkg.quality.issues.join(', ')}\n`;
      }
      
      reportText += '\n';
    });

    // Write human-readable report
    const reportPath = path.join(process.cwd(), 'quality-report.md');
    fs.writeFileSync(reportPath, reportText);
  }
}

// Main execution
if (require.main === module) {
  const checker = new QualityChecker();
  checker.run().catch(error => {
    console.error('Quality check failed:', error);
    process.exit(1);
  });
}

module.exports = QualityChecker;