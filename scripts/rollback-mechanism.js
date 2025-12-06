#!/usr/bin/env node

/**
 * Cathedral Real - Rollback Mechanism
 * Handles failed builds and releases rollback operations
 */

const fs = require('fs');
const { execSync } = require('child_process');

class RollbackMechanism {
  constructor() {
    this.data = {
      failedBuildId: process.env.GITHUB_RUN_ID,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
  }

  async handleBuildRollback() {
    console.log('🔄 Initiating build rollback...');
    
    try {
      const previousCommit = await this.findWorkingCommit();
      if (previousCommit) {
        await this.gitRollback(previousCommit);
        await this.cleanupArtifacts();
        await this.notify('build', previousCommit);
        this.data.status = 'completed';
      } else {
        this.data.status = 'failed';
        await this.notify('build', null, 'No working commit found');
      }
    } catch (error) {
      console.error('Rollback failed:', error.message);
      this.data.status = 'failed';
      this.data.error = error.message;
    }
    
    return this.saveLog();
  }

  async findWorkingCommit() {
    try {
      const commits = execSync('git log --oneline -10', { encoding: 'utf8' })
        .split('\n').filter(l => l.trim());
      
      for (const commit of commits) {
        const hash = commit.split(' ')[0];
        try {
          execSync(`git checkout ${hash}`, { stdio: 'pipe' });
          execSync('npm run build:ci', { stdio: 'pipe', timeout: 60000 });
          execSync('git checkout -', { stdio: 'pipe' });
          console.log(`✅ Found working commit: ${hash}`);
          return hash;
        } catch {
          console.log(`❌ Commit ${hash} failed`);
          continue;
        }
      }
      execSync('git checkout -', { stdio: 'pipe' });
      return null;
    } catch (error) {
      console.error('Failed to find working commit:', error.message);
      return null;
    }
  }

  async gitRollback(commitHash) {
    try {
      execSync(`git reset --hard ${commitHash}`, { stdio: 'inherit' });
      this.data.rollback = { commit: commitHash, timestamp: new Date().toISOString() };
      console.log(`✅ Rolled back to ${commitHash}`);
    } catch (error) {
      throw new Error(`Git rollback failed: ${error.message}`);
    }
  }

  async cleanupArtifacts() {
    const paths = ['dist', 'lib', 'build', 'out', 'coverage', '.turbo'];
    paths.forEach(path => {
      if (fs.existsSync(path)) {
        execSync(`rm -rf ${path}`, { stdio: 'pipe' });
        console.log(`🗑️ Cleaned ${path}`);
      }
    });
  }

  async notify(type, target, error = null) {
    const message = error 
      ? `🚨 ${type.toUpperCase()} Rollback Failed: ${error}`
      : `✅ ${type.toUpperCase()} Rollback Completed: ${target}`;
    
    console.log(message);
    this.data.notification = { type, target, error, timestamp: new Date().toISOString() };
  }

  saveLog() {
    const logPath = `rollback-log-${Date.now()}.json`;
    fs.writeFileSync(logPath, JSON.stringify(this.data, null, 2));
    console.log(`📄 Log saved: ${logPath}`);
    return { success: this.data.status === 'completed', logPath, data: this.data };
  }

  static async triggerFromCI() {
    const rollback = new RollbackMechanism();
    return await rollback.handleBuildRollback();
  }
}

// CLI
if (require.main === module) {
  const command = process.argv[2];
  if (command === 'build') {
    RollbackMechanism.triggerFromCI().then(r => process.exit(r.success ? 0 : 1));
  } else {
    console.log('Usage: node rollback-mechanism.js build');
    process.exit(1);
  }
}

module.exports = RollbackMechanism;