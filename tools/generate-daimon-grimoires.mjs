#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Generate Daimon Grimoires
 * Creates grimoires for each of the 72 Shem Angels and 72 Goetia Demons
 * with traditional spells, correspondences, and visionary interpretations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Alchemical tarot mapping
const TAROT_TO_ALCHEMICAL = {
  'wands': 'Sulfur',
  'cups': 'Mercury',
  'swords': 'Salt',
  'pentacles': 'Ash',
  'disks': 'Ash'
};

// Map daimon number to tarot suit (cycling through suits)
function getTarotSuitForDaimon(number) {
  const suits = ['wands', 'cups', 'swords', 'pentacles'];
  return suits[(number - 1) % 4];
}

// Generate spells for a daimon based on their attributes
function generateSpellsForDaimon(daimon, isAngel) {
  const spells = [];
  const tarotSuit = getTarotSuitForDaimon(daimon.number || parseInt(daimon.id));
  const alchemicalElement = TAROT_TO_ALCHEMICAL[tarotSuit];
  
  // Base spells from historical sources
  const baseSpells = [
    {
      name: `${daimon.name}'s Primary Invocation`,
      source: isAngel ? 'Shem HaMephorash' : 'Lesser Key of Solomon',
      tarotSuit,
      alchemicalElement,
      description: `Invoke ${daimon.name} for ${daimon.virtue || 'their primary virtue'}`
    },
    {
      name: `${daimon.name}'s Correspondence Ritual`,
      source: isAngel ? 'Traditional angelic magic' : 'Goetia traditions',
      tarotSuit,
      alchemicalElement,
      description: `Work with ${daimon.name}'s correspondences and attributes`
    }
  ];
  
  // Add specific spells based on virtue/attributes
  if (daimon.virtue) {
    const virtueLower = daimon.virtue.toLowerCase();
    if (virtueLower.includes('teaching') || virtueLower.includes('knowledge')) {
      baseSpells.push({
        name: `${daimon.name}'s Knowledge Transmission`,
        source: 'Agrippa\'s Three Books',
        tarotSuit: 'swords',
        alchemicalElement: 'Salt',
        description: `Receive knowledge and teaching from ${daimon.name}`
      });
    }
    if (virtueLower.includes('healing') || virtueLower.includes('health')) {
      baseSpells.push({
        name: `${daimon.name}'s Healing Ritual`,
        source: 'Traditional healing magic',
        tarotSuit: 'cups',
        alchemicalElement: 'Mercury',
        description: `Channel ${daimon.name}'s healing power`
      });
    }
    if (virtueLower.includes('love') || virtueLower.includes('affection')) {
      baseSpells.push({
        name: `${daimon.name}'s Love Invocation`,
        source: 'Picatrix',
        tarotSuit: 'cups',
        alchemicalElement: 'Mercury',
        description: `Invoke ${daimon.name} for matters of love and relationship`
      });
    }
  }
  
  return baseSpells.slice(0, 4);
}

function generateDaimonGrimoire(daimon, isAngel) {
  const number = daimon.number || parseInt(daimon.id);
  const tarotSuit = getTarotSuitForDaimon(number);
  const alchemicalElement = TAROT_TO_ALCHEMICAL[tarotSuit];
  const spells = generateSpellsForDaimon(daimon, isAngel);
  
  return {
    id: `grimoire-${isAngel ? 'shem' : 'goetia'}-${number}`,
    daimon: {
      number,
      name: daimon.name,
      type: isAngel ? 'Shem Angel' : 'Goetia Demon',
      rank: daimon.rank || 'Unknown',
      element: daimon.element || 'Unknown',
      virtue: daimon.virtue || 'Unknown',
      sigil: daimon.sigil || 'Unknown'
    },
    correspondences: {
      tarotSuit,
      alchemicalElement,
      element: daimon.element,
      planet: daimon.planet || 'Unknown',
      zodiac: daimon.zodiac || 'Unknown',
      color: daimon.color || 'Unknown',
      geometry: daimon.geometry || 'Unknown'
    },
    balancing: isAngel ? {
      balancingDemon: daimon.balancing_demon || 'Unknown',
      shadowAspect: 'Light integration'
    } : {
      balancingAngel: daimon.balancing_angel || 'Unknown',
      shadowAspect: daimon.healing_aspect || 'Shadow integration'
    },
    spells: spells.map((spell, idx) => ({
      id: `spell-${isAngel ? 'shem' : 'goetia'}-${number}-${idx + 1}`,
      name: spell.name,
      source: spell.source,
      tarotSuit: spell.tarotSuit,
      alchemicalElement: spell.alchemicalElement,
      description: spell.description,
      creativeInterpretation: `In the visionary tradition, working with ${daimon.name} requires balancing their ${isAngel ? 'light' : 'shadow'} aspects, integrating their power through ${alchemicalElement} (${tarotSuit}) work.`
    })),
    pages: [
      {
        id: `page-${isAngel ? 'shem' : 'goetia'}-${number}-1`,
        pageNumber: 1,
        title: `The Grimoire of ${daimon.name}`,
        content: `This grimoire is dedicated to ${daimon.name}, ${isAngel ? 'a Shem Angel' : 'a Goetia Demon'} from ${isAngel ? 'the Shem HaMephorash' : 'the Lesser Key of Solomon'}. ${daimon.virtue ? `Their primary virtue is: ${daimon.virtue}` : ''}`
      },
      {
        id: `page-${isAngel ? 'shem' : 'goetia'}-${number}-2`,
        pageNumber: 2,
        title: 'Alchemical Correspondences',
        content: `Tarot Suit: ${tarotSuit} (${alchemicalElement})\nElement: ${daimon.element || 'Unknown'}\nRank: ${daimon.rank || 'Unknown'}\n${isAngel ? `Balancing Demon: ${daimon.balancing_demon || 'Unknown'}` : `Balancing Angel: ${daimon.balancing_angel || 'Unknown'}`}`
      }
    ],
    metadata: {
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      tags: [
        isAngel ? 'shem-angel' : 'goetia-demon',
        tarotSuit,
        alchemicalElement,
        daimon.element || 'unknown',
        daimon.rank || 'unknown'
      ],
      category: isAngel ? 'shem-angel-grimoire' : 'goetia-demon-grimoire'
    }
  };
}

async function generateAllDaimonGrimoires() {
  console.log('🔮 Generating Daimon Grimoires...\n');
  
  // Load Goetia demons
  const demonsPath = path.join(rootDir, 'packages', 'codex-144', 'demons-72.json');
  let demonsData = {};
  
  if (fs.existsSync(demonsPath)) {
    const demonsFile = JSON.parse(fs.readFileSync(demonsPath, 'utf-8'));
    demonsData = demonsFile.demons || {};
  }
  
  // Generate all 72 demons (fill in missing ones)
  const allDemons = {};
  for (let i = 1; i <= 72; i++) {
    const demonId = i.toString();
    if (demonsData[demonId]) {
      allDemons[i] = { ...demonsData[demonId], number: i, id: demonId };
    } else {
      // Create placeholder for missing demons
      allDemons[i] = {
        number: i,
        id: demonId,
        name: `Goetia Demon ${i}`,
        rank: 'Unknown',
        element: ['East', 'South', 'West', 'North'][(i - 1) % 4],
        virtue: 'Unknown',
        balancing_angel: 'Unknown'
      };
    }
  }
  
  // Generate Shem Angels (create structure)
  const allAngels = {};
  for (let i = 1; i <= 72; i++) {
    // Find corresponding demon for balancing
    const demon = allDemons[i];
    allAngels[i] = {
      number: i,
      id: i.toString(),
      name: `Shem Angel ${i}`,
      rank: 'Angel',
      element: demon.element,
      virtue: 'Divine service',
      balancing_demon: demon.name
    };
  }
  
  const grimoires = {
    shemAngels: {},
    goetiaDemons: {}
  };
  
  // Generate Shem Angel grimoires
  console.log('Generating Shem Angel grimoires...');
  for (let i = 1; i <= 72; i++) {
    const grimoire = generateDaimonGrimoire(allAngels[i], true);
    grimoires.shemAngels[i] = grimoire;
    if (i <= 5 || i % 10 === 0) {
      console.log(`✅ Generated grimoire for ${allAngels[i].name} (${i})`);
    }
  }
  
  // Generate Goetia Demon grimoires
  console.log('\nGenerating Goetia Demon grimoires...');
  for (let i = 1; i <= 72; i++) {
    const grimoire = generateDaimonGrimoire(allDemons[i], false);
    grimoires.goetiaDemons[i] = grimoire;
    if (i <= 5 || i % 10 === 0) {
      console.log(`✅ Generated grimoire for ${allDemons[i].name} (${i})`);
    }
  }
  
  // Save to file
  const outputPath = path.join(rootDir, 'packages', 'codex-144', 'daimon-grimoires.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(grimoires, null, 2), 'utf-8');
  
  console.log(`\n✅ All daimon grimoires generated!`);
  console.log(`   Saved to: ${outputPath}`);
  console.log(`   Shem Angels: ${Object.keys(grimoires.shemAngels).length}`);
  console.log(`   Goetia Demons: ${Object.keys(grimoires.goetiaDemons).length}`);
  console.log(`   Total: ${Object.keys(grimoires.shemAngels).length + Object.keys(grimoires.goetiaDemons).length}`);
  
  return grimoires;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllDaimonGrimoires().catch(console.error);
}

export default generateAllDaimonGrimoires;

