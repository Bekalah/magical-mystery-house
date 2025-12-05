#!/usr/bin/env node
/**
 * Save New Models for Later Exploration
 * 
 * Archives and documents new models, experiments, and discoveries
 * for future exploration when time permits.
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const MODELS_ARCHIVE_DIR = path.join(rootDir, 'docs', 'models-archive');
const MODELS_INDEX = path.join(MODELS_ARCHIVE_DIR, 'MODELS_INDEX.md');

/**
 * Discover and catalog new models
 */
function discoverNewModels() {
  const models = {
    timestamp: new Date().toISOString(),
    experimentModels: [],
    codeModels: [],
    visualModels: [],
    dataModels: [],
    architectureModels: []
  };

  // Experiment models
  const experimentFiles = [
    'experiment-state.json',
    'IMPROVEMENT_EXPERIMENT_LOG.json',
    '.experiment-metrics.json',
    'scripts/10-hour-improvement-experiment.ts',
    'scripts/run-magnum-opus-experiment.mjs'
  ];

  experimentFiles.forEach(file => {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      models.experimentModels.push({
        file,
        size: stats.size,
        modified: stats.mtime.toISOString(),
        description: getModelDescription(file)
      });
    }
  });

  // Code models (packages with interesting patterns)
  const codeModelPackages = [
    'packages/codex-144-99',
    'packages/stone-grimoire',
    'packages/liber-arcanae',
    'packages/game-engine',
    'packages/true-will-system'
  ];

  codeModelPackages.forEach(pkg => {
    const pkgPath = path.join(rootDir, pkg);
    if (fs.existsSync(pkgPath)) {
      models.codeModels.push({
        package: pkg,
        description: getPackageDescription(pkg)
      });
    }
  });

  // Visual models (design systems, UI components)
  const visualModelPackages = [
    'packages/visionary-design-system',
    'packages/cathedral-visual-engine',
    'packages/art-engine-core',
    'packages/sacred-geometry-core'
  ];

  visualModelPackages.forEach(pkg => {
    const pkgPath = path.join(rootDir, pkg);
    if (fs.existsSync(pkgPath)) {
      models.visualModels.push({
        package: pkg,
        description: getPackageDescription(pkg)
      });
    }
  });

  return models;
}

function getModelDescription(file) {
  const descriptions = {
    'experiment-state.json': 'Current experiment state with 478+ cycles of improvements',
    'IMPROVEMENT_EXPERIMENT_LOG.json': 'Complete log of all experiment improvements',
    '.experiment-metrics.json': 'Performance metrics and analytics',
    'scripts/10-hour-improvement-experiment.ts': 'Main experiment automation script',
    'scripts/run-magnum-opus-experiment.mjs': 'Magnum Opus business edition experiment'
  };
  return descriptions[file] || 'Model file';
}

function getPackageDescription(pkg) {
  const descriptions = {
    'packages/codex-144-99': '144 nodes, 99 depths, consciousness mapping system',
    'packages/stone-grimoire': '8 chapels, folios, sacred archive system',
    'packages/liber-arcanae': 'Extended tarot, 72 Shem Angels, 72 Goetic Demons',
    'packages/game-engine': 'RPG system with boons, treasures, True Will integration',
    'packages/true-will-system': 'Thelemic True Will system (chaos meter, alignment)',
    'packages/visionary-design-system': 'Design system with sacred geometry',
    'packages/cathedral-visual-engine': 'Visual engine for 3D immersive environments',
    'packages/art-engine-core': 'Art generation engine',
    'packages/sacred-geometry-core': 'Sacred geometry mathematics (golden ratio, Fibonacci)'
  };
  return descriptions[pkg] || 'Package model';
}

/**
 * Create visual model documentation
 */
function createVisualModelDocs(models) {
  const visualDoc = `# Visual Models Archive

**Created**: ${new Date().toISOString()}
**Purpose**: Archive of visual models, design systems, and architectural patterns for future exploration

## Experiment Models

${models.experimentModels.map(m => `
### ${path.basename(m.file)}
- **Location**: \`${m.file}\`
- **Size**: ${(m.size / 1024).toFixed(2)} KB
- **Modified**: ${new Date(m.modified).toLocaleString()}
- **Description**: ${m.description}
`).join('\n')}

## Code Models

${models.codeModels.map(m => `
### ${path.basename(m.package)}
- **Package**: \`${m.package}\`
- **Description**: ${m.description}
- **Status**: Ready for exploration
`).join('\n')}

## Visual Models

${models.visualModels.map(m => `
### ${path.basename(m.package)}
- **Package**: \`${m.package}\`
- **Description**: ${m.description}
- **Status**: Ready for exploration
`).join('\n')}

## Exploration Notes

When exploring these models, consider:
1. **Architecture Patterns**: How systems are structured
2. **Design Principles**: Sacred geometry, golden ratio, Fibonacci
3. **Integration Points**: How models connect to other systems
4. **Performance**: Optimization opportunities
5. **Visualization**: How to represent these models visually

## Next Steps

- [ ] Create visual diagrams for each model
- [ ] Document architecture patterns
- [ ] Create interactive exploration tools
- [ ] Build visualization dashboards
`;

  return visualDoc;
}

/**
 * Save models to archive
 */
function saveModels(models) {
  // Ensure archive directory exists
  if (!fs.existsSync(MODELS_ARCHIVE_DIR)) {
    fs.mkdirSync(MODELS_ARCHIVE_DIR, { recursive: true });
  }

  // Save models data as JSON
  const modelsJsonPath = path.join(MODELS_ARCHIVE_DIR, `models-${Date.now()}.json`);
  fs.writeFileSync(modelsJsonPath, JSON.stringify(models, null, 2));

  // Create/update index
  const visualDoc = createVisualModelDocs(models);
  fs.writeFileSync(MODELS_INDEX, visualDoc);

  // Create summary
  const summary = {
    totalModels: models.experimentModels.length + models.codeModels.length + models.visualModels.length,
    experimentModels: models.experimentModels.length,
    codeModels: models.codeModels.length,
    visualModels: models.visualModels.length,
    archivedAt: models.timestamp
  };

  console.log('✅ Models saved successfully!');
  console.log(`📦 Total models archived: ${summary.totalModels}`);
  console.log(`🔬 Experiment models: ${summary.experimentModels}`);
  console.log(`💻 Code models: ${summary.codeModels}`);
  console.log(`🎨 Visual models: ${summary.visualModels}`);
  console.log(`📁 Archive location: ${MODELS_ARCHIVE_DIR}`);
  console.log(`📄 Index: ${MODELS_INDEX}`);

  return summary;
}

// Main execution
try {
  console.log('🔍 Discovering new models...');
  const models = discoverNewModels();
  console.log('💾 Saving models to archive...');
  const summary = saveModels(models);
  console.log('✅ Complete! Models saved for later exploration.');
} catch (error) {
  console.error('❌ Error saving models:', error);
  process.exit(1);
}

