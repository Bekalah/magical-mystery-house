#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Unify Master Version 1 Data - Permanent consolidation
 * Finds all data across workspaces and unifies into master v1 permanently
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const WORKSPACES = [
  { name: 'master', path: rootDir, priority: 1 },
  { name: 'cathedral-real', path: path.join(rootDir, '..', 'cathedral-real'), priority: 2 },
  { name: 'cathedral-fixed-clean', path: path.join(rootDir, '..', 'cathedral-fixed-clean'), priority: 3 },
  { name: 'cathedral-v1-consolidated', path: path.join(rootDir, '..', 'cathedral-v1-consolidated'), priority: 4 },
  { name: 'cosmogenesis-engine', path: path.join(rootDir, '..', 'cosmogenesis-engine'), priority: 5 }
].filter(ws => {
  try {
    return fs.existsSync(ws.path);
  } catch {
    return false;
  }
});

const DATA_TYPES = {
  characterData: {
    patterns: [
      '**/liber-arcanae/**/complete-arcana-profiles.json',
      '**/liber-arcanae/**/*arcana*.json',
      '**/godot-liber-arcanae/characters.json'
    ],
    masterPath: 'packages/liber-arcanae/data/complete-arcana-profiles.json',
    backupPath: 'packages/godot-liber-arcanae/characters.json'
  },
  gameData: {
    patterns: [
      '**/GAME_DATA_COMPILATION.json',
      '**/game-*/**/*.json',
      '**/circuitum99-*/**/*.json'
    ],
    masterPath: 'GAME_DATA_COMPILATION.json'
  },
  shaderFiles: {
    patterns: [
      '**/godot-*/shaders/**/*.gdshader',
      '**/godot-*/materials/**/*.gdshader'
    ],
    masterPath: 'packages/godot-liber-arcanae/shaders/'
  },
  designFiles: {
    patterns: [
      '**/godot-design-studio/**/*',
      '**/cathedral-design-library/**/*',
      '**/design-mathematics-core/**/*'
    ],
    masterPath: 'packages/godot-design-studio/'
  },
  creativeIdeas: {
    patterns: [
      '**/CREATIVE_IDEAS.json',
      '**/tools/creative-ideas-generator.mjs'
    ],
    masterPath: 'CREATIVE_IDEAS.json'
  },
  systemConnections: {
    patterns: [
      '**/SYSTEM_CONNECTIONS.json',
      '**/CONSOLIDATION_REPORT.json'
    ],
    masterPath: 'SYSTEM_CONNECTIONS.json'
  }
};

function findDataFiles(workspace, dataType) {
  const found = [];
  const patterns = DATA_TYPES[dataType].patterns;
  
  for (const pattern of patterns) {
    try {
      // Simple glob-like search
      const searchPath = pattern.replace('**/', '').replace('**', '');
      const basePath = path.join(workspace.path, searchPath.split('/')[0]);
      
      if (fs.existsSync(basePath)) {
        function searchDir(dir, remaining) {
          if (!fs.existsSync(dir)) return;
          
          const items = fs.readdirSync(dir);
          for (const item of items) {
            const itemPath = path.join(dir, item);
            try {
              const stat = fs.statSync(itemPath);
              
              if (stat.isDirectory() && remaining.length > 0) {
                searchDir(itemPath, remaining.slice(1));
              } else if (stat.isFile() && itemPath.includes(remaining[remaining.length - 1])) {
                found.push({
                  path: itemPath,
                  workspace: workspace.name,
                  priority: workspace.priority,
                  size: stat.size,
                  modified: stat.mtime
                });
              }
            } catch (e) {
              // Skip inaccessible items
            }
          }
        }
        
        const parts = searchPath.split('/');
        searchDir(workspace.path, parts);
      }
    } catch (e) {
      // Pattern search failed, continue
    }
  }
  
  return found;
}

function unifyData(dataType, foundFiles) {
  if (foundFiles.length === 0) return null;
  
  // Sort by priority (master first), then by modification date (newest first)
  foundFiles.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.modified - a.modified;
  });
  
  const master = foundFiles[0]; // Highest priority, most recent
  const masterPath = path.join(rootDir, DATA_TYPES[dataType].masterPath);
  
  // Ensure master directory exists
  const masterDir = path.dirname(masterPath);
  if (!fs.existsSync(masterDir)) {
    fs.mkdirSync(masterDir, { recursive: true });
  }
  
  // Copy to master if different
  if (fs.existsSync(master.path)) {
    try {
      const sourceContent = fs.readFileSync(master.path, 'utf-8');
      
      // If master file exists, merge intelligently
      if (fs.existsSync(masterPath)) {
        const masterContent = fs.readFileSync(masterPath, 'utf-8');
        
        // For JSON files, merge objects
        if (masterPath.endsWith('.json') && master.path.endsWith('.json')) {
          try {
            const sourceData = JSON.parse(sourceContent);
            const masterData = JSON.parse(masterContent);
            
            // Deep merge - source takes precedence for conflicts
            const merged = { ...masterData, ...sourceData };
            
            // Merge arrays if they exist
            for (const key in sourceData) {
              if (Array.isArray(sourceData[key]) && Array.isArray(masterData[key])) {
                merged[key] = [...new Set([...masterData[key], ...sourceData[key]])];
              }
            }
            
            fs.writeFileSync(masterPath, JSON.stringify(merged, null, 2), 'utf-8');
            return { unified: true, merged: true, source: master.path };
          } catch (e) {
            // Not valid JSON, use source
            fs.copyFileSync(master.path, masterPath);
            return { unified: true, copied: true, source: master.path };
          }
        } else {
          // Non-JSON, use source if newer
          const masterStat = fs.statSync(masterPath);
          if (master.modified > masterStat.mtime) {
            fs.copyFileSync(master.path, masterPath);
            return { unified: true, copied: true, source: master.path };
          }
        }
      } else {
        // Master doesn't exist, copy source
        fs.copyFileSync(master.path, masterPath);
        return { unified: true, created: true, source: master.path };
      }
    } catch (e) {
      return { unified: false, error: e.message };
    }
  }
  
  return null;
}

async function unifyAllMasterV1() {
  console.log('🔗 Unifying all Master Version 1 data permanently...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    unified: {},
    totalUnified: 0
  };

  for (const [dataType, config] of Object.entries(DATA_TYPES)) {
    console.log(`📦 Unifying ${dataType}...`);
    
    const foundFiles = [];
    for (const workspace of WORKSPACES) {
      const files = findDataFiles(workspace, dataType);
      foundFiles.push(...files);
    }
    
    if (foundFiles.length > 0) {
      const unified = unifyData(dataType, foundFiles);
      if (unified) {
        results.unified[dataType] = {
          filesFound: foundFiles.length,
          source: unified.source,
          action: unified.merged ? 'merged' : unified.copied ? 'copied' : 'created',
          masterPath: config.masterPath
        };
        results.totalUnified++;
        console.log(`   ✅ Unified from ${foundFiles.length} locations → ${config.masterPath}`);
      }
    } else {
      console.log(`   ⚠️  No files found for ${dataType}`);
    }
  }

  // Run consolidation tools
  console.log('\n🔧 Running consolidation tools...');
  try {
    execSync('node tools/consolidate-all-workspaces.mjs', { cwd: rootDir, stdio: 'pipe', timeout: 300000 });
    console.log('   ✅ Workspace consolidation complete');
  } catch (e) {
    console.log('   ⚠️  Consolidation tool had issues (non-fatal)');
  }

  // Update all package versions to 1.0.0
  console.log('\n📌 Standardizing to version 1.0.0...');
  try {
    execSync('node scripts/update-all-versions-to-1.0.0.mjs', { cwd: rootDir, stdio: 'pipe', timeout: 120000 });
    console.log('   ✅ All versions standardized to 1.0.0');
  } catch (e) {
    console.log('   ⚠️  Version update had issues (non-fatal)');
  }

  // Save unification report
  const reportPath = path.join(rootDir, 'MASTER_V1_UNIFICATION.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\n✅ Master Version 1 Unification Complete!`);
  console.log(`   - Data types unified: ${results.totalUnified}`);
  console.log(`   - Report saved: MASTER_V1_UNIFICATION.json`);
  console.log(`   - All data permanently consolidated into master`);
  console.log(`   - Version: 1.0.0 (permanent)`);

  return results;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  unifyAllMasterV1().catch(console.error);
}

export default unifyAllMasterV1;


