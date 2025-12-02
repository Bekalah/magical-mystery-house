#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Generate Deity Grimoires
 * Creates grimoires for real gods and goddesses in the game
 * Connected to character systems, realms, and spell system
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Real gods and goddesses connected to realms and characters
const DEITIES = {
  avalon: [
    { name: 'Morgan Le Fay', type: 'Goddess', realm: 'Avalon', connection: 'High Priestess', themes: ['Sea Priestess', 'Avalon mysteries', 'Feminine power'] },
    { name: 'The Lady of the Lake', type: 'Goddess', realm: 'Avalon', connection: 'High Priestess', themes: ['Water magic', 'Avalon', 'Protection'] },
    { name: 'Glastonbury Tor Deity', type: 'Deity', realm: 'Avalon', connection: 'Hierophant', themes: ['Teaching', 'Tor mysteries', 'Avalon'] }
  ],
  enochian: [
    { name: 'Enochian Angels', type: 'Angelic Host', realm: 'Enochian', connection: 'Magician', themes: ['Enochian language', 'Angelic communication', 'Dee\'s system'] },
    { name: 'The Enochian Deity', type: 'Deity', realm: 'Enochian', connection: 'Magician', themes: ['Enochian magic', 'Angelic realms', 'Dee\'s work'] }
  ],
  christianMysticism: [
    { name: 'Divine Sophia', type: 'Goddess', realm: 'Christian Mysticism', connection: 'Fool', themes: ['Wisdom', 'Christian mysticism', 'Divine feminine'] },
    { name: 'The Holy Guardian Angel', type: 'Angel', realm: 'Christian Mysticism', connection: 'Fool', themes: ['Crowley\'s HGA', 'Divine connection', 'Mysticism'] }
  ],
  general: [
    { name: 'Hecate', type: 'Goddess', realm: 'Crossroads', connection: 'Moon', themes: ['Crossroads', 'Magic', 'Moon'] },
    { name: 'Hermes', type: 'God', realm: 'Communication', connection: 'Magician', themes: ['Communication', 'Magic', 'Travel'] },
    { name: 'Aphrodite', type: 'Goddess', realm: 'Love', connection: 'Lovers', themes: ['Love', 'Beauty', 'Union'] },
    { name: 'Athena', type: 'Goddess', realm: 'Wisdom', connection: 'High Priestess', themes: ['Wisdom', 'Strategy', 'Knowledge'] }
  ]
};

// Alchemical tarot mapping
const TAROT_TO_ALCHEMICAL = {
  'wands': 'Sulfur',
  'cups': 'Mercury',
  'swords': 'Salt',
  'pentacles': 'Ash'
};

function getTarotSuitForDeity(deity) {
  // Map based on themes
  const themesLower = deity.themes.join(' ').toLowerCase();
  if (themesLower.includes('fire') || themesLower.includes('will') || themesLower.includes('power')) {
    return 'wands';
  } else if (themesLower.includes('water') || themesLower.includes('emotion') || themesLower.includes('love')) {
    return 'cups';
  } else if (themesLower.includes('air') || themesLower.includes('intellect') || themesLower.includes('wisdom')) {
    return 'swords';
  } else {
    return 'pentacles';
  }
}

function generateSpellsForDeity(deity) {
  const tarotSuit = getTarotSuitForDeity(deity);
  const alchemicalElement = TAROT_TO_ALCHEMICAL[tarotSuit];
  
  return [
    {
      name: `${deity.name}'s Primary Invocation`,
      source: 'Traditional deity work',
      tarotSuit,
      alchemicalElement,
      description: `Invoke ${deity.name} for ${deity.themes[0]} work`
    },
    {
      name: `${deity.name}'s Realm Access`,
      source: 'Realm traditions',
      tarotSuit,
      alchemicalElement,
      description: `Access the realm of ${deity.realm} through ${deity.name}`
    },
    {
      name: `${deity.name}'s Blessing Ritual`,
      source: 'Deity traditions',
      tarotSuit,
      alchemicalElement,
      description: `Receive blessing and power from ${deity.name}`
    },
    {
      name: `${deity.name}'s Correspondence Work`,
      source: 'Traditional correspondences',
      tarotSuit,
      alchemicalElement,
      description: `Work with ${deity.name}'s correspondences and attributes`
    }
  ];
}

function generateDeityGrimoire(deity, index) {
  const tarotSuit = getTarotSuitForDeity(deity);
  const alchemicalElement = TAROT_TO_ALCHEMICAL[tarotSuit];
  const spells = generateSpellsForDeity(deity);
  
  return {
    id: `grimoire-deity-${index}`,
    deity: {
      name: deity.name,
      type: deity.type,
      realm: deity.realm,
      connection: deity.connection,
      themes: deity.themes
    },
    correspondences: {
      tarotSuit,
      alchemicalElement,
      realm: deity.realm,
      connectedArcana: deity.connection
    },
    spells: spells.map((spell, idx) => ({
      id: `spell-deity-${index}-${idx + 1}`,
      name: spell.name,
      source: spell.source,
      tarotSuit: spell.tarotSuit,
      alchemicalElement: spell.alchemicalElement,
      description: spell.description,
      creativeInterpretation: `Working with ${deity.name} in the realm of ${deity.realm} requires honoring their ${deity.themes.join(', ')} aspects through ${alchemicalElement} (${tarotSuit}) work.`
    })),
    pages: [
      {
        id: `page-deity-${index}-1`,
        pageNumber: 1,
        title: `The Grimoire of ${deity.name}`,
        content: `This grimoire is dedicated to ${deity.name}, ${deity.type} of ${deity.realm}. Connected to the ${deity.connection} arcana, this deity embodies ${deity.themes.join(', ')}.`
      },
      {
        id: `page-deity-${index}-2`,
        pageNumber: 2,
        title: 'Realm and Correspondences',
        content: `Realm: ${deity.realm}\nConnected Arcana: ${deity.connection}\nTarot Suit: ${tarotSuit} (${alchemicalElement})\nThemes: ${deity.themes.join(', ')}`
      }
    ],
    metadata: {
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      tags: [
        'deity',
        'goddess',
        deity.realm.toLowerCase().replace(/\s+/g, '-'),
        deity.connection.toLowerCase().replace(/\s+/g, '-'),
        tarotSuit,
        alchemicalElement
      ],
      category: 'deity-grimoire'
    }
  };
}

async function generateAllDeityGrimoires() {
  console.log('🔮 Generating Deity Grimoires...\n');
  
  const allDeities = [
    ...DEITIES.avalon,
    ...DEITIES.enochian,
    ...DEITIES.christianMysticism,
    ...DEITIES.general
  ];
  
  const grimoires = {};
  
  allDeities.forEach((deity, index) => {
    const grimoire = generateDeityGrimoire(deity, index);
    grimoires[deity.name] = grimoire;
    console.log(`✅ Generated grimoire for ${deity.name} (${deity.type} of ${deity.realm})`);
  });
  
  // Save to file
  const outputPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'gods-goddesses.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(grimoires, null, 2), 'utf-8');
  
  console.log(`\n✅ All deity grimoires generated!`);
  console.log(`   Saved to: ${outputPath}`);
  console.log(`   Total deities: ${Object.keys(grimoires).length}`);
  
  return grimoires;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllDeityGrimoires().catch(console.error);
}

export default generateAllDeityGrimoires;

