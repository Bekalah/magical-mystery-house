#!/usr/bin/env node
/**
 * Organize, Debug, Merge, and Push All
 * 
 * Complete workflow:
 * 1. Organize all items and data
 * 2. Debug all issues
 * 3. Merge duplicates
 * 4. Push to GitHub (bekalah)
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

async function runCompleteWorkflow() {
  console.log('🏛️  COMPLETE WORKFLOW: ORGANIZE → DEBUG → MERGE → PUSH\n');
  console.log('═'.repeat(80) + '\n');

  // Step 1: Organize and Merge
  console.log('📋 Step 1: Organizing and Merging All Data...\n');
  try {
    const { default: OrganizeAndMergeAll } = await import('./organize-and-merge-all.mjs');
    const organizer = new OrganizeAndMergeAll();
    await organizer.organizeAndMerge();
  } catch (e) {
    console.log(`   ⚠️  Organization failed: ${e.message}\n`);
  }

  // Step 2: Debug All
  console.log('\n📋 Step 2: Debugging All Issues...\n');
  try {
    const { default: DebugAll } = await import('./debug-all.mjs');
    const debugTool = new DebugAll();
    await debugTool.debugAll();
  } catch (e) {
    console.log(`   ⚠️  Debugging failed: ${e.message}\n`);
  }

  // Step 3: Push to GitHub
  console.log('\n📋 Step 3: Pushing to GitHub (bekalah)...\n');
  try {
    const { default: PushToGitHub } = await import('./push-to-github.mjs');
    const pusher = new PushToGitHub();
    await pusher.pushAll();
  } catch (e) {
    console.log(`   ⚠️  Push failed: ${e.message}\n`);
  }

  console.log('\n' + '═'.repeat(80));
  console.log('\n✅ COMPLETE WORKFLOW FINISHED\n');
  console.log('📄 Reports Generated:');
  console.log('  - ORGANIZATION_REPORT.json');
  console.log('  - DEBUG_REPORT.json');
  console.log('  - GITHUB_PUSH_REPORT.json');
  console.log('');
}

// Run
runCompleteWorkflow().catch(console.error);

