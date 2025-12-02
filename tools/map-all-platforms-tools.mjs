#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Map All Platforms, Tools, Languages & Debug Setup
 * Comprehensive mapping of all packages and apps:
 * - Platform (Node.js, Browser, Godot, etc.)
 * - Tools (build, test, lint, etc.)
 * - Languages (TypeScript, JavaScript, GDScript, etc.)
 * - Debug setup (VS Code, Chrome DevTools, Godot, etc.)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Platform detection
function detectPlatform(packageJson, packagePath) {
  const platforms = [];
  
  // Check for Godot
  if (packageJson.name?.includes('godot') || 
      fs.existsSync(path.join(packagePath, 'project.godot')) ||
      fs.existsSync(path.join(packagePath, 'scenes'))) {
    platforms.push('Godot');
  }
  
  // Check for browser/web
  if (packageJson.dependencies?.vite || 
      packageJson.dependencies?.react ||
      packageJson.dependencies?.['@vitejs/plugin-react'] ||
      packageJson.devDependencies?.vite) {
    platforms.push('Browser');
  }
  
  // Check for Node.js
  if (packageJson.type === 'module' || 
      packageJson.main?.endsWith('.js') ||
      packageJson.main?.endsWith('.mjs') ||
      packageJson.bin ||
      packageJson.scripts?.test?.includes('node')) {
    platforms.push('Node.js');
  }
  
  // Check for TypeScript
  if (packageJson.devDependencies?.typescript ||
      fs.existsSync(path.join(packagePath, 'tsconfig.json'))) {
    platforms.push('TypeScript');
  }
  
  // Default to Node.js if no specific platform
  if (platforms.length === 0) {
    platforms.push('Node.js');
  }
  
  return platforms;
}

// Detect languages
function detectLanguages(packagePath) {
  const languages = [];
  const files = fs.readdirSync(packagePath, { recursive: true, withFileTypes: true });
  
  for (const file of files) {
    if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase();
      switch (ext) {
        case '.ts':
        case '.tsx':
          if (!languages.includes('TypeScript')) languages.push('TypeScript');
          break;
        case '.js':
        case '.mjs':
        case '.jsx':
          if (!languages.includes('JavaScript')) languages.push('JavaScript');
          break;
        case '.gd':
          if (!languages.includes('GDScript')) languages.push('GDScript');
          break;
        case '.gdshader':
          if (!languages.includes('GLSL')) languages.push('GLSL');
          break;
        case '.py':
          if (!languages.includes('Python')) languages.push('Python');
          break;
        case '.rs':
          if (!languages.includes('Rust')) languages.push('Rust');
          break;
        case '.go':
          if (!languages.includes('Go')) languages.push('Go');
          break;
      }
    }
  }
  
  return languages.length > 0 ? languages : ['JavaScript'];
}

// Detect tools
function detectTools(packageJson, packagePath) {
  const tools = {
    build: [],
    test: [],
    lint: [],
    format: [],
    typeCheck: [],
    debug: []
  };
  
  // Build tools
  if (packageJson.scripts?.build) {
    if (packageJson.scripts.build.includes('vite')) tools.build.push('Vite');
    if (packageJson.scripts.build.includes('tsc')) tools.build.push('TypeScript Compiler');
    if (packageJson.scripts.build.includes('esbuild')) tools.build.push('esbuild');
    if (packageJson.scripts.build.includes('webpack')) tools.build.push('Webpack');
    if (packageJson.scripts.build.includes('rollup')) tools.build.push('Rollup');
    if (packageJson.scripts.build.includes('godot')) tools.build.push('Godot');
  }
  
  // Test tools
  if (packageJson.scripts?.test) {
    if (packageJson.scripts.test.includes('vitest')) tools.test.push('Vitest');
    if (packageJson.scripts.test.includes('jest')) tools.test.push('Jest');
    if (packageJson.scripts.test.includes('mocha')) tools.test.push('Mocha');
    if (packageJson.scripts.test.includes('node')) tools.test.push('Node.js');
  }
  if (packageJson.devDependencies?.vitest) tools.test.push('Vitest');
  if (packageJson.devDependencies?.jest) tools.test.push('Jest');
  if (packageJson.devDependencies?.mocha) tools.test.push('Mocha');
  
  // Lint tools
  if (packageJson.scripts?.lint) {
    if (packageJson.scripts.lint.includes('eslint')) tools.lint.push('ESLint');
    if (packageJson.scripts.lint.includes('prettier')) tools.lint.push('Prettier');
  }
  if (packageJson.devDependencies?.eslint) tools.lint.push('ESLint');
  if (packageJson.devDependencies?.prettier) tools.format.push('Prettier');
  
  // Type check
  if (packageJson.scripts?.['type-check'] || packageJson.scripts?.typecheck) {
    tools.typeCheck.push('TypeScript');
  }
  
  // Debug setup
  if (fs.existsSync(path.join(packagePath, '.vscode', 'launch.json'))) {
    tools.debug.push('VS Code');
  }
  if (packageJson.name?.includes('godot')) {
    tools.debug.push('Godot Editor');
  }
  if (packageJson.dependencies?.vite || packageJson.devDependencies?.vite) {
    tools.debug.push('Chrome DevTools');
  }
  if (packageJson.devDependencies?.typescript) {
    tools.debug.push('TypeScript Debugger');
  }
  
  return tools;
}

// Detect debug configuration
function detectDebugConfig(packagePath) {
  const debugConfig = {
    vsCode: null,
    godot: null,
    chrome: null,
    node: null
  };
  
  // VS Code launch.json
  const vsCodeLaunch = path.join(packagePath, '.vscode', 'launch.json');
  if (fs.existsSync(vsCodeLaunch)) {
    try {
      debugConfig.vsCode = JSON.parse(fs.readFileSync(vsCodeLaunch, 'utf-8'));
    } catch (e) {
      debugConfig.vsCode = { error: e.message };
    }
  }
  
  // Godot project.godot
  const godotProject = path.join(packagePath, 'project.godot');
  if (fs.existsSync(godotProject)) {
    debugConfig.godot = { projectFile: 'project.godot' };
  }
  
  // Chrome DevTools (Vite)
  const viteConfig = path.join(packagePath, 'vite.config.ts') || 
                     path.join(packagePath, 'vite.config.js');
  if (fs.existsSync(viteConfig)) {
    debugConfig.chrome = { config: path.basename(viteConfig) };
  }
  
  // Node.js debug
  if (fs.existsSync(path.join(packagePath, 'package.json'))) {
    const pkg = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf-8'));
    if (pkg.scripts?.dev || pkg.scripts?.start) {
      debugConfig.node = { 
        scripts: {
          dev: pkg.scripts.dev,
          start: pkg.scripts.start
        }
      };
    }
  }
  
  return debugConfig;
}

async function mapAllPlatformsTools() {
  console.log('🗺️  Mapping All Platforms, Tools, Languages & Debug Setup...\n');
  
  const packagesDir = path.join(rootDir, 'packages');
  const appsDir = path.join(rootDir, 'apps');
  
  const mapping = {
    timestamp: new Date().toISOString(),
    packages: {},
    apps: {},
    summary: {
      totalPackages: 0,
      totalApps: 0,
      platforms: new Set(),
      languages: new Set(),
      tools: {
        build: new Set(),
        test: new Set(),
        lint: new Set(),
        format: new Set(),
        typeCheck: new Set(),
        debug: new Set()
      }
    }
  };
  
  // Map packages
  if (fs.existsSync(packagesDir)) {
    const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const pkgName of packages) {
      const pkgPath = path.join(packagesDir, pkgName);
      const packageJsonPath = path.join(pkgPath, 'package.json');
      
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          const platforms = detectPlatform(packageJson, pkgPath);
          const languages = detectLanguages(pkgPath);
          const tools = detectTools(packageJson, pkgPath);
          const debugConfig = detectDebugConfig(pkgPath);
          
          mapping.packages[pkgName] = {
            name: packageJson.name || pkgName,
            version: packageJson.version || '0.0.0',
            description: packageJson.description || '',
            platforms: platforms,
            languages: languages,
            tools: tools,
            debug: debugConfig,
            scripts: packageJson.scripts || {},
            dependencies: {
              runtime: Object.keys(packageJson.dependencies || {}).length,
              dev: Object.keys(packageJson.devDependencies || {}).length
            },
            path: pkgPath
          };
          
          // Update summary
          mapping.summary.totalPackages++;
          platforms.forEach(p => mapping.summary.platforms.add(p));
          languages.forEach(l => mapping.summary.languages.add(l));
          Object.keys(tools.build).length > 0 && mapping.summary.tools.build.add(tools.build.join(', '));
          Object.keys(tools.test).length > 0 && mapping.summary.tools.test.add(tools.test.join(', '));
          Object.keys(tools.lint).length > 0 && mapping.summary.tools.lint.add(tools.lint.join(', '));
          Object.keys(tools.format).length > 0 && mapping.summary.tools.format.add(tools.format.join(', '));
          Object.keys(tools.typeCheck).length > 0 && mapping.summary.tools.typeCheck.add(tools.typeCheck.join(', '));
          Object.keys(tools.debug).length > 0 && mapping.summary.tools.debug.add(tools.debug.join(', '));
        } catch (e) {
          console.warn(`⚠️  Error mapping package ${pkgName}: ${e.message}`);
        }
      }
    }
  }
  
  // Map apps
  if (fs.existsSync(appsDir)) {
    const apps = fs.readdirSync(appsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const appName of apps) {
      const appPath = path.join(appsDir, appName);
      const packageJsonPath = path.join(appPath, 'package.json');
      
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
          const platforms = detectPlatform(packageJson, appPath);
          const languages = detectLanguages(appPath);
          const tools = detectTools(packageJson, appPath);
          const debugConfig = detectDebugConfig(appPath);
          
          mapping.apps[appName] = {
            name: packageJson.name || appName,
            version: packageJson.version || '0.0.0',
            description: packageJson.description || '',
            platforms: platforms,
            languages: languages,
            tools: tools,
            debug: debugConfig,
            scripts: packageJson.scripts || {},
            dependencies: {
              runtime: Object.keys(packageJson.dependencies || {}).length,
              dev: Object.keys(packageJson.devDependencies || {}).length
            },
            path: appPath
          };
          
          // Update summary
          mapping.summary.totalApps++;
          platforms.forEach(p => mapping.summary.platforms.add(p));
          languages.forEach(l => mapping.summary.languages.add(l));
          Object.keys(tools.build).length > 0 && mapping.summary.tools.build.add(tools.build.join(', '));
          Object.keys(tools.test).length > 0 && mapping.summary.tools.test.add(tools.test.join(', '));
          Object.keys(tools.lint).length > 0 && mapping.summary.tools.lint.add(tools.lint.join(', '));
          Object.keys(tools.format).length > 0 && mapping.summary.tools.format.add(tools.format.join(', '));
          Object.keys(tools.typeCheck).length > 0 && mapping.summary.tools.typeCheck.add(tools.typeCheck.join(', '));
          Object.keys(tools.debug).length > 0 && mapping.summary.tools.debug.add(tools.debug.join(', '));
        } catch (e) {
          console.warn(`⚠️  Error mapping app ${appName}: ${e.message}`);
        }
      }
    }
  }
  
  // Convert Sets to Arrays for JSON
  mapping.summary.platforms = Array.from(mapping.summary.platforms);
  mapping.summary.languages = Array.from(mapping.summary.languages);
  mapping.summary.tools.build = Array.from(mapping.summary.tools.build);
  mapping.summary.tools.test = Array.from(mapping.summary.tools.test);
  mapping.summary.tools.lint = Array.from(mapping.summary.tools.lint);
  mapping.summary.tools.format = Array.from(mapping.summary.tools.format);
  mapping.summary.tools.typeCheck = Array.from(mapping.summary.tools.typeCheck);
  mapping.summary.tools.debug = Array.from(mapping.summary.tools.debug);
  
  // Save mapping
  const outputPath = path.join(rootDir, 'ALL_PLATFORMS_TOOLS_MAPPING.json');
  fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2), 'utf-8');
  
  // Generate summary report
  console.log(`✅ Platform & Tools Mapping Complete!`);
  console.log(`   Packages: ${mapping.summary.totalPackages}`);
  console.log(`   Apps: ${mapping.summary.totalApps}`);
  console.log(`   Platforms: ${mapping.summary.platforms.join(', ')}`);
  console.log(`   Languages: ${mapping.summary.languages.join(', ')}`);
  console.log(`   Build Tools: ${mapping.summary.tools.build.join(', ') || 'None'}`);
  console.log(`   Test Tools: ${mapping.summary.tools.test.join(', ') || 'None'}`);
  console.log(`   Lint Tools: ${mapping.summary.tools.lint.join(', ') || 'None'}`);
  console.log(`   Format Tools: ${mapping.summary.tools.format.join(', ') || 'None'}`);
  console.log(`   Type Check: ${mapping.summary.tools.typeCheck.join(', ') || 'None'}`);
  console.log(`   Debug Tools: ${mapping.summary.tools.debug.join(', ') || 'None'}`);
  console.log(`   Saved to: ${outputPath}`);
  
  return mapping;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  mapAllPlatformsTools().catch(console.error);
}

export default mapAllPlatformsTools;

