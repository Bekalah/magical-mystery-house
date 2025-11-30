/**
 * cli
 * 
 * @package @cathedral/liber-arcanae
 */
#!/usr/bin/env node

/**
 * Liber Arcanae CLI - Clean Version
 * Command-line interface for the 78-card tarot system
 */

import { LiberArcanae } from './LiberArcanae';

const system = new LiberArcanae();

/**
 * ⚗️ ShowHelp - Solve et Coagula
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
function showHelp() {
  /* eslint-disable */console.log(...console.log(`3295656290_13_2_36_4_4`,`
🃏 Liber Arcanae Codex Abyssiae CLI

Usage: liber-arcanae <command> [options]

Commands:
  cards             List all cards
  major             Show Major Arcana
  minor             Show Minor Arcana
  card <id>         Show specific card details
  search <query>    Search cards
  fusion <cards>    Create fusion session
  report            Generate system report
  help              Show this help

Examples:
  liber-arcanae cards
  liber-arcanae card 0_fool
  liber-arcanae search "fire"
  liber-arcanae fusion "0_fool,1_magician"
  liber-arcanae report

For more information, visit: https://github.com/Bekalah/cathedral
  `));
}

async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'cards':
      /* eslint-disable */console.log(...console.log(`3295656290_44_6_44_43_4`,'🃏 All Arcana Cards:
'));
      const cards = system.getAllCards();
      cards.forEach(card => {
        /* eslint-disable */console.log(...console.log(`3295656290_47_8_47_47_4`,`${card.id}: ${card.name}`));
        /* eslint-disable */console.log(...console.log(`3295656290_48_8_48_86_4`,`   ${card.element} - ${card.type} - ${card.narrative.archetype}`));
        /* eslint-disable */console.log(...console.log(`3295656290_49_8_49_23_4`,''));
      });
      break;

    case 'major':
      /* eslint-disable */console.log(...console.log(`3295656290_54_6_54_39_4`,'🎭 Major Arcana:
'));
      const majorCards = system.getMajorArcana();
      majorCards.forEach(card => {
        /* eslint-disable */console.log(...console.log(`3295656290_57_8_57_69_4`,`${card.number}: ${card.name} (${card.element})`));
        /* eslint-disable */console.log(...console.log(`3295656290_58_8_58_51_4`,`   "${card.narrative.theme}"`));
        /* eslint-disable */console.log(...console.log(`3295656290_59_8_59_23_4`,''));
      });
      break;

    case 'minor':
      /* eslint-disable */console.log(...console.log(`3295656290_64_6_64_40_4`,'🗂️ Minor Arcana:
'));
      const minorCards = system.getMinorArcana();
      minorCards.forEach(card => {
        /* eslint-disable */console.log(...console.log(`3295656290_67_8_67_53_4`,`${card.name} (${card.element})`));
        /* eslint-disable */console.log(...console.log(`3295656290_68_8_68_53_4`,`   ${card.narrative.archetype}`));
        /* eslint-disable */console.log(...console.log(`3295656290_69_8_69_23_4`,''));
      });
      break;

    case 'card':
      const cardId = process.argv[3];
      if (!cardId) {
        /* eslint-disable */console.log(...console.log(`3295656290_76_8_76_49_4`,'❌ Please provide a card ID'));
        process.exit(1);
      }

      const card = system.getCard(cardId);
      if (card) {
        /* eslint-disable */console.log(...console.log(`3295656290_82_8_82_51_4`,`🃏 ${card.name} (${card.id})`));
        /* eslint-disable */console.log(...console.log(`3295656290_83_8_83_41_4`,`Type: ${card.type}`));
        /* eslint-disable */console.log(...console.log(`3295656290_84_8_84_47_4`,`Element: ${card.element}`));
        /* eslint-disable */console.log(...console.log(`3295656290_85_8_85_45_4`,`Planet: ${card.planet}`));
        /* eslint-disable */console.log(...console.log(`3295656290_86_8_86_45_4`,`Chakra: ${card.chakra}`));
        /* eslint-disable */console.log(...console.log(`3295656290_87_8_87_53_4`,`Theme: ${card.narrative.theme}`));
        /* eslint-disable */console.log(...console.log(`3295656290_88_8_88_61_4`,`Archetype: ${card.narrative.archetype}`));
        /* eslint-disable */console.log(...console.log(`3295656290_89_8_89_70_4`,`Keywords: ${card.narrative.keywords.join(', ')}`));
        /* eslint-disable */console.log(...console.log(`3295656290_90_8_90_67_4`,`Game Style: ${card.gameDesign.gameplayStyle}`));
        /* eslint-disable */console.log(...console.log(`3295656290_91_8_91_82_4`,`Mirrored Codex Nodes: ${card.mirroredCodexNodes.join(', ')}`));
      } else {
        /* eslint-disable */console.log(...console.log(`3295656290_93_8_93_49_4`,`❌ Card ${cardId} not found`));
      }
      break;

    case 'search':
      const query = process.argv[3];
      if (!query) {
        /* eslint-disable */console.log(...console.log(`3295656290_100_8_100_54_4`,'❌ Please provide a search query'));
        process.exit(1);
      }

      /* eslint-disable */console.log(...console.log(`3295656290_104_6_104_49_4`,`🔍 Searching for: "${query}"`));
      const results = await system.searchCards({
        keywords: [query],
        limit: 10
      });

      /* eslint-disable */console.log(...console.log(`3295656290_110_6_110_61_4`,`
Found ${results.cards.length} cards:
`));
      results.cards.forEach(card => {
        /* eslint-disable */console.log(...console.log(`3295656290_112_8_112_47_4`,`${card.id}: ${card.name}`));
        /* eslint-disable */console.log(...console.log(`3295656290_113_8_113_71_4`,`   ${card.element} - ${card.narrative.archetype}`));
        /* eslint-disable */console.log(...console.log(`3295656290_114_8_114_23_4`,''));
      });
      break;

    case 'fusion':
      const cardIds = process.argv[3]?.split(',') || [];
      if (cardIds.length < 2) {
        /* eslint-disable */console.log(...console.log(`3295656290_121_8_121_70_4`,'❌ Please provide at least 2 card IDs for fusion'));
        process.exit(1);
      }

      /* eslint-disable */console.log(...console.log(`3295656290_125_6_125_75_4`,`⚗️ Creating fusion session with: ${cardIds.join(', ')}`));
      const session = system.createFusionSession(cardIds, 'elemental_fusion');
      /* eslint-disable */console.log(...console.log(`3295656290_127_6_127_53_4`,`✅ Created session: ${session.id}`));
      /* eslint-disable */console.log(...console.log(`3295656290_128_6_128_58_4`,`Duration: ${session.duration} minutes`));
      /* eslint-disable */console.log(...console.log(`3295656290_129_6_129_55_4`,`Intensity: ${session.intensity}/10`));
      break;

    case 'report':
      /* eslint-disable */console.log(...console.log(`3295656290_133_6_133_58_4`,'📊 Generating Liber Arcanae report...'));
      const report = system.generateReport();
      /* eslint-disable */console.log(...console.log(`3295656290_135_6_135_25_4`,report));
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
