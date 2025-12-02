/**
 * cli
 * 
 * @package @cathedral/codex-144-99
 */
#!/usr/bin/env node

/**
 * Codex 144:99 Library System CLI
 * Command-line interface for interacting with the sacred knowledge library
 */

import { CodexLibrary } from './CodexLibrary';
import { CodexValidator } from './validation';

const library = new CodexLibrary();
const validator = new CodexValidator();

function showHelp() {
// console.log(`
📚 Codex 144:99 Library System CLI

Usage: codex-library <command> [options]

Commands:
  validate          Validate all Codex datasets
  search <query>    Search research sources
  node <id>         Show specific Codex node details
  nodes             List all Codex nodes
  elements          Show nodes by element
  chakras           Show nodes by chakra
  report            Generate comprehensive report
  help              Show this help

Examples:
  codex-library validate
  codex-library search "sacred geometry"
  codex-library node 1
  codex-library elements fire
  codex-library chakras crown

For more information, visit: https://github.com/Bekalah/cathedral
  `);
}

async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'validate':
// console.log('🔍 Validating Codex 144:99 datasets...');
      const validation = validator.validateCompleteDataset();
// console.log(validator.generateValidationReport(validation));
      break;

    case 'search':
      const query = process.argv[3];
      if (!query) {
// console.log('❌ Please provide a search query');
        process.exit(1);
      }

// console.log(`🔍 Searching for: "${query}"`);
      const results = await library.searchResearch({
        keywords: [query],
        limit: 10
      });

// console.log(`
📚 Found ${results.sources.length} sources:
`);
      results.sources.forEach((source, index) => {
// console.log(`${index + 1}. ${source.title}`);
// console.log(`   Author: ${source.author}`);
// console.log(`   Library: ${source.library}`);
// console.log(`   Year: ${source.publicationYear}`);
// console.log(`   Type: ${source.type}`);
// console.log(`   Relevance: ${(source.relevance * 100).toFixed(1)}%`);
        if (source.abstract) {
// console.log(`   Abstract: ${source.abstract.substring(0, 100)}...`);
        }
// console.log('');
      });
      break;

    case 'node':
      const nodeArg = process.argv[3];
      if (!nodeArg) {
// console.log('❌ Please provide a node ID');
        process.exit(1);
      }
      const nodeId = parseInt(nodeArg);
      if (isNaN(nodeId) || nodeId < 1 || nodeId > 144) {
// console.log('❌ Please provide a valid node ID (1-144)');
        process.exit(1);
      }

      const node = library.getNode(nodeId);
      if (node) {
// console.log(`📍 Codex Node ${node.id}: ${node.name}`);
// console.log(`   Element: ${node.element} (${node.planet} - ${node.zodiac})`);
// console.log(`   Chakra: ${node.chakra}`);
// console.log(`   Solfeggio: ${node.solfeggio}Hz`);
// console.log(`   Color: ${node.color}`);
// console.log(`   Geometry: ${node.geometry}`);
// console.log(`   Angel: ${node.shem}`);
// console.log(`   Demon: ${node.goetia}`);
// console.log(`   Theme: ${node.narrative.theme}`);
// console.log(`   Archetype: ${node.narrative.archetype}`);
// console.log(`   Game Type: ${node.gameDesign.abilityType}`);
// console.log(`   Architecture: ${node.architecture.roomType}`);
// console.log(`   Symbol: ${node.symbolism.primarySymbol}`);
// console.log(`   Keywords: ${node.narrative.keywords.join(', ')}`);
      } else {
// console.log(`❌ Node ${nodeId} not found`);
      }
      break;

    case 'nodes':
// console.log('📚 All Codex 144:99 Nodes:
');
      const nodes = library.getAllNodes();
      nodes.forEach(node => {
// console.log(`${node.id}. ${node.name}`);
// console.log(`   ${node.element} - ${node.chakra} - ${node.narrative.archetype}`);
// console.log(`   "${node.narrative.theme}"`);
// console.log('');
      });
      break;

    case 'elements':
      const element = process.argv[3]?.toLowerCase();
      if (!element) {
// console.log('📚 Nodes by Element:');
        const elements = ['fire', 'water', 'earth', 'air', 'aether', 'all'];
        elements.forEach(elem => {
          const elementNodes = library.getNodesByElement(elem.charAt(0).toUpperCase() + elem.slice(1));
// console.log(`   ${elem.charAt(0).toUpperCase() + elem.slice(1)}: ${elementNodes.length} nodes`);
        });
      } else {
        const elementNodes = library.getNodesByElement(element.charAt(0).toUpperCase() + element.slice(1));
// console.log(`📚 ${element.charAt(0).toUpperCase() + element.slice(1)} Element Nodes:
`);
        elementNodes.forEach(node => {
// console.log(`${node.id}. ${node.name} - ${node.narrative.archetype}`);
        });
      }
      break;

    case 'chakras':
      const chakra = process.argv[3]?.toLowerCase();
      if (!chakra) {
// console.log('📚 Nodes by Chakra:');
        const chakras = ['root', 'sacral', 'solar plexus', 'heart', 'throat', 'third eye', 'crown'];
        chakras.forEach(chak => {
          const chakraNodes = library.getNodesByChakra(chak.charAt(0).toUpperCase() + chak.slice(1));
// console.log(`   ${chak.charAt(0).toUpperCase() + chak.slice(1)}: ${chakraNodes.length} nodes`);
        });
      } else {
        const chakraNodes = library.getNodesByChakra(chakra.charAt(0).toUpperCase() + chakra.slice(1));
// console.log(`📚 ${chakra.charAt(0).toUpperCase() + chakra.slice(1)} Chakra Nodes:
`);
        chakraNodes.forEach(node => {
// console.log(`${node.id}. ${node.name} - ${node.narrative.archetype}`);
        });
      }
      break;

    case 'report':
// console.log('📊 Generating comprehensive Codex report...');
      const report = library.generateReport();
// console.log(report);
      break;

    default:
      showHelp();
      break;
  }
}

if (process.argv.length < 3) {
  showHelp();
} else {
  main().catch(console.error);
}
