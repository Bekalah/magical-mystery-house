#!/usr/bin/env ts-node
/**
 * Accessible Codex CLI
 * 
 * A simple, friendly command-line interface for exploring the Codex 144:99
 * Designed for accessibility, trauma-safety, and playfulness
 * 
 * Usage:
 *   pnpm codex explore 42
 *   pnpm codex search --element Fire
 *   pnpm codex random
 *   pnpm codex history
 */

import { codexEngine, CodexNode, CodexExploration } from './functional-codex-engine';

/**
 * ⚗️ PrintNode - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
function printNode(node: CodexNode, detailed = false): void {
  console.log('\n' + '='.repeat(60));
  console.log(`  Node ${node.id}: ${node.name}`);
  console.log('='.repeat(60));
  
  console.log(`\n  Element: ${node.element}`);
  if (node.planet) console.log(`  Planet: ${node.planet}`);
  if (node.zodiac) console.log(`  Zodiac: ${node.zodiac}`);
  if (node.chakra) console.log(`  Chakra: ${node.chakra}`);
  if (node.color) console.log(`  Color: ${node.color}`);
  if (node.geometry) console.log(`  Geometry: ${node.geometry}`);
  if (node.solfeggio) console.log(`  Solfeggio Frequency: ${node.solfeggio} Hz`);
  
  if (detailed && node.narrative) {
    console.log(`\n  Theme: ${node.narrative.theme}`);
    console.log(`  Archetype: ${node.narrative.archetype}`);
    console.log(`  Dialogue Style: ${node.narrative.dialogueStyle}`);
    console.log(`  Keywords: ${node.narrative.keywords.join(', ')}`);
    
    if (node.narrative.storyBeats) {
      console.log(`\n  Story Beats:`);
      node.narrative.storyBeats.forEach((beat, i) => {
        console.log(`    ${i + 1}. ${beat}`);
      });
    }
  }
  
  if (detailed && node.gameDesign) {
    console.log(`\n  Game Design:`);
    console.log(`    Ability Type: ${node.gameDesign.abilityType}`);
    console.log(`    Mechanics: ${node.gameDesign.mechanics.join(', ')}`);
    console.log(`    Quest Type: ${node.gameDesign.questType}`);
    console.log(`    Rewards: ${node.gameDesign.rewardStyle}`);
  }
  
  console.log('');
}

/**
 * ⚗️ PrintExploration - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
function printExploration(exploration: CodexExploration): void {
  printNode(exploration.currentNode, true);
  
  console.log('  Connected Nodes:');
  console.log(`    Harmonic (resonant): ${exploration.connections.harmonic.length}`);
  exploration.connections.harmonic.slice(0, 3).forEach(n => {
    console.log(`      - Node ${n.id}: ${n.name} (${n.element})`);
  });
  
  if (exploration.connections.dissonant.length > 0) {
    console.log(`    Dissonant (tension): ${exploration.connections.dissonant.length}`);
    exploration.connections.dissonant.slice(0, 2).forEach(n => {
      console.log(`      - Node ${n.id}: ${n.name} (${n.element})`);
    });
  }
  
  console.log(`\n  Suggestions:`);
  console.log(`    Explore these nodes next:`);
  exploration.suggestions.explore.slice(0, 3).forEach(n => {
    console.log(`      - Node ${n.id}: ${n.name}`);
  });
  
  console.log(`\n    Creative actions:`);
  exploration.suggestions.create.forEach(action => {
    console.log(`      - ${action}`);
  });
  
  console.log(`\n    Learning paths:`);
  exploration.suggestions.learn.forEach(path => {
    console.log(`      - ${path}`);
  });
  
  console.log('');
}

/**
 * ⚗️ Main - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command) {
    console.log(`
🏛️  Codex 144:99 - Accessible Explorer

Usage:
  pnpm codex explore <node-id>     Explore a specific node (1-144)
  pnpm codex search --element <el>  Search by element (Fire, Water, Air, Earth)
  pnpm codex search --chakra <ch>   Search by chakra
  pnpm codex search --geometry <g>  Search by geometry
  pnpm codex random                 Get a random node to explore
  pnpm codex history                Show your exploration history
  pnpm codex clear                  Clear exploration history

Examples:
  pnpm codex explore 42
  pnpm codex search --element Fire
  pnpm codex random
    `);
    return;
  }
  
  try {
    switch (command) {
      case 'explore': {
        const nodeId = parseInt(args[1]);
        if (!nodeId || nodeId < 1 || nodeId > 144) {
          console.log('❌ Please provide a node ID between 1 and 144');
          return;
        }
        const exploration = codexEngine.exploreNode(nodeId);
        printExploration(exploration);
        break;
      }
      
      case 'search': {
        const query: any = {};
        for (let i = 1; i < args.length; i += 2) {
          const key = args[i]?.replace('--', '');
          const value = args[i + 1];
          if (key && value) {
            query[key] = value;
          }
        }
        const results = codexEngine.searchNodes(query);
        console.log(`\n  Found ${results.length} nodes:\n`);
        results.forEach(node => {
          printNode(node);
        });
        break;
      }
      
      case 'random': {
        const node = codexEngine.getRandomNode();
        console.log('\n  🎲 Random Node Discovery:\n');
        printNode(node, true);
        console.log('  💡 Tip: Run "pnpm codex explore ' + node.id + '" to explore connections!');
        break;
      }
      
      case 'history': {
        const history = codexEngine.getHistory();
        if (history.length === 0) {
          console.log('\n  No exploration history yet. Try exploring a node!');
          return;
        }
        console.log(`\n  Your Exploration History (${history.length} nodes):\n`);
        history.forEach(node => {
          console.log(`    Node ${node.id}: ${node.name} (${node.element})`);
        });
        break;
      }
      
      case 'clear': {
        codexEngine.clearHistory();
        console.log('\n  ✅ Exploration history cleared!\n');
        break;
      }
      
      default:
        console.log(`❌ Unknown command: ${command}`);
        console.log('Run "pnpm codex" for help');
    }
  } catch (error: any) {
    console.log(`\n❌ Error: ${error.message}\n`);
  }
}

if (require.main === module) {
  main();
}

