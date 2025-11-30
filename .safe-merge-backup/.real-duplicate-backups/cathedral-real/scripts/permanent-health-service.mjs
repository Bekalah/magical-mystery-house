#!/usr/bin/env node
/**
 * Permanent Health Monitoring Service
 * 
 * Runs continuously, monitors health, verifies connections
 * Auto-starts on system boot, runs in background
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { MonorepoHealthMonitor } from './monorepo-health-monitor.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HEALTH_CHECK_INTERVAL = 60000; // 1 minute
const CONNECTION_CHECK_INTERVAL = 300000; // 5 minutes
const HEALTH_LOG = path.join(rootDir, 'permanent-health.log');
const HEALTH_STATE = path.join(rootDir, 'permanent-health-state.json');

class PermanentHealthService {
  constructor() {
    this.monitor = new MonorepoHealthMonitor();
    this.isRunning = true;
    this.lastHealthCheck = 0;
    this.lastConnectionCheck = 0;
    this.healthHistory = [];
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(message);
    try {
      fs.appendFileSync(HEALTH_LOG, logMessage, 'utf8');
    } catch (e) {
      // If logging fails, at least print to console
      console.error(`Failed to write to log: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  verifyDirectoryConnections() {
    this.log('🔗 Verifying directory connections...');
    
    const connections = {
      valid: [],
      invalid: [],
      missing: []
    };

    // Expected directory structure
    const expectedDirs = {
      packages: path.join(rootDir, 'packages'),
      apps: path.join(rootDir, 'apps'),
      scripts: path.join(rootDir, 'scripts'),
      tools: path.join(rootDir, 'tools'),
      docs: path.join(rootDir, 'docs'),
      openspec: path.join(rootDir, 'openspec')
    };

    // Check each expected directory
    for (const [name, dirPath] of Object.entries(expectedDirs)) {
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        connections.valid.push({ name, path: dirPath });
        this.log(`   ✅ ${name}: Connected`);
      } else {
        connections.missing.push({ name, path: dirPath });
        this.log(`   ❌ ${name}: Missing`);
      }
    }

    // Verify package connections
    const packagesDir = path.join(rootDir, 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir).filter(name => {
        const pkgPath = path.join(packagesDir, name);
        return fs.statSync(pkgPath).isDirectory();
      });

      for (const pkg of packages) {
        const pkgPath = path.join(packagesDir, pkg);
        const srcPath = path.join(pkgPath, 'src');
        const packageJsonPath = path.join(pkgPath, 'package.json');
        
        const hasSrc = fs.existsSync(srcPath);
        const hasPackageJson = fs.existsSync(packageJsonPath);
        
        if (hasSrc && hasPackageJson) {
          connections.valid.push({ name: `package:${pkg}`, path: pkgPath });
        } else {
          if (!hasPackageJson) {
            connections.invalid.push({ name: `package:${pkg}`, issue: 'Missing package.json', path: pkgPath });
          }
          if (!hasSrc) {
            connections.invalid.push({ name: `package:${pkg}`, issue: 'Missing src/', path: pkgPath });
          }
        }
      }
    }

    // Verify cross-references
    this.verifyCrossReferences(connections);

    return connections;
  }

  verifyCrossReferences(connections) {
    this.log('🔗 Verifying cross-references...');
    
    // Check if packages reference each other correctly
    const packagesDir = path.join(rootDir, 'packages');
    if (!fs.existsSync(packagesDir)) return;

    const packages = fs.readdirSync(packagesDir).filter(name => {
      const pkgPath = path.join(packagesDir, name);
      return fs.statSync(pkgPath).isDirectory();
    });

    for (const pkg of packages) {
      const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
      if (!fs.existsSync(packageJsonPath)) continue;

      try {
        const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
        
        for (const [depName, depVersion] of Object.entries(deps)) {
          if (depName.startsWith('@cathedral/')) {
            const depPkg = depName.replace('@cathedral/', '');
            const depPath = path.join(packagesDir, depPkg);
            
            if (fs.existsSync(depPath)) {
              connections.valid.push({ name: `ref:${pkg}→${depPkg}`, path: depPath });
            } else {
              connections.invalid.push({ 
                name: `ref:${pkg}→${depPkg}`, 
                issue: 'Referenced package not found', 
                path: depPath 
              });
            }
          }
        }
      } catch (e) {
        // Skip invalid package.json
      }
    }
  }

  async performHealthCheck() {
    this.log('🏥 Performing health check...');
    
    try {
      await this.monitor.scan();
      const health = this.monitor.healthData;
      
      // Save state
      const state = {
        timestamp: Date.now(),
        overall: health.overall,
        packages: health.packages.length,
        healthyPackages: health.packages.filter(p => p.status === 'healthy').length,
        build: health.build.status,
        typescript: health.typescript.errors,
        connections: this.verifyDirectoryConnections()
      };
      
      fs.writeFileSync(HEALTH_STATE, JSON.stringify(state, null, 2));
      
      this.healthHistory.push({
        timestamp: Date.now(),
        health: health.overall.health,
        status: health.overall.status
      });
      
      // Keep only last 100 entries
      if (this.healthHistory.length > 100) {
        this.healthHistory.shift();
      }
      
      this.log(`✅ Health check complete: ${health.overall.health}% (${health.overall.status})`);
      
      return health;
    } catch (error) {
      this.log(`❌ Health check failed: ${error.message}`);
      return null;
    }
  }

  async run() {
    this.log('🚀 Starting Permanent Health Service...');
    this.log(`📁 Root directory: ${rootDir}`);
    this.log(`⏱️  Health check interval: ${HEALTH_CHECK_INTERVAL / 1000}s`);
    this.log(`🔗 Connection check interval: ${CONNECTION_CHECK_INTERVAL / 1000}s\n`);
    
    // Initial checks
    await this.performHealthCheck();
    
    // Continuous monitoring
    setInterval(async () => {
      const now = Date.now();
      
      // Health check
      if (now - this.lastHealthCheck >= HEALTH_CHECK_INTERVAL) {
        await this.performHealthCheck();
        this.lastHealthCheck = now;
      }
      
      // Connection check
      if (now - this.lastConnectionCheck >= CONNECTION_CHECK_INTERVAL) {
        this.verifyDirectoryConnections();
        this.lastConnectionCheck = now;
      }
    }, 10000); // Check every 10 seconds
    
    this.log('\n✅ Permanent Health Service running...\n');
  }
}

// Run service
const service = new PermanentHealthService();
service.run().catch(error => {
  console.error('❌ Service failed:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  service.log('\n👋 Shutting down Permanent Health Service...');
  service.isRunning = false;
  process.exit(0);
});

process.on('SIGTERM', () => {
  service.log('\n👋 Shutting down Permanent Health Service...');
  service.isRunning = false;
  process.exit(0);
});

