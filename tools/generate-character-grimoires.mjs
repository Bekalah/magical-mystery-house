#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Generate Character Grimoires
 * Creates unique grimoires for each of the 22 Major Arcana characters
 * with real-world inspirations, special realms, and historical grimoire spells
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Real-world inspirations and realms for each arcana
const ARCANA_INSPIRATIONS = {
  0: {
    name: 'The Fool',
    inspiration: 'Leonora Carrington + Rebecca Respawn',
    realm: 'Kitchen Alchemy & Christian Mysticism',
    themes: ['Surrealist magic', 'Kitchen alchemy', 'Christian mysticism', 'Beginner\'s mind'],
    historicalSources: ['Carrington\'s writings', 'Christian mystical texts', 'Surrealist manifestos'],
    alchemicalOperation: 'Prima Materia',
    tarotSuit: 'wands', // Maps to Sulfur
    daimonPair: { shem: 'Vehuiah', goetia: 'Bael' }
  },
  1: {
    name: 'The Magician',
    inspiration: 'John Dee',
    realm: 'Enochian',
    themes: ['Enochian language', 'Angelic communications', 'Dee\'s magic system', 'Conjunction'],
    historicalSources: ['Dee\'s Enochian diaries', 'Key of Solomon', 'Agrippa\'s Three Books'],
    alchemicalOperation: 'Conjunction',
    tarotSuit: 'wands', // Maps to Sulfur
    daimonPair: { shem: 'Jeliel', goetia: 'Agares' }
  },
  2: {
    name: 'The High Priestess',
    inspiration: 'Dion Fortune',
    realm: 'Avalon',
    themes: ['Sea Priestess work', 'Avalon inner planes', 'Glastonbury Tor', 'Morgan\'s Cave', 'Reflection'],
    historicalSources: ['Fortune\'s Sea Priestess', 'Avalon inner plane geography', 'Glastonbury traditions'],
    alchemicalOperation: 'Reflection',
    tarotSuit: 'cups', // Maps to Mercury
    daimonPair: { shem: 'Elemiah', goetia: 'Samigina' }
  },
  3: {
    name: 'The Empress',
    inspiration: 'Leonora Carrington',
    realm: 'Doreen\'s Garden',
    themes: ['Kitchen alchemy', 'Nature sanctuary', 'Fertility', 'Fermentation'],
    historicalSources: ['Carrington\'s kitchen alchemy', 'Nature magic traditions'],
    alchemicalOperation: 'Fermentation',
    tarotSuit: 'cups', // Maps to Mercury
    daimonPair: { shem: 'Mahasiah', goetia: 'Purson' }
  },
  4: {
    name: 'The Emperor',
    inspiration: 'Rudolf Steiner',
    realm: 'Structured Authority',
    themes: ['Architecture', 'Order', 'Structure', 'Fixation'],
    historicalSources: ['Steiner\'s architectural work', 'Traditional authority systems'],
    alchemicalOperation: 'Fixation',
    tarotSuit: 'pentacles', // Maps to Ash
    daimonPair: { shem: 'Lelahel', goetia: 'Aamon' }
  },
  5: {
    name: 'The Hierophant',
    inspiration: 'Crowley (Moon Child) / Max Ernst',
    realm: 'The Tower on the Tor',
    themes: ['Teaching', 'Collage/frottage', 'Lunar current', 'Multiplication'],
    historicalSources: ['Crowley\'s Moon Child', 'Ernst\'s surrealist techniques', 'Teaching traditions'],
    alchemicalOperation: 'Multiplication',
    tarotSuit: 'wands', // Maps to Sulfur
    daimonPair: { shem: 'Achaiah', goetia: 'Barbatos' }
  },
  6: {
    name: 'The Lovers',
    inspiration: 'Dion Fortune (inner marriage)',
    realm: 'Sacred Union',
    themes: ['Inner marriage', 'Integration', 'Harmony', 'Conjunction'],
    historicalSources: ['Fortune\'s inner marriage work', 'Sacred union traditions'],
    alchemicalOperation: 'Conjunction',
    tarotSuit: 'cups', // Maps to Mercury
    daimonPair: { shem: 'Cahetel', goetia: 'Beleth' }
  },
  7: {
    name: 'The Chariot',
    inspiration: 'Paul Foster Case (Cube of Space)',
    realm: 'Dimensional Navigation',
    themes: ['Cube of Space', 'Direction', 'Will', 'Sublimation'],
    historicalSources: ['Case\'s Cube of Space', 'Navigation magic'],
    alchemicalOperation: 'Sublimation',
    tarotSuit: 'swords', // Maps to Salt
    daimonPair: { shem: 'Haziel', goetia: 'Leraje' }
  },
  8: {
    name: 'Strength',
    inspiration: 'Emma Kunz',
    realm: 'Inner Power',
    themes: ['Radiesthetic methods', 'Geometric healing', 'Patience', 'Digestion'],
    historicalSources: ['Kunz\'s healing drawings', 'Strength traditions'],
    alchemicalOperation: 'Digestion',
    tarotSuit: 'wands', // Maps to Sulfur
    daimonPair: { shem: 'Aladiah', goetia: 'Eligos' }
  },
  9: {
    name: 'The Hermit',
    inspiration: 'John Dee (library work)',
    realm: 'Solitary Research',
    themes: ['Library work', 'Research', 'Solitude', 'Separation'],
    historicalSources: ['Dee\'s library work', 'Hermit traditions'],
    alchemicalOperation: 'Separation',
    tarotSuit: 'swords', // Maps to Salt
    daimonPair: { shem: 'Lauviah', goetia: 'Zepar' }
  },
  10: {
    name: 'Wheel of Fortune',
    inspiration: 'Agrippa (celestial magic)',
    realm: 'Eternal Flux',
    themes: ['Celestial magic', 'Cycles', 'Probability', 'Rotation'],
    historicalSources: ['Agrippa\'s celestial magic', 'Wheel traditions'],
    alchemicalOperation: 'Rotation',
    tarotSuit: 'pentacles', // Maps to Ash
    daimonPair: { shem: 'Yelahiah', goetia: 'Botis' }
  },
  11: {
    name: 'Justice',
    inspiration: 'Paul Foster Case (scales)',
    realm: 'Balance',
    themes: ['Scales', 'Balance', 'Proportion', 'Equilibrium'],
    historicalSources: ['Case\'s scales work', 'Justice traditions'],
    alchemicalOperation: 'Equilibrium',
    tarotSuit: 'swords', // Maps to Salt
    daimonPair: { shem: 'Sealiah', goetia: 'Bathin' }
  },
  12: {
    name: 'The Hanged Man',
    inspiration: 'Crowley (crossing the Abyss)',
    realm: 'Suspended Perspective',
    themes: ['Crossing the Abyss', 'Surrender', 'New perspective', 'Dissolution'],
    historicalSources: ['Crowley\'s Abyss work', 'Hanged Man traditions'],
    alchemicalOperation: 'Dissolution',
    tarotSuit: 'cups', // Maps to Mercury
    daimonPair: { shem: 'Ariel', goetia: 'Sallos' }
  },
  13: {
    name: 'Death',
    inspiration: 'All (nigredo)',
    realm: 'Transformation',
    themes: ['Nigredo', 'Transformation', 'Endings', 'Putrefaction'],
    historicalSources: ['Alchemical nigredo', 'Death traditions'],
    alchemicalOperation: 'Putrefaction',
    tarotSuit: 'swords', // Maps to Salt
    daimonPair: { shem: 'Asaliah', goetia: 'Aim' }
  },
  14: {
    name: 'Temperance',
    inspiration: 'Leonora Carrington (kitchen alchemy)',
    realm: 'Alchemical Mixing',
    themes: ['Kitchen alchemy', 'Mixing', 'Moderation', 'Distillation'],
    historicalSources: ['Carrington\'s kitchen alchemy', 'Temperance traditions'],
    alchemicalOperation: 'Distillation',
    tarotSuit: 'cups', // Maps to Mercury
    daimonPair: { shem: 'Mihael', goetia: 'Naberius' }
  },
  15: {
    name: 'The Devil',
    inspiration: 'Crowley, Fortune',
    realm: 'Shadow Work',
    themes: ['Shadow work', 'Binding', 'Materialism', 'Calcination'],
    historicalSources: ['Crowley\'s shadow work', 'Fortune\'s shadow integration', 'Devil traditions'],
    alchemicalOperation: 'Calcination',
    tarotSuit: 'pentacles', // Maps to Ash
    daimonPair: { shem: 'Veuliah', goetia: 'Glasya-Labolas' }
  },
  16: {
    name: 'The Tower',
    inspiration: 'John Dee (fall from grace)',
    realm: 'Destructive Awakening',
    themes: ['Fall from grace', 'Destruction', 'Revelation', 'Mortification'],
    historicalSources: ['Dee\'s fall', 'Tower traditions'],
    alchemicalOperation: 'Mortification',
    tarotSuit: 'swords', // Maps to Salt
    daimonPair: { shem: 'Yelaiah', goetia: 'Bune' }
  },
  17: {
    name: 'The Star',
    inspiration: 'Emma Kunz (healing drawings)',
    realm: 'Hope & Healing',
    themes: ['Healing drawings', 'Hope', 'Inspiration', 'Coagulation'],
    historicalSources: ['Kunz\'s healing work', 'Star traditions'],
    alchemicalOperation: 'Coagulation',
    tarotSuit: 'cups', // Maps to Mercury
    daimonPair: { shem: 'Melahel', goetia: 'Roneve' }
  },
  18: {
    name: 'The Moon',
    inspiration: 'Dion Fortune (inner planes)',
    realm: 'Dream Navigation',
    themes: ['Inner planes', 'Dreams', 'Illusion', 'Fermentation'],
    historicalSources: ['Fortune\'s inner planes work', 'Moon traditions'],
    alchemicalOperation: 'Fermentation',
    tarotSuit: 'cups', // Maps to Mercury
    daimonPair: { shem: 'Hahuiah', goetia: 'Berith' }
  },
  19: {
    name: 'The Sun',
    inspiration: 'Rudolf Steiner (light work)',
    realm: 'Radiant Illumination',
    themes: ['Light work', 'Joy', 'Vitality', 'Projection'],
    historicalSources: ['Steiner\'s light work', 'Sun traditions'],
    alchemicalOperation: 'Projection',
    tarotSuit: 'wands', // Maps to Sulfur
    daimonPair: { shem: 'Nithael', goetia: 'Astaroth' }
  },
  20: {
    name: 'Judgment',
    inspiration: 'Paul Foster Case (resurrection)',
    realm: 'Awakening',
    themes: ['Resurrection', 'Awakening', 'Call', 'Exaltation'],
    historicalSources: ['Case\'s resurrection work', 'Judgment traditions'],
    alchemicalOperation: 'Exaltation',
    tarotSuit: 'wands', // Maps to Sulfur
    daimonPair: { shem: 'Haaiah', goetia: 'Forneus' }
  },
  21: {
    name: 'The World',
    inspiration: 'All (rubedo)',
    realm: 'Completion',
    themes: ['Rubedo', 'Completion', 'Wholeness', 'Philosopher\'s Stone'],
    historicalSources: ['Alchemical rubedo', 'World traditions'],
    alchemicalOperation: 'Philosopher\'s Stone',
    tarotSuit: 'pentacles', // Maps to Ash
    daimonPair: { shem: 'Mumiah', goetia: 'Andromalius' }
  }
};

// Alchemical tarot mapping
const TAROT_TO_ALCHEMICAL = {
  'wands': 'Sulfur',
  'cups': 'Mercury',
  'swords': 'Salt',
  'pentacles': 'Ash',
  'disks': 'Ash'
};

// Historical grimoire spells by theme
const HISTORICAL_SPELLS = {
  'enochian': [
    { name: 'Enochian Call of the Aethyrs', source: 'Dee\'s Enochian diaries', suit: 'wands', element: 'Sulfur' },
    { name: 'Angelic Communication Ritual', source: 'Dee\'s Enochian diaries', suit: 'wands', element: 'Sulfur' },
    { name: 'Enochian Tablet Invocation', source: 'Key of Solomon', suit: 'wands', element: 'Sulfur' }
  ],
  'avalon': [
    { name: 'Sea Priestess Invocation', source: 'Fortune\'s Sea Priestess', suit: 'cups', element: 'Mercury' },
    { name: 'Glastonbury Tor Pathworking', source: 'Avalon traditions', suit: 'cups', element: 'Mercury' },
    { name: 'Morgan\'s Cave Access', source: 'Fortune\'s inner planes', suit: 'cups', element: 'Mercury' }
  ],
  'kitchen-alchemy': [
    { name: 'Kitchen Transformation', source: 'Carrington\'s writings', suit: 'cups', element: 'Mercury' },
    { name: 'Domestic Magic Ritual', source: 'Carrington\'s kitchen alchemy', suit: 'cups', element: 'Mercury' },
    { name: 'Cooking as Alchemy', source: 'Carrington\'s principles', suit: 'cups', element: 'Mercury' }
  ],
  'christian-mysticism': [
    { name: 'Mystical Union Prayer', source: 'Christian mystical texts', suit: 'wands', element: 'Sulfur' },
    { name: 'Divine Light Invocation', source: 'Christian mysticism', suit: 'wands', element: 'Sulfur' }
  ],
  'general': [
    { name: 'Elemental Mastery', source: 'Key of Solomon', suit: 'wands', element: 'Sulfur' },
    { name: 'Reality Manipulation', source: 'Lesser Key of Solomon', suit: 'wands', element: 'Sulfur' },
    { name: 'Intuitive Vision', source: 'Picatrix', suit: 'cups', element: 'Mercury' },
    { name: 'Hidden Knowledge Access', source: 'Agrippa\'s Three Books', suit: 'swords', element: 'Salt' },
    { name: 'Structure Creation', source: 'Key of Solomon', suit: 'pentacles', element: 'Ash' }
  ]
};

function generateSpellsForArcana(arcanaNumber) {
  const inspiration = ARCANA_INSPIRATIONS[arcanaNumber];
  const spells = [];
  
  // Get theme-specific spells
  for (const theme of inspiration.themes) {
    const themeLower = theme.toLowerCase();
    if (themeLower.includes('enochian')) {
      spells.push(...HISTORICAL_SPELLS.enochian);
    } else if (themeLower.includes('avalon') || themeLower.includes('fortune')) {
      spells.push(...HISTORICAL_SPELLS.avalon);
    } else if (themeLower.includes('kitchen') || themeLower.includes('carrington')) {
      spells.push(...HISTORICAL_SPELLS['kitchen-alchemy']);
    } else if (themeLower.includes('christian') || themeLower.includes('mysticism')) {
      spells.push(...HISTORICAL_SPELLS['christian-mysticism']);
    }
  }
  
  // Add general spells if needed
  if (spells.length < 4) {
    spells.push(...HISTORICAL_SPELLS.general.slice(0, 4 - spells.length));
  }
  
  // Ensure spells align with tarot suit
  return spells.slice(0, 4).map(spell => ({
    ...spell,
    tarotSuit: inspiration.tarotSuit,
    alchemicalElement: TAROT_TO_ALCHEMICAL[inspiration.tarotSuit]
  }));
}

function generateCharacterGrimoire(arcanaNumber, characterData) {
  const inspiration = ARCANA_INSPIRATIONS[arcanaNumber];
  const spells = generateSpellsForArcana(arcanaNumber);
  
  return {
    id: `grimoire-arcana-${arcanaNumber}`,
    character: {
      number: arcanaNumber,
      name: characterData.name,
      purityDesignation: characterData.purity_designation,
      fractalSignature: characterData.fractal_signature
    },
    inspiration: {
      realWorld: inspiration.inspiration,
      realm: inspiration.realm,
      themes: inspiration.themes,
      historicalSources: inspiration.historicalSources
    },
    alchemical: {
      operation: inspiration.alchemicalOperation,
      tarotSuit: inspiration.tarotSuit,
      alchemicalElement: TAROT_TO_ALCHEMICAL[inspiration.tarotSuit]
    },
    daimons: {
      shemAngel: inspiration.daimonPair.shem,
      goetiaDemon: inspiration.daimonPair.goetia
    },
    spells: spells.map((spell, idx) => ({
      id: `spell-${arcanaNumber}-${idx + 1}`,
      name: spell.name,
      source: spell.source,
      tarotSuit: spell.tarotSuit,
      alchemicalElement: spell.alchemicalElement,
      description: `${spell.name} - A spell from ${spell.source}, aligned with ${spell.alchemicalElement} (${spell.tarotSuit})`,
      creativeInterpretation: `In the visionary tradition of ${inspiration.inspiration}, this spell blends historical accuracy with creative interpretation, allowing for ${inspiration.themes[0]} work.`
    })),
    pages: [
      {
        id: `page-${arcanaNumber}-1`,
        pageNumber: 1,
        title: `The Grimoire of ${characterData.name}`,
        content: `This grimoire is dedicated to ${characterData.name}, inspired by ${inspiration.inspiration}. The realm of ${inspiration.realm} serves as the primary workspace for this arcana's magical practice.`
      },
      {
        id: `page-${arcanaNumber}-2`,
        pageNumber: 2,
        title: 'Alchemical Correspondences',
        content: `Alchemical Operation: ${inspiration.alchemicalOperation}\nTarot Suit: ${inspiration.tarotSuit} (${TAROT_TO_ALCHEMICAL[inspiration.tarotSuit]})\nDaimon Pair: ${inspiration.daimonPair.shem} (Shem Angel) + ${inspiration.daimonPair.goetia} (Goetia Demon)`
      }
    ],
    metadata: {
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      tags: [...inspiration.themes, inspiration.realm, inspiration.alchemicalOperation],
      category: 'character-grimoire'
    }
  };
}

async function generateAllCharacterGrimoires() {
  console.log('🔮 Generating Character Grimoires...\n');
  
  // Load character data
  const charactersPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'characters.json');
  const charactersData = JSON.parse(fs.readFileSync(charactersPath, 'utf-8'));
  
  const grimoires = {};
  
  for (const character of charactersData.major_arcana) {
    const grimoire = generateCharacterGrimoire(character.number, character);
    grimoires[character.number] = grimoire;
    console.log(`✅ Generated grimoire for ${character.name} (${character.number})`);
    console.log(`   Inspiration: ${ARCANA_INSPIRATIONS[character.number].inspiration}`);
    console.log(`   Realm: ${ARCANA_INSPIRATIONS[character.number].realm}`);
    console.log(`   Spells: ${grimoire.spells.length}`);
  }
  
  // Save to file
  const outputPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'character-grimoires.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(grimoires, null, 2), 'utf-8');
  
  console.log(`\n✅ All character grimoires generated!`);
  console.log(`   Saved to: ${outputPath}`);
  console.log(`   Total grimoires: ${Object.keys(grimoires).length}`);
  
  return grimoires;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllCharacterGrimoires().catch(console.error);
}

export default generateAllCharacterGrimoires;

