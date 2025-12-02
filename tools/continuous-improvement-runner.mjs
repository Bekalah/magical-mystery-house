#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */

/**
 * Continuous Improvement Runner
 * Runs improvements every 2.5 minutes, saves and updates
 * 
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';
import UserFeedback from './user-feedback.mjs';
import OrganicResearchPlanner from './organic-research-planner.mjs';
import AlignmentDetector from './alignment-detector.mjs';
import AlignmentCleaner from './alignment-cleaner.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const IMPROVEMENT_INTERVAL = 1 * 60 * 1000; // 1 minute in milliseconds
const STATE_FILE = path.join(BASE_DIR, '.continuous-improvement-state.json');
const LOCK_FILE = path.join(BASE_DIR, '.continuous-improvement-state.lock');
const ARCHIVE_FILE = path.join(BASE_DIR, '.continuous-improvement-archive.json');

logger.info('🔧 IMPROVEMENT: Creating Continuous Improvement Runner');
logger.info('   → Runs improvements every 2.5 minutes');
logger.info('   → Saves and updates automatically');
logger.info('   → Tracks progress and results\n');

class ContinuousImprovementRunner {
  constructor() {
    this.state = this.loadState();
    this.isRunning = false;
    this.cycleCount = 0;
    this.researchPlanner = new OrganicResearchPlanner();
    this.lastDoubtMoment = null;
    this.saveQueue = [];
    this.isSaving = false;
    this.saveDebounceTimer = null;
    this.metrics = {
      toolStats: {},
      errorPatterns: {},
      phaseStats: {
      'repo-git': { successes: 0, failures: 0, totalDuration: 0 },
      'organic-doubt-research': { successes: 0, failures: 0, totalDuration: 0 },
      'solve-et-coagula': { successes: 0, failures: 0, totalDuration: 0 },
      'code-quality': { successes: 0, failures: 0, totalDuration: 0 },
      'learn-deploy': { successes: 0, failures: 0, totalDuration: 0 }
      },
      totalRuns: 0,
      totalSuccesses: 0,
      totalFailures: 0
    };
  }

  loadState() {
    if (fs.existsSync(STATE_FILE)) {
      try {
        const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
        // Initialize metrics if missing
        if (!state.metrics) {
          state.metrics = {
            toolStats: {},
            errorPatterns: {},
            phaseStats: {
      'repo-git': { successes: 0, failures: 0, totalDuration: 0 },
      'solve-et-coagula': { successes: 0, failures: 0, totalDuration: 0 },
      'code-quality': { successes: 0, failures: 0, totalDuration: 0 },
      'learn-deploy': { successes: 0, failures: 0, totalDuration: 0 }
            },
            totalRuns: 0,
            totalSuccesses: 0,
            totalFailures: 0
          };
        }
        this.metrics = state.metrics;
        return state;
      } catch {
        // Reset on error
      }
    }
    return {
      startTime: new Date().toISOString(),
      cycles: [],
      totalImprovements: 0,
      lastUpdate: null,
      metrics: {
        toolStats: {},
        errorPatterns: {},
        phaseStats: {
      'repo-git': { successes: 0, failures: 0, totalDuration: 0 },
      'solve-et-coagula': { successes: 0, failures: 0, totalDuration: 0 },
      'code-quality': { successes: 0, failures: 0, totalDuration: 0 },
      'learn-deploy': { successes: 0, failures: 0, totalDuration: 0 }
        },
        totalRuns: 0,
        totalSuccesses: 0,
        totalFailures: 0
      }
    };
  }

  updateMetrics(toolName, status, duration, phase, errorMessage = null) {
    // Initialize tool stats if needed
    if (!this.metrics.toolStats[toolName]) {
      this.metrics.toolStats[toolName] = {
        runs: 0,
        successes: 0,
        failures: 0,
        totalDuration: 0,
        avgDuration: 0,
        phases: new Set()
      };
    }
    
    const toolStat = this.metrics.toolStats[toolName];
    
    // Ensure phases is a Set (convert from array if loaded from JSON)
    if (!(toolStat.phases instanceof Set)) {
      toolStat.phases = new Set(Array.isArray(toolStat.phases) ? toolStat.phases : []);
    }
    
    toolStat.runs++;
    toolStat.phases.add(phase);
    
    if (status === 'success') {
      toolStat.successes++;
      toolStat.totalDuration += duration;
      toolStat.avgDuration = toolStat.totalDuration / toolStat.successes;
    } else {
      toolStat.failures++;
    }
    
    // Update phase stats
    if (this.metrics.phaseStats[phase]) {
      if (status === 'success') {
        this.metrics.phaseStats[phase].successes++;
        this.metrics.phaseStats[phase].totalDuration += duration;
      } else {
        this.metrics.phaseStats[phase].failures++;
      }
    }
    
    // Track error patterns
    if (errorMessage) {
      const errorKey = errorMessage.substring(0, 50);
      if (!this.metrics.errorPatterns[errorKey]) {
        this.metrics.errorPatterns[errorKey] = 0;
      }
      this.metrics.errorPatterns[errorKey]++;
    }
    
    // Update totals
    this.metrics.totalRuns++;
    if (status === 'success') {
      this.metrics.totalSuccesses++;
    } else {
      this.metrics.totalFailures++;
    }
    
    // Convert Set to Array for JSON serialization
    toolStat.phases = Array.from(toolStat.phases);
  }

  performHealthCheck(toolName) {
    // Basic health checks
    try {
      // Check if base directory exists
      if (!fs.existsSync(BASE_DIR)) {
        return false;
      }
      
      // Check if tool file exists (for node tools)
      if (toolName.includes('node tools/')) {
        const toolFile = path.join(BASE_DIR, toolName.replace('node tools/', 'tools/'));
        if (!fs.existsSync(toolFile)) {
          return false;
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }

  shouldSkipTool(toolName) {
    // Skip if tool failed 3+ times in last 5 cycles
    const recentCycles = this.state.cycles.slice(-5);
    let failureCount = 0;
    
    for (const cycle of recentCycles) {
      const hasFailure = cycle.errors?.some(err => err.tool === toolName);
      if (hasFailure) {
        failureCount++;
      }
    }
    
    return failureCount >= 3;
  }

  getAdaptiveTimeout(toolName, defaultTimeout) {
    // Adjust timeout based on historical performance
    if (this.metrics.toolStats[toolName]) {
      const avgDuration = this.metrics.toolStats[toolName].avgDuration || 0;
      // Use 2x average duration, but cap at 3x default timeout
      const adaptiveTimeout = Math.min(avgDuration * 2, defaultTimeout * 3);
      return Math.max(adaptiveTimeout, defaultTimeout * 0.5); // At least 50% of default
    }
    return defaultTimeout;
  }

  async runToolWithRetry(tool, timeout, phase, maxRetries = 2) {
    let lastError = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          UserFeedback.info(`Retrying ${tool.name} (attempt ${attempt + 1}/${maxRetries + 1})...`);
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
        
        const start = Date.now();
        // Use pnpm wrapper if command uses pnpm
        let cmd = tool.cmd;
        if (cmd.startsWith('pnpm ')) {
          cmd = `node tools/pnpm-wrapper.mjs ${cmd.substring(5)}`;
        }
        execSync(cmd, {
          cwd: BASE_DIR,
          stdio: 'pipe',
          timeout: timeout
        });
        
        const duration = Date.now() - start;
        return {
          success: true,
          data: {
            tool: tool.name,
            status: 'success',
            duration,
            phase,
            attempts: attempt + 1
          }
        };
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          continue; // Retry
        }
      }
    }
    
    // All retries failed
    const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
    return {
      success: false,
      error: {
        tool: tool.name,
        error: errorMessage,
        phase,
        attempts: maxRetries + 1
      }
    };
  }

  /**
   * Acquire file lock for state saving
   */
  async acquireLock(timeout = 2000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        fs.writeFileSync(LOCK_FILE, process.pid.toString(), { flag: 'wx' });
        return true;
      } catch (err) {
        if (err.code !== 'EEXIST') throw err;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    return false;
  }

  /**
   * Release file lock
   */
  releaseLock() {
    try {
      if (fs.existsSync(LOCK_FILE)) {
        fs.unlinkSync(LOCK_FILE);
      }
    } catch (err) {
      // Ignore cleanup errors
    }
  }

  /**
   * Archive old cycles to separate file
   */
  archiveCycles(cycles) {
    try {
      let archive = { cycles: [] };
      if (fs.existsSync(ARCHIVE_FILE)) {
        const archiveContent = fs.readFileSync(ARCHIVE_FILE, 'utf-8');
        if (archiveContent.trim()) {
          archive = JSON.parse(archiveContent);
        }
      }
      archive.cycles.push(...cycles);
      // Keep only last 1000 archived cycles
      if (archive.cycles.length > 1000) {
        archive.cycles = archive.cycles.slice(-1000);
      }
      fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(archive, null, 2), 'utf-8');
    } catch (err) {
      logger.warn(`Archive save error: ${err.message}`);
    }
  }

  /**
   * Save state with file locking and async queue
   */
  saveState() {
    // Debounce rapid saves
    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
    }
    
    this.saveDebounceTimer = setTimeout(async () => {
      await this.performSave();
    }, 1000); // Wait 1 second before saving
  }

  /**
   * Perform actual save with locking
   */
  async performSave() {
    if (this.isSaving) {
      // Queue the save request
      this.saveQueue.push(true);
      return;
    }

    this.isSaving = true;
    const lockAcquired = await this.acquireLock(2000);
    
    if (!lockAcquired) {
      logger.warn('Could not acquire lock for state save, will retry');
      this.isSaving = false;
      setTimeout(() => this.performSave(), 1000);
      return;
    }

    try {
      this.state.lastUpdate = new Date().toISOString();
      this.state.metrics = this.metrics;
      
      // Convert Sets back to Arrays before saving
      Object.keys(this.metrics.toolStats).forEach(tool => {
        if (this.metrics.toolStats[tool].phases instanceof Set) {
          this.metrics.toolStats[tool].phases = Array.from(this.metrics.toolStats[tool].phases);
        }
      });

      // Optimize: Keep only last 50 cycles in active state
      if (this.state.cycles.length > 50) {
        const archived = this.state.cycles.slice(0, -50);
        this.archiveCycles(archived);
        this.state.cycles = this.state.cycles.slice(-50);
      }
      
      // Write with timeout protection
      await Promise.race([
        fs.promises.writeFile(STATE_FILE, JSON.stringify(this.state, null, 2), 'utf-8'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Save timeout')), 5000))
      ]);
      
    } catch (error) {
      logger.error(`State save error: ${error.message}`);
    } finally {
      this.releaseLock();
      this.isSaving = false;
      
      // Process queued saves
      if (this.saveQueue.length > 0) {
        this.saveQueue.shift();
        setTimeout(() => this.performSave(), 100);
      }
    }
  }

  async runImprovementCycle() {
    this.cycleCount++;
    const cycleStart = Date.now();
    
    UserFeedback.section(`Improvement Cycle #${this.cycleCount}`);
    logger.info(`Started: ${new Date().toLocaleTimeString()}`);
    logger.info(`Approach: Organic, creative, trauma-aware, open world experience`);
    logger.info(`Vision: ND joy, esoteric traditions (Soyga, I Ching, Kabbalah), conquering Western academia barriers\n`);

    const cycleResults = {
      cycle: this.cycleCount,
      timestamp: new Date().toISOString(),
      improvements: [],
      errors: [],
      duration: 0,
      organicDoubtMoments: []
    };

    // Phase 0.25: System Health & Performance (Self-healing)
    if (this.cycleCount % 3 === 1) { // Run every 3 cycles
      try {
        logger.info('\n🔧 Phase 0.25: System Health & Performance (Self-Healing)');
        await this.performSystemHealthCheck(cycleResults);
      } catch (error) {
        logger.error(`   ❌ Health check error: ${error.message}`);
        cycleResults.errors.push({
          tool: 'System Health Check',
          error: error instanceof Error ? error.message : String(error),
          phase: 'system-health'
        });
      }
    }

    // Phase 0: Organic Doubt & Research (Scheduled moments - reflects creative nervousness)
    if (this.shouldCreateDoubtMoment()) {
      try {
        logger.info('\n🤔 Phase 0: Organic Doubt & Research (Creative Nervousness)');
        logger.info('   Reflecting a highly creative, nervous person\'s organic process');
        await this.executeOrganicDoubtResearch(cycleResults);
      } catch (error) {
        logger.error(`   ❌ Organic research error: ${error.message}`);
        cycleResults.errors.push({
          tool: 'Organic Research',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Run improvement tools in sequence
    // Phase 1: Repository & Git (must complete first)
    
    // Auto-push changes every 5 cycles
    if (this.cycleCount % 5 === 0) {
      try {
        logger.info('   🚀 Auto-pushing changes to remote repositories...');
        const { default: AutoPushChanges } = await import('./auto-push-changes.mjs');
        const pusher = new AutoPushChanges();
        const results = await pusher.pushAllChanges();
        const successful = results.filter(r => r.success && r.pushed).length;
        logger.info(`   ✅ Pushed to ${successful} repositories`);
        cycleResults.improvements.push({
          tool: 'Auto Push Changes',
          status: 'success',
          reposPushed: successful,
          phase: 'repo-git'
        });
      } catch (error) {
        logger.warn(`   ⚠️  Auto-push error: ${error.message}`);
        // Non-critical, continue
      }
    }
    
    // Monitor remote work every 3 cycles
    if (this.cycleCount % 3 === 0) {
      try {
        logger.info('   👀 Monitoring remote work...');
        const { default: AutoPushChanges } = await import('./auto-push-changes.mjs');
        const pusher = new AutoPushChanges();
        const status = await pusher.monitorRemoteWork();
        logger.info(`   ✅ Monitored ${status.length} repositories`);
        cycleResults.improvements.push({
          tool: 'Remote Work Monitor',
          status: 'success',
          reposMonitored: status.length,
          phase: 'repo-git'
        });
      } catch (error) {
        logger.warn(`   ⚠️  Remote monitoring error: ${error.message}`);
        // Non-critical, continue
      }
    }
    
    const repoAndGitTools = [
      { name: 'Repository Connection', cmd: 'node tools/repo-connector.mjs', timeout: 60000 },
      { name: 'Nested Git Update', cmd: 'node tools/nested-git-updater.mjs', timeout: 120000 }
    ];

    // Phase 2: Solve et Coagula (Doubt → Research → Implementation)
    const solveEtCoagulaTools = [
      { name: 'Solve et Coagula', cmd: 'pnpm run improve:solve-et-coagula', timeout: 120000 }
    ];

    // Phase 3: Code & Quality Improvements (runs after solve et coagula)
    const codeImprovementTools = [
      { name: 'Fix All Broken', cmd: 'pnpm run fix:all-broken', timeout: 120000 },
      { name: 'Fix Bad Design', cmd: 'pnpm run fix:bad-design', timeout: 90000 },
      { name: 'Boost Rebecca Ideas', cmd: 'pnpm run boost:rebecca-ideas', timeout: 120000 },
      { name: 'Enhance Story Quality', cmd: 'pnpm run enhance:story-quality', timeout: 90000 },
      { name: 'Enhance Design Quality', cmd: 'pnpm run enhance:design-quality', timeout: 90000 },
      { name: 'Code Improvement', cmd: 'pnpm run improve:code', timeout: 60000 },
      { name: 'Code Optimization', cmd: 'pnpm run optimize:code', timeout: 60000 },
      { name: 'Fix All Issues', cmd: 'pnpm run fix:all', timeout: 90000 },
      { name: 'Cleanup Duplicates', cmd: 'pnpm run cleanup:duplicates', timeout: 60000 },
      { name: 'Quality Check', cmd: 'pnpm run quality:enhanced', timeout: 30000 },
      { name: 'Dependency Analysis', cmd: 'pnpm run analyze:dependencies', timeout: 30000 },
      { name: 'Build Optimization', cmd: 'pnpm run optimize:build', timeout: 30000 },
      { name: 'Check Consistency', cmd: 'pnpm run check:consistency', timeout: 30000 },
      { name: 'Find Unused Code', cmd: 'pnpm run find:unused', timeout: 30000 },
      { name: 'Performance Benchmark', cmd: 'pnpm run benchmark:enhanced', timeout: 45000 },
      { name: 'System Integration', cmd: 'pnpm run integrate:systems', timeout: 30000 },
      { name: 'Auto Documentation', cmd: 'pnpm run docs:auto', timeout: 30000 },
      { name: 'Validate Visionary Art', cmd: 'pnpm run validate:visionary-art', timeout: 60000 },
      { name: 'Validate Sacred Math', cmd: 'pnpm run validate:sacred-math', timeout: 60000 },
      { name: 'Validate Sound Math', cmd: 'pnpm run validate:sound-math', timeout: 60000 },
      { name: 'Validate Design Math', cmd: 'pnpm run validate:design-math', timeout: 60000 },
      { name: 'Validate Game Math', cmd: 'pnpm run validate:game-math', timeout: 60000 },
      { name: 'Validate Enterprise Standard', cmd: 'pnpm run validate:enterprise', timeout: 120000 },
      { name: 'Validate REGISTRY', cmd: 'pnpm run validate:registry', timeout: 60000 },
      { name: 'Analyze Master Docs', cmd: 'pnpm run analyze:master-docs', timeout: 60000 }
    ];

    // Phase 4: Learn & Deploy (Learn your needs, deploy updates live)
    const learnAndDeployTools = [
      { name: 'Learn From Material', cmd: 'node tools/learn-from-material.mjs', timeout: 120000 },
      { name: 'Boost Rebecca Ideas', cmd: 'pnpm run boost:rebecca-ideas', timeout: 120000 },
      { name: 'Update Backups', cmd: 'pnpm run backup:create', timeout: 60000 },
      { name: 'Learn & Deploy', cmd: 'node tools/make-updates-live.mjs', timeout: 200000 },
      { name: 'Monorepo Improvement', cmd: 'pnpm run improve:monorepo', timeout: 120000 }
    ];

    // Phase 0.5: Alignment Detection (before improvements)
    if (this.cycleCount % 5 === 1) { // Run every 5 cycles
      try {
        logger.info('\n🔍 Phase 0.5: Alignment Detection');
        logger.info('   → Detecting flattened work, bad pages, lame content');
        const detector = new AlignmentDetector();
        await detector.detectAlignment();
        UserFeedback.success('Alignment detection complete');
      } catch (error) {
        logger.error(`   ❌ Alignment detection error: ${error instanceof Error ? error.message : String(error)}`);
        cycleResults.errors.push({
          tool: 'Alignment Detection',
          error: error instanceof Error ? error.message : String(error),
          phase: 'alignment-detection'
        });
      }
    }

    // Phase 1: Run repo and git tools first (critical)
    logger.info('📋 Phase 1: Repository & Git Updates');
    for (const tool of repoAndGitTools) {
      // Health check before running
      if (!this.performHealthCheck(tool.name)) {
        UserFeedback.warning(`Skipping ${tool.name} due to health check failure`);
        continue;
      }
      
      // Smart skip: skip if tool failed multiple times recently
      if (this.shouldSkipTool(tool.name)) {
        UserFeedback.info(`Skipping ${tool.name} (recent failures detected)`);
        continue;
      }
      
      // Adaptive timeout based on historical performance
      const adaptiveTimeout = this.getAdaptiveTimeout(tool.name, tool.timeout);
      
      // Retry logic
      const result = await this.runToolWithRetry(tool, adaptiveTimeout, 'repo-git');
      if (result.success) {
        cycleResults.improvements.push(result.data);
        this.updateMetrics(tool.name, 'success', result.data.duration, 'repo-git');
        UserFeedback.success(`${tool.name} completed (${result.data.duration}ms)`);
      } else {
        cycleResults.errors.push(result.error);
        this.updateMetrics(tool.name, 'failure', 0, 'repo-git', result.error.error);
        UserFeedback.warning(`${tool.name} had issues (non-critical)`);
      }
    }

    // Phase 1.5: Alignment Cleaning (after repo/git, before solve et coagula)
    // Enhanced: Automatically cleans junk so user never has to deal with it
    if (this.cycleCount % 10 === 0) { // Run every 10 cycles
      try {
        logger.info('\n🧹 Phase 1.5: Alignment Cleaning (Automatic Junk Removal)');
        logger.info('   → Fixing flattened work, bad pages, lame content');
        logger.info('   → Clearing misaligned content automatically');
        const cleaner = new AlignmentCleaner();
        const result = await cleaner.cleanAlignment(false); // Not dry-run
        UserFeedback.success(`Alignment cleaning complete: ${result.fixed || 0} files fixed`);
        
        cycleResults.improvements.push({
          tool: 'Alignment Cleaning',
          status: 'success',
          filesFixed: result.fixed || 0,
          filesSkipped: result.skipped || 0,
          phase: 'alignment-cleaning'
        });
      } catch (error) {
        logger.error(`   ❌ Alignment cleaning error: ${error instanceof Error ? error.message : String(error)}`);
        cycleResults.errors.push({
          tool: 'Alignment Cleaning',
          error: error instanceof Error ? error.message : String(error),
          phase: 'alignment-cleaning'
        });
      }
    }

    // Phase 2: Run Solve et Coagula (Doubt → Research → Implementation)
    logger.info('\n📋 Phase 2: Solve et Coagula (Doubt → Research → Implementation)');
    
    // Generate codex entry inspired by doubt/expansion cycle
    if (this.cycleCount % 5 === 0) { // Every 5 cycles
      try {
        logger.info('   📖 Generating codex entry from doubt/expansion cycle...');
        const { CodexGenerator } = await import('./codex-generator.mjs');
        const generator = new CodexGenerator();
        const context = this.getCurrentContext();
        const codexEntry = await generator.generateCodexEntry(context);
        logger.info(`   ✅ Codex entry created: ${codexEntry.id}`);
        cycleResults.improvements.push({
          tool: 'Codex Generator',
          status: 'success',
          codexId: codexEntry.id,
          phase: 'solve-et-coagula'
        });
      } catch (error) {
        logger.warn(`   ⚠️ Codex generation error: ${error.message}`);
        // Non-critical, continue
      }
    }
    
    for (const tool of solveEtCoagulaTools) {
      // Health check before running
      if (!this.performHealthCheck(tool.name)) {
        UserFeedback.warning(`Skipping ${tool.name} due to health check failure`);
        continue;
      }
      
      // Smart skip: skip if tool failed multiple times recently
      if (this.shouldSkipTool(tool.name)) {
        UserFeedback.info(`Skipping ${tool.name} (recent failures detected)`);
        continue;
      }
      
      // Adaptive timeout based on historical performance
      const adaptiveTimeout = this.getAdaptiveTimeout(tool.name, tool.timeout);
      
      // Retry logic
      const result = await this.runToolWithRetry(tool, adaptiveTimeout, 'solve-et-coagula');
      if (result.success) {
        cycleResults.improvements.push(result.data);
        this.updateMetrics(tool.name, 'success', result.data.duration, 'solve-et-coagula');
        UserFeedback.success(`${tool.name} completed (${result.data.duration}ms)`);
      } else {
        cycleResults.errors.push(result.error);
        this.updateMetrics(tool.name, 'failure', 0, 'solve-et-coagula', result.error.error);
        UserFeedback.warning(`${tool.name} had issues (non-critical)`);
      }
    }

    // Phase 3: Run code improvements after solve et coagula
    logger.info('\n📋 Phase 3: Code & Quality Improvements');
    
    // Improve tools using doubt/expansion cycle (every 7 cycles)
    if (this.cycleCount % 7 === 0) {
      try {
        logger.info('   🔧 Improving tools using doubt/expansion cycle...');
        const { ToolImprover } = await import('./tool-improver.mjs');
        const improver = new ToolImprover();
        const results = await improver.improveAllTools();
        const improved = results.filter(r => r.improved).length;
        logger.info(`   ✅ Improved ${improved} tools`);
        cycleResults.improvements.push({
          tool: 'Tool Improver',
          status: 'success',
          toolsImproved: improved,
          phase: 'code-quality'
        });
      } catch (error) {
        logger.warn(`   ⚠️ Tool improvement error: ${error.message}`);
        // Non-critical, continue
      }
    }
    
    for (const tool of codeImprovementTools) {
      // Health check before running
      if (!this.performHealthCheck(tool.name)) {
        UserFeedback.warning(`Skipping ${tool.name} due to health check failure`);
        continue;
      }
      
      // Smart skip: skip if tool failed multiple times recently
      if (this.shouldSkipTool(tool.name)) {
        UserFeedback.info(`Skipping ${tool.name} (recent failures detected)`);
        continue;
      }
      
      // Adaptive timeout based on historical performance
      const adaptiveTimeout = this.getAdaptiveTimeout(tool.name, tool.timeout);
      
      // Retry logic
      const result = await this.runToolWithRetry(tool, adaptiveTimeout, 'code-quality');
      if (result.success) {
        cycleResults.improvements.push(result.data);
        this.updateMetrics(tool.name, 'success', result.data.duration, 'code-quality');
        UserFeedback.success(`${tool.name} completed (${result.data.duration}ms)`);
      } else {
        cycleResults.errors.push(result.error);
        this.updateMetrics(tool.name, 'failure', 0, 'code-quality', result.error.error);
        UserFeedback.warning(`${tool.name} had issues (non-critical)`);
      }
    }

    // Phase 3.25: Vision Weaving (weave complete vision throughout)
    if (this.cycleCount % 8 === 0) { // Run every 8 cycles
      try {
        logger.info('\n🧵 Phase 3.25: Vision Weaving');
        logger.info('   → Weaving ND joy, esoteric traditions, academic barriers throughout');
        const { VisionWeaver } = await import('./vision-weaver.mjs');
        const weaver = new VisionWeaver();
        const report = await weaver.weaveCompleteVision();
        logger.info(`   ✅ Vision woven: ${report.summary.woven} files enhanced`);
        cycleResults.improvements.push({
          tool: 'Vision Weaver',
          status: 'success',
          opportunities: report.summary.opportunitiesFound,
          woven: report.summary.woven,
          phase: 'vision-weaving'
        });
      } catch (error) {
        logger.warn(`   ⚠️ Vision weaving error: ${error.message}`);
        // Non-critical, continue
      }
    }

    // Phase 3.3: Monad Hieroglyphica Theme Application (apply alchemy theme for coherence)
    if (this.cycleCount % 6 === 0) { // Run every 6 cycles
      try {
        logger.info('\n🔮 Phase 3.3: Monad Hieroglyphica Theme Application');
        logger.info('   → Applying alchemy theme for coherence across all tools, themes, engines, systems');
        logger.info('   → Unity in diversity (one symbol containing all)');
        const { default: MonadHieroglyphicaTheme } = await import('./monad-hieroglyphica-theme.mjs');
        const themeApplier = new MonadHieroglyphicaTheme();
        const results = await themeApplier.applyThemeToAll();
        logger.info(`   ✅ Theme applied: ${results.totalApplied} files enhanced`);
        cycleResults.improvements.push({
          tool: 'Monad Hieroglyphica Theme',
          status: 'success',
          applied: results.totalApplied,
          skipped: results.totalSkipped,
          coherenceScore: results.coherence.score,
          phase: 'theme-application'
        });
      } catch (error) {
        logger.warn(`   ⚠️ Theme application error: ${error.message}`);
        // Non-critical, continue
      }
    }

    // Phase 3.35: Coherence Checking (ensure Monad Hieroglyphica theme coherence)
    if (this.cycleCount % 4 === 0) { // Run every 4 cycles
      try {
        logger.info('\n🔍 Phase 3.35: Coherence Checking');
        logger.info('   → Checking Monad Hieroglyphica theme coherence');
        logger.info('   → Verifying theme, mathematics, alchemy, quality, vision alignment');
        const { default: CoherenceChecker } = await import('./coherence-checker.mjs');
        const checker = new CoherenceChecker();
        const report = await checker.checkAll();
        logger.info(`   ✅ Coherence checked: ${report.overallScore.toFixed(1)}% overall`);
        cycleResults.improvements.push({
          tool: 'Coherence Checker',
          status: 'success',
          overallScore: report.overallScore,
          recommendations: report.recommendations.length,
          phase: 'coherence-checking'
        });
      } catch (error) {
        logger.warn(`   ⚠️ Coherence checking error: ${error.message}`);
        // Non-critical, continue
      }
    }

    // Phase 3.4: Tool Packaging (package tools, themes, engines, systems with Monad theme)
    if (this.cycleCount % 12 === 0) { // Run every 12 cycles
      try {
        logger.info('\n📦 Phase 3.4: Tool Packaging');
        logger.info('   → Packaging tools, themes, engines, systems with Monad Hieroglyphica theme');
        logger.info('   → Ensuring coherent distribution and integration');
        const { default: ToolPackager } = await import('./tool-packager.mjs');
        const packager = new ToolPackager();
        const manifest = await packager.packageAll();
        logger.info(`   ✅ Tools packaged: ${manifest.packages.tools.length} tools, ${manifest.packages.themes.length} themes, ${manifest.packages.engines.length} engines, ${manifest.packages.systems.length} systems`);
        cycleResults.improvements.push({
          tool: 'Tool Packager',
          status: 'success',
          tools: manifest.packages.tools.length,
          themes: manifest.packages.themes.length,
          engines: manifest.packages.engines.length,
          systems: manifest.packages.systems.length,
          coherenceScore: manifest.coherence.score,
          phase: 'tool-packaging'
        });
      } catch (error) {
        logger.warn(`   ⚠️ Tool packaging error: ${error.message}`);
        // Non-critical, continue
      }
    }

    // Phase 3.5: Alignment Validation & Quality Monitoring (after code improvements, before learn & deploy)
    if (this.cycleCount % 3 === 0) { // Run every 3 cycles
      try {
        logger.info('\n✅ Phase 3.5: Alignment Validation & Quality Monitoring');
        logger.info('   → Validating alignment after improvements');
        logger.info('   → Monitoring for flat/embarrassing work');
        const detector = new AlignmentDetector();
        const validation = await detector.detectAlignment();
        const misalignedCount = validation.misaligned?.length || 0;
        
        // Quality monitoring: Check for flat/embarrassing work
        const flatWork = validation.misaligned?.filter(m => 
          m.issues?.some(i => i.type === 'Flattened Work' || i.type === 'Bad Pages' || i.type === 'Lame Content')
        ) || [];
        
        if (misalignedCount === 0) {
          UserFeedback.success('All content aligned!');
        } else {
          UserFeedback.warning(`${misalignedCount} files need alignment`);
          if (flatWork.length > 0) {
            logger.warn(`   ⚠️ ${flatWork.length} files with flat/embarrassing work detected`);
            logger.info('   → These will be fixed in next alignment cleaning cycle');
          }
        }
        
        // Track quality metrics
        cycleResults.improvements.push({
          tool: 'Quality Monitoring',
          status: 'success',
          misalignedCount,
          flatWorkCount: flatWork.length,
          phase: 'alignment-validation'
        });
      } catch (error) {
        logger.error(`   ❌ Alignment validation error: ${error instanceof Error ? error.message : String(error)}`);
        cycleResults.errors.push({
          tool: 'Alignment Validation',
          error: error instanceof Error ? error.message : String(error),
          phase: 'alignment-validation'
        });
      }
    }

    // Phase 4: Learn & Deploy (Learn your needs, deploy updates live)
    logger.info('\n📋 Phase 4: Learn & Deploy (Understanding Your Needs, Making Updates Live)');
    
    // Enhance entire magnum opus (every 10 cycles)
    if (this.cycleCount % 10 === 0) {
      try {
        logger.info('   🏛️ Enhancing entire magnum opus...');
        const { MagnumOpusEnhancer } = await import('./magnum-opus-enhancer.mjs');
        const enhancer = new MagnumOpusEnhancer();
        const report = await enhancer.enhanceMagnumOpus();
        logger.info(`   ✅ Magnum opus enhancement complete: ${report.research.enhancements.length} enhancements identified`);
        cycleResults.improvements.push({
          tool: 'Magnum Opus Enhancer',
          status: 'success',
          enhancements: report.research.enhancements.length,
          applied: report.expansion.enhancementsApplied.length,
          phase: 'learn-deploy'
        });
      } catch (error) {
        logger.warn(`   ⚠️ Magnum opus enhancement error: ${error.message}`);
        // Non-critical, continue
      }
    }
    
    for (const tool of learnAndDeployTools) {
      // Health check before running
      if (!this.performHealthCheck(tool.name)) {
        UserFeedback.warning(`Skipping ${tool.name} due to health check failure`);
        continue;
      }
      
      // Smart skip: skip if tool failed multiple times recently
      if (this.shouldSkipTool(tool.name)) {
        UserFeedback.info(`Skipping ${tool.name} (recent failures detected)`);
        continue;
      }
      
      // Adaptive timeout based on historical performance
      const adaptiveTimeout = this.getAdaptiveTimeout(tool.name, tool.timeout);
      
      // Retry logic
      const result = await this.runToolWithRetry(tool, adaptiveTimeout, 'learn-deploy');
      if (result.success) {
        cycleResults.improvements.push(result.data);
        this.updateMetrics(tool.name, 'success', result.data.duration, 'learn-deploy');
        UserFeedback.success(`${tool.name} completed (${result.data.duration}ms)`);
      } else {
        cycleResults.errors.push(result.error);
        this.updateMetrics(tool.name, 'failure', 0, 'learn-deploy', result.error.error);
        UserFeedback.warning(`${tool.name} had issues (non-critical)`);
      }
    }

    // Generate improvement report every 10 cycles
    if (this.cycleCount % 10 === 0) {
      try {
        logger.info('   📊 Generating improvement report...');
        const { default: ImprovementReporter } = await import('./improvement-reporter.mjs');
        const reporter = new ImprovementReporter();
        await reporter.generateReport();
        logger.info('   ✅ Improvement report generated');
      } catch (error) {
        logger.warn(`   ⚠️  Report generation error: ${error.message}`);
        // Non-critical, continue
      }
    }

    // Update documentation
    try {
      UserFeedback.info('Updating documentation...');
      execSync('node tools/pnpm-wrapper.mjs run docs:auto', {
        cwd: BASE_DIR,
        stdio: 'pipe',
        timeout: 30000
      });
      cycleResults.improvements.push({
        tool: 'Documentation',
        status: 'success'
      });
      UserFeedback.success('Documentation updated');
    } catch (error) {
      cycleResults.errors.push({
        tool: 'Documentation',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    // Save cycle results
    cycleResults.duration = Date.now() - cycleStart;
    this.state.cycles.push(cycleResults);
    this.state.totalImprovements += cycleResults.improvements.length;
    
    // State file optimization is now handled in saveState() - keeps last 50, archives rest

    this.saveState();

    // Display cycle summary with metrics
    const successRate = this.metrics.totalRuns > 0 
      ? ((this.metrics.totalSuccesses / this.metrics.totalRuns) * 100).toFixed(2)
      : 0;
    
    logger.info('\n📊 Cycle Summary');
    logger.info('=============================================');
    logger.info(`Improvements: ${cycleResults.improvements.length}`);
    logger.info(`Errors: ${cycleResults.errors.length}`);
    logger.info(`Duration: ${(cycleResults.duration / 1000).toFixed(2)}s`);
    logger.info(`Total improvements (all cycles): ${this.state.totalImprovements}`);
    logger.info(`Overall Success Rate: ${successRate}%`);
    logger.info(`Total Runs: ${this.metrics.totalRuns} (${this.metrics.totalSuccesses} success, ${this.metrics.totalFailures} failures)`);

    // Log cycle
    logger.info(`Improvement cycle #${this.cycleCount} completed`, {
      improvements: cycleResults.improvements.length,
      errors: cycleResults.errors.length,
      duration: cycleResults.duration
    });

    return cycleResults;
  }

  /**
   * Determine if we should create a doubt moment (organic scheduling)
   * Reflects natural creative process with moments of uncertainty
   */
  shouldCreateDoubtMoment() {
    // Create doubt moments organically - every 3-7 cycles
    // Reflects natural creative process with moments of uncertainty
    const cyclesSinceLastDoubt = this.cycleCount - (this.lastDoubtMoment?.cycle || 0);
    const shouldCreate = cyclesSinceLastDoubt >= (3 + Math.floor(Math.random() * 5));
    
    // Also create if we found bugs or issues
    const hasIssues = this.metrics.totalFailures > 0 && 
                     (this.metrics.totalFailures % 3 === 0);
    
    return shouldCreate || hasIssues;
  }

  /**
   * Execute organic doubt and research phase
   * Reflects a highly creative, nervous person's organic process
   */
  async executeOrganicDoubtResearch(cycleResults) {
    const phaseStart = Date.now();
    
    try {
      // Create doubt moment - organic, gentle, exploratory
      const context = this.getCurrentContext();
      const doubtMoment = await this.researchPlanner.createDoubtMoment(context);
      this.lastDoubtMoment = { ...doubtMoment, cycle: this.cycleCount };
      cycleResults.organicDoubtMoments = cycleResults.organicDoubtMoments || [];
      cycleResults.organicDoubtMoments.push(doubtMoment.id);
      
      logger.info(`   ✅ Doubt moment created: ${doubtMoment.id}`);
      logger.info(`   Feelings: ${doubtMoment.feelings.join(', ')}`);
      logger.info(`   Questions: ${doubtMoment.questions.length} organic questions`);
      
      // Conduct research on key questions (actual research, not just checking)
      const researchTopic = this.selectResearchTopic(doubtMoment);
      if (researchTopic) {
        const research = await this.researchPlanner.conductResearch(doubtMoment, researchTopic);
        logger.info(`   ✅ Research conducted: ${research.topic}`);
        logger.info(`   Approach: ${research.approach}`);
        logger.info(`   Sources found: ${research.sources.length}`);
        logger.info(`   Insights: ${research.insights.length}`);
        
        // Create planning session
        const planning = await this.researchPlanner.createPlanningSession(doubtMoment, research);
        logger.info(`   ✅ Planning session created: ${planning.id}`);
        logger.info(`   Open world elements: ${planning.openWorldElements.length}`);
      }
      
      // Save summary
      await this.researchPlanner.saveSummary();
      
      const phaseDuration = Date.now() - phaseStart;
      this.metrics.phaseStats['organic-doubt-research'].successes++;
      this.metrics.phaseStats['organic-doubt-research'].totalDuration += phaseDuration;
      
      cycleResults.improvements.push({
        tool: 'Organic Research & Planning',
        status: 'success',
        duration: phaseDuration,
        doubtMoment: doubtMoment.id
      });
      
      logger.info(`   ✅ Organic research complete (${(phaseDuration / 1000).toFixed(1)}s)`);
      logger.info(`   Philosophy: Open world experience, not website-like`);
    } catch (error) {
      logger.error(`   ❌ Organic research error: ${error.message}`);
      this.metrics.phaseStats['organic-doubt-research'].failures++;
      throw error;
    }
  }

  /**
   * Perform system health check and self-healing
   */
  async performSystemHealthCheck(cycleResults) {
    const healthStart = Date.now();
    
    try {
      // Check state file size
      if (fs.existsSync(STATE_FILE)) {
        const stats = fs.statSync(STATE_FILE);
        const fileSizeMB = stats.size / (1024 * 1024);
        
        logger.info(`   📊 State file size: ${fileSizeMB.toFixed(2)} MB`);
        
        // If state file is too large (> 2MB), run cleanup
        if (fileSizeMB > 2) {
          logger.info('   🧹 State file too large, running cleanup...');
          try {
            const { cleanupStateFile } = await import('./cleanup-state-file.mjs');
            cleanupStateFile();
            UserFeedback.success('State file optimized');
          } catch (err) {
            logger.warn(`   ⚠️ Cleanup error: ${err.message}`);
          }
        }
      }
      
      // Check for stale lock file
      if (fs.existsSync(LOCK_FILE)) {
        try {
          const lockContent = fs.readFileSync(LOCK_FILE, 'utf-8');
          const lockPid = parseInt(lockContent.trim());
          
          // Check if process is still running
          try {
            process.kill(lockPid, 0); // Signal 0 just checks if process exists
          } catch (err) {
            // Process doesn't exist, remove stale lock
            logger.info('   🧹 Removing stale lock file');
            fs.unlinkSync(LOCK_FILE);
          }
        } catch (err) {
          // Can't read lock, try to remove it
          try {
            fs.unlinkSync(LOCK_FILE);
          } catch {
            // Ignore
          }
        }
      }
      
      const healthDuration = Date.now() - healthStart;
      cycleResults.improvements.push({
        tool: 'System Health Check',
        status: 'success',
        duration: healthDuration,
        phase: 'system-health'
      });
      
      logger.info(`   ✅ Health check complete (${(healthDuration / 1000).toFixed(1)}s)`);
    } catch (error) {
      logger.error(`   ❌ Health check error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get current context for doubt moment
   */
  getCurrentContext() {
    const contexts = [
      'Building cathedrals workflow',
      'System integration',
      'Code quality improvements',
      'Design patterns',
      'Mathematical consistency',
      'Open world experience design',
      'Trauma-aware patterns',
      'Organic creative process',
      'Making apps feel alive, not website-like'
    ];
    
    // Check for recent errors or issues
    if (this.metrics.totalFailures > 0) {
      return `Recent issues and improvements needed`;
    }
    
    return contexts[Math.floor(Math.random() * contexts.length)];
  }

  /**
   * Select research topic from doubt moment
   */
  selectResearchTopic(doubtMoment) {
    // Select 1-2 questions to research deeply
    const questions = doubtMoment.questions;
    if (questions.length === 0) return null;
    
    const selectedCount = Math.min(2, Math.floor(Math.random() * 2) + 1);
    const selected = questions.slice(0, selectedCount);
    
    // Convert questions to research topics
    return selected.join(' and ');
  }

  async start() {
    if (this.isRunning) {
      UserFeedback.warning('Continuous improvement already running');
      return;
    }

    this.isRunning = true;
    
    UserFeedback.section('Continuous Improvement System');
    logger.info(`Interval: 1 minute (${IMPROVEMENT_INTERVAL / 1000}s)`);
    logger.info(`State file: ${STATE_FILE}`);
    logger.info(`Started: ${new Date().toLocaleString()}\n`);

    // Run first cycle immediately
    await this.runImprovementCycle();

    // Then run every 1 minute
    const intervalId = setInterval(async () => {
      if (!this.isRunning) {
        clearInterval(intervalId);
        return;
      }

      try {
        await this.runImprovementCycle();
      } catch (error) {
        logger.error('Improvement cycle failed', {
          error: error instanceof Error ? error.message : String(error)
        });
        // NEVER STOP - continue running even on errors
        logger.info('✅ Continuing despite error - experiment never stops');
      }
    }, IMPROVEMENT_INTERVAL);

    // Enhanced error handling - NEVER STOP
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught exception:', error);
      // NEVER EXIT - always recover and continue
      this.handleCriticalError(error);
      logger.info('✅ Recovered from uncaught exception - continuing');
      // Ensure interval keeps running
      if (!this.isRunning) {
        this.isRunning = true;
      }
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled rejection:', reason);
      // NEVER EXIT - always recover and continue
      this.handleCriticalError(reason);
      logger.info('✅ Recovered from unhandled rejection - continuing');
      // Ensure interval keeps running
      if (!this.isRunning) {
        this.isRunning = true;
      }
    });

    // Handle signals - but NEVER stop automatically
    process.on('SIGINT', () => {
      logger.info('\n\n⚠️  Received SIGINT - saving state but continuing...');
      this.saveState();
      logger.info('✅ State saved. Continuing - experiment never stops automatically!');
      // Don't exit - keep running forever
    });

    process.on('SIGTERM', () => {
      logger.info('\n\n⚠️  Received SIGTERM - saving state but continuing...');
      this.saveState();
      logger.info('✅ State saved. Continuing - experiment never stops automatically!');
      // Don't exit - keep running forever
    });

    logger.info('\n✅ Continuous improvement running...');
    logger.info('🔄 Will run continuously - NEVER stops automatically');
    logger.info('💪 Error resilient - continues even on failures');
    logger.info('✨ Keeps going and going and going...\n');
  }

  /**
   * Handle critical errors gracefully
   */
  handleCriticalError(error) {
    logger.error('Critical error detected, attempting recovery...');
    
    try {
      // Save current state before recovery
      this.saveState();
      
      // Log error for analysis
      if (!this.metrics.errorPatterns) {
        this.metrics.errorPatterns = {};
      }
      const errorKey = error.message?.substring(0, 50) || 'Unknown error';
      this.metrics.errorPatterns[errorKey] = (this.metrics.errorPatterns[errorKey] || 0) + 1;
      
      // Don't exit - continue running
      logger.info('✅ Error logged, continuing operation...');
    } catch (recoveryError) {
      logger.error('Recovery failed:', recoveryError);
      // Still don't exit - let it continue
    }
  }

  stop() {
    this.isRunning = false;
    this.saveState();
  }

  getStatus() {
    return {
      running: this.isRunning,
      cycleCount: this.cycleCount,
      totalImprovements: this.state.totalImprovements,
      lastUpdate: this.state.lastUpdate,
      recentCycles: this.state.cycles.slice(-5)
    };
  }
}

async function startContinuousImprovements() {
  const runner = new ContinuousImprovementRunner();
  await runner.start();
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  
  if (command === 'status') {
    const runner = new ContinuousImprovementRunner();
    const status = runner.getStatus();
    
    logger.info('📊 Continuous Improvement Status');
    logger.info('=============================================');
    logger.info(`Running: ${status.running ? '✅ Yes' : '❌ No'}`);
    logger.info(`Cycles completed: ${status.cycleCount}`);
    logger.info(`Total improvements: ${status.totalImprovements}`);
    logger.info(`Last update: ${status.lastUpdate || 'Never'}`);
    
    if (status.recentCycles.length > 0) {
      logger.info('\nRecent cycles:');
      status.recentCycles.forEach(cycle => {
        logger.info(`  Cycle #${cycle.cycle}: ${cycle.improvements.length} improvements, ${cycle.errors.length} errors`);
      });
    }
  } else {
    startContinuousImprovements();
  }
}

export { ContinuousImprovementRunner, startContinuousImprovements };

