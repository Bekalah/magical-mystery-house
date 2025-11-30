#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

/**
 * Monorepo Foundation Tool
 * Ensures coherence across monorepo - everything interconnected OR standalone working
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Monorepo Foundation Tool');
logger.info('   → Ensures coherence across monorepo');
logger.info('   → Validates interconnected OR standalone working');
logger.info('   → Foundations ideas and apps together\n');

function checkPackageStructure() {
  const packagesDir = path.join(BASE_DIR, 'packages');
  const issues = [];
  const recommendations = [];

  if (!fs.existsSync(packagesDir)) {
    issues.push('packages/ directory does not exist');
    recommendations.push('Create packages/ directory structure');
    return { issues, recommendations };
  }

  const packages = fs.readdirSync(packagesDir)
    .filter(p => {
      const pkgPath = path.join(packagesDir, p);
      return fs.statSync(pkgPath).isDirectory();
    });

  // Check for shared core
  const hasSharedCore = packages.some(p => p.includes('shared') || p.includes('core'));
  if (!hasSharedCore) {
    recommendations.push('Create packages/shared-core/ for common utilities');
  }

  // Check for registry
  const hasRegistry = packages.some(p => p.includes('registry'));
  if (!hasRegistry) {
    recommendations.push('Create packages/registry/ for centralized data management');
  }

  // Check for integration
  const hasIntegration = packages.some(p => p.includes('integration'));
  if (!hasIntegration) {
    recommendations.push('Create packages/integration/ for cross-app communication');
  }

  // Check package.json in each package
  packages.forEach(pkg => {
    const pkgPath = path.join(packagesDir, pkg);
    const pkgJson = path.join(pkgPath, 'package.json');
    
    if (!fs.existsSync(pkgJson)) {
      issues.push(`${pkg}/package.json missing`);
    } else {
      try {
        const pkgData = JSON.parse(fs.readFileSync(pkgJson, 'utf-8'));
        
        // Check if package can work standalone
        if (!pkgData.main && !pkgData.exports) {
          recommendations.push(`${pkg}: Add main or exports for standalone usage`);
        }
        
        // Check for shared dependencies
        if (pkgData.dependencies) {
          const sharedDeps = Object.keys(pkgData.dependencies).filter(dep => 
            dep.startsWith('@cathedral/') || dep.includes('shared')
          );
          if (sharedDeps.length === 0 && pkg !== 'shared-core') {
            recommendations.push(`${pkg}: Consider using shared-core for common utilities`);
          }
        }
      } catch {
        issues.push(`${pkg}/package.json is invalid`);
      }
    }
  });

  return { packages, issues, recommendations };
}

function checkInterconnection() {
  const issues = [];
  const recommendations = [];

  // Check for cross-package imports
  const packagesDir = path.join(BASE_DIR, 'packages');
  if (!fs.existsSync(packagesDir)) {
    return { issues, recommendations };
  }

  const packages = fs.readdirSync(packagesDir)
    .filter(p => {
      const pkgPath = path.join(packagesDir, p);
      return fs.statSync(pkgPath).isDirectory();
    });

  // Check for shared event system
  const hasEventSystem = packages.some(pkg => {
    const pkgPath = path.join(packagesDir, pkg);
    const files = getAllFiles(pkgPath);
    return files.some(f => f.includes('event') || f.includes('Event'));
  });

  if (!hasEventSystem) {
    recommendations.push('Create shared event system for cross-app communication');
  }

  // Check for shared state management
  const hasStateManagement = packages.some(pkg => {
    const pkgPath = path.join(packagesDir, pkg);
    const files = getAllFiles(pkgPath);
    return files.some(f => f.includes('state') || f.includes('State'));
  });

  if (!hasStateManagement) {
    recommendations.push('Create shared state management for cross-app synchronization');
  }

  return { issues, recommendations };
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function checkStandaloneCapability() {
  const issues = [];
  const recommendations = [];

  const packagesDir = path.join(BASE_DIR, 'packages');
  if (!fs.existsSync(packagesDir)) {
    return { issues, recommendations };
  }

  const packages = fs.readdirSync(packagesDir)
    .filter(p => {
      const pkgPath = path.join(packagesDir, p);
      return fs.statSync(pkgPath).isDirectory();
    });

  packages.forEach(pkg => {
    const pkgPath = path.join(packagesDir, pkg);
    const pkgJson = path.join(pkgPath, 'package.json');
    
    if (fs.existsSync(pkgJson)) {
      try {
        const pkgData = JSON.parse(fs.readFileSync(pkgJson, 'utf-8'));
        
        // Check if package has README
        const readme = path.join(pkgPath, 'README.md');
        if (!fs.existsSync(readme)) {
          recommendations.push(`${pkg}: Add README.md explaining standalone usage`);
        }
        
        // Check for entry point
        if (!pkgData.main && !pkgData.exports && !pkgData.bin) {
          issues.push(`${pkg}: Missing entry point (main, exports, or bin)`);
        }
      } catch {
        // Skip invalid package.json
      }
    }
  });

  return { issues, recommendations };
}

async function foundationMonorepo() {
  UserFeedback.section('Monorepo Foundation Analysis');

  const structure = checkPackageStructure();
  const interconnection = checkInterconnection();
  const standalone = checkStandaloneCapability();

  UserFeedback.section('Package Structure');
  logger.info(`Packages found: ${structure.packages?.length || 0}`);
  if (structure.issues.length > 0) {
    logger.warn(`Issues: ${structure.issues.length}`);
    structure.issues.forEach(issue => logger.warn(`  - ${issue}`));
  }
  if (structure.recommendations.length > 0) {
    logger.info(`Recommendations: ${structure.recommendations.length}`);
    structure.recommendations.forEach(rec => logger.info(`  • ${rec}`));
  }

  UserFeedback.section('Interconnection');
  if (interconnection.issues.length > 0) {
    logger.warn(`Issues: ${interconnection.issues.length}`);
    interconnection.issues.forEach(issue => logger.warn(`  - ${issue}`));
  }
  if (interconnection.recommendations.length > 0) {
    logger.info(`Recommendations: ${interconnection.recommendations.length}`);
    interconnection.recommendations.forEach(rec => logger.info(`  • ${rec}`));
  }

  UserFeedback.section('Standalone Capability');
  if (standalone.issues.length > 0) {
    logger.warn(`Issues: ${standalone.issues.length}`);
    standalone.issues.forEach(issue => logger.warn(`  - ${issue}`));
  }
  if (standalone.recommendations.length > 0) {
    logger.info(`Recommendations: ${standalone.recommendations.length}`);
    standalone.recommendations.forEach(rec => logger.info(`  • ${rec}`));
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    structure,
    interconnection,
    standalone,
    summary: {
      totalIssues: structure.issues.length + interconnection.issues.length + standalone.issues.length,
      totalRecommendations: structure.recommendations.length + interconnection.recommendations.length + standalone.recommendations.length,
      packagesCount: structure.packages?.length || 0
    }
  };

  const reportPath = path.join(BASE_DIR, '.monorepo-foundation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  logger.info(`\n📄 Foundation report saved: ${reportPath}`);

  if (report.summary.totalIssues === 0) {
    UserFeedback.success('\n✅ Monorepo foundation is solid!');
  } else {
    UserFeedback.warning(`\n⚠️  ${report.summary.totalIssues} issues found. See recommendations above.`);
  }

  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  foundationMonorepo();
}

export { foundationMonorepo, checkPackageStructure, checkInterconnection, checkStandaloneCapability };

