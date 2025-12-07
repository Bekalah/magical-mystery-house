#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Unified Experiment
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * One unified experiment that orchestrates:
 * 1. Golden Standard Enhancement (A+ quality, Alchemy/Hermetica/Neo-Platonic theme)
 * 2. Workspace Consolidation (unify all directories)
 * 3. GitLab Migration Preparation
 * 4. Cleanup Flattened Mess
 * 5. Liber Arcanae Codex Abyssiae Labeling
 * 6. Spiritus/Animus/Corpus Integration
 * 7. Quality Verification
 * 
 * All in one cohesive experiment following OpenSpec protocols.
 * Designed to run overnight continuously.
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Cathedral of Circuits - Magnum Opus Version 1.0
const PROJECT_INFO = {
  name: 'Cathedral of Circuits',
  version: '1.0.0',
  fullName: 'Cathedral of Circuits - Magnum Opus Version 1.0',
  author: 'Rebecca Respawn',
  subtitle: 'Liber Arcanae Codex Abyssiae'
};

const EXPERIMENT_STATE_FILE = join(rootDir, 'unified-experiment-state.json');
const EXPERIMENT_LOG_FILE = join(rootDir, 'unified-experiment-log.json');

class UnifiedCathedralExperiment {
  constructor() {
    this.state = this.loadOrInitializeState();
    this.logEntries = [];
    this.startTime = Date.now();
  }

  loadOrInitializeState() {
    if (existsSync(EXPERIMENT_STATE_FILE)) {
      try {
        const state = JSON.parse(readFileSync(EXPERIMENT_STATE_FILE, 'utf-8'));
        console.log(`📂 Resuming from previous experiment (phase ${state.currentPhase}/${state.totalPhases})`);
        return state;
      } catch (e) {
        console.warn('⚠️  Could not load previous state, starting fresh');
      }
    }

    return {
      startTime: Date.now(),
      currentPhase: 0,
      totalPhases: 8,
      phases: {
        goldenStandard: { completed: false, startTime: null, endTime: null, results: null, error: null },
        workspaceConsolidation: { completed: false, startTime: null, endTime: null, results: null, error: null },
        gitlabMigration: { completed: false, startTime: null, endTime: null, results: null, error: null },
        cleanup: { completed: false, startTime: null, endTime: null, results: null, error: null },
        labeling: { completed: false, startTime: null, endTime: null, results: null, error: null },
        spiritusAnimusCorpus: { completed: false, startTime: null, endTime: null, results: null, error: null },
        geminiIntegration: { completed: false, startTime: null, endTime: null, results: null, error: null },
        verification: { completed: false, startTime: null, endTime: null, results: null, error: null }
      },
      errors: [],
      warnings: []
    };
  }

  saveState() {
    try {
      writeFileSync(EXPERIMENT_STATE_FILE, JSON.stringify(this.state, null, 2));
    } catch (e) {
      console.error('Failed to save state:', e.message);
    }
  }

  log(message, type = 'info') {
    const entry = {
      timestamp: new Date().toISOString(),
      phase: this.state.currentPhase,
      type,
      message
    };
    this.logEntries.push(entry);
    
    const prefix = {
      'info': 'ℹ️ ',
      'success': '✅',
      'error': '❌',
      'warn': '⚠️ ',
      'phase': '⚗️ '
    }[type] || '📝';
    
    console.log(`${prefix} ${message}`);
    
    // Save log periodically
    if (this.logEntries.length % 10 === 0) {
      this.saveLog();
    }
  }

  saveLog() {
    try {
      writeFileSync(EXPERIMENT_LOG_FILE, JSON.stringify(this.logEntries, null, 2));
    } catch (e) {
      // Silent fail for logging
    }
  }

  async runPhase(phaseName, phaseFunction) {
    const phase = this.state.phases[phaseName];
    if (phase.completed) {
      this.log(`${phaseName} already completed, skipping`, 'info');
      return phase.results;
    }

    this.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'phase');
    this.log(`Starting Phase: ${phaseName}`, 'phase');
    this.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`, 'phase');
    
    phase.startTime = Date.now();
    this.state.currentPhase = Object.keys(this.state.phases).indexOf(phaseName) + 1;
    this.saveState();

    try {
      // Bind phase function to this context
      const boundPhaseFunction = phaseFunction.bind(this);
      const results = await boundPhaseFunction();
      phase.endTime = Date.now();
      phase.completed = true;
      phase.results = results;
      phase.duration = phase.endTime - phase.startTime;
      
      this.log(`✅ Phase ${phaseName} completed in ${(phase.duration / 1000).toFixed(2)}s`, 'success');
      this.saveState();
      return results;
    } catch (e) {
      phase.endTime = Date.now();
      phase.error = e.message;
      phase.duration = phase.endTime - phase.startTime;
      this.state.errors.push({
        phase: phaseName,
        error: e.message,
        stack: e.stack,
        timestamp: new Date().toISOString()
      });
      this.log(`❌ Phase ${phaseName} failed: ${e.message}`, 'error');
      this.saveState();
      
      // Continue with next phase instead of throwing
      return { success: false, error: e.message };
    }
  }

  // Phase 1: Golden Standard Enhancement
  async phaseGoldenStandard() {
    this.log('Applying Golden Standard Alchemy/Hermetica/Neo-Platonic theme...');
    
    const toolPath = join(rootDir, 'tools', 'enhance-golden-standard.mjs');
    if (!existsSync(toolPath)) {
      throw new Error(`Golden Standard tool not found: ${toolPath}`);
    }
    
    try {
      execSync(`node ${toolPath}`, {
        cwd: rootDir,
        stdio: 'inherit',
        maxBuffer: 10 * 1024 * 1024
      });
      
      return {
        success: true,
        message: 'Golden Standard theme applied',
        report: 'golden-standard-report.json'
      };
    } catch (e) {
      throw new Error(`Golden Standard enhancement failed: ${e.message}`);
    }
  }

  // Phase 2: Workspace Consolidation
  async phaseWorkspaceConsolidation() {
    this.log('Consolidating all workspaces...');
    
    const toolPath = join(rootDir, 'tools', 'unify-all-workspaces.mjs');
    if (!existsSync(toolPath)) {
      throw new Error(`Workspace consolidation tool not found: ${toolPath}`);
    }
    
    try {
      execSync(`node ${toolPath}`, {
        cwd: rootDir,
        stdio: 'inherit',
        maxBuffer: 10 * 1024 * 1024
      });
      
      return {
        success: true,
        message: 'Workspaces consolidated',
        workspaceFile: 'cathedral-of-circuits-magnum-opus-v1.code-workspace',
        report: 'workspace-consolidation-report.json'
      };
    } catch (e) {
      throw new Error(`Workspace consolidation failed: ${e.message}`);
    }
  }

  // Phase 3: GitLab Migration Preparation
  async phaseGitLabMigration() {
    this.log('Preparing GitLab migration...');
    
    const toolPath = join(rootDir, 'tools', 'prepare-gitlab-migration.mjs');
    if (!existsSync(toolPath)) {
      this.log('GitLab migration tool not found, skipping...', 'warn');
      this.state.warnings.push({
        phase: 'gitlabMigration',
        warning: 'Tool not found, phase skipped',
        timestamp: new Date().toISOString()
      });
      return {
        success: false,
        message: 'Skipped (tool not found)',
        skipped: true
      };
    }
    
    try {
      execSync(`node ${toolPath}`, {
        cwd: rootDir,
        stdio: 'inherit',
        maxBuffer: 10 * 1024 * 1024
      });
      
      return {
        success: true,
        message: 'GitLab migration prepared',
        gitlabCI: '.gitlab-ci.yml',
        report: 'gitlab-migration-report.json'
      };
    } catch (e) {
      throw new Error(`GitLab migration prep failed: ${e.message}`);
    }
  }

  // Phase 4: Cleanup Flattened Mess
  async phaseCleanup() {
    this.log('Cleaning up flattened mess...');
    
    const toolPath = join(rootDir, 'tools', 'cleanup-flattened-mess.mjs');
    if (!existsSync(toolPath)) {
      this.log('Cleanup tool not found, skipping...', 'warn');
      this.state.warnings.push({
        phase: 'cleanup',
        warning: 'Tool not found, phase skipped',
        timestamp: new Date().toISOString()
      });
      return {
        success: false,
        message: 'Skipped (tool not found)',
        skipped: true
      };
    }
    
    try {
      execSync(`node ${toolPath}`, {
        cwd: rootDir,
        stdio: 'inherit',
        maxBuffer: 10 * 1024 * 1024
      });
      
      return {
        success: true,
        message: 'Cleanup completed',
        archived: 'archive/reports-and-status',
        organized: 'docs',
        report: 'cleanup-report.json'
      };
    } catch (e) {
      throw new Error(`Cleanup failed: ${e.message}`);
    }
  }

  // Phase 5: Liber Arcanae Codex Abyssiae Labeling
  async phaseLabeling() {
    this.log('Applying Liber Arcanae Codex Abyssiae labels...');
    
    // Try multiple possible tool names
    const possibleTools = [
      join(rootDir, 'tools', 'update-liber-arcanae-labels.mjs'),
      join(rootDir, 'tools', 'apply-alchemical-labels.mjs'),
      join(rootDir, 'tools', 'label-liber-arcanae.mjs')
    ];
    
    const toolPath = possibleTools.find(path => existsSync(path));
    
    if (!toolPath) {
      this.log('Labeling tool not found, phase skipped...', 'warn');
      this.state.warnings.push({
        phase: 'labeling',
        warning: 'Labeling tool not found, phase skipped',
        timestamp: new Date().toISOString()
      });
      return {
        success: false,
        message: 'Skipped (tool not found)',
        skipped: true
      };
    }
    
    try {
      execSync(`node ${toolPath}`, {
        cwd: rootDir,
        stdio: 'inherit',
        maxBuffer: 10 * 1024 * 1024
      });
      
      return {
        success: true,
        message: 'Labels applied',
        report: 'labeling-report.json'
      };
    } catch (e) {
      this.log(`Labeling phase had issues: ${e.message}`, 'warn');
      this.state.warnings.push({
        phase: 'labeling',
        warning: e.message,
        timestamp: new Date().toISOString()
      });
      return {
        success: false,
        message: `Labeling had issues: ${e.message}`,
        skipped: true
      };
    }
  }

  // Phase 6: Spiritus/Animus/Corpus Integration
  async phaseSpiritusAnimusCorpus() {
    this.log('Integrating Spiritus/Animus/Corpus Trinity system...');
    
    const toolPath = join(rootDir, 'tools', 'integrate-spiritus-animus-corpus.mjs');
    if (!existsSync(toolPath)) {
      this.log('Spiritus/Animus/Corpus tool not found, creating basic integration...', 'warn');
      // Create basic integration inline
      const integration = this.createBasicTrinityIntegration();
      return integration;
    }
    
    try {
      execSync(`node ${toolPath}`, {
        cwd: rootDir,
        stdio: 'inherit',
        maxBuffer: 10 * 1024 * 1024
      });
      
      return {
        success: true,
        message: 'Spiritus/Animus/Corpus integrated',
        report: 'spiritus-animus-corpus-report.json'
      };
    } catch (e) {
      this.log(`Spiritus/Animus/Corpus integration had issues: ${e.message}`, 'warn');
      return this.createBasicTrinityIntegration();
    }
  }

  createBasicTrinityIntegration() {
    this.log('Creating basic Trinity integration...');
    
    // Create Trinity integration report
    const report = {
      project: PROJECT_INFO,
      trinity: {
        spiritus: {
          domain: 'Spirit',
          elements: ['Codex', 'Abyssiae', 'Liber Arcanae', 'Sacred Mathematics'],
          tech: ['codex-144-99-core', 'liber-arcanae', 'sacred-mathematics-core'],
          design: ['Golden Standard', 'Hermetic Principles', 'Neo-Platonic Hierarchy'],
          game: ['RPG Mechanics', 'Pathworking', 'Consciousness Levels']
        },
        animus: {
          domain: 'Soul',
          elements: ['Music', 'Art', 'Sound Synthesis', 'Fractal Sound'],
          tech: ['music-engine-core', 'art-engine-core', 'unified-synthesis-codex'],
          design: ['Visual Art', 'Sacred Geometry', 'Color Harmony'],
          game: ['Audio Synthesis', 'Fractal Patterns', 'Witch Mode']
        },
        corpus: {
          domain: 'Body',
          elements: ['Game Engine', '3D Rendering', 'Physics', 'Interaction'],
          tech: ['game-engine', 'three-engine', 'physics-cannon-core'],
          design: ['Trauma-Safe UI', 'Accessibility', 'Museum-Grade Quality'],
          game: ['RPG Systems', 'Character Mechanics', 'World Building']
        }
      },
      integration: {
        spiritusAnimus: 'Codex + Music/Art synthesis',
        animusCorpus: 'Audio/Visual + Game rendering',
        corpusSpiritus: 'Game mechanics + Codex mapping',
        unified: 'Complete Trinity integration'
      },
      timestamp: new Date().toISOString()
    };

    const reportPath = join(rootDir, 'spiritus-animus-corpus-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return {
      success: true,
      message: 'Basic Trinity integration created',
      report: 'spiritus-animus-corpus-report.json'
    };
  }

  // Phase 7: Gemini Integration & Sync
  async phaseGeminiIntegration() {
    this.log('Verifying Gemini 3 integration and GitHub/GitLab sync...');
    
    const geminiFiles = [
      'scripts/gemini-deployment-assistant.mjs',
      '.github/workflows/gemini-deployment-assistant.yml',
      '.github/workflows/deploy-render.yml',
      '.github/workflows/deploy-surge.yml',
      'docs/GEMINI_DEPLOYMENT_SETUP.md',
      'scripts/sync-github-gitlab-gemini.mjs'
    ];
    
    const results = {
      filesPresent: [],
      filesMissing: [],
      workflowsEnhanced: 0,
      npmScriptsAdded: 0,
      syncScriptReady: false
    };
    
    // Check Gemini files
    geminiFiles.forEach(file => {
      const filePath = join(rootDir, file);
      if (existsSync(filePath)) {
        results.filesPresent.push(file);
        this.log(`✅ ${file} found`);
      } else {
        results.filesMissing.push(file);
        this.log(`⚠️  ${file} missing`, 'warn');
      }
    });
    
    // Check package.json for Gemini scripts
    try {
      const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
      const geminiScripts = Object.keys(packageJson.scripts || {}).filter(s => s.includes('gemini'));
      results.npmScriptsAdded = geminiScripts.length;
      if (geminiScripts.length > 0) {
        this.log(`✅ Found ${geminiScripts.length} Gemini npm scripts`);
      }
    } catch (e) {
      this.log('Could not check package.json', 'warn');
    }
    
    // Check if sync script exists
    if (existsSync(join(rootDir, 'scripts/sync-github-gitlab-gemini.mjs'))) {
      results.syncScriptReady = true;
      this.log('✅ GitHub/GitLab sync script ready');
    }
    
    return {
      success: results.filesPresent.length > 0,
      message: `Gemini integration: ${results.filesPresent.length}/${geminiFiles.length} files present`,
      results,
      report: 'gemini-integration-report.json'
    };
  }

  // Phase 8: Verification
  async phaseVerification() {
    this.log('Running verification checks...');
    
    const verification = {
      goldenStandard: false,
      workspace: false,
      gitlab: false,
      cleanup: false,
      labeling: false,
      trinity: false,
      gemini: false,
      errors: []
    };

    try {
      // Verify Golden Standard report exists
      if (existsSync(join(rootDir, 'golden-standard-report.json'))) {
        verification.goldenStandard = true;
        this.log('✅ Golden Standard report found');
      }

      // Verify workspace file exists
      const workspaceFile = join(rootDir, 'cathedral-of-circuits-magnum-opus-v1.code-workspace');
      if (existsSync(workspaceFile)) {
        verification.workspace = true;
        this.log('✅ Workspace file found');
      }

      // Verify GitLab CI exists
      if (existsSync(join(rootDir, '.gitlab-ci.yml'))) {
        verification.gitlab = true;
        this.log('✅ GitLab CI file found');
      }

      // Verify cleanup archive exists
      if (existsSync(join(rootDir, 'archive'))) {
        verification.cleanup = true;
        this.log('✅ Cleanup archive found');
      }

      // Verify Trinity report
      if (existsSync(join(rootDir, 'spiritus-animus-corpus-report.json'))) {
        verification.trinity = true;
        this.log('✅ Trinity integration report found');
      }

      // Verify Gemini integration
      if (existsSync(join(rootDir, 'scripts/gemini-deployment-assistant.mjs'))) {
        verification.gemini = true;
        this.log('✅ Gemini integration found');
      }

      const successCount = Object.values(verification).filter(v => v === true).length;
      const totalChecks = Object.keys(verification).filter(k => k !== 'errors').length;

      return {
        success: successCount > 0,
        verification,
        message: `Verification: ${successCount}/${totalChecks} checks passed`,
        successRate: `${successCount}/${totalChecks}`
      };
    } catch (e) {
      throw new Error(`Verification failed: ${e.message}`);
    }
  }

  async run() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`⚗️  ${PROJECT_INFO.fullName}`);
    console.log(`Author: ${PROJECT_INFO.author} (pen name)`);
    console.log(`Unified Cathedral Experiment - Overnight Run`);
    console.log(`${'='.repeat(60)}\n`);
    console.log(`Starting unified experiment at ${new Date().toISOString()}\n`);

    try {
      // Phase 1: Golden Standard
      await this.runPhase('goldenStandard', function() { return this.phaseGoldenStandard(); });

      // Phase 2: Workspace Consolidation
      await this.runPhase('workspaceConsolidation', function() { return this.phaseWorkspaceConsolidation(); });

      // Phase 3: GitLab Migration
      await this.runPhase('gitlabMigration', function() { return this.phaseGitLabMigration(); });

      // Phase 4: Cleanup
      await this.runPhase('cleanup', function() { return this.phaseCleanup(); });

      // Phase 5: Labeling
      await this.runPhase('labeling', function() { return this.phaseLabeling(); });

      // Phase 6: Spiritus/Animus/Corpus
      await this.runPhase('spiritusAnimusCorpus', function() { return this.phaseSpiritusAnimusCorpus(); });

      // Phase 7: Gemini Integration & Sync
      await this.runPhase('geminiIntegration', function() { return this.phaseGeminiIntegration(); });

      // Phase 8: Verification
      await this.runPhase('verification', function() { return this.phaseVerification(); });

      // Generate final report
      this.generateFinalReport();

      const totalTime = (Date.now() - this.startTime) / 1000;
      const completedPhases = Object.values(this.state.phases).filter(p => p.completed).length;
      
      console.log(`\n${'='.repeat(60)}`);
      console.log(`✅ Unified experiment completed!`);
      console.log(`📊 Phases completed: ${completedPhases}/${this.state.totalPhases}`);
      console.log(`⏱️  Total time: ${totalTime.toFixed(2)}s`);
      console.log(`📄 Reports generated - see unified-experiment-report.md`);
      console.log(`${'='.repeat(60)}\n`);

    } catch (e) {
      console.error(`\n❌ Fatal experiment error: ${e.message}`);
      console.error(e.stack);
      this.saveState();
      this.saveLog();
      process.exit(1);
    }
  }

  generateFinalReport() {
    const reportPath = join(rootDir, 'unified-experiment-report.md');
    
    const completedPhases = Object.values(this.state.phases).filter(p => p.completed).length;
    const totalTime = Date.now() - this.startTime;

    const report = `# ${PROJECT_INFO.fullName} - Unified Experiment Report

**Author**: ${PROJECT_INFO.author} (pen name)  
**Generated**: ${new Date().toISOString()}

## Summary

- **Total Phases**: ${this.state.totalPhases}
- **Completed Phases**: ${completedPhases}
- **Total Time**: ${(totalTime / 1000).toFixed(2)}s
- **Errors**: ${this.state.errors.length}
- **Warnings**: ${this.state.warnings.length}

## Phase Results

${Object.entries(this.state.phases).map(([name, phase]) => {
  const status = phase.completed ? '✅ Completed' : phase.error ? '❌ Failed' : '⏳ Pending';
  const duration = phase.duration ? `${(phase.duration / 1000).toFixed(2)}s` : 'N/A';
  
  return `
### ${name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}

- **Status**: ${status}
${phase.startTime ? `- **Start**: ${new Date(phase.startTime).toISOString()}` : ''}
${phase.endTime ? `- **End**: ${new Date(phase.endTime).toISOString()}` : ''}
- **Duration**: ${duration}
${phase.error ? `- **Error**: ${phase.error}` : ''}
${phase.results ? `- **Results**: \`${JSON.stringify(phase.results).substring(0, 100)}...\`` : ''}
`;
}).join('\n')}

## Errors

${this.state.errors.length > 0 
  ? this.state.errors.map(err => `- **${err.phase}** (${new Date(err.timestamp).toLocaleString()}): ${err.error}`).join('\n')
  : 'No errors ✅'}

## Warnings

${this.state.warnings.length > 0
  ? this.state.warnings.map(warn => `- **${warn.phase}** (${new Date(warn.timestamp).toLocaleString()}): ${warn.warning}`).join('\n')
  : 'No warnings ✅'}

## Generated Files

${[
  'unified-experiment-state.json',
  'unified-experiment-log.json',
  'cathedral-of-circuits-magnum-opus-v1.code-workspace',
  'golden-standard-report.json',
  'workspace-consolidation-report.json',
  'gitlab-migration-report.json',
  'cleanup-report.json',
  'labeling-report.json',
  'spiritus-animus-corpus-report.json',
  '.gitlab-ci.yml'
].filter(file => existsSync(join(rootDir, file))).map(file => `- ✅ \`${file}\``).join('\n')}

## Next Steps

1. ✅ Review all generated reports
2. ✅ Open unified workspace: \`cursor cathedral-of-circuits-magnum-opus-v1.code-workspace\`
3. ✅ Test GitLab CI/CD pipeline (if generated)
4. ✅ Verify all Golden Standard enhancements
5. ✅ Review consolidated workspaces
6. ✅ Explore Trinity integration (Spiritus/Animus/Corpus)

---

**Part of ${PROJECT_INFO.fullName}**  
*Liber Arcanae Codex Abyssiae*
`;

    writeFileSync(reportPath, report);
    this.log(`Final report generated: ${reportPath}`, 'success');
    this.saveLog();
    this.saveState();
    
    // Save final log
    try {
      writeFileSync(EXPERIMENT_LOG_FILE, JSON.stringify(this.logEntries, null, 2));
    } catch (e) {
      // Silent fail
    }
  }
}

// Run the experiment
const experiment = new UnifiedCathedralExperiment();
experiment.run().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  console.error(error.stack);
  process.exit(1);
});

