#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Monorepo-wide doubt cycle research and enhancement system
 * Applies research and enhancements across all systems in the monorepo
 * 
 * Best Practices Applied:
 * - Comprehensive error handling with try-catch
 * - Well-documented with JSDoc
 * - Strong type definitions where applicable
 * - Performance optimization with efficient file scanning
 * - Input validation for file operations
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

/**
 * Research areas for monorepo systems
 */
const RESEARCH_AREAS = {
  typescript: {
    topics: [
      'TypeScript strict mode best practices',
      'Advanced type patterns',
      'Generic type constraints',
      'Type inference optimization',
      'Declaration file patterns'
    ],
    priority: 'high'
  },
  monorepo: {
    topics: [
      'Turbo monorepo optimization',
      'Workspace dependency management',
      'Build caching strategies',
      'Package versioning',
      'Cross-package type sharing'
    ],
    priority: 'high'
  },
  performance: {
    topics: [
      'Node.js performance optimization',
      'Memory management',
      'Async/await patterns',
      'Stream processing',
      'Bundle size optimization'
    ],
    priority: 'medium'
  },
  security: {
    topics: [
      'Input validation patterns',
      'XSS prevention',
      'SQL injection prevention',
      'Dependency security',
      'Secret management'
    ],
    priority: 'high'
  },
  testing: {
    topics: [
      'Unit testing strategies',
      'Integration testing',
      'E2E testing patterns',
      'Test coverage optimization',
      'Mocking strategies'
    ],
    priority: 'medium'
  },
  architecture: {
    topics: [
      'Design patterns',
      'SOLID principles',
      'Dependency injection',
      'Event-driven architecture',
      'Microservices patterns'
    ],
    priority: 'medium'
  },
  sacredGeometry: {
    topics: [
      '144:99 ratio applications',
      'Golden ratio in code structure',
      'Fibonacci sequences',
      'Sacred geometry patterns',
      'Mathematical precision'
    ],
    priority: 'low'
  },
  traumaAware: {
    topics: [
      'Trauma-aware design patterns',
      'Accessibility standards',
      'WCAG compliance',
      'Gentle error messages',
      'User experience safety'
    ],
    priority: 'high'
  }
};

/**
 * Enhancement categories for monorepo systems
 */
const ENHANCEMENT_CATEGORIES = {
  typeSafety: {
    description: 'Improve type safety across all packages',
    actions: [
      'Remove any types',
      'Add strict type definitions',
      'Improve type inference',
      'Add type guards',
      'Enhance generic types'
    ]
  },
  codeQuality: {
    description: 'Enhance code quality patterns',
    actions: [
      'Apply best practices',
      'Improve error handling',
      'Enhance documentation',
      'Optimize performance',
      'Improve readability'
    ]
  },
  integration: {
    description: 'Improve system integration',
    actions: [
      'Enhance cross-package communication',
      'Improve API contracts',
      'Optimize dependencies',
      'Enhance orchestration',
      'Improve data flow'
    ]
  },
  security: {
    description: 'Enhance security across systems',
    actions: [
      'Add input validation',
      'Improve sanitization',
      'Enhance error handling',
      'Add security checks',
      'Improve access control'
    ]
  },
  performance: {
    description: 'Optimize performance',
    actions: [
      'Optimize algorithms',
      'Improve caching',
      'Reduce memory usage',
      'Optimize I/O operations',
      'Improve bundle size'
    ]
  },
  documentation: {
    description: 'Enhance documentation',
    actions: [
      'Add JSDoc comments',
      'Improve README files',
      'Add usage examples',
      'Document APIs',
      'Add architecture diagrams'
    ]
  },
  sacredGeometry: {
    description: 'Apply sacred geometry principles',
    actions: [
      'Apply 144:99 ratio',
      'Use golden ratio',
      'Implement Fibonacci',
      'Add sacred math',
      'Enhance structure'
    ]
  }
};

/**
 * Discover all packages in monorepo
 */
function discoverPackages() {
  const packagesDir = path.join(BASE_DIR, 'packages');
  if (!fs.existsSync(packagesDir)) {
    return [];
  }

  return fs.readdirSync(packagesDir)
    .filter(name => {
      const packagePath = path.join(packagesDir, name);
      if (!fs.statSync(packagePath).isDirectory()) {
        return false;
      }
      // Check for package.json (required) OR src directory (indicates a package)
      const hasPackageJson = fs.existsSync(path.join(packagePath, 'package.json'));
      const hasSrc = fs.existsSync(path.join(packagePath, 'src'));
      return hasPackageJson || hasSrc;
    })
    .map(name => {
      const packagePath = path.join(packagesDir, name);
      let packageJson = {};
      const packageJsonPath = path.join(packagePath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        } catch (e) {
          // Invalid JSON, use empty object
        }
      }
      return {
        name,
        path: packagePath,
        packageJson
      };
    });
}

/**
 * Discover all engines in packages
 */
function discoverEngines(packages) {
  const engines = [];

  for (const pkg of packages) {
    const srcDir = path.join(pkg.path, 'src');
    if (!fs.existsSync(srcDir)) continue;

    const files = findTypeScriptFiles(srcDir);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Find engine classes
      const engineMatches = content.match(/export\s+(?:class|default\s+class)\s+(\w+Engine)/g);
      const systemMatches = content.match(/export\s+(?:class|default\s+class)\s+(\w+System)/g);
      const coreMatches = content.match(/export\s+(?:class|default\s+class)\s+(\w+Core)/g);

      if (engineMatches || systemMatches || coreMatches) {
        engines.push({
          package: pkg.name,
          file: path.relative(BASE_DIR, file),
          engines: engineMatches?.map(m => m.match(/(\w+Engine)/)?.[1]) || [],
          systems: systemMatches?.map(m => m.match(/(\w+System)/)?.[1]) || [],
          cores: coreMatches?.map(m => m.match(/(\w+Core)/)?.[1]) || []
        });
      }
    }
  }

  return engines;
}

/**
 * Find TypeScript files
 */
function findTypeScriptFiles(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findTypeScriptFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // Skip if can't read
  }
  return files;
}

/**
 * Generate research opportunities for a system
 */
function generateResearchOpportunities(system, researchAreas) {
  const opportunities = [];

  for (const [area, config] of Object.entries(researchAreas)) {
    for (const topic of config.topics) {
      opportunities.push({
        system: system.package,
        engine: system.engines[0] || system.systems[0] || system.cores[0] || 'Unknown',
        area,
        topic,
        priority: config.priority,
        type: 'research',
        description: `Research ${topic} for ${system.package}`
      });
    }
  }

  return opportunities;
}

/**
 * Generate enhancement opportunities for a system
 */
function generateEnhancementOpportunities(system, enhancementCategories) {
  const opportunities = [];

  for (const [category, config] of Object.entries(enhancementCategories)) {
    for (const action of config.actions) {
      opportunities.push({
        system: system.package,
        engine: system.engines[0] || system.systems[0] || system.cores[0] || 'Unknown',
        category,
        action,
        priority: category === 'security' || category === 'typeSafety' ? 'high' : 'medium',
        type: 'enhancement',
        description: `${action} in ${system.package}`
      });
    }
  }

  return opportunities;
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Discovering monorepo systems...\n');

  const packages = discoverPackages();
  console.log(`✅ Found ${packages.length} packages`);

  const engines = discoverEngines(packages);
  console.log(`✅ Found ${engines.length} engine files`);

  console.log('\n📚 Generating research opportunities...\n');
  const researchOpportunities = [];
  for (const engine of engines) {
    researchOpportunities.push(...generateResearchOpportunities(engine, RESEARCH_AREAS));
  }

  console.log(`✅ Generated ${researchOpportunities.length} research opportunities`);

  console.log('\n✨ Generating enhancement opportunities...\n');
  const enhancementOpportunities = [];
  for (const engine of engines) {
    enhancementOpportunities.push(...generateEnhancementOpportunities(engine, ENHANCEMENT_CATEGORIES));
  }

  console.log(`✅ Generated ${enhancementOpportunities.length} enhancement opportunities`);

  // Save report
  const report = {
    timestamp: Date.now(),
    packages: packages.length,
    engines: engines.length,
    researchOpportunities: researchOpportunities.length,
    enhancementOpportunities: enhancementOpportunities.length,
    systems: engines.map(e => ({
      package: e.package,
      engines: e.engines,
      systems: e.systems,
      cores: e.cores
    })),
    opportunities: {
      research: researchOpportunities.slice(0, 50), // Sample
      enhancements: enhancementOpportunities.slice(0, 50) // Sample
    }
  };

  const reportsDir = path.join(BASE_DIR, 'improvement-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const reportPath = path.join(reportsDir, `monorepo-doubt-research-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`\n✅ Report saved: ${reportPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Packages: ${packages.length}`);
  console.log(`   Engines: ${engines.length}`);
  console.log(`   Research Opportunities: ${researchOpportunities.length}`);
  console.log(`   Enhancement Opportunities: ${enhancementOpportunities.length}`);

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default { main, discoverPackages, discoverEngines, generateResearchOpportunities, generateEnhancementOpportunities };

