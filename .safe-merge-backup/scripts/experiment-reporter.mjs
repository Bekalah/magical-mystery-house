#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Reports all changes from improvement experiment
 * Ensures everything is saved and pushed
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

/**
 * Generate comprehensive change report
 */
function generateReport() {
  console.log('📊 Generating Improvement Experiment Report...\n');

  const report = {
    timestamp: new Date().toISOString(),
    state: null,
    improvements: [],
    changes: [],
    gitStatus: null,
    connections: {},
    cleanup: []
  };

  // Read experiment state
  const stateFile = path.join(BASE_DIR, 'experiment-state.json');
  if (fs.existsSync(stateFile)) {
    try {
      report.state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
      console.log('✅ Experiment state loaded');
    } catch (e) {
      console.log('⚠️  Could not read state file');
    }
  }

  // Read improvements summary
  const summaryFile = path.join(BASE_DIR, 'improvements-summary.md');
  if (fs.existsSync(summaryFile)) {
    try {
      const summary = fs.readFileSync(summaryFile, 'utf-8');
      report.improvements = summary.split('\n').filter(line => line.trim().length > 0);
      console.log(`✅ Found ${report.improvements.length} improvement entries`);
    } catch (e) {
      console.log('⚠️  Could not read summary file');
    }
  }

  // Check git status
  try {
    const gitStatus = execSync('git status --short', { 
      encoding: 'utf-8', 
      cwd: BASE_DIR 
    });
    if (gitStatus.trim()) {
      report.gitStatus = gitStatus.split('\n').filter(line => line.trim());
      console.log(`✅ Found ${report.gitStatus.length} uncommitted changes`);
    } else {
      console.log('✅ No uncommitted changes');
    }
  } catch (e) {
    console.log('⚠️  Not a git repository or git not available');
  }

  // Check git remotes
  try {
    const remotes = execSync('git remote -v', { 
      encoding: 'utf-8', 
      cwd: BASE_DIR 
    });
    report.connections.git = remotes.split('\n').filter(line => line.trim());
    console.log('✅ Git remotes configured');
  } catch (e) {
    report.connections.git = [];
  }

  // Check for workspace connections
  const workspaceFiles = [
    'workspace-integration.json',
    'workspace-config.json',
    '.workspace'
  ];

  for (const file of workspaceFiles) {
    const filePath = path.join(BASE_DIR, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        report.connections.workspace = content;
        console.log(`✅ Workspace config found: ${file}`);
        break;
      } catch (e) {
        // Not JSON or can't read
      }
    }
  }

  // Check for health map reports
  const reportsDir = path.join(BASE_DIR, 'improvement-reports');
  if (fs.existsSync(reportsDir)) {
    const reports = fs.readdirSync(reportsDir)
      .filter(name => name.endsWith('.json') || name.endsWith('.md'));
    report.connections.healthReports = reports.length;
    console.log(`✅ Found ${reports.length} health reports`);
  }

  // Check for competitive reports
  const competitiveDir = path.join(BASE_DIR, 'competitive-reports');
  if (fs.existsSync(competitiveDir)) {
    const reports = fs.readdirSync(competitiveDir)
      .filter(name => name.endsWith('.json'));
    report.connections.competitiveReports = reports.length;
    console.log(`✅ Found ${reports.length} competitive reports`);
  }

  // Find confusing files/folders
  const confusingFolders = ['backup', 'backups', 'old', 'temp', 'tmp', 'archive'];
  for (const folder of confusingFolders) {
    const folderPath = path.join(BASE_DIR, folder);
    if (fs.existsSync(folderPath)) {
      report.cleanup.push({
        type: 'folder',
        path: folder,
        size: getFolderSize(folderPath)
      });
    }
  }

  // Find backup files
  const backupPatterns = ['.backup', '.old', '.tmp', '~'];
  function findBackups(dir, depth = 0) {
    if (depth > 3) return; // Limit depth
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
            findBackups(fullPath, depth + 1);
          } else if (stat.isFile()) {
            for (const pattern of backupPatterns) {
              if (file.includes(pattern)) {
                report.cleanup.push({
                  type: 'file',
                  path: path.relative(BASE_DIR, fullPath),
                  size: stat.size
                });
                break;
              }
            }
          }
        } catch (e) {
          // Skip if can't access
        }
      }
    } catch (e) {
      // Skip if can't read
    }
  }

  findBackups(BASE_DIR);

  return report;
}

/**
 * Get folder size
 */
function getFolderSize(folderPath) {
  let size = 0;
  try {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          size += stat.size;
        } else if (stat.isDirectory()) {
          size += getFolderSize(filePath);
        }
      } catch (e) {
        // Skip if can't access
      }
    }
  } catch (e) {
    // Skip if can't read
  }
  return size;
}

/**
 * Save and push changes
 */
function saveAndPush(report) {
  console.log('\n💾 Saving changes...\n');

  // Stage all changes
  try {
    execSync('git add -A', { 
      cwd: BASE_DIR,
      stdio: 'inherit'
    });
    console.log('✅ All changes staged');
  } catch (e) {
    console.log('⚠️  Could not stage changes (not a git repo?)');
    return false;
  }

  // Commit changes
  try {
    const commitMessage = `Improvement experiment update - ${new Date().toISOString()}

- ${report.improvements.length} improvements recorded
- ${report.gitStatus?.length || 0} files changed
- Health reports: ${report.connections.healthReports || 0}
- Competitive reports: ${report.connections.competitiveReports || 0}
- Cleanup items: ${report.cleanup.length}`;

    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, {
      cwd: BASE_DIR,
      stdio: 'inherit'
    });
    console.log('✅ Changes committed');
  } catch (e) {
    console.log('⚠️  Could not commit (no changes or commit failed)');
  }

  // Push to remote
  try {
    execSync('git push', {
      cwd: BASE_DIR,
      stdio: 'inherit'
    });
    console.log('✅ Changes pushed to remote');
    return true;
  } catch (e) {
    console.log('⚠️  Could not push (no remote or push failed)');
    return false;
  }
}

/**
 * Print report
 */
function printReport(report) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPROVEMENT EXPERIMENT REPORT');
  console.log('='.repeat(60) + '\n');

  console.log(`📅 Timestamp: ${report.timestamp}\n`);

  if (report.state) {
    console.log('📝 Experiment State:');
    console.log(`   Current Cycle: ${report.state.currentCycle || 0}`);
    console.log(`   Total Cycles: ${report.state.totalCycles || 0}`);
    console.log(`   Improvements: ${report.state.improvements?.length || 0}`);
    console.log(`   Start Time: ${report.state.startTime ? new Date(report.state.startTime).toISOString() : 'N/A'}`);
    console.log('');
  }

  if (report.improvements.length > 0) {
    console.log('✨ Improvements:');
    report.improvements.slice(0, 10).forEach((imp, i) => {
      console.log(`   ${i + 1}. ${imp.substring(0, 80)}${imp.length > 80 ? '...' : ''}`);
    });
    if (report.improvements.length > 10) {
      console.log(`   ... and ${report.improvements.length - 10} more`);
    }
    console.log('');
  }

  if (report.gitStatus && report.gitStatus.length > 0) {
    console.log('📝 Uncommitted Changes:');
    report.gitStatus.slice(0, 10).forEach((change, i) => {
      console.log(`   ${change}`);
    });
    if (report.gitStatus.length > 10) {
      console.log(`   ... and ${report.gitStatus.length - 10} more`);
    }
    console.log('');
  }

  console.log('🔗 Connections:');
  if (report.connections.git && report.connections.git.length > 0) {
    console.log('   Git Remotes:');
    report.connections.git.forEach(remote => {
      console.log(`      ${remote}`);
    });
  }
  if (report.connections.workspace) {
    console.log('   ✅ Workspace configured');
  }
  if (report.connections.healthReports) {
    console.log(`   ✅ Health Reports: ${report.connections.healthReports}`);
  }
  if (report.connections.competitiveReports) {
    console.log(`   ✅ Competitive Reports: ${report.connections.competitiveReports}`);
  }
  console.log('');

  if (report.cleanup.length > 0) {
    console.log('🧹 Cleanup Recommendations:');
    report.cleanup.slice(0, 10).forEach((item, i) => {
      const size = item.size ? ` (${(item.size / 1024).toFixed(2)} KB)` : '';
      console.log(`   ${i + 1}. ${item.type}: ${item.path}${size}`);
    });
    if (report.cleanup.length > 10) {
      console.log(`   ... and ${report.cleanup.length - 10} more`);
    }
    console.log('');
  }

  console.log('='.repeat(60) + '\n');
}

/**
 * Main function
 */
async function main() {
  const report = generateReport();
  printReport(report);

  // Save report to file
  const reportFile = path.join(BASE_DIR, 'improvement-reports', `experiment-report-${Date.now()}.json`);
  const reportsDir = path.dirname(reportFile);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`📄 Report saved: ${reportFile}\n`);

  // Save and push
  const pushed = saveAndPush(report);
  
  if (pushed) {
    console.log('\n✅ All changes saved and pushed!\n');
  } else {
    console.log('\n⚠️  Changes saved locally but not pushed (check git status)\n');
  }

  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default { generateReport, saveAndPush, printReport };

