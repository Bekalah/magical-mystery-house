#!/usr/bin/env node
/**
 * Tool Merger - Merges compatible tools across workspaces
 * 
 * Identifies duplicate tools and creates unified versions
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ToolMerger {
  constructor() {
    this.workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real'
    ];
    this.duplicates = new Map();
    this.merged = [];
  }

  findDuplicates() {
    console.log('🔍 Finding duplicate tools...\n');
    
    const toolMap = new Map();
    
    for (const workspace of this.workspaces) {
      if (!fs.existsSync(workspace)) continue;
      
      const scriptsDir = path.join(workspace, 'scripts');
      const toolsDir = path.join(workspace, 'tools');
      
      this.scanForTools(scriptsDir, toolMap, workspace);
      this.scanForTools(toolsDir, toolMap, workspace);
    }
    
    // Find duplicates
    for (const [name, tools] of toolMap.entries()) {
      if (tools.length > 1) {
        this.duplicates.set(name, tools);
      }
    }
    
    console.log(`✅ Found ${this.duplicates.size} duplicate tool names\n`);
  }

  scanForTools(dir, toolMap, workspace) {
    if (!fs.existsSync(dir)) return;
    
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules') continue;
        
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.scanForTools(fullPath, toolMap, workspace);
        } else if (stat.isFile() && (entry.endsWith('.mjs') || entry.endsWith('.ts') || entry.endsWith('.js'))) {
          if (!toolMap.has(entry)) {
            toolMap.set(entry, []);
          }
          toolMap.get(entry).push({
            name: entry,
            path: fullPath,
            workspace,
            size: stat.size,
            mtime: stat.mtime
          });
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }

  analyzeDuplicates() {
    console.log('📊 Analyzing duplicates...\n');
    
    const analysis = [];
    
    for (const [name, tools] of this.duplicates.entries()) {
      // Find the "best" version (largest, most recent, or in primary workspace)
      const best = this.findBestVersion(tools);
      const others = tools.filter(t => t.path !== best.path);
      
      analysis.push({
        name,
        best,
        others,
        shouldMerge: this.shouldMerge(tools),
        mergeStrategy: this.getMergeStrategy(tools)
      });
    }
    
    return analysis;
  }

  findBestVersion(tools) {
    // Prefer cathedral-master-deployment
    const primary = tools.find(t => t.workspace.includes('master-deployment'));
    if (primary) return primary;
    
    // Prefer largest file
    return tools.reduce((best, current) => 
      current.size > best.size ? current : best
    );
  }

  shouldMerge(tools) {
    // Check if files are significantly different
    const sizes = tools.map(t => t.size);
    const avgSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;
    const variance = sizes.reduce((sum, size) => sum + Math.pow(size - avgSize, 2), 0) / sizes.length;
    
    // If variance is high, files are different - should merge
    return variance > avgSize * 0.1;
  }

  getMergeStrategy(tools) {
    if (tools.length === 2) return 'replace';
    if (tools.length > 2) return 'consolidate';
    return 'keep-all';
  }

  generateMergePlan() {
    console.log('📋 Generating merge plan...\n');
    
    const analysis = this.analyzeDuplicates();
    const plan = {
      timestamp: Date.now(),
      merges: [],
      recommendations: []
    };
    
    for (const item of analysis) {
      if (item.shouldMerge) {
        plan.merges.push({
          tool: item.name,
          keep: item.best.path,
          remove: item.others.map(t => t.path),
          strategy: item.mergeStrategy
        });
      } else {
        plan.recommendations.push({
          tool: item.name,
          action: 'keep-separate',
          reason: 'Files are similar, no merge needed',
          locations: tools.map(t => t.path)
        });
      }
    }
    
    return plan;
  }

  printPlan(plan) {
    console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                          🔄 MERGE PLAN                                      ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log(`📦 MERGES TO PERFORM: ${plan.merges.length}\n`);
    for (const merge of plan.merges.slice(0, 10)) {
      console.log(`   ${merge.tool}`);
      console.log(`      Keep: ${merge.keep}`);
      console.log(`      Remove: ${merge.remove.length} duplicate(s)`);
      console.log(`      Strategy: ${merge.strategy}\n`);
    }
    
    console.log(`💡 RECOMMENDATIONS: ${plan.recommendations.length}\n`);
    for (const rec of plan.recommendations.slice(0, 5)) {
      console.log(`   ${rec.tool}: ${rec.action}`);
      console.log(`      Reason: ${rec.reason}\n`);
    }
    
    console.log('═'.repeat(80) + '\n');
  }
}

async function main() {
  const merger = new ToolMerger();
  
  merger.findDuplicates();
  const plan = merger.generateMergePlan();
  merger.printPlan(plan);
  
  const planPath = path.join(__dirname, '..', 'merge-plan.json');
  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
  console.log(`✅ Merge plan saved to: ${planPath}\n`);
}

main().catch(console.error);

