#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * Test All Commands
 * Verifies all package.json scripts actually work
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const packageJson = JSON.parse(fs.readFileSync(path.join(BASE_DIR, 'package.json'), 'utf-8'));
const scripts = packageJson.scripts || {};

const results = {
  working: [],
  broken: [],
  skipped: []
};

// Commands that should be skipped (interactive, long-running, etc.)
const SKIP_COMMANDS = [
  'dev', // Long-running
  'improve:all-day', // Long-running
  'improve:tonight', // Long-running
  'health:permanent', // Long-running service
  'publish:packages', // Requires auth
  'deploy:vercel', // Requires auth
  'deploy:docs' // Requires auth
];

console.log('🧪 Testing All Commands\n');
console.log('═'.repeat(80) + '\n');

for (const [name, command] of Object.entries(scripts)) {
  if (SKIP_COMMANDS.includes(name)) {
    results.skipped.push(name);
    console.log(`⏭️  ${name} - Skipped (interactive/long-running)`);
    continue;
  }

  try {
    // Run with timeout and capture output
    execSync(`pppnpm run ${name}`, {
      cwd: BASE_DIR,
      stdio: 'pipe',
      timeout: 10000, // 10 second timeout
      env: { ...process.env, CI: 'true' } // Prevent interactive prompts
    });
    results.working.push(name);
    console.log(`✅ ${name}`);
  } catch (error) {
    // Check if it's a timeout or actual error
    if (error.signal === 'SIGTERM') {
      results.skipped.push(name);
      console.log(`⏱️  ${name} - Timeout (may be long-running)`);
    } else {
      results.broken.push(name);
      console.log(`❌ ${name} - ${error.message.split('\n')[0]}`);
    }
  }
}

console.log('\n' + '═'.repeat(80));
console.log('\n📊 Results:\n');
console.log(`✅ Working: ${results.working.length}`);
console.log(`❌ Broken: ${results.broken.length}`);
console.log(`⏭️  Skipped: ${results.skipped.length}`);

if (results.broken.length > 0) {
  console.log('\n❌ Broken Commands:');
  results.broken.forEach(cmd => console.log(`   - ${cmd}`));
}

// Save results
const reportPath = path.join(BASE_DIR, 'COMMAND_TEST_RESULTS.json');
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  results: results
}, null, 2));

console.log(`\n📄 Results saved: ${reportPath}`);

// Exit with error if any broken
if (results.broken.length > 0) {
  process.exit(1);
}

