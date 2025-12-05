#!/usr/bin/env node
/**
 * Cathedral Unified CLI
 * Single entry point for all alchemy tech, magnum opus, codex, pipeline
 * 
 * Usage:
 *   pnpm cathedral                    # Interactive menu
 *   pnpm cathedral alchemy            # Alchemy engine
 *   pnpm cathedral magnum-opus       # Magnum opus tools
 *   pnpm cathedral codex explore 42  # Codex exploration
 *   pnpm cathedral pipeline           # Improvement pipeline
 *   pnpm cathedral deploy --auto     # Auto-deploy to free platform
 * 
 * @license CC0-1.0 - Public Domain
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const COMMANDS = {
  alchemy: {
    description: '🧪 Alchemy Engine - 72 angels, zodiac, decans, style merging',
    script: 'packages/shared/alchemy-engine.js',
    web: true,
    examples: [
      'cathedral alchemy',
      'cathedral alchemy --web'
    ]
  },
  'magnum-opus': {
    description: '⊙ Magnum Opus - Sacred mathematics, creative expression',
    script: 'packages/magnum-opus/src/index.ts',
    cli: true,
    examples: [
      'cathedral magnum-opus',
      'cathedral magnum-opus --help'
    ]
  },
  codex: {
    description: '📜 Codex 144:99 - Explore nodes, elements, connections',
    script: 'packages/codex-144-99/src/accessible-cli.ts',
    cli: true,
    examples: [
      'cathedral codex explore 42',
      'cathedral codex search --element Fire',
      'cathedral codex random'
    ]
  },
  pipeline: {
    description: '🔄 Improvement Pipeline - Audits, fixes, completion',
    script: 'scripts/10-hour-improvement-experiment.ts',
    cli: true,
    examples: [
      'cathedral pipeline --cycles 300',
      'cathedral pipeline --status'
    ]
  },
  research: {
    description: '🔬 Research Tools - Study deployments, analyze systems',
    script: 'tools/study-and-setup-free-deployments.mjs',
    cli: true,
    examples: [
      'cathedral research',
      'cathedral research --analyze'
    ]
  },
  deploy: {
    description: '🚀 Deploy to Free Platforms - Vercel, Netlify, GitHub Pages',
    script: 'tools/study-and-setup-free-deployments.mjs',
    cli: true,
    examples: [
      'cathedral deploy --auto',
      'cathedral deploy --platform vercel',
      'cathedral deploy --platform github'
    ]
  }
};

function log(message) {
  console.log(message);
}

function error(message) {
  console.error(`❌ ${message}`);
}

function success(message) {
  console.log(`✅ ${message}`);
}

function info(message) {
  console.log(`ℹ️  ${message}`);
}

function showHelp() {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('🏛️  Cathedral Unified CLI');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  log('Available Commands:\n');
  
  for (const [cmd, config] of Object.entries(COMMANDS)) {
    log(`  ${cmd.padEnd(15)} ${config.description}`);
    if (config.examples) {
      config.examples.forEach(ex => {
        log(`    ${ex}`);
      });
    }
    log('');
  }
  
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  log('For more info: pnpm cathedral <command> --help\n');
}

function showInteractiveMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('🏛️  Cathedral Unified CLI - Interactive Menu');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const options = Object.keys(COMMANDS).map((cmd, i) => {
    return `${i + 1}. ${cmd} - ${COMMANDS[cmd].description}`;
  });
  
  options.push(`${options.length + 1}. help - Show detailed help`);
  options.push(`${options.length + 1}. exit - Exit CLI`);
  
  options.forEach(opt => log(`  ${opt}`));
  log('');
  
  rl.question('Choose an option (number or command name): ', (answer) => {
    rl.close();
    
    const num = parseInt(answer);
    if (!isNaN(num) && num > 0 && num <= Object.keys(COMMANDS).length) {
      const cmd = Object.keys(COMMANDS)[num - 1];
      runCommand(cmd, process.argv.slice(3));
    } else if (answer.toLowerCase() === 'help' || answer === '?') {
      showHelp();
      showInteractiveMenu();
    } else if (answer.toLowerCase() === 'exit' || answer === 'q') {
      log('\n👋 Goodbye!\n');
      process.exit(0);
    } else if (COMMANDS[answer]) {
      runCommand(answer, process.argv.slice(3));
    } else {
      error(`Unknown option: ${answer}`);
      log('Type a number, command name, or "help"\n');
      showInteractiveMenu();
    }
  });
}

function runCommand(command, args = []) {
  const config = COMMANDS[command];
  
  if (!config) {
    error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
  }
  
  const scriptPath = path.join(ROOT, config.script);
  
  if (!fs.existsSync(scriptPath)) {
    error(`Script not found: ${scriptPath}`);
    info(`Expected: ${config.script}`);
    process.exit(1);
  }
  
  log(`\n🚀 Running: ${command}`);
  log(`   ${config.description}\n`);
  
  // Determine how to run the script
  let executable, scriptArgs;
  
  if (scriptPath.endsWith('.ts')) {
    // TypeScript - use tsx
    executable = 'npx';
    scriptArgs = ['--yes', 'tsx', scriptPath, ...args];
  } else if (scriptPath.endsWith('.mjs') || scriptPath.endsWith('.js')) {
    // JavaScript - use node
    executable = 'node';
    scriptArgs = [scriptPath, ...args];
  } else {
    error(`Unknown script type: ${scriptPath}`);
    process.exit(1);
  }
  
  // Run the script
  const proc = spawn(executable, scriptArgs, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: false
  });
  
  proc.on('error', (err) => {
    error(`Failed to run: ${err.message}`);
    process.exit(1);
  });
  
  proc.on('exit', (code) => {
    if (code !== 0) {
      error(`Command exited with code: ${code}`);
      process.exit(code || 1);
    }
  });
}

// Main entry point
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

if (command === '--interactive' || command === '-i' || !COMMANDS[command]) {
  showInteractiveMenu();
} else {
  runCommand(command, args.slice(1));
}

