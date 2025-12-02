#!/usr/bin/env node
/**
 * Command Verification System
 * Prevents hallucination by verifying commands exist before suggesting
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class CommandVerifier {
  constructor() {
    this.packageJson = this.loadPackageJson();
    this.availableCommands = Object.keys(this.packageJson.scripts || {});
    this.tools = this.scanTools();
    this.scripts = this.scanScripts();
  }

  loadPackageJson() {
    const pkgPath = path.join(BASE_DIR, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      throw new Error('package.json not found');
    }
    return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  }

  scanTools() {
    const toolsDir = path.join(BASE_DIR, 'tools');
    if (!fs.existsSync(toolsDir)) return [];
    
    return fs.readdirSync(toolsDir)
      .filter(f => (f.endsWith('.mjs') || f.endsWith('.ts')) && !f.includes('.bak'))
      .map(f => f.replace(/\.(mjs|ts)$/, ''));
  }

  scanScripts() {
    const scriptsDir = path.join(BASE_DIR, 'scripts');
    if (!fs.existsSync(scriptsDir)) return [];
    
    return fs.readdirSync(scriptsDir)
      .filter(f => (f.endsWith('.mjs') || f.endsWith('.ts')) && !f.includes('.bak'))
      .map(f => f.replace(/\.(mjs|ts)$/, ''));
  }

  verifyCommand(commandName) {
    // Check if command exists in package.json
    if (this.availableCommands.includes(commandName)) {
      return {
        exists: true,
        type: 'package-json-script',
        command: this.packageJson.scripts[commandName],
        verified: true
      };
    }

    // Check if it's a tool (extract from "node tools/X.mjs")
    const toolMatch = commandName.match(/tools\/([^.\s]+)/);
    if (toolMatch && this.tools.includes(toolMatch[1])) {
      return {
        exists: true,
        type: 'tool',
        path: `tools/${toolMatch[1]}.mjs`,
        verified: true
      };
    }

    // Check if it's a script (extract from "node scripts/X.mjs")
    const scriptMatch = commandName.match(/scripts\/([^.\s]+)/);
    if (scriptMatch && this.scripts.includes(scriptMatch[1])) {
      return {
        exists: true,
        type: 'script',
        path: `scripts/${scriptMatch[1]}.mjs`,
        verified: true
      };
    }

    // Direct tool/script name check
    if (this.tools.includes(commandName)) {
      return {
        exists: true,
        type: 'tool',
        path: `tools/${commandName}.mjs`,
        verified: true
      };
    }

    if (this.scripts.includes(commandName)) {
      return {
        exists: true,
        type: 'script',
        path: `scripts/${commandName}.mjs`,
        verified: true
      };
    }

    return {
      exists: false,
      verified: false,
      suggestion: this.findSimilar(commandName)
    };
  }

  findSimilar(commandName) {
    const all = [...this.availableCommands, ...this.tools, ...this.scripts];
    return all.filter(cmd => 
      cmd.includes(commandName) || commandName.includes(cmd)
    ).slice(0, 3);
  }

  verifyFile(filePath) {
    const fullPath = path.isAbsolute(filePath) 
      ? filePath 
      : path.join(BASE_DIR, filePath);
    
    return {
      exists: fs.existsSync(fullPath),
      path: fullPath,
      verified: fs.existsSync(fullPath)
    };
  }

  verifyPackageCount() {
    const packagesDir = path.join(BASE_DIR, 'packages');
    if (!fs.existsSync(packagesDir)) return { count: 0, verified: true };
    
    const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
    
    return {
      count: packages.length,
      packages: packages,
      verified: true
    };
  }

  generateVerificationReport() {
    return {
      timestamp: new Date().toISOString(),
      commands: {
        total: this.availableCommands.length,
        list: this.availableCommands,
        verified: true
      },
      tools: {
        total: this.tools.length,
        list: this.tools,
        verified: true
      },
      scripts: {
        total: this.scripts.length,
        list: this.scripts,
        verified: true
      },
      packages: this.verifyPackageCount()
    };
  }
}

export default CommandVerifier;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const verifier = new CommandVerifier();
  const report = verifier.generateVerificationReport();
  console.log(JSON.stringify(report, null, 2));
}

