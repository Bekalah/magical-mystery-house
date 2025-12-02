/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node
/**
 * Compile all game data, design studio, tools, and chapels/mystery rooms
 * for integration into the improvement experiment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const GAME_DATA_OUTPUT = path.join(rootDir, 'GAME_DATA_COMPILATION.json');

async function compileGameData() {
  const compilation = {
    timestamp: new Date().toISOString(),
    gamePackages: [],
    designStudio: null,
    tools: [],
    chapels: null,
    mysteryRooms: null,
    godotGames: [],
    characterData: null,
    integration: {
      experimentIntegration: true,
      improvementTargets: []
    }
  };

  // 1. Compile Game Packages
  const gamePackages = [
    'game-world',
    'game-engine',
    'game-design-core',
    'game-mathematics-core',
    'circuit-craft-creative-game',
    'circuitum99-arcanae-cyoa',
    'gem-tower-engine',
    'cathedral-rpg-inventory-system'
  ];

  for (const pkgName of gamePackages) {
    const pkgPath = path.join(rootDir, 'packages', pkgName);
    if (fs.existsSync(pkgPath)) {
      const packageJson = path.join(pkgPath, 'package.json');
      if (fs.existsSync(packageJson)) {
        const pkgData = JSON.parse(fs.readFileSync(packageJson, 'utf-8'));
        const srcFiles = findSourceFiles(pkgPath);
        
        compilation.gamePackages.push({
          name: pkgName,
          path: pkgPath,
          package: pkgData,
          sourceFiles: srcFiles,
          hasTests: fs.existsSync(path.join(pkgPath, '__tests__')),
          hasDocs: fs.existsSync(path.join(pkgPath, 'docs')),
          needsImprovement: !pkgData.consolidated || !pkgData.description || !fs.existsSync(path.join(pkgPath, 'README.md'))
        });
      }
    }
  }

  // 2. Compile Design Studio
  const designStudioPath = path.join(rootDir, 'packages', 'godot-design-studio');
  if (fs.existsSync(designStudioPath)) {
    const packageJson = path.join(designStudioPath, 'package.json');
    if (fs.existsSync(packageJson)) {
      const pkgData = JSON.parse(fs.readFileSync(packageJson, 'utf-8'));
      const scenes = findFiles(designStudioPath, '.tscn');
      const scripts = findFiles(designStudioPath, '.gd');
      const tools = findFiles(designStudioPath, '.mjs', 'tools');
      
      compilation.designStudio = {
        name: 'godot-design-studio',
        path: designStudioPath,
        package: pkgData,
        scenes: scenes.length,
        scripts: scripts.length,
        tools: tools.length,
        files: {
          scenes,
          scripts,
          tools
        },
        needsImprovement: !pkgData.consolidated || !fs.existsSync(path.join(designStudioPath, 'README.md'))
      };
    }
  }

  // 3. Compile Tools
  const toolsPath = path.join(rootDir, 'tools');
  if (fs.existsSync(toolsPath)) {
    const toolFiles = fs.readdirSync(toolsPath)
      .filter(f => f.endsWith('.mjs') || f.endsWith('.js'))
      .map(f => ({
        name: f,
        path: path.join(toolsPath, f),
        size: fs.statSync(path.join(toolsPath, f)).size,
        needsImprovement: false // Will be determined by experiment
      }));
    
    compilation.tools = toolFiles;
  }

  // 4. Compile Chapels (Stone Grimoire)
  const stoneGrimoirePath = path.join(rootDir, 'packages', 'stone-grimoire');
  if (fs.existsSync(stoneGrimoirePath)) {
    const chapelsFile = path.join(stoneGrimoirePath, 'src', 'chapels.ts');
    if (fs.existsSync(chapelsFile)) {
      const content = fs.readFileSync(chapelsFile, 'utf-8');
      const chapelCount = (content.match(/export interface Chapel/g) || []).length;
      const chapelData = extractChapelData(content);
      
      compilation.chapels = {
        name: 'stone-grimoire-chapels',
        path: chapelsFile,
        count: chapelCount,
        data: chapelData,
        needsImprovement: chapelCount < 8 || !chapelData || chapelData.length < 8
      };
    }
  }

  // 5. Compile Mystery Rooms
  const mysteryHousePath = path.join(rootDir, 'packages', 'mystery-house-core');
  if (fs.existsSync(mysteryHousePath)) {
    const srcPath = path.join(mysteryHousePath, 'src');
    const files = findSourceFiles(mysteryHousePath);
    const packageJson = path.join(mysteryHousePath, 'package.json');
    const pkgData = fs.existsSync(packageJson) ? JSON.parse(fs.readFileSync(packageJson, 'utf-8')) : null;
    
    compilation.mysteryRooms = {
      name: 'mystery-house-core',
      path: mysteryHousePath,
      package: pkgData,
      sourceFiles: files,
      needsImprovement: !pkgData || !pkgData.description || !fs.existsSync(path.join(mysteryHousePath, 'README.md'))
    };
  }

  // 6. Compile Godot Games
  const godotGames = [
    'godot-liber-arcanae',
    'godot-codex-14499',
    'godot-vfx-library'
  ];

  for (const gameName of godotGames) {
    const gamePath = path.join(rootDir, 'packages', gameName);
    if (fs.existsSync(gamePath)) {
      const scenes = findFiles(gamePath, '.tscn');
      const scripts = findFiles(gamePath, '.gd');
      const packageJson = path.join(gamePath, 'package.json');
      const pkgData = fs.existsSync(packageJson) ? JSON.parse(fs.readFileSync(packageJson, 'utf-8')) : null;
      
      compilation.godotGames.push({
        name: gameName,
        path: gamePath,
        package: pkgData,
        scenes: scenes.length,
        scripts: scripts.length,
        files: { scenes, scripts },
        needsImprovement: !pkgData || !pkgData.description || !fs.existsSync(path.join(gamePath, 'README.md'))
      });
    }
  }

  // 7. Compile Character Data
  const liberArcanaePath = path.join(rootDir, 'packages', 'liber-arcanae');
  const charactersFile = path.join(liberArcanaePath, 'data', 'complete-arcana-profiles.json');
  if (fs.existsSync(charactersFile)) {
    const charData = JSON.parse(fs.readFileSync(charactersFile, 'utf-8'));
    const godotGamePath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'characters.json');
    
    compilation.characterData = {
      source: charactersFile,
      godotGame: fs.existsSync(godotGamePath) ? godotGamePath : null,
      arcanaCount: Object.keys(charData.rebecca_respawns_arcanae_compendium?.major_arcana_complete_details || {}).length,
      needsImprovement: !fs.existsSync(godotGamePath) || Object.keys(charData.rebecca_respawns_arcanae_compendium?.major_arcana_complete_details || {}).length < 22
    };
  }

  // 8. Generate Improvement Targets
  compilation.integration.improvementTargets = generateImprovementTargets(compilation);

  // Save compilation
  fs.writeFileSync(GAME_DATA_OUTPUT, JSON.stringify(compilation, null, 2), 'utf-8');
  
  console.log('✅ Game data compilation complete!');
  console.log(`   - Game packages: ${compilation.gamePackages.length}`);
  console.log(`   - Design studio: ${compilation.designStudio ? 'found' : 'not found'}`);
  console.log(`   - Tools: ${compilation.tools.length}`);
  console.log(`   - Chapels: ${compilation.chapels ? compilation.chapels.count : 0}`);
  console.log(`   - Mystery rooms: ${compilation.mysteryRooms ? 'found' : 'not found'}`);
  console.log(`   - Godot games: ${compilation.godotGames.length}`);
  console.log(`   - Improvement targets: ${compilation.integration.improvementTargets.length}`);
  console.log(`\n📄 Saved to: ${GAME_DATA_OUTPUT}`);

  return compilation;
}

function findSourceFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findSourceFiles(fullPath));
    } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.js'))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function findFiles(dir, ext, subdir = '') {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const searchDir = subdir ? path.join(dir, subdir) : dir;
  if (!fs.existsSync(searchDir)) return files;
  
  const items = fs.readdirSync(searchDir);
  for (const item of items) {
    const fullPath = path.join(searchDir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.')) {
      files.push(...findFiles(fullPath, ext));
    } else if (stat.isFile() && item.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function extractChapelData(content) {
  // Extract chapel interface data
  const chapels = [];
  const chapelMatches = content.matchAll(/export (?:const|interface|type) (\w+).*?\{[\s\S]*?\}/g);
  
  for (const match of chapelMatches) {
    if (match[1].toLowerCase().includes('chapel')) {
      chapels.push({
        name: match[1],
        definition: match[0].substring(0, 200)
      });
    }
  }
  
  return chapels;
}

function generateImprovementTargets(compilation) {
  const targets = [];
  
  // Game packages
  for (const pkg of compilation.gamePackages) {
    if (pkg.needsImprovement) {
      targets.push({
        type: 'game-package',
        name: pkg.name,
        path: pkg.path,
        issues: [
          !pkg.package.consolidated && 'Not consolidated',
          !pkg.package.description && 'Missing description',
          !pkg.hasDocs && 'Missing documentation',
          !pkg.hasTests && 'Missing tests'
        ].filter(Boolean),
        priority: 'high'
      });
    }
  }
  
  // Design Studio
  if (compilation.designStudio && compilation.designStudio.needsImprovement) {
    targets.push({
      type: 'design-studio',
      name: compilation.designStudio.name,
      path: compilation.designStudio.path,
      issues: [
        !compilation.designStudio.package.consolidated && 'Not consolidated',
        !fs.existsSync(path.join(compilation.designStudio.path, 'README.md')) && 'Missing README'
      ].filter(Boolean),
      priority: 'high'
    });
  }
  
  // Chapels
  if (compilation.chapels && compilation.chapels.needsImprovement) {
    targets.push({
      type: 'chapels',
      name: 'stone-grimoire-chapels',
      path: compilation.chapels.path,
      issues: [
        compilation.chapels.count < 8 && `Only ${compilation.chapels.count} chapels found (need 8)`,
        !compilation.chapels.data && 'Missing chapel data'
      ].filter(Boolean),
      priority: 'medium'
    });
  }
  
  // Mystery Rooms
  if (compilation.mysteryRooms && compilation.mysteryRooms.needsImprovement) {
    targets.push({
      type: 'mystery-rooms',
      name: compilation.mysteryRooms.name,
      path: compilation.mysteryRooms.path,
      issues: [
        !compilation.mysteryRooms.package && 'Missing package.json',
        !compilation.mysteryRooms.package?.description && 'Missing description',
        !fs.existsSync(path.join(compilation.mysteryRooms.path, 'README.md')) && 'Missing README'
      ].filter(Boolean),
      priority: 'high'
    });
  }
  
  // Godot Games
  for (const game of compilation.godotGames) {
    if (game.needsImprovement) {
      targets.push({
        type: 'godot-game',
        name: game.name,
        path: game.path,
        issues: [
          !game.package && 'Missing package.json',
          !game.package?.description && 'Missing description',
          !fs.existsSync(path.join(game.path, 'README.md')) && 'Missing README'
        ].filter(Boolean),
        priority: 'medium'
      });
    }
  }
  
  // Character Data
  if (compilation.characterData && compilation.characterData.needsImprovement) {
    targets.push({
      type: 'character-data',
      name: 'liber-arcanae-characters',
      path: compilation.characterData.source,
      issues: [
        !compilation.characterData.godotGame && 'Missing Godot game integration',
        compilation.characterData.arcanaCount < 22 && `Only ${compilation.characterData.arcanaCount} arcana found (need 22)`
      ].filter(Boolean),
      priority: 'high'
    });
  }
  
  return targets;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  compileGameData().catch(console.error);
}

export default compileGameData;

